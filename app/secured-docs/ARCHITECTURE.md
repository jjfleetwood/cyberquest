# Kryptós CronOS — Technical Architecture
**Version:** 2.0  
**Date:** 2026-05-11  
**Codebase:** github.com/jjfleetwood/kryptos-cronos

---

## 1. System Overview

Kryptós CronOS is a Next.js 16 App Router application with serverless API routes, a Redis data layer (Upstash), and an email delivery integration (Resend). The browser handles all interactive UI; the API routes handle auth-sensitive operations, progress persistence, and leaderboard.

```
┌─────────────────────────────────────────────────────────┐
│                       Browser                            │
│  React 19 / Tailwind CSS 4 / TypeScript                 │
│  localStorage: users, progress (client cache)           │
│  sessionStorage: session token                          │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS
             ┌────────▼────────┐
             │  Vercel Edge    │  ← proxy.ts (middleware)
             │  CDN + Runtime  │    blocks /admin/** without
             │  iad1 (US East) │    valid HttpOnly cookie
             └────┬─────┬──────┘
                  │     │
        ┌─────────▼┐   ┌▼──────────────┐
        │ Next.js  │   │  Upstash Redis │
        │ API      │   │  (global edge) │
        │ Routes   │   │               │
        │ /api/*   │   │  - leaderboard│
        └─────┬────┘   │  - progress   │
              │        │  - rate limits│
              │        │  - pwd reset  │
              └────────┘
                  │
          ┌───────▼───────┐
          │  Resend API   │
          │  (email)      │
          │  - registration│
          │  - pwd reset  │
          └───────────────┘
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
│   │   │       ├── admin-session/route.ts  # Cookie grant/revoke
│   │   │       ├── docs/[file]/route.ts    # Gated doc delivery
│   │   │       ├── forgot-password/route.ts
│   │   │       ├── leaderboard/route.ts
│   │   │       ├── notify-registration/route.ts
│   │   │       ├── progress/route.ts
│   │   │       ├── reset-password/route.ts
│   │   │       └── sync-user/route.ts
│   │   ├── components/
│   │   │   ├── AttackDiagram.tsx     # CSS flow diagrams
│   │   │   ├── AuthGuard.tsx         # Soft auth prompt banner
│   │   │   ├── CtfChallenge.tsx      # Simulated bash terminal
│   │   │   ├── DocsViewer.tsx        # Admin markdown viewer
│   │   │   ├── Nav.tsx               # Top navigation bar
│   │   │   ├── QuizChallenge.tsx     # Multiple-choice challenges
│   │   │   ├── StageContainer.tsx    # Info → challenge state machine
│   │   │   └── StageInfo.tsx         # Stage briefing page
│   │   ├── data/
│   │   │   ├── types.ts              # All TypeScript types
│   │   │   ├── stages.ts             # Foundations + Cisco stages (24)
│   │   │   ├── before-times.ts       # Before Times epoch (10 stages)
│   │   │   ├── before-times-2.ts     # Before Times epoch (10 stages)
│   │   │   └── before-times-3.ts     # Before Times epoch (10 stages)
│   │   └── lib/
│   │       ├── auth.ts               # PBKDF2 hashing, session utils
│   │       ├── progress.ts           # XP/progress persistence
│   │       └── redis.ts              # Upstash Redis client
│   ├── secured-docs/                 # Admin-only documents (not in public/)
│   │   ├── BUSINESS_PROPOSAL_CASUAL.md
│   │   ├── BUSINESS_PROPOSAL_PRO.md
│   │   ├── RELEASE_NOTES.md
│   │   ├── SECURITY_BRIEFING.md
│   │   └── TECHNICAL_ARCHITECTURE.md
│   ├── public/                       # Static assets (images, favicon)
│   ├── next.config.ts                # Security headers, file tracing
│   ├── package.json
│   └── tsconfig.json
├── docs/                             # External documentation (this folder)
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
// Matcher: all paths except static assets and api routes
export const config = {
  matcher: ["/admin/:path*"],
};
```

**How admin auth works:**
1. Admin POSTs credentials to `/api/admin-session`
2. Server validates against `ADMIN_USERNAME` + `ADMIN_SECRET` env vars
3. Server issues a signed HMAC cookie (`kryptos_admin`) — HttpOnly, Secure, SameSite=Strict
4. Subsequent `/admin/**` requests pass through the middleware cookie check

---

## 4. Epoch / Stage System

### 4.1 Epochs

| Epoch ID | Name | Stages | Theme | Default Shown |
|---|---|---|---|---|
| `before-times` | The Before Times | 30 (bt-01 → bt-30) | Beginner CTF | Yes (default tab) |
| `foundations` | Foundations | 12 (stage-01 → stage-12) | Ancient Wonders + OWASP | Unlocked after BT |
| `cisco` | Cisco | 12 (stage-m01 → stage-m12) | APT ops + Cisco CVEs | Locked until Foundations complete |

### 4.2 Stage Unlock Logic

- Within each epoch: sequential — stage N+1 unlocks when stage N is completed
- Between epochs: `isEpochUnlocked()` checks completed-stage count at render time
- Cisco epoch: locked until all 12 Foundations stages are completed

### 4.3 Stage Configuration Shape

