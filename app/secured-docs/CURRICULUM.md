# Kryptós CronOS — Curriculum Reference
**Version:** 3.2  
**Date:** 2026-05-19  
**Total stages:** 198 across 15 epochs

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

## Epoch 4: Tech Audit — Foundations
**Theme:** Technology audit methodology — foundational concepts and frameworks  
**Stages:** 12 (audit-01 through audit-12)  
**Color:** Purple  
**Unlock:** Sequential unlock after completing prior epochs  
**Gating:** Sequential within epoch

Covers the fundamentals of conducting technology audits: scope definition, risk frameworks, evidence collection, audit trails, and reporting standards. Designed for learners moving into compliance, assurance, and governance roles.

---

## Epoch 5: Tech Audit — Technical
**Theme:** Technical audit execution — hands-on system and infrastructure assessment  
**Stages:** 12 (audit-t01 through audit-t12)  
**Color:** Violet  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Hands-on technical audit scenarios: network scanning, configuration review, log analysis, vulnerability assessment, and evidence documentation. Bridges cybersecurity skills with formal audit methodology.

---

## Epoch 6: Tech Audit — Agentic
**Theme:** AI-assisted and autonomous audit techniques  
**Stages:** 12 (audit-a01 through audit-a12)  
**Color:** Indigo  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Covers the emerging field of agentic security auditing: AI-assisted threat modeling, automated control testing, LLM-powered log analysis, and the risks of deploying autonomous agents in security-sensitive environments.

Each stage includes a **downloadable Python MCP server template** — a self-contained, runnable implementation of the agentic audit tool taught in that lesson. Templates follow the Claude tool use agentic loop pattern and can be run locally with `pip install anthropic`.

| Stage | ID | MCP Template |
|---|---|---|
| 1 | audit-a01 | IAM audit tool use — core agentic loop pattern |
| 2 | audit-a02 | API enumeration via OpenAPI spec fetching |
| 3 | audit-a03 | Secrets scanning — regex + Claude semantic detection |
| 4 | audit-a04 | Cloud enumeration — boto3 S3/EC2/IAM/CloudTrail |
| 5 | audit-a05 | IAM privilege escalation path detection |
| 6 | audit-a06 | MCP integration — filesystem + git + web fetch |
| 7 | audit-a07 | IaC review — Terraform plan + CIS Benchmark checks |
| 8 | audit-a08 | SOC 2 evidence collection across CC6.1, CC7.2, CC6.7, A1.2 |
| 9 | audit-a09 | Multi-agent orchestration — coordinator + specialist pattern |
| 10 | audit-a10 | Risk report writing with framework mapping (SOC2/ISO/NIST/CIS) |
| 11 | audit-a11 | Sentinel — scheduled compliance agent with drift detection |
| 12 | audit-a12 | Full pipeline — collect → analyze → report → alert |

---

## Epoch 6b: Tech Audit — Continuous Monitoring 2.0
**Theme:** Automated, always-on security monitoring and SOC operations  
**Stages:** 12 (audit-cm01 through audit-cm12)  
**Color:** Rose  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Covers the operational layer of enterprise security: continuous monitoring frameworks, next-gen SIEM with ML anomaly detection, UEBA behavioral risk scoring, network detection, cloud posture management, threat intelligence integration, SOAR automation, deception technology, Zero Trust architecture, XDR cross-source correlation, continuous compliance, and SOC maturity measurement.

Each stage includes a **downloadable Python MCP server template** implementing the monitoring tool or pipeline taught in the lesson.

