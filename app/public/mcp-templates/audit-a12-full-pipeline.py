"""
audit-a12-full-pipeline.py
MCP Server: End-to-End Agentic Audit Pipeline — Collect, Analyze, Report, Alert
Lesson: Assembling all prior audit components into a single orchestrated pipeline.

SETUP:
  pip install anthropic boto3 requests

USAGE:
  python audit-a12-full-pipeline.py --org "Acme Corp" --scope aws
  python audit-a12-full-pipeline.py --org "Acme Corp" --scope aws --alert-webhook https://hooks.slack.com/...
  python audit-a12-full-pipeline.py --dry-run  # Mock mode for learning

HOW IT WORKS:
  This is the capstone script — it chains all audit capabilities into one pipeline:

  PHASE 1: COLLECT
    Cloud enumeration (audit-a04), secrets scanning (audit-a03), IaC review (audit-a07)

  PHASE 2: ANALYZE
    IAM privilege escalation (audit-a05), specialist agent analysis (audit-a09)

  PHASE 3: REPORT
    Risk rating, framework mapping, report generation (audit-a10)

  PHASE 4: ALERT
    Compliance drift detection (audit-a11), webhook notification

  The pipeline runs as a single Claude Sonnet session with full context of all findings.
  Each phase is a tool call — Claude decides what to investigate more deeply based on results.

REAL USE: Schedule weekly via cron or GitHub Actions. Store reports in S3.
"""

import json
import argparse
from datetime import datetime, timezone
import anthropic

PIPELINE_TOOLS = [
    # Phase 1: Collection
    {
        "name": "collect_cloud_inventory",
        "description": "Enumerates all AWS resources: S3, EC2, IAM, CloudTrail, security groups.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "default": "us-east-1"},
            },
            "required": [],
        },
    },
    {
        "name": "scan_for_secrets",
        "description": "Scans configuration files and environment for hardcoded credentials.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string", "description": "Path to scan (default: current dir)."},
            },
            "required": [],
        },
    },
    # Phase 2: Analysis
    {
        "name": "analyze_iam_escalation",
        "description": "Identifies IAM privilege escalation paths in the collected policy data.",
        "input_schema": {
            "type": "object",
            "properties": {
                "iam_data": {"type": "object", "description": "IAM data from collect_cloud_inventory."},
            },
            "required": ["iam_data"],
        },
    },
    {
        "name": "analyze_network_exposure",
        "description": "Identifies network exposure risks in security groups and VPC config.",
        "input_schema": {
            "type": "object",
            "properties": {
                "network_data": {"type": "object"},
            },
            "required": ["network_data"],
        },
    },
    # Phase 3: Reporting
    {
        "name": "generate_risk_ratings",
        "description": "Applies risk ratings to all collected findings using CVSS-style scoring.",
        "input_schema": {
            "type": "object",
            "properties": {
                "findings": {"type": "array", "items": {"type": "object"}},
            },
            "required": ["findings"],
        },
    },
    {
        "name": "write_audit_report",
        "description": "Writes the final audit report to disk as JSON and markdown.",
        "input_schema": {
            "type": "object",
            "properties": {
                "organization": {"type": "string"},
                "rated_findings": {"type": "array"},
                "output_path": {"type": "string"},
            },
            "required": ["organization", "rated_findings"],
        },
    },
    # Phase 4: Alerting
    {
        "name": "send_summary_alert",
        "description": "Sends an audit completion summary to the configured webhook.",
        "input_schema": {
            "type": "object",
            "properties": {
                "summary": {"type": "string"},
                "critical_count": {"type": "integer"},
                "high_count": {"type": "integer"},
                "webhook_url": {"type": "string"},
            },
            "required": ["summary", "critical_count", "high_count"],
        },
    },
]

