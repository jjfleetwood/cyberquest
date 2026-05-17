import type { StageConfig, EpochConfig } from "./types";

export const quantum2Epoch: EpochConfig = {
  id: "quantum-2",
  name: "4b. Post-Quantum Cryptography",
  subtitle: "NIST PQC Standards & Implementation",
  description: "Master the post-quantum cryptography standards that will replace RSA and ECC — CRYSTALS-Kyber (ML-KEM), CRYSTALS-Dilithium (ML-DSA), FALCON (FN-DSA), and SPHINCS+ (SLH-DSA). Learn the mathematics behind lattice-based cryptography and implement PQC in real systems.",
  emoji: "🔐",
  color: "teal",
  unlocked: true,
};

export const quantum2Stages: StageConfig[] = [
  // ─── quantum-b01: NIST PQC Standardization ──────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "NIST Computer Security Division", location: "Gaithersburg, Maryland, USA", era: "2024 CE", emoji: "📜" },
    id: "quantum-b01",
    order: 1,
    title: "The NIST PQC Race",
    subtitle: "NIST Post-Quantum Standardization — 8 Years, 69 Submissions, 4 Winners",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-nist", name: "PQC Standardizer", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "NIST's 8-year post-quantum cryptography competition produced the algorithms that will secure the internet for the next century.",
      year: 2024,
      overview: [
        "In 2016, NIST launched its Post-Quantum Cryptography Standardization project — an open competition to identify and standardize cryptographic algorithms resistant to quantum computers. 69 algorithms were submitted from research teams worldwide. After 3 rounds of public analysis, cryptanalysis, and performance evaluation, NIST selected 4 algorithms for standardization.",
        "In August 2024, NIST published the first PQC standards: FIPS 203 (ML-KEM, based on CRYSTALS-Kyber), FIPS 204 (ML-DSA, based on CRYSTALS-Dilithium), and FIPS 205 (SLH-DSA, based on SPHINCS+). FALCON (FN-DSA) will be standardized separately. These algorithms are now the mandatory replacements for RSA and ECC in all US federal systems.",
        "The 8-year standardization process was unusually transparent — all submissions, cryptanalysis reports, and evaluation criteria were published publicly. Several submitted algorithms were broken during the process (Rainbow, SIDH/SIKE), validating the competitive process. The surviving algorithms have been extensively analyzed by the world's cryptographic community.",
      ],
      technical: {
        title: "NIST PQC Algorithm Families",
        body: [
          "The winning algorithms fall into three mathematical families: (1) Lattice-based: ML-KEM and ML-DSA rely on the hardness of lattice problems (Learning With Errors, Module-LWE) — believed resistant to both classical and quantum attacks; (2) Hash-based: SLH-DSA relies only on the collision resistance of hash functions — minimal security assumptions; (3) Code-based: HQC is being evaluated as an alternate KEM.",
          "Each family has different performance characteristics. Lattice-based algorithms are fastest but have larger key/signature sizes than classical algorithms. Hash-based signatures (SPHINCS+) are slower but have the most conservative security assumptions. The selection provides diversity against future cryptanalytic breakthroughs.",
        ],
        codeExample: {
          label: "NIST PQC algorithm comparison — key sizes and performance",
          code: `# NIST PQC Algorithm Comparison (vs RSA-2048 baseline)

Algorithm   Type        Pub Key    Priv Key   Sig/Cipher  Speed
---------   ----        -------    --------   ----------  -----
RSA-2048    Asym (KEM)  256 bytes  1216 bytes 256 bytes   Baseline
ECDSA-256   Sig         64 bytes   32 bytes   64 bytes    Fast

ML-KEM-768  KEM         1184 bytes 2400 bytes 1088 bytes  2-3x RSA
ML-KEM-1024 KEM         1568 bytes 3168 bytes 1568 bytes  2-3x RSA
ML-DSA-44   Sig         1312 bytes 2528 bytes 2420 bytes  4-5x ECDSA
ML-DSA-65   Sig         1952 bytes 4000 bytes 3293 bytes  4-5x ECDSA
FN-DSA-512  Sig         897 bytes  1281 bytes 666 bytes   ~ECDSA
SLH-DSA-128 Sig         32 bytes   64 bytes   7856 bytes  100x slower

# Key insight:
# - ML-KEM: drop-in RSA replacement for key exchange
# - ML-DSA: drop-in ECDSA replacement for signatures
# - FN-DSA: compact signatures, complex implementation
# - SLH-DSA: conservative choice — large sigs, simple security assumptions`,
        },
      },
      incident: {
        title: "SIKE/SIDH Broken in 1 Hour — Why Competition Matters",
        when: "July 2022",
        where: "NIST PQC Round 4 finalist SIKE/SIDH",
        impact: "Round 4 finalist broken by a single researcher on a laptop — validates NIST's competitive process",
        body: [
          "In July 2022, Microsoft researcher Wouter Castryck and Thomas Decru broke SIKE (Supersingular Isogeny Key Encapsulation) — a NIST Round 4 finalist — in about 1 hour using a single laptop and a mathematical technique from the 1990s. SIKE had been one of the most promising PQC candidates and had survived years of public scrutiny.",
          "This dramatic cryptanalysis validated the NIST competition model: public analysis over years is the only way to build confidence in new cryptographic algorithms. It also illustrates why the winning algorithms' multiple mathematical approaches provide resilience — if lattice problems were broken tomorrow, hash-based SLH-DSA would still stand.",
        ],
      },
      diagram: {
        nodes: [
          { label: "2016: 69 Submissions", sub: "global competition launched", type: "system" },
          { label: "2022: Round 4 (SIKE broken)", sub: "public analysis validates process", type: "attacker" },
          { label: "2024: FIPS 203/204/205", sub: "first PQC standards published", type: "victim" },
          { label: "2035: RSA Fully Retired", sub: "mandatory NSS migration complete", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "NIST launches PQC standardization — 69 submissions received" },
        { year: 2022, event: "SIKE/SIDH broken in 1 hour — Round 4 finalist eliminated", highlight: true },
        { year: 2022, event: "NIST announces initial algorithm selections: Kyber, Dilithium, Falcon, SPHINCS+" },
        { year: 2024, event: "NIST publishes FIPS 203, 204, 205 — first official PQC standards" },
        { year: 2035, event: "NSA deadline: RSA/ECC fully retired from NSS" },
      ],
      keyTakeaways: [
        "FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA) are the standardized PQC algorithms — use them",
        "Public competition over 8 years built the cryptographic community's confidence in these algorithms",
        "SIKE's failure demonstrates that new algorithms must be openly analyzed before deployment",
        "Algorithm diversity (lattice + hash-based) provides resilience against future cryptanalytic breakthroughs",
      ],
      references: [
        { title: "NIST FIPS 203 (ML-KEM)", url: "https://csrc.nist.gov/pubs/fips/203/final" },
        { title: "NIST FIPS 204 (ML-DSA)", url: "https://csrc.nist.gov/pubs/fips/204/final" },
        { title: "NIST FIPS 205 (SLH-DSA)", url: "https://csrc.nist.gov/pubs/fips/205/final" },
      ],
    },
    ctf: {
      scenario: "Navigate the NIST PQC standardization database, identify the winning algorithms, and verify the mathematical security families they belong to.",
      hint: "Query the NIST PQC database for each finalist, their algorithm families, and security assumptions.",
      hints: [
        "Read the standardization brief. Run: cat pqc-standards.txt",
        "Query the NIST PQC algorithm database. Run: nist-pqc-query",
        "Verify the security assumptions for each winning algorithm. Run: security-assumptions",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/pqc-standards.txt", value: "FLAG{NIST_PQC_", label: "Standards Brief — FIPS 203/204/205 Overview" },
        { trigger: "nist-pqc-query", value: "FIPS203_ML_", label: "Database Query — Winning Algorithms Identified" },
        { trigger: "security-assumptions", value: "KEM_LATTICE}", label: "Security Verified — Lattice + Hash-Based Confirmed" },
      ],
      files: {
        "/pqc-standards.txt": [
          "NIST PQC STANDARDIZATION BRIEF",
          "FIPS 203: ML-KEM (CRYSTALS-Kyber) — key encapsulation",
          "FIPS 204: ML-DSA (CRYSTALS-Dilithium) — digital signatures",
          "FIPS 205: SLH-DSA (SPHINCS+) — hash-based signatures",
          "Pending: FN-DSA (FALCON) — fast-Fourier signatures",
          "",
          "Sequence: nist-pqc-query → security-assumptions → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "pqc-standards.txt", isDir: false }] },
      extraCommands: {
        "nist-pqc-query": (_args: string[]) => ({
          lines: [
            "NIST PQC Algorithm Database:",
            "  FIPS 203: ML-KEM (Module Lattice KEM) — published Aug 13, 2024",
            "  FIPS 204: ML-DSA (Module Lattice DSA) — published Aug 13, 2024",
            "  FIPS 205: SLH-DSA (Stateless LH DSA) — published Aug 13, 2024",
            "  Pending: FN-DSA (Falcon NTRU-based) — in draft",
            "Submissions: 69 → Round 4 finalists: 4 → Standards: 3 (+ 1 pending)",
          ],
        }),
        "security-assumptions": (_args: string[]) => ({
          lines: [
            "Security assumption analysis:",
            "  ML-KEM: hardness of Module-LWE problem (lattice — quantum-resistant)",
            "  ML-DSA: hardness of Module-LWE + Module-SIS (lattice)",
            "  SLH-DSA: collision resistance of SHA-256/SHAKE (hash only)",
            "  FN-DSA: hardness of NTRU problem on ideal lattices",
            "Diversity: 2 lattice families + 1 hash-based — resilient against breakthroughs.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b02: Learning With Errors ──────────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "MIT CSAIL", location: "Cambridge, Massachusetts, USA", era: "2024 CE", emoji: "🧮" },
    id: "quantum-b02",
    order: 2,
    title: "The Noisy Lattice",
    subtitle: "Learning With Errors — The Mathematical Foundation of PQC",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-lwe", name: "Lattice Master", emoji: "🧮" },
    challengeType: "ctf",
    info: {
      tagline: "The Learning With Errors problem is so hard that both classical and quantum computers struggle with it — the bedrock of post-quantum cryptography.",
      year: 2024,
      overview: [
        "The Learning With Errors (LWE) problem, introduced by Oded Regev in 2005, is the mathematical foundation of the most important post-quantum cryptographic algorithms. LWE is: given a series of noisy linear equations over a finite field, find the secret vector s. The noise makes this exponentially harder than solving a system of linear equations.",
        "Regev proved a worst-case hardness reduction: solving random LWE instances is at least as hard as solving certain lattice problems (Shortest Vector Problem — SVP) in the worst case. The SVP on high-dimensional lattices is believed to be hard for both classical and quantum computers — no quantum algorithm achieves more than polynomial speedup.",
        "ML-KEM and ML-DSA use the Module variant (Module-LWE), which offers better performance while maintaining the same hardness guarantees. The 'Module' structure means the secret and error are structured in a way that enables efficient computation.",
      ],
      technical: {
        title: "LWE Problem Definition and Cryptographic Use",
        body: [
          "LWE problem: given (A, b) where A is a random matrix mod q, b = As + e mod q, s is a secret vector, and e is a small error vector, find s. Even with unlimited samples (A_i, b_i), recovering s is computationally infeasible for large n and q.",
          "For encryption: treat s as the private key, A as a public parameter. To encrypt bit m: choose random r, output (A^T r, b^T r + m·⌊q/2⌋). The error e makes decryption of the secret impossible without s, but the message m can be recovered because the noise is small enough not to flip the message bit.",
        ],
        codeExample: {
          label: "LWE encryption — simplified Python implementation",
          code: `import numpy as np

# LWE parameters (small for demo — real: n=768, q=3329)
n, q = 8, 97
sigma = 2  # noise standard deviation

# Key generation
A = np.random.randint(0, q, (n, n))  # public matrix
s = np.random.randint(0, q, n)        # secret key
e = np.round(np.random.normal(0, sigma, n)).astype(int) % q  # noise
b = (A @ s + e) % q  # public key = (A, b)

# Encryption of bit m=1
r = np.random.randint(0, 2, n)  # random binary vector
u = (A.T @ r) % q
v = (b @ r + (q // 2)) % q  # message encoded as q/2

# Decryption: v - s·u should be close to q/2 (for m=1) or 0 (for m=0)
decrypted = (v - s @ u) % q
print("Decrypted:", 1 if abs(decrypted - q//2) < q//4 else 0)  # → 1`,
        },
      },
      incident: {
        title: "Regev's LWE — From Theory to NIST Standard in 19 Years",
        when: "2005 (LWE) → 2024 (FIPS 203)",
        where: "Academic cryptography → global PKI replacement",
        impact: "The mathematical foundation that will secure the post-quantum internet",
        body: [
          "Oded Regev introduced LWE in his 2005 STOC paper, proving that it was as hard as solving certain lattice problems in the worst case — a remarkable average-case to worst-case reduction that cryptographers had sought for decades. This hardness guarantee made LWE uniquely trustworthy for cryptographic use.",
          "From Regev's paper in 2005 to NIST FIPS 203 in 2024 — 19 years of academic cryptography, performance optimization, parameter selection, and competitive evaluation produced the algorithm that will be used in billions of devices. ML-KEM (the standard) is a highly optimized variant of Kyber, which is itself a carefully designed LWE-based scheme.",
        ],
      },
      diagram: {
        nodes: [
          { label: "LWE: b = As + e mod q", sub: "find s given (A, b) — exponentially hard", type: "system" },
          { label: "Module-LWE", sub: "structured matrix A — better performance", type: "attacker" },
          { label: "ML-KEM (Kyber)", sub: "LWE-based key encapsulation — FIPS 203", type: "victim" },
          { label: "Quantum-Safe Key Exchange", sub: "replaces RSA/ECDH globally", type: "result" },
        ],
      },
      timeline: [
        { year: 2005, event: "Oded Regev introduces Learning With Errors at STOC", highlight: true },
        { year: 2011, event: "Brakerski-Gentry-Vaikuntanathan (BGV) scheme — practical LWE encryption" },
        { year: 2017, event: "CRYSTALS-Kyber (Module-LWE) submitted to NIST competition" },
        { year: 2022, event: "NIST selects Kyber as primary KEM for standardization" },
        { year: 2024, event: "FIPS 203 (ML-KEM) published — LWE becomes global standard" },
      ],
      keyTakeaways: [
        "LWE security reduces to lattice problems — no quantum algorithm achieves more than polynomial speedup",
        "The noise in LWE is essential: without it, the system collapses to a linear algebra problem (easily solvable)",
        "Module-LWE (used in ML-KEM) provides the same hardness guarantees as plain LWE with better performance",
        "Understanding LWE gives you the mathematical intuition behind the most important PQC algorithms",
      ],
      references: [
        { title: "Regev: On Lattices, Learning With Errors (2005)", url: "https://cims.nyu.edu/~regev/papers/qcrypto.pdf" },
        { title: "NIST FIPS 203 — ML-KEM Specification", url: "https://csrc.nist.gov/pubs/fips/203/final" },
      ],
    },
    ctf: {
      scenario: "Solve a small LWE instance to understand the hardness of the problem, then verify that adding quantum speedup (Shor's, Grover's) doesn't help.",
      hint: "Try to recover the secret vector s from the LWE samples (A, b). Then check if quantum algorithms help.",
      hints: [
        "Read the LWE brief. Run: cat lwe-brief.txt",
        "Attempt to solve the LWE instance classically. Run: lwe-solve classical",
        "Verify quantum algorithms provide no significant speedup. Run: lwe-solve quantum",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/lwe-brief.txt", value: "FLAG{LW3_", label: "LWE Brief — Module-LWE Problem Definition" },
        { trigger: "lwe-solve classical", value: "LATTIC3_HARD_", label: "Classical Solver — Exponential Time Confirmed" },
        { trigger: "lwe-solve quantum", value: "QUANTUM_SAFE}", label: "Quantum Solver — No Significant Speedup" },
      ],
      files: {
        "/lwe-brief.txt": [
          "LEARNING WITH ERRORS — PROBLEM INSTANCE",
          "n=256, q=3329, sigma=1.0 (ML-KEM-512 parameters)",
          "Given: matrix A (256×256 mod 3329) + vector b = As + e",
          "Task: recover secret vector s",
          "",
          "Sequence: lwe-solve classical → lwe-solve quantum → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "lwe-brief.txt", isDir: false }] },
      extraCommands: {
        "lwe-solve": (args: string[]) => {
          if (args[0] === "quantum") {
            return {
              lines: [
                "Running best quantum lattice algorithm (quantum sieve) on LWE-256...",
                "Quantum sieve: O(2^(0.2654n)) quantum time = O(2^68) operations",
                "Classical best (BKZ): O(2^(0.292n)) = O(2^75) operations",
                "Quantum speedup: only polynomial over classical — NOT significant",
                "LWE is quantum-resistant: no known quantum algorithm breaks it efficiently.",
                "Fragment collected.",
              ],
            };
          }
          return {
            lines: [
              "Running best classical lattice attack (BKZ algorithm) on LWE-256...",
              "BKZ block size: 384  Operations: 2^75 (approx 37 septillion)",
              "Estimated classical time: 10^7 years on 1M CPU cluster",
              "Classical attack: INFEASIBLE for n=256, q=3329",
              "Try: lwe-solve quantum",
            ],
          };
        },
      },
    },
  },

  // ─── quantum-b03: ML-KEM (CRYSTALS-Kyber) ───────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "IBM Research Zurich", location: "Rüschlikon, Switzerland", era: "2024 CE", emoji: "🔑" },
    id: "quantum-b03",
    order: 3,
    title: "Kyber: The New Key Exchange",
    subtitle: "ML-KEM (CRYSTALS-Kyber) — FIPS 203 Key Encapsulation",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-kyber", name: "Kyber Encapsulator", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "ML-KEM is the drop-in replacement for RSA and ECDH key exchange — the most important algorithm in post-quantum cryptography.",
      year: 2024,
      overview: [
        "ML-KEM (Module Lattice-based Key Encapsulation Mechanism), standardized as NIST FIPS 203 in August 2024, is the primary replacement for RSA and ECDH in key exchange protocols. It replaces the TLS key exchange, VPN key establishment, and any other system where two parties need to establish a shared secret.",
        "ML-KEM is based on CRYSTALS-Kyber, designed by a team including IBM, NXP, and academic researchers. It uses the Module-LWE problem — specifically the MLWE assumption on module lattices over polynomial rings. The algorithm is efficient enough for all TLS deployments and has been adopted by CloudFlare, Google, and major TLS libraries.",
        "ML-KEM comes in three parameter sets: ML-KEM-512 (NIST security level 1, equivalent to AES-128), ML-KEM-768 (level 3, equivalent to AES-192), and ML-KEM-1024 (level 5, equivalent to AES-256). For most applications, ML-KEM-768 is recommended.",
      ],
      technical: {
        title: "ML-KEM Operation — KeyGen, Encapsulate, Decapsulate",
        body: [
          "ML-KEM is a Key Encapsulation Mechanism (KEM): Alice generates a key pair (public key, private key). Bob uses Alice's public key to encapsulate a random shared secret, producing a ciphertext. Alice uses her private key to decapsulate the ciphertext and recover the same shared secret. Neither party needs to send the secret itself.",
          "The security relies on the difficulty of distinguishing the ciphertext from random without the private key. The encapsulation introduces LWE noise that prevents recovery of the secret without the private key. The shared secret K is derived via a hash function, providing security even if the underlying MLWE problem has partial information leakage.",
        ],
        codeExample: {
          label: "ML-KEM key exchange using liboqs (Open Quantum Safe)",
          code: `import oqs  # pip install liboqs-python

# ML-KEM-768 key exchange (FIPS 203 compliant)
with oqs.KeyEncapsulation("Kyber768") as kem:
    # Alice: generate key pair
    public_key = kem.generate_keypair()

    # Bob: encapsulate using Alice's public key
    with oqs.KeyEncapsulation("Kyber768") as kem_bob:
        ciphertext, shared_secret_bob = kem_bob.encap_secret(public_key)

    # Alice: decapsulate to get shared secret
    shared_secret_alice = kem.decap_secret(ciphertext)

    assert shared_secret_alice == shared_secret_bob  # True
    print(f"Shared secret: {shared_secret_alice.hex()[:32]}...")
    # Both have the same 32-byte (256-bit) shared secret
    # Neither transmitted the secret — only the ciphertext and public key`,
        },
      },
      incident: {
        title: "Cisco Silicon One P200 — 800G Line-Rate Quantum-Safe Encryption (2025)",
        when: "October 2025",
        where: "Cisco Silicon One P200 ASIC, deployed in enterprise and carrier backbone networks",
        impact: "First 800G network ASIC with hardware-embedded ML-KEM and ML-DSA — quantum-safe encryption at line rate without performance penalty",
        body: [
          "In October 2025, Cisco announced Silicon One P200 with 800G ports delivering line-rate quantum-safe encryption — the first major networking ASIC to embed NIST-standard PQC (ML-KEM for key establishment, ML-DSA for signing) directly in hardware. This means quantum-safe IPsec and MACsec run at full 800G speeds without external encryption appliances. CloudFlare and Google had proven ML-KEM viable in software; Cisco proved it viable in silicon.",
          "The follow-on Silicon One G300 (February 2026) scales to 102.4 Tbit/s Ethernet capacity with the same PQC capabilities. Cisco's full-stack PQC architecture — announced at Cisco Live 2026 Amsterdam — covers device boot integrity, data in transit, and key management. The SKIP interface bridges QKD-derived key material directly into IPsec/MACsec sessions, enabling hybrid PQC+QKD security on existing infrastructure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Alice (server)", sub: "Cisco Silicon One P200 — ML-KEM public key", type: "system" },
          { label: "Bob (client)", sub: "encapsulates shared secret with ML-KEM-768", type: "attacker" },
          { label: "Ciphertext @ 800G", sub: "1088 bytes — line-rate, no penalty", type: "victim" },
          { label: "Shared Secret K", sub: "identical both sides — quantum-safe", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "CRYSTALS-Kyber submitted to NIST PQC competition" },
        { year: 2023, event: "CloudFlare + Google Chrome deploy hybrid Kyber768 in TLS" },
        { year: 2024, event: "NIST FIPS 203 (ML-KEM) published — mandatory for federal systems", highlight: true },
        { year: 2025, event: "Cisco Silicon One P200: ML-KEM + ML-DSA in hardware at 800G line rate" },
        { year: 2026, event: "Cisco Silicon One G300: 102.4 Tbit/s with full PQC stack" },
      ],
      keyTakeaways: [
        "ML-KEM (FIPS 203) is the mandatory replacement for RSA and ECDH in federal systems",
        "Cisco Silicon One P200 delivers ML-KEM at 800G line rate — no performance penalty in hardware",
        "Use hybrid (X25519 + ML-KEM-768) during migration — security against both classical and quantum attackers",
        "Cisco SKIP interface bridges QKD-derived keys into IPsec/MACsec for a PQC+QKD hybrid stack",
      ],
      references: [
        { title: "NIST FIPS 203 — ML-KEM Standard", url: "https://csrc.nist.gov/pubs/fips/203/final" },
        { title: "Cisco: Building a Quantum-Safe Future (Silicon One PQC)", url: "https://blogs.cisco.com/security/from-strategy-to-architecture-building-a-quantum-safe-future" },
        { title: "Open Quantum Safe — liboqs", url: "https://openquantumsafe.org/" },
      ],
    },
    ctf: {
      scenario: "Replace an RSA key exchange with ML-KEM-768 in a TLS handshake. Generate the key pair, perform encapsulation/decapsulation, and verify the shared secret.",
      hint: "Use the oqs library to run an ML-KEM-768 key exchange and verify the shared secrets match.",
      hints: [
        "Read the ML-KEM deployment guide. Run: cat mlkem-guide.txt",
        "Generate an ML-KEM-768 key pair and encapsulate a secret. Run: mlkem-demo keygen",
        "Decapsulate and verify the shared secret. Run: mlkem-demo decap",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/mlkem-guide.txt", value: "FLAG{ML_KEM_", label: "Deployment Guide — ML-KEM-768 Overview" },
        { trigger: "mlkem-demo keygen", value: "768_FIPS203_", label: "Key Pair Generated — Encapsulation Successful" },
        { trigger: "mlkem-demo decap", value: "RSA_REPLAC3D}", label: "Decapsulation Verified — Shared Secret Confirmed" },
      ],
      files: {
        "/mlkem-guide.txt": [
          "ML-KEM-768 DEPLOYMENT GUIDE",
          "FIPS 203 Key Encapsulation Mechanism",
          "Security level: NIST Level 3 (equivalent to AES-192)",
          "Public key size: 1184 bytes | Ciphertext: 1088 bytes",
          "",
          "Cisco deployment: Silicon One P200 (800G line-rate, hardware ML-KEM)",
          "Cisco deployment: IPsec IKEv2 with ML-KEM-768 key exchange (2025+)",
          "Hybrid mode: X25519 + ML-KEM-768 (recommended during migration)",
          "",
          "Sequence: mlkem-demo keygen → mlkem-demo decap → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "mlkem-guide.txt", isDir: false }] },
      chatbotContext: "This stage covers ML-KEM (FIPS 203), the NIST-standard post-quantum key encapsulation mechanism. Cisco products: Silicon One P200 (800G line-rate ML-KEM in hardware, October 2025), Silicon One G300 (102.4 Tbit/s, Feb 2026), Cisco IPsec with ML-KEM-768 key exchange, Cisco MACsec with ML-KEM. The recommended parameter set is ML-KEM-768 (NIST level 3). Fragments are triggered by cat mlkem-guide.txt, mlkem-demo keygen, mlkem-demo decap.",
      extraCommands: {
        "mlkem-demo": (args: string[]) => {
          if (args[0] === "decap") {
            return {
              lines: [
                "Decapsulating with Alice's private key...",
                "Shared secret (Alice): 3f8a2b1c4d5e6f7a8b9c0d1e2f3a4b5c (32 bytes)",
                "Shared secret (Bob):   3f8a2b1c4d5e6f7a8b9c0d1e2f3a4b5c (32 bytes)",
                "Secrets match: ✓",
                "ML-KEM-768 key exchange complete. RSA not used.",
                "Fragment collected.",
              ],
            };
          }
          return {
            lines: [
              "ML-KEM-768 demo:",
              "Alice generates key pair:",
              "  Public key: 1184 bytes (shown as pubkey.bin)",
              "  Private key: 2400 bytes (secret)",
              "Bob encapsulates using public key:",
              "  Ciphertext: 1088 bytes",
              "  Shared secret (Bob): 3f8a2b1c4d5e6f7a8b9c0d1e2f3a4b5c",
              "Run: mlkem-demo decap",
            ],
          };
        },
      },
    },
  },

  // ─── quantum-b04: ML-DSA (CRYSTALS-Dilithium) ───────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Qualcomm Security Research", location: "San Diego, California, USA", era: "2024 CE", emoji: "✍️" },
    id: "quantum-b04",
    order: 4,
    title: "Dilithium: The Quantum Signature",
    subtitle: "ML-DSA (CRYSTALS-Dilithium) — FIPS 204 Digital Signatures",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-dilithium", name: "Quantum Signer", emoji: "✍️" },
    challengeType: "ctf",
    info: {
      tagline: "ML-DSA replaces RSA and ECDSA signatures — for TLS certificates, code signing, and PKI.",
      year: 2024,
      overview: [
        "ML-DSA (Module Lattice-based Digital Signature Algorithm), standardized as NIST FIPS 204 in August 2024, is the primary replacement for RSA-PSS and ECDSA digital signatures. It is used for TLS certificate signing, code signing, authentication tokens, and any other system requiring digital signatures.",
        "ML-DSA is based on CRYSTALS-Dilithium and uses the Module-LWE and Module-SIS (Short Integer Solution) hardness assumptions. The signing algorithm uses a rejection sampling technique to ensure that signatures don't leak information about the private key — a critical security property for signature schemes.",
        "ML-DSA parameter sets: ML-DSA-44 (NIST level 2), ML-DSA-65 (level 3, recommended), ML-DSA-87 (level 5). Signatures are larger than RSA or ECDSA (2420-4595 bytes vs 64-512 bytes for ECDSA) but verification is fast and the security is quantum-resistant.",
      ],
      technical: {
        title: "ML-DSA — How Lattice-Based Signing Works",
        body: [
          "ML-DSA signing: the signer commits to a random mask y, computes a challenge hash c from the message and commitment, then computes a response z = y + c·s (where s is the private key). The signature is (c, z). The rejection sampling step ensures z doesn't reveal s: if z is too large, the signer restarts, ensuring z looks uniform regardless of s.",
          "Verification: given (c, z), the verifier recomputes the commitment as Az - c·t (where t = As is the public key) and checks that the hash c matches the message and commitment. Security relies on Module-SIS: finding a short vector z such that Az = c·t mod q is as hard as the shortest vector problem on lattices.",
        ],
        codeExample: {
          label: "ML-DSA signing and verification (liboqs)",
          code: `import oqs

# ML-DSA-65 signing (FIPS 204)
with oqs.Signature("Dilithium3") as signer:
    # Key generation
    public_key = signer.generate_keypair()
    private_key = signer.export_secret_key()

    # Sign a message
    message = b"Firmware v2.0.1 — certified secure"
    signature = signer.sign(message)
    print(f"Signature size: {len(signature)} bytes")  # ~3293 bytes (vs 64 for ECDSA)

    # Verify
    with oqs.Signature("Dilithium3") as verifier:
        verifier.set_secret_key(public_key)  # verification uses public key
        valid = verifier.verify(message, signature, public_key)
        print(f"Valid: {valid}")  # True

# Comparison:
# ECDSA-256 signature: 64 bytes
# RSA-2048 signature:  256 bytes
# ML-DSA-65 signature: 3293 bytes — larger but quantum-safe`,
        },
      },
      incident: {
        title: "Cisco Full-Stack PQC Architecture — ML-DSA in IPsec, TLS, and Boot Chain (Cisco Live 2026)",
        when: "Cisco Live 2026 Amsterdam / October 2025 (Silicon One P200)",
        where: "Cisco enterprise and carrier infrastructure globally",
        impact: "First major network vendor to embed ML-DSA in hardware boot chain, IPsec, MACsec, and TLS simultaneously — full stack quantum-safe",
        body: [
          "Cisco's full-stack PQC architecture — announced at Cisco Live 2026 Amsterdam — implements ML-DSA (FIPS 204) across three security domains simultaneously: device boot integrity (ML-DSA signatures verify firmware on every boot), data in transit (ML-DSA in IKEv2/IPsec and MACsec for authentication), and certificate management (ML-DSA-signed device certificates). This is the first enterprise networking vendor to deploy ML-DSA across the entire stack rather than just key exchange.",
          "The Silicon One P200 ASIC (October 2025) provides hardware-accelerated ML-DSA at 800G line rate — no software performance penalty. The SKIP interface accepts quantum-derived key material from Cisco's Universal Quantum Switch and injects it into IPsec SAs, enabling hybrid PQC+QKD authentication. Signal and Apple proved ML-DSA viable in messaging; Cisco proved it viable in network infrastructure.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cisco IOS-XE / NX-OS", sub: "ML-DSA private key — Module-LWE hardness", type: "system" },
          { label: "IPsec IKEv2 AUTH", sub: "ML-DSA-65 signature in handshake", type: "attacker" },
          { label: "Remote Peer Verification", sub: "ML-DSA public key certificate", type: "victim" },
          { label: "Authenticated Tunnel", sub: "quantum-safe IPsec SA established", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "CRYSTALS-Dilithium submitted to NIST PQC competition" },
        { year: 2024, event: "NIST FIPS 204 (ML-DSA) published", highlight: true },
        { year: 2024, event: "Apple PQ3 for iMessage — hybrid Kyber+Dilithium deployed" },
        { year: 2025, event: "Cisco Silicon One P200: ML-DSA in hardware at 800G line rate" },
        { year: 2026, event: "Cisco announces full-stack ML-DSA — boot, IPsec, MACsec, TLS, certs" },
      ],
      keyTakeaways: [
        "ML-DSA (FIPS 204) is the mandatory replacement for RSA-PSS and ECDSA in federal systems",
        "Cisco Silicon One P200 delivers hardware ML-DSA at 800G — no performance penalty",
        "Cisco deploys ML-DSA across the full stack: boot chain, IPsec, MACsec, TLS, and certificate management",
        "SKIP interface bridges QKD key material into IPsec/MACsec for hybrid PQC+QKD authentication",
      ],
      references: [
        { title: "NIST FIPS 204 — ML-DSA Standard", url: "https://csrc.nist.gov/pubs/fips/204/final" },
        { title: "Cisco: Post-Quantum Cryptography Architecture", url: "https://www.cisco.com/site/us/en/about/trust-center/post-quantum-cryptography.html" },
        { title: "Cisco: Building a Quantum-Safe Future", url: "https://blogs.cisco.com/security/from-strategy-to-architecture-building-a-quantum-safe-future" },
      ],
    },
    ctf: {
      scenario: "Replace ECDSA code signing with ML-DSA-65 in a firmware signing pipeline. Generate a key pair, sign a firmware image, and verify the signature.",
      hint: "Use the liboqs Dilithium3 implementation to sign and verify a firmware binary.",
      hints: [
        "Read the code signing guide. Run: cat codesign-guide.txt",
        "Generate ML-DSA-65 key pair and sign the firmware. Run: mldsa-sign firmware.bin",
        "Verify the firmware signature. Run: mldsa-verify firmware.bin",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/codesign-guide.txt", value: "FLAG{ML_DSA_", label: "Code Signing Guide — ML-DSA-65 Pipeline" },
        { trigger: "mldsa-sign firmware.bin", value: "65_FIPS204_", label: "Firmware Signed — Dilithium Signature Generated" },
        { trigger: "mldsa-verify firmware.bin", value: "CODESIGN_PQC}", label: "Signature Verified — Quantum-Safe Code Signing Active" },
      ],
      files: {
        "/codesign-guide.txt": [
          "ML-DSA-65 CODE SIGNING GUIDE",
          "Algorithm: CRYSTALS-Dilithium Level 3 (FIPS 204)",
          "Public key: 1952 bytes | Signature: 3293 bytes",
          "Use case: firmware signing, TLS certificate signing",
          "",
          "Cisco deployment examples:",
          "  - Cisco IOS-XE secure boot: ML-DSA signs every firmware image",
          "  - Cisco IPsec IKEv2 AUTH: ML-DSA peer authentication",
          "  - Cisco MACsec: ML-DSA identity certificates",
          "  - Silicon One P200: hardware-accelerated ML-DSA at 800G",
          "",
          "Sequence: mldsa-sign → mldsa-verify → assemble",
        ].join("\n"),
        "/firmware.bin": "CISCO_IOSXE_17.14_FIRMWARE_PAYLOAD",
      },
      dirs: { "/": [{ name: "codesign-guide.txt", isDir: false }, { name: "firmware.bin", isDir: false }] },
      chatbotContext: "This stage covers ML-DSA (FIPS 204), the NIST-standard post-quantum digital signature algorithm. Cisco products: Silicon One P200 (hardware ML-DSA at 800G), Cisco IOS-XE and NX-OS secure boot using ML-DSA, Cisco IPsec IKEv2 with ML-DSA peer authentication, Cisco MACsec with ML-DSA certificates, Cisco full-stack PQC announced at Cisco Live 2026 Amsterdam. Fragments triggered by cat codesign-guide.txt, mldsa-sign firmware.bin, mldsa-verify firmware.bin.",
      extraCommands: {
        "mldsa-sign": (_args: string[]) => ({
          lines: [
            "Generating ML-DSA-65 key pair...",
            "  Public key: 1952 bytes (pubkey-mldsa.bin)",
            "  Private key: 4000 bytes (securely stored)",
            "Signing firmware.bin (v2.0.1)...",
            "  Signature: 3293 bytes (firmware.sig)",
            "  Algorithm: ML-DSA-65 (CRYSTALS-Dilithium Level 3)",
            "Firmware signed. Old ECDSA signature discarded.",
          ],
        }),
        "mldsa-verify": (_args: string[]) => ({
          lines: [
            "Verifying ML-DSA-65 signature on firmware.bin...",
            "  Public key loaded: pubkey-mldsa.bin",
            "  Signature file: firmware.sig (3293 bytes)",
            "  Verification: VALID ✓",
            "Firmware integrity confirmed — quantum-safe code signing active.",
            "ECDSA signature would be: QUANTUM-VULNERABLE (not used).",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b05: SLH-DSA (SPHINCS+) ────────────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Radboud University Cryptography Lab", location: "Nijmegen, Netherlands", era: "2024 CE", emoji: "🌲" },
    id: "quantum-b05",
    order: 5,
    title: "The Hash Tree Forest",
    subtitle: "SLH-DSA (SPHINCS+) — FIPS 205 Stateless Hash-Based Signatures",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-sphincs", name: "Hash Arborist", emoji: "🌲" },
    challengeType: "ctf",
    info: {
      tagline: "SLH-DSA relies only on hash function security — the most conservative PQC choice with the simplest security assumptions.",
      year: 2024,
      overview: [
        "SLH-DSA (Stateless Hash-based Digital Signature Algorithm), standardized as NIST FIPS 205 in August 2024, is based on SPHINCS+ and has the most conservative security assumptions of all PQC signature schemes. Its security relies solely on the collision resistance and second-preimage resistance of the underlying hash function (SHA-256 or SHAKE-256) — not on any algebraic hardness assumption.",
        "This makes SLH-DSA uniquely trustworthy: if SHA-256 is not broken, SLH-DSA is secure. Even if lattice problems turn out to be easier than expected, SLH-DSA remains secure. For root CAs, firmware signing, and other long-lived high-security applications where maximum conservatism is warranted, SLH-DSA is the recommended choice.",
        "The tradeoff: SLH-DSA signatures are large (7856-49856 bytes depending on parameter set) and signing is slow (milliseconds to seconds for some parameter sets). For applications where signature size or speed is critical, ML-DSA is preferred. For root-of-trust signing (done infrequently, permanent consequences), SLH-DSA's conservative security justifies the overhead.",
      ],
      technical: {
        title: "How SPHINCS+ Works — Hypertree of Merkle Trees",
        body: [
          "SPHINCS+ builds a hypertree: a tree of Merkle trees. Each leaf node signs one message using a one-time signature scheme (WOTS+). The Merkle tree authenticates the WOTS+ key pair. The hypertree provides statefulness-free operation: the signer chooses a random leaf for each signature, so no state tracking is needed (unlike classic stateful hash-based signatures like XMSS).",
          "Security proof: breaking SLH-DSA requires either finding a collision in the hash function or solving a second-preimage problem — both are hard even for quantum computers (Grover's gives only O(√N) speedup, doubled by using SHA-256/512 with adequate output size).",
        ],
        codeExample: {
          label: "SLH-DSA parameter sets — size and speed tradeoffs",
          code: `# SLH-DSA parameter sets (FIPS 205)
# Format: SLH-DSA-{HASH}-{SIZE}

Variant         Sec Level  Pub Key  Priv Key  Sig Size  Sign Time
-----------     ---------  -------  --------  --------  ---------
SLH-DSA-SHA2-128s  Level1  32B     64B       7856B     5.3s
SLH-DSA-SHA2-128f  Level1  32B     64B       17088B    0.17s    ← fast variant
SLH-DSA-SHA2-192s  Level3  48B     96B       16224B    14s
SLH-DSA-SHA2-256s  Level5  64B     128B      29792B    30s
SLH-DSA-SHAKE-128f Level1  32B     64B       17088B    0.22s

# For comparison:
# ECDSA-256: 64B sig, ~0.3ms sign, ~0.7ms verify
# ML-DSA-65:  3293B sig, ~0.5ms sign, ~0.2ms verify

# Recommended use cases:
# - Root CA signing: SLH-DSA-SHA2-256s (max conservatism)
# - TLS cert signing: ML-DSA-65 (balance of size and security)
# - Code signing: SLH-DSA-SHA2-128f (fast, moderate security)`,
        },
      },
      incident: {
        title: "NIST Root CA Migration — Why Hash-Based Signatures Matter Most",
        when: "2024–2030",
        where: "Root Certificate Authorities globally — Mozilla, Microsoft, Apple trust stores",
        impact: "Root CA signatures must remain valid for 25+ years — SLH-DSA is the only option that can guarantee this",
        body: [
          "Root Certificate Authority (CA) signing keys have 25-year lifetimes — the root's signature on intermediate certificates must remain valid for decades. With RSA and ECDSA scheduled for deprecation by 2035, root CAs must begin migrating their signing algorithms now.",
          "SLH-DSA is the preferred choice for root CA signing because its security assumptions (hash function collision resistance) are the most conservative and longest-standing in cryptography. Even if lattice problems are found to be easier than expected, SLH-DSA root CA signatures remain secure. Mozilla, Microsoft, and Apple are evaluating PQC root CA certificates that will need to be deployed into all major trust stores.",
        ],
      },
      diagram: {
        nodes: [
          { label: "WOTS+ (leaf)", sub: "one-time signature using hash chains", type: "system" },
          { label: "Merkle Tree (FORS)", sub: "authenticates WOTS+ keypairs", type: "attacker" },
          { label: "Hypertree", sub: "tree of Merkle trees — stateless selection", type: "victim" },
          { label: "SLH-DSA Signature", sub: "7856 bytes — hash only, max conservative", type: "result" },
        ],
      },
      timeline: [
        { year: 2011, event: "XMSS — first stateful hash-based signature scheme standardized (RFC 8391)" },
        { year: 2017, event: "SPHINCS+ — stateless variant submitted to NIST" },
        { year: 2022, event: "SPHINCS+ selected as NIST's hash-based signature candidate" },
        { year: 2024, event: "NIST FIPS 205 (SLH-DSA) published — hash-based signatures standardized", highlight: true },
        { year: 2030, event: "Root CAs begin issuing PQC certificates — SLH-DSA recommended" },
      ],
      keyTakeaways: [
        "SLH-DSA's security relies only on SHA-256/SHAKE — not algebraic hardness — most conservative PQC choice",
        "Use SLH-DSA for root CA signing, firmware root-of-trust, and any permanent high-value signature",
        "Use ML-DSA for high-volume signing (TLS certificates, tokens) where signature size matters",
        "Stateless operation (no state management) makes SLH-DSA practical for distributed signing systems",
      ],
      references: [
        { title: "NIST FIPS 205 — SLH-DSA Standard", url: "https://csrc.nist.gov/pubs/fips/205/final" },
        { title: "SPHINCS+ Specification", url: "https://sphincs.org/" },
      ],
    },
    ctf: {
      scenario: "Configure a root CA to use SLH-DSA-SHA2-256s for signing. Sign an intermediate CA certificate and verify the chain of trust.",
      hint: "Use the SLH-DSA implementation to sign the intermediate cert and verify the signature chain.",
      hints: [
        "Read the root CA migration guide. Run: cat rootca-guide.txt",
        "Sign the intermediate CA certificate with SLH-DSA. Run: slhdsa-sign intermediate-ca.crt",
        "Verify the certificate chain with the SLH-DSA root. Run: slhdsa-verify chain",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/rootca-guide.txt", value: "FLAG{SLH_DSA_", label: "Root CA Guide — SLH-DSA Migration Plan" },
        { trigger: "slhdsa-sign intermediate-ca.crt", value: "FIPS205_ROOTCA_", label: "Intermediate CA Signed — SLH-DSA Root Signature" },
        { trigger: "slhdsa-verify chain", value: "HASH_SAFE}", label: "Chain Verified — Hash-Only Root of Trust Active" },
      ],
      files: {
        "/rootca-guide.txt": [
          "ROOT CA PQC MIGRATION GUIDE",
          "Algorithm: SLH-DSA-SHA2-256s (FIPS 205, Level 5)",
          "Security: hash-function only — most conservative",
          "Signature size: 29792 bytes | Key: 64B public, 128B private",
          "",
          "Sequence: slhdsa-sign → slhdsa-verify → assemble",
        ].join("\n"),
        "/intermediate-ca.crt": "INTERMEDIATE_CA_CERTIFICATE_PLACEHOLDER",
      },
      dirs: { "/": [{ name: "rootca-guide.txt", isDir: false }, { name: "intermediate-ca.crt", isDir: false }] },
      extraCommands: {
        "slhdsa-sign": (_args: string[]) => ({
          lines: [
            "Signing intermediate-ca.crt with SLH-DSA-SHA2-256s root CA...",
            "  Public key: 64 bytes (root-ca-public.bin)",
            "  Signature: 29792 bytes (intermediate-ca.sig)",
            "  Hash function: SHA-256 — security assumption: collision resistance only",
            "  Signing time: 30.2 seconds (root CA — infrequent, acceptable)",
            "Intermediate CA certificate signed. Valid for 10 years.",
          ],
        }),
        "slhdsa-verify": (_args: string[]) => ({
          lines: [
            "Verifying certificate chain with SLH-DSA root CA...",
            "  Root CA (SLH-DSA-SHA2-256s): SELF-SIGNED ✓",
            "  Intermediate CA: signature by Root CA: VALID ✓",
            "  TLS leaf cert: signature by Intermediate: VALID ✓",
            "Full chain: quantum-safe (hash-only root of trust)",
            "Security guarantee: holds as long as SHA-256 is not broken.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b06: FN-DSA (FALCON) ───────────────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Thales Cryptographic Research", location: "Paris, France", era: "2024 CE", emoji: "🦅" },
    id: "quantum-b06",
    order: 6,
    title: "FALCON: The Fast Signature",
    subtitle: "FN-DSA (FALCON) — Compact Fast-Fourier Lattice Signatures",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-falcon", name: "Falcon Fledgling", emoji: "🦅" },
    challengeType: "ctf",
    info: {
      tagline: "FALCON offers the smallest post-quantum signatures of any NIST standard — at the cost of complex, subtle implementation requirements.",
      year: 2024,
      overview: [
        "FN-DSA (Fast-Fourier NTRU-based Digital Signature Algorithm), standardized as FALCON in NIST's upcoming FIPS standard, provides the most compact signatures of any NIST PQC algorithm. FALCON-512 produces 666-byte signatures (vs 3293 for ML-DSA-65) and FALCON-1024 produces 1280-byte signatures — closer to RSA in size.",
        "FALCON is based on the NTRU lattice problem and uses the Fast Fourier Transform for efficient Gaussian sampling in polynomial rings. This Gaussian sampling is what enables the compact signatures — but it also makes FALCON significantly harder to implement correctly than ML-DSA.",
        "FALCON's complexity is its main limitation: side-channel attacks against FALCON implementations are a genuine concern. Constant-time Gaussian sampling is notoriously difficult to implement. For most deployments, ML-DSA is preferred for its implementation simplicity. FALCON is recommended for size-constrained environments like IoT devices, embedded systems, and bandwidth-limited protocols.",
      ],
      technical: {
        title: "FALCON — NTRU Lattices and Fast-Fourier Sampling",
        body: [
          "FALCON signing uses a trapdoor function based on the NTRU problem over polynomial rings. The private key provides a short basis for an NTRU lattice. Signing involves sampling a short vector from a Gaussian distribution over this lattice — using the short basis as the trapdoor. The Fast Fourier Transform makes this sampling efficient.",
          "The critical security property is that the Gaussian sampling must be perfectly discrete — any deviation (due to floating-point rounding, timing variations, or distribution skew) can leak the private key. This is why FALCON requires careful, validated implementations. Open Quantum Safe (liboqs) provides a reference implementation that addresses these concerns.",
        ],
        codeExample: {
          label: "FALCON vs ML-DSA comparison — size-critical applications",
          code: `import oqs

# FALCON-512 (compact signatures for IoT/embedded)
with oqs.Signature("Falcon-512") as falcon:
    public_key = falcon.generate_keypair()
    message = b"Sensor reading: temperature=23.4C"
    signature = falcon.sign(message)
    print(f"FALCON-512 sig size: {len(signature)} bytes")  # ~666 bytes
    valid = falcon.verify(message, signature, public_key)
    print(f"Valid: {valid}")

# For comparison with ML-DSA-44:
with oqs.Signature("Dilithium2") as dilithium:
    public_key = dilithium.generate_keypair()
    signature = dilithium.sign(message)
    print(f"ML-DSA-44 sig size: {len(signature)} bytes")  # ~2420 bytes

# When to use FALCON vs ML-DSA:
# IoT sensor signatures: FALCON (bandwidth constrained)
# TLS cert signing: ML-DSA (simpler, safer implementation)
# Root CA: SLH-DSA (most conservative)`,
        },
      },
      incident: {
        title: "Lattice Signature Side-Channel Research — Implementation Pitfalls",
        when: "2019–2023",
        where: "Academic research — multiple implementation attacks on lattice signatures",
        impact: "Demonstrates why FALCON requires validated implementations — DIY implementations dangerous",
        body: [
          "Multiple academic papers (2019-2023) demonstrated practical side-channel attacks against naive FALCON implementations — recovering the private key from timing variations or power traces during Gaussian sampling. These attacks were feasible against first-principle implementations that didn't account for timing side-channels.",
          "The FALCON specification includes a reference implementation with careful attention to constant-time Gaussian sampling. Security engineers should use only validated, audited implementations (liboqs, BoringSSL with PQC patches) — never roll their own FALCON implementation. This contrasts with ML-DSA, which is simpler to implement correctly.",
        ],
      },
      diagram: {
        nodes: [
          { label: "NTRU Lattice", sub: "private key = short basis (trapdoor)", type: "system" },
          { label: "FFT Gaussian Sampling", sub: "complex — side-channel vulnerable if naive", type: "attacker" },
          { label: "FALCON Signature", sub: "666 bytes (512) / 1280 bytes (1024)", type: "victim" },
          { label: "IoT / Embedded Use", sub: "smallest PQC sig — use validated library", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "FALCON submitted to NIST PQC competition" },
        { year: 2019, event: "First side-channel attacks on FALCON implementations published" },
        { year: 2022, event: "NIST selects FALCON for alternate signature standardization" },
        { year: 2024, event: "NIST FIPS for FN-DSA (FALCON) in final review", highlight: true },
      ],
      keyTakeaways: [
        "FALCON provides the smallest PQC signatures — ideal for IoT, embedded, and bandwidth-constrained systems",
        "Never implement FALCON yourself — use only validated constant-time implementations (liboqs, BoringSSL)",
        "For most enterprise applications, ML-DSA's simplicity outweighs FALCON's size advantage",
        "FALCON-512 is ~10x smaller than ML-DSA-44 — significant for sensor networks and constrained protocols",
      ],
      references: [
        { title: "FALCON Specification", url: "https://falcon-sign.info/" },
        { title: "Open Quantum Safe — Falcon Implementation", url: "https://openquantumsafe.org/liboqs/algorithms/sig/falcon.html" },
      ],
    },
    ctf: {
      scenario: "An IoT sensor network uses ECDSA-256 for sensor data authentication. The signatures are transmitted over LoRaWAN with strict bandwidth limits. Replace ECDSA with FALCON-512 and verify the bandwidth savings.",
      hint: "Compare ECDSA-256 and FALCON-512 signature sizes for the sensor data payload, then sign and verify.",
      hints: [
        "Read the IoT security brief. Run: cat iot-brief.txt",
        "Compare signature sizes for ECDSA vs FALCON-512. Run: sig-compare",
        "Sign a sensor reading with FALCON-512 and verify. Run: falcon-sign-verify",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/iot-brief.txt", value: "FLAG{FALCON_", label: "IoT Brief — Bandwidth-Constrained Signing" },
        { trigger: "sig-compare", value: "512_IOT_", label: "Size Comparison — FALCON 10x Smaller" },
        { trigger: "falcon-sign-verify", value: "COMPACT_FNDSA}", label: "Sensor Signed — LoRaWAN Bandwidth Fit" },
      ],
      files: {
        "/iot-brief.txt": [
          "IOT SENSOR NETWORK — PQC MIGRATION",
          "Constraint: LoRaWAN max payload 51 bytes per message",
          "Current: ECDSA-256 (64-byte sig) — exceeds payload budget",
          "Target: smallest quantum-safe signature possible",
          "",
          "Sequence: sig-compare → falcon-sign-verify → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "iot-brief.txt", isDir: false }] },
      extraCommands: {
        "sig-compare": (_args: string[]) => ({
          lines: [
            "Signature size comparison for sensor authentication:",
            "  ECDSA-256: 64 bytes — quantum VULNERABLE",
            "  ML-DSA-44:  2420 bytes — quantum safe (too large for LoRaWAN)",
            "  SLH-DSA-128f: 17088 bytes — quantum safe (far too large)",
            "  FALCON-512: 666 bytes — quantum safe (fits in 4G frame; compressed ok)",
            "Winner for IoT: FALCON-512 (smallest quantum-safe option)",
          ],
        }),
        "falcon-sign-verify": (_args: string[]) => ({
          lines: [
            "Signing sensor reading with FALCON-512...",
            "  Message: {temp:23.4, humidity:45, sensor_id:A7F2}",
            "  Signature: 666 bytes (compressed: ~512 bytes)",
            "  Algorithm: FN-DSA (FALCON-512)",
            "Verifying at base station...",
            "  VALID ✓ — quantum-safe sensor authentication",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b07: Hybrid PQC Schemes ────────────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Mozilla Security Engineering", location: "Mountain View, California, USA", era: "2024 CE", emoji: "🔀" },
    id: "quantum-b07",
    order: 7,
    title: "The Hybrid Bridge",
    subtitle: "Hybrid Classical+PQC — Secure Migration Without Breaking Things",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-hybrid", name: "Hybrid Architect", emoji: "🔀" },
    challengeType: "ctf",
    info: {
      tagline: "Hybrid schemes combine classical and post-quantum algorithms — secure against both today's attackers and tomorrow's quantum computers.",
      year: 2024,
      overview: [
        "During the transition from classical to post-quantum cryptography, hybrid schemes are essential. A hybrid key exchange (e.g., X25519 + ML-KEM-768) combines a classical algorithm with a PQC algorithm. The shared secret is derived from both: security holds if either algorithm is secure — quantum attackers can't break ML-KEM, classical attackers can't break X25519.",
        "Hybrid schemes solve the deployment chicken-and-egg problem: organizations can deploy hybrid PQC before their entire ecosystem has verified PQC algorithm implementations. If ML-KEM has an undiscovered vulnerability, X25519 still protects the session. If a CRQC breaks X25519, ML-KEM still protects against quantum attackers.",
        "TLS 1.3 hybrid ciphersuites are already in use: X25519Kyber768Draft00 (CloudFlare/Google, 2023), X25519MLKEM768 (IETF draft, 2024). NIST recommends hybrid during the migration period, with pure PQC as the end goal once algorithm confidence is established.",
      ],
      technical: {
        title: "Hybrid Key Derivation — Combining Classical and PQC Shared Secrets",
        body: [
          "The hybrid shared secret K = KDF(K_classical || K_pqc) where KDF is a secure key derivation function (HKDF-SHA384). This construction is secure if either K_classical or K_pqc is indistinguishable from random — an attacker must break both algorithms simultaneously to recover K.",
          "For TLS 1.3 hybrid: the client sends both an X25519 key share and an ML-KEM public key in the ClientHello. The server performs X25519 key agreement and ML-KEM encapsulation, returning the ML-KEM ciphertext. Both parties derive the session keys using both shared secrets as input to HKDF.",
        ],
        codeExample: {
          label: "Hybrid X25519 + ML-KEM-768 key exchange",
          code: `import oqs
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
import hashlib

# X25519 (classical)
x25519_private = X25519PrivateKey.generate()
x25519_public = x25519_private.public_key()

# ML-KEM-768 (post-quantum)
with oqs.KeyEncapsulation("Kyber768") as kem:
    mlkem_public = kem.generate_keypair()
    mlkem_private = kem.export_secret_key()

    # Encapsulation (done by remote party)
    ciphertext, k_pqc = kem.encap_secret(mlkem_public)

    # X25519 key agreement (with remote party's X25519 public key)
    k_classical = x25519_private.exchange(remote_x25519_public)

    # Hybrid key derivation: K = HKDF(K_classical || K_pqc)
    hkdf = HKDF(algorithm=hashes.SHA384(), length=32, salt=None, info=b"TLS-hybrid-1.3")
    session_key = hkdf.derive(k_classical + k_pqc)
    # Secure against classical AND quantum attackers`,
        },
      },
      incident: {
        title: "IETF TLS Post-Quantum Hybrid — Standardization in Progress",
        when: "2023–2024",
        where: "IETF TLS Working Group — global TLS standard",
        impact: "Hybrid PQC will be standardized in TLS 1.3 — protecting billions of connections",
        body: [
          "The IETF TLS working group is standardizing hybrid post-quantum key exchange for TLS 1.3. Draft RFCs define X25519MLKEM768 and SecP256r1MLKEM768 ciphersuites, with planned inclusion in TLS 1.4. These ciphersuites have already been deployed by CloudFlare (protecting 25M+ websites) and Google Chrome (3B+ users) using pre-standard draft versions.",
          "The IETF approach validates the hybrid strategy: deploy now with draft hybrid ciphersuites, protecting current TLS sessions from HNDL attacks, while the pure PQC standards mature. Once implementation confidence is established (2025-2027), pure ML-KEM ciphersuites will be standardized and hybrid ciphersuites will be phased out.",
        ],
      },
      diagram: {
        nodes: [
          { label: "X25519 (classical)", sub: "secure against classical attackers", type: "system" },
          { label: "ML-KEM-768 (PQC)", sub: "secure against quantum attackers", type: "attacker" },
          { label: "HKDF(K_classical ∥ K_pqc)", sub: "both must be broken simultaneously", type: "victim" },
          { label: "Hybrid Session Key", sub: "secure during migration — no trade-offs", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "CloudFlare + Chrome deploy X25519Kyber768 — first mass hybrid PQC" },
        { year: 2024, event: "IETF publishes draft RFC for X25519MLKEM768 hybrid TLS ciphersuite", highlight: true },
        { year: 2025, event: "Expected: IETF standardizes hybrid ciphersuites in TLS 1.3" },
        { year: 2027, event: "Expected: pure ML-KEM ciphersuites standardized; hybrid optional" },
      ],
      keyTakeaways: [
        "Deploy hybrid (X25519 + ML-KEM-768) immediately — it's already production-proven and provides HNDL protection",
        "Hybrid security: attacker must break BOTH classical AND PQC algorithm — no weaker than either alone",
        "Use X25519MLKEM768 or SecP256r1MLKEM768 — both are IETF-drafted and widely implemented",
        "Pure ML-KEM (without classical) is the end goal — hybrid is the bridge during migration",
      ],
      references: [
        { title: "IETF: Hybrid Key Exchange in TLS 1.3", url: "https://datatracker.ietf.org/doc/draft-kwiatkowski-tls-ecdhe-mlkem/" },
        { title: "CloudFlare: X25519Kyber768 Deployment", url: "https://blog.cloudflare.com/post-quantum-for-all/" },
      ],
    },
    ctf: {
      scenario: "Configure a TLS server to support hybrid X25519MLKEM768 for new connections while maintaining backward compatibility with X25519-only clients.",
      hint: "Configure the TLS server with both classical and hybrid ciphersuites, then test a hybrid handshake.",
      hints: [
        "Read the hybrid TLS config guide. Run: cat hybrid-tls-guide.txt",
        "Configure the server with hybrid and classical ciphersuites. Run: configure-hybrid-tls",
        "Test the hybrid handshake with a PQC-capable client. Run: test-hybrid-handshake",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/hybrid-tls-guide.txt", value: "FLAG{HYBRID_", label: "Hybrid TLS Guide — X25519MLKEM768 Config" },
        { trigger: "configure-hybrid-tls", value: "X25519_MLKEM768_", label: "TLS Configured — Hybrid Ciphersuites Active" },
        { trigger: "test-hybrid-handshake", value: "TLS_MIGR8}", label: "Hybrid Handshake — PQC Key Exchange Confirmed" },
      ],
      files: {
        "/hybrid-tls-guide.txt": [
          "HYBRID TLS 1.3 CONFIGURATION GUIDE",
          "Priority ciphersuites:",
          "  1. X25519MLKEM768 (hybrid — PQC clients)",
          "  2. X25519 (classical — legacy clients)",
          "Backward compatible: yes",
          "",
          "Sequence: configure-hybrid-tls → test-hybrid-handshake → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "hybrid-tls-guide.txt", isDir: false }] },
      extraCommands: {
        "configure-hybrid-tls": (_args: string[]) => ({
          lines: [
            "Configuring TLS 1.3 with hybrid ciphersuites...",
            "  Added: X25519MLKEM768 (priority 1 — PQC hybrid)",
            "  Added: X25519 (priority 2 — classical fallback)",
            "  Removed: RSA key exchange ciphersuites",
            "Server configured. PQC-capable clients will use hybrid.",
            "Legacy clients will fall back to X25519 (no quantum protection).",
          ],
        }),
        "test-hybrid-handshake": (_args: string[]) => ({
          lines: [
            "TLS 1.3 handshake with PQC-capable client:",
            "  ClientHello: key_share = [X25519, MLKEM768]",
            "  ServerHello: selected X25519MLKEM768",
            "  Key exchange: X25519 + ML-KEM-768 encapsulation",
            "  Session key: HKDF(K_x25519 || K_mlkem) — hybrid",
            "  HNDL protection: ACTIVE ✓",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b08: PQC in TLS ─────────────────────────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Let's Encrypt / ISRG", location: "San Francisco, California, USA", era: "2025 CE", emoji: "🔒" },
    id: "quantum-b08",
    order: 8,
    title: "Quantum-Safe TLS",
    subtitle: "Deploying PQC in TLS 1.3 — Ciphersuites, Certificates, and Libraries",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-tls", name: "TLS Quantum Guard", emoji: "🔒" },
    challengeType: "ctf",
    info: {
      tagline: "TLS is the most deployed security protocol on earth — migrating it to post-quantum algorithms requires changes at every layer.",
      year: 2025,
      overview: [
        "TLS (Transport Layer Security) secures HTTPS, SMTP, VPNs, and hundreds of other protocols. Migrating TLS to post-quantum cryptography requires changes at three layers: (1) key exchange — replace RSA/ECDH with ML-KEM (or hybrid), (2) certificate signatures — replace RSA/ECDSA with ML-DSA in certificates, (3) handshake authentication — replace ECDSA with ML-DSA for client/server authentication.",
        "TLS 1.3 is well-positioned for PQC migration: its clean separation of key exchange, authentication, and encryption makes ciphersuite changes straightforward. The main challenges are library support, certificate chain size increases, and backward compatibility with TLS 1.2 deployments.",
        "Current library status: BoringSSL (Google) supports ML-KEM-768 hybrid; OpenSSL 3.x has PQC support via OQS provider; wolfSSL has native PQC support. CloudFlare, Chrome, and Firefox have shipped hybrid PQC in production. Let's Encrypt is evaluating PQC certificate issuance.",
      ],
      technical: {
        title: "TLS PQC Migration — Three Layers",
        body: [
          "Layer 1 (Key Exchange): Replace ECDHE with hybrid X25519MLKEM768 or pure MLKEM768. This is the most urgent change — protects against HNDL attacks on today's sessions. No certificate change needed. Deployable immediately using existing CA infrastructure.",
          "Layer 2 (Certificates): Replace RSA/ECDSA signing in leaf certificates, intermediate CAs, and root CAs with ML-DSA. This requires CA cooperation and browser trust store changes. Larger certificate sizes (ML-DSA: 2420+ byte signatures vs 64-byte ECDSA) increase TLS handshake sizes by ~3-4KB.",
          "Layer 3 (Mutual TLS): Replace ECDSA client certificates with ML-DSA. Required for mTLS in zero-trust architectures. Same signature size concerns as server certificates.",
        ],
        codeExample: {
          label: "OpenSSL with OQS provider — PQC TLS server configuration",
          code: `# OpenSSL with Open Quantum Safe provider
# https://openquantumsafe.org/applications/tls.html

# Install OQS provider
openssl genrsa -out ca.key 2048  # Classical CA for hybrid phase
openssl req -x509 -new -nodes -key ca.key -sha384 -days 1825 -out ca.crt

# Generate ML-DSA server key pair (for future pure PQC)
oqs-provider/openssl req -x509 -newkey mldsa65 -keyout server-mldsa.key \\
  -out server-mldsa.crt -days 365 -nodes

# Configure nginx/Apache for hybrid PQC:
# nginx.conf:
ssl_protocols TLSv1.3;
ssl_ciphers 'X25519MLKEM768:X25519:ECDHE-RSA-AES256-GCM-SHA384';
ssl_prefer_server_ciphers on;

# Test PQC handshake:
oqs-provider/openssl s_client -connect example.com:443 \\
  -curves X25519MLKEM768:X25519
# Output: Protocol: TLSv1.3, Key Share: X25519MLKEM768 (hybrid)`,
        },
      },
      incident: {
        title: "Let's Encrypt PQC Certificate Planning — 400M Certificates",
        when: "2024–2027",
        where: "Let's Encrypt — 400+ million active certificates globally",
        impact: "PQC certificate issuance at scale — largest PKI migration in history",
        body: [
          "Let's Encrypt issues over 400 million certificates globally — the largest CA by volume. Migrating to PQC certificate signatures (ML-DSA) represents the largest PKI migration in internet history. Let's Encrypt has begun evaluating PQC certificate issuance, with phased rollout planned for 2025-2027.",
          "The main challenges: ML-DSA certificates are ~3-4KB larger than ECDSA certificates (due to 2420+ byte signatures), affecting TLS handshake sizes and mobile performance. Root store changes (adding PQC root CAs to browser trust stores) require coordination with Mozilla, Apple, Microsoft, and Google — a multi-year process.",
        ],
      },
      diagram: {
        nodes: [
          { label: "TLS 1.3 ClientHello", sub: "key_share: X25519 + MLKEM768", type: "system" },
          { label: "TLS ServerHello", sub: "selects X25519MLKEM768, sends ML-KEM ciphertext", type: "attacker" },
          { label: "Certificate Chain", sub: "ML-DSA signatures (3-4KB larger)", type: "victim" },
          { label: "Quantum-Safe Session", sub: "HNDL protection active", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "CloudFlare deploys X25519Kyber768 — first production PQC TLS" },
        { year: 2024, event: "OpenSSL 3.x OQS provider — PQC TLS in open-source stack", highlight: true },
        { year: 2025, event: "IETF finalizes hybrid TLS ciphersuite RFCs" },
        { year: 2027, event: "Expected: Let's Encrypt begins issuing PQC leaf certificates" },
        { year: 2030, event: "Target: major browsers require hybrid/PQC for HTTPS" },
      ],
      keyTakeaways: [
        "Deploy PQC key exchange first (X25519MLKEM768) — no CA changes needed, immediate HNDL protection",
        "PQC certificates are larger — test impact on mobile performance and CDN caching before mass deployment",
        "OpenSSL+OQS provider and BoringSSL are production-ready for PQC TLS key exchange today",
        "Certificate migration requires root store coordination — start CA evaluation now, expect 2-3 year timeline",
      ],
      references: [
        { title: "Open Quantum Safe — TLS 1.3 with PQC", url: "https://openquantumsafe.org/applications/tls.html" },
        { title: "IETF Draft: ML-KEM in TLS 1.3", url: "https://datatracker.ietf.org/doc/draft-kwiatkowski-tls-ecdhe-mlkem/" },
      ],
    },
    ctf: {
      scenario: "Deploy a quantum-safe TLS 1.3 server using OpenSSL with OQS provider. Configure hybrid key exchange, generate a PQC certificate, and verify a client can establish a PQC-protected session.",
      hint: "Configure OpenSSL with OQS provider for X25519MLKEM768, generate an ML-DSA server certificate, and test the TLS handshake.",
      hints: [
        "Read the PQC TLS deployment guide. Run: cat pqc-tls-guide.txt",
        "Deploy the TLS server with hybrid PQC configuration. Run: deploy-pqc-tls",
        "Test the quantum-safe handshake from a PQC client. Run: test-pqc-client",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/pqc-tls-guide.txt", value: "FLAG{PQC_TLS13_", label: "TLS Guide — PQC Deployment Steps" },
        { trigger: "deploy-pqc-tls", value: "MLKEM768_OQS_", label: "Server Deployed — Hybrid Ciphersuites Active" },
        { trigger: "test-pqc-client", value: "DEPLOY3D}", label: "PQC Handshake — HNDL Protection Confirmed" },
      ],
      files: {
        "/pqc-tls-guide.txt": [
          "PQC TLS 1.3 DEPLOYMENT GUIDE",
          "Stack: OpenSSL 3.2 + Open Quantum Safe provider",
          "Key exchange: X25519MLKEM768 (hybrid, priority 1)",
          "Certificate: ML-DSA-65 signed (or hybrid RSA+MLDSA)",
          "",
          "Sequence: deploy-pqc-tls → test-pqc-client → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "pqc-tls-guide.txt", isDir: false }] },
      extraCommands: {
        "deploy-pqc-tls": (_args: string[]) => ({
          lines: [
            "Installing OQS provider for OpenSSL 3.2...",
            "Generating ML-DSA-65 server certificate...",
            "  Server cert: server.crt (ML-DSA-65, 3293-byte signature)",
            "Configuring TLS 1.3 ciphersuites:",
            "  Priority 1: X25519MLKEM768 (hybrid PQC)",
            "  Priority 2: X25519 (classical fallback)",
            "Server started on :443. HNDL protection: ACTIVE.",
          ],
        }),
        "test-pqc-client": (_args: string[]) => ({
          lines: [
            "TLS 1.3 handshake (PQC client → server):",
            "  ClientHello: curves=[X25519MLKEM768, X25519]",
            "  ServerHello: selected X25519MLKEM768",
            "  Key exchange: hybrid (X25519 + ML-KEM-768 encapsulation)",
            "  Certificate: ML-DSA-65 — VALID ✓",
            "  Session key: HKDF(K_x25519 || K_mlkem) — quantum-safe",
            "PQC TLS connection established. Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b09: Crypto Inventory and Migration ─────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "CISA PQC Center of Excellence", location: "Washington DC, USA", era: "2025 CE", emoji: "📊" },
    id: "quantum-b09",
    order: 9,
    title: "The Crypto Inventory",
    subtitle: "Discovering and Cataloging Cryptographic Assets for PQC Migration",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-inventory", name: "Crypto Archaeologist", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "You can't migrate what you haven't found — crypto discovery is the most important and most underestimated step in PQC migration.",
      year: 2025,
      overview: [
        "Post-quantum cryptography migration begins with a comprehensive inventory of all cryptographic assets in the organization. Modern enterprise IT has cryptography embedded in thousands of places: TLS certificates in load balancers, SSH keys in CI/CD pipelines, RSA keys in VPN solutions, ECDSA in code signing, x509 certificates in API gateways, and hardware security modules throughout the infrastructure.",
        "Cryptographic discovery tools scan codebases (CBOM — Cryptography Bill of Materials), certificate inventories, network traffic, and configuration files to identify all cryptographic usage. NIST, CISA, and ISO are developing CBOM standards analogous to SBOM (Software Bill of Materials) to enable systematic cryptographic asset management.",
        "The discovery phase is harder than it seems: cryptography is often buried in dependencies, embedded in binary firmware, or hidden in vendor-managed infrastructure. Organizations that attempt migration without complete discovery find crypto assets that were missed and must restart the migration process.",
      ],
      technical: {
        title: "Crypto Discovery Tools and CBOM",
        body: [
          "Tools for cryptographic discovery: (1) IBM Cryptography Bill of Materials (CBOM) generator — scans codebases for crypto usage; (2) CISA's Crypto Inventory Template — structured assessment spreadsheet; (3) Network scanning tools (e.g., SSL Labs, Qualys SSL) — enumerate certificates; (4) Cryptosense Analyzer — discovers crypto in Java/Python code; (5) OQS-TLS scanner — identifies PQC-ready vs classical-only TLS.",
          "A complete CBOM includes: algorithm used, key size, key type (symmetric/asymmetric/hash), protocol, data sensitivity, renewal schedule, owner, and migration priority. This feeds directly into the migration prioritization model.",
        ],
        codeExample: {
          label: "CBOM generation — scanning a codebase for cryptographic usage",
          code: `# Python CBOM scanner (simplified)
import ast, os, re

QUANTUM_VULNERABLE = {"RSA", "ECDH", "ECDSA", "DH", "SHA1", "MD5", "3DES", "AES128"}
QUANTUM_SAFE = {"ML-KEM", "ML-DSA", "SLH-DSA", "AES256", "SHA384", "SHA512"}

def scan_file(filepath):
    findings = []
    with open(filepath) as f:
        content = f.read()
    for algo in QUANTUM_VULNERABLE:
        if re.search(algo, content, re.IGNORECASE):
            findings.append({"file": filepath, "algorithm": algo, "status": "VULNERABLE"})
    return findings

# Scan entire codebase
findings = []
for root, dirs, files in os.walk("."):
    for f in files:
        if f.endswith((".py", ".js", ".ts", ".go", ".java")):
            findings.extend(scan_file(os.path.join(root, f)))

print(f"Found {len(findings)} cryptographic vulnerabilities")
for f in findings:
    print(f"{f['file']}: {f['algorithm']} — {f['status']}")`,
        },
      },
      incident: {
        title: "Heartbleed Retrospective — Why Inventory Matters",
        when: "2014 (Heartbleed); 2025 (PQC context)",
        where: "Global — all OpenSSL-using systems",
        impact: "Heartbleed showed organizations didn't know what used OpenSSL; PQC migration requires not making the same mistake",
        body: [
          "The 2014 Heartbleed vulnerability (CVE-2014-0160 in OpenSSL) caused widespread panic because organizations didn't know which systems used OpenSSL and thus which systems were affected. Many large organizations took weeks to identify all affected systems — during which time attackers had full access to their private keys.",
          "PQC migration is a 'slow Heartbleed': organizations that don't maintain a current cryptographic inventory will face the same discovery problem when migrating. The lesson is to build continuous crypto discovery into the security program now, so that when Q-Day approaches, the inventory already exists and migration can proceed rapidly.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CBOM Scanner", sub: "scan code + config + network traffic", type: "system" },
          { label: "Crypto Asset Catalog", sub: "algorithm, key size, owner, sensitivity", type: "attacker" },
          { label: "Risk Prioritization", sub: "P1/P2/P3/P4 by HNDL exposure", type: "victim" },
          { label: "Migration Roadmap", sub: "prioritized, tracked, measured", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "Heartbleed — organizations couldn't find all OpenSSL usage" },
        { year: 2023, event: "CISA releases PQC crypto inventory template and methodology" },
        { year: 2024, event: "NIST begins CBOM standardization — cryptography bill of materials", highlight: true },
        { year: 2025, event: "Federal agencies complete mandatory crypto inventory (CISA requirement)" },
        { year: 2027, event: "Expected: CBOM required for federal contractors" },
      ],
      keyTakeaways: [
        "Start crypto inventory before migration — you will discover assets you didn't know existed",
        "Use CBOM tools (IBM, Cryptosense) and network scanners to find all crypto usage",
        "Prioritize internet-facing RSA/ECDH assets first — highest HNDL exposure",
        "Maintain a living CBOM: crypto assets change with every software update and deployment",
      ],
      references: [
        { title: "CISA: Cryptographic Inventory Template", url: "https://www.cisa.gov/sites/default/files/2023-11/CISA_Quantum_Readiness_Roadmap_508c.pdf" },
        { title: "IBM: Cryptography Bill of Materials (CBOM)", url: "https://research.ibm.com/publications/cbom" },
      ],
    },
    ctf: {
      scenario: "Run a cryptographic inventory scan on an enterprise environment. Identify all quantum-vulnerable assets, classify them by risk, and generate the CBOM for the migration team.",
      hint: "Use the crypto scanner to find all RSA/ECDSA usage, then classify by sensitivity and generate the CBOM.",
      hints: [
        "Read the crypto inventory brief. Run: cat inventory-brief.txt",
        "Run the cryptographic asset scanner. Run: crypto-scan enterprise",
        "Generate the classified CBOM with migration priorities. Run: cbom-generate",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/inventory-brief.txt", value: "FLAG{CBOM_", label: "Inventory Brief — CBOM Methodology" },
        { trigger: "crypto-scan enterprise", value: "CRYPTO_INVENT0RY_", label: "Scan Complete — 312 Crypto Assets Found" },
        { trigger: "cbom-generate", value: "PQC_READY}", label: "CBOM Generated — Migration Roadmap Ready" },
      ],
      files: {
        "/inventory-brief.txt": [
          "CRYPTO INVENTORY BRIEF",
          "Scope: all enterprise systems (on-prem + cloud)",
          "Target: identify all RSA/ECDSA/ECDH usage",
          "Output: CBOM with migration priorities",
          "",
          "Sequence: crypto-scan → cbom-generate → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "inventory-brief.txt", isDir: false }] },
      extraCommands: {
        "crypto-scan": (_args: string[]) => ({
          lines: [
            "Scanning enterprise for cryptographic assets...",
            "  TLS certificates scanned: 847",
            "  Code repositories scanned: 234",
            "  Config files parsed: 1,293",
            "Found 312 quantum-vulnerable assets:",
            "  RSA-2048 certificates: 189 (internet-facing: 67)",
            "  ECDSA certificates: 98 (internet-facing: 45)",
            "  RSA SSH host keys: 25 | ECDH in config: 0 explicit",
          ],
        }),
        "cbom-generate": (_args: string[]) => ({
          lines: [
            "Generating Cryptography Bill of Materials...",
            "  P1 (migrate immediately): 67 RSA/ECDSA certs — internet-facing",
            "  P2 (migrate within 2 years): 121 assets — internal, sensitive",
            "  P3 (migrate within 5 years): 124 assets — internal, lower sensitivity",
            "CBOM exported: enterprise-cbom-2025.json (312 assets)",
            "Migration roadmap: ready for CISO review.",
            "Fragment collected.",
          ],
        }),
      },
    },
  },

  // ─── quantum-b10: PQC Implementation and Testing ────────────────────────────
  {
    epochId: "quantum-2",
    wonder: { name: "Trail of Bits Security Research", location: "New York, USA", era: "2025 CE", emoji: "🧪" },
    id: "quantum-b10",
    order: 10,
    title: "Verify Before You Trust",
    subtitle: "PQC Implementation Testing — Validation, Interoperability, and Side-Channels",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "badge-qb-verify", name: "PQC Validator", emoji: "🧪" },
    challengeType: "ctf",
    info: {
      tagline: "A post-quantum algorithm is only as secure as its implementation — validate, test, and audit PQC code before trusting it.",
      year: 2025,
      overview: [
        "Post-quantum cryptographic algorithms are more complex than RSA and ECDSA. Implementation mistakes — improper rejection sampling, non-constant-time operations, incorrect parameter validation — can completely undermine the quantum security guarantees. Multiple PQC implementation vulnerabilities have been discovered since the NIST competition began.",
        "NIST, ACVTS (Automated Cryptographic Validation Testing System), and FIPS 140-3 testing labs provide validation programs for PQC implementations. Organizations must use FIPS 140-3 validated modules for federal systems — and should prefer validated implementations for all high-security applications.",
        "Key testing areas: (1) Known-answer tests (KAT) — verify algorithm produces correct output for known inputs; (2) Interoperability testing — verify cross-library compatibility; (3) Side-channel testing — verify constant-time operation; (4) Fault injection — verify behavior under hardware faults.",
      ],
      technical: {
        title: "PQC Validation — NIST ACVTS and FIPS 140-3",
        body: [
          "NIST's Automated Cryptographic Validation Testing System (ACVTS) provides Known-Answer Tests (KAT) for all FIPS PQC algorithms. An implementation must pass all KATs before claiming FIPS conformance. The ACVTS generates test vectors for all parameter sets and edge cases.",
          "Side-channel validation is particularly important for ML-KEM and FALCON. Timing side-channels occur when the execution time of a cryptographic operation depends on secret data. Constant-time implementations run in identical time regardless of secret values. FALCON's Gaussian sampling is especially prone to timing variations.",
        ],
        codeExample: {
          label: "PQC validation — running KAT tests on ML-KEM implementation",
          code: `import oqs
import json

# NIST Known-Answer Test (KAT) validation for ML-KEM-768
def validate_mlkem768(kat_file="kem_kat_ml-kem-768.json"):
    with open(kat_file) as f:
        kat_vectors = json.load(f)

    passed = failed = 0
    with oqs.KeyEncapsulation("Kyber768") as kem:
        for vector in kat_vectors["testGroups"][0]["tests"]:
            # Test key generation
            pk, sk = vector["pk"], vector["sk"]
            # Test encapsulation
            ct_expected = bytes.fromhex(vector["ct"])
            ss_expected = bytes.fromhex(vector["ss"])

            # Verify decapsulation
            ct = bytes.fromhex(vector["ct"])
            ss = kem.decap_secret_with_key(ct, bytes.fromhex(sk))

            if ss == ss_expected:
                passed += 1
            else:
                failed += 1
                print(f"FAILED: test {vector['tcId']}")

    print(f"ML-KEM-768 KAT: {passed} passed, {failed} failed")
    # All 100 KAT vectors must pass for FIPS conformance`,
        },
      },
      incident: {
        title: "ML-KEM Timing Side-Channel Research — Kyber-90s Variant",
        when: "2022",
        where: "Academic research — Kyber-90s (SHA-3 variant of Kyber)",
        impact: "Timing attack on non-constant-time SHA-3 reduced key recovery to minutes",
        body: [
          "In 2022, researchers published a timing side-channel attack against a non-constant-time implementation of Kyber-90s (a SHA-3 based Kyber variant). The attack exploited timing variations in the SHA-3 implementation to recover the private key with as few as 200,000 measurements on a local machine.",
          "The main Kyber/ML-KEM specification was not affected — only the Kyber-90s variant with non-constant-time SHA-3. The incident reinforced that post-quantum algorithms, like all cryptographic algorithms, require constant-time implementations and should be validated before deployment.",
        ],
      },
      diagram: {
        nodes: [
          { label: "PQC Implementation", sub: "code + library + hardware", type: "system" },
          { label: "Validation Testing", sub: "KAT + interop + side-channel", type: "attacker" },
          { label: "FIPS 140-3 Validation", sub: "NIST ACVTS conformance testing", type: "victim" },
          { label: "Production Deployment", sub: "only validated, audited implementations", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "Kyber-90s timing side-channel published — constant-time requirement reinforced" },
        { year: 2024, event: "NIST ACVTS updated with ML-KEM/ML-DSA/SLH-DSA test vectors", highlight: true },
        { year: 2024, event: "First FIPS 140-3 validations for ML-KEM begin processing" },
        { year: 2025, event: "FIPS 140-3 validated ML-KEM modules available (IBM, Entrust)" },
        { year: 2027, event: "FIPS 140-3 mandatory for federal PQC deployments" },
      ],
      keyTakeaways: [
        "Only use FIPS 140-3 validated or thoroughly audited PQC implementations in production",
        "Run NIST ACVTS KAT vectors against any PQC library before deploying it",
        "Side-channel attacks on PQC are real — validate constant-time operation in testing",
        "Prefer liboqs, BoringSSL, or wolfSSL over rolling your own PQC implementation",
      ],
      references: [
        { title: "NIST ACVTS — Automated Cryptographic Validation", url: "https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program" },
        { title: "Open Quantum Safe — Validated Implementations", url: "https://openquantumsafe.org/" },
      ],
    },
    ctf: {
      scenario: "Validate an ML-KEM-768 implementation by running NIST Known-Answer Tests, then test for timing side-channels and verify FIPS 140-3 compatibility.",
      hint: "Run the KAT vectors against the implementation, then test constant-time operation.",
      hints: [
        "Read the validation guide. Run: cat validation-guide.txt",
        "Run NIST KAT vectors against the ML-KEM implementation. Run: run-kat ML-KEM-768",
        "Test the implementation for timing side-channels. Run: timing-test ML-KEM-768",
        "Run 'assemble' to view the assembled flag and get the submit command",
      ],
      fragments: [
        { trigger: "/validation-guide.txt", value: "FLAG{MLKEM_KAT_", label: "Validation Guide — KAT + Side-Channel Testing" },
        { trigger: "run-kat ML-KEM-768", value: "VALID_CONSTTIME_", label: "100 KAT Vectors Passed — Implementation Valid" },
        { trigger: "timing-test ML-KEM-768", value: "FIPS}", label: "Timing Test Passed — Constant-Time Verified" },
      ],
      files: {
        "/validation-guide.txt": [
          "PQC IMPLEMENTATION VALIDATION GUIDE",
          "Step 1: Run NIST ACVTS KAT vectors (100 test cases)",
          "Step 2: Test for timing side-channels (constant-time check)",
          "Step 3: Verify FIPS 140-3 boundary compliance",
          "",
          "Sequence: run-kat → timing-test → assemble",
        ].join("\n"),
      },
      dirs: { "/": [{ name: "validation-guide.txt", isDir: false }] },
      extraCommands: {
        "run-kat": (_args: string[]) => ({
          lines: [
            "Running 100 NIST KAT vectors for ML-KEM-768...",
            "  KeyGen KAT: 25/25 PASSED ✓",
            "  Encapsulation KAT: 25/25 PASSED ✓",
            "  Decapsulation KAT: 25/25 PASSED ✓",
            "  Edge cases: 25/25 PASSED ✓",
            "Result: 100/100 — CONFORMANT with FIPS 203",
          ],
        }),
        "timing-test": (_args: string[]) => ({
          lines: [
            "Running constant-time validation on ML-KEM-768...",
            "  Key generation: stddev 0.8μs (p=0.73 — not timing-dependent) ✓",
            "  Encapsulation: stddev 0.6μs (p=0.81 — constant-time) ✓",
            "  Decapsulation: stddev 1.1μs (p=0.69 — constant-time) ✓",
            "  Rejection sampling path: constant-time ✓",
            "Timing analysis: NO side-channel detected — FIPS 140-3 compliant",
            "Fragment collected.",
          ],
        }),
      },
    },
  },
];
