import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { TROPHIES } from "@/data/trophies";
import { SHOP_ITEMS } from "@/data/shop-items";

const TROPHY_MAP = new Map(TROPHIES.map((t) => [t.id, t]));
const SHOP_MAP = new Map(SHOP_ITEMS.map((i) => [i.id, i]));

function parseArr(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as string[];
  const s = String(val);
  try { const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch {
    return s.split(",").filter(Boolean);
  }
}

/** GET /api/profile/[username]
 *  Public profile — stats, trophies, equipped avatar items, completed stages.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const lower = username.toLowerCase();

  const [progressData, streakData, inventoryRaw, equippedRaw] = await Promise.all([
    redis.hgetall(`progress:${lower}`),
    redis.hgetall(`streak:${lower}`),
    redis.smembers(`inventory:${lower}`),
    redis.hgetall(`equipped:${lower}`),
  ]);

  if (!progressData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const coins = Number(progressData.coins ?? progressData.xp ?? 0);
  const completedStageIds = parseArr(progressData.stages);
  const badgeIds = parseArr(progressData.badges);
  const streak = Number(streakData?.current ?? 0);
  const longestStreak = Number(streakData?.longest ?? 0);

  const inventoryIds = (inventoryRaw ?? []) as string[];
  const trophies = inventoryIds
    .map((id) => {
      const t = TROPHY_MAP.get(id);
      if (!t) return null;
      return { id: t.id, name: t.name, emoji: t.emoji, tier: t.tier };
    })
    .filter(Boolean) as { id: string; name: string; emoji: string; tier: string }[];

  const equipped = (equippedRaw ?? {}) as Record<string, string>;
  const equippedItems = Object.fromEntries(
    Object.entries(equipped)
      .map(([slot, itemId]) => {
        const item = SHOP_MAP.get(itemId);
        return item ? [slot, { id: item.id, name: item.name, emoji: item.emoji, slot: item.slot }] : null;
      })
      .filter(Boolean) as [string, object][]
  );

  return NextResponse.json({
    username: lower,
    coins,
    stages: completedStageIds.length,
    badges: badgeIds.length,
    streak,
    longestStreak,
    completedStageIds,
    badgeIds,
    trophies,
    equippedItemIds: equipped,
    equippedItems,
  });
}
