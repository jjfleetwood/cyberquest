import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { logAdminAction } from "@/lib/audit";

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

const SURVEY_REWARD_DAYS = 30;
const SURVEY_BODY_LIMIT = 10_000;

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > SURVEY_BODY_LIMIT) {
    return NextResponse.json({ error: "Survey body too large." }, { status: 413 });
  }
  const body = JSON.parse(raw) as Record<string, unknown>;
  const username = getServerSession(req) ?? "anonymous";
  const ts = Date.now();
  const key = `survey:${ts}:${username}`;

  await redis.hset(key, {
    ...Object.fromEntries(
      Object.entries(body).map(([k, v]) => [k, typeof v === "object" ? JSON.stringify(v) : String(v ?? "")])
    ),
    username,
    ts: String(ts),
  });
  await redis.zadd("survey:index", { score: ts, member: key });

  // Grant 30-day Pro access to logged-in users who haven't already claimed this reward
  let reward: { durationDays: number; message: string } | null = null;
  if (username !== "anonymous") {
    const lower = username.toLowerCase();
    const alreadyRewarded = await redis.get(`survey:rewarded:${lower}`);
    if (!alreadyRewarded) {
      const tier = await redis.hget(`user:${lower}`, "tier");
      // Only reward free/trial users (don't clobber active Stripe Pro)
      if (tier !== "pro" && tier !== "all-star") {
        const expiresAt = ts + SURVEY_REWARD_DAYS * 24 * 60 * 60 * 1000;
        await Promise.all([
          redis.hset(`user:${lower}`, { tier: "pro", voucherExpiry: String(expiresAt) }),
          redis.set(`survey:rewarded:${lower}`, "1"),
        ]);
        logAdminAction("survey", "upgrade-pro", `${lower}:${SURVEY_REWARD_DAYS}d`).catch(() => {});
        reward = { durationDays: SURVEY_REWARD_DAYS, message: `${SURVEY_REWARD_DAYS} days of Pro access unlocked — thank you!` };
      }
    }
  }

  return NextResponse.json({ ok: true, ...(reward ? { reward } : {}) });
}

export async function GET(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value;
  if (!adminToken || !verifyAdminToken(adminToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 200);

  const keys = await redis.zrange("survey:index", 0, limit - 1, { rev: true });
  if (!keys.length) return NextResponse.json([]);

  const results = await Promise.all(
    keys.map(async (key) => {
      const data = await redis.hgetall(key as string);
      return data;
    })
  );

  return NextResponse.json(results.filter(Boolean));
}
