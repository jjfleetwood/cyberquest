---
name: run-cyberquest
description: Run, screenshot, and smoke-test the Kryptós CronOS Next.js app locally. Use this skill to start the dev server, take screenshots, verify pages render, and drive the browser to test the stages map, epoch pages, and travel curriculum.
---

Kryptós CronOS is a Next.js 16 / React 19 app at `app/`. The driver is `.claude/skills/run-cyberquest/driver.mjs`, run via Playwright (already installed in `node_modules`). All paths below are relative to `app/`.

## Prerequisites

Playwright must be installed in `app/node_modules` and the Chromium browser downloaded:

```bash
# From app/ directory
npm install --save-dev playwright
npx playwright install chromium
```

This was confirmed working on 2026-05-25.

## Build

No pre-build step needed for dev. For a type check before pushing:

```bash
node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json
```

Deploy to production:

```bash
npx vercel --prod --yes
```

## Run (agent path)

Start the dev server in background, then run the driver:

```bash
# Terminal 1 — start dev server
cd "C:/Users/Ajax/Projects/cyberquest/app"
npm run dev
# → Ready at http://localhost:3000

# Terminal 2 — run smoke driver
cd "C:/Users/Ajax/Projects/cyberquest/app"
node .claude/skills/run-cyberquest/driver.mjs
```

The driver visits: home, stages map, first-journey epoch, paris-july epoch, and one stage page. Screenshots land in `/tmp/cyberquest-screenshots/`:

| File | What it shows |
|------|--------------|
| `01-home.png` | Landing page with hero + stats bar |
| `02-stages.png` | Stage map after dismissing onboarding modal |
| `03-epoch-first-journey.png` | First Journey epoch card list |
| `04-epoch-paris-july.png` | Paris in July epoch (travel curriculum) |
| `05-stage-paris-01.png` | Individual stage page (may 500 without Redis — see Gotchas) |

To drive a different port (e.g. 3001):

```bash
node .claude/skills/run-cyberquest/driver.mjs http://localhost:3001
```

## Run (human path)

```bash
cd "C:/Users/Ajax/Projects/cyberquest/app"
npm run dev
# Open http://localhost:3000 in a browser
```

The onboarding modal appears for first-time visitors — click "Begin Training" to dismiss.

## Gotchas

**Stage pages (`/stages/[stageId]`) crash in dev without Redis credentials.**  
`canAccessEpoch()` and `canAccessStage()` call Upstash via `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. These vars are not in `.env.local`. Without them, the Redis client throws `"Invalid URL"`, Next.js wraps it as `"Failed to parse URL from /pipeline"`, and the stage page shows "This page couldn't load." This is expected locally. Stage pages work on kryptoscronos.com (Vercel has the creds). The driver logs this gracefully instead of failing.

**Next.js dev overlay intercepts pointer events.**  
The CSP (set by `src/proxy.ts`) blocks `eval()`, which React dev mode needs. This causes a Next.js error overlay to appear in Playwright sessions and intercept clicks. The driver removes the overlay via `page.evaluate()` before interacting, and uses `bypassCSP: true` + `--disable-web-security` in the Playwright launch args.

**Onboarding modal covers the stages map.**  
`OnboardingModal` shows on first visit and covers all content. The driver clicks "Begin Training" to dismiss it before screenshotting. If the button isn't found (already dismissed via localStorage), the driver proceeds without error.

**Second `npm run dev` picks port 3001 if 3000 is taken.**  
If a dev server is already running, Next.js warns and binds to 3001. Pass the alternate port to the driver: `node driver.mjs http://localhost:3001`.

**`playwright` not in `node_modules` by default.**  
The project's `package.json` doesn't include playwright. Run `npm install --save-dev playwright && npx playwright install chromium` once before using this driver.

**Stage IDs are epoch-prefixed, not sequential.**  
Stage IDs follow the pattern `<epoch-prefix>-NN` (e.g. `bt-01` for first-journey, `paris-01` for paris-july). The generic ID `s01` doesn't exist and returns "Stage not found."

## Troubleshooting

**`Cannot find package 'playwright'`** — Script must be run from `app/` (where `node_modules` lives), not from `/tmp` or another directory. The driver's `import` resolves relative to the working directory.

**`Error: ENOENT .next/dev/logs`** — The dev server hasn't started yet. Wait for "Ready in Xms" before running the driver.

**Port 3000 already in use** — Another dev server is running. Either kill it (`taskkill /PID <pid> /F` on Windows) or pass `http://localhost:3001` to the driver.

**`MODULE_NOT_FOUND` when running `npx vercel`** — On Windows, `node node_modules/.bin/vercel` fails because it's a `.cmd` batch file. Use `npx vercel --prod --yes` from the `app/` directory instead (the PowerShell tool handles this correctly; the Bash tool also works if run with `cd "C:/Users/Ajax/Projects/cyberquest/app"`).
