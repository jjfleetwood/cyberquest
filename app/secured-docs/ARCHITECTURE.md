# Kryptós CronOS — Technical Architecture
**Version:** 4.0  
**Date:** 2026-05-22  
**Codebase:** github.com/jjfleetwood/kryptos-cronos

---

## 1. System Overview

Kryptós CronOS is a Next.js 16 App Router application with serverless API routes, a Redis data layer (Upstash), server-side authentication via HMAC-signed HttpOnly cookies, an Anthropic Claude Haiku AI chatbot (ARIA), DocuSign eSignature integration, and Stripe billing. The browser handles all interactive UI; API routes handle auth, progress, leaderboard, AI hints, NDA signing, shop/trophies, and admin operations.

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
    ┌─────────┼──────────┬────────────────┬──────────┐
    │         │          │                │          │
┌───▼────┐ ┌─▼──────┐ ┌─▼──────────┐ ┌──▼──────┐ ┌─▼──────┐
│ Resend │ │Anthropic│ │  DocuSign  │ │  Stripe │ │GitHub  │
│ (email)│ │  API   │ │ eSignature │ │ Billing │ │  CI    │
└────────┘ └────────┘ └────────────┘ └─────────┘ └────────┘
```

---

## 2. Repository Structure

```
cyberquest/
├── app/                              # Next.js application root (Vercel root dir)
│   ├── src/
│   │   ├── proxy.ts                  # Edge middleware (admin gating)
│   │   ├── app/                      # App Router pages
│   │   │   ├── layout.tsx            # Root layout + Nav + OG/Twitter meta
│   │   │   ├── page.tsx              # Landing page (/)
│   │   │   ├── login/page.tsx        # Login + register (/login)
│   │   │   ├── demo/page.tsx         # NDA-gated demo (/demo)
│   │   │   ├── stages/
│   │   │   │   ├── page.tsx          # Stage map (/stages)
│   │   │   │   ├── epoch/[epochId]/page.tsx  # Epoch landing
│   │   │   │   └── [stageId]/page.tsx        # Dynamic stage
│   │   │   ├── shop/page.tsx         # Trophy shop
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard
│   │   │   │   └── docs/page.tsx     # Admin docs viewer
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   ├── register/route.ts
│   │   │       │   ├── login/route.ts
│   │   │       │   ├── session/route.ts      # DELETE = logout
│   │   │       │   └── me/route.ts
│   │   │       ├── admin-session/route.ts
│   │   │       ├── admin/
│   │   │       │   ├── users/route.ts
│   │   │       │   ├── send-nda/route.ts
│   │   │       │   ├── set-tier/route.ts     # Pro tier toggle
│   │   │       │   ├── seed-demo/route.ts
│   │   │       │   └── cms/
│   │   │       │       ├── access/route.ts
│   │   │       │       └── stage/[stageId]/route.ts
│   │   │       ├── cms/access/route.ts
│   │   │       ├── check-flag/route.ts
│   │   │       ├── check-answer/route.ts
│   │   │       ├── delete-account/route.ts
│   │   │       ├── docs/[file]/route.ts
│   │   │       ├── feedback/route.ts
│   │   │       ├── forgot-password/route.ts
│   │   │       ├── hint/route.ts
│   │   │       ├── leaderboard/route.ts
│   │   │       ├── nda/route.ts
│   │   │       ├── notify-registration/route.ts
│   │   │       ├── progress/
│   │   │       │   ├── route.ts
│   │   │       │   └── certificate/route.ts
│   │   │       ├── reset-password/route.ts
│   │   │       ├── restore-user/route.ts
│   │   │       ├── shop/route.ts
│   │   │       ├── skin/route.ts
│   │   │       ├── stripe/checkout/route.ts
│   │   │       ├── sync-user/route.ts
│   │   │       ├── trophies/route.ts
│   │   │       └── webhooks/
│   │   │           ├── docusign/route.ts
│   │   │           └── stripe/route.ts
│   │   ├── components/
│   │   │   ├── AgePrompt.tsx         # Age verification modal
│   │   │   ├── ARIAChatbot.tsx       # ARIA AI hint chatbot (Claude Haiku)
│   │   │   ├── AttackDiagram.tsx     # CSS flow diagrams
│   │   │   ├── AuthGuard.tsx         # Soft auth prompt banner
│   │   │   ├── Avatar.tsx            # User avatar component
│   │   │   ├── BackLink.tsx          # Navigation back link
│   │   │   ├── CtfChallenge.tsx      # Simulated bash terminal
│   │   │   ├── DocsViewer.tsx        # Admin markdown viewer
│   │   │   ├── FeedbackWidget.tsx    # Floating feedback button
│   │   │   ├── FlagSuccessModal.tsx  # Completion modal with Skills Acquired
│   │   │   ├── HintChatbot.tsx       # Stage hint system
│   │   │   ├── Nav.tsx               # Top navigation bar
│   │   │   ├── OnboardingModal.tsx   # First-visit onboarding
│   │   │   ├── ProPaywall.tsx        # Pro tier paywall gate
│   │   │   ├── QuizChallenge.tsx     # Multiple-choice challenges
│   │   │   ├── StageContainer.tsx    # Info → challenge state machine
│   │   │   └── StageInfo.tsx         # Stage briefing page
│   │   ├── data/
│   │   │   ├── types.ts              # All TypeScript types
│   │   │   ├── stages.ts             # Epoch registry + inline Foundations/Cisco-Core stages
│   │   │   ├── stages-meta.ts        # Client-safe stage metadata (no ctf/quiz/info)
│   │   │   ├── stage-flags.ts        # Server-only flag store (import "server-only")
│   │   │   ├── stage-commands.ts     # CTF terminal command registry
│   │   │   ├── stage-downloads.ts    # Stage file download assets
│   │   │   ├── milestone-badges.ts   # Milestone badge definitions
│   │   │   ├── trophies.ts           # Trophy catalog
│   │   │   ├── shop-items.ts         # Shop item catalog
│   │   │   ├── content-flags.ts      # Content gating flags
│   │   │   ├── first-journey.ts      # Epoch 1: Our First Journey (stages 1–10)
│   │   │   ├── first-journey-2.ts    # Epoch 1 continued (stages 11–20)
│   │   │   ├── first-journey-3.ts    # Epoch 1 continued (stages 21–30)
│   │   │   ├── cisco-2.ts            # Epoch 4: Cisco Enterprise (m13–m25)
│   │   │   ├── cisco-3.ts            # Epoch 5: Cisco SecOps part 1 (m26–m33)
│   │   │   ├── cisco-4.ts            # Epoch 5: Cisco SecOps part 2 (m34–m38)
│   │   │   ├── cisco-5.ts            # Epoch 6: Cisco Advanced (m39–m50)
│   │   │   ├── tech-audit-1.ts       # Epoch 7: Tech Audit Foundations
│   │   │   ├── tech-audit-2.ts       # Epoch 8: Tech Audit Technical
│   │   │   ├── tech-audit-3.ts       # Epoch 9: Tech Audit Agentic
│   │   │   ├── tech-audit-4.ts       # Epoch 10: Continuous Monitoring 2.0
│   │   │   ├── mitre.ts              # Epoch 11: MITRE ATT&CK
│   │   │   ├── mitre-atlas.ts        # Epoch 12: MITRE ATLAS
│   │   │   ├── owasp-llm.ts          # Epoch 13: OWASP LLM Top 10
│   │   │   ├── quantum-1.ts          # Epoch 14: Quantum Foundations
│   │   │   ├── quantum-2.ts          # Epoch 15: Post-Quantum Cryptography
│   │   │   ├── quantum-3.ts          # Epoch 16: Quantum Security
│   │   │   ├── umbrella.ts           # Epoch 17: Cisco Umbrella
│   │   │   ├── tapestry.ts           # Epoch 18: The Woven World
│   │   │   ├── nails.ts              # Epoch 19: Nails
│   │   │   ├── hair-color.ts         # Epoch 20: Hair Coloring
│   │   │   ├── hair-styling.ts       # Epoch 21: Hair Styling
│   │   │   ├── driving-1.ts          # Epoch 22: Road to Your License
│   │   │   ├── driving-2.ts          # Epoch 23: First Miles
│   │   │   ├── driving-3.ts          # Epoch 24: Rules of the Road
│   │   │   ├── clubfoot.ts           # Epoch 25: Standing Tall (locked)
│   │   │   ├── baseball-1.ts         # Epoch 26: Play Ball!
│   │   │   ├── baseball-2.ts         # Epoch 27: The Art of Hitting
│   │   │   ├── baseball-3.ts         # Epoch 28: Advanced Mechanics
│   │   │   ├── baseball-4.ts         # Epoch 29: Elite Mastery
│   │   │   ├── baseball-5.ts         # Epoch 30: The Art of Pitching
│   │   │   ├── baseball-6.ts         # Epoch 31: Pitch Arsenal
│   │   │   └── baseball-7.ts         # Epoch 32: Pitching Strategy
│   │   └── lib/
│   │       ├── auth.ts               # Client-side auth helpers (sessionStorage UI cache)
│   │       ├── crypto-utils.ts       # PBKDF2 hashing (310k iterations), PBKDF2_ITERATIONS export
│   │       ├── server-session.ts     # HMAC session token sign/verify (uses SESSION_SECRET)
│   │       ├── progress.ts           # XP/progress persistence
│   │       └── redis.ts              # Upstash Redis client
│   ├── secured-docs/                 # Admin-only documents (not in public/)
│   ├── public/                       # Static assets (images, favicon)
│   ├── next.config.ts                # Security headers, file tracing, Stripe
│   ├── .env.example                  # All required env vars (no secrets)
│   ├── package.json
│   └── tsconfig.json
├── docs/                             # External documentation
├── .github/workflows/ci.yml          # GitHub Actions CI (triggers on dev + master)
├── assets/                           # Raw images + audio
└── devops/
    ├── scripts/
    └── logs/
