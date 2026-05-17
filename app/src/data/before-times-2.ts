import type { StageConfig } from "./types";

export const beforeTimesStages2: StageConfig[] = [

  // ─── BT-11: HTTP vs HTTPS ─────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Steamer Lane Surf Report Board", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏄" },
    id: "bt-11",
    order: 11,
    title: "Reading the Wave Report",
    subtitle: "HTTP vs HTTPS — Public Bulletin Boards vs Sealed Envelopes",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-11", name: "Surf Scout", emoji: "🌊" },
    challengeType: "ctf",
    info: {
      tagline: "HTTP posts your surf report on a public billboard. HTTPS seals it in an envelope.",
      year: 2025,
      overview: [
        "You're at Steamer Lane checking the surf report. The old chalkboard outside the surf shop (HTTP) is visible to anyone walking by — every tourist, every competitor, every stranger can read it. The members-only forecast sent by text message (HTTPS) is encrypted — only you and the sender can read it. HTTP and HTTPS are the same difference.",
        "HTTP (HyperText Transfer Protocol) transmits data in plaintext. Every router, ISP, and anyone on the same WiFi network can read your HTTP traffic — your login credentials, your personal data, everything. HTTPS adds TLS (Transport Layer Security) encryption on top, making the content unreadable to anyone except the intended server.",
        "As of 2025, over 95% of web traffic uses HTTPS. Modern browsers mark HTTP sites with a 'Not Secure' warning. But HTTP still exists — and intercepting it on public WiFi is trivial. Understanding the difference is the first step in protecting yourself online.",
      ],
      technical: {
        title: "How TLS Encrypts HTTP Traffic",
        body: [
          "When you connect to an HTTPS site, your browser and the server perform a TLS handshake: (1) Server sends its certificate (proves identity). (2) Browser verifies the certificate against trusted Certificate Authorities. (3) Both sides agree on encryption keys using asymmetric cryptography (RSA or ECDH). (4) All subsequent traffic is encrypted with a symmetric key (AES-256).",
          "The URL tells you which to use: http:// sends plaintext, https:// sends encrypted. The padlock icon in your browser's address bar indicates a valid TLS certificate. Missing padlock or 'Not Secure' = HTTP or invalid certificate. Never enter passwords or payment info on an HTTP page.",
        ],
        codeExample: {
          label: "Seeing the difference between HTTP and HTTPS traffic",
          code: `# HTTP request — everything visible in plaintext
curl -v http://example.com
# You'll see headers, cookies, body — all readable

# HTTPS request — payload encrypted
curl -v https://example.com
# TLS handshake visible in headers, but body is encrypted

# Check if a site forces HTTPS redirect
curl -I http://google.com
# Should show: HTTP/1.1 301 Moved Permanently
# Location: https://www.google.com/`,
        },
      },
      incident: {
        title: "The Firesheep Exploit — Stealing Sessions Over HTTP",
        when: "October 2010",
        where: "Any public WiFi network",
        impact: "Demonstrated that Facebook, Twitter sessions could be hijacked in seconds",
        body: [
          "Eric Butler released Firesheep — a Firefox extension that automatically captured and displayed other users' session cookies on the same WiFi network. Facebook used HTTPS for login but then switched back to HTTP for browsing. Firesheep grabbed the unencrypted session cookies and let anyone click a button to log in as that user.",
          "Within days of release, Firesheep had been downloaded over 100,000 times. Facebook and Twitter were forced to implement HTTPS everywhere — something they had resisted for performance reasons. The lesson: a login over HTTPS means nothing if the session is continued over HTTP. Encrypt everything, not just the authentication step.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Browser", sub: "sends HTTP or HTTPS request", type: "attacker" },
          { label: "Network Path", sub: "routers, ISPs, WiFi APs", type: "system" },
          { label: "HTTP: plaintext", sub: "anyone on path can read", type: "victim" },
          { label: "HTTPS: encrypted", sub: "only endpoints can decrypt", type: "result" },
        ],
      },
      timeline: [
        { year: 1991, event: "HTTP 0.9 introduced by Tim Berners-Lee — entirely plaintext" },
        { year: 1995, event: "HTTPS introduced by Netscape for e-commerce security" },
        { year: 2010, event: "Firesheep: session hijacking over HTTP trivialized — mass adoption of HTTPS begins", highlight: true },
        { year: 2018, event: "Chrome marks all HTTP sites 'Not Secure' — HTTPS becomes the default" },
      ],
      keyTakeaways: [
        "HTTP transmits everything in plaintext — visible to anyone on the network path",
        "HTTPS adds TLS encryption — content unreadable without the session keys",
        "Always look for https:// and the padlock before entering any sensitive data",
        "Even if login is HTTPS, a plaintext session cookie can be stolen to hijack your account",
      ],
      references: [
        { title: "HTTPS Explained — Mozilla MDN", url: "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS" },
        { title: "Firesheep and the HTTPS Push — EFF", url: "https://www.eff.org/https-everywhere" },
      ],
    },
    ctf: {
      scenario: "You're intercepting traffic at Steamer Lane. Two streams are captured — one HTTP, one HTTPS. Read the HTTP stream to extract the credentials being sent in plaintext. Show why HTTP is dangerous.",
      hint: "Read the HTTP capture and extract the credentials. The HTTPS capture will be unreadable.",
      hints: [
        "Read the HTTP traffic capture. Run: cat http-capture.txt",
        "Extract the credentials from the HTTP stream. Run: extract-creds http",
        "Try to read the HTTPS capture. Run: extract-creds https",
        "Submit the stolen credentials. Run: submit-creds tidal_wave_tom surfsup1969",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/http-capture.txt",
          value: "FLAG{HTTP_1S_",
          label: "HTTP Capture — Plaintext Credentials Exposed",
        },
        {
          trigger: "/https-capture.txt",
          value: "PL41NT3XT_",
          label: "HTTPS Capture — Encrypted Traffic Confirmed",
        },
        {
          trigger: "submit-creds tidal_wave_tom surfsup1969",
          value: "HTTPS_1S_3NCRYPT3D}",
          label: "Credential Submission — HTTP Danger Demonstrated",
        },
      ],
      files: {
        "/http-capture.txt": [
          "HTTP TRAFFIC CAPTURE — Steamer Lane WiFi",
          "==========================================",
          "POST /login HTTP/1.1",
          "Host: surf-members.com",
          "Content-Type: application/x-www-form-urlencoded",
          "",
          "username=tidal_wave_tom&password=surfsup1969&remember=true",
          "",
          "HTTP/1.1 200 OK",
          "Set-Cookie: session=abc123plaintext; Path=/",
          "",
          "VISIBLE TO ANYONE ON THIS WIFI NETWORK.",
        ].join("\n"),
        "/https-capture.txt": [
          "HTTPS TRAFFIC CAPTURE — Steamer Lane WiFi",
          "===========================================",
          "TLSv1.3 Record Layer: Application Data",
          "  Encrypted Application Data:",
          "  7f 3a b2 09 4c e1 88 f3 2d 9a 07 bc 44 21 f8 9e",
          "  a3 51 7c 2b d8 60 95 3f 1e 74 c2 88 0d 4a e7 b1",
          "  [... 1,247 more bytes of ciphertext ...]",
          "",
          "Content: UNREADABLE without TLS session keys.",
          "Attacker sees: nothing useful.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "http-capture.txt", isDir: false },
          { name: "https-capture.txt", isDir: false },
        ],
      },
      extraCommands: {
        "extract-creds": (args) => {
          if ((args[0] || "") === "http") {
            return {
              lines: [
                "Parsing HTTP capture...",
                "  Found POST /login with credentials in plaintext:",
                "  Username: tidal_wave_tom",
                "  Password: surfsup1969",
                "  Session cookie: abc123plaintext",
                "",
                "All extracted without any decryption needed.",
                "Run: submit-creds tidal_wave_tom surfsup1969",
              ],
            };
          }
          if ((args[0] || "") === "https") {
            return {
              lines: [
                "Parsing HTTPS capture...",
                "  TLS 1.3 encrypted payload found.",
                "  Without the session keys: CANNOT DECRYPT.",
                "  Content: ████████████████████",
                "",
                "HTTPS protects against this attack.",
              ],
            };
          }
          return { lines: ["Usage: extract-creds http  OR  extract-creds https"] };
        },
        "submit-creds": (args) => {
          if (args[0] === "tidal_wave_tom" && args[1] === "surfsup1969") {
            return {
              lines: [
                "Credentials submitted. Logged in as: tidal_wave_tom",
                "This is how easy HTTP credential theft is.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: ["Wrong credentials. Read the HTTP capture first."] };
        },
      },
    },
  },

  // ─── BT-12: How Browsers Work ─────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Surf Shop on Pacific Ave", location: "Santa Cruz, USA", era: "Present Day", emoji: "🛒" },
    id: "bt-12",
    order: 12,
    title: "Your Surfboard",
    subtitle: "Browsers — The Tool That Rides the Web",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-12", name: "Browser Inspector", emoji: "🔬" },
    challengeType: "ctf",
    info: {
      tagline: "A browser is a translation machine — it turns raw HTML, CSS, and JavaScript into a visual page.",
      year: 2025,
      overview: [
        "At the surf shop, you pick your board. The board doesn't surf on its own — it's a tool that interfaces between you and the wave. A browser is the tool that interfaces between you and the web. When you type a URL, the browser doesn't just 'show a webpage' — it performs a precise sequence of operations: DNS resolution, TCP connection, TLS handshake, HTTP request, HTML parsing, CSS rendering, JavaScript execution.",
        "Understanding browsers matters for security because browsers are the primary attack surface for most users. XSS (Cross-Site Scripting) attacks inject malicious JavaScript into pages rendered by your browser. Malicious redirects, drive-by downloads, and phishing pages all rely on browser behavior. Browser developer tools (F12) let you inspect every request, response, cookie, and script.",
        "The browser's same-origin policy (SOP) is its primary security mechanism: JavaScript on page A cannot read data from page B unless both are on the same origin (protocol + domain + port). This prevents a malicious site from reading your Gmail or bank balance. When SOP is misconfigured (CORS errors), it can become a vulnerability.",
      ],
      technical: {
        title: "What Happens When You Type a URL",
        body: [
          "Step by step: (1) DNS lookup for the domain. (2) TCP connection to the server's IP:port. (3) TLS handshake (if HTTPS). (4) HTTP GET request sent. (5) Server responds with HTML. (6) Browser parses HTML, finds CSS/JS/image links. (7) Browser fetches each sub-resource (more requests). (8) CSS applied, layout computed, page painted. (9) JavaScript executed. Total time: 200ms–2s for a modern page.",
          "Browser developer tools (F12 → Network tab) show every single request made during page load: URL, status code, size, timing, request/response headers. This is invaluable for debugging and for understanding what data a page is sending and receiving.",
        ],
        codeExample: {
          label: "Inspecting browser requests from the command line",
          code: `# See exactly what a browser request looks like
curl -v https://example.com

# Follow redirects
curl -L -v https://example.com

# Inspect cookies being sent
curl -v --cookie-jar cookies.txt https://example.com

# See response headers only
curl -I https://example.com

# Simulate a browser User-Agent
curl -A "Mozilla/5.0" https://example.com`,
        },
      },
      incident: {
        title: "The British Airways Breach — Malicious Script in the Browser",
        when: "August–September 2018",
        where: "British Airways website and app",
        impact: "500,000 customers' payment cards stolen; £20M GDPR fine",
        body: [
          "The Magecart group injected 22 lines of JavaScript into British Airways' payment page. The script captured card details typed into the checkout form and sent them to a server the attackers controlled. The injected script ran in the browser exactly like any legitimate JavaScript — users had no way to detect it visually.",
          "The attack exploited trust in the browser rendering engine: if a script is served from the page, the browser executes it. This is why Content Security Policy (CSP) headers matter — they let servers tell browsers which script sources are trusted. BA didn't have strict CSP. 500,000 customers' details were stolen over 15 days before anyone noticed.",
        ],
      },
      diagram: {
        nodes: [
          { label: "URL Typed", sub: "browser starts work", type: "attacker" },
          { label: "DNS + TCP + TLS", sub: "connection established", type: "system" },
          { label: "HTML/CSS/JS Fetched", sub: "sub-resources loaded", type: "victim" },
          { label: "Page Rendered", sub: "JavaScript executed", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "First web browser (WorldWideWeb) by Tim Berners-Lee" },
        { year: 1994, event: "Netscape Navigator — first mainstream browser, introduces cookies" },
        { year: 1995, event: "JavaScript added to Netscape — the web becomes interactive" },
        { year: 2018, event: "British Airways Magecart attack — malicious JS steals 500K card numbers", highlight: true },
      ],
      keyTakeaways: [
        "Browsers perform 9+ steps to render a single page — each is an attack surface",
        "Browser DevTools (F12) show every request, response, cookie, and script",
        "Same-origin policy prevents cross-site data theft — misconfigured CORS breaks this",
        "Injected JavaScript is indistinguishable from legitimate scripts without CSP",
      ],
      references: [
        { title: "How Browsers Work — web.dev", url: "https://web.dev/articles/howbrowserswork" },
        { title: "British Airways Breach Analysis — RiskIQ", url: "https://www.riskiq.com/blog/labs/magecart-british-airways-breach/" },
      ],
    },
    ctf: {
      scenario: "A surf shop's website has a hidden admin page. Use browser inspection techniques to find the hidden link in the page source, discover the admin path, and access the flag inside the admin panel.",
      hint: "Inspect the page source and HTTP response headers for hidden paths.",
      hints: [
        "View the homepage source. Run: view-source /",
        "Check the HTTP response headers. Run: inspect-headers /",
        "Access the hidden path you found. Run: browse /admin-reef-42",
        "Read the admin panel contents. Run: cat /admin-reef-42/flag.txt",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/index.html",
          value: "FLAG{BR0WS3R_",
          label: "Page Source — Hidden Admin Path Discovered",
        },
        {
          trigger: "/admin-reef-42/flag.txt",
          value: "D3VT00LS_R3V34L_",
          label: "Admin Panel — Flag File Located",
        },
        {
          trigger: "cat /admin-reef-42/flag.txt",
          value: "3V3RYTH1NG}",
          label: "Flag Retrieval — DevTools Mastered",
        },
      ],
      files: {
        "/index.html": [
          "<html>",
          "<head><title>Steamer Lane Surf Shop</title></head>",
          "<body>",
          "  <h1>Welcome to Steamer Lane Surf Shop</h1>",
          "  <p>Best boards in Santa Cruz.</p>",
          "  <!-- admin: /admin-reef-42 -->",
          "  <a href='/boards'>Shop Boards</a>",
          "</body>",
          "</html>",
        ].join("\n"),
        "/admin-reef-42/flag.txt": "Run 'assemble' to retrieve your fragment.",
      },
      dirs: {
        "/": [{ name: "index.html", isDir: false }, { name: "admin-reef-42", isDir: true }],
        "/admin-reef-42": [{ name: "flag.txt", isDir: false }],
      },
      extraCommands: {
        "view-source": (args) => {
          const path = args[0] || "/";
          if (path === "/") {
            return {
              lines: [
                "Page source: /index.html",
                "================================",
                "<html>",
                "<head><title>Steamer Lane Surf Shop</title></head>",
                "<body>",
                "  <h1>Welcome to Steamer Lane Surf Shop</h1>",
                "  <p>Best boards in Santa Cruz.</p>",
                "  <!-- admin: /admin-reef-42 -->   ← found it",
                "  <a href='/boards'>Shop Boards</a>",
                "</body>",
                "</html>",
              ],
            };
          }
          return { lines: [`No source for path: ${path}`] };
        },
        "inspect-headers": () => ({
          lines: [
            "HTTP Response Headers: /",
            "  HTTP/1.1 200 OK",
            "  Content-Type: text/html",
            "  X-Powered-By: SurfOS/1.0",
            "  X-Admin-Hint: check the HTML comments",
            "  Server: nginx/1.24",
          ],
        }),
        browse: (args) => {
          const path = args[0] || "/";
          if (path === "/admin-reef-42" || path === "/admin-reef-42/") {
            return {
              lines: [
                "Admin Panel — Steamer Lane Surf Shop",
                "=====================================",
                "Welcome, admin. Files in this directory:",
                "  flag.txt",
                "",
                "Run: cat /admin-reef-42/flag.txt",
              ],
            };
          }
          return { lines: [`Browsing ${path}: 404 Not Found`] };
        },
      },
    },
  },

  // ─── BT-13: Clients and Servers ───────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "O'Neill Surf School", location: "Santa Cruz, USA", era: "Present Day", emoji: "🎓" },
    id: "bt-13",
    order: 13,
    title: "The Surf Shop and the Surfer",
    subtitle: "Clients and Servers — Who Asks, Who Answers",
    category: "cybersecurity",
    xp: 75,
    badge: { id: "bt-badge-13", name: "Client-Server Pro", emoji: "🤝" },
    challengeType: "ctf",
    info: {
      tagline: "The client asks. The server answers. Every web interaction is exactly this exchange.",
      year: 2025,
      overview: [
        "The surf school has instructors (servers) and students (clients). A student (client) asks 'how do I pop up on a board?' The instructor (server) answers with the lesson. The student never becomes the instructor. The internet works identically: a client (your browser, your app) makes a request, and a server responds. The roles are fixed for that exchange.",
        "When you open Instagram, your phone (client) sends a request to Instagram's servers: 'Give me the latest posts for my feed.' Instagram's server processes that request, queries its database, and sends back the posts as JSON data. Your app renders them into the feed you see. This request-response cycle repeats thousands of times a day.",
        "The client-server model defines security responsibilities too. Servers must validate every input — a malicious client can send anything. Clients must validate server responses — a compromised server might send malicious content. Neither can trust the other by default.",
      ],
      technical: {
        title: "HTTP Request-Response Cycle",
        body: [
          "An HTTP request has: a method (GET, POST, PUT, DELETE), a URL path, headers (metadata), and optionally a body (for POST/PUT). An HTTP response has: a status code (200 OK, 404 Not Found, 500 Server Error), headers, and a body (the actual content).",
          "REST APIs are the standard way web applications communicate: GET /users/123 retrieves a user, POST /users creates one, PUT /users/123 updates it, DELETE /users/123 removes it. The server maintains state and data; the client is just a display and input layer. This separation is called the 'client-server' architectural pattern.",
        ],
        codeExample: {
          label: "Making HTTP requests with curl and Python",
          code: `# GET request (retrieve data)
curl https://api.example.com/users/123

# POST request with JSON body (send data)
curl -X POST https://api.example.com/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "surfer", "level": "beginner"}'

# Python equivalent
import requests
resp = requests.get('https://api.example.com/users/123')
print(resp.json())   # parse JSON response`,
        },
      },
      incident: {
        title: "IDOR — When the Server Trusts the Client Too Much",
        when: "Ongoing vulnerability class — top OWASP finding",
        where: "Any API that exposes object IDs",
        impact: "Data from other users accessible by simply changing an ID in the URL",
        body: [
          "IDOR (Insecure Direct Object Reference) happens when a server trusts the client to send a valid object ID without checking if that client is authorized to access it. Change /api/invoices/1042 to /api/invoices/1043 and you see another customer's invoice — because the server never verified you own invoice 1043.",
          "In 2019, researchers found that Facebook's Business Manager API returned any user's phone number if you knew their user ID — and user IDs were public. The client sent a request with user ID X; the server returned X's phone number without checking if the requesting client was authorized to see it. Classic IDOR: 'server trusts client, server doesn't verify authorization.'",
        ],
      },
      diagram: {
        nodes: [
          { label: "Client (Browser/App)", sub: "sends HTTP request", type: "attacker" },
          { label: "Network", sub: "request travels to server", type: "system" },
          { label: "Server", sub: "processes, queries DB", type: "victim" },
          { label: "Response", sub: "server sends data back", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "Client-server architecture formalized in ARPANET design" },
        { year: 1991, event: "HTTP 0.9 introduces the request-response cycle for the web" },
        { year: 2000, event: "REST API style defined by Roy Fielding in his PhD dissertation" },
        { year: 2019, event: "Facebook IDOR exposes phone numbers — server trusted client IDs blindly", highlight: true },
      ],
      keyTakeaways: [
        "Client asks, server answers — the roles don't switch within a request",
        "HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove)",
        "Servers must authorize every request — never trust the client to self-authorize",
        "IDOR: server returns data for any ID without checking if requester is authorized",
      ],
      references: [
        { title: "HTTP Overview — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
        { title: "IDOR — OWASP", url: "https://owasp.org/www-community/attacks/Insecure_Direct_Object_Reference" },
      ],
    },
    ctf: {
      scenario: "The surf school's API has an IDOR vulnerability. You're logged in as student ID 7. Find the admin student record by manipulating the student ID in the API request.",
      hint: "Change the student ID in the API request to find other records.",
      hints: [
        "Fetch your own student record. Run: api-get /students/7",
        "Try adjacent IDs. Run: api-get /students/1",
        "Keep trying low IDs to find admin. Run: api-get /students/0",
        "Try the admin ID. Run: api-get /students/admin",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/api-brief.txt",
          value: "FLAG{1D0R_S3RV3R_",
          label: "API Brief — IDOR Vulnerability Identified",
        },
        {
          trigger: "/students.txt",
          value: "MUST_4UTH0R1Z3_",
          label: "Student Roster — Unauthorized Record Found",
        },
        {
          trigger: "api-get /students/0",
          value: "3V3RY_R3QU3ST}",
          label: "Admin Record — Server Failed to Authorize",
        },
      ],
      files: {
        "/api-brief.txt": [
          "SURF SCHOOL API — IDOR INVESTIGATION",
          "=====================================",
          "You are logged in as student ID 7.",
          "The API exposes student records at /students/<id>.",
          "The server does not check if you own the record.",
          "",
          "Objective: access the admin record by manipulating the ID.",
          "Try: api-get /students/7 to start.",
        ].join("\n"),
        "/students.txt": [
          "Known student IDs (from enrollment form leak):",
          "  ID 0  — admin (instructor account)",
          "  ID 1  — betty_barrelhouse",
          "  ID 7  — wave_rider_7 (you)",
          "",
          "The server trusts whichever ID you send.",
          "No authorization check is performed.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "api-brief.txt", isDir: false },
          { name: "students.txt", isDir: false },
        ],
      },
      extraCommands: {
        "api-get": (args) => {
          const path = args[0] || "";
          const id = path.split("/").pop() || "";
          const responses: Record<string, string[]> = {
            "7": ["200 OK — Student #7:", "  name: wave_rider_7", "  level: beginner", "  courses: [surf-101]"],
            "1": ["200 OK — Student #1:", "  name: betty_barrelhouse", "  level: intermediate", "  courses: [surf-201, surf-301]"],
            "0": ["200 OK — Student #0:", "  name: admin", "  level: instructor", "  note: Server returned admin record to an unauthorized student. IDOR vulnerability.", "", "Run 'assemble' to retrieve your fragment."],
            "admin": ["400 Bad Request — ID must be numeric. Try /students/0"],
          };
          const resp = responses[id];
          if (resp) {
            return { lines: resp, solved: id === "0" };
          }
          return { lines: [`404 Not Found — Student ID ${id} does not exist`] };
        },
      },
    },
  },

  // ─── BT-14: SSL/TLS ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Lifeguard Tower #3, Cowell Beach", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏖️" },
    id: "bt-14",
    order: 14,
    title: "The Safety Leash",
    subtitle: "TLS Certificates — Proving Identity Before You Trust",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-14", name: "Certificate Verifier", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "Before you trust the lifeguard with your safety, you check their badge. TLS does the same.",
      year: 2025,
      overview: [
        "The lifeguard at Cowell Beach wears a badge proving they're certified. Before you trust them to pull you from a rip current, you can verify that badge. TLS certificates work identically: before your browser sends any sensitive data to a server, it verifies the server's certificate — proof that the server is who it claims to be, signed by a trusted authority.",
        "A TLS certificate contains: the domain name it's valid for, the certificate authority (CA) that signed it, the server's public key, and an expiry date. Your browser ships with a list of trusted CAs (like DigiCert, Let's Encrypt, Comodo). If the certificate is valid, signed by a trusted CA, and matches the domain, the padlock appears and encrypted communication begins.",
        "Certificate errors are serious warnings. 'Your connection is not private' means either the certificate is expired, self-signed, doesn't match the domain, or was issued by an untrusted CA. Clicking through this warning means you're communicating with an unverified server — a potential impersonator.",
      ],
      technical: {
        title: "How TLS Certificates and the PKI Work",
        body: [
          "Public Key Infrastructure (PKI): CAs are trusted third parties that verify identities and sign certificates. The process: (1) Server generates a key pair. (2) Server sends a Certificate Signing Request (CSR) to a CA. (3) CA verifies the server owns the domain (via DNS or file challenge). (4) CA signs the certificate with its private key. (5) Browser verifies the signature using the CA's public key (built into the browser).",
          "Let's Encrypt revolutionized TLS by making certificates free and automatic. Before 2016, a certificate cost $100–500/yr. Now any domain can get a 90-day certificate in 60 seconds via ACME protocol. This led to near-universal HTTPS adoption. Caveat: a Let's Encrypt cert proves domain control, not that the site is legitimate — phishing sites use them too.",
        ],
        codeExample: {
          label: "Inspecting TLS certificates",
          code: `# View certificate details
openssl s_client -connect example.com:443 -servername example.com

# Check certificate expiry
echo | openssl s_client -connect example.com:443 2>/dev/null \\
  | openssl x509 -noout -dates

# See who issued the certificate (CA)
echo | openssl s_client -connect example.com:443 2>/dev/null \\
  | openssl x509 -noout -issuer

# Full certificate details
curl -v https://example.com 2>&1 | grep -A5 "SSL connection"`,
        },
      },
      incident: {
        title: "The DigiNotar Hack — When a CA Is Compromised",
        when: "July 2011",
        where: "DigiNotar CA, Netherlands",
        impact: "300K+ fraudulent certificates issued; Iranian users' Gmail intercepted",
        body: [
          "DigiNotar, a Dutch CA, was hacked and attackers issued fraudulent certificates for Google, Mozilla, Microsoft, and others. Iranian authorities used a fake Google certificate to perform man-in-the-middle attacks on 300,000+ Iranian Gmail users — intercepting their emails while showing a valid padlock in the browser.",
          "When discovered, all major browsers revoked trust in DigiNotar's root certificate. Every website using DigiNotar certificates became untrusted overnight. DigiNotar went bankrupt within weeks. The incident highlighted that CA compromise = internet compromise. Certificate Transparency logs were created afterward to make all certificate issuance publicly auditable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Server Certificate", sub: "domain + public key + CA signature", type: "attacker" },
          { label: "Browser Verification", sub: "checks CA trust chain", type: "system" },
          { label: "Certificate Authority", sub: "signed by trusted root CA", type: "victim" },
          { label: "Encrypted Session", sub: "TLS handshake complete", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "SSL 2.0 introduced by Netscape for secure e-commerce" },
        { year: 1999, event: "TLS 1.0 standardized (RFC 2246) — SSL successor" },
        { year: 2011, event: "DigiNotar CA hacked — fraudulent certs used to spy on Iranian Gmail users", highlight: true },
        { year: 2016, event: "Let's Encrypt launches — free TLS certificates, HTTPS becomes universal" },
      ],
      keyTakeaways: [
        "TLS certificates prove server identity — signed by a trusted Certificate Authority",
        "Browsers ship with a built-in list of trusted CAs — all certs chain to one of these",
        "Certificate errors = do not proceed — someone may be impersonating the site",
        "Let's Encrypt makes certs free — but a valid cert only proves domain control, not legitimacy",
      ],
      references: [
        { title: "TLS/SSL Explained — Cloudflare", url: "https://www.cloudflare.com/learning/ssl/what-is-ssl/" },
        { title: "DigiNotar Incident — Mozilla Blog", url: "https://blog.mozilla.org/security/2011/09/02/diginotar-removal-follow-up/" },
      ],
    },
    ctf: {
      scenario: "The lifeguard tower's server has a certificate issue. Inspect the certificate, identify the problem, and determine if the connection is safe to trust.",
      hint: "Inspect the certificate fields to find what's wrong.",
      hints: [
        "Connect to the server and inspect the cert. Run: check-cert lifeguard-server.sc",
        "Check the certificate issuer. Run: check-issuer",
        "Check the expiry date. Run: check-expiry",
        "Check if the domain matches. Run: check-domain lifeguard-server.sc",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/cert-brief.txt",
          value: "FLAG{TLS_C3RT_",
          label: "Certificate Brief — Investigation Started",
        },
        {
          trigger: "/tls-notes.txt",
          value: "V3R1F1C4T10N_PR3V3NTS_",
          label: "TLS Notes — Untrusted Issuer Confirmed",
        },
        {
          trigger: "check-domain lifeguard-server.sc",
          value: "1MP3RS0N4T10N}",
          label: "Domain Check — All Certificate Issues Identified",
        },
      ],
      files: {
        "/cert-brief.txt": [
          "TLS CERTIFICATE INVESTIGATION — Lifeguard Tower #3",
          "====================================================",
          "Server: lifeguard-server.sc",
          "Port: 443",
          "",
          "Task: inspect the certificate for issues.",
          "Run: check-cert lifeguard-server.sc",
          "Then: check-issuer, check-expiry, check-domain",
        ].join("\n"),
        "/tls-notes.txt": [
          "TLS VERIFICATION CHECKLIST",
          "==========================",
          "1. Issuer must be a trusted CA (DigiCert, Let's Encrypt, etc.)",
          "2. Certificate must not be expired",
          "3. Subject CN must match the domain you are connecting to",
          "",
          "If any check fails: DO NOT trust the connection.",
          "An untrusted issuer means anyone could have signed this cert.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "cert-brief.txt", isDir: false },
          { name: "tls-notes.txt", isDir: false },
        ],
      },
      extraCommands: {
        "check-cert": (args) => ({
          lines: [
            `Connecting to ${args[0] || "server"}:443...`,
            "TLS Handshake initiated.",
            "",
            "Certificate received:",
            "  Subject: CN=lifeguard-server.sc",
            "  Issuer:  CN=Fake-CA-Not-Trusted",
            "  Valid:   2024-01-01 to 2025-01-01",
            "  Today:   2025-05-11",
            "",
            "⚠ WARNING: Issuer 'Fake-CA-Not-Trusted' is NOT in browser trust store.",
            "Run: check-issuer | check-expiry | check-domain lifeguard-server.sc",
          ],
        }),
        "check-issuer": () => ({
          lines: [
            "Certificate Issuer: CN=Fake-CA-Not-Trusted",
            "Status: NOT TRUSTED",
            "  This CA is not in any browser's trusted root store.",
            "  Anyone can create a certificate signed by an unknown CA.",
            "  This is a self-signed or rogue certificate.",
            "  DO NOT trust this connection.",
          ],
        }),
        "check-expiry": () => ({
          lines: [
            "Certificate Validity:",
            "  Not Before: 2024-01-01",
            "  Not After:  2025-01-01",
            "  Today:      2025-05-11",
            "  Status:     EXPIRED — certificate expired 4 months ago.",
          ],
        }),
        "check-domain": (args) => {
          const domain = args[0] || "";
          return {
            lines: [
              `Domain check: ${domain}`,
              "  Certificate Subject: CN=lifeguard-server.sc",
              `  Requested domain:    ${domain}`,
              `  Match: ${domain === "lifeguard-server.sc" ? "YES — domain matches" : "NO MATCH — certificate is for a different domain"}`,
              "",
              "Combined issues found: UNTRUSTED ISSUER + EXPIRED.",
              "This certificate should not be trusted.",
              "",
              "Run 'assemble' to retrieve your fragment.",
            ],
          };
        },
      },
    },
  },

  // ─── BT-15: Cookies ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Surf Club Check-In Desk", location: "Santa Cruz, USA", era: "Present Day", emoji: "🎫" },
    id: "bt-15",
    order: 15,
    title: "The Membership Wristband",
    subtitle: "Cookies and Sessions — How Websites Remember You",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-15", name: "Session Analyst", emoji: "🍪" },
    challengeType: "ctf",
    info: {
      tagline: "The surf club stamps your wrist so you don't pay again. Cookies do the same — your browser carries the stamp.",
      year: 2025,
      overview: [
        "When you check in at the surf club, the staff stamps your wrist. For the rest of the day, you flash the stamp — no need to pay again or prove your identity. HTTP cookies work exactly this way: after you log in, the server sets a cookie (a small text value) in your browser. Every subsequent request carries that cookie, and the server reads it to know who you are.",
        "HTTP is stateless by design: each request is independent with no memory of previous requests. Cookies solve this by storing a session token on the client side. The token is a random string (e.g., 'sess=a9f3b2e1...') that maps to your session data on the server. The server looks up that token and knows: this is Alice, she's logged in, she has these permissions.",
        "Cookies have security attributes: HttpOnly prevents JavaScript from reading the cookie (blocks XSS theft), Secure ensures the cookie only travels over HTTPS, and SameSite prevents the cookie from being sent in cross-site requests (blocks CSRF attacks). Missing these attributes creates serious vulnerabilities.",
      ],
      technical: {
        title: "Cookie Security Attributes",
        body: [
          "A secure session cookie should be set like: Set-Cookie: sess=abc123; HttpOnly; Secure; SameSite=Strict; Path=/. HttpOnly: JavaScript cannot access this cookie (document.cookie won't show it). Secure: browser only sends this cookie over HTTPS. SameSite=Strict: cookie not sent on cross-origin requests (CSRF protection).",
          "Session fixation: attacker sets a known session token before login, then victim logs in with that token — attacker now has a valid authenticated session. Mitigation: always regenerate the session token on login. Session hijacking: attacker steals a valid token (via XSS or network sniffing) and uses it to impersonate the victim.",
        ],
        codeExample: {
          label: "Inspecting and manipulating cookies",
          code: `# View cookies sent with a request
curl -v https://example.com/dashboard 2>&1 | grep Cookie

# Send a specific cookie to a server
curl -H "Cookie: session=abc123" https://example.com/dashboard

# See all cookies a site sets
curl -I https://example.com | grep Set-Cookie

# In browser DevTools (F12):
# Application tab → Cookies → see all cookies for domain`,
        },
      },
      incident: {
        title: "The Slack Session Cookie Theft — Zero-Click Account Takeover",
        when: "August 2022",
        where: "Slack's GitHub repositories",
        impact: "Attackers stole Slack employee tokens from code repos",
        body: [
          "Threat actors who had breached Twilio and Cloudflare in the same campaign accessed Slack's GitHub repositories using stolen employee session cookies. Rather than stealing passwords, they stole the session tokens — meaning they bypassed 2FA entirely because the session was already authenticated.",
          "This is the power of session cookie theft: if you have the cookie, you ARE the user from the server's perspective. The server has no way to distinguish a stolen session from a legitimate one. Modern mitigations include binding sessions to IP addresses, device fingerprinting, and short session lifetimes requiring frequent re-authentication.",
        ],
      },
      diagram: {
        nodes: [
          { label: "User Logs In", sub: "server creates session", type: "attacker" },
          { label: "Set-Cookie Header", sub: "server gives browser the token", type: "system" },
          { label: "Browser Stores Cookie", sub: "sends it on every request", type: "victim" },
          { label: "Server Reads Cookie", sub: "identifies user, authorizes", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "Lou Montulli invents HTTP cookies at Netscape for shopping cart state" },
        { year: 2000, event: "Hotmail cookie theft via URL vulnerabilities — first major cookie attack" },
        { year: 2010, event: "Firesheep: HTTP session cookie theft trivialized on open WiFi" },
        { year: 2022, event: "Slack GitHub breach via stolen session cookies — bypassed 2FA", highlight: true },
      ],
      keyTakeaways: [
        "Cookies solve HTTP's statelessness by storing a session token in the browser",
        "HttpOnly: blocks JavaScript access; Secure: HTTPS only; SameSite: blocks CSRF",
        "Stealing a session cookie = full account access, no password needed",
        "Always regenerate session tokens on login to prevent session fixation",
      ],
      references: [
        { title: "HTTP Cookies — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" },
        { title: "Cookie Security Attributes — OWASP", url: "https://owasp.org/www-community/controls/SecureCookieAttribute" },
      ],
    },
    ctf: {
      scenario: "The surf club's session cookie is missing the HttpOnly flag. Steal the admin's session cookie via a simulated XSS attack, use it to access the admin panel, and retrieve the flag.",
      hint: "The missing HttpOnly flag means JavaScript can read the cookie. Find the admin cookie and use it.",
      hints: [
        "Read the page's cookies via JavaScript. Run: js-read-cookies",
        "Find the admin session token. Run: read-session admin",
        "Use the stolen token to access admin. Run: access-as-admin sess_ADMIN_9f3e2b1a",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/cookie-policy.txt",
          value: "FLAG{HTTP_0NLY_",
          label: "Cookie Policy — Missing HttpOnly Attribute Found",
        },
        {
          trigger: "/session-log.txt",
          value: "PREV3NTS_C00K13_",
          label: "Session Log — Admin Token Identified",
        },
        {
          trigger: "access-as-admin sess_ADMIN_9f3e2b1a",
          value: "TH3FT}",
          label: "Admin Access — Session Hijack Demonstrated",
        },
      ],
      files: {
        "/cookie-policy.txt": [
          "SURF CLUB SESSION COOKIE CONFIGURATION",
          "=======================================",
          "Cookie: session_admin",
          "  Secure: true",
          "  HttpOnly: MISSING  ← vulnerability",
          "  SameSite: not set",
          "",
          "Because HttpOnly is not set, JavaScript (document.cookie)",
          "can read this cookie — enabling XSS-based theft.",
          "Run: js-read-cookies",
        ].join("\n"),
        "/session-log.txt": [
          "SESSION LOG — Surf Club Admin Panel",
          "=====================================",
          "Active sessions:",
          "  session_user=sess_7abc23    (wave_rider_7, regular member)",
          "  session_admin=sess_ADMIN_9f3e2b1a  (admin, full access)",
          "",
          "Both tokens are readable via document.cookie.",
          "Use: access-as-admin <token> to hijack the admin session.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "cookie-policy.txt", isDir: false },
          { name: "session-log.txt", isDir: false },
        ],
      },
      extraCommands: {
        "js-read-cookies": () => ({
          lines: [
            "Executing: document.cookie",
            "",
            "Result (HttpOnly NOT set — JavaScript can read all cookies):",
            "  user_prefs=theme=dark; lang=en",
            "  session_user=sess_7abc23; Path=/",
            "  session_admin=sess_ADMIN_9f3e2b1a; Path=/; Secure",
            "",
            "⚠ Admin session token exposed to JavaScript.",
            "If HttpOnly were set, this would return: [empty]",
            "Run: access-as-admin sess_ADMIN_9f3e2b1a",
          ],
        }),
        "read-session": (args) => {
          if (args[0] === "admin") {
            return { lines: ["Admin session token: sess_ADMIN_9f3e2b1a", "Expires: 24 hours from login"] };
          }
          return { lines: [`Session for ${args[0]}: not found`] };
        },
        "access-as-admin": (args) => {
          if (args[0] === "sess_ADMIN_9f3e2b1a") {
            return {
              lines: [
                "Sending request with stolen cookie:",
                "  Cookie: session_admin=sess_ADMIN_9f3e2b1a",
                "",
                "Server response: 200 OK — Welcome, admin",
                "Admin panel access granted.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: ["Invalid session token. Steal the admin cookie first."] };
        },
      },
    },
  },

  // ─── BT-16: APIs ──────────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Surf Conditions Hotline", location: "Santa Cruz, USA", era: "Present Day", emoji: "📞" },
    id: "bt-16",
    order: 16,
    title: "Calling the Surf Hotline",
    subtitle: "APIs — How Apps Talk to Each Other",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-16", name: "API Explorer", emoji: "🔌" },
    challengeType: "ctf",
    info: {
      tagline: "You call the surf hotline with a specific question, it answers with a specific format. That's an API.",
      year: 2025,
      overview: [
        "The surf hotline has a menu: press 1 for wave height, press 2 for wind speed, press 3 for tide times. You call a specific number, use a specific format, and get a specific answer. APIs (Application Programming Interfaces) work identically: structured endpoints you query with structured requests to get structured responses.",
        "When you use a weather app, the app calls the weather service's API: GET /api/weather?city=santa-cruz. The weather service returns JSON: {temperature: 68, wind: 12, conditions: 'sunny'}. Your app displays that data. You never see the API call — it happens invisibly in the background. Every modern app is built by assembling API calls.",
        "APIs are the backbone of the modern internet and also a major attack surface. API vulnerabilities — broken authentication, excessive data exposure, lack of rate limiting, IDOR — now account for the majority of significant data breaches. Securing APIs is one of the most important skills in modern security.",
      ],
      technical: {
        title: "REST APIs, Authentication, and Common Vulnerabilities",
        body: [
          "REST APIs communicate over HTTP using JSON. Authentication: API keys (a secret token in the request header), OAuth 2.0 (delegated access tokens), or JWT (JSON Web Tokens). Always sent in the Authorization header: 'Authorization: Bearer <token>'. Never in the URL where it will appear in logs.",
          "OWASP API Security Top 10: Broken Object Level Authorization (IDOR), Broken Authentication, Excessive Data Exposure, Lack of Resource Limits (no rate limiting), Function Level Authorization failures. The most common: APIs return more data than the app displays — attackers call the API directly and see all the hidden fields.",
        ],
        codeExample: {
          label: "Calling REST APIs with curl and Python",
          code: `# Basic authenticated API call
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.surfconditions.com/v1/forecast

# POST with JSON body
curl -X POST \\
     -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     -d '{"location": "steamer-lane"}' \\
     https://api.surfconditions.com/v1/report

# Python with requests library
import requests
resp = requests.get('https://api.example.com/data',
                   headers={'Authorization': 'Bearer mytoken'})
print(resp.json())`,
        },
      },
      incident: {
        title: "The Peloton API Breach — Unauthenticated API Returns Private Data",
        when: "May 2021",
        where: "Peloton API",
        impact: "4.5 million users' private profile data exposed to unauthenticated callers",
        body: [
          "Security researcher Jan Masters discovered that Peloton's API returned private user profile data — age, weight, location, workout history — to any caller, even without authentication. The Peloton app showed limited data, but calling the API directly returned the full object with all private fields.",
          "This is excessive data exposure: the API returned the full user object, the app just chose which fields to display. Attackers who called the API directly saw everything. Peloton dismissed the report initially, then took 3 months to fix it after it was published. 4.5 million users' private health data was accessible to anyone who knew the endpoint.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Client App", sub: "makes structured API request", type: "attacker" },
          { label: "API Endpoint", sub: "validates auth, routes request", type: "system" },
          { label: "Backend Service", sub: "processes, queries data", type: "victim" },
          { label: "JSON Response", sub: "structured data returned", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "REST API concept defined by Roy Fielding" },
        { year: 2006, event: "Twitter API launches — third-party apps built on APIs become mainstream" },
        { year: 2019, event: "OWASP publishes API Security Top 10 — dedicated category for API vulns" },
        { year: 2021, event: "Peloton API exposes 4.5M users' private data — no auth required", highlight: true },
      ],
      keyTakeaways: [
        "APIs are structured endpoints: call with a request, receive a structured response",
        "Auth via API keys or OAuth tokens in the Authorization header — never in the URL",
        "Excessive data exposure: API returns full object, app displays subset — attackers see all",
        "Rate limiting prevents abuse — without it, attackers enumerate all records",
      ],
      references: [
        { title: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
        { title: "Peloton API Exposure — TechCrunch", url: "https://techcrunch.com/2021/05/05/peloton-api-data-user-profiles/" },
      ],
    },
    ctf: {
      scenario: "The surf conditions API has several endpoints. One is undocumented and returns the admin key. Enumerate the API endpoints to find it and retrieve the hidden flag.",
      hint: "Try different API endpoint paths to find the undocumented one.",
      hints: [
        "Query the documented endpoints. Run: api /v1/forecast",
        "Try the conditions endpoint. Run: api /v1/conditions",
        "Try to find undocumented endpoints. Run: api /v1/admin",
        "Try the internal endpoint. Run: api /internal/config",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/api-docs.txt",
          value: "FLAG{4P1_3NUM3R4T10N_",
          label: "API Docs — Documented Endpoints Reviewed",
        },
        {
          trigger: "/endpoint-hints.txt",
          value: "F1NDS_H1DD3N_",
          label: "Endpoint Hints — Internal Path Discovered",
        },
        {
          trigger: "api /internal/config",
          value: "3NDP01NTS}",
          label: "Internal Config — Unauthenticated Endpoint Found",
        },
      ],
      files: {
        "/api-docs.txt": [
          "SURF CONDITIONS API — PUBLIC DOCUMENTATION",
          "==========================================",
          "Base URL: https://api.surfconditions.com",
          "",
          "Documented endpoints:",
          "  GET /v1/forecast    — wave height, wind, conditions",
          "  GET /v1/conditions  — per-break surf status",
          "  GET /v1/admin       — requires X-Admin-Token header",
          "",
          "Note: some internal endpoints are not listed here.",
          "Enumerate to discover them.",
        ].join("\n"),
        "/endpoint-hints.txt": [
          "API ENUMERATION NOTES",
          "=====================",
          "Common undocumented path patterns:",
          "  /internal/*     — backend config endpoints",
          "  /debug/*        — diagnostic endpoints",
          "  /v0/*           — legacy versions",
          "",
          "Try: api /internal/config",
          "Internal endpoints often lack authentication.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "api-docs.txt", isDir: false },
          { name: "endpoint-hints.txt", isDir: false },
        ],
      },
      extraCommands: {
        api: (args) => {
          const path = args[0] || "/";
          const routes: Record<string, string[]> = {
            "/v1/forecast": [
              "200 OK",
              '{"wave_height": "4-6ft", "wind": "offshore 8mph", "conditions": "excellent", "timestamp": "2025-05-11T08:00:00Z"}',
            ],
            "/v1/conditions": [
              "200 OK",
              '{"steamer_lane": "firing", "cowell": "mellow", "pleasure_point": "overhead+"}',
            ],
            "/v1/admin": [
              "403 Forbidden",
              '{"error": "Admin endpoint — requires X-Admin-Token header"}',
              "Hint: try /internal/ paths",
            ],
            "/internal/config": [
              "200 OK — (this endpoint has no authentication!)",
              "{",
              '  "db_host": "10.0.1.5",',
              '  "admin_key": "SECRET_SURF_ADMIN_KEY_42",',
              '  "note": "Internal endpoint — should not be publicly accessible"',
              "}",
              "",
              "Run 'assemble' to retrieve your fragment.",
            ],
          };
          const resp = routes[path];
          if (resp) {
            return { lines: resp, solved: path === "/internal/config" };
          }
          return { lines: [`404 Not Found: ${path}`] };
        },
      },
    },
  },

  // ─── BT-17 through BT-20 abbreviated for file size ─────────────────────────

  // ─── BT-17: Bandwidth ─────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Break at Pleasure Point", location: "Santa Cruz, USA", era: "Present Day", emoji: "🌊" },
    id: "bt-17",
    order: 17,
    title: "Size of the Wave",
    subtitle: "Bandwidth and Throughput — How Much Can Flow at Once",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-17", name: "Bandwidth Analyst", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "A big wave carries more water. A high-bandwidth connection carries more data per second.",
      year: 2025,
      overview: [
        "Pleasure Point has waves of all sizes. A 2-foot wave is enough for a longboard glide but can't power a big aerial. A 10-foot wave carries enough energy for the most demanding maneuvers. Bandwidth is the internet equivalent: how much data can flow through a connection per second, measured in Mbps (megabits per second) or Gbps.",
        "Bandwidth is the maximum capacity; throughput is the actual data transferred. A 100 Mbps connection might only achieve 60 Mbps throughput due to latency, packet loss, or network congestion — like a wide road where traffic jams slow cars below the speed limit. Understanding the difference matters for diagnosing slow networks.",
        "DDoS (Distributed Denial of Service) attacks weaponize bandwidth. Attackers send more data than the target's bandwidth can absorb — the connection fills up and legitimate traffic is dropped. The Cloudflare 2023 record DDoS peaked at 71 million requests per second — saturating bandwidth at the infrastructure level.",
      ],
      technical: {
        title: "Bandwidth vs Latency vs Throughput",
        body: [
          "Three distinct measurements: Bandwidth = pipe size (maximum bits/second). Latency = delay (milliseconds from send to receive, measured by ping). Throughput = actual data transferred per second (always ≤ bandwidth). High bandwidth + high latency = fast but laggy (satellite internet). Low bandwidth + low latency = slow but responsive (poor mobile signal).",
          "Bottlenecks: if your home is 1 Gbps but your ISP's link to the internet is 100 Mbps, your effective bandwidth is 100 Mbps. The slowest link in the chain is always the bottleneck. traceroute reveals where latency spikes, suggesting where bottlenecks or congestion occur on the path.",
        ],
        codeExample: {
          label: "Measuring bandwidth and diagnosing bottlenecks",
          code: `# Test your internet speed (CLI)
speedtest-cli          # install: pip install speedtest-cli

# Measure throughput to a specific server
iperf3 -c iperf.he.net   # download test
iperf3 -c iperf.he.net -R # upload test

# Find where the bottleneck is
traceroute google.com
# Look for the hop where latency suddenly increases`,
        },
      },
      incident: {
        title: "Cloudflare DDoS — 71 Million RPS Bandwidth Saturation",
        when: "February 2023",
        where: "Cloudflare global network",
        impact: "Largest recorded HTTP DDoS attack; infrastructure-level bandwidth saturation",
        body: [
          "In February 2023, Cloudflare mitigated the largest HTTP DDoS attack ever recorded: 71 million requests per second from a botnet of 30,000 IP addresses. The attack targeted multiple Cloudflare customers simultaneously, attempting to saturate bandwidth at the infrastructure level.",
          "Cloudflare's distributed architecture across 285+ data centers spread the load — no single data center was overwhelmed. They mitigated the attack within seconds using automated traffic analysis. The lesson: bandwidth-based DDoS is solved by having more bandwidth capacity than the attacker can throw at you, distributed globally.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Data Source", sub: "generating traffic", type: "attacker" },
          { label: "Network Link", sub: "bandwidth = maximum capacity", type: "system" },
          { label: "Congestion Point", sub: "throughput drops below bandwidth", type: "victim" },
          { label: "Destination", sub: "receives reduced throughput", type: "result" },
        ],
      },
      timeline: [
        { year: 1969, event: "ARPANET runs at 50 Kbps — state of the art for 1969" },
        { year: 2000, event: "Broadband (1 Mbps+) begins replacing dial-up (56 Kbps)" },
        { year: 2016, event: "Mirai botnet: 1.2 Tbps DDoS — bandwidth attack at terabit scale" },
        { year: 2023, event: "Cloudflare: 71M requests/sec DDoS — largest ever recorded", highlight: true },
      ],
      keyTakeaways: [
        "Bandwidth = maximum capacity; throughput = actual data rate (always ≤ bandwidth)",
        "Latency = delay in ms; high latency hurts real-time apps even on high-bandwidth links",
        "Bottleneck = slowest link in the chain — always limits total throughput",
        "DDoS bandwidth attacks flood the pipe until legitimate traffic can't get through",
      ],
      references: [
        { title: "Bandwidth vs Throughput — Cloudflare", url: "https://www.cloudflare.com/learning/network-layer/what-is-throughput/" },
        { title: "Record 71M RPS DDoS — Cloudflare Blog", url: "https://blog.cloudflare.com/cloudflare-mitigates-record-breaking-71-million-request-per-second-ddos-attack/" },
      ],
    },
    ctf: {
      scenario: "The Pleasure Point surf server is experiencing a bandwidth attack. Analyze the traffic, find the bottleneck, identify the attack traffic, and block it to restore normal throughput.",
      hint: "Measure traffic on each link, find the saturated one, then block the attack source.",
      hints: [
        "Check current bandwidth usage. Run: bandwidth-check",
        "Find where traffic is spiking. Run: trace-congestion",
        "Identify attack source. Run: top-talkers",
        "Block the attack traffic. Run: block-ip 185.220.101.0/24",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/network-topology.txt",
          value: "FLAG{B4NDW1DTH_",
          label: "Network Topology — Uplink Bottleneck Located",
        },
        {
          trigger: "/traffic-report.txt",
          value: "S4TUR4T10N_1S_",
          label: "Traffic Report — Attack Source Identified",
        },
        {
          trigger: "block-ip 185.220.101.0/24",
          value: "D0S}",
          label: "IP Block — DDoS Mitigated",
        },
      ],
      files: {
        "/network-topology.txt": [
          "PLEASURE POINT SURF SERVER — NETWORK TOPOLOGY",
          "===============================================",
          "  [Internet] ←→ [ISP Uplink: 1 Gbps] ←→ [Firewall] ←→ [Server: 10 Gbps]",
          "",
          "The ISP uplink is the narrowest link — 1 Gbps max.",
          "If inbound traffic exceeds 1 Gbps, the uplink saturates.",
          "Legitimate traffic: ~50 Mbps baseline.",
          "",
          "Run: bandwidth-check to see current utilization.",
        ].join("\n"),
        "/traffic-report.txt": [
          "TRAFFIC ANOMALY REPORT — Pleasure Point",
          "========================================",
          "Alert: ISP uplink at 99.7% utilization.",
          "Known attack range: 185.220.101.0/24 (Tor exit / DDoS botnet)",
          "",
          "Steps to mitigate:",
          "  1. Run: trace-congestion",
          "  2. Run: top-talkers",
          "  3. Run: block-ip 185.220.101.0/24",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "network-topology.txt", isDir: false },
          { name: "traffic-report.txt", isDir: false },
        ],
      },
      extraCommands: {
        "bandwidth-check": () => ({
          lines: [
            "Bandwidth Utilization Report:",
            "  Uplink to ISP (1 Gbps):        997 Mbps USED  ← 99.7% — nearly saturated",
            "  Internal server link (10 Gbps): 82 Mbps USED  (normal)",
            "  Legitimate surf traffic:         ~50 Mbps (normal baseline)",
            "",
            "Uplink is the bottleneck. Something is flooding the uplink.",
            "Run: trace-congestion",
          ],
        }),
        "trace-congestion": () => ({
          lines: [
            "Tracing congestion source...",
            "  Inbound traffic from internet: 947 Mbps",
            "  Expected legitimate traffic:    ~50 Mbps",
            "  Anomalous traffic:             ~897 Mbps",
            "",
            "Source: 185.220.101.0/24 — known Tor exit node / DDoS range",
            "Run: top-talkers",
          ],
        }),
        "top-talkers": () => ({
          lines: [
            "Top bandwidth consumers (last 60s):",
            "  185.220.101.15   → 312 Mbps  ← attack",
            "  185.220.101.42   → 298 Mbps  ← attack",
            "  185.220.101.87   → 287 Mbps  ← attack",
            "  203.0.113.5      → 12 Mbps   (legitimate surfer)",
            "  198.51.100.22    → 8 Mbps    (legitimate surfer)",
            "",
            "Run: block-ip 185.220.101.0/24",
          ],
        }),
        "block-ip": (args) => {
          if (args[0] === "185.220.101.0/24") {
            return {
              lines: [
                "Firewall rule added: DROP src=185.220.101.0/24",
                "",
                "Bandwidth utilization: 997 Mbps → 20 Mbps",
                "Attack traffic: BLOCKED",
                "Legitimate traffic: RESTORED",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`Unknown IP range: ${args[0]}. Check top-talkers output.`] };
        },
      },
    },
  },

  // ─── BT-18: Latency ───────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Surf Forecast Terminal, Boardwalk", location: "Santa Cruz, USA", era: "Present Day", emoji: "⏱️" },
    id: "bt-18",
    order: 18,
    title: "Waiting for the Set",
    subtitle: "Latency — The Delay Between Send and Receive",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-18", name: "Latency Hunter", emoji: "⚡" },
    challengeType: "ctf",
    info: {
      tagline: "You paddle out and wait for the set. Latency is how long you wait — it defines your experience.",
      year: 2025,
      overview: [
        "You're waiting in the lineup at the Boardwalk. The set arrives every 8–12 minutes — that interval is the latency of the ocean. In networking, latency is the delay between sending data and receiving a response, measured in milliseconds (ms). Low latency (under 50ms) is imperceptible. High latency (500ms+) makes apps feel sluggish and video calls choppy.",
        "Latency is determined by physics: data travels at roughly 2/3 the speed of light through fiber optic cables. A round trip from California to Europe is ~180ms just from the physical distance. Add processing time at each hop, queuing delays in congested routers, and TLS handshake round trips, and you quickly reach 300–400ms for a transatlantic connection.",
        "Latency matters enormously for security tools: intrusion detection that takes 500ms to analyze a packet misses real-time attacks. High-frequency trading firms pay millions for low-latency connections because milliseconds translate directly to competitive advantage. And for attackers, a high-latency connection between a victim and their security monitoring creates detection blind spots.",
      ],
      technical: {
        title: "Measuring Latency and Its Sources",
        body: [
          "Ping measures round-trip time (RTT): the time for a packet to reach a host and return. A ping of 20ms means data takes 10ms each way. Sources of latency: propagation delay (distance/speed of light), transmission delay (link bandwidth), processing delay (router CPU time), queuing delay (congested buffers). The first dominates for long-distance connections; the last dominates under load.",
          "Tools: ping (basic RTT), traceroute (per-hop latency to find bottlenecks), mtr (ping + traceroute combined, continuous). High latency at a specific hop in traceroute suggests congestion or a slow router at that point. Latency that increases proportionally with distance is normal; sudden spikes indicate congestion.",
        ],
        codeExample: {
          label: "Measuring and diagnosing latency",
          code: `# Basic ping — measure round trip time
ping google.com
# Look for "time=XXms"

# Trace latency hop by hop
traceroute google.com        # Mac/Linux
tracert google.com           # Windows

# Continuous ping + traceroute (mtr)
mtr google.com

# Measure latency to multiple servers and compare
ping 1.1.1.1     # Cloudflare (should be fast)
ping 8.8.8.8     # Google
ping 9.9.9.9     # Quad9`,
        },
      },
      incident: {
        title: "The 2012 AWS US-East Outage — Latency as a Cascading Failure",
        when: "October 22, 2012",
        where: "AWS US-East-1, Virginia",
        impact: "Reddit, Airbnb, Netflix degraded for hours",
        body: [
          "A network event in AWS US-East-1 caused elevated latency between availability zones. Services that relied on synchronous calls between zones started timing out — a 2ms call suddenly taking 2000ms caused cascading failures as services waited for responses that never came quickly enough.",
          "This illustrates how latency spikes cascade: one slow component causes the components waiting on it to back up, causing those components' callers to slow down, until the entire system grinds to a halt. The fix: design for latency — use async calls, set aggressive timeouts, and implement circuit breakers that fail fast rather than waiting.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Sender", sub: "data sent at T=0", type: "attacker" },
          { label: "Network Path", sub: "propagation + processing delays", type: "system" },
          { label: "Receiver", sub: "data arrives at T=Latency", type: "victim" },
          { label: "RTT = 2x Latency", sub: "round-trip time measured by ping", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "Ping concept developed alongside ARPANET protocols" },
        { year: 1983, event: "ping command written by Mike Muuss — still the primary latency tool today" },
        { year: 2012, event: "AWS US-East-1 latency cascade — slow network causes 6-hour partial outage", highlight: true },
        { year: 2020, event: "Submarine cable improvements cut US-Europe RTT to under 70ms" },
      ],
      keyTakeaways: [
        "Latency = one-way delay in ms; RTT (ping) = 2x one-way latency",
        "Sources: propagation (distance), transmission (bandwidth), processing, queuing (congestion)",
        "traceroute shows per-hop latency — spikes indicate congestion or slow hops",
        "Latency cascades: one slow component causes all upstream callers to queue up",
      ],
      references: [
        { title: "Network Latency Explained — Cloudflare", url: "https://www.cloudflare.com/learning/performance/glossary/what-is-latency/" },
        { title: "AWS October 2012 Outage — AWS Blog", url: "https://aws.amazon.com/message/680587/" },
      ],
    },
    ctf: {
      scenario: "Three CDN servers could serve the surf forecast. Measure latency to each, identify the fastest, and configure your connection to use it. The fastest server holds the flag.",
      hint: "Ping all three servers and route to the lowest latency one.",
      hints: [
        "Ping all three servers. Run: ping cdn-west",
        "Ping the second server. Run: ping cdn-central",
        "Ping the third server. Run: ping cdn-east",
        "Connect to the fastest. Run: connect-cdn cdn-west",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/cdn-map.txt",
          value: "FLAG{L0W_L4T3NCY_",
          label: "CDN Map — Server Locations Reviewed",
        },
        {
          trigger: "/ping-guide.txt",
          value: "W1NS_TH3_",
          label: "Ping Guide — Latency Comparison Complete",
        },
        {
          trigger: "connect-cdn cdn-west",
          value: "R4C3}",
          label: "Optimal CDN — Fastest Server Connected",
        },
      ],
      files: {
        "/cdn-map.txt": [
          "CDN SERVER MAP — Surf Forecast Network",
          "=======================================",
          "  cdn-west     → Santa Cruz, CA (closest to you)",
          "  cdn-central  → Dallas, TX",
          "  cdn-east     → Ashburn, VA",
          "",
          "Expected latency increases with distance.",
          "Run: ping cdn-west | ping cdn-central | ping cdn-east",
          "Then connect to the lowest-latency server.",
        ].join("\n"),
        "/ping-guide.txt": [
          "LATENCY MEASUREMENT GUIDE",
          "=========================",
          "RTT (round-trip time) = 2 × one-way latency.",
          "Lower is better for real-time applications.",
          "",
          "Thresholds:",
          "  < 20ms   — Excellent (local/regional)",
          "  20–100ms — Moderate (cross-country)",
          "  > 100ms  — High (intercontinental)",
          "",
          "After pinging all three, run: connect-cdn <fastest>",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "cdn-map.txt", isDir: false },
          { name: "ping-guide.txt", isDir: false },
        ],
      },
      extraCommands: {
        ping: (args) => {
          const host = args[0] || "";
          const latencies: Record<string, number> = {
            "cdn-west": 12,
            "cdn-central": 67,
            "cdn-east": 142,
          };
          const ms = latencies[host];
          if (ms !== undefined) {
            return { lines: [`PING ${host}: ${ms}ms (5 packet avg)`, ms < 20 ? "  ← Excellent latency" : ms < 100 ? "  ← Moderate latency" : "  ← High latency"] };
          }
          return { lines: [`Unknown host: ${host}. Try: cdn-west, cdn-central, cdn-east`] };
        },
        "connect-cdn": (args) => {
          if (args[0] === "cdn-west") {
            return {
              lines: [
                "Connecting to cdn-west (12ms latency)...",
                "Connection established. Fastest server selected.",
                "",
                "Surf forecast loaded in 12ms.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`cdn-${args[0] || "?"}: ${args[0] === "cdn-central" ? "67ms" : "142ms"} — not the fastest. Check your ping results.`] };
        },
      },
    },
  },

  // ─── BT-19: DNS Cache Poisoning ───────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Surf Contest Archive, Beach Flats", location: "Santa Cruz, USA", era: "Present Day", emoji: "📋" },
    id: "bt-19",
    order: 19,
    title: "The Tampered Records",
    subtitle: "DNS Cache Poisoning — Corrupting the Internet's Address Book",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-19", name: "Cache Investigator", emoji: "☣️" },
    challengeType: "ctf",
    info: {
      tagline: "If the surf contest records are forged, every surfer shows up at the wrong beach.",
      year: 2025,
      overview: [
        "The Beach Flats surf contest archive stores the official record of which surfer won which event. If someone tampers with those records — changing the venue from Steamer Lane to Capitola — every competitor shows up at the wrong location. DNS cache poisoning does exactly this: it corrupts your DNS resolver's cache so that when you look up 'bank.com', you get a malicious IP instead of the real one.",
        "Your DNS resolver caches responses to speed up future lookups. Cache poisoning attacks inject a fake DNS response into that cache — tricking the resolver into thinking that 'yourbank.com' points to the attacker's server. Every user relying on that resolver gets sent to a convincing fake site and their credentials are stolen.",
        "The Kaminsky attack of 2008 demonstrated that DNS cache poisoning could be done at scale against any DNS resolver. The fix — DNSSEC (DNS Security Extensions) — cryptographically signs DNS records so tampering is detectable. But DNSSEC adoption remains low, and DNS-over-HTTPS (DoH) is now the more practical alternative for end users.",
      ],
      technical: {
        title: "How Cache Poisoning Works and DNSSEC Defense",
        body: [
          "Classic cache poisoning: attacker sends a DNS query to a resolver, then floods it with fake responses pretending to be the authoritative server before the real response arrives. If one fake response arrives first with the right transaction ID, the resolver caches the fake record. The Kaminsky attack made this practical by exploiting the small 16-bit transaction ID space.",
          "DNSSEC adds digital signatures to DNS records. The authoritative server signs its records with a private key. Resolvers verify the signature using the public key published in the DNS hierarchy. Any tampered record has an invalid signature and is rejected. DNSKEY and DS records store the cryptographic material in DNS itself.",
        ],
        codeExample: {
          label: "Detecting poisoned DNS and using secure resolvers",
          code: `# Check if your current DNS response looks suspicious
dig yourbank.com
dig @8.8.8.8 yourbank.com   # compare against Google's resolver

# Check DNSSEC signatures
dig +dnssec yourbank.com    # look for RRSIG records

# Use DNS-over-HTTPS to prevent cache poisoning
# Configure in Firefox: Settings → DNS over HTTPS
# or use Cloudflare: 1.1.1.1 with DoH

# Check if a domain has DNSSEC
dig DS yourbank.com @8.8.8.8  # DS = Delegation Signer record`,
        },
      },
      incident: {
        title: "The 2008 Kaminsky DNS Cache Poisoning Vulnerability",
        when: "July 2008 (disclosed after patch coordinated)",
        where: "Every DNS resolver on the internet",
        impact: "Critical — every internet user vulnerable; emergency patch coordination across all vendors",
        body: [
          "Dan Kaminsky discovered that the 16-bit DNS transaction ID and source port combined gave only 32 bits of entropy — enough that an attacker could flood a resolver with fake responses and have a reasonable chance of poisoning its cache in under 10 seconds. This wasn't a new vulnerability in software — it was a fundamental flaw in the DNS protocol design.",
          "Kaminsky secretly coordinated patches with Microsoft, Cisco, BIND, and others for 3 months before disclosing. The patch added source port randomization, expanding entropy from 16 bits to ~32 bits. A CERT advisory was released simultaneously to all vendors. It's considered one of the best-coordinated vulnerability disclosures in history.",
        ],
      },
      diagram: {
        nodes: [
          { label: "DNS Query Sent", sub: "resolver asks for bank.com", type: "attacker" },
          { label: "Attacker Races", sub: "sends fake response first", type: "system" },
          { label: "Cache Poisoned", sub: "bank.com → attacker's IP", type: "victim" },
          { label: "Users Redirected", sub: "all users sent to fake site", type: "result" },
        ],
      },
      timeline: [
        { year: 1983, event: "DNS designed without authentication — poisoning theoretically possible from day one" },
        { year: 1997, event: "First practical DNS cache poisoning attack demonstrated" },
        { year: 2008, event: "Kaminsky discovers critical DNS flaw — emergency patching across all vendors", highlight: true },
        { year: 2010, event: "DNSSEC deployed for .com, .net, .org TLDs" },
      ],
      keyTakeaways: [
        "DNS cache poisoning injects fake records into a resolver's cache",
        "Poisoned cache redirects all users on that resolver to attacker-controlled IPs",
        "DNSSEC adds cryptographic signatures to prevent tampered records from being accepted",
        "DNS-over-HTTPS (DoH) prevents ISP interception and adds confidentiality",
      ],
      references: [
        { title: "Kaminsky DNS Vulnerability — CERT", url: "https://www.kb.cert.org/vuls/id/800113" },
        { title: "DNS Cache Poisoning — Cloudflare", url: "https://www.cloudflare.com/learning/dns/dns-cache-poisoning/" },
      ],
    },
    ctf: {
      scenario: "The Santa Cruz surf archive's DNS cache has been poisoned. Your resolver is sending users to the wrong IP for surf-archive.sc. Detect the poisoned entry, compare it to the authoritative answer, and purge it.",
      hint: "Compare your cached DNS response to the authoritative server's response.",
      hints: [
        "Check your local DNS cache for surf-archive.sc. Run: dns-cache surf-archive.sc",
        "Query the authoritative server directly. Run: dns-auth surf-archive.sc",
        "Compare the two answers. Run: compare-dns surf-archive.sc",
        "Flush the poisoned cache entry. Run: flush-cache surf-archive.sc",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/resolver-config.txt",
          value: "FLAG{DNS_C4CH3_",
          label: "Resolver Config — Poisoned Cache Detected",
        },
        {
          trigger: "/dns-notes.txt",
          value: "P01S0N1NG_1S_",
          label: "DNS Notes — IP Mismatch Confirmed",
        },
        {
          trigger: "flush-cache surf-archive.sc",
          value: "D3T3CT4BL3}",
          label: "Cache Flush — Poisoned Entry Purged",
        },
      ],
      files: {
        "/resolver-config.txt": [
          "LOCAL DNS RESOLVER — CACHE DUMP",
          "================================",
          "surf-archive.sc  A  185.220.101.50  TTL=287s  [CACHED]",
          "",
          "This IP does not match the authoritative answer.",
          "The cache entry was injected by an attacker.",
          "",
          "Run: dns-auth surf-archive.sc to see the real IP.",
          "Run: compare-dns surf-archive.sc to confirm mismatch.",
        ].join("\n"),
        "/dns-notes.txt": [
          "DNS CACHE POISONING — INVESTIGATION NOTES",
          "==========================================",
          "Attacker IP:      185.220.101.50  (known malicious)",
          "Legitimate IP:    198.51.100.77   (authoritative answer)",
          "",
          "All users on this resolver are being sent to the attacker.",
          "DNSSEC would have prevented this — signatures would not match.",
          "",
          "To remediate: flush-cache surf-archive.sc",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "resolver-config.txt", isDir: false },
          { name: "dns-notes.txt", isDir: false },
        ],
      },
      extraCommands: {
        "dns-cache": (args) => ({
          lines: [
            `Cached DNS record for ${args[0] || "?"}:`,
            "  A record: 185.220.101.50   ← attacker's server",
            "  TTL remaining: 287 seconds",
            "  Source: cached (not freshly resolved)",
          ],
        }),
        "dns-auth": (args) => ({
          lines: [
            `Querying authoritative NS for ${args[0] || "?"}:`,
            "  Authoritative server: ns1.surf-archive.sc",
            "  A record: 198.51.100.77   ← legitimate server",
            "  DNSSEC: not configured (no RRSIG)",
            "  TTL: 3600",
          ],
        }),
        "compare-dns": (args) => ({
          lines: [
            `DNS Comparison for ${args[0] || "?"}:`,
            "  Cached:        185.220.101.50  ← DIFFERENT",
            "  Authoritative: 198.51.100.77",
            "  MISMATCH DETECTED — cache is poisoned.",
            "  Users are being sent to the wrong server.",
            "  Run: flush-cache surf-archive.sc",
          ],
        }),
        "flush-cache": (args) => {
          if ((args[0] || "").includes("surf-archive")) {
            return {
              lines: [
                `Flushing poisoned cache entry for ${args[0]}...`,
                "  Removed: 185.220.101.50",
                "  Fresh lookup: 198.51.100.77  ✓",
                "  Cache updated with legitimate address.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`Unknown entry: ${args[0]}`] };
        },
      },
    },
  },

  // ─── BT-20: Load Balancing ────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Four Mile Beach", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏖️" },
    id: "bt-20",
    order: 20,
    title: "Spreading the Crowd",
    subtitle: "Load Balancing — Distributing Traffic Across Servers",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-20", name: "Load Balancer", emoji: "⚖️" },
    challengeType: "ctf",
    info: {
      tagline: "When Steamer Lane is packed, locals go to Four Mile. Load balancers spread the crowd the same way.",
      year: 2025,
      overview: [
        "On a big swell day, Steamer Lane is overcrowded. Local surfers spread out — some go to Cowell, some to Pleasure Point, some to Four Mile. No single break gets overwhelmed. Load balancers distribute incoming network traffic across multiple servers so no single server becomes a bottleneck or point of failure.",
        "A load balancer sits in front of a pool of servers. When a request arrives, it picks one server using an algorithm: round-robin (take turns), least connections (send to the least busy), or IP hash (same user always goes to same server). The client sees one IP but is actually served by one of many backend servers.",
        "Load balancing is both a performance tool and a security concern. Attackers targeting a specific server vulnerability may need to keep hitting the same backend (session persistence). Security teams use load balancers to absorb DDoS traffic, terminate TLS centrally, and route suspicious traffic to honeypots or deeper inspection.",
      ],
      technical: {
        title: "Load Balancing Algorithms and Health Checks",
        body: [
          "Round-robin: each request goes to the next server in rotation — simple but ignores server load. Least connections: route to the server with fewest active connections — better for varying request sizes. IP hash: hash the client IP and always route to the same backend — useful for sticky sessions without cookies.",
          "Health checks: load balancers continuously probe backends (HTTP GET /health → 200 OK). A server that fails health checks is removed from the pool. This enables zero-downtime deployments: deploy to one server, wait for health check to pass, remove old server from pool, repeat across the fleet.",
        ],
        codeExample: {
          label: "Nginx load balancer configuration",
          code: `# Basic nginx load balancer config
upstream surf_servers {
    server 10.0.1.10:80;   # backend 1
    server 10.0.1.11:80;   # backend 2
    server 10.0.1.12:80;   # backend 3

    # Algorithm options:
    least_conn;    # route to least busy
    # ip_hash;     # sticky sessions by client IP
}

server {
    listen 80;
    location / {
        proxy_pass http://surf_servers;
    }
}`,
        },
      },
      incident: {
        title: "The 2022 Heroku/GitHub Token Leak — Load Balancer Exposes Internal Routing",
        when: "April 2022",
        where: "Heroku and GitHub",
        impact: "Private GitHub OAuth tokens stolen; thousands of customer repos accessed",
        body: [
          "Attackers gained access to Heroku's internal systems and were able to query the load balancer's backend pool — discovering internal API servers not meant to be public. They then used the load balancer's privileged network position to access internal services and extract OAuth tokens stored in a database.",
          "The lesson: load balancers have privileged network access to all backends. A compromised load balancer (or misconfigured one) can expose internal infrastructure that's not meant to face the internet. Load balancers should have strict egress rules, be hardened, and internal endpoints should still require authentication even from trusted network ranges.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Client Requests", sub: "all arrive at load balancer", type: "attacker" },
          { label: "Load Balancer", sub: "distributes by algorithm", type: "system" },
          { label: "Backend Pool", sub: "server 1, 2, 3...", type: "victim" },
          { label: "Balanced Load", sub: "no single server overwhelmed", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "First commercial load balancers ship (Cisco LocalDirector)" },
        { year: 2006, event: "AWS Elastic Load Balancer launches — cloud-native load balancing" },
        { year: 2016, event: "Mirai DDoS overwhelms Dyn DNS — no load balancing could absorb 1.2 Tbps" },
        { year: 2022, event: "Heroku breach via load balancer internal access — tokens stolen from DB", highlight: true },
      ],
      keyTakeaways: [
        "Load balancers distribute traffic across server pools — no single point of failure",
        "Algorithms: round-robin (simple), least connections (smart), IP hash (sticky)",
        "Health checks auto-remove failed servers from the pool",
        "Load balancers have privileged access — hardening them is critical",
      ],
      references: [
        { title: "Load Balancing Explained — Cloudflare", url: "https://www.cloudflare.com/learning/performance/what-is-load-balancing/" },
        { title: "Heroku GitHub Breach — GitHub Blog", url: "https://github.blog/2022-04-15-security-alert-stolen-oauth-user-tokens/" },
      ],
    },
    ctf: {
      scenario: "You need to find which server in the load-balanced pool is serving a hidden flag. The load balancer routes round-robin across three backends. Probe each backend directly to find the one with the flag.",
      hint: "Probe each backend server directly to find the one hosting the flag.",
      hints: [
        "Check which server the load balancer gives you. Run: probe-lb",
        "Probe backend 1 directly. Run: probe-backend 10.0.1.10",
        "Probe backend 2 directly. Run: probe-backend 10.0.1.11",
        "Probe backend 3 directly. Run: probe-backend 10.0.1.12",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        {
          trigger: "/lb-config.txt",
          value: "FLAG{L04D_B4L4NC3R_",
          label: "LB Config — Backend Pool Identified",
        },
        {
          trigger: "/backend-map.txt",
          value: "D1STR1BUT3S_TH3_",
          label: "Backend Map — Admin Server Located",
        },
        {
          trigger: "probe-backend 10.0.1.12",
          value: "W4V3S}",
          label: "Backend Probe — Flag Server Found",
        },
      ],
      files: {
        "/lb-config.txt": [
          "LOAD BALANCER CONFIGURATION — Four Mile Surf Server",
          "=====================================================",
          "Algorithm: round-robin",
          "Backend pool:",
          "  10.0.1.10  — surf forecast data",
          "  10.0.1.11  — wave height data",
          "  10.0.1.12  — admin backend",
          "",
          "Health check: GET /health every 10s",
          "Run: probe-lb to see which backend responds.",
          "Run: probe-backend <ip> to hit a specific backend.",
        ].join("\n"),
        "/backend-map.txt": [
          "BACKEND SERVER MAP",
          "==================",
          "10.0.1.10  — public content (surf forecast)",
          "10.0.1.11  — public content (wave data)",
          "10.0.1.12  — admin backend (should be internal-only)",
          "",
          "The load balancer exposes all three backends equally.",
          "Probe each to find the one with sensitive content.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "lb-config.txt", isDir: false },
          { name: "backend-map.txt", isDir: false },
        ],
      },
      extraCommands: {
        "probe-lb": () => ({
          lines: [
            "Load balancer response:",
            "  You hit: backend server (round-robin — varies each request)",
            "  X-Served-By: one of [10.0.1.10, 10.0.1.11, 10.0.1.12]",
            "  To probe specific backends: probe-backend <ip>",
          ],
        }),
        "probe-backend": (args) => {
          const ip = args[0] || "";
          if (ip === "10.0.1.10") {
            return { lines: [`Backend ${ip}: 200 OK`, "  Content: Surf forecast data — nothing special here."] };
          }
          if (ip === "10.0.1.11") {
            return { lines: [`Backend ${ip}: 200 OK`, "  Content: Wave height data — standard response."] };
          }
          if (ip === "10.0.1.12") {
            return {
              lines: [
                `Backend ${ip}: 200 OK`,
                "  Content: ADMIN BACKEND — this server has the flag.",
                "",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`No backend at ${ip}. Try: 10.0.1.10, 10.0.1.11, or 10.0.1.12`] };
        },
      },
    },
  },
];
