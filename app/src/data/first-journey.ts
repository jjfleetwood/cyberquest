import type { StageConfig, EpochConfig } from "./types";

export const firstJourneyEpoch: EpochConfig = {
  id: "first-journey",
  name: "Our First Journey",
  subtitle: "Junior Cyber Agent Academy — Your First 10 Missions",
  description: "Welcome to Cyber Academy! You are a new Junior Cyber Agent. Your job is to learn how computers talk to each other and how to keep them safe. Every mission teaches you one new superpower. Are you ready? Let's go!",
  emoji: "🌊",
  color: "emerald",
  unlocked: true,
};

export const firstJourneyStages: StageConfig[] = [

  // ─── BT-01: What is a Network ────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Cyber Academy Headquarters", location: "CyberVille", era: "Today", emoji: "🏫" },
    id: "bt-01",
    order: 1,
    title: "Your First Mission",
    subtitle: "What is a Network?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-01", name: "Network Cadet", emoji: "🗺️" },
    challengeType: "ctf",
    info: {
      tagline: "Computers make friends too — and their friend group is called a network.",
      year: 2025,
      overview: [
        "Welcome, Junior Agent! Today you learn what a network is. A network is a group of computers that are connected together so they can share information. It's like a group of friends passing notes to each other in class.",
        "When computers are connected in a network, they can send messages, pictures, and files to each other. The internet is the biggest network of all — it connects billions of computers all around the world.",
        "Think about your school. All the computers in your computer lab are probably connected in a network. That way your teacher can send homework to everyone at the same time!",
      ],
      technical: {
        title: "How Computers Connect",
        body: [
          "Computers connect to each other using cables (like the ones behind your TV) or using WiFi (invisible radio waves, just like how a radio works). When two computers are connected, they can send messages back and forth.",
          "A home network usually has a box called a router. The router is like a post office — it makes sure every message gets to the right computer. Your phone, tablet, and laptop all connect to the same router at home.",
        ],
        codeExample: {
          label: "What a network looks like",
          code: `  YOUR HOME NETWORK:

  [Your Laptop] ──┐
  [Your Phone]  ──┤── [Router] ── 🌐 Internet
  [Your Tablet] ──┘

  The router connects everyone together.
  Without the router, your devices can't
  talk to the internet!`,
        },
      },
      incident: {
        title: "The Day a School Lost Its Network",
        when: "2022",
        where: "A school in the United States",
        impact: "Students couldn't do computer work for a whole week",
        body: [
          "One day, a school's network broke down. No computer in the school could talk to any other computer. Teachers couldn't share documents. Students couldn't look things up online. Even the office couldn't print anything!",
          "A technician (a person who fixes computers) had to come and repair the network. It took a whole week! That's how important networks are — when they break, everything stops.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Computer", sub: "sends messages", type: "attacker" },
          { label: "The Router", sub: "like a post office", type: "system" },
          { label: "The Internet", sub: "biggest network ever", type: "victim" },
          { label: "Another Computer", sub: "receives messages", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "First computers connected together — only 4 computers at first!" },
        { year: 1991, event: "The World Wide Web (websites) is invented — the internet gets easy to use" },
        { year: 2000, event: "Over 1 billion people start using the internet" },
        { year: 2025, event: "Over 5 billion people online — that's most of the world!", highlight: true },
      ],
      keyTakeaways: [
        "A network is computers connected together so they can share information",
        "The internet is the biggest network — it connects computers worldwide",
        "A router connects all devices in your home to the internet",
        "When networks break, computers can't talk to each other",
      ],
      references: [
        { title: "How the Internet Works — Mozilla", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work" },
      ],
    },
    ctf: {
      scenario: "You're at Cyber Academy. The academy's computers are in a network, but someone mixed up the connections! Read the network map, find which computer is disconnected, and reconnect it to complete your first mission.",
      hint: "Read the map to find the disconnected computer.",
      hints: [
        "Read the network map. Run: map",
        "See which computers are connected. Run: check-connections",
        "Find the missing computer. Run: find-missing",
        "Reconnect it. Run: reconnect",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/academy-map.txt": [
          "CYBER ACADEMY NETWORK MAP",
          "=========================",
          "",
          "Connected computers:",
          "  [Computer A] ✓ Connected to router",
          "  [Computer B] ✓ Connected to router",
          "  [Computer C] ✗ NOT connected!",
          "  [Computer D] ✓ Connected to router",
          "",
          "Commands: map | check-connections | find-missing | reconnect",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "academy-map.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/academy-map.txt", value: "FLAG{N3TW0RK_", label: "Map Found — Network Problem Identified" },
        { trigger: "find-missing", value: "C0MP_", label: "Missing Computer Located" },
        { trigger: "reconnect", value: "C0NN3CT3D}", label: "Computer Reconnected — Network Restored!" },
      ],
      extraCommands: {
        map: () => ({
          lines: [
            "CYBER ACADEMY NETWORK MAP",
            "=========================",
            "",
            "Connected computers:",
            "  [Computer A] ✓ Connected to router",
            "  [Computer B] ✓ Connected to router",
            "  [Computer C] ✗ NOT connected!",
            "  [Computer D] ✓ Connected to router",
            "",
            "One computer is missing from the network!",
            "Run: find-missing",
          ],
        }),
        "check-connections": () => ({
          lines: [
            "Checking all connections...",
            "  Computer A: ✓ Online",
            "  Computer B: ✓ Online",
            "  Computer C: ✗ Offline — cable unplugged!",
            "  Computer D: ✓ Online",
            "",
            "Computer C is disconnected. Run: find-missing",
          ],
        }),
        "find-missing": () => ({
          lines: [
            "Found it! Computer C's cable is unplugged.",
            "Location: Room 3, left side of the room.",
            "A network needs ALL computers connected to work properly.",
            "",
            "Run: reconnect to fix it!",
          ],
        }),
        reconnect: () => ({
          lines: [
            "✓ Plugging in Computer C...",
            "✓ Computer C is now connected to the router!",
            "✓ All 4 computers are now in the network!",
            "",
            "Great work, Junior Agent! You fixed the network!",
            "Run 'assemble' to claim your reward.",
          ],
        }),
      },
    },
  },

  // ─── BT-02: IP Addresses ─────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Mail Room", location: "CyberVille", era: "Today", emoji: "📮" },
    id: "bt-02",
    order: 2,
    title: "Every Computer Has an Address",
    subtitle: "What is an IP Address?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-02", name: "Address Finder", emoji: "📮" },
    challengeType: "ctf",
    info: {
      tagline: "Every computer has a special number called an IP address — like a home address, but for computers.",
      year: 2025,
      overview: [
        "When you send a letter to a friend, you write their home address on the envelope. Without an address, the mail carrier doesn't know where to deliver it! Computers work the same way. Every computer has a special address called an IP address.",
        "An IP address is a set of numbers that tells the internet where to send information. It looks like this: 192.168.1.5. Those numbers are the computer's 'home address' on the internet.",
        "When you visit a website, your computer sends a message to the website's IP address. The website sends the page back to YOUR IP address. That's how you see the website on your screen!",
      ],
      technical: {
        title: "What an IP Address Looks Like",
        body: [
          "An IP address has four groups of numbers separated by dots. Each number is between 0 and 255. For example: 192.168.1.42. Your home computer has an address like this, and so does every website.",
          "Your home IP address is private — only computers in your house use it. When you go to the internet, your router has a public IP address that the whole world can use to find your home network.",
        ],
        codeExample: {
          label: "IP addresses look like this",
          code: `  Your home computer:  192.168.1.42
  Google's computer:   142.250.80.46
  Your school:         10.0.0.1

  These numbers are like house addresses!

  Home address:    42 Elm Street
  IP address:      192.168.1.42

  Both tell the delivery person WHERE to go.`,
        },
      },
      incident: {
        title: "The Mysterious Missing Letter",
        when: "Any day this could happen",
        where: "Anywhere with computers",
        impact: "Without the right address, messages get lost",
        body: [
          "Imagine you want to send a birthday card to your friend, but you accidentally write the wrong house number. Your card goes to a stranger's house! The same thing can happen on the internet.",
          "If a computer sends data to the wrong IP address, it goes to the wrong computer. That's why IP addresses are so important — every computer needs exactly the right address so messages get delivered to the right place.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Computer", sub: "has an IP address", type: "attacker" },
          { label: "Your Message", sub: "has destination address", type: "system" },
          { label: "The Router", sub: "reads the address", type: "victim" },
          { label: "Right Computer", sub: "message delivered!", type: "result" },
        ],
      },
      timeline: [
        { year: 1981, event: "IP addresses invented so computers could find each other" },
        { year: 2011, event: "The internet almost ran out of IP addresses — so a new system was made!" },
        { year: 2025, event: "Billions of devices all have their own IP address", highlight: true },
      ],
      keyTakeaways: [
        "Every computer has an IP address — like a home address for computers",
        "IP addresses are numbers separated by dots, like 192.168.1.42",
        "Without the right IP address, messages go to the wrong computer",
        "Your router has an address that lets you connect to the internet",
      ],
      references: [
        { title: "What is an IP Address? — Cloudflare", url: "https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/" },
      ],
    },
    ctf: {
      scenario: "A message was sent to the Academy but went to the wrong computer! Read the delivery log, find the correct IP address for the Academy computer, and redeliver the message.",
      hint: "Find the correct address in the delivery log and redeliver.",
      hints: [
        "Read the delivery log. Run: read-log",
        "Look up the correct address. Run: address-book",
        "Redeliver to the right address. Run: deliver 10.0.0.5",
        "Confirm the message arrived. Run: confirm",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/delivery-log.txt": [
          "DELIVERY LOG",
          "============",
          "Message: 'Welcome to Cyber Academy!'",
          "Sent to: 10.0.0.9  (WRONG ADDRESS!)",
          "Status: Delivery failed — no computer at that address",
          "",
          "Correct address in address-book",
          "Commands: read-log | address-book | deliver <address> | confirm",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "delivery-log.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/delivery-log.txt", value: "FLAG{1P_", label: "Delivery Log Read — Wrong Address Found" },
        { trigger: "address-book", value: "4DDR3SS_", label: "Correct Address Found" },
        { trigger: "confirm", value: "D3L1V3R3D}", label: "Message Delivered to Correct Computer!" },
      ],
      extraCommands: {
        "read-log": () => ({
          lines: [
            "DELIVERY LOG",
            "============",
            "Message: 'Welcome to Cyber Academy!'",
            "Sent to: 10.0.0.9  ← WRONG! No computer here",
            "Status: Message bounced back",
            "",
            "Check the address-book to find the correct IP.",
            "Run: address-book",
          ],
        }),
        "address-book": () => ({
          lines: [
            "ACADEMY ADDRESS BOOK",
            "====================",
            "Principal's Office:  10.0.0.1",
            "Library Computer:    10.0.0.2",
            "Computer Lab:        10.0.0.5  ← This is where messages go!",
            "Gym Office:          10.0.0.8",
            "",
            "The message should go to 10.0.0.5",
            "Run: deliver 10.0.0.5",
          ],
        }),
        deliver: (args) => {
          const addr = args[0] || "";
          if (addr === "10.0.0.5") {
            return {
              lines: [
                "Sending 'Welcome to Cyber Academy!' to 10.0.0.5...",
                "✓ Message delivered successfully!",
                "The Computer Lab received the message.",
                "",
                "Run: confirm",
              ],
            };
          }
          return { lines: [`${addr} is not in the address book. Run: address-book to find the right one.`] };
        },
        confirm: () => ({
          lines: [
            "✓ Delivery confirmed! The Computer Lab got the message.",
            "✓ IP address 10.0.0.5 = Computer Lab",
            "",
            "You learned: every computer needs the right IP address",
            "to receive messages. Without it, they get lost!",
            "",
            "Run 'assemble' to claim your reward!",
          ],
        }),
      },
    },
  },

  // ─── BT-03: Packets ──────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Post Office", location: "CyberVille", era: "Today", emoji: "📦" },
    id: "bt-03",
    order: 3,
    title: "Breaking It Into Pieces",
    subtitle: "What are Packets?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-03", name: "Packet Agent", emoji: "📦" },
    challengeType: "ctf",
    info: {
      tagline: "Big messages are broken into tiny pieces called packets — then put back together like a puzzle.",
      year: 2025,
      overview: [
        "Imagine you want to send your friend a huge LEGO set by mail. You can't fit all the pieces in one box! So you put them in many small boxes, number each box, and ship them separately. Your friend receives all the boxes and puts the LEGO together at the end. That's exactly how the internet works with packets!",
        "When you send a message or watch a video, the computer breaks it into tiny pieces called packets. Each packet travels separately through the internet, and when they all arrive, the computer puts them back together in the right order.",
        "This is smart because if one packet gets lost, the computer just asks for that one piece again — instead of sending the whole message over!",
      ],
      technical: {
        title: "How Packets Work",
        body: [
          "Every packet has a label on it (just like a mailing label) that says: which message it belongs to, what number piece it is, and where it's going. When all the packets arrive, the computer reads the numbers and puts them in order.",
          "Sometimes packets arrive out of order — packet 3 might arrive before packet 2. That's okay! The computer sorts them by number and still puts the message together perfectly.",
        ],
        codeExample: {
          label: "A message broken into packets",
          code: `  Original message:
  "Hello, I am a Junior Cyber Agent!"

  Broken into packets:
  [Packet 1] "Hello, I am"     → travels path A
  [Packet 2] " a Junior"       → travels path B
  [Packet 3] " Cyber Agent!"   → travels path A

  When they arrive (maybe out of order):
  Packet 3 arrives first → saved
  Packet 1 arrives next  → saved
  Packet 2 arrives last  → sorted!

  Final message: "Hello, I am a Junior Cyber Agent!" ✓`,
        },
      },
      incident: {
        title: "When Packets Are Used for Attack",
        when: "Happens every day",
        where: "Online gaming servers, websites",
        impact: "Slow or crashed servers",
        body: [
          "Sometimes bad people send millions and millions of tiny packets to a computer all at once. This is called a DDoS attack. The computer gets so overwhelmed trying to receive all those packets that it can't help anyone else.",
          "It's like if 1,000 people all tried to fit through a door at the same time — nobody gets through! Good security systems watch for too many packets from one place and block them.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Message", sub: "big file or video", type: "attacker" },
          { label: "Break Into Packets", sub: "numbered pieces", type: "system" },
          { label: "Travel the Network", sub: "each piece separately", type: "victim" },
          { label: "Put Back Together", sub: "original message!", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "Packet switching invented — the key idea behind the internet" },
        { year: 1983, event: "All internet computers start using packets" },
        { year: 2025, event: "Every message, video, and game you play travels as packets", highlight: true },
      ],
      keyTakeaways: [
        "Big messages are broken into small pieces called packets",
        "Each packet has a number so it can be put back in order",
        "Packets can take different paths and still arrive correctly",
        "If a packet is lost, only that piece needs to be sent again",
      ],
      references: [
        { title: "How Packets Work — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-packet/" },
      ],
    },
    ctf: {
      scenario: "A secret message was sent to Cyber Academy in 4 packets, but they arrived out of order! Read all 4 packets and put them in the correct order to reveal the message.",
      hint: "Read all 4 packets and put them in the right order.",
      hints: [
        "List the packets. Run: list-packets",
        "Read packet 1. Run: read 1",
        "Read packets 2, 3, 4 the same way",
        "Assemble them in order. Run: assemble-message 3 1 4 2",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/packets.txt": [
          "RECEIVED PACKETS (out of order!)",
          "================================",
          "Packet A (order: 3) — 'Cyber '",
          "Packet B (order: 1) — 'I love '",
          "Packet C (order: 4) — 'Academy!'",
          "Packet D (order: 2) — 'Kryptós '",
          "",
          "Commands: list-packets | read <1-4> | assemble-message <order>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "packets.txt", isDir: false }],
      },
      fragments: [
        { trigger: "list-packets", value: "FLAG{P4CK3T_", label: "Packets Listed — Out of Order Detected" },
        { trigger: "read 1", value: "PUZZL3_", label: "First Packet Read" },
        { trigger: "assemble-message", value: "S0LV3D}", label: "Message Reassembled Correctly!" },
      ],
      extraCommands: {
        "list-packets": () => ({
          lines: [
            "PACKETS RECEIVED:",
            "  Packet A — order number: 3",
            "  Packet B — order number: 1",
            "  Packet C — order number: 4",
            "  Packet D — order number: 2",
            "",
            "Read each one: read 1, read 2, read 3, read 4",
          ],
        }),
        read: (args) => {
          const n = args[0];
          const map: Record<string, string> = {
            "1": "Packet B (order 1): 'I love '",
            "2": "Packet D (order 2): 'Kryptós '",
            "3": "Packet A (order 3): 'Cyber '",
            "4": "Packet C (order 4): 'Academy!'",
          };
          return { lines: [map[n] || "Unknown packet. Try: read 1, 2, 3, or 4"] };
        },
        "assemble-message": () => ({
          lines: [
            "Putting packets in order 1, 2, 3, 4...",
            "Packet 1: 'I love '",
            "Packet 2: 'Kryptós '",
            "Packet 3: 'Cyber '",
            "Packet 4: 'Academy!'",
            "",
            "✓ FULL MESSAGE: 'I love Kryptós Cyber Academy!'",
            "",
            "Run 'assemble' to claim your reward!",
          ],
        }),
      },
    },
  },

  // ─── BT-04: Routers ──────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Crossroads", location: "CyberVille", era: "Today", emoji: "🚦" },
    id: "bt-04",
    order: 4,
    title: "The Traffic Director",
    subtitle: "What is a Router?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-04", name: "Router Recruit", emoji: "🚦" },
    challengeType: "ctf",
    info: {
      tagline: "A router is like a crossing guard — it looks at each message and points it in the right direction.",
      year: 2025,
      overview: [
        "Have you ever seen a crossing guard at school? They stand at the crossroads and point people in the right direction — 'You go left! You go right!' A router does the same job for computer messages.",
        "When your message travels on the internet, it passes through many routers. Each router looks at where the message is going and points it toward the next router — until it finally reaches its destination.",
        "You have a router at home! It's usually a box with blinking lights. It receives everything from the internet and sends it to the right device — your laptop, your phone, or your tablet.",
      ],
      technical: {
        title: "How Routers Decide Where to Send Messages",
        body: [
          "Routers have a list called a routing table. This table is like a map that says 'if a message is going to this address, send it THAT way.' The router looks at each message's destination IP address and finds the best path for it.",
          "There are routers everywhere on the internet — in buildings, in cities, under the ocean! A message from your computer to a website in another country might pass through 15 to 20 different routers.",
        ],
        codeExample: {
          label: "How a router decides",
          code: `  Message arrives at Router:
  "Deliver this to: 8.8.8.8"

  Router checks its map:
  8.8.8.x → go EAST → next router

  Message goes east to next router:
  "Deliver this to: 8.8.8.8"

  That router checks its map:
  8.8.8.8 → arrived! Deliver here.

  Just like asking for directions
  at each street corner!`,
        },
      },
      incident: {
        title: "When a Router Gives Wrong Directions",
        when: "It happens sometimes",
        where: "On the internet",
        impact: "Messages go to the wrong place",
        body: [
          "Once, some bad people changed a router's map to send everyone's messages to their own computer first. They could read the messages before sending them on! This is called a man-in-the-middle attack.",
          "It's like if a crossing guard started giving everyone wrong directions so they'd walk past the guard's house. The fix? Security on routers so only authorized people can change the maps.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Message", sub: "needs to get somewhere", type: "attacker" },
          { label: "Router 1", sub: "points it right direction", type: "system" },
          { label: "Router 2", sub: "gets closer!", type: "victim" },
          { label: "Destination", sub: "message arrives!", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "The first routers invented to connect different networks" },
        { year: 1987, event: "Cisco founded — now makes millions of routers worldwide" },
        { year: 2025, event: "There are billions of routers directing traffic on the internet", highlight: true },
      ],
      keyTakeaways: [
        "A router is like a crossing guard that directs messages on the network",
        "Every message passes through many routers to reach its destination",
        "Routers use a routing table (a map) to know where to send messages",
        "Your home router connects all your devices to the internet",
      ],
      references: [
        { title: "How Routers Work — Cisco", url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/how-does-a-router-work.html" },
      ],
    },
    ctf: {
      scenario: "A message needs to get from Cyber Academy to the CyberVille Library. There are 3 possible routes through different routers. Figure out which route is fastest and send the message!",
      hint: "Check each route and pick the fastest one.",
      hints: [
        "See all routes. Run: show-routes",
        "Check route A speed. Run: ping route-a",
        "Check route B speed. Run: ping route-b",
        "Check route C speed. Run: ping route-c",
        "Send via the fastest. Run: send route-b",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/routes.txt": [
          "AVAILABLE ROUTES TO LIBRARY",
          "============================",
          "Route A: Academy → Router1 → Router3 → Library",
          "Route B: Academy → Router2 → Library (direct!)",
          "Route C: Academy → Router1 → Router2 → Router3 → Library",
          "",
          "Commands: show-routes | ping <route> | send <route>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "routes.txt", isDir: false }],
      },
      fragments: [
        { trigger: "show-routes", value: "FLAG{R0UT3R_", label: "Routes Mapped" },
        { trigger: "ping route-b", value: "B3ST_", label: "Fastest Route Found" },
        { trigger: "send route-b", value: "PATH}", label: "Message Sent via Optimal Route!" },
      ],
      extraCommands: {
        "show-routes": () => ({
          lines: [
            "ROUTES TO LIBRARY:",
            "  Route A: 3 hops — Academy → Router1 → Router3 → Library",
            "  Route B: 1 hop  — Academy → Router2 → Library  ← shortest!",
            "  Route C: 4 hops — Academy → Router1 → Router2 → Router3 → Library",
            "",
            "Test the speed of each route with: ping <route>",
          ],
        }),
        ping: (args) => {
          const route = args[0];
          if (route === "route-a") return { lines: ["Route A: 45ms (3 hops)"] };
          if (route === "route-b") return { lines: ["Route B: 12ms (1 hop) ← FASTEST!"] };
          if (route === "route-c") return { lines: ["Route C: 89ms (4 hops)"] };
          return { lines: ["Unknown route. Try: ping route-a, ping route-b, or ping route-c"] };
        },
        send: (args) => {
          const route = args[0];
          if (route === "route-b") {
            return {
              lines: [
                "✓ Sending via Route B (fastest: 12ms, 1 hop)...",
                "✓ Message arrived at Library in 0.012 seconds!",
                "",
                "You chose the best route — just like a smart router!",
                "Run 'assemble' to claim your reward.",
              ],
            };
          }
          return { lines: [`Route ${route} works, but it's not the fastest. Try: send route-b`] };
        },
      },
    },
  },

  // ─── BT-05: DNS ──────────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Library", location: "CyberVille", era: "Today", emoji: "📚" },
    id: "bt-05",
    order: 5,
    title: "The Internet's Phone Book",
    subtitle: "What is DNS?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-05", name: "DNS Detective", emoji: "📚" },
    challengeType: "ctf",
    info: {
      tagline: "Computers use numbers, but we use names. DNS translates names into numbers so computers understand us.",
      year: 2025,
      overview: [
        "When you want to call a friend, you look up their name in your contacts. Your phone finds their phone number and dials it for you. You don't have to remember the number — just the name! DNS does the same thing for the internet.",
        "Websites have IP addresses (like 142.250.80.46) but those are hard to remember. So we use names like google.com. When you type google.com, a special computer called a DNS server looks up the number and tells your computer where to go.",
        "DNS stands for Domain Name System. It's like a giant phone book for the whole internet — with billions of names and their matching numbers.",
      ],
      technical: {
        title: "How DNS Works Step by Step",
        body: [
          "When you type a website name: (1) Your computer asks the DNS server 'What is the IP address for google.com?' (2) The DNS server looks it up and replies '142.250.80.46' (3) Your computer goes to that IP address and gets the website.",
          "This all happens in less than one second! The DNS server remembers answers it has looked up recently (this is called a cache) so it doesn't have to look everything up every single time.",
        ],
        codeExample: {
          label: "DNS translation",
          code: `  You type:  google.com
           ↓
  DNS Server looks it up:
  google.com → 142.250.80.46
           ↓
  Your computer goes to:
  142.250.80.46
           ↓
  You see: Google's homepage! ✓

  Without DNS, you would need to type
  142.250.80.46 every time — much harder!`,
        },
      },
      incident: {
        title: "When the Internet's Phone Book Was Attacked",
        when: "October 21, 2016",
        where: "United States",
        impact: "Popular websites went down for millions of people",
        body: [
          "In 2016, hackers attacked a company that runs DNS servers. Without the DNS servers working, people couldn't reach popular websites like Twitter and Netflix — even though those websites were perfectly fine! It's like if someone stole all the phone books so nobody could look up numbers.",
          "The lesson: DNS is so important that if it breaks, much of the internet stops working. That's why security experts work hard to protect DNS servers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You type google.com", sub: "a name you remember", type: "attacker" },
          { label: "DNS Server", sub: "the phone book lookup", type: "system" },
          { label: "Returns IP address", sub: "142.250.80.46", type: "victim" },
          { label: "Website loads!", sub: "your computer found it", type: "result" },
        ],
      },
      timeline: [
        { year: 1983, event: "DNS invented — before this, everyone used a single shared file to look up names!" },
        { year: 1993, event: "Web browsers start using DNS to let us type website names" },
        { year: 2016, event: "Dyn DNS attack — major websites go offline because DNS was hacked", highlight: true },
      ],
      keyTakeaways: [
        "DNS is like a phone book — it translates website names into IP numbers",
        "You type google.com; DNS finds the number 142.250.80.46 for you",
        "DNS servers remember recent lookups (cache) to work faster",
        "If DNS goes down, websites become unreachable even if they're working fine",
      ],
      references: [
        { title: "How DNS Works — Cloudflare", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
      ],
    },
    ctf: {
      scenario: "The Academy's DNS lookup list is scrambled! Match each website name to its correct IP address to restore the phone book.",
      hint: "Match each website name to its IP address.",
      hints: [
        "See the scrambled list. Run: show-list",
        "Try matching academy.edu. Run: match academy.edu 10.0.0.1",
        "Match library.edu. Run: match library.edu 10.0.0.5",
        "Match gym.edu. Run: match gym.edu 10.0.0.9",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/dns-scrambled.txt": [
          "SCRAMBLED DNS LIST — NEEDS FIXING!",
          "=====================================",
          "Names: academy.edu, library.edu, gym.edu",
          "IPs:   10.0.0.9,  10.0.0.1,  10.0.0.5",
          "",
          "CLUES:",
          "  The Academy has IP ending in .1 (the first one!)",
          "  The Library has IP ending in .5 (fifth room built)",
          "  The Gym has IP ending in .9 (the newest building)",
          "",
          "Commands: show-list | match <name> <ip>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "dns-scrambled.txt", isDir: false }],
      },
      fragments: [
        { trigger: "show-list", value: "FLAG{DNS_", label: "Scrambled List Found" },
        { trigger: "match academy.edu 10.0.0.1", value: "PH0N3_", label: "Academy Matched Correctly" },
        { trigger: "match gym.edu 10.0.0.9", value: "B00K}", label: "All Names Matched — DNS Restored!" },
      ],
      extraCommands: {
        "show-list": () => ({
          lines: [
            "SCRAMBLED DNS:",
            "  academy.edu → ???",
            "  library.edu → ???",
            "  gym.edu     → ???",
            "",
            "Available IPs: 10.0.0.1, 10.0.0.5, 10.0.0.9",
            "Use clues in dns-scrambled.txt to match them!",
            "Run: match <name> <ip>",
          ],
        }),
        match: (args) => {
          const name = args[0];
          const ip = args[1];
          const correct: Record<string, string> = {
            "academy.edu": "10.0.0.1",
            "library.edu": "10.0.0.5",
            "gym.edu": "10.0.0.9",
          };
          if (correct[name] === ip) return { lines: [`✓ Correct! ${name} → ${ip}`] };
          return { lines: [`✗ Wrong match for ${name}. Check the clues and try again.`] };
        },
      },
    },
  },

  // ─── BT-06: MAC Addresses / Device Identity ──────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy ID Office", location: "CyberVille", era: "Today", emoji: "🪪" },
    id: "bt-06",
    order: 6,
    title: "Every Device Has an ID Card",
    subtitle: "What is a MAC Address?",
    category: "cybersecurity",
    xp: 50,
    badge: { id: "bt-badge-06", name: "Identity Agent", emoji: "🪪" },
    challengeType: "ctf",
    info: {
      tagline: "Every device has a special ID number burned in at the factory — like a device's birthday number that never changes.",
      year: 2025,
      overview: [
        "When you start at a new school, you get a student ID card with your name and a number. No two students have the same ID number! Every computer, phone, and tablet also has a unique ID number — it's called a MAC address, and it's burned into the device when it's made.",
        "A MAC address looks like this: A4:C3:F0:27:B3:12. It's a mix of letters and numbers. The manufacturer (the company that made your device) programs this number into the device's hardware before it's sold.",
        "Your MAC address never changes — it's permanently part of your device. This is different from an IP address, which can change. MAC addresses help routers identify which device on your local network sent a message.",
      ],
      technical: {
        title: "MAC vs IP — Two Different IDs",
        body: [
          "Think of it this way: your student ID number never changes (that's like a MAC address). But your classroom number changes every year (that's like an IP address). Both help identify you, but in different ways.",
          "IP addresses are used to find devices across the whole internet. MAC addresses are used only on your local network (like inside your home or school). When a message leaves your router to the wider internet, only the IP address matters.",
        ],
        codeExample: {
          label: "MAC address vs IP address",
          code: `  MAC address:  A4:C3:F0:27:B3:12
                (never changes, set at factory)

  IP address:   192.168.1.42
                (can change, set by router)

  MAC = your permanent ID card
  IP  = your room number (can change)

  Both identify your device,
  but in different situations!`,
        },
      },
      incident: {
        title: "How MAC Addresses Help Catch Bad Guys",
        when: "Regularly used by security teams",
        where: "Home networks and offices",
        impact: "Helps identify unknown devices",
        body: [
          "Imagine someone drives to your neighborhood and connects to your WiFi without permission. Even if they hide their IP address, their MAC address is still visible on your local network. Security systems can spot a MAC address that shouldn't be there.",
          "That's why routers can have a 'guest list' — only devices with approved MAC addresses can connect. It's like having a school door that only opens for students with valid ID cards.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Device Made at Factory", sub: "MAC address burned in", type: "attacker" },
          { label: "Device Connects to WiFi", sub: "shows MAC to router", type: "system" },
          { label: "Router Checks MAC", sub: "do I recognize this device?", type: "victim" },
          { label: "Access Granted (or Denied)", sub: "based on ID check", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "MAC addresses invented to give every network device a unique ID" },
        { year: 1990, event: "WiFi uses MAC addresses to manage who can connect" },
        { year: 2025, event: "Every smartphone, laptop, and smart TV has a MAC address", highlight: true },
      ],
      keyTakeaways: [
        "A MAC address is a permanent ID number burned into every device at the factory",
        "No two devices have the same MAC address",
        "MAC addresses are used on local networks; IP addresses are used on the internet",
        "Routers can use MAC addresses to control which devices are allowed to connect",
      ],
      references: [
        { title: "What is a MAC Address? — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-mac-address/" },
      ],
    },
    ctf: {
      scenario: "An unknown device connected to the Cyber Academy network! Check the device list, find the unknown MAC address, and block it from the network.",
      hint: "Find the unknown device and block it.",
      hints: [
        "See all connected devices. Run: list-devices",
        "Check the approved list. Run: approved-list",
        "Identify the unknown device. Run: find-unknown",
        "Block it. Run: block XX:XX:XX:XX:XX:XX (use the unknown MAC)",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/connected-devices.txt": [
          "CURRENTLY CONNECTED DEVICES",
          "============================",
          "A4:C3:F0:27:B3:12 — Principal's laptop ✓",
          "B8:27:EB:11:22:33 — Teacher's computer ✓",
          "DC:A6:32:44:55:66 — UNKNOWN DEVICE ✗",
          "F4:60:E2:77:88:99 — Library computer ✓",
          "",
          "Commands: list-devices | approved-list | find-unknown | block <mac>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "connected-devices.txt", isDir: false }],
      },
      fragments: [
        { trigger: "list-devices", value: "FLAG{M4C_", label: "Device List Read — Unknown Found" },
        { trigger: "find-unknown", value: "1D_", label: "Unknown Device Identified" },
        { trigger: "block DC:A6:32:44:55:66", value: "BL0CK3D}", label: "Unknown Device Blocked!" },
      ],
      extraCommands: {
        "list-devices": () => ({
          lines: [
            "CONNECTED DEVICES:",
            "  A4:C3:F0:27:B3:12 — Principal's laptop",
            "  B8:27:EB:11:22:33 — Teacher's computer",
            "  DC:A6:32:44:55:66 — UNKNOWN!",
            "  F4:60:E2:77:88:99 — Library computer",
            "",
            "Check approved-list then find-unknown.",
          ],
        }),
        "approved-list": () => ({
          lines: [
            "APPROVED DEVICES:",
            "  A4:C3:F0:27:B3:12 ✓",
            "  B8:27:EB:11:22:33 ✓",
            "  F4:60:E2:77:88:99 ✓",
            "",
            "NOT APPROVED: DC:A6:32:44:55:66",
          ],
        }),
        "find-unknown": () => ({
          lines: [
            "UNKNOWN DEVICE FOUND!",
            "  MAC: DC:A6:32:44:55:66",
            "  Not on the approved list!",
            "  This device should not be here.",
            "",
            "Run: block DC:A6:32:44:55:66",
          ],
        }),
        block: (args) => {
          const mac = args[0];
          if (mac === "DC:A6:32:44:55:66") {
            return {
              lines: [
                `✓ Device ${mac} has been BLOCKED!`,
                "✓ Unknown device can no longer connect to the academy network.",
                "",
                "Great detective work, Junior Agent!",
                "Run 'assemble' to claim your reward.",
              ],
            };
          }
          return { lines: [`${mac} is an approved device. Look for the unknown one.`] };
        },
      },
    },
  },

  // ─── BT-07: Firewalls ────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Security Gate", location: "CyberVille", era: "Today", emoji: "🛡️" },
    id: "bt-07",
    order: 7,
    title: "The School Security Guard",
    subtitle: "What is a Firewall?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-07", name: "Firewall Agent", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "A firewall is like a school security guard — it checks everyone trying to get in and keeps the bad stuff out.",
      year: 2025,
      overview: [
        "Imagine your school has a security guard at the front door. The guard checks everyone who wants to come in — students and teachers are allowed, but strangers without ID are not. A firewall does exactly this for a computer network.",
        "A firewall is a security system that watches all the messages coming in and going out of a network. It has a list of rules — some messages are allowed through, and some are blocked. Bad messages (like viruses trying to sneak in) get stopped at the door.",
        "Every computer and network needs a firewall. Without one, anyone on the internet could try to send harmful things directly to your computer.",
      ],
      technical: {
        title: "How Firewalls Make Decisions",
        body: [
          "Firewalls work by checking rules, one by one. Each rule says something like: 'Block messages from unknown places' or 'Allow messages from websites I visited.' If a message matches a blocked rule, it stops. If it matches an allowed rule, it goes through.",
          "Your home router has a built-in firewall. Windows and Mac computers also have firewalls built in. They're always running in the background, quietly protecting you.",
        ],
        codeExample: {
          label: "Example firewall rules",
          code: `  FIREWALL RULES (checked in order):

  Rule 1: BLOCK anything from banned sites ✗
  Rule 2: ALLOW websites I visit (HTTP/HTTPS) ✓
  Rule 3: ALLOW email (coming in and going out) ✓
  Rule 4: BLOCK everything else ✗

  Message arrives → check Rule 1 → no match
                  → check Rule 2 → MATCH! → ALLOW ✓

  It's like a checklist the security guard goes through.`,
        },
      },
      incident: {
        title: "When No Firewall Means Disaster",
        when: "2003",
        where: "The early internet",
        impact: "Hundreds of thousands of computers infected in minutes",
        body: [
          "In 2003, a computer virus called Slammer spread across the internet in just 10 minutes. It attacked computers that didn't have firewalls protecting them. It was so fast that it slowed down the entire internet!",
          "The computers that had firewalls were safe — the firewall blocked the virus at the door. The ones without firewalls got infected. This showed the world that firewalls are not optional — they're essential.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Message Arrives", sub: "from the internet", type: "attacker" },
          { label: "Firewall Checks Rules", sub: "is this allowed?", type: "system" },
          { label: "Decision Made", sub: "allow or block", type: "victim" },
          { label: "Safe Network Inside", sub: "protected!", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "First firewalls invented after a computer worm spread across the internet" },
        { year: 2003, event: "SQL Slammer worm — computers without firewalls got infected in minutes" },
        { year: 2010, event: "Firewalls built into every home router and operating system", highlight: true },
      ],
      keyTakeaways: [
        "A firewall is like a security guard — it checks every message going in and out",
        "Firewalls follow rules to decide what to allow and what to block",
        "Every computer should have a firewall for protection",
        "Without a firewall, bad programs can try to sneak into your computer",
      ],
      references: [
        { title: "What is a Firewall? — Cloudflare", url: "https://www.cloudflare.com/learning/security/what-is-a-firewall/" },
      ],
    },
    ctf: {
      scenario: "The Academy's firewall has 3 suspicious messages waiting for review. Read each message and decide: ALLOW it or BLOCK it based on the firewall rules.",
      hint: "Read the rules, then judge each message.",
      hints: [
        "Read the firewall rules. Run: show-rules",
        "Inspect message 1. Run: inspect 1",
        "Inspect messages 2 and 3 the same way.",
        "Make your decisions: allow 2 and block 1 and 3",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/firewall-queue.txt": [
          "FIREWALL QUEUE",
          "==============",
          "Message 1: From: UNKNOWN STRANGER, trying to access all files",
          "Message 2: From: Teacher (known address), requesting homework files",
          "Message 3: From: VIRUS.BAD, trying to delete things",
          "",
          "RULES: allow known senders / block unknown strangers / block viruses",
          "Commands: show-rules | inspect <1-3> | allow <n> | block <n>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "firewall-queue.txt", isDir: false }],
      },
      fragments: [
        { trigger: "show-rules", value: "FLAG{F1R3W4LL_", label: "Rules Read" },
        { trigger: "block 1", value: "GU4RD_", label: "Threat Blocked" },
        { trigger: "block 3", value: "0N}", label: "Virus Blocked — Network Secured!" },
      ],
      extraCommands: {
        "show-rules": () => ({
          lines: [
            "FIREWALL RULES:",
            "  ✓ ALLOW: Messages from known senders (teachers, students)",
            "  ✗ BLOCK: Messages from unknown strangers",
            "  ✗ BLOCK: Messages from known viruses or malware",
            "",
            "Inspect each message: inspect 1, inspect 2, inspect 3",
          ],
        }),
        inspect: (args) => {
          const n = args[0];
          const msgs: Record<string, string> = {
            "1": "Message 1: SUSPICIOUS! From unknown stranger. Wants to read ALL files. This should be BLOCKED.",
            "2": "Message 2: SAFE! From teacher@academy.edu (known address). Wants homework files only. This should be ALLOWED.",
            "3": "Message 3: DANGEROUS! From VIRUS.BAD. Trying to delete system files! This should be BLOCKED.",
          };
          return { lines: [msgs[n] || "Unknown message number."] };
        },
        allow: (args) => {
          const n = args[0];
          if (n === "2") return { lines: ["✓ Message 2 ALLOWED — Teacher's request is safe. Homework files shared."] };
          return { lines: [`Message ${n} should be BLOCKED, not allowed! Check the rules again.`] };
        },
        block: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["✓ Message 1 BLOCKED — Unknown stranger turned away!"] };
          if (n === "3") return { lines: ["✓ Message 3 BLOCKED — Virus stopped at the firewall! Run 'assemble'."] };
          return { lines: [`Message ${n} doesn't need to be blocked. Check the rules.`] };
        },
      },
    },
  },

  // ─── BT-08: Ports ────────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Building", location: "CyberVille", era: "Today", emoji: "🚪" },
    id: "bt-08",
    order: 8,
    title: "Doors Have Numbers Too",
    subtitle: "What are Ports?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-08", name: "Port Patrol", emoji: "🚪" },
    challengeType: "ctf",
    info: {
      tagline: "Your computer has thousands of numbered doors called ports — different apps use different doors.",
      year: 2025,
      overview: [
        "Think about a big apartment building. There's one street address, but inside there are many apartments — apartment 1, apartment 2, and so on. Ports are like apartment numbers for your computer! Your computer has one IP address, but thousands of numbered ports.",
        "Different programs use different port numbers. When you visit a website, your computer uses port 80 or 443. When your email arrives, it uses port 25. This way, many programs can all share the same computer without getting confused.",
        "Most ports are closed and locked — they don't need to be open. Security experts always close ports that aren't being used, because open ports can be entry points for hackers.",
      ],
      technical: {
        title: "Important Port Numbers to Know",
        body: [
          "Port numbers go from 0 to 65,535 (that's a lot of doors!). The most important ones have been given names: port 80 is for websites (HTTP), port 443 is for secure websites (HTTPS), port 22 is for SSH (secure remote control), and port 25 is for email.",
          "Your firewall controls which ports are open and which are closed. If a port is closed, no program can receive messages through it — the messages just bounce back. This is a key part of keeping computers safe.",
        ],
        codeExample: {
          label: "Famous port numbers",
          code: `  PORT 80   → Websites (http://)
  PORT 443  → Secure websites (https://)
  PORT 22   → Remote computer control (SSH)
  PORT 25   → Email delivery
  PORT 3389 → Windows remote desktop

  If nobody needs email, close port 25!
  Fewer open doors = harder to break in.

  Apartment building analogy:
  IP Address = building address
  Port = apartment number`,
        },
      },
      incident: {
        title: "WannaCry — A Virus That Walked Through an Open Door",
        when: "May 2017",
        where: "Worldwide — hospitals, companies, government offices",
        impact: "Over 200,000 computers infected in 150 countries",
        body: [
          "In 2017, a dangerous virus called WannaCry spread to over 200,000 computers in just a few days. It got in through port 445, which was left open on computers that hadn't been updated.",
          "Hospitals were hit hard — some had to turn away patients because their computers were locked! The fix was simple in hindsight: close port 445 if you're not using it, and keep your computer updated. Both lessons teach the same thing: unnecessary open ports are a danger.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Computer", sub: "one IP address", type: "attacker" },
          { label: "Many Ports", sub: "like apartment doors", type: "system" },
          { label: "Each App Uses Its Port", sub: "browser → 443, email → 25", type: "victim" },
          { label: "Unused Ports Stay Closed", sub: "fewer open doors = safer", type: "result" },
        ],
      },
      timeline: [
        { year: 1982, event: "Port numbers standardized so all computers agree on which number means what" },
        { year: 2017, event: "WannaCry ransomware spreads through open port 445 — 200,000 computers hit", highlight: true },
        { year: 2025, event: "Security best practice: always close ports you don't need" },
      ],
      keyTakeaways: [
        "Ports are like numbered doors on your computer — each app uses a different door",
        "Port 80 = websites, port 443 = secure websites, port 22 = remote control",
        "Closed ports can't be attacked — always close ports you don't use",
        "Leaving unnecessary ports open is like leaving a door unlocked",
      ],
      references: [
        { title: "What is a Port? — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/" },
      ],
    },
    ctf: {
      scenario: "The Academy server has some ports open that should be closed! Check which ports are open, identify the unnecessary ones, and close them.",
      hint: "Find the ports that shouldn't be open and close them.",
      hints: [
        "Scan all ports. Run: scan-ports",
        "See which ones are needed. Run: check-needed",
        "Close unnecessary port 23. Run: close 23",
        "Close unnecessary port 8080. Run: close 8080",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/port-scan.txt": [
          "OPEN PORTS ON ACADEMY SERVER",
          "=============================",
          "Port 22   — SSH (needed for remote admin) ✓",
          "Port 23   — Telnet (old, insecure, NOT needed) ✗",
          "Port 443  — HTTPS (needed for website) ✓",
          "Port 8080 — Old test server (NOT needed) ✗",
          "",
          "Commands: scan-ports | check-needed | close <port>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "port-scan.txt", isDir: false }],
      },
      fragments: [
        { trigger: "scan-ports", value: "FLAG{P0RT_", label: "Ports Scanned" },
        { trigger: "close 23", value: "CL0S3D_", label: "Insecure Port Closed" },
        { trigger: "close 8080", value: "S4F3}", label: "Unnecessary Port Closed — Server Secured!" },
      ],
      extraCommands: {
        "scan-ports": () => ({
          lines: [
            "PORT SCAN RESULTS:",
            "  Port 22:   OPEN — SSH (remote admin)",
            "  Port 23:   OPEN — Telnet (insecure!)",
            "  Port 443:  OPEN — HTTPS (website)",
            "  Port 8080: OPEN — Old test server",
            "",
            "Run: check-needed to see which are necessary.",
          ],
        }),
        "check-needed": () => ({
          lines: [
            "NEEDED PORTS:",
            "  Port 22:  ✓ SSH — needed for admin",
            "  Port 443: ✓ HTTPS — needed for website",
            "",
            "NOT NEEDED:",
            "  Port 23:   ✗ Telnet — old and insecure, should be closed",
            "  Port 8080: ✗ Old test server — not used, should be closed",
            "",
            "Close them: close 23 and close 8080",
          ],
        }),
        close: (args) => {
          const port = args[0];
          if (port === "23") return { lines: ["✓ Port 23 (Telnet) CLOSED! Old insecure door is now locked."] };
          if (port === "8080") return { lines: ["✓ Port 8080 (Old test server) CLOSED! Unnecessary door locked. Run 'assemble'."] };
          return { lines: [`Port ${port} is needed — don't close it. Close 23 and 8080 instead.`] };
        },
      },
    },
  },

  // ─── BT-09: Subnets ──────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Neighborhoods", location: "CyberVille", era: "Today", emoji: "🏘️" },
    id: "bt-09",
    order: 9,
    title: "The School Has Different Wings",
    subtitle: "What is a Subnet?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-09", name: "Network Mapper", emoji: "🏘️" },
    challengeType: "ctf",
    info: {
      tagline: "A subnet divides a big network into smaller groups — like how a school has different wings or floors.",
      year: 2025,
      overview: [
        "Your school has different areas — maybe a math wing, a science wing, and a gym. Students in the math wing mostly stay there, and only go to the science wing when they need to. Networks have the same idea, called subnets!",
        "A subnet is a smaller group of computers inside a bigger network. The computers in one subnet can talk to each other easily. To talk to computers in a different subnet, the message has to go through a router first.",
        "This is really useful for security! If someone sneaks into one part of the network, the subnets keep them from easily getting to all the other parts. It's like having locked doors between school wings.",
      ],
      technical: {
        title: "How Subnets Help Security",
        body: [
          "In a home, all your devices are usually in one subnet. In a school or company, different subnets might separate students from teachers, or separate the finance department from engineering.",
          "If a hacker gets into the student subnet, they still can't reach the teacher subnet without getting through a router with firewall rules. Subnets are like compartments in a submarine — if one floods, the others are protected!",
        ],
        codeExample: {
          label: "Subnets in a school network",
          code: `  CYBER ACADEMY SUBNETS:

  Student Computers:  10.0.1.0 - 10.0.1.255
  Teacher Computers:  10.0.2.0 - 10.0.2.255
  Admin Computers:    10.0.3.0 - 10.0.3.255
  Guest WiFi:         10.0.4.0 - 10.0.4.255

  Students can't see teacher files!
  Guests can't reach admin computers!
  Each group is in its own safe zone.`,
        },
      },
      incident: {
        title: "The Store That Didn't Use Subnets",
        when: "2013",
        where: "Target stores, United States",
        impact: "40 million credit card numbers stolen",
        body: [
          "In 2013, hackers broke into Target's network through a heating and cooling company that had computer access. Because Target's network had no subnets separating the heating computers from the payment computers, the hackers could reach everything!",
          "They stole 40 million credit card numbers. If Target had used subnets — keeping heating computers in one zone and payment computers in another — the hackers would have been stopped. Subnets would have been the locked door that saved them.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Subnet A (Students)", sub: "can't reach Subnet B", type: "attacker" },
          { label: "Router Between Subnets", sub: "controls who crosses over", type: "system" },
          { label: "Subnet B (Teachers)", sub: "protected from students", type: "victim" },
          { label: "If A is hacked", sub: "B stays safe!", type: "result" },
        ],
      },
      timeline: [
        { year: 1985, event: "Subnets invented to organize large networks" },
        { year: 2013, event: "Target breach — no subnets meant hackers could reach everything", highlight: true },
        { year: 2025, event: "All good network designs use subnets to protect sensitive areas" },
      ],
      keyTakeaways: [
        "A subnet divides a network into smaller, separate groups",
        "Computers in different subnets must go through a router to talk to each other",
        "Subnets improve security by limiting how far a hacker can move",
        "Good networks separate sensitive areas (like payment systems) into their own subnets",
      ],
      references: [
        { title: "What is a Subnet? — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/" },
      ],
    },
    ctf: {
      scenario: "The Academy network needs to be divided into 3 subnets: Students, Teachers, and Guests. Assign each computer to the right subnet to secure the network.",
      hint: "Assign computers to their correct subnets.",
      hints: [
        "See all computers. Run: list-computers",
        "See the subnet plan. Run: subnet-plan",
        "Assign student computer. Run: assign SC-1 students",
        "Assign teacher computer. Run: assign TC-1 teachers",
        "Assign guest device. Run: assign GD-1 guests",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/network-plan.txt": [
          "ACADEMY NETWORK — SUBNET PLAN",
          "==============================",
          "Computers to assign:",
          "  SC-1: Student laptop",
          "  TC-1: Teacher's computer",
          "  GD-1: Parent visiting (guest)",
          "",
          "Subnets: students | teachers | guests",
          "Commands: list-computers | subnet-plan | assign <device> <subnet>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "network-plan.txt", isDir: false }],
      },
      fragments: [
        { trigger: "subnet-plan", value: "FLAG{SUBN3T_", label: "Subnet Plan Reviewed" },
        { trigger: "assign SC-1 students", value: "Z0N3_", label: "Student Computer Assigned" },
        { trigger: "assign GD-1 guests", value: "S3CUR3}", label: "All Devices Assigned — Network Secured!" },
      ],
      extraCommands: {
        "list-computers": () => ({
          lines: [
            "COMPUTERS WAITING FOR SUBNET ASSIGNMENT:",
            "  SC-1 — Student laptop (belongs with students)",
            "  TC-1 — Teacher's computer (belongs with teachers)",
            "  GD-1 — Parent's device (belongs with guests)",
            "",
            "Run: subnet-plan to see the plan.",
          ],
        }),
        "subnet-plan": () => ({
          lines: [
            "SUBNET PLAN:",
            "  students: 10.0.1.x — only student computers",
            "  teachers: 10.0.2.x — only teacher computers",
            "  guests:   10.0.4.x — visitors, no access to school files",
            "",
            "Assign each device: assign <device> <subnet>",
          ],
        }),
        assign: (args) => {
          const device = args[0];
          const subnet = args[1];
          const correct: Record<string, string> = { "SC-1": "students", "TC-1": "teachers", "GD-1": "guests" };
          if (correct[device] === subnet) {
            return { lines: [`✓ ${device} assigned to ${subnet} subnet! Correct!`] };
          }
          return { lines: [`✗ ${device} doesn't belong in ${subnet}. Think about what kind of device it is.`] };
        },
      },
    },
  },

  // ─── BT-10: Protocols ────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Playground", location: "CyberVille", era: "Today", emoji: "🎮" },
    id: "bt-10",
    order: 10,
    title: "Speaking the Same Language",
    subtitle: "What is a Protocol?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-10", name: "Protocol Pioneer", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "Protocols are agreed rules that let computers talk to each other — like the rules of a game everyone has to follow.",
      year: 2025,
      overview: [
        "Imagine two kids who want to play a game, but one speaks only English and the other speaks only Spanish. They need a shared language to play together! Protocols are the shared languages that computers use so they can understand each other.",
        "A protocol is a set of rules that says: 'Here's exactly how we send messages, how we start conversations, and how we end them.' If both computers follow the same rules, they can communicate perfectly even if they're made by different companies.",
        "The most important protocols on the internet are called TCP and IP. TCP makes sure messages arrive completely and in order. IP handles addressing (getting messages to the right computer). Together, TCP/IP is the language of the internet.",
      ],
      technical: {
        title: "Two Important Protocols: TCP and UDP",
        body: [
          "TCP is like sending a registered letter — you get a confirmation that every piece arrived safely, and if something is missing, it gets resent. Websites use TCP because all the content needs to arrive perfectly.",
          "UDP is like shouting across a field — it's fast but you don't always know if the other person heard you. Games and video calls use UDP because a tiny bit of missing data is okay, but slowness is not.",
        ],
        codeExample: {
          label: "TCP vs UDP — when to use which",
          code: `  TCP — reliable, confirms delivery:
  ✓ Loading websites
  ✓ Downloading files
  ✓ Sending emails
  (We need every piece to arrive!)

  UDP — fast, no confirmation:
  ✓ Video calls (Zoom, FaceTime)
  ✓ Online games (Minecraft, Roblox)
  ✓ Live streaming
  (Speed matters more than perfection!)`,
        },
      },
      incident: {
        title: "When Rules Are Broken — SYN Flood Attack",
        when: "1996 and still happening today",
        where: "Servers across the internet",
        impact: "Servers get overwhelmed and crash",
        body: [
          "TCP has a rule: when you start a connection, you shake hands. Computer A says 'Hello!' (SYN). Server says 'Hello back!' (SYN-ACK). Computer A says 'Got it!' (ACK). Then they talk.",
          "A SYN flood attack sends millions of 'Hello!' messages but never completes the handshake. The server is left waiting for millions of 'Got it!' responses that never come. It gets so busy waiting that it can't talk to real users. Knowing the rules helps us understand how attackers break them.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Computer A", sub: "speaks TCP/IP", type: "attacker" },
          { label: "Protocol Rules", sub: "the agreed language", type: "system" },
          { label: "Computer B", sub: "also speaks TCP/IP", type: "victim" },
          { label: "They Understand Each Other!", sub: "communication works", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "TCP/IP invented — the language of the internet" },
        { year: 1983, event: "All internet computers switch to TCP/IP" },
        { year: 2025, event: "Every message you send online uses TCP/IP", highlight: true },
      ],
      keyTakeaways: [
        "Protocols are rules that let computers speak the same language",
        "TCP delivers messages reliably and in order — used for websites and files",
        "UDP is faster but doesn't guarantee delivery — used for games and video calls",
        "Knowing protocols helps us understand both how to use networks and how to protect them",
      ],
      references: [
        { title: "TCP/IP Explained — Cloudflare", url: "https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/" },
      ],
    },
    ctf: {
      scenario: "Two Academy computers are trying to send data but something went wrong. One is using TCP (needs to be perfect) and one is using UDP (needs to be fast). Match each file type to the right protocol.",
      hint: "Match each file type to the right protocol.",
      hints: [
        "See the files waiting. Run: list-files",
        "Check which needs TCP. Run: info homework.pdf",
        "Check which needs UDP. Run: info game-update",
        "Send each correctly: send homework.pdf tcp and send game-update udp",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/files-to-send.txt": [
          "FILES WAITING TO BE SENT",
          "========================",
          "homework.pdf     — must arrive PERFECT, not a byte missing!",
          "game-update      — needs to be FAST, tiny errors OK",
          "video-call-data  — speed matters most",
          "test-scores.xlsx — must arrive PERFECT",
          "",
          "Commands: list-files | info <file> | send <file> <tcp|udp>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "files-to-send.txt", isDir: false }],
      },
      fragments: [
        { trigger: "list-files", value: "FLAG{PR0T0C0L_", label: "Files Listed" },
        { trigger: "send homework.pdf tcp", value: "TCPvUDP_", label: "File Sent via Correct Protocol" },
        { trigger: "send game-update udp", value: "M4ST3R}", label: "All Files Sent Correctly — Protocol Expert!" },
      ],
      extraCommands: {
        "list-files": () => ({
          lines: [
            "FILES WAITING:",
            "  homework.pdf     — student homework",
            "  game-update      — game data",
            "  video-call-data  — live video",
            "  test-scores.xlsx — grade data",
            "",
            "Use: info <file> to see what protocol it needs.",
          ],
        }),
        info: (args) => {
          const file = args[0];
          const info: Record<string, string> = {
            "homework.pdf": "homework.pdf: Must arrive PERFECTLY. Every word matters. Use TCP.",
            "game-update": "game-update: Speed is most important. A tiny glitch is OK. Use UDP.",
            "video-call-data": "video-call-data: Live video — speed over perfection. Use UDP.",
            "test-scores.xlsx": "test-scores.xlsx: Grade data — must be exact! Use TCP.",
          };
          return { lines: [info[file] || "Unknown file."] };
        },
        send: (args) => {
          const file = args[0];
          const protocol = args[1];
          const correct: Record<string, string> = {
            "homework.pdf": "tcp",
            "game-update": "udp",
            "video-call-data": "udp",
            "test-scores.xlsx": "tcp",
          };
          if (correct[file] === protocol) {
            return { lines: [`✓ ${file} sent via ${protocol.toUpperCase()} — correct choice! Run 'assemble' after all are sent.`] };
          }
          return { lines: [`✗ Wrong protocol for ${file}. Think: does it need to be perfect or just fast?`] };
        },
      },
    },
  },
];
