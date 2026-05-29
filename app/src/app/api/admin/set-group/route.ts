import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { logAdminAction, extractAdminUsername } from "@/lib/audit";

const VALID_GROUPS = new Set(["elementary", "junior-hs", "high-school", "university", "career", "curious"]);

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
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as { username?: string; groups?: unknown } | null;
  const groups = body?.groups;
  if (!body?.username || !Array.isArray(groups) || groups.length === 0 || !groups.every((g) => VALID_GROUPS.has(g as string))) {
    return NextResponse.json({ error: "invalid params" }, { status: 400 });
  }

  const lower = body.username.toLowerCase();
  await redis.hset(`user:${lower}`, { userGroups: JSON.stringify(groups) });
  logAdminAction(extractAdminUsername(token!) ?? "admin", "set-group", `${lower}:${(groups as string[]).join(",")}`).catch(() => {});
  return NextResponse.json({ ok: true });
}
