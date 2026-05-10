# CyberQuest — Technical Architecture
**Version:** 1.0  
**Date:** 2026-05-09  
**Codebase:** github.com/jjfleetwood/cyberquest (branch: master, commit: 51ca22d)

---

## 1. System Overview

CyberQuest is a fully client-side Next.js application with zero backend infrastructure. All state (user accounts, progress, XP) lives in the browser's localStorage/sessionStorage. The app is deployed as a static + serverless hybrid on Vercel's global CDN.

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│  Next.js App (React 19, TypeScript, Tailwind)   │
│  ┌──────────────┐  ┌───────────┐  ┌──────────┐ │
│  │  localStorage │  │ session   │  │  React   │ │
│  │  users, XP   │  │ Storage   │  │  State   │ │
│  │  progress    │  │ session   │  │  (UI)    │ │
│  └──────────────┘  └───────────┘  └──────────┘ │
└────────────────────────┬────────────────────────┘
                         │ HTTPS
                ┌────────▼────────┐
                │  Vercel CDN     │
                │  (Global Edge)  │
                │  iad1 region    │
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │    GitHub       │
                │  (Source Truth) │
                │ jjfleetwood/    │
                │   cyberquest    │
                └─────────────────┘
```

---

## 2. Repository Structure

```
cyberquest/
├── app/                          # Next.js application root
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── page.tsx          # Landing page (/)
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Login/signup (/login)
│   │   │   ├── stages/
│   │   │   │   ├── page.tsx      # Stage map (/stages)
│   │   │   │   └── [stageId]/
│   │   │   │       └── page.tsx  # Dynamic stage (/stages/stage-XX)
│   │   │   └── leaderboard/
│   │   │       └── page.tsx      # Leaderboard (/leaderboard)
│   │   ├── components/           # Reusable UI components
│   │   │   ├── AttackDiagram.tsx # CSS flow diagram
│   │   │   ├── AuthGuard.tsx     # Soft auth prompt banner
│   │   │   ├── CtfChallenge.tsx  # Generic CTF terminal
│   │   │   ├── CtfTerminal.tsx   # Legacy Stage 2 terminal (superseded)
│   │   │   ├── QuizChallenge.tsx # CIA Triad scenario quiz
│   │   │   ├── StageContainer.tsx# Info→Challenge orchestrator
│   │   │   └── StageInfo.tsx     # Stage briefing page
│   │   ├── data/
│   │   │   ├── types.ts          # TypeScript type definitions
│   │   │   └── stages.ts         # All 12 stage configurations
│   │   └── lib/
│   │       ├── auth.ts           # Auth utilities (Web Crypto)
│   │       └── progress.ts       # XP/progress persistence
│   ├── next.config.ts            # Next.js configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json
├── devops/
│   ├── scripts/                  # Dev utility shell scripts
│   └── logs/                     # Local dev server logs
└── docs/
    ├── SECURITY_BRIEFING.md      # This document's sibling
    ├── TECHNICAL_ARCHITECTURE.md # This document
    ├── BUSINESS_PROPOSAL_PRO.md  # Professional pitch
    └── BUSINESS_PROPOSAL_CASUAL.md # Founder's pitch
