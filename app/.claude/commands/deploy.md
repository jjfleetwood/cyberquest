# /deploy — Kryptós CronOS deploy skill

Run this skill whenever the user says "deploy", "/deploy", or asks to ship to production.

## Docs architecture

`docs/` is the single source of truth for all shared documentation.  
`app/secured-docs/` = `docs/` mirror + `LAUNCH_LEGAL.md` (admin-only, lives only in secured-docs).  
Never edit a file directly in `app/secured-docs/` if it has a counterpart in `docs/` — edit `docs/` and let the sync step propagate it.

**Adding a new doc file:** when a new `.md` file is added to `docs/`, two code changes are also required:
1. Add the filename to `ALLOWED_FILES` in `app/src/app/api/docs/[file]/route.ts`
2. Add a tab entry to the `DOCS` array in `app/src/components/DocsViewer.tsx`

## What this skill does (in order)

1. **Pre-deploy gates** — run all three from `C:\Users\Ajax\Projects\cyberquest\app`. Stop on any failure — do not deploy broken or vulnerable code.

   a. **TypeScript** — `npx tsc --noEmit`. Report all type errors and fix before continuing.

   b. **Lint** — `npx eslint src/`. Must be 0 errors. Warnings are acceptable but note any new ones.

   c. **Dependency audit** — `npm audit --audit-level=high`. Any HIGH or CRITICAL CVE stops the deploy. MODERATE CVEs are noted in the security summary but do not block. Run `npm audit --json` and parse: print package name, severity, CVE ID, and fix command for every finding at moderate or above.

2. **Deploy to Vercel** — run `npx vercel --prod` from the app directory. Wait for the deployment to complete. Report the production URL.

3. **Bump version and update docs** — determine the next semantic version:
   - Patch (x.x.N): bug fixes only
   - Minor (x.N.0): new features or content
   - Major (N.0.0): breaking changes or major milestones
   
   Update these files **in `docs/`** (not secured-docs — sync will propagate):
   
   **`docs/RELEASE_NOTES.md`** — prepend a new version block at the top (after the `# Kryptós CronOS — Release Notes` heading) using this format:
   ```
   ## vX.Y.Z — YYYY-MM-DD

   **Short summary line**

   - Bullet for each meaningful change
   ```
   
   **`docs/SECURITY_BRIEFING.md`** — increment the version number (e.g. `2.4` → `2.5`), update the date, and prepend a new changelog entry under `## Changelog — vX.Y (YYYY-MM-DD)` describing any security-relevant changes (or "No new attack surface — changes are UI/UX only" if none).
   
   **`CLAUDE.md`** (at `C:\Users\Ajax\Projects\cyberquest\CLAUDE.md`) — update `**Current version:**` and the `## What's Shipped` section to reflect the current state of the codebase.

4. **Update all relevant documentation** — review what changed in this release and update every doc file in `docs/` that is affected. At minimum check:
   - `docs/README.md` — stage count, epoch list, version
   - `docs/ARCHITECTURE.md` — any new API routes, data structures, or system components
   - `docs/CURRICULUM.md` — any new epochs or stages
   - `docs/BUILD.md` — any new env vars, dependencies, or build steps
   - `docs/OPS.md` — any new services, integrations, or runbook changes
   - `docs/PARTNERS.md` — any new third-party services

   **Pitch & proposal docs — stamp every deploy:** These files must be updated on every deploy, even if content is unchanged:
   - `docs/BUSINESS_PROPOSAL_CASUAL.md` — update `**Last updated:**` line to today's date and new version (e.g. `**Last updated: 2026-05-23 (v1.8.2)**`)
   - `docs/BUSINESS_PROPOSAL_PRO.md` — update the curriculum section header version (`### Curriculum — 358 Stages ... (vX.Y.Z)`), the Live Features header (`### Live Features (Shipped — vX.Y.Z)`), and the Traction deployment line (`**Deployment:** Live at kryptoscronos.com (version vX.Y.Z)`)
   - `docs/PITCH_TARGETS.md` — update the version ref in the summary blurb under `## The ask`
   - `docs/PITCH_CAE_CONTINUOUS_MONITORING.md` — update the date in the header (`**May 2026 — Confidential**`) to the current month/year if it changed

   **SECURITY_BRIEFING.md header rule:** The `**Date:**` and `**Version:**` fields in the header must always match the most recent `## Changelog — vX.Y (YYYY-MM-DD)` entry. After adding a changelog entry in step 3, immediately update the header fields to match.

   Only touch content fields (not just stamps) in files that are actually affected by this release.

5. **Sync docs → secured-docs** — copy every file from `docs/` into `app/secured-docs/`, preserving `app/secured-docs/LAUNCH_LEGAL.md` (which has no docs/ counterpart and must not be deleted). Run from `C:\Users\Ajax\Projects\cyberquest`:

   ```bash
   cp docs/*.md app/secured-docs/
   ```

   This is the authoritative sync step. After this, `app/secured-docs/` will be identical to `docs/` plus `LAUNCH_LEGAL.md`.

6. **Commit ALL changes** — from `C:\Users\Ajax\Projects\cyberquest`, stage ALL modified and untracked files under `app/src/`, `app/.claude/`, `app/secured-docs/`, `docs/`, and `CLAUDE.md`. Do NOT stage `devops/` files. Commit with message: `vX.Y.Z: <short summary of what shipped>`

