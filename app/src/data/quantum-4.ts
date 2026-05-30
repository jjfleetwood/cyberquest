import type { StageConfig, EpochConfig } from "./types";

export const quantum4Epoch: EpochConfig = {
  id: "quantum-4",
  name: "Quantum Risk Management",
  subtitle: "CBOM, Migration Programs & Governance",
  description: "Build cryptographic inventories, design PQC migration programs, assess sector-specific quantum risk, and brief the board — using NIST, CISA, and NSA CNSA 2.0 frameworks.",
  emoji: "⚠️",
  color: "emerald",
  unlocked: true,
};

export const quantum4Stages: StageConfig[] = [
  // ─── quantum-d01: CBOM ───────────────────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "NIST Cybersecurity Center of Excellence", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "📋" },
    id: "quantum-d01",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/NIST_logo.svg/1200px-NIST_logo.svg.png",
    order: 1,
    title: "Crypto Inventory Day One",
    subtitle: "Cryptographic Bill of Materials — Know What You Have",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-cbom", name: "Crypto Cartographer", emoji: "📋" },
    challengeType: "ctf",
    info: {
      tagline: "You cannot migrate what you cannot find. A CBOM is the prerequisite for every post-quantum transition plan.",
      year: 2024,
      overview: [
        "A Cryptographic Bill of Materials (CBOM) is a structured inventory of every cryptographic algorithm, key, certificate, and protocol in use across an organization's systems. Just as a software bill of materials (SBOM) catalogs software dependencies, a CBOM catalogs crypto dependencies — identifying every RSA key pair, every TLS certificate, every ECDH handshake, and every symmetric key. NIST and CISA both mandate CBOM development as step one of any post-quantum migration.",
        "The scope of a CBOM is larger than most organizations realize. Cryptography is embedded not only in explicit security tools (PKI, VPNs, email encryption) but in every TLS connection, every SSH session, every JWT token, every database encryption-at-rest layer, every API authentication mechanism, and every code-signing pipeline. Hardware security modules, IoT firmware, embedded controllers, and legacy SCADA systems all carry cryptographic dependencies that are often invisible to IT teams.",
        "Without a CBOM, organizations cannot assess their quantum risk exposure, cannot prioritize migration efforts, and cannot report readiness to regulators or auditors. CISA's 2023 Post-Quantum Cybersecurity Roadmap requires federal agencies to complete cryptographic inventories by 2025. NIST IR 8547 provides a taxonomy for CBOM data fields. Tools like Cryptosense Analyzer, XAEGIS, and IBM Quantum Safe Explorer automate CBOM generation from network traffic and source code analysis.",
      ],
      technical: {
        title: "CBOM Data Fields and Automated Discovery",
        body: [
          "A complete CBOM record for each cryptographic asset includes: algorithm (e.g., RSA-2048, AES-256-GCM, ECDH-P384), key length, mode of operation, certificate authority, expiry date, deployment context (TLS, SSH, S/MIME, code signing), system owner, data classification, and quantum vulnerability rating. NIST IR 8547 specifies five vulnerability tiers: V1 (immediately quantum-vulnerable, e.g., RSA/ECC), V2 (currently safe, monitor), V3 (quantum-safe, e.g., AES-256), V4 (PQC-ready), V5 (unknown).",
          "Automated CBOM generation approaches include passive network traffic analysis (inspecting TLS ClientHello and ServerHello to enumerate cipher suites in use), static code analysis (scanning source for crypto library calls), certificate transparency log harvesting, and PKI CA export. Open-source tools include CryptoLyzer (network protocol scanning) and Cryptobom (CBOM schema validator). The output is typically JSON or XML conforming to the CycloneDX CBOM extension.",
        ],
        codeExample: {
          label: "CryptoLyzer — scan TLS endpoints for cipher suite inventory",
          code: `# Install CryptoLyzer
pip install cryptolyzer

# Scan a host for all TLS cipher suites in use
cryptolyze tls all example.com --output json > cbom-tls.json

# Parse results to identify quantum-vulnerable suites
python3 - <<'EOF'
import json
with open("cbom-tls.json") as f:
    data = json.load(f)

vulnerable = []
for suite in data.get("cipher_suites", []):
    name = suite.get("name", "")
    if any(kex in name for kex in ["RSA", "ECDH", "DHE"]):
        vulnerable.append(name)

print(f"Quantum-vulnerable cipher suites found: {len(vulnerable)}")
for s in vulnerable:
    print(f"  V1 (QUANTUM-VULNERABLE): {s}")
EOF`,
        },
      },
      incident: {
        title: "U.S. Federal CBOM Mandate — The Crypto Inventory Gap",
        when: "2022–2024",
        where: "U.S. Federal civilian agencies — OMB M-23-02 mandate",
        impact: "Agencies found 70–90% of cryptographic assets were undocumented; migration planning blocked",
        body: [
          "Following NSM-10 in May 2022, federal agencies were required to begin cryptographic inventories. When CISA conducted gap assessments across federal civilian agencies in 2023, the majority had no systematic record of their cryptographic dependencies. IT teams could name their PKI and VPN systems but were unaware of crypto embedded in SCADA systems, healthcare record databases, satellite ground station firmware, and decades-old mainframe batch processing jobs.",
          "The inventory gap directly blocked migration planning. Agencies could not estimate their migration cost, timeline, or risk exposure without knowing what they were migrating. CISA's Post-Quantum Cybersecurity Roadmap (November 2023) formalized the requirement: all federal agencies must complete their CBOM by the end of FY2025 and identify their highest-priority systems for priority migration to NIST FIPS 203/204/205 compliant algorithms.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Discovery Scan", sub: "Network traffic + source code analysis", type: "system" },
          { label: "CBOM Record", sub: "Algorithm, key, cert, context, owner", type: "system" },
          { label: "Vulnerability Tier", sub: "V1=RSA/ECC, V3=AES-256, V4=PQC", type: "attacker" },
          { label: "Migration Priority", sub: "High-value + long-lived data first", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "NSM-10: Biden directs federal agencies to begin PQC migration" },
        { year: 2023, event: "CISA Post-Quantum Cybersecurity Roadmap published — CBOM mandate" },
        { year: 2024, event: "NIST FIPS 203/204/205 finalized — migration target algorithms confirmed", highlight: true },
        { year: 2025, event: "Federal agency CBOM completion deadline (OMB guidance)" },
        { year: 2027, event: "Target: priority federal systems migrated to PQC" },
      ],
      keyTakeaways: [
        "CBOM is prerequisite to migration — you cannot plan what you have not inventoried",
        "Cryptography is embedded everywhere: TLS, SSH, IoT firmware, SCADA, mainframes, code signing",
        "NIST IR 8547 defines five vulnerability tiers — V1 (RSA/ECC) requires immediate migration planning",
        "Automated tools (CryptoLyzer, Cryptosense) generate CBOMs from network traffic and source code",
      ],
      references: [
        { title: "CISA Post-Quantum Cybersecurity Roadmap", url: "https://www.cisa.gov/sites/default/files/2023-11/CISA-2023-Post-Quantum-Cybersecurity-Roadmap.pdf" },
        { title: "NIST IR 8547: CBOM Taxonomy", url: "https://csrc.nist.gov/pubs/ir/8547/final" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d01-q1", type: "Core Idea", challenge: "Why CBOM first.", text: "Why is a Cryptography Bill of Materials (CBOM) the prerequisite for any post-quantum transition plan?", options: ["You cannot migrate cryptography you cannot find — the CBOM inventories where and how crypto is used","It satisfies SEC fines automatically","It replaces the need for ML-KEM","It generates quantum keys"], correctIndex: 0, explanation: "A CBOM catalogs algorithms, key sizes, and locations so migration can be planned and prioritized." },
        { id: "quantum-d01-q2", type: "Implementation", challenge: "CBOM fields.", text: "Which fields belong in a useful CBOM entry for an endpoint?", options: ["Algorithm, key size, certificate validity, and quantum vulnerability tier","Only the server hostname","Just the OS version","The admin's email"], correctIndex: 0, explanation: "Capturing algorithm, key size, validity, and a vulnerability classification turns inventory into actionable risk data." },
        { id: "quantum-d01-q3", type: "Discovery", challenge: "Automated discovery.", text: "How is a CBOM for public-facing infrastructure most efficiently built?", options: ["Automated scanning of TLS endpoints to enumerate algorithms and classify vulnerability tiers","Manually asking each developer","Reading marketing brochures","Guessing from the firewall logs"], correctIndex: 0, explanation: "Scanning TLS endpoints discovers real deployed crypto far faster and more accurately than manual surveys." },
        { id: "quantum-d01-q4", type: "Concept", challenge: "CBOM vs SBOM.", text: "How does a CBOM differ from a Software Bill of Materials (SBOM)?", options: ["A CBOM catalogs cryptographic usage; an SBOM catalogs software components","They are identical","A CBOM lists only AES keys","An SBOM is for quantum hardware"], correctIndex: 0, explanation: "SBOMs track software inventory; CBOMs specifically map cryptographic assets and their quantum exposure." },
        { id: "quantum-d01-q5", type: "Policy", challenge: "Federal mandate.", text: "What gap does the U.S. federal CBOM mandate aim to close?", options: ["The crypto inventory gap — agencies often don't know what algorithms their systems use","A shortage of QKD satellites","The lack of RSA in government","Too few passwords"], correctIndex: 0, explanation: "Agencies historically lacked a crypto inventory; the mandate forces discovery before migration." },
        { id: "quantum-d01-q6", type: "Implementation", challenge: "Vulnerability tiering.", text: "When classifying CBOM entries, which crypto is tiered as most quantum-vulnerable?", options: ["Public-key algorithms like RSA and ECC, broken by Shor's algorithm","AES-256 bulk encryption","SHA-512 hashing of public data","Random number generation"], correctIndex: 0, explanation: "RSA/ECC key exchange and signatures fall to Shor's algorithm, making them the highest-priority tier." },
        { id: "quantum-d01-q7", type: "Strategy", challenge: "From inventory to plan.", text: "After building the CBOM, what is the immediate next step in the migration program?", options: ["Score and prioritize systems by quantum risk (e.g., HNDL exposure and key longevity)","Delete all certificates","Buy QKD hardware","Stop using TLS"], correctIndex: 0, explanation: "The inventory feeds risk scoring, which sequences the migration roadmap." },
        { id: "quantum-d01-q8", type: "Defense", challenge: "Keeping CBOM current.", text: "Why must a CBOM be maintained continuously rather than produced once?", options: ["Cryptographic deployments change as systems and algorithms evolve; a stale inventory misleads migration","It only matters at audit time","CBOMs never change","It's a one-time legal filing"], correctIndex: 0, explanation: "Living infrastructure changes constantly; an outdated CBOM hides new quantum-vulnerable assets." },
      ],
    },
    ctf: {
      scenario: "You're the lead quantum risk analyst at a federal agency. Build a CBOM for the agency's public-facing infrastructure by scanning TLS endpoints and classifying quantum vulnerability tiers.",
      hint: "Start by reading the agency inventory brief, then run the crypto scanner, then classify assets by vulnerability tier.",
      hints: [
        "Read the agency brief first. Run: cat agency-brief.txt",
        "Run the TLS scanner to discover cipher suites. Run: cbom-scan --tls agency.gov",
        "Classify scanned assets by quantum vulnerability tier. Run: cbom-classify results.json",
        "Run 'assemble' to submit your completed CBOM assessment",
      ],
      fragments: [
        { trigger: "/agency-brief.txt", value: "FLAG{CBOM_INV", label: "Agency Brief — Crypto Inventory Scope" },
        { trigger: "cbom-scan", value: "ENTORY_V1_", label: "TLS Scan — Quantum-Vulnerable Suites Found" },
        { trigger: "cbom-classify", value: "ASSETS}", label: "CBOM Classification — V1/V3/V4 Tiers Assigned" },
      ],
      files: {
        "/agency-brief.txt": [
          "QUANTUM RISK ASSESSMENT — AGENCY CBOM",
          "Mission: Build cryptographic asset inventory for PQC migration planning.",
          "Scope: Public-facing TLS endpoints, internal PKI, SSH infrastructure.",
          "Priority: Identify all V1 (RSA/ECC/DH) assets for priority migration.",
          "Timeline: CBOM complete by FY2025 per CISA roadmap.",
          "Sequence: cbom-scan → cbom-classify → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "agency-brief.txt", isDir: false }] },
      extraCommands: {
        "cbom-scan": (_args: string[]) => ({
          lines: [
            "Running TLS cipher suite scan on agency.gov...",
            "Discovered cipher suites:",
            "  TLS_RSA_WITH_AES_256_CBC_SHA256 [V1 — RSA key exchange, QUANTUM-VULNERABLE]",
            "  TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 [V1 — ECDHE, QUANTUM-VULNERABLE]",
            "  TLS_AES_256_GCM_SHA384 (TLS 1.3) [V3 — AES-256 quantum-safe]",
            "SSH server key types: ssh-rsa 2048-bit [V1], ecdsa-sha2-nistp256 [V1]",
            "Certificate inventory: 47 certificates, avg key size RSA-2048",
            "PKI CA: RSA-4096 root [V1], RSA-2048 intermediates [V1]",
            "Results saved to results.json. Fragment collected.",
            "",
            ">> LEARN: TLS RSA and ECDHE key exchange are both V1 — broken by Shor's Algorithm.",
            "   Only the symmetric portion (AES-256) is quantum-safe (Grover requires 2^128 ops).",
            "   Migration path: replace RSA/ECDH with ML-KEM-768 (KYBER) per FIPS 203.",
          ],
        }),
        "cbom-classify": (_args: string[]) => ({
          lines: [
            "Classifying 52 assets from results.json...",
            "V1 (Immediately Quantum-Vulnerable): 48 assets",
            "  - 47 RSA/ECC TLS certificates",
            "  - 1 RSA-4096 PKI root CA",
            "V3 (Quantum-Safe): 4 assets",
            "  - AES-256-GCM symmetric encryption (database, backup)",
            "V4 (PQC-Ready): 0 assets",
            "",
            "Priority migration order:",
            "  1. PKI root CA (highest impact — signs everything else)",
            "  2. Public TLS endpoints (internet-exposed, HNDL risk)",
            "  3. Internal SSH infrastructure",
            "CBOM classification complete. Migration cost estimate: 18 months, 3 FTEs.",
            "Fragment collected.",
            "",
            ">> LEARN: PKI root CA migration is the most critical step.",
            "   Once the root CA is migrated to ML-DSA (FIPS 204), all issued certs inherit PQC.",
            "   Hybrid certificates (RSA + ML-DSA) allow transition without breaking legacy clients.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d02: HNDL ───────────────────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "NSA National Cryptologic Museum", location: "Fort Meade, Maryland, USA", era: "2024 CE", emoji: "🕵️" },
    id: "quantum-d02",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/NSA_Seal.svg/1200px-NSA_Seal.svg.png",
    order: 2,
    title: "Harvest Now, Decrypt Later",
    subtitle: "HNDL — The Threat That Is Already Happening",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-hndl", name: "HNDL Analyst", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "Nation-states are capturing encrypted traffic today, storing it, and waiting for Q-Day. The threat window is now — not 2030.",
      year: 2022,
      overview: [
        "Harvest Now, Decrypt Later (HNDL) — also called Store Now, Decrypt Later (SNDL) — is an intelligence collection strategy in which adversaries intercept and archive encrypted network traffic today, with the intent to decrypt it once a Cryptographically Relevant Quantum Computer (CRQC) becomes available. Because quantum computers are expected to break RSA and ECC within 10–15 years, any data encrypted today with those algorithms is at retrospective risk. Intelligence agencies worldwide assess HNDL as an active, ongoing threat.",
        "HNDL is particularly dangerous for long-shelf-life data: classified government communications, medical records, legal privileged documents, intellectual property, financial transactions, and infrastructure credentials. A nation-state that captures a government agency's TLS traffic today cannot read it — but can potentially decrypt it in 2032 when a CRQC arrives. This means the effective security lifetime of RSA-2048 encrypted data is not 'until Q-Day' but 'right now' for anyone targeted by a capable state actor.",
        "The NSA, GCHQ, and CISA have publicly acknowledged that adversaries with strategic intelligence interests are operating HNDL programs. The NSA's 2023 Cybersecurity Information Sheet states: 'The threat is not just that future quantum computers will be able to break current encryption, but that adversaries are today collecting encrypted data for future decryption.' The NSA recommends treating any RSA/ECC-encrypted data with a secrecy horizon beyond 2030 as already compromised for planning purposes.",
      ],
      technical: {
        title: "HNDL Attack Infrastructure and Defense",
        body: [
          "HNDL campaigns target bulk collection points: undersea cable taps, Internet Exchange Points (IXPs), BGP route hijacking to intercept traffic flows, and compromised ISP infrastructure. Adversaries do not need to decrypt traffic in real time — they need only to capture and store the ciphertext. Storage costs are minimal: 1 petabyte of raw network traffic costs approximately $20,000 to store, making bulk collection economically viable for state actors.",
          "Organizations can counter HNDL by deploying hybrid PQC/classical key exchange now — even if the PQC algorithm is later broken classically, the adversary's stored ciphertext was encrypted with keys they cannot derive quantum-mechanically. The defense is deploying ML-KEM-768 hybrid key exchange immediately. This protects future sessions and ensures that any traffic captured after deployment cannot be retrospectively decrypted by a CRQC.",
        ],
        codeExample: {
          label: "OpenSSL — configure hybrid X25519+ML-KEM-768 key exchange (HNDL defense)",
          code: `# OpenSSL 3.4+ with oqs-provider for post-quantum groups
# Configure TLS 1.3 with hybrid X25519+ML-KEM-768 key exchange
openssl s_server -groups x25519_mlkem768 -tls1_3 \\
  -cert server.crt -key server.key -port 4433

# Verify hybrid key exchange is negotiated
openssl s_client -groups x25519_mlkem768 -tls1_3 \\
  -connect localhost:4433 -brief 2>&1 | grep "Server Temp Key"
# Expected: Server Temp Key: X25519MLKEM768, 1216 bits

# Hybrid security: both algorithms must be broken to expose session key
# X25519 protects against classical adversaries
# ML-KEM-768 protects against quantum adversaries (Shor's Algorithm)`,
        },
      },
      incident: {
        title: "Chinese HNDL Operations Against U.S. Federal Agencies",
        when: "2017–present (ongoing)",
        where: "U.S. federal networks, financial infrastructure, defense contractors",
        impact: "Years of encrypted federal traffic captured; retrospective decryption risk once CRQC available",
        body: [
          "U.S. intelligence assessments from 2022–2024 conclude that People's Republic of China state actors are conducting systematic HNDL collection against U.S. federal agency traffic. Congressional testimony from NSA Director Paul Nakasone in 2023 confirmed that the NSA is tracking HNDL collection activity by foreign intelligence services. The NSA's 2023 advisory specifically warns that Chinese threat actors — including groups associated with the Ministry of State Security — have the technical capability and motivation to operate large-scale HNDL programs.",
          "The practical implication for risk managers is stark: any classified or sensitive U.S. government data transmitted over RSA or ECC encrypted channels since approximately 2017 must be treated as potentially captured and held for future quantum decryption. CISA's guidance is that organizations should assume HNDL is occurring and assess their data's remaining secrecy horizon — if data must remain secret past 2035, PQC migration should be treated as an emergency, not a planned transition.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Today — RSA Traffic", sub: "Captured & stored by adversary", type: "attacker" },
          { label: "Storage (Cheap)", sub: "1 PB = $20K — bulk collection viable", type: "system" },
          { label: "Q-Day (~2030-35)", sub: "CRQC decrypts stored ciphertext", type: "victim" },
          { label: "HNDL Defense", sub: "Hybrid PQC key exchange NOW", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Snowden revelations confirm bulk TLS traffic collection by NSA/GCHQ" },
        { year: 2017, event: "Intelligence estimates: China begins large-scale HNDL collection programs" },
        { year: 2022, event: "NSA issues HNDL warning; recommends immediate PQC key exchange deployment" },
        { year: 2023, event: "NSA Director confirms foreign HNDL programs in Congressional testimony", highlight: true },
        { year: 2024, event: "NIST FIPS 203 (ML-KEM) finalized — HNDL defense algorithm available" },
      ],
      keyTakeaways: [
        "HNDL is active today — nation-states are capturing and storing your encrypted traffic now",
        "The effective security lifetime of RSA-2048 data is not Q-Day — it is the present moment",
        "Hybrid PQC key exchange (X25519+ML-KEM-768) defends against HNDL immediately",
        "Data with secrecy horizon past 2035 should be treated as urgently requiring PQC migration",
      ],
      references: [
        { title: "NSA: Quantum Computing and Post-Quantum Cryptography", url: "https://media.defense.gov/2021/Aug/04/2002821837/-1/-1/1/Quantum_FAQs_20210804.PDF" },
        { title: "CISA: Post-Quantum Cryptography Initiative", url: "https://www.cisa.gov/quantum" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d02-q1", type: "Core Idea", challenge: "HNDL timing.", text: "Why is the Harvest-Now-Decrypt-Later (HNDL) threat described as 'now, not 2030'?", options: ["Adversaries are capturing and storing encrypted traffic today to decrypt after Q-Day","Quantum computers already break RSA at scale","All data expires in 2030","HNDL only affects future data"], correctIndex: 0, explanation: "The harvesting happens today; the threat window is open now even though decryption waits for a future quantum computer." },
        { id: "quantum-d02-q2", type: "Threat", challenge: "HNDL infrastructure.", text: "What infrastructure does an HNDL adversary need?", options: ["Bulk traffic capture and large-scale encrypted-data storage for later decryption","A working CRQC today","Physical access to every server","A valid TLS certificate"], correctIndex: 0, explanation: "HNDL requires interception and storage capacity now; the quantum decryption capability is acquired later." },
        { id: "quantum-d02-q3", type: "Real World", challenge: "Targeting pattern.", text: "What characterizes nation-state HNDL operations against federal agencies?", options: ["Systematic capture of RSA/ECC-protected traffic with long secrecy value","Random ransomware deployment","Phishing for gift cards","Defacing public websites"], correctIndex: 0, explanation: "HNDL campaigns target durable secrets — exactly the data whose value survives until Q-Day." },
        { id: "quantum-d02-q4", type: "Analysis", challenge: "Risk window.", text: "How is the HNDL risk window for a given dataset calculated?", options: ["Compare the data's required secrecy lifetime against the estimated time to Q-Day","Count the number of packets","Measure CPU usage","Divide key size by 2"], correctIndex: 0, explanation: "If secrecy must outlast Q-Day, harvested ciphertext is at risk — that overlap defines the window." },
        { id: "quantum-d02-q5", type: "Defense", challenge: "Stopping HNDL.", text: "What is the most direct defense against HNDL for sensitive communications?", options: ["Migrate key exchange to PQC now so harvested traffic stays undecryptable later","Increase log retention","Shorten passwords","Disable TLS compression only"], correctIndex: 0, explanation: "Once the key exchange is quantum-safe, already-harvested or future-harvested sessions can't be decrypted at Q-Day." },
        { id: "quantum-d02-q6", type: "Concept", challenge: "Why long-lived data.", text: "Which data is the highest-value HNDL target?", options: ["Secrets with long required confidentiality (state secrets, IP, health records)","Public press releases","Cached images","Expired session tokens"], correctIndex: 0, explanation: "The longer data must stay secret, the more likely it's still sensitive when Q-Day arrives." },
        { id: "quantum-d02-q7", type: "Analysis", challenge: "Telemetry review.", text: "When investigating suspected HNDL against a contractor, what evidence is most relevant?", options: ["Large-volume captures of RSA/ECC-encrypted sessions exfiltrated for storage","Increased disk temperature","More frequent logins","A new desktop wallpaper"], correctIndex: 0, explanation: "Bulk exfiltration of encrypted sessions to attacker storage is the HNDL signature." },
        { id: "quantum-d02-q8", type: "Strategy", challenge: "Prioritizing response.", text: "Why can't an organization 'wait and see' on HNDL until quantum computers mature?", options: ["The data is harvested today; waiting guarantees future exposure of already-stolen ciphertext","Because RSA is illegal","Because TLS will be banned","There is no urgency"], correctIndex: 0, explanation: "Delay doesn't reduce risk for data already harvested — only forward-secret PQC migration does." },
      ],
    },
    ctf: {
      scenario: "You're investigating an HNDL threat against a defense contractor. Analyze captured network telemetry to identify RSA-encrypted data harvested, assess the HNDL risk window, and recommend defenses.",
      hint: "Read the threat intel brief, analyze capture telemetry, then model the HNDL risk window.",
      hints: [
        "Start with the threat intel brief. Run: cat hndl-brief.txt",
        "Analyze captured traffic telemetry. Run: hndl-analyze capture-log.pcap",
        "Model the HNDL risk window. Run: hndl-risk-model --horizon 2035",
        "Run 'assemble' to submit the HNDL assessment",
      ],
      fragments: [
        { trigger: "/hndl-brief.txt", value: "FLAG{HNDL_HAR", label: "HNDL Brief — Threat Intelligence Summary" },
        { trigger: "hndl-analyze", value: "VEST_NOW_", label: "Capture Analysis — RSA Traffic Identified" },
        { trigger: "hndl-risk-model", value: "DECRYPT_LATER}", label: "Risk Model — Secrecy Horizon Assessment" },
      ],
      files: {
        "/hndl-brief.txt": [
          "HNDL THREAT ASSESSMENT — DEFENSE CONTRACTOR",
          "Intelligence: Foreign state actor collection of contractor TLS traffic.",
          "Duration: Estimated 2020–present (4+ years of ciphertext stored).",
          "Algorithms: RSA-2048 (TLS), ECDH-P256 (VPN), RSA-2048 (email S/MIME).",
          "Data sensitivity: Program acquisition data, classified sub-contracts.",
          "Secrecy horizon required: 2040+ (program lifecycle).",
          "Sequence: hndl-analyze → hndl-risk-model → assemble",
        ].join("\n"),
        "/capture-log.pcap": "Binary TLS capture log — 2.3TB over 4 years. Use hndl-analyze to process.",
      },
      dirs: {
        "/": [
          { name: "hndl-brief.txt", isDir: false },
          { name: "capture-log.pcap", isDir: false },
        ],
      },
      extraCommands: {
        "hndl-analyze": (_args: string[]) => ({
          lines: [
            "Analyzing capture-log.pcap — 2.3TB TLS traffic (2020-2024)...",
            "TLS cipher suites in captured traffic:",
            "  RSA key exchange: 68% of sessions [V1 — quantum-vulnerable]",
            "  ECDHE: 31% of sessions [V1 — quantum-vulnerable]",
            "  TLS 1.3 (ECDHE only): 1% of sessions [V1 — still vulnerable]",
            "",
            "Sensitive data endpoints in session metadata:",
            "  acquisition-portal.gov (program contracts)",
            "  classified-mail.contractor.mil (S/MIME encrypted)",
            "  vpn.hq.contractor.mil (RSA-2048 IKE)",
            "Estimated adversary storage cost: ~$46,000 (2.3TB compressed)",
            "Fragment collected.",
            "",
            ">> LEARN: Even TLS 1.3 with ECDHE is quantum-vulnerable to HNDL.",
            "   An adversary stores the ECDHE ephemeral public keys and ciphertext.",
            "   A CRQC computes the private key via discrete log and decrypts all sessions.",
            "   Fix: deploy ML-KEM-768 hybrid — ECDHE alone is insufficient.",
          ],
        }),
        "hndl-risk-model": (_args: string[]) => ({
          lines: [
            "Modeling HNDL risk for secrecy horizon: 2040...",
            "Data captured: 2020–2024 (RSA-2048 / ECDH-P256 encrypted)",
            "CRQC availability estimate: 2030–2035 (optimistic)",
            "Secrecy horizon: 2040 (program lifecycle)",
            "",
            "Risk assessment: CRITICAL",
            "  HNDL exposure window: 5–10 years before horizon",
            "  Probability adversary has CRQC by 2035: 40–60% (IC estimate)",
            "  Captured data will likely be decryptable before end of secrecy period",
            "",
            "Immediate actions:",
            "  1. Deploy X25519+ML-KEM-768 hybrid TLS for all contractor comms (30 days)",
            "  2. Replace IKE RSA with ML-KEM-768 + ML-DSA for VPN (60 days)",
            "  3. Re-encrypt archived classified data with AES-256 (quantum-safe)",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d03: NIST PQC Standards ─────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "NIST Computer Security Division", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "📐" },
    id: "quantum-d03",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/NIST_logo.svg/1200px-NIST_logo.svg.png",
    order: 3,
    title: "The New Crypto Standards",
    subtitle: "FIPS 203, 204, 205 — NIST Post-Quantum Algorithms",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-nist-pqc", name: "NIST Standards Architect", emoji: "📐" },
    challengeType: "ctf",
    info: {
      tagline: "In August 2024, NIST finalized the world's first post-quantum cryptographic standards — three algorithms that replace RSA, ECC, and Diffie-Hellman.",
      year: 2024,
      overview: [
        "On August 13, 2024, NIST published three Federal Information Processing Standards (FIPS) that define the post-quantum cryptographic algorithms the world will migrate to: FIPS 203 (ML-KEM, key encapsulation), FIPS 204 (ML-DSA, digital signatures), and FIPS 205 (SLH-DSA, hash-based signatures). These standards are the result of a six-year competition evaluating 69 candidate algorithms from cryptographers worldwide, narrowing to CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+, and FALCON as finalists.",
        "ML-KEM (Module Lattice Key Encapsulation Mechanism, based on CRYSTALS-Kyber) replaces RSA and ECDH for key exchange in TLS, SSH, VPNs, and any protocol requiring key agreement. ML-DSA (Module Lattice Digital Signature Algorithm, based on CRYSTALS-Dilithium) replaces RSA and ECDSA for digital signatures — code signing, certificate issuance, JWT authentication, and document signing. SLH-DSA (Stateless Hash-based DSA, based on SPHINCS+) provides an alternative signature scheme based on hash functions rather than lattice math, providing algorithm diversity.",
        "Organizations should migrate to FIPS 203 and 204 as their primary algorithms — these are the ones CISA, NSA, and international standards bodies (ETSI, ISO) are endorsing. SLH-DSA provides backup algorithm diversity in case lattice-based cryptography is later weakened. All three are based on mathematical problems believed to be hard for both classical and quantum computers.",
      ],
      technical: {
        title: "Algorithm Selection Guide — When to Use Which Standard",
        body: [
          "ML-KEM-768 (FIPS 203, security level 3, ~192-bit classical equivalent) is the recommended algorithm for key encapsulation. It provides 1088-byte ciphertexts and 1184-byte public keys — significantly larger than RSA-2048's 256-byte ciphertext, requiring TLS and application protocol updates for larger handshake messages. ML-KEM-1024 (level 5, ~256-bit) is used for top-secret systems. ML-DSA-65 (FIPS 204) produces 3309-byte signatures versus RSA-2048's 256 bytes — X.509 certificate sizes increase substantially.",
          "Migration priority matrix: (1) Internet-facing TLS — deploy ML-KEM-768 hybrid with X25519 immediately; (2) Code signing pipelines — migrate to ML-DSA-65 within 12 months; (3) Certificate authority — migrate root CA to ML-DSA-87 (level 5) as highest-priority PKI change; (4) VPN/IPsec — replace IKEv2 ECDH with ML-KEM-768. Hybrid mode (classical + PQC) is recommended during the transition period.",
        ],
        codeExample: {
          label: "Python — ML-KEM-768 key encapsulation using liboqs",
          code: `# pip install liboqs-python
import oqs

# Key Encapsulation (FIPS 203 — ML-KEM-768)
kem = oqs.KeyEncapsulation("ML-KEM-768")

# Server: generate keypair
public_key = kem.generate_keypair()
print(f"Public key size: {len(public_key)} bytes")  # 1184 bytes

# Client: encapsulate — produces ciphertext + shared secret
client_kem = oqs.KeyEncapsulation("ML-KEM-768")
ciphertext, shared_secret_client = client_kem.encap_secret(public_key)
print(f"Ciphertext size: {len(ciphertext)} bytes")  # 1088 bytes

# Server: decapsulate — recovers shared secret from ciphertext
shared_secret_server = kem.decap_secret(ciphertext)

assert shared_secret_client == shared_secret_server
print("ML-KEM-768 key agreement successful — quantum-safe!")
kem.free(); client_kem.free()`,
        },
      },
      incident: {
        title: "SIKE Broken in 62 Minutes — Why Algorithm Diversity Matters",
        when: "2022",
        where: "NIST PQC competition — SIKE finalist",
        impact: "SIKE completely broken by classical attack; reinforced need for multiple algorithm families",
        body: [
          "NIST launched the Post-Quantum Cryptography Standardization project in 2016, calling for algorithm submissions. 69 candidate algorithms were submitted. After four rounds of analysis, CRYSTALS-Kyber, CRYSTALS-Dilithium, FALCON, and SPHINCS+ were selected. However, in 2022, SIKE — Supersingular Isogeny Key Encapsulation — was completely broken by a classical attack. A single researcher used a 62-minute attack on a laptop to recover SIKE private keys.",
          "The SIKE break reinforced why algorithm diversity matters: deploying a single PQC algorithm carries the risk that a classical or quantum attack breaks it. NIST's response was to standardize algorithms from two distinct mathematical families (lattices and hash functions) so a break in one family does not compromise all post-quantum cryptography. The final August 2024 standards — ML-KEM, ML-DSA, and SLH-DSA — represent two different mathematical foundations: lattice problems and hash functions.",
        ],
      },
      diagram: {
        nodes: [
          { label: "ML-KEM (FIPS 203)", sub: "Key encapsulation — replaces RSA/ECDH", type: "result" },
          { label: "ML-DSA (FIPS 204)", sub: "Digital signatures — replaces RSA/ECDSA", type: "result" },
          { label: "SLH-DSA (FIPS 205)", sub: "Hash-based signatures — algorithm diversity", type: "result" },
          { label: "SIKE Broken", sub: "62-minute classical attack — diversity validated", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2016, event: "NIST launches Post-Quantum Cryptography Standardization — 69 submissions" },
        { year: 2022, event: "SIKE finalist broken in 62 minutes on a laptop — algorithm diversity lesson", highlight: true },
        { year: 2022, event: "NIST announces CRYSTALS-Kyber, Dilithium, FALCON, SPHINCS+ as selections" },
        { year: 2024, event: "FIPS 203, 204, 205 published — world's first PQC standards" },
        { year: 2025, event: "FIPS 206 (FN-DSA/FALCON) expected finalization" },
      ],
      keyTakeaways: [
        "FIPS 203 (ML-KEM) = use for key exchange; FIPS 204 (ML-DSA) = use for signatures",
        "Hybrid mode (X25519 + ML-KEM-768) is recommended during transition — deploy now",
        "SIKE was broken classically — algorithm diversity (lattices + hash functions) is essential",
        "Message and key sizes are much larger than RSA — protocols and MTU configurations need updating",
      ],
      references: [
        { title: "NIST FIPS 203 — ML-KEM Standard", url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf" },
        { title: "NIST FIPS 204 — ML-DSA Standard", url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d03-q1", type: "Core Idea", challenge: "Aug 2024 standards.", text: "What did NIST finalize in August 2024?", options: ["The first post-quantum cryptographic standards: FIPS 203, 204, and 205","QKD over satellite","The end of AES","A new RSA key size"], correctIndex: 0, explanation: "NIST published FIPS 203 (ML-KEM), 204 (ML-DSA), and 205 (SLH-DSA) — the first PQC standards." },
        { id: "quantum-d03-q2", type: "Standards", challenge: "FIPS 203.", text: "What does FIPS 203 (ML-KEM) replace?", options: ["Quantum-vulnerable key establishment like RSA key transport and Diffie-Hellman","AES-256 bulk encryption","SHA-256 hashing","TLS itself"], correctIndex: 0, explanation: "ML-KEM is a key-encapsulation mechanism replacing classical key exchange/transport." },
        { id: "quantum-d03-q3", type: "Standards", challenge: "Signature standards.", text: "Which FIPS standards provide post-quantum digital signatures?", options: ["FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA)","FIPS 203 only","FIPS 140-3 only","FIPS 197 (AES)"], correctIndex: 0, explanation: "ML-DSA (204) and SLH-DSA (205) are the standardized PQC signature algorithms, replacing RSA/ECDSA signatures." },
        { id: "quantum-d03-q4", type: "Real World", challenge: "SIKE break.", text: "What does the SIKE break (solved in ~62 minutes on a single core) teach about PQC?", options: ["Algorithm diversity matters — even a NIST finalist can fall, so don't bet on one scheme","PQC is hopeless","SIKE is the safest choice","All lattice schemes are broken"], correctIndex: 0, explanation: "SIKE's collapse underscores why agility and a diverse algorithm portfolio are essential." },
        { id: "quantum-d03-q5", type: "Selection", challenge: "Choosing a standard.", text: "For general-purpose post-quantum key establishment in TLS, which standard is selected?", options: ["FIPS 203 ML-KEM (typically ML-KEM-768)","FIPS 205 SLH-DSA","RSA-4096","QKD"], correctIndex: 0, explanation: "ML-KEM is the KEM standard used (often hybridized) for quantum-safe TLS key exchange." },
        { id: "quantum-d03-q6", type: "Selection", challenge: "When SLH-DSA.", text: "Why might an organization choose SLH-DSA (FIPS 205) despite larger signatures?", options: ["It's hash-based with conservative, well-understood security assumptions — useful where lattice risk is a concern","It's the smallest signature","It's faster than AES","It needs no keys"], correctIndex: 0, explanation: "SLH-DSA's hash-based design offers diversity and conservative assurance as a hedge against lattice surprises." },
        { id: "quantum-d03-q7", type: "Implementation", challenge: "Deploying ML-KEM.", text: "When standing up the first PQC TLS server, what validates FIPS 203 compliance?", options: ["Confirming the ML-KEM-768 handshake completes and uses a validated implementation","Checking the favicon","Counting open ports","Disabling certificates"], correctIndex: 0, explanation: "A successful ML-KEM-768 handshake via a validated module demonstrates FIPS 203 deployment." },
        { id: "quantum-d03-q8", type: "Strategy", challenge: "Portfolio thinking.", text: "Given the SIKE lesson, how should standards be deployed?", options: ["With crypto agility so a broken algorithm can be swapped without redesign","Hardcode one algorithm forever","Use only experimental schemes","Avoid all NIST standards"], correctIndex: 0, explanation: "Agility lets you replace an algorithm (as SIKE would have required) without re-architecting systems." },
      ],
    },
    ctf: {
      scenario: "You're deploying the first PQC-enabled TLS server for a federal agency. Configure ML-KEM-768 key encapsulation, test the handshake, and validate FIPS 203 compliance.",
      hint: "Generate ML-KEM keys, configure TLS, and verify the algorithm negotiation.",
      hints: [
        "Read the deployment brief. Run: cat deploy-brief.txt",
        "Generate an ML-KEM-768 keypair. Run: pqc-keygen --alg ML-KEM-768",
        "Test the PQC TLS handshake. Run: pqc-tls-test --connect localhost:4433",
        "Run 'assemble' to certify deployment",
      ],
      fragments: [
        { trigger: "/deploy-brief.txt", value: "FLAG{FIPS203_", label: "Deploy Brief — PQC TLS Deployment Scope" },
        { trigger: "pqc-keygen", value: "ML_KEM_768_", label: "ML-KEM-768 Keypair Generated" },
        { trigger: "pqc-tls-test", value: "QUANTUM_SAFE}", label: "PQC TLS Handshake Verified" },
      ],
      files: {
        "/deploy-brief.txt": [
          "PQC TLS DEPLOYMENT — FEDERAL AGENCY",
          "Standard: NIST FIPS 203 (ML-KEM-768)",
          "Mode: Hybrid X25519+ML-KEM-768 (backward compatible)",
          "Goal: Protect all agency HTTPS traffic from HNDL attacks.",
          "Sequence: pqc-keygen → pqc-tls-test → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "deploy-brief.txt", isDir: false }] },
      extraCommands: {
        "pqc-keygen": (_args: string[]) => ({
          lines: [
            "Generating ML-KEM-768 keypair (NIST FIPS 203)...",
            "  Public key: 1184 bytes (vs RSA-2048: 256 bytes)",
            "  Private key: 2400 bytes",
            "  Security level: 3 (equivalent to AES-192)",
            "  Based on: Module Learning With Errors (MLWE) problem",
            "  Quantum attack resistance: Grover's gives sqrt speedup → still requires 2^96 ops",
            "Keypair saved. Configuring hybrid X25519+ML-KEM-768...",
            "  IANA code point: 0x11EC (x25519_mlkem768)",
            "  ClientHello key_share extension size: 1216 bytes (was 32 bytes for X25519 alone)",
            "Fragment collected.",
          ],
        }),
        "pqc-tls-test": (_args: string[]) => ({
          lines: [
            "Testing PQC TLS 1.3 handshake to localhost:4433...",
            "  Protocol: TLSv1.3",
            "  Cipher: TLS_AES_256_GCM_SHA384",
            "  Server Temp Key: X25519MLKEM768, 1216 bits",
            "  Key exchange: HYBRID (X25519 classical + ML-KEM-768 post-quantum)",
            "",
            "Quantum resistance assessment:",
            "  ✅ Key exchange: QUANTUM-SAFE (ML-KEM-768 resists Shor's)",
            "  ✅ Symmetric encryption: QUANTUM-SAFE (AES-256 resists Grover's)",
            "  ⚠️  Certificate signature: RSA-2048 (migrate to ML-DSA for full PQC)",
            "",
            "HNDL protection: ACTIVE — stored ciphertext cannot be decrypted by CRQC.",
            "Deployment certified. Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d04: CNSA 2.0 ───────────────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "NSA Information Assurance Directorate", location: "Fort Meade, Maryland, USA", era: "2022 CE", emoji: "🏛️" },
    id: "quantum-d04",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/NSA_Seal.svg/1200px-NSA_Seal.svg.png",
    order: 4,
    title: "CNSA 2.0 — National Security Mandate",
    subtitle: "NSA's Commercial National Security Algorithm Suite 2.0",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-cnsa2", name: "CNSA 2.0 Analyst", emoji: "🏛️" },
    challengeType: "ctf",
    info: {
      tagline: "CNSA 2.0 is NSA's mandatory algorithm suite for National Security Systems — the world's most stringent quantum-safe cryptography mandate.",
      year: 2022,
      overview: [
        "In September 2022, NSA published the Commercial National Security Algorithm Suite 2.0 (CNSA 2.0), replacing CNSA 1.0 which had endorsed RSA and ECC. CNSA 2.0 mandates specific post-quantum algorithms for all National Security Systems (NSS) — systems handling classified, sensitive compartmented information, or nuclear command and control. Unlike NIST FIPS standards which recommend, CNSA 2.0 mandates: all NSS must complete migration to these algorithms on strict timelines.",
        "CNSA 2.0 mandates: ML-KEM-1024 for key agreement (replacing all RSA and ECDH); ML-DSA-87 for digital signatures (replacing all RSA-PSS and ECDSA); LMS/XMSS (hash-based signatures) for firmware and software updates — required by 2025 for all NSS firmware; AES-256 for symmetric encryption; and SHA-384/SHA-512 for hashing. Notably absent: no more allowance for RSA, ECC, or pre-SHA-256 hash functions.",
        "CNSA 2.0 timelines are aggressive: software and firmware vendors providing NSS-used products must support CNSA 2.0 algorithms in new products by 2025; all NSS must exclusively use CNSA 2.0 algorithms by 2033. The 2025 firmware requirement (LMS/XMSS for firmware update signatures) means every router, switch, HSM, and server firmware pipeline serving national security customers must be upgraded within two years of the mandate's publication.",
      ],
      technical: {
        title: "CNSA 2.0 Algorithm Requirements and LMS Statefulness",
        body: [
          "CNSA 2.0 specifies: (1) Key establishment: ML-KEM-1024 (level 5, top-secret) — ciphertext 1568 bytes, public key 1568 bytes; (2) Digital signatures: ML-DSA-87 (level 5) — signature 4627 bytes; (3) Software/firmware signing: LMS (Leighton-Micali Signature) or XMSS — stateful hash-based, must track state in HSM to prevent key reuse; (4) Symmetric: AES-256-GCM or AES-256-CCM only (AES-128 deprecated); (5) Hashing: SHA-384 or SHA-512 only.",
          "The LMS/XMSS requirement for firmware is noteworthy because these are stateful signature schemes — they use one-time signature keys that must never be reused. If an LMS key state is lost (power failure, backup restoration) or reused (software bug), the security guarantee fails. CNSA 2.0 requires LMS state management in hardware security modules (HSMs) with atomic state updates. This is a departure from current practice where firmware signing typically uses RSA or ECDSA with no statefulness requirement.",
        ],
        codeExample: {
          label: "LMS stateful firmware signing — state must be atomically stored in HSM",
          code: `# CNSA 2.0 requires LMS/XMSS for firmware update signatures
# WARNING: Key state MUST be atomically stored — reuse breaks security
from lms import LMS, LMS_SHA256_M32_H10, LMOTS_SHA256_N32_W8

lms_key = LMS(LMS_SHA256_M32_H10, LMOTS_SHA256_N32_W8)
pub_key, priv_key_state = lms_key.generate_key()

# Sign firmware image — each signing consumes one OTS key
with open("firmware_v2.bin", "rb") as f:
    firmware_bytes = f.read()

signature, updated_state = lms_key.sign(firmware_bytes, priv_key_state)

# CRITICAL: updated_state MUST be written to HSM atomically before returning
# If power fails between sign() and state save → key reuse vulnerability
save_to_hsm_atomic(updated_state)  # atomic write required

print(f"LMS signature size: {len(signature)} bytes")
print(f"Remaining OTS keys: {lms_key.remaining_keys(updated_state)}")
# LMS_H10 provides 1024 one-time keys — sufficient for firmware lifecycle`,
        },
      },
      incident: {
        title: "NSA Abandons ECC After 15 Years — CNSA 1.0 Sunset",
        when: "2022",
        where: "NSA, Defense industrial base, National Security Systems",
        impact: "Every NSS product — routers, HSMs, VPNs, classified comms — requires algorithm redesign by 2025",
        body: [
          "CNSA 1.0, published in 2015, had endorsed Suite B algorithms including ECDH and ECDSA — the same algorithms NSA had championed for 15 years and encouraged allies and defense contractors to standardize on. When CNSA 2.0 deprecated all ECC-based algorithms in 2022, it represented the NSA admitting that its own previous standards were now inadequate — before Q-Day had arrived. Every prime contractor (Lockheed, Raytheon, Boeing, Northrop, General Dynamics) had built classified systems on CNSA 1.0 ECC.",
          "The practical impact on the defense industrial base was enormous. HSM vendors (Thales, Entrust, Utimaco) had to ship firmware updates supporting ML-KEM and LMS. VPN vendors serving DoD (Palo Alto, Cisco, Juniper) had to redesign their classified variant IKEv2 implementations. The 2025 firmware deadline created an emergency procurement cycle — prime contractors could not deliver CNSA 2.0 compliant systems unless their component vendors (chip fabs, firmware RTOS vendors, HSM suppliers) all updated their products first.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CNSA 1.0 (2015)", sub: "RSA-3072, ECDH-384, ECDSA-384 endorsed", type: "victim" },
          { label: "CNSA 2.0 (2022)", sub: "All RSA/ECC deprecated — quantum threat", type: "attacker" },
          { label: "ML-KEM-1024", sub: "NSS key agreement mandate", type: "result" },
          { label: "LMS/XMSS 2025", sub: "Firmware signing mandate — stateful HSM", type: "system" },
        ],
      },
      timeline: [
        { year: 2015, event: "CNSA 1.0 endorses ECC Suite B — 15 years of adoption begins" },
        { year: 2022, event: "CNSA 2.0 published — all ECC deprecated, PQC mandated", highlight: true },
        { year: 2025, event: "CNSA 2.0 deadline: new NSS products must support ML-KEM + LMS" },
        { year: 2030, event: "CNSA 2.0 deadline: priority NSS systems exclusively use CNSA 2.0" },
        { year: 2033, event: "CNSA 2.0 deadline: all NSS must exclusively use CNSA 2.0 algorithms" },
      ],
      keyTakeaways: [
        "CNSA 2.0 mandates ML-KEM-1024 and ML-DSA-87 — level 5, stricter than NIST FIPS minimums",
        "LMS/XMSS for firmware signing is stateful — requires HSM atomic state management to prevent reuse",
        "NSS vendors must support CNSA 2.0 in new products by 2025 — emergency redesign cycle active",
        "CNSA 2.0 deprecating ECC after 15 years shows cryptographic standards require periodic reassessment",
      ],
      references: [
        { title: "NSA CNSA 2.0 — Commercial National Security Algorithm Suite", url: "https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF" },
        { title: "NSA LMS/XMSS Guidance", url: "https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d04-q1", type: "Core Idea", challenge: "CNSA 2.0 scope.", text: "What is CNSA 2.0?", options: ["NSA's mandatory quantum-safe algorithm suite for National Security Systems","A consumer VPN app","A NIST competition","A QKD satellite"], correctIndex: 0, explanation: "CNSA 2.0 is the NSA's stringent algorithm mandate governing National Security Systems." },
        { id: "quantum-d04-q2", type: "Real World", challenge: "ECC sunset.", text: "What did the NSA do that signaled the urgency behind CNSA 2.0?", options: ["Abandoned ECC after ~15 years, sunsetting CNSA 1.0 in favor of post-quantum algorithms","Adopted RSA-512","Endorsed SIKE","Banned AES"], correctIndex: 0, explanation: "NSA's move off ECC after 15 years marked a decisive pivot to quantum-safe cryptography." },
        { id: "quantum-d04-q3", type: "Implementation", challenge: "LMS statefulness.", text: "What operational caution applies to the stateful hash-based signatures (e.g., LMS) allowed under CNSA 2.0?", options: ["State must never be reused — reusing a one-time key index catastrophically breaks security","They are stateless and carefree","They require QKD","They use RSA internally"], correctIndex: 0, explanation: "Stateful schemes like LMS demand strict state management; reusing an index destroys the signature's security." },
        { id: "quantum-d04-q4", type: "Compliance", challenge: "Auditing a vendor.", text: "When auditing an NSS vendor for CNSA 2.0 compliance, what do you validate?", options: ["Correct approved algorithms, key sizes, and adherence to the migration timeline","Their marketing slogans","The color of their logo","Their office location"], correctIndex: 0, explanation: "Compliance review checks that approved algorithms and parameters are implemented on schedule." },
        { id: "quantum-d04-q5", type: "Concept", challenge: "Why most stringent.", text: "Why is CNSA 2.0 considered the world's most stringent quantum-safe mandate?", options: ["It is mandatory for the highest-assurance national security systems with firm timelines","It is optional guidance","It permits any algorithm","It applies only to websites"], correctIndex: 0, explanation: "CNSA 2.0 imposes binding requirements on systems with the highest security stakes." },
        { id: "quantum-d04-q6", type: "Implementation", challenge: "State management.", text: "What infrastructure control prevents LMS index reuse in practice?", options: ["Hardware/secure state tracking that atomically advances and persists the key index","Random selection of indices","Disabling logging","Using RSA instead"], correctIndex: 0, explanation: "Reliable, atomic state persistence ensures each one-time key index is used exactly once." },
        { id: "quantum-d04-q7", type: "Compliance", challenge: "Timeline adherence.", text: "Beyond algorithm choice, what else does CNSA 2.0 compliance require?", options: ["Meeting the mandated migration milestones and deadlines","Only a one-time self-assessment","Nothing further","Using QKD exclusively"], correctIndex: 0, explanation: "CNSA 2.0 specifies a phased timeline; staying on schedule is part of compliance." },
        { id: "quantum-d04-q8", type: "Strategy", challenge: "NSS vs civilian.", text: "How does the NSS path under CNSA 2.0 differ from civilian federal PQC adoption?", options: ["NSS follow NSA's mandatory suite and Type 1 process, distinct from civilian CMVP-driven adoption","They are identical","NSS skip all standards","Civilian systems are stricter"], correctIndex: 0, explanation: "NSS operate under NSA's CNSA/Type 1 regime, separate from the civilian CMVP track." },
      ],
    },
    ctf: {
      scenario: "You're auditing an NSS vendor's CNSA 2.0 compliance. Validate their algorithm implementations and timeline adherence.",
      hint: "Read the audit scope, check algorithm compliance, then assess timeline adherence.",
      hints: [
        "Read the audit scope. Run: cat audit-scope.txt",
        "Check vendor algorithm implementations. Run: cnsa2-audit --vendor nss-vendor-a",
        "Assess timeline compliance. Run: cnsa2-timeline-check --deadline 2025",
        "Run 'assemble' to submit the compliance report",
      ],
      fragments: [
        { trigger: "/audit-scope.txt", value: "FLAG{CNSA2_", label: "Audit Scope — NSS Vendor Compliance Check" },
        { trigger: "cnsa2-audit", value: "MANDATE_", label: "Algorithm Audit — CNSA 2.0 Gap Analysis" },
        { trigger: "cnsa2-timeline-check", value: "NSS_COMPLIANT}", label: "Timeline Assessment — 2025 Deadline Status" },
      ],
      files: {
        "/audit-scope.txt": [
          "CNSA 2.0 COMPLIANCE AUDIT — NSS VENDOR A",
          "Scope: VPN appliance, HSM firmware, classified TLS endpoints.",
          "Deadline: 2025 new product compliance (NSA mandate).",
          "Sequence: cnsa2-audit → cnsa2-timeline-check → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "audit-scope.txt", isDir: false }] },
      extraCommands: {
        "cnsa2-audit": (_args: string[]) => ({
          lines: [
            "Auditing NSS Vendor A for CNSA 2.0 compliance...",
            "",
            "VPN appliance (IKEv2):",
            "  Current: ECDH-384 + AES-256 [NON-COMPLIANT — ECC deprecated by CNSA 2.0]",
            "  Required: ML-KEM-1024 + AES-256-GCM",
            "  Status: Engineering in progress, ETA Q2 2025",
            "",
            "HSM firmware signing:",
            "  Current: ECDSA-384 [NON-COMPLIANT — must use LMS or XMSS by 2025]",
            "  Required: LMS-SHA256-H10 with HSM state management",
            "  Status: Design complete, implementation 60% — at risk for 2025 deadline",
            "",
            "Classified TLS endpoints:",
            "  Current: ML-KEM-1024 + ML-DSA-87 [COMPLIANT]",
            "Overall: 2/3 components non-compliant. Fragment collected.",
          ],
        }),
        "cnsa2-timeline-check": (_args: string[]) => ({
          lines: [
            "Assessing CNSA 2.0 2025 deadline compliance...",
            "Days to deadline: 218 (FY2025 end)",
            "VPN appliance: Engineering in progress — 85% probability on-time",
            "HSM firmware: Implementation 60% — 45% probability on-time",
            "",
            "Risk: HSM firmware LMS state management requires HSM vendor cooperation.",
            "Vendor dependency: Thales HSM firmware must ship LMS support by Q1 2025.",
            "Current Thales commitment: Beta firmware available Q1 2025.",
            "",
            "Recommendation: Escalate HSM timeline to program office.",
            "Contingency: Interim RSA-PSS signing with documented exception and",
            "             written NSA/CNSS waiver required if deadline missed.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d05: Migration Roadmap ──────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "CISA Cybersecurity Division HQ", location: "Washington, D.C., USA", era: "2024 CE", emoji: "🗺️" },
    id: "quantum-d05",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Seal_of_the_United_States_Cybersecurity_and_Infrastructure_Security_Agency.svg/1200px-Seal_of_the_United_States_Cybersecurity_and_Infrastructure_Security_Agency.svg.png",
    order: 5,
    title: "The Migration Roadmap",
    subtitle: "Phased PQC Transition — Prioritize, Phase, Execute",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-migration", name: "PQC Migration Planner", emoji: "🗺️" },
    challengeType: "ctf",
    info: {
      tagline: "Post-quantum migration is a 5–10 year program, not a patch cycle. CISA's roadmap provides the framework.",
      year: 2023,
      overview: [
        "CISA's Post-Quantum Cybersecurity Roadmap (November 2023) organizes migration into five phases: (1) Inventory — complete CBOM for all systems; (2) Prioritize — identify critical systems by data sensitivity and exposure; (3) Plan — develop system-specific migration schedules; (4) Implement — deploy hybrid PQC algorithms; (5) Validate — verify PQC implementations and remove classical fallbacks. Each phase has measurable milestones and is designed to run in parallel across large organizations.",
        "Prioritization follows a risk-based approach. Systems handling data with long secrecy horizons (classified material, healthcare records, legal documents) must migrate first because they are already at HNDL risk. Internet-facing systems with RSA/ECC key exchange migrate next because they are exposed to bulk collection. Internal systems and legacy/air-gapped systems can migrate later. CISA recommends a 'crypto agility' design principle: build systems so cryptographic algorithms can be updated without full redesign, ensuring organizations can respond to future cryptographic breaks.",
        "Common migration blockers include: PKI dependencies (leaf certificates cannot migrate before root CAs); hardware-constrained systems (IoT, embedded, SCADA) with insufficient compute for lattice-based algorithms; legacy application protocols with hardcoded algorithm negotiation; and third-party software dependencies with no PQC roadmap. CISA recommends a vendor engagement program: organizations should formally query all software and hardware vendors for PQC support timelines.",
      ],
      technical: {
        title: "Phased Migration Architecture — Hybrid First, Pure PQC Later",
        body: [
          "Phase 1 (Hybrid, 2024–2027): Deploy ML-KEM alongside existing ECDH/RSA in all new system deployments. Use hybrid key exchange in TLS (X25519+ML-KEM-768) and IKE (ECDH+ML-KEM-1024). This provides HNDL protection immediately while maintaining backward compatibility. Phase 2 (PQC Primary, 2027–2030): Retire classical key exchange from internal systems. Phase 3 (Pure PQC, 2030+): Remove all classical key exchange. Retire RSA-based PKI. Deploy ML-DSA root CAs.",
          "Crypto agility implementation: use a cryptographic abstraction layer that separates algorithm selection from application logic. OpenSSL 3.x provider API, Java JCA providers, and Go crypto/x509 all support algorithm swapping without application changes. Tag all cryptographic operations with algorithm identifiers in logs for future audit. Avoid hardcoding algorithm OIDs or key sizes in application code.",
        ],
        codeExample: {
          label: "Crypto-agile nginx TLS configuration — algorithm selection via config",
          code: `# nginx with openssl-oqs-provider — swap algorithms via config, not code
# /etc/nginx/nginx.conf

server {
    listen 443 ssl;
    ssl_certificate     /certs/server-hybrid.crt;
    ssl_certificate_key /certs/server.key;

    # Phase 1: Hybrid key exchange — PQC + classical
    ssl_ecdh_curve x25519_mlkem768:secp384r1;

    # Phase 3 (future): Pure PQC — just change this one line
    # ssl_ecdh_curve mlkem1024;

    ssl_protocols TLSv1.3;
    ssl_ciphers   TLS_AES_256_GCM_SHA384;

    # Log negotiated algorithm for CBOM tracking
    log_format pqc_audit '$remote_addr "$ssl_curve" "$ssl_cipher"';
    access_log /var/log/nginx/pqc-audit.log pqc_audit;
}`,
        },
      },
      incident: {
        title: "The 2030 Federal PQC Deadline — $7.1 Billion Migration Race",
        when: "2024–2030",
        where: "U.S. federal civilian and national security systems",
        impact: "Estimated $7.1 billion federal IT migration cost; 6-year transition window against quantum timeline",
        body: [
          "OMB Memorandum M-23-02 (December 2022) set an aggressive federal timeline: agencies must develop PQC migration plans by 2024 and prioritize high-value assets for migration by 2030 — the year some intelligence estimates place earliest CRQC availability. The GAO assessed in 2023 that federal agencies collectively manage thousands of systems using RSA and ECC, and that full migration within the 2030 target was 'highly challenging' given procurement lead times, contractor dependencies, and the historical pace of federal IT modernization.",
          "The challenge is compounded by the federal acquisition cycle: a system procured in 2024 using RSA will be used through 2035 or later, past the CRQC timeline. OMB's response was to require that all new IT procurements include PQC support mandates — vendors bidding on federal contracts must demonstrate a roadmap for CNSA 2.0 or FIPS 203/204/205 compliance. CISA runs a dedicated technical assistance program to help agencies prioritize their migrations when they lack internal cryptographic expertise.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Phase 1: Hybrid", sub: "2024–2027: HNDL protection now", type: "result" },
          { label: "Phase 2: PQC Primary", sub: "2027–2030: Retire classical KEM", type: "system" },
          { label: "Phase 3: Pure PQC", sub: "2030+: Remove all RSA/ECC", type: "result" },
          { label: "Crypto Agility", sub: "Algorithm swap without redesign", type: "system" },
        ],
      },
      timeline: [
        { year: 2022, event: "OMB M-23-02: federal PQC migration planning mandated" },
        { year: 2023, event: "CISA Post-Quantum Cybersecurity Roadmap published", highlight: true },
        { year: 2024, event: "NIST FIPS 203/204/205 final — migration algorithm baseline set" },
        { year: 2027, event: "Target: all federal internet-facing systems in hybrid mode" },
        { year: 2030, event: "Target: priority systems migrated to pure PQC" },
      ],
      keyTakeaways: [
        "CISA's 5-phase roadmap: Inventory → Prioritize → Plan → Implement → Validate",
        "Hybrid mode (classical + PQC) provides immediate HNDL protection with backward compatibility",
        "Crypto agility — abstract algorithm selection from application logic — is essential for future-proofing",
        "New federal procurements must mandate PQC support to avoid locking in RSA/ECC through 2035+",
      ],
      references: [
        { title: "CISA Post-Quantum Cybersecurity Roadmap (2023)", url: "https://www.cisa.gov/sites/default/files/2023-11/CISA-2023-Post-Quantum-Cybersecurity-Roadmap.pdf" },
        { title: "OMB M-23-02: Migrating to Post-Quantum Cryptography", url: "https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d05-q1", type: "Core Idea", challenge: "Program not patch.", text: "Why is post-quantum migration framed as a 5–10 year program rather than a patch cycle?", options: ["It requires inventory, prioritization, infrastructure replacement, and coordination across many systems","Because vendors are slow","Because QKD is illegal","Because RSA never expires"], correctIndex: 0, explanation: "Migration touches PKI, HSMs, protocols, and vendors — a multi-year transformation, not a quick fix." },
        { id: "quantum-d05-q2", type: "Architecture", challenge: "Hybrid first.", text: "What does the phased 'hybrid first, pure PQC later' architecture mean?", options: ["Deploy classical+PQC combined now for safety and compatibility, transition to pure PQC as it matures","Use only PQC immediately everywhere","Keep RSA forever","Skip PQC entirely"], correctIndex: 0, explanation: "Hybrid provides defense-in-depth and interoperability during transition before moving to pure PQC." },
        { id: "quantum-d05-q3", type: "Real World", challenge: "2030 deadline.", text: "What does the '2030 federal PQC deadline' and '$7.1 billion migration race' refer to?", options: ["The federal target to migrate prioritized systems to PQC, with multi-billion-dollar estimated cost","A QKD satellite launch","An RSA renewal fee","A single agency's budget"], correctIndex: 0, explanation: "Federal guidance sets ~2030 milestones; the government-wide cost is estimated in the billions." },
        { id: "quantum-d05-q4", type: "Strategy", challenge: "Prioritizing systems.", text: "When building a financial institution's PQC roadmap, what drives prioritization?", options: ["HNDL risk — systems handling long-lived sensitive data migrate first","Alphabetical order of hostnames","Newest hardware first","Cheapest systems first"], correctIndex: 0, explanation: "HNDL exposure determines urgency; long-secrecy data in transit leads the schedule." },
        { id: "quantum-d05-q5", type: "Planning", challenge: "Identifying blockers.", text: "Which is a common migration blocker the roadmap must surface?", options: ["Legacy HSMs or vendor products that can't support PQC without replacement","Too many available algorithms","Excess budget","Overly fast networks"], correctIndex: 0, explanation: "Hardware and vendor limitations frequently gate migration and must be identified early." },
        { id: "quantum-d05-q6", type: "Concept", challenge: "Why phased.", text: "Why not switch directly to pure PQC across all systems at once?", options: ["Interoperability, immature implementations, and operational risk make a phased hybrid approach safer","Pure PQC is illegal","It would be cheaper to do all at once","Hybrid offers no benefit"], correctIndex: 0, explanation: "A phased hybrid path manages compatibility and implementation maturity risks." },
        { id: "quantum-d05-q7", type: "Framework", challenge: "CISA roadmap role.", text: "What does CISA's migration roadmap provide to organizations?", options: ["A structured framework of phases for discovery, prioritization, and migration","Free quantum computers","A list of banned algorithms only","Tax incentives"], correctIndex: 0, explanation: "CISA's roadmap gives a repeatable, phased framework to organize a multi-year migration." },
        { id: "quantum-d05-q8", type: "Defense", challenge: "Sustaining the program.", text: "What governance element keeps a multi-year PQC program on track?", options: ["Executive sponsorship, sustained budget, and milestone-based phase gates","A single kickoff email","Removing the CBOM","Ad-hoc volunteer effort"], correctIndex: 0, explanation: "Multi-year programs need funding, ownership, and phase gates to survive leadership and budget cycles." },
      ],
    },
    ctf: {
      scenario: "You're building a PQC migration roadmap for a financial institution. Prioritize systems by HNDL risk, design the phased migration timeline, and identify blockers.",
      hint: "Inventory the system portfolio, apply CISA prioritization, then schedule the migration phases.",
      hints: [
        "Review the system portfolio. Run: cat systems-portfolio.txt",
        "Apply CISA prioritization. Run: pqc-prioritize --data-sensitivity high",
        "Generate the phased migration timeline. Run: pqc-roadmap --phases 3",
        "Run 'assemble' to submit the roadmap",
      ],
      fragments: [
        { trigger: "/systems-portfolio.txt", value: "FLAG{PQC_ROAD", label: "System Portfolio — Cryptographic Asset Inventory" },
        { trigger: "pqc-prioritize", value: "MAP_PHASE_", label: "Prioritization Matrix — HNDL Risk Ranking" },
        { trigger: "pqc-roadmap", value: "PLAN_EXECUTE}", label: "Migration Roadmap — 3-Phase Timeline Generated" },
      ],
      files: {
        "/systems-portfolio.txt": [
          "FINANCIAL INSTITUTION — PQC MIGRATION PORTFOLIO",
          "System A: Internet banking TLS (RSA-2048, 50M users, sensitivity: HIGH)",
          "System B: Wire transfer settlement (RSA-4096, $2B/day, sensitivity: CRITICAL)",
          "System C: Internal HR portal (RSA-2048, sensitivity: MEDIUM)",
          "System D: ATM network HSMs (RSA-2048, hardware lifecycle 2030, sensitivity: HIGH)",
          "System E: Email S/MIME (RSA-2048, sensitivity: MEDIUM)",
          "Sequence: pqc-prioritize → pqc-roadmap → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "systems-portfolio.txt", isDir: false }] },
      extraCommands: {
        "pqc-prioritize": (_args: string[]) => ({
          lines: [
            "Applying CISA prioritization matrix (data sensitivity + HNDL exposure)...",
            "",
            "Priority 1 — CRITICAL (migrate Phase 1 by 2025):",
            "  System B: Wire transfer — $2B/day, CRITICAL sensitivity, HNDL risk immediate",
            "",
            "Priority 2 — HIGH (migrate Phase 1 by 2026):",
            "  System A: Internet banking — 50M users, RSA exposed, HNDL bulk collection risk",
            "  System D: ATM HSMs — hardware lifecycle forces migration before 2030 EOL",
            "",
            "Priority 3 — MEDIUM (migrate Phase 2 by 2028):",
            "  System C: HR portal — lower sensitivity, internal only",
            "  System E: Email — S/MIME migration to ML-DSA",
            "Fragment collected.",
          ],
        }),
        "pqc-roadmap": (_args: string[]) => ({
          lines: [
            "Generating 3-phase migration roadmap...",
            "",
            "Phase 1 (2024-2026): Hybrid deployment — HNDL protection",
            "  2024 Q4: Deploy X25519+ML-KEM-768 for System B wire transfer TLS",
            "  2025 Q2: Deploy X25519+ML-KEM-768 for System A internet banking",
            "  2025 Q4: Procure ML-KEM-capable HSMs for System D ATM network",
            "  Blocker: ATM HSM vendor PQC firmware ETA 2025 Q3",
            "",
            "Phase 2 (2026-2028): PQC primary — internal systems",
            "  2026: Systems C, E migrate to ML-KEM/ML-DSA",
            "  2027: ATM HSM PQC firmware deployed, RSA retired from HSMs",
            "",
            "Phase 3 (2028-2030): Pure PQC — retire classical",
            "  2028: PKI root CA migrated to ML-DSA-87",
            "  2030: Classical key exchange disabled enterprise-wide",
            "",
            "Total cost estimate: $8.2M over 6 years.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d06: Sector Risk ─────────────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "Federal Reserve Board", location: "Washington, D.C., USA", era: "2024 CE", emoji: "🏦" },
    id: "quantum-d06",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/US-FederalReserveSystem-Seal.svg/1200px-US-FederalReserveSystem-Seal.svg.png",
    order: 6,
    title: "Who's Most Exposed?",
    subtitle: "Sector-Specific Quantum Risk — Finance, Healthcare, Energy, Defense",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-sector", name: "Sector Risk Assessor", emoji: "🏦" },
    challengeType: "ctf",
    info: {
      tagline: "Quantum risk is not uniform — financial settlement infrastructure and nuclear command systems have vastly different exposure profiles.",
      year: 2024,
      overview: [
        "Quantum risk varies dramatically by sector based on three factors: the sensitivity and longevity of protected data, the complexity and lifecycle of cryptographic infrastructure, and the regulatory and operational constraints on migration timelines. Financial services face the most acute HNDL risk because wire transfer networks, SWIFT messaging, and securities settlement systems carry data that is immediately valuable if decrypted and use cryptographic hardware (HSMs, payment terminals) with decade-long replacement cycles.",
        "Energy and critical infrastructure face a different risk profile: SCADA systems controlling power grids, water treatment, and pipelines use industrial control protocols (Modbus, DNP3, IEC 61850) that were designed with no cryptographic security and have since been retrofitted with RSA/ECC wrappers. These systems often run on dedicated hardware with 20–30 year lifecycles and cannot be updated remotely — quantum migration requires physical access to thousands of field devices.",
        "Blockchain networks present a unique quantum vulnerability: every Bitcoin and Ethereum address is derived from an elliptic curve public key (secp256k1 ECDSA). A CRQC running Shor's Algorithm can recover the private key from any exposed public key — allowing theft of any wallet whose public key has appeared on-chain. All addresses that have ever sent a transaction have exposed their public key. Analysts estimate approximately 4 million Bitcoin (in P2PK outputs) are directly quantum-vulnerable.",
      ],
      technical: {
        title: "Sector Quantum Risk Scoring Matrix",
        body: [
          "Financial services risk breakdown: (1) SWIFT messaging — RSA-2048 and 3DES in SWIFT PKI, with 11,000 member institutions requiring coordinated migration; (2) Central bank settlement — Fedwire, TARGET2, CHIPS use hardware HSMs with RSA, quantum compromise would allow forged settlement instructions; (3) Payment card (PCI-DSS) — RSA used in PIN encryption and terminal authentication. Healthcare risk: HIPAA requires 75-year record confidentiality for some record types — HNDL risk spans the entire CRQC timeline.",
          "Scoring formula: Risk Score = (data_longevity × 0.40) + (hndl_exposure × 0.35) + (migration_complexity × 0.25). Highest-risk sector profiles: classified government (0.90+), healthcare (0.85), financial settlement (0.80), blockchain (ECDSA key exposure — direct Shor's attack vector). Lowest-risk: web analytics, ephemeral session data, public content.",
        ],
        codeExample: {
          label: "Sector quantum risk scoring function",
          code: `def quantum_risk_score(sector: dict) -> dict:
    longevity_risk = {
        "medical": 0.95,      # 75-year HIPAA requirement
        "classified": 0.90,   # indefinite classification
        "financial": 0.80,    # wire transfers — retroactive fraud risk
        "blockchain": 0.95,   # ECDSA key on-chain = Shor's recoverable
        "hr": 0.40,           # employee records 7 years
        "web_analytics": 0.05,
    }
    complexity_map = {
        "scada_field": 0.95,      # physical access, 30-year cycles
        "payment_terminal": 0.85, # 500K+ terminals, HSM replacement
        "cloud_saas": 0.20,       # vendor-managed, fast rotation
        "web_server": 0.15,       # TLS config update, fast
    }
    hndl_exposure = sector.get("internet_facing", False) * 0.9
    score = (
        longevity_risk.get(sector["data_type"], 0.5) * 0.40 +
        hndl_exposure * 0.35 +
        complexity_map.get(sector["infra_type"], 0.5) * 0.25
    )
    priority = "CRITICAL" if score > 0.7 else "HIGH" if score > 0.4 else "MEDIUM"
    return {"score": round(score * 100), "priority": priority}`,
        },
      },
      incident: {
        title: "Blockchain's Quantum Vulnerability — $250 Billion in Exposed Digital Assets",
        when: "2024 (risk assessment)",
        where: "Bitcoin, Ethereum, and all ECDSA-based blockchain networks",
        impact: "Approximately 4 million Bitcoin in P2PK outputs (exposed public keys) directly vulnerable to Shor's Algorithm",
        body: [
          "Every Bitcoin and Ethereum address is derived from an elliptic curve public key (secp256k1 ECDSA). A CRQC running Shor's Algorithm can recover the private key from any public key — allowing theft of any blockchain wallet whose public key has been exposed on-chain. Exposed public keys include all addresses that have ever sent a transaction (the public key is revealed when signing the first outgoing transaction), and all pay-to-public-key (P2PK) outputs (common in early Bitcoin, including Satoshi's early coinbase rewards).",
          "Analysts estimate that approximately 4 million Bitcoin — roughly $250 billion at 2024 prices — are in P2PK outputs with exposed public keys. The Bitcoin and Ethereum developer communities have begun designing quantum-resistant address formats using ML-DSA and hash-based schemes, but migrating existing funds requires a cryptographic soft fork that users must actively participate in. Any fund in a quantum-vulnerable address that is not migrated before Q-Day can be stolen. The Ethereum Foundation's roadmap explicitly includes post-quantum migration as a long-term objective.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Financial: CRITICAL", sub: "SWIFT, HSM, settlement — HNDL immediate", type: "attacker" },
          { label: "Healthcare: HIGH", sub: "75-year HIPAA — HNDL spans entire window", type: "victim" },
          { label: "SCADA: HIGH", sub: "30-year lifecycle, physical access needed", type: "system" },
          { label: "Blockchain: CRITICAL", sub: "ECDSA private key recovery via Shor's", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2022, event: "Ethereum Foundation adds PQC to long-term roadmap" },
        { year: 2023, event: "FSB and BIS publish quantum risk guidance for financial institutions" },
        { year: 2024, event: "FDA guidance: new medical devices must include PQC roadmap in submissions", highlight: true },
        { year: 2025, event: "NERC CIP updates expected to include quantum risk for energy sector" },
        { year: 2030, event: "Target: all critical infrastructure priority systems migrated to PQC" },
      ],
      keyTakeaways: [
        "Financial services face highest HNDL risk — wire transfers and settlement data immediately valuable",
        "Healthcare data has 75-year HIPAA longevity — HNDL risk spans the entire CRQC timeline",
        "SCADA quantum migration requires physical access to thousands of field devices — plan years ahead",
        "All ECDSA blockchain assets are quantum-vulnerable — Bitcoin P2PK outputs directly exposed",
      ],
      references: [
        { title: "FSB Report on Quantum Risks to Financial Stability", url: "https://www.fsb.org/" },
        { title: "NERC CIP: Quantum Computing Risk to Power Grid", url: "https://www.nerc.com/" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d06-q1", type: "Core Idea", challenge: "Risk not uniform.", text: "Why is quantum risk not uniform across sectors?", options: ["Different sectors have vastly different data secrecy lifetimes and exposure profiles","All sectors use the same systems","Only banks use encryption","Quantum affects only governments"], correctIndex: 0, explanation: "A nuclear command system and a retail catalog have wildly different secrecy and exposure needs." },
        { id: "quantum-d06-q2", type: "Analysis", challenge: "Scoring matrix.", text: "What does a sector quantum risk scoring matrix help an analyst do?", options: ["Rank assets/sectors by data sensitivity, secrecy lifetime, and quantum exposure","Pick a logo color","Count employees","Measure latency"], correctIndex: 0, explanation: "The matrix structures prioritization by combining sensitivity, longevity, and exposure." },
        { id: "quantum-d06-q3", type: "Real World", challenge: "Blockchain exposure.", text: "Why is blockchain singled out with '$250 billion in exposed digital assets' at quantum risk?", options: ["Exposed public keys and ECDSA signatures let a quantum attacker forge transactions/steal funds","Blockchains use no cryptography","They rely on QKD","They are immune by design"], correctIndex: 0, explanation: "Reused/exposed public keys on-chain are vulnerable to Shor's algorithm, threatening huge asset value." },
        { id: "quantum-d06-q4", type: "Analysis", challenge: "Banking infrastructure.", text: "Assessing a regional bank's HNDL exposure, which systems warrant top scrutiny?", options: ["SWIFT payment infrastructure, ATM HSM networks, and digital asset custody","The cafeteria POS","Marketing email lists","Employee parking app"], correctIndex: 0, explanation: "Settlement, key-management, and custody systems carry the highest-value, longest-secrecy data." },
        { id: "quantum-d06-q5", type: "Concept", challenge: "Settlement vs command.", text: "Why might financial settlement and nuclear command systems sit at opposite ends of a risk profile?", options: ["They differ in secrecy duration, threat actors, and consequence of compromise","They use the same key","Neither uses cryptography","They have identical risk"], correctIndex: 0, explanation: "Exposure profiles diverge by data lifetime, adversary, and impact — driving different priorities." },
        { id: "quantum-d06-q6", type: "Strategy", challenge: "Custody priority.", text: "Within the bank, why does digital asset custody rank high for quantum migration?", options: ["Private keys protect directly fungible value and signatures are quantum-forgeable","It has the least data","It is offline forever","It uses no keys"], correctIndex: 0, explanation: "Custody keys guard liquid value, and quantum-forgeable signatures make them prime targets." },
        { id: "quantum-d06-q7", type: "Analysis", challenge: "HSM network risk.", text: "Why are ATM/HSM key networks a notable quantum concern for banks?", options: ["They distribute and protect cryptographic keys whose compromise scales across the network","They store no keys","They are air-gapped from money","They use QKD"], correctIndex: 0, explanation: "Key-management infrastructure compromise has broad, networked impact on financial operations." },
        { id: "quantum-d06-q8", type: "Defense", challenge: "Sector-driven plan.", text: "How should sector risk scoring shape a migration plan?", options: ["Migrate the highest-scoring (most exposed, longest-secrecy) systems first","Migrate the lowest-risk systems first","Migrate alphabetically","Migrate nothing until 2030"], correctIndex: 0, explanation: "Risk-based sequencing directs scarce resources to where quantum exposure is greatest." },
      ],
    },
    ctf: {
      scenario: "You're the quantum risk lead for a regional bank. Assess HNDL exposure across SWIFT payment infrastructure, ATM HSM network, and digital asset custody vault.",
      hint: "Analyze each system's HNDL exposure, score by sector risk matrix, then produce the risk register.",
      hints: [
        "Read the bank system inventory. Run: cat bank-inventory.txt",
        "Score SWIFT quantum risk. Run: sector-risk --system swift",
        "Score ATM HSM quantum risk. Run: sector-risk --system atm-hsm",
        "Run 'assemble' to submit the risk register",
      ],
      fragments: [
        { trigger: "/bank-inventory.txt", value: "FLAG{SECTOR_Q", label: "Bank Inventory — System CBOM Summary" },
        { trigger: "sector-risk --system swift", value: "RISK_MATRIX_", label: "SWIFT Risk Score — HNDL Critical" },
        { trigger: "sector-risk --system atm-hsm", value: "FINANCIAL}", label: "ATM HSM Risk Score — Hardware Lifecycle Risk" },
      ],
      files: {
        "/bank-inventory.txt": [
          "REGIONAL BANK — QUANTUM RISK INVENTORY",
          "System: SWIFT messaging (RSA-2048, internet-facing, $450M/day)",
          "System: ATM HSM network (RSA-2048, 2,400 terminals, hardware 2028 EOL)",
          "System: Digital asset custody (ECDSA secp256k1, $120M AUM)",
          "Sequence: sector-risk --system swift → sector-risk --system atm-hsm → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "bank-inventory.txt", isDir: false }] },
      extraCommands: {
        "sector-risk": (args: string[]) => {
          const system = args.find(a => a !== "--system") ?? "";
          if (system === "swift") {
            return {
              lines: [
                "SWIFT System — Quantum Risk Assessment:",
                "  Algorithm: RSA-2048 PKI, 3DES message authentication",
                "  HNDL exposure: INTERNET-FACING — bulk collection risk HIGH",
                "  Data value: $450M/day wire transfers — retroactive fraud risk CRITICAL",
                "  Migration path: SWIFT PQC working group (ISO 20022 + ML-KEM)",
                "  SWIFT migration ETA: 2026-2027 (coordinated with 11K member banks)",
                "  Risk score: 88/100 — CRITICAL",
                "  Action: Deploy hybrid TLS for SWIFT Alliance Access now.",
                "Fragment collected.",
              ],
            };
          }
          return {
            lines: [
              "ATM HSM Network — Quantum Risk Assessment:",
              "  Algorithm: RSA-2048 PIN encryption, RSA-2048 firmware signing",
              "  Hardware EOL: 2028 — 2,400 terminals requiring physical replacement",
              "  HNDL exposure: Private network — lower bulk collection risk",
              "  Migration blocker: HSM PQC firmware ETA 2025 Q3",
              "  Risk score: 72/100 — HIGH",
              "  Action: Include ML-KEM requirement in 2028 ATM procurement RFP now.",
              "Fragment collected.",
            ],
          };
        },
      },
    },
  },

  // ─── quantum-d07: Board Briefing ──────────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "SEC Cybersecurity Disclosure Office", location: "Washington, D.C., USA", era: "2024 CE", emoji: "🎙️" },
    id: "quantum-d07",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Seal_of_the_United_States_Securities_and_Exchange_Commission.svg/1200px-Seal_of_the_United_States_Securities_and_Exchange_Commission.svg.png",
    order: 7,
    title: "Briefing the Board",
    subtitle: "Communicating Quantum Risk to Executive Leadership",
    category: "cybersecurity",
    xp: 170,
    badge: { id: "badge-qrm-board", name: "Board Risk Communicator", emoji: "🎙️" },
    challengeType: "ctf",
    info: {
      tagline: "SEC cyber disclosure rules require material quantum risk to be reported. The board needs to understand the threat — without a PhD in physics.",
      year: 2024,
      overview: [
        "SEC cybersecurity disclosure rules (effective December 2023) require public companies to disclose material cybersecurity risks in annual reports (Form 10-K) and material incident notifications (Form 8-K within 4 business days). Quantum computing risk is emerging as a disclosure consideration: if a company's core cryptographic infrastructure is vulnerable to a CRQC and migration has not begun, this may constitute a material risk requiring disclosure. Several Fortune 500 companies have already begun disclosing quantum cryptographic risk in their 10-K filings.",
        "Board communication on quantum risk requires translating technical concepts into business impact terms. Boards respond to: financial exposure (what does quantum-enabled compromise cost?), regulatory timeline (what deadlines must we meet?), competitive positioning (are our peers ahead?), and reputational risk (what happens to our stock price if we are caught underprepared?). A board briefing should lead with business case — 'Our financial settlement infrastructure is exposed to a known threat vector with a 2030–2035 deadline' — not with physics.",
        "The structure of an effective board-level quantum risk briefing: (1) Threat summary — what is the quantum threat and when; (2) Our exposure — what systems are at risk; (3) Current status — where we are in migration; (4) Regulatory landscape — what mandates apply; (5) Resource requirement — what budget is needed; (6) Decision requested — what board approval is needed. Avoid quantum physics. Use analogies: 'It's like knowing a master key that opens all your locks will be sold on the open market in 10 years.'",
      ],
      technical: {
        title: "SEC Disclosure Framework and Material Risk Determination",
        body: [
          "Under SEC Rule 10b-5 and the 2023 cybersecurity disclosure rules, a cybersecurity risk is 'material' if there is a substantial likelihood that a reasonable investor would consider it important. Quantum risk materiality assessment requires: (1) Probability of harm — how likely is CRQC availability affecting current operations; (2) Magnitude of harm — what would quantum-enabled compromise cost; (3) Mitigation status — is migration underway. Companies with large volumes of consumer financial data, IP, or healthcare records should consult securities counsel on whether disclosure is required.",
          "A quantum risk materiality assessment should quantify: the notional value of data at HNDL risk, the cost of remediation (migration program budget), the cost of breach (regulatory fines, litigation), and the timeline gap (when is CRQC expected vs. when will migration complete). This quantified framing allows the CFO and audit committee to evaluate quantum risk alongside other material risks in the enterprise risk register.",
        ],
        codeExample: {
          label: "Quantum risk materiality scorecard — executive summary generator",
          code: `def board_quantum_scorecard(org_profile: dict) -> str:
    crqc_year_est = 2032  # IC consensus midpoint
    migration_complete_year = org_profile.get("migration_eta", 2030)
    gap_years = crqc_year_est - migration_complete_year
    hndl_data_value = org_profile.get("sensitive_data_value_usd", 0)
    migration_cost = org_profile.get("migration_budget_usd", 0)
    risk_rating = (
        "CRITICAL" if gap_years < 0
        else "HIGH" if gap_years < 2
        else "MODERATE"
    )
    return f"""
QUANTUM RISK EXECUTIVE SUMMARY
Risk rating: {risk_rating}
CRQC estimate: {crqc_year_est} | Our migration: {migration_complete_year}
Margin: {'AT RISK' if gap_years < 0 else f'{gap_years} years'}
Data at HNDL risk: \${hndl_data_value:,.0f}
Migration cost: \${migration_cost:,.0f}
Risk-adjusted ROI: {hndl_data_value // migration_cost}x

Board actions:
  Approve migration program budget
  Direct CISO to report quarterly on milestones
  Authorize legal review for SEC 10-K disclosure
"""

print(board_quantum_scorecard({
    "migration_eta": 2029,
    "sensitive_data_value_usd": 4_500_000_000,
    "migration_budget_usd": 12_000_000,
}))`,
        },
      },
      incident: {
        title: "SEC vs. SolarWinds — Personal Liability for Known Cyber Risks",
        when: "2023",
        where: "U.S. Securities and Exchange Commission, SolarWinds Corporation",
        impact: "SEC enforcement signals that known, foreseeable cyber risks must be disclosed — sets precedent for quantum risk",
        body: [
          "The SEC's October 2023 lawsuit against SolarWinds and its CISO Timothy Brown established a critical precedent: cybersecurity risk disclosure obligations apply to known, foreseeable risks — not just incidents that have already occurred. The SEC alleged that SolarWinds had known about cybersecurity risks it failed to adequately disclose. While SolarWinds involved a past breach, securities attorneys have noted the ruling's implications for forward-looking risks like quantum computing.",
          "For CISO-board communication on quantum risk, the SolarWinds case underscores that vague or boilerplate risk disclosure is insufficient. If your security team has assessed specific quantum exposure (named systems, quantified data at risk, a migration gap) and has not communicated this to the board or disclosed it in SEC filings, there is potential personal liability for the CISO. The correct posture is to formally document the quantum risk assessment, bring it to the audit committee, and work with legal counsel to determine disclosure requirements.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Business Framing", sub: "Cost, timeline, regulatory — not physics", type: "system" },
          { label: "SEC Disclosure", sub: "Material quantum risk → 10-K required", type: "attacker" },
          { label: "Board Decision", sub: "Budget approval + quarterly reporting", type: "result" },
          { label: "Risk Register", sub: "Quantum alongside cyber, supply chain", type: "system" },
        ],
      },
      timeline: [
        { year: 2022, event: "SEC proposes mandatory cybersecurity risk disclosure rules" },
        { year: 2023, event: "SEC cybersecurity disclosure rules take effect — 8-K + 10-K requirements" },
        { year: 2023, event: "SEC sues SolarWinds CISO — personal liability for disclosure failures", highlight: true },
        { year: 2024, event: "First Fortune 500 companies disclose quantum cryptographic risk in 10-K filings" },
        { year: 2025, event: "Expected: SEC guidance on quantum risk materiality thresholds" },
      ],
      keyTakeaways: [
        "SEC cyber disclosure rules may require quantum risk disclosure if material to investors",
        "Board briefings should lead with business impact, regulatory timelines, and budget asks — not physics",
        "SolarWinds precedent: known, foreseeable cyber risks must be disclosed — not just past incidents",
        "Formal risk register documentation of quantum exposure protects CISOs from personal liability",
      ],
      references: [
        { title: "SEC Cybersecurity Risk Management Disclosure Rules", url: "https://www.sec.gov/rules/final/2023/33-11216.pdf" },
        { title: "NSA Quantum Computing FAQ — for Non-Technical Audiences", url: "https://media.defense.gov/2021/Aug/04/2002821837/-1/-1/1/Quantum_FAQs_20210804.PDF" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d07-q1", type: "Core Idea", challenge: "Disclosure duty.", text: "Why must material quantum risk be considered for SEC disclosure?", options: ["SEC cyber disclosure rules require reporting material risks, and HNDL exposure can be material","Quantum risk is exempt","Only AES must be disclosed","Disclosure is purely voluntary"], correctIndex: 0, explanation: "If quantum/HNDL risk is material to investors, SEC rules require it be disclosed." },
        { id: "quantum-d07-q2", type: "Real World", challenge: "SolarWinds case.", text: "What does the SEC vs. SolarWinds matter illustrate about cyber risk?", options: ["Officers can face personal liability for known, undisclosed cyber risks","Cyber risk is never material","Boards have no responsibility","Only engineers are liable"], correctIndex: 0, explanation: "It signaled potential personal accountability for misrepresenting or omitting known cyber risks." },
        { id: "quantum-d07-q3", type: "Governance", challenge: "Board communication.", text: "How should quantum risk be presented to a board audit committee?", options: ["In business and materiality terms — without requiring a physics PhD","As dense lattice mathematics","Only as source code","Not at all"], correctIndex: 0, explanation: "Boards need risk framed by business impact and materiality, not technical minutiae." },
        { id: "quantum-d07-q4", type: "Analysis", challenge: "Materiality test.", text: "What determines whether quantum risk is 'material' for disclosure?", options: ["Whether a reasonable investor would consider it important to decisions","The number of servers","The CISO's job title","The vendor's revenue"], correctIndex: 0, explanation: "Materiality hinges on significance to a reasonable investor's decision-making." },
        { id: "quantum-d07-q5", type: "Governance", challenge: "Healthcare IT exposure.", text: "Why is quantum risk plausibly material for a public healthcare IT company?", options: ["Long-lived patient data faces HNDL exposure, creating real future liability","Healthcare data expires instantly","It uses no encryption","It is exempt from the SEC"], correctIndex: 0, explanation: "Decades-long secrecy needs for health data make HNDL exposure a material, disclosable risk." },
        { id: "quantum-d07-q6", type: "Compliance", challenge: "Disclosure language.", text: "What makes good SEC quantum-risk disclosure language?", options: ["Clear, accurate description of the risk, exposure, and mitigation program without overstatement","Vague reassurance that all is fine","Technical jargon only","Silence"], correctIndex: 0, explanation: "Disclosure should be accurate and balanced — neither alarmist nor falsely reassuring." },
        { id: "quantum-d07-q7", type: "Concept", challenge: "Known-risk duty.", text: "What is the key lesson for leadership from known-but-undisclosed cyber risk cases?", options: ["Failing to disclose a known material risk can create legal and personal liability","Known risks need no action","Only breaches matter, not risks","Disclosure increases liability so avoid it"], correctIndex: 0, explanation: "Once a material risk is known, omitting or misrepresenting it carries serious legal exposure." },
        { id: "quantum-d07-q8", type: "Defense", challenge: "Briefing structure.", text: "What should a board-level quantum risk briefing contain?", options: ["Materiality assessment, exposure summary, mitigation roadmap, and disclosure recommendation","Only the QBER formula","A list of qubits","Nothing actionable"], correctIndex: 0, explanation: "Boards need the materiality call, exposure, the plan, and a disclosure decision — in business terms." },
      ],
    },
    ctf: {
      scenario: "You're preparing a quantum risk briefing for the board audit committee of a publicly traded healthcare IT company. Build the materiality assessment and draft SEC disclosure language.",
      hint: "Assess materiality, calculate risk exposure, then draft the board-ready summary.",
      hints: [
        "Review the company profile. Run: cat company-profile.txt",
        "Run the quantum materiality assessment. Run: qrisk-materiality --company-profile company-profile.txt",
        "Draft SEC 10-K disclosure language. Run: qrisk-disclosure-draft",
        "Run 'assemble' to submit the board package",
      ],
      fragments: [
        { trigger: "/company-profile.txt", value: "FLAG{BOARD_Q", label: "Company Profile — Quantum Risk Context" },
        { trigger: "qrisk-materiality", value: "RISK_MATERIAL_", label: "Materiality Assessment — SEC Threshold Analysis" },
        { trigger: "qrisk-disclosure-draft", value: "DISCLOSE}", label: "10-K Draft — Quantum Risk Disclosure Language" },
      ],
      files: {
        "/company-profile.txt": [
          "COMPANY PROFILE — BOARD QUANTUM RISK BRIEFING",
          "Revenue: $2.1B | Market cap: $8.4B | Industry: Healthcare IT",
          "Sensitive data: 45M patient records (75-year HIPAA requirement)",
          "Crypto: RSA-2048 across EHR, cloud backup, physician portal",
          "Migration status: CBOM complete, no migration started",
          "Migration ETA (if approved): 2028 | CRQC estimate: 2030-2035",
          "Sequence: qrisk-materiality → qrisk-disclosure-draft → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "company-profile.txt", isDir: false }] },
      extraCommands: {
        "qrisk-materiality": (_args: string[]) => ({
          lines: [
            "QUANTUM RISK MATERIALITY ASSESSMENT",
            "Data at HNDL risk: 45M patient records × $150/record = $6.75B breach value",
            "CRQC estimated availability: 2032 (IC midpoint)",
            "Migration ETA if approved today: 2028",
            "Timeline gap: 4 years of margin — MODERATE risk if program approved now",
            "Timeline if not approved: 2030+ — HIGH risk of HNDL decryption before migration",
            "",
            "SEC materiality threshold: reasonable investor standard",
            "Assessment: $6.75B data exposure with known 2030-2035 threat window",
            "  on a company with $8.4B market cap LIKELY MEETS materiality threshold.",
            "Recommendation: Disclose in next 10-K; consult securities counsel.",
            "Board action: Approve $9.2M migration program to maintain 4-year margin.",
            "Risk-adjusted ROI: 733× ($9.2M migration vs. $6.75B breach exposure).",
            "Fragment collected.",
          ],
        }),
        "qrisk-disclosure-draft": (_args: string[]) => ({
          lines: [
            "DRAFT — 10-K CYBERSECURITY RISK FACTOR",
            "(For review by securities counsel before filing)",
            "",
            '"Quantum Computing Risk: Advances in quantum computing may in the',
            "future render current cryptographic standards obsolete. Our systems",
            "rely on RSA and elliptic curve cryptography for protecting patient",
            "data and internal communications. We have completed a cryptographic",
            "inventory and are developing a migration roadmap to post-quantum",
            "standards as published by NIST in 2024 (FIPS 203, 204, 205).",
            "We expect to complete migration by 2028. If cryptographically",
            "relevant quantum computers become available before our migration",
            'is complete, our protected data could be at risk of decryption."',
            "",
            "Note: Disclosure highlights active mitigation (CBOM + roadmap) to",
            "      demonstrate good-faith risk management to SEC reviewers.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d08: Hybrid Cryptography ────────────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "IETF Secretariat", location: "Fremont, California, USA", era: "2024 CE", emoji: "🔗" },
    id: "quantum-d08",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/IETF_Logo.svg/1200px-IETF_Logo.svg.png",
    order: 8,
    title: "Hybrid Cryptography",
    subtitle: "Running Classical and PQC in Parallel — The Transition Architecture",
    category: "cybersecurity",
    xp: 160,
    badge: { id: "badge-qrm-hybrid", name: "Hybrid Crypto Architect", emoji: "🔗" },
    challengeType: "ctf",
    info: {
      tagline: "Hybrid cryptography combines classical and post-quantum algorithms so that security holds if either is broken — the IETF-recommended transition architecture.",
      year: 2024,
      overview: [
        "Hybrid cryptography is the IETF-recommended approach for the post-quantum transition period: instead of replacing RSA/ECC with PQC algorithms, systems run both in parallel and combine the outputs. In hybrid key encapsulation, the session key is derived from the combined output of an X25519 ECDH and an ML-KEM-768 encapsulation — an adversary must break both to recover the key. This ensures that if ML-KEM-768 is later found to have a classical weakness (as happened with SIKE), X25519 still provides protection.",
        "RFC 9180 (HPKE) and IETF draft documents (draft-ietf-tls-hybrid-design, draft-ietf-ipsecme-ikev2-pqc) define the hybrid key exchange mechanisms for TLS 1.3 and IKEv2 respectively. The TLS 1.3 hybrid approach combines ECDH and KEM key shares in the ClientHello key_share extension, with the combined keying material fed through HKDF. The IANA code point for X25519+ML-KEM-768 is 0x11EC.",
        "Hybrid mode is not permanent — it is designed for a 5–10 year transition period. Once NIST PQC algorithms have accumulated 5+ years of real-world cryptanalysis without weakness, organizations should transition to pure PQC mode. Hybrid mode carries performance overhead: TLS handshakes increase from ~2KB to ~4KB with hybrid key shares. Load balancers and CDNs must be configured to handle larger TLS handshakes without MTU fragmentation.",
      ],
      technical: {
        title: "Hybrid Key Derivation in TLS 1.3 and Middlebox Impacts",
        body: [
          "TLS 1.3 hybrid key exchange works as follows: the client generates both an X25519 ephemeral keypair and an ML-KEM-768 keypair, including both public keys in the ClientHello key_share extension. The server responds with both an X25519 public key and an ML-KEM-768 ciphertext in the ServerHello key_share extension. The client decapsulates the ML-KEM ciphertext to recover the KEM shared secret, and computes the X25519 shared secret. Combined keying material: HKDF(X25519_shared_secret || ML-KEM_shared_secret).",
          "Google Chrome's 2023 deployment revealed significant interoperability problems: enterprise firewalls and security appliances performing TLS inspection crashed or dropped connections when they saw a ClientHello with 1216-byte key_share extensions (vs. the expected 32 bytes for X25519). Palo Alto, Fortinet, and Cisco had to ship emergency firmware updates. This demonstrates that PQC migration requires end-to-end ecosystem changes including middlebox firmware, MTU configuration, and protocol buffer sizes.",
        ],
        codeExample: {
          label: "Verify hybrid TLS is active on an endpoint",
          code: `#!/usr/bin/env python3
"""Verify hybrid key exchange is active on a TLS endpoint."""
import subprocess

def check_hybrid_tls(hostname: str, port: int = 443) -> dict:
    result = subprocess.run(
        ["openssl", "s_client",
         "-groups", "x25519_mlkem768:secp384r1:x25519",
         "-connect", f"{hostname}:{port}",
         "-brief", "-tls1_3"],
        capture_output=True, text=True, timeout=10, input=""
    )
    output = result.stderr + result.stdout
    server_temp_key = next(
        (line for line in output.splitlines() if "Server Temp Key" in line), ""
    )
    hybrid = any(kw in server_temp_key.upper() for kw in ["MLKEM", "KYBER"])
    return {
        "hostname": hostname,
        "hybrid_active": hybrid,
        "key_exchange": server_temp_key.strip(),
        "hndl_protected": hybrid,
    }

result = check_hybrid_tls("example-agency.gov")
print(result)
# {'hostname': 'example-agency.gov', 'hybrid_active': True,
#  'key_exchange': 'Server Temp Key: X25519MLKEM768, 1216 bits',
#  'hndl_protected': True}`,
        },
      },
      incident: {
        title: "Google Chrome X25519Kyber768 — First Mass-Scale PQC Deployment",
        when: "2023",
        where: "Google Chrome, Google servers — billions of TLS connections",
        impact: "0.5% of Chrome users hit connection failures due to middlebox MTU issues with larger hybrid handshakes",
        body: [
          "In August 2023, Google enabled X25519Kyber768 hybrid key exchange by default in Chrome 116 — the first browser to deploy post-quantum cryptography at scale. The deployment revealed significant interoperability problems: some TLS middleboxes (firewalls, proxies, load balancers, deep packet inspection appliances) broke when they encountered hybrid ClientHello messages with larger key_share extensions than expected. Approximately 0.5% of Chrome users encountered connection failures.",
          "Vendors including Palo Alto, Fortinet, and Cisco had to ship emergency firmware updates to handle the larger extensions. Google temporarily added a fallback mechanism that retried with X25519-only if hybrid failed. The incident demonstrates that post-quantum migration is not just about algorithm updates — it requires end-to-end ecosystem changes including middlebox firmware, MTU configuration, and protocol buffer sizes. Organizations should audit all TLS-inspecting appliances before enabling hybrid PQC.",
        ],
      },
      diagram: {
        nodes: [
          { label: "X25519 (Classical)", sub: "Protects against classical adversaries", type: "system" },
          { label: "ML-KEM-768 (PQC)", sub: "Protects against quantum adversaries", type: "system" },
          { label: "Combined HKDF", sub: "Both must break to expose session key", type: "result" },
          { label: "Middlebox Impact", sub: "Larger handshakes — firmware updates needed", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2022, event: "IETF hybrid TLS draft published — standardizing X25519+Kyber768" },
        { year: 2023, event: "Google Chrome deploys X25519Kyber768 at scale — middlebox failures discovered", highlight: true },
        { year: 2024, event: "IANA assigns code point 0x11EC for x25519_mlkem768" },
        { year: 2024, event: "Cloudflare, AWS, Azure enable ML-KEM hybrid key exchange" },
        { year: 2027, event: "Target: hybrid mode standard across internet-facing federal systems" },
      ],
      keyTakeaways: [
        "Hybrid = X25519 + ML-KEM — both must be broken to compromise; provides defense in depth",
        "Google Chrome deployment showed 0.5% failure due to middlebox MTU and buffer size issues",
        "Hybrid mode is transitional — plan to move to pure PQC after ML-KEM has 5+ years of real-world analysis",
        "Audit all TLS-inspecting appliances before enabling hybrid PQC — firmware updates required",
      ],
      references: [
        { title: "IETF Draft: Hybrid Key Exchange in TLS 1.3", url: "https://datatracker.ietf.org/doc/html/draft-ietf-tls-hybrid-design" },
        { title: "Google Security Blog: Protecting Chrome Traffic with Hybrid PQKEM", url: "https://security.googleblog.com/2023/08/protecting-chrome-traffic-with-hybrid.html" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d08-q1", type: "Core Idea", challenge: "Hybrid principle.", text: "What is the security guarantee of hybrid cryptography?", options: ["Security holds as long as either the classical or the post-quantum component remains unbroken","It is twice as fast","It needs no keys","It removes certificates"], correctIndex: 0, explanation: "Combining classical and PQC means an attacker must break both — robust during the transition." },
        { id: "quantum-d08-q2", type: "Implementation", challenge: "TLS 1.3 hybrid.", text: "How is hybrid key exchange realized in TLS 1.3?", options: ["Both classical and PQC shared secrets are combined in the key derivation (e.g., X25519 + ML-KEM)","Only ML-KEM is used","RSA encrypts the PQC key","The PQC key replaces the handshake"], correctIndex: 0, explanation: "TLS 1.3 derives keys from both secrets, so neither alone unlocks the session." },
        { id: "quantum-d08-q3", type: "Real World", challenge: "Chrome deployment.", text: "What was significant about Google Chrome's X25519Kyber768 rollout?", options: ["It was the first mass-scale deployment of hybrid post-quantum key exchange","It removed TLS from Chrome","It broke all websites","It mandated QKD"], correctIndex: 0, explanation: "Chrome's X25519Kyber768 brought hybrid PQC to billions of connections — the first at scale." },
        { id: "quantum-d08-q4", type: "Pitfall", challenge: "Middlebox impact.", text: "What real-world problem can hybrid handshakes trigger with network middleboxes?", options: ["Larger handshake messages can be dropped or mangled by middleboxes intolerant of new sizes","Middleboxes get faster","Certificates disappear","QBER spikes"], correctIndex: 0, explanation: "Bigger ClientHello/handshake sizes from PQC can break brittle middleboxes — a known deployment hazard." },
        { id: "quantum-d08-q5", type: "Validation", challenge: "Checking activation.", text: "When validating a hybrid TLS deployment, what do you verify first?", options: ["That the hybrid key exchange (e.g., X25519MLKEM768) actually negotiates on connections","That RSA is disabled globally","That logs are deleted","That ports are closed"], correctIndex: 0, explanation: "Confirming the hybrid group is negotiated proves PQC is actually in the handshake." },
        { id: "quantum-d08-q6", type: "Concept", challenge: "Why IETF-recommended.", text: "Why does the IETF recommend hybrid as the transition architecture?", options: ["It hedges against immature PQC implementations while delivering quantum resistance now","Because RSA is permanent","Because PQC alone is illegal","To slow adoption"], correctIndex: 0, explanation: "Hybrid keeps a trusted classical algorithm in place while PQC implementations harden." },
        { id: "quantum-d08-q7", type: "Validation", challenge: "Handshake size.", text: "Why measure handshake size during hybrid validation?", options: ["Larger PQC messages can fragment or exceed limits, affecting compatibility and performance","Smaller is always insecure","Size has no effect","It sets the AES key"], correctIndex: 0, explanation: "PQC inflates handshakes; measuring size flags fragmentation and middlebox compatibility risks." },
        { id: "quantum-d08-q8", type: "Defense", challenge: "Smooth rollout.", text: "What practice de-risks a hybrid TLS rollout across an agency?", options: ["Staged deployment with middlebox compatibility testing and monitoring of negotiated groups","Flip every server at once with no testing","Disable monitoring","Use RSA-1024 as backup"], correctIndex: 0, explanation: "Phased rollout plus compatibility testing catches middlebox and fragmentation issues before they spread." },
      ],
    },
    ctf: {
      scenario: "You're validating a hybrid TLS deployment across a federal agency's web infrastructure. Check for hybrid key exchange activation, middlebox compatibility, and handshake size impacts.",
      hint: "Test hybrid key exchange, check middlebox compatibility, then validate configuration.",
      hints: [
        "Read the hybrid deployment checklist. Run: cat hybrid-checklist.txt",
        "Test hybrid key exchange on the TLS endpoint. Run: hybrid-tls-check agency.gov",
        "Check middlebox compatibility. Run: middlebox-scan --network agency-perimeter",
        "Run 'assemble' to submit the hybrid validation report",
      ],
      fragments: [
        { trigger: "/hybrid-checklist.txt", value: "FLAG{HYBRID_", label: "Hybrid Deployment Checklist" },
        { trigger: "hybrid-tls-check", value: "CLASSICAL_PQC_", label: "Hybrid TLS — Key Exchange Verified" },
        { trigger: "middlebox-scan", value: "PARALLEL}", label: "Middlebox Scan — Compatibility Assessment" },
      ],
      files: {
        "/hybrid-checklist.txt": [
          "HYBRID TLS DEPLOYMENT VALIDATION",
          "Target: agency.gov (federal web infrastructure)",
          "Algorithm: X25519+ML-KEM-768 (IANA 0x11EC)",
          "Tests: Key exchange verification, middlebox compatibility, MTU impact.",
          "Sequence: hybrid-tls-check → middlebox-scan → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "hybrid-checklist.txt", isDir: false }] },
      extraCommands: {
        "hybrid-tls-check": (_args: string[]) => ({
          lines: [
            "Testing hybrid TLS 1.3 on agency.gov:443...",
            "  Server Temp Key: X25519MLKEM768, 1216 bits",
            "  Key exchange: HYBRID (X25519 classical + ML-KEM-768 post-quantum)",
            "  ClientHello key_share extension: 1216 bytes (was 32 bytes pre-hybrid)",
            "  Hybrid key derivation: HKDF(X25519_SS || ML-KEM_SS) ✅",
            "  HNDL protection: ACTIVE ✅",
            "  Backward compat: RSA cert still presented for legacy clients ✅",
            "Fragment collected.",
          ],
        }),
        "middlebox-scan": (_args: string[]) => ({
          lines: [
            "Scanning agency-perimeter for hybrid TLS compatibility...",
            "Palo Alto NGFW PA-5450 (firmware 11.1.2): ✅ COMPATIBLE",
            "Fortinet FortiGate 600F (firmware 7.2.3):",
            "  ⚠️  INCOMPATIBLE — drops ClientHello > 512 bytes",
            "  Fix: Update to firmware 7.4.1 — available now",
            "F5 BIG-IP LTM (version 15.1.9): ✅ COMPATIBLE",
            "Cisco ASA 9.19(1): ⚠️  NOT TESTED — upgrade to 9.21+ recommended",
            "",
            "Action required: Update FortiGate firmware before hybrid goes live.",
            "Estimated traffic impact if not fixed: ~12% of agency traffic blocked.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d09: Quantum-Safe Architecture ───────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "Let's Encrypt Certificate Authority", location: "San Francisco, California, USA", era: "2024 CE", emoji: "🏗️" },
    id: "quantum-d09",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Let%27s_Encrypt_Logo_%282%29.svg/1200px-Let%27s_Encrypt_Logo_%282%29.svg.png",
    order: 9,
    title: "Quantum-Safe Architecture",
    subtitle: "Crypto Agility — Design Systems for Algorithm Evolution",
    category: "cybersecurity",
    xp: 170,
    badge: { id: "badge-qrm-arch", name: "Quantum-Safe Architect", emoji: "🏗️" },
    challengeType: "ctf",
    info: {
      tagline: "Crypto agility — the ability to swap algorithms without redesigning systems — is the defining architectural principle of the post-quantum era.",
      year: 2024,
      overview: [
        "Quantum-safe architecture requires more than algorithm substitution — it requires designing systems with cryptographic agility as a first-class property. Cryptographic agility means that an organization can update the cryptographic algorithms in use across its systems without redesigning the systems themselves. This requires abstract cryptographic interfaces rather than hardcoded algorithm implementations, centralized key management infrastructure that supports multiple algorithm types simultaneously, and certificate issuance pipelines that can mint certificates using any supported algorithm on demand.",
        "NIST SP 800-218 (Secure Software Development Framework) and NIST SP 800-57 Part 2 (Key Management Guidelines) both emphasize crypto agility as a design requirement. The architectural components that enable agility: a cryptographic service abstraction layer (CSAL) that translates algorithm-agnostic requests into specific algorithm calls; a key management system (KMS) that stores keys tagged with algorithm metadata and supports rotation; a certificate authority that issues certificates in multiple algorithm formats (RSA, ML-DSA, composite).",
        "Quantum-safe architecture also requires addressing long-lived keys. TLS session keys are ephemeral — they are generated per-session and discarded, so migrating to PQC protects future sessions immediately. But long-lived keys — CA root keys, HSM master keys, SSH host keys, code signing keys — may need to remain valid for years or decades. These must be migrated first, because a CA root key compromise allows forging all certificates it has signed, past and future.",
      ],
      technical: {
        title: "Cryptographic Agility Implementation Patterns",
        body: [
          "Cryptographic abstraction layer design: define a CryptoProvider interface with methods Sign(data, key), Verify(signature, data, pubkey), KEM_Encapsulate(pubkey), KEM_Decapsulate(ciphertext, privkey). Implementations include RsaProvider, EcdsaProvider, MlKemProvider, MlDsaProvider. Algorithm selection is driven by configuration not hardcoded imports. This pattern allows swapping ML-KEM-768 for ML-KEM-1024 or a future algorithm without changing application code.",
          "Key lifecycle management in a PQC-agile KMS: tag each key with algorithm, key size, creation date, rotation schedule, and quantum vulnerability rating. Automate proactive rotation for V1 (quantum-vulnerable) keys before Q-Day. Implement dual-signing for the transition period: sign artifacts with both RSA and ML-DSA so that verifiers can validate with whichever algorithm they support.",
        ],
        codeExample: {
          label: "Crypto agility layer — algorithm-agnostic signing interface",
          code: `from abc import ABC, abstractmethod
import os

class CryptoProvider(ABC):
    """Algorithm-agnostic crypto interface — swap via config, not code rewrite."""

    @abstractmethod
    def sign(self, data: bytes, private_key: bytes) -> bytes: ...

    @abstractmethod
    def verify(self, signature: bytes, data: bytes, public_key: bytes) -> bool: ...

    @property
    @abstractmethod
    def algorithm_id(self) -> str: ...

class MlDsaProvider(CryptoProvider):
    """FIPS 204 ML-DSA-65 implementation via liboqs."""

    def __init__(self):
        import oqs
        self._sig = oqs.Signature("ML-DSA-65")

    def sign(self, data: bytes, private_key: bytes) -> bytes:
        return self._sig.sign(data)

    def verify(self, signature: bytes, data: bytes, public_key: bytes) -> bool:
        return self._sig.verify(data, signature, public_key)

    @property
    def algorithm_id(self) -> str:
        return "ML-DSA-65"

CRYPTO_PROVIDERS = {
    "rsa2048":    lambda: RsaProvider(),    # V1 — quantum-vulnerable
    "ecdsa-p256": lambda: EcdsaProvider(),  # V1 — quantum-vulnerable
    "ml-dsa-65":  lambda: MlDsaProvider(),  # FIPS 204 — quantum-safe
}

def get_provider() -> CryptoProvider:
    alg = os.environ.get("CRYPTO_ALGORITHM", "ml-dsa-65")
    return CRYPTO_PROVIDERS[alg]()

# Application code never references specific algorithm
provider = get_provider()
signature = provider.sign(document_bytes, private_key)`,
        },
      },
      incident: {
        title: "Let's Encrypt — 350 Million Certificates, Crypto Agility Done Right",
        when: "2015–2024",
        where: "Let's Encrypt Certificate Authority — 350M+ certificates issued",
        impact: "Transitioned from RSA to ECDSA root CAs without disrupting subscribers — the PQC migration model",
        body: [
          "Let's Encrypt has issued over 350 million TLS certificates. When it transitioned from RSA-2048 root CAs to ECDSA P-384 root CAs (E1 and E2) in 2021, it completed the transition without disrupting any of its subscribers — because it had built cryptographic agility into its CA infrastructure from the beginning. The ACME protocol (RFC 8555) supports algorithm negotiation, allowing clients to request RSA or ECDSA certificates based on capability. Let's Encrypt's infrastructure can mint any supported algorithm on demand.",
          "Let's Encrypt has publicly committed to evaluating ML-DSA certificate issuance for post-quantum migration. Its architecture — where algorithm selection is a configuration parameter, not a hardcoded implementation detail — means it can add ML-DSA support and begin issuing hybrid or PQC-only certificates as soon as browser clients support ML-DSA verification. This stands in contrast to many enterprise CAs built on legacy PKI software that have algorithm assumptions baked into database schemas and certificate templates — those organizations face multi-year PKI redesign projects.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Crypto Abstraction Layer", sub: "Algorithm selection via config", type: "system" },
          { label: "Agile KMS", sub: "Keys tagged with algorithm + vulnerability tier", type: "system" },
          { label: "Multi-Algorithm CA", sub: "RSA + ML-DSA issuance on demand", type: "result" },
          { label: "Root CA First", sub: "Migrate root CA → everything inherits", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2015, event: "Let's Encrypt launches with crypto-agile ACME infrastructure" },
        { year: 2021, event: "Let's Encrypt transitions to ECDSA P-384 root CAs without disruption" },
        { year: 2023, event: "NIST SP 800-218 formalizes crypto agility as design requirement" },
        { year: 2024, event: "Let's Encrypt evaluates ML-DSA issuance timeline", highlight: true },
        { year: 2026, event: "Expected: major browser support for ML-DSA certificate verification" },
      ],
      keyTakeaways: [
        "Crypto agility = abstract algorithm from application logic — swap via config, not code rewrite",
        "Root CA migration is highest-priority PKI task — all certificates it issues inherit its algorithm",
        "Let's Encrypt's agile ACME architecture is the model — algorithm as config parameter",
        "Long-lived keys (root CAs, HSM master keys) must migrate first; ephemeral TLS keys migrate automatically",
      ],
      references: [
        { title: "NIST SP 800-218: Secure Software Development Framework", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf" },
        { title: "Let's Encrypt ECDSA Migration", url: "https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d09-q1", type: "Core Idea", challenge: "Agility defined.", text: "What is cryptographic agility?", options: ["The ability to swap algorithms without redesigning systems","Encrypting data twice","Generating keys faster","Using only RSA"], correctIndex: 0, explanation: "Agility is the architectural property that lets you change algorithms via configuration, not rewrites." },
        { id: "quantum-d09-q2", type: "Real World", challenge: "Let's Encrypt model.", text: "Why is Let's Encrypt (350M+ certificates) cited as 'crypto agility done right'?", options: ["Automated, short-lived certificate issuance/renewal makes algorithm changes routine at scale","It never rotates certificates","It uses manual issuance only","It avoids automation"], correctIndex: 0, explanation: "Automation and short lifetimes let Let's Encrypt evolve crypto across hundreds of millions of certs smoothly." },
        { id: "quantum-d09-q3", type: "Architecture", challenge: "Agility layer.", text: "In a quantum-safe PKI, what is the role of a crypto agility layer?", options: ["An abstraction that lets the algorithm be selected/swapped via configuration","A hardcoded RSA module","A backup tape system","A QKD relay"], correctIndex: 0, explanation: "The agility layer decouples applications from specific algorithms, enabling clean migration." },
        { id: "quantum-d09-q4", type: "Strategy", challenge: "CA migration order.", text: "In what order should a PKI migrate to PQC?", options: ["Root first (longest validity, broadest trust), then intermediates, then end-entity certs","Leaf certs first, root last","Random order","Only intermediates"], correctIndex: 0, explanation: "Long-lived, high-trust roots are migrated first; the hierarchy follows." },
        { id: "quantum-d09-q5", type: "Standards", challenge: "Key management ref.", text: "Which NIST publication guides the key-management practices validated in the PKI design?", options: ["NIST SP 800-57 (key management)","FIPS 197 (AES)","RFC 1918","PCI-DSS"], correctIndex: 0, explanation: "SP 800-57 provides key-management lifecycle guidance for the PKI architecture." },
        { id: "quantum-d09-q6", type: "Concept", challenge: "Why automation.", text: "Why is automation central to crypto agility?", options: ["Manual rotation can't scale; automated issuance/renewal makes algorithm changes feasible across large fleets","Automation weakens security","Manual is always safer","It eliminates the need for keys"], correctIndex: 0, explanation: "At scale, only automated lifecycles make frequent algorithm changes practical and reliable." },
        { id: "quantum-d09-q7", type: "Architecture", challenge: "Short lifetimes.", text: "How do short certificate lifetimes support agility?", options: ["Frequent renewal means new algorithms roll out naturally as certs cycle","They prevent renewal","They lock in the current algorithm","They disable revocation"], correctIndex: 0, explanation: "Short-lived certs let an algorithm change propagate quickly through normal renewal." },
        { id: "quantum-d09-q8", type: "Defense", challenge: "Designing for the future.", text: "Why is agility the 'defining architectural principle' of the post-quantum era?", options: ["Algorithms will keep changing and some will break; agility lets systems adapt without redesign","Because RSA is final","Because PQC never changes","To reduce key sizes only"], correctIndex: 0, explanation: "Given ongoing algorithm evolution and breaks (e.g., SIKE), adaptability is the core design goal." },
      ],
    },
    ctf: {
      scenario: "You're designing the quantum-safe PKI architecture for a healthcare organization. Define the crypto agility layer, plan the CA migration order, and validate against NIST SP 800-57.",
      hint: "Review the current PKI, design the agility layer, then plan the CA migration sequence.",
      hints: [
        "Read the current PKI architecture. Run: cat pki-current.txt",
        "Design the crypto agility layer. Run: arch-design --agility-layer",
        "Plan the CA migration sequence. Run: arch-ca-migration-plan --priority root-first",
        "Run 'assemble' to submit the quantum-safe architecture design",
      ],
      fragments: [
        { trigger: "/pki-current.txt", value: "FLAG{QSAFE_", label: "Current PKI Architecture Review" },
        { trigger: "arch-design", value: "ARCH_AGILE_", label: "Crypto Agility Layer Design" },
        { trigger: "arch-ca-migration-plan", value: "PKI_DESIGN}", label: "CA Migration Sequence Plan" },
      ],
      files: {
        "/pki-current.txt": [
          "HEALTHCARE ORG — CURRENT PKI ARCHITECTURE",
          "Root CA: RSA-4096 (offline, 20-year cert, expires 2030)",
          "Intermediate CA: RSA-2048 (online, 5-year cert, expires 2027)",
          "Leaf certs: RSA-2048 (1-year, auto-renewed via ACME)",
          "HSM: Thales Luna 7 (RSA key store, firmware 7.8.4)",
          "Algorithm selection: hardcoded in CA config — NOT crypto-agile",
          "Sequence: arch-design → arch-ca-migration-plan → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "pki-current.txt", isDir: false }] },
      extraCommands: {
        "arch-design": (_args: string[]) => ({
          lines: [
            "Designing crypto agility layer for healthcare PKI...",
            "",
            "Layer 1: Cryptographic Service Abstraction",
            "  - Define CryptoProvider interface: Sign, Verify, KEM_Enc, KEM_Dec",
            "  - Implementations: RsaProvider, MlKemProvider, MlDsaProvider, CompositeProvider",
            "  - Algorithm selection via CRYPTO_ALGORITHM env var — no code changes to swap",
            "",
            "Layer 2: Agile Key Management System",
            "  - Tag all keys with: algorithm, created, rotates, vulnerability_tier",
            "  - Support simultaneous RSA + ML-DSA key pair storage",
            "  - Automate rotation for V1 keys per migration schedule",
            "  - HSM upgrade: Thales Luna 7 firmware 8.0+ supports ML-DSA",
            "",
            "Layer 3: Multi-Algorithm CA",
            "  - Update EJBCA to issue RSA + ML-DSA certs via same ACME endpoint",
            "  - Composite cert: embed both RSA and ML-DSA keys in X.509 extension",
            "  - ACME algorithm negotiation: client requests algorithm; CA issues matching cert",
            "Fragment collected.",
          ],
        }),
        "arch-ca-migration-plan": (_args: string[]) => ({
          lines: [
            "CA MIGRATION SEQUENCE — QUANTUM-SAFE PKI (NIST SP 800-57 compliant)",
            "",
            "Step 1 (2025 Q1): HSM firmware upgrade → Thales Luna 7 firmware 8.0",
            "  - Enables ML-DSA key generation; zero downtime — RSA + ML-DSA concurrent",
            "",
            "Step 2 (2025 Q2): New Root CA — ML-DSA-87 (level 5, 30-year cert)",
            "  - Cross-sign with existing RSA-4096 root (hybrid trust for transition)",
            "  - Distribute to all trust stores: Windows, macOS, Java, browsers",
            "",
            "Step 3 (2025 Q3): New Intermediate CA — ML-DSA-65",
            "  - Issue intermediate cert from ML-DSA-87 root",
            "  - Begin issuing composite leaf certs (RSA + ML-DSA) via ACME",
            "",
            "Step 4 (2026): Migrate leaf certs — 1-year renewal cycle, all 14,000 rotate naturally",
            "",
            "Step 5 (2028): Retire RSA root CA — RSA-4096 root expires 2030, retire 2028",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-d10: Supply Chain Quantum Risk ───────────────────────────────────
  {
    epochId: "quantum-4",
    wonder: { name: "CISA ICT Supply Chain Risk Management Task Force", location: "Washington, D.C., USA", era: "2024 CE", emoji: "🔍" },
    id: "quantum-d10",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Seal_of_the_United_States_Cybersecurity_and_Infrastructure_Security_Agency.svg/1200px-Seal_of_the_United_States_Cybersecurity_and_Infrastructure_Security_Agency.svg.png",
    order: 10,
    title: "Third-Party Quantum Risk",
    subtitle: "Vendor Quantum Assessment & Supply Chain Cryptography",
    category: "cybersecurity",
    xp: 170,
    badge: { id: "badge-qrm-supply", name: "Quantum Supply Chain Auditor", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "Your quantum risk is only as good as your vendors'. A CRQC-resistant system connected to an RSA-dependent supplier is still vulnerable.",
      year: 2024,
      overview: [
        "Third-party and supply chain quantum risk is one of the least-addressed aspects of post-quantum migration. An organization's own cryptographic systems may be migrated to PQC, but if the organization exchanges sensitive data with suppliers using RSA-encrypted channels, those data exchanges are still HNDL-vulnerable. B2B integrations using SOAP, REST, EDI, or SFTP often use RSA-2048 TLS and have no PQC roadmap because they are maintained by external vendors who have not been asked to provide one. CISA's supply chain guidance explicitly includes cryptographic dependency assessment as part of third-party risk management.",
        "The CISA ICT Supply Chain Risk Management Task Force has recommended that organizations extend their CBOM programs to include third-party connections: inventory all API integrations, SFTP feeds, B2B VPN tunnels, and EDI exchanges, and document the cryptographic algorithms each uses. Vendor PQC questionnaires should ask: (1) Has the vendor completed a cryptographic inventory? (2) Does the vendor have a NIST PQC migration roadmap? (3) What is the vendor's target migration completion date? (4) Does the vendor support hybrid TLS? (5) What is the vendor's SLA for cryptographic algorithm updates?",
        "Hardware supply chain quantum risk includes cryptographic hardware — HSMs, smart cards, TPM chips, TLS accelerators — that have algorithm assumptions baked into silicon. A TPM 2.0 chip manufactured before 2024 likely supports RSA and ECC but not ML-KEM or ML-DSA — the chip cannot be firmware-upgraded to add these algorithms. Organizations must incorporate PQC algorithm support requirements into hardware procurement specifications, and must plan for hardware replacement rather than firmware update for silicon-level quantum migration.",
      ],
      technical: {
        title: "Vendor PQC Assessment Questionnaire and Scoring",
        body: [
          "A structured vendor quantum risk assessment covers five domains: (1) Cryptographic inventory — has the vendor completed a CBOM? Score 0/5/10; (2) Migration roadmap — does the vendor have a published PQC migration timeline? Score 0/5/10; (3) Current hybrid support — does the vendor support X25519+ML-KEM-768 on shared TLS endpoints? Score 0/10; (4) Contract commitment — is the vendor contractually committed to PQC migration by a target date? Score 0/10; (5) Hardware lifecycle — do shared hardware devices support PQC algorithm upgrade? Score 0/5/10.",
          "Vendor risk segmentation: Tier 1 (critical data exchange, daily volume > $10M or >10k sensitive records): require vendor CBOM submission and signed PQC migration commitment within 90 days. Tier 2 (significant data exchange): require CBOM questionnaire completion within 180 days. Tier 3 (low sensitivity, low volume): include PQC support in standard contract renewal language.",
        ],
        codeExample: {
          label: "Automated vendor PQC endpoint scanner",
          code: `#!/usr/bin/env python3
"""Scan vendor TLS endpoints for PQC support status."""
import subprocess
from dataclasses import dataclass, field

@dataclass
class VendorPqcStatus:
    vendor: str
    endpoint: str
    hybrid_tls: bool = False
    risk_level: str = "HIGH"
    notes: list = field(default_factory=list)

def scan_vendor_endpoint(vendor: str, endpoint: str) -> VendorPqcStatus:
    result = subprocess.run(
        ["openssl", "s_client", "-groups", "x25519_mlkem768:x25519:secp384r1",
         "-connect", endpoint, "-brief", "-tls1_3"],
        capture_output=True, text=True, timeout=15, input=""
    )
    output = result.stderr + result.stdout
    server_key_line = next(
        (l for l in output.splitlines() if "Server Temp Key" in l), ""
    )
    hybrid = any(kw in server_key_line.upper() for kw in ["MLKEM", "KYBER"])
    status = VendorPqcStatus(vendor=vendor, endpoint=endpoint)
    status.hybrid_tls = hybrid
    status.risk_level = "ACCEPTABLE" if hybrid else "HIGH"
    if not hybrid:
        status.notes.append("RSA/ECDH only — HNDL vulnerable. Issue PQC questionnaire.")
    else:
        status.notes.append("Hybrid PQC active — HNDL protected.")
    return status

for vendor, endpoint in [
    ("EHR Vendor A", "ehr-vendor.com:443"),
    ("Lab System B", "lab-api.partner.com:443"),
]:
    s = scan_vendor_endpoint(vendor, endpoint)
    print(f"{s.vendor}: PQC={s.hybrid_tls} | {s.risk_level} | {s.notes[0]}")`,
        },
      },
      incident: {
        title: "SWIFT gpi — Coordinating PQC Migration Across 11,000 Banks",
        when: "2022–2027",
        where: "SWIFT global financial messaging network — 11,000 member institutions",
        impact: "11,000 institutions require coordinated cryptographic migration — the world's largest supply chain PQC challenge",
        body: [
          "SWIFT carries $5 trillion in daily settlement instructions among 11,000 financial institutions in 200 countries. The SWIFT network uses RSA and 3DES for message signing and encryption — algorithms that CNSA 2.0 and NIST PQC standards identify as quantum-vulnerable. Migrating SWIFT to PQC is one of the most complex supply chain cryptographic challenges in the world: every one of the 11,000 member institutions must update their SWIFT Alliance Access software, HSMs, and TLS configurations simultaneously, because SWIFT requires all parties to a transaction to use the same cryptographic algorithms.",
          "SWIFT established a PQC working group in 2022 and has begun developing post-quantum versions of its FIN messaging protocol and ISO 20022 XML messaging. The working group's timeline targets hybrid TLS deployment for the SWIFT network by 2026-2027. For organizations connected to SWIFT, the lesson is that their quantum migration timeline is not entirely under their own control — it is constrained by SWIFT's coordination schedule. This is the archetypal supply chain quantum risk scenario: your migration completion date depends on your ecosystem's migration completion date.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Your PQC System", sub: "Internal migration complete", type: "result" },
          { label: "Vendor: RSA TLS", sub: "B2B channel still HNDL vulnerable", type: "attacker" },
          { label: "Vendor Questionnaire", sub: "CBOM + PQC roadmap required", type: "system" },
          { label: "Contract SLA", sub: "Signed PQC migration commitment", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "SWIFT establishes PQC working group — 11,000 institutions" },
        { year: 2023, event: "CISA supply chain guidance includes cryptographic dependency assessment" },
        { year: 2024, event: "TPM 2.0 Forum begins specifying PQC algorithm extensions", highlight: true },
        { year: 2026, event: "SWIFT target: hybrid PQC TLS deployment across network" },
        { year: 2028, event: "Target: all Tier 1 vendors provide signed PQC migration commitment" },
      ],
      keyTakeaways: [
        "Supply chain quantum risk: your PQC system + RSA vendor channel = still HNDL vulnerable",
        "Vendor questionnaire covers: CBOM status, migration roadmap, hybrid TLS support, contract commitment",
        "Pre-2024 TPM/HSM chips may not support ML-KEM — plan hardware replacement, not just firmware",
        "SWIFT shows ecosystem coordination required — your migration may depend on vendor timelines",
      ],
      references: [
        { title: "CISA ICT Supply Chain Risk Management", url: "https://www.cisa.gov/supply-chain" },
        { title: "SWIFT PQC Working Group", url: "https://www.swift.com/" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-d10-q1", type: "Core Idea", challenge: "Vendor risk.", text: "Why is your quantum risk 'only as good as your vendors'?", options: ["A quantum-safe system connected to an RSA-dependent supplier is still exposed through that link","Vendors never use crypto","Vendors are always compliant","Supply chains have no crypto"], correctIndex: 0, explanation: "A weak vendor link reintroduces quantum-vulnerable cryptography into your trust chain." },
        { id: "quantum-d10-q2", type: "Assessment", challenge: "Vendor questionnaire.", text: "What does a vendor PQC assessment questionnaire evaluate?", options: ["The vendor's crypto inventory, PQC roadmap, and migration timeline","The vendor's office size","The vendor's marketing budget","The vendor's stock price"], correctIndex: 0, explanation: "Scoring vendors on inventory, roadmap, and timeline reveals supply-chain quantum exposure." },
        { id: "quantum-d10-q3", type: "Real World", challenge: "SWIFT gpi.", text: "What does the SWIFT gpi example illustrate about supply-chain PQC?", options: ["Coordinating migration across ~11,000 banks is a massive, interdependent undertaking","One bank can migrate alone with no coordination","SWIFT uses no cryptography","Migration is trivial"], correctIndex: 0, explanation: "Interconnected networks like SWIFT require coordinated migration across thousands of participants." },
        { id: "quantum-d10-q4", type: "Assessment", challenge: "Scanning vendors.", text: "How can a third-party risk lead objectively measure vendor PQC readiness?", options: ["Scan vendor TLS endpoints to see deployed algorithms, then score readiness","Trust the vendor's brochure","Assume all vendors are ready","Check their logo"], correctIndex: 0, explanation: "Endpoint scanning provides evidence-based readiness scoring beyond self-attestation." },
        { id: "quantum-d10-q5", type: "Strategy", challenge: "Remediation requirements.", text: "After scoring a lagging vendor, what is the appropriate action?", options: ["Issue remediation requirements with timelines as part of the contract/risk program","Ignore it","Immediately terminate all vendors","Wait until Q-Day"], correctIndex: 0, explanation: "Documented remediation requirements and deadlines drive vendors toward quantum readiness." },
        { id: "quantum-d10-q6", type: "Concept", challenge: "Trust chain.", text: "Why does a single RSA-dependent supplier undermine an otherwise quantum-safe system?", options: ["Data shared over that link inherits the supplier's quantum vulnerability","It doesn't matter","RSA is quantum-safe","Suppliers are out of scope"], correctIndex: 0, explanation: "Security is end-to-end; the weakest cryptographic link defines the system's real exposure." },
        { id: "quantum-d10-q7", type: "Assessment", challenge: "Coordination need.", text: "What does the SWIFT gpi case teach about interconnected migration?", options: ["Network participants must coordinate timelines so hybrid/PQC interoperate during transition","Each bank ignores the others","Coordination is unnecessary","Only SWIFT migrates"], correctIndex: 0, explanation: "Interoperability during transition requires coordinated, compatible migration across participants." },
        { id: "quantum-d10-q8", type: "Defense", challenge: "Program design.", text: "What makes a third-party quantum risk program effective?", options: ["Evidence-based scoring, contractual remediation requirements, and ongoing reassessment","A one-time email survey","Trusting all attestations","Removing vendors from scope"], correctIndex: 0, explanation: "Objective scoring plus enforceable, monitored remediation closes supply-chain quantum gaps." },
      ],
    },
    ctf: {
      scenario: "You're the third-party risk lead conducting a quantum vendor assessment program. Scan vendor TLS endpoints, score vendor PQC readiness, and issue remediation requirements.",
      hint: "Inventory vendor connections, scan their TLS, score readiness, then issue requirements.",
      hints: [
        "Read the vendor assessment scope. Run: cat vendor-scope.txt",
        "Scan vendor TLS endpoints for PQC support. Run: vendor-pqc-scan --tier 1",
        "Score vendors and generate remediation requirements. Run: vendor-pqc-score",
        "Run 'assemble' to submit the third-party quantum risk report",
      ],
      fragments: [
        { trigger: "/vendor-scope.txt", value: "FLAG{SUPPLY_", label: "Vendor Assessment Scope" },
        { trigger: "vendor-pqc-scan", value: "CHAIN_QUANTUM_", label: "Vendor TLS Scan — PQC Status" },
        { trigger: "vendor-pqc-score", value: "RISK_MANAGED}", label: "Vendor Scoring — Remediation Issued" },
      ],
      files: {
        "/vendor-scope.txt": [
          "QUANTUM VENDOR ASSESSMENT PROGRAM",
          "Tier 1 Vendors (critical): EHR Vendor, Lab System, Insurance Clearinghouse",
          "Assessment: TLS PQC scan + questionnaire + contract commitment review",
          "Sequence: vendor-pqc-scan → vendor-pqc-score → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "vendor-scope.txt", isDir: false }] },
      extraCommands: {
        "vendor-pqc-scan": (_args: string[]) => ({
          lines: [
            "Scanning Tier 1 vendor TLS endpoints for PQC support...",
            "",
            "EHR Vendor (ehr-vendor.com:443):",
            "  Server Temp Key: secp384r1 (ECDH) [NON-PQC — HNDL vulnerable]",
            "  Questionnaire: NOT SUBMITTED | Risk: HIGH",
            "",
            "Lab System (lab-api.partner.com:443):",
            "  Server Temp Key: X25519MLKEM768 [HYBRID PQC — HNDL protected]",
            "  Questionnaire: SUBMITTED (migration ETA 2026) | Risk: ACCEPTABLE",
            "",
            "Insurance Clearinghouse (clearinghouse.edi.com:443):",
            "  Server Temp Key: RSA-2048 (key exchange) [NON-PQC — HNDL vulnerable]",
            "  Questionnaire: IN PROGRESS | Risk: HIGH",
            "Fragment collected.",
          ],
        }),
        "vendor-pqc-score": (_args: string[]) => ({
          lines: [
            "VENDOR PQC READINESS SCORING",
            "",
            "EHR Vendor: Score 15/50 — HIGH RISK",
            "  Requirement: Submit CBOM within 30 days.",
            "  Requirement: Deploy X25519+ML-KEM-768 on all shared endpoints within 90 days.",
            "  Requirement: Signed PQC migration SLA required for contract renewal.",
            "  Escalation: CISO-level engagement required — contract at risk.",
            "",
            "Lab System: Score 42/50 — ACCEPTABLE",
            "  Commendation: Hybrid PQC deployed. Migration ETA 2026 on track.",
            "  Action: Confirm HSM migration timeline in Q2 review.",
            "",
            "Insurance Clearinghouse: Score 20/50 — HIGH RISK",
            "  Requirement: Complete PQC questionnaire within 14 days.",
            "  Requirement: RSA key exchange must be replaced within 120 days.",
            "  Note: EDI protocol (X12) migration to PQC-TLS required by 2026.",
            "",
            "Summary: 2/3 Tier 1 vendors non-compliant. Escalation required.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },
];
