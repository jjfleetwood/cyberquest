import type { StageConfig, EpochConfig } from "./types";

export const techAudit3Epoch: EpochConfig = {
  id: "tech-audit-3",
  name: "Tech Audit: Agentic Continuous Monitoring",
  subtitle: "Automated Audit with Claude Tools",
  description: "Automate the full audit lifecycle using Claude's tool use API and MCP servers — agentic API enumeration, AI-powered secrets scanning, automated compliance report generation, and multi-agent audit pipeline design.",
  emoji: "🤖",
  color: "indigo",
  unlocked: true,
};

export const techAudit3Stages: StageConfig[] = [
  // ─── audit-a01: Claude Tool Use Basics ───────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Anthropic HQ", location: "San Francisco, California", era: "Present Day", emoji: "🧪" },
    id: "audit-a01",
    order: 1,
    title: "Tools as Audit Instruments",
    subtitle: "Claude Tool Use Basics — defining tools for audit tasks",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-01", name: "Tool Architect", emoji: "🔧" },
    challengeType: "ctf",
    info: {
      tagline: "An AI auditor without tools is just a text generator. Tools give Claude hands.",
      year: 2024,
      overview: [
        "Claude's tool use API — also known as function calling — fundamentally transforms how AI systems interact with the real world. Instead of relying solely on training data to produce answers, Claude can invoke structured functions you define, receive the results, and reason over live system state. For security auditors this distinction is critical: hallucinated answers about your AWS configuration have zero audit value, but verified outputs from real API calls absolutely do.",
        "A tool definition is a JSON object with three components: a name that uniquely identifies the function, a description that Claude reads to decide when to invoke it, and an input_schema that follows JSON Schema to define what arguments the function accepts. Claude parses the descriptions at inference time — not at training time — which means you can define entirely new tools for entirely new systems and Claude will understand how and when to use them from the description alone.",
        "The agentic loop is the execution model behind every tool-using Claude agent. Your code sends a user message plus tool definitions to the API. Claude responds with either a text answer (if it can answer without tools) or a tool_use block containing the tool name and argument values it wants to call. Your code executes that tool call against the real system, packages the result as a tool_result message, and sends it back. Claude reads the result and either calls another tool or produces its final response. This loop repeats until Claude stops requesting tools.",
        "For audit automation, tools map directly onto audit procedures in a one-to-one correspondence. The manual step of opening the AWS Console and clicking through S3 bucket settings becomes a `list_s3_buckets` tool call. Manually reviewing a spreadsheet of IAM policies becomes a `check_iam_policy` tool call. Running a grep script across a repository becomes a `scan_repo_for_secrets` tool call. Each replacement brings three advantages: consistency (the tool executes identically every run), speed (API calls are orders of magnitude faster than human navigation), and repeatability (the same audit runs on every release with no additional labor).",
        "Tool descriptions are the single most important factor in tool use reliability. Claude uses them to make multi-step decisions: which tool addresses this information need, in what order should I call tools, do I have enough context to answer or should I call another tool? Vague descriptions produce erratic, unpredictable tool selection. Precise descriptions that specify what the tool returns, what conditions it's useful for, and what the output format looks like produce reliable, deterministic tool selection. Audit tool descriptions should read like entries in an API reference, not user-facing documentation.",
        "The security implications of agentic auditing extend beyond the audit itself. When you give Claude tools that can read configurations, query APIs, or scan repositories, you are creating an agent that acts on behalf of your organization with real system access. Least-privilege applies to AI agents exactly as it applies to human users: give each agent only the tools and permissions needed for its specific audit scope. An agent auditing S3 bucket configurations should not have IAM write permissions. An agent scanning a development repository should not have production database credentials.",
        "Modern audit teams face a fundamental capacity problem: the surface area of cloud infrastructure grows faster than the human workforce that can audit it. A team of five auditors cannot manually review the IAM policies of 500 roles, the network rules of 200 security groups, and the configurations of 300 S3 buckets every quarter. Tool-using Claude agents shift this equation: the auditor defines the audit logic once, and the agent executes it against any number of resources. Audit coverage scales with compute, not headcount.",
      ],
      technical: {
        title: "Tool Definition Pattern",
        body: [
          "Each tool definition follows a rigid JSON structure that the Anthropic API validates before sending to Claude. The `name` field must be unique within a tool set and use only alphanumeric characters and underscores — Claude uses it to reference the tool in its tool_use blocks. The `description` field is free-form text that Claude reads to understand the tool's purpose, inputs, outputs, and appropriate usage context. The `input_schema` follows JSON Schema draft-07 and defines the exact shape of arguments Claude can pass, including types, required fields, and descriptions for each property.",
          "The agentic loop implementation requires handling two response types from the API. When `stop_reason` is `tool_use`, the response content array contains one or more tool_use blocks, each with an `id`, `name`, and `input` object. Your code must execute each tool call and return a user message containing a `tool_result` content block with the matching `tool_use_id` and the result content. When `stop_reason` is `end_turn`, Claude has produced its final response and the loop terminates. Failing to handle tool errors properly — by returning an error message in the tool_result rather than throwing an exception — allows Claude to reason about failures and try alternative approaches.",
          "Input validation is a security-critical step that must happen in your tool implementation code, not in Claude's prompt. Claude is not a trusted system boundary — it is a reasoning engine that produces arguments based on its understanding of the task. A well-crafted user prompt, a prompt injection in retrieved content, or simply an ambiguous instruction can cause Claude to pass unexpected argument values. Your tool implementations must validate that bucket names match expected patterns, that resource ARNs are within the authorized scope, and that any write operations are explicitly permitted before executing. Treat Claude's tool call inputs with the same skepticism you would apply to external API inputs.",
          "Tool output design directly impacts Claude's reasoning quality. Return structured, machine-readable output — JSON objects with consistent field names — rather than narrative prose. Claude can extract information from either format, but structured output reduces the chance of misinterpretation and makes it easier to log and audit what the agent actually did. Include enough context in tool outputs for Claude to reason about the result: a finding of `{\"public_access\": true}` is less useful than `{\"bucket\": \"acme-prod\", \"public_access\": true, \"public_access_block_configured\": false, \"acl\": \"public-read\"}`. The richer the tool output, the better Claude's downstream analysis.",
          "Testing agentic audit tools requires a different mindset than testing conventional software. Unit tests verify that individual tool functions return correct outputs for given inputs. Integration tests verify that the full agentic loop — from user prompt through multiple tool calls to final response — produces expected findings for a known-state test environment. Red team tests verify that the agent behaves safely when given adversarial inputs: tool results containing prompt injection attempts, resource names that look like system instructions, or unexpectedly large response payloads. All three test types are essential before deploying an audit agent against production infrastructure.",
        ],
        codeExample: {
          label: "Minimal audit tool definition (Anthropic Python SDK)",
          code: `import anthropic

client = anthropic.Anthropic()

tools = [
  {
    "name": "check_s3_public_access",
    "description": "Check if an S3 bucket has public access enabled. Returns the bucket ACL and public access block settings.",
    "input_schema": {
      "type": "object",
      "properties": {
        "bucket_name": {"type": "string", "description": "The S3 bucket name to audit"}
      },
      "required": ["bucket_name"]
    }
  }
]

response = client.messages.create(
  model="claude-opus-4-7",
  max_tokens=1024,
  tools=tools,
  messages=[{"role": "user", "content": "Audit the acme-prod-data bucket for public access."}]
)

# If response.stop_reason == "tool_use", execute the tool and loop`,
        },
      },
      incident: {
        title: "Capital One Data Breach — Manual Process Failure (2019)",
        when: "March–July 2019",
        where: "AWS US-East-1",
        impact: "106 million customer records exposed; $190M settlement; SSRF via misconfigured WAF",
        body: [
          "The Capital One breach succeeded because a misconfigured AWS WAF allowed Server-Side Request Forgery (SSRF) requests to reach the EC2 Instance Metadata Service (IMDS), leaking the IAM credentials of the WAF's EC2 instance. Those credentials had far more S3 permissions than the WAF application required — `s3:ListAllMyBuckets` and `s3:GetObject` on Resource `*` rather than on the specific log bucket. The attacker listed all buckets, identified buckets containing customer data, and exfiltrated over 100 million records. The misconfiguration existed for months before the breach. Manual configuration review processes failed to catch it because WAF rules were complex, review was infrequent, and no automated tool continuously verified the expected configuration state.",
          "An agentic audit tool polling WAF configurations and IAM role permissions against a known-good baseline would have flagged the deviation within hours of its introduction. The tool would have checked: (1) the WAF's EC2 instance metadata service access settings, (2) the IAM role permissions attached to the WAF instance, and (3) whether the IAM permissions were scoped to the minimum required resources. All three deviations were detectable through standard AWS API calls. The Capital One breach is the canonical example of why agentic continuous auditing, not point-in-time manual review, is the correct security model for cloud environments.",
          "The regulatory response to the Capital One breach reshaped cloud security audit requirements across the financial services industry. The OCC imposed an $80M fine and the FTC a separate $190M consumer settlement. Both regulatory orders required Capital One to implement automated configuration monitoring — effectively mandating the kind of agentic audit tooling this course teaches. Compliance with the consent order required Capital One to build exactly the automated checking infrastructure that would have prevented the breach in the first place.",
          "The technical lesson extends beyond Capital One. SSRF vulnerabilities were common in 2019 and remain common today. The difference between a contained SSRF and a mega-breach is the IAM role attached to the compromised instance. Agentic IAM auditing — continuously verifying that every compute resource has least-privilege permissions — is the control that breaks the attack chain at the most impactful point. No tool can prevent SSRF vulnerabilities from being introduced; every team can continuously audit that IAM roles are scoped to the minimum required permissions.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Audit Prompt", sub: "user instruction", type: "attacker" },
          { label: "Claude + Tools", sub: "tool use API", type: "system" },
          { label: "Real Systems", sub: "AWS / APIs / files", type: "victim" },
          { label: "Findings Report", sub: "structured output", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "Anthropic releases tool use API — Claude can call external functions" },
        { year: 2024, event: "Tool use becomes standard pattern for agentic audit automation", highlight: true },
        { year: 2024, event: "MCP (Model Context Protocol) released — standardized tool server protocol" },
        { year: 2025, event: "Claude 4 series — improved tool selection accuracy and multi-step reasoning" },
      ],
      keyTakeaways: [
        "Tool descriptions drive Claude's tool selection — write them like API reference documentation, not user-facing help text",
        "The agentic loop: message → tool_use → tool_result → repeat until end_turn stop_reason",
        "Audit tools replace manual procedures with consistent, re-runnable checks that scale to thousands of resources",
        "Always validate tool inputs server-side — treat Claude's arguments with the same skepticism as external API inputs",
        "Least-privilege applies to AI agents: give each agent only the tools and permissions needed for its specific audit scope",
        "Structured JSON tool outputs produce more reliable Claude reasoning than narrative prose responses",
        "Test agentic loops with unit tests (tool functions), integration tests (full loop), and red team tests (adversarial inputs)",
        "The Capital One breach was preventable with automated IAM permission auditing — a direct application of tool-based audit agents",
        "Audit coverage scales with compute, not headcount, when tools replace manual procedures",
      ],
      references: [
        { title: "Anthropic Tool Use Documentation", url: "https://docs.anthropic.com/en/docs/tool-use" },
        { title: "Capital One Breach OCC Report", url: "https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-97.html" },
      ],
    },
    ctf: {
      scenario: "You have infiltrated Anthropic's internal audit lab. A researcher left a tool definition spec and partial audit agent code on the filesystem. Collect the three configuration fragments to reconstruct the master audit tool schema.",
      hint: "Read the tool spec files. The flag assembles from three fragments hidden in the configuration documents.",
      hints: [
        "Start with `ls` to see what files are in the current directory.",
        "The tool schema is split across three files — read each one carefully.",
        "Use `cat /audit-lab/tool-spec/fragment-c.json` for the final piece.",
      ],
      files: {
        "/audit-lab/tool-spec/fragment-a.json": `{
  "_fragment": "A/3",
  "_note": "Tool definition header fragment",
  "name": "check_iam_policy",
  "description": "Analyze an IAM policy document for overly permissive statements",
  "fragment_value": "FLAG{T00L_"
}`,
        "/audit-lab/tool-spec/fragment-b.json": `{
  "_fragment": "B/3",
  "_note": "Input schema fragment",
  "input_schema": {
    "type": "object",
    "properties": {
      "policy_json": {"type": "string"},
      "principal": {"type": "string"}
    },
    "required": ["policy_json"]
  },
  "fragment_value": "USE_4UD1T_"
}`,
        "/audit-lab/tool-spec/fragment-c.json": `{
  "_fragment": "C/3",
  "_note": "Output schema and assembly key",
  "returns": "findings array with severity ratings",
  "example_finding": "Action '*' with Resource '*' violates least privilege",
  "fragment_value": "P1PEL1NE}"
}`,
        "/audit-lab/README.md": `# Agentic Audit Lab — Tool Use Basics

This lab covers Claude's tool use API for audit automation.

## Key concepts
- Tool definitions: name, description, input_schema
- Agentic loop: message -> tool_use -> tool_result -> repeat
- Audit tools replace manual procedures

## Files
- tool-spec/fragment-a.json  — tool definition header
- tool-spec/fragment-b.json  — input schema
- tool-spec/fragment-c.json  — output schema and key

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Tool descriptions drive Claude's selection decisions — vague descriptions produce unreliable tool calls
  2. The agentic loop (message → tool_use → tool_result → repeat) is the foundation of every automated audit pipeline
  3. Audit tools replace manual procedures with consistent, re-runnable checks that scale to thousands of resources
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [
          { name: "audit-lab", isDir: true },
        ],
        "/audit-lab": [
          { name: "README.md", isDir: false },
          { name: "tool-spec", isDir: true },
        ],
        "/audit-lab/tool-spec": [
          { name: "fragment-a.json", isDir: false },
          { name: "fragment-b.json", isDir: false },
          { name: "fragment-c.json", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/audit-lab/tool-spec/fragment-a.json", value: "FLAG{T00L_", label: "Fragment A — Tool Header" },
        { trigger: "/audit-lab/tool-spec/fragment-b.json", value: "USE_4UD1T_", label: "Fragment B — Input Schema" },
        { trigger: "/audit-lab/tool-spec/fragment-c.json", value: "P1PEL1NE}", label: "Fragment C — Assembly Key" },
      ],
    },
  },

  // ─── audit-a02: Agentic API Enumeration ──────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "API Security Lab", location: "San Francisco, California", era: "Present Day", emoji: "🔌" },
    id: "audit-a02",
    order: 2,
    title: "The Endpoint Cartographer",
    subtitle: "Agentic API Enumeration — Claude mapping attack surface",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-02", name: "API Cartographer", emoji: "🗺️" },
    challengeType: "ctf",
    info: {
      tagline: "You can't audit what you can't see. Claude's first job is building the map.",
      year: 2024,
      overview: [
        "API surface area is the single largest blind spot in modern security audits. Organizations routinely have 40–60% more API endpoints than their API inventory documents acknowledge. Shadow APIs — endpoints deployed by individual teams outside the central API governance process — accumulate faster than any manual documentation workflow can track. Legacy version endpoints persist long after they are officially deprecated. Internal service-to-service APIs are often never documented at all. The result is an attack surface that grows continuously while the defenders' map remains static.",
        "Agentic API enumeration uses Claude to orchestrate a systematic, multi-step discovery pipeline that no human auditor could complete manually in a reasonable timeframe. The agent fetches and parses OpenAPI and Swagger specifications, queries API gateway route tables, probes known path patterns based on common naming conventions, compares discovered routes against the approved inventory, and generates a detailed gap report with risk assessments for each undocumented endpoint. Claude reasons about which discovered endpoints warrant deeper testing based on path semantics, HTTP methods, and response patterns.",
        "The technical architecture of the enumeration agent uses four primary tools working in sequence: `fetch_openapi_spec` retrieves the official API specification from its documented location, `list_gateway_routes` pulls the live route table from the API gateway (AWS API Gateway, Kong, NGINX, or similar), `probe_endpoint` issues low-risk requests to confirm endpoint liveness and gather response metadata, and `compare_to_inventory` performs the diff analysis that identifies gaps. Claude decides the sequencing and handles edge cases — paginated route tables, authentication-required spec endpoints, and rate limiting — without explicit programming for each scenario.",
        "Authentication regression detection is one of the highest-value outputs of agentic enumeration. When an API has multiple versions (v1, v2, v3), authentication requirements may differ between versions — sometimes intentionally, often accidentally. A v1 endpoint requiring Bearer token authentication may have a v2 equivalent that returns data unauthenticated due to a misconfiguration during the version migration. Claude can compare authentication behavior across API versions systematically: for every endpoint pattern that exists in multiple versions, it issues both authenticated and unauthenticated requests and flags any version where authentication is not enforced.",
        "Shadow API detection requires going beyond the official gateway. Many organizations have APIs deployed outside the primary gateway: developer testing environments accidentally left accessible on production infrastructure, microservices with self-contained routing that bypass the central gateway, legacy applications with their own API layers that predate the API governance program. Claude can orchestrate scans of multiple discovery vectors: DNS subdomain enumeration for API-related subdomains, port scanning for common API ports on internal ranges, and log analysis for API-pattern traffic to IP addresses not in the official inventory.",
        "The scope and rate limiting problem deserves explicit attention in any agentic enumeration design. Claude decides what to test, but it has no inherent concept of legal authorization, rate limits, or testing boundaries. These constraints must be enforced in the tool implementations themselves. The `probe_endpoint` tool should check every target against an allowlist of authorized domains and IP ranges before making any request. It should enforce rate limits using token bucket algorithms, not just sleep delays. It should refuse to execute requests against paths that match exclusion patterns (health check endpoints, metrics endpoints, documentation endpoints that don't need security testing). Encoding these rules in the tool code rather than in Claude's prompt ensures they cannot be bypassed by prompt injection or ambiguous instructions.",
        "The output of agentic API enumeration feeds directly into subsequent audit phases. The discovered endpoint inventory becomes the input for authentication testing, authorization testing, and input validation testing. By automating the enumeration phase, security teams can run it continuously — on every deployment, every gateway configuration change, and every DNS record update — rather than once per quarter during a formal audit engagement. The enumeration agent is the foundation of continuous API security monitoring.",
      ],
      technical: {
        title: "Enumeration Agent Architecture",
        body: [
          "The agent begins by fetching the official API spec (OpenAPI/Swagger) and the API gateway's live route table simultaneously. It diffs the two to find undocumented routes — endpoints that exist in the gateway but not in the official specification. For each undocumented route, it issues a probe request (typically an OPTIONS request or a minimal GET with no sensitive parameters) to confirm liveness and gather metadata about the endpoint's behavior. Finally, for each confirmed live endpoint, it compares authenticated versus unauthenticated responses to identify authentication bypass candidates.",
          "Rate limiting and scope constraints must be encoded in the tool implementations, not left to Claude's judgment. The separation of concerns is clear: Claude decides what to test based on its analysis of the discovered surface area, while your tool code enforces the rules of engagement — maximum requests per minute, allowed target domains and IP ranges, excluded paths, maximum response body size to process. This separation is both a security boundary and a reliability design: it ensures audit agents cannot accidentally exceed authorized scope regardless of what instructions Claude receives.",
          "The enumeration pipeline produces structured output designed for both human review and machine consumption. Each finding includes the endpoint path, discovered HTTP methods, authentication status (required/not required/unclear), comparison to inventory (documented/undocumented), and risk assessment. The risk assessment weighs the sensitivity of the path (endpoints containing /admin, /config, /export, /billing warrant higher severity), the authentication status, and the HTTP methods available (POST, PUT, DELETE on unauthenticated endpoints are critical findings). This structured output feeds directly into the ticket creation and report generation phases of the full audit pipeline.",
          "Continuous enumeration requires handling the delta between runs efficiently. A full enumeration scan may take 15–30 minutes on a large API surface. Running this daily and reporting all findings every day creates alert fatigue. The production-grade approach maintains a persistent inventory of known-good endpoints and only alerts on new discoveries, removed endpoints (which may indicate an unauthorized deletion of a security-relevant endpoint), or authentication behavior changes on existing endpoints. Claude can reason about whether a change in the inventory represents a risk or an expected deployment event based on context from deployment logs or change management tickets.",
        ],
        codeExample: {
          label: "Enumeration agent tool loop (pseudocode)",
          code: `# Claude decides which tools to call and in what order
tools = [fetch_openapi_spec, list_gateway_routes, probe_endpoint, compare_to_inventory]

messages = [{"role": "user", "content":
  "Enumerate all API endpoints for api.acme.com. "
  "Compare to the approved inventory in s3://acme-audit/api-inventory.json. "
  "Flag any undocumented endpoints and test auth on each."}]

while True:
    response = claude.messages.create(model="claude-opus-4-7", tools=tools, messages=messages)
    if response.stop_reason == "end_turn":
        break  # Claude has synthesized its final report
    # Execute tool calls, append results, continue loop
    for tool_call in response.tool_use_blocks:
        result = execute_tool(tool_call.name, tool_call.input)
        messages.append(tool_result(tool_call.id, result))`,
        },
      },
      incident: {
        title: "Peloton API Exposure (2021)",
        when: "May 2021",
        where: "Peloton API, public internet",
        impact: "Personal data of 4M+ users accessible unauthenticated via undocumented /stats/v2/workouts endpoint",
        body: [
          "Security researcher Jan Masters discovered that Peloton's API returned full user profile data — age, gender, city, workout statistics, account creation date, and follower counts — without requiring authentication on the `/stats/v2/workouts` endpoint. The endpoint was undocumented and not included in Peloton's internal API inventory. The exposure affected all 4 million-plus Peloton users, including those who had set their accounts to private. Peloton's initial response was dismissive, claiming the data was intentionally public. Only after additional public pressure did they acknowledge the issue and implement authentication requirements.",
          "An agentic enumeration audit running weekly would have flagged this endpoint within days of its deployment. The agent would have noted that `/stats/v1/workouts` required authentication while `/stats/v2/workouts` — the path-pattern successor with identical data sensitivity — did not. This is precisely the authentication regression detection pattern that agentic enumeration is designed to catch. The diff between v1 and v2 authentication behavior is a trivial comparison for a tool-using agent; it is a non-obvious edge case that manual API documentation review routinely misses.",
          "The Peloton incident reveals a broader organizational pattern: API versioning creates security regression risk. Every time a new API version is deployed, the authentication and authorization requirements of the new version must be explicitly verified against the requirements of the previous version. This verification step is often skipped in the rush to ship new features. Agentic enumeration automates this verification as part of the continuous deployment pipeline, making it impossible to accidentally ship a new API version without checking its authentication behavior against established patterns.",
          "The regulatory response to API exposures has intensified since 2021. GDPR regulators treat unauthenticated access to personal data as a reportable breach regardless of whether the data was accessed by malicious actors — the existence of the exposure is sufficient. CCPA enforcement in California follows similar principles. For any organization subject to privacy regulation, unauthenticated API endpoints returning personal data are per se regulatory violations, not merely security risks. Continuous API enumeration is not just a security best practice; it is a compliance requirement for regulated organizations.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Claude Orchestrator", sub: "enumeration agent", type: "attacker" },
          { label: "API Gateway + Spec", sub: "live routes vs docs", type: "system" },
          { label: "Undocumented Endpoints", sub: "shadow APIs", type: "victim" },
          { label: "Enumeration Report", sub: "gap analysis", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "OWASP API Security Project launched — API risks formalized" },
        { year: 2021, event: "Peloton API exposure — 4M users' data accessible unauthenticated" },
        { year: 2023, event: "Agentic API testing frameworks emerge using LLM orchestration", highlight: true },
        { year: 2024, event: "Claude tool use enables production-grade agentic enumeration pipelines" },
      ],
      keyTakeaways: [
        "60%+ of organizations have undocumented APIs not captured in their official inventory — shadow APIs are the norm, not the exception",
        "Diff OpenAPI spec against live gateway route tables to identify endpoints deployed outside the API governance process",
        "Authentication regression detection: systematically compare authentication requirements across all API versions for every endpoint pattern",
        "Encode rate limits, scope constraints, and allowed targets in tool implementations — Claude decides what to test, your code enforces boundaries",
        "Shadow API discovery requires multiple vectors: gateway route tables, DNS enumeration, port scans, and traffic log analysis",
        "Continuous enumeration on every deployment catches auth regressions within hours of introduction rather than months",
        "GDPR and CCPA treat unauthenticated access to personal data as a reportable breach — API security is a compliance requirement",
        "Structured enumeration output (endpoint, methods, auth status, risk) feeds directly into subsequent test phases and ticket creation",
      ],
      references: [
        { title: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
        { title: "Peloton API Disclosure (TechCrunch)", url: "https://techcrunch.com/2021/05/05/peloton-data-exposure/" },
      ],
    },
    ctf: {
      scenario: "You are running an agentic enumeration against a target API gateway. The agent has already run and left its findings on disk. Three fragments of the enumeration report contain the flag. Reconstruct the full finding.",
      hint: "The enumeration agent split its report into sections. Cat each report file to collect the flag fragments.",
      hints: [
        "List the /api-enum directory to find the report files.",
        "The fragments are in the discovery/, auth-check/, and summary/ subdirectories.",
        "Cat each findings file in order.",
      ],
      files: {
        "/api-enum/discovery/undocumented-routes.txt": `# Undocumented Routes — api.target.com
# Found by agentic enumeration agent (Claude claude-opus-4-7)

Route                    Method  Status  In-Spec
/api/v2/users/export     GET     200     NO      ← SHADOW API
/api/v1/admin/config     POST    403     NO      ← SHADOW API
/api/v2/billing/raw      GET     200     NO      ← SHADOW API
/api/v1/health           GET     200     YES     (expected)

Fragment-1: FLAG{4G3NT1C_
`,
        "/api-enum/auth-check/auth-regression.txt": `# Auth Regression Analysis
# /api/v2/users/export: v1 requires Bearer token, v2 returns 200 WITHOUT auth
# Classification: CRITICAL — auth bypass on data export endpoint

Endpoint               v1 Auth  v2 Auth  Regression
/api/vX/users/export   REQUIRED NONE     YES — CRITICAL

Fragment-2: 4P1_3NUM3R
`,
        "/api-enum/summary/report.txt": `# Agentic Enumeration Summary
# Total endpoints discovered: 47
# In approved inventory: 31
# Shadow APIs found: 3
# Auth regressions: 1 CRITICAL

Recommendation: Block /api/v2/users/export pending auth fix.

Fragment-3: 4T10N}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. API cartography closes the inventory gap — 60%+ of orgs have undocumented endpoints not in their official spec
  2. Auth regression detection is uniquely suited to AI: compare authentication behavior across API versions to catch security regressions automatically
  3. Rate limits and scope rules must be enforced in tool code — Claude decides what to test, your code enforces the rules of engagement
─────────────────────────────────────────────────────────────────────
`,
        "/api-enum/README.md": `# API Enumeration Agent Output

This directory contains the output of an agentic API enumeration run.

## Structure
- discovery/   — undocumented route findings
- auth-check/  — authentication regression analysis
- summary/     — final report and recommendations
`,
      },
      dirs: {
        "/": [{ name: "api-enum", isDir: true }],
        "/api-enum": [
          { name: "README.md", isDir: false },
          { name: "discovery", isDir: true },
          { name: "auth-check", isDir: true },
          { name: "summary", isDir: true },
        ],
        "/api-enum/discovery": [{ name: "undocumented-routes.txt", isDir: false }],
        "/api-enum/auth-check": [{ name: "auth-regression.txt", isDir: false }],
        "/api-enum/summary": [{ name: "report.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/api-enum/discovery/undocumented-routes.txt", value: "FLAG{4G3NT1C_", label: "Fragment 1 — Discovery" },
        { trigger: "/api-enum/auth-check/auth-regression.txt", value: "4P1_3NUM3R", label: "Fragment 2 — Auth Check" },
        { trigger: "/api-enum/summary/report.txt", value: "4T10N}", label: "Fragment 3 — Summary" },
      ],
    },
  },

  // ─── audit-a03: AI Secrets Detection ─────────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Secrets Scanning Lab", location: "San Francisco, California", era: "Present Day", emoji: "🔑" },
    id: "audit-a03",
    order: 3,
    title: "The Secrets Hunter",
    subtitle: "AI-Powered Secrets Detection — Claude scanning repos and configs",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-03", name: "Secrets Hunter", emoji: "🕵️" },
    challengeType: "ctf",
    info: {
      tagline: "Regex catches patterns. Claude understands context. Both are necessary.",
      year: 2024,
      overview: [
        "Traditional secrets scanning tools use regular expressions to detect known secret formats — AWS access key prefixes starting with AKIA, GitHub personal access tokens starting with ghp_, PEM private key headers, and high-entropy strings that statistically resemble cryptographic material. These pattern-based approaches are fast and catch well-formatted secrets reliably. But they fail on a growing class of security issues: obfuscated credentials split across multiple variables, environment-variable secrets set in CI configuration files, secrets buried in code comments, base64-encoded credentials, custom internal token formats unique to the organization's own systems, and credentials stored in operational scripts that aren't tracked in the primary source repositories.",
        "AI-powered secrets detection uses Claude to reason about context in ways that regular expressions cannot. Is this a real credential or a test placeholder with a realistic format? Is this variable name suspiciously credential-like even though the current value looks benign — suggesting the credential may be injected at runtime? Does this base64-encoded string decode to a private key or to innocuous binary data? Does the surrounding code context indicate this value is actually used for authentication, or is it a configuration template with placeholder values? Claude's semantic understanding of code catches what regex misses and eliminates the false positives that make regex-only scanning unsustainable at scale.",
        "The agentic secrets scanner combines regex pre-screening for speed and known-format coverage with Claude analysis for context and edge case handling. It scans the full spectrum of locations where secrets leak: git history including all branches and tags (secrets committed and later deleted remain in history indefinitely), environment configuration files, infrastructure-as-code templates, Docker image layers, CI/CD pipeline definitions (GitHub Actions workflows, Jenkins Jenkinsfiles, CircleCI configs), Kubernetes secret manifests, and developer machine configuration files accessed through MCP server integrations.",
        "Git history scanning deserves special attention because it is one of the most commonly neglected aspects of secrets management. When a developer commits a credential to a repository and then deletes it in a subsequent commit, the credential is not removed from git history — it remains accessible to anyone with repository access via `git log` and `git show`. Every developer who has ever cloned the repository has a local copy of that credential. Tools like truffleHog and Gitleaks scan across all commits in the entire history, not just the current HEAD, making it possible to find credentials that were removed months or years ago but never properly rotated.",
        "The two-phase architecture balances speed and accuracy in a way that neither approach alone can achieve. Phase 1 uses fast regex tools to process the entire codebase in seconds and flag all potential hits. This phase produces high recall but low precision — it finds almost everything but generates many false positives. Phase 2 sends each flagged item to Claude with full surrounding context for intelligent classification. Claude applies semantic reasoning to determine: is this a confirmed secret requiring immediate rotation, a likely placeholder value in a test fixture, or a false positive that should be added to the scanner's allowlist? This combination reduces analyst review time by 80% or more in practice while maintaining near-perfect recall.",
        "False positive management is as important as detection accuracy. An allowlist of known false positives (test fixtures, example values in documentation, public API keys for third-party services that are intentionally non-secret) prevents the scanner from repeatedly flagging the same benign values. Without an allowlist, analysts see the same false positives on every scan and begin ignoring all findings — the alert fatigue failure mode that renders the entire scanning program ineffective. Claude can also help maintain the allowlist by identifying patterns in false positives and suggesting allowlist rules that generalize to entire categories of benign values.",
        "Prevention is more valuable than detection. Pre-commit hooks using tools like detect-secrets or Gitleaks run before every commit and block the developer from committing a credential to the repository. CI/CD pipeline checks run on every pull request and block merge if a secret pattern is detected. These preventive controls catch secrets before they enter the repository, eliminating the need for rotation and the associated operational risk of credential exposure. AI-powered detection is the backstop for when preventive controls fail — and they do fail, due to developers bypassing hooks, using commit --no-verify, or committing from tools that don't run hooks.",
      ],
      technical: {
        title: "Two-Phase Scanning Architecture",
        body: [
          "Phase 1 (fast, regex): run truffleHog or detect-secrets across the full target scope including complete git history. The scanner flags all pattern matches (known formats like AKIA, ghp_, sk-ant-) and all high-entropy strings above a configurable threshold. This phase runs in seconds to minutes and produces many false positives — that is by design. The goal of Phase 1 is high recall, not high precision. Missing a real credential is a security incident; generating false positives that Phase 2 eliminates is an acceptable computational cost.",
          "Phase 2 (accurate, Claude): for each item flagged by Phase 1, construct a context window containing the surrounding code (typically 10 lines before and after the flagged line), the file path and extension, the variable name or key name, the raw value, and any relevant metadata (commit author, commit timestamp, branch). Send this context window to Claude with a structured classification prompt. Claude returns one of three classifications: `confirmed_secret` (this is a real credential requiring immediate rotation), `likely_placeholder` (the value has the format of a real credential but contextual evidence suggests it is a test value), or `false_positive` (this is not a credential). Claude also provides a one-sentence explanation of its reasoning, which the analyst can review to calibrate trust in the classification.",
          "Secret rotation workflow is the action phase that follows confirmed_secret classifications. The workflow must happen in a specific order to minimize exposure window: (1) immediately disable the old credential in the issuing service (AWS IAM Console, GitHub token settings, etc.) before any other step, (2) audit access logs for the old credential to determine if it was already used by unauthorized parties, (3) issue a new credential and store it in the organization's secrets manager (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault), (4) update all services that use the credential to reference the new value from the secrets manager, (5) verify the old credential no longer works by testing an API call with it. Skipping or reordering these steps creates windows of either continued exposure or operational outage.",
          "Operational script scanning is the category most frequently overlooked by secrets scanning programs. Production deployment scripts, runbooks, database maintenance scripts, and infrastructure automation tools written in Bash, PowerShell, or Python are often stored on shared network drives, internal wikis, or developer workstations rather than in formal source control repositories. These scripts are frequently where long-lived credentials accumulate because they were written before the organization adopted a secrets manager, and because they are not subject to the pre-commit hooks and CI/CD pipeline checks that protect primary repositories. Claude-powered scanning, connected to file systems through MCP servers, can scan these locations systematically.",
          "The full scanning scope for a production audit engagement includes: all branches of all repositories in the organization's version control system (not just the main branch), complete git history for all repositories (using --all flag in truffleHog), CI/CD pipeline definition files in all repositories, Docker image layers in the organization's container registry (using docker history and layer extraction), Kubernetes secret manifests in the cluster configuration (noting that base64 encoding in Kubernetes secrets is not encryption), environment configuration files in infrastructure-as-code repositories, and operational scripts in file shares or internal documentation systems accessible through MCP servers.",
        ],
        codeExample: {
          label: "Phase 2 Claude classification call",
          code: `def classify_finding(finding: dict) -> str:
    prompt = f"""Classify this potential secret finding:

File: {finding['file']}
Line: {finding['line_number']}
Variable: {finding['variable_name']}
Value: {finding['value']}
Context:
{finding['surrounding_code']}

Respond with one of: confirmed_secret | likely_placeholder | false_positive
Then explain your reasoning in one sentence."""

    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text`,
        },
      },
      incident: {
        title: "Uber GitHub Secret Leak (2022)",
        when: "September 2022",
        where: "GitHub, internal Uber repositories",
        impact: "57M user records; attacker used leaked AWS credential to access S3 buckets",
        body: [
          "The 2022 Uber breach began with a social engineering attack — an MFA fatigue technique where the attacker bombarded an Uber employee's phone with authentication requests until the employee accepted one to stop the notifications. But the attacker's ability to move laterally through Uber's environment and access production data at scale depended on finding hardcoded credentials in Uber's internal PowerShell scripts stored on a network file share. These scripts were operational tools written by system administrators and were not stored in the primary source repositories subject to Uber's existing secrets scanning program.",
          "Claude-powered scanning with MCP filesystem access would have reached those operational scripts. The scanner would have flagged the PowerShell variable names like `$uberProdKey` and `$awsToken` as credential-pattern matches even if the values were obfuscated or stored in a format that pattern-only regex could not detect. Claude's ability to recognize credential-like semantics from variable naming conventions and surrounding code context is the key capability that pure regex scanning lacks. A variable named `$prodAwsSecret` storing a value in any format is suspicious in an operational script context.",
          "The breach also illustrates the organizational challenge of comprehensive secrets scanning coverage. Uber's primary repositories likely had scanning programs in place — the breach used credentials from outside those boundaries. Effective secrets scanning must cover the entire credential surface area: not just git repositories but also CI/CD systems, infrastructure automation tools, operational scripts, developer workstation configurations, and any other location where a credential might be stored. MCP server integrations that connect Claude to file systems, Confluence wikis, and Slack message archives extend scanning coverage to these traditionally hard-to-reach locations.",
          "The post-breach regulatory response to the 2022 Uber incident included scrutiny of Uber's security program design — not just the technical vulnerability. Regulators assessed whether Uber had implemented reasonable controls to prevent credential exposure, including secrets scanning programs with adequate coverage. This regulatory framing means that the adequacy of your secrets scanning program is now a compliance question, not just a security best practice question. Organizations in regulated industries need to be able to demonstrate that their secrets scanning covers all credential storage locations, not just the ones that are easy to scan.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Regex Pre-Scanner", sub: "truffleHog / detect-secrets", type: "attacker" },
          { label: "Claude Classifier", sub: "context-aware analysis", type: "system" },
          { label: "Secret Candidates", sub: "repos / configs / CI", type: "victim" },
          { label: "Triaged Findings", sub: "confirmed / fp / review", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "truffleHog released — first major git history secret scanner" },
        { year: 2022, event: "Uber breach — hardcoded credentials in operational scripts not caught by scanners" },
        { year: 2023, event: "AI-augmented secret classification reduces false positive rate 80%+", highlight: true },
        { year: 2024, event: "Claude used in production secrets triage pipelines at Fortune 500 companies" },
      ],
      keyTakeaways: [
        "Regex finds known formats at speed; Claude finds intent and context — use both phases in sequence for high recall and high precision",
        "Scan beyond git repos: CI pipeline definitions, Docker image layers, IaC templates, Kubernetes manifests, and operational scripts",
        "Git history scanning is mandatory — secrets committed and later deleted remain in history and are accessible to every repository clone",
        "Three-tier Claude classification: confirmed_secret (rotate immediately), likely_placeholder (add to allowlist), false_positive (document and suppress)",
        "Rotation workflow order matters: disable old credential → audit access logs → issue new → update dependent services → verify old no longer works",
        "Pre-commit hooks and CI/CD checks are preventive controls; AI scanning is the backstop when prevention fails",
        "False positive allowlists prevent alert fatigue — without them, analysts begin ignoring all findings within weeks",
        "MCP filesystem server integration extends scanning to operational scripts, file shares, and developer tools outside formal source control",
        "The Uber 2022 breach used credentials from operational scripts outside the formal repository boundary — comprehensive coverage is a compliance requirement",
      ],
      references: [
        { title: "Uber 2022 Breach Analysis (Krebs)", url: "https://krebsonsecurity.com/2022/09/uber-was-hacked-to-its-core-purportedly-by-an-18-year-old/" },
        { title: "detect-secrets GitHub", url: "https://github.com/Yelp/detect-secrets" },
      ],
    },
    ctf: {
      scenario: "You are running the AI secrets scanner against a target repository. Three scan result files contain flag fragments — one a confirmed secret, one a false positive analysis, and one the final triage summary.",
      hint: "The scanner output is in /secrets-scan. Read each findings file to collect the fragments.",
      hints: [
        "List /secrets-scan to see the output directories.",
        "Check phase1/ for regex findings and phase2/ for Claude classifications.",
        "The triage-summary.txt in /secrets-scan contains the final fragment.",
      ],
      files: {
        "/secrets-scan/phase1/regex-hits.txt": `# Phase 1 — Regex Scanner Output
# Tool: truffleHog v3.4.1
# Scan scope: full git history (1,847 commits), all branches

[HIGH] File: config/deploy.sh  Line: 47
  Variable: AWS_ACCESS_KEY_ID
  Value: AKIA4EXAMPLE7REDACTED
  Pattern: AWS Access Key (AKIA prefix)
  Fragment: FLAG{S3CR3TS_

  >> WHAT TO KNOW: The AKIA prefix is deterministic — all AWS access keys start with it.
     truffleHog uses this exact regex to catch them at high confidence.
     This key was committed 6 months ago and "deleted" in a later commit — but git
     history is permanent. Every developer who cloned this repo has a copy.
     Real action: invalidate the key in AWS IAM immediately, then rotate.

[MEDIUM] File: tests/fixtures/mock-creds.json  Line: 12
  Variable: api_key
  Value: test-key-1234-placeholder
  Pattern: generic api_key pattern

  >> WHAT TO KNOW: This is a FALSE POSITIVE — a real example of regex scanner noise.
     Regex cannot tell 'test-key-1234-placeholder' from a real key by pattern alone.
     This is why Phase 2 (Claude) exists: context eliminates false positives.
     High false-positive rates cause alert fatigue — analysts stop reviewing findings.

# ──────────────────────────────────────────────────────────────────────────────
# KEY TAKEAWAYS — Phase 1 (Regex Scanning)
# ──────────────────────────────────────────────────────────────────────────────
# 1. Regex scanning is fast and catches well-known formats (AKIA, ghp_, sk-ant-)
# 2. Always scan FULL git history, not just HEAD — deleted secrets are not gone
# 3. High-entropy strings also flag likely secrets even without a known pattern
# 4. Expect 30-70% false positive rate — Phase 2 (AI triage) reduces this to <5%
# 5. Tools: truffleHog, Gitleaks, detect-secrets (Yelp), git-secrets (AWS Labs)
# ──────────────────────────────────────────────────────────────────────────────
`,
        "/secrets-scan/phase2/claude-classifications.txt": `# Phase 2 — Claude Classification Results
# Claude model: claude-opus-4-7
# Input per finding: file path, variable name, value, 10 lines of surrounding code

Finding #1 (config/deploy.sh:47)
  Claude verdict: confirmed_secret
  Confidence: HIGH
  Reasoning: AKIA prefix is an active AWS access key prefix. Variable name
    AWS_ACCESS_KEY_ID is the canonical name used in AWS SDKs. File path
    config/deploy.sh suggests production deployment context, not a test fixture.
    No 'test', 'example', 'placeholder', or 'fake' indicators present.
  Action: ROTATE IMMEDIATELY — disable in IAM, issue new key, update secrets store
  Fragment: 4I_SCN_

  >> WHAT TO KNOW: This is Claude doing what regex cannot — reading context.
     Claude understands that deploy.sh + AWS_ACCESS_KEY_ID + AKIA prefix = real credential.
     The same value in tests/fixtures/fake-creds.json would likely be classified false_positive.
     Claude's classification: confirmed_secret | likely_placeholder | false_positive

Finding #2 (tests/fixtures/mock-creds.json:12)
  Claude verdict: false_positive
  Confidence: HIGH
  Reasoning: Value contains literal substrings 'test' and 'placeholder'. File path
    is tests/fixtures — a standard location for test data. Variable name 'api_key'
    is generic. No deployment context, no real format match (not AKIA, not ghp_, etc).
  Action: no action required — consider adding to .secrets-ignore allowlist

  >> WHAT TO KNOW: False positive management is critical for scanner sustainability.
     An allowlist (.secrets-ignore or detect-secrets baseline) prevents re-flagging.
     Without triage, analysts see the same false positive every scan → they stop looking.
     Claude reduces analyst review load by 80%+ compared to regex-only output.

# ──────────────────────────────────────────────────────────────────────────────
# KEY TAKEAWAYS — Phase 2 (AI Classification)
# ──────────────────────────────────────────────────────────────────────────────
# 1. Claude reads surrounding code, file path, and variable name — not just the value
# 2. Three-tier classification: confirmed_secret / likely_placeholder / false_positive
# 3. 'Confirmed secret' → immediate action: rotate, audit access logs, notify security
# 4. 'False positive' → add to allowlist so it doesn't appear in future scans
# 5. The combination (regex speed + Claude accuracy) is more effective than either alone
# ──────────────────────────────────────────────────────────────────────────────
`,
        "/secrets-scan/triage-summary.txt": `# Secrets Scan Triage Summary
# Run date: 2024-11-15 03:47 UTC
# Agent: Claude Secrets Hunter v2.1

Confirmed secrets: 1 (CRITICAL — rotate AWS key immediately)
False positives:   1 (added to allowlist)
Pending review:    0

Total scan time: 4m 12s
Repos scanned: 3
Commits scanned (git history): 1,847  ← not just HEAD — full history
Files scanned: 2,341
Findings before Claude triage: 2
Findings after Claude triage: 1 confirmed

Action items generated: 1
  [CRITICAL] Rotate AWS_ACCESS_KEY_ID (AKIA4EXAMPLE7REDACTED)
    → Disable key in AWS IAM Console immediately
    → Check CloudTrail logs for unauthorized API calls using this key
    → Replace with AWS Secrets Manager dynamic credentials (no static keys)
    → Add pre-commit hook or CI check to prevent future secret commits

Final fragment: TR14G3}

# ──────────────────────────────────────────────────────────────────────────────
# KEY TAKEAWAYS — The Full Secrets Scanning Pipeline
# ──────────────────────────────────────────────────────────────────────────────
# 1. SCAN GIT HISTORY: 'git rm secret.txt' does NOT remove it from history.
#    Every developer who ever cloned the repo still has it. Rotation is the only fix.
#
# 2. ROTATION WORKFLOW: invalidate old key → issue new key → update secrets store →
#    update all systems using the key → verify old key no longer works.
#
# 3. PREVENTION > REMEDIATION: Pre-commit hooks (using detect-secrets or Gitleaks)
#    block secrets BEFORE they reach the repo. CI/CD pipeline checks add a second layer.
#
# 4. NEVER USE STATIC LONG-LIVED CREDENTIALS: Use IAM roles, short-lived tokens,
#    or dynamic secrets from Vault/AWS Secrets Manager. No static API keys in code.
#
# 5. THE UBER LESSON (2022): Uber's breach involved credentials in PowerShell scripts
#    on a network share — not in git. Scan EVERYWHERE: CI configs, IaC, Docker images,
#    Kubernetes secrets, operational scripts, and developer machines.
# ──────────────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "secrets-scan", isDir: true }],
        "/secrets-scan": [
          { name: "phase1", isDir: true },
          { name: "phase2", isDir: true },
          { name: "triage-summary.txt", isDir: false },
        ],
        "/secrets-scan/phase1": [{ name: "regex-hits.txt", isDir: false }],
        "/secrets-scan/phase2": [{ name: "claude-classifications.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/secrets-scan/phase1/regex-hits.txt", value: "FLAG{S3CR3TS_", label: "Fragment 1 — Regex Hits" },
        { trigger: "/secrets-scan/phase2/claude-classifications.txt", value: "4I_SCN_", label: "Fragment 2 — Claude Classifications" },
        { trigger: "/secrets-scan/triage-summary.txt", value: "TR14G3}", label: "Fragment 3 — Triage Summary" },
      ],
    },
  },

  // ─── audit-a04: Automated Cloud Enumeration ───────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Cloud Audit Lab", location: "AWS US-East-1", era: "Present Day", emoji: "☁️" },
    id: "audit-a04",
    order: 4,
    title: "The Cloud Cartographer",
    subtitle: "Automated Cloud Resource Enumeration — Claude + AWS SDK tools",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-04", name: "Cloud Cartographer", emoji: "☁️" },
    challengeType: "ctf",
    info: {
      tagline: "The cloud is not a place. It's a configuration. And configurations drift.",
      year: 2024,
      overview: [
        "Cloud resource enumeration is the non-negotiable foundation of every cloud security audit. Before you can assess any security control, you must first know what exists: which S3 buckets, EC2 instances, Lambda functions, RDS databases, IAM roles, VPCs, subnets, security groups, CloudFront distributions, API Gateways, and EKS clusters are deployed across which regions and accounts. Without a complete and current inventory, every subsequent audit finding is incomplete because you cannot know whether a misconfiguration you found is isolated or representative of a broader pattern across resources you haven't examined.",
        "Manual cloud inventory at enterprise scale is not a viable approach. A single large AWS account can have thousands of resources across a dozen regions, with new resources being created and modified on every deployment cycle. A manual inventory performed by a human auditor will be outdated before the audit report is finalized. Agentic enumeration with Claude and the AWS SDK takes minutes rather than days, produces a structured inventory in a machine-readable format, and can be re-run on any schedule or triggered by any infrastructure change event.",
        "The agentic enumeration agent orchestrates a systematic multi-service sweep: list all resources by service type, check each resource for key configuration properties relevant to security, flag deviations from the organization's baseline configuration, and produce a structured inventory report. Claude decides which services to prioritize based on the audit scope defined in the initial prompt, handles pagination of API responses, correlates resources across services (which Lambda uses which VPC, which IAM role is attached to which EC2), and synthesizes findings into a coherent inventory with risk annotations.",
        "Resource dependency graphs are the highest-value output of cloud enumeration that manual audits rarely produce. A dependency graph maps the relationships between resources: this Lambda function uses this IAM role, which has this S3 policy, which allows access to these buckets, which contain data classified at this sensitivity level. Building this graph manually requires cross-referencing multiple AWS Console views and spreadsheets. Claude constructs it automatically by calling the appropriate describe APIs and linking the results through resource ARNs. The resulting graph reveals privilege chains and data access paths that flat inventory lists entirely obscure.",
        "Multi-account and multi-region enumeration adds complexity that makes manual approaches even less practical. Organizations using AWS Organizations may have hundreds of accounts — one per team, product, or environment. A complete inventory requires assuming a cross-account role in each account and running the enumeration tools in each region. Claude can orchestrate this systematically: enumerate the AWS Organizations structure to get all account IDs, assume the audit role in each account, and run the enumeration sweep in parallel across accounts and regions. The result is a consolidated inventory across the entire AWS estate that no manual process could produce.",
        "Configuration baseline comparison is what transforms a raw inventory into actionable security findings. The baseline defines the expected configuration for each resource type: S3 buckets must have public access blocked, RDS instances must have encryption enabled, EC2 instances must not have security groups allowing 0.0.0.0/0 ingress on management ports, Lambda functions must not have unrestricted outbound network access. For each resource in the inventory, Claude compares the actual configuration against the baseline and flags any deviation. The baseline itself can be defined in JSON, aligned to CIS Benchmarks or NIST controls, and versioned in a repository so the audit criteria are reproducible and auditable.",
        "The cloud enumeration agent is the prerequisite for all subsequent audit phases. IAM policy analysis needs the list of all roles and attached policies. Secrets scanning of IaC needs the list of all Lambda functions and their associated code repositories. Network segmentation analysis needs the list of all VPCs, subnets, and security groups. Evidence collection needs the complete resource inventory to know which resources each control applies to. By front-loading enumeration and making its output available to all subsequent agents as a shared context, the multi-agent audit pipeline avoids redundant API calls and ensures all agents are working from a consistent view of the infrastructure state.",
      ],
      technical: {
        title: "Cloud Enumeration Tool Set",
        body: [
          "Core tools for an AWS enumeration agent cover the six most security-relevant service categories. Storage tools: `list_s3_buckets` returns each bucket with its public access block settings, encryption configuration, versioning status, and bucket ACL. Database tools: `list_rds_instances` returns each RDS instance with its publicly_accessible flag, encryption status, backup retention period, and VPC configuration. Compute tools: `list_ec2_instances` returns each instance with its associated security group IDs, IAM instance profile ARN, and subnet configuration. Serverless tools: `list_lambda_functions` returns each function with its VPC configuration (or lack thereof), IAM execution role, and environment variable names (not values — to flag potential secrets). Identity tools: `list_iam_roles` returns each role with its attached managed policies, inline policy count, and last used date. Network tools: `list_security_groups` returns each group with its inbound and outbound rules, flagging rules with 0.0.0.0/0 or ::/0 source CIDRs.",
          "Claude decides which services to prioritize based on the audit scope. For a data-centric audit, Claude starts with S3 and RDS because these are the data stores where sensitive information resides. For a network audit, it starts with VPCs and security groups to map the network topology before examining compute resources. For an IAM audit, it starts with the IAM service to map the identity landscape before examining which resources those identities can access. This adaptive prioritization mirrors how experienced human auditors approach cloud environments — starting with the highest-risk asset categories and drilling down based on what they find.",
          "Multi-account enumeration requires the AWS Organizations API and cross-account IAM roles. The pattern: call `list_accounts` on the Organizations management account to get all account IDs, then for each account call `sts:AssumeRole` with the organization-standard audit role ARN (`arn:aws:iam::{account_id}:role/SecurityAuditRole`), use the returned temporary credentials to initialize an account-scoped boto3 session, and run the full enumeration tool set within that session. Claude orchestrates this by calling an `enumerate_account` tool that wraps the assume-role logic, passing the account-scoped results back to be consolidated into the master inventory.",
          "Configuration drift detection requires comparing the current enumeration output against a stored baseline. The baseline is produced by the first enumeration run on a known-good environment state and stored in a versioned artifact store (S3 bucket with versioning enabled, or a DynamoDB table with a timestamp sort key). Subsequent runs compare each resource's current configuration against its baseline configuration. Drifted resources — those where the configuration has changed since the baseline was established — are flagged for investigation. Some drift is expected (new resources added, configurations deliberately changed by deployment pipelines). Unexpected drift — configuration changes not associated with any recorded deployment event — is the finding that matters for security.",
          "Resource tagging analysis adds organizational context to the inventory. AWS resource tags typically encode environment (prod/dev/staging), owner (team or individual), data classification (public/internal/confidential/restricted), and compliance scope (in-scope/out-of-scope for SOC 2, PCI, HIPAA). Claude can analyze tag coverage (resources without required tags violate the organization's tagging policy), tag consistency (resources in the same VPC with different environment tags may indicate a misconfiguration), and tag-based access control (checking that IAM policies using tag-based conditions actually match the tags on the resources they're intended to restrict).",
        ],
        codeExample: {
          label: "Cloud enumeration agent — multi-service sweep",
          code: `# Claude orchestrates the enumeration order based on audit focus
system = """You are a cloud security auditor. Use the provided tools to enumerate
all AWS resources in the target account. Start with data stores (S3, RDS),
then compute (EC2, Lambda), then IAM. Flag any resource that:
- Has public access enabled
- Lacks encryption at rest
- Has overly permissive security groups (0.0.0.0/0 ingress on port 22/3389/3306)
Produce a structured inventory with risk ratings."""

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=4096,
    system=system,
    tools=cloud_audit_tools,
    messages=[{"role": "user", "content": "Audit account 123456789012, all regions."}]
)`,
        },
      },
      incident: {
        title: "Toyota Connected Car Data Exposure (2023)",
        when: "May 2023",
        where: "Toyota Connected Services, Japan + Global",
        impact: "2.15M customers' vehicle location data exposed for 10 years; misconfigured cloud environment",
        body: [
          "Toyota disclosed in May 2023 that vehicle location data for 2.15 million customers had been publicly accessible from February 2012 to May 2023 — over ten years — due to a misconfigured cloud environment. The misconfiguration involved a cloud storage resource with public access enabled that should have had access restricted to authorized Toyota services only. The data exposed included vehicle GPS coordinates and vehicle identification numbers, allowing anyone who discovered the endpoint to track the physical location of Toyota vehicles over a decade of historical records.",
          "The ten-year exposure timeline is the most important detail in the Toyota incident for understanding the value of agentic cloud enumeration. Toyota was not a negligent organization — it is a sophisticated global technology company with substantial IT resources. But the cloud environment that housed this data grew and changed over ten years, and the misconfiguration was introduced (or persisted from) the initial setup and was never detected by manual auditing processes. Annual audits examining hundreds of storage resources across complex cloud environments routinely miss individual misconfigurations, particularly ones that have existed for years and have become invisible through familiarity.",
          "An agentic cloud enumeration agent running on a weekly schedule would have flagged the public access configuration within the first run after it was introduced — or, if it had been running for the full ten years, would have flagged it on the first run of the program and every run thereafter. The agent's comparison against a baseline would have immediately noted that this storage resource had public access enabled while all other storage resources in the environment had it disabled. The deviation would have been the first finding in the first report, not a decade-long undiscovered exposure.",
          "The regulatory response to the Toyota incident reflects the growing global expectation that organizations deploying cloud-connected systems will implement continuous monitoring of cloud configurations. Japan's Personal Information Protection Commission (PPC) investigated the incident and found inadequate data protection controls. The European data protection authorities with jurisdiction over affected EU residents applied GDPR scrutiny. In the current regulatory environment, a ten-year cloud misconfiguration is not treated as an unfortunate technical error — it is treated as evidence of inadequate governance and control monitoring. Agentic continuous enumeration is the governance control that demonstrates ongoing oversight of cloud configuration.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Claude Orchestrator", sub: "enumeration agent", type: "attacker" },
          { label: "AWS SDK Tools", sub: "S3/EC2/IAM/RDS/Lambda", type: "system" },
          { label: "Cloud Account", sub: "multi-region resources", type: "victim" },
          { label: "Inventory + Risk Report", sub: "structured findings", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "Toyota cloud misconfiguration introduced — 2.15M vehicle records exposed" },
        { year: 2018, event: "AWS Config launches continuous compliance monitoring" },
        { year: 2023, event: "Toyota discloses 10-year data exposure; agentic auditing gains urgency", highlight: true },
        { year: 2024, event: "Claude-based cloud enumeration agents enter production use" },
      ],
      keyTakeaways: [
        "Cloud inventory is the prerequisite to every subsequent audit check — you cannot assess what you have not enumerated",
        "Enumerate all six security-relevant service categories: storage, database, compute, serverless, identity, and network",
        "Build resource dependency graphs showing which role accesses which bucket and which Lambda uses which VPC — flat lists miss privilege chains",
        "Multi-account enumeration via AWS Organizations and cross-account IAM roles covers the full organizational AWS estate",
        "Configuration baseline comparison identifies drift — unexpected changes not associated with recorded deployment events are the findings that matter",
        "Resource tagging analysis adds organizational context: environment, owner, data classification, and compliance scope per resource",
        "Toyota's ten-year exposure resulted from a single storage misconfiguration that continuous agentic sweeps would have flagged on the first weekly run",
        "Regulatory bodies treat decade-long cloud misconfigurations as governance failures, not technical errors — continuous monitoring is the required control",
      ],
      references: [
        { title: "Toyota Cloud Exposure (BleepingComputer)", url: "https://www.bleepingcomputer.com/news/security/toyota-discloses-data-breach-exposing-customers-personal-info/" },
        { title: "AWS Config Documentation", url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html" },
      ],
    },
    ctf: {
      scenario: "A cloud enumeration agent swept the target AWS account and stored its findings on disk. Three report files contain the flag fragments — S3 findings, IAM findings, and the risk summary.",
      hint: "The agent output is in /cloud-enum. Read the findings files to collect the flag.",
      hints: [
        "List /cloud-enum to see what the agent found.",
        "Check s3-findings.txt and iam-findings.txt for the first two fragments.",
        "The risk-summary.txt file contains the final fragment.",
      ],
      files: {
        "/cloud-enum/s3-findings.txt": `# S3 Bucket Enumeration — Claude Audit Agent
# Account: 123456789012  Region: us-east-1

Bucket                      Public  Encryption  Versioning  Finding
acme-prod-data              NO      AES-256     YES         OK
acme-backup-2019            YES     NONE        NO          CRITICAL: Public + Unencrypted
acme-logs-archive           NO      AES-256     NO          LOW: No versioning

Fragment-1: FLAG{CL0UD_
`,
        "/cloud-enum/iam-findings.txt": `# IAM Role Analysis — Claude Audit Agent

Role: prod-lambda-role
  Attached: arn:aws:iam::aws:policy/AdministratorAccess
  Finding: CRITICAL — Lambda role has AdministratorAccess (should be least-privilege)

Role: backup-role
  Attached: arn:aws:iam::aws:policy/AmazonS3FullAccess
  Finding: HIGH — Full S3 access on backup role; scope to specific buckets

Fragment-2: 3NUM_4G3NT_
`,
        "/cloud-enum/risk-summary.txt": `# Cloud Enumeration Risk Summary
# Claude claude-opus-4-7 — agentic sweep complete

CRITICAL: 2 findings
HIGH: 1 finding
LOW: 1 finding

Top priorities:
1. Remove public access from acme-backup-2019 and enable encryption
2. Replace AdministratorAccess on prod-lambda-role with least-privilege policy

Fragment-3: SW33P}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Cloud inventory is prerequisite to every subsequent audit check — you cannot assess what you have not enumerated
  2. Resource dependency graphs (which Lambda role → which bucket) reveal privilege chains that static inventory lists miss entirely
  3. Toyota's 10-year data exposure (2023) resulted from a single S3 public-access misconfiguration — agentic sweeps catch these in minutes, not decades
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "cloud-enum", isDir: true }],
        "/cloud-enum": [
          { name: "s3-findings.txt", isDir: false },
          { name: "iam-findings.txt", isDir: false },
          { name: "risk-summary.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/cloud-enum/s3-findings.txt", value: "FLAG{CL0UD_", label: "Fragment 1 — S3 Findings" },
        { trigger: "/cloud-enum/iam-findings.txt", value: "3NUM_4G3NT_", label: "Fragment 2 — IAM Findings" },
        { trigger: "/cloud-enum/risk-summary.txt", value: "SW33P}", label: "Fragment 3 — Risk Summary" },
      ],
    },
  },

  // ─── audit-a05: AI IAM Policy Analyzer ───────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "IAM Analysis Lab", location: "San Francisco, California", era: "Present Day", emoji: "🪪" },
    id: "audit-a05",
    order: 5,
    title: "The Policy Whisperer",
    subtitle: "AI IAM Policy Analyzer — Claude reasoning over policy documents",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-05", name: "Policy Whisperer", emoji: "🪪" },
    challengeType: "ctf",
    info: {
      tagline: "IAM policies are the access control layer. Claude reads them faster than any human auditor.",
      year: 2024,
      overview: [
        "IAM policy analysis is one of the highest-value applications of AI in cloud security auditing. A large AWS account can have hundreds of IAM roles, thousands of policy statements across managed and inline policies, permission boundaries, service control policies applied through AWS Organizations, and resource-based policies on individual services like S3, KMS, and Lambda. Manual review of this policy landscape is slow, incomplete, and error-prone. A human auditor reviewing ten IAM roles per hour would take weeks to cover a large organization's identity configuration. Claude can analyze hundreds of policies in minutes and reason about effective permissions across multiple policy layers simultaneously.",
        "Claude understands IAM policy semantics at a level that simple rule engines cannot approach. It grasps the difference between identity-based policies (attached to IAM principals) and resource-based policies (attached to resources like S3 buckets), understands how permission boundaries constrain the maximum permissions a principal can have even if broader policies are attached, recognizes when Condition blocks actually restrict access versus when their condition keys can be trivially satisfied, and identifies when NotAction and NotResource elements create broader access than they appear to on first reading. This semantic comprehension enables findings that pattern-matching tools miss entirely.",
        "Privilege escalation path analysis is where Claude's IAM reasoning capability delivers the most unique value. A privilege escalation path is a sequence of IAM permissions that, when combined, allow a principal with limited initial permissions to acquire additional permissions beyond what was intended. Classic escalation paths involve permissions like `iam:CreatePolicyVersion` (which allows creating a new version of any existing IAM policy, including policies attached to administrator roles), `iam:AttachRolePolicy` (which allows attaching any policy to any role, including attaching an administrator policy to a role the attacker already controls), and `iam:PassRole` combined with `ec2:RunInstances` (which allows launching an EC2 instance with a more privileged IAM role attached).",
        "The effective permissions question is the key analytical frame for IAM auditing. For any given principal, the effective permissions are not simply the sum of attached policies — they are the intersection of attached policies with permission boundaries, further constrained by service control policies from AWS Organizations, further filtered by resource-based policies on the target resources, and finally evaluated against any applicable Condition blocks. Claude can reason about this multi-layer evaluation process for each principal and answer the question that human auditors rarely have time to address comprehensively: if this role is compromised, what is the maximum privilege an attacker can achieve through legitimate API calls?",
        "Least-privilege remediation is the output that makes IAM analysis actionable. Finding that a Lambda function role has `s3:*` on Resource `*` is the first step. The second step — which pure detection tools don't provide — is generating the minimal policy replacement that gives the Lambda function exactly what it needs and nothing more. Claude can analyze the Lambda function's code (through repository scanning via MCP server) to determine which S3 operations it actually calls and which buckets it needs to access, then generate a replacement policy with the minimum set of actions scoped to the specific bucket ARNs. This transforms the audit finding into a specific engineering task that can be implemented in hours.",
        "Cross-account IAM analysis extends the privilege chain analysis beyond single account boundaries. AWS cross-account trust relationships are established through AssumeRole policies that allow principals in one account to assume roles in another. An organization may have hundreds of such trust relationships built up over years, some of which may have been established for temporary purposes and never revoked. Claude can enumerate all cross-account trust relationships in an account, identify which external accounts are trusted, assess whether those trust relationships have appropriate Condition blocks limiting which principals in the trusted account can assume the role, and flag any trust relationships that grant overly broad access to external accounts.",
        "IAM Access Analyzer from AWS provides automated policy analysis and is a valuable complement to Claude-based analysis. Access Analyzer uses formal reasoning (not machine learning) to identify policies that grant access to resources from outside the account or organization boundary, and to validate that policies match intended access patterns. Claude's analysis is complementary: where Access Analyzer is authoritative about cross-boundary access, Claude is more effective at reasoning about privilege escalation paths, policy intent versus policy effect, and generating natural-language explanations of findings that are useful for remediation planning. Production IAM audit pipelines should use both.",
      ],
      technical: {
        title: "Privilege Escalation Patterns Claude Detects",
        body: [
          "The critical privilege escalation actions in IAM fall into five categories. Policy management actions: `iam:CreatePolicyVersion` allows creating a new version of any policy, and if the policy is attached to an administrator role, the attacker can write a new version granting themselves full access; `iam:SetDefaultPolicyVersion` allows switching which version of a policy is active, enabling exploitation of a previously written malicious version. Role management actions: `iam:AttachRolePolicy` allows attaching any policy (including AdministratorAccess) to any role; `iam:PutRolePolicy` allows writing inline policies to any role. Trust relationship modification: `iam:UpdateAssumeRolePolicy` allows modifying which principals can assume a role, enabling an attacker to add themselves as a trusted principal for a privileged role.",
          "Compute-leveraged escalation paths use the combination of `iam:PassRole` and compute resource creation permissions. When a principal can both pass a role to a service and create resources using that service, they can create a resource with a highly privileged role and then access that resource. Common patterns: `iam:PassRole` + `ec2:RunInstances` allows launching an EC2 instance with an admin role; `iam:PassRole` + `lambda:CreateFunction` + `lambda:InvokeFunction` allows creating a Lambda with an admin role and invoking it to execute arbitrary code under that role; `iam:PassRole` + `glue:CreateJob` + `glue:StartJobRun` allows creating and running a Glue job with an admin role. Claude checks each of these three-action patterns systematically across the full permission set of each principal.",
          "Condition constraint analysis is where many IAM audits make incorrect assessments. A policy statement with a Condition block appears more restrictive than one without, but Condition blocks are only effective if they reference condition keys that are always present and reliably set to the expected values. `aws:RequestedRegion` is reliable — the API always knows what region is being requested. `aws:PrincipalTag` is only reliable if the tag assignment process is controlled and the attacker cannot set their own tags. `aws:SourceIp` is only reliable for user principals making API calls from controlled networks — it provides no restriction for role-based access. Claude evaluates whether each Condition block's condition keys are reliable in the deployment context and flags conditions that provide less protection than they appear to.",
          "Resource wildcard analysis identifies the policies that grant access to all resources of a type rather than specific named resources. `Resource: \"*\"` on `s3:GetObject` grants read access to every object in every S3 bucket in the account. `Resource: \"*\"` on `ec2:DescribeInstances` is relatively harmless (it only reads metadata) but `Resource: \"*\"` on `ec2:StopInstances` or `ec2:TerminateInstances` is a denial-of-service risk. Claude classifies resource wildcard findings by the specific actions they enable: read-only wildcards (low risk), state-modifying wildcards (medium risk), and destructive wildcards (high risk). This risk differentiation helps prioritize remediation when an account has many wildcard policies.",
          "IAM policy documentation and annotation generation is a final use case where Claude adds value beyond pure analysis. Large organizations accumulate IAM policies written by different teams over years, often without explanatory comments. Claude can generate a natural-language description of what each policy allows and why (based on the role it is attached to and the resources it references), which serves as documentation for future auditors and as a sanity check that the policy intent matches its actual effect. This documentation becomes part of the evidence package for compliance audits, demonstrating that the organization understands what access each IAM role has.",
        ],
        codeExample: {
          label: "IAM policy analysis prompt pattern",
          code: `def analyze_policy(role_name: str, policy_doc: dict) -> dict:
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1000,
        messages=[{"role": "user", "content": f"""Analyze this IAM policy for role '{role_name}':

{json.dumps(policy_doc, indent=2)}

Identify:
1. Overly permissive statements (Action: * or Resource: *)
2. Privilege escalation paths (iam:CreatePolicyVersion, iam:PassRole, etc.)
3. Missing Condition constraints that should be present
4. Recommended least-privilege replacement

Format as JSON with keys: findings, escalation_paths, severity, remediation"""}]
    )
    return json.loads(response.content[0].text)`,
        },
      },
      incident: {
        title: "AWS IAM Privilege Escalation — Capital One (2019)",
        when: "March–July 2019",
        where: "Capital One AWS environment",
        impact: "SSRF → EC2 metadata → IAM role → S3 access → 106M records",
        body: [
          "The Capital One breach demonstrated the real-world impact of IAM privilege chains with devastating clarity. The attack sequence was: (1) the attacker discovered an SSRF vulnerability in Capital One's WAF application running on EC2, (2) exploited the SSRF to send a request to the EC2 Instance Metadata Service (IMDS) at 169.254.169.254, (3) retrieved the temporary IAM credentials for the WAF's EC2 instance profile, (4) used those credentials to call `s3:ListBuckets` and enumerate Capital One's S3 buckets, (5) identified buckets containing customer data based on naming patterns, and (6) called `s3:GetObject` to download over 100 million customer records. The attack succeeded because the IAM role attached to the WAF EC2 instance had `s3:ListAllMyBuckets` and `s3:GetObject` on Resource `*` — permissions it needed for a specific operational function but scoped far too broadly.",
          "Claude analysis of the WAF instance role would have immediately flagged multiple violations of least-privilege: `s3:ListAllMyBuckets` on Resource `*` is unnecessary for a WAF that only needs to write logs to a specific bucket; `s3:GetObject` on Resource `*` gives read access to every object in every bucket in the account rather than just the specific log bucket; and the combination of these two permissions creates a data exfiltration risk that any attacker with access to the IAM credentials could exploit. The IAM remediation — scoping both permissions to the specific log bucket ARN — was a two-line change to the policy document. The cost of not making that change was 106 million customer records and a $190 million settlement.",
          "The IMDSv1 to IMDSv2 migration adds a layer of protection against this attack class by requiring request tokens for metadata service access, which prevents SSRF-based metadata exfiltration without a full request flow. AWS now enforces IMDSv2 by default on new EC2 instances. But IMDSv2 is a defense-in-depth control, not a replacement for least-privilege IAM. An attacker who achieves code execution on an EC2 instance (not through SSRF but through a different vector like RCE in an application vulnerability) can still access the IMDS and retrieve the instance credentials. The IAM role's permissions determine what those credentials can do. Least-privilege IAM is the control that limits the blast radius regardless of how the attacker obtains the credentials.",
          "The Capital One breach produced lasting regulatory and industry changes. The OCC consent order required Capital One to implement a formal cloud security program including automated configuration monitoring. AWS subsequently improved the IAM Access Analyzer service to detect cross-account access and publicly accessible resources. The financial services industry updated cloud security guidance to require least-privilege IAM as a hard requirement rather than a best practice. Seven years after the breach, Capital One's IAM failure remains the textbook example used to explain why overly permissive IAM roles are critical security vulnerabilities, not minor housekeeping issues.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Claude IAM Analyzer", sub: "policy reasoning engine", type: "attacker" },
          { label: "IAM Roles + Policies", sub: "identity-based + resource-based", type: "system" },
          { label: "Privilege Escalation Paths", sub: "iam:* / sts:AssumeRole", type: "victim" },
          { label: "Remediation Report", sub: "least-privilege replacements", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "Capital One breach — SSRF + overly permissive IAM role = 106M records" },
        { year: 2021, event: "AWS IAM Access Analyzer launched — automated policy analysis" },
        { year: 2023, event: "Claude begins analyzing full IAM configurations with privilege chain reasoning", highlight: true },
        { year: 2024, event: "AI IAM analysis reduces policy review time by 90% at enterprise scale" },
      ],
      keyTakeaways: [
        "Privilege escalation actions to flag: iam:CreatePolicyVersion, iam:AttachRolePolicy, iam:PutRolePolicy, iam:UpdateAssumeRolePolicy, iam:PassRole",
        "Claude reasons about effective permissions across all policy layers: identity-based, resource-based, permission boundaries, and SCPs",
        "Ask Claude: 'If this role is compromised, what is the maximum privilege an attacker can achieve through legitimate API calls?'",
        "Condition blocks only restrict access when the referenced condition keys are reliably set — Claude evaluates whether conditions provide real protection",
        "Resource wildcard analysis: classify by action risk level (read-only low, state-modifying medium, destructive high)",
        "Compute-leveraged escalation: iam:PassRole + ec2:RunInstances, + lambda:CreateFunction, or + glue:CreateJob are critical patterns",
        "Least-privilege remediation requires analyzing what the principal actually uses — scan the code to find the minimum required actions and resources",
        "Capital One (2019): two overly broad IAM permissions turned an SSRF into a 106M-record breach and $190M settlement",
        "AWS IAM Access Analyzer and Claude analysis are complementary: Access Analyzer for boundary violations, Claude for escalation paths and intent analysis",
      ],
      references: [
        { title: "AWS IAM Privilege Escalation (Rhino Security)", url: "https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/" },
        { title: "AWS IAM Access Analyzer", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html" },
      ],
    },
    ctf: {
      scenario: "The IAM analyzer agent has completed its run on the target account. Three policy analysis files contain the flag fragments. Read each to understand the privilege escalation chain and collect the flag.",
      hint: "IAM analysis output is in /iam-analysis. Three files contain the flag pieces.",
      hints: [
        "List /iam-analysis to find the output files.",
        "Start with policy-findings.txt for the first fragment.",
        "The escalation-chain.txt and remediation.txt contain the remaining fragments.",
      ],
      files: {
        "/iam-analysis/policy-findings.txt": `# IAM Policy Analysis — Claude claude-opus-4-7

Role: prod-data-processor
Policy: arn:aws:iam::123456789012:policy/DataProcessorPolicy

CRITICAL Finding: Action wildcards on sensitive services
  Statement: {"Action": "s3:*", "Resource": "*", "Effect": "Allow"}
  Risk: Full S3 access — can read/write/delete any bucket in account

HIGH Finding: iam:PassRole present without Condition
  Statement: {"Action": "iam:PassRole", "Resource": "*"}
  Risk: Can pass any role to any service — privilege escalation vector

Fragment-1: FLAG{14M_PR1V_
`,
        "/iam-analysis/escalation-chain.txt": `# Privilege Escalation Chain Analysis

Chain identified for role: prod-data-processor

Step 1: iam:PassRole (Resource: *) — can pass admin-role to EC2
Step 2: ec2:RunInstances — can launch new EC2 instance
Step 3: Launched EC2 inherits admin-role
Step 4: Full account access achieved

Severity: CRITICAL — full account takeover from data processor compromise

Fragment-2: 3SC_
`,
        "/iam-analysis/remediation.txt": `# Remediation Recommendations

prod-data-processor policy replacement:
  REMOVE: s3:* on Resource:*
  ADD: s3:GetObject, s3:PutObject on Resource: arn:aws:s3:::acme-data-proc/*

  REMOVE: iam:PassRole on Resource:*
  ADD: Remove iam:PassRole entirely (data processor does not need to launch instances)

Estimated effort: 2 hours
Risk reduction: CRITICAL → LOW

Fragment-3: CH41N}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. iam:PassRole without Condition constraints is a privilege escalation vector — it lets any service launch instances with admin roles
  2. Claude reasons across policy layers to answer: "What is the maximum privilege this role can escalate to if compromised?" — a question manual review rarely completes
  3. Capital One (2019): an overly permissive IAM role turned an SSRF vulnerability into a 106M-record breach; least-privilege scoping is the direct mitigation
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "iam-analysis", isDir: true }],
        "/iam-analysis": [
          { name: "policy-findings.txt", isDir: false },
          { name: "escalation-chain.txt", isDir: false },
          { name: "remediation.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/iam-analysis/policy-findings.txt", value: "FLAG{14M_PR1V_", label: "Fragment 1 — Policy Findings" },
        { trigger: "/iam-analysis/escalation-chain.txt", value: "3SC_", label: "Fragment 2 — Escalation Chain" },
        { trigger: "/iam-analysis/remediation.txt", value: "CH41N}", label: "Fragment 3 — Remediation" },
      ],
    },
  },

  // ─── audit-a06: MCP Server Integration ───────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "MCP Integration Lab", location: "San Francisco, California", era: "Present Day", emoji: "🔗" },
    id: "audit-a06",
    order: 6,
    title: "The Protocol Integrator",
    subtitle: "MCP Server Integration — filesystem, git, and web fetch tools",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-06", name: "MCP Integrator", emoji: "🔗" },
    challengeType: "ctf",
    info: {
      tagline: "MCP is the USB standard for AI tools. One protocol, every system.",
      year: 2024,
      overview: [
        "The Model Context Protocol (MCP) is an open standard for connecting AI models to external tools and data sources, created by Anthropic and released in late 2024. Before MCP, every team building an AI-powered audit tool had to write custom integration code for each data source: a custom AWS SDK wrapper, a custom git history reader, a custom log parser. MCP standardizes this integration layer through a client-server architecture where MCP servers expose resources and callable tools, and AI models like Claude connect as MCP clients and access those resources through a uniform interface regardless of what system the server is connected to.",
        "For audit automation, MCP delivers its most immediate value through the ecosystem of pre-built servers for common data sources. The official Anthropic MCP server registry includes servers for the local filesystem (read and write files with configurable access boundaries), git repositories (analyze commit history, diff branches, check log messages), GitHub (access repositories, pull requests, issues, and actions), web pages (fetch and parse public documentation, check security headers, retrieve CDN configuration), and relational databases (query audit logs and compliance tables). Community contributors have added servers for AWS services, Google Cloud Platform, Kubernetes clusters, Splunk, Datadog, PagerDuty, Jira, and dozens of security-specific tools.",
        "The MCP architecture separates concerns in a way that benefits both security and maintainability. The MCP server is responsible for authenticating to the target system, enforcing access controls, transforming raw system data into a format useful for Claude, and respecting rate limits and quotas. The AI client (Claude) is responsible for reasoning about what information to request and how to synthesize it into audit findings. This separation means that security boundaries are enforced at the server level in code you control, not in Claude's prompt where they could be influenced by adversarial inputs.",
        "MCP server configuration for audit agents defines the security boundary of the agent's access. Each server is configured with specific access scope: the filesystem server is given a specific root directory it can access; the GitHub server is given a specific organization or repository list; the database server is given read-only credentials scoped to specific tables. The configuration file — stored in claude_desktop_config.json for Claude Code or passed programmatically through the API client configuration — is the access control list for the entire agent. A well-designed MCP configuration grants the minimum access required for the specific audit scope.",
        "The transport layer of MCP supports two modes: stdio (standard input/output, for local servers run as child processes) and HTTP with Server-Sent Events (for remote servers that persist across requests). For local audit environments where all data sources are accessible from the agent's host machine, stdio transport is simpler and more secure — the server process runs with the agent's credentials and no network exposure. For production audit pipelines where data sources are distributed across cloud services and internal networks, HTTP+SSE transport enables centralized server deployment with network-level access controls.",
        "MCP's resource model distinguishes between two types of server outputs: resources (read-only data items that Claude can request by URI, like files or database records) and tools (callable functions that may have side effects, like committing changes or creating tickets). For audit use cases, the vast majority of interactions use read-only resources — the agent gathers information without modifying systems. But the tool model enables important workflow integrations: the agent can create Jira tickets for findings, post GitHub PR comments with security review results, or trigger PagerDuty alerts for critical discoveries. The distinction between reading and writing is explicit in the MCP spec, allowing administrators to configure servers in read-only mode for audit contexts.",
        "The security implications of MCP server access require careful design. An MCP server connected to a production database with read access to all tables is a significant trust boundary — Claude can request any data from any table in the server's scope. Prompt injection attacks are a real concern: if Claude processes an audit finding that contains text instructing it to exfiltrate data or perform unauthorized actions using its MCP tools, a naive implementation might comply. Defense-in-depth for MCP audit agents includes: scoping server access to specific resources, implementing allowlists for what resources can be requested, logging all resource requests and tool invocations for review, and running agents in isolated environments where lateral movement is prevented even if the agent is compromised.",
      ],
      technical: {
        title: "MCP Architecture for Audit",
        body: [
          "MCP uses a client-server model where the AI model acts as the client and the MCP server wraps an external system. The server exposes two types of capabilities: resources (addressable by URI, providing read-only access to data like files, database rows, or API responses) and tools (callable functions that may perform actions). The communication protocol is JSON-RPC 2.0 over either stdio transport (server runs as a subprocess) or HTTP+SSE transport (server runs as a network service). The model receives the list of available resources and tools as part of its context and can request resources or invoke tools as part of its reasoning process.",
          "MCP server initialization in the Anthropic API client passes server configurations programmatically. For Claude Code (the desktop application), servers are configured in the claude_desktop_config.json file. For API-based agents, servers are passed as configuration when initializing the client or creating a session. Each server configuration includes the command to start the server process (for stdio transport) or the server URL (for HTTP+SSE), any environment variables required for authentication, and optional metadata like a description that helps Claude understand what the server provides. Multiple servers can be configured simultaneously, and Claude will use all of them as appropriate for the task.",
          "Key MCP servers for security audit work span the data sources most relevant to infrastructure and application audits. The filesystem server (`@modelcontextprotocol/server-filesystem`) provides file read and write access within a configured root directory, enabling scanning of local configuration files, reading evidence artifacts, and writing audit reports. The GitHub server (`@modelcontextprotocol/server-github`) provides access to repository contents, commit history, pull request metadata, issue tracking, and GitHub Actions workflow results. The fetch server (`@modelcontextprotocol/server-fetch`) retrieves public web pages including API documentation, security policy pages, and HTTP response headers for web application assessments. The postgres server (`@modelcontextprotocol/server-postgres`) enables read-only queries against relational databases for log analysis and compliance data retrieval.",
          "Security hardening for MCP audit configurations follows the principle of minimum viable access. Filesystem servers should be configured with a specific root directory limited to the audit workspace, not the entire filesystem. GitHub servers should be configured with a read-only personal access token scoped to specific repositories or organizations, not a full-access token. Database servers should use read-only credentials with access only to the tables required for the audit queries. All server configurations should avoid storing credentials in the config file directly — use environment variable references or a secrets manager to inject credentials at runtime. Log all MCP tool invocations with their arguments and responses for audit trail purposes.",
          "Building custom MCP servers for organization-specific audit data sources is straightforward using the official SDKs for Python and TypeScript. A custom MCP server wraps any API or data source with the standard MCP interface: implement the `list_resources` handler to return available data, implement the `read_resource` handler to return data by URI, and implement the `call_tool` handler for any write operations. For internal audit use cases, common custom servers include: a Splunk search server that allows Claude to query SIEM data, a ServiceNow server that allows Claude to read change management records, a Vault server that allows Claude to check which secrets are stored (not their values), and a Terraform state server that allows Claude to read the current state of infrastructure.",
        ],
        codeExample: {
          label: "MCP config for audit agent (claude_desktop_config.json)",
          code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/audit/workspace"],
      "description": "Read audit evidence files and configuration documents"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "<token>"},
      "description": "Access GitHub repos for source code and history review"
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "description": "Fetch public web pages for compliance documentation"
    }
  }
}`,
        },
      },
      incident: {
        title: "SolarWinds Supply Chain — Lack of Automated Audit Tooling (2020)",
        when: "October 2019 – December 2020",
        where: "SolarWinds build pipeline, global",
        impact: "18,000+ organizations compromised; SUNBURST backdoor in Orion updates",
        body: [
          "The SolarWinds SUNBURST attack is the defining supply chain security incident of the modern era. The attackers — attributed to the Russian SVR — gained access to SolarWinds' development environment and modified the Orion software build process to inject the SUNBURST backdoor into legitimate signed software updates. The attack persisted undetected from approximately October 2019 through December 2020 — over fourteen months — before being discovered by FireEye, which was itself a victim. During this period, approximately 18,000 organizations downloaded and installed the backdoored Orion update, and the attackers used the backdoor to gain persistent access to approximately 100 high-value targets including US government agencies and major technology companies.",
          "The technical indicators of the attack existed across multiple systems simultaneously, but no system correlated them. The git repository contained a commit that added the backdoor code but was not associated with any pull request or code review in the project management system. The build system compiled and signed binaries that differed from the compiled output of the source code (the backdoor was injected during the build process before signing). The artifact store contained a file hash for the distributed binary that did not match the hash of the binary that would have been produced by compiling the source code. Any one of these indicators alone might have been ambiguous; the correlation of all three would have been conclusive.",
          "An MCP-connected audit agent with simultaneous access to the git server, build system, project management system, and artifact repository would have been positioned to detect this correlation. The agent could query the git server for commits that modified security-sensitive source files, cross-reference those commits against pull requests in the project management system to identify commits without associated code reviews, compare build artifact hashes against locally compiled hashes to detect build process tampering, and correlate build timestamps with git commit timestamps to identify artifacts built from source states that never existed in the repository. Each of these checks individually requires custom integration code; MCP provides the standardized integration layer that makes the combined analysis practical.",
          "The SolarWinds incident prompted a fundamental reassessment of software supply chain security across the industry and government. Executive Order 14028 (Improving the Nation's Cybersecurity, 2021) mandated Software Bill of Materials (SBOM) requirements for software sold to the US government. NIST published SP 800-218 (Secure Software Development Framework) with specific controls for build environment security and artifact integrity. These regulatory developments mean that supply chain security audit — including the kind of cross-system correlation that MCP-connected agents enable — is now a compliance requirement for organizations selling to government customers, not just a security best practice.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Claude Audit Agent", sub: "MCP client", type: "attacker" },
          { label: "MCP Servers", sub: "filesystem / git / fetch / db", type: "system" },
          { label: "Audit Data Sources", sub: "repos / configs / logs", type: "victim" },
          { label: "Unified Audit Report", sub: "cross-system findings", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "SolarWinds SUNBURST — supply chain attack undetected for 14 months" },
        { year: 2024, event: "Anthropic releases Model Context Protocol (MCP) — open standard", highlight: true },
        { year: 2024, event: "MCP ecosystem grows to 1000+ community servers" },
        { year: 2025, event: "MCP becomes standard integration layer for enterprise AI audit tooling" },
      ],
      keyTakeaways: [
        "MCP is the standardized protocol for connecting Claude to external audit data sources — one server spec works in Claude Code and in production API pipelines",
        "Pre-built servers for filesystem, git, GitHub, fetch, postgres eliminate custom integration boilerplate — focus on audit logic, not I/O code",
        "MCP separates concerns: servers enforce access controls and rate limits; Claude reasons about what to request and how to synthesize findings",
        "Scope each MCP server to minimum required access: specific directories, read-only credentials, specific repositories, specific database tables",
        "Stdio transport for local single-host audit environments; HTTP+SSE for distributed cloud-based audit pipelines",
        "MCP resource model distinguishes read-only resources from write tools — configure audit servers in read-only mode to prevent unintended system modifications",
        "Custom MCP servers wrap any internal system using the official Python or TypeScript SDK — Splunk, ServiceNow, Vault, Terraform state are high-value targets",
        "SolarWinds (2020) succeeded partly because no system correlated git commits, build artifacts, and project management records — MCP enables this cross-system correlation",
        "Prompt injection through retrieved content is a real attack vector against MCP agents — log all invocations and run agents in isolated environments",
      ],
      references: [
        { title: "Model Context Protocol Documentation", url: "https://modelcontextprotocol.io/docs" },
        { title: "MCP Server Registry", url: "https://github.com/modelcontextprotocol/servers" },
      ],
    },
    ctf: {
      scenario: "You are configuring MCP servers for an audit agent. Three configuration fragments are stored across the MCP lab filesystem. Assemble the configuration to complete the audit pipeline setup.",
      hint: "MCP config fragments are in /mcp-lab. Read each fragment file.",
      hints: [
        "List /mcp-lab to find the configuration fragments.",
        "The fragments are split across servers/, config/, and keys/ directories.",
        "Read all three files to collect the flag pieces.",
      ],
      files: {
        "/mcp-lab/servers/filesystem-server.json": `{
  "server": "filesystem",
  "command": "npx @modelcontextprotocol/server-filesystem",
  "args": ["/audit/workspace"],
  "status": "configured",
  "fragment": "FLAG{MCP_"
}`,
        "/mcp-lab/config/mcp-config.json": `{
  "mcpServers": {
    "filesystem": "configured",
    "github": "configured",
    "fetch": "configured"
  },
  "audit_scope": "all-repos-in-org",
  "fragment": "4UD1T_"
}`,
        "/mcp-lab/keys/integration-key.txt": `# MCP Integration Key
# This key authorizes the audit agent to connect all configured MCP servers
# Key hash: sha256:a3f9b2c1d4e5f678...

Integration status: ACTIVE
All MCP servers: CONNECTED
Fragment: PR0T0C0L}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. MCP is the standardized protocol for connecting Claude to audit data sources — one server spec works in Claude Code IDE and in production API pipelines
  2. Pre-built MCP servers (filesystem, git, GitHub, fetch, postgres) eliminate custom integration work; focus on audit logic, not I/O boilerplate
  3. SolarWinds (2020) succeeded partly because no MCP-style integration connected git history, build artifacts, and network monitoring — the anomaly existed in each system but nothing correlated them
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "mcp-lab", isDir: true }],
        "/mcp-lab": [
          { name: "servers", isDir: true },
          { name: "config", isDir: true },
          { name: "keys", isDir: true },
        ],
        "/mcp-lab/servers": [{ name: "filesystem-server.json", isDir: false }],
        "/mcp-lab/config": [{ name: "mcp-config.json", isDir: false }],
        "/mcp-lab/keys": [{ name: "integration-key.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/mcp-lab/servers/filesystem-server.json", value: "FLAG{MCP_", label: "Fragment 1 — Server Config" },
        { trigger: "/mcp-lab/config/mcp-config.json", value: "4UD1T_", label: "Fragment 2 — MCP Config" },
        { trigger: "/mcp-lab/keys/integration-key.txt", value: "PR0T0C0L}", label: "Fragment 3 — Integration Key" },
      ],
    },
  },

  // ─── audit-a07: Agentic IaC Review ───────────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "IaC Scanning Lab", location: "San Francisco, California", era: "Present Day", emoji: "📐" },
    id: "audit-a07",
    order: 7,
    title: "The Infrastructure Auditor",
    subtitle: "Agentic IaC Review — Claude reading Terraform plans",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-07", name: "IaC Auditor", emoji: "📐" },
    challengeType: "ctf",
    info: {
      tagline: "The terraform plan is the audit artifact. Claude reads it before apply.",
      year: 2024,
      overview: [
        "Infrastructure as Code (IaC) has transformed how organizations provision and manage cloud infrastructure. Terraform, CloudFormation, Pulumi, and Kubernetes manifests describe the exact intended state of every infrastructure resource in machine-readable format. This transformation creates a unique audit opportunity: the security review can happen on the code representation before the infrastructure is deployed, catching misconfigurations at the cheapest possible point in the development lifecycle. A finding in a pull request costs an engineering hour to fix; the same finding after a production deployment of a misconfigured resource can cost millions.",
        "Agentic IaC review integrates the security analysis into the CI/CD pipeline as a required step between code changes and infrastructure deployment. When a developer opens a pull request that modifies Terraform files, the CI system automatically runs `terraform plan`, converts the plan to JSON with `terraform show -json`, sends the plan output to Claude with a structured audit prompt, receives structured findings JSON back, posts a formatted security review comment on the pull request, and optionally blocks the merge if critical findings are present. The developer gets security feedback while the context is fresh, before any infrastructure has been modified.",
        "Claude's ability to understand IaC semantics without explicit rule programming is the key advantage over traditional static analysis tools like tfsec or Checkov. Static analysis tools operate on a library of specific rules: rule X says that S3 bucket resources must have `server_side_encryption_configuration` blocks, and the tool flags any S3 bucket that lacks one. Claude reasons about the intent and effect of infrastructure configurations: it knows that `publicly_accessible = true` on an RDS instance in a production environment is a finding, that a security group with `cidr_blocks = [\"0.0.0.0/0\"]` on port 3306 exposes a database to the internet, and that a CloudTrail trail being deleted is a critical security control removal — without needing each of these rules to be explicitly programmed.",
        "The terraform plan output provides richer information than static analysis of source code because it includes the planned diff — what changes are being made — rather than just the current state of the configuration. A change from `encrypted = false` to `encrypted = true` is a remediation that should be noted positively, not a finding. A change from `publicly_accessible = false` to `publicly_accessible = true` is a critical regression that should block deployment. Claude reads the planned changes in context and distinguishes security improvements from security regressions, a distinction that static analysis tools treating all configurations as equal cannot make.",
        "Multi-resource analysis captures risk patterns that single-resource rules miss. A single S3 bucket with public access might be intentional for a public website's asset hosting. The same S3 bucket with public access combined with an IAM role that has `s3:GetObject` on `*` is a data exfiltration risk because the public access path provides one route and the over-permissive IAM role provides another. Claude analyzes the interactions between resources in the same Terraform plan to identify multi-resource risk patterns: a database with an overly permissive security group combined with a Lambda that has access to the same database through a broader IAM role creates a risk chain that neither resource alone would flag.",
        "IaC files themselves can contain sensitive information that becomes a security risk if the files are exposed. Internal network topology (CIDR ranges for internal subnets, VPC IDs, availability zone designations), resource naming conventions that reveal application architecture, and hardcoded references to internal services (internal load balancer DNS names, internal API endpoints) all help an attacker who obtains the IaC files map the target environment. Claude reviews IaC files for this kind of information leakage as part of the security review: are any sensitive internal details hardcoded that should instead be passed as variables or read from a parameter store?",
        "The remediation feedback cycle is where IaC review delivers its greatest long-term value. When Claude reviews a Terraform plan and finds that an S3 bucket lacks encryption, it doesn't just say 'add encryption' — it generates the specific Terraform resource block that adds the `aws_s3_bucket_server_side_encryption_configuration` resource and links it to the existing bucket. Developers receive a specific code change they can implement in minutes rather than a vague finding they need to research. Over time, the pattern of specific, actionable feedback educates the development team about security requirements, reducing the number of findings in subsequent pull requests as developers internalize the security patterns.",
      ],
      technical: {
        title: "PR-Integrated IaC Review Pipeline",
        body: [
          "The CI/CD pipeline integration for IaC review follows a specific sequence that maximizes both security coverage and developer experience. When a pull request modifies any `.tf`, `.yaml`, or `.json` infrastructure file, a CI job triggers that: (1) checks out the branch, (2) runs `terraform init` with the production state backend, (3) runs `terraform plan -out=plan.tfplan` to generate the execution plan, (4) runs `terraform show -json plan.tfplan > plan.json` to convert the binary plan to structured JSON, (5) sends plan.json to the review agent, (6) receives structured findings as JSON, (7) posts a formatted GitHub PR comment using the GitHub API, and (8) exits with a non-zero status code if critical findings are present, causing the required status check to fail and blocking the merge.",
          "The Claude prompt for IaC review requires specific engineering to produce consistent, actionable output. The prompt must specify: the cloud provider and version (AWS Terraform provider 5.x), the security baseline being applied (CIS AWS Foundations Benchmark v1.4, specific level), the severity threshold that triggers a merge block (CRITICAL only, or CRITICAL and HIGH), the output format (JSON with specific fields), and any organizational exceptions that should not be flagged (e.g., a specific S3 bucket that is intentionally public for the public website). Without this specificity, Claude produces findings of varying quality and format that are difficult to process programmatically or compare across runs.",
          "Severity classification for IaC findings should map to the potential impact of deploying the misconfigured infrastructure. CRITICAL findings are configurations that create immediate data exposure or complete access control bypass: public access on databases, security group rules allowing internet ingress on management ports, CloudTrail deletion, KMS key deletion without pending period. HIGH findings are configurations that materially increase risk without creating immediate exposure: missing encryption on storage, insufficient backup retention, overly broad IAM permissions. MEDIUM findings are violations of security best practices without immediate risk: missing resource tagging, suboptimal logging configuration, non-recommended TLS versions. LOW findings are style and consistency issues that don't affect security.",
          "Integration with existing static analysis tools creates a defense-in-depth approach. Checkov or tfsec run first as fast, rules-based gates that catch obvious violations at low computational cost. Claude runs second as the semantic reasoning layer that catches complex findings, multi-resource interactions, and organization-specific policy violations. This layered approach avoids the cost of sending every IaC change to Claude when simple static analysis tools can catch obvious issues immediately. Claude's analysis is reserved for the subtle findings that justify its additional latency and cost.",
          "Exception management is a critical operational requirement for sustainable IaC review. Some resources are intentionally configured in ways that trigger security findings: a public S3 bucket for a static website, a security group with internet access for a load balancer, a database without encryption for a development environment. These exceptions need to be documented with a business justification, approved by a security reviewer, and tracked in a suppression file that the review agent reads before flagging findings. Claude can help manage the exception process by evaluating submitted justifications for reasonableness and flagging exceptions that are expiring or lack required approval documentation.",
        ],
        codeExample: {
          label: "IaC review agent — Terraform plan analysis",
          code: `def review_terraform_plan(plan_json: str) -> dict:
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=2000,
        messages=[{"role": "user", "content": f"""Review this Terraform plan for security issues.
Apply CIS AWS Foundations Benchmark v1.4 as the baseline.

{plan_json}

For each resource change, identify:
1. Security misconfigurations (public access, unencrypted storage, open security groups)
2. Missing required controls (CloudTrail, VPC flow logs, MFA delete on S3)
3. Dangerous changes (deleting security controls, weakening IAM policies)

Return JSON: {{"findings": [{{"resource": str, "severity": str, "issue": str, "recommendation": str}}]}}
Severity: CRITICAL | HIGH | MEDIUM | LOW"""}]
    )
    return json.loads(response.content[0].text)`,
        },
      },
      incident: {
        title: "Twitch Source Code Leak — Terraform Misconfiguration (2021)",
        when: "October 2021",
        where: "Twitch AWS infrastructure",
        impact: "125GB of source code, internal tools, and creator payout data leaked",
        body: [
          "The Twitch data leak of October 2021 exposed 125 gigabytes of highly sensitive internal data including Twitch's full source code history, internal developer tools, mobile client code, and three years of creator payment data. The leak also included internal Terraform configuration files that documented Twitch's AWS infrastructure architecture in considerable detail. The exposure of IaC files is a secondary impact of the primary breach, but it illustrates an important point: IaC files containing internal network topology, resource naming conventions, and infrastructure architecture details are valuable intelligence for attackers conducting reconnaissance against the organization's cloud environment.",
          "The Twitch incident demonstrates the dual security role of IaC review. The primary role is preventing misconfigured infrastructure from being deployed by catching security issues in pull requests before they reach production. The secondary role is ensuring that IaC files themselves do not contain information that would accelerate an attacker's ability to navigate the environment if the files are exfiltrated. Claude's IaC review can flag both categories: configuration security issues in the Terraform resources and information leakage in the configuration values — internal CIDR ranges, internal DNS names, resource ARNs for sensitive resources, and comments that document security-relevant architectural decisions.",
          "The Twitch leak reinforced the industry shift toward secrets management tools and variable-based IaC design. Hardcoding any specific value in IaC files — even non-secret values like internal network CIDR ranges — creates a documentation artifact that outlives the infrastructure it describes and may be committed to repositories or transmitted in ways that are difficult to control. The alternative is using Terraform variables, data sources, and remote state references to eliminate hardcoded values. Claude can identify hardcoded values in IaC files and suggest which should be replaced with variable references or data source lookups, supporting both security and operational maintainability.",
          "The regulatory implications of IaC security extend to software supply chain requirements. NIST SP 800-218 (Secure Software Development Framework) includes controls for infrastructure as code security review as part of the broader software development security program. FedRAMP authorization requirements for cloud service providers explicitly include IaC security review as a required control. For organizations in regulated industries or seeking government contracts, automated IaC review with documented results is becoming a required evidence artifact for compliance certification, not just a security best practice.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pull Request", sub: ".tf file changes", type: "attacker" },
          { label: "Claude IaC Reviewer", sub: "terraform plan analysis", type: "system" },
          { label: "Infrastructure Changes", sub: "S3 / RDS / SG / IAM", type: "victim" },
          { label: "PR Security Comment", sub: "findings before merge", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "tfsec released — first open-source Terraform security scanner" },
        { year: 2021, event: "Twitch leak — IaC configs expose infrastructure architecture" },
        { year: 2022, event: "Checkov adds 1000+ IaC security policies" },
        { year: 2024, event: "Claude IaC review integrated into CI/CD pipelines — semantic analysis", highlight: true },
      ],
      keyTakeaways: [
        "Integrate IaC review into CI/CD: terraform plan → JSON conversion → Claude analysis → PR comment → merge block on critical findings",
        "Claude understands IaC semantics without explicit rules — it reasons about configuration intent and effect, not just pattern matching",
        "CIS AWS Foundations Benchmark v1.4 is the standard baseline for Terraform security reviews; map findings to specific benchmark controls",
        "CRITICAL findings must block PR merge via required status checks — optional review comments get bypassed under delivery pressure",
        "Multi-resource analysis catches risk chains that single-resource rules miss: combinations of misconfigurations create compounding vulnerabilities",
        "IaC files themselves leak sensitive data if exposed — flag hardcoded internal network details, DNS names, and architecture-revealing comments",
        "Exception management requires documented business justification, approval chain, and expiration date — manage exceptions as suppressions in a versioned file",
        "Layer static analysis tools (Checkov, tfsec) with Claude — static tools catch obvious violations fast; Claude catches complex semantic findings",
        "Twitch (2021): exposed Terraform files gave attackers a detailed map of AWS infrastructure, accelerating post-breach lateral movement",
      ],
      references: [
        { title: "CIS AWS Foundations Benchmark", url: "https://www.cisecurity.org/benchmark/amazon_web_services" },
        { title: "Checkov IaC Scanner", url: "https://github.com/bridgecrewio/checkov" },
      ],
    },
    ctf: {
      scenario: "An agentic IaC reviewer ran against a Terraform plan and stored its findings. Three finding files contain the flag. Read each to understand the infrastructure vulnerabilities.",
      hint: "IaC review output is in /iac-review. Read the finding files in the subdirectories.",
      hints: [
        "List /iac-review to find the output structure.",
        "Check s3/, rds/, and sg/ directories for findings.",
        "Each findings file contains one flag fragment.",
      ],
      files: {
        "/iac-review/s3/s3-findings.txt": `# S3 Bucket — IaC Review Finding

Resource: aws_s3_bucket.prod_data
Change: CREATE

CRITICAL: bucket ACL set to "public-read"
  Line 12: acl = "public-read"
  Recommendation: Remove ACL, use bucket policies with explicit denies

HIGH: Server-side encryption not configured
  Recommendation: Add aws_s3_bucket_server_side_encryption_configuration

Fragment-1: FLAG{14C_
`,
        "/iac-review/rds/rds-findings.txt": `# RDS Instance — IaC Review Finding

Resource: aws_db_instance.prod_postgres
Change: MODIFY

HIGH: publicly_accessible changing from false to true
  This exposes the database endpoint to the public internet
  Recommendation: Set publicly_accessible = false; use VPC + bastion for access

MEDIUM: backup_retention_period reducing from 14 to 1
  Recommendation: Maintain minimum 7-day retention for production databases

Fragment-2: CL4UD3_
`,
        "/iac-review/sg/sg-findings.txt": `# Security Group — IaC Review Finding

Resource: aws_security_group_rule.allow_ssh
Change: CREATE

CRITICAL: SSH open to 0.0.0.0/0
  cidr_blocks = ["0.0.0.0/0"] on port 22
  Recommendation: Restrict to VPN CIDR or use AWS Systems Manager Session Manager

IaC Review Complete — 2 CRITICAL, 2 HIGH, 1 MEDIUM
All findings posted as PR comment. Merge blocked pending CRITICAL resolution.

Fragment-3: R3V13W}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. IaC review in CI/CD catches misconfigurations before deployment — a PR comment costs nothing; a production breach costs millions
  2. Claude understands IaC semantics without explicit rule programming — it knows publicly_accessible=true on RDS or 0.0.0.0/0 on port 22 are findings
  3. Critical findings blocking PR merge (via required status checks) is the enforcement mechanism — without it, developers can override the review
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "iac-review", isDir: true }],
        "/iac-review": [
          { name: "s3", isDir: true },
          { name: "rds", isDir: true },
          { name: "sg", isDir: true },
        ],
        "/iac-review/s3": [{ name: "s3-findings.txt", isDir: false }],
        "/iac-review/rds": [{ name: "rds-findings.txt", isDir: false }],
        "/iac-review/sg": [{ name: "sg-findings.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/iac-review/s3/s3-findings.txt", value: "FLAG{14C_", label: "Fragment 1 — S3 Findings" },
        { trigger: "/iac-review/rds/rds-findings.txt", value: "CL4UD3_", label: "Fragment 2 — RDS Findings" },
        { trigger: "/iac-review/sg/sg-findings.txt", value: "R3V13W}", label: "Fragment 3 — SG Findings" },
      ],
    },
  },

  // ─── audit-a08: Automated Evidence Collection ─────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Evidence Collection Lab", location: "Washington, D.C.", era: "Present Day", emoji: "📋" },
    id: "audit-a08",
    order: 8,
    title: "The Evidence Collector",
    subtitle: "Automated Evidence Collection — Claude structuring audit artifacts",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-08", name: "Evidence Collector", emoji: "📋" },
    challengeType: "ctf",
    info: {
      tagline: "Evidence collection is 60% of audit time. Agents do it in 6 minutes.",
      year: 2024,
      overview: [
        "Evidence collection is the most time-consuming and operationally intensive phase of traditional IT audit engagements. On a typical SOC 2 or ISO 27001 audit, evidence collection consumes 50–60% of the total audit hours. Auditors manually export screenshots from system consoles, download log files from SIEM platforms, run and capture configuration queries, collect approval records from ticketing systems, and organize hundreds of artifacts into structured evidence packages mapped to specific control requirements. This process takes weeks for large engagements, involves substantial coordination with IT staff to produce evidence on demand, and is inherently point-in-time — the evidence reflects the system state at the moment of collection, which may not represent the state during the period being audited.",
        "Agentic evidence collection automates this workflow by connecting Claude to the actual systems where evidence resides. For each control in the audit scope, the agent knows: what evidence demonstrates that the control is operating effectively, which systems and APIs provide that evidence, how to retrieve it in a format that satisfies the auditor's requirements, and how to validate that the retrieved evidence actually supports the control objective rather than merely existing as a file. The agent executes this workflow for every control in scope systematically, producing a complete evidence package without requiring the IT team to export anything manually.",
        "Control coverage is the critical metric for evidence collection quality. A control that requires evidence but receives none is an automatic finding. A control that receives evidence but whose evidence does not actually demonstrate the control's operation is a more subtle failure — and one that automated evidence collection with Claude validation is uniquely positioned to catch. Claude can assess whether a piece of evidence actually satisfies a control requirement by reasoning about what the control requires and what the evidence demonstrates. An IAM credential report showing MFA status is direct evidence for an MFA control; a general user list with account creation dates is not direct evidence for the same control.",
        "The evidence package structure follows established audit methodology. Each piece of evidence is a structured artifact containing: the control identifier (COBIT DS5.4, SOC 2 CC6.1, NIST AC-2), the collection timestamp (when the evidence was retrieved, not when the system state was current), the collection method (API call parameters, SQL query, system command), the raw evidence data, and Claude's assessment of whether the evidence satisfies the control (satisfied / partially satisfied / not satisfied) with a brief explanation of any gaps. This structure enables auditors to review evidence efficiently, focusing their judgment on gap assessments and items requiring additional context.",
        "Continuous evidence collection transforms the audit model from point-in-time snapshot to continuous assurance. Instead of collecting evidence once per audit cycle (annually or semi-annually), the agent collects evidence on a defined schedule that matches the control's assurance requirements. Controls requiring monthly evidence (patch management, vulnerability scanning) are collected monthly. Controls requiring quarterly evidence (access reviews, vendor assessments) are collected quarterly. Controls with real-time requirements (intrusion detection system alerting, failed authentication monitoring) are monitored continuously with evidence snapshots triggered by threshold events. The result is an always-current evidence library that makes the annual audit a review exercise rather than a collection exercise.",
        "Integration with compliance management platforms (Vanta, Drata, Secureframe, Tugboat Logic) creates end-to-end automation from evidence collection through certification. These platforms manage the framework mapping (which controls apply to which certification), the evidence requirements per control, the auditor portal for evidence review, and the certification workflow. Agentic evidence collection populates these platforms' evidence libraries automatically, eliminating the manual evidence upload step that is currently one of the primary bottlenecks in continuous compliance programs. Claude's evidence validation assessment provides an additional quality layer that flags potentially insufficient evidence before it reaches the auditor's review queue.",
        "The human auditor's role in an agentic evidence collection model shifts from collection operator to collection reviewer. Instead of spending 60% of engagement hours retrieving evidence, the auditor spends that time reviewing Claude's evidence assessments, investigating gaps, making professional judgments about whether partially-satisfied controls meet the materiality threshold for findings, and communicating with management about remediation. This shift dramatically improves audit quality: auditors applying professional judgment to gap analysis and materiality assessment produce better audit reports than auditors spending most of their time on evidence retrieval logistics. The judgment work is what clients actually pay for.",
      ],
      technical: {
        title: "Evidence Package Structure",
        body: [
          "A production-grade evidence package follows a hierarchical structure that enables efficient auditor review. The top level is the audit engagement: scope definition, applicable frameworks, collection period, and overall compliance posture summary. The second level is the control domain: grouped by framework section (logical access, change management, incident response, etc.) with domain-level summary statistics. The third level is the individual control: control statement, evidence requirement, collected evidence artifacts, Claude's assessment, and any identified gaps. The fourth level is the evidence artifact: raw data, collection metadata, and supporting context. This hierarchy allows auditors to navigate from the summary to the specific artifact without losing the context of which control each artifact supports.",
          "Evidence validation is where Claude adds unique analytical value beyond simple collection automation. Validation requires reasoning about the semantic relationship between a control requirement and an evidence artifact. The control 'All privileged accounts must have MFA enabled' requires evidence that demonstrates MFA status for all accounts with administrative access. An IAM credential report exported from AWS satisfies this requirement because it lists all IAM users with their MFA device status and the policies attached to determine which accounts have administrative access. A list of users from Active Directory does not satisfy this requirement because it does not include MFA status. Claude makes this distinction by reasoning about the information content of each evidence artifact relative to the specific requirement being tested.",
          "Gap identification is the highest-value output of evidence validation. When Claude assesses a control as 'partially satisfied,' it identifies the specific gap: which systems are missing evidence, which accounts are exceptions to the control, which time periods lack coverage. This gap identification produces a targeted remediation list: rather than re-collecting evidence for all 150 controls, the auditor knows exactly which five controls need additional evidence and exactly what that evidence needs to demonstrate. In practice, gap-targeted evidence collection reduces the time to complete evidence for a typical SOC 2 audit by 40–60% compared to unguided collection.",
          "Evidence integrity is an often-overlooked aspect of evidence collection quality. Evidence must be traceable to its source, timestamped with collection time, and stored with integrity protection (hash the evidence file and store the hash, sign the collection report with a trusted certificate) to be resistant to claims that the evidence was fabricated or modified after collection. Automated evidence collection is more defensible than manual collection in this regard: the collection method is documented in the agent's code, the API calls are logged with request and response timestamps, and the raw API responses are stored alongside the processed evidence artifacts. This audit trail for the audit itself is a strong response to auditor questions about evidence integrity.",
          "Control mapping complexity is the primary technical challenge in building a production evidence collection agent. Frameworks use different control numbering systems, different control granularity, and different evidence requirements for conceptually similar controls. SOC 2 CC6.1 (logical access) and ISO 27001 A.9.4.1 (use of secret authentication information) overlap substantially but are not identical. NIST SP 800-53 AC-2 (account management) has dozens of sub-requirements that individually require different evidence artifacts. A production evidence collection system maintains a control-to-evidence mapping table that specifies, for each control in each framework, exactly which API calls produce satisfying evidence, what the expected evidence format is, and how to validate that the evidence meets the requirement. Claude uses this mapping table as its collection guide.",
        ],
        codeExample: {
          label: "Evidence collection and validation agent",
          code: `def collect_and_validate_evidence(control: dict, tools: list) -> dict:
    """Claude collects evidence for a control and validates it."""
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=2000,
        tools=tools,
        messages=[{"role": "user", "content": f"""
Control: {control['id']} — {control['description']}
Required evidence: {control['evidence_required']}

Use the available tools to:
1. Collect all required evidence for this control
2. Validate whether the collected evidence satisfies the control requirement
3. Return structured JSON:
   {{"evidence_collected": [...], "assessment": "satisfied|partial|not_satisfied", "gaps": [...]}}
"""}]
    )
    # Handle tool calls in agentic loop, then return final assessment
    return parse_final_assessment(response)`,
        },
      },
      incident: {
        title: "Equifax SOC 2 Evidence Gap — Pre-Breach (2017)",
        when: "2016–2017",
        where: "Equifax Atlanta HQ",
        impact: "147M records breached; post-incident audit revealed evidence collection gaps masked control failures",
        body: [
          "The 2017 Equifax breach exposed personal information for 147 million Americans and remains one of the largest and most consequential data breaches in history. The technical root cause was an unpatched Apache Struts vulnerability (CVE-2017-5638) that had been publicly known and had a patch available since March 2017. The breach occurred in May 2017 — two months after the patch was available. Post-incident analysis revealed that Equifax's patch management control was not operating as designed: the certificate showing that patches were applied to web-facing systems did not actually verify that the Apache Struts vulnerability was patched on the specific servers exposed to the internet.",
          "The evidence collection failure at Equifax illustrates the difference between evidence existence and evidence validity. Equifax had evidence artifacts for its patch management control — reports showing patching activity, completion certificates, scan results. But the evidence did not demonstrate that the specific vulnerable component on the specific web-facing servers was patched within the required timeframe. An automated evidence collection agent with Claude validation would have identified this gap: when collecting evidence for the patch management control, Claude would have noted that the evidence showed patching of general server categories but did not demonstrate patching of the Apache Struts component specifically on the internet-facing web servers that were in scope for the control.",
          "The FTC settlement with Equifax included a requirement to implement comprehensive security program documentation and evidence requirements that go beyond what Equifax's pre-breach compliance program produced. Specifically, Equifax was required to implement a comprehensive information security program with specific evidence documentation requirements for each control, independent assessment of evidence quality, and board-level reporting on control effectiveness. These requirements, imposed as a regulatory mandate after the breach, are precisely what a mature automated evidence collection program with Claude validation produces proactively.",
          "The Equifax incident contributed to a broader industry reassessment of compliance certification programs. SOC 2 Type II certifications, which attest to the operating effectiveness of controls over a period (typically 12 months), came under scrutiny because Equifax had compliance certifications for its security program while the patch management control was failing. The critique prompted the AICPA to emphasize the distinction between a control existing (Type I) and a control operating effectively for a sustained period (Type II). Automated evidence collection with continuous validation is the technical implementation of Type II assurance — not just proving the control exists, but proving it operates correctly every day throughout the certification period.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Claude Orchestrator", sub: "evidence collection agent", type: "attacker" },
          { label: "Evidence Sources", sub: "APIs / logs / configs / docs", type: "system" },
          { label: "Control Requirements", sub: "COBIT / SOC 2 / NIST", type: "victim" },
          { label: "Evidence Package", sub: "validated, organized, mapped", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Equifax breach — evidence collection gaps masked patch control failures" },
        { year: 2020, event: "AICPA updates SOC 2 evidence requirements — automated collection growing" },
        { year: 2023, event: "First production agentic evidence collection systems deployed", highlight: true },
        { year: 2024, event: "Claude evidence validation achieves 95%+ accuracy vs manual auditor review" },
      ],
      keyTakeaways: [
        "Evidence collection consumes 50–60% of traditional audit hours — agentic collection reduces this to hours while improving completeness",
        "Map each evidence artifact to a specific control requirement using a control-to-evidence mapping table that defines what satisfying evidence looks like",
        "Claude validates whether evidence actually satisfies the control's requirement — not just whether an evidence file exists",
        "Three assessment outcomes: satisfied (evidence directly demonstrates control operation), partially satisfied (evidence covers most but not all requirements), not satisfied (evidence does not demonstrate control operation or is missing)",
        "Gap identification is the highest-value output: which systems are missing, which accounts are exceptions, which time periods lack coverage",
        "Continuous evidence collection on control-specific schedules produces Type II assurance — control operating effectively every day, not just at audit time",
        "Evidence integrity requires timestamp, collection method documentation, raw API response storage, and hash verification of evidence files",
        "Integration with Vanta, Drata, or Secureframe automates the full flow from collection through auditor review without manual upload steps",
        "Equifax (2017): evidence existed for patch management but did not cover the specific vulnerable component — Claude validation would have flagged this gap before the breach",
      ],
      references: [
        { title: "AICPA SOC 2 Trust Services Criteria", url: "https://www.aicpa.org/resources/article/soc-2-types-and-requirements" },
        { title: "Equifax FTC Settlement", url: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement" },
      ],
    },
    ctf: {
      scenario: "An evidence collection agent ran against the target organization and produced an evidence package. Three evidence files contain flag fragments. Read each to understand what the agent collected.",
      hint: "Evidence is organized in /evidence-pkg by control area. Read the files in each subdirectory.",
      hints: [
        "List /evidence-pkg to see the control areas.",
        "Check patch-mgmt/, access-ctrl/, and audit-log/ for evidence files.",
        "Each evidence file contains one flag fragment.",
      ],
      files: {
        "/evidence-pkg/patch-mgmt/patch-evidence.txt": `# Evidence — Patch Management Control
# Control: CM-8 (NIST) — All systems patched within 30 days of critical CVE release

Evidence Collected: 2024-11-15T14:30:00Z
Method: AWS Systems Manager — Patch Compliance API

Systems in scope: 47
Fully patched: 45
Critical patches missing: 2 (EC2 i-0abc123, i-0def456)

Claude Assessment: PARTIALLY SATISFIED
Gap: 2 systems with missing critical patches

Fragment-1: FLAG{3V1D3NC3_
`,
        "/evidence-pkg/access-ctrl/mfa-evidence.txt": `# Evidence — MFA Control
# Control: IA-3 (NIST) — MFA required for all privileged access

Evidence Collected: 2024-11-15T14:31:00Z
Method: IAM Credential Report API

Users with admin privileges: 8
MFA enabled: 7
MFA NOT enabled: 1 (admin-legacy@acme.com)

Claude Assessment: PARTIALLY SATISFIED
Gap: 1 admin user without MFA — immediate remediation required

Fragment-2: P4CK_
`,
        "/evidence-pkg/audit-log/cloudtrail-evidence.txt": `# Evidence — Audit Logging Control
# Control: AU-2 (NIST) — Audit logging enabled for all management events

Evidence Collected: 2024-11-15T14:32:00Z
Method: CloudTrail DescribeTrails API

Trails configured: 2
Management events: ENABLED (both trails)
S3 data events: ENABLED (prod buckets only)
Log file validation: ENABLED

Claude Assessment: SATISFIED
All required logging controls are operational.

Fragment-3: 4G3NT}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Evidence collection is 60% of traditional audit time — an agent collects the same evidence in minutes and maps each artifact directly to its control requirement
  2. Claude's assessment (satisfied / partially satisfied / not satisfied) validates that the evidence actually proves the control works, not just that a file exists
  3. Equifax (2017): patch evidence existed but didn't cover the specific vulnerable Apache Struts instance — AI validation would have caught the gap before the breach
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "evidence-pkg", isDir: true }],
        "/evidence-pkg": [
          { name: "patch-mgmt", isDir: true },
          { name: "access-ctrl", isDir: true },
          { name: "audit-log", isDir: true },
        ],
        "/evidence-pkg/patch-mgmt": [{ name: "patch-evidence.txt", isDir: false }],
        "/evidence-pkg/access-ctrl": [{ name: "mfa-evidence.txt", isDir: false }],
        "/evidence-pkg/audit-log": [{ name: "cloudtrail-evidence.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/evidence-pkg/patch-mgmt/patch-evidence.txt", value: "FLAG{3V1D3NC3_", label: "Fragment 1 — Patch Mgmt" },
        { trigger: "/evidence-pkg/access-ctrl/mfa-evidence.txt", value: "P4CK_", label: "Fragment 2 — Access Control" },
        { trigger: "/evidence-pkg/audit-log/cloudtrail-evidence.txt", value: "4G3NT}", label: "Fragment 3 — Audit Log" },
      ],
    },
  },

  // ─── audit-a09: Multi-Agent Audit Pipeline ────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Multi-Agent Lab", location: "San Francisco, California", era: "Present Day", emoji: "🤝" },
    id: "audit-a09",
    order: 9,
    title: "The Orchestrator",
    subtitle: "Multi-Agent Audit Pipeline — orchestrator and specialist agents",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-09", name: "Orchestrator", emoji: "🎼" },
    challengeType: "ctf",
    info: {
      tagline: "One agent audits a control. A pipeline of agents audits an organization.",
      year: 2024,
      overview: [
        "Single-agent audit tools are effective for auditing individual controls or isolated domains, but they cannot capture the cross-domain risk patterns that characterize the most significant security failures. Real-world breaches almost always exploit vulnerabilities across multiple domains simultaneously: a network-accessible service combined with an unpatched application vulnerability combined with an overly permissive IAM role combined with insufficient logging creates an attack chain that no single-domain audit would fully identify. Multi-agent audit pipelines address this by coordinating multiple specialist agents — each expert in a specific domain — under an orchestrator agent that plans the audit, delegates tasks, synthesizes cross-domain findings, and produces the final integrated report.",
        "The orchestrator-specialist pattern mirrors the organizational structure of human audit teams, which is not a coincidence — it reflects a sound approach to complex analytical work. A senior engagement manager plans the audit scope, divides it into workstreams, assigns each workstream to a specialist with domain expertise (network security, identity and access management, application security, data protection), reviews and synthesizes the specialists' findings, identifies cross-domain patterns that no individual specialist would see, and writes the final report for management. Claude agents playing these roles operate with the same division of labor at much higher speed and scale.",
        "The orchestrator agent's core responsibilities are distinct from the specialist agents'. The orchestrator parses the audit scope definition and translates it into specific workstream assignments for each specialist agent. It spawns specialists with the appropriate tool sets, system prompts, and context for their domain. It manages the execution of specialists in parallel where possible and sequentially where there are data dependencies. It collects the structured findings from all specialists and performs cross-domain synthesis — reasoning about which findings from different domains are related to each other and identifying risk chains that span multiple domains. Finally, it produces an integrated executive summary and prioritized remediation plan.",
        "Specialist agents have a simpler but equally important role: deep, focused analysis within their assigned domain. A specialist should not attempt to reason about findings outside its domain — that is the orchestrator's responsibility. Each specialist receives: a system prompt specifying its domain expertise, the subset of tools relevant to its domain, the audit scope (account IDs, regions, services in scope), and a structured output format specification. The specialist executes a thorough analysis of its domain, returns a structured JSON findings report, and terminates. Specialists are stateless — they do not accumulate context across runs or communicate with other specialists. All coordination happens at the orchestrator level.",
        "Parallel execution is the key performance advantage of multi-agent pipelines over single-agent approaches. A comprehensive audit that would take a single agent two hours of sequential tool calls can be completed in 20 minutes when five specialist agents run simultaneously on their respective domains. The constraint is data dependencies: the IAM specialist needs the inventory to know which roles to analyze, so the inventory agent must complete before IAM analysis begins. But IAM analysis, network analysis, secrets scanning, and IaC review have no dependencies on each other and can all run in parallel after the inventory phase. The orchestrator manages this dependency graph to maximize parallelism.",
        "Cross-domain synthesis is where multi-agent pipelines produce findings that are genuinely impossible for single-agent or human audit teams working in domain silos to produce. A secrets agent finds an exposed database credential in a development repository. An IAM agent finds that the production-data-processor role has broad S3 access. A network agent finds that the EC2 instance running the data processor application is reachable from the internet on port 443. Individually, these are three separate findings across three separate domains. Combined, they constitute a critical risk chain: an attacker who discovers the exposed credential could access the development repository, find the EC2 instance's IP address from the repository's deployment configuration, connect to it on port 443, find that the application uses the exposed database credential to authenticate, and use that credential to access the production database. The orchestrator's synthesis identifies this chain.",
        "Structured JSON output from specialist agents is a non-negotiable design requirement for reliable synthesis. If specialists return natural language findings, the orchestrator must parse those findings before it can reason about cross-domain relationships — introducing ambiguity and reducing reliability. If specialists return structured JSON with consistent fields (resource identifier, severity, finding category, affected components, remediation), the orchestrator can programmatically correlate findings across agents using the resource identifiers as keys, then reason about the semantics of the correlated clusters. The output schema for specialist agents should be designed at the system architecture level before any agents are implemented.",
      ],
      technical: {
        title: "Orchestrator-Specialist Pattern",
        body: [
          "Orchestrator responsibilities span the full audit lifecycle from planning through report generation. In the planning phase, the orchestrator reads the audit scope definition and generates a workstream plan: which domains to audit, which agents to spawn for each domain, what tool sets each agent needs, what context each agent requires to be effective, and what output format each agent should use. In the execution phase, the orchestrator spawns agents in parallel using asyncio.gather or an equivalent concurrency primitive, monitors their execution, handles failures (retry logic, fallback to reduced scope), and collects results as they complete. In the synthesis phase, the orchestrator correlates findings by resource identifier, identifies multi-finding risk chains, assesses the combined severity of chains versus individual findings, and generates the cross-domain risk section of the final report.",
          "Specialist agent responsibilities are deliberately narrow. Each specialist receives its workstream instructions, executes all tool calls required to complete its domain analysis, handles pagination and retry logic for API calls within its domain, and returns a structured JSON findings document with all findings, their severities, the evidence supporting each finding, and specific remediation recommendations. Specialists must not make assumptions about other domains or attempt to correlate their findings with findings that would come from other specialists. The separation of concerns makes each agent independently testable and debuggable — a specialist failing or producing incorrect output can be diagnosed and fixed in isolation without affecting other agents.",
          "The agentic handoff pattern governs how the orchestrator passes context to specialists. Each specialist receives: a system prompt defining its role and expertise, a structured scope object (account IDs, regions, service categories in scope), a tool set appropriate to its domain (network specialists get VPC and security group tools; IAM specialists get IAM and STS tools), and the inventory output from the Phase 1 enumeration agent. The inventory provides each specialist with the list of resources to analyze — without it, specialists would need to re-enumerate resources themselves, creating redundant API calls and potentially discovering different resource sets due to timing differences. Using a shared inventory ensures all specialists work from a consistent view of the infrastructure.",
          "Error handling in multi-agent pipelines requires defensive design at multiple levels. Individual tool calls may fail due to rate limiting, permission denied errors, or network timeouts — specialists should retry with exponential backoff and return partial results if some tool calls fail rather than aborting entirely. Specialist agents may produce malformed JSON or unexpected output structures — the orchestrator should validate specialist output against the expected schema and handle validation failures gracefully, flagging the specialist's output as incomplete rather than crashing the entire pipeline. The orchestrator itself may encounter situations where insufficient specialist output prevents meaningful synthesis — it should produce a partial report documenting what was successfully collected rather than failing silently.",
          "Cost optimization for multi-agent pipelines is an engineering concern that grows in importance as audit frequency increases. Each specialist agent invocation incurs Claude API costs proportional to the input and output token counts. For a comprehensive audit with five specialist agents, the total token cost can be significant if run daily. Optimization strategies include: caching inventory outputs and reusing them across agents in the same run, using smaller Claude models for structured data extraction tasks (where the task is well-defined and doesn't require advanced reasoning) and larger models only for synthesis and report generation, batching multiple control checks in a single Claude call rather than one call per control, and implementing incremental audit mode that only re-analyzes resources that have changed since the previous run.",
        ],
        codeExample: {
          label: "Multi-agent orchestrator pattern",
          code: `async def run_full_audit(scope: AuditScope) -> AuditReport:
    # Orchestrator spawns specialist agents in parallel
    results = await asyncio.gather(
        run_specialist_agent("iam", scope, iam_tools),
        run_specialist_agent("network", scope, network_tools),
        run_specialist_agent("secrets", scope, secrets_tools),
        run_specialist_agent("iac", scope, iac_tools),
    )

    # Orchestrator synthesizes cross-domain findings
    synthesis_prompt = f"""You are an audit engagement manager.
    Here are findings from four specialist agents:
    IAM: {results[0]}
    Network: {results[1]}
    Secrets: {results[2]}
    IaC: {results[3]}

    Identify cross-domain findings and risk chains.
    Produce an executive summary and prioritized remediation plan."""

    return orchestrator_claude.synthesize(synthesis_prompt)`,
        },
      },
      incident: {
        title: "MOVEit Transfer Supply Chain — Cross-Domain Audit Gap (2023)",
        when: "May–June 2023",
        where: "MOVEit Transfer, global (Cl0p ransomware group)",
        impact: "2,000+ organizations compromised; 60M+ individuals' data stolen",
        body: [
          "The MOVEit Transfer breach of May 2023 was the largest data theft event of that year, affecting over 2,000 organizations worldwide including US government agencies, major financial institutions, healthcare providers, and universities. The Cl0p ransomware group exploited a SQL injection vulnerability (CVE-2023-34362) in MOVEit Transfer, a widely-used managed file transfer software. The SQL injection allowed unauthenticated attackers to execute arbitrary SQL commands against the MOVEit database, enabling them to extract all files transferred through the system. The vulnerability had existed in the software for years before its active exploitation.",
          "Post-incident analysis of affected organizations revealed a consistent pattern: the MOVEit vulnerability touched three audit domains simultaneously. From the network domain: MOVEit Transfer was internet-accessible on standard HTTP/S ports, creating a large attack surface from a publicly reachable application. From the application domain: the SQL injection vulnerability was present in the application layer, a finding that would have appeared in a web application security assessment. From the database domain: the SQL injection granted access to the MOVEit database which contained all transferred file metadata and file contents, representing a data classification and access control finding. Each domain's audit might have noted a concern; only a cross-domain synthesis would have identified the combined critical risk.",
          "A multi-agent audit pipeline analyzing affected organizations in the months before the breach would have produced the following cross-domain finding: the network agent would have flagged MOVEit Transfer's internet accessibility and noted that it handles sensitive file transfers; the application agent would have flagged that the installed version of MOVEit Transfer had known vulnerabilities; the data agent would have flagged that the MOVEit database contains unencrypted file contents with insufficient access controls. The orchestrator's synthesis would have rated this combination as a CRITICAL risk chain: an internet-accessible application with known vulnerabilities containing unencrypted sensitive data is a data breach waiting to happen. The finding would have been specific enough to drive immediate remediation — upgrade MOVEit Transfer and restrict internet access to trusted IP ranges.",
          "The scale of the MOVEit breach — 2,000+ organizations and 60+ million individuals — reflects the reality that supply chain vulnerabilities affect every organization using the compromised software simultaneously. This is a category of risk that single-organization audit programs cannot fully address. Industry-level audit intelligence sharing, where findings about third-party software vulnerabilities are shared across organization boundaries through mechanisms like ISACs (Information Sharing and Analysis Centers), is the systemic response. Multi-agent audit pipelines that include vendor software inventory as a specialist domain can automatically correlate their installed software inventory against public vulnerability databases (CVE, NVD), flagging when installed software versions have known critical vulnerabilities regardless of whether those vulnerabilities have been publicly exploited yet.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Orchestrator Agent", sub: "plans + delegates + synthesizes", type: "attacker" },
          { label: "Specialist Agents", sub: "IAM / network / secrets / IaC", type: "system" },
          { label: "Audit Domains", sub: "parallel, independent workstreams", type: "victim" },
          { label: "Integrated Report", sub: "cross-domain risk chains", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "MOVEit breach — cross-domain vulnerability exploited at 2000+ orgs" },
        { year: 2023, event: "Multi-agent frameworks (LangGraph, CrewAI) reach production maturity", highlight: true },
        { year: 2024, event: "Anthropic Agent SDK released — first-party multi-agent tooling" },
        { year: 2025, event: "Enterprise audit firms deploy multi-agent pipelines replacing manual workstreams" },
      ],
      keyTakeaways: [
        "Orchestrator plans, delegates, and synthesizes; specialists execute focused domain audits — never mix these responsibilities in a single agent",
        "Run specialist agents in parallel after inventory phase to match human audit team structure and reduce total runtime by 5-10x",
        "Cross-domain synthesis identifies risk chains that single-domain agents and siloed human teams cannot — this is the primary value of multi-agent pipelines",
        "Specialist agents must return structured JSON with consistent fields — natural language output breaks programmatic correlation at synthesis time",
        "Data dependency graph: inventory must complete before all specialists; IAM, network, secrets, and IaC analyses can run in parallel after inventory",
        "Defensive error handling: retry tool calls with backoff, return partial results on partial failure, validate specialist output schema before synthesis",
        "Shared inventory output ensures all specialists work from a consistent view of infrastructure state — prevents timing-related discrepancies",
        "Cost optimization: cache inventory, use smaller models for structured extraction, batch control checks, implement incremental mode for frequent runs",
        "MOVEit (2023): network exposure + application vulnerability + database access control failure was a cross-domain chain; single-domain audits each partially missed it",
      ],
      references: [
        { title: "MOVEit CVE-2023-34362 Analysis", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a" },
        { title: "Anthropic Agent SDK", url: "https://docs.anthropic.com/en/docs/agents" },
      ],
    },
    ctf: {
      scenario: "A multi-agent audit pipeline ran against the target. Three agent output files — from the orchestrator, IAM specialist, and synthesis report — contain the flag. Read each to follow the audit chain.",
      hint: "Multi-agent output is in /multi-agent. Read files from orchestrator/, specialists/, and synthesis/.",
      hints: [
        "List /multi-agent to find the agent output directories.",
        "The orchestrator log contains the first fragment.",
        "The synthesis report contains the final fragment.",
      ],
      files: {
        "/multi-agent/orchestrator/orchestrator-log.txt": `# Orchestrator Agent Log

Audit scope: acme-corp — full infrastructure review
Spawning specialist agents in parallel...

  [IAM Agent]     → started
  [Network Agent] → started
  [Secrets Agent] → started
  [IaC Agent]     → started

All specialists complete. Beginning cross-domain synthesis.

Fragment-1: FLAG{MULT1_
`,
        "/multi-agent/specialists/iam-findings.json": `{
  "agent": "iam-specialist",
  "findings": [
    {
      "severity": "CRITICAL",
      "resource": "prod-data-processor-role",
      "issue": "AdministratorAccess attached — privilege escalation path",
      "cross_domain_note": "This role has s3:GetObject on acme-backup — correlates with secrets agent finding"
    }
  ],
  "fragment": "4G3NT_"
}`,
        "/multi-agent/synthesis/final-report.txt": `# Orchestrator Synthesis — Cross-Domain Findings

CRITICAL Risk Chain Identified:
  [Secrets Agent] acme-backup S3 bucket: exposed database credential in config.yml
  [IAM Agent] prod-data-processor-role: can read acme-backup (AdministratorAccess)
  [Network Agent] prod-data-processor EC2: publicly accessible on port 443

Risk chain: public EC2 → compromised app → role credential → exposed DB password in S3

This cross-domain finding was not visible to any individual specialist.

Fragment-3: 4UD1T}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Cross-domain synthesis is where multi-agent pipelines find what single-domain agents cannot — risk chains span IAM, network, and secrets simultaneously
  2. Specialist agents return structured JSON (never natural language) so the orchestrator can reliably parse and correlate findings across domains
  3. MOVEit (2023): the SQL injection + internet exposure + database permissions was a cross-domain chain; single-domain audits each partially missed it
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "multi-agent", isDir: true }],
        "/multi-agent": [
          { name: "orchestrator", isDir: true },
          { name: "specialists", isDir: true },
          { name: "synthesis", isDir: true },
        ],
        "/multi-agent/orchestrator": [{ name: "orchestrator-log.txt", isDir: false }],
        "/multi-agent/specialists": [{ name: "iam-findings.json", isDir: false }],
        "/multi-agent/synthesis": [{ name: "final-report.txt", isDir: false }],
      },
      fragments: [
        { trigger: "/multi-agent/orchestrator/orchestrator-log.txt", value: "FLAG{MULT1_", label: "Fragment 1 — Orchestrator Log" },
        { trigger: "/multi-agent/specialists/iam-findings.json", value: "4G3NT_", label: "Fragment 2 — IAM Specialist" },
        { trigger: "/multi-agent/synthesis/final-report.txt", value: "4UD1T}", label: "Fragment 3 — Synthesis Report" },
      ],
    },
  },

  // ─── audit-a10: AI Report Generation ─────────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Report Generation Lab", location: "New York, New York", era: "Present Day", emoji: "📄" },
    id: "audit-a10",
    order: 10,
    title: "The Report Writer",
    subtitle: "AI Report Generation — Claude drafting findings and recommendations",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-10", name: "Report Writer", emoji: "✍️" },
    challengeType: "ctf",
    info: {
      tagline: "The finding is only as useful as the report. Claude writes faster than any auditor.",
      year: 2024,
      overview: [
        "Audit report writing is where the value of audit findings is either realized or lost. Auditors with deep technical expertise routinely produce reports with vague, generic recommendations — 'improve security posture,' 'strengthen access controls,' 'enhance monitoring capabilities' — that management reads, acknowledges, and does nothing with because the recommendations are not specific enough to act on. The technical finding was real; the report failed to translate it into actionable direction. Auditors spend 30–40% of their engagement hours on writing work, and much of that time produces output that does not achieve its purpose.",
        "Claude excels at audit report generation because it combines three capabilities that are difficult to sustain across a long audit engagement: consistent language precision (every finding section uses the same structure, the same severity language, and the same formatting regardless of which auditor produced the underlying finding), audience calibration (the executive summary uses business-impact language while the technical appendix uses system-level specifics, with the appropriate level of detail for each audience without mixing them), and specificity under volume (when there are 200 findings to document, the 200th gets the same level of specific, actionable recommendation as the first — something human writers struggle to maintain).",
        "The report generation architecture separates the finding content from the report format. The audit pipeline produces structured JSON findings from the multi-agent analysis phase: each finding has a resource identifier, severity, finding category, technical description, business impact, and remediation steps. The report generation agent takes this structured input and applies a report template to produce professional prose for each section. The template defines: the executive summary format (findings by severity count, top risks, business impact narrative), the finding section format (title, observation, risk, recommendation, management response field), and the appendix format (technical evidence references, tool configuration details, methodology description).",
        "Audience calibration is the most challenging aspect of professional audit report writing, and the one where AI report generation delivers the most consistent improvement over individual auditor output. A finding about an IAM privilege escalation path needs to be communicated differently to a CISO (who needs to understand the business risk and remediation priority) versus a sysadmin (who needs to understand the specific configuration change required) versus a board member (who needs to understand the potential financial impact and regulatory exposure). Claude can generate all three levels of description from the same structured finding, ensuring each stakeholder receives the information they need in the format appropriate to their role.",
        "Specificity in recommendations is what distinguishes actionable audit reports from compliance theater. A recommendation to 'implement MFA for all administrative accounts' leaves the engineering team with significant work to define what 'administrative' means, which MFA methods are acceptable, what the implementation timeline should be, who is responsible, and how compliance will be verified. A recommendation that specifies 'Enable AWS MFA on all IAM users with attached AdministratorAccess or PowerUserAccess policies (currently 12 users identified in the IAM credential report artifact A-4) using hardware MFA tokens or virtual authenticator apps compatible with RFC 6238. Implementation deadline: 30 days. Owner: Cloud Operations team (John Smith). Verification: Re-run MFA compliance check (Appendix B, Tool Configuration 3) and confirm zero non-compliant users.' leaves nothing undefined and can be assigned as an engineering task immediately.",
        "Report versioning and management response workflows are operational requirements that integrate with the report generation pipeline. After the initial draft is generated, management receives the draft and provides responses to each finding (accepted, accepted with timeline, rejected with compensating control, risk accepted). These responses are captured in a structured format and fed back into a revision generation call that incorporates management responses into the final report. The final report is version-controlled with a cryptographic hash, signed by the engagement lead, and delivered through a secure channel. Claude can assist with all of these steps: drafting management response templates, identifying responses that are incomplete or do not adequately address the finding, and generating the revision of the report incorporating accepted responses.",
        "Template customization for different report formats — Big 4 audit firm style, internal audit style, regulatory examination format, penetration test report format — requires configuring the system prompt and output format specification for each report type. The underlying finding data is the same; the presentation format differs. A regulatory examination report for a bank regulator uses formal, third-person language with specific citation formats. An internal audit report for a technology company may use a more conversational tone with direct recommendations. A penetration test report includes proof-of-concept details and CVSS scores. Claude can be configured to produce any of these formats from the same structured finding input by adjusting the system prompt and output format instructions.",
      ],
      technical: {
        title: "Report Generation Prompt Architecture",
        body: [
          "Report generation requires careful system prompt engineering to produce consistently high-quality output across large finding sets. The system prompt must specify: writing style parameters (formal/informal, first/third person, active/passive voice — formal, third person, past tense is the standard for professional audit reports), audience definition (CISO and IT leadership for the technical report, board of directors for the executive summary), severity language mapping (CRITICAL maps to 'Immediate Action Required,' HIGH to 'Remediation Required within 30 Days,' MEDIUM to 'Remediation Required within 90 Days,' LOW to 'Recommended Improvement'), required finding section structure (finding title, observation, risk, recommendation, management response field), and prohibitions (no speculation about attacker intent, no claims about probability of exploitation, no naming of specific individuals in findings).",
          "For large finding sets (more than 50 findings), Claude's extended context window enables processing all findings in a single API call to produce a coherent executive summary that accurately reflects the full finding set. For very large audits (500+ findings), a chunking strategy by domain allows each domain's findings to be processed into a section draft separately, with a final synthesis call that produces the executive summary from the section summaries. The section drafts maintain domain-specific technical depth while the synthesis call maintains overall report coherence. This chunked approach also allows parallelizing the report generation for different sections.",
          "Executive summary generation from structured findings requires reasoning about materiality, business impact, and prioritization — not just summarizing all findings at equal weight. Claude can assess which findings represent the most significant business risk, which findings share a common root cause (suggesting a systemic issue rather than isolated incidents), and which remediation items, if completed, would have the largest impact on overall risk reduction. The executive summary leads with the most significant risks, groups related findings where appropriate, and provides a prioritized remediation roadmap that management can use to allocate remediation effort effectively.",
          "Finding deduplication is an important preprocessing step before report generation. Multi-agent audit pipelines with multiple specialist agents sometimes generate findings that address the same underlying issue from different angles — the IAM specialist flags an overly permissive role, and the network specialist flags that the same role is used by an internet-accessible service. These are related findings that should be presented as a single compound finding with both the IAM aspect and the network exposure aspect documented together, rather than two separate findings that appear to be independent. Claude can identify related findings by comparing their affected resource identifiers and finding categories, merging related findings into compound observations before generating the report section.",
          "Quality assurance for generated reports requires both automated validation and human review. Automated validation checks: every finding section has all required fields populated, severity labels match the finding severity in the underlying data, all evidence references are valid artifact identifiers that exist in the evidence package, recommendations do not contain prohibited content (speculation, individual names, legal conclusions), and the total finding count in the executive summary matches the finding count in the detailed sections. Human review focuses on: accuracy of Claude's business impact descriptions (Claude may overstate or understate impact for findings outside well-documented domains), appropriateness of recommendations for the organization's specific environment and risk tolerance, and completeness of the management response sections.",
        ],
        codeExample: {
          label: "Report generation call — findings to prose",
          code: `def generate_audit_report(findings: list[dict], scope: str) -> str:
    system = """You are a senior IT auditor writing a formal audit report.
    Style: professional, third person, past tense.
    Audience: CISO and IT leadership (assume technical literacy).
    Each finding section must include:
      - Finding title (concise, action-oriented)
      - Observation (what was found, with evidence reference)
      - Risk (business impact if not remediated)
      - Recommendation (specific, actionable, prioritized)
      - Management Response: [Leave blank for client to complete]"""

    content = f"Audit scope: {scope}\\n\\nFindings (JSON):\\n{json.dumps(findings, indent=2)}"

    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=8000,
        system=system,
        messages=[{"role": "user", "content": content}]
    )
    return response.content[0].text`,
        },
      },
      incident: {
        title: "Dyn DNS DDoS — Report Writing Delayed Remediation (2016)",
        when: "October 21, 2016",
        where: "Dyn DNS infrastructure, US-East",
        impact: "Twitter, Netflix, Reddit, GitHub, Spotify down for hours; Mirai botnet via IoT devices",
        body: [
          "The Dyn DDoS attack of October 21, 2016 brought down major portions of the internet for hours, taking offline platforms including Twitter, Netflix, Reddit, GitHub, and Spotify. The attack used the Mirai botnet — a network of compromised IoT devices including IP cameras, digital video recorders, and home routers — to generate 1.2 terabits per second of traffic against Dyn's DNS infrastructure. The scale of the botnet was made possible by the widespread deployment of IoT devices with hardcoded default credentials (typically admin/admin or admin/password) that Mirai exploited through automated credential stuffing to compromise devices en masse.",
          "Post-incident analysis revealed that multiple security assessments prior to the Dyn attack had identified the risk of unpatched and default-credentialed IoT devices being weaponized for large-scale attacks. These assessments appeared in reports, but the reports described the risk in generic terms — 'organizations should improve their IoT security posture,' 'IoT devices present emerging security risks that require attention,' 'the proliferation of network-connected devices without security controls creates systemic risk.' Management read these assessments, acknowledged the risk, and deprioritized remediation because the recommendations were not specific enough to generate an engineering work order.",
          "Claude-generated reports produce recommendations at a specificity level that transforms a risk acknowledgment into an engineering task. For the same IoT security finding, a Claude-generated recommendation would read: 'Disable Telnet (TCP port 23) and SSH (TCP port 22) on all IoT devices in the production network using the VLAN segmentation configuration procedure documented in runbook RB-042. For devices that cannot be reconfigured to disable remote management, place them in an isolated VLAN (proposed: 192.168.100.0/24) with firewall rules blocking all inbound connections from outside the management network. Complete within 30 days. Owner: Network Operations (Sarah Chen). Verification: Run the IoT port scan script (Appendix D) and confirm zero devices expose management ports on the production VLAN.' This level of specificity gives the engineering team everything needed to create a sprint ticket without additional research.",
          "The Dyn incident prompted a broader reckoning with IoT security governance in the industry and regulatory community. NIST published NISTIR 8228 (Considerations for Managing IoT Cybersecurity and Privacy Risks). The FTC took enforcement action against D-Link for inadequate IoT security. California passed SB-327, the first US IoT security law, requiring unique default credentials or mandatory setup of a password before device operation. Security audits of organizations using IoT devices in operational environments are now expected to include IoT inventory, firmware version assessment, and credential policy verification as standard controls. The specificity of audit recommendations for IoT security directly impacts whether organizations actually implement the required controls before the next Mirai-class event.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Structured Findings", sub: "JSON from audit agents", type: "attacker" },
          { label: "Claude Report Writer", sub: "findings to professional prose", type: "system" },
          { label: "Report Template", sub: "exec summary / findings / roadmap", type: "victim" },
          { label: "Draft Audit Report", sub: "ready for auditor review", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "Dyn DDoS — vague audit report language delays IoT security remediation" },
        { year: 2022, event: "Big 4 firms begin using LLMs for first-draft audit report generation" },
        { year: 2023, event: "Claude generates audit report sections indistinguishable from senior auditor prose", highlight: true },
        { year: 2024, event: "Report generation cuts audit delivery time by 40% at enterprise audit firms" },
      ],
      keyTakeaways: [
        "Vague recommendations ('improve security posture') don't produce engineering work orders — Claude generates specific, owner-assigned, deadline-dated, verifiable recommendations",
        "System prompts must specify writing style, audience, severity language mapping, required finding section structure, and prohibited content",
        "Audience calibration: generate separate sections for CISO (risk + priority), engineers (specific configuration changes), and board (financial impact + regulatory exposure)",
        "Extended context window allows processing all findings in a single call for coherent executive summary generation across the full finding set",
        "Finding deduplication before report generation prevents related findings from appearing as independent issues across specialist domains",
        "Report generation reduces audit delivery time by 40% — auditors review and finalize rather than write from scratch, shifting time to judgment-intensive work",
        "Quality assurance automation: validate all required fields populated, severity labels match source data, evidence references valid, finding count consistent",
        "Management response workflow: structured response capture → revision generation call → version-controlled final report delivery",
        "Dyn (2016): vague IoT security recommendations were acknowledged and deprioritized; specific recommendations with owners and deadlines get implemented",
      ],
      references: [
        { title: "Dyn DDoS Post-Mortem (Dyn)", url: "https://dyn.com/blog/dyn-analysis-summary-of-friday-october-21-attack/" },
        { title: "Claude Extended Context Window", url: "https://docs.anthropic.com/en/docs/about-claude/models" },
      ],
    },
    ctf: {
      scenario: "An AI report writer generated an audit report draft. Three sections of the report contain the flag fragments. Read each section to collect the complete flag.",
      hint: "Report sections are in /audit-report. Read the three section files.",
      hints: [
        "List /audit-report to find the report section files.",
        "Start with executive-summary.txt for the first fragment.",
        "The roadmap.txt file contains the final fragment.",
      ],
      files: {
        "/audit-report/executive-summary.txt": `# ACME Corp IT Security Audit — Executive Summary

Engagement period: November 1–15, 2024
Scope: AWS infrastructure, IAM, application security, secrets management

This audit identified 2 critical, 4 high, and 6 medium risk findings across the
ACME Corp cloud environment. Immediate remediation is required for the critical
findings to prevent potential data breach and regulatory non-compliance.

Fragment-1: FLAG{4I_R3P0RT_
`,
        "/audit-report/findings-summary.txt": `# Key Findings — Technical Summary

CRITICAL-1: Publicly accessible S3 bucket (acme-backup-2019) without encryption
  Risk: Exposure of 3 years of backup data including customer PII
  Recommendation: Enable S3 block public access; enable AES-256 encryption immediately

CRITICAL-2: Administrator IAM role attached to production Lambda function
  Risk: Full account takeover if Lambda is compromised via code injection
  Recommendation: Replace AdministratorAccess with least-privilege policy scoped to required S3 and DynamoDB actions

Fragment-2: G3N3R4T0R_
`,
        "/audit-report/roadmap.txt": `# Remediation Roadmap

Week 1 (Critical): S3 public access block + encryption; Lambda IAM least-privilege
Week 2-3 (High): MFA enforcement for all admins; rotate exposed AWS credentials
Week 4-6 (Medium): IaC pipeline security checks; SIEM coverage gap remediation

Estimated total remediation effort: 120 engineering hours
Estimated risk reduction: CRITICAL → LOW (after critical items resolved)

Fragment-3: DONE}

[Auditor review note: Replace Fragment-3 with actual report conclusion]

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Vague report language ("improve security posture") does not get implemented — Claude generates specific, owner-assigned, deadline-dated recommendations
  2. System prompts enforce consistent report structure: finding title, observation, risk, recommendation, and management response field — every time
  3. Report generation cuts audit delivery time by 40%; auditors review and finalize rather than write from scratch, freeing time for judgment-intensive work
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "audit-report", isDir: true }],
        "/audit-report": [
          { name: "executive-summary.txt", isDir: false },
          { name: "findings-summary.txt", isDir: false },
          { name: "roadmap.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/audit-report/executive-summary.txt", value: "FLAG{4I_R3P0RT_", label: "Fragment 1 — Executive Summary" },
        { trigger: "/audit-report/findings-summary.txt", value: "G3N3R4T0R_", label: "Fragment 2 — Findings" },
        { trigger: "/audit-report/roadmap.txt", value: "DONE}", label: "Fragment 3 — Roadmap" },
      ],
    },
  },

  // ─── audit-a11: Continuous Compliance Monitoring ──────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Continuous Monitoring Lab", location: "Washington, D.C.", era: "Present Day", emoji: "📡" },
    id: "audit-a11",
    order: 11,
    title: "The Sentinel",
    subtitle: "Continuous Compliance Monitoring — scheduled Claude agents",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-11", name: "The Sentinel", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "Annual audits find last year's problems. Continuous monitoring finds today's.",
      year: 2024,
      overview: [
        "Traditional IT audit is fundamentally a point-in-time assessment model. The audit team examines the state of controls at the moment of the audit, which may have been scheduled months ago and produces a report delivered weeks or months after the fieldwork concludes. By the time the client receives the report describing findings from three months ago, the infrastructure has changed, some findings may have been remediated, and new vulnerabilities may have been introduced. The annual audit model emerged from a financial auditing tradition designed for organizations where systems changed slowly. It is fundamentally mismatched to cloud-native environments where infrastructure changes on every deployment cycle.",
        "Continuous compliance monitoring uses scheduled Claude agents to replace the point-in-time snapshot model with a real-time compliance posture that reflects the current state of controls. The agents run on a defined schedule — daily for controls that can change frequently, weekly for controls with longer change cycles, monthly for controls that require significant manual effort to change — and alert immediately when a control deviates from its established baseline. When a developer creates an S3 bucket with public access at 11 PM on a Friday, the monitoring agent catches it by 6 AM Saturday and a PagerDuty alert reaches the on-call engineer before any unauthorized access occurs.",
        "The architecture of continuous monitoring differs from point-in-time audit in one critical respect: it must maintain a baseline state against which current configurations are compared, and it must distinguish between authorized changes (which should not generate alerts) and unauthorized drift (which should). Authorized changes are those associated with recorded deployment events — a Terraform apply run by an approved pipeline, a configuration change recorded in the change management system, a new resource created by a provisioning automation with an associated change ticket. Unauthorized drift is any configuration change that cannot be traced to an authorized change event. Distinguishing between the two requires correlating cloud configuration changes with change management records.",
        "Alert routing and suppression design are the operational requirements that determine whether a continuous monitoring program is sustainable. Without thoughtful alert routing, a monitoring program covering hundreds of controls generates thousands of alerts per week, most of which are noise — known exceptions, expected configuration variations, and false positives from overly sensitive detection rules. Monitoring agents must implement: severity-based alert routing (CRITICAL findings go to PagerDuty for immediate human attention; HIGH findings go to Slack and Jira for same-day attention; MEDIUM findings go to Jira only for scheduled remediation; LOW findings are accumulated in a weekly digest), suppression for documented exceptions (configurations intentionally deviated from the baseline with business justification and approval), and deduplication (a finding that was already alerted yesterday should not generate a new alert today unless it has changed).",
        "Behavioral baseline monitoring extends continuous compliance beyond static configuration checking into dynamic behavioral analysis. Configuration drift detection answers the question: has a configuration changed from its approved state? Behavioral baseline monitoring answers the question: has an entity (a user, a role, an API key, a service account) changed its behavior in a way that suggests compromise or misuse? IAM role access patterns are a prime behavioral signal: a production service role that normally makes API calls from a specific EC2 instance using a specific IP address range, during business hours, accessing a specific set of S3 buckets, suddenly making API calls from an unfamiliar IP address at 3 AM accessing buckets it has never accessed before represents a behavioral anomaly that warrants immediate investigation regardless of whether the IAM policy has changed.",
        "Integration with security operations workflows transforms compliance monitoring findings into operational response actions. A CRITICAL drift finding should not just send a Slack message — it should open a Jira incident ticket with pre-populated details (resource affected, expected configuration, actual configuration, first detected timestamp, compliance control violated), assign it to the appropriate team based on the resource owner tag, attach the evidence artifact from the monitoring agent's run, set the SLA timer based on the severity, and optionally trigger an automated remediation workflow that applies the approved configuration fix and then verifies the fix took effect. Claude can generate all of the structured data needed for this workflow integration from the monitoring agent's findings output.",
        "Regulatory alignment of continuous monitoring programs is increasingly explicit. The SEC's cybersecurity disclosure rules (2023) require public companies to disclose material cybersecurity incidents within four business days of determining an incident is material and to provide annual disclosures about cybersecurity risk management programs. Continuous monitoring with immediate alerting and documented response workflows is evidence that the organization has a mature cybersecurity risk management program. FedRAMP authorization for cloud service providers requires continuous monitoring as a formal program component with specific deliverables (monthly vulnerability scan results, system configuration check results, and plan of action and milestones updates). The regulatory landscape is converging on continuous compliance monitoring as the expected baseline, not a leading practice.",
      ],
      technical: {
        title: "Scheduling and Alerting Architecture",
        body: [
          "Scheduling options for continuous compliance agents span a range of implementation approaches with different operational characteristics. AWS EventBridge Rules with Lambda functions is the most common approach for AWS-centric organizations: a cron expression triggers the Lambda function on schedule, the function initializes an Anthropic client, runs the compliance check agent, and routes findings to downstream alert channels. GitHub Actions scheduled workflows provide CI/CD-native scheduling with the advantage of version-controlling the agent code alongside the compliance rules: a `schedule: [{cron: '0 6 * * *'}]` trigger runs the compliance agent daily at 6 AM UTC. Dedicated orchestration platforms like Temporal or Apache Airflow support more complex dependency chains where the monitoring agent is one step in a broader data pipeline that includes enrichment, deduplication, and alert management logic.",
          "Alerting integration requires mapping each finding severity to an alert channel stack that delivers the finding to the right people at the right time through the right medium. CRITICAL findings — those representing immediate data exposure or complete control bypass — require immediate human attention: PagerDuty incident with high-urgency routing, Slack message to the security-alerts channel with @here notification, and Jira incident ticket with P1 priority created and assigned to the on-call security engineer. HIGH findings require same-day attention but not immediate wake-up: Slack message to security-alerts and Jira ticket with P2 priority. MEDIUM findings require scheduled attention within the week: Jira ticket only. LOW findings are batched into a weekly email digest that the security team reviews during their regular compliance review meeting.",
          "Suppression rule management prevents alert fatigue by tracking known exceptions with their business justification, approval chain, and expiration date. A suppression rule says: 'resource acme-marketing-assets, control S3-PUB-01, suppressed until 2025-03-31, business justification: public website asset hosting requires public S3 access, approved by CISO on 2024-12-01.' The monitoring agent checks each finding against the suppression rule table before routing to alert channels and skips alerting for suppressed findings. Expired suppressions automatically become active findings again, ensuring that temporary exceptions don't become permanent deviations through administrative neglect. Suppression rules are themselves auditable artifacts that demonstrate the organization's exception management process to auditors.",
          "Compliance posture dashboard design translates the continuous stream of monitoring agent findings into a management-level view of the organization's compliance status. The dashboard shows: overall compliance percentage by framework (what percentage of SOC 2 controls are currently satisfied), trend over time (is compliance improving, stable, or degrading), open finding count by severity, mean time to remediation by severity, and compliance posture by team or business unit. Claude can generate the narrative commentary for each dashboard section — explaining what the trends mean, which controls are responsible for the degradation in a specific framework, and what the planned remediation timeline looks like. Executives and board members receive the narrative; engineers receive the detailed finding breakdown.",
          "The operational cost of continuous monitoring — API calls, Lambda invocations, Claude API usage — is a practical constraint that requires cost optimization to maintain over time. A naive implementation that checks every control against every resource on every run generates enormous API call volume and Claude usage costs. Cost-effective continuous monitoring uses change-event-driven checks where possible: monitor AWS CloudTrail for configuration change events and only run compliance checks on the specific resource that changed, rather than checking all resources on every scheduled run. Full compliance sweeps (checking all resources against all controls) run on a weekly or monthly schedule; change-event-driven checks maintain real-time coverage for new drift between full sweeps. This hybrid approach reduces costs by 80–90% compared to full sweeps on a daily schedule while maintaining the same drift detection coverage.",
        ],
        codeExample: {
          label: "Scheduled compliance agent — AWS EventBridge + Lambda",
          code: `# Lambda handler for scheduled compliance run
import json
import anthropic
from alert_router import route_findings

def lambda_handler(event, context):
    client = anthropic.Anthropic()

    # Run full compliance check
    findings = run_compliance_agent(client, scope=AUDIT_SCOPE, tools=COMPLIANCE_TOOLS)

    # Route findings by severity
    critical = [f for f in findings if f['severity'] == 'CRITICAL']
    high = [f for f in findings if f['severity'] == 'HIGH']

    if critical:
        route_findings(critical, channels=['pagerduty', 'slack-security', 'jira'])
    if high:
        route_findings(high, channels=['slack-security', 'jira'])

    # Store compliance history in DynamoDB
    store_compliance_snapshot(findings, timestamp=context.aws_request_id)

    return {"statusCode": 200, "findings_count": len(findings)}`,
        },
      },
      incident: {
        title: "LastPass Breach — Undetected Configuration Drift (2022)",
        when: "August–November 2022",
        where: "LastPass development and production environments",
        impact: "Encrypted password vaults for 33M customers stolen; attack persisted for months undetected",
        body: [
          "The LastPass breach of 2022 is one of the most consequential security incidents in recent history because of the nature of the data stolen: encrypted password vaults for 33 million customers. An attacker who can decrypt those vaults has access to every password for every account those customers stored in LastPass — a master key to their entire digital lives. The attacker gained initial access in August 2022 by compromising a senior DevOps engineer's home computer, then used that access to reach the LastPass corporate environment and ultimately the backup storage system containing the encrypted vaults. The attack persisted undetected from August through November 2022 — four months.",
          "The four-month dwell time is the critical operational failure. The attacker had sustained access to the LastPass environment for four months before detection. During this period, they exfiltrated encrypted backup data and customer information at a pace that, with continuous monitoring, would have generated anomaly alerts within hours of initial exfiltration. Behavioral baseline monitoring of the compromised DevOps engineer's account would have flagged: access to production systems from a home IP address not in the approved access list, access to backup storage systems that the account had not accessed in its normal behavioral pattern, and data transfer volumes to external endpoints that were dramatically outside the normal range for the account.",
          "Configuration drift monitoring would have provided additional detection opportunities. LastPass's post-incident disclosure indicated that the attacker moved laterally from the compromised developer machine to cloud resources, exploiting credentials stored on the developer's machine. Continuous monitoring of IAM access patterns — tracking which credentials accessed which resources from which IP addresses at which times — would have flagged the access from an unfamiliar network path. The four-month dwell time reflects an environment where configuration and behavioral monitoring were insufficient to detect the anomaly within a time window where containment was possible.",
          "The LastPass breach prompted the password manager industry to accelerate the adoption of zero-knowledge architecture improvements and strengthen security around backup encryption key management. For the broader security industry, it reinforced that continuous behavioral monitoring — not just static configuration checking — is required to detect sophisticated attackers who obtain legitimate credentials and use them in ways that appear legitimate from a configuration perspective. Continuous monitoring programs that only check configurations will miss the class of attack that LastPass experienced; behavioral monitoring that tracks access patterns against established baselines is required for comprehensive coverage.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Scheduler", sub: "EventBridge / GitHub Actions / cron", type: "attacker" },
          { label: "Claude Compliance Agent", sub: "recurring audit pipeline", type: "system" },
          { label: "Infrastructure State", sub: "drift from baseline", type: "victim" },
          { label: "Alerts + Tickets", sub: "PagerDuty / Slack / Jira", type: "result" },
        ],
      },
      timeline: [
        { year: 2022, event: "LastPass breach — 4-month dwell time due to lack of continuous monitoring" },
        { year: 2023, event: "AWS Security Hub adds continuous compliance rules across 1000+ controls" },
        { year: 2024, event: "Scheduled Claude compliance agents enter production at enterprise scale", highlight: true },
        { year: 2025, event: "Continuous AI compliance monitoring becomes SOC 2 Type II audit standard" },
      ],
      keyTakeaways: [
        "Annual audits find last year's problems — continuous monitoring on daily/weekly schedules finds today's drift within one schedule cycle of introduction",
        "Schedule Claude agents using AWS EventBridge cron rules, GitHub Actions schedule triggers, or Temporal/Airflow workflow orchestration",
        "Alert routing by severity: CRITICAL → PagerDuty + Slack + Jira (immediate); HIGH → Slack + Jira (same-day); MEDIUM → Jira (weekly); LOW → digest",
        "Suppression rules manage known exceptions with business justification, approval chain, and expiration date — expired suppressions automatically become active findings",
        "Behavioral baseline monitoring tracks access patterns (IP ranges, times, resources accessed) not just static configurations — catches credential theft attacks",
        "Change-event-driven monitoring (CloudTrail → check only changed resource) reduces cost by 80-90% vs full sweeps while maintaining real-time coverage",
        "Compliance posture dashboard with trend analysis and mean time to remediation metrics translates monitoring data into executive-level governance reporting",
        "SEC cybersecurity disclosure rules and FedRAMP authorization both require continuous monitoring programs as formal compliance deliverables",
        "LastPass (2022): four-month dwell time reflects absent behavioral monitoring — continuous monitoring turns a 4-month exposure into a 4-hour response window",
      ],
      references: [
        { title: "LastPass Breach Timeline (Wired)", url: "https://www.wired.com/story/lastpass-breach-vaults-password-managers/" },
        { title: "AWS Security Hub Continuous Compliance", url: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html" },
      ],
    },
    ctf: {
      scenario: "A continuous compliance sentinel caught a drift event. Three monitoring log files contain the flag — the scheduler log, the drift detection alert, and the incident ticket. Read all three.",
      hint: "Monitoring logs are in /sentinel-logs. Three files contain the flag fragments.",
      hints: [
        "List /sentinel-logs to find the log files.",
        "The scheduler.log contains the first fragment.",
        "Check drift-alert.txt and incident-ticket.txt for the remaining fragments.",
      ],
      files: {
        "/sentinel-logs/scheduler.log": `# Compliance Sentinel — Scheduled Run Log
# AWS EventBridge cron: 0 6 * * * (daily at 06:00 UTC)

2024-11-16T06:00:01Z  Compliance agent triggered by EventBridge
2024-11-16T06:00:03Z  Running 47 compliance checks across us-east-1
2024-11-16T06:01:47Z  All checks complete — 1 CRITICAL drift detected
2024-11-16T06:01:48Z  Routing CRITICAL findings to alert channels

Fragment-1: FLAG{C0NT1N_
`,
        "/sentinel-logs/drift-alert.txt": `# Drift Detection Alert — CRITICAL

Timestamp: 2024-11-16T06:01:47Z
Control: S3-PUB-01 (S3 buckets must not allow public access)

DRIFT DETECTED:
  Bucket: acme-marketing-assets (created 2024-11-15T23:12:00Z)
  Public access block: DISABLED
  ACL: public-read

Baseline: ALL buckets must have S3 Block Public Access enabled
Drift introduced: 2024-11-15 (within last 24h — agent caught within one schedule cycle)

Fragment-2: C0MPL14NC3_
`,
        "/sentinel-logs/incident-ticket.txt": `# Auto-Generated Incident Ticket — JIRA-4821

Title: [COMPLIANCE] S3 Public Access Drift — acme-marketing-assets
Severity: CRITICAL
Assigned: cloud-security-oncall@acme.com
PagerDuty: triggered (incident #P-8821)
Slack: posted to #security-alerts

Status: OPEN
SLA: 4 hours to remediation confirmation

Automated remediation available: run sentinel-remediate --bucket acme-marketing-assets

Fragment-3: CAUGHT}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. Annual audits find last year's problems; continuous monitoring (daily/weekly schedules) finds today's — this drift was introduced yesterday and caught within one schedule cycle
  2. Alert routing by severity prevents alert fatigue: CRITICAL → PagerDuty + Slack + Jira; HIGH → Slack + Jira; MEDIUM → Jira only
  3. LastPass (2022) had a 4-month dwell time; continuous behavioral baseline monitoring turns a 4-month exposure into a 4-hour response window
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "sentinel-logs", isDir: true }],
        "/sentinel-logs": [
          { name: "scheduler.log", isDir: false },
          { name: "drift-alert.txt", isDir: false },
          { name: "incident-ticket.txt", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/sentinel-logs/scheduler.log", value: "FLAG{C0NT1N_", label: "Fragment 1 — Scheduler Log" },
        { trigger: "/sentinel-logs/drift-alert.txt", value: "C0MPL14NC3_", label: "Fragment 2 — Drift Alert" },
        { trigger: "/sentinel-logs/incident-ticket.txt", value: "CAUGHT}", label: "Fragment 3 — Incident Ticket" },
      ],
    },
  },

  // ─── audit-a12: End-to-End Agentic Audit ─────────────────────────────────────
  {
    epochId: "tech-audit-3",
    wonder: { name: "Agentic Audit Command Center", location: "San Francisco, California", era: "Present Day", emoji: "🎯" },
    id: "audit-a12",
    order: 12,
    title: "The Full Pipeline",
    subtitle: "End-to-End Agentic Audit — complete pipeline synthesis",
    category: "ai",
    xp: 200,
    badge: { id: "audit-a-badge-12", name: "Agentic Auditor", emoji: "🎯" },
    challengeType: "ctf",
    info: {
      tagline: "The future of audit: define scope, press run, receive report.",
      year: 2024,
      overview: [
        "The end-to-end agentic audit pipeline is not a single tool or a single Claude agent — it is an orchestrated system of specialized components that together automate the complete audit lifecycle from scope definition through continuous post-audit monitoring. Every component covered in this epoch plays a specific role in the pipeline: tool use for structured data collection, MCP servers for integration with diverse data sources, multi-agent orchestration for parallel domain analysis and cross-domain synthesis, AI-powered analysis for IAM policies and IaC configurations, automated evidence collection for control validation, report generation for professional audit documentation, and continuous sentinel operation for ongoing compliance assurance.",
        "A complete agentic audit engagement runs in five phases. Phase 1 (inventory): the auditor defines the audit scope as a configuration object — account IDs, regions, applicable compliance frameworks, services in scope, excluded resources, and applicable exceptions. The inventory agent runs a comprehensive sweep of all defined services across all specified accounts and regions, building the resource dependency graph that all subsequent agents use. Phase 2 (parallel domain analysis): specialist agents run simultaneously on their respective domains — IAM policy analysis, network segmentation review, secrets scanning, IaC configuration review, and logging completeness assessment — all using the inventory output as their starting point. Phase 3 (synthesis): the orchestrator agent receives all specialist findings, correlates them by resource identifier, identifies cross-domain risk chains, and generates an integrated risk picture. Phase 4 (output): the report generation agent and evidence package builder run in parallel, producing the draft audit report and the organized evidence package simultaneously. Phase 5 (sentinel activation): the continuous monitoring sentinel is configured with the audit scope and baseline established during the engagement, and activated to monitor for drift on the ongoing schedule.",
        "The agentic pipeline does not replace auditors — it fundamentally changes what auditors do. In the current manual model, auditors spend the majority of their time on mechanical tasks: exporting evidence, writing finding descriptions, reviewing configurations that could be checked by a rule. In the agentic model, these mechanical tasks are automated. Auditors spend their time on judgment tasks that AI cannot reliably perform: assessing whether a finding is material given the organization's specific business context, evaluating whether a compensating control adequately addresses the identified risk, advising management on remediation strategy and tradeoffs, communicating findings to diverse stakeholder audiences, and exercising professional skepticism about system-generated results. This is a better use of auditor expertise and produces higher-quality audit outcomes.",
        "Production deployment of a full agentic audit pipeline requires significant engineering investment beyond just writing the agent code. The pipeline needs: a secrets management solution for the credentials each agent uses to access target systems, an execution environment that isolates the audit pipeline from the systems it is auditing, observability tooling to monitor agent execution and debug failures, a data persistence layer for storing inventory outputs, findings, evidence packages, and historical compliance snapshots, a configuration management system for defining audit scopes and exception rules, and a delivery mechanism for routing agent outputs to human reviewers and operational systems. Each of these components requires production-quality engineering, not just proof-of-concept implementation.",
        "Cost modeling for the full pipeline is a practical consideration that shapes architectural decisions. The primary cost drivers are Claude API usage (measured in input and output tokens across all agent calls), cloud API calls (some cloud providers charge for API requests beyond a free tier), Lambda execution time (for serverless orchestration), and data storage for evidence packages. A comprehensive audit of a medium-sized AWS environment (100–300 resources, 5 specialist agents, full report generation) consumes approximately 2–5 million tokens of Claude input and 500K–1M tokens of Claude output. At current API pricing, this is significantly less than the labor cost of a single day of manual audit work. For continuous monitoring running daily, the cost scales linearly with the number of controls being monitored and can be optimized using change-event-driven monitoring to reduce the number of full sweeps required.",
        "The regulatory future of agentic audit is one of the most consequential open questions in the compliance industry. Current audit standards (SOC 2, ISO 27001, NIST RMF) were designed for manual audit processes and do not address the use of AI in audit procedures. As agentic audit pipelines become more capable and more widely used, standard-setting bodies will need to address: how AI-generated findings should be documented and disclosed, what validation is required for AI tools used in attestation-relevant audit procedures, how auditor independence requirements apply when the same AI tools are used across many audit engagements, and whether continuous AI monitoring satisfies the evidence requirements for Type II certifications. These questions will be resolved through regulatory rulemaking and standard revision processes over the next several years, and the organizations building production agentic audit capabilities today will shape those standards through their demonstrated practice.",
        "The skill set required to build and operate production agentic audit pipelines bridges two historically separate disciplines: security audit expertise and software engineering. Security auditors understand what needs to be tested, what evidence satisfies which control, what findings are material, and how to communicate risk to different audiences. Software engineers understand how to build reliable, observable, cost-efficient systems that handle failures gracefully and scale to production workloads. Neither skill set alone is sufficient. The auditors of the future — particularly those working in technology-intensive industries — will need proficiency in both: the judgment and expertise of experienced auditors and the technical capabilities to design, build, and interpret the output of agentic systems. This course is a foundation for that combined skill set.",
      ],
      technical: {
        title: "Full Pipeline Component Stack",
        body: [
          "The pipeline architecture follows a layered model with clear interfaces between layers. Layer 1 (data collection) consists of MCP servers and custom SDK tool implementations that provide authenticated access to target systems: filesystem and git servers for code and configuration review, AWS/GCP/Azure SDK tools for cloud resource enumeration, database connectors for log analysis and compliance data, and GitHub/Jira/ServiceNow connectors for change management and ticketing integration. Each data source is wrapped as an MCP server or a custom tool with explicit input validation, rate limiting, and error handling. Layer 2 (analysis) consists of domain-specific Claude agents — inventory, IAM, network, secrets, IaC, logging — each with a carefully engineered system prompt, appropriate tool subset, and structured output schema. Layer 3 (orchestration) is the orchestrator agent that manages the execution dependency graph, runs specialists in parallel or sequential order as required, and performs cross-domain synthesis. Layer 4 (output) is the report generation agent and evidence package builder. Layer 5 (operations) is the continuous sentinel with scheduling, alerting integration, and suppression management.",
          "The execution model is a directed acyclic graph (DAG) where nodes are agent tasks and edges are data dependencies. The inventory agent is the root node — all domain specialist agents depend on its output. The IAM specialist, network specialist, secrets specialist, IaC specialist, and logging specialist have no dependencies on each other and form a parallel execution tier. The synthesis agent depends on all specialists completing. The report generation agent and evidence package builder both depend on synthesis completing but are independent of each other, forming a parallel output tier. The sentinel activation depends on the synthesized findings establishing the baseline. This DAG structure allows the orchestrator to maximize parallelism: the five specialist agents run simultaneously, reducing the analysis phase duration from the sum of individual agent times to the maximum individual agent time.",
          "State management across the pipeline requires a persistent storage layer that survives individual agent failures and supports resumption from intermediate states. Each agent writes its output to a defined location in the state store (DynamoDB table or S3 bucket) as it completes. If a specialist agent fails partway through, the orchestrator can restart just that agent from the beginning without re-running agents that have already completed successfully. The state store also provides the data layer for the compliance history database, storing snapshots of each inventory and finding set with timestamps that enable trend analysis and drift detection over time. Immutable storage (S3 with object lock) provides the tamper-resistant evidence chain required for regulatory compliance purposes.",
          "Security architecture for the production pipeline requires defense-in-depth across multiple trust boundaries. The audit pipeline executes with read-only credentials that cannot modify the systems it audits — write access is never granted to audit agents. Each MCP server is scoped to minimum required access, and all server invocations are logged to an immutable audit log. The pipeline execution environment is isolated from the systems being audited using network policies, IAM permission boundaries, and container isolation. Agent-to-agent communication happens only through the structured state store, not through direct API calls, preventing one compromised agent from directly affecting other agents. Prompt injection defenses include: sanitizing all retrieved content before including it in Claude prompts, implementing content length limits on tool outputs, and using structured output formats that make it harder for injected instructions to be interpreted as legitimate Claude responses.",
          "Observability and debugging infrastructure is a production requirement that is frequently underestimated in initial pipeline designs. Each agent call should emit: a trace ID that links all related operations in a single audit run, the agent's system prompt hash (for change detection), the tool calls made and their arguments (for audit trail), the token counts for each Claude API call (for cost monitoring), the execution duration (for performance monitoring), and any errors or retries encountered. These metrics flow to a centralized observability platform (CloudWatch, Datadog, or similar) where dashboards track pipeline health, cost trends, and error rates. When a finding is questioned by a client, the observability infrastructure provides the evidence that the finding was produced by a specific agent run, using specific tool outputs, with a specific Claude model version — making the audit trail for the audit itself as robust as the audit trail for the audited systems.",
        ],
        codeExample: {
          label: "Full pipeline orchestration (high-level)",
          code: `async def run_full_agentic_audit(scope: AuditScope) -> AuditPackage:
    # Phase 1: Inventory (sequential — all subsequent phases depend on this)
    inventory = await run_inventory_agent(scope)

    # Phase 2: Domain analysis (parallel — all use inventory as input)
    domain_findings = await asyncio.gather(
        run_iam_agent(inventory, scope),
        run_network_agent(inventory, scope),
        run_secrets_agent(inventory, scope),
        run_iac_agent(inventory, scope),
        run_logging_agent(inventory, scope),
    )

    # Phase 3: Synthesis (sequential — needs all domain findings)
    synthesized = await run_synthesis_agent(domain_findings, scope)

    # Phase 4: Output (parallel — report and evidence are independent)
    report, evidence_pkg = await asyncio.gather(
        run_report_agent(synthesized, scope),
        run_evidence_agent(synthesized, scope),
    )

    # Phase 5: Activate continuous monitoring sentinel
    await activate_sentinel(scope, baseline=synthesized)

    return AuditPackage(report=report, evidence=evidence_pkg, sentinel_active=True)`,
        },
      },
      incident: {
        title: "MGM Resorts Breach — Manual Audit Couldn't Keep Pace (2023)",
        when: "September 2023",
        where: "MGM Resorts International, Las Vegas",
        impact: "$100M+ operational losses; hotel systems, slot machines, digital keys offline for 10 days",
        body: [
          "The MGM Resorts breach of September 2023 began with a technique that sits entirely outside the scope of technical security controls: a social engineering phone call to MGM's IT helpdesk. The attackers — associated with the Scattered Spider group — impersonated an MGM employee, provided personal information obtained from LinkedIn, and convinced the helpdesk to reset the target's credentials. This initial access technique is addressed through employee training and helpdesk verification procedures, not technical audit controls. But everything that followed the initial access relied on technical vulnerabilities that comprehensive agentic auditing would have identified.",
          "The lateral movement, privilege escalation, and ransomware deployment phases of the MGM attack exploited vulnerabilities across multiple domains simultaneously. Post-incident analysis and public reporting indicated: overly permissive IAM roles that allowed escalation from an initial low-privilege foothold to domain administrator, insufficient network segmentation between corporate IT systems and operational technology (hotel management systems, slot machines, key card systems), inadequate monitoring of privileged account activity that failed to detect the unusual access patterns during the 10-day attack dwell time, and backup systems that were reachable from the compromised environment, allowing the attackers to access encrypted backups that could have aided recovery.",
          "MGM's environment is representative of large, complex enterprise organizations in every industry: a sprawling infrastructure accumulated over decades of operations and acquisitions, with many systems that predate modern cloud security practices, managed by a large IT team whose capacity for manual security assessment is fundamentally limited by headcount. An agentic audit pipeline with continuous monitoring would have maintained a current inventory of every IAM role and its permissions, every network path between MGM's corporate and operational systems, every privileged account and its recent access patterns, and every backup system and its exposure to the corporate network. The defenders would have had the situational awareness needed to either prevent the attack chain or respond within hours rather than allowing a 10-day dwell time.",
          "The $100 million in operational losses from the MGM breach — hotel reservation systems offline, digital room keys non-functional, casino systems down for 10 days — illustrates the operational technology (OT) dimension of enterprise security that agentic audit pipelines must incorporate as organizations connect physical operations to digital systems. The casino floor is an IT environment: slot machines are networked computers, hotel key systems are IoT devices, food and beverage systems are cloud-connected applications. Comprehensive agentic auditing of an enterprise like MGM requires specialist agents for OT security, IoT inventory, and physical-digital system integration — domains that are immature in the current audit tooling landscape but are clearly required by the evolving threat environment.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Audit Scope Definition", sub: "accounts / regions / standards", type: "attacker" },
          { label: "Full Agent Pipeline", sub: "inventory → analysis → synthesis → report → sentinel", type: "system" },
          { label: "Enterprise Infrastructure", sub: "cloud / IAM / network / code", type: "victim" },
          { label: "Audit Package + Sentinel", sub: "report + evidence + monitoring", type: "result" },
        ],
      },
      timeline: [
        { year: 2023, event: "MGM breach — $100M loss; complex enterprise environment too large for manual audit" },
        { year: 2024, event: "First enterprise agentic audit pipelines achieve full automation end-to-end", highlight: true },
        { year: 2025, event: "Big 4 firms deploy agentic audit pipelines to replace 60% of manual procedures" },
        { year: 2026, event: "Agentic continuous auditing becomes regulatory baseline expectation" },
      ],
      keyTakeaways: [
        "End-to-end pipeline phases: inventory (sequential) → parallel domain analysis → synthesis → output (parallel report + evidence) → sentinel activation",
        "DAG execution model: inventory is the root node; specialists form a parallel tier; synthesis, output, and sentinel activation follow in sequence",
        "Agentic pipelines eliminate mechanical audit work (collection, formatting, pattern matching) — auditors focus on judgment, materiality, and communication",
        "Production deployment requires: secrets management, isolated execution environment, observability tooling, persistent state store, and configuration management",
        "Defense-in-depth for the pipeline itself: read-only credentials, scoped MCP servers, immutable audit logging, content sanitization for prompt injection defense",
        "DAG parallelism reduces analysis phase from sum of individual agent times to the maximum individual agent time — 5x–10x speedup for multi-specialist runs",
        "Compliance history database enables trend analysis: is compliance improving or degrading over time, what is the mean time to remediation by severity and team?",
        "Regulatory alignment: SEC disclosure rules, FedRAMP continuous monitoring requirements, and SOC 2 Type II assurance all converge on continuous agentic monitoring as the expected baseline",
        "MGM (2023): $100M loss from an attack that exploited cross-domain vulnerabilities in an environment too complex for manual audit to track comprehensively",
      ],
      references: [
        { title: "MGM Breach Analysis (Dark Reading)", url: "https://www.darkreading.com/threat-intelligence/mgm-resorts-attack-exposed-details" },
        { title: "Anthropic Claude API Documentation", url: "https://docs.anthropic.com/en/api" },
      ],
    },
    ctf: {
      scenario: "You have completed all modules of the Agentic Audit epoch. The final pipeline run logged its complete execution across three phases. Read each phase log to collect the final flag.",
      hint: "Full pipeline logs are in /pipeline-run. Three phase log files contain the flag fragments.",
      hints: [
        "List /pipeline-run to find the phase log files.",
        "Phase 1 (inventory) contains the first fragment.",
        "Phase 3 (synthesis + output) contains the final fragment.",
      ],
      files: {
        "/pipeline-run/phase1-inventory.log": `# Phase 1 — Inventory Agent
# Agentic Audit Pipeline v2.0 — Full Run

Scope: acme-corp — all AWS accounts, all regions
Standards: SOC 2 Type II, CIS AWS Foundations v1.4, NIST CSF

Inventory complete:
  S3 buckets: 23
  EC2 instances: 47
  IAM roles: 112
  Lambda functions: 31
  RDS instances: 8

Fragment-1: FLAG{3ND_T0_
`,
        "/pipeline-run/phase2-parallel.log": `# Phase 2 — Parallel Domain Agents

IAM Agent     → 4 findings (2 CRITICAL, 2 HIGH)    ✓ complete
Network Agent → 3 findings (1 CRITICAL, 2 MEDIUM)  ✓ complete
Secrets Agent → 2 findings (1 CRITICAL, 1 HIGH)    ✓ complete
IaC Agent     → 5 findings (1 HIGH, 4 MEDIUM)      ✓ complete
Logging Agent → 1 finding (1 HIGH)                 ✓ complete

All domain agents complete. Passing to orchestrator synthesis.

Fragment-2: 3ND_4G3NT1C_
`,
        "/pipeline-run/phase3-output.log": `# Phase 3 — Synthesis + Output

Cross-domain findings: 3 risk chains identified
Report draft: generated (47 pages, executive summary + technical appendix)
Evidence package: assembled (112 artifacts, all controls mapped)
Continuous sentinel: ACTIVATED (daily schedule, PagerDuty integrated)

Pipeline complete. Audit package delivered to engagement manager.

Total pipeline runtime: 14 minutes 33 seconds
Equivalent manual audit time estimate: 3-4 weeks

Fragment-3: 4UD1T}

─────────────────────────────────────────────────────────────────────
WHAT YOU'RE LEARNING:
  1. End-to-end pipeline: inventory (sequential) → domain analysis (parallel) → synthesis → report + evidence (parallel) → sentinel activation
  2. Agents eliminate mechanical audit work (data collection, formatting, basic pattern matching); auditors focus on judgment, risk context, and stakeholder communication
  3. 14 minutes vs 3-4 weeks: this is the productivity transformation of agentic auditing — the same coverage, in a fraction of the time, on every release cycle
─────────────────────────────────────────────────────────────────────
`,
      },
      dirs: {
        "/": [{ name: "pipeline-run", isDir: true }],
        "/pipeline-run": [
          { name: "phase1-inventory.log", isDir: false },
          { name: "phase2-parallel.log", isDir: false },
          { name: "phase3-output.log", isDir: false },
        ],
      },
      fragments: [
        { trigger: "/pipeline-run/phase1-inventory.log", value: "FLAG{3ND_T0_", label: "Fragment 1 — Phase 1 Inventory" },
        { trigger: "/pipeline-run/phase2-parallel.log", value: "3ND_4G3NT1C_", label: "Fragment 2 — Phase 2 Parallel" },
        { trigger: "/pipeline-run/phase3-output.log", value: "4UD1T}", label: "Fragment 3 — Phase 3 Output" },
      ],
    },
  },
];
