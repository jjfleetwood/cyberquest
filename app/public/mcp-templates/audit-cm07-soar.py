"""
audit-cm07-soar.py
MCP Server: SOAR Playbook Engine — Automated Alert Triage and Response Workflow
Lesson: Security Orchestration, Automation, and Response — letting Claude execute playbooks.

BACKGROUND — Twilio Cascade Breach (2022):
  Attackers SMS-phished Twilio employees, gained VPN access, then pivoted to Okta customer data.
  The breach cascaded to 130+ companies through Twilio's supply chain position.
  An automated SOAR playbook would have: detected the unusual VPN login, required MFA re-auth,
  and blocked the session before the pivot — all within 60 seconds, not the hours it took manually.

SOAR CONCEPT:
  SOAR platforms (Palo Alto XSOAR, Splunk SOAR, IBM Resilient) orchestrate:
  1. Trigger: alert from SIEM
  2. Triage: enrich the alert with context (who is the user? what's their risk score?)
  3. Decision: automated or human-in-the-loop based on confidence
  4. Response: block IP, disable account, isolate endpoint, send Slack notification
  5. Document: case notes, evidence, timeline

SETUP:
  pip install anthropic

USAGE:
  python audit-cm07-soar.py
  python audit-cm07-soar.py --alert-type phishing
  python audit-cm07-soar.py --alert-type c2_beacon
"""

import json
import argparse
from datetime import datetime, timezone
import anthropic

SOAR_TOOLS = [
    {
        "name": "receive_alert",
        "description": "Receives a security alert from the SIEM and formats it for triage.",
        "input_schema": {
            "type": "object",
            "properties": {
                "alert_type": {
                    "type": "string",
                    "enum": ["phishing", "c2_beacon", "brute_force", "data_exfiltration", "malware"],
                    "description": "Type of security alert to simulate.",
                },
            },
            "required": ["alert_type"],
        },
    },
    {
        "name": "enrich_alert",
        "description": (
            "Enriches an alert with context: user risk score, asset criticality, "
            "threat intel lookup, geolocation, and recent related alerts."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "alert": {"type": "object", "description": "Alert object from receive_alert."},
            },
            "required": ["alert"],
        },
    },
    {
        "name": "calculate_alert_priority",
        "description": "Calculates alert priority (P1-P4) based on enrichment data. Returns priority and rationale.",
        "input_schema": {
            "type": "object",
            "properties": {
                "enriched_alert": {"type": "object"},
            },
            "required": ["enriched_alert"],
        },
    },
    {
        "name": "execute_playbook_action",
        "description": (
            "Executes a specific SOAR playbook action: "
            "block_ip, disable_user, isolate_endpoint, send_notification, create_ticket, request_human_review."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["block_ip", "disable_user", "isolate_endpoint", "send_notification", "create_ticket", "request_human_review"],
                },
                "target": {"type": "string", "description": "Target of the action (IP, username, hostname, etc.)"},
                "reason": {"type": "string", "description": "Justification for the action."},
                "auto_approved": {"type": "boolean", "default": False, "description": "True for automated actions, False for human-approved."},
            },
            "required": ["action", "target", "reason"],
        },
    },
    {
        "name": "close_case",
        "description": "Closes the SOAR case with final disposition, timeline, and lessons learned.",
        "input_schema": {
            "type": "object",
            "properties": {
                "case_id": {"type": "string"},
                "disposition": {"type": "string", "enum": ["true_positive", "false_positive", "benign_true_positive"]},
                "actions_taken": {"type": "array", "items": {"type": "string"}},
                "response_time_minutes": {"type": "number"},
            },
            "required": ["case_id", "disposition", "actions_taken"],
        },
    },
]

ALERT_TEMPLATES = {
    "phishing": {
        "id": "alert-2026-8847",
        "type": "phishing",
        "source_ip": "185.234.12.88",
        "target_user": "alice",
        "target_email": "alice@acme.com",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "raw": "Email gateway detected link click to known phishing page. User alice clicked: http://secure-login.acme-corp[.]com/sso",
        "siem_score": 85,
    },
    "c2_beacon": {
        "id": "alert-2026-8848",
        "type": "c2_beacon",
        "source_ip": "192.168.1.75",
        "dest_ip": "185.234.12.88",
        "dest_port": 443,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "raw": "NDR detected beaconing: 192.168.1.75 → 185.234.12.88:443 every 5min for 2h. Beacon score: 0.94",
        "siem_score": 92,
    },
    "brute_force": {
        "id": "alert-2026-8849",
        "type": "brute_force",
        "source_ip": "91.228.167.44",
        "target": "vpn.acme.com",
        "attempts": 450,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "raw": "450 failed VPN authentication attempts from 91.228.167.44 in 10 minutes",
        "siem_score": 78,
    },
    "data_exfiltration": {
        "id": "alert-2026-8850",
        "type": "data_exfiltration",
        "source_user": "alice",
        "source_ip": "192.168.1.50",
        "dest": "mega.nz",
        "bytes": 1250000000,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "raw": "DLP alert: alice transferred 1.2GB to personal cloud storage (mega.nz)",
        "siem_score": 88,
    },
    "malware": {
        "id": "alert-2026-8851",
        "type": "malware",
        "hostname": "ALICE-LAPTOP",
        "process": "svchost.exe -enc [base64payload]",
        "file_hash": "a94f2d8e1b9c3f4a7d2e6b1c9a8f5d3e",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "raw": "EDR detected encoded PowerShell from svchost.exe — hash matches SUNBURST signature",
        "siem_score": 97,
    },
}

ACTIONS_LOG = []


