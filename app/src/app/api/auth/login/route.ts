import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, createHmac } from "crypto";
import { redis } from "@/lib/redis";
import { hashPassword, PBKDF2_ITERATIONS } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";
import { supabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:login:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 900);
  return count > 5;
}

async function isAccountLocked(username: string): Promise<boolean> {
  const key = `lockout:user:${username}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 900); // 15-min window
  return count > 5;
}

async function clearAccountLockout(username: string): Promise<void> {
  await redis.del(`lockout:user:${username}`);
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

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  if (await isAccountLocked(username)) {
    return NextResponse.json({ error: "Account temporarily locked. Try again in 15 minutes." }, { status: 429 });
  }
  const data = await redis.hgetall<{
    passwordHash: string; salt: string; email: string;
    hashIterations?: string; isAdmin?: string;
  }>(`user:${username}`);

  if (!data?.passwordHash || !data?.salt) {
    await hashPassword(body.password, "00000000000000000000000000000000");
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const email = data.email ?? "";

  // ── Step 1: Try Supabase auth ──────────────────────────────────────────────
  let supabaseOk = false;
  if (email) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password: body.password });
      if (!error) supabaseOk = true;
    } catch { /* Supabase unavailable — fall through to PBKDF2 */ }
  }

  // ── Step 2: PBKDF2 fallback + transparent migration ───────────────────────
  if (!supabaseOk) {
    const storedIterations = data.hashIterations ? Number(data.hashIterations) : 100_000;
    const hash = await hashPassword(body.password, data.salt, storedIterations);
    if (!safeCompare(hash, data.passwordHash)) {
      // Don't clear lockout on wrong password — let it count toward the limit
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    // Transparent re-hash to current iteration count
    if (storedIterations < PBKDF2_ITERATIONS) {
      const newHash = await hashPassword(body.password, data.salt);
      redis.hset(`user:${username}`, { passwordHash: newHash, hashIterations: PBKDF2_ITERATIONS }).catch(() => {});
    }

    // Auto-migrate: create Supabase account for this user if they don't have one
    if (email) {
      supabaseAdmin.auth.admin.createUser({
        email,
        password: body.password,
        email_confirm: true,
        user_metadata: { username },
      }).then(async ({ data: created, error }) => {
        if (error?.message?.includes("already") || created?.user) {
          // Account already exists or was just created — sign in to set session
          const supabase = await createSupabaseServerClient();
          supabase.auth.signInWithPassword({ email, password: body.password }).catch(() => {});
        }
      }).catch(() => {});
    }
  }

  // Auth succeeded — clear account lockout counter
  clearAccountLockout(username).catch(() => {});

  // ── Issue HMAC session cookie (keeps all existing API routes working) ──────
  const token = signSessionToken(username);
  const res = NextResponse.json({ ok: true, username, email });
  res.cookies.set("session_token", token, sessionCookieOptions());

  // Grant admin cookie if eligible
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
