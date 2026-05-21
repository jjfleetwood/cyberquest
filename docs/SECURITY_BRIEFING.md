# Kryptós CronOS — Security Briefing
**Classification:** Internal  
**Version:** 2.4  
**Date:** 2026-05-20  
**Current version:** v1.7.1

---

## Changelog — v2.4 (2026-05-20)

Closes CTF flag visibility finding. `stages-meta.ts` introduced as client-safe listing metadata module (no `ctf`, `quiz`, or `info`); both listing pages (`/stages` and `/stages/epoch/[epochId]`) now import from it instead of the full `stages.ts`. Section 5 updated to document final architecture. Section 9 corrected to reflect v1.3.0 auth migration (no credentials in localStorage). No new API routes, Redis keys, or env vars.

---

## Changelog — v2.3 (2026-05-20)

No new attack surface. v1.7.0 ships 30 new quiz stages (baseball-5/6/7), global nav wiring, and a synthetic PII fix. No new API routes, Redis keys, env vars, or third-party integrations. Synthetic SSN `123-45-6789` replaced with `000-00-0001` in two CTF lab virtual files.

---

## Executive Summary

Kryptós CronOS is a Next.js 16 application with serverless API routes, Redis-backed persistence, and a full security hardening sprint completed in v0.6.0. The overall risk rating is **LOW** — all critical and medium findings have been remediated. The remaining items are acceptable demo limitations with documented production remediation paths.

---

## 1. Authentication & Session Management

### 1.1 Password Hashing — ✅ RESOLVED (v0.2.0)

**Status:** PBKDF2-SHA-256 with 100,000 iterations and a 16-byte random salt via Web Crypto API.

```typescript
const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(salt), iterations: 100_000, hash: "SHA-256" }, keyMaterial, 256);
```

### 1.2 Admin Authentication — ✅ RESOLVED (v0.4.1)

**Status:** Admin credentials moved to server-side env vars. Admin cookie is HMAC-signed (`ADMIN_SECRET`), HttpOnly, Secure, SameSite=Strict. Admin routes blocked at middleware (`proxy.ts`). `admin-session` route throws if `ADMIN_SECRET` env var is missing.

### 1.3 Client-Side Credential Storage — ✅ RESOLVED (v1.3.0)

**Status:** No credentials in localStorage or sessionStorage. `auth.ts` stores only the username string in sessionStorage as a write-through UI cache — the authoritative session is the HMAC-signed HttpOnly `session_token` cookie verified server-side on every API call. XSS cannot extract a password, hash, or salt from the client.

### 1.4 Session Tokens — ✅ RESOLVED (v1.3.0)

**Status:** `server-session.ts` issues HMAC-signed tokens in the format `u:{username}:{hmac-sha256}`, verified server-side via `getServerSession()` on every protected route. HttpOnly, Secure, SameSite=Lax, 30-day maxAge.

---

## 2. API Security

### 2.1 Rate Limiting — ✅ RESOLVED (v0.6.0)

| Endpoint | Limit | Key |
|---|---|---|
| `/api/forgot-password` | 3/IP/15min | `rl:forgot:<ip>` in Redis |
| `/api/notify-registration` | 5/IP/hour | `rl:notify:<ip>` in Redis |

### 2.2 Server-Side XP Computation — ✅ RESOLVED (v0.6.0)

**Status:** XP is computed server-side in `/api/progress` POST from a hardcoded `STAGE_XP` map. Client-submitted XP values are ignored entirely.

### 2.3 User Record Integrity — ✅ RESOLVED (v0.6.0)

**Status:** `/api/sync-user` is first-write-wins — existing Redis user records cannot be overwritten by re-submitting registration.

### 2.4 Password Reset — ✅ RESOLVED (v0.5.0)

**Status:** Reset tokens are random, stored in Redis with 1-hour TTL, deleted on use. Password reset response returns only username, never email.

---

## 3. HTTP Security Headers — ✅ RESOLVED (v0.2.0 + v0.6.0)

All headers applied via `next.config.ts` to every route:

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ |
| `X-Frame-Options` | `DENY` | ✅ |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | ✅ |
| `Content-Security-Policy` | See below | ✅ |

