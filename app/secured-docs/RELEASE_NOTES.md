# Kryptós CronOS — Release Notes

---

## v1.6.3 — 2026-05-20

**CAE doc added to admin docs viewer**

- `PITCH_CAE_CONTINUOUS_MONITORING.md` added to `ALLOWED_FILES` in `/api/docs/[file]` route and to the `DOCS` tab list in `DocsViewer` (📡 CAE: Continuous Monitoring, rose color)

---

## v1.6.2 — 2026-05-20

**Draggable feedback widget**

- **FeedbackWidget** — header bar is now a drag handle; widget can be repositioned anywhere on screen; position persists to localStorage across reloads; clamped to viewport bounds; cursor changes to grab/grabbing during drag; label updated to "Comments? New content?"

---

## v1.6.1 — 2026-05-20

**Docs consolidation and CAE advisory content**

- **Docs single source of truth** — `docs/` is now the authoritative directory; deploy skill syncs `docs/*.md` → `app/secured-docs/` on every deploy, eliminating manual drift between the two directories
- **`PITCH_CAE_CONTINUOUS_MONITORING.md`** — new advisory paper for Chief Audit Executives on continuous monitoring via AI agents; draws on all 24 CM 1.0 + CM 2.0 module incident anchors; covers agentic audit layer (Claude tool use, API enumeration, secrets detection) and detection stack (SIEM, UEBA, NDR, CSPM, SOAR, SOC maturity); no product pitch — positions the practice and framework
- **Deploy skill updated** — step-by-step sync instruction and docs-first editing rule codified in `app/.claude/commands/deploy.md`

---

## v0.7.0 — 2026-05-15

**Multi-step CTF engine, job outcomes homepage, hints monetization, investor targeting**

- **Fragment collection system** — multi-step CTF mechanic: each stage now hides flag fragments behind file reads and exploit commands; `assemble` built-in reveals the full flag only after all fragments are collected; 🔑 N/M counter badge in terminal header
- **All 54 stages retrofitted** — Our First Journey (bt-01–bt-30), Foundations (stage-01–12), and Cisco (stage-m01–12) all have `fragments` arrays; `solved: true` pattern removed from all extraCommands; flags no longer appear in command output
- **Homepage job outcomes section** — "Train for jobs that are hiring right now" career section added: SOC Analyst, Penetration Tester, Cloud Security Engineer, AppSec/Secure Dev; each card shows salary range, required skills, and which stages cover them
- **Stats updated** — hero badge and stats bar reflect 54 stages, 12+ real CVEs, 3.5M unfilled cyber jobs
- **Hints-as-ads monetization** — Candy Crush model documented in both business proposals: first hint free, hints 2–3 require 30-second sponsor ad or Pro upgrade; $50–$200 CPM; contextual ad matching by stage topic
- **PITCH_TARGETS.md** — new investor targeting document: Tier 1 (ForgePoint, SYN Ventures, ClearSky, Owl, Reach Capital, Cisco Investments), Tier 2 (Bessemer, General Catalyst, Greylock, CrowdStrike, Paladin, a16z), Tier 3 (YC, NSF SBIR, CISA); competitive positioning table and warm intro paths
- **Admin docs viewer** — Pitch Targets tab added; `PITCH_TARGETS.md` added to `ALLOWED_FILES` allowlist

---

## v1.5.4 — 2026-05-19

**CTF scroll fix, feedback email, widget layout, 24-stage MCP templates**

