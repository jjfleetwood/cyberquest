"""
audit-cm04-ndr.py
MCP Server: NDR C2 Beaconing Detection — Zeek Log Analysis and Periodic Connection Scoring
Lesson: Network Detection and Response — finding Command and Control traffic in network flow data.

BACKGROUND — Hafnium Exchange Zero-Day (2021):
  Microsoft Exchange servers were compromised via CVE-2021-26855 (ProxyLogon).
  After initial access, Hafnium established C2 beaconing — periodic HTTPS connections
  to external IPs on a predictable schedule. NDR tools detect C2 by the pattern:
  same IP, same port, same approximate size, at regular intervals.
  The FBI eventually used remote remediation authority (Exec Order) to remove the webshells.

SETUP:
  pip install anthropic

ZEEK INTEGRATION:
  Point --zeek-log at /opt/zeek/logs/current/conn.log or a historical log.
  Zeek must be running on your network tap/SPAN port.

USAGE:
  python audit-cm04-ndr.py                           # Mock mode
  python audit-cm04-ndr.py --zeek-log /path/to/conn.log
"""

import json
import os
import argparse
from datetime import datetime, timezone, timedelta
from collections import defaultdict
import math
import anthropic

NDR_TOOLS = [
    {
        "name": "ingest_network_flows",
        "description": "Ingests network connection logs from Zeek conn.log or mock data. Returns connection records with src/dst IP, port, bytes, duration.",
        "input_schema": {
            "type": "object",
            "properties": {
                "log_file": {"type": "string", "description": "Path to Zeek conn.log (optional — uses mock if not provided)."},
                "hours": {"type": "integer", "default": 24, "description": "Hours of logs to analyze."},
            },
            "required": [],
        },
    },
    {
        "name": "detect_beaconing",
        "description": (
            "Analyzes connection logs for C2 beaconing patterns: "
            "periodic connections to the same external IP with low jitter, consistent payload sizes. "
            "Returns potential beacon sources ranked by confidence score."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "connections": {"type": "array", "items": {"type": "object"}},
                "beacon_threshold": {"type": "number", "default": 0.7, "description": "Confidence threshold (0-1)."},
            },
            "required": ["connections"],
        },
    },
    {
        "name": "check_threat_intel",
        "description": "Checks destination IPs against a threat intelligence feed (mock or live). Returns known-malicious IPs.",
        "input_schema": {
            "type": "object",
            "properties": {
                "ip_addresses": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["ip_addresses"],
        },
    },
    {
        "name": "analyze_dns_queries",
        "description": "Analyzes DNS query logs for DGA (domain generation algorithm) patterns and long subdomain strings (DNS tunneling).",
        "input_schema": {
            "type": "object",
            "properties": {
                "dns_log_file": {"type": "string", "description": "Path to Zeek dns.log (optional)."},
            },
            "required": [],
        },
    },
    {
        "name": "geolocate_ip",
        "description": "Returns country, ASN, and risk rating for an IP address.",
        "input_schema": {
            "type": "object",
            "properties": {
                "ip": {"type": "string"},
            },
            "required": ["ip"],
        },
    },
]

NOW = datetime.now(timezone.utc)

# Mock threat intel feed
KNOWN_MALICIOUS_IPS = {
    "185.234.12.88": {"threat": "C2 server", "actor": "APT29", "confidence": "HIGH"},
    "91.228.167.44": {"threat": "Cobalt Strike listener", "actor": "Unknown", "confidence": "MEDIUM"},
    "52.34.88.100": {"threat": "Data exfiltration endpoint", "actor": "Hafnium", "confidence": "HIGH"},
}

