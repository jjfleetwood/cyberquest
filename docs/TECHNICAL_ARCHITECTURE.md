# Kryptós CronOS — Technical Architecture Reference
**Version:** 3.0  
**Date:** 2026-05-18  
**Codebase:** github.com/jjfleetwood/kryptos-cronos (branch: master)

---

## 1. System Overview

Kryptós CronOS is a hybrid Next.js 16 App Router application. All authentication, progress tracking, and sensitive operations are server-side. The browser renders interactive UI and calls API routes over HTTPS using HttpOnly cookies — no credentials or user identity data are stored client-side.

```
┌─────────────────────────────────────────────────────────┐
│                       Browser                            │
│  React 19 / Tailwind CSS 4 / TypeScript                 │
│  sessionStorage: UI cache only (no credentials)         │
│  HttpOnly cookies set by server (not readable by JS)    │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS
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
        │ /api/*   │   │  users        │
        └─────┬────┘   │  progress     │
              │        │  leaderboard  │
              │        │  streaks      │
              │        │  NDA records  │
              │        │  rate limits  │
              │        │  pwd reset    │
              └────────┘
              │
    ┌─────────┼──────────┬────────────────┐
    │         │          │                │
┌───▼────┐ ┌─▼──────┐ ┌─▼──────────┐ ┌──▼──────────┐
│ Resend │ │Anthropic│ │  DocuSign  │ │  GitHub CI  │
│ (email)│ │  Haiku  │ │ eSignature │ │  (Actions)  │
└────────┘ └────────┘ └────────────┘ └─────────────┘
```

---

## 2. Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Data store | Upstash Redis | REST API |
| Email | Resend | HTTP API |
| AI chatbot | Anthropic Claude Haiku | API |
| eSignature | DocuSign eSignature API | REST + JWT |
| Hosting | Vercel | Hobby plan |
| CI | GitHub Actions | — |

---

## 3. Repository Structure

```
cyberquest/
├── app/                              # Next.js application root (Vercel root dir)
│   ├── src/
│   │   ├── proxy.ts                  # Edge middleware — admin route gating
│   │   ├── app/                      # App Router: pages + API routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── login/page.tsx
│   │   │   ├── demo/page.tsx         # NDA-gated demo
│   │   │   ├── stages/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [stageId]/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   └── docs/page.tsx
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   ├── register/route.ts
│   │   │       │   ├── login/route.ts
│   │   │       │   ├── session/route.ts   # DELETE = logout
│   │   │       │   └── me/route.ts
│   │   │       ├── admin-session/route.ts
│   │   │       ├── admin/
│   │   │       │   ├── users/route.ts
│   │   │       │   └── send-nda/route.ts
│   │   │       ├── check-flag/route.ts
│   │   │       ├── check-answer/route.ts
│   │   │       ├── docs/[file]/route.ts
│   │   │       ├── forgot-password/route.ts
│   │   │       ├── hint/route.ts
│   │   │       ├── leaderboard/route.ts
│   │   │       ├── nda/route.ts
│   │   │       ├── notify-registration/route.ts
│   │   │       ├── progress/route.ts
│   │   │       ├── reset-password/route.ts
│   │   │       ├── sync-user/route.ts
│   │   │       └── webhooks/
│   │   │           └── docusign/route.ts
│   │   ├── components/
│   │   │   ├── ARIAChatbot.tsx
│   │   │   ├── AttackDiagram.tsx
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── CtfChallenge.tsx
│   │   │   ├── DocsViewer.tsx
│   │   │   ├── FlagSuccessModal.tsx
│   │   │   ├── Nav.tsx
│   │   │   ├── QuizChallenge.tsx
│   │   │   ├── StageContainer.tsx
│   │   │   └── StageInfo.tsx
│   │   ├── data/
│   │   │   ├── types.ts
│   │   │   ├── stages.ts             # Foundations + Cisco (24 stages)
│   │   │   ├── first-journey.ts       # Our First Journey 1–10
│   │   │   ├── first-journey-2.ts     # Our First Journey 11–20
│   │   │   ├── first-journey-3.ts     # Our First Journey 21–30
│   │   │   ├── tech-audit.ts         # Tech Audit epochs (36 stages)
│   │   │   ├── mitre.ts              # MITRE ATT&CK + ATLAS (24 stages)
│   │   │   └── owasp-llm.ts          # OWASP LLM Top 10 (12 stages)
│   │   └── lib/
│   │       ├── auth.ts               # PBKDF2 hashing + HMAC cookie utils
│   │       ├── progress.ts           # XP/progress helpers
│   │       └── redis.ts              # Upstash Redis client
│   ├── secured-docs/                 # Admin-only docs (never in public/)
│   ├── public/                       # Static assets
│   ├── next.config.ts                # Security headers + outputFileTracingIncludes
│   ├── package.json
│   └── tsconfig.json
├── docs/                             # External docs (mirrors secured-docs/)
├── .github/workflows/ci.yml          # GitHub Actions CI
├── content/                          # Legacy stage JSON (superseded)
├── assets/                           # Raw images + audio
└── devops/
    ├── scripts/
    └── logs/
```

