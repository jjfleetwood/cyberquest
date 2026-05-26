import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";

const VALID_GROUPS = new Set(["elementary", "junior-hs", "high-school", "university", "career", "curious"]);

export async function GET(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ group: null });

  const group = await redis.hget(`user:${username.toLowerCase()}`, "userGroup");
  return NextResponse.json({ group: VALID_GROUPS.has(group as string) ? group : null });
}

export async function POST(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.group || !VALID_GROUPS.has(body.group)) {
    return NextResponse.json({ error: "invalid group" }, { status: 400 });
  }

  await redis.hset(`user:${username.toLowerCase()}`, { userGroup: body.group });
  return NextResponse.json({ ok: true });
}
