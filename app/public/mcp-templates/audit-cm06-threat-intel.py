"""
audit-cm06-threat-intel.py
MCP Server: STIX/TAXII Threat Intelligence Feed — Indicator Enrichment and Correlation
Lesson: Integrating structured threat intelligence into your monitoring pipeline.

BACKGROUND — Volt Typhoon (Five Eyes Disclosure, 2023):
  China's Volt Typhoon pre-positioned in US critical infrastructure for years.
  The Five Eyes advisory (CISA, NSA, FBI + UK, AU, CA, NZ) disclosed specific IOCs:
  IP addresses, hashes, LOTL (Living off the Land) techniques.
  Organizations with threat intel feeds could block these IOCs immediately.
  Those without found out from the news.

STIX/TAXII EXPLAINED:
  STIX (Structured Threat Information eXpression): JSON format for threat intelligence objects
  TAXII (Trusted Automated eXchange of Intelligence): HTTP protocol for sharing STIX bundles
  Sources: MITRE ATT&CK TAXII server, AlienVault OTX, ISAC feeds, government CISA feeds

SETUP:
  pip install anthropic requests

FREE TAXII SOURCES:
  - MITRE ATT&CK: https://cti-taxii.mitre.org
  - AlienVault OTX: https://otx.alienvault.com/taxii/root

USAGE:
  python audit-cm06-threat-intel.py
  python audit-cm06-threat-intel.py --ioc 185.234.12.88
  python audit-cm06-threat-intel.py --taxii-url https://cti-taxii.mitre.org
"""

import json
import argparse
from datetime import datetime, timezone
import anthropic

TI_TOOLS = [
    {
        "name": "fetch_taxii_bundle",
        "description": (
            "Fetches a STIX bundle from a TAXII server. "
            "Returns threat indicators (IOCs): IPs, domains, hashes, URLs, email addresses."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "taxii_url": {"type": "string", "description": "TAXII server root URL."},
                "collection_name": {"type": "string", "description": "TAXII collection to fetch."},
                "limit": {"type": "integer", "default": 100},
            },
            "required": [],
        },
    },
    {
        "name": "enrich_indicator",
        "description": (
            "Enriches a threat indicator (IP, domain, hash) with context from multiple sources: "
            "threat actor attribution, malware family, MITRE ATT&CK techniques, confidence level."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "indicator": {"type": "string", "description": "IP address, domain, or file hash to enrich."},
                "indicator_type": {
                    "type": "string",
                    "enum": ["ip", "domain", "hash", "url", "email"],
                },
            },
            "required": ["indicator", "indicator_type"],
        },
    },
    {
        "name": "correlate_with_logs",
        "description": (
            "Cross-references threat intelligence IOCs against internal log sources "
            "(firewall logs, DNS logs, proxy logs). Returns any IOC hits in the environment."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "iocs": {"type": "array", "items": {"type": "string"}, "description": "List of IOCs to search for."},
                "log_sources": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Log sources to search: firewall, dns, proxy, email",
                },
            },
            "required": ["iocs"],
        },
    },
    {
        "name": "get_actor_profile",
        "description": "Retrieves the full profile for a threat actor: TTPs, targeted sectors, country attribution, known campaigns.",
        "input_schema": {
            "type": "object",
            "properties": {
                "actor_name": {"type": "string", "description": "Threat actor name e.g. 'Volt Typhoon', 'APT29'"},
            },
            "required": ["actor_name"],
        },
    },
    {
        "name": "generate_detection_rules",
        "description": (
            "Generates Sigma/YARA/Suricata detection rules from STIX indicators. "
            "Returns ready-to-deploy detection logic for your SIEM."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "iocs": {"type": "array", "items": {"type": "object"}},
                "rule_format": {"type": "string", "enum": ["sigma", "yara", "suricata"], "default": "sigma"},
            },
            "required": ["iocs"],
        },
    },
]

