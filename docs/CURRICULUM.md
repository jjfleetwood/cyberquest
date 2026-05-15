# Kryptós CronOS — Curriculum Reference
**Version:** 2.0  
**Date:** 2026-05-11  
**Total stages:** 54 across 3 epochs

---

## Epoch 1: The Before Times
**Theme:** Beginner-friendly CTF challenges — accessible to complete newcomers  
**Stages:** 30 (bt-01 through bt-30)  
**Color:** Emerald  
**Unlock:** Default — shown first on stage map  
**Gating:** Sequential within epoch

The Before Times is the entry point — low-friction challenges designed to build confidence before learners hit the more technically dense Foundations and Cisco tracks. Each stage presents a simple CTF with real-world framing but beginner-appropriate difficulty.

---

## Epoch 2: Foundations
**Theme:** Core cybersecurity principles + OWASP Top 10 — set inside ancient world landmarks  
**Stages:** 12 (stage-01 through stage-12)  
**Color:** Amber  
**Unlock:** Available from start  
**Gating:** Sequential; Cisco epoch locked until all 12 are complete

| Stage | ID | Topic | CVE / OWASP | Setting | XP | Type |
|---|---|---|---|---|---|---|
| 1 | stage-01 | CIA Triad Foundations | — | Great Pyramid of Giza | 100 | CTF |
| 2 | stage-02 | AI Threat Detection | — | Colosseum, Rome | 150 | CTF |
| 3 | stage-03 | SQL Injection | OWASP A03, Heartland 2008 | Machu Picchu | 200 | CTF |
| 4 | stage-04 | Cross-Site Scripting (XSS) | Samy Worm 2005 | Petra, Jordan | 200 | CTF |
| 5 | stage-05 | Heartbleed | CVE-2014-0160, CVSS 7.5 | Angkor Wat | 250 | CTF |
| 6 | stage-06 | Broken Access Control | OWASP A01, AT&T iPad 2010 | Chichen Itza | 250 | CTF |
| 7 | stage-07 | Authentication Failures | LinkedIn 2012, 117M records | Stonehenge | 250 | CTF |
| 8 | stage-08 | Log4Shell | CVE-2021-44228, CVSS 10.0 | Hagia Sophia | 300 | CTF |
| 9 | stage-09 | WannaCry / EternalBlue | CVE-2017-0144, 150 countries | Tower of London | 300 | CTF |
| 10 | stage-10 | SSRF | OWASP A10, Capital One 2019 | Taj Mahal | 300 | CTF |
| 11 | stage-11 | Apache Struts / Equifax | CVE-2017-5638, 147M records | Acropolis, Athens | 350 | CTF |
| 12 | stage-12 | MongoDB Misconfiguration | OWASP A05 | Easter Island | 350 | CTF |

**Total XP available:** 2,950

---

## Epoch 3: Cisco
**Theme:** Real Cisco CVEs — framed as APT/spy operations  
**Stages:** 12 (stage-m01 through stage-m12)  
**Color:** Blue  
**Unlock:** Locked until all 12 Foundations stages are completed  
**Gating:** Sequential within epoch

Cisco epoch stages are written in a field-operative tone: the learner is an APT agent exploiting real Cisco vulnerabilities in real-world locations. Each stage maps to a documented Cisco CVE.

