# Kryptós CronOS — Release Notes

---

## v1.5.2 — 2026-05-18

**Tapestry epoch — The Woven World (12 stages)**

- **`src/data/tapestry.ts`** — New "Arts & Craft" epoch: "The Woven World" (yellow color). 12 quiz stages covering tapestry history, Flemish golden age, Asian traditions (kesi, tsuzure-ori), Americas (Andean, Navajo), color theory, warp/weft structure, equipment, core techniques (hatching, soumak, slit tapestry, rya knots), design and cartoon, optical color mixing, contemporary practice, and starting your first project.
- **`src/data/types.ts`** — Added `"arts"` to the category union type.
- **`src/components/StageInfo.tsx`** — Added `arts` to `categoryColors` (yellow theme) and `categoryLabel` ("Arts & Craft").
- **`src/app/api/check-answer/route.ts`** — Added fallback to `getStage()` from stages array so any quiz epoch works without manual registration in the route.
- **`src/data/stages.ts`** — `tapestryEpoch` and `tapestryStages` imported and registered.
- **`src/app/stages/page.tsx`** — "Arts & Craft" epoch group added; "tapestry" added to epoch group, epochAccent, cardBorder, and cardEmojiBg (yellow palette).

---

## v1.5.1 — 2026-05-18

**Feedback widget + business proposal refresh**

- **`src/components/FeedbackWidget.tsx`** — Fixed-position "What do you want to see?" textarea in the top-right corner of every page. Sends to jjbolotin@yahoo.com via Resend. Supports ⌘↵ keyboard shortcut. Auto-resizes up to 160px. Includes page path in email for context.
- **`/api/feedback`** — POST endpoint that calls Resend API with message + page. No rate limiting yet (low-volume internal use).
- **Business proposals updated** — Both `BUSINESS_PROPOSAL_PRO.md` and `BUSINESS_PROPOSAL_CASUAL.md` refreshed to v1.5.0 facts: 186 stages, 14 epochs, 6 tracks, ARIA AI tutor live, streaks/badges live, DocuSign live, all 6 active tech partners documented.

---

## v1.5.0 — 2026-05-18

**Continuous Monitoring 2.0 epoch (12 stages)**

- **`src/data/tech-audit-4.ts`** — New epoch: "Continuous Monitoring 2.0" (rose color). 12 CTF stages covering ISCM/NIST 800-137, Next-Gen SIEM + ML detection, UEBA risk chaining, NDR beaconing detection, CSPM attack path analysis, STIX/TAXII threat intel, SOAR playbooks, deception/honeytokens, Zero Trust CARTA, XDR cross-source correlation, continuous compliance, and SOC maturity metrics (MTTD/MTTR).
- **`src/data/stages.ts`** — `techAudit4Epoch` and `techAudit4Stages` imported and registered.
- **`src/app/stages/page.tsx`** — "tech-audit-4" added to Tech Audit epoch group; rose accent, border, and emoji-bg colors added.

---

## v1.4.0 — 2026-05-18

**DocuSign NDA integration**

- **`src/lib/docusign.ts`** — DocuSign JWT auth (RSA-SHA256, no external deps), NDA HTML document builder, `sendNdaEnvelope()` creates and sends a remote-signing envelope with anchor-based SignHere + DateSigned tabs.
- **`/api/admin/send-nda`** — Admin-only POST endpoint. Validates name/email, calls DocuSign, stores `nda:{email}` in Redis with `{ method: "docusign", status: "sent", sentAt, envelopeId }`. Returns 503 with setup instructions if DocuSign env vars are absent.
- **`/api/webhooks/docusign`** — Receives DocuSign per-envelope event notifications. On `completed`, updates Redis record with `{ status: "signed", signedAt }`. Supports optional HMAC verification via `DOCUSIGN_WEBHOOK_SECRET`.
- **Admin NDA panel** — "Send DocuSign NDA" form (name + email) added to the NDA Signatories section. Status badges distinguish Clickwrap ✓ / Sent (pending) / DocuSign ✓ / Declined / Voided. Timestamp shows `signedAt` → `acceptedAt` → `sentAt` in priority order.
- **`LAUNCH_LEGAL.md`** — DocuSign setup guide added: one-time steps (Integration Key, RSA keypair, consent grant), required env vars, sandbox vs production base URL.

