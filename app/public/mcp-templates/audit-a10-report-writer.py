"""
audit-a10-report-writer.py
MCP Server: AI Audit Report Generator — Findings, Risk Ratings, and Remediation Drafting
Lesson: Using Claude to transform raw audit data into professional audit reports.

SETUP:
  pip install anthropic

USAGE:
  python audit-a10-report-writer.py --input findings.json --format executive
  python audit-a10-report-writer.py --input findings.json --format technical
  python audit-a10-report-writer.py --input findings.json --format both

HOW IT WORKS:
  1. Takes raw audit findings (from any prior audit script) as JSON input.
  2. Claude applies professional audit report structure: CVSS scoring, risk matrix,
     finding narratives, management recommendations, and technical remediation steps.
  3. Outputs two report formats:
     - Executive Summary: board/C-suite language, business impact, risk matrix
     - Technical Report: auditor-grade detail with evidence references, control mappings

REAL USE: Chain this after audit-a09-orchestrator.py to automatically generate
the final deliverable from any audit run.
"""

import json
import argparse
from datetime import datetime, timezone
import anthropic

REPORT_TOOLS = [
    {
        "name": "rate_finding_risk",
        "description": (
            "Applies a standardized risk rating to an audit finding using CVSS-style methodology. "
            "Returns Likelihood (1-5), Impact (1-5), Risk Score (1-25), and Risk Level (CRITICAL/HIGH/MEDIUM/LOW/INFO)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "finding_title": {"type": "string"},
                "finding_description": {"type": "string"},
                "affected_systems": {"type": "array", "items": {"type": "string"}},
                "data_sensitivity": {
                    "type": "string",
                    "enum": ["public", "internal", "confidential", "restricted"],
                },
            },
            "required": ["finding_title", "finding_description", "affected_systems", "data_sensitivity"],
        },
    },
    {
        "name": "generate_remediation_steps",
        "description": (
            "Generates specific, actionable remediation steps for an audit finding. "
            "Returns immediate actions (0-30 days), short-term fixes (31-90 days), and long-term controls."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "finding_title": {"type": "string"},
                "technology": {"type": "string", "description": "e.g. AWS S3, Terraform, Python"},
                "risk_level": {"type": "string"},
            },
            "required": ["finding_title", "technology", "risk_level"],
        },
    },
    {
        "name": "map_to_framework",
        "description": "Maps an audit finding to relevant compliance framework controls (SOC 2, ISO 27001, NIST CSF, CIS).",
        "input_schema": {
            "type": "object",
            "properties": {
                "finding_title": {"type": "string"},
                "finding_category": {
                    "type": "string",
                    "enum": ["access_control", "encryption", "logging", "backup", "vulnerability_management", "network"],
                },
            },
            "required": ["finding_title", "finding_category"],
        },
    },
    {
        "name": "format_executive_report",
        "description": "Formats processed findings into an executive summary report (board-level language).",
        "input_schema": {
            "type": "object",
            "properties": {
                "organization": {"type": "string"},
                "audit_date": {"type": "string"},
                "findings": {"type": "array", "items": {"type": "object"}},
                "scope": {"type": "string"},
            },
            "required": ["organization", "audit_date", "findings", "scope"],
        },
    },
    {
        "name": "format_technical_report",
        "description": "Formats processed findings into a detailed technical audit report for the security team.",
        "input_schema": {
            "type": "object",
            "properties": {
                "findings": {"type": "array", "items": {"type": "object"}},
                "evidence_references": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["findings"],
        },
    },
]

