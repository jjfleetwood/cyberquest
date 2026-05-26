/**
 * Kryptós CronOS smoke driver
 *
 * Usage (from app/ directory):
 *   node .claude/skills/run-cyberquest/driver.mjs [base_url]
 *
 * Default base_url: http://localhost:3000
 * Screenshots land in /tmp/cyberquest-screenshots/
 *
 * Requires: playwright installed in app/node_modules
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 */

import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = "/tmp/cyberquest-screenshots";

try { mkdirSync(OUT); } catch {}

async function ss(page, name) {
  const path = `${OUT}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`  screenshot → ${path}`);
  return path;
}

async function dismissDevOverlay(page) {
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
    document.querySelectorAll("[data-nextjs-dev-overlay]").forEach((el) => el.remove());
  });
}

(async () => {
  console.log(`Driving ${BASE}`);
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-web-security"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    bypassCSP: true,
  });
  const page = await ctx.newPage();

  // ── Home page ──────────────────────────────────────────────────────────────
  console.log("→ home");
  await page.goto(BASE, { waitUntil: "networkidle" });
  console.log("  title:", await page.title());
  await ss(page, "01-home");

  // ── Stages map (dismiss onboarding modal) ─────────────────────────────────
  console.log("→ stages map");
  await page.goto(`${BASE}/stages`, { waitUntil: "networkidle" });
  const beginBtn = page.locator('button:has-text("Begin Training")');
  if (await beginBtn.count() > 0) {
    await beginBtn.click();
    await page.waitForTimeout(400);
  }
  await ss(page, "02-stages");

  // ── Epoch page ────────────────────────────────────────────────────────────
  console.log("→ epoch: first-journey");
  await page.goto(`${BASE}/stages/epoch/first-journey`, { waitUntil: "networkidle" });
  await ss(page, "03-epoch-first-journey");

  // ── Travel epoch (paris-july) ─────────────────────────────────────────────
  console.log("→ epoch: paris-july");
  await page.goto(`${BASE}/stages/epoch/paris-july`, { waitUntil: "networkidle" });
  await ss(page, "04-epoch-paris-july");

  // ── Individual stage — note: requires Redis env vars ─────────────────────
  // Without UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in .env.local,
  // /stages/[stageId] throws "Invalid URL" in the server component and shows
  // "This page couldn't load." This is expected in dev without credentials.
  // In production (kryptoscronos.com) all stage pages work normally.
  console.log("→ stage: paris-01 (may 500 without Redis creds)");
  const stageRes = await page.goto(`${BASE}/stages/paris-01`, { waitUntil: "networkidle" });
  await dismissDevOverlay(page);
  await ss(page, "05-stage-paris-01");
  if (stageRes?.status() !== 200) {
    console.log("  ↳ stage page returned non-200 — Redis creds missing from .env.local (expected)");
  }

  await browser.close();
  console.log("done — screenshots in", OUT);
})().catch((e) => {
  console.error("driver error:", e.message);
  process.exit(1);
});
