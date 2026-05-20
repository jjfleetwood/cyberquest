"""
audit-cm05-cspm.py
MCP Server: CSPM Attack Path Analysis — Cloud Misconfiguration Chain Detection via AWS APIs
Lesson: Cloud Security Posture Management — finding attack paths through misconfiguration chains.

BACKGROUND — Capital One (2019):
  The attacker (Paige Thompson) exploited an SSRF vulnerability in a WAF to reach the EC2
  metadata endpoint (http://169.254.169.254). This returned an IAM role's temporary credentials.
  The role had overly permissive S3 access — 100 million customer records stolen.
  The entire attack was one misconfiguration chain: SSRF → IMDS → IAM role → S3.
  CSPM tools detect these chains before attackers find them.

SETUP:
  pip install anthropic boto3

USAGE:
  python audit-cm05-cspm.py
  python audit-cm05-cspm.py --region us-west-2
"""

import json
import argparse
from datetime import datetime, timezone
import anthropic

CSPM_TOOLS = [
    {
        "name": "enumerate_attack_surface",
        "description": "Enumerates the cloud attack surface: public EC2 instances, public S3 buckets, API Gateways, load balancers.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "default": "us-east-1"},
            },
            "required": [],
        },
    },
    {
        "name": "analyze_iam_roles",
        "description": "Retrieves IAM roles attached to EC2 instances and analyzes their permissions for overprivilege.",
        "input_schema": {
            "type": "object",
            "properties": {
                "instance_ids": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["instance_ids"],
        },
    },
    {
        "name": "check_metadata_service_version",
        "description": (
            "Checks EC2 instances for IMDSv1 (vulnerable) vs IMDSv2 (protected). "
            "IMDSv1 is exploitable via SSRF — the Capital One attack vector."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "instance_ids": {"type": "array", "items": {"type": "string"}},
                "region": {"type": "string", "default": "us-east-1"},
            },
            "required": ["instance_ids"],
        },
    },
    {
        "name": "map_attack_paths",
        "description": (
            "Given the attack surface and IAM data, constructs all possible attack paths: "
            "entry points that chain to sensitive data or elevated privileges. "
            "Returns attack paths sorted by exploitability."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "attack_surface": {"type": "object"},
                "iam_data": {"type": "object"},
                "imds_data": {"type": "object"},
            },
            "required": ["attack_surface", "iam_data", "imds_data"],
        },
    },
    {
        "name": "check_s3_permissions",
        "description": "Checks if IAM roles have broad S3 access (s3:GetObject *, s3:ListBucket *) that could expose sensitive data.",
        "input_schema": {
            "type": "object",
            "properties": {
                "role_names": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["role_names"],
        },
    },
]

MOCK_ATTACK_SURFACE = {
    "public_ec2_instances": [
        {
            "id": "i-0abc123",
            "name": "web-app-prod",
            "public_ip": "54.234.12.88",
            "security_groups": ["sg-web"],
            "iam_instance_profile": "WebAppRole",
            "imds_version": "v1",  # Vulnerable!
        },
        {
            "id": "i-0def456",
            "name": "internal-api",
            "public_ip": None,
            "security_groups": ["sg-internal"],
            "iam_instance_profile": "ReadOnlyRole",
            "imds_version": "v2",  # Protected
        },
    ],
    "public_s3_buckets": [
        {"name": "data-lake-prod", "public": True, "contains": "customer PII"},
    ],
    "api_gateways": [
        {"id": "api-123", "name": "customer-api", "public": True, "has_waf": False},
    ],
}

MOCK_IAM_ROLES = {
    "WebAppRole": {
        "policies": ["s3:*", "dynamodb:*", "iam:PassRole", "sts:AssumeRole"],
        "trust": ["ec2.amazonaws.com"],
        "overprivileged": True,
        "risk": "CRITICAL — broad s3:* allows access to all buckets",
    },
    "ReadOnlyRole": {
        "policies": ["s3:GetObject", "dynamodb:GetItem"],
        "trust": ["ec2.amazonaws.com"],
        "overprivileged": False,
        "risk": "LOW",
    },
}


def enumerate_attack_surface(region: str = "us-east-1") -> dict:
    try:
        import boto3
        ec2 = boto3.client("ec2", region_name=region)
        s3 = boto3.client("s3")
        # In production: iterate describe_instances, list_buckets, describe_api_gateways
        # Return real data
        return {"note": "Connected to AWS — real enumeration would happen here", "region": region}
    except Exception:
        return {
            "region": region,
            "attack_surface": MOCK_ATTACK_SURFACE,
            "enumerated_at": datetime.now(timezone.utc).isoformat(),
            "note": "Mock data — configure AWS credentials for live enumeration",
        }


def analyze_iam_roles(instance_ids: list) -> dict:
    results = {}
    for inst_id in instance_ids:
        # Find the role for this instance
        for inst in MOCK_ATTACK_SURFACE["public_ec2_instances"]:
            if inst["id"] == inst_id:
                role_name = inst.get("iam_instance_profile", "Unknown")
                role_data = MOCK_IAM_ROLES.get(role_name, {})
                results[inst_id] = {"instance": inst_id, "role": role_name, **role_data}
    return {"iam_analysis": results}


