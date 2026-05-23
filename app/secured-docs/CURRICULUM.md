# Kryptós CronOS — Curriculum Reference
**Version:** 3.3  
**Date:** 2026-05-22  
**Total stages:** 358 across 32 epochs

---

## Epoch 1: Our First Journey
**Theme:** Beginner-friendly CTF challenges — accessible to complete newcomers  
**Stages:** 30 (bt-01 through bt-30)  
**Color:** Emerald  
**Unlock:** Default — shown first on stage map  
**Gating:** Sequential within epoch

Our First Journey is the entry point — low-friction challenges designed to build confidence before learners hit the more technically dense Foundations and Cisco tracks. Each stage presents a simple CTF with real-world framing but beginner-appropriate difficulty.

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

## Epoch 3: Cisco — Core CVEs
**Theme:** Foundational Cisco CVEs — NSA exploits, network infrastructure attacks  
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

## Epoch 4: Cisco — Enterprise Attack
**Theme:** Nation-state campaigns and advanced CVEs across the Cisco enterprise portfolio  
**Stages:** 13 (stage-m13 through stage-m25)  
**Color:** Indigo  
**Unlock:** Sequential after Cisco Core  
**Gating:** Sequential within epoch

Advanced exploitation across Cisco's enterprise portfolio — ASA, NX-OS, SD-WAN, Expressway, and the ArcaneDoor and Velvet Ant nation-state campaigns.

---

## Epoch 5: Cisco — Security Operations
**Theme:** CyberOps, threat hunting, and zero-day defense using Cisco security platforms  
**Stages:** 13 (stage-m26 through stage-m38)  
**Color:** Violet  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Cisco security platform operations and CyberOps Associate skills — Firepower, Umbrella, ISE, SecureX/XDR, SOC triage, threat hunting, and the IOS XE CVSS 10.0 zero-day.

---

## Epoch 6: Cisco — Advanced Defense
**Theme:** Firepower, XDR, DevNet, Silicon One, and post-quantum IKEv2  
**Stages:** 12 (stage-m39 through stage-m50)  
**Color:** Cyan  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Next-generation Cisco security — Firepower NGIPS/FTD evasion and CVEs, Cisco XDR threat hunting, DevNet API and NETCONF/YANG security, Silicon One P4 pipeline integrity, and post-quantum IKEv2 with ML-KEM-768.

---

## Epoch 7: Tech Audit — Foundations
**Theme:** Technology audit methodology — foundational concepts and frameworks  
**Stages:** 12 (audit-01 through audit-12)  
**Color:** Purple  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Master IT audit methodology using ISACA standards — COBIT, CISA, CRISC, and ITGC. Each stage simulates a real audit engagement at a major institution, from risk assessment to audit reporting.

---

## Epoch 8: Tech Audit — Technical
**Theme:** API security, secrets management, and cloud guardrail testing  
**Stages:** 12 (audit-t01 through audit-t12)  
**Color:** Violet  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Hands-on technical audit testing — enumerate and exploit API misconfigurations, hunt for exposed secrets, audit IAM policies, test cloud guardrails, scan IaC templates, and validate container security controls.

---

## Epoch 9: Tech Audit — Agentic Continuous Monitoring
**Theme:** AI-assisted and autonomous audit techniques using Claude tools  
**Stages:** 12 (audit-a01 through audit-a12)  
**Color:** Indigo  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Automate the full audit lifecycle using Claude's tool use API and MCP servers — agentic API enumeration, AI-powered secrets scanning, automated compliance report generation, and multi-agent audit pipeline design.

---

## Epoch 10: Continuous Monitoring 2.0
**Theme:** AI-powered detection and response — the full stack of modern SOC operations  
**Stages:** 12 (audit-cm01 through audit-cm12)  
**Color:** Rose  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Master next-generation continuous monitoring: ML-enhanced SIEM, UEBA, NDR, CSPM, SOAR automation, deception technology, Zero Trust telemetry, XDR, and compliance monitoring.

---

