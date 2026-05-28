import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";

const MODE_KEY = "feature:downloads:mode";
const ALLOWLIST_KEY = "feature:downloads:allowlist";

export async function GET(req: NextRequest) {
  const username = getServerSession(req);

  const mode = ((await redis.get(MODE_KEY)) as string) ?? "off";

  if (mode === "all") return NextResponse.json({ allowed: true });
  if (mode === "off" || !username) return NextResponse.json({ allowed: false });

  // allowlist mode — check if this user is in the set
  const isMember = await redis.sismember(ALLOWLIST_KEY, username);
  return NextResponse.json({ allowed: !!isMember });
}
