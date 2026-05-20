"""
audit-a08-evidence-collector.py
MCP Server: Automated SOC 2 Evidence Collection and Artifact Packaging
Lesson: Using Claude to orchestrate evidence collection across systems and package audit artifacts.

SETUP:
  pip install anthropic boto3 requests

USAGE:
  python audit-a08-evidence-collector.py --output-dir ./evidence-2026-Q2

HOW IT WORKS:
  1. Claude is given tools to collect evidence across AWS, GitHub, and local systems.
  2. Claude understands SOC 2 control categories (Security, Availability, Confidentiality, etc.)
  3. Claude maps collected artifacts to specific SOC 2 criteria (CC6.1, CC6.7, A1.2, etc.)
  4. All evidence is written to a structured output directory ready for auditor review.

SOC 2 TYPE II requires continuous evidence collection — this script is the foundation for
an automated evidence pipeline that runs on a schedule (cron job or Lambda).
"""

import json
import os
import argparse
from datetime import datetime, timezone
import anthropic

EVIDENCE_TOOLS = [
    {
        "name": "collect_iam_evidence",
        "description": (
            "Collects IAM evidence for SOC 2 CC6.1 (logical access controls): "
            "user list, MFA status, access key rotation, privilege levels."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_logging_evidence",
        "description": (
            "Collects logging evidence for SOC 2 CC7.2 (monitoring): "
            "CloudTrail status, log retention settings, log integrity verification."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_encryption_evidence",
        "description": (
            "Collects encryption evidence for SOC 2 CC6.7 (data protection): "
            "S3 bucket encryption status, RDS encryption, KMS key rotation."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_backup_evidence",
        "description": (
            "Collects backup and recovery evidence for SOC 2 A1.2 (availability): "
            "RDS backup retention, S3 versioning, recovery point objectives."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_vulnerability_evidence",
        "description": (
            "Collects vulnerability management evidence for SOC 2 CC7.1: "
            "recent scan results, patch status, open findings age."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "write_evidence_artifact",
        "description": "Writes a collected evidence artifact to the output directory as a timestamped JSON file.",
        "input_schema": {
            "type": "object",
            "properties": {
                "control_id": {"type": "string", "description": "SOC 2 control ID e.g. CC6.1"},
                "control_name": {"type": "string"},
                "evidence_data": {"type": "object", "description": "The collected evidence data."},
                "output_dir": {"type": "string"},
                "status": {
                    "type": "string",
                    "enum": ["PASS", "FAIL", "PARTIAL"],
                    "description": "Whether the control is satisfied by the evidence.",
                },
                "notes": {"type": "string", "description": "Auditor notes on the evidence."},
            },
            "required": ["control_id", "control_name", "evidence_data", "output_dir", "status"],
        },
    },
]


def collect_iam_evidence() -> dict:
    # In production: call boto3 iam.list_users, list_mfa_devices, list_access_keys
    return {
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "users": [
            {"username": "admin", "mfa_enabled": True, "access_keys": 1, "key_age_days": 45,
             "last_login_days": 1, "privilege_level": "admin"},
            {"username": "ci-deploy", "mfa_enabled": False, "access_keys": 1, "key_age_days": 180,
             "last_login_days": 0, "privilege_level": "developer"},
            {"username": "legacy-user", "mfa_enabled": False, "access_keys": 2, "key_age_days": 365,
             "last_login_days": 45, "privilege_level": "read-only"},
        ],
        "findings": [
            "ci-deploy: MFA not enabled — CC6.1 gap",
            "legacy-user: MFA not enabled, access keys >90 days old — CC6.1 gap",
            "legacy-user: 2 access keys (should be max 1 active) — CC6.1 gap",
        ],
        "control_id": "CC6.1",
    }


def collect_logging_evidence() -> dict:
    return {
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "cloudtrail": {
            "enabled": True,
            "multi_region": False,
            "log_file_validation": False,
            "s3_bucket": "audit-logs-prod",
            "retention_days": 90,
        },
        "findings": [
            "CloudTrail: multi-region disabled — events in non-primary regions not captured",
            "CloudTrail: log file validation disabled — logs could be tampered without detection",
            "Retention 90 days — SOC 2 recommends minimum 1 year for type II",
        ],
        "control_id": "CC7.2",
    }


def collect_encryption_evidence() -> dict:
    return {
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "s3_buckets": [
            {"name": "data-lake-prod", "encrypted": False, "public": True},
            {"name": "audit-logs-prod", "encrypted": True, "public": False},
            {"name": "backups", "encrypted": True, "public": False},
        ],
        "rds_instances": [
            {"id": "prod-db", "encrypted": False, "engine": "postgres"},
        ],
        "kms_keys": [
            {"alias": "alias/prod-key", "rotation_enabled": True, "age_days": 180},
        ],
        "findings": [
            "data-lake-prod: no encryption at rest — CC6.7 gap",
            "data-lake-prod: publicly accessible — CC6.1 gap (duplicate with IAM evidence)",
            "prod-db: RDS instance not encrypted — CC6.7 gap",
        ],
        "control_id": "CC6.7",
    }


def collect_backup_evidence() -> dict:
    return {
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "rds_backups": [
            {"instance": "prod-db", "retention_days": 0, "automated_backups": False},
        ],
        "s3_versioning": [
            {"bucket": "data-lake-prod", "versioning": False},
            {"bucket": "backups", "versioning": True},
        ],
        "rpo_sla_hours": 24,
        "actual_rpo_hours": "UNKNOWN — no backup configured for prod-db",
        "findings": [
            "prod-db: automated backups disabled — A1.2 gap — data loss risk",
            "data-lake-prod: S3 versioning disabled — no object recovery — A1.2 gap",
        ],
        "control_id": "A1.2",
    }


def collect_vulnerability_evidence() -> dict:
    return {
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "last_scan_date": "2026-05-01",
        "scan_tool": "AWS Inspector",
        "open_findings": [
            {"severity": "CRITICAL", "count": 2, "oldest_days": 45},
            {"severity": "HIGH", "count": 8, "oldest_days": 30},
            {"severity": "MEDIUM", "count": 23, "oldest_days": 14},
        ],
        "sla_compliance": {
            "critical": "FAIL — 2 critical findings open > 30 days (SLA: 30 days)",
            "high": "PASS — all high findings < 60 days",
        },
        "findings": [
            "2 CRITICAL vulnerabilities open 45 days — exceed 30-day SLA — CC7.1 gap",
        ],
        "control_id": "CC7.1",
    }


def write_evidence_artifact(control_id: str, control_name: str, evidence_data: dict,
                             output_dir: str, status: str, notes: str = "") -> dict:
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    filename = f"{control_id.replace('.', '-')}-{timestamp}.json"
    filepath = os.path.join(output_dir, filename)
    artifact = {
        "control_id": control_id,
        "control_name": control_name,
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "status": status,
        "notes": notes,
        "evidence": evidence_data,
    }
    with open(filepath, "w") as f:
        json.dump(artifact, f, indent=2, default=str)
    return {"written": filepath, "control_id": control_id, "status": status}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "collect_iam_evidence": collect_iam_evidence,
        "collect_logging_evidence": collect_logging_evidence,
        "collect_encryption_evidence": collect_encryption_evidence,
        "collect_backup_evidence": collect_backup_evidence,
        "collect_vulnerability_evidence": collect_vulnerability_evidence,
        "write_evidence_artifact": write_evidence_artifact,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_evidence_collection(output_dir: str):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a SOC 2 auditor. Collect evidence for a Type II audit and write artifacts to: {output_dir}\n\n"
                "1. Collect evidence for each control category: IAM (CC6.1), Logging (CC7.2), "
                "   Encryption (CC6.7), Backups (A1.2), Vulnerability Management (CC7.1).\n"
                "2. For each control, determine if the evidence shows PASS, FAIL, or PARTIAL compliance.\n"
                "3. Write each evidence artifact to the output directory.\n"
                "4. Produce a final SOC 2 readiness summary: which controls are ready for auditor review "
                "   and which have gaps that must be remediated before the audit window."
            ),
        }
    ]

    print(f"Starting SOC 2 evidence collection → {output_dir}\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=EVIDENCE_TOOLS,
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
                    print("\n── SOC 2 READINESS REPORT ─────────────────────────────")
                    print(block.text)
            break

    print(f"\nEvidence artifacts written to: {output_dir}/")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default="./evidence-collection", help="Output directory for artifacts")
    args = parser.parse_args()
    run_evidence_collection(args.output_dir)
