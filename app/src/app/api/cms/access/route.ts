import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/server-session";
import { canAccessEpoch } from "@/lib/cms";

export async function GET(req: NextRequest) {
  const epochId = req.nextUrl.searchParams.get("epochId");
  if (!epochId) return NextResponse.json({ error: "epochId required" }, { status: 400 });

  const username = getServerSession(req);
  const allowed = await canAccessEpoch(epochId, username);
  return NextResponse.json({ allowed });
}