def generate_mock_flows() -> list:
    """Generate realistic network flows including a beaconing pattern."""
    flows = []
    # Normal traffic
    for i in range(200):
        flows.append({
            "ts": (NOW - timedelta(minutes=i * 7)).isoformat(),
            "src_ip": f"192.168.1.{50 + (i % 10)}",
            "dst_ip": f"151.101.{i % 50}.{(i * 7) % 256}",
            "dst_port": 443,
            "proto": "tcp",
            "bytes_in": 1200 + (i * 17 % 800),
            "bytes_out": 450 + (i * 11 % 200),
            "duration_s": 0.8 + (i * 0.03 % 2),
            "conn_state": "SF",
        })
    # Beaconing pattern: same src, same dst, every ~5 minutes, consistent size
    beacon_src = "192.168.1.75"
    beacon_dst = "185.234.12.88"
    for i in range(24):
        jitter_s = (i * 13 % 30) - 15  # ±15 seconds of jitter
        flows.append({
            "ts": (NOW - timedelta(hours=2, minutes=i * 5, seconds=jitter_s)).isoformat(),
            "src_ip": beacon_src,
            "dst_ip": beacon_dst,
            "dst_port": 443,
            "proto": "tcp",
            "bytes_in": 280 + (i % 3 * 10),  # Very consistent payload
            "bytes_out": 1420 + (i % 2 * 20),
            "duration_s": 0.3 + (i % 3 * 0.05),
            "conn_state": "SF",
            "note": "Cobalt Strike-style beacon",
        })
    return flows


def ingest_network_flows(log_file: str = None, hours: int = 24) -> dict:
    if log_file and os.path.exists(log_file):
        flows = _parse_zeek_conn_log(log_file, hours)
    else:
        flows = generate_mock_flows()
        if log_file:
            print(f"    Note: {log_file} not found — using mock data")
    return {
        "source": log_file or "mock",
        "hours": hours,
        "flow_count": len(flows),
        "connections": flows,
    }


def _parse_zeek_conn_log(log_file: str, hours: int) -> list:
    """Parse Zeek TSV conn.log format."""
    flows = []
    try:
        with open(log_file) as f:
            headers = None
            for line in f:
                if line.startswith("#fields"):
                    headers = line.strip().split("\t")[1:]
                elif not line.startswith("#") and headers:
                    values = line.strip().split("\t")
                    flow = dict(zip(headers, values))
                    flows.append({
                        "ts": flow.get("ts", ""),
                        "src_ip": flow.get("id.orig_h", ""),
                        "dst_ip": flow.get("id.resp_h", ""),
                        "dst_port": int(flow.get("id.resp_p", 0)),
                        "proto": flow.get("proto", "tcp"),
                        "bytes_in": int(flow.get("orig_bytes", 0) or 0),
                        "bytes_out": int(flow.get("resp_bytes", 0) or 0),
                        "duration_s": float(flow.get("duration", 0) or 0),
                        "conn_state": flow.get("conn_state", ""),
                    })
    except Exception as e:
        return [{"error": str(e)}]
    return flows[:5000]


def detect_beaconing(connections: list, beacon_threshold: float = 0.7) -> dict:
    # Group connections by (src_ip, dst_ip, dst_port)
    groups = defaultdict(list)
    for conn in connections:
        key = (conn.get("src_ip"), conn.get("dst_ip"), conn.get("dst_port"))
        if conn.get("dst_ip", "").startswith(("192.168.", "10.", "172.")):
            continue  # Skip internal
        groups[key].append(conn)

    beacons = []
    for (src, dst, port), conns in groups.items():
        if len(conns) < 5:
            continue

        # Calculate inter-arrival time consistency (low coefficient of variation = beacon)
        try:
            times = sorted([datetime.fromisoformat(c["ts"].replace("Z", "+00:00")) for c in conns])
            intervals = [(times[i+1] - times[i]).total_seconds() for i in range(len(times)-1)]
            if not intervals:
                continue
            mean_interval = sum(intervals) / len(intervals)
            if mean_interval < 1:
                continue
            variance = sum((x - mean_interval) ** 2 for x in intervals) / len(intervals)
            std_dev = math.sqrt(variance)
            cv = std_dev / mean_interval  # Coefficient of variation — lower = more regular = more beaconing

            # Payload size consistency
            sizes = [c.get("bytes_out", 0) for c in conns]
            avg_size = sum(sizes) / len(sizes)
            size_cv = (sum((s - avg_size) ** 2 for s in sizes) / len(sizes)) ** 0.5 / max(avg_size, 1)

            beacon_score = (1 - min(cv, 1)) * 0.6 + (1 - min(size_cv, 1)) * 0.4

            if beacon_score >= beacon_threshold:
                beacons.append({
                    "src_ip": src,
                    "dst_ip": dst,
                    "dst_port": port,
                    "connection_count": len(conns),
                    "avg_interval_seconds": round(mean_interval, 1),
                    "interval_jitter_seconds": round(std_dev, 1),
                    "avg_payload_bytes": round(avg_size, 0),
                    "beacon_score": round(beacon_score, 3),
                    "severity": "CRITICAL" if beacon_score >= 0.85 else "HIGH",
                })
        except Exception:
            continue

    beacons.sort(key=lambda x: x["beacon_score"], reverse=True)
    return {"beacons_detected": len(beacons), "beacons": beacons}


