# Kryptós CronOS — Release Notes

---

## v1.23.0 — 2026-05-30

**Every CTF stage is now dual-mode (Quiz + CTF) + brand & homepage refresh**

- **Dual-mode quiz rollout — COMPLETE (203/203 CTF stages).** Every `challengeType: "ctf"` stage now ships an 8-question multiple-choice `stage.quiz` alongside its CTF, so learners can choose Quiz mode (cosmetic half-clear, 0 XP, no unlock) or CTF mode (full clear). This release authored and shipped the final 69 stages: quantum-3 (QKD, c01–c10), quantum-4 (quantum risk mgmt, d01–d10), cisco-2 (m13–m25), cisco-3 (m26/m28/m30), cisco-4 (m34/m36/m37), cisco-5 (m39/m41/m42/m44/m46/m48/m50), umbrella (01–10), and the ancient foundations set in stages.ts (stage-01–12 + stage-m12). Each quiz is grounded in the stage's real content + the `ctf-quiz-data.json` fact bank, authored via the idempotent `scripts/inject-quizzes.mjs` injector.
- **New brand logo** — replaced the 🛡️ emoji with a guilloché watch-dial mark (`Logo.tsx`): cyan→indigo gradient hands reading 4:21, dark-purple outer ring + cyan bezel, 60 minute ticks and a 6-o'clock subdial. Applied in Nav, footer, login, onboarding, and as the favicon (`icon.svg`). Uses `gradientUnits="userSpaceOnUse"` so gradients paint correctly on line elements.
- **Playable homepage hero** — `HomeCtfDemo.tsx`: an interactive mini-CTF terminal (ls → cat vault.lock → submit FLAG{…}) with a `hint` command and suggestion chips, replacing the static terminal animation. Success CTA routes to /login.
- **Certs page UX** — added a sticky left-sidebar jump-nav (like /admin), made CyberOps the first/featured card, widened to `max-w-6xl`, and moved the Resume builder link into a "Career" section in the certs menu (removed from the top nav).
- **Content formatting** — `RichText.tsx` now renders backtick `` `code` `` as cyan monospace pills and `'single-quoted'` terms as restrained amber pills; `RichParagraph` lead colors chilled (sky/pink at 80% opacity). Briefing-section reformat to bulleted-with-dialogue begun on tech-audit-3 (audit-a07, audit-a01).

---

## v1.22.0 — 2026-05-29

**Two new epochs: Quantum Risk Management + Emerging Tech & Deep Learning Risk (20 stages, 458 total)**

