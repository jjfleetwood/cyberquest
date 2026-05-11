# Kryptós CronOS Security Briefing
**Classification:** Internal — Pre-Production  
**Date:** 2026-05-10  
**Version:** 2.0  
**Reviewed by:** Internal Security Analysis

---

## Executive Summary

Kryptós CronOS has a hybrid architecture: client-side auth (localStorage/sessionStorage), server-side progress persistence (Upstash Redis), admin route protection via HMAC-signed HttpOnly cookies, and transactional email via Resend. The attack surface has been meaningfully reduced since v1.0 of this document. Several items remain acceptable for demo-stage use but require hardening before a scaled production launch.

**Overall Risk Rating: LOW-MEDIUM** — Suitable for public demo and early users. The most significant remaining risk is client-side credential storage (inherent to the localStorage auth model).

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

**Previous finding:** Admin access was determined by comparing the session username to a hardcoded string (`"jjb"`) in client code. This was trivially bypassable.

**Resolution:** Admin sessions are now fully server-side:

1. On login/register, the client POSTs `{ username }` to `/api/admin-session`
2. The server compares username to `ADMIN_USERNAME` env var using constant-time comparison
3. If matched, the server issues a signed cookie: `admin_token = "username:HMAC-SHA256(ADMIN_SECRET, username)"`
4. `src/proxy.ts` verifies this HMAC on every request to `/admin/**` before serving the page

```typescript
// Constant-time HMAC verification in proxy.ts
const expected = createHmac("sha256", secret).update(username).digest("hex");
return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
```

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

**Status:** ✅ Clean. `.gitignore` excludes all `.env*` files.

### 3.2 Git Remote URL — ⚠️ ACTION REQUIRED

**Finding:** The git remote URL embeds a GitHub PAT in plaintext: `https://jjfleetwood:ghp_...@github.com/...`

**Impact:** Anyone with access to the local `.git/config` file or shell history can extract this token.

**Action:** Revoke the embedded PAT at github.com/settings/tokens and update the remote to use SSH or a new token stored in the OS credential manager.

```bash
git remote set-url origin git@github.com:jjfleetwood/kryptos-cronos.git
```

---

## 4. CTF Flag Visibility

### 4.1 Flags in Client Bundle — MEDIUM RISK (By Design)

CTF flags (e.g., `FLAG{SQL_1NJ3CT10N_BYPASS3D}`) are defined in `src/data/stages.ts`, which is bundled client-side. A determined user can find flags by inspecting the JS bundle in DevTools.

**Context:** This is inherent to browser-based CTF platforms. The educational value is in the journey (reading the briefing, executing the exploit sequence) rather than flag secrecy. Most similar platforms operate the same way.

**Production option:** Move flag validation to `/api/validate-flag` — server checks the submitted string, flag never reaches the client. Moderate effort (~4 hours).

**Status:** Accepted for demo. Flag for production backlog.

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
| `X-Frame-Options` | `DENY` | Prevent iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused APIs |
| `X-DNS-Prefetch-Control` | `on` | Performance |
| `Content-Security-Policy` | (see §2.3) | Restrict resource loading |

Vercel enforces HTTPS and HSTS automatically on all production domains.

---

## 7. Dependency Security

| Package | Version | Notes |
|---|---|---|
| `next` | 16.2.6 | Latest stable |
| `react` | 19.x | Latest stable |
| `@upstash/redis` | Latest | Minimal surface area, REST-based |
| `tailwindcss` | 4.x | CSS only; no runtime JS risk |
| `typescript` | 5.x | Dev only |

Run `npm audit` before each release. No known critical vulnerabilities at time of writing.

---

## 8. Remediation Priority Matrix

| Finding | Severity | Status |
|---|---|---|
| Revoke embedded GitHub PAT in git remote | High | ⚠️ Action required |
| Admin route protection via HMAC proxy | High | ✅ Done |
| Admin credentials moved to env vars | High | ✅ Done |
| CSP header added | Medium | ✅ Done |
| Password hashing upgraded to PBKDF2 | Medium | ✅ Done |
| HTTP security headers | Medium | ✅ Done |
| Client-side user credential storage | Medium | Accepted (demo); pre-scale fix |
| CTF flags in client bundle | Low | Accepted (by design) |
| Regular session cryptographic token | Low | Pre-scale fix |
| Privacy policy + data deletion endpoint | Medium | Required before scale |

---

## 9. Production Security Path

```
Current (Demo):                    Recommended (Production):
──────────────────────────         ──────────────────────────────────
localStorage user credentials  →   Server-side auth (NextAuth / Lucia)
PBKDF2 client-side hash        →   Argon2id server-side (via auth library)
sessionStorage username        →   HttpOnly JWT (server-signed, short TTL)
HMAC admin cookie ✅           →   Role-based access control (RBAC)
Upstash Redis progress ✅      →   Retain (or migrate to Postgres for joins)
CSP headers ✅                 →   Nonce-based CSP (remove unsafe-inline)
CTF flags in bundle            →   Server-side flag validation (/api/validate-flag)
No privacy policy              →   Privacy policy + GDPR deletion endpoint
```

Estimated monthly cost at 1,000 active users: **$20–45/month** (Vercel Pro + Upstash Pay-as-you-go + auth service).
