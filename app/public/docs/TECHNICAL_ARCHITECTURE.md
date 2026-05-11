# Kryptós CronOS — Technical Architecture
**Version:** 2.0  
**Date:** 2026-05-10  
**Codebase:** github.com/jjfleetwood/kryptos-cronos (branch: master, commit: 35796cd)

---

## 1. System Overview

Kryptós CronOS is a Next.js 16 application with a hybrid architecture: client-side auth and UI state in localStorage/sessionStorage, server-side persistence and leaderboard via Upstash Redis, and transactional email via Resend. Admin routes are protected at the proxy layer with HMAC-signed HttpOnly cookies.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                                                              │
│  Next.js App (React 19, TypeScript, Tailwind CSS)           │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│  │  localStorage│  │sessionStorage│  │   React State (UI) │ │
│  │  users, XP  │  │  username   │  │                    │ │
│  │  progress   │  │  session    │  │                    │ │
│  └──────────────┘  └─────────────┘  └────────────────────┘ │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS
               ┌────────▼────────┐
               │  Vercel (iad1)  │
               │  Node.js proxy  │◄── Admin HMAC cookie check
               │  API routes     │
               │  Static assets  │
               └───┬─────────┬───┘
                   │         │
        ┌──────────▼──┐   ┌──▼──────────┐
        │Upstash Redis│   │   Resend     │
        │(REST API)   │   │(Email API)   │
        │leaderboard  │   │Registration  │
        │progress     │   │notifications │
        └─────────────┘   └─────────────┘
