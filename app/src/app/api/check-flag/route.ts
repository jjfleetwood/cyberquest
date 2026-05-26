import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { stages } from "@/data/stages";
import { stageFlags } from "@/data/stage-flags";
import { getServerSession } from "@/lib/server-session";
import { awardStageInRedis } from "@/lib/server-progress";
import { canAccessStage } from "@/lib/access";
import { redis } from "@/lib/redis";

function verifyAdminToken(token: string): string | null {
  const secret = process.env.ADMIN_SECRET;
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


export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.stageId !== "string" || typeof body.flag !== "string") {
    return NextResponse.json({ correct: false }, { status: 400 });
  }

  const correctFlag = stageFlags[body.stageId];
  if (!correctFlag) {
    return NextResponse.json({ correct: false }, { status: 404 });
  }

  const stage = stages.find((s) => s.id === body.stageId);
  if (!stage) {
    return NextResponse.json({ correct: false }, { status: 404 });
  }

  const sessionUsername = getServerSession(req);
  const adminUsername = verifyAdminToken(req.cookies.get("admin_token")?.value ?? "");
  const isAdmin = adminUsername !== null;
  const username = sessionUsername ?? adminUsername;
  if (!isAdmin && !await canAccessStage(body.stageId, username)) {
    return NextResponse.json({ correct: false }, { status: 403 });
  }

  const correct = body.flag.trim() === correctFlag;
  if (!correct) {
    return NextResponse.json({ correct: false });
  }

  // Penalty: client sends timeTakenMs; server caps it to max 20% of base XP
  const timeTakenMs = typeof body.timeTakenMs === "number" ? body.timeTakenMs : 0;
  const freeMs = 10 * 60 * 1000;
  const penaltyMinutes = Math.max(0, Math.floor((timeTakenMs - freeMs) / 60000));
  const maxPenalty = Math.floor(stage.xp * 0.2);
  const timePenaltyXp = Math.min(penaltyMinutes, maxPenalty);

  // Award server-side if user is authenticated
  if (username) {
    const progress = await awardStageInRedis(username, stage.id, stage.badge.id, timePenaltyXp);
    redis.lpush("admin:flag-log", JSON.stringify({ username, stageId: body.stageId, flagValue: correctFlag, ts: Date.now() }))
      .then(() => redis.ltrim("admin:flag-log", 0, 499))
      .catch(() => {});
    return NextResponse.json({ correct: true, progress, timePenaltyXp });
  }

  return NextResponse.json({ correct: true, timePenaltyXp });
}
