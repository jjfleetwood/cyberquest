import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type SyncPayload = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as SyncPayload | null;
  if (!body?.username || !body?.email || !body?.passwordHash || !body?.salt) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const { username, email, passwordHash, salt } = body;
  const key = `user:${username.toLowerCase()}`;

  // First-write-wins: never overwrite an existing user record
  const existing = await redis.hgetall(key);
  if (existing && Object.keys(existing).length > 0) {
    return NextResponse.json({ ok: true });
  }

  await redis.hset(key, { passwordHash, salt, email: email.toLowerCase() });
  await redis.set(`email:${email.toLowerCase()}`, username.toLowerCase());

  return NextResponse.json({ ok: true });
}
