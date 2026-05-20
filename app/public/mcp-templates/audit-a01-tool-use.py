"""
audit-a01-tool-use.py
MCP Server: IAM Policy Audit Tool
Lesson: How to define tools, call them via Claude, and loop until the task is done.

SETUP:
  pip install anthropic boto3

USAGE:
  python audit-a01-tool-use.py

HOW IT WORKS:
  1. We define a tool that lists AWS IAM policies for a given account.
  2. We pass the tool definition to Claude in the `tools` parameter.
  3. Claude decides when to call the tool and what arguments to pass.
  4. We execute the tool call and feed the result back as a `tool_result`.
  5. We repeat the loop until Claude stops calling tools and produces a final answer.

This is the core agentic loop — every MCP-powered audit pipeline is built on this pattern.
"""

import json
import boto3
import anthropic

# ── Tool Definition ──────────────────────────────────────────────────────────
# Tell Claude about the tool: its name, description, and the parameters it accepts.
# Claude uses this schema to decide when and how to call the tool.

IAM_AUDIT_TOOLS = [
    {
        "name": "list_iam_policies",
        "description": (
            "Lists IAM managed policies in the AWS account. "
            "Returns policy names, ARNs, attachment count, and creation date. "
            "Scope can be 'AWS' (AWS-managed), 'Local' (customer-managed), or 'All'."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "scope": {
                    "type": "string",
                    "enum": ["AWS", "Local", "All"],
                    "description": "Filter by policy scope. Use 'Local' to audit customer-managed policies.",
                },
                "max_items": {
                    "type": "integer",
                    "description": "Maximum number of policies to return (default 50).",
                    "default": 50,
                },
            },
            "required": ["scope"],
        },
    },
    {
        "name": "get_policy_document",
        "description": (
            "Retrieves the JSON policy document for a specific IAM policy ARN. "
            "Returns the full policy statement including Effect, Action, Resource, and Condition."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "policy_arn": {
                    "type": "string",
                    "description": "The ARN of the IAM policy to retrieve.",
                },
            },
            "required": ["policy_arn"],
        },
    },
]


# ── Tool Execution ────────────────────────────────────────────────────────────
# This is the actual implementation — what happens when Claude calls each tool.
# In a real audit, this calls AWS APIs. For learning, it returns mock data.

def list_iam_policies(scope: str, max_items: int = 50) -> dict:
    """List IAM policies via boto3 (or return mock data if no AWS credentials)."""
    try:
        iam = boto3.client("iam")
        paginator = iam.get_paginator("list_policies")
        policies = []
        for page in paginator.paginate(Scope=scope, MaxItems=max_items):
            for policy in page["Policies"]:
                policies.append({
                    "PolicyName": policy["PolicyName"],
                    "Arn": policy["Arn"],
                    "AttachmentCount": policy["AttachmentCount"],
                    "CreateDate": policy["CreateDate"].isoformat(),
                })
            if len(policies) >= max_items:
                break
        return {"policies": policies[:max_items], "count": len(policies[:max_items])}
    except Exception:
        # Mock data for learning without live AWS credentials
        return {
            "policies": [
                {"PolicyName": "AdminFullAccess", "Arn": "arn:aws:iam::123456789012:policy/AdminFullAccess", "AttachmentCount": 3, "CreateDate": "2024-01-15"},
                {"PolicyName": "S3ReadOnly", "Arn": "arn:aws:iam::123456789012:policy/S3ReadOnly", "AttachmentCount": 12, "CreateDate": "2024-02-20"},
                {"PolicyName": "DeveloperAccess", "Arn": "arn:aws:iam::123456789012:policy/DeveloperAccess", "AttachmentCount": 7, "CreateDate": "2024-03-01"},
            ],
            "count": 3,
            "note": "Mock data — connect AWS credentials to retrieve live policies",
        }


def get_policy_document(policy_arn: str) -> dict:
    """Retrieve a policy document from AWS (or return mock for learning)."""
    try:
        iam = boto3.client("iam")
        policy = iam.get_policy(PolicyArn=policy_arn)
        version_id = policy["Policy"]["DefaultVersionId"]
        version = iam.get_policy_version(PolicyArn=policy_arn, VersionId=version_id)
        return version["PolicyVersion"]["Document"]
    except Exception:
        # Mock policy document for learning
        return {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "*",
                    "Resource": "*",
                    "Sid": "AdminFullAccess",
                }
            ],
            "note": "Mock policy — connect AWS credentials to retrieve live document",
        }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    """Route tool calls to the correct implementation and return JSON string."""
    if tool_name == "list_iam_policies":
        result = list_iam_policies(**tool_input)
    elif tool_name == "get_policy_document":
        result = get_policy_document(**tool_input)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2)


# ── Agentic Loop ──────────────────────────────────────────────────────────────
# This is the core pattern for all agentic audit pipelines.
# Claude reasons, calls tools, gets results, reasons again, until done.

def run_iam_audit():
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from environment

    messages = [
        {
            "role": "user",
            "content": (
                "You are an IT auditor conducting an IAM policy review. "
                "1. List all customer-managed IAM policies in this account. "
                "2. For any policy with broad permissions (Action: '*' or Resource: '*'), "
                "   retrieve the full policy document and flag it as a finding. "
                "3. Produce a concise audit summary with findings and recommendations."
            ),
        }
    ]

    print("Starting IAM audit agentic loop...\n")

    # Loop until Claude stops calling tools
    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",  # use the fastest model for audit loops
            max_tokens=4096,
            tools=IAM_AUDIT_TOOLS,
            messages=messages,
        )

        # Add Claude's response to the conversation history
        messages.append({"role": "assistant", "content": response.content})

        # Check if Claude wants to call tools
        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → Calling tool: {block.name}({json.dumps(block.input)})")
                    result = execute_tool(block.name, block.input)
                    print(f"    Result: {result[:200]}...\n")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })
            # Feed all tool results back to Claude
            messages.append({"role": "user", "content": tool_results})

        else:
            # Claude is done — extract and print the final answer
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n── AUDIT REPORT ──────────────────────────────────────")
                    print(block.text)
            break

    print("\nAudit complete.")


if __name__ == "__main__":
    run_iam_audit()
