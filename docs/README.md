# Kryptós CronOS — Documentation Index

**Live at:** kryptoscronos.com  
**GitHub:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.8.0  
**Last updated:** 2026-05-22

---

## What is Kryptós CronOS?

A gamified cybersecurity and AI training platform where learners progress through staged missions that simulate real attacks and defenses. 32 curriculum epochs, 358 total stages across 10 tracks, CTF terminal challenges, live leaderboard, ARIA AI hint chatbot, daily streaks, milestone badges, NDA gate, Pro tier (Stripe), 7-day free trial, and admin tooling. Built on Next.js 16 + Upstash Redis + Stripe, deployed on Vercel.

---

## Documentation Map

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, component tree, data layer, API routes |
| [BUILD.md](BUILD.md) | Local dev setup, build process, CI/CD pipeline |
| [OPS.md](OPS.md) | Operations runbook: env vars, services, monitoring, incident response |
| [PARTNERS.md](PARTNERS.md) | Key companies, services, and APIs supporting the build |
| [CURRICULUM.md](CURRICULUM.md) | Full stage catalog across all 32 epochs |
| [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | Detailed technical reference: auth, data layer, API routes, security |
| [SECURITY_BRIEFING.md](SECURITY_BRIEFING.md) | Security posture, findings, remediation status |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Version history and changelog |
| [BUSINESS_PROPOSAL_PRO.md](BUSINESS_PROPOSAL_PRO.md) | Formal investor pitch deck |
| [BUSINESS_PROPOSAL_CASUAL.md](BUSINESS_PROPOSAL_CASUAL.md) | Founder's plain-language pitch |
| [PITCH_TARGETS.md](PITCH_TARGETS.md) | Investor and sponsor targeting list |
| [PITCH_CAE_CONTINUOUS_MONITORING.md](PITCH_CAE_CONTINUOUS_MONITORING.md) | CAE advisory: continuous monitoring via AI agents |
| [TODO.md](TODO.md) | Open to-do items and roadmap by priority |

---

## Quick Status (v1.8.0)

- **Epochs:** 32 — Core Security (2), Tech Audit (4), Threat Frameworks (2), AI Security (1), Quantum Era (3), Defend the Enterprise (4), Crafts (3), Driving (3), Health (1), Baseball (7)
- **Total stages:** 358 across 10 tracks
- **Auth:** Server-side PBKDF2-SHA-256 (310k iterations, transparent re-hash migration); HMAC-signed HttpOnly cookies; SESSION_SECRET separate from ADMIN_SECRET; no credentials client-side
- **Access:** 7-day free trial (based on createdAt); Pro tier ($5.99/mo or $55.99/yr via Stripe); admin override toggle per user
- **ARIA:** AI hint chatbot powered by Claude Haiku (Anthropic), Socratic method, stage-aware, rate-limited; Pro users get no cooldown + unlimited messages
- **Leaderboard:** Live, global, Upstash Redis sorted set (daily / weekly / all-time)
- **Streaks:** Daily login streaks tracked in Redis; milestone badges at XP and streak thresholds
- **NDA gate:** Clickwrap NDA at /demo — Redis-logged, HMAC cookie (timing-safe comparison)
- **Email:** Resend API — registration alerts + password reset flow
- **Security:** HSTS, nonce-based CSP (proxy.ts), rate limiting (login/register/forgot-pw/reset-pw), server-side XP, server-only flag validation, docs gated behind admin HMAC cookie
- **CI:** GitHub Actions — lint + tsc + build + npm audit on pushes to dev + master
- **Backups:** Upstash daily backups enabled (paid plan)
- **Deployment:** `npx vercel --prod --project kryptos-cronos` from `app/`
