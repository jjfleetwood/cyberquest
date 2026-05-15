# Kryptós CronOS — Operations Runbook
**Version:** 2.0  
**Date:** 2026-05-11

---

## Service Inventory

| Service | Role | URL | Cost |
|---|---|---|---|
| **Vercel** | Hosting, CDN, serverless runtime | vercel.com/dashboard | Free (Hobby) |
| **Upstash** | Redis — leaderboard, progress, rate limits, pwd reset | console.upstash.com | Free tier |
| **Resend** | Transactional email | resend.com/dashboard | Free tier |
| **GitHub** | Source control, CI trigger | github.com/jjfleetwood/kryptos-cronos | Free |

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
| `ADMIN_SECRET` | 32+ char random string — used for HMAC admin cookie signing |

**Rotation:** If you rotate any of these, redeploy immediately (Vercel redeploy button) — the old values stay live until the next deploy.

---

## Deployment

### Normal deploy

```bash
git push origin master
```

Vercel auto-deploys in ~90 seconds. No action required.

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
| Function errors | Vercel → Functions → Logs | Error rate > 1% |
| Redis exhaustion | Upstash console → Usage | > 80% of free tier commands/day |
| Email bounces | Resend dashboard → Logs | Any hard bounces |
| Rate limit spikes | Upstash Redis keys `rl:forgot:*` and `rl:notify:*` | Sustained hits from single IP |

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
| `leaderboard` | Sorted Set | None | Global XP rankings |
| `progress:<username>` | Hash | None | Server-side progress per user |
| `user:<username>` | Hash | None | User record (first-write-wins) |
| `rl:forgot:<ip>` | String (counter) | 15 minutes | Forgot-password rate limit |
| `rl:notify:<ip>` | String (counter) | 1 hour | Registration email rate limit |
| `reset:<token>` | String | 1 hour | Password reset token |

### Useful Redis commands (Upstash console → CLI tab)

```bash
# View leaderboard
ZREVRANGE leaderboard 0 9 WITHSCORES

# View a user's progress
HGETALL progress:ajax

# View a user's stored record
HGETALL user:ajax

# Delete a stale rate limit key manually
DEL rl:forgot:192.168.1.1

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
2. Check Vercel Function Logs for errors
3. Check Upstash console — is the Redis instance up?
4. If a bad deploy: rollback immediately (see Deployment → Rollback)

### Data loss (user progress wiped)

1. Redis is the source of truth for server-side progress
2. Client localStorage is the fallback — users retain progress on the same device
3. No backup system currently in place — Redis free tier does not include snapshots
4. **Action:** Upgrade to Upstash Pro for point-in-time recovery before production scale

### Admin locked out

1. Check `ADMIN_USERNAME` and `ADMIN_SECRET` env vars in Vercel
2. If rotated: update env vars, redeploy, then re-issue cookie via `/api/admin-session`
3. If env vars are correct but login fails: check `/api/admin-session` logs in Vercel

### Rate limit false positive

1. Identify the IP hitting the limit (`rl:forgot:<ip>` or `rl:notify:<ip>`)
2. Delete the Redis key manually via Upstash console CLI
3. Rate limits: forgot-password = 3/IP/15min, notify-registration = 5/IP/hour

---

## Cost Management

### Current (Free Tier Limits)

| Service | Limit | Current Usage |
|---|---|---|
| Vercel Bandwidth | 100 GB/month | Minimal |
| Vercel Build Minutes | 6,000/month | ~2/deploy |
| Upstash Commands | 10,000/day | Low |
| Resend Emails | 3,000/month | Low |

### Upgrade Triggers

| Condition | Action |
|---|---|
| > 1 team member needs Vercel deploy access | Upgrade to Vercel Pro ($20/month) |
| > 10,000 Redis commands/day | Upgrade to Upstash Pay-as-you-go |
| > 3,000 emails/month | Upgrade to Resend Pro ($20/month) |
| Enterprise sales conversations begin | Upgrade all to paid tiers for SLA |

---

## Secrets Hygiene

- **Never commit** `.env.local` or any file containing tokens
- **GitHub PATs and Vercel tokens** used in one-off CLI commands should be **revoked immediately after use**
- **Rotate `ADMIN_SECRET`** if you suspect it was exposed — redeploy after rotation
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