- **`quantum-4` — Quantum Risk Management** (10 CTF stages, quantum-d01 → quantum-d10, emerald theme): CBOM / Cryptographic Bill of Materials; Harvest Now Decrypt Later (HNDL) nation-state threat assessment; NIST FIPS 203/204/205 deployment (ML-KEM-768 lab); CNSA 2.0 NSS mandate + LMS stateful firmware signing; CISA 5-phase migration roadmap + crypto-agile nginx config; sector risk scoring (finance/healthcare/SCADA/blockchain ECDSA exposure); board briefing + SEC cybersecurity disclosure (SolarWinds CISO liability precedent); hybrid cryptography (X25519+ML-KEM-768 middlebox validation); quantum-safe PKI architecture (Let's Encrypt agility model); third-party vendor PQC assessment + SWIFT 11,000-institution supply chain challenge
- **`emerging-tech` — Emerging Tech & Deep Learning Risk** (10 quiz stages, emerging-01 → emerging-10, violet theme): adversarial examples (FGSM, physical stop sign attacks, NIST AI RMF); foundation model supply chain (BadNets backdoors, pickle RCE / ShadowRay 2024, Hugging Face); federated learning gradient inversion + DP-SGD defense (Opacus); deepfake detection + C2PA provenance + Hong Kong $25M video call fraud (2024); AI-augmented threat actors (Microsoft/OpenAI nation-state LLM confirmation, Feb 2024); edge AI model extraction + power side-channel + TEE defense (Tesla FSD extraction); EU AI Act (4 tiers, Annex III high-risk) + NIST AI RMF + CFPB ECOA adverse action notices; agentic AI indirect prompt injection (Bing Chat PoC) + MCP tool result scanning; quantum-AI convergence (NISQ era, Grover's, CRQC HNDL risk to proprietary model weights); ERM integration (WEF 2024 #1 risk: AI misinformation, scenario planning, KRI framework)
- **cert-domains** — quantum-d01..d10 mapped to AI+/CISA/CISM/CRISC; emerging-01..10 mapped to AI+/CISA/CISM/CRISC; quantum-01..10 and quantum-b01..b10 merged with CompTIA AI+ domains (duplicate-free); AI+ cert total now 97 stages across atlas, llm, quantum, cisco-advanced, emerging-tech
- **epoch-theme** — emerald accent for `quantum-4`, violet for `emerging-tech`; both added to `quantumEra` track group on stages page
- **CLAUDE.md + RELEASE_NOTES** — version bumped to v1.22.0; epoch count 36→38; stage count 438→458; quantum epoch stage IDs corrected (quantum-t/p/q → quantum-/b/c); prior versions v1.19.0–v1.21.0 documented

---

## v1.21.0 — 2026-05-29

**Full security stage rewrite sprint + CompTIA AI+ cert path**

- **Security stage rewrites** — 8 epochs upgraded to HS/University standard (cisco-enterprise m13–m25, cisco-secops m26–m38, cisco-advanced m39–m50, mitre-01..12, atlas-01..12, llm-01..12): 3-paragraph historically-grounded overviews, exact exploit mechanics, 3-paragraph incident sections with nation-state attribution, STEP/DETECTION/REMEDIATION structured code blocks
- **CompTIA AI+ cert path (/certs)** — sky-blue card, 5 domains from the 2024 blueprint: AI Security, Ethics & Governance (30%), Data Science Fundamentals (20%), AI Models & Training (20%), AI Concepts (15%), AI Infrastructure & Operations (15%); 67 stages mapped: all 12 atlas, all 12 llm, all 30 quantum, plus m42/m43/m50 from cisco-advanced
- **CI build fixed** — removed dead `adminUser` variable in `login/route.ts`; excluded merge/fix scripts from ESLint `globalIgnores`; 0 errors maintained

---

## v1.20.0 — 2026-05-29

**Stage content rewrites + ISACA cert paths + group system simplification**

- **Stage content rewrites** — cisco-core (m01–m12) and ancient (stage-01..12) all rewritten to HS/University standard: 3-paragraph historically-grounded overviews, exact exploit mechanics, 3-paragraph incident sections with attribution (GRU, NSA/Shadow Brokers, Iranian APT, suspected Chinese APT), specific detection/remediation commands
- **ISACA cert paths (/certs)** — CISA (5 domains, 2022 blueprint, yellow); CISM (4 domains, 2022 blueprint, purple); CRISC (4 domains, 2022 blueprint, teal); salary ranges $95k–$175k; all existing security stages mapped to appropriate ISACA domains; ancient stages Security+ domain tags corrected
- **Group system simplification** — `USER_GROUPS` simplified to `["career", "curious"]`; `DEFAULT_GROUPS = ["career", "curious"]` — all new users see both security and extended curriculum; epoch page `filterStagesByGroup` consistent with stages page
- **StageInfo code comment dimming** — lines starting with `#`, `//`, `/*`, `*`, `--` render at 38% opacity in CTF terminal vs 100% for executable code

---

## v1.19.0 — 2026-05-29

**Docs refresh + elementary redesign + cert expansion + security audit**

- **Docs full refresh** — CLAUDE.md corrected to v1.18.1 facts (epoch count, stage count, cert paths, Stripe, i18n); RELEASE_NOTES recovered 6 missing versions (v1.12.1 through v1.18.1)
- **Elementary redesign — DEFERRED (logged in error):** this entry originally claimed the bt-01..bt-30 rewrite shipped, but the stages remain at high-school/adult reading level. The ages 5–10 "Junior Cyber Agent Academy" rewrite was not completed and is still open as item A in TODO.md.
- **cert expansion** — CompTIA Network+ N10-009 (5 domains) and CySA+ CS0-003 (4 domains) added to /certs; all security stages remapped across Security+, ISC² CC, Network+, CySA+
- **Deep security review** — CSPRNG fix: replaced `Math.random()` with `crypto.getRandomValues()` in voucher/session generation; survey JSON payload size limit added (50KB); removed emergency admin bypass in login rate limit
- **Harsh VC assessment v3.0** — updated VC_READINESS_ANALYSIS.md with candid strengths/weaknesses; all-star tier removed from admin panel and `getUserTier()` logic

---

## v1.18.1 — 2026-05-29

**Hours & cost log added to admin docs panel**

- **`docs/HOURS_LOG.md` + `app/secured-docs/HOURS_LOG.md`** — session hours + estimated cost log; wired into admin docs panel (⏱ Hours & Cost tab); added to `/api/docs/[file]` allowlist and `DocsViewer` tab list
- **Deploy skill updated** — step 10 added: log hours + estimated cost to HOURS_LOG after every deploy session

---

## v1.18.0 — 2026-05-29

**Images (154 stages), certificate paths, resume builder, incentive system, docs**

- **Images — 154 new stages** — Wikimedia Commons images added: baseball (70 stages across all 7 epochs), driving (24 stages across 3 epochs), quantum (30 stages — Bloch sphere, Shor/Grover SVGs, IBM Q system, BB84 photon diagrams, lattice cryptography), nails/hair (30 stages — nail anatomy cross-section, hair microscopy, styling tools)
- **`/certs` page** — `src/data/cert-domains.ts`: 230+ stages mapped to CompTIA Security+ SY0-701 (6 domains) + ISC² CC (5 domains); dual readiness rings, per-domain progress bars, salary ranges, exam registration CTAs, job listing links; Certificate Paths banner added to `/stages` Security section header and all security epoch pages
- **`/resume` page** — multi-section form: personal info, headline, summary, skills, experience, education; skills auto-suggested from completed training epochs (grouped by epoch); `POST /api/resume/generate` → PDF via @react-pdf/renderer; includes Kryptós CronOS achievement section in PDF
- **Incentive system** — survey completion (`/survey`) grants 30 days Pro access to free/trial users (one-time, idempotent via `survey:rewarded:{user}` Redis key); survey success screen shows "Pro Unlocked!" with activation details; streak milestone coin bonuses: 3-day +50🪙, 7-day +150🪙, 30-day +500🪙 (awarded once per milestone in `server-progress.ts`)
- **Docs updated to v1.17.0** — BUSINESS_PROPOSAL_PRO/CASUAL: track table reconciled (438 stages, 36 epochs, 10 tracks + extended); /certs + Stripe + i18n added to live features; PITCH_TARGETS: /certs added to VC angles, CompTIA/ISC² partner network warm intro paths; FINANCIALS: version bump, Supabase complete

---

## v1.17.0 — 2026-05-29

**Security hardening — OWASP Top 10 audit + voucher system fixes**

- **Voucher fixes** — admin voucher routes now require HMAC `admin_token` (was session-only); redeem race condition fixed (SADD atomic dedup + optimistic HINCRBY with rollback on negative); Stripe webhook (`subscription.deleted`) clears `voucherExpiry` to prevent downgrade conflict; revoke endpoint (`PATCH /api/admin/vouchers`) + Revoke button in admin panel; account page shows voucher expiry for voucher-based Pro users; 365-day duration + 500-use limit options added
- **OWASP Top 10 fixes** — `downloads-access` POST/GET: admin token guard added (was open to any logged-in user); survey GET: admin token guard added (was fully unauthenticated); login: admin username no longer exempt from IP rate limiting; Stripe checkout: origin header whitelisted to kryptoscronos.com + localhost; leaderboard: rate limited 30 req/min/IP
- **PBKDF2 600k iterations** (OWASP SP 800-132 2024 recommendation); auto-rehash on login upgrades existing users transparently
- **Account lockout** — 5 failed login attempts → 15-min lock per username (`lockout:user:{username}`)
- **Admin audit log** — `src/lib/audit.ts`: `logAdminAction()` writes all mutating admin actions to Redis `audit:log` list (max 1000 entries, LPUSH recency); logged: set-tier, set-skin, set-group, award-stage, grant-admin, vouchers (create/revoke), downloads-access, CMS overrides
- Security briefing updated to v4.1

---

## v1.16.3 — 2026-05-29

**Admin left nav (fixed sidebar) + anchor IDs + voucher list no-flicker**

- **Admin dashboard** — fixed left-nav sidebar always visible (was collapsible); all major sections given anchor IDs (`#users`, `#vouchers`, `#metrics`, `#audit`, `#docs`) for direct deep-linking from other pages
- **Voucher list** — no-flicker on page refresh (SSR-safe hydration pattern; was causing client/server mismatch)

---

## v1.16.2 — 2026-05-29

**Voucher code system — admin generate, user redeem, ProPaywall input**

- **Voucher system** — `KRYPTOS-XXXX-XXXX` format codes (8 alphanumeric, avoids O/0/I/1 confusion); admin generate batch (1–50 codes, configurable uses/duration); `POST /api/redeem` for user redemption
- **Atomic redemption** — SADD to `voucher:redeemers:{CODE}` set for per-user dedup (returns 0 if duplicate); HINCRBY to decrement `usesLeft` with rollback if result goes negative (race condition safe); sets `tier: pro` + `voucherExpiry` timestamp on user hash
- **Admin voucher panel** — list all codes with uses/redeemers/expiry; generate form; revoke button
- **ProPaywall** — redeem input field for voucher codes; calls `/api/redeem` before Stripe fallback
- **`getUserTier()`** — checks `voucherExpiry` timestamp; returns `free` if expired, `pro` if active

---

## v1.16.0 — 2026-05-28

**Security/Non-Security sections, full i18n, Paris/Milan images, survey, downloads page, back link fix, admin UX**

- **Stages page** — Security (🔒) and Non-Security (📚) section headers divide the track list; Downloads link (↓ Python Downloads) in the Security header links to `/downloads`
- **`/downloads` page** — lists all 24 Python MCP server templates with descriptions and individual download links, grouped by epoch
- **`/survey` page** — 9-question user survey (referral, security level, valuable tracks, missing content, NPS, upgrade reason, role, time/week, open comments); `POST /api/survey` persists to Redis sorted set (`survey:index`)
- **i18n — section themes** — Attack Chain / Technical Deep-Dive / Real-World Incident (and all 7 category variants) now use translation keys; added to all 6 language files (fr/es/de/hi/pt/pl)
- **i18n — FeedbackWidget** — all visible strings (title, placeholder, hint, send/sent/failed/sending, expand/minimize) now use `useLocale()`; translated in all 6 languages. "Full survey →" link added.
- **AttackDiagram** — `category` prop added; ATTACKER/SYSTEM/TARGET/RESULT labels replaced with STEP N for non-security stages (arts, travel, driving, health) and category-specific labels for sports
- **RichText** — `context` prop: `"general"` mode disables CVE/SQL/acronym/file-path/IP/port highlights for non-security content (arts, travel, sports, driving, health stages)
- **Overview section** — `boldLead=false` removes the bold lead sentence; overview is now one consistent font. Lead color darkened: sky-400 / pink-400 (was sky-200 / pink-200)
- **Module title** — stage title links to `#real-world` anchor on the incident/cultural context section
- **BackLink fix** — `StageContainer` now passes `backHref` to `StageInfo`; back button always returns to epoch page (was unreliable with `router.back()` on direct URL visits)
- **Admin page** — username column widened (1fr → 3fr in grid template); `truncate` removed, `break-all` added; long usernames no longer clip
- **Paris images** — stages 9–20 given Wikimedia Commons images: Luxembourg Gardens, Notre-Dame, Sainte-Chapelle, Place des Vosges, Bastille column, Belleville, Galerie Vivienne, Père Lachaise, Marché d'Aligre, Canal Saint-Martin, Versailles, Sacré-Cœur
- **Milan images** — stages 9–20 given Wikimedia Commons images: Navigli, San Lorenzo columns, Sant'Ambrogio, Bosco Verticale, La Scala, Lake Como, Certosa di Pavia, Cimitero Monumentale, Via Montenapoleone, Roman Milan tower, Duomo sunset, Porta Nuova skyline
- **content-flags.ts** — added missing epochs: cisco-advanced, paris-july, milan-july, french-basics, italian-basics
- **Certificate route** — try/catch around `renderToBuffer` with 500 response on failure for easier debugging
- **Docs updated** — BUSINESS_PROPOSAL_PRO/CASUAL, PITCH_TARGETS, FINANCIALS: corrected pricing ($13.99/mo, $99/yr), stage counts (438), version (v1.15.1→v1.16.0), added adaptive difficulty + CyberOps tracker + 7-day trial to live features; Supabase status → complete
- **TODO.md** — new deferred items: elementary redesign (A), incentives system (B), certificate paths (C), resume module (D), all-stage images (E), docs final update (F)

---

## v1.15.1 — 2026-05-28

**Stage briefing paragraph formatting — bold lead sentence**

- `RichParagraph` component splits each paragraph at first sentence boundary; lead sentence rendered bold + light blue (`text-sky-200`) in overview/technical sections, bold + light pink (`text-pink-200`) in incident sections — acts as a scannable topic sentence for each paragraph
- Reverted previous question-highlight and parenthetical-green approaches
- Applied to overview, technical deep-dive, and real-world incident body paragraphs across all 438 stages

---

## v1.15.0 — 2026-05-28

**Supabase Auth migration — parallel auth with zero-downtime PBKDF2 fallback**

- New `src/lib/supabase.ts` — `supabaseAdmin` (service role client) + `createSupabaseServerClient()` (SSR session reader) + `getSupabaseUsername()`
- **Register:** new accounts simultaneously written to Redis (PBKDF2) and Supabase Auth (`email_confirm: true`, `user_metadata.username`)
- **Login:** tries Supabase `signInWithPassword` first; on failure falls back to PBKDF2 and transparently creates a Supabase account (silent migration — no user action required)
- **Logout:** signs out from both Supabase and clears HMAC session cookie
- **Forgot-password:** triggers both Supabase `resetPasswordForEmail` and the existing Resend custom email
- **Reset-password:** after Redis PBKDF2 update, syncs new password to Supabase via service role
- All existing API routes, sessions, and the HMAC cookie system unchanged — zero breaking changes
- Packages: `@supabase/supabase-js@2.106.2`, `@supabase/ssr@0.10.3`

---

## v1.14.1 — 2026-05-28

**Remove DocuSign NDA integration**

- Deleted `src/lib/docusign.ts`, `/api/admin/send-nda`, `/api/webhooks/docusign`
- Admin NDA panel simplified — clickwrap signatories list retained, send form removed
- Privacy policy, OPS, PARTNERS, ARCHITECTURE, BUILD, FINANCIALS, and business proposals cleaned of all DocuSign references
- 5 `DOCUSIGN_*` env vars now unused and can be removed from Vercel settings
- Clickwrap NDA at `/demo` and `/api/nda` unaffected

---

## v1.14.0 — 2026-05-28

**CyberOps Associate exam readiness tracker**

- **`/cyberops` page** — exam readiness dashboard: weighted readiness ring (0–100%), 5 domain cards (Security Concepts 20%, Security Monitoring 25%, Host-Based Analysis 20%, Network Intrusion Analysis 20%, Policies & Procedures 15%), each expandable to show completed/remaining stages with direct links, Cisco exam CTA
- **`src/data/cyberops-domains.ts`** — 5 CBROPS 200-201 domain definitions, 50 stage mappings across cisco-core/enterprise/secops/advanced + umbrella, weighted readiness computation
- **Epoch banner** — Cisco and Umbrella epoch pages show "CyberOps Associate Exam Readiness" link banner
- **Stage briefing badge** — Cisco/Umbrella stages show `🎓 CyberOps: [Domain]` badge in the hero linking to `/cyberops`

---

## v1.13.1 — 2026-05-28

**RichText auto-highlighter for stage briefing paragraphs**

- New `RichText.tsx` component — regex tokeniser applies inline highlights to all briefing paragraph text without touching stage data files
- CVE IDs (`CVE-YYYY-NNNNN`) → neon green monospace pill
- Quoted terms (`"Log4Shell"`, `"WannaCry"`) → amber
- Dollar amounts and large numbers → cyan bold
- Percentages → cyan bold
- Version numbers (`v2.14.1`) → teal monospace
- CVSS score references → orange
- Year anchors → slightly brightened
- Applied to: overview, technical body, incident body, key takeaways across all 438 stages

---

## v1.13.0 — 2026-05-28

**Stage briefing visual redesign + category-aware section labels**

- **StageInfo redesign** — wonder hero card (emoji + location/era), CVSS severity bar with color-coded label and description, pull-quote first paragraph, distinct color identity per section (cyan overview, rose flow, emerald technical, amber timeline, violet takeaways, sky references), incident section with pulsing dot + badge + impact callout, numbered gradient takeaway badges, hoverable reference cards, gradient CTA button
- **Category-aware labels** — section headers and incident styling now adapt to stage category: cybersecurity/ai/owasp → Attack Chain / Technical Deep-Dive / 🚨 Real-World Incident (red); sports → ⚾ How It Works / Rules & Mechanics / 🏆 Historical Moment (amber); arts (nails, tapestry, hair, travel, language) → ✂️ Step by Step / Technique & Process / 📖 Cultural Context (violet); driving → 🛣️ The Process / Rules & Regulations / 🚗 Real-World Scenario (blue); health → 🩺 How It Works / Clinical Deep-Dive / 📋 Case Study (teal)

---

## v1.12.2 — 2026-05-28

**Add FINANCIALS.md — company P&L structure, cost tracking, compliance**

- `docs/FINANCIALS.md` — capital deployed to date ($800), monthly run rate ($205), P&L category structure (Revenue / COGS / R&D / G&A), unit economics per subscriber (~95% gross margin), cost projections at scale, recommended services, and compliance checklist (Delaware franchise tax, 83(b), registered agent, Mercury, Wave)
- Wired into admin docs panel: 💰 Financials & P&L tab

---

## v1.12.1 — 2026-05-28

**Fix stale stage/epoch counts in ProPaywall and OG meta**

- `en.json` paywall feature line: "All 438 stages across 36 epochs and 10 tracks" (was 358/32/7)
- `layout.tsx` Open Graph + Twitter card descriptions: "438 CTF stages. 36 epochs." (was 358/32)

---

## v1.12.0 — 2026-05-28

**Adaptive difficulty engine — XP bonus, skill tracking, smart hints, recommended next**

- **`src/lib/difficulty.ts`** — new server-only engine: `computeStageScore` (time + hints + attempts → 0–100), `computeBonusXp` (+20% at score ≥ 80), `adaptiveCooldownSeconds` (Pro ARIA: 0s/15s/30s by skill), `getRecommendedNext` (harder or easier incomplete stage by skill), Redis helpers for rolling skill level and per-stage signal counters (`diff:<user>:level`, `diff:<user>:history`, `diff:<user>:hints:<stageId>`, `diff:<user>:attempts:<stageId>`)
- **XP bonus** — clean/fast solves (score ≥ 80) earn +20% coins; shown as `⚡ Clean solve bonus: +N 🪙` in the CTF terminal and a yellow badge in FlagSuccessModal; tracked in Redis `bonus` field; included in leaderboard delta
- **Skill level** — rolling average of last 10 stage scores (0–100) stored in Redis; defaults to 50; updated after every CTF flag and quiz final answer
- **Wrong attempt tracking** — `INCR diff:<user>:attempts:<stageId>` on every wrong flag submission or quiz answer; 48 h TTL
- **Hint usage tracking** — `INCR diff:<user>:hints:<stageId>` after every ARIA response; feeds into stage score
- **Adaptive ARIA cooldown (Pro)** — skill < 40 → 0 s, skill 40–69 → 15 s, skill ≥ 70 → 30 s; returned as `nextCooldownS` in hint API; free tier unchanged at 30 s; updated banner copy reflects adaptive behavior
- **Recommended Next** — returned in check-flag response; shown as cyan card above action buttons in FlagSuccessModal; harder stage (higher XP) for skill ≥ 60, easier for skill < 60
- **Stages visibility fix** — `career` and `curious` `GROUP_EPOCHS` now mirror each other; users with either group stored in Redis see the full career + extended curriculum (fixes accounts registered with `curious` only)
- **ESLint fix** — data merge scripts (`src/data/**/*.js`) added to `globalIgnores` in `eslint.config.mjs`; 0 errors maintained

---

## v1.11.0 — 2026-05-26

**Language epoch expansion: French Basics and Italian Basics each grow to 20 stages**

- **French Basics** expanded from 10 → 20 stages (french-11 through french-20): at the boulangerie (UNESCO baguette tradition 2022, €1.10–1.30, bien cuite), reading a French menu (entrée ≠ main course, Escoffier brigade), French wine (AOC/AOP, phylloxera 1863, 6 regions), at the pharmacy (Napoleon's 1803 law, pharmacists can now prescribe antibiotics), hotel vocabulary (J'ai une réservation, Ritz 1898), telling time (Revolutionary decimal time 1793), weather (storms Lothar/Martin 1999, 10,000 Versailles trees), telephone & digital French (Minitel 1982–2012), French faux pas (hands on table, no eating while walking, flat hand over glass), Paris arrondissements (1–20 clockwise spiral, Haussmann 1853)
- **Italian Basics** expanded from 10 → 20 stages (italian-11 through italian-20): at the gelateria (Buontalenti 1565 Medici court, artigianale signs), Italian food vocabulary (risotto alla Milanese, cotoletta vs Schnitzel, Artusi 1891), Italian wine (DOCG, Franciacorta, 1986 methanol scandal 19 deaths), at the farmacia (Santa Maria Novella 1240, farmacia di turno), hotel & accommodation (passport required by Italian law, Grand Tour 1660s), telling time (Milan's 1335 mechanical clock, 24-hour tradition), weather (nebbia Po Valley fog, afa August humidity, 2003 heat wave 20,000 deaths), Italian football/calcio (AC Milan rossoneri / Inter nerazzurri, Derby della Madonnina, San Siro 75,923, Inter founded 1908 as internationalist breakaway), Italian faux pas (la bella figura, posso? at markets, no cheese on seafood, UNESCO pizza 2017), Milan neighbourhoods (Brera M2 Lanza, Navigli M2 Porta Genova, Isola/Bosco Verticale M2/M5 Garibaldi, Tortona, Porta Romana, Quadrilatero Moda M3 Montenapoleone)
- **Stage count grows:** 418 → 438 (all 36 epochs; travel track now 80 stages)
- **Curriculum reference updated** to v3.5 — XP summary table extended with all 4 travel epochs; epoch descriptions expanded

---

## v1.10.0 — 2026-05-25

**Travel curriculum: Paris in July, Milan in July, French Basics, Italian Basics**

- **4 new travel epochs** added to the extended "curious" group curriculum track: Paris in July (20 stages), Milan in July (20 stages), French Basics (10 stages), Italian Basics (10 stages)
- **60 new quiz stages** — stage count grows from 358 → 418; epoch count 32 → 36
- **Paris in July** (paris-july, paris-01→paris-20): Roman ruins to Impressionist galleries, hidden passages, Canal Saint-Martin, jazz & chanson, opera, and eating near the Opéra
- **Milan in July** (milan-july, milan-01→milan-20): Duomo to Last Supper, La Scala, Navigli, Brera, Isola, Vertical Forest, aperitivo culture
- **French Basics** (french-basics, french-01→french-10): 10 conversational phrases modules — café, restaurant, shopping, directions, market math, transport, museum, emergencies, Parisian communication style
- **Italian Basics** (italian-basics, italian-01→italian-10): 10 conversational modules — bar culture, trattoria, shopping, Milan transit, gestures, Duomo visits, emergencies, aperitivo
- **epoch-theme.ts** extended with blue/indigo/sky/green accent colors for all 4 new epochs
- **i18n** — travel track labels ("Travel", "Voyage", "Viajes", "Reisen") added to en/fr/es/de message files
- **run-cyberquest dev skill** — `.claude/skills/run-cyberquest/` with Playwright smoke driver; screenshots home, stages map, epoch pages; documents Redis gotcha (stage pages need Upstash creds), CSP eval workaround, and onboarding modal dismissal

---

## v1.9.0 — 2026-05-23

**Investor readiness, legal formation, pricing, positioning cleanup**

- **Bolotin Enterprises, Inc.** incorporated as Delaware C-Corp (May 23, 2026) via Stripe Atlas — 9M founder shares, 4-year vest, 1-year cliff, vesting start 2025-11-22, double trigger acceleration
- **Terms of Service** — live at `/terms`; covers subscriptions, 7-day refund, acceptable use, IP ownership, governing law (Delaware)
- **Business email** — `hello@kryptoscronos.com` live via Cloudflare Email Routing; replaces Yahoo in all public-facing pages (homepage enterprise CTA, Privacy Policy, Terms)
- **Pricing updated** — Pro tier $5.99/mo → $13.99/mo; annual $55.99 → $99 (41% savings); ProPaywall and homepage pricing section updated
- **Crafts / Driving / Baseball hidden** from public homepage tracks grid and stage map epoch groups; cybersecurity-only positioning for investor and enterprise audience; epochs still accessible via direct URL
- **Duplicate "How it works" removed** from homepage — redundant first section deleted; detailed second version retained
- **Homepage stat counts fixed** — stats block and CTA footer now show 358 stages / 10 tracks (were showing 346 / 9 in two places)
- **Demo page stats fixed** — was showing 169 stages; now 358
- **Brief icon and functionality removed** from CtfChallenge — `briefingOpen` state, Brief button, collapsible section, and helper text reference all removed
- **Admin stage access fixed** — `canAccessStage()` now bypasses tier check for admin username; admin no longer blocked by ProPaywall
- **VC Readiness Analysis** — `VC_READINESS_ANALYSIS.md` created, wired into admin docs panel (API allowlist + DocsViewer tab)
- **Deploy skill updated** — new doc file rule: any new `.md` requires API allowlist + DocsViewer entry + secured-docs placement
- **Legal docs updated** — LAUNCH_LEGAL.md, COPYRIGHT_FILING.md, business proposals stamped with entity details, incorporation date, and 83(b) deadline

---

## v1.8.3 — 2026-05-22

**Pitch deck updates, deploy skill security audit, SECURITY_BRIEFING header fix**

- Pitch docs stamped to v1.8.3: BUSINESS_PROPOSAL_PRO, BUSINESS_PROPOSAL_CASUAL, PITCH_TARGETS
- BUSINESS_PROPOSAL_PRO: Cisco section updated from "12-stage epoch" → 50-stage curriculum across 4 epochs; Team section corrected from "186-stage" → "358-stage"; CI bullet notes 0 ESLint errors
- BUSINESS_PROPOSAL_CASUAL: Track 6 expanded to document all 4 Cisco epochs; CI bullet updated
- PITCH_TARGETS: Cisco Investments entry updated to reflect 50-stage curriculum
- SECURITY_BRIEFING.md header `Date`/`Version` fields corrected to match v2.5 changelog entry (was showing stale v2.4 / 2026-05-20)
- Deploy skill `/deploy`: added `npm audit` and ESLint as pre-deploy gates; replaced lightweight step 8 with 6-pass security audit (dangerous patterns, API route auth/rate-limit check, session integrity, client exposure, new attack surface, header integrity)

---

## v1.8.2 — 2026-05-23

**Nonce-based CSP, ESLint clean (0 errors), GitHub CI secrets**

- Nonce-based CSP confirmed live — `proxy.ts` generates per-request nonce; `script-src` uses `nonce-{nonce}` with no `unsafe-inline`; `layout.tsx` reads `x-nonce` header and applies to anti-FOUC script
- ESLint: 0 errors — `argsIgnorePattern: ^_` added; `scripts/` added to globalIgnores; 7 files cleaned (admin/page.tsx, api/trophies/route.ts, Nav.tsx, api/shop/route.ts, journey/page.tsx, stages/page.tsx, Avatar.tsx)
- Upstash Redis secrets added to GitHub Actions (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- CI fully green on master

---

## v1.8.1 — 2026-05-22

**Homepage stage count, login rate limit tightening, CtfChallenge link fix**

- Homepage stage count updated 346 → 358
- Homepage inline CSS extracted to globals.css
- Login rate limit tightened: 5 attempts/15 min (was 10)
- `CtfChallenge.tsx`: `<a href="/stages">` → `<Link href="/stages">` (Next.js lint fix)

---

## v1.8.0 — 2026-05-22

**Security hardening, Pro tier, CI/CD pipeline, epoch #32**

- Epoch #32 `cisco-advanced` — 12 stages (stage-m39 → stage-m50), Cyan theme
- Pro tier access model — 7-day free trial based on `createdAt`; Stripe checkout ($5.99/mo, $55.99/yr); webhook lifecycle handling
- `ProPaywall` component — inline upgrade wall when trial expires; server-side enforcement in check-flag, check-answer, stage page
- Pro hints — HintDrawer gate (hints 2+ require Pro); HintChatbot no cooldown + unlimited messages for Pro users
- Admin tier toggle — per-user toggle in `/admin` writes `tier: pro|free` to Redis; overrides trial
- PBKDF2 iteration count bumped 100k → 310k (NIST SP 800-132); transparent re-hash on next login for existing accounts
- SESSION_SECRET separated from ADMIN_SECRET — session tokens now use dedicated secret
- NDA token timing attack fixed — `verifyNdaToken` now uses `timingSafeEqual`; hardcoded fallback secret removed
- Rate limiting added to `reset-password` endpoint (5 attempts/hour/IP)
- CI/CD — `dev` branch added; `.github/workflows/ci.yml` triggers on pushes to both `dev` and `master`; `--skipLibCheck` added to tsc step
- `src/proxy.ts` — active Turbopack middleware (replaced deleted `middleware.ts`)
- Open Graph + Twitter card meta tags added to `layout.tsx`
- Admin page: ⛵ Remote Desktop link (Chrome Remote Desktop), styled as button
- Today's Showcase fixed for admin users (was returning empty array)
- Vercel project corrected: deploy target is `kryptos-cronos` (serves kryptoscronos.com), not `app`

---

## v1.7.0 — 2026-05-20

**Baseball pitching curriculum (3 epochs, 30 stages); global nav on all pages; 334 stages total**

- baseball-5 "The Art of Pitching" — 10 stages: rubber/stance, grip, wind-up mechanics, arm action, release point, stretch/holding runners, velocity vs. location, pitch counts, PFP, mental approach (Kershaw focus throughout)
- baseball-6 "Pitch Arsenal" — 10 stages: four-seam, two-seam/sinker, changeup, curveball, slider, cutter (Rivera/Jansen), splitter/forkball (Nomo), spin rate/Rapsodo, pitch tunneling, age-based repertoire development
- baseball-7 "Pitching Strategy" — 10 stages: reading batters, working counts, sequencing, times-through-order, high-leverage approach, platoon matchups, video/Statcast prep, fatigue management, Dodger legends (Koufax → Kershaw)
- Global Nav moved to `layout.tsx` — appears on every page automatically
- Homepage: 334 stages, 10 tracks, Sports track updated to 70 stages
- Proprietary content audit complete — synthetic SSN `123-45-6789` replaced with `000-00-0001` in two CTF lab files (`owasp-llm.ts`, `mitre-atlas.ts`)

---

## v1.6.5 — 2026-05-20

**P1 audit — docs corrected to reflect actual security posture**

- All P1 items confirmed already implemented: PBKDF2 + HMAC session cookies (v1.3.0), server-only flag validation (`stage-flags.ts`), CI pipeline (`.github/workflows/ci.yml`)
- `SECURITY_BRIEFING.md` sections 1.3, 1.4, and Production Readiness Gaps updated from stale "acceptable for demo" to ✅ Resolved
- `TODO.md` Priority 1 updated with accurate status for all 5 items; only remaining action is Upstash backup (console setting)

---

## v1.6.4 — 2026-05-20

**To-Do & Roadmap doc in admin viewer**

- **`TODO.md`** — new doc listing 21 open items across 4 priority tiers: production blockers, curriculum gaps, product/UX, and go-to-market; plus known tech debt and recent completed items
- Added to `ALLOWED_FILES` and `DocsViewer` tab list (✅ To-Do & Roadmap, lime color)

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
