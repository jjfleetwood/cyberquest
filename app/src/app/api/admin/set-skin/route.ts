import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { logAdminAction, extractAdminUsername } from "@/lib/audit";

const VALID_SKINS = new Set(["youth", "standard", "mature"]);

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

  const body = await req.json().catch(() => null) as { username?: string; skin?: string } | null;
  if (!body?.username || !body?.skin || !VALID_SKINS.has(body.skin)) {
    return NextResponse.json({ error: "invalid params" }, { status: 400 });
  }

  await redis.hset(`progress:${body.username.toLowerCase()}`, { skin: body.skin });
  logAdminAction(extractAdminUsername(token!) ?? "admin", "set-skin", `${body.username.toLowerCase()}:${body.skin}`).catch(() => {});
  return NextResponse.json({ ok: true });
}
