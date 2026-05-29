import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";

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
  const body = await req.json() as Record<string, unknown>;
  const username = getServerSession(req) ?? "anonymous";
  const ts = Date.now();
  const key = `survey:${ts}:${username}`;

  await redis.hset(key, {
    ...Object.fromEntries(
      Object.entries(body).map(([k, v]) => [k, typeof v === "object" ? JSON.stringify(v) : String(v ?? "")])
    ),
    username,
    ts: String(ts),
  });

  // Keep a sorted set for easy retrieval: newest first
  await redis.zadd("survey:index", { score: ts, member: key });

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value;
  if (!adminToken || !verifyAdminToken(adminToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 200);

  const keys = await redis.zrange("survey:index", 0, limit - 1, { rev: true });
  if (!keys.length) return NextResponse.json([]);

  const results = await Promise.all(
    keys.map(async (key) => {
      const data = await redis.hgetall(key as string);
      return data;
    })
  );

  return NextResponse.json(results.filter(Boolean));
}
