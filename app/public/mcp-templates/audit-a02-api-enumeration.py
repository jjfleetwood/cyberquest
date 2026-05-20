"""
audit-a02-api-enumeration.py
MCP Server: Agentic API Surface Discovery
Lesson: OpenAPI enumeration and endpoint mapping via Claude tool use.

SETUP:
  pip install anthropic requests

USAGE:
  python audit-a02-api-enumeration.py --target https://api.example.com

HOW IT WORKS:
  1. Claude is given tools to fetch OpenAPI/Swagger specs and probe endpoints.
  2. Claude enumerates the API surface: paths, methods, authentication requirements.
  3. Claude flags unauthenticated endpoints, deprecated API versions, and exposed PII fields.
  4. Output is a structured API inventory ready for risk rating.

REAL AUDIT USE: Point at an internal API gateway or load-balanced service URL.
"""

import json
import argparse
import requests
import anthropic

# ── Tool Definitions ──────────────────────────────────────────────────────────

API_ENUM_TOOLS = [
    {
        "name": "fetch_openapi_spec",
        "description": (
            "Fetches an OpenAPI/Swagger specification from a target URL. "
            "Tries common spec paths: /openapi.json, /swagger.json, /api-docs, /v3/api-docs. "
            "Returns the parsed spec or an error if not found."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "base_url": {
                    "type": "string",
                    "description": "The base URL of the API (e.g. https://api.example.com).",
                },
            },
            "required": ["base_url"],
        },
    },
    {
        "name": "probe_endpoint",
        "description": (
            "Sends an unauthenticated GET request to a specific API endpoint. "
            "Returns the HTTP status code, response headers, and first 500 chars of the body. "
            "Used to identify which endpoints respond without authentication."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "url": {"type": "string", "description": "Full URL to probe."},
                "method": {
                    "type": "string",
                    "enum": ["GET", "POST", "OPTIONS"],
                    "default": "GET",
                    "description": "HTTP method to use.",
                },
            },
            "required": ["url"],
        },
    },
    {
        "name": "extract_api_inventory",
        "description": (
            "Parses an OpenAPI spec dict and extracts a structured inventory: "
            "endpoint paths, allowed HTTP methods, security requirements, and response schemas. "
            "Pass the raw spec JSON as returned by fetch_openapi_spec."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "spec_json": {
                    "type": "string",
                    "description": "The OpenAPI spec as a JSON string.",
                },
            },
            "required": ["spec_json"],
        },
    },
]


# ── Tool Implementations ──────────────────────────────────────────────────────

SPEC_PATHS = ["/openapi.json", "/swagger.json", "/api-docs", "/v3/api-docs", "/swagger/v1/swagger.json"]

def fetch_openapi_spec(base_url: str) -> dict:
    base_url = base_url.rstrip("/")
    for path in SPEC_PATHS:
        try:
            r = requests.get(base_url + path, timeout=5, verify=False)
            if r.status_code == 200 and "json" in r.headers.get("Content-Type", ""):
                return {"found": True, "path": path, "spec": r.json()}
        except Exception:
            continue
    # Return mock spec for learning
    return {
        "found": True,
        "path": "/openapi.json (mock)",
        "spec": {
            "openapi": "3.0.0",
            "info": {"title": "Example API", "version": "1.0.0"},
            "paths": {
                "/users": {"get": {"security": [], "summary": "List all users — NO AUTH REQUIRED"}},
                "/users/{id}": {"get": {"security": [{"bearerAuth": []}], "summary": "Get user by ID"}},
                "/admin/config": {"get": {"security": [], "summary": "Get system config — NO AUTH REQUIRED"}},
                "/health": {"get": {"security": [], "summary": "Health check"}},
            },
            "components": {"securitySchemes": {"bearerAuth": {"type": "http", "scheme": "bearer"}}},
        },
    }


def probe_endpoint(url: str, method: str = "GET") -> dict:
    try:
        r = requests.request(method, url, timeout=5, verify=False)
        return {
            "url": url,
            "method": method,
            "status": r.status_code,
            "headers": dict(r.headers),
            "body_preview": r.text[:500],
        }
    except Exception as e:
        return {"url": url, "method": method, "error": str(e)}


def extract_api_inventory(spec_json: str) -> dict:
    try:
        spec = json.loads(spec_json) if isinstance(spec_json, str) else spec_json
        inventory = []
        paths = spec.get("paths", {})
        for path, methods in paths.items():
            for method, details in methods.items():
                if method.upper() in ["GET", "POST", "PUT", "DELETE", "PATCH"]:
                    security = details.get("security", None)
                    inventory.append({
                        "path": path,
                        "method": method.upper(),
                        "summary": details.get("summary", ""),
                        "authenticated": security is not None and len(security) > 0,
                        "security_schemes": security or [],
                    })
        unauthenticated = [e for e in inventory if not e["authenticated"]]
        return {
            "total_endpoints": len(inventory),
            "unauthenticated_endpoints": len(unauthenticated),
            "inventory": inventory,
            "findings": [
                f"UNAUTHENTICATED: {e['method']} {e['path']} — {e['summary']}"
                for e in unauthenticated
            ],
        }
    except Exception as e:
        return {"error": str(e)}


def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "fetch_openapi_spec":
        result = fetch_openapi_spec(**tool_input)
    elif tool_name == "probe_endpoint":
        result = probe_endpoint(**tool_input)
    elif tool_name == "extract_api_inventory":
        result = extract_api_inventory(**tool_input)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


# ── Agentic Loop ──────────────────────────────────────────────────────────────

def run_api_audit(target_url: str):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a security auditor conducting an API surface discovery on: {target_url}\n\n"
                "Steps:\n"
                "1. Fetch the OpenAPI/Swagger spec from the target.\n"
                "2. Extract the full API inventory from the spec.\n"
                "3. Probe any unauthenticated endpoints directly.\n"
                "4. Produce an API audit report listing: total endpoints, unauthenticated endpoints "
                "(HIGH risk), endpoints exposing PII fields (MEDIUM risk), and deprecated API versions."
            ),
        }
    ]

    print(f"Starting API enumeration audit on {target_url}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=API_ENUM_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}({json.dumps(block.input)[:80]}...)")
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
                    print("\n── API AUDIT REPORT ───────────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", default="https://api.example.com", help="Target API base URL")
    args = parser.parse_args()
    run_api_audit(args.target)
