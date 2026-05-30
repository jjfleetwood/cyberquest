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
          label: "IPS evasion test — fragmented payload delivery and Firepower detection validation",
          code: `# ── STEP 1: Verify Firepower Frag3 preprocessor is enabled ─────────────
# On FTD (system support diagnostic-cli):
show snort preprocessor statistics
# Look for: Frag3 Active: YES — if NO, stream reassembly is disabled

# ── STEP 2: Craft fragmented SQL injection payload via Scapy ──────────────
from scapy.all import *
target = "192.0.2.10"
# Normal detected payload: GET /?id=' OR 1=1--
# Split across two IP fragments so no single fragment matches signature

payload1 = b"GET /?id=' OR "
# Fragment 1: bytes 0-13 (flags=MF = More Fragments)
pkt1 = IP(dst=target, flags="MF", frag=0) / payload1

payload2 = b"1=1-- HTTP/1.1\r\nHost: target\r\n\r\n"
# Fragment 2: remaining payload (offset=2 = 16 bytes / 8)
pkt2 = IP(dst=target, flags=0, frag=2) / payload2

send(pkt1)
send(pkt2)

# ── STEP 3: Check FMC for detection ───────────────────────────────────────
# FMC: Analysis → Intrusion Events → filter by time window
# If no alert: Frag3 reassembly disabled for this traffic class

# ── DETECTION ─────────────────────────────────────────────────────────────
# FMC: Policies → Intrusion → Edit Policy → Advanced → Inline Normalization
# Confirm: IP Defragmentation = ON, TCP Stream Reassembly = security-over-connectivity

# ── REMEDIATION ───────────────────────────────────────────────────────────
# FMC: change normalization profile from 'balanced' to 'security-over-connectivity'
# Enable Frag3 for all traffic classes including high-bandwidth paths
# Accept 10-20% throughput reduction — the trade-off for detection completeness`,
        },
      },
      incident: {
        title: "Fragmentation Evasion Bypasses 47-Sensor Firepower Deployment (2023)",
        when: "2023 (composite of documented red team findings across enterprise Firepower deployments)",
        where: "Financial services firm — Firepower 4140 in inline IPS mode protecting trading platform APIs",
        impact: "Red team delivered SQLi and XSS payloads undetected for weeks; 47-sensor audit found Frag3 disabled across all sensors; 15% throughput reduction accepted to restore detection completeness",
        body: [
          "In a documented 2023 red team engagement at a financial services firm, the Firepower 4140 appliances had been deployed with the default 'balanced' performance profile, which disabled IP fragment reassembly for traffic exceeding 8KB to preserve throughput on the high-frequency trading network. The red team used Scapy to deliver fragmented SQL injection payloads against the trading platform API — none were detected because Frag3 reassembly was not active for the affected traffic class. The attack was indistinguishable from normal fragmented traffic in FMC's connection events.",
          "The root cause was a documented Cisco deployment trade-off: Firepower's performance profiles trade detection completeness for throughput. The 'connectivity over security' inline normalization policy — chosen to minimize latency on the trading platform — disabled fragmentation reassembly. The correct posture for security-critical environments is 'security over connectivity,' enabling all normalizers including Frag3. The engagement report drove a full policy audit across the firm's 47 Firepower sensors — all 47 were in 'connectivity over security' mode. All were switched to 'security over connectivity,' accepting a 15% throughput reduction on high-bandwidth interfaces.",
          "CISA advisory AA23-278A, published October 2023, specifically cited Firepower and similar NGIPS platforms as high-value targets where fragmentation evasion was being used in nation-state campaigns against critical infrastructure. The advisory required all critical infrastructure operators to audit their IPS normalization policies, verify Frag3 enablement across all traffic classes, and conduct quarterly evasion testing. Organizations that followed the advisory switched to 'security over connectivity' and accepted the throughput reduction — a trade-off CISA explicitly recommended for environments handling sensitive financial or operational data. The recurring pattern: IPS deployed primarily for compliance demonstration rather than operational security, performance profiles chosen for throughput rather than detection, and no periodic validation that the IPS was actually detecting known attack patterns.",
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
    quiz: {
      questions: [
        { id: "stage-m39-q1", type: "Core Idea", challenge: "Frag3 role.", text: "Why must Firepower's Frag3 IP reassembly module be enabled?", options: ["Without reassembly, fragmented payloads bypass Snort signature matching entirely","It speeds up routing","It encrypts traffic","It manages certificates"], correctIndex: 0, explanation: "Snort matches signatures on the reassembled payload; without Frag3, fragmented attacks evade detection." },
        { id: "stage-m39-q2", type: "Defense", challenge: "Balanced profile fix.", text: "A Firepower deployment on the 'balanced' profile disables IP fragment reassembly. What's the remediation?", options: ["Switch to the 'security over connectivity' normalization policy to enable Frag3 and full stream reassembly","Disable Snort","Lower the MTU","Turn off logging"], correctIndex: 0, explanation: "The 'security over connectivity' policy enables full reassembly for complete detection." },
        { id: "stage-m39-q3", type: "Mechanics", challenge: "Split payload.", text: "Will a SQLi payload split as `' OR 1` (fragment 1) and `=1--` (fragment 2) be detected by Snort without Frag3?", options: ["No — signature matching needs the complete reassembled payload; no single fragment contains the full signature","Yes, fragment 1 triggers it","Yes, fragment 2 triggers it","Yes, both fire separately"], correctIndex: 0, explanation: "Neither fragment holds the whole signature, so without reassembly no rule fires." },
        { id: "stage-m39-q4", type: "Tooling", challenge: "Testing evasion.", text: "Which tool lets red teams send fragmented HTTP payloads to test IPS detection gaps?", options: ["Scapy — crafting individual IP fragments with custom MF flags and offsets","Wireshark","Nmap ping scan","tcpdump"], correctIndex: 0, explanation: "Scapy can hand-craft fragments with arbitrary MF flags and offsets to probe reassembly gaps." },
        { id: "stage-m39-q5", type: "Concept", challenge: "Connectivity over security.", text: "Does the 'connectivity over security' normalization policy prioritize detection completeness?", options: ["No — it disables fragmentation reassembly to preserve throughput, reducing detection completeness","Yes, it maximizes detection","It has no effect on detection","It encrypts fragments"], correctIndex: 0, explanation: "That policy favors throughput, turning off reassembly and weakening detection." },
        { id: "stage-m39-q6", type: "Concept", challenge: "Evasion principle.", text: "What is the core idea behind fragmentation evasion of an IPS?", options: ["Splitting a malicious payload across packets so no single inspected unit matches a signature","Encrypting the whole session","Flooding the device","Spoofing the source MAC"], correctIndex: 0, explanation: "Fragmentation hides the signature across packets unless the IPS reassembles them first." },
        { id: "stage-m39-q7", type: "Defense", challenge: "Stream reassembly.", text: "Why is full stream reassembly important alongside Frag3?", options: ["Attacks can also split across TCP segments, so stream reassembly is needed for complete inspection","It is unrelated to detection","It only affects DNS","It disables signatures"], correctIndex: 0, explanation: "Both IP fragment and TCP stream reassembly are needed to see the complete payload." },
        { id: "stage-m39-q8", type: "Defense", challenge: "Policy tradeoff.", text: "What is the tradeoff a security team accepts by choosing 'security over connectivity'?", options: ["More processing for complete detection, versus higher raw throughput with detection gaps","Less security for more speed","No tradeoff exists","It disables the firewall"], correctIndex: 0, explanation: "Full reassembly costs performance but closes the fragmentation evasion gap." },
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
        title: "Untuned IPS in Prevention Mode — 4-Hour EHR Outage at Healthcare Network",
        when: "2023",
        where: "Regional healthcare network — FTD 4150 inline IPS protecting EHR API endpoints",
        impact: "Untuned Prevention mode blocked legitimate FHIR API calls — 4-hour EHR outage during high-census; HIPAA-regulated patient data access interrupted during clinical operations",
        body: [
          "A healthcare IT team deployed Cisco FTD 4150 in inline Prevention mode using the Talos 'Maximum Detection' base policy without any tuning. Within 6 hours, Snort rules targeting HTTP anomalies flagged HL7 FHIR API calls — which use non-standard HTTP verbs like PATCH and PUT with complex JSON bodies that the 'Maximum Detection' policy flagged as anomalous — as suspicious and began dropping them. The Electronic Health Records system became inaccessible to clinical staff at 2 PM on a Tuesday, during the busiest period of the day at the hospital.",
          "The Cisco-recommended deployment workflow — baseline in Detection Only mode for 2+ weeks, run the Recommendations Engine to suppress OS-irrelevant rules, apply tuning based on observed false positives, then switch to Prevention — was skipped entirely due to schedule pressure from the CISO to have the IPS 'active' before a board audit. The correct emergency fix was immediate reversion to Detection Only mode followed by proper tuning. The incident took 4 hours to resolve because the network team initially suspected the EHR vendor's API, not their newly-deployed IPS, as the source of the outage.",
          "The incident was incorporated into Cisco's FMC training curriculum as the canonical example of why 'Deploy and Forget' is operationally dangerous for inline Prevention IPS. The training module now includes a specific workflow slide: Detection Only (2+ weeks) → Recommendations Engine → Tuning → Prevention. The healthcare network's post-incident corrective action plan required 3 weeks of Detection Only baselining, which surfaced 11 additional false-positive rule categories beyond the FHIR HL7 pattern — all of which would have caused additional outages if Prevention mode had been deployed without tuning. The board audit was delayed by 4 weeks. The CISO's decision to skip the baselining phase in the interest of appearing 'ahead of schedule' for the audit resulted in the audit being delayed longer than the baselining period would have required.",
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
          label: "CVE-2022-20927 — TLS handshake exhaustion detection and emergency mitigation",
          code: `# ── STEP 1: Monitor SSL handshake state table utilization ────────────────
# On FTD CLI (system support diagnostic-cli):
show ssl statistics
# Watch for: Active handshakes approaching max (65535)
# Watch for: Handshake timeouts/sec increasing rapidly
# Watch for: Completed/Active ratio approaching 0

# ── STEP 2: Identify attack in FMC connection events ─────────────────────
# FMC: Analysis → Connection Events → SSL Status = "Unknown"
# Spike in Unknown SSL status from diverse source IPs = ClientHello flood
# Legitimate traffic: handshake completes within 100-500ms
# Attack traffic: client never sends handshake Finished → times out after 30-60s

# ── STEP 3: Emergency mitigation on upstream device (unpatched FTD) ──────
# Rate-limit new TCP/443 connections at upstream router or firewall:
ip access-list extended VPN-RATELIMIT
  permit tcp any host VPN_IP eq 443
# Apply rate-limit policy-map to ACL to throttle new connection rate

# ── STEP 4: Apply FTD-side handshake timeout reduction ───────────────────
ssl server-version tlsv1.2
# Reduce handshake state TTL via support command (ZTAC-assisted)

# ── DETECTION ─────────────────────────────────────────────────────────────
# show ssl statistics: 'Active SSL Handshakes' near 65535 = exhaustion attack
# FMC alert: SSL handshake failure rate spike correlates with ClientHello flood

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: FTD 7.0.4 / 7.1.0.3 / 7.2.0.1 or later
# Cisco advisory: cisco-sa-ftd-ssl-dos-TGTkWZFz`,
        },
      },
      incident: {
        title: "FTD SSL VPN Handshake Exhaustion — 3,200-User Workforce Lockout (2022)",
        when: "2022 Q4 — three weeks after CVE-2022-20927 advisory publication",
        where: "Global manufacturing firm — FTD 2140 as primary remote access VPN gateway for 3,200 remote employees",
        impact: "All new VPN connections blocked for 4 hours; 3,200 remote workers locked out; emergency mid-week patch deployment required",
        body: [
          "Three weeks after Cisco's advisory for CVE-2022-20927 was published, an unpatched FTD 2140 at a manufacturing firm was targeted with a TLS handshake exhaustion attack. The attack began at 6:45 AM on a Monday — peak VPN connection time as employees started their workweek — and filled the FTD's SSL handshake state table within 22 minutes. All new VPN connection attempts returned 'unable to connect' to 3,200 remote workers. The attack used diverse source IPs to avoid simple rate-limiting, sending ClientHello messages and then going silent, each consuming a handshake state entry for the full 30-second timeout.",
          "The CVE-2022-20927 patch had been staged for deployment in the following weekend's maintenance window — a 10-day delay from the advisory. The attack forced an emergency 4 AM patch deployment mid-week, with a 45-minute VPN outage for existing connected users during the patch application. The SOC identified the attack pattern via FMC connection events showing thousands of SSL 'Unknown' status entries — the FMC categorization for TLS handshakes that never completed — from diverse source IPs across multiple countries, indicators of a coordinated exhaustion campaign rather than normal VPN traffic.",
          "The CVE-2022-20927 attack coincided with a broader trend of VPN gateway DoS attacks that accelerated after COVID-19 made remote access infrastructure business-critical. Attackers discovered that VPN gateways were high-leverage targets: a 4-hour VPN outage at a 3,200-person manufacturing firm caused production line delays and supply chain disruption disproportionate to the technical simplicity of the attack. CISA's 2022 guidance on VPN security explicitly recommended treating VPN gateway CVEs as availability-critical: patches affecting VPN availability should be applied within 72 hours of advisory publication — not deferred to the next scheduled maintenance window. The manufacturing firm's 10-day deferral was consistent with standard enterprise change management, but incompatible with the threat environment for critical remote access infrastructure.",
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
    quiz: {
      questions: [
        { id: "stage-m41-q1", type: "The Flaw", challenge: "Handshake type.", text: "Does CVE-2022-20927 crash FTD via complete or incomplete TLS handshakes?", options: ["Incomplete handshakes — ClientHellos with no follow-through that fill the state table unauthenticated","Complete authenticated handshakes","Encrypted data floods","Valid VPN logins"], correctIndex: 0, explanation: "Abandoned (incomplete) TLS handshakes exhaust the session state table without authentication." },
        { id: "stage-m41-q2", type: "Mechanics", challenge: "Exploitation.", text: "How is CVE-2022-20927 exploited on an FTD SSL VPN gateway?", options: ["Flood TLS ClientHello messages and abandon each, filling the session state table until no new VPN connections are accepted","Send one giant packet","Brute-force the admin password","Replay a captured session"], correctIndex: 0, explanation: "The state table fills with half-open handshakes, blocking new VPN connections." },
        { id: "stage-m41-q3", type: "Impact", challenge: "Effect on sessions.", text: "What happens to existing VPN sessions during a CVE-2022-20927 attack?", options: ["They stay stable; only new connection attempts are rejected (a 'brownout')","All sessions drop immediately","Sessions are decrypted","The device reboots"], correctIndex: 0, explanation: "Established sessions persist while new connections are denied — a connection brownout." },
        { id: "stage-m41-q4", type: "Defense", challenge: "Patched versions.", text: "What is the long-term fix and which FTD versions include it?", options: ["Upgrade to FTD 7.0.4+, 7.1.0.3+, or 7.2.0.1+, which fix the incomplete handshake timeout flaw","Reboot daily","Disable TLS entirely","Lower the MTU"], correctIndex: 0, explanation: "Those FTD releases correct the incomplete-handshake timeout handling." },
        { id: "stage-m41-q5", type: "Concept", challenge: "Low bandwidth.", text: "Why can an attacker run CVE-2022-20927 with modest bandwidth?", options: ["It targets the TLS session state table, not raw network capacity","It needs terabit floods","It saturates the uplink","It requires a botnet of millions"], correctIndex: 0, explanation: "Filling the state table needs only enough ClientHellos to exhaust entries — not a volumetric flood." },
        { id: "stage-m41-q6", type: "Concept", challenge: "State exhaustion.", text: "What class of denial-of-service is CVE-2022-20927?", options: ["Resource/state exhaustion of a finite session table","Volumetric bandwidth flood","Amplification reflection","Application logic crash"], correctIndex: 0, explanation: "It exhausts a finite resource (the handshake state table) rather than flooding bandwidth." },
        { id: "stage-m41-q7", type: "Defense", challenge: "Interim mitigation.", text: "Before patching, what helps blunt a state-exhaustion handshake flood?", options: ["Rate-limiting and tightening incomplete-handshake timeouts / connection limits","Opening more ports","Disabling logging","Removing all ACLs"], correctIndex: 0, explanation: "Aggressive timeouts and connection rate limits reduce how fast the table can be filled." },
        { id: "stage-m41-q8", type: "Concept", challenge: "Availability impact.", text: "Why is a VPN gateway brownout a serious business impact?", options: ["Remote workers can't establish new connections, cutting off access during the attack","It only affects logging","It improves performance","It has no user impact"], correctIndex: 0, explanation: "Denying new VPN connections blocks remote access — a direct availability hit." },
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
        title: "XDR Cross-Source Pivot Finds 18-Day Lateral Movement — Retail Chain PCI Threat",
        when: "2023",
        where: "National retail chain — Cisco XDR + Secure Endpoint + Umbrella + Firepower across 400 stores",
        impact: "XDR cross-source correlation found 14 compromised hosts across 8 stores evading individual product alerts for 18 days; simultaneous automated containment prevented PCI cardholder data reach",
        body: [
          "A Cisco XDR threat hunt at a national retail chain began with a single Talos threat intelligence alert: a file hash on a store manager's workstation matching a known Cobalt Strike beacon. The Secure Endpoint alert had been triaged as low severity because the workstation was a retail point-of-sale management station — not classified as high-value infrastructure. An XDR pivot on the beacon's C2 IP revealed that the same C2 address had been contacted by 13 other hosts across 8 stores over 18 days — all below the individual product alert thresholds for Secure Endpoint, Umbrella, and Firepower.",
          "The XDR investigation casebook mapped the complete kill chain: initial access via phishing email (Secure Email telemetry), Cobalt Strike beacon deployment on store manager workstation (Secure Endpoint), lateral movement to store server via SMB (Firepower NetFlow), Active Directory reconnaissance DNS queries (Umbrella), and ultimately attempted access to the payment processing VLAN (blocked by Firepower, logged in FMC, but the connection event had not been reviewed). All 14 compromised hosts were simultaneously isolated via XDR's automated response playbook — quarantine commands delivered to Secure Endpoint across all 8 stores in a single workflow execution, with no analyst needing to log into 14 separate devices.",
          "The retail chain investigation established a repeatable threat hunting pattern — seed IOC to cross-source pivot to kill chain reconstruction to automated containment — that Cisco codified as the XDR Hunt Methodology guide. The 18-day dwell period was attributable to alert fragmentation: each individual product alert was below escalation threshold. Secure Endpoint rated the beacon detection as medium confidence. Umbrella saw unusual DNS queries but none matched threat feeds. Firepower logged the lateral movement SMB connections as low-risk. Only the XDR cross-source correlation — connecting the beacon hash to the C2 IP to the DNS pattern to the lateral movement traffic across all 14 hosts — produced a high-confidence detection signal. This is the architectural argument for XDR: individual tools see fragments, cross-source correlation sees the kill chain. The PCI DSS cardholder data scope was not reached — the automated containment occurred 3 hops before the payment VLAN.",
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
    quiz: {
      questions: [
        { id: "stage-m42-q1", type: "Core Idea", challenge: "XDR advantage.", text: "What can Cisco XDR detect that individual products like Secure Endpoint and Firepower alone cannot?", options: ["Lateral movement, by correlating telemetry across endpoint, network, and DNS to expose attack chains below single-tool thresholds","Nothing extra","Only malware signatures","Only firewall rule hits"], correctIndex: 0, explanation: "XDR's cross-source correlation surfaces attack chains that stay below any one product's alert threshold." },
        { id: "stage-m42-q2", type: "Investigation", challenge: "Pivoting on C2.", text: "In an XDR threat hunt, why pivot on a C2 IP address in the Investigate portal?", options: ["To query all connected modules (Talos, Secure Endpoint, Umbrella, Firepower) at once and find every host that talked to that C2 IP","To block the analyst","To delete logs","To reboot endpoints"], correctIndex: 0, explanation: "Pivoting fans the indicator across all modules to reveal the full set of affected hosts." },
        { id: "stage-m42-q3", type: "Detection", challenge: "Lateral movement signal.", text: "Are SMB/RPC traffic from a workstation to an internal finance server plus AD DNS queries indicators of lateral movement?", options: ["Yes — that pattern matches lateral movement (ATT&CK T1550.002)","No, it's always benign","Only if encrypted","Only on weekends"], correctIndex: 0, explanation: "Workstation-to-server SMB/RPC combined with AD recon DNS is a classic lateral movement pattern." },
        { id: "stage-m42-q4", type: "Tooling", challenge: "Orbital queries.", text: "What is Cisco XDR's Orbital Query Engine used for?", options: ["Running SQL-like forensic queries against enrolled Secure Endpoint hosts in near real-time (process chains, connections, tasks)","Encrypting traffic","Managing certificates","Routing packets"], correctIndex: 0, explanation: "Orbital runs near-real-time SQL-like forensic queries across enrolled endpoints." },
        { id: "stage-m42-q5", type: "Concept", challenge: "Silent beacon.", text: "Is an 18-day Cobalt Strike beacon with no single-product alert impossible when Secure Endpoint is deployed?", options: ["No — low-signal events can fall below triage thresholds; XDR correlation is needed to connect them","Yes, Secure Endpoint always alerts","Yes, beacons can't hide","Only if logging is off"], correctIndex: 0, explanation: "Individual tools may not alert on low-context events; cross-source correlation reveals the chain." },
        { id: "stage-m42-q6", type: "Concept", challenge: "Why correlation.", text: "Why does XDR correlation beat siloed alerts for advanced intrusions?", options: ["Attack chains span endpoint, network, and DNS; no single tool sees the whole picture","Single tools see everything","Correlation hides data","It reduces visibility"], correctIndex: 0, explanation: "Stitching telemetry across domains exposes multi-stage attacks invisible to any one sensor." },
        { id: "stage-m42-q7", type: "Detection", challenge: "ATT&CK mapping.", text: "Mapping detections to MITRE ATT&CK helps an analyst do what?", options: ["Understand the adversary's technique and anticipate likely next steps","Slow down investigation","Avoid documentation","Disable telemetry"], correctIndex: 0, explanation: "ATT&CK mapping frames behaviors into known techniques, guiding response and hunting." },
        { id: "stage-m42-q8", type: "Defense", challenge: "Hunt workflow.", text: "What is a sound XDR threat-hunt workflow once a C2 indicator is found?", options: ["Pivot the indicator across modules, identify all affected hosts, then run endpoint forensic queries","Ignore it","Only check one host","Delete the indicator"], correctIndex: 0, explanation: "Fan out the indicator, scope all affected hosts, then drill in with endpoint forensics." },
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
        title: "XDR Automate — LockBit Ransomware Contained in 47 Seconds Across 12 Hospitals",
        when: "2023",
        where: "Healthcare system — Cisco XDR with Secure Endpoint, Umbrella, and Firepower across 12 hospitals",
        impact: "Pre-built XDR playbook quarantined 3 infected hosts in 47 seconds; C2 blocked across all 12 hospitals automatically; LockBit lateral movement prevented; patient care systems unaffected",
        body: [
          "A LockBit 3.0 ransomware variant gained initial access via a phishing email at a healthcare network. Cisco Secure Endpoint detected the ransomware encryption behavior within 4 minutes of execution — identifying VSSADMIN shadow copy deletion, rapid file encryption, and process hollowing as high-confidence malware indicators. The detection triggered a pre-configured XDR Automate playbook that simultaneously executed: quarantine commands to Secure Endpoint for 3 infected workstations (removing them from the network within the same second), Umbrella DNS block for the ransomware's C2 domain across all 12 hospitals, Firepower block rules for the C2 IP at all sensors, and a Webex notification to the SOC with the XDR investigation casebook link.",
          "Total automated response time from Secure Endpoint detection to containment of all 3 hosts across 12 hospital sites: 47 seconds. The SOC analyst reviewed the XDR casebook 8 minutes later and confirmed the automated response was correct — no additional hosts had been compromised in the 8-minute window because the C2 infrastructure was already blocked network-wide. Without pre-built playbooks, manual identification and response to 3 hosts across 12 geographically distributed hospital sites — requiring login to each hospital's Secure Endpoint console, coordination with network teams to block the C2, and communication across multiple hospital IT departments — would have taken 30-60 minutes. LockBit's lateral movement cadence in observed incidents is typically 8-15 minutes from initial execution to reaching file servers.",
          "The 47-second automated containment story became a reference case in Cisco's XDR sales materials and in CISA's guidance on SOAR platform deployment for healthcare. The critical precondition — pre-built playbooks deployed before the incident — is the gap that consistently differentiates 47-second containment from 47-minute containment. Cisco's professional services data from 2023 showed that enterprises with pre-built quarantine and block playbooks contained ransomware incidents in an average of 4 minutes, versus 47 minutes for enterprises with XDR deployed but no pre-built playbooks. The platform's automation capabilities are entirely inert without playbooks configured and tested before the adversary arrives. Healthcare organizations are specifically advised to build and test ransomware containment playbooks during their XDR deployment, not during a live ransomware incident.",
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
          label: "DNA Center API — authentication, enumeration, and authorization boundary testing",
          code: `# ── STEP 1: Obtain DNA Center API token (OBSERVER role) ──────────────────
curl -k -X POST "https://dnac.corp.local/dna/system/api/v1/auth/token" \
  -H "Content-Type: application/json" \
  -u "observer-account:Password123" \
  -d '{}' | jq '.Token'
# Returns: "eyJhbGciOiJSUzI1NiJ9..." — short-lived service token

export TOKEN="eyJhbGciOiJSUzI1NiJ9..."

# ── STEP 2: Enumerate device inventory (expected for OBSERVER) ────────────
curl -k -X GET "https://dnac.corp.local/dna/intent/api/v1/network-device" \
  -H "X-Auth-Token: $TOKEN" | jq '.response[].hostname'
# Returns all 247 managed device hostnames — OBSERVER can read inventory

# ── STEP 3: Test privileged sync operation with OBSERVER token ────────────
curl -k -X POST "https://dnac.corp.local/dna/intent/api/v1/network-device/sync" \
  -H "X-Auth-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"payload": {"ipAddressList": ["10.0.1.1"]}}'
# Expected: HTTP 403 Forbidden — SUPER-ADMIN required
# Vulnerable (CVE-2021-1257): HTTP 200 OK — authorization check missing

# ── STEP 4: Attempt to read global device credentials ─────────────────────
curl -k -X GET "https://dnac.corp.local/dna/intent/api/v1/global-credential" \
  -H "X-Auth-Token: $TOKEN"
# If accessible: encrypted CLI credentials for all 247 managed devices

# ── DETECTION ─────────────────────────────────────────────────────────────
# DNA Center Audit Log: Administration → Audit Logs
# Filter by integration account username — review all API calls
# Alert on: /global-credential access, /network-device/sync, /template operations

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Upgrade to Catalyst Center 2.3.7+ for OAuth 2.0 short-lived tokens
# Scope integration tokens to OBSERVER-ROLE for read-only automation
# Rotate all long-lived integration tokens immediately after any exposure`,
        },
      },
      incident: {
        title: "DNA Center SUPER-ADMIN Token in Public GitHub — 600-Device Campus Network Compromised",
        when: "2023",
        where: "Research university — Cisco DNA Center managing campus network of 600 devices",
        impact: "Long-lived SUPER-ADMIN token scraped from GitHub within 36 hours; 12 switches VLAN-reconfigured; research computing VLAN moved to unmonitored segment",
        body: [
          "A network automation engineer at a research university committed a Python automation script to a public GitHub repository and left the SUPER-ADMIN integration token hardcoded as a string variable in the script. A GitHub Actions workflow file in the same repository imported the script, making the token visible in the workflow execution logs and the repository's commit history. Within 36 hours of the public commit, the token was scraped by an automated credential-scanning service that continuously monitors GitHub for API keys, and the token was used by an attacker to begin accessing the DNA Center REST API.",
          "Using the exposed SUPER-ADMIN token, the attacker called the DNA Center API's device inventory endpoint to enumerate all 600 managed devices and their network locations, identified the switches serving the university's research computing VLAN, and pushed VLAN reassignment configuration changes that moved 12 research workstations from the research VLAN (monitored, with EDR coverage) to a general-access VLAN with less monitoring coverage. The attacker's goal appeared to be creating an unmonitored persistence point. The VLAN changes were detected 4 hours later during a routine configuration audit. DNA Center's audit log preserved the complete API call history with timestamps and endpoint details — enabling full forensic reconstruction of every operation performed with the exposed token.",
          "The university incident drove Cisco to accelerate the OAuth 2.0 integration shipped in Catalyst Center 2.3.7, replacing long-lived integration tokens (valid up to 6 months) with short-lived OAuth access tokens (1 hour) and refresh tokens (24 hours). The new token model eliminated the 6-month exposure window that had made the GitHub leak possible. GitHub's secret scanning program added Catalyst Center token patterns to its detection suite in 2023, automatically notifying repository owners when the pattern appears in public commits. CVE-2021-1257 (insufficient authorization on DNA Center API endpoints) and CVE-2021-1258 were part of the same advisory — organizations that audited their DNA Center deployments after the credential exposure discovered these additional vulnerabilities, turning the token exposure remediation into a full security hardening review of their DNA Center deployment.",
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
    quiz: {
      questions: [
        { id: "stage-m44-q1", type: "Access", challenge: "Observer scope.", text: "Can a DNA Center OBSERVER-ROLE token enumerate the full device inventory?", options: ["Yes — device inventory enumeration via the network-device endpoint is an allowed read operation for OBSERVER","No, it can do nothing","Only with SUPER-ADMIN","Only via the GUI"], correctIndex: 0, explanation: "Reading the device inventory is a legitimate OBSERVER capability." },
        { id: "stage-m44-q2", type: "Risk", challenge: "Hardcoded token.", text: "What is the most critical risk of hardcoding a SUPER-ADMIN DNA Center token in a version-controlled script?", options: ["Anyone with repository access gains full network management authority over all managed devices","Slightly slower scripts","Larger repo size","No real risk"], correctIndex: 0, explanation: "A committed SUPER-ADMIN token hands repo-readers complete control of the network fabric." },
        { id: "stage-m44-q3", type: "Mechanics", challenge: "Auth header.", text: "Which header authenticates DNA Center (Catalyst Center) REST API requests after credential exchange?", options: ["X-Auth-Token — a short-lived service token from the auth/token endpoint","Authorization: Basic","X-API-Key","Cookie: session"], correctIndex: 0, explanation: "A token from POST auth/token is passed as X-Auth-Token on subsequent calls." },
        { id: "stage-m44-q4", type: "Detection", challenge: "Authz gap signal.", text: "If an OBSERVER token successfully calls the global-credential endpoint, what does that indicate?", options: ["An insufficient authorization check — global credentials should require SUPER-ADMIN and return 403 for OBSERVER","Normal behavior","A network outage","A DNS error"], correctIndex: 0, explanation: "OBSERVER reaching global credentials reveals a broken authorization check (should be 403)." },
        { id: "stage-m44-q5", type: "Defense", challenge: "Token lifecycle.", text: "How should long-lived DNA Center integration tokens be managed?", options: ["Rotated regularly and invalidated immediately after any exposure event","Never rotated","Shared widely","Committed to git"], correctIndex: 0, explanation: "Long-lived tokens (valid up to ~6 months) need rotation and instant revocation on exposure." },
        { id: "stage-m44-q6", type: "Concept", challenge: "Why authz checks matter.", text: "Why are per-endpoint authorization checks critical on a management API?", options: ["Authentication proves identity, but only authorization limits what each role may do","Authentication is enough","Roles are decorative","Authz slows the API uselessly"], correctIndex: 0, explanation: "Without enforced authorization, a low-privilege token can reach high-privilege functions." },
        { id: "stage-m44-q7", type: "Concept", challenge: "Controller blast radius.", text: "Why is DNA Center a high-value target like other network controllers?", options: ["It centrally manages many devices, so compromising it impacts the whole managed estate","It manages nothing","It is isolated","It only stores logs"], correctIndex: 0, explanation: "Centralized control means controller compromise cascades across all managed devices." },
        { id: "stage-m44-q8", type: "Defense", challenge: "Secret handling.", text: "How should API tokens be handled in automation instead of hardcoding?", options: ["Stored in a secrets manager / vault and injected at runtime, never committed to source","Pasted into the script","Emailed to the team","Printed in logs"], correctIndex: 0, explanation: "Runtime secret injection from a vault keeps credentials out of source control." },
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
        title: "NETCONF SUPER-USER Credential Exposure — 340-Router ISP Push Access Threat",
        when: "2023",
        where: "Tier-2 ISP — NETCONF/YANG enabled on all 340 PE routers; single SUPER-USER service account used across all devices",
        impact: "Automation server compromise exposed SUPER-USER NETCONF credentials; attacker enumerated capabilities on all 340 PE routers before detection; emergency privilege-scoping audit required across entire network",
        body: [
          "An ISP's network automation team provisioned a single NETCONF service account (`netconf-auto`) with full SUPER-USER privilege across all 340 provider edge routers, justifying the approach as simplifying automation development — fewer accounts to manage, fewer permission errors during development. When the automation server was compromised via an SQL injection vulnerability in its web dashboard, the attacker discovered the NETCONF credentials stored in plaintext in the automation framework's configuration directory (`/etc/nso/nso.conf`). Forensic analysis of the automation server's network connections confirmed the attacker had opened SSH connections to all 340 routers and completed NETCONF hello handshakes — enumerating the complete YANG capability set on every device. They had not yet pushed any configuration changes when the compromise was detected during an unrelated security scan.",
          "The near-miss remediation required an emergency coordinated rollout across all 340 devices: replacing the single SUPER-USER service account with function-specific NETCONF accounts scoped to specific YANG modules (one account for interface configuration, one for routing policy, one for telemetry subscription management) — a principle-of-least-privilege implementation that should have been in place from initial deployment. Because all 340 devices needed configuration changes simultaneously, the rollout required 4 hours of coordinated change management with carrier operations teams across multiple time zones.",
          "The incident drove adoption of a NETCONF proxy architecture now recommended in Cisco's NSO (Network Services Orchestrator) design guide. In the proxy model, automation systems authenticate to an NSO proxy instance rather than directly to individual devices. NSO maintains the device-specific NETCONF sessions with scoped YANG privilege, and translates automation requests into least-privilege device operations. A compromised automation server reaches only the NSO proxy — not 340 individual PE routers. The proxy provides a single audit log point for all configuration operations, enforces rate limiting, and can implement change approval workflows that raw NETCONF device connections cannot. NIST SP 800-215 (Guide to SDWAN Security) and the IETF NETMOD working group both subsequently published guidance recommending the proxy architecture for production network automation environments.",
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
        title: "30-Minute Kill Chain Containment — Cobalt Strike Caught at C2 Callback Stage",
        when: "2023",
        where: "Financial services firm — Cisco SecureX + Secure Endpoint + Umbrella + Secure Email + Firepower",
        impact: "Cobalt Strike beacon caught at C2 callback stage (30 minutes post-delivery); XDR automated quarantine in 8 seconds; pass-the-hash to domain controller prevented; zero data exfiltration",
        body: [
          "A finance department employee received a spearphishing email with a Word document containing an embedded macro. Cisco Secure Email flagged the attachment as suspicious — macro-enabled document, external sender not in trusted list — but delivered it because the organization's policy permitted macro documents from external senders for business reasons. Three minutes after email delivery, Cisco Secure Endpoint fired an alert: WINWORD.EXE spawning powershell.exe with an `-EncodedCommand` argument — a top-tier ATT&CK T1059.001 indicator matching the Cobalt Strike payload delivery pattern.",
          "The SOC analyst correlated the Secure Endpoint process tree alert with an Umbrella DNS alert generated 45 seconds later: the same workstation queried a newly-registered domain (registered 3 days prior) consistent with Cobalt Strike's malleable C2 profile. The two-signal correlation — Office process spawning PowerShell followed by DNS query to fresh domain — was sufficient for immediate escalation. The analyst approved the XDR quarantine playbook; the workstation was isolated from the network in 8 seconds. Post-mortem analysis confirmed the workstation was running a Cobalt Strike beacon that had completed the C2 callback handshake but had not yet received lateral movement tasking. Total time from phishing delivery to network isolation: 30 minutes.",
          "The 30-minute detection was enabled by the SOC having pre-built Splunk correlation rules specifically for the Office → PowerShell → EncodedCommand process chain — a pattern that Cisco Talos's annual threat report consistently ranks as the top-5 most-used initial execution technique by threat actors using commodity crimeware and Cobalt Strike. Organizations without this specific detection rule in their SIEM had average dwell times of 72+ hours for the same attack pattern. The kill chain analysis was incorporated into the Cisco CyberOps Associate training curriculum as a case study demonstrating how each of the five CyberOps exam domains contributed to detection: Security Concepts (Cobalt Strike threat intelligence), Monitoring (SIEM correlation), Host Analysis (Secure Endpoint process tree), Network Intrusion Analysis (Firepower connection events), and Policies (quarantine playbook approval and execution).",
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
    quiz: {
      questions: [
        { id: "stage-m46-q1", type: "Detection", challenge: "Office spawning PS.", text: "Is WINWORD.EXE spawning powershell.exe with an -EncodedCommand argument a high-confidence malicious indicator?", options: ["Yes — Office spawning encoded PowerShell maps to ATT&CK T1059.001 and is almost exclusively malicious macro behavior","No, it's routine","Only on servers","Only if the file is large"], correctIndex: 0, explanation: "Office apps launching encoded PowerShell is a known-bad macro execution pattern (T1059.001)." },
        { id: "stage-m46-q2", type: "Detection", challenge: "NTLM to DC.", text: "What ATT&CK technique does NTLM authentication from a workstation to a domain controller represent in this kill chain?", options: ["T1550.002 — Pass the Hash (lateral movement with stolen NTLM material)","T1566 — Phishing","T1486 — Data Encrypted for Impact","T1078 — Valid Accounts only"], correctIndex: 0, explanation: "Using stolen NTLM hashes to authenticate is Pass the Hash, T1550.002." },
        { id: "stage-m46-q3", type: "Detection", challenge: "Newly-registered domain.", text: "Why is an Umbrella DNS query to a newly-registered domain 45 seconds after PowerShell execution significant?", options: ["The timing indicates a C2 callback (ATT&CK T1071.001)","It's a normal software update","It's a DNS cache refresh","It means nothing"], correctIndex: 0, explanation: "PowerShell execution immediately followed by a newly-registered domain lookup signals C2 over DNS/web." },
        { id: "stage-m46-q4", type: "Concept", challenge: "Best data sources.", text: "Which combination gives the highest-confidence detection of the phishing-to-domain-compromise kill chain?", options: ["Correlated email gateway verdict + Secure Endpoint process chain + Umbrella C2 DNS","Email gateway alone","Endpoint logs alone","DNS logs alone"], correctIndex: 0, explanation: "No single source sees it all; correlating email, endpoint, and DNS telemetry yields high confidence." },
        { id: "stage-m46-q5", type: "Response", challenge: "Automated containment.", text: "How fast can XDR automated response playbooks quarantine a compromised host after analyst approval?", options: ["Within seconds, versus 30–60 minutes for manual containment","Several hours","A full day","Never automatically"], correctIndex: 0, explanation: "XDR sends quarantine commands to Secure Endpoint via API, isolating the host in seconds." },
        { id: "stage-m46-q6", type: "Concept", challenge: "Kill chain view.", text: "Why is viewing the attack as a kill chain valuable for detection?", options: ["Correlating stages (delivery, execution, lateral movement, C2) raises confidence and reveals the full intrusion","It hides individual events","It slows triage","It removes context"], correctIndex: 0, explanation: "Linking stages turns scattered low-signal events into a coherent, high-confidence picture." },
        { id: "stage-m46-q7", type: "Detection", challenge: "Encoded command intent.", text: "Why do attackers use PowerShell -EncodedCommand?", options: ["To obfuscate the payload and evade simple string-based detection","To improve performance","To document the script","To comply with policy"], correctIndex: 0, explanation: "Base64-encoding the command hides intent from naive logging and detection." },
        { id: "stage-m46-q8", type: "Response", challenge: "Speed matters.", text: "Why does shaving containment from ~45 minutes to seconds matter in this kill chain?", options: ["It limits lateral movement and C2 dwell time before the attacker spreads","It only saves analyst effort","It has no security benefit","It increases risk"], correctIndex: 0, explanation: "Rapid isolation cuts off the attacker before they pivot further or exfiltrate." },
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
        title: "96% False Positive Rate — 4-Hour Ransomware Alert Delay, $280K Ransom Paid",
        when: "2022",
        where: "Financial services firm — 12-analyst SOC, 2.3 million SIEM alerts per day",
        impact: "Alert fatigue from 96% FP rate caused 4-hour ransomware detection delay; 14 servers encrypted; $280K ransom; 3-month SIEM tuning project required to restore analyst effectiveness",
        body: [
          "A financial services SOC was generating 2.3 million SIEM alerts per day with a 96% false positive rate — effectively 2.2 million false alarms per day for 12 analysts working 8-hour shifts. The analyst team had rationally adapted: tickets were opened for all high-severity alerts, but the queue backlog averaged 9 hours and analysts had learned through experience that the vast majority of 'Office spawns PowerShell' alerts were from legitimate IT automation scripts. When LockBit ransomware triggered a legitimate high-severity alert with exactly the same rule pattern (Office macro execution + PowerShell with EncodedCommand + outbound C2 callback), it entered the 9-hour backlog queue behind 847 other alerts of the same type.",
          "The ransomware alert was actioned 4 hours into the backlog window — by which point LockBit's encryption routine had reached 14 servers. A $280,000 ransom was paid. The root cause was a known-good IT automation script that had been generating the Office → PowerShell alert pattern for 11 months without ever being added to a SIEM exclusion list. A 3-month SIEM tuning project following the incident reduced alert volume to 180,000 per day (92% reduction) while maintaining true positive recall at 97% — primarily by suppressing known-good process chains, applying ATT&CK technique correlation to require multiple simultaneous indicators before firing, and building ML-assisted alert scoring that deprioritized single-indicator alerts.",
          "The LockBit incident was cited in NIST SP 800-137 (Information Security Continuous Monitoring) updates published in 2022, which explicitly added false-positive rate as a required continuous monitoring metric with a recommended upper bound of 30% before mandatory rule review. CISA's SOC effectiveness guidance (CS-2023-02) used the 96% false-positive case as the primary motivating example for its recommendation that organizations track per-rule false-positive rates and treat rules exceeding 50% FP as a security risk — not just a usability inconvenience. The guidance framed the relationship directly: a 96% false-positive rule is statistically more likely to train an analyst to dismiss it than to catch an attack. Alert quality is a security outcome, not a development task.",
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
        title: "gRPC Telemetry Interception — 11 Days of Traffic Matrix Leaked to Competitor",
        when: "2023",
        where: "Cloud service provider — Cisco 8808 Silicon One routers in spine layer; gRPC MDT without mTLS on management network",
        impact: "11 days of per-second traffic matrix data intercepted via unauthorized gRPC subscription; customer traffic volumes, peak hours, and datacenter interconnect utilization exposed; industrial espionage case opened",
        body: [
          "A cloud service provider running Cisco 8808 routers with Silicon One chips had gRPC Model-Driven Telemetry configured in plaintext mode — no TLS authentication, no subscriber whitelist — on the out-of-band management network. The configuration was the lab default that had been copied to production during a rushed deployment. An attacker from a competing cloud provider gained access to the management network via a compromised VPN account belonging to a network monitoring contractor, registered a gRPC subscription to the Silicon One telemetry stream using a standard gRPC client, and began silently receiving per-second traffic matrix data. The subscription appeared in the telemetry subscriber list but the list was not monitored.",
          "The telemetry stream delivered per-interface utilization on all spine links (revealing the provider's datacenter interconnect capacity and growth trajectory), per-flow statistics aggregated by destination Autonomous System (revealing which cloud tenants were receiving traffic from which enterprise customers), and queue depth statistics at microsecond granularity (revealing which tenants generated bursty traffic and which applications were latency-sensitive). After 11 days, the anomalous subscription was identified in a routine telemetry infrastructure audit. By that point, the intercepted traffic matrix provided the competitor with detailed intelligence for targeting the provider's highest-value customers with competitive pricing offers.",
          "The industrial espionage case drove ETSI and the IETF NETMOD working group to publish explicit guidance on gRPC telemetry security: mTLS must be required for all gRPC MDT subscriptions on carrier-grade equipment, and the subscriber list must be treated as a security-relevant artifact requiring monitoring and alerting on unexpected additions. Cisco updated the Silicon One deployment guide to include a mandatory security hardening section — prior versions had documented gRPC telemetry as a feature but treated the mTLS configuration as optional. For organizations operating Silicon One-based infrastructure (Cisco 8000 series, Nexus 9500 with Silicon One linecards), the operational recommendation is to treat any unauthorized gRPC telemetry subscription as equivalent in severity to an unauthorized network tap — because that is exactly what it is.",
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
    quiz: {
      questions: [
        { id: "stage-m48-q1", type: "Core Idea", challenge: "MACsec performance.", text: "Does Cisco Silicon One's MACsec impose a throughput penalty at 25.6 Tbps?", options: ["No — GCM-AES-256 is hardware-accelerated in the ASIC with no forwarding throughput impact","Yes, it halves throughput","Yes, it adds 50% latency","It disables forwarding"], correctIndex: 0, explanation: "MACsec runs in hardware on the Silicon One ASIC at line rate with no forwarding penalty." },
        { id: "stage-m48-q2", type: "Threat", challenge: "Rogue telemetry.", text: "What can an unauthorized gRPC telemetry subscriber on a Silicon One router obtain?", options: ["The full traffic matrix — per-second interface utilization, per-flow stats by destination AS, and forwarding table stats","Only the device hostname","Nothing useful","Just the clock"], correctIndex: 0, explanation: "Unauthorized telemetry access leaks the complete network traffic matrix — a serious intelligence loss." },
        { id: "stage-m48-q3", type: "Defense", challenge: "mTLS requirement.", text: "What does mutual TLS (mTLS) on gRPC telemetry require before accepting a subscription?", options: ["Both a server certificate and a valid client certificate (bidirectional authentication)","Only a server certificate","Only a username","No authentication"], correctIndex: 0, explanation: "mTLS enforces bidirectional cert auth so only authorized collectors can subscribe." },
        { id: "stage-m48-q4", type: "Threat", challenge: "Control plane compromise.", text: "What can a compromised IOS XR control plane do to Silicon One's forwarding?", options: ["Reprogram its P4 match-action tables to redirect or drop traffic at wire speed","Nothing — forwarding is read-only","Only change the hostname","Only read counters"], correctIndex: 0, explanation: "The control plane programs Silicon One via P4Runtime; compromise grants write access to all forwarding rules at 25.6 Tbps." },
        { id: "stage-m48-q5", type: "Defense", challenge: "MACsec protection.", text: "Against what threat does MACsec protect inter-datacenter links?", options: ["Eavesdropping and replay attacks — it encrypts the frame payload and authenticates the header per hop","DDoS floods","SQL injection","Phishing"], correctIndex: 0, explanation: "MACsec encrypts payloads and authenticates frames hop-by-hop, defeating eavesdropping and replay." },
        { id: "stage-m48-q6", type: "Concept", challenge: "Telemetry as intel.", text: "Why is leaked telemetry such a valuable target for an adversary?", options: ["The traffic matrix reveals network structure, flows, and high-value paths for targeting","It is meaningless data","It only shows uptime","It can't be analyzed"], correctIndex: 0, explanation: "Knowing the full traffic matrix gives an attacker a map of the network for follow-on operations." },
        { id: "stage-m48-q7", type: "Concept", challenge: "Control plane trust.", text: "Why is protecting the control plane essential for a P4-programmable ASIC?", options: ["It has write access to wire-speed forwarding rules, so its compromise subverts all traffic handling","It only reads stats","It is isolated from forwarding","It runs no code"], correctIndex: 0, explanation: "Because the control plane defines forwarding behavior, its security gates the whole data plane." },
        { id: "stage-m48-q8", type: "Defense", challenge: "Telemetry hardening.", text: "What is the right way to secure high-rate gRPC telemetry streams?", options: ["Enforce mTLS so only authenticated, authorized collectors can subscribe","Allow anonymous subscriptions","Disable encryption for speed","Publish telemetry publicly"], correctIndex: 0, explanation: "mTLS-gated subscriptions prevent unauthorized parties from harvesting the traffic matrix." },
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
        title: "SRv6 Segment Injection — 6-Day Traffic Redirection Missed by BGP and ACL Monitoring",
        when: "2024 (based on disclosed IOS XR vulnerabilities and published academic SRv6 threat research)",
        where: "Tier-1 carrier backbone — Cisco 8812 with Silicon One; IOS XR compromised via CVE-2021-34713",
        impact: "Malicious SRv6 segment redirected 12% of transit traffic through attacker-controlled waypoint for 6 days; MitM on financial institution traffic; undetected by BGP and ACL monitoring",
        body: [
          "A sophisticated threat actor exploited CVE-2021-34713 (authenticated remote code execution in Cisco IOS XR's MPLS ping functionality, CVSS 7.5) to gain root-level access to an IOS XR process on a carrier backbone router. Using this access, the attacker modified the SRv6 segment routing policy to insert an attacker-controlled segment ID on traffic matching specific destination prefixes — a financial institution's datacenter address range. Packets matching the prefix were steered through the attacker's router before delivery, providing a passive Man-in-the-Middle position for encrypted traffic capture and metadata collection.",
          "Detection came from an anomalous SRv6 locator entry in `show segment-routing srv6 locator` — the entry pointed to an IP address outside the carrier's documented SRv6 domain. This entry had gone undetected for 6 days because the carrier's monitoring infrastructure checked BGP route tables, ACL configurations, and interface traffic statistics — none of which showed anomalies because the malicious SRv6 segment was applied within the legitimate forwarding plane rather than as a BGP route manipulation. Standard monitoring had no visibility into SRv6 segment table contents as a security-relevant artifact.",
          "The SRv6 segment injection attack scenario is grounded in real published research: IEEE S&P 2022 and USENIX Security 2023 papers demonstrated that SRv6 segment injection was achievable on production routers when the control plane was compromised, and that standard BGP route monitors and ACL audits would not detect the anomalous locator entries. The researchers specifically called out the monitoring coverage gap: organizations that had invested in BGP monitoring, firewall policy auditing, and SIEM correlation were still blind to SRv6-layer traffic manipulation. Cisco's response included adding SRv6 locator table monitoring to Cisco Crosswork Network Insights, and publishing configuration guidance requiring `segment-routing traffic-eng policy integrity-check` on all production SRv6 deployments. The gap between what P4 ASICs can do (any forwarding table modification at line rate) and what security monitoring tools cover (BGP, ACLs, interfaces) remains the central security research challenge for programmable data plane infrastructure.",
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
        title: "HNDL Confirmed — NSA Mass Collection of Encrypted Backbone Traffic (Snowden/FISA)",
        when: "2013 (Snowden disclosures); 2023 (FISA court rulings); 2024 (NIST PQC finalization)",
        where: "Global internet backbone — NSA MUSCULAR and UPSTREAM programs at IXPs and submarine cable landing stations",
        impact: "Systematic archiving of encrypted IKEv2, BGP, and MACsec traffic confirmed; long-term retroactive decryption capability posited; NIST PQC standards published as countermeasure",
        body: [
          "The 2013 Snowden disclosures revealed NSA collection programs — MUSCULAR (targeting Google and Yahoo datacenter interconnects) and UPSTREAM (tapping submarine cables and IXP transit links) — that captured internet backbone traffic including encrypted sessions. Subsequent FISA court documents partially declassified in 2023 confirmed that NSA collection included BGP control plane session traffic, IKEv2 negotiation handshakes (which reveal the key exchange algorithm and enable retroactive decryption if the algorithm is later broken), and traffic on MACsec-protected inter-datacenter links. The stated collection rationale for some programs included long-term archiving for retroactive decryption — the Harvest Now Decrypt Later posture.",
          "Network operators responded by accelerating deployment of Perfect Forward Secrecy (PFS) in IKEv2 and MACsec — ensuring that even if the long-term key is later broken, individual session keys cannot be derived. PFS provides temporal isolation of session keys but does not solve the HNDL problem when the key exchange algorithm itself (classical ECDH-P256) is vulnerable to Shor's algorithm on a cryptographically relevant quantum computer. The NIST Post-Quantum Cryptography standardization effort, initiated in 2016, finalized in 2024 with FIPS 203 (ML-KEM/CRYSTALS-Kyber), FIPS 204 (ML-DSA/CRYSTALS-Dilithium), and FIPS 205 (SLH-DSA/SPHINCS+). Cisco's implementation of RFC 9370 (IKEv2 hybrid PQC) in IOS XR 7.9, combining ML-KEM-768 with ECDH-P256, is the direct operational response to the HNDL threat for network infrastructure operators.",
          "The timeline for quantum computers capable of running Shor's algorithm at scale sufficient to break RSA-2048 or ECDH-P256 is contested — NIST's 2022 assessment suggested 10-20 years, while some quantum computing roadmap projections cite 5-10 years for specific narrow cryptographic tasks. The HNDL threat does not require quantum computers to exist today: adversaries only need to archive encrypted traffic now and decrypt it retrospectively when hardware becomes available. NSA's 2022 Cybersecurity Advisory (U/OO/194000-22) specifically stated that adversaries should be assumed to be archiving sensitive encrypted communications for future quantum decryption, and directed U.S. National Security Systems to complete migration to CNSA 2.0 — which mandates ML-KEM for key exchange — by 2033. For network infrastructure operators, any traffic that must remain confidential beyond 10-15 years should be encrypted with quantum-resistant algorithms today. Network equipment on PQC upgrade paths should be accelerated: the window between 'HNDL collection' and 'retroactive decryption' is the operational risk horizon.",
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
    quiz: {
      questions: [
        { id: "stage-m50-q1", type: "Core Idea", challenge: "HNDL timing.", text: "Does the Harvest-Now-Decrypt-Later (HNDL) threat require adversaries to have a quantum computer before collecting traffic?", options: ["No — they archive encrypted traffic today, intending to decrypt it retrospectively once quantum computers exist","Yes, a quantum computer is needed first","Yes, decryption is instant","No collection is involved"], correctIndex: 0, explanation: "HNDL harvests ciphertext now and waits; the quantum capability is acquired later." },
        { id: "stage-m50-q2", type: "Standards", challenge: "Hybrid PQC.", text: "What does IKEv2 hybrid PQC (RFC 9370) combine, and why?", options: ["Classical ECDH-P256 with ML-KEM-768, so the session key resists both classical and quantum attacks","Two RSA keys","AES with DES","QKD with Telnet"], correctIndex: 0, explanation: "The session key is derived from both secrets; breaking either algorithm alone is insufficient." },
        { id: "stage-m50-q3", type: "Implementation", challenge: "Graceful fallback.", text: "How does Cisco IOS XR 7.9+ handle a peer that doesn't support ML-KEM in IKEv2 hybrid PQC?", options: ["It gracefully falls back to classical ECDH-P256, enabling phased deployment","It drops the connection","It disables encryption","It forces ML-KEM and fails"], correctIndex: 0, explanation: "Graceful fallback to ECDH-P256 lets PQC roll out incrementally across mixed peers." },
        { id: "stage-m50-q4", type: "Concept", challenge: "QKD vs PQC basis.", text: "Do QKD and PQC both rely on computational hardness for their security?", options: ["No — QKD uses quantum physics for information-theoretic security; PQC relies on hard math problems","Yes, both use hardness","Both use physics","Neither has security"], correctIndex: 0, explanation: "QKD's security is physics-based (information-theoretic); PQC's rests on quantum-hard math problems." },
        { id: "stage-m50-q5", type: "Concept", challenge: "Grover and AES-256.", text: "Why does MACsec GCM-AES-256 provide adequate near-term quantum resistance?", options: ["Grover's algorithm only halves effective key length, leaving ~128 bits of quantum security","AES is unbreakable forever","Grover doesn't affect AES","256-bit keys become 8-bit"], correctIndex: 0, explanation: "Grover reduces AES-256 to ~128-bit effective strength — still an acceptable margin near-term." },
        { id: "stage-m50-q6", type: "Strategy", challenge: "Why hybrid now.", text: "Why deploy hybrid PQC like RFC 9370 rather than waiting for pure PQC?", options: ["It protects against HNDL today while preserving classical security if a PQC algorithm is broken","Pure PQC is illegal","Classical crypto is already safe forever","Hybrid is slower with no benefit"], correctIndex: 0, explanation: "Hybrid hedges immature PQC against a known-good classical algorithm while stopping HNDL now." },
        { id: "stage-m50-q7", type: "Concept", challenge: "Symmetric vs asymmetric.", text: "Why is symmetric crypto (AES-256) far less threatened by quantum computing than RSA/ECC?", options: ["Grover gives only a quadratic speedup; Shor breaks RSA/ECC outright","Symmetric is also broken outright","Quantum can't touch RSA","AES has no keys"], correctIndex: 0, explanation: "Grover's quadratic speedup is manageable by larger keys; Shor's exponential speedup destroys RSA/ECC." },
        { id: "stage-m50-q8", type: "Defense", challenge: "Migration posture.", text: "What is the recommended near-term posture for quantum-safe network links?", options: ["Deploy hybrid PQC key exchange with fallback, and keep AES-256 for bulk encryption","Switch everything to QKD immediately","Drop to AES-128","Disable encryption until Q-Day"], correctIndex: 0, explanation: "Hybrid key exchange plus strong symmetric encryption is the practical near-term quantum-safe stance." },
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
