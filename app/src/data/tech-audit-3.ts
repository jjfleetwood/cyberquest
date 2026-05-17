import type { StageConfig, EpochConfig } from "./types";

export const techAudit3Epoch: EpochConfig = {
  id: "tech-audit-3",
  name: "Tech Audit: Agentic",
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
        "Claude's tool use API (also called function calling) allows you to define structured functions that Claude can invoke during a conversation. For audit automation, this means Claude can call real systems — read files, query APIs, check configurations — rather than hallucinating answers from training data alone.",
        "A tool definition has three parts: a name, a description that Claude uses to decide when to call it, and a JSON Schema for the parameters. Claude reads the tool descriptions and decides which tools to call and with what arguments. Your code executes the tool and returns the result. Claude then reasons over the result to continue.",
        "Audit tools map directly to audit procedures: `list_s3_buckets` replaces manual AWS Console clicks, `check_iam_policy` replaces spreadsheet-based policy review, `scan_repo_for_secrets` replaces grep scripts. The result is audits that run in minutes, produce consistent structured output, and can be re-run on every release.",
      ],
      technical: {
        title: "Tool Definition Pattern",
        body: [
          "Each tool definition is a JSON object with `name`, `description`, and `input_schema` (JSON Schema). The description is critical — Claude uses it to determine when to invoke the tool. Vague descriptions produce erratic tool selection.",
          "The agentic loop: (1) send user message + tool definitions to Claude, (2) Claude returns a tool_use block with tool name and arguments, (3) your code executes the tool and returns tool_result, (4) repeat until Claude returns a text response with no tool calls. This loop is the foundation of all agentic audit pipelines.",
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
          "The Capital One breach succeeded because a misconfigured AWS WAF allowed SSRF requests to the EC2 metadata service, leaking IAM credentials. The misconfiguration existed for months. Manual configuration review processes failed to catch it — the WAF rules were complex, review was infrequent, and no automated tool continuously verified the expected state.",
          "An agentic audit tool polling WAF rules against a known-good baseline would have flagged the deviation within hours of introduction. This is the core value proposition of agentic auditing: continuous, automated verification rather than point-in-time manual review.",
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
        "Tool descriptions drive Claude's tool selection — write them precisely",
        "The agentic loop: message → tool_use → tool_result → repeat until text response",
        "Audit tools replace manual procedures with consistent, re-runnable checks",
        "Always validate tool inputs server-side — Claude can pass unexpected argument shapes",
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
        "API surface area is the single largest blind spot in modern security audits. Organizations routinely have 40–60% more API endpoints than their API inventory documents. Shadow APIs, legacy versions, and undocumented internal endpoints accumulate faster than manual documentation processes can track them.",
        "Agentic API enumeration uses Claude to orchestrate a systematic discovery pipeline: crawl OpenAPI specs, parse gateway logs, probe known path patterns, diff against approved inventory, and generate a gap report. Claude reasons about which endpoints warrant deeper testing based on path semantics and HTTP methods.",
        "The enumeration agent uses a set of tools: `fetch_openapi_spec`, `list_gateway_routes`, `probe_endpoint`, and `compare_to_inventory`. Claude decides the order of tool calls, handles pagination, and synthesizes findings without a human directing each step.",
      ],
      technical: {
        title: "Enumeration Agent Architecture",
        body: [
          "The agent begins by fetching the official API spec (OpenAPI/Swagger) and the gateway's live route table. It diffs the two to find undocumented routes. For each undocumented route, it issues a probe (OPTIONS request or low-risk GET) to confirm liveness. Finally it compares authenticated vs unauthenticated responses to flag auth bypass candidates.",
          "Rate limiting and scope constraints must be encoded in the tool implementations, not left to Claude's judgment. Claude decides what to test; your code enforces the rules of engagement — max requests per minute, allowed IP ranges, excluded paths.",
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
          "Security researcher Jan Masters discovered that Peloton's API returned full user profile data — age, gender, city, workout stats, account creation date — without requiring authentication on the `/stats/v2/workouts` endpoint. The endpoint was undocumented and not included in Peloton's internal API inventory.",
          "An agentic enumeration audit running weekly would have flagged this endpoint within days of its deployment. The agent would have noted that `/stats/v1/workouts` required auth while `/stats/v2/workouts` did not — a clear auth regression detectable through automated comparison.",
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
        "60%+ of orgs have undocumented APIs not in their official inventory",
        "Diff OpenAPI spec vs live gateway routes to find shadow endpoints",
        "Encode rate limits and scope in tool implementations, not in Claude's prompt",
        "Auth regression detection: compare auth requirements across API versions",
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
        "Traditional secrets scanning tools use regex patterns to detect known secret formats — AWS key prefixes, GitHub token patterns, PEM headers. They catch well-formatted secrets but fail on obfuscated credentials, environment-variable secrets set in CI configs, secrets in comments, or custom internal token formats.",
        "AI-powered secrets detection uses Claude to reason about context: Is this a real credential or a test placeholder? Is this variable name suspiciously credential-like even though the value looks benign? Does this base64 blob decode to a private key? Claude's semantic understanding catches what regex misses.",
        "The agentic secrets scanner combines regex pre-screening (for speed and known formats) with Claude analysis (for context and edge cases). It scans git history, environment configs, infrastructure-as-code, Docker images, and CI/CD pipeline definitions — the full surface area where secrets leak.",
      ],
      technical: {
        title: "Two-Phase Scanning Architecture",
        body: [
          "Phase 1 (fast, regex): run truffleHog or detect-secrets across the target. Flag all pattern matches and high-entropy strings for review. This produces many false positives but misses nothing obvious.",
          "Phase 2 (accurate, Claude): for each flagged item, send a context window to Claude containing the surrounding code, the file path, the variable name, and the raw value. Ask Claude to classify: confirmed_secret, likely_placeholder, false_positive. Claude's judgment reduces analyst review time by 80%+ in practice.",
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
          "The 2022 Uber breach began with an MFA fatigue attack, but the attacker's ability to move laterally and access production data relied on finding hardcoded credentials in Uber's internal PowerShell scripts stored on a network share. The credentials were not in the main source repos — they were in operational scripts that regex scanners didn't reach.",
          "Claude-powered scanning would have reached those operational scripts. More importantly, Claude can recognize credential-like patterns in PowerShell variable names (`$uberProdKey`, `$awsToken`) even when the values are obfuscated — something pure regex cannot do without an exhaustive list of variable names.",
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
        "Regex finds formats; Claude finds intent — use both in sequence",
        "Scan beyond git repos: CI configs, Docker images, IaC, operational scripts",
        "Claude classification: confirmed_secret / likely_placeholder / false_positive",
        "Git history scanning catches secrets committed and 'deleted' — deletion ≠ removal",
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

[HIGH] File: config/deploy.sh  Line: 47
  Variable: AWS_ACCESS_KEY_ID
  Value: AKIA4EXAMPLE7REDACTED
  Pattern: AWS Access Key (AKIA prefix)
  Fragment: FLAG{S3CR3TS_

[MEDIUM] File: tests/fixtures/mock-creds.json  Line: 12
  Variable: api_key
  Value: test-key-1234-placeholder
  Pattern: generic api_key pattern
`,
        "/secrets-scan/phase2/claude-classifications.txt": `# Phase 2 — Claude Classification Results

Finding #1 (config/deploy.sh:47)
  Claude verdict: confirmed_secret
  Reasoning: AKIA prefix is an active AWS access key prefix; variable name and file context confirm production usage, not test fixture.
  Action: ROTATE IMMEDIATELY
  Fragment: 4I_SCN_

Finding #2 (tests/fixtures/mock-creds.json:12)
  Claude verdict: false_positive
  Reasoning: Value contains 'test' and 'placeholder' substrings; file path is tests/fixtures — classic test credential pattern.
  Action: no action required
`,
        "/secrets-scan/triage-summary.txt": `# Secrets Scan Triage Summary

Confirmed secrets: 1 (CRITICAL — rotate AWS key)
False positives: 1
Pending review: 0

Total scan time: 4m 12s
Repos scanned: 3
Commits scanned (git history): 1,847

Final fragment: TR14G3}
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
        "Cloud resource enumeration is the foundation of every cloud security audit. Before you can assess controls, you must know what exists: which S3 buckets, EC2 instances, Lambda functions, RDS databases, IAM roles, VPCs, security groups, and API Gateways are deployed across which regions and accounts.",
        "Manual cloud inventory takes days for large accounts. Agentic enumeration with Claude and the AWS SDK takes minutes. Claude orchestrates a systematic sweep: list resources by service, check each for key configurations, flag deviations from baseline, and produce a structured inventory report.",
        "The enumeration agent is also the foundation for all subsequent checks — secrets scanning, IAM analysis, network segmentation, and compliance mapping all start from the resource inventory Claude builds.",
      ],
      technical: {
        title: "Cloud Enumeration Tool Set",
        body: [
          "Core tools for an AWS enumeration agent: `list_s3_buckets` (with public access block status), `list_ec2_instances` (with security group IDs), `list_iam_roles` (with attached policies), `list_lambda_functions` (with VPC config), `list_rds_instances` (with publicly accessible flag), `list_security_groups` (with inbound rules).",
          "Claude decides which services to prioritize based on the audit scope. For a data-centric audit, it starts with S3 and RDS. For a network audit, it starts with VPCs and security groups. The agent builds a dependency graph — which Lambda has which role, which role can access which bucket — that manual auditors rarely have time to construct.",
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
          "Toyota disclosed that vehicle location data for 2.15 million customers was publicly accessible from February 2012 to May 2023 — over a decade — due to a misconfigured cloud environment. The misconfiguration was not caught because Toyota lacked automated cloud configuration monitoring.",
          "An agentic cloud enumeration agent running weekly would have flagged the public access configuration within the first sprint cycle. The 10-year exposure timeline is a direct measure of the cost of manual-only cloud auditing.",
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
        "Cloud inventory is prerequisite to every subsequent audit check",
        "Enumerate all services: S3, EC2, RDS, Lambda, IAM, VPC, security groups",
        "Build resource dependency graphs — which role accesses which bucket",
        "Agentic enumeration catches 10-year-old misconfigurations in minutes",
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
        "IAM policy analysis is one of the highest-value applications of AI in security auditing. A large AWS account can have thousands of IAM roles, policies, and permission boundaries. Manual review is slow, error-prone, and rarely complete. Claude can analyze a full IAM configuration in minutes and reason about effective permissions across policy layers.",
        "Claude understands IAM policy semantics: the difference between identity-based and resource-based policies, how permission boundaries constrain effective permissions, when Condition blocks actually restrict access, and when wildcard statements create privilege escalation paths. This semantic understanding goes far beyond what regex or simple rule engines can detect.",
        "The IAM analyzer agent: enumerate all roles and attached policies, extract policy documents, send each to Claude for analysis, flag overly permissive statements, identify privilege escalation paths (e.g., iam:CreatePolicyVersion, iam:PassRole), and generate a remediation report with specific least-privilege replacements.",
      ],
      technical: {
        title: "Privilege Escalation Patterns Claude Detects",
        body: [
          "Classic privilege escalation actions in IAM: `iam:CreatePolicyVersion` (create a new version of any policy, including policies attached to admin roles), `iam:AttachRolePolicy` (attach any policy to any role), `iam:PassRole` with `ec2:RunInstances` (launch an instance with an admin role), `sts:AssumeRole` without Condition constraints (assume any role).",
          "Claude checks each of these patterns and reasons about the full permission chain. It can answer: 'If this Lambda role is compromised, what is the maximum privilege an attacker could escalate to?' — a question that manual auditors rarely have time to answer for every role.",
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
          "The Capital One breach demonstrated the real-world impact of IAM privilege chains. The attacker used SSRF to query the EC2 metadata service, obtained the IAM role credentials for the WAF's EC2 instance, and used those credentials to list and download S3 buckets. The IAM role had far more S3 access than the WAF application required.",
          "Claude analysis of the WAF instance role would have immediately flagged: (1) `s3:ListAllMyBuckets` on Resource `*` — unnecessary for a WAF, (2) `s3:GetObject` on Resource `*` — should be scoped to the specific log bucket. The overly permissive IAM role was the critical failure that turned an SSRF into a mega-breach.",
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
        "Privilege escalation: iam:CreatePolicyVersion, iam:PassRole, sts:AssumeRole are the key actions",
        "Claude reasons about effective permissions across policy layers — not just individual statements",
        "Scope all S3/resource actions to specific ARNs, not Resource: '*'",
        "Ask Claude: 'What is the maximum privilege this role can escalate to if compromised?'",
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
        "The Model Context Protocol (MCP) is an open standard for connecting AI models to external tools and data sources. Instead of writing custom tool integrations for each audit system, MCP provides a standardized server/client architecture: MCP servers expose resources and tools, Claude connects as an MCP client and uses them through a uniform interface.",
        "For audit automation, MCP provides pre-built servers for the most common audit data sources: filesystem (read configs, scan repos), git (analyze commit history, check for sensitive data in history), web fetch (download public documentation, check CDN headers), and database (query audit logs, compliance tables).",
        "MCP dramatically reduces the engineering work required to build audit agents. Instead of writing a custom AWS SDK wrapper, you connect the AWS MCP server. Instead of building a git history scanner, you connect the git MCP server. The audit agent focuses on reasoning; MCP handles the I/O.",
      ],
      technical: {
        title: "MCP Architecture for Audit",
        body: [
          "MCP uses a client-server model over stdio or HTTP+SSE. The MCP server exposes: resources (read-only data like files and database records) and tools (callable functions that can modify state). Claude Code and the Anthropic API both support MCP — you can use the same MCP servers in your IDE and in production audit pipelines.",
          "Key MCP servers for audit: `@modelcontextprotocol/server-filesystem` (read/write local files), `@modelcontextprotocol/server-github` (GitHub repos, PRs, issues), `@modelcontextprotocol/server-fetch` (web page fetching), `@modelcontextprotocol/server-postgres` (database queries). Community servers exist for AWS, GCP, Kubernetes, and dozens of security tools.",
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
          "The SolarWinds SUNBURST attack succeeded partly because no automated tooling was continuously monitoring the build pipeline for unauthorized modifications. The attackers modified the Orion build process to inject the backdoor — a change that automated git history analysis and build artifact comparison would have flagged.",
          "An MCP-connected audit agent with access to the git server, build system, and artifact repository would have detected: (1) a commit that didn't match any recorded pull request, (2) a build artifact whose hash differed from the compiled source. MCP provides the integration layer to connect Claude to all three systems simultaneously.",
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
        "MCP is the standard protocol for connecting Claude to external audit systems",
        "Pre-built MCP servers: filesystem, git, GitHub, fetch, postgres, AWS, Kubernetes",
        "MCP config goes in claude_desktop_config.json for Claude Code or passed at API init",
        "Use MCP to build cross-system audit agents that span repos, clouds, and databases",
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
        "Infrastructure as Code (IaC) auditing is uniquely suited to AI because Terraform plans, CloudFormation templates, and Kubernetes manifests are structured text documents that describe exact system states. Claude can read a `terraform plan` output and reason about every resource change before it is applied.",
        "Agentic IaC review integrates into the CI/CD pipeline: when a pull request modifies infrastructure code, the agent automatically runs `terraform plan`, sends the plan output to Claude, and posts a security review comment on the PR. The developer gets security feedback before merge, not after a production incident.",
        "Claude understands IaC semantics: it knows that `publicly_accessible = true` on an RDS instance is a finding, that a security group with `cidr_blocks = [\"0.0.0.0/0\"]` on port 22 is high severity, and that deleting a CloudTrail trail is a critical control removal — without being explicitly programmed with these rules.",
      ],
      technical: {
        title: "PR-Integrated IaC Review Pipeline",
        body: [
          "Pipeline integration: (1) PR opens with .tf file changes, (2) CI job runs `terraform plan -out=plan.tfplan && terraform show -json plan.tfplan > plan.json`, (3) agent sends plan.json to Claude with audit prompt, (4) Claude returns structured findings JSON, (5) agent posts GitHub PR comment with findings, (6) critical findings block merge via required status check.",
          "The Claude prompt for IaC review should specify: the cloud provider, the security baseline (CIS AWS Foundations Benchmark level), the severity threshold for blocking, and the output format. Consistent prompting produces consistent findings that developers can reason about.",
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
          "The Twitch leak included internal Terraform configurations that revealed details about their AWS infrastructure architecture. While the primary breach vector was a server misconfiguration, the exposed IaC files gave attackers a detailed map of Twitch's cloud environment — accelerating lateral movement.",
          "Agentic IaC review serves two purposes: it catches misconfigurations before deployment, and it ensures that IaC files themselves don't contain hardcoded credentials or internal network topology that would be valuable to attackers if the files were ever exposed.",
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
        "Integrate IaC review into CI: `terraform plan` → Claude analysis → PR comment",
        "Claude understands IaC semantics without explicit rule programming",
        "CIS AWS Foundations Benchmark v1.4 is the standard baseline for Terraform audits",
        "Critical findings should block PR merge via required status checks",
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
        "Evidence collection is the most time-consuming and tedious part of a traditional IT audit. Auditors manually export screenshots, download log files, capture configuration outputs, and organize them into evidence packages — a process that can take weeks for a large audit engagement.",
        "Agentic evidence collection automates this entire workflow. Claude orchestrates a systematic collection run: for each control in scope, it knows what evidence is required (policy document, configuration screenshot equivalent, log sample, approval record), calls the appropriate tools to retrieve it, validates the evidence against the control requirement, and organizes it into a structured evidence package.",
        "The output is an evidence package ready for auditor review — not a pile of raw exports, but organized artifacts mapped to specific controls with Claude's assessment of whether each piece of evidence satisfies the control requirement. Audit prep time drops from weeks to hours.",
      ],
      technical: {
        title: "Evidence Package Structure",
        body: [
          "A well-structured evidence package maps each piece of evidence to: the control it satisfies (COBIT objective, SOC 2 criterion, NIST CSF function), the collection timestamp, the collection method (API call, log export, config snapshot), and Claude's assessment (satisfied/partially satisfied/not satisfied).",
          "Evidence validation is where Claude adds unique value. Given a control requirement ('MFA must be enabled for all privileged accounts') and a piece of evidence (an IAM credential report), Claude can assess whether the evidence actually satisfies the control — not just whether the file exists.",
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
          "Post-breach analysis of Equifax's compliance posture revealed that evidence collection for patch management controls was incomplete — certificates existed showing patches were applied, but the evidence didn't verify that the Apache Struts vulnerability (CVE-2017-5638) was actually patched on the exposed systems.",
          "Automated evidence collection with Claude-powered validation would have flagged this gap: the evidence would have been collected from all systems in scope, Claude would have identified that the vulnerable Apache Struts version was still running on the web-facing servers, and the control would have been assessed as 'not satisfied' — triggering remediation before the breach.",
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
        "Evidence collection is 60% of audit time — automation cuts this to hours",
        "Map each evidence artifact to a specific control requirement",
        "Claude validates whether evidence actually satisfies the control — not just its presence",
        "Output: structured package with assessment (satisfied/partial/not satisfied) per control",
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
        "Single-agent audit tools handle individual controls or domains. Multi-agent audit pipelines coordinate multiple specialist agents — each expert in a specific domain — under an orchestrator agent that plans the audit, delegates tasks, synthesizes results, and produces the final report.",
        "The orchestrator pattern mirrors how human audit teams work: an engagement manager plans the audit, assigns workstreams to specialists (network security, IAM, application security, logging), receives completed workstreams, identifies cross-domain findings, and writes the final report. Claude agents can play all these roles simultaneously.",
        "Anthropic's agent SDK and the Claude API both support multi-agent patterns. The orchestrator uses tool calls to spawn subagents: `run_iam_audit_agent`, `run_network_audit_agent`, `run_secrets_audit_agent`. Each subagent runs its full pipeline and returns structured findings. The orchestrator synthesizes cross-domain findings that no single specialist would see.",
      ],
      technical: {
        title: "Orchestrator-Specialist Pattern",
        body: [
          "Orchestrator responsibilities: parse audit scope, create parallel workstreams, spawn specialist agents with appropriate tools and prompts, collect results, identify cross-domain findings (e.g., an IAM role that has network access to a system with a secrets exposure), produce the final integrated report.",
          "Specialist agent responsibilities: focused domain audit using domain-specific tools, return structured JSON findings with severity, evidence, and remediation. Specialists should not communicate with each other — all synthesis happens at the orchestrator level. This prevents cascading errors and makes the pipeline debuggable.",
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
          "The MOVEit breach exploited a SQL injection vulnerability (CVE-2023-34362) in MOVEit Transfer. Post-incident audits of affected organizations revealed that the vulnerability existed across network, application, and database layers — a cross-domain issue that single-domain audits would each have partially addressed but none would have fully caught.",
          "A multi-agent audit pipeline would have correlated: the network agent flagging MOVEit's internet exposure, the application agent flagging the unpatched SQL injection, and the IAM agent flagging the database permissions that allowed data extraction. The cross-domain synthesis would have produced a critical risk chain finding before exploitation.",
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
        "Orchestrator plans, delegates, and synthesizes — specialists execute domain audits",
        "Run specialist agents in parallel to match human audit team structure",
        "Cross-domain synthesis is where multi-agent pipelines find what single agents miss",
        "Specialists return structured JSON — never natural language — for reliable synthesis",
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
        "Audit report writing is where audit insights go to die. Auditors spend 30–40% of their time writing — translating technical findings into management-readable language, drafting remediation recommendations, formatting evidence packages, and producing executive summaries. This time is valuable to clients but low-value for auditors.",
        "Claude excels at audit report generation because it can translate structured JSON findings into professional audit language, calibrate the technical depth to the audience (executive summary vs technical appendix), generate specific remediation steps from general findings, and maintain consistent tone and formatting across hundreds of findings.",
        "The report generation agent takes the structured findings from the multi-agent audit pipeline, applies a report template (with sections for executive summary, scope, methodology, findings by severity, and remediation roadmap), and produces a draft report that auditors review and finalize rather than write from scratch.",
      ],
      technical: {
        title: "Report Generation Prompt Architecture",
        body: [
          "Report generation requires careful prompt engineering for consistent output. Use a system prompt that specifies: writing style (formal, third person), audience (CISO and board vs. sysadmin), severity language ('Critical — Immediate Action Required' vs just 'Critical'), and structure (findings must include: title, finding, risk, recommendation, management response field).",
          "For large finding sets, use Claude's extended context window to process all findings in a single call. For very large audits (500+ findings), chunk by domain and generate section drafts, then use a synthesis call to produce the executive summary from the section summaries.",
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
          "Post-incident analysis of the Dyn DDoS attack revealed that several IoT security assessments had previously identified the risk of unpatched IoT devices being weaponized for DDoS. However, audit reports were written in generic terms — 'improve IoT security posture' — rather than specific, actionable recommendations. The vague report language meant no remediation was prioritized.",
          "Claude-generated reports produce specific recommendations: 'Disable Telnet (port 23) on all IoT devices in the production environment using the network configuration change procedure in runbook RB-042. Deadline: 30 days. Owner: Network Operations.' Specific recommendations get implemented; vague ones get deprioritized.",
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
        "Vague recommendations ('improve security') don't get implemented — Claude writes specific ones",
        "Use system prompts to enforce report style, audience, and required finding sections",
        "Claude translates structured JSON findings to management-readable audit language",
        "Report generation reduces delivery time by 40% — auditors review and finalize, not write",
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
        "Traditional IT audits are point-in-time assessments — they capture the state of controls at the moment of the audit, which may be months or years old by the time remediation is verified. Continuous compliance monitoring uses scheduled agents that run the audit pipeline repeatedly — daily, weekly, or on every infrastructure change — providing real-time visibility into compliance posture.",
        "Scheduled Claude agents can run compliance checks as frequently as needed, alert on deviations from baseline immediately, and maintain a historical compliance posture dashboard. When a new S3 bucket is created with public access, the agent catches it within the next scheduled run — not at the next annual audit.",
        "Continuous monitoring integrates with incident response: when a CRITICAL finding is detected, the agent doesn't just log it — it opens a Jira ticket, pages the on-call engineer via PagerDuty, and posts a formatted finding to the security Slack channel. The audit finding becomes an operational alert.",
      ],
      technical: {
        title: "Scheduling and Alerting Architecture",
        body: [
          "Scheduling options: AWS EventBridge rules (cron expression → Lambda → Claude agent), GitHub Actions scheduled workflows (cron: '0 6 * * *'), or a dedicated orchestration platform (Temporal, Airflow). The agent code is identical to the point-in-time audit — only the trigger changes.",
          "Alerting integration: the agent returns structured JSON findings. A post-processing step maps severity to alert channels: CRITICAL → PagerDuty + Slack + Jira, HIGH → Slack + Jira, MEDIUM → Jira. Suppression rules prevent alert fatigue for known-accepted risks with compensating controls documented.",
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
          "The LastPass breach persisted from August to November 2022 — four months — partly because configuration drift in the development environment went undetected. The attacker compromised a developer's machine, then used that access to reach the production backup environment. Continuous monitoring of access patterns and environment configuration would have detected the anomalous access within hours.",
          "Continuous compliance agents monitor not just configurations but behavioral baselines: which IAM roles access which resources, what times of day, from which IP ranges. Deviations from the established baseline generate immediate alerts — turning a 4-month dwell time into a 4-hour response window.",
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
        "Annual audits find last year's problems — continuous monitoring finds today's",
        "Schedule Claude agents via EventBridge, GitHub Actions, or Temporal cron",
        "Map CRITICAL findings to immediate PagerDuty + Slack + Jira alerts",
        "Monitor behavioral baselines — not just static configurations",
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
        "The end-to-end agentic audit pipeline combines all components covered in this epoch: tool use for data collection, MCP servers for system integration, multi-agent orchestration for parallel workstreams, AI-powered analysis for IAM/secrets/IaC, automated evidence collection, report generation, and continuous monitoring for post-audit drift detection.",
        "A complete agentic audit engagement runs as follows: (1) Auditor defines scope (account IDs, regions, applicable standards), (2) Orchestrator agent plans workstreams and spawns specialists, (3) Specialists run in parallel — IAM, network, secrets, IaC, logging, (4) Orchestrator synthesizes cross-domain findings, (5) Report writer generates draft report, (6) Continuous sentinel is activated for ongoing monitoring, (7) Auditor reviews and finalizes in hours, not weeks.",
        "The agentic pipeline doesn't replace auditors — it eliminates the mechanical parts of auditing (data collection, formatting, basic pattern matching) so auditors can focus on judgment: assessing risk context, evaluating compensating controls, advising on remediation strategy, and communicating findings to stakeholders.",
      ],
      technical: {
        title: "Full Pipeline Component Stack",
        body: [
          "Layer 1 — Data collection: MCP servers (filesystem, git, GitHub, fetch) + custom AWS/GCP/Azure SDK tools. Layer 2 — Analysis: specialized Claude agents per domain with domain-specific prompts and tool sets. Layer 3 — Orchestration: orchestrator agent with multi-agent coordination and cross-domain synthesis. Layer 4 — Output: report generation agent + evidence package builder. Layer 5 — Operations: scheduled sentinel with alerting integration.",
          "The pipeline is implemented as a DAG (directed acyclic graph): inventory enumeration must complete before IAM analysis (which needs the role list), but IAM, network, secrets, and IaC analyses can run in parallel. The orchestrator manages this dependency graph, maximizing parallelism while respecting data dependencies.",
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
          "The MGM breach began with a social engineering call to the IT helpdesk — a technique that no technical audit tool catches. But the subsequent lateral movement, privilege escalation, and deployment of ALPHV ransomware all exploited gaps that would have appeared in a comprehensive agentic audit: overly permissive IAM roles, insufficient network segmentation between IT and OT systems, and inadequate monitoring of privileged account activity.",
          "MGM's environment was too large and complex for manual auditors to assess comprehensively. An agentic pipeline running weekly would have maintained a current inventory of every privileged role, every network connection between business units, and every anomalous authentication event — giving defenders the context needed to detect and respond faster.",
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
        "End-to-end pipeline: inventory → parallel domain analysis → synthesis → report → sentinel",
        "Run domain agents in parallel; use dependency graph for sequential requirements",
        "Agents eliminate mechanical audit work; auditors focus on judgment and communication",
        "Continuous sentinel activates post-audit to catch drift before the next engagement",
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
