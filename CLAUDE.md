# Kryptós CronOS — Claude Code Project Context

## What This Is

Gamified cybersecurity + AI training platform. 29 curriculum epochs, ~334 CTF/quiz stages, live leaderboard, admin dashboard, 24 downloadable MCP server templates. Built with Next.js 16 / React 19 / TypeScript / Tailwind CSS / Upstash Redis / Resend.

**Live:** kryptoscronos.com  
**App:** app-jjfleetwood.vercel.app  
**Repo:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.7.0 (as of 2026-05-20)

---

## Project Root

```
C:\Users\Ajax\Projects\cyberquest\
├── app/              ← Next.js application (work happens here)
├── docs/             ← Full documentation suite
└── CLAUDE.md         ← This file
```

All code lives in `app/`. Run all npm commands from `app/`.

---

## Dev Commands

```bash
cd C:\Users\Ajax\Projects\cyberquest\app

npm run dev          # Start dev server → localhost:3000
npm run build        # Production build (verify before push)
npx tsc --noEmit     # Type check
npm run lint         # ESLint
npx vercel --prod    # Deploy to production
```

---

## Architecture in One Page

**Stack:** Next.js 16 App Router + Upstash Redis + Resend email  
**Middleware:** `src/proxy.ts` (NOT middleware.ts — Next.js 16 naming)  
**Admin:** HMAC cookie via `/api/admin-session`; `/admin/**` blocked at edge  
**Auth:** PBKDF2-SHA-256 (100k iterations), server-side; user records in Redis  
**Sessions:** HMAC-signed HttpOnly `session_token` cookie (30 days) + `admin_token` (24h)  
**Leaderboard:** Upstash Redis sorted sets (`leaderboard`, `lb:d:YYYY-MM-DD`, `lb:w:YYYY-MM-DD`)  
**Progress:** Redis (`progress:<username>`) — XP computed server-side  
**Email:** Resend API for registration alerts + password reset  
**AI:** Claude Haiku (`claude-haiku-4-5`) for ARIA chatbot via `/api/hint`  
**Docs:** `app/secured-docs/` — gated behind admin cookie via `/api/docs/[file]`  

---

## Navigation Flow (v1.6.0)

```
/           → homepage with 10 track marketing cards
/stages     → stage map hub: all epochs as clickable cards per track group
/stages/epoch/[epochId]   → per-epoch page: hero + stage grid + progress bar
/stages/[stageId]         → individual stage (StageInfo → CTF/Quiz challenge)
/leaderboard              → XP rankings (daily / weekly / all-time)
/admin                    → admin dashboard (HMAC cookie required)
```

Back navigation: `BackLink` uses `router.back()`. "Stage Map →" exit buttons go to `/stages/epoch/[epochId]` (not `/stages`).

---

## Epochs (Curriculum Tracks)

| # | Epoch ID | Display Name | Stages | Stage ID Pattern | Color |
|---|---|---|---|---|---|
| 1 | `first-journey` | Our First Journey | 30 | bt-01 → bt-30 | Emerald |
| 2 | `ancient` | Foundations | 12 | stage-01 → stage-12 | Amber |
| 3 | `medieval` | Cisco | 25 | stage-m01 → stage-m25 | Blue |
| 4 | `tech-audit-1` | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple |
| 5 | `tech-audit-2` | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet |
| 6 | `tech-audit-3` | Tech Audit: Agentic | 12 | audit-a01 → audit-a12 | Indigo |
| 7 | `tech-audit-4` | Continuous Monitoring 2.0 | 12 | audit-cm01 → audit-cm12 | Rose |
| 8 | `mitre` | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red |
| 9 | `mitre-atlas` | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia |
| 10 | `owasp-llm` | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange |
| 11 | `quantum-1` | Quantum Era: Threats | 10 | quantum-t01 → quantum-t10 | Cyan |
| 12 | `quantum-2` | Quantum Era: PQC | 10 | quantum-p01 → quantum-p10 | Teal |
| 13 | `quantum-3` | Quantum Era: QKD | 10 | quantum-q01 → quantum-q10 | Sky |
| 14 | `umbrella` | Cisco Umbrella / SASE | 10 | umbrella-01 → umbrella-10 | Green |
| 15 | `tapestry` | Tapestry | 12 | tapestry-01 → tapestry-12 | Yellow |
| 16 | `nails` | Nail Arts | 10 | nails-01 → nails-10 | Pink |
| 17 | `hair-color` | Hair Coloring | 10 | hair-color-01 → hair-color-10 | Rose |
| 18 | `hair-styling` | Hair Styling | 10 | hair-styling-01 → hair-styling-10 | Violet |
| 19 | `driving-1` | Road to Your License | 8 | driving-1-01 → driving-1-08 | Yellow |
| 20 | `driving-2` | First Miles | 8 | driving-2-01 → driving-2-08 | Lime |
| 21 | `driving-3` | Rules of the Road | 8 | driving-3-01 → driving-3-08 | Orange |
| 22 | `clubfoot` | Standing Tall | 6 | clubfoot-01 → clubfoot-06 | Teal (locked) |
| 23 | `baseball-1` | Play Ball! | 10 | baseball-1-01 → baseball-1-10 | Red |
| 24 | `baseball-2` | The Art of Hitting | 10 | baseball-2-01 → baseball-2-10 | Blue |
| 25 | `baseball-3` | Advanced Mechanics | 10 | baseball-3-01 → baseball-3-10 | Violet |
| 26 | `baseball-4` | Elite Mastery | 10 | baseball-4-01 → baseball-4-10 | Amber |
| 27 | `baseball-5` | The Art of Pitching | 10 | baseball-5-01 → baseball-5-10 | Green |
| 28 | `baseball-6` | Pitch Arsenal | 10 | baseball-6-01 → baseball-6-10 | Red |
| 29 | `baseball-7` | Pitching Strategy | 10 | baseball-7-01 → baseball-7-10 | Indigo |