# Mock data for all pipeline phases
MOCK_INVENTORY = {
    "s3_buckets": [
        {"name": "data-lake-prod", "public": True, "encrypted": False, "versioning": False},
        {"name": "audit-logs", "public": False, "encrypted": True, "versioning": True},
    ],
    "ec2_instances": [
        {"id": "i-0abc123", "public_ip": "54.234.12.88", "security_groups": ["sg-web"]},
    ],
    "iam": {
        "users": [
            {"username": "admin", "mfa": True, "key_age": 45},
            {"username": "ci-deploy", "mfa": False, "key_age": 180},
        ],
        "policies": [
            {"name": "DeveloperAccess", "actions": ["iam:CreatePolicyVersion", "s3:*", "lambda:*", "iam:PassRole"]},
        ],
    },
    "security_groups": [
        {"id": "sg-web", "open_rules": [{"port": 22, "cidr": "0.0.0.0/0"}, {"port": 443, "cidr": "0.0.0.0/0"}]},
    ],
    "cloudtrail": {"enabled": True, "multi_region": False, "log_validation": False},
}

ESCALATION_PATHS = {
    "iam:CreatePolicyVersion": ("CRITICAL", "Can replace any IAM policy → admin"),
    "iam:PassRole + lambda:*": ("HIGH", "Create Lambda with privileged role → RCE as that role"),
}


def collect_cloud_inventory(region: str = "us-east-1") -> dict:
    print("  [Phase 1] Collecting cloud inventory...")
    return {"region": region, "inventory": MOCK_INVENTORY, "collected_at": datetime.now(timezone.utc).isoformat()}


def scan_for_secrets(directory: str = ".") -> dict:
    print("  [Phase 1] Scanning for secrets...")
    return {
        "directory": directory,
        "findings": [
            {"file": ".env.backup", "pattern": "AKIA*", "type": "AWS Access Key", "severity": "CRITICAL"},
            {"file": "config/database.yml", "pattern": "password:", "type": "Hardcoded Password", "severity": "HIGH"},
        ],
        "total": 2,
    }


def analyze_iam_escalation(iam_data: dict) -> dict:
    print("  [Phase 2] Analyzing IAM escalation paths...")
    findings = []
    for policy in iam_data.get("policies", []):
        actions = policy.get("actions", [])
        action_set = set(a.lower() for a in actions)
        # Check CreatePolicyVersion
        if "iam:createpolicyversion" in action_set:
            findings.append({
                "policy": policy["name"],
                "path": "CreatePolicyVersion",
                "severity": "CRITICAL",
                "description": "Can replace any IAM policy → instant admin escalation",
            })
        # Check PassRole + Lambda
        if "iam:passrole" in action_set and any("lambda" in a for a in action_set):
            findings.append({
                "policy": policy["name"],
                "path": "PassRole + Lambda",
                "severity": "HIGH",
                "description": "Can create Lambda with admin role → code execution as admin",
            })
    return {"escalation_paths": findings, "count": len(findings)}


def analyze_network_exposure(network_data: dict) -> dict:
    print("  [Phase 2] Analyzing network exposure...")
    findings = []
    for sg in network_data.get("security_groups", []):
        for rule in sg.get("open_rules", []):
            if rule.get("cidr") == "0.0.0.0/0":
                port = rule.get("port")
                sev = "CRITICAL" if port == 22 else "HIGH" if port in [3389, 3306, 5432] else "MEDIUM"
                findings.append({
                    "sg": sg["id"],
                    "port": port,
                    "severity": sev,
                    "description": f"Port {port} exposed to entire internet",
                })
    return {"network_findings": findings, "count": len(findings)}


