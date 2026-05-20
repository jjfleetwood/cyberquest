"""
audit-a11-sentinel.py
MCP Server: Scheduled Continuous Compliance Agent — Drift Detection and Alerting
Lesson: Converting a point-in-time audit into a continuously running compliance sentinel.

SETUP:
  pip install anthropic boto3 requests schedule

USAGE:
  python audit-a11-sentinel.py                    # Run once
  python audit-a11-sentinel.py --watch --interval 3600  # Run hourly
  python audit-a11-sentinel.py --watch --interval 86400  # Run daily

HOW IT WORKS:
  1. The sentinel maintains a BASELINE snapshot of expected compliance state.
  2. Every interval, it re-checks the actual state via AWS APIs.
  3. Claude compares actual vs baseline and identifies DRIFT (new violations or resolved issues).
  4. Alerts are sent via webhook (Slack, PagerDuty) or email when drift is detected.
  5. The baseline is updated only when a human explicitly approves a change.

REAL USE: Deploy as a scheduled Lambda or ECS task.
  Integrate with your incident management system via the webhook_url parameter.
"""

import json
import time
import argparse
from datetime import datetime, timezone
import anthropic

try:
    import schedule
    HAS_SCHEDULE = True
except ImportError:
    HAS_SCHEDULE = False

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

# Baseline: the expected compliant state. In production, store this in S3 or DynamoDB.
COMPLIANCE_BASELINE = {
    "s3_public_buckets": [],       # No buckets should be public
    "sg_open_ssh": [],             # No security groups with SSH open to 0.0.0.0/0
    "iam_users_without_mfa": [],   # No users without MFA
    "cloudtrail_enabled": True,
    "cloudtrail_multi_region": True,
    "root_account_last_used_days": 90,  # Root account should not be used
}

SENTINEL_TOOLS = [
    {
        "name": "check_s3_public_access",
        "description": "Checks all S3 buckets for public access. Returns list of publicly accessible buckets.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "check_ssh_exposure",
        "description": "Checks all security groups for SSH (port 22) open to 0.0.0.0/0.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "default": "us-east-1"},
            },
            "required": [],
        },
    },
    {
        "name": "check_mfa_compliance",
        "description": "Lists IAM users without MFA enabled.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "check_cloudtrail",
        "description": "Verifies CloudTrail is enabled and configured correctly.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "compare_with_baseline",
        "description": (
            "Compares current compliance state with the expected baseline. "
            "Returns drift items (new violations) and resolved items (previous violations now fixed)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "current_state": {"type": "object", "description": "Current compliance state dict."},
                "baseline": {"type": "object", "description": "Expected baseline compliance state."},
            },
            "required": ["current_state", "baseline"],
        },
    },
    {
        "name": "send_alert",
        "description": "Sends a compliance drift alert via webhook URL (Slack/PagerDuty format).",
        "input_schema": {
            "type": "object",
            "properties": {
                "severity": {"type": "string", "enum": ["CRITICAL", "HIGH", "MEDIUM", "INFO"]},
                "title": {"type": "string"},
                "message": {"type": "string"},
                "webhook_url": {"type": "string"},
            },
            "required": ["severity", "title", "message"],
        },
    },
]


def check_s3_public_access() -> dict:
    # In production: iterate boto3 s3.list_buckets() + get_public_access_block()
    return {
        "public_buckets": ["data-lake-prod"],  # Mock: one bucket is public
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "total_buckets": 3,
    }


def check_ssh_exposure(region: str = "us-east-1") -> dict:
    return {
        "groups_with_open_ssh": ["sg-web"],  # Mock: one group has SSH open
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "region": region,
    }


def check_mfa_compliance() -> dict:
    return {
        "users_without_mfa": ["ci-deploy", "legacy-user"],  # Mock: two users missing MFA
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "total_users": 4,
    }


def check_cloudtrail() -> dict:
    return {
        "enabled": True,
        "multi_region": False,  # Mock: multi-region disabled (drift from baseline)
        "log_validation": False,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }


