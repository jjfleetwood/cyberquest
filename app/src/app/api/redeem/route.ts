import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";

export async function POST(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "Sign in to redeem a code." }, { status: 401 });

  const { code } = await req.json() as { code?: string };
  if (!code) return NextResponse.json({ error: "No code provided." }, { status: 400 });

  const normalized = code.trim().toUpperCase();
  const key = `voucher:${normalized}`;

  const data = await redis.hgetall(key);
  if (!data || !data.durationDays) {
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
  }

  const usesLeft = Number(data.usesLeft ?? 0);
  if (usesLeft <= 0) {
    return NextResponse.json({ error: "This code has already been fully redeemed." }, { status: 400 });
  }

  // Check this user hasn't already used this code
  const uses: { username: string; redeemedAt: number }[] = data.uses
    ? JSON.parse(data.uses as string)
    : [];
  if (uses.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return NextResponse.json({ error: "You have already redeemed this code." }, { status: 400 });
  }

  const durationDays = Number(data.durationDays);
  const expiresAt = Date.now() + durationDays * 24 * 60 * 60 * 1000;
  const lower = username.toLowerCase();

  // Atomically decrement uses and record redemption
  uses.push({ username: lower, redeemedAt: Date.now() });
  await Promise.all([
    redis.hincrby(key, "usesLeft", -1),
    redis.hset(key, { uses: JSON.stringify(uses) }),
    redis.hset(`user:${lower}`, {
      tier: "pro",
      voucherExpiry: String(expiresAt),
    }),
  ]);

  return NextResponse.json({
    ok: true,
    durationDays,
    expiresAt,
    message: `${durationDays} days of Pro access activated!`,
  });
}
