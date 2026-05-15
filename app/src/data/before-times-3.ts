import type { StageConfig } from "./types";

export const beforeTimesStages3: StageConfig[] = [

  // ─── BT-21: Phishing ──────────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Fisherman's Wharf", location: "Monterey, USA", era: "Present Day", emoji: "🎣" },
    id: "bt-21",
    order: 21,
    title: "Spotting Fake Bait",
    subtitle: "Phishing — When the Lure Looks Real",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-21", name: "Phish Spotter", emoji: "🪝" },
    challengeType: "ctf",
    info: {
      tagline: "A lure is designed to look exactly like real food. Phishing emails are designed to look exactly like real emails.",
      year: 2025,
      overview: [
        "You're at Fisherman's Wharf preparing for a fishing trip. The tackle shop sells dozens of lures — fake shrimp, fake squid, fake anchovies — all designed to fool a fish into biting. Phishing emails work identically: they mimic real emails from banks, employers, government agencies, or tech companies to trick you into clicking a link or entering credentials.",
        "Phishing is the #1 initial access vector for cyberattacks. Over 90% of breaches start with a phishing email. Attackers craft emails that look legitimate: correct logos, familiar sender names, urgent language, and links to convincing fake websites. The goal is to steal credentials, install malware, or trick you into wire-transferring money.",
        "Recognizing phishing requires looking past the visual design to the technical details: the actual sender email domain (not the display name), the real URL behind a link (hover before clicking), unexpected urgency or requests, and requests for information the sender should already have.",
      ],
      technical: {
        title: "Phishing Indicators and Types",
        body: [
          "Key indicators: mismatched sender domain (display name says 'PayPal Support' but email is from paypa1-support@gmail.com), urgent or threatening language ('Your account will be closed in 24 hours'), requests for credentials or payment, links that don't match the stated destination (hover to see real URL), unexpected attachments.",
          "Types: spear phishing (targeted at a specific person, uses personal details to seem credible), whaling (targets executives for wire transfer fraud — 'CEO fraud'), vishing (voice phishing — phone calls), smishing (SMS phishing). Business Email Compromise (BEC) costs organizations $2.7B per year — the most financially damaging cybercrime category.",
        ],
        codeExample: {
          label: "Analyzing a suspicious email from the command line",
          code: `# View raw email headers (shows real sender path)
# In Gmail: '...' menu → Show Original

# Check the sending domain's SPF record
dig TXT example.com | grep spf

# Check DKIM signature
# Look for "DKIM-Signature:" in raw headers

# Analyze links without clicking
# Hover over the link and check the URL in your status bar
# Or use: curl -I "https://suspicious-url.com" to check redirect chain`,
        },
      },
      incident: {
        title: "The 2016 DNC Hack — Spear Phishing Email Cracked the Election",
        when: "March 2016",
        where: "Democratic National Committee, Washington DC",
        impact: "51,000 emails stolen; significant influence on 2016 US Presidential election",
        body: [
          "A spear phishing email was sent to John Podesta, Hillary Clinton's campaign chairman. The email appeared to be a Google security alert: 'Someone has your password. Change it immediately.' The link went to a convincing fake Google login page. Podesta's aide told him the email was legitimate (a typo — they meant to say 'illegitimate'). Podesta entered his credentials.",
          "Russian intelligence (APT28/Fancy Bear) had his Gmail password within seconds. They downloaded 51,000 emails over months. WikiLeaks published them in October 2016. The entire operation began with a single convincing phishing email. There was no technical exploit — just social engineering through a well-crafted lure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Phishing Email", sub: "fake sender, urgent language", type: "attacker" },
          { label: "Victim Opens It", sub: "sees convincing branding", type: "system" },
          { label: "Clicks Fake Link", sub: "goes to credential harvester", type: "victim" },
          { label: "Credentials Stolen", sub: "attacker logs in as victim", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "Term 'phishing' coined on AOL — attackers pose as AOL staff to steal passwords" },
        { year: 2003, event: "PayPal phishing campaigns begin — financial phishing becomes mainstream" },
        { year: 2016, event: "DNC spear phish — one email leads to 51K stolen messages, election impact", highlight: true },
        { year: 2023, event: "BEC (Business Email Compromise) costs $2.7B — ICCC report" },
      ],
      keyTakeaways: [
        "Check the actual sender email domain, not just the display name",
        "Hover over links before clicking — the real URL shows in the status bar",
        "Urgency and threats are manipulation tactics — slow down and verify",
        "Spear phishing uses personal details to seem credible — don't trust familiarity alone",
      ],
      references: [
        { title: "Phishing Explained — CISA", url: "https://www.cisa.gov/sites/default/files/publications/phishing-infographic-508c.pdf" },
        { title: "DNC Hack Attribution — Mueller Report", url: "https://www.justice.gov/archives/sco/file/1373816/dl" },
      ],
    },
    ctf: {
      scenario: "Your inbox has three emails — one is a phishing attempt. Inspect each email's headers, sender domain, and links to identify the fake and report it before you click anything.",
      hint: "Inspect headers and links carefully — don't trust the display name.",
      hints: [
        "Read the first email. Run: read-email 1",
        "Read the second email. Run: read-email 2",
        "Read the third email. Run: read-email 3",
        "Report the phishing email. Run: report-phish <email-number>",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{PH1SH1NG_H1D3S_B3H1ND_F4K3_D0M41NS}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "read-email 1",
          value: "FLAG{PH1SH1NG_",
          label: "Inbox Scan — Legitimate Email Identified",
        },
        {
          trigger: "read-email 2",
          value: "H1D3S_B3H1ND_",
          label: "Header Analysis — Typosquatted Domain Spotted",
        },
        {
          trigger: "report-phish 2",
          value: "F4K3_D0M41NS}",
          label: "Threat Reported — Phishing Campaign Neutralised",
        },
      ],
      extraCommands: {
        "read-email": (args) => {
          const num = args[0] || "1";
          const emails: Record<string, string[]> = {
            "1": [
              "FROM: Monterey Bay Fishing Club <newsletter@montereyfishingclub.org>",
              "TO: you@example.com",
              "SUBJECT: June Fishing Calendar",
              "HEADERS: DKIM=pass; SPF=pass; DMARC=pass",
              "",
              "Hi member, here's your June fishing schedule...",
              "Link: https://montereyfishingclub.org/calendar  ← matches sender domain ✓",
              "",
              "Verdict: LEGITIMATE",
            ],
            "2": [
              "FROM: PayPal Security <security@paypa1-alert.com>",
              "TO: you@example.com",
              "SUBJECT: ⚠ URGENT: Your PayPal account has been limited!",
              "HEADERS: DKIM=fail; SPF=fail; DMARC=fail",
              "",
              "Your account has been LIMITED. Verify immediately or lose access!",
              "Link: https://paypa1-alert.com/verify  ← NOT paypal.com",
              "Display name says PayPal but domain is paypa1-alert.com (1 not l)",
              "",
              "Verdict: PHISHING — mismatched domain, failed auth, urgent threat",
            ],
            "3": [
              "FROM: Captain Dave <dave@monterey-charters.com>",
              "TO: you@example.com",
              "SUBJECT: Your charter booking confirmation",
              "HEADERS: DKIM=pass; SPF=pass; DMARC=pass",
              "",
              "Your fishing charter is confirmed for Saturday 8am...",
              "Link: https://monterey-charters.com/booking/12345  ← matches ✓",
              "",
              "Verdict: LEGITIMATE",
            ],
          };
          return { lines: emails[num] || [`No email #${num}`] };
        },
        "report-phish": (args) => {
          if (args[0] === "2") {
            return {
              lines: [
                "Email #2 reported as phishing.",
                "Indicators confirmed:",
                "  ✗ Sender domain: paypa1-alert.com (not paypal.com)",
                "  ✗ '1' used instead of 'l' in domain — typosquatting",
                "  ✗ DKIM/SPF/DMARC: all failed",
                "  ✗ Urgent threatening language",
                "  ✗ Link goes to attacker domain, not paypal.com",
                "",
                "  ┌──────────────────────────────────────────────────────────┐",
                "  │  PHISHING IDENTIFIED. NEVER TRUST DISPLAY NAMES ALONE.  │",
                "  │                                                          │",
                "  │  Run 'assemble' to retrieve your fragment.               │",
                "  └──────────────────────────────────────────────────────────┘",
              ],
            };
          }
          return { lines: [`Email #${args[0]} is legitimate. Check all three emails carefully.`] };
        },
      },
    },
  },

  // ─── BT-22: Two-Factor Authentication ─────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Charter Boat Dock, Coast Guard Pier", location: "Monterey, USA", era: "Present Day", emoji: "🚢" },
    id: "bt-22",
    order: 22,
    title: "The Double Lock",
    subtitle: "Two-Factor Authentication — Two Keys to Start the Boat",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-22", name: "2FA Guardian", emoji: "🔐" },
    challengeType: "ctf",
    info: {
      tagline: "The charter boat needs two keys to start: the ignition key AND the captain's code. Lose one, the boat stays docked.",
      year: 2025,
      overview: [
        "The charter boat at Coast Guard Pier requires two actions to start the engine: insert the ignition key AND enter a 4-digit captain's code. Someone stealing just the key can't start the boat. Someone who knows just the code can't either. Two-factor authentication (2FA) applies this principle to logins: something you know (password) plus something you have (phone, hardware key) or something you are (fingerprint).",
        "2FA stops credential theft attacks cold. If an attacker phishes your password, they still can't log in without the second factor. The 2023 statistics are stark: accounts with 2FA enabled are 99.9% less likely to be compromised than those without. Microsoft's data shows 2FA blocks virtually all automated attacks.",
        "Types of second factors: SMS codes (convenient but vulnerable to SIM swapping), authenticator app TOTP codes (more secure, offline), hardware keys like YubiKey (most secure, phishing-resistant), and biometrics (fingerprint, face). SMS is the weakest — use an authenticator app or hardware key for sensitive accounts.",
      ],
      technical: {
        title: "How TOTP (Authenticator Apps) Work",
        body: [
          "TOTP (Time-based One-Time Password, RFC 6238): when you set up 2FA with an authenticator app, the server shares a secret key with your app. Every 30 seconds, both the server and your app independently compute HMAC-SHA1(secret + current_time_window) and take the last 6 digits. Because they share the secret and time is synchronized, they get the same 6-digit code — without any communication.",
          "SIM swapping: attacker calls your carrier, impersonates you using social engineering, gets your phone number transferred to their SIM card. Now they receive your SMS codes. In 2019, Twitter's CEO Jack Dorsey had his account hacked this way. Authenticator apps and hardware keys are immune to SIM swapping — they don't use the phone number.",
        ],
        codeExample: {
          label: "Generating TOTP codes in Python",
          code: `import pyotp
import time

# Generate a TOTP secret (do this once, store securely)
secret = pyotp.random_base32()
print(f"Secret: {secret}")  # share with authenticator app

# Generate the current 6-digit code
totp = pyotp.TOTP(secret)
print(f"Current code: {totp.now()}")  # valid for 30 seconds

# Verify a code from the user
user_code = "123456"
is_valid = totp.verify(user_code)
print(f"Valid: {is_valid}")`,
        },
      },
      incident: {
        title: "The 2022 Uber Hack — Social Engineering Past 2FA",
        when: "September 15, 2022",
        where: "Uber Technologies",
        impact: "Full internal network access; source code, internal tools, HackerOne reports exposed",
        body: [
          "An 18-year-old attacker compromised Uber by targeting a contractor. The contractor had valid credentials and 2FA. The attacker used MFA fatigue: they sent repeated 2FA push notifications until the contractor, annoyed by the constant prompts, finally clicked 'Approve' just to make them stop. Then they texted the contractor pretending to be Uber IT, saying the approvals were a test.",
          "With the approved session, the attacker found a PowerShell script on an internal share containing hard-coded admin credentials for Uber's Thycotic PAM system. From there, they had access to everything. Lesson: 2FA is not foolproof against social engineering. Number-matching 2FA (show the same number on login and push notification) defeats MFA fatigue attacks.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Password Stolen", sub: "phishing or breach", type: "attacker" },
          { label: "Login Attempted", sub: "attacker has password", type: "system" },
          { label: "2FA Required", sub: "second factor blocks access", type: "victim" },
          { label: "Access Denied", sub: "password alone is useless", type: "result" },
        ],
      },
      timeline: [
        { year: 1986, event: "RSA SecurID — first commercial hardware 2FA token" },
        { year: 2011, event: "Google Authenticator released — TOTP goes mainstream" },
        { year: 2019, event: "Jack Dorsey (Twitter CEO) account hacked via SIM swap — bypassed SMS 2FA", highlight: true },
        { year: 2022, event: "Uber hack via MFA fatigue — social engineering defeats push-notification 2FA" },
      ],
      keyTakeaways: [
        "2FA requires two factors: something you know + something you have/are",
        "Accounts with 2FA are 99.9% less likely to be compromised",
        "SMS 2FA is the weakest — vulnerable to SIM swapping; use an authenticator app",
        "MFA fatigue: attackers spam push notifications until victim approves by mistake",
      ],
      references: [
        { title: "Multi-Factor Authentication — CISA", url: "https://www.cisa.gov/mfa" },
        { title: "Uber 2022 Breach Analysis — Uber", url: "https://www.uber.com/newsroom/security-update/" },
      ],
    },
    ctf: {
      scenario: "A charter service's login system has 2FA on one account and not the other. Try to break into both and observe the difference. Then enable 2FA on the vulnerable account.",
      hint: "Try logging into both accounts with the stolen password. Only the one without 2FA will succeed.",
      hints: [
        "Try logging into the account without 2FA. Run: login captain-no2fa P4ssw0rd",
        "Try the account with 2FA. Run: login captain-2fa P4ssw0rd",
        "Attempt to bypass 2FA. Run: bypass-2fa captain-2fa",
        "Enable 2FA on the vulnerable account. Run: enable-2fa captain-no2fa",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{2F4_ST0PS_ST0L3N_P4SSW0RDS}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "login captain-no2fa P4ssw0rd",
          value: "FLAG{2F4_",
          label: "Weak Account — Password Alone Grants Access",
        },
        {
          trigger: "bypass-2fa captain-2fa",
          value: "ST0PS_ST0L3N_",
          label: "Bypass Attempted — Second Factor Cannot Be Skipped",
        },
        {
          trigger: "enable-2fa captain-no2fa",
          value: "P4SSW0RDS}",
          label: "Account Hardened — 2FA Now Blocks Stolen Credentials",
        },
      ],
      extraCommands: {
        login: (args) => {
          const user = args[0] || "";
          const pass = args[1] || "";
          if (user === "captain-no2fa" && pass === "P4ssw0rd") {
            return {
              lines: [
                "Login successful: captain-no2fa",
                "⚠ No 2FA on this account.",
                "Attacker is now logged in with just the stolen password.",
                "All charter bookings and customer data: EXPOSED.",
                "",
                "Run: enable-2fa captain-no2fa to fix this.",
              ],
            };
          }
          if (user === "captain-2fa") {
            return {
              lines: [
                "Password accepted for captain-2fa.",
                "→ 2FA required: enter your 6-digit authenticator code.",
                "  Attacker does not have the physical authenticator device.",
                "  Access: DENIED.",
                "  (Try: bypass-2fa captain-2fa)",
              ],
            };
          }
          return { lines: ["Login failed. Try: login captain-no2fa P4ssw0rd"] };
        },
        "bypass-2fa": () => ({
          lines: [
            "Attempting to bypass 2FA for captain-2fa...",
            "  Brute force TOTP codes: failed (codes expire every 30s)",
            "  Replay attack: failed (codes are single-use)",
            "  SIM swap: not applicable (uses authenticator app, not SMS)",
            "",
            "2FA: CANNOT BE BYPASSED without the physical device.",
            "This is why 2FA matters.",
          ],
        }),
        "enable-2fa": (args) => {
          if ((args[0] || "").includes("no2fa")) {
            return {
              lines: [
                "Enabling 2FA for captain-no2fa...",
                "  Generating TOTP secret...",
                "  QR code generated — scan with authenticator app.",
                "  2FA: ENABLED.",
                "",
                "  ┌──────────────────────────────────────────────────────┐",
                "  │  2FA ENABLED. STOLEN PASSWORD NOW USELESS ALONE.    │",
                "  │                                                      │",
                "  │  Run 'assemble' to retrieve your fragment.           │",
                "  └──────────────────────────────────────────────────────┘",
              ],
            };
          }
          return { lines: [`Unknown account: ${args[0]}`] };
        },
      },
    },
  },

  // ─── BT-23: Strong Passwords ──────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Tackle Shop, Cannery Row", location: "Monterey, USA", era: "Present Day", emoji: "🎏" },
    id: "bt-23",
    order: 23,
    title: "The Bait Locker Combination",
    subtitle: "Password Strength — Why Complexity and Length Both Matter",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-23", name: "Password Architect", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "A 3-digit padlock has 1,000 combinations. A 6-digit lock has 1,000,000. Length beats cleverness every time.",
      year: 2025,
      overview: [
        "The tackle shop's bait locker uses a combination lock. A 3-digit lock (000–999) can be cracked by trying all 1,000 combinations in minutes. A 6-digit lock takes 1,000x longer. An 8-digit lock: 100,000x longer. Password strength works by the same math: more characters = exponentially more combinations = exponentially more time to crack.",
        "A password's strength comes from entropy — the number of bits required to represent it as information. A random 8-character password using lowercase only has 26^8 ≈ 200 billion combinations. Add uppercase (52^8) and numbers (62^8) — 218 trillion combinations. Add length to 16 characters: 62^16 ≈ 47 sextillion. Modern password crackers run at 100 billion guesses per second on GPU hardware.",
        "The common advice to use 'complex' passwords (P@ssw0rd1!) is actually less secure than a long passphrase (correct-horse-battery-staple). Attackers' dictionaries include all common substitutions. Length wins. Use a passphrase of 4+ random words, or let a password manager generate a fully random 20-character string.",
      ],
      technical: {
        title: "How Password Cracking Works",
        body: [
          "Offline cracking: attacker obtains the database of hashed passwords (via a breach). They hash guesses and compare against the stolen hashes. With a modern GPU, they can try 100 billion MD5 hashes per second, 10 billion bcrypt hashes per second. Dictionary attacks try common words and patterns first; brute force tries all combinations of a given character set and length.",
          "Salting: a random salt is added to each password before hashing, so two users with the same password have different hashes. This prevents rainbow table attacks (precomputed hash lookups) and forces the attacker to crack each hash individually. bcrypt, scrypt, and Argon2 are designed to be deliberately slow, making large-scale cracking impractical.",
        ],
        codeExample: {
          label: "Calculating password entropy and cracking time",
          code: `import math

def password_entropy(length, charset_size):
    return length * math.log2(charset_size)

# Examples:
# 8 chars, lowercase only (26):      38 bits
# 8 chars, mixed case + nums (62):   47 bits
# 12 chars, mixed case + nums (62):  71 bits
# 4-word passphrase (7776 words):    51 bits
# 20 random chars (95 printable):   131 bits

# At 100 billion guesses/second:
# 38 bits: cracks in seconds
# 71 bits: cracks in ~750 years
# 131 bits: cracks in longer than the universe's age`,
        },
      },
      incident: {
        title: "The RockYou Breach — 32 Million Passwords in Plaintext",
        when: "December 2009",
        where: "RockYou social gaming platform",
        impact: "32 million passwords stored in plaintext; most common passwords revealed; rockyou.txt still used today",
        body: [
          "RockYou stored 32 million user passwords in plaintext with no hashing. An SQL injection attack exposed the entire database. The dump became the most famous password list in cybersecurity — 'rockyou.txt' is still the first wordlist every password cracking tool tries. The most common password: '123456' (used by 290,731 accounts). Second: '12345'. Third: '123456789'.",
          "The analysis revealed that 99% of users chose passwords from a tiny set of patterns: keyboard walks (qwerty, asdf), simple words with number suffixes (password1), names, and sequential numbers. Every modern password cracker starts with these patterns. If your password is guessable by a human, it's certainly guessable by a GPU.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Short/Simple Password", sub: "8 chars, common pattern", type: "attacker" },
          { label: "GPU Cracker", sub: "100B guesses/second", type: "system" },
          { label: "Cracked in Seconds", sub: "dictionary match found", type: "victim" },
          { label: "Long Random Password", sub: "20 chars: centuries to crack", type: "result" },
        ],
      },
      timeline: [
        { year: 1961, event: "First computer password system at MIT CTSS" },
        { year: 1979, event: "Unix introduces /etc/passwd with hashed passwords — salting invented" },
        { year: 2009, event: "RockYou breach — 32M plaintext passwords; rockyou.txt born", highlight: true },
        { year: 2012, event: "LinkedIn breach — 117M SHA-1 unsalted hashes cracked in days" },
      ],
      keyTakeaways: [
        "Length beats complexity — 4 random words is stronger than 8 complex characters",
        "Use a password manager to generate and store truly random 20-character passwords",
        "Never reuse passwords — one breach compromises all reused accounts",
        "Hashing with salt (bcrypt/Argon2) makes cracking computationally expensive",
      ],
      references: [
        { title: "Password Strength — NIST SP 800-63B", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
        { title: "RockYou Password List Analysis", url: "https://www.imperva.com/blog/the-top-500-worst-passwords-of-all-time/" },
      ],
    },
    ctf: {
      scenario: "The bait locker uses two different password schemes. Crack the weak one to prove the point, then observe why the strong one is uncrackable with the same tools.",
      hint: "Try to crack both passwords. Only the weak one will fall.",
      hints: [
        "Attempt to crack the weak password hash. Run: crack weak-hash",
        "Attempt to crack the strong password hash. Run: crack strong-hash",
        "Analyze what makes the difference. Run: analyze-strength",
        "Confirm your understanding. Run: submit-analysis",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{L3NGTH_4ND_R4ND0MN3SS_W1N_3V3RY_T1M3}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "crack weak-hash",
          value: "FLAG{L3NGTH_",
          label: "Weak Hash Cracked — Dictionary Attack Succeeds Instantly",
        },
        {
          trigger: "analyze-strength",
          value: "4ND_R4ND0MN3SS_W1N_",
          label: "Entropy Analysed — Length and Randomness Define Strength",
        },
        {
          trigger: "submit-analysis",
          value: "3V3RY_T1M3}",
          label: "Analysis Confirmed — Password Manager Is the Answer",
        },
      ],
      extraCommands: {
        crack: (args) => {
          const target = args[0] || "";
          if (target === "weak-hash") {
            return {
              lines: [
                "Cracking weak-hash (MD5, no salt)...",
                "  Hash: 5f4dcc3b5aa765d61d8327deb882cf99",
                "  Trying rockyou.txt dictionary... HIT at entry #1",
                "  Password: 'password'",
                "  Time: 0.003 seconds",
                "",
                "Cracked instantly. This password was useless.",
              ],
            };
          }
          if (target === "strong-hash") {
            return {
              lines: [
                "Cracking strong-hash (Argon2id, salted)...",
                "  Hash: $argon2id$v=19$m=65536,t=3,p=4$...",
                "  Trying rockyou.txt dictionary... 0 matches",
                "  Trying brute force (20 random chars, 95 charset)...",
                "  Estimated time at 100B guesses/sec: 3.2 × 10^28 years",
                "",
                "NOT CRACKABLE. Password: 20 random chars with Argon2id.",
              ],
            };
          }
          return { lines: [`Unknown target: ${target}. Try: crack weak-hash or crack strong-hash`] };
        },
        "analyze-strength": () => ({
          lines: [
            "Password Strength Analysis:",
            "",
            "Weak:   'password'",
            "  Length: 8  |  Charset: 26 (lowercase)  |  Entropy: 38 bits",
            "  In top 10 of every password dictionary. Cracked instantly.",
            "",
            "Strong: 20-char random (a-z, A-Z, 0-9, symbols)",
            "  Length: 20  |  Charset: 95  |  Entropy: 131 bits",
            "  Cracking time: longer than the age of the universe.",
            "",
            "Use a password manager. Run: submit-analysis",
          ],
        }),
        "submit-analysis": () => ({
          lines: [
            "Analysis confirmed:",
            "  Weak passwords crack in milliseconds.",
            "  Strong random passwords are computationally uncrackable.",
            "  Use a password manager to generate them.",
            "",
            "  ┌────────────────────────────────────────────────────────────┐",
            "  │  PASSWORD STRENGTH MASTERED. USE A PASSWORD MANAGER.     │",
            "  │                                                           │",
            "  │  Run 'assemble' to retrieve your fragment.                │",
            "  └────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-24: Public WiFi ───────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Open Water, Monterey Bay", location: "Monterey Bay, USA", era: "Present Day", emoji: "📡" },
    id: "bt-24",
    order: 24,
    title: "Open Radio Frequencies",
    subtitle: "Public WiFi — When Everyone Can Hear Your Conversation",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-24", name: "WiFi Analyst", emoji: "📶" },
    challengeType: "ctf",
    info: {
      tagline: "On open water, anyone with a radio can hear your marine channel broadcast. Open WiFi is the same.",
      year: 2025,
      overview: [
        "Out on Monterey Bay, fishing boats communicate on marine radio channel 16 — an open, unencrypted frequency anyone with a radio can tune into. Your conversations are public. Open WiFi networks (coffee shops, airports, hotels) work identically: unencrypted connections that anyone within radio range can capture and read with freely available tools.",
        "On an open WiFi network, all unencrypted traffic — HTTP requests, DNS queries, plaintext emails — is visible to any device on the same network. An attacker with a laptop running Wireshark can capture all traffic passively without sending a single packet. They're just listening on the shared medium, exactly like tuning a radio.",
        "The protection against WiFi eavesdropping: HTTPS encrypts the content of web traffic (so even if captured, it's unreadable), a VPN encrypts all traffic from your device (including DNS queries and app traffic), and using your phone's hotspot instead of public WiFi avoids the risk entirely.",
      ],
      technical: {
        title: "WiFi Eavesdropping and MITM on Open Networks",
        body: [
          "Open WiFi uses no encryption between your device and the access point — all frames are transmitted in plaintext. Any device in promiscuous mode (listening to all traffic, not just its own) can capture these frames. Tools: Wireshark (passive capture and analysis), Aircrack-ng (active WiFi attacks), ettercap (MITM on local network).",
          "Even on WPA2-encrypted WiFi, all devices on the network share the same encryption key. If you know the WiFi password, you can decrypt other users' traffic (in personal WPA2 mode). WPA2-Enterprise with individual user certificates is the solution for corporate environments. For personal protection: VPN or HTTPS everywhere.",
        ],
        codeExample: {
          label: "Protecting yourself on public WiFi",
          code: `# On Linux: see all traffic on an open network (passive)
# sudo tcpdump -i wlan0 -n

# What attackers see on HTTP (no encryption):
# Your bank username in the POST body
# Your session cookies in the headers
# The URLs of every page you visit (including HTTPS — domain visible via SNI)

# Protection options:
# 1. Use a VPN (encrypts everything, including DNS)
# 2. Use HTTPS-only sites (content encrypted, domain still visible)
# 3. Use your phone hotspot instead of public WiFi
# 4. Use DNS-over-HTTPS to hide DNS queries`,
        },
      },
      incident: {
        title: "The Darkhotel APT — Hotel WiFi Targeted Attacks",
        when: "2007–2014 (discovered 2014)",
        where: "Luxury hotel networks in Asia-Pacific",
        impact: "Corporate executives' devices compromised via hotel WiFi during business trips",
        body: [
          "The Darkhotel APT group (suspected North Korean) infiltrated luxury hotel WiFi networks in Japan, China, Russia, and Taiwan. They targeted C-suite executives staying at the hotels, delivering malware via fake software update prompts on the hotel network. The attackers had foreknowledge of the executives' travel schedules.",
          "By sitting on the hotel's network as a man-in-the-middle, they could inject malicious content into HTTP connections, show fake update prompts, and download keyloggers when the target clicked 'update'. The lesson: never approve software updates over hotel WiFi, use a VPN on any public or hotel network, and use HTTPS-only browsing.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Device", sub: "connected to open WiFi", type: "attacker" },
          { label: "Open Access Point", sub: "no encryption between device and AP", type: "system" },
          { label: "Attacker's Device", sub: "passive capture on same network", type: "victim" },
          { label: "Your Traffic Visible", sub: "all unencrypted data exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 1997, event: "802.11 WiFi standard introduced — no security by default" },
        { year: 2001, event: "WEP cracked in minutes — WiFi encryption shown to be worthless" },
        { year: 2007, event: "Darkhotel APT begins targeting hotel WiFi networks", highlight: true },
        { year: 2018, event: "WPA3 introduces per-session encryption — even shared-key WiFi gets better" },
      ],
      keyTakeaways: [
        "Open WiFi is unencrypted — every packet is visible to anyone on the network",
        "Passive eavesdropping requires no attack — just listening on the shared medium",
        "HTTPS protects content but not the destination domain (visible via SNI)",
        "VPN or phone hotspot are the safest options on untrusted networks",
      ],
      references: [
        { title: "Risks of Public WiFi — FTC", url: "https://consumer.ftc.gov/articles/public-wifi-risks" },
        { title: "Darkhotel APT Report — Kaspersky", url: "https://securelist.com/the-darkhotel-apt/66779/" },
      ],
    },
    ctf: {
      scenario: "You're on an open WiFi network in Monterey Bay. Capture the unencrypted traffic from a fellow fisherman's device and find the credential they're sending over HTTP.",
      hint: "Capture the HTTP traffic and extract the credentials from the plaintext stream.",
      hints: [
        "Start a passive capture on the open network. Run: capture-traffic",
        "Filter for HTTP traffic only. Run: filter http",
        "Find the POST request with credentials. Run: find-creds",
        "Extract the stolen credentials. Run: extract",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{0P3N_W1F1_3XP0S3S_4LL_PL41NT3XT_TR4FF1C}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "capture-traffic",
          value: "FLAG{0P3N_W1F1_",
          label: "Network Scanned — Devices Visible on Open Frequency",
        },
        {
          trigger: "find-creds",
          value: "3XP0S3S_4LL_PL41NT3XT_",
          label: "POST Request Captured — Credentials in Plain Sight",
        },
        {
          trigger: "extract",
          value: "TR4FF1C}",
          label: "Credentials Extracted — Passive Eavesdrop Complete",
        },
      ],
      extraCommands: {
        "capture-traffic": () => ({
          lines: [
            "Passive capture started on open WiFi (no authentication required).",
            "Capturing all frames in the air...",
            "",
            "Devices visible on network:",
            "  192.168.4.2   captain-dave-iphone",
            "  192.168.4.7   fisherman-bob-laptop  ← active HTTP session",
            "  192.168.4.11  marina-tablet",
            "",
            "HTTP traffic detected from 192.168.4.7.",
            "Run: filter http",
          ],
        }),
        "filter": (args) => {
          if (args[0] === "http") {
            return {
              lines: [
                "Filtering for HTTP traffic from 192.168.4.7...",
                "",
                "Captured 14 HTTP requests.",
                "1 POST request to fishing-log.com/login — contains form data.",
                "",
                "Run: find-creds",
              ],
            };
          }
          return { lines: ["Specify protocol: filter http"] };
        },
        "find-creds": () => ({
          lines: [
            "POST /login HTTP/1.1",
            "Host: fishing-log.com",
            "Content-Type: application/x-www-form-urlencoded",
            "",
            "username=fisher_bob&password=monterey1984&remember_me=true",
            "",
            "All data transmitted in plaintext.",
            "Anyone on this WiFi can see this. Run: extract",
          ],
        }),
        extract: () => ({
          lines: [
            "Credentials extracted from open WiFi capture:",
            "  Site: fishing-log.com",
            "  Username: fisher_bob",
            "  Password: monterey1984",
            "",
            "Zero technical skill required — just passive listening.",
            "HTTPS would have prevented this. A VPN would have prevented this.",
            "",
            "  ┌──────────────────────────────────────────────────────────────┐",
            "  │  OPEN WIFI DANGER DEMONSTRATED. USE VPN OR HTTPS ALWAYS.   │",
            "  │                                                              │",
            "  │  Run 'assemble' to retrieve your fragment.                  │",
            "  └──────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-25: Social Engineering ────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Dockside Cantina", location: "Monterey, USA", era: "Present Day", emoji: "🍺" },
    id: "bt-25",
    order: 25,
    title: "The Fisherman's Tall Tale",
    subtitle: "Social Engineering — Hacking Humans, Not Computers",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-25", name: "Social Engineer Spotter", emoji: "🎭" },
    challengeType: "ctf",
    info: {
      tagline: "The best con artist never picks a lock. They convince someone to open the door.",
      year: 2025,
      overview: [
        "At the dockside cantina, old fishermen trade tall tales — exaggerated stories designed to impress, manipulate, or extract information from fellow sailors. Social engineering is the cybersecurity equivalent: attackers manipulate people psychologically to give up information, access, or money without any technical hacking required.",
        "Social engineering exploits human nature: trust, authority, fear, urgency, helpfulness, and reciprocity. An attacker posing as an IT technician asking for your password exploits your deference to authority and helpfulness. A fake 'urgent wire transfer' request from the CEO exploits authority and time pressure. No firewall or antivirus can block a person from giving information away.",
        "Kevin Mitnick — once the world's most wanted hacker — famously said he rarely needed to break into systems technically. He just called employees, claimed to be from IT, and asked for their passwords. Most complied. Social engineering remains the #1 attack vector precisely because humans are reliably exploitable.",
      ],
      technical: {
        title: "Social Engineering Techniques and Defenses",
        body: [
          "Pretexting: creating a fabricated scenario to establish credibility (e.g., 'I'm from the IT helpdesk, we're having a security incident and need your password to investigate'). Baiting: leaving infected USB drives in a parking lot, waiting for curious employees to plug them in. Tailgating: following an authorized person through a secure door. Vishing: phone-based social engineering.",
          "Defenses: verify identities through a separate channel (call back the IT department on the known number, not the number they gave you). Never give passwords over the phone or email — legitimate IT never needs your password. Establish clear verification procedures for sensitive requests. Security awareness training significantly reduces susceptibility.",
        ],
        codeExample: {
          label: "Identifying social engineering in practice",
          code: `SOCIAL ENGINEERING RED FLAGS:
  ✗ Urgency or time pressure ("act NOW or your account is deleted")
  ✗ Authority claims ("I'm the CEO / I'm from IT / I'm from the IRS")
  ✗ Request for credentials ("I just need your password to help you")
  ✗ Unexpected contact (you didn't initiate this conversation)
  ✗ Threats or fear ("legal consequences if you don't comply")
  ✗ Too-good-to-be-true offers ("you've won a prize")
  ✗ Requests to bypass security ("just this once, for speed")

RESPONSE PROTOCOL:
  ✓ Slow down — urgency is a manipulation tactic
  ✓ Verify independently — call back on known number
  ✓ Never give passwords, even to "IT"
  ✓ Report suspicious contacts to security team`,
        },
      },
      incident: {
        title: "The $120M Facebook/Google BEC Scam — Fake Vendor Invoices",
        when: "2013–2015",
        where: "Facebook and Google accounting departments",
        impact: "$120 million transferred to attacker's bank accounts over 2 years",
        body: [
          "Evaldas Rimasauskas created a fake company impersonating Quanta Computer, a real Taiwanese supplier that both Facebook and Google regularly paid. He sent convincing invoices with real-looking contracts and correspondence. Accounting employees at both companies wired over $120 million to his Lithuanian bank accounts over two years.",
          "No system was hacked. No malware was used. Just carefully crafted emails and fake invoices exploiting the trust relationship between the tech giants and their supplier. Rimasauskas was caught and extradited. The lesson: financial controls (dual authorization for large transfers, supplier verification callbacks) are the technical defense against BEC.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker Researches Target", sub: "finds names, relationships, patterns", type: "attacker" },
          { label: "Builds Credible Pretext", sub: "fake identity, authority, urgency", type: "system" },
          { label: "Victim Complies", sub: "authority + urgency override caution", type: "victim" },
          { label: "Access or Money Transferred", sub: "no technical exploit needed", type: "result" },
        ],
      },
      timeline: [
        { year: 1984, event: "Kevin Mitnick begins social engineering campaigns against phone companies" },
        { year: 2001, event: "Frank Abagnale's story (Catch Me If You Can) — social engineering masterclass" },
        { year: 2015, event: "Facebook/Google BEC scam totals $120M — pure social engineering", highlight: true },
        { year: 2023, event: "BEC losses reach $2.7B — #1 cybercrime by financial damage (FBI IC3)" },
      ],
      keyTakeaways: [
        "Social engineering exploits human psychology, not software vulnerabilities",
        "Urgency, authority, and fear are the primary manipulation levers",
        "Legitimate IT never needs your password — always refuse such requests",
        "Verify financial requests and identity changes through a separate, known channel",
      ],
      references: [
        { title: "Social Engineering — SANS", url: "https://www.sans.org/blog/social-engineering-a-definition/" },
        { title: "BEC Scam Against Google/Facebook — DOJ", url: "https://www.justice.gov/usao-sdny/pr/lithuanian-man-pleads-guilty-wire-fraud-theft-over-100-million-fraudulent-business" },
      ],
    },
    ctf: {
      scenario: "An attacker has infiltrated the dockside cantina and is attempting to social engineer the marina operator into revealing the harbor master's access code. Analyze the transcript and identify every social engineering technique used.",
      hint: "Read the transcript and identify the manipulation tactics.",
      hints: [
        "Read the social engineering transcript. Run: cat transcript.txt",
        "Identify the techniques used. Run: identify-technique urgency",
        "Identify the authority claim. Run: identify-technique authority",
        "Report all techniques found. Run: submit-report",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{S0C14L_3NG1N33R1NG_3XPL01TS_TRUST}",
      fragments: [
        {
          trigger: "/transcript.txt",
          value: "FLAG{S0C14L_",
          label: "Transcript Reviewed — Attack Script Uncovered",
        },
        {
          trigger: "identify-technique urgency",
          value: "3NG1N33R1NG_3XPL01TS_",
          label: "Technique Identified — Urgency Overrides Caution",
        },
        {
          trigger: "submit-report",
          value: "TRUST}",
          label: "Report Filed — All Social Engineering Vectors Named",
        },
      ],
      files: {
        "/transcript.txt": [
          "PHONE CALL TRANSCRIPT — Monterey Marina",
          "========================================",
          "ATTACKER: Hi, this is Dave from the Coast Guard Security Division.",
          "          [AUTHORITY: claims official government role]",
          "",
          "OPERATOR: Oh, hello. How can I help?",
          "",
          "ATTACKER: We have a maritime security emergency right now —",
          "          a vessel is broadcasting a distress signal and we need",
          "          to verify harbor master access immediately.",
          "          [URGENCY: manufactured emergency, time pressure]",
          "",
          "OPERATOR: Oh no — what do I need to do?",
          "",
          "ATTACKER: I need the harbor master access code to cross-reference",
          "          with our federal system. This is standard emergency protocol.",
          "          [PRETEXT: fake procedure, appeals to helpfulness]",
          "",
          "OPERATOR: I'm not sure I should give that out over the phone...",
          "",
          "ATTACKER: I understand, but we don't have time — lives are at stake.",
          "          If we can't verify in the next 90 seconds, we lose the signal.",
          "          [URGENCY + FEAR: life-threatening framing to override caution]",
          "",
          "OPERATOR: Okay... it's 4-4-7-9.",
          "          [VICTIM COMPLIED — access code surrendered]",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "transcript.txt", isDir: false }],
      },
      extraCommands: {
        "identify-technique": (args) => {
          const tech = (args[0] || "").toLowerCase();
          const techniques: Record<string, string> = {
            urgency: "✓ URGENCY — '90 seconds', 'we don't have time', 'lives at stake'. Creates panic that overrides rational decision-making.",
            authority: "✓ AUTHORITY — 'Coast Guard Security Division'. Victims defer to perceived authority figures even without verification.",
            pretext: "✓ PRETEXTING — fabricated 'emergency protocol' scenario gives the request a legitimate-seeming context.",
            fear: "✓ FEAR — 'lives at stake' raises emotional stakes, making the victim feel responsible for any bad outcome if they don't comply.",
            helpfulness: "✓ HELPFULNESS exploitation — the operator's desire to help in an emergency is weaponized against them.",
          };
          return { lines: [techniques[tech] || `Unknown technique: ${tech}. Try: urgency, authority, pretext, fear, helpfulness`] };
        },
        "submit-report": () => ({
          lines: [
            "Social Engineering Techniques Identified:",
            "  ✓ Authority (fake Coast Guard identity)",
            "  ✓ Urgency (90-second countdown, emergency framing)",
            "  ✓ Pretexting (fabricated 'emergency protocol')",
            "  ✓ Fear (lives at stake, operator feels responsible)",
            "  ✓ Helpfulness exploitation (desire to help overrides caution)",
            "",
            "Defense: verify the caller's identity through the official Coast Guard",
            "number — not the one they provide. Slow down. No legitimate security",
            "request requires bypassing verification procedures.",
            "",
            "  ┌──────────────────────────────────────────────────────────────┐",
            "  │  ALL TECHNIQUES IDENTIFIED. SOCIAL ENGINEERING MASTERED.   │",
            "  │                                                              │",
            "  │  Run 'assemble' to retrieve your fragment.                  │",
            "  └──────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-26: Software Updates ──────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Boat Maintenance Yard, Santa Cruz Harbor", location: "Santa Cruz, USA", era: "Present Day", emoji: "🔧" },
    id: "bt-26",
    order: 26,
    title: "Patching the Hull",
    subtitle: "Software Updates — Sealing Known Holes Before They Sink You",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-26", name: "Patch Master", emoji: "🩹" },
    challengeType: "ctf",
    info: {
      tagline: "A known crack in the hull is a countdown. Patch it or sink.",
      year: 2025,
      overview: [
        "Back at Santa Cruz Harbor, the boat maintenance yard patches hulls. A crack that's been documented and reported needs to be repaired before the next voyage — ignoring a known crack is gambling with the whole crew. Software vulnerabilities work identically: once a CVE (Common Vulnerabilities and Exposures) is published, attackers immediately begin writing exploits. The window between disclosure and attack is often under 24 hours.",
        "Software updates and patches are the primary mechanism for sealing known security holes. When researchers discover a vulnerability, they report it to the vendor. The vendor develops a fix, tests it, and releases a patch. Users who apply the patch close the vulnerability. Users who don't are running with a known, documented, publicly available exploit target.",
        "The 2017 WannaCry ransomware infected 200,000 computers using a vulnerability Microsoft had patched two months earlier (MS17-010). Every single infected machine had failed to apply an available patch. This pattern repeats constantly: most successful attacks exploit known vulnerabilities, not zero-days.",
      ],
      technical: {
        title: "CVE System, Patch Management, and Zero-Days",
        body: [
          "CVE (Common Vulnerabilities and Exposures): a standardized identifier for known vulnerabilities. Format: CVE-YEAR-NUMBER (e.g., CVE-2021-44228 is Log4Shell). CVSS score (0–10) rates severity: 9.0+ is Critical. The NVD (National Vulnerability Database) tracks all CVEs with details, affected versions, and patches.",
          "Zero-day: a vulnerability that is unknown to the vendor — no patch exists. Attackers who discover zero-days either sell them (prices: $500K–$2M for iOS zero-days) or use them quietly. Once disclosed, they become n-days — known, patchable vulnerabilities. Most real-world attacks use n-days, not zero-days, because most systems are poorly patched.",
        ],
        codeExample: {
          label: "Checking for vulnerable software versions",
          code: `# Check installed package versions (Linux/Debian)
dpkg -l | grep apache

# Check for available security updates
sudo apt update && apt list --upgradable

# Search CVE database for a specific package
# Visit: https://nvd.nist.gov/vuln/search

# Check if a specific CVE affects your version
# Example: Log4Shell (CVE-2021-44228)
find / -name "log4j*.jar" 2>/dev/null

# Keep packages updated automatically (Debian/Ubuntu)
sudo apt install unattended-upgrades`,
        },
      },
      incident: {
        title: "Log4Shell — The Vulnerability That Sat in Plain Sight",
        when: "December 9, 2021",
        where: "Worldwide — any Java application using Log4j",
        impact: "Hundreds of millions of devices vulnerable; CISA called it 'most serious' in years",
        body: [
          "Log4Shell (CVE-2021-44228) was a critical vulnerability in Log4j, a Java logging library used in everything from Minecraft servers to enterprise software to NASA systems. The CVSS score: 10.0 — maximum severity. Exploiting it required sending a single specially crafted string that, when logged, triggered remote code execution.",
          "The library had been downloaded 475 million times. Within 72 hours of public disclosure, attackers were scanning the entire internet for vulnerable servers — millions of exploit attempts per hour. Patching required identifying every system using Log4j (harder than it sounds when it's an indirect dependency) and updating it. Some organizations took months. The lesson: know what software your software depends on.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CVE Published", sub: "vulnerability publicly known", type: "attacker" },
          { label: "Exploit Written", sub: "within 24–72 hours of disclosure", type: "system" },
          { label: "Unpatched Systems", sub: "vulnerable targets in production", type: "victim" },
          { label: "Patched Systems", sub: "update applied — immune", type: "result" },
        ],
      },
      timeline: [
        { year: 1999, event: "CVE system launched by MITRE — standardized vulnerability tracking" },
        { year: 2017, event: "WannaCry: 200K machines infected via MS17-010 — patch available 2 months prior", highlight: true },
        { year: 2021, event: "Log4Shell: CVSS 10.0, hundreds of millions of devices, 72hr exploit deployment" },
        { year: 2022, event: "CISA KEV (Known Exploited Vulnerabilities) catalog launched — prioritized patching" },
      ],
      keyTakeaways: [
        "Apply security patches immediately — attackers exploit known vulnerabilities within hours",
        "CVE scores above 9.0 are critical — treat as a fire drill",
        "Know your software's dependencies — Log4Shell hid inside other software",
        "Most real attacks use known, patchable vulnerabilities — not zero-days",
      ],
      references: [
        { title: "NVD — National Vulnerability Database", url: "https://nvd.nist.gov/" },
        { title: "Log4Shell Explained — CISA", url: "https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance" },
      ],
    },
    ctf: {
      scenario: "The harbor maintenance system is running an outdated service with a known CVE. Identify the vulnerable version, exploit it, then apply the patch and verify the fix.",
      hint: "Check the version, look up the CVE, exploit the unpatched version, then patch it.",
      hints: [
        "Check the service version. Run: check-version",
        "Look up the CVE for that version. Run: lookup-cve harbor-service 2.3.1",
        "Exploit the unpatched service. Run: exploit",
        "Apply the patch and verify. Run: apply-patch",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{P4TCH_1MM3D14T3LY_0R_G3T_PWN3D}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "check-version",
          value: "FLAG{P4TCH_",
          label: "Version Checked — Critical CVE Found in Outdated Service",
        },
        {
          trigger: "exploit",
          value: "1MM3D14T3LY_0R_",
          label: "Exploit Demonstrated — Root Shell in Four Seconds",
        },
        {
          trigger: "apply-patch",
          value: "G3T_PWN3D}",
          label: "Patch Applied — Vulnerability Closed, System Hardened",
        },
      ],
      extraCommands: {
        "check-version": () => ({
          lines: [
            "Harbor Maintenance Service",
            "  Version: 2.3.1",
            "  Last updated: 14 months ago",
            "  Known CVEs: checking NVD...",
            "  CVE-2023-4821  CVSS: 9.8 (Critical) — Remote Code Execution",
            "  Patch available: version 2.3.7",
            "",
            "Run: lookup-cve harbor-service 2.3.1",
          ],
        }),
        "lookup-cve": (args) => ({
          lines: [
            `CVE lookup: ${args[0]} v${args[1]}`,
            "  CVE-2023-4821",
            "  CVSS: 9.8 Critical",
            "  Type: Remote Code Execution (no authentication required)",
            "  Affected: harbor-service <= 2.3.6",
            "  Fixed in: 2.3.7",
            "  Exploit: publicly available on GitHub since 3 days after disclosure",
            "",
            "Run: exploit (to see the vulnerability in action)",
          ],
        }),
        exploit: () => ({
          lines: [
            "Running CVE-2023-4821 PoC against harbor-service v2.3.1...",
            "",
            "  Sending malformed packet to port 8443...",
            "  Buffer overflow triggered in authentication handler.",
            "  Shell spawned: uid=0(root)",
            "",
            "  > id",
            "  uid=0(root) gid=0(root) groups=0(root)",
            "",
            "Full system compromise. Harbor maintenance system owned.",
            "This took 4 seconds. Patch was available 14 months ago.",
            "",
            "Run: apply-patch",
          ],
        }),
        "apply-patch": () => ({
          lines: [
            "Downloading harbor-service v2.3.7...",
            "Applying patch...",
            "Service restarted.",
            "",
            "Testing CVE-2023-4821 against v2.3.7...",
            "  Vulnerability patched: CONFIRMED",
            "  Exploit attempt: FAILED (authentication handler fixed)",
            "",
            "  ┌──────────────────────────────────────────────────────────────┐",
            "  │  SYSTEM PATCHED. PATCH MANAGEMENT MASTERED.                │",
            "  │                                                              │",
            "  │  Run 'assemble' to retrieve your fragment.                  │",
            "  └──────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-27: Data Breaches ─────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Catch Inspection Station, Moss Landing", location: "Moss Landing, USA", era: "Present Day", emoji: "🐟" },
    id: "bt-27",
    order: 27,
    title: "When the Net Tears",
    subtitle: "Data Breaches — What Happens to Your Data When Companies Leak It",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-27", name: "Breach Investigator", emoji: "🔎" },
    challengeType: "ctf",
    info: {
      tagline: "A torn net loses the entire catch. A data breach loses everyone's data at once.",
      year: 2025,
      overview: [
        "At the Moss Landing inspection station, inspectors verify the catch. A torn net means the entire haul — weeks of work — spills into the ocean and is lost or contaminated. A data breach does the same: one vulnerability in a company's systems and millions of customers' data floods out at once. You trusted the company with your information; the breach affects you whether you did anything wrong or not.",
        "Data breaches expose credentials, personal information, financial data, and medical records. The stolen data appears on dark web markets within days — sold to credential stuffers, identity thieves, and spammers. Your email and password from a breach at Site A gets tried against your bank, your email, your work VPN. This is credential stuffing — automated login attempts using known username/password pairs.",
        "Have I Been Pwned (haveibeenpwned.com) lets you check if your email address appears in known breach databases. If it does, change the password on that site and any other site where you reused it. Enable 2FA. The breach wasn't your fault — but your response determines the damage.",
      ],
      technical: {
        title: "Breach Lifecycle and Credential Stuffing",
        body: [
          "Breach lifecycle: (1) Attacker compromises company database. (2) Data exfiltrated — often weeks before discovery. (3) Data sold on dark web forums (priced by record count and data type). (4) Credential stuffers run automated tools against major sites. (5) Successful logins are sold as 'combo lists'. (6) Breach eventually discovered and disclosed (average: 197 days to detection).",
          "Credential stuffing tools (Sentry MBA, OpenBullet) test millions of username/password pairs against target sites per hour. Sites defend with: rate limiting, CAPTCHA, impossible travel detection (login from Greece then California 1 hour later), and breach password screening (reject passwords found in known breach lists at login).",
        ],
        codeExample: {
          label: "Checking your exposure and protecting accounts",
          code: `# Check if your email is in known breaches
# Visit: https://haveibeenpwned.com

# Check a specific breach database (CLI)
# pip install pwnedpasswords
python -c "import pwnedpasswords; print(pwnedpasswords.check('yourpassword'))"

# The API uses k-anonymity — your password never leaves your machine:
# 1. SHA-1 hash your password
# 2. Send first 5 chars of hash to HIBP API
# 3. API returns matching hash suffixes
# 4. Check if your full hash is in the returned list
# Your actual password: never transmitted`,
        },
      },
      incident: {
        title: "The 2013 Yahoo Breach — 3 Billion Accounts, Discovered 3 Years Later",
        when: "2013 (breach), 2016 (discovered), 2017 (full scope revealed)",
        where: "Yahoo — all 3 billion user accounts",
        impact: "$350M reduction in Verizon acquisition price; largest breach in history",
        body: [
          "Yahoo was breached in 2013. Every single Yahoo account — all 3 billion — was compromised. The attackers had access to names, email addresses, telephone numbers, dates of birth, hashed passwords, and security questions. Yahoo didn't discover the breach until 2016, disclosing it as 500 million accounts. A year later, they revised to 3 billion.",
          "The breach directly impacted Verizon's acquisition of Yahoo — the price dropped by $350 million after disclosure. For individuals: any account created with Yahoo credentials (security questions like 'mother's maiden name') was potentially compromised. Security questions are particularly dangerous — the answers don't change after a breach.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Database Compromised", sub: "attacker exfiltrates all records", type: "attacker" },
          { label: "Data on Dark Web", sub: "sold within days", type: "system" },
          { label: "Credential Stuffing", sub: "your password tried on all sites", type: "victim" },
          { label: "Account Takeovers", sub: "anywhere you reused the password", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Yahoo breach — 3B accounts, not discovered for 3 years" },
        { year: 2016, event: "LinkedIn 2012 breach surfaces — 117M records sold on dark web" },
        { year: 2017, event: "Equifax breach — 147M Social Security numbers, dates of birth, addresses", highlight: true },
        { year: 2023, event: "MOVEit breach — 2,500+ organizations affected by single file transfer vulnerability" },
      ],
      keyTakeaways: [
        "Breaches expose your data even when you did nothing wrong",
        "Credential stuffing tries your stolen password against every major site",
        "Never reuse passwords — one breach compromises all sites using that password",
        "Check haveibeenpwned.com regularly and enable 2FA everywhere",
      ],
      references: [
        { title: "Have I Been Pwned", url: "https://haveibeenpwned.com" },
        { title: "Equifax Breach — FTC", url: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement" },
      ],
    },
    ctf: {
      scenario: "A breach dump has been found on the dark web containing fishing club member credentials. Search the dump for your account, assess your exposure, and take the correct remediation steps.",
      hint: "Search the breach dump for your email, then remediate correctly.",
      hints: [
        "Search the breach dump for your email. Run: search-breach fisher_agent@example.com",
        "Check which sites used that password. Run: check-reuse",
        "Assess your exposure level. Run: assess-damage",
        "Begin remediation. Run: remediate",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{BR34CH_CH3CK_R3M3D14T3_AND_US3_2F4}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "search-breach fisher_agent@example.com",
          value: "FLAG{BR34CH_",
          label: "Breach Found — Credentials Exposed in Three Dumps",
        },
        {
          trigger: "assess-damage",
          value: "CH3CK_R3M3D14T3_AND_",
          label: "Damage Assessed — Password Reuse Creates Critical Risk",
        },
        {
          trigger: "remediate",
          value: "US3_2F4}",
          label: "Account Remediated — Unique Passwords and 2FA Enabled",
        },
      ],
      extraCommands: {
        "search-breach": (args) => {
          const email = args[0] || "";
          if (email.includes("fisher_agent") || email.includes("example")) {
            return {
              lines: [
                `Searching breach dump for: ${email}`,
                "",
                "  FOUND in 3 breaches:",
                "  1. FishingForum.net (2022)  — password: montereyb4y  (MD5, cracked)",
                "  2. MarineCatalog.com (2021) — password: montereyb4y  (plaintext)",
                "  3. TackleShop.net (2023)    — password: montereyb4y  (SHA-1, cracked)",
                "",
                "Password 'montereyb4y' is in all three breaches.",
                "Run: check-reuse",
              ],
            };
          }
          return { lines: [`Email ${email} not found in this breach dump.`] };
        },
        "check-reuse": () => ({
          lines: [
            "Checking where 'montereyb4y' was reused...",
            "  FishingForum.net:    ✗ found in breach",
            "  MarineCatalog.com:   ✗ found in breach",
            "  TackleShop.net:      ✗ found in breach",
            "  Email account:       same password? Checking login history... WARNING",
            "  Banking app:         same password? CRITICAL RISK",
            "",
            "Password reuse means all accounts are compromised.",
            "Run: assess-damage",
          ],
        }),
        "assess-damage": () => ({
          lines: [
            "Exposure Assessment:",
            "  Password compromised:  YES (appears in 3 breach dumps)",
            "  Password reused:       YES (high risk — all accounts vulnerable)",
            "  2FA enabled:           NO (no second factor — easy account takeover)",
            "  Credential stuffing:   LIKELY ONGOING",
            "",
            "Risk level: CRITICAL",
            "Run: remediate",
          ],
        }),
        remediate: () => ({
          lines: [
            "Remediation steps:",
            "  1. Change password on all affected sites — DONE",
            "     New passwords: unique random 20-char strings via password manager",
            "  2. Enable 2FA on all accounts — DONE",
            "  3. Check for unauthorized activity on email and banking — DONE",
            "  4. Set up breach monitoring on haveibeenpwned.com — DONE",
            "",
            "  ┌──────────────────────────────────────────────────────────────┐",
            "  │  BREACH REMEDIATED. NEVER REUSE PASSWORDS. USE 2FA.        │",
            "  │                                                              │",
            "  │  Run 'assemble' to retrieve your fragment.                  │",
            "  └──────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-28: Safe Browsing ─────────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Kelp Forest, Monterey Bay", location: "Monterey Bay, USA", era: "Present Day", emoji: "🌿" },
    id: "bt-28",
    order: 28,
    title: "Navigating the Kelp Beds",
    subtitle: "Safe Browsing — Spotting Dangerous URLs Before You Click",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-28", name: "URL Inspector", emoji: "🧭" },
    challengeType: "ctf",
    info: {
      tagline: "The kelp beds look beautiful but hide rocks and currents. URLs look harmless but can hide malware.",
      year: 2025,
      overview: [
        "Diving in the Monterey Bay kelp forest requires reading the water carefully — beautiful kelp canopy can hide rocks, sudden depth changes, and strong currents. Safe browsing requires the same vigilance: URLs that look legitimate can hide malicious redirects, typosquatted domains, or script-injecting pages. The surface looks safe; the hazard is underneath.",
        "Malicious URLs come in several forms: typosquatting (paypa1.com, g00gle.com), homograph attacks (using Unicode characters that look like Latin letters), URL shorteners that hide the real destination, open redirects (legitimate site redirecting to malicious one), and deceptive subdomains (paypal.attacker.com — the real domain is attacker.com, not paypal.com).",
        "Before clicking any link: hover to see the real URL in the status bar. Read the domain from right to left — the rightmost portion before the first / is the actual domain. paypal.com.attacker.ru — the domain is attacker.ru. Look for HTTPS but remember that phishing sites use HTTPS too. Use Google Safe Browsing or VirusTotal to scan suspicious URLs before visiting.",
      ],
      technical: {
        title: "URL Structure and Malicious URL Patterns",
        body: [
          "URL anatomy: scheme://subdomain.domain.tld/path?query#fragment. The domain is always between the last two dots before the first /. paypal.com.attacker.ru: domain is attacker.ru. secure-paypal.com: domain is secure-paypal.com (not paypal.com). bank.com/login: domain is bank.com (legitimate). login-bank.com: domain is login-bank.com (suspicious).",
          "URL shorteners (bit.ly, tinyurl.com) hide the real destination — always expand before clicking. Tools: unshorten.me, CheckShortURL. File download URLs: beware .exe, .msi, .dmg, .bat, .ps1 from untrusted sources. Drive-by downloads: some sites exploit browser or plugin vulnerabilities to download and run malware just by visiting the page.",
        ],
        codeExample: {
          label: "Inspecting URLs safely",
          code: `# Expand a short URL without visiting it
curl -sI "https://bit.ly/xyz" | grep Location

# Check a URL against Google Safe Browsing
# Visit: https://transparencyreport.google.com/safe-browsing/search

# Check a URL against 90+ scanners
# Visit: https://www.virustotal.com/gui/home/url

# Parse URL components in Python
from urllib.parse import urlparse
url = urlparse("https://secure.paypal.com.attacker.ru/login")
print(url.netloc)  # = "secure.paypal.com.attacker.ru"
# The actual domain: attacker.ru`,
        },
      },
      incident: {
        title: "Operation Aurora — Drive-By Download via Internet Explorer",
        when: "December 2009",
        where: "Google, Adobe, Intel, Morgan Stanley, 30+ other companies",
        impact: "IP theft; Google source code accessed; 30+ major companies breached",
        body: [
          "Chinese state hackers (APT17/Elderwood) sent targeted spear phishing emails to Google employees with a link. The link went to a malicious website that exploited a zero-day in Internet Explorer. Just visiting the URL — no click, no download, no prompt — was enough to install a rootkit via a drive-by download.",
          "The malware gave attackers persistent access to Google's infrastructure and, specifically, the source code repository and the Gmail accounts of Chinese human rights activists. Google's response: threaten to exit China, which they later did. The incident accelerated Chrome's development and pushed the industry toward automatic browser updates and sandboxed rendering.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Malicious URL Sent", sub: "via phishing or malvertising", type: "attacker" },
          { label: "User Clicks Link", sub: "doesn't inspect URL first", type: "system" },
          { label: "Exploit Triggered", sub: "browser or plugin vulnerability", type: "victim" },
          { label: "Malware Installed", sub: "drive-by download", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "ILOVEYOU worm — social engineering via email attachment" },
        { year: 2009, event: "Operation Aurora — drive-by download via IE zero-day, 30+ companies breached", highlight: true },
        { year: 2016, event: "Malvertising campaigns inject drive-by downloads via ad networks" },
        { year: 2022, event: "Browsers sandbox all content — drive-by downloads significantly harder" },
      ],
      keyTakeaways: [
        "Read URLs right-to-left to find the real domain: paypal.com.attacker.ru = attacker.ru",
        "Hover over links before clicking — status bar shows the real URL",
        "HTTPS proves encryption, not legitimacy — phishing sites use HTTPS too",
        "Scan suspicious URLs with VirusTotal before visiting",
      ],
      references: [
        { title: "Safe Browsing — Google", url: "https://safebrowsing.google.com/" },
        { title: "Operation Aurora — Google Blog", url: "https://googleblog.blogspot.com/2010/01/new-approach-to-china.html" },
      ],
    },
    ctf: {
      scenario: "Four URLs have arrived in your inbox from unknown sources. Inspect each one and identify which are malicious without clicking them.",
      hint: "Analyze the domain structure of each URL carefully before deciding.",
      hints: [
        "Inspect the first URL. Run: inspect-url 1",
        "Inspect the second URL. Run: inspect-url 2",
        "Inspect the third URL. Run: inspect-url 3",
        "Inspect the fourth URL. Run: inspect-url 4",
        "Flag all malicious ones. Run: flag-malicious 2 4",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{URL_1NSP3CT10N_SAV3S_Y0U_FR0M_M4LW4R3}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "inspect-url 2",
          value: "FLAG{URL_1NSP3CT10N_",
          label: "Fake Subdomain Detected — Real Domain Is the Attacker's",
        },
        {
          trigger: "inspect-url 4",
          value: "SAV3S_Y0U_FR0M_",
          label: "Malicious Download Spotted — Misspelled Domain and .exe",
        },
        {
          trigger: "flag-malicious 2 4",
          value: "M4LW4R3}",
          label: "Both Threats Flagged — Safe Browsing Protocol Complete",
        },
      ],
      extraCommands: {
        "inspect-url": (args) => {
          const num = args[0] || "1";
          const urls: Record<string, string[]> = {
            "1": [
              "URL 1: https://www.monterey-aquarium.org/tickets",
              "  Scheme: HTTPS ✓",
              "  Domain: monterey-aquarium.org",
              "  TLD: .org",
              "  Path: /tickets",
              "  Verdict: LEGITIMATE — matches the real aquarium domain",
            ],
            "2": [
              "URL 2: https://monterey-aquarium.org.phish-site.ru/tickets",
              "  Scheme: HTTPS (means encrypted, NOT safe)",
              "  Domain (read right-to-left): phish-site.ru  ← REAL DOMAIN",
              "  Subdomain: monterey-aquarium.org  ← designed to mislead",
              "  Verdict: MALICIOUS — domain is phish-site.ru, not the aquarium",
            ],
            "3": [
              "URL 3: https://bit.ly/3xKp9Qm",
              "  Scheme: HTTPS ✓",
              "  Domain: bit.ly (URL shortener)",
              "  Expanded destination: https://www.noaa.gov/fisheries",
              "  Verdict: LEGITIMATE — expands to official NOAA site",
            ],
            "4": [
              "URL 4: http://192.168.1.1.malicius-update.com/driver-update.exe",
              "  Scheme: HTTP (no encryption) ✗",
              "  Domain: malicius-update.com (misspelled 'malicious')",
              "  File: driver-update.exe  ← executable download",
              "  Verdict: MALICIOUS — untrusted domain, .exe download, HTTP",
            ],
          };
          return { lines: urls[num] || [`Unknown URL #${num}`] };
        },
        "flag-malicious": (args) => {
          const flagged = args.sort().join(" ");
          if (flagged === "2 4") {
            return {
              lines: [
                "Malicious URLs flagged: #2 and #4",
                "  URL #2: fake subdomain to disguise real domain (phish-site.ru)",
                "  URL #4: misspelled domain + .exe download over HTTP",
                "",
                "URL #1: legitimate (real aquarium domain)",
                "URL #3: legitimate (shortener expands to official NOAA site)",
                "",
                "  ┌────────────────────────────────────────────────────────────┐",
                "  │  ALL MALICIOUS URLs IDENTIFIED. SAFE BROWSING MASTERED.  │",
                "  │                                                            │",
                "  │  Run 'assemble' to retrieve your fragment.                │",
                "  └────────────────────────────────────────────────────────────┘",
              ],
            };
          }
          return { lines: [`Incorrect. You flagged: #${args.join(" #")}. Re-inspect all four URLs carefully.`] };
        },
      },
    },
  },

  // ─── BT-29: Privacy Settings ──────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "The Harbor Master's Office", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏢" },
    id: "bt-29",
    order: 29,
    title: "What You Share and With Whom",
    subtitle: "Privacy Settings — Controlling Your Digital Footprint",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-29", name: "Privacy Guardian", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "The harbor master controls who knows which boat is in which slip. Privacy settings give you the same control over your data.",
      year: 2025,
      overview: [
        "The harbor master's office keeps detailed logs: which boats are docked, their owners, their schedules. This information is shared with the Coast Guard, fuel dock, and maintenance yard — but not with the general public. Privacy settings let you control the same thing for your digital life: which apps, services, and people can see which information about you.",
        "Every app and social platform collects data. The question isn't whether data is collected — it's who has access to it and for what purpose. Location data from your phone apps is sold to data brokers. Your Facebook profile information is harvested by third-party apps. Your Google search history informs targeted advertising. Privacy settings control these flows — but only if you actively configure them.",
        "Data minimization is the core principle: don't share what isn't necessary. Every piece of information you share with a company becomes a potential breach exposure. Phone numbers for SMS 2FA can be used for SIM swapping. Real birthdates help answer security questions. Privacy isn't just about preference — it's about reducing your attack surface.",
      ],
      technical: {
        title: "Privacy Settings That Actually Matter",
        body: [
          "High-impact privacy settings: (1) Location access: change all apps to 'While Using' or 'Never' — almost no app needs always-on location. (2) App permissions: audit microphone, camera, contacts, and photo access — revoke anything that doesn't need it. (3) Account activity: Google/Facebook/Apple all have 'My Activity' dashboards where you can see and delete collected data. (4) Ad tracking: iOS: Settings → Privacy → Tracking → disable. Android: Settings → Privacy → Ads → opt out.",
          "Data broker opt-outs: companies like Spokeo, Whitepages, and BeenVerified aggregate your public records. Each has an opt-out process. Services like DeleteMe automate this. Your data broker profile includes addresses, phone numbers, relatives, and property records — all useful for social engineering and targeted phishing.",
        ],
        codeExample: {
          label: "Auditing app permissions and data collection",
          code: `# iOS: check app permissions via Settings → Privacy & Security
# Each permission category shows which apps have access

# Android: Settings → Privacy → Permission Manager

# Check what Google knows about you:
# myaccount.google.com/data-and-privacy

# Check what Facebook has collected:
# Settings → Your Facebook Information → Download Your Information

# Opt out of data broker tracking:
# Visit: optoutprescreen.com (credit card offers)
# Visit: dmachoice.org (direct mail)
# Use services like DeleteMe or Privacy Bee for automation`,
        },
      },
      incident: {
        title: "Cambridge Analytica — 87 Million Facebook Profiles Harvested Without Consent",
        when: "2014–2018 (disclosed 2018)",
        where: "Facebook — 87 million users",
        impact: "Political profiling at scale; GDPR acceleration; $5B FTC fine against Facebook",
        body: [
          "Cambridge Analytica harvested the data of 87 million Facebook users without their knowledge. A personality quiz app collected not just the quiz-taker's data but, exploiting Facebook's API, all of their friends' data too. The data was used to build psychological profiles for targeted political advertising.",
          "Users had never consented to their data being used this way. Facebook's privacy settings at the time allowed apps to access friends' data by default. The scandal led to major platform policy changes, accelerated GDPR enforcement in Europe, and a $5 billion FTC fine against Facebook — the largest privacy penalty in history at that time.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Personal Data", sub: "shared with apps and platforms", type: "attacker" },
          { label: "Data Brokers", sub: "aggregate and resell profiles", type: "system" },
          { label: "Third Parties", sub: "advertisers, political groups, others", type: "victim" },
          { label: "Privacy Settings", sub: "your control over these flows", type: "result" },
        ],
      },
      timeline: [
        { year: 2003, event: "CAN-SPAM Act — first US law governing email marketing" },
        { year: 2014, event: "Cambridge Analytica begins harvesting Facebook data" },
        { year: 2018, event: "GDPR takes effect — EU data protection law, global impact", highlight: true },
        { year: 2018, event: "Cambridge Analytica scandal — 87M profiles, $5B FTC fine against Facebook" },
      ],
      keyTakeaways: [
        "Review app permissions regularly — revoke anything that isn't necessary",
        "Change location access to 'While Using' — almost no app needs always-on location",
        "Use your platform's data download tools to see what's been collected",
        "Data minimization: every piece shared is a potential breach exposure",
      ],
      references: [
        { title: "Consumer Privacy — FTC", url: "https://www.ftc.gov/business-guidance/privacy-security/privacy" },
        { title: "Cambridge Analytica Explained — The Guardian", url: "https://www.theguardian.com/news/2018/mar/17/cambridge-analytica-facebook-influence-us-election" },
      ],
    },
    ctf: {
      scenario: "Audit the harbor office app's permissions and privacy settings. Find which settings are over-permissioned and lock them down to the minimum needed.",
      hint: "Review each permission and disable the ones that aren't necessary.",
      hints: [
        "Check current app permissions. Run: show-permissions",
        "Revoke unnecessary location access. Run: revoke location always-on",
        "Revoke unnecessary contacts access. Run: revoke contacts",
        "Confirm minimal permissions are set. Run: audit-permissions",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{PR1V4CY_S3TT1NGS_R3DUC3_4TT4CK_SURF4C3}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "show-permissions",
          value: "FLAG{PR1V4CY_",
          label: "Permissions Revealed — Three Over-Permissioned Settings Found",
        },
        {
          trigger: "revoke location",
          value: "S3TT1NGS_R3DUC3_",
          label: "Location Restricted — Always-On Access Revoked",
        },
        {
          trigger: "audit-permissions",
          value: "4TT4CK_SURF4C3}",
          label: "Audit Complete — Minimal Permissions, Minimal Exposure",
        },
      ],
      extraCommands: {
        "show-permissions": () => ({
          lines: [
            "Harbor Office App — Current Permissions:",
            "  Location:      ALWAYS ON   ← excessive (only needs 'while using')",
            "  Microphone:    ALWAYS ON   ← excessive (chat feature only; needs 'while using')",
            "  Contacts:      FULL ACCESS ← excessive (only needs to send invites)",
            "  Camera:        WHILE USING ✓",
            "  Notifications: ENABLED     ✓",
            "  Ad Tracking:   ENABLED     ← disable to reduce data collection",
            "",
            "Run: revoke location always-on | revoke contacts | revoke microphone",
          ],
        }),
        revoke: (args) => {
          const permission = args[0] || "";
          const messages: Record<string, string[]> = {
            location: ["Location access changed: ALWAYS ON → WHILE USING. App still works. ✓"],
            contacts: ["Contacts access: FULL ACCESS → READ ONLY for invites only. ✓"],
            microphone: ["Microphone: ALWAYS ON → WHILE USING. Chat still works. ✓"],
            "ad-tracking": ["Ad tracking: DISABLED. Your data won't be used for ad profiling. ✓"],
          };
          return { lines: messages[permission] || [`Unknown permission: ${permission}`] };
        },
        "audit-permissions": () => ({
          lines: [
            "Privacy Audit — Post-Hardening:",
            "  Location:      WHILE USING ✓",
            "  Microphone:    WHILE USING ✓",
            "  Contacts:      READ ONLY   ✓",
            "  Camera:        WHILE USING ✓",
            "  Ad Tracking:   DISABLED    ✓",
            "",
            "Data minimization achieved. Attack surface reduced.",
            "",
            "  ┌────────────────────────────────────────────────────────────────┐",
            "  │  PERMISSIONS AUDITED. PRIVACY SETTINGS MASTERED.             │",
            "  │                                                                │",
            "  │  Run 'assemble' to retrieve your fragment.                    │",
            "  └────────────────────────────────────────────────────────────────┘",
          ],
        }),
      },
    },
  },

  // ─── BT-30: Incident Response ─────────────────────────────────────────────
  {
    epochId: "before-times",
    wonder: { name: "Santa Cruz Small Craft Harbor — Return to Dock", location: "Santa Cruz, USA", era: "Present Day", emoji: "⚓" },
    id: "bt-30",
    order: 30,
    title: "Man Overboard Protocol",
    subtitle: "Incident Response — What To Do When You're Compromised",
    category: "cybersecurity",
    xp: 125,
    badge: { id: "bt-badge-30", name: "Incident Commander", emoji: "🚨" },
    challengeType: "ctf",
    info: {
      tagline: "Man overboard has a protocol: shout, throw the ring, don't leave the scene, call the Coast Guard. Incidents have the same protocol.",
      year: 2025,
      overview: [
        "Returning to Santa Cruz Harbor at the end of the journey. Every fishing vessel follows a man-overboard protocol: shout 'man overboard', throw the life ring, maintain visual contact, radio the Coast Guard, don't sail away. The protocol exists because panic is the enemy — you need a rehearsed sequence that works under pressure. Cybersecurity incident response is the same: a prepared, sequenced response to a security event.",
        "When you suspect you've been compromised — account takeover, malware infection, phishing click — the instinct is to panic and do everything at once. The correct response is methodical: Identify (confirm the incident), Contain (stop the bleeding), Eradicate (remove the threat), Recover (restore normal operation), and document everything for post-incident review.",
        "At the personal level, incident response for an account takeover: immediately change the password and enable 2FA, check for unauthorized activity (emails sent, purchases made, profile changes), revoke all active sessions, notify anyone who may have received malicious messages from your account. At the organizational level, this is a formal process involving IR teams, legal, PR, and regulatory notification.",
      ],
      technical: {
        title: "The NIST Incident Response Framework",
        body: [
          "NIST SP 800-61 defines four phases: (1) Preparation — incident response plan, trained team, monitoring tools in place before any incident. (2) Detection & Analysis — identify indicators of compromise (IOCs), determine scope, log everything. (3) Containment, Eradication & Recovery — isolate affected systems, remove malware, patch vulnerability, restore from clean backups. (4) Post-Incident Activity — document timeline, root cause analysis, update defenses.",
          "Indicators of Compromise (IOCs): unexpected login from new location, password change emails you didn't initiate, unfamiliar devices in account sessions, unexpected password reset emails, friends reporting strange messages from your account, antivirus alerts, unusual network traffic. Any of these demands immediate investigation.",
        ],
        codeExample: {
          label: "Immediate incident response steps for account compromise",
          code: `PERSONAL ACCOUNT TAKEOVER RESPONSE:

1. CONTAIN
   - Change password immediately (from a clean device)
   - Enable 2FA if not already on
   - Revoke all active sessions (most platforms: Settings → Security)

2. ASSESS
   - Check login history for unauthorized access
   - Check sent items, purchases, profile changes
   - Check if attacker changed recovery email/phone

3. ERADICATE
   - Remove any malicious apps/integrations
   - Check linked accounts (OAuth connections)
   - Scan device for malware: run antivirus

4. RECOVER
   - Update passwords on linked accounts
   - Notify contacts if your account sent malicious messages
   - Check credit report if financial data was exposed

5. DOCUMENT
   - Record timeline, what was accessed, what was changed`,
        },
      },
      incident: {
        title: "The Colonial Pipeline Ransomware — Incident Response at Scale",
        when: "May 7, 2021",
        where: "Colonial Pipeline, USA",
        impact: "Largest US fuel pipeline shut down; gas shortages across Eastern US; $4.4M ransom paid",
        body: [
          "Colonial Pipeline discovered ransomware on their systems at 5:30 AM on May 7. Their incident response decision: immediately shut down the operational pipeline to prevent potential OT (operational technology) compromise — even though only IT systems were confirmed infected. This containment decision was controversial but defensible.",
          "The attack entry point: a single compromised VPN password found in a leaked credentials database. No 2FA on the VPN. The $4.4M ransom was paid to get decryption keys (DOJ later recovered $2.3M). Full operations resumed May 15. Lessons: VPN requires 2FA, credential monitoring catches stolen passwords before attackers use them, OT/IT network segmentation limits blast radius.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Incident Detected", sub: "IOC identified", type: "attacker" },
          { label: "Contain", sub: "stop the bleeding immediately", type: "system" },
          { label: "Eradicate & Recover", sub: "remove threat, restore systems", type: "victim" },
          { label: "Post-Incident Review", sub: "update defenses, document lessons", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "Morris Worm — first major internet incident; incident response as a field begins" },
        { year: 2003, event: "NIST SP 800-61 published — formal incident response framework" },
        { year: 2014, event: "Sony Pictures breach — incident response failure, data deleted by attacker" },
        { year: 2021, event: "Colonial Pipeline ransomware — pipeline shut for 6 days, gas shortages", highlight: true },
      ],
      keyTakeaways: [
        "Incident response phases: Prepare → Detect → Contain → Eradicate → Recover → Review",
        "Contain first — stopping the spread matters more than understanding the cause initially",
        "Document everything — timeline and evidence support recovery and legal action",
        "For personal compromise: change password, enable 2FA, revoke sessions, assess damage",
      ],
      references: [
        { title: "NIST SP 800-61 — Computer Security Incident Handling", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf" },
        { title: "Colonial Pipeline Incident — CISA Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a" },
      ],
    },
    ctf: {
      scenario: "Your personal account has been compromised. Walk through every incident response step correctly — contain, assess, eradicate, recover — to complete The Before Times and earn your Incident Commander badge.",
      hint: "Follow the incident response protocol in order: contain → assess → eradicate → recover.",
      hints: [
        "Start containment. Run: contain",
        "Assess the damage. Run: assess",
        "Eradicate the threat. Run: eradicate",
        "Recover your account. Run: recover",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      flag: "FLAG{1NC1D3NT_R3SP0NS3_PR0T0C0L_C0MPL3T3}",
      files: {},
      dirs: { "/": [] },
      fragments: [
        {
          trigger: "contain",
          value: "FLAG{1NC1D3NT_",
          label: "Breach Contained — Attacker's Active Session Terminated",
        },
        {
          trigger: "eradicate",
          value: "R3SP0NS3_PR0T0C0L_",
          label: "Threat Eradicated — Persistence Mechanism Removed",
        },
        {
          trigger: "recover",
          value: "C0MPL3T3}",
          label: "Account Recovered — Incident Response Protocol Complete",
        },
      ],
      extraCommands: {
        contain: () => ({
          lines: [
            "CONTAIN — stopping the bleeding:",
            "  ✓ Password changed (strong, unique, via password manager)",
            "  ✓ 2FA enabled (authenticator app)",
            "  ✓ All active sessions revoked (Settings → Security → Sessions)",
            "  ✓ Recovery email/phone verified — not tampered",
            "",
            "Attacker no longer has active access. Run: assess",
          ],
        }),
        assess: () => ({
          lines: [
            "ASSESS — understanding the damage:",
            "  Login history: 3 unauthorized logins from 185.220.101.5 (Eastern Europe)",
            "  First access: 2 days ago",
            "  Actions taken by attacker:",
            "    - Read 47 emails (including bank notifications)",
            "    - Sent 3 phishing emails to your contacts",
            "    - Attempted password reset on linked bank account (blocked by 2FA)",
            "",
            "Scope: email compromised, contacts at risk, bank unaffected (2FA saved it).",
            "Run: eradicate",
          ],
        }),
        eradicate: () => ({
          lines: [
            "ERADICATE — removing the threat:",
            "  ✓ Removed unauthorized OAuth app 'QuickSync' (attacker's persistence tool)",
            "  ✓ Device malware scan: clean",
            "  ✓ Forwarding rules checked: none added by attacker",
            "  ✓ Linked account passwords updated (all unique via password manager)",
            "",
            "Threat fully removed. Run: recover",
          ],
        }),
        recover: () => ({
          lines: [
            "RECOVER — restoring normal operations:",
            "  ✓ Notified 3 contacts who received phishing emails",
            "  ✓ Reported unauthorized access to email provider",
            "  ✓ Checked credit report — no unauthorized accounts",
            "  ✓ Enrolled in breach monitoring (haveibeenpwned.com alerts)",
            "  ✓ Incident timeline documented",
            "",
            "INCIDENT CLOSED.",
            "",
            "  ╔══════════════════════════════════════════════════════════════════╗",
            "  ║  THE BEFORE TIMES — COMPLETE                                   ║",
            "  ║  30/30 stages finished. Athens to Santa Cruz to Monterey Bay.  ║",
            "  ║  You are no longer a beginner.                                 ║",
            "  ║                                                                ║",
            "  ║  Run 'assemble' to retrieve your fragment.                     ║",
            "  ╚══════════════════════════════════════════════════════════════════╝",
          ],
        }),
      },
    },
  },
];
