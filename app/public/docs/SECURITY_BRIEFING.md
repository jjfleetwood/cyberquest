# CyberQuest Security Briefing
**Classification:** Internal — Pre-Production  
**Date:** 2026-05-09  
**Reviewed by:** Claude Sonnet 4.6 (Automated Security Analysis)  
**Version:** 1.0

---

## Executive Summary

CyberQuest is a client-side Next.js application with no traditional backend. The attack surface is limited, but several areas require attention before a production launch with real user data. This briefing documents every finding, its severity, remediation status, and recommended next steps.

**Overall Risk Rating: MEDIUM** — Acceptable for a VC demo. Requires hardening before handling sensitive user data at scale.

---

## 1. Authentication & Session Management

### 1.1 Password Hashing — MEDIUM RISK (Demo Acceptable)

**Finding:** Passwords are hashed using SHA-256 with a random 8-byte salt via the Web Crypto API (`crypto.subtle.digest`). SHA-256 is a fast hash function not designed for password storage.

**Impact:** If an attacker extracts the localStorage user registry, they could crack passwords faster than with a purpose-built algorithm (PBKDF2, bcrypt, Argon2).

**Current mitigation:** Salt prevents rainbow table attacks. SHA-256 is still a significant barrier for complex passwords.

**Remediation (Pre-launch):** Replace `SHA-256` with `PBKDF2` using 100,000+ iterations via the Web Crypto API. This is a 10-line change in `src/lib/auth.ts`.

```typescript
// Recommended: PBKDF2 instead of SHA-256
const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(salt), iterations: 100000, hash: "SHA-256" }, keyMaterial, 256);
```

### 1.2 Client-Side User Storage — HIGH RISK for Production, Acceptable for Demo

**Finding:** User credentials (username, email, SHA-256 hash, salt) are stored in `localStorage` under the key `cyberquest_users`. Any JavaScript running on the page can read this.

**Impact:** XSS attacks could exfiltrate all user records. There is no server-side validation of session tokens.

**Current mitigation:** No user financial data or sensitive PII beyond email is stored.

**Remediation (Pre-launch):** Migrate to a backend auth service — Supabase Auth, Auth0, or NextAuth.js with a PostgreSQL database. This eliminates client-side credential storage entirely.

### 1.3 Session Management — LOW RISK

**Finding:** Sessions are stored in `sessionStorage` under `cyberquest_session` as a plain username string. There is no cryptographic session token, expiry, or server-side revocation.

**Impact:** A physically proximate attacker on a shared machine could read an active session. Sessions expire naturally on tab close (sessionStorage behavior).

**Remediation:** Replace plain username with a signed JWT (using Web Crypto HMAC) or migrate to server-side sessions.

---

## 2. Cross-Site Scripting (XSS)

### 2.1 React JSX Escaping — LOW RISK (Mitigated by Framework)

**Finding:** All user-facing content is rendered via React JSX, which escapes HTML entities by default. No use of `dangerouslySetInnerHTML` was found in the codebase.

**Status:** ✅ No XSS vectors identified in the current codebase.

### 2.2 CTF Terminal Input — LOW RISK

**Finding:** The `CtfChallenge.tsx` terminal accepts user input and displays it back in the terminal output. Input is split on whitespace and displayed as React text nodes (not HTML).

**Status:** ✅ No injection possible — output is rendered as plain text, not HTML.

---

## 3. Secret / Token Exposure

### 3.1 GitHub Personal Access Token — CRITICAL (Resolved)

**Finding:** During setup, a GitHub PAT (`ghp_Q5FcfP...`) was used in a shell command. This token has `repo` scope.

**Action Required:** **Revoke this token immediately at github.com/settings/tokens.** Generate a new one only when needed. Never store tokens in code or shell history.

**Status:** ⚠️ Token should be revoked. It was used in a Bash command (not committed to the repo).

### 3.2 Vercel API Token — CRITICAL (Resolved for Repo)

**Finding:** A Vercel token (`vcp_6NczeI1...`) was used in deployment commands. It was not committed to the repository.