## Epoch 11: MITRE ATT&CK
**Theme:** Adversarial tactics, techniques, and procedures mapped to the MITRE ATT&CK framework  
**Stages:** 12 (mitre-01 through mitre-12)  
**Color:** Red  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Each stage maps to a specific ATT&CK tactic (Reconnaissance, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command & Control, Exfiltration, Impact). Learners simulate both attacker and defender roles using the ATT&CK navigator framework.

---

## Epoch 12: MITRE ATLAS
**Theme:** AI threat landscape — adversarial attacks on machine learning systems  
**Stages:** 12 (atlas-01 through atlas-12)  
**Color:** Fuchsia  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) covers ML-specific attack vectors: adversarial examples, model inversion, data poisoning, model theft, prompt injection, and evasion attacks on AI classifiers. Each stage maps to an ATLAS technique.

---

## Epoch 13: OWASP LLM Top 10
**Theme:** Security risks specific to Large Language Model applications  
**Stages:** 12 (llm-01 through llm-12)  
**Color:** Orange  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Covers the OWASP Top 10 for Large Language Model Applications (2025): prompt injection, insecure output handling, training data poisoning, model denial of service, supply chain vulnerabilities, sensitive information disclosure, insecure plugin design, excessive agency, overreliance, and model theft.

---

## Epoch 14: Quantum Foundations
**Theme:** Qubits, Shor's Algorithm, and cryptographic threats from quantum computing  
**Stages:** 10 (quantum-01 through quantum-10)  
**Color:** Cyan  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Understand how quantum computing threatens the cryptographic foundations of the modern internet — from RSA to AES. Explore superposition, entanglement, Shor's Algorithm, and the Harvest Now, Decrypt Later threat that is already underway.

---

## Epoch 15: Post-Quantum Cryptography
**Theme:** NIST PQC standards and implementation — replacing RSA and ECC  
**Stages:** 10 (quantum-b01 through quantum-b10)  
**Color:** Teal  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Master the post-quantum cryptography standards that will replace RSA and ECC — CRYSTALS-Kyber (ML-KEM), CRYSTALS-Dilithium (ML-DSA), FALCON (FN-DSA), and SPHINCS+ (SLH-DSA). Learn the mathematics behind lattice-based cryptography and implement PQC in real systems.

---

## Epoch 16: Quantum Security
**Theme:** QKD, cryptographic agility, and enterprise PQC migration  
**Stages:** 10 (quantum-c01 through quantum-c10)  
**Color:** Sky  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Deploy quantum-safe infrastructure end-to-end — BB84 QKD protocols, quantum key distribution networks, cryptographic agility frameworks, quantum-safe VPNs and PKI, liboqs integration, FIPS 140-3 compliance, and full enterprise PQC migration planning.

---

## Epoch 17: Cisco Umbrella
**Theme:** DNS-layer security and threat intelligence  
**Stages:** 10 (umbrella-01 through umbrella-10)  
**Color:** Indigo  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Master DNS-layer security with Cisco Umbrella — the world's most deployed cloud security platform. From DNS tunneling to DGA detection, from lookalike domains to DoH evasion, each mission puts you inside a real Umbrella SOC investigation.

---

## Epoch 18: The Woven World (Tapestry)
**Theme:** 3,000 years of tapestry history, technique, and modern practice  
**Stages:** 12 (tapestry-01 through tapestry-12)  
**Color:** Yellow  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Travel through 3,000 years of tapestry: from Egyptian tombs and Andean mummy wrappings to the great Flemish workshops, Persian courts, Navajo hogans, and the modern artist's studio. Learn to weave, mix colors on the loom, and read the language of thread.

---

## Epoch 19: Nails
**Theme:** Nail care, art techniques, and professional nail services  
**Stages:** 10 (nails-01 through nails-10)  
**Color:** Pink  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Comprehensive nail education from anatomy and sanitation to gel systems, acrylics, nail art design, and building a nail business. Covers professional standards for licensed nail technicians.

---

## Epoch 20: Hair Coloring
**Theme:** Hair color chemistry, application, and professional technique  
**Stages:** 10 (hair-color-01 through hair-color-10)  
**Color:** Rose  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Understand how hair absorbs color, master the level system, learn developer and lift, choose between permanent and semi-permanent formulas, apply safely, bleach and tone, correct color mistakes, and build a hair coloring business.

