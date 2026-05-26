import type { StageConfig } from "./types";

export const ancientJhsStages: StageConfig[] = [
  // ─── jhs-01: The Three Pillars ────────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "National Archives Building", location: "Washington, D.C.", era: "Present Day", emoji: "🏛️" },
    id: "jhs-01",
    order: 1,
    title: "The Three Pillars",
    subtitle: "CIA Triad — the foundation of every security decision",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-01", name: "Triad Scholar", emoji: "🏛️" },
    challengeType: "quiz",
    info: {
      tagline: "Every cybersecurity decision traces back to three questions: Is it secret? Is it accurate? Is it available?",
      year: 2024,
      overview: [
        "The CIA Triad — Confidentiality, Integrity, and Availability — is the organizing framework behind every cybersecurity control that exists. It was not invented recently; security professionals formalized it in the 1980s as a way to categorize what information systems need to protect. Every attack breaks at least one pillar, and every defense strengthens at least one.",
        "Confidentiality ensures that only authorized individuals can access information. Organizations implement it through encryption, access controls, authentication, and the principle of least privilege (giving people only the access they actually need). A data breach violates Confidentiality — unauthorized parties read data they should not see.",
        "Integrity ensures that information is accurate, complete, and unmodified by unauthorized parties. Digital signatures and cryptographic hash functions allow systems to detect if data has been altered. Availability ensures that systems and data are accessible when needed — organizations address it with redundancy, backups, failover systems, and capacity planning. DDoS attacks are availability attacks, not confidentiality or integrity attacks.",
      ],
      technical: {
        title: "Controls for Each Pillar",
        body: [
          "Confidentiality controls: Encryption (AES-256, TLS), access control lists (ACLs), role-based access control (RBAC), multi-factor authentication, data classification, VPNs. Integrity controls: Cryptographic hashes (SHA-256, MD5), digital signatures, version control, audit logs, input validation. Availability controls: RAID arrays, geographic redundancy, Content Delivery Networks (CDNs), UPS/backup power, DDoS mitigation, incident response plans.",
          "Trade-offs exist between pillars. Heavy encryption strengthens Confidentiality but can reduce Availability if key management fails. Mandatory access controls protect Integrity but add latency. Security architects must balance all three based on the value of the data and the threat model.",
        ],
        codeExample: {
          label: "Verifying Integrity with SHA-256",
          code: `# Generate hash before transfer
sha256sum report.pdf
> a3f1c28d4e9b... report.pdf

# Verify hash after transfer
sha256sum received.pdf
> a3f1c28d4e9b... received.pdf  ← MATCH (intact)
> 9b4d2e1f7a3c... received.pdf  ← MISMATCH (altered!)

# Python version
import hashlib
h = hashlib.sha256(open("file.pdf","rb").read()).hexdigest()`,
        },
      },
      incident: {
        title: "The SolarWinds Supply Chain Attack — All Three Pillars",
        when: "2020 — United States federal agencies and Fortune 500 companies",
        where: "SolarWinds Orion software update infrastructure",
        impact: "Approximately 18,000 organizations downloaded a backdoored software update; attackers maintained access for months undetected",
        body: [
          "The SolarWinds attackers inserted malicious code into a software update that 18,000 organizations downloaded — including multiple US federal agencies. This violated all three pillars: they gained unauthorized access to internal systems (Confidentiality), modified legitimate software (Integrity), and the detection and response effort disrupted government operations for months (Availability).",
          "The attackers were inside networks for up to 9 months before detection. The attack succeeded because organizations trusted a software update without verifying its integrity (no hash checking), used broad access permissions (violating least-privilege), and lacked monitoring for unusual activity. All three CIA pillars failed simultaneously.",
        ],
      },
      diagram: {
        nodes: [
          { label: "SolarWinds Backdoor", sub: "inserted in trusted update", type: "attacker" },
          { label: "18,000 Organizations", sub: "installed compromised software", type: "system" },
          { label: "CIA All Three Broken", sub: "data read, code modified, systems disrupted", type: "victim" },
          { label: "Hash Verification + MFA", sub: "would have reduced impact", type: "result" },
        ],
      },
      timeline: [
        { year: 1987, event: "CIA Triad first formally described in security literature" },
        { year: 1998, event: "NIST adopts CIA Triad as core information security framework" },
        { year: 2013, event: "Target breach violates all three pillars — $290M in settlements" },
        { year: 2020, event: "SolarWinds supply chain attack breaks all three pillars across US government", highlight: true },
        { year: 2024, event: "CIA Triad remains the foundation of every major security certification" },
      ],
      keyTakeaways: [
        "CIA Triad: Confidentiality (secrecy), Integrity (accuracy), Availability (access when needed)",
        "Every attack violates at least one pillar — most serious attacks violate all three",
        "Controls for C: encryption, ACLs, MFA; for I: hashes, signatures, logs; for A: redundancy, backups",
        "Least privilege — giving users only the access they need — protects all three pillars",
      ],
      references: [
        { title: "NIST SP 800-33: Underlying Technical Models for Information Technology Security", url: "https://csrc.nist.gov/publications/detail/sp/800-33/archive/2001-12-21" },
        { title: "CISA: SolarWinds Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-01-q1",
          type: "CIA Triad",
          challenge: `A hospital's ransomware attack encrypts all patient
records. Staff cannot access any files.

Doctors can still examine patients but cannot look
up medical history or prescriptions.

Which pillars are violated?`,
          text: "Ransomware encrypts hospital files — which CIA pillars are violated?",
          options: [
            "Availability only — data is locked but not read or changed",
            "Confidentiality and Availability — data is hidden and inaccessible",
            "All three — attackers typically exfiltrate data, the encryption modifies files, and access is denied",
            "Integrity only — the files were changed by encryption",
          ],
          correctIndex: 2,
          explanation: "Modern ransomware typically exfiltrates data before encrypting it (breaking Confidentiality), encrypts the files (altering them — breaking Integrity), and makes them inaccessible (breaking Availability). This triple-breach is why ransomware is so devastating.",
        },
        {
          id: "jhs-01-q2",
          type: "Least Privilege",
          challenge: `A marketing employee needs to update the company blog.
The IT administrator gives them full database access
instead of just blog editing rights.

What security principle is being violated?`,
          text: "Giving a blog editor full database access violates which principle?",
          options: [
            "Availability — too many people have access means the system might go down",
            "Least privilege — users should only receive the minimum access needed for their job",
            "Integrity — the database might be corrupted by an untrained user",
            "Non-repudiation — actions cannot be traced",
          ],
          correctIndex: 1,
          explanation: "Least privilege means giving users exactly the access they need — no more. A marketing employee needs blog editing rights, not full database access. Excessive permissions are a major risk: if the employee's account is compromised, the attacker inherits all those permissions.",
        },
        {
          id: "jhs-01-q3",
          type: "Integrity Check",
          challenge: `You download a software update from a vendor's website.
The website shows the SHA-256 hash for the file.
After downloading, you calculate the hash yourself.

  Expected: a3f1c28d4e9b7f2a
  Calculated: 9b4d2e1f7a3c6d8e

What does this mean?`,
          text: "The downloaded file's hash does not match the expected hash. What happened?",
          options: [
            "The file is safe — hash values change between computers",
            "The file was altered or corrupted — do not install it",
            "The hash algorithm is outdated and should be ignored",
            "The mismatch is normal for large files",
          ],
          correctIndex: 1,
          explanation: "SHA-256 hash values are deterministic — the same file always produces the same hash. A mismatch means the file you downloaded is different from the original. It could have been intercepted and modified, or corrupted during download. Either way, do not install it.",
        },
        {
          id: "jhs-01-q4",
          type: "Defense Strategy",
          challenge: `A company stores customer credit card numbers.
They want to protect this data.

Which combination of controls addresses all
three CIA pillars?`,
          text: "Which set of controls addresses Confidentiality, Integrity, AND Availability?",
          options: [
            "Strong passwords only",
            "Encrypt the data (C), log all changes with digital signatures (I), and maintain daily backups (A)",
            "Hire more security staff to monitor the servers",
            "Require multi-factor authentication for all logins",
          ],
          correctIndex: 1,
          explanation: "Encryption protects Confidentiality (unauthorized parties cannot read the data). Digital signatures and logs protect Integrity (unauthorized changes are detected). Daily backups protect Availability (data can be restored if lost). MFA alone only addresses Confidentiality.",
        },
      ],
    },
  },

  // ─── jhs-02: The Manipulation Playbook ───────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "Carnegie Mellon CERT Coordination Center", location: "Pittsburgh, Pennsylvania", era: "Present Day", emoji: "🎭" },
    id: "jhs-02",
    order: 2,
    title: "The Manipulation Playbook",
    subtitle: "How social engineers exploit trust instead of technology",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-02", name: "Manipulation Detector", emoji: "🎭" },
    challengeType: "quiz",
    info: {
      tagline: "The most sophisticated technical system can be bypassed if an attacker can simply trick a human into giving them access.",
      year: 2024,
      overview: [
        "Social engineering is the art of manipulating people into divulging information or taking actions that compromise security. It exploits human psychology rather than technical vulnerabilities — trust, fear, urgency, helpfulness, and authority. Studies show that over 90% of successful cyberattacks involve some element of social engineering.",
        "The most common form is phishing — fraudulent emails, texts, or calls designed to look like they are from a trusted source. But social engineering goes deeper: pretexting (creating a false scenario to extract information), baiting (leaving infected USB drives for curious people to plug in), quid pro quo (offering something in exchange for access), and vishing (voice phishing calls) are all common techniques.",
        "Spear phishing is the targeted version of phishing. Instead of sending the same generic email to millions of people, spear phishers research a specific target — reading their LinkedIn, their company website, their social media — and craft a highly personalized message that is much harder to recognize as fake.",
      ],
      technical: {
        title: "Social Engineering Techniques",
        body: [
          "Pretexting: creating a fake but plausible story to gain trust. Example — 'Hi, I'm from IT support, I need your password to fix your account.' Real IT never asks for passwords. Baiting: leaving a USB drive labeled 'Salary Information 2024' in a parking lot. A curious employee plugs it in. The drive installs malware. Quid pro quo: 'I'll give you a free gift card if you take this quick survey' — then the survey collects login credentials.",
          "Recognition: Social engineers create urgency ('You must act NOW'), appeal to authority ('This is the CEO'), exploit helpfulness ('I just need five minutes of your time'), or create fear ('Your account will be suspended'). When you feel rushed, pressured, or unusually helpful toward a stranger asking for access — pause. That feeling is the attack.",
        ],
        codeExample: {
          label: "Spear Phishing vs. Generic Phishing",
          code: `GENERIC PHISHING (sent to millions):
  "Dear Customer, your account has been compromised.
   Click here to verify: bit.ly/verify-now"

SPEAR PHISHING (researched target):
  "Hi Alex, I saw your post on LinkedIn about
   the Henderson project. Quick question about
   the Q4 budget spreadsheet — can you open
   this updated version? [malicious attachment]
                           — Mike (Accounting)"

The spear phish uses your real name, a real project,
and a plausible sender to bypass your skepticism.`,
        },
      },
      incident: {
        title: "The Twitter Bitcoin Hack — Social Engineering at Scale",
        when: "July 15, 2020 — Twitter HQ",
        where: "Twitter's internal admin tools",
        impact: "High-profile accounts (Obama, Biden, Musk, Apple) hijacked; $120,000 in Bitcoin stolen from followers",
        body: [
          "Attackers called Twitter employees over the phone, impersonating IT support staff. Using information gathered from LinkedIn and social media, they convinced employees to give them credentials for Twitter's internal admin tools. No technical exploit was needed — just phone calls and social manipulation.",
          "The attackers then took over verified accounts including Barack Obama, Joe Biden, Elon Musk, and Apple, posting Bitcoin scam messages. Over $120,000 was sent to the attackers before Twitter shut down verified account tweeting entirely. Three teenagers were arrested. The entire attack was social engineering, not a technical hack.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker Researches Target", sub: "LinkedIn, social media, news", type: "attacker" },
          { label: "Crafts Believable Story", sub: "pretexting + impersonation", type: "system" },
          { label: "Employee Provides Access", sub: "trusting the fake authority", type: "victim" },
          { label: "Verify Before You Trust", sub: "call back on known numbers", type: "result" },
        ],
      },
      timeline: [
        { year: 1984, event: "Kevin Mitnick begins using social engineering to access corporate systems" },
        { year: 2013, event: "AP Twitter account hacked via social engineering — briefly crashes stock market" },
        { year: 2020, event: "Twitter VIP accounts hijacked via phone-based social engineering of employees", highlight: true },
        { year: 2023, event: "MGM Resorts $100M attack begins with a 10-minute phone call to IT help desk" },
      ],
      keyTakeaways: [
        "Over 90% of cyberattacks involve social engineering at some point",
        "Key techniques: phishing, spear phishing, pretexting, baiting, vishing, quid pro quo",
        "Warning triggers: urgency, authority, fear, unusual helpfulness requests",
        "Defense: slow down, verify identity through a separate channel, never give passwords to 'IT support'",
      ],
      references: [
        { title: "CISA: Social Engineering and Phishing Attacks", url: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks" },
        { title: "MIT Technology Review: The Twitter Hack", url: "https://www.technologyreview.com/2020/08/05/1006129/hackers-behind-twitter-attack-say-its-easy-to-buy-access-to-social-media-accounts/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-02-q1",
          type: "Technique ID",
          challenge: `Someone leaves USB drives labeled
"Final Exam Answers 2024" outside a school.

Several students pick them up and plug them
into school computers.

What social engineering technique is this?`,
          text: "Leaving labeled USB drives for curious people to pick up is which technique?",
          options: [
            "Phishing — the attacker sent a deceptive message",
            "Pretexting — the attacker created a fake scenario",
            "Baiting — the attacker used curiosity to get someone to execute the payload",
            "Vishing — the attacker used a phone call",
          ],
          correctIndex: 2,
          explanation: "Baiting exploits curiosity or greed by leaving something tempting (a USB drive, a free download, a prize). The moment the victim picks it up and plugs it in, the attack succeeds — no phishing email needed.",
        },
        {
          id: "jhs-02-q2",
          type: "Spear Phishing",
          challenge: `You get an email from your project partner:
"Hey! Check out this updated version of our
 science project. I added the graphs you asked
 for: [project_final_v3.docx.exe]"

Your project partner sits next to you in class.
What should you do?`,
          text: "Your classmate apparently sent you a project file. What do you do?",
          options: [
            "Download and open it — it is from your project partner",
            "Do not open the attachment — verify in person first, and notice the .exe extension on a .docx file",
            "Open it but only if your antivirus allows it",
            "Download it but rename the .exe extension first",
          ],
          correctIndex: 1,
          explanation: "Two red flags: (1) Real Word documents end in .docx, not .docx.exe — the .exe makes it an executable program, not a document. (2) Your partner's account may have been compromised. Always verify unexpected files in person, especially if they have unusual file extensions.",
        },
        {
          id: "jhs-02-q3",
          type: "Pretexting",
          challenge: `A caller says: "Hi, this is Mike from your school's
IT department. We detected suspicious activity on your
account and need your password to investigate.
This is urgent — we need it in the next five minutes."

What is the right response?`,
          text: "IT support calls asking for your password to investigate suspicious activity. What do you do?",
          options: [
            "Give the password — IT support has legitimate reasons to ask",
            "Give the password but change it right after",
            "Do not give the password — legitimate IT never asks for it; verify by calling IT back on the school's official number",
            "Give the password if they can tell you the last time you logged in",
          ],
          correctIndex: 2,
          explanation: "Legitimate IT support does not need your password to investigate your account — they have admin tools. The urgency and time pressure are classic social engineering tactics. Hang up, look up the school's IT number independently, and call back to verify.",
        },
        {
          id: "jhs-02-q4",
          type: "Defense",
          challenge: `Which behavior makes someone MOST resistant
to social engineering attacks?`,
          text: "Which habit makes you most resistant to social engineering?",
          options: [
            "Using a very strong password",
            "Having antivirus software installed",
            "Slowing down when you feel rushed or pressured, and verifying requests through independent channels",
            "Never using email",
          ],
          correctIndex: 2,
          explanation: "Social engineering targets your emotions — urgency, fear, authority. The most powerful defense is recognizing when you feel those emotions and deliberately slowing down. Verify urgent requests by independently contacting the requester through official channels, not by replying to the suspicious message.",
        },
      ],
    },
  },

  // ─── jhs-03: Under the Hood — Passwords ──────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "MIT Computer Science Lab", location: "Cambridge, Massachusetts", era: "Present Day", emoji: "💻" },
    id: "jhs-03",
    order: 3,
    title: "Under the Hood — Passwords",
    subtitle: "How websites actually store your password (and what happens when they fail)",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-03", name: "Hash Detective", emoji: "🔏" },
    challengeType: "quiz",
    info: {
      tagline: "Websites never store your actual password — they store a scrambled fingerprint of it. Here is why that matters.",
      year: 2024,
      overview: [
        "When you create a password for a website, the site does not store the word you typed. Instead, it runs your password through a one-way mathematical function called a hash function. The hash function turns your password into a fixed-length string of letters and numbers — completely unrecognizable from the original. This scrambled version is what gets stored in the database.",
        "When you log in, the site hashes what you typed and compares it to the stored hash. If they match, you are in. The original password is never stored anywhere. This means that even if attackers steal the database, they only get the hashes — not the actual passwords. To crack them, they would need to guess or compute billions of combinations.",
        "But there is a catch: bad password storage practices make hashes crackable. Storing passwords without a 'salt' (a random piece of data added before hashing) allows attackers to use precomputed tables of hash values to reverse them in seconds. That is how 6.5 million LinkedIn passwords were cracked in 2012 — they were hashed but not salted.",
      ],
      technical: {
        title: "Hashing, Salting, and Password Cracking",
        body: [
          "A hash function is one-way: easy to compute forward, computationally impossible to reverse. SHA-256('password') always produces the same hash, but you cannot work backward from the hash to recover 'password'. However, if you know common passwords, you can precompute their hashes — this is a rainbow table attack.",
          "Salting defeats rainbow tables: before hashing, a random string (the salt) is added to the password. SHA-256('password' + 'xK9q') produces a completely different hash than SHA-256('password' + 'mJ2r'). Since each user gets a unique salt, precomputed rainbow tables are useless. Modern password hashing uses bcrypt, scrypt, or Argon2 — slow-by-design algorithms that make brute-force attacks expensive.",
        ],
        codeExample: {
          label: "Hash vs. Salted Hash",
          code: `# Same password, no salt → same hash every time
SHA256("password") = "5e884898da28..."
SHA256("password") = "5e884898da28..."  ← identical!
# Attacker: just look up "5e884898da28..." in rainbow table

# Same password, with unique salt → unique hash each time
SHA256("password" + "xK9q7!") = "a3f1c28d4e9b..."
SHA256("password" + "mJ2r#9") = "9b4d2e1f7a3c..."
# Attacker: cannot use precomputed tables — must crack each one`,
        },
      },
      incident: {
        title: "The LinkedIn Hack — 117 Million Unsalted Hashes",
        when: "2012 (breach) / 2016 (full scope revealed)",
        where: "LinkedIn's password database",
        impact: "117 million user passwords exposed; most cracked within days because they were hashed without salt",
        body: [
          "In 2012, attackers stole 6.5 million password hashes from LinkedIn (later revealed to be 117 million). LinkedIn had used SHA-1 to hash passwords — but critically, without salting. Within days, over 90% of the stolen hashes had been cracked using rainbow tables and GPU-powered brute force.",
          "The cracked passwords revealed that millions of users had chosen predictable passwords: '123456', 'linkedin', 'password'. But even strong passwords without salting could be cracked faster than expected. LinkedIn later switched to bcrypt with salting — a change that should have been implemented from the start.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your Password", sub: "typed at login", type: "attacker" },
          { label: "Hash Function + Salt", sub: "one-way transformation", type: "system" },
          { label: "Stored Hash", sub: "unreadable without attack", type: "victim" },
          { label: "bcrypt/Argon2 + Salt", sub: "best practice storage", type: "result" },
        ],
      },
      timeline: [
        { year: 1976, event: "crypt() password hashing introduced in Unix — first widespread password hashing" },
        { year: 2012, event: "LinkedIn: 117 million unsalted SHA-1 hashes stolen and cracked", highlight: true },
        { year: 2013, event: "Adobe: 153 million poorly encrypted (not hashed) passwords exposed" },
        { year: 2017, event: "National Institute of Standards and Technology mandates salted hashing in NIST SP 800-63" },
        { year: 2024, event: "Argon2 (winner of Password Hashing Competition) is now the recommended standard" },
      ],
      keyTakeaways: [
        "Websites store password hashes, not plain passwords — a one-way transformation",
        "Without salting, identical passwords produce identical hashes — vulnerable to rainbow table attacks",
        "Salting adds a unique random string before hashing, defeating precomputed attack tables",
        "Best practice: bcrypt, scrypt, or Argon2 with unique salts — slow by design to resist brute force",
      ],
      references: [
        { title: "OWASP: Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" },
        { title: "Have I Been Pwned — LinkedIn", url: "https://haveibeenpwned.com/PwnedWebsites#LinkedIn" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-03-q1",
          type: "Hashing Basics",
          challenge: `When you create an account and set your password,
what does the website typically store in its database?`,
          text: "What does a website store when you set your password?",
          options: [
            "Your exact password in plain text",
            "Your password encrypted with AES — reversible with a key",
            "A hash of your password — a one-way transformation that cannot be reversed",
            "Nothing — passwords are verified only at the time of creation",
          ],
          correctIndex: 2,
          explanation: "Good websites store a hash of your password, not the password itself. When you log in, they hash what you typed and compare it to the stored hash. The original password is never stored anywhere, so even if the database is stolen, attackers only get hashes.",
        },
        {
          id: "jhs-03-q2",
          type: "Rainbow Tables",
          challenge: `An attacker has stolen a database of unsalted
SHA-1 password hashes. They already know that
SHA-1("password") = "5baa61e4c..."

Why is this dangerous for users who picked
common passwords?`,
          text: "Why are unsalted hashes vulnerable to rainbow table attacks?",
          options: [
            "They are not vulnerable — hashes cannot be reversed",
            "SHA-1 is a weak algorithm that can be reversed directly",
            "Without salt, the same password always produces the same hash — attackers can precompute a table of common password hashes and look them up instantly",
            "Rainbow tables only work if the attacker knows the username",
          ],
          correctIndex: 2,
          explanation: "Without salting, SHA-1('password') always produces the same hash. Attackers precompute hashes for millions of common passwords (a rainbow table) and look up stolen hashes in that table — finding matches in microseconds. Salting prevents this because each password gets a unique salt, making precomputed tables useless.",
        },
        {
          id: "jhs-03-q3",
          type: "Salting",
          challenge: `Two users both choose the password "hunter2".
The database stores these hashes:

  User A: bcrypt("hunter2" + "xK9q7!") = "a3f1c28..."
  User B: bcrypt("hunter2" + "mJ2r#9") = "9b4d2e1..."

The hashes are different even though the passwords
are the same. Why?`,
          text: "Why do identical passwords produce different hashes when salting is used?",
          options: [
            "The hash function is random — it produces different results each time",
            "bcrypt is bidirectional and uses the username to modify the output",
            "A unique random salt (xK9q7! and mJ2r#9) was added to each password before hashing, making the input different",
            "The timestamps of account creation are included in the hash",
          ],
          correctIndex: 2,
          explanation: "Each user gets a unique random salt that is stored alongside their hash. Before hashing, the salt is appended to the password, making the inputs different even when passwords match. This means an attacker who cracks one hash learns nothing about other users who chose the same password.",
        },
        {
          id: "jhs-03-q4",
          type: "Best Practice",
          challenge: `A startup is building a login system.
Which password storage approach is most secure?`,
          text: "Which password storage method is the current best practice?",
          options: [
            "AES-256 encryption — strong and reversible if needed",
            "MD5 hash without salt — fast and efficient",
            "SHA-256 hash with a unique salt per user",
            "Argon2 hash with a unique salt per user — designed to be slow and memory-intensive to resist brute force",
          ],
          correctIndex: 3,
          explanation: "Argon2 (winner of the Password Hashing Competition) is designed to be intentionally slow and memory-intensive, making brute-force attacks computationally expensive. Combined with unique per-user salts, it is the current best practice. MD5 and SHA-256 are too fast for this purpose — attackers can test billions of guesses per second. AES is reversible, which means a stolen key exposes all passwords.",
        },
      ],
    },
  },

  // ─── jhs-04: The Threat Landscape ────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "Cybersecurity & Infrastructure Security Agency HQ", location: "Arlington, Virginia", era: "Present Day", emoji: "🏢" },
    id: "jhs-04",
    order: 4,
    title: "The Threat Landscape",
    subtitle: "Viruses, worms, ransomware, and the malware that powers modern attacks",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-04", name: "Threat Mapper", emoji: "🦠" },
    challengeType: "quiz",
    info: {
      tagline: "Malware is not one thing — it is a whole ecosystem of tools, each designed for a different malicious purpose.",
      year: 2024,
      overview: [
        "Malware — short for malicious software — is any program designed to harm, exploit, or gain unauthorized access to a computer system. It is not a single thing; it is a category containing dozens of distinct types, each designed for different attack goals. Understanding the differences is the first step to understanding how defenses work.",
        "The classic types: a virus attaches itself to legitimate programs and spreads when those programs run. A worm spreads on its own across networks without needing to attach to a host program. A Trojan horse looks like legitimate software but contains a hidden malicious payload. Ransomware encrypts a victim's files and demands payment for the decryption key. Spyware silently records what you do — keystrokes, screenshots, webcam footage.",
        "Today, attackers combine these into sophisticated attack chains. A phishing email might deliver a Trojan that installs a backdoor, which is used to deploy ransomware across an entire network days or weeks later. Understanding each component helps security analysts identify and interrupt the attack at the right stage.",
      ],
      technical: {
        title: "Malware Types and Their Goals",
        body: [
          "Virus: attaches to legitimate files; spreads when the file is run. Goal: infection and damage. Worm: self-replicating across networks; no host file needed. Goal: rapid spread, can carry payloads. Trojan horse: disguised as useful software. Goal: initial access, backdoor installation. Rootkit: hides deep in the OS; makes other malware invisible. Goal: persistent access. Ransomware: encrypts files; demands payment. Goal: financial extortion. Spyware/Keylogger: records user activity. Goal: credential theft, espionage. Botnet: network of infected machines controlled remotely. Goal: DDoS attacks, spam, cryptocurrency mining.",
          "Command and Control (C2) is the channel attackers use to communicate with compromised systems. Modern malware 'phones home' to a C2 server to receive instructions, upload stolen data, and download additional payloads. Security teams hunt for unusual outbound connections as a way to detect infected machines.",
        ],
        codeExample: {
          label: "Malware Attack Chain Example",
          code: `Step 1: Delivery
  Phishing email → victim opens malicious .docx
  → macro runs → downloads Trojan dropper

Step 2: Execution
  Trojan installs → creates persistence
  (registry key, scheduled task)
  → connects to C2 server

Step 3: Lateral Movement
  Attacker explores network
  → steals credentials → moves to new machines

Step 4: Action on Objectives
  Data exfiltration OR
  Ransomware deployment across entire network`,
        },
      },
      incident: {
        title: "WannaCry — A Worm That Shut Down Hospitals",
        when: "May 12, 2017 — Global",
        where: "150 countries; NHS (UK National Health Service) severely impacted",
        impact: "300,000 computers in 150 countries encrypted; UK hospitals canceled appointments and operations",
        body: [
          "WannaCry was ransomware that spread as a worm using EternalBlue — an NSA exploit leaked by the Shadow Brokers group — to spread automatically across networks without any user interaction. It attacked a vulnerability in Windows SMB (file sharing). Organizations that had not applied a patch released two months earlier were infected within minutes of the worm reaching their network.",
          "The UK's National Health Service was hit especially hard: X-ray machines, patient records, and surgery scheduling systems were encrypted. Approximately 19,000 appointments were canceled, including urgent surgeries. The total global damage exceeded $4 billion. A 22-year-old security researcher accidentally stopped the spread by registering a domain name embedded in the worm's code that acted as a 'kill switch'.",
        ],
      },
      diagram: {
        nodes: [
          { label: "WannaCry Worm", sub: "exploits SMB vulnerability", type: "attacker" },
          { label: "Unpatched Windows", sub: "spreads automatically", type: "system" },
          { label: "Files Encrypted", sub: "$300-600 ransom per machine", type: "victim" },
          { label: "Patch Management", sub: "update systems within days of patches", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "Morris Worm — first major internet worm infects ~6,000 computers" },
        { year: 2003, event: "Blaster Worm infects millions of Windows XP machines within days" },
        { year: 2017, event: "WannaCry ransomware worm encrypts 300,000+ computers globally", highlight: true },
        { year: 2017, event: "NotPetya (similar to WannaCry) causes $10 billion in damages — most costly cyberattack ever" },
        { year: 2024, event: "Ransomware-as-a-Service (RaaS) makes ransomware attacks available to anyone willing to pay" },
      ],
      keyTakeaways: [
        "Malware is a category: viruses, worms, Trojans, ransomware, spyware, rootkits, botnets",
        "Worms spread automatically without user action; viruses need someone to run the infected file",
        "Modern attacks chain multiple types: Trojan → backdoor → lateral movement → ransomware",
        "Patch management (keeping systems updated) is the single most effective defense against worms like WannaCry",
      ],
      references: [
        { title: "CISA: Understanding Ransomware", url: "https://www.cisa.gov/stopransomware/ransomware-guide" },
        { title: "Wired: The WannaCry Ransomware Attack", url: "https://www.wired.com/story/wanna-cry-ransomware-attack-is-still-teaching-us-about-our-security-habits/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-04-q1",
          type: "Malware Types",
          challenge: `A piece of malware spreads across a hospital's
network by exploiting a vulnerability in file
sharing software. No user clicked anything —
it infected 400 machines automatically.

What type of malware is this?`,
          text: "Malware that spreads across a network automatically without user action is a:",
          options: [
            "Virus — it infects by attaching to files",
            "Worm — self-replicating across networks without a host file",
            "Trojan — disguised as legitimate software",
            "Spyware — silently recording activity",
          ],
          correctIndex: 1,
          explanation: "Worms are self-replicating and spread across networks automatically by exploiting vulnerabilities — no user action required. This is what made WannaCry so dangerous: it spread from machine to machine as fast as the network allowed.",
        },
        {
          id: "jhs-04-q2",
          type: "Attack Chain",
          challenge: `A user receives an email with an attached
invoice (Invoice_2024.pdf.exe).
They open it — their machine connects to an
unknown server in Eastern Europe.
Two weeks later, all files on the company
network are encrypted.

What attack chain happened here?`,
          text: "An email attachment leads to full network encryption two weeks later. What type of attack is this?",
          options: [
            "A virus that immediately encrypts files on execution",
            "A phishing email delivering a Trojan, establishing C2 access, followed by ransomware deployment",
            "A worm that spread automatically from the email server",
            "A keylogger that captured login credentials for the file server",
          ],
          correctIndex: 1,
          explanation: "This is a multi-stage attack: phishing email (delivery) → Trojan/malware (execution and C2 connection) → reconnaissance and lateral movement (two weeks) → ransomware deployment. The delay is intentional — attackers want to spread widely before triggering the ransomware so backups are also compromised.",
        },
        {
          id: "jhs-04-q3",
          type: "Ransomware",
          challenge: `A company's files are encrypted by ransomware.
The ransom note demands $500,000 in Bitcoin.

The company has backups from 3 days ago.

What is generally the recommended response?`,
          text: "A company has 3-day-old backups and receives a ransomware demand. What should they do?",
          options: [
            "Pay the ransom — it is the fastest way to recover",
            "Restore from backups and do NOT pay — paying funds criminal operations and does not guarantee file recovery",
            "Negotiate the ransom down before paying",
            "Pay but also restore from backups to save time",
          ],
          correctIndex: 1,
          explanation: "Law enforcement agencies and security experts recommend NOT paying ransoms. Payment funds criminal organizations, does not guarantee decryption keys work, and marks the victim as a future target. Restoring from clean backups is the proper recovery path — which is exactly why attackers try to destroy backups before encrypting.",
        },
        {
          id: "jhs-04-q4",
          type: "Defense",
          challenge: `Which set of defenses would have best
protected against WannaCry?`,
          text: "Which defenses would have most effectively stopped WannaCry?",
          options: [
            "A strong firewall and antivirus software",
            "Applying the MS17-010 patch (released two months before the attack) and disabling unused SMBv1",
            "Two-factor authentication on all accounts",
            "Encrypted hard drives on all workstations",
          ],
          correctIndex: 1,
          explanation: "WannaCry exploited a specific vulnerability (EternalBlue/MS17-010) that Microsoft had patched two months before the attack. Organizations that applied that patch were immune. Disabling SMBv1 (an old, insecure file-sharing protocol) also blocked the attack vector. Firewalls and antivirus helped but were not the decisive factor.",
        },
      ],
    },
  },

  // ─── jhs-05: The Web's Hidden Language ───────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "CERN — Where the Web Was Born", location: "Geneva, Switzerland", era: "Present Day", emoji: "🌐" },
    id: "jhs-05",
    order: 5,
    title: "The Web's Hidden Language",
    subtitle: "HTTP, HTTPS, and why the 'S' is not just a letter",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-05", name: "Protocol Reader", emoji: "📡" },
    challengeType: "quiz",
    info: {
      tagline: "Every time you load a webpage, an invisible conversation happens — and HTTP or HTTPS determines whether that conversation is private.",
      year: 2024,
      overview: [
        "When your browser loads a webpage, it sends and receives data using a protocol — a set of rules for how that communication works. HTTP (HyperText Transfer Protocol) is the foundational protocol of the web. But HTTP sends everything in plain text, meaning anyone in a position to intercept the connection — a hacker on the same Wi-Fi network, your ISP, a government — can read it.",
        "HTTPS (HTTP Secure) adds a layer of encryption using TLS (Transport Layer Security). When you connect to an HTTPS website, your browser and the server perform a handshake that establishes an encrypted channel. All data — your login credentials, your search queries, your messages — is encrypted before it leaves your device and decrypted only at the server.",
        "The padlock in your browser is the visible indicator of an HTTPS connection. But the padlock only tells you the connection is encrypted — it does NOT tell you the website is legitimate. A phishing site can have a valid HTTPS certificate. The certificate proves the server is who it claims to be in the certificate, not that it is trustworthy.",
      ],
      technical: {
        title: "TLS Handshake and Certificate Validation",
        body: [
          "The TLS handshake establishes an encrypted session: (1) Client sends 'ClientHello' with supported encryption algorithms. (2) Server responds with its TLS certificate containing its public key. (3) Client verifies the certificate is signed by a trusted Certificate Authority (CA). (4) Keys are exchanged; the session is now encrypted. This happens in milliseconds before any page data is sent.",
          "TLS certificates contain: the domain name, the certificate owner, the issuing CA, and an expiration date. Your browser has a built-in list of trusted CAs (like DigiCert, Let's Encrypt, GlobalSign). If the server's certificate is not signed by a trusted CA, your browser shows a security warning. Certificate errors should never be ignored.",
        ],
        codeExample: {
          label: "HTTP vs. HTTPS Traffic",
          code: `HTTP (plain text — anyone can read this):
  GET /login HTTP/1.1
  Host: bank.com

  POST /login HTTP/1.1
  username=alice&password=MyP@ssword123
  ← VISIBLE to anyone on the network ←

HTTPS (encrypted — looks like this):
  3a 8f 2c 1b 9d 4e 7f 0a b2 5c 6d 3e...
  ← scrambled; decryptable only by server ←`,
        },
      },
      incident: {
        title: "The Hotel Wi-Fi Credential Theft",
        when: "2014-2015 — Reported by FireEye",
        where: "Hotel Wi-Fi networks across Asia and Europe",
        impact: "Executives' credentials and files stolen via man-in-the-middle attacks on unencrypted hotel Wi-Fi",
        body: [
          "Security researchers documented a campaign targeting business travelers at luxury hotels across Asia and Europe. When guests connected to hotel Wi-Fi and visited HTTP (unencrypted) sites, attackers on the same network intercepted and read their traffic — including usernames, passwords, and sensitive documents. The attack is called a 'man-in-the-middle' (MITM) attack.",
          "The fix is straightforward: HTTPS-only traffic cannot be read by MITM attackers even on compromised networks. This attack was effective specifically because corporate intranets and older business applications often used HTTP. The lesson: always use HTTPS — and be especially careful on public Wi-Fi.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Public Wi-Fi Attacker", sub: "intercepts all HTTP traffic", type: "attacker" },
          { label: "HTTP Connection", sub: "plaintext, readable", type: "system" },
          { label: "Credentials Stolen", sub: "passwords, session tokens", type: "victim" },
          { label: "HTTPS Always", sub: "encrypted end-to-end", type: "result" },
        ],
      },
      timeline: [
        { year: 1991, event: "HTTP 0.9 invented by Tim Berners-Lee at CERN" },
        { year: 1994, event: "HTTPS invented by Netscape for secure online commerce" },
        { year: 2014, event: "Google begins ranking HTTPS sites higher than HTTP sites" },
        { year: 2018, event: "Google Chrome marks all HTTP sites as 'Not Secure'", highlight: true },
        { year: 2024, event: "Over 95% of all web traffic is encrypted with HTTPS" },
      ],
      keyTakeaways: [
        "HTTP sends data in plain text — anyone on the network can read it",
        "HTTPS uses TLS to encrypt data end-to-end — interceptors see only scrambled bytes",
        "The padlock confirms encryption — it does NOT confirm the site is legitimate",
        "On public Wi-Fi, HTTP connections are especially dangerous — use HTTPS-only or a VPN",
      ],
      references: [
        { title: "Mozilla: What is HTTPS?", url: "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS" },
        { title: "CISA: Security Tip — Using Caution with Wi-Fi Hotspots", url: "https://www.cisa.gov/news-events/news/security-tip-st05-003-using-caution-wi-fi-hotspots" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-05-q1",
          type: "HTTP vs HTTPS",
          challenge: `You log into a forum on a coffee shop's
public Wi-Fi. The site uses HTTP.

Can someone else on the Wi-Fi read your password?`,
          text: "You log in over HTTP on public Wi-Fi. Can someone on the same network see your password?",
          options: [
            "No — Wi-Fi passwords protect all traffic from being read",
            "Yes — HTTP sends data in plain text; a man-in-the-middle attacker can read your credentials",
            "Only if they have special hacking tools",
            "No — your browser encrypts passwords automatically before sending them",
          ],
          correctIndex: 1,
          explanation: "HTTP sends everything as plain text. On a shared Wi-Fi network, any device on the network can potentially capture and read all unencrypted traffic. A man-in-the-middle attack requires no special setup — just a laptop and free software. Always use HTTPS for anything requiring a login.",
        },
        {
          id: "jhs-05-q2",
          type: "Padlock Meaning",
          challenge: `You see a padlock in your browser.

Which of these does the padlock GUARANTEE?`,
          text: "What does a padlock icon in your browser guarantee?",
          options: [
            "The website is legitimate and safe",
            "The website is owned by a reputable company",
            "The connection between your browser and the server is encrypted",
            "The website has been audited for security vulnerabilities",
          ],
          correctIndex: 2,
          explanation: "The padlock only means the connection is encrypted — data in transit cannot be read by third parties. It does NOT guarantee the website is legitimate. Phishing sites can and do use HTTPS certificates. Always verify the website's URL in addition to checking for the padlock.",
        },
        {
          id: "jhs-05-q3",
          type: "TLS Certificate",
          challenge: `Your browser shows a warning:
"Your connection is not private — the site's
 certificate was issued by an untrusted authority."

What should you do?`,
          text: "Your browser shows a TLS certificate warning. What is the correct action?",
          options: [
            "Click 'Advanced' and proceed anyway — it is usually just a minor technical issue",
            "Stop and do not continue — a certificate error may indicate an attack or misconfigured site",
            "It is fine as long as you are not entering a password",
            "Refresh the page once — if the warning appears again it is safe to ignore",
          ],
          correctIndex: 1,
          explanation: "Certificate errors can indicate a man-in-the-middle attack (an attacker intercepting your connection) or a misconfigured server. Either way, proceeding is risky. Do not enter any information on a site showing a certificate error. Contact the site through another channel to report the issue.",
        },
        {
          id: "jhs-05-q4",
          type: "Best Practice",
          challenge: `You are working at a coffee shop and need to
access your company's internal web application.
The application uses HTTP.

What is the most secure approach?`,
          text: "You need to use an HTTP internal app on public Wi-Fi. What is the safest approach?",
          options: [
            "Use the app normally — company internal apps are safe",
            "Use your phone's cellular data instead of the coffee shop Wi-Fi",
            "Ask IT to upgrade the app to HTTPS, and use a VPN on public Wi-Fi in the meantime",
            "Log in quickly before anyone can intercept the connection",
          ],
          correctIndex: 2,
          explanation: "The right long-term fix is upgrading the app to HTTPS (a problem for IT). The immediate workaround is a VPN — it creates an encrypted tunnel from your device, making even HTTP traffic invisible to attackers on the local Wi-Fi. Using your phone's data also avoids the shared Wi-Fi risk but does not fix the underlying HTTP problem.",
        },
      ],
    },
  },

  // ─── jhs-06: Identity Theft 101 ──────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "Federal Trade Commission HQ", location: "Washington, D.C.", era: "Present Day", emoji: "🏛️" },
    id: "jhs-06",
    order: 6,
    title: "Identity Theft 101",
    subtitle: "How credentials get stolen, sold, and used against you",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-06", name: "Identity Guard", emoji: "🪪" },
    challengeType: "quiz",
    info: {
      tagline: "Your login credentials are worth money on the dark web — understanding how they get there helps you stop it.",
      year: 2024,
      overview: [
        "Identity theft occurs when someone uses your personal information — name, Social Security number, credit card numbers, or login credentials — without your permission. It is one of the fastest-growing crimes. In 2023, the FTC received 5.7 million reports of fraud and identity theft from Americans, with losses exceeding $10 billion.",
        "Credentials — usernames and passwords — are the most commonly stolen data. They are obtained through data breaches (hackers stealing entire databases), phishing attacks, keyloggers, credential stuffing (trying leaked passwords from one site on other sites), and malware. Once stolen, credentials are sold on dark web marketplaces for anywhere from $0.50 to thousands of dollars depending on the account type.",
        "Credential stuffing is a particularly important technique to understand: attackers take the billions of username/password combinations leaked from past breaches (like the LinkedIn 2012 hack) and automatically try them against other websites — email, banking, gaming accounts. If you reuse passwords, one breach exposes all your accounts.",
      ],
      technical: {
        title: "From Breach to Bank Account: The Credential Pipeline",
        body: [
          "Data breach → credentials stolen. Dark web marketplace → credentials sold. Buyer runs credential stuffing tool → tests millions of combinations against target sites. Accounts with working credentials are verified. High-value accounts (banking, email) are accessed; email access allows password reset of ALL other accounts linked to that email.",
          "Credential stuffing tools like Sentry MBA and SilverBullet are designed to test thousands of accounts per second. The victim never knows until they notice unauthorized activity or receive a breach notification. Monitoring services like HaveIBeenPwned.com check if your email appears in known data breaches — checking it is a free first step.",
        ],
        codeExample: {
          label: "Credential Stuffing Attack Flow",
          code: `1. Attacker buys 117M LinkedIn credentials
   (username:password pairs)

2. Runs credential stuffing tool:
   Testing netflix.com...
   alex@email.com : Password123 → VALID ✓
   Testing gmail.com...
   alex@email.com : Password123 → VALID ✓

3. Valid accounts sold or used:
   Netflix: sell for $2 each
   Gmail: gold mine — use to reset
   ALL accounts linked to this email`,
        },
      },
      incident: {
        title: "Credential Stuffing at Dunkin Donuts",
        when: "2018-2019",
        where: "DD Perks rewards program",
        impact: "Attackers used credentials from other breaches to access Dunkin Donuts reward accounts and drain stored value",
        body: [
          "In 2018 and 2019, attackers used credentials leaked from other websites to gain access to Dunkin Donuts' DD Perks rewards accounts. Customers who used the same email and password on Dunkin Donuts as on other breached sites had their accounts accessed — stored value and rewards points were drained or sold.",
          "Dunkin Donuts paid $650,000 in a settlement with New York's attorney general for failing to adequately notify affected customers. The customers were not at fault for Dunkin Donuts' practices, but they would have been protected if they had used unique passwords for each site.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Data Breach", sub: "credentials stolen from company", type: "attacker" },
          { label: "Dark Web Sale", sub: "millions of credential pairs", type: "system" },
          { label: "Credential Stuffing", sub: "tested across other sites", type: "victim" },
          { label: "Unique Passwords + 2FA", sub: "the complete defense", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "LinkedIn: 117M credentials stolen — forms a massive stuffing database" },
        { year: 2013, event: "Adobe: 153M accounts breached" },
        { year: 2016, event: "Yahoo: 3 billion accounts — largest breach ever" },
        { year: 2018, event: "Have I Been Pwned crosses 5 billion records from breach data", highlight: true },
        { year: 2024, event: "National Public Data breach exposes 2.7 billion records including SSNs" },
      ],
      keyTakeaways: [
        "Credential stuffing: attackers test billions of leaked username/password pairs against other sites — reused passwords fail",
        "One data breach exposes all accounts where you used the same password",
        "Email account access is the master key — it can reset all accounts linked to it",
        "Check haveibeenpwned.com; use a password manager; enable 2FA on email",
      ],
      references: [
        { title: "Have I Been Pwned — Check Your Email", url: "https://haveibeenpwned.com/" },
        { title: "FTC: Identity Theft", url: "https://www.ftc.gov/consumer-advice/privacy-identity/identity-theft" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-06-q1",
          type: "Credential Stuffing",
          challenge: `A company suffers a data breach and 50 million
username/password pairs are stolen.

Even users who did NOT have accounts at that
company might be at risk. Why?`,
          text: "Why does a breach at one company put users at other companies at risk?",
          options: [
            "The attacker now knows which email providers those users use",
            "If users reused the same password elsewhere, credential stuffing can access those other accounts",
            "Breaches expose personal information that can be used to answer security questions",
            "The stolen emails can be used for phishing at other companies",
          ],
          correctIndex: 1,
          explanation: "Credential stuffing: attackers take stolen username/password pairs and automatically test them against other websites. If you used the same password on two sites and one gets breached, the attacker tries that password on the other. This is why unique passwords for every site are critical.",
        },
        {
          id: "jhs-06-q2",
          type: "Attack Chain",
          challenge: `An attacker gets into a victim's Gmail account.
The victim uses Gmail to receive password resets.

What can the attacker likely access now?`,
          text: "An attacker controls someone's email account. What is the realistic damage?",
          options: [
            "Only the email account itself",
            "Only sites where the same password was used",
            "Potentially every online account linked to that email, via password reset",
            "Only social media accounts",
          ],
          correctIndex: 2,
          explanation: "Email is the master key to most of your online life. Every site that allows 'forgot password' will send a reset link to your email. An attacker who controls your email can reset the passwords on your banking, social media, Amazon, and every other account — regardless of how strong those passwords were.",
        },
        {
          id: "jhs-06-q3",
          type: "Detection",
          challenge: `Which of these is the EARLIEST warning sign
that your credentials may have been compromised?`,
          text: "Which is the earliest indicator that your account credentials may be stolen?",
          options: [
            "You notice unauthorized purchases on your credit card",
            "You receive a breach notification email from a website you use",
            "Your friends report receiving strange messages from your account",
            "Your password stops working on a site",
          ],
          correctIndex: 1,
          explanation: "Breach notification emails (or checking haveibeenpwned.com) give you the earliest warning — often before attackers have acted on the stolen credentials. Acting immediately (changing the compromised password and enabling 2FA) can prevent further damage.",
        },
        {
          id: "jhs-06-q4",
          type: "Best Defense",
          challenge: `What combination of practices provides the
STRONGEST defense against credential theft?`,
          text: "Which combination best protects against credential theft?",
          options: [
            "Strong passwords only",
            "A password manager to create unique passwords per site + 2FA on email and banking",
            "Antivirus software + strong passwords",
            "Changing passwords every 30 days",
          ],
          correctIndex: 1,
          explanation: "A password manager generates and stores a unique random password for every site, eliminating the reuse problem. 2FA on email means that even if credentials are stolen, the attacker cannot get in without your phone. These two together address the two biggest vectors for credential compromise.",
        },
      ],
    },
  },

  // ─── jhs-07: Your Attack Surface ─────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "Google Security Engineering Lab", location: "Mountain View, California", era: "Present Day", emoji: "🔎" },
    id: "jhs-07",
    order: 7,
    title: "Your Attack Surface",
    subtitle: "Everything you expose online is a potential door for attackers",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-07", name: "Surface Reducer", emoji: "🎯" },
    challengeType: "quiz",
    info: {
      tagline: "Every app you install, account you create, and port you open is part of your attack surface — and attackers look for the weakest door.",
      year: 2024,
      overview: [
        "Your attack surface is everything that an attacker could potentially exploit to gain unauthorized access to your data or systems. For an individual, it includes every account you have created, every app installed on your devices, every browser extension running in your browser, and any device connected to your network. For a company, it includes servers, employee devices, third-party software, and even people.",
        "The principle of attack surface reduction says: if you do not need it, remove it. An app you installed two years ago and never use still runs in the background, still requires updates, and still has permissions to access your camera, microphone, and contacts. If that app has a vulnerability, it is a door into your device even if you never open it.",
        "Reconnaissance is the first phase of almost every attack. Before targeting you, attackers identify your attack surface: which ports are open, which software you run, which email addresses are associated with your accounts, and what publicly available information about you could be used for social engineering. Reducing your exposed surface reduces the information attackers can use.",
      ],
      technical: {
        title: "Attack Surface Components",
        body: [
          "Digital attack surface: All internet-exposed services (websites, APIs, cloud storage), software running on your devices, browser extensions, connected IoT devices, email addresses and usernames. Physical attack surface: Unlocked computers, USB ports, physical access to servers. Human attack surface: Employees susceptible to social engineering, over-privileged users, former employees with retained access.",
          "Attack surface mapping tools (Shodan, Censys) allow anyone — including attackers — to discover what services are exposed on the internet. Shodan indexes billions of internet-connected devices and the services running on them. Security teams use it to find exposed devices; attackers use it to find targets. Running an exposure check on your own domains is standard security hygiene.",
        ],
        codeExample: {
          label: "Checking Your Exposure",
          code: `# What an attacker might see about your network
# (Shodan example — used by both defenders and attackers)

shodan host 203.0.113.42
  Ports open: 22 (SSH), 80 (HTTP), 3389 (RDP)
  Software: Apache 2.2.15 (outdated, vulnerable)
  Location: Chicago, IL, USA

# What this tells an attacker:
  - RDP open = brute force target
  - Outdated Apache = known exploits available
  - SSH open = check for default credentials

# Defense: close unused ports, keep software updated`,
        },
      },
      incident: {
        title: "The Colonial Pipeline Ransomware — One Unused VPN Account",
        when: "May 2021",
        where: "Colonial Pipeline, US Southeast fuel infrastructure",
        impact: "5,500-mile pipeline shut down for 5 days; fuel shortages across southeastern US; $4.4M ransom paid",
        body: [
          "The Colonial Pipeline attack began with a single compromised set of credentials for a VPN account — one that was no longer actively used but had not been deactivated. The username and password were found in a batch of leaked credentials on the dark web. The account did not have multi-factor authentication enabled.",
          "The attackers used those credentials to access Colonial's network and deploy DarkSide ransomware. The pipeline served 45% of the fuel for the US East Coast. The total attack surface failure: an orphaned VPN account (no longer needed), no MFA, and credentials that had been leaked and not changed. Three small failures created catastrophic consequences.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Unused VPN Account", sub: "forgotten, no MFA", type: "attacker" },
          { label: "Leaked Credentials", sub: "found on dark web", type: "system" },
          { label: "Full Network Access", sub: "ransomware deployed", type: "victim" },
          { label: "Remove What You Don't Need", sub: "deactivate unused accounts immediately", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "Shodan (search engine for exposed devices) becomes widely used by both defenders and attackers" },
        { year: 2017, event: "Equifax breach: unpatched Apache Struts server — unnecessary exposure exploited" },
        { year: 2021, event: "Colonial Pipeline: unused VPN account leads to $4.4M ransom and fuel shortage", highlight: true },
        { year: 2023, event: "MGM Resorts: social engineering + one help desk call exposes entire network" },
      ],
      keyTakeaways: [
        "Attack surface = everything you expose that an attacker could potentially exploit",
        "Reduction: delete unused accounts, remove unused apps, close unnecessary ports, revoke old access",
        "Even one forgotten account with no MFA can be the single point of entry for a major attack",
        "Reconnaissance tools like Shodan show attackers what you are exposing — check your own exposure",
      ],
      references: [
        { title: "CISA: Attack Surface Management", url: "https://www.cisa.gov/resources-tools/resources/cisa-attack-surface-management-tools" },
        { title: "Wired: Colonial Pipeline Hack — What We Know", url: "https://www.wired.com/story/colonial-pipeline-ransomware-attack/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-07-q1",
          type: "Attack Surface",
          challenge: `Which of these actions REDUCES your attack surface?`,
          text: "Which action reduces your attack surface?",
          options: [
            "Installing more security apps to monitor threats",
            "Uninstalling apps you have not used in over a year",
            "Using the same password everywhere so there are fewer accounts to manage",
            "Opening additional firewall ports for monitoring tools",
          ],
          correctIndex: 1,
          explanation: "Every installed app is part of your attack surface — it runs in the background, has permissions, and may have vulnerabilities. Removing apps you do not need directly reduces the surface. Installing more software (even security software) adds surface. Opening ports increases surface.",
        },
        {
          id: "jhs-07-q2",
          type: "Orphaned Accounts",
          challenge: `An employee leaves a company. Their IT account
is still active 6 months later.

Why is this a security risk?`,
          text: "Why is a former employee's still-active account a security risk?",
          options: [
            "It is not a risk — they no longer work there so they would not use it",
            "If their credentials were compromised, an attacker has ongoing access to internal systems",
            "Only if the employee was an administrator",
            "It wastes a software license but poses no real security risk",
          ],
          correctIndex: 1,
          explanation: "Orphaned accounts (unused but not deactivated) are high-risk targets. Former employees' credentials may have been leaked, their passwords may not be updated, and their accounts may not be monitored. The Colonial Pipeline attack used exactly this type of orphaned VPN account.",
        },
        {
          id: "jhs-07-q3",
          type: "Browser Extensions",
          challenge: `A developer has 23 browser extensions installed.
Some are months or years old and rarely used.

What security risk do these pose?`,
          text: "Why are unused browser extensions a security risk?",
          options: [
            "They slow the browser but pose no security risk",
            "Each extension has access to browse history, cookies, and page content — a compromised or malicious extension can steal everything",
            "They can interfere with antivirus scanning",
            "They only pose risk if they request microphone access",
          ],
          correctIndex: 1,
          explanation: "Browser extensions run with elevated privileges — they can read every page you visit, capture your keystrokes, access your cookies (including session tokens), and exfiltrate data. Several legitimate extensions have been acquired by malicious actors and updated to include adware or credential theft. Remove any extension you do not actively use.",
        },
        {
          id: "jhs-07-q4",
          type: "Reconnaissance",
          challenge: `An attacker discovers that a company's website
runs on outdated Apache 2.2 (an old version with
known unpatched vulnerabilities).

How did the attacker most likely find this?`,
          text: "How do attackers discover what software a company's web server is running?",
          options: [
            "They must physically access the server room",
            "Web servers often announce their software version in HTTP response headers, visible to anyone",
            "They need inside information from a company employee",
            "They can only find this information if the company publicly disclosed it",
          ],
          correctIndex: 1,
          explanation: "Web servers often include 'Server' headers in HTTP responses that reveal the software name and version: 'Apache/2.2.15 (Unix)'. Tools like Shodan index this data from billions of servers. Hiding version information ('server banner grabbing prevention') is a basic hardening step that reduces information leakage.",
        },
      ],
    },
  },

  // ─── jhs-08: First Response ───────────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "junior-hs",
    wonder: { name: "CISA Emergency Response Center", location: "Arlington, Virginia", era: "Present Day", emoji: "🚨" },
    id: "jhs-08",
    order: 8,
    title: "First Response",
    subtitle: "What to do in the first 60 minutes after a suspected compromise",
    category: "cybersecurity",
    xp: 70,
    badge: { id: "badge-jhs-08", name: "Incident Responder", emoji: "🚨" },
    challengeType: "quiz",
    info: {
      tagline: "The first hour after discovering a security incident determines whether damage is contained or catastrophic.",
      year: 2024,
      overview: [
        "Incident response is what happens after a security breach is detected. The goal is to contain the damage, eradicate the threat, recover normal operations, and learn from what happened. Doing this well requires preparation — knowing what to do before a breach happens, so you are not making decisions under panic.",
        "The standard incident response lifecycle has six phases: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned (often abbreviated as PICERL). For individuals and small organizations, the most critical phase is Containment — stopping the spread before it gets worse. For larger organizations, Identification (detecting the breach early) is often the hardest part.",
        "For individuals, a suspected compromise follows a clear priority order: (1) Change your passwords, starting with email. (2) Enable 2FA everywhere if not already done. (3) Check for unauthorized activity. (4) Disconnect compromised devices from the network. (5) Report to appropriate authorities. (6) Check haveibeenpwned.com. Speed matters — every minute the attacker has access, they can move deeper, steal more, or lock you out.",
      ],
      technical: {
        title: "The PICERL Incident Response Lifecycle",
        body: [
          "Preparation: policies, backups, monitoring tools, contact lists. Identification: detecting that an incident occurred (logs, alerts, user reports). Containment: short-term (isolate affected systems) and long-term (patch vulnerabilities). Eradication: remove the threat completely — malware removed, compromised accounts disabled, vulnerabilities patched. Recovery: restore systems and verify they are clean before reconnecting.",
          "Chain of custody and documentation: everything you do during incident response should be documented with timestamps. This matters for forensics (understanding exactly what happened), legal proceedings, and insurance claims. 'First, do no harm' — avoid making changes that destroy forensic evidence before it is collected.",
        ],
        codeExample: {
          label: "Individual Incident Response Checklist",
          code: `MINUTE 0-10: Contain
  ☐ Change email password immediately
  ☐ Enable 2FA on email if not already on
  ☐ Change passwords on any accounts that
    use the same password

MINUTE 10-30: Assess
  ☐ Check bank accounts for unauthorized activity
  ☐ Check email sent folder for messages you did not send
  ☐ Check haveibeenpwned.com for your email

MINUTE 30-60: Recover
  ☐ Change passwords on all important accounts
  ☐ Review and revoke unknown app permissions
  ☐ Report to authorities if financial fraud occurred`,
        },
      },
      incident: {
        title: "The 2016 DNC Email Hack — Slow Identification Costs Everything",
        when: "March-July 2016",
        where: "Democratic National Committee, Washington D.C.",
        impact: "Thousands of emails stolen and leaked; campaign disrupted; attributed to Russian intelligence",
        body: [
          "In March 2016, a spear phishing email reached John Podesta, chair of Hillary Clinton's presidential campaign. The email told him his Gmail password needed to be changed. An IT aide misidentified the email as 'legitimate' (the aide later said this was a typo — they meant to write 'illegitimate'). Podesta clicked the link and entered his password.",
          "The attackers had access for months before detection. During that time, they exfiltrated approximately 60,000 emails. The slow identification phase — the attacker was inside for months with no detection — made containment impossible. Earlier detection through monitoring for unusual login activity (different country, different IP) would have limited the damage significantly.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Phishing Email Clicked", sub: "initial access gained", type: "attacker" },
          { label: "Months Undetected", sub: "identification phase failed", type: "system" },
          { label: "60,000 Emails Stolen", sub: "containment impossible after this", type: "victim" },
          { label: "Early Detection + MFA", sub: "would have stopped the breach", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "CERT/CC publishes first incident response guide" },
        { year: 2012, event: "NIST SP 800-61 becomes the standard incident response framework" },
        { year: 2016, event: "DNC hack: months of dwell time before detection", highlight: true },
        { year: 2021, event: "Average dwell time (attacker in network before detection) drops to 21 days" },
        { year: 2024, event: "CISA mandates 72-hour breach reporting for critical infrastructure" },
      ],
      keyTakeaways: [
        "Incident response lifecycle: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned",
        "First action after compromise: change email password and enable 2FA — email is the master key",
        "Speed matters: every minute of attacker access deepens the damage",
        "Document everything with timestamps — forensic evidence matters for recovery and legal action",
      ],
      references: [
        { title: "NIST SP 800-61: Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
        { title: "CISA: Incident Response Basics", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/incident-response" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "jhs-08-q1",
          type: "PICERL",
          challenge: `A company detects malware on one workstation.
The security team immediately disconnects that
workstation from the network to prevent spread.

Which incident response phase is this?`,
          text: "Disconnecting an infected machine from the network is which phase of incident response?",
          options: [
            "Identification — they are still figuring out what happened",
            "Eradication — they are removing the threat",
            "Containment — stopping the spread before it gets worse",
            "Recovery — restoring normal operations",
          ],
          correctIndex: 2,
          explanation: "Containment is the phase where you stop the spread. Disconnecting an infected machine isolates it from the rest of the network, preventing the malware from spreading laterally. This happens before Eradication (actually removing the malware) and Recovery (restoring service).",
        },
        {
          id: "jhs-08-q2",
          type: "Priority Order",
          challenge: `You believe your account has been compromised.

In what order should you take these actions?
  A. Change passwords on all accounts
  B. Change your EMAIL password first
  C. Check for unauthorized activity
  D. Enable 2FA on email`,
          text: "What is the correct priority order for responding to a suspected account compromise?",
          options: [
            "A → B → C → D",
            "B → D → C → A",
            "C → B → D → A",
            "D → B → A → C",
          ],
          correctIndex: 1,
          explanation: "Email first (B) because it is the master key — someone who controls your email can reset all other passwords. Then 2FA on email (D) to lock the attacker out immediately. Then check for damage (C). Then update all other passwords (A). Working in this order minimizes the window of exposure.",
        },
        {
          id: "jhs-08-q3",
          type: "Dwell Time",
          challenge: `In 2021, the average 'dwell time' for attackers
inside a corporate network was 21 days before detection.

Why does shorter dwell time matter so much?`,
          text: "Why is early detection (reducing dwell time) critical in incident response?",
          options: [
            "It does not matter much — damage is done as soon as access is gained",
            "Every day of access gives attackers more time to exfiltrate data, move laterally, and embed deeper persistence mechanisms",
            "It matters only for legal reporting requirements",
            "It matters only for ransomware attacks, not data theft",
          ],
          correctIndex: 1,
          explanation: "Attackers with network access use their time to map the environment, steal data, move to more valuable systems, install additional backdoors, and deploy their final payload (ransomware, etc.). The longer they have access, the wider and deeper the damage. A breach detected in hours causes far less damage than one detected in weeks.",
        },
        {
          id: "jhs-08-q4",
          type: "Forensics",
          challenge: `During incident response, a junior analyst
deletes files infected by malware to 'clean up'.

What problem does this cause?`,
          text: "Why should you preserve forensic evidence during an incident response?",
          options: [
            "It does not cause problems — removing malware is always the right first step",
            "The malware could be needed for antivirus signature development",
            "Deleting files destroys forensic evidence needed to understand how the attack happened, its full scope, and for potential legal action",
            "Deleted files might reappear and cause a second infection",
          ],
          correctIndex: 2,
          explanation: "Forensic evidence — system logs, malware samples, network traffic captures, memory dumps — is essential for understanding the attack vector, the full scope of compromise, and for law enforcement proceedings. 'First, do not harm the evidence' is a core incident response principle. Always image (copy) a system before cleaning it.",
        },
      ],
    },
  },
];