def check_threat_intel(ip_addresses: list) -> dict:
    hits = []
    for ip in ip_addresses:
        if ip in KNOWN_MALICIOUS_IPS:
            hits.append({"ip": ip, **KNOWN_MALICIOUS_IPS[ip]})
    return {
        "ips_checked": len(ip_addresses),
        "malicious_count": len(hits),
        "hits": hits,
        "feed": "mock (integrate VirusTotal, AlienVault OTX, or MISP for production)",
    }


def analyze_dns_queries(dns_log_file: str = None) -> dict:
    # Mock DNS data with DGA and tunneling indicators
    return {
        "source": dns_log_file or "mock",
        "suspicious_queries": [
            {"query": "a4f2d8e1b9c3.malicious-domain.com", "type": "DGA", "entropy": 4.2,
             "reason": "High entropy subdomain — likely DGA (Domain Generation Algorithm)"},
            {"query": "data.exfil.via.dns.attacker.com.base64encodedpayload.evil.net",
             "type": "DNS_TUNNEL", "length": 85, "reason": "Unusually long DNS query — DNS tunneling"},
        ],
        "total_queries_analyzed": 5000,
        "suspicious_count": 2,
    }


def geolocate_ip(ip: str) -> dict:
    geo_db = {
        "185.234.12.88": {"country": "RU", "asn": "AS49505", "org": "OOO Network of data-centers", "risk": "HIGH"},
        "52.34.88.100": {"country": "US", "asn": "AS16509", "org": "Amazon.com", "risk": "MEDIUM"},
        "91.228.167.44": {"country": "NL", "asn": "AS204428", "org": "Cloudie Limited", "risk": "MEDIUM"},
    }
    return geo_db.get(ip, {"country": "UNKNOWN", "asn": "UNKNOWN", "org": "UNKNOWN", "risk": "LOW", "ip": ip})


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "ingest_network_flows": ingest_network_flows,
        "detect_beaconing": detect_beaconing,
        "check_threat_intel": check_threat_intel,
        "analyze_dns_queries": analyze_dns_queries,
        "geolocate_ip": geolocate_ip,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_ndr_analysis(zeek_log: str = None):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are an NDR analyst hunting for C2 beaconing and network-based threats.\n\n"
                f"Log source: {zeek_log or 'mock data'}\n\n"
                "1. Ingest network flow logs.\n"
                "2. Run beaconing detection — identify periodic connection patterns.\n"
                "3. Check all suspicious destination IPs against threat intelligence.\n"
                "4. Geolocate high-score beacon destinations.\n"
                "5. Analyze DNS logs for DGA and tunneling.\n"
                "6. Produce an NDR analyst report:\n"
                "   - Confirmed beacons with confidence score and MITRE mapping\n"
                "   - Threat intel hits\n"
                "   - Recommended blocking actions\n"
                "   - Reference: How would this detection have flagged the Hafnium Exchange C2 traffic?"
            ),
        }
    ]

    print("Running NDR C2 beaconing analysis...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=NDR_TOOLS,
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
                    print("\n── NDR THREAT HUNT REPORT ─────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--zeek-log", default=None, help="Path to Zeek conn.log")
    args = parser.parse_args()
    run_ndr_analysis(zeek_log=args.zeek_log)
