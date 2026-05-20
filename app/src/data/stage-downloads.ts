type Download = { name: string; url: string; description: string };

export const stageDownloads: Record<string, Download[]> = {
  // ── Tech Audit: Agentic Continuous Monitoring ──────────────────────────────
  "audit-a01": [
    { name: "audit-a01-tool-use.py", url: "/mcp-templates/audit-a01-tool-use.py", description: "MCP server: IAM policy audit tool — define, call, and loop Claude tool use" },
  ],
  "audit-a02": [
    { name: "audit-a02-api-enumeration.py", url: "/mcp-templates/audit-a02-api-enumeration.py", description: "MCP server: agentic API surface discovery — OpenAPI enumeration and endpoint mapping" },
  ],
  "audit-a03": [
    { name: "audit-a03-secrets-scanner.py", url: "/mcp-templates/audit-a03-secrets-scanner.py", description: "MCP server: AI-powered secrets detection in git repos and environment configs" },
  ],
  "audit-a04": [
    { name: "audit-a04-cloud-enumeration.py", url: "/mcp-templates/audit-a04-cloud-enumeration.py", description: "MCP server: automated AWS cloud resource enumeration via boto3 + Claude" },
  ],
  "audit-a05": [
    { name: "audit-a05-iam-analyzer.py", url: "/mcp-templates/audit-a05-iam-analyzer.py", description: "MCP server: IAM policy privilege escalation analyzer — Claude reasoning over policy JSON" },
  ],
  "audit-a06": [
    { name: "audit-a06-mcp-integration.py", url: "/mcp-templates/audit-a06-mcp-integration.py", description: "MCP server: filesystem + git + web fetch tools for comprehensive audit data collection" },
  ],
  "audit-a07": [
    { name: "audit-a07-iac-reviewer.py", url: "/mcp-templates/audit-a07-iac-reviewer.py", description: "MCP server: agentic IaC review — Terraform plan parsing and CIS benchmark checking" },
  ],
  "audit-a08": [
    { name: "audit-a08-evidence-collector.py", url: "/mcp-templates/audit-a08-evidence-collector.py", description: "MCP server: automated SOC 2 evidence collection and artifact packaging" },
  ],
  "audit-a09": [
    { name: "audit-a09-orchestrator.py", url: "/mcp-templates/audit-a09-orchestrator.py", description: "MCP server: multi-agent audit orchestrator — specialist sub-agents with Claude coordination" },
  ],
  "audit-a10": [
    { name: "audit-a10-report-writer.py", url: "/mcp-templates/audit-a10-report-writer.py", description: "MCP server: AI audit report generator — findings, risk ratings, and remediation drafting" },
  ],
  "audit-a11": [
    { name: "audit-a11-sentinel.py", url: "/mcp-templates/audit-a11-sentinel.py", description: "MCP server: scheduled continuous compliance agent — drift detection and alerting" },
  ],
  "audit-a12": [
    { name: "audit-a12-full-pipeline.py", url: "/mcp-templates/audit-a12-full-pipeline.py", description: "MCP server: end-to-end agentic audit pipeline — collect, analyze, report, alert" },
  ],

  // ── Continuous Monitoring 2.0 ───────────────────────────────────────────────
  "audit-cm01": [
    { name: "audit-cm01-iscm-baseline.py", url: "/mcp-templates/audit-cm01-iscm-baseline.py", description: "MCP server: NIST SP 800-137 ISCM metrics collector — staleness checks and posture score" },
  ],
  "audit-cm02": [
    { name: "audit-cm02-siem-ml.py", url: "/mcp-templates/audit-cm02-siem-ml.py", description: "MCP server: ML-enhanced SIEM log ingestion — anomaly scoring and Splunk/Elastic integration" },
  ],
  "audit-cm03": [
    { name: "audit-cm03-ueba.py", url: "/mcp-templates/audit-cm03-ueba.py", description: "MCP server: UEBA risk scoring — behavioral baseline and threat chain correlation" },
  ],
  "audit-cm04": [
    { name: "audit-cm04-ndr.py", url: "/mcp-templates/audit-cm04-ndr.py", description: "MCP server: NDR C2 beaconing detection — Zeek log analysis and periodic connection scoring" },
  ],
  "audit-cm05": [
    { name: "audit-cm05-cspm.py", url: "/mcp-templates/audit-cm05-cspm.py", description: "MCP server: CSPM attack path analysis — cloud misconfiguration chain detection via AWS APIs" },
  ],
  "audit-cm06": [
    { name: "audit-cm06-threat-intel.py", url: "/mcp-templates/audit-cm06-threat-intel.py", description: "MCP server: STIX/TAXII threat intelligence feed — indicator enrichment and correlation" },
  ],
  "audit-cm07": [
    { name: "audit-cm07-soar.py", url: "/mcp-templates/audit-cm07-soar.py", description: "MCP server: SOAR playbook engine — automated alert triage and response workflow" },
  ],
  "audit-cm08": [
    { name: "audit-cm08-deception.py", url: "/mcp-templates/audit-cm08-deception.py", description: "MCP server: honeytoken deployment and trip-wire monitoring with real-time alerting" },
  ],
  "audit-cm09": [
    { name: "audit-cm09-zero-trust.py", url: "/mcp-templates/audit-cm09-zero-trust.py", description: "MCP server: Zero Trust CARTA — continuous adaptive risk and trust assessment scoring" },
  ],
  "audit-cm10": [
    { name: "audit-cm10-xdr.py", url: "/mcp-templates/audit-cm10-xdr.py", description: "MCP server: XDR cross-source correlation — endpoint + network + identity incident graph" },
  ],
  "audit-cm11": [
    { name: "audit-cm11-compliance.py", url: "/mcp-templates/audit-cm11-compliance.py", description: "MCP server: continuous compliance engine — real-time NIST SP 800-53 control verification" },
  ],
  "audit-cm12": [
    { name: "audit-cm12-maturity.py", url: "/mcp-templates/audit-cm12-maturity.py", description: "MCP server: SOC maturity scorecard — MTTD/MTTR calculation and maturity model scoring" },
  ],
};
