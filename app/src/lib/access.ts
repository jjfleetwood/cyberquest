import "server-only";
import { redis } from "@/lib/redis";

const TRIAL_DAYS = 7;
const TRIAL_MS = TRIAL_DAYS * 24 * 60 * 60 * 1000;

export async function getUserTier(username: string): Promise<"free" | "pro" | "trial"> {
  const lower = username.toLowerCase();
  const [tier, createdAt] = await Promise.all([
    redis.hget(`user:${lower}`, "tier"),
    redis.hget(`user:${lower}`, "createdAt"),
  ]);
  if (tier === "pro") return "pro";
  const age = Date.now() - Number(createdAt ?? 0);
  if (age < TRIAL_MS) return "trial";
  return "free";
}

export async function canAccessStage(stageId: string, username: string | null): Promise<boolean> {
  if (!username) return false;
  const tier = await getUserTier(username);
  return tier === "pro" || tier === "trial";
}
