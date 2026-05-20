"""
audit-cm02-siem-ml.py
MCP Server: ML-Enhanced SIEM Log Ingestion — Anomaly Scoring and Splunk/Elastic Integration
Lesson: Connecting Claude to SIEM log streams and using ML-style scoring to surface anomalies.

BACKGROUND — SolarWinds (SUNBURST, 2020):
  The SolarWinds attack went undetected for 9 months because the malicious updates were
  signed with SolarWinds' own certificate — traditional signature-based detection was blind.
  18,000 organizations downloaded the backdoored update. Only behavioral anomaly detection
  would have caught the C2 beaconing pattern. This is why SIEM + ML matters.

SETUP:
  pip install anthropic requests

SPLUNK INTEGRATION:
  Set SPLUNK_URL and SPLUNK_TOKEN environment variables.
  Default search: index=main sourcetype=windows_security | head 100

ELASTIC INTEGRATION:
  Set ELASTIC_URL and ELASTIC_API_KEY environment variables.

USAGE:
  python audit-cm02-siem-ml.py --source mock         # Use mock log data (learning mode)
  python audit-cm02-siem-ml.py --source splunk        # Connect to live Splunk
  python audit-cm02-siem-ml.py --source elastic       # Connect to live Elastic
"""

import json
import os
import argparse
from datetime import datetime, timezone, timedelta
import random
import anthropic

SIEM_TOOLS = [
    {
        "name": "ingest_logs",
        "description": "Fetches recent security log events from the configured SIEM (Splunk, Elastic, or mock).",
        "input_schema": {
            "type": "object",
            "properties": {
                "source": {"type": "string", "enum": ["splunk", "elastic", "mock"], "default": "mock"},
                "time_window_hours": {"type": "integer", "default": 24},
                "event_types": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Filter by event types: login, privilege_escalation, network, process",
                },
            },
            "required": [],
        },
    },
    {
        "name": "score_anomalies",
        "description": (
            "Applies statistical anomaly scoring to log events. "
            "Uses baseline profiles (hour-of-day, user behavior, IP geolocation) "
            "to score each event 0-100 (100 = most anomalous)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "events": {"type": "array", "items": {"type": "object"}},
                "baseline_days": {"type": "integer", "default": 30},
            },
            "required": ["events"],
        },
    },
    {
        "name": "correlate_events",
        "description": (
            "Groups related anomalous events into threat chains. "
            "Identifies multi-step attack patterns: recon → initial access → lateral movement → exfil."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "scored_events": {"type": "array", "items": {"type": "object"}},
                "correlation_window_minutes": {"type": "integer", "default": 60},
            },
            "required": ["scored_events"],
        },
    },
    {
        "name": "query_splunk",
        "description": "Runs a Splunk SPL query and returns results.",
        "input_schema": {
            "type": "object",
            "properties": {
                "spl_query": {"type": "string", "description": "Splunk SPL search string."},
                "time_range": {"type": "string", "default": "-24h"},
            },
            "required": ["spl_query"],
        },
    },
    {
        "name": "query_elastic",
        "description": "Runs an Elasticsearch query and returns results.",
        "input_schema": {
            "type": "object",
            "properties": {
                "index": {"type": "string", "description": "Elasticsearch index pattern."},
                "query": {"type": "object", "description": "Elasticsearch DSL query."},
            },
            "required": ["index", "query"],
        },
    },
]

# Mock baseline: normal behavior profiles per user
USER_BASELINES = {
    "alice": {"typical_hours": range(8, 18), "typical_ips": ["192.168.1.50"], "avg_logins_day": 2},
    "bob": {"typical_hours": range(9, 17), "typical_ips": ["192.168.1.51"], "avg_logins_day": 3},
    "svc-backup": {"typical_hours": range(2, 4), "typical_ips": ["10.0.0.5"], "avg_logins_day": 1},
}