FRAMEWORK_MAPPINGS = {
    "access_control": {
        "SOC 2": ["CC6.1", "CC6.2", "CC6.3"],
        "ISO 27001": ["A.9.1.1", "A.9.2.1", "A.9.4.2"],
        "NIST CSF": ["PR.AC-1", "PR.AC-4"],
        "CIS": ["CIS 1.1 through 1.22 (Identity)"],
    },
    "encryption": {
        "SOC 2": ["CC6.7", "CC6.1"],
        "ISO 27001": ["A.10.1.1"],
        "NIST CSF": ["PR.DS-1", "PR.DS-2"],
        "CIS": ["CIS 2.1.1 (S3)", "CIS 2.3.1 (RDS)"],
    },
    "logging": {
        "SOC 2": ["CC7.2", "CC7.3"],
        "ISO 27001": ["A.12.4.1", "A.12.4.2"],
        "NIST CSF": ["DE.CM-1", "DE.CM-3", "RS.AN-1"],
        "CIS": ["CIS 3.1 through 3.14 (Logging)"],
    },
    "backup": {
        "SOC 2": ["A1.2", "A1.3"],
        "ISO 27001": ["A.12.3.1"],
        "NIST CSF": ["PR.IP-4", "RC.RP-1"],
        "CIS": ["CIS 10.1 (Data Recovery)"],
    },
    "vulnerability_management": {
        "SOC 2": ["CC7.1"],
        "ISO 27001": ["A.12.6.1"],
        "NIST CSF": ["ID.RA-1", "RS.MI-3"],
        "CIS": ["CIS 7.1 through 7.7 (Vulnerability Management)"],
    },
    "network": {
        "SOC 2": ["CC6.6", "CC6.1"],
        "ISO 27001": ["A.13.1.1", "A.13.1.3"],
        "NIST CSF": ["PR.AC-5", "DE.CM-1"],
        "CIS": ["CIS 4.1 through 4.6 (Networking)"],
    },
}

RISK_MATRIX = {
    (5, 5): ("CRITICAL", 25), (5, 4): ("CRITICAL", 20), (4, 5): ("CRITICAL", 20),
    (5, 3): ("HIGH", 15), (3, 5): ("HIGH", 15), (4, 4): ("HIGH", 16),
    (5, 2): ("HIGH", 10), (2, 5): ("HIGH", 10), (4, 3): ("MEDIUM", 12), (3, 4): ("MEDIUM", 12),
    (4, 2): ("MEDIUM", 8), (2, 4): ("MEDIUM", 8), (3, 3): ("MEDIUM", 9),
    (5, 1): ("MEDIUM", 5), (1, 5): ("MEDIUM", 5),
    (4, 1): ("LOW", 4), (1, 4): ("LOW", 4), (3, 2): ("LOW", 6), (2, 3): ("LOW", 6),
    (3, 1): ("LOW", 3), (1, 3): ("LOW", 3), (2, 2): ("LOW", 4),
    (2, 1): ("INFO", 2), (1, 2): ("INFO", 2), (1, 1): ("INFO", 1),
}


def rate_finding_risk(finding_title, finding_description, affected_systems, data_sensitivity):
    sensitivity_impact = {"public": 1, "internal": 2, "confidential": 4, "restricted": 5}
    base_impact = sensitivity_impact.get(data_sensitivity, 3)
    keywords_high = ["public", "exposed", "no auth", "remote", "unauthenticated", "admin"]
    likelihood = 4 if any(k in finding_description.lower() for k in keywords_high) else 2
    risk_level, score = RISK_MATRIX.get((likelihood, base_impact), ("MEDIUM", 6))
    return {
        "finding": finding_title,
        "likelihood": likelihood,
        "impact": base_impact,
        "risk_score": score,
        "risk_level": risk_level,
        "affected_systems": affected_systems,
    }


def generate_remediation_steps(finding_title, technology, risk_level):
    urgency = {"CRITICAL": 1, "HIGH": 7, "MEDIUM": 30, "LOW": 90}.get(risk_level, 30)
    return {
        "finding": finding_title,
        "immediate_actions": [
            f"Assign owner and track in ticketing system (priority: {risk_level})",
            f"Implement temporary compensating control within {urgency} day(s)",
            "Notify affected stakeholders if data exposure is possible",
        ],
        "short_term_fix": [
            f"Apply vendor-recommended configuration fix for {technology}",
            "Verify fix in staging environment before production",
            "Run validation scan to confirm remediation",
        ],
        "long_term_controls": [
            "Add control to IaC templates to prevent recurrence",
            "Add automated detection to CI/CD pipeline",
            "Schedule periodic review as part of continuous monitoring program",
        ],
    }