**Track groups (stages page):** Core Security · Tech Audit · Threat Frameworks · AI Security · Quantum Era · Defend the Enterprise · Crafts · Driving · Health · Sports

---

## Key Files

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active middleware — wrong name = no admin protection |
| `src/data/stages.ts` | Epoch registry + stage array — import all epoch files here |
| `src/data/first-journey*.ts` | Our First Journey epoch (30 stages, 3 files: first-journey, first-journey-2, first-journey-3) |
| `src/data/tech-audit-1.ts` | Tech Audit: Foundations (12 stages, ISACA/COBIT/CISA) |
| `src/data/tech-audit-2.ts` | Tech Audit: Technical (12 stages, APIs/secrets/cloud/IAM) |
| `src/data/tech-audit-3.ts` | Tech Audit: Agentic (12 stages, Claude tool use / MCP) |
| `src/data/tech-audit-4.ts` | Continuous Monitoring 2.0 (12 stages) |
| `src/data/mitre.ts` | MITRE ATT&CK (12 stages, all 12 tactic phases) |
| `src/data/mitre-atlas.ts` | MITRE ATLAS (12 stages, AI/ML adversarial attacks) |
| `src/data/owasp-llm.ts` | OWASP LLM Top 10 2025 (12 stages) |
| `src/data/nails.ts` | Nail Arts epoch (10 stages) |
| `src/data/hair-color.ts` | Hair Coloring epoch (10 stages) |
| `src/data/hair-styling.ts` | Hair Styling epoch (10 stages) |
| `src/app/stages/epoch-theme.ts` | Shared color theme records (epochAccent, cardBorder, cardEmojiBg) — add new epochs here |
| `src/app/stages/page.tsx` | Stage map hub — epoch group nav, links to epoch pages |
| `src/app/stages/epoch/[epochId]/page.tsx` | Per-epoch detail page with stage grid |
| `src/lib/auth.ts` | PBKDF2 hashing — don't change without testing |
| `src/lib/redis.ts` | Upstash client — needs `UPSTASH_REDIS_*` env vars |
| `src/app/api/progress/route.ts` | XP computed server-side (STAGE_XP map) |
| `next.config.ts` | Security headers + secured-docs file tracing |
| `secured-docs/` | Admin-only docs — never move to public/ |

---

## Adding a New Epoch — Checklist

1. Create `src/data/<epoch-id>.ts` — export `<name>Epoch: EpochConfig` and `<name>Stages: StageConfig[]`
2. Add import + epoch entry + stage spread to `src/data/stages.ts`
3. Add `epochAccent`, `cardBorder`, `cardEmojiBg` entries to `src/app/stages/epoch-theme.ts`
4. Add epoch ID to the appropriate group in `epochGroups` in `src/app/stages/page.tsx`
5. `npx tsc --noEmit` then `npm run build`

---

## Environment Variables (Required)

Set in Vercel → Project → Settings → Environment Variables:

