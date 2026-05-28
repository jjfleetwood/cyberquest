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
        "Broken Object Level Authorization (BOLA) — ranked #1 in the OWASP API Security Top 10 since the list's inception in 2019 — occurs when an API endpoint uses a user-supplied identifier to retrieve objects without first verifying that the requesting user has permission to access that specific object. The mechanism is deceptively simple: the attacker swaps one ID for another. Because the server checks only that the token is valid (authentication) and not that the user owns the requested resource (authorization), it returns whatever object the ID points to. This is not a flaw in authentication — it is a flaw in authorization logic applied at the object level.",
        "API security audits differ fundamentally from traditional web application audits because APIs are designed with the assumption that only authorized clients will call them. This assumption is almost always wrong in a real audit. APIs are discoverable through mobile app traffic analysis, JavaScript bundle inspection, and API gateway logs. Parameters they accept are highly predictable — sequential integers, UUIDs, and resource names are all enumerable. A payment API that accepts GET /api/v1/payments/{payment_id} will return any payment record in the database if BOLA exists, regardless of which user is authenticated. In a financial application, this is the difference between a nuisance and a catastrophic breach.",
        "OWASP API Top 10 (2023 edition) covers ten distinct vulnerability classes that collectively represent the highest-risk threats to modern APIs. In order: API1 — Broken Object Level Authorization (BOLA); API2 — Broken Authentication; API3 — Broken Object Property Level Authorization (BOPLA, a superset of excessive data exposure); API4 — Unrestricted Resource Consumption (rate limiting failures); API5 — Broken Function Level Authorization (BFLA, admin functions accessible to regular users); API6 — Unrestricted Access to Sensitive Business Flows; API7 — Server-Side Request Forgery (SSRF); API8 — Security Misconfiguration; API9 — Improper Inventory Management; API10 — Unsafe Consumption of APIs. Each category has a distinct testing methodology, but BOLA testing is the most universally applicable because nearly every API exposes object-level endpoints.",
        "NIST SP 800-204 (Security Strategies for Microservices-based Application Systems) and NIST SP 800-204A provide the federal baseline for API security. NIST recommends that API gateways enforce authorization policies centrally rather than relying on each microservice to implement its own access control — a pattern that directly prevents BOLA. When individual services implement authorization independently, inconsistent logic leads to the object-level gaps that make BOLA possible. Centralized policy enforcement via an API gateway or service mesh policy engine (Open Policy Agent, AWS Verified Permissions) is the architectural solution.",
        "Real-world BOLA vulnerabilities follow predictable patterns across industries. In fintech APIs, the payment or account object ID is the target. In healthcare APIs (HL7 FHIR endpoints), the patient ID is the target. In e-commerce APIs, the order ID is the target. In 2022, the Optus Australia breach exposed 9.8 million customer records through a BOLA vulnerability on a legacy API endpoint that had never been subjected to security testing. The endpoint accepted a customer ID and returned the full customer record — name, address, date of birth, passport number, driver's license — without verifying that the authenticated session belonged to that customer. The attacker simply incremented the customer ID from 1 onward. Every auditor testing an API must treat every endpoint that accepts an object identifier as a BOLA candidate until proven otherwise.",
        "The audit methodology for BOLA requires at minimum two test accounts with different sets of owned objects. After authenticating as User A, an auditor performs a legitimate operation — for example, viewing a payment — and captures the HTTP request. The payment ID in the URL or request body is noted. The auditor then authenticates as User B and replays the identical request substituting User A's payment ID. If the server returns User A's payment record to User B, BOLA is confirmed. This cross-account test must be performed systematically across all resource types exposed by the API. Automated tooling (Burp Suite's active scan, OWASP ZAP with BOLA-specific scripts, or purpose-built tools like APIClarity) can accelerate enumeration but cannot replace manual test account setup and result analysis.",
        "Remediation of BOLA requires server-side ownership verification on every request that retrieves a resource by ID. The fix is not to make IDs harder to guess — UUIDs do not prevent BOLA, they only slow enumeration. The fix is a server-side check: before returning the object, query whether the authenticated user's ID matches the owner field of the requested object. In SQL: SELECT * FROM payments WHERE payment_id = ? AND user_id = (authenticated_user_id). If the row count is zero, return HTTP 403 Forbidden. This single pattern, applied consistently across all resource endpoints, eliminates BOLA. Auditors verify the fix by confirming the cross-account test now returns 403 and that the response body does not disclose the existence of the resource (which would constitute information leakage).",
      ],
      technical: {
        title: "Testing for BOLA in API Audits",
        body: [
          "The systematic BOLA test procedure begins before any tool is launched. The auditor first enumerates all API endpoints — from OpenAPI/Swagger specifications, from mobile app traffic captured via a proxy (Burp Suite, mitmproxy), and from API gateway access logs if available. Each endpoint is classified by whether it accepts an object identifier (ID in path, query parameter, or request body). Endpoints that do — /users/{id}, /orders/{order_id}, /messages?thread_id=X — are the BOLA candidates. This enumeration step is critical because undocumented endpoints are often the most vulnerable; they may have been added during a sprint without going through the authorization review checklist that established endpoints receive.",
          "Test account setup: create at minimum two accounts at the same permission level. Label them User A and User B. Perform the target action as User A — create an order, make a payment, upload a file — and note all object IDs returned. These IDs belong to User A. Authentication tokens for both accounts must be captured and kept separate. The auditor then authenticates as User B and systematically replays every User A request, substituting User A's object IDs. Each response is evaluated: HTTP 200 with User A's data confirms BOLA; HTTP 403 or 404 means the endpoint is protected (though 404 instead of 403 may still leak existence information and warrants a secondary finding for improper error handling).",
          "Automated fuzzing extends coverage beyond what two-account testing can achieve. Tools like Burp Suite's Intruder module or custom scripts can enumerate sequential IDs across a range to identify resources belonging to other users. For UUID-based APIs, fuzzing is less effective, but UUIDs can often be obtained through other vulnerabilities (information disclosure in error messages, verbose API responses, or IDOR in ancillary metadata endpoints). The auditor documents the number of records accessible, the sensitivity of data exposed, and whether the endpoint requires authentication at all — unauthenticated BOLA (as in the Peloton case) is an automatic critical finding.",
          "Remediation verification requires re-running the original test after the engineering team applies the fix. The auditor confirms: HTTP 403 (not 200) is returned when User B requests User A's object, the response body does not disclose resource existence (avoiding information leakage), audit logs capture the unauthorized access attempt, and rate limiting prevents enumeration-at-scale even if a partial BOLA remains. Evidence collection for the audit report includes: the original request/response pair showing BOLA, the HTTP 403 response after remediation, and a screenshot of the server-side ownership check in code (if a code review is in scope). OWASP Testing Guide v4.2 (WSTG-ATHZ-01) provides the authoritative test case definition.",
          "Horizontal vs. vertical BOLA distinction: Horizontal BOLA (accessing another user's object at the same privilege level) is the most common form and the focus of OWASP API1. Vertical BOLA (accessing an admin-owned object as a regular user) overlaps with Broken Function Level Authorization (BFLA, API5). Both must be tested. An admin panel endpoint that accepts a user ID to manage — GET /admin/users/{id}/permissions — may be protected at the function level (only admins can reach it) but still have horizontal BOLA within the admin tier (Admin A can modify Admin B's configuration). Test both dimensions for every endpoint that accepts an object identifier.",
          "Impact rating guidance from CVSS 3.1: BOLA vulnerabilities are typically scored CRITICAL (CVSS 9.1) when PII or financial data is exposed without authentication, and HIGH (CVSS 7.5) when the vulnerability requires authentication but crosses user boundaries. The CVSS Confidentiality Impact is HIGH for financial data (complete breach of user data), Integrity Impact is NONE (data not modified), and Availability Impact is NONE. Auditors use CVSS scores alongside the OWASP Risk Rating Methodology to determine remediation priority. Critical findings require immediate remediation before next production deployment; high findings require remediation within the sprint cycle.",
          "False positive handling: some APIs appear to have BOLA but implement authorization through an indirect chain. For example, a payment ID may be a non-enumerable hash derived from the user ID and a timestamp — querying with a random ID returns 404 because the hash does not map to any real record. Auditors verify this is not security through obscurity by confirming the server explicitly checks ownership in the database query, not just relying on ID non-guessability. A proper authorization check must be present in the code regardless of ID format.",
        ],
      },
      incident: {
        title: "Peloton API BOLA — 3M User Records Exposed (2021)",
        when: "January 2021",
        where: "Peloton Interactive",
        impact: "3 million users' private profile data exposed; no authentication required for some endpoints",
        body: [
          "Security researcher Jan Masters discovered in January 2021 that Peloton's API allowed access to any user's private profile data by querying the user ID endpoint — and that several endpoints required no authentication whatsoever. The exposed data included age, weight, location, workout history, and gender identity. The API had been in production for years; the vulnerability was not introduced by a recent change but was baked into the original design. Masters disclosed responsibly to Peloton on January 20, 2021 and was told the exposure was 'by design' for public profile sharing — a response that ignored that the 'public' endpoints were returning data users had marked private.",
          "The technical root cause was a two-part failure. First, certain API endpoints that returned user data checked only whether the requester had a valid authentication token — not whether the token's owner matched the requested user ID. This is the canonical BOLA pattern. Second, a separate set of endpoints for aggregated leaderboard and class data had no authentication check at all, relying on the assumption that unauthenticated clients would only call them in the approved mobile app flow. This assumption breaks the moment a researcher or attacker queries the API directly rather than through the app.",
          "The organizational response illustrated a common pattern in API breach incidents: initial dismissal followed by remediation under media pressure. Peloton initially disputed the finding's severity, citing that profile data was 'public.' Masters escalated to TechCrunch on May 5, 2021, and Peloton patched within two days of media publication — 90 days after initial disclosure. The regulatory consequence was limited because no financial data was exposed, but the reputational damage was significant for a company whose brand depends on user trust around health and fitness data. The incident drove renewed attention to OWASP API Security Top 10 adoption across the fitness tech industry.",
          "The detection failure analysis reveals why BOLA persists across industries: it is not detectable by signature-based intrusion detection systems. There is no malformed packet, no SQL injection string, no known attack pattern. BOLA traffic looks identical to legitimate API traffic — the same endpoint, the same HTTP method, the same authentication headers. The only distinguishing characteristic is the object ID, which is a valid ID belonging to a different user. Detection requires behavioral analytics: monitoring for patterns where a single authenticated session queries many different user IDs in rapid succession. Peloton's API logging did not include ownership mismatch alerts. An anomaly detection rule on the number of unique user IDs queried per session per hour would have flagged the researcher's enumeration — and any attacker's — within minutes.",
          "Remediation steps Peloton implemented included: adding authentication requirements to all previously public endpoints, adding server-side ownership verification to all user-specific data endpoints, and engaging a third-party API security firm to audit the full API surface. The audit revealed additional BOLA instances on less-prominent endpoints related to fitness challenge data and user connection graphs. The lesson for auditors: when BOLA is found on a primary endpoint, always test the full API surface — secondary endpoints often have the same flaw because the developer pattern that caused the primary vulnerability was used across the codebase.",
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
        "BOLA is the #1 API vulnerability — always verify the caller owns the requested object, not just that the token is valid",
        "Test by swapping object IDs between two authenticated test accounts at the same privilege level",
        "Unauthenticated API endpoints require explicit, documented business justification — absence of justification is an automatic finding",
        "Enumerate all endpoints including undocumented ones — use API gateway logs, OpenAPI specs, mobile app traffic analysis",
        "UUIDs do not prevent BOLA — non-guessable IDs reduce enumeration speed but do not replace server-side ownership checks",
        "Detection requires behavioral analytics: flag sessions querying many distinct user-object IDs in rapid succession",
        "Remediation must be verified: re-run the cross-account test after the fix and confirm HTTP 403 (not 404, which leaks existence)",
        "CVSS scoring: unauthenticated BOLA exposing PII is typically CRITICAL (9.1+); authenticated cross-user access is HIGH (7.5)",
        "Rate limiting alone is insufficient — it slows enumeration but does not fix the authorization gap",
        "After finding BOLA on one endpoint, audit the full API surface — the same developer pattern appears across related endpoints",
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
                "⚠  BOLA CONFIRMED: USER_A token returned USER_B payment data.",
                "Fragment collected. See findings/BOLA-FINDING.txt for full write-up.",
                "",
                ">> LEARN: BOLA = Broken Object Level Authorization (OWASP API #1)",
                "   The API checked that the token was valid — but NOT that user_a owns PAY-2099.",
                "   Any user can access any other user's data by changing the object ID in the URL.",
                "   Fix: server must verify ownership on every request, not just authentication.",
              ],
            };
          }
          if (fullCmd.includes("PAY-1001") && fullCmd.includes("USER_A")) {
            return {
              lines: [
                "GET /payments/PAY-1001 — Status: 200 OK",
                'Response: {"payment_id":"PAY-1001","user_id":"user_a","amount":150.00}',
                "Legitimate access — this is USER_A's own payment.",
                "",
                ">> LEARN: This is what CORRECT authorization looks like",
                "   user_id in the response matches the authenticated user. Ownership verified.",
                "   Now try: test-api GET /payments/PAY-2099 --token USER_A to find the BOLA.",
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
        "Secrets management audits identify hardcoded credentials, API keys, tokens, and passwords embedded in source code, configuration files, CI/CD pipeline variables, container image layers, and infrastructure-as-code templates. OWASP A07:2021 (Identification and Authentication Failures) and A02:2021 (Cryptographic Failures) both address secrets management as a foundational control. GitGuardian's 2023 State of Secrets Sprawl report found over 10 million secrets exposed in public GitHub repositories — a 67% increase from 2022 — with the average exposed secret remaining valid and unrevoked for over 500 days after detection. The persistence of exposed secrets long after discovery is as much of a problem as the initial exposure.",
        "A mature secrets management program is built on three pillars: centralized storage, dynamic generation, and automated rotation. Centralized storage means all secrets live in a dedicated secrets store — HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or GCP Secret Manager — not in code, config files, environment variable files, or CI/CD dashboards. Dynamic generation means the secrets store generates short-lived, unique credentials on demand for each application instance or user session rather than distributing a single static password shared across all consumers. Automated rotation means credentials are replaced on a schedule or immediately upon any suspected exposure event, without requiring manual intervention.",
        "The NIST SP 800-57 key management guidelines provide the framework for secrets lifecycle management: generation (using cryptographically secure random number generators), distribution (over encrypted channels with authentication of the recipient), storage (in an HSM or software vault with access logging), use (via application runtime injection, never in code), rotation (on schedule or event-driven), and destruction (cryptographic erasure with audit trail). Auditors verify each phase of this lifecycle for every secret type in scope. The most common audit finding is that generation and storage are handled properly but rotation is either missing or manual.",
        "Secrets sprawl is the condition where secrets have propagated across multiple systems without central inventory. A single AWS access key pair might appear in: the original developer's laptop, three git commits (initial, update, and failed deletion), two CI/CD systems (old Jenkins and new GitHub Actions), a Docker image layer, a Kubernetes secret, and a configuration file on a legacy EC2 instance. When that key must be rotated after an exposure event, each location must be updated simultaneously — and if the inventory is incomplete, the old key survives in at least one location. GitGuardian estimates the average enterprise has over 1,000 unique secrets in sprawl across its developer toolchain.",
        "The git history problem is one of the most underappreciated aspects of secrets auditing. A developer who commits an API key on January 15 and deletes it in a subsequent commit on January 16 has not removed the key from git history — they have only removed it from the current HEAD. Every git clone performed before the deletion contains a full copy of the key in the object store. Every CI/CD run between the two commits executed with the key present. Every fork of the repository retains the secret permanently. Tools like git filter-branch and BFG Repo Cleaner can rewrite history on the main repository, but they cannot affect forks, clones, or any system that ran the code during the exposure window. The only correct security response when a secret is discovered in git history is to treat it as fully compromised and rotate it immediately, regardless of whether it was 'just a development key' or whether the repository was 'private.'",
        "CI/CD pipelines represent a distinct and frequently overlooked secrets exposure surface. Pipeline variables — stored as environment variables in Jenkins, GitHub Actions secrets, GitLab CI variables, or CircleCI environment contexts — are sometimes logged in build output (if a step runs set or env without filtering), accessible to pull request builds from forked repositories (if branch protection is misconfigured), or embedded in build artifacts. The 2023 CircleCI breach began with malware on a developer's laptop that exfiltrated CircleCI session tokens, which then allowed the attacker to access project environment variables including AWS credentials for hundreds of customer organizations. Auditors must review CI/CD secrets configuration, access controls on pipeline variables, and whether fork-based pull requests have access to production secrets.",
        "Container image secrets are a third exposure class. Multi-stage Dockerfile builds that copy secrets into an intermediate layer and then 'delete' them in a later layer still retain the secret — Docker image layers are immutable and additive; a secret copied in layer N and removed in layer N+1 is still accessible by extracting layer N from the image manifest. Tools like Dive (image layer inspector) or Trivy (which includes a secrets scanner in addition to CVE scanning) can enumerate secrets in container image layers. Auditors scan every image in the container registry, not just images currently running in production — a development image with embedded credentials pushed to a shared registry months ago may still be present and accessible.",
      ],
      technical: {
        title: "Secrets Scanning and Vault Configuration",
        body: [
          "Repository scanning methodology: run Gitleaks or detect-secrets against the full git history — not just the current HEAD — using the --log-opts='--all' flag to include all branches and all commits. Limit scanning to branches that have been pushed to the remote (local-only branches on developer workstations require separate scanning or reliance on pre-commit hooks). A secret committed three years ago and later deleted is still in git history, still valid until rotated, and present in every clone made before the deletion. For large repositories, scheduled scanning via GitHub Advanced Security secret scanning or GitGuardian provides continuous coverage as new commits arrive.",
          "Vault configuration audit checklist: (1) Audit logging — verify vault audit enable file has been run and audit logs are shipping to a SIEM or separate log account. Without audit logs, there is no record of who accessed which secrets or when. (2) Secret TTLs — review the max_ttl for each secret engine. Human access tokens should not exceed 24 hours; service account tokens should not exceed 1 hour for highly privileged credentials. (3) Authentication methods — flag any static root tokens in use. Root tokens have unlimited permissions and do not expire; they should be revoked after initial setup. AppRole (for applications), Kubernetes auth (for pods), and AWS IAM auth (for EC2/ECS/Lambda) are the appropriate production auth methods. (4) Dynamic secrets — verify the database secrets engine is configured for any database credential rotation. Dynamic secrets eliminate the entire class of 'stolen database password' because each consumer gets a unique, time-limited credential generated on demand.",
          "Evidence collection for secrets audit findings: for each exposed secret found in git history, collect the commit SHA, author, date, file path, and line number. Collect the output of aws iam get-access-key-last-used (for AWS keys) or equivalent API calls to determine if the exposed credential was used after the exposure date — this determines whether the finding is 'potential exposure' or 'confirmed exploitation.' Document the exposure window (time from commit to rotation or repository visibility change). This evidence is required for breach notification analysis under GDPR Article 33 (72-hour notification requirement) and state-level breach notification laws.",
          "Pre-commit hooks and CI gates: recommend implementing detect-secrets or gitleaks as a pre-commit hook using the pre-commit framework. The hook scans the diff of each commit before it is accepted and rejects commits that contain recognized secret patterns. This is a preventive control that catches new secrets before they enter the repository. CI/CD gates — running the same scan on every pull request — provide a second layer of defense for cases where pre-commit hooks are bypassed or not installed on all developer machines. Neither control is a substitute for the centralized secrets store architecture, but they significantly reduce the rate at which secrets enter the codebase.",
          "Rotation verification: after rotating a compromised or expired credential, auditors verify the old credential is actually invalid (not still accepted by the target service), the new credential is stored in the approved secrets store (not hardcoded in the fix commit), and the rotation was performed without service disruption (confirming the application retrieved the new credential from the secrets store rather than having the old credential baked in). Some organizations believe rotation has occurred when they update the secrets store entry — but if applications cache the old credential at startup, the old credential remains in active use until each instance restarts. Blue-green deployments or pod restarts are required to complete rotation in containerized environments.",
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
          "The 2022 Uber breach began when an attacker used MFA fatigue social engineering to compromise a contractor's Uber credentials — repeatedly sending MFA push notifications until the exhausted user approved one. But social engineering gaining an initial foothold was only the beginning. The attacker's rapid lateral movement across Uber's internal systems depended entirely on finding hardcoded admin credentials stored in plain text in a PowerShell script on an internal network share. Those static credentials gave access to Thycotic — Uber's Privileged Access Management (PAM) system — which in turn stored credentials for every other internal system including AWS, Google Workspace, VMware vSphere, and production databases.",
          "The root cause analysis reveals a critical gap in Uber's secrets management program scope. Their program covered source code repositories (GitHub scanning was in place) but did not extend to internal file shares, legacy scripts, and operational runbooks accumulated over years of DevOps work. A PowerShell script containing admin credentials for the PAM system had never been flagged because no secrets scanner was pointed at the network file share where it lived. This is a textbook example of secrets sprawl: the credential existed in an inventory that no one had catalogued as a secrets exposure surface.",
          "The regulatory and legal consequences were multifaceted and ongoing at the time of the 2022 incident. Uber was still operating under a consent decree and FTC oversight stemming from the 2016 breach (the one that resulted in a $148M settlement and criminal charges against the CISO for concealing the breach). The 2022 incident occurred while the company was actively demonstrating to regulators that it had improved its security program. The CISO of Uber at the time publicly stated the breach scope was limited — a claim that was later disputed as more systems were confirmed compromised. For auditors, the Uber case establishes the requirement that secrets management scope documentation must include non-standard locations: wiki pages, runbooks, operational scripts, file shares, and email attachments.",
          "Remediation steps taken by Uber after the breach included: immediate rotation of all credentials accessible through Thycotic, deployment of secrets scanning to internal file shares (not just code repositories), migration of PowerShell operational scripts to Vault-managed credential retrieval, and enhanced MFA fatigue protection (number matching, additional context in push notifications). The broader industry takeaway drove widespread adoption of FIDO2 phishing-resistant MFA to eliminate the MFA fatigue attack vector entirely — a control that directly addresses the initial access method used in this breach.",
          "For auditors assessing secrets management programs after reviewing the Uber case: include a scope exercise in every secrets management audit. Ask the client to enumerate every location where a credential could exist — not just where credentials should exist. Common missed locations include: CI/CD pipeline logs (secrets echoed to build output), browser-saved passwords on developer workstations, mobile device management (MDM) configuration profiles, network monitoring tools (SNMP community strings, Nagios credentials), and legacy backup archives. The discovery that a secrets management program has undocumented scope gaps is often the highest-value finding of the entire audit.",
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
        "Scan full git history — secrets deleted from HEAD are still in every commit object and every historical clone",
        "Dynamic secrets with short TTLs eliminate the value of a stolen credential before an attacker can use it",
        "Secrets scanning scope must cover repositories, CI/CD variables, container image layers, file shares, and operational scripts",
        "Rotation must happen immediately after any possible exposure — not just on schedule — with verification that old credentials are actually invalid",
        "Vault audit logging is non-optional — without it, there is no record of who accessed which secrets during an incident",
        "AppRole and Kubernetes auth replace static root tokens — static root tokens must be revoked after initial setup",
        "Pre-commit hooks catch new secrets before they enter the repository; CI gates provide a second defensive layer",
        "Secrets sprawl audit: enumerate every location where credentials could exist, not just approved locations",
        "MFA fatigue attacks (as in Uber 2022) require FIDO2 phishing-resistant MFA, not just TOTP or push notifications",
        "After any breach involving credential theft, audit cloudtrail/access logs for the exposure window to determine if exploitation occurred",
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
          "",
          "# ─────────────────────────────────────────────────────────────────────",
          "# WHAT YOU'RE LOOKING AT: Three critical secrets violations in one file",
          "#",
          "# 1. Plaintext database password in a config file committed to git.",
          "#    Anyone with repo access — past or present — has this password.",
          "#    Fix: store in HashiCorp Vault, AWS Secrets Manager, or env variable.",
          "#",
          "# 2. AWS Access Key ID (AKIA prefix = real, active key format).",
          "#    If this repo is or ever was public, this key is compromised.",
          "#    Check: aws cloudtrail lookup-events to see if it was misused.",
          "#",
          "# 3. AWS Secret Access Key (the pair that authenticates AWS API calls).",
          "#    Together, AKID + secret key = full programmatic AWS access.",
          "#    An attacker with these can spin up EC2, access S3, exfiltrate data.",
          "#",
          "# The TODO comment says 'jsmith, 2023-01-15' — this has been sitting here",
          "# for over a year. This is how real exposures happen.",
          "# ─────────────────────────────────────────────────────────────────────",
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
          "",
          "FINDING 1 — Audit logging: DISABLED",
          "  Risk: No record of who accessed which secrets or when.",
          "  Fix: vault audit enable file file_path=/var/log/vault/audit.log",
          "  Why it matters: If a secret is misused, you need to know who retrieved it.",
          "",
          "FINDING 2 — Secret TTL: 87600h (10 years)",
          "  Risk: A stolen secret is valid for 10 years before automatic expiry.",
          "  Fix: max_ttl = 24h for human access, 1h for automated systems.",
          "  Why it matters: Short TTL = stolen credential expires before attacker can use it.",
          "",
          "FINDING 3 — Auth method: Token (static root token)",
          "  Risk: Static root tokens never expire and have unlimited permissions.",
          "  Fix: Use AppRole (for apps) or Kubernetes auth (for pods). Revoke root token.",
          "  Why it matters: Root token = keys to the entire Vault. Must not be used regularly.",
          "",
          "FINDING 4 — Dynamic secrets: NOT configured",
          "  Risk: All secrets are static long-lived credentials.",
          "  Fix: Configure Vault database secrets engine — generates temporary DB credentials",
          "       per-request, auto-revoked after TTL. No static password anywhere.",
          "  Why it matters: Dynamic secrets eliminate the entire class of 'stolen credential' risk.",
          "",
          "OVERALL: Vault is installed but providing no meaningful security benefit.",
          "The database.yml still uses hardcoded credentials — Vault is bypassed entirely.",
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING: The difference between having a secrets tool",
          "and actually using it. Vault without proper config = false sense of security.",
          "Real Vault setup: dynamic secrets + short TTL + audit log + no static tokens.",
          "─────────────────────────────────────────────────────────────────────",
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
                ">> LEARN: Secrets scanner output is only the beginning",
                "   Step 1: Identify (done). Step 2: Verify — is this real or a test fixture?",
                "   Step 3: Assess exposure — was this repo ever public? Who had access?",
                "   Step 4: Rotate immediately. Step 5: Audit logs for misuse during exposure window.",
                "   Step 6: Add pre-commit hook to prevent re-occurrence.",
                "",
                ">> LEARN: The git history is permanent",
                "   'git rm' removes from current HEAD — it does NOT remove from git history.",
                "   Every clone, fork, and CI run that ran before deletion has a copy.",
                "   Real removal: git filter-branch or BFG Repo Cleaner, then force-push all branches.",
                "   Even then, any fork or clone retains the secret. Treat it as compromised.",
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
        "Cloud security audits verify that preventive controls (guardrails that block dangerous actions before they happen) and detective controls (mechanisms that identify policy violations after they occur) are properly configured, comprehensive, and actively monitored. AWS provides three primary guardrail mechanisms that operate at different layers: Service Control Policies (SCPs) at the AWS Organizations level define the maximum permission boundary for all accounts in an organizational unit; AWS Config Rules provide continuous compliance evaluation against defined security policies; and CloudTrail captures an immutable record of every API call made within the account. Understanding how these three mechanisms interact — and where each can fail — is the foundation of cloud security auditing.",
        "Service Control Policies are the most powerful preventive control in the AWS security model and the most frequently misconfigured. SCPs define what actions can be performed within an AWS account regardless of what IAM policies grant to individual users or roles. An SCP that denies S3 public bucket creation cannot be overridden by a root user, an administrator, or any IAM policy within the affected account — SCP denials are absolute at the organization level. This makes SCPs the appropriate place to enforce non-negotiable security baselines: CloudTrail must always be enabled, public S3 access must always be blocked, root account API calls must always be denied. Auditors verify SCP coverage by reviewing the organization's SCP set against the CIS AWS Foundations Benchmark controls that are appropriate for SCP enforcement.",
        "AWS Config Rules evaluate resources against security policies and flag non-compliant resources. Unlike SCPs (which prevent actions), Config Rules detect existing non-compliant states. A managed Config rule for 's3-bucket-public-read-prohibited' continuously evaluates every S3 bucket in the account and reports any bucket that allows public read access. Config Rules run on two triggers: configuration change (evaluates a resource when its configuration changes) and periodic (evaluates all resources on a schedule, typically hourly or daily). The combination of change-triggered and periodic rules ensures both new violations and drift are caught. AWS provides over 300 managed Config rules covering common controls; custom rules can be written as Lambda functions for organization-specific requirements.",
        "CloudTrail is the detective control layer for all AWS API activity. Every AWS API call — from the AWS Management Console, CLI, SDK, or service-to-service — is logged as a CloudTrail event. A properly configured CloudTrail setup includes: enabled in all AWS regions (not just the primary region), multi-region trail with global service events included (to capture IAM and STS events which are global), log file validation enabled (SHA-256 hash chain that detects log tampering or deletion), logs stored in a dedicated security account (so that compromised accounts cannot delete their own audit trail), and CloudWatch Logs integration with metric filters and alerts for high-risk events. The most critical CloudTrail alerts: root account console login, SCP policy modification, CloudTrail trail disabling, IAM administrator policy changes, and unusual API call volume from any principal.",
        "The relationship between these three controls creates defense in depth. SCPs prevent the most dangerous actions from being taken at all. Config Rules detect when less-dangerous but still non-compliant configurations exist. CloudTrail records everything that happens, enabling incident investigation and threat detection. An organization that has all three properly configured has significantly better visibility and control than one relying only on IAM policies. NIST SP 800-53 control families CA (Assessment, Authorization, and Monitoring), AU (Audit and Accountability), and CM (Configuration Management) all map directly to the combination of SCPs, Config, and CloudTrail in a cloud context.",
        "Cloud security posture management (CSPM) tools — AWS Security Hub, Prisma Cloud, Wiz, and Orca Security — aggregate findings from Config Rules and other detection sources into a unified compliance score and prioritized finding list. Security Hub integrates directly with the CIS AWS Foundations Benchmark (180+ automated checks), PCI DSS, and NIST 800-53 compliance standards, automatically running checks and updating scores in real time. An auditor reviewing a cloud environment should begin by examining the Security Hub compliance score and its breakdown by control family before drilling into individual findings. A score below 80% on CIS Foundations Benchmark is a significant finding in any security audit.",
        "Multi-account architecture introduces additional audit complexity. Enterprise AWS environments typically use AWS Organizations with dozens or hundreds of accounts separated by environment (dev, staging, production), business unit, and compliance scope. Auditors must verify that: SCPs are attached at the appropriate OU level and not overridden by account-level exceptions, CloudTrail is enabled in every account (not just the management account), Config Rules are deployed organization-wide via conformance packs (not just in selected accounts), and Security Hub is configured in aggregator mode with a designated security account collecting findings from all member accounts. The most common gap in multi-account environments is that security controls were deployed in the management account but not rolled out to all member accounts, creating blind spots in subsidiary or recently acquired accounts.",
      ],
      technical: {
        title: "Key Cloud Guardrails to Audit",
        body: [
          "SCP audit methodology: obtain the complete SCP set attached to the organization, each OU, and each account. Map each SCP to the controls it enforces. Flag any accounts with fewer SCPs than the organizational baseline — these may be legacy accounts that predate the SCP program or accounts granted exceptions. Verify the following minimum SCP controls are present: (1) Deny s3:PutBucketPolicy and s3:DeleteBucketPolicy on public-access configurations. (2) Deny cloudtrail:StopLogging and cloudtrail:DeleteTrail to prevent audit trail destruction. (3) Deny iam:CreateUser without MFA enforcement (or deny IAM user creation entirely, requiring roles instead). (4) Restrict EC2 launches and other services to approved regions. (5) Deny AWS root account API key usage. Test each SCP by attempting the denied action from a test account in the target OU — a well-formed SCP should return 'AccessDenied: explicitly denied by a service control policy.'",
          "Config Rule coverage assessment: run aws configservice describe-config-rules to list all deployed rules. Compare against the CIS AWS Foundations Benchmark rule set. Flag any CIS control not covered by a Config Rule — these controls are either unchecked or relying on manual audit processes. Priority gaps: iam-root-access-key-check (root account must not have active access keys), mfa-enabled-for-iam-console-access (all console users must have MFA), ec2-imdsv2-check (all EC2 instances must use IMDSv2 to prevent SSRF credential theft), cloudtrail-log-file-validation-enabled, and s3-bucket-server-side-encryption-enabled. Each missing rule represents a control that may have been in a non-compliant state for months or years without detection.",
          "CloudTrail configuration verification: run aws cloudtrail describe-trails and verify each field. Required configuration: IsMultiRegionTrail: true (covers all regions, not just us-east-1), IncludeGlobalServiceEvents: true (captures IAM and STS events), LogFileValidationEnabled: true (tamper detection), HomeRegion: matches the primary account region. Verify the trail's S3 bucket is in a dedicated security account — not the same account being audited. Check the S3 bucket policy on the CloudTrail destination bucket: it should allow only CloudTrail service to write, deny s3:DeleteObject to all principals, and deny public access. Verify CloudWatch Logs integration is active and that metric filters exist for the five high-priority alert conditions listed in CIS AWS Benchmark control 4.x.",
          "CloudWatch alert verification: for each required metric filter (root account login, unauthorized API calls, MFA policy changes, network ACL changes, security group changes), run aws cloudwatch describe-alarms and confirm an alarm exists with SNS notification to an email or ticketing system. Test the alert end-to-end by triggering the condition (in a test account) and confirming the notification is received. Alert configuration that exists in CloudWatch but has an invalid SNS topic ARN or a broken email subscription is functionally equivalent to no alert at all — verify the entire notification chain, not just the CloudWatch alarm configuration.",
          "IMDSv2 enforcement is a specific and critically important Config Rule for cloud security audits. The EC2 instance metadata service (IMDS) at 169.254.169.254 returns IAM role credentials to any process running on the instance. IMDSv1 returns these credentials to any HTTP request to that address — including requests made by SSRF vulnerabilities in applications running on the instance. IMDSv2 requires a PUT request with a TTL header to obtain a session token before metadata can be accessed, which a basic SSRF cannot perform. The Capital One breach (2019) exploited IMDSv1 via an SSRF vulnerability. The ec2-imdsv2-check Config Rule identifies all instances still running IMDSv1. In a well-managed environment, this rule should show zero non-compliant instances.",
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
          "Capital One's 2019 breach is the canonical cloud security case study because it illustrates precisely how the absence of specific guardrails creates cascading failure. The initial access vector was a Server-Side Request Forgery (SSRF) vulnerability in a web application firewall (WAF) that Capital One had configured incorrectly. The WAF, running on an EC2 instance with an attached IAM role, was misconfigured to allow external HTTP requests to be proxied through it. An attacker sent an HTTP request to the WAF that directed it to retrieve http://169.254.169.254/latest/meta-data/iam/security-credentials/[role-name] — the IMDSv1 EC2 instance metadata endpoint. Because the WAF did not validate whether the requested URL was internal or external, it retrieved and returned the IAM role's temporary AWS credentials directly to the attacker.",
          "Two specific guardrail failures enabled the breach. First, the EC2 instance running the WAF was using IMDSv1 (not IMDSv2). IMDSv2 requires a pre-flight PUT request to obtain a session token — a step that a basic SSRF attack cannot perform, because SSRF vulnerabilities typically only issue GET requests. Had IMDSv2 been enforced via an account-wide Config Rule (ec2-imdsv2-check) or a metadata-options policy at the instance or account level, the attacker's SSRF request to the metadata service would have returned an error rather than credentials. This single technical control would have stopped the breach at the initial access stage.",
          "The second failure was the IAM role's permissions. The EC2 instance running the WAF had an attached IAM role with broad S3 read permissions — permissions appropriate for some operations but far exceeding what a WAF needs. Least-privilege IAM policies would have restricted the role to only the specific S3 bucket and specific actions required for the WAF's function. Instead, the role could read S3 objects across Capital One's entire AWS account, which is how the attacker was able to exfiltrate 106 million customer records from numerous buckets over the four-month exposure window.",
          "The monitoring failure was equally consequential. CloudTrail logged every S3 GetObject API call made using the stolen credentials — over 30 million individual API calls across the four-month exposure period from March to July 2019. No CloudWatch alert triggered on this volume because no volume-based anomaly detection rule existed for S3 API call rates from the compromised role. A properly configured alert with a threshold such as 'more than 10,000 S3 GetObject calls from this role in one hour' would have fired on day one of the exfiltration, enabling detection and response within hours rather than months. The breach was ultimately discovered only when the attacker posted data samples on GitHub and another researcher reported it to Capital One.",
          "The regulatory consequence — a $190M FTC and OCC settlement — was one of the largest cloud security enforcement actions at the time. Capital One's consent order required implementation of specific cloud security controls including: mandatory IMDSv2 enforcement across all EC2 instances, deployment of AWS Config Rules for all CIS Benchmark controls, implementation of volumetric alerting on S3 API activity, and quarterly cloud security posture reviews by a qualified third party. Each requirement maps directly to a specific guardrail that was absent. For auditors, the Capital One case provides a concrete, real-world validation of why each individual guardrail on the cloud security checklist matters — not as a compliance checkbox, but as a specific barrier to a specific attack path.",
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
        "SCPs override IAM — they are the highest-priority preventive control in AWS and cannot be overridden by account administrators",
        "CloudTrail must be enabled in ALL regions, not just us-east-1, with log file validation and cross-account storage",
        "AWS Config rules provide continuous compliance — every resource is evaluated on change and periodically, not just at audit time",
        "Volume-based CloudWatch alerts (S3 reads per hour, unusual API call rates) catch exfiltration that signature-based detection misses",
        "IMDSv2 enforcement prevents SSRF-based credential theft from EC2 instance metadata — this alone would have prevented the Capital One breach",
        "IAM roles attached to EC2 instances require least-privilege scoping — the WAF role should never have had broad S3 read access",
        "Multi-account environments need organization-wide Config Rule deployment via conformance packs — account-level-only deployment creates blind spots",
        "Security Hub compliance scores below 80% on CIS Foundations Benchmark indicate systemic control gaps",
        "CloudTrail log file validation detects tampering; logs must be stored in a separate security account to survive account compromise",
        "Test SCPs actively — attempt the denied action from a test account and confirm AccessDenied is returned",
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
        "IAM privilege analysis is one of the highest-value activities in a cloud security audit because excessive permissions are both extremely common and directly enable the most severe attack outcomes. In AWS, the most frequent violations are: developer IAM users with AdministratorAccess attached (either granted for convenience and never restricted), service roles with wildcard (*) resource permissions (granted because it was easier than scoping to specific resources), IAM users with active access keys older than 90 days (never rotated because no rotation policy exists), and service accounts for third-party integrations with far more permissions than the integration requires. Each of these patterns is detectable in minutes using standard AWS CLI commands and IAM analysis tools.",
        "The principle of least privilege — defined in NIST SP 800-53 control AC-6 — requires every principal (IAM user, role, or service account) to have only the minimum set of permissions required to perform its intended function, and only for the duration required. In practice, least privilege requires two things that organizations consistently fail to implement: granular initial scoping (granting specific actions on specific resources rather than broad wildcard policies) and ongoing review (removing permissions as roles change and access is no longer needed). AWS IAM Access Analyzer automates the ongoing review by analyzing CloudTrail logs to identify permissions that exist in a policy but have never been used, generating 'unused access' findings that allow policy pruning.",
        "Privilege escalation in IAM is a class of attack where a user with limited permissions can perform a sequence of API calls that results in them gaining administrative access. The IAM privilege escalation taxonomy, documented extensively by Spencer Gietzen of Rhino Security Labs, covers over 20 distinct escalation paths. The simplest: a user with iam:CreatePolicyVersion permission can create a new version of any managed policy that grants AdministratorAccess, then set that version as the default. If the user can also attach managed policies to their own account (iam:AttachUserPolicy), they can grant themselves full administrative access in two API calls. These escalation paths are often invisible in traditional IAM reviews that only look at directly attached permissions, not permission chains.",
        "AWS IAM Access Analyzer, launched in 2019, identifies two categories of findings relevant to privilege audits. External access findings detect IAM policies that grant access to external principals (other AWS accounts, AWS services with cross-account trust, or public access). Access preview findings model what permissions would be granted before a policy change is applied. For privilege escalation analysis, third-party tools provide more depth: PMapper (Principal Mapper) builds a directed graph of all IAM principals and permissions in an account and computes all paths from any principal to AdministratorAccess or any target permission. Cloudsplaining generates an HTML report analyzing all IAM policies for privilege escalation vectors, excessive permissions, and resource wildcards.",
        "The IAM credential report is the foundational data source for every IAM audit. Generated via aws iam generate-credential-report followed by aws iam get-credential-report (base64-decoded CSV), the report contains every IAM user with: password enabled (Y/N), password last used date, MFA active (Y/N), access key 1 active (Y/N), access key 1 last used date, access key 1 last used service, and equivalent fields for access key 2. Automatic findings from credential report analysis: root account with active access key (CRITICAL, always), any IAM user with password enabled but no MFA (HIGH), any access key not used in 90 days (MEDIUM, candidate for deactivation), any access key last used service that does not match the user's job function (indicates permissions broader than needed). The credential report requires no special permissions beyond iam:GenerateCredentialReport and iam:GetCredentialReport.",
        "Third-party vendor and service account IAM review is a frequently overlooked aspect of privilege auditing. Enterprise AWS environments typically have dozens of IAM roles and users created for SaaS integrations, third-party security tools, and vendor support access. These accounts often receive AdministratorAccess or broad custom policies granted at initial setup ('we'll scope it down later') and are never reviewed as the relationship with the vendor matures. The Okta 2022 breach involved a third-party support vendor (Sitel) whose account had excessive permissions to Okta's internal support systems — permissions that were never reviewed after the vendor contract changed scope. Auditors must enumerate all external-facing IAM entities and apply the same least-privilege analysis as internal accounts.",
        "Cross-account IAM roles create trust relationships between AWS accounts and require special scrutiny in multi-account environments. A role that trusts an external account (sts:AssumeRole from account B into account A) effectively grants the trusted account all permissions the role has. Auditors review the trust policy of every cross-account role: the principal must be a specific account ID or role ARN (not a wildcard), the External ID condition must be present for third-party roles (preventing confused deputy attacks), and the permissions granted to the cross-account role must be scoped to the minimum required by the use case. AWS IAM Access Analyzer's external access findings automatically flag roles with overly broad trust policies, including any role that can be assumed by any principal in an external account.",
      ],
      technical: {
        title: "IAM Audit Techniques",
        body: [
          "Credential report analysis workflow: download the credential report and parse the CSV. Automated analysis steps: (1) Flag any row where user = '<root_account>' and access_key_1_active = 'true' — this is always a CRITICAL finding. (2) Flag any user where password_enabled = 'true' and mfa_active = 'false' — HIGH finding per CIS Benchmark control 1.10. (3) Calculate age of active access keys: current_date minus access_key_1_last_rotated. Flag any key older than 90 days as MEDIUM, older than 180 days as HIGH. (4) Review access_key_N_last_used_service columns against the user's intended function — a developer's key used for ec2:RunInstances might be expected, but iam:* or kms:Decrypt from a read-only reporting user is not. The credential report can be parsed with a simple Python script or imported into a spreadsheet for manual review.",
          "Policy analysis with Cloudsplaining: run cloudsplaining scan --input-dir ./iam-policies --output-dir ./report to analyze all IAM policy documents downloaded from the account. Cloudsplaining checks each policy for: wildcard actions (Action: *), resource wildcards with sensitive actions (iam:*, s3:*, kms:* with Resource: *), privilege escalation vectors (specific combinations of permissions that enable escalation), data exfiltration permissions (s3:GetObject with Resource: *, ssm:GetParameter, secretsmanager:GetSecretValue), and infrastructure modification permissions (ec2:AuthorizeSecurityGroupIngress, vpc:*). The HTML report ranks all principals by risk score and provides a drill-down into each finding.",
          "PMapper privilege escalation analysis: run python3 -m principalmapper graph create to build the IAM graph for an account. Then run python3 -m principalmapper query 'who can do iam:* with *' to identify all principals that can perform any IAM action on any resource — which is equivalent to finding all paths to AdministratorAccess. For each identified principal, run python3 -m principalmapper argquery --principal 'arn:aws:iam::ACCOUNT_ID:user/developer' to show all escalation paths available to that specific principal. Document each path with the sequence of API calls required, the permissions enabling the path, and the source of those permissions (which policy, attached to which entity). This analysis often reveals that a developer with read-only permissions actually has an escalation path to admin through an indirect permission chain that no human reviewer would have noticed.",
          "Access key rotation verification: beyond flagging old keys in the credential report, auditors verify that an access key rotation procedure exists, is documented, and has been tested. The procedure must include: automated detection of keys older than 90 days (AWS Config rule access-keys-rotated), automated notification to the key owner and their manager, a defined grace period for rotation (30 days maximum for high-privilege accounts), and automated deactivation (not just notification) if rotation is not completed by the deadline. Without automated enforcement, rotation policies exist on paper but rarely in practice. Test by creating a dummy key in a test account and verifying the detection and notification chain fires within the expected timeframe.",
          "Service role scoping remediation guidance: when excessive permissions are found on service roles, the remediation is always specific permission replacement. Replace Action: * with the specific actions the service uses (verifiable from CloudTrail last-used data). Replace Resource: * with the specific resource ARN(s) the service accesses. Add Condition blocks where appropriate (aws:RequestedRegion, aws:SourceVpc, aws:SourceIp) to further limit the policy's applicability. After remediation, run a functional test to confirm the service operates correctly with the new scoped policy — overly restrictive remediation can break legitimate functionality and cause teams to revert to wildcard policies. Document the test results as evidence of remediation verification.",
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
          "The 2022 Okta breach began on January 16 when attackers compromised the workstation of a Sitel support engineer who had access to Okta's internal support tool. Sitel was a third-party customer support vendor contracted by Okta to handle Tier 1 support tickets. The support engineer's account had access to a super-admin dashboard within Okta's support systems with the ability to view customer tenant configurations, reset passwords, and manage user accounts for Okta customers. The breach was not detected until a screenshot of the attacker's access was posted publicly on Twitter on March 22 — over two months after initial compromise.",
          "The IAM audit failure at the core of the Okta breach was not that the support engineer's account was compromised — social engineering and endpoint compromise are difficult to fully prevent. The failure was that the support account had permissions far exceeding what Tier 1 support tasks actually required. Tier 1 support typically needs to view account configurations and escalate tickets — not to reset multi-factor authentication, view sensitive tenant security logs, or access all customers' dashboards simultaneously. Over-permissioned support accounts are the rule rather than the exception in enterprise environments because support tool vendors often require 'admin-level' access to be able to help with any possible customer issue, and those permissions are granted without ongoing review.",
          "The detection failure was equally damaging. Okta's internal security team was notified by Sitel that the incident had occurred on January 20, four days after the breach. Okta's analysis determined the attacker had a five-day window of access. However, the scope of what was accessed during those five days was not fully communicated to customers until March — over two months later — after external public disclosure forced the timeline. The CISO publicly stated that the blast radius was 'approximately 2.5% of customers' — a statement that generated significant backlash because the methodology for determining which tenants were unaffected was not disclosed. From an audit perspective, the Okta case demonstrates that an effective IAM program must include not just access controls but also the monitoring, detection, and communication capabilities to identify and contain access events promptly.",
          "Remediation steps Okta implemented following the breach: termination of the Sitel contract and migration of support functions in-house, implementation of just-in-time (JIT) access provisioning for all support engineers (support accounts granted on-demand with approval rather than persistent access), deployment of behavioral analytics to flag anomalous support account activity (accessing an unusual number of customer tenants, accessing tenants not associated with open support tickets), and mandatory annual third-party IAM reviews for all vendor accounts with access to customer systems. The broader industry response accelerated adoption of JIT privileged access and PAM tools for third-party vendor access, treating vendor accounts as inherently higher risk than internal accounts regardless of the trust relationship.",
          "For auditors, the Okta breach drives a specific audit procedure for third-party vendor IAM: (1) Enumerate all vendor accounts with any access to customer or production systems. (2) For each vendor account, document the permissions granted, the business justification, and the date of last review. (3) Compare granted permissions against the actual tasks performed during the review period (using access logs if available). (4) Flag any vendor account with permissions broader than the documented need. (5) Verify that vendor accounts have monitoring and alerting equivalent to or greater than internal accounts — vendor accounts represent a trust dependency on a third party's security posture and should be treated accordingly. Third-party IAM review is now an explicit requirement in SOC 2 Type II assessments under the Common Criteria CC6.1.",
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
        "AdministratorAccess on individual IAM users is almost never justified — use roles with specific permissions and time-bounded sessions",
        "Access keys older than 90 days are a finding — automate rotation with AWS Config rule access-keys-rotated and enforcement",
        "Privilege escalation paths exist beyond direct permissions — use PMapper or Cloudsplaining to analyze indirect chains",
        "Vendor and service accounts need the same least-privilege review as human accounts and should be reviewed more frequently",
        "IAM credential reports are the fastest audit starting point — flag root access keys, users without MFA, and stale access keys immediately",
        "iam:CreatePolicyVersion combined with iam:AttachUserPolicy is a two-step path to AdministratorAccess — flag both permissions together",
        "iam:PassRole + ec2:RunInstances is a privilege escalation path — an attacker can launch EC2 with any role, including admin roles",
        "AWS IAM Access Analyzer unused access findings identify permissions granted but never used — excellent candidate for policy pruning",
        "Cross-account roles must have explicit External ID conditions to prevent confused deputy attacks from unauthorized principals",
        "Just-in-time (JIT) access provisioning for privileged roles eliminates persistent standing access that attackers can exploit",
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
        "Container security audits evaluate the complete container lifecycle across four distinct phases. The build phase covers base image selection (outdated or unverified base images introduce OS-level CVEs), Dockerfile best practices (non-root USER directive, minimal base images, multi-stage builds to exclude build tools from production images), and secrets in layers (credentials copied into intermediate layers and 'deleted' in later layers remain accessible by extracting the intermediate layer). The registry phase covers access controls (who can push and pull images), image signing (using Notary or Sigstore to verify image provenance and integrity), and vulnerability scanning policies (blocking images above a severity threshold from being pushed or pulled). The runtime phase covers container configuration misconfigurations that create escape paths. The orchestration phase covers Kubernetes RBAC, network policies, pod security, and secrets management. Each phase has distinct tooling and audit procedures.",
        "The three most critical container security findings — in order of severity — are: (1) Running containers as root (UID 0). If a process inside the container achieves a container escape via a kernel vulnerability, it lands on the host as root, with full control of the host node. Container processes should run as a non-root UID specified in the Dockerfile USER directive or Kubernetes securityContext.runAsNonRoot. (2) Mounting the Docker socket (/var/run/docker.sock) inside a container. The Docker socket is the control plane for the Docker daemon. Any process with access to the socket can issue Docker API commands — including running new privileged containers that mount the host filesystem, which provides immediate full host access. This is not a container escape; it is host access by design. (3) Using base images with known critical CVEs. Running containers with CVE-2023-0465 in OpenSSL (CVSS 9.8, TLS certificate bypass) or CVE-2023-28531 in OpenSSH (pre-auth RCE) gives attackers a direct attack vector against the application. CIS Docker Benchmark covers all three of these and 97 additional controls.",
        "Kubernetes adds an orchestration layer with its own security controls that must be audited independently of the underlying container configuration. Pod Security Standards (PSA), which replaced the deprecated Pod Security Policies in Kubernetes 1.25, define three policy levels: Privileged (no restrictions), Baseline (prevents obvious escalations — no privileged containers, no hostPID, no hostNetwork), and Restricted (the most constrained — requires non-root UID, read-only root filesystem, no privilege escalation). Auditors verify which PSA level is enforced in each namespace. Production namespaces running application workloads should enforce Restricted; only infrastructure namespaces (CNI plugins, storage controllers) should have Baseline or lower. Namespaces with no PSA label at all default to Privileged — a common finding in clusters that predate PSA.",
        "Kubernetes RBAC is the authorization system for the Kubernetes API. The most critical RBAC findings: (1) ClusterAdmin bound to a user or service account that should not have it — ClusterAdmin grants full control over all resources in all namespaces. (2) Wildcard verbs (verbs: ['*']) or wildcard resources (resources: ['*']) in ClusterRole definitions. (3) Service accounts with RBAC permissions to exec into pods (pods/exec), access secrets (secrets, get), or modify deployments — a compromised pod with these permissions can enumerate secrets, modify workloads, and escalate to cluster admin through secondary chains. (4) Default service account usage — pods that don't specify a service account use the 'default' service account, which in many clusters has accumulated permissions over time.",
        "Container image vulnerability management requires integration at three points in the development lifecycle. Developers receive vulnerability feedback during development through IDE plugins (Snyk, Trivy VS Code extension) or local scans. CI/CD pipelines block images above a defined severity threshold from being pushed to the container registry — this is the most critical gate, as it prevents vulnerable images from entering the supply chain. Registry scanning provides continuous monitoring of images already in the registry, flagging when new CVEs are published that affect stored images. The most common audit finding is that CI/CD scanning exists but uses a CRITICAL-only threshold, allowing HIGH severity CVEs (often exploitable) to reach production. Best practice is CRITICAL and HIGH threshold for production images, CRITICAL-only for development images.",
        "Kubernetes secrets have a critical encryption-at-rest gap that is frequently overlooked. By default, Kubernetes stores all secrets in etcd — the cluster's key-value store — as base64-encoded strings, not encrypted. Base64 is not encryption; it is encoding. Any attacker with read access to etcd (or to etcd backups) can decode and read all secrets in the cluster. Kubernetes supports encryption at rest via an EncryptionConfiguration resource that specifies encryption providers (AES-CBC, AES-GCM, or KMS-backed). Auditors verify encryption at rest by examining the kube-apiserver configuration for the --encryption-provider-config flag. Cloud-managed Kubernetes services (EKS, GKE, AKS) offer envelope encryption using the cloud provider's KMS key — this should be enabled for all production clusters. Without it, every Kubernetes secret (database passwords, API keys, TLS certificates) is readable by anyone with etcd access.",
        "Network policies in Kubernetes define allowed ingress and egress traffic between pods using label selectors. By default, Kubernetes allows all pod-to-pod communication within a cluster — all pods can reach all other pods on all ports. This flat intra-cluster network is equivalent to the pre-segmentation Target network that allowed lateral movement from the HVAC vendor to POS systems. Kubernetes network policies require a CNI plugin that supports them (Calico, Cilium, Weave — notably, the default kubenet plugin does not). Auditors verify that network policies are implemented, that default-deny policies exist in all namespaces (blocking all traffic unless explicitly allowed), and that egress policies limit pod communication to only required external endpoints. A cluster with no network policies is a flat network where any compromised pod can communicate with any other pod or external service.",
      ],
      technical: {
        title: "Container Security Scanning",
        body: [
          "Image scanning workflow: integrate Trivy into the CI/CD pipeline at the image build step, before the push to registry. Run trivy image --severity CRITICAL,HIGH --exit-code 1 to fail the build on critical or high findings. The --exit-code 1 flag causes Trivy to return exit code 1 when findings above the threshold are found, which CI/CD systems interpret as a build failure. Configure the registry (ECR, GCR, Docker Hub with Snyk integration) to also scan on push — this catches cases where CI scanning is bypassed or where new CVEs are published after an image is already in the registry. For registry scanning, configure alerts when existing images have new CVEs published against them; this drives remediation of images already in production.",
          "Runtime configuration audit checklist — for each container/pod in scope, verify: (1) runAsUser is not 0 (root). (2) allowPrivilegeEscalation is false (prevents setUID/setGID binaries from elevating privileges). (3) privileged is false (privileged containers have access to all Linux kernel capabilities). (4) No hostPID, hostNetwork, or hostIPC set to true (these share the host's process namespace, network stack, or IPC namespace with the container). (5) No volume mounts to sensitive host paths — especially /var/run/docker.sock, /proc, /sys, or / (root filesystem). (6) readOnlyRootFilesystem is true where possible (prevents attackers from writing tools or persistence mechanisms into the container filesystem). (7) Resource limits (requests and limits for CPU and memory) are defined (prevents resource exhaustion attacks).",
          "Kubernetes RBAC audit: run kubectl get clusterrolebindings -o json | jq to list all ClusterRole bindings and their subjects. Flag any binding where the role is 'cluster-admin' and the subject is a service account, a group containing 'system:authenticated', or a user account that is not an infrastructure operator. For all ClusterRole definitions, run kubectl get clusterroles -o json and review for wildcard verbs or resources. Use rbac-tool (open source) or kubectl-who-can to answer specific questions: 'who can exec into pods in the production namespace?' and 'who can read secrets in the kube-system namespace?' These queries reveal the blast radius of a compromised pod or user account.",
          "Dockerfile security review: examine each production Dockerfile for: FROM using a pinned specific version (not 'latest' — latest is a moving target that breaks reproducibility and may pull in vulnerabilities), USER directive specifying a non-root user (absent = root), no COPY of secret files (ssh keys, .env files, credentials), no RUN commands that install unnecessary packages without cleaning up (apt-get clean, rm -rf /var/lib/apt/lists/* after package installation), and multi-stage build usage for compiled languages (final stage contains only the binary, not build tools). Supply chain security requires that base images be pulled from trusted registries (Docker Hub official images, AWS ECR public gallery with provenance attestations) and verified using image signing (Sigstore Cosign, Notary).",
          "Container escape testing: in authorized penetration testing engagements, auditors validate container isolation by attempting known escape techniques from within a test container. With privileged: true and hostPID: true, an attacker can run nsenter --target 1 --mount --uts --ipc --net --pid -- /bin/bash to enter the host's namespaces from inside the container. With /var/run/docker.sock mounted, an attacker can run docker run -v /:/host --privileged alpine chroot /host sh to mount the host filesystem and obtain a root shell. These escape demonstrations are powerful evidence for remediation prioritization — seeing the escape confirmed in a test environment removes any ambiguity about whether the finding is theoretical.",
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
          "In February 2018, researchers at RedLock discovered that Tesla's Kubernetes cluster had its administrative dashboard exposed to the public internet without any authentication requirement. The Kubernetes dashboard (kubernetes-dashboard service) was deployed with a default configuration that included no login screen — a configuration that was common before Kubernetes 1.7 and persisted in older clusters that had never updated the dashboard deployment. From the unauthenticated dashboard, the attackers could browse all Kubernetes resources across all namespaces, including the secrets namespace where AWS IAM credentials were stored as Kubernetes Secrets.",
          "The technical failure chain illustrates how multiple container security gaps compound. First gap: the Kubernetes dashboard was accessible publicly without authentication. Second gap: AWS credentials were stored as Kubernetes Secrets without encryption at rest in etcd — they were base64-encoded and visible in the dashboard UI. Third gap: no Kubernetes Network Policy prevented external access to the dashboard service (LoadBalancer type service exposed directly to the internet). Fourth gap: no resource quotas or AWS cost anomaly detection that would have flagged the sudden spike in EC2 instances being launched by the stolen credentials. The attackers throttled their cryptomining workloads to stay within what they estimated would be below billing alert thresholds.",
          "The cryptomining operation was sophisticated in its evasion techniques. The mining workload was deployed in an unlabeled namespace to avoid appearing in the standard kubectl get pods output for the default namespace. CPU utilization was throttled to approximately 80% to avoid performance anomaly alerts. The mining pool communication was routed through CloudFlare CDN to avoid IP-based network blocking. The AWS region used for EC2 instances was chosen based on the cheapest compute pricing rather than the organization's primary region, which meant it fell outside regional billing alerts. This level of operational sophistication is typical of professional cryptojacking groups — they understand both Kubernetes and cloud infrastructure at a deep level.",
          "Detection and response: RedLock discovered the breach during a routine cloud security scan of publicly accessible Kubernetes dashboards — a scan methodology that found exposed dashboards at other organizations as well. Tesla was notified and responded within hours, rotating credentials, removing the exposed dashboard, and deploying network policies. The Kubernetes dashboard was reconfigured to require authentication via ServiceAccount tokens. The incident became a case study that drove: (1) Kubernetes dashboard authentication becoming the default in subsequent versions, (2) widespread adoption of Kubernetes Network Policies for ingress restriction, and (3) the CIS Kubernetes Benchmark control that explicitly prohibits unauthenticated dashboard access.",
          "The regulatory and reputational consequences for Tesla were limited because no customer data was accessed — only compute resources were stolen for cryptomining. However, the case established an important precedent: cloud infrastructure misconfigurations that enable resource theft can constitute a security incident even without data breach, and organizations have an obligation to secure their cloud infrastructure not just for data protection but for financial integrity. From an auditor's perspective, the Tesla case supports the inclusion of Kubernetes dashboard authentication, etcd encryption at rest, and network policy deployment as mandatory controls in any container security audit, not optional hardening recommendations.",
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
        "Never run containers as root — specify a non-root UID in the Dockerfile USER directive and enforce via Kubernetes securityContext.runAsNonRoot",
        "Mounting /var/run/docker.sock inside a container provides full host access — this is not an escape risk, it IS host access",
        "Scan container images in CI/CD with exit code 1 on CRITICAL/HIGH findings to block vulnerable images before they reach the registry",
        "Kubernetes etcd must have encryption at rest enabled — base64 encoding is not encryption and secrets are readable from etcd backups",
        "Default-deny Kubernetes Network Policies are required — the default allow-all intra-cluster network is a flat network equivalent to Target's pre-2013 environment",
        "privileged: true gives a container all Linux kernel capabilities — equivalent to running directly on the host as root",
        "Pod Security Admission (Restricted level) enforces a comprehensive set of runtime security controls at the namespace level",
        "Kubernetes dashboard, if deployed, must require authentication — unauthenticated dashboard access is a CRITICAL finding",
        "ClusterAdmin binding to service accounts outside infrastructure namespaces is an automatic HIGH finding",
        "Image signing (Sigstore Cosign) verifies image provenance — prevents supply chain attacks that substitute malicious images",
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
        "Infrastructure as Code (IaC) security scanning applies static analysis to Terraform, CloudFormation, AWS CDK, Ansible, Pulumi, and Bicep templates before they are deployed — catching security misconfigurations in the code review phase rather than after deployment. The principle is 'shift left': move security checks as early in the development lifecycle as possible. A security misconfiguration caught in a pull request costs minutes of developer time to fix and causes zero risk. The same misconfiguration caught after deployment may require a maintenance window, migration of data, and exposure of a vulnerability window — and if caught only after exploitation, it may result in a breach. NIST SSDF (SP 800-218) explicitly requires IaC security review as part of a secure development lifecycle.",
        "Common IaC security findings span all cloud providers and resource types. In AWS Terraform: S3 buckets without server-side encryption (aws_s3_bucket missing aws_s3_bucket_server_side_encryption_configuration), security groups with 0.0.0.0/0 ingress on sensitive ports (SSH port 22, RDP port 3389, database ports 3306/5432/1433), RDS instances without deletion protection (deletion_protection = false) or storage encryption (storage_encrypted = false), IAM policies with wildcard actions and resources, Lambda functions with overly permissive IAM execution roles, and CloudTrail without log file validation. Each of these has a corresponding tfsec or Checkov rule that fires automatically when the pattern is detected. In Azure: storage accounts with public blob access allowed, NSG rules permitting any-source traffic to management ports, and Key Vault without soft delete and purge protection.",
        "IaC scanning integrates into CI/CD pipelines at the pull request stage as a mandatory quality gate. When a developer submits a pull request that modifies infrastructure templates, the CI/CD system automatically runs tfsec or Checkov against the changed files. Findings above the configured severity threshold (typically CRITICAL and HIGH) fail the pipeline check, preventing the PR from being merged until findings are remediated. This transforms security review from a manual, periodic activity into an automated, continuous process that runs on every proposed infrastructure change. GitHub Advanced Security supports SARIF format output from IaC scanners, displaying findings directly in the pull request diff view alongside the code that caused them.",
        "Module security is a distinct IaC concern. Terraform modules are reusable infrastructure components that teams share across projects. A security flaw in a shared module propagates to every infrastructure deployment that uses it. Auditors evaluate the module library: Are modules sourced from the official Terraform Registry (where modules undergo automated verification) or from internal repositories (where governance may be inconsistent)? Do modules expose security-relevant configuration as variables (so consumers can enable encryption, restrict access), or do they hardcode insecure defaults? Are module versions pinned (source = 'org/module@v1.2.3') or floating (source = 'org/module' with no version, which allows a compromised module update to automatically deploy to all users)?",
        "Terraform state file security is another frequently overlooked IaC security concern. The Terraform state file (terraform.tfstate) contains the current configuration of every resource Terraform manages, including resource IDs, configurations, and in many cases sensitive values such as database passwords, private keys, and API tokens that were passed as resource arguments. State files stored locally or in unencrypted S3 buckets are a significant secrets exposure risk. Best practice requires: remote state storage in Terraform Cloud or an S3 bucket with encryption at rest and versioning enabled, state file access restricted to the CI/CD system and specific administrators (not all developers), state file encryption using a KMS customer-managed key, and state locking (via DynamoDB for S3 backend) to prevent concurrent modifications.",
        "Drift detection is the process of identifying infrastructure that has been modified outside of IaC management — typically through the AWS Console, CLI, or direct API calls rather than through Terraform apply. Drift creates security risk because manually applied changes bypass the IaC security scanning gate. A developer who manually adds a security group rule allowing their IP address for debugging purposes has created a change that tfsec will never scan, because the change was never committed to a Terraform file. Terraform Cloud and AWS Config both provide drift detection — Terraform Cloud's drift detection runs on a schedule and opens pull requests to bring drifted resources back into IaC-managed state. AWS Config continuously compares resource configuration against a defined baseline and flags any resource whose configuration does not match.",
        "IaC security testing includes both pre-deployment static analysis (tfsec, Checkov, KICS) and post-deployment runtime verification. After deploying infrastructure, auditors verify the deployed resource configuration matches the IaC intent by querying the cloud provider APIs directly. A Terraform configuration that declares aws_s3_bucket_server_side_encryption_configuration for a bucket should result in an S3 bucket with ServerSideEncryptionConfiguration returned by aws s3api get-bucket-encryption. If the deployed resource does not have the expected configuration, either the Terraform apply failed silently, the state file is out of sync, or manual drift has occurred. This post-deployment verification step is particularly important for compliance evidence: the IaC configuration alone is not sufficient audit evidence — the deployed resource configuration must be verified against the IaC specification.",
      ],
      technical: {
        title: "Running tfsec and Checkov",
        body: [
          "tfsec integration and usage: run tfsec ./terraform/ --minimum-severity HIGH to scan all .tf files recursively and report findings at HIGH and CRITICAL severity. Add --format sarif and redirect output to a SARIF file for GitHub Advanced Security integration — findings will appear directly in pull request annotations. For CI/CD integration, add the --soft-fail flag to collect all findings without failing the pipeline initially, then switch to hard fail (remove --soft-fail) once the baseline of existing findings has been remediated. tfsec supports custom checks written in YAML for organization-specific policies not covered by built-in rules — for example, requiring specific tagging standards or mandating specific KMS key ARNs for encryption.",
          "Checkov analysis: run checkov -d ./terraform/ --framework terraform to scan Terraform templates, or checkov -d ./kubernetes/ --framework kubernetes to scan Kubernetes manifests. Checkov's --output junitxml flag produces JUnit XML for CI/CD integration with Jenkins or GitLab. The --check CKV_AWS_18 flag runs a single specific check (in this case, CloudTrail log file validation). Use --skip-check to suppress specific checks with documented justifications — suppressions should be tracked in a spreadsheet or comments with business justification, reviewer name, and review date. Checkov's --external-checks-dir flag allows custom Python-based checks to be added alongside built-in checks.",
          "Baseline management for IaC scanning: new codebases typically have numerous pre-existing findings before IaC scanning is introduced. To avoid blocking all CI/CD activity while existing findings are remediated, create a baseline file (tfsec --format json > .tfsec-baseline.json) that records existing findings. Subsequent scans compare against the baseline and only fail on new findings. This allows teams to address existing findings systematically on a remediation timeline while preventing any new findings from being introduced. The baseline file should be committed to the repository and reviewed quarterly — findings in the baseline represent accepted technical debt with documented remediation plans.",
          "Evidence collection for IaC audit findings: for each finding, collect the tool output (tfsec or Checkov result JSON), the specific Terraform resource block causing the finding, the IaC file path and line number, and the severity rating with the associated policy reference (tfsec rule ID or Checkov check ID, which maps to CIS Benchmark, NIST, or PCI DSS controls). After remediation, collect a clean scan result showing zero findings for the previously failed checks. For compliance audits, the combination of (a) IaC scan gate in CI/CD, (b) clean scan result, and (c) deployed resource configuration matching the IaC provides three-layer evidence of control effectiveness.",
          "KICS (Keeping Infrastructure as Code Secure) is a complementary IaC scanner from Checkmarx that supports 24 infrastructure platforms including Terraform, CloudFormation, Ansible, Docker, Kubernetes, Helm, and Bicep. Run kics scan -p ./infrastructure -o ./results --report-formats json,html to generate multi-format reports. KICS is particularly valuable in polyglot IaC environments where teams use multiple frameworks — a single tool can scan all of them with consistent severity classifications and a unified result format. For organizations using Ansible for configuration management alongside Terraform for infrastructure provisioning, KICS provides unified coverage across both.",
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
        impact: "2.15M customers' location and vehicle ID data exposed for 10 years via misconfigured cloud storage",
        body: [
          "Toyota Connected Corporation discovered in May 2023 that a cloud storage environment configured in 2013 had incorrectly set a storage bucket to allow public access. Vehicle location data — including precise GPS coordinates updated regularly — and vehicle identification numbers for 2.15 million Toyota Connected service customers in Japan had been publicly accessible for approximately 10 years. The data was theoretically accessible to anyone who knew the bucket URL. Toyota attributed the misconfiguration to 'insufficient data handling rules' at the time of initial deployment and announced a broader audit of its cloud configurations, subsequently discovering additional misconfigured environments at overseas subsidiaries.",
          "The technical root cause was straightforward: the S3 bucket's access control list was set to public-read at initial setup in 2013, a configuration choice that was common before AWS introduced the S3 Public Access Block feature in 2018. At the time the bucket was created, there was no AWS Config managed rule for s3-bucket-public-read-prohibited (that rule was added in 2018 as well). However, both the AWS Config rule and the S3 Public Access Block feature have been available since 2018 — a period of five additional years during which the misconfiguration persisted undetected because no automated compliance scanning was deployed against this environment.",
          "The IaC security failure is specific: the 2013 environment had never been imported into Terraform or CloudFormation management. It was a legacy manually-configured environment. The organizational process did not require retroactive IaC adoption for pre-existing environments, and no drift detection system monitored the bucket's configuration against a secure baseline. An IaC security scan would have caught the public access configuration immediately — but only if the bucket had been managed by IaC. The detection failure persisted because the cloud security program did not have a process for identifying and scanning resources that predate IaC adoption.",
          "Toyota's public disclosure noted that while the data was technically accessible, there is no evidence it was actually accessed by unauthorized parties during the 10-year window — a statement that is impossible to verify without comprehensive and retroactive S3 access logging (S3 server access logs or CloudTrail data events). This illustrates a secondary audit finding: without S3 access logging enabled on sensitive buckets, it is impossible to determine the actual scope of unauthorized access during an exposure period. S3 access logging is a MEDIUM severity finding in most frameworks, but the Toyota case demonstrates its critical importance for post-exposure forensic analysis.",
          "Remediation steps and industry lessons: Toyota's audit of additional subsidiary environments, triggered by the initial discovery, found similar misconfigurations in other cloud accounts — a pattern consistent with what auditors call 'first finding predicts more.' When a cloud security gap is found in one account or region, the same gap typically exists in peer accounts and regions that were built by the same team using the same processes. Systematic remediation requires: (1) deploy AWS Config s3-bucket-public-read-prohibited organization-wide via conformance pack, (2) enable S3 Public Access Block at the account level (not just bucket level), (3) import all legacy resources into IaC management and subject them to the same scanning as new resources, and (4) establish drift detection to catch future manual changes. Each of these controls would have prevented or detected the Toyota exposure.",
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
        "IaC scanning in CI/CD catches misconfigurations before deployment — every PR is a security review opportunity",
        "Security groups with 0.0.0.0/0 on port 22/3389 are automatic CRITICAL findings — restrict to specific CIDR blocks or security group IDs",
        "S3 encryption and public access blocking should be enforced at the account level via SCP, not just at the bucket level",
        "Legacy cloud resources not managed by IaC must be imported and scanned — drift detection identifies resources outside IaC management",
        "Terraform state files contain sensitive values — store in encrypted S3 with KMS, enable versioning, and restrict access to CI/CD system",
        "Module version pinning prevents supply chain attacks via compromised module updates",
        "Post-deployment verification confirms the deployed resource matches IaC intent — silent Terraform apply failures create configuration gaps",
        "KICS provides unified scanning across multiple IaC frameworks in polyglot environments",
        "Baseline management allows IaC scanning adoption without blocking CI/CD on pre-existing findings",
        "S3 access logging is required to determine unauthorized access scope during a public bucket exposure incident",
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
        "Application security testing uses three complementary methodologies that together provide layered coverage of application vulnerabilities. Static Application Security Testing (SAST) analyzes source code, bytecode, or binary without executing it — examining code paths, data flows, and patterns that indicate vulnerabilities such as SQL injection, cross-site scripting (XSS), command injection, path traversal, and hardcoded credentials. SAST runs at developer speed (seconds to minutes) and integrates into IDEs and CI/CD pipelines, providing developers with security feedback on every commit. OWASP WSTG-INFO-02 and NIST SSDF practice PW.7 both require SAST as a core element of a secure development lifecycle.",
        "Dynamic Application Security Testing (DAST) attacks the running application — sending malicious inputs, observing application behavior, and confirming whether vulnerabilities are exploitable in the actual deployed environment. Unlike SAST (which may flag theoretical vulnerabilities that are not reachable in practice due to business logic), DAST produces findings that are confirmed exploitable. DAST runs against staging environments with test data, simulating the attack patterns an external attacker would use. The combination of SAST and DAST reduces both false positives (SAST flags theoretical issues that DAST confirms are or are not reachable) and false negatives (DAST catches runtime vulnerabilities that SAST cannot see, such as authentication bypasses dependent on server state).",
        "Software Composition Analysis (SCA) identifies known CVEs in open-source dependencies — the third-party libraries, frameworks, and packages that constitute 70-90% of modern application code by volume. An application with secure custom code but vulnerable dependencies (a Log4j 2.14.1 in a Java application, a Django 3.2.12 with an authentication bypass CVE, a lodash version below 4.17.21 with prototype pollution) is exploitable at the dependency layer. SCA tools maintain databases synchronized with the NVD (National Vulnerability Database), GitHub Advisory Database, and vendor security advisories, flagging new CVEs against installed dependency versions in real time. The 2021 Log4Shell crisis demonstrated SCA's value: organizations with SCA integrated into CI/CD knew within hours which applications were affected; organizations without SCA spent weeks manually auditing dependency trees.",
        "In a mature AppSec program, all three testing types run in CI/CD with appropriate integration points. SAST runs on every commit during the pull request phase — developers see security findings alongside code review comments before the PR merges. SCA runs on every dependency change (package.json, requirements.txt, go.mod updates) and continuously monitors for new CVEs against existing dependencies without requiring a new build. DAST runs on every deployment to staging and against production on a periodic basis (weekly automated scans, plus manual penetration testing quarterly or annually). The audit of an AppSec program verifies all three testing types are in place, that findings are triaged (not just collected), and that critical findings block releases — the existence of the tool is not sufficient evidence; the enforcement of findings must be verified.",
        "SAST tool selection significantly affects finding quality. Rules-based SAST tools (pattern matching) produce high false positive rates — flagging any SQL string concatenation as injection regardless of whether the data comes from a user-controlled source. Semantic SAST tools (Semgrep, CodeQL) perform data flow analysis — tracking whether user-controlled data reaches a sink (database query, shell execution, HTML output) without passing through proper sanitization, which dramatically reduces false positives. GitHub CodeQL is integrated into GitHub Advanced Security and runs on every push for free on public repositories. Semgrep (open source core) provides 2,000+ community rules and allows custom rule development in a straightforward YAML DSL. Both tools support SARIF output for integration with GitHub, GitLab, and Azure DevOps security dashboards.",
        "False positive management is a critical operational concern that directly affects program effectiveness. When SAST tools generate many false positives, developers learn to dismiss security findings as noise rather than engaging with them. An effective AppSec program maintains false positive suppression records: each suppression must document the specific finding, the justification for why it is a false positive (e.g., 'this concatenation uses only server-controlled lookup values, not user input'), the developer who wrote the justification, and a security engineer who reviewed and approved the suppression. Suppression without security engineer review is a program integrity gap that auditors must flag. Suppression rates should be tracked as a metric — a suppression rate above 40% suggests either tool misconfiguration or inappropriate use of suppression to avoid addressing real findings.",
        "The SCA supply chain dimension extends beyond direct dependencies to transitive dependencies — the dependencies of dependencies. A package that imports lodash indirectly through five levels of dependency tree nesting still exposes the application to lodash CVEs. SCA tools that analyze only direct dependencies (listed in package.json or requirements.txt) miss the majority of the actual software supply chain. Modern SCA tools (Snyk, Dependabot, OWASP Dependency-Check, Grype) analyze the full dependency graph including transitive dependencies. Auditors verify that the SCA tool in use performs transitive dependency analysis and that the dependency update process (Dependabot PRs, Snyk fix PRs) is actively reviewed and merged rather than accumulating as ignored open pull requests.",
      ],
      technical: {
        title: "Reading SAST and DAST Output",
        body: [
          "Semgrep integration and triage workflow: run semgrep --config=p/owasp-top-ten --config=p/python src/ to apply the OWASP Top 10 ruleset plus language-specific rules to the source code. Semgrep's --json output flag produces machine-readable results for CI/CD integration. Evaluate each finding against three criteria: (1) Is the data flow confirmed? Trace the flagged variable from its source to the sink — if it originates from user input (request parameters, HTTP headers, file uploads) and reaches the sink without sanitization, the finding is real. If it originates from a configuration constant or database value, it may be a false positive. (2) Is the sink exploitable? SQL injection requires a database-connected sink; XSS requires HTML output without escaping; command injection requires shell execution. (3) Is there a compensating control? An ORM that parameterizes queries may render a raw SQL string concatenation unexploitable even if it looks like injection to the SAST tool.",
          "DAST configuration and scoping: configure OWASP ZAP or Burp Suite Enterprise with the application's base URL, authenticated session cookies (ZAP supports script-based login), and scope rules (restrict crawling and attacks to the application's domain, not linked third-party resources). For authenticated scanning, use ZAP's forced user mode with a test account that has broad access but no production data. The DAST scan includes: active scanning (attempting injection attacks against all input fields, headers, and query parameters), passive scanning (analyzing all traffic for information disclosure, missing security headers, insecure cookies), and authenticated vs. unauthenticated access testing (verifying pages require login). Review DAST findings for false positives before reporting — DAST can flag rate limiting responses as vulnerabilities or misinterpret application-specific behavior.",
          "SCA dependency management audit: run snyk test --all-projects or dependabot review to identify CVEs across all language ecosystems in the repository. Review the output for: CRITICAL severity CVEs with available fixes (these are release blockers), HIGH severity CVEs with available fixes (these require remediation within the sprint cycle), and HIGH/CRITICAL CVEs with no available fix (these require compensating controls — WAF rules, network isolation, or vendor escalation). Verify that Dependabot or Snyk's automated PR creation is enabled and that PRs are being reviewed and merged. An accumulation of unmerged Dependabot PRs indicates the organization is not acting on SCA findings — the tool is running but the program is not functioning.",
          "DAST false positive handling: DAST actively attacks the application and produces findings that require careful verification. False positives occur when the DAST tool misinterprets application responses — a redirect to a login page may be flagged as an authentication bypass, or an error message that includes the request URL may be flagged as reflected XSS when the content is actually properly escaped. For each DAST finding, manually verify exploitability before including it in the audit report: attempt the same attack payload in a controlled manner and confirm the response is actually exploitable. DAST true positive rate is typically 60-70% — the remaining 30-40% are false positives that require triage. Including unverified DAST findings in audit reports damages program credibility.",
          "Security testing metrics and program maturity indicators: auditors evaluate AppSec program effectiveness beyond the presence of tools by reviewing key metrics. Mean time to remediate (MTTR) for critical findings should be under 7 days. False positive suppression rate should be below 40%. DAST coverage rate (percentage of API endpoints scanned) should be above 80% for production applications. Dependency update latency (time from Dependabot PR creation to merge for CRITICAL CVEs) should be under 48 hours. Finding backlog age distribution should show fewer than 5% of CRITICAL findings older than 30 days. These metrics distinguish a functioning AppSec program from a compliance theater program where tools run but findings accumulate unaddressed.",
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
          "The Equifax breach exploited CVE-2017-5638, a critical remote code execution vulnerability in Apache Struts 2 that was publicly disclosed and patched on March 7, 2017. The vulnerability resided in the Content-Type header parsing of the Jakarta Multipart parser: a maliciously crafted Content-Type value caused Struts to execute arbitrary OGNL expressions, granting the attacker remote code execution on the web server. An exploit was publicly available within 24 hours of the CVE disclosure. Equifax's information security team received an internal alert about the vulnerability and the patching requirement on March 9. Despite the alert, the vulnerable Struts version was not patched across all systems — specifically, the consumer dispute portal that became the breach entry point.",
          "An SCA tool integrated into Equifax's CI/CD pipeline would have provided two distinct benefits. First, at the time the application was built and deployed with Apache Struts 2.x, the SCA tool would have flagged any previously known vulnerabilities in that version — establishing a baseline of dependency health at deployment. Second, and more critically, when CVE-2017-5638 was published on March 7, the SCA tool would have immediately fired an alert identifying every application in the estate that depended on the affected Struts version. Organizations with mature SCA programs using continuous monitoring received automated alerts within hours of CVE publication — organizations without SCA relied on manual discovery processes that took weeks or months.",
          "The two-month gap between CVE publication (March 7) and breach detection (approximately July 29 when anomalous traffic was noticed) demonstrates the practical cost of SCA absence. During those months, attackers who had been monitoring Apache Struts vulnerability advisories — as professional threat actors routinely do — identified Equifax as a target using public information (Equifax's web application revealed its Struts version in HTTP headers and error pages) and began exploitation. The attacker accessed systems 265 times over 76 days, exfiltrating approximately 147 million records in approximately 9,000 queries. Each query was logged in network access logs that were not monitored for anomalies.",
          "Regulatory consequences: the FTC settlement of $575M (with an additional $175M to states and $100M to the CFPB, totaling $850M) was the largest data breach settlement in US history at the time. The FTC consent order specifically required Equifax to implement a comprehensive security program including SCA (referred to as 'security software update protocols') with specific requirements: automated identification of software components and their versions, cross-referencing with vulnerability databases within 48 hours of CVE publication, and risk-prioritized remediation timelines. These requirements are now standard in FTC consent orders for organizations subject to data breach enforcement and effectively mandate SCA as a regulatory baseline for any organization that experienced a dependency-related breach.",
          "The Equifax case drives a specific audit procedure for SCA programs: verify that the SCA tool performs continuous monitoring (not just scan-at-build) so that new CVEs against existing deployed software versions trigger alerts without requiring a rebuild. Verify that the alert routing delivers CVE notifications to security teams within 24 hours of NVD publication. Verify that a vulnerability triage SLA exists (CRITICAL CVEs must be evaluated for exploitability and patching initiated within 48 hours). And verify the SCA tool's dependency inventory is complete — covering transitive dependencies, not just direct dependencies. An incomplete dependency inventory means that a CVE in a transitive dependency (as was effectively the case with Struts, which many Java applications included indirectly through frameworks) may not trigger an alert at all.",
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
        "SAST in CI/CD gives developers security feedback on every commit — the earlier the finding, the cheaper the fix",
        "SCA continuous monitoring identifies vulnerable dependencies when new CVEs are published, without requiring a rebuild",
        "DAST confirms real exploitability — reduces SAST false positives and adds coverage for runtime-only vulnerabilities",
        "False positive suppressions must have security engineer sign-off with documented justification — self-service suppression is a program integrity gap",
        "SCA must cover transitive dependencies (dependencies of dependencies) — direct-only scanning misses the majority of the supply chain",
        "Equifax had 76 days between CVE patch availability and breach detection — SCA continuous monitoring would have reduced this to hours",
        "Semgrep and CodeQL perform data flow analysis — dramatically fewer false positives than pattern-matching SAST",
        "DAST requires authenticated scanning with test accounts to cover the full application surface — unauthenticated-only scans miss most functionality",
        "AppSec program metrics: MTTR critical < 7 days, suppression rate < 40%, DAST endpoint coverage > 80%",
        "Log4Shell demonstrated that SCA is not optional — every Java application in the enterprise needed assessment within 24 hours of CVE disclosure",
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
        "Network segmentation audits verify that network zones are properly separated and that traffic between zones follows the principle of least connectivity — only the specific ports and protocols required for documented business functions are permitted, in the minimum required direction, to the minimum required set of endpoints. Network segmentation is not merely a best practice; it is a mandatory control in PCI DSS (Requirement 1 and Requirement 1.3), HIPAA Security Rule (45 CFR 164.312(e)(1) — technical security controls for network access), NIST SP 800-53 (SC-7 Boundary Protection), and SOC 2 Common Criteria CC6.6 (logical access controls limiting network access). An organization that claims PCI DSS compliance without demonstrated network segmentation between the cardholder data environment (CDE) and other systems does not have a reduced audit scope — it has an audit scope that includes every system on the network.",
        "Cloud network segmentation uses a layered model of controls, each operating at a different level of granularity. Virtual Private Cloud (VPC) boundary provides the outermost isolation — traffic cannot cross VPC boundaries without explicit VPC peering or Transit Gateway configuration, and peering must be explicitly approved and audited. Subnet tiers separate functional layers within a VPC: public subnets (with internet gateway routes, for load balancers and NAT gateways), private application subnets (no direct internet route, accessible only from public subnet), and private data subnets (no internet route, accessible only from application subnet). Security groups are the instance-level firewall applied to each EC2 instance, RDS instance, and load balancer — they are stateful (return traffic is automatically allowed), support source security group ID as a source (rather than CIDR blocks), and should be the primary access control for east-west traffic within a VPC. Network ACLs operate at the subnet level, are stateless (return traffic must be explicitly allowed), and are appropriate for coarse-grained controls between subnet tiers.",
        "The flat network failure pattern occurs when the technical controls described above are present but not properly configured. Security groups that allow 0.0.0.0/0 as the source for any inbound rule — regardless of port — create a flat network condition for that protocol. VPC peering connections between production and development environments without access controls create a path from lower-trust environments to higher-trust production systems. A database subnet with a NAT gateway route (allowing outbound internet access from database servers) violates the principle that production databases should have no direct internet connectivity. Auditors test for each of these flat network conditions systematically and document the specific traffic paths that exist versus the traffic paths that should exist.",
        "On-premises network segmentation uses a different technical vocabulary but the same architectural principles. VLANs (Virtual LANs) separate network segments at Layer 2; routed firewall rules control Layer 3 traffic between VLANs. A properly segmented on-premises network has: a DMZ (demilitarized zone) for internet-facing servers, a separate segment for corporate workstations, a separate segment for servers, a separate segment for production databases, and a separate segment for management and administrative access. Each segment boundary has explicit firewall rules that permit only required traffic. Auditors obtain the complete firewall ruleset and review every rule that permits traffic between segments — the most common finding is 'ANY/ANY' rules that were added for debugging and never removed.",
        "Microsegmentation extends traditional network segmentation to the workload level within a segment. In a traditionally segmented network, all servers in the 'application tier' subnet can communicate with all other servers in the same subnet on any port — lateral movement within a subnet tier is unimpeded. Microsegmentation (implemented by tools like Illumio, VMware NSX, or Kubernetes Network Policies) applies per-workload policy: Server A can communicate with Server B on port 8080 because there is a documented application dependency, but Server A cannot communicate with Server C even though both are in the same subnet. Microsegmentation dramatically reduces the blast radius of any single compromised host. CISA's Zero Trust Maturity Model lists microsegmentation as an 'Advanced' capability — organizations that implement it demonstrate significantly better lateral movement containment than those relying only on subnet-level segmentation.",
        "VPC Flow Logs are the detective control layer for network segmentation in AWS. Flow logs capture metadata for every network connection accepted or rejected by security groups and NACLs: source IP, destination IP, source port, destination port, protocol, packets, bytes, action (ACCEPT/REJECT), and timestamp. Without VPC Flow Logs, there is no evidence of whether network segmentation is working — an auditor can verify the security group configuration, but cannot verify that traffic is actually being blocked or that unexpected traffic patterns are occurring. PCI DSS Requirement 10.3 requires logging of all individual user access to cardholder data — without flow logs, network-level access to PCI-scope systems cannot be demonstrated. Auditors verify flow logs are enabled for every VPC containing in-scope systems, logs are retained for the required period, and logs are aggregated in a SIEM or analyzed for anomalies.",
        "Segmentation testing goes beyond configuration review to active validation. Auditors (or penetration testers engaged for the assessment) confirm that the network segmentation is actually blocking traffic by attempting to connect from lower-trust zones to higher-trust targets. From a web server in the public subnet, attempt to connect directly to the database on port 5432 — a properly segmented database security group will reject this connection, returning 'No route to host' or timing out. From a workstation on the corporate network, attempt to connect to a PCI-scope system — the firewall rules should block this connection. Document both the expected result and the actual result. If the actual result differs from expected (connection succeeds when it should be blocked), the finding is confirmed exploitable lateral movement, not a theoretical control gap.",
      ],
      technical: {
        title: "Network Segmentation Testing",
        body: [
          "Firewall rule review methodology: (1) Obtain the complete firewall ruleset — for AWS, run aws ec2 describe-security-groups for all security groups, aws ec2 describe-network-acls for all NACLs, and for Transit Gateway or VPC peering, run aws ec2 describe-vpc-peering-connections. (2) Build a traffic matrix: for each security group, list every ingress rule with source, port, and protocol. Translate security group ID sources to their resource descriptions for readability. (3) Identify all rules that allow traffic to or from sensitive zones — PCI-scope systems, database tier, administrative access CIDR ranges. (4) For each permissive rule, verify a documented business justification exists in the change management system. Any rule without a documented justification is a finding. (5) Flag all rules with 0.0.0.0/0 or ::/0 as source — these create internet-accessible conditions for the destination resource regardless of how 'secure' the port is.",
          "AWS VPC segmentation audit steps: (1) Map all VPC peering connections — run aws ec2 describe-vpc-peering-connections and identify every peering link, the CIDR ranges of both VPCs, and whether route tables in each VPC route all traffic or only specific prefixes across the peering. (2) Verify database subnets have no internet gateway route — run aws ec2 describe-route-tables for database subnet route tables and confirm no entry with destination 0.0.0.0/0 points to an internet gateway (igw-*). A database subnet that routes internet traffic via a NAT gateway is not a complete finding by itself (NAT allows outbound-only initiated traffic) but is worth flagging if database servers have no business reason to initiate outbound internet connections. (3) Verify VPC Flow Logs are enabled — run aws ec2 describe-flow-logs for each VPC and confirm at least one active flow log per VPC.",
          "Security group least connectivity analysis: for each security group attached to a sensitive resource (RDS database, internal API service, secrets management server), evaluate every ingress rule. The source should be a specific security group ID — not a CIDR block and definitely not 0.0.0.0/0. A security group source means only resources attached to that security group can connect — if the application server security group is the source for the database security group, only application servers can reach the database, regardless of any other connectivity changes to the VPC. CIDR block sources are less precise — if the application subnet CIDR is used instead of the application security group, all resources in that subnet (including potentially compromised or new resources that haven't been reviewed) can reach the database. Document each security group source type and recommend migration from CIDR to security group sources for all sensitive targets.",
          "Lateral movement validation testing: with authorization, perform network reachability tests from each defined zone to each sensitive target. Use nmap for port scanning (nmap -p 22,80,443,3306,5432,1433,6379 <target_ip>) or curl for HTTP services. Document the test matrix: source zone, target zone, expected result (blocked/allowed), actual result, and the specific control that should be enforcing the expected result. If actual differs from expected, capture the network traffic evidence (tcpdump or VPC Flow Log entry showing ACCEPT when REJECT was expected) as proof of the finding. This evidence is more persuasive in remediation discussions than a configuration review finding because it demonstrates actual exploitability, not theoretical control gap.",
          "Transit Gateway and complex connectivity audit: enterprise AWS environments use Transit Gateway to connect multiple VPCs, on-premises networks (via Direct Connect or VPN), and shared services VPCs. Transit Gateway introduces complex routing that can create unexpected connectivity paths — a spoke VPC that routes all traffic (0.0.0.0/0) through Transit Gateway to a central inspection VPC may actually have a path to other spoke VPCs if the inspection VPC's route tables are misconfigured. Auditors review Transit Gateway route tables for each attachment and verify that route domains (route tables in Transit Gateway) correctly isolate production, development, and shared services VPCs from each other. Unintended connectivity between production and development via Transit Gateway is a common finding in complex multi-account architectures.",
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
          "The Target breach of November–December 2013 remains the canonical case study for network segmentation failure because its attack path was conceptually simple yet catastrophically effective. The initial access vector was compromised credentials of Fazio Mechanical Services, an HVAC (heating, ventilation, and air conditioning) vendor that Target used to manage climate control in its stores and corporate facilities. Fazio had network access to Target's systems to remotely monitor and manage the HVAC equipment. The attackers — later attributed to a Ukrainian cybercriminal group — obtained Fazio's network credentials through a phishing attack and used them to access Target's vendor portal.",
          "The critical network segmentation failure was this: Target's network had not been designed with the principle that vendor access should be isolated to only the systems the vendor actually manages. The network segment accessible to the HVAC vendor was not isolated from the network segment containing Target's point-of-sale (POS) systems, which processed customer payment cards. A properly segmented network would have placed vendor access in a completely isolated zone — a 'vendor DMZ' — with firewall rules permitting access only to the specific HVAC management systems (specific IP addresses or hostnames, specific ports for the HVAC management software protocol) and explicitly blocking all other traffic. Instead, the HVAC vendor's network access provided a path — through several hops — to the POS network segment.",
          "From their initial foothold in the HVAC-accessible network segment, the attackers moved laterally over several weeks — a period during which Target's security operations team received multiple FireEye alerts about anomalous behavior that were ignored or dismissed. The attackers eventually deployed a custom memory-scraping malware (a variant of BlackPOS) to the POS terminals, which captured card data from the payment card magnetic stripe during the swipe transaction and exfiltrated it to a staging server within Target's network before the data was routed to an external collection point. The full attack chain — from initial vendor credential compromise to card data exfiltration — took approximately six weeks.",
          "The regulatory response to the Target breach directly shaped PCI DSS requirements. PCI DSS Section 1.3 (restricting inbound and outbound traffic to only that which is necessary) was already in the standard, but Target's non-compliance with it drove the PCI Security Standards Council to add more prescriptive guidance on vendor access, third-party connectivity, and segmentation testing requirements in subsequent versions. PCI DSS v4.0 (released 2022) requires explicit penetration testing of segmentation controls — auditors must confirm that segmentation is actually working through active testing, not just configuration review. Target paid approximately $290M in settlements to payment card issuers, banks, and state attorneys general, plus significant additional costs for security remediation and card reissuance.",
          "The detection failure analysis reveals a pattern that repeats across many major breaches: alerts fired but were not acted upon. Target's FireEye intrusion detection system generated multiple alerts during the lateral movement phase that were logged and seen by the security operations team in Bangalore but were not escalated. The alert response procedure was not clear on what constituted a confirmed threat versus a false positive, and the alerts — while accurate — were mixed in with a large volume of other alerts, creating alert fatigue. This secondary failure — inadequate alert response — was compounded by the primary failure of network segmentation: had the network been properly segmented, the lateral movement from the HVAC zone to the POS zone would have been impossible regardless of whether alerts were acted upon. Defense in depth means that when one layer fails (detection), another layer (segmentation) limits the consequence.",
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
        "Flat networks maximize blast radius — segmentation contains lateral movement to a fraction of the attack surface",
        "Vendor network access must be in an isolated zone with explicit firewall rules permitting only the required vendor-specific protocols",
        "VPC Flow Logs must be enabled — you cannot audit, detect, or investigate what you cannot see",
        "PCI DSS v4.0 requires active penetration testing of segmentation controls, not just configuration review",
        "Security group sources should be security group IDs, not CIDR blocks — CIDR sources are less precise and harder to maintain",
        "Microsegmentation (Illumio, NSX, Kubernetes Network Policies) extends isolation to the per-workload level within segments",
        "Database subnets must have no internet gateway route — NAT-only outbound is acceptable only if databases have a documented need for outbound internet",
        "VPC peering connections require explicit route table review — transitive routing can create unexpected cross-VPC connectivity",
        "Transit Gateway route table audit is mandatory in multi-VPC environments — complex routing creates hard-to-see connectivity paths",
        "Detection failures (ignored alerts) cannot substitute for missing segmentation — defense in depth requires both layers",
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
        "Database access control audits verify that role-based access control (RBAC) is properly implemented, that sensitive data columns are protected through masking or encryption, that all database activity is logged at sufficient granularity, and that encryption at rest is enabled for every database containing sensitive or regulated data. Modern cloud-native databases — Snowflake, BigQuery, Redshift, Azure Synapse — provide native support for row-level security, dynamic data masking, column-level encryption, and fine-grained audit logging that were previously available only through expensive third-party database activity monitoring (DAM) tools. Auditors must understand both the capabilities of the specific database platform and the regulatory requirements (GDPR, PCI DSS, HIPAA, CCPA) that apply to the data being stored.",
        "The principle of least privilege applied to database access requires that each database role grant only the specific read or write permissions needed for the associated job function on the specific tables, columns, and rows required. A reporting analyst should have SELECT on the reporting schema and nothing else. An ETL service account should have INSERT and UPDATE on specific staging tables and SELECT on source tables — not DBA privileges. A backup service account should have the specific privileges to export data — not the ability to modify schema or read arbitrary tables. In practice, the most common violation is service accounts with DBA or ACCOUNTADMIN privileges granted at initial setup and never restricted after the initial implementation phase.",
        "Row-level security (RLS) partitions data within a table so that each user or role sees only the rows they are authorized to access. In a multi-region financial system, RLS might restrict a regional analyst to records where the region column matches their assigned region. In a healthcare system, RLS might restrict a clinician to records where the assigned_provider column matches their provider ID. Without RLS, a user with SELECT on the table can read every row — a compromised analyst account becomes a breach of the entire dataset, not just the analyst's authorized records. Snowflake's row access policies, PostgreSQL's row security policies, and BigQuery's row-level access are all native implementations that auditors verify are correctly defined and applied to sensitive tables.",
        "Dynamic data masking (DDM) is a detective-prevention control that returns obfuscated values for sensitive columns to unauthorized viewers while returning actual values to authorized users — all without changing the underlying stored data. A Snowflake masking policy on the SSN column might return 'XXX-XX-1234' (last four digits visible) for analyst roles and the full SSN for compliance officers. DDM differs from column-level encryption (which encrypts the stored value) in that DDM operates at query time — the database engine substitutes the masked value in the query result based on the querying role's privileges. Auditors verify that masking policies are applied to all PII columns (SSN, payment card numbers, passport numbers, phone numbers, email addresses where classification requires it) and that masking policy definitions actually mask the sensitive portion (not just return a constant placeholder that confirms the record exists).",
        "Database audit logging must capture all access to sensitive data, not just schema changes (DDL) and data modifications (DML). A database that logs CREATE TABLE, ALTER TABLE, INSERT, UPDATE, and DELETE but not SELECT queries cannot detect read-based exfiltration — the most common method of database data theft. SELECT query logging significantly increases log volume, which is why it is often disabled for performance reasons. Auditors verify that SELECT logging is enabled for all tables containing PII, payment data, or regulated information, and that the logs are forwarded to a SIEM or retained in immutable storage for the required retention period. For Snowflake, verify the ACCOUNT_USAGE.QUERY_HISTORY view is being monitored and that alerts exist for bulk SELECT queries (SELECT * without a WHERE clause, or queries returning more than 10,000 rows, from analyst-tier accounts).",
        "Database Activity Monitoring (DAM) tools — Imperva, IBM Guardium, Oracle Audit Vault — provide a layer of database security monitoring that operates independently of the database's native audit logging. DAM tools capture all database traffic at the network layer (or via database plugins), maintain a complete log of all queries and responses, and can alert on policy violations (queries exceeding a row count threshold, access to columns not in a user's approved access profile, access from unusual IP addresses) in real time. Auditors verify that DAM is deployed for all production databases containing PII or payment data, that DAM alerts are routed to the SOC for investigation, and that DAM data is retained independently from the database server (so that a compromised database administrator cannot delete the audit trail of their own actions).",
        "Encryption at rest is a foundational database control with two distinct aspects: transparent data encryption (TDE), which encrypts the database files on disk (protecting against physical media theft or unauthorized filesystem access), and column-level encryption (CLE), which encrypts specific sensitive column values within the database (protecting against database users who have SELECT access to the table). TDE is enabled by default in most modern cloud database services (Snowflake, RDS, BigQuery) but may require explicit configuration for legacy or self-managed databases. CLE requires application-level or database-level key management — typically using the cloud KMS (AWS KMS, Azure Key Vault, GCP KMS) with column encryption keys (CEK) wrapped by a key encryption key (KEK) that has strict access controls. Auditors verify TDE is enabled for every database containing sensitive data and that CLE is applied for highest-sensitivity fields (payment card numbers, SSNs) where table-level SELECT access must be broadly granted but field-level access must be restricted.",
      ],
      technical: {
        title: "Testing Database Access Controls",
        body: [
          "RBAC audit workflow: (1) Extract the complete role membership graph — in Snowflake, run SHOW GRANTS OF ROLE <role_name> for all roles; in PostgreSQL, run SELECT grantee, privilege_type, table_name FROM information_schema.role_table_grants; in AWS RDS/Aurora, use the database's native user listing. (2) Map each role to its intended job function based on HR records or access request documentation. (3) For each role, enumerate all privileges: tables accessible, operations permitted (SELECT, INSERT, UPDATE, DELETE, TRUNCATE), and whether the role has database admin or schema ownership privileges. (4) Compare the privilege set against the job function — any privilege not required for the documented function is a finding. Flag separately: service accounts with DBA privileges (CRITICAL), analyst roles with INSERT/UPDATE/DELETE on production tables (HIGH), and shared credential roles (roles used by multiple unidentified users — HIGH, violates non-repudiation).",
          "Row-level security validation: create test records owned by two different entities (Region A and Region B). Authenticate to the database as a user whose RLS policy should restrict them to Region A only. Query SELECT * FROM target_table without a WHERE clause. If RLS is working correctly, the result set contains only Region A records. If Region B records are returned, RLS is not correctly configured or not applied to the test table. Document the test with: the RLS policy definition, the test user's role membership, the test query, and the result set count by region. For Snowflake, review row access policies via SHOW ROW ACCESS POLICIES and DESCRIBE ROW ACCESS POLICY to confirm the policy condition logic correctly implements the intended restriction.",
          "Column masking policy audit: for each table containing PII or regulated data, run the appropriate query to list masking policy assignments. In Snowflake: SELECT column_name, masking_policy_name FROM information_schema.columns WHERE table_name = 'TARGET_TABLE'. Columns without a masking_policy_name have no masking applied — any role with SELECT on the table receives the raw value. Verify masking policies for at minimum: SSN/TIN columns, payment card numbers (PAN), bank account numbers, passport and driver's license numbers, dates of birth (in healthcare), and email addresses (where privacy classification requires masking for non-essential roles). Test masking effectiveness by querying the column as an analyst-tier role and verifying the returned value is actually masked, not the full value.",
          "Encryption at rest verification: for AWS RDS — run aws rds describe-db-instances --query 'DBInstances[*].{Identifier:DBInstanceIdentifier,Encrypted:StorageEncrypted,KMSKey:KmsKeyId}'. StorageEncrypted: false is a CRITICAL finding for any database containing sensitive data. For Snowflake — encryption at rest is always enabled (AES-256-GCM) and cannot be disabled; verify the Tri-Secret Secure configuration (customer-managed key via KMS) for highest-sensitivity datasets where key control is required. For self-managed PostgreSQL — query the postgresql.conf for ssl_key_file and verify the OS-level disk encryption via dm-crypt/LUKS. For each encryption finding, also verify that backups and snapshots are encrypted — RDS allows unencrypted snapshots to be created from encrypted instances if the snapshot action does not specify a KMS key.",
          "Database backup security audit: backups are often overlooked in database security reviews but represent a significant data exposure risk. Verify: (1) Automated backups are enabled and retain data for the required period (7 days minimum for most applications, 35 days for RDS). (2) Backup snapshots are encrypted with the same or equivalent KMS key as the production database. (3) Snapshot access is restricted — confirm no RDS snapshots are marked as 'public' (aws rds describe-db-snapshots --snapshot-type public should return an empty list for the account). (4) Backup restore is tested quarterly — an untested backup is not a backup. (5) Backup access logs exist — who accessed or copied a snapshot should be logged in CloudTrail.",
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
          "Between 2016 and 2019, Morgan Stanley decommissioned two data centers that contained local hardware — servers, storage arrays, and backup tapes — that stored customer personally identifiable information including names, addresses, Social Security numbers, and account numbers for approximately 15 million customers. The hardware was sold to a third-party reseller as surplus IT equipment. The critical failure: the hardware was not subjected to proper data destruction (cryptographic erasure, physical degaussing, or physical destruction) before transfer to the reseller. The data on the hardware was accessible in clear text because encryption at rest had not been enabled for the affected storage systems at the time the data was written.",
          "The OCC (Office of the Comptroller of the Currency) fined Morgan Stanley $60 million in 2020 for violations of OCC guidelines on operational risk management, specifically for failing to maintain an adequate data destruction program for decommissioned hardware. A separate civil lawsuit, settled for $60 million paid to affected customers, established that the exposure constituted a breach of fiduciary duty and privacy obligations. The combined regulatory and civil consequence — $120 million — for what was operationally a hardware disposition process failure illustrates that database security extends beyond the live database instance to the full lifecycle of the underlying storage media.",
          "The encryption at rest failure is the technical root cause from a database security perspective. Had TDE (transparent data encryption) been enabled on the storage systems, the data on the decommissioned hardware would have been encrypted under a key managed by Morgan Stanley's key management system. Without the encryption key — which would not have been transferred with the hardware — the data on the storage media would be unreadable regardless of how it was disposed of. Cryptographic erasure (destroying or rotating the encryption key) is an accepted data destruction method recognized in NIST SP 800-88 Revision 1 (Guidelines for Media Sanitization) and is far more reliable than physical degaussing for modern solid-state storage that does not respond uniformly to magnetic erasure.",
          "The database audit lesson from the Morgan Stanley case extends to a control that is often overlooked in database security audits: the hardware disposition process. Auditors should verify that: (1) An asset inventory tracks every storage device that contains or has contained sensitive data. (2) A data destruction procedure exists and is applied before any hardware leaves the organization's custody (sale, donation, return to leasing company, or disposal). (3) The data destruction method meets the standard for the data classification — NIST SP 800-88 provides a tiered approach (clear, purge, destroy) matched to media type and data sensitivity. (4) A certificate of destruction is obtained and retained for all decommissioned hardware containing regulated data. (5) Encryption at rest is enabled on all production storage from day one, so that cryptographic erasure is always available as a destruction option.",
          "Regulatory context: GLBA (Gramm-Leach-Bliley Act) Safeguards Rule requires financial institutions to protect customer financial information and includes data disposal requirements. NIST SP 800-88 provides the technical standard for media sanitization that regulators reference in enforcement actions. PCI DSS Requirement 9.8 requires that cardholder data be destroyed when no longer needed, with specific requirements for electronic and physical media. SOC 2 Trust Services Criteria CC6.5 requires that assets are disposed of in a manner that prevents unauthorized use. The Morgan Stanley enforcement action is notable because it demonstrates that these requirements apply not just to digital data management but to the physical hardware lifecycle — a dimension of database security that database security audits often exclude from scope.",
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
        "Encryption at rest is a baseline control — every database containing sensitive data must have TDE enabled, including backups and snapshots",
        "Column masking on PII fields prevents bulk SELECT exfiltration — analysts with table access should never see raw SSNs or payment card numbers",
        "Row-level security limits the blast radius of a compromised user account to only their authorized data partition",
        "SELECT query logging must be enabled for sensitive tables — DDL/DML-only logging misses read-based exfiltration entirely",
        "Service accounts must not have DBA or ACCOUNTADMIN privileges — grant only the minimum specific operations on specific tables",
        "Database backups must be encrypted and access-controlled — public RDS snapshots are an automatic CRITICAL finding",
        "Hardware disposition requires certified data destruction — cryptographic erasure (key destruction) satisfies NIST SP 800-88 for encrypted storage",
        "Shared database credentials violate non-repudiation — each user must have an individual named account for audit trail integrity",
        "Database Activity Monitoring (DAM) operates independently of the database's native logging — critical for detecting DBA-level insider threats",
        "Test row-level security with actual queries from restricted roles — configuration review alone does not confirm enforcement",
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
        "Logging and monitoring audits verify that security-relevant events are captured at sufficient granularity, forwarded reliably to a centralized Security Information and Event Management (SIEM) system, retained for the required duration, and that detection rules (alerts) are properly configured, tuned, and actively investigated. NIST SP 800-92 (Guide to Computer Security Log Management) provides the federal baseline for log management programs. PCI DSS Requirement 10 specifies logging requirements for payment card environments. HIPAA requires 'audit controls' (45 CFR 164.312(b)) that record and examine activity on systems containing electronic protected health information. SOC 2 Common Criteria CC7.2 requires monitoring of system components to detect anomalies indicative of security events.",
        "Log coverage — the percentage of in-scope systems actively forwarding logs to the SIEM — is the foundational metric for logging program effectiveness. A SIEM that receives logs from 70% of assets has a 30% blind spot. In that blind spot, an attacker can operate for months without detection, as the Equifax 78-day breach demonstrated. Log coverage gaps are found by comparing two lists: the complete asset inventory (every server, network device, cloud account, SaaS application, and endpoint in the organization) against the SIEM log source list (every source currently forwarding logs). Systems present in the asset inventory but absent from the SIEM log source list are coverage gaps. Gap severity is prioritized by system risk: internet-facing systems, domain controllers, databases, cloud management plane accounts, and identity providers are highest priority.",
        "Log quality is distinct from log coverage. A system can be forwarding logs to the SIEM but at insufficient verbosity to detect the events that matter. Authentication logs must capture failed logins (attempts with wrong credentials), successful logins with source IP and device, and privilege escalation events. Not just that an event occurred, but who, what, from where, and when. Network device logs must capture connection events with source IP, destination IP, port, and action (permitted/denied). Database logs must capture query-level events including SELECT statements, not just schema changes. Application logs must capture user actions (what feature was accessed, what data was viewed) in addition to error events. Log completeness — the right fields captured in each log event — is a frequent gap that makes investigation and correlation impossible even when coverage is complete.",
        "Alert quality is the second dimension of monitoring program effectiveness after coverage. An effective alert fires when a real threat condition exists and does not fire when normal operations occur. Poor alert quality manifests in two failure modes: too few alerts (threats are missed — false negative rate too high) and too many alerts (alert fatigue — analysts cannot process the volume and miss real threats amid noise). Auditors review the alert backlog: the number of unacknowledged alerts, the age of the oldest unacknowledged critical alerts, and the mean time to acknowledge (MTTA). A MTTA for critical alerts exceeding 15 minutes indicates either alert fatigue (too many alerts, analysts can't keep up) or staffing insufficiency (too few analysts). CISA's 2023 guidelines recommend 24/7 SOC coverage with MTTA under 15 minutes for critical alerts.",
        "SIEM detection content — the alert rules (use cases) loaded in the SIEM — requires regular review for both coverage and tuning. Auditors review the list of active alert rules against a threat model: which attack techniques (MITRE ATT&CK TTPs) are the most relevant threats to the organization, and do corresponding detection rules exist? MITRE ATT&CK provides a library of adversary techniques organized by tactic (Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact). For each relevant TTP, auditors verify that a detection rule exists in the SIEM or that a compensating control exists at the network or endpoint layer. The most commonly missing detection rules are for Living-off-the-Land (LOLBin) techniques, data staging and compression before exfiltration, and slow data exfiltration over long time periods.",
        "Log retention is the third dimension of the logging audit. Regulatory requirements set minimum retention periods that vary by framework and system type. PCI DSS 10.7 requires a minimum of 12 months retention with at least 3 months immediately accessible (online or in a fast-restore state) for cardholder data environment logs. HIPAA requires 6-year retention for audit logs related to electronic protected health information. GLBA requires a minimum of 5 years. GDPR does not specify a minimum retention period but requires that data not be kept longer than necessary for the stated purpose — which must be balanced against the security investigation need for log data. Auditors verify the configured retention period in the SIEM and log archive meets the applicable regulatory requirement for every in-scope system, document systems where retention gaps exist, and assess the risk: a compliance finding today becomes a forensic impossibility during an incident investigation in 18 months.",
        "Centralized log management architecture involves more than just routing logs to a SIEM. A well-designed log management architecture includes: log collection agents on each source system (Elastic Beats, Splunk Universal Forwarder, Datadog Agent) that buffer locally if the network or SIEM is unavailable, a dedicated log aggregation tier (separate from the SIEM) that receives raw logs, stores them in immutable form, and feeds the SIEM for analysis, and a SIEM that receives parsed and enriched events from the aggregation tier for correlation and alerting. The immutable raw log store is critical for forensic integrity — if the only copy of logs is in the SIEM, a compromised SIEM or an administrative error can destroy irreplaceable evidence. Logs must be written once and never modified — any log management system that allows log deletion or modification is a forensic integrity gap.",
      ],
      technical: {
        title: "Log Coverage Audit Methodology",
        body: [
          "Asset inventory construction: the log coverage audit begins with a complete and accurate asset inventory. For cloud environments, query the cloud provider's asset management APIs: aws ec2 describe-instances, aws rds describe-db-instances, aws eks list-clusters, and equivalent queries for all services in use. For on-premises, integrate with Active Directory (Get-ADComputer -Filter *), network scanning (nmap of all RFC 1918 ranges), and CMDB exports. For SaaS applications, query each SaaS API or rely on the IT asset management system. Combine these sources into a master asset list with: hostname/IP, asset type, data classification (what type of data is stored or processed), compliance scope (PCI, HIPAA, SOC 2 in-scope), and the expected log source type (Windows Event Log, syslog, AWS CloudTrail, application logs).",
          "SIEM log source gap analysis: export the SIEM's current log source list (from the SIEM admin console or API). Compare against the asset inventory using a set difference operation: any asset in the inventory that is not in the SIEM log source list is a coverage gap. Prioritize gaps by: (1) Assets in PCI, HIPAA, or other compliance scope — these are regulatory compliance findings, not just best practice. (2) Internet-facing assets — these have the highest likelihood of being targeted. (3) Identity and access infrastructure (domain controllers, Active Directory, identity providers) — authentication events from these systems are required for detecting credential-based attacks. (4) Database servers — required for data exfiltration detection. (5) All others, prioritized by data classification. Document the gap with the system name, asset type, compliance scope impact, and estimated log volume for SIEM capacity planning.",
          "Log completeness verification: for each log source that is sending logs to the SIEM, verify that the required fields are present. For authentication logs: verify user, source IP, destination host, timestamp, authentication method, and outcome (success/failure) are all populated. Use a SIEM search against the last 24 hours of authentication events and check for NULL or empty fields in the required columns — these indicate incomplete log format configuration. For network device logs: verify source IP, destination IP, source port, destination port, protocol, action, and bytes transferred are present. For application logs: verify user session ID, action performed, target resource, and outcome are present. Incomplete log fields — particularly missing source IPs — make investigation impossible.",
          "Alert rule review and threat coverage mapping: obtain the complete list of active SIEM alert rules. For each rule, document: the TTP it covers (MITRE ATT&CK mapping), the log sources it depends on (any alert whose log source is in the coverage gap list is ineffective), the threshold that triggers the alert, the last time the alert fired, the last time the alert resulted in a confirmed incident (true positive), and the false positive rate over the last 30 days. Flag alert rules that have never fired (possibly misconfigured or the event simply hasn't occurred — either needs investigation) and alert rules with a false positive rate above 80% (candidates for tuning or retirement). A well-maintained SIEM has alert rules that fire rarely but with high fidelity.",
          "Mean time to acknowledge (MTTA) measurement: query the SIEM ticketing integration or the SOC incident management platform for all alerts generated in the last 90 days. Calculate: alert creation timestamp, alert acknowledgment timestamp (first analyst action), and the time difference. Segment by severity (critical, high, medium). MTTA for critical alerts should be under 15 minutes if SOC coverage is 24/7. If MTTA is measured in hours or days, determine whether the cause is alert volume (alert fatigue from high false positive rates), staffing (insufficient analysts), or process (alerts are not routed to on-call personnel). Each root cause requires a different remediation: alert tuning reduces volume, hiring increases capacity, and on-call rotation and automated escalation fix process gaps. Document the MTTA distribution and root cause analysis as audit evidence.",
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
          "The 78-day attacker dwell time in the Equifax breach — from the first exploitation of the Apache Struts vulnerability in mid-May 2017 to detection on July 29 — represents one of the most consequential monitoring failures in US corporate history. The dwell time was not simply a product of sophisticated attacker tradecraft; it was enabled by a specific technical failure in Equifax's monitoring infrastructure. Equifax's network security architecture included SSL/TLS inspection appliances designed to decrypt, inspect, and log HTTPS traffic for anomaly detection. These appliances were a critical component of the organization's ability to detect data exfiltration — encrypted outbound HTTPS connections carrying exfiltrated data would be logged and analyzed only if the inspection appliance was functioning.",
          "The SSL inspection appliance that covered the network segment containing the compromised Apache Struts application had an expired internal certificate. The certificate, used to establish the TLS inspection proxy connection, had expired approximately 19 months before the breach began and had not been renewed. An expired certificate caused the inspection appliance to fail silently — it stopped inspecting traffic but did not generate alerts about its own operational failure. Traffic continued to flow through the appliance, but uninspected and unlogged. From the monitoring team's perspective, the appliance appeared to be functioning; from the attacker's perspective, their exfiltration traffic was completely invisible.",
          "The log coverage audit failure is specific and instructive: a log coverage gap audit that verified not just that the SSL inspection appliance was in the SIEM log source list (it was) but that it was actively generating logs (it was not) would have identified the gap on day one. Active log source monitoring — alerting when an expected log source stops sending events — is a distinct requirement from log coverage enumeration. SIEM platforms can generate alerts when a log source goes silent (no events received in the last 15 minutes, 1 hour, or 24 hours depending on expected event frequency). This 'log source health' monitoring is a meta-alerting function that auditors must verify is configured for all critical log sources, particularly inspection infrastructure.",
          "The regulatory response to the Equifax monitoring failure drove specific requirements for SSL inspection infrastructure health monitoring, which subsequently appeared in FTC consent orders and OCC guidance for financial institutions. The post-breach forensic investigation required reconstruction of the attacker's activity from sources other than the broken inspection appliance — network flow records (NetFlow/IPFIX), DNS query logs, and endpoint detection agent logs on compromised servers. This reconstruction was significantly more difficult and less complete than it would have been with functioning inspection logs. The forensic limitation affected the breach notification process: it was difficult to determine precisely which individuals' data had been accessed, leading to an over-inclusive notification scope of 147 million people.",
          "For auditors, the Equifax SSL inspection case drives a specific audit procedure that goes beyond verifying log source configuration: verify that each critical log source is actively sending logs by checking the timestamp of the most recent event received from that source. A log source configured to send logs but last seen 72 hours ago is a CRITICAL finding — not a coverage gap (it's in the list), but an operational health gap (it's not actually working). Build an audit query: for each log source in the SIEM, retrieve the maximum event timestamp and flag any source where last_event_time is more than 2x the expected event interval. A firewall that generates thousands of events per minute should be flagged if it hasn't sent an event in the last 5 minutes. A weekly scheduled task that generates logs once per week should be flagged if it hasn't sent an event in the last 10 days.",
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
        "Log coverage gaps are found by comparing SIEM log source list to complete asset inventory — every in-scope asset must be sending logs",
        "Verify log sources are ACTIVELY sending logs, not just configured — silent failure of a log source creates a blind spot identical to no coverage",
        "Alert MTTA for critical alerts must be under 15 minutes — higher MTTA indicates alert fatigue, understaffing, or broken escalation processes",
        "Log retention must meet the regulatory requirement for every in-scope system — 12 months for PCI DSS (3 months immediately accessible)",
        "Alert false positive rate above 80% indicates a tuning problem — high false positive rates cause alert fatigue that causes real threats to be missed",
        "Log source health monitoring (alert when a source goes silent) is as important as log coverage enumeration",
        "Immutable raw log storage is required for forensic integrity — SIEM-only log storage allows deletion of evidence during incidents",
        "Log completeness matters as much as coverage — missing source IP fields make investigation impossible even when events are logged",
        "MITRE ATT&CK coverage mapping verifies detection rules exist for the most relevant adversary techniques",
        "SolarWinds showed that sophisticated attackers can evade SIEM detection for months — behavioral analytics and anomaly detection supplement signature-based rules",
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
        "Zero Trust is a security architecture built on the foundational principle that no user, device, application, or network connection should be trusted by default — not even those inside the corporate network perimeter. Every access request must be explicitly authenticated, authorized against policy, and continuously validated throughout the session. NIST SP 800-207 (Zero Trust Architecture), published in 2020, provides the authoritative federal standard and defines the seven tenets of Zero Trust: all data sources and compute services are resources; all communication is secured regardless of network location; access to resources is granted on a per-session basis; access to resources is determined by dynamic policy; all assets are monitored and measured for integrity and security posture; all resource authentication and authorization is dynamic and strictly enforced; and the enterprise collects information about the current state of assets, network infrastructure, and communications to improve security posture.",
        "CISA's Zero Trust Maturity Model (version 2.0, 2023) organizes Zero Trust implementation across five pillars: Identity (who is making the request), Device (what device is making the request), Network (what network path is the request traversing), Application (what application is being accessed), and Data (what data is being accessed). For each pillar, CISA defines four maturity levels: Traditional (0) — perimeter-based security with implicit internal trust; Initial (1) — some Zero Trust controls in place but incomplete; Advanced (2) — most controls implemented with automation; Optimal (3) — fully automated, continuously evaluated, adaptive policy. A Zero Trust maturity assessment scores an organization across all five pillars and all four levels, producing a maturity profile that guides the roadmap to higher maturity.",
        "Google's BeyondCorp initiative, launched in 2014 after the Operation Aurora attacks of 2009, was the first major enterprise Zero Trust implementation at scale. BeyondCorp eliminated the distinction between corporate network and external network: all employee access to Google applications goes through the same access proxy, applies the same authentication and authorization policies, and is subject to the same device health checks — regardless of whether the employee is in a Google office, at home, or at a coffee shop. The internal network provides no additional trust. This was a radical departure from the prevailing security model of the time, which assumed that being on the corporate VPN provided a meaningful security boundary.",
        "The Identity pillar of Zero Trust has the most mature tooling and the clearest implementation path for most organizations. Multi-factor authentication (MFA) is the baseline control — every user must authenticate with at least two factors. However, not all MFA is equal. TOTP-based MFA (Google Authenticator, Authy) is vulnerable to real-time phishing attacks where an adversary relays the OTP in an automated man-in-the-middle attack. Push notification MFA (Duo, Microsoft Authenticator push) is vulnerable to MFA fatigue attacks (as demonstrated in the Uber 2022 breach) where the attacker floods the user with push notifications until they approve one. FIDO2/WebAuthn hardware security keys and passkeys are phishing-resistant — the authentication response is cryptographically bound to the origin domain, so a phishing site cannot capture and replay the credential. CISA's phishing-resistant MFA guidance specifically recommends FIDO2 as the target for organizations implementing Zero Trust at Advanced or Optimal maturity.",
        "The Device pillar requires that every device making access requests be inventoried, assessed for security posture, and verified to be compliant with organizational policy before being granted access. Device health checks evaluate: Is the device managed by the organization's MDM (Mobile Device Management) system? Is the operating system version current and patched? Is endpoint detection and response (EDR) software running and reporting in to the SOC? Is disk encryption enabled? Has the device been recently scanned for malware with a clean result? Zero Trust Network Access (ZTNA) products — Zscaler, Cloudflare Access, Palo Alto Prisma Access, Cisco Duo — enforce device health checks at access time, granting or denying access to applications based on real-time device compliance status rather than static network location. A device that fails a health check (EDR stopped reporting, OS is unpatched) loses access until it remedies the compliance failure.",
        "The Network pillar transition from VPN to ZTNA (Zero Trust Network Access) represents one of the most significant infrastructure changes in the Zero Trust journey. Traditional VPN grants network-level access — once connected, the user's device is on the internal network and can attempt connections to any system on that network. ZTNA grants application-level access — the user is connected to a specific application's proxy, can access only that application, and cannot initiate connections to other systems on the internal network. From a lateral movement perspective: VPN compromise gives an attacker access to the internal network; ZTNA compromise gives an attacker access to a single application. Auditors assess the organization's progress from VPN to ZTNA by evaluating: what percentage of applications have been migrated to ZTNA proxy access, whether the VPN still provides broad network access to non-migrated systems, and whether microsegmentation controls limit east-west traffic within the internal network for systems not yet behind a ZTNA proxy.",
        "Continuous authorization is the most advanced Zero Trust capability — the principle that authorization is not a one-time event at login but is re-evaluated throughout the session based on continuously monitored signals. Risk signals include: device health (has the EDR flagged suspicious activity since login?), user behavior (has the user accessed an unusual volume of resources or at unusual hours?), network context (is the connection coming from a known-good location or an anonymous proxy?), and application context (is the user's action pattern consistent with their normal work patterns?). When risk signals indicate a session may be compromised, continuous authorization can step up authentication (prompt for MFA re-verification), reduce session permissions (downgrade from write to read-only access), or terminate the session entirely. User and Entity Behavior Analytics (UEBA) tools feed these risk signals into the access control decision plane. This capability is at CISA's Optimal maturity level and requires significant data infrastructure and ML modeling to implement effectively.",
      ],
      technical: {
        title: "Auditing Zero Trust Maturity",
        body: [
          "Identity pillar maturity assessment: evaluate each identity control against the CISA maturity scale. MFA enrollment: query the identity provider (Azure AD, Okta, Ping) for total user count and MFA-enrolled user count. Any gap is a finding — MFA must be mandatory for all users, not opt-in. MFA method quality: enumerate all MFA methods in use. TOTP-only or SMS-only is Traditional maturity; push notification MFA with number matching is Initial; hardware FIDO2 security keys or passkeys for privileged accounts is Advanced. Conditional Access policies: verify that access policies enforce MFA step-up for high-risk applications (financial systems, HR, admin tools), high-risk locations (anonymous proxies, unfamiliar countries), and high-risk device states (unmanaged devices). Privileged Identity Management: verify that privileged roles (Global Admin, Domain Admin, DBA) are governed by PIM/PAM tools with just-in-time access, approval workflows, and session recording.",
          "Device pillar maturity assessment: query the MDM platform (Intune, Jamf, Workspace ONE) for total device inventory and managed device count. Any device used to access company resources that is not MDM-managed is a Traditional maturity finding. For managed devices, query device compliance policies: what percentage meet all compliance requirements (OS version, encryption status, EDR agent running, password policy)? Non-compliant devices should have access blocked at the ZTNA layer. Verify that Conditional Access policies check MDM compliance state at login — a valid user credential on a non-compliant device should not receive application access tokens. For BYOD (bring your own device), verify a mobile application management (MAM) policy separates corporate data from personal apps on the device.",
          "Network pillar assessment — VPN vs ZTNA inventory: enumerate all applications currently accessed via VPN. For each application, determine whether it has been migrated to ZTNA proxy access or still requires full VPN network access. The ratio of ZTNA-accessible applications to total applications is the ZTNA adoption metric. Applications that require full VPN access represent attack surface — a compromised device with VPN access can reach all systems on the internal network. Prioritize ZTNA migration by application risk: customer-facing production systems first, then internal business applications, then legacy systems last (which may require application-layer proxies or protocol translation to support ZTNA). For each migrated application, verify the ZTNA policy is correctly configured: application URL, allowed user groups, device compliance requirements, and MFA requirements.",
          "Data pillar assessment: the most advanced Zero Trust pillar evaluates whether data access policies enforce Zero Trust principles independent of network and application controls. Data classification must be complete — all data must be labeled with a classification (Public, Internal, Confidential, Restricted) to enable policy enforcement. Data Loss Prevention (DLP) policies must be configured to detect and block exfiltration of classified data through egress channels (email, web uploads, USB, printing). Information Rights Management (IRM) controls must bind access policies to the document itself — a Confidential document sent to an unauthorized recipient should be unreadable without proper credentials, regardless of how it was transferred. For cloud-stored data, verify CASB (Cloud Access Security Broker) policies enforce data classification requirements across sanctioned and unsanctioned cloud services.",
          "Zero Trust roadmap gap analysis: after assessing current maturity across all five pillars, document the gap between current state and the target maturity level (typically Advanced for most enterprise organizations). For each gap, estimate effort (person-months), cost (licensing, implementation, training), and risk reduction impact. Prioritize roadmap items using a risk-reduction-to-effort ratio — high-impact, low-effort items (MFA enforcement for remaining users, MDM compliance policy deployment) should be in the next 90 days; high-impact, high-effort items (full ZTNA migration, continuous authorization implementation) require 18-36 month roadmaps. Present the roadmap to leadership with the breach incidents from unmitigated gaps as motivation — the SolarWinds breach ($100M+ in damage to affected organizations) is attributable to the absence of Zero Trust microsegmentation and continuous authorization.",
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
          "The SolarWinds supply chain attack, active from approximately October 2019 to December 2020 when FireEye discovered it while investigating their own compromise, demonstrated the fundamental weakness of perimeter-based security models at the most consequential scale in cybersecurity history. The attack began when Russian state-sponsored threat actors (APT29/Cozy Bear) compromised SolarWinds' software build process and inserted malicious code (SUNBURST) into the Orion network monitoring software update. Approximately 18,000 organizations that downloaded and installed the trojanized Orion update received a backdoor that established a command-and-control channel to the attackers.",
          "The lateral movement phase of the SolarWinds attack is the most relevant to Zero Trust. Once SUNBURST established its C2 channel, the attackers used it to identify high-value targets among the 18,000 compromised organizations and then moved laterally within those targets' networks using implicit internal trust. The Orion software ran as a highly privileged service account — because network monitoring requires broad access to query network devices and systems — and the attackers used those credentials to access Active Directory, Azure AD, email systems, and cloud management interfaces. Organizations that had implemented microsegmentation and least-privilege access saw the attackers' lateral movement significantly limited; organizations with flat internal networks saw rapid, unimpeded access to all internal systems.",
          "The CISA Executive Order 14028 (May 2021) response to SolarWinds directly mandated Zero Trust adoption across the US federal government. The order required federal agencies to develop Zero Trust architecture implementation plans within 60 days, advance toward Zero Trust security principles within 180 days, and complete specific milestones (MFA for all privileged users, endpoint detection and response deployment, cloud security configuration) within one year. CISA's Zero Trust Maturity Model, first published in 2021 and updated to version 2.0 in 2023, was developed as the implementation framework for this mandate. The SolarWinds attack effectively ended the debate about whether Zero Trust was a theoretical concept or a practical necessity — it became regulatory mandate.",
          "The detection failure in the SolarWinds attack lasted over a year for most affected organizations because the SUNBURST malware was designed specifically to evade the monitoring approaches common in enterprise SIEMs. The malware observed the environment for up to two weeks before activating to determine whether it was running in a security sandbox. It mimicked legitimate SolarWinds telemetry traffic patterns to blend into normal network activity. It used dormant periods and slow-timed lateral movement to avoid triggering velocity-based anomaly detection. It targeted organizations' Azure AD and Microsoft 365 environments using forged SAML tokens — a technique that bypassed many SIEM alert rules because the activity appeared to come from Microsoft's legitimate authentication infrastructure.",
          "For auditors performing Zero Trust assessments after SolarWinds, the attack drives three specific evaluation areas that go beyond standard maturity scoring. First: software supply chain trust — does the organization evaluate the security posture of software vendors before deploying their products, and do update processes require code signing verification? Second: privileged service account monitoring — are alerts configured to detect anomalous behavior from service accounts, not just user accounts? Lateral movement using service account credentials (as in SolarWinds) is often missed by alerts tuned for human user behavior. Third: SAML token forgery detection — does the organization's identity monitoring detect forged SAML assertions? Microsoft's guidance after SolarWinds includes specific Azure AD logging and alert configurations for SAML token manipulation that were not in most environments prior to the breach.",
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
        "Zero Trust: never trust, always verify — VPN and internal network location grant no implicit trust in a Zero Trust architecture",
        "CISA's five pillars: Identity, Device, Network, Application, Data — each requires independent maturity assessment and roadmap",
        "MFA is the baseline; phishing-resistant FIDO2 hardware keys or passkeys are the target for Advanced maturity",
        "ZTNA replaces VPN — per-application access with no network-level lateral movement capability for users or compromised devices",
        "Device health checks (MDM compliance, EDR running, OS patched) must be enforced at access time, not just at enrollment",
        "Continuous authorization re-evaluates risk signals throughout the session — not just at login",
        "SolarWinds demonstrated that implicit service account trust enables lateral movement as effectively as user account trust",
        "Privileged Identity Management (PIM/PAM) with just-in-time access eliminates persistent standing admin privileges",
        "SAML token forgery detection requires specific Azure AD logging configurations that most organizations lacked before SolarWinds",
        "Software supply chain trust — code signing verification for software updates — is a Zero Trust control for the build and deployment pipeline",
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
        "Compliance automation replaces manual, point-in-time audit checks with continuous, automated verification of security controls. The distinction matters enormously: a manual audit verifies that a control was in place at the moment the auditor checked it — but a resource can be misconfigured two hours after the audit closes and remain that way for months until the next assessment. Automated compliance continuously evaluates every resource against defined security policies and flags deviations in real time — the gap between misconfiguration and detection is measured in minutes, not months. AWS Config with Config Rules, AWS Security Hub, Azure Policy with Azure Security Center, and GCP Security Command Center all implement this continuous compliance model. The Toyota case (2023) — a 10-year public S3 bucket exposure — would have been caught on day one by a single AWS Config managed rule that has been available since 2018.",
        "AWS Config is the foundational continuous compliance service in the AWS ecosystem. Config tracks the configuration history of every AWS resource — EC2 instances, S3 buckets, IAM policies, security groups, RDS databases, CloudTrail trails — recording every configuration change as a configuration item in a timeline. Config Rules evaluate these configuration items against defined security policies and classify resources as COMPLIANT or NON-COMPLIANT. There are over 300 AWS managed Config rules covering the most common security controls (CIS Benchmark, PCI DSS, NIST 800-53), plus the ability to write custom rules as Lambda functions for organization-specific policies. Config Rules trigger on resource changes (evaluating a resource when its configuration changes) or periodically (evaluating all resources on a schedule). The combination ensures that both real-time misconfigurations and persistent non-compliance are detected.",
        "AWS Security Hub aggregates findings from Config Rules, GuardDuty (threat detection), Amazon Inspector (vulnerability assessment), Amazon Macie (sensitive data discovery in S3), and integrated third-party security tools (Palo Alto, CrowdStrike, Wiz) into a single, unified compliance posture view. Security Hub runs automated compliance checks aligned to industry standards: CIS AWS Foundations Benchmark (180+ checks), PCI DSS v3.2.1 (133 checks), NIST SP 800-53 (240+ checks), and AWS Foundational Security Best Practices (170+ checks). Each check is evaluated in real time and contributes to a compliance score (0-100%) for each standard. Auditors reviewing a cloud environment begin with the Security Hub compliance dashboard — a score below 80% on CIS Benchmark is a systemic control gap that drives the entire audit finding set.",
        "Azure Policy is the equivalent compliance automation mechanism in the Microsoft Azure ecosystem. Policies are defined as JSON rule definitions that evaluate Azure resource configurations against specified conditions. Policy effects determine the action when a policy condition is met: Audit (log non-compliance, no enforcement), Deny (block the resource creation or modification), DeployIfNotExists (automatically deploy a remediation resource when a non-compliant resource is found), and Modify (automatically update a resource to compliant state). Azure Security Center (now Microsoft Defender for Cloud) aggregates policy compliance into a Secure Score — a weighted percentage of compliant controls across all subscriptions. Azure Policy Initiative (a collection of related policies, such as the CIS Microsoft Azure Foundations Benchmark initiative) provides framework-aligned compliance coverage with a single deployment.",
        "Conformance packs in AWS Config provide framework-aligned compliance deployment. AWS provides pre-built conformance packs for: CIS AWS Foundations Benchmark, PCI DSS 3.2.1, NIST SP 800-53, HIPAA Security, FedRAMP, and others. Deploying a conformance pack provisions all associated Config rules in one operation rather than individually configuring each rule. For organizations subject to PCI DSS, deploying the PCI DSS 3.2.1 conformance pack immediately establishes 133 automated compliance checks with a real-time dashboard showing compliance state for every in-scope account and region. Conformance packs can be deployed organization-wide via AWS Organizations, ensuring all member accounts receive the same compliance coverage — closing the multi-account blind spot where controls exist in the management account but not in member accounts.",
        "Auto-remediation transforms compliance automation from detective (identify non-compliance) to corrective (automatically fix non-compliance). AWS Config remediation actions use AWS Systems Manager Automation documents (runbooks) to automatically remediate specific findings. A Config Rule that detects a public S3 bucket can trigger an SSM Automation document that automatically applies the S3 Public Access Block — restoring compliance without human intervention. AWS provides pre-built remediation automation for common findings (AWS-DisableS3BucketPublicReadWrite, AWS-RevokeUnauthorizedInboundRules, AWS-SetIAMPasswordPolicy). Custom remediation automation can be written for organization-specific requirements. Auto-remediation requires careful scoping — not every finding should be automatically remediated without review, particularly in cases where 'non-compliant' may represent a documented exception. Auditors verify that auto-remediation is enabled for highest-priority controls and that remediation actions are logged for audit trail.",
        "Policy-as-code extends compliance automation to the infrastructure deployment pipeline. Tools like Open Policy Agent (OPA) with Conftest allow compliance policies to be expressed as code (Rego language) and evaluated against Terraform plans, Kubernetes manifests, and Dockerfile configurations before they are applied. When a Terraform plan would create a non-compliant S3 bucket (public access, no encryption), an OPA policy in the CI/CD pipeline rejects the plan before terraform apply executes. This preventive policy enforcement (preventing non-compliant configuration from being deployed in the first place) complements detective Config Rules (catching non-compliance after deployment) and corrective auto-remediation (fixing non-compliance automatically). The combination of all three layers — preventive IaC policy gates, detective continuous compliance monitoring, and corrective auto-remediation — constitutes a mature, defense-in-depth compliance automation program.",
      ],
      technical: {
        title: "Implementing Continuous Compliance",
        body: [
          "AWS Config conformance pack deployment: run aws configservice put-conformance-pack with a template that references the desired pre-built pack (OperationalBestPracticesForPCIDSS, OperationalBestPracticesForCISAWS-FoundationsBenchmark, OperationalBestPracticesForHIPAA). After deployment, verify conformance pack rule status with aws configservice describe-conformance-pack-compliance-details --conformance-pack-name <name>. Each rule will show COMPLIANT, NON_COMPLIANT, or INSUFFICIENT_DATA (last state indicates the rule has not yet evaluated — usually resolves within 24 hours of deployment). Identify all NON_COMPLIANT resources by rule and build a remediation priority list based on severity (CRITICAL rules first) and resource risk classification.",
          "Security Hub compliance score analysis: access Security Hub via the console or run aws securityhub get-findings with appropriate filters. The compliance score for each standard (CIS, PCI DSS, NIST) is the percentage of controls passing out of all controls evaluated. Drill into each failing control to see the specific resources that are non-compliant. Export findings in ASFF (Amazon Security Finding Format) JSON for integration with ticketing systems (Jira, ServiceNow) via EventBridge rules that automatically create tickets for new CRITICAL and HIGH findings. Track the compliance score trend over time — a score that is decreasing indicates new resources are being deployed faster than existing findings are being remediated, which signals a process breakdown.",
          "Auto-remediation configuration: for each Config rule targeted for auto-remediation, configure via aws configservice put-remediation-configurations. Set Automatic: true to enable fully automated remediation without human approval. Set MaximumAutomaticAttempts: 3 and RetryAttemptSeconds: 60 to handle transient errors. Test auto-remediation in a non-production account before enabling in production: create a non-compliant resource, verify the Config rule detects it, verify the remediation action fires, and verify the resource is restored to compliant state within the expected time window (typically 5-15 minutes for simple remediations). Document remediation exclusions — any Config rule that is disabled or where auto-remediation is not configured must have a documented exception with justification, owner, and review date.",
          "Organization-wide deployment via AWS Organizations: to deploy Config Rules and Security Hub across all member accounts, use Organizations integration. Run aws organizations enable-aws-service-access --service-principal config.amazonaws.com and aws configservice put-organization-config-rule to deploy a Config rule to all accounts in the organization. Similarly for Security Hub: aws securityhub enable-organization-admin-account --admin-account-id <security_account_id> designates a security account as the aggregator for all member account Security Hub findings. Verify organization-wide deployment is complete by listing member accounts with aws organizations list-accounts and cross-referencing with Config rule deployment status in each account. Any member account not receiving the Config rules represents a compliance monitoring blind spot.",
          "Compliance dashboard and reporting for auditors: build a compliance report by querying Security Hub findings API filtered by compliance standard, finding status (FAILED), and severity. Generate a summary showing: total controls in each framework, controls passing, controls failing, and critical resources affected by each failing control. Map Security Hub findings to the audit evidence matrix — for each audit objective (ISO 27001 control, SOC 2 criteria, PCI DSS requirement), document which Security Hub check provides continuous compliance evidence. This mapping allows auditors to demonstrate that specific controls are continuously monitored and compliant, not just compliant at the point-in-time of the manual assessment. SOC 2 auditors increasingly accept Security Hub compliance evidence as supporting evidence for Common Criteria controls, reducing the manual testing burden for controls that are continuously automated.",
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
          "The full scope of Toyota Connected Corporation's S3 misconfiguration — public access on a bucket containing vehicle GPS location data and vehicle identification numbers for 2.15 million customers — was discovered in May 2023 when a security researcher identified the publicly accessible bucket. The bucket had been created in 2013 with public access enabled, a configuration that was common practice at a time when S3 Public Access Block (introduced 2018) and automatic public access prevention did not exist. What was less excusable was that the misconfiguration persisted for five years after AWS introduced both the technical controls and the automated detection mechanisms to identify and prevent it.",
          "The AWS Config managed rule 's3-bucket-public-read-prohibited' has been available as a managed rule since 2018. This rule evaluates every S3 bucket in an account and flags any bucket configured to allow public read access. It runs automatically when a bucket's ACL or bucket policy changes, and periodically as a scheduled evaluation. Had Toyota Connected deployed this single Config rule — which requires approximately two minutes to enable — it would have identified the misconfiguration within hours of the rule being deployed, or within minutes of the 2013 bucket being created if the rule had been in place at the time. The 10-year exposure period reflects not just the initial misconfiguration but the absence of continuous compliance monitoring for the entire decade.",
          "Toyota's discovery triggered a broader audit of their cloud environments, revealing similar misconfigurations in subsidiary accounts in multiple countries — a pattern consistent with organizations that build cloud environments by replication rather than by template. When a development team creates an initial cloud environment without security guardrails, subsequent teams often copy that environment's architecture, including its security gaps. Organization-wide deployment of Config rules via AWS Organizations conformance packs would have caught all of these misconfigurations centrally, rather than requiring each subsidiary team to independently implement and maintain compliance controls.",
          "The data privacy regulatory consequence was significant under Japan's amended Act on Protection of Personal Information (APPI), which requires prompt notification of data breaches and imposes penalties for inadequate security measures. Toyota's notification process was complicated by the 10-year exposure window — determining whether any third party had actually accessed the data during that period was essentially impossible without complete S3 server access logging enabled for the entire period (which was not the case). GDPR Article 33 would have required notification to supervisory authorities within 72 hours if European customers were affected; the ambiguity about actual access extent during the 10-year window would likely have triggered notification obligations. The case reinforced the principle that encryption at rest combined with S3 Public Access Block provides defense in depth for S3 data security: even if public access is misconfigured, encrypted data without the KMS key is unreadable.",
          "Compliance automation program design lessons from the Toyota case: (1) Deploy AWS Config managed rules organization-wide on day one — the marginal cost is minimal and the detection value is immediate. (2) Enable S3 Block Public Access at the account level (not just bucket level) as an SCP or account-level setting — this prevents any public access configuration from being applied to any bucket in the account, regardless of individual bucket settings. (3) Extend compliance monitoring to legacy environments — cloud resources created before the compliance automation program existed are often the highest-risk resources because they predate security controls and have never been reviewed against current standards. (4) Configure Security Hub to alert on all CRITICAL findings within 15 minutes via EventBridge to SNS, ensuring the security team is immediately aware of any new public S3 bucket. The combination of prevention (account-level block), detection (Config rule), and alerting (Security Hub to SOC) makes a 10-year undetected exposure structurally impossible.",
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
        "Compliance automation catches misconfigurations in minutes — manual audits catch them months or years later if at all",
        "AWS Security Hub provides a unified compliance score across 180+ CIS Benchmark checks with real-time updating",
        "Deploy conformance packs organization-wide via AWS Organizations — account-level-only deployment leaves member accounts unmonitored",
        "Auto-remediation of critical controls (S3 public access, root access keys, unrestricted SSH) restores compliance without human intervention",
        "Manual audits verify the automation is working correctly — they supplement, not replace, continuous monitoring",
        "S3 account-level Public Access Block prevents any bucket in the account from being made public, regardless of individual bucket settings",
        "Policy-as-code (OPA with Conftest) evaluates Terraform plans before deployment — preventive compliance complements detective Config rules",
        "Security Hub findings should automatically create tickets via EventBridge — CRITICAL findings require 15-minute notification SLA",
        "Legacy environments created before compliance automation existed require retrospective compliance scanning and remediation planning",
        "Compliance score trending over time is more meaningful than a point-in-time score — a declining score indicates new resources are being deployed non-compliantly",
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
