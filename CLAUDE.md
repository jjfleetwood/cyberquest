# Kryptós CronOS — Claude Code Project Context

## What This Is

Gamified cybersecurity + AI training platform. 38 curriculum epochs, 458 CTF/quiz stages, live leaderboard, admin dashboard, 24 downloadable MCP server templates. Built with Next.js 16 / React 19 / TypeScript / Tailwind CSS / Upstash Redis / Resend.

**Live:** kryptoscronos.com  
**Repo:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.23.0 (as of 2026-05-30)

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
npx vercel --prod --project kryptos-cronos    # Deploy to kryptoscronos.com (MUST include --project flag)
```

---

## Dev → Prod Workflow

Branch strategy: `dev` → `master`

1. **Work on `dev`** — all feature development, bug fixes, and CI experiments
2. **Push to `dev`** → GitHub Actions CI runs automatically (lint + tsc + build + audit); Vercel generates a preview URL for the dev branch
3. **Test on preview URL** — validate the feature against the live Redis/Resend stack
4. **Merge `dev` → `master`** → CI runs again; Vercel auto-deploys to kryptoscronos.com (production)

CI runs on: pushes to `dev` or `master`, and PRs targeting `master`. Config: `.github/workflows/ci.yml`.

**GitHub repo secrets required for CI build:**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

(All other env vars are stubbed with `ci-placeholder` in the workflow file for the build step.)

**Vercel setup (one-time, in dashboard):**
- Connect GitHub repo → auto-deploy `master` → production
- Auto-deploy `dev` → preview URL

---

## Architecture in One Page

**Stack:** Next.js 16 App Router + Upstash Redis + Resend email  
**Middleware:** `src/proxy.ts` — admin protection + per-request CSP nonce generation (Next.js 16 Turbopack uses `proxy` export)  
**Admin:** HMAC cookie via `/api/admin-session`; `/admin/**` blocked at edge  
**Auth:** PBKDF2-SHA-256 (600k iterations), server-side; Supabase Auth parallel (v1.15.0+); user records in Redis  
**Sessions:** HMAC-signed HttpOnly `session_token` cookie (30 days) + `admin_token` (24h)  
**Account lockout:** 5 failed logins → 15-min lock (`lockout:user:{username}`)  
**Leaderboard:** Upstash Redis sorted sets (`leaderboard`, `lb:d:YYYY-MM-DD`, `lb:w:YYYY-MM-DD`)  
**Progress:** Redis (`progress:<username>`) — XP computed server-side  
**Email:** Resend API for registration alerts + password reset  
**AI:** Claude Haiku (`claude-haiku-4-5`) for ARIA chatbot via `/api/hint`  
**Docs:** `app/secured-docs/` — gated behind admin cookie via `/api/docs/[file]`  
**Audit log:** Redis list `audit:log` (max 1000 entries) — all mutating admin actions logged via `src/lib/audit.ts`  
**Vouchers:** `voucher:{CODE}` hash + `voucher:redeemers:{CODE}` set — atomic SADD dedup + HINCRBY supply  

---

## Navigation Flow

```
/           → homepage with 10 track marketing cards
/stages     → stage map hub: Security / Non-Security sections, epoch cards per track group
/stages/epoch/[epochId]   → per-epoch page: hero + stage grid + progress bar + cert/CyberOps banner
/stages/[stageId]         → individual stage (StageInfo → CTF/Quiz challenge)
/leaderboard              → XP rankings (daily / weekly / all-time) + PDF certificate download
/certs                    → CompTIA Security+ SY0-701 + ISC² CC readiness rings, per-domain progress
/resume                   → resume builder — skills auto-suggested from completed epochs, PDF export
/cyberops                 → Cisco CyberOps Associate (CBROPS 200-201) exam readiness dashboard
/shop                     → avatar item shop (🛒 Shop tab) + daily trophy showcase (💎 Treasures tab)
/trophies                 → owned trophy collection vault (admin: full library with supply counters)
/avatar                   → avatar customization — equip/unequip owned items
/account                  → user profile, tier status, voucher expiry, delete account
/survey                   → 9-question user survey; completion grants 30-day Pro to free/trial users
/downloads                → 24 Python MCP server templates; access gated per admin settings
/admin                    → admin dashboard (HMAC cookie required) — fixed left-nav sidebar
/attribution              → public legal attributions & licenses page
/terms                    → Terms of Service
/privacy                  → Privacy Policy
/demo                     → clickwrap NDA gate
```

Back navigation: `BackLink` uses `backHref` prop (passed from `StageContainer`) → always returns to epoch page.

---

## Epochs (Curriculum Tracks)

| # | Epoch ID | Display Name | Stages | Stage ID Pattern | Color |
|---|---|---|---|---|---|
| 1 | `first-journey` | Our First Journey | 30 | bt-01 → bt-30 | Emerald |
| 2 | `ancient` | Foundations | 12 | stage-01 → stage-12 | Amber |
| 3 | `cisco-core`       | Cisco: Core CVEs           | 12 | stage-m01 → stage-m12 | Blue   |
| 4 | `cisco-enterprise` | Cisco: Enterprise Attack   | 13 | stage-m13 → stage-m25 | Indigo |
| 5 | `cisco-secops`     | Cisco: Security Operations | 13 | stage-m26 → stage-m38 | Violet |
| 6 | `tech-audit-1` | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple |
| 7 | `tech-audit-2` | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet |
| 8 | `tech-audit-3` | Tech Audit: Agentic | 12 | audit-a01 → audit-a12 | Indigo |
| 9 | `tech-audit-4` | Continuous Monitoring 2.0 | 12 | audit-cm01 → audit-cm12 | Rose |
| 10 | `mitre` | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red |
| 11 | `mitre-atlas` | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia |
| 12 | `owasp-llm` | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange |
| 13 | `quantum-1` | Quantum Era: Threats | 10 | quantum-01 → quantum-10 | Cyan |
| 14 | `quantum-2` | Quantum Era: PQC | 10 | quantum-b01 → quantum-b10 | Teal |
| 15 | `quantum-3` | Quantum Era: QKD | 10 | quantum-c01 → quantum-c10 | Sky |
| 37 | `quantum-4` | Quantum Risk Management | 10 | quantum-d01 → quantum-d10 | Emerald |
| 38 | `emerging-tech` | Emerging Tech & Deep Learning Risk | 10 | emerging-01 → emerging-10 | Violet |
| 16 | `umbrella` | Cisco Umbrella / SASE | 10 | umbrella-01 → umbrella-10 | Green |
| 17 | `tapestry` | Tapestry | 12 | tapestry-01 → tapestry-12 | Yellow |
| 18 | `nails` | Nail Arts | 10 | nails-01 → nails-10 | Pink |
| 19 | `hair-color` | Hair Coloring | 10 | hair-color-01 → hair-color-10 | Rose |
| 20 | `hair-styling` | Hair Styling | 10 | hair-styling-01 → hair-styling-10 | Violet |
| 21 | `driving-1` | Road to Your License | 8 | driving-1-01 → driving-1-08 | Yellow |
| 22 | `driving-2` | First Miles | 8 | driving-2-01 → driving-2-08 | Lime |
| 23 | `driving-3` | Rules of the Road | 8 | driving-3-01 → driving-3-08 | Orange |
| 25 | `baseball-1` | Play Ball! | 10 | baseball-1-01 → baseball-1-10 | Red |
| 26 | `baseball-2` | The Art of Hitting | 10 | baseball-2-01 → baseball-2-10 | Blue |
| 27 | `baseball-3` | Advanced Mechanics | 10 | baseball-3-01 → baseball-3-10 | Violet |
| 28 | `baseball-4` | Elite Mastery | 10 | baseball-4-01 → baseball-4-10 | Amber |
| 29 | `baseball-5` | The Art of Pitching | 10 | baseball-5-01 → baseball-5-10 | Green |
| 30 | `baseball-6` | Pitch Arsenal | 10 | baseball-6-01 → baseball-6-10 | Red |
| 31 | `baseball-7` | Pitching Strategy | 10 | baseball-7-01 → baseball-7-10 | Indigo |
| 32 | `cisco-advanced` | Cisco: Advanced Defense | 12 | stage-m39 → stage-m50 | Cyan |
| 33 | `paris-july` | Paris in July | 20 | paris-01 → paris-20 | Blue |
| 34 | `milan-july` | Milan in July | 20 | milan-01 → milan-20 | Indigo |
| 35 | `french-basics` | French Basics | 20 | french-01 → french-20 | Sky |
| 36 | `italian-basics` | Italian Basics | 20 | italian-01 → italian-20 | Green |

**Track groups (stages page — public):** Core Security · Tech Audit · Threat Frameworks · AI Security · Quantum Era (quantum-1/2/3/4 + emerging-tech) · Defend the Enterprise  
**Extended curriculum (curious group only):** Crafts · Driving · Baseball · Travel  
**Hidden from public nav (accessible via direct URL):** all extended tracks

---

## Key Files

| File | Why it matters |
|---|---|
| `src/proxy.ts` | Active Turbopack proxy — admin protection + nonce-based CSP per request (`proxy` export) |
| `src/data/stages.ts` | Epoch registry + stage array — import all epoch files here; NOT for "use client" listing pages |
| `src/data/stages-meta.ts` | Client-safe listing metadata (no ctf/quiz/info) — import this in "use client" listing pages |
| `src/data/stage-flags.ts` | Server-only flag store (`import "server-only"`) — used only by `/api/check-flag` |
| `src/data/cert-domains.ts` | CompTIA Security+ SY0-701, ISC² CC, CompTIA Network+ N10-009, CySA+ CS0-003, CompTIA AI+, ISACA CISA/CISM/CRISC domain mappings; `computeCertReadiness()` |
| `src/data/cyberops-domains.ts` | Cisco CBROPS 200-201 domain mappings (5 domains); `computeCyberOpsReadiness()` |
| `src/data/content-flags.ts` | Per-epoch IP risk registry (risk level, license, attribution text) — drives epoch-page banners |
| `src/lib/auth.ts` | Client-side session cache (sessionStorage) |
| `src/lib/server-session.ts` | HMAC session token sign/verify; `getServerSession()` |
| `src/lib/crypto-utils.ts` | PBKDF2-SHA256 (600k iterations); auto-rehash on login |
| `src/lib/supabase.ts` | Supabase parallel auth client — `supabaseAdmin`, `createSupabaseServerClient()` |
| `src/lib/redis.ts` | Upstash client — needs `UPSTASH_REDIS_*` env vars |
| `src/lib/audit.ts` | Admin audit log — `logAdminAction()` writes to `audit:log` Redis list |
| `src/lib/access.ts` | Server-only tier gate — `getUserTier()`, `canAccessStage()` |
| `src/lib/difficulty.ts` | Adaptive difficulty engine — `computeStageScore()`, `computeBonusXp()`, `getRecommendedNext()` |
| `src/app/api/progress/route.ts` | GET reads from session cookie (not query param); POST awards stage in Redis |
| `src/app/api/admin/vouchers/route.ts` | GET list / POST generate / PATCH revoke vouchers; requires admin token |
| `src/app/api/redeem/route.ts` | POST redeem voucher code — atomic SADD dedup + HINCRBY supply |
| `src/app/api/resume/generate/route.ts` | POST → PDF via @react-pdf/renderer; skills from completed epochs |
| `src/data/trophies.ts` | 51 trophies across 8 tiers; `dailyShopTrophies()` seeded Fisher-Yates shuffle |
| `src/app/trophies/page.tsx` | Owned trophy collection vault; admin sees full library with tier filter |
| `src/app/shop/page.tsx` | 🛒 Shop (avatar items) + 💎 Treasures (daily trophy showcase + buy) |
| `src/app/avatar/page.tsx` | Avatar equip/unequip page |
| `src/app/certs/page.tsx` | CompTIA Security+ + ISC² CC readiness rings, per-domain progress |
| `src/app/resume/page.tsx` | Resume builder form — guided input + PDF export |
| `src/app/cyberops/page.tsx` | CyberOps Associate exam readiness dashboard |
| `src/app/admin/page.tsx` | Admin dashboard — fixed left-nav sidebar; sections anchored with IDs |
| `next.config.ts` | Static security headers (HSTS, X-Frame-Options, etc.) + secured-docs file tracing. CSP set dynamically in middleware. |
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
SESSION_SECRET            ← 32+ char random string for session token signing (separate from ADMIN_SECRET)
ANTHROPIC_API_KEY         ← Claude Haiku for ARIA chatbot
STRIPE_SECRET_KEY         ← Stripe secret key (sk_live_... or sk_test_...)
STRIPE_WEBHOOK_SECRET     ← Stripe webhook signing secret (whsec_...)
STRIPE_PRO_MONTHLY_PRICE_ID  ← Stripe price ID for $13.99/mo
STRIPE_PRO_YEARLY_PRICE_ID   ← Stripe price ID for $99/yr
NEXT_PUBLIC_SUPABASE_URL  ← Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY ← Supabase anon key
SUPABASE_SERVICE_ROLE_KEY ← Supabase service role key (server-side only)
```

Local dev: `.env.local` in `app/` (gitignored).

---

## API Routes

| Route | Purpose |
|---|---|
| `POST /api/auth/register` | Server-side PBKDF2 registration; sets session + admin cookies; parallel Supabase account |
| `POST /api/auth/login` | PBKDF2 login with 5-attempt lockout (15 min); auto-rehash to 600k iterations; Supabase parallel |
| `DELETE /api/auth/session` | Clear session cookie (logout); Supabase signOut |
| `GET /api/auth/me` | Returns `{ username, email, isAdmin }` from session cookie |
| `POST /api/admin-session` | Issue admin HMAC cookie |
| `GET /api/docs/[file]` | Serve secured-docs (admin only) |
| `POST /api/forgot-password` | Send reset email (rate: 3/IP/15min) |
| `GET/POST /api/progress` | Fetch/update Redis progress |
| `GET /api/progress/certificate` | Server-rendered PDF via @react-pdf/renderer |
| `GET /api/leaderboard` | Top XP rankings (daily/weekly/alltime); rate limited 30 req/min/IP |
| `POST /api/feedback` | Store user feedback |
| `POST /api/check-flag` | Validate CTF flag server-side |
| `POST /api/check-answer` | Validate quiz answer server-side |
| `POST /api/hint` | ARIA AI hint (Claude Haiku, adaptive cooldown for Pro) |
| `POST /api/nda` | Record NDA acceptance; GET returns admin list |
| `GET /api/trophies` | Admin: full library + claimed counts. User: daily 10 shop rotation + owned |
| `POST /api/trophies` | Buy trophy — atomic Redis INCR supply check |
| `POST /api/stripe/checkout` | Create Stripe checkout session (monthly/yearly); returns `{ url }` |
| `GET /api/stripe/portal` | Redirect to Stripe customer portal |
| `POST /api/webhooks/stripe` | `checkout.session.completed` → tier=pro; `subscription.deleted` → tier=free; clears voucherExpiry |
| `GET /api/admin/users` | Admin: list all users with tier, coins, stages, badges, streak |
| `POST /api/admin/set-tier` | Admin: set tier (pro/free/all-star); audit logged |
| `POST /api/admin/set-group` | Admin: set user group (career/curious); audit logged |
| `POST /api/admin/set-skin` | Admin: set user avatar skin; audit logged |
| `POST /api/admin/grant-admin` | Admin: promote user to admin; audit logged |
| `POST /api/admin/award-stage` | Admin: manually award stage completion; audit logged |
| `GET /api/admin/cms/stage/[stageId]` | Admin: get CMS override for a stage |
| `POST /api/admin/cms/stage/[stageId]` | Admin: save CMS override for a stage |
| `GET /api/admin/vouchers` | Admin: list all voucher codes (requires admin token) |
| `POST /api/admin/vouchers` | Admin: generate voucher codes (requires admin token); audit logged |
| `PATCH /api/admin/vouchers` | Admin: revoke a voucher code; audit logged |
| `POST /api/redeem` | Redeem voucher — atomic SADD dedup + HINCRBY; sets tier=pro + voucherExpiry |
| `GET /api/admin/downloads-access` | Admin: get downloads access setting |
| `POST /api/admin/downloads-access` | Admin: set downloads access (Off/Allowlist/All); per-user toggles (requires admin token) |
| `POST /api/survey` | Store survey response in Redis; awards 30-day Pro to free/trial users (one-time) |
| `POST /api/resume/generate` | Generate PDF resume with epoch-based skills; returns PDF buffer |
| `POST /api/delete-account` | Purge user record from Redis |

---

## Security Posture (v1.17.0+)

- Passwords: PBKDF2-SHA256, **600k iterations** (OWASP 2024); auto-rehash on login upgrades legacy users
- Sessions: HMAC-signed HttpOnly cookies (session_token 30d, admin_token 24h)
- **Account lockout:** 5 failed login attempts → 15-min lock per username (`lockout:user:{username}`)
- No credentials in localStorage — eliminated entirely
- All flag/answer/XP validation server-side
- Rate limiting on all auth + email endpoints; leaderboard rate-limited (30 req/min/IP)
- Admin routes require HMAC `admin_token` (not just session cookie) — vouchers, downloads-access, etc.
- HSTS, X-Frame-Options, X-Content-Type-Options set in `next.config.ts`
- Nonce-based CSP (per-request) — `src/proxy.ts` generates nonce; no `unsafe-inline` in script-src
- **Admin audit log** — all mutating admin actions (set-tier, grant-admin, vouchers, award-stage, CMS, etc.) written to Redis `audit:log`
- Stripe checkout origin-whitelisted to kryptoscronos.com + localhost
- Survey GET admin-token guarded; downloads-access admin-token guarded
- Login: admin username no longer exempt from IP rate limiting

---

## Supporting Services

| Service | Role |
|---|---|
| **Vercel** | Hosting, CDN, serverless |
| **Upstash** | Serverless Redis (progress, leaderboard, sessions, survey, audit log, vouchers) |
| **Resend** | Transactional email |
| **GitHub** | Source control + CI (Actions: lint + tsc + build) |
| **Anthropic** | Claude Haiku for ARIA AI chatbot |
| **Stripe** | Payment processing — Pro subscriptions (monthly/yearly); voucher expiry cleared on subscription.deleted |
| **Supabase** | Parallel auth (parallel PBKDF2 migration; v1.15.0+) |

---

## Business Context

- **Stage:** Pre-seed, seeking $1.5M seed round
- **Legal entity:** Bolotin Enterprises, Inc. — Delaware C-Corp (incorporated May 23, 2026)
- **Domain:** kryptoscronos.com
- **Model:** B2C 7-day free trial → Pro ($13.99/mo or $99/yr) + B2B enterprise ($8/seat/mo) + sponsor integrations + voucher distribution
- **Target sponsors:** CrowdStrike, AWS, SentinelOne, CompTIA, ISC²

---

## What's Shipped (v1.23.0)

- ✅ **Dual-mode quiz rollout COMPLETE — 203/203 CTF stages.** Every `challengeType: "ctf"` stage now has an 8-question MCQ `stage.quiz` alongside the CTF (Quiz = cosmetic half-clear / 0 XP / no unlock; CTF = full clear). Final 69 stages shipped this release: quantum-3 (c01–c10), quantum-4 (d01–d10), cisco-2 (m13–m25), cisco-3 (m26/m28/m30), cisco-4 (m34/m36/m37), cisco-5 (m39/m41/m42/m44/m46/m48/m50), umbrella (01–10), ancient stages.ts (stage-01–12 + stage-m12). Authored via idempotent `app/scripts/inject-quizzes.mjs`; tracker at repo-root `QUIZ_ROLLOUT.md`
- ✅ **New brand logo** (`src/components/Logo.tsx`) — guilloché watch-dial mark (4:21 hands, cyan→indigo gradient, dark-purple ring + cyan bezel); replaces 🛡️ emoji in Nav/footer/login/onboarding + favicon (`src/app/icon.svg`); gradients use `gradientUnits="userSpaceOnUse"`
- ✅ **Playable homepage hero** (`src/components/HomeCtfDemo.tsx`) — interactive mini-CTF terminal (ls → cat → submit flag) with `hint` command + suggestion chips; replaces static terminal
- ✅ **Certs UX** — sticky left-sidebar jump-nav, CyberOps first/featured, `max-w-6xl`, Resume moved into certs "Career" section (removed from top nav)
- ✅ **Content formatting** — `RichText.tsx` renders backtick `` `code` `` → cyan mono pills and `'single-quoted'` → restrained amber pills; `RichParagraph` lead colors chilled (sky/pink 80%); bulleted-with-dialogue reformat begun on tech-audit-3 (audit-a07/a01) — see `CONTENT_REFORMAT.md`

## What's Shipped (v1.22.0)

- ✅ **quantum-4 epoch — Quantum Risk Management** (10 CTF stages, quantum-d01..d10, emerald): CBOM / Cryptographic Bill of Materials, Harvest Now Decrypt Later (HNDL) threat assessment, NIST FIPS 203/204/205 deployment, CNSA 2.0 NSS mandate, CISA migration roadmap (5-phase), sector risk (finance/healthcare/SCADA/blockchain), board briefing + SEC disclosure, hybrid cryptography (X25519+ML-KEM-768), quantum-safe architecture (crypto agility, Let's Encrypt model), third-party quantum supply chain risk
- ✅ **emerging-tech epoch — Emerging Tech & Deep Learning Risk** (10 quiz stages, emerging-01..10, violet): adversarial examples + physical-world attacks, foundation model supply chain (BadNets, pickle RCE), federated learning gradient inversion + DP-SGD, deepfakes + C2PA + $25M Hong Kong fraud, AI-augmented threat actors (nation-state LLM use), edge AI model extraction + TEE defense, EU AI Act + NIST AI RMF + CFPB ECOA governance, agentic AI + MCP prompt injection, quantum-AI convergence (NISQ era + CRQC HNDL risk to models), ERM integration (WEF #1 risk, scenario planning, KRIs)
- ✅ **cert-domains** — quantum-d01..d10 and emerging-01..10 mapped to CISA/CISM/CRISC/AI+; quantum-01..10 and quantum-b01..b10 merged with CompTIA AI+ domains (eliminated duplicate section); AI+ stage count now 97 stages
- ✅ 458 stages total, 38 epochs

## What's Shipped (v1.21.0)

- ✅ **Full security stage rewrite sprint** — 8 epochs upgraded to HS/University standard: cisco-enterprise (m13–m25), cisco-secops (m26–m38), cisco-advanced (m39–m50), mitre (mitre-01..12), mitre-atlas (atlas-01..12), owasp-llm (llm-01..12); 3-paragraph historically-grounded incidents with attribution, STEP/DETECTION/REMEDIATION code blocks
- ✅ **CompTIA AI+ cert path (/certs)** — sky-blue card, 5 domains (AI Security 30%, Data Science 20%, AI Models 20%, AI Concepts 15%, AI Infrastructure 15%), 67 stages mapped: all atlas-01..12, all llm-01..12, all 30 quantum stages, cisco-advanced m42/m43/m50
- ✅ Fixed CI build — removed dead `adminUser` variable in login route, excluded fix scripts from ESLint flat config; 0 errors

## What's Shipped (v1.20.0)

- ✅ **cisco-core (m01–m12) + ancient (01–12) stage rewrites** — all 24 stages rewritten to HS/University standard: 3-paragraph historically-grounded overviews, exact exploit mechanics, incident sections with nation-state attribution (GRU, NSA/Shadow Brokers, Iranian APT, Chinese APT)
- ✅ **ISACA cert paths (/certs)** — CISA (5 domains, yellow), CISM (4 domains, purple), CRISC (4 domains, teal); salary ranges $95k–$175k; all security stages mapped
- ✅ Group system simplified to `["career", "curious"]` — DEFAULT_GROUPS = both; all users see security + extended curriculum
- ✅ StageInfo code comment dimming — `#`, `//`, `/*` lines render at 38% opacity vs 100% for code

## What's Shipped (v1.19.0)

- ✅ Docs full refresh — CLAUDE.md corrected to v1.18.1 facts; RELEASE_NOTES recovered 6 missing versions (v1.12.1 through v1.18.1)
- ⚠️ Elementary redesign — logged as shipped in error; bt-01..bt-30 remain HS/adult-level and still need the ages 5–10 rewrite (open — see Genuine Remaining Work)
- ✅ Network+ N10-009 and CySA+ CS0-003 cert paths added to /certs; all security stages remapped
- ✅ Deep security review — CSPRNG fix, survey payload size limit, harsh VC assessment v3.0
- ✅ All-star tier removed from admin panel and tier logic

## What's Shipped (v1.18.1)

- ✅ HOURS_LOG.md added — session hours + cost tracking; wired into admin docs panel (⏱ Hours & Cost tab); deploy skill updated with step 10 (log hours + cost after every session)

## What's Shipped (v1.18.0)

- ✅ **Images for all stages** — 154 new Wikimedia Commons images: baseball (70 stages, all 7 epochs), driving (24 stages), quantum (30 stages — Bloch sphere, IBM Q, BB84, lattice diagrams), nails/hair (30 stages — nail anatomy, hair microscopy, styling tools)
- ✅ **Certificate paths (/certs)** — `src/data/cert-domains.ts`: 230+ stages mapped to CompTIA Security+ SY0-701 (6 domains) + ISC² CC (5 domains); dual readiness rings, per-domain progress bars, salary ranges, exam CTAs; banner on /stages + security epoch pages
- ✅ **Resume builder (/resume)** — multi-section form: personal info, headline, summary, skills, experience, education; skills auto-suggested from completed training epochs; `POST /api/resume/generate` → PDF via @react-pdf/renderer with Kryptós achievements
- ✅ **Incentive system** — survey completion → 30-day Pro access (idempotent via `survey:rewarded:{user}` key); survey success screen shows "Pro Unlocked!"; streak milestone coin bonuses: 3-day +50🪙, 7-day +150🪙, 30-day +500🪙 (awarded once per milestone)
- ✅ Docs updated to v1.17.0 facts — BUSINESS_PROPOSAL_PRO/CASUAL, PITCH_TARGETS, FINANCIALS

## What's Shipped (v1.17.0)

- ✅ **OWASP Top 10 hardening audit** — downloads-access + survey GET admin-token guarded; login admin username no longer exempt from rate limiting; Stripe checkout origin-whitelisted; leaderboard rate-limited (30/min/IP)
- ✅ **Voucher fixes** — admin voucher routes require HMAC admin_token; redeem race condition fixed (SADD atomic dedup + optimistic HINCRBY with rollback); Stripe webhook clears voucherExpiry; revoke endpoint (PATCH); 365-day + 500-use options added
- ✅ **PBKDF2 600k iterations** (OWASP 2024); auto-rehash upgrades existing users on login
- ✅ **Account lockout** — 5 failed login attempts → 15-min lock per username (`lockout:user:{username}`)
- ✅ **Admin audit log** — `src/lib/audit.ts`; all mutating admin actions written to Redis `audit:log` list (max 1000 entries); displayed in admin dashboard
- ✅ Account page shows voucher expiry date for voucher-based Pro users
- ✅ Security briefing updated to v4.1

## What's Shipped (v1.16.3)

- ✅ Admin dashboard — fixed left-nav sidebar (always visible); anchor IDs on all sections for direct linking
- ✅ Voucher list — no-flicker on page refresh (SSR-safe)

## What's Shipped (v1.16.2)

- ✅ **Voucher code system** — `KRYPTOS-XXXX-XXXX` format; admin generate/list/revoke; `POST /api/redeem` for user redemption; atomic Redis SADD dedup + HINCRBY supply reservation; ProPaywall redeem input field; voucher expiry check in `getUserTier()`

## What's Shipped (v1.16.1)

- ✅ Downloads access control — admin radio (Off/Allowlist/All) + per-user toggles; `/downloads` page gated by `GET /api/admin/downloads-access`

## What's Shipped (v1.16.0)

- ✅ Security/Non-Security section headers on stages page; `/downloads` page for 24 Python MCP templates; `/survey` page with 9-question user survey + Redis storage
- ✅ Full i18n for section themes (Attack Chain / Technical Deep-Dive / Real-World Incident) in all 6 languages; FeedbackWidget fully translated
- ✅ AttackDiagram category-aware labels (STEP N for non-security); RichText `context` prop disables security highlights for arts/travel/sports
- ✅ Overview section: single font (boldLead=false); lead colors darkened (sky-400 / pink-400); module titles link to real-world incident section
- ✅ BackLink fix: StageContainer passes backHref to StageInfo reliably; admin username column widened
- ✅ Paris stages 9–20 and Milan stages 9–20: Wikimedia Commons images added
- ✅ content-flags.ts: cisco-advanced, paris-july, milan-july, french-basics, italian-basics entries added
- ✅ Docs: BUSINESS_PROPOSAL_PRO/CASUAL, PITCH_TARGETS, FINANCIALS corrected to v1.16.0 facts

## What's Shipped (v1.15.1)

- ✅ RichParagraph: boldLead=false in overview (one consistent font); sky-400/pink-400 lead colors in tech/incident sections

## What's Shipped (v1.15.0)

- ✅ Supabase Auth migration — parallel auth; register/login/logout/forgot-password/reset-password all wired to Supabase; PBKDF2 fallback + transparent migration; all existing sessions unchanged

## What's Shipped (v1.14.0–v1.14.1)

- ✅ DocuSign NDA removed — clickwrap at /demo retained; lib, routes, admin send form all cleaned
- ✅ `/cyberops` — CyberOps Associate exam readiness dashboard; `cyberops-domains.ts` maps 50 Cisco/Umbrella stages to CBROPS 200-201 domains

## What's Shipped (v1.13.0–v1.13.1)

- ✅ StageInfo visual redesign — wonder hero, CVSS bar, pull-quote overview, section color identities, numbered takeaway badges, gradient CTA
- ✅ Category-aware section labels — 5 category themes with distinct icons and colors
- ✅ RichText auto-highlighter — CVEs, quoted terms, figures, versions, CVSS, SQL, file paths, IPs

## What's Shipped (v1.12.0)

- ✅ Adaptive difficulty engine (`src/lib/difficulty.ts`) — score-based XP bonus (+20% for clean solves ≥80); adaptive ARIA cooldown for Pro; Recommended Next stage in FlagSuccessModal; wrong attempt + hint usage tracking in Redis

## Trophy System Notes

- Redis key `trophy:claimed:{id}` — atomic INCR/DECR for supply reservation
- Daily shop: seeded Fisher-Yates shuffle using `hashString(username + dayNumber)`; 10 trophies, refreshes at UTC midnight
- Admin bypasses daily rotation check on purchase
- Tier supply curve: Field 50k · Enlisted 10k · Commended 2.5k · Decorated 500 · Distinguished 100 · Elite 25 · Legendary 5 · Apex 1

## Voucher System Notes

- Code format: `KRYPTOS-XXXX-XXXX` (8 alphanumeric, avoids O/0/I/1 confusion)
- Redis: `voucher:{CODE}` hash, `voucher:redeemers:{CODE}` set, `voucher:index` sorted set
- Atomic redemption: SADD dedup → HINCRBY supply decrement → rollback if negative
- Stripe webhook (`subscription.deleted`) clears `voucherExpiry` to prevent downgrade conflicts
- Use cases: sponsor integrations, partner promotions, enterprise seat distribution

## Genuine Remaining Work

1. **Elementary section redesign** — bt-01–bt-30 content too advanced for 5-10 yr olds; needs kid-friendly rewrite (TODO item A — open, not started)

---

## Coding Conventions

- TypeScript strict mode — no `any` types
- Tailwind CSS for all styling — no external CSS frameworks
- Components in `src/components/`, pages in `src/app/`
- REST conventions for API routes under `/api/`
- No comments unless the WHY is non-obvious
- No Co-Authored-By lines in git commits
- When editing docs, always sync `docs/` → `app/secured-docs/` for updated files
- New `.md` docs require: API allowlist entry in `/api/docs/[file]/route.ts` + DocsViewer tab in `src/components/DocsViewer.tsx` + file placed in `app/secured-docs/`
