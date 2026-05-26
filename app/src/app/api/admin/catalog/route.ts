import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { SHOP_ITEMS } from "@/data/shop-items";
import { TROPHIES } from "@/data/trophies";

function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const user = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  if (!user || !sig) return false;
  const expected = createHmac("sha256", secret).update(user).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}

/** GET /api/admin/catalog
 *  Admin-only. Returns all shop items + all trophies with claimed counts and admin's inventory.
 */
export async function GET(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value ?? "";
  if (!verifyAdminToken(adminToken)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const username = getServerSession(req);
  const lower = (username ?? "").toLowerCase();

  const [inventoryRaw, claimedKeys] = await Promise.all([
    lower ? redis.smembers(`inventory:${lower}`) : Promise.resolve([]),
    (async () => {
      const pipeline = redis.pipeline();
      for (const t of TROPHIES) pipeline.get(`trophy:claimed:${t.id}`);
      return pipeline.exec();
    })(),
  ]);

  const inventory = new Set((inventoryRaw ?? []) as string[]);

  const trophiesWithSupply = TROPHIES.map((t, i) => ({
    ...t,
    claimed: Number(claimedKeys?.[i] ?? 0),
    remaining: t.supply - Number(claimedKeys?.[i] ?? 0),
    owned: inventory.has(t.id),
  }));

  return NextResponse.json({
    items: SHOP_ITEMS.map((i) => ({ ...i, owned: inventory.has(i.id) })),
    trophies: trophiesWithSupply,
  });
}
