import type { StageConfig, EpochConfig } from "./types";

export const quantum3Epoch: EpochConfig = {
  id: "quantum-3",
  name: "Quantum Security",
  subtitle: "QKD, Agility & Enterprise Migration",
  description:
    "Deploy quantum-safe infrastructure end-to-end — BB84 QKD protocols, quantum key distribution networks, cryptographic agility frameworks, quantum-safe VPNs and PKI, liboqs integration, FIPS 140-3 compliance, and full enterprise PQC migration planning.",
  emoji: "🛰️",
  color: "sky",
  unlocked: true,
};

export const quantum3Stages: StageConfig[] = [
  // ─── quantum-c01: BB84 Protocol ──────────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "IBM T.J. Watson Research Center", location: "Yorktown Heights, New York, USA", era: "2024 CE", emoji: "📡" },
    id: "quantum-c01",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BB84_quantum_key_distribution.svg/1200px-BB84_quantum_key_distribution.svg.png",
    order: 1,
    title: "BB84: The First QKD Protocol",
    subtitle: "Quantum Key Distribution — Security Guaranteed by Physics",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-bb84", name: "QKD Pioneer", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "BB84 turns quantum mechanics into a security guarantee — any eavesdropper disturbs the channel and is immediately detectable.",
      year: 1984,
      overview: [
        "In 1984, Charles Bennett and Gilles Brassard published BB84 — the world's first quantum key distribution protocol. Unlike mathematical cryptography, BB84's security is guaranteed by physics: the no-cloning theorem ensures that any attempt to copy a quantum state disturbs it, making eavesdroppers detectable by the laws of nature.",
        "BB84 uses photon polarization as qubits, transmitted over a quantum channel (fiber or free-space optical). Alice sends photons polarized in random bases; Bob measures in random bases. After transmission, they publicly compare which bases they used (not the bits), and keep only the bits where they used the same basis — the sifted key.",
        "The quantum bit error rate (QBER) is the key security metric. A clean channel has QBER below 5%. If an eavesdropper (Eve) measures and retransmits photons (intercept-resend attack), she introduces ~25% errors — making her presence statistically detectable. If QBER exceeds 11%, the key exchange is aborted.",
      ],
      technical: {
        title: "BB84 Protocol Mechanics",
        body: [
          "Alice's polarization bases: rectilinear (+) uses 0°/90°, diagonal (×) uses 45°/135°. Each bit is encoded as: basis+ → 0=→, 1=↑; basis× → 0=↗, 1=↘. Bob randomly chooses measurement bases. After measurement, publicly revealed bases determine the sifted key — bits where bases matched. Privacy amplification then shortens the key to remove any partial information an eavesdropper might have.",
          "QBER calculation: sample a subset of the sifted key publicly, count disagreements. QBER = errors/sample_size. For an intercept-resend attack, Eve randomly guesses 50% of bases correctly, and re-sends in wrong basis 50% of the time — introducing 25% QBER. Classical noise typically contributes 1-5% QBER. The 11% threshold gives margin above classical noise but detects Eve.",
        ],
        codeExample: {
          label: "BB84 sifted key extraction and QBER calculation (Python)",
          code: `import numpy as np

# Alice's random bases and bits
alice_bases = np.random.choice(['+', 'x'], 1000)
alice_bits  = np.random.randint(0, 2, 1000)

# Bob's random measurement bases
bob_bases = np.random.choice(['+', 'x'], 1000)

# Without Eve: Bob measures correctly when bases match
bob_bits = alice_bits.copy()  # ideal quantum channel

# Sifted key: keep bits where bases matched
matching = alice_bases == bob_bases
sifted_alice = alice_bits[matching]
sifted_bob   = bob_bits[matching]

# QBER calculation on sample
sample_size = min(100, len(sifted_alice))
qber = np.sum(sifted_alice[:sample_size] != sifted_bob[:sample_size]) / sample_size
print(f"QBER: {qber:.1%}")  # ~0% without Eve, ~25% with Eve`,
        },
      },
      incident: {
        title: "China's Micius — First Intercontinental QKD (2017)",
        when: "June 2017",
        where: "Beijing ↔ Vienna (7,600 km via Micius satellite)",
        impact: "First quantum-encrypted video call across continents — proves satellite QKD is viable",
        body: [
          "In June 2017, Chinese and Austrian researchers conducted the first intercontinental quantum-encrypted video call using the Micius satellite. The satellite distributed quantum keys to ground stations in Beijing and Vienna — 7,600 km apart — using a variant of BB84 adapted for satellite free-space links.",
          "The demonstration proved that QKD can scale beyond metropolitan fiber networks. The Micius satellite (launched 2016) operates at 500km LEO, using downward-pointing telescopes to beam single photons to ground stations. At night, when atmospheric scattering is minimal, the system achieves ~1 kbps key rate — sufficient for session keys but not bulk encryption.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Alice (Sender)", sub: "photon source, random bases", type: "system" },
          { label: "Quantum Channel", sub: "fiber or free-space optical", type: "system" },
          { label: "Eve (Attacker)", sub: "intercept-resend → 25% QBER", type: "attacker" },
          { label: "Bob (Receiver)", sub: "random measurement, QBER check", type: "victim" },
        ],
      },
      timeline: [
        { year: 1984, event: "Bennett & Brassard publish BB84 — first QKD protocol" },
        { year: 1992, event: "First experimental BB84 demonstration over 32cm in lab" },
        { year: 2007, event: "Quantum-secure ballot transmission in Swiss federal election" },
        { year: 2016, event: "China launches Micius quantum satellite" },
        { year: 2017, event: "First intercontinental QKD video call — Beijing to Vienna", highlight: true },
        { year: 2023, event: "Toshiba demonstrates QKD over 600km standard fiber" },
      ],
      keyTakeaways: [
        "BB84 security is information-theoretic — guaranteed by physics, not computational hardness",
        "QBER > 11% indicates eavesdropper — abort and retry the key exchange",
        "Sifted key generation: keep only bits where Alice and Bob used the same random basis",
        "QKD protects key exchange but requires classical channels for basis reconciliation",
        "BB84 complements PQC — together they address both current and future quantum threats",
      ],
      references: [
        { title: "Bennett & Brassard — Quantum Cryptography (1984)", url: "https://researcher.watson.ibm.com/researcher/files/us-bennetc/BB84highest.pdf" },
        { title: "China Micius satellite QKD experiment", url: "https://www.science.org/doi/10.1126/science.aan3212" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c01-q1", type: "Core Idea", challenge: "BB84 guarantee.", text: "Which quantum-mechanical principle guarantees that any eavesdropper on a BB84 channel is detectable?", options: ["The no-cloning theorem — copying an unknown quantum state disturbs it","The uncertainty of classical noise","RSA factorization hardness","AES key length"], correctIndex: 0, explanation: "The no-cloning theorem means Eve cannot copy a photon's state without disturbing it, raising the error rate." },
        { id: "quantum-c01-q2", type: "Detection", challenge: "QBER abort threshold.", text: "Above what Quantum Bit Error Rate (QBER) do Alice and Bob abort a BB84 key exchange, suspecting eavesdropping?", options: ["Above 11%","Above 50%","Above 1%","Above 90%"], correctIndex: 0, explanation: "An ~11% QBER is the security threshold; higher error rates indicate likely interception." },
        { id: "quantum-c01-q3", type: "Attack", challenge: "Intercept-resend signature.", text: "Roughly what QBER does an intercept-resend attack by Eve introduce?", options: ["~25%","~2%","~75%","0% — it is undetectable"], correctIndex: 0, explanation: "Measuring in the wrong basis half the time produces about a 25% error rate — a clear eavesdropping signal." },
        { id: "quantum-c01-q4", type: "Protocol", challenge: "Basis reconciliation.", text: "During BB84 basis reconciliation, what do Alice and Bob publicly reveal?", options: ["Only which bases they used, never the bit values","The full bit values (0 or 1)","Their private keys","The shared AES key"], correctIndex: 0, explanation: "They compare bases over a public channel and discard mismatches; the actual bit values stay secret." },
        { id: "quantum-c01-q5", type: "Real World", challenge: "Micius milestone.", text: "What did China's Micius satellite demonstrate in 2017?", options: ["The first intercontinental QKD link, Beijing–Vienna over ~7,600 km","The first quantum computer to break RSA","A room-temperature qubit","Commercial lattice cryptography"], correctIndex: 0, explanation: "Micius distributed quantum keys between Beijing and Vienna ground stations across ~7,600 km." },
        { id: "quantum-c01-q6", type: "Concept", challenge: "What QKD produces.", text: "What does QKD actually distribute between two parties?", options: ["A shared symmetric key, with eavesdropping detection","An RSA private key","Encrypted plaintext directly","A digital signature"], correctIndex: 0, explanation: "QKD establishes a shared secret key; the data itself is then encrypted classically (e.g., with AES)." },
        { id: "quantum-c01-q7", type: "Limit", challenge: "Why no-cloning matters.", text: "Why can't Eve simply copy each photon, measure the copy later, and avoid detection?", options: ["The no-cloning theorem forbids perfect duplication of an unknown quantum state","Photons are too fast to copy","Copying requires Alice's password","She would need a quantum computer"], correctIndex: 0, explanation: "Quantum mechanics prohibits cloning an arbitrary unknown state, so there is no undetectable copy-and-store attack on the photons themselves." },
        { id: "quantum-c01-q8", type: "Defense", challenge: "Response to high QBER.", text: "If BB84 measurements show a QBER of 30%, what is the correct response?", options: ["Abort and discard the key — the channel is likely compromised","Use the key anyway with extra hashing","Switch to RSA","Lower the abort threshold to 35%"], correctIndex: 0, explanation: "A QBER far above the ~11% threshold means probable eavesdropping; the key must be discarded." },
      ],
    },
    ctf: {
      scenario: "Analyze a BB84 QKD session log intercepted from a quantum channel. Determine whether Eve was eavesdropping by calculating the QBER, extract the sifted key, and assemble the flag.",
      hint: "Read the session log, use 'sift' to extract matching-basis bits, then run 'eve-check' to calculate QBER.",
      hints: [
        "Read the BB84 session intercept log. Run: cat briefing.txt",
        "Extract the sifted key from matching bases. Run: sift",
        "Calculate QBER to detect eavesdropper. Run: eve-check",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/briefing.txt", value: "FLAG{QKD_BB84_", label: "Session Log — BB84 Transmission Analyzed" },
        { trigger: "sift", value: "SIFTED_KEY_", label: "Sifted Key Extracted — Matching Bases Identified" },
        { trigger: "eve-check", value: "PHYSICS_SECURE}", label: "QBER Calculated — No Eavesdropper Detected" },
      ],
      files: {
        "/briefing.txt": [
          "=== BB84 SESSION INTERCEPT LOG ===",
          "Protocol: BB84 (Bennett-Brassard 1984)",
          "Channel: Single-photon fiber, 850nm",
          "",
          "Alice sent 20 qubits using random bases:",
          "Bases:  + x + x x + + x + x + x + x + + x x + x",
          "Bits:   0 1 1 0 1 0 1 0 0 1 1 0 0 1 1 0 0 1 1 0",
          "",
          "Bob measured using random bases:",
          "Bases:  + + x x x + x x + + + x + + x + x x + x",
          "Bits:   0 ? 1 0 1 0 ? 0 0 ? 1 0 0 ? 1 0 0 1 1 0",
          "",
          "Basis reconciliation: Alice and Bob publicly compare bases.",
          "Matching positions (0-indexed): 0,3,4,5,7,8,10,12,14,15,17,18,19",
          "",
          "SECURITY CHECK REQUIRED:",
          "Run: sift   -- extract sifted key from matching bases",
          "Run: eve-check  -- calculate QBER on sample bits",
          "Threshold: QBER > 11% indicates eavesdropper (Eve)",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "briefing.txt", isDir: false }] },
      extraCommands: {
        sift: (_args: string[]) => ({
          lines: [
            "=== SIFTED KEY EXTRACTION ===",
            "Positions where Alice and Bob used SAME basis:",
            "Pos 00: basis=+  Alice=0  Bob=0  match",
            "Pos 03: basis=x  Alice=0  Bob=0  match",
            "Pos 04: basis=x  Alice=1  Bob=1  match",
            "Pos 05: basis=+  Alice=0  Bob=0  match",
            "Pos 07: basis=x  Alice=0  Bob=0  match",
            "Pos 08: basis=+  Alice=0  Bob=0  match",
            "Pos 10: basis=+  Alice=1  Bob=1  match",
            "Pos 12: basis=+  Alice=0  Bob=0  match",
            "Pos 14: basis=x  Alice=1  Bob=1  match",
            "Pos 15: basis=+  Alice=0  Bob=0  match",
            "Pos 17: basis=x  Alice=1  Bob=1  match",
            "Pos 18: basis=+  Alice=1  Bob=1  match",
            "Pos 19: basis=x  Alice=0  Bob=0  match",
            "",
            "Sifted key (13 bits): 0010000100110",
            "After privacy amplification -> usable key: ~9 bits",
            "Fragment collected.",
            "",
            ">> LEARN: BB84 sifting discards half the bits for security",
            "   Only bits where Alice and Bob used the same random basis are kept.",
            "   The basis choices (not the bits) are publicly reconciled after transmission.",
            "   Privacy amplification then shortens the sifted key to remove Eve's partial info.",
          ],
        }),
        "eve-check": (_args: string[]) => ({
          lines: [
            "=== QBER ANALYSIS ===",
            "Testing sample bits from sifted key...",
            "Sample size: 6 bits (positions 0,3,4,7,10,19)",
            "Errors detected: 0",
            "QBER = 0/6 = 0.0%",
            "",
            "Threshold: 0-11% = clean (no eavesdropper)",
            "           11-25% = possible Eve -- abort and retry",
            "           >25% = confirmed eavesdropping",
            "",
            "Result: CHANNEL CLEAR -- Eve was NOT present.",
            "Physics: If Eve intercepted, she would have introduced ~25% QBER.",
            "The 0% QBER proves the no-cloning theorem held.",
            "Fragment collected.",
            "",
            ">> LEARN: BB84 security is guaranteed by the no-cloning theorem",
            "   An eavesdropper must guess bases and introduce ~25% QBER when wrong.",
            "   QBER above 11% triggers key exchange abort — Eve is statistically detectable.",
            "   BB84 complements PQC: physics guarantees what math cannot.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c02: QKD Infrastructure ────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "Toshiba Research Europe", location: "Cambridge, United Kingdom", era: "2023 CE", emoji: "🔭" },
    id: "quantum-c02",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bloch_sphere.svg/1200px-Bloch_sphere.svg.png",
    order: 2,
    title: "QKD Infrastructure: 600km Record",
    subtitle: "Trusted Nodes, Fiber Networks & Satellite QKD",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-qkd-net", name: "QKD Network Engineer", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "Real-world QKD requires trusted relay nodes — and each node is a classical computer that can be compromised.",
      year: 2023,
      overview: [
        "2023: Toshiba demonstrates QKD over 600km of standard fiber — shattering the previous distance record. But QKD has a fundamental limitation: photon loss over distance. At 600km, photon loss is extreme (~120 dB), requiring highly sensitive single-photon detectors and sophisticated error correction, achieving key rates of roughly 1 bps.",
        "For metropolitan QKD networks covering longer distances, trusted relay nodes are used. These intermediate stations terminate the quantum channel, measure the photons, and re-generate a new quantum channel. The key is handed off classically between nodes — meaning the relay nodes must be physically secured classical computers.",
        "Trusted relay nodes are the Achilles heel of QKD. If a relay node is compromised, the quantum guarantee is void for that link segment. The China Beijing-Shanghai backbone (4,600km) uses 32 trusted relay nodes — 32 potential attack points. Satellite QKD (like Micius) eliminates some relay nodes but introduces new attack surfaces.",
      ],
      technical: {
        title: "QKD Distance and Trusted Node Architecture",
        body: [
          "Standard single-mode fiber attenuates light at ~0.2 dB/km. At 50km, loss is 10 dB (90% of photons lost). At 100km, loss is 20 dB (99% lost). At 600km, loss is 120 dB — theoretically impossible, but Toshiba achieved it using twin-field QKD (TF-QKD), where interference between photons at a middle point extends the effective distance without a trusted node.",
          "Twin-field QKD (TF-QKD) is a breakthrough: instead of end-to-end single photon transmission, both Alice and Bob send photons to a middle relay that measures their interference. The relay is an untrusted measurement device — it learns nothing about the key. This 'measurement-device-independent' property extends range without full trusted nodes.",
        ],
        codeExample: {
          label: "Fiber QKD key rate model",
          code: `import math

def qkd_key_rate(distance_km: float) -> float:
    """Estimate QKD raw key rate (bits/s) for standard fiber."""
    loss_db = 0.2 * distance_km          # 0.2 dB/km fiber loss
    loss_linear = 10 ** (-loss_db / 10)  # convert to linear

    # BB84 raw rate scales with photon transmission probability
    source_rate_hz = 1e9          # 1 GHz photon source
    detector_efficiency = 0.85    # superconducting nanowire detector

    raw_rate = source_rate_hz * loss_linear * detector_efficiency

    # Security reduces raw to ~10% (privacy amplification)
    secure_rate = raw_rate * 0.10

    return secure_rate

print(f"50km:  {qkd_key_rate(50):.1f} bps")    # ~850,000 bps
print(f"100km: {qkd_key_rate(100):.1f} bps")   # ~8,500 bps
print(f"600km: {qkd_key_rate(600):.6f} bps")   # ~0.000001 bps (TF-QKD helps)`,
        },
      },
      incident: {
        title: "Cisco Universal Quantum Switch Eliminates Trusted Node Vulnerabilities (April 2026)",
        when: "April 2026 (Cisco UQS announcement); January 2021 (China backbone, for contrast)",
        where: "Cisco Quantum Labs, Santa Monica — enterprise and government deployments",
        impact: "Vendor-agnostic quantum switch at room temperature enables QKD relay without classical key handling — removes trusted node attack surface",
        body: [
          "China's 4,600km quantum backbone (2021) uses 32 trusted relay nodes — classical computers that hold decrypted key material and represent 32 potential attack points. An attacker who compromises any node can intercept quantum-derived keys without triggering any QBER alarm. For years, trusted nodes were considered the unavoidable Achilles heel of long-haul QKD.",
          "In April 2026, Cisco's Universal Quantum Switch changed the architecture. Operating at room temperature on standard telecom fiber, the switch performs modality-agnostic quantum state conversion — routing quantum signals without collapsing them to classical bits. Cisco Quantum Orchestra orchestrates distributed quantum devices via classical topology overlays. The SKIP interface bridges QKD key material directly into Cisco IPsec/MACsec, providing a hybrid PQC+QKD stack where even if a classical relay is compromised, the PQC layer (ML-KEM + ML-DSA on Silicon One P200) maintains protection.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Alice HQ", sub: "Cisco UQS-1 entanglement source", type: "system" },
          { label: "Cisco Universal Quantum Switch", sub: "room-temp relay — no classical key exposure", type: "attacker" },
          { label: "Bob DC", sub: "QKD receiver → Cisco SKIP → IPsec", type: "victim" },
          { label: "Quantum-Safe Tunnel", sub: "ML-KEM + QKD hybrid, Silicon One P200", type: "result" },
        ],
      },
      timeline: [
        { year: 2021, event: "China's 4,600km quantum backbone — 32 trusted relay nodes, 32 attack points", highlight: true },
        { year: 2023, event: "Toshiba 600km TF-QKD — trusted nodes reduced via twin-field" },
        { year: 2025, event: "Cisco Silicon One P200: 800G line-rate ML-KEM+ML-DSA for hybrid security" },
        { year: 2026, event: "Cisco Universal Quantum Switch — room-temp relay, no classical key exposure" },
      ],
      keyTakeaways: [
        "Trusted relay nodes are the weakest link in QKD — classical computers holding decrypted quantum keys",
        "A compromised relay gives an attacker plaintext keys without any QBER signal",
        "Cisco Universal Quantum Switch: room-temp, standard fiber, vendor-agnostic — eliminates cryogenic relay requirements",
        "Cisco SKIP interface: QKD key material → Cisco IPsec/MACsec — hybrid PQC+QKD stack on existing infrastructure",
      ],
      references: [
        { title: "Cisco Universal Quantum Switch (April 2026)", url: "https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m04/cisco-introduces-universal-quantum-switch-advancing-the-path-to-a-quantum-network.html" },
        { title: "China's integrated quantum network (Nature, 2021)", url: "https://www.nature.com/articles/s41586-020-03093-8" },
        { title: "Toshiba 600km QKD record (2023)", url: "https://www.toshiba.eu/pages/eu/Cambridge-Research-Laboratory/qkd-600km" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c02-q1", type: "Core Idea", challenge: "Relay node weakness.", text: "What is the primary security weakness of trusted relay nodes in long-haul QKD networks?", options: ["They are classical computers that hold decrypted key material and can be physically compromised","They emit too many photons","They require RSA to function","They only work at night"], correctIndex: 0, explanation: "Each trusted relay decrypts and re-encrypts keys, so a compromised node hands an attacker plaintext keys." },
        { id: "quantum-c02-q2", type: "Detection", challenge: "Silent relay compromise.", text: "Does a compromised trusted relay node produce a QBER spike that alerts the communicating parties?", options: ["No — a compromised relay yields plaintext keys with no QBER signal","Yes, QBER always spikes to 25%","Yes, it doubles the photon loss","Only if the relay is a satellite"], correctIndex: 0, explanation: "The relay legitimately holds the key, so theft there leaves no quantum error signature — the trust assumption is the vulnerability." },
        { id: "quantum-c02-q3", type: "Technology", challenge: "Twin-field QKD.", text: "How does Twin-Field QKD (TF-QKD) extend range while reducing trust?", options: ["Both endpoints send photons to an untrusted middle relay that only measures interference, not the key","It uses a satellite at all times","It encrypts the relay with RSA","It doubles the laser power"], correctIndex: 0, explanation: "The middle node in TF-QKD never learns the key — it only performs interference measurement, removing the trusted-relay risk." },
        { id: "quantum-c02-q4", type: "Real World", challenge: "Beijing–Shanghai backbone.", text: "China's ~4,600 km Beijing–Shanghai quantum backbone uses how many trusted relay nodes — each a potential attack point?", options: ["32","2","300","1"], correctIndex: 0, explanation: "The backbone chains 32 trusted relays; every node is a classical box that must be physically secured." },
        { id: "quantum-c02-q5", type: "Concept", challenge: "Why relays exist.", text: "Why are trusted relays needed at all in fiber QKD over long distances?", options: ["Photon loss in fiber limits direct QKD range, so keys are relayed hop-by-hop","RSA cannot reach that far","Satellites are illegal over land","QBER must be amplified"], correctIndex: 0, explanation: "Photons attenuate in fiber, capping direct QKD distance; relays bridge the gap but reintroduce classical trust." },
        { id: "quantum-c02-q6", type: "Real World", challenge: "Cisco quantum switch.", text: "What is notable about the Cisco Universal Quantum Switch announced in April 2026?", options: ["It operates at room temperature on standard telecom fiber","It requires cryogenic cooling","It only works with satellites","It replaces all classical keys"], correctIndex: 0, explanation: "The switch relays quantum signals at room temperature over existing fiber — no cryogenics required." },
        { id: "quantum-c02-q7", type: "Defense", challenge: "Securing relays.", text: "Given the trusted-relay risk, what is the strongest mitigation direction for QKD networks?", options: ["Move toward measurement-device-independent / twin-field schemes that remove trust from the middle node","Add more relays","Increase QBER tolerance","Disable basis reconciliation"], correctIndex: 0, explanation: "MDI-QKD and TF-QKD eliminate the trusted intermediary, closing the relay-compromise gap." },
        { id: "quantum-c02-q8", type: "Risk", challenge: "Single relay impact.", text: "What is the consequence if one trusted relay in a chain is compromised?", options: ["The attacker obtains plaintext key material for traffic transiting that hop","Only QBER rises slightly","Nothing — keys are end-to-end secret","The whole satellite fails"], correctIndex: 0, explanation: "Because the relay decrypts keys, compromising it exposes all keys passing through it." },
      ],
    },
    ctf: {
      scenario: "Audit a metropolitan QKD network topology. Identify trusted relay node attack surfaces and assess whether the satellite QKD backup provides true end-to-end security.",
      hint: "Run topology-scan to map the relay nodes, then satellite-check to assess the satellite link.",
      hints: [
        "Read the network brief. Run: cat network.txt",
        "Audit the trusted relay nodes. Run: topology-scan",
        "Assess satellite QKD security. Run: satellite-check",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/network.txt", value: "FLAG{QKD_TRUSTED_", label: "Network Brief — QKD Topology Reviewed" },
        { trigger: "topology-scan", value: "NODES_ARE_CLASSICAL_", label: "Relay Audit — Classical Attack Surface Identified" },
        { trigger: "satellite-check", value: "ENDPOINTS}", label: "Satellite Assessment — End-to-End Analysis Complete" },
      ],
      files: {
        "/network.txt": [
          "=== METRO QKD NETWORK AUDIT ===",
          "Topology: [Alice HQ] <-50km-> [Node-1] <-50km-> [Node-2] <-50km-> [Bob DC]",
          "Node-1: CISCO UNIVERSAL QUANTUM SWITCH (UQS-1) — room-temp, no classical key exposure",
          "Node-2: Legacy trusted relay node (classical computer) — HIGH RISK",
          "Satellite backup: LEO satellite (Micius-style), 500km altitude.",
          "",
          "Node-1 runs Cisco Quantum Orchestra — orchestrates via classical topology overlay.",
          "Node-1 to Bob DC: SKIP interface routes QKD keys → Cisco IPsec SA (Silicon One P200).",
          "",
          "Run: topology-scan  -- audit relay nodes",
          "Run: satellite-check  -- assess satellite QKD",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "network.txt", isDir: false }] },
      chatbotContext: "This stage covers QKD infrastructure and trusted relay node attacks. Cisco products relevant here: Cisco Universal Quantum Switch (room-temp, standard fiber, eliminates classical key handling at relay), Cisco Quantum Orchestra (orchestrates distributed quantum devices), Cisco SKIP interface (routes QKD key material into IPsec/MACsec), Cisco Silicon One P200 (800G PQC hardware for hybrid QKD+PQC security). Key insight: even if a classical relay is compromised, the Cisco PQC layer maintains protection.",
      extraCommands: {
        "topology-scan": (_args: string[]) => ({
          lines: [
            "=== TRUSTED NODE SECURITY AUDIT ===",
            "Node-1: Linux server, HSM for key storage",
            "  mgmt port accessible from ops network -- HIGH RISK",
            "Node-2: Carrier hotel, shared cage",
            "  Physical access risk from shared tenants -- HIGH RISK",
            "",
            "Key insight: A node compromise gives plaintext keys.",
            "The quantum guarantee is void between compromised segments.",
            "Mitigation: Hybrid QKD + PQC -- PQC layer protects data",
            "even if a relay node is physically compromised.",
            "Fragment collected.",
            "",
            ">> LEARN: Trusted relay nodes are the Achilles heel of long-haul QKD",
            "   China's 4,600km backbone has 32 relay nodes — each a classical attack point.",
            "   A compromised relay gives plaintext keys with no QBER signal to detect it.",
            "   Hybrid PQC+QKD ensures ML-KEM still protects the link even if a node falls.",
          ],
        }),
        "satellite-check": (_args: string[]) => ({
          lines: [
            "=== SATELLITE QKD ASSESSMENT ===",
            "Micius-style LEO satellite (500km, 2016):",
            "  Key rate: ~1 kbps at night, ~0 kbps during day",
            "  Eliminates ground relay nodes for long-distance links",
            "  The satellite itself becomes the single trusted node",
            "  Supply chain risk: launch/hardware compromise?",
            "  Ground stations are visible from space -- location exposed",
            "",
            "Weakest link: Both fiber nodes and satellite endpoints",
            "are classical hardware. The quantum channel protects",
            "transit, but endpoints remain classical problems.",
            "Fragment collected.",
            "",
            ">> LEARN: Satellite QKD replaces relay nodes with a single orbital trust point",
            "   Micius (2017) proved satellite QKD over 7,600km is operationally viable.",
            "   The satellite is the trusted relay — compromising it breaks the key exchange.",
            "   Twin-field QKD (TF-QKD) extends ground links without full trusted nodes.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c03: Micius Satellite ───────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "Chinese Academy of Sciences", location: "Beijing, China", era: "2021 CE", emoji: "🛸" },
    id: "quantum-c03",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BB84_quantum_key_distribution.svg/1200px-BB84_quantum_key_distribution.svg.png",
    order: 3,
    title: "Micius: China's Quantum Satellite",
    subtitle: "State-Sponsored Quantum Networks & SIGINT Implications",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-micius", name: "Quantum Intelligence Analyst", emoji: "🛸" },
    challengeType: "ctf",
    info: {
      tagline: "If quantum-secured communications become nation-state infrastructure, classical SIGINT — cable taps and fiber splices — stops working.",
      year: 2021,
      overview: [
        "2016: China launches Micius (墨子号) — the world's first quantum communications satellite, named after the ancient philosopher Mo-tzu. By 2021, China has a 4,600km quantum backbone connecting major cities — the largest QKD network ever built.",
        "The strategic implications are profound. Classical SIGINT collection relies heavily on passive interception of fiber traffic (cable taps, fiber splices, bulk collection). Against a quantum-secured channel protected by BB84, these techniques are physically impossible — any measurement disturbs the photons and raises QBER.",
        "The Five Eyes intelligence community faces a fundamental shift: passive collection becomes impossible against QKD-protected links. Collection must shift to active endpoint operations — more expensive, higher attribution risk, and legally more complex. This is one reason NSA issued CNSA 2.0 in 2022.",
      ],
      technical: {
        title: "How Micius Works",
        body: [
          "Micius is a 632kg satellite in sun-synchronous LEO at 500km altitude. It carries a quantum key source, entangled photon source, and downward-pointing Cassegrain telescopes. At night, atmospheric scattering is low enough to transmit single photons to ground station telescopes. During the day, solar photon background noise overwhelms the signal.",
          "The satellite performs quantum key distribution to two ground stations simultaneously using entanglement-based QKD (E91 protocol variant). Each ground station receives entangled photons; their correlated measurements establish a shared key that neither the satellite nor any interceptor can read — even if the satellite itself is compromised (in principle).",
        ],
        codeExample: {
          label: "Satellite QKD atmospheric loss model",
          code: `import math

def satellite_qkd_loss(altitude_km: float, zenith_angle_deg: float) -> float:
    """Model atmospheric loss for satellite-to-ground QKD."""
    # Geometric loss (beam divergence over altitude)
    telescope_diam_m = 0.3       # ground telescope aperture
    beam_divergence_rad = 10e-6  # diffraction-limited beam

    # Beam area at ground
    beam_radius_m = altitude_km * 1000 * beam_divergence_rad
    beam_area_m2  = math.pi * beam_radius_m ** 2
    collect_area  = math.pi * (telescope_diam_m / 2) ** 2
    geometric_eff = collect_area / beam_area_m2

    # Atmospheric transmittance (night, zenith)
    atm_transmittance = 0.8 ** (1 / math.cos(math.radians(zenith_angle_deg)))

    total_efficiency = geometric_eff * atm_transmittance
    print(f"Geometric efficiency: {geometric_eff:.6f}")
    print(f"Atmospheric transmittance: {atm_transmittance:.3f}")
    print(f"Total channel efficiency: {total_efficiency:.8f}")
    return total_efficiency

satellite_qkd_loss(500, 0)   # 500km altitude, directly overhead`,
        },
      },
      incident: {
        title: "First Intercontinental Quantum-Encrypted Video Call (2017)",
        when: "September 29, 2017",
        where: "Beijing, China ↔ Vienna, Austria (7,600 km)",
        impact: "Demonstrated quantum-secured communication across continents for the first time",
        body: [
          "Chinese Academy of Sciences President Chunli Bai and Austrian Academy of Sciences President Anton Zeilinger held the first quantum-encrypted video call, with quantum keys distributed by Micius over 7,600km. The call lasted 75 minutes and demonstrated live video conferencing over a quantum-secured channel.",
          "The keys were distributed in two segments: Micius to a Chinese ground station, and Micius to a Vienna ground station. The quantum keys were independently generated for each segment, then combined using one-time pad encryption for the call. The Micius satellite was the trusted relay — neither ground station knew the other's raw key.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Micius Satellite", sub: "500km LEO, quantum key source", type: "system" },
          { label: "Beijing Station", sub: "ground telescope receiver", type: "system" },
          { label: "Vienna Station", sub: "ground telescope receiver", type: "victim" },
          { label: "SIGINT Adversary", sub: "passive collection: impossible", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2016, event: "Micius satellite launched from Jiuquan, China" },
        { year: 2017, event: "First satellite-to-ground QKD over 1,200km" },
        { year: 2017, event: "First intercontinental quantum video call (Beijing-Vienna)", highlight: true },
        { year: 2018, event: "First loophole-free Bell test from space" },
        { year: 2021, event: "China's 4,600km integrated quantum network operational" },
      ],
      keyTakeaways: [
        "Micius proved satellite QKD is operationally viable — quantum keys distributed over 7,600km",
        "QKD makes passive SIGINT (cable taps, fiber splices) physically impossible",
        "Nation-state QKD deployments shift intelligence collection from passive to active operations",
        "Active collection has higher cost, attribution risk, and legal complexity than passive bulk collection",
        "NSA CNSA 2.0 (2022) responds to both future CRQCs and current adversary QKD deployments",
      ],
      references: [
        { title: "Micius satellite QKD experiment (Science, 2017)", url: "https://www.science.org/doi/10.1126/science.aan3211" },
        { title: "China's integrated quantum network (Nature, 2021)", url: "https://www.nature.com/articles/s41586-020-03093-8" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c03-q1", type: "Core Idea", challenge: "Passive SIGINT defeated.", text: "Why do QKD-protected fiber links defeat passive SIGINT techniques like cable taps and fiber splices?", options: ["Any measurement disturbs the photons and raises QBER, exposing the tap","The fiber is physically armored","The data is sent twice","Taps require RSA keys"], correctIndex: 0, explanation: "Tapping a quantum channel necessarily perturbs the photons, so passive interception becomes detectable." },
        { id: "quantum-c03-q2", type: "Real World", challenge: "Micius night ops.", text: "Why does the Micius satellite operate primarily at night?", options: ["Solar photon background noise overwhelms single-photon signals during the day","Its solar panels need to recharge","China restricts daytime launches","QBER is lower in cold air"], correctIndex: 0, explanation: "Daylight floods the detector with background photons; night operation keeps the single-photon signal recoverable." },
        { id: "quantum-c03-q3", type: "Strategy", challenge: "Intelligence shift.", text: "What strategic shift does widespread nation-state QKD force on intelligence agencies?", options: ["From passive bulk interception to active endpoint operations — costlier and higher attribution risk","Toward more fiber taps","Toward breaking AES-256","Abandoning all SIGINT"], correctIndex: 0, explanation: "If the wire can't be tapped passively, collection moves to the endpoints, raising cost and exposure." },
        { id: "quantum-c03-q4", type: "Real World", challenge: "Micius relay role.", text: "In the 2017 intercontinental quantum video call, what role did Micius play?", options: ["Trusted relay — distributing independent quantum keys to both ground stations","Pure end-to-end QKD with no trust","A classical RSA gateway","A quantum computer breaking the link"], correctIndex: 0, explanation: "Micius acted as a trusted relay, handing keys to the Beijing and Vienna stations separately." },
        { id: "quantum-c03-q5", type: "Policy", challenge: "CNSA 2.0 timing.", text: "Why is it argued the NSA issued CNSA 2.0 in 2022 partly in response to adversary QKD deployments?", options: ["Adversary QKD renders passive SIGINT ineffective, motivating a pivot to PQC standards","QKD broke AES","CNSA 1.0 expired automatically","QKD is cheaper than PQC"], correctIndex: 0, explanation: "As targets adopt QKD, passive collection erodes; CNSA 2.0 hardens U.S. systems with post-quantum algorithms." },
        { id: "quantum-c03-q6", type: "Concept", challenge: "QKD vs PQC scope.", text: "What does QKD protect that distinguishes it from PQC?", options: ["The key-distribution channel itself, with physics-based eavesdrop detection","All stored data forever","Digital signatures","Password hashing"], correctIndex: 0, explanation: "QKD secures key exchange via physics; PQC replaces the math of key exchange and signatures in software." },
        { id: "quantum-c03-q7", type: "Limit", challenge: "QKD endpoint risk.", text: "Even with perfect QKD on the link, where does interception risk remain?", options: ["At the endpoints and trusted relays, which QKD does not protect","In the photons","In the QBER calculation","Nowhere — QKD is total security"], correctIndex: 0, explanation: "QKD secures the channel, but compromised endpoints or relays still leak keys — driving active operations." },
        { id: "quantum-c03-q8", type: "Defense", challenge: "Countering active collection.", text: "If passive SIGINT fails against QKD, what defensive priority rises for the QKD operator?", options: ["Hardening endpoints and trusted relays against active intrusion","Increasing daytime operation","Lowering the QBER threshold","Switching keys to RSA"], correctIndex: 0, explanation: "Since attackers must now hit endpoints, endpoint and relay security becomes the decisive control." },
      ],
    },
    ctf: {
      scenario: "You are a Five Eyes signals intelligence analyst assessing China's Micius quantum satellite network and the strategic implications for SIGINT collection against quantum-protected communications.",
      hint: "Run network-assess to evaluate coverage, then sigint-impact to model collection implications.",
      hints: [
        "Read the intelligence brief. Run: cat intel-brief.txt",
        "Assess the strategic network coverage. Run: network-assess",
        "Model SIGINT implications. Run: sigint-impact",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/intel-brief.txt", value: "FLAG{QKD_MICIUS_", label: "Intel Brief — Micius Network Reviewed" },
        { trigger: "network-assess", value: "SATELLITE_", label: "Network Assessment — Strategic Coverage Analyzed" },
        { trigger: "sigint-impact", value: "SIGINT_GAP}", label: "SIGINT Model — Collection Implications Quantified" },
      ],
      files: {
        "/intel-brief.txt": [
          "=== FIVE EYES QUANTUM NETWORK ASSESSMENT ===",
          "Micius satellite (Mozi): 500km LEO, launched August 2016",
          "China backbone: 4,600km fiber, 32 trusted nodes (2021)",
          "Users: Banks, power grid, government agencies",
          "Run: network-assess -- strategic coverage",
          "Run: sigint-impact -- intelligence implications",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "intel-brief.txt", isDir: false }] },
      extraCommands: {
        "network-assess": (_args: string[]) => ({
          lines: [
            "=== CHINA QUANTUM NETWORK: STRATEGIC ASSESSMENT ===",
            "Tier 1 cities connected: Beijing, Shanghai, Jinan, Hefei",
            "Government ministries: All major agencies",
            "Financial: 4 largest state banks",
            "Critical infrastructure: Power grid command centers",
            "",
            "Technical limits: 1-10 kbps key rate on fiber",
            "Satellite: 1 (Micius) -- passes overhead 2x/day",
            "Trajectory: Micius constellation planned (2030)",
            "Fragment collected.",
            "",
            ">> LEARN: Micius proved satellite QKD works — but scale remains limited",
            "   Micius passes overhead only twice per day, limiting continuous key generation to ~kbps.",
            "   Trusted relay nodes at each ground station are still classical computers — a risk point.",
            "   China's planned Micius constellation (2030) aims to extend QKD to global coverage.",
          ],
        }),
        "sigint-impact": (_args: string[]) => ({
          lines: [
            "=== SIGINT IMPLICATIONS: QUANTUM-SECURED COMMS ===",
            "Cable taps: INEFFECTIVE against QKD",
            "Fiber splicing: Detectable via QBER spike",
            "Passive bulk collection: IMPOSSIBLE (no-cloning theorem)",
            "",
            "Collection methods that still work:",
            "  Endpoint compromise: Keys stored classically after delivery",
            "  Trusted node compromise: 32 nodes = 32 opportunities",
            "  Supply chain: Hardware implants before deployment",
            "  HUMINT: Key management personnel",
            "",
            "Assessment: QKD forces collection shift from passive to active.",
            "Active ops cost more and carry higher attribution risk.",
            "This is why NSA issued CNSA 2.0 in 2022.",
            "Fragment collected.",
            "",
            ">> LEARN: Nation-state QKD shifts SIGINT from passive to active collection",
            "   Cable taps and fiber splices are physically impossible on QKD-protected links.",
            "   Adversaries must pivot to endpoint compromise — higher cost and attribution risk.",
            "   NSA CNSA 2.0 (2022) is a direct response to both CRQC and adversary QKD deployments.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c04: Cryptographic Agility ──────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "NIST Computer Security Division", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "🔄" },
    id: "quantum-c04",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Public_key_encryption.svg/1200px-Public_key_encryption.svg.png",
    order: 4,
    title: "Cryptographic Agility",
    subtitle: "Designing Systems That Can Swap Algorithms Without Downtime",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-agility", name: "Crypto Architect", emoji: "🔄" },
    challengeType: "ctf",
    info: {
      tagline: "Systems without cryptographic agility get stuck on vulnerable algorithms for years — MD5 in 2012, DES in 2005, TLS 1.0 in 2020.",
      year: 2024,
      overview: [
        "The PQC migration is the largest cryptographic transition in history. The lesson from previous transitions — MD5 to SHA-2, DES to AES, TLS 1.0 to 1.3 — is that systems without cryptographic agility get stuck. Organizations running MD5 in 2012 were paying emergency incident response costs. Those with agile crypto swapped hash functions in a sprint.",
        "Cryptographic agility means designing systems so that cryptographic algorithms, key sizes, and parameter sets can be changed without redesigning the whole application. This requires abstracting algorithm selection behind interfaces, versioning all encrypted data, supporting parallel algorithm execution during transitions, and automated crypto inventory.",
        "For the PQC migration specifically, agility addresses: algorithm negotiation (X25519 vs ML-KEM), key size changes (1.2KB RSA cert vs 2.5KB ML-DSA cert), protocol parameter changes (MTU for larger handshakes), and certificate chain changes (dual-stack RSA + ML-DSA during transition).",
      ],
      technical: {
        title: "Cryptographic Agility Design Patterns",
        body: [
          "Five agility principles: (1) Algorithm abstraction — never hardcode algorithm names; use configuration or negotiation. (2) Negotiation — support multiple algorithms simultaneously; agree on best mutual option. (3) Versioning — tag all encrypted data with algorithm ID so old data can still be decrypted. (4) Parallel verification — accept both old and new algorithm signatures during transition windows. (5) Rollback — maintain ability to fall back to proven algorithms if new ones fail.",
          "Anti-patterns that kill agility: RSA hardcoded in TLS config; database columns sized for 256-byte RSA keys (ML-KEM needs 1568 bytes); JWT libraries pinning RS256; certificate policy requiring RSA key type; MTU assumptions (ML-KEM public key is 1184 bytes — exceeds many fragmentation thresholds).",
        ],
        codeExample: {
          label: "Agile crypto interface — Python example",
          code: `from abc import ABC, abstractmethod
from enum import Enum

class AlgoID(Enum):
    RSA_2048   = 0x0001  # legacy — read-only after cutover
    ML_KEM_768 = 0x0101  # FIPS 203
    ML_KEM_1024= 0x0102  # FIPS 203 high-security

class KeyEncapsulator(ABC):
    @abstractmethod
    def generate_keypair(self) -> tuple[bytes, bytes]: ...
    @abstractmethod
    def encapsulate(self, public_key: bytes) -> tuple[bytes, bytes]: ...
    @abstractmethod
    def decapsulate(self, ciphertext: bytes, secret_key: bytes) -> bytes: ...
    @property
    @abstractmethod
    def algo_id(self) -> AlgoID: ...

# Algorithm-tagged ciphertext format:
# [algo_id: 2B] [key_version: 4B] [ciphertext: varB]
def pack_ciphertext(algo_id: AlgoID, version: int, ct: bytes) -> bytes:
    import struct
    return struct.pack(">HI", algo_id.value, version) + ct`,
        },
      },
      incident: {
        title: "Cisco Full-Stack PQC — Cryptographic Agility in Network Infrastructure (Cisco Live 2026)",
        when: "Cisco Live 2026 Amsterdam; SHA-1 lesson: 2011-2017",
        where: "Cisco IOS-XE, NX-OS, and ASA/Firepower deployments globally",
        impact: "Cisco's agile PQC architecture lets operators swap ML-KEM for ML-KEM-1024, or add QKD key material, without replacing hardware or rebuilding VPN configs",
        body: [
          "The SHA-1 deprecation (2011-2017) is the canonical lesson in crypto agility failure: 7 years of legacy pain because certificates were hardcoded, storage was sized for 256-byte keys, and upgrade procedures required emergency change control. The PQC transition is larger — ML-KEM public keys are 1184 bytes (4.6x RSA-2048), ML-DSA signatures are 3293 bytes (51x ECDSA). Without agility, the PQC migration will be SHA-1 times ten.",
          "Cisco's response — announced at Cisco Live 2026 Amsterdam — is a fully agile PQC architecture. IOS-XE and NX-OS support negotiated algorithm selection: operators configure an ordered preference list (ML-KEM-768, X25519Kyber768, ML-KEM-1024) and the platform negotiates the strongest mutual option. The SKIP interface is algorithm-agnostic — it accepts ML-KEM keys, QKD-derived keys, or hybrid combinations without configuration changes. When NIST finalizes the next algorithm cycle, Cisco platforms update via signed software — no hardware replacement.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cisco Algorithm Config", sub: "[ML-KEM-768, X25519Kyber768, ML-KEM-1024]", type: "system" },
          { label: "IKEv2 Negotiation", sub: "strongest mutual algorithm selected", type: "system" },
          { label: "SKIP Interface", sub: "PQC or QKD key material — algorithm-agnostic", type: "victim" },
          { label: "IPsec SA Active", sub: "hot-swap on next rekey, zero downtime", type: "result" },
        ],
      },
      timeline: [
        { year: 2011, event: "NIST deprecates SHA-1 — 7 years of legacy pain begins" },
        { year: 2017, event: "Browsers block SHA-1 — emergency replacement crisis" },
        { year: 2024, event: "FIPS 203/204/205 published — PQC migration window opens", highlight: true },
        { year: 2025, event: "Cisco IOS-XE: ML-KEM negotiated key exchange in IKEv2" },
        { year: 2026, event: "Cisco announces full agile PQC stack — algorithm swap without hardware change" },
      ],
      keyTakeaways: [
        "Algorithm abstraction, negotiation, versioning, parallel verification, and rollback are the five agility principles",
        "Cisco IOS-XE supports negotiated ML-KEM algorithm selection — strongest mutual option auto-selected",
        "Cisco SKIP interface accepts PQC keys, QKD keys, or hybrid combinations — algorithm-agnostic by design",
        "ML-KEM public keys are 1184 bytes — 4.6x RSA-2048; plan database columns and MTU accordingly",
      ],
      references: [
        { title: "NIST NCCoE Cryptographic Agility (SP 1800-36)", url: "https://www.nccoe.nist.gov/crypto-agility-considerations-for-migrating-to-post-quantum-cryptographic-standards" },
        { title: "Cisco: Post-Quantum Cryptography Architecture", url: "https://www.cisco.com/site/us/en/about/trust-center/post-quantum-cryptography.html" },
        { title: "IETF RFC 7696 — Algorithm Agility Guidelines", url: "https://www.rfc-editor.org/rfc/rfc7696" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c04-q1", type: "Core Idea", challenge: "Versioning principle.", text: "Which cryptographic agility principle ensures old ciphertext can still be decrypted after an algorithm transition?", options: ["Versioning — tagging all encrypted data with an algorithm ID","Hardcoding the cipher","Disabling old algorithms immediately","Reusing keys"], correctIndex: 0, explanation: "Algorithm-ID tags let a system identify and decrypt data encrypted under prior algorithms during migration." },
        { id: "quantum-c04-q2", type: "Implementation", challenge: "ML-KEM key size.", text: "How does an ML-KEM-768 public key (~1184 bytes) compare to an RSA-2048 public key, and why does it matter?", options: ["It is ~4.6x larger and can break undersized database columns","It is the same size — no schema change","It is smaller, so no concern","It is identical to an AES key"], correctIndex: 0, explanation: "PQC keys are much larger; storage schemas and buffers sized for RSA may need to grow." },
        { id: "quantum-c04-q3", type: "Real World", challenge: "SHA-1 lesson.", text: "The SHA-1 deprecation is cited as a cautionary tale. How long did organizations spend in emergency remediation due to hardcoded algorithms?", options: ["~7 years","~6 months","~20 years","It was instant"], correctIndex: 0, explanation: "Hardcoded SHA-1 forced roughly a 7-year scramble — the case study for building agility in advance." },
        { id: "quantum-c04-q4", type: "Technology", challenge: "Cisco negotiation.", text: "Which Cisco capability lets operators define an ordered algorithm preference list (e.g., ML-KEM-768, X25519Kyber768) auto-negotiated in IKEv2?", options: ["Cisco IOS-XE with the SKIP interface","Cisco Umbrella DNS","AnyConnect captive portal","Meraki dashboard"], correctIndex: 0, explanation: "The SKIP interface in IOS-XE negotiates the strongest mutually-supported algorithm from a preference list." },
        { id: "quantum-c04-q5", type: "Anti-Pattern", challenge: "Agility killer.", text: "Which practice most directly destroys cryptographic agility?", options: ["Hardcoding RSA in a TLS config instead of abstracting algorithm choice behind a configurable interface","Tagging ciphertext with an algorithm ID","Using ephemeral keys","Maintaining a CBOM"], correctIndex: 0, explanation: "Hardcoded algorithms force code changes to migrate — the opposite of agility." },
        { id: "quantum-c04-q6", type: "Concept", challenge: "Why agility now.", text: "Why is cryptographic agility considered essential heading into the PQC transition?", options: ["New algorithms will keep emerging and some will be broken; agility lets systems swap without redesign","Because RSA is permanent","To reduce key sizes","To avoid using TLS"], correctIndex: 0, explanation: "The PQC landscape is still evolving (e.g., SIKE was broken), so swap-ability is a core design goal." },
        { id: "quantum-c04-q7", type: "Implementation", challenge: "Schema impact.", text: "What concrete infrastructure problem can large PQC keys cause if agility wasn't designed in?", options: ["Fixed-size key/cert database columns and buffers overflow or truncate","AES becomes insecure","TLS stops using certificates","QBER rises"], correctIndex: 0, explanation: "Bigger keys break assumptions baked into column widths, packet sizes, and fixed buffers." },
        { id: "quantum-c04-q8", type: "Defense", challenge: "Designing for swap.", text: "What architecture best supports future algorithm changes?", options: ["Abstract algorithm selection behind a configurable interface with versioned, tagged ciphertext","Embed the algorithm name in every function","Disable negotiation","Use one global hardcoded cipher"], correctIndex: 0, explanation: "Abstraction plus versioning is the agility pattern: change config, not code, and still read old data." },
      ],
    },
    ctf: {
      scenario: "Audit a cloud API gateway for cryptographic agility. Identify anti-patterns and validate a proposed agile migration architecture.",
      hint: "Run audit-current to find anti-patterns, then agility-test to score the proposed architecture.",
      hints: [
        "Read the agility requirements. Run: cat agility-brief.txt",
        "Audit the current implementation. Run: audit-current",
        "Validate the proposed architecture. Run: agility-test",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/agility-brief.txt", value: "FLAG{CRYPTO_AGILITY_", label: "Agility Brief — Requirements Reviewed" },
        { trigger: "audit-current", value: "SAVES_", label: "Current Audit — Anti-Patterns Identified" },
        { trigger: "agility-test", value: "MIGRATIONS}", label: "Architecture Validated — Agility Score 9/10" },
      ],
      files: {
        "/agility-brief.txt": [
          "=== CRYPTOGRAPHIC AGILITY AUDIT ===",
          "System: Cloud API gateway (10M requests/day)",
          "Current: RSA-2048 key exchange, AES-256-GCM bulk",
          "Target: ML-KEM-1024 (FIPS 203) + AES-256-GCM hybrid",
          "Anti-patterns to find: hardcoded algorithms, undersized buffers, MTU issues",
          "Run: audit-current  -- scan current implementation",
          "Run: agility-test  -- validate proposed architecture",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "agility-brief.txt", isDir: false }] },
      extraCommands: {
        "audit-current": (_args: string[]) => ({
          lines: [
            "=== CURRENT CRYPTO AUDIT ===",
            "[CRIT] crypto/tls.go:47: RSA-2048 hardcoded in TLS config",
            "[CRIT] db/keys.go:23: key_blob VARBINARY(256) -- too small for ML-KEM",
            "[CRIT] nginx.conf:891: ssl_protocols TLSv1.2 only -- no TLS 1.3",
            "[HIGH] api/auth.go:103: JWT signed with RS256 (hardcoded)",
            "[HIGH] infra/alb.tf:34: Certificate policy pins RSA key type",
            "[MED] No algorithm version tag on encrypted payloads",
            "[MED] Key rotation requires full redeploy (no hot swap)",
            "",
            "Agility score: 2/10 -- migration effort: 18-24 months",
            "Fragment collected.",
            "",
            ">> LEARN: Hardcoded algorithms create multi-year migration debt",
            "   The SHA-1 deprecation (2011-2017) caused 7 years of emergency remediation.",
            "   ML-KEM public keys are 1184 bytes — 4.6x RSA-2048, breaks undersized DB columns.",
            "   Anti-patterns: pinned RSA in TLS config, JWT libraries hardcoding RS256.",
          ],
        }),
        "agility-test": (_args: string[]) => ({
          lines: [
            "=== AGILE ARCHITECTURE VALIDATION ===",
            "TLS negotiation: X25519MLKEM768 offered, X25519 fallback -- OK",
            "Key tagging: [algo_id:2B][version:4B][ciphertext:varB] -- OK",
            "DB schema: key_blob VARBINARY(2048) -- OK",
            "MTU: Jumbo frames (9000) for PQC handshake -- OK",
            "Parallel verify: old+new keys accepted for 90d window -- OK",
            "CBOM: Syft + CycloneDX automated monthly scan -- OK",
            "",
            "Agility score: 9/10 -- migration effort: 6 months",
            "Fragment collected.",
            "",
            ">> LEARN: Crypto agility cuts migration effort from years to months",
            "   Five principles: abstraction, negotiation, versioning, parallel verify, rollback.",
            "   IETF RFC 7696 defines algorithm agility guidelines for protocol designers.",
            "   Cisco IOS-XE supports negotiated ML-KEM — strongest mutual option auto-selected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c05: Quantum-Safe VPN ───────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "WireGuard / IETF PQUIP Working Group", location: "Internet Engineering Task Force (Global)", era: "2024 CE", emoji: "🛡️" },
    id: "quantum-c05",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BB84_quantum_key_distribution.svg/1200px-BB84_quantum_key_distribution.svg.png",
    order: 5,
    title: "Quantum-Safe VPN Configuration",
    subtitle: "WireGuard + ML-KEM Hybrid Key Exchange in Practice",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-vpn", name: "Quantum VPN Engineer", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "VPN traffic recorded today will be decryptable at Q-Day — HNDL makes VPN migration the highest-priority PQC task for most enterprises.",
      year: 2024,
      overview: [
        "VPNs are the most widely-deployed cryptographic infrastructure in enterprise networking. Traditional VPNs use Diffie-Hellman or ECDH for key exchange — both broken by Shor's algorithm on a CRQC. An adversary recording today's VPN traffic can decrypt it the day a cryptographically-relevant quantum computer exists.",
        "The IETF PQUIP (Post-Quantum Use in Protocols) working group is standardizing PQC for VPN protocols. WireGuard is leading adoption. Mullvad VPN deployed WireGuard + post-quantum KEM in production in 2023 — the first commercial VPN to do so. OpenVPN and StrongSwan (IKEv2) also have PQC extensions in draft.",
        "The hybrid approach is essential: combining X25519 (classical) with ML-KEM-768 (PQC) means neither algorithm alone determines security. If ML-KEM has an undiscovered weakness, X25519 still provides classical security. If X25519 is broken by a quantum computer, ML-KEM provides PQC security. Both must fail simultaneously to break the hybrid.",
      ],
      technical: {
        title: "WireGuard + ML-KEM Hybrid Key Exchange",
        body: [
          "WireGuard uses the Noise protocol framework (Noise_IKpsk2) for key exchange. The base protocol uses Curve25519 ECDH. The PQC extension adds an ML-KEM-768 layer: both peers exchange ML-KEM public keys during handshake, and the resulting shared secrets are combined via KDF: shared_secret = KDF(X25519_output || ML-KEM-768_output).",
          "Authentication in quantum-safe WireGuard uses ML-DSA-65 (FIPS 204) peer certificates, replacing RSA-2048 x.509 certificates. The CA is migrated to ML-DSA-87 root (FIPS 204 level 5). Performance impact: handshake adds ~2ms for ML-KEM KEM operation; ~1.5KB additional key material per session; bulk throughput via AES-256-GCM is unchanged.",
        ],
        codeExample: {
          label: "WireGuard PQC hybrid key exchange (configuration)",
          code: `# WireGuard PQC Configuration (ML-KEM-768 + X25519 hybrid)
# Using WireGuard PQ fork (Mullvad implementation)

[Interface]
PrivateKey = <base64-encoded Curve25519 private key>
PQPrivateKey = <base64-encoded ML-KEM-768 decapsulation key>
Address = 10.0.0.1/24

[Peer]
PublicKey = <base64-encoded Curve25519 public key>
PQPublicKey = <base64-encoded ML-KEM-768 encapsulation key>
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = peer.example.com:51820

# Hybrid shared secret derivation (internal):
# shared = KDF(X25519(priv, pub) || ML-KEM-768-Decaps(pq_priv, pq_ct))
# Security: breaks only if BOTH X25519 AND ML-KEM-768 are broken`,
        },
      },
      incident: {
        title: "Mullvad Deploys First Production Quantum-Safe VPN (2023)",
        when: "December 2023",
        where: "Mullvad VPN — global commercial service",
        impact: "First commercial VPN to deploy post-quantum key exchange in production for all users",
        body: [
          "In December 2023, Mullvad VPN deployed WireGuard with post-quantum key exchange using McEliece + Curve25519 hybrid for all of its users. McEliece is an older code-based PQC algorithm not selected by NIST (too large for certificates) but well-studied. Mullvad's implementation makes ~1.5MB McEliece public keys work by exchanging them separately from the WireGuard handshake.",
          "The deployment proves enterprise viability: millions of users experience quantum-safe VPN with no noticeable performance impact. Mullvad is transitioning to ML-KEM as FIPS 203 implementations stabilize. This real-world deployment provides valuable production experience ahead of the broader enterprise migration wave.",
        ],
      },
      diagram: {
        nodes: [
          { label: "OpenVPN DH/ECDH", sub: "VULNERABLE — broken by Shor's", type: "attacker" },
          { label: "X25519 (classical)", sub: "HNDL risk: records today", type: "system" },
          { label: "ML-KEM-768 (PQC)", sub: "FIPS 203, quantum-resistant", type: "system" },
          { label: "Hybrid shared_secret", sub: "KDF(X25519 || ML-KEM) — both must break", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "WireGuard merged into Linux kernel — standard VPN protocol" },
        { year: 2022, event: "IETF PQUIP working group formed for PQC protocol migration" },
        { year: 2023, event: "Mullvad deploys first production quantum-safe VPN (McEliece+X25519)", highlight: true },
        { year: 2024, event: "FIPS 203 published — ML-KEM available for production VPN integration" },
        { year: 2026, event: "Expected: IETF draft for IKEv2+ML-KEM reaches RFC status" },
      ],
      keyTakeaways: [
        "All current VPN key exchange (DH, ECDH) is broken by Shor's algorithm — VPN is highest HNDL priority",
        "Hybrid X25519+ML-KEM-768 is the recommended transition approach — both algorithms must fail to break security",
        "WireGuard PQ fork is production-proven (Mullvad) — use ML-KEM-768 or McEliece variant",
        "Authentication (peer certificates) must also migrate: RSA → ML-DSA-65 (FIPS 204)",
        "Bulk encryption (AES-256-GCM) is unaffected — only key exchange and authentication need migration",
      ],
      references: [
        { title: "Mullvad post-quantum VPN announcement", url: "https://mullvad.net/en/blog/post-quantum-secure-vpn" },
        { title: "IETF PQUIP Working Group", url: "https://datatracker.ietf.org/wg/pquip/about/" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c05-q1", type: "Core Idea", challenge: "VPN HNDL priority.", text: "Why is VPN migration considered the highest Harvest-Now-Decrypt-Later (HNDL) priority for most enterprises?", options: ["Recorded VPN traffic can be decrypted once a quantum computer breaks DH/ECDH key exchange via Shor's algorithm","VPNs use no encryption","VPN keys never expire","VPNs run only on satellites"], correctIndex: 0, explanation: "Captured VPN sessions whose key exchange relies on DH/ECDH become readable at Q-Day — a classic HNDL target." },
        { id: "quantum-c05-q2", type: "Concept", challenge: "Hybrid VPN security.", text: "In a hybrid X25519 + ML-KEM-768 VPN, what must an attacker do to decrypt a session?", options: ["Break both X25519 and ML-KEM-768 simultaneously","Break only ML-KEM-768","Break only X25519","Guess the AES key"], correctIndex: 0, explanation: "Hybrid security holds as long as either component remains unbroken — both must fall." },
        { id: "quantum-c05-q3", type: "Concept", challenge: "Bulk cipher safety.", text: "Which part of an OpenVPN deployment stays quantum-safe even without migration?", options: ["AES-256 bulk encryption — Grover only halves it to ~128-bit strength","RSA peer authentication","ECDH key exchange","The DH handshake"], correctIndex: 0, explanation: "Symmetric AES-256 retains ~128-bit security against Grover; the key exchange and signatures are the weak links." },
        { id: "quantum-c05-q4", type: "Real World", challenge: "First PQC VPN.", text: "Which VPN provider became the first commercial service to deploy hybrid post-quantum key exchange for all users (Dec 2023)?", options: ["Mullvad VPN","NordVPN","ExpressVPN","OpenVPN Inc."], correctIndex: 0, explanation: "Mullvad shipped production hybrid PQC key exchange to all users in December 2023." },
        { id: "quantum-c05-q5", type: "Pitfall", challenge: "Auth cert migration.", text: "Is it safe to skip migrating VPN peer authentication certificates from RSA to ML-DSA-65 because bulk encryption is already quantum-resistant?", options: ["No — RSA signatures are broken by Shor's, so auth certs must also migrate","Yes, certs don't matter","Yes, AES covers authentication","Only on satellites"], correctIndex: 0, explanation: "Authentication relies on RSA signatures, which Shor's algorithm breaks; certs need ML-DSA-65 (FIPS 204)." },
        { id: "quantum-c05-q6", type: "Concept", challenge: "Grover vs Shor.", text: "Why does Grover's algorithm threaten symmetric keys far less than Shor's threatens public-key crypto?", options: ["Grover gives only a quadratic speedup (halving key strength); Shor breaks RSA/ECC outright","Grover is faster than Shor","Grover targets AES keys directly with no cost","Shor only affects AES"], correctIndex: 0, explanation: "Grover's quadratic speedup is countered by doubling key length; Shor's exponential speedup destroys RSA/ECC." },
        { id: "quantum-c05-q7", type: "Strategy", challenge: "Why HNDL now.", text: "What makes VPN traffic a present-day risk rather than a future one?", options: ["Adversaries can record ciphertext today and decrypt it after Q-Day","VPNs are already broken","Quantum computers exist now at scale","VPNs send plaintext"], correctIndex: 0, explanation: "HNDL means the harvest happens now; decryption merely waits for sufficient quantum capability." },
        { id: "quantum-c05-q8", type: "Defense", challenge: "Migration order.", text: "For a VPN gateway, which migration delivers the most HNDL risk reduction first?", options: ["Hybridizing the key exchange (e.g., X25519 + ML-KEM-768)","Disabling AES-256","Shortening session timeouts only","Switching logs to JSON"], correctIndex: 0, explanation: "Protecting the key exchange stops harvested sessions from being decryptable later — the core HNDL fix." },
      ],
    },
    ctf: {
      scenario: "Audit an existing OpenVPN deployment for quantum vulnerabilities, then validate a proposed WireGuard + ML-KEM hybrid migration.",
      hint: "Run vpn-audit to assess OpenVPN, then wireguard-pqc to validate the hybrid config.",
      hints: [
        "Read the VPN migration brief. Run: cat vpn-brief.txt",
        "Audit the current OpenVPN deployment. Run: vpn-audit",
        "Validate the WireGuard PQC config. Run: wireguard-pqc",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/vpn-brief.txt", value: "FLAG{VPN_", label: "VPN Brief — Migration Requirements Reviewed" },
        { trigger: "vpn-audit", value: "QUANTUM_SAFE_", label: "OpenVPN Audit — Vulnerabilities Identified" },
        { trigger: "wireguard-pqc", value: "HYBRID}", label: "WireGuard PQC — Hybrid Config Validated" },
      ],
      files: {
        "/vpn-brief.txt": [
          "=== ENTERPRISE VPN QUANTUM MIGRATION ===",
          "Current: OpenVPN, 2,000 endpoints, 15 sites",
          "Target: WireGuard + ML-KEM-768 hybrid",
          "HNDL impact: Nation-states recording VPN traffic today.",
          "Run: vpn-audit  -- assess current OpenVPN",
          "Run: wireguard-pqc  -- validate proposed config",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "vpn-brief.txt", isDir: false }] },
      extraCommands: {
        "vpn-audit": (_args: string[]) => ({
          lines: [
            "=== OPENVPN QUANTUM AUDIT ===",
            "Key exchange: DH group14 (2048-bit MODP)",
            "  Status: VULNERABLE -- broken by Shor's algorithm",
            "  HNDL risk: HIGH -- all recorded sessions decryptable at Q-Day",
            "Cipher: AES-256-CBC -- SAFE (Grover's OK at 256-bit)",
            "Authentication: RSA-2048 certs -- VULNERABLE (Shor's breaks RSA sigs)",
            "TLS control channel: TLSv1.2 ECDHE-RSA-AES256-GCM -- VULNERABLE",
            "",
            "Quantum score: 4/10 (HIGH RISK)",
            "Recommendation: Migrate to WireGuard + ML-KEM hybrid",
            "Fragment collected.",
            "",
            ">> LEARN: OpenVPN with DH/ECDH is vulnerable to Shor's algorithm at Q-Day",
            "   Every recorded VPN session today is an HNDL target — key exchange is the critical weakness.",
            "   AES-256 and SHA-384 in the data channel remain safe (Grover's halves strength, 256->128 effective).",
            "   IETF RFC 9370 standardizes hybrid PQC key exchange for IKEv2 in IPsec VPNs.",
          ],
        }),
        "wireguard-pqc": (_args: string[]) => ({
          lines: [
            "=== WIREGUARD + ML-KEM HYBRID ===",
            "Key exchange: Noise_IKpsk2 + ML-KEM-768 layer",
            "Hybrid: shared = KDF(X25519 || ML-KEM-768 shared secrets)",
            "Auth: ML-DSA-65 (FIPS 204) peer certs",
            "CA: ML-DSA-87 root on HSM",
            "Performance: +2ms handshake, +1.5KB/session, throughput unchanged",
            "",
            "Security: Both X25519 AND ML-KEM-768 must break simultaneously.",
            "HNDL protection: ML-KEM provides quantum-resistant key exchange.",
            "Quantum score: 9/10",
            "Fragment collected.",
            "",
            ">> LEARN: VPN key exchange is the highest HNDL priority for most enterprises",
            "   DH and ECDH used in OpenVPN and IKEv2 are both broken by Shor's algorithm.",
            "   Hybrid X25519+ML-KEM-768 requires both to fail simultaneously — safe during transition.",
            "   Mullvad VPN deployed hybrid quantum-safe WireGuard for all users in December 2023.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c06: Quantum-Safe PKI ───────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "DigiCert HQ", location: "Lehi, Utah, USA", era: "2024 CE", emoji: "🔑" },
    id: "quantum-c06",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Public_key_encryption.svg/1200px-Public_key_encryption.svg.png",
    order: 6,
    title: "Quantum-Safe PKI Migration",
    subtitle: "Root CAs, Certificate Chains & HSM Firmware Updates",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-pki", name: "PKI Migration Architect", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "A Root CA key with a 20-year validity period spans Q-Day — the single most dangerous artifact in your cryptographic inventory.",
      year: 2024,
      overview: [
        "The PKI infrastructure underpinning the internet is built on RSA and ECDSA — both vulnerable to quantum computers. Certificate authorities, OCSP responders, CRLs, HSMs, smart cards, and every certificate-relying application must be migrated to PQC algorithms.",
        "Root CA keys have 20-30 year lifespans — by design. A root CA key issued in 2010 that is still active in 2035, when quantum computers may be viable, represents a single point of failure for the entire trust hierarchy. If a quantum adversary forges a root CA signature, they can impersonate any site in the CA's trust domain.",
        "The dual-stack strategy addresses the transition problem: issue certificates with both RSA-2048 (or ECDSA) and ML-DSA-65 keys simultaneously. PQC-capable clients verify ML-DSA; legacy clients fall back to RSA. The same Subject Alternative Names (SANs) cover both certificates, enabling gradual cutover without interoperability breaks.",
      ],
      technical: {
        title: "PKI Quantum Migration Challenges",
        body: [
          "Certificate size impact: ML-DSA-65 certificate is ~2.5KB vs RSA-2048 at ~1.2KB. A full chain (root + intermediate + end-entity) is ~7.5KB for PQC vs ~3.6KB for RSA. This can exceed TLS record sizes and cause fragmentation. QUIC and TLS 1.3 handle this better than TLS 1.2, which is another reason to enforce TLS 1.3.",
          "HSM support is gating: most enterprise HSMs require firmware updates to support ML-KEM and ML-DSA. Thales Luna 7 (firmware 7.8+), AWS CloudHSM (preview), and Microsoft Azure Managed HSM support ML-KEM and ML-DSA. YubiHSM 2 hardware cannot be updated — replacement is required.",
        ],
        codeExample: {
          label: "Generate ML-DSA-65 root CA certificate (OpenSSL + oqs-provider)",
          code: `# Generate ML-DSA-65 root CA using oqs-provider for OpenSSL 3.x
# Requires: openssl 3.x + oqs-provider installed

# Generate ML-DSA-65 private key (FIPS 204 level 3)
openssl genpkey \\
    -provider oqs \\
    -algorithm mldsa65 \\
    -out root-ca-mldsa65.key

# Generate self-signed root CA certificate
openssl req \\
    -new -x509 \\
    -provider oqs \\
    -key root-ca-mldsa65.key \\
    -out root-ca-mldsa65.crt \\
    -days 7300 \\
    -subj "/C=US/O=Org/CN=Root CA ML-DSA-65" \\
    -extensions v3_ca

# View certificate (note: larger than RSA equivalent)
openssl x509 -in root-ca-mldsa65.crt -text -noout | head -30
# Signature Algorithm: id-ml-dsa-65
# Public Key: (1952 bit)  <- vs RSA 2048-bit key`,
        },
      },
      incident: {
        title: "DigiCert Issues First PQC Test Certificates (2024)",
        when: "October 2024",
        where: "DigiCert Certificate Authority — global trust anchor",
        impact: "First production-grade ML-DSA certificates issued by a major CA — begins the trust chain migration",
        body: [
          "In October 2024, DigiCert issued the first ML-DSA (FIPS 204) test certificates from a production root CA, available to enterprise customers for testing. These certificates chain to a dedicated PQC test root, allowing organizations to test their PQC certificate handling without affecting production trust chains.",
          "The milestone demonstrates that the PKI ecosystem is ready to begin the transition. DigiCert also published a PQC migration guide covering dual-stack certificate issuance, HSM firmware requirements, and a 3-year migration roadmap from initial testing to full production deployment of ML-DSA certificates.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Root CA (ML-DSA-87)", sub: "20-30yr validity, HSM-protected", type: "system" },
          { label: "Intermediate CA (dual-stack)", sub: "RSA-3072 + ML-DSA-65", type: "system" },
          { label: "End-Entity Cert", sub: "dual-stack during transition", type: "victim" },
          { label: "Quantum Adversary", sub: "targets RSA root — signature forgery", type: "attacker" },
        ],
      },
      timeline: [
        { year: 2022, event: "NSA CNSA 2.0 mandates ML-DSA for NSS certificate signing" },
        { year: 2024, event: "FIPS 204 (ML-DSA) published — PKI migration begins", highlight: true },
        { year: 2024, event: "DigiCert issues first ML-DSA test certificates" },
        { year: 2026, event: "Expected: major browser roots add ML-DSA root CAs" },
        { year: 2030, event: "NIST: RSA-2048 deprecated for new certificate issuance" },
        { year: 2035, event: "NSA deadline: RSA/ECDSA certs retired from NSS" },
      ],
      keyTakeaways: [
        "Root CA keys with 20-30yr validity may span Q-Day — they are the highest-priority migration target",
        "Dual-stack certificates (RSA + ML-DSA) enable graceful transition without interoperability breaks",
        "ML-DSA certificates are ~2x larger than RSA — audit MTU settings and TLS record handling",
        "HSMs must support ML-KEM/ML-DSA: Thales Luna 7 (7.8+) and AWS CloudHSM are ready; YubiHSM 2 requires replacement",
        "NIST SP 800-131A Rev 3 sets the federal transition timeline — RSA deprecated after 2030",
      ],
      references: [
        { title: "NIST SP 800-131A Rev 3 — Transitioning Cryptographic Algorithms", url: "https://csrc.nist.gov/publications/detail/sp/800-131a/rev-3/draft" },
        { title: "DigiCert PQC Migration Guide", url: "https://www.digicert.com/post-quantum" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c06-q1", type: "Core Idea", challenge: "Root CA priority.", text: "Why are root CA keys the highest-priority PQC migration target?", options: ["Their 20–30 year validity may span Q-Day, and a forged root signature impersonates any site in the trust domain","They are the easiest to replace","They are never used","They use AES"], correctIndex: 0, explanation: "Long-lived roots cross Q-Day, and breaking one undermines the entire PKI trust chain." },
        { id: "quantum-c06-q2", type: "Strategy", challenge: "Dual-stack certs.", text: "What does a dual-stack certificate strategy accomplish during migration?", options: ["Issues both RSA and ML-DSA credentials so PQC clients use ML-DSA while legacy clients fall back to RSA","Forces all clients to PQC instantly","Removes certificates entirely","Uses two AES keys"], correctIndex: 0, explanation: "Dual-stack lets capable clients negotiate PQC while preserving compatibility for legacy ones." },
        { id: "quantum-c06-q3", type: "Implementation", challenge: "HSM replacement.", text: "Which HSM example cannot be firmware-upgraded to support ML-KEM/ML-DSA, requiring full hardware replacement?", options: ["YubiHSM 2","A purely software keystore","Any cloud KMS","An ML-DSA token"], correctIndex: 0, explanation: "Some HSMs (cited: YubiHSM 2) lack the headroom to add PQC via firmware and must be replaced." },
        { id: "quantum-c06-q4", type: "Implementation", challenge: "Chain size impact.", text: "How does a full ML-DSA certificate chain (~7.5 KB) compare to an equivalent RSA chain (~3.6 KB)?", options: ["Roughly double the size, which can cause TLS fragmentation","Half the size","Identical","Ten times smaller"], correctIndex: 0, explanation: "Larger PQC signatures roughly double chain size, risking TLS record fragmentation and handshake issues." },
        { id: "quantum-c06-q5", type: "Policy", challenge: "RSA-2048 deprecation.", text: "What does NIST SP 800-131A Rev 3 do regarding RSA-2048 certificate issuance?", options: ["Deprecates RSA-2048 for all new certificate issuance after 2030","Mandates RSA-2048 forever","Bans ML-DSA","Requires SHA-1"], correctIndex: 0, explanation: "SP 800-131A Rev 3 sets a 2030 cutoff for new RSA-2048 issuance, pushing PKI toward PQC." },
        { id: "quantum-c06-q6", type: "Concept", challenge: "Forged root danger.", text: "What is the worst-case impact of an attacker forging a root CA signature?", options: ["They can impersonate any site that chains to that root","Only one website is affected","TLS sessions slow down","QBER rises"], correctIndex: 0, explanation: "A forged root undermines every certificate beneath it, enabling universal impersonation in that trust domain." },
        { id: "quantum-c06-q7", type: "Strategy", challenge: "Migration sequencing.", text: "Within a PKI, which key should be migrated to PQC first and why?", options: ["The root CA — longest validity and broadest blast radius","End-entity leaf certs only","Test certificates","Expired certs"], correctIndex: 0, explanation: "The root's longevity and trust scope make it the top sequencing priority." },
        { id: "quantum-c06-q8", type: "Defense", challenge: "Handling chain bloat.", text: "What mitigation addresses TLS fragmentation from larger PQC certificate chains?", options: ["Tuning record sizes / using algorithms and chain designs that limit handshake bloat","Disabling certificates","Reverting to RSA-1024","Removing the intermediate CA from the chain entirely"], correctIndex: 0, explanation: "Operators manage handshake size by tuning record/fragment handling and minimizing unnecessary chain bloat." },
      ],
    },
    ctf: {
      scenario: "Audit an enterprise PKI with 3 root CAs and 8 intermediate CAs for quantum risk. Assess HSM support and design the migration priority order.",
      hint: "Run ca-inventory to audit the certificate hierarchy, then hsm-check for hardware support status.",
      hints: [
        "Read the PKI migration brief. Run: cat pki-brief.txt",
        "Audit the certificate authority hierarchy. Run: ca-inventory",
        "Assess HSM firmware support. Run: hsm-check",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/pki-brief.txt", value: "FLAG{PKI_MIGRATION_", label: "PKI Brief — Migration Requirements Reviewed" },
        { trigger: "ca-inventory", value: "HSM_", label: "CA Inventory — Risk Priority Established" },
        { trigger: "hsm-check", value: "FIRST}", label: "HSM Assessment — Hardware Readiness Confirmed" },
      ],
      files: {
        "/pki-brief.txt": [
          "=== ENTERPRISE PKI QUANTUM MIGRATION ===",
          "Scope: 3 Root CAs, 8 Intermediate CAs, ~50,000 end-entity certs",
          "HSMs: Thales Luna 7, AWS CloudHSM, YubiHSM 2",
          "NIST guidance: RSA-2048 deprecated after 2030 (SP 800-131A Rev 3)",
          "Run: ca-inventory  -- audit certificate hierarchy",
          "Run: hsm-check  -- assess hardware support",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "pki-brief.txt", isDir: false }] },
      extraCommands: {
        "ca-inventory": (_args: string[]) => ({
          lines: [
            "=== CA INVENTORY ===",
            "Root-1: RSA-4096, expires 2038, Thales Luna 7",
            "Root-2: P-384 ECDSA, expires 2035, AWS CloudHSM",
            "Root-3: RSA-2048, expires 2030, YubiHSM 2 (OFFLINE) -- HIGH RISK",
            "  Issued 2010 -- 20 years HNDL exposure, must replace immediately",
            "",
            "Migration priority:",
            "  1. Root-3 -> ML-DSA-87 root (immediate -- expires 2030)",
            "  2. Code-Signing CA -> ML-DSA-87 intermediate",
            "  3. TLS issuers -> dual-stack RSA-3072 + ML-DSA-65",
            "Fragment collected.",
            "",
            ">> LEARN: Root CA keys with 20+ year validity span Q-Day",
            "   A root CA issued in 2010 still active in 2035 can be broken by a CRQC.",
            "   Forged root signatures let an attacker impersonate any site in the trust domain.",
            "   Dual-stack certs (RSA + ML-DSA) enable graceful migration without breaking clients.",
          ],
        }),
        "hsm-check": (_args: string[]) => ({
          lines: [
            "=== HSM PQC SUPPORT ===",
            "Thales Luna 7 (Root-1): firmware 7.8.0",
            "  ML-KEM: YES (FIPS 203) | ML-DSA: YES (FIPS 204) -- READY",
            "",
            "AWS CloudHSM (Root-2): managed service",
            "  ML-KEM: preview | ML-DSA: preview",
            "  Action: enroll in PQC preview program",
            "",
            "YubiHSM 2 (Root-3, OFFLINE): firmware 2.4.0",
            "  ML-KEM: NO | ML-DSA: NO -- hardware not upgradeable",
            "  Action: REPLACE with Thales Luna 7 or YubiHSM 3",
            "",
            "Total migration estimate: $180K hardware + $220K labor",
            "Fragment collected.",
            "",
            ">> LEARN: HSM firmware support gates PKI migration",
            "   Most enterprise HSMs require firmware updates to support ML-KEM and ML-DSA.",
            "   Thales Luna 7 (7.8+) and AWS CloudHSM support PQC — YubiHSM 2 requires replacement.",
            "   HSM procurement lead times can be 6-12 months — start the hardware review now.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c07: liboqs ─────────────────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "University of Waterloo", location: "Waterloo, Ontario, Canada", era: "2024 CE", emoji: "📦" },
    id: "quantum-c07",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bloch_sphere.svg/1200px-Bloch_sphere.svg.png",
    order: 7,
    title: "liboqs: Open Quantum Safe",
    subtitle: "Deploying PQC Algorithms via the Open Quantum Safe Library",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-liboqs", name: "PQC Implementer", emoji: "📦" },
    challengeType: "ctf",
    info: {
      tagline: "liboqs is the reference C library for post-quantum algorithms — integrated into OpenSSL, nginx, curl, and Chromium for testing.",
      year: 2024,
      overview: [
        "The Open Quantum Safe (OQS) project, led from the University of Waterloo, provides liboqs — the reference C library implementing NIST PQC algorithms. Before the FIPS standards were finalized, liboqs was the primary way researchers and engineers could experiment with PQC. Now it is integrated into OpenSSL (via oqs-provider), nginx, curl, and Chromium for testing.",
        "liboqs supports all NIST-standardized algorithms: ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205), and FN-DSA/FALCON. It also supports hybrid key exchange groups (X25519MLKEM768) for use in TLS. Language bindings exist for C, Python, Go, Java, Rust, and .NET.",
        "While liboqs is the reference implementation and is widely used for testing, it is not FIPS 140-3 validated. For production federal deployments, validated modules (AWS-LC cert #4800, Microsoft SymCrypt) are required. liboqs is appropriate for research, testing, and non-federal production use.",
      ],
      technical: {
        title: "liboqs KEM API and Integration",
        body: [
          "The liboqs KEM API follows a keypair → encapsulate → decapsulate flow. ML-KEM-768 key sizes: public key 1184 bytes, secret key 2400 bytes, ciphertext 1088 bytes, shared secret 32 bytes. The oqs-provider integrates liboqs into OpenSSL 3.x as a drop-in provider, enabling PQC in all OpenSSL-based applications (nginx, curl, Python ssl module).",
          "Critical security considerations for liboqs use: (1) Always use OQS_MEM_secure_free() for secret keys and shared secrets (zeroes memory before freeing). (2) Return values must be checked — OQS_ERROR (-1) indicates failure. (3) Heap-allocate all key buffers (2400-byte secret key on stack risks overflow). (4) Use constant-time implementations — liboqs provides these by default, but wrapper code must also avoid branches on secret data.",
        ],
        codeExample: {
          label: "liboqs ML-KEM-768 key encapsulation (C)",
          code: `#include <oqs/oqs.h>
#include <openssl/kdf.h>

int generate_session_key(uint8_t *session_key, size_t key_len,
                         const uint8_t *peer_public_key) {
    OQS_KEM *kem = OQS_KEM_new(OQS_KEM_alg_ml_kem_768);
    if (!kem) return -1;  // Always check return values

    uint8_t *ciphertext = malloc(kem->length_ciphertext);
    uint8_t *shared     = malloc(kem->length_shared_secret);
    if (!ciphertext || !shared) { OQS_KEM_free(kem); return -1; }

    // Encapsulate: generate shared secret and ciphertext
    if (OQS_KEM_encaps(kem, ciphertext, shared, peer_public_key) != OQS_SUCCESS) {
        OQS_MEM_secure_free(shared, kem->length_shared_secret);
        free(ciphertext); OQS_KEM_free(kem); return -1;
    }

    // Derive session key from shared secret via HKDF
    HKDF(session_key, key_len, EVP_sha256(), shared,
         kem->length_shared_secret, NULL, 0, NULL, 0);

    // Secure cleanup: zero memory before free
    OQS_MEM_secure_free(shared, kem->length_shared_secret);
    free(ciphertext);
    OQS_KEM_free(kem);
    return 0;
}`,
        },
      },
      incident: {
        title: "Google Chrome Deploys X25519MLKEM768 in TLS (2024)",
        when: "May 2024",
        where: "Google Chrome 124, worldwide",
        impact: "First mass-market PQC deployment — TLS key exchange secured against future quantum computers for billions of users",
        body: [
          "In May 2024, Google Chrome 124 deployed X25519MLKEM768 (X25519 + ML-KEM-768 hybrid) as the default key agreement for TLS connections, using the oqs-provider / BoringSSL implementation. This made Chrome the first major browser to deploy PQC key exchange at scale — protecting billions of TLS sessions against Harvest Now, Decrypt Later attacks.",
          "Chrome's deployment was specifically motivated by HNDL: recorded Chrome TLS sessions from 2024 would be protected against a quantum attacker in 2035. The X25519 classical component ensures no regression if ML-KEM has an undiscovered weakness. Google reported no performance or compatibility issues in the rollout.",
        ],
      },
      diagram: {
        nodes: [
          { label: "OQS_KEM_new()", sub: "algorithm selection", type: "system" },
          { label: "OQS_KEM_keypair()", sub: "1184B pub + 2400B sec", type: "system" },
          { label: "OQS_KEM_encaps()", sub: "1088B ciphertext + 32B shared", type: "victim" },
          { label: "OQS_MEM_secure_free()", sub: "MUST use for secrets", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Open Quantum Safe project founded at University of Waterloo" },
        { year: 2020, event: "liboqs 0.4.0 — first integration with OpenSSL (fork)" },
        { year: 2022, event: "oqs-provider released — drop-in for OpenSSL 3.x" },
        { year: 2024, event: "Chrome 124 deploys X25519MLKEM768 for all TLS", highlight: true },
        { year: 2024, event: "liboqs 0.11.0 — FIPS 203/204/205 fully integrated" },
      ],
      keyTakeaways: [
        "liboqs is the reference PQC library — use oqs-provider to add PQC to OpenSSL 3.x applications",
        "Always use OQS_MEM_secure_free() for secret keys and shared secrets — not free()",
        "Heap-allocate key buffers: ML-KEM-768 secret key is 2400 bytes — stack allocation risks overflow",
        "liboqs is NOT FIPS 140-3 validated — use AWS-LC (#4800) or SymCrypt (#4825) for federal systems",
        "Chrome 124 proves X25519MLKEM768 is production-ready with no performance regression",
      ],
      references: [
        { title: "Open Quantum Safe project (liboqs)", url: "https://openquantumsafe.org" },
        { title: "Chrome 124 PQC deployment announcement", url: "https://security.googleblog.com/2024/05/advancing-our-amazing-bet-on-asymmetric.html" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c07-q1", type: "Implementation", challenge: "Secure free.", text: "Which liboqs function must free secret-key and shared-secret buffers, instead of plain free()?", options: ["OQS_MEM_secure_free() — it zeroes memory before freeing","OQS_free_fast()","free_secret()","memset_free()"], correctIndex: 0, explanation: "OQS_MEM_secure_free() wipes sensitive material before release, preventing key remnants in freed memory." },
        { id: "quantum-c07-q2", type: "Compliance", challenge: "liboqs FIPS status.", text: "Can liboqs be used directly in federal systems as a FIPS 140-3 validated module?", options: ["No — it's the reference implementation; use validated modules like AWS-LC (#4800) or SymCrypt (#4825)","Yes, liboqs is FIPS 140-3 validated","Yes, but only on Windows","FIPS does not apply to PQC"], correctIndex: 0, explanation: "liboqs is for research/testing; federal deployments need a CMVP-validated module." },
        { id: "quantum-c07-q3", type: "Real World", challenge: "First mass PQC browser.", text: "Which browser deployed X25519MLKEM768 as the default TLS key agreement in May 2024 — the first mass-market PQC deployment?", options: ["Google Chrome 124","Internet Explorer 11","Safari 15","Firefox 60"], correctIndex: 0, explanation: "Chrome 124 turned on hybrid X25519MLKEM768 by default, the first at-scale PQC rollout." },
        { id: "quantum-c07-q4", type: "Pitfall", challenge: "Stack allocation risk.", text: "What is the risk of stack-allocating an ML-KEM-768 secret key (~2400 bytes) inside a function?", options: ["Stack overflow — the large buffer can exceed stack limits","Faster execution with no downside","It encrypts itself","It halves QBER"], correctIndex: 0, explanation: "PQC buffers are large; allocate on the heap to avoid blowing the stack on constrained systems." },
        { id: "quantum-c07-q5", type: "Pitfall", challenge: "Key reuse.", text: "Should ML-KEM keys be generated once and reused across many sessions to save compute?", options: ["No — they must be ephemeral; reuse leaks information about the shared secret","Yes, reuse is recommended","Only reuse public keys","Reuse is mandatory in FIPS"], correctIndex: 0, explanation: "ML-KEM key pairs must be ephemeral per session; reuse erodes the security of the shared secret." },
        { id: "quantum-c07-q6", type: "Implementation", challenge: "Memory hygiene.", text: "Why does liboqs provide a dedicated secure-free routine rather than relying on free()?", options: ["Plain free() leaves secret bytes in memory; secure_free zeroes them first","free() is deprecated in C","secure_free is faster","It satisfies QBER requirements"], correctIndex: 0, explanation: "Zeroing before freeing prevents recovery of key material from reclaimed heap memory." },
        { id: "quantum-c07-q7", type: "Compliance", challenge: "Validated modules.", text: "Which are examples of FIPS-validated modules suitable for federal PQC use?", options: ["AWS-LC (#4800) and SymCrypt (#4825)","liboqs and OpenSSL master","Any GitHub fork","curl"], correctIndex: 0, explanation: "AWS-LC and SymCrypt carry CMVP validation; liboqs itself does not." },
        { id: "quantum-c07-q8", type: "Defense", challenge: "Safe integration.", text: "What combination of practices makes a liboqs-based prototype safe to harden toward production?", options: ["Heap-allocate large keys, keep them ephemeral, secure-free secrets, and move to a validated module for federal use","Reuse static keys on the stack and free() them","Disable zeroing for speed","Hardcode the algorithm and skip validation"], correctIndex: 0, explanation: "Ephemeral heap keys, secure wiping, and a validated module together address memory, secrecy, and compliance." },
      ],
    },
    ctf: {
      scenario: "Review a proposed liboqs integration for ML-KEM-768 key encapsulation. Identify memory safety bugs and common PQC implementation pitfalls.",
      hint: "Run api-review to examine the code, then pitfalls-check to validate against common mistakes.",
      hints: [
        "Read the liboqs integration brief. Run: cat liboqs-brief.txt",
        "Review the proposed integration code. Run: api-review",
        "Check for common PQC implementation pitfalls. Run: pitfalls-check",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/liboqs-brief.txt", value: "FLAG{LIBOQS_", label: "liboqs Brief — API Requirements Reviewed" },
        { trigger: "api-review", value: "SECURE_FREE_", label: "Code Review — Memory Safety Issues Found" },
        { trigger: "pitfalls-check", value: "MATTERS}", label: "Pitfalls Audit — PQC Mistakes Identified" },
      ],
      files: {
        "/liboqs-brief.txt": [
          "=== LIBOQS INTEGRATION REVIEW ===",
          "Library: liboqs 0.11.0",
          "Algorithm: ML-KEM-768 (FIPS 203)",
          "ML-KEM-768 sizes: pub=1184B, sec=2400B, ct=1088B, shared=32B",
          "Critical: Use OQS_MEM_secure_free() for secrets (not free())",
          "Run: api-review  -- review proposed code",
          "Run: pitfalls-check  -- check common mistakes",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "liboqs-brief.txt", isDir: false }] },
      extraCommands: {
        "api-review": (_args: string[]) => ({
          lines: [
            "=== LIBOQS CODE REVIEW ===",
            "Line 09: OQS_KEM_keypair(kem, pub, sec) -- return value not checked",
            "Line 11: OQS_KEM_decaps(kem, shared, peer_ct, sec) -- OK",
            "Line 14: HKDF(session_key, 32, shared, 32, ...) -- OK",
            "Line 16: OQS_MEM_secure_free(sec, len) -- CORRECT (secure wipe)",
            "Line 17: free(shared) -- BUG: must use OQS_MEM_secure_free()",
            "Line 04-07: malloc() without null-check -- potential null deref",
            "",
            "Critical bugs: 2 (secure_free for shared, return value checks)",
            "Fragment collected.",
            "",
            ">> LEARN: liboqs requires secure memory handling for PQC key material",
            "   free() does not zero memory — use OQS_MEM_secure_free() for all secrets.",
            "   ML-KEM-768 secret key is 2400 bytes — stack-allocating risks overflow.",
            "   liboqs is the reference C library; oqs-provider adds PQC to OpenSSL 3.x.",
          ],
        }),
        "pitfalls-check": (_args: string[]) => ({
          lines: [
            "=== PQC IMPLEMENTATION PITFALLS ===",
            "1. SECRET KEY EXPOSURE -- HIGH",
            "   free() does not zero memory -- use OQS_MEM_secure_free()",
            "",
            "2. KEY REUSE -- HIGH",
            "   ML-KEM keys must be ephemeral -- generate fresh per session",
            "",
            "3. RANDOMNESS QUALITY -- HIGH",
            "   liboqs uses platform CSPRNG by default -- do not override",
            "",
            "4. LARGE KEY BUFFERS -- MEDIUM",
            "   2400B secret key on stack = stack overflow risk",
            "   Always heap-allocate PQC key material",
            "",
            "5. HYBRID MISSING -- MEDIUM",
            "   Pure ML-KEM without classical hybrid not recommended",
            "   during transition -- use X25519MLKEM768",
            "",
            "Fixes required: 2 -- secure_free for shared, null checks",
            "Fragment collected.",
            "",
            ">> LEARN: PQC implementation pitfalls can negate algorithm security",
            "   Key reuse in ML-KEM leaks information — generate a fresh keypair per session.",
            "   Chrome 124 (2024) proves X25519MLKEM768 is production-ready with no regressions.",
            "   liboqs is NOT FIPS 140-3 validated — use AWS-LC (#4800) for federal systems.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c08: FIPS 140-3 ─────────────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "NIST Cryptographic Module Validation Program", location: "Gaithersburg, Maryland, USA", era: "2025 CE", emoji: "✅" },
    id: "quantum-c08",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BB84_quantum_key_distribution.svg/1200px-BB84_quantum_key_distribution.svg.png",
    order: 8,
    title: "FIPS 140-3 PQC Compliance",
    subtitle: "Validating PQC Modules Under FIPS 140-3 and CMVP",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-fips", name: "FIPS Compliance Officer", emoji: "✅" },
    challengeType: "ctf",
    info: {
      tagline: "FIPS 203 was published in August 2024 — but CMVP validation takes 12-18 months, creating a compliance gap for federal agencies.",
      year: 2025,
      overview: [
        "FIPS 140-3 is the US federal standard for cryptographic module validation. For federal agencies and contractors, every cryptographic module must be FIPS 140-3 validated before deployment. Post-quantum algorithms must go through the Cryptographic Module Validation Program (CMVP) before federal use is mandated.",
        "This creates a timing tension: FIPS 203, 204, and 205 were published in August 2024, but CMVP validation takes 12-18 months. Federal agencies need PQC now (OMB M-23-02 mandates high-priority system migration by FY2025), but validated PQC modules are just beginning to emerge. AWS-LC (Amazon's libcrypto) received FIPS 140-3 certificate #4800 for ML-KEM in Q1 2025.",
        "The practical compliance path: use ML-KEM for key exchange (AWS-LC validated), continue using RSA-3072 or ECDSA P-384 for signatures (validated, though not quantum-safe), document exceptions for pre-validation ML-DSA use where needed, and transition ML-DSA signatures when validation certificates are issued.",
      ],
      technical: {
        title: "FIPS 140-3 PQC Validation Status and Strategy",
        body: [
          "CMVP certification covers the cryptographic module implementation — not just the algorithm. A FIPS 140-3 certificate confirms that a specific library version, on a specific platform, implements the algorithm correctly with appropriate physical and logical security. AWS-LC certificate #4800 covers AWS Lambda, EC2, and managed services. Microsoft SymCrypt #4825 covers Azure and Windows CNG.",
          "Exception handling: agencies can deploy non-validated PQC modules under an Alternate Security Authority (ASA) exception with CISO/ISSM approval. The exception requires using only NIST reference implementations, implementing hybrid construction (validated classical + non-validated PQC), limiting to non-NSS systems, and periodic review until validation is achieved.",
        ],
        codeExample: {
          label: "AWS-LC FIPS 140-3 validated ML-KEM usage (Python / boto3)",
          code: `# Using AWS-LC (FIPS 140-3 cert #4800) for ML-KEM in AWS Lambda
# AWS Lambda uses AWS-LC as its libcrypto — automatically FIPS validated

import boto3
import json

# KMS asymmetric key (AWS manages validated HSM + AWS-LC)
kms = boto3.client('kms', region_name='us-east-1')

# Create ML-KEM key in AWS KMS (preview as of 2025)
# Standard approach: use AWS-LC via Python cryptography package in Lambda
# Lambda execution environment uses AWS-LC by default

# For direct liboqs-validated use, deploy in AWS Lambda:
# - Runtime: provided.al2023
# - Include AWS-LC instead of openssl
# - AWS-LC is FIPS 140-3 cert #4800
# Documentation: https://github.com/aws/aws-lc`,
        },
      },
      incident: {
        title: "OMB M-23-02 Federal PQC Migration Mandate (2022)",
        when: "December 2022",
        where: "All US federal civilian agencies (non-NSS)",
        impact: "Federal agencies required to inventory cryptographic use and begin PQC migration by FY2025",
        body: [
          "Office of Management and Budget (OMB) Memorandum M-23-02 directed all federal agencies to inventory their systems' cryptographic dependencies and develop quantum-migration plans by May 2023, and to begin migrating high-priority systems by FY2025. The memo cited both the HNDL threat and NIST's PQC standardization progress.",
          "The practical challenge: OMB M-23-02 predated FIPS 203/204/205 publication by 18 months. Agencies had to plan migrations to algorithms that weren't yet standardized, with validation timelines unclear. This is why CISA published the CISA Post-Quantum Cryptography Initiative to help agencies navigate the gap between the mandate and available validated implementations.",
        ],
      },
      diagram: {
        nodes: [
          { label: "FIPS 203 published Aug 2024", sub: "ML-KEM standard available", type: "system" },
          { label: "AWS-LC cert #4800 Q1 2025", sub: "first validated ML-KEM module", type: "result" },
          { label: "ML-DSA: in CMVP review", sub: "expected validation mid-2025", type: "system" },
          { label: "Federal agencies", sub: "OMB M-23-02: migrate by FY2025", type: "victim" },
        ],
      },
      timeline: [
        { year: 2022, event: "OMB M-23-02 — federal PQC migration mandate issued" },
        { year: 2024, event: "FIPS 203/204/205 published (August 2024)", highlight: true },
        { year: 2025, event: "AWS-LC FIPS 140-3 cert #4800 — first validated ML-KEM module" },
        { year: 2025, event: "BoringSSL ML-DSA in CMVP review — expected mid-2025" },
        { year: 2026, event: "Expected: SLH-DSA CMVP submissions begin" },
      ],
      keyTakeaways: [
        "FIPS 140-3 validation lags NIST standards by 12-18 months — plan for compliance gap",
        "ML-KEM: AWS-LC (cert #4800) and SymCrypt (cert #4825) are validated — deploy now",
        "ML-DSA: not yet validated as of mid-2025 — use ASA exception or hybrid RSA-3072 + ML-DSA",
        "Hybrid construction (validated classical + PQC) satisfies FIPS 140-3 during transition",
        "NSS systems require NSA-approved Type 1 devices — different validation track from CMVP",
      ],
      references: [
        { title: "OMB Memorandum M-23-02", url: "https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf" },
        { title: "AWS-LC FIPS 140-3 certificate #4800", url: "https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4800" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c08-q1", type: "Core Idea", challenge: "Validation gap.", text: "FIPS 203 published in August 2024, but how long does CMVP validation typically take — creating a compliance gap?", options: ["12–18 months","1 week","5 years","No delay"], correctIndex: 0, explanation: "CMVP validation lags standard publication by roughly 12–18 months, leaving agencies with a gap." },
        { id: "quantum-c08-q2", type: "Real World", challenge: "First validated KEM module.", text: "Which module received FIPS 140-3 certificate #4800 for ML-KEM in Q1 2025?", options: ["AWS-LC — the first validated module agencies can deploy for quantum-safe key exchange","liboqs","OpenSSL 1.0","BoringSSL beta"], correctIndex: 0, explanation: "AWS-LC's #4800 validation gave federal agencies a deployable ML-KEM module." },
        { id: "quantum-c08-q3", type: "Strategy", challenge: "Hybrid exception.", text: "Under the hybrid construction exception, what combination satisfies FIPS 140-3 for ML-DSA before its own validation completes?", options: ["Sign with both RSA-3072 (validated) AND ML-DSA-65 — both must fail to break security","ML-DSA-65 alone","RSA-1024 alone","SHA-1 plus ML-DSA"], correctIndex: 0, explanation: "Pairing a validated classical signature with ML-DSA keeps compliance while adding quantum resistance." },
        { id: "quantum-c08-q4", type: "Policy", challenge: "OMB mandate.", text: "What did OMB Memorandum M-23-02 require federal agencies to do by FY2025?", options: ["Begin migrating high-priority systems to PQC","Finish all migration by 2024","Stop using TLS","Adopt QKD only"], correctIndex: 0, explanation: "M-23-02 set FY2025 as the point to begin migrating prioritized systems to post-quantum cryptography." },
        { id: "quantum-c08-q5", type: "Policy", challenge: "NSS track.", text: "Do National Security Systems (NSS) follow the same CMVP validation track as civilian federal systems?", options: ["No — NSS require NSA-approved Type 1 devices on a separate validation track","Yes, identical track","NSS skip validation","NSS use only liboqs"], correctIndex: 0, explanation: "NSS follow NSA's Type 1 / CNSA process, distinct from civilian CMVP." },
        { id: "quantum-c08-q6", type: "Concept", challenge: "Why hybrid bridges the gap.", text: "Why does the hybrid signature approach help agencies during the validation gap?", options: ["It lets them deploy PQC now while remaining FIPS-compliant via the validated classical component","It removes the need for any validation","It is faster than RSA alone","It eliminates certificates"], correctIndex: 0, explanation: "Hybrid keeps a validated algorithm in the mix, so compliance holds while PQC is layered in." },
        { id: "quantum-c08-q7", type: "Strategy", challenge: "Acting before validation.", text: "What should an agency do about quantum-safe key exchange while ML-DSA validation is pending?", options: ["Deploy a validated ML-KEM module (e.g., AWS-LC #4800) and hybrid signatures","Wait years and do nothing","Use only SHA-1","Disable TLS"], correctIndex: 0, explanation: "Validated ML-KEM exists; combining it with hybrid signatures advances migration compliantly." },
        { id: "quantum-c08-q8", type: "Defense", challenge: "Closing the gap.", text: "What is the recommended posture during the 12–18 month CMVP gap?", options: ["Use validated modules where available and hybrid constructions elsewhere, prioritizing HNDL-exposed systems","Freeze all crypto changes until every algorithm is validated","Roll back to RSA-1024","Ignore FIPS"], correctIndex: 0, explanation: "Deploy what's validated, hybridize the rest, and lead with the highest HNDL-risk systems." },
      ],
    },
    ctf: {
      scenario: "Advise a federal agency on their FIPS 140-3 compliance path for PQC. Identify what can be deployed today and document the exception process for pre-validation algorithms.",
      hint: "Run compliance-scan to assess the deployment plan, then exception-path to document the interim approach.",
      hints: [
        "Read the compliance brief. Run: cat fips-brief.txt",
        "Scan the deployment plan for compliance gaps. Run: compliance-scan",
        "Document the interim exception approach. Run: exception-path",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/fips-brief.txt", value: "FLAG{FIPS140_", label: "FIPS Brief — Compliance Requirements Reviewed" },
        { trigger: "compliance-scan", value: "EXCEPTION_", label: "Compliance Scan — Validation Gaps Identified" },
        { trigger: "exception-path", value: "PATH_VALID}", label: "Exception Documented — Interim Compliance Approved" },
      ],
      files: {
        "/fips-brief.txt": [
          "=== FIPS 140-3 PQC COMPLIANCE ASSESSMENT ===",
          "Client: Federal civilian agency (non-NSS)",
          "Mandate: OMB M-23-02 -- migrate high-priority systems by FY2025",
          "ML-KEM: AWS-LC cert #4800 (validated Q1 2025) -- DEPLOY NOW",
          "ML-DSA: BoringSSL in review (not yet validated) -- EXCEPTION NEEDED",
          "Run: compliance-scan  -- assess deployment plan",
          "Run: exception-path  -- document interim compliance",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "fips-brief.txt", isDir: false }] },
      extraCommands: {
        "compliance-scan": (_args: string[]) => ({
          lines: [
            "=== FEDERAL DEPLOYMENT COMPLIANCE SCAN ===",
            "ML-KEM-768 for TLS key exchange:",
            "  Module: AWS-LC (FIPS 140-3 cert #4800) -- COMPLIANT",
            "",
            "ML-DSA-65 for certificate signatures:",
            "  Module: BoringSSL (in review, not yet validated) -- NON-COMPLIANT",
            "  Alternative: RSA-3072 (validated, deprecated after 2030)",
            "",
            "Partial migration recommended:",
            "  ML-KEM now (validated) + RSA-3072 sigs until ML-DSA validated",
            "Fragment collected.",
            "",
            ">> LEARN: FIPS 140-3 validation lags NIST standards by 12-18 months",
            "   FIPS 203 published August 2024; first validated ML-KEM module: Q1 2025.",
            "   AWS-LC (cert #4800) and SymCrypt (cert #4825) are validated for ML-KEM.",
            "   Federal agencies can use hybrid construction under an AUA exception until ML-DSA validated.",
          ],
        }),
        "exception-path": (_args: string[]) => ({
          lines: [
            "=== INTERIM COMPLIANCE EXCEPTION ===",
            "Exception type: Algorithm Use Approval (AUA)",
            "Authority: Agency CISO + ISSM signature required",
            "Ref: NIST SP 800-131A Rev 3 transition guidance",
            "",
            "Hybrid construction for ML-DSA (pre-validation):",
            "  Sign with BOTH RSA-3072 AND ML-DSA-65",
            "  RSA-3072 signature satisfies FIPS 140-3 requirement",
            "  ML-DSA provides PQC protection (defense in depth)",
            "  Both must fail to compromise security",
            "",
            "Exception valid until: ML-DSA CMVP cert issued",
            "Annual review required by ISSM",
            "Fragment collected.",
            "",
            ">> LEARN: Hybrid construction satisfies FIPS 140-3 during the validation gap",
            "   Signing with both RSA-3072 (validated) and ML-DSA-65 satisfies the standard.",
            "   OMB M-23-02 mandates high-priority federal system migration by FY2025.",
            "   NSS (classified) systems follow a separate NSA Type 1 validation track.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c09: Post-Quantum Governance ────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "Fortune 500 CISO Office", location: "New York, New York, USA", era: "2025 CE", emoji: "📊" },
    id: "quantum-c09",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Public_key_encryption.svg/1200px-Public_key_encryption.svg.png",
    order: 9,
    title: "Post-Quantum Governance",
    subtitle: "CISO Briefing, Board Reporting & Budget Allocation",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-governance", name: "Quantum CISO", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "The quantum migration is a 3-7 year program requiring board approval, sustained budget, and cross-functional coordination — not a sprint.",
      year: 2025,
      overview: [
        "The quantum migration is the most complex cryptographic program most enterprises have ever undertaken. It requires board-level support, sustained multi-year budget, cross-functional coordination (security, infrastructure, development, procurement), and vendor management. Most CISOs are still explaining what quantum computers are to their boards.",
        "Effective quantum governance starts with risk quantification: translate the technical threat (HNDL, Shor's algorithm, Q-Day timeline) into financial terms that boards understand — potential data breach costs, regulatory fines, competitive intelligence exposure. Then build a phased program: discovery → foundation → core systems → complete → sustain.",
        "The business case for PQC investment is straightforward: the cost of migration (typically 0.5-2% of annual IT budget over 5 years) is far less than the expected loss from a post-Q-Day breach of records collected today. Regulatory pressure (FFIEC, OMB, future SEC requirements) provides additional urgency that resonates with audit committees.",
      ],
      technical: {
        title: "Quantum Risk Quantification Model",
        body: [
          "Expected loss calculation: (probability of Q-Day in 10yr) × (value of exposed data). HNDL threat is NOT probability-weighted — it is happening now. All RSA-encrypted data transmitted today is potentially archived and will be exposed at Q-Day regardless of timeline uncertainty. Prioritize assets by HNDL risk first (long-term sensitivity), then by Q-Day impact.",
          "Program phasing: Year 1 (Discovery) — crypto inventory, risk scoring, vendor assessment, training; Year 2 (Foundation) — HSM replacement, PKI root migration, development toolchain; Year 3 (Core) — VPN, TLS, API gateways; Year 4 (Complete) — remaining systems, code signing; Year 5 (Sustain) — continuous monitoring, emerging algorithms.",
        ],
        codeExample: {
          label: "Quantum risk financial model (Python)",
          code: `# Quantum risk quantification for board presentation

assets = {
    "Customer PII (2.3M records)": {
        "records": 2_300_000,
        "breach_cost_per_record": 180,  # GDPR + CCPA
        "hndl_exposure": True,  # Already being harvested
    },
    "Transaction data (10yr archive)": {
        "value_usd": 850_000_000,  # Proprietary trading signals
        "hndl_exposure": True,
    },
    "Code signing keys": {
        "value_usd": 1_200_000_000,  # Supply chain compromise
        "hndl_exposure": False,  # Keys aren't in transit
    }
}

q_day_probability_10yr = 0.25  # ~25% consensus estimate

for asset, data in assets.items():
    if "records" in data:
        exposure = data["records"] * data["breach_cost_per_record"]
    else:
        exposure = data["value_usd"]

    expected_loss = exposure * q_day_probability_10yr
    hndl_note = "(HNDL: immediate risk)" if data.get("hndl_exposure") else ""
    print(f"{asset}: \${exposure:,.0f} exposure, \${expected_loss:,.0f} expected {hndl_note}")`,
        },
      },
      incident: {
        title: "FFIEC Issues Quantum Risk Guidance for Financial Institutions (2024)",
        when: "2024",
        where: "All FFIEC-regulated financial institutions (banks, credit unions, thrifts)",
        impact: "First sector-specific regulatory requirement for quantum risk disclosure and migration planning",
        body: [
          "The Federal Financial Institutions Examination Council (FFIEC) issued guidance requiring banks and credit unions to assess quantum computing risks, include quantum exposure in IT examinations, and develop migration roadmaps. Non-compliance with examination guidance can affect ratings and trigger enforcement actions.",
          "The FFIEC guidance was sector-specific and preceded SEC requirements — financial institutions must demonstrate quantum risk awareness in their IT examination packages. This created the business case for CISO quantum programs at banks and credit unions that had previously deferred planning: regulatory risk now has a defined dollar cost.",
        ],
      },
      diagram: {
        nodes: [
          { label: "HNDL Risk (Now)", sub: "data collected today decryptable later", type: "attacker" },
          { label: "Board Approval", sub: "5-year $12M program", type: "system" },
          { label: "Regulatory Risk", sub: "FFIEC, OMB, SEC requirements", type: "system" },
          { label: "Migration Program", sub: "Discovery > Foundation > Core > Sustain", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "NSA CNSA 2.0 — government acknowledges quantum threat" },
        { year: 2022, event: "OMB M-23-02 — federal civilian agencies must plan migrations" },
        { year: 2024, event: "FFIEC quantum risk guidance for financial institutions", highlight: true },
        { year: 2024, event: "FIPS 203/204/205 published — migration programs can begin" },
        { year: 2025, event: "Enterprise CISO quantum programs: board presentations begin" },
      ],
      keyTakeaways: [
        "Translate technical risk to financial terms: expected loss = probability × exposure (HNDL risk is 100%)",
        "5-year phased program: Discovery → Foundation → Core → Complete → Sustain",
        "Regulatory risk (FFIEC, OMB, SEC) provides urgency for board approval — quantify fines",
        "Crypto inventory (CBOM) is the first required deliverable — you cannot migrate what you haven't found",
        "Board reporting: quarterly quantum risk dashboard, not just annual briefing",
      ],
      references: [
        { title: "CISA Post-Quantum Cryptography Initiative", url: "https://www.cisa.gov/quantum" },
        { title: "NSA CNSA Suite 2.0", url: "https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c09-q1", type: "Core Idea", challenge: "HNDL certainty.", text: "When quantifying HNDL risk for the board, why is exposure treated as 100% certain rather than probability-weighted like Q-Day?", options: ["Adversaries are harvesting traffic today — the data is already collected and will be exposed at Q-Day regardless of timing","Because Q-Day is tomorrow","Because RSA is already broken","It's a regulatory rounding rule"], correctIndex: 0, explanation: "The harvest has happened; only decryption awaits, so HNDL exposure isn't a probability — it's a certainty." },
        { id: "quantum-c09-q2", type: "Governance", challenge: "Program sequencing.", text: "In the 5-year quantum governance model, are HSM replacement and PKI root CA migration Year 1 activities?", options: ["No — those are Year 2 (Foundation); Year 1 is crypto inventory, risk scoring, and training","Yes, both are Year 1","They are Year 5 only","They are never scheduled"], correctIndex: 0, explanation: "Year 1 establishes inventory and skills; the heavier infrastructure work lands in Year 2." },
        { id: "quantum-c09-q3", type: "Real World", challenge: "Banking regulator.", text: "Which body issued sector-specific quantum risk guidance for banks and credit unions in 2024, requiring assessment in IT exams?", options: ["FFIEC (Federal Financial Institutions Examination Council)","FCC","FDA","EPA"], correctIndex: 0, explanation: "The FFIEC folded quantum risk assessment into financial institution IT examinations." },
        { id: "quantum-c09-q4", type: "Strategy", challenge: "ROI framing.", text: "How is the governance program's cost framed against the risk it mitigates?", options: ["A ~$12M program protects against ~$615M expected breach loss plus regulatory fines","Cost equals the loss exactly","The program costs more than the loss","There is no measurable benefit"], correctIndex: 0, explanation: "Framing program spend against avoided loss makes the board-level business case for funding." },
        { id: "quantum-c09-q5", type: "Governance", challenge: "First deliverable.", text: "Is a crypto inventory (CBOM) optional if the organization already has an SBOM?", options: ["No — the CBOM is the first required governance deliverable; you can't migrate assets you haven't catalogued","Yes, an SBOM is enough","Only if you use TLS","CBOM replaces all controls"], correctIndex: 0, explanation: "An SBOM lists software, not cryptographic usage; the CBOM is the prerequisite inventory for migration." },
        { id: "quantum-c09-q6", type: "Concept", challenge: "Why CBOM first.", text: "Why must the CBOM precede every other migration step?", options: ["You cannot migrate cryptographic assets you have not discovered and catalogued","It satisfies SEC fines","It replaces the HSM","It generates keys"], correctIndex: 0, explanation: "Discovery is foundational — the inventory drives risk scoring and the migration roadmap." },
        { id: "quantum-c09-q7", type: "Governance", challenge: "Year 1 focus.", text: "What are the core Year 1 activities in the governance model?", options: ["Crypto inventory (CBOM), risk scoring, and workforce training","Replacing every HSM","Issuing all PQC certs","Decommissioning RSA globally"], correctIndex: 0, explanation: "Year 1 builds the foundation: know your crypto, score the risk, and train the team." },
        { id: "quantum-c09-q8", type: "Defense", challenge: "Board prioritization.", text: "Given finite budget, how should HNDL guide migration prioritization for the board?", options: ["Prioritize systems whose harvested data has long secrecy lifetimes, since exposure is certain","Prioritize the cheapest systems first","Wait for Q-Day to decide","Treat all systems equally"], correctIndex: 0, explanation: "Long-lived secrets already harvested face certain exposure, so they justify earliest migration." },
      ],
    },
    ctf: {
      scenario: "You are the CISO of a major financial institution. Build the financial risk model and 5-year budget to present to the board for PQC program approval.",
      hint: "Run risk-quantify to build the financial model, then budget-build to construct the 5-year program.",
      hints: [
        "Read the governance brief. Run: cat governance-brief.txt",
        "Build the financial risk model. Run: risk-quantify",
        "Construct the 5-year program budget. Run: budget-build",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/governance-brief.txt", value: "FLAG{GOVERNANCE_", label: "Governance Brief — Board Requirements Reviewed" },
        { trigger: "risk-quantify", value: "BOARD_", label: "Risk Model — Financial Exposure Quantified" },
        { trigger: "budget-build", value: "APPROVED}", label: "Budget — 5-Year Program Approved" },
      ],
      files: {
        "/governance-brief.txt": [
          "=== CISO QUANTUM GOVERNANCE BRIEF ===",
          "Audience: Board of Directors, Audit Committee",
          "Goal: Approve 5-year PQC migration program",
          "Key questions: When is the threat real? What if we do nothing? Cost?",
          "HNDL is NOW. Q-Day: ~25% probability in 10 years (consensus).",
          "Run: risk-quantify  -- financial risk model",
          "Run: budget-build  -- 5-year program budget",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "governance-brief.txt", isDir: false }] },
      extraCommands: {
        "risk-quantify": (_args: string[]) => ({
          lines: [
            "=== QUANTUM RISK FINANCIAL MODEL ===",
            "Customer PII (2.3M records): $414M exposure",
            "Transaction data (10yr): $850M exposure",
            "Code signing: $1.2B exposure",
            "",
            "Q-Day probability (10yr): ~25%",
            "Expected loss: $615M",
            "HNDL risk: immediate (not probability-weighted)",
            "",
            "Regulatory risk:",
            "  FFIEC non-compliance: $5M-$50M fine",
            "  Reputational: non-quantifiable",
            "Fragment collected.",
            "",
            ">> LEARN: Quantifying quantum risk unlocks board-level funding",
            "   HNDL exposure is not probability-weighted — it is a present-day cost.",
            "   ALE = asset value x annualized loss expectancy guides PQC prioritization.",
            "   NIST IR 8547 and CISA advisories provide reference threat timelines.",
          ],
        }),
        "budget-build": (_args: string[]) => ({
          lines: [
            "=== 5-YEAR PQC PROGRAM BUDGET ===",
            "Year 1 -- Discovery & Planning:    $1.8M",
            "  Crypto inventory, risk scoring, vendor assessment, training",
            "Year 2 -- Foundation:              $2.4M",
            "  HSM replacement, PKI root CA, dev toolchain",
            "Year 3 -- Core Systems:            $3.2M",
            "  VPN, customer-facing TLS, API gateways",
            "Year 4 -- Complete:                $2.6M",
            "  Remaining systems, code signing, vendor validation",
            "Year 5 -- Sustain:                 $2.0M",
            "  Monitoring, training, reserve",
            "",
            "Total: $12.0M over 5 years",
            "ROI: Protects $615M expected loss + regulatory fines",
            "Fragment collected.",
            "",
            ">> LEARN: PQC migration budgets follow a phased investment model",
            "   Discovery (Year 1) is the cheapest phase — crypto inventory before code.",
            "   HSM replacement and PKI root rotation are the highest capital cost items.",
            "   OMB M-23-02 requires federal agencies to submit PQC migration plans.",
          ],
        }),
      },
    },
  },

  // ─── quantum-c10: Synthesis ───────────────────────────────────────────────────
  {
    epochId: "quantum-3",
    wonder: { name: "Quantum Security Summit", location: "Washington, DC, USA", era: "2025 CE", emoji: "🏆" },
    id: "quantum-c10",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bloch_sphere.svg/1200px-Bloch_sphere.svg.png",
    order: 10,
    title: "The Quantum-Safe Stack: Synthesis",
    subtitle: "End-to-End Quantum-Safe Architecture from Bits to Boardroom",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qc-synthesis", name: "Quantum Security Architect", emoji: "🏆" },
    challengeType: "ctf",
    info: {
      tagline: "The quantum transition is not a destination — it is continuous. The cryptographic future belongs to those who plan today.",
      year: 2025,
      overview: [
        "You have traveled from qubits to board presentations. The quantum threat is not a future problem — Harvest Now, Decrypt Later campaigns are active. Nation-state adversaries are recording TLS traffic today, waiting for the quantum computer that will decrypt it. The cryptographic transition to post-quantum algorithms is the largest infrastructure migration in the history of computing.",
        "The quantum-safe stack spans 10 layers: threat intelligence → crypto inventory → algorithm selection → primitives → key distribution → PKI → transport → applications → governance → compliance. Every layer must be addressed; a failure at any layer undermines the security of the layers above it.",
        "The good news: the tools exist. FIPS 203/204/205 are published. Validated libraries (AWS-LC, SymCrypt) are available. Production deployments (Chrome, Mullvad, Signal, Apple PQ3) prove viability. The work now is execution — systematic migration of infrastructure guided by risk prioritization and cryptographic agility principles.",
      ],
      technical: {
        title: "The Complete Quantum-Safe Stack",
        body: [
          "Stack layers and their status: L0 Threat Intelligence (CISA advisories, Q-Day monitoring) → L1 Crypto Inventory (CBOM via Syft/CycloneDX) → L2 Algorithms (FIPS 203/204/205, hybrid schemes) → L3 Primitives (AWS-LC #4800, liboqs, oqs-provider) → L4 Key Distribution (X25519+ML-KEM for enterprise, QKD for government) → L5 PKI (ML-DSA-87 roots, dual-stack certs) → L6 Transport (TLS 1.3 + X25519MLKEM768) → L7 Applications (WireGuard PQ, ML-DSA code signing) → L8 Governance (5-year CISO program) → L9 Compliance (FIPS 140-3, SP 800-131A, FFIEC).",
          "Migration order by HNDL priority: (1) High-sensitivity data in transit (VPN, TLS for M&A, government) — immediate. (2) Long-lived data at rest (archives encrypted with RSA key transport) — 6-12 months. (3) Authentication infrastructure (PKI, code signing) — 12-24 months. (4) Everything else — 24-60 months. HNDL exposure, not algorithm deprecation timelines, drives the priority.",
        ],
        codeExample: {
          label: "Quantum-safe stack validation checklist",
          code: `# Quantum-Safe Architecture Validation Script
# Run against any system to assess PQC readiness

checks = {
    "tls_key_exchange": {
        "command": "openssl s_client -connect host:443 -groups X25519MLKEM768",
        "check": "X25519MLKEM768" in output,
        "priority": "CRITICAL"  # HNDL risk: now
    },
    "vpn_key_exchange": {
        "command": "wg show all",
        "check": "PQPrivateKey" in output,
        "priority": "CRITICAL"
    },
    "cert_algorithm": {
        "command": "openssl x509 -in cert.pem -text | grep 'Signature Algorithm'",
        "check": "ML-DSA" in output or "RSA" in output,  # RSA OK during transition
        "priority": "HIGH"
    },
    "code_signing": {
        "command": "signtool verify /pa binary.exe",
        "check": "ML-DSA" in output,
        "priority": "HIGH"
    },
    "cbom_inventory": {
        "command": "syft scan . --output cyclonedx-json",
        "check": "cryptoComponents" in output,
        "priority": "MEDIUM"
    }
}

for name, check in checks.items():
    status = "PASS" if check["check"] else "FAIL"
    print(f"[{check['priority']}] {name}: {status}")`,
        },
      },
      incident: {
        title: "Apple PQ3: iMessage Post-Quantum Security (2024)",
        when: "February 2024",
        where: "Apple iMessage — 1+ billion users worldwide",
        impact: "First mass-market messaging app to deploy post-quantum key establishment for all users",
        body: [
          "In February 2024, Apple deployed PQ3 — a new hybrid post-quantum cryptographic protocol for iMessage. PQ3 uses ML-KEM-768 for key establishment combined with ECC (X25519), providing what Apple calls 'Level 3' security — the highest level in messaging security. Signal Protocol had previously claimed the top spot; PQ3 pushed both products to new security heights.",
          "The PQ3 design includes periodic re-keying with post-quantum keys, ensuring that even if an attacker harvests ciphertexts today, they receive new ML-KEM-protected keys frequently — limiting the value of any single HNDL collection window. Apple's decision to deploy PQ3 for iMessage (not just opt-in) demonstrates that PQC is production-ready for consumer scale.",
        ],
      },
      diagram: {
        nodes: [
          { label: "L0-L3: Algorithms & Primitives", sub: "FIPS 203/204/205, AWS-LC, liboqs", type: "system" },
          { label: "L4-L6: Key Exchange & PKI", sub: "ML-KEM, ML-DSA roots, TLS 1.3", type: "system" },
          { label: "L7: Applications", sub: "WireGuard PQ, ML-DSA code signing", type: "victim" },
          { label: "L8-L9: Governance", sub: "5-year program, FIPS 140-3, FFIEC", type: "result" },
        ],
      },
      timeline: [
        { year: 2024, event: "Apple PQ3 — iMessage post-quantum security for 1B+ users" },
        { year: 2024, event: "Chrome 124 — X25519MLKEM768 default for all TLS", highlight: true },
        { year: 2024, event: "FIPS 203/204/205 published — PQC era begins" },
        { year: 2025, event: "Enterprise quantum-safe stack deployments accelerate" },
        { year: 2030, event: "NIST: RSA-2048 deprecated for all new systems" },
        { year: 2035, event: "NSA deadline: RSA/ECC retired from all federal systems" },
      ],
      keyTakeaways: [
        "HNDL is active now — prioritize migration by data sensitivity and transit exposure, not Q-Day timeline",
        "The full stack matters: a quantum-safe TLS is undermined by a non-PQC VPN or weak code signing",
        "Production deployments exist: Chrome, iMessage (PQ3), Mullvad VPN, Signal — PQC is ready",
        "Cryptographic agility is the meta-capability: build systems that can be updated as algorithms evolve",
        "The quantum transition never ends — new algorithms will emerge, some will be broken, agility wins",
      ],
      references: [
        { title: "Apple PQ3 iMessage Security", url: "https://security.apple.com/blog/imessage-pq3/" },
        { title: "NIST Post-Quantum Cryptography Standards", url: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
        { title: "CISA Post-Quantum Cryptography Initiative", url: "https://www.cisa.gov/quantum" },
      ],
    },
    quiz: {
      questions: [
        { id: "quantum-c10-q1", type: "Strategy", challenge: "Migration order.", text: "In the quantum-safe priority model, which assets are migrated first?", options: ["High-sensitivity data in transit (VPN, TLS for M&A, government) — HNDL exposure drives priority","Public marketing websites","Internal lunch menus","Whatever is cheapest"], correctIndex: 0, explanation: "HNDL exposure, not the Q-Day timeline, sets priority: protect long-lived secrets in transit first." },
        { id: "quantum-c10-q2", type: "Real World", challenge: "Apple PQ3.", text: "What does Apple PQ3 (Feb 2024, iMessage) use, and what extra protection does it add?", options: ["ML-KEM-768 with X25519, plus periodic re-keying to limit any single HNDL collection window","RSA-1024 only","QKD over satellite","No encryption at all"], correctIndex: 0, explanation: "PQ3 hybridizes ML-KEM-768 + X25519 and re-keys periodically, shrinking the value of harvested traffic." },
        { id: "quantum-c10-q3", type: "Architecture", challenge: "Layer 1 output.", text: "In the 10-layer quantum-safe stack, what does L1 (Crypto Inventory) produce?", options: ["A CBOM generated via tools like Syft and CycloneDX","An AES key","A QKD link","A board memo only"], correctIndex: 0, explanation: "Layer 1 yields the Cryptography Bill of Materials, the data foundation for everything above it." },
        { id: "quantum-c10-q4", type: "Concept", challenge: "Agility as meta-capability.", text: "Why is cryptographic agility described as the 'meta-capability' of the quantum-safe transition?", options: ["New algorithms will keep emerging and some will break; agility lets systems update without redesign","Because it encrypts everything twice","Because it replaces the CBOM","Because it eliminates HNDL"], correctIndex: 0, explanation: "Agility is the capability that lets all the other layers adapt as the algorithm landscape shifts." },
        { id: "quantum-c10-q5", type: "Pitfall", challenge: "Residual archive risk.", text: "Are RSA/ECC-encrypted archives created before migration protected once a quantum-safe TLS layer is deployed at the perimeter?", options: ["No — pre-migration archives remain residual HNDL risk and must be re-encrypted with PQC key transport","Yes, the perimeter covers them","Yes, TLS retroactively secures stored data","Only if QBER is low"], correctIndex: 0, explanation: "Perimeter TLS protects new traffic, not already-stored ciphertext; old archives need re-encryption." },
        { id: "quantum-c10-q6", type: "Architecture", challenge: "Stack purpose.", text: "What is the purpose of organizing quantum-safe controls into a layered stack?", options: ["To sequence inventory, prioritization, hybrid crypto, and agility into a coherent migration program","To replace TLS with QKD","To avoid using a CBOM","To increase key reuse"], correctIndex: 0, explanation: "The layered model turns scattered tasks into an ordered, auditable transition program." },
        { id: "quantum-c10-q7", type: "Strategy", challenge: "Why data-in-transit first.", text: "Why does high-sensitivity data in transit top the migration order?", options: ["It is actively harvestable now and often has long secrecy requirements","It is the easiest to change","It uses the smallest keys","It is exempt from HNDL"], correctIndex: 0, explanation: "In-transit secrets are exposed to harvesting today and frequently must stay secret for years." },
        { id: "quantum-c10-q8", type: "Defense", challenge: "Completeness check.", text: "What is the most-overlooked residual risk after deploying perimeter PQC?", options: ["Legacy encrypted archives still protected only by RSA/ECC","AES-256 bulk encryption","Ephemeral ML-KEM keys","The CBOM itself"], correctIndex: 0, explanation: "Stored pre-migration ciphertext is the classic blind spot — it must be re-encrypted to be safe." },
      ],
    },
    ctf: {
      scenario: "Present the reference quantum-safe architecture at the Quantum Security Summit. Validate the complete stack and confirm all quantum attack surfaces are addressed.",
      hint: "Run architecture-review to validate the 10-layer stack, then threat-model to confirm all surfaces covered.",
      hints: [
        "Read the synthesis brief. Run: cat synthesis-brief.txt",
        "Validate the full quantum-safe stack. Run: architecture-review",
        "Confirm all threat surfaces addressed. Run: threat-model",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/synthesis-brief.txt", value: "FLAG{QUANTUM_SAFE_", label: "Synthesis Brief — Full Stack Requirements Reviewed" },
        { trigger: "architecture-review", value: "STACK_", label: "Architecture Validated — All 10 Layers Confirmed" },
        { trigger: "threat-model", value: "COMPLETE}", label: "Threat Model — All Quantum Surfaces Addressed" },
      ],
      files: {
        "/synthesis-brief.txt": [
          "=== QUANTUM SECURITY SUMMIT: SYNTHESIS ===",
          "Mission: Validate and present the reference quantum-safe architecture.",
          "The 10-layer stack:",
          "  L0: Threat intel  L1: Crypto inventory  L2: Algorithms",
          "  L3: Primitives    L4: Key distribution  L5: PKI",
          "  L6: Transport     L7: Applications      L8: Governance  L9: Compliance",
          "Run: architecture-review  -- validate all layers",
          "Run: threat-model  -- confirm all surfaces addressed",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "synthesis-brief.txt", isDir: false }] },
      extraCommands: {
        "architecture-review": (_args: string[]) => ({
          lines: [
            "=== QUANTUM-SAFE STACK VALIDATION ===",
            "L0 Threat Intelligence: PASS -- CISA feed, HNDL monitoring",
            "L1 Crypto Inventory: PASS -- CBOM monthly via Syft/CycloneDX",
            "L2 Algorithms: PASS -- ML-KEM-768, ML-DSA-65, SLH-DSA, AES-256",
            "L3 Primitives: PASS -- AWS-LC cert #4800, SymCrypt cert #4825",
            "L4 Key Distribution: PASS -- X25519MLKEM768 (enterprise), QKD (gov)",
            "L5 PKI: PASS -- ML-DSA-87 roots, dual-stack certs during transition",
            "L6 Transport: PASS -- TLS 1.3 mandatory, X25519MLKEM768 default",
            "L7 Applications: PASS -- WireGuard PQ, ML-DSA code signing",
            "L8 Governance: PASS -- 5-year $12M program, board approval",
            "L9 Compliance: PASS -- FIPS 140-3, SP 800-131A, FFIEC",
            "",
            "ARCHITECTURE SCORE: 10/10",
            "Fragment collected.",
            "",
            ">> LEARN: The quantum-safe stack is 10 interdependent layers",
            "   A weak link at any layer — e.g., RSA PKI under ML-KEM TLS — breaks the chain.",
            "   Cryptographic agility (negotiation + versioning) enables future algorithm swaps.",
            "   Chrome, Signal, Apple PQ3, and Mullvad VPN confirm enterprise viability today.",
          ],
        }),
        "threat-model": (_args: string[]) => ({
          lines: [
            "=== QUANTUM THREAT MODEL: FINAL VALIDATION ===",
            "SHOR'S ALGORITHM THREATS:",
            "  RSA key exchange: MITIGATED -- ML-KEM deployed",
            "  ECDH key exchange: MITIGATED -- ML-KEM hybrid deployed",
            "  RSA signatures: MITIGATED -- ML-DSA deployed",
            "  ECDSA signatures: MITIGATED -- ML-DSA deployed",
            "",
            "GROVER'S ALGORITHM THREATS:",
            "  AES-128: MITIGATED -- upgraded to AES-256 everywhere",
            "  SHA-256: ACCEPTABLE -- Grover's impact minimal",
            "",
            "HARVEST NOW DECRYPT LATER:",
            "  TLS sessions: MITIGATED -- ML-KEM forward secrecy",
            "  VPN tunnels: MITIGATED -- WireGuard ML-KEM hybrid",
            "  Historical data: RESIDUAL -- pre-migration archives at risk",
            "  Action: Accelerate re-encryption of highest-sensitivity archives",
            "",
            "REMAINING RISKS:",
            "  Algorithm weakness: MITIGATED -- hybrid (both must fail)",
            "  Implementation bugs: MITIGATED -- FIPS validated modules",
            "  Supply chain: MONITORED -- HSM vendor assessments ongoing",
            "",
            "FINAL STATUS: QUANTUM-SAFE ARCHITECTURE COMPLETE",
            "The transition is continuous. Stay agile. Keep monitoring.",
            "Fragment collected.",
            "",
            ">> LEARN: Hybrid PQC ensures no single algorithm failure is catastrophic",
            "   Pre-migration RSA/ECC archives remain the residual HNDL risk — re-encrypt first.",
            "   Grover's on AES-128 is mitigated by AES-256; SHA-256 collision resistance holds.",
            "   NSA CNSA 2.0 (2022) mandates full PQC for NSS systems by 2035.",
          ],
        }),
      },
    },
  },
];

