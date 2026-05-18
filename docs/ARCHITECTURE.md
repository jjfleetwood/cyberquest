# Kryptós CronOS — Technical Architecture
**Version:** 3.0  
**Date:** 2026-05-18  
**Codebase:** github.com/jjfleetwood/kryptos-cronos

---

## 1. System Overview

Kryptós CronOS is a Next.js 16 App Router application with serverless API routes, a Redis data layer (Upstash), server-side authentication via HMAC-signed HttpOnly cookies, an Anthropic Claude Haiku AI chatbot (ARIA), and DocuSign eSignature integration. The browser handles all interactive UI; API routes handle auth, progress, leaderboard, AI hints, NDA signing, and admin operations.

```
┌─────────────────────────────────────────────────────────┐
│                       Browser                            │
│  React 19 / Tailwind CSS 4 / TypeScript                 │
│  sessionStorage: UI cache only (no credentials)         │
│  No credentials or user data in localStorage            │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS (HttpOnly cookies)
             ┌────────▼────────┐
             │  Vercel Edge    │  ← proxy.ts (middleware)
             │  CDN + Runtime  │    blocks /admin/** without
             │  iad1 (US East) │    valid kryptos_admin cookie
             └────┬─────┬──────┘
                  │     │
        ┌─────────▼┐   ┌▼──────────────┐
        │ Next.js  │   │  Upstash Redis │
        │ API      │   │  (global edge) │
        │ Routes   │   │               │
        │ /api/*   │   │  - users      │
        └─────┬────┘   │  - progress   │
              │        │  - leaderboard│
              │        │  - streaks    │
              │        │  - NDA records│
              │        │  - rate limits│
              │        │  - pwd reset  │
              └────────┘
              │
    ┌─────────┼──────────┬────────────────┐
    │         │          │                │
┌───▼────┐ ┌─▼──────┐ ┌─▼──────────┐ ┌──▼──────────┐
│ Resend │ │Anthropic│ │  DocuSign  │ │  GitHub CI  │
│ (email)│ │  API   │ │ eSignature │ │  (Actions)  │
└────────┘ └────────┘ └────────────┘ └─────────────┘
```

---

## 2. Repository Structure

```
cyberquest/
├── app/                              # Next.js application root
│   ├── src/
│   │   ├── proxy.ts                  # Edge middleware (admin gating)
│   │   ├── app/                      # App Router pages
│   │   │   ├── layout.tsx            # Root layout + Nav
│   │   │   ├── page.tsx              # Landing page (/)
│   │   │   ├── login/page.tsx        # Login + register (/login)
│   │   │   ├── demo/page.tsx         # NDA-gated demo (/demo)
│   │   │   ├── stages/
│   │   │   │   ├── page.tsx          # Stage map (/stages)
│   │   │   │   └── [stageId]/page.tsx # Dynamic stage
│   │   │   ├── leaderboard/page.tsx  # Live leaderboard
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard
│   │   │   │   └── docs/page.tsx     # Admin docs viewer
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   ├── register/route.ts   # Server-side registration
│   │   │       │   ├── login/route.ts      # Server-side login
│   │   │       │   ├── session/route.ts    # Logout (DELETE)
│   │   │       │   └── me/route.ts         # Current user from cookies
│   │   │       ├── admin-session/route.ts  # Admin cookie grant/revoke
│   │   │       ├── admin/
│   │   │       │   ├── users/route.ts      # Full user table
│   │   │       │   └── send-nda/route.ts   # DocuSign envelope send
│   │   │       ├── check-flag/route.ts     # Server-side CTF flag validation
│   │   │       ├── check-answer/route.ts   # Server-side quiz answer validation
│   │   │       ├── docs/[file]/route.ts    # Gated doc delivery
│   │   │       ├── forgot-password/route.ts
│   │   │       ├── hint/route.ts           # Claude Haiku AI hints
│   │   │       ├── leaderboard/route.ts
│   │   │       ├── nda/route.ts            # NDA clickwrap record
│   │   │       ├── notify-registration/route.ts
│   │   │       ├── progress/route.ts
│   │   │       ├── reset-password/route.ts
│   │   │       ├── sync-user/route.ts      # Legacy compatibility
│   │   │       └── webhooks/
│   │   │           └── docusign/route.ts   # DocuSign event webhook
│   │   ├── components/
│   │   │   ├── ARIAChatbot.tsx       # ARIA AI hint chatbot (Claude Haiku)
│   │   │   ├── AttackDiagram.tsx     # CSS flow diagrams
│   │   │   ├── AuthGuard.tsx         # Soft auth prompt banner
│   │   │   ├── CtfChallenge.tsx      # Simulated bash terminal
│   │   │   ├── DocsViewer.tsx        # Admin markdown viewer
│   │   │   ├── FlagSuccessModal.tsx  # Completion modal with Skills Acquired
│   │   │   ├── Nav.tsx               # Top navigation bar
│   │   │   ├── QuizChallenge.tsx     # Multiple-choice challenges
│   │   │   ├── StageContainer.tsx    # Info → challenge state machine
│   │   │   └── StageInfo.tsx         # Stage briefing page
│   │   ├── data/
│   │   │   ├── types.ts              # All TypeScript types
│   │   │   ├── stages.ts             # Foundations + Cisco stages (24)
│   │   │   ├── before-times.ts       # Before Times stages (10)
│   │   │   ├── before-times-2.ts     # Before Times stages (10)
│   │   │   ├── before-times-3.ts     # Before Times stages (10)
│   │   │   ├── tech-audit.ts         # Tech Audit epochs (36 stages)
│   │   │   ├── mitre.ts              # MITRE ATT&CK + ATLAS (24 stages)
│   │   │   └── owasp-llm.ts          # OWASP LLM Top 10 (12 stages)
│   │   └── lib/
│   │       ├── auth.ts               # PBKDF2 hashing, HMAC cookie utils
│   │       ├── progress.ts           # XP/progress persistence
│   │       └── redis.ts              # Upstash Redis client
│   ├── secured-docs/                 # Admin-only documents (not in public/)
│   ├── public/                       # Static assets (images, favicon)
│   ├── next.config.ts                # Security headers, file tracing
│   ├── package.json
│   └── tsconfig.json
├── docs/                             # External documentation (this folder)
├── .github/workflows/                # GitHub Actions CI
├── content/                          # Legacy stage JSON (superseded by data/)
├── assets/                           # Raw images + audio
└── devops/
    ├── scripts/                      # Dev utility shell scripts
    └── logs/                         # Local dev server logs
```