def receive_alert(alert_type: str) -> dict:
    alert = ALERT_TEMPLATES.get(alert_type, ALERT_TEMPLATES["phishing"])
    print(f"    ⚡ Alert received: {alert['id']} ({alert_type})")
    return {"alert": alert, "received_at": datetime.now(timezone.utc).isoformat()}


def enrich_alert(alert: dict) -> dict:
    a = alert.get("alert", alert)
    enrichment = {
        "user_risk_score": 72 if a.get("target_user") == "alice" or a.get("source_user") == "alice" else 15,
        "user_is_privileged": False,
        "asset_criticality": "HIGH" if "prod" in str(a.get("hostname", "")) else "MEDIUM",
        "threat_intel": {},
        "geolocation": {},
        "recent_related_alerts_24h": 0,
    }
    for ip_field in ["source_ip", "dest_ip"]:
        ip = a.get(ip_field)
        if ip == "185.234.12.88":
            enrichment["threat_intel"][ip] = {"known_malicious": True, "actor": "Volt Typhoon", "confidence": 90}
            enrichment["geolocation"][ip] = {"country": "RU", "asn": "AS49505"}
        elif ip == "91.228.167.44":
            enrichment["threat_intel"][ip] = {"known_malicious": True, "actor": "Unknown", "confidence": 65}
    file_hash = a.get("file_hash")
    if file_hash == "a94f2d8e1b9c3f4a7d2e6b1c9a8f5d3e":
        enrichment["threat_intel"][file_hash] = {"known_malicious": True, "malware": "SUNBURST", "confidence": 100}
    return {**a, "enrichment": enrichment, "enriched_at": datetime.now(timezone.utc).isoformat()}


def calculate_alert_priority(enriched_alert: dict) -> dict:
    base_score = enriched_alert.get("siem_score", 50)
    enrichment = enriched_alert.get("enrichment", {})
    multiplier = 1.0
    if any(v.get("known_malicious") for v in enrichment.get("threat_intel", {}).values()):
        multiplier += 0.3
    if enrichment.get("user_risk_score", 0) >= 70:
        multiplier += 0.2
    if enrichment.get("asset_criticality") == "HIGH":
        multiplier += 0.1
    final_score = min(100, base_score * multiplier)
    priority = "P1" if final_score >= 90 else "P2" if final_score >= 70 else "P3" if final_score >= 50 else "P4"
    sla = {"P1": 15, "P2": 60, "P3": 240, "P4": 480}
    return {
        "alert_id": enriched_alert.get("id"),
        "priority": priority,
        "final_score": round(final_score, 1),
        "sla_minutes": sla[priority],
        "rationale": f"Base: {base_score}, multiplier: {multiplier:.1f} (TI hit + user risk + asset criticality)",
        "auto_respond": priority in ["P1"],
    }


def execute_playbook_action(action: str, target: str, reason: str, auto_approved: bool = False) -> dict:
    timestamp = datetime.now(timezone.utc).isoformat()
    action_descriptions = {
        "block_ip": f"Firewall rule added: DENY {target} (all ports)",
        "disable_user": f"IAM/AD account disabled: {target}",
        "isolate_endpoint": f"Endpoint isolated from network: {target}",
        "send_notification": f"Slack/email notification sent to SOC: {target}",
        "create_ticket": f"JIRA/ServiceNow ticket created: {target}",
        "request_human_review": f"Alert escalated to human analyst: {target}",
    }
    result = {
        "action": action,
        "target": target,
        "reason": reason,
        "auto_approved": auto_approved,
        "executed_at": timestamp,
        "result": action_descriptions.get(action, "Action executed"),
        "status": "SUCCESS",
    }
    ACTIONS_LOG.append(result)
    print(f"    ✅ Action: {action} → {target}")
    return result


def close_case(case_id: str, disposition: str, actions_taken: list, response_time_minutes: float = None) -> dict:
    return {
        "case_id": case_id,
        "closed_at": datetime.now(timezone.utc).isoformat(),
        "disposition": disposition,
        "total_actions": len(actions_taken),
        "actions_taken": actions_taken,
        "response_time_minutes": response_time_minutes or 8.5,
        "lessons_learned": "Automated SOAR response completed. Review and tune playbook if false positive.",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "receive_alert": receive_alert,
        "enrich_alert": enrich_alert,
        "calculate_alert_priority": calculate_alert_priority,
        "execute_playbook_action": execute_playbook_action,
        "close_case": close_case,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_soar_playbook(alert_type: str = "c2_beacon"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a SOAR automation engine handling a security alert. Alert type: {alert_type}\n\n"
                "Execute the full SOAR playbook:\n"
                "1. Receive the alert from SIEM.\n"
                "2. Enrich the alert with context (TI, user risk, geolocation).\n"
                "3. Calculate alert priority (P1-P4) and SLA.\n"
                "4. Based on priority and enrichment, decide which playbook actions to take:\n"
                "   - P1 with TI hit: block_ip + disable_user + isolate_endpoint + notify\n"
                "   - P2: create_ticket + notify + request_human_review\n"
                "   - P3/P4: create_ticket only\n"
                "   Mark actions auto_approved=true if P1 (no human needed), false otherwise.\n"
                "5. Close the case with disposition and timeline.\n"
                "6. Produce a SOAR case report:\n"
                "   - All actions taken with timestamps\n"
                "   - Total response time\n"
                "   - What a manual analyst would have done vs what automation did\n"
                "   - Reference: How would this playbook have contained the Twilio cascade breach?"
            ),
        }
    ]

    print(f"Running SOAR playbook for alert type: {alert_type}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=SOAR_TOOLS,
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
                    print("\n── SOAR CASE REPORT ───────────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--alert-type", default="c2_beacon",
                        choices=["phishing", "c2_beacon", "brute_force", "data_exfiltration", "malware"])
    args = parser.parse_args()
    run_soar_playbook(args.alert_type)
