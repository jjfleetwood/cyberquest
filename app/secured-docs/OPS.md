# Kryptós CronOS — Operations Runbook
**Version:** 3.0  
**Date:** 2026-05-18

---

## Service Inventory

| Service | Role | URL | Cost |
|---|---|---|---|
| **Vercel** | Hosting, CDN, serverless runtime | vercel.com/dashboard | Free (Hobby) |
| **Upstash** | Redis — users, progress, leaderboard, streaks, NDA records, rate limits, pwd reset | console.upstash.com | Pay-as-you-go (daily backups enabled) |
| **Resend** | Transactional email | resend.com/dashboard | Free tier |
| **GitHub** | Source control, CI trigger | github.com/jjfleetwood/kryptos-cronos | Free |
| **Anthropic** | Claude Haiku — ARIA AI hint chatbot | console.anthropic.com | API key required |
| **DocuSign** | eSignature API — NDA envelope sending and tracking | admindemo.docusign.com | Free developer tier |

---

## Environment Variables

### Setting in Vercel

1. Go to vercel.com → Project → **Settings** → **Environment Variables**
2. Add each variable for **Production**, **Preview**, and **Development** as needed

| Variable | Notes |
|---|---|
| `UPSTASH_REDIS_REST_URL` | From Upstash console → REST API tab |
| `UPSTASH_REDIS_REST_TOKEN` | From Upstash console → REST API tab |
| `RESEND_API_KEY` | From Resend dashboard → API Keys |
| `ADMIN_EMAIL` | Email that receives new-user registration alerts |
| `ADMIN_USERNAME` | Admin dashboard username |
| `ADMIN_SECRET` | 32+ char random string — used for HMAC signing of both session_token and kryptos_admin cookies |
| `ANTHROPIC_API_KEY` | From console.anthropic.com → API Keys — powers ARIA chatbot |
| `DOCUSIGN_INTEGRATION_KEY` | DocuSign app integration key (UUID) |
| `DOCUSIGN_USER_ID` | DocuSign API username (UUID) |
| `DOCUSIGN_ACCOUNT_ID` | DocuSign account ID |
| `DOCUSIGN_PRIVATE_KEY` | RSA private key for DocuSign JWT auth |
| `DOCUSIGN_BASE_URL` | `https://demo.docusign.net` (sandbox) or `https://na4.docusign.net` (production) |
| `DOCUSIGN_WEBHOOK_SECRET` | Optional — HMAC secret for DocuSign webhook signature verification |

**Rotation:** If you rotate any of these, redeploy immediately (Vercel redeploy button) — the old values stay live until the next deploy.

**Note on `ADMIN_SECRET` rotation:** Rotating this key invalidates all active session_token and kryptos_admin cookies. All users will be logged out and must re-authenticate.

---

## Deployment

### Normal deploy

```bash
git push origin master
```

GitHub Actions CI runs first (lint + tsc + build + audit). Vercel auto-deploys in ~90 seconds. No action required.

### Manual redeploy (e.g., after env var change)

1. Go to vercel.com → Project → **Deployments**
2. Find the most recent deployment
3. Click **...** → **Redeploy**

### Rollback

1. Go to vercel.com → Project → **Deployments**
2. Find the last known-good deployment
3. Click **...** → **Promote to Production**

---

## Monitoring

### What to watch

| Signal | Where to check | Threshold |
|---|---|---|
| Build failures | Vercel Deployments tab — red status | Any failure = investigate |
| CI failures | GitHub Actions tab | Any failure before merge |
| Function errors | Vercel → Functions → Logs | Error rate > 1% |
| Redis exhaustion | Upstash console → Usage | > 80% of plan limit |
| Email bounces | Resend dashboard → Logs | Any hard bounces |
| Anthropic API errors | Vercel → `/api/hint` function logs | Repeated 429 or 5xx from Anthropic |
| DocuSign webhook failures | Vercel → `/api/webhooks/docusign` function logs | Any HMAC verification failures or 5xx |
| Rate limit spikes | Upstash Redis keys `rate:forgot:*`, `rate:nda:*`, `rate:reg:*` | Sustained hits from single IP |

### Vercel function logs

```
vercel.com → Project → Functions → select route → view logs
```

Or use the Vercel CLI:
```bash
vercel logs --follow
```

---

## Redis Key Reference

| Key | Type | TTL | Purpose |
|---|---|---|---|
| `user:{username}` | Hash | None | User record: email, passwordHash, salt, createdAt |
| `progress:{username}` | Hash | None | Server-side progress per user: stageIds, xp, badges, updatedAt |
| `leaderboard` | Sorted Set | None | Global all-time XP rankings |
| `lb:d:YYYY-MM-DD` | Sorted Set | 48h | Daily leaderboard |
| `lb:w:YYYY-MM-DD` | Sorted Set | 14d | Weekly leaderboard (Monday date key) |
| `streak:{username}` | Hash | None | current, longest, lastDate |
| `nda:{email}` | Hash | None | name, email, acceptedAt/sentAt/signedAt, ip, method, status, envelopeId |
| `reset:{token}` | String | 1h | Password reset token |
| `rate:nda:{ip}` | String (counter) | 15m | NDA clickwrap rate limit |
| `rate:forgot:{ip}` | String (counter) | 15m | Forgot-password rate limit |
| `rate:reg:{ip}` | String (counter) | 1h | Registration notification rate limit |

### Useful Redis commands (Upstash console → CLI tab)

```bash
# View all-time leaderboard (top 10)
ZREVRANGE leaderboard 0 9 WITHSCORES

# View a user's progress
HGETALL progress:ajax

# View a user's stored record
HGETALL user:ajax

# View a user's streak
HGETALL streak:ajax

# View an NDA record
HGETALL nda:user@example.com

# Delete a stale rate limit key manually
DEL rate:forgot:192.168.1.1

# Count all users
ZCARD leaderboard
```

