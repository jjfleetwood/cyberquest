import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { logAdminAction } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "Sign in to redeem a code." }, { status: 401 });

  const { code } = await req.json() as { code?: string };
  if (!code) return NextResponse.json({ error: "No code provided." }, { status: 400 });

  const normalized = code.trim().toUpperCase();
  const key = `voucher:${normalized}`;
  const dedupKey = `voucher:redeemers:${normalized}`;
  const lower = username.toLowerCase();

  const data = await redis.hgetall(key);
  if (!data || !data.durationDays) {
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
  }

  // Fast fail before touching anything
  if (Number(data.usesLeft ?? 0) <= 0) {
    return NextResponse.json({ error: "This code has already been fully redeemed." }, { status: 400 });
  }

  // Atomic per-user deduplication via Redis Set (SADD returns 0 if already a member)
  const added = await redis.sadd(dedupKey, lower);
  if (added === 0) {
    return NextResponse.json({ error: "You have already redeemed this code." }, { status: 400 });
  }

  // Optimistic atomic decrement — roll back if another request raced us to the last use
  const newLeft = await redis.hincrby(key, "usesLeft", -1);
  if (newLeft < 0) {
    await Promise.all([
      redis.hincrby(key, "usesLeft", 1),
      redis.srem(dedupKey, lower),
    ]);
    return NextResponse.json({ error: "This code has already been fully redeemed." }, { status: 400 });
  }

  const durationDays = Number(data.durationDays);
  const expiresAt = Date.now() + durationDays * 24 * 60 * 60 * 1000;

  // Update uses log (display only — enforcement is done atomically above)
  const uses: { username: string; redeemedAt: number }[] = data.uses
    ? JSON.parse(data.uses as string)
    : [];
  uses.push({ username: lower, redeemedAt: Date.now() });

  await Promise.all([
    redis.hset(key, { uses: JSON.stringify(uses) }),
    redis.hset(`user:${lower}`, {
      tier: "pro",
      voucherExpiry: String(expiresAt),
    }),
  ]);
  logAdminAction("voucher", "upgrade-pro", `${lower}:${normalized}:${durationDays}d`).catch(() => {});

  return NextResponse.json({
    ok: true,
    durationDays,
    expiresAt,
    message: `${durationDays} days of Pro access activated!`,
  });
}
