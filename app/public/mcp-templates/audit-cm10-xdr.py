"""
audit-cm10-xdr.py
MCP Server: XDR Cross-Source Correlation — Endpoint + Network + Identity Incident Graph
Lesson: Extended Detection and Response — correlating signals across every telemetry source.

BACKGROUND — Lapsus$ vs. Microsoft (2022):
  Lapsus$ obtained a single Okta support engineer's credentials (via a third-party contractor).
  From there: Okta admin panel → customer tenants → Microsoft → internal source code repos.
  Each hop looked legitimate to individual tools (EDR saw no malware, network saw VPN traffic).
  XDR would have correlated: unusual Okta login location + Microsoft DevOps access + bulk download
  into a single incident graph — and flagged it before 37GB of source code left the building.

XDR vs SIEM vs SOAR:
  SIEM: aggregates logs, searches for known patterns (rules-based).
  SOAR: automates response playbooks when SIEM fires.
  XDR: natively integrates telemetry from endpoint (EDR), network (NDR), identity (IdP/IAM),
       cloud, and email — correlates across sources using AI/ML, not just rules.
  Key advantage: XDR stitches "low and slow" multi-stage attacks that no single tool sees.

SETUP:
  pip install anthropic

USAGE:
  python audit-cm10-xdr.py
  python audit-cm10-xdr.py --scenario lapsus
  python audit-cm10-xdr.py --scenario ransomware
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

XDR_TOOLS = [
    {
        "name": "ingest_endpoint_telemetry",
        "description": (
            "Pulls EDR telemetry: process executions, file writes, registry changes, "
            "lateral movement indicators, and suspicious PowerShell/LOLBin activity."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "hostname": {"type": "string"},
                "lookback_hours": {"type": "integer", "default": 24},
            },
            "required": [],
        },
    },
    {
        "name": "ingest_network_telemetry",
        "description": (
            "Pulls NDR telemetry: unusual outbound connections, beaconing patterns, "
            "data staging/exfiltration volumes, east-west lateral movement."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "lookback_hours": {"type": "integer", "default": 24},
            },
            "required": [],
        },
    },
    {
        "name": "ingest_identity_telemetry",
        "description": (
            "Pulls IdP/IAM telemetry: Okta/Azure AD login events, MFA bypass attempts, "
            "impossible travel, new OAuth app grants, privilege escalation events."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "lookback_hours": {"type": "integer", "default": 24},
            },
            "required": [],
        },
    },
    {
        "name": "correlate_into_incident_graph",
        "description": (
            "Core XDR function: takes endpoint, network, and identity telemetry and "
            "builds an incident graph — linking events across sources into a unified attack timeline. "
            "Returns incident nodes (entities) and edges (causal relationships)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "endpoint_events": {"type": "array"},
                "network_events": {"type": "array"},
                "identity_events": {"type": "array"},
            },
            "required": ["endpoint_events", "network_events", "identity_events"],
        },
    },
    {
        "name": "score_incident",
        "description": (
            "Scores the incident graph: overall severity, confidence, estimated blast radius, "
            "attack stage (initial access / execution / lateral movement / exfiltration), MITRE ATT&CK coverage."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "incident_graph": {"type": "object"},
            },
            "required": ["incident_graph"],
        },
    },
    {
        "name": "generate_xdr_response",
        "description": (
            "Generates the XDR automated response plan: containment actions across all integrated "
            "tools (EDR isolation, IdP session revocation, network block, cloud suspension)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "incident_id": {"type": "string"},
                "severity": {"type": "string", "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW"]},
                "affected_entities": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["incident_id", "severity", "affected_entities"],
        },
    },
]

NOW = datetime.now(timezone.utc)

ENDPOINT_EVENTS = [
    {
        "id": "ep-001", "hostname": "DEV-WORKSTATION-07", "timestamp": (NOW - timedelta(hours=3)).isoformat(),
        "type": "process_execution", "process": "powershell.exe",
        "cmdline": "powershell -enc UwB0AGEAcgB0AC0AUAByAG8AYwBlAHMAcw==",
        "parent": "explorer.exe", "user": "alice", "score": 72,
    },
    {
        "id": "ep-002", "hostname": "DEV-WORKSTATION-07", "timestamp": (NOW - timedelta(hours=2, minutes=45)).isoformat(),
        "type": "file_write", "path": "C:\\Users\\alice\\AppData\\Local\\Temp\\collector.exe",
        "hash": "b3f8a1c9d2e4f7a6b3f8a1c9d2e4f7a6", "score": 65,
    },
    {
        "id": "ep-003", "hostname": "DEV-WORKSTATION-07", "timestamp": (NOW - timedelta(hours=2, minutes=30)).isoformat(),
        "type": "network_connection", "dest_ip": "185.234.12.88", "dest_port": 443,
        "process": "collector.exe", "bytes_out": 38000000000, "score": 95,
    },
]

NETWORK_EVENTS = [
    {
        "id": "net-001", "timestamp": (NOW - timedelta(hours=3, minutes=15)).isoformat(),
        "type": "unusual_outbound", "src_ip": "192.168.1.42", "dest_ip": "185.234.12.88",
        "dest_port": 443, "bytes": 38000000000,
        "anomaly": "38 GB upload — 200x baseline for this host", "score": 97,
    },
    {
        "id": "net-002", "timestamp": (NOW - timedelta(hours=4)).isoformat(),
        "type": "lateral_movement", "src_ip": "192.168.1.42", "dest_ip": "192.168.1.100",
        "protocol": "SMB", "anomaly": "First-time SMB connection between these hosts", "score": 70,
    },
]

IDENTITY_EVENTS = [
    {
        "id": "id-001", "timestamp": (NOW - timedelta(hours=5)).isoformat(),
        "type": "okta_login", "user": "alice@acme.com", "ip": "185.234.12.88",
        "location": "Kyiv, UA", "baseline_location": "New York, US",
        "anomaly": "Impossible travel — login from Ukraine 2h after NYC login", "score": 95,
    },
    {
        "id": "id-002", "timestamp": (NOW - timedelta(hours=4, minutes=55)).isoformat(),
        "type": "mfa_bypass", "user": "alice@acme.com",
        "method": "MFA fatigue — 12 push requests until accepted", "score": 88,
    },
    {
        "id": "id-003", "timestamp": (NOW - timedelta(hours=4, minutes=30)).isoformat(),
        "type": "privilege_escalation", "user": "alice@acme.com",
        "action": "Added self to GitHub org admin role via Azure AD PIM",
        "target_resource": "github-acme-org", "score": 90,
    },
]


def ingest_endpoint_telemetry(hostname: str = None, lookback_hours: int = 24) -> dict:
    events = [e for e in ENDPOINT_EVENTS if not hostname or e.get("hostname") == hostname]
    return {
        "source": "EDR (CrowdStrike/SentinelOne)",
        "hostname": hostname or "all",
        "lookback_hours": lookback_hours,
        "event_count": len(events),
        "events": events,
        "high_score_events": [e for e in events if e.get("score", 0) >= 70],
    }


def ingest_network_telemetry(lookback_hours: int = 24) -> dict:
    return {
        "source": "NDR (Darktrace/ExtraHop)",
        "lookback_hours": lookback_hours,
        "event_count": len(NETWORK_EVENTS),
        "events": NETWORK_EVENTS,
        "high_score_events": [e for e in NETWORK_EVENTS if e.get("score", 0) >= 70],
    }


def ingest_identity_telemetry(lookback_hours: int = 24) -> dict:
    return {
        "source": "IdP (Okta/Azure AD)",
        "lookback_hours": lookback_hours,
        "event_count": len(IDENTITY_EVENTS),
        "events": IDENTITY_EVENTS,
        "high_score_events": [e for e in IDENTITY_EVENTS if e.get("score", 0) >= 70],
    }


def correlate_into_incident_graph(endpoint_events: list, network_events: list, identity_events: list) -> dict:
    nodes = []
    edges = []

    nodes.append({"id": "user-alice", "type": "user", "label": "alice@acme.com", "risk": "HIGH"})
    nodes.append({"id": "host-dev07", "type": "endpoint", "label": "DEV-WORKSTATION-07", "risk": "HIGH"})
    nodes.append({"id": "ip-external", "type": "ip", "label": "185.234.12.88", "risk": "CRITICAL", "intel": "Lapsus$/C2"})
    nodes.append({"id": "resource-github", "type": "cloud_resource", "label": "GitHub Acme Org Admin", "risk": "CRITICAL"})

    edges.append({"from": "ip-external", "to": "user-alice", "label": "Okta login (impossible travel)", "technique": "T1078"})
    edges.append({"from": "user-alice", "to": "user-alice", "label": "MFA fatigue bypass", "technique": "T1621"})
    edges.append({"from": "user-alice", "to": "resource-github", "label": "Privilege escalation via PIM", "technique": "T1078.004"})
    edges.append({"from": "host-dev07", "to": "ip-external", "label": "38 GB data exfiltration", "technique": "T1041"})

    all_events = endpoint_events + network_events + identity_events
    timeline = sorted(all_events, key=lambda x: x.get("timestamp", ""))

    return {
        "incident_id": f"INC-{datetime.now().strftime('%Y%m%d-%H%M')}",
        "nodes": nodes,
        "edges": edges,
        "timeline": timeline,
        "attack_stages": [
            "Initial Access: Credential compromise via MFA fatigue (T1621, T1078)",
            "Privilege Escalation: Azure AD PIM abuse → GitHub admin (T1078.004)",
            "Collection: Encoded PowerShell + collector tool (T1059.001)",
            "Exfiltration: 38 GB to external C2 (185.234.12.88) (T1041)",
        ],
    }


def score_incident(incident_graph: dict) -> dict:
    nodes = incident_graph.get("nodes", [])
    edges = incident_graph.get("edges", [])
    critical_nodes = [n for n in nodes if n.get("risk") == "CRITICAL"]
    severity = "CRITICAL" if critical_nodes else "HIGH"

    return {
        "incident_id": incident_graph.get("incident_id"),
        "severity": severity,
        "confidence": 92,
        "blast_radius": {
            "affected_users": 1,
            "affected_hosts": 1,
            "data_exfiltrated_gb": 38,
            "compromised_resources": ["GitHub Acme Org Admin", "Azure AD PIM"],
        },
        "attack_stage": "Exfiltration (final stage — data already left the environment)",
        "mitre_techniques": ["T1078", "T1621", "T1078.004", "T1059.001", "T1041"],
        "dwell_time_hours": 5,
        "single_tool_blind_spots": [
            "EDR alone: saw PowerShell + outbound — no user context for why",
            "Network alone: saw large upload — no endpoint process attribution",
            "IdP alone: saw impossible travel — no data exfiltration confirmation",
            "XDR: connected all three into a confirmed attack chain",
        ],
    }


def generate_xdr_response(incident_id: str, severity: str, affected_entities: list) -> dict:
    return {
        "incident_id": incident_id,
        "severity": severity,
        "response_plan": [
            {"action": "revoke_idp_sessions", "tool": "Okta Admin API", "target": "alice@acme.com",
             "command": "okta_sdk.users.end_all_sessions(user_id)", "auto": True},
            {"action": "disable_azure_ad_account", "tool": "Microsoft Graph API", "target": "alice@acme.com",
             "command": "PATCH /users/{id} {accountEnabled: false}", "auto": True},
            {"action": "isolate_endpoint", "tool": "EDR API (CrowdStrike)", "target": "DEV-WORKSTATION-07",
             "command": "falcon.command('contain', device_id=...)", "auto": True},
            {"action": "block_external_ip", "tool": "Firewall/NGFW API", "target": "185.234.12.88",
             "command": "fw.add_block_rule(src='185.234.12.88', direction='both')", "auto": True},
            {"action": "revoke_github_admin", "tool": "GitHub API", "target": "alice - GitHub Org Admin",
             "command": "DELETE /orgs/{org}/memberships/{username}", "auto": False, "requires_human": True},
            {"action": "preserve_forensics", "tool": "EDR Memory Acquisition", "target": "DEV-WORKSTATION-07",
             "command": "falcon.get_memory_dump(device_id=...)", "auto": True},
            {"action": "notify_ciso", "tool": "PagerDuty/Slack",
             "message": f"CRITICAL XDR incident {incident_id}: Confirmed Lapsus$-pattern attack. 38GB exfiltrated. All sessions revoked.", "auto": True},
        ],
        "estimated_containment_time_seconds": 45,
        "manual_steps": ["GitHub admin revocation requires GitHub org owner approval", "Legal notification if PII was in exfiltrated data"],
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "ingest_endpoint_telemetry": ingest_endpoint_telemetry,
        "ingest_network_telemetry": ingest_network_telemetry,
        "ingest_identity_telemetry": ingest_identity_telemetry,
        "correlate_into_incident_graph": correlate_into_incident_graph,
        "score_incident": score_incident,
        "generate_xdr_response": generate_xdr_response,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_xdr_analysis(scenario: str = "lapsus"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are an XDR platform engine analyzing a multi-source security incident. Scenario: {scenario}\n\n"
                "Execute the full XDR correlation workflow:\n"
                "1. Ingest telemetry from all three sources: endpoint (EDR), network (NDR), identity (IdP).\n"
                "2. Correlate all events into an incident graph — link entities across sources.\n"
                "3. Score the incident: severity, confidence, blast radius, attack stage, MITRE techniques.\n"
                "4. Generate the cross-platform response plan (IdP revocation + EDR isolation + network block).\n"
                "5. Produce an XDR incident report:\n"
                "   - Attack timeline with MITRE ATT&CK stage labels\n"
                "   - Why this attack was invisible to any single tool (EDR alone, IdP alone)\n"
                "   - How XDR cross-source correlation caught it\n"
                "   - Reference: How exactly did Lapsus$ exploit the Okta contractor to reach Microsoft?\n"
                "   - What XDR capability would have stopped the Lapsus$ attack at which step?"
            ),
        }
    ]

    print(f"Running XDR cross-source correlation analysis (scenario: {scenario})...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=XDR_TOOLS,
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
                    print("\n── XDR INCIDENT REPORT ────────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario", default="lapsus", choices=["lapsus", "ransomware", "insider"])
    args = parser.parse_args()
    run_xdr_analysis(args.scenario)
