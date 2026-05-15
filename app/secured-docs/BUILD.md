# Kryptós CronOS — Build Guide
**Version:** 2.0  
**Date:** 2026-05-11

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 24.x | Runtime (matches Vercel build) |
| npm | bundled with Node | Package manager |
| Git | any | Source control |

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/jjfleetwood/kryptos-cronos.git
cd kryptos-cronos
```

### 2. Install dependencies

```bash
cd app
npm install
```

### 3. Configure environment variables

Create `app/.env.local` (never commit this file):

```env
# Upstash Redis — required for leaderboard, progress sync, rate limiting
UPSTASH_REDIS_REST_URL=https://<your-instance>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>

# Resend — required for registration email and password reset
RESEND_API_KEY=re_<your-key>
ADMIN_EMAIL=<email to receive registration alerts>

# Admin auth — required for /admin dashboard
ADMIN_USERNAME=<admin username>
ADMIN_SECRET=<32+ char random secret for HMAC signing>
```

### 4. Start the dev server

```bash
cd app
npm run dev
```

Opens at `http://localhost:3000`. Hot reload is on via Turbopack.

---

## Available Scripts

Run from `app/`:

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server (port 3000, Turbopack HMR) |
| `npm run build` | Production build — catches type errors and route issues |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint check across all source files |
| `npx tsc --noEmit` | Type-check without emitting (run before PRs) |
| `npm audit` | Dependency vulnerability scan |

---

## Build Verification Checklist

Before pushing to `master` (which triggers a Vercel deploy):

```bash
cd app

# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Production build (catches Next.js-specific issues)
npm run build

# 4. Dependency scan
npm audit
```

A clean `npm run build` output will show:
```
Route (app)                    Size     First Load JS
┌ ○ /                          ...
├ ○ /login                     ...
├ ○ /stages                    ...
...
ƒ Proxy (Middleware)           ...
```

The `ƒ Proxy (Middleware)` line confirms `proxy.ts` is active.

---

## Project Structure (from app/)

```
app/
├── src/
│   ├── proxy.ts              ← Next.js 16 middleware (NOT middleware.ts)
│   ├── app/                  ← App Router: pages + API routes
│   ├── components/           ← React components
│   ├── data/                 ← Stage configs (TypeScript)
│   └── lib/                  ← Auth, progress, Redis utilities
├── secured-docs/             ← Admin-only markdown docs (gated via /api/docs)
├── public/                   ← Static assets
├── next.config.ts            ← Security headers, file tracing config
├── tailwind.config.ts        ← Tailwind CSS configuration
├── tsconfig.json             ← TypeScript strict mode
└── package.json
```

---

## CI/CD Pipeline

### Current (Automatic)

```
git push origin master
        │
        └── Vercel GitHub App detects push
                ├── Installs: npm install (Node 24.x)
                ├── Builds: next build (Turbopack)
                ├── Bundles secured-docs/ via outputFileTracingIncludes
                └── Deploys to: kryptoscronos.com (iad1)
```

Deploy takes approximately 60–90 seconds. Monitor at vercel.com/dashboard.

### Recommended CI (Not Yet Implemented)

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '24' }
      - run: cd app && npm ci
      - run: cd app && npm run lint
      - run: cd app && npx tsc --noEmit
      - run: cd app && npm run build
      - run: cd app && npm audit --audit-level=moderate
```

---

## Environment Variables Reference

### Runtime (Vercel Production)

Set at: vercel.com → Project → Settings → Environment Variables

| Variable | Required | Description |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis auth token |
| `RESEND_API_KEY` | Yes | Resend API key for email |
| `ADMIN_EMAIL` | Yes | Admin notification recipient |
| `ADMIN_USERNAME` | Yes | Admin dashboard login username |
| `ADMIN_SECRET` | Yes | 32+ char secret for HMAC admin cookie |

### Local Only

| Variable | Required | Description |
|---|---|---|
| All of the above in `.env.local` | Yes | Same as production |

---

## Key Files to Know

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active Next.js middleware — wrong name = middleware not running |
| `src/data/stages.ts` | All Foundations + Cisco stage definitions (24 stages) |
| `src/data/before-times*.ts` | Before Times epoch (30 stages split across 3 files) |
| `src/lib/auth.ts` | PBKDF2 hashing — do not change without testing |
| `src/lib/redis.ts` | Upstash client — requires env vars at runtime |
| `next.config.ts` | Security headers + `outputFileTracingIncludes` for secured-docs |
| `secured-docs/` | Never move to `public/` — gated behind admin HMAC cookie |

---

## Troubleshooting

**Middleware not running:**
- Confirm the file is named `src/proxy.ts` (not `middleware.ts`)
- Build output must show `ƒ Proxy (Middleware)`

**Leaderboard empty / progress not syncing:**
- Check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel env vars
- Verify Upstash instance is active at console.upstash.com

**Emails not sending:**
- Check `RESEND_API_KEY` is set and the sending domain is verified in Resend
- Rate limits: forgot-password (3/IP/15min), notify-registration (5/IP/hour)

**Admin dashboard locked out:**
- POST `/api/admin-session` with `{ username, password }` to re-issue cookie
- Confirm `ADMIN_USERNAME` and `ADMIN_SECRET` match what was set during setup
