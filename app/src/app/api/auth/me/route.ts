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
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await redis.hgetall<{ email: string }>(`user:${username}`);
  if (!data) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminToken = req.cookies.get("admin_token")?.value;
  const isAdmin = adminToken ? verifyAdminToken(adminToken) : false;

  return NextResponse.json({ username, email: data.email ?? "", isAdmin });
}
