import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";

function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const username = token.slice(0, colonIdx);
  const signature = token.slice(colonIdx + 1);
  if (!username || !signature) return false;
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch { return false; }
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100_000, hash: "SHA-256" },
    key, 256
  );
  return Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

const STAGE_IDS = [
  "bt-01","bt-02","bt-03","bt-04","bt-05","bt-06","bt-07","bt-08","bt-09","bt-10",
  "bt-11","bt-12","bt-13","bt-14","bt-15","bt-16","bt-17","bt-18","bt-19","bt-20",
  "bt-21","bt-22","bt-23","bt-24","bt-25","bt-26","bt-27","bt-28","bt-29","bt-30",
  "audit-01","audit-02","audit-03","audit-04","audit-05","audit-06",
  "audit-07","audit-08","audit-09","audit-10","audit-11","audit-12",
  "audit-t01","audit-t02","audit-t03","audit-t04","audit-t05","audit-t06",
  "audit-t07","audit-t08","audit-t09","audit-t10","audit-t11","audit-t12",
  "audit-a01",
];

const BADGES = [
  "m-stage-1","m-stage-10","m-stage-25","m-stage-50",
  "m-xp-1k","m-xp-5k","m-streak-3","m-streak-7",
];

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const USERNAME = "demo";
  const PASSWORD = "CronOS-Demo-2026";
  const EMAIL    = "demo@kryptoscronos.com";
  const XP       = 6650;
  const STREAK   = 12;
  const TODAY    = new Date().toISOString().slice(0, 10);
  const now      = Date.now();

  const salt         = generateSalt();
  const passwordHash = await hashPassword(PASSWORD, salt);

  await Promise.all([
    redis.hset(`user:${USERNAME}`, {
      passwordHash,
      salt,
      email: EMAIL,
      createdAt: String(now - 30 * 86_400_000),
    }),
    redis.hset(`progress:${USERNAME}`, {
      xp: String(XP),
      stages: JSON.stringify(STAGE_IDS),
      badges: JSON.stringify(BADGES),
      lastActive: String(now),
    }),
    redis.hset(`streak:${USERNAME}`, {
      current: String(STREAK),
      longest: String(STREAK),
      lastDate: TODAY,
    }),
    redis.zadd("leaderboard", { score: XP, member: USERNAME }),
  ]);

  return NextResponse.json({
    ok: true,
    username: USERNAME,
    password: PASSWORD,
    stages: STAGE_IDS.length,
    xp: XP,
    streak: STREAK,
    badges: BADGES.length,
  });
}