- **CTF terminal scroll** — fixed black-screen terminal not scrolling: added `min-h-0` to wrapper and `overscrollBehavior: contain` to output container; inner flex overflow now works correctly inside nested flex layouts
- **Feedback email notifications** — feedback submissions now send an email to `jjbolotin@yahoo.com` via Resend; from address corrected to `noreply@kryptoscronos.com` (verified domain)
- **Feedback widget repositioned** — moved from top-right to top-left (`fixed top-4 left-4`) to prevent overlap with ARIA panel when both are open simultaneously
- **24 MCP server code templates** — each Tech Audit lesson now has a "Code Templates" section with a downloadable Python MCP server template:
  - **Agentic epoch** (audit-a01–a12): tool use agentic loop, API enumeration, secrets scanning, cloud enumeration, IAM privilege escalation analysis, MCP integration, IaC review, SOC 2 evidence collection, multi-agent orchestration, risk report writing, sentinel scheduling, full pipeline
  - **Continuous Monitoring epoch** (audit-cm01–cm12): ISCM baseline, SIEM + ML anomaly detection, UEBA risk scoring, NDR beaconing detection, CSPM attack path mapping, STIX/TAXII threat intel, SOAR playbook automation, deception/honeytokens, Zero Trust CARTA scoring, XDR cross-source correlation, continuous compliance engine, SOC maturity scorecard
  - All 24 files self-contained and runnable (`pip install anthropic && python <file>.py`); served statically from `/mcp-templates/`
- **`stage-downloads.ts`** — new data file mapping all 24 stage IDs to their template download URLs
- **`StageInfo.tsx`** — renders Code Templates section with download links before the CTA button

---

## v1.5.3 — 2026-05-18

**Back navigation + CTF terminal persistence**

- `BackLink.tsx` — all back buttons now call `router.back()` for consistent browser-history navigation
- `CtfChallenge` saves terminal state to localStorage on solve (`ctf-state:<stageId>`) and restores it on return — progress survives navigation away from a stage
- "↺ Replay" button resets saved CTF state so users can re-run challenges from scratch

---

## v1.5.2 — 2026-05-18

**Tapestry epoch — arts curriculum track**

- `src/data/tapestry.ts` — 12 quiz stages (tapestry-01 → tapestry-12): tapestry history, Flemish golden age, Asian traditions, Americas, color theory, warp/weft structure, equipment, techniques (hatching, soumak, slits, rya knots), design, optical color mixing, contemporary practice, first project
- Yellow accent color theme
- New `"arts"` category type added to stage config
- `check-answer` route now falls back to the full stages array — any quiz epoch works without manual route registration

---

## v1.5.1 — 2026-05-18

**Feedback widget + business proposal refresh**

- `FeedbackWidget.tsx` — fixed top-right widget; submits to `jjbolotin@yahoo.com` via `/api/feedback`
- Business proposals updated to reflect current product state and investor positioning

---

## v1.5.0 — 2026-05-18

**Continuous Monitoring 2.0 epoch**

- `src/data/tech-audit-4.ts` — 12 CTF stages (audit-cm01 → audit-cm12): continuous monitoring frameworks, automated control testing, real-time compliance dashboards, SIEM integration, audit trail integrity, anomaly detection, drift detection, evidence collection automation, risk scoring pipelines, reporting cadence, regulatory mapping, and monitoring program maturity
- Rose accent color theme

---

## v1.4.0 — 2026-05-17

**DocuSign NDA integration**

- `src/lib/docusign.ts` — JWT-grant DocuSign client with envelope creation and status polling
- `/api/admin/send-nda` — sends NDA envelope to a specified email from the admin dashboard
- `/api/webhooks/docusign` — receives envelope status callbacks; optional HMAC verification via `DOCUSIGN_WEBHOOK_SECRET`
- Admin dashboard NDA panel: recipient input, send button, envelope status display
- Five new env vars: `DOCUSIGN_INTEGRATION_KEY`, `DOCUSIGN_USER_ID`, `DOCUSIGN_ACCOUNT_ID`, `DOCUSIGN_PRIVATE_KEY`, `DOCUSIGN_BASE_URL`

---

## v1.2.0 — 2026-05-17

**MITRE ATT&CK + MITRE ATLAS + OWASP LLM Top 10 epochs**

- `src/data/mitre.ts` — 12 CTF stages (mitre-01 → mitre-12) covering all 12 MITRE ATT&CK tactic phases: Reconnaissance through Impact; red accent
- `src/data/mitre-atlas.ts` — 12 CTF stages (atlas-01 → atlas-12) covering AI/ML adversarial attacks: model evasion, data poisoning, model inversion, adversarial examples, supply chain compromise, and ATLAS tactic/technique mapping; fuchsia accent
- `src/data/owasp-llm.ts` — 12 CTF stages (llm-01 → llm-12) aligned to OWASP LLM Top 10 2025 edition: prompt injection, insecure output handling, training data poisoning, model denial of service, supply chain vulnerabilities, sensitive information disclosure, insecure plugin design, excessive agency, overreliance, model theft; orange accent
- Total curriculum grows to 114 stages