```
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
RESEND_API_KEY
ADMIN_EMAIL
ADMIN_USERNAME
ADMIN_SECRET              ← 32+ char random string for HMAC cookie signing
ANTHROPIC_API_KEY         ← Claude Haiku for ARIA chatbot
```

Local dev: `.env.local` in `app/` (gitignored).

---

## API Routes

| Route | Purpose |
|---|---|
| `POST /api/auth/register` | Server-side PBKDF2 registration; sets session + admin cookies |
| `POST /api/auth/login` | Server-side PBKDF2 login; sets session + admin cookies |
| `DELETE /api/auth/session` | Clear session cookie (logout) |
| `GET /api/auth/me` | Returns `{ username, email, isAdmin }` from session cookie |
| `POST /api/admin-session` | Issue admin HMAC cookie |
| `GET /api/docs/[file]` | Serve secured-docs (admin only) |
| `POST /api/forgot-password` | Send reset email (rate: 3/IP/15min) |
| `GET/POST /api/progress` | Fetch/update Redis progress |
| `GET /api/leaderboard` | Top XP rankings (daily/weekly/alltime) |
| `POST /api/feedback` | Store user feedback |
| `POST /api/check-flag` | Validate CTF flag server-side |
| `POST /api/check-answer` | Validate quiz answer server-side |
| `POST /api/hint` | ARIA AI hint (Claude Haiku, rate-limited) |
| `POST /api/nda` | Record NDA acceptance; GET returns admin list |

---

## Security Posture (v1.3.0+)

- Passwords: PBKDF2-SHA256, 100k iterations, hashed server-side only
- Sessions: HMAC-signed HttpOnly cookies (session_token 30d, admin_token 24h)
- No credentials in localStorage — eliminated entirely
- All flag/answer/XP validation server-side
- Rate limiting on all auth + email endpoints
- HSTS, X-Frame-Options, CSP, X-Content-Type-Options headers set

---

## Supporting Services

| Service | Role |
|---|---|
| **Vercel** | Hosting, CDN, serverless |
| **Upstash** | Serverless Redis (progress, leaderboard, sessions) |
| **Resend** | Transactional email |
| **GitHub** | Source control + CI (Actions: lint + tsc + build) |
| **Anthropic** | Claude Haiku for ARIA AI chatbot |

---

## Business Context

- **Stage:** Pre-seed, seeking $1.5M seed round
- **Domain:** kryptoscronos.com
- **Model:** B2C free/pro ($19/mo) + B2B enterprise ($8/seat/mo) + sponsor integrations
- **Target sponsors:** CrowdStrike, AWS, SentinelOne, CompTIA, ISC²

---

## What's Shipped (v1.6.0)

- ✅ 18 epochs, ~235 stages — Core Security, Tech Audit, Threat Frameworks, AI Security, Quantum Era, Defend the Enterprise, Crafts
- ✅ Crafts track: Nail Arts (10), Hair Coloring (10), Hair Styling (10)
- ✅ Per-epoch pages at `/stages/epoch/[epochId]` — hero card, progress bar, stage grid
- ✅ Stage map hub (`/stages`) — epoch cards per track group, links to epoch pages
- ✅ Breadcrumb back navigation — "Stage Map →" returns to epoch page, not root
- ✅ FeedbackWidget — minimizable, fixed top-left
- ✅ ARIA AI chatbot (Socratic, Haiku, stage-aware, 30s cooldown, 10-msg limit)
- ✅ Server-side auth v1.3.0 — PBKDF2, HMAC cookies, no localStorage credentials
- ✅ Daily streaks + milestone badges
- ✅ NDA gate at /demo + admin signatories panel
- ✅ 24 downloadable MCP server templates (audit-a / audit-cm stages)
- ✅ Terminal learning annotations (`>> LEARN:`) across all epochs
- ✅ Skills Acquired debrief in FlagSuccessModal

## Genuine Remaining Work

1. **Cisco curriculum gaps** — Firepower, SecureX/XDR, DevNet, CyberOps Associate stages
2. **Production auth migration** — Supabase Auth or Lucia, server-side sessions (intentionally deferred)

---

## Coding Conventions

- TypeScript strict mode — no `any` types
- Tailwind CSS for all styling — no external CSS frameworks
- Components in `src/components/`, pages in `src/app/`
- REST conventions for API routes under `/api/`
- No comments unless the WHY is non-obvious
- No Co-Authored-By lines in git commits
