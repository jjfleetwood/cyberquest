"""
audit-cm03-ueba.py
MCP Server: UEBA Risk Scoring — Behavioral Baseline and Threat Chain Correlation
Lesson: User and Entity Behavior Analytics — detecting insider threats through behavioral drift.

BACKGROUND — Tesla Insider Threat (2018):
  A Tesla employee exfiltrated gigabytes of proprietary manufacturing data to outside parties.
  The attack used: data modification, access to systems outside normal job function,
  and large file transfers to personal storage. Standard perimeter security missed it.
  UEBA would have flagged the behavioral baseline deviation within hours.

SETUP:
  pip install anthropic

USAGE:
  python audit-cm03-ueba.py
  python audit-cm03-ueba.py --user alice  # Focus on a specific user
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

UEBA_TOOLS = [
    {
        "name": "get_user_baseline",
        "description": "Retrieves the behavioral baseline profile for a user: normal hours, typical resources, average file access count, network destinations.",
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
            },
            "required": ["username"],
        },
    },
    {
        "name": "get_recent_activity",
        "description": "Gets the last 7 days of user activity: logins, file accesses, system accesses, data transfers.",
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "days": {"type": "integer", "default": 7},
            },
            "required": ["username"],
        },
    },
    {
        "name": "calculate_risk_score",
        "description": (
            "Calculates a UEBA risk score (0-100) by comparing recent activity against the baseline. "
            "Returns score, contributing factors, and risk classification."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "baseline": {"type": "object"},
                "recent_activity": {"type": "object"},
            },
            "required": ["username", "baseline", "recent_activity"],
        },
    },
    {
        "name": "identify_threat_chain",
        "description": (
            "Analyzes a user's risk factors and identifies if they form a known threat chain pattern: "
            "insider exfiltration, account compromise, privilege abuse, or data destruction."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "risk_factors": {"type": "array", "items": {"type": "string"}},
                "risk_score": {"type": "number"},
            },
            "required": ["username", "risk_factors", "risk_score"],
        },
    },
    {
        "name": "get_peer_group_comparison",
        "description": "Compares a user's activity against their peer group (same department, same role). Flags if user is a significant outlier.",
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "department": {"type": "string"},
            },
            "required": ["username"],
        },
    },
]

NOW = datetime.now(timezone.utc)

USER_BASELINES = {
    "alice": {
        "department": "engineering",
        "role": "software_engineer",
        "typical_login_hours": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        "avg_files_accessed_per_day": 45,
        "typical_systems": ["git-server", "ci-server", "dev-db"],
        "avg_data_transferred_mb_per_day": 50,
        "typical_destinations": ["github.com", "internal-npm.corp"],
    },
    "bob": {
        "department": "sales",
        "role": "account_executive",
        "typical_login_hours": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        "avg_files_accessed_per_day": 20,
        "typical_systems": ["crm", "email", "sharepoint"],
        "avg_data_transferred_mb_per_day": 10,
        "typical_destinations": ["salesforce.com", "linkedin.com"],
    },
}

# Simulated recent anomalous activity (Alice is the Tesla-style insider threat)
RECENT_ACTIVITIES = {
    "alice": {
        "login_hours_this_week": [8, 9, 22, 23, 1, 2, 10],  # Unusual late-night activity
        "files_accessed_per_day": [48, 52, 180, 210, 195, 88, 45],  # Spike in file access
        "systems_accessed": ["git-server", "ci-server", "dev-db", "hr-system", "ip-vault", "prod-db"],  # New systems
        "data_transferred_mb_per_day": [45, 52, 1200, 980, 750, 120, 50],  # Massive transfer spike
        "external_destinations": ["github.com", "internal-npm.corp", "dropbox.com", "mega.nz"],  # New personal storage
        "large_file_downloads": [
            {"file": "manufacturing-specs-v7.zip", "size_mb": 450, "timestamp": (NOW - timedelta(days=4)).isoformat()},
            {"file": "product-roadmap-2026.xlsx", "size_mb": 85, "timestamp": (NOW - timedelta(days=3)).isoformat()},
            {"file": "customer-list-full.csv", "size_mb": 120, "timestamp": (NOW - timedelta(days=2)).isoformat()},
        ],
    },
    "bob": {
        "login_hours_this_week": [8, 9, 10, 11, 14, 16, 9],
        "files_accessed_per_day": [18, 22, 19, 21, 20, 17, 23],
        "systems_accessed": ["crm", "email", "sharepoint"],
        "data_transferred_mb_per_day": [8, 12, 9, 11, 10, 7, 13],
        "external_destinations": ["salesforce.com", "linkedin.com"],
        "large_file_downloads": [],
    },
}

THREAT_PATTERNS = {
    "insider_exfiltration": {
        "indicators": ["unusual_hours", "new_systems", "large_file_downloads", "personal_storage"],
        "description": "Data exfiltration by trusted insider — classic Tesla/Waymo pattern",
        "mitre": "T1052 (Exfiltration Over Physical Medium), T1567 (Exfil to Cloud Storage)",
    },
    "account_compromise": {
        "indicators": ["unusual_hours", "impossible_travel", "new_systems", "password_spray"],
        "description": "Legitimate account taken over by external threat actor",
        "mitre": "T1078 (Valid Accounts), T1110 (Brute Force)",
    },
    "privilege_abuse": {
        "indicators": ["new_systems", "admin_tool_usage", "sensitive_data_access"],
        "description": "Insider abusing elevated access beyond job function",
        "mitre": "T1548 (Abuse Elevation), T1087 (Account Discovery)",
    },
}


def get_user_baseline(username: str) -> dict:
    baseline = USER_BASELINES.get(username)
    if not baseline:
        return {"error": f"No baseline found for user: {username}", "suggestion": "Run baseline collection first"}
    return {"username": username, "baseline": baseline, "baseline_period_days": 90}


def get_recent_activity(username: str, days: int = 7) -> dict:
    activity = RECENT_ACTIVITIES.get(username)
    if not activity:
        return {"username": username, "activity": {}, "note": "No recent activity recorded"}
    return {"username": username, "period_days": days, "activity": activity}


def calculate_risk_score(username: str, baseline: dict, recent_activity: dict) -> dict:
    score = 0
    factors = []
    b = baseline.get("baseline", {})
    a = recent_activity.get("activity", {})

    # Off-hours activity
    unusual_hours = [h for h in a.get("login_hours_this_week", []) if h not in b.get("typical_login_hours", [])]
    if unusual_hours:
        score += 15
        factors.append(f"UNUSUAL_HOURS: logins at {unusual_hours}")

    # File access spike
    avg_files = b.get("avg_files_accessed_per_day", 30)
    max_recent = max(a.get("files_accessed_per_day", [0]))
    if max_recent > avg_files * 3:
        score += 20
        factors.append(f"FILE_ACCESS_SPIKE: max {max_recent}/day vs baseline {avg_files}/day")

    # New systems accessed
    new_systems = set(a.get("systems_accessed", [])) - set(b.get("typical_systems", []))
    if new_systems:
        score += 20
        factors.append(f"NEW_SYSTEMS: {new_systems}")

    # Data transfer spike
    avg_xfer = b.get("avg_data_transferred_mb_per_day", 50)
    max_xfer = max(a.get("data_transferred_mb_per_day", [0]))
    if max_xfer > avg_xfer * 5:
        score += 25
        factors.append(f"DATA_TRANSFER_SPIKE: max {max_xfer}MB vs baseline {avg_xfer}MB")

    # Personal storage
    unusual_dest = set(a.get("external_destinations", [])) - set(b.get("typical_destinations", []))
    personal_storage = [d for d in unusual_dest if any(s in d for s in ["dropbox", "mega", "gdrive", "box.com"])]
    if personal_storage:
        score += 30
        factors.append(f"PERSONAL_STORAGE: {personal_storage}")

    # Large downloads
    large_dl = a.get("large_file_downloads", [])
    if large_dl:
        score += 20
        factors.append(f"LARGE_DOWNLOADS: {len(large_dl)} files")

    level = "CRITICAL" if score >= 70 else "HIGH" if score >= 50 else "MEDIUM" if score >= 30 else "LOW"
    return {"username": username, "risk_score": min(100, score), "risk_level": level, "risk_factors": factors}


def identify_threat_chain(username: str, risk_factors: list, risk_score: float) -> dict:
    factors_lower = [f.lower() for f in risk_factors]
    detected = []
    for pattern_name, pattern in THREAT_PATTERNS.items():
        indicators = pattern["indicators"]
        matched = sum(1 for ind in indicators if any(ind in f for f in factors_lower))
        if matched >= 2:
            detected.append({
                "pattern": pattern_name,
                "confidence": f"{(matched / len(indicators)) * 100:.0f}%",
                "description": pattern["description"],
                "mitre": pattern["mitre"],
                "matched_indicators": matched,
            })
    return {
        "username": username,
        "risk_score": risk_score,
        "threat_chains_detected": len(detected),
        "chains": detected,
        "recommended_action": "IMMEDIATE INVESTIGATION" if risk_score >= 70 else "ENHANCED MONITORING",
    }


def get_peer_group_comparison(username: str, department: str = None) -> dict:
    baseline = USER_BASELINES.get(username, {})
    dept = department or baseline.get("department", "unknown")
    peer_avg_files = 40
    peer_avg_xfer = 45
    user_activity = RECENT_ACTIVITIES.get(username, {})
    user_max_files = max(user_activity.get("files_accessed_per_day", [0]))
    user_max_xfer = max(user_activity.get("data_transferred_mb_per_day", [0]))
    return {
        "username": username,
        "department": dept,
        "peer_avg_files_per_day": peer_avg_files,
        "user_max_files_per_day": user_max_files,
        "files_deviation_x": round(user_max_files / max(peer_avg_files, 1), 1),
        "peer_avg_transfer_mb": peer_avg_xfer,
        "user_max_transfer_mb": user_max_xfer,
        "transfer_deviation_x": round(user_max_xfer / max(peer_avg_xfer, 1), 1),
        "is_outlier": user_max_files > peer_avg_files * 3 or user_max_xfer > peer_avg_xfer * 5,
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "get_user_baseline": get_user_baseline,
        "get_recent_activity": get_recent_activity,
        "calculate_risk_score": calculate_risk_score,
        "identify_threat_chain": identify_threat_chain,
        "get_peer_group_comparison": get_peer_group_comparison,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_ueba_analysis(target_user: str = None):
    client = anthropic.Anthropic()
    users_to_analyze = [target_user] if target_user else list(USER_BASELINES.keys())

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a UEBA analyst. Analyze these users for insider threat risk: {users_to_analyze}\n\n"
                "For each user:\n"
                "1. Get their behavioral baseline.\n"
                "2. Get their recent 7-day activity.\n"
                "3. Calculate their UEBA risk score.\n"
                "4. Identify any threat chains.\n"
                "5. Compare against peer group.\n\n"
                "Produce an analyst report:\n"
                "- Risk-ranked user list (highest risk first)\n"
                "- For any user with score >= 50: full threat narrative with timeline\n"
                "- Recommended response actions for each high-risk user\n"
                "- Reference: How would this have caught the Tesla insider exfiltration?"
            ),
        }
    ]

    print("Running UEBA behavioral analysis...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=UEBA_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}({block.input.get('username', '')})")
                    result = execute_tool(block.name, block.input)
                    tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": result})
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n── UEBA ANALYST REPORT ────────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--user", default=None, help="Focus on specific user (default: all users)")
    args = parser.parse_args()
    run_ueba_analysis(target_user=args.user)
