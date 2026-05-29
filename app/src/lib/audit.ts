import "server-only";
import { redis } from "@/lib/redis";

const MAX_LOG_ENTRIES = 1000;

export async function logAdminAction(admin: string, action: string, target?: string): Promise<void> {
  const entry = JSON.stringify({ admin, action, ...(target ? { target } : {}), ts: Date.now() });
  await redis.lpush("audit:log", entry);
  redis.ltrim("audit:log", 0, MAX_LOG_ENTRIES - 1).catch(() => {});
}

export function extractAdminUsername(token: string): string | null {
  const colonIdx = token.lastIndexOf(":");
  return colonIdx > 0 ? token.slice(0, colonIdx) : null;
}