**CSP:**
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self' https://api.resend.com;
frame-ancestors 'none'
```

**Note:** `unsafe-inline` is required by Next.js 15+ for hydration. A nonce-based CSP would eliminate this but requires Next.js App Router nonce support.

---

## 4. Internal Documents — ✅ RESOLVED (v0.6.0)

**Status:** All internal documents moved from `public/docs/` to `app/secured-docs/`. Served only via `/api/docs/[file]` which requires a valid admin HMAC cookie. `outputFileTracingIncludes` in `next.config.ts` ensures Vercel bundles the folder without exposing it as static assets.

---

## 5. CTF Flag Visibility — ✅ RESOLVED (v1.7.1)

**Architecture:**

- `src/data/stage-flags.ts` — `import "server-only"` at top; authoritative flag store never sent to any client.
- `/api/check-flag` — validates flags server-side using `stageFlags` from the server-only file. Client submits a guess; server returns only `{ correct: true/false }`.
- `/stages/[stageId]/page.tsx` — Server Component; strips `ctf.flag` and `extraCommands` before passing stage data to the `CtfChallenge` client component.
- `src/data/stages-meta.ts` — client-safe listing metadata (no `ctf`, `quiz`, or `info`); imported by both listing pages (`/stages` and `/stages/epoch/[epochId]`) instead of the full `stages.ts`.

**Accepted limitations (browser-based CTF by design):**

- CTF stage commands that reveal flags on discovery (e.g., `cat /root/flag.txt` returning a flag token) run client-side via `stage-commands.ts`. This is inherent to in-browser CTF mechanics — the challenge logic must execute locally. The flag value a player sees is the reward for solving the challenge correctly.
- Fragment `value` fields in `ctf.fragments[]` are partial flag pieces revealed progressively as players explore. This is the intended game mechanic.

**Why this is acceptable:** The canonical flag store (`stage-flags.ts`) is server-only, and all submission validation is server-side. A player who inspects the bundle can find a flag they haven't "earned" yet, but the platform is educational — the learning goal is the journey, not the flag string itself.

---

## 6. XSS

**Status:** ✅ No XSS vectors identified.
- All user content rendered via React JSX (HTML-escaped by default)
- No `dangerouslySetInnerHTML` in the codebase
- CTF terminal input displayed as plain text React nodes

---

## 7. Dependency Security

| Package | Version | Notes |
|---|---|---|
| next | 16.2.6 | Latest stable |
| react | 19.2.4 | Latest stable |
| @upstash/redis | 1.38.0 | Actively maintained |
| react-markdown | 10.x | Used in admin panel only |

**Action:** Run `npm audit` before each release.

---

## 8. Secrets in Source Code — ✅ CLEAN

No API keys, tokens, or credentials committed to the repository. `.gitignore` excludes `.env*`. All secrets in Vercel environment variables.

**GitHub PATs and Vercel tokens** used in one-off CLI commands must be revoked after use.

---

## 9. Data Privacy

| Data | Storage | Sent to Server? |
|---|---|---|
| Username | sessionStorage (UI cache only) + Redis | On registration only |
| Email | Redis only | On registration only |
| Password hash + salt | Redis only | Hash stored in Redis on registration; never in localStorage |
| XP / progress | Redis | On each stage completion |
| Session token | HttpOnly cookie (HMAC-signed) | Sent on every request; not accessible via JS |

No credentials, hashes, or salts are stored in `localStorage` or `sessionStorage`. The `sessionStorage` username entry is a write-through UI cache only — the authoritative session is the HMAC-signed `session_token` HttpOnly cookie verified server-side on every API call.

**Note:** Vercel logs HTTP access logs (IP, user agent) for all requests — standard CDN behavior, covered by Vercel's privacy policy.

---

## 10. Remediation Status Summary

| Finding | Severity | Status |
|---|---|---|
| Admin credentials in source code | Critical | ✅ Resolved v0.4.1 |
| Internal docs in public/ | High | ✅ Resolved v0.6.0 |
| Missing HSTS | Medium | ✅ Resolved v0.6.0 |
| Client-supplied XP accepted | Medium | ✅ Resolved v0.6.0 |
| No rate limiting on email endpoints | Medium | ✅ Resolved v0.6.0 |
| sync-user allows overwrite | Medium | ✅ Resolved v0.6.0 |
| admin-session accepts empty secret | Medium | ✅ Resolved v0.6.0 |
| Password reset leaks email | Low | ✅ Resolved v0.6.0 |
| Client-side auth storage | High | ✅ Resolved v1.3.0 |
| No signed session tokens | Low | ✅ Resolved v1.3.0 |
| CTF flags in client bundle | Low | ✅ Resolved — `stage-flags.ts` is server-only |

---

## Changelog — v2.2 (2026-05-20)

No new attack surface. v1.6.2 is a UI-only change to FeedbackWidget (drag handle, localStorage position persistence, label text). No new API routes, env vars, Redis keys, or third-party integrations.

---

## Changelog — v2.1 (2026-05-20)

No new attack surface. v1.6.1 adds only static documentation files (`docs/PITCH_CAE_CONTINUOUS_MONITORING.md`) served via the existing admin-gated `/api/docs/[file]` route. Deploy skill updated to enforce docs-first editing pattern. No new API routes, env vars, Redis keys, or third-party integrations introduced.

---

## 11. Production Readiness Gaps

| Item | Effort | Status |
|---|---|---|
| Migrate auth to server-side (Supabase Auth) | — | ✅ Current PBKDF2 + HMAC cookies is production-ready; Supabase deferred until OAuth/email-verification needed |
| Server-side flag validation | — | ✅ `stage-flags.ts` uses `server-only` — flags never sent to client |
| Signed JWT sessions | — | ✅ HMAC-signed `session_token` cookie verified server-side on every request |
| Add CI pipeline (lint, tsc, audit) | — | ✅ `.github/workflows/ci.yml` — runs on every push to master |
| Redis backup / point-in-time recovery | 1 min | ⚠️ Enable in Upstash console → database → Backups tab |
