# Kryptós CronOS — Security Briefing
**Classification:** Internal  
**Version:** 4.1  
**Date:** 2026-05-28  
**Current version:** v1.16.0

---

## Changelog — v4.1 (2026-05-28) — Deferred Items Resolved

Three previously-accepted low findings closed:

| Finding | Fix |
|---|---|
| **PBKDF2 iterations below OWASP 2024** | Increased from 310,000 → 600,000 in `crypto-utils.ts`. Auto-rehash on login upgrades all existing users transparently. |
| **No account-level lockout** | Added per-username lockout in `login` route: 5 failed attempts → 15-min lock via `lockout:user:{username}` Redis key. Lock cleared on successful auth. Complements existing IP rate limit (5/15min). |
| **No admin action audit log** | New `src/lib/audit.ts` — `logAdminAction(admin, action, target)` appends JSON entries to `audit:log` Redis list (capped at 1,000 entries). Wired into: `set-tier`, `set-skin`, `set-group`, `award-stage`, `grant-admin`, `revoke-admin`, `create-vouchers`, `revoke-voucher`, `downloads-set-mode`, `downloads-grant/revoke`, `cms-stage-save/delete`. |

---

## Changelog — v4.0 (2026-05-28) — Full OWASP Top 10 Audit

Deep security review against OWASP Top 10 (2021). All confirmed findings remediated in this pass.

### Findings Resolved in v4.0

| Severity | Route | Finding | Fix |
|---|---|---|---|
| **Critical** | `POST /api/admin/downloads-access` | Only checked session cookie — any logged-in user could modify the downloads feature flag and allowlist | Added admin HMAC token verification (same pattern as `set-tier`) |
| **Critical** | `GET /api/auth/login` | Admin username bypassed IP rate limiting entirely | Removed exemption; rate limit now applies to all users including admin |
| **High** | `GET /api/survey` | Zero auth check — any unauthenticated caller could read all survey responses (usernames, open comments) | Added admin token verification |
| **High** | `GET /api/admin/downloads-access` | Only checked session cookie — any logged-in user could read allowlist config | Covered by admin guard added above |
| **Medium** | `POST /api/stripe/checkout` | `origin` header taken from request without validation — attacker could spoof Origin to redirect post-checkout to arbitrary domain | Whitelisted to `kryptoscronos.com` and `localhost:3000`; all other origins fall back to production domain |
| **Medium** | `GET /api/leaderboard` | No rate limiting on endpoint that makes 51 Redis calls per request | Added 30 req/min/IP limit |
| **Medium** | `POST /api/vouchers` (admin) | Admin route only checked session, not HMAC admin token | Fixed in v1.16.0 voucher sprint; documented here |
| **Medium** | `POST /api/redeem` | `usesLeft` check and decrement not atomic — concurrent requests could over-redeem | Fixed in v1.16.0: SADD atomic dedup + optimistic decrement with rollback |
| **Medium** | Stripe webhook | `voucherExpiry` not cleared on Stripe Pro grant — Stripe subscribers downgraded when old voucher expired | Fixed in v1.16.0: webhook clears `voucherExpiry: ""` on checkout completion |

### Findings Accepted / Low-Risk

| Severity | Area | Finding | Rationale |
|---|---|---|---|
| Low | PBKDF2 iterations | 310,000 iterations is below OWASP 2024 recommendation of 600,000 | Still industry-competitive; auto-rehash on login will upgrade existing users when we increase the constant. No action blocking. |
| Low | Cookie `sameSite: "lax"` | Session and admin cookies use `lax` not `strict` | Strict would break OAuth redirect flows. `lax` + HMAC-signed cookies + no CSRF-sensitive state-change via GET is sufficient. |
| Low | No audit log for admin actions | Admin destructive actions (set-tier, award-stage, etc.) have no server-side log | Accepted for pre-seed stage; Redis append-only audit log is the right long-term fix. |
| Low | Leaderboard N+1 Redis calls | `buildPlayers` issues one `hgetall` per player — 51 calls per leaderboard load | Upstash serverless latency is low; pipeline optimization deferred. |
| Info | `feedback` rate limit | v3.0 listed `/api/feedback` as open — it already has 5/hour/IP rate limiting | Closed — was already resolved. |

---

## Changelog — v3.0 (2026-05-28)

