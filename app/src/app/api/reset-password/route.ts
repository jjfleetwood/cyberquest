import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { hashPassword, generateSalt } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";

export async function POST(req: NextRequest) {
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

  await redis.hset(`user:${username}`, { passwordHash, salt });
  await redis.del(`reset:${body.token}`);

  const sessionToken = signSessionToken(username);
  const res = NextResponse.json({ username });
  res.cookies.set("session_token", sessionToken, sessionCookieOptions());
  return res;
}