def map_to_framework(finding_title, finding_category):
    mappings = FRAMEWORK_MAPPINGS.get(finding_category, {})
    return {"finding": finding_title, "category": finding_category, "framework_controls": mappings}


def format_executive_report(organization, audit_date, findings, scope):
    critical = [f for f in findings if f.get("risk_level") == "CRITICAL"]
    high = [f for f in findings if f.get("risk_level") == "HIGH"]
    medium = [f for f in findings if f.get("risk_level") == "MEDIUM"]
    overall = "CRITICAL" if critical else "HIGH" if high else "MEDIUM" if medium else "LOW"
    return {
        "report_type": "Executive Summary",
        "organization": organization,
        "audit_date": audit_date,
        "scope": scope,
        "overall_risk": overall,
        "finding_count": {"CRITICAL": len(critical), "HIGH": len(high), "MEDIUM": len(medium)},
        "top_risks": [f["finding"] for f in (critical + high)[:3]],
        "recommendation": f"Immediate remediation required for {len(critical)} critical and {len(high)} high findings.",
    }


def format_technical_report(findings, evidence_references=None):
    return {
        "report_type": "Technical Audit Report",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "findings": findings,
        "evidence_references": evidence_references or [],
        "total_findings": len(findings),
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "rate_finding_risk": rate_finding_risk,
        "generate_remediation_steps": generate_remediation_steps,
        "map_to_framework": map_to_framework,
        "format_executive_report": format_executive_report,
        "format_technical_report": format_technical_report,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


SAMPLE_RAW_FINDINGS = [
    {"title": "S3 bucket publicly accessible", "description": "data-lake-prod bucket has ACL=public-read", "systems": ["data-lake-prod"], "category": "access_control"},
    {"title": "RDS instance not encrypted", "description": "prod-db has storage_encrypted=false", "systems": ["prod-db"], "category": "encryption"},
    {"title": "SSH open to 0.0.0.0/0", "description": "sg-web allows port 22 from any IP remotely", "systems": ["sg-web"], "category": "network"},
    {"title": "CloudTrail log validation disabled", "description": "Log tampering possible", "systems": ["management-events trail"], "category": "logging"},
]


def run_report_generation(input_file: str = None, report_format: str = "both"):
    client = anthropic.Anthropic()

    if input_file:
        with open(input_file) as f:
            raw_findings = json.load(f)
    else:
        raw_findings = SAMPLE_RAW_FINDINGS
        print("No input file provided — using sample findings.\n")

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a senior security auditor. Process these raw audit findings and generate a "
                f"{'professional executive summary and technical report' if report_format == 'both' else report_format + ' report'}.\n\n"
                f"Raw findings:\n{json.dumps(raw_findings, indent=2)}\n\n"
                "For each finding:\n"
                "1. Rate the risk (use rate_finding_risk)\n"
                "2. Map to compliance frameworks (use map_to_framework)\n"
                "3. Generate remediation steps (use generate_remediation_steps)\n"
                "Then format the final report using the appropriate format tool(s).\n"
                "Organization: Acme Corp | Audit date: today | Scope: AWS Cloud Infrastructure"
            ),
        }
    ]

    print("Generating audit report...\n")

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            tools=REPORT_TOOLS,
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
                    print("\n── GENERATED AUDIT REPORT ─────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", help="JSON file with raw findings (optional — uses sample if omitted)")
    parser.add_argument("--format", default="both", choices=["executive", "technical", "both"])
    args = parser.parse_args()
    run_report_generation(input_file=args.input, report_format=args.format)
