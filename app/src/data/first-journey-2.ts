import type { StageConfig } from "./types";

export const firstJourneyStages2: StageConfig[] = [

  // ─── BT-11: HTTP vs HTTPS ────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Mailbox", location: "CyberVille", era: "Today", emoji: "📪" },
    id: "bt-11",
    order: 11,
    title: "Sealed Envelopes vs Postcards",
    subtitle: "HTTP vs HTTPS — What's the Difference?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-11", name: "HTTPS Hero", emoji: "🔒" },
    challengeType: "ctf",
    info: {
      tagline: "HTTP is a postcard anyone can read. HTTPS is a sealed envelope — only you and the website can see inside.",
      year: 2025,
      overview: [
        "When you send a postcard, anyone who handles it — the mail carrier, the sorting center, everyone — can read what you wrote. But a sealed envelope only lets the intended person read it. The internet has the same two choices: HTTP and HTTPS.",
        "HTTP (without the S) is like a postcard. Messages travel in plain text, and anyone watching the network could read them. HTTPS (with the S) encrypts your data — scrambles it so only you and the website can read it.",
        "Look at your browser's address bar. Does it start with https:// and show a lock icon? That means you're protected. Always check for the lock before typing passwords or personal information!",
      ],
      technical: {
        title: "How HTTPS Scrambles Your Data",
        body: [
          "HTTPS uses encryption to scramble your data. Encryption turns your message into random-looking gibberish that only the website can unscramble. Even if someone intercepts it, they see nothing useful.",
          "The encryption in HTTPS is called TLS (Transport Layer Security). When you see the lock icon in your browser, TLS is working and your connection is secure.",
        ],
        codeExample: {
          label: "HTTP vs HTTPS — what eavesdroppers see",
          code: `  HTTP (no lock — anyone can read!):
  You typed: password123
  What travels the network: password123

  HTTPS (lock icon — encrypted!):
  You typed: password123
  What travels: xQ7#kL!9pR2$mN  ← gibberish!

  Always look for 🔒 before typing passwords!`,
        },
      },
      incident: {
        title: "The Firesheep Problem",
        when: "2010",
        where: "Coffee shops with public WiFi",
        impact: "Anyone could steal other people's logins over HTTP",
        body: [
          "In 2010, a tool called Firesheep showed how easy it was to steal login sessions over HTTP. At a coffee shop with public WiFi, anyone running Firesheep could see and steal other people's session cookies — instantly accessing their accounts.",
          "This scared many companies into switching to HTTPS. Today, all major websites use HTTPS. If a site still uses plain HTTP, your browser warns you with 'Not Secure.' That warning is there to protect you.",
        ],
      },
      diagram: {
        nodes: [
          { label: "HTTP", sub: "no lock — plaintext", type: "attacker" },
          { label: "Eavesdropper", sub: "can read everything!", type: "system" },
          { label: "HTTPS", sub: "lock — encrypted", type: "victim" },
          { label: "Eavesdropper sees gibberish", sub: "can't read a thing", type: "result" },
        ],
      },
      timeline: [
        { year: 1991, event: "HTTP invented — the web's first language, no encryption" },
        { year: 1994, event: "HTTPS invented so people could safely shop and bank online" },
        { year: 2018, event: "Chrome marks all HTTP sites as 'Not Secure'", highlight: true },
      ],
      keyTakeaways: [
        "HTTP is like a postcard — anyone can read it as it travels",
        "HTTPS is encrypted — only you and the website can read the data",
        "Always check for the 🔒 lock icon before entering passwords",
        "Never type personal information on a site without HTTPS",
      ],
      references: [
        { title: "HTTPS Explained — Mozilla", url: "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS" },
      ],
    },
    ctf: {
      scenario: "Two login pages are open. One is HTTP (dangerous) and one is HTTPS (safe). Identify which is safe and log in only through the secure one.",
      hint: "Find which site has HTTPS and use that one.",
      hints: [
        "Check both sites. Run: check-sites",
        "Inspect site A. Run: inspect site-a",
        "Inspect site B. Run: inspect site-b",
        "Log into the safe site. Run: login site-b",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/login-sites.txt": [
          "TWO LOGIN SITES FOUND",
          "=====================",
          "Site A: http://academy-login.fake.com  (no lock)",
          "Site B: https://academy.edu/login      (has lock ✓)",
          "",
          "Commands: check-sites | inspect <site> | login <site>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "login-sites.txt", isDir: false }] },
      fragments: [
        { trigger: "check-sites", value: "FLAG{HTTPS_", label: "Sites Found" },
        { trigger: "inspect site-b", value: "L0CK_", label: "Secure Site Identified" },
        { trigger: "login site-b", value: "SAF3}", label: "Logged in Safely via HTTPS!" },
      ],
      extraCommands: {
        "check-sites": () => ({ lines: ["Site A: HTTP — no lock. Dangerous!", "Site B: HTTPS — lock icon ✓. Safe!", "Inspect each: inspect site-a or inspect site-b"] }),
        inspect: (args) => {
          const site = args[0];
          if (site === "site-a") return { lines: ["Site A: HTTP — NO encryption. Dangerous on public WiFi. Do not log in here!"] };
          if (site === "site-b") return { lines: ["Site B: HTTPS — Fully encrypted. Lock icon confirmed. Safe to log in."] };
          return { lines: ["Unknown site."] };
        },
        login: (args) => {
          if (args[0] === "site-b") return { lines: ["✓ Logged into https://academy.edu/login safely! Your password was encrypted. Run 'assemble'."] };
          if (args[0] === "site-a") return { lines: ["✗ DANGER! HTTP site — not safe. Use site-b instead."] };
          return { lines: ["Unknown site."] };
        },
      },
    },
  },

  // ─── BT-12: Browsers ─────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Computer Lab", location: "CyberVille", era: "Today", emoji: "💻" },
    id: "bt-12",
    order: 12,
    title: "Your Magic Window",
    subtitle: "What is a Web Browser?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-12", name: "Browser Guard", emoji: "💻" },
    challengeType: "ctf",
    info: {
      tagline: "A browser is the app you use to visit websites — and it works hard to keep you safe while you explore.",
      year: 2025,
      overview: [
        "A web browser (Chrome, Firefox, Safari, Edge) is the app you use to look at websites. When you type a web address and press Enter, the browser fetches the website and shows it on your screen.",
        "Browsers do much more than just show pages. They check if a website is safe, warn you before you visit dangerous sites, and block harmful pop-ups. Think of your browser as a guide that takes you where you want to go and protects you along the way.",
        "When you type https://google.com and press Enter, your browser asks DNS for Google's address, connects securely, receives the page code, and draws it for you — all in less than a second!",
      ],
      technical: {
        title: "Reading a Web Address (URL)",
        body: [
          "A URL (web address) has parts: https:// means use HTTPS (secure). www.academy.edu is the website name. /students/homework tells the server which specific page you want.",
          "Your browser reads every part and uses it to fetch exactly the right page from the right server. If any part looks wrong or suspicious, a good browser warns you.",
        ],
        codeExample: {
          label: "Parts of a web address",
          code: `  https://www.academy.edu/students/homework

  https://   → use HTTPS (secure connection)
  www.       → world wide web
  academy.edu → the website's name
  /students/  → the section of the site
  homework    → the specific page

  Like directions to a room:
  Building: academy.edu
  Floor: students
  Room: homework`,
        },
      },
      incident: {
        title: "Malicious Code Hidden in a Website",
        when: "2018",
        where: "British Airways website",
        impact: "500,000 customer credit card numbers stolen",
        body: [
          "In 2018, hackers secretly added bad code to the British Airways website. When customers typed their credit card numbers to buy tickets, the hidden code sent copies to the hackers — all while the real site worked normally.",
          "Keeping browsers updated helps prevent this. Modern browsers detect and block many types of suspicious code. Always update your browser to get the latest protections.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You type URL", sub: "what page do you want?", type: "attacker" },
          { label: "Browser asks DNS", sub: "what's the server address?", type: "system" },
          { label: "Browser fetches page", sub: "server sends the code", type: "victim" },
          { label: "Browser draws the page", sub: "you see the website!", type: "result" },
        ],
      },
      timeline: [
        { year: 1993, event: "First popular web browser invented — the web becomes visual" },
        { year: 2008, event: "Google Chrome released — now used by most people" },
        { year: 2025, event: "Browsers have built-in security, privacy tools, and warnings", highlight: true },
      ],
      keyTakeaways: [
        "A browser fetches and displays websites — Chrome, Firefox, Safari are all browsers",
        "The URL tells the browser exactly what page to get and how to get it securely",
        "Browsers check if websites are safe and warn you about dangerous ones",
        "Always keep your browser updated — updates fix security problems",
      ],
      references: [
        { title: "How Browsers Work — web.dev", url: "https://web.dev/articles/howbrowserswork" },
      ],
    },
    ctf: {
      scenario: "Three websites are open in the browser. Two are safe, one shows a security warning. Find the dangerous one and report it.",
      hint: "Check each site's safety and report the dangerous one.",
      hints: [
        "List open tabs. Run: list-tabs",
        "Check tab 1. Run: check 1",
        "Check tabs 2 and 3. Run: check 2 and check 3",
        "Report the bad site. Run: report 2",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/open-tabs.txt": [
          "OPEN BROWSER TABS",
          "==================",
          "Tab 1: https://academy.edu/news      (Academy news) ✓",
          "Tab 2: http://free-prizes.bad.com     (no lock, suspicious!) ✗",
          "Tab 3: https://kryptoscronos.com      (training site) ✓",
          "",
          "Commands: list-tabs | check <n> | report <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "open-tabs.txt", isDir: false }] },
      fragments: [
        { trigger: "list-tabs", value: "FLAG{BR0WS3R_", label: "Tabs Listed" },
        { trigger: "check 2", value: "WARN1NG_", label: "Dangerous Site Identified" },
        { trigger: "report 2", value: "R3P0RT3D}", label: "Dangerous Site Reported!" },
      ],
      extraCommands: {
        "list-tabs": () => ({ lines: ["Tab 1: https://academy.edu/news (locked ✓)", "Tab 2: http://free-prizes.bad.com (NO lock ✗)", "Tab 3: https://kryptoscronos.com (locked ✓)", "", "Check each: check 1, check 2, check 3"] }),
        check: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["Tab 1: SAFE ✓ — HTTPS, known domain."] };
          if (n === "2") return { lines: ["Tab 2: DANGEROUS ✗ — HTTP, suspicious domain, browser warning! Report this."] };
          if (n === "3") return { lines: ["Tab 3: SAFE ✓ — HTTPS, known training site."] };
          return { lines: ["Unknown tab."] };
        },
        report: (args) => {
          if (args[0] === "2") return { lines: ["✓ Tab 2 reported and blocked! Good spotting! Run 'assemble'."] };
          return { lines: [`Tab ${args[0]} is safe. Find the dangerous one first.`] };
        },
      },
    },
  },

  // ─── BT-13: Clients and Servers ──────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Cafeteria", location: "CyberVille", era: "Today", emoji: "🍽️" },
    id: "bt-13",
    order: 13,
    title: "Who Asks and Who Answers",
    subtitle: "Clients and Servers",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-13", name: "Client-Server Agent", emoji: "🍽️" },
    challengeType: "ctf",
    info: {
      tagline: "Your computer is the customer who asks. A server is the powerful computer that answers — like a cafeteria server who brings your lunch.",
      year: 2025,
      overview: [
        "In a cafeteria, you ask for what you want and the server brings it. Online, your device is the client (the one asking), and a server is a powerful computer that stores information and sends it back to you.",
        "When you visit a website, your browser asks the server for the page. The server finds the page and sends it back. This ask-and-answer happens millions of times every second across the internet.",
        "Servers run 24 hours a day, 7 days a week, always ready to answer requests from clients anywhere in the world. A single website might use hundreds of servers working together.",
      ],
      technical: {
        title: "The Request and Response",
        body: [
          "Every time you click a link, your browser sends a request: 'Please send me this page.' The server sends a response: 'Here it is!' A single webpage might involve hundreds of small requests — one for the text, one for each image, one for each button.",
          "Servers must check if clients are allowed to see what they're asking for. If a server just sends any file to any request without checking, people could access private information they shouldn't see.",
        ],
        codeExample: {
          label: "Client and server conversation",
          code: `  YOUR BROWSER (client):
  "Please give me the homepage"

  GOOGLE'S SERVER:
  "Here it is!" → sends the page

  YOUR BROWSER:
  "Please give me the Google logo image"

  GOOGLE'S SERVER:
  "Here's the image!" → sends it

  One webpage = many small asks and answers!`,
        },
      },
      incident: {
        title: "When Servers Trust Clients Too Much (IDOR)",
        when: "A common web vulnerability",
        where: "Websites everywhere",
        impact: "Users can access others' private data",
        body: [
          "A vulnerability called IDOR (Insecure Direct Object Reference) happens when a server gives clients whatever they ask for without checking ownership. If you can see your file at page?id=101, can you see page?id=102 (someone else's file)?",
          "Good servers always verify: 'Is this client allowed to see what they're requesting?' — not just 'Do they know the address?'",
        ],
      },
      diagram: {
        nodes: [
          { label: "Client (your browser)", sub: "sends a request", type: "attacker" },
          { label: "Internet", sub: "request travels here", type: "system" },
          { label: "Server", sub: "receives and answers", type: "victim" },
          { label: "Response sent back", sub: "client shows the result", type: "result" },
        ],
      },
      timeline: [
        { year: 1991, event: "First web server created — computers start serving pages" },
        { year: 2025, event: "Cloud servers host most websites and apps globally", highlight: true },
      ],
      keyTakeaways: [
        "Clients ask for things; servers find and send back the answers",
        "Your browser is a client; websites run on servers",
        "Every page, image, and video is a separate request from client to server",
        "Servers must check if clients are allowed to see what they ask for",
      ],
      references: [
        { title: "HTTP Overview — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
      ],
    },
    ctf: {
      scenario: "The Academy lunch system has a bug — students can view meal records that belong to other students! Test it, confirm the bug, and report it.",
      hint: "Test the system and find the security bug.",
      hints: [
        "Request your meal. Run: request meal 101",
        "Try someone else's. Run: request meal 102",
        "Check if the server stopped you. Run: check-access",
        "Report the bug. Run: report-bug",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/meal-system.txt": [
          "ACADEMY MEAL SYSTEM",
          "====================",
          "Your meal ID: 101",
          "Bug to find: can you see ID 102?",
          "",
          "Commands: request meal <id> | check-access | report-bug",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "meal-system.txt", isDir: false }] },
      fragments: [
        { trigger: "request meal 101", value: "FLAG{CL13NT_", label: "Your Meal Requested" },
        { trigger: "request meal 102", value: "S3RV3R_", label: "Bug Found — Unauthorized Access" },
        { trigger: "report-bug", value: "BUG}", label: "Bug Reported — Fixed!" },
      ],
      extraCommands: {
        request: (args) => {
          if (args[0] === "meal") {
            const id = args[1];
            if (id === "101") return { lines: ["Your meal (101): Spaghetti 🍝 — Correct!"] };
            return { lines: [`⚠️ BUG: You can see Student ${id}'s meal! The server didn't check ownership.`] };
          }
          return { lines: ["Usage: request meal <id>"] };
        },
        "check-access": () => ({ lines: ["Meal 101 (yours): ✓ Should be accessible", "Meal 102 (other): ✗ BUG! You accessed someone else's record", "Run: report-bug"] }),
        "report-bug": () => ({ lines: ["✓ BUG REPORTED: Server doesn't verify ownership before serving data.", "Security team notified. Fix in progress.", "Run 'assemble' to claim your reward!"] }),
      },
    },
  },

  // ─── BT-14: TLS Certificates ─────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Reception Desk", location: "CyberVille", era: "Today", emoji: "🪪" },
    id: "bt-14",
    order: 14,
    title: "Checking the ID Badge",
    subtitle: "What is a Security Certificate?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-14", name: "Certificate Checker", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "TLS certificates are ID badges for websites — they prove the site is really who it claims to be.",
      year: 2025,
      overview: [
        "Before trusting a stranger with a secret, you'd check their ID. What if someone built a fake bank website to steal your password? TLS certificates are how real websites prove their identity.",
        "When you visit https://yourbank.com, your browser checks the site's certificate — like checking an official ID badge. If it's real and valid, the lock icon appears. If it's fake or expired, your browser shows a big warning.",
        "Never ignore browser security warnings about certificates. Your browser is protecting you from fake sites.",
      ],
      technical: {
        title: "What a Certificate Contains",
        body: [
          "A certificate includes: the website's name, who issued it (a Certificate Authority), and when it expires. Certificate Authorities (CAs) are trusted companies that verify you own a website before giving you a certificate — like a government checking identity before issuing a passport.",
          "If the certificate name doesn't match the site you're visiting, or it's expired, your browser blocks the connection. This protects you even if DNS was poisoned to send you to the wrong server.",
        ],
        codeExample: {
          label: "What a TLS certificate looks like",
          code: `  CERTIFICATE FOR academy.edu:
  ──────────────────────────────
  Issued to:   academy.edu
  Issued by:   Let's Encrypt (trusted CA)
  Valid until: December 2025
  ──────────────────────────────
  ✓ Name matches → safe
  ✓ Not expired  → safe
  ✓ Trusted CA   → safe
  → 🔒 Lock icon appears!

  If anything is wrong → ⚠️ Browser Warning!`,
        },
      },
      incident: {
        title: "DigiNotar — When a Certificate Authority Was Hacked",
        when: "2011",
        where: "Netherlands",
        impact: "Fake certificates let hackers spy on 300,000 people",
        body: [
          "In 2011, hackers broke into a Certificate Authority called DigiNotar and issued fake certificates for popular sites like Google. With fake certificates, they could trick people's browsers into showing the lock icon on a fake site.",
          "About 300,000 people had their internet traffic spied on. DigiNotar was shut down. All browsers now quickly remove CAs that misbehave.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Website has certificate", sub: "like an ID badge", type: "attacker" },
          { label: "Browser checks it", sub: "real and valid?", type: "system" },
          { label: "Trusted CA approves it", sub: "certificate authority verifies", type: "victim" },
          { label: "Lock icon appears ✓", sub: "connection is safe", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "TLS certificates invented — websites can prove their identity" },
        { year: 2011, event: "DigiNotar hacked — fake certificates issued; company shut down", highlight: true },
        { year: 2016, event: "Let's Encrypt launches — free certificates for every website" },
      ],
      keyTakeaways: [
        "TLS certificates are ID badges for websites",
        "Your browser automatically checks certificates when you visit HTTPS sites",
        "Expired or mismatched certificates trigger browser warnings — never ignore them",
        "Certificate Authorities verify website identity before issuing certificates",
      ],
      references: [
        { title: "TLS Certificates — Cloudflare", url: "https://www.cloudflare.com/learning/ssl/what-is-ssl/" },
      ],
    },
    ctf: {
      scenario: "Three sites want to connect to Cyber Academy. Check each certificate — approve real ones, reject fake or expired ones.",
      hint: "Check each certificate and decide: approve or reject.",
      hints: [
        "Check site A. Run: check-cert site-a",
        "Check site B and C. Run: check-cert site-b and check-cert site-c",
        "Approve the valid one. Run: approve site-a",
        "Reject the others. Run: reject site-b and reject site-c",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/cert-queue.txt": [
          "CERTIFICATE REVIEW QUEUE",
          "=========================",
          "Site A: library.edu — check certificate",
          "Site B: libary.edu  — typo (fake?)",
          "Site C: gym.edu     — possibly expired",
          "",
          "Commands: check-cert <site> | approve <site> | reject <site>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "cert-queue.txt", isDir: false }] },
      fragments: [
        { trigger: "check-cert site-a", value: "FLAG{C3RT_", label: "Valid Certificate Found" },
        { trigger: "approve site-a", value: "V4L1D_", label: "Real Site Approved" },
        { trigger: "reject site-b", value: "F4K3_R3J3CT3D}", label: "Fake Site Rejected!" },
      ],
      extraCommands: {
        "check-cert": (args) => {
          const s = args[0];
          if (s === "site-a") return { lines: ["Site A (library.edu): ✓ Valid certificate, expires Dec 2025, issued to library.edu. Real!"] };
          if (s === "site-b") return { lines: ["Site B (libary.edu): ✗ MISMATCH — cert says library.edu but site is libary.edu. FAKE!"] };
          if (s === "site-c") return { lines: ["Site C (gym.edu): ✗ EXPIRED — certificate expired January 2025. Outdated!"] };
          return { lines: ["Unknown site."] };
        },
        approve: (args) => {
          if (args[0] === "site-a") return { lines: ["✓ Site A APPROVED — certificate is valid and trusted."] };
          return { lines: ["That site should be rejected, not approved. Check its certificate."] };
        },
        reject: (args) => {
          const s = args[0];
          if (s === "site-b") return { lines: ["✓ Site B REJECTED — fake domain, mismatched certificate. Blocked!"] };
          if (s === "site-c") return { lines: ["✓ Site C REJECTED — expired certificate. Run 'assemble'."] };
          return { lines: [`${s} should be approved, not rejected.`] };
        },
      },
    },
  },

  // ─── BT-15: Cookies and Sessions ─────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Club Room", location: "CyberVille", era: "Today", emoji: "🪙" },
    id: "bt-15",
    order: 15,
    title: "Your Membership Ticket",
    subtitle: "What are Cookies?",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-15", name: "Cookie Watcher", emoji: "🪙" },
    challengeType: "ctf",
    info: {
      tagline: "A cookie is a small ticket a website gives your browser so it remembers you — like a stamped hand at an amusement park.",
      year: 2025,
      overview: [
        "At an amusement park, you get your hand stamped so you can leave and come back without paying again. Websites give your browser a similar ticket called a cookie. When you log in, the site gives your browser a cookie, and every new page you visit shows that cookie so you stay logged in.",
        "Without cookies, you'd have to log in on every single page you visited! Cookies make the internet much more comfortable by remembering who you are.",
        "Cookies can be dangerous if they're not properly secured. If a hacker steals your cookie, they can log into your account without ever knowing your password.",
      ],
      technical: {
        title: "Secure Cookies vs. Insecure Cookies",
        body: [
          "A secure cookie has HttpOnly (JavaScript can't read it) and Secure (only sent over HTTPS) flags. Both are important. HttpOnly stops malicious scripts from stealing the cookie. Secure ensures it's never sent over unencrypted HTTP.",
          "Cookies also have expiry dates. Short-lived cookies (24 hours) are safer than ones lasting years — a stolen cookie becomes useless much sooner.",
        ],
        codeExample: {
          label: "What a cookie looks like",
          code: `  Cookie from academy.edu:
  ─────────────────────────
  Name:     session_token
  Value:    abc123xyz (your secret ID)
  Expires:  30 days
  HttpOnly: Yes ← JS can't steal it
  Secure:   Yes ← HTTPS only
  ─────────────────────────
  Every page load: browser sends this.
  Website sees it: "Welcome back!"`,
        },
      },
      incident: {
        title: "Cookie Theft — Account Takeover Without a Password",
        when: "It happens regularly",
        where: "Various websites",
        impact: "Hackers access accounts without needing passwords",
        body: [
          "If a hacker steals your session cookie, they can log into your account without knowing your password. They just present your stolen cookie to the website, and the website thinks it's you.",
          "This is why the HttpOnly flag is important — malicious scripts can't read cookies with this flag. And the Secure flag ensures cookies never travel over unencrypted connections where they could be intercepted.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You log in", sub: "site creates a cookie", type: "attacker" },
          { label: "Cookie stored", sub: "in your browser", type: "system" },
          { label: "New page loaded", sub: "browser sends cookie", type: "victim" },
          { label: "Website recognizes you!", sub: "no login needed again", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "Cookies invented — websites can now remember users" },
        { year: 2025, event: "Modern browsers give you cookie controls and privacy settings", highlight: true },
      ],
      keyTakeaways: [
        "Cookies are tickets websites give your browser so they remember you",
        "Without cookies, you'd have to log in on every single page",
        "HttpOnly and Secure flags protect cookies from theft",
        "Stolen cookies let hackers access accounts without passwords",
      ],
      references: [
        { title: "HTTP Cookies — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" },
      ],
    },
    ctf: {
      scenario: "The Academy issued three session cookies. One is properly secured, two have missing security flags. Identify and flag the insecure ones.",
      hint: "Inspect each cookie's security settings.",
      hints: [
        "Inspect cookie 1. Run: inspect-cookie 1",
        "Inspect cookies 2 and 3.",
        "Flag the insecure ones. Run: flag-insecure 2",
        "Flag the other insecure one. Run: flag-insecure 3",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/cookies.txt": [
          "ACADEMY SESSION COOKIES",
          "========================",
          "Cookie 1: session_A — properly secured",
          "Cookie 2: session_B — missing HttpOnly",
          "Cookie 3: session_C — missing Secure flag",
          "",
          "Commands: inspect-cookie <n> | flag-insecure <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "cookies.txt", isDir: false }] },
      fragments: [
        { trigger: "inspect-cookie 1", value: "FLAG{C00K13_", label: "Secure Cookie Found" },
        { trigger: "flag-insecure 2", value: "S3CUR3_", label: "Insecure Cookie Flagged" },
        { trigger: "flag-insecure 3", value: "CH3CK}", label: "All Insecure Cookies Flagged!" },
      ],
      extraCommands: {
        "inspect-cookie": (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["Cookie 1: ✓ HttpOnly: YES ✓ Secure: YES ✓ Expires: 30 days. Properly secured!"] };
          if (n === "2") return { lines: ["Cookie 2: ✗ HttpOnly: NO — JavaScript can read and steal this cookie!"] };
          if (n === "3") return { lines: ["Cookie 3: ✗ Secure: NO — Sent over HTTP! Can be intercepted!"] };
          return { lines: ["Unknown cookie."] };
        },
        "flag-insecure": (args) => {
          const n = args[0];
          if (n === "2") return { lines: ["✓ Cookie 2 FLAGGED — Missing HttpOnly. Security team notified."] };
          if (n === "3") return { lines: ["✓ Cookie 3 FLAGGED — Missing Secure flag. Notified. Run 'assemble'."] };
          return { lines: [`Cookie ${n} is the secure one.`] };
        },
      },
    },
  },

  // ─── BT-16: APIs ─────────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Message Board", location: "CyberVille", era: "Today", emoji: "📋" },
    id: "bt-16",
    order: 16,
    title: "The Waiter Between Apps",
    subtitle: "What is an API?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-16", name: "API Explorer", emoji: "📋" },
    challengeType: "ctf",
    info: {
      tagline: "An API is like a waiter — you tell it what you want, it goes to the kitchen (the server), and brings back your order.",
      year: 2025,
      overview: [
        "In a restaurant you don't walk into the kitchen and grab your food — you tell the waiter what you want. An API (Application Programming Interface) works the same way. It's a messenger between apps.",
        "When a weather app shows today's temperature, it doesn't store weather data itself. It asks a weather service's API: 'What's the weather in my city?' The API fetches the answer and brings it back.",
        "APIs let apps share information safely and in a structured way. 'Login with Google,' embedded maps, and weather widgets all use APIs.",
      ],
      technical: {
        title: "API Keys — The Password for Apps",
        body: [
          "APIs need security: they must check who is asking before sharing data. An API key is a secret password that apps use to prove they're allowed to make requests. Without a valid key, the API should refuse to answer.",
          "If an API doesn't check who is asking, anyone could request private information. Good APIs require authentication and check whether the requesting app is allowed to see the requested data.",
        ],
        codeExample: {
          label: "API request with and without a key",
          code: `  App → Weather API (with key):
  "Weather for CyberVille? Key: abc123"

  Weather API → App:
  "72°F, Sunny ☀️"

  App → Weather API (no key):
  "Weather for CyberVille?"

  Weather API → App:
  "Access denied! Show me your key first."`,
        },
      },
      incident: {
        title: "An API That Forgot to Check",
        when: "2021",
        where: "Peloton exercise bikes",
        impact: "Anyone could access private user data",
        body: [
          "Peloton's API would share user information to anyone who asked — even without logging in. Researchers could see other users' private workout data with a simple request.",
          "Peloton fixed the bug, but it showed why API security matters. APIs must always ask: 'Who is this? Are they allowed to see this data?'",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your App", sub: "places an order with API key", type: "attacker" },
          { label: "API (the waiter)", sub: "checks the key, takes request", type: "system" },
          { label: "Server (the kitchen)", sub: "prepares the answer", type: "victim" },
          { label: "API delivers the answer", sub: "your app shows it to you", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "Web APIs appear — apps start sharing data with each other" },
        { year: 2025, event: "Everything uses APIs — social media, weather, maps, payments", highlight: true },
      ],
      keyTakeaways: [
        "An API is a messenger between apps — takes requests, brings back data",
        "API keys are passwords that prove an app is allowed to use the API",
        "APIs must check who is asking and what they're allowed to see",
        "If an API skips security checks, anyone can access private data",
      ],
      references: [
        { title: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
      ],
    },
    ctf: {
      scenario: "The Academy API is receiving 3 requests. Some have valid keys, one doesn't. Decide which to answer and which to reject.",
      hint: "Check API keys before answering requests.",
      hints: [
        "List all requests. Run: list-requests",
        "Check request 1. Run: check-request 1",
        "Answer request 1. Run: respond 1",
        "Reject request 2 (no key). Run: reject 2",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/api-requests.txt": [
          "INCOMING API REQUESTS",
          "======================",
          "Request 1: Get student count | key: valid-key-99 ✓",
          "Request 2: Get all passwords  | key: NONE ✗",
          "Request 3: Get today's menu   | key: valid-key-42 ✓",
          "",
          "Commands: list-requests | check-request <n> | respond <n> | reject <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "api-requests.txt", isDir: false }] },
      fragments: [
        { trigger: "list-requests", value: "FLAG{4P1_", label: "Requests Listed" },
        { trigger: "respond 1", value: "K3Y_", label: "Valid Request Answered" },
        { trigger: "reject 2", value: "R3QU1R3D}", label: "Unauthorized Request Rejected!" },
      ],
      extraCommands: {
        "list-requests": () => ({ lines: ["1: Student count — valid key ✓", "2: All passwords — NO key ✗", "3: Today's menu  — valid key ✓", "", "check-request 1, 2, or 3"] }),
        "check-request": (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["Request 1: Valid API key. Student count — safe to answer."] };
          if (n === "2") return { lines: ["Request 2: ✗ NO API KEY! Asking for passwords. Must be rejected."] };
          if (n === "3") return { lines: ["Request 3: Valid API key. Today's menu — safe to answer."] };
          return { lines: ["Unknown request."] };
        },
        respond: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["✓ Answered: 250 students enrolled."] };
          if (n === "3") return { lines: ["✓ Answered: Today's menu is spaghetti."] };
          return { lines: [`Don't answer request ${n} — it has no key!`] };
        },
        reject: (args) => {
          if (args[0] === "2") return { lines: ["✓ Request 2 REJECTED — No API key. Passwords kept safe! Run 'assemble'."] };
          return { lines: ["That request has a valid key and should be answered."] };
        },
      },
    },
  },

  // ─── BT-17: Bandwidth ────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Water Park", location: "CyberVille", era: "Today", emoji: "🌊" },
    id: "bt-17",
    order: 17,
    title: "How Wide Is the Pipe?",
    subtitle: "What is Bandwidth?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-17", name: "Bandwidth Boss", emoji: "🌊" },
    challengeType: "ctf",
    info: {
      tagline: "Bandwidth is like a pipe — a wider pipe lets more water through at once, just like more bandwidth lets more data flow.",
      year: 2025,
      overview: [
        "Imagine a narrow water tube at a water slide — one person at a time. A wide tube lets five people go at once — much faster! Internet bandwidth works the same way. Bandwidth is how much data can flow through your connection at once.",
        "Bandwidth is measured in megabits per second (Mbps). Streaming HD video needs about 25 Mbps. If many devices share the same connection, each one gets a smaller share — which is why the internet feels slow at lunch in a crowded school.",
        "When attackers want to take down a website, they sometimes flood it with so much traffic that the bandwidth fills up and real users can't get through — this is called a DDoS attack.",
      ],
      technical: {
        title: "Bandwidth for Different Activities",
        body: [
          "Different activities need different amounts of bandwidth. Email and texting barely use any (under 1 Mbps). HD video streaming needs about 25 Mbps. If three people in your house are streaming 4K video at once, you need over 150 Mbps.",
          "Bandwidth is different from latency. Bandwidth = how much data flows at once. Latency = how long it takes to arrive. You can have high bandwidth but high latency (fast download, slow start) or low bandwidth and low latency (quick response, slow download).",
        ],
        codeExample: {
          label: "How much bandwidth different things need",
          code: `  Email / texting    → under 1 Mbps
  Web browsing       → 5–10 Mbps
  HD video streaming → 25 Mbps
  4K video           → 50+ Mbps
  Video call (HD)    → 8–10 Mbps
  Online gaming      → 5–25 Mbps

  3 people streaming 4K = 150+ Mbps needed!
  When everyone shares, each gets less.`,
        },
      },
      incident: {
        title: "The Record-Breaking DDoS Attack",
        when: "2023",
        where: "Cloudflare servers",
        impact: "71 million requests per second — largest ever recorded",
        body: [
          "In 2023, hackers launched the biggest bandwidth attack ever — 71 million requests per second aimed at filling up Cloudflare's connections. Like a million people all pointing fire hoses at the same tank.",
          "Cloudflare blocked it. But it shows that bandwidth can be used as a weapon: fill it up with junk and real users can't get through.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Narrow Pipe (slow)", sub: "10 Mbps — one lane", type: "attacker" },
          { label: "Wide Pipe (fast)", sub: "1,000 Mbps — highway", type: "system" },
          { label: "Too Many Users", sub: "pipe gets full", type: "victim" },
          { label: "Bandwidth Management", sub: "share fairly", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "First internet connections — only 56 kbps" },
        { year: 2010, event: "Gigabit fiber (1,000 Mbps) starts appearing for homes" },
        { year: 2023, event: "71M req/sec DDoS — largest bandwidth attack ever", highlight: true },
      ],
      keyTakeaways: [
        "Bandwidth = how much data can flow at once, like pipe width",
        "More bandwidth = faster internet for more people simultaneously",
        "Sharing bandwidth with many devices makes each one slower",
        "DDoS attacks deliberately flood bandwidth to block real users",
      ],
      references: [
        { title: "Bandwidth vs Throughput — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-throughput/" },
      ],
    },
    ctf: {
      scenario: "The Academy network has 100 Mbps to share across 5 apps. Assign the right bandwidth to each based on priority.",
      hint: "Assign bandwidth based on each app's importance.",
      hints: [
        "List apps. Run: list-apps",
        "See the priority guide. Run: show-priorities",
        "Assign video call first. Run: assign video-call 50",
        "Assign games last. Run: assign games 10",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/bandwidth-mgr.txt": [
          "BANDWIDTH MANAGER — 100 Mbps total",
          "====================================",
          "Apps: video-call, websites, downloads, games, email",
          "",
          "Commands: list-apps | show-priorities | assign <app> <mbps>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "bandwidth-mgr.txt", isDir: false }] },
      fragments: [
        { trigger: "list-apps", value: "FLAG{BANDW1DTH_", label: "Apps Listed" },
        { trigger: "assign video-call 50", value: "4LL0C4T3D_", label: "Priority App Assigned" },
        { trigger: "assign games 10", value: "C0RR3CT}", label: "All Assignments Correct!" },
      ],
      extraCommands: {
        "list-apps": () => ({ lines: ["video-call, websites, downloads, games, email", "Total: 100 Mbps to assign. Run: show-priorities"] }),
        "show-priorities": () => ({ lines: ["video-call: 50 Mbps", "websites: 20 Mbps", "downloads: 15 Mbps", "games: 10 Mbps", "email: 5 Mbps", "Total: 100 Mbps"] }),
        assign: (args) => {
          const app = args[0]; const mbps = args[1];
          const correct: Record<string, string> = { "video-call": "50", websites: "20", downloads: "15", games: "10", email: "5" };
          if (correct[app] === mbps) return { lines: [`✓ ${app}: ${mbps} Mbps — correct!`] };
          return { lines: [`Check show-priorities for the right amount for ${app}.`] };
        },
      },
    },
  },

  // ─── BT-18: Latency ──────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Relay Race Track", location: "CyberVille", era: "Today", emoji: "🏃" },
    id: "bt-18",
    order: 18,
    title: "The Waiting Time",
    subtitle: "What is Latency?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-18", name: "Latency Scout", emoji: "🏃" },
    challengeType: "ctf",
    info: {
      tagline: "Latency is the delay between sending a message and getting a reply — like how long an echo takes to come back.",
      year: 2025,
      overview: [
        "Shout in a big empty room and your echo comes back a moment later. That delay is latency. On the internet, latency is the time a message takes to travel from your computer to a server and back. It's measured in milliseconds (ms).",
        "Low latency means fast response — your game reacts instantly. High latency means slow response — you press jump and your character jumps half a second later. For gaming and video calls, low latency is critical.",
        "Latency goes up with distance. A server in your city might respond in 5ms. A server across the world might take 200ms. Even a fraction of a second makes a difference in live games and conversations.",
      ],
      technical: {
        title: "What Causes Latency?",
        body: [
          "Latency comes from: (1) Distance — even at near-light speed, data takes time to cross continents. (2) Number of routers — every router adds a tiny delay. (3) Congestion — busy networks make messages wait in line.",
          "The ping command measures latency by sending a tiny message and timing the reply. Low ping = low latency = fast response. Gamers pay close attention to their ping.",
        ],
        codeExample: {
          label: "Latency in ms for different distances",
          code: `  Same city server:          5ms  ← barely noticeable
  Nearby country server:     65ms ← fine for most things
  Across the world:         280ms ← noticeable in games/calls

  For gaming:   under 50ms feels smooth
  For video:    under 150ms is acceptable
  Above 300ms:  conversations feel weird, games lag`,
        },
      },
      incident: {
        title: "Tiny Delays That Cascade Into Failure",
        when: "2012",
        where: "Amazon Web Services (AWS)",
        impact: "Major websites went offline for hours",
        body: [
          "In 2012, a small AWS problem added tiny extra latency to its servers. System A was waiting for System B, which was waiting for System C — the tiny delays added up into a complete chain failure.",
          "Like a game of telephone where each person adds a small delay — by the end, the message never arrives. Small latency, when it stacks up through many systems, can cause big outages.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You send a message", sub: "timer starts", type: "attacker" },
          { label: "Message travels", sub: "through routers", type: "system" },
          { label: "Server processes + replies", sub: "sends response", type: "victim" },
          { label: "Reply arrives", sub: "latency = total time", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "Ping invented to measure network latency" },
        { year: 2025, event: "5G networks aim for very low latency on mobile", highlight: true },
      ],
      keyTakeaways: [
        "Latency is the delay between sending and receiving — measured in milliseconds",
        "Low latency = fast response (important for games and calls)",
        "Distance and congestion both increase latency",
        "Ping is a tool that measures latency to a server",
      ],
      references: [
        { title: "Latency Explained — Cloudflare", url: "https://www.cloudflare.com/learning/performance/glossary/what-is-latency/" },
      ],
    },
    ctf: {
      scenario: "Pick the best server for the Academy's online event. Test latency to 3 servers and recommend the fastest.",
      hint: "Ping all three servers and pick the lowest latency.",
      hints: [
        "Ping server A. Run: ping server-a",
        "Ping servers B and C.",
        "Pick the best. Run: recommend server-b",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/server-options.txt": [
          "SERVER OPTIONS",
          "===============",
          "Server A: Far away (overseas)",
          "Server B: Nearby (same city)",
          "Server C: Medium distance",
          "",
          "Commands: ping <server> | recommend <server>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "server-options.txt", isDir: false }] },
      fragments: [
        { trigger: "ping server-a", value: "FLAG{L4T3NCY_", label: "Server A Tested" },
        { trigger: "ping server-b", value: "M3ASUR3D_", label: "Fastest Server Found" },
        { trigger: "recommend server-b", value: "W1NN3R}", label: "Best Server Chosen!" },
      ],
      extraCommands: {
        ping: (args) => {
          const s = args[0];
          if (s === "server-a") return { lines: ["ping server-a: 280ms — high latency"] };
          if (s === "server-b") return { lines: ["ping server-b: 8ms — very low latency! ← BEST"] };
          if (s === "server-c") return { lines: ["ping server-c: 65ms — moderate"] };
          return { lines: ["Unknown server."] };
        },
        recommend: (args) => {
          if (args[0] === "server-b") return { lines: ["✓ Server B (8ms) recommended! Run 'assemble'."] };
          return { lines: [`${args[0]} isn't the fastest. Ping all three first.`] };
        },
      },
    },
  },

  // ─── BT-19: DNS Cache Poisoning ──────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Address Book Room", location: "CyberVille", era: "Today", emoji: "📓" },
    id: "bt-19",
    order: 19,
    title: "The Fake Phone Book",
    subtitle: "What is DNS Cache Poisoning?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-19", name: "DNS Defender", emoji: "📓" },
    challengeType: "ctf",
    info: {
      tagline: "DNS cache poisoning secretly changes the internet's phone book so you get sent to a fake website instead of the real one.",
      year: 2025,
      overview: [
        "DNS is the internet's phone book — it translates names into IP addresses. But what if someone sneaked in and changed some numbers? You'd type 'bank.com' and get sent to a fake bank instead of the real one!",
        "This is DNS cache poisoning. Hackers trick DNS servers into storing wrong IP addresses. Everyone who uses that server gets sent to the wrong place — without knowing it.",
        "It's a dangerous attack because everything looks normal. You typed the right address, the fake site looks real, but you're actually on a hacker's server.",
      ],
      technical: {
        title: "DNSSEC — Signing the Phone Book",
        body: [
          "DNSSEC adds a digital signature to every DNS entry. When you look up an address, DNSSEC verifies the signature to confirm it hasn't been tampered with — like a notary stamp on a legal document.",
          "Even if DNS is poisoned, using HTTPS provides a backup check. A fake site can't get a real TLS certificate for bank.com, so your browser will show a certificate error — alerting you that something is wrong.",
        ],
        codeExample: {
          label: "Normal DNS vs. poisoned DNS",
          code: `  NORMAL:
  You ask: "IP for bank.com?"
  DNS: "142.250.80.46" (real bank) ✓

  POISONED:
  Hacker changed DNS entry:
  bank.com = 10.0.0.evil

  You ask: "IP for bank.com?"
  Poisoned DNS: "10.0.0.evil"
  You land on FAKE bank! ✗

  Backup defense: HTTPS certificate
  won't match the fake site → warning!`,
        },
      },
      incident: {
        title: "The Kaminsky Bug — Almost Broke the Internet",
        when: "2008",
        where: "Global internet",
        impact: "A flaw that could poison almost any DNS server",
        body: [
          "In 2008, researcher Dan Kaminsky discovered a flaw that could let hackers poison nearly any DNS server in the world. The fix required the biggest coordinated security patch in internet history — all major DNS servers updated simultaneously.",
          "Dan Kaminsky became a hero for responsibly disclosing the flaw before it was exploited. This is why security researchers are so valuable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Hacker poisons DNS", sub: "changes the address book", type: "attacker" },
          { label: "You type bank.com", sub: "looks normal to you", type: "system" },
          { label: "Poisoned DNS responds", sub: "wrong IP address", type: "victim" },
          { label: "You land on fake site!", sub: "everything looks real", type: "result" },
        ],
      },
      timeline: [
        { year: 1983, event: "DNS created — no security features" },
        { year: 2008, event: "Kaminsky DNS bug — urgent worldwide patch", highlight: true },
        { year: 2011, event: "DNSSEC root zone signed — major defense deployed" },
      ],
      keyTakeaways: [
        "DNS cache poisoning changes the address book to redirect you to fake sites",
        "Everything looks normal — you could be on a fake website without knowing",
        "DNSSEC adds signatures to DNS entries to detect tampering",
        "HTTPS certificates also protect you — fake sites can't get real certificates",
      ],
      references: [
        { title: "DNS Cache Poisoning — Cloudflare", url: "https://www.cloudflare.com/learning/dns/dns-cache-poisoning/" },
      ],
    },
    ctf: {
      scenario: "The Academy DNS server has been poisoned! Compare current entries to the backup and restore the correct addresses.",
      hint: "Find the poisoned entry and restore the real address.",
      hints: [
        "Show current DNS. Run: show-dns",
        "Show the backup. Run: show-backup",
        "Compare them. Run: compare",
        "Restore the poisoned entry. Run: restore library.edu",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/dns-check.txt": [
          "DNS VERIFICATION TOOL",
          "======================",
          "Commands: show-dns | show-backup | compare | restore <domain>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "dns-check.txt", isDir: false }] },
      fragments: [
        { trigger: "show-dns", value: "FLAG{DNS_", label: "Poisoned DNS Found" },
        { trigger: "compare", value: "P01S0N_", label: "Poisoned Entry Identified" },
        { trigger: "restore library.edu", value: "CL3AR3D}", label: "DNS Restored!" },
      ],
      extraCommands: {
        "show-dns": () => ({ lines: ["CURRENT DNS:", "  academy.edu → 10.0.0.1", "  library.edu → 10.99.99.99  ← SUSPICIOUS!", "  gym.edu     → 10.0.0.9"] }),
        "show-backup": () => ({ lines: ["BACKUP (real):", "  academy.edu → 10.0.0.1  ✓", "  library.edu → 10.0.0.5  ✓", "  gym.edu     → 10.0.0.9  ✓"] }),
        compare: () => ({ lines: ["COMPARISON:", "  academy.edu: ✓ MATCH", "  library.edu: ✗ MISMATCH! Poisoned: 10.99.99.99 vs Real: 10.0.0.5", "  gym.edu:     ✓ MATCH", "", "Run: restore library.edu"] }),
        restore: (args) => {
          if (args[0] === "library.edu") return { lines: ["✓ library.edu restored to 10.0.0.5!", "DNS cache poisoning cleared. Run 'assemble'."] };
          return { lines: [`${args[0]} doesn't need restoring.`] };
        },
      },
    },
  },

  // ─── BT-20: Load Balancing ───────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Checkout Lines", location: "CyberVille", era: "Today", emoji: "🔀" },
    id: "bt-20",
    order: 20,
    title: "Sharing the Work",
    subtitle: "What is Load Balancing?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-20", name: "Load Balancer", emoji: "🔀" },
    challengeType: "ctf",
    info: {
      tagline: "Load balancing opens more checkout lines when one gets too long — so every server handles a fair share of visitors.",
      year: 2025,
      overview: [
        "Imagine 200 shoppers in a single checkout line — it would take forever! A smart store manager opens more lines and directs shoppers evenly. Load balancers do the same for websites.",
        "When millions of people visit a popular website at once, one server can't handle all those requests. A load balancer spreads visitors across many servers so each gets a fair share of work — and everyone gets served quickly.",
        "Load balancers also detect broken servers and stop sending them traffic. This is why popular websites like YouTube stay online even when individual servers break.",
      ],
      technical: {
        title: "How a Load Balancer Decides",
        body: [
          "A load balancer uses strategies like round-robin (distribute requests in order: server 1, 2, 3, 1, 2, 3...) or least-connections (always send to the server with the fewest active users).",
          "Load balancers continuously health-check servers. If a server stops responding, the load balancer removes it from rotation automatically and spreads its traffic to healthy servers.",
        ],
        codeExample: {
          label: "Load balancing 900 visitors across 3 servers",
          code: `  900 visitors arrive at academy.edu

  Load Balancer:
  → 300 sent to Server 1
  → 300 sent to Server 2
  → 300 sent to Server 3

  If Server 2 crashes:
  Load balancer detects failure →
  → 450 on Server 1, 450 on Server 3
  → Academy stays online! ✓`,
        },
      },
      incident: {
        title: "GitHub Outage — When a Load Balancer Goes Wrong",
        when: "2022",
        where: "GitHub — programmer code sharing site",
        impact: "Millions of developers couldn't work for hours",
        body: [
          "In 2022, GitHub's load balancer started making wrong decisions — sending too much traffic to overloaded servers while leaving healthy ones idle. The result: millions of developers worldwide couldn't access their code for hours.",
          "Load balancers are critical infrastructure. When they work well, nobody notices. When they fail, everything stops.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Many users arrive", sub: "all at the same time", type: "attacker" },
          { label: "Load Balancer", sub: "divides work fairly", type: "system" },
          { label: "Server 1, 2, 3", sub: "each gets a fair share", type: "victim" },
          { label: "Everyone gets served!", sub: "fast and fair", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "First load balancers appear as websites get popular" },
        { year: 2025, event: "Every major website uses load balancers with thousands of servers", highlight: true },
      ],
      keyTakeaways: [
        "Load balancers spread visitors across many servers so no one gets overwhelmed",
        "They keep websites online even when individual servers break",
        "Load balancers check server health and stop sending traffic to broken servers",
        "Without load balancing, popular websites would crash under heavy traffic",
      ],
      references: [
        { title: "Load Balancing — Cloudflare", url: "https://www.cloudflare.com/learning/performance/what-is-load-balancing/" },
      ],
    },
    ctf: {
      scenario: "900 visitors are all hitting Server 1 (overloaded!). Set up the load balancer to distribute them evenly across 3 servers.",
      hint: "Distribute 900 visitors evenly across 3 servers.",
      hints: [
        "See the problem. Run: show-traffic",
        "Check server capacity. Run: check-servers",
        "Distribute evenly. Run: distribute 300 300 300",
        "Verify it worked. Run: verify",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/load-balancer.txt": [
          "LOAD BALANCER CONTROL",
          "======================",
          "900 visitors — all on Server 1 (overloaded!)",
          "3 servers available, each handling up to 400",
          "",
          "Commands: show-traffic | check-servers | distribute <s1> <s2> <s3> | verify",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "load-balancer.txt", isDir: false }] },
      fragments: [
        { trigger: "show-traffic", value: "FLAG{L04D_", label: "Overload Identified" },
        { trigger: "distribute 300 300 300", value: "B4L4NC3D_", label: "Traffic Distributed" },
        { trigger: "verify", value: "3V3NLY}", label: "Load Balance Verified!" },
      ],
      extraCommands: {
        "show-traffic": () => ({ lines: ["900 visitors on Server 1 — 225% capacity! Will crash!", "Servers 2 and 3 are idle.", "Run: distribute <s1> <s2> <s3>"] }),
        "check-servers": () => ({ lines: ["Each server: max 400. 900 ÷ 3 = 300 each — perfect!"] }),
        distribute: (args) => {
          const total = parseInt(args[0]) + parseInt(args[1]) + parseInt(args[2]);
          if (args[0] === "300" && args[1] === "300" && args[2] === "300") return { lines: ["✓ Distributed evenly: 300 each. Run: verify"] };
          return { lines: [`Total: ${total}. Need 900 split evenly. Try: distribute 300 300 300`] };
        },
        verify: () => ({ lines: ["✓ Server 1: 300 (75%) ✓", "✓ Server 2: 300 (75%) ✓", "✓ Server 3: 300 (75%) ✓", "Academy event running smoothly! Run 'assemble'."] }),
      },
    },
  },
];