---

## 4. Auth System

### 4.1 Design Principles

- No credentials or user data in localStorage or sessionStorage
- All auth operations are server-side
- Session identity resolved by server on every request via `/api/auth/me`
- HMAC-signed cookies prevent tampering without access to `ADMIN_SECRET`

### 4.2 Registration

```
Client: POST /api/auth/register  { username, email, password }
Server:
  1. Check user:{username} does not already exist in Redis
  2. generateSalt() → 16-byte hex salt
  3. PBKDF2-SHA-256(password, salt, 100k iterations) → passwordHash
  4. HSET user:{username} email passwordHash salt createdAt
  5. HMAC-sign session payload → set session_token cookie (HttpOnly, Secure, SameSite=Strict, 30d)
  6. If username === ADMIN_USERNAME: HMAC-sign admin payload → set kryptos_admin cookie (24h)
  7. POST /api/notify-registration (async, rate-limited)
Client receives: cookies only — no user data in response body
```

### 4.3 Login

```
Client: POST /api/auth/login  { username, password }
Server:
  1. HGETALL user:{username} from Redis
  2. PBKDF2-SHA-256(password, storedSalt) → computedHash
  3. computedHash !== storedHash → 401
  4. HMAC-sign session payload → set session_token cookie (30d)
  5. If admin: set kryptos_admin cookie (24h)
Client receives: cookies only
```

### 4.4 Session Resolution

Every client component that needs user identity calls:

```
GET /api/auth/me
Server:
  1. Read session_token cookie
  2. HMAC-verify signature using ADMIN_SECRET
  3. Decode username from verified payload
  4. HGETALL user:{username} from Redis
  5. Return { username, email, isAdmin }
```

If the cookie is missing, expired, or tampered: returns 401. The client shows the login prompt.

### 4.5 Logout

```
DELETE /api/auth/session
Server: clear session_token cookie (MaxAge=0)
```

### 4.6 Cookie Specification

| Cookie | Algorithm | TTL | Flags |
|---|---|---|---|
| `session_token` | HMAC-SHA-256 (ADMIN_SECRET) | 30 days | HttpOnly, Secure, SameSite=Strict |
| `kryptos_admin` | HMAC-SHA-256 (ADMIN_SECRET) | 24 hours | HttpOnly, Secure, SameSite=Strict |

### 4.7 Password Reset

```
POST /api/forgot-password  { email }  (rate: 3/IP/15min)
  → find username by email in Redis
  → generate crypto-random token
  → SET reset:{token} username EX 3600
  → Resend: send email with https://kryptoscronos.com/reset-password?token={token}

POST /api/reset-password  { token, newPassword }
  → GET reset:{token} → resolve username
  → PBKDF2 hash newPassword
  → HSET user:{username} passwordHash salt
  → DEL reset:{token}
```

---

## 5. Data Layer

### 5.1 Redis Key Schema

All persistent state lives in Upstash Redis. There is no other database.

```
user:{username}         Hash    email, passwordHash, salt, createdAt
progress:{username}     Hash    stageIds (JSON array), xp, badges (JSON array), updatedAt
leaderboard             ZSet    score=xp, member=username  (all-time)
lb:d:YYYY-MM-DD         ZSet    score=xp, member=username  (daily, TTL 48h)
lb:w:YYYY-MM-DD         ZSet    score=xp, member=username  (weekly Mon date, TTL 14d)
streak:{username}       Hash    current, longest, lastDate
nda:{email}             Hash    name, email, acceptedAt/sentAt/signedAt, ip, method,
                                status, envelopeId
reset:{token}           String  username  (TTL 1h)
rate:nda:{ip}           String  counter   (TTL 15m)
rate:forgot:{ip}        String  counter   (TTL 15m)
rate:reg:{ip}           String  counter   (TTL 1h)
```