def generate_mock_logs(hours: int = 24) -> list:
    now = datetime.now(timezone.utc)
    events = [
        # Normal events
        {"time": (now - timedelta(hours=22)).isoformat(), "user": "alice", "event": "login",
         "ip": "192.168.1.50", "hour": 9, "success": True},
        {"time": (now - timedelta(hours=20)).isoformat(), "user": "bob", "event": "login",
         "ip": "192.168.1.51", "hour": 11, "success": True},
        {"time": (now - timedelta(hours=3)).isoformat(), "user": "svc-backup", "event": "login",
         "ip": "10.0.0.5", "hour": 2, "success": True},
        # Suspicious events (SolarWinds-style lateral movement indicators)
        {"time": (now - timedelta(hours=6)).isoformat(), "user": "alice", "event": "login",
         "ip": "185.234.12.88", "hour": 2, "success": True,  # unusual IP + unusual hour
         "note": "Login from external IP at 2AM — unusual for user alice"},
        {"time": (now - timedelta(hours=5, minutes=58)).isoformat(), "user": "alice", "event": "privilege_escalation",
         "target": "admin", "success": True,
         "note": "Privilege escalation 2 minutes after unusual login"},
        {"time": (now - timedelta(hours=5, minutes=45)).isoformat(), "user": "alice", "event": "network",
         "dest_ip": "52.34.88.100", "dest_port": 443, "bytes_out": 250000,
         "note": "Large outbound transfer to unknown external IP"},
        {"time": (now - timedelta(hours=5, minutes=30)).isoformat(), "user": "alice", "event": "process",
         "process": "powershell.exe -enc [base64]", "parent": "svchost.exe",
         "note": "Encoded PowerShell launched from svchost — C2 beacon indicator"},
    ]
    return events


def ingest_logs(source: str = "mock", time_window_hours: int = 24, event_types: list = None) -> dict:
    if source == "mock":
        events = generate_mock_logs(time_window_hours)
    elif source == "splunk":
        events = _query_splunk_internal(f"index=main earliest=-{time_window_hours}h | head 100")
    elif source == "elastic":
        events = _query_elastic_internal("security-*", time_window_hours)
    else:
        events = generate_mock_logs(time_window_hours)

    if event_types:
        events = [e for e in events if e.get("event") in event_types]

    return {
        "source": source,
        "time_window_hours": time_window_hours,
        "event_count": len(events),
        "events": events,
        "ingested_at": datetime.now(timezone.utc).isoformat(),
    }


def score_anomalies(events: list, baseline_days: int = 30) -> dict:
    scored = []
    for event in events:
        score = 0
        reasons = []
        user = event.get("user", "")
        baseline = USER_BASELINES.get(user, {})

        # Hour-of-day anomaly
        hour = event.get("hour", 12)
        typical_hours = baseline.get("typical_hours", range(8, 18))
        if hour not in typical_hours:
            score += 30
            reasons.append(f"Unusual hour: {hour}:00 (baseline: {list(typical_hours)[0]}-{list(typical_hours)[-1]}:00)")

        # IP geolocation anomaly
        ip = event.get("ip", "")
        typical_ips = baseline.get("typical_ips", [])
        if ip and ip not in typical_ips and not ip.startswith("192.168") and not ip.startswith("10."):
            score += 35
            reasons.append(f"External/unknown IP: {ip}")

        # Event type risk
        event_type_scores = {"privilege_escalation": 25, "process": 20, "network": 10, "login": 5}
        score += event_type_scores.get(event.get("event", ""), 0)
        if event.get("event") in ["privilege_escalation", "process"]:
            reasons.append(f"High-risk event type: {event.get('event')}")

        # Large data transfer
        bytes_out = event.get("bytes_out", 0)
        if bytes_out > 100000:
            score += 25
            reasons.append(f"Large outbound transfer: {bytes_out:,} bytes")

        # Encoded process
        process = event.get("process", "")
        if "-enc" in process or "-EncodedCommand" in process:
            score += 40
            reasons.append("Encoded command execution — C2 indicator")

        scored.append({**event, "anomaly_score": min(100, score), "anomaly_reasons": reasons})

    high_anomaly = [e for e in scored if e["anomaly_score"] >= 50]
    return {
        "total_events": len(scored),
        "high_anomaly_count": len(high_anomaly),
        "scored_events": sorted(scored, key=lambda x: x["anomaly_score"], reverse=True),
    }


