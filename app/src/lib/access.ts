import "server-only";
import { redis } from "@/lib/redis";

export const FREE_STAGE_IDS = new Set(["bt-01", "bt-02", "bt-03"]);

export async function getUserTier(username: string): Promise<"free" | "pro"> {
  const tier = await redis.hget(`user:${username.toLowerCase()}`, "tier");
  return tier === "pro" ? "pro" : "free";
}

export async function canAccessStage(stageId: string, username: string | null): Promise<boolean> {
  if (FREE_STAGE_IDS.has(stageId)) return true;
  if (!username) return false;
  const tier = await getUserTier(username);
  return tier === "pro";
}
