# Kryptós CronOS — Documentation Index

**Live at:** kryptoscronos.com  
**GitHub:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.6.5  
**Last updated:** 2026-05-20

---

## What is Kryptós CronOS?

A gamified cybersecurity and AI training platform where learners progress through staged missions that simulate real attacks and defenses. Eighteen curriculum epochs, 234 total stages across 7 tracks, CTF terminal challenges, live leaderboard, ARIA AI hint chatbot, daily streaks, milestone badges, NDA gate, and admin tooling. Built on Next.js 16 + Upstash Redis, deployed on Vercel.

---

## Documentation Map

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, component tree, data layer, API routes |
| [BUILD.md](BUILD.md) | Local dev setup, build process, CI/CD pipeline |
| [OPS.md](OPS.md) | Operations runbook: env vars, services, monitoring, incident response |
| [PARTNERS.md](PARTNERS.md) | Key companies, services, and APIs supporting the build |
| [CURRICULUM.md](CURRICULUM.md) | Full stage catalog across all fifteen epochs |
| [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | Detailed technical reference: auth, data layer, API routes, security |
| [SECURITY_BRIEFING.md](SECURITY_BRIEFING.md) | Security posture, findings, remediation status |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Version history and changelog |
| [BUSINESS_PROPOSAL_PRO.md](BUSINESS_PROPOSAL_PRO.md) | Formal investor pitch deck |
| [BUSINESS_PROPOSAL_CASUAL.md](BUSINESS_PROPOSAL_CASUAL.md) | Founder's plain-language pitch |
| [PITCH_TARGETS.md](PITCH_TARGETS.md) | Investor and sponsor targeting list |
| [PITCH_CAE_CONTINUOUS_MONITORING.md](PITCH_CAE_CONTINUOUS_MONITORING.md) | CAE advisory: continuous monitoring via AI agents |
| [TODO.md](TODO.md) | Open to-do items and roadmap by priority |

---

## Quick Status (v1.6.5)

- **Epochs:** 18 — Core Security (2), Tech Audit (4), Threat Frameworks (2), AI Security (1), Quantum Era (3), Defend the Enterprise (2), Crafts (3)
- **Total stages:** 234 across 7 tracks
- **Auth:** Server-side PBKDF2-SHA-256 (100k iterations); HMAC-signed HttpOnly session_token cookie (30d); no credentials client-side
- **ARIA:** AI hint chatbot powered by Claude Haiku (Anthropic), Socratic method, stage-aware, rate-limited
- **Leaderboard:** Live, global, Upstash Redis sorted set (daily / weekly / all-time)
- **Streaks:** Daily login streaks tracked in Redis; milestone badges at XP and streak thresholds
- **NDA gate:** Clickwrap NDA at /demo — Redis-logged, HMAC cookie
- **Email:** Resend API — registration alerts + password reset flow
- **Security:** HSTS, CSP, rate limiting, server-side XP, server-only flag validation, docs gated behind admin HMAC cookie
- **CI:** GitHub Actions — lint + tsc + build + npm audit on every push to master
- **Backups:** Upstash daily backups enabled (paid plan)
- **Deployment:** Vercel (iad1) auto-triggered on GitHub push to master
