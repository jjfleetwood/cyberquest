import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const STAGE_XP: Record<string, number> = {
  "stage-01": 100, "stage-02": 150, "stage-03": 200, "stage-04": 200,
  "stage-05": 250, "stage-06": 250, "stage-07": 300, "stage-08": 350,
  "stage-09": 350, "stage-10": 400, "stage-11": 400, "stage-12": 500,
  "stage-m01": 150, "stage-m02": 200, "stage-m03": 200, "stage-m04": 200,
  "stage-m05": 250, "stage-m06": 250, "stage-m07": 300, "stage-m08": 300,
  "stage-m09": 350, "stage-m10": 350, "stage-m11": 400, "stage-m12": 500,
};

function computeXp(completedStages: string[]): number {
  return completedStages.reduce((sum, id) => sum + (STAGE_XP[id] ?? 0), 0);
}

type ProgressPayload = {
  username: string;
  completedStages: string[];
  badges: string[];
};

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  if (!username) return NextResponse.json({ error: "username required" }, { status: 400 });

  const data = await redis.hgetall(`progress:${username}`);
  if (!data) return NextResponse.json(null);

  return NextResponse.json({
    xp: Number(data.xp ?? 0),
    completedStages: data.stages ? JSON.parse(data.stages as string) : [],
    badges: data.badges ? JSON.parse(data.badges as string) : [],
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as ProgressPayload | null;
  if (!body?.username) return NextResponse.json({ error: "invalid payload" }, { status: 400 });

  const { username, completedStages, badges } = body;
  const xp = computeXp(completedStages);

  await redis.hset(`progress:${username}`, {
    xp,
    stages: JSON.stringify(completedStages),
    badges: JSON.stringify(badges),
    lastActive: Date.now(),
  });

  await redis.zadd("leaderboard", { score: xp, member: username });

  return NextResponse.json({ ok: true });
}
