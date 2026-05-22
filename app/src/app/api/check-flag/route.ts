import { NextRequest, NextResponse } from "next/server";
import { stages } from "@/data/stages";
import { stageFlags } from "@/data/stage-flags";
import { getServerSession } from "@/lib/server-session";
import { awardStageInRedis } from "@/lib/server-progress";
import { canAccessStage } from "@/lib/access";

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

  const username = getServerSession(req);
  if (!await canAccessStage(body.stageId, username)) {
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
    return NextResponse.json({ correct: true, progress, timePenaltyXp });
  }

  return NextResponse.json({ correct: true, timePenaltyXp });
}
