import { redis } from "@/lib/redis";
import { stages } from "@/data/stages";
import type { UserProgress } from "@/lib/progress";

function stageXp(stageId: string): number {
  return stages.find((s) => s.id === stageId)?.xp ?? 0;
}

function getDayKey(): string {
  return `lb:d:${new Date().toISOString().slice(0, 10)}`;
}

function getWeekKey(): string {
  const d = new Date();
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), diff));
  return `lb:w:${monday.toISOString().slice(0, 10)}`;
}

/**
 * Awards a stage in Redis for a verified user. XP is computed server-side.
 * Idempotent — calling twice for the same stage has no effect on XP.
 * timePenaltyXp is accumulated only once per new stage completion.
 */
export async function awardStageInRedis(
  username: string,
  stageId: string,
  badgeId?: string,
  timePenaltyXp = 0
): Promise<UserProgress> {
  const key = `progress:${username.toLowerCase()}`;
  const data = await redis.hgetall(key);

  function parseArr(val: unknown): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val as string[];
    const s = String(val);
    try { const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch { return s.split(",").filter(Boolean); }
  }

  const completedStages: string[] = parseArr(data?.stages);
  const badges: string[] = parseArr(data?.badges);

  const isNew = !completedStages.includes(stageId);

  if (isNew) {
    completedStages.push(stageId);
  }
  if (badgeId && !badges.includes(badgeId)) {
    badges.push(badgeId);
  }

  const baseXp = completedStages.reduce((sum, id) => sum + stageXp(id), 0);
  const storedPenalty = Number(data?.penalty ?? 0);
  const newPenalty = isNew ? storedPenalty + timePenaltyXp : storedPenalty;
  const xp = Math.max(0, baseXp - newPenalty);

  await redis.hset(key, {
    xp,
    stages: JSON.stringify(completedStages),
    badges: JSON.stringify(badges),
    lastActive: Date.now(),
    penalty: newPenalty,
  });

  // All-time leaderboard
  await redis.zadd("leaderboard", { score: xp, member: username.toLowerCase() });

  // Daily and weekly leaderboards — only update on new stage completion
  if (isNew) {
    const deltaXp = stageXp(stageId) - timePenaltyXp;
    if (deltaXp > 0) {
      const dayKey = getDayKey();
      const weekKey = getWeekKey();
      await redis.zincrby(dayKey, deltaXp, username.toLowerCase());
      await redis.expire(dayKey, 172800); // 48h TTL
      await redis.zincrby(weekKey, deltaXp, username.toLowerCase());
      await redis.expire(weekKey, 1209600); // 14 day TTL
    }
  }

  return { xp, completedStages, badges };
}