# Mock STIX IOC database
MOCK_STIX_IOCS = [
    {
        "id": "indicator--1",
        "type": "ip",
        "value": "185.234.12.88",
        "confidence": 90,
        "actor": "Volt Typhoon",
        "malware": "SOHO router botnet C2",
        "techniques": ["T1090.003 (Proxy: Multi-hop Proxy)", "T1572 (Protocol Tunneling)"],
        "first_seen": "2023-05-01",
        "last_seen": "2026-04-15",
        "tlp": "WHITE",
    },
    {
        "id": "indicator--2",
        "type": "hash",
        "value": "a94f2d8e1b9c3f4a7d2e6b1c9a8f5d3e",
        "confidence": 85,
        "actor": "APT29 (Cozy Bear)",
        "malware": "SUNBURST",
        "techniques": ["T1195.002 (Supply Chain)", "T1027 (Obfuscated Files)"],
        "first_seen": "2020-10-01",
        "last_seen": "2021-02-01",
        "tlp": "WHITE",
    },
    {
        "id": "indicator--3",
        "type": "domain",
        "value": "avsvmcloud.com",
        "confidence": 100,
        "actor": "APT29 (Cozy Bear)",
        "malware": "SUNBURST C2",
        "techniques": ["T1568.002 (Dynamic Resolution)", "T1071.004 (DNS Application Layer)"],
        "first_seen": "2020-03-01",
        "last_seen": "2021-01-01",
        "tlp": "WHITE",
    },
    {
        "id": "indicator--4",
        "type": "ip",
        "value": "45.83.193.150",
        "confidence": 75,
        "actor": "Lazarus Group",
        "malware": "WannaCry distribution",
        "techniques": ["T1486 (Data Encrypted for Impact)"],
        "first_seen": "2017-05-12",
        "last_seen": "2017-06-01",
        "tlp": "WHITE",
    },
]

ACTOR_PROFILES = {
    "Volt Typhoon": {
        "aliases": ["Bronze Silhouette", "VANGUARD PANDA"],
        "country": "China",
        "motive": "Pre-positioning in critical infrastructure for disruption capability",
        "targeted_sectors": ["Energy", "Telecom", "Transportation", "Water"],
        "primary_techniques": ["T1078 (Valid Accounts)", "T1090.003 (Proxy)", "T1105 (Ingress Tool Transfer)"],
        "signature": "Living off the Land (LOTL) — use only built-in tools (wmic, netsh, ntdsutil)",
        "active_since": "2021",
        "five_eyes_advisory": "AA23-144A (2023-05-24)",
    },
    "APT29": {
        "aliases": ["Cozy Bear", "IRON HEMLOCK", "Midnight Blizzard"],
        "country": "Russia (SVR)",
        "motive": "Espionage — government, defense, think tanks",
        "targeted_sectors": ["Government", "Defense", "Energy", "Healthcare"],
        "primary_techniques": ["T1195.002 (Supply Chain)", "T1566.002 (Spearphishing)", "T1552 (Credentials)"],
        "signature": "Patient, low-and-slow — dwell time measured in years",
        "active_since": "2008",
        "notable_campaigns": ["SolarWinds/SUNBURST (2020)", "Microsoft/TeamViewer (2023)"],
    },
}

MOCK_LOG_HITS = {
    "185.234.12.88": [
        {"source": "firewall", "timestamp": "2026-05-18T03:22:00Z", "direction": "outbound", "bytes": 280000},
        {"source": "firewall", "timestamp": "2026-05-18T03:27:00Z", "direction": "outbound", "bytes": 290000},
    ],
}


def fetch_taxii_bundle(taxii_url: str = None, collection_name: str = None, limit: int = 100) -> dict:
    # In production: use taxii2-client library to fetch from real TAXII server
    if taxii_url:
        try:
            import requests
            r = requests.get(f"{taxii_url}/collections/", timeout=10,
                           headers={"Accept": "application/taxii+json;version=2.1"})
            if r.ok:
                return {"source": taxii_url, "iocs": r.json(), "count": limit}
        except Exception as e:
            pass
    return {
        "source": taxii_url or "mock",
        "iocs": MOCK_STIX_IOCS[:limit],
        "count": len(MOCK_STIX_IOCS[:limit]),
        "note": "Mock STIX bundle — set taxii_url to fetch live intel",
    }


def enrich_indicator(indicator: str, indicator_type: str) -> dict:
    # Check our mock database
    for ioc in MOCK_STIX_IOCS:
        if ioc["value"] == indicator:
            return {"indicator": indicator, "type": indicator_type, "enrichment": ioc}

    return {
        "indicator": indicator,
        "type": indicator_type,
        "enrichment": {
            "confidence": 0,
            "actor": "UNKNOWN",
            "note": "Not found in threat intel feed — consider VirusTotal or Shodan lookup",
        },
    }


