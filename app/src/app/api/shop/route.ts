import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { SHOP_ITEMS, getItem } from "@/data/shop-items";

function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const username = token.slice(0, colonIdx);
  const signature = token.slice(colonIdx + 1);
  if (!username || !signature) return false;
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch { return false; }
}

/** GET /api/shop — returns shop catalog + user's inventory and spendable balance */
export async function GET(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const adminToken = req.cookies.get("admin_token")?.value ?? "";
  const isAdmin = verifyAdminToken(adminToken);

  const lower = username.toLowerCase();
  const [progressData, inventoryData] = await Promise.all([
    redis.hgetall(`progress:${lower}`),
    redis.smembers(`inventory:${lower}`),
  ]);

  const coins = Number(progressData?.coins ?? progressData?.xp ?? 0);
  const coinsSpent = Number(progressData?.coinsSpent ?? 0);
  const spendable = Math.max(0, coins - coinsSpent);
  const inventory = (inventoryData ?? []) as string[];
  const equipped = await redis.hgetall(`equipped:${lower}`) ?? {};

  const items = isAdmin ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => !i.adminOnly);

  return NextResponse.json({
    items,
    inventory,
    equipped,
    coins,
    coinsSpent,
    spendable,
  });
}

/** POST /api/shop — purchase an item */
export async function POST(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.itemId || typeof body.itemId !== "string") {
    return NextResponse.json({ error: "itemId required" }, { status: 400 });
  }

  const item = getItem(body.itemId);
  if (!item) return NextResponse.json({ error: "item not found" }, { status: 404 });

  if (item.adminOnly) {
    const adminToken = req.cookies.get("admin_token")?.value ?? "";
    if (!verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: "item not found" }, { status: 404 });
    }
  }

  const lower = username.toLowerCase();
  const progressKey = `progress:${lower}`;
  const inventoryKey = `inventory:${lower}`;

  // Already owned?
  const alreadyOwned = await redis.sismember(inventoryKey, item.id);
  if (alreadyOwned) {
    return NextResponse.json({ error: "already owned" }, { status: 409 });
  }

  const progressData = await redis.hgetall(progressKey);
  const coins = Number(progressData?.coins ?? progressData?.xp ?? 0);
  const coinsSpent = Number(progressData?.coinsSpent ?? 0);
  const spendable = Math.max(0, coins - coinsSpent);

  if (spendable < item.price) {
    return NextResponse.json({ error: "insufficient coins", spendable, price: item.price }, { status: 402 });
  }

  const newCoinsSpent = coinsSpent + item.price;
  await Promise.all([
    redis.hset(progressKey, { coinsSpent: newCoinsSpent }),
    redis.sadd(inventoryKey, item.id),
  ]);

  return NextResponse.json({
    ok: true,
    item,
    spendable: Math.max(0, coins - newCoinsSpent),
  });
}

/** PATCH /api/shop — equip or unequip an item */
export async function PATCH(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.itemId || typeof body.itemId !== "string") {
    return NextResponse.json({ error: "itemId required" }, { status: 400 });
  }

  const item = getItem(body.itemId);
  if (!item) return NextResponse.json({ error: "item not found" }, { status: 404 });

  const lower = username.toLowerCase();

  // Must own it
  const owned = await redis.sismember(`inventory:${lower}`, item.id);
  if (!owned) return NextResponse.json({ error: "not owned" }, { status: 403 });

  const equippedKey = `equipped:${lower}`;
  const current = await redis.hget(equippedKey, item.slot) as string | null;

  if (current === item.id) {
    // Unequip
    await redis.hdel(equippedKey, item.slot);
    return NextResponse.json({ ok: true, action: "unequipped", slot: item.slot });
  } else {
    // Equip (replaces whatever was in that slot)
    await redis.hset(equippedKey, { [item.slot]: item.id });
    return NextResponse.json({ ok: true, action: "equipped", slot: item.slot, itemId: item.id });
  }
}