def generate_risk_ratings(findings: list) -> dict:
    print("  [Phase 3] Rating findings...")
    rated = []
    for f in findings:
        sev = f.get("severity", "MEDIUM")
        score = {"CRITICAL": 25, "HIGH": 15, "MEDIUM": 8, "LOW": 3, "INFO": 1}.get(sev, 8)
        rated.append({**f, "risk_score": score, "risk_level": sev})
    rated.sort(key=lambda x: x["risk_score"], reverse=True)
    return {
        "rated_findings": rated,
        "critical": len([r for r in rated if r["risk_level"] == "CRITICAL"]),
        "high": len([r for r in rated if r["risk_level"] == "HIGH"]),
        "medium": len([r for r in rated if r["risk_level"] == "MEDIUM"]),
    }


def write_audit_report(organization: str, rated_findings: list, output_path: str = None) -> dict:
    print("  [Phase 3] Writing report...")
    report = {
        "organization": organization,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "findings": rated_findings,
        "summary": {
            "total": len(rated_findings),
            "critical": len([f for f in rated_findings if f.get("risk_level") == "CRITICAL"]),
            "high": len([f for f in rated_findings if f.get("risk_level") == "HIGH"]),
        },
    }
    path = output_path or f"audit-report-{datetime.now().strftime('%Y%m%d')}.json"
    with open(path, "w") as f:
        json.dump(report, f, indent=2, default=str)
    return {"written": path, "findings_count": len(rated_findings)}


def send_summary_alert(summary: str, critical_count: int, high_count: int, webhook_url: str = None) -> dict:
    msg = f"Audit complete. CRITICAL: {critical_count}, HIGH: {high_count}\n{summary}"
    if webhook_url:
        try:
            import requests
            r = requests.post(webhook_url, json={"text": msg}, timeout=5)
            return {"sent": True, "status": r.status_code}
        except Exception as e:
            return {"sent": False, "error": str(e)}
    print(f"\n  📣 AUDIT SUMMARY ALERT:\n  {msg}")
    return {"sent": True, "channel": "console"}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "collect_cloud_inventory": collect_cloud_inventory,
        "scan_for_secrets": scan_for_secrets,
        "analyze_iam_escalation": analyze_iam_escalation,
        "analyze_network_exposure": analyze_network_exposure,
        "generate_risk_ratings": generate_risk_ratings,
        "write_audit_report": write_audit_report,
        "send_summary_alert": send_summary_alert,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_full_pipeline(organization: str, scope: str = "aws", alert_webhook: str = None):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a lead security auditor running a full automated audit pipeline for {organization}.\n\n"
                "Execute the full pipeline in order:\n\n"
                "PHASE 1 — COLLECT:\n"
                "  1. Collect the cloud inventory (all AWS resources)\n"
                "  2. Scan for hardcoded secrets\n\n"
                "PHASE 2 — ANALYZE:\n"
                "  3. Analyze IAM escalation paths using the IAM data from the inventory\n"
                "  4. Analyze network exposure using the security group data\n\n"
                "PHASE 3 — REPORT:\n"
                "  5. Compile all findings (from secrets scan, IAM analysis, network analysis)\n"
                "  6. Generate risk ratings for all findings\n"
                "  7. Write the final audit report\n\n"
                "PHASE 4 — ALERT:\n"
                "  8. Send a summary alert with the finding counts\n\n"
                f"Alert webhook: {alert_webhook or 'none — print to console'}\n"
                "After completing all phases, provide a prioritized remediation roadmap."
            ),
        }
    ]

    print(f"\nStarting full audit pipeline for {organization}...\n")
    print("=" * 60)

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            tools=PIPELINE_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}")
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n" + "=" * 60)
                    print("── FULL PIPELINE AUDIT REPORT ─────────────────────────────")
                    print("=" * 60)
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--org", default="Acme Corp", help="Organization name for the report")
    parser.add_argument("--scope", default="aws", help="Audit scope")
    parser.add_argument("--alert-webhook", default=None, help="Slack/PagerDuty webhook for alerts")
    parser.add_argument("--dry-run", action="store_true", help="Use mock data (no AWS credentials needed)")
    args = parser.parse_args()
    run_full_pipeline(organization=args.org, scope=args.scope, alert_webhook=args.alert_webhook)