### 5.2 Client-Side Storage

sessionStorage is used only for ephemeral UI state (e.g., stage phase, cached render data). It holds no credentials, tokens, or persistent user data.

localStorage is not used for any application state in v1.3.0+.

### 5.3 Progress Write Path

On stage completion:
1. Client POSTs to `/api/progress` with `{ stageId }`
2. Server looks up XP from its internal STAGE_XP map (ignores any client-submitted XP value)
3. Server updates `progress:{username}` hash in Redis
4. Server atomically updates all three leaderboard sorted sets (`ZADD`)
5. Server checks milestone badge thresholds; awards new badges if earned
6. Server updates `streak:{username}` if this is the first completion today

---

## 6. API Routes

### Auth

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/auth/register` | POST | None | PBKDF2 registration; sets session + admin cookies |
| `/api/auth/login` | POST | None | PBKDF2 login; sets session + admin cookies |
| `/api/auth/session` | DELETE | Session cookie | Logout — clears session_token cookie |
| `/api/auth/me` | GET | Session cookie | Returns { username, email, isAdmin } |

### Platform

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/check-flag` | POST | Session cookie | Server-side CTF flag validation |
| `/api/check-answer` | POST | Session cookie | Server-side quiz answer validation |
| `/api/progress` | GET/POST | Session cookie | Fetch/update Redis progress + XP |
| `/api/leaderboard` | GET | None | Top XP rankings (daily/weekly/alltime) |
| `/api/hint` | POST | Session cookie | Claude Haiku AI hints (15/IP/15min) |
| `/api/forgot-password` | POST | None (rate: 3/IP/15min) | Send reset token via Resend |
| `/api/reset-password` | POST | Reset token | Validate token, hash + store new password |
| `/api/nda` | POST | None | Record NDA clickwrap acceptance |
| `/api/notify-registration` | POST | None (rate: 5/IP/hour) | Admin email alert on new user |
| `/api/sync-user` | POST | None | Legacy first-write-wins user record (compatibility) |

### Admin

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/admin-session` | POST | Admin creds | Issue admin HMAC cookie |
| `/api/admin/users` | GET | Admin cookie | Full user table from Redis |
| `/api/admin/send-nda` | POST | Admin cookie | Send DocuSign NDA envelope |
| `/api/nda` | GET | Admin cookie | List NDA signatories with status |
| `/api/docs/[file]` | GET | Admin cookie | Serve secured-docs files |

### Webhooks

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/webhooks/docusign` | POST | HMAC signature | DocuSign event updates (signed/declined/voided) |

---

## 7. ARIA AI Chatbot

ARIA is the in-platform AI hint assistant, available on every stage page.

**Implementation:** `/api/hint` calls Anthropic Claude Haiku with a system prompt that enforces Socratic questioning — ARIA never gives direct answers, only guiding questions and conceptual nudges.

**Request shape:**
```typescript
POST /api/hint
{
  message: string,        // user's question
  stageId: string,        // current stage for context injection
  history: Message[]      // last N messages (trimmed to fit context window)
}
```

**Constraints:**
- Rate limited: 15 requests per IP per 15-minute window (Redis counter)
- Session cap: 10 messages per stage visit (client-enforced)
- Cooldown: 30 seconds between messages (client-enforced)
- Model: Claude Haiku (fastest + cheapest Anthropic model)

---

## 8. DocuSign Integration

### Flow

```
Admin dashboard → NDA Signatories table → "Send DocuSign NDA" button
    → POST /api/admin/send-nda { recipientEmail, recipientName }
    → JWT auth: DOCUSIGN_PRIVATE_KEY + DOCUSIGN_USER_ID → access token
    → Create envelope with NDA template → send to recipient
    → HSET nda:{email} sentAt:{timestamp} status:pending envelopeId:{id}

DocuSign → recipient email → recipient signs
    → POST /api/webhooks/docusign (DocuSign Connect)
    → Verify HMAC signature (DOCUSIGN_WEBHOOK_SECRET)
    → Parse event type: completed / declined / voided
    → HSET nda:{email} signedAt:{timestamp} status:{event}
```

### Environment Variables Required