---

## 3. Middleware — proxy.ts

`proxy.ts` is the active Next.js 16 middleware (the filename the framework expects, not `middleware.ts`). It runs on every request at the Vercel edge.

**Responsibilities:**
- Block all `/admin/**` routes unless the request has a valid `kryptos_admin` HttpOnly cookie
- Redirect unauthorized `/admin/**` requests to `/login`

```typescript
// Matcher: admin routes only
export const config = {
  matcher: ["/admin/:path*"],
};
```

**How admin auth works:**
1. Admin POSTs credentials to `/api/admin-session`
2. Server validates against `ADMIN_USERNAME` + `ADMIN_SECRET` env vars
3. Server issues a signed HMAC cookie (`kryptos_admin`) — HttpOnly, Secure, SameSite=Strict, 24h TTL
4. Subsequent `/admin/**` requests pass through the middleware cookie check

---

## 4. Auth System (v1.3.0+, Fully Server-Side)

All authentication is server-side. No credentials or user data are stored in localStorage or sessionStorage.

### 4.1 Registration Flow

```
Client sends: { username, email, password } over HTTPS
    → POST /api/auth/register
    → Server: generateSalt() → PBKDF2-SHA-256, 100k iterations
    → Store { email, passwordHash, salt, createdAt } in Redis user:{username}
    → Issue HMAC-signed session_token cookie (HttpOnly, 30 days)
    → If username matches ADMIN_USERNAME: also issue kryptos_admin cookie (24h)
    → POST /api/notify-registration (rate-limited email alert to admin)
```

### 4.2 Login Flow

```
Client sends: { username, password } over HTTPS
    → POST /api/auth/login
    → Server: HGETALL user:{username} from Redis → retrieve salt + passwordHash
    → PBKDF2(inputPassword, salt) → computedHash
    → computedHash === storedHash ? set cookies : 401
    → Issue HMAC-signed session_token cookie (HttpOnly, 30 days)
    → If admin: also issue kryptos_admin cookie (24h)
```

### 4.3 Session Resolution

All client components that need user identity call:
```
GET /api/auth/me
    → Server reads session_token cookie → HMAC verify → decode username
    → HGETALL user:{username} from Redis
    → Returns { username, email, isAdmin }
```

No user data persists in the browser beyond the HttpOnly cookie itself.