---

## Epoch 21: Hair Styling
**Theme:** Professional hair styling tools, technique, and business  
**Stages:** 10 (hs-01 through hs-10)  
**Color:** Violet  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Master the full toolkit of professional hair styling — from understanding hair types and heat science to braiding, curls, and client-ready updos. Covers business development for licensed stylists.

---

## Epoch 22: Road to Your License
**Theme:** CA DMV written test preparation and driver knowledge  
**Stages:** 8 (driving-1-01 through driving-1-08)  
**Color:** Green  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Complete CA DMV written test prep covering traffic laws, signs, signals, right-of-way rules, speed limits, and safe driving principles. Designed to pass the California DMV knowledge test.

---

## Epoch 23: First Miles
**Theme:** Beginning driver skills — from cockpit checks to highway merging  
**Stages:** 8 (driving-2-01 through driving-2-08)  
**Color:** Lime  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Build real confidence behind the wheel — from cockpit checks and smooth starts to highway merging and night driving. Covers practical skills for new drivers in the first months behind the wheel.

---

## Epoch 24: Rules of the Road
**Theme:** Advanced road wisdom and defensive driving techniques  
**Stages:** 8 (driving-3-01 through driving-3-08)  
**Color:** Orange  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Passing the test is just the beginning. Master distraction awareness, defensive technique, handling emergencies, and developing the mindset of a genuinely safe, thoughtful driver.

---

## Epoch 25: Standing Tall
**Theme:** Understanding and living with clubfoot (talipes equinovarus)  
**Stages:** 6 (clubfoot-01 through clubfoot-06)  
**Color:** Teal  
**Unlock:** Locked by default (admin-enabled)  
**Gating:** Sequential within epoch

Explore the history, science, and human story of talipes equinovarus — one of the most common birth differences in the world. From ancient treatments to the modern Ponseti revolution, learn how families and communities support those who stand a little differently.

---

## Epochs 26–32: Baseball Track

### Epoch 26: Play Ball!
**Theme:** Little League fundamentals — rules, positions, and basic skills  
**Stages:** 10 (baseball-1-01 through baseball-1-10)  
**Color:** Red

Learn America's game from the ground up — the diamond, the rules, how to hit, pitch, field, and run the bases with confidence. For brand-new players and anyone looking to sharpen fundamentals.

### Epoch 27: The Art of Hitting
**Stages:** 10 (baseball-2-01 through baseball-2-10) | **Color:** Blue

Hitting mechanics deep dive: stance, pitch recognition, swing plane, plate discipline, power development, contact adjustments, and legendary Dodger hitters from Jackie Robinson to Shohei Ohtani.

### Epoch 28: Advanced Mechanics
**Stages:** 10 (baseball-3-01 through baseball-3-10) | **Color:** Violet

The science of the elite swing — hip-shoulder separation, barrel management, attack angle optimization, sequencing, and how Statcast metrics translate to on-field adjustments.

### Epoch 29: Elite Mastery
**Stages:** 10 (baseball-4-01 through baseball-4-10) | **Color:** Amber

Statcast analytics, advanced scouting, clutch at-bat approach, and the greatest Dodger hitters of all time. For players ready to think like professionals.

### Epoch 30: The Art of Pitching
**Stages:** 10 (baseball-5-01 through baseball-5-10) | **Color:** Green

Pitching mechanics, arm care, PFP (pitcher fielding practice), and the fundamentals of every pitch type. Kershaw-focused masterclass on the craft of pitching.

### Epoch 31: Pitch Arsenal
**Stages:** 10 (baseball-6-01 through baseball-6-10) | **Color:** Red

All pitch types from grip to release — fastball, curveball, slider, changeup, cutter, splitter. Spin rate, tunneling, deception, and age-appropriate progression for developing pitchers.

### Epoch 32: Pitching Strategy
**Stages:** 10 (baseball-7-01 through baseball-7-10) | **Color:** Indigo

The chess match on the mound — count management, pitch sequencing, platoon splits, situational pitching, and Dodger pitching legends from Koufax to Kershaw.

---

## XP Summary