---

## v1.3.1 — 2026-05-18

**CTF terminal scroll fix**

- **`CtfChallenge.tsx`** — Replaced `scrollIntoView({ behavior: "smooth" })` with instant `outputRef.current.scrollTop = outputRef.current.scrollHeight`. Eliminates the race condition where smooth-scroll animation fired intermediate scroll events that reset `userScrolledUp`, causing auto-scroll to override manual user scrolling. Terminal now correctly lets users scroll up to review output while still auto-scrolling on new output when already at the bottom.

---

## v1.3.0 — 2026-05-18

**Server-side auth migration — localStorage eliminated**

- **`/api/auth/register`** — New endpoint handles registration server-side: client sends plaintext password over HTTPS; server generates salt, PBKDF2 hashes, stores in Redis, and sets `session_token` + `admin_token` cookies in a single response. Rate-limited 5/IP/hour.
- **`/api/auth/me`** — New endpoint returns `{ username, email, isAdmin }` from the `session_token` cookie. Used by all client components that previously read from localStorage.
- **`/api/auth/login`** — Now grants `admin_token` cookie inline if the username matches `ADMIN_USERNAME`. Client no longer calls `/api/admin-session` separately after login.
- **`/api/reset-password`** — Now accepts `{ token, password }` plaintext instead of `{ token, passwordHash, salt }`. Hashing is server-side.
- **`src/lib/auth.ts`** — Stripped to session cache only. Removed: `getUsers()`, `saveUser()`, `isAdmin()`, `markUserAdmin()`, `grantAdminIfEligible()`, `USERS_KEY`. `register()` now POSTs plaintext to `/api/auth/register`. `login()` no longer writes to localStorage.
- **`Nav.tsx`** — Replaces `getSession()` + `isAdmin()` with `/api/auth/me`; sessionStorage used as fast-path initial render, server validates on mount. Admin link now reliably appears after login.
- **`AuthGuard`, `stages/page`, `leaderboard/page`, `admin/page`** — All replace localStorage reads with `/api/auth/me`. Cross-session persistence fixed: cookie-authenticated users no longer lose their session on browser restart.
- **`reset-password/page.tsx`** — Removed `generateSalt`/`hashPassword` imports; sends plaintext to server.

---

## v1.2.0 — 2026-05-18

**NDA gate, admin docs fix, Launch & Legal guide**

- **NDA gate at `/demo`** — Clickwrap NDA form (name + email + agreement checkbox); acceptance stored in Redis as `nda:{email}` with name, email, timestamp, and IP. Sets HMAC-signed `nda_token` cookie (90-day). Rate-limited to 5 submissions/IP/hour.
- **`/api/nda`** — POST: record NDA acceptance; GET (admin-only): list all signatories sorted by date.
- **Admin NDA Signatories panel** — New section on `/admin` dashboard shows all demo signees with name, email, IP, and acceptance timestamp.
- **Admin docs fixed** — `DocsViewer` was guarding access via `isAdmin()` from localStorage, which broke after server-side login. Replaced with API-first auth: attempts to fetch the first doc and redirects on 401, matching the pattern used by the admin user table.
- **`LAUNCH_LEGAL.md`** — New admin-only doc covering: incorporation (Delaware C-Corp vs Wyoming LLC, Stripe Atlas/Clerky), copyright registration ($65, copyright.gov), patent guidance (skip for now, provisional option), NDA instructions, employment/contractor agreements, and pre-fundraise checklist.
- **`DocsViewer` — Launch & Legal tab** added to the docs viewer tab bar.

---