### 4.4 Cookie Specification

| Cookie | Signing | TTL | Scope |
|---|---|---|---|
| `session_token` | HMAC-SHA-256 (`ADMIN_SECRET`) | 30 days | All routes |
| `kryptos_admin` | HMAC-SHA-256 (`ADMIN_SECRET`) | 24 hours | `/admin/**` |

Both cookies: HttpOnly, Secure, SameSite=Strict.

### 4.5 Password Reset Flow

```
POST /api/forgot-password (rate: 3/IP/15min)
    → generate random token → store in Redis reset:{token} with 1h TTL
    → send email via Resend with reset link

User clicks link → POST /api/reset-password
    → validate token in Redis → PBKDF2 hash new password
    → update Redis user:{username}.passwordHash + salt
    → delete reset token
```

---

## 5. Epoch / Stage System

### 5.1 Epochs (9 total, 126 stages)

| Epoch | Name | Stages | IDs | Color |
|---|---|---|---|---|
| 1 | The Before Times | 30 | bt-01 → bt-30 | Emerald |
| 2 | Foundations | 12 | stage-01 → stage-12 | Amber |
| 3 | Cisco | 12 | stage-m01 → stage-m12 | Blue |
| 4 | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple |
| 5 | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet |
| 6 | Tech Audit: Agentic | 12 | audit-a01 → audit-a12 | Indigo |
| 7 | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red |
| 8 | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia |
| 9 | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange |

### 5.2 Stage Unlock Logic

- Within each epoch: sequential — stage N+1 unlocks when stage N is completed
- Between epochs: `isEpochUnlocked()` checks completed-stage count at render time
- Cisco epoch: locked until all 12 Foundations stages are completed

### 5.3 Stage Configuration Shape

```typescript
type StageConfig = {
  id: string;
  order: number;
  epoch: "before-times" | "foundations" | "cisco" | "tech-audit" | "tech-audit-technical" | "tech-audit-agentic" | "mitre" | "atlas" | "owasp-llm";
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp";
  owaspRef?: string;
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  wonder?: Wonder;
  info: StageInfo;
  ctf?: CtfConfig;
};
```

### 5.4 CTF Terminal Architecture

```
User input → runCommand(raw)
    ├── Built-ins: help, pwd, clear, cd, ls, cat, submit, hint
    └── extraCommands: TypeScript closures in stage data files
            └── Returns { lines: string[], solved?: boolean }
                    └── solved=true → POST /api/check-flag → awardStage()
```

**ARIA AI hints:** Available via the ARIA chatbot component during any stage. Rate-limited to 15 requests per IP per 15 minutes. Uses Claude Haiku with a Socratic method system prompt.

---

## 6. Data Layer

### 6.1 Server-Side Storage (Upstash Redis) — Source of Truth

| Data | Redis type | Key pattern | TTL |
|---|---|---|---|
| User record | Hash | `user:{username}` | None |
| User progress | Hash | `progress:{username}` | None |
| All-time leaderboard | Sorted set | `leaderboard` | None |
| Daily leaderboard | Sorted set | `lb:d:YYYY-MM-DD` | 48h |
| Weekly leaderboard | Sorted set | `lb:w:YYYY-MM-DD` | 14d |
| Streak data | Hash | `streak:{username}` | None |
| NDA record | Hash | `nda:{email}` | None |
| Password reset token | String | `reset:{token}` | 1h |
| Rate limit: NDA | String (counter) | `rate:nda:{ip}` | 15m |
| Rate limit: forgot-password | String (counter) | `rate:forgot:{ip}` | 15m |
| Rate limit: registration | String (counter) | `rate:reg:{ip}` | 1h |

### 6.2 Client-Side Storage

sessionStorage is used only for ephemeral UI state (e.g., cached stage render data). No credentials, tokens, or user identity data are stored client-side.

localStorage is not used for any authentication or user data in v1.3.0+.

### 6.3 Progress Sync

On stage completion:
1. POST `/api/progress` — server validates XP from STAGE_XP map (not client-submitted value), updates Redis
2. Leaderboard updated atomically with `ZADD leaderboard <xp> <username>`
3. Daily and weekly leaderboard sorted sets updated with TTL

---

