import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { createHmac, timingSafeEqual } from "crypto";

function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const username = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  let username = getServerSession(req);
  const adminToken = req.cookies.get("admin_token")?.value ?? "";
  const isAdmin = verifyAdminToken(adminToken);

  // Fallback: use admin token identity when session cookie is absent
  if (!username && isAdmin) {
    const colonIdx = adminToken.lastIndexOf(":");
    username = colonIdx > 0 ? adminToken.slice(0, colonIdx) : null;
  }

  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await redis.hgetall<{ email: string; tier: string; createdAt: string }>(`user:${username}`);
  if (!data && !isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const superAdmin = process.env.ADMIN_USERNAME?.toLowerCase();
  const isSuperAdmin = !!superAdmin && username === superAdmin;

  // Compute tier + trial days remaining
  const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
  const rawTier = data?.tier ?? null;
  const createdAt = Number(data?.createdAt ?? 0);
  let tier: "free" | "pro" | "all-star" | "trial";
  let trialDaysLeft: number | null = null;
  if (rawTier === "all-star") tier = "all-star";
  else if (rawTier === "pro") tier = "pro";
  else if (rawTier === "free") tier = "free";
  else {
    const msLeft = createdAt + TRIAL_MS - Date.now();
    if (msLeft > 0) {
      tier = "trial";
      trialDaysLeft = Math.max(1, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
    } else {
      tier = "free";
    }
  }

  return NextResponse.json({ username, email: data?.email ?? "", isAdmin, isSuperAdmin, tier, trialDaysLeft });
}