```typescript
type StageConfig = {
  id: string;
  order: number;
  epoch: "before-times" | "foundations" | "cisco";
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp";
  owaspRef?: string;
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  wonder?: Wonder;           // Foundations/Cisco: landmark setting
  info: StageInfo;
  ctf?: CtfConfig;
};
```

### 4.4 CTF Terminal Architecture

```
User input → runCommand(raw)
    ├── Built-ins: help, pwd, clear, cd, ls, cat, submit, hint
    └── extraCommands: TypeScript closures in stages.ts
            └── Returns { lines: string[], solved?: boolean }
                    └── solved=true → awardStage() + setSolved(true)
```

**Progressive hints:** Up to 3 hints per stage, revealed sequentially via the `hint` command.

---

## 5. Data Layer

### 5.1 Client-Side Storage

| Data | Storage | Key | Lifetime |
|---|---|---|---|
| User registry | localStorage | `kryptos_users` | Persistent |
| Active session | sessionStorage | `kryptos_session` | Tab close |
| Progress (per user) | localStorage | `kryptos_progress_<username>` | Persistent |
| Anonymous progress | localStorage | `kryptos_progress` | Persistent |

### 5.2 Server-Side Storage (Upstash Redis)

| Data | Redis type | Key pattern |
|---|---|---|
| Leaderboard | Sorted set | `leaderboard` (score = XP) |
| User progress | Hash | `progress:<username>` |
| Rate limit (forgot-password) | String + TTL | `rl:forgot:<ip>` |
| Rate limit (notify-reg) | String + TTL | `rl:notify:<ip>` |
| Password reset tokens | String + TTL | `reset:<token>` |
| User records | Hash | `user:<username>` |

### 5.3 Sync Strategy

On stage completion:
1. Progress written to localStorage (immediate, offline-tolerant)
2. POST `/api/progress` updates Redis (async, best-effort)
3. Leaderboard updated atomically with `ZADD leaderboard <xp> <username>`

On login:
1. `GET /api/progress` fetches server-side record
2. Client merges server XP (takes the higher value) into localStorage

---

## 6. API Routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/admin-session` | POST/DELETE | Admin creds | Issue/revoke admin cookie |
| `/api/docs/[file]` | GET | Admin HMAC cookie | Serve secured-docs files |
| `/api/forgot-password` | POST | None (rate limited 3/IP/15min) | Send reset token via email |
| `/api/leaderboard` | GET | None | Return top-N XP rankings |
| `/api/notify-registration` | POST | None (rate limited 5/IP/hour) | Send admin email on new user |
| `/api/progress` | GET/POST | Session username | Fetch/update Redis progress |
| `/api/reset-password` | POST | Reset token | Validate token, update password |
| `/api/sync-user` | POST | None | First-write-wins user record to Redis |

---

## 7. Auth System

### 7.1 Registration Flow

```
username + email + password
  → generateSalt() → 16-char hex salt
  → PBKDF2-SHA-256, 100k iterations (Web Crypto API)
  → { username, email, passwordHash, salt, isAdmin } → localStorage["kryptos_users"]
  → POST /api/sync-user (first-write-wins to Redis)
  → POST /api/notify-registration (rate-limited email alert)
  → sessionStorage["kryptos_session"] = username
```

### 7.2 Login Flow

```
username → lookup in localStorage → retrieve { salt, passwordHash }
  → PBKDF2(inputPassword, salt) → computedHash
  → computedHash === storedHash ? setSession() : error
  → GET /api/progress → merge server XP into local
```

### 7.3 Password Reset Flow

```
Email submitted → POST /api/forgot-password (rate: 3/IP/15min)
  → generate random token → store in Redis with 1h TTL
  → send email via Resend with reset link
User clicks link → reset-password page → POST /api/reset-password
  → validate token exists in Redis → update password hash in Redis user record
  → delete token
```

---

## 8. Security Headers

Configured in `next.config.ts`, applied to all routes:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.resend.com; frame-ancestors 'none'` |

---

## 9. CI/CD Pipeline

```
Local: git push origin master
           │
           └── Vercel GitHub App (auto-trigger)
                    ├── npm install (Node 24.x)
                    ├── next build (Turbopack)
                    └── Deploy to iad1 → kryptoscronos.com
```

**No CI gates yet.** Recommended additions: lint, tsc --noEmit, npm audit (see BUILD.md).

---

## 10. Component Architecture

```
/stages/[stageId]
    └── StageContainer (client)
            ├── [phase=info]  → StageInfo
            │       └── AttackDiagram
            └── [phase=challenge]
                    ├── [type=ctf]  → CtfChallenge
                    │       └── ReferenceDrawer → AttackDiagram
                    └── [type=quiz] → QuizChallenge
```

---

## 11. Production Scaling Path

When scaling beyond demo:

```
Current                         Recommended
──────────────────              ──────────────────────────
localStorage auth     →         Supabase Auth (Argon2id, server-side)
localStorage progress →         Supabase PostgreSQL progress table
Client-side flags     →         /api/validate-flag (server-side)
Single Vercel region  →         Multi-region via Vercel Pro
```

Estimated cost at 1,000 active users: **$0–25/month** (Vercel Pro + Supabase free tier).
