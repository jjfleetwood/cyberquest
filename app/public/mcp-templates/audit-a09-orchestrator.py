"""
audit-a09-orchestrator.py
MCP Server: Multi-Agent Audit Orchestrator — Specialist Sub-Agents with Claude Coordination
Lesson: How to build a multi-agent system where a coordinator delegates to specialist agents.

SETUP:
  pip install anthropic

USAGE:
  python audit-a09-orchestrator.py --scope full
  python audit-a09-orchestrator.py --scope iam,network

HOW IT WORKS:
  This is the most important architectural pattern in agentic systems:

  COORDINATOR AGENT (Claude Sonnet): Receives the high-level audit objective.
    Breaks it into specialist sub-tasks.
    Delegates to specialist agents via the "run_specialist_agent" tool.
    Synthesizes the results into a final report.

  SPECIALIST AGENTS (Claude Haiku): Each expert handles one domain:
    - IAM specialist: privilege analysis, MFA gaps, key rotation
    - Network specialist: security groups, VPC config, exposed ports
    - Data specialist: encryption, backup, retention
    - Logging specialist: CloudTrail, flow logs, SIEM integration

  This pattern scales to any audit scope — just add more specialist agents.

REAL USE: The coordinator can run specialist agents in parallel (threads or async)
for faster audit completion across large environments.
"""

import json
import argparse
import anthropic

# Each specialist agent has its own system prompt and tool set.
# In this example, specialists use mock tools to simulate their domain.

SPECIALIST_CONFIGS = {
    "iam": {
        "name": "IAM Specialist",
        "system_prompt": (
            "You are an IAM security specialist. Analyze the provided IAM data and produce "
            "a concise finding report with: (1) users without MFA, (2) overprivileged policies, "
            "(3) stale access keys, (4) privilege escalation risks. Be specific and include "
            "the affected resource ARN or username in each finding."
        ),
        "mock_data": {
            "users": [
                {"username": "admin", "mfa": True, "key_age_days": 45, "policies": ["AdministratorAccess"]},
                {"username": "ci-deploy", "mfa": False, "key_age_days": 180, "policies": ["DeveloperAccess"]},
                {"username": "readonly-api", "mfa": False, "key_age_days": 90, "policies": ["ReadOnlyAccess"]},
            ],
            "policies": [
                {"name": "DeveloperAccess", "allows_iam_write": True, "allows_passrole": True},
            ],
        },
    },
    "network": {
        "name": "Network Specialist",
        "system_prompt": (
            "You are a network security specialist. Analyze the provided security group and VPC data "
            "and produce findings: (1) security groups with 0.0.0.0/0 access, (2) dangerous open ports "
            "(22, 3389, 5432, 3306), (3) VPC flow logging status. Be specific."
        ),
        "mock_data": {
            "security_groups": [
                {"id": "sg-web", "open_rules": [{"port": 80, "cidr": "0.0.0.0/0"}, {"port": 443, "cidr": "0.0.0.0/0"}, {"port": 22, "cidr": "0.0.0.0/0"}]},
                {"id": "sg-db", "open_rules": [{"port": 5432, "cidr": "10.0.0.0/8"}]},
            ],
            "vpc_flow_logs": {"enabled": False, "vpcs_without_logs": ["vpc-main-prod"]},
        },
    },
    "data": {
        "name": "Data Protection Specialist",
        "system_prompt": (
            "You are a data protection specialist focused on encryption, backup, and data retention. "
            "Analyze the provided storage configuration and produce findings on: (1) unencrypted buckets "
            "or databases, (2) publicly accessible storage, (3) missing backups, (4) retention gaps."
        ),
        "mock_data": {
            "s3_buckets": [
                {"name": "data-lake-prod", "encrypted": False, "public": True, "versioning": False},
                {"name": "audit-logs", "encrypted": True, "public": False, "versioning": True},
            ],
            "rds": [
                {"id": "prod-db", "encrypted": False, "backup_days": 0, "publicly_accessible": True},
            ],
        },
    },
    "logging": {
        "name": "Logging & Monitoring Specialist",
        "system_prompt": (
            "You are a logging and monitoring specialist. Analyze the provided logging configuration "
            "and produce findings on: (1) CloudTrail gaps, (2) log tampering risks, (3) retention "
            "deficiencies, (4) alerting coverage. Map each finding to a SOC 2 or CIS control."
        ),
        "mock_data": {
            "cloudtrail": {
                "enabled": True,
                "multi_region": False,
                "log_validation": False,
                "retention_days": 90,
            },
            "alerting": {
                "root_login_alerts": False,
                "iam_change_alerts": True,
                "failed_login_alerts": False,
            },
        },
    },
}