---

## v1.0.0 — 2026-05-16

**Tech Audit epoch trilogy + ARIA chatbot + CI pipeline + streaks + badges**

- `src/data/tech-audit-1.ts` — Tech Audit: Foundations (audit-01 → audit-12): ISACA, COBIT, CISA frameworks, audit lifecycle, risk assessment, control testing, evidence collection; purple accent
- `src/data/tech-audit-2.ts` — Tech Audit: Technical (audit-t01 → audit-t12): API security auditing, secrets management, cloud configuration review, IAM privilege analysis, dependency scanning, container security, network segmentation, logging gaps; violet accent
- `src/data/tech-audit-3.ts` — Tech Audit: Agentic (audit-a01 → audit-a12): Claude tool use auditing, MCP server security, agentic workflow risk, prompt injection in pipelines, tool permission scoping, output validation; indigo accent
- **ARIA AI chatbot** — in-terminal Socratic tutor powered by Claude Haiku; stage-aware context; never reveals flags; accessible via `/api/hint`
- **CI pipeline** — GitHub Actions workflow: ESLint → `tsc --noEmit` → Next.js build → `npm audit`; runs on every push and PR
- **Daily streaks** — `streak:<username>` Redis key; streak display in admin dashboard and user profile
- **Milestone badges** — `m-xp-1k`, `m-xp-5k`, `m-streak-3`, `m-streak-7` awarded server-side on progress POST
- Total curriculum grows to 102 stages across 7 epochs

---

## v0.8.0 — Planned (Q3 2026)

**Cisco product integrations + adaptive difficulty**

- Adaptive difficulty engine — adjusts challenge complexity based on command patterns and time-on-task
- **Cisco Talos integration** — weekly CVE challenge drops sourced from Talos threat intelligence feed
- **Cisco Umbrella epoch** — new curriculum track: DNS tunneling, DGA detection, network policy enforcement
- **Cisco SecureX / XDR track** — enterprise SecOps stages: alert triage, incident investigation, response workflows
- **Cisco Firepower stages** — network defense: firewall rule exploitation, lateral movement detection
- **Cisco CyberOps Associate alignment** — Cisco epoch badge completions map to CyberOps exam domains; exam voucher redemption flow
- **Cisco DevNet track** — API security and automation: REST exploitation, OAuth misconfigurations

---

## v0.6.0 — 2026-05-11

**Security hardening sprint — all findings from security review resolved**

- **proxy.ts is the active middleware** — confirmed as the correct Next.js 16 filename (not middleware.ts); `ƒ Proxy (Middleware)` appears in build output
- **Internal docs gated** — moved from `public/docs/` to `secured-docs/`; served only via `/api/docs/[file]` requiring admin HMAC cookie; `outputFileTracingIncludes` added to next.config.ts for Vercel bundling
- **HSTS header** added: `max-age=63072000; includeSubDomains; preload`
- **XP computed server-side** — `/api/progress` POST uses a hardcoded `STAGE_XP` map; client-submitted XP ignored
- **sync-user first-write-wins** — existing Redis user records cannot be overwritten
- **Rate limiting** — forgot-password (3/IP/15min), notify-registration (5/IP/hour) via Redis incr
- **admin-session** throws if `ADMIN_SECRET` env var is missing (no empty-string fallback)
- **reset-password** no longer returns email in response — returns only username
- Emerald accent theme added to Our First Journey epoch

---

## v0.5.0 — 2026-05-10

**Live leaderboard, cross-device sync, epoch gating, proxy migration**

