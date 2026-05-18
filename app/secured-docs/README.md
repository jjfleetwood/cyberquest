# Kryptós CronOS — Documentation Index

**Live at:** kryptoscronos.com  
**GitHub:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v1.4.0  
**Last updated:** 2026-05-18

---

## What is Kryptós CronOS?

A gamified cybersecurity and AI training platform where learners progress through staged missions that simulate real attacks and defenses. Nine curriculum epochs, 126 total stages, CTF terminal challenges, live leaderboard, ARIA AI hint chatbot, daily streaks, milestone badges, NDA gate, DocuSign eSignature integration, and admin tooling. Built on Next.js 16 + Upstash Redis, deployed on Vercel.

---

## Documentation Map

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, component tree, data layer, API routes |
| [BUILD.md](BUILD.md) | Local dev setup, build process, CI/CD pipeline |
| [OPS.md](OPS.md) | Operations runbook: env vars, services, monitoring, incident response |
| [PARTNERS.md](PARTNERS.md) | Key companies, services, and APIs supporting the build |
| [CURRICULUM.md](CURRICULUM.md) | Full stage catalog across all nine epochs |
| [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | Detailed technical reference: auth, data layer, API routes, security |
| [SECURITY_BRIEFING.md](SECURITY_BRIEFING.md) | Security posture, findings, remediation status |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Version history and changelog |
| [BUSINESS_PROPOSAL_PRO.md](BUSINESS_PROPOSAL_PRO.md) | Formal investor pitch deck |
| [BUSINESS_PROPOSAL_CASUAL.md](BUSINESS_PROPOSAL_CASUAL.md) | Founder's plain-language pitch |

---

## Quick Status (v1.4.0)

- **Epochs:** 9 active — The Before Times (30), Foundations (12), Cisco (12), Tech Audit: Foundations (12), Tech Audit: Technical (12), Tech Audit: Agentic (12), MITRE ATT&CK (12), MITRE ATLAS (12), OWASP LLM Top 10 (12)
- **Total stages:** 126
- **Auth:** Fully server-side PBKDF2-SHA-256 — no localStorage for credentials; HMAC-signed HttpOnly cookies for session and admin
- **ARIA:** AI hint chatbot powered by Claude Haiku (Anthropic), Socratic method, stage-aware, rate-limited
- **Leaderboard:** Live, global, Upstash Redis sorted set (daily / weekly / all-time)
- **Streaks:** Daily login streaks tracked in Redis; milestone badges at XP and streak thresholds
- **NDA gate:** Clickwrap NDA at /demo — Redis-logged, HMAC cookie; DocuSign eSignature for formal NDA sending from admin
- **Email:** Resend API — registration alerts + password reset flow
- **Security:** HSTS, CSP, rate limiting, server-side XP, server-side flag validation, docs gated behind admin HMAC cookie
- **CI:** GitHub Actions — lint + tsc + build + npm audit on every push
- **Deployment:** Vercel (iad1) auto-triggered on GitHub push to master