def compare_with_baseline(current_state: dict, baseline: dict) -> dict:
    drift = []
    resolved = []

    # Check S3 public buckets
    current_public = set(current_state.get("s3_public_buckets", []))
    baseline_public = set(baseline.get("s3_public_buckets", []))
    for bucket in current_public - baseline_public:
        drift.append({"type": "NEW_VIOLATION", "control": "S3 Public Access", "detail": f"{bucket} is now public"})
    for bucket in baseline_public - current_public:
        resolved.append({"type": "RESOLVED", "control": "S3 Public Access", "detail": f"{bucket} is no longer public"})

    # Check SSH exposure
    current_ssh = set(current_state.get("sg_open_ssh", []))
    baseline_ssh = set(baseline.get("sg_open_ssh", []))
    for sg in current_ssh - baseline_ssh:
        drift.append({"type": "NEW_VIOLATION", "control": "SSH Exposure", "detail": f"{sg} now exposes SSH"})

    # Check MFA
    current_no_mfa = set(current_state.get("iam_users_without_mfa", []))
    baseline_no_mfa = set(baseline.get("iam_users_without_mfa", []))
    for user in current_no_mfa - baseline_no_mfa:
        drift.append({"type": "NEW_VIOLATION", "control": "IAM MFA", "detail": f"{user} does not have MFA"})
    for user in baseline_no_mfa - current_no_mfa:
        resolved.append({"type": "RESOLVED", "control": "IAM MFA", "detail": f"{user} now has MFA"})

    # Check CloudTrail
    if current_state.get("cloudtrail_multi_region") != baseline.get("cloudtrail_multi_region"):
        drift.append({"type": "NEW_VIOLATION", "control": "CloudTrail Multi-Region",
                      "detail": "CloudTrail multi-region was expected but is disabled"})

    return {
        "drift_count": len(drift),
        "resolved_count": len(resolved),
        "drift_items": drift,
        "resolved_items": resolved,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }


def send_alert(severity: str, title: str, message: str, webhook_url: str = None) -> dict:
    payload = {
        "text": f"*[{severity}] {title}*\n{message}",
        "username": "Compliance Sentinel",
        "icon_emoji": ":shield:",
    }
    if webhook_url and HAS_REQUESTS:
        try:
            r = requests.post(webhook_url, json=payload, timeout=5)
            return {"sent": True, "status_code": r.status_code}
        except Exception as e:
            return {"sent": False, "error": str(e)}
    else:
        print(f"\n  ⚠️  ALERT [{severity}]: {title}\n  {message}\n")
        return {"sent": True, "channel": "console (no webhook configured)"}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "check_s3_public_access": check_s3_public_access,
        "check_ssh_exposure": check_ssh_exposure,
        "check_mfa_compliance": check_mfa_compliance,
        "check_cloudtrail": check_cloudtrail,
        "compare_with_baseline": compare_with_baseline,
        "send_alert": send_alert,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_compliance_check(webhook_url: str = None):
    client = anthropic.Anthropic()
    print(f"\n[{datetime.now(timezone.utc).isoformat()}] Running compliance sentinel check...")

    messages = [
        {
            "role": "user",
            "content": (
                "You are an automated compliance sentinel. Run a full compliance check.\n\n"
                "1. Check S3 public access, SSH exposure, MFA compliance, and CloudTrail status.\n"
                "2. Compare results with the baseline to identify drift.\n"
                "3. If any drift is detected, send an alert for each violation.\n"
                "4. Summarize: what drifted, what was resolved, current compliance score.\n\n"
                f"Baseline: {json.dumps(COMPLIANCE_BASELINE)}\n"
                f"Webhook: {webhook_url or 'none configured — print to console'}"
            ),
        }
    ]

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            tools=SENTINEL_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
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
                    print("\n── SENTINEL REPORT ────────────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--watch", action="store_true", help="Run continuously on a schedule")
    parser.add_argument("--interval", type=int, default=3600, help="Check interval in seconds (default: 3600)")
    parser.add_argument("--webhook", default=None, help="Slack/PagerDuty webhook URL for alerts")
    args = parser.parse_args()

    if args.watch and HAS_SCHEDULE:
        schedule.every(args.interval).seconds.do(run_compliance_check, webhook_url=args.webhook)
        run_compliance_check(webhook_url=args.webhook)
        while True:
            schedule.run_pending()
            time.sleep(60)
    else:
        run_compliance_check(webhook_url=args.webhook)
