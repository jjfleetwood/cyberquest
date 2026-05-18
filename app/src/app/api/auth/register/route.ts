import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { hashPassword, generateSalt } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";
import { createHmac } from "crypto";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:register:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as {
    username?: string; email?: string; password?: string;
  } | null;

  const username = body?.username?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";

  if (username.length < 3) return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (!email.includes("@") || !email.includes(".")) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const lower = username.toLowerCase();
  const existing = await redis.exists(`user:${lower}`);
  if (existing) {
    return NextResponse.json({ error: "Username is already taken.", taken: true }, { status: 409 });
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  await redis.hset(`user:${lower}`, {
    passwordHash,
    salt,
    email: escapeHtml(email),
    createdAt: Date.now(),
  });

  const sessionToken = signSessionToken(lower);
  const res = NextResponse.json({ ok: true, username: lower, email });
  res.cookies.set("session_token", sessionToken, sessionCookieOptions());

  // Grant admin cookie inline if eligible
  const adminUsername = process.env.ADMIN_USERNAME;
  const secret = process.env.ADMIN_SECRET;
  if (adminUsername && secret && lower === adminUsername.toLowerCase()) {
    const sig = createHmac("sha256", secret).update(lower).digest("hex");
    res.cookies.set("admin_token", `${lower}:${sig}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}
