import type { StageConfig } from "./types";

export const firstJourneyStages3: StageConfig[] = [

  // ─── BT-21: Phishing ─────────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Fishing Pond", location: "CyberVille", era: "Today", emoji: "🎣" },
    id: "bt-21",
    order: 21,
    title: "Don't Take the Bait!",
    subtitle: "What is Phishing?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-21", name: "Phish Spotter", emoji: "🎣" },
    challengeType: "ctf",
    info: {
      tagline: "Phishing is when a bad person sends a fake message that looks real — trying to trick you into giving away your password or personal information.",
      year: 2025,
      overview: [
        "Imagine getting a text message that says: 'You won a free gaming console! Click here to claim it!' That sounds exciting — but it's probably a trick. Phishing is when bad people send fake messages pretending to be someone you trust, trying to get you to click a bad link or give up your password.",
        "Phishing messages often look like they're from real companies — your bank, your school, Amazon, or even a friend. They create urgency ('Your account will be deleted in 24 hours!') to make you panic and act without thinking.",
        "The most important rule: STOP and THINK before you click. If something seems too good to be true or too scary to be real, it probably is a trick.",
      ],
      technical: {
        title: "How to Spot a Phishing Message",
        body: [
          "Signs of phishing: (1) You weren't expecting the message. (2) It creates urgency ('Act NOW!'). (3) It asks for your password, credit card, or personal info. (4) The sender's email address looks slightly wrong (like support@amaz0n.com instead of amazon.com). (5) Links go to weird-looking addresses.",
          "When in doubt: don't click the link. Go directly to the website by typing the address yourself. Call the company using a number from their official website — not from the suspicious message.",
        ],
        codeExample: {
          label: "Real email vs phishing email",
          code: `  REAL email from Amazon:
  From: order-update@amazon.com
  Subject: Your order shipped
  Link: https://amazon.com/orders/...

  PHISHING email pretending to be Amazon:
  From: amazon-support@gmail.com ← wrong!
  Subject: URGENT: Account suspended!
  Link: https://amaz0n-login.fake.com ← wrong!

  Spot the differences:
  ✗ Wrong email address
  ✗ Fake urgency
  ✗ Weird website link`,
        },
      },
      incident: {
        title: "The Phishing Email That Changed an Election",
        when: "2016",
        where: "United States",
        impact: "A campaign was hacked because of one phishing click",
        body: [
          "In 2016, a political campaign official received an email saying 'Someone tried to access your Google account. Change your password here.' He clicked the link and entered his password on a fake Google site. Hackers got into his email and many private emails were stolen.",
          "One click. One moment of not checking carefully. That's all it takes. The lesson: always check the web address before typing your password, and when in doubt, go to the real site yourself.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Hacker sends fake email", sub: "looks like it's real", type: "attacker" },
          { label: "You get urgent message", sub: "'Act now or lose access!'", type: "system" },
          { label: "You click link", sub: "goes to fake website", type: "victim" },
          { label: "You type password", sub: "hacker now has it!", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "First phishing attacks recorded — criminals fake AOL emails" },
        { year: 2016, event: "Spear phishing email hacks political campaign", highlight: true },
        { year: 2025, event: "Billions of phishing emails sent every day — stay alert!" },
      ],
      keyTakeaways: [
        "Phishing = fake messages pretending to be real to steal your info",
        "Warning signs: urgency, wrong email address, unexpected messages, suspicious links",
        "Never click links in unexpected emails — go to the site directly",
        "When in doubt, call the real company using their official number",
      ],
      references: [
        { title: "Phishing Explained — CISA", url: "https://www.cisa.gov/sites/default/files/publications/phishing-infographic-508c.pdf" },
      ],
    },
    ctf: {
      scenario: "Three messages arrived in the Academy inbox. Some are real, some are phishing. Identify the phishing messages and report them.",
      hint: "Check each message for phishing signs and report the fakes.",
      hints: [
        "Read all messages. Run: list-messages",
        "Inspect message 1. Run: inspect 1",
        "Inspect messages 2 and 3.",
        "Report the phishing ones. Run: report 2 and report 3",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/inbox.txt": [
          "ACADEMY INBOX",
          "==============",
          "1. From: principal@academy.edu — 'Assembly tomorrow at 9am'",
          "2. From: academy-admin@gmail.com — 'URGENT: Password expires in 1 hour!'",
          "3. From: freegames@prizes.click — 'You won! Click here!'",
          "",
          "Commands: list-messages | inspect <n> | report <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "inbox.txt", isDir: false }] },
      fragments: [
        { trigger: "list-messages", value: "FLAG{PH1SH_", label: "Messages Listed" },
        { trigger: "inspect 2", value: "SP0TT3D_", label: "Phishing Email Identified" },
        { trigger: "report 3", value: "BLOCK3D}", label: "All Phishing Reported!" },
      ],
      extraCommands: {
        "list-messages": () => ({ lines: ["1. principal@academy.edu — Assembly tomorrow ✓", "2. academy-admin@gmail.com — URGENT password expiry ✗", "3. freegames@prizes.click — You won! ✗", "", "Inspect each: inspect 1, 2, or 3"] }),
        inspect: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["Message 1: From principal@academy.edu (real domain ✓). Normal school message. SAFE."] };
          if (n === "2") return { lines: ["Message 2: PHISHING! Wrong domain (gmail.com, not academy.edu). Fake urgency ('1 hour!'). Wants your password. REPORT IT!"] };
          if (n === "3") return { lines: ["Message 3: PHISHING! Suspicious sender, impossible prize offer, clickbait link. REPORT IT!"] };
          return { lines: ["Unknown message."] };
        },
        report: (args) => {
          const n = args[0];
          if (n === "2") return { lines: ["✓ Message 2 REPORTED and blocked! Nice phishing detection!"] };
          if (n === "3") return { lines: ["✓ Message 3 REPORTED and blocked! Good work! Run 'assemble'."] };
          return { lines: [`Message ${n} is real — don't report real messages.`] };
        },
      },
    },
  },

  // ─── BT-22: Two-Factor Authentication ────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Vault Room", location: "CyberVille", era: "Today", emoji: "🔐" },
    id: "bt-22",
    order: 22,
    title: "Two Locks Are Better Than One",
    subtitle: "What is Two-Factor Authentication (2FA)?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-22", name: "2FA Champion", emoji: "🔐" },
    challengeType: "ctf",
    info: {
      tagline: "Two-factor authentication adds a second lock to your account — even if someone knows your password, they still can't get in.",
      year: 2025,
      overview: [
        "Imagine your school locker has two locks. Even if someone finds the combination to the first lock, they still can't open it without the key to the second lock. Two-factor authentication (2FA) works the same way for your online accounts.",
        "With 2FA, logging in requires two things: (1) something you KNOW — your password, and (2) something you HAVE — a code sent to your phone, or generated by an app. A hacker who steals your password still can't log in without also having your phone.",
        "Turn on 2FA for every important account: email, social media, school accounts. It takes 10 seconds at login and makes your account about 100 times harder to hack.",
      ],
      technical: {
        title: "Types of 2FA",
        body: [
          "SMS 2FA: a code is texted to your phone. Easy but not the most secure (hackers can sometimes intercept texts). Authenticator apps (like Google Authenticator): generate a new 6-digit code every 30 seconds. More secure than SMS. Hardware keys (like YubiKey): a physical device you plug in. Most secure of all.",
          "Using ANY form of 2FA is much better than no 2FA. Don't let perfect be the enemy of good — enable SMS 2FA now, and upgrade later if you want.",
        ],
        codeExample: {
          label: "How 2FA works",
          code: `  Step 1: Enter your password (something you KNOW)
          ✓ Password accepted

  Step 2: Check your phone for a code (something you HAVE)
          App shows: 847 293 (changes every 30 seconds)

  Step 3: Enter the code on the login page
          ✓ Code correct — LOGIN SUCCESSFUL

  Hacker has your password but not your phone:
  Step 2: Hacker can't get the code
          ✗ LOGIN DENIED — account stays safe!`,
        },
      },
      incident: {
        title: "Tricked Around 2FA — The Uber Hack",
        when: "2022",
        where: "Uber, the ride-sharing company",
        impact: "A hacker got full access to Uber's internal systems",
        body: [
          "In 2022, a hacker got an employee's password and tried to log into Uber. The employee had 2FA set up, so the hacker kept sending 2FA approval requests — over and over for an hour. Finally, the exhausted employee clicked 'Approve' just to make them stop. The hacker got in.",
          "This shows that 2FA is strong, but social engineering (tricking people) can sometimes work around it. Never approve a 2FA request you didn't initiate yourself. If you get unexpected 2FA requests, change your password immediately.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Enter Password", sub: "factor 1: something you know", type: "attacker" },
          { label: "Get Code on Phone", sub: "factor 2: something you have", type: "system" },
          { label: "Enter Both Correctly", sub: "two checks passed", type: "victim" },
          { label: "Access Granted!", sub: "much harder to hack", type: "result" },
        ],
      },
      timeline: [
        { year: 1993, event: "First patented two-factor authentication system" },
        { year: 2013, event: "Many major breaches show password-only login is not enough" },
        { year: 2025, event: "2FA is standard on most important websites — enable it!", highlight: true },
      ],
      keyTakeaways: [
        "2FA requires both your password AND a second code (from your phone)",
        "Even if a hacker gets your password, they still can't log in without your phone",
        "SMS, authenticator apps, and hardware keys are all types of 2FA",
        "Never approve a 2FA request you didn't initiate — change your password if this happens",
      ],
      references: [
        { title: "Multi-Factor Authentication — CISA", url: "https://www.cisa.gov/mfa" },
      ],
    },
    ctf: {
      scenario: "Someone is trying to log into the Academy system with a stolen password. The system requires 2FA. Help the system block the attacker.",
      hint: "Follow the 2FA process and identify the unauthorized login attempt.",
      hints: [
        "See the login attempt. Run: show-attempt",
        "Check if 2FA was sent to the real user. Run: check-2fa",
        "The real user didn't request it — deny it. Run: deny-login",
        "Alert the real user. Run: alert-user",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/login-attempts.txt": [
          "ACADEMY LOGIN MONITOR",
          "======================",
          "Attempt: User 'alice', correct password entered",
          "BUT: Login is from an unknown location (different country!)",
          "2FA code was requested automatically",
          "Alice's phone received the code",
          "",
          "Is this Alice? Or a hacker with her password?",
          "Commands: show-attempt | check-2fa | deny-login | alert-user",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "login-attempts.txt", isDir: false }] },
      fragments: [
        { trigger: "show-attempt", value: "FLAG{2F4_", label: "Suspicious Login Found" },
        { trigger: "check-2fa", value: "PR0T3CT5_", label: "2FA Triggered Correctly" },
        { trigger: "deny-login", value: "ACC0UNT}", label: "Unauthorized Login Blocked!" },
      ],
      extraCommands: {
        "show-attempt": () => ({ lines: ["LOGIN ATTEMPT:", "  User: alice", "  Password: CORRECT (stolen!)", "  Location: Unknown country", "  Time: 3am (Alice is usually asleep)", "", "Suspicious! Check 2FA."] }),
        "check-2fa": () => ({ lines: ["2FA STATUS:", "  Code sent to Alice's phone: 847293", "  Code entered by attacker: (waiting...)", "  Alice was ASLEEP and did NOT initiate this login.", "", "This is unauthorized. Run: deny-login"] }),
        "deny-login": () => ({ lines: ["✓ Login DENIED — 2FA code not approved by the real user.", "✓ Attacker blocked even though they had the correct password.", "Run: alert-user to warn Alice."] }),
        "alert-user": () => ({ lines: ["✓ Alice has been alerted: 'Someone tried to log in with your password from another country.'", "✓ Alice can now change her password.", "✓ 2FA saved her account! Run 'assemble'."] }),
      },
    },
  },

  // ─── BT-23: Password Strength ────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Lock-Up Room", location: "CyberVille", era: "Today", emoji: "🔑" },
    id: "bt-23",
    order: 23,
    title: "Make Your Password Strong",
    subtitle: "Password Strength — Why Length and Randomness Matter",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-23", name: "Password Protector", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "A strong password is like a very long, random combination lock — the more digits and randomness, the harder it is to crack.",
      year: 2025,
      overview: [
        "A combination lock with 3 digits (000–999) has only 1,000 possible combinations — a thief could try them all in minutes. A lock with 10 random digits has 10 billion combinations — that would take years to try! Passwords work the same way. The longer and more random, the stronger.",
        "The worst passwords are easy-to-guess ones: '123456', 'password', your name, or your birthday. These are the first ones hackers try. The best passwords are long, random, and unique to each account.",
        "The easiest way to have strong passwords: use a passphrase (a sentence like 'PurpleElephantJumpsOver7Clouds!') or use a password manager that generates and remembers random passwords for you.",
      ],
      technical: {
        title: "How Hackers Crack Passwords",
        body: [
          "Dictionary attacks try common words and known passwords. Brute force attacks try every possible combination. The key insight: a 6-character password can be cracked in seconds. A 16-character random password would take millions of years with today's computers.",
          "Every account should have a unique password. If one site gets hacked and you used the same password everywhere, all your accounts are at risk. A password manager (like 1Password or Bitwarden) helps you use unique strong passwords for everything.",
        ],
        codeExample: {
          label: "Weak vs strong passwords",
          code: `  WEAK (cracked in seconds):
  ✗ password
  ✗ 123456
  ✗ minecraft2024
  ✗ your_dog_name

  STRONG (takes forever to crack):
  ✓ PurpleElephant!Jumps7Times
  ✓ xK#9pL!qN2$mR8
  ✓ correct-horse-battery-staple

  Rules:
  ✓ At least 12 characters long
  ✓ Mix of letters, numbers, symbols
  ✓ Unique for every account`,
        },
      },
      incident: {
        title: "32 Million Passwords Stored in Plain Text",
        when: "2009",
        where: "RockYou, a social gaming company",
        impact: "32 million real passwords exposed — still used to crack other accounts today",
        body: [
          "In 2009, a company called RockYou got hacked. They had stored 32 million users' passwords in plain text — no protection at all. Hackers published the list online. The most common password? '123456' (used by 290,000 people).",
          "That list of passwords is still used by hackers today to guess passwords on other sites. If your password is common or simple, it's probably on that list. Check haveibeenpwned.com to see if your accounts have been in any breaches.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Short/common password", sub: "cracked in seconds", type: "attacker" },
          { label: "Hacker's word list", sub: "tries millions of guesses", type: "system" },
          { label: "Long random password", sub: "takes millions of years", type: "victim" },
          { label: "Your account stays safe!", sub: "complexity = protection", type: "result" },
        ],
      },
      timeline: [
        { year: 1961, event: "First computer password ever used" },
        { year: 2009, event: "RockYou breach — 32M passwords in plain text exposed", highlight: true },
        { year: 2025, event: "Password managers make strong unique passwords easy for everyone" },
      ],
      keyTakeaways: [
        "Long, random passwords are exponentially harder to crack than short simple ones",
        "Never reuse passwords — if one site is hacked, all your accounts stay safe",
        "A passphrase (4+ random words) is both strong and memorable",
        "Use a password manager to generate and store unique passwords for every site",
      ],
      references: [
        { title: "Password Strength — NIST", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
      ],
    },
    ctf: {
      scenario: "The Academy password system flagged some user passwords as too weak. Review each one and recommend whether to approve or require a change.",
      hint: "Check each password's strength and make recommendations.",
      hints: [
        "See flagged passwords. Run: list-passwords",
        "Rate password 1. Run: rate 1",
        "Rate passwords 2 and 3.",
        "Approve or flag each. Run: approve 3 and require-change 1 and require-change 2",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/password-audit.txt": [
          "PASSWORD AUDIT",
          "===============",
          "User 1 'alice': password = 'abc123'",
          "User 2 'bob':   password = 'qwerty'",
          "User 3 'carol': password = 'PurpleMonkey!Jumps42'",
          "",
          "Commands: list-passwords | rate <n> | approve <n> | require-change <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "password-audit.txt", isDir: false }] },
      fragments: [
        { trigger: "list-passwords", value: "FLAG{P4SSW0RD_", label: "Passwords Listed" },
        { trigger: "rate 3", value: "STR3NGH_", label: "Strong Password Identified" },
        { trigger: "require-change 1", value: "CH3CK3D}", label: "Weak Passwords Flagged — Audit Complete!" },
      ],
      extraCommands: {
        "list-passwords": () => ({ lines: ["1. alice: 'abc123' — 6 chars, very common", "2. bob: 'qwerty' — 6 chars, keyboard pattern", "3. carol: 'PurpleMonkey!Jumps42' — 20 chars, mixed, strong!", "", "Rate each: rate 1, rate 2, rate 3"] }),
        rate: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["'abc123': VERY WEAK — 6 chars, common, cracked in seconds. Require change."] };
          if (n === "2") return { lines: ["'qwerty': VERY WEAK — keyboard pattern, top 10 worst passwords. Require change."] };
          if (n === "3") return { lines: ["'PurpleMonkey!Jumps42': STRONG — 20 chars, mixed case, numbers, symbol. Approve!"] };
          return { lines: ["Unknown user."] };
        },
        approve: (args) => {
          if (args[0] === "3") return { lines: ["✓ Carol's password APPROVED — strong and unique."] };
          return { lines: [`User ${args[0]}'s password is too weak to approve.`] };
        },
        "require-change": (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["✓ Alice must choose a new, stronger password."] };
          if (n === "2") return { lines: ["✓ Bob must choose a new, stronger password. Run 'assemble'."] };
          return { lines: [`User ${n} has a strong password.`] };
        },
      },
    },
  },

  // ─── BT-24: Public WiFi ──────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The CyberVille Coffee Shop", location: "CyberVille", era: "Today", emoji: "☕" },
    id: "bt-24",
    order: 24,
    title: "Be Careful at the Coffee Shop",
    subtitle: "Public WiFi — What Can Go Wrong?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-24", name: "WiFi Watcher", emoji: "☕" },
    challengeType: "ctf",
    info: {
      tagline: "Public WiFi is like talking in a crowded room — anyone nearby might be listening. Be careful what you share.",
      year: 2025,
      overview: [
        "Imagine you're at a coffee shop and you start talking loudly about your deepest secret. Everyone in the shop can hear you! Public WiFi networks — in coffee shops, airports, and libraries — can be a bit like that. Anyone connected to the same network might be able to see your internet traffic.",
        "The good news: HTTPS protects most of your data even on public WiFi. But there are still risks — like fake WiFi hotspots set up by hackers pretending to be the real coffee shop network.",
        "Safe rules for public WiFi: only use HTTPS sites (look for the lock), don't log into banking or very sensitive accounts, and consider using a VPN (a tool that encrypts all your traffic).",
      ],
      technical: {
        title: "The Fake WiFi Hotspot Trick",
        body: [
          "A common attack: a hacker sits in a coffee shop and creates a WiFi network called 'CoffeeShopFree' — the same name as the real one. When you connect, all your traffic goes through the hacker's device. They can see everything you do online.",
          "Defense: always ask staff what the exact WiFi name is, verify before connecting, and use a VPN which encrypts all traffic so even the network owner can't read it.",
        ],
        codeExample: {
          label: "Safe vs unsafe on public WiFi",
          code: `  SAFE on public WiFi:
  ✓ Reading news (HTTPS)
  ✓ Watching YouTube (HTTPS)
  ✓ Using a VPN (encrypts everything)

  RISKY on public WiFi:
  ✗ Online banking
  ✗ Logging into email (without 2FA)
  ✗ Typing credit card numbers
  ✗ Connecting to unknown/fake networks

  When in doubt: use mobile data instead.`,
        },
      },
      incident: {
        title: "Hotel WiFi Attacks",
        when: "2014 and ongoing",
        where: "Luxury hotels worldwide",
        impact: "Business travelers had devices infected via hotel WiFi",
        body: [
          "Hackers called the Darkhotel APT group targeted businesspeople staying in luxury hotels in Asia. When travelers connected to hotel WiFi and downloaded a software update, the update was actually malware installed by the hackers.",
          "The lesson: be very careful about installing anything when connected to hotel or public WiFi. Even trusted update prompts can be faked on a compromised network.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You connect to public WiFi", sub: "open network", type: "attacker" },
          { label: "Other users on same network", sub: "might be able to see traffic", type: "system" },
          { label: "Fake hotspot (evil twin)", sub: "hacker's network, looks real", type: "victim" },
          { label: "VPN protects you!", sub: "encrypts all your traffic", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "Public WiFi appears in cafes and airports" },
        { year: 2010, event: "Firesheep shows how easy it is to steal logins on open networks" },
        { year: 2025, event: "HTTPS is now widespread — most traffic is encrypted even on public WiFi", highlight: true },
      ],
      keyTakeaways: [
        "Public WiFi is shared — others on the same network might see unencrypted traffic",
        "Fake WiFi hotspots look like real networks — always verify the name",
        "HTTPS protects most browsing, but avoid banking on public WiFi",
        "A VPN encrypts all your traffic and is the best protection on public WiFi",
      ],
      references: [
        { title: "Risks of Public WiFi — FTC", url: "https://consumer.ftc.gov/articles/public-wifi-risks" },
      ],
    },
    ctf: {
      scenario: "You're at a coffee shop and see 3 WiFi networks. One is real, one is a fake hotspot set up by a hacker. Identify the safe network to connect to.",
      hint: "Spot the fake hotspot and connect to the safe network.",
      hints: [
        "See available networks. Run: scan-wifi",
        "Inspect each network. Run: inspect wifi-1",
        "Inspect wifi-2 and wifi-3.",
        "Connect to the safe one. Run: connect wifi-1",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/wifi-scan.txt": [
          "AVAILABLE WIFI NETWORKS",
          "========================",
          "wifi-1: CyberVilleCafe         (verified by staff: real!)",
          "wifi-2: CyberVilleCafe_FREE     (extra 'FREE' — suspicious!)",
          "wifi-3: FREE_COFFEE_WIFI        (new, unverified, too good?)",
          "",
          "Commands: scan-wifi | inspect <wifi> | connect <wifi>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "wifi-scan.txt", isDir: false }] },
      fragments: [
        { trigger: "scan-wifi", value: "FLAG{W1F1_", label: "Networks Found" },
        { trigger: "inspect wifi-2", value: "3V1L_", label: "Fake Hotspot Identified" },
        { trigger: "connect wifi-1", value: "TW1N}", label: "Connected to Safe Network!" },
      ],
      extraCommands: {
        "scan-wifi": () => ({ lines: ["wifi-1: CyberVilleCafe — staff verified ✓", "wifi-2: CyberVilleCafe_FREE — not on official list!", "wifi-3: FREE_COFFEE_WIFI — unknown origin!", "", "Inspect each: inspect wifi-1, wifi-2, wifi-3"] }),
        inspect: (args) => {
          const w = args[0];
          if (w === "wifi-1") return { lines: ["wifi-1: Official cafe network. Staff confirmed this is the real name. SAFE."] };
          if (w === "wifi-2") return { lines: ["wifi-2: FAKE! 'CyberVilleCafe_FREE' is not the real network name. Could be an evil twin hotspot!"] };
          if (w === "wifi-3") return { lines: ["wifi-3: FAKE! Unknown origin, no staff verification. Suspicious free offer."] };
          return { lines: ["Unknown network."] };
        },
        connect: (args) => {
          const w = args[0];
          if (w === "wifi-1") return { lines: ["✓ Connected to CyberVilleCafe (the real network)!", "✓ Always verify with staff before connecting. Good instinct! Run 'assemble'."] };
          return { lines: [`${w} is a fake hotspot! Don't connect. Use wifi-1 instead.`] };
        },
      },
    },
  },

  // ─── BT-25: Social Engineering ───────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Trust Lab", location: "CyberVille", era: "Today", emoji: "🤝" },
    id: "bt-25",
    order: 25,
    title: "Tricks That Target People",
    subtitle: "Social Engineering — Hacking Humans",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-25", name: "Social Engineer Spotter", emoji: "🤝" },
    challengeType: "ctf",
    info: {
      tagline: "Social engineering is tricking people instead of computers — the most powerful hack doesn't need any code at all.",
      year: 2025,
      overview: [
        "Not all hacking involves computers and code. Sometimes the easiest attack is just asking nicely — or tricking someone into helping without realizing it. Social engineering means using psychology to trick people into giving up secrets or access.",
        "For example: someone calls the school office pretending to be an IT technician. 'Hi, I'm from tech support. I need the password to fix a problem!' If the office person doesn't verify the caller is who they say, they might give out the password — and the 'technician' was actually a hacker.",
        "The best defense against social engineering: always verify who you're talking to before sharing any information. Real IT departments never ask for your password.",
      ],
      technical: {
        title: "Common Social Engineering Tricks",
        body: [
          "Pretexting: creating a fake story to get information ('I'm from HR and need your employee number'). Baiting: leaving a USB drive with a tempting label on it — when someone plugs it in, it installs malware. Tailgating: following an authorized person through a secure door without your own access.",
          "The key insight: social engineers exploit helpfulness, authority, and urgency. The fix is simple rules that everyone follows: never share passwords, always verify identities, and when in doubt, say no and check.",
        ],
        codeExample: {
          label: "Social engineering vs technical hacking",
          code: `  Technical hack (hard):
  Find software vulnerability →
  Write exploit code →
  Hope the target runs it

  Social engineering (easy):
  Call someone →
  "Hi, I'm IT. Emergency! Give me
   your password or the server crashes!"

  Many people just... give the password.

  Defense: verify FIRST, then help.
  Real IT never needs your password.`,
        },
      },
      incident: {
        title: "The $120M Invoice Trick",
        when: "2013–2015",
        where: "Google and Facebook",
        impact: "$120 million stolen using fake invoices",
        body: [
          "A scammer from Lithuania sent fake invoices to Google and Facebook, pretending to be a real equipment supplier. Employees at both companies paid the fake invoices — they thought it was normal business! The scammer stole over $120 million before being caught.",
          "This attack required no hacking software at all — just fake documents and the authority of the claimed identity. Always verify large financial requests through a second communication channel.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Social Engineer Calls", sub: "creates a fake story", type: "attacker" },
          { label: "Target Feels Urgency", sub: "'Must act now!'", type: "system" },
          { label: "Target Helps", sub: "shares info or access", type: "victim" },
          { label: "Attack Succeeds", sub: "without any technical hacking", type: "result" },
        ],
      },
      timeline: [
        { year: 1978, event: "First social engineering phone scams documented" },
        { year: 2015, event: "$120M stolen from Google and Facebook using fake invoices", highlight: true },
        { year: 2025, event: "Social engineering remains the most common attack method" },
      ],
      keyTakeaways: [
        "Social engineering tricks people, not computers — no code needed",
        "Common tricks: fake urgency, pretending to be authority, helpfulness exploitation",
        "Real IT staff and banks never ask for your password",
        "Always verify identities before sharing any information or access",
      ],
      references: [
        { title: "Social Engineering — SANS", url: "https://www.sans.org/blog/social-engineering-a-definition/" },
      ],
    },
    ctf: {
      scenario: "3 people are calling the Academy's help desk. Each claims to need emergency access. Some are real, some are social engineers. Verify each caller correctly.",
      hint: "Verify each caller's identity before granting any access.",
      hints: [
        "List the callers. Run: list-callers",
        "Verify caller 1. Run: verify 1",
        "Verify callers 2 and 3.",
        "Help the verified real caller. Run: help 2",
        "Deny the unverified ones. Run: deny 1 and deny 3",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/helpdesk-calls.txt": [
          "INCOMING HELP DESK CALLS",
          "=========================",
          "Caller 1: 'I'm from IT! Emergency! Give me admin password!'",
          "Caller 2: Principal Chen — provided staff ID #4421 (verifiable)",
          "Caller 3: 'I'm the school inspector, I need access to all files!'",
          "",
          "Commands: list-callers | verify <n> | help <n> | deny <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "helpdesk-calls.txt", isDir: false }] },
      fragments: [
        { trigger: "list-callers", value: "FLAG{S0C1AL_", label: "Callers Listed" },
        { trigger: "verify 2", value: "3NG1N33R_", label: "Real Caller Verified" },
        { trigger: "deny 1", value: "D3F3AT3D}", label: "Social Engineer Denied!" },
      ],
      extraCommands: {
        "list-callers": () => ({ lines: ["1. Unknown caller claiming IT emergency", "2. Principal Chen — has staff ID #4421", "3. Unknown 'school inspector'", "", "Verify each: verify 1, 2, 3"] }),
        verify: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["Caller 1: UNVERIFIED. Real IT never asks for passwords. Classic social engineering!"] };
          if (n === "2") return { lines: ["Caller 2: VERIFIED ✓ Staff ID #4421 matches Principal Chen in the directory. Real person."] };
          if (n === "3") return { lines: ["Caller 3: UNVERIFIED. No inspector visit was scheduled. No ID provided. Suspicious."] };
          return { lines: ["Unknown caller."] };
        },
        help: (args) => {
          if (args[0] === "2") return { lines: ["✓ Principal Chen HELPED — verified identity, legitimate request."] };
          return { lines: [`Caller ${args[0]} was not verified. Deny unverified callers.`] };
        },
        deny: (args) => {
          const n = args[0];
          if (n === "1") return { lines: ["✓ Caller 1 DENIED — unverified, classic social engineering attempt."] };
          if (n === "3") return { lines: ["✓ Caller 3 DENIED — no scheduled visit, no ID. Run 'assemble'."] };
          return { lines: [`Caller ${n} was verified — they should be helped.`] };
        },
      },
    },
  },

  // ─── BT-26: Software Updates ─────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Maintenance Room", location: "CyberVille", era: "Today", emoji: "🔧" },
    id: "bt-26",
    order: 26,
    title: "Fixing the Holes",
    subtitle: "Why Software Updates Matter",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-26", name: "Patch Patrol", emoji: "🔧" },
    challengeType: "ctf",
    info: {
      tagline: "Software updates fix security holes in your apps and devices. Not updating is like leaving a crack in your wall that burglars know about.",
      year: 2025,
      overview: [
        "Imagine your house has a secret crack in the wall that lets burglars sneak in. If you know about the crack, you fix it. But if you ignore the crack and the burglar finds it first — you have a problem. Software vulnerabilities are exactly like that crack.",
        "When researchers or hackers find a security problem in an app, the company quickly releases an update to fix it. If you install the update, your device gets the patch (the fix). If you delay, you leave yourself vulnerable — attackers know about the hole and they're actively looking for unpatched targets.",
        "Install updates as soon as they're available. Yes, even when it's inconvenient. Turn on automatic updates for your phone and apps. This one habit prevents most security problems.",
      ],
      technical: {
        title: "What a CVE Is",
        body: [
          "When a security hole is found, it gets an official ID number called a CVE (Common Vulnerabilities and Exposures). For example, CVE-2021-44228 was the name for the famous Log4Shell vulnerability. CVE numbers let everyone clearly reference and track specific security holes.",
          "The National Vulnerability Database (NVD) tracks all known CVEs and rates their severity. When a critical CVE is published, attackers immediately start looking for unpatched systems. Time between update release and attack can be hours.",
        ],
        codeExample: {
          label: "The update process",
          code: `  Day 1:  Security researcher finds a hole in an app
  Day 2:  Researcher notifies the company privately
  Day 7:  Company develops and tests the fix
  Day 14: Company releases the update + security notes
          (attackers now know about the hole too!)
  Day 15: Attackers scan for unpatched systems

  UPDATE IMMEDIATELY on Day 14.
  Every day you wait = more risk.`,
        },
      },
      incident: {
        title: "Log4Shell — A Library Used Everywhere Was Broken",
        when: "December 2021",
        where: "Worldwide — millions of servers",
        impact: "One of the worst vulnerabilities in internet history",
        body: [
          "In December 2021, a security hole was found in Log4j — a piece of software that billions of systems used without even knowing it. A single specially crafted message could let a hacker take complete control of an affected server.",
          "Companies around the world scrambled to update their systems. Microsoft, Apple, Google, gaming servers, hospitals, governments — all had to patch urgently. Systems that weren't patched within days were actively attacked.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Vulnerability found", sub: "a hole in the software", type: "attacker" },
          { label: "Company releases update", sub: "patch seals the hole", type: "system" },
          { label: "You install update ✓", sub: "hole is sealed on your device", type: "victim" },
          { label: "You don't update ✗", sub: "attackers exploit the hole", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "First software patch released to fix a security bug" },
        { year: 2021, event: "Log4Shell — one of the worst vulnerabilities in internet history", highlight: true },
        { year: 2025, event: "Automatic updates now standard on phones and computers" },
      ],
      keyTakeaways: [
        "Software updates fix security holes — install them as soon as available",
        "CVE numbers identify specific security vulnerabilities so they can be tracked",
        "Attackers know about unpatched vulnerabilities and actively hunt for them",
        "Turn on automatic updates — it's the simplest security habit you can build",
      ],
      references: [
        { title: "National Vulnerability Database — NVD", url: "https://nvd.nist.gov/" },
      ],
    },
    ctf: {
      scenario: "The Academy has 4 apps with known vulnerabilities. Find which ones have critical updates available and mark them as urgent.",
      hint: "Find the critical vulnerabilities and mark them urgent.",
      hints: [
        "List all apps. Run: list-apps",
        "Check app 1. Run: check-app browser",
        "Check the other apps.",
        "Mark critical ones urgent. Run: mark-urgent browser and mark-urgent server",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/app-status.txt": [
          "ACADEMY APP SECURITY STATUS",
          "============================",
          "browser    — CVE-2025-001 (CRITICAL) — patch available!",
          "word-processor — CVE-2025-002 (LOW) — minor fix",
          "server     — CVE-2025-003 (CRITICAL) — patch available!",
          "calculator — CVE-2025-004 (INFORMATIONAL) — no action needed",
          "",
          "Commands: list-apps | check-app <name> | mark-urgent <name>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "app-status.txt", isDir: false }] },
      fragments: [
        { trigger: "list-apps", value: "FLAG{P4TCH_", label: "Apps Listed" },
        { trigger: "mark-urgent browser", value: "1T_N0W_", label: "Critical App Marked Urgent" },
        { trigger: "mark-urgent server", value: "UPD4T3}", label: "All Critical Apps Marked — Patching Begins!" },
      ],
      extraCommands: {
        "list-apps": () => ({ lines: ["browser: CVE-2025-001 CRITICAL", "word-processor: CVE-2025-002 LOW", "server: CVE-2025-003 CRITICAL", "calculator: CVE-2025-004 INFORMATIONAL", "", "check-app <name> for details"] }),
        "check-app": (args) => {
          const app = args[0];
          const info: Record<string, string> = {
            browser: "browser: CVE-2025-001 CRITICAL — remote code execution possible. Patch now!",
            "word-processor": "word-processor: CVE-2025-002 LOW — minor formatting bug. Not urgent.",
            server: "server: CVE-2025-003 CRITICAL — data exposure risk. Patch now!",
            calculator: "calculator: CVE-2025-004 INFORMATIONAL — no security impact.",
          };
          return { lines: [info[app] || "Unknown app."] };
        },
        "mark-urgent": (args) => {
          const app = args[0];
          if (app === "browser") return { lines: ["✓ browser marked URGENT — IT team notified to patch immediately."] };
          if (app === "server") return { lines: ["✓ server marked URGENT — IT team notified. Patching starts now! Run 'assemble'."] };
          return { lines: [`${app} doesn't need urgent marking — it's not critical.`] };
        },
      },
    },
  },

  // ─── BT-27: Data Breaches ────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Records Room", location: "CyberVille", era: "Today", emoji: "📁" },
    id: "bt-27",
    order: 27,
    title: "When Private Info Gets Stolen",
    subtitle: "What is a Data Breach?",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-27", name: "Breach Responder", emoji: "📁" },
    challengeType: "ctf",
    info: {
      tagline: "A data breach is when hackers break into a company's database and steal your personal information — even without hacking your own device.",
      year: 2025,
      overview: [
        "You can be careful with your own security — strong password, 2FA, no phishing — and still have your information stolen. How? Through a data breach. A data breach happens when hackers break into a company that stores your data (like a website you use) and steal information about you.",
        "Companies store your name, email, password, and sometimes payment information. If hackers steal this from the company's servers, your information is 'in the wild.' They might sell it, use it to try logging into other sites, or use it for identity theft.",
        "You can check if your email was in any data breaches by visiting haveibeenpwned.com. If it has, change your passwords for any affected accounts and any other accounts where you used the same password.",
      ],
      technical: {
        title: "Credential Stuffing — Using Stolen Passwords",
        body: [
          "When millions of username/password combinations are stolen in a breach, hackers try those exact combinations on other websites. If you use the same password for your gaming account and your email, and the gaming site is breached — the hacker tries your email with the gaming password. This is called credential stuffing.",
          "Defense: use unique passwords for every site (use a password manager). Even if one site is breached, the stolen password only works on that one site.",
        ],
        codeExample: {
          label: "How breached passwords are used",
          code: `  BREACH HAPPENS: GameSite.com hacked
  Stolen: email@example.com : password123

  CREDENTIAL STUFFING:
  Hacker tries email@example.com : password123
  → at Gmail ← same password? Uh oh!
  → at Bank  ← same password? Critical!
  → at Amazon ← same password? Oh no!

  If you use UNIQUE passwords:
  → at Gmail : [different password] ← safe!
  → at Bank  : [different password] ← safe!`,
        },
      },
      incident: {
        title: "3 Billion Yahoo Accounts Stolen",
        when: "2013 (discovered 2016)",
        where: "Yahoo email service",
        impact: "3 billion accounts stolen — every Yahoo account ever created",
        body: [
          "In 2013, Yahoo suffered the biggest data breach in history — but didn't tell anyone until 2016, three years later! Every single Yahoo account ever created (3 billion) was stolen, including names, email addresses, and security question answers.",
          "The lesson for users: change your passwords regularly, don't share the same password across sites, and monitor haveibeenpwned.com for your email. Companies can be hacked and may not tell you for years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Company stores your data", sub: "encrypted, hopefully", type: "attacker" },
          { label: "Hacker breaks into company", sub: "steals the database", type: "system" },
          { label: "Your info is stolen", sub: "you didn't do anything wrong", type: "victim" },
          { label: "Response: change passwords", sub: "enable 2FA, monitor accounts", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Yahoo breach — 3 billion accounts stolen (discovered 2016)", highlight: true },
        { year: 2019, event: "Have I Been Pwned collects over 8 billion breached accounts" },
        { year: 2025, event: "Billions of credentials available on the dark web" },
      ],
      keyTakeaways: [
        "A data breach happens when hackers steal data from a company that stores your info",
        "Your data can be stolen even if you do everything right — it's the company that's hacked",
        "Use unique passwords for every site — so a breach at one site doesn't help at others",
        "Check haveibeenpwned.com to see if your email has been in any breaches",
      ],
      references: [
        { title: "Have I Been Pwned", url: "https://haveibeenpwned.com" },
      ],
    },
    ctf: {
      scenario: "The Academy received a breach notification — a third-party service that stored student data was hacked. Follow the response procedure to protect students.",
      hint: "Follow the breach response steps in order.",
      hints: [
        "Read the breach notice. Run: read-notice",
        "Identify affected accounts. Run: find-affected",
        "Reset all affected passwords. Run: reset-passwords",
        "Notify affected students. Run: notify-students",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/breach-notice.txt": [
          "BREACH NOTIFICATION FROM: QuizApp Inc.",
          "======================================",
          "Date: 2025-05-28",
          "Affected data: usernames, emails, hashed passwords",
          "Affected Academy accounts: 47 students",
          "",
          "Recommended actions:",
          "1. Find affected accounts",
          "2. Force password resets",
          "3. Notify affected students",
          "",
          "Commands: read-notice | find-affected | reset-passwords | notify-students",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "breach-notice.txt", isDir: false }] },
      fragments: [
        { trigger: "read-notice", value: "FLAG{BR34CH_", label: "Breach Notice Read" },
        { trigger: "find-affected", value: "R3SPONS3_", label: "Affected Accounts Found" },
        { trigger: "notify-students", value: "T3AM}", label: "Students Notified — Response Complete!" },
      ],
      extraCommands: {
        "read-notice": () => ({ lines: ["BREACH: QuizApp database hacked. 47 Academy student accounts affected.", "Stolen: emails and hashed passwords.", "Action needed: force password resets and notify students."] }),
        "find-affected": () => ({ lines: ["AFFECTED ACCOUNTS: 47 students identified from QuizApp database.", "Accounts flagged for mandatory password reset."] }),
        "reset-passwords": () => ({ lines: ["✓ 47 accounts flagged — students must create new passwords at next login."] }),
        "notify-students": () => ({ lines: ["✓ 47 students notified by email: 'Your data was in a breach. Please change your password.'", "✓ Breach response complete! Run 'assemble'."] }),
      },
    },
  },

  // ─── BT-28: Safe Browsing ────────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Internet Lab", location: "CyberVille", era: "Today", emoji: "🌐" },
    id: "bt-28",
    order: 28,
    title: "Look Before You Click",
    subtitle: "Safe Browsing — How to Spot Dangerous Links",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-28", name: "Safe Surfer", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "Clicking a bad link is like walking into a stranger's house when they say 'it's totally fine' — look before you step in.",
      year: 2025,
      overview: [
        "Before you cross the street, you look both ways. Before you click a link, you should check where it goes. Many cyberattacks start with a single click on a dangerous link — which can download malware, take you to a phishing site, or steal your information.",
        "Safe browsing habits: hover over links before clicking (your browser shows the real address at the bottom of the screen). Look at the web address carefully — is it really the site you expect? Does it have a lock icon? Avoid clicking links in unexpected emails or messages.",
        "Your browser has built-in protections — Google Safe Browsing warns you about dangerous sites. Never click 'proceed anyway' on a browser security warning without understanding why it's there.",
      ],
      technical: {
        title: "Recognizing Dangerous URLs",
        body: [
          "A legitimate-looking URL can be fake. Common tricks: changing one letter (faceb00k.com instead of facebook.com), adding extra words (paypal-security-update.com instead of paypal.com), or using subdomains deceptively (paypal.evil.com — the real domain is evil.com, not paypal.com).",
          "The domain name is the part right before the first single slash (/). In https://paypal.evil.com/login, the domain is evil.com, not paypal. Learn to read URLs from right to left from the first /.",
        ],
        codeExample: {
          label: "Dangerous vs safe URLs",
          code: `  SAFE:   https://www.paypal.com/login
          ↑ domain is paypal.com ✓

  FAKE:   https://paypal.secure-login.com/
          ↑ domain is secure-login.com ✗

  FAKE:   https://www.paypa1.com/login
          ↑ that's a number 1 not letter l ✗

  SAFE:   https://amazon.com/cart
          ↑ domain is amazon.com ✓

  FAKE:   https://amazon.customer-support.xyz/
          ↑ domain is customer-support.xyz ✗`,
        },
      },
      incident: {
        title: "Operation Aurora — Clicking a Bad Link Led to Google Being Hacked",
        when: "2010",
        where: "Google and 30+ other companies",
        impact: "Source code stolen; major espionage operation uncovered",
        body: [
          "In 2010, employees at Google and 30+ other major companies were targeted with malicious links. When employees clicked the links, malware silently installed itself using a zero-day vulnerability in Internet Explorer. Attackers then moved through the companies' networks stealing valuable information.",
          "Google publicly disclosed the attack and switched to Chrome. The incident led to major improvements in browser security. The lesson: even careful employees at sophisticated companies click bad links.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Suspicious link arrives", sub: "in email or message", type: "attacker" },
          { label: "Hover to check URL", sub: "does it look right?", type: "system" },
          { label: "Recognize fake domain", sub: "it's not the real site", type: "victim" },
          { label: "Don't click! Report it.", sub: "safe browsing wins", type: "result" },
        ],
      },
      timeline: [
        { year: 2006, event: "Google Safe Browsing launched — warns about dangerous sites" },
        { year: 2010, event: "Operation Aurora — drive-by malware via bad links hits Google+", highlight: true },
        { year: 2025, event: "Browsers block billions of malicious pages per day" },
      ],
      keyTakeaways: [
        "Always check where a link goes before clicking — hover to see the real URL",
        "Read the domain carefully: the domain is right before the first /, the rest is sub-folders",
        "Watch for typos and lookalike domains (paypa1.com, amaz0n.com)",
        "Never click 'proceed anyway' on browser security warnings without understanding them",
      ],
      references: [
        { title: "Safe Browsing — Google", url: "https://safebrowsing.google.com/" },
      ],
    },
    ctf: {
      scenario: "5 links were shared in the Academy chat. Some are safe, some are dangerous. Analyze each link and decide: safe or block.",
      hint: "Check each link's domain carefully and categorize it.",
      hints: [
        "List all links. Run: list-links",
        "Analyze link 1. Run: analyze 1",
        "Analyze all links. Run: analyze 2, 3, 4, 5",
        "Block the dangerous ones. Run: block 3 and block 5",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/chat-links.txt": [
          "LINKS SHARED IN ACADEMY CHAT",
          "==============================",
          "1: https://academy.edu/homework",
          "2: https://kryptoscronos.com/learn",
          "3: https://academy-homework.click/login",
          "4: https://wikipedia.org/wiki/cybersecurity",
          "5: https://free-robux-generator.xyz",
          "",
          "Commands: list-links | analyze <n> | block <n> | approve <n>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "chat-links.txt", isDir: false }] },
      fragments: [
        { trigger: "list-links", value: "FLAG{S4F3_", label: "Links Listed" },
        { trigger: "analyze 3", value: "BR0WS1NG_", label: "Fake Domain Identified" },
        { trigger: "block 5", value: "H4B1T}", label: "Dangerous Links Blocked!" },
      ],
      extraCommands: {
        "list-links": () => ({ lines: ["1: academy.edu ✓", "2: kryptoscronos.com ✓", "3: academy-homework.click ← suspicious!", "4: wikipedia.org ✓", "5: free-robux-generator.xyz ← suspicious!", "", "analyze <n> for details"] }),
        analyze: (args) => {
          const n = args[0];
          const analysis: Record<string, string> = {
            "1": "Link 1: academy.edu — official Academy domain. SAFE ✓",
            "2": "Link 2: kryptoscronos.com — known training site. SAFE ✓",
            "3": "Link 3: academy-homework.CLICK — not academy.edu! Fake lookalike domain. DANGEROUS ✗",
            "4": "Link 4: wikipedia.org — encyclopedia. SAFE ✓",
            "5": "Link 5: free-robux-generator.xyz — impossible promise, unknown domain. DANGEROUS ✗",
          };
          return { lines: [analysis[n] || "Unknown link."] };
        },
        block: (args) => {
          const n = args[0];
          if (n === "3") return { lines: ["✓ Link 3 BLOCKED — fake academy domain detected."] };
          if (n === "5") return { lines: ["✓ Link 5 BLOCKED — suspicious domain blocked. Run 'assemble'."] };
          return { lines: [`Link ${n} is safe.`] };
        },
        approve: (args) => {
          const safe = ["1", "2", "4"];
          if (safe.includes(args[0])) return { lines: [`✓ Link ${args[0]} approved — safe domain.`] };
          return { lines: [`Link ${args[0]} is dangerous — block it, don't approve.`] };
        },
      },
    },
  },

  // ─── BT-29: Privacy Settings ─────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "The Academy Privacy Office", location: "CyberVille", era: "Today", emoji: "🕵️" },
    id: "bt-29",
    order: 29,
    title: "Control Who Sees Your Stuff",
    subtitle: "Privacy Settings — Your Digital Footprint",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "bt-badge-29", name: "Privacy Pro", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "Privacy settings let you control who can see your personal information online — because not everything needs to be public.",
      year: 2025,
      overview: [
        "Imagine your diary had a setting: 'Show to: Everyone / Friends Only / Just Me.' You'd probably pick 'Just Me' for your most private thoughts. Social media and apps have similar settings — and many of them default to 'Everyone' when you first sign up.",
        "Your digital footprint is the trail of information you leave online. Every post, every check-in, every photo shared publicly becomes part of that trail. Companies collect this information and can use it to target you with ads — or sell it to others.",
        "Review your privacy settings on every app you use. Set your social media profiles to 'friends only.' Don't share your home address, phone number, or school name publicly. The less strangers know about you, the safer you are.",
      ],
      technical: {
        title: "What Apps Collect About You",
        body: [
          "Many apps collect: your location (even when you're not using the app), contacts, browsing history, microphone access, and camera access. Go to your phone's Settings → Privacy → look at which apps have access to these things. You may be surprised.",
          "You can usually revoke permissions you don't want. A flashlight app shouldn't need access to your contacts. A game shouldn't need your location. When an app asks for permissions it doesn't need, that's a red flag.",
        ],
        codeExample: {
          label: "Privacy settings to check",
          code: `  SOCIAL MEDIA PRIVACY:
  ✓ Profile visibility: Friends only
  ✓ Post default: Friends, not Public
  ✓ Location sharing: Off
  ✓ Tagged photo approval: On

  PHONE APP PERMISSIONS TO REVIEW:
  ✓ Location: Only while using (not always)
  ✓ Microphone: Only for voice/video apps
  ✓ Camera: Only for camera/video apps
  ✓ Contacts: Only for contacts/messaging apps`,
        },
      },
      incident: {
        title: "Cambridge Analytica — 87 Million Profiles Harvested",
        when: "2018",
        where: "Facebook users worldwide",
        impact: "87 million Facebook profiles used without consent for political targeting",
        body: [
          "In 2018, it was revealed that a company called Cambridge Analytica harvested the personal data of 87 million Facebook users — mostly through a quiz app that collected not just your data but also all your friends' data. Users never knew their information was being collected and used for political advertising.",
          "Facebook's default privacy settings were very open at the time. Most users didn't know how to change them or didn't bother. This incident led to major privacy law changes and made people much more aware of privacy settings.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You post something publicly", sub: "anyone can see it forever", type: "attacker" },
          { label: "Companies collect it", sub: "build a profile about you", type: "system" },
          { label: "Privacy settings changed to 'Friends'", sub: "only who you choose sees it", type: "victim" },
          { label: "Your digital footprint shrinks", sub: "you control your data", type: "result" },
        ],
      },
      timeline: [
        { year: 2004, event: "Facebook launches — default settings are very open" },
        { year: 2018, event: "Cambridge Analytica scandal — 87M profiles harvested", highlight: true },
        { year: 2025, event: "GDPR and privacy laws give users more control over their data" },
      ],
      keyTakeaways: [
        "Privacy settings control who can see your information — review them on every app",
        "Many apps default to maximum sharing — you must actively change settings",
        "Your digital footprint is permanent — think before posting publicly",
        "Review app permissions on your phone — remove access you don't need",
      ],
      references: [
        { title: "Consumer Privacy — FTC", url: "https://www.ftc.gov/business-guidance/privacy-security/privacy" },
      ],
    },
    ctf: {
      scenario: "A student's social media account has very open privacy settings. Review and fix each setting to protect their privacy.",
      hint: "Review each setting and fix the ones that are too open.",
      hints: [
        "See current settings. Run: show-settings",
        "Fix profile visibility. Run: set profile friends-only",
        "Fix location sharing. Run: set location off",
        "Fix photo tagging. Run: set photo-approval on",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/privacy-settings.txt": [
          "CURRENT PRIVACY SETTINGS — TOO OPEN!",
          "======================================",
          "Profile visibility: Everyone (PUBLIC!)",
          "Post default:       Everyone (PUBLIC!)",
          "Location sharing:   Always ON",
          "Photo tag approval: OFF (auto-tagged)",
          "",
          "Commands: show-settings | set <setting> <value>",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "privacy-settings.txt", isDir: false }] },
      fragments: [
        { trigger: "show-settings", value: "FLAG{PR1V4CY_", label: "Open Settings Found" },
        { trigger: "set profile friends-only", value: "S3TT1NGS_", label: "Profile Made Private" },
        { trigger: "set photo-approval on", value: "F1X3D}", label: "All Privacy Settings Fixed!" },
      ],
      extraCommands: {
        "show-settings": () => ({ lines: ["Profile: Everyone ✗", "Posts: Everyone ✗", "Location: Always ON ✗", "Photo approval: OFF ✗", "", "All too open! Use: set <setting> <value>"] }),
        set: (args) => {
          const setting = args[0]; const value = args[1];
          if (setting === "profile" && value === "friends-only") return { lines: ["✓ Profile now visible to Friends Only."] };
          if (setting === "post" && value === "friends") return { lines: ["✓ Posts now default to Friends Only."] };
          if (setting === "location" && value === "off") return { lines: ["✓ Location sharing turned OFF."] };
          if (setting === "photo-approval" && value === "on") return { lines: ["✓ Photo tagging requires your approval now. Run 'assemble'."] };
          return { lines: [`Setting ${setting} = ${value} applied.`] };
        },
      },
    },
  },

  // ─── BT-30: Incident Response ────────────────────────────────────────────
  {
    epochId: "first-journey",
    wonder: { name: "Cyber Academy Graduation Hall", location: "CyberVille", era: "Today", emoji: "🎓" },
    id: "bt-30",
    order: 30,
    title: "When Things Go Wrong",
    subtitle: "Incident Response — What to Do When You're Hacked",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "bt-badge-30", name: "Incident Commander", emoji: "🚨" },
    challengeType: "ctf",
    info: {
      tagline: "Even with perfect security, things can go wrong. Knowing what to do when they do is just as important as trying to prevent them.",
      year: 2025,
      overview: [
        "Fire drills exist because sometimes fires happen even when everyone is careful. In cybersecurity, incident response is the plan for what to do when something goes wrong — when you've been hacked, when malware gets in, or when data is stolen. Having a plan makes the response faster and less damaging.",
        "The basic steps of incident response: (1) DETECT — something is wrong. (2) CONTAIN — stop it from spreading. (3) EJECT — remove the attacker or malware. (4) RECOVER — restore normal operations. (5) LEARN — understand what happened and fix the vulnerability.",
        "On a personal level: if you think you've been hacked, immediately change your passwords (starting with email), enable 2FA everywhere, check for unauthorized access, and tell an adult or IT person who can help.",
      ],
      technical: {
        title: "The Incident Response Steps",
        body: [
          "Detect: How did you find out? Alert from your bank, weird behavior on your device, unexpected password reset email. Contain: disconnect compromised devices from the network so the problem can't spread. Change passwords from a different, clean device.",
          "Eject: run malware scans, revoke unauthorized access. Recover: restore from clean backups if needed, update all passwords, enable 2FA. Learn: understand how it happened and patch that hole. Report: tell the right people — school IT, parents, law enforcement if serious.",
        ],
        codeExample: {
          label: "Personal incident response checklist",
          code: `  THINK YOU'VE BEEN HACKED?

  ✓ 1. STAY CALM — panicking makes things worse
  ✓ 2. Change email password FIRST (from a clean device)
  ✓ 3. Change passwords for all important accounts
  ✓ 4. Enable 2FA everywhere you haven't yet
  ✓ 5. Check account activity for unauthorized access
  ✓ 6. Run malware scan on your device
  ✓ 7. Tell a trusted adult / IT department
  ✓ 8. Check haveibeenpwned.com for breach info`,
        },
      },
      incident: {
        title: "Colonial Pipeline Ransomware — Response at Scale",
        when: "May 2021",
        where: "Eastern United States",
        impact: "Largest pipeline in the US shut down for 5 days; fuel shortages across the east coast",
        body: [
          "In May 2021, hackers encrypted the computers of Colonial Pipeline — a company that delivers fuel to much of the eastern United States. The company shut down the entire pipeline to prevent further damage. Gas stations ran out of fuel, flights were disrupted, and people panicked.",
          "The company paid the ransom ($4.4 million in Bitcoin) but also worked with law enforcement who later recovered most of the money. The incident led to new cybersecurity requirements for critical infrastructure. The lesson: incident response planning before an attack makes the response much faster and less damaging.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Incident Detected", sub: "something is wrong!", type: "attacker" },
          { label: "Contain + Eject", sub: "stop it spreading, remove threat", type: "system" },
          { label: "Recover", sub: "restore from backups, reset passwords", type: "victim" },
          { label: "Learn + Improve", sub: "understand and fix the gap", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "First documented computer incident response — the Morris Worm" },
        { year: 2021, event: "Colonial Pipeline ransomware — national emergency declared", highlight: true },
        { year: 2025, event: "All major organizations maintain dedicated incident response teams" },
      ],
      keyTakeaways: [
        "Incident response = the plan for what to do when you're hacked",
        "Steps: Detect → Contain → Eject → Recover → Learn",
        "If you think you're hacked: change email password first, then everything else",
        "Tell a trusted adult or IT person immediately — don't try to handle it alone",
      ],
      references: [
        { title: "NIST Incident Handling Guide", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf" },
      ],
    },
    ctf: {
      scenario: "ALERT! The Academy server has been compromised! Follow the incident response steps to contain, eject, and recover from the attack.",
      hint: "Follow the incident response steps in order.",
      hints: [
        "Detect the problem. Run: detect-incident",
        "Contain it. Run: contain",
        "Eject the attacker. Run: eject",
        "Recover systems. Run: recover",
        "Run 'assemble' to collect your reward, then submit the flag",
      ],
      files: {
        "/ir-playbook.txt": [
          "INCIDENT RESPONSE PLAYBOOK",
          "===========================",
          "ALERT: Unauthorized access detected on Academy server!",
          "",
          "Steps:",
          "1. DETECT  — identify what happened",
          "2. CONTAIN — isolate affected systems",
          "3. EJECT   — remove the attacker",
          "4. RECOVER — restore normal operations",
          "",
          "Commands: detect-incident | contain | eject | recover",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "ir-playbook.txt", isDir: false }] },
      fragments: [
        { trigger: "detect-incident", value: "FLAG{1NC1D3NT_", label: "Incident Detected" },
        { trigger: "contain", value: "R3SP0NS3_", label: "Systems Contained" },
        { trigger: "recover", value: "T34M}", label: "Academy Fully Recovered — Congratulations!" },
      ],
      extraCommands: {
        "detect-incident": () => ({
          lines: [
            "INCIDENT DETECTED:",
            "  Attacker broke in via weak password on admin account",
            "  Currently browsing student records",
            "  Attack started: 12 minutes ago",
            "",
            "Step 1 complete. Run: contain",
          ],
        }),
        contain: () => ({
          lines: [
            "CONTAINMENT:",
            "  ✓ Affected server isolated from network",
            "  ✓ Admin account locked",
            "  ✓ Attack cannot spread to other systems",
            "",
            "Step 2 complete. Run: eject",
          ],
        }),
        eject: () => ({
          lines: [
            "EJECTING ATTACKER:",
            "  ✓ Active session terminated",
            "  ✓ All access tokens revoked",
            "  ✓ Malware scan clean — no persistence found",
            "",
            "Step 3 complete. Run: recover",
          ],
        }),
        recover: () => ({
          lines: [
            "RECOVERY:",
            "  ✓ Admin password reset to strong random password",
            "  ✓ 2FA enabled on all admin accounts",
            "  ✓ Audit log reviewed — no data was exfiltrated",
            "  ✓ Systems back online",
            "  ✓ Vulnerability (weak password) documented and fixed",
            "",
            "INCIDENT CLOSED. Academy is secure again!",
            "",
            "Congratulations, Junior Agent! You've completed all 30 missions.",
            "You are now a Certified Junior Cyber Agent of CyberVille Academy! 🎓",
            "",
            "Run 'assemble' to claim your final reward!",
          ],
        }),
      },
    },
  },
];
