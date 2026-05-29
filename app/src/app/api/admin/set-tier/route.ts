import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { logAdminAction, extractAdminUsername } from "@/lib/audit";

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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as { username?: string; tier?: string } | null;
  const username = body?.username?.toLowerCase().trim();
  const VALID_TIERS = ["pro", "all-star", "free"] as const;
  type ValidTier = typeof VALID_TIERS[number];
  const tier: ValidTier = VALID_TIERS.includes(body?.tier as ValidTier) ? (body!.tier as ValidTier) : "free";

  if (!username) return NextResponse.json({ error: "username required" }, { status: 400 });

  const exists = await redis.exists(`user:${username}`);
  if (!exists) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await redis.hset(`user:${username}`, { tier });
  logAdminAction(extractAdminUsername(token!) ?? "admin", "set-tier", `${username}:${tier}`).catch(() => {});
  return NextResponse.json({ ok: true, username, tier });
}