def check_metadata_service_version(instance_ids: list, region: str = "us-east-1") -> dict:
    results = []
    for inst_id in instance_ids:
        for inst in MOCK_ATTACK_SURFACE["public_ec2_instances"]:
            if inst["id"] == inst_id:
                imds_v = inst.get("imds_version", "v1")
                results.append({
                    "instance_id": inst_id,
                    "name": inst.get("name"),
                    "imds_version": imds_v,
                    "vulnerable_to_ssrf": imds_v == "v1",
                    "severity": "CRITICAL" if imds_v == "v1" else "PASS",
                    "remediation": "aws ec2 modify-instance-metadata-options --instance-id {id} --http-tokens required",
                })
    return {"imds_check": results}


def check_s3_permissions(role_names: list) -> dict:
    results = []
    for role in role_names:
        role_data = MOCK_IAM_ROLES.get(role, {})
        policies = role_data.get("policies", [])
        has_broad_s3 = any(p.startswith("s3:") and ("*" in p or p == "s3:*") for p in policies)
        results.append({
            "role": role,
            "has_broad_s3": has_broad_s3,
            "policies": policies,
            "severity": "CRITICAL" if has_broad_s3 else "PASS",
        })
    return {"s3_permission_check": results}


def map_attack_paths(attack_surface: dict, iam_data: dict, imds_data: dict) -> dict:
    paths = []

    # Check for SSRF → IMDS → IAM → S3 chain (Capital One pattern)
    surface = attack_surface.get("attack_surface", attack_surface)
    public_instances = surface.get("public_ec2_instances", [])

    for inst in public_instances:
        if not inst.get("public_ip"):
            continue
        imds_v = inst.get("imds_version", "v1")
        role_name = inst.get("iam_instance_profile", "")
        role_data = MOCK_IAM_ROLES.get(role_name, {})
        policies = role_data.get("policies", [])
        has_broad_s3 = any("s3" in p for p in policies)

        if imds_v == "v1" and has_broad_s3:
            paths.append({
                "path_id": f"path-{inst['id']}",
                "severity": "CRITICAL",
                "steps": [
                    f"1. SSRF → EC2 instance {inst['id']} ({inst['public_ip']}) via web application",
                    f"2. SSRF fetches http://169.254.169.254/latest/meta-data/iam/security-credentials/{role_name}",
                    f"3. Attacker receives temporary AWS credentials for role '{role_name}'",
                    f"4. Credentials used to run: aws s3 ls — all buckets accessible",
                    f"5. aws s3 sync s3://data-lake-prod → data exfiltration of customer PII",
                ],
                "attack_pattern": "SSRF → IMDS → IAM Credential Theft → S3 Data Exfiltration",
                "mitre": ["T1552.005 (Cloud Instance Metadata)", "T1530 (Cloud Storage Object)"],
                "remediation": [
                    f"1. Enable IMDSv2: aws ec2 modify-instance-metadata-options --instance-id {inst['id']} --http-tokens required",
                    f"2. Remove s3:* from {role_name} — apply least privilege S3 policy",
                    "3. Enable S3 Block Public Access on all buckets",
                    "4. Deploy WAF with SSRF rules in front of the web application",
                ],
                "cvss_estimate": 9.1,
            })

    return {
        "attack_paths": paths,
        "total_paths": len(paths),
        "critical_paths": len([p for p in paths if p["severity"] == "CRITICAL"]),
        "analyzed_at": datetime.now(timezone.utc).isoformat(),
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "enumerate_attack_surface": enumerate_attack_surface,
        "analyze_iam_roles": analyze_iam_roles,
        "check_metadata_service_version": check_metadata_service_version,
        "map_attack_paths": map_attack_paths,
        "check_s3_permissions": check_s3_permissions,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_cspm_analysis(region: str = "us-east-1"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are a CSPM analyst. Identify attack paths through cloud misconfigurations.\n\n"
                f"Region: {region}\n\n"
                "1. Enumerate the attack surface (public instances, S3, APIs).\n"
                "2. Analyze IAM roles attached to public-facing instances.\n"
                "3. Check IMDS version on all public instances (IMDSv1 = SSRF vulnerable).\n"
                "4. Check S3 permissions for any overprivileged roles.\n"
                "5. Map all attack paths from entry point to sensitive data.\n"
                "6. Produce a CSPM report:\n"
                "   - Attack paths by severity (CRITICAL first)\n"
                "   - Step-by-step exploitation walkthrough for each critical path\n"
                "   - Prioritized remediation with specific CLI commands\n"
                "   - Reference: Exactly how did this misconfiguration chain enable the Capital One breach?"
            ),
        }
    ]

    print(f"Running CSPM attack path analysis in {region}...\n")

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",  # Sonnet for complex multi-step reasoning
            max_tokens=4096,
            tools=CSPM_TOOLS,
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
                    print("\n── CSPM ATTACK PATH REPORT ────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--region", default="us-east-1")
    args = parser.parse_args()
    run_cspm_analysis(args.region)