New `/api/survey` route: POST stores survey responses to Redis under `survey:{ts}:{username}` with a `survey:index` sorted set; GET returns all responses (admin use only — auth guard added in v4.0). `dangerouslySetInnerHTML` in `layout.tsx` verified: value is the static anti-FOUC script string, not user input; nonce applied correctly. New `/downloads` page is public static content with no data handling. New `/survey` page has no session requirement by design (unauthenticated survey responses stored as anonymous). No new env vars, no new third-party integrations. UI/content changes (i18n, images, section headers, overview font) have no security implications.

---

## Changelog — v2.9 (2026-05-28)

New Redis key namespace `diff:<username>:*` introduced for adaptive difficulty signals. All keys are namespaced with lowercase username (matching existing progress key convention) and carry 48 h TTL. Keys are written only after session verification — no unauthenticated write path. No new API routes exposed publicly. `difficulty.ts` is marked `"server-only"` — cannot be imported by client components. The `/api/hint` route now reads `getServerSession()` to associate hints with a user; unauthenticated hint calls still work but do not persist signal data. `computeStageScore` and `getRecommendedNext` are pure functions with no Redis access. No new env vars, no new third-party integrations, no new attack surface.

---

## Changelog — v2.8 (2026-05-25)

No new attack surface. v1.10.0 is a content expansion: 4 travel epochs (418 quiz stages total), run-cyberquest Playwright dev skill. No new API routes, Redis keys, env vars, or third-party integrations. The run-cyberquest skill uses `playwright` as a dev dependency only — not shipped to production. Quiz stages are static data (TypeScript files), not user-generated content.

---

## Changelog — v2.7 (2026-05-23)

No new attack surface. v1.9.0 is a positioning, pricing, and legal formation release. Changes: Brief functionality removed (reduces client-side state), admin canAccessStage bypass added (no new routes), Terms of Service page added at `/terms` (static, no data handling), business email `hello@kryptoscronos.com` wired in (Cloudflare forwarding, no server-side change), Crafts/Baseball/Driving hidden from public nav (no data access change), pricing updated ($13.99/mo, $99/yr). No new API routes, Redis keys, env vars, or third-party integrations.

---

## Changelog — v2.5 (2026-05-23)

Login rate limit tightened to 5 attempts/15 min. Nonce-based CSP documented — `script-src` uses per-request nonces with no `unsafe-inline`. ESLint clean (0 errors). GitHub CI secrets set; CI fully green on master.

---

## Changelog — v2.4 (2026-05-20)

Closes CTF flag visibility finding. `stages-meta.ts` introduced as client-safe listing metadata module (no `ctf`, `quiz`, or `info`); both listing pages (`/stages` and `/stages/epoch/[epochId]`) now import from it instead of the full `stages.ts`. Section 5 updated to document final architecture. Section 9 corrected to reflect v1.3.0 auth migration (no credentials in localStorage). No new API routes, Redis keys, or env vars.

---

## Executive Summary

Kryptós CronOS is a Next.js 16 application with serverless API routes, Redis-backed persistence, and Supabase Auth integration. The overall risk rating is **LOW**. A full OWASP Top 10 audit was completed in v4.0; all critical and high findings have been remediated. The remaining items are accepted low-risk trade-offs documented below.

---

## OWASP Top 10 (2021) — Status Matrix

| # | Category | Status | Notes |
|---|---|---|---|
| A01 | Broken Access Control | ✅ Resolved | All admin routes now require HMAC `admin_token` cookie. Session-only routes verified to not perform privileged actions. |
| A02 | Cryptographic Failures | ✅ Resolved | PBKDF2-SHA256 310k iterations; HMAC-signed session + admin cookies; HttpOnly/Secure/SameSite; no plaintext secrets. |
| A03 | Injection | ✅ No issues | All Redis keys use fixed prefixes + lowercase user input. No eval/exec/dangerouslySetInnerHTML. |
| A04 | Insecure Design | ✅ Resolved | Voucher race condition fixed; Stripe origin header whitelisted; rate limits on all write endpoints. |
| A05 | Security Misconfiguration | ✅ Resolved | Leaderboard rate-limited; nonce-based CSP; HSTS + security headers; Stripe success/cancel URLs whitelisted. |
| A06 | Vulnerable Components | ✅ Current | next 16.2.6, react 19.2.4, stripe 22.1.1, @anthropic-ai/sdk 0.98.0, @supabase/supabase-js 2.106.2. `npm audit` clean. |
| A07 | Auth Failures | ✅ Resolved | Rate limit now covers admin user; HMAC-signed sessions; timing-safe password comparison; constant-time dummy hash on unknown usernames. |
| A08 | Software & Data Integrity | ✅ Resolved | Stripe webhook uses `stripe.webhooks.constructEvent()` signature verification. Server-only flag store. |
| A09 | Logging & Monitoring | ✅ Resolved | Admin actions logged to `audit:log` Redis list. Account lockout tracks repeated auth failures per username. |
| A10 | SSRF | ✅ No issues | All `fetch()` targets are hardcoded service URLs (Resend, Anthropic, Stripe). No user-supplied URLs. |