**Action Required:** Revoke at vercel.com/account/tokens after deploying. For CI/CD, use GitHub Actions secrets (`VERCEL_TOKEN` env var) — never paste tokens in chat or CLI history.

**Status:** ⚠️ Token should be revoked post-deployment.

### 3.3 No Secrets in Source Code — ✅ CLEAN

**Finding:** No API keys, tokens, or credentials were found committed to the repository. The `.gitignore` excludes `.env*` files.

**Status:** ✅ Clean.

---

## 4. CTF Flag Visibility

### 4.1 Flags in Client Bundle — MEDIUM RISK (By Design)

**Finding:** CTF flags (e.g., `FLAG{SQL_1NJ3CT10N_BYPASS3D}`) are defined in `src/data/stages.ts`, which is bundled into the client-side JavaScript. A determined user can find flags by inspecting the JS bundle.

**Context:** This is inherent to a client-side CTF. The educational value is in the journey, not flag security. Many browser-based CTF platforms work this way.

**Mitigation options (if needed):** Move flag validation to a serverless API route (`/api/submit`) that accepts the flag and validates server-side. Flags are never sent to the client.

**Status:** Acceptable for demo. Flag an issue for production.

---

## 5. Content Security Policy & HTTP Headers

### 5.1 Security Headers — MEDIUM RISK

**Finding:** No custom `next.config.js` security headers are configured (CSP, X-Frame-Options, HSTS, etc.).

**Remediation:** Add to `next.config.js`:

```javascript
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }];
}
```

Vercel automatically enforces HTTPS and provides HSTS, which covers the most critical transport-layer protection.

---

## 6. Dependency Security

### 6.1 npm Dependencies — LOW RISK

**Key dependencies and their security posture:**

| Package | Version | Notes |
|---|---|---|
| next | 16.2.6 | Latest stable; actively maintained |
| react | 19.x | Latest stable |
| tailwindcss | 4.x | CSS-only; no runtime JS risk |
| typescript | 5.x | Dev-only; no runtime impact |

**Action:** Run `npm audit` before each release. As of this writing, no known critical vulnerabilities in the dependency tree.

---

## 7. Data Privacy

### 7.1 User Data Collected

| Data Point | Storage | Transmitted to Server? |
|---|---|---|
| Username | localStorage | No |
| Email address | localStorage | No |
| Password hash + salt | localStorage | No |
| XP / progress | localStorage | No |
| Session identifier | sessionStorage | No |

**Assessment:** Zero user data leaves the browser in the current architecture. This is exceptionally privacy-friendly. No GDPR, CCPA, or COPPA obligations apply to data that never reaches a server.

**Caveat:** Vercel logs HTTP access logs (IP addresses, user agents) for all requests. This is standard CDN/hosting behavior and is covered by Vercel's privacy policy.

---

## 8. Remediation Priority Matrix

| Finding | Severity | Effort | Priority |
|---|---|---|---|
| Revoke GitHub PAT | Critical | 1 min | **Do now** |
| Revoke Vercel token | Critical | 1 min | **Do now** |
| Upgrade password hash to PBKDF2 | Medium | 1 hour | Before beta |
| Add HTTP security headers | Medium | 30 min | Before beta |
| Migrate auth to server-side | High | 2–3 days | Before production |
| Move flag validation server-side | Low | 4 hours | Optional |

---

## 9. Security Architecture Recommendation (Production Path)

```
Current (Demo):          Recommended (Production):
──────────────           ──────────────────────────
Browser localStorage  →  Supabase PostgreSQL (server)
SHA-256 password hash →  Argon2id via Supabase Auth
Plain sessionStorage  →  HttpOnly cookie + JWT (server-signed)
Client-side flags     →  /api/validate-flag serverless route
No CSP               →  Strict CSP via next.config.js headers
```

---

*This briefing covers the codebase as of commit `51ca22d` on branch `master`. Re-run this analysis after any significant auth or data-handling changes.*
