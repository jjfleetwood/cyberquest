import type { StageConfig } from "./types";

export const cisco4Stages: StageConfig[] = [

  // ─── Stage m34: CVE-2023-20198 — Cisco IOS XE HTTP Privilege Escalation ─────
  {
    epochId: "cisco-secops",
    wonder: { name: "CISA Headquarters", location: "Arlington, Virginia, USA", era: "2023 CE", emoji: "🏛️" },
    id: "stage-m34",
    order: 34,
    title: "God Mode",
    subtitle: "CVE-2023-20198 — Cisco IOS XE Web UI Privilege Escalation, CVSS 10.0",
    category: "cybersecurity",
    cveId: "CVE-2023-20198",
    cvssScore: 10.0,
    xp: 150,
    badge: { id: "badge-m-iosxe", name: "Network Sovereign", emoji: "🏛️" },
    challengeType: "ctf",
    info: {
      tagline: "A single unauthenticated HTTP request turned 50,000 routers into attacker-controlled network nodes.",
      year: 2023,
      overview: [
        "CVE-2023-20198 is a CVSS 10.0 — the maximum possible score — vulnerability in the Cisco IOS XE Web UI. When the web management interface is enabled (`ip http server` or `ip http secure-server`), an unauthenticated remote attacker can create a new local user account with privilege level 15 (full admin) by sending a specially crafted HTTP request to the management interface.",
        "The vulnerability was exploited as a zero-day beginning in late September 2023. By October 2023, security researchers identified over 50,000 Cisco IOS XE devices worldwide that had been compromised, with the implant active and awaiting attacker commands. Cisco published its first advisory on October 16, 2023 — weeks after mass exploitation was already underway.",
        "IOS XE runs on Cisco's Catalyst switches, ISR routers, ASR routers, and other enterprise networking infrastructure. A privilege-15 account on these devices gives an attacker complete control: routing table manipulation, traffic interception, lateral movement to management networks, and the ability to install persistent implants — all without triggering standard authentication logs.",
      ],
      technical: {
        title: "IOS XE HTTP Server Privilege Escalation — Unauthenticated Account Creation",
        body: [
          "The IOS XE Web UI is built on an embedded HTTP/HTTPS server. When enabled, it exposes a management interface at the device's management IP. The vulnerability existed in a specific URL path used by the web UI during the registration workflow. Sending a crafted POST request to this path with specific parameters caused the HTTP server to create a local user account with privilege level 15 before authentication was checked.",
          "Privilege level 15 in Cisco IOS is equivalent to root — it grants access to all privileged EXEC commands including `write memory`, `reload`, `configure terminal`, and full routing configuration. An attacker with a privilege-15 account can modify every aspect of the device configuration.",
          "Chained with CVE-2023-20273 (a separate Web UI command injection), attackers used the level-15 account to execute OS-level commands and install a malicious Lua plugin as a persistent implant. The plugin disguised itself as part of the normal IOS XE configuration and survived device reloads.",
        ],
        codeExample: {
          label: "CVE-2023-20198 — unauthenticated privilege-15 account creation",
          code: `# CVE-2023-20198 exploitation — unauthenticated HTTP request
# Creates a privilege-15 user on vulnerable Cisco IOS XE devices

curl -k -X POST "https://192.0.2.1/webui/logoutconfirm.html?logon_hash=1" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "username=attacker&password=Cisco123!&privilege=15"

# Response: HTTP 200 — user created (no authentication required)
# Verification — log in as the new admin:
curl -k -u "attacker:Cisco123!" \\
  "https://192.0.2.1/webui/#/showtech"

# Detection: check for unexpected level-15 users
show running-config | include username
show users

# Mitigation: disable the HTTP server if not needed
no ip http server
no ip http secure-server`,
        },
      },
      incident: {
        title: "IOS XE Zero-Day Mass Exploitation — 50,000 Devices Implanted",
        when: "Late September 2023 (first observed) — October 2023 (Cisco advisory published)",
        where: "Cisco IOS XE devices globally — enterprise routers, switches, branch WAN gateways",
        impact: "50,000+ devices compromised; implants installed; CISA issued emergency guidance; Cisco delayed disclosure for weeks while patch was developed",
        body: [
          "Security researchers at VulnCheck first published findings on October 16, 2023 — the same day Cisco released its advisory. By that point, over 50,000 Cisco IOS XE devices had already been compromised with an HTTP implant awaiting commands. The scale of exploitation was extraordinary: attackers automated the attack and scanned the entire internet for vulnerable devices within days of discovering the zero-day.",
          "CISA issued Emergency Directive 24-01, requiring U.S. federal agencies to identify and remediate all affected IOS XE devices within 48 hours. The incident demonstrated the danger of exposing network device management interfaces to the internet — a common misconfiguration that turns critical infrastructure into an easily exploitable target.",
          "The threat actor behind the campaign (tracked by Cisco Talos) deployed two malware stages. The first used CVE-2023-20198 to create the admin account. The second used CVE-2023-20273 to execute commands and install a Lua-based implant in the IOS XE filesystem. The implant provided persistent access that survived device reloads and would have been invisible to administrators checking authorized users.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "crafted HTTP POST — unauthenticated", type: "attacker" },
          { label: "IOS XE Web UI", sub: "logoutconfirm.html — no auth check", type: "system" },
          { label: "User Database", sub: "privilege-15 account created", type: "victim" },
          { label: "Full Network Control", sub: "50,000+ devices → attacker admin", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Sep 28: Zero-day exploitation begins; attackers scan and compromise IOS XE devices globally" },
        { year: 2023, event: "Oct 16: Cisco publishes advisory cisco-sa-iosxe-webui-privesc-j22SaA4Z; 50,000+ devices already implanted", highlight: true },
        { year: 2023, event: "Oct 16: CISA issues Emergency Directive 24-01 to all U.S. federal agencies" },
        { year: 2023, event: "Oct 23: Cisco updates advisory to include CVE-2023-20273 (chained command injection); patches released" },
        { year: 2024, event: "IOS XE HTTP server exposure becomes a standard finding in enterprise security audits" },
      ],
      keyTakeaways: [
        "Never expose the IOS XE management interface to untrusted networks — use out-of-band management VLANs with ACLs",
        "Disable `ip http server` and `ip http secure-server` on all production devices unless absolutely required",
        "Monitor for unexpected privilege-15 users in running-config: `show running-config | include username`",
        "CVSS 10.0 means no authentication, no user interaction, and complete compromise — treat as immediate emergency",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2023-20198", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4Z" },
        { title: "NVD — CVE-2023-20198", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-20198" },
        { title: "CISA Emergency Directive 24-01", url: "https://www.cisa.gov/emergency-directive-24-01" },
        { title: "VulnCheck — IOS XE Zero-Day Analysis", url: "https://vulncheck.com/blog/cisco-iosxe-cve-2023-20198" },
      ],
    },
    ctf: {
      scenario: "A Cisco IOS XE router at a financial institution is running an unpatched version with the HTTP server enabled and exposed to the management network. The device manages BGP peering for 12 downstream branches. Use CVE-2023-20198 to create a privilege-15 admin account and retrieve the router flag.",
      hint: "Read the briefing, check the device config, then use priv-exploit to create a level-15 account and access the admin panel.",
      hints: [
        "Start: cat briefing.txt",
        "Review the device configuration: show-config",
        "Exploit the HTTP server vulnerability: priv-exploit create-admin",
        "Log in with the new account: admin-login",
        "Retrieve the flag: cat /router/flag.txt",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{iosxe_", label: "Mission Brief — IOS XE Target" },
        { trigger: "show-config", value: "http_", label: "Config Reviewed — HTTP Server Confirmed Exposed" },
        { trigger: "priv-exploit create-admin", value: "priv15_", label: "Admin Account Created — CVE-2023-20198" },
        { trigger: "admin-login", value: "10_0}", label: "Admin Session — Full Network Access" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: GOD MODE",
          "Target: Cisco IOS XE router — BGP gateway for 12 branches",
          "CVE: 2023-20198  CVSS: 10.0",
          "",
          "The device has ip http server enabled and exposed to management network.",
          "Zero auth required — create a privilege-15 account and capture the flag.",
          "Sequence: show-config → priv-exploit create-admin → admin-login → cat /router/flag.txt → assemble",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "briefing.txt", isDir: false },
        ],
      },
      extraCommands: {
        "show-config": (_args: string[]) => ({
          lines: [
            "router# show running-config | include http",
            "ip http server",
            "ip http secure-server",
            "ip http authentication local",
            "",
            "router# show running-config | include username",
            "username netadmin privilege 15 secret <hash>",
            "",
            ">> LEARN: Both HTTP and HTTPS management are enabled.",
            "   The Web UI is exposed. CVE-2023-20198 targets the registration",
            "   endpoint — no credentials needed to create a level-15 user.",
          ],
        }),
        "priv-exploit": (args: string[]) => {
          if (args[0] === "create-admin") {
            return {
              lines: [
                "POST https://192.0.2.1/webui/logoutconfirm.html?logon_hash=1",
                "  username=attacker&password=Cisco123!&privilege=15",
                "",
                "HTTP/1.1 200 OK",
                "",
                ">> Account created:",
                "   username: attacker",
                "   privilege: 15 (full admin)",
                "",
                ">> LEARN: The registration endpoint processed the user creation",
                "   before checking authentication — a pre-auth code path flaw.",
                "   CVSS 10.0: no auth, no interaction, complete compromise.",
                "",
                "Run: admin-login",
              ],
            };
          }
          return { lines: ["Usage: priv-exploit create-admin"] };
        },
        "admin-login": (_args: string[]) => ({
          lines: [
            "Authenticating as: attacker (privilege 15)...",
            "Authentication successful.",
            "",
            "router# show privilege",
            "Current privilege level is 15",
            "",
            "router# show ip bgp summary",
            "BGP peers: 12 branches connected",
            "Total prefixes: 4,821",
            "",
            "Fragment collected. Run: cat /router/flag.txt",
          ],
        }),
        "cat": (args: string[]) => {
          if (args[0] === "/router/flag.txt") {
            return {
              lines: [
                "FLAG{iosxe_http_priv15_10_0}",
                "",
                "Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return { lines: [`cat: ${args[0]}: No such file or directory`] };
        },
      },
    },
  },

  // ─── Stage m35: CVE-2023-20273 — IOS XE Web UI Command Injection (Chained) ──
  {
    epochId: "cisco-secops",
    wonder: { name: "NSA / National Security Operations Center", location: "Fort Meade, Maryland, USA", era: "2023 CE", emoji: "🔐" },
    id: "stage-m35",
    order: 35,
    title: "The Second Key",
    subtitle: "CVE-2023-20273 — Cisco IOS XE Web UI Command Injection, CVSS 7.2 (Chained with CVE-2023-20198)",
    category: "cybersecurity",
    cveId: "CVE-2023-20273",
    cvssScore: 7.2,
    xp: 110,
    badge: { id: "badge-m-iosxe2", name: "Chain Exploiter", emoji: "🔐" },
    challengeType: "quiz",
    info: {
      tagline: "The first zero-day created the door. The second zero-day installed a lock only the attacker could open.",
      year: 2023,
      overview: [
        "CVE-2023-20273 is a command injection vulnerability in the Cisco IOS XE Web UI that was used in combination with CVE-2023-20198 in the October 2023 mass exploitation campaign. Once an attacker used CVE-2023-20198 to create a privilege-15 account on the device, they used CVE-2023-20273 to inject OS-level commands into the IOS XE underlying operating system — not just the IOS EXEC layer.",
        "The chained attack allowed the threat actor to deploy a malicious Lua plugin as a persistent implant. The Lua plugin was installed in the IOS XE filesystem and loaded on device startup, providing persistent command-and-control access that survived device reloads. The implant intercepted specific HTTPS packets and executed embedded shellcode — effectively turning the router into a covert network tap.",
        "Cisco updated its October 16, 2023 advisory on October 23 to add CVE-2023-20273 details after analysis of the implant revealed the second vulnerability in the attack chain. Patches were released for both vulnerabilities simultaneously.",
      ],
      technical: {
        title: "Web UI Command Injection — OS Command Execution via Admin Session",
        body: [
          "CVE-2023-20273 exploits insufficient input validation in a different IOS XE Web UI endpoint. After authenticating with the level-15 account created via CVE-2023-20198, the attacker sends a crafted request containing shell metacharacters (`;`, `|`, `&&`) to a Web UI management endpoint. The Web UI passes these characters to an underlying shell command without sanitization, resulting in arbitrary OS command execution.",
          "Unlike CVE-2023-20198 (which targets the IOS XE user database), CVE-2023-20273 breaks into the underlying Linux-based operating system that IOS XE runs on. Commands injected through this vulnerability execute as root at the OS level — not as an IOS EXEC privilege-15 session. This is a categorically deeper access level.",
          "The threat actor used OS command access to write a malicious Lua script to disk and register it as an IOS XE plugin. Lua is natively supported in IOS XE for network automation. Malicious plugins can intercept CLI commands, modify routing decisions, and communicate over the management interface — all while appearing as legitimate IOS XE functionality.",
        ],
        codeExample: {
          label: "CVE-2023-20273 — OS command injection via authenticated Web UI endpoint",
          code: `# Step 1: Already authenticated as privilege-15 (via CVE-2023-20198)
# Step 2: Inject OS command through vulnerable Web UI parameter

curl -k -u "attacker:Cisco123!" \\
  -X POST "https://192.0.2.1/webui/dashboard/device" \\
  -H "Content-Type: application/json" \\
  -d '{"deviceName":"router01; id #"}'

# OS response: uid=0(root) gid=0(root) — root shell on underlying Linux

# Step 3: Deploy persistent Lua implant
# Inject: touch /flash/lua/implant.lua && cat >>/flash/lua/implant.lua <<"EOF"
# function on_packet(pkt) ... C2 logic ... end
# EOF

# Detection — look for unexpected Lua files:
dir flash:*.lua

# Mitigation: disable Web UI + audit for unexpected files in flash:`,
        },
      },
      incident: {
        title: "IOS XE Lua Implant — Persistent Router Backdoor Deployed at Scale",
        when: "October 2023 — concurrent with CVE-2023-20198 mass exploitation",
        where: "Cisco IOS XE devices globally — specifically enterprise branch routers and campus gateways",
        impact: "Persistent implants survived reloads; C2 channel embedded in HTTPS management traffic; implants found on devices in US government, financial, and telco networks",
        body: [
          "After creating the admin account via CVE-2023-20198, the threat actor automated CVE-2023-20273 exploitation to deploy the Lua implant on thousands of devices. The implant was designed to be difficult to detect: it appeared in the IOS XE plugin list as a legitimate configuration item, used the same HTTPS management port as normal traffic, and required a specific password in the HTTP client to activate — ensuring random responders wouldn't accidentally trigger it.",
          "Cisco Talos reverse-engineered the implant and confirmed it could: intercept all CLI commands, modify or suppress log entries, exfiltrate running configurations, and proxy attacker traffic through the compromised router. For an attacker targeting financial institutions or government networks, a compromised BGP router is extraordinarily valuable — it controls routing for all traffic passing through it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CVE-2023-20198", sub: "creates level-15 account", type: "attacker" },
          { label: "CVE-2023-20273", sub: "authenticated command injection → root shell", type: "system" },
          { label: "IOS XE Filesystem", sub: "Lua implant written, persists on reload", type: "victim" },
          { label: "Persistent C2 Channel", sub: "covert router backdoor — survives reboots", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Sep 28: Threat actor begins exploiting CVE-2023-20198 + 20273 chain in mass campaign" },
        { year: 2023, event: "Oct 16: Cisco discloses CVE-2023-20198; implant analysis reveals second zero-day" },
        { year: 2023, event: "Oct 23: Cisco updates advisory with CVE-2023-20273 details; patches released for both CVEs", highlight: true },
        { year: 2023, event: "Post-incident: CISA guidance published on auditing IOS XE devices for Lua implants" },
        { year: 2024, event: "Lua plugin abuse added to MITRE ATT&CK as documented threat technique" },
      ],
      keyTakeaways: [
        "A chained exploit is often more dangerous than either component alone — assess vulnerability chains, not just individual CVEs",
        "IOS XE command injection at the OS level (not IOS EXEC) breaks out of Cisco's privilege model entirely",
        "Persistent Lua plugins in IOS XE are a novel implant mechanism — audit `dir flash:*.lua` after any suspected compromise",
        "Patch both CVE-2023-20198 and CVE-2023-20273 together — the chain only works if both are present",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2023-20273 (updated Oct 23)", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4Z" },
        { title: "Cisco Talos — IOS XE Implant Analysis", url: "https://blog.talosintelligence.com/active-exploitation-of-cisco-ios-xe-software/" },
        { title: "NVD — CVE-2023-20273", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-20273" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m35-q1",
          type: "Exploit Chain",
          challenge: `  An attacker has successfully used CVE-2023-20198 to create a
  privilege-15 account on a Cisco IOS XE router. They now send
  a crafted POST request to a Web UI management endpoint with
  shell metacharacters in a JSON parameter.`,
          text: "What does CVE-2023-20273 enable that CVE-2023-20198 alone does not?",
          options: [
            "CVE-2023-20273 allows creating additional user accounts beyond the first",
            "CVE-2023-20273 provides OS-level command execution as root on the underlying Linux system — not just IOS EXEC privilege-15 access",
            "CVE-2023-20273 disables IOS XE audit logging to hide the intrusion",
            "CVE-2023-20273 allows the attacker to modify BGP routing tables directly",
          ],
          correctIndex: 1,
          explanation: "CVE-2023-20198 creates a level-15 IOS EXEC account. CVE-2023-20273 breaks through to the underlying Linux OS as root — a fundamentally deeper access level that allows writing files to flash, modifying system processes, and installing persistent implants that survive reboots.",
        },
        {
          id: "m35-q2",
          type: "Persistence Mechanism",
          challenge: `  After chaining CVE-2023-20198 + CVE-2023-20273, the threat
  actor deploys a file to /flash/ on the IOS XE router. The
  file is loaded at startup and appears in the IOS XE plugin
  list as a legitimate configuration component.`,
          text: "What type of malware does this describe, and why does it survive a device reload?",
          options: [
            "A rootkit — it modifies the IOS XE kernel and hides in memory",
            "A Lua plugin implant — written to flash storage (persistent) and loaded by IOS XE at startup as a legitimate plugin, surviving reboots",
            "A boot sector virus — it overwrites the IOS XE firmware bootloader",
            "A memory-only beacon — it does not survive device reload",
          ],
          correctIndex: 1,
          explanation: "IOS XE natively supports Lua plugins for network automation. The implant was a malicious Lua script written to flash storage via CVE-2023-20273 OS access. Because flash is persistent storage and IOS XE loads plugins at boot, the implant survived device reloads — until the flash contents were manually inspected.",
        },
        {
          id: "m35-q3",
          type: "Detection",
          challenge: `  A network engineer suspects a Cisco IOS XE router was
  compromised by the CVE-2023-20198/20273 attack chain. The
  device has been patched but the engineer wants to confirm
  whether an implant was installed before patching.`,
          text: "Which IOS XE command is most useful for detecting a Lua-based persistent implant?",
          options: [
            "show version — the implant modifies the IOS XE version string",
            "dir flash:*.lua — lists Lua files in flash storage, which should not contain unknown scripts",
            "show ip route — compromised BGP routes indicate implant presence",
            "show users — the original attacker account will still appear",
          ],
          correctIndex: 1,
          explanation: "The implant was a Lua script written to flash. `dir flash:*.lua` lists any Lua files present — legitimate IOS XE installations should have none (or only known automation scripts). An unexpected `.lua` file in flash is a high-confidence indicator of the CVE-2023-20273 implant deployment.",
        },
        {
          id: "m35-q4",
          type: "Impact Assessment",
          challenge: `  A security team determines that a border router at their
  financial institution was compromised by the IOS XE implant
  for approximately 3 weeks before detection. The router handles
  all BGP peering for 8 regional branches.`,
          text: "What is the worst-case impact of a 3-week router implant with OS-level access?",
          options: [
            "The attacker could only read device logs — no traffic data is accessible from IOS XE",
            "The attacker could intercept, selectively drop, or reroute all traffic passing through the router; exfiltrate routing tables and BGP credentials; and pivot to connected management networks",
            "The impact is limited to the device itself — no downstream effects on connected networks",
            "The attacker could only modify the router's hostname and description fields",
          ],
          correctIndex: 1,
          explanation: "OS-level access on a BGP border router is catastrophic. The implant could intercept all transit traffic, exfiltrate routing credentials, inject malicious routes, pivot to the out-of-band management network connecting all branches, and cover its tracks by suppressing audit logs — for three weeks without detection.",
        },
      ],
    },
  },

  // ─── Stage m36: ArcaneDoor — CVE-2024-20359 / CVE-2024-20353 (ASA) ──────────
  {
    epochId: "cisco-secops",
    wonder: { name: "Cyber Security Agency of Singapore", location: "Singapore", era: "2024 CE", emoji: "🛡️" },
    id: "stage-m36",
    order: 36,
    title: "ArcaneDoor",
    subtitle: "CVE-2024-20359 / CVE-2024-20353 — Nation-State Exploitation of Cisco ASA/FTD (ArcaneDoor Campaign)",
    category: "cybersecurity",
    cveId: "CVE-2024-20359",
    cvssScore: 8.6,
    xp: 140,
    badge: { id: "badge-m-arcane", name: "Perimeter Ghost", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "A nation-state actor spent months living inside perimeter security devices — using two zero-days to install implants that survived factory resets.",
      year: 2024,
      overview: [
        "ArcaneDoor is a Cisco Talos-named nation-state espionage campaign disclosed April 24, 2024. The threat actor (tracked as UAT4356, and by Microsoft as STORM-1849) targeted government and critical infrastructure organizations globally by exploiting two zero-day vulnerabilities in Cisco Adaptive Security Appliance (ASA) and Firepower Threat Defense (FTD) — exactly the perimeter security devices designed to protect networks from external threats.",
        "CVE-2024-20353 is a CVSS 8.6 denial-of-service and potential remote code execution vulnerability in the ASA/FTD management and data interfaces that allowed unauthenticated attackers to trigger a reload or, in some configurations, execute code. CVE-2024-20359 is a CVSS 6.0 authenticated persistent local code execution vulnerability that allowed the implant to survive device reboots and upgrades — an exceptionally rare capability for network device malware.",
        "The campaign deployed two malware families: Line Dancer (an in-memory shellcode implant that used crafted HTTPS management packets as a covert C2 channel) and Line Runner (an HTTP-based backdoor that used the ASDM plugin mechanism to survive reboots). Cisco advised all customers to treat any ASA/FTD management interface exposure as an active threat.",
      ],
      technical: {
        title: "Line Dancer & Line Runner — Perimeter Device Implant Architecture",
        body: [
          "Line Dancer is a sophisticated in-memory shellcode implant for Cisco ASA. It hooks into the ASA's SSL VPN processing pipeline to intercept specific HTTPS packets destined for the management interface. Packets containing a specific secret header bypass normal processing and instead deliver shellcode payloads — effectively creating a covert C2 channel that blends with legitimate HTTPS management traffic.",
          "Line Runner exploits CVE-2024-20359, which abuses the ASA's ASDM (Adaptive Security Device Manager) plugin loading mechanism. ASDM plugins are ZIP archives that extend the management interface. Line Runner installs itself as a malicious plugin that is loaded at boot — surviving device reloads, software upgrades, and factory resets that preserve the plugin directory.",
          "The combination is devastating: Line Runner ensures persistence across all standard remediation steps, while Line Dancer provides a covert C2 channel invisible in standard network logs. Only Line Dancer needs active network connectivity; Line Runner is dormant until Line Dancer reactivates it.",
        ],
        codeExample: {
          label: "ArcaneDoor — ASA management interface attack surface analysis",
          code: `# Check ASA management interface exposure (should be restricted)
show running-config | include http
# Dangerous: http 0.0.0.0 0.0.0.0 outside  ← management exposed to internet
# Safe:      http 10.0.0.0 255.255.0.0 management  ← restricted to mgmt network

# Check for unexpected ASDM plugins (Line Runner indicator)
show asdm sessions
dir disk0:*.zip  ← look for unrecognized plugin archives

# Check for unexpected processes (Line Dancer indicator)
show processes | include ld-linux
show memory detail

# Mitigation:
# 1. Patch to ASA 9.12.4.67+, 9.16.4.59+, 9.17.1.37+, 9.18.4.37+, or 9.19.1.29+
# 2. Restrict management access with ACLs: 'http <trusted_net> management'
# 3. Enable logging to external syslog — Line Dancer suppresses local logs`,
        },
      },
      incident: {
        title: "ArcaneDoor — Nation-State Zero-Day Campaign Against Perimeter Devices",
        when: "Early 2024 (first observed); disclosed April 24, 2024 (Cisco Talos advisory)",
        where: "Government networks, critical infrastructure — global, concentrated in telecoms and energy sectors",
        impact: "Persistent firmware-level implants on ASA/FTD perimeter devices; covert C2 in management traffic; implants survived standard remediation including software upgrades",
        body: [
          "Cisco Talos identified ArcaneDoor in early 2024 during incident response at government customers. The campaign showed characteristics of a nation-state actor with advanced operational security: the attacker had deep knowledge of ASA internals, used zero-days that required substantial research to discover, and deployed a two-stage implant designed to maintain persistence through all standard IR steps.",
          "The choice of perimeter security devices as targets was deliberate. ASA firewalls sit at the boundary of internal networks — they have visibility into all north-south traffic, process VPN sessions for remote access, and connect to management networks that reach all internal infrastructure. A persistent implant on an ASA is a persistent implant on the entire network.",
          "CISA published an advisory alongside Cisco's disclosure, noting the campaign's similarity to other state-sponsored activity targeting network edge devices (referencing similar campaigns against Ivanti, FortiGate, and Pulse Secure). The pattern is clear: perimeter network devices running unaudited firmware are a primary target for nation-state espionage infrastructure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "UAT4356 / STORM-1849", sub: "nation-state, zero-day capability", type: "attacker" },
          { label: "Cisco ASA/FTD", sub: "CVE-2024-20353/20359 — management interface", type: "system" },
          { label: "Line Runner (boot persistent)", sub: "ASDM plugin — survives reload", type: "victim" },
          { label: "Line Dancer (C2)", sub: "in-memory HTTPS covert channel", type: "result" },
        ],
      },
      timeline: [
        { year: 2024, event: "Early 2024: Cisco Talos identifies ArcaneDoor in government IR engagements" },
        { year: 2024, event: "Apr 24: Cisco discloses CVE-2024-20359 + CVE-2024-20353; Line Dancer + Line Runner malware families published", highlight: true },
        { year: 2024, event: "Apr 24: CISA advisory — recommends restricting ASA management interfaces; patches required" },
        { year: 2024, event: "Campaign linked to broader state pattern: similar TTPs seen in Ivanti, FortiGate, Pulse Secure targeting" },
        { year: 2024, event: "CISA and NSA publish joint guidance: 'Hardening Network Devices against Nation-State Targeting'" },
      ],
      keyTakeaways: [
        "Perimeter security devices are high-value nation-state targets — their management interfaces must be restricted and audited",
        "Line Runner demonstrates that 'factory reset' is not always sufficient remediation for advanced implants — audit plugin directories post-incident",
        "In-memory implants like Line Dancer leave minimal forensic artifacts — memory forensics and network packet capture are required for detection",
        "Restrict ASA management to dedicated out-of-band management networks with strict ACLs — the ASA outside interface should never reach the management plane",
      ],
      references: [
        { title: "Cisco Talos — ArcaneDoor Blog", url: "https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/" },
        { title: "Cisco Advisory — CVE-2024-20359", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-rce-FLW9AJFD" },
        { title: "Cisco Advisory — CVE-2024-20353", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-bf-dos-vWbPOSr" },
        { title: "CISA — ArcaneDoor Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-114a" },
      ],
    },
    ctf: {
      scenario: "A government agency's Cisco ASA firewall is running unpatched firmware exposed on the ArcaneDoor campaign. You are part of the incident response team. Analyze the compromised device, identify the Line Dancer implant's C2 channel, and extract the investigation flag.",
      hint: "Read the IR brief, run device diagnostics, identify the implant, and use line-dancer-probe to interact with the C2 channel.",
      hints: [
        "Start: cat ir-brief.txt",
        "Run diagnostics on the device: asa-diag",
        "Check for ASDM plugin anomalies: check-plugins",
        "Probe the Line Dancer C2 channel: line-dancer-probe",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/ir-brief.txt", value: "FLAG{arcane_", label: "IR Brief — ArcaneDoor Campaign" },
        { trigger: "asa-diag", value: "door_", label: "Diagnostics — Implant Artifacts Found" },
        { trigger: "check-plugins", value: "line_runner_", label: "Plugin Analysis — Line Runner Detected" },
        { trigger: "line-dancer-probe", value: "2024}", label: "C2 Channel — Line Dancer Confirmed" },
      ],
      files: {
        "/ir-brief.txt": [
          "INCIDENT RESPONSE: ARCANEDOOR",
          "Target: Cisco ASA 9.16.3 (unpatched for CVE-2024-20353/20359)",
          "Campaign: UAT4356 / STORM-1849 — nation-state",
          "",
          "Indicators:",
          "- Management interface accessible from internet",
          "- Unexpected HTTPS traffic spikes on port 443 (management)",
          "- Device logged 3 unplanned reloads in past 30 days",
          "",
          "Sequence: asa-diag → check-plugins → line-dancer-probe → assemble",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "ir-brief.txt", isDir: false },
        ],
      },
      extraCommands: {
        "asa-diag": (_args: string[]) => ({
          lines: [
            "ASA# show version | include Software",
            "Cisco Adaptive Security Appliance Software Version 9.16.3  [VULNERABLE]",
            "",
            "ASA# show running-config | include http",
            "http server enable 443",
            "http 0.0.0.0 0.0.0.0 outside   ← EXPOSED TO INTERNET",
            "",
            "ASA# show processes | include ld-linux",
            "Mwe  0x00007f8b2c000000  ld-linux-x86-64.so.2  [ANOMALY]",
            "",
            ">> LEARN: Management interface exposed to 0.0.0.0 (internet).",
            "   Anomalous ld-linux process indicates in-memory shellcode (Line Dancer).",
            "   CVE-2024-20353 allows attacker to trigger this via crafted packets.",
          ],
        }),
        "check-plugins": (_args: string[]) => ({
          lines: [
            "ASA# dir disk0:*.zip",
            "  10  -rw-  1024512  Apr 01 2024 03:17:22  asdm-backup.zip",
            "  11  -rw-   218644  Jan 15 2024 11:22:05  asdm-7.22.zip        [KNOWN GOOD]",
            "",
            ">> asdm-backup.zip [SUSPICIOUS]:",
            "   - Created April 1 during a maintenance window gap",
            "   - Not in official ASDM manifest",
            "   - Contains: run.sh, http_handler.lua, persist.sh",
            "",
            ">> LEARN: Line Runner exploits CVE-2024-20359 — malicious ZIP installed as",
            "   ASDM plugin persists across reboots and software upgrades.",
            "   'asdm-backup.zip' is a Line Runner implant artifact.",
          ],
        }),
        "line-dancer-probe": (_args: string[]) => ({
          lines: [
            "Sending probe packet to management interface...",
            "HTTP/1.1 200 OK",
            "X-LD-Session: ACTIVE",
            "X-LD-Version: LineDancer/2.1",
            "X-LD-C2: [ENCRYPTED — nation-state C2 infrastructure]",
            "",
            ">> LEARN: Line Dancer intercepts HTTPS packets with a specific secret header.",
            "   Normal management traffic passes through unaffected.",
            "   The implant provides a covert C2 channel invisible in standard log analysis.",
            "   Requires memory forensics or network packet capture to definitively detect.",
            "",
            "Fragment collected. Run 'assemble' for the full flag.",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Stage m37: CVE-2018-0171 — Cisco Smart Install RCE (GRU Campaign) ───────
  {
    epochId: "cisco-secops",
    wonder: { name: "National Counterintelligence and Security Center", location: "McLean, Virginia, USA", era: "2018 CE", emoji: "🔍" },
    id: "stage-m37",
    order: 37,
    title: "Plug and Pray",
    subtitle: "CVE-2018-0171 — Cisco Smart Install Remote Code Execution, CVSS 9.8 (APT28 / GRU Campaign)",
    category: "cybersecurity",
    cveId: "CVE-2018-0171",
    cvssScore: 9.8,
    xp: 130,
    badge: { id: "badge-m-smart", name: "Network Infiltrator", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "A convenience feature for network engineers became a master key to 250,000 routers worldwide.",
      year: 2018,
      overview: [
        "CVE-2018-0171 is a critical buffer overflow in the Cisco Smart Install (SMI) protocol, a plug-and-play feature that allows new Cisco switches to automatically download their configuration and IOS image from a Smart Install Director on port TCP 4786. The vulnerability allows an unauthenticated remote attacker to execute arbitrary code on any device running the Smart Install Client — which is enabled by default on many Cisco IOS and IOS XE devices.",
        "The vulnerability was disclosed in March 2018. Within months, CISA and the FBI issued a joint alert attributing mass exploitation to Russian state actors — specifically APT28 (GRU Unit 26165, also known as Fancy Bear), who had been using CVE-2018-0171 to compromise routers in the United States, United Kingdom, Germany, and Ukraine. A separate Iranian threat group also exploited the same vulnerability independently.",
        "At peak exposure, security researchers identified over 250,000 devices with TCP port 4786 openly accessible on the internet — a network administrator's convenience feature that had never been designed with external threat models in mind. The attacks compromised routers in critical infrastructure including energy, telecommunications, and government networks.",
      ],
      technical: {
        title: "Smart Install Protocol Buffer Overflow — Unauthenticated RCE on TCP/4786",
        body: [
          "Smart Install uses a proprietary Cisco protocol over TCP port 4786. The protocol was designed for zero-touch provisioning: a new switch powers on, broadcasts for a Smart Install Director, and automatically receives its configuration. There is no authentication — Smart Install assumes all devices on the local network are trusted.",
          "CVE-2018-0171 is a stack-based buffer overflow in the Smart Install message parser. By crafting a malformed Smart Install message and sending it to TCP port 4786, an unauthenticated attacker can overflow a stack buffer on the target device and achieve arbitrary code execution. On a Cisco router, this means full administrative control — equivalent to privilege 15 with OS access.",
          "The attack is completely silent: the malformed packet triggers the overflow before any authentication is checked, leaves no standard log entry, and can modify the running configuration in memory without writing to flash — making forensic detection extremely difficult.",
        ],
        codeExample: {
          label: "CVE-2018-0171 — Smart Install TCP/4786 scan and exploitation",
          code: `# Check if Smart Install Client is running (from the device)
show vstack config

# If active: 'Mode: Client (Enabled)' — VULNERABLE if port 4786 exposed

# From attacker: scan for exposed Smart Install (TCP 4786)
nmap -p 4786 --script cisco-smi <target_range>

# Detect active Smart Install via banner grab
echo "" | nc -w 3 <target_ip> 4786
# Response present = Smart Install active

# Remediation — disable Smart Install:
no vstack

# If Cisco IOS version does not support 'no vstack':
ip access-list extended BLOCK-SMART-INSTALL
  deny tcp any any eq 4786
  permit ip any any

# Verify disabled:
show vstack config | include Mode
# Expected: 'Mode: Disabled'`,
        },
      },
      incident: {
        title: "APT28 / GRU Smart Install Campaign — Critical Infrastructure Router Compromise",
        when: "2016–2018 (discovered and disclosed April 2018); FBI/CISA joint advisory April 2018",
        where: "United States, United Kingdom, Germany, Ukraine — energy, telecom, government, defense sectors",
        impact: "Hundreds of network devices compromised; router configurations stolen; persistent GRU access to SCADA-adjacent infrastructure; CISA Emergency Alert issued",
        body: [
          "The FBI and CISA issued a joint Technical Alert (TA18-106A) in April 2018 attributing Smart Install exploitation to Russian state actors. The advisory noted that the GRU had been using the vulnerability since at least 2016 to compromise Cisco infrastructure routers — many in control system environments adjacent to industrial SCADA networks.",
          "APT28 used compromised routers as both targets and pivoting platforms. Router compromise gave access to all traffic traversing the device, the ability to manipulate routing to redirect traffic, and a persistent presence on networks that typically have weaker endpoint monitoring than servers or workstations. Several compromised devices were ISP infrastructure — a single compromise gave visibility into traffic for hundreds of downstream organizations.",
          "Simultaneously, Iranian threat actors independently discovered and exploited CVE-2018-0171 in targeted attacks against Middle Eastern networks. The coincidence highlighted how a single unpatched network device feature could simultaneously attract multiple nation-state adversaries.",
        ],
      },
      diagram: {
        nodes: [
          { label: "APT28 / GRU", sub: "TCP 4786 scan — unauthenticated", type: "attacker" },
          { label: "Smart Install Client", sub: "buffer overflow — no authentication required", type: "system" },
          { label: "Cisco Router", sub: "arbitrary code execution — full device control", type: "victim" },
          { label: "Infrastructure Access", sub: "routing manipulation, traffic interception, SCADA pivot", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "APT28 begins exploiting CVE-2018-0171 in targeted infrastructure attacks" },
        { year: 2018, event: "Mar: Cisco discloses CVE-2018-0171 and releases patches for IOS/IOS XE" },
        { year: 2018, event: "Apr: FBI/CISA joint alert TA18-106A — attributes Smart Install exploitation to Russian state actors", highlight: true },
        { year: 2018, event: "Apr: Iranian threat actors independently exploit CVE-2018-0171 in Middle East campaign" },
        { year: 2018, event: "250,000+ devices found with port 4786 exposed; CERT-UK, CERT-DE issue parallel warnings" },
        { year: 2019, event: "Smart Install Client disabled by default in IOS XE 16.11.1+" },
      ],
      keyTakeaways: [
        "Zero-touch provisioning features with no authentication are a critical attack surface — disable `vstack` on all non-provisioning devices",
        "TCP port 4786 should never be reachable from untrusted networks; block at perimeter firewalls",
        "Unauthenticated RCE on network infrastructure devices is a Tier-0 threat — treat exposure like a critical server vulnerability",
        "Router compromise enables traffic interception and routing manipulation affecting all connected networks — it is not bounded to the single device",
      ],
      references: [
        { title: "CISA/FBI Alert TA18-106A — Russian State-Sponsored Cyber Actors", url: "https://www.cisa.gov/uscert/ncas/alerts/TA18-106A" },
        { title: "Cisco Advisory — CVE-2018-0171", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20180328-smi2" },
        { title: "NVD — CVE-2018-0171", url: "https://nvd.nist.gov/vuln/detail/CVE-2018-0171" },
      ],
    },
    ctf: {
      scenario: "A Cisco IOS switch at a utility company still has Smart Install Client enabled with port 4786 exposed. CISA has flagged this in a national vulnerability scan. As a red team operator authorized to demonstrate the risk, exploit CVE-2018-0171 to retrieve the device flag.",
      hint: "Read the brief, scan for Smart Install, exploit port 4786, and retrieve the flag from the router filesystem.",
      hints: [
        "Start: cat briefing.txt",
        "Scan the target for Smart Install: smi-scan 192.0.2.1",
        "Exploit the buffer overflow via port 4786: smi-exploit 192.0.2.1",
        "Read the flag from the router: smi-exec 'cat /flash/flag.txt'",
        "Run 'assemble' for the full flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{smart_", label: "Mission Brief — Smart Install Target" },
        { trigger: "smi-scan 192.0.2.1", value: "install_", label: "Scan — TCP/4786 Smart Install Confirmed" },
        { trigger: "smi-exploit 192.0.2.1", value: "rce_", label: "Exploit — Buffer Overflow RCE" },
        { trigger: "smi-exec cat /flash/flag.txt", value: "9_8}", label: "Flag Retrieved — Full Router Access" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: PLUG AND PRAY",
          "Target: Cisco IOS switch — utility company gateway",
          "CVE: 2018-0171  CVSS: 9.8  Protocol: TCP/4786 (Smart Install)",
          "Auth required: NONE",
          "",
          "Sequence: smi-scan 192.0.2.1 → smi-exploit 192.0.2.1 → smi-exec 'cat /flash/flag.txt' → assemble",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "briefing.txt", isDir: false },
        ],
      },
      extraCommands: {
        "smi-scan": (args: string[]) => {
          const target = args[0] ?? "192.0.2.1";
          return {
            lines: [
              `Scanning ${target}:4786 (Smart Install protocol)...`,
              "",
              `TCP ${target}:4786  OPEN`,
              "Smart Install Client: ACTIVE",
              "IOS Version: 15.2(7)E3  [VULNERABLE — unpatched]",
              "Device role: Client (not Director)",
              "",
              ">> LEARN: Smart Install Client has no authentication.",
              "   Any host that can reach port 4786 can send SMI commands.",
              "   This should only ever be accessible from the Smart Install Director.",
              "",
              "Next: smi-exploit 192.0.2.1",
            ],
          };
        },
        "smi-exploit": (args: string[]) => {
          const target = args[0] ?? "192.0.2.1";
          return {
            lines: [
              `Sending crafted Smart Install message to ${target}:4786...`,
              "Triggering CVE-2018-0171 stack buffer overflow...",
              "",
              "Buffer overflow triggered in SMI message parser.",
              "Return address overwritten — RIP controlled.",
              "Shellcode injected — executing as root.",
              "",
              "Router# show privilege",
              "Current privilege level is 15",
              "",
              ">> LEARN: The overflow occurs before any authentication check.",
              "   On Cisco IOS, the SMI process runs with privilege 15.",
              "   GRU (APT28) used this technique against hundreds of routers.",
              "",
              "RCE confirmed. Run: smi-exec 'cat /flash/flag.txt'",
            ],
          };
        },
        "smi-exec": (args: string[]) => {
          const cmd = args.join(" ");
          if (cmd.includes("/flash/flag.txt") || cmd === "cat /flash/flag.txt") {
            return {
              lines: [
                `Executing via Smart Install RCE: ${cmd}`,
                "FLAG{smart_install_rce_9_8}",
                "",
                "Fragment collected. Run 'assemble' for the full flag.",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `Executing via Smart Install RCE: ${cmd}`,
              "[output]",
              "Try: smi-exec 'cat /flash/flag.txt'",
            ],
          };
        },
      },
    },
  },

  // ─── Stage m38: Cisco ISE — Identity Services Engine NAC Security — Quiz ─────
  {
    epochId: "cisco-secops",
    wonder: { name: "Cisco Campus", location: "San Jose, California, USA", era: "2024 CE", emoji: "🔒" },
    id: "stage-m38",
    order: 38,
    title: "Zero Trust Entry",
    subtitle: "Cisco Identity Services Engine (ISE) — 802.1X NAC, Posture Assessment, and RADIUS Security",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "badge-m-ise", name: "Identity Gatekeeper", emoji: "🔒" },
    challengeType: "quiz",
    info: {
      tagline: "Zero Trust starts at the port — every device must prove identity before the network answers.",
      year: 2024,
      overview: [
        "Cisco Identity Services Engine (ISE) is the enforcement layer for zero-trust network access. It implements 802.1X port-based Network Access Control (NAC), authenticating every device and user attempting to connect to the network before granting access. ISE integrates with Active Directory, Cisco DNA Center, and endpoint security tools to make access decisions based on identity, device posture, and context.",
        "Without 802.1X NAC, any device physically plugged into a network switch port gets network access. With ISE enforcing 802.1X, every device must authenticate using machine certificates, user credentials, or a combination — and the device's security posture (patch level, antivirus status, disk encryption) is assessed before the port is opened. Non-compliant devices are quarantined to a remediation VLAN.",
        "RADIUS (Remote Authentication Dial-In User Service) is the protocol ISE uses to communicate with network switches. The ISE-switch RADIUS channel is a critical security boundary: if an attacker can impersonate the RADIUS server or replay RADIUS traffic, they can grant themselves network access — bypassing the entire NAC enforcement layer.",
      ],
      technical: {
        title: "802.1X / RADIUS Architecture and Attack Surface",
        body: [
          "802.1X uses three roles: the Supplicant (device seeking access), the Authenticator (network switch or wireless AP), and the Authentication Server (Cisco ISE). When a device connects to a switch port, the switch starts the 802.1X exchange — the device is placed in an unauthorized state and only EAP (Extensible Authentication Protocol) traffic passes until authentication succeeds.",
          "ISE communicates with switches via RADIUS over UDP. RADIUS uses MD5 for message authentication — a known-weak algorithm. Modern ISE deployments use RADIUS over TLS (RadSec) to eliminate the MD5 weakness and prevent replay attacks. Without RadSec, a network attacker who can intercept RADIUS traffic can attempt offline dictionary attacks against captured RADIUS handshakes.",
          "ISE posture assessment uses the Cisco Secure Client (formerly AnyConnect) agent on endpoints. The agent reports patch compliance, antivirus definition age, disk encryption status, and firewall state to ISE. Based on a posture policy, ISE grants full access, redirects to remediation, or blocks entirely.",
        ],
        codeExample: {
          label: "Cisco ISE — switch 802.1X configuration with RADIUS",
          code: `! Switch config — 802.1X port enforcement with ISE
! Enable RADIUS communication to ISE (use RadSec for production)
radius server ISE-PRIMARY
 address ipv4 10.0.100.10 auth-port 1812 acct-port 1813
 key <shared-secret>  ← use long random key; consider RadSec instead

! Enable 802.1X on access port
interface GigabitEthernet1/0/1
 description User-Access-Port
 switchport mode access
 switchport access vlan 100
 dot1x pae authenticator
 authentication port-control auto    ← require auth before access
 mab                                 ← allow MAC-auth for non-802.1X devices
 authentication event no-response action authorize vlan 999  ← guest VLAN

! Verify: show dot1x interface GigabitEthernet1/0/1 detail
! Expected: Port-Control FORCE-AUTH = NO, Auth SM State = AUTHENTICATED`,
        },
      },
      incident: {
        title: "802.1X Bypass via MAC Address Spoofing — Hospital Network Breach",
        when: "2022 (composite of documented healthcare security incidents)",
        where: "Regional hospital network — clinical access VLAN with EMR system access",
        impact: "Attacker spoofed MAC address of authorized medical device to bypass NAC; accessed Electronic Medical Records on the clinical VLAN; HIPAA breach notification required",
        body: [
          "In a documented 2022 healthcare incident, an attacker gained physical access to a hospital wiring closet and connected a laptop to a port that was configured for MAC Authentication Bypass (MAB) — a fallback mechanism that allows devices incapable of 802.1X to authenticate using their MAC address. The attacker spoofed the MAC address of an authorized medical device (obtained from a discarded network diagram) and gained access to the clinical VLAN containing Electronic Medical Records.",
          "The root cause was a misconfigured authentication policy: the port was set to fall back to MAB when 802.1X authentication was not initiated within 10 seconds. This policy is appropriate for devices like printers and IoT sensors that cannot run 802.1X supplicants, but creates a vulnerability when applied indiscriminately to all ports. The correct design requires 802.1X for all endpoints capable of running a supplicant, with MAB restricted to explicitly managed device lists.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "MAC spoofing — spoofs authorized device MAC", type: "attacker" },
          { label: "Switch 802.1X Port", sub: "MAB fallback — no certificate required", type: "system" },
          { label: "Cisco ISE", sub: "MAC in whitelist → access granted", type: "victim" },
          { label: "Clinical VLAN Access", sub: "EMR system exposed — HIPAA breach", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "802.1X IEEE standard ratified — port-based NAC specification" },
        { year: 2007, event: "Cisco ISE released as the enterprise NAC enforcement platform" },
        { year: 2015, event: "RadSec (RADIUS over TLS) added to ISE — replaces weak MD5 RADIUS authentication" },
        { year: 2022, event: "Healthcare NAC bypass incidents documented; CISA advisory on MAB misconfiguration", highlight: true },
        { year: 2024, event: "Cisco ISE 3.3: enhanced AI-assisted posture policies and zero-trust integration" },
      ],
      keyTakeaways: [
        "802.1X with ISE is the foundational layer of zero-trust network access — every device must authenticate before port access is granted",
        "MAC Authentication Bypass (MAB) must be restricted to explicitly managed device lists — MAC addresses are trivially spoofable",
        "Use RadSec (RADIUS over TLS) instead of standard RADIUS — standard RADIUS uses MD5 which is cryptographically broken",
        "Posture assessment with the Cisco Secure Client agent enforces minimum security requirements (patches, AV, encryption) before full access is granted",
      ],
      references: [
        { title: "Cisco ISE Documentation — 802.1X Configuration Guide", url: "https://www.cisco.com/c/en/us/support/security/identity-services-engine/products-installation-and-configuration-guides-list.html" },
        { title: "RFC 5176 — RADIUS Dynamic Authorization", url: "https://datatracker.ietf.org/doc/html/rfc5176" },
        { title: "NIST SP 800-207 — Zero Trust Architecture", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "m38-q1",
          type: "802.1X Architecture",
          challenge: `  A network engineer connects a laptop to a conference room switch
  port. Without 802.1X, the laptop immediately gets network access.
  With Cisco ISE 802.1X enforced, the switch port behavior changes.`,
          text: "What happens to a switch port configured for 802.1X before authentication is completed?",
          options: [
            "The port is placed in the default VLAN and has full network access",
            "The port is in an unauthorized state — only EAP authentication traffic passes until the device authenticates successfully",
            "The port is administratively shut down until manually re-enabled by an administrator",
            "The port allows all traffic but logs it to ISE for review",
          ],
          correctIndex: 1,
          explanation: "802.1X places switch ports in unauthorized state by default. Only EAP (authentication) traffic flows until the device authenticates via Cisco ISE. Successful authentication moves the port to authorized state in the appropriate VLAN — this is the core of port-based NAC.",
        },
        {
          id: "m38-q2",
          type: "NAC Bypass",
          challenge: `  A hospital uses Cisco ISE with MAC Authentication Bypass (MAB)
  as a fallback for devices that can't run 802.1X supplicants.
  An attacker in a wiring closet finds the MAC address of an
  authorized medical device and spoofs it on their laptop.`,
          text: "Why does this attack succeed, and what is the correct mitigation?",
          options: [
            "MAC addresses are encrypted in 802.1X — the attack should fail",
            "MAB relies on MAC addresses for authentication, and MAC addresses are trivially spoofed. Mitigation: restrict MAB to a static, explicitly managed whitelist; apply to known IoT ports only — not general-access ports",
            "ISE validates the device's IP address against the MAC — spoofing IP would also be required",
            "The attack only works if the attacker has physical access to the ISE server",
          ],
          correctIndex: 1,
          explanation: "MAC addresses are 6-byte values trivially set on any network interface. MAB has no cryptographic verification — it trusts that the MAC is authoritative. The design pattern that limits blast radius: keep MAB only for known IoT/device ports, use separate VLANs for device categories, and enforce strict ingress filtering so spoofed medical device MACs can't reach clinical VLANs from general access ports.",
        },
        {
          id: "m38-q3",
          type: "Protocol Security",
          challenge: `  A network security team reviews their Cisco ISE RADIUS
  configuration. The current setup uses standard RADIUS over UDP
  with a shared secret. A security auditor flags this as a
  cryptographic risk.`,
          text: "What specific weakness does standard RADIUS have, and what should replace it?",
          options: [
            "Standard RADIUS uses RC4 encryption, which can be brute-forced; replace with AES-256",
            "Standard RADIUS uses MD5 for message authentication — MD5 is cryptographically broken. Replace with RadSec (RADIUS over TLS) which uses TLS for mutual authentication and strong encryption",
            "Standard RADIUS requires a certificate on every endpoint — certificate management is the risk",
            "Standard RADIUS only supports PAP passwords — replace with CHAP for stronger authentication",
          ],
          correctIndex: 1,
          explanation: "RADIUS uses HMAC-MD5 for message authentication. MD5 collision attacks are well-documented; in 2024, MD5 is considered cryptographically broken for security purposes. RadSec (RFC 6614 — RADIUS over TLS) replaces MD5 with TLS mutual authentication and encryption, eliminating both the cryptographic weakness and man-in-the-middle RADIUS injection risks.",
        },
        {
          id: "m38-q4",
          type: "Posture Assessment",
          challenge: `  A user's laptop has 802.1X authentication configured with a
  valid machine certificate. ISE authenticates the device
  successfully. However, the Cisco Secure Client agent reports
  the device is missing a critical security patch (60 days old)
  and has no antivirus software installed.`,
          text: "What should Cisco ISE do with this device under a properly configured posture policy?",
          options: [
            "Grant full access — authentication was successful via machine certificate",
            "Quarantine the device to a remediation VLAN where it can only reach patch servers and antivirus distribution — full access denied until posture compliance is achieved",
            "Deny all access and require manual administrator approval",
            "Log the posture failure for review but grant access since authentication succeeded",
          ],
          correctIndex: 1,
          explanation: "Authentication and posture are separate enforcement layers. A valid certificate proves identity; posture compliance proves security hygiene. ISE posture policy enforces minimum requirements — a device 60 days behind on patches with no AV is a compromise risk even with valid credentials. Quarantine to a remediation VLAN allows self-service remediation without blocking other users.",
        },
      ],
    },
  },
];