| Stage | ID | CVE | Vulnerability | Location | XP | Type |
|---|---|---|---|---|---|---|
| M1 | stage-m01 | CVE-2023-20198 | IOS XE HTTP admin bypass | Istanbul | 300 | CTF |
| M2 | stage-m02 | CVE-2016-6366 | SNMP buffer overflow | London | 300 | CTF |
| M3 | stage-m03 | CVE-2018-0171 | Smart Install remote code exec | Amman, Jordan | 350 | CTF |
| M4 | stage-m04 | CVE-2019-1653 | RV320 config disclosure | Chichen Itza | 350 | CTF |
| M5 | stage-m05 | CVE-2020-3452 | ASA/FTD path traversal | Athens | 350 | CTF |
| M6 | stage-m06 | CVE-2022-20695 | WLC auth bypass | Easter Island | 400 | CTF |
| M7 | stage-m07 | CVE-2021-1497 | HyperFlex HX command injection | Giza | 400 | CTF |
| M8 | stage-m08 | CVE-2023-20273 | IOS XE command injection | Rome | 400 | CTF |
| M9 | stage-m09 | CVE-2019-1821 | Prime Infrastructure RCE | Machu Picchu | 400 | CTF |
| M10 | stage-m10 | CVE-2020-3580 | ASA/FTD XSS | Petra | 450 | CTF |
| M11 | stage-m11 | CVE-2020-3187 | ASA path traversal | Angkor Wat | 450 | CTF |
| M12 | stage-m12 | CVE-2017-6736 | IOS TFTP RCE | Stonehenge | 450 | CTF |

**Total XP available:** 4,200

---

## XP Summary

| Epoch | Stages | Max XP |
|---|---|---|
| The Before Times | 30 | ~1,500 (varies) |
| Foundations | 12 | 2,950 |
| Cisco | 12 | 4,200 |
| **Total** | **54** | **~8,650** |

---

## Stage Structure

Every stage follows this four-part flow:

### 1. Stage Briefing (StageInfo component)
- **Overview:** Plain-language explanation of the vulnerability
- **Attack Flow Diagram:** Visual showing attacker → system → victim → outcome
- **Technical Deep Dive:** Mechanism, code examples, how it works
- **Historical Incident:** The real-world breach that made this vulnerability famous
- **Timeline:** Key events in the incident
- **References:** CVE entries, OWASP links, post-mortems

### 2. CTF Challenge (CtfChallenge component)
- Simulated bash terminal
- Filesystem modeled on the real affected system (e.g., Log4Shell-vulnerable logging server)
- Built-in commands: `ls`, `cat`, `cd`, `submit`, `hint`, `help`, `pwd`, `clear`
- Stage-specific commands implemented as TypeScript closures in `stages.ts`
- Progressive hints: up to 3, revealed one at a time via `hint`

### 3. Reference Drawer
- Slide-in panel available during CTF — full briefing accessible without leaving the terminal
- Models how real security professionals work (documentation always open)

### 4. Completion
- XP awarded server-side (computed from STAGE_XP map in `/api/progress`, not client-submitted)
- Badge unlocked (displayed on leaderboard and stage map)
- Next stage unlocked in sequence

---

## Badge Library

Each stage awards a unique badge. Examples:

| Badge | Stage | Emoji |
|---|---|---|
| Triad Guardian | CIA Triad | 🛡️ |
| AI Scout | AI Detection | 🤖 |
| SQL Slayer | SQL Injection | 💉 |
| XSS Slayer | XSS | 🕷️ |
| Zero Day Hunter | Heartbleed | 🩸 |
| Access Denied | Broken Access Control | 🚫 |
| Hash Cracker | Auth Failures | 🔓 |
| Log4Shell Hunter | Log4Shell | 🔥 |
| WannaCry Stopper | WannaCry | 💀 |
| SSRF Agent | SSRF | 🌐 |
| Equifax Breaker | Equifax/Struts | 💳 |
| MongoDB Marshal | MongoDB | 🗄️ |

---

## Roadmap: Content Additions

Planned content for v1.x:

- **Streaks & milestones** — daily login streaks, weekly challenge events
- **AI adaptive difficulty** — harder variants unlock based on solve time
- **Personalized paths** — role-based sequencing (developer, sysadmin, executive)
- **In-terminal AI tutor** — natural language Q&A during CTF (Anthropic API)
- **Weekly CVE drops** — new challenge each week based on real CVEs published in the last 7 days
- **Additional epochs** — Cloud Security (AWS/Azure misconfigs), Mobile Security, Social Engineering