## v1.1.0 — 2026-05-17

**Educational annotations, Socratic ARIA, Skills Acquired debrief, bt-03 fixes**

- **Terminal learning annotations** — Every CTF terminal interaction across all 9 epochs now includes `>> LEARN:` educational callouts inline in command output. Covers all `extraCommands` stages in Before Times (bt-01–30), Tech Audit: Technical (audit-02), Tech Audit: Agentic (audit-a03 Secrets Hunter), Cisco, Quantum, Umbrella, and MITRE epochs. File-read-only stages (Tech Audit: Foundations, remaining Agentic stages) embed `WHAT YOU'RE LEARNING:` sections directly in file content.
- **Socratic ARIA** — ARIA system prompt rewritten to use the Socratic method: asks guiding questions rather than providing direct answers. Now receives `keyTakeaways` (learning objectives) and `tagline` (core concept) from every stage; uses them to frame questions and assess whether the trainee is on track. Hint is paraphrased rather than quoted verbatim.
- **ARIA opener** — Opening message now surfaces the stage's core concept tagline: `ARIA online. Mission "X" loaded. Core concept: "Y". What are you stuck on?`
- **Skills Acquired debrief** — `FlagSuccessModal` now shows a "Skills Acquired" section on successful flag capture, listing up to 3 key takeaways from `stage.info.keyTakeaways`. Only renders when takeaways are present.
- **bt-03 bug fixes** — (a) Terminal scroll-lock: users can now scroll up to review earlier output without auto-scroll fighting them; auto-scroll resumes only when already at the bottom. (b) `inspect fragment-3` now correctly marks the third fragment as recovered, unblocking stage completion.

---

## v1.0.0 — 2026-05-16

**Cisco Umbrella epoch, server-side flag validation, admin user list**

- **Cisco Umbrella epoch (2a)** — 10 new CTF stages covering DNS-layer security: Umbrella architecture (Trickbot/WIZARD SPIDER), DNS tunneling (OilRig/APT34 DNSpionage), DGA detection (Emotet v4/NHS London), fast flux (Storm Worm double-flux), DNS rebinding (IoT homograph), lookalike domains (NOBELIUM/APT29), policy enforcement (LockBit wildcard bypass), DoH evasion (Godlua trojan), Talos threat intelligence (Scattered Spider/UNC3944), and full DNS-based IR (VOLT TYPHOON/ERCOT critical infrastructure)
- **Server-side flag validation** — All 169 CTF flags moved from stage data files to `src/data/stage-flags.ts` with `import 'server-only'`. Next.js enforces at build time that this module never reaches the client bundle. `/api/check-flag` uses the registry exclusively. The `flag:` property removed from all 14 data files.
- **Admin user list** — `GET /api/admin/users` endpoint scans all `user:*` Redis keys, fetches user + progress in parallel, returns sorted user list (by XP). Admin dashboard rewritten to fetch from API; shows rank, username+email, XP bar, stages/total, badges, last active, join date. Redirects to `/stages` on 401.
- **`createdAt` field** — `/api/sync-user` now stores `createdAt: Date.now()` in user Redis hash; displayed as join date in admin table.
- **Cisco quantum product references** — quantum-1 through quantum-3 stages updated with real Cisco product details: Universal Quantum Switch (UQS, April 2026), Silicon One P200 (800G ML-KEM hardware, Oct 2025) and G300 (102.4 Tbit/s, Feb 2026), full-stack PQC (ML-DSA in IOS-XE boot/IPsec/MACsec/TLS, Cisco Live 2026), SKIP algorithm-agnostic interface for QKD → IPsec bridging.
- **Security briefing updated** — Flag validation status changed to RESOLVED; ANTHROPIC_API_KEY added to secrets table; production security path updated.

---

## v0.9.1 — 2026-05-16

**RSC serialization fix, leaderboard 500 fix, admin API**

