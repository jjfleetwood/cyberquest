/**
 * Seeds a demo user into Redis for VC presentations.
 * Run once: node scripts/seed-demo.mjs
 */

import { createInterface } from "readline";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = join(__dir, "../.env.local");
const envRaw = readFileSync(envPath, "utf8");
const env = Object.fromEntries(
  envRaw.split(/\r?\n/).filter(l => l && !l.startsWith("#")).map(l => {
    const [k, ...v] = l.split("=");
    return [k.trim(), v.join("=").trim()];
  })
);

const REDIS_URL   = env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN in .env.local");
  process.exit(1);
}

// ── Config ────────────────────────────────────────────────────────────────────
const USERNAME  = "demo";
const PASSWORD  = "CronOS-Demo-2026";
const EMAIL     = "demo@kryptoscronos.com";

const STAGE_IDS = [
  "bt-01","bt-02","bt-03","bt-04","bt-05","bt-06","bt-07","bt-08","bt-09","bt-10",
  "bt-11","bt-12","bt-13","bt-14","bt-15","bt-16","bt-17","bt-18","bt-19","bt-20",
  "bt-21","bt-22","bt-23","bt-24","bt-25","bt-26","bt-27","bt-28","bt-29","bt-30",
  "audit-01","audit-02","audit-03","audit-04","audit-05","audit-06",
  "audit-07","audit-08","audit-09","audit-10","audit-11","audit-12",
  "audit-t01","audit-t02","audit-t03","audit-t04","audit-t05","audit-t06",
  "audit-t07","audit-t08","audit-t09","audit-t10","audit-t11","audit-t12",
  "audit-a01",
];

const BADGES = [
  "m-stage-1","m-stage-10","m-stage-25","m-stage-50",
  "m-xp-1k","m-xp-5k","m-streak-3","m-streak-7",
];

const XP      = 6650;
const STREAK  = 12;
const TODAY   = new Date().toISOString().slice(0, 10);

// ── Helpers ───────────────────────────────────────────────────────────────────
async function redis(...args) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify([args]),
  });
  const data = await res.json();
  return data[0]?.result;
}

async function redisPipeline(commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  return res.json();
}

async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100_000, hash: "SHA-256" },
    key, 256
  );
  return Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── Prompt for confirmation ───────────────────────────────────────────────────
const rl = createInterface({ input: process.stdin, output: process.stdout });
const confirm = (q) => new Promise(resolve => rl.question(q, resolve));

console.log("\n🛡️  Kryptós CronOS — Demo User Seed Script");
console.log("─────────────────────────────────────────");
console.log(`  Username : ${USERNAME}`);
console.log(`  Password : ${PASSWORD}`);
console.log(`  Email    : ${EMAIL}`);
console.log(`  Stages   : ${STAGE_IDS.length} completed`);
console.log(`  XP       : ${XP.toLocaleString()}`);
console.log(`  Streak   : ${STREAK} days`);
console.log(`  Badges   : ${BADGES.length}`);
console.log("─────────────────────────────────────────\n");

const answer = await confirm("Proceed? This will overwrite any existing 'demo' user. (y/N): ");
rl.close();

if (answer.toLowerCase() !== "y") {
  console.log("Aborted.");
  process.exit(0);
}

// ── Seed ─────────────────────────────────────────────────────────────────────
console.log("\nHashing password…");
const salt = generateSalt();
const passwordHash = await hashPassword(PASSWORD, salt);

console.log("Writing to Redis…");

const now = Date.now();
const stagesJson  = JSON.stringify(STAGE_IDS);
const badgesJson  = JSON.stringify(BADGES);

await redisPipeline([
  // User record
  ["HSET", `user:${USERNAME}`,
    "passwordHash", passwordHash,
    "salt", salt,
    "email", EMAIL,
    "createdAt", String(now - 30 * 86_400_000), // looks like registered 30 days ago
  ],
  // Progress
  ["HSET", `progress:${USERNAME}`,
    "xp", String(XP),
    "stages", stagesJson,
    "badges", badgesJson,
    "lastActive", String(now),
  ],
  // Streak
  ["HSET", `streak:${USERNAME}`,
    "current", String(STREAK),
    "longest", String(STREAK),
    "lastDate", TODAY,
  ],
  // Leaderboard
  ["ZADD", "leaderboard", String(XP), USERNAME],
]);

console.log("\n✅ Demo user seeded successfully!");
console.log(`\n  Login at https://kryptoscronos.com/login`);
console.log(`  Username : ${USERNAME}`);
console.log(`  Password : ${PASSWORD}\n`);
