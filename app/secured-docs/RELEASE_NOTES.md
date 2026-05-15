# Kryptós CronOS — Release Notes

---

## v0.5.0 — 2026-05-10

**Live leaderboard, cross-device sync, epoch gating, proxy migration**

- Live global leaderboard powered by Upstash Redis sorted set — all registered users ranked by XP in real time
- Server-side progress persistence: XP, completed stages, and badges synced to Redis on every stage completion
- Cross-device progress restore: logging in on a new device merges server progress with local state
- Cisco epoch now gated — tab is locked until all 12 Foundations stages are completed
- `isEpochUnlocked()` computes epoch access dynamically from progress at render time
- Leaderboard page fetches live data from `/api/leaderboard`; falls back gracefully if offline
- `GET /api/progress` and `POST /api/progress` routes added for progress sync
- Migrated `middleware.ts` → `proxy.ts` (Next.js 16 convention); proxy runs on Node.js runtime, uses Node `crypto`
- Deleted legacy `CtfTerminal.tsx` (superseded by `CtfChallenge.tsx` since v0.1.0)

---

## v0.4.1 — 2026-05-10

**Security hardening**

- Admin username removed from source code — moved to server-side env var (`ADMIN_USERNAME`)
- Admin cookie grant now server-side only via signed HMAC token (`ADMIN_SECRET`)
- Added Next.js proxy — `/admin/**` routes blocked at the edge without valid HttpOnly cookie
- New API route `/api/admin-session` handles admin cookie issuance and revocation
- `isAdmin()` reads from stored user record instead of comparing against hardcoded string
- Registration no longer auto-grants admin based on username match in client code
- Admin notification email moved from hardcoded string to `ADMIN_EMAIL` env var
- Added Content Security Policy header (`default-src 'self'`, `frame-ancestors 'none'`, restricted `connect-src`)
- Fixed hardcoded admin username display in admin dashboard UI

---

## v0.4.0 — 2026-05-10

**Curriculum tracks + Cisco ops rewrite**

- Replaced generic "epoch" system with named curriculum tracks: **Foundations** and **Cisco**
- Foundations track (amber): 12 core cybersecurity principle stages set in ancient world landmarks
- Cisco track (blue): 12 real Cisco CVE stages framed as APT field operations
- All 12 Cisco CTF scenarios rewritten — spy/APT operative tone, grounded in real locations
- Each Cisco CTF drops the player mid-mission; most stages begin with direct action
- Wonders retained as operation locations (Hagia Sophia → Istanbul, Tower of London → London, etc.)

---

## v0.3.0 — 2026-05-09

**Cisco epoch + 24-stage curriculum**

- Added 12 Cisco stages (stage-m01 through stage-m12) covering real CVEs:
  CVE-2023-20198, CVE-2016-6366, CVE-2018-0171, CVE-2019-1653, CVE-2020-3452,
  CVE-2022-20695, CVE-2021-1497, CVE-2023-20273, CVE-2019-1821, CVE-2020-3580,
  CVE-2020-3187, CVE-2017-6736
- Each Cisco stage linked to a world landmark as operation backdrop
- Converted Ancient Stage 1 (CIA Triad) from quiz to CTF — Great Pyramid exploration
- Epoch tab UI with per-epoch color theming (amber / blue)
- Per-epoch sequential unlock logic — stages unlock independently within each track

---

## v0.2.0 — 2026-05-09

**Ancient epoch + wonder-per-stage system**

- Converted all 12 original stages to "Ancient" epoch
- Added `Wonder` type: name, location, era, emoji — displayed on every stage card
- Each stage narratively set inside a specific ancient landmark (Great Pyramid, Colosseum, etc.)
- Added `epochs` array and epoch header UI on stage map
- Upgraded password hashing from SHA-256 to PBKDF2-SHA-256 (100k iterations)
- Added HTTP security headers to `next.config.ts`
- Removed all Claude/Anthropic references from documentation

---

## v0.1.0 — 2026-05-08

**Initial public launch**

- 12 cybersecurity + AI + OWASP stages in quiz and CTF formats
- CTF terminal with simulated filesystem, built-in commands (`ls`, `cat`, `cd`, `submit`, `hint`)
- Progressive hints system — up to 3 hints per stage, revealed one at a time
- Stage map with sequential unlock logic and XP progression
- PBKDF2 client-side auth (localStorage), session via sessionStorage
- Per-user progress tracking — XP and completed stages scoped to logged-in account
- Leaderboard page with XP bar visualization
- Admin dashboard at `/admin` — user management and docs viewer
- Admin docs panel: security briefing, technical architecture, business proposals, release notes
- Email notification on new user registration via Resend API
- Deployed to kryptoscronos.com

---

## Pre-launch Development — 2026-05-09

**Initial development sprint (not publicly versioned)**

The following work was completed in a single development sprint prior to v0.1.0:

- **Project scaffold** — Next.js 16 App Router, TypeScript strict mode, Tailwind CSS, DevOps folder structure
- **Core UI** — Landing page with hero CTA, stage map, navigation bar, login/signup page with tab UI
- **Stage 2 CTF** — First interactive terminal with simulated compromised AI server and flag capture
- **Leaderboard** — XP tracking with persistent localStorage, ranked player list
- **12-stage curriculum** — Full OWASP Top 10 + CVE content: SQL Injection, XSS, Heartbleed, Log4Shell, WannaCry, SSRF, Equifax/Struts, MongoDB misconfiguration, and more
- **User auth** — Client-side PBKDF2 password hashing, user registration/login, per-user progress scoping
- **Documentation** — Security briefing, technical architecture doc, business proposals (casual + formal VC pitch)
- **Visual overhaul** — Dark cyberpunk aesthetic, gradient backgrounds, monospace terminal styling
- **Admin system** — Admin user, protected dashboard, docs viewer, nav link
- **Rebrand** — CyberQuest → Kryptós CronOS (κρυπτός χρόνος); updated all references across codebase and docs
- **Email notifications** — Resend API integration for new user registration alerts
