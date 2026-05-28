# MCP Server Templates — Quick Reference

All 24 runnable Python scripts for the AI Audit and Continuous Monitoring epochs.
Each file is a working Claude tool-use MCP server. Download from `/mcp-templates/<filename>`.

**Setup (all scripts):**
```
pip install anthropic boto3   # boto3 only needed for AWS scripts
export ANTHROPIC_API_KEY=sk-...
python <script>.py
```

---

## Agentic AI Audit Epoch (`audit-a01` – `audit-a12`)

| File | Lesson | Tied To |
|------|--------|---------|
| `audit-a01-tool-use.py` | **IAM Policy Audit Tool** — Define tools, call via Claude, loop until done. The foundational MCP pattern. | Claude tool use basics |
| `audit-a02-api-enumeration.py` | **Agentic API Surface Discovery** — OpenAPI enumeration and endpoint mapping. Finds undocumented routes. | API surface audit |
| `audit-a03-secrets-scanner.py` | **AI-Powered Secrets Detection** — Scans git repos and env configs for leaked credentials using Claude pattern recognition. | Secrets management audit |
| `audit-a04-cloud-enumeration.py` | **AWS Cloud Resource Enumeration** — boto3 + Claude to map your full AWS attack surface across accounts and regions. | Cloud inventory audit |
| `audit-a05-iam-analyzer.py` | **IAM Privilege Escalation Analyzer** — Claude reasons over IAM policy JSON to surface escalation paths and over-permissions. | IAM / least-privilege audit |
| `audit-a06-mcp-integration.py` | **Multi-Tool Data Collection** — Filesystem + git + web fetch tools in one MCP server for comprehensive audit data gathering. | Evidence collection |
| `audit-a07-iac-reviewer.py` | **Agentic IaC Review** — Terraform plan parsing and CIS benchmark checking. Flags misconfigs before apply. | Infrastructure-as-Code audit |
| `audit-a08-evidence-collector.py` | **SOC 2 Evidence Collector** — Orchestrates artifact collection across systems and packages audit evidence bundles. | Compliance evidence collection |
| `audit-a09-orchestrator.py` | **Multi-Agent Audit Orchestrator** — Coordinator delegates to specialist sub-agents (IAM, network, cloud, secrets). | Multi-agent audit pipelines |
| `audit-a10-report-writer.py` | **AI Audit Report Generator** — Transforms raw findings into professional audit reports with risk ratings and remediation. | Audit reporting |
| `audit-a11-sentinel.py` | **Continuous Compliance Sentinel** — Scheduled drift detection agent. Converts point-in-time audits into always-on monitoring. | Continuous compliance |
| `audit-a12-full-pipeline.py` | **End-to-End Audit Pipeline** — Assembles all prior components: collect → analyze → report → alert. The capstone pipeline. | Full agentic audit workflow |

---

## Continuous Monitoring 2.0 Epoch (`audit-cm01` – `audit-cm12`)

| File | Lesson | Real-World Incident |
|------|--------|---------------------|
| `audit-cm01-iscm-baseline.py` | **NIST SP 800-137 ISCM Metrics** — Collects vulnerability, config, access, and incident metrics. Calculates posture score and staleness. | OPM breach (2015) — 14-month dwell |
| `audit-cm02-siem-ml.py` | **ML-Enhanced SIEM** — Isolation Forest anomaly scoring on login events. Splunk/Elastic integration pattern. | SolarWinds SUNBURST (2020) |
| `audit-cm03-ueba.py` | **UEBA Risk Scoring** — Behavioral baseline per user. Flags drift across login time, data volume, geo, and privilege use. | Tesla insider threat (2018) |
| `audit-cm04-ndr.py` | **NDR C2 Beaconing Detection** — Zeek log analysis. Scores connections for periodic timing (C2 heartbeats) and JA3 fingerprints. | Hafnium Exchange zero-day (2021) |
| `audit-cm05-cspm.py` | **CSPM Attack Path Analysis** — AWS API checks for misconfiguration chains (public S3 → over-privileged role → data). ⭐ Rank #1 | Capital One breach (2019) |
| `audit-cm06-threat-intel.py` | **STIX/TAXII Threat Intelligence** — Ingests structured TI feeds, enriches alerts with IOCs, correlates against your environment. | Volt Typhoon (2023) |
| `audit-cm07-soar.py` | **SOAR Playbook Engine** — Claude executes alert triage playbooks: isolate, notify, ticket, remediate. Reduces MTTR. | Twilio cascade breach (2022) |
| `audit-cm08-deception.py` | **Honeytoken Monitor** — Deploys fake credentials and files, monitors trip-wire access, fires real-time alerts on touch. | Uber hard-coded credential breach (2022) |
| `audit-cm09-zero-trust.py` | **Zero Trust CARTA Scoring** — Continuous adaptive risk assessment: device health + identity + behavior + context = trust score. | Google BeyondCorp origin |
| `audit-cm10-xdr.py` | **XDR Cross-Source Correlation** — Correlates endpoint + network + identity signals into unified incident graphs. | Lapsus$ vs. Microsoft (2022) |
| `audit-cm11-compliance.py` | **Continuous Compliance Engine** — Real-time NIST SP 800-53 control verification. Replaces annual point-in-time assessments. | FTC vs. Drizly (2023) |
| `audit-cm12-maturity.py` | **SOC Maturity Scorecard** — Calculates MTTD/MTTR, alert-to-ticket rate, automation coverage. Maps to SOC-CMM maturity levels. | MGM Resorts (2023) |

---

## Ease vs. Value — Continuous Monitoring Priority Grid

For `audit-cm` stages only. Higher combined score = implement first.

| Rank | Stage | Script | Ease (1–10) | Value (1–10) | Combined |
|------|-------|--------|-------------|--------------|---------|
| 1 | audit-cm05 | `audit-cm05-cspm.py` | 8 | 9 | 17 |
| 2 | audit-cm11 | `audit-cm11-compliance.py` | 8 | 9 | 17 |
| 3 | audit-cm10 | `audit-cm10-xdr.py` | 7 | 10 | 17 |
| 4 | audit-cm02 | `audit-cm02-siem-ml.py` | 6 | 10 | 16 |
| 5 | audit-cm07 | `audit-cm07-soar.py` | 6 | 9 | 15 |
| 6 | audit-cm06 | `audit-cm06-threat-intel.py` | 7 | 8 | 15 |
| 7 | audit-cm12 | `audit-cm12-maturity.py` | 7 | 8 | 15 |
| 8 | audit-cm08 | `audit-cm08-deception.py` | 8 | 7 | 15 |
| 9 | audit-cm03 | `audit-cm03-ueba.py` | 5 | 9 | 14 |
| 10 | audit-cm04 | `audit-cm04-ndr.py` | 5 | 9 | 14 |
| 11 | audit-cm01 | `audit-cm01-iscm-baseline.py` | 6 | 8 | 14 |
| 12 | audit-cm09 | `audit-cm09-zero-trust.py` | 4 | 9 | 13 |
