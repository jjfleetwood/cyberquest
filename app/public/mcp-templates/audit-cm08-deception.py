"""
audit-cm08-deception.py
MCP Server: Honeytoken Deployment and Trip-Wire Monitoring with Real-Time Alerting
Lesson: Deception technology — placing fake credentials and files to detect intruders.

BACKGROUND — Uber Hard-Coded Credential Breach (2022):
  A hacker found hard-coded credentials in an internal Confluence page.
  The credentials gave access to Uber's internal admin tools, HackerOne bug reports, and more.
  If Uber had deployed honeytokens (fake credentials that alert when used),
  the intrusion would have been detected the moment the attacker tried the credentials.
  Instead, it wasn't discovered until the attacker posted in Uber's Slack.

HONEYTOKEN TYPES:
  - AWS canary credentials: fake IAM keys that alert when used
  - Honeyfiles: fake documents that beacon when opened
  - Honeypot accounts: fake user accounts that should never have activity
  - Honey URLs: fake API endpoints that log all access

SETUP:
  pip install anthropic boto3 requests

USAGE:
  python audit-cm08-deception.py
  python audit-cm08-deception.py --deploy  # Deploy honeytokens (requires AWS)
  python audit-cm08-deception.py --monitor  # Start monitoring loop
"""

import json
import os
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

DECEPTION_TOOLS = [
    {
        "name": "deploy_aws_canary_token",
        "description": (
            "Creates a fake AWS IAM access key (canary token) that triggers an alert "
            "when any API call is made with these credentials. Uses AWS CloudTrail + EventBridge."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "token_name": {"type": "string", "description": "Descriptive name for tracking."},
                "placement_location": {"type": "string", "description": "Where you'll place this token e.g. 'jenkins-config', 'github-secrets'."},
                "alert_webhook": {"type": "string", "description": "Webhook URL for immediate alerts."},
            },
            "required": ["token_name", "placement_location"],
        },
    },
    {
        "name": "deploy_honeyfile",
        "description": (
            "Creates a canary document that beacons to a monitoring server when opened. "
            "Returns a URL-embedded document to place in sensitive directories."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "filename": {"type": "string", "description": "Attractive filename e.g. 'passwords-backup.xlsx'"},
                "placement_path": {"type": "string", "description": "Where to place the file."},
                "monitoring_url": {"type": "string", "description": "Your canary monitoring URL (e.g. canarytokens.org)"},
            },
            "required": ["filename", "placement_path"],
        },
    },
    {
        "name": "deploy_honeypot_account",
        "description": (
            "Creates a fake IAM/AD user account with a plausible name. "
            "Any login or API activity on this account is an immediate critical alert."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string", "description": "Plausible username e.g. 'backup-svc', 'legacy-admin'."},
                "decoy_role": {"type": "string", "description": "Apparent role description to make it attractive."},
            },
            "required": ["username"],
        },
    },
    {
        "name": "check_honeytoken_alerts",
        "description": "Checks all deployed honeytokens for any trigger events. Returns active alerts with source IP, timestamp, and what was accessed.",
        "input_schema": {
            "type": "object",
            "properties": {
                "lookback_hours": {"type": "integer", "default": 24},
            },
            "required": [],
        },
    },
    {
        "name": "generate_honeytoken_inventory",
        "description": "Lists all deployed honeytokens with their placement, trigger count, and last activity.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "analyze_trigger_event",
        "description": "Analyzes a honeytoken trigger event: who triggered it, from where, what did they try to access next?",
        "input_schema": {
            "type": "object",
            "properties": {
                "event": {"type": "object", "description": "Trigger event from check_honeytoken_alerts."},
            },
            "required": ["event"],
        },
    },
]

DEPLOYED_TOKENS = [
    {
        "id": "canary-001",
        "type": "aws_canary_credential",
        "name": "old-backup-key",
        "placement": "jenkins CI config (config.xml)",
        "deployed_at": (datetime.now(timezone.utc) - timedelta(days=30)).isoformat(),
        "trigger_count": 0,
        "last_triggered": None,
        "status": "active",
    },
    {
        "id": "canary-002",
        "type": "honeyfile",
        "name": "passwords-backup.xlsx",
        "placement": "/home/shared/admin-docs/",
        "deployed_at": (datetime.now(timezone.utc) - timedelta(days=14)).isoformat(),
        "trigger_count": 1,
        "last_triggered": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat(),
        "status": "TRIGGERED",
    },
    {
        "id": "canary-003",
        "type": "honeypot_account",
        "name": "legacy-svc-account",
        "placement": "Active Directory / IAM",
        "deployed_at": (datetime.now(timezone.utc) - timedelta(days=60)).isoformat(),
        "trigger_count": 0,
        "last_triggered": None,
        "status": "active",
    },
]

MOCK_TRIGGER_EVENTS = [
    {
        "canary_id": "canary-002",
        "token_name": "passwords-backup.xlsx",
        "triggered_at": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat(),
        "source_ip": "192.168.1.75",
        "user_agent": "Microsoft Office/16.0",
        "hostname": "ALICE-LAPTOP",
        "additional_activity": [
            "Attempted to read /home/shared/admin-docs/ssh-keys/",
            "Listed /etc/passwd on web server",
            "Attempted credential stuffing on admin portal",
        ],
    },
]


