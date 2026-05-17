# Kryptós CronOS Security Briefing
**Classification:** Internal — Pre-Production  
**Date:** 2026-05-16  
**Version:** 2.3  
**Reviewed by:** Internal Security Analysis

---

## Changelog — v2.3 (2026-05-16)

- **RESOLVED: Password hashes publicly exposed** — `/api/restore-user` previously returned `{ passwordHash, salt, email }` to any caller knowing a username. Gutted to always return 404. New `/api/auth/login` does full server-side PBKDF2 verification; hash and salt never leave the server.
- **RESOLVED: Credentials in localStorage** — `StoredUser` type no longer includes `passwordHash` or `salt`. Login is entirely server-side via `/api/auth/login`. Session established via HMAC-signed HttpOnly `session_token` cookie.
- **RESOLVED: HTML injection in emails** — `forgot-password` and `notify-registration` both had raw `${username}` and `${email}` interpolated into HTML email bodies. Fixed with `escapeHtml()` in both routes.
- **RESOLVED: Rate limit IP spoofing** — All three rate-limited routes used `x-forwarded-for`, which clients can spoof. Changed to `x-real-ip` (Vercel canonical, infrastructure-set) with `x-forwarded-for` as fallback.
- **RESOLVED: Unauthenticated admin notification** — `/api/notify-registration` accepted any payload without verifying a real session existed. Added `getServerSession()` check; session username must match claimed username.
- **RESOLVED: No session after password reset** — `/api/reset-password` now signs and sets `session_token` cookie on success. Page no longer writes credentials to localStorage.
- **RESOLVED: Non-constant-time hash comparison** — `/api/auth/session` used `!==` for string comparison of password hashes. Now uses `timingSafeEqual` via Node.js `crypto`.
- **RESOLVED: Silent username collision** — `/api/sync-user` returned 200 on duplicate usernames. Now returns 409 `{ taken: true }`, allowing the client to surface the error correctly.
- **NEW ENDPOINT: `/api/hint`** — Proxies requests to Anthropic Claude Haiku for AI hints. Rate-limited to 15 req/15 min per IP. System prompt is hardened to never reveal flag values. `ANTHROPIC_API_KEY` must be set as an environment secret in Vercel; the endpoint returns 503 if the key is absent.

---

---

## Executive Summary

Kryptós CronOS has a hybrid architecture: client-side auth (localStorage/sessionStorage), server-side progress persistence (Upstash Redis), admin route protection via HMAC-signed HttpOnly cookies, and transactional email via Resend. The attack surface has been meaningfully reduced since v1.0 of this document. Several items remain acceptable for demo-stage use but require hardening before a scaled production launch.

**Overall Risk Rating: LOW** — Suitable for public demo and early users. The most significant remaining risk is client-side credential storage (inherent to the localStorage auth model).

---

## 1. Authentication & Session Management

### 1.1 Password Hashing — ✅ RESOLVED

**Finding:** Passwords were previously hashed with plain SHA-256. Now upgraded to PBKDF2-SHA-256 with 100,000 iterations and a 16-byte random salt via the Web Crypto API.

```typescript
const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", salt: encoder.encode(salt), iterations: 100_000, hash: "SHA-256" },
  keyMaterial, 256
);
```

**Status:** ✅ Implemented. Brute-force resistance is ~100,000× stronger than plain SHA-256.

---

### 1.2 Client-Side User Storage — MEDIUM RISK (Accepted for Demo)

**Finding:** User credentials (username, email, PBKDF2 hash, salt, isAdmin flag) are stored in `localStorage["kryptos_users"]`. Any JavaScript running on the page can read this.

**Impact:** XSS would expose all user records on that device. There is no server-side session validation for regular users.

**Current mitigations:**
- React JSX escaping prevents XSS (no `dangerouslySetInnerHTML`)
- Content Security Policy restricts script sources to `'self'`
- No financial data or sensitive PII beyond email is stored

**Remediation (Pre-scale):** Migrate to server-side auth — NextAuth.js, Lucia, or Supabase Auth — with a PostgreSQL database. This eliminates client-side credential storage entirely.

---

### 1.3 Admin Session — ✅ RESOLVED

**Previous finding:** Admin access was determined by comparing the session username to a hardcoded string in client code. This was trivially bypassable.

**Resolution:** Admin sessions are now fully server-side:

