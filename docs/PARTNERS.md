# Kryptós CronOS — Partners & Supporting Infrastructure
**Version:** 3.0  
**Date:** 2026-05-18

---

## Core Infrastructure Partners

### Vercel
**Role:** Hosting, CDN, serverless compute  
**Plan:** Hobby (free)  
**URL:** vercel.com  
**Dashboard:** vercel.com/dashboard

Vercel hosts the entire application. Every `git push` to `master` triggers an automatic build and deploy. The Next.js serverless API routes run as Vercel serverless functions. Assets are served from a global CDN with the primary region in `iad1` (US East, Washington DC).

**What it handles:**
- Static asset delivery (JS, CSS, images)
- Next.js App Router server-side rendering
- Serverless API routes (`/api/*`)
- HTTPS termination and HSTS enforcement
- Custom domain routing (kryptoscronos.com)
- Build pipeline from GitHub push to production

**Limits (Hobby):** 100 GB bandwidth/month, 6,000 build minutes/month, 1 team member  
**Upgrade trigger:** Pro ($20/month) when team members need deploy access or commercial use grows

---

### Upstash
**Role:** Serverless Redis — users, progress, leaderboard, streaks, NDA records, rate limiting, password reset  
**Plan:** Free tier  
**URL:** upstash.com  
**Dashboard:** console.upstash.com

Upstash provides a globally distributed, REST-accessible Redis instance. It is the sole backend data store: user accounts (with PBKDF2-hashed passwords), progress, real-time leaderboard rankings, daily streaks, NDA acceptance records, IP-based rate limiting, and password reset tokens.

**What it handles:**
- User record storage (`user:{username}` hash: email, passwordHash, salt, createdAt)
- Server-side progress persistence (`progress:{username}` hash)
- Global, daily, and weekly leaderboards (Redis sorted sets)
- Daily login streaks (`streak:{username}` hash)
- NDA clickwrap and DocuSign status records (`nda:{email}` hash)
- Password reset token storage (with 1-hour TTL)
- Rate limiting for forgot-password, NDA, and registration notifications

**Integration:** `@upstash/redis` npm package, REST API with `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`  
**Limits (Free):** 10,000 commands/day, 256 MB storage  
**Upgrade trigger:** Pay-as-you-go when daily command volume exceeds free tier

---

### Resend
**Role:** Transactional email delivery  
**Plan:** Free tier (3,000 emails/month)  
**URL:** resend.com  
**Dashboard:** resend.com/dashboard

Resend handles all outbound emails: admin alerts when new users register, and password reset links. It is called from serverless API routes with rate limiting to prevent abuse.

**What it handles:**
- Admin notification when a new user registers (`/api/notify-registration`)
- Password reset emails with time-limited token links (`/api/forgot-password`)

**Integration:** HTTP API calls to `https://api.resend.com` using `RESEND_API_KEY`  
**CSP note:** `connect-src` in `next.config.ts` explicitly allows `https://api.resend.com`  
**Limits (Free):** 3,000 emails/month, 100 emails/day  
**Upgrade trigger:** Pro ($20/month) when email volume grows or custom domain required for deliverability

---

### GitHub
**Role:** Source control, CI trigger  
**Plan:** Free  
**URL:** github.com/jjfleetwood/kryptos-cronos

GitHub is the source of truth for all code. The Vercel GitHub App is connected to the repo — every push to `master` automatically triggers a production deploy. GitHub Actions runs the CI pipeline (lint + tsc + build + audit) on every push.

**What it handles:**
- Version control and history
- GitHub Actions CI pipeline (`.github/workflows/ci.yml`)
- Automated Vercel deploy trigger on push
- Issue tracking and project management (when used)

**Security note:** GitHub Personal Access Tokens used in CLI commands should be revoked immediately after use. Never store tokens in the repo or shell history permanently.

---

### Anthropic
**Role:** Claude Haiku — ARIA AI hint chatbot  
**Plan:** API key (pay-per-token)  
**URL:** anthropic.com  
**Dashboard:** console.anthropic.com

Anthropic's Claude Haiku model powers ARIA, the in-platform AI hint assistant. ARIA uses a Socratic method system prompt — it asks guiding questions rather than giving direct answers, encouraging learners to think through the problem. Requests are rate-limited to 15 per IP per 15-minute window to control costs.

**What it handles:**
- Stage-aware AI hints via `/api/hint`
- Socratic coaching during CTF and quiz challenges
- 10-message session cap per stage; 30-second cooldown between messages

**Integration:** Anthropic SDK with `ANTHROPIC_API_KEY`; model: `claude-haiku-*`  
**CSP note:** `connect-src` in `next.config.ts` explicitly allows `https://api.anthropic.com`  
**Cost:** Pay-per-token; kept low by rate limiting and the Haiku model tier