# Coordinator tools
COORDINATOR_TOOLS = [
    {
        "name": "run_specialist_agent",
        "description": (
            "Runs a specialist audit agent for a specific domain. "
            "Returns the specialist's findings as a structured report."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "domain": {
                    "type": "string",
                    "enum": ["iam", "network", "data", "logging"],
                    "description": "The audit domain to delegate to a specialist.",
                },
                "specific_focus": {
                    "type": "string",
                    "description": "Optional: specific question or area to focus the specialist on.",
                },
            },
            "required": ["domain"],
        },
    },
    {
        "name": "compile_findings",
        "description": (
            "Compiles findings from multiple specialist agents into a unified risk-rated report. "
            "Returns a structured summary with CRITICAL → HIGH → MEDIUM findings."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "findings_by_domain": {
                    "type": "object",
                    "description": "Dict of domain → findings text from each specialist.",
                },
            },
            "required": ["findings_by_domain"],
        },
    },
]


def run_specialist_agent(domain: str, specific_focus: str = None) -> dict:
    """Run a specialist sub-agent for a specific audit domain."""
    config = SPECIALIST_CONFIGS.get(domain)
    if not config:
        return {"error": f"Unknown domain: {domain}"}

    client = anthropic.Anthropic()

    prompt = f"Analyze this {domain.upper()} audit data and produce your specialist findings:\n\n"
    prompt += json.dumps(config["mock_data"], indent=2)
    if specific_focus:
        prompt += f"\n\nSpecifically focus on: {specific_focus}"

    print(f"    Running {config['name']}...")

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=config["system_prompt"],
        messages=[{"role": "user", "content": prompt}],
    )

    findings_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            findings_text = block.text
            break

    return {
        "domain": domain,
        "specialist": config["name"],
        "findings": findings_text,
    }


def compile_findings(findings_by_domain: dict) -> dict:
    """Simple aggregation — in production Claude would do deeper synthesis."""
    total_domains = len(findings_by_domain)
    return {
        "domains_reviewed": total_domains,
        "findings_by_domain": findings_by_domain,
        "summary": f"Audit complete across {total_domains} domains. See coordinator report for prioritized findings.",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "run_specialist_agent":
        result = run_specialist_agent(**tool_input)
    elif tool_name == "compile_findings":
        result = compile_findings(**tool_input)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_orchestrated_audit(scope: str = "full"):
    client = anthropic.Anthropic()

    domains = ["iam", "network", "data", "logging"] if scope == "full" else scope.split(",")

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a lead security auditor coordinating a multi-domain cloud security audit.\n\n"
                f"Audit scope: {', '.join(domains)}\n\n"
                "1. Delegate each domain to the appropriate specialist agent using run_specialist_agent.\n"
                "2. Collect all specialist findings.\n"
                "3. Compile the findings into a unified report.\n"
                "4. Produce a final executive summary with:\n"
                "   - Overall risk rating (CRITICAL/HIGH/MEDIUM/LOW)\n"
                "   - Top 5 findings that require immediate remediation\n"
                "   - Estimated remediation effort for each\n"
                "   - 30/60/90 day remediation roadmap"
            ),
        }
    ]

    print(f"Starting orchestrated audit (scope: {scope})...\n")

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",  # Coordinator uses Sonnet for reasoning
            max_tokens=4096,
            tools=COORDINATOR_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → Coordinator calling: {block.name}({block.input.get('domain', '')})")
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
                    print("\n── ORCHESTRATED AUDIT REPORT ──────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scope", default="full",
                        help="Audit scope: 'full' or comma-separated domains (iam,network,data,logging)")
    args = parser.parse_args()
    run_orchestrated_audit(args.scope)
