# Kryptós CronOS — To-Do & Roadmap

**Last updated:** 2026-05-20 (v1.6.5)

---

## Priority 1 — Before Production Scale

| # | Item | Effort | Status | Notes |
|---|---|---|---|---|
| 1 | **Production auth migration** | — | ✅ Done | PBKDF2 + HMAC-signed HttpOnly `session_token` cookie (30d). SessionStorage only caches username for UI rendering — no credentials client-side. Current posture is production-ready. Supabase migration deferred until OAuth or email-verification features are needed. |
| 2 | **Signed JWT / server-side sessions** | — | ✅ Done | `server-session.ts` issues HMAC-signed `u:{username}:{hmac}` tokens verified server-side on every request. Functionally equivalent to signed JWT. |
| 3 | **Server-side flag validation** | — | ✅ Done | `stage-flags.ts` has `import "server-only"` — cannot be bundled to client. `/api/check-flag` reads flags exclusively from this file. |
| 4 | **CI pipeline** | — | ✅ Done | `.github/workflows/ci.yml` — lint + tsc + build + `npm audit --audit-level=high` on every push to master. |
| 5 | **Redis backup** | — | ✅ Done | Daily backups enabled in Upstash console. |

---

## Priority 2 — Curriculum Gaps

The `medieval` epoch (Cisco) is the only epoch with documented content gaps.

| # | Item | Effort | Notes |
|---|---|---|---|
| 6 | **Cisco Firepower / FTD stages** | 2–3 days | Next-gen firewall, IPS policy, FMC management. Should be 3–4 stages in `medieval`. |
| 7 | **Cisco SecureX / XDR stages** | 1–2 days | Cisco's XDR platform, threat response orchestration. 2–3 stages. |
| 8 | **Cisco DevNet stages** | 1–2 days | REST APIs for network automation, YANG/NETCONF, programmability. 2–3 stages. |
| 9 | **CyberOps Associate stages** | 2 days | SOC analyst fundamentals aligned to Cisco CyberOps certification. 3–4 stages. |

---

## Priority 3 — Product & UX

| # | Item | Effort | Notes |
|---|---|---|---|
| 10 | **Stage count audit** | 1 hour | Homepage displays 234 stages; actual grep count is 233. Off by one — audit and correct. |
| 11 | **Pro tier gating** | 3–5 days | Implement free vs. Pro ($19/mo) access tiers. Stripe integration, entitlement checks on stage access, upgrade prompt. |
| 12 | **Hints monetization** | 2–3 days | ARIA hints 2–3 require Pro or 30-second sponsor ad (Candy Crush model). Hint counter + paywall modal already designed; needs implementation. |
| 13 | **User progress export** | 4 hours | Allow users to download their progress / skills earned as a PDF credential summary. |
| 14 | **Mobile responsiveness audit** | 1–2 days | CTF terminal and stage grid not fully tested on mobile. Touch drag on FeedbackWidget untested. |

---

## Priority 4 — Business & Go-To-Market

| # | Item | Notes |
|---|---|---|
| 15 | **Investor outreach — Tier 1** | ForgePoint Capital, SYN Ventures, ClearSky Security, Owl Ventures, Reach Capital, Cisco Investments. See `PITCH_TARGETS.md`. |
| 16 | **Sponsor integration conversations** | CrowdStrike, AWS, SentinelOne, CompTIA, ISC². Contextual ad/sponsorship model aligned to stage topic. |
| 17 | **B2B enterprise motion** | $8/seat/mo targeting internal audit teams, SOC training programs, university cybersecurity programs. CAE advisory doc (`PITCH_CAE_CONTINUOUS_MONITORING.md`) is the lead asset. |
| 18 | **kryptoscronos.com marketing site** | Separate from the app. Needs landing page copy refresh to reflect 18 epochs, 234 stages, 7 tracks. |

---

## Known Tech Debt

| # | Item | Notes |
|---|---|---|
| 19 | ~~**`sync-user` route**~~ | ✅ Audited — route deleted, no client code references it. Stale `.next` cache was the only source of the phantom type error. |
| 20 | **`unsafe-inline` CSP** | Blocked on framework. Required by Next.js 16 hydration; move to nonce-based CSP once App Router nonce support matures. Accepted as deferred. |
| 21 | ~~**`any` cast in DocsViewer**~~ | ✅ Fixed — made `children` optional in all component prop types to match react-markdown's `Components` type. `as any` removed; tsc clean. |

---

## Completed (Recent)

- ✅ v1.6.3 — CAE continuous monitoring advisory doc in admin viewer
- ✅ v1.6.2 — Draggable feedback widget with localStorage persistence
- ✅ v1.6.1 — Docs consolidation: `docs/` single source of truth, auto-sync to `secured-docs/`
- ✅ v1.6.0 — 18 epochs, per-epoch pages, breadcrumb nav, first-journey rename, Crafts track
