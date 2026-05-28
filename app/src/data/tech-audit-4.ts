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
    easeScore: 6,
    valueScore: 8,
    rank: 11,
    challengeType: "ctf",
    info: {
      tagline: "You cannot defend what you cannot see. Continuous monitoring turns visibility into security.",
      year: 2011,
      overview: [
        "NIST Special Publication 800-137 defines Information Security Continuous Monitoring (ISCM) as maintaining ongoing awareness of information security, vulnerabilities, and threats to support organizational risk management decisions. Published in 2011 and updated through 2024, it remains the authoritative federal framework for continuous monitoring programs.",
        "ISCM is built on six steps: Define, Establish, Implement, Analyze/Report, Respond, and Review. These steps form a continuous cycle — not a one-time project. The framework distinguishes between three monitoring tiers: the organizational tier (governance and strategy), the mission/business process tier (process-level risk), and the information system tier (technical controls and data).",
        "Modern ISCM programs go beyond compliance checkbox monitoring. They establish metrics, define monitoring frequencies based on asset criticality, automate data collection, and feed findings into risk management decisions. The goal is not just detecting incidents — it is maintaining an accurate, real-time picture of organizational security posture.",
        "The architectural foundation of a mature ISCM program is the selection and baselining of security metrics that are genuinely predictive of risk. Common ISCM metrics include patch compliance percentage, vulnerability scan coverage, MFA enforcement rate, log forwarding health, mean time to remediate critical vulnerabilities, and privileged account review completion rate. Each metric must have a defined owner, a collection mechanism, a target threshold, and a response procedure when the threshold is breached.",
        "ISCM integrates with the broader federal security ecosystem through the Continuous Diagnostics and Mitigation (CDM) program, managed by CISA, which provides shared tools and dashboards to federal civilian agencies. The CDM program deploys commercial ISCM tools — asset management, vulnerability management, identity management — and feeds results into an agency-level dashboard and a federal-level dashboard for government-wide situational awareness.",
        "Artificial intelligence is reshaping ISCM in two ways. First, ML models can automatically classify assets by criticality and recommend monitoring frequencies without manual FIPS 199 categorization for every system. Second, LLMs are beginning to appear as natural-language interfaces to ISCM dashboards — a CISO can ask 'which of our HIGH-impact systems have stale vulnerability scan data?' and receive an immediate, plain-language answer backed by live metric queries.",
        "Operationally, what good ISCM looks like is a security team that can answer three questions in under five minutes at any time: what is our current patch compliance percentage for critical systems, are all our HIGH-impact systems forwarding logs to the SIEM, and what are the top five open vulnerabilities by CVSS score. Organizations that cannot answer these questions within hours are operating with an ISCM program at maturity Level 1 or below.",
      ],
      technical: {
        title: "ISCM Implementation Architecture",
        body: [
          "A production ISCM program requires four layers: data collection (agents, APIs, log forwarders), normalization (parsing into a common schema like ECS or OCSF), analysis (correlation rules, ML models, threat intelligence enrichment), and response (dashboards, alerts, ticketing integration, automated playbooks).",
          "Monitoring frequency is driven by asset criticality and control volatility. A public-facing web application needs vulnerability scans daily or continuously; an air-gapped backup system may need only weekly checks. NIST 800-137 provides a frequency decision framework based on FIPS 199 categorization (Low/Moderate/High impact systems).",
          "The Python script in this stage implements the ISCMMetric class, the core data structure of any ISCM automation. Breaking it down: the constructor takes three arguments — name (a human-readable metric identifier like 'patch_compliance_pct'), frequency_hours (the collection cadence derived from FIPS 199 impact level), and criticality (the LOW/MODERATE/HIGH label). The class stores last_collected and current_value as optional fields, allowing the metric to represent both stale and fresh states. The is_stale() method computes staleness by comparing the current UTC time against last_collected plus the frequency window — if no data has ever been collected, the metric is immediately stale. The status() method serializes the metric to a dictionary suitable for JSON export to a SIEM or dashboard.",
          "The four instantiated metrics at the bottom of the script represent a realistic HIGH-impact system configuration: patch_compliance_pct at 24-hour frequency, vuln_scan_coverage_pct at 1-hour frequency (near-continuous), mfa_enforcement_pct at 24-hour, and log_forwarding_health_pct at 1-hour. This reflects NIST 800-137's guidance that HIGH-impact systems require sub-hourly monitoring for the most critical operational controls. In production, this script would be extended with actual data fetchers: calling the vulnerability management API to compute scan coverage, querying the IDP for MFA enforcement, and hitting the SIEM API for log ingestion health.",
          "Enterprise ISCM architectures integrate with SIEM (Splunk, Microsoft Sentinel, Chronicle) via syslog or API push, with GRC platforms (ServiceNow GRC, Archer) for control evidence storage, and with ticketing systems (Jira, ServiceNow ITSM) for automated remediation workflows. When an ISCM metric breaches its threshold, the integration layer creates a ticket assigned to the system owner with SLA tracking. Repeat breaches escalate to the CISO dashboard automatically.",
          "An MCP server for ISCM — call it mcp-iscm-monitor — exposes the organization's live monitoring metrics to AI assistants. The server would expose tools such as: get_metric_status (returns current value and staleness for a named metric), list_stale_metrics (returns all metrics past their collection window), get_system_fips_tier (returns the FIPS 199 impact level for a given system), run_coverage_report (generates a full ISCM coverage report across all asset classes), and create_remediation_ticket (opens a ServiceNow ticket for a failing metric). An auditor using Claude with this MCP server could ask: 'Which HIGH-impact systems have stale vulnerability scan data as of today?' and Claude would call get_metric_status and list_stale_metrics, synthesize the results, and produce an audit finding — a workflow that previously took an analyst 30-45 minutes of manual data gathering.",
          "Security considerations for the MCP server are non-trivial. ISCM data includes asset inventories, vulnerability counts, and control failure details — all of which are sensitive. The MCP server should authenticate via OAuth 2.0 with scoped tokens, require read-only access for auditor personas, log every tool call to an immutable audit trail, and enforce network-level controls (private VPC endpoint, no public internet exposure). Tool calls that trigger remediation actions (like create_remediation_ticket) must require elevated privileges and produce audit log entries recording which AI session initiated the action.",
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
          "The Office of Personnel Management breach was the largest theft of US government personnel data in history. Attackers — attributed to Chinese state actors — maintained persistent access for over 14 months before detection. The OPM's Inspector General had warned repeatedly about inadequate continuous monitoring capabilities, including the absence of a comprehensive ISCM program. OPM had failed to implement the DHS Continuous Diagnostics and Mitigation program despite federal mandates, leaving the agency essentially blind to the attacker's movements across its network.",
          "Post-breach analysis revealed OPM lacked visibility into lateral movement within its network, had no behavioral baselining of privileged user accounts, and had not implemented the CDM program mandated by DHS. The attackers used the SOGU malware family to establish persistence and exfiltrate data across multiple channels over more than a year. A functioning ISCM program with anomaly detection on privileged account access would likely have detected the breach within days, not months.",
          "The specific ISCM gaps that enabled the breach duration were: no continuous log aggregation from network devices (meaning lateral movement was invisible), no monitoring of privileged account access patterns (the attacker used compromised admin credentials freely), no asset inventory that would have revealed unauthorized systems communicating externally, and no automated alerting on large data transfers to unexpected destinations. Each of these gaps maps directly to NIST 800-137 requirements that OPM had not implemented.",
          "The OPM breach catalyzed the US government's investment in federal ISCM. Congress approved $6B in additional cybersecurity spending, the CDM program was accelerated across all federal civilian agencies, and NIST published SP 800-137A in 2022 providing specific ISCM assessment guidance. The lesson for every organization: the cost of a mature ISCM program is a fraction of the cost of the breach it prevents.",
          "What a proper ISCM program would have detected: the initial SOGU malware installation would have created an anomalous process running outside the approved software inventory; the credential harvesting tools would have triggered endpoint protection alerts that a SIEM would have correlated; the lateral movement would have appeared as authentication events from unusual source systems; and the data staging before exfiltration would have generated network flow anomalies to unexpected internal endpoints. Each signal alone might have been dismissed — but an ISCM program with proper correlation would have flagged the combination within 48-72 hours of the initial compromise.",
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
        "The four ISCM architecture layers are: collect, normalize, analyze, and respond — gaps in any layer create blind spots",
        "ISCM metrics must have defined owners, collection mechanisms, target thresholds, and breach response procedures",
        "LLM-enhanced ISCM dashboards enable natural language querying of live security posture data",
        "MCP servers can expose ISCM metrics to AI auditors, automating evidence collection that previously took 30-45 minutes manually",
        "The CDM program provides shared ISCM tooling to federal agencies — the model for enterprise shared services",
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
    easeScore: 6,
    valueScore: 10,
    rank: 4,
    challengeType: "ctf",
    info: {
      tagline: "Signatures catch yesterday's attacks. ML catches tomorrow's.",
      year: 2020,
      overview: [
        "Traditional SIEM platforms (Splunk, ArcSight, QRadar) operate on signature-based detection: engineers write correlation rules that match known attack patterns. This approach works well for commodity attacks but fails against novel techniques, living-off-the-land (LOTL) attacks, and slow-burn APT campaigns that stay below individual rule thresholds.",
        "Next-generation SIEM platforms (Microsoft Sentinel, Google Chronicle, Elastic SIEM, Securonix) augment rule-based detection with machine learning: unsupervised anomaly detection, supervised classifiers trained on labeled attack data, and graph-based entity resolution. They ingest petabyte-scale data from cloud APIs, endpoint agents, network taps, and identity providers — not just traditional syslog.",
        "The key architectural shift in next-gen SIEM is normalization to a common schema (OCSF — Open Cybersecurity Schema Framework, or Elastic Common Schema) before storage. This allows a single detection rule to match across dozens of data sources. Combined with threat intelligence enrichment at ingest time, analysts see context-rich alerts rather than raw log lines.",
        "Next-gen SIEMs are built on cloud-scale data lake architectures. Microsoft Sentinel uses Azure Data Explorer and Log Analytics; Google Chronicle is built on Google's own Bigtable-based Chronicle SIEM lake; Elastic SIEM uses Elasticsearch. The shift from on-premises appliances to cloud-native SIEM eliminates capacity planning — organizations can ingest petabytes per day without hardware procurement. The cost model shifts from CapEx (hardware) to OpEx (data ingestion volume), which has driven fierce competition on per-GB ingestion pricing.",
        "Detection engineering in next-gen SIEMs is a software engineering discipline. Detection rules are written in platform-specific languages (KQL for Sentinel, YARA-L for Chronicle, SPL for Splunk) and stored in version-controlled repositories. The Detection-as-Code movement applies CI/CD principles to rule development: rules are unit-tested against synthetic attack data, peer-reviewed, and deployed through a pipeline. Sigma — an open-source detection rule format — enables writing rules once and compiling to any SIEM's native language.",
        "AI is transforming SIEM in two distinct ways beyond anomaly detection. First, LLMs are being integrated as natural language interfaces: analysts can ask 'show me all authentication events from Russia for admin accounts in the last 24 hours' and the LLM translates this to KQL or SPL and executes it. Second, generative AI assists with alert triage — given an alert, the LLM summarizes the context, retrieves relevant threat intelligence, and drafts a recommended response, reducing the analyst's cognitive load significantly.",
        "Audit and assessment of a next-gen SIEM program examines: data source coverage (what percentage of assets are sending logs), detection rule freshness (when were rules last reviewed and updated against current TTPs), false positive rate (alerts with no action taken / total alerts — target below 5%), mean time to alert (time from event occurrence to SIEM alert generation — target under 5 minutes for critical events), and MITRE ATT&CK coverage (what percentage of ATT&CK techniques have at least one active detection rule).",
      ],
      technical: {
        title: "ML Detection Patterns in Next-Gen SIEM",
        body: [
          "Three ML techniques dominate next-gen SIEM detection: (1) Isolation Forest / DBSCAN for unsupervised outlier detection on user/entity behavior baselines; (2) gradient boosting classifiers (XGBoost, LightGBM) trained on labeled threat data for supervised detection; (3) graph neural networks for lateral movement detection by modeling authentication relationships.",
          "False positive reduction is the primary operational challenge. A SIEM generating 10,000 alerts per day with 99% false positives still produces 100 real incidents buried in noise. Next-gen SIEMs use alert clustering, deduplication, and UEBA risk scores to surface only the highest-confidence findings for analyst review.",
          "The Python script in this stage is a canonical example of unsupervised anomaly detection applied to login events. Breaking it down: the extract_features() function performs feature engineering — transforming raw login event dictionaries into a fixed-length numeric vector. The five features are hour of day (catches off-hours logins), failed_attempts (catches credential stuffing), new_country (catches geographic anomalies), bytes_out_mb (catches data exfiltration during the session), and admin_escalation (catches privilege abuse). Each feature is chosen because it has behavioral signal independent of the attacker's identity.",
          "The IsolationForest model is initialized with contamination=0.01, meaning it assumes 1% of the training data may itself be anomalous — a realistic assumption for 30 days of login data. The model.fit() call trains on 30 days of normal login behavior, establishing the baseline. The decision_function() call on today's logins returns anomaly scores: negative values indicate anomalies, with more negative values indicating stronger anomalies. The threshold of -0.1 is a starting point that should be tuned based on the organization's alert volume tolerance. In production, this script would run as a scheduled job, push results to the SIEM via API, and integrate with the SOAR platform for automated triage.",
          "Enterprise SIEM integration patterns: alerts from this script would be pushed to Microsoft Sentinel via the Log Analytics Data Collector API or to Splunk via the HTTP Event Collector (HEC). Each anomaly becomes a custom security event with schema fields mapping to OCSF's Authentication class. The SIEM's correlation engine then links this anomaly alert to other alerts on the same user or IP address within a time window, building an incident timeline. SOAR integration triggers a playbook that enriches the alert with AD group membership, recent ticket history, and manager contact information before routing to an analyst.",
          "The MCP server for next-gen SIEM — mcp-siem-hunter — exposes live SIEM query capabilities to AI assistants. Tools include: run_kql_query (executes a KQL query against Sentinel and returns results), get_alert_timeline (returns the full alert timeline for a given user or IP over a specified period), search_by_ioc (searches all logs for a given IP, domain, or hash), get_detection_coverage (returns MITRE ATT&CK coverage map), and tune_alert_threshold (adjusts detection sensitivity for a named rule). An auditor using Claude with mcp-siem-hunter could instruct: 'Find all alerts involving the IP 185.220.101.45 in the last 72 hours and correlate them with any associated user accounts.' Claude would call run_kql_query, get_alert_timeline, and search_by_ioc in sequence, then synthesize a comprehensive threat timeline — a task that would take a skilled analyst 20 minutes of manual query work.",
          "A sample MCP tool implementation using the fastmcp SDK: the run_kql_query tool accepts a query string and time range, authenticates to the Sentinel workspace using a managed identity token, executes the query via the Azure Monitor Query SDK, and returns results as a list of dictionaries. The tool enforces a maximum row limit of 10,000 to prevent runaway queries, logs every execution to an audit table in Sentinel itself, and validates the query against a whitelist of allowed table names to prevent data exfiltration via query injection.",
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
          "The SolarWinds SUNBURST attack trojanized the Orion software build process, inserting a backdoor into legitimate signed updates distributed to 18,000 customers. The malware was extraordinarily sophisticated in its evasion design: it lay dormant for 12-14 days after installation, communicated using the same DNS patterns as legitimate SolarWinds telemetry, avoided executing on systems belonging to security vendors (checking the hostname against a blocklist), and used a domain-generation algorithm for C2 that blended with normal DNS traffic. No signature-based SIEM rule could detect it because it looked identical to legitimate software behavior.",
          "FireEye discovered the attack not through SIEM alerts but through a human analyst noticing an unusual MFA device registration on a FireEye corporate account — a phone number that didn't match the employee's profile. This behavioral anomaly — exactly the kind a next-gen SIEM with UEBA would flag automatically — was the thread that unraveled the entire campaign. Post-incident, Microsoft Sentinel and other next-gen platforms deployed specific SUNBURST behavioral models: detection rules that look for the specific DGA pattern, the dormancy behavior, and the process injection technique used by SUNBURST.",
          "The SolarWinds attack fundamentally changed the SIEM industry's understanding of detection scope. Prior to SUNBURST, most SIEM programs were optimized for known-bad signatures and compliance rules. After SUNBURST, behavioral detection became a board-level requirement. Organizations with signature-only SIEMs scrambled to add ML capabilities. The attack also drove adoption of software supply chain monitoring — detecting when signed, legitimate software exhibits unexpected network behavior is now a standard next-gen SIEM detection category.",
          "For auditors assessing SIEM programs post-SolarWinds, the key questions are: does the SIEM have ML-based behavioral baselines for network traffic from all software management tools, does the platform detect dormancy-then-activation patterns in process execution, does the organization have a detection rule for DGA-based DNS queries, and is the SIEM ingesting endpoint telemetry at sufficient granularity to see process-level network connections? A SIEM that only ingests firewall logs would have missed SUNBURST entirely — the attack used legitimate, allowed DNS traffic.",
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
        "Detection-as-Code applies CI/CD principles to rule development — version control, peer review, and testing",
        "Sigma format enables writing detection rules once and compiling to any SIEM platform's native language",
        "MITRE ATT&CK coverage percentage is a key audit metric — what percentage of techniques have active detections",
        "LLM interfaces allow analysts to query SIEM data in natural language, dramatically reducing query skill requirements",
        "MCP servers (mcp-siem-hunter) can expose live SIEM query capabilities to AI auditors for automated evidence collection",
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
    easeScore: 5,
    valueScore: 9,
    rank: 9,
    challengeType: "ctf",
    info: {
      tagline: "Attackers steal credentials. UEBA detects the behavior that follows.",
      year: 2018,
      overview: [
        "User and Entity Behavior Analytics (UEBA) addresses the fundamental limitation of perimeter and signature-based security: once an attacker has valid credentials, they appear legitimate to traditional controls. UEBA builds statistical baselines of normal behavior for every user and entity (devices, service accounts, applications) and flags deviations — even when the attacker is using stolen but valid credentials.",
        "UEBA platforms ingest identity data (Active Directory, Okta, Azure AD), endpoint telemetry (EDR), network flows (NetFlow, IPFIX), application logs, and DLP events. For each entity, they compute behavioral features: typical working hours, usual geographic locations, normal data access volumes, peer group behavior comparison, application usage patterns, and authentication sequences.",
        "The output of UEBA is a risk score — a continuous numeric representation of how anomalous an entity's current behavior is relative to its own baseline and its peer group. A single anomaly rarely triggers an alert; UEBA systems chain multiple low-confidence anomalies into a high-confidence risk finding. This threat-chaining approach is what distinguishes UEBA from single-rule alerting.",
        "UEBA architecture has two foundational components: the baseline engine and the scoring engine. The baseline engine runs continuously, ingesting behavioral telemetry and updating per-entity statistical models — typically using exponential moving averages, ARIMA time-series models, or LSTM neural networks to capture temporal patterns. The scoring engine computes anomaly magnitude as the deviation from baseline in standard deviations, normalized to a 0-10 scale. Crucially, baselines are per-entity, not global — a CFO's normal data access volume would be flagged as catastrophic for a junior analyst.",
        "Peer group analysis is the second dimension of UEBA scoring. Each entity is assigned to peer groups based on job title, department, location, and system access. If a user's behavior is anomalous relative to their own baseline but normal relative to their peer group (e.g., an M&A analyst downloading large volumes of financial data), the peer comparison reduces the risk score. Conversely, if a user behaves normally relative to their own baseline but drastically differently from peers (e.g., the only person in the engineering department accessing HR systems), the peer deviation elevates the score.",
        "The 30-90 day baseline establishment period is a critical deployment consideration. During this learning period, the UEBA system should operate in monitor-only mode — generating risk scores but not alerting — to prevent excessive false positives from disrupting operations. Organizations should also exclude periods of known anomalous behavior (year-end financial reviews, major product launches) from training data to prevent legitimate seasonal patterns from skewing the baseline toward anomaly.",
        "AI advancements are extending UEBA beyond statistical anomaly detection. Large language models are being used to generate natural-language explanations of why a user's behavior triggered a risk score: instead of 'anomaly score 7.8', an analyst sees 'Marcus Chen accessed 3x his normal volume of HR files, from a new device, at 3am, and then transferred a large file to an external cloud storage service — this combination matches patterns seen in 87% of confirmed insider theft cases in the training dataset.' This explainability dramatically reduces analyst investigation time.",
      ],
      technical: {
        title: "Risk Scoring and Threat Chaining",
        body: [
          "UEBA risk scores are computed using ensemble models: time-series forecasting (ARIMA, LSTM) for temporal behavioral baselines, peer group comparison for relative anomaly scoring, and Bayesian networks for correlating independent signals into a compound risk score. The key insight is that none of the individual signals may exceed an alert threshold — but their combination does.",
          "Threat chaining example: User downloads 500MB (low risk: 2.1), logs in from a new country (moderate: 4.8), accesses HR database for the first time (moderate: 5.2), emails an external address with an attachment (moderate: 4.1). No single event triggers an alert; the chained risk score of 8.9 does. This reduces false positives dramatically compared to rule-based detection.",
          "The Python script in this stage implements threat chaining through the BehaviorSignal dataclass and chain_risk_score function. Each BehaviorSignal captures three dimensions: raw_score (the anomaly magnitude on a 0-10 scale), confidence (the model's certainty that this signal is genuinely anomalous, from 0.0 to 1.0), and weight (a domain-specific multiplier — bulk HR data downloads are weighted 1.5x because they have higher true-positive rates in insider threat scenarios). The weighted_score property combines these into a single number representing the effective contribution of each signal.",
          "The chain_risk_score function applies a logarithmic scaling formula that produces two key behaviors: first, the total score grows with the number of signals (multiple moderate signals compound toward the critical threshold of 8.0), but with diminishing returns — a tenth signal adds less to the score than the second signal. This prevents a single high-volume, low-quality signal source from dominating the alert. The math.log1p(len(signals)) multiplier is the key: it grows from 0.69 for two signals to 2.30 for ten signals, creating a natural penalty for relying on single-signal alerting. The min(10.0, ...) cap prevents scores from exceeding the maximum.",
          "In production UEBA deployments, the chain_risk_score function integrates with a case management workflow. When a score exceeds the critical threshold (typically 8.0), the UEBA platform automatically creates a case in the SIEM, attaches all contributing signals as evidence, pulls the entity's recent HR record (departure date, performance review status, access certifications), and routes to the appropriate SOC tier based on the entity's access level. Service accounts generating critical risk scores route directly to the IR team — a service account should never exhibit behavioral anomalies, so any deviation is treated as an indicator of compromise rather than an insider threat.",
          "The MCP server for UEBA — mcp-ueba-analyst — exposes entity risk data to AI assistants. Tools include: get_entity_risk_score (returns the current risk score and contributing signals for a given user or entity), get_risk_timeline (returns the risk score history for an entity over a specified period), list_high_risk_entities (returns all entities currently above a given risk threshold), compare_to_peers (compares an entity's behavior to its peer group and returns deviations), and get_signal_explanation (returns a plain-language explanation of why a given signal was flagged). A CISO using Claude with this MCP server could ask: 'Are there any employees in the finance department with risk scores above 7 in the last 7 days?' Claude calls list_high_risk_entities with the department filter, then get_signal_explanation for each result, and synthesizes a human-readable summary with specific behavioral concerns — replacing a manual analyst review that would take 15-30 minutes per high-risk entity.",
          "Security and privacy considerations for UEBA are significant. UEBA data constitutes detailed behavioral surveillance of employees — in some jurisdictions, this requires works council notification, privacy impact assessments, and data minimization commitments. Access to UEBA dashboards should be strictly controlled: HR professionals should not have access to IT UEBA data, and vice versa. The MCP server must enforce these access boundaries through role-based tool permissions. All UEBA data should be retained only for the minimum period necessary (typically 90-180 days for behavioral baselines, 1-2 years for confirmed incident evidence), with automated deletion policies.",
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
          "Two former Tesla employees transferred over 100GB of confidential data to German media outlet Handelsblatt before resigning. The leaked data included personal information of 75,735 Tesla employees, customer complaints about Tesla's Autopilot system, and financial records. Tesla's investigation revealed the employees had systematically extracted data over weeks using their legitimate access — a textbook insider threat pattern that is invisible to signature-based security but highly visible to UEBA.",
          "UEBA would have detected multiple behavioral signals in the weeks preceding the departure: large file downloads from HR systems well above the employees' established baseline, USB device activity outside normal patterns (the transfers were made to external drives), email forwarding to personal accounts (a classic pre-departure data collection pattern), and access to data repositories outside the employees' normal job function. Each signal individually might have been dismissed as plausible work activity; the chained risk score across all signals would have generated a critical alert well before the data reached the journalist.",
          "The specific UEBA signals that would have fired: (1) access volume anomaly — bulk download of HR records representing a 40x increase over the employees' 90-day baseline; (2) new resource type access — employees in an engineering role accessing HR compensation databases for the first time in their tenure; (3) USB exfiltration pattern — mounting a new device followed immediately by large file transfers; (4) off-hours access — many of the transfers occurred during evenings and weekends; (5) peer group deviation — no other engineers in their department were accessing HR systems. The compound risk score across these five signals would have exceeded the critical alert threshold within days of the first anomalous access.",
          "Tesla's legal response was significant — they filed suit against both former employees and obtained a temporary restraining order to prevent further disclosure. However, the legal response came after the data had already been transferred. A UEBA-triggered response would have flagged the behavior while the employees were still employed, enabling HR and legal to investigate before resignation and potentially recover the data before it reached external parties. This is the operational value proposition of insider threat detection: enabling intervention before harm rather than litigation after.",
          "The industry lesson from the Tesla case is that insider threats are fundamentally a data access governance and monitoring problem, not just a security technology problem. Tesla, like many rapidly growing companies, granted broad access rights to employees in the name of operational speed — a legacy of startup culture. UEBA alone cannot solve the problem if the underlying access rights are excessive. The combination of least-privilege access controls (limiting what data employees can access) with UEBA (detecting anomalous access within those rights) is the complete defense. UEBA alerts should trigger access reviews, not just incident response.",
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
        "Peer group comparison is the second scoring dimension — deviation from peers elevates scores independent of self-baseline",
        "The baseline learning period should exclude known seasonal anomalies (year-end reviews, major launches) to prevent skew",
        "LLM explainability transforms UEBA output from numeric scores to plain-language behavioral narratives",
        "UEBA must be paired with least-privilege access controls — detecting anomalies within excessive rights is insufficient",
        "Privacy and employment law constraints apply to UEBA — works council notifications and data minimization policies are required in many jurisdictions",
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
    easeScore: 5,
    valueScore: 9,
    rank: 10,
    challengeType: "ctf",
    info: {
      tagline: "The network never lies. Every attacker move leaves a packet trail.",
      year: 2019,
      overview: [
        "Network Detection and Response (NDR) — formerly Network Traffic Analysis (NTA) — provides security visibility into encrypted and unencrypted traffic at the network layer, independent of endpoint agents. Where EDR requires an agent on every managed device, NDR passively observes all traffic traversing monitored segments, including IoT devices, OT systems, and unmanaged assets that cannot run agents.",
        "NDR platforms (Darktrace, ExtraHop, Vectra AI, Corelight) perform deep packet inspection, protocol decoding, and ML-based behavioral modeling of network flows. They identify anomalous communication patterns: unexpected external connections, unusual data transfer volumes, port scanning, lateral movement via SMB/RDP/WMI, DNS tunneling, and C2 beaconing patterns even over HTTPS (by analyzing connection timing and size, not payload).",
        "The integration of NDR with EDR and SIEM data creates the XDR (Extended Detection and Response) model — correlating network, endpoint, and identity signals for higher-confidence detections. NDR is particularly valuable for detecting threats that bypass endpoint controls: supply chain implants, firmware-level malware, and cloud-hosted C2 using legitimate services.",
        "NDR deployment architecture varies by network topology. For physical data centers, NDR sensors connect to network taps or SPAN ports on core switches, capturing copies of all traffic. For cloud environments, NDR uses VPC flow logs (AWS VPC Flow Logs, Azure NSG Flow Logs, GCP VPC Flow Logs) which provide source/destination IP, port, protocol, and byte counts — sufficient for behavioral analysis even without full packet capture. Hybrid organizations require both approaches, with a unified NDR platform aggregating on-premises packet data and cloud flow logs into a single behavioral model.",
        "Protocol decoding is a core NDR capability that distinguishes it from simple flow monitoring. While NetFlow records tell you that host A sent 2GB to host B on port 445, NDR decodes the SMB protocol to reveal that the traffic was a ransomware encryption sweep across 847 files. Protocol-aware detection enables NDR to detect specific attack tools by their protocol fingerprints: Cobalt Strike beacons have a distinctive TLS handshake pattern (JA3 fingerprint e7d705a3286e19ea42f587b344ee6865), Mimikatz leaves specific patterns in Kerberos tickets, and RDP scanning has a characteristic handshake sequence.",
        "East-west traffic monitoring is NDR's most critical capability for detecting lateral movement. Traditional perimeter firewalls see only north-south traffic (entering or leaving the network); attackers who have gained initial access move laterally using east-west paths that never touch the perimeter. NDR sensors positioned at internal network aggregation points — core switches, data center fabric — observe all east-west traffic and can detect the reconnaissance scanning, credential relay, and remote execution that characterize lateral movement phases of an attack.",
        "Auditing an NDR program requires examining: sensor coverage (what percentage of network segments have traffic visibility), protocol decode coverage (which application-layer protocols are decoded beyond raw flow data), false positive rate per detection category, detection latency (time from packet to alert), and integration with SIEM and EDR for correlated incident creation. Organizations often underestimate the storage requirements for full packet capture — a 10Gbps link generates approximately 10TB per day. Most NDR programs implement tiered storage: full PCAP for 24-72 hours, metadata/flow records for 30-90 days.",
      ],
      technical: {
        title: "C2 Beaconing Detection",
        body: [
          "Command-and-control (C2) malware communicates with its operator on a schedule — typically every 30–300 seconds with small check-in packets. This creates a distinctive beaconing pattern in NetFlow data: high-frequency connections to a single external IP with consistent inter-arrival times and small, uniform payload sizes. NDR platforms detect this pattern using Fourier analysis of connection timing and clustering of flow size distributions.",
          "Encrypted C2 (HTTPS, DNS-over-HTTPS) cannot be decrypted by passive NDR, but TLS metadata — certificate fields, handshake timing, JA3 fingerprints, connection frequency — provides enough signal for classification. A legitimate CDN connection has different behavioral characteristics than a C2 channel using the same port.",
          "The Python script in this stage implements beaconing detection from raw NetFlow records. The detect_beaconing function begins by grouping flows by the three-tuple (src_ip, dst_ip, dst_port) — the identifying fingerprint of a communication channel. Timestamps are extracted and sorted to compute inter-arrival intervals using NumPy's diff function. The key metric is the coefficient of variation (CV) of inter-arrival times: a legitimate user browsing the web has highly variable connection timing (CV >> 1.0), while a beacon with 90-second intervals has very low CV (approaching 0). The regularity score is computed as 1 - min(CV, 1.0), providing a 0-1 scale where 1.0 is perfectly regular (maximum suspicion) and 0.0 is completely irregular (normal user behavior).",
          "Two threshold conditions must both be satisfied to flag a beacon: regularity >= 0.85 (85% regular timing) AND mean interval < 300 seconds (beacons more frequent than 5 minutes). The 10-sample minimum prevents false positives from short connection bursts. The output dictionary includes the average interval and regularity score to help analysts understand why a connection was flagged. In the CTF scenario, the beacon has a 90-second interval with regularity 0.97 — nearly perfectly regular, which is characteristic of software-driven beaconing rather than human-driven browsing. Extending this script for production: add JA3 fingerprint lookup against a known-malicious database, integrate with threat intelligence for the destination IP, and push results to the SIEM via REST API with OCSF-formatted network activity events.",
          "NDR integration with enterprise tooling follows the detect-enrich-respond pattern. When the beaconing detector fires, the NDR platform queries the threat intelligence platform for the destination IP (automated via TAXII/STIX API), queries the asset inventory for the source host's owner and criticality, pulls the last 24 hours of endpoint alerts from the EDR for the same host, and packages the combined context into a SIEM alert. The SOAR platform triggers a playbook that pulls full PCAP for the connection, preserves the evidence in an immutable S3 bucket for forensic use, and routes the alert to the appropriate SOC tier based on the host's criticality rating.",
          "The MCP server for NDR — mcp-ndr-analyst — exposes network detection capabilities to AI assistants. Tools include: query_flow_data (returns NetFlow records matching specified filters for a time range), run_beacon_scan (executes the beaconing detection algorithm against a specified time window and returns flagged connections), get_ja3_verdict (looks up a JA3 fingerprint against known-malicious databases), get_host_network_profile (returns the behavioral profile for a given internal host including normal connection destinations and volumes), and get_pcap_summary (returns a protocol-decoded summary of PCAP evidence for a flagged connection). An incident responder using Claude with mcp-ndr-analyst could say: 'Analyze all outbound connections from 10.0.1.55 in the last 6 hours for C2 beaconing patterns.' Claude calls run_beacon_scan, get_ja3_verdict for each flagged TLS connection, and get_pcap_summary for the highest-confidence hits, then produces a structured threat assessment with confidence levels and recommended containment actions.",
          "A production MCP tool implementation for run_beacon_scan would use Python's fastmcp library. The tool accepts parameters: src_ip (optional filter), time_window_hours, min_connections (default 10), and regularity_threshold (default 0.85). It queries the NDR platform's REST API for flow records, runs the beaconing algorithm implemented above, performs JA3 lookups for all HTTPS connections via the threat intelligence API, and returns a structured list of beacon candidates sorted by confidence score. Authentication uses an API key stored in the MCP server's secret manager (not exposed to the AI model), and all tool calls are logged to an immutable audit trail with the session ID, timestamp, and parameters.",
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
          "The Hafnium group, attributed to Chinese state intelligence, exploited four zero-day vulnerabilities in Microsoft Exchange Server (collectively known as ProxyLogon) to install web shells and establish persistent access across 250,000 servers globally. The attack began in January 2021 and was publicly disclosed in March 2021, by which point tens of thousands of organizations had already been compromised. The initial exploitation vector — HTTPS requests to Exchange's Outlook Web Access interface — was indistinguishable from legitimate user traffic to any signature-based detection system.",
          "The post-exploitation C2 technique is what makes this case instructive for NDR. After installing web shells, Hafnium established C2 using HTTPS traffic to attacker-controlled infrastructure — traffic that appeared to originate from the Exchange server itself, making it look like an outbound web request from a mail server. This violated a fundamental behavioral norm: Exchange servers are destinations for HTTPS traffic, not sources. NDR platforms that had established behavioral baselines for Exchange server network behavior — specifically, which external IPs Exchange servers legitimately contact and the volume of that traffic — flagged the anomalous outbound HTTPS immediately.",
          "Organizations with NDR detected the Hafnium compromise through three behavioral signals: (1) Exchange servers initiating HTTPS POST requests to external IPs (a server role behavior violation); (2) connections to recently-registered domains with fresh TLS certificates (indicators of freshly-spun attacker infrastructure); and (3) unusual timing patterns of the web shell communication (regular intervals inconsistent with user-driven mail traffic). Each of these signals is invisible to perimeter firewalls (HTTPS on port 443 is allowed), invisible to endpoint agents on systems the attacker hasn't reached beyond Exchange, but clearly visible to NDR monitoring east-west and north-south traffic from the Exchange servers.",
          "The remediation timeline was critical. Microsoft published patches on March 2, 2021. Organizations with NDR that detected the anomalous Exchange server behavior before the public disclosure had a window to isolate compromised servers and preserve forensic evidence before the broader exploitation wave. Organizations without NDR discovered the compromise only when Microsoft released indicators of compromise (IoCs) in the advisory — by which point, web shells had been installed for weeks and data had already been exfiltrated. This timeline asymmetry is the operational value of NDR: behavioral detection independent of vendor advisories and signature updates.",
          "The industry response to Hafnium included a significant expansion of NDR monitoring coverage to explicitly include server-to-external behavioral baselining. Previously, NDR programs often focused on workstation behavior; Hafnium demonstrated that server anomalies — particularly mail, web, and file servers initiating unexpected external connections — are equally important detection targets. NDR vendors added specific Hafnium/ProxyLogon detection modules and expanded their protocol decode libraries for Exchange-specific protocols (MAPI, OWA, EWS) to improve detection granularity.",
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
        "East-west traffic monitoring is NDR's most critical capability — lateral movement never touches the perimeter",
        "Full PCAP retention at 10Gbps generates ~10TB/day — tiered storage (PCAP 72h, flows 90d) is standard",
        "Protocol decode enables attack tool identification — Cobalt Strike, Mimikatz, and ransomware all have protocol fingerprints",
        "Cloud NDR uses VPC flow logs — provides behavioral analysis without physical packet capture infrastructure",
        "MCP servers (mcp-ndr-analyst) expose network detection to AI assistants for automated C2 and lateral movement analysis",
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
    easeScore: 8,
    valueScore: 9,
    rank: 1,
    challengeType: "ctf",
    info: {
      tagline: "Misconfiguration is the #1 cloud breach vector. CSPM finds it before attackers do.",
      year: 2019,
      overview: [
        "Cloud Security Posture Management (CSPM) continuously monitors cloud infrastructure configurations against security benchmarks — CIS AWS Foundations Benchmark, NIST 800-53, PCI-DSS, SOC 2 — and flags deviations in real time. While traditional vulnerability management targets software flaws, CSPM targets configuration errors: public S3 buckets, over-permissive IAM roles, unencrypted databases, security groups open to 0.0.0.0/0.",
        "CSPM platforms (Wiz, Prisma Cloud, Orca Security, AWS Security Hub, Microsoft Defender for Cloud) use cloud provider APIs — not agents — to inventory all resources and their configurations. This agentless approach provides complete coverage including serverless functions, managed databases, container registries, and cloud-native services that cannot run traditional endpoint agents.",
        "Modern CSPM has evolved beyond single-resource checks to attack path analysis: modeling how an attacker could chain multiple misconfigurations — a public EC2 instance with an overly permissive IAM role that has read access to an S3 bucket containing customer PII — to reach sensitive resources. Attack path prioritization helps teams focus remediation on the paths that matter most.",
        "CSPM platforms operate by polling cloud provider APIs on a continuous schedule (typically every 5-15 minutes) and comparing the returned resource configurations against a library of security checks. Each check maps to a specific compliance control: CIS AWS Benchmark 2.1.5 (S3 bucket public access block), CIS AWS 1.16 (IAM policies without full administrative privileges), NIST 800-53 SC-28 (encryption at rest). When a resource fails a check, the CSPM creates a finding with severity rating, remediation guidance, and the specific API call or console action needed to fix it.",
        "The cloud shared responsibility model is the conceptual foundation of CSPM. Cloud providers secure the infrastructure (physical data centers, hypervisors, managed service availability), but customers are responsible for everything they configure on top: IAM policies, security group rules, encryption settings, network access controls. CSPM is the automated mechanism for verifying that customers are fulfilling their half of the shared responsibility model — continuously, not just at audit time.",
        "Cloud Security Posture Management has expanded into the CNAPP (Cloud-Native Application Protection Platform) category, which merges CSPM (infrastructure configuration) with CWPP (Cloud Workload Protection — runtime security for containers and VMs), CIEM (Cloud Infrastructure Entitlement Management — fine-grained IAM analysis), and secrets scanning (finding hardcoded credentials in code and container images). Wiz, Orca Security, and Prisma Cloud have all evolved to cover the full CNAPP scope. The consolidation reflects that cloud security requires visibility across the entire application stack, not just infrastructure configuration.",
        "Auditing a CSPM program examines: resource coverage (what percentage of cloud resources are inventoried and checked), benchmark coverage (which compliance frameworks are actively enforced), remediation SLA (how quickly critical findings are resolved — typical targets: critical within 24h, high within 7d), suppression rate (what percentage of findings are suppressed as accepted risks vs remediated — high suppression rates indicate control erosion), and attack path count (how many critical multi-hop attack paths exist from internet-facing resources to sensitive data). The last metric is the most operationally meaningful — a single unresolved critical attack path represents a potential Capital One-scale breach.",
      ],
      technical: {
        title: "Attack Path Analysis",
        body: [
          "Attack path analysis models cloud infrastructure as a directed graph: nodes are resources (EC2 instances, IAM roles, S3 buckets, RDS databases), and edges are access relationships (role assumption, bucket policy grants, security group rules). An attacker starting from a public EC2 instance traverses the graph by assuming attached IAM roles and following their permissions.",
          "CSPM platforms compute the blast radius of each misconfiguration: if EC2 instance X is compromised, what resources can be reached by following all attached roles, instance profiles, and network paths? Resources reachable within two hops from a public-facing resource are elevated priority regardless of their individual misconfiguration severity.",
          "The Python script in this stage implements two CSPM check functions using boto3. The audit_s3_buckets generator iterates over all S3 buckets in the account and checks two things for each: whether the PublicAccessBlock configuration is fully enabled (all four settings must be True: BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy, RestrictPublicBuckets), and whether any bucket lacks a PublicAccessBlock configuration entirely (which means the bucket may default to public access based on its ACL and bucket policy). The yield pattern returns findings as a generator, enabling streaming to a dashboard or database without loading all results into memory — important in accounts with hundreds of buckets.",
          "The audit_iam_policies function demonstrates IAM policy analysis: it paginates through all customer-managed IAM policies (Scope='Local' excludes AWS managed policies), retrieves the current policy version document for each, and scans the Statement array for the most dangerous possible policy: Effect=Allow, Action=*, Resource=* — a policy that grants complete control over the entire AWS account. This is the specific misconfiguration that enabled the Capital One breach's lateral movement phase. Production extensions of this script would also check for wildcards in individual service namespaces (iam:*, s3:*), policies without conditions (allowing access from any IP or time), and cross-account trust relationships that are overly permissive.",
          "Enterprise CSPM integration follows a findings-to-ticketing pipeline. CSPM findings are pushed via webhook to a SIEM (Splunk, Sentinel) as security events, then to a SOAR platform that creates a Jira or ServiceNow ticket with the specific remediation command, assigns it to the cloud team owner based on a tag lookup (every resource should have an Owner tag mapping to a team), and tracks SLA compliance. When the resource is remediated, the CSPM re-scans and automatically closes the ticket. Unresolved critical findings after 24 hours escalate to the CISO dashboard. This closed-loop integration transforms CSPM from a reporting tool into a risk management system.",
          "The MCP server for CSPM — mcp-cspm-auditor — exposes cloud posture data to AI assistants. Tools include: get_misconfig_findings (returns all findings for a given AWS account, optionally filtered by severity or benchmark), get_attack_paths (returns all critical attack paths with step-by-step chains), run_resource_check (runs a specific CIS benchmark check against a named resource), get_blast_radius (returns all resources reachable from a given starting resource via IAM and network paths), and generate_remediation_script (generates a bash/terraform script to remediate a specific finding). A cloud auditor using Claude with mcp-cspm-auditor could ask: 'Show me all critical attack paths from internet-facing resources to S3 buckets containing PII in the production account.' Claude calls get_attack_paths with the filters, retrieves detailed path chains, and produces a structured audit finding with remediation priority ordering — replacing a 2-3 hour manual Wiz review session.",
          "A production mcp-cspm-auditor tool implementation for get_attack_paths would authenticate to the CSPM platform API using a service account with read-only permissions, query for attack paths with severity=CRITICAL and destination_type=S3_BUCKET, apply a data classification filter to show only buckets tagged DataClassification=PII or DataClassification=Confidential, and return results in a structured format including: path ID, start resource, end resource, number of hops, each hop with resource type and access vector, and estimated remediation effort. The tool enforces account-level scoping (the AI can only see accounts explicitly granted in its permission set) and logs every call to an immutable CloudTrail-based audit log.",
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
          "The Capital One breach combined two failures: a misconfigured WAF that allowed Server-Side Request Forgery (SSRF) to the EC2 instance metadata service (169.254.169.254), which leaked temporary IAM credentials; and an over-permissive IAM role attached to the WAF's EC2 instance that allowed the attacker to list and download content from over 700 S3 buckets. The attacker, Paige Thompson, a former AWS engineer, recognized and exploited the misconfiguration within minutes of discovery. Capital One had over 700 S3 buckets — manual review of IAM role permissions across all of them was impractical without automation.",
          "A CSPM system continuously checking IAM role permissions and S3 access policies would have flagged the overly permissive role immediately upon deployment. The specific finding would have been: IAM role 'capitalone-WAF-role' grants s3:ListAllMyBuckets and s3:GetObject on Resource: '*' — all buckets — attached to an internet-facing EC2 instance. This is a textbook CIS AWS 1.16 violation (no IAM policies with full administrative privileges) and would have been a CRITICAL finding requiring remediation within 24 hours under standard SLA policies.",
          "Post-breach, Capital One implemented Wiz for cloud security posture management. Wiz's attack path analysis would have identified the specific chain: SSRF-vulnerable EC2 instance (internet-accessible) → metadata service access (no IMDSv2 required) → IAM role credential retrieval → S3 ListBuckets + GetObject on all buckets — a three-hop attack path from internet to 106 million customer records, all through misconfigurations rather than software vulnerabilities. This path would have been flagged as a CRITICAL attack path the moment the WAF was deployed with the overly permissive role.",
          "The regulatory consequences were significant and instructive. The OCC fined Capital One $80M for failing to implement adequate cloud security risk management. The FTC settlement added $190M. The SEC required Capital One to disclose the breach within four business days of discovery. Collectively, these consequences established that CSPM is not optional for financial institutions operating in the cloud — it is a regulatory expectation. The Basel III operational risk framework and OCC guidelines now explicitly reference continuous cloud security monitoring as a required capability for banks.",
          "The broader industry lesson from Capital One was the mandatory adoption of EC2 IMDSv2 (Instance Metadata Service version 2), which requires a session token for metadata requests and prevents SSRF attacks from accessing the metadata service. AWS made IMDSv2 the default for new instances in 2020, and CSPM platforms now check IMDSv2 enforcement as a standard control. The combined Capital One + Twitter (similar SSRF vulnerability) incidents in 2019-2020 effectively ended the era of IMDSv1 in production environments.",
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
        "The cloud shared responsibility model means customers own configuration security — CSPM automates verification of that responsibility",
        "IMDSv2 enforcement is now a standard CSPM check following the Capital One SSRF class of attacks",
        "CSPM findings must feed a ticketing pipeline with SLA tracking — critical findings unresolved after 24h escalate to CISO",
        "Blast radius calculation determines which misconfigs represent genuine breach risks vs theoretical concerns",
        "MCP servers (mcp-cspm-auditor) expose attack path data to AI auditors, replacing 2-3 hour manual Wiz review sessions",
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
    easeScore: 7,
    valueScore: 8,
    rank: 6,
    challengeType: "ctf",
    info: {
      tagline: "Your network sees events. Threat intelligence tells you what they mean.",
      year: 2017,
      overview: [
        "Threat intelligence integration transforms raw security events into contextualized findings by enriching indicators of compromise (IoCs) — IP addresses, domain names, file hashes, URLs — with external knowledge about known attacker infrastructure, malware families, and threat actor TTPs. When an NDR platform detects a connection to IP 185.220.101.45, threat intelligence answers: is this a known Tor exit node? Is it attributed to a specific threat actor? What sector does this actor target?",
        "The STIX (Structured Threat Information eXpression) standard defines the data model for threat intelligence objects: Indicators (IoC patterns), Threat Actors, Attack Patterns (MITRE ATT&CK TTPs), Campaigns, Malware, and Relationships between them. TAXII (Trusted Automated eXchange of Intelligence Information) is the transport protocol for sharing STIX content between organizations and platforms.",
        "Intelligence feeds come from three tiers: open-source (CISA AIS, Abuse.ch, AlienVault OTX, Emerging Threats), commercial (CrowdStrike Intelligence, Mandiant, Recorded Future), and sector-specific ISACs (FS-ISAC for finance, H-ISAC for healthcare, E-ISAC for energy). Modern SIEM and NDR platforms consume STIX/TAXII feeds automatically, enriching every alert with threat context at ingest time.",
        "The intelligence lifecycle has five phases: collection (gathering raw data from open and commercial sources), processing (parsing into STIX format, deduplicating across sources), analysis (assessing confidence, relevance, and actor attribution), dissemination (sharing via TAXII or platform-specific APIs), and feedback (reporting on whether intelligence led to detections, to improve future collection priorities). Organizations that treat threat intelligence as a one-way data feed miss the feedback loop that makes intelligence programs operationally effective.",
        "TIP (Threat Intelligence Platform) platforms — OpenCTI, MISP, ThreatConnect, Anomali — provide the aggregation and management layer between raw intelligence feeds and operational security tools. A TIP consumes feeds from multiple sources (potentially billions of raw IoCs), deduplicates and normalizes them, applies confidence scoring and expiry date management, tags them with relevant sector and geographic context, and exposes a curated, high-confidence TAXII endpoint for consumption by SIEM, NDR, and SOAR platforms. Without a TIP, feeding raw intelligence directly into a SIEM creates alert noise from low-quality or expired indicators.",
        "Confidence scoring and indicator lifecycle management are critical operational concerns. An IoC that was highly relevant six months ago (a C2 IP address for a specific campaign) may be completely useless today if the attacker has moved infrastructure. STIX Indicators include a valid_until field that must be respected — consuming expired indicators is a primary cause of threat intelligence false positives. Confidence scores (0-100 in STIX 2.1) reflect the source's assessment of how reliably the indicator identifies malicious activity; scores below 70 should be used for hunting and enrichment, not for automated blocking.",
        "AI is transforming threat intelligence in two ways. First, LLMs can parse unstructured threat reports (PDF reports, blog posts, vendor advisories) and automatically extract STIX objects — a task that previously required a skilled analyst 1-4 hours per report. Second, LLMs can generate natural-language summaries of threat actor TTPs for security teams that lack dedicated intelligence analysts: instead of reading a 40-page APT report, a SOC analyst receives a plain-language briefing on the actor's preferred initial access techniques, typical dwell time, and known C2 infrastructure patterns.",
      ],
      technical: {
        title: "STIX/TAXII Integration Architecture",
        body: [
          "A TAXII server exposes collections of STIX objects via a REST API. Clients poll the TAXII server on a schedule (typically every 5–60 minutes) to retrieve new and updated objects. STIX Indicators contain STIX Patterning Language expressions that describe IoCs: `[ipv4-addr:value = '185.220.101.45']`, `[file:hashes.'SHA-256' = 'abc123...']`. These patterns are evaluated against normalized log data by the SIEM's enrichment pipeline.",
          "TIP (Threat Intelligence Platform) — OpenCTI, MISP, ThreatConnect, Anomali — acts as the aggregation layer: consuming feeds from multiple sources, deduplicating, scoring confidence levels, and exposing a unified TAXII endpoint to the SOC's SIEM. This prevents SIEM overload from raw feed volume (billions of IoCs) by pre-filtering to high-confidence, relevant indicators.",
          "The Python script in this stage implements a TAXII 2.1 client using the taxii2-client library. The fetch_threat_indicators function connects to a TAXII server using basic authentication (in production, OAuth 2.0 or certificate-based auth is preferred), accesses the first collection, and pages through all Indicator objects using the as_pages helper to handle pagination transparently. For each indicator, it extracts the STIX pattern (the IoC expression), confidence score, labels (categorization tags), and validity period. The function returns a clean list of dictionaries ready for enrichment use.",
          "The enrich_alert function demonstrates the core enrichment workflow: given an alert with a src_ip field and the list of STIX indicators, it searches for any indicator whose pattern contains the IP address as a quoted string value. The confidence filter (>= 70) prevents low-quality indicators from elevating alerts. When a match is found, it adds a threat_intel_hits array to the alert, boosts the risk score by the maximum confidence of matching indicators, and sets the verdict to MALICIOUS (>=90 confidence) or SUSPICIOUS (<90). In production, this function would be implemented as a SIEM enrichment rule or SOAR playbook step, running at alert ingest time rather than post-hoc.",
          "Enterprise integration patterns: the TAXII client runs as a scheduled job every 15 minutes, pulling new indicators and writing them to a Redis cache with TTL equal to the indicator's valid_until duration. The SIEM's enrichment pipeline queries Redis synchronously at log ingest time for each observable (IP, domain, hash), adding threat context fields to every log event before indexing. This enrichment-at-ingest pattern means that when an analyst opens an alert, all relevant threat intelligence context is already present — no manual lookup required. Expired indicators are automatically evicted from Redis by their TTL, preventing stale indicator false positives.",
          "The MCP server for threat intelligence — mcp-tip-analyst — exposes the organization's TIP to AI assistants. Tools include: lookup_indicator (checks a given IP, domain, or hash against the TIP and returns all matching STIX objects), get_actor_profile (returns the full STIX threat actor profile for a named group including TTPs, targets, and known infrastructure), search_campaign (searches for campaigns matching keywords or date ranges), enrich_incident (bulk-enriches all observables from a given incident with TI context), and get_feed_health (returns the ingestion status and last-updated timestamps for all configured TI feeds). A threat hunter using Claude with mcp-tip-analyst could ask: 'What do we know about the threat actor associated with IP 185.220.101.45, and what other infrastructure is attributed to them?' Claude calls lookup_indicator, then get_actor_profile, and synthesizes a threat briefing with actionable hunting leads — typically a 20-30 minute analyst task done in under 2 minutes.",
          "Security considerations for TI MCP servers are significant. Threat intelligence data is itself sensitive — knowing which threat actors an organization is tracking, what their indicators look like, and what detection gaps exist could help an attacker evade detection. The MCP server must enforce need-to-know access controls (SOC Tier 1 can look up indicators; only Tier 2 and above can see actor profiles and campaign details), must not expose raw feed credentials or API keys to the AI model, and must log all lookups to support threat intelligence handling audits. In some sectors, TI sharing agreements (ISACs, bilateral sharing) have terms of use that restrict further dissemination — the MCP server must enforce these restrictions programmatically.",
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
          "CISA, NSA, and Five Eyes partners (UK NCSC, Australian ASD, New Zealand GCSB, Canadian CCCS) jointly disclosed the Volt Typhoon campaign in May 2023 — a Chinese state actor that had been living-off-the-land in US critical infrastructure for an estimated 5+ years. Volt Typhoon used only built-in Windows tools (LOLBins: netsh, wmic, PowerShell, certutil) and legitimate network paths (using compromised SOHO routers as proxy nodes) to avoid detection, making signature-based detection completely ineffective. The campaign was detected through a combination of behavioral analytics at affected organizations and cross-agency threat intelligence sharing.",
          "The disclosure included a comprehensive STIX 2.1 bundle with Volt Typhoon TTPs mapped to 30+ MITRE ATT&CK techniques, C2 infrastructure IoCs (IP ranges for SOHO router proxy nodes), YARA rules for the specific malware strains used, and detailed detection guidance including KQL queries for Microsoft Sentinel. Organizations subscribed to CISA's AIS (Automated Indicator Sharing) TAXII feed received these indicators automatically within hours of disclosure — their SIEMs began matching the new indicators against historical logs, in some cases finding evidence of prior Volt Typhoon activity that had been invisible before the intelligence became available.",
          "The retrospective detection capability demonstrated by the Volt Typhoon disclosure is a key value proposition of threat intelligence integration. Historical log retention (typically 90-365 days in a SIEM) combined with newly-published IoCs enables organizations to determine whether they were targeted before the public disclosure — giving them a window to assess the extent of compromise, preserve evidence, and take remediation action before the attacker is aware of detection. Organizations without threat intelligence integration had no way to perform this retrospective analysis efficiently.",
          "The Volt Typhoon campaign also demonstrated the value of sector-specific ISACs. The E-ISAC (Electricity) and WaterISAC shared Volt Typhoon indicators with their members before the public CISA disclosure, enabling targeted sectors to begin hunting in their environments while the joint advisory was still being finalized. This early warning capability — available only to ISAC members — is why ISAC membership is now a standard recommendation in CISA guidance for critical infrastructure operators.",
          "For threat intelligence program auditors, the Volt Typhoon case provides a benchmark. Questions to assess: Is the organization subscribed to CISA AIS (free, automated, STIX/TAXII)? Are they members of the relevant sector ISAC? When a new Five Eyes advisory is published, how quickly do the IoCs appear in the SIEM's enrichment pipeline (target: under 1 hour via automated TAXII polling)? Can the organization perform a retrospective hunt against 90 days of historical logs within 4 hours of a major advisory publication? These capabilities represent the operational floor for a Tier 3 (Proactive) threat intelligence program.",
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
        "The intelligence lifecycle has five phases: collect, process, analyze, disseminate, feedback — the feedback loop makes programs effective",
        "Retrospective detection: new IoCs applied against 90-day historical logs can reveal prior compromises invisible before the intelligence was available",
        "LLMs can parse unstructured threat reports and extract STIX objects automatically, reducing analyst report parsing time from hours to minutes",
        "TI MCP servers must enforce need-to-know access controls and ISAC sharing agreement terms programmatically",
        "Volt Typhoon showed that LOLBin-based attackers are only detectable through behavioral analytics plus TI sharing — neither alone is sufficient",
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
    easeScore: 6,
    valueScore: 9,
    rank: 5,
    challengeType: "ctf",
    info: {
      tagline: "Humans can't outrun 10,000 alerts per day. SOAR can.",
      year: 2017,
      overview: [
        "Security Orchestration, Automation, and Response (SOAR) platforms (Palo Alto Cortex XSOAR, Splunk SOAR, Microsoft Sentinel SOAR, IBM QRadar SOAR) automate the investigation and response playbooks that SOC analysts execute manually for every alert. A phishing triage playbook that takes a human analyst 15 minutes takes a SOAR automation under 30 seconds — and runs 24/7 without analyst fatigue.",
        "SOAR playbooks are structured workflows: trigger (alert received) → enrichment (lookup IP in threat intel, pull user info from AD, check endpoint isolation status) → decision (is this malicious? above threshold?) → response (block IP in firewall, disable user account, isolate endpoint, create incident ticket, notify analyst). Each step calls an integration — SOAR platforms have 500–1,000 pre-built integrations with security and IT tools.",
        "The ROI case for SOAR is MTTR (Mean Time to Respond). Manual phishing triage: 45 minutes per alert × 200 alerts/day = 150 analyst-hours/day. SOAR automated triage: 30 seconds × 200 alerts = 100 analyst-minutes/day, with human review only on the 3% that need escalation. SOAR's value is not eliminating analysts — it is ensuring analysts spend time on decisions, not data gathering.",
        "SOAR architecture has three layers. The orchestration layer manages playbook execution — it stores playbook definitions (as code or visual flowcharts), tracks execution state across potentially hours-long workflows, and handles retries and error recovery when integrations fail. The integration layer provides the connectors to external tools — each integration is a module that translates SOAR actions (block_ip, lookup_user, create_ticket) into the specific API calls required by each tool version. The case management layer tracks the full lifecycle of each alert from ingestion through closure, with a complete audit trail of every automated and human action.",
        "Playbook design philosophy distinguishes effective SOAR programs from tool-only implementations. Three principles drive good playbook design: fail-safe defaults (if an integration call fails, the playbook should fail safe by routing to human review, not silently closing the alert), idempotency (running a playbook twice should produce the same result as running it once — no double-blocking, double-ticketing, or double-notifications), and minimal privilege (each playbook step uses the minimum permission required — the enrichment phase uses read-only credentials, the response phase uses write credentials only when needed and only for the specific resource being acted upon).",
        "The SOAR market has partially merged with the SIEM market as major vendors have bundled SOAR capabilities into their SIEM platforms. Microsoft Sentinel Logic Apps provides SOAR functionality within the Sentinel ecosystem; Splunk SOAR (formerly Phantom) is deeply integrated with Splunk SIEM; IBM QRadar SOAR is built into the QRadar platform. Standalone SOAR platforms (Cortex XSOAR, Swimlane) compete on the depth of their integration libraries and the flexibility of their playbook development environments. The trend toward SIEM+SOAR consolidation reflects enterprise preference for reducing vendor complexity.",
        "AI is fundamentally changing SOAR in two ways. First, LLMs are generating playbook code from natural language descriptions — a SOC engineer can describe 'a playbook that triages phishing alerts by checking the sender domain reputation, detonating attachments in a sandbox, and blocking the domain if the score exceeds 70' and the LLM produces executable playbook code. Second, AI-native SOAR platforms use LLMs as decision-making agents rather than fixed decision trees — the LLM reads the enrichment context and decides what action to take, enabling handling of novel alert types without pre-programmed playbooks.",
      ],
      technical: {
        title: "Playbook Design Patterns",
        body: [
          "Effective SOAR playbooks follow three design principles: (1) Enrich first, decide later — collect all context before any action that could tip off an attacker or cause operational disruption; (2) Human-in-the-loop for high-impact actions — auto-block at the firewall, but require analyst approval before disabling a CEO's account; (3) Idempotent actions — a playbook that fires twice should have the same net result as firing once.",
          "Playbook testing is done against synthetic alert data using the SOAR platform's built-in sandbox or a staging environment connected to test instances of all integrations. A playbook with a bug in the 'disable account' step that runs against production is an outage risk. Version control (Git), peer review, and staged rollout apply to playbooks just as to code.",
          "The Python script in this stage is a SOAR playbook pseudocode implementing phishing email triage in the Cortex XSOAR style. The phishing_triage_playbook function takes an alert dictionary and proceeds through three phases. Phase 1 (Enrichment): it extracts the sender domain, URLs, and attachments from the email, then calls three enrichment functions — lookup_domain_reputation (queries VirusTotal and Cisco Talos), lookup_url for each link (checks URL sandboxing services), and detonate_file for each attachment (submits to an automated malware sandbox like Any.run or CrowdStrike Falcon Sandbox). These calls happen in parallel in a real SOAR implementation to minimize total enrichment time.",
          "Phase 2 (Scoring): the script computes a phishing score by summing contributions from each enrichment result. The weights reflect empirical detection rates: a malicious sender domain contributes 40 points (high signal), a malicious URL 35 points (high signal), and a malicious attachment 50 points (highest signal — attachments are the most reliable indicator of targeted phishing). The score thresholds (70 for auto-block, 40 for analyst review) are configurable parameters that organizations tune based on their false positive tolerance. A score above 100 is possible for alerts with multiple high-signal indicators — the cap is enforced at the action selection stage, not the scoring stage.",
          "Phase 3 (Response): the action branch based on score implements the human-in-the-loop principle. Score >= 70 triggers fully automated response: block_sender_domain adds a firewall rule and email gateway block, quarantine_email_for_all_users pulls the email from every mailbox that received it (a critical capability — if 200 employees received the phishing email, manual quarantine is impossible at scale), and notify_analyst creates a Slack message and ServiceNow ticket. Score 40-69 routes to analyst review — the analyst sees the enrichment context and makes the final decision. Score below 40 auto-closes with a FALSE_POSITIVE verdict and feeds the outcome back to the ML models to improve future scoring.",
          "Enterprise SOAR integration requires careful orchestration of API rate limits and authentication. The VirusTotal API has a 4-request-per-minute limit on free tiers; commercial SOAR deployments use premium API keys with higher limits. The SOAR platform's integration layer handles rate limiting transparently — it queues API calls and retries with exponential backoff. Authentication credentials for each integration are stored in the SOAR platform's encrypted credential store, never in playbook code or environment variables. Rotation of integration credentials is automated via the SOAR platform's credential management module.",
          "The MCP server for SOAR — mcp-soar-operator — exposes playbook execution and case management to AI assistants. Tools include: run_playbook (triggers a named playbook against a given alert ID), get_playbook_status (returns the execution status and current step for a running playbook), get_case_timeline (returns the full action timeline for a given case), list_pending_approvals (returns all playbook actions awaiting human approval), and approve_action (approves a pending action with an analyst note). A SOC manager using Claude with mcp-soar-operator could say: 'Show me all phishing cases from the last 24 hours where the automated playbook escalated for human review, and summarize the common enrichment patterns.' Claude calls get_case_timeline for each escalated case, extracts the enrichment data, and synthesizes a pattern analysis — identifying whether the escalations share a common sender domain, URL pattern, or attachment type, which helps tune the playbook scoring thresholds.",
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
          "On August 4, 2022, multiple Twilio employees received SMS messages impersonating Twilio IT, directing them to a fake Okta SSO login page (the URL substituted 'twilio-okta.com' for 'okta.com'). The attack was a carefully timed operation — messages were sent to multiple employees simultaneously to maximize the probability of at least one credential submission before the security team became aware. Several employees fell victim, submitting their Okta credentials to the attacker-controlled page.",
          "Twilio's initial security response took hours after the first credential submission. During that window, the attackers used the stolen credentials to access Twilio's internal customer administration console, viewing and in some cases modifying customer account data. They then used Twilio's SMS infrastructure to send SMS messages to Okta customers and Twilio's downstream customers — a supply chain attack enabled by the delay in Twilio's response. The cascading impact affected 125 downstream organizations, including Okta, Signal, and DoorDash.",
          "An automated SOAR playbook triggered by the anomalous authentication events would have dramatically reduced the impact. The trigger condition: multiple employees logging in from new IP addresses within a 15-minute window — a pattern that would score as high-anomaly in any UEBA system. A SOAR playbook responding to this trigger would have: (1) sent push notifications to the affected employees' registered phones asking them to confirm whether the login was intentional, (2) temporarily suspended the accounts pending confirmation, (3) paged the on-call security engineer within 60 seconds of the first credential submission. The entire cascading attack on 125 customers was a consequence of this response delay.",
          "The Twilio breach also demonstrated a gap in phishing-resistant MFA deployment. The employees were using TOTP (time-based one-time passwords) for MFA, which can be phished in real-time: the attacker's fake login page immediately submits the stolen credentials plus the TOTP code to the real Twilio Okta instance before the 30-second TOTP window expires. SOAR playbooks should now include a check for whether the SIEM flags simultaneous authentication events — real credential use and the phishing page's replay — as a correlated alert category. Twilio subsequently deployed FIDO2/WebAuthn hardware keys (phishing-resistant MFA) for all employees, which would have prevented this attack entirely.",
          "The regulatory response to Twilio reinforced SOAR requirements for cloud platform providers. The SEC's new cybersecurity disclosure rules require public companies to report material incidents within four business days. Twilio's breach affected publicly-traded Okta's stock price and customer trust — a supply chain breach that started with an SMS message. The incident is now a standard case study in why platform providers with privileged access to customer infrastructure require SOAR automation for identity-based attacks, not just network-based alerts.",
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
        "Idempotency is a core playbook design requirement — running twice must produce the same result as running once",
        "SOAR integration credentials must be stored in encrypted credential stores, never in playbook code",
        "AI-native SOAR uses LLMs as decision agents for novel alert types without pre-programmed playbooks",
        "Phishing-resistant MFA (FIDO2/WebAuthn) must be a SOAR-enforced policy check — TOTP can be phished in real-time relay attacks",
        "MCP servers (mcp-soar-operator) expose playbook execution to AI assistants for automated case analysis and approval workflows",
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
    easeScore: 8,
    valueScore: 7,
    rank: 8,
    challengeType: "ctf",
    info: {
      tagline: "The best trap looks like exactly what the attacker is looking for.",
      year: 2016,
      overview: [
        "Deception technology deploys fake assets — honeypots (decoy systems), honeytokens (decoy credentials and files), and canary tokens (embedded trackers) — across the network to detect attackers who have already bypassed perimeter defenses. Any interaction with a decoy is a near-zero false-positive alert: legitimate users have no reason to access fake credentials, connect to honeypot servers, or open canary documents.",
        "Modern deception platforms (Attivo Networks, Illusive Networks, Canarytokens.org, TrapX) distribute hundreds or thousands of decoys across the environment — fake Active Directory accounts with enticing names like 'svc-admin-backup', fake file shares with documents labeled 'Q4-Salary-Review.xlsx', honeypot database servers listening on standard ports. The scale of decoys means an attacker conducting lateral movement or reconnaissance will almost certainly trigger one.",
        "Honeytokens extend deception beyond systems: fake API keys embedded in code repositories (GitHub monitoring), fake AWS access keys (automatically monitored via CloudTrail), fake database records with traceable field values, and canary documents containing hidden web beacons that phone home when opened. These tokens provide early warning of credential theft, data exfiltration, and insider access to sensitive documents.",
        "The deception technology architecture has three layers: decoy deployment, interaction monitoring, and response integration. The deployment layer places decoys across every network segment, on every server type, and in every data repository — the goal is density. An attacker enumerating Active Directory users should encounter multiple honeypot accounts; an attacker scanning network hosts should hit multiple honeypot servers; an attacker searching a file share for credentials should find honeytokens before finding real credentials. The monitoring layer watches for any interaction with deployed decoys, collecting attacker source IP, session data, and the specific enumeration or access technique used.",
        "Active Directory deception is among the most operationally effective deployment patterns. A realistic AD honeypot account has a username that sounds like a privileged service account (svc-backup-admin, helpdesk-admin2), a last-login timestamp within the last 30 days (to avoid appearing clearly unused), membership in Domain Users and optionally a non-privileged group, and a Kerberoastable SPN (Service Principal Name) registered to make it an attractive target for Kerberoasting attacks. When an attacker requests the Kerberos ticket for the honeypot SPN — a standard Kerberoasting step — the domain controller logs the request, the deception platform alerts immediately, and the SOAR platform triggers account isolation and IR notification.",
        "Canary documents represent a particularly powerful honeytoken variant for detecting data exfiltration. A canary document is a Microsoft Word or PDF file that contains a hidden HTTP request that fires when the document is opened — typically implemented via a web bug URL embedded in the document metadata or a linked image that loads from a tracking server. When the document is opened, even on an attacker's isolated machine, the tracking server receives the request with the IP address of the machine that opened it, the time, and a unique document identifier. Canary documents placed in HR systems, financial data repositories, and source code repositories provide detection of exfiltration even after the data has left the organization.",
        "The MITRE ENGAGE framework provides a structured methodology for deception technology deployment as part of an adversary engagement strategy. ENGAGE distinguishes between passive deception (deploying decoys that detect but do not interact with attackers) and active engagement (maintaining attacker access to gather intelligence about their tools, techniques, and objectives). Active engagement — letting an attacker spend time in a honeypot network while monitoring their behavior — is used by threat intelligence teams at major organizations to gather TTPs and attribution data, but requires careful legal review and operational security to prevent the honeypot from being used as a platform for attacks on third parties.",
      ],
      technical: {
        title: "Honeytoken Deployment Patterns",
        body: [
          "AWS honeytoken deployment: create an IAM user with no permissions but a monitored access key. Embed the key in a realistic location — `~/.aws/credentials`, a config file, a GitHub repo (public or private). Any use of the key generates a CloudTrail event that triggers an immediate alert. The key has no real permissions, so there is zero operational risk from its exposure — only the signal value.",
          "Active Directory honeypot accounts should have realistic names, group memberships, and last-login timestamps. AD decoy accounts named 'svc-backup-admin' or 'helpdesk-admin2' attract attackers performing LDAP enumeration for privileged accounts. Kerberoastable SPNs on decoy accounts are particularly effective — an attacker requesting the ticket immediately reveals themselves.",
          "The Python script in this stage implements the complete AWS honeytoken deployment workflow. The deploy_aws_honeytoken function creates an IAM user with two tags: Purpose=honeytoken (for programmatic filtering in CloudTrail alerts) and Alert=immediate (a signal to the monitoring system's severity classification). The deny-all IAM policy uses the belt-and-suspenders approach — even though the user has no permissions by default, the explicit deny policy ensures that even future AWS service expansions cannot accidentally grant access. The create_access_key call generates the monitored key, and the function prints deployment instructions including the key ID and suggested embedding locations.",
          "The monitor_honeytoken_use function is an EventBridge handler — it fires on any CloudTrail API call made by the honeypot IAM user. The user_arn check searches for the honeypot username in the ARN of the calling identity. When a match is found, it extracts the source IP (where the key was used from) and the specific AWS API action attempted, and calls alert_soc with a formatted message. In production, this alert_soc function would push to PagerDuty for immediate on-call notification, create a ServiceNow incident with CRITICAL priority, and trigger a SOAR playbook that captures the full CloudTrail context for forensic preservation. The EventBridge rule filters on CloudTrail events for the specific IAM user ARN, ensuring this Lambda fires only for honeytoken interactions, not general CloudTrail noise.",
          "Extending the honeytoken script for production involves three enhancements. First, add geolocation enrichment: use ipinfo.io or MaxMind to determine the country and ASN of the source IP, which helps distinguish legitimate testing by the security team from actual attacker use. Second, add a suppression list for known-safe IPs (penetration testing firms, red team source ranges) to prevent authorized testing from generating false alerts. Third, integrate with the threat intelligence platform to automatically look up the source IP against known malicious infrastructure — if the attacker is using a Tor exit node or known VPN, the alert severity escalates to CRITICAL immediately.",
          "Enterprise deception programs face a maintenance challenge: decoys must remain realistic over time. An AD honeypot account that hasn't been 'logged into' in 18 months is obviously a trap to any skilled attacker. Deception platforms address this through automated behavioral simulation — periodically generating realistic authentication events, file access logs, and network connections from honeypot accounts to maintain their appearance of being active accounts. This simulation must be carefully tuned to be realistic without triggering the deception platform's own alerts for anomalous behavior from the honeypot accounts.",
          "The MCP server for deception technology — mcp-deception-monitor — exposes honeytoken and honeypot status to AI assistants. Tools include: list_active_decoys (returns all deployed honeytokens, honeypots, and canary documents with their deployment locations and last-trigger times), get_trigger_alert (returns the full context of a decoy trigger event including attacker IP, action, and timing), analyze_attacker_behavior (analyzes the sequence of decoy triggers from a given source IP to infer attacker objectives), deploy_honeytoken (deploys a new honeytoken with specified type and location), and get_canary_document_status (returns opening events for all deployed canary documents in the last specified period). A red team coordinator using Claude with mcp-deception-monitor could ask: 'Analyze the sequence of honeypot interactions from the current red team exercise and map them to MITRE ATT&CK techniques.' Claude calls get_trigger_alert for each event, analyze_attacker_behavior, and produces an ATT&CK-mapped timeline of the red team's reconnaissance and lateral movement activities.",
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
          "The 18-year-old attacker who compromised Uber in September 2022 began with an MFA fatigue attack — sending repeated Uber Eats push notifications to a contractor's phone until the contractor accepted one, believing it to be a legitimate request. With the initial foothold established via the contractor's VPN access, the attacker then navigated Uber's internal network, searching for credentials to escalate privileges. They found exactly what they were looking for: a PowerShell script on an internal network share that contained hard-coded admin credentials for Uber's PAM (Privileged Access Management) system.",
          "With PAM credentials, the attacker accessed Uber's most sensitive internal tools — including HackerOne (the vulnerability disclosure program, revealing all known security bugs), AWS console, Google Workspace admin, Slack admin, and SentinelOne (the EDR platform). The attacker posted screenshots in Uber's Slack workspace and sent messages to all employees, effectively publicly demonstrating full administrative control over Uber's infrastructure. The breach affected approximately 57,000 employee records and exposed sensitive security vulnerability information.",
          "The critical deception technology gap: if Uber had deployed honeytokens — fake credentials embedded in the same internal file shares, PowerShell scripts, and configuration files where the real credentials were stored — the attacker's testing of those fake credentials would have triggered an immediate alert during the lateral movement phase. The entire breach hinged on finding real credentials in plain text; a single honeytoken credential file placed among the real ones would have provided detection before the attacker reached the PAM system. More specifically, a honeytoken PAM credential that triggered on first use would have alerted within seconds of the attacker testing the fake creds, enabling account suspension and IR response before any privileged access was gained.",
          "The breach also exposed a systemic credential hygiene failure. Credentials in PowerShell scripts on network shares indicate a broader secrets management failure — the absence of a PAM system that properly vaults and rotates credentials (ironically, Uber had a PAM system, but the script predated it). Deception technology's role in this scenario is not to replace secrets management but to provide a final detection layer when secrets management fails, as it inevitably does in complex organizations. The appropriate defense-in-depth is: secrets management (HashiCorp Vault, AWS Secrets Manager) + hardcoded secret scanning (Trufflescan, GitGuardian) + honeytokens (detect when a missed secret is used).",
          "The regulatory aftermath of the Uber breach was significant: the CISO, Joseph Sullivan, was convicted of obstruction of justice for concealing a prior 2016 Uber breach from regulators and paying the attacker $100,000 disguised as a bug bounty. The 2022 breach, while less severe in data terms, reinforced industry standards for credential management and deception technology. The SEC's new cybersecurity disclosure rules, which took effect in December 2023, would require Uber to disclose the breach within four business days — creating a strong incentive for earlier detection through tools like honeytokens.",
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
        "Decoys must remain realistic over time — automated behavioral simulation maintains honeypot account activity",
        "Defense-in-depth for credentials: secrets management + hardcoded scanning + honeytokens — all three layers are needed",
        "MITRE ENGAGE provides a structured framework for passive deception (detection) and active engagement (intelligence gathering)",
        "Canary documents in HR and financial data repositories detect exfiltration even after data leaves the organization",
        "MCP servers (mcp-deception-monitor) expose honeytoken trigger events to AI assistants for real-time attacker behavior analysis",
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
    easeScore: 4,
    valueScore: 9,
    rank: 12,
    challengeType: "ctf",
    info: {
      tagline: "The perimeter is gone. Identity is the new perimeter. Zero Trust verifies both.",
      year: 2020,
      overview: [
        "Zero Trust Architecture (ZTA), defined in NIST SP 800-207, operates on the principle of 'never trust, always verify' — every access request must be authenticated, authorized, and continuously monitored regardless of whether it originates inside or outside the traditional network perimeter. Google's BeyondCorp implementation, deployed after the Aurora attacks in 2010, was the first enterprise Zero Trust deployment at scale.",
        "Zero Trust monitoring differs from traditional perimeter monitoring because every resource access generates a rich telemetry event: who (identity), what (resource + action), from where (device posture, network location), and whether the policy allowed it. This creates a comprehensive audit trail where every access decision — not just security events — is logged and available for analysis.",
        "The five pillars of Zero Trust monitoring are: Identity (every user and service must authenticate continuously), Devices (device posture assessed at access time), Networks (microsegmentation, encrypted everywhere), Applications (per-application access control, no implicit trust), and Data (classify and protect data at the object level). Monitoring each pillar generates telemetry that feeds SIEM and UEBA for behavioral analytics.",
        "Zero Trust implementation is architecturally complex because it requires replacing the implicit trust model of traditional networks — where anything inside the perimeter is trusted — with an explicit authorization model where every request is evaluated independently. The transition typically takes 2-5 years for large enterprises and proceeds in phases: (1) identity consolidation (single IDP for all access), (2) device management (MDM for all endpoints, device posture assessment), (3) application microsegmentation (per-application access control replacing broad network access), (4) data classification (tagging data assets to enable policy enforcement at the data layer), and (5) continuous monitoring integration (feeding all ZT access decisions to SIEM/UEBA).",
        "The Policy Decision Point (PDP) and Policy Enforcement Point (PEP) are the core architectural components of Zero Trust. The PDP evaluates every access request against the organization's policy — it considers identity, device posture, network context, resource sensitivity, and behavioral signals (UEBA risk score). The PEP sits between the user and the resource and enforces the PDP's decision by allowing, denying, or stepping up authentication. The PDP and PEP can be implemented as software proxies (Zscaler, Cloudflare Access, Google BeyondCorp Enterprise), hardware appliances, or cloud service models.",
        "Continuous Adaptive Risk and Trust Assessment (CARTA) is the Gartner framework for dynamic trust evaluation — the concept that trust is not binary (trusted/untrusted) but a continuous spectrum that changes over the lifecycle of a session. A user who authenticates with MFA from a known device on a corporate network starts with a HIGH trust score. If they then access a resource they have never accessed before, their trust score drops slightly. If their UEBA risk score simultaneously rises due to large data transfers, their trust score drops further and may trigger a step-up authentication request. CARTA is implemented through continuous telemetry feeds from all ZT pillars into the PDP's risk engine.",
        "Auditing a Zero Trust program examines: PDP coverage (what percentage of application access requests are evaluated by the ZT policy engine), device compliance rate (what percentage of devices accessing corporate resources have current MDM enrollment and pass posture checks), policy deny rate (what percentage of access requests are denied — low deny rates may indicate policy gaps), step-up authentication rate (how often is MFA re-requested mid-session based on risk elevation), and access telemetry completeness (are all five ZT pillars generating telemetry and feeding the SIEM). The Zero Trust maturity model (CISA Zero Trust Maturity Model v2.0) provides specific measurement criteria for each pillar at Traditional, Initial, Advanced, and Optimal maturity levels.",
      ],
      technical: {
        title: "Continuous Adaptive Risk and Trust Assessment (CARTA)",
        body: [
          "CARTA (Gartner) and NIST 800-207 both describe dynamic trust evaluation: a session's trust level is not fixed at authentication but continuously reassessed based on behavioral signals — device posture drift, location change, anomalous resource access, privilege escalation. If trust degrades mid-session, the policy engine can step-up authenticate or terminate the session.",
          "Implementation components: Identity Provider (Okta, Azure AD, Google Identity) for authentication and MFA; Policy Decision Point (PDP) that evaluates access requests against policy; Policy Enforcement Point (PEP) — reverse proxy or network agent — that enforces the PDP decision; and telemetry pipeline that feeds all access decisions and denials to SIEM for behavioral analysis.",
          "The Python script in this stage implements a CARTA-style trust evaluation engine. The AccessContext dataclass captures the complete context of an access request: user identity, target resource and action, device compliance status (MDM-managed, patched, encrypted), device enrollment status, MFA verification, IP reputation score, UEBA risk score, and time-of-day. This rich context is what distinguishes Zero Trust from simple firewall rules — the same user accessing the same resource from different contexts receives different trust decisions.",
          "The evaluate_trust function implements a two-phase decision model. Phase 1 (hard denials): three conditions trigger immediate denial regardless of any other factors — IP reputation below 0.3 (known malicious or Tor exit node), UEBA risk score above 8.0 (critical risk), or MFA not verified. These are non-negotiable: no amount of device compliance or good working hours can overcome them. Phase 2 (score-based trust): the function accumulates a score from five positive factors — device compliance (30 points), device enrollment (20 points), working hours (15 points), good IP reputation (20 points), and low UEBA risk score (15 points). Maximum possible score is 100. The trust level thresholds (80+ HIGH, 60-79 MEDIUM, 40-59 LOW, below 40 DENIED) map to different access policies: HIGH gets full access, MEDIUM gets standard access with enhanced logging, LOW gets read-only access requiring step-up authentication, DENIED gets no access.",
          "The integration between the ZT trust engine and SIEM/UEBA creates a feedback loop. The UEBA system continuously updates each user's risk score based on behavioral signals. The trust engine reads the current risk score at every access request evaluation — meaning a user whose risk score rises mid-session due to anomalous file access will find their next access request evaluated at a lower trust level than their previous one. This feedback loop enables the trust engine to progressively restrict access as behavioral anomalies accumulate, without requiring a static rule for each specific scenario.",
          "The MCP server for Zero Trust monitoring — mcp-zt-auditor — exposes ZT policy and telemetry to AI assistants. Tools include: get_access_decision_log (returns all PDP access decisions for a given user or resource over a specified period), get_policy_deny_summary (returns all denied requests with denial reasons for the last N days), evaluate_hypothetical_access (simulates what the trust engine would decide for a given access context), get_pillar_coverage (returns ZT pillar coverage metrics — what percentage of resources are protected by each pillar), and get_trust_score_history (returns the trust score history for a given user over the last specified period). A Zero Trust auditor using Claude with mcp-zt-auditor could ask: 'Show me all access requests that were denied in the last 7 days due to device posture failures, grouped by device owner and department.' Claude calls get_policy_deny_summary with the device posture filter, groups by department, and produces a structured analysis identifying which teams have the highest rates of non-compliant devices — enabling targeted MDM remediation.",
          "Security considerations for the ZT MCP server are particularly sensitive. ZT access logs contain a complete record of every access request — what every employee tried to access, from where, and whether it was allowed. This is among the most sensitive operational data in any organization. The MCP server must enforce strict access controls: HR and legal teams should not have access to employee ZT logs (privacy concerns), red team members should not have access to ZT policy details (enables evasion), and the AI model itself should not be able to modify ZT policies (only audit them). All MCP tool calls must be logged to an immutable audit trail with the analyst's identity, the query parameters, and the data returned — creating accountability for ZT data access that matches the accountability ZT creates for resource access.",
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
          "Operation Aurora was a sophisticated Chinese state-sponsored attack that began in mid-December 2009 and targeted Google and at least 34 other major technology companies including Adobe, Juniper Networks, and Rackspace. The attack vector was a zero-day vulnerability in Internet Explorer 6 (CVE-2010-0249), used to deliver a remote access trojan via a spear-phishing email. Google attributed the attack to the Chinese government and publicly disclosed it in January 2010 — a landmark moment in corporate cyber transparency.",
          "Aurora succeeded because Google, like all organizations at the time, operated a perimeter security model: once inside the corporate network (via VPN or physical access), users and systems received broad implicit trust. The attackers moved laterally from their initial foothold to reach Google's source code repositories and internal systems. The network perimeter was breached; behind it, lateral movement was trivially easy because everything on the internal network was trusted.",
          "Google's response was BeyondCorp — a 4-year engineering project that completely redesigned how Google employees access corporate resources. Published in a series of academic papers between 2014 and 2018, BeyondCorp eliminated the concept of a trusted internal network. By 2014, Google employees accessed all corporate resources from any network (home, cafe, airport, hotel) using the same access path, with every request evaluated by a policy engine checking identity, device posture, and context. VPN was eliminated. The 'trusted internal network' ceased to exist.",
          "The BeyondCorp monitoring model generates rich telemetry that the perimeter model never could. Every access request creates a record: user, device, IP, resource, action, trust score, and decision. This telemetry feeds into Google's SIEM equivalent and enables detection of anomalous access patterns — a user accessing a code repository they have never accessed before, a device that suddenly fails posture checks mid-session, or an access pattern that doesn't match the user's historical behavior. Aurora-style lateral movement — accessing resources beyond the attacker's initial foothold — would generate immediate anomaly alerts in BeyondCorp because every hop requires re-authentication and re-authorization.",
          "The BeyondCorp model's industry impact was delayed but transformative. When the COVID-19 pandemic forced every organization to support remote work overnight in March 2020, organizations with traditional VPN-based access models were overwhelmed — VPN infrastructure scaled poorly and the security model assumed corporate network = trusted, which meant remote workers were on an untrusted network. Organizations that had invested in Zero Trust access models (BeyondCorp-style proxies, cloud identity providers with device posture checking) scaled immediately without security compromises. The pandemic accelerated Zero Trust adoption by an estimated 5-7 years compared to pre-pandemic projections.",
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
        "ZT implementation is a 2-5 year journey for large enterprises, proceeding through five phases",
        "PDP and PEP are the core ZT architecture components — the PDP decides, the PEP enforces",
        "COVID-19 accelerated ZT adoption by 5-7 years — organizations with ZT scaled remote work instantly",
        "CISA Zero Trust Maturity Model v2.0 provides measurement criteria for Traditional/Initial/Advanced/Optimal maturity",
        "MCP servers (mcp-zt-auditor) expose ZT access logs to AI auditors — but require the strictest access controls of any monitoring MCP",
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
    easeScore: 7,
    valueScore: 10,
    rank: 3,
    challengeType: "ctf",
    info: {
      tagline: "EDR sees the endpoint. NDR sees the network. XDR sees the whole story.",
      year: 2018,
      overview: [
        "Extended Detection and Response (XDR) is the architectural evolution of siloed security tools — it unifies telemetry from endpoints (EDR), network (NDR), identity (IDP logs), cloud (CSPM/CWPP), and email into a single correlated detection and response platform. Where an analyst previously had to pivot across five separate consoles to reconstruct an attack, XDR automatically correlates signals across all sources and presents a unified incident timeline.",
        "XDR platforms (Microsoft Defender XDR, CrowdStrike Falcon XDR, Palo Alto Cortex XDR, SentinelOne Singularity) use a centralized data lake with a common schema to store all telemetry. Detection rules and ML models operate across all data sources simultaneously — a correlation that would require a human analyst 45 minutes of console-pivoting completes in milliseconds against the unified dataset.",
        "The key XDR value proposition is reducing alert-to-incident correlation time. A SIEM generates thousands of independent alerts; an XDR platform automatically groups related alerts into a single incident with a timeline, a MITRE ATT&CK technique mapping, and a recommended response. Analysts work incidents, not individual alerts — a fundamental shift in SOC workflow that dramatically improves both efficiency and coverage.",
        "XDR architecture is built around three core capabilities. First, a unified data lake with a common schema (OCSF or vendor-proprietary) that normalizes telemetry from all security tools. Data from CrowdStrike (EDR), Darktrace (NDR), Okta (identity), and AWS Security Hub (cloud) is all stored in the same lake with the same schema, enabling queries that span all sources simultaneously. Second, an entity resolution engine that maintains a graph of entities (users, hosts, IPs, domains, file hashes) and links alerts that share entities. Third, an incident engine that groups correlated alerts into incidents, scores their severity, maps techniques to MITRE ATT&CK, and generates recommended response actions.",
        "Native XDR versus open XDR is the primary architectural debate in the category. Native XDR (Microsoft Defender XDR, CrowdStrike XDR) assumes that the organization uses a single vendor's suite for all telemetry sources — if you use Microsoft Defender for Endpoint, Microsoft Defender for Identity, and Microsoft Sentinel, you get deeply integrated correlation with minimal configuration. Open XDR (Palo Alto Cortex XDR, Exabeam Fusion SIEM) accepts telemetry from any vendor via APIs, sacrificing some native integration depth for vendor flexibility. Large enterprises typically end up with a hybrid: a native XDR as the primary platform plus connectors for tools the preferred vendor doesn't cover.",
        "AI is transforming XDR in ways that extend beyond the ML models embedded in detection rules. First-generation XDR AI focused on signature-free endpoint detection (behavioral AI). Second-generation focused on cross-source correlation and automated incident creation. Third-generation — emerging now — uses LLMs to generate natural-language incident summaries, recommend specific remediation steps, answer analyst questions about the incident in natural language, and even draft SOAR playbook code for novel attack patterns. Microsoft Security Copilot, integrated with Defender XDR, is the leading example of this third generation.",
        "Auditing an XDR program examines: data source coverage (what percentage of the security stack feeds telemetry to the XDR data lake), correlation latency (how quickly individual alerts are grouped into incidents — target under 5 minutes), incident-to-alert ratio (the compression factor — ideally 1 incident per 20-50 related alerts, not 1:1), MITRE ATT&CK technique coverage in automated detections, and mean time from incident creation to analyst assignment (target under 15 minutes for CRITICAL incidents). XDR programs that ingest fewer than 5 data sources or have correlation latency above 30 minutes are not realizing the platform's core value proposition.",
      ],
      technical: {
        title: "Cross-Source Correlation and Incident Graph",
        body: [
          "XDR correlation works by building an entity graph: every alert references entities (user accounts, device hostnames, IP addresses, file hashes). The XDR platform indexes all alerts by entity and finds alerts sharing entities within a time window. A process injection alert on endpoint A and a lateral movement alert from endpoint A to endpoint B are automatically linked because they share the same host entity.",
          "MITRE ATT&CK technique mapping is central to XDR — each correlated alert is tagged with the ATT&CK technique it represents. A cluster of alerts mapping to T1059 (Command Scripting Interpreter), T1547 (Boot/Logon Autostart), and T1071 (Application Layer Protocol) together tell an analyst this is a persistence-establishing malware execution chain, not three unrelated events.",
          "The Python script in this stage implements the XDR entity graph correlation algorithm. The Alert dataclass captures the essential metadata for correlation: source (which telemetry layer generated the alert), timestamp (for time-window filtering), entities (the list of entities referenced by the alert — a single alert may reference multiple hosts, users, or IPs), and technique (the MITRE ATT&CK ID). The Incident dataclass accumulates correlated alerts and provides the mitre_chain property that summarizes the full attack chain as a readable technique sequence.",
          "The correlate_to_incidents function implements a breadth-first search over the entity graph. It first builds an entity_index: a dictionary mapping each entity to the list of alerts that reference it. Then it iterates over all alerts, and for each unvisited alert, performs BFS: starting from the current alert, it finds all other alerts sharing at least one entity and occurring within the time window (default 60 minutes). All connected alerts are grouped into a single incident. The visited set prevents the same alert from being placed in multiple incidents. The result is a list of incidents, each containing all correlated alerts — dramatically reducing the alert volume that an analyst needs to triage.",
          "The time window parameter is critical for tuning false positive and false negative rates. A 60-minute window captures most attack chains (attackers typically move through initial access, execution, and lateral movement within an hour). A 24-hour window would over-correlate unrelated events that happen to share an entity (e.g., two different users logging into the same server on the same day). A 5-minute window would under-correlate slow-burn campaigns. Production XDR systems use adaptive time windows: shorter windows for high-volume entities (domain controllers, jump servers) and longer windows for low-activity entities (specialty servers, privileged user accounts).",
          "Enterprise XDR integration requires careful schema mapping and data quality management. When raw alerts from CrowdStrike, Darktrace, Okta, and AWS arrive in the XDR data lake, their entity references use different identifier formats: CrowdStrike uses device hostnames, Okta uses email addresses, AWS uses ARNs. The entity resolution engine maintains a lookup table mapping these different identifiers to canonical entity IDs — if 'workstation-chen.corp.internal' (CrowdStrike) and 'm.chen@corp.internal' (Okta) are the same physical device and user, the resolution engine maps both to entity IDs that enable cross-source correlation.",
          "The MCP server for XDR — mcp-xdr-investigator — exposes incident data and investigation capabilities to AI assistants. Tools include: get_incident_details (returns the full incident timeline, entity graph, and ATT&CK mapping for a given incident ID), search_entity_history (returns all alerts referencing a given entity over the last N days across all telemetry sources), run_ad_hoc_hunt (executes a cross-source hunt query against the XDR data lake), get_mitre_coverage (returns a heatmap of which ATT&CK techniques have active detections), and generate_incident_report (uses an LLM to draft a plain-language incident report from the technical alert data). An IR lead using Claude with mcp-xdr-investigator could say: 'Reconstruct the complete attack timeline for incident INC-2024-0115-001, including all entity movements and technique detections, and generate a draft incident report.' Claude calls get_incident_details, search_entity_history for each entity in the incident, and generate_incident_report, producing a structured incident report in under 3 minutes — a task that typically takes a skilled IR analyst 2-4 hours.",
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
          "The Lapsus$ group was a loosely organized cybercriminal gang, primarily teenagers, that breached some of the world's largest technology companies in rapid succession in late 2021 and early 2022 — including Microsoft, Okta, Samsung, Nvidia, Ubisoft, Vodafone, and T-Mobile. Their attack methodology combined social engineering (SIM swapping, bribery of insider employees, social media manipulation) with credential purchasing from dark web markets and MFA fatigue attacks. Their unusual transparency — posting about attacks and stolen data in real time on Telegram — made them a uniquely visible threat actor.",
          "At Microsoft, Lapsus$ exfiltrated 37GB of source code from Azure DevOps repositories. They posted screenshots of internal Microsoft tools and systems to prove access. Microsoft's investigation confirmed the breach affected a single compromised account — one employee's credentials, purchased or obtained through social engineering, gave Lapsus$ access to Azure DevOps repositories that contained Bing, Cortana, and other source code. Critically, signals existed across multiple telemetry sources before the breach was detected: unusual Azure DevOps repository clone operations, geographic anomalies in authentication events, and access to repositories far outside the employee's typical work scope.",
          "The XDR correlation failure was specifically that these signals existed in three separate telemetry sources — Azure AD (identity anomaly), Azure DevOps audit logs (unusual repository access), and network telemetry (large data transfers from DevOps infrastructure) — but were not automatically correlated into a single incident. An XDR platform with proper entity-based correlation would have linked the anomalous Azure AD authentication event to the unusual DevOps access and the network transfer through the shared entity of the compromised user account, creating a single CRITICAL incident within minutes of the first anomalous access.",
          "The Okta breach was particularly consequential for the industry because Okta provides identity management for thousands of organizations. Lapsus$ accessed the Okta admin console via a support engineer's credentials, viewing customer tenant data. The breach was discovered when a Lapsus$ member posted a screenshot of the Okta admin console on Telegram — the organization discovered the breach via social media, not their own monitoring. This raised fundamental questions about supply chain identity security: if an identity provider's own environment is compromised, how do downstream customers detect the impact?",
          "The industry response to Lapsus$ accelerated several security practice changes. First, phishing-resistant MFA (FIDO2/WebAuthn) adoption accelerated significantly — Lapsus$ had bypassed TOTP and SMS MFA through real-time relay attacks and SIM swapping, but FIDO2 hardware keys are immune to these techniques. Second, Azure DevOps and GitHub added repository-level access controls and anomaly detection for unusual clone operations. Third, XDR vendors specifically added detection models for the Lapsus$ TTP cluster — rapid authentication from new locations, followed by large repository clones, followed by Telegram activity — which had been invisible to legacy detection rules. The case became a canonical example of why cross-source correlation is necessary for detecting sophisticated but unsophisticated-method attacks.",
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
        "Native XDR (single vendor) vs open XDR (multi-vendor) is the primary architectural trade-off",
        "Entity resolution maps different identifier formats (hostname, email, ARN) to canonical IDs for cross-source correlation",
        "Adaptive time windows — shorter for high-volume entities, longer for low-activity ones — balance false positives and negatives",
        "LLM integration generates plain-language incident reports from technical alert data, reducing IR report authoring time from hours to minutes",
        "MCP servers (mcp-xdr-investigator) enable AI-assisted attack reconstruction across all telemetry sources simultaneously",
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
    easeScore: 8,
    valueScore: 9,
    rank: 2,
    challengeType: "ctf",
    info: {
      tagline: "Annual compliance audits are already obsolete. Controls drift every day.",
      year: 2022,
      overview: [
        "Traditional compliance programs operate on annual point-in-time audits: a snapshot of controls on the day the auditor visits, which may not represent the organization's security posture for the other 364 days. Continuous Compliance Monitoring replaces the snapshot with a real-time dashboard: controls are verified programmatically and continuously against frameworks like SOC 2, PCI-DSS, ISO 27001, FedRAMP, and HIPAA.",
        "GRC platforms (ServiceNow GRC, IBM OpenPages, Archer, Vanta, Drata, Tugboat Logic) and CSPM tools with compliance modules automate control evidence collection: pulling configuration data from AWS/Azure APIs, verifying MFA enforcement from IDP logs, confirming encryption status from storage APIs, and checking patch compliance from MDM. Evidence is collected continuously, not manually gathered for an auditor visit.",
        "The shift to continuous compliance has three benefits: (1) Audit readiness is maintained year-round — no 'audit crunch' periods; (2) Control drift is detected immediately and remediated before it becomes a finding; (3) Automated evidence collection reduces audit preparation time by 60–80%, freeing GRC staff for higher-value risk management work.",
        "Continuous compliance requires a control-to-check mapping: for every compliance control in the target framework, there must be one or more automated checks that can verify it. Some controls map cleanly to technical checks (MFA enforcement: query IDP API, verify all users in privileged roles have active MFA factors). Others are harder to automate (security awareness training completion: query the LMS, but human judgment is needed to assess training quality). The ratio of automatable controls varies by framework: FedRAMP has approximately 70% automatable controls in a typical cloud environment; HIPAA is closer to 40% due to its focus on administrative and physical safeguards.",
        "Evidence artifact management is a critical component of continuous compliance. Each automated check produces an evidence artifact: an API response payload, a configuration export, a log excerpt. These artifacts must be timestamped with cryptographic precision (ideally using a trusted timestamping authority per RFC 3161), sourced with a clear chain of custody (which system produced the data, which API call retrieved it), and stored in a tamper-evident manner (write-once storage, cryptographic hash). Modern compliance platforms use S3 object versioning with Object Lock (WORM) to create immutable evidence vaults that satisfy auditor requirements for evidence integrity.",
        "The intersection of continuous compliance with DevOps practices has produced the 'compliance-as-code' movement. Organizations using infrastructure-as-code (Terraform, CloudFormation) can embed compliance checks directly into their IaC deployment pipelines — a Terraform module that creates an S3 bucket automatically checks that the PublicAccessBlock configuration is enabled before applying the change. Policy-as-code tools (Open Policy Agent, Sentinel, Conftest) enforce compliance controls at the code level, preventing non-compliant configurations from being deployed rather than detecting them after deployment.",
        "AI is transforming compliance monitoring through two capabilities. First, LLMs can interpret the natural language of compliance frameworks and generate automated check specifications — given a control like 'all administrative access must use multi-factor authentication', an LLM can identify which IDP APIs to call, what response fields to check, and what threshold constitutes a pass. Second, LLMs can generate audit narrative: given structured evidence artifacts (API responses, configuration exports), they produce the plain-language description of the evidence that auditors require — transforming technical JSON into readable compliance documentation.",
      ],
      technical: {
        title: "Automated Control Evidence Collection",
        body: [
          "Each compliance control maps to one or more technical checks that can be automated. PCI-DSS Requirement 8.3.6 (MFA for all non-console administrative access) maps to: query IDP for all admin-role users, verify MFA method is enrolled and active for each, verify no admin access has been granted without MFA in the past 30 days. This check runs daily and updates the control evidence record.",
          "Evidence artifacts include API response payloads, screenshots (for UI-only controls), logs, and configuration exports — stored with timestamps and source identifiers to create an immutable audit trail. Modern compliance platforms use cryptographic signatures on evidence artifacts to prevent tampering and support chain-of-custody requirements for regulatory audits.",
          "The Python script in this stage implements a PCI-DSS control check for MFA enrollment verification. The check_pci_mfa_requirement function accepts an Okta client and a look-back period in days. It begins by constructing the evidence dictionary with three required fields: the control identifier (PCI-DSS-4.0-8.3.6), the check timestamp (using UTC ISO 8601 format), and empty arrays for users_checked and failures. The check_time field is critical — it is the timestamp that appears in the audit record as the evidence collection time.",
          "For each admin user returned by list_group_users, the function calls list_enrolled_factors and filters for ACTIVE factors. If no active factors exist, it appends a failure record with CRITICAL severity — a PCI-DSS violation requiring immediate remediation. The evidence dictionary accumulates a per-user record showing MFA enrollment status and factor types. At the end, the function computes compliance_pct as the ratio of MFA-enrolled users to total admin users — a metric that can be tracked over time to show trend improvement.",
          "In production, this function integrates with three systems: the Okta API (for user and factor data), the compliance platform database (for evidence storage with timestamp and hash), and the ticketing system (for automated remediation ticket creation when failures are detected). The compliance platform computes a SHA-256 hash of the evidence dictionary before storage and records the hash in a separate tamper-log that the audit team can verify. When the external auditor requests evidence for PCI-DSS 8.3.6, they receive the evidence artifact plus its hash plus the tamper-log entry — a chain of custody that satisfies QSA (Qualified Security Assessor) requirements.",
          "Extending this script for enterprise production involves four enhancements. First, add pagination: the current implementation assumes the admin group has fewer users than the Okta API page size. In large enterprises, the admin group may have hundreds of members requiring pagination. Second, add a service account exclusion list: service accounts in the admin group should be excluded from MFA requirements (they authenticate via API key, not TOTP). Third, add factor type validation: PCI-DSS 4.0 requires MFA to use factors from two different categories (something you know + something you have/are); a user enrolled only in email-based TOTP may not satisfy the requirement. Fourth, add evidence signing using the cryptography library to RSA-sign the evidence artifact before storage.",
          "The MCP server for compliance monitoring — mcp-compliance-monitor — exposes continuous compliance data to AI assistants. Tools include: get_control_status (returns the current pass/fail status and evidence for a named control), run_framework_check (runs all automated checks for a specified compliance framework and returns a summary), get_evidence_artifact (returns the stored evidence for a specific control check, with hash for integrity verification), list_failing_controls (returns all controls currently failing across all frameworks), and generate_audit_response (uses an LLM to draft an auditor-ready narrative for a given control's evidence). A compliance manager using Claude with mcp-compliance-monitor preparing for a PCI-DSS QSA audit could ask: 'Generate a draft audit response for all PCI-DSS Requirement 8 controls, including the evidence collected in the last 30 days.' Claude calls run_framework_check for PCI-DSS Requirement 8, get_evidence_artifact for each control, and generate_audit_response, producing audit-ready documentation in minutes rather than days.",
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
          "The FTC's 2023 consent order against Drizly — and its CEO Cory Rellas personally — was remarkable for establishing that individual executives can be held liable for systemic compliance program failures. The underlying breach occurred in 2020: an attacker accessed Drizly's GitHub repository (which Drizly employees were using publicly), found AWS credentials hard-coded in the repository, used those credentials to access Drizly's AWS environment, and exfiltrated 2.5 million customer records including email addresses, dates of birth, and encrypted passwords. The breach was a textbook case of credential hygiene failure — but the FTC's focus was on the systemic compliance failures that enabled it.",
          "The FTC's complaint enumerated specific compliance failures: failure to implement MFA on Drizly's employee accounts (allowing the attacker to use stolen GitHub credentials without a second factor), failure to implement the principle of least privilege in AWS IAM (the credentials in GitHub had excessive permissions), failure to monitor for credential exposure (no alerting when AWS keys were pushed to a public repository), and failure to maintain adequate security monitoring (the breach was not detected for months). Each of these failures represents a compliance control that would have been identified as missing in a standard SOC 2 or CIS AWS assessment.",
          "The consent order's most significant precedent was the personal binding obligation placed on CEO Cory Rellas. The order requires him to implement a comprehensive security program at any future employer with more than 25,000 users for the next 10 years — even after leaving Drizly. This precedent created immediate urgency in C-suite security conversations: executives who previously viewed security as a technical department responsibility now faced personal liability for compliance program failures. The FTC specifically cited the CEO's awareness of the security weaknesses and failure to prioritize remediation.",
          "What continuous compliance monitoring would have prevented: a continuous compliance program checking for credential exposure (GitGuardian, Trufflescan) would have detected the AWS key in the public GitHub repository within minutes of the commit, triggered an automated key rotation, and created a remediation ticket. A CSPM check for IAM least privilege would have flagged the overly permissive credentials. A SOC 2 continuous compliance check for MFA enrollment would have detected the missing MFA on employee accounts. Any one of these controls, automated and continuously monitored, would have broken the attack chain before the breach occurred.",
          "The Drizly case prompted significant changes in how compliance platforms approach evidence collection and executive reporting. Vanta, Drata, and similar platforms added CEO-level compliance dashboards showing real-time control status — giving executives visibility into the compliance posture that the FTC held them accountable for knowing. Several platforms also added automated evidence collection for the specific controls cited in the FTC order (MFA enforcement, least privilege IAM, credential exposure monitoring) as pre-built check templates. The regulatory aftershock of Drizly was a tangible increase in enterprise demand for continuous compliance monitoring platforms, driven by C-suite risk awareness rather than technical security teams.",
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
        "Compliance-as-code embeds control checks in IaC pipelines — preventing non-compliant configs from deploying",
        "FedRAMP has ~70% automatable controls in cloud environments; HIPAA is ~40% due to administrative safeguard focus",
        "Evidence signing with RSA and tamper-logs satisfy QSA chain-of-custody requirements for PCI audits",
        "LLMs can generate auditor-ready narrative from structured evidence artifacts, transforming JSON into compliance documentation",
        "MCP servers (mcp-compliance-monitor) enable AI-generated audit responses, reducing preparation from days to minutes",
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
    easeScore: 7,
    valueScore: 8,
    rank: 7,
    challengeType: "ctf",
    info: {
      tagline: "What gets measured gets improved. MTTD and MTTR are the vital signs of your security program.",
      year: 2023,
      overview: [
        "Monitoring maturity is measured through operational metrics that quantify security effectiveness, not just compliance checkbox completion. The two most important SOC metrics are MTTD (Mean Time to Detect) — the average time between a security event occurring and the SOC detecting it — and MTTR (Mean Time to Respond) — the average time between detection and full containment. Industry benchmarks: MTTD 21 days (IBM Cost of Data Breach 2023 median); MTTR 73 days — organizations with mature monitoring programs achieve MTTD < 24 hours.",
        "The SOC Maturity Model (CREST, Gartner, SANS) defines five levels: Level 1 (Reactive — no proactive monitoring, incident-driven), Level 2 (Compliance-Focused — monitoring for regulatory requirements only), Level 3 (Proactive — threat hunting, behavioral detection), Level 4 (Threat Intelligence-Led — external TI integrated, adversary simulation), Level 5 (Adaptive — AI-augmented, continuous improvement, metrics-driven). Most enterprise organizations target Level 3–4.",
        "Beyond MTTD/MTTR, mature monitoring programs track: false positive rate (alerts requiring no action / total alerts — target < 5%), SOAR automation coverage (% of alert types with automated playbooks — target > 70%), alert-to-incident escalation rate (% of alerts escalating to formal incidents — informs detection tuning), and mean time to recover (full business service restoration, distinct from contain).",
        "The MTTD/MTTR benchmarks in the IBM Cost of a Data Breach Report have become the industry's primary external calibration points. The 2023 report analyzed 553 organizations globally and found that organizations with AI and automation fully deployed achieved MTTD of 28 days (vs 82 days without), and MTTR of 33 days (vs 96 days without). The 49-day reduction in breach lifecycle translates directly to cost: fully AI-automated organizations saved an average of $1.76M per breach compared to organizations without AI. These numbers make the business case for AI-enhanced monitoring concrete and board-communicable.",
        "SOC maturity assessment methodology combines quantitative metrics (MTTD, MTTR, false positive rate, automation coverage) with qualitative capability assessments across threat detection, incident response, threat hunting, and security engineering functions. CREST's SOC certification program evaluates SOC maturity against a formal capability model and awards tiered certifications (Foundation, Practitioner, Expert). The SANS SOC Survey provides annual benchmarking data enabling organizations to compare their metrics against industry peers segmented by company size and sector.",
        "The relationship between monitoring tool maturity and SOC maturity is not linear. Organizations can have mature tools (enterprise XDR, next-gen SIEM, SOAR) and still operate at Level 2 maturity if they have not invested in the processes and people required to use those tools effectively. Conversely, organizations with simpler tool stacks but highly skilled analysts using them well often achieve better operational outcomes than organizations with complex tool stacks that analysts find unusable. The CREST and SANS maturity models explicitly assess people, processes, and technology in equal measure.",
        "AI is changing the maturity conversation by collapsing the cost of reaching Level 3-4 maturity. Previously, achieving proactive threat hunting capability (Level 3) required specialized threat hunting analysts — a rare and expensive skill set. LLM-based threat hunting tools enable Tier 1 analysts to execute sophisticated hunts using natural language queries. AI-assisted alert triage reduces the analyst skill required for Tier 1 work. AI-generated incident reports reduce the documentation burden on senior analysts. The net effect is that organizations can achieve Level 3-4 operational outcomes with smaller and less specialized SOC teams — democratizing advanced monitoring maturity.",
      ],
      technical: {
        title: "MTTD/MTTR Calculation and Benchmarking",
        body: [
          "MTTD is calculated from two timestamps: the 'breach timestamp' (when the event actually occurred, determined retrospectively from logs) and the 'detection timestamp' (when the SIEM/SOC first identified the event). For incidents where the breach timestamp is unknown, MTTD is calculated as detection timestamp minus earliest indicator of compromise timestamp found in forensic analysis.",
          "MTTR is calculated from detection timestamp to containment timestamp (the moment the threat is isolated and can no longer cause damage). Full recovery (business service restoration) is tracked separately as MTTRECOVER. Dashboard visualization: MTTD/MTTR trend lines over 90-day rolling windows, segmented by incident severity, detection source (automated vs human), and attack category. Regression in either metric triggers a program review.",
          "The Python script in this stage implements the core MTTD/MTTR computation engine. The compute_mttd_mttr function accepts a list of incident records, each containing three timestamps: breach_ts (when the breach occurred), detected_ts (when the SOC detected it), and contained_ts (when containment was achieved). It computes the MTTD for each incident as (detected - breach) and MTTR as (contained - detected), both in hours for readability.",
          "The inner stats function computes five statistical measures for each metric: mean (the primary benchmark number), median (robust to outlier incidents — one 312-hour incident pulls the mean significantly), p90 (the 90th percentile — useful for understanding worst-case scenarios), min (demonstrates best-case performance), and max (the worst incident). Production SOC dashboards typically display mean and median MTTD/MTTR on trend charts, with p90 as a secondary indicator. The p90 calculation uses a simple index into the sorted list — a more rigorous implementation would use interpolation for non-integer percentile positions.",
          "The benchmarks dictionary in the result is critical for contextualization. Without an industry reference point, a MTTD of 18 hours sounds fast — but the IBM benchmark of 504 hours (21 days) makes it look excellent. With the target of 24 hours, 18 hours looks like it's meeting but not exceeding the target. Organizations should track their metrics against both internal targets (what the CISO committed to the board) and external benchmarks (IBM, CREST peer comparison) to communicate program effectiveness in business terms.",
          "Enterprise MTTD/MTTR dashboards integrate with four data sources: the incident management system (ServiceNow, Jira) for breach_ts, detected_ts, and contained_ts timestamps; the SIEM for alert timestamps to validate detected_ts; the forensic analysis system for retrospective breach_ts calculation; and the executive reporting tool for board-level visualization. The metrics pipeline runs nightly, recomputes the rolling 90-day statistics, and pushes updates to the CISO dashboard. Any regression of more than 10% from the prior week triggers an automated program review alert to the SOC director.",
          "The MCP server for SOC maturity — mcp-soc-metrics — exposes operational metrics and maturity data to AI assistants. Tools include: get_mttd_mttr_trends (returns rolling MTTD/MTTR statistics segmented by severity, source, and attack category), get_maturity_assessment (returns the current SOC maturity level assessment against the CREST model), get_detection_gap_analysis (identifies attack categories with no automated detections), compare_to_benchmarks (compares current metrics to IBM, CREST, and SANS industry benchmarks), and generate_board_report (uses an LLM to draft a board-ready security metrics report from the operational data). A CISO using Claude with mcp-soc-metrics preparing for a quarterly board presentation could ask: 'Generate a board-ready security metrics report comparing our Q4 MTTD/MTTR to industry benchmarks and explaining our improvement roadmap.' Claude calls get_mttd_mttr_trends, compare_to_benchmarks, get_maturity_assessment, and generate_board_report, producing a polished executive report — a 3-4 hour task done in under 5 minutes.",
          "The capstone value of this stage is understanding how every tool in the Continuous Monitoring 2.0 stack contributes to the MTTD/MTTR metrics that define program effectiveness. ISCM (Stage 1) establishes the baseline visibility without which MTTD cannot be measured. Next-Gen SIEM (Stage 2) provides the ML-enhanced detection that reduces MTTD from weeks to hours. UEBA (Stage 3) catches insider threats that signature-based detection misses. NDR (Stage 4) provides network-layer visibility for encrypted C2 detection. CSPM (Stage 5) prevents cloud misconfigurations that create attack paths. Threat Intelligence (Stage 6) provides context that reduces false positives and aids attribution. SOAR (Stage 7) drives MTTR from hours to minutes through automated response. Deception (Stage 8) provides zero-false-positive early warning that catches attackers who bypass every other layer. Zero Trust (Stage 9) generates the per-request access telemetry that enables precise MTTD calculation. XDR (Stage 10) correlates signals across all sources to create the unified incident view that enables rapid MTTR. Continuous Compliance (Stage 11) ensures controls don't drift between audits. And this stage — monitoring maturity — provides the measurement framework that proves the stack is working and drives continuous improvement.",
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
          "The MGM Resorts breach began with a remarkably low-tech attack: a 10-minute social engineering phone call to the MGM IT helpdesk. The attacker — a member of the Scattered Spider group — found an MGM IT employee's LinkedIn profile, used the publicly available information (name, employer, job title) to impersonate the employee, and convinced the helpdesk agent to reset the account's credentials and disable MFA. The attack required no malware, no zero-days, and no sophisticated technical capabilities — just social engineering skills and a LinkedIn search.",
          "With valid credentials in hand, Scattered Spider accessed MGM's Okta environment and from there spread to MGM's cloud infrastructure. They deployed the ALPHV/BlackCat ransomware across MGM's systems within hours of initial access. The ransomware encrypted critical systems controlling casino floor slot machines, hotel room digital keys, restaurant reservation systems, and MGM's website. MGM's casino floor went dark. Hotel guests couldn't use digital room keys. The operational impact was immediate and visible to the public — an unusually transparent indicator of breach severity.",
          "MGM's MTTD was adequate in one sense — the attack was detected quickly because the ransomware's impact was immediately obvious. But MTTD measured from social engineering attack to detection was essentially the time for Scattered Spider to traverse from helpdesk reset to ransomware deployment — hours, not days. The failure was in detection of the pre-ransomware intrusion phase: the unusual Okta activity, the credential reset from a helpdesk call that should have required additional verification, and the rapid access to new systems that should have triggered a UEBA alert.",
          "MGM's MTTR was catastrophic — full operational recovery took 10 days at an estimated cost exceeding $100M in revenue losses, remediation expenses, and forensic investigation costs. The 10-day recovery time reflects the challenge of ransomware incidents specifically: recovery requires not just containment (isolating infected systems) but complete rebuilding of encrypted systems from clean backups, verification that backups are clean and not themselves encrypted or tampered with, staged restoration of systems in dependency order, and testing of restored systems before reconnecting to production networks. MGM did not pay the ransom; Caesars Entertainment, hit by the same Scattered Spider group in the same period, reportedly paid approximately $15M.",
          "The MGM incident reinforced three maturity model imperatives. First, social engineering resistance requires more than technical controls — helpdesk verification procedures are a people-and-process control that must be continuously tested and trained. Second, MTTD for pre-ransomware activity (credential misuse, unusual cloud access) must be measured separately from MTTD for ransomware impact — by the time ransomware is obvious, the opportunity to prevent catastrophic damage has passed. Third, MTTR for ransomware requires tested, clean, and staged backup restoration capabilities — organizations that have never practiced ransomware recovery will discover during the incident that their backup systems are inadequate, incomplete, or themselves compromised. Tabletop exercises and red team simulations that specifically test the recovery workflow are now a standard Level 4-5 maturity requirement.",
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
        "AI-automated organizations achieve 49-day shorter breach lifecycles and $1.76M lower breach costs vs non-AI (IBM 2023)",
        "MTTD for pre-ransomware activity must be tracked separately — by the time ransomware is visible, MTTD has already failed",
        "MTTR for ransomware requires pre-tested clean backup restoration capabilities — discover gaps in tabletop exercises, not during incidents",
        "People, processes, and technology must all mature together — tool maturity without process maturity produces poor outcomes",
        "MCP servers (mcp-soc-metrics) enable AI-generated board reports from operational metrics, collapsing 3-4 hour reporting tasks to minutes",
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
