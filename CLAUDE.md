# Kryptós CronOS — Claude Code Project Context

## What This Is

Gamified cybersecurity + AI training platform. Three curriculum tracks, 54 CTF stages, live leaderboard, admin dashboard. Built with Next.js 16 / React 19 / TypeScript / Tailwind CSS / Upstash Redis / Resend.

**Live:** kryptoscronos.com  
**Repo:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v0.6.0 (as of 2026-05-11)

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
```

---

## Architecture in One Page

**Stack:** Next.js 16 App Router + Upstash Redis + Resend email  
**Middleware:** `src/proxy.ts` (NOT middleware.ts — Next.js 16 naming)  
**Admin:** HMAC cookie via `/api/admin-session`; `/admin/**` blocked at edge  
**Auth:** PBKDF2-SHA-256 (100k iterations) client-side; user records in Redis  
**Leaderboard:** Upstash Redis sorted set (`leaderboard` key)  
**Progress:** localStorage (client) + Redis (`progress:<username>`) synced on completion  
**Email:** Resend API for registration alerts + password reset  
**Docs:** `app/secured-docs/` — gated behind admin cookie via `/api/docs/[file]`  

---

## Epochs (Curriculum Tracks)

| Epoch | Name | Stages | IDs | Color | Unlock |
|---|---|---|---|---|---|
| 1 | The Before Times | 30 | bt-01 → bt-30 | Emerald | Default |
| 2 | Foundations | 12 | stage-01 → stage-12 | Amber | Always |
| 3 | Cisco | 12 | stage-m01 → stage-m12 | Blue | After Foundations complete |

---

## Key Files

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active middleware — wrong name = no admin protection |
| `src/data/stages.ts` | Foundations + Cisco stage configs (24 stages) |
| `src/data/before-times*.ts` | Before Times epoch (30 stages, 3 files) |
| `src/lib/auth.ts` | PBKDF2 hashing — don't change without testing |
| `src/lib/redis.ts` | Upstash client — needs `UPSTASH_REDIS_*` env vars |
| `src/app/api/progress/route.ts` | XP computed server-side here (STAGE_XP map) |
| `next.config.ts` | Security headers + secured-docs file tracing |
| `secured-docs/` | Admin-only docs — never move to public/ |

---

## Environment Variables (Required)

Set in Vercel → Project → Settings → Environment Variables:

```
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
RESEND_API_KEY
ADMIN_EMAIL
ADMIN_USERNAME
ADMIN_SECRET       ← 32+ char random string for HMAC cookie signing
```

Local dev: `.env.local` in `app/` (gitignored).

---

## API Routes

| Route | Purpose |
|---|---|
| `POST /api/admin-session` | Issue admin HMAC cookie |
| `GET /api/docs/[file]` | Serve secured-docs (admin only) |
| `POST /api/forgot-password` | Send reset email (rate: 3/IP/15min) |
| `GET/POST /api/progress` | Fetch/update Redis progress |
| `GET /api/leaderboard` | Top XP rankings |
| `POST /api/notify-registration` | Admin email alert (rate: 5/IP/hour) |
| `POST /api/reset-password` | Validate token, update password |
| `POST /api/sync-user` | First-write-wins user record |

---

## Security Baseline (v0.6.0 — LOW overall risk)

All critical and medium findings from the security review are resolved:
- HSTS, X-Frame-Options, CSP, X-Content-Type-Options ✅
- XP computed server-side, client XP ignored ✅  
- Rate limiting on all email-triggering routes ✅  
- Admin credentials in env vars, HMAC cookie, edge gating ✅  
- Internal docs gated behind admin cookie ✅  
- sync-user first-write-wins ✅  

Remaining acceptable gaps: client-side auth storage (localStorage), flags in JS bundle, no signed sessions — all documented in `docs/SECURITY_BRIEFING.md` with production remediation paths.

---

## Supporting Companies

| Company | Role |
|---|---|
| **Vercel** | Hosting, CDN, serverless (free Hobby plan) |
| **Upstash** | Serverless Redis (free tier) |
| **Resend** | Transactional email (free tier) |
| **GitHub** | Source control + CI trigger |

---

## Business Context

- **Stage:** Pre-seed, seeking $1.5M seed round
- **Domain:** kryptoscronos.com (live, deployed)
- **Model:** B2C free/pro ($19/mo) + B2B enterprise ($8/seat/mo) + sponsor integrations
- **Target sponsors:** CrowdStrike, AWS, SentinelOne, CompTIA, ISC²
- **GTM Phase 1:** Community launch Q3 2026 (10k users, 1k Pro conversions target)

---

## Where We Left Off (v0.6.0, 2026-05-11)

Security hardening sprint is complete. The Before Times epoch is the default tab with emerald theming. The platform is stable and deployed.

**Next logical work areas:**
1. AI personalization layer (in-terminal tutor, adaptive difficulty) — requires Anthropic API integration
2. CI pipeline setup (GitHub Actions: lint + tsc + build + audit)
3. Production auth migration (Supabase Auth, server-side)
4. Weekly CVE challenge drop system

---

## Documentation

Full docs in `docs/`:
- `docs/README.md` — master index
- `docs/ARCHITECTURE.md` — system design, components, data layer
- `docs/BUILD.md` — local setup, build process, CI/CD
- `docs/OPS.md` — operations runbook, services, monitoring
- `docs/PARTNERS.md` — key companies and services
- `docs/CURRICULUM.md` — full 54-stage catalog
- `docs/SECURITY_BRIEFING.md` — security posture and findings
- `docs/RELEASE_NOTES.md` — version history

Admin-viewable docs are mirrored in `app/secured-docs/`.

---

## Coding Conventions

- TypeScript strict mode — no `any` types
- Tailwind CSS for all styling — no external CSS frameworks
- Components organized by feature under `src/components/`
- REST conventions for API routes under `/api/`
- No comments unless the WHY is non-obvious
- No co-author lines in git commits
