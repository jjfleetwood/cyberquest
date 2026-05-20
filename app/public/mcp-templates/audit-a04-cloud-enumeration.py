"""
audit-a04-cloud-enumeration.py
MCP Server: Automated AWS Cloud Resource Enumeration
Lesson: Using boto3 + Claude to map your AWS attack surface.

SETUP:
  pip install anthropic boto3

CONFIGURE AWS:
  aws configure  (or set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION)

USAGE:
  python audit-a04-cloud-enumeration.py
  python audit-a04-cloud-enumeration.py --region us-west-2

HOW IT WORKS:
  1. Claude is given tools that wrap boto3 calls.
  2. Claude decides which services to enumerate based on the audit scope.
  3. Results are fed back to Claude, which reasons about risk and produces findings.
  4. This pattern works for any cloud provider (Azure, GCP) by swapping the tool implementations.

REAL AUDIT USE: Run with an IAM role that has ReadOnlyAccess — never audit with admin credentials.
"""

import json
import argparse
import boto3
import anthropic

CLOUD_ENUM_TOOLS = [
    {
        "name": "list_s3_buckets",
        "description": "Lists all S3 buckets in the account with their creation dates and regions.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "check_s3_bucket_acl",
        "description": (
            "Checks the ACL and public access settings for a specific S3 bucket. "
            "Returns whether the bucket is publicly readable, publicly writable, or private."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "bucket_name": {"type": "string", "description": "Name of the S3 bucket to check."},
            },
            "required": ["bucket_name"],
        },
    },
    {
        "name": "list_ec2_instances",
        "description": "Lists EC2 instances with their state, instance type, public IP, and security groups.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "description": "AWS region (e.g. us-east-1)."},
            },
            "required": ["region"],
        },
    },
    {
        "name": "list_security_groups",
        "description": (
            "Lists EC2 security groups and their inbound rules. "
            "Flags groups with 0.0.0.0/0 (open to internet) rules."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "description": "AWS region."},
            },
            "required": ["region"],
        },
    },
    {
        "name": "list_iam_users",
        "description": "Lists IAM users with their creation dates, last login, and MFA status.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "check_cloudtrail_status",
        "description": "Checks if CloudTrail logging is enabled and if log file validation is active.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "description": "AWS region."},
            },
            "required": ["region"],
        },
    },
]


def list_s3_buckets() -> dict:
    try:
        s3 = boto3.client("s3")
        response = s3.list_buckets()
        return {"buckets": [
            {"name": b["Name"], "created": b["CreationDate"].isoformat()}
            for b in response.get("Buckets", [])
        ]}
    except Exception:
        return {"buckets": [
            {"name": "audit-logs-prod", "created": "2024-01-15"},
            {"name": "public-assets", "created": "2024-02-20"},
            {"name": "backup-2024", "created": "2024-03-01"},
        ], "note": "Mock data — configure AWS credentials for live enumeration"}


def check_s3_bucket_acl(bucket_name: str) -> dict:
    try:
        s3 = boto3.client("s3")
        acl = s3.get_bucket_acl(Bucket=bucket_name)
        public_access = s3.get_public_access_block(Bucket=bucket_name)
        is_public = any(
            grant["Grantee"].get("URI", "").endswith("AllUsers")
            for grant in acl.get("Grants", [])
        )
        return {
            "bucket": bucket_name,
            "is_public": is_public,
            "public_access_block": public_access.get("PublicAccessBlockConfiguration", {}),
        }
    except Exception:
        # Mock: simulate one publicly accessible bucket
        if "public" in bucket_name:
            return {"bucket": bucket_name, "is_public": True, "severity": "CRITICAL",
                    "finding": "Bucket is publicly readable — potential data exposure"}
        return {"bucket": bucket_name, "is_public": False}


def list_ec2_instances(region: str) -> dict:
    try:
        ec2 = boto3.client("ec2", region_name=region)
        response = ec2.describe_instances()
        instances = []
        for reservation in response["Reservations"]:
            for i in reservation["Instances"]:
                instances.append({
                    "id": i["InstanceId"],
                    "state": i["State"]["Name"],
                    "type": i["InstanceType"],
                    "public_ip": i.get("PublicIpAddress"),
                    "security_groups": [sg["GroupId"] for sg in i.get("SecurityGroups", [])],
                })
        return {"region": region, "instances": instances, "count": len(instances)}
    except Exception:
        return {
            "region": region,
            "instances": [
                {"id": "i-0abc123", "state": "running", "type": "t3.medium",
                 "public_ip": "54.234.12.88", "security_groups": ["sg-00aa11bb"]},
                {"id": "i-0def456", "state": "running", "type": "t3.large",
                 "public_ip": None, "security_groups": ["sg-00cc22dd"]},
            ],
            "note": "Mock data",
        }


