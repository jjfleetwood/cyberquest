#!/usr/bin/env npx tsx
/**
 * Grants a user pro tier + allowlist access to all restricted epochs.
 * Usage: npx tsx scripts/grant-access.ts <username>
 */

import { Redis } from "@upstash/redis";
import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env.local") });

const username = process.argv[2]?.toLowerCase();
if (!username) {
  console.error("Usage: npx tsx scripts/grant-access.ts <username>");
  process.exit(1);
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Set pro tier
await redis.hset(`user:${username}`, { tier: "pro" });
console.log(`✓ Set user:${username} tier → pro`);

// Add to all restricted epoch allowlists
const restricted = (await redis.smembers("epoch_restricted")) as string[];
if (restricted.length === 0) {
  console.log("  (no restricted epochs)");
} else {
  for (const epochId of restricted) {
    await redis.sadd(`epoch_access:${epochId}`, username);
    console.log(`✓ Added ${username} → epoch_access:${epochId}`);
  }
}

console.log(`\nDone — ${username} has full access.`);
