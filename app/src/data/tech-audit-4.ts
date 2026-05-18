import type { StageConfig, EpochConfig } from "./types";

export const techAudit4Epoch: EpochConfig = {
  id: "tech-audit-4",
  name: "Continuous Monitoring 2.0",
  subtitle: "AI-Powered Detection and Response",
  description: "Master next-generation continuous monitoring: ML-enhanced SIEM, UEBA, NDR, CSPM, SOAR automation, deception technology, Zero Trust telemetry, XDR, and compliance monitoring — the full stack of modern SOC operations.",
  emoji: "📡",
  color: "rose",
  unlocked: true,
};

export const techAudit4Stages: StageConfig[] = [
  // ─── audit-cm01: The Monitoring Baseline ─────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "NIST Headquarters", location: "Gaithersburg, Maryland", era: "Present Day", emoji: "📋" },
    id: "audit-cm01",
    order: 1,
    title: "The Monitoring Baseline",
    subtitle: "NIST SP 800-137 — Information Security Continuous Monitoring",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-01", name: "Monitoring Architect", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "You cannot defend what you cannot see. Continuous monitoring turns visibility into security.",
      year: 2011,
      overview: [
        "NIST Special Publication 800-137 defines Information Security Continuous Monitoring (ISCM) as maintaining ongoing awareness of information security, vulnerabilities, and threats to support organizational risk management decisions. Published in 2011 and updated through 2024, it remains the authoritative federal framework for continuous monitoring programs.",
        "ISCM is built on six steps: Define, Establish, Implement, Analyze/Report, Respond, and Review. These steps form a continuous cycle — not a one-time project. The framework distinguishes between three monitoring tiers: the organizational tier (governance and strategy), the mission/business process tier (process-level risk), and the information system tier (technical controls and data).",
        "Modern ISCM programs go beyond compliance checkbox monitoring. They establish metrics, define monitoring frequencies based on asset criticality, automate data collection, and feed findings into risk management decisions. The goal is not just detecting incidents — it is maintaining an accurate, real-time picture of organizational security posture.",
      ],
      technical: {
        title: "ISCM Implementation Architecture",
        body: [
          "A production ISCM program requires four layers: data collection (agents, APIs, log forwarders), normalization (parsing into a common schema like ECS or OCSF), analysis (correlation rules, ML models, threat intelligence enrichment), and response (dashboards, alerts, ticketing integration, automated playbooks).",
          "Monitoring frequency is driven by asset criticality and control volatility. A public-facing web application needs vulnerability scans daily or continuously; an air-gapped backup system may need only weekly checks. NIST 800-137 provides a frequency decision framework based on FIPS 199 categorization (Low/Moderate/High impact systems).",
        ],
        codeExample: {
          label: "ISCM metric definition (Python — organiztional security score tracker)",
          code: `import json
from datetime import datetime, timedelta

class ISCMMetric:
    def __init__(self, name: str, frequency_hours: int, criticality: str):
        self.name = name
        self.frequency_hours = frequency_hours
        self.criticality = criticality  # LOW, MODERATE, HIGH
        self.last_collected: datetime | None = None
        self.current_value: float | None = None

    def is_stale(self) -> bool:
        if self.last_collected is None:
            return True
        age = datetime.utcnow() - self.last_collected
        return age > timedelta(hours=self.frequency_hours)

    def status(self) -> dict:
        return {
            "metric": self.name,
            "criticality": self.criticality,
            "stale": self.is_stale(),
            "last_collected": self.last_collected.isoformat() if self.last_collected else None,
            "value": self.current_value,
        }

# High-impact systems: continuous (1h); Moderate: daily (24h); Low: weekly (168h)
iscm_metrics = [
    ISCMMetric("patch_compliance_pct", frequency_hours=24, criticality="HIGH"),
    ISCMMetric("vuln_scan_coverage_pct", frequency_hours=1, criticality="HIGH"),
    ISCMMetric("mfa_enforcement_pct", frequency_hours=24, criticality="MODERATE"),
    ISCMMetric("log_forwarding_health_pct", frequency_hours=1, criticality="HIGH"),
]

report = [m.status() for m in iscm_metrics]
print(json.dumps(report, indent=2))`,
        },
      },
      incident: {
        title: "OPM Data Breach — Monitoring Gap (2015)",
        when: "March 2014 – June 2015",
        where: "Office of Personnel Management, Washington D.C.",
        impact: "21.5 million security clearance records stolen; breach undetected for over a year",
        body: [
          "The Office of Personnel Management breach was the largest theft of US government personnel data in history. Attackers — attributed to Chinese state actors — maintained persistent access for over 14 months before detection. The OPM's Inspector General had warned repeatedly about inadequate continuous monitoring capabilities, including the absence of a comprehensive ISCM program.",
          "Post-breach analysis revealed OPM lacked visibility into lateral movement within its network, had no behavioral baselining of privileged user accounts, and had not implemented the CDM (Continuous Diagnostics and Mitigation) program mandated by DHS. A functioning ISCM program with anomaly detection on privileged account access would likely have detected the breach within days, not months.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Define & Establish", sub: "metrics, frequency, tools", type: "system" },
          { label: "Collect & Normalize", sub: "agents, APIs, parsers", type: "attacker" },
          { label: "Analyze & Report", sub: "correlation, enrichment", type: "victim" },
          { label: "Respond & Review", sub: "tickets, playbooks, review", type: "result" },
        ],
      },
      timeline: [
        { year: 2011, event: "NIST SP 800-137 published — federal ISCM framework established" },
        { year: 2014, event: "DHS CDM program launched — continuous monitoring across federal agencies" },
        { year: 2015, event: "OPM breach revealed — 14-month dwell time exposes ISCM gaps", highlight: true },
        { year: 2022, event: "NIST SP 800-137A published — ISCM program assessment guidance" },
        { year: 2024, event: "AI-native ISCM platforms emerge — LLM-assisted alert triage and reporting" },
      ],
      keyTakeaways: [
        "ISCM is a continuous cycle of six steps — not a one-time compliance project",
        "Monitoring frequency must match asset criticality (FIPS 199: Low/Moderate/High)",
        "Three tiers: organizational governance, business process, and information system",
        "Visibility gaps cause long dwell times — OPM went undetected for 14 months",
        "CDM and ISCM programs must be funded, staffed, and reviewed regularly",
      ],
      references: [
        { title: "NIST SP 800-137 Rev. 1", url: "https://csrc.nist.gov/publications/detail/sp/800-137/1/final" },
        { title: "DHS CDM Program", url: "https://www.cisa.gov/cdm" },
        { title: "OPM Breach Congressional Report", url: "https://oversight.house.gov/sites/democrats.oversight.house.gov/files/OPM%20Breach%20Report.pdf" },
      ],
    },
    ctf: {
      scenario: "You've gained access to an organization's ISCM program documentation server. Three fragments of the master monitoring policy contain the flag. The files are split across the policy, metrics, and review directories.",
      hint: "Navigate the ISCM policy directory tree. Three policy fragments each hold part of the flag.",
      hints: [
        "Start with `ls /iscm-policy` to see the directory structure.",
        "Each subdirectory (policy/, metrics/, review/) contains a fragment file.",
        "Concatenate the flag_fragment values from all three files in order.",
      ],
      files: {
        "/iscm-policy/policy/iscm-charter.txt": `# ISCM Program Charter — CLASSIFIED INTERNAL

Organization: Federal Civilian Agency (REDACTED)
Program Owner: CISO
Last Updated: 2024-01-15
FIPS 199 Categorization: HIGH

## Purpose
This charter establishes the Information Security Continuous Monitoring
program in accordance with NIST SP 800-137A.

## Monitoring Tiers
- Tier 1 (Organizational): CISO governance, quarterly review
- Tier 2 (Mission/Business): Process owners, monthly review
- Tier 3 (Information Systems): SOC team, continuous

## Flag Fragment A
flag_fragment_a = "FLAG{1SCM_"

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  ISCM programs define monitoring at three tiers — governance, process,
  and system level. Each tier has different owners and review cadences.
─────────────────────────────────────────────────────────────────────`,
        "/iscm-policy/metrics/kpi-registry.txt": `# ISCM KPI Registry

HIGH-Impact Systems (continuous / 1h frequency):
  - vuln_scan_coverage_pct       target: ≥ 98%
  - log_forwarding_health_pct    target: ≥ 99.5%
  - critical_patch_compliance    target: ≥ 95% within 15 days

MODERATE-Impact Systems (daily / 24h frequency):
  - mfa_enforcement_pct          target: ≥ 100%
  - privileged_account_review    target: monthly

LOW-Impact Systems (weekly / 168h frequency):
  - asset_inventory_accuracy     target: ≥ 90%

## Flag Fragment B
flag_fragment_b = "C0NT1NU0US_"

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  Monitoring frequency is tied to FIPS 199 impact levels. High-impact
  systems require near-real-time metrics; low-impact allows weekly checks.
─────────────────────────────────────────────────────────────────────`,
        "/iscm-policy/review/annual-review-2024.txt": `# ISCM Annual Review — FY2024

## Summary
Program maturity score: 3.2 / 5.0 (Defined)
Prior year: 2.8 / 5.0 (Developing)
Target FY2025: 4.0 / 5.0 (Managed)

## Key Gaps Identified
1. Alert triage mean time: 4.2 hours (target: < 1 hour)
2. SOAR automation coverage: 31% of playbooks (target: 70%)
3. Cloud asset discovery lag: 6 hours (target: real-time)

## Remediation Plan
- Deploy SOAR playbooks for top 10 alert types by Q2
- Integrate cloud APIs for real-time asset inventory
- Hire two additional SOC Tier 2 analysts

## Flag Fragment C
flag_fragment_c = "V1S1B1L1TY}"

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  ISCM maturity is measured and improved annually. Gaps in SOAR coverage
  and alert triage time are common — and measurable targets for improvement.
─────────────────────────────────────────────────────────────────────`,
        "/iscm-policy/README.md": `# ISCM Policy Server

This server hosts the organization's ISCM program documentation.

## Directory Structure
- policy/    → Program charter and governance documents
- metrics/   → KPI registry and monitoring frequency definitions
- review/    → Annual review reports and gap analysis

Access is restricted to ISCM program staff and auditors.
All access is logged per NIST SP 800-137A Section 3.4.`,
      },
      dirs: {
        "/": [{ name: "iscm-policy", isDir: true }],
        "/iscm-policy": [
          { name: "README.md", isDir: false },
          { name: "policy", isDir: true },
          { name: "metrics", isDir: true },
          { name: "review", isDir: true },
        ],
        "/iscm-policy/policy": [{ name: "iscm-charter.txt", isDir: false }],
        "/iscm-policy/metrics": [{ name: "kpi-registry.txt", isDir: false }],
        "/iscm-policy/review": [{ name: "annual-review-2024.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/iscm-policy/policy/iscm-charter.txt", value: "FLAG{1SCM_", label: "Fragment A — Charter" },
        { trigger: "/iscm-policy/metrics/kpi-registry.txt", value: "C0NT1NU0US_", label: "Fragment B — Metrics" },
        { trigger: "/iscm-policy/review/annual-review-2024.txt", value: "V1S1B1L1TY}", label: "Fragment C — Review" },
      ],
    },
  },

  // ─── audit-cm02: Next-Gen SIEM ───────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "IBM Security Intelligence Center", location: "Cambridge, Massachusetts", era: "Present Day", emoji: "🧠" },
    id: "audit-cm02",
    order: 2,
    title: "The Intelligence Engine",
    subtitle: "Next-Gen SIEM — ML-enhanced detection beyond signatures",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-02", name: "SIEM Analyst", emoji: "🧠" },
    challengeType: "ctf",
    info: {
      tagline: "Signatures catch yesterday's attacks. ML catches tomorrow's.",
      year: 2020,
      overview: [
        "Traditional SIEM platforms (Splunk, ArcSight, QRadar) operate on signature-based detection: engineers write correlation rules that match known attack patterns. This approach works well for commodity attacks but fails against novel techniques, living-off-the-land (LOTL) attacks, and slow-burn APT campaigns that stay below individual rule thresholds.",
        "Next-generation SIEM platforms (Microsoft Sentinel, Google Chronicle, Elastic SIEM, Securonix) augment rule-based detection with machine learning: unsupervised anomaly detection, supervised classifiers trained on labeled attack data, and graph-based entity resolution. They ingest petabyte-scale data from cloud APIs, endpoint agents, network taps, and identity providers — not just traditional syslog.",
        "The key architectural shift in next-gen SIEM is normalization to a common schema (OCSF — Open Cybersecurity Schema Framework, or Elastic Common Schema) before storage. This allows a single detection rule to match across dozens of data sources. Combined with threat intelligence enrichment at ingest time, analysts see context-rich alerts rather than raw log lines.",
      ],
      technical: {
        title: "ML Detection Patterns in Next-Gen SIEM",
        body: [
          "Three ML techniques dominate next-gen SIEM detection: (1) Isolation Forest / DBSCAN for unsupervised outlier detection on user/entity behavior baselines; (2) gradient boosting classifiers (XGBoost, LightGBM) trained on labeled threat data for supervised detection; (3) graph neural networks for lateral movement detection by modeling authentication relationships.",
          "False positive reduction is the primary operational challenge. A SIEM generating 10,000 alerts per day with 99% false positives still produces 100 real incidents buried in noise. Next-gen SIEMs use alert clustering, deduplication, and UEBA risk scores to surface only the highest-confidence findings for analyst review.",
        ],
        codeExample: {
          label: "Anomaly detection on login events (Python / scikit-learn Isolation Forest)",
          code: `import numpy as np
from sklearn.ensemble import IsolationForest
from datetime import datetime

# Feature engineering: login behavior per user
def extract_features(login_events: list[dict]) -> np.ndarray:
    features = []
    for event in login_events:
        hour = datetime.fromisoformat(event["timestamp"]).hour
        features.append([
            hour,                              # time of day
            event.get("failed_attempts", 0),   # consecutive failures
            int(event.get("new_country", False)), # first login from this country
            event.get("bytes_out_mb", 0),      # data exfiltration signal
            int(event.get("admin_escalation", False)),  # privilege escalation
        ])
    return np.array(features)

# Train on 30 days of normal login data
normal_logins = load_events(days=30, label="normal")
X_train = extract_features(normal_logins)

model = IsolationForest(contamination=0.01, random_state=42)
model.fit(X_train)

# Score today's logins — negative scores = anomalies
todays_logins = load_events(days=1)
X_today = extract_features(todays_logins)
scores = model.decision_function(X_today)
anomalies = [e for e, s in zip(todays_logins, scores) if s < -0.1]
print(f"Anomalous logins: {len(anomalies)} of {len(todays_logins)}")`,
        },
      },
      incident: {
        title: "SolarWinds Orion Supply Chain Attack — SIEM Miss (2020)",
        when: "October 2019 – December 2020",
        where: "18,000+ organizations globally",
        impact: "9 US federal agencies compromised; 14-month undetected dwell time",
        body: [
          "The SolarWinds SUNBURST attack trojanized the Orion software build process, inserting a backdoor into legitimate signed updates. The malware was designed to evade signature-based SIEM detection: it mimicked legitimate SolarWinds traffic patterns, used existing network paths, and remained dormant for 12–14 days after installation before activating.",
          "FireEye discovered the attack not through SIEM alerts but through a human analyst noticing an unusual MFA device registration — a behavioral anomaly a next-gen SIEM with UEBA would have flagged automatically. Post-incident, Microsoft Sentinel and other next-gen platforms deployed specific SUNBURST behavioral models. The attack fundamentally shifted the industry toward ML-based detection for supply chain and LOTL threats.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Data Sources", sub: "cloud, endpoint, identity, net", type: "attacker" },
          { label: "Normalize (OCSF/ECS)", sub: "schema at ingest", type: "system" },
          { label: "ML + Rules Engine", sub: "anomaly + signatures", type: "victim" },
          { label: "Enriched Alerts", sub: "context + risk score", type: "result" },
        ],
      },
      timeline: [
        { year: 2005, event: "ArcSight / QRadar era — signature-based SIEM becomes enterprise standard" },
        { year: 2015, event: "Splunk ML Toolkit released — first ML capabilities in traditional SIEM" },
        { year: 2019, event: "Microsoft Sentinel (cloud-native SIEM) launched; Google Chronicle announced" },
        { year: 2020, event: "SolarWinds attack exposes limits of signature detection — ML SIEM adoption accelerates", highlight: true },
        { year: 2022, event: "OCSF (Open Cybersecurity Schema Framework) launched by AWS, Splunk, and 17 partners" },
        { year: 2024, event: "LLM-assisted alert triage integrated into major SIEM platforms" },
      ],
      keyTakeaways: [
        "Signature detection misses novel attacks — ML detects behavioral anomalies independent of known patterns",
        "Schema normalization (OCSF/ECS) at ingest enables cross-source detection with a single rule",
        "False positive reduction is the #1 operational SIEM challenge — risk scoring and clustering help",
        "SolarWinds showed that supply chain and LOTL attacks require behavioral, not signature, detection",
        "Next-gen SIEM ingests cloud APIs and identity providers, not just traditional syslog",
      ],
      references: [
        { title: "OCSF Schema Framework", url: "https://schema.ocsf.io/" },
        { title: "CISA SolarWinds Advisory AA20-352A", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a" },
        { title: "Microsoft Sentinel Documentation", url: "https://learn.microsoft.com/en-us/azure/sentinel/" },
      ],
    },
    ctf: {
      scenario: "You've accessed a compromised SIEM node. The breach left behind ML model artifacts and detection logs split across three directories. Collect all three flag fragments to reconstruct the incident signature.",
      hint: "The SIEM stores model configs, detection logs, and enrichment data in separate directories.",
      hints: [
        "List /siem-node to see the directory structure.",
        "Check the models/, detections/, and enrichment/ subdirectories.",
        "Each directory has one file containing a fragment value.",
      ],
      files: {
        "/siem-node/models/isolation-forest-config.json": `{
  "model_type": "IsolationForest",
  "trained_on": "30d_login_events",
  "contamination": 0.01,
  "features": ["hour_of_day", "failed_attempts", "new_country", "bytes_out_mb", "admin_escalation"],
  "last_retrained": "2024-01-10T00:00:00Z",
  "auc_roc": 0.94,
  "false_positive_rate": 0.008,
  "_fragment": "A/3",
  "flag_fragment": "FLAG{N3XT_"
}`,
        "/siem-node/detections/alert-2024-01-15.jsonl": `{"ts":"2024-01-15T03:12:44Z","user":"svc-backup","src_ip":"10.0.4.88","event":"login","anomaly_score":-0.31,"risk":"HIGH","reason":"login at 03:12 (baseline: 09:00-17:00), new_country=RU, bytes_out=2.1GB","_fragment":"B/3","flag_fragment":"G3N_S13M_"}
{"ts":"2024-01-15T03:14:01Z","user":"svc-backup","src_ip":"10.0.4.88","event":"file_access","path":"/finance/payroll-2024.xlsx","anomaly_score":-0.44,"risk":"CRITICAL"}
{"ts":"2024-01-15T03:18:22Z","user":"svc-backup","src_ip":"10.0.4.88","event":"data_export","bytes_out":2147483648,"dest":"185.220.101.45","risk":"CRITICAL"}`,
        "/siem-node/enrichment/threat-intel-hits.txt": `# Threat Intelligence Enrichment Results — 2024-01-15

IP: 185.220.101.45
  → Tor exit node (Abuse.ch)
  → Associated with Lazarus Group C2 (Recorded Future, confidence: HIGH)
  → Previous targets: financial sector, healthcare
  → Geolocation: Netherlands (AS: Frantech Solutions)

User: svc-backup
  → Service account — should NEVER initiate logins
  → Last password change: 2022-03-01 (stale)
  → Group memberships: Domain Admins (unexpected!)

_fragment: C/3
flag_fragment: D3T3CT10N}"`,
        "/siem-node/README.md": `# SIEM Forensic Node

This node contains artifacts from the Jan 15 2024 incident investigation.

Directories:
  models/     → ML model configurations and performance metrics
  detections/ → Raw alert JSONL from the anomaly detection pipeline
  enrichment/ → Threat intelligence and entity enrichment results

All data is read-only for forensic preservation.`,
      },
      dirs: {
        "/": [{ name: "siem-node", isDir: true }],
        "/siem-node": [
          { name: "README.md", isDir: false },
          { name: "models", isDir: true },
          { name: "detections", isDir: true },
          { name: "enrichment", isDir: true },
        ],
        "/siem-node/models": [{ name: "isolation-forest-config.json", isDir: false }],
        "/siem-node/detections": [{ name: "alert-2024-01-15.jsonl", isDir: false }],
        "/siem-node/enrichment": [{ name: "threat-intel-hits.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/siem-node/models/isolation-forest-config.json", value: "FLAG{N3XT_", label: "Fragment A — Model Config" },
        { trigger: "/siem-node/detections/alert-2024-01-15.jsonl", value: "G3N_S13M_", label: "Fragment B — Alert Log" },
        { trigger: "/siem-node/enrichment/threat-intel-hits.txt", value: "D3T3CT10N}", label: "Fragment C — Intel Hit" },
      ],
    },
  },

  // ─── audit-cm03: UEBA ────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Securonix UEBA Research Lab", location: "Addison, Texas", era: "Present Day", emoji: "👤" },
    id: "audit-cm03",
    order: 3,
    title: "The Behavioral Lens",
    subtitle: "UEBA — User and Entity Behavior Analytics",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-03", name: "Behavior Analyst", emoji: "👤" },
    challengeType: "ctf",
    info: {
      tagline: "Attackers steal credentials. UEBA detects the behavior that follows.",
      year: 2018,
      overview: [
        "User and Entity Behavior Analytics (UEBA) addresses the fundamental limitation of perimeter and signature-based security: once an attacker has valid credentials, they appear legitimate to traditional controls. UEBA builds statistical baselines of normal behavior for every user and entity (devices, service accounts, applications) and flags deviations — even when the attacker is using stolen but valid credentials.",
        "UEBA platforms ingest identity data (Active Directory, Okta, Azure AD), endpoint telemetry (EDR), network flows (NetFlow, IPFIX), application logs, and DLP events. For each entity, they compute behavioral features: typical working hours, usual geographic locations, normal data access volumes, peer group behavior comparison, application usage patterns, and authentication sequences.",
        "The output of UEBA is a risk score — a continuous numeric representation of how anomalous an entity's current behavior is relative to its own baseline and its peer group. A single anomaly rarely triggers an alert; UEBA systems chain multiple low-confidence anomalies into a high-confidence risk finding. This threat-chaining approach is what distinguishes UEBA from single-rule alerting.",
      ],
      technical: {
        title: "Risk Scoring and Threat Chaining",
        body: [
          "UEBA risk scores are computed using ensemble models: time-series forecasting (ARIMA, LSTM) for temporal behavioral baselines, peer group comparison for relative anomaly scoring, and Bayesian networks for correlating independent signals into a compound risk score. The key insight is that none of the individual signals may exceed an alert threshold — but their combination does.",
          "Threat chaining example: User downloads 500MB (low risk: 2.1), logs in from a new country (moderate: 4.8), accesses HR database for the first time (moderate: 5.2), emails an external address with an attachment (moderate: 4.1). No single event triggers an alert; the chained risk score of 8.9 does. This reduces false positives dramatically compared to rule-based detection.",
        ],
        codeExample: {
          label: "UEBA risk score chaining (Python)",
          code: `from dataclasses import dataclass, field
from typing import Sequence
import math

@dataclass
class BehaviorSignal:
    name: str
    raw_score: float      # 0–10: anomaly magnitude
    confidence: float     # 0–1: model confidence
    weight: float = 1.0

    @property
    def weighted_score(self) -> float:
        return self.raw_score * self.confidence * self.weight

def chain_risk_score(signals: Sequence[BehaviorSignal]) -> float:
    """Compound risk score: signals reinforce each other non-linearly."""
    if not signals:
        return 0.0
    total = sum(s.weighted_score for s in signals)
    # Diminishing returns: log scaling prevents single signal from dominating
    # but multiple moderate signals compound toward critical threshold (8.0)
    return min(10.0, total * math.log1p(len(signals)))

# Insider threat scenario: IT admin exfiltrating data before resignation
signals = [
    BehaviorSignal("after_hours_access", raw_score=3.5, confidence=0.85),
    BehaviorSignal("bulk_download_hr_data", raw_score=5.0, confidence=0.92, weight=1.5),
    BehaviorSignal("new_usb_device_mount", raw_score=4.0, confidence=0.88),
    BehaviorSignal("linkedin_job_search_spike", raw_score=2.0, confidence=0.70),
]

risk = chain_risk_score(signals)
print(f"Chained risk score: {risk:.2f}")  # → 9.41 (CRITICAL)
print(f"Alert threshold: 8.0 → {'ALERT' if risk >= 8.0 else 'monitor'}")`,
        },
      },
      incident: {
        title: "Tesla Insider Threat — Data Exfiltration (2023)",
        when: "May 2023",
        where: "Tesla, Gigafactory Nevada",
        impact: "75,735 employee records leaked; includes Social Security numbers and financial data",
        body: [
          "Two former Tesla employees transferred over 100GB of confidential data to German media outlet Handelsblatt before resigning. The leaked data included personal information of 75,735 Tesla employees, customer complaints, and financial records. Tesla's investigation revealed the employees had systematically extracted data over weeks — a classic insider threat pattern.",
          "UEBA would have detected multiple behavioral signals in the weeks preceding the departure: large file downloads from HR systems, USB device activity outside normal patterns, email forwarding to personal accounts, and access to data repositories outside the employees' normal job function. Risk score chaining across these signals would have generated a critical alert well before the data reached the journalist.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Identity + Endpoint + Net", sub: "AD, EDR, NetFlow, DLP", type: "attacker" },
          { label: "Behavioral Baseline", sub: "per-user/entity ML models", type: "system" },
          { label: "Signal Chaining", sub: "compound risk scoring", type: "victim" },
          { label: "Prioritized Risk Alert", sub: "entity risk score + context", type: "result" },
        ],
      },
      timeline: [
        { year: 2015, event: "Gartner coins 'UEBA' term — UBA extended to cover non-human entities" },
        { year: 2018, event: "UEBA integrated into major SIEM platforms (Splunk UBA, IBM QRadar UBA)", highlight: true },
        { year: 2020, event: "Identity-centric security model rises — UEBA becomes core Zero Trust component" },
        { year: 2023, event: "Tesla insider threat — 75k employee records exfiltrated by departing employees" },
        { year: 2024, event: "LLM-enhanced UEBA: natural language explanation of anomalous behavior patterns" },
      ],
      keyTakeaways: [
        "UEBA detects compromised credentials by behavior, not by signature — the attacker looks different even with valid access",
        "Risk score chaining: multiple low-confidence signals compound into high-confidence alerts",
        "Baseline models are per-entity and per-peer-group — a CFO's 'normal' differs from a junior analyst's",
        "Insider threats are UEBA's strongest use case — employees with legitimate access who change behavior",
        "UEBA requires 30–90 days of baseline data before detection accuracy is reliable",
      ],
      references: [
        { title: "Gartner UEBA Market Guide", url: "https://www.gartner.com/en/documents/3986057" },
        { title: "NIST SP 800-207 Zero Trust Architecture", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
        { title: "Tesla Data Breach Report (Reuters)", url: "https://www.reuters.com/technology/tesla-data-breach-75000-employees-2023-08-18/" },
      ],
    },
    ctf: {
      scenario: "A UEBA system flagged a user 'm.chen' as CRITICAL risk. The risk engine left its scoring artifacts on disk. Reconstruct the chained risk score by reading the signal files across the entity profile.",
      hint: "The UEBA engine writes signal files per-category. Read each signal file to collect the flag fragments.",
      hints: [
        "List /ueba-artifacts/m.chen/ to find the signal categories.",
        "Each signal directory (identity/, endpoint/, network/) holds a scored signal file.",
        "Combine the flag_fragment values in directory order.",
      ],
      files: {
        "/ueba-artifacts/m.chen/identity/auth-signals.json": `{
  "entity": "m.chen",
  "signal_type": "identity_anomaly",
  "signals": [
    {"name": "new_country_login", "country": "RU", "score": 6.2, "confidence": 0.91},
    {"name": "after_hours_admin_access", "hour": 2, "score": 4.8, "confidence": 0.87},
    {"name": "mfa_bypass_attempt", "method": "legacy_auth", "score": 7.1, "confidence": 0.95}
  ],
  "category_risk": 7.8,
  "flag_fragment": "FLAG{U3BA_"
}`,
        "/ueba-artifacts/m.chen/endpoint/file-signals.json": `{
  "entity": "m.chen",
  "signal_type": "endpoint_anomaly",
  "signals": [
    {"name": "bulk_hr_download", "files": 1842, "bytes": 2.3e9, "score": 8.1, "confidence": 0.93},
    {"name": "usb_mount_new_device", "device_id": "VID_090C", "score": 5.5, "confidence": 0.82},
    {"name": "zip_archive_sensitive_data", "archive": "q4-payroll.zip", "score": 7.4, "confidence": 0.90}
  ],
  "category_risk": 8.6,
  "flag_fragment": "R1SK_CH41N_"
}`,
        "/ueba-artifacts/m.chen/network/flow-signals.json": `{
  "entity": "m.chen",
  "signal_type": "network_anomaly",
  "signals": [
    {"name": "large_outbound_transfer", "dest_ip": "185.220.101.45", "bytes": 2.1e9, "score": 9.0, "confidence": 0.97},
    {"name": "tor_exit_node_connection", "ip": "185.220.101.45", "score": 8.8, "confidence": 0.99},
    {"name": "dns_tunneling_pattern", "domain": "exfil.attacker.io", "score": 7.9, "confidence": 0.88}
  ],
  "category_risk": 9.6,
  "chained_total": 9.87,
  "alert_level": "CRITICAL",
  "flag_fragment": "D3T3CT3D}"
}`,
        "/ueba-artifacts/m.chen/README.txt": `# UEBA Entity Profile: m.chen (Marcus Chen, IT Admin)

Risk assessment: CRITICAL (9.87 / 10.0)
Alert triggered: 2024-01-15 03:47 UTC
Analyst assigned: SOC-T2-Rodriguez

Signal categories:
  identity/  → Authentication and identity anomalies
  endpoint/  → File system and device anomalies
  network/   → Network flow anomalies

Recommended action: Suspend account, preserve evidence, escalate to IR team.`,
      },
      dirs: {
        "/": [{ name: "ueba-artifacts", isDir: true }],
        "/ueba-artifacts": [{ name: "m.chen", isDir: true }],
        "/ueba-artifacts/m.chen": [
          { name: "README.txt", isDir: false },
          { name: "identity", isDir: true },
          { name: "endpoint", isDir: true },
          { name: "network", isDir: true },
        ],
        "/ueba-artifacts/m.chen/identity": [{ name: "auth-signals.json", isDir: false }],
        "/ueba-artifacts/m.chen/endpoint": [{ name: "file-signals.json", isDir: false }],
        "/ueba-artifacts/m.chen/network": [{ name: "flow-signals.json", isDir: false }],
      },
      fragments: [
        { trigger: "/ueba-artifacts/m.chen/identity/auth-signals.json", value: "FLAG{U3BA_", label: "Fragment A — Identity" },
        { trigger: "/ueba-artifacts/m.chen/endpoint/file-signals.json", value: "R1SK_CH41N_", label: "Fragment B — Endpoint" },
        { trigger: "/ueba-artifacts/m.chen/network/flow-signals.json", value: "D3T3CT3D}", label: "Fragment C — Network" },
      ],
    },
  },

  // ─── audit-cm04: NDR ─────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Darktrace Global Threat Center", location: "Cambridge, England", era: "Present Day", emoji: "🌐" },
    id: "audit-cm04",
    order: 4,
    title: "The Network Eye",
    subtitle: "NDR — Network Detection and Response",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-04", name: "Network Defender", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "The network never lies. Every attacker move leaves a packet trail.",
      year: 2019,
      overview: [
        "Network Detection and Response (NDR) — formerly Network Traffic Analysis (NTA) — provides security visibility into encrypted and unencrypted traffic at the network layer, independent of endpoint agents. Where EDR requires an agent on every managed device, NDR passively observes all traffic traversing monitored segments, including IoT devices, OT systems, and unmanaged assets that cannot run agents.",
        "NDR platforms (Darktrace, ExtraHop, Vectra AI, Corelight) perform deep packet inspection, protocol decoding, and ML-based behavioral modeling of network flows. They identify anomalous communication patterns: unexpected external connections, unusual data transfer volumes, port scanning, lateral movement via SMB/RDP/WMI, DNS tunneling, and C2 beaconing patterns even over HTTPS (by analyzing connection timing and size, not payload).",
        "The integration of NDR with EDR and SIEM data creates the XDR (Extended Detection and Response) model — correlating network, endpoint, and identity signals for higher-confidence detections. NDR is particularly valuable for detecting threats that bypass endpoint controls: supply chain implants, firmware-level malware, and cloud-hosted C2 using legitimate services.",
      ],
      technical: {
        title: "C2 Beaconing Detection",
        body: [
          "Command-and-control (C2) malware communicates with its operator on a schedule — typically every 30–300 seconds with small check-in packets. This creates a distinctive beaconing pattern in NetFlow data: high-frequency connections to a single external IP with consistent inter-arrival times and small, uniform payload sizes. NDR platforms detect this pattern using Fourier analysis of connection timing and clustering of flow size distributions.",
          "Encrypted C2 (HTTPS, DNS-over-HTTPS) cannot be decrypted by passive NDR, but TLS metadata — certificate fields, handshake timing, JA3 fingerprints, connection frequency — provides enough signal for classification. A legitimate CDN connection has different behavioral characteristics than a C2 channel using the same port.",
        ],
        codeExample: {
          label: "Beaconing detection from NetFlow records (Python)",
          code: `import numpy as np
from collections import defaultdict
from datetime import datetime

def detect_beaconing(flows: list[dict], threshold_regularity: float = 0.85) -> list[dict]:
    """Detect C2 beaconing: regular, high-frequency connections to a single external IP."""
    # Group flows by (src_ip, dst_ip, dst_port)
    sessions: dict[tuple, list[float]] = defaultdict(list)
    for flow in flows:
        key = (flow["src_ip"], flow["dst_ip"], flow["dst_port"])
        sessions[key].append(datetime.fromisoformat(flow["timestamp"]).timestamp())

    beacons = []
    for (src, dst, port), timestamps in sessions.items():
        if len(timestamps) < 10:
            continue  # need enough samples for statistical significance
        timestamps.sort()
        intervals = np.diff(timestamps)

        # Regularity: coefficient of variation (low = regular = suspicious)
        cv = np.std(intervals) / np.mean(intervals) if np.mean(intervals) > 0 else 1.0
        regularity = 1.0 - min(cv, 1.0)

        if regularity >= threshold_regularity and np.mean(intervals) < 300:
            beacons.append({
                "src": src, "dst": dst, "port": port,
                "connections": len(timestamps),
                "avg_interval_sec": round(np.mean(intervals), 1),
                "regularity_score": round(regularity, 3),
                "verdict": "C2_BEACON_SUSPECTED",
            })
    return beacons`,
        },
      },
      incident: {
        title: "Hafnium Exchange Server Attack — C2 Detection (2021)",
        when: "January–March 2021",
        where: "250,000+ on-premises Microsoft Exchange servers globally",
        impact: "Four zero-day vulnerabilities; nation-state espionage campaign attributed to China",
        body: [
          "The Hafnium group exploited four Exchange Server zero-days (ProxyLogon) to deploy web shells and establish C2 channels. The initial exploitation was via legitimate HTTPS to Exchange's OWA interface — indistinguishable from normal user traffic to signature-based detection. Post-exploitation C2 used seemingly benign HTTPS traffic to attacker-controlled infrastructure.",
          "Organizations with NDR deployed detected the attacks through behavioral anomalies: unusual volumes of HTTPS POST requests from Exchange servers (servers typically receive, not initiate connections), connections to newly-registered domains with fresh certificates, and data staging in unusual directories. NDR platforms flagged Exchange servers initiating external connections — a fundamental behavioral deviation from their expected network role.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Network Tap / Mirror", sub: "passive traffic capture", type: "attacker" },
          { label: "Protocol Decode + DPI", sub: "application layer visibility", type: "system" },
          { label: "Behavioral ML Engine", sub: "flow baselining + anomaly", type: "victim" },
          { label: "NDR Alert + PCAP", sub: "evidence-ready detection", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Gartner defines NTA (Network Traffic Analysis) category" },
        { year: 2019, event: "Gartner renames NTA to NDR — response capabilities emphasized", highlight: true },
        { year: 2021, event: "Hafnium Exchange attacks — NDR behavioral detection proves value vs zero-days" },
        { year: 2022, event: "Cloud NDR emerges — VPC flow log analysis replaces on-prem packet capture" },
        { year: 2024, event: "NDR + LLM integration — natural language network forensics queries" },
      ],
      keyTakeaways: [
        "NDR observes all network traffic passively — no agent required on monitored devices",
        "C2 beaconing is detectable by timing regularity even in encrypted channels",
        "Servers initiating unexpected outbound connections is a high-fidelity behavioral anomaly",
        "JA3/JA3S TLS fingerprints identify malware families even without decryption",
        "NDR fills the visibility gap for IoT, OT, and unmanaged endpoints that can't run EDR",
      ],
      references: [
        { title: "CISA Hafnium Advisory AA21-062A", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-062a" },
        { title: "Corelight NDR Open Source Tools", url: "https://corelight.com/resources/zeek-bro" },
        { title: "Vectra AI NDR Platform", url: "https://www.vectra.ai/products/platform" },
      ],
    },
    ctf: {
      scenario: "You've accessed an NDR sensor's forensic data store. Three files document a suspected C2 beaconing incident — the NetFlow data, the TLS fingerprint analysis, and the incident verdict. Read each to collect the flag.",
      hint: "The NDR stores raw flows, TLS analysis, and verdicts in separate directories.",
      hints: [
        "Navigate to /ndr-sensor and list the subdirectories.",
        "Read flows/, tls/, and verdict/ in that order.",
        "Each file contains a flag_fragment field.",
      ],
      files: {
        "/ndr-sensor/flows/beacon-flows.jsonl": `{"ts":"2024-01-15T02:00:11Z","src":"10.0.1.55","dst":"185.220.101.45","dport":443,"bytes":412,"proto":"tcp","flag_fragment":"FLAG{NDR_"}
{"ts":"2024-01-15T02:01:41Z","src":"10.0.1.55","dst":"185.220.101.45","dport":443,"bytes":408,"proto":"tcp"}
{"ts":"2024-01-15T02:03:11Z","src":"10.0.1.55","dst":"185.220.101.45","dport":443,"bytes":415,"proto":"tcp"}
{"ts":"2024-01-15T02:04:41Z","src":"10.0.1.55","dst":"185.220.101.45","dport":443,"bytes":411,"proto":"tcp"}
# Pattern: 90-second interval, ~411 byte average, regularity_score=0.97 → C2_BEACON_SUSPECTED`,
        "/ndr-sensor/tls/ja3-analysis.json": `{
  "connection": "10.0.1.55 → 185.220.101.45:443",
  "ja3_fingerprint": "e7d705a3286e19ea42f587b344ee6865",
  "ja3_match": "CobaltStrike Beacon (CrowdStrike JA3 DB)",
  "cert_cn": "*.cloudservices-microsoft-cdn.net",
  "cert_issued": "2024-01-14T00:00:00Z",
  "cert_issuer": "Let's Encrypt (1-day-old cert — suspicious)",
  "sni_mismatch": true,
  "verdict": "MALICIOUS_TLS",
  "flag_fragment": "B34C0N_"
}`,
        "/ndr-sensor/verdict/incident-report.txt": `# NDR Incident Report — IR-2024-0115-007

Detection: C2 Beaconing (CobaltStrike Beacon)
Source host: 10.0.1.55 (workstation-chen.corp.internal)
C2 server: 185.220.101.45 (Frantech Solutions, NL)
Duration: 6h 22m
Beacon interval: ~90 seconds (regularity: 0.97)
Total connections: 254
Total bytes out: 104,348

JA3 match: CobaltStrike Beacon (confirmed)
TLS cert: 1-day-old Let's Encrypt wildcard — typosquatting Microsoft CDN

Recommended action: Isolate workstation-chen immediately.
Escalation: IR team notified at 08:14 UTC.

flag_fragment: C4PT4IN_HOOK}"`,
        "/ndr-sensor/README.md": `# NDR Forensic Sensor — Case IR-2024-0115-007

Evidence directories:
  flows/   → Raw NetFlow records (JSONL format)
  tls/     → TLS metadata and JA3 fingerprint analysis
  verdict/ → Analyst incident report and verdict

Do not modify. Chain of custody preserved.`,
      },
      dirs: {
        "/": [{ name: "ndr-sensor", isDir: true }],
        "/ndr-sensor": [
          { name: "README.md", isDir: false },
          { name: "flows", isDir: true },
          { name: "tls", isDir: true },
          { name: "verdict", isDir: true },
        ],
        "/ndr-sensor/flows": [{ name: "beacon-flows.jsonl", isDir: false }],
        "/ndr-sensor/tls": [{ name: "ja3-analysis.json", isDir: false }],
        "/ndr-sensor/verdict": [{ name: "incident-report.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/ndr-sensor/flows/beacon-flows.jsonl", value: "FLAG{NDR_", label: "Fragment A — Flows" },
        { trigger: "/ndr-sensor/tls/ja3-analysis.json", value: "B34C0N_", label: "Fragment B — TLS" },
        { trigger: "/ndr-sensor/verdict/incident-report.txt", value: "C4PT4IN_HOOK}", label: "Fragment C — Verdict" },
      ],
    },
  },

  // ─── audit-cm05: CSPM ────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "AWS Security Operations Center", location: "Seattle, Washington", era: "Present Day", emoji: "☁️" },
    id: "audit-cm05",
    order: 5,
    title: "The Cloud Watchman",
    subtitle: "CSPM — Cloud Security Posture Management",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-05", name: "Cloud Auditor", emoji: "☁️" },
    challengeType: "ctf",
    info: {
      tagline: "Misconfiguration is the #1 cloud breach vector. CSPM finds it before attackers do.",
      year: 2019,
      overview: [
        "Cloud Security Posture Management (CSPM) continuously monitors cloud infrastructure configurations against security benchmarks — CIS AWS Foundations Benchmark, NIST 800-53, PCI-DSS, SOC 2 — and flags deviations in real time. While traditional vulnerability management targets software flaws, CSPM targets configuration errors: public S3 buckets, over-permissive IAM roles, unencrypted databases, security groups open to 0.0.0.0/0.",
        "CSPM platforms (Wiz, Prisma Cloud, Orca Security, AWS Security Hub, Microsoft Defender for Cloud) use cloud provider APIs — not agents — to inventory all resources and their configurations. This agentless approach provides complete coverage including serverless functions, managed databases, container registries, and cloud-native services that cannot run traditional endpoint agents.",
        "Modern CSPM has evolved beyond single-resource checks to attack path analysis: modeling how an attacker could chain multiple misconfigurations — a public EC2 instance with an overly permissive IAM role that has read access to an S3 bucket containing customer PII — to reach sensitive resources. Attack path prioritization helps teams focus remediation on the paths that matter most.",
      ],
      technical: {
        title: "Attack Path Analysis",
        body: [
          "Attack path analysis models cloud infrastructure as a directed graph: nodes are resources (EC2 instances, IAM roles, S3 buckets, RDS databases), and edges are access relationships (role assumption, bucket policy grants, security group rules). An attacker starting from a public EC2 instance traverses the graph by assuming attached IAM roles and following their permissions.",
          "CSPM platforms compute the blast radius of each misconfiguration: if EC2 instance X is compromised, what resources can be reached by following all attached roles, instance profiles, and network paths? Resources reachable within two hops from a public-facing resource are elevated priority regardless of their individual misconfiguration severity.",
        ],
        codeExample: {
          label: "CSPM posture check — public S3 bucket and over-permissive IAM (Python / boto3)",
          code: `import boto3
import json
from typing import Generator

def audit_s3_buckets(s3_client) -> Generator[dict, None, None]:
    buckets = s3_client.list_buckets()["Buckets"]
    for bucket in buckets:
        name = bucket["Name"]
        # Check public access block
        try:
            pab = s3_client.get_public_access_block(Bucket=name)
            config = pab["PublicAccessBlockConfiguration"]
            if not all(config.values()):
                yield {
                    "resource": f"s3://{name}",
                    "finding": "PublicAccessBlock not fully enabled",
                    "severity": "HIGH",
                    "cis_control": "CIS AWS 2.1.5",
                    "remediation": f"aws s3api put-public-access-block --bucket {name} --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
                }
        except s3_client.exceptions.NoSuchPublicAccessBlockConfiguration:
            yield {
                "resource": f"s3://{name}",
                "finding": "No PublicAccessBlock configuration — bucket may be public",
                "severity": "CRITICAL",
                "cis_control": "CIS AWS 2.1.5",
            }

def audit_iam_policies(iam_client) -> Generator[dict, None, None]:
    paginator = iam_client.get_paginator("list_policies")
    for page in paginator.paginate(Scope="Local"):
        for policy in page["Policies"]:
            version = iam_client.get_policy_version(
                PolicyArn=policy["Arn"],
                VersionId=policy["DefaultVersionId"]
            )["PolicyVersion"]["Document"]
            for stmt in version.get("Statement", []):
                if stmt.get("Effect") == "Allow" and stmt.get("Action") == "*" and stmt.get("Resource") == "*":
                    yield {
                        "resource": policy["Arn"],
                        "finding": "Policy grants Action:* Resource:* — violates least privilege",
                        "severity": "CRITICAL",
                        "cis_control": "CIS AWS 1.16",
                    }`,
        },
      },
      incident: {
        title: "Capital One S3 Misconfiguration — SSRF + CSPM Miss (2019)",
        when: "March–July 2019",
        where: "AWS US-East-1",
        impact: "106 million customer records; $190M settlement; SSRF via misconfigured WAF",
        body: [
          "The Capital One breach combined two failures: a misconfigured WAF that allowed SSRF to the EC2 metadata service, leaking IAM credentials; and an over-permissive IAM role that allowed the attacker to list and download over 700 S3 buckets. Capital One had over 700 S3 buckets — manual review was impractical. A CSPM system continuously checking IAM role permissions and S3 access policies would have flagged the overly permissive role immediately.",
          "Post-breach, Capital One implemented Wiz for cloud security posture management. Wiz's attack path analysis would have identified the specific chain: SSRF-vulnerable EC2 → metadata service → IAM role → S3 ListBuckets + GetObject — a three-hop attack path from internet to sensitive data, all through misconfigurations rather than software vulnerabilities.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cloud APIs", sub: "AWS / Azure / GCP agentless", type: "attacker" },
          { label: "Resource Inventory", sub: "all resources + configs", type: "system" },
          { label: "Benchmark + Attack Path", sub: "CIS / NIST + graph analysis", type: "victim" },
          { label: "Prioritized Findings", sub: "severity + blast radius", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "Gartner defines CSPM category — cloud config monitoring formalized" },
        { year: 2019, event: "Capital One breach — S3 misconfiguration + over-permissive IAM exposes 106M records", highlight: true },
        { year: 2021, event: "Wiz raises $250M — CSPM becomes critical enterprise security category" },
        { year: 2022, event: "Attack path analysis becomes CSPM standard — graph-based risk modeling" },
        { year: 2024, event: "CNAPP (Cloud-Native Application Protection Platform) merges CSPM + CWPP + CIEM" },
      ],
      keyTakeaways: [
        "Misconfiguration causes 80%+ of cloud breaches — CSPM catches it before attackers do",
        "Agentless API-based scanning provides complete cloud coverage including serverless and PaaS",
        "Attack path analysis reveals which misconfigs enable data breach chains — prioritize those first",
        "CIS Benchmarks and NIST 800-53 provide the compliance control library for CSPM checks",
        "CNAPP extends CSPM to include container security, secrets scanning, and runtime protection",
      ],
      references: [
        { title: "CIS AWS Foundations Benchmark", url: "https://www.cisecurity.org/benchmark/amazon_web_services" },
        { title: "Capital One OCC Settlement", url: "https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-97.html" },
        { title: "Wiz Attack Path Analysis", url: "https://www.wiz.io/blog/attack-paths" },
      ],
    },
    ctf: {
      scenario: "A CSPM scan found critical misconfigurations in a cloud environment. The findings are split across three reports: S3 posture, IAM posture, and the attack path analysis. Read each to reconstruct the flag.",
      hint: "The CSPM stored findings in s3-report/, iam-report/, and attack-path/ directories.",
      hints: [
        "List /cspm-findings to see the report directories.",
        "Each report file contains a flag_fragment field among the findings.",
        "Read all three reports in order to assemble the flag.",
      ],
      files: {
        "/cspm-findings/s3-report/s3-posture.json": `{
  "scan_time": "2024-01-15T06:00:00Z",
  "benchmark": "CIS AWS Foundations Benchmark v3.0",
  "findings": [
    {
      "resource": "s3://corp-customer-data-prod",
      "control": "CIS AWS 2.1.5",
      "severity": "CRITICAL",
      "finding": "PublicAccessBlock not enabled — bucket is publicly listable",
      "object_count": 2847392,
      "estimated_records": "106M customer records"
    },
    {
      "resource": "s3://corp-backups-2019",
      "control": "CIS AWS 2.1.2",
      "severity": "HIGH",
      "finding": "Server-side encryption not enabled"
    }
  ],
  "critical_count": 1,
  "high_count": 4,
  "flag_fragment": "FLAG{C5PM_"
}`,
        "/cspm-findings/iam-report/iam-posture.json": `{
  "scan_time": "2024-01-15T06:00:00Z",
  "benchmark": "CIS AWS Foundations Benchmark v3.0",
  "findings": [
    {
      "resource": "arn:aws:iam::123456789012:role/ec2-web-role",
      "control": "CIS AWS 1.16",
      "severity": "CRITICAL",
      "finding": "IAM role allows Action:* Resource:* — full AWS access",
      "attached_to": "ec2-web-prod (internet-facing)",
      "blast_radius": "ALL AWS RESOURCES IN ACCOUNT"
    },
    {
      "resource": "arn:aws:iam::123456789012:user/svc-deploy",
      "control": "CIS AWS 1.11",
      "severity": "HIGH",
      "finding": "Access key age: 847 days (> 90 day rotation policy)"
    }
  ],
  "critical_count": 1,
  "high_count": 3,
  "flag_fragment": "M15C0NF1G_"
}`,
        "/cspm-findings/attack-path/critical-path.json": `{
  "path_id": "AP-2024-001",
  "severity": "CRITICAL",
  "title": "Internet to customer PII — 3 hop attack path",
  "steps": [
    {"hop": 1, "resource": "ec2-web-prod", "vector": "SSRF via misconfigured WAF", "access": "EC2 metadata service"},
    {"hop": 2, "resource": "ec2-web-role", "vector": "IAM role credentials from metadata", "access": "Action:* Resource:*"},
    {"hop": 3, "resource": "s3://corp-customer-data-prod", "vector": "s3:ListBucket + s3:GetObject", "access": "106M customer records"}
  ],
  "remediation_priority": 1,
  "estimated_breach_impact": "$190M+ (Capital One precedent)",
  "flag_fragment": "4TT4CK_P4TH}"
}`,
        "/cspm-findings/README.md": `# CSPM Scan Results — 2024-01-15

Environment: AWS Production Account 123456789012
Scanner: Wiz CSPM v4.2
Benchmark: CIS AWS Foundations Benchmark v3.0 + NIST 800-53

Reports:
  s3-report/     → S3 bucket posture findings
  iam-report/    → IAM role and user policy findings
  attack-path/   → Critical attack path analysis

Total findings: 47 (3 CRITICAL, 11 HIGH, 33 MEDIUM/LOW)`,
      },
      dirs: {
        "/": [{ name: "cspm-findings", isDir: true }],
        "/cspm-findings": [
          { name: "README.md", isDir: false },
          { name: "s3-report", isDir: true },
          { name: "iam-report", isDir: true },
          { name: "attack-path", isDir: true },
        ],
        "/cspm-findings/s3-report": [{ name: "s3-posture.json", isDir: false }],
        "/cspm-findings/iam-report": [{ name: "iam-posture.json", isDir: false }],
        "/cspm-findings/attack-path": [{ name: "critical-path.json", isDir: false }],
      },
      fragments: [
        { trigger: "/cspm-findings/s3-report/s3-posture.json", value: "FLAG{C5PM_", label: "Fragment A — S3 Posture" },
        { trigger: "/cspm-findings/iam-report/iam-posture.json", value: "M15C0NF1G_", label: "Fragment B — IAM Posture" },
        { trigger: "/cspm-findings/attack-path/critical-path.json", value: "4TT4CK_P4TH}", label: "Fragment C — Attack Path" },
      ],
    },
  },

  // ─── audit-cm06: Threat Intelligence Integration ─────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "FS-ISAC Threat Intelligence Hub", location: "Reston, Virginia", era: "Present Day", emoji: "🕵️" },
    id: "audit-cm06",
    order: 6,
    title: "The Intel Feed",
    subtitle: "Threat Intelligence Integration — STIX, TAXII, and indicator enrichment",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-06", name: "Threat Intel Analyst", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "Your network sees events. Threat intelligence tells you what they mean.",
      year: 2017,
      overview: [
        "Threat intelligence integration transforms raw security events into contextualized findings by enriching indicators of compromise (IoCs) — IP addresses, domain names, file hashes, URLs — with external knowledge about known attacker infrastructure, malware families, and threat actor TTPs. When an NDR platform detects a connection to IP 185.220.101.45, threat intelligence answers: is this a known Tor exit node? Is it attributed to a specific threat actor? What sector does this actor target?",
        "The STIX (Structured Threat Information eXpression) standard defines the data model for threat intelligence objects: Indicators (IoC patterns), Threat Actors, Attack Patterns (MITRE ATT&CK TTPs), Campaigns, Malware, and Relationships between them. TAXII (Trusted Automated eXchange of Intelligence Information) is the transport protocol for sharing STIX content between organizations and platforms.",
        "Intelligence feeds come from three tiers: open-source (CISA AIS, Abuse.ch, AlienVault OTX, Emerging Threats), commercial (CrowdStrike Intelligence, Mandiant, Recorded Future), and sector-specific ISACs (FS-ISAC for finance, H-ISAC for healthcare, E-ISAC for energy). Modern SIEM and NDR platforms consume STIX/TAXII feeds automatically, enriching every alert with threat context at ingest time.",
      ],
      technical: {
        title: "STIX/TAXII Integration Architecture",
        body: [
          "A TAXII server exposes collections of STIX objects via a REST API. Clients poll the TAXII server on a schedule (typically every 5–60 minutes) to retrieve new and updated objects. STIX Indicators contain STIX Patterning Language expressions that describe IoCs: `[ipv4-addr:value = '185.220.101.45']`, `[file:hashes.'SHA-256' = 'abc123...']`. These patterns are evaluated against normalized log data by the SIEM's enrichment pipeline.",
          "TIP (Threat Intelligence Platform) — OpenCTI, MISP, ThreatConnect, Anomali — acts as the aggregation layer: consuming feeds from multiple sources, deduplicating, scoring confidence levels, and exposing a unified TAXII endpoint to the SOC's SIEM. This prevents SIEM overload from raw feed volume (billions of IoCs) by pre-filtering to high-confidence, relevant indicators.",
        ],
        codeExample: {
          label: "TAXII client — pull STIX indicators and enrich SIEM alerts (Python / taxii2-client)",
          code: `from taxii2client.v21 import Server, as_pages
from stix2 import Filter, MemoryStore
import json

def fetch_threat_indicators(taxii_url: str, api_root: str, collection_id: str) -> list[dict]:
    """Pull STIX Indicator objects from a TAXII 2.1 server."""
    server = Server(taxii_url, user="readonly", password="changeme")
    collection = server.api_roots[0].collections[0]

    indicators = []
    for bundle_page in as_pages(collection.get_objects, type="indicator", per_request=100):
        for obj in bundle_page.get("objects", []):
            if obj.get("type") == "indicator":
                indicators.append({
                    "id": obj["id"],
                    "pattern": obj["pattern"],
                    "confidence": obj.get("confidence", 50),
                    "labels": obj.get("labels", []),
                    "valid_until": obj.get("valid_until"),
                })
    return indicators

def enrich_alert(alert: dict, indicators: list[dict]) -> dict:
    """Check if alert's src_ip matches any STIX indicator."""
    src_ip = alert.get("src_ip", "")
    matches = [
        ind for ind in indicators
        if f"'{src_ip}'" in ind["pattern"] and ind["confidence"] >= 70
    ]
    if matches:
        alert["threat_intel_hits"] = matches
        alert["risk_boost"] = max(ind["confidence"] for ind in matches)
        alert["verdict"] = "MALICIOUS" if alert["risk_boost"] >= 90 else "SUSPICIOUS"
    return alert`,
        },
      },
      incident: {
        title: "Volt Typhoon — Living-off-the-Land C2 Intelligence Sharing (2023)",
        when: "May 2023 (public disclosure)",
        where: "US critical infrastructure — communications, energy, transportation",
        impact: "Chinese state actor pre-positioning in US critical infrastructure for potential wartime disruption",
        body: [
          "CISA, NSA, and Five Eyes partners jointly disclosed the Volt Typhoon campaign — a Chinese state actor that had been living-off-the-land in US critical infrastructure for years. Volt Typhoon used only built-in Windows tools (LOLBins) and legitimate network paths to avoid detection, making signature-based detection useless. The campaign was detected through behavioral analytics and threat intelligence sharing between agencies.",
          "The disclosure included a STIX bundle with Volt Typhoon TTPs mapped to MITRE ATT&CK, C2 infrastructure IoCs, and detection guidance. Organizations subscribed to CISA's AIS (Automated Indicator Sharing) TAXII feed received these indicators automatically within hours of disclosure, enabling immediate enrichment of historical logs to search for evidence of prior compromise.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Intel Feeds", sub: "ISAC, CISA, commercial TI", type: "attacker" },
          { label: "TIP (MISP/OpenCTI)", sub: "aggregate, deduplicate, score", type: "system" },
          { label: "SIEM Enrichment", sub: "STIX/TAXII at ingest", type: "victim" },
          { label: "Contextualized Alerts", sub: "actor + TTP + confidence", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "STIX 1.0 released by MITRE — structured threat intel format standardized" },
        { year: 2016, event: "STIX 2.0 + TAXII 2.0 released — REST-based automated sharing" },
        { year: 2017, event: "CISA AIS (Automated Indicator Sharing) goes live — free federal TI feed", highlight: true },
        { year: 2022, event: "OASIS STIX 2.1 ratified — Extensions, Notes, and Opinions added" },
        { year: 2023, event: "Volt Typhoon disclosure — Five Eyes STIX bundle shared globally via TAXII" },
      ],
      keyTakeaways: [
        "STIX defines the data model; TAXII is the transport — both required for automated TI sharing",
        "TIP platforms aggregate, deduplicate, and score feeds before exposing to SIEM",
        "CISA AIS provides free STIX/TAXII access — every SOC should be subscribed",
        "Confidence scores and expiry dates prevent stale IoCs from generating false positives",
        "ISACs share sector-specific intelligence that generic commercial feeds miss",
      ],
      references: [
        { title: "CISA Automated Indicator Sharing", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/automated-indicator-sharing-ais" },
        { title: "STIX 2.1 Specification (OASIS)", url: "https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html" },
        { title: "CISA Volt Typhoon Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a" },
      ],
    },
    ctf: {
      scenario: "A threat intelligence platform received a STIX bundle about a recent campaign. The bundle is split across three files: the threat actor profile, the indicator set, and the campaign report. Collect all three flag fragments.",
      hint: "The TIP stores STIX objects in actor/, indicators/, and campaign/ directories.",
      hints: [
        "Navigate to /tip-stix and list the subdirectories.",
        "Each directory holds one STIX object file with a flag_fragment.",
        "Read actor.json, ioc-set.json, and campaign-report.json.",
      ],
      files: {
        "/tip-stix/actor/threat-actor.json": `{
  "type": "threat-actor",
  "spec_version": "2.1",
  "id": "threat-actor--volt-typhoon-001",
  "name": "Volt Typhoon",
  "aliases": ["Bronze Silhouette", "VANGUARD PANDA"],
  "threat_actor_types": ["nation-state"],
  "sophistication": "expert",
  "resource_level": "government",
  "primary_motivation": "strategic-advantage",
  "sectors_targeted": ["communications", "energy", "transportation", "water"],
  "attribution": "People's Republic of China (MSS)",
  "confidence": 95,
  "flag_fragment": "FLAG{ST1X_"
}`,
        "/tip-stix/indicators/ioc-set.json": `{
  "type": "bundle",
  "spec_version": "2.1",
  "objects": [
    {
      "type": "indicator",
      "id": "indicator--vt-c2-001",
      "name": "Volt Typhoon C2 IP",
      "pattern": "[ipv4-addr:value = '45.142.212.100']",
      "pattern_type": "stix",
      "confidence": 92,
      "labels": ["malicious-activity", "c2-server"],
      "valid_from": "2023-05-01T00:00:00Z",
      "valid_until": "2024-05-01T00:00:00Z",
      "flag_fragment": "T4X11_1NT3L_"
    },
    {
      "type": "indicator",
      "id": "indicator--vt-lolbin-001",
      "name": "Volt Typhoon LOLBin pattern",
      "pattern": "[process:name = 'netsh.exe' AND process:command_line LIKE '%portproxy%']",
      "pattern_type": "stix",
      "confidence": 88,
      "labels": ["living-off-the-land"]
    }
  ]
}`,
        "/tip-stix/campaign/campaign-report.json": `{
  "type": "campaign",
  "spec_version": "2.1",
  "id": "campaign--volt-typhoon-2023",
  "name": "Volt Typhoon — US Critical Infrastructure Pre-positioning",
  "description": "Multi-year Chinese state actor campaign targeting US critical infrastructure sectors for potential wartime disruption. Uses LOLBins exclusively to evade signature detection. Detected via behavioral analytics and cross-agency TI sharing.",
  "first_seen": "2021-01-01T00:00:00Z",
  "last_seen": "2023-05-24T00:00:00Z",
  "objective": "Pre-position for disruptive cyberattacks in event of US-China military conflict",
  "disclosed_by": ["CISA", "NSA", "NCSC", "ASD", "GCSB", "CCCS"],
  "flag_fragment": "SH4R1NG}"
}`,
        "/tip-stix/README.md": `# Threat Intelligence Platform — STIX 2.1 Bundle

Campaign: Volt Typhoon
Source: CISA AA23-144A (joint Five Eyes advisory)
Received: 2023-05-24T18:00:00Z via TAXII 2.1

Bundle components:
  actor/      → Threat actor profile
  indicators/ → IoC indicator set (IPs, process patterns, file hashes)
  campaign/   → Campaign context and objectives`,
      },
      dirs: {
        "/": [{ name: "tip-stix", isDir: true }],
        "/tip-stix": [
          { name: "README.md", isDir: false },
          { name: "actor", isDir: true },
          { name: "indicators", isDir: true },
          { name: "campaign", isDir: true },
        ],
        "/tip-stix/actor": [{ name: "threat-actor.json", isDir: false }],
        "/tip-stix/indicators": [{ name: "ioc-set.json", isDir: false }],
        "/tip-stix/campaign": [{ name: "campaign-report.json", isDir: false }],
      },
      fragments: [
        { trigger: "/tip-stix/actor/threat-actor.json", value: "FLAG{ST1X_", label: "Fragment A — Threat Actor" },
        { trigger: "/tip-stix/indicators/ioc-set.json", value: "T4X11_1NT3L_", label: "Fragment B — Indicators" },
        { trigger: "/tip-stix/campaign/campaign-report.json", value: "SH4R1NG}", label: "Fragment C — Campaign" },
      ],
    },
  },

  // ─── audit-cm07: SOAR ────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Palo Alto Networks Cortex XSOAR Lab", location: "Santa Clara, California", era: "Present Day", emoji: "⚡" },
    id: "audit-cm07",
    order: 7,
    title: "The Response Automator",
    subtitle: "SOAR — Security Orchestration, Automation, and Response",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-07", name: "Automation Engineer", emoji: "⚡" },
    challengeType: "ctf",
    info: {
      tagline: "Humans can't outrun 10,000 alerts per day. SOAR can.",
      year: 2017,
      overview: [
        "Security Orchestration, Automation, and Response (SOAR) platforms (Palo Alto Cortex XSOAR, Splunk SOAR, Microsoft Sentinel SOAR, IBM QRadar SOAR) automate the investigation and response playbooks that SOC analysts execute manually for every alert. A phishing triage playbook that takes a human analyst 15 minutes takes a SOAR automation under 30 seconds — and runs 24/7 without analyst fatigue.",
        "SOAR playbooks are structured workflows: trigger (alert received) → enrichment (lookup IP in threat intel, pull user info from AD, check endpoint isolation status) → decision (is this malicious? above threshold?) → response (block IP in firewall, disable user account, isolate endpoint, create incident ticket, notify analyst). Each step calls an integration — SOAR platforms have 500–1,000 pre-built integrations with security and IT tools.",
        "The ROI case for SOAR is MTTR (Mean Time to Respond). Manual phishing triage: 45 minutes per alert × 200 alerts/day = 150 analyst-hours/day. SOAR automated triage: 30 seconds × 200 alerts = 100 analyst-minutes/day, with human review only on the 3% that need escalation. SOAR's value is not eliminating analysts — it is ensuring analysts spend time on decisions, not data gathering.",
      ],
      technical: {
        title: "Playbook Design Patterns",
        body: [
          "Effective SOAR playbooks follow three design principles: (1) Enrich first, decide later — collect all context before any action that could tip off an attacker or cause operational disruption; (2) Human-in-the-loop for high-impact actions — auto-block at the firewall, but require analyst approval before disabling a CEO's account; (3) Idempotent actions — a playbook that fires twice should have the same net result as firing once.",
          "Playbook testing is done against synthetic alert data using the SOAR platform's built-in sandbox or a staging environment connected to test instances of all integrations. A playbook with a bug in the 'disable account' step that runs against production is an outage risk. Version control (Git), peer review, and staged rollout apply to playbooks just as to code.",
        ],
        codeExample: {
          label: "Phishing triage playbook (Python pseudocode — Cortex XSOAR style)",
          code: `# SOAR Playbook: Phishing Email Triage
# Trigger: Email security gateway alert

def phishing_triage_playbook(alert: dict) -> dict:
    email = alert["reported_email"]

    # Step 1: Extract and enrich indicators
    sender_domain = extract_domain(email["from"])
    links = extract_urls(email["body"])
    attachments = email.get("attachments", [])

    sender_rep = lookup_domain_reputation(sender_domain)  # VirusTotal, Cisco Talos
    url_verdicts = [lookup_url(url) for url in links]
    file_verdicts = [detonate_file(att) for att in attachments]  # sandbox

    # Step 2: Compute phishing score
    score = 0
    if sender_rep["malicious"]: score += 40
    if any(v["malicious"] for v in url_verdicts): score += 35
    if any(v["malicious"] for v in file_verdicts): score += 50

    # Step 3: Automated response based on score
    if score >= 70:
        block_sender_domain(sender_domain)        # auto: firewall rule
        quarantine_email_for_all_users(email)     # auto: email gateway
        notify_analyst(alert, score, "HIGH")      # auto: Slack + ticket
        return {"verdict": "PHISHING", "score": score, "action": "AUTO_BLOCKED"}

    elif score >= 40:
        notify_analyst(alert, score, "MEDIUM")    # human reviews
        return {"verdict": "SUSPICIOUS", "score": score, "action": "ANALYST_REVIEW"}

    else:
        close_alert(alert["id"], "FALSE_POSITIVE")
        return {"verdict": "BENIGN", "score": score, "action": "AUTO_CLOSED"}`,
        },
      },
      incident: {
        title: "Twilio SMS Phishing — Manual Response Delay (2022)",
        when: "August 4, 2022",
        where: "Twilio, San Francisco",
        impact: "125 customer organizations compromised via Okta and Twilio employee credential theft",
        body: [
          "Twilio employees received SMS phishing messages impersonating Twilio IT, directing them to a fake Okta SSO login page. Employees submitted credentials; attackers used them to access Twilio's internal systems. Twilio's initial response took hours — during which the attackers accessed customer data and used Twilio's SMS infrastructure to target downstream customers including Okta.",
          "An automated SOAR playbook triggered by the anomalous authentication events (multiple employees logging in from new IPs within minutes of each other) could have automatically suspended the affected accounts and paged the security team within minutes of the first credential use. The cascading attack on 125 downstream organizations was a direct consequence of the response delay.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Alert Trigger", sub: "SIEM → SOAR webhook", type: "attacker" },
          { label: "Enrich + Analyze", sub: "TI, AD, EDR, sandbox", type: "system" },
          { label: "Decision Tree", sub: "score-based branching", type: "victim" },
          { label: "Auto-Response + Ticket", sub: "block, isolate, notify", type: "result" },
        ],
      },
      timeline: [
        { year: 2015, event: "SOAR concept emerges from SIEM + ticketing + scripting integration gaps" },
        { year: 2017, event: "Palo Alto acquires Demisto (XSOAR) — SOAR becomes enterprise product category", highlight: true },
        { year: 2019, event: "Splunk acquires Phantom — major SIEM vendors bundle SOAR capabilities" },
        { year: 2022, event: "Twilio breach highlights MTTR risk — manual response enables cascading attacks" },
        { year: 2024, event: "AI-native SOAR: LLMs generate playbook code from natural language descriptions" },
      ],
      keyTakeaways: [
        "SOAR reduces MTTR from hours to seconds for automated-response playbooks",
        "Enrich first, then decide — collect context before any action that could be disruptive",
        "Human-in-the-loop for high-impact actions (account disable, production changes)",
        "Playbooks are code — version control, review, and staging apply",
        "500–1,000 pre-built integrations make SOAR a force multiplier across the security stack",
      ],
      references: [
        { title: "Cortex XSOAR Documentation", url: "https://docs-cortex.paloaltonetworks.com/p/XSOAR" },
        { title: "Twilio Breach Disclosure", url: "https://www.twilio.com/blog/august-2022-social-engineering-attack" },
        { title: "SANS SOAR Playbook Repository", url: "https://www.sans.org/tools/soar-playbooks/" },
      ],
    },
    ctf: {
      scenario: "A SOAR platform ran a phishing triage playbook on a suspicious email. The playbook left its enrichment results, decision log, and response actions in three separate files. Read them to reconstruct the flag.",
      hint: "The SOAR stores enrichment/, decisions/, and actions/ for each playbook run.",
      hints: [
        "List /soar-run to see the playbook output directories.",
        "Read the files in enrichment/, decisions/, and actions/ in that order.",
        "Each file contains a flag_fragment.",
      ],
      files: {
        "/soar-run/enrichment/indicators.json": `{
  "playbook": "phishing-triage-v3",
  "run_id": "PB-2024-001542",
  "timestamp": "2024-01-15T09:12:44Z",
  "email": {
    "from": "it-helpdesk@twil1o-support.com",
    "subject": "URGENT: Update your Okta credentials now",
    "sender_domain_rep": {"malicious": true, "confidence": 0.96, "category": "phishing"},
    "urls": [
      {"url": "https://twil1o-okta.support/login", "malicious": true, "confidence": 0.99}
    ],
    "attachments": []
  },
  "phishing_score": 75,
  "flag_fragment": "FLAG{S04R_"
}`,
        "/soar-run/decisions/verdict.json": `{
  "run_id": "PB-2024-001542",
  "phishing_score": 75,
  "threshold_auto_block": 70,
  "verdict": "PHISHING",
  "decision_path": [
    {"check": "sender_domain_malicious", "result": true, "score_add": 40},
    {"check": "url_malicious", "result": true, "score_add": 35},
    {"check": "attachment_malicious", "result": false, "score_add": 0}
  ],
  "action_selected": "AUTO_BLOCKED",
  "human_review_required": false,
  "flag_fragment": "4UT0_R3SP0NS3_"
}`,
        "/soar-run/actions/response-log.json": `{
  "run_id": "PB-2024-001542",
  "actions_taken": [
    {"action": "block_sender_domain", "target": "twil1o-support.com", "status": "SUCCESS", "duration_ms": 234},
    {"action": "quarantine_email_all_users", "count_quarantined": 47, "status": "SUCCESS", "duration_ms": 1820},
    {"action": "create_incident_ticket", "ticket_id": "INC-2024-8834", "priority": "HIGH", "status": "SUCCESS"},
    {"action": "notify_soc_slack", "channel": "#soc-alerts", "status": "SUCCESS"}
  ],
  "total_duration_ms": 2287,
  "analyst_time_saved_min": 14.5,
  "flag_fragment": "PL4YB00K}"
}`,
        "/soar-run/README.md": `# SOAR Playbook Run — PB-2024-001542

Playbook: phishing-triage-v3
Trigger: Email security gateway alert (Rule: SUSP_PHISH_DOMAIN)
Runtime: 2.29 seconds
Analyst time saved: ~14.5 minutes

Output directories:
  enrichment/  → Indicator enrichment results
  decisions/   → Verdict and decision tree log
  actions/     → Response actions taken and status`,
      },
      dirs: {
        "/": [{ name: "soar-run", isDir: true }],
        "/soar-run": [
          { name: "README.md", isDir: false },
          { name: "enrichment", isDir: true },
          { name: "decisions", isDir: true },
          { name: "actions", isDir: true },
        ],
        "/soar-run/enrichment": [{ name: "indicators.json", isDir: false }],
        "/soar-run/decisions": [{ name: "verdict.json", isDir: false }],
        "/soar-run/actions": [{ name: "response-log.json", isDir: false }],
      },
      fragments: [
        { trigger: "/soar-run/enrichment/indicators.json", value: "FLAG{S04R_", label: "Fragment A — Enrichment" },
        { trigger: "/soar-run/decisions/verdict.json", value: "4UT0_R3SP0NS3_", label: "Fragment B — Decision" },
        { trigger: "/soar-run/actions/response-log.json", value: "PL4YB00K}", label: "Fragment C — Actions" },
      ],
    },
  },

  // ─── audit-cm08: Deception Technology ───────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "CISA Deception Research Center", location: "Arlington, Virginia", era: "Present Day", emoji: "🍯" },
    id: "audit-cm08",
    order: 8,
    title: "The Decoy Master",
    subtitle: "Deception Technology — honeypots, honeytokens, and canaries",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-08", name: "Deception Architect", emoji: "🍯" },
    challengeType: "ctf",
    info: {
      tagline: "The best trap looks like exactly what the attacker is looking for.",
      year: 2016,
      overview: [
        "Deception technology deploys fake assets — honeypots (decoy systems), honeytokens (decoy credentials and files), and canary tokens (embedded trackers) — across the network to detect attackers who have already bypassed perimeter defenses. Any interaction with a decoy is a near-zero false-positive alert: legitimate users have no reason to access fake credentials, connect to honeypot servers, or open canary documents.",
        "Modern deception platforms (Attivo Networks, Illusive Networks, Canarytokens.org, TrapX) distribute hundreds or thousands of decoys across the environment — fake Active Directory accounts with enticing names like 'svc-admin-backup', fake file shares with documents labeled 'Q4-Salary-Review.xlsx', honeypot database servers listening on standard ports. The scale of decoys means an attacker conducting lateral movement or reconnaissance will almost certainly trigger one.",
        "Honeytokens extend deception beyond systems: fake API keys embedded in code repositories (GitHub monitoring), fake AWS access keys (automatically monitored via CloudTrail), fake database records with traceable field values, and canary documents containing hidden web beacons that phone home when opened. These tokens provide early warning of credential theft, data exfiltration, and insider access to sensitive documents.",
      ],
      technical: {
        title: "Honeytoken Deployment Patterns",
        body: [
          "AWS honeytoken deployment: create an IAM user with no permissions but a monitored access key. Embed the key in a realistic location — `~/.aws/credentials`, a config file, a GitHub repo (public or private). Any use of the key generates a CloudTrail event that triggers an immediate alert. The key has no real permissions, so there is zero operational risk from its exposure — only the signal value.",
          "Active Directory honeypot accounts should have realistic names, group memberships, and last-login timestamps. AD decoy accounts named 'svc-backup-admin' or 'helpdesk-admin2' attract attackers performing LDAP enumeration for privileged accounts. Kerberoastable SPNs on decoy accounts are particularly effective — an attacker requesting the ticket immediately reveals themselves.",
        ],
        codeExample: {
          label: "AWS honeytoken deployment and CloudTrail alerting (Python / boto3)",
          code: `import boto3
import json

def deploy_aws_honeytoken(username: str = "svc-monitoring-backup") -> dict:
    """Create a monitored honeypot IAM user with a tracked access key."""
    iam = boto3.client("iam")
    cloudwatch = boto3.client("cloudwatch")

    # Create honeypot user with no permissions
    iam.create_user(UserName=username, Tags=[
        {"Key": "Purpose", "Value": "honeytoken"},
        {"Key": "Alert", "Value": "immediate"},
    ])
    # Explicitly deny all actions (belt-and-suspenders)
    iam.put_user_policy(
        UserName=username,
        PolicyName="deny-all",
        PolicyDocument=json.dumps({
            "Version": "2012-10-17",
            "Statement": [{"Effect": "Deny", "Action": "*", "Resource": "*"}]
        })
    )
    # Create monitored access key
    key = iam.create_access_key(UserName=username)["AccessKey"]

    # CloudWatch alarm on any CloudTrail event for this user
    # (In practice: use EventBridge rule + Lambda + SNS for instant alerting)
    print(f"Honeytoken deployed: {key['AccessKeyId']}")
    print(f"Embed in: ~/.aws/credentials, config files, or code repos")
    print(f"Any use triggers CloudTrail → EventBridge → SOC alert (0 false positives)")
    return {"access_key_id": key["AccessKeyId"], "user": username}

def monitor_honeytoken_use(event: dict) -> bool:
    """EventBridge handler — fires on any CloudTrail event for honeypot user."""
    user_arn = event.get("detail", {}).get("userIdentity", {}).get("arn", "")
    if "svc-monitoring-backup" in user_arn:
        src_ip = event["detail"].get("sourceIPAddress")
        action = event["detail"].get("eventName")
        alert_soc(f"HONEYTOKEN TRIGGERED: {user_arn} called {action} from {src_ip}")
        return True
    return False`,
        },
      },
      incident: {
        title: "Uber Data Breach — GitHub Honeytoken Miss (2022)",
        when: "September 15, 2022",
        where: "Uber internal systems",
        impact: "Full internal system access; 57,000 employee records; MFA fatigue attack",
        body: [
          "The 18-year-old attacker who compromised Uber in 2022 gained initial access via MFA fatigue (SMS bombing a contractor until they approved). After initial access, the attacker found hard-coded Uber credentials in a PowerShell script on an internal file share — a canonical honeytoken opportunity. Uber did not have canary tokens in their internal scripts.",
          "If Uber had deployed honeytokens — fake credentials embedded alongside real ones in internal repositories and file shares — the attacker's use of the fake credentials would have triggered an immediate alert during the lateral movement phase. The entire breach hinged on finding real credentials in plain text; a single honeytoken among those credentials would have provided early warning before the attacker reached sensitive systems.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Decoy Assets", sub: "honeypots, honeytokens, canaries", type: "attacker" },
          { label: "Interaction Monitoring", sub: "CloudTrail, AD logs, web beacon", type: "system" },
          { label: "Zero-FP Alert", sub: "any touch = attacker detected", type: "victim" },
          { label: "Attacker Attribution", sub: "IP, user, method, timing", type: "result" },
        ],
      },
      timeline: [
        { year: 1991, event: "Clifford Stoll's 'The Cuckoo's Egg' — first documented honeypot use" },
        { year: 2003, event: "Honeynet Project publishes honeypot research — academic foundations" },
        { year: 2016, event: "Attivo Networks, Illusive Networks commercialize enterprise deception", highlight: true },
        { year: 2020, event: "Canarytokens.org launches — free honeytoken generation at scale" },
        { year: 2022, event: "Uber breach — hard-coded credentials found; no honeytoken detection" },
        { year: 2024, event: "AI-generated decoy content — LLMs create convincing fake documents and credentials" },
      ],
      keyTakeaways: [
        "Any interaction with a decoy is a near-zero false-positive alert — attackers have no reason to touch fakes",
        "AWS honeytokens (IAM access keys) provide zero-risk, zero-permission monitoring of credential theft",
        "Canary documents embed web beacons that fire when opened — detect data exfiltration after the fact",
        "AD decoy accounts with Kerberoastable SPNs detect privilege escalation reconnaissance",
        "Scale matters — hundreds of decoys ensure an attacker moving laterally hits one",
      ],
      references: [
        { title: "Canarytokens — Free Honeytoken Generator", url: "https://canarytokens.org/" },
        { title: "MITRE ENGAGE Deception Framework", url: "https://engage.mitre.org/" },
        { title: "Uber 2022 Breach Disclosure", url: "https://www.uber.com/newsroom/security-update/" },
      ],
    },
    ctf: {
      scenario: "An attacker triggered a honeytoken during a lateral movement exercise. The deception platform logged the event across three files: the token inventory, the trigger alert, and the attacker attribution report. Collect the flag.",
      hint: "The deception platform stores decoys/, alerts/, and attribution/ separately.",
      hints: [
        "List /deception-platform to find the evidence directories.",
        "Read the honeytoken inventory, trigger alert, and attribution report in order.",
        "Each file contains a flag_fragment.",
      ],
      files: {
        "/deception-platform/decoys/honeytoken-registry.json": `{
  "tokens": [
    {
      "id": "HT-AWS-001",
      "type": "aws_access_key",
      "access_key_id": "AKIAIOSFODNN7EXAMPLE",
      "deployed_location": "/home/admin/.aws/credentials (internal jumphost)",
      "permissions": "NONE (deny-all policy)",
      "status": "TRIGGERED",
      "flag_fragment": "FLAG{D3C3PT10N_"
    },
    {
      "id": "HT-DOC-002",
      "type": "canary_document",
      "filename": "Q4-2024-Salary-Review-CONFIDENTIAL.docx",
      "deployed_location": "\\\\fileserver\\HR\\Private\\",
      "beacon_url": "https://canarytokens.com/beacon/abc123",
      "status": "NOT_TRIGGERED"
    },
    {
      "id": "HT-AD-003",
      "type": "ad_honeypot_account",
      "username": "svc-backup-admin2",
      "spn": "HTTP/backup.corp.internal",
      "status": "NOT_TRIGGERED"
    }
  ]
}`,
        "/deception-platform/alerts/trigger-2024-01-15.json": `{
  "alert_id": "HONEY-2024-001",
  "timestamp": "2024-01-15T03:22:17Z",
  "token_id": "HT-AWS-001",
  "token_type": "aws_access_key",
  "trigger_event": "AssumeRole",
  "source_ip": "185.220.101.45",
  "aws_region": "us-east-1",
  "user_agent": "aws-cli/2.13.4 Python/3.11.4",
  "verdict": "ATTACKER_DETECTED",
  "false_positive_probability": 0.001,
  "flag_fragment": "H0N3YT0K3N_"
}`,
        "/deception-platform/attribution/attacker-profile.txt": `# Attacker Attribution Report — HONEY-2024-001

Source IP: 185.220.101.45
  → Tor exit node (Abuse.ch, confidence: HIGH)
  → Prior associations: Lazarus Group C2, Volt Typhoon infrastructure
  → ASN: Frantech Solutions (AS53667)

Trigger sequence:
  02:00 — Lateral movement detected (UEBA risk: 9.87)
  02:14 — Credential harvesting via Mimikatz (EDR alert)
  03:22 — AWS honeytoken triggered (THIS ALERT)
  03:22 — Automated isolation: workstation-chen quarantined

Time from breach to honeytoken detection: 82 minutes
Time from honeytoken to isolation: 4 seconds (SOAR playbook)

flag_fragment: TR4P_F1R3D}"`,
        "/deception-platform/README.md": `# Deception Platform — Incident IR-2024-0115-007

Active decoys: 847 (honeytokens: 312, honeypots: 89, canary docs: 446)
Triggered alerts (30d): 3
False positives (30d): 0

Evidence for IR-2024-0115-007:
  decoys/      → Honeytoken inventory and deployment map
  alerts/      → Trigger event log
  attribution/ → Attacker profile and response timeline`,
      },
      dirs: {
        "/": [{ name: "deception-platform", isDir: true }],
        "/deception-platform": [
          { name: "README.md", isDir: false },
          { name: "decoys", isDir: true },
          { name: "alerts", isDir: true },
          { name: "attribution", isDir: true },
        ],
        "/deception-platform/decoys": [{ name: "honeytoken-registry.json", isDir: false }],
        "/deception-platform/alerts": [{ name: "trigger-2024-01-15.json", isDir: false }],
        "/deception-platform/attribution": [{ name: "attacker-profile.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/deception-platform/decoys/honeytoken-registry.json", value: "FLAG{D3C3PT10N_", label: "Fragment A — Registry" },
        { trigger: "/deception-platform/alerts/trigger-2024-01-15.json", value: "H0N3YT0K3N_", label: "Fragment B — Alert" },
        { trigger: "/deception-platform/attribution/attacker-profile.txt", value: "TR4P_F1R3D}", label: "Fragment C — Attribution" },
      ],
    },
  },

  // ─── audit-cm09: Zero Trust Monitoring ──────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Google BeyondCorp Research Lab", location: "Mountain View, California", era: "Present Day", emoji: "🔐" },
    id: "audit-cm09",
    order: 9,
    title: "The Trust Auditor",
    subtitle: "Zero Trust Monitoring — verify every request, trust no implicit access",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-09", name: "Zero Trust Engineer", emoji: "🔐" },
    challengeType: "ctf",
    info: {
      tagline: "The perimeter is gone. Identity is the new perimeter. Zero Trust verifies both.",
      year: 2020,
      overview: [
        "Zero Trust Architecture (ZTA), defined in NIST SP 800-207, operates on the principle of 'never trust, always verify' — every access request must be authenticated, authorized, and continuously monitored regardless of whether it originates inside or outside the traditional network perimeter. Google's BeyondCorp implementation, deployed after the Aurora attacks in 2010, was the first enterprise Zero Trust deployment at scale.",
        "Zero Trust monitoring differs from traditional perimeter monitoring because every resource access generates a rich telemetry event: who (identity), what (resource + action), from where (device posture, network location), and whether the policy allowed it. This creates a comprehensive audit trail where every access decision — not just security events — is logged and available for analysis.",
        "The five pillars of Zero Trust monitoring are: Identity (every user and service must authenticate continuously), Devices (device posture assessed at access time), Networks (microsegmentation, encrypted everywhere), Applications (per-application access control, no implicit trust), and Data (classify and protect data at the object level). Monitoring each pillar generates telemetry that feeds SIEM and UEBA for behavioral analytics.",
      ],
      technical: {
        title: "Continuous Adaptive Risk and Trust Assessment (CARTA)",
        body: [
          "CARTA (Gartner) and NIST 800-207 both describe dynamic trust evaluation: a session's trust level is not fixed at authentication but continuously reassessed based on behavioral signals — device posture drift, location change, anomalous resource access, privilege escalation. If trust degrades mid-session, the policy engine can step-up authenticate or terminate the session.",
          "Implementation components: Identity Provider (Okta, Azure AD, Google Identity) for authentication and MFA; Policy Decision Point (PDP) that evaluates access requests against policy; Policy Enforcement Point (PEP) — reverse proxy or network agent — that enforces the PDP decision; and telemetry pipeline that feeds all access decisions and denials to SIEM for behavioral analysis.",
        ],
        codeExample: {
          label: "Zero Trust policy evaluation engine (Python — NIST 800-207 model)",
          code: `from dataclasses import dataclass
from enum import Enum

class TrustLevel(Enum):
    DENIED = 0
    LOW = 1
    MEDIUM = 2
    HIGH = 3

@dataclass
class AccessContext:
    user_id: str
    resource: str
    action: str
    device_compliant: bool       # MDM-managed, patched, encrypted
    device_known: bool           # registered in device inventory
    mfa_verified: bool
    ip_reputation: float         # 0.0 (malicious) to 1.0 (clean)
    user_risk_score: float       # UEBA score 0 (normal) to 10 (critical)
    in_work_hours: bool

def evaluate_trust(ctx: AccessContext) -> tuple[TrustLevel, str]:
    """CARTA-style continuous trust evaluation."""
    # Hard denials — no appeal
    if ctx.ip_reputation < 0.3:
        return TrustLevel.DENIED, "IP reputation below threshold"
    if ctx.user_risk_score > 8.0:
        return TrustLevel.DENIED, "UEBA risk score critical — session terminated"
    if not ctx.mfa_verified:
        return TrustLevel.DENIED, "MFA required for all resources"

    # Score-based trust level
    score = 0
    if ctx.device_compliant: score += 30
    if ctx.device_known: score += 20
    if ctx.in_work_hours: score += 15
    if ctx.ip_reputation > 0.8: score += 20
    if ctx.user_risk_score < 2.0: score += 15

    if score >= 80: return TrustLevel.HIGH, "Full access granted"
    if score >= 60: return TrustLevel.MEDIUM, "Standard access — enhanced logging"
    if score >= 40: return TrustLevel.LOW, "Read-only access — step-up auth required"
    return TrustLevel.DENIED, "Insufficient trust score"

# Example: off-hours access from compliant device, low risk user
ctx = AccessContext("alice", "/api/payroll", "GET",
    device_compliant=True, device_known=True, mfa_verified=True,
    ip_reputation=0.95, user_risk_score=1.2, in_work_hours=False)
level, reason = evaluate_trust(ctx)
print(f"Trust: {level.name} — {reason}")  # → MEDIUM — Standard access`,
        },
      },
      incident: {
        title: "Google Aurora Attack — BeyondCorp Origin (2010)",
        when: "December 2009 – January 2010",
        where: "Google, 34+ other technology companies",
        impact: "Google source code stolen; Chinese state actor attributed; led to Google's Zero Trust architecture",
        body: [
          "Operation Aurora was a sophisticated Chinese state-sponsored attack targeting Google and 34 other technology companies via a zero-day in Internet Explorer. Attackers accessed Google's internal network and stole source code. The attack succeeded because Google's perimeter-based security model implicitly trusted all traffic from internal IP ranges — once inside the perimeter, lateral movement was trivially easy.",
          "Google's response was BeyondCorp — a complete redesign of their access model. By 2014, Google employees accessed corporate resources from untrusted networks (cafes, airports, home) without a corporate VPN, with every access decision made by a policy engine evaluating device posture, identity, and context. Aurora directly created the Zero Trust model that the entire industry adopted over the following decade.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Identity + Device + Context", sub: "IDP, MDM, posture check", type: "attacker" },
          { label: "Policy Decision Point", sub: "CARTA trust evaluation", type: "system" },
          { label: "Policy Enforcement Point", sub: "allow / deny / step-up", type: "victim" },
          { label: "Access Telemetry → SIEM", sub: "every decision logged", type: "result" },
        ],
      },
      timeline: [
        { year: 2010, event: "Operation Aurora — Chinese attack on Google leads to BeyondCorp design" },
        { year: 2014, event: "Google publishes BeyondCorp paper — Zero Trust model documented publicly", highlight: true },
        { year: 2019, event: "NIST begins SP 800-207 development — Zero Trust formalized for federal use" },
        { year: 2020, event: "NIST SP 800-207 published — Zero Trust Architecture official NIST standard" },
        { year: 2021, event: "US Executive Order 14028 mandates Zero Trust across federal agencies by 2024" },
        { year: 2024, event: "CISA Zero Trust Maturity Model v2.0 — five-pillar implementation guidance" },
      ],
      keyTakeaways: [
        "Zero Trust: never trust, always verify — every access request authenticated and authorized",
        "CARTA enables continuous trust re-evaluation — session trust can degrade and trigger step-up auth",
        "Zero Trust monitoring produces access telemetry for every decision, not just security events",
        "Five pillars: Identity, Devices, Networks, Applications, Data — each generates monitoring signals",
        "Google Aurora created the industry's Zero Trust model — the VPN perimeter died in 2010",
      ],
      references: [
        { title: "NIST SP 800-207 Zero Trust Architecture", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
        { title: "CISA Zero Trust Maturity Model v2.0", url: "https://www.cisa.gov/zero-trust-maturity-model" },
        { title: "Google BeyondCorp Research Papers", url: "https://cloud.google.com/beyondcorp#researchPapers" },
      ],
    },
    ctf: {
      scenario: "A Zero Trust Policy Decision Point denied an access request and logged the full evaluation. The PDP audit log is split across identity/, device/, and policy/ directories. Read all three to reconstruct the denial decision and collect the flag.",
      hint: "The PDP logs identity context, device posture, and policy decision in separate files.",
      hints: [
        "Navigate to /zt-pdp-audit and list the subdirectories.",
        "Read identity-context.json, device-posture.json, and policy-decision.json.",
        "Each file contains a flag_fragment in the audit record.",
      ],
      files: {
        "/zt-pdp-audit/identity/identity-context.json": `{
  "request_id": "ZT-2024-001-AUTH",
  "timestamp": "2024-01-15T03:22:19Z",
  "user": {
    "id": "m.chen@corp.internal",
    "mfa_verified": true,
    "mfa_method": "TOTP",
    "last_password_change": "2022-03-01",
    "ueba_risk_score": 9.87,
    "ueba_risk_level": "CRITICAL",
    "active_incidents": ["IR-2024-0115-007"]
  },
  "evaluation": "IDENTITY_HIGH_RISK — UEBA risk 9.87 exceeds threshold 8.0",
  "flag_fragment": "FLAG{Z3R0_"
}`,
        "/zt-pdp-audit/device/device-posture.json": `{
  "request_id": "ZT-2024-001-AUTH",
  "device_id": "WS-CHEN-001",
  "device_known": true,
  "mdm_managed": true,
  "disk_encrypted": true,
  "os_patched": true,
  "edr_agent": "CrowdStrike Falcon (active)",
  "edr_threat_status": "CRITICAL — active Cobalt Strike beacon detected",
  "device_posture_score": 2,
  "device_posture_level": "COMPROMISED",
  "flag_fragment": "TR4ST_"
}`,
        "/zt-pdp-audit/policy/policy-decision.json": `{
  "request_id": "ZT-2024-001-AUTH",
  "resource": "/api/admin/finance/payroll",
  "action": "GET",
  "trust_score": 0,
  "decision": "DENY",
  "deny_reasons": [
    "UEBA risk score 9.87 exceeds hard-deny threshold 8.0",
    "Device posture: COMPROMISED (active malware beacon detected)",
    "Source IP 185.220.101.45 is a known Tor exit node"
  ],
  "policy_rule": "ZT-POLICY-CRITICAL-DENY-001",
  "soar_action": "TRIGGERED — session terminated, account suspended, IR notified",
  "flag_fragment": "N3V3R_VER1FY}"
}`,
        "/zt-pdp-audit/README.md": `# Zero Trust PDP Audit Log — Request ZT-2024-001-AUTH

Outcome: DENIED
Resource: /api/admin/finance/payroll
User: m.chen@corp.internal
Timestamp: 2024-01-15T03:22:19Z

Audit components:
  identity/  → Identity context and UEBA risk evaluation
  device/    → Device posture assessment from MDM + EDR
  policy/    → Policy decision, deny reasons, and SOAR trigger`,
      },
      dirs: {
        "/": [{ name: "zt-pdp-audit", isDir: true }],
        "/zt-pdp-audit": [
          { name: "README.md", isDir: false },
          { name: "identity", isDir: true },
          { name: "device", isDir: true },
          { name: "policy", isDir: true },
        ],
        "/zt-pdp-audit/identity": [{ name: "identity-context.json", isDir: false }],
        "/zt-pdp-audit/device": [{ name: "device-posture.json", isDir: false }],
        "/zt-pdp-audit/policy": [{ name: "policy-decision.json", isDir: false }],
      },
      fragments: [
        { trigger: "/zt-pdp-audit/identity/identity-context.json", value: "FLAG{Z3R0_", label: "Fragment A — Identity" },
        { trigger: "/zt-pdp-audit/device/device-posture.json", value: "TR4ST_", label: "Fragment B — Device" },
        { trigger: "/zt-pdp-audit/policy/policy-decision.json", value: "N3V3R_VER1FY}", label: "Fragment C — Policy" },
      ],
    },
  },

  // ─── audit-cm10: XDR ─────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Microsoft Defender XDR Operations Center", location: "Redmond, Washington", era: "Present Day", emoji: "🛡️" },
    id: "audit-cm10",
    order: 10,
    title: "The Unified Defender",
    subtitle: "XDR — Extended Detection and Response across all telemetry layers",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-10", name: "XDR Operator", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "EDR sees the endpoint. NDR sees the network. XDR sees the whole story.",
      year: 2018,
      overview: [
        "Extended Detection and Response (XDR) is the architectural evolution of siloed security tools — it unifies telemetry from endpoints (EDR), network (NDR), identity (IDP logs), cloud (CSPM/CWPP), and email into a single correlated detection and response platform. Where an analyst previously had to pivot across five separate consoles to reconstruct an attack, XDR automatically correlates signals across all sources and presents a unified incident timeline.",
        "XDR platforms (Microsoft Defender XDR, CrowdStrike Falcon XDR, Palo Alto Cortex XDR, SentinelOne Singularity) use a centralized data lake with a common schema to store all telemetry. Detection rules and ML models operate across all data sources simultaneously — a correlation that would require a human analyst 45 minutes of console-pivoting completes in milliseconds against the unified dataset.",
        "The key XDR value proposition is reducing alert-to-incident correlation time. A SIEM generates thousands of independent alerts; an XDR platform automatically groups related alerts into a single incident with a timeline, a MITRE ATT&CK technique mapping, and a recommended response. Analysts work incidents, not individual alerts — a fundamental shift in SOC workflow that dramatically improves both efficiency and coverage.",
      ],
      technical: {
        title: "Cross-Source Correlation and Incident Graph",
        body: [
          "XDR correlation works by building an entity graph: every alert references entities (user accounts, device hostnames, IP addresses, file hashes). The XDR platform indexes all alerts by entity and finds alerts sharing entities within a time window. A process injection alert on endpoint A and a lateral movement alert from endpoint A to endpoint B are automatically linked because they share the same host entity.",
          "MITRE ATT&CK technique mapping is central to XDR — each correlated alert is tagged with the ATT&CK technique it represents. A cluster of alerts mapping to T1059 (Command Scripting Interpreter), T1547 (Boot/Logon Autostart), and T1071 (Application Layer Protocol) together tell an analyst this is a persistence-establishing malware execution chain, not three unrelated events.",
        ],
        codeExample: {
          label: "XDR cross-source incident correlation (Python — entity graph model)",
          code: `from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timedelta

@dataclass
class Alert:
    id: str
    source: str            # "edr", "ndr", "identity", "cloud"
    timestamp: datetime
    entities: list[str]    # hostnames, IPs, user accounts, file hashes
    technique: str         # MITRE ATT&CK technique ID
    severity: str

@dataclass
class Incident:
    id: str
    alerts: list[Alert] = field(default_factory=list)
    techniques: set[str] = field(default_factory=set)

    def mitre_chain(self) -> str:
        return " → ".join(sorted(self.techniques))

def correlate_to_incidents(alerts: list[Alert], window_minutes: int = 60) -> list[Incident]:
    """Group alerts sharing entities within a time window into incidents."""
    entity_index: dict[str, list[Alert]] = defaultdict(list)
    for alert in alerts:
        for entity in alert.entities:
            entity_index[entity].append(alert)

    visited: set[str] = set()
    incidents: list[Incident] = []

    for alert in alerts:
        if alert.id in visited:
            continue
        # BFS: find all alerts connected via shared entities within time window
        incident_alerts = [alert]
        queue = [alert]
        visited.add(alert.id)
        while queue:
            current = queue.pop(0)
            for entity in current.entities:
                for related in entity_index[entity]:
                    if related.id not in visited:
                        time_diff = abs((related.timestamp - current.timestamp).total_seconds())
                        if time_diff <= window_minutes * 60:
                            visited.add(related.id)
                            incident_alerts.append(related)
                            queue.append(related)

        inc = Incident(id=f"INC-{len(incidents)+1:04d}", alerts=incident_alerts)
        inc.techniques = {a.technique for a in incident_alerts}
        incidents.append(inc)

    return incidents`,
        },
      },
      incident: {
        title: "Lapsus$ Microsoft Breach — XDR Correlation Gap (2022)",
        when: "March 2022",
        where: "Microsoft, Okta, Samsung, Nvidia, Ubisoft",
        impact: "37GB of Microsoft source code exfiltrated; Okta admin console accessed",
        body: [
          "The Lapsus$ group breached Microsoft, Okta, Samsung, and Nvidia in rapid succession using social engineering, SIM swapping, and purchased credentials. At Microsoft, they exfiltrated 37GB of source code from Azure DevOps. The Okta breach was particularly significant — Lapsus$ accessed the Okta admin console via a support engineer's credentials, compromising Okta's downstream customers.",
          "Post-incident analysis revealed that signals existed across multiple telemetry sources — unusual Azure DevOps access patterns, geographic anomalies in authentication, and large repository clones — but were not correlated into a single incident view in time to prevent exfiltration. Modern XDR platforms with automated entity correlation and UEBA integration would have elevated these disparate signals into a single high-priority incident within minutes of the first anomalous access.",
        ],
      },
      diagram: {
        nodes: [
          { label: "EDR + NDR + IDP + Cloud", sub: "unified telemetry lake", type: "attacker" },
          { label: "Entity Graph Correlation", sub: "cross-source alert linking", type: "system" },
          { label: "ATT&CK-Mapped Incident", sub: "timeline + technique chain", type: "victim" },
          { label: "Prioritized Response", sub: "one incident, not 1,000 alerts", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "Palo Alto Networks introduces XDR concept — 'beyond EDR'", highlight: true },
        { year: 2019, event: "CrowdStrike Falcon XDR, Microsoft Defender ATP rebranded to XDR" },
        { year: 2021, event: "Gartner XDR Market Guide — XDR recognized as security platform category" },
        { year: 2022, event: "Lapsus$ breaches Microsoft, Okta — multi-source correlation urgency highlighted" },
        { year: 2024, event: "AI-native XDR: LLM-generated incident summaries and response recommendations" },
      ],
      keyTakeaways: [
        "XDR unifies EDR + NDR + identity + cloud into a single correlated detection platform",
        "Entity graph correlation automatically links alerts sharing hosts, IPs, or users within a time window",
        "MITRE ATT&CK technique mapping turns alert clusters into readable attack chain narratives",
        "Analysts work incidents, not individual alerts — XDR reduces alert fatigue fundamentally",
        "The 'X' in XDR is extensible — best platforms ingest any telemetry source via OCSF/API",
      ],
      references: [
        { title: "Microsoft Defender XDR Documentation", url: "https://learn.microsoft.com/en-us/microsoft-365/security/defender/" },
        { title: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" },
        { title: "Lapsus$ Microsoft Disclosure (MSRC)", url: "https://msrc.microsoft.com/blog/2022/03/lapsus-targeting-with-multifactor-authentication/" },
      ],
    },
    ctf: {
      scenario: "An XDR platform correlated a multi-source incident. The incident artifacts are in three directories: raw alerts from different telemetry sources, the entity graph output, and the final incident report with ATT&CK mapping. Collect the flag.",
      hint: "The XDR stores raw-alerts/, entity-graph/, and incident-report/ for each correlated incident.",
      hints: [
        "List /xdr-incident to see the correlation artifacts.",
        "Read the files inside raw-alerts/, entity-graph/, and incident-report/.",
        "Each contains a flag_fragment.",
      ],
      files: {
        "/xdr-incident/raw-alerts/multi-source-alerts.jsonl": `{"id":"EDR-001","source":"edr","entity":"workstation-chen","technique":"T1059.001","severity":"HIGH","detail":"PowerShell encoded command executed","flag_fragment":"FLAG{XDR_"}
{"id":"NDR-001","source":"ndr","entity":"workstation-chen","technique":"T1071.001","severity":"HIGH","detail":"C2 beaconing to 185.220.101.45:443 (JA3: CobaltStrike)"}
{"id":"IDN-001","source":"identity","entity":"m.chen@corp.internal","technique":"T1078","severity":"CRITICAL","detail":"User account accessed 3 new systems in 4 minutes"}
{"id":"CLD-001","source":"cloud","entity":"m.chen@corp.internal","technique":"T1530","severity":"CRITICAL","detail":"Bulk S3 download: 2.3GB from corp-customer-data-prod"}`,
        "/xdr-incident/entity-graph/correlation-graph.json": `{
  "incident_id": "INC-2024-0115-001",
  "correlation_window_min": 60,
  "entities": {
    "workstation-chen": ["EDR-001", "NDR-001"],
    "m.chen@corp.internal": ["IDN-001", "CLD-001"]
  },
  "entity_links": [
    {"from": "workstation-chen", "to": "m.chen@corp.internal", "relationship": "logged_in_as"}
  ],
  "correlated_alert_count": 4,
  "flag_fragment": "C0RR3L4T3D_"
}`,
        "/xdr-incident/incident-report/incident-summary.json": `{
  "incident_id": "INC-2024-0115-001",
  "severity": "CRITICAL",
  "title": "Active intrusion — credential compromise + C2 + data exfiltration",
  "attack_chain": [
    {"step": 1, "technique": "T1059.001", "name": "PowerShell Execution", "source": "EDR"},
    {"step": 2, "technique": "T1071.001", "name": "C2 via HTTPS (CobaltStrike)", "source": "NDR"},
    {"step": 3, "technique": "T1078", "name": "Valid Account Abuse", "source": "Identity"},
    {"step": 4, "technique": "T1530", "name": "Data from Cloud Storage", "source": "Cloud"}
  ],
  "mitre_tactics": ["Execution", "Command and Control", "Defense Evasion", "Exfiltration"],
  "recommended_response": "Isolate workstation-chen, suspend m.chen account, revoke AWS credentials, preserve forensics",
  "flag_fragment": "1NC1D3NT}"
}`,
        "/xdr-incident/README.md": `# XDR Correlated Incident — INC-2024-0115-001

Sources: EDR (CrowdStrike) + NDR (Darktrace) + Identity (Azure AD) + Cloud (AWS)
Severity: CRITICAL
Correlation time: 2.1 seconds
Alert count → Incident count: 4 alerts → 1 incident

Artifacts:
  raw-alerts/      → Individual alerts from all telemetry sources
  entity-graph/    → Entity correlation output
  incident-report/ → Final incident with ATT&CK mapping and response recommendation`,
      },
      dirs: {
        "/": [{ name: "xdr-incident", isDir: true }],
        "/xdr-incident": [
          { name: "README.md", isDir: false },
          { name: "raw-alerts", isDir: true },
          { name: "entity-graph", isDir: true },
          { name: "incident-report", isDir: true },
        ],
        "/xdr-incident/raw-alerts": [{ name: "multi-source-alerts.jsonl", isDir: false }],
        "/xdr-incident/entity-graph": [{ name: "correlation-graph.json", isDir: false }],
        "/xdr-incident/incident-report": [{ name: "incident-summary.json", isDir: false }],
      },
      fragments: [
        { trigger: "/xdr-incident/raw-alerts/multi-source-alerts.jsonl", value: "FLAG{XDR_", label: "Fragment A — Raw Alerts" },
        { trigger: "/xdr-incident/entity-graph/correlation-graph.json", value: "C0RR3L4T3D_", label: "Fragment B — Entity Graph" },
        { trigger: "/xdr-incident/incident-report/incident-summary.json", value: "1NC1D3NT}", label: "Fragment C — Report" },
      ],
    },
  },

  // ─── audit-cm11: Continuous Compliance Monitoring ────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "ISACA Compliance Research Center", location: "Schaumburg, Illinois", era: "Present Day", emoji: "📜" },
    id: "audit-cm11",
    order: 11,
    title: "The Compliance Engine",
    subtitle: "Continuous Compliance Monitoring — real-time control verification",
    category: "cybersecurity",
    xp: 200,
    badge: { id: "audit-cm-badge-11", name: "Compliance Architect", emoji: "📜" },
    challengeType: "ctf",
    info: {
      tagline: "Annual compliance audits are already obsolete. Controls drift every day.",
      year: 2022,
      overview: [
        "Traditional compliance programs operate on annual point-in-time audits: a snapshot of controls on the day the auditor visits, which may not represent the organization's security posture for the other 364 days. Continuous Compliance Monitoring replaces the snapshot with a real-time dashboard: controls are verified programmatically and continuously against frameworks like SOC 2, PCI-DSS, ISO 27001, FedRAMP, and HIPAA.",
        "GRC platforms (ServiceNow GRC, IBM OpenPages, Archer, Vanta, Drata, Tugboat Logic) and CSPM tools with compliance modules automate control evidence collection: pulling configuration data from AWS/Azure APIs, verifying MFA enforcement from IDP logs, confirming encryption status from storage APIs, and checking patch compliance from MDM. Evidence is collected continuously, not manually gathered for an auditor visit.",
        "The shift to continuous compliance has three benefits: (1) Audit readiness is maintained year-round — no 'audit crunch' periods; (2) Control drift is detected immediately and remediated before it becomes a finding; (3) Automated evidence collection reduces audit preparation time by 60–80%, freeing GRC staff for higher-value risk management work.",
      ],
      technical: {
        title: "Automated Control Evidence Collection",
        body: [
          "Each compliance control maps to one or more technical checks that can be automated. PCI-DSS Requirement 8.3.6 (MFA for all non-console administrative access) maps to: query IDP for all admin-role users, verify MFA method is enrolled and active for each, verify no admin access has been granted without MFA in the past 30 days. This check runs daily and updates the control evidence record.",
          "Evidence artifacts include API response payloads, screenshots (for UI-only controls), logs, and configuration exports — stored with timestamps and source identifiers to create an immutable audit trail. Modern compliance platforms use cryptographic signatures on evidence artifacts to prevent tampering and support chain-of-custody requirements for regulatory audits.",
        ],
        codeExample: {
          label: "Continuous control verification — PCI-DSS MFA requirement (Python)",
          code: `import boto3
from datetime import datetime, timedelta
from typing import Literal

ControlStatus = Literal["PASS", "FAIL", "ERROR"]

def check_pci_mfa_requirement(okta_client, days: int = 30) -> dict:
    """
    PCI-DSS v4.0 Req 8.3.6: MFA required for all non-console admin access.
    Collects evidence: admin user list, MFA status per user, recent auth events.
    """
    evidence = {
        "control": "PCI-DSS-4.0-8.3.6",
        "check_time": datetime.utcnow().isoformat() + "Z",
        "users_checked": [],
        "failures": [],
        "status": "PASS",
    }

    # Pull all users with admin role
    admin_users = okta_client.list_group_users("ADMIN_GROUP_ID")

    for user in admin_users:
        mfa_factors = okta_client.list_enrolled_factors(user["id"])
        active_factors = [f for f in mfa_factors if f["status"] == "ACTIVE"]

        if not active_factors:
            evidence["failures"].append({
                "user": user["profile"]["login"],
                "finding": "No active MFA factor enrolled",
                "severity": "CRITICAL",
            })
            evidence["status"] = "FAIL"

        evidence["users_checked"].append({
            "user": user["profile"]["login"],
            "mfa_enrolled": bool(active_factors),
            "factor_types": [f["factorType"] for f in active_factors],
        })

    evidence["total_users"] = len(evidence["users_checked"])
    evidence["compliant_users"] = sum(1 for u in evidence["users_checked"] if u["mfa_enrolled"])
    evidence["compliance_pct"] = round(evidence["compliant_users"] / max(evidence["total_users"], 1) * 100, 1)
    return evidence`,
        },
      },
      incident: {
        title: "Drizly FTC Consent Order — Compliance Program Failure (2023)",
        when: "January 2023",
        where: "Drizly (Uber subsidiary), Boston",
        impact: "2.5 million customer records breached; FTC consent order binding on CEO personally",
        body: [
          "The FTC's consent order against Drizly (and its CEO personally) following a 2020 data breach was notable for explicitly holding the CEO accountable for inadequate security practices — including failure to implement basic compliance controls like MFA, least-privilege access, and security monitoring. The breach exposed 2.5 million customer records via credentials found in a public GitHub repository.",
          "The FTC order required Drizly to implement a comprehensive security program with continuous monitoring, annual third-party assessments, and a 20-year compliance obligation. The case established that individual executives can be held personally liable for systemic compliance failures — creating a new urgency for continuous compliance monitoring programs that provide real-time evidence of control effectiveness.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Compliance Frameworks", sub: "SOC 2, PCI, HIPAA, FedRAMP", type: "attacker" },
          { label: "Automated Control Checks", sub: "APIs, logs, config exports", type: "system" },
          { label: "Real-Time Dashboard", sub: "pass/fail with evidence", type: "victim" },
          { label: "Continuous Audit Readiness", sub: "no crunch, no surprises", type: "result" },
        ],
      },
      timeline: [
        { year: 2002, event: "SOX enacted — annual controls testing becomes mandatory for public companies" },
        { year: 2013, event: "Cloud-era compliance gap: annual audits can't keep pace with cloud change rates" },
        { year: 2018, event: "Vanta, Drata founded — automated continuous compliance platforms emerge", highlight: true },
        { year: 2022, event: "FedRAMP 20x initiative — continuous monitoring replaces annual authorization renewal" },
        { year: 2023, event: "FTC Drizly order — CEO personally liable for compliance program failure" },
        { year: 2024, event: "AI-native GRC: LLMs map controls to evidence and generate audit narratives" },
      ],
      keyTakeaways: [
        "Annual compliance audits are point-in-time snapshots — controls drift in between",
        "Continuous compliance replaces audit crunch with year-round automated control verification",
        "Evidence artifacts must be timestamped, sourced, and tamper-evident for regulatory audits",
        "FTC Drizly established personal CEO liability for systemic compliance failures",
        "Automated evidence collection reduces audit prep time by 60–80%",
      ],
      references: [
        { title: "NIST SP 800-53 Rev. 5 — Security and Privacy Controls", url: "https://csrc.nist.gov/publications/detail/sp/800-53/5/final" },
        { title: "FTC Drizly Consent Order", url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/2023184-drizly" },
        { title: "Vanta Continuous Compliance Platform", url: "https://www.vanta.com/" },
      ],
    },
    ctf: {
      scenario: "A continuous compliance platform ran overnight checks across three frameworks. The results are in separate framework report files. Read all three to collect the flag fragments hidden in the compliance evidence.",
      hint: "The GRC platform stores compliance results per-framework: soc2/, pci/, and fedramp/.",
      hints: [
        "Navigate to /compliance-engine and list the report directories.",
        "Each directory has one report file with a flag_fragment in the evidence.",
        "Read soc2-report.json, pci-report.json, and fedramp-report.json.",
      ],
      files: {
        "/compliance-engine/soc2/soc2-report.json": `{
  "framework": "SOC 2 Type II",
  "check_date": "2024-01-15T06:00:00Z",
  "trust_service_criteria": {
    "CC6.1": {"name": "Logical Access Controls", "status": "PASS", "evidence": "MFA: 100% admin users enrolled"},
    "CC6.6": {"name": "Security Monitoring", "status": "PASS", "evidence": "SIEM alerts: 99.7% uptime (30d)"},
    "CC7.2": {"name": "System Monitoring", "status": "FAIL", "evidence": "3 critical alerts unacknowledged > 4h SLA"},
    "CC9.2": {"name": "Vendor Risk Management", "status": "PASS", "evidence": "47/47 critical vendors assessed"}
  },
  "overall_status": "CONDITIONAL_PASS",
  "findings_count": 1,
  "flag_fragment": "FLAG{C0MPL14NC3_"
}`,
        "/compliance-engine/pci/pci-report.json": `{
  "framework": "PCI-DSS v4.0",
  "check_date": "2024-01-15T06:00:00Z",
  "requirements": {
    "Req_1": {"name": "Network Security Controls", "status": "PASS"},
    "Req_7": {"name": "Restrict Access by Business Need", "status": "PASS"},
    "Req_8.3.6": {"name": "MFA for Admin Access", "status": "PASS", "evidence": "47/47 admin users MFA-enrolled"},
    "Req_10": {"name": "Log and Monitor Access", "status": "PASS", "evidence": "100% CDE systems logging to SIEM"},
    "Req_11.3": {"name": "Penetration Testing", "status": "FAIL", "evidence": "Annual pentest overdue by 47 days"}
  },
  "overall_status": "CONDITIONAL_PASS",
  "findings_count": 1,
  "flag_fragment": "C0NT1NU0US_"
}`,
        "/compliance-engine/fedramp/fedramp-report.json": `{
  "framework": "FedRAMP Moderate",
  "check_date": "2024-01-15T06:00:00Z",
  "control_families": {
    "AC": {"name": "Access Control", "controls_checked": 25, "passing": 25, "status": "PASS"},
    "AU": {"name": "Audit and Accountability", "controls_checked": 16, "passing": 16, "status": "PASS"},
    "CM": {"name": "Configuration Management", "controls_checked": 11, "passing": 10, "status": "FAIL",
           "finding": "CM-8: Asset inventory incomplete — 4 cloud assets undiscovered"},
    "IR": {"name": "Incident Response", "controls_checked": 10, "passing": 10, "status": "PASS"},
    "SC": {"name": "System & Communications", "controls_checked": 44, "passing": 44, "status": "PASS"}
  },
  "authorization_status": "IN_GOOD_STANDING",
  "findings_count": 1,
  "flag_fragment": "4UD1T}"
}`,
        "/compliance-engine/README.md": `# Continuous Compliance Engine — Overnight Run 2024-01-15

Frameworks checked: SOC 2 Type II, PCI-DSS v4.0, FedRAMP Moderate
Run time: 06:00 UTC (daily schedule)
Total controls checked: 847
Passing: 844 (99.6%)
Findings: 3

Report directories:
  soc2/      → SOC 2 Trust Service Criteria results
  pci/       → PCI-DSS v4.0 requirement results
  fedramp/   → FedRAMP Moderate control family results`,
      },
      dirs: {
        "/": [{ name: "compliance-engine", isDir: true }],
        "/compliance-engine": [
          { name: "README.md", isDir: false },
          { name: "soc2", isDir: true },
          { name: "pci", isDir: true },
          { name: "fedramp", isDir: true },
        ],
        "/compliance-engine/soc2": [{ name: "soc2-report.json", isDir: false }],
        "/compliance-engine/pci": [{ name: "pci-report.json", isDir: false }],
        "/compliance-engine/fedramp": [{ name: "fedramp-report.json", isDir: false }],
      },
      fragments: [
        { trigger: "/compliance-engine/soc2/soc2-report.json", value: "FLAG{C0MPL14NC3_", label: "Fragment A — SOC 2" },
        { trigger: "/compliance-engine/pci/pci-report.json", value: "C0NT1NU0US_", label: "Fragment B — PCI-DSS" },
        { trigger: "/compliance-engine/fedramp/fedramp-report.json", value: "4UD1T}", label: "Fragment C — FedRAMP" },
      ],
    },
  },

  // ─── audit-cm12: Monitoring Maturity Metrics ─────────────────────────────────
  {
    epochId: "tech-audit-4",
    wonder: { name: "Gartner Security Research Institute", location: "Stamford, Connecticut", era: "Present Day", emoji: "📊" },
    id: "audit-cm12",
    order: 12,
    title: "The Maturity Scorecard",
    subtitle: "Monitoring Maturity — MTTD, MTTR, and the SOC maturity model",
    category: "cybersecurity",
    xp: 250,
    badge: { id: "audit-cm-badge-12", name: "SOC Architect", emoji: "📊" },
    challengeType: "ctf",
    info: {
      tagline: "What gets measured gets improved. MTTD and MTTR are the vital signs of your security program.",
      year: 2023,
      overview: [
        "Monitoring maturity is measured through operational metrics that quantify security effectiveness, not just compliance checkbox completion. The two most important SOC metrics are MTTD (Mean Time to Detect) — the average time between a security event occurring and the SOC detecting it — and MTTR (Mean Time to Respond) — the average time between detection and full containment. Industry benchmarks: MTTD 21 days (IBM Cost of Data Breach 2023 median); MTTR 73 days — organizations with mature monitoring programs achieve MTTD < 24 hours.",
        "The SOC Maturity Model (CREST, Gartner, SANS) defines five levels: Level 1 (Reactive — no proactive monitoring, incident-driven), Level 2 (Compliance-Focused — monitoring for regulatory requirements only), Level 3 (Proactive — threat hunting, behavioral detection), Level 4 (Threat Intelligence-Led — external TI integrated, adversary simulation), Level 5 (Adaptive — AI-augmented, continuous improvement, metrics-driven). Most enterprise organizations target Level 3–4.",
        "Beyond MTTD/MTTR, mature monitoring programs track: false positive rate (alerts requiring no action / total alerts — target < 5%), SOAR automation coverage (% of alert types with automated playbooks — target > 70%), alert-to-incident escalation rate (% of alerts escalating to formal incidents — informs detection tuning), and mean time to recover (full business service restoration, distinct from contain).",
      ],
      technical: {
        title: "MTTD/MTTR Calculation and Benchmarking",
        body: [
          "MTTD is calculated from two timestamps: the 'breach timestamp' (when the event actually occurred, determined retrospectively from logs) and the 'detection timestamp' (when the SIEM/SOC first identified the event). For incidents where the breach timestamp is unknown, MTTD is calculated as detection timestamp minus earliest indicator of compromise timestamp found in forensic analysis.",
          "MTTR is calculated from detection timestamp to containment timestamp (the moment the threat is isolated and can no longer cause damage). Full recovery (business service restoration) is tracked separately as MTTRECOVER. Dashboard visualization: MTTD/MTTR trend lines over 90-day rolling windows, segmented by incident severity, detection source (automated vs human), and attack category. Regression in either metric triggers a program review.",
        ],
        codeExample: {
          label: "MTTD/MTTR metrics dashboard (Python — incident data aggregation)",
          code: `import statistics
from datetime import datetime
from typing import Sequence

def compute_mttd_mttr(incidents: list[dict]) -> dict:
    """
    Compute MTTD and MTTR from incident records.
    Each incident requires: breach_ts, detected_ts, contained_ts (ISO 8601).
    """
    mttd_hours: list[float] = []
    mttr_hours: list[float] = []

    for inc in incidents:
        breach = datetime.fromisoformat(inc["breach_ts"])
        detected = datetime.fromisoformat(inc["detected_ts"])
        contained = datetime.fromisoformat(inc["contained_ts"])

        mttd_hours.append((detected - breach).total_seconds() / 3600)
        mttr_hours.append((contained - detected).total_seconds() / 3600)

    def stats(values: list[float]) -> dict:
        return {
            "mean_hours": round(statistics.mean(values), 1),
            "median_hours": round(statistics.median(values), 1),
            "p90_hours": round(sorted(values)[int(len(values) * 0.9)], 1),
            "min_hours": round(min(values), 1),
            "max_hours": round(max(values), 1),
        }

    result = {
        "period": "Q4 2024",
        "incident_count": len(incidents),
        "mttd": stats(mttd_hours),
        "mttr": stats(mttr_hours),
        "benchmarks": {
            "industry_mttd_median_hours": 504,  # IBM 2023: 21 days
            "industry_mttr_median_hours": 1752, # IBM 2023: 73 days
            "target_mttd_hours": 24,
            "target_mttr_hours": 4,
        },
    }
    # Flag if regressing vs target
    result["mttd_status"] = "ON_TARGET" if result["mttd"]["mean_hours"] <= 24 else "NEEDS_IMPROVEMENT"
    result["mttr_status"] = "ON_TARGET" if result["mttr"]["mean_hours"] <= 4 else "NEEDS_IMPROVEMENT"
    return result`,
        },
      },
      incident: {
        title: "MGM Resorts Breach — MTTD/MTTR Failure (2023)",
        when: "September 11–13, 2023",
        where: "MGM Resorts International, Las Vegas",
        impact: "$100M+ operational losses; casino floor offline; 10-day recovery",
        body: [
          "The MGM Resorts breach began with a 10-minute social engineering call to the MGM IT helpdesk, impersonating an employee to reset credentials — the attacker found the target's LinkedIn profile and used it to pass knowledge-based authentication. Within hours, Scattered Spider had deployed ALPHV/BlackCat ransomware across MGM's systems, taking casino operations, hotel check-ins, and digital key cards offline.",
          "MGM's MTTR was catastrophic — full operations recovery took 10 days at an estimated cost of $100M+. Post-incident analysis identified MTTD failure: the social engineering call and subsequent credential activity were not detected and correlated in time to prevent the ransomware deployment. The incident reinforced that MTTD is not just a technical metric — it includes the time for detection to route to the right person and trigger the right response.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Incident Data", sub: "breach, detect, contain timestamps", type: "attacker" },
          { label: "MTTD / MTTR Computation", sub: "rolling 90-day metrics", type: "system" },
          { label: "Maturity Scoring", sub: "Level 1–5 SOC model", type: "victim" },
          { label: "Program Improvement", sub: "gap analysis → investment plan", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "SANS SOC Survey — first industry-wide SOC maturity benchmarking" },
        { year: 2017, event: "IBM Cost of Data Breach Report establishes MTTD/MTTR as standard metrics", highlight: true },
        { year: 2020, event: "CREST SOC Maturity Model published — five-level framework for SOC assessment" },
        { year: 2023, event: "IBM 2023 report: median MTTD 21 days, MTTR 73 days — maturity gap quantified" },
        { year: 2023, event: "MGM Resorts breach: 10-day MTTR, $100M+ losses — maturity failure case study" },
        { year: 2024, event: "AI-augmented SOC targets: MTTD < 1 hour, MTTR < 30 minutes for automated playbooks" },
      ],
      keyTakeaways: [
        "MTTD and MTTR are the vital signs of a security program — track them on rolling 90-day windows",
        "Industry median MTTD: 21 days; industry median MTTR: 73 days — mature programs target < 24h / < 4h",
        "SOC Maturity Level 3 (Proactive) is the minimum target — Levels 1–2 are compliance-only reactive postures",
        "False positive rate > 5% degrades analyst effectiveness and masks real threats in noise",
        "SOAR automation coverage > 70% is needed to achieve sub-hour MTTR at scale",
      ],
      references: [
        { title: "IBM Cost of a Data Breach Report 2023", url: "https://www.ibm.com/reports/data-breach" },
        { title: "CREST SOC Maturity Model", url: "https://www.crest-approved.org/soc-maturity-assessment/" },
        { title: "MGM Resorts Breach SEC 8-K Filing", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000789570&type=8-K" },
      ],
    },
    ctf: {
      scenario: "A SOC maturity assessment completed overnight. The results are stored across three report files: the MTTD/MTTR metrics, the maturity level assessment, and the program improvement roadmap. Read all three to collect the final flag of the Continuous Monitoring 2.0 epoch.",
      hint: "The maturity assessment stores metrics/, maturity/, and roadmap/ in separate directories.",
      hints: [
        "List /soc-maturity to find the assessment output directories.",
        "Read the files in metrics/, maturity/, and roadmap/ in that order.",
        "The final flag fragment is in the roadmap file — it represents the culmination of the full monitoring program.",
      ],
      files: {
        "/soc-maturity/metrics/mttd-mttr-q4-2024.json": `{
  "period": "Q4 2024",
  "incident_count": 47,
  "mttd": {
    "mean_hours": 18.4,
    "median_hours": 11.2,
    "p90_hours": 44.1,
    "min_hours": 0.08,
    "max_hours": 312.0
  },
  "mttr": {
    "mean_hours": 3.2,
    "median_hours": 1.8,
    "p90_hours": 8.4,
    "min_hours": 0.02,
    "max_hours": 96.0
  },
  "benchmarks": {
    "industry_mttd_median_hours": 504,
    "industry_mttr_median_hours": 1752,
    "target_mttd_hours": 24,
    "target_mttr_hours": 4
  },
  "mttd_status": "ON_TARGET",
  "mttr_status": "ON_TARGET",
  "false_positive_rate_pct": 3.2,
  "soar_automation_coverage_pct": 74,
  "flag_fragment": "FLAG{M4TUR1TY_"
}`,
        "/soc-maturity/maturity/level-assessment.json": `{
  "assessment_date": "2024-01-15",
  "framework": "CREST SOC Maturity Model",
  "current_level": 4,
  "level_name": "Threat Intelligence-Led",
  "criteria_met": [
    "Level 1: Reactive incident response — PASS",
    "Level 2: Compliance monitoring (SOC2, PCI, FedRAMP) — PASS",
    "Level 3: Proactive detection — UEBA, NDR, CSPM deployed — PASS",
    "Level 4: Threat intel integration — STIX/TAXII feeds, TTP mapping — PASS"
  ],
  "criteria_not_met": [
    "Level 5: Adaptive — AI-augmented continuous improvement not yet deployed"
  ],
  "target_level": 5,
  "gap_to_target": "Deploy AI-augmented triage; establish continuous improvement feedback loop",
  "flag_fragment": "M3TR1CS_"
}`,
        "/soc-maturity/roadmap/improvement-roadmap.txt": `# SOC Maturity Improvement Roadmap — FY2025

Current State: Level 4 (Threat Intelligence-Led)
Target State:  Level 5 (Adaptive)
Timeline:      Q1 2025 – Q4 2025

## Q1 2025 — AI-Augmented Alert Triage
- Deploy LLM-based alert summarization (target: reduce analyst triage time 40%)
- Implement automated MITRE ATT&CK technique tagging on all alerts
- Milestone metric: MTTD < 8 hours average

## Q2 2025 — Continuous Improvement Feedback Loop
- Establish weekly SOC metrics review (MTTD, MTTR, FP rate trend)
- Deploy red team / purple team exercise program (monthly)
- Milestone metric: False positive rate < 2%

## Q3 2025 — Adversary Simulation Integration
- Integrate BAS (Breach and Attack Simulation) with detection validation
- Automate detection gap identification from purple team exercises
- Milestone metric: SOAR automation coverage > 85%

## Q4 2025 — Level 5 Certification
- CREST SOC Maturity Level 5 assessment
- Publish internal SOC scorecard to board
- Milestone metric: MTTD < 4 hours, MTTR < 1 hour

─────────────────────────────────────────────────────────────────────
WHAT YOU'VE LEARNED IN THIS EPOCH:
  You've mastered the full Continuous Monitoring 2.0 stack:
  ISCM frameworks → Next-Gen SIEM → UEBA → NDR → CSPM →
  Threat Intel → SOAR → Deception → Zero Trust → XDR →
  Continuous Compliance → and finally: Monitoring Maturity.

  The best SOC is not the one with the most tools —
  it is the one that knows exactly how effective it is
  and improves continuously.
─────────────────────────────────────────────────────────────────────

flag_fragment: S0C_L3V3L5}"`,
        "/soc-maturity/README.md": `# SOC Maturity Assessment — Q4 2024

Assessor: Internal GRC Team + CREST Certified Assessor
Assessment date: 2024-01-15
Current level: 4 (Threat Intelligence-Led)
Target level: 5 (Adaptive)

Assessment components:
  metrics/   → MTTD, MTTR, and operational metrics (Q4 2024)
  maturity/  → Level assessment and criteria evaluation
  roadmap/   → FY2025 improvement roadmap to Level 5`,
      },
      dirs: {
        "/": [{ name: "soc-maturity", isDir: true }],
        "/soc-maturity": [
          { name: "README.md", isDir: false },
          { name: "metrics", isDir: true },
          { name: "maturity", isDir: true },
          { name: "roadmap", isDir: true },
        ],
        "/soc-maturity/metrics": [{ name: "mttd-mttr-q4-2024.json", isDir: false }],
        "/soc-maturity/maturity": [{ name: "level-assessment.json", isDir: false }],
        "/soc-maturity/roadmap": [{ name: "improvement-roadmap.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/soc-maturity/metrics/mttd-mttr-q4-2024.json", value: "FLAG{M4TUR1TY_", label: "Fragment A — Metrics" },
        { trigger: "/soc-maturity/maturity/level-assessment.json", value: "M3TR1CS_", label: "Fragment B — Level" },
        { trigger: "/soc-maturity/roadmap/improvement-roadmap.txt", value: "S0C_L3V3L5}", label: "Fragment C — Roadmap" },
      ],
    },
  },
];