7. **Push to GitHub** — run `git push origin master` from `C:\Users\Ajax\Projects\cyberquest`. This triggers auto-deploy on kryptoscronos.com via the `kryptos-cronos` Vercel project.

8. **Security audit** — run each pass in order. Any BLOCKER finding must be fixed before the release is considered complete (fix → re-deploy if already pushed). Note all findings in the Security Summary output below.

   **Pass A — Dangerous code patterns** (grep `app/src/` for each):
   - `eval(` — arbitrary code execution; flag every occurrence
   - `dangerouslySetInnerHTML` — XSS; verify the value is a static string or sanitized, never user input
   - `innerHTML\s*=` — XSS vector outside React
   - `document\.write(` — XSS vector
   - `NEXT_PUBLIC_` — verify no secret keys (Stripe secret, Redis token, ADMIN_SECRET, SESSION_SECRET) are accidentally exposed as public env vars
   - Hardcoded secret patterns: `sk_live_`, `sk_test_`, `AKIA[A-Z0-9]{16}`, any variable named `password|secret|token|apiKey` assigned a non-empty string literal

   **Pass B — API route audit** (check every file under `app/src/app/api/`):
   - **Auth enforcement:** every route that touches user data must call `getServerSession()` and return 401 if the session is absent. Admin routes must verify the HMAC admin cookie. Flag any route that reads/writes user Redis keys without session verification.
   - **Rate limiting:** any route that accepts external input (login, forgot-password, register, ARIA, flag submission) must have a Redis-backed rate limit. Flag routes that are missing one.
   - **Input validation:** routes that accept a body must validate shape before using values in Redis key construction or email sends. Flag any route that uses `req.body.x` directly in a Redis key without sanitization.
   - **HTTP method guard:** routes that mutate state must reject GET; read-only routes should reject POST/PUT/DELETE. Flag any mismatch.

   **Pass C — Auth & session integrity** (read `app/src/proxy.ts` and `app/src/lib/server-session.ts`):
   - CSP header is still set with per-request nonce — no `unsafe-inline` in `script-src`
   - `session_token` cookie is still HttpOnly, Secure, SameSite=Lax
   - `kryptos_admin` cookie is still HttpOnly, Secure, SameSite=Strict
   - Admin route block (`/admin` prefix) is still enforced in middleware
   - SESSION_SECRET and ADMIN_SECRET are read from `process.env` — not hardcoded

   **Pass D — Client-side data exposure** (grep `"use client"` files):
   - No CTF flags, password hashes, salts, or admin secrets imported or destructured into client components
   - `stage-flags.ts` is never imported in a client component (it uses `server-only`)
   - No `console.log` statements logging sensitive fields (password, hash, salt, token, secret)

   **Pass E — New attack surface review** (compare this release's changes):
   - List every new API route added — confirm each has auth + rate limiting
   - List every new env var referenced — confirm each is in `.env.example` with instructions, not hardcoded
   - List every new third-party integration — document the trust boundary and what data it receives
   - List every new Redis key pattern — confirm it is namespaced and cannot be poisoned by user-controlled input

   **Pass F — Security header integrity** (read `app/next.config.ts`):
   - All six headers still present: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control
   - CSP is not duplicated here (it's set dynamically in proxy.ts — if a static CSP header exists in next.config.ts, that is a misconfiguration)

   After all passes, update `docs/SECURITY_BRIEFING.md` if not already done in step 3, re-run the sync (step 5) to propagate, then **print this block**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECURITY AUDIT — vX.Y.Z
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 npm audit:       [PASS / X moderate, Y high, Z critical]
 Dangerous patterns: [PASS / list findings]
 API route audit: [PASS / list findings]
 Auth integrity:  [PASS / list findings]
 Client exposure: [PASS / list findings]
 New attack surface: [none / description]
 Header integrity:   [PASS / list findings]

 BLOCKERS (must fix):
   [none] or [list each blocker with file:line]

 OPEN RISKS (from SECURITY_BRIEFING.md):
   1. [Risk] — [Severity] — [Mitigation path]
   2. ...

 Resolved this release: [none / description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

   Pull open risks from `docs/SECURITY_BRIEFING.md` — do not invent findings. Show all open items, not just top 3.

9. **Report completion** — confirm both Vercel projects are updated and summarize what was shipped.

## Rules

- Never add Co-Authored-By lines to commits.
- Never push if any pre-deploy gate (TypeScript, lint, npm audit HIGH/CRITICAL) fails.
- Never include `devops/` files in the deploy commit — those change frequently and are noise.
- Never edit `app/secured-docs/` files directly (except `LAUNCH_LEGAL.md`). Edit `docs/` and sync.
- Deploy always via `npx vercel --prod` from `app/` — project is `kryptos-cronos`. Auto-deploy from GitHub push also updates the live site.
- If the user provides a version number explicitly, use it. Otherwise infer from the nature of the changes.
- Today's date is always available in the system context — use it for release notes and doc stamps.
- Steps 4–9 run after the Vercel deploy — they are post-deploy documentation and audit steps, not blockers to shipping (except security BLOCKERS found in step 8, which require a follow-up fix commit).
