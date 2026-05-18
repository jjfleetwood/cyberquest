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

## Rules

- Never add Co-Authored-By lines to commits.
- Never push if the TypeScript check fails.
- Never include `devops/` files in the doc commit — those change frequently and are noise.
- The two Vercel projects are: `app` (deployed via `npx vercel --prod`) and `kryptos-cronos` (auto-deploys from GitHub push). Both must be updated on every deploy.
- If the user provides a version number explicitly, use it. Otherwise infer from the nature of the changes.
- Today's date is always available in the system context — use it for release notes.
