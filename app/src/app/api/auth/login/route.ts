import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, createHmac } from "crypto";
import { redis } from "@/lib/redis";
import { hashPassword, PBKDF2_ITERATIONS } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:login:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 900); // 15-minute window
  return count > 5;
}

function safeCompare(a: string, b: string): boolean {
  try {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  const body = await req.json().catch(() => null);
  if (!body?.username || !body?.password || typeof body.username !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const username = body.username.toLowerCase().trim();

  // Admin is never rate-limited
  const adminUser = process.env.ADMIN_USERNAME?.toLowerCase();
  if (username !== adminUser && await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const data = await redis.hgetall<{ passwordHash: string; salt: string; email: string; hashIterations?: string; isAdmin?: string }>(`user:${username}`);

  if (!data?.passwordHash || !data?.salt) {
    // Still hash to avoid timing-based username enumeration
    await hashPassword(body.password, "00000000000000000000000000000000");
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const storedIterations = data.hashIterations ? Number(data.hashIterations) : 100_000;
  const hash = await hashPassword(body.password, data.salt, storedIterations);
  if (!safeCompare(hash, data.passwordHash)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  // Transparent re-hash: upgrade old 100k accounts to 310k on next login
  if (storedIterations < PBKDF2_ITERATIONS) {
    const newHash = await hashPassword(body.password, data.salt);
    redis.hset(`user:${username}`, { passwordHash: newHash, hashIterations: PBKDF2_ITERATIONS }).catch(() => {});
  }

  const token = signSessionToken(username);
  const res = NextResponse.json({ ok: true, username, email: data.email ?? "" });
  res.cookies.set("session_token", token, sessionCookieOptions());

  // Grant admin cookie inline if eligible (super admin by env var, or Redis-flagged admin)
  const adminUsername = process.env.ADMIN_USERNAME;
  const secret = process.env.ADMIN_SECRET;
  const isElevated = (adminUsername && username === adminUsername.toLowerCase()) || data.isAdmin === "true";
  if (secret && isElevated) {
    const sig = createHmac("sha256", secret).update(username).digest("hex");
    res.cookies.set("admin_token", `${username}:${sig}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}