## 7. API Routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/auth/register` | POST | None | Server-side PBKDF2 registration; sets session + admin cookies |
| `/api/auth/login` | POST | None | Server-side PBKDF2 login; sets session + admin cookies |
| `/api/auth/session` | DELETE | Session cookie | Clear session cookie (logout) |
| `/api/auth/me` | GET | Session cookie | Returns { username, email, isAdmin } |
| `/api/check-flag` | POST | Session cookie | Server-side CTF flag validation |
| `/api/check-answer` | POST | Session cookie | Server-side quiz answer validation |
| `/api/progress` | GET/POST | Session cookie | Fetch/update Redis progress + XP |
| `/api/leaderboard` | GET | None | Top XP rankings (daily/weekly/alltime) |
| `/api/hint` | POST | Session cookie | Claude Haiku AI hints (rate-limited 15/IP/15min) |
| `/api/forgot-password` | POST | None (rate: 3/IP/15min) | Send reset token via Resend |
| `/api/reset-password` | POST | Reset token | Validate token, hash + store new password |
| `/api/nda` | POST | None | Record NDA clickwrap acceptance |
| `/api/nda` | GET | Admin cookie | List NDA signatories |
| `/api/admin/send-nda` | POST | Admin cookie | Send DocuSign NDA envelope to recipient |
| `/api/admin/users` | GET | Admin cookie | Full user table from Redis |
| `/api/admin-session` | POST | Admin creds | Issue admin HMAC cookie |
| `/api/docs/[file]` | GET | Admin cookie | Serve secured-docs files |
| `/api/webhooks/docusign` | POST | Webhook HMAC | DocuSign event webhook (signed/declined/voided) |
| `/api/notify-registration` | POST | None (rate: 5/IP/hour) | Admin email alert on new user |
| `/api/sync-user` | POST | None | Legacy first-write-wins user record (compatibility) |

---

## 8. ARIA AI Chatbot

ARIA is the in-platform AI hint assistant, powered by Anthropic Claude Haiku via `/api/hint`.

- **System prompt:** Socratic method — ARIA asks guiding questions rather than giving direct answers
- **Stage awareness:** Current stage ID and context passed in each request
- **Rate limiting:** 15 requests per IP per 15-minute window (Redis counter)
- **Session cap:** 10 messages per stage session; 30-second cooldown between messages
- **UI:** Slide-in chatbot panel available on any stage page

---

## 9. DocuSign Integration

DocuSign eSignature is used to send formal NDA envelopes from the admin dashboard.

**Flow:**
1. Admin visits `/admin` → NDA Signatories table shows users who completed the clickwrap NDA
2. Admin clicks "Send DocuSign NDA" for a recipient
3. POST `/api/admin/send-nda` → JWT auth with DocuSign API → create and send envelope
4. DocuSign sends email to recipient with signing link
5. Recipient signs → DocuSign POSTs webhook to `/api/webhooks/docusign`
6. Webhook verifies HMAC signature (`DOCUSIGN_WEBHOOK_SECRET`) → updates `nda:{email}` in Redis with status

**Auth method:** JWT Grant (RSA private key `DOCUSIGN_PRIVATE_KEY`, user ID `DOCUSIGN_USER_ID`)

---

## 10. Security Headers

Configured in `next.config.ts`, applied to all routes:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.resend.com https://api.anthropic.com; frame-ancestors 'none'` |

---

## 11. CI/CD Pipeline

```
Local: git push origin master
           │
           ├── GitHub Actions (ci.yml)
           │       ├── npm ci (Node 24.x)
           │       ├── npm run lint
           │       ├── npx tsc --noEmit
           │       ├── npm run build
           │       └── npm audit --audit-level=moderate
           │
           └── Vercel GitHub App (auto-trigger on green CI)
                    ├── npm install (Node 24.x)
                    ├── next build (Turbopack)
                    └── Deploy to iad1 → kryptoscronos.com
```

---

## 12. Component Architecture

```
/stages/[stageId]
    └── StageContainer (client)
            ├── [phase=info]  → StageInfo
            │       └── AttackDiagram
            └── [phase=challenge]
                    ├── [type=ctf]  → CtfChallenge
                    │       ├── ReferenceDrawer → AttackDiagram
                    │       └── ARIAChatbot (ARIA hint panel)
                    └── [type=quiz] → QuizChallenge
                            └── ARIAChatbot (ARIA hint panel)

/admin
    └── AdminDashboard (client, requires kryptos_admin cookie)
            ├── UserTable (from /api/admin/users)
            ├── NDASignatories (from /api/nda GET, with DocuSign status)
            └── StageAnalytics
```