def correlate_with_logs(iocs: list, log_sources: list = None) -> dict:
    hits = []
    for ioc in iocs:
        if ioc in MOCK_LOG_HITS:
            hits.append({
                "ioc": ioc,
                "log_hits": MOCK_LOG_HITS[ioc],
                "severity": "CRITICAL",
                "recommendation": f"Immediate investigation: known malicious indicator {ioc} found in internal logs",
            })
    return {
        "iocs_searched": len(iocs),
        "log_sources": log_sources or ["firewall", "dns", "proxy"],
        "hits": hits,
        "hit_count": len(hits),
    }


def get_actor_profile(actor_name: str) -> dict:
    # Fuzzy match
    for name, profile in ACTOR_PROFILES.items():
        if actor_name.lower() in name.lower() or any(actor_name.lower() in a.lower() for a in profile.get("aliases", [])):
            return {"actor": name, "profile": profile}
    return {"actor": actor_name, "error": "Actor not found in database"}


def generate_detection_rules(iocs: list, rule_format: str = "sigma") -> dict:
    rules = []
    for ioc in iocs[:5]:  # Limit for demo
        value = ioc.get("value", "")
        ioc_type = ioc.get("type", "ip")

        if rule_format == "sigma":
            if ioc_type == "ip":
                rule = f"""title: Known Malicious IP - {ioc.get('actor', 'Unknown')}
status: stable
description: Detects connection to known threat actor IP {value}
logsource:
  product: firewall
detection:
  selection:
    dst_ip: '{value}'
  condition: selection
falsepositives:
  - None expected
level: critical
tags:
  - attack.{ioc.get('techniques', ['unknown'])[0].split(' ')[0].lower() if ioc.get('techniques') else 'unknown'}
"""
            elif ioc_type == "domain":
                rule = f"""title: Known Malicious Domain - {ioc.get('actor', 'Unknown')}
status: stable
description: Detects DNS query for known C2 domain {value}
logsource:
  product: dns
detection:
  selection:
    query: '{value}'
  condition: selection
level: critical
"""
            else:
                rule = f"# {rule_format} rule for {ioc_type} IOC: {value}"
            rules.append({"ioc": value, "rule_format": rule_format, "rule": rule})

    return {
        "rules_generated": len(rules),
        "format": rule_format,
        "rules": rules,
        "deployment": "Import Sigma rules via pySigma or sigmac to your SIEM's query language",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "fetch_taxii_bundle": fetch_taxii_bundle,
        "enrich_indicator": enrich_indicator,
        "correlate_with_logs": correlate_with_logs,
        "get_actor_profile": get_actor_profile,
        "generate_detection_rules": generate_detection_rules,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_threat_intel(target_ioc: str = None, taxii_url: str = None):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are a threat intelligence analyst. Run a full TI enrichment and correlation cycle.\n\n"
                f"{'Specific IOC to investigate: ' + target_ioc if target_ioc else 'Analyze the full threat intel feed.'}\n\n"
                "1. Fetch the STIX/TAXII threat intelligence bundle.\n"
                "2. Enrich each indicator with actor attribution and MITRE techniques.\n"
                "3. Get the full actor profile for any nation-state actors found.\n"
                "4. Correlate all IOCs against internal logs — find any active hits.\n"
                "5. Generate Sigma detection rules for the top IOCs.\n"
                "6. Produce a TI analyst report:\n"
                "   - Active IOC hits in the environment (CRITICAL if any)\n"
                "   - Threat actor profiles and likely targeting rationale\n"
                "   - Detection rules to deploy immediately\n"
                "   - Reference: How would Volt Typhoon IOCs in this feed have enabled faster detection?"
            ),
        }
    ]

    print("Running threat intelligence analysis...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=TI_TOOLS,
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
                    print("\n── THREAT INTELLIGENCE REPORT ─────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ioc", default=None, help="Specific IOC to investigate")
    parser.add_argument("--taxii-url", default=None, help="TAXII server URL")
    args = parser.parse_args()
    run_threat_intel(target_ioc=args.ioc, taxii_url=args.taxii_url)
