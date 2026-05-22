import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { hashPassword, generateSalt, PBKDF2_ITERATIONS } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:resetpw:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as {
    token?: string; password?: string;
  } | null;

  if (!body?.token || !body?.password) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  if (body.password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const username = await redis.get<string>(`reset:${body.token}`);
  if (!username) {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(body.password, salt);

  await redis.hset(`user:${username}`, { passwordHash, salt, hashIterations: PBKDF2_ITERATIONS });
  await redis.del(`reset:${body.token}`);

  const sessionToken = signSessionToken(username);
  const res = NextResponse.json({ username });
  res.cookies.set("session_token", sessionToken, sessionCookieOptions());
  return res;
}