- **Stage page 500 errors fixed** — `extraCommands` (JS functions) stripped in `page.tsx` before RSC serialization; client re-hydrates via `stage-commands.ts` registry. Fixes all CTF stage pages returning 500 on kryptoscronos.com.
- **Leaderboard 500 fix** — `parseStringArray()` helper handles legacy comma-separated Redis data (old format) alongside new JSON-array format. Wrapped in try/catch for surfaced error messages.
- **`/api/admin/users`** — New admin-only endpoint; HMAC-verified; Redis SCAN cursor loop + parallel hgetall for user + progress data.
- **`stage-commands.ts`** — Client-safe extraCommands registry; iterates all stages at module load time; `getExtraCommands(stageId)` used by `CtfChallenge.tsx` instead of prop drilling.

---

## v0.9.0 — 2026-05-16

**AI chatbot, animated success modal, daily/weekly leaderboard, level timer, CTF easter-egg engine**

- **ARIA AI Chatbot** — In-terminal AI hint assistant (Claude Haiku) available on every CTF stage; 🤖 ARIA button in stage header; 30-second free-tier cooldown between messages with visible countdown; 10-message session limit; "Go Pro" upgrade prompt when limit/cooldown reached; also accessible via "Ask ARIA" button inside the mission briefing panel
- **`/api/hint` endpoint** — Server-side route calls Anthropic claude-haiku-4-5; IP rate-limited (15 msgs/15 min); stage-aware system prompt with scenario, hint, and chatbotContext injected; never reveals flag values directly; returns `{ reply }` or `{ error }`
- **Animated flag success modal** (`FlagSuccessModal`) — Replaces in-terminal text on correct submission; full-screen overlay with concentric glow rings, captured flag with green glow, XP earned, time taken, badge, and time penalty if applicable; animated scale-in entrance
- **Live level timer** — Stopwatch in stage header (green → yellow at 5 min → orange at 10 min); time sent to server on submission; XP penalty after 10 minutes: -1 XP/min, capped at 20% of base stage XP; penalty displayed in success modal
- **Daily / Weekly / All-Time leaderboard** — Three-tab switcher on leaderboard page; daily board uses `lb:d:YYYY-MM-DD` Redis key (48h TTL), weekly uses `lb:w:YYYY-MM-DD` Monday key (14d TTL); `awardStageInRedis` updates all three boards atomically on new stage completion only (idempotent); `/api/leaderboard?period=daily|weekly|alltime`
- **Easter-egg CTF engine** — `minFragments?: number` added to `CtfConfig`; stages can now hide more fragments than required (collect any N of M); `assemble` command shows partial progress and assembles from collected subset; fragment counter badge shows `(need N)` when `minFragments < total`; `chatbotContext?: string` per-stage context injected into ARIA prompt
- **Security fixes** (deployed with v0.8.5):
  - `/api/restore-user` — gutted to 404; was exposing passwordHash+salt publicly
  - `/api/auth/login` — new server-side login; PBKDF2 hashing server-side; `timingSafeEqual`
  - `/api/forgot-password` + `/api/notify-registration` — HTML injection patched with `escapeHtml()`
  - `/api/reset-password` — now sets `session_token` cookie on success
  - `/api/auth/session` — `timingSafeEqual` for hash comparison
  - `/api/sync-user` — returns 409 `{ taken: true }` on duplicate username
  - All rate-limit routes — `x-forwarded-for` replaced with `x-real-ip` (Vercel canonical)
  - `StoredUser` — `passwordHash` and `salt` removed; no credentials in localStorage

**Environment variables required:** `ANTHROPIC_API_KEY` must be added to Vercel for ARIA chatbot.

---

## v0.7.0 — 2026-05-15

**Multi-step CTF engine, job outcomes homepage, hints monetization, investor targeting**