def deploy_aws_canary_token(token_name: str, placement_location: str, alert_webhook: str = None) -> dict:
    # In production: boto3 iam.create_access_key() + CloudTrail + EventBridge rule
    # Use canarytokens.org for free managed canary tokens
    fake_key_id = f"AKIA{'X'*16}"[:20]
    fake_secret = f"{'x'*40}"
    return {
        "token_name": token_name,
        "placement": placement_location,
        "credentials": {
            "AWS_ACCESS_KEY_ID": fake_key_id,
            "AWS_SECRET_ACCESS_KEY": fake_secret,
            "note": "THESE ARE HONEYTOKENS — DO NOT USE FOR REAL AWS ACCESS",
        },
        "alert_method": alert_webhook or "CloudTrail + EventBridge → SNS → SOC email",
        "instructions": f"Place these credentials in {placement_location}. Any AWS API call using them triggers an immediate alert.",
        "detection": "CloudTrail will log the API call including source IP and user agent",
        "status": "deployed",
    }


def deploy_honeyfile(filename: str, placement_path: str, monitoring_url: str = None) -> dict:
    canary_url = monitoring_url or "https://canarytokens.org/generate"
    return {
        "filename": filename,
        "placement": placement_path,
        "method": "Embed a unique URL in the document (Word macro, Excel formula, PDF JavaScript)",
        "canary_url": canary_url,
        "implementation": (
            "Option 1 (easiest): canarytokens.org → MS Word token → download → place in path\n"
            "Option 2: Excel formula =IMAGE('https://your-monitor.com/canary/trigger?id=doc123')\n"
            "Option 3: PDF with JavaScript that fetches a unique URL on open"
        ),
        "what_it_captures": "IP address, user agent, exact timestamp of file open",
        "status": "deployment instructions provided",
    }


def deploy_honeypot_account(username: str, decoy_role: str = "Legacy Service Account") -> dict:
    return {
        "username": username,
        "decoy_role": decoy_role,
        "instructions": [
            f"Create IAM user: aws iam create-user --user-name {username}",
            "Do NOT attach any policies — the account should appear dormant but have no real access",
            "Create a login profile with a complex password (never share it)",
            "Enable CloudTrail alerting on any console login or API call for this username",
            "Optionally: set a suspicious-looking display name 'Legacy Admin - DO NOT DELETE'",
        ],
        "detection": "Any authentication attempt on this account = active intruder",
        "note": "Real attackers target accounts named 'backup', 'legacy', 'admin', 'svc'",
        "status": "deployment instructions provided",
    }


def check_honeytoken_alerts(lookback_hours: int = 24) -> dict:
    triggered = [t for t in DEPLOYED_TOKENS if t["status"] == "TRIGGERED"]
    return {
        "lookback_hours": lookback_hours,
        "active_alerts": len(triggered),
        "tokens_triggered": triggered,
        "trigger_events": MOCK_TRIGGER_EVENTS,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }


def generate_honeytoken_inventory() -> dict:
    return {
        "total_deployed": len(DEPLOYED_TOKENS),
        "active": len([t for t in DEPLOYED_TOKENS if t["status"] == "active"]),
        "triggered": len([t for t in DEPLOYED_TOKENS if t["status"] == "TRIGGERED"]),
        "inventory": DEPLOYED_TOKENS,
    }


def analyze_trigger_event(event: dict) -> dict:
    return {
        "event": event,
        "severity": "CRITICAL",
        "attacker_profile": {
            "source_ip": event.get("source_ip"),
            "likely_internal": event.get("source_ip", "").startswith("192.168."),
            "hostname": event.get("hostname"),
            "subsequent_actions": event.get("additional_activity", []),
        },
        "attack_stage": "Active intrusion — post-initial-access reconnaissance",
        "mitre_technique": "T1083 (File and Directory Discovery), T1005 (Data from Local System)",
        "immediate_actions": [
            f"Isolate {event.get('hostname')} from network immediately",
            f"Block {event.get('source_ip')} at firewall",
            "Preserve forensic image before any remediation",
            "Initiate IR procedure: notify CISO, legal, potentially law enforcement",
        ],
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "deploy_aws_canary_token": deploy_aws_canary_token,
        "deploy_honeyfile": deploy_honeyfile,
        "deploy_honeypot_account": deploy_honeypot_account,
        "check_honeytoken_alerts": check_honeytoken_alerts,
        "generate_honeytoken_inventory": generate_honeytoken_inventory,
        "analyze_trigger_event": analyze_trigger_event,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_deception_program():
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are a deception technology specialist. Manage the honeytoken program.\n\n"
                "1. Check the current honeytoken inventory.\n"
                "2. Check for any active alerts (tokens triggered in last 24h).\n"
                "3. If any tokens were triggered, analyze the trigger event in detail.\n"
                "4. Recommend 3 new honeytoken placements based on common attacker recon patterns:\n"
                "   - AWS canary credential: where should it be placed to look like a real secret?\n"
                "   - Honeyfile: what filename and directory would attract a curious attacker?\n"
                "   - Honeypot account: what username would an attacker try to use?\n"
                "5. Produce a deception program report:\n"
                "   - Current coverage (what types of access are monitored)\n"
                "   - Active alerts with attacker timeline\n"
                "   - Gaps in coverage\n"
                "   - Reference: How would a honeytoken have detected the Uber credential breach instantly?"
            ),
        }
    ]

    print("Running deception technology assessment...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=DECEPTION_TOOLS,
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
                    print("\n── DECEPTION PROGRAM REPORT ───────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--deploy", action="store_true", help="Deploy new honeytokens (requires AWS)")
    parser.add_argument("--monitor", action="store_true", help="Run monitoring check only")
    args = parser.parse_args()
    run_deception_program()
