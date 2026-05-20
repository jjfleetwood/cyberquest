"""
audit-a07-iac-reviewer.py
MCP Server: Agentic IaC Review — Terraform Plan Parsing and CIS Benchmark Checking
Lesson: Using Claude to audit Infrastructure-as-Code against security benchmarks.

SETUP:
  pip install anthropic

USAGE:
  python audit-a07-iac-reviewer.py --plan-file terraform-plan.json
  python audit-a07-iac-reviewer.py --tf-dir /path/to/terraform/

HOW IT WORKS:
  1. Claude is given tools to parse Terraform plan JSON and read .tf files.
  2. Claude checks each resource against CIS Benchmark rules:
     - CIS AWS Foundations Benchmark v1.5
     - Specific checks: encryption at rest, logging enabled, public access blocked, etc.
  3. Claude produces a finding per failed control with the specific resource, rule, and fix.

REAL AUDIT USE: Run 'terraform plan -out=tfplan && terraform show -json tfplan > plan.json'
then point this script at plan.json.
"""

import json
import os
import argparse
import anthropic

IAC_TOOLS = [
    {
        "name": "parse_terraform_plan",
        "description": (
            "Parses a Terraform plan JSON file and extracts resource changes. "
            "Returns each resource being created, updated, or destroyed with its configuration."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "plan_file": {"type": "string", "description": "Path to terraform plan JSON file."},
            },
            "required": ["plan_file"],
        },
    },
    {
        "name": "read_terraform_files",
        "description": "Reads all .tf files in a directory and returns their contents for analysis.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string", "description": "Directory containing .tf files."},
            },
            "required": ["directory"],
        },
    },
    {
        "name": "check_cis_controls",
        "description": (
            "Checks a set of Terraform resource configurations against CIS AWS Benchmark controls. "
            "Returns pass/fail for each control with the specific resource and remediation."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "resources": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "List of resource configs as extracted from the Terraform plan.",
                },
            },
            "required": ["resources"],
        },
    },
    {
        "name": "check_resource_encryption",
        "description": "Checks if a specific resource type has encryption at rest enabled.",
        "input_schema": {
            "type": "object",
            "properties": {
                "resource_type": {"type": "string", "description": "e.g. aws_s3_bucket, aws_rds_instance"},
                "resource_config": {"type": "object", "description": "Resource configuration dict"},
            },
            "required": ["resource_type", "resource_config"],
        },
    },
]

MOCK_PLAN = {
    "resource_changes": [
        {
            "address": "aws_s3_bucket.data_lake",
            "type": "aws_s3_bucket",
            "change": {
                "actions": ["create"],
                "after": {
                    "bucket": "data-lake-prod",
                    "acl": "public-read",
                    "versioning": [{"enabled": False}],
                    "server_side_encryption_configuration": [],
                    "logging": [],
                },
            },
        },
        {
            "address": "aws_rds_instance.primary",
            "type": "aws_rds_instance",
            "change": {
                "actions": ["create"],
                "after": {
                    "identifier": "prod-db",
                    "engine": "postgres",
                    "storage_encrypted": False,
                    "publicly_accessible": True,
                    "deletion_protection": False,
                    "backup_retention_period": 0,
                },
            },
        },
        {
            "address": "aws_security_group.web",
            "type": "aws_security_group",
            "change": {
                "actions": ["create"],
                "after": {
                    "name": "web-sg",
                    "ingress": [
                        {"from_port": 22, "to_port": 22, "protocol": "tcp", "cidr_blocks": ["0.0.0.0/0"]},
                        {"from_port": 443, "to_port": 443, "protocol": "tcp", "cidr_blocks": ["0.0.0.0/0"]},
                    ],
                },
            },
        },
    ]
}

