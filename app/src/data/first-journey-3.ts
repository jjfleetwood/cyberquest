import type { StageConfig } from "./types";

export const firstJourneyStages3: StageConfig[] = [

  // ─── BT-21: Phishing ──────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Fisherman's Wharf", location: "Monterey, USA", era: "Present Day", emoji: "🎣" },
    id: "bt-21",
    order: 21,
    title: "Spotting Fake Bait",
    subtitle: "Phishing — When the Lure Looks Real",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-21-q1", type: "Core Idea", challenge: "The fake lure.", text: "What is phishing?", options: ["A fake message that imitates a real one to trick you into clicking or sharing info", "A type of firewall", "A strong password", "A WiFi setting"], correctIndex: 0, explanation: "Phishing mimics legitimate emails/messages to steal credentials, money, or install malware." },
        { id: "bt-21-q2", type: "Scale", challenge: "How common.", text: "Roughly how big a role does phishing play in breaches?", options: ["It's the #1 way attacks start — over 90% of breaches begin with it", "It's extremely rare", "Only governments are targeted", "It never works"], correctIndex: 0, explanation: "Phishing is the most common initial access vector by a wide margin." },
        { id: "bt-21-q3", type: "Telltale Sign", challenge: "Look past the logo.", text: "Which is the best clue an email is phishing?", options: ["The real sender domain doesn't match (e.g. paypa1-support@gmail.com)", "It has a company logo", "It's written in English", "It arrived in the morning"], correctIndex: 0, explanation: "Display names are easily faked; the actual sending domain and link targets reveal the truth." },
        { id: "bt-21-q4", type: "Before You Click", challenge: "Check the link.", text: "How can you check a link without clicking it?", options: ["Hover over it to see the real URL", "Click it quickly", "Forward it to friends", "Reply asking if it's safe"], correctIndex: 0, explanation: "Hovering reveals the true destination, which often differs from the link text." },
        { id: "bt-21-q5", type: "Real Incident", challenge: "2016.", text: "How did the 2016 DNC hack begin?", options: ["A spear-phishing email tricked a target into entering his Google password on a fake page", "A server was physically stolen", "A firewall failed", "A password was brute-forced"], correctIndex: 0, explanation: "One convincing phishing email — no technical exploit — led to 51,000 stolen emails." },
        { id: "bt-21-q6", type: "Manipulation", challenge: "Why urgency?", text: "Why do phishing emails create urgency ('act in 24 hours')?", options: ["Pressure makes people act before they stop to verify", "It's a legal requirement", "It makes email load faster", "It's random"], correctIndex: 0, explanation: "Urgency and fear short-circuit careful thinking — slow down and verify." },
        { id: "bt-21-q7", type: "Targeted", challenge: "Knowing your name.", text: "What is spear phishing?", options: ["Phishing tailored to a specific person using personal details", "Phishing sent to millions at random", "A phishing-proof email app", "Phishing over the phone only"], correctIndex: 0, explanation: "Spear phishing uses personal context to seem credible — familiarity isn't proof." },
        { id: "bt-21-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "A phishing email is most like…", options: ["A fishing lure designed to look exactly like real food", "A locked door", "A traffic light", "A library card"], correctIndex: 0, explanation: "It's crafted to look real enough that you 'bite' — then you're hooked." },
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
              "",
              ">> LEARN: Phishing hides behind display names — check the domain",
              "   DKIM/SPF/DMARC failures mean the email wasn't sent by the real domain.",
              "   Typosquatting swaps one character (l → 1) to slip past visual inspection.",
              "   Real check: hover links before clicking; verify sender domain matches brand.",
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
                "",
                ">> LEARN: Reporting phishing stops the campaign propagating",
                "   Phishing kits reuse domains — one report can protect thousands of others.",
                "   Anti-phishing feeds (Google Safe Browsing, PhishTank) rely on reports.",
                "   Real tool: report phishing via reportphishing@apwg.org or browser menu.",
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
    epochId: "first-journey",
    wonder: { name: "Charter Boat Dock, Coast Guard Pier", location: "Monterey, USA", era: "Present Day", emoji: "🚢" },
    id: "bt-22",
    order: 22,
    title: "The Double Lock",
    subtitle: "Two-Factor Authentication — Two Keys to Start the Boat",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-22-q1", type: "Core Idea", challenge: "Two keys to start.", text: "What is two-factor authentication (2FA)?", options: ["Requiring two different proofs to log in (e.g. a password plus a phone code)", "Using two passwords", "Logging in twice", "A type of firewall"], correctIndex: 0, explanation: "2FA combines something you know with something you have or are." },
        { id: "bt-22-q2", type: "Why It Helps", challenge: "When your password leaks.", text: "If an attacker steals your password, how does 2FA help?", options: ["They still can't log in without the second factor", "It changes your password automatically", "It deletes the attacker's computer", "It does nothing"], correctIndex: 0, explanation: "2FA blocks the vast majority of account-takeover attempts even when the password is known." },
        { id: "bt-22-q3", type: "Factors", challenge: "The categories.", text: "Which is an example of 'something you have'?", options: ["A code from an authenticator app on your phone", "Your password", "Your username", "Your email address"], correctIndex: 0, explanation: "Possession factors include phones, authenticator apps, and hardware keys." },
        { id: "bt-22-q4", type: "Weakest Factor", challenge: "Not all 2FA is equal.", text: "Which second factor is the weakest?", options: ["SMS text codes (vulnerable to SIM swapping)", "A hardware security key", "An authenticator app", "A fingerprint"], correctIndex: 0, explanation: "SMS can be hijacked via SIM swapping; authenticator apps and hardware keys are stronger." },
        { id: "bt-22-q5", type: "Real Incident", challenge: "September 2022.", text: "How did the 2022 Uber attacker get past 2FA?", options: ["MFA fatigue — spamming push prompts until the contractor approved one to stop them", "Brute-forcing the code", "Stealing the phone", "Cutting the power"], correctIndex: 0, explanation: "Repeated push notifications wore the user down into approving — a social-engineering bypass." },
        { id: "bt-22-q6", type: "Defense", challenge: "Beating MFA fatigue.", text: "What defends against MFA-fatigue attacks?", options: ["Number-matching prompts (type the number shown at login)", "More push notifications", "Turning off 2FA", "Using SMS only"], correctIndex: 0, explanation: "Number matching requires proof the approver is the one logging in, defeating blind approvals." },
        { id: "bt-22-q7", type: "SIM Swap", challenge: "Why apps beat texts.", text: "Why are authenticator apps immune to SIM swapping?", options: ["They don't rely on your phone number", "They use SMS more securely", "They call you instead", "They're not — they're vulnerable too"], correctIndex: 0, explanation: "TOTP apps generate codes locally, so transferring your number to a new SIM doesn't help an attacker." },
        { id: "bt-22-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "2FA is most like…", options: ["A boat needing both the ignition key and the captain's code to start", "A single house key", "A loud alarm", "A parking spot"], correctIndex: 0, explanation: "Two independent factors are required — having just one isn't enough." },
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
                "",
                ">> LEARN: A stolen password is a full breach without 2FA",
                "   Credential stuffing tools test millions of username/password pairs per hour.",
                "   Without a second factor, every breached password is a working key.",
                "   Real stat: 2FA blocks 99.9% of automated account takeover attempts.",
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
            "",
            ">> LEARN: TOTP codes are time-locked and single-use by design",
            "   Each code is valid for 30 seconds then discarded — replay is useless.",
            "   SIM swapping hijacks SMS codes; authenticator apps are immune.",
            "   Real tool: authy or Google Authenticator — no phone number required.",
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
                "",
                ">> LEARN: TOTP setup shares a secret once — then works offline",
                "   The QR code encodes a base32 secret — store it as a backup code.",
                "   MFA fatigue attacks spam push-notification apps until victims approve.",
                "   Defense: use number-matching 2FA or a hardware key (YubiKey).",
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
    epochId: "first-journey",
    wonder: { name: "The Tackle Shop, Cannery Row", location: "Monterey, USA", era: "Present Day", emoji: "🎏" },
    id: "bt-23",
    order: 23,
    title: "The Bait Locker Combination",
    subtitle: "Password Strength — Why Complexity and Length Both Matter",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-23-q1", type: "Core Idea", challenge: "What makes a password strong.", text: "What matters most for resisting password cracking?", options: ["Length — more characters mean exponentially more combinations", "Using your name", "Changing it daily", "Making it short and memorable"], correctIndex: 0, explanation: "Each added character multiplies the possibilities, so length beats clever tricks." },
        { id: "bt-23-q2", type: "The Math", challenge: "Count the combinations.", text: "A 3-digit code has 1,000 combinations. A 6-digit code has…", options: ["1,000,000", "2,000", "6,000", "100"], correctIndex: 0, explanation: "Each extra digit multiplies by 10, so 6 digits = 10^6 = 1,000,000." },
        { id: "bt-23-q3", type: "Attack", challenge: "Trying everything.", text: "What is a brute-force attack?", options: ["Automatically trying many possible passwords until one works", "Asking nicely for the password", "Reading the password aloud", "Resetting the router"], correctIndex: 0, explanation: "Brute force tries combinations rapidly; length makes the search space impractically large." },
        { id: "bt-23-q4", type: "Best Practice", challenge: "The modern advice.", text: "What's the best way to manage strong passwords?", options: ["Use a password manager to generate a long, unique password per site", "Reuse one strong password everywhere", "Write them on a sticky note", "Use your birthday"], correctIndex: 0, explanation: "A manager creates and stores unique, long passwords so you don't have to remember them." },
        { id: "bt-23-q5", type: "Reuse Risk", challenge: "One leak, many doors.", text: "Why is reusing a password across sites dangerous?", options: ["One site's breach lets attackers into every site sharing that password", "It slows your computer", "It uses more storage", "It's fine — reuse is safe"], correctIndex: 0, explanation: "Credential stuffing tries breached passwords everywhere, so reuse multiplies the damage." },
        { id: "bt-23-q6", type: "Complexity Myth", challenge: "Is P@ssw0rd clever?", text: "Why isn't 'P@ssw0rd' actually strong?", options: ["Attackers know the common letter-to-symbol swaps; it's short and predictable", "It has no numbers", "It's too long", "It's perfectly secure"], correctIndex: 0, explanation: "Predictable substitutions on a short word are easy for cracking tools — length and randomness matter more." },
        { id: "bt-23-q7", type: "Passphrase", challenge: "Long but memorable.", text: "Why can a passphrase like 'correct-horse-battery-staple' be strong?", options: ["Its length creates a huge number of combinations while staying memorable", "It uses famous words", "It's short", "It has a symbol"], correctIndex: 0, explanation: "Several random words make a long, high-entropy secret that's still human-friendly." },
        { id: "bt-23-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "Password length vs cleverness is most like…", options: ["More padlock digits = more combinations to try", "A bigger key ring", "A shinier lock", "A faster door"], correctIndex: 0, explanation: "Adding digits to a combination lock grows the possibilities far faster than a 'clever' short one." },
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
                "",
                ">> LEARN: Password cracking is offline — no server interaction needed",
                "   Stolen MD5/SHA-1 hashes + GPU = 100 billion guesses per second.",
                "   rockyou.txt (14M common passwords) is the first wordlist every attacker tries.",
                "   Real tool: hashcat -a 0 -m 0 hash.txt rockyou.txt (MD5 + wordlist)",
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
                "",
                ">> LEARN: Argon2id makes hashing deliberately expensive to compute",
                "   The m=65536 parameter forces 64 MB of RAM per guess — kills GPU cracking.",
                "   A unique random salt means the same password hashes differently each time.",
                "   Use bcrypt or Argon2id for passwords — never MD5, SHA-1, or SHA-256 alone.",
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
            "",
            ">> LEARN: Entropy = length x log2(charset size) — length wins",
            "   P@ssw0rd has 38 bits of entropy — attackers' rules cover all substitutions.",
            "   Four random words (correct-horse-battery-staple) give ~51 bits, easy to type.",
            "   Real tool: python3 -c \"import secrets; print(secrets.token_urlsafe(20))\"",
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
            "",
            ">> LEARN: Password managers remove human memory from the equation",
            "   Bitwarden, 1Password, and KeePassXC generate and store unique 20-char passwords.",
            "   One breach of a reused password compromises every site using that password.",
            "   Real tool: bitwarden CLI — bw generate --length 20 --symbols",
          ],
        }),
      },
    },
  },

  // ─── BT-24: Public WiFi ───────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Open Water, Monterey Bay", location: "Monterey Bay, USA", era: "Present Day", emoji: "📡" },
    id: "bt-24",
    order: 24,
    title: "Open Radio Frequencies",
    subtitle: "Public WiFi — When Everyone Can Hear Your Conversation",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-24-q1", type: "Core Idea", challenge: "The open airwaves.", text: "What's the main risk of open (no-password) public WiFi?", options: ["Anyone nearby can capture your unencrypted traffic", "It's always slow", "It charges money", "It drains your battery"], correctIndex: 0, explanation: "On an open network the WiFi link isn't encrypted, so others can intercept what you send." },
        { id: "bt-24-q2", type: "Why", challenge: "What's missing.", text: "Why is open WiFi traffic interceptable?", options: ["There's no encryption on the wireless link — it's effectively broadcast", "The router is broken", "Your password is weak", "The internet is down"], correctIndex: 0, explanation: "Without link-layer encryption, nearby devices can read the radio traffic." },
        { id: "bt-24-q3", type: "Protection", challenge: "Staying safe out there.", text: "What protects you on public WiFi?", options: ["Using HTTPS sites and/or a VPN", "Turning your screen brightness down", "Sitting closer to the router", "Using a longer username"], correctIndex: 0, explanation: "HTTPS encrypts each site's traffic; a VPN encrypts everything you send." },
        { id: "bt-24-q4", type: "VPN", challenge: "The tunnel.", text: "What does a VPN do on untrusted WiFi?", options: ["Encrypts all your traffic through a protected tunnel", "Makes WiFi faster", "Blocks all websites", "Charges your phone"], correctIndex: 0, explanation: "A VPN wraps your traffic so the local network can't read it." },
        { id: "bt-24-q5", type: "The Attack", challenge: "Plaintext on the air.", text: "If someone logs into an HTTP (non-HTTPS) site on open WiFi, an attacker nearby can…", options: ["Read their username and password directly from the captured traffic", "Only see their screen brightness", "Do nothing", "Improve their connection"], correctIndex: 0, explanation: "HTTP over open WiFi sends credentials in plaintext — trivial to capture." },
        { id: "bt-24-q6", type: "Home WiFi", challenge: "Locking your own network.", text: "How should you secure your home WiFi?", options: ["Use WPA2/WPA3 encryption with a strong password", "Leave it open for convenience", "Hide it and use no password", "Use HTTP only"], correctIndex: 0, explanation: "WPA2/WPA3 encrypt the link; a strong passphrase keeps outsiders off." },
        { id: "bt-24-q7", type: "Evil Twin", challenge: "The fake hotspot.", text: "What is an 'evil twin' WiFi attack?", options: ["A fake hotspot that mimics a real one to capture your traffic", "Two routers in one house", "A duplicate password", "A backup network"], correctIndex: 0, explanation: "Attackers run a lookalike access point so victims connect and expose their traffic." },
        { id: "bt-24-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "Open WiFi is most like…", options: ["A marine radio channel anyone with a receiver can hear", "A locked diary", "A private phone call", "A sealed letter"], correctIndex: 0, explanation: "Broadcasting in the clear means anyone listening can hear it." },
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
            "",
            ">> LEARN: Open WiFi broadcasts every packet to every device in range",
            "   Promiscuous mode lets a network card read all frames, not just its own.",
            "   No attack needed — passive listening is invisible and undetectable.",
            "   Real tool: sudo tcpdump -i wlan0 -n (requires monitor mode on Linux)",
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
            "",
            ">> LEARN: HTTP POST bodies are fully visible on open networks",
            "   Credentials, session tokens, and form data all travel as readable text.",
            "   HTTPS encrypts the body — the destination domain is still visible via SNI.",
            "   Real tool: wireshark filter: http.request.method == POST",
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
            "",
            ">> LEARN: VPN encrypts all traffic before it leaves your device",
            "   Even the destination domain is hidden from other WiFi users with a VPN.",
            "   HTTPS encrypts content but leaks the domain via TLS SNI in the handshake.",
            "   Best option on untrusted networks: phone hotspot — isolated 4G/5G channel.",
          ],
        }),
      },
    },
  },

  // ─── BT-25: Social Engineering ────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Dockside Cantina", location: "Monterey, USA", era: "Present Day", emoji: "🍺" },
    id: "bt-25",
    order: 25,
    title: "The Fisherman's Tall Tale",
    subtitle: "Social Engineering — Hacking Humans, Not Computers",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-25-q1", type: "Core Idea", challenge: "Hacking the human.", text: "What is social engineering?", options: ["Manipulating people (not technology) into giving access or information", "A type of encryption", "A network cable", "A password manager"], correctIndex: 0, explanation: "It targets human trust and behavior rather than exploiting software." },
        { id: "bt-25-q2", type: "Why It Works", challenge: "The human levers.", text: "Which feelings do social engineers most exploit?", options: ["Trust, helpfulness, fear, and urgency", "Boredom and hunger", "Curiosity about math", "Love of reading"], correctIndex: 0, explanation: "Attackers push these buttons to get people to act before verifying." },
        { id: "bt-25-q3", type: "Pretexting", challenge: "Inventing a story.", text: "What is pretexting?", options: ["Inventing a believable role or scenario (e.g. posing as IT support)", "Sending a text before calling", "Writing the password down", "A type of firewall"], correctIndex: 0, explanation: "A convincing pretext makes the target comply with the attacker's 'legitimate' request." },
        { id: "bt-25-q4", type: "Physical", challenge: "Through the door.", text: "What is tailgating (piggybacking)?", options: ["Following an authorized person through a secure door", "Driving too close", "Sending spam", "Guessing a PIN"], correctIndex: 0, explanation: "Attackers slip into secure areas behind someone with legitimate access." },
        { id: "bt-25-q5", type: "Defense", challenge: "Don't act under pressure.", text: "What's the best defense against social engineering?", options: ["Verify identity through a known, trusted channel before acting", "Comply quickly to be polite", "Trust anyone who sounds official", "Give info if they're in a hurry"], correctIndex: 0, explanation: "Independent verification defeats impersonation and pressure tactics." },
        { id: "bt-25-q6", type: "Authority", challenge: "Sounding important.", text: "Why do attackers often claim to be a boss or IT/authority figure?", options: ["People tend to comply with perceived authority", "It's required by law", "It makes calls cheaper", "It's random"], correctIndex: 0, explanation: "Claimed authority lowers people's resistance to unusual requests." },
        { id: "bt-25-q7", type: "Key Insight", challenge: "Where the weak point is.", text: "Why is social engineering so effective even at secure companies?", options: ["Strong technology can still be bypassed by tricking a person", "Computers are never secure", "It only works on small companies", "Firewalls invite it"], correctIndex: 0, explanation: "People are often the easiest path in — 'the human is the weakest link.'" },
        { id: "bt-25-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "Social engineering is most like…", options: ["A con artist talking their way in instead of picking the lock", "A locksmith", "A security camera", "A guard dog"], correctIndex: 0, explanation: "The best con never breaks in — it convinces someone to open the door." },
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
            "",
            ">> LEARN: Social engineering bypasses all technical controls",
            "   No firewall blocks a person from voluntarily handing over a password.",
            "   Legitimate IT and security staff never need your password to help you.",
            "   Defense: always call back on a known number — never the one they gave you.",
          ],
        }),
      },
    },
  },

  // ─── BT-26: Software Updates ──────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Boat Maintenance Yard, Santa Cruz Harbor", location: "Santa Cruz, USA", era: "Present Day", emoji: "🔧" },
    id: "bt-26",
    order: 26,
    title: "Patching the Hull",
    subtitle: "Software Updates — Sealing Known Holes Before They Sink You",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-26-q1", type: "Core Idea", challenge: "The known flaw.", text: "What is a CVE?", options: ["A publicly catalogued, known security vulnerability", "A type of password", "A WiFi standard", "A backup file"], correctIndex: 0, explanation: "CVE = Common Vulnerabilities and Exposures — a public ID for a known flaw." },
        { id: "bt-26-q2", type: "Why Patch", challenge: "Closing the hole.", text: "Why is applying patches important?", options: ["Patches fix known vulnerabilities that attackers actively exploit", "They make the screen brighter", "They add new wallpapers", "They speed up typing"], correctIndex: 0, explanation: "Once a flaw is public, attackers scan for unpatched systems — patching removes the opening." },
        { id: "bt-26-q3", type: "The Clock", challenge: "Why delay is dangerous.", text: "What's the risk of leaving a known CVE unpatched?", options: ["Attackers can scan for and exploit the known weakness at any time", "Nothing — known flaws are safe", "The software runs faster", "It improves security"], correctIndex: 0, explanation: "A known, unpatched vulnerability is a published, open door — a countdown to exploitation." },
        { id: "bt-26-q4", type: "Known vs Zero-Day", challenge: "Two kinds of bug.", text: "How does a known CVE differ from a zero-day?", options: ["A known CVE usually has a fix available; a zero-day has none yet", "They're identical", "A zero-day is always harmless", "A known CVE can't be exploited"], correctIndex: 0, explanation: "For known CVEs the defense often already exists — you just have to apply it." },
        { id: "bt-26-q5", type: "Real-World Pattern", challenge: "Breaches from neglect.", text: "Many major breaches happened because an organization…", options: ["Failed to apply an available patch for a known vulnerability", "Used too many passwords", "Had too much encryption", "Updated too often"], correctIndex: 0, explanation: "Unpatched known CVEs (e.g. the 2017 Equifax Struts flaw) are a leading breach cause." },
        { id: "bt-26-q6", type: "Process", challenge: "Staying current.", text: "What is patch management?", options: ["Tracking software and applying updates in a timely, organized way", "Sewing torn clothes", "Deleting old emails", "Changing your username"], correctIndex: 0, explanation: "Knowing what you run and keeping it updated systematically closes known holes." },
        { id: "bt-26-q7", type: "Verify", challenge: "Trust but check.", text: "After patching, what should you do?", options: ["Verify the fix — re-check the version/that the vulnerability is gone", "Assume it worked and move on", "Reboot 10 times", "Uninstall the software"], correctIndex: 0, explanation: "Confirming the patch applied (e.g. version check) ensures the hole is actually closed." },
        { id: "bt-26-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "An unpatched known vulnerability is most like…", options: ["A known crack in the hull — patch it or sink", "A full fuel tank", "A clean deck", "A calm sea"], correctIndex: 0, explanation: "A known leak left unrepaired is just a countdown to disaster." },
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
            "",
            ">> LEARN: CVSS scores measure exploitability and impact — 9.8 means critical",
            "   A CVSS 9.8 RCE with no authentication = unauthenticated remote root access.",
            "   Attackers scan the entire internet for known CVEs within hours of disclosure.",
            "   Real tool: nvd.nist.gov — search CVE-ID for CVSS score and affected versions.",
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
            "",
            ">> LEARN: Buffer overflows overwrite memory to redirect execution flow",
            "   The authentication handler didn't validate input length — return address overwritten.",
            "   Exploit code (PoC) for published CVEs appears on GitHub within 24-72 hours.",
            "   Real tool: searchsploit <software name> — finds public exploit code for CVEs.",
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
            "",
            ">> LEARN: Patching converts a critical CVE into a non-issue instantly",
            "   WannaCry (2017) infected 200,000 machines — the patch was 2 months old.",
            "   Enable automatic security updates; treat CVSS 9+ as a fire drill.",
            "   Real tool: sudo apt update && apt-get upgrade --only-upgrade (Debian/Ubuntu)",
          ],
        }),
      },
    },
  },

  // ─── BT-27: Data Breaches ─────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Catch Inspection Station, Moss Landing", location: "Moss Landing, USA", era: "Present Day", emoji: "🐟" },
    id: "bt-27",
    order: 27,
    title: "When the Net Tears",
    subtitle: "Data Breaches — What Happens to Your Data When Companies Leak It",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-27-q1", type: "Core Idea", challenge: "When the net tears.", text: "What is a data breach?", options: ["When a company's stored data is exposed or stolen", "When your WiFi is slow", "When you forget a password", "When a website is redesigned"], correctIndex: 0, explanation: "A breach leaks data the company held — affecting you even if you did nothing wrong." },
        { id: "bt-27-q2", type: "Aftermath", challenge: "Where stolen data goes.", text: "What typically happens to breached data?", options: ["It's sold on dark-web markets and reused against other sites", "It's deleted immediately", "It's returned to users", "Nothing"], correctIndex: 0, explanation: "Stolen credentials are sold and fed into automated attacks within days." },
        { id: "bt-27-q3", type: "Credential Stuffing", challenge: "Reused-password attack.", text: "What is credential stuffing?", options: ["Automatically trying breached username/password pairs on many other sites", "Stuffing a server with cables", "A type of CAPTCHA", "Adding characters to a password"], correctIndex: 0, explanation: "Attackers replay leaked credentials everywhere, banking on password reuse." },
        { id: "bt-27-q4", type: "Real Incident", challenge: "2013, 3 billion.", text: "What made the Yahoo breach historic?", options: ["All 3 billion accounts were compromised — and it wasn't discovered for ~3 years", "Only 10 accounts were affected", "It was fixed the same day", "No data was taken"], correctIndex: 0, explanation: "It's the largest breach on record, and the years-long detection gap made it worse." },
        { id: "bt-27-q5", type: "Your Defense", challenge: "Stopping the spread.", text: "What's the single best defense against credential stuffing?", options: ["Never reuse passwords (use a unique one per site)", "Use the same strong password everywhere", "Avoid the internet", "Change your username often"], correctIndex: 0, explanation: "Unique passwords mean one breach can't unlock your other accounts." },
        { id: "bt-27-q6", type: "Check Exposure", challenge: "Am I affected?", text: "How can you check if your email appears in known breaches?", options: ["Use a service like haveibeenpwned.com", "Ask the attacker", "Reinstall your browser", "Turn off your phone"], correctIndex: 0, explanation: "HIBP lets you see which breaches include your email so you can respond." },
        { id: "bt-27-q7", type: "Response", challenge: "After a breach.", text: "If your password was in a breach, you should…", options: ["Change it there and anywhere you reused it, and enable 2FA", "Do nothing", "Email everyone the new password", "Keep using the old one"], correctIndex: 0, explanation: "Rotate the exposed password everywhere and add 2FA — your response limits the damage." },
        { id: "bt-27-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "A data breach is most like…", options: ["A torn net spilling the whole catch at once", "A single lost fish", "A calm harbor", "A new boat"], correctIndex: 0, explanation: "One tear and everyone's data spills out together." },
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
                "",
                ">> LEARN: Breach dumps are sold and shared on dark web forums within days",
                "   Plaintext and weak hashes (MD5/SHA-1) are cracked before sale is complete.",
                "   Attackers correlate emails across dumps to build fuller victim profiles.",
                "   Real tool: haveibeenpwned.com — free breach notification for your email.",
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
            "",
            ">> LEARN: Credential stuffing automates breach password reuse at scale",
            "   Tools like OpenBullet test millions of email/password pairs per hour.",
            "   A 0.1% success rate against 10M stolen credentials = 10,000 hijacked accounts.",
            "   Defense: unique password per site — a password manager makes this effortless.",
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
            "",
            ">> LEARN: Assess scope before acting — know what the attacker touched",
            "   Average breach goes undetected for 197 days — months of silent access.",
            "   Without 2FA, stolen credentials grant silent access indefinitely.",
            "   Check login history and authorized app tokens on every affected account.",
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
            "",
            ">> LEARN: Breach remediation must be thorough — partial fixes leave gaps",
            "   Attackers plant OAuth app tokens that survive a password change.",
            "   Revoke all active sessions after password reset — ends attacker access.",
            "   Monitor haveibeenpwned.com alerts to detect future breaches early.",
          ],
        }),
      },
    },
  },

  // ─── BT-28: Safe Browsing ─────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Kelp Forest, Monterey Bay", location: "Monterey Bay, USA", era: "Present Day", emoji: "🌿" },
    id: "bt-28",
    order: 28,
    title: "Navigating the Kelp Beds",
    subtitle: "Safe Browsing — Spotting Dangerous URLs Before You Click",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-28-q1", type: "Core Idea", challenge: "Look before you leap.", text: "What should you do before clicking a link from an unknown source?", options: ["Inspect the real URL/domain it points to", "Click it fast", "Forward it to friends", "Reply to the sender"], correctIndex: 0, explanation: "A link's text can lie; the real destination is what matters." },
        { id: "bt-28-q2", type: "Lookalikes", challenge: "Spot the fake.", text: "Which is a classic malicious lookalike domain?", options: ["paypa1.com (number 1 instead of letter l)", "paypal.com", "google.com", "wikipedia.org"], correctIndex: 0, explanation: "Typosquatting and homoglyphs swap characters to imitate trusted brands." },
        { id: "bt-28-q3", type: "Hover", challenge: "The reveal.", text: "How do you see a link's true destination?", options: ["Hover over it and read the URL shown", "Squint at the link text", "Trust the words shown", "Click and see"], correctIndex: 0, explanation: "Hovering shows the actual URL, which often differs from the displayed text." },
        { id: "bt-28-q4", type: "Short Links", challenge: "Hidden destinations.", text: "Why are shortened links (bit.ly/...) risky in unexpected messages?", options: ["They hide the true destination until you visit", "They're always malware", "They load slower", "They cost money"], correctIndex: 0, explanation: "Shorteners mask where you'll actually land — expand/preview before trusting." },
        { id: "bt-28-q5", type: "Subdomain Trick", challenge: "Read it right.", text: "Where does 'login.yourbank.com.evil.com' actually take you?", options: ["evil.com — the real domain is the part just before the final slash/TLD", "yourbank.com", "login.com", "It's safe"], correctIndex: 0, explanation: "The true domain is the rightmost part (evil.com); the bank name is just a deceptive subdomain." },
        { id: "bt-28-q6", type: "Padlock Myth", challenge: "HTTPS isn't a safety badge.", text: "Does a padlock/HTTPS mean a link is safe?", options: ["No — phishing sites can have valid HTTPS certificates too", "Yes, always safe", "Only on weekends", "It means it's government-run"], correctIndex: 0, explanation: "HTTPS only means encrypted, not trustworthy — malicious sites use it as well." },
        { id: "bt-28-q7", type: "Best Practice", challenge: "When in doubt.", text: "If you're unsure about a link claiming to be from your bank, you should…", options: ["Go to the bank's site directly via a known address, not the link", "Click the link to check", "Reply with your password", "Ignore your account forever"], correctIndex: 0, explanation: "Reaching the site through a trusted route avoids the trap entirely." },
        { id: "bt-28-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "A malicious URL is most like…", options: ["A calm-looking kelp bed that hides rocks and currents", "A clear road sign", "An open field", "A lighthouse"], correctIndex: 0, explanation: "It looks harmless on the surface but hides danger beneath." },
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
                "",
                ">> LEARN: Read URLs right-to-left to find the real domain",
                "   paypal.com.attacker.ru — the real domain is attacker.ru, not paypal.com.",
                "   HTTPS proves encryption only — phishing sites have valid TLS certificates.",
                "   Real tool: curl -sI bit.ly/xyz | grep Location — expand short URLs safely.",
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
    epochId: "first-journey",
    wonder: { name: "The Harbor Master's Office", location: "Santa Cruz, USA", era: "Present Day", emoji: "🏢" },
    id: "bt-29",
    order: 29,
    title: "What You Share and With Whom",
    subtitle: "Privacy Settings — Controlling Your Digital Footprint",
    category: "cybersecurity",
    xp: 110,
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
    quiz: {
      questions: [
        { id: "bt-29-q1", type: "Core Idea", challenge: "What apps can touch.", text: "What do app 'permissions' control?", options: ["What data and device features an app is allowed to access", "How fast the app runs", "The app's color theme", "Your internet speed"], correctIndex: 0, explanation: "Permissions govern access to things like contacts, location, camera, and files." },
        { id: "bt-29-q2", type: "Principle", challenge: "Just enough.", text: "What is the principle of least privilege?", options: ["Grant only the minimum access something actually needs", "Grant everything to be safe", "Never grant any access", "Grant access randomly"], correctIndex: 0, explanation: "Minimizing access shrinks what can be misused or leaked." },
        { id: "bt-29-q3", type: "Red Flag", challenge: "Asking for too much.", text: "Which is a sign an app is over-permissioned?", options: ["A flashlight app requesting your contacts and location", "A map app requesting location", "A camera app requesting the camera", "A phone app requesting the microphone for calls"], correctIndex: 0, explanation: "Access unrelated to the app's function is a warning sign." },
        { id: "bt-29-q4", type: "Why It Matters", challenge: "More access, more risk.", text: "Why is over-permissioning risky?", options: ["The more access an app has, the more data is exposed if it's compromised or misbehaves", "It makes the app prettier", "It speeds up the phone", "It saves battery"], correctIndex: 0, explanation: "Excess permissions expand the damage from a buggy, malicious, or breached app." },
        { id: "bt-29-q5", type: "Maintenance", challenge: "A regular habit.", text: "What's good practice for app permissions over time?", options: ["Periodically review and revoke ones you don't need", "Grant all and never look again", "Reinstall every app weekly", "Disable your screen lock"], correctIndex: 0, explanation: "Auditing and trimming permissions keeps your exposure minimal." },
        { id: "bt-29-q6", type: "Data Minimization", challenge: "Less to lose.", text: "Why share as little personal data as possible?", options: ["Data you don't share can't be leaked or misused", "It makes apps slower", "It's required by WiFi", "It boosts your signal"], correctIndex: 0, explanation: "Data minimization reduces what's available to leak in a breach." },
        { id: "bt-29-q7", type: "Privacy Settings", challenge: "Who sees what.", text: "What do privacy settings let you control?", options: ["Who can see your information and how it's used", "The weather", "Your battery level", "Your typing speed"], correctIndex: 0, explanation: "Privacy settings put you in charge of your data's visibility and use." },
        { id: "bt-29-q8", type: "Everyday Analogy", challenge: "Tie it together.", text: "Privacy settings are most like…", options: ["A harbor master controlling who knows which boat is in which slip", "An open notice board", "A loudspeaker", "A megaphone"], correctIndex: 0, explanation: "You decide who gets to know what — controlled access to your information." },
      ],
    },
    ctf: {
      scenario: "Audit the harbor office app's permissions and privacy settings. Find which settings are over-permissioned and lock them down to the minimum needed.",
      hint: "Review each permission and disable the ones that aren't necessary.",
      hints: [
        "Check current app permissions. Run: show-permissions",
        "Revoke unnecessary location access. Run: revoke location",
        "Revoke unnecessary contacts access. Run: revoke contacts",
        "Confirm minimal permissions are set. Run: audit-permissions",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
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
            "",
            ">> LEARN: Over-permissioned apps collect data continuously in the background",
            "   Always-on location is sold to data brokers — your movements become a product.",
            "   Microphone always-on has been exploited by apps to record ambient audio.",
            "   Real check: iOS Settings → Privacy & Security → Location Services.",
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
            "",
            ">> LEARN: Data minimization shrinks your breach exposure surface",
            "   Every piece of data collected is a liability if that company is breached.",
            "   Data brokers aggregate app data into dossiers used for targeted spear phishing.",
            "   Real tool: iOS App Privacy Report — shows which apps accessed what data.",
          ],
        }),
      },
    },
  },

  // ─── BT-30: Incident Response ─────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Santa Cruz Small Craft Harbor — Return to Dock", location: "Santa Cruz, USA", era: "Present Day", emoji: "⚓" },
    id: "bt-30",
    order: 30,
    title: "Man Overboard Protocol",
    subtitle: "Incident Response — What To Do When You're Compromised",
    category: "cybersecurity",
    xp: 150,
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
    quiz: {
      questions: [
        { id: "bt-30-q1", type: "Core Idea", challenge: "Having a plan.", text: "What is incident response?", options: ["A planned process for handling a security incident", "A type of antivirus", "A password rule", "A WiFi setting"], correctIndex: 0, explanation: "Incident response is the structured set of steps you follow when something goes wrong." },
        { id: "bt-30-q2", type: "The Steps", challenge: "The order of operations.", text: "Which sequence captures the core incident-response steps?", options: ["Contain, assess, eradicate, recover", "Recover, ignore, repeat", "Panic, blame, quit", "Delete everything immediately"], correctIndex: 0, explanation: "First stop the spread, understand the scope, remove the threat, then restore safely." },
        { id: "bt-30-q3", type: "First Move", challenge: "Stop the bleeding.", text: "On discovering your account is compromised, what comes first?", options: ["Contain it — e.g. change the password and sign out other sessions", "Post about it online", "Wait a week", "Do nothing"], correctIndex: 0, explanation: "Containment limits further damage before you investigate and clean up." },
        { id: "bt-30-q4", type: "Why a Plan", challenge: "Beating panic.", text: "Why follow a defined incident-response protocol?", options: ["Panic causes mistakes; a protocol guides the correct steps in order", "It's just paperwork", "It slows recovery for no reason", "Plans never help"], correctIndex: 0, explanation: "A rehearsed protocol keeps you effective under stress, like a man-overboard drill." },
        { id: "bt-30-q5", type: "Don't", challenge: "What not to do.", text: "What's the wrong move during a security incident?", options: ["Hiding it and hoping it goes away", "Containing the damage", "Assessing the scope", "Recovering from clean backups"], correctIndex: 0, explanation: "Concealing an incident lets it spread — like leaving the scene of a man overboard." },
        { id: "bt-30-q6", type: "Recovery", challenge: "Getting back safely.", text: "What does the recover step involve?", options: ["Restoring from clean backups and verifying systems before monitoring", "Reusing the compromised account as-is", "Turning off all security", "Deleting your backups"], correctIndex: 0, explanation: "Recovery restores known-good state and confirms the threat is gone before resuming." },
        { id: "bt-30-q7", type: "Learn", challenge: "After it's over.", text: "What should happen after an incident is resolved?", options: ["A lessons-learned review to prevent it happening again", "Forget it immediately", "Blame one person and move on", "Disable all logging"], correctIndex: 0, explanation: "Post-incident review turns a painful event into stronger future defenses." },
        { id: "bt-30-q8", type: "Everyday Analogy", challenge: "Tie it together — and finish the journey.", text: "Incident response is most like…", options: ["A man-overboard protocol: act fast, follow the steps, call for help", "Ignoring an alarm", "Taking a nap", "Repainting the boat"], correctIndex: 0, explanation: "A clear, practiced protocol turns a crisis into a survivable, recoverable event. Journey complete — Incident Commander." },
      ],
    },
    ctf: {
      scenario: "Your personal account has been compromised. Walk through every incident response step correctly — contain, assess, eradicate, recover — to complete Our First Journey and earn your Incident Commander badge.",
      hint: "Follow the incident response protocol in order: contain → assess → eradicate → recover.",
      hints: [
        "Start containment. Run: contain",
        "Assess the damage. Run: assess",
        "Eradicate the threat. Run: eradicate",
        "Recover your account. Run: recover",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
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
            "",
            ">> LEARN: Contain first — stopping spread matters more than understanding cause",
            "   Revoking all sessions immediately terminates the attacker's active access.",
            "   Attackers change recovery email/phone to maintain access after discovery.",
            "   Real step: check Settings → Security → Devices on every compromised account.",
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
            "",
            ">> LEARN: Login history reveals dwell time — how long attackers had access",
            "   Average dwell time before discovery is 197 days in enterprise environments.",
            "   Attackers pivot from email to banking via password reset flows.",
            "   2FA on bank accounts stops reset-based account takeovers cold.",
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
            "",
            ">> LEARN: OAuth apps survive password resets — they must be audited separately",
            "   Attackers grant themselves OAuth tokens that persist as long as the app is allowed.",
            "   Email forwarding rules silently copy all mail to the attacker after eviction.",
            "   Real step: account Settings → Apps/Integrations — revoke all unrecognized apps.",
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
            "",
            ">> LEARN: Document everything — timeline and evidence support post-incident review",
            "   Contacts who received phishing from your account are now secondary victims.",
            "   Credit report checks catch new accounts opened with your stolen identity.",
            "   NIST SP 800-61 defines the IR framework: Prepare, Detect, Contain, Recover.",
          ],
        }),
      },
    },
  },
];
