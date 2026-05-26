import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { awardStageInRedis } from "@/lib/server-progress";

function extractAdminUsername(req: NextRequest): string | null {
  const secret = process.env.ADMIN_SECRET;
  const token = req.cookies.get("admin_token")?.value ?? "";
  if (!secret || !token) return null;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return null;
  const user = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  if (!user || !sig) return null;
  const expected = createHmac("sha256", secret).update(user).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return user;
  } catch { return null; }
}

export async function GET(req: NextRequest) {
  const username = getServerSession(req) ?? extractAdminUsername(req);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const lower = username.toLowerCase();
  const [data, streakData] = await Promise.all([
    redis.hgetall(`progress:${lower}`),
    redis.hgetall(`streak:${lower}`),
  ]);
  if (!data) return NextResponse.json(null);

  function parseArr(val: unknown): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val as string[];
    const s = String(val);
    try { const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch { return s.split(",").filter(Boolean); }
  }

  // Read `coins` field; fall back to legacy `xp` field for existing records
  const coins = Number(data.coins ?? data.xp ?? 0);
  return NextResponse.json({
    coins,
    coinsSpent: Number(data.coinsSpent ?? 0),
    completedStages: parseArr(data.stages),
    badges: parseArr(data.badges),
    streak: streakData ? Number(streakData.current ?? 0) : 0,
  });
}

export async function POST(req: NextRequest) {
  // Session cookie required — username is taken from the verified token, not the body
  const username = getServerSession(req);
  if (!username) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.stageId !== "string") {
    return NextResponse.json({ error: "stageId required" }, { status: 400 });
  }

  const progress = await awardStageInRedis(username, body.stageId, body.badgeId ?? undefined);
  return NextResponse.json({ ok: true, progress });
}