---

### DocuSign
**Role:** eSignature API — NDA envelope sending and status tracking  
**Plan:** Free developer tier  
**URL:** docusign.com  
**Dashboard:** admindemo.docusign.com

DocuSign enables the admin to send formal NDA envelopes to users directly from the admin dashboard. When a user completes the clickwrap NDA at `/demo`, their record is logged in Redis. The admin can then escalate to a formal DocuSign eSignature from the NDA Signatories panel.

**What it handles:**
- NDA envelope creation and delivery from admin dashboard (`/api/admin/send-nda`)
- Signer status tracking via webhook (`/api/webhooks/docusign`): signed / declined / voided
- Redis `nda:{email}` record updated with `envelopeId`, `status`, `signedAt` upon webhook receipt

**Integration:** DocuSign eSignature REST API, JWT Grant auth (`DOCUSIGN_PRIVATE_KEY`, `DOCUSIGN_USER_ID`, `DOCUSIGN_INTEGRATION_KEY`)  
**Webhook:** DocuSign Connect POSTs to `/api/webhooks/docusign`; verified with HMAC signature (`DOCUSIGN_WEBHOOK_SECRET`)  
**Limits (Developer):** 1,000 envelopes/month  
**Upgrade trigger:** Paid plan when production NDA volume grows

---

## AI Development Infrastructure

### Anthropic Claude / Claude Code
**Role:** AI-assisted development environment  
**Usage:** All code in this repository was built with Claude Code as the primary development tool

Claude Code (the Anthropic CLI) was used throughout the entire build sprint — writing components, debugging, architecture decisions, security review, and documentation. The development workflow is: Claude Code as pair programmer + human for product direction and validation.

---

## Planned / Strategic Partners (Roadmap)

These are not yet active integrations — they are named in the business model as target sponsor relationships:

| Company | Potential Role |
|---|---|
| **CrowdStrike** | Sponsor the "Threat Hunter" badge track; co-branded certificates |
| **Cisco** | Full platform integration across curriculum, threat intelligence, and certification (see below) |
| **SentinelOne** | Weekly CVE challenge sponsor ("SentinelOne Threat Intelligence Challenge") |
| **AWS** | Co-brand the SSRF stage (Capital One breach); AWS free-tier credit for completions |
| **CompTIA** | Certificate discount integration; co-brand cert verification |
| **ISC²** | CISSP pathway alignment; exam vouchers for badge completions |

### Cisco Integration Roadmap

Cisco is the deepest planned sponsor integration — anchored by the existing Cisco epoch (12 stages built on real Cisco CVEs) and expanding across four product lines:

| Cisco Product | Integration |
|---|---|
| **Cisco Talos** | Powers the weekly CVE challenge drop — Talos threat intelligence feed drives the "Threat of the Week" CTF scenario, keeping content current with real-world attack data |
| **Cisco Umbrella** | Dedicated DNS & network security curriculum track — stages covering DNS tunneling, domain generation algorithms (DGA), and Umbrella policy enforcement |
| **Cisco SecureX / XDR** | Enterprise security operations track — stages simulating alert triage, incident investigation, and response workflows in a SecureX-style environment |
| **Cisco Firepower / NGFW** | Network defense stages — intrusion detection, firewall rule exploitation, and lateral movement scenarios modeled on Firepower deployments |
| **Cisco CyberOps Associate** | Certification alignment — Cisco epoch badge completions map to CyberOps Associate exam domains; Cisco offers exam vouchers for learners who complete the track |
| **Cisco DevNet** | API security and automation stages — REST API exploitation, OAuth misconfigurations, and developer security in Cisco-ecosystem tooling |

---

## Technology Stack (No-Cost / Open Source)

| Technology | License | Version | Role |
|---|---|---|---|
| Next.js | MIT | 16.2.6 | Full-stack framework |
| React | MIT | 19.2.4 | UI rendering |
| TypeScript | Apache 2.0 | 5.x | Type safety |
| Tailwind CSS | MIT | 4.x | Styling |
| Web Crypto API | Browser built-in | — | Server-side PBKDF2 password hashing |
| react-markdown | MIT | 10.x | Admin docs viewer |
| remark-gfm | MIT | 4.x | GitHub-flavored markdown in docs viewer |
| @upstash/redis | MIT | 1.38.x | Redis client |

---

## Domain & DNS

| Asset | Value |
|---|---|
| Production domain | kryptoscronos.com |
| DNS managed by | Vercel (or registrar pointing to Vercel nameservers) |
| SSL/TLS | Vercel auto-provisioned (Let's Encrypt) |
| HSTS | Enabled (`max-age=63072000; includeSubDomains; preload`) |