| Stage | ID | MCP Template | Real Incident Anchor |
|---|---|---|---|
| 1 | audit-cm01 | NIST SP 800-137 ISCM baseline + posture scoring | OPM breach — 14-month dwell time |
| 2 | audit-cm02 | SIEM + ML anomaly detection + attack chain correlation | SolarWinds SUNBURST — signature detection failure |
| 3 | audit-cm03 | UEBA risk scoring + insider threat chain detection | Tesla insider exfiltration |
| 4 | audit-cm04 | NDR beaconing detection via Zeek conn.log | Hafnium Exchange zero-day |
| 5 | audit-cm05 | CSPM attack path mapping (SSRF → IMDS → IAM → S3) | Capital One — IMDSv1 + s3:* chain |
| 6 | audit-cm06 | STIX/TAXII threat intel + Sigma rule generation | Volt Typhoon Five Eyes advisory |
| 7 | audit-cm07 | SOAR playbook automation (P1–P4 triage) | Twilio cascade breach |
| 8 | audit-cm08 | Honeytoken deployment + trigger event analysis | Uber hard-coded credential breach |
| 9 | audit-cm09 | Zero Trust CARTA scoring + access decision engine | Google Aurora → BeyondCorp origin |
| 10 | audit-cm10 | XDR cross-source correlation (EDR + NDR + IdP graph) | Lapsus$ Microsoft source code breach |
| 11 | audit-cm11 | Continuous compliance engine (NIST SP 800-53) | FTC Drizly CEO personal liability order |
| 12 | audit-cm12 | SOC maturity scorecard (MTTD/MTTR benchmarking) | MGM Resorts $100M+ ransomware event |

---

## Epoch 7: MITRE ATT&CK
**Theme:** Adversarial tactics, techniques, and procedures mapped to the MITRE ATT&CK framework  
**Stages:** 12 (mitre-01 through mitre-12)  
**Color:** Red  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Each stage maps to a specific ATT&CK tactic (Reconnaissance, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command & Control, Exfiltration, Impact). Learners simulate both attacker and defender roles using the ATT&CK navigator framework.

---

## Epoch 8: MITRE ATLAS
**Theme:** AI threat landscape — adversarial attacks on machine learning systems  
**Stages:** 12 (atlas-01 through atlas-12)  
**Color:** Fuchsia  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) covers ML-specific attack vectors: adversarial examples, model inversion, data poisoning, model theft, prompt injection, and evasion attacks on AI classifiers. Each stage maps to an ATLAS technique.

---

## Epoch 9: OWASP LLM Top 10
**Theme:** Security risks specific to Large Language Model applications  
**Stages:** 12 (llm-01 through llm-12)  
**Color:** Orange  
**Unlock:** Sequential  
**Gating:** Sequential within epoch

Covers the OWASP Top 10 for Large Language Model Applications: prompt injection, insecure output handling, training data poisoning, model denial of service, supply chain vulnerabilities, sensitive information disclosure, insecure plugin design, excessive agency, overreliance, and model theft. Stages simulate real LLM application attack scenarios.

---

## XP Summary

| Epoch | Stages | Max XP |
|---|---|---|
| Our First Journey | 30 | ~1,500 (varies) |
| Foundations | 12 | 2,950 |
| Cisco | 12 | 4,200 |
| Tech Audit: Foundations | 12 | ~3,600 (varies) |
| Tech Audit: Technical | 12 | ~3,600 (varies) |
| Tech Audit: Agentic | 12 | ~3,600 (varies) |
| Continuous Monitoring 2.0 | 12 | ~3,600 (varies) |
| MITRE ATT&CK | 12 | ~4,200 (varies) |
| MITRE ATLAS | 12 | ~4,200 (varies) |
| OWASP LLM Top 10 | 12 | ~4,200 (varies) |
| Quantum Era — Threats | 12 | ~3,600 (varies) |
| Quantum Era — PQC | 12 | ~3,600 (varies) |
| Quantum Era — QKD | 12 | ~3,600 (varies) |
| Defend the Enterprise | 12 | ~3,600 (varies) |
| The Woven World (Tapestry) | 12 | ~1,200 (varies) |
| **Total** | **198** | **~51,850** |

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
- **Code Templates** (Tech Audit epochs only): downloadable Python MCP server file implementing the agentic tool taught in the lesson; runnable locally with `pip install anthropic`

### 2. CTF Challenge (CtfChallenge component)
- Simulated bash terminal
- Filesystem modeled on the real affected system (e.g., Log4Shell-vulnerable logging server)
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

In addition to per-stage badges, milestone badges are awarded for XP and streak thresholds:

| Badge ID | Trigger | Description |
|---|---|---|
| `m-xp-1k` | 1,000 XP total | XP milestone |
| `m-xp-5k` | 5,000 XP total | XP milestone |
| `m-streak-3` | 3-day login streak | Consistency milestone |
| `m-streak-7` | 7-day login streak | Consistency milestone |

---

## Badge Library (Foundations Epoch Examples)

Each stage awards a unique badge:

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