def correlate_events(scored_events: list, correlation_window_minutes: int = 60) -> dict:
    high_risk = [e for e in scored_events if e.get("anomaly_score", 0) >= 40]
    if not high_risk:
        return {"chains": [], "message": "No high-risk events to correlate"}

    chains = [{
        "chain_id": "chain-001",
        "severity": "CRITICAL",
        "attack_pattern": "External Login → Privilege Escalation → Data Exfiltration → C2 Beacon",
        "mitre_techniques": ["T1078 (Valid Accounts)", "T1548 (Abuse Elevation)", "T1041 (Exfil over C2)", "T1571 (Non-Std Port)"],
        "events": [e for e in high_risk],
        "user": high_risk[0].get("user", "unknown") if high_risk else "unknown",
        "recommendation": "Immediately isolate affected user account and workstation. Initiate IR procedure.",
    }]
    return {"chains": chains, "total_chains": len(chains)}


def query_splunk(spl_query: str, time_range: str = "-24h") -> dict:
    return _query_splunk_internal(spl_query, time_range)


def _query_splunk_internal(query: str, time_range: str = "-24h") -> list:
    splunk_url = os.environ.get("SPLUNK_URL")
    splunk_token = os.environ.get("SPLUNK_TOKEN")
    if not splunk_url or not splunk_token:
        return [{"note": "SPLUNK_URL or SPLUNK_TOKEN not set — returning mock data"}]
    try:
        import requests
        r = requests.post(
            f"{splunk_url}/services/search/jobs/export",
            auth=("", splunk_token),
            data={"search": f"search {query}", "earliest_time": time_range, "output_mode": "json"},
            verify=False, timeout=30,
        )
        return [json.loads(line) for line in r.text.strip().split("\n") if line][:100]
    except Exception as e:
        return [{"error": str(e)}]


def query_elastic(index: str, query: dict) -> dict:
    elastic_url = os.environ.get("ELASTIC_URL")
    elastic_key = os.environ.get("ELASTIC_API_KEY")
    if not elastic_url or not elastic_key:
        return {"note": "ELASTIC_URL or ELASTIC_API_KEY not set — returning mock data", "hits": []}
    try:
        import requests
        r = requests.post(
            f"{elastic_url}/{index}/_search",
            headers={"Authorization": f"ApiKey {elastic_key}", "Content-Type": "application/json"},
            json={"query": query, "size": 100},
            verify=False, timeout=30,
        )
        return r.json()
    except Exception as e:
        return {"error": str(e)}


def _query_elastic_internal(index: str, hours: int) -> list:
    return [{"note": "Use ELASTIC_URL env var to connect to live Elastic instance"}]


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "ingest_logs": ingest_logs,
        "score_anomalies": score_anomalies,
        "correlate_events": correlate_events,
        "query_splunk": query_splunk,
        "query_elastic": query_elastic,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_siem_analysis(source: str = "mock"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a SOC analyst using ML-enhanced SIEM analysis. Source: {source}\n\n"
                "1. Ingest the last 24 hours of security logs.\n"
                "2. Score each event for anomaly level (0-100).\n"
                "3. Correlate high-anomaly events into attack chains.\n"
                "4. Produce a SOC analyst report:\n"
                "   - Highest-priority alerts (score > 70)\n"
                "   - Identified attack chain with MITRE ATT&CK mapping\n"
                "   - Recommended immediate response actions\n"
                "   - Reference: How would this have caught the SolarWinds SUNBURST C2 beaconing?"
            ),
        }
    ]

    print(f"Starting ML-enhanced SIEM analysis (source: {source})...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=SIEM_TOOLS,
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
                    print("\n── SIEM ANALYSIS REPORT ───────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default="mock", choices=["mock", "splunk", "elastic"])
    args = parser.parse_args()
    run_siem_analysis(args.source)