1. On login/register, the client POSTs `{ username }` to `/api/admin-session`
2. The server compares username to `ADMIN_USERNAME` env var using constant-time comparison
3. If matched, the server issues a signed cookie: `admin_token = "username:HMAC-SHA256(ADMIN_SECRET, username)"`
4. `src/middleware.ts` verifies this HMAC on every request to `/admin/**` before serving the page

**Status:** ✅ Admin username and secret live in server-side env vars only. The client never sees them. Cookie is HttpOnly, Secure (in production), SameSite: Lax.

---

### 1.4 Regular Session Management — LOW RISK

**Finding:** User sessions are stored in `sessionStorage["kryptos_session"]` as a plain username string. No cryptographic token, expiry, or server-side revocation.

**Impact:** Sessions expire naturally on tab close. A physically proximate attacker on a shared machine during an active session could read the username, but cannot steal credentials.

**Remediation:** Replace with a signed JWT or server-side session token. Low priority while the user base is small.

---

## 2. Cross-Site Scripting (XSS)

### 2.1 React JSX Escaping — ✅ LOW RISK

All user-facing content is rendered through React JSX which escapes HTML entities by default. No `dangerouslySetInnerHTML` usage found anywhere in the codebase.

**Status:** ✅ No XSS vectors identified.

### 2.2 CTF Terminal Input — ✅ LOW RISK

The `CtfChallenge.tsx` terminal accepts user input and displays it in terminal output. Input is split on whitespace and rendered as React text nodes — not HTML.

**Status:** ✅ No injection possible.

### 2.3 Content Security Policy — ✅ RESOLVED

A full CSP is active on all responses via `next.config.ts`:

```
default-src 'self'
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline'
img-src 'self' data: https:
font-src 'self'
connect-src 'self' https://api.resend.com
frame-ancestors 'none'
```

`'unsafe-inline'` for scripts is required by Next.js for hydration. A nonce-based CSP would remove this requirement but adds build complexity.

**Status:** ✅ Active. `frame-ancestors 'none'` prevents clickjacking.

---

## 3. Secret / Token Exposure

### 3.1 Source Code Secrets — ✅ CLEAN

All secrets are stored in Vercel environment variables and accessed server-side only. No API keys, tokens, or credentials are committed to the repository.

**Variables in use:**

| Variable | Location | Exposure |
|---|---|---|
| `ADMIN_USERNAME` | Vercel env (production) | Server-side only |
| `ADMIN_SECRET` | Vercel env (production) | Server-side only |
| `ADMIN_EMAIL` | Vercel env (production) | Server-side only |
| `RESEND_API_KEY` | Vercel env (production) | Server-side only |
| `UPSTASH_REDIS_REST_URL` | Vercel env (production) | Server-side only |
| `UPSTASH_REDIS_REST_TOKEN` | Vercel env (production) | Server-side only |
| `ANTHROPIC_API_KEY` | Vercel env (production) | Server-side only — `/api/hint` route |

**Status:** ✅ Clean. `.gitignore` excludes all `.env*` files.

### 3.2 Internal Documents — ✅ RESOLVED

**Previous finding:** Internal documents (this briefing, architecture doc, business proposals) were served as static files from `public/docs/` — unauthenticated and publicly accessible.

**Resolution:** All internal documents moved to `secured-docs/` (outside of `public/`). Access is now gated behind `/api/docs/[file]` which verifies the admin HMAC cookie before serving.

**Status:** ✅ Docs are no longer publicly accessible.

---

## 4. CTF Flag Visibility

### 4.1 Flags in Client Bundle — ✅ RESOLVED

**Previous finding:** CTF flags were defined in `src/data/stages.ts`, bundled client-side and readable in DevTools.

**Resolution (v1.0.0):** All 169 flags moved to `src/data/stage-flags.ts`, which carries `import 'server-only'` at the top. Next.js enforces this at build time — any attempt to import this module in a client component causes a build error. The `/api/check-flag` route imports from this registry exclusively. The `flag:` property has been removed from all 14 stage data files. Flags are never serialized to the client bundle.

**Status:** ✅ Resolved. Flag values are server-only.

---

## 5. Data Privacy

### 5.1 User Data — What Leaves the Browser

With the addition of Upstash Redis, some user data now leaves the browser:

