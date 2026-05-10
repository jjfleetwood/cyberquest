# CyberQuest Release Notes

---

## v0.4.1 — 2026-05-10

**Security hardening**

- Admin username removed from source code — moved to server-side env var (`ADMIN_USERNAME`)
- Admin cookie grant now server-side only via signed HMAC token (`ADMIN_SECRET`)
- Added Next.js middleware — `/admin/**` routes blocked at the edge without valid HttpOnly cookie
- New API route `/api/admin-session` handles admin cookie issuance and revocation
- `isAdmin()` reads from stored user record instead of comparing against hardcoded string
- Registration no longer auto-grants admin based on username match in client code
- Admin notification email moved from hardcoded string to `ADMIN_EMAIL` env var
- Added Content Security Policy header (`default-src 'self'`, `frame-ancestors 'none'`, restricted `connect-src`)
- Fixed hardcoded admin username display in admin dashboard UI

---

## v0.4.0 — 2026-05-10

**Curriculum tracks + Cisco ops rewrite**

- Replaced "epoch" system with named curriculum tracks: **Foundations** and **Cisco**
- Foundations track (amber): 12 core cybersecurity principle stages set in ancient world landmarks
- Cisco track (blue): 12 real Cisco CVE stages framed as APT field operations
- All 12 Cisco CTF scenarios rewritten — spy/APT operative tone, grounded in location, no fantasy framing
- Cisco tab color updated to Cisco blue
- Each Cisco CTF drops the player mid-mission; most stages start with direct action (no file-read opener)
- Wonders retained as operation locations (Hagia Sophia → Istanbul, Tower of London → London, etc.)

**Commits:** `07a5b5b`

---

## v0.3.0 — 2026-05-09

**Medieval / Cisco epoch + Ancient Stage 1 CTF conversion**

- Added 12 medieval stages (stage-m01 through stage-m12) covering real Cisco CVEs:
  CVE-2023-20198, CVE-2016-6366, CVE-2018-0171, CVE-2019-1653, CVE-2020-3452,
  CVE-2022-20695, CVE-2021-1497, CVE-2023-20273, CVE-2019-1821, CVE-2020-3580,
  CVE-2020-3187, CVE-2017-6736
- Each stage linked to a medieval world wonder as operation backdrop
- Converted Ancient Stage 1 (CIA Triad) from quiz to CTF — Great Pyramid exploration
- Added epoch tab UI with per-epoch color theming (amber / violet)
- Per-epoch unlock logic: stages unlock sequentially within each track independently

---

## v0.2.0 — 2026-05-09

**Ancient epoch + wonder-per-stage system**

- Converted all 12 original stages to "Ancient" epoch
- Added `Wonder` type and wonder metadata to each stage (name, location, era, emoji)
- Each stage now narratively set inside a specific ancient landmark
- Wonder metadata displayed on stage cards (name, location, era)
- Added `epochs` array and epoch header UI on stage map
- Upgraded password hashing from SHA-256 to PBKDF2-SHA-256 (100k iterations)
- Added HTTP security headers to `next.config.ts`

---

## v0.1.0 — 2026-05-08

**Initial launch**

- 12 cybersecurity + AI + OWASP stages (quiz and CTF format)
- CTF terminal with simulated filesystem, built-in commands (ls, cat, cd, submit)
- Stage map with sequential unlock logic and XP progression
- PBKDF2 client-side auth (localStorage), session via sessionStorage
- Leaderboard page
- Admin docs viewer at `/admin/docs`
- Deployed to kryptochron.vercel.app
