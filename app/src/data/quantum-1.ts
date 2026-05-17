import type { StageConfig, EpochConfig } from "./types";

export const quantum1Epoch: EpochConfig = {
  id: "quantum-1",
  name: "Quantum Foundations",
  subtitle: "Qubits, Algorithms & Cryptographic Threats",
  description: "Understand how quantum computing threatens the cryptographic foundations of the modern internet — from RSA to AES. Explore superposition, entanglement, Shor's Algorithm, and the Harvest Now, Decrypt Later threat that is already underway.",
  emoji: "⚛️",
  color: "cyan",
  unlocked: true,
};

export const quantum1Stages: StageConfig[] = [
  // ─── quantum-01: Qubit Superposition ────────────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "IBM Quantum Network Hub", location: "Yorktown Heights, New York, USA", era: "2024 CE", emoji: "⚛️" },
    id: "quantum-01",
    order: 1,
    title: "The Qubit Awakens",
    subtitle: "Quantum Superposition — The Foundation of Quantum Threat",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-qubit", name: "Qubit Initiate", emoji: "⚛️" },
    challengeType: "ctf",
    info: {
      tagline: "A classical bit is 0 or 1. A qubit is both — simultaneously — until measured.",
      year: 2024,
      overview: [
        "Classical computers store information as bits: 0 or 1. Quantum computers use qubits, which exploit superposition — a qubit can represent 0, 1, or any combination of both at the same time. A 300-qubit quantum computer can represent 2^300 states simultaneously, more than the number of atoms in the observable universe.",
        "This parallelism is what makes quantum computers dangerous to cryptography. Current asymmetric cryptography (RSA, ECC, Diffie-Hellman) depends on mathematical problems that classical computers cannot solve in reasonable time. Quantum algorithms can solve these problems efficiently — breaking encryption that secures banking, government, and internet traffic.",
        "Understanding superposition is the entry point to understanding the quantum threat. When we say 'quantum computers will break RSA,' we mean: a quantum computer using Shor's Algorithm exploits superposition and interference to find the prime factors of an RSA modulus in polynomial time — what takes classical computers thousands of years.",
      ],
      technical: {
        title: "Superposition and Quantum States",
        body: [
          "A qubit's state is described by: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes and |α|² + |β|² = 1. When measured, the qubit collapses to either 0 (with probability |α|²) or 1 (with probability |β|²). Before measurement, it genuinely is both.",
          "Quantum gates manipulate qubits like classical gates manipulate bits. The Hadamard gate (H) puts a qubit into equal superposition: |0⟩ → (|0⟩ + |1⟩)/√2. Applying H to n qubits creates a superposition of all 2^n states simultaneously — the source of quantum parallelism.",
        ],
        codeExample: {
          label: "Qiskit — creating a qubit in superposition and measuring",
          code: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Create a 1-qubit circuit
qc = QuantumCircuit(1, 1)
qc.h(0)        # Hadamard gate → superposition
qc.measure(0, 0)

# Simulate 1000 measurements
sim = AerSimulator()
job = sim.run(transpile(qc, sim), shots=1000)
result = job.result()
counts = result.get_counts()
print(counts)  # {'0': ~500, '1': ~500}
# Qubit was in superposition — 50/50 on measurement`,
        },
      },
      incident: {
        title: "The Cryptopocalypse — What Breaks on Q-Day",
        when: "Estimated 2030–2035 (CRQC timeline)",
        where: "Global — all internet-connected systems using RSA, ECC, or Diffie-Hellman",
        impact: "All currently encrypted data, past and present, becomes readable; PKI trust collapses",
        body: [
          "Q-Day refers to the day a Cryptographically Relevant Quantum Computer (CRQC) — capable of running Shor's Algorithm at scale — comes online. On that day, RSA-2048, ECC-256, and all Diffie-Hellman key exchanges become instantly breakable. Every TLS session, VPN tunnel, and code signature becomes meaningless.",
          "Security agencies worldwide (NSA, CISA, GCHQ, ANSSI) have begun issuing quantum-readiness advisories. CISA's guidance is clear: organizations should begin their post-quantum migration now, because migration takes years and Harvest Now, Decrypt Later attacks mean adversaries are already collecting encrypted traffic for future decryption.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Classical Bit", sub: "0 or 1 — deterministic", type: "system" },
          { label: "Qubit", sub: "α|0⟩ + β|1⟩ — superposition", type: "attacker" },
          { label: "RSA-2048", sub: "secure against classical — 2^1024 operations", type: "victim" },
          { label: "Shor's Algorithm", sub: "polynomial time — RSA broken", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "Peter Shor publishes Shor's Algorithm — RSA theoretically broken" },
        { year: 2019, event: "Google claims 'quantum supremacy' with 53-qubit Sycamore processor" },
        { year: 2022, event: "IBM releases 433-qubit Osprey processor" },
        { year: 2024, event: "NSA, CISA, NIST finalize post-quantum migration guidance", highlight: true },
        { year: 2030, event: "Estimated earliest CRQC capable of breaking RSA-2048" },
      ],
      keyTakeaways: [
        "Superposition gives quantum computers exponential parallelism — not just faster, fundamentally different",
        "Shor's Algorithm runs in polynomial time on a quantum computer — RSA and ECC have no quantum resistance",
        "Q-Day is not hypothetical: intelligence agencies are funding quantum development on national security timelines",
        "Begin crypto inventory now — migration to post-quantum standards takes years",
      ],
      references: [
        { title: "CISA: Post-Quantum Cryptography Initiative", url: "https://www.cisa.gov/quantum" },
        { title: "NIST PQC Standardization", url: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
      ],
    },
    ctf: {
      scenario: "You're a quantum threat analyst at a national lab. Characterize the quantum threat to a legacy RSA-2048 system by running superposition experiments and calculating when a CRQC could break it.",
      hint: "Run a qubit experiment to observe superposition, then calculate the Shor's Algorithm qubit requirement for RSA-2048.",
      hints: [
        "Read the threat brief. Run: cat threat-brief.txt",
        "Run a superposition experiment to observe quantum parallelism. Run: qubit-sim superposition",
        "Calculate the qubit count needed to break RSA-2048 with Shor's. Run: shor-estimate RSA-2048",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/threat-brief.txt", value: "FLAG{Q_SUPER", label: "Threat Brief — Quantum Computing Overview" },
        { trigger: "qubit-sim superposition", value: "POS1TION_SHOR_", label: "Superposition Observed — Quantum Parallelism Confirmed" },
        { trigger: "shor-estimate RSA-2048", value: "RSA_THREAT}", label: "CRQC Estimate — RSA-2048 Timeline Calculated" },
      ],
      files: {
        "/threat-brief.txt": [
          "QUANTUM THREAT BRIEF — LEVEL 1",
          "Topic: Qubit Superposition and RSA Vulnerability",
          "",
          "Classical bits: 0 or 1. Qubits: both simultaneously.",
          "Shor's Algorithm: breaks RSA in polynomial time on a CRQC.",
          "Sequence: qubit-sim → shor-estimate → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "threat-brief.txt", isDir: false }] },
      extraCommands: {
        "qubit-sim": (_args: string[]) => ({
          lines: [
            "Initializing 1-qubit circuit with Hadamard gate...",
            "State: |ψ⟩ = (|0⟩ + |1⟩)/√2",
            "Sampling 1000 measurements:",
            "  |0⟩: 503 (50.3%)  |1⟩: 497 (49.7%)",
            "Superposition confirmed — qubit was in both states before measurement.",
            "2 qubits → 4 simultaneous states | 10 qubits → 1024 | 300 qubits → 2^300",
          ],
        }),
        "shor-estimate": (_args: string[]) => ({
          lines: [
            "Estimating CRQC requirements for RSA-2048 factoring...",
            "Logical qubits required: ~4096 (with error correction overhead)",
            "Physical qubits (current error rates): ~4,000,000",
            "Current SOTA: IBM 433 logical qubits (2023)",
            "Estimated CRQC timeline: 2030-2035 (optimistic)",
            "Harvest Now, Decrypt Later: adversaries collecting RSA-2048 traffic TODAY",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-02: Shor's Algorithm ───────────────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Bell Labs", location: "Murray Hill, New Jersey, USA", era: "2024 CE", emoji: "🔬" },
    id: "quantum-02",
    order: 2,
    title: "Shor's Guillotine",
    subtitle: "Shor's Algorithm — The RSA/ECC Killer",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-shor", name: "Shor Executor", emoji: "🔬" },
    challengeType: "ctf",
    info: {
      tagline: "Peter Shor's 1994 algorithm reduces RSA factoring from exponential to polynomial time — rendering all current public-key cryptography obsolete.",
      year: 1994,
      overview: [
        "In 1994, MIT mathematician Peter Shor published a quantum algorithm that factors large integers in polynomial time — O((log N)³) quantum operations versus the classical best of O(e^(64/9 * (log N)^(1/3))) sub-exponential operations. This single algorithm theoretically breaks RSA, Diffie-Hellman, and elliptic curve cryptography simultaneously.",
        "RSA's security rests entirely on the hardness of factoring large semiprime numbers — multiplying two primes is easy, factoring the product is classically infeasible. Shor's Algorithm uses quantum Fourier transform and quantum phase estimation to find the period of a modular exponential function, from which factors are derived efficiently.",
        "The algorithm also extends to discrete logarithm problems — breaking Diffie-Hellman (including ECDH). Any cryptosystem whose security relies on factoring or discrete logs is vulnerable. This includes TLS, SSH, IPsec, code signing, and certificate authorities.",
      ],
      technical: {
        title: "How Shor's Algorithm Works",
        body: [
          "Shor's Algorithm has two parts: (1) a classical reduction of factoring to period-finding, and (2) a quantum algorithm for period-finding using the Quantum Fourier Transform (QFT). The QFT extracts periodicity from a quantum superposition of function evaluations — something classically impossible.",
          "For RSA-2048 (a 2048-bit modulus), Shor's requires approximately 4096 logical qubits and trillions of quantum gate operations. Current quantum computers have ~100-400 error-prone physical qubits. Error correction requires ~1000 physical qubits per logical qubit — so ~4 million physical qubits are needed.",
        ],
        codeExample: {
          label: "Shor's Algorithm — simplified period-finding (Qiskit)",
          code: `# Shor's Algorithm period-finding for N=15 (demo scale)
from qiskit.algorithms.factorizers import Shor
from qiskit import Aer

backend = Aer.get_backend('qasm_simulator')
shor = Shor(quantum_instance=backend)

result = shor.factor(N=15)  # Factor 15 = 3 × 5
print(result.factors)  # [[3, 5]]

# Real-world RSA-2048:
# N has 617 decimal digits (2048 bits)
# Requires ~4096 logical qubits (error-corrected)
# Classical best: 2000+ CPU-years
# Shor's on CRQC: hours`,
        },
      },
      incident: {
        title: "NSA's CNSA Suite 2.0 — Acknowledgment of Quantum Threat",
        when: "September 2022",
        where: "Global — all NSS (National Security Systems) operators",
        impact: "NSA mandated post-quantum algorithm migration for all classified systems by 2035",
        body: [
          "In September 2022, the NSA released the Commercial National Security Algorithm Suite 2.0 (CNSA 2.0), mandating that all National Security Systems migrate from RSA and ECC to quantum-resistant algorithms by 2035. This was an explicit government acknowledgment that Shor's Algorithm represents a credible near-term threat.",
          "CNSA 2.0 mandated: CRYSTALS-Kyber for key establishment, CRYSTALS-Dilithium and FALCON for digital signatures, and XMSS/LMS for firmware signing. The 2035 deadline for classified systems implies a belief that CRQCs could emerge by then — or that the migration timeline requires starting immediately.",
        ],
      },
      diagram: {
        nodes: [
          { label: "RSA-2048", sub: "2^1024 classical operations to factor", type: "system" },
          { label: "Shor's Algorithm", sub: "Quantum Fourier Transform — period finding", type: "attacker" },
          { label: "Prime Factors p, q", sub: "extracted in polynomial time", type: "victim" },
          { label: "Private Key Recovered", sub: "all encrypted data decryptable", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "Peter Shor publishes Shor's Algorithm at Bell Labs", highlight: true },
        { year: 2001, event: "IBM demonstrates Shor's Algorithm factoring 15 on a 7-qubit NMR machine" },
        { year: 2019, event: "Google's 53-qubit Sycamore — quantum supremacy for specific problem" },
        { year: 2022, event: "NSA CNSA 2.0 — post-quantum migration mandate for classified systems" },
        { year: 2024, event: "NIST publishes FIPS 203/204/205 — first PQC standards" },
      ],
      keyTakeaways: [
        "Shor's Algorithm breaks RSA, Diffie-Hellman, and ECC simultaneously — all current public-key crypto",
        "The algorithm is known and proven — only the hardware is the barrier",
        "NSA's 2035 mandate implies they believe CRQCs are possible within that timeframe",
        "Symmetric crypto (AES-256, SHA-384) requires only key/digest size doubling — Grover's algorithm halves security",
      ],
      references: [
        { title: "Peter Shor: Polynomial-Time Algorithms for Prime Factorization (1994)", url: "https://arxiv.org/abs/quant-ph/9508027" },
        { title: "NSA CNSA Suite 2.0", url: "https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF" },
      ],
    },
    ctf: {
      scenario: "A cryptographer has embedded a challenge: demonstrate Shor's threat by factoring a small RSA semiprime using the quantum period-finding approach, then assess the timeline to CRQC for RSA-2048.",
      hint: "Use the quantum factorer on the demo semiprime N=3127, then run the CRQC timeline estimator.",
      hints: [
        "Read the algorithm brief. Run: cat shor-brief.txt",
        "Factor the demo RSA semiprime using Shor's Algorithm. Run: quantum-factor 3127",
        "Estimate CRQC readiness for RSA-2048. Run: crqc-timeline",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/shor-brief.txt", value: "FLAG{SHORS_", label: "Algorithm Brief — Shor's RSA Threat" },
        { trigger: "quantum-factor 3127", value: "ALG0_RSA_", label: "RSA Semiprime Factored — p=53, q=59" },
        { trigger: "crqc-timeline", value: "FACTOR3D_CR0C}", label: "CRQC Timeline — 2030-2035 Estimated" },
      ],
      files: {
        "/shor-brief.txt": [
          "QUANTUM THREAT BRIEF — SHOR'S ALGORITHM",
          "Target: RSA factoring via quantum period-finding",
          "",
          "N=3127 = p × q (demo scale — find p and q)",
          "RSA-2048: requires ~4096 logical qubits on CRQC",
          "Sequence: quantum-factor → crqc-timeline → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "shor-brief.txt", isDir: false }] },
      extraCommands: {
        "quantum-factor": (_args: string[]) => ({
          lines: [
            "Running Shor's Algorithm on N=3127...",
            "Step 1: Classical reduction — period-finding for f(x) = 7^x mod 3127",
            "Step 2: Quantum Fourier Transform — period r=58 found",
            "Step 3: gcd(7^29 - 1, 3127) = 53",
            "Factors: p=53, q=59 (53 × 59 = 3127 ✓)",
            "Classical equivalent: brute force in ~56 operations",
            "RSA-2048 classical: ~2^1024 operations | Shor's CRQC: hours",
          ],
        }),
        "crqc-timeline": (_args: string[]) => ({
          lines: [
            "CRQC Readiness Assessment for RSA-2048:",
            "  Logical qubits required: ~4096",
            "  Physical qubits (current error rates): ~4,000,000",
            "  IBM roadmap: 100,000+ qubits by 2033",
            "  Intelligence community estimate: 2030-2035",
            "  CISA/NSA guidance: begin migration NOW",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-03: Grover's Algorithm ─────────────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "NIST Gaithersburg Campus", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "🏛️" },
    id: "quantum-03",
    order: 3,
    title: "Grover's Specter",
    subtitle: "Grover's Algorithm — AES Weakening and Symmetric Crypto Impact",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-grover", name: "Grover Hunter", emoji: "🏛️" },
    challengeType: "ctf",
    info: {
      tagline: "Grover's Algorithm provides a quadratic quantum speedup for search problems — effectively halving the security of symmetric encryption.",
      year: 1996,
      overview: [
        "In 1996, Lov Grover published a quantum search algorithm that finds a target item in an unsorted database of N items in O(√N) operations — quadratically faster than classical O(N) search. Applied to cryptography, Grover's Algorithm effectively halves the key length security of any symmetric cipher or hash function.",
        "For AES-128: classical brute force requires 2^128 operations; Grover's reduces this to 2^64 — within range of a sufficiently powerful CRQC. For AES-256: Grover's reduces to 2^128 — still computationally infeasible. This is why NIST recommends AES-256 and SHA-384 as quantum-safe symmetric algorithms (with doubled security margins).",
        "The good news: symmetric cryptography does not break under quantum computing — it just weakens. AES-256 and SHA-384 remain secure if used correctly. The bad news: AES-128 and SHA-256 should be considered quantum-weakened — their effective security drops to 64-bit post-CRQC.",
      ],
      technical: {
        title: "Grover's Algorithm — Quadratic Quantum Speedup",
        body: [
          "Grover's Algorithm uses quantum amplitude amplification to iteratively increase the probability of measuring the target state. Starting with equal superposition across all N states, each iteration increases the target state's amplitude by O(1/√N). After O(√N) iterations, the target state has near-certainty probability of measurement.",
          "Applied to AES-128 key search: the 'database' is all 2^128 possible keys; the 'target' is the correct key. Grover's finds it in O(2^64) quantum operations. Modern hardware can sustain 2^64 operations — so AES-128 is considered quantum-broken. AES-256 requires 2^128 Grover iterations — still secure.",
        ],
        codeExample: {
          label: "Grover's impact on symmetric key security",
          code: `# Impact of Grover's Algorithm on symmetric cryptography
# Security level = log2(operations to break)

Algorithm       Classical Security  Post-Grover Security  Status
-----------     ------------------  --------------------  ------
AES-128         128 bits            64 bits               WEAKENED
AES-192         192 bits            96 bits               ADEQUATE (short-term)
AES-256         256 bits            128 bits              QUANTUM-SAFE
3DES-168        168 bits            84 bits               WEAKENED
SHA-256         256 bits (preimage) 128 bits              ADEQUATE
SHA-384         384 bits            192 bits              QUANTUM-SAFE
SHA-512         512 bits            256 bits              QUANTUM-SAFE
HMAC-SHA256     128 bits*           64 bits               WEAKENED*

# NIST recommendation: use AES-256 and SHA-384 minimum
# for quantum-resistant symmetric security`,
        },
      },
      incident: {
        title: "NIST PQC Standards — Quantum-Safe Symmetric Guidance",
        when: "August 2024",
        where: "Global — NIST FIPS 140-3 and post-quantum guidance",
        impact: "All AES-128 deployments require upgrade; SHA-256 alone insufficient for long-term quantum resistance",
        body: [
          "NIST's post-quantum cryptography standards (FIPS 203, 204, 205, published August 2024) focus on asymmetric algorithms, but NIST's quantum-resistance guidance for symmetric crypto is equally important: use AES-256 (not AES-128), use SHA-384 or SHA-512 (not SHA-256) for long-term security, and use HMAC with 256-bit or larger keys.",
          "Many organizations have deployed AES-128 assuming it was 'good enough.' Post-CRQC, AES-128 provides only 64-bit effective security — breakable with quantum hardware. The migration path is straightforward (just increase key sizes) but requires audit and reconfiguration of all cryptographic deployments.",
        ],
      },
      diagram: {
        nodes: [
          { label: "AES-128 Brute Force", sub: "2^128 classical operations — infeasible", type: "system" },
          { label: "Grover's Algorithm", sub: "quadratic speedup — O(√N)", type: "attacker" },
          { label: "AES-128 Post-CRQC", sub: "2^64 operations — feasible", type: "victim" },
          { label: "AES-256 Recommended", sub: "2^128 post-Grover — still secure", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "Lov Grover publishes quantum search algorithm at Bell Labs", highlight: true },
        { year: 2001, event: "NIST finalizes AES — AES-128/192/256 all standardized" },
        { year: 2016, event: "NIST begins PQC standardization; Grover's impact on AES analyzed" },
        { year: 2024, event: "NIST guidance: AES-256 required for long-term quantum resistance" },
      ],
      keyTakeaways: [
        "Grover's Algorithm halves the effective bit security of any symmetric cipher or hash function",
        "AES-128 and SHA-256 are quantum-weakened — migrate to AES-256 and SHA-384 minimum",
        "Symmetric crypto doesn't 'break' under quantum — it weakens; AES-256 remains secure",
        "Audit all cryptographic deployments for key sizes; AES-128 in TLS, disk encryption, and firmware must be upgraded",
      ],
      references: [
        { title: "Grover: Quantum Mechanics Helps in Searching (1996)", url: "https://arxiv.org/abs/quant-ph/9605043" },
        { title: "NIST: Quantum-Resistant Cryptography", url: "https://www.nist.gov/programs-projects/post-quantum-cryptography" },
      ],
    },
    ctf: {
      scenario: "A security team uses AES-128 throughout their infrastructure. Demonstrate the quantum threat to AES-128 using Grover's analysis, then identify which systems need key-size upgrades.",
      hint: "Run a Grover's complexity analysis on AES-128 and AES-256, then audit the system's crypto config.",
      hints: [
        "Read the crypto audit brief. Run: cat crypto-audit.txt",
        "Run Grover's complexity analysis on the current AES deployments. Run: grover-analyze AES-128",
        "Identify the recommended replacements and audit the config. Run: crypto-audit-run",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/crypto-audit.txt", value: "FLAG{GROVERS_", label: "Crypto Audit — AES-128 Deployment Found" },
        { trigger: "grover-analyze AES-128", value: "AES128_WEAK3N3D_", label: "Grover's Analysis — 64-bit Post-Quantum Security" },
        { trigger: "crypto-audit-run", value: "256_SAFE}", label: "Audit Complete — AES-256 Migration Required" },
      ],
      files: {
        "/crypto-audit.txt": [
          "CRYPTO AUDIT — QUANTUM READINESS ASSESSMENT",
          "Systems using AES-128: TLS sessions, disk encryption, VPN",
          "Current SHA-256 usage: code signing, HMAC",
          "",
          "Task: assess quantum threat and identify required upgrades.",
          "Sequence: grover-analyze → crypto-audit-run → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "crypto-audit.txt", isDir: false }] },
      extraCommands: {
        "grover-analyze": (_args: string[]) => ({
          lines: [
            "Grover's Algorithm analysis for AES-128:",
            "  Classical security: 2^128 operations (~340 undecillion)",
            "  Post-Grover (CRQC): 2^64 operations (~18 quintillion)",
            "  2^64 ops: feasible with CRQC (~hours to days)",
            "  Verdict: AES-128 is QUANTUM-WEAKENED",
            "AES-256: 2^128 post-Grover — QUANTUM-SAFE ✓",
          ],
        }),
        "crypto-audit-run": (_args: string[]) => ({
          lines: [
            "Scanning crypto config...",
            "  TLS 1.3: AES-128-GCM → UPGRADE to AES-256-GCM",
            "  Disk encryption: AES-128-CBC → UPGRADE to AES-256-XTS",
            "  VPN: AES-128-CBC → UPGRADE to AES-256-GCM",
            "  Code signing: SHA-256 → UPGRADE to SHA-384",
            "Remediation: 4 systems require key-size upgrades.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-04: Harvest Now Decrypt Later ───────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Fort Meade NSA Data Center", location: "Fort Meade, Maryland, USA", era: "2024 CE", emoji: "🗄️" },
    id: "quantum-04",
    order: 4,
    title: "Harvest Now, Decrypt Later",
    subtitle: "HNDL — The Quantum Threat That Is Already Underway",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-hndl", name: "Data Harvester", emoji: "🗄️" },
    challengeType: "ctf",
    info: {
      tagline: "Nation-states are collecting encrypted traffic today to decrypt it with quantum computers tomorrow — your secrets are already at risk.",
      year: 2023,
      overview: [
        "Harvest Now, Decrypt Later (HNDL) — also called Store Now, Decrypt Later (SNDL) — is a quantum threat that is actively occurring right now. Nation-state adversaries are intercepting and storing encrypted internet traffic (TLS sessions, VPN data, email, classified communications) with the intention of decrypting it once a CRQC becomes available.",
        "This threat makes the quantum computing timeline irrelevant for data classified today. Even if CRQCs are 10 years away, any data encrypted with RSA or ECC that an adversary captures today can be decrypted in 10 years. Sensitive data with a classification lifetime beyond 5-10 years must be protected with quantum-resistant algorithms NOW.",
        "Intelligence agencies from China, Russia, and likely other nations are operating HNDL programs. CISA, NSA, and the Five Eyes have explicitly warned about HNDL in their post-quantum guidance. The window to protect long-lived sensitive data is closing.",
      ],
      technical: {
        title: "How HNDL Attacks Work",
        body: [
          "An HNDL adversary operates a passive collection infrastructure — tapping fiber optic cables, operating rogue BGP nodes, or working with complicit ISPs — to capture encrypted traffic at scale. The ciphertext is stored cheaply (storage costs drop ~50% per year) until a CRQC is operational.",
          "TLS provides forward secrecy for the session key (via ECDHE), but the session key exchange itself is encrypted under the server's RSA or ECC public key. An adversary with a CRQC can break the key exchange, derive the session key, and decrypt the captured session. Forward secrecy alone does not defeat HNDL.",
        ],
        codeExample: {
          label: "HNDL threat model — what an adversary stores and later decrypts",
          code: `# HNDL attack model:
# 1. TODAY: Adversary captures TLS session
#    Client Hello → Server Hello → Certificate (RSA-2048 public key)
#    Key Exchange: ECDHE (encrypted under server's RSA public key)
#    Encrypted session data: financial records, classified docs, VPN traffic

# 2. FUTURE (Q-Day): Adversary runs Shor's Algorithm
#    Input: server's RSA-2048 public key (captured in certificate)
#    Output: server's RSA-2048 private key (factored in hours)
#    Derive: ECDHE session key (decrypted with recovered private key)
#    Decrypt: all captured session data

# DATA AT RISK (must migrate NOW):
# - Classified communications with >10-year sensitivity
# - Medical records (HIPAA retention: 7-50 years)
# - Financial data (legal retention: 7-10 years)
# - Government secrets (classification: 25-75 years)
# - Intellectual property (patent protection: 20 years)

# MIGRATION: Replace RSA/ECC with CRYSTALS-Kyber for key exchange`,
        },
      },
      incident: {
        title: "Chinese APT HNDL Operations — Snowden Documents and IC Warnings",
        when: "2010–present",
        where: "Global — undersea cables, internet exchange points, ISP infrastructure",
        impact: "Decades of classified and sensitive communications potentially compromised retroactively at Q-Day",
        body: [
          "Intelligence community assessments (including leaked Snowden documents and public NSA/CISA advisories) confirm that nation-state actors are operating large-scale passive collection programs. The explicit purpose includes future quantum decryption. China's national quantum computing investment exceeds $15 billion, the largest in the world.",
          "A 2023 CISA advisory stated explicitly: 'Adversaries may be storing encrypted data today with the intent to decrypt it when quantum computers become powerful enough.' This is not speculation — it is an operational reality that security architects must plan around when protecting any data with multi-year sensitivity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Adversary (NOW)", sub: "intercepts + stores TLS ciphertext", type: "attacker" },
          { label: "Encrypted Traffic", sub: "RSA/ECC key exchange + session data", type: "system" },
          { label: "Quantum Computer (Q-Day)", sub: "Shor's breaks RSA key exchange", type: "victim" },
          { label: "Plaintext Recovered", sub: "years of secrets decrypted retroactively", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Snowden documents reveal NSA XKeyscore — mass internet traffic collection" },
        { year: 2022, event: "CISA issues first explicit HNDL warning in post-quantum guidance" },
        { year: 2023, event: "NSA CNSA 2.0 mandates PQC migration for all NSS — explicit HNDL response", highlight: true },
        { year: 2024, event: "NIST publishes FIPS 203/204/205 — first PQC standards for HNDL defense" },
      ],
      keyTakeaways: [
        "HNDL is happening now — migration protects future decryption of today's captured traffic",
        "Data with >5-year sensitivity lifetime must use post-quantum key exchange immediately",
        "Forward secrecy (ECDHE) does not protect against HNDL — the key exchange uses RSA/ECC which Shor's breaks",
        "Prioritize: classified data, patient records, IP, financial records — anything with long-term sensitivity",
      ],
      references: [
        { title: "CISA: Post-Quantum Cryptography — HNDL Threat", url: "https://www.cisa.gov/sites/default/files/2023-08/CISA_Insight_Quantum_508c.pdf" },
        { title: "NSA: Preparing for Post-Quantum Cryptography", url: "https://media.defense.gov/2021/Aug/04/2002821837/-1/-1/1/Quantum_FAQs.PDF" },
      ],
    },
    ctf: {
      scenario: "You're analyzing intercepted encrypted traffic from 3 years ago. A CRQC is now available. Demonstrate the HNDL attack chain: recover the RSA private key and decrypt the stored session.",
      hint: "The stored traffic contains the server certificate (RSA-2048 public key). Use Shor's to factor it, derive the private key, and decrypt the session.",
      hints: [
        "Read the intercept log. Run: cat intercept-log.txt",
        "Factor the RSA-2048 public key from the captured certificate. Run: shor-factor-cert",
        "Decrypt the stored TLS session using the recovered private key. Run: decrypt-session",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/intercept-log.txt", value: "FLAG{HNDL_", label: "Intercept Log — 3-Year-Old TLS Session Found" },
        { trigger: "shor-factor-cert", value: "HARVEST_NOW_", label: "RSA Key Factored — Private Key Recovered" },
        { trigger: "decrypt-session", value: "DECRYPT_L4T3R}", label: "Session Decrypted — 3 Years Later, Secrets Revealed" },
      ],
      files: {
        "/intercept-log.txt": [
          "HNDL INTERCEPT LOG — COLLECTED 2021-03-15",
          "Source: TLS 1.2 session — financial institution",
          "Server cert: RSA-2048 (stored)",
          "Session ciphertext: 847KB (stored)",
          "",
          "CRQC now available. Proceed with decryption.",
          "Sequence: shor-factor-cert → decrypt-session → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "intercept-log.txt", isDir: false }] },
      extraCommands: {
        "shor-factor-cert": (_args: string[]) => ({
          lines: [
            "Loading captured server certificate (RSA-2048)...",
            "Running Shor's Algorithm on CRQC...",
            "Public modulus N factored in 4.2 hours:",
            "  p = [617-digit prime]",
            "  q = [617-digit prime]",
            "RSA private key d computed from p, q, e.",
            "Private key recovered. Ready to decrypt session.",
          ],
        }),
        "decrypt-session": (_args: string[]) => ({
          lines: [
            "Decrypting ECDHE key exchange with recovered RSA private key...",
            "Session key: 3f8a2b1c4d5e6f7a8b9c (AES-128)",
            "Decrypting 847KB session payload...",
            "Plaintext: Q2 2021 merger acquisition data — CONFIDENTIAL",
            "HNDL attack complete: 3-year-old secret decrypted.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-05: Quantum Entanglement ───────────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Cisco Quantum Labs", location: "Santa Monica, California, USA", era: "2026 CE", emoji: "🔗" },
    id: "quantum-05",
    order: 5,
    title: "Spooky Action at a Distance",
    subtitle: "Quantum Entanglement — Foundation of Quantum Networking and QKD",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-entangle", name: "Quantum Entangler", emoji: "🔗" },
    challengeType: "ctf",
    info: {
      tagline: "Entanglement links two qubits so that measuring one instantly determines the other — the foundation of quantum key distribution.",
      year: 2024,
      overview: [
        "Quantum entanglement is a phenomenon where two qubits become correlated so that the quantum state of one cannot be described independently of the other, regardless of the physical distance separating them. Measuring one entangled qubit instantaneously determines the state of its partner — what Einstein called 'spooky action at a distance.'",
        "Entanglement is not useful for faster-than-light communication (the measurement outcomes are random), but it is the foundation of quantum key distribution (QKD) protocols like E91. It also underlies quantum teleportation — the transfer of quantum state information between locations — and quantum repeaters that will extend quantum networks.",
        "For cybersecurity professionals, entanglement matters because QKD schemes using entanglement provide information-theoretic security: eavesdropping on an entangled QKD channel is detectable by physics, not just computational hardness.",
      ],
      technical: {
        title: "Bell States and Entanglement in Cryptography",
        body: [
          "The simplest entangled state is a Bell state: |Φ+⟩ = (|00⟩ + |11⟩)/√2. When Alice and Bob each hold one qubit of this pair, measuring Alice's qubit (getting 0 or 1) instantly determines Bob's measurement result — both get 0, or both get 1, with 50% probability each. This correlation exists even if they're light-years apart.",
          "In the E91 QKD protocol, Alice and Bob share entangled pairs and measure them on randomly chosen bases. The correlations between measurements allow them to generate a shared secret key. Any eavesdropper who intercepts and measures the entangled qubits disturbs the quantum state — detectable via Bell inequality violations.",
        ],
        codeExample: {
          label: "Qiskit — creating a Bell state (entangled qubit pair)",
          code: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit import transpile

# Create entangled Bell pair (|Φ+⟩ = |00⟩+|11⟩/√2)
qc = QuantumCircuit(2, 2)
qc.h(0)      # Hadamard on qubit 0
qc.cx(0, 1)  # CNOT: entangle qubit 1 with qubit 0
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
job = sim.run(transpile(qc, sim), shots=1000)
counts = job.result().get_counts()
print(counts)  # {'00': ~500, '11': ~500}
# NEVER sees '01' or '10' — qubits are entangled
# Alice and Bob always agree — foundation of E91 QKD`,
        },
      },
      incident: {
        title: "Cisco Universal Quantum Switch — Room-Temperature Quantum Networking (April 2026)",
        when: "April 2026",
        where: "Cisco Quantum Labs, Santa Monica, California",
        impact: "First vendor-agnostic quantum switch operating at room temperature over standard telecom fiber; enables commercial QKD infrastructure without cryogenic hardware",
        body: [
          "In April 2026, Cisco announced the Universal Quantum Switch — a landmark device that operates at room temperature over standard telecom fiber and is vendor-agnostic, supporting all major quantum computing modalities via patented modality conversion. Developed at Cisco's Santa Monica quantum labs, it includes an integrated quantum entanglement chip and a network-aware Quantum Compiler (Quantum Orchestra) for orchestrating distributed quantum devices using classical network topology.",
          "The switch bridges post-quantum cryptography (PQC) with quantum key distribution (QKD) via the SKIP interface, allowing Cisco IPsec and MACsec to consume quantum-safe keys from external QKD systems. This means existing Cisco network infrastructure — including Silicon One P200 (800G PQC-capable) and G300 (102.4 Tbit/s) switches — can integrate directly with quantum key material. Cisco's quantum networking strategy is now the most complete enterprise quantum-safe stack available from a single vendor.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Alice (qubit 0)", sub: "measures — gets 0 or 1", type: "system" },
          { label: "Cisco Universal Quantum Switch", sub: "room-temp entanglement distribution", type: "attacker" },
          { label: "Bob (qubit 1)", sub: "instantly knows Alice's result", type: "victim" },
          { label: "Shared Secret Key", sub: "E91 QKD + SKIP → Cisco IPsec/MACsec", type: "result" },
        ],
      },
      timeline: [
        { year: 1935, event: "Einstein-Podolsky-Rosen paradox — 'spooky action at a distance' described" },
        { year: 1991, event: "Artur Ekert proposes E91 QKD protocol based on entanglement" },
        { year: 2017, event: "China's Micius satellite — 1200km entanglement distribution" },
        { year: 2025, event: "Cisco Silicon One P200: 800G line-rate with quantum-safe encryption" },
        { year: 2026, event: "Cisco Universal Quantum Switch — room-temp QKD over standard telecom fiber", highlight: true },
      ],
      keyTakeaways: [
        "Entanglement enables information-theoretic security: eavesdropping is detectable by physics",
        "E91 QKD uses entangled pairs to generate shared keys with provable security against any eavesdropper",
        "Cisco's Universal Quantum Switch (2026) makes commercial QKD practical — no cryogenics, runs on existing fiber",
        "Cisco SKIP interface bridges QKD key material into IPsec/MACsec — PQC + QKD hybrid security",
      ],
      references: [
        { title: "Cisco Universal Quantum Switch Announcement (April 2026)", url: "https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m04/cisco-introduces-universal-quantum-switch-advancing-the-path-to-a-quantum-network.html" },
        { title: "Ekert: Quantum Cryptography Based on Bell's Theorem (1991)", url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.67.661" },
        { title: "Cisco: Building a Quantum-Safe Future", url: "https://blogs.cisco.com/security/from-strategy-to-architecture-building-a-quantum-safe-future" },
      ],
    },
    ctf: {
      scenario: "You're a quantum network engineer at Cisco's Santa Monica lab, commissioning the Universal Quantum Switch for a government customer. Configure the E91 QKD link, verify entanglement integrity, and provision quantum-derived key material into the customer's IPsec tunnels via the SKIP interface.",
      hint: "Read the switch brief, simulate the Bell pair generation, run E91 key generation, then provision the key into IPsec via the Cisco SKIP interface.",
      hints: [
        "Read the QKD protocol brief. Run: cat e91-brief.txt",
        "Simulate the Bell pair generation on the Cisco switch. Run: bell-sim 100",
        "Run the E91 key generation using entanglement correlations. Run: e91-keygen",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/e91-brief.txt", value: "FLAG{ENTANGL3D_", label: "E91 Brief — Cisco Universal Quantum Switch Protocol" },
        { trigger: "bell-sim 100", value: "B3LL_E91_", label: "Bell State Verified — Cisco Entanglement Chip Online" },
        { trigger: "e91-keygen", value: "QKD_K3Y}", label: "Key Provisioned — Cisco SKIP → IPsec Tunnel Active" },
      ],
      files: {
        "/e91-brief.txt": [
          "CISCO UNIVERSAL QUANTUM SWITCH — FIELD BRIEF",
          "Device: Cisco UQS-1 (April 2026)",
          "Location: Santa Monica Quantum Labs → Customer DC (fiber link)",
          "",
          "Operating temperature: room temperature (no cryogenics required)",
          "Medium: standard telecom fiber",
          "Modality: vendor-agnostic (patented conversion chip)",
          "",
          "Protocol: E91 entanglement-based QKD",
          "  - Entangled Bell pairs distributed to both endpoints",
          "  - Any eavesdropper disturbs Bell inequalities — detectable",
          "  - Quantum Orchestra orchestrates session via classical topology",
          "",
          "Key delivery: SKIP interface → Cisco IPsec/MACsec",
          "Goal: generate shared secret from entanglement, provision into IPsec.",
          "Sequence: bell-sim → e91-keygen → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "e91-brief.txt", isDir: false }] },
      chatbotContext: "This stage is about the Cisco Universal Quantum Switch (announced April 2026) and E91 entanglement-based QKD. Key Cisco products: Universal Quantum Switch (room-temp, standard fiber, vendor-agnostic modality conversion); Silicon One P200 (800G quantum-safe); Quantum Orchestra (orchestrates quantum devices); SKIP interface (bridges QKD key material into Cisco IPsec/MACsec). Fragments are triggered by cat e91-brief.txt, bell-sim 100, and e91-keygen.",
      extraCommands: {
        "bell-sim": (_args: string[]) => ({
          lines: [
            "Cisco UQS-1 — Entanglement Engine ONLINE",
            "Generating 100 Bell pairs (|Φ+⟩) via integrated entanglement chip...",
            "Distributing over telecom fiber to remote endpoint...",
            "Quantum Orchestra: session established, classical topology verified",
            "",
            "Measuring all pairs in Z basis:",
            "  |00⟩: 52 times",
            "  |11⟩: 48 times",
            "  |01⟩: 0 times  ← entanglement confirmed",
            "  |10⟩: 0 times  ← entanglement confirmed",
            "",
            "Bell inequality violation: CONFIRMED — true quantum entanglement.",
            "Eavesdrop detection: CLEAN (QBER < 5%)",
          ],
        }),
        "e91-keygen": (_args: string[]) => ({
          lines: [
            "E91 key extraction from 100 entangled pairs...",
            "Sifting: 68 pairs retained after basis reconciliation",
            "Quantum Bit Error Rate (QBER): 1.5%  (threshold: 11% — CLEAN)",
            "Privacy amplification: applied",
            "Final key: 512 bits  |  a3f2...b8c1",
            "",
            "Cisco SKIP interface: provisioning key to IPsec SA...",
            "  Tunnel: quantum-safe-vpn-001",
            "  Algorithm: ML-KEM-768 + QKD hybrid",
            "  Status: ACTIVE — information-theoretically secure",
            "",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-06: NISQ Era and Current Limits ────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Google Quantum AI Campus", location: "Santa Barbara, California, USA", era: "2024 CE", emoji: "💡" },
    id: "quantum-06",
    order: 6,
    title: "The NISQ Era",
    subtitle: "Noisy Intermediate-Scale Quantum — Where We Are Now",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-nisq", name: "NISQ Navigator", emoji: "💡" },
    challengeType: "ctf",
    info: {
      tagline: "Current quantum computers are powerful enough to demonstrate quantum advantage but not powerful enough to break RSA — yet.",
      year: 2024,
      overview: [
        "We are in the Noisy Intermediate-Scale Quantum (NISQ) era — quantum computers with 50-1000 qubits that lack the error correction needed for cryptographically relevant computations. NISQ devices can solve certain narrow problems faster than classical computers but cannot run Shor's Algorithm at RSA-relevant scale.",
        "NISQ devices have two fundamental limitations: qubit count and error rates. Current physical qubits have error rates of ~0.1-1% per gate operation. Running Shor's Algorithm on RSA-2048 requires trillions of gate operations — error rates would cause the computation to fail long before completion. Quantum error correction (QEC) requires ~1000 physical qubits per logical qubit.",
        "Understanding NISQ limitations is important for calibrating the quantum threat timeline. The cryptographic threat is real but not immediate — organizations have time to migrate, but that migration takes years. Starting today is the right posture.",
      ],
      technical: {
        title: "NISQ Limitations — Error Rates and the Road to CRQC",
        body: [
          "A Cryptographically Relevant Quantum Computer (CRQC) for RSA-2048 requires approximately 4096 logical qubits (using Shor's Algorithm with modern optimizations). With current error rates (~0.1% per gate), each logical qubit needs ~1000 physical qubits for error correction. Total: ~4 million physical qubits.",
          "IBM's quantum roadmap targets 100,000+ qubits by 2033. Google's Willow chip (2024) demonstrated below-threshold error correction — a key milestone toward fault-tolerant quantum computing. The path to CRQC is not blocked by fundamental physics, only by engineering challenges.",
        ],
        codeExample: {
          label: "NISQ vs CRQC — capability comparison",
          code: `# Current NISQ landscape (2024)

Processor        Qubits    Error/Gate  Application
-----------      ------    ----------  -----------
IBM Eagle        127       ~0.1%       Quantum simulation, chemistry
IBM Condor       1121      ~0.2%       Research
Google Sycamore  53        ~0.6%       Quantum supremacy demo
Google Willow    105       <0.1%*      Error correction milestone
IonQ Forte       36        ~0.3%**     Trapped ion — high fidelity

# Required for RSA-2048 factoring (Shor's):
CRQC target:     4096 logical qubits (= ~4M physical @ current error rates)
Gate operations: ~10^12 (trillion) error-corrected operations
Time estimate:   Hours to days on a CRQC

# * Willow demonstrated below-threshold QEC — key milestone
# ** Trapped ion gate fidelity, two-qubit operations`,
        },
      },
      incident: {
        title: "Google Willow — Below-Threshold Error Correction (December 2024)",
        when: "December 2024",
        where: "Google Quantum AI, Santa Barbara, California",
        impact: "First demonstration of quantum error correction below threshold — major milestone toward fault-tolerant QC",
        body: [
          "In December 2024, Google published results from their Willow quantum processor demonstrating 'below-threshold' quantum error correction — meaning that increasing the number of error-correction qubits actually decreased the error rate, rather than increasing it (as was the case previously). This is a fundamental milestone on the path to fault-tolerant quantum computing.",
          "Willow also performed a benchmark computation in 5 minutes that Google estimated would take the fastest classical supercomputer 10^25 years. While this benchmark is narrow and not directly applicable to cryptography, it demonstrates the trajectory of quantum hardware improvement.",
        ],
      },
      diagram: {
        nodes: [
          { label: "NISQ (2024)", sub: "50-1121 physical qubits, ~0.1% error", type: "system" },
          { label: "Error Correction Milestone", sub: "Google Willow — below threshold (2024)", type: "attacker" },
          { label: "Fault-Tolerant QC (~2030)", sub: "logical qubits, <0.001% error", type: "victim" },
          { label: "CRQC (~2030-2035)", sub: "RSA-2048 breakable — Shor's operational", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Google Sycamore — 53-qubit quantum supremacy demonstration" },
        { year: 2023, event: "IBM Condor — 1121-qubit processor released" },
        { year: 2024, event: "Google Willow — below-threshold error correction achieved", highlight: true },
        { year: 2033, event: "IBM roadmap target: 100,000+ qubit system" },
        { year: 2035, event: "NSA CRQC risk horizon — PQC migration deadline for classified systems" },
      ],
      keyTakeaways: [
        "NISQ era = quantum advantage for narrow problems, but NOT cryptographic relevance yet",
        "Google Willow's below-threshold QEC is the most significant milestone toward CRQC to date",
        "The engineering path to CRQC is clear — it's a matter of scale and time, not fundamental physics",
        "Migration timelines (3-7 years) must begin before CRQC arrives — start now",
      ],
      references: [
        { title: "Google: Quantum error correction below the surface code threshold", url: "https://www.nature.com/articles/s41586-024-08449-y" },
        { title: "IBM Quantum Roadmap 2023-2033", url: "https://www.ibm.com/quantum/roadmap" },
      ],
    },
    ctf: {
      scenario: "Assess the current NISQ quantum threat level for your organization's 10-year data sensitivity window, using the latest hardware benchmarks and CRQC timeline estimates.",
      hint: "Query the current NISQ device specs, run the threat timeline calculator, and generate the organizational risk assessment.",
      hints: [
        "Read the threat assessment brief. Run: cat nisq-brief.txt",
        "Query current NISQ hardware specs and limitations. Run: nisq-status",
        "Calculate CRQC threat timeline for 10-year sensitivity data. Run: crqc-risk 10",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/nisq-brief.txt", value: "FLAG{NISQ_ERA_", label: "NISQ Brief — Current Quantum Landscape" },
        { trigger: "nisq-status", value: "CR0C_TIMELINE_", label: "Hardware Status — Willow Milestone Confirmed" },
        { trigger: "crqc-risk 10", value: "MIGR8}", label: "Risk Assessment — Migrate Within 3 Years" },
      ],
      files: {
        "/nisq-brief.txt": [
          "NISQ THREAT ASSESSMENT BRIEF",
          "Data sensitivity window: 10 years",
          "Current crypto: RSA-2048 + AES-128",
          "",
          "Task: assess CRQC threat and migration urgency.",
          "Sequence: nisq-status → crqc-risk → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "nisq-brief.txt", isDir: false }] },
      extraCommands: {
        "nisq-status": (_args: string[]) => ({
          lines: [
            "Current NISQ hardware status (2024):",
            "  Google Willow: 105 qubits, below-threshold QEC — MILESTONE",
            "  IBM Condor: 1121 physical qubits, logical QEC in progress",
            "  IonQ Forte: 36 high-fidelity trapped ion qubits",
            "  CRQC requirement: ~4M physical qubits (at current error rates)",
            "  IBM 2033 roadmap: 100,000+ qubit system (approaching CRQC range)",
          ],
        }),
        "crqc-risk": (_args: string[]) => ({
          lines: [
            "CRQC risk assessment for 10-year data sensitivity window:",
            "  CRQC estimated: 2030-2035 (consensus range)",
            "  Data retained for: 10 years → HNDL risk: HIGH",
            "  RSA-2048: will be broken within sensitivity window",
            "  Recommendation: migrate to CRYSTALS-Kyber within 3 years",
            "  AES-128: upgrade to AES-256 immediately",
            "Risk level: CRITICAL — begin migration now.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-07: Quantum Error Correction ───────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Caltech IQIM", location: "Pasadena, California, USA", era: "2024 CE", emoji: "🛡️" },
    id: "quantum-07",
    order: 7,
    title: "The Error Correction Wall",
    subtitle: "Quantum Error Correction — The Bridge to Fault-Tolerant QC",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-qec", name: "Error Corrector", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "Quantum error correction is the engineering barrier between NISQ devices and cryptographically relevant quantum computers.",
      year: 2024,
      overview: [
        "Quantum states are fragile — any interaction with the environment causes 'decoherence,' destroying the quantum information. Unlike classical computers where bits can be directly copied and error-checked, quantum states cannot be copied (no-cloning theorem) and measuring them destroys the superposition.",
        "Quantum Error Correction (QEC) encodes one logical qubit into multiple physical qubits, using redundancy to detect and correct errors without measuring (and thus collapsing) the logical state. The Surface Code — the most promising QEC scheme — requires ~1000 physical qubits per logical qubit at current error rates.",
        "The 'threshold' in QEC is the physical error rate below which adding more error-correction qubits actually reduces the logical error rate. Google's Willow (2024) demonstrated operation below this threshold — a historic milestone. Once fault-tolerant quantum computing is achieved, the path to CRQC is primarily an engineering scale problem.",
      ],
      technical: {
        title: "Surface Code — The Leading Quantum Error Correction Scheme",
        body: [
          "The Surface Code arranges physical qubits in a 2D grid. Data qubits store information; ancilla qubits are measured to detect errors without revealing the encoded information. Error syndromes (patterns of ancilla measurements) indicate which errors occurred, allowing software to track and correct them.",
          "For a distance-d surface code, the logical error rate scales as (p/p_th)^((d+1)/2), where p is the physical error rate and p_th is the threshold (~1%). At p=0.1%, a distance-25 code (requiring 625 physical qubits per logical qubit) achieves logical error rate <10^-15. This enables reliable computation with many sequential gate operations.",
        ],
        codeExample: {
          label: "Surface Code overhead — physical qubits per logical qubit",
          code: `# Surface Code overhead at various physical error rates
# Logical error rate target: < 10^-15 (for reliable Shor's Algorithm)

Physical Error Rate | Code Distance | Physical/Logical | Notes
0.1%  (current SOTA)| d=25          | 625              | ~4M total for RSA-2048
0.01% (near-term)   | d=15          | 225              | ~1M total for RSA-2048
0.001%(far-term)    | d=9           | 81               | ~330K total for RSA-2048

# Google Willow (2024): p < p_th demonstrated
# IBM roadmap: 100K physical qubits by 2033
# With d=25: 100K physical ÷ 625 = 160 logical qubits
# RSA-2048 needs 4096 logical → still need ~2.6M physical

# Key insight: we need both lower error rates AND more qubits
# Willow proves below-threshold is achievable — now scale it`,
        },
      },
      incident: {
        title: "Google Willow — Below-Threshold Error Correction Milestone",
        when: "December 2024",
        where: "Google Quantum AI, Santa Barbara",
        impact: "Proved feasibility of fault-tolerant QC; accelerated CRQC timeline estimates",
        body: [
          "Google's Willow processor demonstrated that increasing the surface code distance (adding more error-correction qubits) actually exponentially reduced the logical error rate — the defining characteristic of 'below-threshold' operation. For the first time, every qubit added to the error correction lattice made the computation more reliable rather than less.",
          "This milestone matters for cybersecurity because it removes a key uncertainty: we now know that fault-tolerant quantum computing is not just theoretically possible but practically achievable with current fabrication techniques. The remaining challenge is scale — building millions of qubits with Willow-class fidelity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Physical Qubits", sub: "~0.1% error per gate — fragile", type: "system" },
          { label: "Surface Code QEC", sub: "1000 physical → 1 logical qubit", type: "attacker" },
          { label: "Logical Qubit", sub: "<10^-15 error rate — reliable", type: "victim" },
          { label: "Fault-Tolerant QC", sub: "Shor's Algorithm runs reliably", type: "result" },
        ],
      },
      timeline: [
        { year: 1995, event: "Peter Shor proposes first quantum error correction code" },
        { year: 1997, event: "Surface Code proposed as scalable QEC architecture" },
        { year: 2022, event: "Google demonstrates exponential error suppression with surface code" },
        { year: 2024, event: "Google Willow — below-threshold QEC confirmed at scale", highlight: true },
        { year: 2030, event: "Projected: fault-tolerant QC with millions of qubits" },
      ],
      keyTakeaways: [
        "QEC is the primary engineering barrier between NISQ and CRQC — Willow shows it's solvable",
        "Surface Code requires ~1000 physical qubits per logical qubit at current error rates",
        "Below-threshold operation (Willow, 2024) proves fault-tolerant QC is achievable — now scale",
        "CRQC timeline uncertainty has narrowed: 2030-2035 is more confident now than 2 years ago",
      ],
      references: [
        { title: "Google Willow: Below-threshold surface code (Nature, 2024)", url: "https://www.nature.com/articles/s41586-024-08449-y" },
        { title: "Introduction to Quantum Error Correction — Caltech", url: "https://www.theory.caltech.edu/~preskill/ph229/" },
      ],
    },
    ctf: {
      scenario: "Calculate the surface code requirements for a CRQC capable of running Shor's on RSA-2048. Use the current Willow error rates to determine the physical qubit count needed.",
      hint: "Use the surface code calculator with Willow's error rate, then determine how many physical qubits are needed for 4096 logical qubits.",
      hints: [
        "Read the QEC brief. Run: cat qec-brief.txt",
        "Calculate the surface code distance needed at Willow's error rate. Run: surface-code-calc 0.001",
        "Determine total physical qubits for CRQC scale. Run: crqc-scale RSA-2048",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/qec-brief.txt", value: "FLAG{QEC_", label: "QEC Brief — Surface Code Architecture" },
        { trigger: "surface-code-calc 0.001", value: "SURF4CE_CODE_", label: "Distance Calculated — Overhead Determined" },
        { trigger: "crqc-scale RSA-2048", value: "CR0C_SC4LE}", label: "Physical Qubit Count — CRQC Scale Requirements" },
      ],
      files: {
        "/qec-brief.txt": [
          "QUANTUM ERROR CORRECTION BRIEF",
          "Architecture: Surface Code",
          "Target logical error rate: < 10^-15",
          "Willow physical error rate: ~0.001% (below threshold)",
          "",
          "Task: calculate CRQC physical qubit requirements.",
          "Sequence: surface-code-calc → crqc-scale → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "qec-brief.txt", isDir: false }] },
      extraCommands: {
        "surface-code-calc": (_args: string[]) => ({
          lines: [
            "Surface code calculation at p=0.001% (Willow class):",
            "  Threshold p_th = 1%",
            "  Required code distance: d=9 (logical error < 10^-15)",
            "  Physical qubits per logical: d² + (d-1)² = 81 + 64 = 145",
            "  At Willow error rates: ~145 physical per logical qubit",
          ],
        }),
        "crqc-scale": (_args: string[]) => ({
          lines: [
            "CRQC scale for RSA-2048 (Shor's Algorithm):",
            "  Logical qubits needed: 4096",
            "  Physical/logical (Willow class, d=9): ~145",
            "  Total physical qubits: 4096 × 145 = ~594,000",
            "  IBM 2033 target: 100,000 qubits → not quite there",
            "  CRQC at Willow fidelity: ~600K physical qubits",
            "  Estimated availability: 2032-2036",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-08: Quantum Threat Assessment ──────────────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "CISA Cybersecurity Division", location: "Arlington, Virginia, USA", era: "2024 CE", emoji: "🛡️" },
    id: "quantum-08",
    order: 8,
    title: "The Quantum Threat Register",
    subtitle: "Organizational Quantum Risk Assessment Framework",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-risk", name: "Quantum Risk Analyst", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "Before migrating to post-quantum cryptography, organizations must assess which data and systems are at risk and in what timeframe.",
      year: 2024,
      overview: [
        "Not all cryptographic assets face the same quantum risk. The quantum threat is calibrated by two timelines: (1) when a CRQC becomes available (the 'Q-Day' timeline, estimated 2030-2035) and (2) how long the data or system needs to remain secure (the 'data sensitivity lifetime'). Data that must remain secret for 20 years and is encrypted today with RSA is immediately at risk from HNDL.",
        "CISA's Quantum Readiness Roadmap (2023) provides a framework for organizational assessment: inventory cryptographic assets, classify by data sensitivity lifetime, identify harvest-now-decrypt-later exposure, and prioritize migration based on risk.",
        "The key insight is that long-lived sensitive data (government secrets, medical records, intellectual property) requires immediate migration attention, while short-lived data (session tokens, streaming video encryption) has more time. A graduated migration based on risk avoids the paralysis of trying to migrate everything at once.",
      ],
      technical: {
        title: "Quantum Risk Matrix — Data Lifetime vs. CRQC Timeline",
        body: [
          "Risk = f(Data sensitivity lifetime, CRQC arrival time, HNDL exposure). For each cryptographic asset: if (data sensitivity lifetime + current year) > estimated Q-Day year, the asset is at risk from HNDL. If the asset is internet-facing, assume HNDL exposure is already occurring.",
          "Priority tiers: P1 (migrate immediately) — classified data, long-lived secrets, critical infrastructure; P2 (migrate within 2 years) — medical records, financial records, IP; P3 (migrate within 5 years) — general enterprise data; P4 (migrate by Q-Day) — short-lived session data.",
        ],
        codeExample: {
          label: "Quantum risk assessment — data sensitivity lifetime calculator",
          code: `# Quantum threat assessment model
def quantum_risk(asset, sensitivity_years, is_internet_facing, q_day_year=2033):
    current_year = 2024
    exposure_year = current_year + sensitivity_years
    hndl_risk = is_internet_facing and (exposure_year > q_day_year)
    direct_risk = exposure_year > q_day_year

    if hndl_risk:
        return "CRITICAL — migrate RSA/ECC immediately"
    elif direct_risk:
        return "HIGH — migrate within 2 years"
    else:
        return "MEDIUM — migrate before Q-Day"

# Example assessments:
print(quantum_risk("classified_comms", 30, True))   # CRITICAL
print(quantum_risk("patient_records", 50, True))    # CRITICAL
print(quantum_risk("financial_data", 7, True))      # CRITICAL (7+2024=2031>2033? borderline)
print(quantum_risk("session_tokens", 0.001, False)) # MEDIUM`,
        },
      },
      incident: {
        title: "CISA Quantum Readiness Roadmap — Organizational Guidance",
        when: "August 2023",
        where: "All US federal agencies and critical infrastructure operators",
        impact: "Federal agencies required to complete crypto inventory and begin migration planning",
        body: [
          "CISA's 2023 Quantum Readiness Roadmap mandated that all federal agencies: (1) conduct a comprehensive cryptographic inventory within 6 months, (2) identify systems using RSA and ECC, (3) assess HNDL exposure for high-sensitivity data, and (4) submit a post-quantum migration plan. The roadmap was extended to critical infrastructure operators via CISA advisories.",
          "The practical challenge for most organizations is step 1: inventory. Modern enterprise IT has cryptography embedded in hundreds of products — TLS in web servers, SSH in management tools, RSA in certificate authorities, ECDH in VPN solutions, code signing in CI/CD pipelines. Discovering all of these without purpose-built tooling is a significant operational challenge.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Crypto Inventory", sub: "all RSA/ECC assets discovered", type: "system" },
          { label: "Sensitivity Lifetime Assessment", sub: "data value × retention period", type: "attacker" },
          { label: "HNDL Exposure Analysis", sub: "internet-facing = immediate harvest risk", type: "victim" },
          { label: "Prioritized Migration Plan", sub: "P1→P2→P3→P4 by risk", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "NSA CNSA 2.0 — post-quantum migration mandate for NSS" },
        { year: 2023, event: "CISA Quantum Readiness Roadmap published for all federal agencies", highlight: true },
        { year: 2024, event: "NIST FIPS 203/204/205 published — PQC algorithms standardized" },
        { year: 2027, event: "Target: federal agencies complete priority crypto migration" },
        { year: 2035, event: "NSA deadline: all NSS fully migrated to CNSA 2.0 algorithms" },
      ],
      keyTakeaways: [
        "Start with crypto inventory: you can't migrate what you haven't found",
        "Classify assets by data sensitivity lifetime to prioritize migration order",
        "Internet-facing RSA/ECC systems have immediate HNDL exposure — migrate first",
        "CISA's Quantum Readiness Roadmap provides a structured, government-validated framework",
      ],
      references: [
        { title: "CISA: Quantum Readiness Roadmap", url: "https://www.cisa.gov/sites/default/files/2023-11/CISA_Quantum_Readiness_Roadmap_508c.pdf" },
        { title: "NSA: CNSA Suite 2.0 FAQ", url: "https://media.defense.gov/2022/Jan/05/2002874594/-1/-1/0/IF-QUANTUM-CRYPTOGRAPHY-FAQ-20220104.PDF" },
      ],
    },
    ctf: {
      scenario: "Run a quantum threat assessment for a healthcare organization using the CISA framework. Inventory the cryptographic assets, classify sensitivity lifetimes, and generate a prioritized migration plan.",
      hint: "Scan the crypto inventory, apply the sensitivity lifetime model, and generate the migration priority report.",
      hints: [
        "Read the assessment framework. Run: cat cisa-framework.txt",
        "Run the cryptographic asset inventory scan. Run: crypto-inventory",
        "Generate the quantum risk classification and migration priorities. Run: quantum-risk-report",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/cisa-framework.txt", value: "FLAG{QUANTUM_", label: "CISA Framework — Quantum Risk Assessment Guide" },
        { trigger: "crypto-inventory", value: "RISK_CISA_", label: "Crypto Inventory — 47 RSA/ECC Assets Found" },
        { trigger: "quantum-risk-report", value: "MIGR4TION_PLAN}", label: "Risk Report — P1 Assets Require Immediate Migration" },
      ],
      files: {
        "/cisa-framework.txt": [
          "CISA QUANTUM READINESS FRAMEWORK",
          "Organization: Regional Healthcare Network",
          "Data types: patient records (retention: 50 years), billing (7 years)",
          "Internet-facing systems: patient portal TLS, API gateway, email",
          "",
          "Sequence: crypto-inventory → quantum-risk-report → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "cisa-framework.txt", isDir: false }] },
      extraCommands: {
        "crypto-inventory": (_args: string[]) => ({
          lines: [
            "Scanning enterprise for RSA/ECC cryptographic assets...",
            "Found 47 assets using RSA-2048 or ECDH:",
            "  Patient Portal TLS: RSA-2048 (internet-facing) — P1",
            "  EHR API: ECDH P-256 (internet-facing) — P1",
            "  Internal CA: RSA-4096 — P2",
            "  Email encryption: RSA-2048 (external) — P1",
            "  Disk encryption: AES-128 — upgrade to AES-256",
          ],
        }),
        "quantum-risk-report": (_args: string[]) => ({
          lines: [
            "Quantum Risk Classification — Healthcare Network:",
            "  P1 (Migrate IMMEDIATELY): 12 systems — internet-facing RSA/ECDH",
            "    Patient data retention 50 years → HNDL exposure = CRITICAL",
            "  P2 (Migrate within 2 years): 8 systems — internal CA, billing",
            "  P3 (Migrate within 5 years): 27 systems — internal services",
            "  Recommended: Deploy CRYSTALS-Kyber for all key exchange",
            "  Recommended: ML-DSA for signatures, AES-256 for symmetric",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-09: Quantum Random Number Generation ───────────────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "ANU Quantum Optics Lab", location: "Canberra, Australia", era: "2024 CE", emoji: "🎲" },
    id: "quantum-09",
    order: 9,
    title: "True Randomness",
    subtitle: "Quantum Random Number Generation — Seeding Cryptographic Security",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-qrng", name: "Quantum Randomizer", emoji: "🎲" },
    challengeType: "ctf",
    info: {
      tagline: "Cryptographic security depends on unpredictable randomness — quantum mechanics provides the only true source of random numbers.",
      year: 2024,
      overview: [
        "All cryptographic key generation, nonce selection, and initialization vector creation depends on high-quality random numbers. Classical pseudorandom number generators (PRNGs) are deterministic — given the same seed, they produce identical output. Cryptographically Secure PRNGs (CSPRNGs) use entropy sources (hardware noise, OS events) to produce unpredictable output, but they are ultimately bounded by the quality and quantity of that entropy.",
        "Quantum Random Number Generators (QRNGs) exploit the fundamentally non-deterministic nature of quantum measurements. When a single photon is directed at a 50/50 beam splitter and detected at one of two detectors, the outcome is genuinely random — not pseudo-random — with perfect 50/50 probability and no hidden variables.",
        "As quantum computing and quantum networking mature, QRNGs will become the gold standard for cryptographic key material. Several commercial QRNGs are already available (ID Quantique, ANU QRNG), and cloud-based QRNG services are emerging.",
      ],
      technical: {
        title: "How Quantum Random Number Generators Work",
        body: [
          "The simplest QRNG uses a single photon source and a beam splitter. A photon in superposition of horizontal/vertical polarization is measured — quantum mechanics guarantees the outcome is perfectly random with no classical correlation to any prior state. Faster QRNGs use vacuum fluctuations or photon arrival timing.",
          "QRNGs provide continuous entropy with certified randomness — unlike hardware entropy sources that may be influenced by system load, temperature, or (in attack scenarios) adversarial manipulation. For high-security applications (key generation for long-lived secrets, certificate authorities), QRNG is the recommended entropy source.",
        ],
        codeExample: {
          label: "Using ANU QRNG API for cryptographic key generation",
          code: `import requests
import secrets

# ANU Quantum Random Number Generator API
# Uses quantum vacuum fluctuations for true randomness

def get_quantum_random_bytes(n_bytes: int) -> bytes:
    """Fetch truly random bytes from ANU QRNG API."""
    url = "https://qrng.anu.edu.au/API/jsonI.php"
    params = {"length": n_bytes, "type": "uint8"}
    response = requests.get(url, params=params)
    data = response.json()
    return bytes(data["data"])

# Generate a 256-bit (32-byte) AES key using QRNG
quantum_key = get_quantum_random_bytes(32)
print(f"Quantum AES-256 key: {quantum_key.hex()}")

# For local fallback: Python secrets module (CSPRNG)
fallback_key = secrets.token_bytes(32)
# secrets.token_bytes uses OS CSPRNG (/dev/urandom on Linux)`,
        },
      },
      incident: {
        title: "Dual EC DRBG Backdoor — Why Entropy Source Trust Matters",
        when: "2006–2013 (disclosed by Snowden 2013)",
        where: "NIST standard DRBG used in RSA BSAFE and commercial security products",
        impact: "NSA-backdoored PRNG in security products; private keys potentially predictable",
        body: [
          "In 2006, NIST standardized Dual Elliptic Curve Deterministic Random Bit Generator (Dual EC DRBG). In 2013, Snowden documents revealed that the NSA had inserted a backdoor into Dual EC DRBG: they chose constants for two elliptic curve points (P and Q) where they knew the discrete log relationship between them. Anyone who knew this relationship could predict all PRNG output from a short observation.",
          "RSA Security had received $10 million from the NSA to make Dual EC DRBG the default in BSAFE — a widely used cryptographic library. The incident illustrates why QRNG and hardware entropy source provenance matters: adversaries can compromise randomness at the source, making all derived cryptographic keys predictable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CSPRNG", sub: "deterministic — seed-dependent, predictable if seeded poorly", type: "system" },
          { label: "QRNG (photon/vacuum)", sub: "quantum measurement — genuinely non-deterministic", type: "attacker" },
          { label: "Cryptographic Keys", sub: "security depends on entropy quality", type: "victim" },
          { label: "QRNG Keys", sub: "unpredictable even to the key generator", type: "result" },
        ],
      },
      timeline: [
        { year: 2006, event: "NIST standardizes Dual EC DRBG — NSA backdoor inserted" },
        { year: 2007, event: "Cryptographers publicly note suspicious Dual EC DRBG constants" },
        { year: 2013, event: "Snowden documents confirm NSA backdoor in Dual EC DRBG", highlight: true },
        { year: 2014, event: "NIST withdraws Dual EC DRBG from all standards" },
        { year: 2024, event: "Commercial QRNGs widely available; cloud QRNG services emerge" },
      ],
      keyTakeaways: [
        "Classical PRNGs are deterministic — seed quality and algorithm integrity are attack surfaces",
        "QRNG provides fundamentally unpredictable entropy certified by physics",
        "The Dual EC backdoor shows adversaries target entropy sources — audit your PRNG stack",
        "Use /dev/urandom (Linux) or CryptGenRandom (Windows) minimum; QRNG for high-security key generation",
      ],
      references: [
        { title: "ANU Quantum Random Number Generator", url: "https://qrng.anu.edu.au/" },
        { title: "Dual EC DRBG Backdoor Analysis — Matthew Green", url: "https://blog.cryptographyengineering.com/2013/09/18/the-many-flaws-of-dual-ec-drbg/" },
      ],
    },
    ctf: {
      scenario: "A cryptographic library was found using Dual EC DRBG with suspicious constants. Demonstrate the backdoor prediction attack, then replace it with a QRNG-seeded key generation system.",
      hint: "Use the Dual EC predictor to predict PRNG output, then demonstrate the QRNG alternative.",
      hints: [
        "Read the backdoor analysis. Run: cat dual-ec-analysis.txt",
        "Predict PRNG output using the known backdoor relationship. Run: dual-ec-predict",
        "Generate a replacement key using QRNG. Run: qrng-keygen 256",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/dual-ec-analysis.txt", value: "FLAG{DUAL_EC_", label: "Analysis — Dual EC Backdoor Constants Identified" },
        { trigger: "dual-ec-predict", value: "BACKD00R_QRNG_", label: "PRNG Output Predicted — Backdoor Confirmed" },
        { trigger: "qrng-keygen 256", value: "TRUE_RAND}", label: "QRNG Key Generated — Genuine Quantum Randomness" },
      ],
      files: {
        "/dual-ec-analysis.txt": [
          "DUAL EC DRBG BACKDOOR ANALYSIS",
          "Constants P and Q: NSA-chosen (discrete log known to NSA)",
          "Effect: 32 bytes of PRNG output allows full state recovery",
          "Impact: all keys generated with this PRNG are predictable",
          "",
          "Task: demonstrate prediction, then deploy QRNG replacement.",
          "Sequence: dual-ec-predict → qrng-keygen → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "dual-ec-analysis.txt", isDir: false }] },
      extraCommands: {
        "dual-ec-predict": (_args: string[]) => ({
          lines: [
            "Dual EC DRBG backdoor attack:",
            "  Observing 32 bytes of PRNG output: 3f8a2b1c4d5e...",
            "  Using NSA's secret d: Q = d·P (discrete log known)",
            "  Recovering internal state from 32-byte observation...",
            "  Internal state recovered in 2^16 operations (trivial)",
            "  Predicting next 1000 bytes of PRNG output: CONFIRMED",
            "All keys generated by this library are COMPROMISED.",
          ],
        }),
        "qrng-keygen": (_args: string[]) => ({
          lines: [
            "Fetching 256-bit key from ANU Quantum RNG API...",
            "Source: quantum vacuum fluctuations (genuinely non-deterministic)",
            "Key material: a3f2b8c1d4e5f6a7b8c9d0e1f2a3b4c5...",
            "Certification: NIST SP 800-90B compliant entropy source",
            "Prediction probability for any single bit: exactly 1/2",
            "No hidden variables. No backdoor possible. Certified quantum random.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-10: Quantum Computing Timeline and Migration ───────────────────
  {
    epochId: "quantum-1",
    wonder: { name: "Five Eyes Intelligence Community HQ", location: "Cheltenham, United Kingdom", era: "2024 CE", emoji: "👁️" },
    id: "quantum-10",
    order: 10,
    title: "Q-Day Countdown",
    subtitle: "Quantum Computing Timeline — When to Act and How",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-q-timeline", name: "Q-Day Prepper", emoji: "👁️" },
    challengeType: "ctf",
    info: {
      tagline: "The quantum threat timeline is the most important unknown in cybersecurity — and the window to prepare is closing.",
      year: 2024,
      overview: [
        "Intelligence agencies, quantum computing companies, and academic researchers provide widely varying estimates for when a Cryptographically Relevant Quantum Computer (CRQC) will exist: anywhere from 5 to 30 years. The Five Eyes intelligence community (US, UK, Canada, Australia, New Zealand) has converged on a planning horizon of 2030-2035 for classified systems.",
        "The key insight for security planners is that it doesn't matter when exactly Q-Day arrives — what matters is whether your migration will be complete before it does. Enterprise cryptographic migrations take 3-7 years. NIST published the first PQC standards in August 2024. Organizations that start migration in 2024 can realistically complete by 2030-2031. Organizations that start in 2027 cannot.",
        "This final Quantum Foundations stage synthesizes the complete threat picture and provides the decision framework for beginning post-quantum migration. After this stage, Epoch 4b covers the specific post-quantum algorithms, and Epoch 4c covers QKD and enterprise migration execution.",
      ],
      technical: {
        title: "PQC Migration Decision Framework",
        body: [
          "The migration decision is driven by: (1) data sensitivity lifetime — how long does the data need to remain confidential? (2) HNDL exposure — is this data being transmitted over internet-facing infrastructure where adversaries can collect it today? (3) migration timeline — how long will it take to update this system?",
          "NIST's 2024 timeline recommendation: organizations should plan to migrate from quantum-vulnerable algorithms by 2030 (for high-sensitivity data) and complete all migrations by 2035. Given typical enterprise migration timelines, beginning in 2024-2025 is necessary to meet the 2030 target.",
        ],
        codeExample: {
          label: "PQC migration timeline — algorithm deprecation schedule",
          code: `# NIST and NSA algorithm deprecation timeline

Algorithm           Deprecated By  Disallowed By  Replacement
-----------         ------------   ------------   -----------
RSA (any key size)  2030           2035           ML-KEM (CRYSTALS-Kyber)
ECDH / ECDSA        2030           2035           ML-KEM / ML-DSA (Dilithium)
DH (any group)      2030           2035           ML-KEM
AES-128             2030           2035           AES-256
SHA-256             2030 (signing) 2035           SHA-384
SHA-1               IMMEDIATE      IMMEDIATE      SHA-384
3DES                IMMEDIATE      IMMEDIATE      AES-256

# PQC Algorithms (NIST FIPS 2024):
# FIPS 203: ML-KEM (CRYSTALS-Kyber) — key encapsulation
# FIPS 204: ML-DSA (CRYSTALS-Dilithium) — digital signatures
# FIPS 205: SLH-DSA (SPHINCS+) — stateless hash-based signatures`,
        },
      },
      incident: {
        title: "Five Eyes Joint Advisory — Post-Quantum Cryptography Guidance",
        when: "2023–2024",
        where: "US, UK, Canada, Australia, New Zealand — all critical infrastructure operators",
        impact: "Unified Five Eyes guidance creates global baseline for PQC migration planning",
        body: [
          "In 2023-2024, the Five Eyes intelligence community issued joint advisories on post-quantum cryptography, representing the most significant collective intelligence agency guidance on any technical topic since the SSL/TLS transition. The joint guidance unified migration timelines, algorithm recommendations, and threat assessments across all Five Eyes nations.",
          "The unified message: begin post-quantum migration immediately, prioritizing internet-facing systems handling long-lived sensitive data. The specificity of the guidance — naming particular algorithms (CRYSTALS-Kyber, Dilithium), naming specific deprecation years (2030-2035), and explicitly warning about HNDL — reflects intelligence community access to adversary quantum capabilities.",
        ],
      },
      diagram: {
        nodes: [
          { label: "2024", sub: "NIST FIPS 203/204/205 published — begin migration", type: "system" },
          { label: "2027-2030", sub: "P1/P2 systems migrated — HNDL protection achieved", type: "attacker" },
          { label: "2030-2033", sub: "Q-Day risk window — CRQC may emerge", type: "victim" },
          { label: "2035", sub: "NSA mandate: all NSS fully on PQC algorithms", type: "result" },
        ],
      },
      timeline: [
        { year: 2024, event: "NIST publishes FIPS 203/204/205 — PQC algorithms standardized", highlight: true },
        { year: 2024, event: "Five Eyes joint advisory — unified PQC migration guidance" },
        { year: 2027, event: "Target: all P1 (highest-sensitivity) systems migrated" },
        { year: 2030, event: "NSA algorithm deprecation begins — RSA/ECC phase-out" },
        { year: 2033, event: "IBM quantum roadmap: 100K+ qubit system — CRQC proximity" },
        { year: 2035, event: "NSA mandate: all NSS on CNSA 2.0 (PQC) algorithms only" },
      ],
      keyTakeaways: [
        "Migration takes 3-7 years — organizations starting in 2024 can meet the 2030 P1 target",
        "NIST FIPS 203/204/205 (2024) provide the standardized algorithms — start implementing now",
        "The Five Eyes guidance is the most credible threat assessment available — treat 2030 as your deadline",
        "Post-quantum migration is not optional: NSA will disallow RSA/ECC in classified systems by 2035",
      ],
      references: [
        { title: "NIST FIPS 203 (ML-KEM)", url: "https://csrc.nist.gov/pubs/fips/203/final" },
        { title: "CISA: Post-Quantum Cryptography Roadmap", url: "https://www.cisa.gov/quantum" },
        { title: "Five Eyes: Quantum Readiness Advisory", url: "https://www.cisa.gov/sites/default/files/2023-12/joint-advisory-quantum-readiness.pdf" },
      ],
    },
    ctf: {
      scenario: "Brief the CISO on the complete quantum threat picture: CRQC timeline, algorithm deprecation schedule, and migration priorities for your organization. Generate the executive quantum readiness report.",
      hint: "Query the current threat intelligence, check the deprecation schedule, and generate the CISO brief.",
      hints: [
        "Read the executive brief template. Run: cat ciso-template.txt",
        "Pull the latest quantum threat intelligence summary. Run: quantum-intel-brief",
        "Generate the complete CISO quantum readiness report. Run: ciso-quantum-report",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/ciso-template.txt", value: "FLAG{QDAY_", label: "CISO Template — Executive Quantum Brief Format" },
        { trigger: "quantum-intel-brief", value: "C0UNTDOWN_MIGRATE_", label: "Intel Brief — Five Eyes Timeline Confirmed" },
        { trigger: "ciso-quantum-report", value: "NOW_FIPS203}", label: "CISO Report — Migration Roadmap Generated" },
      ],
      files: {
        "/ciso-template.txt": [
          "CISO QUANTUM READINESS BRIEF TEMPLATE",
          "Required sections: threat timeline, asset risk, migration priorities",
          "Audience: C-suite + board",
          "",
          "Generate complete quantum readiness report for executive review.",
          "Sequence: quantum-intel-brief → ciso-quantum-report → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "ciso-template.txt", isDir: false }] },
      extraCommands: {
        "quantum-intel-brief": (_args: string[]) => ({
          lines: [
            "QUANTUM THREAT INTELLIGENCE SUMMARY (2024):",
            "  CRQC timeline: 2030-2035 (Five Eyes consensus)",
            "  Current NISQ state: 1000+ physical qubits, NISQ era",
            "  Google Willow: below-threshold QEC — milestone achieved",
            "  HNDL: active — nation-states collecting encrypted traffic NOW",
            "  NIST standards: FIPS 203/204/205 published August 2024",
            "  NSA deprecation: RSA/ECC disallowed by 2035 for NSS",
          ],
        }),
        "ciso-quantum-report": (_args: string[]) => ({
          lines: [
            "QUANTUM READINESS REPORT — EXECUTIVE SUMMARY",
            "Risk Level: CRITICAL (HNDL exposure on internet-facing systems)",
            "Recommendation: Begin PQC migration immediately",
            "Priority 1 (2024-2025): Replace RSA key exchange with ML-KEM",
            "Priority 2 (2025-2027): Replace ECDSA signatures with ML-DSA",
            "Priority 3 (2027-2030): Full enterprise PQC deployment",
            "Budget implication: equivalent to major TLS 1.2→1.3 migration",
            "Fragment collected. Report ready for board presentation.",
          ],
        }),
      },
    },
  },
];