- **Fragment collection system** — multi-step CTF mechanic: each stage now hides flag fragments behind file reads and exploit commands; `assemble` built-in reveals the full flag only after all fragments are collected; 🔑 N/M counter badge in terminal header
- **All 54 stages retrofitted** — Before Times (bt-01–bt-30), Foundations (stage-01–12), and Cisco (stage-m01–12) all have `fragments` arrays; `solved: true` pattern removed from all extraCommands; flags no longer appear in command output
- **Homepage job outcomes section** — "Train for jobs that are hiring right now" career section added: SOC Analyst, Penetration Tester, Cloud Security Engineer, AppSec/Secure Dev; each card shows salary range, required skills, and which stages cover them
- **Stats updated** — hero badge and stats bar reflect 54 stages, 12+ real CVEs, 3.5M unfilled cyber jobs
- **Hints-as-ads monetization** — Candy Crush model documented in both business proposals: first hint free, hints 2–3 require 30-second sponsor ad or Pro upgrade; $50–$200 CPM; contextual ad matching by stage topic
- **PITCH_TARGETS.md** — new investor targeting document: Tier 1 (ForgePoint, SYN Ventures, ClearSky, Owl, Reach Capital, Cisco Investments), Tier 2 (Bessemer, General Catalyst, Greylock, CrowdStrike, Paladin, a16z), Tier 3 (YC, NSF SBIR, CISA); competitive positioning table and warm intro paths
- **Admin docs viewer** — Pitch Targets tab added; `PITCH_TARGETS.md` added to `ALLOWED_FILES` allowlist

---

## v0.8.0 — Planned (Q3 2026)

**AI personalization layer + Cisco product integrations**

- In-terminal AI tutor (Anthropic API) — natural-language Q&A during CTF challenges without revealing flags
- Adaptive difficulty engine — adjusts challenge complexity based on command patterns and time-on-task
- **Cisco Talos integration** — weekly CVE challenge drops sourced from Talos threat intelligence feed
- **Cisco Umbrella epoch** — new curriculum track: DNS tunneling, DGA detection, network policy enforcement
- **Cisco SecureX / XDR track** — enterprise SecOps stages: alert triage, incident investigation, response workflows
- **Cisco Firepower stages** — network defense: firewall rule exploitation, lateral movement detection
- **Cisco CyberOps Associate alignment** — Cisco epoch badge completions map to CyberOps exam domains; exam voucher redemption flow
- **Cisco DevNet track** — API security and automation: REST exploitation, OAuth misconfigurations
- CI pipeline (GitHub Actions: lint + tsc + build + audit)
- Streaks and milestone badges

---

## v0.6.0 — 2026-05-11

**Security hardening sprint — all findings from security review resolved**

- **proxy.ts is the active middleware** — confirmed as the correct Next.js 16 filename (not middleware.ts); `ƒ Proxy (Middleware)` appears in build output
- **Internal docs gated** — moved from `public/docs/` to `secured-docs/`; served only via `/api/docs/[file]` requiring admin HMAC cookie; `outputFileTracingIncludes` added to next.config.ts for Vercel bundling
- **HSTS header** added: `max-age=63072000; includeSubDomains; preload`
- **XP computed server-side** — `/api/progress` POST uses a hardcoded `STAGE_XP` map; client-submitted XP ignored
- **sync-user first-write-wins** — existing Redis user records cannot be overwritten
- **Rate limiting** — forgot-password (3/IP/15min), notify-registration (5/IP/hour) via Redis incr
- **admin-session** throws if `ADMIN_SECRET` env var is missing (no empty-string fallback)
- **reset-password** no longer returns email in response — returns only username
- Emerald accent theme added to Before Times epoch

---

## v0.5.0 — 2026-05-10

**Live leaderboard, cross-device sync, epoch gating, proxy migration**