def list_security_groups(region: str) -> dict:
    try:
        ec2 = boto3.client("ec2", region_name=region)
        response = ec2.describe_security_groups()
        groups = []
        for sg in response["SecurityGroups"]:
            open_rules = [
                rule for rule in sg.get("IpPermissions", [])
                if any(r.get("CidrIp") == "0.0.0.0/0" for r in rule.get("IpRanges", []))
            ]
            groups.append({
                "id": sg["GroupId"],
                "name": sg["GroupName"],
                "open_to_internet": len(open_rules) > 0,
                "open_ports": [r.get("FromPort") for r in open_rules],
            })
        return {"region": region, "security_groups": groups}
    except Exception:
        return {
            "region": region,
            "security_groups": [
                {"id": "sg-00aa11bb", "name": "web-sg", "open_to_internet": True, "open_ports": [80, 443, 22]},
                {"id": "sg-00cc22dd", "name": "db-sg", "open_to_internet": False, "open_ports": []},
            ],
            "note": "Mock data — sg-00aa11bb has SSH (port 22) open to 0.0.0.0/0 — CRITICAL finding",
        }


def list_iam_users() -> dict:
    try:
        iam = boto3.client("iam")
        users = iam.list_users()["Users"]
        result = []
        for user in users:
            try:
                mfa = iam.list_mfa_devices(UserName=user["UserName"])["MFADevices"]
                has_mfa = len(mfa) > 0
            except Exception:
                has_mfa = None
            result.append({
                "username": user["UserName"],
                "created": user["CreateDate"].isoformat(),
                "last_used": user.get("PasswordLastUsed", "Never"),
                "mfa_enabled": has_mfa,
            })
        return {"users": result}
    except Exception:
        return {
            "users": [
                {"username": "admin", "created": "2024-01-01", "last_used": "2026-05-18", "mfa_enabled": True},
                {"username": "ci-deploy", "created": "2024-02-01", "last_used": "2026-05-19", "mfa_enabled": False},
                {"username": "legacy-user", "created": "2022-06-01", "last_used": "2024-12-01", "mfa_enabled": False},
            ],
            "note": "Mock data — ci-deploy and legacy-user have no MFA",
        }


def check_cloudtrail_status(region: str) -> dict:
    try:
        ct = boto3.client("cloudtrail", region_name=region)
        trails = ct.describe_trails()["trailList"]
        return {"trails": [
            {
                "name": t["Name"],
                "is_logging": ct.get_trail_status(Name=t["TrailARN"])["IsLogging"],
                "log_validation": t.get("LogFileValidationEnabled", False),
                "multi_region": t.get("IsMultiRegionTrail", False),
            }
            for t in trails
        ]}
    except Exception:
        return {
            "trails": [
                {"name": "management-events", "is_logging": True, "log_validation": False, "multi_region": False},
            ],
            "note": "Mock data — log file validation disabled (tamper risk), single region only",
        }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "list_s3_buckets": list_s3_buckets,
        "check_s3_bucket_acl": check_s3_bucket_acl,
        "list_ec2_instances": list_ec2_instances,
        "list_security_groups": list_security_groups,
        "list_iam_users": list_iam_users,
        "check_cloudtrail_status": check_cloudtrail_status,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_cloud_audit(region: str = "us-east-1"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a cloud security auditor. Perform a comprehensive AWS security assessment "
                f"in region {region}.\n\n"
                "Enumerate and assess:\n"
                "1. S3 buckets — check each for public access\n"
                "2. EC2 instances — note public IPs and security groups\n"
                "3. Security groups — flag any with 0.0.0.0/0 open ports\n"
                "4. IAM users — flag users without MFA\n"
                "5. CloudTrail — verify logging is enabled and tamper-proof\n\n"
                "Produce a risk-rated finding report: CRITICAL → HIGH → MEDIUM, with remediation steps."
            ),
        }
    ]

    print(f"Starting AWS cloud enumeration in {region}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=CLOUD_ENUM_TOOLS,
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
                    print("\n── CLOUD SECURITY REPORT ──────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--region", default="us-east-1")
    args = parser.parse_args()
    run_cloud_audit(args.region)