CIS_CONTROLS = [
    {
        "control_id": "CIS 2.1.2",
        "title": "S3 Block Public Access",
        "resource_type": "aws_s3_bucket",
        "check": lambda r: r.get("acl") not in ["public-read", "public-read-write"],
        "severity": "CRITICAL",
        "remediation": "Set acl = private and add aws_s3_bucket_public_access_block resource",
    },
    {
        "control_id": "CIS 2.1.1",
        "title": "S3 Server-Side Encryption",
        "resource_type": "aws_s3_bucket",
        "check": lambda r: len(r.get("server_side_encryption_configuration", [])) > 0,
        "severity": "HIGH",
        "remediation": "Add server_side_encryption_configuration block with AES256 or aws:kms",
    },
    {
        "control_id": "CIS 2.1.3",
        "title": "S3 Access Logging",
        "resource_type": "aws_s3_bucket",
        "check": lambda r: len(r.get("logging", [])) > 0,
        "severity": "MEDIUM",
        "remediation": "Add logging block pointing to a separate access logs bucket",
    },
    {
        "control_id": "CIS 2.3.1",
        "title": "RDS Encryption at Rest",
        "resource_type": "aws_rds_instance",
        "check": lambda r: r.get("storage_encrypted") is True,
        "severity": "HIGH",
        "remediation": "Set storage_encrypted = true (requires recreating the instance)",
    },
    {
        "control_id": "CIS 2.3.2",
        "title": "RDS No Public Access",
        "resource_type": "aws_rds_instance",
        "check": lambda r: r.get("publicly_accessible") is not True,
        "severity": "CRITICAL",
        "remediation": "Set publicly_accessible = false and use private subnets",
    },
    {
        "control_id": "CIS 2.3.3",
        "title": "RDS Automated Backups",
        "resource_type": "aws_rds_instance",
        "check": lambda r: r.get("backup_retention_period", 0) >= 7,
        "severity": "HIGH",
        "remediation": "Set backup_retention_period = 7 (minimum) or higher",
    },
    {
        "control_id": "CIS 5.2",
        "title": "No SSH Open to 0.0.0.0/0",
        "resource_type": "aws_security_group",
        "check": lambda r: not any(
            rule.get("from_port") == 22 and "0.0.0.0/0" in rule.get("cidr_blocks", [])
            for rule in r.get("ingress", [])
        ),
        "severity": "CRITICAL",
        "remediation": "Restrict SSH to specific IP ranges or use AWS Systems Manager Session Manager",
    },
]


def parse_terraform_plan(plan_file: str) -> dict:
    try:
        with open(plan_file) as f:
            plan = json.load(f)
        changes = plan.get("resource_changes", [])
        return {"resource_changes": changes, "total": len(changes)}
    except Exception:
        return {"resource_changes": MOCK_PLAN["resource_changes"],
                "note": "Mock plan data (no plan file provided)"}


def read_terraform_files(directory: str) -> dict:
    tf_files = {}
    try:
        for fname in os.listdir(directory):
            if fname.endswith(".tf"):
                with open(os.path.join(directory, fname)) as f:
                    tf_files[fname] = f.read()
    except Exception:
        tf_files = {"main.tf": "# No .tf files found in directory — using mock data"}
    return {"files": tf_files, "count": len(tf_files)}


def check_cis_controls(resources: list) -> dict:
    findings = []
    for resource in resources:
        rtype = resource.get("type", "")
        config = resource.get("change", {}).get("after", {})
        for control in CIS_CONTROLS:
            if control["resource_type"] == rtype:
                passed = control["check"](config)
                if not passed:
                    findings.append({
                        "control_id": control["control_id"],
                        "title": control["title"],
                        "resource": resource.get("address"),
                        "severity": control["severity"],
                        "remediation": control["remediation"],
                        "status": "FAIL",
                    })
    return {"findings": findings, "total_failures": len(findings)}


def check_resource_encryption(resource_type: str, resource_config: dict) -> dict:
    encryption_attrs = {
        "aws_s3_bucket": "server_side_encryption_configuration",
        "aws_rds_instance": "storage_encrypted",
        "aws_ebs_volume": "encrypted",
        "aws_dynamodb_table": "server_side_encryption",
    }
    attr = encryption_attrs.get(resource_type)
    if not attr:
        return {"encrypted": None, "note": f"No encryption check defined for {resource_type}"}
    value = resource_config.get(attr)
    encrypted = bool(value) if value is not None else False
    return {
        "resource_type": resource_type,
        "encrypted": encrypted,
        "attribute": attr,
        "severity": "HIGH" if not encrypted else "PASS",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "parse_terraform_plan": parse_terraform_plan,
        "read_terraform_files": read_terraform_files,
        "check_cis_controls": check_cis_controls,
        "check_resource_encryption": check_resource_encryption,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_iac_review(plan_file: str = None, tf_dir: str = None):
    client = anthropic.Anthropic()

    context = f"Terraform plan file: {plan_file}" if plan_file else f"Terraform directory: {tf_dir or 'mock data'}"

    messages = [
        {
            "role": "user",
            "content": (
                f"You are an IaC security auditor. {context}\n\n"
                "1. Parse the Terraform plan to identify resources being created or modified.\n"
                "2. Run CIS Benchmark checks against all resources.\n"
                "3. For each failed control, describe the risk and provide the specific Terraform fix.\n"
                "4. Produce a prioritized report: CRITICAL misconfigurations first, then HIGH, then MEDIUM."
            ),
        }
    ]

    print("Starting IaC security review...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=IAC_TOOLS,
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
                    print("\n── IaC SECURITY REVIEW REPORT ────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--plan-file", help="Terraform plan JSON file")
    parser.add_argument("--tf-dir", help="Directory containing .tf files")
    args = parser.parse_args()
    run_iac_review(plan_file=args.plan_file, tf_dir=args.tf_dir)