```

---

## 3. Next.js App Router Architecture

### 3.1 Routing

| Route | Type | Rendering | Component |
|---|---|---|---|
| `/` | Static | SSG | `app/page.tsx` |
| `/login` | Static | SSG | `app/login/page.tsx` |
| `/stages` | Static | SSG (client hydration) | `app/stages/page.tsx` |
| `/stages/[stageId]` | Dynamic | SSR on demand | `app/stages/[stageId]/page.tsx` |
| `/leaderboard` | Static | SSG (client hydration) | `app/leaderboard/page.tsx` |

**Note on "Static" pages with client logic:** Pages marked `"use client"` are prerendered as static shells and hydrated in the browser. All localStorage/sessionStorage reads happen after hydration (in `useEffect`), preventing SSR mismatches.

### 3.2 Server vs. Client Components

- **Server components** (default): `app/stages/[stageId]/page.tsx` — awaits `params` Promise, passes stageId to client component
- **Client components** (`"use client"`): All interactive UI — stages page, leaderboard, login, all challenge components

### 3.3 Dynamic Params (Next.js 15+ Pattern)

```typescript
// app/stages/[stageId]/page.tsx
export default async function StagePage({
  params,
}: {
  params: Promise<{ stageId: string }>;   // params is a Promise in Next.js 15+
}) {
  const { stageId } = await params;       // must be awaited
  return <StageContainer stageId={stageId} />;
}
```

---

## 4. Data Layer

### 4.1 Stage Configuration (`src/data/stages.ts`)

The single source of truth for all 12 stages. Each stage is a `StageConfig` object:

```typescript
type StageConfig = {
  id: string;              // "stage-01" through "stage-12"
  order: number;           // 1–12, used for linear gating
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp";
  owaspRef?: string;       // e.g., "OWASP A03:2021"
  cveId?: string;          // e.g., "CVE-2021-44228"
  cvssScore?: number;      // CVSS v3.1 base score
  xp: number;              // XP awarded on completion
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  info: StageInfo;         // Briefing page content
  ctf?: CtfConfig;         // CTF filesystem + commands
};
```

**CTF config** includes a simulated filesystem (`files`, `dirs`), a flag string, and `extraCommands` — TypeScript closures that implement stage-specific terminal commands (e.g., `login`, `hashcheck`, `heartbeat`). These functions cannot be serialized to JSON, which is why stages.ts is TypeScript rather than a JSON file.

### 4.2 Type System (`src/data/types.ts`)

All types are centralized:
- `DiagramNode` — attack flow diagram nodes
- `StageInfo` — briefing page content shape
- `CtfConfig` — terminal filesystem + commands
- `CtfCommand` / `CtfCommandResult` — `(args: string[]) => { lines: string[]; solved?: boolean }`
- `StageConfig` — top-level stage definition

---

## 5. Component Architecture

### 5.1 Stage Flow

```
/stages/[stageId]
    └── StageContainer (client, reads stageId)
            │
            ├── [phase === "info"]  → StageInfo
            │       ├── AttackDiagram
            │       └── "Start Challenge" button → setPhase("challenge")
            │
            └── [phase === "challenge"]
                    ├── [challengeType === "ctf"]  → CtfChallenge
                    │       ├── ReferenceDrawer (slide-in panel)
                    │       │       └── AttackDiagram (inline)
                    │       └── Terminal (ls, cat, cd, submit, extraCommands)
                    │
                    └── [challengeType === "quiz"] → QuizChallenge
                            └── Scenario card + multiple choice
```

### 5.2 Component Responsibilities

| Component | Responsibility |
|---|---|
| `StageContainer` | Phase state machine (info → challenge); loads stage config |
| `StageInfo` | Full briefing: overview, diagram, technical deep-dive, incident, timeline, refs |
| `AttackDiagram` | Renders `DiagramNode[]` as CSS boxes-with-arrows (no SVG library) |
| `CtfChallenge` | Simulated bash terminal; built-in commands + extraCommands dispatch |
| `ReferenceDrawer` | Slide-in panel rendering condensed StageInfo during CTF |
| `QuizChallenge` | Scenario-based multiple choice; Caesar cipher, hash analysis, network logs |
| `AuthGuard` | Soft auth banner; non-blocking |

### 5.3 Terminal Command Dispatch (`CtfChallenge.tsx`)

```
User types command → runCommand(raw)
    │
    ├── Built-in: help, pwd, clear, cd, ls, cat, submit
    │       └── Handled inline in the function
    │
    └── Extra: anything in ctf.extraCommands
            └── ctf.extraCommands[cmd](args)
                    └── Returns { lines: string[], solved?: boolean }
                            └── If solved: awardStage() + setSolved(true)
```

---

## 6. Auth System (`src/lib/auth.ts`)

### 6.1 Password Flow

```
Registration:
  password + username → generateSalt() → 16-char hex salt
  (password + salt) → SHA-256 (Web Crypto) → passwordHash
  { username, email, passwordHash, salt } → localStorage["cyberquest_users"]
  username → sessionStorage["cyberquest_session"]

Login:
  username lookup → retrieve salt + storedHash
  (inputPassword + salt) → SHA-256 → computedHash
  computedHash === storedHash ? setSession() : error
