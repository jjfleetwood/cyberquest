import type { StageConfig } from "./types";

export const cisco5Stages: StageConfig[] = [

  // ─── Stage m39: Cisco Firepower NGIPS — IPS Evasion via Fragmentation ─────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Firepower Lab", location: "Research Triangle Park, North Carolina, USA", era: "2024 CE", emoji: "🔥" },
    id: "stage-m39",
    order: 39,
    title: "Fire Escape",
    subtitle: "Cisco Firepower NGIPS — Intrusion Detection Bypass via TCP Segmentation and Fragmentation Evasion",
    category: "cybersecurity",
    xp: 120,
    badge: { id: "badge-m-firepower", name: "Firepower Auditor", emoji: "🔥" },
    challengeType: "ctf",
    info: {
      tagline: "An IPS that can be tricked by packet fragmentation is only security theater — the attacker controls the reassembly.",
      year: 2024,
      overview: [
        "Cisco Firepower is Cisco's Next-Generation Intrusion Prevention System (NGIPS), integrated into both the Firepower Threat Defense (FTD) software and the dedicated Firepower appliances. It inspects network traffic in real time against Snort 3 rule signatures, performs deep packet inspection (DPI), and enforces application-layer security policies. Firepower Management Center (FMC) provides centralized policy management across all sensors.",
        "Despite its capabilities, Firepower — like all signature-based IPS platforms — is vulnerable to evasion techniques that manipulate how packets are fragmented, reordered, or overlapped at the network layer. TCP segmentation evasion splits a malicious payload across multiple segments below the IPS's minimum reassembly threshold. IP fragmentation evasion splits the IP datagram so that the malicious payload signature never appears in a single fragment. Time-to-live (TTL) manipulation sends decoy packets that reach the IPS but expire before reaching the endpoint.",
        "Understanding these evasion techniques is essential for both red team operators testing IPS effectiveness and defenders tuning Firepower policies. The Cisco Firepower IPS includes inline normalization preprocessors that counteract most classical evasion methods — but only when correctly enabled and tuned. Default configurations often leave these protections disabled for performance reasons.",
      ],
      technical: {
        title: "TCP/IP Fragmentation Evasion — Splitting Payloads Past IPS Signature Boundaries",
        body: [
          "Snort-based IPS signatures match on byte sequences within reassembled packet payloads. A fragmentation evasion attack deliberately splits the malicious payload across fragment boundaries so that no single fragment contains the signature match. For example, a SQL injection payload `' OR 1=1--` split as `' OR 1` / `=1--` across two fragments may evade a Snort rule that requires the full sequence. The endpoint's TCP stack reassembles the fragments into the full payload, executing the injection.",
          "Cisco Firepower's Stream preprocessor and Frag3 module are designed to normalize traffic before signature matching — they reassemble fragments and TCP streams before passing them to the detection engine. When enabled with `stream_tcp policy windows` (or the appropriate OS policy for the endpoint), Firepower performs the same reassembly the endpoint does, defeating most fragmentation evasion. The key failure mode is misconfigured or disabled stream reassembly policies.",
          "Modern evasion testing uses tools like Fragroute, Scapy, or Nmap's fragmentation flags (`-f`, `--mtu`) to automate fragmented payload delivery. Blue team validation: run Snort/Firepower in inline mode with all preprocessors enabled, then replay known-bad signatures with fragmentation offsets and verify detection. Any missed detection indicates a preprocessor gap.",
        ],
        codeExample: {
          label: "IPS evasion test — fragmented SQL injection payload via Scapy",
          code: `# Evasion technique: split SQL injection payload across IP fragments
# Normal payload (detected by IPS): GET /?id=' OR 1=1--
# Fragmented: fragment 1 = GET /?id=' OR  |  fragment 2 = 1=1--

from scapy.all import *

target = "192.0.2.10"
payload1 = b"GET /?id=' OR "
payload2 = b"1=1-- HTTP/1.1\\r\\nHost: target\\r\\n\\r\\n"

# Fragment 1: first 14 bytes of HTTP payload
pkt1 = IP(dst=target, flags="MF", frag=0) / payload1
# Fragment 2: remaining payload, offset=2 (14 bytes / 8)
pkt2 = IP(dst=target, flags=0, frag=2) / payload2

send(pkt1)
send(pkt2)

# Firepower detection check:
# FMC > Analysis > Intrusion Events — should show SQL injection alert
# If no alert: stream reassembly preprocessor may be disabled or misconfigured

# Verify preprocessor status on FTD:
# > system support diagnostic-cli
# > show snort preprocessor statistics`,
        },
      },
      incident: {
        title: "Fragmentation Evasion in Production — IPS Bypass at Financial Institution",
        when: "2023 (composite of documented red team findings across enterprise deployments)",
        where: "Financial services firm — Firepower 4140 in inline IPS mode protecting trading platform APIs",
        impact: "Red team successfully delivered SQL injection and XSS payloads past IPS sensor; attack dwell time extended by weeks before blue team tuning corrected stream policy configuration",
        body: [
          "In a documented 2023 red team engagement at a financial services firm, the Firepower 4140 appliances had been deployed with the default 'balanced' performance profile, which disabled IP fragment reassembly for traffic exceeding 8KB to preserve throughput. The red team used Scapy to deliver fragmented SQL injection payloads against the trading platform API — none were detected because Frag3 reassembly was not active for the affected traffic class.",
          "The root cause was a documented Cisco deployment choice: Firepower's high-availability and performance profiles trade detection completeness for throughput. For low-latency trading environments, the 'connectivity over security' inline normalization policy disables fragmentation reassembly. The correct posture for high-security environments is 'security over connectivity' — enabling all normalizers at the cost of some throughput. The engagement report drove a policy audit across the firm's 47 Firepower sensors.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "fragmented SQL injection — payload split across fragments", type: "attacker" },
          { label: "Firepower IPS", sub: "Frag3 disabled — no reassembly — no signature match", type: "system" },
          { label: "Target API Server", sub: "TCP stack reassembles → full injection payload executed", type: "victim" },
          { label: "IPS Bypass", sub: "zero alerts in FMC — attack invisible to security team", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "Ptacek & Newsham publish 'Insertion, Evasion, and Denial of Service' — foundational IDS evasion research" },
        { year: 2013, event: "Cisco acquires Sourcefire (Snort creator) — Firepower NGIPS becomes Cisco's primary IPS platform" },
        { year: 2018, event: "Cisco introduces Snort 3 in Firepower with improved stream reassembly and application-layer detection" },
        { year: 2022, event: "CISA guidance on IPS configuration: recommends 'security over connectivity' profile for all critical infrastructure", highlight: true },
        { year: 2024, event: "Firepower 7.4: enhanced encrypted traffic analytics (ETA) using ML to detect evasion in TLS traffic" },
      ],
      keyTakeaways: [
        "Enable Frag3 IP reassembly and TCP stream normalization with OS-appropriate policies — never leave them at default for high-security environments",
        "Use Snort 3's 'security over connectivity' normalization policy for all traffic touching critical assets",
        "Validate IPS detection with regular evasion testing — a misconfigured preprocessor is a silent gap",
        "Firepower's Encrypted Traffic Analytics (ETA) detects evasion techniques hidden in TLS without decryption — enable it",
      ],
      references: [
        { title: "Cisco Firepower — Snort 3 Configuration Guide", url: "https://www.cisco.com/c/en/us/td/docs/security/firepower/snort3/configuration-guide/snort3-configuration-guide.html" },
        { title: "Cisco FMC — Inline Normalization Preprocessor", url: "https://www.cisco.com/c/en/us/td/docs/security/firepower/640/configuration/guide/fpmc-config-guide-v64/ips_inline_normalization.html" },
        { title: "CISA — IPS/IDS Hardening Guidance", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-278a" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "192.0.2.10",
        hostname: "fp-2140",
        os: "Cisco Firepower 2140 — Snort 3.0 (Frag3 disabled)",
        openPorts: "443/tcp (web API behind IPS)",
        vulnerability: "Frag3 reassembly disabled — fragmented payload IPS bypass",
      },
      pivotTrigger: "frag-probe",
      scenario: "A Cisco Firepower 2140 in inline IPS mode protects a web application API. Security auditors suspect the stream reassembly preprocessor is misconfigured. Test the IPS with a fragmented payload, identify the gap, tune the policy, and retrieve the hardening flag.",
      hint: "Read the audit brief, check the IPS preprocessor config, send a fragmented probe, fix the policy, then verify detection.",
      hints: [
        "Start: cat audit-brief.txt",
        "Check Firepower preprocessor config: fp-config show-preprocessors",
        "Send fragmented SQL injection probe: frag-probe 192.0.2.10",
        "Apply security normalization policy: fp-policy set security-over-connectivity",
        "Verify detection is now active: fp-verify",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/audit-brief.txt", value: "FLAG{fp_", label: "Audit Brief — Firepower Target" },
        { trigger: "fp-config show-preprocessors", value: "frag3_", label: "Config Reviewed — Frag3 Disabled Confirmed" },
        { trigger: "frag-probe 192.0.2.10", value: "evasion_", label: "Probe Sent — IPS Bypass Confirmed" },
        { trigger: "fp-verify", value: "fixed}", label: "Policy Fixed — Fragmentation Evasion Now Detected" },
      ],
      files: {
        "/audit-brief.txt": [
          "FIREPOWER AUDIT: FRAGMENTATION EVASION TEST",
          "Sensor: Firepower 2140 — inline IPS mode",
          "Concern: stream preprocessor may be disabled (performance profile)",
          "",
          "Objective: confirm bypass, tune policy, verify detection",
          "Sequence: fp-config show-preprocessors → frag-probe 192.0.2.10",
          "         → fp-policy set security-over-connectivity → fp-verify → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "audit-brief.txt", isDir: false }] },
      extraCommands: {
        "fp-config": (args: string[]) => {
          if (args[0] === "show-preprocessors") {
            return {
              lines: [
                "Firepower 2140 — Preprocessor Status",
                "─────────────────────────────────────────────",
                "Frag3 IP Reassembly:    DISABLED  ← VULNERABILITY",
                "Stream5 TCP Normalization: PARTIAL (threshold 64KB)",
                "HTTP Inspect:           ENABLED",
                "DNS Preprocessor:       ENABLED",
                "",
                "Active profile: balanced (performance over security)",
                "",
                ">> LEARN: Frag3 disabled = IP fragments not reassembled before",
                "   signature matching. Fragmented payloads bypass all Snort rules.",
                "   Fix: fp-policy set security-over-connectivity",
              ],
            };
          }
          return { lines: ["Usage: fp-config show-preprocessors"] };
        },
        "frag-probe": (args: string[]) => {
          const target = args[0] ?? "192.0.2.10";
          return {
            lines: [
              `Sending fragmented SQL injection probe to ${target}...`,
              "",
              "Fragment 1: GET /?id=' OR  [8 bytes, MF=1, offset=0]",
              "Fragment 2: 1=1-- HTTP/1.1 [MF=0, offset=1]",
              "",
              "Target response: HTTP 200 OK (payload executed — injection succeeded)",
              "FMC alert queue: 0 alerts generated  ← IPS BYPASSED",
              "",
              ">> Confirmed: Frag3 disabled. Full SQL injection payload assembled",
              "   by target TCP stack. IPS saw two harmless fragments.",
              "   Now fix: fp-policy set security-over-connectivity",
            ],
          };
        },
        "fp-policy": (args: string[]) => {
          if (args[0] === "set" && args[1] === "security-over-connectivity") {
            return {
              lines: [
                "Applying normalization policy: security-over-connectivity",
                "  Frag3 IP Reassembly:     ENABLED  ✓",
                "  Stream5 TCP Normalization: FULL    ✓",
                "  Overlap handling:          LAST    ✓",
                "  TTL normalization:         ENABLED ✓",
                "",
                "Policy deployed to sensor. Run: fp-verify",
              ],
            };
          }
          return { lines: ["Usage: fp-policy set security-over-connectivity"] };
        },
        "fp-verify": (_args: string[]) => ({
          lines: [
            "Re-sending fragmented SQL injection probe...",
            "",
            "Fragment 1: GET /?id=' OR  [MF=1]",
            "Fragment 2: 1=1-- HTTP/1.1  [MF=0]",
            "",
            "Firepower Frag3: reassembled → GET /?id=' OR 1=1-- HTTP/1.1",
            "Snort signature 1:2000033 MATCHED: SQL injection attempt",
            "Action: BLOCKED — connection reset",
            "FMC alert generated: [HIGH] SQL-INJECTION-ATTEMPT 192.0.2.10",
            "",
            ">> Fragmentation evasion defeated. Fragment collected.",
            "Run 'assemble' for the full flag.",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Stage m40: FTD/FMC Architecture & IPS Policy — Quiz ──────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Advanced Security Lab", location: "Austin, Texas, USA", era: "2024 CE", emoji: "🏗️" },
    id: "stage-m40",
    order: 40,
    title: "The Management Plane",
    subtitle: "Cisco Firepower Threat Defense (FTD) and Firepower Management Center (FMC) — Architecture, Inline vs. Passive, and IPS Policy Tuning",
    category: "cybersecurity",
    xp: 90,
    badge: { id: "badge-m-fmc", name: "FMC Architect", emoji: "🏗️" },
    challengeType: "quiz",
    info: {
      tagline: "Every IPS decision starts with a policy decision — FMC is where network security is written before it is enforced.",
      year: 2024,
      overview: [
        "Cisco Firepower Threat Defense (FTD) is the unified software image that combines the Cisco ASA firewall engine with the Sourcefire NGIPS engine on a single platform. FTD runs on Cisco Firepower appliances (1000, 2100, 4100, 9300 series), ASA 5500-X hardware via software upgrade, and as a virtual machine (FTDv). The Firepower Management Center (FMC) is the centralized management platform — it is where all IPS policies, access control policies, SSL inspection policies, and network intelligence configurations are authored and deployed to all managed FTD sensors.",
        "FTD can operate in three deployment modes with fundamentally different security implications. Inline mode places the FTD appliance physically in the traffic path — it can block, reset, and modify connections in real time. Passive (SPAN/tap) mode receives a copy of traffic and can only alert, not block. Inline tap mode operates inline but drops all packets rather than blocking — used for shadow testing new IPS policies before production enforcement. The mode determines the blast radius of both attacks and misconfigurations.",
        "IPS policy tuning is one of the most consequential (and neglected) configuration tasks in Firepower deployments. The default Snort ruleset contains thousands of signatures, many of which will generate false positives in specific environments. An untuned IPS in production either floods the SOC with noise (if set to alert-only) or blocks legitimate traffic (if set to drop). Tuning requires understanding the Snort rule priority tiers, Cisco-recommended tuning workflows, and the use of Firepower's Security Intelligence and Application detectors.",
      ],
      technical: {
        title: "FTD Deployment Modes and IPS Policy Architecture",
        body: [
          "FMC manages FTD sensors through a hierarchical policy structure: Platform Settings (interface config, HA, licensing) → Access Control Policy (ACP, the master traffic policy) → IPS Policy (Snort rules applied within ACP rules) → File/Malware Policy (Cisco AMP integration) → SSL Policy (TLS inspection). Every traffic flow is evaluated through this stack. The ACP is the entry point — it determines whether traffic is allowed, blocked, or inspected, and which IPS policy applies to each traffic class.",
          "Snort rules in FMC are organized into Cisco Talos-managed rule groups (updated automatically via VRT), community rules, and custom rules. Each rule has a severity (critical, high, medium, low, informational) and a default action (alert, drop, pass, revert). IPS policies use an Inspection Mode: Detection Only (alert-only, no blocking) or Prevention (blocks based on rule action). New deployments should start in Detection Only to baseline false positive rates before switching to Prevention mode.",
          "FMC's Recommendations Engine analyzes the protected network's OS fingerprints (from passive Nmap-style host discovery) and recommends suppressing rules that cannot apply to the detected host OS. For example, Windows SMB rules are irrelevant on a Linux web server VLAN. Using the Recommendations Engine can reduce active rule counts by 40–60% while improving signal-to-noise ratio dramatically.",
        ],
        codeExample: {
          label: "FTD inline deployment and IPS policy — FMC configuration flow",
          code: `# FMC IPS policy workflow (via FMC GUI — represented as CLI equivalents)

# 1. Verify FTD interface mode (must be inline for blocking)
# Devices > Device Management > Interfaces > inline pair confirmed

# 2. Create IPS policy with Talos base ruleset
# Policies > Intrusion > Create Policy
#   Base policy: Balanced Security and Connectivity (recommended)
#   Inspection mode: Detection Only (for initial tuning)

# 3. Enable Snort 3 (vs Snort 2) — required for encrypted threat analytics
# Devices > Device Management > Snort 3 Upgrades

# 4. Apply IPS Recommendations (reduces false positives)
# Policies > Intrusion > [Your Policy] > IPS Policy Recommendations
# Click "Generate Recommendations" — FMC analyzes host database
# Apply recommendations — suppresses OS-inappropriate rules

# 5. After 2-week baselining in Detection Only: switch to Prevention
# Policies > Intrusion > [Your Policy] > Inspection Mode: Prevention

# 6. Verify active rules + suppression list
# Analysis > Intrusion > Events > filter by "False Positive" tag
# Add suppression rules for known-good traffic patterns`,
        },
      },
      incident: {
        title: "Untuned IPS in Prevention Mode — Production Outage at Healthcare Network",
        when: "2023",
        where: "Regional healthcare network — FTD 4150 inline IPS protecting EHR API endpoints",
        impact: "Untuned Prevention mode IPS blocked legitimate HL7 FHIR API calls — 4-hour EHR system outage; HIPAA-regulated patient data access interrupted during clinical operations",
        body: [
          "A healthcare IT team deployed Cisco FTD 4150 in inline Prevention mode using the Talos 'Maximum Detection' base policy without any tuning. Within 6 hours, Snort rules targeting HTTP anomalies flagged FHIR HL7 API calls (which use non-standard HTTP verbs like PATCH and complex JSON bodies) as suspicious and began dropping them. The EHR system became inaccessible for clinical staff during a high-census period.",
          "The Cisco recommended deployment workflow — baseline in Detection Only for 2+ weeks, apply Recommendations Engine results, then switch to Prevention — was skipped due to schedule pressure. The correct fix was immediate reversion to Detection Only followed by proper tuning. The incident is now a standard case study in Cisco's FMC training curriculum on why 'Deploy and Forget' is unsafe for inline IPS.",
        ],
      },
      diagram: {
        nodes: [
          { label: "FMC (Management)", sub: "policy author — ACP, IPS policy, SSL inspection", type: "system" },
          { label: "FTD Sensor (Inline)", sub: "enforcement point — Snort 3 + ASA firewall", type: "system" },
          { label: "Traffic Flow", sub: "evaluation: ACP → IPS Policy → File Policy → SSL Policy", type: "victim" },
          { label: "Block / Allow / Alert", sub: "Prevention mode: drop; Detection Only: alert only", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Cisco acquires Sourcefire — Snort and Firepower become Cisco products" },
        { year: 2017, event: "FTD unified image released — ASA + NGIPS on single software stack" },
        { year: 2020, event: "FMC 6.6: Snort 3 support added alongside legacy Snort 2" },
        { year: 2022, event: "Cisco recommends Snort 3 as default for new deployments — ETA (encrypted threat analytics) requires Snort 3", highlight: true },
        { year: 2024, event: "FMC 7.4: AI-assisted policy recommendations reduce tuning time by estimated 60%" },
      ],
      keyTakeaways: [
        "Always baseline in Detection Only for 2+ weeks before switching to Prevention mode — untuned Prevention is an outage risk",
        "Use the Recommendations Engine — it suppresses OS-irrelevant rules and dramatically reduces false positive rates",
        "FTD inline mode is required for blocking; passive/SPAN mode is alert-only — confirm your deployment mode before expecting prevention",
        "Snort 3 (not Snort 2) is required for Encrypted Traffic Analytics — upgrade legacy Snort 2 policies for modern threat coverage",
      ],
      references: [
        { title: "Cisco FMC Configuration Guide — IPS Policies", url: "https://www.cisco.com/c/en/us/td/docs/security/firepower/70/configuration/guide/fpmc-config-guide-v70/ips_policies.html" },
        { title: "Cisco FTD Deployment Guide — Inline vs Passive", url: "https://www.cisco.com/c/en/us/td/docs/security/firepower/ftd-deployment-guide.html" },
        { title: "Cisco Talos — Snort 3 Rule Documentation", url: "https://www.snort.org/documents" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m40-q1",
          type: "Deployment Mode",
          challenge: `  A security team deploys a Cisco FTD appliance physically
  between their core switch and internet edge router. They want
  to block malicious traffic in real time. After deployment,
  the IPS generates alerts but never drops any traffic.`,
          text: "What is the most likely cause of FTD alerting but not blocking, and what is the fix?",
          options: [
            "The Snort rules are in 'alert' action — change all rules to 'drop'",
            "The IPS policy is set to Detection Only (alert-only) mode — change Inspection Mode to Prevention in the FMC IPS policy settings",
            "The FTD is deployed in passive/SPAN mode — it cannot block in that mode",
            "FMC is not licensed for Prevention mode — a Threat Defense license is required",
          ],
          correctIndex: 1,
          explanation: "FTD can be inline (physically in the path) but still operate in Detection Only mode if the IPS policy's Inspection Mode is set to 'Detection Only'. Inline placement is necessary but not sufficient for blocking — the policy must also be set to 'Prevention'. This is the most common cause of 'IPS that doesn't block' in FTD deployments.",
        },
        {
          id: "m40-q2",
          type: "Policy Hierarchy",
          challenge: `  A Cisco FMC administrator wants to apply different IPS
  policies to different traffic segments: strict inspection
  for the PCI-scoped VLAN and lighter inspection for the
  corporate user VLAN.`,
          text: "How does FMC's policy hierarchy enable this segmented IPS approach?",
          options: [
            "Create two separate FTD devices — one for PCI, one for corporate traffic",
            "Use the Access Control Policy (ACP) to create separate rules for each VLAN, assigning a different IPS policy to each rule — FMC applies the matched IPS policy per traffic class",
            "IPS policies apply globally to all traffic — per-VLAN IPS is not supported in FMC",
            "Use separate Snort 3 rule files and manually assign them via CLI on each FTD sensor",
          ],
          correctIndex: 1,
          explanation: "FMC's ACP is the master traffic classifier. Each ACP rule can be associated with a specific IPS policy — so traffic matching the PCI VLAN source/destination can trigger a 'Maximum Detection' IPS policy while corporate traffic uses a 'Balanced' policy. This hierarchical association is a core FMC design principle.",
        },
        {
          id: "m40-q3",
          type: "Tuning",
          challenge: `  After deploying Firepower in Detection Only for two weeks,
  a security engineer runs the FMC Recommendations Engine.
  The tool suggests suppressing 3,400 out of 8,200 active
  Snort rules.`,
          text: "Why does the Recommendations Engine suppress nearly half the active rules?",
          options: [
            "Half the rules are duplicates — Cisco ships redundant rules for backward compatibility",
            "The engine analyzes host OS fingerprints from passive host discovery — rules targeting Windows vulnerabilities are suppressed for Linux hosts, and vice versa, because they cannot possibly apply",
            "The suppressed rules have a false positive rate above Cisco's threshold — they are permanently removed from the rule set",
            "The engine disables rules that have never generated an alert — treating silence as evidence the traffic doesn't exist",
          ],
          correctIndex: 1,
          explanation: "Firepower passively fingerprints host operating systems using network behavior analysis. The Recommendations Engine cross-references which Snort rules apply to which OS platforms. A Windows SMB exploit rule is irrelevant on a Linux web server. Suppressing OS-inapplicable rules eliminates a major source of false positives and reduces detection engine load — without reducing detection capability for the actual hosts.",
        },
        {
          id: "m40-q4",
          type: "Snort 3",
          challenge: `  A Cisco FTD deployment is running Snort 2. The security team
  wants to enable Encrypted Traffic Analytics (ETA) to detect
  threats in TLS traffic without decryption.`,
          text: "What is required before ETA can be enabled, and why?",
          options: [
            "ETA requires a Cisco Advanced Malware Protection (AMP) license add-on for the FTD",
            "ETA requires upgrading from Snort 2 to Snort 3 — ETA uses Snort 3's JA3 fingerprinting and flow metadata analysis, which are not available in the Snort 2 engine",
            "ETA requires passive deployment mode — it cannot operate inline because TLS inspection adds too much latency",
            "ETA is only available on Firepower 4100/9300 hardware — not on lower-end FTD appliances",
          ],
          correctIndex: 1,
          explanation: "Cisco's Encrypted Traffic Analytics uses Snort 3's network telemetry collection (initial data packet analysis, sequence of packet lengths and times) combined with Talos ML models to detect malware behavior in TLS traffic without decryption. The Snort 3 engine is a prerequisite — ETA is not backported to Snort 2. Migrating Snort 2 policies to Snort 3 is required before ETA can be enabled.",
        },
      ],
    },
  },

  // ─── Stage m41: CVE-2022-20927 — Cisco FTD SSL VPN DoS ───────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco PSIRT Operations Center", location: "San Jose, California, USA", era: "2022 CE", emoji: "🚪" },
    id: "stage-m41",
    order: 41,
    title: "Half-Open Season",
    subtitle: "CVE-2022-20927 — Cisco FTD SSL/TLS VPN Denial of Service via Incomplete Handshake Exhaustion, CVSS 8.6",
    category: "cybersecurity",
    cveId: "CVE-2022-20927",
    cvssScore: 8.6,
    xp: 110,
    badge: { id: "badge-m-ftddos", name: "VPN Sentinel", emoji: "🚪" },
    challengeType: "ctf",
    info: {
      tagline: "Leaving TLS handshakes open is a polite invitation to an attacker — and they will fill every slot you have.",
      year: 2022,
      overview: [
        "CVE-2022-20927 is a denial-of-service vulnerability in the SSL/TLS VPN feature of Cisco Firepower Threat Defense (FTD) software. The vulnerability exists because FTD's SSL/TLS VPN implementation does not properly handle incomplete TLS handshakes. An unauthenticated remote attacker can send a large volume of TLS ClientHello messages and then abandon the handshake — leaving incomplete handshake state that FTD holds in memory. When sufficient incomplete handshake state accumulates, the FTD appliance stops accepting new VPN connections and may reload.",
        "This is a variant of the well-known 'TLS half-open' or 'SSL exhaustion' attack class — similar in concept to TCP SYN floods but at the TLS layer. The attack specifically targets the TLS session table in FTD's VPN subsystem. Unlike a volumetric bandwidth flood, this attack requires only enough packets to fill the handshake state table — achievable with modest bandwidth from a single attacker host. CVSS 8.6 reflects the unauthenticated network-exploitable nature and availability impact.",
        "Cisco released patches in FTD 7.0.4, 7.1.0.3, 7.2.0.1, and later versions. Mitigations for unpatched systems include connection rate limiting on the outside interface, reducing TLS handshake timeout values, and deploying upstream DDoS mitigation. The vulnerability class highlights a fundamental tension in VPN gateway design: responsiveness to legitimate clients versus resilience against half-open state exhaustion.",
      ],
      technical: {
        title: "TLS Handshake State Exhaustion — Incomplete ClientHello Attack",
        body: [
          "A standard TLS 1.3 handshake proceeds: ClientHello → ServerHello + Certificate + CertificateVerify + Finished → (client) Finished. FTD allocates handshake state memory when the ClientHello arrives and holds it until the handshake completes or times out. CVE-2022-20927 exploits a flaw in FTD's timeout handling for incomplete handshakes — the state is not reclaimed promptly enough when the client goes silent after sending ClientHello.",
          "An attacker sends ClientHello messages at a high rate, each from a spoofed source IP or using distinct client random values to appear as unique sessions. They never send the subsequent handshake messages. FTD allocates a state table entry for each. When the state table is full (a configurable but bounded resource), new legitimate VPN connection attempts are rejected. Existing established VPN sessions may remain stable, but no new connections succeed — a 'brownout' rather than a complete outage.",
          "Detection signature: a spike in TLS handshake state table utilization visible in FTD's `show ssl statistics` output, combined with a high rate of ClientHello messages in NetFlow/Stealthwatch data. Differentiation from legitimate traffic: legitimate TLS clients almost always complete the handshake within 100-500ms; CVE-2022-20927 exploiters let the timeout (typically 30-60 seconds) elapse before the state is reclaimed.",
        ],
        codeExample: {
          label: "CVE-2022-20927 — TLS handshake exhaustion detection and mitigation",
          code: `# Detect TLS handshake state exhaustion on FTD
# Via FTD diagnostic CLI (system support diagnostic-cli):
show ssl statistics
# Look for:
# - Handshake timeout count increasing rapidly
# - Active handshakes approaching max (typically 65535)
# - Completed handshakes / Active ratio approaching 0

# Monitor outside interface for ClientHello flood
# Via FMC: Analysis > Connection Events > filter SSL Status = "Unknown"
# Rapid growth in "Unknown" SSL status = incomplete handshakes

# Emergency mitigation (unpatched):
# 1. Rate-limit new TCP connections on outside interface
ip access-list extended VPN-RATELIMIT
  permit tcp any any eq 443 (with rate-limit policy-map)

# 2. Reduce SSL handshake timeout
ssl server-version tlsv1.2
ssl dh-group group14

# Long-term: patch to FTD 7.0.4+ / 7.1.0.3+ / 7.2.0.1+
# Cisco advisory: cisco-sa-ftd-ssl-dos-TGTkWZFz`,
        },
      },
      incident: {
        title: "FTD SSL VPN Exhaustion — Remote Workforce Lockout at Manufacturing Firm",
        when: "2022 Q4 (post CVE-2022-20927 public disclosure)",
        where: "Global manufacturing firm — FTD 2140 as primary remote access VPN gateway (3,200 remote employees)",
        impact: "All new VPN connections blocked for 4 hours; 3,200 remote workers unable to access internal systems; patch applied during emergency maintenance window",
        body: [
          "Three weeks after Cisco's advisory for CVE-2022-20927 was published, an unpatched FTD 2140 at a manufacturing firm was targeted with a TLS handshake exhaustion attack. The attack began at 6:45 AM on a Monday — peak VPN connection time — and filled the handshake state table within 22 minutes. All new VPN connection attempts returned 'unable to connect' to 3,200 remote workers attempting to start their workweek.",
          "The patch had been staged for deployment in the following weekend's maintenance window. The attack forced an emergency 4 AM patch deployment mid-week, with a 45-minute VPN outage for existing connected users. The SOC identified the attack pattern via FMC connection events showing thousands of SSL 'Unknown' status entries from diverse source IPs — indicators of a coordinated handshake exhaustion campaign rather than normal VPN traffic.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "mass TLS ClientHello — handshake never completed", type: "attacker" },
          { label: "FTD SSL VPN", sub: "state table fills — incomplete handshake records", type: "system" },
          { label: "Legitimate Clients", sub: "new VPN connections rejected — table full", type: "victim" },
          { label: "Remote Access Outage", sub: "workforce locked out — no new sessions accepted", type: "result" },
        ],
      },
      timeline: [
        { year: 2011, event: "THC-SSL-DoS tool published — SSL renegotiation exhaustion attack class documented" },
        { year: 2020, event: "COVID-19 remote work surge makes VPN gateway DoS a high-impact attack vector" },
        { year: 2022, event: "Aug: Cisco discloses CVE-2022-20927 — FTD SSL handshake exhaustion", highlight: true },
        { year: 2022, event: "Sep: Active exploitation observed post-disclosure; patches released in FTD 7.0.4, 7.1.0.3, 7.2.0.1" },
        { year: 2024, event: "Cisco FTD 7.4 adds adaptive handshake timeout — automatically reduces timeout under high state table utilization" },
      ],
      keyTakeaways: [
        "Apply CVE-2022-20927 patches immediately — FTD 7.0.4+, 7.1.0.3+, 7.2.0.1+ resolve the incomplete handshake timeout flaw",
        "Monitor SSL handshake state table utilization as a key VPN gateway health metric — spikes indicate exhaustion attacks",
        "Rate-limit new TCP/443 connections at an upstream device as a mitigation for unpatched systems",
        "TLS handshake exhaustion is distinct from bandwidth floods — it can succeed with modest attack traffic that rate-limiting might not catch",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2022-20927", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ftd-ssl-dos-TGTkWZFz" },
        { title: "NVD — CVE-2022-20927", url: "https://nvd.nist.gov/vuln/detail/CVE-2022-20927" },
        { title: "Cisco FTD SSL VPN Hardening Guide", url: "https://www.cisco.com/c/en/us/support/docs/security/firepower-ngfw/215419-hardening-cisco-ftd-and-firepower-applia.html" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "192.0.2.1",
        hostname: "ftd-2140-vpn",
        os: "Cisco FTD 7.0.3 (unpatched)",
        openPorts: "443/tcp (SSL VPN gateway)",
        vulnerability: "CVE-2022-20927 — TLS handshake state exhaustion DoS, CVSS 8.6",
      },
      scenario: "A Cisco FTD 2140 VPN gateway is running unpatched FTD software. During a simulated attack window, you must demonstrate CVE-2022-20927 by exhausting the SSL handshake state table, observe the impact on legitimate clients, then apply the emergency mitigation. Capture the remediation flag.",
      hint: "Brief, exhaust, observe the lockout, apply rate-limit mitigation, verify recovery.",
      hints: [
        "Start: cat cve-brief.txt",
        "Begin handshake exhaustion: ssl-exhaust 192.0.2.1 443",
        "Check state table: show-ssl-stats",
        "Apply rate-limit mitigation: apply-ratelimit 443",
        "Verify recovery: verify-recovery",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/cve-brief.txt", value: "FLAG{ftd_", label: "CVE Brief — FTD Target" },
        { trigger: "ssl-exhaust 192.0.2.1 443", value: "ssl_dos_", label: "Handshake Table Exhausted" },
        { trigger: "show-ssl-stats", value: "lockout_", label: "State Table Full — Legitimate Clients Locked Out" },
        { trigger: "verify-recovery", value: "patched}", label: "Mitigation Applied — VPN Recovered" },
      ],
      files: {
        "/cve-brief.txt": [
          "CVE-2022-20927 — FTD SSL VPN Denial of Service",
          "Target: 192.0.2.1:443 (Cisco FTD 2140 — unpatched)",
          "CVSS: 8.6  Auth required: NONE",
          "",
          "Sequence: ssl-exhaust 192.0.2.1 443 → show-ssl-stats",
          "         → apply-ratelimit 443 → verify-recovery → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "cve-brief.txt", isDir: false }] },
      extraCommands: {
        "ssl-exhaust": (args: string[]) => {
          const target = args[0] ?? "192.0.2.1";
          return {
            lines: [
              `Sending incomplete TLS ClientHello flood to ${target}:443...`,
              "  Session 1: ClientHello sent, no response — state held",
              "  Session 2: ClientHello sent, no response — state held",
              "  [... 65,500 sessions ...]",
              "  Session 65535: ClientHello sent — state table FULL",
              "",
              "New legitimate VPN connection attempt: REJECTED",
              "  Error: SSL handshake failed — resource unavailable",
              "",
              ">> LEARN: FTD holds incomplete handshake state for 30-60 seconds.",
              "   Filling the table blocks ALL new VPN sessions — existing",
              "   sessions remain stable, but no new connections succeed.",
              "   Run: show-ssl-stats",
            ],
          };
        },
        "show-ssl-stats": (_args: string[]) => ({
          lines: [
            "FTD SSL Statistics — 192.0.2.1",
            "────────────────────────────────────",
            "Active handshakes:       65535 / 65535  [FULL]",
            "Completed handshakes:    12              (0.02%)",
            "Timed-out handshakes:    0               (reclaim lag)",
            "Rejected connections:    4,821           (LEGITIMATE CLIENTS BLOCKED)",
            "",
            ">> State table at 100% — all legitimate VPN connections rejected.",
            "   Apply mitigation: apply-ratelimit 443",
          ],
        }),
        "apply-ratelimit": (args: string[]) => {
          if (args[0] === "443") {
            return {
              lines: [
                "Applying TCP connection rate-limit on port 443...",
                "  Max new TCP/443 connections: 100/second (from single source)",
                "  Rate-limit policy deployed to outside interface",
                "",
                "Incomplete handshake flood suppressed.",
                "State table beginning to drain as timeouts expire...",
                "Run: verify-recovery",
              ],
            };
          }
          return { lines: ["Usage: apply-ratelimit <port>"] };
        },
        "verify-recovery": (_args: string[]) => ({
          lines: [
            "Verifying FTD VPN recovery...",
            "",
            "Active handshakes:    823 / 65535  [NORMAL]",
            "Completed handshakes: 801           (97.3%)",
            "New VPN connection test: SUCCESS",
            "  Tunnel established in 1.2s",
            "",
            ">> Rate-limit effective. State table drained.",
            "   Long-term fix: patch to FTD 7.0.4+ for CVE-2022-20927.",
            "   Fragment collected. Run 'assemble' for the full flag.",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Stage m42: Cisco SecureX/XDR — Threat Hunting CTF ───────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Talos Intelligence HQ", location: "Austin, Texas, USA", era: "2024 CE", emoji: "🔭" },
    id: "stage-m42",
    order: 42,
    title: "The Pivot Hunt",
    subtitle: "Cisco XDR Threat Hunting — Identifying Lateral Movement via Cross-Source Telemetry Correlation",
    category: "cybersecurity",
    xp: 130,
    badge: { id: "badge-m-xdr-hunt", name: "XDR Threat Hunter", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "Lateral movement leaves traces in endpoint telemetry, network flows, and authentication logs — XDR connects the dots that no single tool can see.",
      year: 2024,
      overview: [
        "Cisco XDR (formerly Cisco SecureX) is a cloud-native extended detection and response platform that aggregates telemetry from Cisco Secure Endpoint (formerly AMP for Endpoints), Cisco Secure Firewall (Firepower), Cisco Umbrella, Cisco Secure Email, and third-party SIEM sources. Its core capability is cross-source correlation — associating an indicator of compromise (IOC) detected in one tool with related events in other tools to build a complete attack narrative.",
        "Threat hunting in Cisco XDR uses the Orbital Query Engine (Cisco Secure Endpoint feature) for live host interrogation, the Investigate portal for IOC pivoting across 100+ Talos threat intelligence feeds, and the Casebook workflow for documenting investigation findings. The XDR Ribbon — the persistent UI bar at the bottom of Cisco security product UIs — enables instant pivots: an IP seen in a Firepower alert can be immediately queried in Umbrella DNS logs, Secure Endpoint telemetry, and Talos reputation without leaving the current screen.",
        "Lateral movement is one of the most important threat hunting targets in XDR because it spans multiple data sources: an attacker who compromised a workstation will create network connections visible in Firepower, DNS queries visible in Umbrella, file writes visible in Secure Endpoint, and authentication events visible in Active Directory logs. No single tool sees the complete picture. XDR's value is in the correlation — mapping the lateral movement chain from the initial compromise workstation to the final targeted server.",
      ],
      technical: {
        title: "XDR Cross-Source Pivot — Correlating Endpoint, Network, and DNS Telemetry",
        body: [
          "Cisco XDR's investigation workflow starts with a seed IOC — typically an IP address, domain, file hash, or email address that appears suspicious. The Investigate portal submits the seed to all connected modules simultaneously and aggregates results into a single observable graph. Each result is a 'disposition' (clean, malicious, suspicious, unknown) backed by Talos threat intelligence data and first/last seen timestamps.",
          "For lateral movement detection, threat hunters typically pivot on internal IP addresses. When Secure Endpoint flags a suspicious process on workstation WS-01 making an unusual network connection to 10.10.50.5 (an internal server), the XDR pivot pulls: Firepower connection logs from that IP pair, Umbrella DNS queries from WS-01 before the connection, Secure Endpoint process events on 10.10.50.5 around the time of the connection, and Active Directory authentication logs. The resulting timeline exposes the kill chain.",
          "The Orbital Query Engine enables live forensic queries against enrolled Cisco Secure Endpoint hosts using a SQL-like syntax. Queries run in near-real-time against endpoint telemetry: `SELECT * FROM processes WHERE parent_name = 'cmd.exe' AND name = 'net.exe'` surfaces lateral movement via net use / pass-the-hash. Results are automatically linked to the XDR investigation case.",
        ],
        codeExample: {
          label: "Cisco XDR Orbital query — detecting lateral movement artifacts",
          code: `-- Cisco Orbital Query Engine (SQL-like syntax for live endpoint queries)
-- Run via XDR > Orbital > New Query

-- Detect pass-the-hash / lateral movement via net.exe
SELECT p.pid, p.name, p.path, p.cmdline, p.parent_name, p.start_time
FROM processes p
WHERE p.parent_name IN ('cmd.exe', 'powershell.exe', 'wscript.exe')
  AND p.name IN ('net.exe', 'net1.exe', 'nltest.exe', 'wmic.exe')
  AND p.start_time > (NOW() - INTERVAL 24 HOURS);

-- Detect suspicious scheduled task creation (common persistence mechanism)
SELECT t.name, t.path, t.action, t.enabled, t.run_as_user
FROM scheduled_tasks t
WHERE t.action LIKE '%powershell%'
   OR t.action LIKE '%cmd /c%'
   OR t.run_as_user IN ('SYSTEM', 'NT AUTHORITY\\SYSTEM');

-- Detect outbound connections to non-standard ports from browser processes
SELECT p.name, c.remote_address, c.remote_port, c.local_port
FROM processes p JOIN network_connections c ON p.pid = c.pid
WHERE p.name IN ('chrome.exe', 'firefox.exe', 'msedge.exe')
  AND c.remote_port NOT IN (80, 443, 8080, 8443);`,
        },
      },
      incident: {
        title: "XDR Lateral Movement Discovery — Retail Chain SOC Finds 18-Day Dwell Time",
        when: "2023",
        where: "National retail chain — Cisco XDR + Secure Endpoint + Umbrella deployment across 400 stores",
        impact: "XDR cross-source correlation identified attacker lateral movement that had evaded individual tool alerts for 18 days; 14 compromised hosts identified and contained; PCI DSS cardholder data not reached",
        body: [
          "A Cisco XDR threat hunt at a national retail chain began with a single Talos threat intelligence alert: a file hash on a store manager's workstation matching a known Cobalt Strike beacon. The Secure Endpoint alert was initially triaged as low severity due to the workstation's role. An XDR pivot on the beacon's C2 IP revealed that the same C2 had been contacted by 13 other hosts across 8 stores over 18 days — all below individual product alert thresholds.",
          "The XDR investigation casebook mapped the complete kill chain: initial access via phishing email (Secure Email telemetry), Cobalt Strike beacon deployment (Secure Endpoint), lateral movement to store server via SMB (Firepower NetFlow), Active Directory reconnaissance (Umbrella DNS queries for AD-related domains), and ultimately attempted access to the payment processing VLAN (blocked by Firepower, logged but not yet reviewed). All 14 hosts were simultaneously isolated via XDR's automated response playbook, which sent quarantine commands to Secure Endpoint in a single workflow.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Seed IOC", sub: "Cobalt Strike beacon hash on WS-01", type: "attacker" },
          { label: "Cisco XDR Pivot", sub: "correlates across Secure Endpoint, Firepower, Umbrella, Email", type: "system" },
          { label: "14 Compromised Hosts", sub: "lateral movement chain across 8 stores — 18-day dwell", type: "victim" },
          { label: "Simultaneous Containment", sub: "XDR automated response — quarantine all 14 via playbook", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Cisco SecureX launched — first cross-product ribbon integration across Cisco Security portfolio" },
        { year: 2022, event: "SecureX expanded with Orbital Query Engine — live endpoint forensics via SQL-like queries" },
        { year: 2023, event: "Cisco rebrands SecureX to Cisco XDR — aligned with industry XDR category terminology", highlight: true },
        { year: 2024, event: "Cisco XDR adds AI-assisted investigation copilot — natural language threat hunt queries" },
        { year: 2024, event: "XDR integration extended to third-party: Microsoft Defender, CrowdStrike, Splunk, Palo Alto" },
      ],
      keyTakeaways: [
        "Lateral movement is invisible to any single tool — XDR's cross-source correlation is its primary defense value",
        "Use Orbital Query Engine for live host interrogation when a suspicious process or network connection is identified — real-time forensics without endpoint login",
        "The XDR Ribbon enables instant pivots: any IP, hash, or domain seen in one tool should immediately be pivoted across all connected sources",
        "Automated response playbooks in XDR reduce containment time from hours to seconds — pre-build quarantine playbooks before you need them",
      ],
      references: [
        { title: "Cisco XDR — Threat Hunting Guide", url: "https://www.cisco.com/c/en/us/products/security/xdr/index.html" },
        { title: "Cisco Orbital Query Documentation", url: "https://orbital.amp.cisco.com/help/en/#!overview" },
        { title: "Cisco Talos — Threat Hunting Methodology", url: "https://blog.talosintelligence.com/threat-hunting" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.20.10", hostname: "soc-ws", os: "SOC Analyst Workstation" },
      targetMachine: {
        ip: "10.10.10.44",
        hostname: "WS-04",
        os: "Windows 10 — Cobalt Strike beacon active",
        openPorts: "445/tcp (SMB lateral movement)",
        vulnerability: "Cobalt Strike C2 — 18-day dwell, lateral movement to SRV-FINANCE",
      },
      scenario: "A Cisco XDR analyst receives a Secure Endpoint alert for a suspicious process on WS-04. Pivot across Cisco XDR sources — Secure Endpoint, Firepower, Umbrella — to map the lateral movement chain and identify the attacker's target server. Capture the investigation flag.",
      hint: "Start with the endpoint alert, pivot on the C2 IP, trace lateral movement via Firepower, identify the target via Umbrella.",
      hints: [
        "Start: cat xdr-alert.txt",
        "Pivot on the C2 IP: xdr-investigate 198.51.100.42",
        "Trace lateral movement: xdr-firepower-flows WS-04",
        "Query DNS for target recon: xdr-umbrella WS-04",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/xdr-alert.txt", value: "FLAG{xdr_", label: "Alert Received — Cobalt Strike on WS-04" },
        { trigger: "xdr-investigate 198.51.100.42", value: "pivot_", label: "C2 Pivoted — 11 Additional Hosts Found" },
        { trigger: "xdr-firepower-flows WS-04", value: "lateral_", label: "Lateral Movement Mapped — WS-04 → SRV-FINANCE" },
        { trigger: "xdr-umbrella WS-04", value: "hunt_2024}", label: "DNS Recon Identified — Finance AD Queries Confirmed" },
      ],
      files: {
        "/xdr-alert.txt": [
          "CISCO XDR ALERT — HIGH",
          "Source: Cisco Secure Endpoint",
          "Host: WS-04 (10.10.10.44)",
          "Detection: Cobalt Strike beacon — file hash: a1b2c3d4e5f6...",
          "C2 IP: 198.51.100.42",
          "",
          "Sequence: xdr-investigate 198.51.100.42 → xdr-firepower-flows WS-04",
          "         → xdr-umbrella WS-04 → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "xdr-alert.txt", isDir: false }] },
      extraCommands: {
        "xdr-investigate": (args: string[]) => {
          const ip = args[0];
          if (ip === "198.51.100.42") {
            return {
              lines: [
                `XDR Investigate: ${ip}`,
                "  Talos Reputation: MALICIOUS (Cobalt Strike C2 infrastructure)",
                "  First seen: 2024-03-01  Last seen: 2024-03-19 (18 days)",
                "",
                "  Hosts contacting this C2 (from Secure Endpoint):",
                "  ├── WS-04   10.10.10.44  (current alert)",
                "  ├── WS-07   10.10.10.47  (first contact 2024-03-01)",
                "  ├── WS-11   10.10.10.51",
                "  ├── WS-14   10.10.10.54",
                "  └── ... 7 more hosts across stores",
                "",
                "  11 hosts total — 18-day dwell time.",
                "  Run: xdr-firepower-flows WS-04",
              ],
            };
          }
          return { lines: [`XDR Investigate: ${ip ?? "—"} — not found in threat feeds`] };
        },
        "xdr-firepower-flows": (args: string[]) => {
          if (args[0] === "WS-04") {
            return {
              lines: [
                "Firepower NetFlow — WS-04 (10.10.10.44) last 24h:",
                "  10.10.10.44:49231 → 10.10.50.22:445  SMB  [LATERAL MOVEMENT]",
                "  10.10.10.44:49288 → 10.10.50.22:135  RPC  [LATERAL MOVEMENT]",
                "  10.10.50.22 = SRV-FINANCE (Finance department file server)",
                "",
                "  >> SMB + RPC from workstation to finance server = lateral movement.",
                "  Run: xdr-umbrella WS-04",
              ],
            };
          }
          return { lines: ["Usage: xdr-firepower-flows <hostname>"] };
        },
        "xdr-umbrella": (args: string[]) => {
          if (args[0] === "WS-04") {
            return {
              lines: [
                "Umbrella DNS — WS-04 (10.10.10.44) last 24h:",
                "  _ldap._tcp.finance.corp         [AD discovery]",
                "  finance-dc01.finance.corp        [Domain Controller lookup]",
                "  srv-finance.finance.corp         [Target server DNS lookup]",
                "",
                "  >> Active Directory recon confirmed. Attacker mapped finance",
                "     domain before lateral movement to SRV-FINANCE.",
                "  Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: xdr-umbrella <hostname>"] };
        },
      },
    },
  },

  // ─── Stage m43: Cisco XDR Architecture — Quiz ────────────────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Security Cloud Operations", location: "Research Triangle Park, North Carolina, USA", era: "2024 CE", emoji: "☁️" },
    id: "stage-m43",
    order: 43,
    title: "The Detection Fabric",
    subtitle: "Cisco XDR Architecture — Telemetry Ingestion, Orchestration, Automated Response, and the SecureX Ribbon",
    category: "cybersecurity",
    xp: 85,
    badge: { id: "badge-m-xdr-arch", name: "XDR Architect", emoji: "☁️" },
    challengeType: "quiz",
    info: {
      tagline: "XDR is not a product — it is the connective tissue that makes all your other security products smarter together.",
      year: 2024,
      overview: [
        "Cisco XDR (Extended Detection and Response) consolidates telemetry from Cisco Secure Endpoint, Cisco Secure Firewall (Firepower), Cisco Umbrella, Cisco Secure Email, Cisco Secure Network Analytics (Stealthwatch), and third-party integrations into a single detection and response fabric. It provides unified threat correlation, automated investigation, and cross-product response — the core value proposition being that threats which are invisible to any single tool become detectable through cross-source correlation.",
        "The XDR architecture centers on three capabilities: the Threat Response module (IOC investigation and disposition across all integrated sources), Orbital (live endpoint query engine for real-time forensics), and Automate (SOAR-style playbook orchestration using drag-and-drop workflow builder). The XDR Ribbon is the persistent integration layer embedded in every Cisco Security product's UI — enabling instant cross-product pivots without navigating away from the current screen.",
        "Cisco XDR's automated response capabilities use pre-built and custom playbooks triggered by XDR detections. A playbook can: quarantine a host via Cisco Secure Endpoint, block an IP via Firepower, add a domain to Umbrella's block list, enrich an alert with Talos threat intelligence, and create a ServiceNow ticket — all within seconds of an initial detection, without human intervention. This reduces mean time to respond (MTTR) from hours to seconds for high-confidence, well-defined attack patterns.",
      ],
      technical: {
        title: "XDR Telemetry Sources, Correlation Engine, and Response Orchestration",
        body: [
          "Cisco XDR ingests telemetry through Module integrations — each Cisco product (Secure Endpoint, Umbrella, Firepower, Secure Email) has a registered Module that handles authentication, telemetry streaming, and response action routing. Third-party modules (Microsoft Defender, CrowdStrike, Splunk, Palo Alto) are available in the module catalog. Each module contributes 'observables' (IPs, domains, hashes, URLs) and 'targets' (hosts, email addresses) to the XDR investigation graph.",
          "The Threat Response engine normalizes observables across all modules into a unified schema and queries each module's threat intelligence for disposition (clean, malicious, suspicious, unknown). Results are aggregated into an investigation graph that links observables to targets and to other observables — forming a visual representation of the attack chain. The engine assigns a score to the overall investigation based on the severity and confidence of each connected indicator.",
          "Cisco XDR Automate is the SOAR (Security Orchestration, Automation, and Response) component. Workflows are built visually using a trigger (XDR alert, manual, scheduled) connected to action blocks (Secure Endpoint: quarantine host, Umbrella: block domain, Firepower: block IP, Threat Intelligence: enrich observable, Webex: notify SOC). Pre-built response workflows from the Cisco Exchange marketplace address common incident types — ransomware response, phishing triage, and lateral movement containment.",
        ],
        codeExample: {
          label: "Cisco XDR Automate — automated phishing response workflow (pseudo-code)",
          code: `# Cisco XDR Automate — Phishing Email Response Playbook
# Trigger: Cisco Secure Email detects malicious attachment

WORKFLOW: "Phishing Auto-Triage"
TRIGGER: Secure Email alert (attachment verdict = MALICIOUS)

STEP 1: Extract Observables
  → Get file hash from email attachment
  → Get sender domain from email headers
  → Get recipient email address

STEP 2: Enrich (parallel)
  → Query Talos for file hash disposition
  → Query Talos for sender domain reputation
  → Query Umbrella for sender domain DNS history

STEP 3: Conditional Response
  IF (file_hash = MALICIOUS AND domain_reputation = HIGH_RISK):
    → Secure Email: block sender domain globally
    → Secure Endpoint: scan recipient host for hash
    → Umbrella: add sender domain to block list
    → Create ServiceNow incident (severity: HIGH)
    → Webex: notify SOC channel
  ELSE IF (file_hash = SUSPICIOUS):
    → Secure Endpoint: monitor recipient host (no quarantine yet)
    → Create ServiceNow incident (severity: MEDIUM)
    → XDR: flag for analyst review`,
        },
      },
      incident: {
        title: "XDR Automate — Ransomware Containment in 47 Seconds",
        when: "2023",
        where: "Healthcare system — Cisco XDR with Secure Endpoint and Firepower across 12 hospitals",
        impact: "XDR automated ransomware playbook quarantined 3 hosts within 47 seconds of initial Secure Endpoint detection; lateral movement to 60+ additional hosts prevented; patient care systems unaffected",
        body: [
          "A ransomware variant (LockBit 3.0) gained initial access via a phishing email at a healthcare network. Cisco Secure Endpoint detected the ransomware encryption behavior within 4 minutes of execution. The detection triggered a pre-configured XDR Automate playbook that simultaneously: quarantined the 3 infected workstations via Secure Endpoint (removing them from the network), blocked the ransomware's C2 domain in Umbrella across all 12 hospitals, blocked the C2 IP at every Firepower sensor, and sent a Webex notification to the SOC with the investigation casebook link.",
          "Total automated response time from Secure Endpoint detection to containment of all 3 hosts: 47 seconds. The SOC analyst reviewed the XDR casebook 8 minutes later and confirmed the automated response was correct. Without automation, manual identification and response to 3 hosts across 12 hospital sites would have taken 30-60 minutes — time during which LockBit's lateral movement would have reached shared infrastructure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Telemetry Sources", sub: "Secure Endpoint · Firepower · Umbrella · Email · Stealthwatch", type: "system" },
          { label: "XDR Correlation Engine", sub: "observable normalization, IOC pivoting, investigation graph", type: "system" },
          { label: "Threat Detection", sub: "cross-source alert with confidence score and attack chain", type: "victim" },
          { label: "Automate Playbook", sub: "quarantine + block + notify in < 60 seconds", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Cisco SecureX launches — first persistent ribbon integration across Cisco security portfolio" },
        { year: 2021, event: "SecureX Orchestration (now Automate) released — drag-and-drop SOAR playbook builder" },
        { year: 2021, event: "Orbital Query Engine integrated into SecureX — live endpoint forensic queries" },
        { year: 2023, event: "Cisco rebrands SecureX → Cisco XDR; adds AI-assisted triage and Microsoft/CrowdStrike integrations", highlight: true },
        { year: 2024, event: "Cisco XDR AI Copilot: natural language investigation queries against all telemetry sources" },
      ],
      keyTakeaways: [
        "XDR's primary value is cross-source correlation — threats invisible to any individual tool become detectable when endpoint, network, DNS, and email data are correlated",
        "The XDR Ribbon is the fastest investigation path — pivot any observable to all sources without navigating between product UIs",
        "Automate playbooks must be built before incidents occur — define quarantine, block, and notify workflows at deployment time, not during an active incident",
        "Orbital enables live forensic queries across enrolled endpoints — critical for hunting lateral movement artifacts in real time without endpoint login",
      ],
      references: [
        { title: "Cisco XDR — Product Documentation", url: "https://www.cisco.com/c/en/us/products/security/xdr/index.html" },
        { title: "Cisco XDR Automate — Workflow Documentation", url: "https://docs.securex.security.cisco.com/SecureX-help-online/Content/orchestration.htm" },
        { title: "Cisco Secure Endpoint — Orbital Documentation", url: "https://orbital.amp.cisco.com/help" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m43-q1",
          type: "XDR Architecture",
          challenge: `  A CISO asks why Cisco XDR is valuable when the organization
  already has Cisco Secure Endpoint, Firepower, and Umbrella
  each generating their own alerts and dashboards.`,
          text: "What does Cisco XDR provide that each individual product cannot?",
          options: [
            "XDR provides deeper analysis of endpoint malware than Secure Endpoint alone",
            "XDR correlates observables across all three products to detect attack chains that are below alert thresholds in any single product — lateral movement visible only when endpoint + network + DNS telemetry are combined",
            "XDR replaces Secure Endpoint, Firepower, and Umbrella with a single unified product",
            "XDR provides better dashboards and reporting than individual product consoles",
          ],
          correctIndex: 1,
          explanation: "Individual products see their own slice of telemetry. An endpoint alert without context looks low-severity. The same endpoint event combined with a suspicious DNS query in Umbrella and an unusual outbound connection in Firepower creates a high-confidence lateral movement finding. XDR's cross-source correlation is the capability that makes the sum greater than the parts.",
        },
        {
          id: "m43-q2",
          type: "Orbital",
          challenge: `  During an XDR investigation, an analyst identifies a suspicious
  IP address that was contacted by a specific workstation. They
  want to check if the same process that made the connection
  also created a scheduled task for persistence — without
  remoting into the endpoint.`,
          text: "Which Cisco XDR capability enables live endpoint forensic queries without requiring remote access?",
          options: [
            "Firepower NetFlow analysis — network flows show all process activity",
            "Cisco Orbital Query Engine — runs SQL-like forensic queries against enrolled Cisco Secure Endpoint hosts in near real-time without requiring RDP or SSH",
            "Cisco Secure Email — email analysis can infer endpoint process behavior",
            "XDR Automate — the playbook engine can query endpoint processes",
          ],
          correctIndex: 1,
          explanation: "Orbital is the live endpoint query engine integrated into Cisco XDR. It queries enrolled Secure Endpoint hosts using a SQL-like syntax against process tables, network connections, scheduled tasks, registry keys, and other OS artifacts — returning results in seconds without requiring any direct endpoint access. It is the fastest path to real-time endpoint forensics during an active investigation.",
        },
        {
          id: "m43-q3",
          type: "Automate",
          challenge: `  A SOC team wants to automatically quarantine hosts when
  Cisco Secure Endpoint detects ransomware behavior, block the
  ransomware's C2 domain in Umbrella, and notify the SOC via
  Webex — all without manual analyst action.`,
          text: "Which Cisco XDR component enables this automated multi-product response workflow?",
          options: [
            "Cisco XDR Threat Response — the investigation engine handles automated blocking",
            "Cisco XDR Automate — SOAR playbook builder with drag-and-drop action blocks for Secure Endpoint quarantine, Umbrella block, and Webex notification in a single triggered workflow",
            "Cisco Talos Threat Intelligence — Talos automatically blocks C2 domains when they are discovered",
            "Cisco Secure Endpoint — standalone quarantine without XDR integration required",
          ],
          correctIndex: 1,
          explanation: "Cisco XDR Automate is the SOAR component that enables cross-product response playbooks. A workflow triggered by a Secure Endpoint ransomware detection can simultaneously: quarantine the host (Secure Endpoint action block), block the C2 domain (Umbrella action block), create a ticket (ServiceNow action block), and send a notification (Webex action block). The visual workflow builder requires no coding and executes in seconds.",
        },
        {
          id: "m43-q4",
          type: "XDR Ribbon",
          challenge: `  An analyst is reviewing a Firepower intrusion alert and
  sees an unfamiliar IP address (203.0.113.89) in the alert.
  They want to check this IP's reputation, DNS history, and
  whether any endpoints have communicated with it — immediately,
  without opening multiple product consoles.`,
          text: "How does the Cisco XDR Ribbon address this workflow?",
          options: [
            "The analyst must manually log into Umbrella, Secure Endpoint, and Talos IntelliCenter separately to check each source",
            "The XDR Ribbon is a persistent UI bar in all Cisco security products — selecting the IP and clicking Investigate sends it simultaneously to all integrated modules (Talos, Umbrella, Secure Endpoint) and returns aggregated disposition and telemetry without leaving the Firepower alert view",
            "The XDR Ribbon only works within the XDR portal — the analyst must copy the IP and navigate to the XDR dashboard",
            "The XDR Ribbon submits the IP to Talos only — Umbrella and Secure Endpoint require separate queries",
          ],
          correctIndex: 1,
          explanation: "The XDR Ribbon is embedded in the UI of every Cisco security product. Any observable (IP, domain, hash, URL) can be highlighted and submitted via the Ribbon to all connected XDR modules simultaneously — Talos reputation, Umbrella DNS history, Secure Endpoint host telemetry — without navigating away from the current product. This is the fastest investigation path in the Cisco security portfolio.",
        },
      ],
    },
  },

  // ─── Stage m44: Cisco DevNet REST API Security — CTF ─────────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco DevNet Developer Hub", location: "San Jose, California, USA", era: "2024 CE", emoji: "🖥️" },
    id: "stage-m44",
    order: 44,
    title: "API Cartographer",
    subtitle: "Cisco DNA Center REST API Enumeration and Privilege Escalation via Unauthenticated Endpoint Exposure",
    category: "cybersecurity",
    xp: 120,
    badge: { id: "badge-m-devnet", name: "API Cartographer", emoji: "🖥️" },
    challengeType: "ctf",
    info: {
      tagline: "The REST API that manages your entire network is only as secure as its authentication boundary.",
      year: 2024,
      overview: [
        "Cisco DNA Center (now Cisco Catalyst Center) is the intent-based networking management platform for Cisco enterprise campus and branch networks. It exposes a comprehensive REST API that manages devices, fabric configuration, SD-Access policies, and network telemetry. The DNA Center API is the programmatic equivalent of having administrator access to every network device managed by the platform — a single API token can push configuration changes to hundreds of switches and routers simultaneously.",
        "REST API security on network management platforms is a category of vulnerability with disproportionate impact. A SQL injection in a web application affects the application's data. A vulnerability in the DNA Center API affects the configuration integrity of the entire managed network. Real-world Cisco advisories have documented unauthenticated API access issues in DNA Center (CVE-2021-1257, CVE-2021-1258), authentication bypass vulnerabilities, and insufficient authorization checks that allow a read-only API user to invoke privileged operations.",
        "Cisco DevNet provides extensive REST API documentation, SDK toolkits (dnacentersdk Python library), and sandbox environments for testing. This openness is valuable for network automation — but also means attackers can study the API surface thoroughly before targeting production deployments. API enumeration and rate-limit bypass are the primary reconnaissance techniques against DNA Center and similar network management APIs.",
      ],
      technical: {
        title: "DNA Center API Authentication, Token Handling, and Authorization Boundary Weaknesses",
        body: [
          "Cisco DNA Center's REST API uses token-based authentication with two token types: short-lived service tokens (10 minutes, obtained by exchanging user credentials via POST to `/dna/system/api/v1/auth/token`) and long-lived integration tokens (valid up to 6 months) created by admins for automation systems. The token is passed as `X-Auth-Token` header on all subsequent API requests. Failure to properly scope integration tokens to specific operations is a recurring misconfiguration.",
          "The DNA Center API has a documented privilege model: SUPER-ADMIN-ROLE, NETWORK-ADMIN-ROLE, and OBSERVER-ROLE. The authorization checks between these roles — verifying that an OBSERVER-ROLE token cannot invoke SUPER-ADMIN-ROLE operations — are critical security boundaries. Cisco has issued advisories for insufficient authorization checks in specific API endpoints where OBSERVER tokens could access restricted operations. The attack pattern: obtain a low-privilege token (perhaps from an integration account with weak credentials), enumerate the API, and identify operations that should require elevated privilege but do not check adequately.",
          "DNA Center API enumeration uses the publicly documented OpenAPI specification (`/api/swagger-ui.html`) to discover all available endpoints without triggering authentication failures. Combined with rate limit bypass (distributing requests across session tokens or using the API's built-in pagination features), an attacker can systematically map the entire API surface and test each endpoint's authorization boundary before attempting privilege escalation.",
        ],
        codeExample: {
          label: "DNA Center API — authentication, enumeration, and privilege test",
          code: `# Step 1: Obtain DNA Center API token
curl -k -X POST "https://dnac.corp.local/dna/system/api/v1/auth/token" \\
  -H "Content-Type: application/json" \\
  -u "observer-account:Password123" \\
  -d '{}' | jq '.Token'
# Returns: "eyJhbGciOiJSUzI1NiJ9..."

export TOKEN="eyJhbGciOiJSUzI1NiJ9..."

# Step 2: Enumerate device inventory (expected for OBSERVER role)
curl -k -X GET "https://dnac.corp.local/dna/intent/api/v1/network-device" \\
  -H "X-Auth-Token: $TOKEN" | jq '.response[].hostname'
# Returns all managed device hostnames — 247 devices

# Step 3: Test privileged operation with OBSERVER token
# (should require SUPER-ADMIN — testing authorization boundary)
curl -k -X POST "https://dnac.corp.local/dna/intent/api/v1/network-device/sync" \\
  -H "X-Auth-Token: $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"payload": {"ipAddressList": ["10.0.1.1"]}}'
# Expected: 403 Forbidden
# Vulnerable response: 200 OK — INSUFFICIENT AUTHORIZATION CHECK

# Step 4: Extract device credentials (SUPER-ADMIN operation)
curl -k -X GET "https://dnac.corp.local/dna/intent/api/v1/global-credential" \\
  -H "X-Auth-Token: $TOKEN"
# If accessible: returns encrypted CLI credentials for all managed devices`,
        },
      },
      incident: {
        title: "DNA Center API Token Exposure — Network Configuration Manipulation at University",
        when: "2023",
        where: "Research university — Cisco DNA Center managing campus network of 600 devices",
        impact: "Long-lived SUPER-ADMIN integration token exposed in public GitHub repository; attacker used token to enumerate device inventory and modify VLAN assignments on 12 switches before detection",
        body: [
          "A network automation engineer at a research university committed a Python script to a public GitHub repository — and left the SUPER-ADMIN integration token hardcoded in the script file. A GitHub Actions workflow file referenced the script, making the token visible in public repository history. Within 36 hours, the token was scraped by an automated credential-scanning service and used by an attacker to access the DNA Center API.",
          "Using the exposed token, the attacker enumerated all 600 managed devices, identified switches serving the research computing VLAN, and pushed VLAN reassignment configuration changes that moved 12 research workstations into a less-monitored network segment. The changes were detected 4 hours later during a routine network audit. DNA Center's audit log preserved the complete API call history, enabling forensic reconstruction of every action taken with the exposed token. Remediation required invalidating the token, reverting all 12 VLAN changes, and auditing all API call history for data exfiltration.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Exposed API Token", sub: "SUPER-ADMIN token in public GitHub repo", type: "attacker" },
          { label: "DNA Center REST API", sub: "token accepted — full network management access", type: "system" },
          { label: "600 Managed Devices", sub: "enumerated; 12 switches VLAN-reconfigured", type: "victim" },
          { label: "Network Segmentation Altered", sub: "research VLAN moved to less-monitored segment", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Cisco DNA Center v1.0 released — intent-based networking management platform" },
        { year: 2021, event: "CVE-2021-1257 / CVE-2021-1258 — multiple DNA Center API privilege issues disclosed", highlight: true },
        { year: 2022, event: "DNA Center 2.3.3: enhanced RBAC with fine-grained API operation scoping" },
        { year: 2023, event: "Cisco renames DNA Center to Catalyst Center — API endpoints maintain backward compatibility" },
        { year: 2024, event: "Catalyst Center 2.3.7: OAuth 2.0 support for integration tokens — improved token lifecycle management" },
      ],
      keyTakeaways: [
        "Never commit DNA Center (Catalyst Center) API tokens to version control — use environment variables or secrets managers",
        "Use OBSERVER-ROLE tokens for read-only automation; reserve SUPER-ADMIN tokens for privileged operations with explicit justification",
        "Enable DNA Center audit logging and alert on unexpected API calls from integration accounts",
        "Rotate long-lived integration tokens regularly and expire them immediately after any credential exposure event",
      ],
      references: [
        { title: "Cisco DNA Center API Reference", url: "https://developer.cisco.com/docs/dna-center/" },
        { title: "CVE-2021-1257 — Cisco DNA Center Privilege Escalation", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-1257" },
        { title: "Cisco DevNet — DNA Center Security Best Practices", url: "https://developer.cisco.com/docs/dna-center/#!security" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.100.5",
        hostname: "catalyst-center",
        os: "Cisco Catalyst Center 2.3.5",
        openPorts: "443/tcp (REST API)",
        vulnerability: "Exposed OBSERVER-ROLE API token — 247-device network enumeration possible",
      },
      pivotTrigger: "dnac-getflag",
      scenario: "A network audit reveals a DNA Center (Catalyst Center) instance accessible on the management network. An exposed OBSERVER-ROLE API token was found in a decommissioned automation script. Use the token to enumerate the network, test authorization boundaries, and retrieve the audit flag from the device inventory.",
      hint: "Authenticate with the found token, enumerate devices, test a privileged endpoint, retrieve the flag from the inventory response.",
      hints: [
        "Start: cat api-brief.txt",
        "Authenticate and enumerate: dnac-enum 10.10.100.5",
        "Test authorization boundary: dnac-privtest 10.10.100.5",
        "Extract the flag from inventory: dnac-getflag 10.10.100.5",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/api-brief.txt", value: "FLAG{dnac_", label: "API Brief — Catalyst Center Target" },
        { trigger: "dnac-enum 10.10.100.5", value: "api_enum_", label: "Device Inventory Enumerated — 247 Devices" },
        { trigger: "dnac-privtest 10.10.100.5", value: "boundary_", label: "Authorization Boundary Tested" },
        { trigger: "dnac-getflag 10.10.100.5", value: "2024}", label: "Flag Retrieved from Device Inventory API" },
      ],
      files: {
        "/api-brief.txt": [
          "NETWORK AUDIT — CATALYST CENTER API",
          "Target: 10.10.100.5 (Cisco Catalyst Center)",
          "Found token: eyJhbGc... (OBSERVER-ROLE, long-lived)",
          "",
          "Sequence: dnac-enum 10.10.100.5 → dnac-privtest 10.10.100.5",
          "         → dnac-getflag 10.10.100.5 → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "api-brief.txt", isDir: false }] },
      extraCommands: {
        "dnac-enum": (args: string[]) => {
          const host = args[0] ?? "10.10.100.5";
          return {
            lines: [
              `GET https://${host}/dna/intent/api/v1/network-device`,
              "X-Auth-Token: eyJhbGc... (OBSERVER)",
              "",
              "HTTP/1.1 200 OK",
              "{",
              '  "response": [',
              '    {"hostname": "core-sw-01", "managementIpAddress": "10.0.1.1"},',
              '    {"hostname": "edge-rtr-01", "managementIpAddress": "10.0.1.2"},',
              "    ... 245 more devices ...",
              "  ]",
              "}",
              "",
              ">> 247 devices enumerated with OBSERVER token.",
              "   Run: dnac-privtest 10.10.100.5",
            ],
          };
        },
        "dnac-privtest": (args: string[]) => {
          const host = args[0] ?? "10.10.100.5";
          return {
            lines: [
              `POST https://${host}/dna/intent/api/v1/global-credential`,
              "X-Auth-Token: eyJhbGc... (OBSERVER)",
              "",
              "HTTP/1.1 403 Forbidden",
              '{"response": "Role access denied for this resource"}',
              "",
              ">> Authorization check WORKING — global credentials require SUPER-ADMIN.",
              "   OBSERVER token correctly restricted.",
              "   Run: dnac-getflag 10.10.100.5",
            ],
          };
        },
        "dnac-getflag": (args: string[]) => {
          const host = args[0] ?? "10.10.100.5";
          return {
            lines: [
              `GET https://${host}/dna/intent/api/v1/network-device?hostname=flag-server`,
              "",
              "HTTP/1.1 200 OK",
              "{",
              '  "response": [{',
              '    "hostname": "flag-server",',
              `    "serialNumber": "FLAG{dnac_api_enum_boundary_2024}",`,
              '    "softwareVersion": "17.9.4a"',
              "  }]",
              "}",
              "",
              "Flag embedded in device inventory. Fragment collected.",
              "Run 'assemble' for the full flag.",
            ],
            solved: true,
          };
        },
      },
    },
  },

  // ─── Stage m45: NETCONF/YANG/gRPC — Network Programmability Security — Quiz ───
  {
    epochId: "cisco-advanced",
    wonder: { name: "Internet Engineering Task Force (IETF)", location: "Virtual / Geneva, Switzerland", era: "2024 CE", emoji: "🌐" },
    id: "stage-m45",
    order: 45,
    title: "The Programmable Plane",
    subtitle: "NETCONF, YANG, and gRPC Model-Driven Telemetry — Network Automation Security and the Programmability Attack Surface",
    category: "cybersecurity",
    xp: 90,
    badge: { id: "badge-m-netconf", name: "Protocol Architect", emoji: "🌐" },
    challengeType: "quiz",
    info: {
      tagline: "Automating network configuration at scale means automating the security of that automation — one compromised controller reaches every managed device simultaneously.",
      year: 2024,
      overview: [
        "NETCONF (RFC 6241) is the IETF standard protocol for network device configuration management, operating over SSH transport with XML-encoded YANG data models. YANG (RFC 7950) is the data modeling language that defines the structure, semantics, and constraints of network configuration and operational data. Together, NETCONF/YANG replaced CLI-based management as the programmatic standard for network automation. Cisco IOS XE, IOS XR, and NX-OS all support NETCONF/YANG, and all Cisco intent-based networking tools (DNA Center/Catalyst Center, NSO) use NETCONF/YANG as the southbound management protocol to network devices.",
        "gRPC Model-Driven Telemetry (gRPC MDT) is the streaming telemetry protocol used by Cisco IOS XR and IOS XE to push real-time operational data (interface counters, BGP state, CPU utilization) to a collector without polling. It uses Protocol Buffers (protobuf) encoding over persistent gRPC streams, enabling per-second telemetry granularity that SNMP polling cannot approach. The Cisco Network Automation stack — gRPC MDT for telemetry + NETCONF for configuration + RESTCONF for API access — forms the 'programmable network plane.'",
        "The security implications of the programmable network plane are profound. NETCONF/YANG uses SSH transport — which is secure when properly configured. But the authorization model (what YANG operations a given SSH user can invoke) is configured on each device and is frequently misconfigured. A NETCONF session with SUPER-USER capability can push arbitrary configuration changes to the device. gRPC telemetry streams, if intercepted, reveal real-time operational state including session counts, route tables, and interface utilization — valuable reconnaissance data for an attacker.",
      ],
      technical: {
        title: "NETCONF Protocol Operations, YANG Capability Negotiation, and gRPC Telemetry Security",
        body: [
          "NETCONF defines four datastores: running (active configuration), candidate (staged changes before commit), startup (persisted config loaded at boot), and operational (live operational state, read-only). Configuration changes are sent as XML-encoded <edit-config> operations targeting the running or candidate datastore. The YANG model constrains what the XML can contain — invalid YANG structures are rejected. NETCONF over SSH on port 830 is the transport standard; port 830 should be restricted to trusted management hosts.",
          "YANG capability negotiation occurs at NETCONF session establishment — the device sends a <hello> message listing all YANG modules it supports. An attacker who intercepts a NETCONF session hello can fingerprint the exact software version and feature set of the device by analyzing the capability list, enabling targeted exploit selection. The capability list includes module names, revision dates, and feature flags — more information than most banner grabs provide.",
          "gRPC Model-Driven Telemetry uses mutual TLS (mTLS) for transport security when properly configured. Without mTLS, gRPC telemetry streams are either unencrypted or use one-way TLS (server certificate only, no client authentication). An attacker on the management network who can intercept gRPC telemetry receives a continuous stream of operational data. Worse, if the gRPC subscription configuration accepts subscriptions without authentication, an attacker can register as a telemetry collector and receive the same operational data the NOC is receiving.",
        ],
        codeExample: {
          label: "NETCONF/YANG session — capability negotiation and edit-config operation",
          code: `# Connect to Cisco IOS XE NETCONF (SSH, port 830)
ssh -p 830 netadmin@router.corp.local -s netconf

# Device sends <hello> with capabilities (fingerprinting opportunity):
# <hello xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
#   <capabilities>
#     <capability>urn:ietf:params:netconf:base:1.1</capability>
#     <capability>http://cisco.com/ns/yang/Cisco-IOS-XE-native
#       ?module=Cisco-IOS-XE-native&revision=2024-01-01</capability>
#     <!-- 200+ more capabilities — full version fingerprint -->
#   </capabilities>
# </hello>

# NETCONF edit-config (change interface description)
cat > edit.xml << 'EOF'
<rpc xmlns="urn:ietf:params:xml:ns:netconf:base:1.0" message-id="1">
  <edit-config>
    <target><running/></target>
    <config>
      <native xmlns="http://cisco.com/ns/yang/Cisco-IOS-XE-native">
        <interface>
          <GigabitEthernet>
            <name>1</name>
            <description>AUTOMATED-CONFIG-2024</description>
          </GigabitEthernet>
        </interface>
      </native>
    </config>
  </edit-config>
</rpc>
EOF

# gRPC MDT telemetry subscription (securing the subscription endpoint)
# Require mTLS: set certificate on gRPC server, require client cert
grpc
  port 57500
  tls-trustpoint <CA-TRUSTPOINT>
  # Without this: unauthenticated telemetry subscription possible`,
        },
      },
      incident: {
        title: "NETCONF Misconfiguration — Unauthenticated Configuration Push at ISP",
        when: "2023",
        where: "Tier-2 ISP — NETCONF/YANG enabled on all 340 PE routers for automation; port 830 accessible from monitoring VLAN",
        impact: "NETCONF service account with SUPER-USER privileges used across all devices; compromise of one automation server gave push access to all 340 devices; emergency privilege-scoping audit required",
        body: [
          "An ISP's network automation team provisioned a single NETCONF service account (`netconf-auto`) with full SUPER-USER privilege across all 340 provider edge routers to simplify automation development. When the automation server was compromised via a web application vulnerability, the attacker discovered the NETCONF credentials in the automation framework's configuration directory. The attacker had not yet used the NETCONF access when the compromise was detected, but forensic analysis confirmed they had enumerated NETCONF capabilities on all 340 devices.",
          "The remediation required emergency privilege scoping: replacing the single SUPER-USER service account with least-privilege NETCONF accounts scoped to specific YANG modules per function (interface configuration, routing policy, telemetry subscription) — a change that required coordinated rollout across all 340 devices. The incident drove adoption of a NETCONF proxy architecture where automation servers authenticate to a proxy, which applies privilege-scoped YANG operations to devices — eliminating direct device NETCONF access from automation servers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Automation Server", sub: "NETCONF SUPER-USER credentials stored on server", type: "attacker" },
          { label: "NETCONF / SSH Port 830", sub: "340 PE routers — all accessible from monitoring VLAN", type: "system" },
          { label: "All PE Routers", sub: "SUPER-USER access = full config push on all devices", type: "victim" },
          { label: "Emergency Remediation", sub: "least-privilege YANG scoping deployed to all 340 devices", type: "result" },
        ],
      },
      timeline: [
        { year: 2006, event: "NETCONF RFC 4741 published — first IETF standard for programmatic network configuration" },
        { year: 2010, event: "YANG RFC 6020 published — data modeling language for NETCONF" },
        { year: 2017, event: "gRPC Model-Driven Telemetry introduced in Cisco IOS XR — per-second streaming telemetry replaces SNMP" },
        { year: 2019, event: "RESTCONF (RFC 8040) and NETCONF/YANG become default management protocols in Cisco DNA Center / NSO", highlight: true },
        { year: 2024, event: "IETF NETMOD WG: YANG 1.2 with enhanced security annotations for network automation auditing" },
      ],
      keyTakeaways: [
        "Restrict NETCONF port 830 to trusted management hosts using infrastructure ACLs — never expose it to general network segments",
        "Use least-privilege YANG module scoping for all NETCONF service accounts — avoid SUPER-USER for automation unless explicitly required",
        "Require mTLS for gRPC telemetry subscriptions — unauthenticated subscriptions leak real-time operational state to anyone on the management network",
        "YANG capability negotiation in NETCONF hellos reveals detailed version information — treat NETCONF access logs as high-sensitivity data",
      ],
      references: [
        { title: "RFC 6241 — NETCONF Protocol", url: "https://datatracker.ietf.org/doc/html/rfc6241" },
        { title: "RFC 7950 — YANG Data Modeling Language", url: "https://datatracker.ietf.org/doc/html/rfc7950" },
        { title: "Cisco gRPC MDT Configuration Guide", url: "https://www.cisco.com/c/en/us/td/docs/routers/asr9000/software/asr9k-r6-6/telemetry/configuration/guide/b-telemetry-cg-asr9000-66x.html" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m45-q1",
          type: "NETCONF Security",
          challenge: `  A network engineer notes that NETCONF (port 830) on core
  routers is accessible from all VLANs including user access
  VLANs. The NETCONF service account has SUPER-USER privileges.
  A security auditor flags this as critical.`,
          text: "What are the two specific security risks the auditor identified?",
          options: [
            "NETCONF uses unencrypted XML and SUPER-USER privileges are default for all accounts",
            "Port 830 accessible from user VLANs exposes it to lateral movement from compromised workstations; SUPER-USER NETCONF access allows full configuration modification on every device — blast radius is the entire managed network",
            "NETCONF port 830 conflicts with HTTPS and causes service disruption; SUPER-USER causes device reload",
            "NETCONF is deprecated — the risk is using an outdated protocol that vendors no longer patch",
          ],
          correctIndex: 1,
          explanation: "Two independent risks: (1) Broad network reachability of port 830 means a compromised workstation on any user VLAN can attempt NETCONF connections directly to core routers. (2) SUPER-USER NETCONF access means a single compromised service account credential gives full configuration push access to every managed device simultaneously — the blast radius of a credential compromise is the entire network.",
        },
        {
          id: "m45-q2",
          type: "YANG Model",
          challenge: `  A NETCONF client sends an edit-config RPC to change an
  interface's IP address. The YANG data model for the target
  device requires the IP address to be in CIDR notation
  (e.g., 192.168.1.1/24). The client sends a bare IP address
  without a prefix length.`,
          text: "How does the YANG model enforce this constraint, and what happens to the invalid configuration?",
          options: [
            "YANG constraints are advisory only — the device applies the configuration and logs a warning",
            "The NETCONF server validates the XML against the YANG model before applying the configuration — the invalid input is rejected with an error RPC reply, and no change is made to the device configuration",
            "The YANG model strips invalid fields — the IP address is applied without the prefix, defaulting to /32",
            "YANG validation only runs during commit operations, not edit-config — the change is staged then fails at commit",
          ],
          correctIndex: 1,
          explanation: "YANG models define strict type constraints, range checks, pattern validations, and must-statements. The NETCONF server validates inbound edit-config XML against the YANG model before applying any changes. An input that violates the model (wrong type, missing required field, constraint violation) returns an <rpc-error> reply and leaves the configuration unchanged — this is a core safety property of NETCONF/YANG over CLI-based management.",
        },
        {
          id: "m45-q3",
          type: "gRPC Telemetry",
          challenge: `  A network operations team deploys gRPC Model-Driven Telemetry
  on Cisco IOS XR routers to stream interface statistics to a
  monitoring server. The gRPC telemetry is configured without
  TLS (plaintext mode). A security review flags this.`,
          text: "What specific threat does unencrypted gRPC telemetry introduce?",
          options: [
            "Plaintext gRPC prevents the monitoring server from parsing the telemetry data",
            "An attacker on the management network can intercept the gRPC stream to receive real-time operational data (interface utilization, BGP session states, route counts) — valuable reconnaissance; also, without mutual TLS, an attacker can impersonate the telemetry collector and register a malicious subscription",
            "Plaintext gRPC only risks exposing device hostnames — operational data is encoded in protobuf which is not human-readable",
            "Unencrypted gRPC introduces latency that makes telemetry data stale by the time it arrives",
          ],
          correctIndex: 1,
          explanation: "gRPC without TLS exposes the telemetry stream in plaintext on the management network. An attacker who can intercept the stream receives real-time operational data — interface utilization rates, BGP peer states, routing table sizes, CPU/memory — that reveals network topology and capacity. Without mutual TLS client authentication, an attacker can also register a fraudulent telemetry subscription, receiving the same data stream as the NOC.",
        },
        {
          id: "m45-q4",
          type: "Automation Security",
          challenge: `  A network automation team uses a single shared NETCONF
  service account with SUPER-USER privilege to manage all
  450 network devices. When a security architect proposes
  least-privilege YANG scoping, the team objects that it
  would require 450 separate account configurations.`,
          text: "What architecture pattern resolves the tension between centralized automation and least-privilege NETCONF access?",
          options: [
            "Use a separate NETCONF account per device — 450 accounts with 450 different passwords",
            "Deploy a NETCONF proxy (such as Cisco NSO) that authenticates automation clients with scoped credentials, then translates to privileged NETCONF operations on devices — automation servers never hold device SUPER-USER credentials directly",
            "Accept the risk — SUPER-USER is required for full automation capability and the team's objection is valid",
            "Use SSH certificates instead of passwords — certificate-based NETCONF eliminates the need for privilege scoping",
          ],
          correctIndex: 1,
          explanation: "A NETCONF proxy (Cisco NSO, or a custom northbound API layer) accepts automation requests with operation-scoped credentials, applies policy enforcement, and issues privileged NETCONF operations to devices. Automation clients authenticate to the proxy with least-privilege credentials scoped to their function (e.g., 'interface-description-write'). The proxy holds the privileged device credentials in a secure credential store, never exposed to automation server file systems.",
        },
      ],
    },
  },

  // ─── Stage m46: CyberOps — SOC Analyst Kill Chain CTF ────────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco CyberOps Training Center", location: "Chicago, Illinois, USA", era: "2024 CE", emoji: "🕵️" },
    id: "stage-m46",
    order: 46,
    title: "Zero to Domain Admin",
    subtitle: "CyberOps Associate SOC Analyst — Phishing to Domain Compromise Kill Chain Analysis",
    category: "cybersecurity",
    xp: 140,
    badge: { id: "badge-m-cyberops", name: "CyberOps Analyst", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "Every domain compromise starts with one email — the SOC analyst who catches it at stage one saves the organization from stage five.",
      year: 2024,
      overview: [
        "The Cisco CyberOps Associate certification (CBROPS 200-201) defines the core competency framework for Security Operations Center (SOC) analysts. It covers five domains: security concepts, security monitoring, host-based analysis, network intrusion analysis, and security policies and procedures. The most critical applied skill is kill chain analysis — given a set of alerts, logs, and network data, reconstruct the complete attacker timeline from initial access through command and control to objectives.",
        "Phishing-to-domain-compromise is the most common enterprise attack pattern observed in SOC environments. The typical chain: spear-phishing email delivers macro-enabled document → user opens document, macro executes → PowerShell downloads and runs a Cobalt Strike beacon → beacon establishes C2 channel → attacker uses beacon for credential harvesting (Mimikatz) → pass-the-hash lateral movement to domain controller → Active Directory enumeration and Domain Admin account creation. Each step leaves artifacts visible to a SOC analyst with the right data sources.",
        "SIEM correlation rules are the backbone of SOC detection for kill chain attacks. MITRE ATT&CK mapping enables SOC teams to tag each detected technique to the framework — Initial Access (T1566.001 Spearphishing), Execution (T1059.001 PowerShell), Command and Control (T1071.001 Web Protocols), Lateral Movement (T1550.002 Pass the Hash), Privilege Escalation (T1078 Valid Accounts). A complete kill chain mapped to ATT&CK tells the analyst both what happened and what the defender's recommended countermeasure is for each phase.",
      ],
      technical: {
        title: "SOC Kill Chain Reconstruction — Data Sources and Detection Techniques",
        body: [
          "Initial access via spearphishing is detected through a combination of email gateway analysis (Cisco Secure Email: sender reputation, attachment sandbox verdict, URL analysis), endpoint telemetry (Cisco Secure Endpoint: file write event when attachment is saved, process creation when document opens), and network analysis (Firepower: DNS query to newly-registered domain, outbound HTTP to non-categorized URL). No single source definitively flags the attack; the correlation of all three provides high-confidence detection.",
          "PowerShell execution for payload delivery is one of the highest-signal detection indicators. PowerShell with encoded commands (`powershell.exe -EncodedCommand`) or download cradle patterns (`Invoke-WebRequest`, `Net.WebClient.DownloadString`) from Office application parent processes (WINWORD.EXE, EXCEL.EXE) is a known-bad pattern. Cisco Secure Endpoint detects this via behavioral analysis. Orbital query `SELECT * FROM processes WHERE parent_name = 'WINWORD.EXE' AND name = 'powershell.exe'` confirms the execution chain.",
          "Lateral movement via pass-the-hash is visible in authentication logs as NT LAN Manager (NTLM) authentication events originating from a workstation to internal servers — specifically Windows Event ID 4624 (logon type 3, NTLM package) from unusual source hosts. Combined with Firepower NetFlow showing SMB traffic between the compromised workstation and high-value servers, pass-the-hash is a high-confidence lateral movement indicator that triggers immediate containment in a mature SOC playbook.",
        ],
        codeExample: {
          label: "SOC kill chain — SIEM correlation rules for phishing-to-domain-compromise",
          code: `# SIEM Correlation: Phishing Kill Chain Detection (Splunk SPL pseudocode)

# Stage 1: Macro-enabled document + child process execution
index=endpoint source=secure_endpoint
| where parent_process IN ("WINWORD.EXE","EXCEL.EXE","MSPUB.EXE")
  AND process_name = "powershell.exe"
  AND cmdline LIKE "%-EncodedCommand%"
| eval stage="Initial_Access"

# Stage 2: PowerShell C2 callback (outbound to non-corporate DNS)
index=network source=umbrella
| where query NOT IN (known_corporate_domains)
  AND query_type = "A"
  AND requestor_category = "Newly Seen Domain"
| join by requestor_ip [search index=endpoint stage="Initial_Access"]
| eval stage="C2_Callback"

# Stage 3: Lateral movement (NTLM type-3 logon from workstation)
index=auth source=windows_events EventCode=4624
| where Logon_Type=3 AND Auth_Package="NTLM"
  AND src_workstation_type="workstation"
  AND dest_server_type IN ("domain_controller","file_server")
| join by src_ip [search index=endpoint stage="C2_Callback"]
| eval stage="Lateral_Movement"
| alert SOC HIGH MITRE_ATT&CK=T1550.002`,
        },
      },
      incident: {
        title: "30-Minute SOC Response — Phishing Kill Chain Caught at Stage 2",
        when: "2023",
        where: "Financial services firm — Cisco SecureX + Secure Endpoint + Umbrella + Secure Email SOC deployment",
        impact: "SOC analyst caught Cobalt Strike beacon C2 callback at stage 2 of the kill chain (30 minutes after phishing email delivery); workstation quarantined before pass-the-hash lateral movement to domain controller; zero data exfiltration confirmed",
        body: [
          "A finance department employee received a spearphishing email with a Word document containing an embedded macro. Cisco Secure Email flagged the attachment as suspicious (macro-enabled, not in trusted sender list) but delivered it due to organization-wide policy allowing macro documents from external senders. Three minutes after the email was delivered, Cisco Secure Endpoint fired an alert: WINWORD.EXE spawning powershell.exe with an EncodedCommand argument.",
          "The SOC analyst correlated the Secure Endpoint alert with an Umbrella DNS alert for a newly-registered domain queried from the same workstation 45 seconds after the PowerShell execution. The combined signal — Office process spawning PowerShell + DNS query to new domain — was sufficient for immediate quarantine. The workstation was isolated via Cisco XDR automated response in 8 seconds after the analyst approved the playbook. Post-mortem analysis confirmed the workstation was running Cobalt Strike; the beacon had not yet received lateral movement tasking from C2. Total time from phishing delivery to containment: 30 minutes.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Phishing Email", sub: "macro-enabled Word doc — Secure Email flagged suspicious", type: "attacker" },
          { label: "WINWORD.EXE → powershell.exe", sub: "Secure Endpoint: child process + encoded command", type: "system" },
          { label: "C2 DNS Callback", sub: "Umbrella: newly-registered domain query 45s later", type: "victim" },
          { label: "SOC Quarantine", sub: "XDR automated response — workstation isolated in 8 seconds", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "SANS Top 20 Critical Controls — SOC analyst role formalized in enterprise security" },
        { year: 2013, event: "Cisco acquires Sourcefire — SOC tooling integrated into Cisco security portfolio" },
        { year: 2019, event: "Cisco CyberOps Associate (CBROPS 200-201) certification launched — SOC analyst competency standard" },
        { year: 2021, event: "MITRE ATT&CK v10 — kill chain framework adopted as universal SOC analysis vocabulary", highlight: true },
        { year: 2024, event: "Cisco CyberOps Associate exam updated for cloud, XDR, and AI-assisted SOC analysis competencies" },
      ],
      keyTakeaways: [
        "Correlate endpoint, network, and email telemetry — no single data source gives a complete kill chain picture",
        "Office process spawning PowerShell with EncodedCommand is a top-tier detection signal — tune SIEM correlation rules for this pattern",
        "Map every detected technique to MITRE ATT&CK — it makes response playbooks consistent and identifies defense gaps",
        "Automated quarantine via XDR playbook reduces mean time to contain from hours to seconds — pre-build playbooks before incidents",
      ],
      references: [
        { title: "Cisco CyberOps Associate — Exam Topics (200-201)", url: "https://learningnetwork.cisco.com/s/cbrops-exam-topics" },
        { title: "MITRE ATT&CK — Enterprise Matrix", url: "https://attack.mitre.org/matrices/enterprise/" },
        { title: "Cisco Talos — Cobalt Strike Detection", url: "https://blog.talosintelligence.com/cobalt-strike-hunting/" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.20.5", hostname: "soc-ws", os: "SOC Analyst Workstation" },
      targetMachine: {
        ip: "10.10.20.22",
        hostname: "WS-22",
        os: "Windows 10 — Cobalt Strike beacon active",
        openPorts: "445/tcp (lateral movement attempt to DC-01)",
        vulnerability: "Phishing kill chain — C2 beacon active, pass-the-hash toward Domain Controller",
      },
      scenario: "You are a Cisco CyberOps Associate SOC analyst. A SIEM alert fires at 09:14. Work through the kill chain: analyze the phishing email alert, the endpoint execution alert, the C2 DNS callback, and the lateral movement attempt. Identify each stage and capture the investigation flag.",
      hint: "Work through the alerts in sequence — phishing, PowerShell execution, C2 DNS, lateral movement. Each investigation step yields a flag fragment.",
      hints: [
        "Start: cat siem-alert.txt",
        "Analyze phishing: soc-email WS-22",
        "Check endpoint execution: soc-endpoint WS-22",
        "Trace C2 callback: soc-dns WS-22",
        "Identify lateral movement: soc-netflow WS-22",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/siem-alert.txt", value: "FLAG{cyberops_", label: "SIEM Alert — Kill Chain Investigation Start" },
        { trigger: "soc-email WS-22", value: "killchain_", label: "Email Stage — Phishing Confirmed" },
        { trigger: "soc-endpoint WS-22", value: "powershell_", label: "Execution Stage — Cobalt Strike Beacon" },
        { trigger: "soc-netflow WS-22", value: "contained}", label: "Lateral Movement — Attacker Stopped at Domain Controller" },
      ],
      files: {
        "/siem-alert.txt": [
          "SIEM ALERT — HIGH — 09:14:22",
          "Correlation: Office process + encoded PowerShell + new domain DNS",
          "Host: WS-22 (10.10.20.22) — Finance Department",
          "",
          "Sequence: soc-email WS-22 → soc-endpoint WS-22",
          "         → soc-dns WS-22 → soc-netflow WS-22 → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "siem-alert.txt", isDir: false }] },
      extraCommands: {
        "soc-email": (args: string[]) => {
          if (args[0] === "WS-22") {
            return {
              lines: [
                "Secure Email — WS-22 (finance.user@corp.local) 09:11:",
                "  From: cfo-update@corp-finance-notification.com",
                "  Subject: Q3 Budget Approval Required",
                "  Attachment: Q3_Budget_Review.docm (macro-enabled Word)",
                "  Verdict: SUSPICIOUS (macro-enabled, newly registered sender domain)",
                "  Delivered: YES (policy: allow macro docs)",
                "",
                ">> ATT&CK: T1566.001 — Spearphishing Attachment",
                "   Sender domain registered 3 days ago. Classic spearphishing.",
              ],
            };
          }
          return { lines: ["Usage: soc-email <host>"] };
        },
        "soc-endpoint": (args: string[]) => {
          if (args[0] === "WS-22") {
            return {
              lines: [
                "Secure Endpoint — WS-22 — 09:14:",
                "  WINWORD.EXE (PID 4412) spawned:",
                "    └─ powershell.exe -EncodedCommand SQBFAFgAIAAo...",
                "         (decoded: IEX (New-Object Net.WebClient).DownloadString(...))",
                "  File dropped: C:\\Users\\Public\\svc.exe (SHA: a1b2c3...)",
                "  Verdict: Cobalt Strike Beacon",
                "",
                ">> ATT&CK: T1059.001 — PowerShell download cradle",
                "   T1055 — Process injection (svc.exe)",
              ],
            };
          }
          return { lines: ["Usage: soc-endpoint <host>"] };
        },
        "soc-dns": (args: string[]) => {
          if (args[0] === "WS-22") {
            return {
              lines: [
                "Umbrella DNS — WS-22 — 09:14-09:16:",
                "  update-cdn-service.xyz → 198.51.100.99 (C2)",
                "  Category: Newly Registered Domain (2 days old)",
                "  Talos: MALICIOUS — Cobalt Strike C2 infrastructure",
                "",
                "  DNS callback 45 seconds after PowerShell execution.",
                ">> ATT&CK: T1071.001 — Application Layer Protocol (C2)",
              ],
            };
          }
          return { lines: ["Usage: soc-dns <host>"] };
        },
        "soc-netflow": (args: string[]) => {
          if (args[0] === "WS-22") {
            return {
              lines: [
                "Firepower NetFlow — WS-22 — 09:17:",
                "  10.10.20.22 → 10.10.10.5:445  SMB  [DC-01 — Domain Controller]",
                "  10.10.20.22 → 10.10.10.5:135  RPC  [DC-01]",
                "  Authentication: NTLM Type 3 (pass-the-hash attempt)",
                "",
                "  >> Lateral movement toward Domain Controller BLOCKED by Firepower policy.",
                "  >> ATT&CK: T1550.002 — Pass the Hash",
                "",
                "  Quarantine initiated via XDR Automate at 09:17:42.",
                "  Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: soc-netflow <host>"] };
        },
      },
    },
  },

  // ─── Stage m47: CyberOps Associate — Domains & Exam Alignment — Quiz ─────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Networking Academy", location: "San Jose, California, USA", era: "2024 CE", emoji: "🎓" },
    id: "stage-m47",
    order: 47,
    title: "The Five Domains",
    subtitle: "Cisco CyberOps Associate (CBROPS 200-201) — Exam Domain Alignment, SOC Analyst Competencies, and Security Monitoring Architecture",
    category: "cybersecurity",
    xp: 85,
    badge: { id: "badge-m-cbrops", name: "CyberOps Associate", emoji: "🎓" },
    challengeType: "quiz",
    info: {
      tagline: "The CyberOps Associate certification defines what a tier-1 SOC analyst must know — not just what tools to use, but why each data source matters.",
      year: 2024,
      overview: [
        "The Cisco CyberOps Associate certification (exam 200-201 CBROPS) is the entry-level certification for Security Operations Center (SOC) analyst roles. It is organized into five exam domains: Security Concepts (25%), Security Monitoring (22%), Host-Based Analysis (20%), Network Intrusion Analysis (21%), and Security Policies and Procedures (12%). The certification is mapped to the NICE Cybersecurity Workforce Framework (SP-OPS-001 — Cyber Defense Analyst work role) and the MITRE ATT&CK framework.",
        "The Security Monitoring domain covers the data sources that a SOC analyst uses to detect threats: SIEM (Security Information and Event Management) correlation rules, network traffic analysis (NetFlow/IPFIX), full packet capture (FPC), and security event log management. Understanding the difference between these data sources — what each can and cannot detect — is a core analyst competency. SIEM correlation detects known patterns; FPC enables retroactive investigation; NetFlow detects anomalous traffic volumes without payload analysis.",
        "The Network Intrusion Analysis domain covers the interpretation of IDS/IPS alerts, protocol analysis (TCP/IP, DNS, HTTP, TLS), packet capture analysis using Wireshark, and the distinction between true positive, false positive, true negative, and false negative IDS alert classifications. A skilled analyst who correctly tunes IDS rules to minimize false positives while maximizing true positive detection is more valuable than one who simply forwards all alerts to ticket queues.",
      ],
      technical: {
        title: "SOC Data Sources, SIEM Correlation, and Alert Classification",
        body: [
          "The SOC data source hierarchy for a mature Cisco deployment: Cisco Secure Email (email threat telemetry) → Cisco Umbrella (DNS-layer security, first detection of C2 domains) → Cisco Secure Endpoint (endpoint behavioral telemetry, file hashes, process chains) → Cisco Firepower (network intrusion signatures, NetFlow, SSL inspection) → Cisco Secure Network Analytics (network behavior analytics, anomaly detection at scale). Each layer catches what the previous one misses — email gateway blocks known-malicious attachments, DNS layer catches C2 callbacks to new domains, endpoint detects payload execution, and network detects lateral movement patterns.",
          "SIEM correlation rules combine events from multiple sources using temporal and relational logic. A well-designed correlation rule for a PowerShell download cradle: `WINWORD.EXE spawns powershell.exe AND powershell.exe has '-EncodedCommand' in cmdline AND PowerShell makes outbound HTTP/S connection within 60 seconds`. This three-condition rule has high true positive rate and low false positive rate because each condition individually might be benign, but the combination is almost exclusively malicious.",
          "IDS alert classification in SOC practice: True Positive (TP) — alert fires and attack is real; False Positive (FP) — alert fires but traffic is benign; True Negative (TN) — no alert and no attack; False Negative (FN) — attack occurs but no alert fires. SOC ROI depends on minimizing FP (analyst time wasted) and FN (attacks missed). Precision = TP / (TP + FP); Recall = TP / (TP + FN). A mature SOC tracks both metrics per rule set and tunes accordingly.",
        ],
        codeExample: {
          label: "SIEM correlation and IDS alert quality metrics",
          code: `# SOC alert quality tracking — calculate precision and recall per rule

# Alert data (30-day window):
# Rule: "Office-Process-Spawns-PowerShell"
#   Total alerts fired: 847
#   True positives (real malicious activity): 312
#   False positives (legitimate PowerShell automation): 535

precision = TP / (TP + FP) = 312 / (312 + 535) = 312 / 847 = 0.368 (36.8%)
# → Too many false positives — rule needs tightening

# Refinement: add condition "cmdline contains -EncodedCommand OR Invoke-WebRequest"
#   New total alerts: 89
#   True positives: 87
#   False positives: 2

precision_v2 = 87 / (87 + 2) = 87 / 89 = 0.978 (97.8%)  ← much better
recall = TP / (TP + FN)  # Requires known attack dataset for validation

# IDS tuning cycle:
# 1. Identify high-FP rules (precision < 70%)
# 2. Add conditions to reduce FP while preserving TP
# 3. Revalidate against known-attack replay (red team findings)
# 4. Document changes in SIEM rule management system`,
        },
      },
      incident: {
        title: "Untuned SIEM — SOC Alert Fatigue and Missed True Positive",
        when: "2022",
        where: "Financial services firm — 12-analyst SOC, 2.3 million SIEM alerts per day",
        impact: "SOC alert fatigue from 96% false positive rate caused analysts to deprioritize review queue; a true positive ransomware alert was actioned 4 hours late; $280K ransom paid; post-incident SIEM tuning project reduced FP rate to 43%",
        body: [
          "A financial services SOC was generating 2.3 million SIEM alerts per day with a 96% false positive rate — 2.2 million analyst-hours worth of noise for 12 analysts handling 8-hour shifts. The analyst team developed alert fatigue: tickets were created for all high-severity alerts, but the queue backlog averaged 9 hours. When LockBit ransomware triggered a legitimate high-severity alert (Office macro + PowerShell + outbound C2), it entered the 9-hour queue behind 847 false-positive 'Office spawns PowerShell' alerts from legitimate IT automation scripts.",
          "The ransomware alert was actioned 4 hours into the backlog window — by which point encryption had reached 14 servers. A 3-month SIEM tuning project following the incident reduced the alert volume to 180,000 per day (92% reduction) while maintaining true positive recall at 97%. The project focused on: suppressing known-good process chains, applying ATT&CK technique correlation across multiple low-signal events, and building ML-assisted alert scoring. Alert fatigue is now a named risk in NIST SP 800-137 continuous monitoring guidance.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Email / DNS / Endpoint / Network", sub: "five SOC data source layers — each catches what others miss", type: "system" },
          { label: "SIEM Correlation Engine", sub: "cross-source rules — temporal + relational logic", type: "system" },
          { label: "SOC Analyst Triage", sub: "true positive vs false positive classification", type: "victim" },
          { label: "Response Playbook", sub: "quarantine, block, escalate — driven by ATT&CK mapping", type: "result" },
        ],
      },
      timeline: [
        { year: 2005, event: "ArcSight / QRadar first generation SIEM — correlation rules replace manual log review" },
        { year: 2013, event: "MITRE ATT&CK v1 released — adversary tactic and technique taxonomy for SOC tuning" },
        { year: 2019, event: "Cisco CyberOps Associate certification launched — standardizes SOC analyst competency framework" },
        { year: 2022, event: "NIST SP 800-137A: alert fatigue named as formal continuous monitoring risk factor", highlight: true },
        { year: 2024, event: "AI-assisted SIEM triage (Cisco AI Defense, Splunk SOAR) reduces analyst false positive burden via ML scoring" },
      ],
      keyTakeaways: [
        "The five CyberOps domains (Security Concepts, Monitoring, Host Analysis, Network Intrusion Analysis, Policies) define the complete SOC analyst competency framework",
        "SIEM precision (low FP rate) matters as much as recall (low FN rate) — alert fatigue from high-FP rules is a documented path to missed true positives",
        "Each SOC data source layer catches different threats: email catches attachments, DNS catches C2 callbacks, endpoint catches execution chains, network catches lateral movement",
        "MITRE ATT&CK mapping of detected techniques drives consistent response playbooks and surfaces defense gaps by tactic",
      ],
      references: [
        { title: "Cisco CyberOps Associate — Exam Topics", url: "https://learningnetwork.cisco.com/s/cbrops-exam-topics" },
        { title: "MITRE ATT&CK — Enterprise Framework", url: "https://attack.mitre.org/" },
        { title: "NIST SP 800-137A — Assessing Information Security Continuous Monitoring Programs", url: "https://csrc.nist.gov/publications/detail/sp/800-137a/final" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m47-q1",
          type: "SOC Data Sources",
          challenge: `  A SOC analyst is investigating a potential Cobalt Strike
  infection. They have Cisco Umbrella and Cisco Secure Endpoint
  both deployed. The Umbrella alert fired first — a query
  for a newly-registered domain. No Secure Endpoint alert
  has fired yet.`,
          text: "What does the Umbrella alert represent in the kill chain, and why is it valuable to detect it before Secure Endpoint fires?",
          options: [
            "Umbrella catching the DNS query means the infection is already complete — Secure Endpoint should be checked for malware",
            "Umbrella detecting the C2 DNS callback often precedes Secure Endpoint's payload analysis by seconds to minutes — catching it here allows blocking the domain before C2 communication is fully established, potentially preventing the beacon from receiving its first tasking",
            "Umbrella DNS alerts are lower confidence than Secure Endpoint — wait for Secure Endpoint confirmation before acting",
            "Umbrella only logs DNS queries it blocks — if the domain was logged, it means Umbrella already blocked it automatically",
          ],
          correctIndex: 1,
          explanation: "Umbrella operates at the DNS layer — it intercepts the domain lookup before the TCP connection to the C2 server is established. A newly-registered domain alert from Umbrella may fire within seconds of the payload running, before Secure Endpoint completes behavioral analysis. Blocking the C2 domain at the DNS layer prevents the beacon from establishing its first C2 session, potentially containing the compromise before any attacker commands are issued.",
        },
        {
          id: "m47-q2",
          type: "Alert Classification",
          challenge: `  A SOC analyst reviews 100 IDS alerts generated by the rule
  "Possible SQL Injection — HTTP POST with SELECT keyword".
  After investigation: 8 were genuine SQL injection attempts,
  52 were legitimate database-driven web applications POSTing
  SELECT queries, and 40 were search forms with the word "select".`,
          text: "What is the precision of this rule, and what does the result indicate about the rule quality?",
          options: [
            "Precision = 8% — the rule fires 100 times but only 8 are real attacks; too many false positives from legitimate database operations and form fields",
            "Precision = 92% — the 92 false positives indicate the attacker is using evasion; the rule should be kept",
            "Precision cannot be calculated without knowing how many SQL injections were missed (false negatives)",
            "Precision = 52% — only form-based false positives count; database application positives are not false positives",
          ],
          correctIndex: 0,
          explanation: "Precision = TP / (TP + FP) = 8 / (8 + 92) = 8%. The rule generates 92 false positives for every 8 true positives. This is a low-precision rule that generates significant analyst noise. The fix: add conditions that distinguish malicious SQL injection (HTTP error responses, UNION SELECT, time-based blind injection patterns) from legitimate SELECT queries in web application POST bodies.",
        },
        {
          id: "m47-q3",
          type: "CyberOps Domains",
          challenge: `  A CyberOps Associate student is studying for the 200-201 exam.
  They must identify which exam domain covers: analyzing pcap
  files in Wireshark, identifying anomalous TCP session behavior,
  and interpreting Snort alert output.`,
          text: "Which CyberOps Associate exam domain covers packet capture analysis, TCP behavior, and IDS alert interpretation?",
          options: [
            "Security Monitoring — covers all real-time traffic analysis and alerting",
            "Network Intrusion Analysis — this domain specifically covers pcap analysis, protocol behavior, Wireshark usage, and IDS/IPS alert interpretation including Snort signature analysis",
            "Host-Based Analysis — covers network connections from the endpoint perspective",
            "Security Concepts — covers foundational security principles including networking protocols",
          ],
          correctIndex: 1,
          explanation: "Network Intrusion Analysis (21% of the 200-201 exam) covers: network protocol analysis, Wireshark pcap analysis, TCP/IP layer-by-layer understanding, IDS/IPS rule interpretation, and Snort alert format analysis. Security Monitoring (22%) covers SIEM, NetFlow, and log management. Host-Based Analysis (20%) covers endpoint forensics. The domains are distinct competency areas, and understanding which domain covers which skill is itself an exam topic.",
        },
        {
          id: "m47-q4",
          type: "MITRE ATT&CK",
          challenge: `  A SOC analyst detects: an encoded PowerShell command
  spawned by WINWORD.EXE, followed by a DNS query to a
  newly-registered domain, followed by NTLM authentication
  from the same workstation to a domain controller.`,
          text: "Mapping these three events to MITRE ATT&CK, which techniques are represented?",
          options: [
            "T1190 (Exploit Public-Facing Application), T1082 (System Information Discovery), T1078 (Valid Accounts)",
            "T1059.001 (PowerShell execution via Office macro), T1071.001 (C2 via web protocol / DNS), T1550.002 (Pass the Hash for lateral movement)",
            "T1566.001 (Spearphishing), T1105 (Ingress Tool Transfer), T1021.002 (Remote Services — SMB)",
            "T1204.002 (User Execution — Malicious File), T1055 (Process Injection), T1018 (Remote System Discovery)",
          ],
          correctIndex: 1,
          explanation: "Encoded PowerShell from WINWORD.EXE = T1059.001 (Command and Scripting Interpreter: PowerShell). DNS query to newly-registered domain for C2 = T1071.001 (Application Layer Protocol: Web Protocols — DNS is used for C2 communication). NTLM authentication to domain controller from workstation = T1550.002 (Use Alternate Authentication Material: Pass the Hash). Each step maps directly to a specific ATT&CK sub-technique, enabling consistent response playbook triggering.",
        },
      ],
    },
  },

  // ─── Stage m48: Cisco Silicon One — Security Architecture — CTF ───────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Cisco Silicon One Engineering", location: "Santa Clara, California, USA", era: "2024 CE", emoji: "⚡" },
    id: "stage-m48",
    order: 48,
    title: "The Unified ASIC",
    subtitle: "Cisco Silicon One — Programmable Forwarding ASIC Security: P4 Pipeline Integrity, MACsec Hardware Encryption, and gRPC Telemetry Attack Surface",
    category: "cybersecurity",
    xp: 130,
    badge: { id: "badge-m-silicon", name: "Silicon Defender", emoji: "⚡" },
    challengeType: "ctf",
    info: {
      tagline: "A 25.6 Tbps forwarding chip is only as secure as the control plane that programs it — compromise the controller, and you reprogram the packet path.",
      year: 2024,
      overview: [
        "Cisco Silicon One is Cisco's unified programmable ASIC platform, powering the Cisco 8000 series routers, Cisco NCS 5700 series, and licensed to several hyperscale network operators. Unlike traditional NPU architectures that separate line-card ASICs from route processor ASICs, Silicon One is a single unified chip that handles both high-performance packet forwarding (25.6 Tbps per chip in Q200L configuration) and complex networking functions including full BGP/MPLS/SRv6 processing, telemetry generation, and hardware-accelerated MACsec encryption.",
        "The security implications of Silicon One's programmable forwarding pipeline are significant. Silicon One supports P4 (Programming Protocol-Independent Packet Processors) — a domain-specific language for defining how packets are parsed and forwarded in the ASIC. P4 programs are compiled to ASIC configuration tables that define match-action rules at line rate. The P4 pipeline can be modified at runtime via the control plane. A compromised control plane that can push malicious P4 programs to Silicon One could redirect, drop, or duplicate traffic at wire speed — 25.6 Tbps of traffic manipulation capability in a single ASIC.",
        "Silicon One's hardware-accelerated MACsec (IEEE 802.1AE) encryption runs at line rate on all interfaces — enabling hop-by-hop Layer 2 encryption for inter-datacenter and carrier interconnects without performance penalty. This is Silicon One's most important security feature for post-quantum network architecture: MACsec provides a cryptographic boundary at each network hop that can be upgraded to quantum-resistant cipher suites independently of higher-layer protocols. The telemetry security surface — gRPC MDT streaming operational data including exact traffic rates and forwarding table contents — must also be secured with mTLS to prevent reconnaissance from intercepted telemetry.",
      ],
      technical: {
        title: "Silicon One P4 Pipeline, MACsec Line-Rate Encryption, and Control Plane Attack Surface",
        body: [
          "Silicon One's P4-programmable forwarding pipeline operates as a match-action table hierarchy: headers are parsed from the incoming packet, matched against programmed tables, and forwarding actions are applied. The match-action tables are populated by the control plane (IOS XR or IOS XE) translating high-level routing and policy configuration into ASIC table entries. The security boundary between the control plane (software) and the forwarding plane (P4 ASIC tables) is critical: unauthorized modification of ASIC table entries — whether via a software vulnerability in IOS XR, a NETCONF misconfiguration, or a supply chain compromise in the P4 compiler toolchain — results in hardware-enforced traffic manipulation.",
          "MACsec on Silicon One implements IEEE 802.1AE with GCM-AES-256 cipher suite at line rate. Each point-to-point link has a Security Association Key (SAK) negotiated via MKA (MACsec Key Agreement protocol over 802.1X). MACsec encrypts the Ethernet frame payload and authenticates the frame header — preventing eavesdropping and replay attacks on inter-device links. Silicon One's line-rate MACsec does not impact forwarding throughput, making it practical for deployment on all inter-datacenter links. The attack surface for MACsec is in the MKA key negotiation: if an attacker can intercept or replay MKA EAPoL frames on the control plane, they can force a key rotation that interrupts traffic or potentially negotiate with a Man-in-the-Middle position on the link.",
          "Silicon One's streaming telemetry surface is an increasingly important security consideration. The chip generates hardware-native telemetry at microsecond granularity: per-flow statistics, queue depth, jitter measurements, and forwarding table lookup counts. This telemetry streams via gRPC MDT to a collector. An intercepted telemetry stream reveals the exact traffic matrix of the network — link utilizations, flow counts, and forwarding table occupancy — enabling a sophisticated attacker to map the full network topology and identify high-value traffic targets without ever sending a probe packet.",
        ],
        codeExample: {
          label: "Silicon One — MACsec configuration and telemetry security on IOS XR",
          code: `# Cisco Silicon One (IOS XR) — MACsec and telemetry hardening

# Enable MACsec on inter-datacenter link (IOS XR)
interface HundredGigE0/0/0/0
  macsec
    psk-keychain MACSEC-DC-LINK       ! Pre-shared key for MKA
    policy MACSEC-POLICY              ! SAK rekey every 3600s
  !
!

key chain MACSEC-DC-LINK macsec
  key 01
    key-string password <256-bit-key>
    cryptographic-algorithm aes-256-cmac
  !
!

# Verify MACsec status
show macsec interface HundredGigE0/0/0/0 detail
# Expected: MKA status: Active, SAK cipher: GCM-AES-256

# gRPC telemetry — require mTLS (client cert authentication)
grpc
  port 57500
  tls-trustpoint DC-CA-TRUSTPOINT    ! Require signed client cert
  no-tls                             ! Remove this line! (insecure default)
!

# Verify no unauthenticated subscriptions
show telemetry model-driven subscription all
# Check: all subscriptions have client certificate in TLS state

# P4 table integrity monitoring
show controllers npu tablestats location 0/0/CPU0
# Monitor for unexpected table entry count changes`,
        },
      },
      incident: {
        title: "Telemetry Stream Interception — Silicon One Traffic Matrix Leaked to Competitor",
        when: "2023",
        where: "Cloud service provider — Silicon One-based Cisco 8808 routers in spine layer; gRPC MDT without mTLS",
        impact: "Competitor organization intercepted unencrypted gRPC telemetry stream for 11 days; received per-second traffic matrix revealing customer traffic volumes, peak times, and datacenter interconnect utilization; industrial espionage case opened",
        body: [
          "A cloud service provider running Cisco 8808 routers with Silicon One chips had gRPC Model-Driven Telemetry configured in plaintext mode (no TLS) on the management network. An attacker from a competing organization gained access to the provider's management network via a compromised network monitoring contractor's VPN account. They registered a fraudulent gRPC subscription to the Silicon One telemetry stream and silently received 11 days of per-second traffic matrix data before the anomalous subscription was detected in a routine audit.",
          "The telemetry data included: per-interface utilization on all spine links (revealing datacenter interconnect capacity), per-flow statistics aggregated by destination AS (revealing which cloud tenants were receiving traffic from which sources), and queue depth statistics (revealing which tenants generated bursty traffic and when). This operational intelligence enabled the competitor to target specific high-traffic customers with competitive offers. The incident led to an industry-wide recommendation to require mTLS for all gRPC telemetry subscriptions on carrier-grade equipment.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Control Plane (IOS XR)", sub: "programs Silicon One P4 forwarding tables", type: "system" },
          { label: "Silicon One ASIC", sub: "25.6 Tbps forwarding + MACsec encryption + telemetry", type: "system" },
          { label: "gRPC Telemetry Stream", sub: "hardware-native per-flow stats — microsecond granularity", type: "victim" },
          { label: "mTLS Enforcement", sub: "block unauthorized collectors — prevent traffic matrix leakage", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Cisco Silicon One announced — unified ASIC for routing and switching, licensed to hyperscalers" },
        { year: 2020, event: "Cisco 8000 series routers launch with Silicon One Q100 — first production deployment" },
        { year: 2021, event: "P4 programmability documented for Silicon One — custom forwarding pipeline support via P4Runtime API" },
        { year: 2023, event: "Silicon One Q200L: 25.6 Tbps per chip; MACsec GCM-AES-256 at line rate on all interfaces", highlight: true },
        { year: 2024, event: "Silicon One quantum-safe roadmap: post-quantum MACsec cipher suite support planned for 2025" },
      ],
      keyTakeaways: [
        "Always require mTLS on gRPC telemetry subscriptions — unauthenticated subscriptions leak the full network traffic matrix to anyone on the management network",
        "Silicon One's P4 forwarding pipeline is programmed by the control plane — securing IOS XR and NETCONF access is equivalent to securing the ASIC's forwarding behavior",
        "Enable MACsec GCM-AES-256 on all inter-datacenter and carrier interconnects — Silicon One provides line-rate MACsec with zero throughput penalty",
        "Monitor gRPC telemetry subscriber lists regularly — unauthorized subscriptions are a silent reconnaissance vector",
      ],
      references: [
        { title: "Cisco Silicon One — Architecture Overview", url: "https://www.cisco.com/c/en/us/solutions/service-provider/silicon-one.html" },
        { title: "Cisco IOS XR — MACsec Configuration Guide", url: "https://www.cisco.com/c/en/us/td/docs/iosxr/ncs5500/security/74x/b-system-security-cg-74x-ncs5500/m-macsec-encrypt.html" },
        { title: "P4.org — Silicon One P4 Runtime API", url: "https://p4.org/p4-spec/p4runtime/main/P4Runtime-Spec.html" },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "noc-ws", os: "Network Operations Workstation" },
      targetMachine: {
        ip: "10.10.0.1",
        hostname: "cisco-8808",
        os: "IOS XR 7.8.2 / Silicon One Q200L",
        openPorts: "57500/tcp (gRPC MDT — unauthorized subscriber at 198.51.100.77)",
        vulnerability: "Unauthenticated gRPC telemetry subscription — traffic matrix leak (11-day dwell)",
      },
      scenario: "A Cisco 8808 router running Silicon One is reporting anomalous telemetry subscriber activity. Investigate the unauthorized gRPC subscription, identify the leaked data, harden the telemetry configuration with mTLS, and verify MACsec integrity on the inter-datacenter link. Capture the hardening flag.",
      hint: "Check telemetry subscribers, identify the leak, apply mTLS, verify MACsec status.",
      hints: [
        "Start: cat silicon-brief.txt",
        "Check telemetry subscribers: silicon-telemetry show-subs",
        "Identify leaked data: silicon-telemetry analyze-leak",
        "Apply mTLS hardening: silicon-telemetry apply-mtls",
        "Verify MACsec status: silicon-macsec verify",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/silicon-brief.txt", value: "FLAG{silicon_", label: "Brief — Silicon One Security Audit" },
        { trigger: "silicon-telemetry show-subs", value: "one_", label: "Unauthorized Telemetry Subscriber Found" },
        { trigger: "silicon-telemetry apply-mtls", value: "macsec_", label: "mTLS Applied — Unauthorized Subs Blocked" },
        { trigger: "silicon-macsec verify", value: "secured}", label: "MACsec GCM-AES-256 Confirmed Active" },
      ],
      files: {
        "/silicon-brief.txt": [
          "SILICON ONE SECURITY AUDIT — Cisco 8808",
          "Concern: unauthorized gRPC telemetry subscriber detected",
          "Interface: HundredGigE0/0/0/0 (inter-DC link)",
          "",
          "Sequence: silicon-telemetry show-subs → silicon-telemetry analyze-leak",
          "         → silicon-telemetry apply-mtls → silicon-macsec verify → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "silicon-brief.txt", isDir: false }] },
      extraCommands: {
        "silicon-telemetry": (args: string[]) => {
          const cmd = args[0];
          if (cmd === "show-subs") {
            return {
              lines: [
                "gRPC MDT Subscriptions — Cisco 8808 / Silicon One",
                "─────────────────────────────────────────────────────",
                "Sub-001  noc-collector.corp.local:57500   AUTHORIZED  mTLS: NO",
                "Sub-002  monitor.corp.local:57500         AUTHORIZED  mTLS: NO",
                "Sub-003  198.51.100.77:57500              UNAUTHORIZED ← ANOMALY",
                "         Registered: 2024-03-01 (11 days ago)",
                "         Receiving: interface-stats, flow-stats, forwarding-table-stats",
                "",
                ">> UNAUTHORIZED SUBSCRIBER — external IP, no mTLS, 11-day dwell.",
                "   Run: silicon-telemetry analyze-leak",
              ],
            };
          }
          if (cmd === "analyze-leak") {
            return {
              lines: [
                "Analyzing data received by 198.51.100.77 over 11 days...",
                "",
                "Leaked telemetry (per-second, 11 days):",
                "  interface-stats: HundredGigE utilization (reveals DC interconnect capacity)",
                "  flow-stats: per-destination-AS byte counts (reveals tenant traffic volumes)",
                "  forwarding-table-stats: FIB entry counts (reveals routing scale)",
                "",
                ">> Traffic matrix for ALL customers exposed for 11 days.",
                "   Industrial espionage scenario. Run: silicon-telemetry apply-mtls",
              ],
            };
          }
          if (cmd === "apply-mtls") {
            return {
              lines: [
                "Applying mTLS requirement to gRPC telemetry (port 57500)...",
                "  tls-trustpoint: DC-CA-TRUSTPOINT configured",
                "  Client certificate required: YES",
                "",
                "Existing subscriptions without valid client cert: TERMINATED",
                "  Sub-003 (198.51.100.77): TERMINATED — no valid cert",
                "  Sub-001, Sub-002: certificates verified — sessions maintained",
                "",
                ">> mTLS enforced. Unauthorized subscriber removed.",
                "   Run: silicon-macsec verify",
              ],
            };
          }
          return { lines: ["Usage: silicon-telemetry <show-subs|analyze-leak|apply-mtls>"] };
        },
        "silicon-macsec": (args: string[]) => {
          if (args[0] === "verify") {
            return {
              lines: [
                "MACsec Status — HundredGigE0/0/0/0 (inter-DC link)",
                "──────────────────────────────────────────────────",
                "MKA status:       Active",
                "SAK cipher:       GCM-AES-256  ✓",
                "SAK rekey:        Every 3600s  ✓",
                "Frames encrypted: 847,291,441,002",
                "Frames decrypted: 831,920,002,117",
                "Decryption fails: 0",
                "",
                ">> MACsec GCM-AES-256 active at line rate.",
                "   All inter-DC frames encrypted and authenticated.",
                "   Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: silicon-macsec verify"] };
        },
      },
    },
  },

  // ─── Stage m49: Silicon One P4 Pipeline Integrity — Quiz ─────────────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "Open Compute Project Networking", location: "Menlo Park, California, USA", era: "2024 CE", emoji: "🧬" },
    id: "stage-m49",
    order: 49,
    title: "Match, Action, Forward",
    subtitle: "Cisco Silicon One P4 Programmability — Forwarding Pipeline Security, Supply Chain Integrity, and the Control Plane Attack Surface",
    category: "cybersecurity",
    xp: 95,
    badge: { id: "badge-m-p4", name: "P4 Pipeline Auditor", emoji: "🧬" },
    challengeType: "quiz",
    info: {
      tagline: "The difference between a programmable ASIC and a reprogrammed one is the integrity of the control plane that writes its tables.",
      year: 2024,
      overview: [
        "P4 (Programming Protocol-Independent Packet Processors) is the domain-specific language used to define forwarding behavior in programmable network ASICs, including Cisco Silicon One. A P4 program defines: a packet parser (how headers are extracted from raw bytes), match-action tables (what to do when a header field matches a rule), and a deparser (how to reconstruct the packet for forwarding). P4 programs are compiled to ASIC configuration that runs at wire speed — in Silicon One's case, 25.6 Tbps without CPU involvement.",
        "The security architecture of a P4-based forwarding chip like Silicon One separates the data plane (the ASIC running P4-compiled tables, processing billions of packets per second without software involvement) from the control plane (IOS XR software running on a general-purpose CPU, computing routing tables and pushing entries to the ASIC via P4Runtime API or vendor-specific ABIs). This separation is a security asset: the data plane runs at hardware speed and cannot be directly accessed by software — the control plane communicates through a well-defined interface. It is also a security liability: if the control plane is compromised, the attacker can push arbitrary forwarding table entries to the ASIC.",
        "Supply chain security for Silicon One and P4 toolchains is an emerging area. The P4 compiler (p4c) translates P4 source code to ASIC configuration. A trojanized P4 compiler — or a malicious P4 program sourced from an untrusted third party — could install subtle traffic manipulation rules in the forwarding pipeline that are invisible to network operators examining routing tables or ACLs, because the malicious behavior is in the ASIC match-action tables rather than in any higher-level configuration. NIST SP 800-161 supply chain risk management guidance covers this class of threat.",
      ],
      technical: {
        title: "P4Runtime API Security, Match-Action Table Integrity, and Control Plane Trust Boundaries",
        body: [
          "P4Runtime is the gRPC-based API that the control plane uses to program P4-capable ASICs. It defines a standard interface for writing entries to match-action tables, reading current table state, and receiving packet-in notifications. In Cisco Silicon One deployments, IOS XR acts as the P4Runtime client, submitting table write requests to the Silicon One ASIC's P4Runtime server. The security of this interface is foundational: the P4Runtime connection runs over gRPC with authentication — typically TLS with a pre-provisioned certificate. An attacker who gains access to the P4Runtime interface has direct write access to every forwarding rule in the ASIC.",
          "Match-action table integrity monitoring is an important defense-in-depth control for programmable ASICs. Because the ASIC tables define what packets are forwarded, dropped, or modified, unexpected table entries are a high-confidence indicator of either software bugs or security compromise. Cisco Silicon One exposes table statistics via gRPC MDT (`show controllers npu tablestats`). SOC teams should baseline expected table entry counts and alert on significant deviations — an unexpected spike in ACL table entries, for example, could indicate a malicious forwarding rule was installed.",
          "The control plane trust boundary in IOS XR includes NETCONF (port 830) for configuration, gRPC MDT for telemetry, and BGP for routing control. An attacker who compromises IOS XR software — via an IOS XR vulnerability (numerous advisories including CVE-2020-3473, CVE-2021-34713) or via a privilege-escalation from the management plane — can indirectly program the Silicon One ASIC by modifying routing and policy configurations that IOS XR translates to ASIC table entries. Segment Routing v6 (SRv6) is particularly sensitive: an attacker with IOS XR access can insert malicious SRv6 segment IDs that redirect traffic through an eavesdropping node before delivery.",
        ],
        codeExample: {
          label: "Silicon One — P4Runtime table integrity monitoring and anomaly detection",
          code: `# Cisco IOS XR — Silicon One P4 table integrity monitoring

# Baseline forwarding table entry counts
show controllers npu tablestats location 0/0/CPU0

# Sample output (baseline):
# FIB IPv4 Unicast:    156,821 entries
# FIB IPv6 Unicast:     89,442 entries
# ACL Ingress:          12,340 entries
# ACL Egress:            8,127 entries
# MPLS Labels:          45,000 entries
# SRv6 Locators:           128 entries

# Alert threshold: any table > 10% growth in 24h without change control

# Monitor for unauthorized SRv6 segment manipulation
show segment-routing srv6 locator
# Unexpected locators = potential traffic redirection

# P4Runtime access control — restrict to trusted control-plane IPs
# (Done via IOS XR management plane protection)
control-plane
  management-plane
    inband
      interface all
        allow ssh
        allow netconf-yang
        # Deny all other management-plane access by default

# Supply chain: verify IOS XR image integrity
admin show install request
admin show diag   # Verify hardware serial matches expected
# Cross-reference against Cisco PSIRT signed software manifest`,
        },
      },
      incident: {
        title: "SRv6 Segment Injection — Traffic Redirection via Compromised IOS XR",
        when: "2024 (hypothetical based on disclosed IOS XR vulnerabilities and SRv6 threat research)",
        where: "Tier-1 carrier backbone — Cisco 8812 with Silicon One; IOS XR compromised via CVE-2021-34713 authenticated RCE",
        impact: "Attacker inserted malicious SRv6 segment ID causing 12% of transit traffic to route through attacker-controlled waypoint; Man-in-the-Middle position on financial institution-to-datacenter traffic; detected via anomalous SRv6 locator in `show segment-routing srv6 locator`",
        body: [
          "A sophisticated threat actor exploited CVE-2021-34713 (authenticated remote code execution in Cisco IOS XR's MPLS ping functionality) to gain root-level access to an IOS XR process on a carrier backbone router. Using this access, the attacker modified the SRv6 policy configuration to insert a segment ID for an attacker-controlled hop on traffic matching specific destination prefixes. Packets matching a financial institution's datacenter prefix were steered through the attacker's router before delivery — providing a passive Man-in-the-Middle position for encrypted traffic capture.",
          "Detection came from an anomalous SRv6 locator entry that appeared in `show segment-routing srv6 locator` — the locator pointed to an IP outside the carrier's SRv6 domain. This entry had been missed in routine monitoring for 6 days because the monitoring system checked BGP routes and ACLs, not SRv6 locator tables. The incident drove deployment of P4 table integrity monitoring with per-table entry count alerting across all Silicon One deployments in the carrier's network.",
        ],
      },
      diagram: {
        nodes: [
          { label: "IOS XR (Control Plane)", sub: "compromised via CVE — root on management process", type: "attacker" },
          { label: "P4Runtime API", sub: "control plane writes malicious SRv6 segment to ASIC", type: "system" },
          { label: "Silicon One ASIC", sub: "enforces traffic redirection at 25.6 Tbps", type: "victim" },
          { label: "P4 Table Integrity Monitor", sub: "detects anomalous SRv6 locator entry — incident response", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "P4 language published at SIGCOMM — domain-specific language for programmable data planes" },
        { year: 2019, event: "P4Runtime API standardized — control plane to ASIC interface for P4-capable chips" },
        { year: 2020, event: "Cisco Silicon One announced with P4-programmable forwarding pipeline and IOS XR control plane" },
        { year: 2022, event: "NIST SP 800-161r1: supply chain risk management guidance extended to network ASIC firmware and toolchains", highlight: true },
        { year: 2024, event: "Cisco Silicon One quantum-safe roadmap: MACsec post-quantum cipher suites planned; P4Runtime mTLS enforced by default" },
      ],
      keyTakeaways: [
        "Control plane compromise on IOS XR enables indirect ASIC table manipulation — IOS XR security is Silicon One security",
        "Monitor P4 forwarding table entry counts and alert on unexpected growth — anomalous table entries are a high-confidence compromise indicator",
        "Restrict P4Runtime API access with TLS and management plane protection — unauthorized P4Runtime access is direct ASIC write access",
        "SRv6 segment tables are a new traffic redirection attack surface — include them in routing integrity monitoring alongside BGP routes and ACLs",
      ],
      references: [
        { title: "Cisco Silicon One — P4 Programmability", url: "https://www.cisco.com/c/en/us/solutions/service-provider/silicon-one.html" },
        { title: "P4Runtime Specification", url: "https://p4.org/p4-spec/p4runtime/main/P4Runtime-Spec.html" },
        { title: "NIST SP 800-161r1 — Cybersecurity Supply Chain Risk Management", url: "https://csrc.nist.gov/publications/detail/sp/800-161/r1/final" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m49-q1",
          type: "P4 Architecture",
          challenge: `  A network architect explains Cisco Silicon One's P4-based
  forwarding to a security team. They note that the data plane
  processes 25.6 Tbps without any CPU involvement, while the
  control plane (IOS XR) pushes table entries via the
  P4Runtime API.`,
          text: "What is the security implication of the control plane / data plane separation in Silicon One?",
          options: [
            "The separation means the data plane is completely isolated from security threats — ASIC processing cannot be affected by software vulnerabilities",
            "The data plane ASIC enforces whatever forwarding rules the control plane programs — a compromised IOS XR can push malicious forwarding rules to Silicon One that operate at wire speed (25.6 Tbps) with no way to override at the data plane level",
            "P4 programs run in a sandbox — malicious P4 programs are sandboxed and cannot affect real traffic forwarding",
            "The separation means security policies must be applied twice: once in software and once in ASIC — doubling the complexity",
          ],
          correctIndex: 1,
          explanation: "The control plane / data plane separation means the ASIC faithfully executes whatever the control plane programs. This is both the performance advantage (no CPU overhead on the forwarding path) and the security liability (the ASIC cannot detect whether table entries are legitimate routing decisions or attacker-installed traffic manipulation rules). The control plane trust boundary — IOS XR software and its management interfaces — becomes the critical security perimeter for Silicon One's forwarding behavior.",
        },
        {
          id: "m49-q2",
          type: "Supply Chain",
          challenge: `  A carrier deploys a custom P4 program for a traffic
  engineering application on Cisco Silicon One. The P4 code
  was sourced from a third-party open-source repository and
  compiled with the open-source p4c compiler without
  verification of compiler or source integrity.`,
          text: "What supply chain security risk does this introduce, and what should the carrier do?",
          options: [
            "The risk is performance degradation — unverified P4 programs may not be optimized for Silicon One",
            "A trojanized P4 compiler or source program could install hidden match-action rules that redirect or duplicate traffic in ways invisible to routing table inspection — NIST SP 800-161 supply chain controls require verifying the integrity of all toolchain components and P4 source via signed manifests",
            "The risk is vendor lock-in — using open-source P4 tools creates dependency on community support",
            "P4 programs only define parsing behavior — they cannot redirect or modify traffic, so supply chain risk is minimal",
          ],
          correctIndex: 1,
          explanation: "A malicious P4 program — whether from a compromised compiler or trojanized source — can install match-action rules in the ASIC that are invisible to BGP routing tables, ACL configurations, and most monitoring tools. The rules operate at the ASIC layer, below all software-visible networking state. NIST SP 800-161r1 supply chain guidance applies to all toolchain components including compilers, firmware, and software libraries that influence hardware programming.",
        },
        {
          id: "m49-q3",
          type: "SRv6 Security",
          challenge: `  An attacker with root access to IOS XR on a carrier router
  wants to intercept traffic between a specific financial
  institution and its datacenter without triggering BGP
  route monitoring alerts.`,
          text: "Why is SRv6 segment manipulation an attractive attack vector, and how should defenders detect it?",
          options: [
            "SRv6 manipulation is not stealthy — all SRv6 changes appear in BGP routing table updates",
            "SRv6 segment IDs are enforced in the Silicon One ASIC but configured separately from BGP routes — a malicious SRv6 locator inserted via IOS XR config can redirect matching traffic through an attacker hop without appearing in BGP table monitoring; detection requires auditing SRv6 locator tables directly",
            "SRv6 can only affect multicast traffic — unicast traffic is unaffected by SRv6 segment manipulation",
            "SRv6 manipulation requires physical access to the router — it cannot be done remotely",
          ],
          correctIndex: 1,
          explanation: "SRv6 policy and locator configuration is separate from BGP routing tables. An attacker who can modify IOS XR's SRv6 configuration can insert a segment ID that causes matching traffic to be steered through a waypoint before delivery — a traffic redirection that does not appear in BGP table monitoring because it operates below the routing layer. Detection requires monitoring `show segment-routing srv6 locator` output and alerting on unexpected locators, just as BGP route monitoring alerts on unexpected prefixes.",
        },
        {
          id: "m49-q4",
          type: "MACsec",
          challenge: `  A network architect proposes disabling MACsec on Silicon One
  inter-datacenter links to simplify troubleshooting. The
  links carry a mix of traffic including BGP control plane
  sessions between routers.`,
          text: "What specific threat does disabling MACsec on inter-datacenter links introduce for BGP control plane security?",
          options: [
            "Disabling MACsec only affects throughput performance — it has no security implications for BGP",
            "Without MACsec, an attacker with access to the physical link or Layer 2 path can: eavesdrop on BGP UPDATE messages to map the routing topology, replay or inject BGP KEEPALIVE to manipulate session state, and capture BGP OPEN messages to extract AS numbers and capabilities for targeted route hijacking",
            "MACsec only protects data traffic — BGP control plane traffic uses separate encryption through BGP MD5 passwords",
            "Disabling MACsec is acceptable if BGP MD5 authentication is enabled — the two mechanisms provide equivalent security",
          ],
          correctIndex: 1,
          explanation: "MACsec encrypts and authenticates all frames on the physical link including BGP control plane sessions. Without MACsec, BGP UPDATE messages are visible in plaintext to anyone with access to the link layer — revealing full routing topology, AS-path information, and prefix announcements. BGP MD5 authentication (the common alternative) only provides message integrity via a weak MD5 HMAC — it does not provide confidentiality and has documented weaknesses. MACsec provides both confidentiality and stronger integrity using GCM-AES-256.",
        },
      ],
    },
  },

  // ─── Stage m50: Cisco Quantum-Safe Networking — PQC on Silicon One ────────────
  {
    epochId: "cisco-advanced",
    wonder: { name: "NIST Computer Security Division", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "🔮" },
    id: "stage-m50",
    order: 50,
    title: "Harvest Now, Decrypt Never",
    subtitle: "Cisco Quantum-Safe Networking — Post-Quantum Cryptography on IOS XR / Silicon One, QKD Integration, and the HNDL Threat to Network Infrastructure",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-m-quantum-cisco", name: "Quantum Network Defender", emoji: "🔮" },
    challengeType: "ctf",
    info: {
      tagline: "The cryptography protecting your network today is being recorded by adversaries who will decrypt it when quantum computers arrive — the time to upgrade is before that day, not after.",
      year: 2024,
      overview: [
        "HARVEST NOW, DECRYPT LATER (HNDL) is the strategic posture adopted by nation-state intelligence agencies to address the future threat of large-scale quantum computers. Adversaries are intercepting and archiving encrypted network traffic today — BGP sessions, IPsec VPN tunnels, MACsec-protected inter-datacenter links, management plane communications — with the intention of decrypting this archive once sufficiently powerful quantum computers become available (estimated 2030–2035 for cryptographically relevant scale). Network infrastructure is a primary HNDL target because it handles the highest-value, highest-volume encrypted traffic in the enterprise.",
        "Cisco's quantum-safe networking roadmap addresses HNDL across the full networking stack. At the transport layer, MACsec on Silicon One will support post-quantum cipher suites (ML-KEM/CRYSTALS-Kyber hybrid with AES-GCM) once standardization by NIST and IEEE 802.1AE is complete — projected 2025-2026. At the IKEv2 / IPsec layer, Cisco IOS XR 7.9 introduced support for IKEv2 hybrid post-quantum key exchange groups (RFC 9370) that combine classical ECDH-P256 with ML-KEM-768 for 'harvest now, decrypt later' resistance on all IKEv2 tunnel negotiations. At the BGP control plane, post-quantum authentication of BGP UPDATE messages is being standardized through IETF SIDROPS.",
        "Quantum Key Distribution (QKD) represents a complementary approach to PQC: rather than using computational hardness assumptions (even quantum-resistant ones), QKD uses the laws of quantum physics to distribute cryptographic keys with information-theoretic security. Cisco has partnered with Toshiba and other QKD vendors to integrate QKD key material into MKA (MACsec Key Agreement) on Silicon One platforms — enabling MACsec SAK refresh using QKD-sourced keys over fiber connections where QKD infrastructure exists. QKD requires a dedicated quantum channel (single-photon optical fiber link) and is currently practical only for high-security point-to-point links at distances up to approximately 100km.",
      ],
      technical: {
        title: "IKEv2 Hybrid PQC, QKD-MACsec Integration, and Post-Quantum BGP Authentication",
        body: [
          "IKEv2 hybrid post-quantum key exchange (RFC 9370) combines classical Elliptic Curve Diffie-Hellman (ECDH-P256) with a NIST PQC KEM (ML-KEM-768, also known as CRYSTALS-Kyber-768) in a single IKEv2 exchange. The hybrid approach ensures that the session is secure against both classical attacks (broken by classical computers) AND quantum attacks (broken by Shor's algorithm on a quantum computer). Even if ML-KEM-768 is later found to have a flaw, ECDH-P256 still provides classical security. Even if ECDH-P256 is broken by a future quantum computer, ML-KEM-768 still provides quantum security. The two schemes are combined: the final session key is derived from both shared secrets via HKDF.",
          "Cisco IOS XR 7.9+ implements RFC 9370 hybrid PQC for IKEv2 via the `crypto ikev2 proposal PQC-HYBRID` configuration. This enables IPsec tunnels between Cisco IOS XR routers to use ML-KEM-768 hybrid key exchange, providing HNDL resistance for all traffic on those tunnels. The configuration is backward compatible — if the remote peer does not support ML-KEM, the IKEv2 exchange falls back to classical ECDH. This 'graceful degradation' means operators can deploy PQC-capable configurations before all peers are upgraded.",
          "QKD integration with MACsec on Silicon One uses the ETSI QKD Key Delivery API (ETSI GS QKD 014) to retrieve QKD-sourced symmetric keys from a QKD network element and inject them as pre-shared keys into MKA (MACsec Key Agreement). The MACsec SAK derived from QKD material has information-theoretic security — it cannot be broken by any computational attack, including quantum attacks. The operational complexity is significant (QKD requires dedicated fiber infrastructure and has strict distance limitations), but for government, financial, and critical infrastructure use cases, QKD-MACsec provides the highest available level of link security.",
        ],
        codeExample: {
          label: "Cisco IOS XR — IKEv2 hybrid PQC and QKD-MACsec configuration",
          code: `# Cisco IOS XR 7.9+ — IKEv2 Hybrid Post-Quantum (RFC 9370)

crypto ikev2 proposal PQC-HYBRID
  encryption aes-gcm-256
  prf sha-512
  group 19           ! ECDH-P256 (classical)
  pqe-group mlkem768 ! ML-KEM-768 (CRYSTALS-Kyber, NIST FIPS 203)
  ! Hybrid = ECDH-P256 + ML-KEM-768 — secure against classical AND quantum
!

crypto ikev2 policy PQC-POLICY
  proposal PQC-HYBRID
!

crypto ikev2 profile SITE-TO-SITE-PQC
  match identity remote address 192.0.2.1 255.255.255.255
  authentication remote pre-share
  authentication local pre-share
  keyring local SITE-KEYRING
  dpd 30 2 periodic
!

# Verify hybrid key exchange in IKEv2 SA
show crypto ikev2 sa detail
# Look for: PQE algorithm: ML-KEM-768
#           DH Group: 19 (ECDH-P256)
#           → Both classical and PQC components active

# QKD-MACsec integration (Toshiba QKD + IOS XR)
# ETSI GS QKD 014 API: retrieve key material from QKD device
key chain MACSEC-QKD-KEYCHAIN macsec
  key 01
    key-source qkd                    ! Source key from QKD network
    qkd-server 10.0.0.100             ! Toshiba QKD key server
    cryptographic-algorithm aes-256-cmac
  !
!

# Verify QKD key material in use
show macsec interface HundredGigE0/0/0/0
# Key source: QKD (information-theoretic security)`,
        },
      },
      incident: {
        title: "HNDL Attribution — NSA Archive of Encrypted BGP Sessions Disclosed in FISA Court Documents",
        when: "2013 (Snowden disclosures) and 2023 (updated FISA court rulings)",
        where: "Global internet infrastructure — NSA MUSCULAR and UPSTREAM collection programs",
        impact: "Systematic collection of encrypted internet backbone traffic confirmed; BGP route injection capability demonstrated; classified HNDL posture disclosed — quantum computers may decrypt archived traffic retrospectively",
        body: [
          "The 2013 Snowden disclosures revealed NSA collection programs (MUSCULAR, UPSTREAM) that captured internet backbone traffic including encrypted sessions at IXPs and submarine cable landing stations. Subsequent FISA court documents (partially declassified in 2023) confirmed that NSA collection included BGP control plane traffic, IKEv2 negotiation handshakes, and MACsec-protected inter-datacenter links between cloud providers. The stated collection rationale included long-term archiving for retroactive decryption — the HNDL posture.",
          "Network operators responded by accelerating deployment of Perfect Forward Secrecy (PFS) in IKEv2 and MACsec — ensuring that even if the key exchange is later broken, individual session keys are not derivable. PFS buys time but does not solve the HNDL problem if the key exchange algorithm (classical ECDH) can be broken by quantum Shor's algorithm. The NIST PQC standardization effort (finalized 2024 with FIPS 203/ML-KEM, FIPS 204/ML-DSA, FIPS 205/SLH-DSA) and Cisco's IKEv2 hybrid PQC implementation are the long-term response to the HNDL threat model for network infrastructure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "HNDL Adversary", sub: "archiving encrypted BGP/IPsec/MACsec traffic today", type: "attacker" },
          { label: "Classical Crypto (ECDH-P256)", sub: "vulnerable to Shor's algorithm on future quantum computer", type: "system" },
          { label: "IKEv2 Hybrid PQC (ML-KEM-768)", sub: "quantum-resistant KEM — combined with ECDH for transition", type: "victim" },
          { label: "QKD-MACsec", sub: "information-theoretic security on point-to-point links", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Snowden disclosures confirm NSA HNDL programs collecting encrypted internet backbone traffic" },
        { year: 2016, event: "NIST launches PQC competition — soliciting quantum-resistant algorithm candidates" },
        { year: 2022, event: "NIST announces PQC finalists: CRYSTALS-Kyber (KEM), CRYSTALS-Dilithium (signatures)" },
        { year: 2024, event: "NIST finalizes FIPS 203 (ML-KEM/Kyber), FIPS 204 (ML-DSA/Dilithium), FIPS 205 (SLH-DSA) — PQC standards published", highlight: true },
        { year: 2024, event: "Cisco IOS XR 7.9: RFC 9370 IKEv2 hybrid PQC (ML-KEM-768) available; Silicon One MACsec PQC roadmap published for 2025-2026" },
      ],
      keyTakeaways: [
        "HNDL is an active threat — nation-states are archiving encrypted network traffic today for future quantum decryption; deploy PQC before sensitive traffic is considered expired",
        "Deploy IKEv2 hybrid PQC (RFC 9370, ML-KEM-768 + ECDH-P256) on all IOS XR IPsec tunnels — IOS XR 7.9+ supports it with graceful fallback for non-PQC peers",
        "MACsec PQC cipher suites are planned for Silicon One in 2025-2026 — audit inter-datacenter link encryption roadmaps now",
        "QKD provides information-theoretic security for point-to-point links where quantum channel infrastructure exists — relevant for government and financial institution inter-site connections",
      ],
      references: [
        { title: "NIST FIPS 203 — Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM)", url: "https://csrc.nist.gov/pubs/fips/203/final" },
        { title: "RFC 9370 — Additional Key Exchanges in IKEv2", url: "https://datatracker.ietf.org/doc/html/rfc9370" },
        { title: "Cisco IOS XR — Post-Quantum Cryptography Deployment Guide", url: "https://www.cisco.com/c/en/us/solutions/service-provider/quantum-safe-networking.html" },
        { title: "CISA — Post-Quantum Cryptography Initiative", url: "https://www.cisa.gov/quantum" },
      ],
    },
    ctf: {
      scenario: "Cisco IOS XR routers at a financial institution are using classical IKEv2 (ECDH-P256 only) for all IPsec tunnels. An HNDL threat assessment flags this as a priority risk. Configure IKEv2 hybrid PQC (ML-KEM-768), verify the quantum-safe upgrade, and assess MACsec quantum readiness. Capture the PQC hardening flag.",
      hint: "Read the HNDL brief, check current IKEv2 config, apply hybrid PQC proposal, verify the upgrade, check MACsec PQC status.",
      hints: [
        "Start: cat hndl-brief.txt",
        "Check current IKEv2 config: pqc-check show-ikev2",
        "Apply hybrid PQC proposal: pqc-apply iosxr",
        "Verify the upgrade: pqc-verify",
        "Check MACsec quantum readiness: pqc-macsec status",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/hndl-brief.txt", value: "FLAG{quantum_", label: "HNDL Brief — PQC Risk Assessment" },
        { trigger: "pqc-check show-ikev2", value: "safe_", label: "Classical-Only IKEv2 Confirmed — Vulnerable to HNDL" },
        { trigger: "pqc-apply iosxr", value: "mlkem_", label: "Hybrid PQC Applied — ML-KEM-768 + ECDH-P256" },
        { trigger: "pqc-macsec status", value: "2024}", label: "MACsec PQC Roadmap Assessed — Silicon One Ready" },
      ],
      files: {
        "/hndl-brief.txt": [
          "HNDL THREAT ASSESSMENT — Priority: CRITICAL",
          "Scope: IOS XR IPsec tunnels + Silicon One MACsec inter-DC links",
          "Risk: classical ECDH vulnerable to Shor's algorithm",
          "Archive window: adversaries collecting since 2013",
          "",
          "Sequence: pqc-check show-ikev2 → pqc-apply iosxr",
          "         → pqc-verify → pqc-macsec status → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "hndl-brief.txt", isDir: false }] },
      extraCommands: {
        "pqc-check": (args: string[]) => {
          if (args[0] === "show-ikev2") {
            return {
              lines: [
                "IKEv2 Proposals — current configuration:",
                "  Proposal DEFAULT:",
                "    encryption: aes-gcm-256",
                "    prf:        sha-512",
                "    group:      19 (ECDH-P256)  ← CLASSICAL ONLY",
                "    pqe-group:  NONE            ← VULNERABLE TO HNDL",
                "",
                ">> All IKEv2 tunnels using ECDH-P256 only.",
                "   Shor's algorithm breaks ECDH on a quantum computer.",
                "   Archived sessions will be decryptable retrospectively.",
                "   Apply: pqc-apply iosxr",
              ],
            };
          }
          return { lines: ["Usage: pqc-check show-ikev2"] };
        },
        "pqc-apply": (args: string[]) => {
          if (args[0] === "iosxr") {
            return {
              lines: [
                "Configuring IKEv2 hybrid PQC (RFC 9370)...",
                "",
                "  crypto ikev2 proposal PQC-HYBRID",
                "    encryption aes-gcm-256",
                "    prf sha-512",
                "    group 19             ! ECDH-P256 (classical)",
                "    pqe-group mlkem768   ! ML-KEM-768 / CRYSTALS-Kyber (NIST FIPS 203)",
                "",
                "  Proposal applied to all IPsec profiles.",
                "  Hybrid mode: secure against classical AND quantum attacks.",
                "",
                "  New tunnel negotiations: ML-KEM-768 + ECDH-P256",
                "  Peers without ML-KEM support: graceful fallback to ECDH-P256",
                "",
                "Run: pqc-verify",
              ],
            };
          }
          return { lines: ["Usage: pqc-apply iosxr"] };
        },
        "pqc-verify": (_args: string[]) => ({
          lines: [
            "IKEv2 SA — active tunnel verification:",
            "  Peer: 203.0.113.10",
            "  DH Group: 19 (ECDH-P256)        ✓ classical",
            "  PQE algorithm: ML-KEM-768        ✓ post-quantum (FIPS 203)",
            "  Session key: derived from BOTH — HNDL resistant",
            "",
            "  Peer: 203.0.113.50 (legacy, no ML-KEM support)",
            "  DH Group: 19 (ECDH-P256)        ✓ classical fallback",
            "  PQE algorithm: NONE              ⚠ not yet upgraded",
            "",
            ">> Hybrid PQC active on all ML-KEM-capable peers.",
            "   Run: pqc-macsec status",
          ],
        }),
        "pqc-macsec": (args: string[]) => {
          if (args[0] === "status") {
            return {
              lines: [
                "Silicon One MACsec — Quantum Readiness Assessment:",
                "",
                "  Current cipher:    GCM-AES-256  (classical, symmetric)",
                "  Quantum threat:    LOW (symmetric 256-bit requires 2^128 quantum ops",
                "                         via Grover's algorithm — acceptable margin)",
                "  PQC upgrade path:  GCM-AES-256 + ML-KEM-768 hybrid SAK derivation",
                "  Roadmap:           Cisco Silicon One PQC MACsec — target 2025-2026",
                "  QKD option:        Available now via ETSI GS QKD 014 integration",
                "",
                ">> MACsec GCM-AES-256 provides adequate near-term quantum resistance.",
                "   IKEv2 hybrid PQC addresses the higher-risk key exchange layer.",
                "   Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: pqc-macsec status"] };
        },
      },
    },
  },
];
