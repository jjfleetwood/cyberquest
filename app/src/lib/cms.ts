import "server-only";
import { redis } from "@/lib/redis";
import type { StageConfig } from "@/data/types";

// ── Access control ────────────────────────────────────────────────────────────

/** Returns the set of epoch IDs that have restricted access enabled. */
export async function getRestrictedEpochs(): Promise<string[]> {
  const members = await redis.smembers("epoch_restricted");
  return members as string[];
}

/** Returns usernames allowed to access a specific restricted epoch. */
export async function getEpochAllowlist(epochId: string): Promise<string[]> {
  const members = await redis.smembers(`epoch_access:${epochId}`);
  return members as string[];
}

/**
 * Returns true if the user can access the epoch.
 * - Epoch not restricted → always true
 * - Epoch restricted + username in allowlist → true
 * - Epoch restricted + username null (guest) → false
 */
export async function canAccessEpoch(epochId: string, username: string | null): Promise<boolean> {
  const isRestricted = await redis.sismember("epoch_restricted", epochId);
  if (!isRestricted) return true;
  if (!username) return false;
  const inList = await redis.sismember(`epoch_access:${epochId}`, username.toLowerCase());
  return !!inList;
}

/** Toggle epoch restriction on/off. */
export async function setEpochRestricted(epochId: string, restricted: boolean): Promise<void> {
  if (restricted) {
    await redis.sadd("epoch_restricted", epochId);
  } else {
    await redis.srem("epoch_restricted", epochId);
  }
}

/** Grant a user access to a restricted epoch. */
export async function grantEpochAccess(epochId: string, username: string): Promise<void> {
  await redis.sadd(`epoch_access:${epochId}`, username.toLowerCase());
}

/** Revoke a user's access to a restricted epoch. */
export async function revokeEpochAccess(epochId: string, username: string): Promise<void> {
  await redis.srem(`epoch_access:${epochId}`, username.toLowerCase());
}

// ── Content overrides ─────────────────────────────────────────────────────────

export type StageOverride = {
  title?: string;
  subtitle?: string;
  info_tagline?: string;
  info_overview?: string;      // newline-separated lines
  info_keyTakeaways?: string;  // newline-separated lines
};

/** Returns Redis content overrides for a stage, or null if none exist. */
export async function getStageOverride(stageId: string): Promise<StageOverride | null> {
  const data = await redis.hgetall(`stage_override:${stageId}`);
  if (!data || Object.keys(data).length === 0) return null;
  return data as StageOverride;
}

/** Applies Redis overrides to a StageConfig, returning a merged copy. */
export function applyStageOverride(stage: StageConfig, override: StageOverride | null): StageConfig {
  if (!override) return stage;
  const merged: StageConfig = { ...stage };
  if (override.title) merged.title = override.title;
  if (override.subtitle) merged.subtitle = override.subtitle;
  if (override.info_tagline || override.info_overview || override.info_keyTakeaways) {
    merged.info = { ...stage.info };
    if (override.info_tagline) merged.info.tagline = override.info_tagline;
    if (override.info_overview) {
      merged.info.overview = override.info_overview.split("\n").map((l) => l.trim()).filter(Boolean);
    }
    if (override.info_keyTakeaways) {
      merged.info.keyTakeaways = override.info_keyTakeaways.split("\n").map((l) => l.trim()).filter(Boolean);
    }
  }
  return merged;
}

/** Save content override fields. Only saves non-empty values. */
export async function saveStageOverride(stageId: string, fields: StageOverride): Promise<void> {
  const toSave: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v && v.trim()) toSave[k] = v.trim();
  }
  if (Object.keys(toSave).length === 0) return;
  await redis.hset(`stage_override:${stageId}`, toSave);
}

/** Delete a specific override field (revert to default). Pass undefined fields to delete all. */
export async function deleteStageOverride(stageId: string, fields?: (keyof StageOverride)[]): Promise<void> {
  if (!fields) {
    await redis.del(`stage_override:${stageId}`);
  } else {
    await redis.hdel(`stage_override:${stageId}`, ...fields);
  }
}