| # | Epoch | Stages | Max XP (approx) |
|---|---|---|---|
| 1 | Our First Journey | 30 | ~1,500 |
| 2 | Foundations | 12 | 2,950 |
| 3 | Cisco: Core CVEs | 12 | 4,200 |
| 4 | Cisco: Enterprise Attack | 13 | ~5,200 |
| 5 | Cisco: Security Operations | 13 | ~5,200 |
| 6 | Cisco: Advanced Defense | 12 | ~4,800 |
| 7 | Tech Audit: Foundations | 12 | ~3,600 |
| 8 | Tech Audit: Technical | 12 | ~3,600 |
| 9 | Tech Audit: Agentic | 12 | ~3,600 |
| 10 | Continuous Monitoring 2.0 | 12 | ~3,600 |
| 11 | MITRE ATT&CK | 12 | ~4,200 |
| 12 | MITRE ATLAS | 12 | ~4,200 |
| 13 | OWASP LLM Top 10 | 12 | ~4,200 |
| 14 | Quantum Foundations | 10 | ~3,500 |
| 15 | Post-Quantum Cryptography | 10 | ~3,500 |
| 16 | Quantum Security | 10 | ~3,500 |
| 17 | Cisco Umbrella | 10 | ~3,500 |
| 18 | The Woven World (Tapestry) | 12 | ~1,200 |
| 19 | Nails | 10 | ~1,000 |
| 20 | Hair Coloring | 10 | ~1,000 |
| 21 | Hair Styling | 10 | ~1,000 |
| 22 | Road to Your License | 8 | ~800 |
| 23 | First Miles | 8 | ~800 |
| 24 | Rules of the Road | 8 | ~800 |
| 25 | Standing Tall | 6 | ~600 |
| 26 | Play Ball! | 10 | ~1,000 |
| 27 | The Art of Hitting | 10 | ~1,000 |
| 28 | Advanced Mechanics | 10 | ~1,000 |
| 29 | Elite Mastery | 10 | ~1,000 |
| 30 | The Art of Pitching | 10 | ~1,000 |
| 31 | Pitch Arsenal | 10 | ~1,000 |
| 32 | Pitching Strategy | 10 | ~1,000 |
| | **Total** | **358** | **~77,350** |

---

## Stage Structure

Every stage follows this four-part flow:

### 1. Stage Briefing (StageInfo component)
- **Overview:** Plain-language explanation of the vulnerability or concept
- **Attack Flow Diagram:** Visual showing attacker → system → victim → outcome
- **Technical Deep Dive:** Mechanism, code examples, how it works
- **Historical Incident:** The real-world breach or case study that made this topic relevant
- **Timeline:** Key events in the incident
- **References:** CVE entries, OWASP links, MITRE ATT&CK/ATLAS entries, post-mortems

### 2. CTF Challenge (CtfChallenge component)
- Simulated bash terminal
- Filesystem modeled on the real affected system
- Built-in commands: `ls`, `cat`, `cd`, `submit`, `hint`, `help`, `pwd`, `clear`
- Stage-specific commands implemented as TypeScript closures in stage data files
- Progressive hints: up to 3, revealed one at a time via `hint`
- ARIA chatbot available for AI-assisted coaching

### 3. Reference Drawer
- Slide-in panel available during CTF — full briefing accessible without leaving the terminal
- Models how real security professionals work (documentation always open)

### 4. Completion
- XP awarded server-side (computed from STAGE_XP map in `/api/progress`, not client-submitted)
- Badge unlocked (displayed on leaderboard and stage map)
- Skills Acquired summary shown in FlagSuccessModal
- Streak updated in Redis; milestone badges checked (m-xp-1k, m-xp-5k, m-streak-3, m-streak-7)
- Next stage unlocked in sequence

---

## Milestone Badges

| Badge ID | Trigger | Description |
|---|---|---|
| `m-xp-1k` | 1,000 XP total | XP milestone |
| `m-xp-5k` | 5,000 XP total | XP milestone |
| `m-streak-3` | 3-day login streak | Consistency milestone |
| `m-streak-7` | 7-day login streak | Consistency milestone |

---

## Badge Library (Foundations Epoch Examples)

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
