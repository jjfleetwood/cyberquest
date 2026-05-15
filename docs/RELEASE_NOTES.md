# Kryptós CronOS — Release Notes

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