| Data | Transmitted To | When |
|---|---|---|
| Username | Upstash Redis (via `/api/progress`) | On stage completion, on login |
| XP score | Upstash Redis | On stage completion |
| Completed stage IDs | Upstash Redis | On stage completion |
| Badge IDs | Upstash Redis | On stage completion |
| Username | Resend (email body) | On registration (admin notification only) |
| Email address | Resend (email body) | On registration (admin notification only) |

**What does NOT leave the browser:** Password hash, salt, raw password.

**Assessment:** GDPR/CCPA obligations apply now that usernames and progress data are stored server-side. For a demo with consenting early users, risk is low. At scale, a privacy policy and data deletion endpoint are required.

### 5.2 Vercel Access Logs

Vercel logs IP addresses and user agents for all HTTP requests. This is standard CDN behavior covered by Vercel's privacy policy.

---

## 6. HTTP Security Headers — ✅ RESOLVED

All security headers are applied via `next.config.ts`:

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS enforcement |
| `X-Frame-Options` | `DENY` | Prevent iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused APIs |
| `X-DNS-Prefetch-Control` | `on` | Performance |
| `Content-Security-Policy` | (see §2.3) | Restrict resource loading |

---

## 7. API Security

### 7.1 Progress Endpoint XP Validation — ✅ RESOLVED

**Previous finding:** `POST /api/progress` accepted client-supplied `xp` integer with no validation.

**Resolution:** XP is now computed server-side from the submitted list of completed stage IDs. Client-supplied `xp` values are ignored. Leaderboard scores cannot be manipulated.

### 7.2 Rate Limiting — ✅ RESOLVED

**Previous finding:** `/api/forgot-password` and `/api/notify-registration` had no rate limiting.

**Resolution:** Redis-based rate limiting added. `forgot-password` is limited to 3 requests per IP per 15 minutes. `notify-registration` is limited to 5 per IP per hour.

### 7.3 User Credential Sync — ✅ RESOLVED

**Previous finding:** `POST /api/sync-user` allowed overwriting any user's credentials by username.

**Resolution:** `sync-user` now only stores a user record if no record for that username exists in Redis (first-write-wins). Existing credentials cannot be overwritten via this endpoint.

---

## 8. Dependency Security

| Package | Version | Notes |
|---|---|---|
| `next` | 16.2.6 | Latest stable |
| `react` | 19.x | Latest stable |
| `@upstash/redis` | Latest | Minimal surface area, REST-based |
| `tailwindcss` | 4.x | CSS only; no runtime JS risk |
| `typescript` | 5.x | Dev only |

Run `npm audit` before each release. No known critical vulnerabilities at time of writing.

---

## 9. Remediation Priority Matrix

| Finding | Severity | Status |
|---|---|---|
| Admin route protection via HMAC middleware | High | ✅ Done |
| Admin credentials moved to env vars | High | ✅ Done |
| Internal docs behind auth gate | High | ✅ Done |
| Progress XP computed server-side | High | ✅ Done |
| Credential sync first-write-wins | High | ✅ Done |
| HSTS header added | Medium | ✅ Done |
| Rate limiting on email endpoints | Medium | ✅ Done |
| CSP header added | Medium | ✅ Done |
| Password hashing upgraded to PBKDF2 | Medium | ✅ Done |
| HTTP security headers | Medium | ✅ Done |
| Client-side user credential storage | Medium | Accepted (demo); pre-scale fix |
| CTF flags in client bundle | Low | ✅ Done (server-only registry, v1.0.0) |
| Regular session cryptographic token | Low | Pre-scale fix |
| Privacy policy + data deletion endpoint | Medium | Required before scale |

---

## 10. Production Security Path

```
Current (Demo):                    Recommended (Production):
──────────────────────────         ──────────────────────────────────
localStorage user credentials  →   Server-side auth (NextAuth / Lucia)
PBKDF2 client-side hash        →   Argon2id server-side (via auth library)
sessionStorage username        →   HttpOnly JWT (server-signed, short TTL)
HMAC admin middleware ✅       →   Role-based access control (RBAC)
Upstash Redis progress ✅      →   Retain (or migrate to Postgres for joins)
CSP headers ✅                 →   Nonce-based CSP (remove unsafe-inline)
CTF flags in bundle ✅         →   (done — stage-flags.ts, server-only)
No privacy policy              →   Privacy policy + GDPR deletion endpoint
```

Estimated monthly cost at 1,000 active users: **$20–45/month** (Vercel Pro + Upstash Pay-as-you-go + auth service).
