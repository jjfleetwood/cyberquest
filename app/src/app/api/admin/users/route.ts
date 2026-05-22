import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";

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

function parseArr(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as string[];
  const s = String(val);
  try { const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch {
    return s.split(",").filter(Boolean);
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Scan all user:* keys
  const userKeys: string[] = [];
  let cursor = 0;
  do {
    const [next, batch] = await redis.scan(cursor, { match: "user:*", count: 100 });
    cursor = Number(next);
    userKeys.push(...(batch as string[]));
  } while (cursor !== 0);

  // Fetch user + progress for each in parallel
  const users = await Promise.all(
    userKeys.map(async (key) => {
      const username = key.replace(/^user:/, "");
      const [userData, progressData] = await Promise.all([
        redis.hgetall(key),
        redis.hgetall(`progress:${username}`),
      ]);
      const stageIds = parseArr(progressData?.stages);
      const badges = parseArr(progressData?.badges);
      const streakData = await redis.hgetall(`streak:${username}`);
      return {
        username,
        email: (userData?.email as string) ?? "",
        createdAt: userData?.createdAt ? Number(userData.createdAt) : null,
        tier: (userData?.tier as string) ?? "free",
        coins: Number(progressData?.coins ?? progressData?.xp ?? 0),
        stageIds,
        stages: stageIds.length,
        badges: badges.length,
        streak: streakData?.current ? Number(streakData.current) : 0,
        lastActive: progressData?.lastActive ? Number(progressData.lastActive) : null,
      };
    })
  );

  users.sort((a, b) => b.coins - a.coins);
  return NextResponse.json(users);
}