---

## Admin Dashboard

**URL:** kryptoscronos.com/admin  
**Access:** Requires `kryptos_admin` HttpOnly cookie (granted by `/api/admin-session`)

### Granting admin access

POST to `/api/admin-session` with credentials:

```bash
curl -X POST https://kryptoscronos.com/api/admin-session \
  -H "Content-Type: application/json" \
  -d '{"username":"<ADMIN_USERNAME>","password":"<ADMIN_SECRET>"}'
```

Or use the admin login form at `/admin`.

### Admin capabilities

- View all registered users and their XP
- View NDA signatories with DocuSign envelope status (pending / signed / declined / voided)
- Send DocuSign NDA envelope to a recipient directly from the dashboard
- View stage completion analytics
- Access secured internal documents (business proposals, security briefing, release notes, architecture)
- Revoke admin session

---

## Secured Documents

Documents in `app/secured-docs/` are served via `/api/docs/[file]` which requires a valid admin cookie. They are **never served from `public/`**.

To add a new secured document:
1. Place the `.md` file in `app/secured-docs/`
2. The `outputFileTracingIncludes` config in `next.config.ts` ensures Vercel bundles the folder
3. It will appear in the admin docs viewer automatically

---

## Incident Response

### Site down / 5xx errors

1. Check Vercel Deployments — is the latest deploy green?
2. Check GitHub Actions — did CI pass?
3. Check Vercel Function Logs for errors
4. Check Upstash console — is the Redis instance up?
5. If a bad deploy: rollback immediately (see Deployment → Rollback)

### Auth failures (users cannot log in)

1. Confirm `ADMIN_SECRET` is set correctly in Vercel — this signs all session cookies
2. Confirm `UPSTASH_REDIS_*` vars are correct — user records are in Redis
3. Check `/api/auth/login` function logs for specific errors
4. Auth is fully server-side — no localStorage fallback; a misconfigured Redis means no logins

### Data loss (user progress wiped)

1. Redis is the sole source of truth for all user data and progress
2. No localStorage fallback exists in v1.3.0+
3. Daily backups are enabled — restore via Upstash console → Backups tab → select snapshot → Restore
4. If within backup window: restore the most recent snapshot before the data loss event

### ARIA chatbot down

1. Check `ANTHROPIC_API_KEY` is set in Vercel env vars
2. Check `/api/hint` function logs for Anthropic API errors (429 = rate limited, 5xx = API outage)
3. ARIA failing silently is acceptable — the rest of the platform continues working

### DocuSign webhook failures

1. Check `/api/webhooks/docusign` function logs
2. If HMAC verification failing: confirm `DOCUSIGN_WEBHOOK_SECRET` matches what is configured in DocuSign Connect
3. If envelopes sent but status not updating: trigger a manual webhook resend from DocuSign admin console
4. NDA clickwrap acceptance is independent of DocuSign — users are logged in Redis on clickwrap regardless

### Admin locked out

1. Check `ADMIN_USERNAME` and `ADMIN_SECRET` env vars in Vercel
2. If rotated: update env vars, redeploy, then re-issue cookie via `/api/admin-session`
3. If env vars are correct but login fails: check `/api/admin-session` logs in Vercel

### Rate limit false positive

1. Identify the IP hitting the limit in Upstash console
2. Delete the Redis key manually: `DEL rate:forgot:<ip>` or `DEL rate:nda:<ip>`
3. Rate limits: forgot-password = 3/IP/15min, NDA = per-IP/15min, registration notify = 5/IP/hour

---

## Cost Management

### Current (Free Tier Limits)

| Service | Limit | Current Usage |
|---|---|---|
| Vercel Bandwidth | 100 GB/month | Minimal |
| Vercel Build Minutes | 6,000/month | ~2/deploy |
| Upstash Commands | Pay-as-you-go (daily backups enabled) | Low |
| Resend Emails | 3,000/month | Low |
| Anthropic (Claude Haiku) | Pay-per-token | Low (15 req/IP/15min rate limit) |
| DocuSign | 1,000 envelopes/month (developer tier) | Low |

### Upgrade Triggers

| Condition | Action |
|---|---|
| > 1 team member needs Vercel deploy access | Upgrade to Vercel Pro ($20/month) |
| Redis costs rising unexpectedly | Review command volume in Upstash console |
| > 3,000 emails/month | Upgrade to Resend Pro ($20/month) |
| Anthropic costs exceed budget | Review ARIA rate limits; consider caching common hints |
| > 1,000 DocuSign envelopes/month | Move to DocuSign paid plan |
| Enterprise sales conversations begin | Upgrade all to paid tiers for SLA |

---

## Secrets Hygiene

- **Never commit** `.env.local` or any file containing tokens
- **GitHub PATs and Vercel tokens** used in one-off CLI commands should be **revoked immediately after use**
- **Rotate `ADMIN_SECRET`** if you suspect it was exposed — redeploy after rotation (this logs out all users)
- **Rotate `ANTHROPIC_API_KEY`** if exposed — update in Vercel, redeploy
- **Rotate DocuSign keys** via DocuSign admin console if exposed
- All secrets are stored in Vercel environment variables, not in the repository

---

## Vercel Project Settings Reference

| Setting | Value |
|---|---|
| Framework | Next.js (auto-detected) |
| Root directory | `app/` |
| Node version | 24.x |
| Build command | `next build` |
| Output directory | `.next` |
| Region | `iad1` (US East, Washington DC) |
| Plan | Hobby (free) |
| Custom domain | kryptoscronos.com |