---

## 1. Authentication & Session Management

### 1.1 Password Hashing — ✅ RESOLVED (v0.2.0)

**Status:** PBKDF2-SHA-256 with 310,000 iterations and a 16-byte random salt via Web Crypto API. Transparent re-hash on login upgrades existing users to the current iteration count.

```typescript
const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(salt), iterations: 310_000, hash: "SHA-256" }, keyMaterial, 256);
```

### 1.2 Admin Authentication — ✅ RESOLVED (v0.4.1)

**Status:** Admin cookie (`admin_token`) is HMAC-signed (`ADMIN_SECRET`), HttpOnly, Secure, SameSite=Lax. All `/admin/**` routes blocked at `proxy.ts` before reaching route handlers. All `/api/admin/*` routes independently verify `admin_token` via `verifyAdminToken()`. No session-only path to admin actions.

### 1.3 Client-Side Credential Storage — ✅ RESOLVED (v1.3.0)

**Status:** No credentials in localStorage or sessionStorage. `auth.ts` stores only the username string in sessionStorage as a write-through UI cache. The authoritative session is the HMAC-signed HttpOnly `session_token` cookie verified server-side on every API call.

### 1.4 Session Tokens — ✅ RESOLVED (v1.3.0)

**Status:** HMAC-signed tokens in format `u:{username}:{hmac-sha256}`, verified via `getServerSession()` on every protected route. HttpOnly, Secure, SameSite=Lax, 30-day maxAge.

### 1.5 Login Rate Limiting — ✅ RESOLVED (v4.0)

**Status:** 5 attempts/15 min/IP, applied universally including the admin account. Previously admin was exempt — fixed in v4.0.

---

## 2. API Security

### 2.1 Rate Limiting — ✅ RESOLVED

| Endpoint | Limit | Key |
|---|---|---|
| `POST /api/auth/login` | 5/IP/15min | `rate:login:<ip>` |
| `POST /api/forgot-password` | 3/IP/15min | `rl:forgot:<ip>` |
| `POST /api/notify-registration` | 5/IP/hour | `rl:notify:<ip>` |
| `POST /api/feedback` | 5/IP/hour | `rate:feedback:<ip>` |
| `POST /api/nda` | 5/IP/hour | `rate:nda:<ip>` |
| `POST /api/hint` | 15/IP/15min | `rl:hint:<ip>` |
| `GET /api/leaderboard` | 30/IP/min | `rate:lb:<ip>` — added v4.0 |

### 2.2 Server-Side XP Computation — ✅ RESOLVED (v0.6.0)

**Status:** XP computed server-side in `/api/progress` from a hardcoded `STAGE_XP` map. Client-submitted XP ignored.

### 2.3 Password Reset — ✅ RESOLVED (v0.5.0)

**Status:** Reset tokens are random, stored in Redis with 1-hour TTL, deleted on use. Response returns only username, never email.

### 2.4 Voucher System — ✅ RESOLVED (v1.16.0)

**Status:** 
- Per-user deduplication uses Redis `SADD` (atomic) — no race condition possible on duplicate redemption.
- `usesLeft` decrement is optimistic with rollback: `HINCRBY -1` then check if negative; roll back both SADD and HINCRBY if over-redeemed.
- All admin voucher endpoints require HMAC `admin_token`.
- Stripe webhook clears `voucherExpiry` on checkout completion to prevent Stripe Pro users being downgraded by stale voucher timestamp.

---

## 3. HTTP Security Headers — ✅ RESOLVED

