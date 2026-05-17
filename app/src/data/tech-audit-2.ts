import type { StageConfig, EpochConfig } from "./types";

export const techAudit2Epoch: EpochConfig = {
  id: "tech-audit-2",
  name: "Tech Audit: Technical",
  subtitle: "API Security, Secrets & Cloud Guardrails",
  description: "Hands-on technical audit testing — enumerate and exploit API misconfigurations, hunt for exposed secrets, audit IAM policies, test cloud guardrails, scan IaC templates, and validate container security controls.",
  emoji: "🛠️",
  color: "violet",
  unlocked: true,
};

export const techAudit2Stages: StageConfig[] = [
  // ─── audit-t01: API Security ──────────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Stripe Engineering HQ", location: "San Francisco, California", era: "Present Day", emoji: "🔌" },
    id: "audit-t01",
    order: 1,
    title: "The Exposed API",
    subtitle: "OWASP API Top 10 — Broken Object Level Authorization",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-01", name: "API Auditor", emoji: "🔌" },
    challengeType: "ctf",
    info: {
      tagline: "An API that trusts the caller to tell it which objects to return is an API that will return every object.",
      year: 2023,
      overview: [
        "Broken Object Level Authorization (BOLA) — ranked #1 in the OWASP API Security Top 10 — occurs when an API endpoint uses a user-supplied identifier to retrieve objects without verifying the requesting user has permission to access that specific object. The attacker simply changes the ID in the request.",
        "API security audits differ from web application audits because APIs are often designed with the assumption that only authorized clients will call them. But APIs are discoverable, and the parameters they accept are predictable. A payment API that accepts /api/v1/payments/{payment_id} will return any payment if BOLA exists — not just the caller's payments.",
        "OWASP API Top 10 (2023) covers: BOLA, Broken Authentication, Broken Object Property Level Authorization, Unrestricted Resource Consumption, Broken Function Level Authorization, Unrestricted Access to Sensitive Business Flows, Server-Side Request Forgery, Security Misconfiguration, Improper Inventory Management, and Unsafe Consumption of APIs.",
      ],
      technical: {
        title: "Testing for BOLA in API Audits",
        body: [
          "Step 1: Authenticate as User A, perform a legitimate action (e.g., view your own payment). Capture the request, note the object ID in the URL or body. Step 2: Authenticate as User B. Replay the same request with User A's object ID. If the response returns User A's data, BOLA exists.",
          "Automated testing: Use tools like Burp Suite, OWASP ZAP, or Postman. For each API endpoint that accepts an object identifier, fuzz the identifier with sequential IDs, UUIDs from other test accounts, and negative/zero values. Monitor responses for unexpected data disclosure.",
        ],
        codeExample: {
          label: "BOLA test — accessing another user's payment via ID enumeration",
          code: `# Test 1: Legitimate request (your own payment)
curl -H "Authorization: Bearer USER_A_TOKEN" \\
  https://api.example.com/v1/payments/PAY-1001
# Response: {"payment_id": "PAY-1001", "user": "user_a", "amount": 150.00}

# Test 2: BOLA attempt — access User B's payment as User A
curl -H "Authorization: Bearer USER_A_TOKEN" \\
  https://api.example.com/v1/payments/PAY-1002
# BOLA exists if response returns:
# {"payment_id": "PAY-1002", "user": "user_b", "amount": 3500.00} ← VULNERABILITY

# Expected secure response:
# HTTP 403 Forbidden {"error": "Access denied"}`,
        },
      },
      incident: {
        title: "Peloton API BOLA — 3M User Records Exposed (2021)",
        when: "January 2021",
        where: "Peloton Interactive",
        impact: "3 million users' private profile data exposed; no authentication required for some endpoints",
        body: [
          "Security researcher Jan Masters discovered that Peloton's API allowed unauthenticated access to any user's profile data — including age, weight, location, workout history, and gender — simply by querying the user ID endpoint. The API had no authentication requirement for certain endpoints and no object-level authorization for others.",
          "Peloton initially disputed the finding but patched within 90 days after the researcher disclosed to media. The incident illustrated a common API audit gap: endpoints added during rapid feature development often skip the authorization review that established endpoints receive. API security audits must enumerate all endpoints, including undocumented ones.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker (User A)", sub: "legitimate auth token", type: "attacker" },
          { label: "API Endpoint", sub: "/payments/{id}", type: "system" },
          { label: "Authorization Check", sub: "missing or bypassed", type: "victim" },
          { label: "User B's Data", sub: "returned to User A", type: "result" },
        ],
      },
      timeline: [
        { year: 2019, event: "OWASP API Security Top 10 first published — BOLA listed as #1" },
        { year: 2021, event: "Peloton API — 3M users exposed via BOLA", highlight: true },
        { year: 2022, event: "Optus Australia — API BOLA exposes 9.8M customer records" },
        { year: 2023, event: "OWASP API Top 10 updated — BOLA remains #1" },
      ],
      keyTakeaways: [
        "BOLA is the #1 API vulnerability — always verify the caller owns the requested object",
        "Test by swapping object IDs between authenticated test accounts",
        "Unauthenticated API endpoints require explicit justification in every API audit",
        "Enumerate all endpoints including undocumented ones — use API gateway logs and OpenAPI specs",
      ],
      references: [
        { title: "OWASP API Security Top 10 — 2023", url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/" },
        { title: "OWASP API Security Testing Guide", url: "https://owasp.org/www-project-api-security/" },
      ],
    },
    ctf: {
      scenario: "You are auditing a fintech API. You have two test accounts. Probe the payment endpoint to confirm whether BOLA exists, then document the finding.",
      hint: "Use the test-api command to probe the payments endpoint with different IDs.",
      hints: [
        "Read the API docs: cat API-DOCS.txt",
        "Test your own payment: test-api GET /payments/PAY-1001 --token USER_A",
        "Test BOLA: test-api GET /payments/PAY-2099 --token USER_A",
        "Document: cat findings/BOLA-FINDING.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/API-DOCS.txt", value: "FLAG{B0L4_", label: "API Docs — Loaded" },
        { trigger: "test-api GET /payments/PAY-2099 --token USER_A", value: "4P1_0W4SP_", label: "BOLA — Confirmed via Cross-Account Access" },
        { trigger: "/findings/BOLA-FINDING.txt", value: "CR1T1C4L}", label: "Finding — Documented" },
      ],
      files: {
        "/API-DOCS.txt": [
          "FINTECH API — ENDPOINT REFERENCE",
          "==================================",
          "GET /payments/{payment_id}",
          "  Auth: Bearer token required",
          "  Returns: Payment details for the given payment_id",
          "  Expected: Returns only the authenticated user's own payments",
          "",
          "Test accounts:",
          "  USER_A token: Bearer eyJUSERA...",
          "  USER_B token: Bearer eyJUSERB...",
          "",
          "USER_A payments: PAY-1001, PAY-1002",
          "USER_B payments: PAY-2099, PAY-2100",
          "",
          "Test BOLA: Can USER_A retrieve USER_B's payment (PAY-2099)?",
        ].join("\n"),
        "/findings/BOLA-FINDING.txt": [
          "FINDING: BROKEN OBJECT LEVEL AUTHORIZATION (BOLA)",
          "===================================================",
          "Endpoint: GET /payments/{payment_id}",
          "Test: Authenticated as USER_A, requested PAY-2099 (belongs to USER_B)",
          "Result: API returned USER_B payment data — BOLA CONFIRMED",
          "",
          "Condition: API returns payment data for any payment_id without verifying ownership.",
          "Criteria: OWASP API Top 10 API1:2023 — authorization must be object-level.",
          "Cause: Server-side code uses payment_id directly without ownership check.",
          "Effect: Any authenticated user can access any other user's payment history.",
          "",
          "Rating: CRITICAL — financial data exposure",
          "Remediation: Add server-side ownership verification before returning object.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "API-DOCS.txt", isDir: false }, { name: "findings", isDir: true }],
        "/findings": [{ name: "BOLA-FINDING.txt", isDir: false }],
      },
      extraCommands: {
        "test-api": (args) => {
          const fullCmd = args.join(" ");
          if (fullCmd.includes("PAY-2099") && fullCmd.includes("USER_A")) {
            return {
              lines: [
                "GET /payments/PAY-2099 — Status: 200 OK",
                "",
                'Response: {"payment_id":"PAY-2099","user_id":"user_b","amount":3500.00,"card_last4":"4242","merchant":"Amazon"}',
                "",
                "⚠️  BOLA CONFIRMED: USER_A token returned USER_B payment data.",
                "Fragment collected. See findings/BOLA-FINDING.txt for full write-up.",
              ],
            };
          }
          if (fullCmd.includes("PAY-1001") && fullCmd.includes("USER_A")) {
            return {
              lines: [
                "GET /payments/PAY-1001 — Status: 200 OK",
                'Response: {"payment_id":"PAY-1001","user_id":"user_a","amount":150.00}',
                "Legitimate access — this is USER_A's own payment.",
              ],
            };
          }
          return { lines: [`Usage: test-api GET /payments/{id} --token USER_A|USER_B`] };
        },
      },
    },
  },

  // ─── audit-t02: Secrets Management ────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "HashiCorp Headquarters", location: "San Francisco, California", era: "Present Day", emoji: "🔑" },
    id: "audit-t02",
    order: 2,
    title: "Secrets in the Open",
    subtitle: "Secrets Management — Vault, Rotation, and Exposure Detection",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-02", name: "Secrets Hunter", emoji: "🔑" },
    challengeType: "ctf",
    info: {
      tagline: "A secret committed to git is no longer a secret. It is a public credential with a timestamp.",
      year: 2022,
      overview: [
        "Secrets management audits identify hardcoded credentials, API keys, and passwords in source code, configuration files, CI/CD pipelines, and container images. OWASP A07:2021 (Identification and Authentication Failures) and A02:2021 (Cryptographic Failures) both address secrets management. GitGuardian reports that secrets exposure in public repositories increased 67% in 2022.",
        "A mature secrets management program uses a centralized secrets store (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) with dynamic short-lived credentials, automatic rotation, and access logging. Secrets are injected at runtime — never stored in code, config files, or environment variables in plain text.",
        "Auditors test secrets management by: scanning repositories for hardcoded credentials (truffleHog, detect-secrets, Gitleaks), reviewing secrets store configuration (access policies, rotation schedules, audit logging), examining CI/CD pipelines for plaintext secrets in variables, and checking container images for embedded credentials.",
      ],
      technical: {
        title: "Secrets Scanning and Vault Configuration",
        body: [
          "Repository scanning: run Gitleaks or detect-secrets against the full git history — not just the current HEAD. A secret committed three years ago and later deleted is still in git history and still valid until rotated. Every developer who cloned the repo has a copy.",
          "Vault best practices: enable audit logging on all Vault operations, use dynamic secrets (Vault generates a short-lived credential for each request — no static password), enforce secret TTLs (max 24 hours for human access, max 1 hour for automated systems), and use AppRole or Kubernetes auth (not token auth with static tokens).",
        ],
        codeExample: {
          label: "Scanning git history for exposed secrets",
          code: `# Gitleaks — scan full git history
gitleaks detect --source . --log-opts="--all" --report-format json

# Output (finding):
{
  "Description": "AWS Access Key",
  "StartLine": 14,
  "EndLine": 14,
  "File": "config/database.yml",
  "Commit": "a3f1c2d",
  "Author": "jsmith",
  "Date": "2023-06-15",
  "Secret": "AKIA[REDACTED]"
}

# Even if the key was deleted in a later commit,
# it is in git history — run: aws iam get-access-key-last-used
# to verify if it was ever used after the exposure date`,
        },
      },
      incident: {
        title: "Uber GitHub Secrets Exposure (2022)",
        when: "September 2022",
        where: "San Francisco, California",
        impact: "Attacker accessed internal Slack, HackerOne tickets, internal dashboards; $148M prior breach settlement",
        body: [
          "The 2022 Uber breach began with social engineering a contractor, but the attacker's lateral movement depended on finding hardcoded admin credentials in a PowerShell script on an internal file share. Those credentials gave access to Thycotic (their PAM tool), which contained credentials for all other systems.",
          "The root cause was not the social engineering — it was the hardcoded credential in a script that had not been part of any secrets scanning program. Uber's secrets management program did not cover internal file shares and scripts, only code repositories. Auditors must expand secrets scanning scope to all locations where credentials might exist.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Exposed Secret", sub: "in code/config/CI", type: "attacker" },
          { label: "Git History", sub: "permanent record", type: "system" },
          { label: "Secrets Store", sub: "Vault / Secrets Manager", type: "victim" },
          { label: "Dynamic Rotation", sub: "short TTL + audit log", type: "result" },
        ],
      },
      timeline: [
        { year: 2020, event: "Samsung — source code with AWS keys pushed to public GitHub" },
        { year: 2022, event: "Uber breach — hardcoded admin credential in PowerShell script", highlight: true },
        { year: 2022, event: "GitGuardian report — 10M secrets exposed in public repos in 2022" },
        { year: 2023, event: "CircleCI breach — secrets extracted from CI/CD environment variables" },
      ],
      keyTakeaways: [
        "Scan full git history — secrets deleted from HEAD are still in history",
        "Dynamic secrets with short TTLs eliminate the value of a stolen credential",
        "Secrets scanning must cover: repos, CI/CD variables, container images, file shares, scripts",
        "Rotation must happen after any possible exposure — not just on schedule",
      ],
      references: [
        { title: "OWASP Secrets Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
        { title: "HashiCorp Vault — Secrets Management", url: "https://www.vaultproject.io/docs/what-is-vault" },
      ],
    },
    ctf: {
      scenario: "You are auditing a startup's repository for secrets exposure. Scan the repo directory and find the hardcoded credential, then verify the Vault configuration is correctly set up.",
      hint: "Scan the repo files for secrets patterns, then check the Vault config.",
      hints: [
        "List the repo: ls repo/",
        "Scan for secrets: scan-secrets repo/",
        "Read the config file with the secret: cat repo/config/database.yml",
        "Check Vault config: cat VAULT-CONFIG.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/repo/config/database.yml", value: "FLAG{S3CR3TS_", label: "Hardcoded Secret — Found in Config" },
        { trigger: "scan-secrets repo/", value: "3XP0S3D_G1T_", label: "Secrets Scan — Completed" },
        { trigger: "/VAULT-CONFIG.txt", value: "H1ST0RY}", label: "Vault Config — Reviewed" },
      ],
      files: {
        "/repo/config/database.yml": [
          "# Database configuration",
          "production:",
          "  host: db.internal.company.com",
          "  port: 5432",
          "  database: prod_db",
          "  username: prod_user",
          "  password: Sup3rS3cr3tPa$$w0rd2024!",
          "",
          "aws:",
          "  access_key_id: AKIAIOSFODNN7EXAMPLE",
          "  secret_access_key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          "  region: us-east-1",
          "",
          "# TODO: move these to environment variables (jsmith, 2023-01-15)",
        ].join("\n"),
        "/repo/src/app.py": [
          "# Application entry point",
          "import os",
          "from flask import Flask",
          "",
          "app = Flask(__name__)",
          "",
          "# Config loaded from environment",
          "app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')",
          "",
          "if __name__ == '__main__':",
          "    app.run()",
        ].join("\n"),
        "/VAULT-CONFIG.txt": [
          "HASHICORP VAULT CONFIGURATION REVIEW",
          "=====================================",
          "Vault address: https://vault.internal:8200",
          "Audit logging: DISABLED  ← FINDING",
          "Secret TTL: 87600h (10 years)  ← FINDING (should be max 24h)",
          "Auth method: Token (static)  ← FINDING (use AppRole or K8s auth)",
          "Dynamic secrets: NOT configured  ← FINDING",
          "",
          "Finding: Vault exists but is misconfigured.",
          "database.yml still uses hardcoded credentials instead of Vault.",
          "Vault audit logging is disabled — no record of who accessed what.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "repo", isDir: true }, { name: "VAULT-CONFIG.txt", isDir: false }],
        "/repo": [{ name: "config", isDir: true }, { name: "src", isDir: true }],
        "/repo/config": [{ name: "database.yml", isDir: false }],
        "/repo/src": [{ name: "app.py", isDir: false }],
      },
      extraCommands: {
        "scan-secrets": (args) => {
          if (args[0] && args[0].includes("repo")) {
            return {
              lines: [
                "Scanning repo/ for secrets...",
                "",
                "[CRITICAL] repo/config/database.yml:6 — Database password (plaintext)",
                "[CRITICAL] repo/config/database.yml:9 — AWS Access Key ID (AKIA...)",
                "[CRITICAL] repo/config/database.yml:10 — AWS Secret Access Key",
                "",
                "3 secrets found. Check git log for commit history:",
                "  git log --all -- repo/config/database.yml",
                "  Committed: 2023-01-15 by jsmith — in git history permanently.",
                "",
                "Fragment collected.",
              ],
            };
          }
          return { lines: ["Usage: scan-secrets <directory>"] };
        },
      },
    },
  },

  // ─── audit-t03: Cloud Guardrails ───────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "AWS re:Inforce Conference", location: "Boston, Massachusetts", era: "Present Day", emoji: "☁️" },
    id: "audit-t03",
    order: 3,
    title: "Guardrails in the Cloud",
    subtitle: "AWS SCPs, Config Rules, and CloudTrail Audit",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-03", name: "Cloud Auditor", emoji: "☁️" },
    challengeType: "ctf",
    info: {
      tagline: "A cloud account without guardrails is a credit card with no spending limit pointed at the internet.",
      year: 2019,
      overview: [
        "Cloud security audits verify that preventive controls (guardrails that block dangerous actions) and detective controls (alerts that identify policy violations) are properly configured. AWS provides three primary guardrail mechanisms: Service Control Policies (SCPs) at the Organization level, AWS Config Rules for continuous compliance monitoring, and CloudTrail for API activity logging.",
        "SCPs are the most powerful preventive control — they define what actions can be performed within an AWS account, regardless of what IAM policies grant. An SCP that denies S3 public access cannot be overridden by an IAM administrator within the account. SCPs are attached at the Organization, OU, or account level.",
        "AWS Config Rules continuously evaluate resources against defined policies and flag non-compliant resources. Managed rules cover common controls: S3 buckets must not be publicly accessible, EC2 instances must use approved AMIs, root account must not have active access keys, MFA must be enabled on all IAM users with console access.",
      ],
      technical: {
        title: "Key Cloud Guardrails to Audit",
        body: [
          "SCP audit checklist: (1) Deny public S3 bucket creation. (2) Deny disabling of CloudTrail. (3) Deny creation of IAM users without MFA. (4) Restrict to approved AWS regions. (5) Deny root account API calls. Check each SCP is attached at the correct OU level and that no exceptions exist for high-risk accounts.",
          "CloudTrail audit: verify CloudTrail is enabled in all regions (not just us-east-1), log file validation is enabled (hash chain prevents tampering), logs are sent to a separate security account (not the same account being audited), and CloudWatch alerts exist for: root account login, SCP policy changes, CloudTrail disabling, and IAM permission changes.",
        ],
        codeExample: {
          label: "Auditing CloudTrail configuration via AWS CLI",
          code: `# Check CloudTrail is enabled in all regions
aws cloudtrail get-trail-status --name management-trail

# Verify log file validation
aws cloudtrail describe-trails --query 'trailList[*].{Name:Name,LogValidation:LogFileValidationEnabled}'
# Expected: LogFileValidationEnabled: true for all trails

# Check for root account activity in the last 7 days
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=Username,AttributeValue=root \\
  --start-time 2026-05-08 \\
  --query 'Events[*].{Time:EventTime,Event:EventName}'

# List S3 buckets with public access
aws s3api list-buckets --query 'Buckets[*].Name' | xargs -I{} \\
  aws s3api get-bucket-acl --bucket {} --query 'Grants[?Grantee.URI==\`http://acs.amazonaws.com/groups/global/AllUsers\`]'`,
        },
      },
      incident: {
        title: "Capital One S3 Misconfiguration (2019)",
        when: "March–July 2019",
        where: "AWS US-East-1",
        impact: "106M customer records; $190M settlement; no AWS Config rule for SSRF-exploitable metadata access",
        body: [
          "Capital One's breach was enabled by a misconfigured WAF that allowed SSRF to reach the EC2 instance metadata service (169.254.169.254), which returned IAM role credentials with S3 read access. An AWS Config rule monitoring for SSRF-vulnerable WAF configurations did not exist. CloudTrail logged the 30+ million S3 API calls over 3 months — but no alert triggered.",
          "Two guardrail failures: (1) No Config rule detected the WAF misconfiguration. (2) CloudTrail alerts were not tuned to flag the volume of unusual S3 GetObject calls. A properly configured CloudWatch alert with a threshold of 1,000 S3 reads from a single role in one hour would have caught the exfiltration on day one.",
        ],
      },
      diagram: {
        nodes: [
          { label: "SCPs", sub: "preventive guardrails", type: "attacker" },
          { label: "AWS Config Rules", sub: "continuous compliance", type: "system" },
          { label: "CloudTrail", sub: "API activity log", type: "victim" },
          { label: "CloudWatch Alerts", sub: "anomaly detection", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "AWS Config Rules GA — continuous compliance monitoring available" },
        { year: 2019, event: "AWS SCPs fully launched for AWS Organizations" },
        { year: 2019, event: "Capital One — SSRF + S3 misconfiguration; no Config rule caught it", highlight: true },
        { year: 2023, event: "AWS Security Hub — aggregated compliance score across all Config rules" },
      ],
      keyTakeaways: [
        "SCPs override IAM — they are the highest-priority preventive control in AWS",
        "CloudTrail must be enabled in ALL regions with log file validation and cross-account storage",
        "AWS Config rules provide continuous compliance — not just point-in-time",
        "Volume-based CloudWatch alerts catch exfiltration that signature-based detection misses",
      ],
      references: [
        { title: "AWS Security Best Practices — Guardrails", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html" },
        { title: "CIS AWS Foundations Benchmark", url: "https://www.cisecurity.org/benchmark/amazon_web_services" },
      ],
    },
    ctf: {
      scenario: "You are auditing an AWS environment. Check the SCP configuration, CloudTrail status, and Config rule compliance. Find the three gaps.",
      hint: "Read each configuration file in the aws-audit/ directory.",
      hints: [
        "List: ls aws-audit/",
        "Check SCPs: cat aws-audit/SCP-REVIEW.txt",
        "Check CloudTrail: cat aws-audit/CLOUDTRAIL-STATUS.txt",
        "Check Config Rules: cat aws-audit/CONFIG-RULES.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/aws-audit/SCP-REVIEW.txt", value: "FLAG{4WS_SCPs_", label: "SCP Review — Gaps Found" },
        { trigger: "/aws-audit/CLOUDTRAIL-STATUS.txt", value: "CL0UDT4R41L_", label: "CloudTrail — Status Reviewed" },
        { trigger: "/aws-audit/CONFIG-RULES.txt", value: "C0NF1G_G4PS}", label: "Config Rules — Gaps Confirmed" },
      ],
      files: {
        "/aws-audit/SCP-REVIEW.txt": [
          "SCP CONFIGURATION REVIEW",
          "=========================",
          "Deny public S3 buckets:        PRESENT",
          "Deny CloudTrail disable:        MISSING  ← FINDING",
          "Deny root API calls:            PRESENT",
          "Restrict to approved regions:   PRESENT",
          "Deny IAM user creation w/o MFA: MISSING  ← FINDING",
          "",
          "2 SCPs missing. Attackers who compromise an account admin",
          "can disable CloudTrail and create IAM users without MFA.",
        ].join("\n"),
        "/aws-audit/CLOUDTRAIL-STATUS.txt": [
          "CLOUDTRAIL STATUS REVIEW",
          "=========================",
          "Trail name: management-trail",
          "Enabled: YES",
          "Multi-region: YES",
          "Log file validation: DISABLED  ← FINDING",
          "Log destination: Same account (account-logs-bucket)  ← FINDING",
          "CloudWatch integration: YES",
          "Root account alerts: CONFIGURED",
          "",
          "Logs stored in same account — a compromised admin could delete logs.",
          "Log validation disabled — logs could be tampered without detection.",
        ].join("\n"),
        "/aws-audit/CONFIG-RULES.txt": [
          "AWS CONFIG RULE COMPLIANCE",
          "===========================",
          "s3-bucket-public-read-prohibited:        COMPLIANT",
          "iam-root-access-key-check:               COMPLIANT",
          "iam-user-mfa-enabled:                    NON-COMPLIANT (3 IAM users without MFA)",
          "ec2-imdsv2-check:                        NON-COMPLIANT (12 instances on IMDSv1)",
          "cloudtrail-log-file-validation-enabled:  NON-COMPLIANT",
          "",
          "IMDSv1 on 12 EC2 instances — SSRF to metadata service is trivial.",
          "Same vulnerability class as Capital One breach (2019).",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "aws-audit", isDir: true }],
        "/aws-audit": [
          { name: "SCP-REVIEW.txt", isDir: false },
          { name: "CLOUDTRAIL-STATUS.txt", isDir: false },
          { name: "CONFIG-RULES.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-t04: IAM Privilege Analysis ────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Okta Headquarters", location: "San Francisco, California", era: "Present Day", emoji: "🪪" },
    id: "audit-t04",
    order: 4,
    title: "Who Can Do What",
    subtitle: "IAM Privilege Analysis — Least Privilege and Policy Review",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-04", name: "IAM Auditor", emoji: "🪪" },
    challengeType: "ctf",
    info: {
      tagline: "AdministratorAccess attached to a developer account is not a privilege — it is an attack surface.",
      year: 2021,
      overview: [
        "IAM privilege analysis identifies accounts, roles, and service accounts with excessive permissions. In AWS, the most common violations are: developer accounts with AdministratorAccess, service roles with wildcard (*) resource permissions, IAM users instead of IAM roles for applications, and access keys with no expiration date.",
        "The principle of least privilege requires every principal (user, role, service account) to have only the permissions required to perform its function. AWS IAM Access Analyzer and third-party tools (PMapper, Cloudsplaining) can automatically identify overly permissive policies and privilege escalation paths.",
        "Privilege escalation in IAM occurs when a user with limited permissions can perform a sequence of API calls to grant themselves additional permissions. Example: iam:CreatePolicyVersion alone allows creating a new policy version that grants AdministratorAccess, then attaching it to oneself. Auditors must check for these indirect paths, not just direct permissions.",
      ],
      technical: {
        title: "IAM Audit Techniques",
        body: [
          "Generate an IAM credential report: aws iam generate-credential-report && aws iam get-credential-report. This shows every IAM user with: password last used, access key last used, MFA enabled, and access key age. Flag: root account with active access key, access keys older than 90 days, users with password never used after 30 days.",
          "Policy analysis: use Cloudsplaining to analyze all attached policies. Flag: Action: * (wildcard), Resource: * with sensitive actions (iam:*, s3:*, ec2:*), pass-role permissions (iam:PassRole + any service = privilege escalation), and policies not attached to any principal (policy sprawl).",
        ],
        codeExample: {
          label: "Identifying IAM privilege escalation paths with PMapper",
          code: `# Generate IAM graph and find privilege escalation paths
python3 -m principalmapper graph create --account 123456789012

# Find all paths to AdministratorAccess
python3 -m principalmapper query \\
  "who can do iam:* with arn:aws:iam::123456789012:user/dev_user"

# Output:
# dev_user can do iam:CreatePolicyVersion (HIGH RISK)
# Path: dev_user --[iam:CreatePolicyVersion]--> AdminPolicy --[attach]--> dev_user
# This is a privilege escalation path to AdministratorAccess

# Check access keys older than 90 days
aws iam list-users --query 'Users[*].UserName' | xargs -I{} \\
  aws iam list-access-keys --user-name {} \\
  --query 'AccessKeyMetadata[?Status==\`Active\`].[UserName,CreateDate]'`,
        },
      },
      incident: {
        title: "Okta Breach via Lateral Movement (2022)",
        when: "January 2022",
        where: "Okta / Sitel (third-party support)",
        impact: "366 customer Okta tenants potentially accessed; 2.5% of Okta customers affected",
        body: [
          "The 2022 Okta breach occurred when attackers compromised a Sitel support engineer's workstation. The support engineer's account had access to Okta's support tool with permissions to view customer tenants. The IAM review failure: the support account had broader permissions than needed for support tasks, and those permissions were not reviewed after a vendor transition.",
          "The breach highlighted a core IAM audit principle: third-party vendor accounts require the same least-privilege analysis as internal accounts. Vendor support tools often have elevated permissions granted for 'convenience' and never reviewed. An IAM audit would have flagged the support account's overly broad permissions.",
        ],
      },
      diagram: {
        nodes: [
          { label: "IAM Principal", sub: "user / role / service", type: "attacker" },
          { label: "Attached Policies", sub: "what actions are allowed", type: "system" },
          { label: "Resource Scope", sub: "specific vs wildcard", type: "victim" },
          { label: "Privilege Escalation Paths", sub: "indirect admin access", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "AWS IAM Access Analyzer launched — automated policy analysis" },
        { year: 2020, event: "Cloudsplaining released — open-source IAM policy analysis tool" },
        { year: 2021, event: "SolarWinds — Orion service account with broad IAM permissions" },
        { year: 2022, event: "Okta breach — overly permissive vendor support account", highlight: true },
      ],
      keyTakeaways: [
        "AdministratorAccess on individual IAM users is almost never justified — use roles",
        "Access keys older than 90 days are a finding — automate rotation",
        "Privilege escalation paths exist beyond direct permissions — use PMapper or similar",
        "Vendor and service accounts need the same least-privilege review as human accounts",
      ],
      references: [
        { title: "AWS IAM Best Practices", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" },
        { title: "Cloudsplaining — IAM Least Privilege Analysis", url: "https://github.com/salesforce/cloudsplaining" },
      ],
    },
    ctf: {
      scenario: "You are reviewing IAM policies for a cloud environment. Find the developer account with excessive permissions and the service role with a privilege escalation path.",
      hint: "Read the IAM policy files and identify the violations.",
      hints: [
        "List: ls iam-policies/",
        "Review developer policy: cat iam-policies/dev-user-policy.json",
        "Review service role: cat iam-policies/app-service-role.json",
        "View finding: cat findings/IAM-VIOLATIONS.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/iam-policies/dev-user-policy.json", value: "FLAG{14M_", label: "Dev Policy — Excessive Permissions Found" },
        { trigger: "/iam-policies/app-service-role.json", value: "PR1V3SC_W1LDC4RD_", label: "Service Role — Privilege Escalation Path" },
        { trigger: "/findings/IAM-VIOLATIONS.txt", value: "FOUND}", label: "IAM Violations — Documented" },
      ],
      files: {
        "/iam-policies/dev-user-policy.json": [
          '{"Version":"2012-10-17","Statement":[',
          '  {"Effect":"Allow","Action":"*","Resource":"*",',
          '   "Description":"AdministratorAccess — attached to jsmith (developer)"},',
          '  {"Effect":"Allow","Action":["iam:CreatePolicyVersion","iam:AttachUserPolicy"],',
          '   "Resource":"*"}',
          ']}',
          "",
          "// FINDING: Developer jsmith has AdministratorAccess (Action:*)",
          "// FINDING: iam:CreatePolicyVersion allows privilege escalation",
        ].join("\n"),
        "/iam-policies/app-service-role.json": [
          '{"Version":"2012-10-17","Statement":[',
          '  {"Effect":"Allow","Action":"s3:*","Resource":"*"},',
          '  {"Effect":"Allow","Action":"iam:PassRole","Resource":"*"},',
          '  {"Effect":"Allow","Action":"ec2:RunInstances","Resource":"*"}',
          ']}',
          "",
          "// FINDING: s3:* with Resource:* — reads ALL buckets in account",
          "// FINDING: iam:PassRole + ec2:RunInstances = privilege escalation",
          "//          Can launch EC2 with any role, including admin roles",
        ].join("\n"),
        "/findings/IAM-VIOLATIONS.txt": [
          "IAM AUDIT VIOLATIONS",
          "=====================",
          "VIOLATION-01: jsmith (developer) has AdministratorAccess — CRITICAL",
          "  Action: * Resource: * — no restrictions whatsoever",
          "  Remediation: Replace with developer-specific policy (CodeCommit, ECR, Lambda)",
          "",
          "VIOLATION-02: app-service-role has iam:PassRole + ec2:RunInstances — HIGH",
          "  Privilege escalation: role can launch EC2 with an admin role attached",
          "  Remediation: Restrict PassRole to specific non-privileged role ARNs",
          "",
          "VIOLATION-03: app-service-role has s3:* Resource:* — HIGH",
          "  Can read, write, delete ANY S3 bucket in the account",
          "  Remediation: Restrict to specific application bucket ARN",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "iam-policies", isDir: true }, { name: "findings", isDir: true }],
        "/iam-policies": [
          { name: "dev-user-policy.json", isDir: false },
          { name: "app-service-role.json", isDir: false },
        ],
        "/findings": [{ name: "IAM-VIOLATIONS.txt", isDir: false }],
      },
    },
  },

  // ─── audit-t05: Container Security ────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Docker Engineering", location: "San Francisco, California", era: "Present Day", emoji: "🐳" },
    id: "audit-t05",
    order: 5,
    title: "The Container Escape",
    subtitle: "Container Security — Image Scanning and Runtime Controls",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-05", name: "Container Auditor", emoji: "🐳" },
    challengeType: "ctf",
    info: {
      tagline: "A container running as root with a mounted host socket is a container that has already escaped.",
      year: 2019,
      overview: [
        "Container security audits cover the full container lifecycle: image build (base image CVEs, secrets in layers), image registry (access controls, signing), runtime configuration (privilege escalation, resource limits, read-only filesystems), and orchestrator security (Kubernetes RBAC, network policies, pod security standards).",
        "The three most critical container security findings are: running containers as root (privilege escalation risk), mounting the Docker socket (/var/run/docker.sock) inside a container (full host compromise), and using base images with known critical CVEs. CIS Docker Benchmark provides 100+ specific controls to test.",
        "Kubernetes adds orchestration-layer controls: Pod Security Standards (Restricted, Baseline, Privileged), Network Policies (egress/ingress control between pods), RBAC (who can exec into pods, who can view secrets), and Secrets encryption at rest (etcd encryption).",
      ],
      technical: {
        title: "Container Security Scanning",
        body: [
          "Image scanning: use Trivy, Grype, or Snyk Container to scan images for CVEs before they reach production. A CI/CD gate that blocks images with CRITICAL CVEs prevents vulnerable code from ever running. Scan both the application layer and the base OS layer — vulnerabilities in the OS layer are often overlooked.",
          "Runtime security: check docker-compose.yml and Kubernetes manifests for: user: root or no user specified, privileged: true, hostPID or hostNetwork: true, volumes mounting host paths (especially /var/run/docker.sock), and no resource limits (memory/CPU). These are all automatic findings in a container security audit.",
        ],
        codeExample: {
          label: "Container image scan and manifest review",
          code: `# Scan container image for CVEs
trivy image --severity CRITICAL,HIGH company/app:latest

# Output (example):
# Total: 3 (HIGH: 2, CRITICAL: 1)
# ┌────────────────┬───────────────┬──────────┬─────────────────────────────┐
# │ Library        │ Vulnerability │ Severity │ Installed → Fixed Version   │
# ├────────────────┼───────────────┼──────────┼─────────────────────────────┤
# │ openssl        │ CVE-2023-0465 │ CRITICAL │ 3.0.1 → 3.0.9              │
# └────────────────┴───────────────┴──────────┴─────────────────────────────┘

# Check Kubernetes pod spec for security issues
kubectl get pod app-pod -o yaml | grep -E "privileged|runAsRoot|hostPath|docker.sock"`,
        },
      },
      incident: {
        title: "Tesla Kubernetes Cryptojacking (2018)",
        when: "February 2018",
        where: "Tesla AWS Kubernetes cluster",
        impact: "Kubernetes dashboard exposed without auth; credentials extracted; AWS resources used for cryptomining",
        body: [
          "Attackers discovered Tesla's Kubernetes dashboard was exposed to the internet without authentication. From the dashboard, they found AWS credentials stored in a Kubernetes secret (unencrypted). Using those credentials, they launched EC2 instances for cryptomining, throttled to avoid detection in billing alerts.",
          "The container security failures: (1) Kubernetes dashboard exposed publicly. (2) Secrets stored unencrypted in etcd. (3) No network policy preventing external access to the dashboard. (4) No resource quotas that would have flagged anomalous EC2 launches. This case drives CIS Kubernetes Benchmark adoption in container security audits.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Image CVE Scan", sub: "before registry push", type: "attacker" },
          { label: "Runtime Config", sub: "no root, no host mounts", type: "system" },
          { label: "Kubernetes RBAC", sub: "pod exec, secret access", type: "victim" },
          { label: "Network Policies", sub: "egress/ingress control", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "CIS Docker Benchmark v1.0 published" },
        { year: 2018, event: "Tesla Kubernetes cryptojacking — exposed dashboard + unencrypted secrets", highlight: true },
        { year: 2019, event: "Kubernetes Pod Security Policies deprecated; replaced with PSA" },
        { year: 2022, event: "Kubernetes Pod Security Admission (PSA) stable — Restricted/Baseline/Privileged" },
      ],
      keyTakeaways: [
        "Never run containers as root — specify a non-root user in the Dockerfile USER directive",
        "Mounting /var/run/docker.sock inside a container = full host takeover",
        "Scan container images for CVEs in CI/CD before pushing to registry",
        "Kubernetes etcd must have encryption at rest — secrets are base64 (not encrypted) by default",
      ],
      references: [
        { title: "CIS Docker Benchmark", url: "https://www.cisecurity.org/benchmark/docker" },
        { title: "CIS Kubernetes Benchmark", url: "https://www.cisecurity.org/benchmark/kubernetes" },
      ],
    },
    ctf: {
      scenario: "You are auditing a Kubernetes deployment. Review the container manifest and image scan results to identify critical security violations.",
      hint: "Read the deployment manifest and the image scan output.",
      hints: [
        "Read deployment: cat k8s/deployment.yaml",
        "Read scan results: cat k8s/IMAGE-SCAN.txt",
        "View finding: cat findings/CONTAINER-VIOLATIONS.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/k8s/deployment.yaml", value: "FLAG{C0NT41N3R_", label: "Deployment — Root User and Socket Mount Found" },
        { trigger: "/k8s/IMAGE-SCAN.txt", value: "R00T_S0CK3T_CVE_", label: "Image Scan — Critical CVE Confirmed" },
        { trigger: "/findings/CONTAINER-VIOLATIONS.txt", value: "CR1T}", label: "Container Violations — Documented" },
      ],
      files: {
        "/k8s/deployment.yaml": [
          "apiVersion: apps/v1",
          "kind: Deployment",
          "metadata:",
          "  name: app-deployment",
          "spec:",
          "  template:",
          "    spec:",
          "      containers:",
          "      - name: app",
          "        image: company/app:1.2.3",
          "        securityContext:",
          "          runAsUser: 0        # FINDING: running as root",
          "          privileged: true    # FINDING: privileged mode",
          "        volumeMounts:",
          "        - mountPath: /var/run/docker.sock",
          "          name: docker-sock   # FINDING: host socket mounted",
          "      volumes:",
          "      - name: docker-sock",
          "        hostPath:",
          "          path: /var/run/docker.sock",
        ].join("\n"),
        "/k8s/IMAGE-SCAN.txt": [
          "TRIVY IMAGE SCAN — company/app:1.2.3",
          "======================================",
          "Total: 4 (CRITICAL: 2, HIGH: 2)",
          "",
          "CVE-2023-0465  openssl  CRITICAL  3.0.1 → 3.0.9  (TLS cert verification bypass)",
          "CVE-2023-28531 openssh  CRITICAL  9.1p1 → 9.3p1  (pre-auth RCE)",
          "CVE-2023-0286  openssl  HIGH      3.0.1 → 3.0.8  (GeneralizedTime parsing)",
          "CVE-2022-4304  openssl  HIGH      3.0.1 → 3.0.8  (timing side-channel)",
          "",
          "Recommendation: Rebuild image with updated base OS before deploying.",
        ].join("\n"),
        "/findings/CONTAINER-VIOLATIONS.txt": [
          "CONTAINER SECURITY AUDIT FINDINGS",
          "===================================",
          "CRITICAL-01: Container running as root (runAsUser: 0)",
          "  Risk: Process escape = root on host node",
          "",
          "CRITICAL-02: privileged: true",
          "  Risk: Full host kernel capabilities — equivalent to host root",
          "",
          "CRITICAL-03: Docker socket mounted (/var/run/docker.sock)",
          "  Risk: Container escape to host — can manage ALL containers on host",
          "",
          "CRITICAL-04: openssl CVE-2023-0465 (CVSS 9.8) in deployed image",
          "  Risk: TLS certificate bypass — MITM attacks possible",
          "",
          "All four findings are CRITICAL. Deployment must be halted.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "k8s", isDir: true }, { name: "findings", isDir: true }],
        "/k8s": [{ name: "deployment.yaml", isDir: false }, { name: "IMAGE-SCAN.txt", isDir: false }],
        "/findings": [{ name: "CONTAINER-VIOLATIONS.txt", isDir: false }],
      },
    },
  },

  // ─── audit-t06: IaC Security ───────────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "HashiCorp Terraform Cloud", location: "San Francisco, California", era: "Present Day", emoji: "📐" },
    id: "audit-t06",
    order: 6,
    title: "Infrastructure as Code, Insecurity as Default",
    subtitle: "IaC Security Scanning — Terraform, tfsec, and Checkov",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-06", name: "IaC Auditor", emoji: "📐" },
    challengeType: "ctf",
    info: {
      tagline: "IaC makes misconfiguration reproducible at scale. One bad Terraform module can misconfigure every environment.",
      year: 2021,
      overview: [
        "Infrastructure as Code (IaC) security scanning applies static analysis to Terraform, CloudFormation, Ansible, and Pulumi templates before they are deployed. The principle: find security misconfigurations in the code review stage, not after deployment. Tools include tfsec, Checkov, KICS, and Terrascan.",
        "Common IaC security findings: S3 buckets without encryption or public access blocking, security groups with 0.0.0.0/0 (open to the world) on sensitive ports, RDS instances without deletion protection or encryption, IAM policies with wildcard actions, Lambda functions with excessive IAM permissions, and CloudTrail without log file validation.",
        "IaC scanning integrates into CI/CD pipelines as a gate: pull requests that introduce security violations fail the build. This shifts security left — misconfigurations are caught before they become deployed vulnerabilities. The cost of fixing a misconfiguration in a PR is minutes; the cost after a breach is millions.",
      ],
      technical: {
        title: "Running tfsec and Checkov",
        body: [
          "tfsec: tfsec ./terraform/ --minimum-severity HIGH — scans all .tf files recursively and reports findings with severity, description, and the specific Terraform block causing the issue. Outputs SARIF format for GitHub Advanced Security integration.",
          "Checkov: checkov -d ./terraform/ --framework terraform --output junitxml — scans and outputs JUnit XML for CI/CD integration. Checkov covers 1,000+ checks across AWS, Azure, GCP, Kubernetes, and Dockerfile. The --check CKV_AWS_18 flag tests specific checks for targeted scanning.",
        ],
        codeExample: {
          label: "tfsec output — identifying open security groups and unencrypted S3",
          code: `$ tfsec ./terraform/ --minimum-severity HIGH

Result 1 [HIGH] - aws/ec2/main.tf:12
  aws_security_group.web ingress rule allows 0.0.0.0/0 on port 22 (SSH)
  See https://tfsec.dev/docs/aws/ec2/no-public-ingress-sgr

Result 2 [CRITICAL] - aws/s3/main.tf:5
  aws_s3_bucket.data has no server-side encryption configured
  See https://tfsec.dev/docs/aws/s3/enable-bucket-encryption

Result 3 [HIGH] - aws/rds/main.tf:18
  aws_db_instance.prod has deletion_protection = false
  See https://tfsec.dev/docs/aws/rds/enable-deletion-protection

Passed: 47  Failed: 3 (CRITICAL: 1, HIGH: 2)`,
        },
      },
      incident: {
        title: "Toyota Connected Services Data Exposure (2023)",
        when: "May 2023",
        where: "Toyota Connected Corporation, Japan",
        impact: "2.15M customers' location data and vehicle IDs exposed for 10 years via misconfigured cloud storage",
        body: [
          "Toyota Connected discovered that a cloud environment, configured in 2013, had incorrectly set a storage bucket to public access. Vehicle location data for 2.15 million customers was publicly accessible for approximately 10 years. The configuration had never been audited against modern security baselines.",
          "An IaC security scan or AWS Config rule for public S3 bucket access would have caught this immediately. The finding illustrates why 'legacy' cloud configurations that predate IaC practices need to be imported into IaC management and subjected to the same scanning as new deployments. Drift detection tools (Terraform Cloud, AWS Config) can identify resources not managed by IaC.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Terraform / CloudFormation", sub: "IaC template", type: "attacker" },
          { label: "tfsec / Checkov", sub: "static analysis scan", type: "system" },
          { label: "CI/CD Gate", sub: "fail on CRITICAL/HIGH", type: "victim" },
          { label: "Secure Deployment", sub: "no known misconfigs", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "tfsec initial release — Terraform static security analysis" },
        { year: 2019, event: "Checkov released by Bridgecrew — multi-IaC security scanner" },
        { year: 2021, event: "GitHub Advanced Security — SARIF format for IaC scan results in PRs" },
        { year: 2023, event: "Toyota — 10-year public S3 exposure via misconfigured cloud storage", highlight: true },
      ],
      keyTakeaways: [
        "IaC scanning in CI/CD catches misconfigurations before deployment — shift left",
        "Security groups with 0.0.0.0/0 on port 22/3389 are automatic CRITICAL findings",
        "S3 encryption and public access blocking should be enforced at the account level via SCP",
        "Legacy cloud resources not in IaC must be imported and scanned — drift detection",
      ],
      references: [
        { title: "tfsec — Terraform Security Scanner", url: "https://github.com/aquasecurity/tfsec" },
        { title: "Checkov — Infrastructure as Code Security", url: "https://www.checkov.io/" },
      ],
    },
    ctf: {
      scenario: "A Terraform pull request has been submitted. Run the IaC scan and identify the critical misconfigurations before the infrastructure is deployed.",
      hint: "Read the Terraform files and the scan results.",
      hints: [
        "List: ls terraform/",
        "Read main.tf: cat terraform/main.tf",
        "Check scan results: cat SCAN-RESULTS.txt",
        "View finding: cat findings/IAC-FINDINGS.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/terraform/main.tf", value: "FLAG{14C_SC4N_", label: "Terraform — Misconfigurations Found" },
        { trigger: "/SCAN-RESULTS.txt", value: "S3_0P3N_SG_", label: "Scan Results — Critical Confirmed" },
        { trigger: "/findings/IAC-FINDINGS.txt", value: "CR1T1C4L}", label: "IaC Findings — Documented" },
      ],
      files: {
        "/terraform/main.tf": [
          'resource "aws_s3_bucket" "data" {',
          '  bucket = "company-production-data"',
          "  # No encryption configured",
          "  # No public access block",
          "}",
          "",
          'resource "aws_security_group" "web" {',
          "  ingress {",
          "    from_port   = 22",
          "    to_port     = 22",
          "    protocol    = \"tcp\"",
          '    cidr_blocks = ["0.0.0.0/0"]  # SSH open to world',
          "  }",
          "  ingress {",
          "    from_port   = 3389",
          "    to_port     = 3389",
          "    protocol    = \"tcp\"",
          '    cidr_blocks = ["0.0.0.0/0"]  # RDP open to world',
          "  }",
          "}",
          "",
          'resource "aws_db_instance" "prod" {',
          '  identifier         = "prod-db"',
          "  deletion_protection = false",
          "  storage_encrypted   = false",
          "}",
        ].join("\n"),
        "/SCAN-RESULTS.txt": [
          "tfsec SCAN RESULTS",
          "===================",
          "[CRITICAL] terraform/main.tf:1 — S3 bucket has no server-side encryption",
          "[CRITICAL] terraform/main.tf:1 — S3 bucket has no public access block",
          "[HIGH]     terraform/main.tf:8 — Security group allows SSH (22) from 0.0.0.0/0",
          "[HIGH]     terraform/main.tf:14 — Security group allows RDP (3389) from 0.0.0.0/0",
          "[HIGH]     terraform/main.tf:20 — RDS instance has deletion_protection = false",
          "[HIGH]     terraform/main.tf:21 — RDS instance storage not encrypted",
          "",
          "CRITICAL: 2  HIGH: 4  MEDIUM: 0",
          "CI/CD gate: FAIL — pull request blocked",
        ].join("\n"),
        "/findings/IAC-FINDINGS.txt": [
          "IaC SECURITY AUDIT FINDINGS",
          "============================",
          "All findings must be remediated before deployment.",
          "",
          "1. S3 encryption missing — add aws_s3_bucket_server_side_encryption_configuration",
          "2. S3 public access not blocked — add aws_s3_bucket_public_access_block",
          "3. SSH/RDP open to 0.0.0.0/0 — restrict to VPN CIDR or bastion host only",
          "4. RDS unencrypted + no deletion protection — add storage_encrypted=true, deletion_protection=true",
          "",
          "Estimated remediation: 2 hours. PR must not merge until all CRITICAL/HIGH resolved.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "terraform", isDir: true }, { name: "SCAN-RESULTS.txt", isDir: false }, { name: "findings", isDir: true }],
        "/terraform": [{ name: "main.tf", isDir: false }],
        "/findings": [{ name: "IAC-FINDINGS.txt", isDir: false }],
      },
    },
  },

  // ─── audit-t07: SAST/DAST ──────────────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Snyk Headquarters", location: "London, United Kingdom", era: "Present Day", emoji: "🔎" },
    id: "audit-t07",
    order: 7,
    title: "Static and Dynamic Analysis",
    subtitle: "SAST, DAST, and SCA in the Security Testing Toolchain",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-07", name: "AppSec Tester", emoji: "🔎" },
    challengeType: "ctf",
    info: {
      tagline: "SAST finds the hole before it is drilled. DAST confirms the hole is real.",
      year: 2021,
      overview: [
        "Application security testing uses three complementary approaches: Static Application Security Testing (SAST) analyzes source code without executing it — finding SQL injection, XSS, command injection, and hardcoded secrets before build. Dynamic Application Security Testing (DAST) attacks the running application — confirming vulnerabilities are exploitable. Software Composition Analysis (SCA) identifies known CVEs in open-source dependencies.",
        "In a mature AppSec program, all three run in CI/CD: SAST and SCA on every commit (fast, developer-facing feedback), DAST on every deployment to staging (slower, comprehensive). Security auditors verify that these tools are configured, that findings are triaged (not suppressed without justification), and that critical findings block releases.",
        "SAST tools include: Semgrep, Checkmarx, Veracode, SonarQube, and CodeQL. DAST tools include: OWASP ZAP, Burp Suite Enterprise, and StackHawk. SCA tools include: Snyk, Dependabot, OWASP Dependency-Check, and Black Duck.",
      ],
      technical: {
        title: "Reading SAST and DAST Output",
        body: [
          "SAST false positives are common — a SQL query parameterized correctly may still be flagged if the SAST tool does not understand the ORM. Auditors verify that false positive suppressions have documented justifications signed by a security engineer, not just the developer who wrote the code.",
          "DAST requires a running application and valid test credentials. Auditors verify: DAST runs against a staging environment (not production), test credentials are not shared with developers (prevents tuning the app to avoid DAST), and DAST results from the most recent run are compared to the previous run to detect regressions.",
        ],
        codeExample: {
          label: "Semgrep SAST scan — detecting SQL injection",
          code: `$ semgrep --config=p/owasp-top-ten src/

# FINDING: SQL Injection
# src/api/users.py:45
#   query = "SELECT * FROM users WHERE id = " + user_id
#   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# Rule: python.lang.security.audit.sqli.raw-query-formatting
# Severity: ERROR
# Message: User-supplied data directly concatenated into SQL query.
#          Use parameterized queries: cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# SCA: Snyk dependency scan
$ snyk test
# Tested 127 dependencies
# Found 2 critical vulnerabilities:
#   ✗ CVE-2023-28154 in webpack@5.75.0 (Prototype Pollution)
#   ✗ CVE-2023-26115 in word-wrap@1.2.3 (ReDoS)`,
        },
      },
      incident: {
        title: "Equifax Apache Struts Dependency Vulnerability (2017)",
        when: "March–July 2017",
        where: "Atlanta, Georgia",
        impact: "147M records; $575M FTC settlement; exploited via known CVE in unpatched dependency",
        body: [
          "The Equifax breach exploited CVE-2017-5638, a critical vulnerability in Apache Struts 2 announced on March 7, 2017. Equifax was aware of the patch but had not applied it to all systems. An SCA tool integrated into CI/CD would have flagged the vulnerable Struts version on every build. A DAST scan against the public-facing application would have confirmed exploitability.",
          "The two-month gap between patch release and exploitation demonstrates the value of SCA in CI/CD: when a new CVE is published, every organization running affected software immediately knows which applications are vulnerable. Without SCA, they may not know for months — if ever.",
        ],
      },
      diagram: {
        nodes: [
          { label: "SAST", sub: "source code analysis", type: "attacker" },
          { label: "SCA", sub: "dependency CVEs", type: "system" },
          { label: "DAST", sub: "runtime attack simulation", type: "victim" },
          { label: "CI/CD Gate", sub: "block on critical findings", type: "result" },
        ],
      },
      timeline: [
        { year: 2017, event: "Equifax — Apache Struts CVE exploited 2 months after patch release", highlight: true },
        { year: 2019, event: "Semgrep open-sourced — semantic code analysis at developer velocity" },
        { year: 2021, event: "Log4Shell — SCA tools identify affected applications within hours" },
        { year: 2022, event: "OpenSSF Scorecard — automated security posture rating for open-source" },
      ],
      keyTakeaways: [
        "SAST in CI/CD gives developers security feedback on every commit — shift security left",
        "SCA identifies vulnerable dependencies — critical for supply chain attacks like Log4Shell",
        "DAST confirms real exploitability — reduces SAST false positives entering the backlog",
        "False positive suppressions require security engineer sign-off, not developer self-service",
      ],
      references: [
        { title: "OWASP SAST Tools", url: "https://owasp.org/www-community/Source_Code_Analysis_Tools" },
        { title: "Semgrep — Static Analysis at Developer Scale", url: "https://semgrep.dev/" },
      ],
    },
    ctf: {
      scenario: "You are reviewing the AppSec testing program for a SaaS company. SAST and SCA results are loaded. Identify the critical finding that should block the release.",
      hint: "Read the SAST output and the dependency scan results.",
      hints: [
        "Read SAST output: cat SAST-RESULTS.txt",
        "Read SCA results: cat SCA-RESULTS.txt",
        "View the blocking finding: cat findings/RELEASE-BLOCKER.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/SAST-RESULTS.txt", value: "FLAG{S4ST_SQLI_", label: "SAST — SQL Injection Found" },
        { trigger: "/SCA-RESULTS.txt", value: "SC4_CV3_", label: "SCA — Critical CVE Found" },
        { trigger: "/findings/RELEASE-BLOCKER.txt", value: "R3L34S3_BL0CK}", label: "Release — Blocked on Critical Findings" },
      ],
      files: {
        "/SAST-RESULTS.txt": [
          "SEMGREP SAST SCAN — v2.4.1 release candidate",
          "=============================================",
          "[ERROR]  src/api/users.py:45 — SQL Injection (raw query concatenation)",
          "[ERROR]  src/auth/login.py:12 — Hardcoded JWT secret key",
          "[WARNING] src/utils/html.py:88 — Reflected XSS (unescaped user input in template)",
          "[INFO]   src/api/orders.py:201 — Verbose error message may leak stack trace",
          "",
          "CRITICAL findings: 2  HIGH: 1  MEDIUM: 0",
          "Release gate: BLOCKED — critical findings must be remediated",
        ].join("\n"),
        "/SCA-RESULTS.txt": [
          "SNYK DEPENDENCY SCAN — package.json + requirements.txt",
          "=======================================================",
          "[CRITICAL] CVE-2021-44228 — log4j-core 2.14.1 → upgrade to 2.17.1",
          "           CVSS: 10.0 — Remote Code Execution — Log4Shell",
          "[HIGH]     CVE-2023-28154 — webpack 5.75.0 → upgrade to 5.76.1",
          "[MEDIUM]   CVE-2022-25883 — semver 7.3.7 → upgrade to 7.5.2",
          "",
          "Critical CVE in production dependency: log4j-core (Log4Shell)",
          "This version is actively exploited in the wild.",
          "Release gate: BLOCKED",
        ].join("\n"),
        "/findings/RELEASE-BLOCKER.txt": [
          "RELEASE BLOCKED — CRITICAL SECURITY FINDINGS",
          "==============================================",
          "Release v2.4.1 is BLOCKED pending remediation of:",
          "",
          "1. SQL Injection in src/api/users.py:45",
          "   Impact: Full database read/write by unauthenticated user",
          "   Fix: Use parameterized queries (ORM or cursor.execute with %s)",
          "",
          "2. Log4Shell (CVE-2021-44228) in log4j-core 2.14.1",
          "   Impact: Remote code execution via JNDI lookup in log messages",
          "   Fix: Upgrade log4j-core to 2.17.1 immediately",
          "",
          "Release may not proceed until both findings are resolved and rescanned.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "SAST-RESULTS.txt", isDir: false },
          { name: "SCA-RESULTS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "RELEASE-BLOCKER.txt", isDir: false }],
      },
    },
  },

  // ─── audit-t08: Network Segmentation ──────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Palo Alto Networks", location: "Santa Clara, California", era: "Present Day", emoji: "🌐" },
    id: "audit-t08",
    order: 8,
    title: "The Flat Network",
    subtitle: "Network Segmentation — VPC Controls and Firewall Rule Review",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-08", name: "Network Auditor", emoji: "🌐" },
    challengeType: "ctf",
    info: {
      tagline: "A flat network means a single compromised endpoint can reach everything. Segmentation contains the blast radius.",
      year: 2013,
      overview: [
        "Network segmentation audits verify that network zones are properly separated and that traffic between zones follows the principle of least connectivity — only the specific ports and protocols required for business functions are permitted. PCI DSS, HIPAA, and SOC 2 all require network segmentation as a foundational control.",
        "Cloud network segmentation uses VPCs, subnets, security groups, and network ACLs. An audit reviews: Are sensitive systems (databases, payment processing) isolated in private subnets with no direct internet route? Do security groups follow least-privilege (specific source IPs and ports, not 0.0.0.0/0)? Are there VPC peering connections that create unexpected paths between environments?",
        "On-premises segmentation uses VLANs, firewall rules, and microsegmentation. Auditors test segmentation by attempting to reach sensitive systems from lower-trust zones — if a web server can directly query the database on port 5432, segmentation has failed even if a firewall rule exists on paper.",
      ],
      technical: {
        title: "Network Segmentation Testing",
        body: [
          "Firewall rule review methodology: (1) Obtain the full firewall ruleset. (2) Identify all rules that allow traffic to/from sensitive zones (PCI scope, database tier, admin network). (3) For each permissive rule, verify a business justification exists and is documented. (4) Check for 'ANY' source or destination rules — these represent flat network conditions.",
          "AWS VPC audit: (1) Map all VPC peering connections — transitive routing creates unexpected paths. (2) Review all security groups for 0.0.0.0/0 ingress rules. (3) Verify database subnets have no internet gateway route. (4) Check that VPC Flow Logs are enabled — traffic logging is required for segmentation validation.",
        ],
        codeExample: {
          label: "Network segmentation test — verifying database isolation",
          code: `# Test 1: Can web tier reach database directly?
# From a web server (10.0.1.15), attempt database connection
nmap -p 5432 10.0.2.100  # database server in private subnet

# Expected (segmented): Host seems down / filtered
# BAD (flat network): 5432/tcp open postgresql

# AWS: Check security group attached to RDS instance
aws ec2 describe-security-groups --group-ids sg-0abc123 \\
  --query 'SecurityGroups[*].IpPermissions[?ToPort==\`5432\`]'
# Expected: Only the app server security group ID as source
# BAD: {CidrIpv4: "0.0.0.0/0"} — database accessible from anywhere

# Check VPC Flow Logs
aws ec2 describe-flow-logs --query 'FlowLogs[?ResourceId==\`vpc-xxx\`]'`,
        },
      },
      incident: {
        title: "Target Breach — HVAC Vendor to POS Network (2013)",
        when: "November–December 2013",
        where: "Target Corporation, Minneapolis, Minnesota",
        impact: "40M credit cards; 70M customer records; $290M total cost; CIO and CEO resigned",
        body: [
          "The Target breach began with compromised credentials of an HVAC vendor (Fazio Mechanical). The vendor had network access to manage heating and cooling systems. A flat network meant the HVAC vendor's network connection could reach Target's point-of-sale (POS) systems — which processed customer payment cards.",
          "Proper network segmentation would have placed the HVAC vendor access in a completely isolated network segment with no route to POS systems. The flat network meant that once attackers had the HVAC credentials, they could reach POS systems directly. Target paid $290M in settlements. PCI DSS Section 1 (network segmentation) requirements were the direct compliance response.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Internet / Vendor Access", sub: "untrusted zone", type: "attacker" },
          { label: "DMZ / Web Tier", sub: "semi-trusted zone", type: "system" },
          { label: "Firewall / Security Group", sub: "segmentation control", type: "victim" },
          { label: "Database / PCI Zone", sub: "isolated trusted zone", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Target breach — HVAC vendor to POS via flat network", highlight: true },
        { year: 2014, event: "PCI DSS 3.0 — network segmentation requirements clarified" },
        { year: 2019, event: "Capital One — S3 accessible from compromised EC2 via flat IAM policy" },
        { year: 2021, event: "CISA Zero Trust maturity model — microsegmentation as advanced practice" },
      ],
      keyTakeaways: [
        "Flat networks maximize blast radius — segmentation contains lateral movement",
        "Vendor network access must be isolated from internal sensitive systems",
        "VPC Flow Logs must be enabled — you cannot audit what you cannot see",
        "PCI DSS requires network segmentation to reduce cardholder data environment scope",
      ],
      references: [
        { title: "PCI DSS v4.0 — Requirement 1: Network Security Controls", url: "https://www.pcisecuritystandards.org/document_library/" },
        { title: "NIST SP 800-125B — Secure Virtual Network Configuration", url: "https://csrc.nist.gov/publications/detail/sp/800-125b/final" },
      ],
    },
    ctf: {
      scenario: "You are auditing network segmentation for a payment processor. Review the VPC configuration and firewall rules to identify the segmentation failures.",
      hint: "Check the VPC diagram, security groups, and flow logs status.",
      hints: [
        "Read: cat VPC-CONFIG.txt",
        "Check security groups: cat SECURITY-GROUPS.txt",
        "Check flow logs: cat VPC-FLOW-LOGS.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/VPC-CONFIG.txt", value: "FLAG{N3TW0RK_S3G_", label: "VPC Config — Flat Network Found" },
        { trigger: "/SECURITY-GROUPS.txt", value: "FL4T_VPC_", label: "Security Groups — Open Rules Found" },
        { trigger: "/VPC-FLOW-LOGS.txt", value: "F10W_LOGS}", label: "Flow Logs — Not Enabled" },
      ],
      files: {
        "/VPC-CONFIG.txt": [
          "VPC CONFIGURATION REVIEW",
          "=========================",
          "VPC: vpc-prod (10.0.0.0/16)",
          "",
          "Subnets:",
          "  subnet-web  10.0.1.0/24  Public subnet  Route: 0.0.0.0/0 → igw-001",
          "  subnet-app  10.0.2.0/24  Private subnet Route: 0.0.0.0/0 → nat-001",
          "  subnet-db   10.0.3.0/24  Private subnet Route: 0.0.0.0/0 → nat-001",
          "",
          "FINDING: subnet-db has a NAT gateway route.",
          "Database subnet should have NO outbound internet route.",
          "Database servers should not be able to reach the internet.",
        ].join("\n"),
        "/SECURITY-GROUPS.txt": [
          "SECURITY GROUP REVIEW",
          "======================",
          "sg-web (attached to web servers):",
          "  Ingress: 80, 443 from 0.0.0.0/0  — OK",
          "  Ingress: 22 from 0.0.0.0/0         — FINDING: SSH open to world",
          "",
          "sg-db (attached to RDS instances):",
          "  Ingress: 5432 from 0.0.0.0/0       — CRITICAL: Database open to internet",
          "  Expected: 5432 from sg-app ONLY",
          "",
          "CRITICAL: Database (PCI scope) directly accessible from the internet.",
          "PCI DSS Requirement 1 — network segmentation control FAILED.",
        ].join("\n"),
        "/VPC-FLOW-LOGS.txt": [
          "VPC FLOW LOG STATUS",
          "====================",
          "vpc-prod: Flow logs DISABLED  ← FINDING",
          "",
          "VPC Flow Logs are required to:",
          "  - Validate segmentation is working",
          "  - Detect lateral movement between subnets",
          "  - Meet PCI DSS logging requirements",
          "  - Investigate security incidents",
          "",
          "Without flow logs, there is no visibility into network traffic.",
          "Remediation: Enable VPC Flow Logs to CloudWatch or S3 immediately.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "VPC-CONFIG.txt", isDir: false },
          { name: "SECURITY-GROUPS.txt", isDir: false },
          { name: "VPC-FLOW-LOGS.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-t09: Database Controls ─────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Snowflake Headquarters", location: "San Mateo, California", era: "Present Day", emoji: "🗄️" },
    id: "audit-t09",
    order: 9,
    title: "Data at Rest",
    subtitle: "Database Access Controls — RBAC and Row-Level Security",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-09", name: "Database Auditor", emoji: "🗄️" },
    challengeType: "ctf",
    info: {
      tagline: "A database with one role that can read every table is a database where every user is a data breach.",
      year: 2020,
      overview: [
        "Database access control audits verify that role-based access control (RBAC) is properly implemented, that sensitive columns have appropriate masking or encryption, and that all database activity is logged. Modern databases (Snowflake, BigQuery, Redshift) support row-level security, column masking, and dynamic data masking — controls that should be verified in any compliance audit.",
        "Common database audit findings: service accounts with DBA privileges, no column masking on PII fields (SSN, credit card, phone), database encryption at rest disabled, audit logging not capturing SELECT queries (only capturing DDL/DML misses read-based exfiltration), and users with direct table access instead of role-based views.",
        "Database activity monitoring (DAM) is a detective control that logs all queries, identifies unusual patterns (bulk SELECT of PII, queries from unusual locations), and alerts on policy violations. Auditors verify DAM is deployed and that alerts are being reviewed, not just collected.",
      ],
      technical: {
        title: "Testing Database Access Controls",
        body: [
          "RBAC test: for each database role, map the granted permissions to the intended job function. A reporting analyst role should have SELECT on reporting tables only — never INSERT, UPDATE, DELETE, or DDL. A DBA role should have full rights, but DBA role membership must require MFA and be assigned only to named administrators.",
          "Row-level security (RLS) test: create test records in different regions/departments, authenticate as a user restricted to Region A, attempt to query Region B records. If RLS is working, the query returns 0 rows. If it returns Region B records, RLS is not properly configured.",
        ],
        codeExample: {
          label: "Snowflake — testing row-level security and column masking",
          code: `-- Check column masking policies on PII columns
SELECT column_name, masking_policy_name
FROM information_schema.columns
WHERE table_name = 'CUSTOMERS'
  AND column_name IN ('SSN', 'CREDIT_CARD', 'EMAIL');
-- Expected: all three columns should show a masking policy
-- Finding: NULL masking_policy_name = PII exposed to all users with table access

-- Test row-level security (as analyst_region_west)
SELECT region, COUNT(*) FROM customers GROUP BY region;
-- Expected: only 'WEST' rows visible
-- Finding: 'EAST', 'NORTH', 'SOUTH' returned = RLS not working

-- Check for service accounts with DBA roles
SELECT grantee_name, role
FROM information_schema.applicable_roles
WHERE role = 'SYSADMIN' OR role = 'ACCOUNTADMIN';
-- Expected: only named human admins
-- Finding: svc_etl_prod has ACCOUNTADMIN role = CRITICAL`,
        },
      },
      incident: {
        title: "Morgan Stanley Unencrypted Data Center Decommission (2020)",
        when: "2016–2019 (discovered 2020)",
        where: "Morgan Stanley — multiple data centers",
        impact: "$60M OCC fine; customer PII on decommissioned hardware sold without data wiping",
        body: [
          "Morgan Stanley decommissioned two data centers between 2016 and 2019. Local storage devices were sold to a third party without proper data wiping. The devices contained unencrypted customer PII — names, addresses, SSNs, and account information. The OCC fined Morgan Stanley $60M in 2020.",
          "The root cause was a database access control failure: data at rest was not encrypted. Had encryption at rest been enabled, the data on the decommissioned hardware would have been unreadable without the encryption keys. Database audits must verify encryption at rest configuration for every database in scope.",
        ],
      },
      diagram: {
        nodes: [
          { label: "RBAC", sub: "role per job function", type: "attacker" },
          { label: "Column Masking", sub: "PII obfuscated", type: "system" },
          { label: "Row-Level Security", sub: "data partitioned", type: "victim" },
          { label: "Encryption at Rest", sub: "unreadable without key", type: "result" },
        ],
      },
      timeline: [
        { year: 2016, event: "GDPR draft finalized — encryption at rest becomes standard requirement" },
        { year: 2019, event: "Snowflake launches row-level security and dynamic data masking" },
        { year: 2020, event: "Morgan Stanley — $60M fine for unencrypted decommissioned hardware", highlight: true },
        { year: 2023, event: "NIST CSF 2.0 — data at rest encryption explicitly listed as baseline control" },
      ],
      keyTakeaways: [
        "Encryption at rest is a baseline control — every database must have it enabled",
        "Column masking on PII fields prevents bulk exfiltration via SELECT queries",
        "Row-level security limits the blast radius of a compromised user account",
        "Database audit logs must capture SELECT queries — DDL/DML logging alone misses read-based exfiltration",
      ],
      references: [
        { title: "Snowflake Security Features — Row-Level Security and Masking", url: "https://docs.snowflake.com/en/user-guide/security-column" },
        { title: "CIS Oracle Database Benchmark", url: "https://www.cisecurity.org/benchmark/oracle_database" },
      ],
    },
    ctf: {
      scenario: "You are auditing Snowflake database controls for a financial firm. Review the RBAC configuration, column masking status, and encryption settings.",
      hint: "Check each database control file in the db-audit/ directory.",
      hints: [
        "List: ls db-audit/",
        "Check RBAC: cat db-audit/RBAC-REVIEW.txt",
        "Check masking: cat db-audit/COLUMN-MASKING.txt",
        "Check encryption: cat db-audit/ENCRYPTION-STATUS.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/db-audit/RBAC-REVIEW.txt", value: "FLAG{DB_RB4C_", label: "RBAC — Overprivileged Role Found" },
        { trigger: "/db-audit/COLUMN-MASKING.txt", value: "M4SK1NG_", label: "Column Masking — PII Exposed" },
        { trigger: "/db-audit/ENCRYPTION-STATUS.txt", value: "3NCRYPT10N_G4P}", label: "Encryption — Gaps Found" },
      ],
      files: {
        "/db-audit/RBAC-REVIEW.txt": [
          "SNOWFLAKE RBAC REVIEW",
          "======================",
          "Role: ANALYST",
          "  Granted to: 45 analyst users",
          "  Permissions: SELECT on ALL tables in PROD database  ← FINDING",
          "  Expected: SELECT on REPORTING schema only",
          "",
          "Role: SVC_ETL",
          "  Granted to: etl_service account",
          "  Permissions: ACCOUNTADMIN  ← CRITICAL",
          "  Expected: INSERT/UPDATE on specific staging tables only",
          "",
          "SVC_ETL service account has superadmin rights — any compromise = full DB access.",
        ].join("\n"),
        "/db-audit/COLUMN-MASKING.txt": [
          "COLUMN MASKING POLICY REVIEW",
          "==============================",
          "Table: CUSTOMERS",
          "  SSN           — Masking policy: NONE  ← FINDING",
          "  CREDIT_CARD   — Masking policy: NONE  ← FINDING",
          "  EMAIL         — Masking policy: EMAIL_MASK (last 4 chars visible) — OK",
          "  NAME          — Masking policy: NONE  ← finding (PII)",
          "",
          "45 analyst users can query unmasked SSN and credit card numbers.",
          "Remediation: Apply PARTIAL_SSN_MASK and CC_LAST4_MASK policies.",
        ].join("\n"),
        "/db-audit/ENCRYPTION-STATUS.txt": [
          "DATABASE ENCRYPTION STATUS",
          "===========================",
          "PROD database: Encryption at rest ENABLED (AES-256)  — OK",
          "DEV database:  Encryption at rest DISABLED  ← FINDING",
          "ARCHIVE database: Encryption at rest DISABLED  ← FINDING",
          "",
          "DEV database contains copies of production PII for testing.",
          "ARCHIVE database contains 7 years of financial records.",
          "Both contain sensitive data and must be encrypted.",
          "Remediation: Enable encryption and audit who has accessed DEV/ARCHIVE.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "db-audit", isDir: true }],
        "/db-audit": [
          { name: "RBAC-REVIEW.txt", isDir: false },
          { name: "COLUMN-MASKING.txt", isDir: false },
          { name: "ENCRYPTION-STATUS.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-t10: Logging and Monitoring ────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Datadog Headquarters", location: "New York, New York", era: "Present Day", emoji: "📡" },
    id: "audit-t10",
    order: 10,
    title: "The Silent Breach",
    subtitle: "Logging and Monitoring Audit — SIEM Coverage and Alert Quality",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-10", name: "SIEM Auditor", emoji: "📡" },
    challengeType: "ctf",
    info: {
      tagline: "If a breach happens and no log captures it, was there a breach? Yes. But you will not know for months.",
      year: 2017,
      overview: [
        "Logging and monitoring audits verify that security-relevant events are captured, forwarded to a centralized SIEM, and that alerts are properly configured and investigated. NIST SP 800-92 and PCI DSS Requirement 10 provide the baseline: all authentication attempts, privilege use, system changes, and data access must be logged.",
        "Log coverage gaps are one of the most common audit findings. Systems that are not forwarding logs to the SIEM create blind spots. Auditors build a log source inventory and verify every in-scope system is forwarding logs. The gap is found by comparing the SIEM log source list against the asset inventory.",
        "Alert quality is the second dimension: too few alerts mean threats are missed; too many alerts cause alert fatigue (analysts ignore everything). Auditors review the alert backlog — if there are thousands of unacknowledged alerts, the program is effectively non-functional. Mean time to acknowledge (MTTA) should be under 15 minutes for critical alerts.",
      ],
      technical: {
        title: "Log Coverage Audit Methodology",
        body: [
          "Step 1: Obtain the complete asset inventory (servers, network devices, cloud accounts, SaaS applications). Step 2: Obtain the SIEM log source list. Step 3: Compare — any asset in the inventory not in the SIEM is a coverage gap. Prioritize by risk: internet-facing systems, domain controllers, databases, and cloud management planes are highest priority.",
          "Retention audit: regulatory requirements set minimum retention. PCI DSS requires 12 months (3 months immediately accessible). SOC 2 requires 6 months. HIPAA requires 6 years. Verify the SIEM or log archive retention policy meets the applicable requirement for every system in scope.",
        ],
        codeExample: {
          label: "SIEM coverage gap analysis",
          code: `# Build asset inventory
Get-ADComputer -Filter * | Select-Object Name > asset_inventory.txt
aws ec2 describe-instances --query 'Reservations[*].Instances[*].PrivateIpAddress' >> asset_inventory.txt

# Build SIEM log source list
# (from SIEM API or admin console export)
Get-SIEMLogSources | Select-Object HostName > siem_log_sources.txt

# Find gaps (assets not sending logs to SIEM)
Compare-Object (Get-Content asset_inventory.txt) (Get-Content siem_log_sources.txt) |
  Where-Object {$_.SideIndicator -eq '<='} |
  ForEach-Object { $_.InputObject + " — NOT IN SIEM" }

# Output:
# SQLSERVER-PROD01 — NOT IN SIEM  ← CRITICAL: production DB not logging`,
        },
      },
      incident: {
        title: "Equifax 78-Day Breach — SSL Inspection Gap (2017)",
        when: "May–July 2017",
        where: "Atlanta, Georgia",
        impact: "147M records; attacker dwell time 78 days; broken SSL inspection = no log visibility",
        body: [
          "Equifax's monitoring failure allowed 78 days of attacker activity without detection. The SSL inspection appliance — which would have decrypted and logged suspicious outbound traffic — had an expired certificate that had not been renewed for 19 months. All HTTPS traffic through that device appeared encrypted and was not inspected.",
          "The monitoring audit finding: a critical log source (SSL inspection) was broken and producing no logs. A log coverage audit comparing expected sources against actual sources would have identified the gap on day one. The lesson: log coverage audits must verify that log sources are actively sending logs — not just that they are configured to do so.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Log Sources", sub: "all assets in scope", type: "attacker" },
          { label: "SIEM", sub: "central log aggregation", type: "system" },
          { label: "Alert Rules", sub: "detection content", type: "victim" },
          { label: "Investigation", sub: "MTTA < 15 min", type: "result" },
        ],
      },
      timeline: [
        { year: 2012, event: "NIST SP 800-92 — Guide to Computer Security Log Management" },
        { year: 2017, event: "Equifax — 78-day dwell time; broken SSL inspection = no visibility", highlight: true },
        { year: 2020, event: "SolarWinds — 9 months dwell time; sophisticated evasion defeated most SIEMs" },
        { year: 2023, event: "CISA guidelines — 24/7 SOC monitoring and 15-minute MTTA for critical alerts" },
      ],
      keyTakeaways: [
        "Log coverage gaps are found by comparing SIEM log source list to asset inventory",
        "Verify log sources are ACTIVELY sending logs — configuration alone is insufficient",
        "Alert backlog size and MTTA are metrics for monitoring program effectiveness",
        "Retention must meet the regulatory requirement — PCI DSS requires 12 months, 3 immediately accessible",
      ],
      references: [
        { title: "NIST SP 800-92 — Guide to Computer Security Log Management", url: "https://csrc.nist.gov/publications/detail/sp/800-92/final" },
        { title: "PCI DSS v4.0 — Requirement 10: Log and Monitor All Access", url: "https://www.pcisecuritystandards.org/" },
      ],
    },
    ctf: {
      scenario: "You are auditing the SIEM program for an e-commerce company. Review the log coverage, retention policy, and alert backlog to identify gaps.",
      hint: "Check each monitoring audit file in the siem-audit/ directory.",
      hints: [
        "List: ls siem-audit/",
        "Check coverage: cat siem-audit/LOG-COVERAGE.txt",
        "Check alerts: cat siem-audit/ALERT-BACKLOG.txt",
        "Check retention: cat siem-audit/RETENTION-POLICY.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/siem-audit/LOG-COVERAGE.txt", value: "FLAG{S13M_C0V3R4G3_", label: "Log Coverage — Gaps Found" },
        { trigger: "/siem-audit/ALERT-BACKLOG.txt", value: "4L3RT_", label: "Alert Backlog — Alert Fatigue Confirmed" },
        { trigger: "/siem-audit/RETENTION-POLICY.txt", value: "R3T3NT10N_G4P}", label: "Retention — Policy Gap Found" },
      ],
      files: {
        "/siem-audit/LOG-COVERAGE.txt": [
          "SIEM LOG COVERAGE AUDIT",
          "========================",
          "Asset Inventory: 127 systems",
          "SIEM Log Sources: 89 systems",
          "Coverage: 70%  ← FINDING (target: 100% for in-scope systems)",
          "",
          "Missing from SIEM (examples):",
          "  SQLSERVER-PROD01 — production database server",
          "  DC-PROD-01       — domain controller",
          "  PAYMENTGW-01     — payment gateway server",
          "",
          "CRITICAL: Payment gateway and domain controller not in SIEM.",
          "Both are PCI DSS in-scope. Compliance failure.",
        ].join("\n"),
        "/siem-audit/ALERT-BACKLOG.txt": [
          "ALERT BACKLOG ANALYSIS",
          "=======================",
          "Open unacknowledged alerts: 4,237",
          "Critical alerts unacknowledged > 24h: 312",
          "High alerts unacknowledged > 72h: 891",
          "Mean time to acknowledge (MTTA): 18.4 hours",
          "Target MTTA: < 15 minutes for critical",
          "",
          "FINDING: Alert fatigue — SOC is unable to process alert volume.",
          "4,237 unacknowledged alerts indicates effective monitoring breakdown.",
          "Recommendation: Tune alert rules, reduce false positives, expand SOC.",
        ].join("\n"),
        "/siem-audit/RETENTION-POLICY.txt": [
          "LOG RETENTION POLICY REVIEW",
          "============================",
          "Configured retention in SIEM: 90 days",
          "Archive (cold storage): NONE configured",
          "",
          "PCI DSS Requirement 10.7: 12 months retention, 3 months immediately accessible.",
          "Current configuration: 90 days only — 9 months SHORT of PCI requirement.",
          "",
          "FINDING: Log retention does not meet PCI DSS requirement.",
          "Remediation: Configure 12-month archive to S3/cold storage.",
          "Estimated implementation: 2 weeks.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "siem-audit", isDir: true }],
        "/siem-audit": [
          { name: "LOG-COVERAGE.txt", isDir: false },
          { name: "ALERT-BACKLOG.txt", isDir: false },
          { name: "RETENTION-POLICY.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-t11: Zero Trust ─────────────────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "Google Cloud Headquarters", location: "Sunnyvale, California", era: "Present Day", emoji: "🏰" },
    id: "audit-t11",
    order: 11,
    title: "Never Trust, Always Verify",
    subtitle: "Zero Trust Architecture Assessment",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-11", name: "Zero Trust Auditor", emoji: "🛡️" },
    challengeType: "ctf",
    info: {
      tagline: "The perimeter is dead. Every request must prove it is authorized — every time, from everywhere.",
      year: 2014,
      overview: [
        "Zero Trust is a security architecture built on the principle that no user, device, or network should be trusted by default — including those inside the corporate network. Every access request must be authenticated, authorized, and continuously validated. NIST SP 800-207 defines Zero Trust Architecture (ZTA) for government and enterprise.",
        "The five pillars of Zero Trust (CISA model): Identity (verify every user with MFA and continuous authentication), Device (verify device health and compliance before granting access), Network (microsegmentation, no implicit internal trust), Application (application-layer access controls, ZTNA replacing VPN), and Data (classify and protect data regardless of location).",
        "Google's BeyondCorp, launched in 2014, was the first major enterprise Zero Trust implementation. All employee access — including from Google's internal network — goes through the same authentication and authorization checks as external access. Internal location provides no additional trust. This became the model for CISA's Zero Trust Maturity Model.",
      ],
      technical: {
        title: "Auditing Zero Trust Maturity",
        body: [
          "CISA defines five maturity levels for each ZTA pillar: Traditional (0) → Initial (1) → Advanced (2) → Optimal (3). Auditors assess each pillar and assign a maturity level. Traditional means castle-and-moat security with implicit internal trust. Optimal means continuous verification with automated response.",
          "Key audit questions: Is MFA enforced for ALL users (not just privileged accounts)? Are device health checks performed before granting application access? Is VPN being replaced by Zero Trust Network Access (ZTNA)? Are lateral movement paths restricted (microsegmentation)? Is data classified and access logged regardless of location?",
        ],
        codeExample: {
          label: "Zero Trust maturity assessment — identity pillar",
          code: `# Identity Pillar Maturity Assessment

Control                          Score  Level      Notes
---------------------------------  -----  ---------  -------
MFA for all users                  2/3    Advanced   VPN still exempt from MFA
Phishing-resistant MFA (FIDO2)     0/3    Traditional  SMS/TOTP only
Passwordless authentication        0/3    Traditional  Not implemented
Conditional Access policies        2/3    Advanced   Risk-based CA for high-risk apps
Continuous session re-auth         0/3    Traditional  Sessions valid 8h with no recheck
Privileged Identity Management     1/3    Initial     PIM for some roles, not all

Identity Pillar Score: 5/18 = Initial Maturity
Target: Advanced (12/18)
Gap: 7 points — 3 year roadmap required`,
        },
      },
      incident: {
        title: "SolarWinds — Implicit Internal Trust Exploited (2020)",
        when: "October 2019 – December 2020",
        where: "Multiple US federal agencies and enterprises",
        impact: "18,000 organizations compromised; 9 federal agencies breached",
        body: [
          "The SolarWinds attack demonstrated the fundamental weakness of perimeter-based security. Once the malicious Orion update was installed, the attacker had access to the target's internal network and used implicit internal trust to move laterally. Traditional security models trusted everything inside the perimeter — the attacker exploited that trust for months.",
          "An organization with Zero Trust controls — specifically identity-based access where every lateral connection requires authentication and authorization — would have significantly limited the attacker's lateral movement. CISA's Zero Trust guidance, published in response to SolarWinds, accelerated ZTA adoption across the US federal government.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Identity Verification", sub: "MFA + FIDO2", type: "attacker" },
          { label: "Device Health Check", sub: "MDM compliance before access", type: "system" },
          { label: "ZTNA / Microsegmentation", sub: "no implicit trust", type: "victim" },
          { label: "Continuous Monitoring", sub: "re-verify every session", type: "result" },
        ],
      },
      timeline: [
        { year: 2010, event: "John Kindervag coins 'Zero Trust' at Forrester Research" },
        { year: 2014, event: "Google BeyondCorp published — enterprise ZTA blueprint" },
        { year: 2020, event: "NIST SP 800-207 — Zero Trust Architecture official standard" },
        { year: 2020, event: "SolarWinds — implicit internal trust exploited at scale", highlight: true },
        { year: 2021, event: "Biden EO 14028 — ZTA mandatory for US federal agencies" },
      ],
      keyTakeaways: [
        "Zero Trust: never trust, always verify — location inside the network grants no implicit trust",
        "CISA's five pillars: Identity, Device, Network, Application, Data",
        "MFA is the baseline; phishing-resistant FIDO2 is the target for advanced maturity",
        "ZTNA replaces VPN — application-specific access with no network-level implicit trust",
      ],
      references: [
        { title: "NIST SP 800-207 — Zero Trust Architecture", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
        { title: "CISA Zero Trust Maturity Model v2.0", url: "https://www.cisa.gov/zero-trust-maturity-model" },
      ],
    },
    ctf: {
      scenario: "You are assessing a company's Zero Trust maturity. Review the identity, device, and network pillar assessments to determine their overall ZTA maturity level.",
      hint: "Read each pillar assessment in the zt-assessment/ directory.",
      hints: [
        "List: ls zt-assessment/",
        "Check identity: cat zt-assessment/IDENTITY-PILLAR.txt",
        "Check device: cat zt-assessment/DEVICE-PILLAR.txt",
        "Check network: cat zt-assessment/NETWORK-PILLAR.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/zt-assessment/IDENTITY-PILLAR.txt", value: "FLAG{Z3R0_TRUST_", label: "Identity Pillar — Maturity Assessed" },
        { trigger: "/zt-assessment/DEVICE-PILLAR.txt", value: "M4TUR1TY_", label: "Device Pillar — Maturity Assessed" },
        { trigger: "/zt-assessment/NETWORK-PILLAR.txt", value: "1N1T14L}", label: "Network Pillar — Overall Level Confirmed" },
      ],
      files: {
        "/zt-assessment/IDENTITY-PILLAR.txt": [
          "IDENTITY PILLAR — ZERO TRUST MATURITY",
          "=======================================",
          "MFA enforced: Partial (admin accounts only)  INITIAL",
          "Phishing-resistant MFA (FIDO2): Not deployed  TRADITIONAL",
          "Conditional Access: Basic (location-based)    INITIAL",
          "Continuous re-auth: Not implemented           TRADITIONAL",
          "PIM for privileged roles: Partial             INITIAL",
          "",
          "Identity Pillar Score: INITIAL (1.2/3.0)",
        ].join("\n"),
        "/zt-assessment/DEVICE-PILLAR.txt": [
          "DEVICE PILLAR — ZERO TRUST MATURITY",
          "=====================================",
          "MDM deployment: 60% of devices managed       INITIAL",
          "Device health check before access: No         TRADITIONAL",
          "Certificate-based device auth: No             TRADITIONAL",
          "BYOD policy: No controls on personal devices  TRADITIONAL",
          "",
          "Device Pillar Score: TRADITIONAL (0.6/3.0)",
        ].join("\n"),
        "/zt-assessment/NETWORK-PILLAR.txt": [
          "NETWORK PILLAR — ZERO TRUST MATURITY",
          "======================================",
          "Microsegmentation: Limited (VLAN only)        INITIAL",
          "ZTNA / VPN replacement: No (VPN still primary)TRADITIONAL",
          "DNS-layer security: Yes (Umbrella)             ADVANCED",
          "East-West traffic inspection: No              TRADITIONAL",
          "",
          "Network Pillar Score: INITIAL (0.9/3.0)",
          "",
          "OVERALL ZTA MATURITY: INITIAL",
          "Target for compliance: ADVANCED",
          "Estimated roadmap: 2-3 years",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "zt-assessment", isDir: true }],
        "/zt-assessment": [
          { name: "IDENTITY-PILLAR.txt", isDir: false },
          { name: "DEVICE-PILLAR.txt", isDir: false },
          { name: "NETWORK-PILLAR.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-t12: Compliance Automation ─────────────────────────────────────
  {
    epochId: "tech-audit-2",
    wonder: { name: "AWS Security Hub", location: "Global / Cloud", era: "Present Day", emoji: "🤖" },
    id: "audit-t12",
    order: 12,
    title: "Automate the Audit",
    subtitle: "Compliance Automation — AWS Config, Azure Policy, and Security Hub",
    category: "cybersecurity",
    xp: 175,
    badge: { id: "audit-t-badge-12", name: "Compliance Automator", emoji: "⚙️" },
    challengeType: "ctf",
    info: {
      tagline: "Manual compliance checks are point-in-time snapshots. Automated compliance is continuous truth.",
      year: 2017,
      overview: [
        "Compliance automation replaces manual, point-in-time audit checks with continuous, automated verification of controls. AWS Config with Config Rules, AWS Security Hub, Azure Policy, and GCP Security Command Center all provide real-time compliance scoring against frameworks like CIS Benchmarks, PCI DSS, SOC 2, and NIST 800-53.",
        "AWS Security Hub aggregates findings from Config Rules, GuardDuty, Inspector, Macie, and third-party security tools into a single compliance score. The CIS AWS Foundations Benchmark in Security Hub runs 180+ automated checks and updates the score in real time as resources are created, modified, or deleted.",
        "Compliance automation has two components: preventive (SCPs and Azure Policies that block non-compliant resource creation) and detective (Config Rules and Security Hub that identify existing non-compliance). Auditors verify both components are in place and that detective findings are being remediated — not just collected.",
      ],
      technical: {
        title: "Implementing Continuous Compliance",
        body: [
          "AWS Config conformance packs deploy multiple Config Rules as a unit aligned to a framework. The AWS-provided 'Operational Best Practices for PCI DSS 3.2.1' conformance pack deploys 133 rules with a single deployment. Findings appear in Security Hub with a compliance score and resource-level detail.",
          "Auto-remediation: Config Rules can trigger Lambda functions that automatically remediate findings. Example: a Config Rule detects an S3 bucket with public access — a Lambda function automatically applies the public access block. Auditors verify auto-remediation is enabled for critical controls and that remediation actions are logged for audit trail.",
        ],
        codeExample: {
          label: "AWS Config Rule with auto-remediation via Lambda",
          code: `# Deploy a Config Rule for S3 public access
aws configservice put-config-rule --config-rule '{
  "ConfigRuleName": "s3-bucket-public-read-prohibited",
  "Source": {
    "Owner": "AWS",
    "SourceIdentifier": "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }
}'

# Set up auto-remediation via SSM Automation
aws configservice put-remediation-configurations --remediation-configurations '[{
  "ConfigRuleName": "s3-bucket-public-read-prohibited",
  "TargetType": "SSM_DOCUMENT",
  "TargetId": "AWS-DisableS3BucketPublicReadWrite",
  "Automatic": true,
  "MaximumAutomaticAttempts": 3,
  "RetryAttemptSeconds": 60
}]'

# View Security Hub compliance score
aws securityhub get-insights --insight-arns arn:aws:securityhub:::insight/securityhub/default/1`,
        },
      },
      incident: {
        title: "Toyota S3 Public Bucket — 10 Years of Exposure (2023)",
        when: "2013–2023",
        where: "Toyota Connected Corporation",
        impact: "2.15M customer vehicle locations exposed for 10 years; no automated compliance check existed",
        body: [
          "Toyota's 10-year S3 misconfiguration (public access on a bucket containing vehicle location data) would have been caught on day one by the AWS Config rule 's3-bucket-public-read-prohibited'. This managed rule runs continuously and flags any bucket with public read access within minutes of configuration.",
          "The case became a benchmark example for why compliance automation matters: a manual audit checks a point in time, but a continuously running Config rule would have caught the 2013 misconfiguration in 2013 — not 2023. AWS Config was available in 2013. The organization simply had not deployed it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "AWS Config Rules", sub: "continuous evaluation", type: "attacker" },
          { label: "Security Hub", sub: "aggregated compliance score", type: "system" },
          { label: "Auto-Remediation", sub: "Lambda or SSM fixes", type: "victim" },
          { label: "Compliance Score", sub: "real-time framework posture", type: "result" },
        ],
      },
      timeline: [
        { year: 2014, event: "AWS Config GA — continuous resource configuration monitoring" },
        { year: 2017, event: "CIS AWS Foundations Benchmark v1.0 — 49 automated checks" },
        { year: 2019, event: "AWS Security Hub GA — aggregated compliance across all Config rules" },
        { year: 2023, event: "Toyota — 10-year S3 exposure that AWS Config would have caught in minutes", highlight: true },
      ],
      keyTakeaways: [
        "Compliance automation catches misconfigurations in minutes — not years after deployment",
        "AWS Security Hub provides a unified compliance score across 180+ CIS benchmark checks",
        "Auto-remediation of critical controls (S3 public access, root access keys) is best practice",
        "Manual audits verify the automation is working — they do not replace continuous monitoring",
      ],
      references: [
        { title: "AWS Security Hub — Compliance Standards", url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards.html" },
        { title: "CIS AWS Foundations Benchmark", url: "https://www.cisecurity.org/benchmark/amazon_web_services" },
      ],
    },
    ctf: {
      scenario: "You are reviewing the compliance automation program for a cloud-first company. Check the Security Hub score, Config rule coverage, and auto-remediation status.",
      hint: "Read the compliance automation files in the compliance/ directory.",
      hints: [
        "List: ls compliance/",
        "Check Security Hub: cat compliance/SECURITY-HUB-SCORE.txt",
        "Check Config coverage: cat compliance/CONFIG-RULES.txt",
        "Check auto-remediation: cat compliance/AUTO-REMEDIATION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/compliance/SECURITY-HUB-SCORE.txt", value: "FLAG{C0MPL14NC3_", label: "Security Hub — Score Reviewed" },
        { trigger: "/compliance/CONFIG-RULES.txt", value: "4UT0M4T10N_SCH3D1LUD_", label: "Config Rules — Coverage Gaps Found" },
        { trigger: "/compliance/AUTO-REMEDIATION.txt", value: "R3M3D}", label: "Auto-Remediation — Status Confirmed" },
      ],
      files: {
        "/compliance/SECURITY-HUB-SCORE.txt": [
          "AWS SECURITY HUB — COMPLIANCE SCORE",
          "=====================================",
          "CIS AWS Foundations Benchmark v1.4:",
          "  Score: 61%  (118/192 controls passing)",
          "  Critical failures: 12",
          "  High failures: 31",
          "",
          "PCI DSS v3.2.1:",
          "  Score: 74%  (98/133 controls passing)",
          "  Critical failures: 4",
          "",
          "Target: 90%+ for both frameworks",
          "Current posture: NEEDS IMPROVEMENT",
        ].join("\n"),
        "/compliance/CONFIG-RULES.txt": [
          "AWS CONFIG RULE COVERAGE",
          "=========================",
          "Total managed rules deployed: 67 of 180 available  ← 37% coverage",
          "",
          "Notable missing rules:",
          "  s3-bucket-logging-enabled                — NOT DEPLOYED",
          "  ec2-imdsv2-check                         — NOT DEPLOYED",
          "  iam-password-policy                      — NOT DEPLOYED",
          "  cloudtrail-s3-dataevents-enabled         — NOT DEPLOYED",
          "  guardduty-enabled-centralized            — NOT DEPLOYED",
          "",
          "37% Config rule coverage means 63% of compliance checks are manual.",
        ].join("\n"),
        "/compliance/AUTO-REMEDIATION.txt": [
          "AUTO-REMEDIATION STATUS",
          "========================",
          "Rules with auto-remediation enabled: 3 of 67",
          "  s3-bucket-public-read-prohibited:  AUTO-REMEDIATE (Lambda)",
          "  iam-root-access-key-check:         AUTO-REMEDIATE (SSM)",
          "  restricted-ssh:                    AUTO-REMEDIATE (Lambda)",
          "",
          "64 Config rules have no auto-remediation configured.",
          "Findings sit in Security Hub until manually reviewed.",
          "Average finding age: 47 days before remediation.",
          "",
          "Recommendation: Enable auto-remediation for all critical and high rules.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "compliance", isDir: true }],
        "/compliance": [
          { name: "SECURITY-HUB-SCORE.txt", isDir: false },
          { name: "CONFIG-RULES.txt", isDir: false },
          { name: "AUTO-REMEDIATION.txt", isDir: false },
        ],
      },
    },
  },
];
