"""
audit-a05-iam-analyzer.py
MCP Server: IAM Policy Privilege Escalation Analyzer
Lesson: Using Claude's reasoning over JSON policy documents to find privilege escalation paths.

SETUP:
  pip install anthropic boto3

USAGE:
  python audit-a05-iam-analyzer.py
  python audit-a05-iam-analyzer.py --policy-file my-policy.json

HOW IT WORKS:
  1. We retrieve IAM policies (from AWS or a local file).
  2. Claude reasons over the policy JSON — not just pattern matching, but logical analysis.
  3. Claude identifies privilege escalation chains:
     - iam:CreatePolicyVersion → can replace any policy → admin
     - iam:AttachRolePolicy → can attach AdministratorAccess → admin
     - iam:PassRole + lambda:CreateFunction → assume privileged role via Lambda
  4. Each escalation path is described with the exploitation steps.

WHY THIS MATTERS: AWS IAM is complex. A policy can look safe while enabling full account takeover
through indirect escalation chains. This is how Capital One's attacker moved from SSRF to S3.
"""

import json
import argparse
import boto3
import anthropic

IAM_ANALYZER_TOOLS = [
    {
        "name": "get_all_customer_policies",
        "description": "Lists and retrieves all customer-managed IAM policies with their full policy documents.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_user_effective_permissions",
        "description": (
            "Gets the effective permissions for a specific IAM user by combining "
            "all attached managed policies and inline policies."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "username": {"type": "string", "description": "IAM username to analyze."},
            },
            "required": ["username"],
        },
    },
    {
        "name": "analyze_escalation_primitives",
        "description": (
            "Checks a list of IAM actions for known privilege escalation primitives. "
            "Returns which dangerous action combinations are present."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "actions": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of IAM actions granted (e.g. ['iam:CreatePolicyVersion', 'lambda:*']).",
                },
            },
            "required": ["actions"],
        },
    },
]

# Known privilege escalation action combinations
ESCALATION_PATHS = [
    {
        "name": "CreatePolicyVersion",
        "required": ["iam:CreatePolicyVersion"],
        "severity": "CRITICAL",
        "description": "Can overwrite any IAM policy → attach AdministratorAccess to self → full admin",
    },
    {
        "name": "AttachRolePolicy",
        "required": ["iam:AttachRolePolicy"],
        "severity": "CRITICAL",
        "description": "Can attach AdministratorAccess to any role → assume that role",
    },
    {
        "name": "PassRole + Lambda",
        "required": ["iam:PassRole", "lambda:CreateFunction", "lambda:InvokeFunction"],
        "severity": "HIGH",
        "description": "Can create a Lambda with a privileged role → execute arbitrary code as that role",
    },
    {
        "name": "PassRole + EC2",
        "required": ["iam:PassRole", "ec2:RunInstances"],
        "severity": "HIGH",
        "description": "Can launch an EC2 instance with an admin role → SSH in → IAM metadata endpoint",
    },
    {
        "name": "CreateUser + AttachPolicy",
        "required": ["iam:CreateUser", "iam:AttachUserPolicy"],
        "severity": "HIGH",
        "description": "Can create a new IAM user and grant it any policy → backdoor account",
    },
    {
        "name": "AssumeRole wildcard",
        "required": ["sts:AssumeRole"],
        "severity": "MEDIUM",
        "description": "Can assume roles — check trust policies for overly permissive conditions",
    },
]

MOCK_POLICIES = [
    {
        "PolicyName": "DeveloperAccess",
        "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {"Effect": "Allow", "Action": ["iam:CreatePolicyVersion", "iam:ListPolicies",
                                                "s3:*", "ec2:Describe*"], "Resource": "*"},
            ],
        },
    },
    {
        "PolicyName": "CIDeployRole",
        "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {"Effect": "Allow", "Action": ["iam:PassRole", "lambda:CreateFunction",
                                                "lambda:InvokeFunction", "lambda:UpdateFunctionCode"],
                 "Resource": "*"},
            ],
        },
    },
    {
        "PolicyName": "ReadOnlyAccess",
        "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {"Effect": "Allow", "Action": ["s3:GetObject", "ec2:DescribeInstances",
                                                "iam:ListUsers"], "Resource": "*"},
            ],
        },
    },
]


def get_all_customer_policies() -> dict:
    try:
        iam = boto3.client("iam")
        paginator = iam.get_paginator("list_policies")
        result = []
        for page in paginator.paginate(Scope="Local"):
            for policy in page["Policies"]:
                version = iam.get_policy_version(
                    PolicyArn=policy["Arn"],
                    VersionId=policy["DefaultVersionId"]
                )
                result.append({
                    "PolicyName": policy["PolicyName"],
                    "Arn": policy["Arn"],
                    "PolicyDocument": version["PolicyVersion"]["Document"],
                })
        return {"policies": result}
    except Exception:
        return {"policies": MOCK_POLICIES, "note": "Mock data — configure AWS credentials for live analysis"}


def get_user_effective_permissions(username: str) -> dict:
    try:
        iam = boto3.client("iam")
        sim = iam.simulate_principal_policy(
            PolicySourceArn=f"arn:aws:iam::123456789012:user/{username}",
            ActionNames=["*"],
        )
        return {"username": username, "simulation": sim}
    except Exception:
        return {
            "username": username,
            "effective_actions": ["iam:CreatePolicyVersion", "s3:*", "ec2:Describe*"],
            "note": "Mock effective permissions — iam:CreatePolicyVersion is a privilege escalation primitive",
        }


def analyze_escalation_primitives(actions: list) -> dict:
    found_paths = []
    action_set = set(a.lower() for a in actions)
    for path in ESCALATION_PATHS:
        required_lower = [r.lower() for r in path["required"]]
        # Check for wildcards (e.g. "iam:*" covers all iam: actions)
        def action_granted(required_action):
            svc, _ = required_action.split(":", 1)
            if f"{svc}:*" in action_set or "*" in action_set:
                return True
            return required_action in action_set
        if all(action_granted(r) for r in required_lower):
            found_paths.append(path)
    return {
        "actions_analyzed": len(actions),
        "escalation_paths_found": len(found_paths),
        "paths": found_paths,
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "get_all_customer_policies":
        result = get_all_customer_policies()
    elif tool_name == "get_user_effective_permissions":
        result = get_user_effective_permissions(**tool_input)
    elif tool_name == "analyze_escalation_primitives":
        result = analyze_escalation_primitives(**tool_input)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_iam_analysis():
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are a cloud security auditor specializing in IAM privilege escalation analysis.\n\n"
                "1. Retrieve all customer-managed IAM policies.\n"
                "2. For each policy, extract the list of IAM actions granted.\n"
                "3. Run escalation primitive analysis on the actions from each policy.\n"
                "4. For any escalation paths found, describe the full exploitation chain "
                "   (how would an attacker use this to gain admin access?).\n"
                "5. Produce a risk-rated report ordered by severity: CRITICAL → HIGH → MEDIUM.\n"
                "   Include the policy name, the dangerous action, and the remediation (least-privilege fix)."
            ),
        }
    ]

    print("Starting IAM privilege escalation analysis...\n")

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",  # Use Sonnet for complex policy reasoning
            max_tokens=4096,
            tools=IAM_ANALYZER_TOOLS,
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
                    print("\n── IAM PRIVILEGE ESCALATION REPORT ───────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    run_iam_analysis()
