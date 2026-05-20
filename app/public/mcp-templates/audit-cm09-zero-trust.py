"""
audit-cm09-zero-trust.py
MCP Server: Zero Trust CARTA — Continuous Adaptive Risk and Trust Assessment Scoring
Lesson: Moving from perimeter security to continuous identity and trust verification.

BACKGROUND — Google BeyondCorp → Zero Trust:
  In 2010, Google discovered Operation Aurora — a sophisticated Chinese APT had been
  inside Google's network for months, having breached through a compromised employee laptop.
  This was the moment Google realized: once inside the perimeter, attackers move freely.
  Response: BeyondCorp (2014) — eliminate the concept of a trusted internal network.
  Every device, every user, every request must be verified. "Never trust, always verify."
  This became the foundation for NIST SP 800-207 (Zero Trust Architecture).

CARTA (Continuous Adaptive Risk and Trust Assessment):
  Gartner's framework — trust is never static. Re-evaluate continuously:
  - Is the user behaving normally?
  - Is the device compliant and patched?
  - Is the access request in context?
  - Has the risk level changed since the last authentication?

SETUP:
  pip install anthropic

USAGE:
  python audit-cm09-zero-trust.py
  python audit-cm09-zero-trust.py --user alice --resource prod-db
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

ZT_TOOLS = [
    {
        "name": "assess_identity_trust",
        "description": (
            "Evaluates identity trust score for a user: authentication strength, "
            "MFA type, last password change, recent failed logins, risk signals."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "session_context": {"type": "object", "description": "Current session details: IP, device, time."},
            },
            "required": ["username"],
        },
    },
    {
        "name": "assess_device_trust",
        "description": (
            "Evaluates device trust score: OS patch level, EDR health, disk encryption, "
            "certificate validity, compliance policy adherence."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "device_id": {"type": "string"},
                "device_type": {"type": "string", "enum": ["managed", "unmanaged", "byod"]},
            },
            "required": ["device_id"],
        },
    },
    {
        "name": "assess_request_context",
        "description": (
            "Evaluates the context of an access request: is the resource sensitive? "
            "Is the time/location normal? Does the request match the user's job function?"
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "resource": {"type": "string", "description": "Resource being accessed e.g. 'prod-db', 'hr-system'."},
                "action": {"type": "string", "description": "Action being taken e.g. 'read', 'write', 'admin'."},
            },
            "required": ["username", "resource", "action"],
        },
    },
    {
        "name": "calculate_carta_score",
        "description": (
            "Calculates the CARTA composite score (0-100) from identity, device, and context scores. "
            "Returns the access decision: ALLOW, ALLOW_WITH_STEP_UP, DENY."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "identity_score": {"type": "number"},
                "device_score": {"type": "number"},
                "context_score": {"type": "number"},
                "resource_sensitivity": {"type": "string", "enum": ["public", "internal", "confidential", "restricted"]},
            },
            "required": ["identity_score", "device_score", "context_score", "resource_sensitivity"],
        },
    },
    {
        "name": "evaluate_zero_trust_maturity",
        "description": "Evaluates the organization's overall Zero Trust maturity across five pillars: Identity, Device, Network, Application, Data.",
        "input_schema": {
            "type": "object",
            "properties": {
                "organization": {"type": "string"},
            },
            "required": [],
        },
    },
    {
        "name": "generate_access_decision",
        "description": "Generates a final access decision with the policy enforcement point (PEP) instruction and audit log entry.",
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string"},
                "resource": {"type": "string"},
                "carta_score": {"type": "number"},
                "decision": {"type": "string", "enum": ["ALLOW", "ALLOW_WITH_STEP_UP", "DENY"]},
                "reason": {"type": "string"},
            },
            "required": ["username", "resource", "carta_score", "decision", "reason"],
        },
    },
]

NOW = datetime.now(timezone.utc)

USER_IDENTITY_DATA = {
    "alice": {
        "mfa_type": "TOTP (authenticator app)",
        "mfa_strength_score": 70,  # TOTP < FIDO2/hardware key
        "last_password_change_days": 45,
        "failed_logins_7d": 0,
        "ueba_risk_score": 72,  # Elevated (from cm03)
        "is_privileged": False,
        "account_age_days": 730,
    },
    "bob": {
        "mfa_type": "SMS OTP",
        "mfa_strength_score": 40,  # SMS = weakest MFA
        "last_password_change_days": 120,
        "failed_logins_7d": 2,
        "ueba_risk_score": 15,
        "is_privileged": False,
        "account_age_days": 365,
    },
}

DEVICE_DATA = {
    "ALICE-LAPTOP": {
        "managed": True,
        "os": "Windows 11",
        "patch_days_behind": 12,
        "edr_health": "HEALTHY",
        "disk_encrypted": True,
        "compliance_cert_valid": True,
        "last_seen_days": 0,
    },
    "UNKNOWN-BYOD": {
        "managed": False,
        "os": "Unknown",
        "patch_days_behind": None,
        "edr_health": "NOT_ENROLLED",
        "disk_encrypted": None,
        "compliance_cert_valid": False,
        "last_seen_days": None,
    },
}

RESOURCE_SENSITIVITY = {
    "prod-db": "restricted",
    "hr-system": "confidential",
    "dev-db": "internal",
    "public-wiki": "public",
    "ip-vault": "restricted",
    "email": "internal",
}

ZT_MATURITY_DATA = {
    "identity": {"implemented": ["MFA enforcement", "SSO", "User lifecycle management"], "gaps": ["FIDO2/hardware keys", "Continuous re-auth", "Passwordless"]},
    "device": {"implemented": ["MDM enrollment", "EDR deployment", "Disk encryption"], "gaps": ["Device certificates", "Automated compliance checks", "Unmanaged device policy"]},
    "network": {"implemented": ["VPN for remote access"], "gaps": ["Micro-segmentation", "Software-defined perimeter", "East-west traffic control"]},
    "application": {"implemented": ["Basic WAF", "SSO integration"], "gaps": ["Per-request authorization", "Least-privilege API access", "Application-level encryption"]},
    "data": {"implemented": ["S3 bucket policies", "Database access logging"], "gaps": ["Data classification", "DLP", "Encryption at field level"]},
}


def assess_identity_trust(username: str, session_context: dict = None) -> dict:
    user = USER_IDENTITY_DATA.get(username, {})
    if not user:
        return {"username": username, "score": 0, "reason": "User not found"}

    score = 50  # Base
    factors = []

    mfa_score = user.get("mfa_strength_score", 0)
    score += (mfa_score - 50) * 0.3
    factors.append(f"MFA type: {user.get('mfa_type')} (strength: {mfa_score}/100)")

    pwd_age = user.get("last_password_change_days", 0)
    if pwd_age > 90:
        score -= 15
        factors.append(f"Password {pwd_age} days old (policy: 90 days)")

    ueba = user.get("ueba_risk_score", 0)
    score -= (ueba / 100) * 20
    factors.append(f"UEBA risk score: {ueba}/100")

    if session_context:
        hour = session_context.get("hour", 12)
        if hour < 6 or hour > 22:
            score -= 15
            factors.append(f"Off-hours access: {hour}:00")
        ip = session_context.get("ip", "")
        if not ip.startswith(("192.168.", "10.")):
            score -= 10
            factors.append(f"External IP: {ip}")

    return {
        "username": username,
        "identity_trust_score": max(0, min(100, round(score))),
        "factors": factors,
        "mfa_type": user.get("mfa_type"),
    }


def assess_device_trust(device_id: str, device_type: str = "managed") -> dict:
    device = DEVICE_DATA.get(device_id, DEVICE_DATA.get("UNKNOWN-BYOD"))
    score = 50
    factors = []

    if not device.get("managed"):
        score = 10
        factors.append("UNMANAGED DEVICE — very low trust")
        return {"device_id": device_id, "device_trust_score": score, "factors": factors}

    patch_lag = device.get("patch_days_behind", 0) or 0
    if patch_lag > 30:
        score -= 25
        factors.append(f"Patches {patch_lag} days behind")
    elif patch_lag > 7:
        score -= 10
        factors.append(f"Patches {patch_lag} days behind")

    if device.get("edr_health") != "HEALTHY":
        score -= 20
        factors.append(f"EDR health: {device.get('edr_health')}")

    if device.get("disk_encrypted"):
        score += 15
        factors.append("Disk encrypted")

    if device.get("compliance_cert_valid"):
        score += 15
        factors.append("Device compliance certificate valid")

    return {
        "device_id": device_id,
        "device_trust_score": max(0, min(100, round(score))),
        "factors": factors,
        "os": device.get("os"),
        "managed": device.get("managed"),
    }


def assess_request_context(username: str, resource: str, action: str) -> dict:
    score = 70
    factors = []
    sensitivity = RESOURCE_SENSITIVITY.get(resource, "internal")

    sensitivity_penalty = {"public": 0, "internal": 0, "confidential": 10, "restricted": 25}
    score -= sensitivity_penalty.get(sensitivity, 0)
    factors.append(f"Resource sensitivity: {sensitivity}")

    if action in ["admin", "write", "delete"]:
        score -= 15
        factors.append(f"High-risk action: {action}")

    # Check if resource matches job function
    user_baselines = {"alice": ["dev-db", "git-server", "ci"], "bob": ["crm", "email"]}
    typical = user_baselines.get(username, [])
    if not any(r in resource for r in typical) and sensitivity in ["confidential", "restricted"]:
        score -= 20
        factors.append(f"{resource} outside normal job scope for {username}")

    return {
        "username": username,
        "resource": resource,
        "action": action,
        "context_score": max(0, min(100, score)),
        "resource_sensitivity": sensitivity,
        "factors": factors,
    }


def calculate_carta_score(identity_score: float, device_score: float, context_score: float,
                           resource_sensitivity: str) -> dict:
    weights = {"identity": 0.40, "device": 0.35, "context": 0.25}
    carta = (identity_score * weights["identity"] + device_score * weights["device"] +
             context_score * weights["context"])

    thresholds = {
        "public": {"allow": 40, "step_up": 20},
        "internal": {"allow": 60, "step_up": 40},
        "confidential": {"allow": 75, "step_up": 55},
        "restricted": {"allow": 85, "step_up": 65},
    }
    t = thresholds.get(resource_sensitivity, thresholds["internal"])

    if carta >= t["allow"]:
        decision = "ALLOW"
    elif carta >= t["step_up"]:
        decision = "ALLOW_WITH_STEP_UP"
    else:
        decision = "DENY"

    return {
        "carta_score": round(carta, 1),
        "decision": decision,
        "resource_sensitivity": resource_sensitivity,
        "threshold_allow": t["allow"],
        "threshold_step_up": t["step_up"],
        "component_scores": {"identity": identity_score, "device": device_score, "context": context_score},
    }


def evaluate_zero_trust_maturity(organization: str = "Acme Corp") -> dict:
    scores = {}
    for pillar, data in ZT_MATURITY_DATA.items():
        impl_count = len(data["implemented"])
        gap_count = len(data["gaps"])
        score = round((impl_count / (impl_count + gap_count)) * 100)
        scores[pillar] = {"score": score, "implemented": data["implemented"], "gaps": data["gaps"]}
    overall = round(sum(v["score"] for v in scores.values()) / len(scores))
    maturity = "Optimizing" if overall >= 80 else "Advanced" if overall >= 60 else "Intermediate" if overall >= 40 else "Initial"
    return {"organization": organization, "overall_score": overall, "maturity_level": maturity, "pillars": scores}


def generate_access_decision(username: str, resource: str, carta_score: float, decision: str, reason: str) -> dict:
    return {
        "decision_id": f"pep-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "username": username,
        "resource": resource,
        "carta_score": carta_score,
        "decision": decision,
        "reason": reason,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "pep_instruction": {
            "ALLOW": "Grant access. Log to audit trail.",
            "ALLOW_WITH_STEP_UP": "Require additional authentication (FIDO2 or biometric). Grant if passed.",
            "DENY": "Block request. Notify user and SOC. Log to audit trail.",
        }.get(decision),
        "audit_log": f"{datetime.now(timezone.utc).isoformat()} | {username} → {resource} | CARTA:{carta_score} | {decision} | {reason}",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "assess_identity_trust": assess_identity_trust,
        "assess_device_trust": assess_device_trust,
        "assess_request_context": assess_request_context,
        "calculate_carta_score": calculate_carta_score,
        "evaluate_zero_trust_maturity": evaluate_zero_trust_maturity,
        "generate_access_decision": generate_access_decision,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_zt_assessment(target_user: str = "alice", target_resource: str = "prod-db"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a Zero Trust Policy Engine. Evaluate an access request.\n\n"
                f"User: {target_user} | Device: ALICE-LAPTOP | Resource: {target_resource} | Action: write\n"
                "Time: 2AM | IP: 185.234.12.88 (external)\n\n"
                "1. Assess identity trust for this user.\n"
                "2. Assess device trust for their device.\n"
                "3. Assess the request context (resource sensitivity + action + time/IP).\n"
                "4. Calculate the CARTA composite score and access decision.\n"
                "5. Evaluate overall Zero Trust maturity.\n"
                "6. Generate the final PEP access decision with audit log entry.\n"
                "7. Produce a Zero Trust report:\n"
                "   - Why was the decision ALLOW/STEP_UP/DENY?\n"
                "   - What would Google BeyondCorp do differently than a VPN-based network?\n"
                "   - Zero Trust maturity gaps and roadmap\n"
                "   - Reference: How would Zero Trust have contained Operation Aurora inside Google?"
            ),
        }
    ]

    print(f"Running Zero Trust CARTA evaluation: {target_user} → {target_resource}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=ZT_TOOLS,
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
                    print("\n── ZERO TRUST ASSESSMENT REPORT ───────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--user", default="alice")
    parser.add_argument("--resource", default="prod-db")
    args = parser.parse_args()
    run_zt_assessment(target_user=args.user, target_resource=args.resource)
