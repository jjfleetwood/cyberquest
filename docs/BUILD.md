# Kryptós CronOS — Build Guide
**Version:** 3.1  
**Date:** 2026-05-20

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
# Upstash Redis — required for users, progress, leaderboard, streaks, NDA records, rate limiting
UPSTASH_REDIS_REST_URL=https://<your-instance>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>

# Resend — required for registration email and password reset
RESEND_API_KEY=re_<your-key>
ADMIN_EMAIL=<email to receive registration alerts>

# Admin auth — required for /admin dashboard
ADMIN_USERNAME=<admin username>
ADMIN_SECRET=<32+ char random secret for HMAC signing>

# Anthropic — required for ARIA AI hint chatbot (/api/hint)
ANTHROPIC_API_KEY=sk-ant-<your-key>
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
│   ├── data/                 ← Stage configs (TypeScript, all 9 epochs)
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
        ├── GitHub Actions (ci.yml) — runs on every push
        │       ├── npm ci (Node 24.x)
        │       ├── npm run lint
        │       ├── npx tsc --noEmit
        │       ├── npm run build
        │       └── npm audit --audit-level=moderate
        │
        └── Vercel GitHub App detects push
                ├── Installs: npm install (Node 24.x)
                ├── Builds: next build (Turbopack)
                ├── Bundles secured-docs/ via outputFileTracingIncludes
                └── Deploys to: kryptoscronos.com (iad1)
```

Deploy takes approximately 60–90 seconds. Monitor at vercel.com/dashboard.

### CI Configuration (`.github/workflows/ci.yml`)

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
| `ADMIN_SECRET` | Yes | 32+ char secret for HMAC cookie signing (session + admin) |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for ARIA chatbot (Claude Haiku) |

### Local Only

| Variable | Required | Description |
|---|---|---|
| All of the above in `.env.local` | Yes | Same as production |

---

## Key Files to Know

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active Next.js middleware — wrong name = middleware not running |
| `src/app/api/auth/register/route.ts` | Server-side PBKDF2 registration + cookie issuance |
| `src/app/api/auth/login/route.ts` | Server-side PBKDF2 login + cookie issuance |
| `src/app/api/auth/me/route.ts` | Cookie-to-identity resolver used by all client components |
| `src/app/api/hint/route.ts` | ARIA chatbot — Claude Haiku integration |
| `src/app/api/admin/send-nda/route.ts` | DocuSign envelope dispatch |
| `src/app/api/webhooks/docusign/route.ts` | DocuSign status webhook handler |
| `src/data/stages.ts` | Epoch registry — imports and re-exports all 18 epochs |
| `src/data/first-journey*.ts` | Our First Journey epoch (30 stages, 3 files) |
| `src/data/tech-audit-[1-4].ts` | Tech Audit epochs (48 stages total) |
| `src/data/tech-audit-3.ts` | Agentic Continuous Monitoring (12 stages) |
| `src/data/tech-audit-4.ts` | Continuous Monitoring 2.0 (12 stages) |
| `src/data/mitre.ts` + `mitre-atlas.ts` | MITRE ATT&CK + ATLAS (24 stages) |
| `src/data/owasp-llm.ts` | OWASP LLM Top 10 (12 stages) |
| `src/data/stage-flags.ts` | CTF flag answers — `server-only`, never bundled to client |
| `src/app/stages/epoch-theme.ts` | Color theme records for all 18 epochs |
| `src/lib/auth.ts` | PBKDF2 hashing + HMAC cookie utilities |
| `src/lib/redis.ts` | Upstash client — requires env vars at runtime |
| `next.config.ts` | Security headers + `outputFileTracingIncludes` for secured-docs |
| `secured-docs/` | Never move to `public/` — gated behind admin HMAC cookie |

---

## Troubleshooting

**Middleware not running:**
- Confirm the file is named `src/proxy.ts` (not `middleware.ts`)
- Build output must show `ƒ Proxy (Middleware)`

**Login / registration failing:**
- Confirm all `UPSTASH_REDIS_*` and `ADMIN_SECRET` vars are set in Vercel
- Auth is fully server-side — no localStorage fallback exists

**Leaderboard empty / progress not syncing:**
- Check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel env vars
- Verify Upstash instance is active at console.upstash.com

**Emails not sending:**
- Check `RESEND_API_KEY` is set and the sending domain is verified in Resend
- Rate limits: forgot-password (3/IP/15min), notify-registration (5/IP/hour)

**ARIA chatbot not responding:**
- Confirm `ANTHROPIC_API_KEY` is set in Vercel env vars
- Check `/api/hint` logs in Vercel Functions for API errors
- Rate limit: 15 requests per IP per 15 minutes

**DocuSign NDA send failing:**
- Confirm all `DOCUSIGN_*` vars are set correctly
- For production: set `DOCUSIGN_BASE_URL=https://na4.docusign.net`
- For sandbox/testing: set `DOCUSIGN_BASE_URL=https://demo.docusign.net`
- Check `/api/admin/send-nda` logs in Vercel Functions

**Admin dashboard locked out:**
- POST `/api/admin-session` with `{ username, password }` to re-issue cookie
- Confirm `ADMIN_USERNAME` and `ADMIN_SECRET` match what was set during setup
