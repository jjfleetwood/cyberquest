"""
audit-a06-mcp-integration.py
MCP Server: Filesystem + Git + Web Fetch Tools for Comprehensive Audit Data Collection
Lesson: How to build a multi-tool MCP server that connects local data, version control, and web sources.

SETUP:
  pip install anthropic gitpython requests

USAGE:
  python audit-a06-mcp-integration.py --target-dir /path/to/project

HOW IT WORKS:
  This script demonstrates a fuller MCP integration with three categories of tools:
  1. FILESYSTEM TOOLS — read local files, list directories, search file contents
  2. GIT TOOLS — inspect commit history, diff changes, list contributors
  3. WEB FETCH TOOLS — retrieve CVE details, check package vulnerabilities

  Claude orchestrates all three to produce a comprehensive project security audit:
  - Who changed what, when?
  - What secrets or issues exist in the current codebase?
  - Are any dependencies known-vulnerable?
"""

import json
import os
import subprocess
import argparse
import requests
import anthropic

MCP_TOOLS = [
    # ── Filesystem Tools ──────────────────────────────────────────────────────
    {
        "name": "fs_list_directory",
        "description": "Lists files and subdirectories in a given path. Returns names, sizes, and modification times.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Directory path to list."},
                "include_hidden": {"type": "boolean", "description": "Include hidden files (default false)."},
            },
            "required": ["path"],
        },
    },
    {
        "name": "fs_read_file",
        "description": "Reads the content of a text file. Returns the content as a string (max 3000 chars).",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "File path to read."},
            },
            "required": ["path"],
        },
    },
    {
        "name": "fs_search_files",
        "description": "Recursively searches files in a directory for a pattern (grep-style). Returns matching lines with file paths.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string"},
                "pattern": {"type": "string", "description": "Search pattern (substring match)."},
                "file_extension": {"type": "string", "description": "Filter by extension e.g. '.py' (optional)."},
            },
            "required": ["directory", "pattern"],
        },
    },
    # ── Git Tools ─────────────────────────────────────────────────────────────
    {
        "name": "git_log",
        "description": "Returns the last N git commits with author, date, and message.",
        "input_schema": {
            "type": "object",
            "properties": {
                "repo_path": {"type": "string"},
                "max_commits": {"type": "integer", "default": 20},
            },
            "required": ["repo_path"],
        },
    },
    {
        "name": "git_diff_file",
        "description": "Shows the diff of a specific file between two commits (or HEAD vs previous).",
        "input_schema": {
            "type": "object",
            "properties": {
                "repo_path": {"type": "string"},
                "file_path": {"type": "string"},
                "commit_a": {"type": "string", "default": "HEAD~1"},
                "commit_b": {"type": "string", "default": "HEAD"},
            },
            "required": ["repo_path", "file_path"],
        },
    },
    # ── Web Fetch Tools ───────────────────────────────────────────────────────
    {
        "name": "fetch_cve_details",
        "description": "Fetches details about a CVE from the NVD API. Returns CVSS score, description, and affected products.",
        "input_schema": {
            "type": "object",
            "properties": {
                "cve_id": {"type": "string", "description": "CVE ID e.g. CVE-2021-44228"},
            },
            "required": ["cve_id"],
        },
    },
    {
        "name": "check_npm_audit",
        "description": "Runs npm audit in a directory and returns vulnerability summary.",
        "input_schema": {
            "type": "object",
            "properties": {
                "project_path": {"type": "string", "description": "Path to the npm project."},
            },
            "required": ["project_path"],
        },
    },
]


def fs_list_directory(path: str, include_hidden: bool = False) -> dict:
    try:
        entries = []
        for entry in os.scandir(path):
            if not include_hidden and entry.name.startswith("."):
                continue
            stat = entry.stat()
            entries.append({
                "name": entry.name,
                "is_dir": entry.is_dir(),
                "size": stat.st_size,
                "modified": stat.st_mtime,
            })
        return {"path": path, "entries": entries, "count": len(entries)}
    except Exception as e:
        return {"error": str(e)}


def fs_read_file(path: str) -> dict:
    try:
        with open(path, "r", errors="replace") as f:
            content = f.read(3000)
        return {"path": path, "content": content, "truncated": len(content) >= 3000}
    except Exception as e:
        return {"error": str(e)}


