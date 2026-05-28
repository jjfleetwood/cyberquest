# Kryptós CronOS — Claude Code Project Context

## What This Is

Gamified cybersecurity + AI training platform. 36 curriculum epochs, 438 CTF/quiz stages, live leaderboard, admin dashboard, 24 downloadable MCP server templates. Built with Next.js 16 / React 19 / TypeScript / Tailwind CSS / Upstash Redis / Resend.

**Live:** kryptoscronos.com  
**Repo:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.12.2 (as of 2026-05-28)

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
/shop                     → avatar item shop (🛒 Shop tab) + daily trophy showcase (💎 Treasures tab)
/trophies                 → owned trophy collection vault (admin: full library with supply counters)
/avatar                   → avatar customization — equip/unequip owned items
/admin                    → admin dashboard (HMAC cookie required)
/attribution              → public legal attributions & licenses page
```

Back navigation: `BackLink` uses `router.back()`. "Stage Map →" exit buttons go to `/stages/epoch/[epochId]` (not `/stages`).

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
| 13 | `quantum-1` | Quantum Era: Threats | 10 | quantum-t01 → quantum-t10 | Cyan |
| 14 | `quantum-2` | Quantum Era: PQC | 10 | quantum-p01 → quantum-p10 | Teal |
| 15 | `quantum-3` | Quantum Era: QKD | 10 | quantum-q01 → quantum-q10 | Sky |
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

**Track groups (stages page — public):** Core Security · Tech Audit · Threat Frameworks · AI Security · Quantum Era · Defend the Enterprise  
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
| `src/app/api/progress/route.ts` | GET reads from session cookie (not query param); POST awards stage in Redis |
| `src/data/trophies.ts` | 51 trophies across 8 tiers; `dailyShopTrophies()` seeded Fisher-Yates shuffle |
| `src/app/api/trophies/route.ts` | GET: admin sees full library + claimed counts; user sees daily 10 + owned. POST: buy with atomic supply reservation |
| `src/app/trophies/page.tsx` | Owned trophy collection vault; admin sees full library with tier filter |
| `src/app/shop/page.tsx` | 🛒 Shop (avatar items) + 💎 Treasures (daily trophy showcase + buy) |
| `src/app/avatar/page.tsx` | Avatar equip/unequip page |
| `src/data/content-flags.ts` | Per-epoch IP risk registry (risk level, license, attribution text) — drives epoch-page banners |
| `src/app/attribution/page.tsx` | Public legal attributions page — canonical third-party license notices |
| `next.config.ts` | Static security headers (HSTS, X-Frame-Options, etc.) + secured-docs file tracing. CSP is set dynamically in middleware. |
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
STRIPE_SECRET_KEY         ← Stripe secret key (sk_live_... or sk_test_...)
STRIPE_WEBHOOK_SECRET     ← Stripe webhook signing secret (whsec_...)
STRIPE_PRO_MONTHLY_PRICE_ID  ← Stripe price ID for $13.99/mo
STRIPE_PRO_YEARLY_PRICE_ID   ← Stripe price ID for $99/yr
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
| `GET /api/trophies` | Admin: full library + claimed counts. User: daily 10 shop rotation + owned |
| `POST /api/trophies` | Buy trophy — verifies in daily rotation, atomic Redis INCR supply check, deducts coinsSpent |
| `GET /api/progress/certificate` | Server-rendered PDF via @react-pdf/renderer — coins, stages, badges, streak, per-epoch breakdown |
| `POST /api/stripe/checkout` | Create Stripe checkout session (monthly/yearly); returns `{ url }` for redirect |
| `POST /api/webhooks/stripe` | Stripe webhook: `checkout.session.completed` → sets `tier: pro`; `customer.subscription.deleted` → sets `tier: free` |
| `GET /api/admin/users` | Admin: list all users with tier, coins, stages, badges, streak |
| `POST /api/admin/set-tier` | Admin: set `tier: pro|free` for a user (manual comp override) |
| `GET /api/admin/cms/stage/[stageId]` | Admin: get CMS override for a stage |
| `POST /api/admin/cms/stage/[stageId]` | Admin: save CMS override for a stage |

---

## Security Posture (v1.3.0+)

- Passwords: PBKDF2-SHA256, 100k iterations, hashed server-side only
- Sessions: HMAC-signed HttpOnly cookies (session_token 30d, admin_token 24h)
- No credentials in localStorage — eliminated entirely
- All flag/answer/XP validation server-side
- Rate limiting on all auth + email endpoints
- HSTS, X-Frame-Options, X-Content-Type-Options set in `next.config.ts`
- Nonce-based CSP (per-request) — `src/proxy.ts` generates nonce; `layout.tsx` reads `x-nonce` header and applies to anti-FOUC script; no `unsafe-inline` in script-src

---

## Supporting Services

| Service | Role |
|---|---|
| **Vercel** | Hosting, CDN, serverless |
| **Upstash** | Serverless Redis (progress, leaderboard, sessions) |
| **Resend** | Transactional email |
| **GitHub** | Source control + CI (Actions: lint + tsc + build) |
| **Anthropic** | Claude Haiku for ARIA AI chatbot |
| **Stripe** | Payment processing — Pro subscriptions (monthly/yearly); webhook for lifecycle events |

---

## Business Context

- **Stage:** Pre-seed, seeking $1.5M seed round
- **Legal entity:** Bolotin Enterprises, Inc. — Delaware C-Corp (incorporated May 23, 2026)
- **Domain:** kryptoscronos.com
- **Model:** B2C 7-day free trial → Pro ($13.99/mo or $99/yr) + B2B enterprise ($8/seat/mo) + sponsor integrations
- **Target sponsors:** CrowdStrike, AWS, SentinelOne, CompTIA, ISC²

---

## What's Shipped (v1.12.1)

- ✅ ProPaywall copy corrected: 438 stages, 36 epochs, 10 tracks
- ✅ OG / Twitter card meta corrected: 438 stages, 36 epochs

## What's Shipped (v1.12.0)

- ✅ Adaptive difficulty engine (`src/lib/difficulty.ts`) — `computeStageScore`, `computeBonusXp`, `adaptiveCooldownSeconds`, `getRecommendedNext`, Redis skill-level rolling average, per-stage hint/attempt counters
- ✅ XP bonus — +20% coins for clean solves (score ≥ 80); shown in terminal and FlagSuccessModal; tracked in Redis `bonus` field
- ✅ Adaptive ARIA cooldown (Pro) — 0s/15s/30s based on skill level; `nextCooldownS` returned from `/api/hint`
- ✅ Recommended Next — post-flag modal shows best incomplete stage in epoch based on skill
- ✅ Wrong attempt tracking — Redis counters feed into score; 48 h TTL
- ✅ Stages visibility fix — `career` and `curious` `GROUP_EPOCHS` now mirror each other so all users see full curriculum
- ✅ ESLint fix — `src/data/**/*.js` added to `globalIgnores`; 0 errors

## What's Shipped (v1.11.0)

- ✅ French Basics expanded 10 → 20 stages (french-11 through french-20): boulangerie, menu reading, wine, pharmacy, hotel, time, weather, digital French, faux pas, Paris arrondissements
- ✅ Italian Basics expanded 10 → 20 stages (italian-11 through italian-20): gelateria, food vocabulary, wine (DOCG/methanol scandal), farmacia, hotel/Grand Tour, time/1335 Milan clock, weather/nebbia/afa, calcio (AC Milan vs Inter 1908), faux pas/bella figura, Milan neighbourhoods with metro stops
- ✅ Admin-only age/skin toggle — Age column in user table cycles youth/standard/mature; `/api/admin/set-skin` route; `AgePrompt` modal remains disabled
- ✅ Investor Metrics panel in admin dashboard — WAU, 7-day return rate, avg stages/user, user funnel (registered→started→engaged→retained→power), growth stats, tier breakdown, per-epoch completion rates
- ✅ Default registration tier reverted to `free` — 7-day trial → ProPaywall → Stripe conversion funnel active
- ✅ Welcome email updated — 438 stages, 36 epochs, 50+ CVEs

## What's Shipped (v1.9.0)

- ✅ Bolotin Enterprises, Inc. incorporated (Delaware C-Corp, May 23, 2026, Stripe Atlas)
- ✅ Terms of Service page at `/terms` — subscriptions, 7-day refund, acceptable use, IP, Delaware governing law
- ✅ Business email `hello@kryptoscronos.com` via Cloudflare Email Routing — replaces Yahoo everywhere
- ✅ Pricing updated: $13.99/mo, $99/yr (SAVE 41%); ProPaywall + homepage updated
- ✅ Crafts / Driving / Baseball hidden from public homepage and stage map
- ✅ Homepage duplicate "How it works" section removed
- ✅ Homepage + demo page stats corrected (358 stages, 10 tracks)
- ✅ Brief icon and functionality fully removed from CtfChallenge
- ✅ Admin `canAccessStage()` bypass — admin no longer hits ProPaywall
- ✅ VC Readiness Analysis doc wired into admin docs panel
- ✅ Deploy skill updated with new doc file wiring rule

## What's Shipped (v1.8.0)

- ✅ Epoch #32 `cisco-advanced` — 12 stages (stage-m39 → stage-m50), Cyan theme, unlocked
- ✅ Pro tier access model — 7-day free trial (based on `createdAt`), then Stripe paywall; `src/lib/access.ts` (server-only)
- ✅ Stripe integration — `/api/stripe/checkout` (lazy init), `/api/webhooks/stripe` (lazy init); monthly $5.99, yearly $55.99 (SAVE 22%)
- ✅ `ProPaywall` component — inline upgrade wall shown when trial expired; back link to epoch page
- ✅ Server-side tier enforcement — `canAccessStage()` called in `check-flag`, `check-answer`, and stage page; flag/answer/quiz secrets stripped before client pass
- ✅ Pro hints — HintDrawer gate: hints 2+ require Pro; HintChatbot: no cooldown + ∞ message counter for Pro
- ✅ Admin tier toggle — toggle switch per user row in `/admin`; calls `/api/admin/set-tier` to write `tier: pro|free` to Redis; overrides trial
- ✅ Admin Remote Desktop link → https://remotedesktop.google.com/access
- ✅ CI/CD pipeline — `dev` branch + `.github/workflows/ci.yml` (lint + tsc --skipLibCheck + build + audit on dev + master pushes)
- ✅ `src/proxy.ts` — active Turbopack middleware (Next.js 16 requires `proxy` export, not `middleware`); merged from deleted `middleware.ts`

## What's Shipped (v1.7.5)

- ✅ Nonce-based CSP — `src/proxy.ts` generates per-request nonce; `layout.tsx` async reads `x-nonce`; `next.config.ts` static CSP removed; no `unsafe-inline` in script-src
- ✅ Docs refreshed to v1.7.5: PITCH_TARGETS.md (346 stages, 10 tracks), PARTNERS.md v3.1, BUSINESS_PROPOSAL_PRO.md + BUSINESS_PROPOSAL_CASUAL.md (346 stages, 31 epochs, 10 tracks, v1.7.4 live features)

## What's Shipped (v1.7.4)

- ✅ 31 epochs, 346 stages — Core Security, Tech Audit, Threat Frameworks, AI Security, Quantum Era, Defend the Enterprise (3 Cisco + Umbrella), Crafts, Driving, Health, Baseball
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
- ✅ Trophy system — 51 trophies, 8 tiers (Field→Apex), steep supply curve (50k→1), daily rotating showcase of 10 per user
- ✅ Shop with 💎 Treasures tab (daily trophy purchases) + 🛒 avatar item shop
- ✅ `/trophies` — owned collection vault; admin sees full library with live supply counters
- ✅ `/avatar` — avatar equip/unequip page; nav link for logged-in users
- ✅ CTF localStorage state scoped by username (`ctf-state:{username}:{stageId}`) — prevents cross-user bleed
- ✅ `GET /api/progress` fixed to use session cookie (was requiring unused `?username=` query param, breaking all progress display)
- ✅ `/attribution` page — full legal attribution notices for all third-party IP (MITRE, OWASP, ISACA/COBIT, CIS Benchmarks, ITIL, PCI DSS, Anthropic/Claude/MCP, HashiCorp Vault, STIX/TAXII/OASIS, NIST, CVE/NVD)
- ✅ `content-flags.ts` — per-epoch IP risk registry with risk classification, license info, and attribution text for all 20+ epochs
- ✅ Stage completion emails — fire-and-forget via Resend on every new stage capture; shows XP, badge, streak, next stage link; wired in `awardStageInRedis` (`server-progress.ts`)
- ✅ `GET /api/progress/certificate` — server-rendered PDF (@react-pdf/renderer): username, coins, stages, badges, streak, per-epoch breakdown; "Download Progress Report" on leaderboard page
- ✅ Mobile responsiveness audit — leaderboard responsive grid (3-col mobile → 6-col sm+); FeedbackWidget touch-action fix; CTF terminal / stage map confirmed mobile-ready
- ✅ Stage count corrected: 346 total (was 338); per-track numbers audited; "Nine" → "Ten" tracks across homepage, pricing, CTA, stages page, welcome email

## Trophy System Notes

- Redis key `trophy:claimed:{id}` — atomic INCR/DECR for supply reservation
- Daily shop: seeded Fisher-Yates shuffle using `hashString(username + dayNumber)`; 10 trophies, refreshes at UTC midnight
- Admin bypasses daily rotation check on purchase; regular users can only buy from their daily 10
- Tier supply curve: Field 50k · Enlisted 10k · Commended 2.5k · Decorated 500 · Distinguished 100 · Elite 25 · Legendary 5 · Apex 1

## Genuine Remaining Work

1. **Production auth migration** — Supabase Auth or Lucia, server-side sessions (intentionally deferred)

---

## Coding Conventions

- TypeScript strict mode — no `any` types
- Tailwind CSS for all styling — no external CSS frameworks
- Components in `src/components/`, pages in `src/app/`
- REST conventions for API routes under `/api/`
- No comments unless the WHY is non-obvious
- No Co-Authored-By lines in git commits