- Live global leaderboard powered by Upstash Redis sorted set
- Server-side progress persistence: XP, completed stages, and badges synced to Redis on every stage completion
- Cross-device progress restore: logging in on a new device merges server progress with local state
- Cisco epoch now gated — locked until all 12 Foundations stages are completed
- `isEpochUnlocked()` computes epoch access dynamically from progress at render time
- Leaderboard page fetches live data from `/api/leaderboard`; falls back gracefully if offline
- `GET /api/progress` and `POST /api/progress` routes added for progress sync
- Migrated `middleware.ts` → `proxy.ts` (Next.js 16 convention)
- Deleted legacy `CtfTerminal.tsx` (superseded by `CtfChallenge.tsx` since v0.1.0)

---

## v0.4.1 — 2026-05-10

**Security hardening**

- Admin username removed from source code — moved to server-side env var (`ADMIN_USERNAME`)
- Admin cookie grant now server-side only via signed HMAC token (`ADMIN_SECRET`)
- New API route `/api/admin-session` handles admin cookie issuance and revocation
- Next.js proxy — `/admin/**` routes blocked at the edge without valid HttpOnly cookie
- `isAdmin()` reads from stored user record instead of hardcoded string
- Registration no longer auto-grants admin based on username match
- Admin notification email moved from hardcoded to `ADMIN_EMAIL` env var
- Content Security Policy header added
- Fixed hardcoded admin username display in admin dashboard UI

---

## v0.4.0 — 2026-05-10

**Curriculum tracks + Cisco ops rewrite**

- Named curriculum tracks: **Foundations** (amber) and **Cisco** (blue)
- Foundations track: 12 core cybersecurity stages set in ancient world landmarks
- Cisco track: 12 real Cisco CVE stages framed as APT field operations
- All 12 Cisco CTF scenarios rewritten — spy/APT operative tone, real locations

---

## v0.3.0 — 2026-05-09

**Cisco epoch + 24-stage curriculum**

- Added 12 Cisco stages (stage-m01 through stage-m12) covering real CVEs:
  CVE-2023-20198, CVE-2016-6366, CVE-2018-0171, CVE-2019-1653, CVE-2020-3452,
  CVE-2022-20695, CVE-2021-1497, CVE-2023-20273, CVE-2019-1821, CVE-2020-3580,
  CVE-2020-3187, CVE-2017-6736
- Epoch tab UI with per-epoch color theming (amber / blue)
- Per-epoch sequential unlock logic

---

## v0.2.0 — 2026-05-09

**Ancient epoch + wonder-per-stage system**

- Converted all 12 original stages to "Foundations" epoch set inside ancient landmarks
- Added `Wonder` type: name, location, era, emoji
- Upgraded password hashing from SHA-256 to PBKDF2-SHA-256 (100k iterations)
- Added HTTP security headers to `next.config.ts`

---

## v0.1.0 — 2026-05-08

**Initial public launch**

- 12 cybersecurity + AI + OWASP stages in quiz and CTF formats
- CTF terminal with simulated filesystem: `ls`, `cat`, `cd`, `submit`, `hint`
- Progressive hints system — up to 3 hints per stage
- Stage map with sequential unlock logic and XP progression
- PBKDF2 client-side auth (localStorage), session via sessionStorage
- Per-user progress tracking scoped to logged-in account
- Leaderboard page with XP bar visualization
- Admin dashboard at `/admin` — user management and docs viewer
- Email notification on new user registration via Resend API
- Deployed to kryptoscronos.com

---

## Pre-launch Development — 2026-05-08

**Initial development sprint**

- Next.js 16 App Router scaffold, TypeScript strict mode, Tailwind CSS 4, DevOps folder structure
- Landing page, stage map, nav, login/signup with tab UI
- 12-stage curriculum: OWASP Top 10 + CVE content (SQL Injection, XSS, Heartbleed, Log4Shell, WannaCry, SSRF, Equifax/Struts, MongoDB)
- Client-side PBKDF2 auth, per-user progress scoping
- Security briefing, technical architecture doc, business proposals
- Dark cyberpunk aesthetic with monospace terminal styling
- Admin system: protected dashboard, docs viewer
- Resend API integration for registration alerts
- Rebrand: CyberQuest → Kryptós CronOS (κρυπτός χρόνος)
