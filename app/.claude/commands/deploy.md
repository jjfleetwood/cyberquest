# /deploy — Kryptós CronOS deploy skill

Run this skill whenever the user says "deploy", "/deploy", or asks to ship to production.

## What this skill does (in order)

1. **TypeScript check** — run `npx tsc --noEmit` from `C:\Users\Ajax\Projects\cyberquest\app`. If it fails, stop and report errors. Do not deploy broken code.

2. **Deploy to Vercel** — run `npx vercel --prod` from the app directory. Wait for the deployment to complete. Report the production URL.

3. **Bump version and update docs** — determine the next semantic version:
   - Patch (x.x.N): bug fixes only
   - Minor (x.N.0): new features or content
   - Major (N.0.0): breaking changes or major milestones
   
   Update these three files:
   
   **`app/secured-docs/RELEASE_NOTES.md`** — prepend a new version block at the top (after the `# Kryptós CronOS — Release Notes` heading) using this format:
   ```
   ## vX.Y.Z — YYYY-MM-DD

   **Short summary line**

   - Bullet for each meaningful change
   ```
   
   **`app/secured-docs/SECURITY_BRIEFING.md`** — increment the version number (e.g. `2.4` → `2.5`), update the date, and prepend a new changelog entry under `## Changelog — vX.Y (YYYY-MM-DD)` describing any security-relevant changes (or "No new attack surface — changes are UI/UX only" if none).
   
   **`CLAUDE.md`** (at `C:\Users\Ajax\Projects\cyberquest\CLAUDE.md`) — update `**Current version:**` and the `## Where We Left Off` paragraph to reflect the current state of the codebase.

4. **Commit ALL changes** — from `C:\Users\Ajax\Projects\cyberquest`, stage ALL modified and untracked files under `app/src/`, `app/.claude/`, `app/secured-docs/`, and `CLAUDE.md`. Do NOT stage `devops/` files. Commit with message: `vX.Y.Z: <short summary of what shipped>`

5. **Push to GitHub** — run `git push origin master` from `C:\Users\Ajax\Projects\cyberquest`. This triggers auto-deploy on kryptoscronos.com via the `kryptos-cronos` Vercel project.

6. **Report completion** — confirm both Vercel projects are updated and summarize what was shipped.

7. **Update all relevant documentation** — review what changed in this release and update every doc file in `docs/` and its mirror in `app/secured-docs/` that is affected. At minimum check:
   - `README.md` — stage count, epoch list, version
   - `ARCHITECTURE.md` — any new API routes, data structures, or system components
   - `CURRICULUM.md` — any new epochs or stages
   - `BUILD.md` — any new env vars, dependencies, or build steps
   - `OPS.md` — any new services, integrations, or runbook changes
   - `PARTNERS.md` — any new third-party services
   
   Update both the `docs/` copy and the `app/secured-docs/` mirror for each file changed. If a doc is unchanged by this release, leave it alone.

8. **Security check + display top risks** — review the changes shipped in this release for new attack surface, then:
   - Scan for: new API routes (auth? rate-limited?), new env vars (secret handling?), new Redis keys (data exposure?), new third-party integrations (trust boundary?), new client-side data handling, any use of `eval`, `dangerouslySetInnerHTML`, unvalidated input, or hardcoded secrets.
   - Update `app/secured-docs/SECURITY_BRIEFING.md` with a new changelog entry under the incremented version number reflecting any new findings or confirming no new attack surface.
   - **Print a "Security Summary" block directly to the screen** (as plain text output, not just in the doc) in this format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECURITY SUMMARY — vX.Y.Z
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 New attack surface: [none / brief description]

 TOP RISKS (open):
   1. [Risk] — [Severity] — [Mitigation path]
   2. [Risk] — [Severity] — [Mitigation path]
   ...

 Resolved this release: [none / brief description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

   Pull the open risks list from the current `SECURITY_BRIEFING.md` — don't invent risks. Display the top 3–5 unresolved findings by severity.

## Rules

- Never add Co-Authored-By lines to commits.
- Never push if the TypeScript check fails.
- Never include `devops/` files in the doc commit — those change frequently and are noise.
- The two Vercel projects are: `app` (deployed via `npx vercel --prod`) and `kryptos-cronos` (auto-deploys from GitHub push). Both must be updated on every deploy.
- If the user provides a version number explicitly, use it. Otherwise infer from the nature of the changes.
- Today's date is always available in the system context — use it for release notes.
- Steps 7 and 8 run after the GitHub push — they are post-deploy documentation and audit steps, not blockers to shipping.
