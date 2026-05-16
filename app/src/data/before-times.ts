import type { StageConfig, EpochConfig } from "./types";

export const beforeTimesEpoch: EpochConfig = {
  id: "before-times",
  name: "The Before Times",
  subtitle: "Athens → Santa Cruz → Monterey Bay",
  description: "A beginner's journey across the world. Networking is the highway system that gets you from Athens to Santa Cruz. The internet is the surf you ride when you arrive. Security hygiene is what keeps you safe on a fishing trip in Monterey Bay.",
  emoji: "🌊",
  color: "emerald",
  unlocked: true,
};

export const beforeTimesStages: StageConfig[] = [

  // ─── BT-01: What is a Network ────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Port of Piraeus", location: "Athens, Greece", era: "Present Day", emoji: "⚓" },
    id: "bt-01",
    order: 1,
    title: "Leaving Athens",
    subtitle: "Every Journey Needs a Network",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-01", name: "Network Initiate", emoji: "🗺️" },
    challengeType: "ctf",
    info: {
      tagline: "A network is just nodes and paths — the same whether it's roads or cables.",
      year: 2025,
      overview: [
        "You're standing at the Port of Piraeus, the ancient harbor of Athens. Before you can travel anywhere, you need to understand the network of roads, ships, and planes that connect the world. A computer network works exactly the same way: devices (nodes) connected by paths (links), each able to send information to any other.",
        "The ancient Greeks built road networks to move armies and trade goods. We build computer networks to move data. In both cases, the principles are identical: every node needs an address, every path has a direction, and information travels from source to destination by hopping through intermediate points.",
        "Your mission begins here. Read the port map, understand how the network of routes connects Athens to the world, and find your path west — toward Santa Cruz, California.",
      ],
      technical: {
        title: "How Computer Networks Are Built",
        body: [
          "A network is a collection of devices (computers, phones, routers) connected by physical or wireless links. Each device is a node. Data travels as electrical signals over cables, or as radio waves over WiFi. The internet is just a global network of networks — millions of smaller networks all interconnected.",
          "Networks are described by their topology: how nodes are arranged. A star topology has all devices connecting through a central hub. A mesh topology has devices connecting directly to each other. The internet uses a mesh-like topology so there's no single point of failure.",
        ],
        codeExample: {
          label: "Checking your network connections on Linux/Mac",
          code: `# See all network interfaces on your device
ip addr show          # Linux
ifconfig              # Mac/older Linux

# See which devices are on your local network
arp -a

# Trace the path data takes to reach a destination
traceroute google.com`,
        },
      },
      incident: {
        title: "The 2021 Facebook Outage — When a Network Loses Its Map",
        when: "October 4, 2021",
        where: "Global — Facebook, Instagram, WhatsApp",
        impact: "3.5 billion users offline for 6 hours; $60M+ revenue loss",
        body: [
          "On October 4, 2021, Facebook's engineers made a routine configuration change that accidentally removed all the routing information telling the internet how to find Facebook's servers. Every road on their network map was erased simultaneously.",
          "No one could reach Facebook, Instagram, or WhatsApp. Even Facebook's own engineers couldn't log in remotely to fix the problem — they had to physically drive to the data center and manually restore the routing tables. The network still existed; the map of how to traverse it was simply gone.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Device", sub: "the starting node", type: "attacker" },
          { label: "Local Network", sub: "your home/office LAN", type: "system" },
          { label: "The Internet", sub: "global mesh of networks", type: "victim" },
          { label: "Destination Server", sub: "the ending node", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "ARPANET — first 4 nodes connected; the internet's ancestor born" },
        { year: 1983, event: "TCP/IP adopted — all ARPANET nodes switch to the modern protocol" },
        { year: 1991, event: "World Wide Web launched — the internet becomes navigable" },
        { year: 2021, event: "Facebook BGP outage — 3.5B users offline when routing tables wiped", highlight: true },
      ],
      keyTakeaways: [
        "A network is nodes (devices) connected by links (cables/WiFi)",
        "The internet is a network of networks — no single owner",
        "Routing tables are the 'map' — lose the map, lose the network",
        "Every device needs an address to send and receive data",
      ],
      references: [
        { title: "How the Internet Works — Mozilla", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work" },
        { title: "Facebook BGP Outage Analysis — Cloudflare", url: "https://blog.cloudflare.com/october-2021-facebook-outage/" },
      ],
    },
    ctf: {
      scenario: "You're at the Port of Piraeus. A network map of all routes from Athens has been loaded onto the terminal. Study the network, trace the path west, and confirm your route to begin the journey.",
      hint: "Read the map, then trace your route step by step.",
      hints: [
        "Start by reading the port map. Run: cat port-map.txt",
        "List all available routes. Run: list-routes",
        "Trace the route to your destination. Run: trace-route santa-cruz",
        "Confirm your departure. Run: depart",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{N3TW0RK_1S_JUST_N0D3S_AND_P4THS}",
      files: {
        "/port-map.txt": [
          "PORT OF PIRAEUS — NETWORK MAP",
          "==============================",
          "",
          "You are here: Athens, Greece [Node: ATH]",
          "",
          "Direct connections from ATH:",
          "  ATH → ROM  (Rome, Italy)       — sea route",
          "  ATH → IST  (Istanbul, Turkey)  — road route",
          "  ATH → LHR  (London, UK)        — air route",
          "",
          "From LHR you can reach:",
          "  LHR → JFK  (New York, USA)     — transatlantic air",
          "",
          "From JFK you can reach:",
          "  JFK → ORD  (Chicago, USA)      — domestic air",
          "  JFK → LAX  (Los Angeles, USA)  — domestic air",
          "",
          "From ORD you can reach:",
          "  ORD → SJC  (San Jose, USA)     — domestic air",
          "",
          "From SJC you can reach:",
          "  SJC → SC   (Santa Cruz, USA)   — ground route",
          "",
          "Your destination: Santa Cruz, CA [Node: SC]",
          "Use: list-routes | trace-route <destination> | depart",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "port-map.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/port-map.txt", value: "FLAG{N3TW0RK_", label: "Port Map — Network Topology Identified" },
        { trigger: "trace-route santa-cruz", value: "1S_JUST_N0D3S_", label: "Route Trace — 5-Hop Path Confirmed" },
        { trigger: "depart", value: "AND_P4THS}", label: "Departure Confirmed — Journey Begins" },
      ],
      extraCommands: {
        "list-routes": () => ({
          lines: [
            "Available routes from current node [ATH]:",
            "  ATH → LHR → JFK → ORD → SJC → SC",
            "  ATH → ROM → LHR → JFK → LAX → SC  (longer)",
            "",
            "Shortest path: ATH → LHR → JFK → ORD → SJC → SC",
            "Hops: 5  |  Each hop = one network router in the real internet",
          ],
        }),
        "trace-route": (args) => {
          const dest = args[0] || "";
          if (dest === "santa-cruz" || dest === "SC" || dest === "sc") {
            return {
              lines: [
                "Tracing route to Santa Cruz [SC]...",
                "",
                "  Hop 1: ATH → LHR  (London)     ✓  transit node",
                "  Hop 2: LHR → JFK  (New York)   ✓  transit node",
                "  Hop 3: JFK → ORD  (Chicago)    ✓  transit node",
                "  Hop 4: ORD → SJC  (San Jose)   ✓  transit node",
                "  Hop 5: SJC → SC   (Santa Cruz) ✓  DESTINATION",
                "",
                "Route confirmed. 5 hops. Run: depart",
              ],
            };
          }
          return { lines: [`Unknown destination: ${dest}. Try: trace-route santa-cruz`] };
        },
        depart: () => ({
          lines: [
            "Departure confirmed. Route locked in.",
            "",
            "Every hop you just traced is a ROUTER in the real internet.",
            "Data travels the same way — hopping from node to node",
            "until it reaches its destination.",
            "",
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── BT-02: IP Addresses ──────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Athens International Airport", location: "Athens, Greece", era: "Present Day", emoji: "✈️" },
    id: "bt-02",
    order: 2,
    title: "Every Device Needs an Address",
    subtitle: "IP Addresses — The Postal Code of the Internet",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-02", name: "Address Finder", emoji: "📮" },
    challengeType: "ctf",
    info: {
      tagline: "Without an address, no package — or packet — can reach you.",
      year: 2025,
      overview: [
        "Before your flight leaves Athens, you need a boarding pass with your seat number and destination. Without those addresses, the airline has no way to route you to the right plane. IP addresses work identically: every device on the internet is assigned a unique numerical address so that data knows where to go and where to come back from.",
        "An IPv4 address looks like 192.168.1.105 — four numbers (0–255) separated by dots. Every packet of data sent over the internet carries a source IP and a destination IP, just like every envelope carries a from address and a to address. Routers read those addresses and decide which direction to forward the packet.",
        "There are two address spaces: private IPs (used inside your home network, like 192.168.x.x) and public IPs (globally unique, assigned by your ISP). Your home router translates between them using NAT — Network Address Translation.",
      ],
      technical: {
        title: "IPv4 vs IPv6 and How Addresses Are Assigned",
        body: [
          "IPv4 gives us about 4.3 billion unique addresses — not enough for every device on earth. IPv6 expands this to 340 undecillion addresses using 128-bit hex notation (e.g., 2001:0db8:85a3::8a2e:0370:7334). Most networks now run both simultaneously (dual-stack).",
          "Your device gets an IP address from a DHCP server — usually your router. The router itself gets a public IP from your ISP. Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. These never appear on the public internet.",
        ],
        codeExample: {
          label: "Finding your IP addresses",
          code: `# Your private IP (what your router sees)
ip addr show          # Linux — look for 192.168.x.x
ipconfig              # Windows

# Your public IP (what the internet sees)
curl ifconfig.me

# Every device you ping has an IP
ping google.com       # shows Google's IP address`,
        },
      },
      incident: {
        title: "The IPv4 Exhaustion Crisis — When Addresses Ran Out",
        when: "February 3, 2011",
        where: "IANA Global Address Registry",
        impact: "Last IPv4 blocks allocated; ISPs forced to share addresses via CGN",
        body: [
          "On February 3, 2011, IANA (the internet's address authority) handed out the last blocks of IPv4 addresses to the five regional registries. The internet had officially run out of unique IPv4 addresses after 30 years.",
          "ISPs responded with Carrier-Grade NAT — hiding thousands of customers behind a single public IP. This broke peer-to-peer applications and made security logging nearly impossible (you can't tell which customer sent an attack if 5,000 share one IP). The fix — IPv6 — had existed since 1998 but adoption remains slow. As of 2025, only ~45% of traffic is IPv6.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Device", sub: "private IP: 192.168.1.5", type: "attacker" },
          { label: "Your Router", sub: "public IP: 203.0.113.42", type: "system" },
          { label: "Internet Routers", sub: "forward by destination IP", type: "victim" },
          { label: "Destination Server", sub: "IP: 142.250.80.46", type: "result" },
        ],
      },
      timeline: [
        { year: 1981, event: "IPv4 standardized in RFC 791 — 4.3 billion addresses allocated" },
        { year: 1996, event: "IPv6 designed to solve address exhaustion" },
        { year: 2011, event: "IANA exhausts all IPv4 blocks — address space officially full", highlight: true },
        { year: 2025, event: "~45% of internet traffic now uses IPv6" },
      ],
      keyTakeaways: [
        "Every device needs an IP address to communicate on a network",
        "IPv4 = 4 numbers (0–255) separated by dots; ~4.3 billion total",
        "Private IPs (192.168.x.x) stay inside your home; public IPs face the internet",
        "IPv6 solves exhaustion with 128-bit addresses — 340 undecillion available",
      ],
      references: [
        { title: "IPv4 Address Exhaustion — ARIN", url: "https://www.arin.net/resources/guide/ipv4/exhaustion/" },
        { title: "How IP Addresses Work — HowStuffWorks", url: "https://computer.howstuffworks.com/internet/basics/what-is-an-ip-address.htm" },
      ],
    },
    ctf: {
      scenario: "You're at the airport check-in desk. The system needs your boarding pass — destination IP, seat (port), and origin IP — to route you correctly. Inspect the terminal, find the correct IPs, and check in.",
      hint: "Read your itinerary to find the IP addresses, then check in.",
      hints: [
        "Read your travel itinerary. Run: cat itinerary.txt",
        "Look up the destination IP. Run: lookup santacruz",
        "Check your own device's IP. Run: myip",
        "Check in with both addresses. Run: checkin",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{1P_4DDR3SS_R0UT3S_EV3RY_P4CK3T}",
      files: {
        "/itinerary.txt": [
          "TRAVEL ITINERARY — AGENT DEPARTURE",
          "====================================",
          "",
          "Origin:       Athens, Greece",
          "Destination:  Santa Cruz, California",
          "",
          "Network addresses for this journey:",
          "  Your device (origin):      CHECK WITH: myip",
          "  Santa Cruz server (dest):  CHECK WITH: lookup santacruz",
          "",
          "Once you have both addresses, run: checkin",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "itinerary.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/itinerary.txt", value: "FLAG{1P_4DDR3SS_", label: "Itinerary Read — Origin and Destination Found" },
        { trigger: "myip", value: "R0UT3S_EV3RY_", label: "Device IP Confirmed — Source Address Identified" },
        { trigger: "checkin", value: "P4CK3T}", label: "Check-In Complete — IP Routing Mastered" },
      ],
      extraCommands: {
        myip: () => ({
          lines: [
            "Your device's IP address:",
            "  Private IP: 192.168.1.42   (visible inside your local network)",
            "  Public IP:  203.0.113.7    (visible to the internet, via your router)",
            "",
            "Your private IP stays local. Your router's public IP is what",
            "the rest of the internet sees when you send data.",
          ],
        }),
        lookup: (args) => {
          const host = args[0] || "";
          if (host === "santacruz" || host === "santa-cruz") {
            return {
              lines: [
                "DNS lookup: santacruz.destination",
                "  Resolved IP: 198.51.100.23",
                "",
                "This is the public IP of the Santa Cruz server.",
                "Every packet you send will carry this as the destination.",
              ],
            };
          }
          return { lines: [`Unknown host: ${host}. Try: lookup santacruz`] };
        },
        checkin: () => ({
          lines: [
            "Check-in system:",
            "  Origin IP:      203.0.113.7    ✓",
            "  Destination IP: 198.51.100.23  ✓",
            "",
            "Every data packet on the internet carries exactly these",
            "two fields — source IP and destination IP — so routers",
            "know where the packet came from and where it's going.",
            "",
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── BT-03: Packets ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Baggage Claim, JFK Airport", location: "New York, USA", era: "Present Day", emoji: "🧳" },
    id: "bt-03",
    order: 3,
    title: "Packing the Bags",
    subtitle: "How Data Gets Broken Into Packets",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-03", name: "Packet Handler", emoji: "📦" },
    challengeType: "ctf",
    info: {
      tagline: "Nobody ships a house whole — you break it into boxes. The internet does the same with data.",
      year: 2025,
      overview: [
        "You've landed at JFK. Your luggage didn't travel as one giant blob — the airline separated it into individual bags, each tagged with your name, destination, and a sequence number. If one bag gets lost, only that piece needs to be resent. Data on the internet travels exactly the same way: broken into small chunks called packets.",
        "A packet is typically 1,500 bytes (the standard Ethernet MTU). A large file — say, a 10MB photo — gets broken into roughly 6,666 packets. Each packet carries the destination IP, the source IP, a sequence number, and a small piece of the payload. At the destination, the packets are reassembled in order.",
        "This design is genius: if any single packet is lost or corrupted in transit, only that packet needs to be retransmitted. The rest of the file has already arrived safely. This is what makes TCP reliable.",
      ],
      technical: {
        title: "Packet Structure and TCP Reassembly",
        body: [
          "Every packet has a header and a payload. The header contains: source IP, destination IP, protocol (TCP/UDP), sequence number, and checksum. The payload is the actual data — a fragment of your file, a piece of a web page, part of a video stream.",
          "TCP (Transmission Control Protocol) guarantees delivery and order. The receiver sends ACK (acknowledgment) packets back for each one received. If no ACK arrives within a timeout, the sender retransmits that packet. UDP skips the ACK — faster but no guarantee of delivery or order (used for video calls, gaming).",
        ],
        codeExample: {
          label: "Capturing and inspecting packets with tcpdump",
          code: `# Capture 10 packets on any interface
sudo tcpdump -c 10

# Show the packet headers in detail
sudo tcpdump -v -c 5

# Show packets going to/from a specific IP
sudo tcpdump host 8.8.8.8

# Save packets to a file for analysis in Wireshark
sudo tcpdump -w capture.pcap`,
        },
      },
      incident: {
        title: "The Mirai Botnet DDoS — Packet Flooding at Scale",
        when: "October 21, 2016",
        where: "Dyn DNS — Eastern USA",
        impact: "Twitter, Netflix, Reddit, CNN offline for hours",
        body: [
          "The Mirai botnet hijacked 600,000 IoT devices (cameras, DVRs, routers) and directed them all to send a flood of packets to Dyn's DNS servers. At peak, the attack delivered 1.2 terabits per second — hundreds of billions of packets per second overwhelming every server.",
          "The attack exploited the fundamental nature of packets: anyone can send them to any IP. There's no authentication on the packet level. Dyn's servers couldn't distinguish legitimate packets from attack packets, so the connection tables filled up and legitimate traffic was dropped. The lesson: packet volume can be weaponized.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Large File (10MB)", sub: "too big to send whole", type: "attacker" },
          { label: "Packetizer", sub: "splits into ~6,666 packets", type: "system" },
          { label: "Network Transit", sub: "each packet routed independently", type: "victim" },
          { label: "Reassembly", sub: "destination puts them back in order", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "TCP invented by Vint Cerf & Bob Kahn — packet-switched networking formalized" },
        { year: 1983, event: "TCP/IP becomes the standard for ARPANET" },
        { year: 1998, event: "Ethernet MTU standardized at 1,500 bytes per packet" },
        { year: 2016, event: "Mirai DDoS — 1.2 Tbps packet flood takes down major internet services", highlight: true },
      ],
      keyTakeaways: [
        "Data is broken into ~1,500-byte packets for transmission",
        "Each packet carries source IP, destination IP, sequence number, and payload",
        "TCP guarantees delivery and order via ACK acknowledgments",
        "UDP is faster but unreliable — used for real-time audio/video",
      ],
      references: [
        { title: "How Packets Work — Cloudflare Learning", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-packet/" },
        { title: "Mirai Botnet Analysis — Imperva", url: "https://www.imperva.com/learn/ddos/mirai-botnet/" },
      ],
    },
    ctf: {
      scenario: "Your luggage arrived at JFK in fragments — the airline's system scrambled the bag tags. You need to inspect each fragment, find the sequence numbers, reassemble them in order, and retrieve the hidden travel code inside.",
      hint: "Inspect each fragment, sort by sequence number, then reassemble.",
      hints: [
        "List the luggage fragments. Run: ls fragments/",
        "Inspect each fragment. Run: inspect fragment-1 (then 2, 3)",
        "Reassemble in sequence order. Run: reassemble 2 1 3",
        "Try different orderings until the message is coherent.",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{P4CK3TS_R3ASSEMBL3D_1N_S3QU3NC3}",
      files: {
        "/fragments/fragment-1.bag": "SEQ:2 | PAYLOAD: ASSEMBL3D_",
        "/fragments/fragment-2.bag": "SEQ:1 | PAYLOAD: P4CK3TS_R3",
        "/fragments/fragment-3.bag": "SEQ:3 | PAYLOAD: 1N_S3QU3NC3",
      },
      dirs: {
        "/": [{ name: "fragments", isDir: true }],
        "/fragments": [
          { name: "fragment-1.bag", isDir: false },
          { name: "fragment-2.bag", isDir: false },
          { name: "fragment-3.bag", isDir: false },
        ],
      },
      fragments: [
        { trigger: "inspect fragment-2", value: "FLAG{P4CK3TS_", label: "Fragment SEQ:1 — First Payload Recovered" },
        { trigger: "inspect fragment-1", value: "R3ASSEMBL3D_", label: "Fragment SEQ:2 — Second Payload Recovered" },
        { trigger: "reassemble 2 1 3", value: "1N_S3QU3NC3}", label: "Packets Reassembled — Sequence Order Confirmed" },
      ],
      extraCommands: {
        inspect: (args) => {
          const frag = args[0] || "";
          const data: Record<string, string[]> = {
            "fragment-1": ["Fragment: fragment-1.bag", "  Sequence number: 2", "  Payload: ASSEMBL3D_", "  Status: arrived"],
            "fragment-2": ["Fragment: fragment-2.bag", "  Sequence number: 1", "  Payload: P4CK3TS_R3", "  Status: arrived"],
            "fragment-3": ["Fragment: fragment-3.bag", "  Sequence number: 3", "  Payload: 1N_S3QU3NC3", "  Status: arrived"],
          };
          return { lines: data[frag] || [`Unknown fragment: ${frag}`] };
        },
        reassemble: (args) => {
          const order = args.join(" ");
          if (order === "2 1 3" || order === "fragment-2 fragment-1 fragment-3") {
            return {
              lines: [
                "Reassembling in order: seq 1 → seq 2 → seq 3",
                "",
                "  Seq 1: P4CK3TS_R3",
                "  Seq 2: ASSEMBL3D_",
                "  Seq 3: 1N_S3QU3NC3",
                "",
                "Message: P4CK3TS_R3ASSEMBL3D_1N_S3QU3NC3",
                "",
                "Run 'assemble' to view the assembled flag and get the submit command.",
              ],
            };
          }
          return {
            lines: [
              `Reassembling: ${args.map((a, i) => `seq${i + 1}=${a}`).join(", ")}`,
              "Result: garbled — wrong order.",
              "(Hint: check sequence numbers with: inspect fragment-1, inspect fragment-2, inspect fragment-3)",
            ],
          };
        },
      },
    },
  },

  // ─── BT-04: Routers ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "I-80 West, Denver Interchange", location: "Colorado, USA", era: "Present Day", emoji: "🛣️" },
    id: "bt-04",
    order: 4,
    title: "The Highway Interchange",
    subtitle: "Routers — The Traffic Directors of the Internet",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-04", name: "Route Master", emoji: "🔀" },
    challengeType: "ctf",
    info: {
      tagline: "A router's only job is to read the destination and decide: which way next?",
      year: 2025,
      overview: [
        "You're driving west on I-80 through Denver. At every highway interchange, a sign tells you: take this exit for San Francisco, stay on I-80 for Salt Lake City. You make decisions at each junction. A router does exactly this — it reads a packet's destination IP address and decides which interface to forward it out of, based on a routing table.",
        "The internet has no central controller. Millions of routers each make independent forwarding decisions based on their local routing tables. Your packet might hop through 15 different routers between Denver and Santa Cruz, each one reading only the destination IP and sending it one step closer.",
        "Routing tables are built dynamically using protocols like BGP (Border Gateway Protocol) — the protocol that keeps the global internet's routing maps synchronized. When Facebook's BGP routes were accidentally deleted in 2021, every router on the internet forgot how to reach Facebook.",
      ],
      technical: {
        title: "How Routing Tables Work",
        body: [
          "A routing table maps destination IP ranges to outgoing interfaces. When a packet arrives, the router finds the most specific matching route (longest prefix match) and forwards the packet to the next hop. If no specific route matches, the packet goes to the default route (usually 0.0.0.0/0 — 'send it upstream').",
          "Home routers are simple: everything local stays on the LAN, everything else goes to your ISP. Core internet routers at major exchange points have tables with 900,000+ routes and forward millions of packets per second in hardware.",
        ],
        codeExample: {
          label: "Viewing routing tables and tracing packet paths",
          code: `# View your local routing table
route -n          # Linux
netstat -rn       # Mac/Windows

# Trace the actual hops a packet takes
traceroute google.com      # Mac/Linux
tracert google.com         # Windows

# Each line = one router hop, with latency`,
        },
      },
      incident: {
        title: "The 2010 China Telecom BGP Hijack",
        when: "April 8, 2010",
        where: "Global internet traffic",
        impact: "15% of global internet traffic rerouted through China for 18 minutes",
        body: [
          "China Telecom accidentally (or intentionally) announced BGP routes claiming it was the best path to 15% of the internet's IP addresses. Routers worldwide updated their tables and started sending traffic — including US government and military traffic — through China Telecom's network.",
          "For 18 minutes, emails, web requests, and VPN traffic from US senators, the US Army, and major corporations were flowing through Chinese infrastructure. No encryption was broken — but the traffic was readable if unencrypted. This is why BGP security (RPKI) matters: any router can claim any route.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Packet", sub: "destination: 198.51.100.23", type: "attacker" },
          { label: "Router at Denver", sub: "checks routing table", type: "system" },
          { label: "Routing Table", sub: "198.51.100.0/24 → west interface", type: "victim" },
          { label: "Forwarded West", sub: "one hop closer to Santa Cruz", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "First ARPANET router (IMP) deployed at UCLA" },
        { year: 1989, event: "BGP invented — enables routers to share routes across organizations" },
        { year: 2010, event: "China Telecom BGP hijack — 15% of internet rerouted for 18 minutes", highlight: true },
        { year: 2021, event: "Facebook BGP outage — routing tables wiped, 3.5B users offline" },
      ],
      keyTakeaways: [
        "Routers forward packets hop-by-hop based on destination IP",
        "Routing tables map IP ranges to outgoing interfaces",
        "BGP synchronizes routing tables between networks globally",
        "Any router can announce any route — BGP has no built-in authentication",
      ],
      references: [
        { title: "How Routers Work — Cisco", url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/how-does-a-router-work.html" },
        { title: "BGP Hijacking Explained — Cloudflare", url: "https://www.cloudflare.com/learning/security/glossary/bgp-hijacking/" },
      ],
    },
    ctf: {
      scenario: "You're at the Denver interchange. Your GPS (routing table) has been scrambled. You need to read the routing table, find the correct next hop toward Santa Cruz, and set your route before sunset.",
      hint: "Read the routing table and find the correct next hop for your destination.",
      hints: [
        "View your current routing table. Run: show-routes",
        "Look up the route to Santa Cruz. Run: lookup-route 198.51.100.23",
        "Set the correct next hop. Run: set-route west",
        "Confirm and drive. Run: drive",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{R0UT3R_F0RW4RDS_T0_N3XT_H0P}",
      files: {
        "/routing-table.txt": [
          "DENVER INTERCHANGE — ROUTING TABLE",
          "===================================",
          "",
          "Destination          Next Hop        Interface",
          "10.0.0.0/8           192.168.1.1     eth0 (east)",
          "172.16.0.0/12        10.0.0.1        eth1 (north)",
          "198.51.100.0/24      203.0.113.1     eth2 (west)  ← your target range",
          "0.0.0.0/0            203.0.113.1     eth2 (west)  default",
          "",
          "Use: show-routes | lookup-route <ip> | set-route <direction> | drive",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "routing-table.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/routing-table.txt", value: "FLAG{R0UT3R_", label: "Routing Table Read — Denver Interchange Mapped" },
        { trigger: "lookup-route 198.51.100.23", value: "F0RW4RDS_T0_", label: "Route Lookup — Longest Prefix Match Found" },
        { trigger: "drive", value: "N3XT_H0P}", label: "Route Confirmed — Hop-by-Hop Forwarding Understood" },
      ],
      extraCommands: {
        "show-routes": () => ({
          lines: [
            "ROUTING TABLE — Denver Node",
            "===========================",
            "Destination          Next Hop        Interface",
            "10.0.0.0/8           192.168.1.1     eth0 (east)",
            "172.16.0.0/12        10.0.0.1        eth1 (north)",
            "198.51.100.0/24      203.0.113.1     eth2 (west)  ← your target range",
            "0.0.0.0/0            203.0.113.1     eth2 (west)  default",
          ],
        }),
        "lookup-route": (args) => {
          const ip = args[0] || "";
          if (ip.startsWith("198.51.100")) {
            return {
              lines: [
                `Looking up route for: ${ip}`,
                "  Longest prefix match: 198.51.100.0/24",
                "  Next hop: 203.0.113.1",
                "  Interface: eth2 (west)",
                "",
                "Your packet goes WEST. Run: set-route west",
              ],
            };
          }
          return { lines: [`No specific route for ${ip}. Would use default: west`] };
        },
        "set-route": (args) => {
          const dir = args[0] || "";
          if (dir === "west") {
            return { lines: ["Route set: west via eth2. Run: drive"] };
          }
          return { lines: [`Wrong direction: ${dir}. Hint: check lookup-route 198.51.100.23`] };
        },
        drive: () => ({
          lines: [
            "Driving west on I-80...",
            "Next router: Salt Lake City interchange",
            "Next router: Reno interchange",
            "Next router: Sacramento interchange",
            "Arrived: San Jose → Santa Cruz",
            "",
            "Each interchange = one router hop.",
            "The internet works the same way — no single router",
            "knows the full path, just the next hop.",
            "",
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── BT-05: DNS ───────────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "AAA Travel Office", location: "Chicago, USA", era: "Present Day", emoji: "🗺️" },
    id: "bt-05",
    order: 5,
    title: "The Internet's GPS",
    subtitle: "DNS — Translating Names to Addresses",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-05", name: "Name Resolver", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "You type 'google.com'. Your computer has no idea where that is — until it asks DNS.",
      year: 2025,
      overview: [
        "You stop at the AAA travel office in Chicago. You know you want to go to Santa Cruz — but you need the exact address to put in the GPS. DNS (Domain Name System) does this for the internet: you type 'google.com' and DNS silently translates that into an IP address like 142.250.80.46 so your computer knows where to actually send the request.",
        "DNS is a distributed database. There are 13 sets of root name servers worldwide, below them hundreds of top-level domain servers (.com, .org, .net), and below them millions of authoritative servers for individual domains. Your router's DNS resolver queries this hierarchy every time you type a domain name.",
        "DNS responses are cached — your computer remembers the answer for a period defined by the TTL (Time To Live). This keeps DNS fast. But caching also creates risk: if an attacker poisons your DNS cache with a fake answer, you could be sent to a malicious server while thinking you're on the real one.",
      ],
      technical: {
        title: "The DNS Resolution Process",
        body: [
          "When you type google.com: (1) Your OS checks its local cache. (2) If not cached, it asks your DNS resolver (usually your router or ISP). (3) The resolver asks a root name server for .com. (4) The root refers it to Verisign's .com servers. (5) Verisign refers it to Google's authoritative server. (6) Google's server returns 142.250.80.46. (7) Your OS caches it and connects.",
          "This full lookup takes 50–200ms. Cached lookups take <1ms. The resolver your device uses is set in network settings — you can change it to any public resolver: 1.1.1.1 (Cloudflare), 8.8.8.8 (Google), or 9.9.9.9 (Quad9). Using an encrypted resolver (DNS-over-HTTPS) prevents your ISP from seeing what sites you're looking up.",
        ],
        codeExample: {
          label: "Querying DNS from the command line",
          code: `# Basic DNS lookup
nslookup google.com

# Detailed DNS query with dig
dig google.com
dig google.com MX        # mail records
dig google.com TXT       # text records (SPF, DKIM)

# Query a specific DNS server
dig @8.8.8.8 google.com  # ask Google's resolver

# Check what DNS server you're using
cat /etc/resolv.conf     # Linux/Mac`,
        },
      },
      incident: {
        title: "The 2016 Dyn DNS Attack — Taking Down the Internet's GPS",
        when: "October 21, 2016",
        where: "Dyn DNS, Manchester NH",
        impact: "Twitter, GitHub, Netflix, Spotify, Reddit unreachable across the US East Coast",
        body: [
          "Dyn is one of the largest DNS providers — it answers 'where is Twitter.com?' for millions of queries per second. The Mirai botnet targeted Dyn directly with a massive DDoS attack. When Dyn's servers went down, millions of users' DNS queries got no answer, so browsers couldn't find Twitter even though Twitter's servers were running fine.",
          "The lesson: DNS is as critical as the servers themselves. Websites use multiple DNS providers now for redundancy. If DNS fails, it doesn't matter that your server is up — nobody can find it. DNS is the GPS of the internet. Turn off the GPS and everyone gets lost.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You type google.com", sub: "browser has no IP yet", type: "attacker" },
          { label: "DNS Resolver", sub: "asks the hierarchy", type: "system" },
          { label: "Authoritative DNS", sub: "google.com = 142.250.80.46", type: "victim" },
          { label: "IP Address Returned", sub: "browser connects to server", type: "result" },
        ],
      },
      timeline: [
        { year: 1983, event: "DNS invented by Paul Mockapetris — replaces the hosts.txt file" },
        { year: 1987, event: "DNS formalized in RFC 1034/1035 — still the standard today" },
        { year: 2008, event: "Kaminsky DNS Cache Poisoning vulnerability discovered — critical flaw patched" },
        { year: 2016, event: "Dyn DNS DDoS attack — major sites unreachable for hours", highlight: true },
      ],
      keyTakeaways: [
        "DNS translates human-readable names (google.com) into IP addresses",
        "Resolution walks a hierarchy: root → TLD → authoritative server",
        "Responses are cached for TTL seconds to avoid repeated lookups",
        "DNS is critical infrastructure — attack DNS and you attack the entire internet",
      ],
      references: [
        { title: "How DNS Works — Cloudflare", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
        { title: "Dyn DDoS Attack — Dyn Blog", url: "https://dyn.com/blog/dyn-analysis-summary-of-friday-october-21-attack/" },
      ],
    },
    ctf: {
      scenario: "Your GPS won't start without the correct coordinates for Santa Cruz. The DNS oracle at the travel office can translate the name to an address — but you need to query it correctly and verify the result isn't a forgery.",
      hint: "Query the DNS oracle for the Santa Cruz server, then verify the response is legitimate.",
      hints: [
        "Query the DNS oracle. Run: dns-lookup santacruz.ca",
        "Check if the response is cached or fresh. Run: check-ttl santacruz.ca",
        "Verify the response against the authoritative server. Run: verify-dns santacruz.ca",
        "Accept the verified address. Run: accept-route 198.51.100.23",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{DNS_TR4NSL4T3S_N4M3S_T0_1PS}",
      files: {
        "/dns-cache.txt": [
          "LOCAL DNS CACHE — Travel Office Terminal",
          "=========================================",
          "",
          "Cached entries:",
          "  santacruz.ca    → 198.51.100.23  TTL: 300s  (fresh)",
          "  chicago.hub     → 10.0.0.1       TTL: 60s   (expiring)",
          "  aaa-office.local → 192.168.5.1   TTL: 86400s (permanent)",
          "",
          "Use: dns-lookup <host> | check-ttl <host> | verify-dns <host>",
          "Then: accept-route <ip> once verified.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "dns-cache.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/dns-cache.txt", value: "FLAG{DNS_TR4NSL4T3S_", label: "DNS Cache Read — Cached Records Inspected" },
        { trigger: "verify-dns santacruz.ca", value: "N4M3S_T0_", label: "DNS Verified — Response Not Poisoned" },
        { trigger: "accept-route 198.51.100.23", value: "1PS}", label: "Route Accepted — GPS Locked to Destination" },
      ],
      extraCommands: {
        "dns-lookup": (args) => {
          const host = args[0] || "";
          if (host.includes("santacruz") || host.includes("santa")) {
            return {
              lines: [
                `Querying DNS for: ${host}`,
                "  Checking local cache... miss",
                "  Querying resolver: 1.1.1.1",
                "  Querying root servers...",
                "  Querying .ca TLD servers...",
                "  Querying authoritative server for santacruz.ca...",
                "",
                "  ANSWER: santacruz.ca → 198.51.100.23",
                "  TTL: 300 seconds",
                "",
                "Run: verify-dns santacruz.ca to confirm this isn't spoofed.",
              ],
            };
          }
          return { lines: [`DNS lookup: ${host} → NXDOMAIN (not found)`] };
        },
        "check-ttl": (args) => ({
          lines: [
            `TTL for ${args[0] || "unknown"}: 300 seconds (5 minutes)`,
            "Response is fresh — not a stale cached entry.",
          ],
        }),
        "verify-dns": (args) => {
          const host = args[0] || "";
          if (host.includes("santacruz")) {
            return {
              lines: [
                "Verifying DNS response against authoritative server...",
                "  Authoritative NS: ns1.santacruz.ca",
                "  Response from auth server: 198.51.100.23",
                "  Cached response:           198.51.100.23",
                "  MATCH — response is legitimate. Not poisoned.",
              ],
            };
          }
          return { lines: ["Verification failed — unknown host."] };
        },
        "accept-route": (args) => {
          if (args[0] === "198.51.100.23") {
            return {
              lines: [
                "Route accepted: Santa Cruz = 198.51.100.23",
                "GPS locked. You know where you're going.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`Wrong IP: ${args[0]}. Run: dns-lookup santacruz.ca first.`] };
        },
      },
    },
  },

  // ─── BT-06: MAC Addresses ─────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "US Customs & Border Protection", location: "Los Angeles, USA", era: "Present Day", emoji: "🛂" },
    id: "bt-06",
    order: 6,
    title: "Your Hardware Passport",
    subtitle: "MAC Addresses — The Identity Burned Into Every Device",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-06", name: "Device Identifier", emoji: "🪪" },
    challengeType: "ctf",
    info: {
      tagline: "Every network card ships from the factory with a unique serial number. That's its MAC address.",
      year: 2025,
      overview: [
        "At LAX customs, the agent scans your passport. Your passport number is globally unique — no two people share it, and it's linked to you permanently. Every network interface card (WiFi chip, Ethernet port) ships from its manufacturer with a MAC address: a 48-bit hardware identifier burned into the chip at the factory.",
        "MAC addresses look like this: 00:1A:2B:3C:4D:5E. The first three bytes (00:1A:2B) identify the manufacturer — this is called the OUI (Organizationally Unique Identifier). The last three bytes are the device serial. IEEE assigns OUI blocks to manufacturers: Apple, Intel, Cisco, etc.",
        "While IP addresses operate at layer 3 (routing across the internet), MAC addresses operate at layer 2 (within your local network). Your router uses MAC addresses to identify which device on the LAN is which. When a device leaves the local network, its MAC address never appears — only the IP.",
      ],
      technical: {
        title: "MAC Address Structure and ARP",
        body: [
          "When your device wants to send data to another device on the same local network, it uses ARP (Address Resolution Protocol) to find that device's MAC address. ARP broadcasts 'Who has IP 192.168.1.1?' and the router replies 'That's me — my MAC is 00:1A:2B:3C:4D:5E'. Your device caches this in its ARP table.",
          "Modern operating systems support MAC address randomization — each time you connect to a new WiFi network, your device uses a randomly generated MAC instead of its permanent one. This prevents retail stores and access points from tracking your device across locations using your MAC address.",
        ],
        codeExample: {
          label: "Finding and working with MAC addresses",
          code: `# View your MAC address (Linux)
ip link show
# Look for "link/ether xx:xx:xx:xx:xx:xx"

# View ARP cache (devices on your local network)
arp -a

# Look up manufacturer from MAC OUI
curl https://api.macvendors.com/00:1A:2B

# MAC address format: OO:OO:OO:SS:SS:SS
# First 3 bytes (OUI) = manufacturer
# Last 3 bytes = device serial`,
        },
      },
      incident: {
        title: "ARP Spoofing — Impersonating Devices on a Local Network",
        when: "Ongoing attack technique",
        where: "Any local network (coffee shops, hotels, offices)",
        impact: "Attacker intercepts all traffic between victim and router",
        body: [
          "ARP has no authentication. An attacker on the same WiFi network can broadcast fake ARP replies: 'The router's IP is mine — send all traffic to my MAC address.' Every device on the network updates its ARP cache with the lie. The attacker becomes a man-in-the-middle, reading and modifying all unencrypted traffic.",
          "ARP spoofing is the reason you should never use unencrypted HTTP on public WiFi. The attacker doesn't need to crack any passwords — they just poison ARP and read your traffic as it flows through their machine. HTTPS prevents this because even with the traffic intercepted, they can't decrypt it without the certificate's private key.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Network Card", sub: "MAC burned in at factory", type: "attacker" },
          { label: "Local Network", sub: "layer 2 — MAC addressing", type: "system" },
          { label: "ARP Protocol", sub: "IP → MAC resolution", type: "victim" },
          { label: "Data Delivered", sub: "to the correct hardware", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "Ethernet invented at Xerox PARC — MAC addresses introduced" },
        { year: 1982, event: "IEEE standardizes MAC address format (48-bit, OUI structure)" },
        { year: 1985, event: "ARP (RFC 826) standardized — no authentication ever added" },
        { year: 2014, event: "iOS 8 introduces MAC randomization — tracking prevention begins", highlight: true },
      ],
      keyTakeaways: [
        "MAC addresses are 48-bit hardware identifiers burned into network cards at manufacture",
        "First 3 bytes = manufacturer OUI; last 3 bytes = device serial",
        "MAC operates at layer 2 (local network); IP operates at layer 3 (global internet)",
        "ARP has no authentication — ARP spoofing is a real and easy local network attack",
      ],
      references: [
        { title: "MAC Address Explained — Cisco", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html" },
        { title: "ARP Spoofing — OWASP", url: "https://owasp.org/www-community/attacks/ARP_spoofing" },
      ],
    },
    ctf: {
      scenario: "Customs has flagged an unknown device on the airport's secure network. You need to scan the local network, identify each device's MAC address, match the unknown device to its manufacturer, and flag the unauthorized hardware.",
      hint: "Scan the network, inspect MAC addresses, and identify the unauthorized device.",
      hints: [
        "Scan devices on the local network. Run: arp-scan",
        "Look up the manufacturer of each MAC. Run: oui-lookup 00:1A:2B",
        "Find the device that doesn't belong. Run: flag-device <mac>",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{MAC_4DDR3SS_1D3NT1F13S_H4RDW4R3}",
      files: {
        "/device-registry.txt": [
          "AIRPORT SECURE NETWORK — DEVICE REGISTRY",
          "==========================================",
          "",
          "Authorized devices:",
          "  00:1A:2B:AA:BB:CC   router.local         (Cisco Systems)",
          "  F8:FF:C2:11:22:33   agent-laptop         (Apple, Inc.)",
          "  DC:A6:32:44:55:66   customs-terminal     (Raspberry Pi Trading)",
          "",
          "Unknown devices flagged for review:",
          "  B8:27:EB:DE:AD:BE   ??? NOT IN REGISTRY ???",
          "",
          "Use: arp-scan | oui-lookup <oui> | flag-device <mac>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "device-registry.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/device-registry.txt", value: "FLAG{MAC_4DDR3SS_", label: "Device Registry Read — Authorized Devices Listed" },
        { trigger: "arp-scan", value: "1D3NT1F13S_", label: "ARP Scan Complete — Unknown Device Detected" },
        { trigger: "flag-device b8:27:eb:de:ad:be", value: "H4RDW4R3}", label: "Unauthorized Device Flagged — Hardware ID Confirmed" },
      ],
      extraCommands: {
        "arp-scan": () => ({
          lines: [
            "ARP Scan — Local Network (192.168.50.0/24)",
            "===========================================",
            "IP Address        MAC Address         Hostname",
            "192.168.50.1      00:1A:2B:AA:BB:CC   router.local",
            "192.168.50.10     F8:FF:C2:11:22:33   agent-laptop",
            "192.168.50.42     DC:A6:32:44:55:66   customs-terminal",
            "192.168.50.99     B8:27:EB:DE:AD:BE   ??? UNKNOWN DEVICE ???",
            "",
            "Run: oui-lookup <first-3-bytes> to identify manufacturers",
          ],
        }),
        "oui-lookup": (args) => {
          const oui = (args[0] || "").toUpperCase().replace(/-/g, ":");
          const db: Record<string, string> = {
            "00:1A:2B": "Cisco Systems, Inc.",
            "F8:FF:C2": "Apple, Inc.",
            "DC:A6:32": "Raspberry Pi Trading Ltd",
            "B8:27:EB": "Raspberry Pi Foundation — but this device is NOT registered on this network",
          };
          return { lines: [`OUI ${oui}: ${db[oui] || "Unknown manufacturer"}`] };
        },
        "flag-device": (args) => {
          const mac = (args[0] || "").toLowerCase();
          if (mac.includes("b8:27") || mac.includes("de:ad:be") || mac === "192.168.50.99") {
            return {
              lines: [
                "Device flagged: B8:27:EB:DE:AD:BE",
                "Manufacturer: Raspberry Pi Foundation",
                "Status: NOT AUTHORIZED — not in device registry",
                "Action: Device isolated from network.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`Device ${args[0]} is authorized. The unknown device has MAC B8:27:EB:DE:AD:BE`] };
        },
      },
    },
  },

  // ─── BT-07: Firewalls ─────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "City Limits — Santa Cruz", location: "Santa Cruz, USA", era: "Present Day", emoji: "🚧" },
    id: "bt-07",
    order: 7,
    title: "The City Checkpoint",
    subtitle: "Firewalls — What Gets In and What Stays Out",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-07", name: "Gate Keeper", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "A firewall is just a bouncer: it reads your ID and decides — allowed or denied.",
      year: 2025,
      overview: [
        "You've almost reached Santa Cruz. At the city limits there's a checkpoint: commercial trucks take the Highway 17 bypass, tourists go through downtown, and unauthorized vehicles get turned around. A firewall works identically: it inspects each packet's source IP, destination IP, port, and protocol, then applies a ruleset — allow or deny.",
        "Firewalls sit between your network and the internet (or between network segments within an organization). Every packet attempting to cross the boundary is evaluated against the rules in order. The first rule that matches wins. Most firewalls end with a default-deny rule: anything not explicitly permitted is blocked.",
        "Modern 'next-generation' firewalls (NGFWs) go deeper — they can inspect packet contents, identify applications, detect malware signatures, and block based on domain reputation. But the core concept is always the same: rules-based packet filtering.",
      ],
      technical: {
        title: "Firewall Rule Structure and Types",
        body: [
          "A firewall rule specifies: source IP (or range), destination IP (or range), protocol (TCP/UDP/ICMP), port (or range), and action (allow/deny/log). Rules are evaluated top-to-bottom; first match wins. This means rule order matters — a broad allow rule above a narrow deny rule will never let the deny fire.",
          "Types: packet-filtering firewalls (stateless — each packet evaluated independently), stateful firewalls (track connection state — only allow return traffic for established sessions), and application-layer firewalls (deep packet inspection, can read HTTP/HTTPS content). Your home router runs a stateful firewall by default.",
        ],
        codeExample: {
          label: "Basic firewall rules with iptables (Linux)",
          code: `# View current rules
sudo iptables -L -v

# Allow established connections (return traffic)
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH from specific IP only
sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT

# Block all other inbound traffic
sudo iptables -A INPUT -j DROP

# Allow all outbound traffic
sudo iptables -A OUTPUT -j ACCEPT`,
        },
      },
      incident: {
        title: "The 2003 Slammer Worm — What Happens Without a Firewall",
        when: "January 25, 2003",
        where: "Worldwide — SQL Server systems",
        impact: "75,000 servers infected in 10 minutes; Bank of America ATMs offline",
        body: [
          "The SQL Slammer worm spread through port 1434 (SQL Server Resolution Protocol). It fit entirely in a single 376-byte UDP packet and needed no user interaction — just an open port. In 10 minutes it infected 75,000 servers worldwide. South Korea lost internet access. Bank of America's 13,000 ATMs went offline.",
          "The fix was simple: block UDP port 1434 at the firewall. Organizations that had proper firewall rules in place were completely unaffected. Those that didn't — or that had internal servers exposed directly — were compromised within minutes of the worm spreading to their network segment.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Incoming Packet", sub: "src IP, dst IP, port, protocol", type: "attacker" },
          { label: "Firewall Ruleset", sub: "rules evaluated top-to-bottom", type: "system" },
          { label: "First Match Wins", sub: "ALLOW or DENY", type: "victim" },
          { label: "Packet Forwarded", sub: "or silently dropped", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "First firewall concept described after Morris Worm infects ARPANET" },
        { year: 1992, event: "First commercial firewall (DEC SEAL) shipped" },
        { year: 2003, event: "SQL Slammer — unpatched + no firewall = 75K servers in 10 minutes", highlight: true },
        { year: 2010, event: "Next-gen firewalls (NGFW) with deep packet inspection become standard" },
      ],
      keyTakeaways: [
        "Firewalls filter packets based on IP, port, protocol, and direction",
        "Rules are evaluated top-to-bottom — first match wins",
        "Default-deny is the gold standard: block everything not explicitly allowed",
        "Stateful firewalls track connections — return traffic is allowed automatically",
      ],
      references: [
        { title: "Firewalls Explained — Cloudflare", url: "https://www.cloudflare.com/learning/security/what-is-a-firewall/" },
        { title: "SQL Slammer Worm — CAIDA Analysis", url: "https://www.caida.org/publications/papers/2003/sapphire/" },
      ],
    },
    ctf: {
      scenario: "You've arrived at the Santa Cruz city limits checkpoint. The firewall ruleset is misconfigured — it's blocking legitimate traffic and allowing unauthorized connections. Fix the rules and prove you understand firewall logic.",
      hint: "Read the current rules, identify the problems, and apply the correct fixes.",
      hints: [
        "View the current firewall rules. Run: show-rules",
        "Test which traffic is currently blocked. Run: test-traffic",
        "Fix the misconfigured rules. Run: fix-rule <rule-number>",
        "Verify the firewall is correctly configured. Run: verify",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{F1R3W4LL_RUL3S_PR0T3CT_TH3_N3TW0RK}",
      files: {
        "/firewall-rules.txt": [
          "SANTA CRUZ CHECKPOINT — FIREWALL RULESET",
          "==========================================",
          "",
          "Rule 1: ALLOW  src=ANY          dst=ANY       port=ANY  ← MISCONFIGURED",
          "Rule 2: DENY   src=ANY          dst=10.0.0.5  port=22   (SSH block — never fires)",
          "Rule 3: ALLOW  src=10.0.0.0/24  dst=ANY      port=443  (HTTPS — correct)",
          "Rule 4: DENY   src=ANY          dst=ANY       port=ANY  (default deny — never reached)",
          "",
          "Problem: Rule 1 is too broad. Fix it with: fix-rule 1",
          "Then verify with: verify",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "firewall-rules.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/firewall-rules.txt", value: "FLAG{F1R3W4LL_", label: "Firewall Rules Read — Misconfiguration Identified" },
        { trigger: "test-traffic", value: "RUL3S_PR0T3CT_", label: "Traffic Tested — Attack Surface Measured" },
        { trigger: "verify", value: "TH3_N3TW0RK}", label: "Firewall Verified — Checkpoint Secured" },
      ],
      extraCommands: {
        "show-rules": () => ({
          lines: [
            "Current Firewall Ruleset:",
            "========================",
            "Rule 1: ALLOW  src=ANY       dst=ANY       port=ANY  ← PROBLEM: allows everything",
            "Rule 2: DENY   src=ANY       dst=10.0.0.5  port=22   (SSH to server — unreachable due to Rule 1)",
            "Rule 3: ALLOW  src=10.0.0.0/24  dst=ANY   port=443  (HTTPS — correct)",
            "Rule 4: DENY   src=ANY       dst=ANY       port=ANY  (default deny — never reached)",
            "",
            "Problem: Rule 1 is too broad — it allows all traffic before any deny rules can fire.",
            "Fix Rule 1 to only allow established connections.",
            "Run: fix-rule 1",
          ],
        }),
        "test-traffic": () => ({
          lines: [
            "Testing traffic against current ruleset:",
            "  Attack from 1.2.3.4 → port 3389 (RDP):  ALLOWED  ← should be DENIED",
            "  Agent SSH → 10.0.0.5 port 22:            ALLOWED  (but wrong — Rule 2 never fires)",
            "  HTTPS browsing port 443:                 ALLOWED  ✓",
            "  Inbound port scan from internet:         ALLOWED  ← should be DENIED",
          ],
        }),
        "fix-rule": (args) => {
          if (args[0] === "1") {
            return {
              lines: [
                "Rule 1 updated:",
                "  BEFORE: ALLOW src=ANY dst=ANY port=ANY",
                "  AFTER:  ALLOW src=ANY dst=ANY state=ESTABLISHED,RELATED",
                "",
                "Now only return traffic for existing connections is allowed inbound.",
                "New traffic from the internet must match a specific ALLOW rule or hit the default DENY.",
                "Run: verify",
              ],
            };
          }
          return { lines: [`No issue with Rule ${args[0]}. Fix Rule 1 first.`] };
        },
        verify: () => ({
          lines: [
            "Verifying firewall configuration:",
            "  Attack from 1.2.3.4 → port 3389:  DENIED  ✓",
            "  Inbound port scan:                 DENIED  ✓",
            "  HTTPS browsing (established):      ALLOWED ✓",
            "  SSH to 10.0.0.5 from internet:     DENIED  ✓",
            "",
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── BT-08: Ports ─────────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Santa Cruz Harbor", location: "Santa Cruz, USA", era: "Present Day", emoji: "⛵" },
    id: "bt-08",
    order: 8,
    title: "The Harbor Gates",
    subtitle: "Ports — Different Doors for Different Services",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-08", name: "Port Scanner", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "Ports are like gates at a harbor — each vessel docks at a designated slip.",
      year: 2025,
      overview: [
        "You've arrived at Santa Cruz Harbor. Every slip has a number: slip 22 is for sailboats, slip 80 is for fishing vessels, slip 443 is for the ferry. You don't just arrive at 'the harbor' — you dock at a specific slip. Network ports work the same way: a server running multiple services assigns each to a different port number so data goes to the right service.",
        "Port numbers range from 0 to 65535. The well-known ports (0–1023) are standardized: port 22 (SSH), port 80 (HTTP), port 443 (HTTPS), port 25 (SMTP email), port 53 (DNS), port 3306 (MySQL). A packet arriving at a server includes both a destination IP and a destination port — together they tell the OS which application should receive the data.",
        "Port scanning is the technique of probing a server to discover which ports have services listening. It's a fundamental recon step in both legitimate network administration and in attacks. Understanding which ports are open — and which services those ports run — is essential to understanding your attack surface.",
      ],
      technical: {
        title: "TCP vs UDP Ports and Common Port Numbers",
        body: [
          "Both TCP and UDP use port numbers. A server 'listens' on a port by calling bind() and listen() in code. Your OS accepts connections and passes them to the correct application process. Running 'netstat -tlnp' on Linux shows every port that's currently listening and which process owns it.",
          "Common ports to memorize: 21 (FTP), 22 (SSH), 23 (Telnet — unencrypted, obsolete), 25 (SMTP), 53 (DNS), 80 (HTTP), 110 (POP3), 143 (IMAP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis), 27017 (MongoDB). Attackers scan for these to find exposed databases and services.",
        ],
        codeExample: {
          label: "Port scanning and checking open ports",
          code: `# Scan a host for open ports (nmap)
nmap 192.168.1.1             # basic scan
nmap -p 1-1024 192.168.1.1  # scan first 1024 ports
nmap -sV 192.168.1.1        # detect service versions

# Check what's listening on your machine
netstat -tlnp    # Linux
netstat -an      # Mac/Windows

# Test if a specific port is open
nc -zv 192.168.1.1 22    # test port 22 (SSH)`,
        },
      },
      incident: {
        title: "The 2017 WannaCry Ransomware — Port 445 Left Open",
        when: "May 12, 2017",
        where: "Worldwide — 200,000 computers in 150 countries",
        impact: "NHS UK paralyzed; $4B+ in damages",
        body: [
          "WannaCry exploited EternalBlue, an NSA-developed vulnerability in Microsoft's SMB protocol (port 445). Any Windows machine with port 445 exposed to the internet and unpatched was vulnerable. WannaCry spread automatically — no user action needed — by scanning for open port 445 and exploiting the vulnerability.",
          "The UK's National Health Service was devastated: hospitals cancelled 19,000 appointments, ambulances were diverted, and MRI machines went offline. The fix? Block port 445 at the network perimeter (something that should have been done years earlier) and apply the MS17-010 patch. Firewall rules on a single port would have stopped the entire outbreak.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Incoming Packet", sub: "destination: 10.0.0.5:443", type: "attacker" },
          { label: "OS Network Stack", sub: "reads destination port", type: "system" },
          { label: "Port 443 Listener", sub: "HTTPS web server process", type: "victim" },
          { label: "Web Server App", sub: "handles the HTTPS request", type: "result" },
        ],
      },
      timeline: [
        { year: 1981, event: "TCP port numbers standardized in RFC 793" },
        { year: 1988, event: "IANA assigned as authority for well-known port numbers (0–1023)" },
        { year: 2017, event: "WannaCry exploits open port 445 — 200K machines in 150 countries", highlight: true },
        { year: 2017, event: "EternalBlue patch (MS17-010) released by Microsoft — most orgs hadn't applied it" },
      ],
      keyTakeaways: [
        "Ports 0–65535 route traffic to specific services on a server",
        "Well-known ports (0–1023) are standardized: 22=SSH, 80=HTTP, 443=HTTPS",
        "Port scanning reveals which services are exposed — attackers use this for recon",
        "Closing unnecessary open ports is a fundamental security hardening step",
      ],
      references: [
        { title: "Port Numbers Explained — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/" },
        { title: "WannaCry Ransomware Attack — NCSC", url: "https://www.ncsc.gov.uk/news/joint-technical-advisory-wannacry-ransomware-attack" },
      ],
    },
    ctf: {
      scenario: "Someone left several harbor slips open that should be closed. Scan the Santa Cruz Harbor server, identify all open ports, find the one with the hidden flag service, and connect to retrieve it.",
      hint: "Scan all ports, then connect to the interesting one.",
      hints: [
        "Scan the harbor server for open ports. Run: port-scan harbor-server",
        "Connect to the web port. Run: connect 80",
        "Connect to the SSH port. Run: connect 22",
        "Connect to the unusual port. Run: connect 8888",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{P0RTS_AR3_D00RS_T0_S3RV1C3S}",
      files: {
        "/port-list.txt": [
          "SANTA CRUZ HARBOR — KNOWN SERVICE SLIPS",
          "=========================================",
          "",
          "Standard slips (well-known ports):",
          "  Slip 22   — SSH   (secure shell access)",
          "  Slip 80   — HTTP  (web traffic)",
          "  Slip 443  — HTTPS (encrypted web)",
          "  Slip 3306 — MySQL (database — should be internal only!)",
          "",
          "Non-standard slips:",
          "  Slip 8888 — ??? (unknown service — investigate)",
          "",
          "Use: port-scan <host> to enumerate open slips.",
          "Then: connect <port> to interact with each service.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "port-list.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/port-list.txt", value: "FLAG{P0RTS_AR3_", label: "Port List Read — Harbor Slip Map Reviewed" },
        { trigger: "port-scan harbor-server", value: "D00RS_T0_", label: "Port Scan Complete — Open Services Enumerated" },
        { trigger: "connect 8888", value: "S3RV1C3S}", label: "Hidden Service Found — Port 8888 Unlocked" },
      ],
      extraCommands: {
        "port-scan": (args) => {
          const host = args[0] || "target";
          return {
            lines: [
              `Scanning ${host} for open ports...`,
              "",
              "PORT      STATE   SERVICE",
              "22/tcp    open    ssh",
              "80/tcp    open    http",
              "443/tcp   closed",
              "3306/tcp  open    mysql  ← database exposed to network!",
              "8888/tcp  open    ???    ← unusual port, unknown service",
              "",
              "Run: connect <port> to interact with each service",
            ],
          };
        },
        connect: (args) => {
          const port = parseInt(args[0] || "0");
          const responses: Record<number, string[]> = {
            22: ["SSH-2.0-OpenSSH_8.9", "Connection established. (No credentials to proceed further.)"],
            80: ["HTTP/1.1 200 OK", "Content: Santa Cruz Harbor homepage. Nothing unusual here."],
            3306: ["ERROR 1130: Host not allowed to connect to MySQL", "⚠ But this port should NOT be open to the network — database ports should be internal only."],
            8888: [
              "Connected to port 8888.",
              "",
              "HARBOR FLAG SERVICE",
              "====================",
              "Welcome, agent. You found the hidden service.",
              "",
              "Run 'assemble' to retrieve your fragment.",
            ],
          };
          const resp = responses[port];
          if (resp) {
            return { lines: resp, solved: port === 8888 ? false : undefined };
          }
          return { lines: [`Connection to port ${port} refused or timed out.`] };
        },
      },
    },
  },

  // ─── BT-09: Subnets ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Downtown Santa Cruz", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏙️" },
    id: "bt-09",
    order: 9,
    title: "Neighborhoods and Districts",
    subtitle: "Subnets — Dividing the Network Into Zones",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-09", name: "Subnet Architect", emoji: "🏘️" },
    challengeType: "ctf",
    info: {
      tagline: "Santa Cruz has neighborhoods. Networks have subnets. Same idea — zones with controlled crossings.",
      year: 2025,
      overview: [
        "Santa Cruz is divided into neighborhoods: the Westside, the Eastside, Downtown, and Live Oak. You can drive freely within your neighborhood, but to reach another district you go through a specific intersection. Subnets work the same way: a subnet is a logical division of an IP network. Devices on the same subnet communicate directly; devices on different subnets must go through a router.",
        "A subnet is defined by an IP address and a subnet mask. The mask tells you which bits of the IP address are the 'network' part and which are the 'host' part. For example: 192.168.1.0/24 means the first 24 bits are the network (192.168.1) and the last 8 bits identify devices (0–255). This subnet holds up to 254 devices.",
        "Subnetting is a core tool for network security and organization. An organization might put servers on 10.0.1.0/24, workstations on 10.0.2.0/24, and IoT devices on 10.0.3.0/24. Traffic between subnets must pass through a firewall, allowing strict control over what can talk to what.",
      ],
      technical: {
        title: "Reading CIDR Notation and Subnet Masks",
        body: [
          "CIDR notation (/24, /16, /8) tells you how many bits are in the network portion. /24 = 255.255.255.0 = 254 hosts. /16 = 255.255.0.0 = 65,534 hosts. /8 = 255.0.0.0 = 16 million hosts. To find if two IPs are on the same subnet: apply the mask to both IPs with bitwise AND — if the results match, they're in the same subnet.",
          "Private IP ranges (RFC 1918) for internal networks: 10.0.0.0/8 (large enterprises), 172.16.0.0/12 (medium networks), 192.168.0.0/16 (home/small office). These addresses are never routed on the public internet — your router NATs them to your public IP.",
        ],
        codeExample: {
          label: "Subnet calculation and network inspection",
          code: `# Find your IP and subnet mask
ip addr show     # Linux — look for "192.168.1.5/24"

# ipcalc tool for subnet math
ipcalc 192.168.1.0/24
# Shows: network, broadcast, first/last host, num hosts

# Are two IPs on the same subnet?
# 192.168.1.5 and 192.168.1.100 with /24:
# Both have network part 192.168.1.x → same subnet ✓
# 192.168.1.5 and 192.168.2.100 with /24:
# 192.168.1 ≠ 192.168.2 → different subnets, need router`,
        },
      },
      incident: {
        title: "Flat Networks and the Target Breach — No Subnetting = No Containment",
        when: "November 2013",
        where: "Target Corporation, Minneapolis MN",
        impact: "40 million credit cards stolen; $290M in damages",
        body: [
          "Target's network was insufficiently segmented. Attackers entered through the HVAC vendor's credentials — Fazio Mechanical had remote access to Target's network for monitoring heating systems. In a properly segmented network, the HVAC subnet would have no route to the payment processing subnet.",
          "Instead, Target's POS (point-of-sale) terminals and HVAC systems were on the same flat network. Once attackers had Fazio's credentials, they could reach the POS systems directly and install credit card skimming malware. Proper subnetting with firewall rules between segments would have contained the breach. The lesson: network segmentation limits blast radius.",
        ],
      },
      diagram: {
        nodes: [
          { label: "10.0.1.0/24", sub: "servers subnet", type: "attacker" },
          { label: "10.0.2.0/24", sub: "workstations subnet", type: "system" },
          { label: "Router/Firewall", sub: "controls inter-subnet traffic", type: "victim" },
          { label: "10.0.3.0/24", sub: "IoT/guest subnet — isolated", type: "result" },
        ],
      },
      timeline: [
        { year: 1981, event: "Classful networking (Class A/B/C) — rigid, wasteful subnetting" },
        { year: 1993, event: "CIDR (Classless Inter-Domain Routing) introduced — flexible /notation" },
        { year: 2013, event: "Target breach — flat network allows HVAC vendor → POS lateral movement", highlight: true },
        { year: 2016, event: "Zero-trust networking emerges — 'assume breach, verify everything'" },
      ],
      keyTakeaways: [
        "A subnet groups devices that communicate directly without a router",
        "CIDR /notation tells you network size: /24 = 254 hosts, /16 = 65,534 hosts",
        "Devices on different subnets must go through a router or firewall",
        "Network segmentation limits breach blast radius — compromise one subnet, not all",
      ],
      references: [
        { title: "Subnetting Explained — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/" },
        { title: "Target Breach — US Senate Commerce Committee Report", url: "https://www.commerce.senate.gov/services/files/24d3c229-4f2f-405d-b8db-a3a67f183883" },
      ],
    },
    ctf: {
      scenario: "Santa Cruz city network is supposed to be segmented into three districts. Discover which subnet each device is on, identify the device that's on the wrong subnet (security violation), and report it.",
      hint: "Calculate subnet membership for each device and find the one that doesn't belong.",
      hints: [
        "View the network map. Run: show-network",
        "Check subnet membership for each device. Run: subnet-check 10.0.1.50",
        "Find the device on the wrong subnet. Run: subnet-check 10.0.2.15",
        "Report the violation. Run: report-violation <ip>",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{SUBN3TS_1S0L4T3_N3TW0RK_Z0N3S}",
      files: {
        "/network-map.txt": [
          "SANTA CRUZ CITY NETWORK — SUBNET MAP",
          "======================================",
          "",
          "Defined subnets:",
          "  10.0.1.0/24  — Servers district    (web, database)",
          "  10.0.2.0/24  — Workstations district (staff computers)",
          "  10.0.3.0/24  — IoT/Cameras district  (sensors, cameras)",
          "",
          "Registered devices:",
          "  10.0.1.5   web-server-01      → Servers       ✓",
          "  10.0.1.20  database-01        → Servers       ✓",
          "  10.0.2.15  camera-lobby-01    → Workstations  ← WRONG SUBNET",
          "  10.0.3.8   iot-sensor-01      → IoT           ✓",
          "  10.0.2.44  workstation-alice  → Workstations  ✓",
          "",
          "Use: subnet-check <ip> to verify placement.",
          "Then: report-violation <ip> to flag misplaced devices.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "network-map.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/network-map.txt", value: "FLAG{SUBN3TS_", label: "Network Map Read — Subnet Layout Inspected" },
        { trigger: "subnet-check 10.0.2.15", value: "1S0L4T3_N3TW0RK_", label: "Violation Found — Camera on Wrong Subnet" },
        { trigger: "report-violation 10.0.2.15", value: "Z0N3S}", label: "Violation Reported — Segmentation Mastered" },
      ],
      extraCommands: {
        "show-network": () => ({
          lines: [
            "Santa Cruz City Network — Subnet Map",
            "=====================================",
            "Subnet 10.0.1.0/24  — Servers district",
            "Subnet 10.0.2.0/24  — Workstations district",
            "Subnet 10.0.3.0/24  — IoT/Cameras district",
            "",
            "Registered devices:",
            "  10.0.1.5   — web-server-01      (should be: servers)",
            "  10.0.1.20  — database-01        (should be: servers)",
            "  10.0.2.15  — camera-lobby-01    (should be: IoT!)",
            "  10.0.3.8   — iot-sensor-01      (should be: IoT)",
            "  10.0.2.44  — workstation-alice  (should be: workstations)",
          ],
        }),
        "subnet-check": (args) => {
          const ip = args[0] || "";
          const map: Record<string, { subnet: string; expected: string; ok: boolean }> = {
            "10.0.1.5": { subnet: "10.0.1.0/24 (Servers)", expected: "Servers", ok: true },
            "10.0.1.20": { subnet: "10.0.1.0/24 (Servers)", expected: "Servers", ok: true },
            "10.0.2.15": { subnet: "10.0.2.0/24 (Workstations)", expected: "IoT/Cameras", ok: false },
            "10.0.3.8": { subnet: "10.0.3.0/24 (IoT)", expected: "IoT", ok: true },
            "10.0.2.44": { subnet: "10.0.2.0/24 (Workstations)", expected: "Workstations", ok: true },
          };
          const result = map[ip];
          if (!result) return { lines: [`Unknown device: ${ip}`] };
          return {
            lines: [
              `Device: ${ip}`,
              `  Current subnet:  ${result.subnet}`,
              `  Expected subnet: ${result.expected}`,
              `  Status: ${result.ok ? "✓ Correct" : "⚠ VIOLATION — wrong subnet!"}`,
            ],
          };
        },
        "report-violation": (args) => {
          const ip = args[0] || "";
          if (ip === "10.0.2.15") {
            return {
              lines: [
                "Violation reported: 10.0.2.15 (camera-lobby-01)",
                "  Camera is on the Workstations subnet — should be IoT subnet.",
                "  Risk: if camera is compromised, attacker is on workstations network.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`${ip} is correctly placed. Check all devices with subnet-check.`] };
        },
      },
    },
  },

  // ─── BT-10: Protocols ─────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Highway 1, Pacific Coast", location: "California, USA", era: "Present Day", emoji: "🌅" },
    id: "bt-10",
    order: 10,
    title: "Rules of the Road",
    subtitle: "Protocols — The Agreed Language of the Internet",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-10", name: "Protocol Analyst", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "A protocol is just an agreement: here's how we talk so we can understand each other.",
      year: 2025,
      overview: [
        "Driving Highway 1 along the Pacific coast, you follow agreed rules: drive on the right, signal before turning, stop at red lights. These rules let strangers from different countries share the same road safely. Network protocols are the same: agreed-upon rules for how devices communicate. Without protocols, two devices would be sending data neither could interpret.",
        "The internet runs on a layered protocol stack. At the bottom, Ethernet and WiFi handle physical transmission. Above that, IP handles addressing and routing. Above that, TCP or UDP handle reliable or fast delivery. At the top, application protocols like HTTP, SMTP, and SSH handle the actual service being used. Each layer only talks to the layer directly above and below it.",
        "Understanding protocols is fundamental to security. Every vulnerability is ultimately a violation of a protocol's assumptions — a crafted packet that exploits the way TCP handles sequence numbers, a request that abuses how HTTP handles headers, a DNS response that lies about a name-to-IP mapping.",
      ],
      technical: {
        title: "The TCP/IP Model and Protocol Layers",
        body: [
          "Layer 1 (Physical): bits over wire/air. Layer 2 (Data Link): MAC addresses, Ethernet frames. Layer 3 (Network): IP addresses, routing. Layer 4 (Transport): TCP (reliable) or UDP (fast). Layer 5-7 (Application): HTTP, DNS, SMTP, SSH, TLS. Each layer adds a header wrapping the layer above — a process called encapsulation.",
          "TCP uses a three-way handshake to establish a connection: SYN → SYN-ACK → ACK. It guarantees delivery, ordering, and error correction. UDP sends datagrams with no handshake, no acknowledgment, no guaranteed order — faster and lower overhead, used for DNS, video calls, games, and streaming.",
        ],
        codeExample: {
          label: "Observing protocols in action",
          code: `# Watch the TCP handshake and HTTP traffic
sudo tcpdump -i any port 80 -v

# See what protocol a connection uses
netstat -tlnp

# HTTP request (unencrypted — visible on network)
curl -v http://example.com

# TLS handshake details (HTTPS)
curl -v https://example.com 2>&1 | grep -E "SSL|TLS|Connected"`,
        },
      },
      incident: {
        title: "The TCP SYN Flood — Exploiting Protocol Design",
        when: "1996 — First documented large-scale attacks",
        where: "Early internet servers",
        impact: "Servers overwhelmed; basis for all modern DDoS attacks",
        body: [
          "The TCP handshake has an inherent flaw: when a server receives a SYN, it allocates memory for the half-open connection and waits for the ACK that completes the handshake. If the ACK never comes — because the source IP was spoofed — the server waits (typically 75 seconds) before releasing that memory.",
          "A SYN flood sends millions of SYN packets with fake source IPs. The server fills its connection table with half-open connections and can no longer accept legitimate traffic. This attack exploits the protocol design itself — TCP's designers in the 1970s never anticipated malicious actors. Modern mitigations include SYN cookies, which avoid allocating memory until the handshake completes.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Application Data", sub: "what you actually send", type: "attacker" },
          { label: "TCP/UDP Layer", sub: "reliable or fast delivery", type: "system" },
          { label: "IP Layer", sub: "addressing and routing", type: "victim" },
          { label: "Ethernet/WiFi", sub: "physical transmission", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "TCP/IP designed by Vint Cerf and Bob Kahn" },
        { year: 1983, event: "TCP/IP replaces NCP as ARPANET's protocol — the modern internet is born" },
        { year: 1996, event: "SYN flood attacks first documented — TCP design flaw exploited at scale", highlight: true },
        { year: 2000, event: "SYN cookies standardized — mitigates SYN flood without state" },
      ],
      keyTakeaways: [
        "Protocols are agreed rules for communication — without them, data is noise",
        "The internet uses a 4-layer model: Link → Network → Transport → Application",
        "TCP = reliable (handshake, ACK); UDP = fast (no guarantee)",
        "Every vulnerability exploits a flaw or unintended behavior in a protocol",
      ],
      references: [
        { title: "TCP/IP Explained — Cloudflare", url: "https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/" },
        { title: "SYN Flood Attack — OWASP", url: "https://owasp.org/www-community/attacks/SYN_Flood" },
      ],
    },
    ctf: {
      scenario: "You're on Highway 1. Two transmissions have been intercepted — one TCP, one UDP. Analyze each, identify the protocol from its characteristics, and decode the hidden message carried inside the TCP stream.",
      hint: "Analyze the traffic captures to identify TCP vs UDP, then decode the TCP payload.",
      hints: [
        "Inspect the first capture. Run: analyze capture-1",
        "Inspect the second capture. Run: analyze capture-2",
        "Identify which is TCP. Run: identify tcp",
        "Decode the TCP stream payload. Run: decode capture-1",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{TCP_1S_R3L14BL3_UDP_1S_F4ST}",
      files: {
        "/capture-1.log": [
          "PACKET CAPTURE — capture-1.log",
          "================================",
          "[0.000] SYN     seq=0            src=10.0.0.5:54321  dst=198.51.100.23:80",
          "[0.012] SYN-ACK seq=0  ack=1     src=198.51.100.23:80  dst=10.0.0.5:54321",
          "[0.013] ACK     seq=1  ack=1     src=10.0.0.5:54321  dst=198.51.100.23:80",
          "[0.014] DATA    seq=1  len=512   PAYLOAD: [encoded]",
          "[0.089] ACK     ack=513          (delivery confirmed)",
          "[0.090] DATA    seq=513 len=256  PAYLOAD: [encoded]",
          "[0.150] ACK     ack=769          (delivery confirmed)",
        ].join("\n"),
        "/capture-2.log": [
          "PACKET CAPTURE — capture-2.log",
          "================================",
          "[0.000] DGRAM  src=10.0.0.5:5353   dst=224.0.0.251:5353  len=64",
          "[0.001] DGRAM  src=10.0.0.5:5353   dst=224.0.0.251:5353  len=64",
          "[0.040] DGRAM  src=10.0.0.5:5353   dst=224.0.0.251:5353  len=64",
          "No acknowledgments. No sequence numbers. No handshake.",
          "Fire and forget.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "capture-1.log", isDir: false },
          { name: "capture-2.log", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/capture-1.log", value: "FLAG{TCP_1S_R3L14BL3_", label: "TCP Capture Read — Three-Way Handshake Observed" },
        { trigger: "/capture-2.log", value: "UDP_1S_", label: "UDP Capture Read — Connectionless Datagrams Observed" },
        { trigger: "decode capture-1", value: "F4ST}", label: "TCP Stream Decoded — Protocol Stack Mastered" },
      ],
      extraCommands: {
        analyze: (args) => {
          const cap = args[0] || "";
          if (cap === "capture-1") {
            return {
              lines: [
                "Analysis: capture-1.log",
                "  Three-way handshake detected: SYN → SYN-ACK → ACK",
                "  Sequence numbers present: YES",
                "  Acknowledgments present: YES",
                "  Delivery guaranteed: YES",
                "  Protocol: TCP (Transmission Control Protocol)",
              ],
            };
          }
          if (cap === "capture-2") {
            return {
              lines: [
                "Analysis: capture-2.log",
                "  Handshake: NONE",
                "  Sequence numbers: NONE",
                "  Acknowledgments: NONE",
                "  Delivery guaranteed: NO",
                "  Protocol: UDP (User Datagram Protocol)",
                "  Use case: DNS, mDNS, video streaming, gaming",
              ],
            };
          }
          return { lines: [`Unknown capture: ${cap}. Try: analyze capture-1 or analyze capture-2`] };
        },
        identify: (args) => {
          if (args[0] === "tcp") {
            return { lines: ["capture-1 is TCP. Confirmed by: three-way handshake, sequence numbers, ACKs."] };
          }
          if (args[0] === "udp") {
            return { lines: ["capture-2 is UDP. Confirmed by: no handshake, no ACKs, datagrams only."] };
          }
          return { lines: ["Usage: identify tcp  OR  identify udp"] };
        },
        decode: (args) => {
          if ((args[0] || "").includes("1")) {
            return {
              lines: [
                "Decoding TCP stream payload from capture-1...",
                "  Reassembling 2 segments (512 + 256 bytes)...",
                "  Decoded message:",
                "",
                "  'TCP is reliable — every byte delivered in order.",
                "   UDP is fast — no handshake, no guarantees.",
                "   Protocols are just agreed rules.'",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`Decode which capture? Try: decode capture-1`] };
        },
      },
    },
  },
];