```
DOCUSIGN_INTEGRATION_KEY   App integration key (UUID)
DOCUSIGN_USER_ID           API username (UUID)
DOCUSIGN_ACCOUNT_ID        Account ID
DOCUSIGN_PRIVATE_KEY       RSA private key (JWT auth)
DOCUSIGN_BASE_URL          https://demo.docusign.net or https://na4.docusign.net
DOCUSIGN_WEBHOOK_SECRET    Optional — HMAC verification of webhook callbacks
```

---

## 9. Epoch / Stage System

### 9.1 Epoch Table

| Epoch | Name | Stages | IDs | Color |
|---|---|---|---|---|
| 1 | The Our First Journey | 30 | bt-01 → bt-30 | Emerald |
| 2 | Foundations | 12 | stage-01 → stage-12 | Amber |
| 3 | Cisco | 12 | stage-m01 → stage-m12 | Blue |
| 4 | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple |
| 5 | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet |
| 6 | Tech Audit: Agentic | 12 | audit-a01 → audit-a12 | Indigo |
| 7 | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red |
| 8 | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia |
| 9 | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange |

**Total: 126 stages**

### 9.2 Stage Config Shape

```typescript
type StageConfig = {
  id: string;
  order: number;
  epoch: EpochId;
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

### 9.3 CTF Terminal Architecture

```
User input → runCommand(raw)
    ├── Built-ins: help, pwd, clear, cd, ls, cat, submit, hint
    └── extraCommands: TypeScript closures in stage data files
            └── Returns { lines: string[], solved?: boolean }
                    └── solved=true → POST /api/check-flag → awardStage()
```

Server validates the flag against its stored value — the client never has access to the correct flag.

---

## 10. Component Architecture

```
/stages/[stageId]
    └── StageContainer (client, calls /api/auth/me + /api/progress)
            ├── [phase=info]  → StageInfo
            │       └── AttackDiagram
            └── [phase=challenge]
                    ├── [type=ctf]  → CtfChallenge
                    │       ├── ReferenceDrawer → StageInfo (condensed)
                    │       └── ARIAChatbot
                    └── [type=quiz] → QuizChallenge
                            └── ARIAChatbot

/admin  (requires kryptos_admin cookie — enforced by proxy.ts)
    └── AdminDashboard (client)
            ├── UserTable (GET /api/admin/users)
            ├── NDASignatories (GET /api/nda, with DocuSign status + send button)
            └── StageAnalytics

/demo  (NDA gate)
    └── NDAGate (POST /api/nda on accept → sets nda cookie → shows demo content)
```

---

## 11. Security Headers

Set in `next.config.ts` and applied to all responses:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.resend.com https://api.anthropic.com; frame-ancestors 'none'` |

---

## 12. CI/CD Pipeline

```
git push origin master
        │
        ├── GitHub Actions (.github/workflows/ci.yml)
        │       runs-on: ubuntu-latest, Node 24.x
        │       ├── npm ci
        │       ├── npm run lint        (ESLint)
        │       ├── npx tsc --noEmit   (TypeScript)
        │       ├── npm run build      (Next.js production build)
        │       └── npm audit          (dependency security)
        │
        └── Vercel GitHub App (auto-trigger)
                ├── npm install (Node 24.x)
                ├── next build (Turbopack)
                ├── Bundle secured-docs/ via outputFileTracingIncludes
                └── Deploy to iad1 → kryptoscronos.com (~90s)
```

---

## 13. Third-Party Services

| Service | Auth Method | Env Var(s) | Cost |
|---|---|---|---|
| Upstash Redis | REST token | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Free tier |
| Resend | API key | `RESEND_API_KEY` | Free tier |
| Anthropic Claude Haiku | API key | `ANTHROPIC_API_KEY` | Pay-per-token |
| DocuSign eSignature | JWT (RSA) | `DOCUSIGN_*` (6 vars) | Free developer tier |
| Vercel | GitHub App (auto) | — | Free Hobby plan |
| GitHub | GitHub App (auto) | — | Free |

---

## 14. Performance Characteristics

- **Initial page load:** ~200–400ms (Vercel CDN, static shell)
- **Time to interactive:** ~500–800ms (React hydration)
- **Stage page:** SSR on first request, cached at edge after
- **Auth check (`/api/auth/me`):** ~50–100ms (Upstash Redis edge latency)
- **ARIA hint response:** ~500–1500ms (Claude Haiku, depends on Anthropic API load)
- **Bundle size:** ~200KB gzipped (Next.js + React + Tailwind)
