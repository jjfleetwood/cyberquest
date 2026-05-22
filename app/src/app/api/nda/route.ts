import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createHmac, timingSafeEqual } from "crypto";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function signNdaToken(email: string): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return "";
  return `${email}:${createHmac("sha256", secret).update(email).digest("hex")}`;
}

export function verifyNdaToken(token: string): string | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return null;
  const email = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  const expected = createHmac("sha256", secret).update(email).digest("hex");
  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return null;
    return timingSafeEqual(sigBuf, expBuf) ? email : null;
  } catch {
    return null;
  }
}

// Rate limit: 5 submissions per IP per hour
async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:nda:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as {
    name?: string;
    email?: string;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  await redis.hset(`nda:${safeEmail}`, {
    name: safeName,
    email: safeEmail,
    acceptedAt: Date.now(),
    ip,
  });

  const token = signNdaToken(safeEmail);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("nda_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: "/",
  });
  return res;
}

export async function GET(req: NextRequest) {
  // Admin-only: list all NDA signatories
  const { createHmac: hmac, timingSafeEqual } = await import("crypto");
  const adminToken = req.cookies.get("admin_token")?.value;
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const colonIdx = adminToken.lastIndexOf(":");
  if (colonIdx === -1) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const username = adminToken.slice(0, colonIdx);
  const sig = adminToken.slice(colonIdx + 1);
  const expected = hmac("sha256", secret).update(username).digest("hex");
  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Scan for nda:* keys
  let cursor = 0;
  const keys: string[] = [];
  do {
    const [nextCursor, batch] = await redis.scan(cursor, { match: "nda:*", count: 100 });
    cursor = Number(nextCursor);
    keys.push(...batch);
  } while (cursor !== 0);

  const signatories = await Promise.all(
    keys.map((k) => redis.hgetall(k))
  );

  return NextResponse.json(
    signatories
      .filter(Boolean)
      .sort((a, b) => {
        const bts = Number((b as Record<string, string>).acceptedAt ?? (b as Record<string, string>).sentAt ?? 0);
        const ats = Number((a as Record<string, string>).acceptedAt ?? (a as Record<string, string>).sentAt ?? 0);
        return bts - ats;
      })
  );
}
