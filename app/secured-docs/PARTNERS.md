# Kryptós CronOS — Partners & Supporting Infrastructure
**Version:** 2.0  
**Date:** 2026-05-11

---

## Core Infrastructure Partners

### Vercel
**Role:** Hosting, CDN, serverless compute  
**Plan:** Hobby (free)  
**URL:** vercel.com  
**Dashboard:** vercel.com/dashboard

Vercel hosts the entire application. Every `git push` to `master` triggers an automatic build and deploy. The Next.js serverless API routes run as Vercel Edge Functions. Assets are served from a global CDN with the primary region in `iad1` (US East, Washington DC).

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
**Role:** Serverless Redis — leaderboard, progress sync, rate limiting, password reset  
**Plan:** Free tier  
**URL:** upstash.com  
**Dashboard:** console.upstash.com

Upstash provides a globally distributed, REST-accessible Redis instance. It's the backbone of everything server-side in the app: real-time leaderboard rankings, cross-device progress sync, IP-based rate limiting, and time-limited password reset tokens.

**What it handles:**
- Global leaderboard (Redis sorted set, ranked by XP)
- Server-side user progress persistence (Redis hash per user)
- Password reset token storage (with 1-hour TTL)
- Rate limiting for forgot-password (3/IP/15min) and registration notifications (5/IP/hour)
- User record storage (first-write-wins on registration)

**Integration:** `@upstash/redis` npm package, REST API with `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`  
**Limits (Free):** 10,000 commands/day, 256 MB storage  
**Upgrade trigger:** Pay-as-you-go when daily command volume exceeds free tier

---

### Resend
**Role:** Transactional email delivery  
**Plan:** Free tier (3,000 emails/month)  
**URL:** resend.com  
**Dashboard:** resend.com/dashboard

Resend handles all outbound emails: admin alerts when new users register, and password reset links. It's called from serverless API routes with rate limiting to prevent abuse.

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

GitHub is the source of truth for all code. The Vercel GitHub App is connected to the repo — every push to `master` automatically triggers a production deploy. Pull requests trigger preview deployments.

**What it handles:**
- Version control and history
- Automated Vercel deploy trigger on push
- Issue tracking and project management (when used)

**Security note:** GitHub Personal Access Tokens used in CLI commands should be revoked immediately after use. Never store tokens in the repo or shell history permanently.

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
| **Palo Alto Networks** | Enterprise security curriculum sponsor |
| **SentinelOne** | Weekly CVE challenge sponsor ("SentinelOne Threat Intelligence Challenge") |
| **AWS** | Co-brand the SSRF stage (Capital One breach); AWS free-tier credit for completions |
| **Azure / Microsoft** | Cloud security curriculum track |
| **CompTIA** | Certificate discount integration; co-brand cert verification |
| **ISC²** | CISSP pathway alignment; exam vouchers for badge completions |

---

## Technology Stack (No-Cost)

| Technology | License | Version | Role |
|---|---|---|---|
| Next.js | MIT | 16.2.6 | Full-stack framework |
| React | MIT | 19.2.4 | UI rendering |
| TypeScript | Apache 2.0 | 5.x | Type safety |
| Tailwind CSS | MIT | 4.x | Styling |
| Web Crypto API | Browser built-in | — | Password hashing (PBKDF2) |
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