```

### 6.2 Progress Scoping

```typescript
// src/lib/progress.ts
function progressKey(): string {
  const user = getSession();           // reads sessionStorage
  return user
    ? `cyberquest_progress_${user}`    // per-user key
    : "cyberquest_progress";           // anonymous fallback
}
```

---

## 7. Persistence Model

| Data | Storage | Key | Scope |
|---|---|---|---|
| User registry | localStorage | `cyberquest_users` | Browser/device |
| Active session | sessionStorage | `cyberquest_session` | Tab lifetime |
| User progress (XP, badges, completed stages) | localStorage | `cyberquest_progress_<username>` | Browser/device |
| Anonymous progress | localStorage | `cyberquest_progress` | Browser/device |

**Limitation:** Progress is device-local. A user signing in on a different device starts fresh. This is a known demo limitation; production would use a cloud database.

---

## 8. CI/CD Pipeline

### 8.1 Current Pipeline

```
Developer (local)
    │
    ├── npm run dev           → localhost:3000 (hot reload)
    ├── npm run build         → production build verification
    └── git push origin master
            │
            └── Vercel (auto-triggered by GitHub push via Vercel GitHub App)
                    │
                    ├── Install: npm install (Node 24.x)
                    ├── Build:   next build (Turbopack)
                    ├── Output: .next/ folder
                    └── Deploy: serverless functions + static assets → iad1 (us-east)
                            │
                            └── Production URL: cyberquest-jjfleetwood.vercel.app
```

### 8.2 Deployment Configuration

| Setting | Value |
|---|---|
| Framework | Next.js (auto-detected) |
| Root directory | `app/` |
| Node version | 24.x |
| Build command | `next build` (default) |
| Output directory | `.next` (default) |
| Region | `iad1` (US East, Washington DC) |
| Plan | Hobby (free) |

### 8.3 Missing CI Steps (Recommended)

A production pipeline should add:
```yaml
# .github/workflows/ci.yml (not yet implemented)
- npm run lint          # ESLint
- npm run type-check    # tsc --noEmit
- npm test              # Jest / Playwright
- npm audit             # Dependency security scan
```

---

## 9. Third-Party Services & Costs

### 9.1 Services Used

| Service | Purpose | Auth Method | Cost |
|---|---|---|---|
| **GitHub** | Source control, CI trigger | PAT (ghp_...) | **Free** |
| **Vercel** | Hosting, CDN, serverless | API token (vcp_...) | **Free** (Hobby plan) |

### 9.2 Vercel Hobby Plan Limits

| Resource | Limit | Current Usage |
|---|---|---|
| Bandwidth | 100 GB/month | ~0 MB |
| Serverless function executions | 100,000/month | ~0 |
| Build minutes | 6,000/month | ~2/deploy |
| Custom domains | 50 | 0 |
| Team members | 1 | 1 |

**Upgrade trigger:** Vercel Pro ($20/month) needed if: >1 team member needs deploy access, or monthly bandwidth exceeds 100 GB, or commercial use is detected by Vercel's terms.

### 9.3 No-Cost Technologies

| Technology | License | Purpose |
|---|---|---|
| Next.js 16.2.6 | MIT | Framework |
| React 19 | MIT | UI rendering |
| TypeScript 5 | Apache 2.0 | Type safety |
| Tailwind CSS 4 | MIT | Styling |
| Web Crypto API | Browser built-in | Password hashing |

### 9.4 Tokens Reference

| Token | Stored Where | Scope | Rotation |
|---|---|---|---|
| GitHub PAT `ghp_...` | Shell history only (not in repo) | `repo` | Revoke after use |
| Vercel API token `vcp_...` | Shell history only (not in repo) | Full account | Revoke after use |

---

## 10. Performance Characteristics

- **Initial page load:** ~200–400ms (Vercel CDN, static shell)
- **Time to interactive:** ~500–800ms (React hydration)
- **Stage page:** SSR on first request, cached at edge after
- **No external API calls** at runtime — zero network latency for app logic
- **Bundle size:** Estimated ~180KB gzipped (Next.js + React + Tailwind)

---

## 11. Production Architecture (Recommended Path)

When scaling beyond the demo:

```
Browser  →  Vercel Edge (CDN)
                │
                ├── Static assets (JS, CSS, images)
                ├── Next.js API routes (/api/*)
                │       ├── POST /api/auth/register
                │       ├── POST /api/auth/login
                │       └── POST /api/stages/submit-flag
                │
                └── Supabase (PostgreSQL)
                        ├── users table
                        ├── progress table (user_id, stage_id, xp, completed_at)
                        └── leaderboard view (aggregated XP)
```

Estimated monthly cost at 1,000 active users: **$0–25/month** (Vercel Pro + Supabase free tier).
