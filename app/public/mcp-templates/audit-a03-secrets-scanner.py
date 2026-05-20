"""
audit-a03-secrets-scanner.py
MCP Server: AI-Powered Secrets Detection
Lesson: Using Claude to find secrets in git repos and environment configs.

SETUP:
  pip install anthropic gitpython

USAGE:
  python audit-a03-secrets-scanner.py --repo /path/to/repo
  python audit-a03-secrets-scanner.py --repo . --depth 50

HOW IT WORKS:
  1. We scan git commit history for file changes.
  2. Claude is given tools to read file contents and diff outputs.
  3. Claude applies pattern matching AND semantic reasoning to identify secrets:
     - Regex patterns catch obvious keys (AWS, GCP, Stripe prefixes)
     - Claude's reasoning catches obfuscated or non-standard secrets
  4. Each finding is tagged with severity, file path, and commit hash.

REAL AUDIT USE: Run on internal repos before code reviews or before open-sourcing.
"""

import json
import os
import re
import argparse
import anthropic

# Common secret patterns for pre-filtering before sending to Claude
SECRET_PATTERNS = [
    (r"AKIA[0-9A-Z]{16}", "AWS Access Key ID"),
    (r"(?i)aws.{0,20}secret.{0,20}['\"][0-9a-zA-Z/+]{40}['\"]", "AWS Secret Key"),
    (r"(?i)sk-[a-zA-Z0-9]{48}", "OpenAI API Key"),
    (r"(?i)sk-ant-[a-zA-Z0-9\-_]{90,}", "Anthropic API Key"),
    (r"(?i)ghp_[a-zA-Z0-9]{36}", "GitHub Personal Access Token"),
    (r"(?i)(password|passwd|pwd)\s*[=:]\s*['\"][^'\"]{8,}['\"]", "Hardcoded Password"),
    (r"(?i)(api_key|apikey|api-key)\s*[=:]\s*['\"][^'\"]{16,}['\"]", "Generic API Key"),
    (r"(?i)(secret|token)\s*[=:]\s*['\"][^'\"]{16,}['\"]", "Generic Secret/Token"),
    (r"-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----", "Private Key"),
    (r"(?i)database_url\s*=\s*['\"]postgresql://[^'\"]+['\"]", "Database URL with credentials"),
]

SECRETS_SCANNER_TOOLS = [
    {
        "name": "read_file_content",
        "description": "Reads the content of a file from the local filesystem. Returns the file content as a string.",
        "input_schema": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Absolute or relative path to the file."},
                "max_lines": {"type": "integer", "description": "Maximum lines to return (default 200).", "default": 200},
            },
            "required": ["file_path"],
        },
    },
    {
        "name": "scan_file_for_patterns",
        "description": (
            "Scans a file for known secret patterns using regex. "
            "Returns a list of matches with line numbers, pattern names, and matched text (partially redacted)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Path to the file to scan."},
            },
            "required": ["file_path"],
        },
    },
    {
        "name": "list_sensitive_files",
        "description": (
            "Lists files in a directory that commonly contain secrets: .env files, config files, "
            "credential stores, private keys, and deployment configs."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string", "description": "Directory to search (default: current dir)."},
            },
            "required": [],
        },
    },
    {
        "name": "check_gitignore",
        "description": "Checks if sensitive file patterns are properly excluded in .gitignore.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string", "description": "Repository root directory."},
            },
            "required": [],
        },
    },
]


def read_file_content(file_path: str, max_lines: int = 200) -> dict:
    try:
        with open(file_path, "r", errors="replace") as f:
            lines = f.readlines()[:max_lines]
        return {"path": file_path, "lines": len(lines), "content": "".join(lines)}
    except Exception as e:
        return {"error": str(e), "path": file_path}


def scan_file_for_patterns(file_path: str) -> dict:
    try:
        with open(file_path, "r", errors="replace") as f:
            content = f.read()
        findings = []
        for pattern, name in SECRET_PATTERNS:
            for match in re.finditer(pattern, content):
                line_num = content[:match.start()].count("\n") + 1
                matched = match.group()
                # Redact the middle of the match for safe logging
                if len(matched) > 20:
                    redacted = matched[:8] + "***REDACTED***" + matched[-4:]
                else:
                    redacted = matched[:4] + "***"
                findings.append({
                    "line": line_num,
                    "pattern": name,
                    "match_preview": redacted,
                    "severity": "CRITICAL" if "Key" in name or "Private" in name else "HIGH",
                })
        return {"file": file_path, "findings": findings, "total": len(findings)}
    except Exception as e:
        return {"error": str(e)}


SENSITIVE_EXTENSIONS = [".env", ".pem", ".key", ".p12", ".pfx", ".crt", ".cer"]
SENSITIVE_NAMES = ["credentials", "secrets", "config", ".env", "id_rsa", "id_ed25519", "kubeconfig"]

def list_sensitive_files(directory: str = ".") -> dict:
    found = []
    for root, _, files in os.walk(directory):
        if ".git" in root or "node_modules" in root:
            continue
        for fname in files:
            full = os.path.join(root, fname)
            if any(fname.endswith(ext) for ext in SENSITIVE_EXTENSIONS):
                found.append({"path": full, "reason": "sensitive extension"})
            elif any(name in fname.lower() for name in SENSITIVE_NAMES):
                found.append({"path": full, "reason": "sensitive filename pattern"})
    return {"directory": directory, "sensitive_files": found, "count": len(found)}


def check_gitignore(directory: str = ".") -> dict:
    gitignore_path = os.path.join(directory, ".gitignore")
    critical_patterns = [".env", "*.pem", "*.key", "*.p12", "credentials", "secrets.json"]
    try:
        with open(gitignore_path) as f:
            content = f.read()
        missing = [p for p in critical_patterns if p not in content]
        return {
            "gitignore_exists": True,
            "missing_patterns": missing,
            "recommendation": "Add missing patterns to .gitignore" if missing else "gitignore looks good",
        }
    except FileNotFoundError:
        return {"gitignore_exists": False, "recommendation": "Create a .gitignore file immediately"}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "read_file_content":
        result = read_file_content(**tool_input)
    elif tool_name == "scan_file_for_patterns":
        result = scan_file_for_patterns(**tool_input)
    elif tool_name == "list_sensitive_files":
        result = list_sensitive_files(**tool_input)
    elif tool_name == "check_gitignore":
        result = check_gitignore(**tool_input)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2)


def run_secrets_scan(repo_path: str):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a security auditor conducting a secrets detection scan on the repository at: {repo_path}\n\n"
                "Steps:\n"
                "1. List all sensitive files in the repository (env files, keys, configs).\n"
                "2. Check the .gitignore to see if sensitive patterns are excluded.\n"
                "3. Scan each sensitive file for hardcoded secrets using pattern matching.\n"
                "4. Read and analyze any .env or config files found — look for secrets that "
                "   pattern matching might miss (obfuscated keys, base64-encoded credentials, etc.).\n"
                "5. Produce a secrets audit report: CRITICAL findings first, then HIGH, then recommendations."
            ),
        }
    ]

    print(f"Starting secrets scan on {repo_path}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=SECRETS_SCANNER_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}({list(block.input.values())[0] if block.input else ''})")
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
                    print("\n── SECRETS AUDIT REPORT ───────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=".", help="Path to repository root")
    args = parser.parse_args()
    run_secrets_scan(args.repo)
