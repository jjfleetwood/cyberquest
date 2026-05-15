# Kryptós CronOS — Documentation Index

**Live at:** kryptoscronos.com  
**GitHub:** github.com/jjfleetwood/kryptos-cronos  
**Current version:** v0.6.0  
**Last updated:** 2026-05-11

---

## What is Kryptós CronOS?

A gamified cybersecurity and AI training platform where learners progress through staged missions that simulate real attacks and defenses. Three curriculum tracks, 54 total stages, CTF terminal challenges, live leaderboard, and admin tooling. Built on Next.js 16 + Upstash Redis, deployed on Vercel.

---

## Documentation Map

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, component tree, data layer, API routes |
| [BUILD.md](BUILD.md) | Local dev setup, build process, CI/CD pipeline |
| [OPS.md](OPS.md) | Operations runbook: env vars, services, monitoring, incident response |
| [PARTNERS.md](PARTNERS.md) | Key companies, services, and APIs supporting the build |
| [CURRICULUM.md](CURRICULUM.md) | Full stage catalog across all three epochs |
| [SECURITY_BRIEFING.md](SECURITY_BRIEFING.md) | Security posture, findings, remediation status |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Version history and changelog |
| [BUSINESS_PROPOSAL_PRO.md](BUSINESS_PROPOSAL_PRO.md) | Formal investor pitch deck |
| [BUSINESS_PROPOSAL_CASUAL.md](BUSINESS_PROPOSAL_CASUAL.md) | Founder's plain-language pitch |

---

## Quick Status (v0.6.0)

- **Epochs:** 3 active — The Before Times (30 stages), Foundations (12 stages), Cisco (12 stages)
- **Auth:** PBKDF2-SHA-256 client-side + Redis-backed server-side persistence
- **Leaderboard:** Live, global, Upstash Redis sorted set
- **Email:** Resend API — registration alerts + password reset flow
- **Security:** HSTS, CSP, rate limiting, server-side XP, docs gated behind admin HMAC cookie
- **Deployment:** Vercel (iad1) auto-triggered on GitHub push
