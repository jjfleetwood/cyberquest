"""
audit-cm11-compliance.py
MCP Server: Continuous Compliance Engine — Real-Time NIST SP 800-53 Control Verification
Lesson: Shifting from point-in-time audits to continuous automated compliance verification.

BACKGROUND — FTC vs. Drizly & CEO James Cory Rellas (2023):
  Drizly suffered a breach in 2018 exposing 2.5M customer records — but the FTC didn't act
  until 2022. The settlement was unprecedented: the CEO personally was ordered to implement
  an information security program at ANY future company he leads for the next 20 years.
  Why? Because Drizly had been warned about the security gaps years before the breach
  and failed to remediate. Continuous compliance monitoring would have created an audit trail
  proving either that controls were implemented — or that executives ignored known failures.
  Personal liability follows documented negligence, not ignorance.

CONTINUOUS COMPLIANCE vs. POINT-IN-TIME AUDIT:
  Traditional: annual pentest + SOC 2 audit → snapshot of one day per year.
  Continuous: automated control verification running daily/hourly → 365-day evidence trail.
  Frameworks: NIST SP 800-53 (federal), SOC 2 Type II (commercial), ISO 27001, CIS Controls.
  Key insight: continuous evidence means auditors see the average, not the prepared-for day.

SETUP:
  pip install anthropic

USAGE:
  python audit-cm11-compliance.py
  python audit-cm11-compliance.py --framework nist
  python audit-cm11-compliance.py --framework soc2
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

COMPLIANCE_TOOLS = [
    {
        "name": "verify_control",
        "description": (
            "Verifies a specific NIST SP 800-53 or SOC 2 control in real-time. "
            "Queries the actual system state and returns PASS/FAIL with evidence."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "control_id": {"type": "string", "description": "e.g. 'AC-2', 'AC-6', 'AU-2', 'SI-2', 'CP-9'"},
                "control_name": {"type": "string"},
                "framework": {"type": "string", "enum": ["nist_800_53", "soc2", "iso27001", "cis"], "default": "nist_800_53"},
            },
            "required": ["control_id"],
        },
    },
    {
        "name": "run_compliance_scan",
        "description": (
            "Runs a full compliance scan across all controls in a framework. "
            "Returns pass/fail/warning for each control with evidence artifacts."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "framework": {"type": "string", "enum": ["nist_800_53", "soc2", "iso27001", "cis"], "default": "nist_800_53"},
                "control_families": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Filter by control family e.g. ['AC', 'AU', 'SI', 'CP']",
                },
            },
            "required": [],
        },
    },
    {
        "name": "detect_compliance_drift",
        "description": (
            "Compares current control state against the baseline from the last audit. "
            "Identifies controls that have drifted from PASS to FAIL since last verification."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "baseline_date": {"type": "string", "description": "ISO date of last audit baseline."},
                "framework": {"type": "string", "default": "nist_800_53"},
            },
            "required": [],
        },
    },
    {
        "name": "generate_evidence_package",
        "description": (
            "Generates an auditor-ready evidence package for a control: screenshots, "
            "API call logs, configuration exports, timestamps. Used for SOC 2 / ISO 27001 audits."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "control_id": {"type": "string"},
                "evidence_period_days": {"type": "integer", "default": 90},
            },
            "required": ["control_id"],
        },
    },
    {
        "name": "calculate_compliance_score",
        "description": (
            "Calculates the overall compliance posture score (0-100%) by framework. "
            "Weights critical controls (MFA, encryption, logging) higher than administrative ones."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "scan_results": {"type": "object"},
                "framework": {"type": "string", "default": "nist_800_53"},
            },
            "required": ["scan_results"],
        },
    },
    {
        "name": "generate_remediation_plan",
        "description": "Generates a prioritized remediation plan for all failed controls with owner, deadline, and specific fix steps.",
        "input_schema": {
            "type": "object",
            "properties": {
                "failed_controls": {"type": "array", "items": {"type": "object"}},
                "risk_tolerance": {"type": "string", "enum": ["low", "medium", "high"], "default": "medium"},
            },
            "required": ["failed_controls"],
        },
    },
]

CONTROL_STATES = {
    "AC-2": {"name": "Account Management", "status": "PASS", "evidence": "IAM user lifecycle: 142 active users, automated deprovisioning on HR termination within 24h. Last audit: 0 orphaned accounts."},
    "AC-6": {"name": "Least Privilege", "status": "FAIL", "evidence": "3 IAM roles with s3:* policy. WebAppRole has iam:PassRole + sts:AssumeRole (privilege escalation path). Violates least-privilege.", "severity": "HIGH"},
    "AC-17": {"name": "Remote Access", "status": "WARNING", "evidence": "VPN deployed but split-tunneling enabled on 23% of endpoints. Zero Trust remote access not implemented."},
    "AU-2": {"name": "Event Logging", "status": "PASS", "evidence": "CloudTrail enabled all regions, S3 access logs active, VPC flow logs enabled. Log retention: 1 year."},
    "AU-9": {"name": "Audit Log Protection", "status": "FAIL", "evidence": "CloudTrail logs stored in S3 bucket without Object Lock. Logs can be deleted by anyone with s3:DeleteObject.", "severity": "HIGH"},
    "CP-9": {"name": "Information System Backup", "status": "PASS", "evidence": "RDS automated backups: 7-day retention. S3 versioning enabled. Last restore test: 2026-04-15 — successful."},
    "IA-2": {"name": "Multi-Factor Authentication", "status": "WARNING", "evidence": "MFA enforced for 94% of users. 6 service accounts lack MFA. IAM console access without MFA: 2 accounts."},
    "IA-5": {"name": "Authenticator Management", "status": "FAIL", "evidence": "Password policy: 8 char minimum, no complexity requirement. 47 users with passwords >180 days old. No FIDO2 deployed.", "severity": "MEDIUM"},
    "SI-2": {"name": "Flaw Remediation", "status": "WARNING", "evidence": "Mean patch time: 18 days for critical CVEs (SLA: 7 days). 3 critical CVEs unpatched >30 days: CVE-2024-21762, CVE-2024-23897, CVE-2024-24919."},
    "SI-3": {"name": "Malware Protection", "status": "PASS", "evidence": "EDR deployed on 98% of managed endpoints. Definition age: <4 hours. 2 unmanaged BYOD devices without coverage."},
    "SC-8": {"name": "Transmission Confidentiality", "status": "PASS", "evidence": "TLS 1.2+ enforced on all external endpoints. Certificate expiry monitoring active. Last TLS scan: A+ rating."},
    "SC-28": {"name": "Protection of Information at Rest", "status": "FAIL", "evidence": "S3 bucket 'data-lake-prod' has server-side encryption DISABLED. Contains customer PII. 2 RDS snapshots unencrypted.", "severity": "CRITICAL"},
}

BASELINE_DATE = (datetime.now(timezone.utc) - timedelta(days=90)).isoformat()


def verify_control(control_id: str, control_name: str = None, framework: str = "nist_800_53") -> dict:
    control = CONTROL_STATES.get(control_id)
    if not control:
        return {"control_id": control_id, "status": "NOT_IMPLEMENTED", "evidence": "Control not found in automated verification scope."}
    return {
        "control_id": control_id,
        "control_name": control.get("name", control_name),
        "framework": framework,
        "status": control["status"],
        "evidence": control["evidence"],
        "severity": control.get("severity"),
        "verified_at": datetime.now(timezone.utc).isoformat(),
    }


def run_compliance_scan(framework: str = "nist_800_53", control_families: list = None) -> dict:
    results = []
    for ctrl_id, ctrl_data in CONTROL_STATES.items():
        if control_families and not any(ctrl_id.startswith(f) for f in control_families):
            continue
        results.append({
            "control_id": ctrl_id,
            "control_name": ctrl_data["name"],
            "status": ctrl_data["status"],
            "severity": ctrl_data.get("severity"),
        })

    passed = [r for r in results if r["status"] == "PASS"]
    failed = [r for r in results if r["status"] == "FAIL"]
    warned = [r for r in results if r["status"] == "WARNING"]
    critical_failures = [r for r in failed if r.get("severity") == "CRITICAL"]

    return {
        "framework": framework,
        "scanned_at": datetime.now(timezone.utc).isoformat(),
        "total_controls": len(results),
        "passed": len(passed),
        "failed": len(failed),
        "warnings": len(warned),
        "critical_failures": critical_failures,
        "results": results,
    }


def detect_compliance_drift(baseline_date: str = None, framework: str = "nist_800_53") -> dict:
    # Simulate: some controls that passed in baseline now fail
    drifted = [
        {
            "control_id": "SC-28",
            "control_name": "Protection of Information at Rest",
            "baseline_status": "PASS",
            "current_status": "FAIL",
            "drift_detected": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "cause": "S3 bucket 'data-lake-prod' encryption disabled — likely during terraform apply 2026-05-07",
            "severity": "CRITICAL",
        },
        {
            "control_id": "AU-9",
            "control_name": "Audit Log Protection",
            "baseline_status": "PASS",
            "current_status": "FAIL",
            "drift_detected": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
            "cause": "CloudTrail bucket Object Lock removed by manual console change",
            "severity": "HIGH",
        },
    ]
    return {
        "baseline_date": baseline_date or BASELINE_DATE,
        "current_date": datetime.now(timezone.utc).isoformat(),
        "framework": framework,
        "drift_count": len(drifted),
        "drifted_controls": drifted,
        "note": "Continuous monitoring detected these failures within 24h — point-in-time audit would have missed them",
    }


def generate_evidence_package(control_id: str, evidence_period_days: int = 90) -> dict:
    ctrl = CONTROL_STATES.get(control_id, {})
    return {
        "control_id": control_id,
        "control_name": ctrl.get("name"),
        "evidence_period": f"{evidence_period_days} days",
        "evidence_artifacts": [
            {"type": "configuration_export", "name": f"{control_id}_config_export.json", "collected_at": datetime.now(timezone.utc).isoformat()},
            {"type": "api_audit_log", "name": f"{control_id}_api_calls_{evidence_period_days}d.csv", "record_count": evidence_period_days * 24},
            {"type": "screenshot", "name": f"{control_id}_console_screenshot.png", "tool": "AWS Config / Okta Admin"},
            {"type": "test_result", "name": f"{control_id}_automated_test_results.json", "tests_run": evidence_period_days},
        ],
        "auditor_statement": f"Evidence covers {evidence_period_days}-day period from {(datetime.now(timezone.utc) - timedelta(days=evidence_period_days)).date()} to {datetime.now(timezone.utc).date()}. Continuous monitoring data — not point-in-time.",
        "status": ctrl.get("status", "UNKNOWN"),
    }


def calculate_compliance_score(scan_results: dict, framework: str = "nist_800_53") -> dict:
    results = scan_results.get("results", [])
    if not results:
        return {"score": 0, "error": "No scan results provided"}

    weights = {"CRITICAL": 3, "HIGH": 2, "MEDIUM": 1.5, None: 1}
    total_weight = 0
    passed_weight = 0

    for r in results:
        w = weights.get(r.get("severity"), 1)
        total_weight += w
        if r["status"] == "PASS":
            passed_weight += w
        elif r["status"] == "WARNING":
            passed_weight += w * 0.5

    score = round((passed_weight / total_weight) * 100) if total_weight > 0 else 0
    maturity = "Optimizing" if score >= 90 else "Managed" if score >= 75 else "Defined" if score >= 60 else "Repeatable" if score >= 40 else "Initial"

    return {
        "framework": framework,
        "compliance_score": score,
        "maturity_level": maturity,
        "critical_failures": len([r for r in results if r["status"] == "FAIL" and r.get("severity") == "CRITICAL"]),
        "audit_ready": score >= 75 and len([r for r in results if r["status"] == "FAIL" and r.get("severity") == "CRITICAL"]) == 0,
        "liability_risk": "HIGH — critical failures create documented negligence" if score < 60 else "MEDIUM" if score < 80 else "LOW",
    }


def generate_remediation_plan(failed_controls: list, risk_tolerance: str = "medium") -> dict:
    deadlines = {"CRITICAL": 7, "HIGH": 30, "MEDIUM": 90, None: 180}
    plan = []

    for ctrl in sorted(failed_controls, key=lambda x: {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, None: 3}.get(x.get("severity"), 3)):
        deadline_days = deadlines.get(ctrl.get("severity"), 90)
        ctrl_detail = CONTROL_STATES.get(ctrl["control_id"], {})
        plan.append({
            "control_id": ctrl["control_id"],
            "control_name": ctrl.get("control_name"),
            "severity": ctrl.get("severity"),
            "deadline": (datetime.now(timezone.utc) + timedelta(days=deadline_days)).strftime("%Y-%m-%d"),
            "owner": "Security Engineering",
            "fix_steps": {
                "SC-28": ["Enable SSE-S3 on data-lake-prod: aws s3api put-bucket-encryption --bucket data-lake-prod --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"AES256\"}}]}'", "Encrypt unencrypted RDS snapshots", "Enable S3 default encryption org-wide via SCP"],
                "AU-9": ["Enable S3 Object Lock on CloudTrail bucket: aws s3api put-object-lock-configuration", "Set governance mode with 1-year retention", "Alert on any attempt to disable Object Lock"],
                "AC-6": ["Replace s3:* with specific bucket ARN policies", "Remove iam:PassRole unless required, scope to specific roles", "Implement IAM Access Analyzer to detect future overprivilege"],
                "IA-5": ["Enforce 12-char minimum password with complexity via IAM policy", "Remediate 47 stale passwords via forced reset", "Deploy FIDO2 tokens for privileged accounts"],
            }.get(ctrl["control_id"], ["Review control requirements and implement appropriate technical control", "Document implementation in security runbook"]),
            "evidence_required": f"Configuration export + 30-day monitoring log confirming control effectiveness",
        })

    return {
        "remediation_plan": plan,
        "total_items": len(plan),
        "risk_tolerance": risk_tolerance,
        "executive_summary": f"{len([p for p in plan if p['severity'] == 'CRITICAL'])} CRITICAL items require immediate action (< 7 days). Undocumented failures create personal liability risk for executives (ref: FTC v. Drizly).",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "verify_control": verify_control,
        "run_compliance_scan": run_compliance_scan,
        "detect_compliance_drift": detect_compliance_drift,
        "generate_evidence_package": generate_evidence_package,
        "calculate_compliance_score": calculate_compliance_score,
        "generate_remediation_plan": generate_remediation_plan,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_compliance_engine(framework: str = "nist_800_53"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a continuous compliance engine. Run a full compliance verification cycle.\n\n"
                f"Framework: {framework.upper()}\n\n"
                "1. Run a full compliance scan across all controls.\n"
                "2. Verify the three most critical controls individually for detailed evidence.\n"
                "3. Detect any compliance drift since the last baseline.\n"
                "4. Calculate the overall compliance score and maturity level.\n"
                "5. Generate a remediation plan for all failed controls.\n"
                "6. Produce a compliance report:\n"
                "   - Overall posture score and audit readiness\n"
                "   - Critical failures with specific remediation commands\n"
                "   - Compliance drift: controls that degraded since last audit\n"
                "   - Liability analysis: which failures create documented negligence\n"
                "   - Reference: How did the FTC hold CEO Rellas personally liable, and what would this continuous evidence trail prove or protect?"
            ),
        }
    ]

    print(f"Running continuous compliance engine ({framework.upper()})...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=COMPLIANCE_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}")
                    result = execute_tool(block.name, block.input)
                    tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": result})
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n── CONTINUOUS COMPLIANCE REPORT ────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--framework", default="nist_800_53",
                        choices=["nist_800_53", "soc2", "iso27001", "cis"])
    args = parser.parse_args()
    run_compliance_engine(args.framework)