- Live global leaderboard powered by Upstash Redis sorted set
- Server-side progress persistence: XP, completed stages, and badges synced to Redis on every stage completion
- Cross-device progress restore: logging in on a new device merges server progress with local state
- Cisco epoch now gated — locked until all 12 Foundations stages are completed
- `isEpochUnlocked()` computes epoch access dynamically from progress at render time
- Leaderboard page fetches live data from `/api/leaderboard`; falls back gracefully if offline
- `GET /api/progress` and `POST /api/progress` routes added for progress sync
- Migrated `middleware.ts` → `proxy.ts` (Next.js 16 convention)
- Deleted legacy `CtfTerminal.tsx` (superseded by `CtfChallenge.tsx` since v0.1.0)

---

## v0.4.1 — 2026-05-10

**Security hardening**

- Admin username removed from source code — moved to server-side env var (`ADMIN_USERNAME`)
- Admin cookie grant now server-side only via signed HMAC token (`ADMIN_SECRET`)
- New API route `/api/admin-session` handles admin cookie issuance and revocation
- Next.js proxy — `/admin/**` routes blocked at the edge without valid HttpOnly cookie
- `isAdmin()` reads from stored user record instead of hardcoded string
- Registration no longer auto-grants admin based on username match
- Admin notification email moved from hardcoded to `ADMIN_EMAIL` env var
- Content Security Policy header added
- Fixed hardcoded admin username display in admin dashboard UI

---

## v0.4.0 — 2026-05-10

**Curriculum tracks + Cisco ops rewrite**

- Named curriculum tracks: **Foundations** (amber) and **Cisco** (blue)
- Foundations track: 12 core cybersecurity stages set in ancient world landmarks
- Cisco track: 12 real Cisco CVE stages framed as APT field operations
- All 12 Cisco CTF scenarios rewritten — spy/APT operative tone, real locations

---

## v0.3.0 — 2026-05-09

**Cisco epoch + 24-stage curriculum**

- Added 12 Cisco stages (stage-m01 through stage-m12) covering real CVEs:
  CVE-2023-20198, CVE-2016-6366, CVE-2018-0171, CVE-2019-1653, CVE-2020-3452,
  CVE-2022-20695, CVE-2021-1497, CVE-2023-20273, CVE-2019-1821, CVE-2020-3580,
  CVE-2020-3187, CVE-2017-6736
- Epoch tab UI with per-epoch color theming (amber / blue)
- Per-epoch sequential unlock logic

---

## v0.2.0 — 2026-05-09

**Ancient epoch + wonder-per-stage system**

- Converted all 12 original stages to "Foundations" epoch set inside ancient landmarks
- Added `Wonder` type: name, location, era, emoji
- Upgraded password hashing from SHA-256 to PBKDF2-SHA-256 (100k iterations)
- Added HTTP security headers to `next.config.ts`

---

## v0.1.0 — 2026-05-08

**Initial public launch**

- 12 cybersecurity + AI + OWASP stages in quiz and CTF formats
- CTF terminal with simulated filesystem: `ls`, `cat`, `cd`, `submit`, `hint`
- Progressive hints system — up to 3 hints per stage
- Stage map with sequential unlock logic and XP progression
- PBKDF2 client-side auth (localStorage), session via sessionStorage
- Per-user progress tracking scoped to logged-in account
- Leaderboard page with XP bar visualization
- Admin dashboard at `/admin` — user management and docs viewer
- Email notification on new user registration via Resend API
- Deployed to kryptoscronos.com

---

## Pre-launch Development — 2026-05-08

**Initial development sprint**

- Next.js 16 App Router scaffold, TypeScript strict mode, Tailwind CSS 4, DevOps folder structure
- Landing page, stage map, nav, login/signup with tab UI
- 12-stage curriculum: OWASP Top 10 + CVE content (SQL Injection, XSS, Heartbleed, Log4Shell, WannaCry, SSRF, Equifax/Struts, MongoDB)
- Client-side PBKDF2 auth, per-user progress scoping
- Security briefing, technical architecture doc, business proposals
- Dark cyberpunk aesthetic with monospace terminal styling
- Admin system: protected dashboard, docs viewer
- Resend API integration for registration alerts
- Rebrand: CyberQuest → Kryptós CronOS (κρυπτός χρόνος)
