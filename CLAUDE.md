# Kryptós CronOS — Claude Code Project Context

## What This Is

Gamified cybersecurity + AI training platform. Three curriculum tracks, 54 CTF stages, live leaderboard, admin dashboard. Built with Next.js 16 / React 19 / TypeScript / Tailwind CSS / Upstash Redis / Resend.

**Live:** kryptoscronos.com  
**Repo:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.5.2 (as of 2026-05-18)

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
| 1 | The Before Times | 30 | bt-01 → bt-30 | Emerald | Always |
| 2 | Foundations | 12 | stage-01 → stage-12 | Amber | Always |
| 3 | Cisco | 12 | stage-m01 → stage-m12 | Blue | Always |
| 4 | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple | Always |
| 5 | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet | Always |
| 6 | Tech Audit: Agentic Continuous Monitoring | 12 | audit-a01 → audit-a12 | Indigo | Always |
| 10 | Continuous Monitoring 2.0 | 12 | audit-cm01 → audit-cm12 | Rose | Always |
| 7 | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red | Always |
| 8 | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia | Always |
| 9 | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange | Always |

Total: 126 stages across 9 epochs.

---

## Key Files

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active middleware — wrong name = no admin protection |
| `src/data/stages.ts` | Epoch registry + stage array — import all epoch files here |
| `src/data/before-times*.ts` | Before Times epoch (30 stages, 3 files) |
| `src/data/tech-audit-1.ts` | Tech Audit: Foundations (12 stages, ISACA/COBIT/CISA) |
| `src/data/tech-audit-2.ts` | Tech Audit: Technical (12 stages, APIs/secrets/cloud/IAM) |
| `src/data/tech-audit-3.ts` | Tech Audit: Agentic (12 stages, Claude tool use / MCP) |
| `src/data/mitre.ts` | MITRE ATT&CK (12 stages, all 12 tactic phases) |
| `src/data/mitre-atlas.ts` | MITRE ATLAS (12 stages, AI/ML adversarial attacks) |
| `src/data/owasp-llm.ts` | OWASP LLM Top 10 2025 (12 stages) |
| `src/app/stages/page.tsx` | Stage map UI — epochAccent/cardBorder/cardEmojiBg per epoch |
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
ADMIN_SECRET              ← 32+ char random string for HMAC cookie signing
ANTHROPIC_API_KEY         ← Claude Haiku for ARIA chatbot
DOCUSIGN_INTEGRATION_KEY  ← DocuSign app integration key (UUID)
DOCUSIGN_USER_ID          ← DocuSign API username (UUID)
DOCUSIGN_ACCOUNT_ID       ← DocuSign account ID
DOCUSIGN_PRIVATE_KEY      ← RSA private key for JWT auth (full PEM)
DOCUSIGN_BASE_URL         ← https://demo.docusign.net or https://na4.docusign.net
DOCUSIGN_WEBHOOK_SECRET   ← optional: HMAC verification of webhook callbacks
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
| **Anthropic** | Claude Haiku for ARIA AI chatbot (`/api/hint`) |
| **DocuSign** | eSignature API for NDA sending from admin dashboard |

---

## Business Context

- **Stage:** Pre-seed, seeking $1.5M seed round
- **Domain:** kryptoscronos.com (live, deployed)
- **Model:** B2C free/pro ($19/mo) + B2B enterprise ($8/seat/mo) + sponsor integrations
- **Target sponsors:** CrowdStrike, AWS, SentinelOne, CompTIA, ISC²
- **GTM Phase 1:** Community launch Q3 2026 (10k users, 1k Pro conversions target)

---

## Where We Left Off (v1.5.2, 2026-05-18)

Tapestry epoch shipped: `src/data/tapestry.ts` — 12 quiz stages (tapestry-01 → tapestry-12) covering tapestry history, Flemish golden age, Asian traditions, Americas, color theory, warp/weft structure, equipment, techniques (hatching, soumak, slits, rya knots), design, optical color mixing, contemporary practice, and first project. Yellow accent. New `"arts"` category type added. `check-answer` route now falls back to stages array so any quiz epoch works without manual registration. Previously (v1.5.1): Feedback widget (`FeedbackWidget.tsx` — fixed top-right, sends to jjbolotin@yahoo.com via `/api/feedback`), business proposals refreshed. Previously (v1.5.0): Continuous Monitoring 2.0 epoch (`tech-audit-4.ts`, 12 CTF stages, rose accent). Previously (v1.4.0): DocuSign NDA integration — admin dashboard, `src/lib/docusign.ts`, `/api/admin/send-nda`, `/api/webhooks/docusign`, 5 `DOCUSIGN_*` env vars.

**Adding a new epoch — checklist:**
1. Create `src/data/<epoch-id>.ts` — export `<name>Epoch: EpochConfig` and `<name>Stages: StageConfig[]`
2. Add import + epoch entry + stage spread to `src/data/stages.ts`
3. Add `epochAccent`, `cardBorder`, `cardEmojiBg` entries to `src/app/stages/page.tsx`
4. Run `node app/node_modules/typescript/bin/tsc --noEmit --project app/tsconfig.json`
5. Build: `node app/node_modules/next/dist/bin/next build app`

**Already shipped (do not re-suggest):**
- Homepage: 169 stages, six marketing tracks — ✅
- ARIA AI chatbot (Socratic, Haiku, stage-aware) — ✅
- CI pipeline (GitHub Actions: lint + tsc + build + audit) — ✅
- Daily streaks (`streak:username` Redis key, admin dashboard) — ✅
- Milestone badges (`m-xp-1k`, `m-xp-5k`, `m-streak-3`, `m-streak-7`) — ✅

**Genuine remaining work:**
1. Cisco curriculum gaps — Firepower, SecureX/XDR, DevNet, CyberOps Associate stages
2. Production auth migration — Supabase Auth or Lucia, server-side sessions (intentionally deferred)

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
