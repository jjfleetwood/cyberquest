# Kryptós CronOS — To-Do & Roadmap

**Last updated:** 2026-05-20 (v1.6.3)

---

## Priority 1 — Before Production Scale

These block a safe, paid-user launch.

| # | Item | Effort | Notes |
|---|---|---|---|
| 1 | **Production auth migration** | 2–3 days | Replace PBKDF2/localStorage auth with Supabase Auth (Argon2id, server-side sessions, HttpOnly cookies). Current setup is fine for demo; not acceptable at scale. |
| 2 | **Signed JWT / server-side sessions** | 1 day | Replace sessionStorage session identifier with signed JWT or server-side Redis session. Eliminates physical-access session hijack risk. |
| 3 | **Server-side flag validation** | 4 hours | Move flag answers out of client bundle into `/api/check-flag` server-side lookup only. Currently a determined user can find flags in the JS bundle. |
| 4 | **CI pipeline** | 4 hours | Add GitHub Actions: `npm run lint` + `npx tsc --noEmit` + `npm run build` on every push to master. Currently all checks are manual pre-deploy. |
| 5 | **Redis backup / point-in-time recovery** | 1 hour | Enable Upstash daily backup. Protects user progress and leaderboard data. |

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
| 19 | **`sync-user` route** | Referenced in stale `.next` types but route no longer exists in source. Audit whether any client code still calls it. |
| 20 | **`unsafe-inline` CSP** | Required by Next.js 16 hydration. Move to nonce-based CSP once Next.js App Router nonce support matures. |
| 21 | **`any` cast in DocsViewer** | `ReactMarkdown components` prop requires `as any` cast. Resolve when react-markdown ships better TypeScript types. |

---

## Completed (Recent)

- ✅ v1.6.3 — CAE continuous monitoring advisory doc in admin viewer
- ✅ v1.6.2 — Draggable feedback widget with localStorage persistence
- ✅ v1.6.1 — Docs consolidation: `docs/` single source of truth, auto-sync to `secured-docs/`
- ✅ v1.6.0 — 18 epochs, per-epoch pages, breadcrumb nav, first-journey rename, Crafts track