```

---

## 3. Middleware — proxy.ts

`proxy.ts` is the active Next.js 16 middleware (the filename the framework expects, not `middleware.ts`). It runs on every request at the Vercel edge.

**Responsibilities:**
- Block all `/admin/**` routes unless the request has a valid `kryptos_admin` HttpOnly cookie
- Redirect unauthorized `/admin/**` requests to `/login`

```typescript
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

## 4. Auth System (v1.8.0+, Fully Server-Side)

All authentication is server-side. No credentials or user data are stored in localStorage or sessionStorage.

### 4.1 Registration Flow

```
Client sends: { username, email, password } over HTTPS
    → POST /api/auth/register
    → Server: generateSalt() → PBKDF2-SHA-256, 310,000 iterations
    → Store { email, passwordHash, salt, hashIterations: 310000, createdAt } in Redis user:{username}
    → Issue HMAC-signed session_token cookie (SESSION_SECRET, HttpOnly, 30 days)
    → If username matches ADMIN_USERNAME: also issue kryptos_admin cookie (ADMIN_SECRET, 24h)
    → POST /api/notify-registration (rate-limited email alert to admin)
```

### 4.2 Login Flow

```
Client sends: { username, password } over HTTPS
    → POST /api/auth/login (rate-limited: 5/IP/15min)
    → Server: HGETALL user:{username} from Redis → retrieve salt + passwordHash + hashIterations
    → storedIterations = hashIterations ?? 100_000  (legacy accounts pre-v1.8.0)
    → PBKDF2(password, salt, storedIterations) → computedHash
    → computedHash !== storedHash → 401
    → If storedIterations < 310_000: silently re-hash with 310k and update Redis
    → Issue HMAC-signed session_token cookie (HttpOnly, 30 days)
    → If admin: also issue kryptos_admin cookie (24h)
```

Transparent migration: legacy accounts (100k iterations) are silently upgraded to 310k on next successful login with no user-visible change.

### 4.3 Session Resolution

All client components that need user identity call:
```
GET /api/auth/me
    → Server reads session_token cookie → HMAC verify (SESSION_SECRET) → decode username
    → HGETALL user:{username} from Redis
    → Returns { username, email, isAdmin }
```

No user data persists in the browser beyond the HttpOnly cookie.

### 4.4 Cookie Specification

| Cookie | Signing Key | TTL | Scope |
|---|---|---|---|
| `session_token` | `SESSION_SECRET` | 30 days | All authenticated routes |
| `kryptos_admin` | `ADMIN_SECRET` | 24 hours | `/admin/**` (enforced by proxy.ts) |

Both cookies: HttpOnly, Secure, SameSite=Lax.

### 4.5 Password Reset Flow

```
POST /api/forgot-password (rate: 3/IP/15min)
    → generate random token → store in Redis reset:{token} with 1h TTL
    → send email via Resend with reset link

User clicks link → POST /api/reset-password (rate: 5/IP/hour)
    → validate token in Redis → PBKDF2 hash new password (310k iterations)
    → update Redis user:{username}: passwordHash, salt, hashIterations: 310000
    → delete reset token (single-use)
```

---

## 5. Epoch / Stage System

### 5.1 Epochs (32 total, 358 stages)

| # | Epoch ID | Name | Stages | ID Range | Color |
|---|---|---|---|---|---|
| 1 | `first-journey` | Our First Journey | 30 | bt-01 → bt-30 | Emerald |
| 2 | `ancient` | Foundations | 12 | stage-01 → stage-12 | Amber |
| 3 | `cisco-core` | Cisco: Core CVEs | 12 | stage-m01 → stage-m12 | Blue |
| 4 | `cisco-enterprise` | Cisco: Enterprise Attack | 13 | stage-m13 → stage-m25 | Indigo |
| 5 | `cisco-secops` | Cisco: Security Operations | 13 | stage-m26 → stage-m38 | Violet |
| 6 | `cisco-advanced` | Cisco: Advanced Defense | 12 | stage-m39 → stage-m50 | Cyan |
| 7 | `tech-audit-1` | Tech Audit: Foundations | 12 | audit-01 → audit-12 | Purple |
| 8 | `tech-audit-2` | Tech Audit: Technical | 12 | audit-t01 → audit-t12 | Violet |
| 9 | `tech-audit-3` | Tech Audit: Agentic | 12 | audit-a01 → audit-a12 | Indigo |
| 10 | `tech-audit-4` | Continuous Monitoring 2.0 | 12 | audit-cm01 → audit-cm12 | Rose |
| 11 | `mitre` | MITRE ATT&CK | 12 | mitre-01 → mitre-12 | Red |
| 12 | `mitre-atlas` | MITRE ATLAS | 12 | atlas-01 → atlas-12 | Fuchsia |
| 13 | `owasp-llm` | OWASP LLM Top 10 | 12 | llm-01 → llm-12 | Orange |
| 14 | `quantum-1` | Quantum Foundations | 10 | quantum-01 → quantum-10 | Cyan |
| 15 | `quantum-2` | Post-Quantum Cryptography | 10 | quantum-b01 → quantum-b10 | Teal |
| 16 | `quantum-3` | Quantum Security | 10 | quantum-c01 → quantum-c10 | Sky |
| 17 | `umbrella` | Cisco Umbrella | 10 | umbrella-01 → umbrella-10 | Indigo |
| 18 | `tapestry` | The Woven World | 12 | tapestry-01 → tapestry-12 | Yellow |
| 19 | `nails` | Nails | 10 | nails-01 → nails-10 | Pink |
| 20 | `hair-color` | Hair Coloring | 10 | hair-color-01 → hair-color-10 | Rose |
| 21 | `hair-styling` | Hair Styling | 10 | hs-01 → hs-10 | Violet |
| 22 | `driving-1` | Road to Your License | 8 | driving-1-01 → driving-1-08 | Green |
| 23 | `driving-2` | First Miles | 8 | driving-2-01 → driving-2-08 | Lime |
| 24 | `driving-3` | Rules of the Road | 8 | driving-3-01 → driving-3-08 | Orange |
| 25 | `clubfoot` | Standing Tall | 6 | clubfoot-01 → clubfoot-06 | Teal |
| 26 | `baseball-1` | Play Ball! | 10 | baseball-1-01 → baseball-1-10 | Red |
| 27 | `baseball-2` | The Art of Hitting | 10 | baseball-2-01 → baseball-2-10 | Blue |
| 28 | `baseball-3` | Advanced Mechanics | 10 | baseball-3-01 → baseball-3-10 | Violet |
| 29 | `baseball-4` | Elite Mastery | 10 | baseball-4-01 → baseball-4-10 | Amber |
| 30 | `baseball-5` | The Art of Pitching | 10 | baseball-5-01 → baseball-5-10 | Green |
| 31 | `baseball-6` | Pitch Arsenal | 10 | baseball-6-01 → baseball-6-10 | Red |
| 32 | `baseball-7` | Pitching Strategy | 10 | baseball-7-01 → baseball-7-10 | Indigo |

**Note:** Epoch 25 (clubfoot) is locked by default.

### 5.2 Stage Unlock Logic

- Within each epoch: sequential — stage N+1 unlocks when stage N is completed
- Between epochs: `isEpochUnlocked()` checks completed-stage count at render time
- Cisco epoch: `cisco-enterprise` locked until all 12 Foundations stages are completed

### 5.3 Stage Configuration Shape

```typescript
type StageConfig = {
  id: string;
  epochId: string;
  order: number;
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp" | "crafts" | "sports" | "health" | "driving";
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  wonder?: Wonder;
  info: StageInfo;
  quiz?: QuizConfig;
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

**Flag security:** `stage-flags.ts` uses `import "server-only"` — canonical flags never sent to the client. `/api/check-flag` validates server-side and returns only `{ correct: true/false }`.

**ARIA AI hints:** Available via the HintChatbot component during any stage. Rate-limited to 15 requests per IP per 15 minutes. Uses Claude Haiku with a Socratic method system prompt.

---

## 6. Data Layer

### 6.1 Server-Side Storage (Upstash Redis)

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
| Rate limit: login | String (counter) | `rate:login:{ip}` | 15m |
| Rate limit: reset-password | String (counter) | `rate:resetpw:{ip}` | 1h |
| Rate limit: NDA | String (counter) | `rate:nda:{ip}` | 15m |
| Rate limit: forgot-password | String (counter) | `rate:forgot:{ip}` | 15m |
| Rate limit: registration | String (counter) | `rate:reg:{ip}` | 1h |

**User hash fields:** `email`, `passwordHash`, `salt`, `hashIterations`, `createdAt`, `tier` (optional: `"pro"`)

### 6.2 Client-Side Storage

sessionStorage is used only for ephemeral UI state (e.g., cached username for nav display). No credentials, tokens, or sensitive user data are stored client-side.

localStorage stores only non-sensitive UI preferences (e.g., feedback widget position).

### 6.3 Progress Sync

On stage completion:
1. POST `/api/progress` — server validates XP from STAGE_XP map (not client-submitted value)
2. Updates `progress:{username}` hash in Redis
3. Leaderboard updated atomically with `ZADD leaderboard <xp> <username>`
4. Daily and weekly sorted sets updated with TTL
5. Milestone badges checked; streak updated

---

## 7. API Routes

### Auth

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/auth/register` | POST | None | PBKDF2-310k registration; sets session + admin cookies |
| `/api/auth/login` | POST | None (rate: 5/IP/15min) | PBKDF2 login with transparent re-hash migration |
| `/api/auth/session` | DELETE | Session cookie | Logout — clears session_token |
| `/api/auth/me` | GET | Session cookie | Returns `{ username, email, isAdmin }` |

### Platform

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/check-flag` | POST | Session cookie | Server-side CTF flag validation |
| `/api/check-answer` | POST | Session cookie | Server-side quiz answer validation |
| `/api/progress` | GET/POST | Session cookie | Fetch/update Redis progress + XP |
| `/api/progress/certificate` | GET | Session cookie | Generate completion certificate |
| `/api/leaderboard` | GET | None | Top XP rankings (daily/weekly/alltime) |
| `/api/hint` | POST | Session cookie | Claude Haiku AI hints (15/IP/15min) |
| `/api/forgot-password` | POST | None (rate: 3/IP/15min) | Send reset token via Resend |
| `/api/reset-password` | POST | Reset token (rate: 5/IP/hour) | Validate token, hash + store new password |
| `/api/nda` | POST | None | Record NDA clickwrap acceptance |
| `/api/shop` | GET | Session cookie | Fetch shop items and owned trophies |
| `/api/trophies` | GET/POST | Session cookie | Fetch/purchase trophies |
| `/api/skin` | POST | Session cookie | Set UI skin preference |
| `/api/feedback` | POST | Session cookie | Submit user feedback |
| `/api/delete-account` | POST | Session cookie | Delete user account and Redis records |
| `/api/notify-registration` | POST | None (rate: 5/IP/hour) | Admin email alert on new user |
| `/api/sync-user` | POST | None | Legacy first-write-wins user record (compatibility) |

### Stripe Billing

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/stripe/checkout` | POST | Session cookie | Create Stripe checkout session |
| `/api/webhooks/stripe` | POST | Stripe signature | Handle subscription events (paid/cancelled) |

### Admin

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/admin-session` | POST | Admin creds | Issue admin HMAC cookie |
| `/api/admin/users` | GET | Admin cookie | Full user table from Redis |
| `/api/admin/send-nda` | POST | Admin cookie | Send DocuSign NDA envelope |
| `/api/admin/set-tier` | POST | Admin cookie | Toggle Pro tier for a user |
| `/api/admin/seed-demo` | POST | Admin cookie | Seed demo user data |
| `/api/admin/cms/access` | GET | Admin cookie | CMS access management |
| `/api/admin/cms/stage/[stageId]` | GET/POST | Admin cookie | CMS stage editor |
| `/api/cms/access` | GET | Session cookie | User CMS access check |
| `/api/nda` | GET | Admin cookie | List NDA signatories with status |
| `/api/docs/[file]` | GET | Admin cookie | Serve secured-docs files |
| `/api/restore-user` | POST | Admin cookie | Restore a deleted user account |

### Webhooks

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/webhooks/docusign` | POST | HMAC signature | DocuSign event updates |
| `/api/webhooks/stripe` | POST | Stripe signature | Stripe subscription lifecycle |

---

## 8. ARIA AI Chatbot

ARIA is the in-platform AI hint assistant powered by Anthropic Claude Haiku via `/api/hint`.

- **System prompt:** Socratic method — ARIA asks guiding questions rather than giving direct answers
- **Stage awareness:** Current stage ID and context passed in each request
- **Rate limiting:** 15 requests per IP per 15-minute window (Redis counter)
- **Session cap:** 10 messages per stage session; 30-second cooldown between messages
- **UI:** `HintChatbot` component available on any stage page

---

## 9. DocuSign Integration

1. Admin clicks "Send DocuSign NDA" in the admin dashboard
2. POST `/api/admin/send-nda` → JWT auth with DocuSign API → create and send envelope
3. DocuSign sends email to recipient with signing link
4. Recipient signs → DocuSign POSTs webhook to `/api/webhooks/docusign`
5. Webhook verifies HMAC signature (`DOCUSIGN_WEBHOOK_SECRET`) → updates `nda:{email}` in Redis

**Auth method:** JWT Grant (RSA private key `DOCUSIGN_PRIVATE_KEY`, user ID `DOCUSIGN_USER_ID`)

---

## 10. Stripe Billing

Pro tier pricing: $5.99/month or $55.99/year.

**Flow:**
1. User clicks upgrade → POST `/api/stripe/checkout` → returns Stripe Checkout URL
2. User completes payment on Stripe-hosted page
3. Stripe POSTs webhook to `/api/webhooks/stripe`
4. Server verifies signature (`STRIPE_WEBHOOK_SECRET`) → sets `tier: "pro"` in Redis user hash
5. Pro users: 7-day trial on registration; admin can toggle tier manually via `/api/admin/set-tier`

**Required env vars:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_MONTHLY_PRICE_ID`, `STRIPE_PRO_YEARLY_PRICE_ID`

---

## 11. Security Headers

Configured in `next.config.ts`, applied to all routes:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.resend.com https://api.anthropic.com; frame-ancestors 'none'` |

**Note:** `unsafe-inline` is required by Next.js 16 for hydration. A nonce-based CSP would eliminate this and requires Next.js App Router nonce support via `proxy.ts`.

---

## 12. CI/CD Pipeline

```
Developer workflow:
  git push origin dev
       │
       ├── GitHub Actions (ci.yml) — triggers on both dev and master
       │       ├── npm ci (Node 24.x)
       │       ├── npm run lint (ESLint)
       │       ├── npx tsc --noEmit --skipLibCheck
       │       ├── npm run build (Next.js production build)
       │       └── npm audit --audit-level=moderate
       │
       └── Test on dev preview URL
               │
               └── git push origin master (or PR merge)
                       │
                       └── Vercel GitHub App (auto-trigger on master)
                               ├── npm install (Node 24.x)
                               ├── next build (Turbopack)
                               ├── Bundle secured-docs/ via outputFileTracingIncludes
                               └── Deploy to iad1 → kryptoscronos.com (~90s)

Manual production deploy:
  npx vercel --prod --project kryptos-cronos
```

---

## 13. Third-Party Services

| Service | Auth Method | Env Var(s) | Cost |
|---|---|---|---|
| Upstash Redis | REST token | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Free tier |
| Resend | API key | `RESEND_API_KEY` | Free tier |
| Anthropic Claude Haiku | API key | `ANTHROPIC_API_KEY` | Pay-per-token |
| DocuSign eSignature | JWT (RSA) | `DOCUSIGN_*` (6 vars) | Free developer tier |
| Stripe | API key + webhook | `STRIPE_*` (4 vars) | Pay-per-transaction |
| Vercel | GitHub App (auto) | — | Free Hobby plan |
| GitHub Actions | GitHub App (auto) | — | Free |

---

## 14. Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | ✅ | Redis connection |
| `UPSTASH_REDIS_REST_TOKEN` | ✅ | Redis auth |
| `SESSION_SECRET` | ✅ | HMAC signing for `session_token` cookie |
| `ADMIN_SECRET` | ✅ | HMAC signing for `kryptos_admin` cookie |
| `ADMIN_USERNAME` | ✅ | Admin account username |
| `RESEND_API_KEY` | ✅ | Email delivery |
| `ANTHROPIC_API_KEY` | ✅ | ARIA AI hints |
| `STRIPE_SECRET_KEY` | ⚠️ | Stripe billing (go-live pending) |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ | Stripe webhook verification |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | ⚠️ | $5.99/month price ID |
| `STRIPE_PRO_YEARLY_PRICE_ID` | ⚠️ | $55.99/year price ID |
| `DOCUSIGN_INTEGRATION_KEY` | Optional | DocuSign JWT auth |
| `DOCUSIGN_USER_ID` | Optional | DocuSign user UUID |
| `DOCUSIGN_ACCOUNT_ID` | Optional | DocuSign account |
| `DOCUSIGN_PRIVATE_KEY` | Optional | DocuSign RSA key |
| `DOCUSIGN_BASE_URL` | Optional | DocuSign API endpoint |
| `DOCUSIGN_WEBHOOK_SECRET` | Optional | DocuSign webhook HMAC |

See `.env.example` for all variables with generation instructions.

---

## 15. Component Architecture

```
/stages/[stageId]
    └── StageContainer (client, calls /api/auth/me + /api/progress)
            ├── [phase=info]  → StageInfo
            │       └── AttackDiagram
            └── [phase=challenge]
                    ├── [type=ctf]  → CtfChallenge
                    │       ├── ReferenceDrawer → StageInfo (condensed)
                    │       └── HintChatbot
                    └── [type=quiz] → QuizChallenge
                            └── HintChatbot

/admin  (requires kryptos_admin cookie — enforced by proxy.ts)
    └── AdminDashboard (client)
            ├── UserTable (GET /api/admin/users) — includes Pro tier toggle
            ├── NDASignatories (GET /api/nda, DocuSign status + send button)
            ├── StageAnalytics
            └── Remote Desktop link (Google Chrome Remote Desktop)

/shop
    └── ShopPage (client, calls /api/shop + /api/trophies)
            ├── ShowcaseTrophies — today's featured trophies
            └── TrophyGrid — purchasable items
```