```

---

## 2. Repository Structure

```
kryptos-cronos/
├── app/                              # Next.js application root
│   ├── src/
│   │   ├── app/                      # App Router pages + API routes
│   │   │   ├── page.tsx              # Landing page (/)
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login/signup (/login)
│   │   │   ├── stages/
│   │   │   │   ├── page.tsx          # Stage map (/stages)
│   │   │   │   └── [stageId]/
│   │   │   │       └── page.tsx      # Dynamic stage (/stages/stage-XX)
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx          # Live leaderboard (/leaderboard)
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard (/admin)
│   │   │   │   └── docs/
│   │   │   │       └── page.tsx      # Docs viewer (/admin/docs)
│   │   │   └── api/
│   │   │       ├── admin-session/
│   │   │       │   └── route.ts      # POST/DELETE admin HMAC cookie
│   │   │       ├── progress/
│   │   │       │   └── route.ts      # GET/POST user progress (Upstash)
│   │   │       ├── leaderboard/
│   │   │       │   └── route.ts      # GET top 50 players (Upstash)
│   │   │       └── notify-registration/
│   │   │           └── route.ts      # POST registration email (Resend)
│   │   ├── components/               # Reusable UI components
│   │   │   ├── AttackDiagram.tsx     # CSS flow diagram (no SVG library)
│   │   │   ├── AuthGuard.tsx         # Soft auth prompt banner
│   │   │   ├── CtfChallenge.tsx      # Generic CTF terminal
│   │   │   ├── DocsViewer.tsx        # Admin markdown docs viewer
│   │   │   ├── Nav.tsx               # Top navigation bar
│   │   │   ├── QuizChallenge.tsx     # CIA Triad scenario quiz
│   │   │   ├── StageContainer.tsx    # Info→Challenge phase orchestrator
│   │   │   └── StageInfo.tsx         # Stage briefing page
│   │   ├── data/
│   │   │   ├── types.ts              # TypeScript type definitions
│   │   │   └── stages.ts             # 24 stage configs (2 epochs)
│   │   ├── lib/
│   │   │   ├── auth.ts               # Auth: PBKDF2, sessions, admin cookie
│   │   │   ├── progress.ts           # XP/progress: localStorage + Redis sync
│   │   │   └── redis.ts              # Upstash Redis client singleton
│   │   └── proxy.ts                  # Admin route protection (HMAC cookie)
│   ├── public/
│   │   └── docs/                     # Docs served to admin docs viewer
│   │       ├── RELEASE_NOTES.md
│   │       ├── TECHNICAL_ARCHITECTURE.md
│   │       ├── SECURITY_BRIEFING.md
│   │       ├── BUSINESS_PROPOSAL_PRO.md
│   │       └── BUSINESS_PROPOSAL_CASUAL.md
│   ├── next.config.ts                # Security headers + CSP
│   └── package.json
├── devops/
│   ├── scripts/                      # Dev utility scripts
│   └── logs/                         # Local dev server logs
└── CLAUDE.md                         # AI assistant project guide
```

---

## 3. Curriculum Structure

The platform has 24 stages across 2 epochs. Epochs unlock sequentially — Cisco unlocks only after all 12 Foundations stages are completed.

### Foundations Epoch (amber)
12 stages set inside ancient world landmarks. Covers core cybersecurity principles using real-world breach incidents.

| Stage | Setting | Topic | CVE/OWASP |
|---|---|---|---|
| 01 | Great Pyramid, Giza | CIA Triad | — |
| 02 | Hanging Gardens, Babylon | AI & Threat Detection | — |
| 03 | Statue of Zeus, Olympia | SQL Injection | OWASP A03 |
| 04 | Temple of Artemis, Ephesus | XSS | OWASP A03 |
| 05 | Mausoleum at Halicarnassus | Heartbleed | CVE-2014-0160 |
| 06 | Colossus of Rhodes | Broken Access Control | OWASP A01 |
| 07 | Lighthouse of Alexandria | Auth Failures | OWASP A07 |
| 08 | Colosseum, Rome | Log4Shell | CVE-2021-44228 |
| 09 | Great Wall of China | WannaCry/EternalBlue | CVE-2017-0144 |
| 10 | Petra, Jordan | SSRF | OWASP A10 |
| 11 | Machu Picchu, Peru | Equifax/Struts RCE | CVE-2017-5638 |
| 12 | Angkor Wat, Cambodia | MongoDB Misconfiguration | OWASP A05 |

### Cisco Epoch (blue)
12 APT field operation stages, each set at a real-world landmark. Covers real Cisco CVEs with threat-actor framing.

| Stage | Location | CVE | Attack Type |
|---|---|---|---|
| M01 | Hagia Sophia, Istanbul | CVE-2023-20198 | Privilege escalation |
| M02 | Tower of London | CVE-2016-6366 | Buffer overflow (EXTRABACON) |
| M03 | Golden Gate Bridge | CVE-2018-0171 | Smart Install RCE |
| M04 | Kremlin, Moscow | CVE-2019-1653 | Auth bypass / info disclosure |
| M05 | Sydney Opera House | CVE-2020-3452 | Path traversal |
| M06 | Eiffel Tower, Paris | CVE-2022-20695 | Auth bypass |
| M07 | Burj Khalifa, Dubai | CVE-2021-1497 | Command injection |
| M08 | Forbidden City, Beijing | CVE-2023-20273 | Web UI command injection |
| M09 | Vatican, Rome | CVE-2019-1821 | Unauthenticated RCE |
| M10 | Colosseum, Rome | CVE-2020-3580 | XSS |
| M11 | Acropolis, Athens | CVE-2020-3187 | Path traversal / file deletion |
| M12 | Chichen Itza, Mexico | CVE-2017-6736 | SNMP RCE |

---

## 4. Next.js App Router Architecture

### 4.1 Routing

| Route | Type | Rendering |
|---|---|---|
| `/` | Static | SSG |
| `/login` | Static | SSG (client hydration) |
| `/stages` | Static | SSG (client hydration) |
| `/stages/[stageId]` | Dynamic | SSR on demand |
| `/leaderboard` | Static | SSG (client hydration, fetches /api/leaderboard) |
| `/admin` | Static | SSG (client hydration, proxy-protected) |
| `/admin/docs` | Static | SSG (proxy-protected) |
| `/api/admin-session` | Serverless | Node.js runtime |
| `/api/progress` | Serverless | Node.js runtime |
| `/api/leaderboard` | Serverless | Node.js runtime |
| `/api/notify-registration` | Serverless | Node.js runtime |

### 4.2 Proxy (Admin Route Protection)

`src/proxy.ts` runs on every request to `/admin/**`. It reads the `admin_token` HttpOnly cookie and verifies the HMAC-SHA256 signature server-side. Unsigned or missing tokens redirect to `/stages`.

```typescript
// src/proxy.ts
export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.redirect(new URL("/stages", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

---

## 5. Data Layer

### 5.1 Stage Configuration (`src/data/stages.ts`)

Single source of truth for all 24 stages. Each `StageConfig` contains:

```typescript
type StageConfig = {
  epochId: string;           // "ancient" | "medieval"
  wonder: Wonder;            // { name, location, era, emoji }
  id: string;                // "stage-01" through "stage-m12"
  order: number;             // 1–12, sequential within epoch
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp";
  owaspRef?: string;
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  info: StageInfo;           // Briefing page content
  ctf?: CtfConfig;           // Terminal filesystem + commands
};
```

CTF `extraCommands` are TypeScript closures — stage-specific terminal commands that cannot be JSON-serialized, which is why stages.ts is TypeScript rather than JSON.

### 5.2 Epoch Gating

Epochs unlock sequentially. Stage 1 of each epoch is always unlocked; subsequent stages unlock after the previous stage in the same epoch is completed. The Cisco epoch tab is locked until all 12 Foundations stages are complete.

```typescript
function isEpochUnlocked(epochIndex: number): boolean {
  if (epochIndex === 0) return true;
  const prevEpoch = epochs[epochIndex - 1];
  const prevStages = allStages.filter(s => s.epochId === prevEpoch.id);
  return prevStages.every(s => completedStages.includes(s.id));
}
```

---

## 6. Component Architecture

### 6.1 Stage Flow

```
/stages/[stageId]
    └── StageContainer (client, reads stageId)
            │
            ├── [phase === "info"]  → StageInfo
            │       ├── AttackDiagram
            │       └── "Start Challenge" → setPhase("challenge")
            │
            └── [phase === "challenge"]
                    ├── [challengeType === "ctf"]  → CtfChallenge
                    │       ├── Reference drawer (slide-in StageInfo)
                    │       └── Terminal (ls, cat, cd, submit, hint, extraCommands)
                    │
                    └── [challengeType === "quiz"] → QuizChallenge
                            └── Scenario card + multiple choice
```

### 6.2 Terminal Command Dispatch

```
User input → runCommand(raw)
    ├── Built-in: help, pwd, clear, cd, ls, cat, submit, hint
    └── Extra: ctf.extraCommands[cmd](args)
                └── Returns { lines: string[], solved?: boolean }
                        └── solved → awardStage() + POST /api/progress
```

---

## 7. Auth System (`src/lib/auth.ts`)

### 7.1 User Auth Flow

```
Registration:
  password → PBKDF2-SHA256 (100k iterations, 16-byte random salt)
  → { username, email, passwordHash, salt, isAdmin: false } → localStorage
  → setSession(username) → sessionStorage
  → POST /api/admin-session (server checks ADMIN_USERNAME env var)
      → if match: set admin_token HttpOnly cookie + mark user.isAdmin = true

Login:
  username → look up salt from localStorage
  password + salt → PBKDF2-SHA256 → compare hash
  → setSession(username) → sessionStorage
  → POST /api/admin-session (same admin check)
  → GET /api/progress?username=X → merge server progress into localStorage
```

### 7.2 Admin Session Flow

```
POST /api/admin-session { username }
    → compare username to ADMIN_USERNAME env var (server-side, constant-time)
    → if match: sign token = "username:HMAC-SHA256(ADMIN_SECRET, username)"
    → set admin_token HttpOnly cookie (secure, sameSite: lax, 24h)
    → return { isAdmin: true }

proxy.ts (every /admin/** request):
    → read admin_token cookie
    → verify HMAC signature with ADMIN_SECRET
    → redirect to /stages if invalid
```

### 7.3 Session Storage

| Data | Storage | Key | Lifetime |
|---|---|---|---|
| User registry | localStorage | `kryptos_users` | Until cleared |
| Active session | sessionStorage | `kryptos_session` | Tab close |
| Admin cookie | HttpOnly cookie | `admin_token` | 24 hours |

---

## 8. Persistence Model

### 8.1 Local (client-side)

| Data | Storage | Key |
|---|---|---|
| User registry | localStorage | `kryptos_users` |
| Active session | sessionStorage | `kryptos_session` |
| Progress (logged in) | localStorage | `kryptos_progress_<username>` |
| Progress (guest) | localStorage | `kryptos_progress` |

### 8.2 Server-side (Upstash Redis)

| Data | Structure | Key |
|---|---|---|
| User progress | Hash | `progress:{username}` |
| Global leaderboard | Sorted set | `leaderboard` |

**Progress hash fields:** `xp` (int), `stages` (JSON array), `badges` (JSON array), `lastActive` (Unix ms timestamp)

**Sync strategy:** Progress is written to Redis on every `awardStage()` call (fire-and-forget). On login, server progress is fetched and merged with local state — taking the max XP and union of completed stages and badges. This enables cross-device progress restore.

---

## 9. API Routes

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/admin-session` | POST | None | Issue admin cookie if username matches env var |
| `/api/admin-session` | DELETE | None | Revoke admin cookie |
| `/api/progress` | GET | Username param | Fetch user progress from Redis |
| `/api/progress` | POST | Username in body | Upsert progress + update leaderboard sorted set |
| `/api/leaderboard` | GET | None | Top 50 players from Redis sorted set |
| `/api/notify-registration` | POST | None | Send registration email via Resend |

---

## 10. Third-Party Services

| Service | Purpose | Auth Method | Cost |
|---|---|---|---|
| **GitHub** | Source control | PAT | Free |
| **Vercel** | Hosting, CDN, serverless | Linked via CLI | Free (Hobby) |
| **Upstash Redis** | Progress persistence, leaderboard | REST URL + token (env vars) | Free tier |
| **Resend** | Registration email | API key (env var) | Free tier |

### Environment Variables (Vercel Production)

| Variable | Purpose |
|---|---|
| `ADMIN_USERNAME` | Admin account identifier (server-side only) |
| `ADMIN_SECRET` | HMAC signing secret for admin cookie |
| `ADMIN_EMAIL` | Recipient for registration notifications |
| `RESEND_API_KEY` | Resend transactional email |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |

---

## 11. CI/CD Pipeline

```
git push origin master
        │
        └── Developer runs: npx vercel --prod
                │
                ├── Install: npm install
                ├── Build:   next build (Turbopack)
                └── Deploy:  serverless functions + static assets → iad1 (us-east)
                        │
                        └── Production: kryptochron.vercel.app
```

**Note:** Vercel GitHub auto-deploy integration is not active. Deployments are triggered manually via the Vercel CLI.

### Recommended CI additions (not yet implemented)

```
- npm run lint
- npx tsc --noEmit
- npm audit
```

---

## 12. Performance Characteristics

- **Initial page load:** ~200–400ms (Vercel CDN, static shell)
- **Time to interactive:** ~500–800ms (React hydration)
- **Leaderboard load:** +50–150ms (Upstash Redis REST call, serverless cold start ~25ms)
- **Stage completion:** +50–100ms (Upstash write, fire-and-forget — non-blocking)
- **Bundle size:** ~200KB gzipped (Next.js + React + Tailwind + Upstash client)