def fs_search_files(directory: str, pattern: str, file_extension: str = None) -> dict:
    matches = []
    try:
        for root, _, files in os.walk(directory):
            if ".git" in root or "node_modules" in root:
                continue
            for fname in files:
                if file_extension and not fname.endswith(file_extension):
                    continue
                fpath = os.path.join(root, fname)
                try:
                    with open(fpath, "r", errors="replace") as f:
                        for i, line in enumerate(f, 1):
                            if pattern.lower() in line.lower():
                                matches.append({"file": fpath, "line": i, "content": line.rstrip()})
                except Exception:
                    continue
    except Exception as e:
        return {"error": str(e)}
    return {"pattern": pattern, "matches": matches[:50], "total": len(matches)}


def git_log(repo_path: str, max_commits: int = 20) -> dict:
    try:
        result = subprocess.run(
            ["git", "log", f"--max-count={max_commits}", "--pretty=format:%H|%an|%ae|%ad|%s"],
            cwd=repo_path, capture_output=True, text=True,
        )
        commits = []
        for line in result.stdout.strip().split("\n"):
            if "|" in line:
                parts = line.split("|", 4)
                commits.append({"hash": parts[0], "author": parts[1], "email": parts[2],
                                 "date": parts[3], "message": parts[4] if len(parts) > 4 else ""})
        return {"commits": commits, "count": len(commits)}
    except Exception as e:
        return {"error": str(e)}


def git_diff_file(repo_path: str, file_path: str, commit_a: str = "HEAD~1", commit_b: str = "HEAD") -> dict:
    try:
        result = subprocess.run(
            ["git", "diff", commit_a, commit_b, "--", file_path],
            cwd=repo_path, capture_output=True, text=True,
        )
        return {"diff": result.stdout[:3000], "file": file_path}
    except Exception as e:
        return {"error": str(e)}


def fetch_cve_details(cve_id: str) -> dict:
    try:
        url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?cveId={cve_id}"
        r = requests.get(url, timeout=10)
        data = r.json()
        vuln = data["vulnerabilities"][0]["cve"]
        desc = vuln["descriptions"][0]["value"] if vuln.get("descriptions") else "N/A"
        metrics = vuln.get("metrics", {})
        cvss = None
        if "cvssMetricV31" in metrics:
            cvss = metrics["cvssMetricV31"][0]["cvssData"]["baseScore"]
        return {"cve_id": cve_id, "description": desc[:500], "cvss_score": cvss}
    except Exception:
        return {
            "cve_id": cve_id,
            "description": "Mock: Remote code execution via JNDI injection in log messages.",
            "cvss_score": 10.0,
            "note": "Live NVD fetch failed — mock data returned",
        }


def check_npm_audit(project_path: str) -> dict:
    try:
        result = subprocess.run(
            ["npm", "audit", "--json"],
            cwd=project_path, capture_output=True, text=True,
        )
        data = json.loads(result.stdout)
        return {
            "vulnerabilities": data.get("metadata", {}).get("vulnerabilities", {}),
            "total": data.get("metadata", {}).get("vulnerabilities", {}).get("total", 0),
        }
    except Exception as e:
        return {"note": f"npm audit not available: {e}"}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "fs_list_directory": fs_list_directory,
        "fs_read_file": fs_read_file,
        "fs_search_files": fs_search_files,
        "git_log": git_log,
        "git_diff_file": git_diff_file,
        "fetch_cve_details": fetch_cve_details,
        "check_npm_audit": check_npm_audit,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_comprehensive_audit(target_dir: str):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a security auditor conducting a comprehensive project security review on: {target_dir}\n\n"
                "Use the available tools to:\n"
                "1. List the directory structure to understand the project layout.\n"
                "2. Read key config files: package.json, requirements.txt, .env.example, Dockerfile.\n"
                "3. Search for hardcoded secrets ('password', 'api_key', 'secret', 'token').\n"
                "4. Review the git log — who recently committed? Any suspicious commit messages?\n"
                "5. Run npm audit if it's a Node.js project.\n"
                "6. Produce a comprehensive security report with findings by severity."
            ),
        }
    ]

    print(f"Starting comprehensive audit of {target_dir}...\n")

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            tools=MCP_TOOLS,
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
                    print("\n── COMPREHENSIVE AUDIT REPORT ─────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--target-dir", default=".", help="Project directory to audit")
    args = parser.parse_args()
    run_comprehensive_audit(args.target_dir)