All headers applied via `next.config.ts`:

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ |
| `X-Frame-Options` | `DENY` | ✅ |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), getelocation=()` | ✅ |
| `Content-Security-Policy` | Nonce-based, per-request (see below) | ✅ |

**CSP** (set dynamically in `src/proxy.ts`):
```
default-src 'self';
script-src 'self' 'nonce-{per-request-nonce}';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self' https://api.resend.com;
frame-ancestors 'none'
```

`style-src` retains `unsafe-inline` — required for Tailwind/React inline styles. Script injection via inline JS eliminated by nonce requirement.

---

## 4. Internal Documents — ✅ RESOLVED (v0.6.0)

All internal documents in `app/secured-docs/`. Served only via `/api/docs/[file]` which requires a valid admin HMAC cookie. `outputFileTracingIncludes` in `next.config.ts` ensures Vercel bundles the folder without exposing it as static assets.

---

## 5. CTF Flag Visibility — ✅ RESOLVED (v1.7.1)

- `src/data/stage-flags.ts` — `import "server-only"` — never sent to any client.
- `/api/check-flag` — validates server-side; returns only `{ correct: true/false }`.
- `stages-meta.ts` — client-safe listing metadata with no `ctf`, `quiz`, or `info` fields.
- Client-side CTF commands that reveal flags are an accepted mechanic — the canonical flag store is server-only, and all submission validation is server-side.

---

## 6. XSS — ✅ NO ISSUES

- All user content rendered via React JSX (HTML-escaped by default).
- No `dangerouslySetInnerHTML` in user-facing paths. `layout.tsx` usage is a static string literal with nonce applied.
- CTF terminal input displayed as plain text React nodes.

---

## 7. Dependency Security

| Package | Version |
|---|---|
| next | 16.2.6 |
| react | 19.2.4 |
| @upstash/redis | 1.38.0 |
| stripe | 22.1.1 |
| @anthropic-ai/sdk | 0.98.0 |
| @supabase/supabase-js | 2.106.2 |

`npm audit` runs in CI on every push to `dev` and `master`.

---

## 8. Secrets in Source Code — ✅ CLEAN

No API keys, tokens, or credentials committed. `.gitignore` excludes `.env*`. All secrets in Vercel environment variables.

---

## 9. Data Privacy

| Data | Storage | Notes |
|---|---|---|
| Username | sessionStorage (UI cache) + Redis | |
| Email | Redis only | |
| Password hash + salt | Redis only | Never in localStorage |
| XP / progress | Redis | Server-computed only |
| Session token | HttpOnly cookie | Not accessible via JS |
| Survey responses | Redis (`survey:{ts}:{username}`) | Admin-only GET endpoint, auth-gated as of v4.0 |
| NDA records | Redis (`nda:{email}`) | Admin-only GET, HMAC-verified |

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
| CTF flags in client bundle | Low | ✅ Resolved v1.7.1 — `stage-flags.ts` server-only |
| downloads-access POST open to all users | Critical | ✅ Resolved v4.0 |
| Admin login rate-limit bypass | Critical | ✅ Resolved v4.0 |
| survey GET unauthenticated | High | ✅ Resolved v4.0 |
| Stripe checkout origin header not whitelisted | Medium | ✅ Resolved v4.0 |
| Leaderboard no rate limit | Medium | ✅ Resolved v4.0 |
| Voucher admin routes session-only | Medium | ✅ Resolved v1.16.0 |
| Voucher redemption race condition | Medium | ✅ Resolved v1.16.0 |
| Stripe Pro downgraded by stale voucherExpiry | Medium | ✅ Resolved v1.16.0 |
| `/api/feedback` missing rate limit | Low | ✅ Confirmed already resolved — was incorrect in v3.0 |
| No audit log for admin actions | Low | ✅ Resolved v4.1 — `audit:log` Redis list, wired to 11 admin action types |
| PBKDF2 iterations below OWASP 2024 (600k) | Low | ✅ Resolved v4.1 — increased to 600k; auto-rehash upgrades existing users |
| No account-level lockout | Low | ✅ Resolved v4.1 — 5 failed attempts → 15-min lock per username |

---

## 11. Production Readiness Gaps

| Item | Status |
|---|---|
| Server-side flag validation | ✅ `stage-flags.ts` uses `server-only` |
| Signed JWT sessions | ✅ HMAC-signed `session_token` cookie |
| CI pipeline (lint, tsc, audit) | ✅ `.github/workflows/ci.yml` |
| Redis backup / point-in-time recovery | ✅ Enabled in Upstash console |
| Admin action audit log | ✅ `audit:log` Redis list, capped at 1,000 entries |
| Account-level lockout | ✅ 5 failed attempts → 15-min lockout per username |
