import type { StageConfig, EpochConfig } from "./types";

export const techAudit1Epoch: EpochConfig = {
  id: "tech-audit-1",
  name: "2a. Tech Audit: Foundations",
  subtitle: "ISACA Audit Methodology",
  description: "Master IT audit methodology using ISACA standards — COBIT, CISA, CRISC, and ITGC. Each stage simulates a real audit engagement at a major institution, from risk assessment to audit reporting.",
  emoji: "🔍",
  color: "purple",
  unlocked: true,
};

export const techAudit1Stages: StageConfig[] = [
  // ─── audit-01: COBIT 2019 ─────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "ISACA Global Headquarters", location: "Schaumburg, Illinois", era: "Present Day", emoji: "🏛️" },
    id: "audit-01",
    order: 1,
    title: "The Governance Framework",
    subtitle: "COBIT 2019 — Separating Governance from Management",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-01", name: "COBIT Auditor", emoji: "📋" },
    challengeType: "ctf",
    info: {
      tagline: "Governance sets direction. Management executes. Confusing the two is where audit failures begin.",
      year: 2019,
      overview: [
        "COBIT 2019 is ISACA's flagship framework for IT governance and management. It defines a clear separation between governance — which sets direction, evaluates options, and monitors outcomes — and management, which plans, builds, runs, and monitors activities in alignment with governance direction.",
        "Every IT audit begins by establishing this boundary. The board and executive leadership govern: they approve risk appetite, set strategic direction, and ensure accountability. IT leadership manages: they implement controls, operate systems, and report performance upward. Auditors independently verify that both layers are functioning.",
        "The COBIT 2019 framework organizes 40 governance and management objectives across five domains: Evaluate, Direct and Monitor (EDM) for governance, and Align, Plan and Organise (APO), Build, Acquire and Implement (BAI), Deliver, Service and Support (DSS), and Monitor, Evaluate and Assess (MEA) for management.",
      ],
      technical: {
        title: "COBIT 2019 Domain Structure",
        body: [
          "The five COBIT domains map directly to the IT lifecycle. EDM covers board-level governance: risk appetite, IT investment decisions, and performance monitoring. APO covers strategic alignment, risk management, and HR planning. BAI covers project delivery and change management. DSS covers operations and incident management. MEA covers internal controls assessment and regulatory compliance.",
          "Auditors use COBIT capability levels (0–5) to rate each objective. Level 0 means the process is incomplete. Level 3 (Established) is the typical minimum for regulated industries. Level 5 (Optimizing) indicates continuous improvement culture.",
        ],
        codeExample: {
          label: "COBIT capability rating worksheet (simplified)",
          code: `# COBIT Capability Assessment — EDM01 (Governance Framework)
# Scale: 0=Incomplete 1=Performed 2=Managed 3=Established 4=Predictable 5=Optimizing

Objective          Current  Target  Gap  Priority
-------------------------------------------------
EDM01 Governance     2        3      1    HIGH
EDM02 Benefits       1        3      2    HIGH
EDM03 Risk           3        3      0    MET
APO01 IT Mgmt Fwk   2        3      1    MEDIUM
APO12 Risk Mgmt      2        4      2    HIGH`,
        },
      },
      incident: {
        title: "The Enron IT Governance Failure (2001)",
        when: "2001 — Enron Corporation collapse",
        where: "Houston, Texas",
        impact: "Largest US bankruptcy at the time; $74B in shareholder losses; Sarbanes-Oxley Act enacted",
        body: [
          "Enron's collapse was partly an IT governance failure. The board exercised no meaningful oversight of the complex special-purpose entities that concealed debt. IT systems generated reports that management used to mislead auditors and the board. The governance layer — which should have questioned and verified — simply accepted management's representations.",
          "The aftermath produced the Sarbanes-Oxley Act (2002), which formalized IT controls requirements for public companies and directly inspired the COBIT framework's emphasis on board-level oversight of IT. COBIT's EDM domain is a direct descendant of SOX Section 404 compliance requirements.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Board / Executives", sub: "COBIT EDM layer", type: "attacker" },
          { label: "IT Leadership", sub: "APO/BAI/DSS/MEA", type: "system" },
          { label: "IT Auditor", sub: "independent review", type: "victim" },
          { label: "Audit Report", sub: "findings + ratings", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "COBIT 1.0 released — first IT audit framework from ISACA" },
        { year: 2001, event: "Enron collapse — governance failures expose need for IT oversight standards" },
        { year: 2002, event: "Sarbanes-Oxley Act — Section 404 mandates IT controls for public companies" },
        { year: 2019, event: "COBIT 2019 released — updated governance model, 40 objectives", highlight: true },
      ],
      keyTakeaways: [
        "Governance (EDM) sets direction; Management (APO/BAI/DSS/MEA) executes",
        "COBIT rates capability 0–5; Level 3 is the regulated industry baseline",
        "Auditors assess both layers independently — management self-reporting is not sufficient",
        "SOX Section 404 compliance drove COBIT adoption in publicly traded companies",
      ],
      references: [
        { title: "COBIT 2019 Framework — ISACA", url: "https://www.isaca.org/resources/cobit" },
        { title: "SOX Section 404 — SEC Guidance", url: "https://www.sec.gov/rules/interp/2007/33-8810.pdf" },
      ],
    },
    ctf: {
      scenario: "You have been granted access to the ISACA audit terminal at a financial services firm. The COBIT assessment files are loaded. Read the governance charter, identify the five domains, and locate the capability gap that puts this company at regulatory risk.",
      hint: "Read COBIT-ASSESSMENT.txt first, then explore the domains directory.",
      hints: [
        "Start with: cat COBIT-ASSESSMENT.txt",
        "List the domain files: ls domains/",
        "Read the governance layer file: cat domains/EDM.txt",
        "Find the highest-risk gap: cat domains/GAP-REPORT.txt",
        "Run 'assemble' then submit the flag",
      ],
      fragments: [
        { trigger: "/COBIT-ASSESSMENT.txt", value: "FLAG{C0B1T_", label: "Assessment Loaded — Framework Identified" },
        { trigger: "/domains/EDM.txt", value: "3DM_G4P_", label: "EDM Domain — Governance Gap Found" },
        { trigger: "/domains/GAP-REPORT.txt", value: "CR1T1C4L}", label: "Gap Report — Critical Risk Confirmed" },
      ],
      files: {
        "/COBIT-ASSESSMENT.txt": [
          "COBIT 2019 CAPABILITY ASSESSMENT",
          "Client: Meridian Financial Services",
          "Auditor: [You]",
          "Date: 2026-05-15",
          "=================================",
          "",
          "SCOPE: Five COBIT domains assessed.",
          "  EDM — Evaluate, Direct, Monitor (Governance)",
          "  APO — Align, Plan, Organise",
          "  BAI — Build, Acquire, Implement",
          "  DSS — Deliver, Service, Support",
          "  MEA — Monitor, Evaluate, Assess",
          "",
          "Explore domains/ for detail on each domain.",
          "Review domains/GAP-REPORT.txt for risk findings.",
        ].join("\n"),
        "/domains/EDM.txt": [
          "EDM DOMAIN — GOVERNANCE LAYER",
          "==============================",
          "",
          "EDM01 Governance Framework    Current: 1  Target: 3  GAP: 2  CRITICAL",
          "EDM02 Benefits Realisation    Current: 2  Target: 3  GAP: 1  HIGH",
          "EDM03 Risk Optimisation       Current: 1  Target: 3  GAP: 2  CRITICAL",
          "EDM04 Resource Optimisation   Current: 2  Target: 3  GAP: 1  MEDIUM",
          "EDM05 Stakeholder Engagement  Current: 2  Target: 3  GAP: 1  MEDIUM",
          "",
          "Finding: Board has no formal IT governance charter.",
          "No documented risk appetite statement exists.",
          "IT investment decisions made by CTO without board approval.",
        ].join("\n"),
        "/domains/APO.txt": [
          "APO DOMAIN — ALIGN, PLAN, ORGANISE",
          "====================================",
          "APO01 IT Management Framework Current: 2  Target: 3  GAP: 1  MEDIUM",
          "APO12 Risk Management         Current: 2  Target: 3  GAP: 1  HIGH",
          "APO13 Security Management     Current: 3  Target: 3  GAP: 0  MET",
        ].join("\n"),
        "/domains/GAP-REPORT.txt": [
          "CRITICAL GAP SUMMARY",
          "====================",
          "",
          "Highest Risk: EDM01 + EDM03 — both at capability level 1.",
          "Board has no IT governance charter (EDM01).",
          "No formal risk appetite statement (EDM03).",
          "",
          "Regulatory exposure: SOX Section 404 — material weakness likely.",
          "Remediation: Board must adopt IT governance charter within 60 days.",
          "Risk committee must document and approve risk appetite.",
          "",
          "Auditor conclusion: GOVERNANCE FAILURE — escalate to audit committee.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "COBIT-ASSESSMENT.txt", isDir: false }, { name: "domains", isDir: true }],
        "/domains": [
          { name: "EDM.txt", isDir: false },
          { name: "APO.txt", isDir: false },
          { name: "GAP-REPORT.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-02: Risk Assessment — CRISC ────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "Federal Reserve Board", location: "Washington, DC", era: "Present Day", emoji: "🏦" },
    id: "audit-02",
    order: 2,
    title: "Risk in the Vault",
    subtitle: "CRISC — IT Risk Identification and Assessment",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-02", name: "Risk Analyst", emoji: "⚖️" },
    challengeType: "ctf",
    info: {
      tagline: "Every control exists to mitigate a risk. Without the risk, the control is just overhead.",
      year: 2010,
      overview: [
        "CRISC (Certified in Risk and Information Systems Control) is ISACA's risk-focused certification framework. It defines a structured approach to identifying IT risk, assessing its likelihood and impact, developing risk responses, and monitoring risk over time.",
        "Risk assessment follows a standard methodology: identify threats and vulnerabilities, assess inherent risk (before controls), evaluate existing controls, calculate residual risk (after controls), and compare residual risk to the organization's risk appetite. Risks above appetite require treatment.",
        "CRISC defines four risk response options: Accept (live with the risk), Mitigate (add controls to reduce it), Transfer (insurance or contractual shift), and Avoid (stop the activity). Auditors verify that each response is appropriate for the risk level and that the organization's risk register accurately reflects current exposure.",
      ],
      technical: {
        title: "Risk Calculation: Inherent vs Residual",
        body: [
          "Inherent risk = Likelihood × Impact before any controls exist. A critical database exposed to the internet with no authentication has maximum inherent risk. Residual risk = Inherent risk minus control effectiveness. A database behind a firewall, with MFA and encryption, has reduced residual risk.",
          "Risk appetite is the board-approved threshold. Risks above appetite must be treated. The risk register tracks every identified risk with its inherent score, controls in place, residual score, owner, and treatment status.",
        ],
        codeExample: {
          label: "Risk register calculation (5×5 matrix)",
          code: `# Risk scoring: 1=Very Low, 5=Very High
# Residual Risk = Inherent - Control Effectiveness

Risk ID  Threat               Likelihood Impact Inherent Controls  Residual  Status
-------  -------------------  ---------- ------ -------- --------  --------  ------
R-001    Unpatched servers         4       5      20       MFA+FW     8      ABOVE APPETITE
R-002    Phishing — employees      3       4      12       Training   6      WITHIN APPETITE
R-003    Insider data theft        2       5      10       DLP+Audit  4      WITHIN APPETITE
R-004    Ransomware via RDP        4       5      20       None       20     CRITICAL — NO CONTROLS`,
        },
      },
      incident: {
        title: "The Capital One Cloud Misconfiguration (2019)",
        when: "March–July 2019",
        where: "AWS US-East-1",
        impact: "106 million customer records exposed; $190M settlement; CISO resigned",
        body: [
          "Capital One's 2019 breach was a risk assessment failure. The misconfigured WAF that allowed SSRF access to the EC2 metadata service was a known risk category — cloud misconfiguration. But the risk register did not capture it at the correct severity, and no compensating control existed to detect metadata service abuse.",
          "A proper CRISC-aligned risk assessment would have identified cloud misconfiguration as a high-likelihood, high-impact risk requiring continuous monitoring. The residual risk after controls was incorrectly assessed as acceptable. The actual residual risk was critical.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Threat / Vulnerability", sub: "source of risk", type: "attacker" },
          { label: "Inherent Risk Score", sub: "likelihood × impact", type: "system" },
          { label: "Controls Applied", sub: "reduce residual", type: "victim" },
          { label: "Residual vs Appetite", sub: "treat or accept", type: "result" },
        ],
      },
      timeline: [
        { year: 2010, event: "CRISC certification launched by ISACA" },
        { year: 2019, event: "Capital One breach — cloud misconfiguration risk not captured", highlight: true },
        { year: 2020, event: "NIST SP 800-30 Rev 1 — risk assessment guide updated" },
        { year: 2023, event: "SEC cybersecurity rules — material risk disclosure now mandatory" },
      ],
      keyTakeaways: [
        "Inherent risk = likelihood × impact before controls; residual risk = after controls",
        "Risk responses: Accept, Mitigate, Transfer, Avoid",
        "Risk register must be current — stale registers create audit findings",
        "Residual risk above appetite requires board-approved treatment plan",
      ],
      references: [
        { title: "CRISC Exam Guide — ISACA", url: "https://www.isaca.org/credentialing/crisc" },
        { title: "NIST SP 800-30 — Guide for Conducting Risk Assessments", url: "https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final" },
      ],
    },
    ctf: {
      scenario: "The Federal Reserve's internal audit team has flagged three high-severity items in the risk register. Read each risk file, determine which risk exceeds the board's appetite, and confirm the treatment plan.",
      hint: "Read the risk register, then examine each flagged risk individually.",
      hints: [
        "Start with: cat RISK-REGISTER.txt",
        "Check the appetite threshold: cat BOARD-APPETITE.txt",
        "Read the critical risk: cat risks/R-004.txt",
        "Confirm the treatment: cat risks/TREATMENT-PLAN.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/RISK-REGISTER.txt", value: "FLAG{CR1SC_", label: "Risk Register — Loaded" },
        { trigger: "/risks/R-004.txt", value: "R3S1DU4L_R1SK_", label: "R-004 — Critical Risk Identified" },
        { trigger: "/risks/TREATMENT-PLAN.txt", value: "3XC33DS}", label: "Treatment Plan — Confirmed" },
      ],
      files: {
        "/RISK-REGISTER.txt": [
          "FEDERAL RESERVE — IT RISK REGISTER (EXCERPT)",
          "=============================================",
          "Board Risk Appetite: Residual score ≤ 12",
          "",
          "ID    Threat                    Inherent  Residual  Status",
          "----  ------------------------  --------  --------  ------",
          "R-001 Phishing                     12         6     WITHIN",
          "R-002 Insider threat                10         5     WITHIN",
          "R-003 Third-party API breach        15         9     WITHIN",
          "R-004 Unpatched SWIFT terminals     20        18     EXCEEDS APPETITE",
          "",
          "See risks/ directory for detail. See BOARD-APPETITE.txt for thresholds.",
        ].join("\n"),
        "/BOARD-APPETITE.txt": [
          "BOARD-APPROVED RISK APPETITE STATEMENT",
          "=======================================",
          "Approved: 2026-01-10  Expires: 2027-01-10",
          "",
          "Maximum acceptable residual risk score: 12",
          "Any risk scoring > 12 requires Treatment Plan within 30 days.",
          "Any risk scoring > 16 requires immediate escalation to Audit Committee.",
        ].join("\n"),
        "/risks/R-004.txt": [
          "RISK R-004: UNPATCHED SWIFT TERMINALS",
          "======================================",
          "Threat: Exploitation of CVE-2023-XXXX in SWIFT messaging terminals",
          "Likelihood: 4 (High) — active exploitation in the wild",
          "Impact: 5 (Critical) — direct access to interbank transfers",
          "Inherent Risk: 20",
          "Controls in place: Network segmentation only",
          "Control effectiveness: Low (segmentation bypass known)",
          "Residual Risk: 18  ← EXCEEDS APPETITE (threshold: 12)",
          "Owner: VP Infrastructure",
          "Status: CRITICAL — escalate to Audit Committee",
        ].join("\n"),
        "/risks/TREATMENT-PLAN.txt": [
          "TREATMENT PLAN — R-004",
          "======================",
          "Response type: MITIGATE",
          "Action 1: Emergency patch deployment — SWIFT terminals — due 2026-05-22",
          "Action 2: Compensating control — application whitelisting — due 2026-05-29",
          "Action 3: Continuous monitoring — IDS alert on SWIFT traffic — due 2026-06-05",
          "Projected residual after treatment: 6 (WITHIN APPETITE)",
          "Approved by: Chief Risk Officer",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "RISK-REGISTER.txt", isDir: false },
          { name: "BOARD-APPETITE.txt", isDir: false },
          { name: "risks", isDir: true },
        ],
        "/risks": [
          { name: "R-004.txt", isDir: false },
          { name: "TREATMENT-PLAN.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-03: ITGC ────────────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "New York Stock Exchange", location: "New York, NY", era: "Present Day", emoji: "📊" },
    id: "audit-03",
    order: 3,
    title: "General Controls on the Trading Floor",
    subtitle: "IT General Controls — The Four Pillars",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-03", name: "ITGC Specialist", emoji: "🏗️" },
    challengeType: "ctf",
    info: {
      tagline: "Application controls mean nothing if the general controls beneath them are broken.",
      year: 2002,
      overview: [
        "IT General Controls (ITGCs) are the foundational controls that support the reliability of all application-level controls. They are not tied to any specific application — they apply to the entire IT environment. If ITGCs fail, every application control built on top of them is suspect.",
        "The four ITGC domains are: Change Management (changes to production systems follow an approved process), Logical Access (only authorized users can access systems and data), Computer Operations (systems run reliably and backups are tested), and Program Development (new systems are developed and tested before production release).",
        "External auditors testing SOX Section 404 spend the majority of their IT audit time on ITGCs. A single ITGC failure — for example, emergency changes bypassing approvals — creates a pervasive finding that casts doubt on every financial report the system produced.",
      ],
      technical: {
        title: "Testing ITGCs: What Auditors Look For",
        body: [
          "Change Management testing: pull all production changes for the period, verify each has an approved change ticket, test results, and segregation of duties between developer and approver. Emergency changes require post-hoc approval documentation.",
          "Logical Access testing: pull all user accounts with privileged access, verify each has a current access request and annual recertification. Check for terminated employees with active accounts, shared accounts, and service accounts with excessive privileges.",
        ],
        codeExample: {
          label: "ITGC access review — checking for terminated users with active access",
          code: `# Pull all active AD accounts
Get-ADUser -Filter {Enabled -eq $true} | Select SamAccountName > active_accounts.txt

# Pull HR termination list for the period
# (from HR system export)
Import-Csv terminated_employees.csv | Select EmployeeID, TermDate > terminated.txt

# Compare — any matches = ITGC finding
Compare-Object active_accounts terminated | Where {$_.SideIndicator -eq "=="}
# Output: jsmith terminated 2026-03-15 — still has ACTIVE AD account — FINDING`,
        },
      },
      incident: {
        title: "The MF Global IT Controls Failure (2011)",
        when: "October 2011",
        where: "New York, NY",
        impact: "$1.6B in customer funds missing; firm collapsed; customers made whole only years later",
        body: [
          "MF Global, a major futures broker, collapsed after its systems processed unauthorized transfers of customer segregated funds to cover proprietary trading losses. IT general controls — specifically change management and logical access — failed to prevent or detect unauthorized system modifications that allowed the transfers.",
          "Auditors later found that multiple ITGC failures created a permissive environment: developers had production access, change tickets were bypassed for 'urgent' fixes, and access reviews had not been performed in over a year. Each failure alone was a finding; together they enabled a catastrophic fraud.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Change Management", sub: "approved changes only", type: "attacker" },
          { label: "Logical Access", sub: "least privilege", type: "system" },
          { label: "Computer Operations", sub: "backups + reliability", type: "victim" },
          { label: "Program Development", sub: "SDLC controls", type: "result" },
        ],
      },
      timeline: [
        { year: 2002, event: "SOX enacted — Section 404 makes ITGCs mandatory for public companies" },
        { year: 2007, event: "PCAOB AS 2201 — auditing standard for internal controls over financial reporting" },
        { year: 2011, event: "MF Global collapse — ITGC failures enable $1.6B customer fund misuse", highlight: true },
        { year: 2023, event: "SEC cyber rules — ITGCs now include cybersecurity incident reporting controls" },
      ],
      keyTakeaways: [
        "The four ITGC pillars: Change Management, Logical Access, Computer Operations, Program Development",
        "ITGC failures are pervasive — they invalidate reliance on ALL application controls",
        "SOX 404 audits spend majority of time on ITGCs for financial systems",
        "Terminated employees with active accounts is among the most common ITGC finding",
      ],
      references: [
        { title: "PCAOB AS 2201 — Auditing Internal Control", url: "https://pcaobus.org/Standards/Auditing/Pages/AS2201.aspx" },
        { title: "ISACA ITGC Audit Program", url: "https://www.isaca.org/resources/isaca-journal/issues/2016/volume-4/it-general-controls" },
      ],
    },
    ctf: {
      scenario: "You are auditing the NYSE trading platform's ITGCs. The change management log has been pulled for Q1. Find the unauthorized production change that bypassed the approval process.",
      hint: "Read the change log and compare against the approved changes list.",
      hints: [
        "Read the change log: cat CHANGE-LOG.txt",
        "Check approved tickets: cat APPROVED-TICKETS.txt",
        "Identify the anomaly: cat findings/UNAUTHORIZED-CHANGE.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/CHANGE-LOG.txt", value: "FLAG{1TGC_", label: "Change Log — Loaded" },
        { trigger: "/APPROVED-TICKETS.txt", value: "CH4NG3_BYPASSS_", label: "Approved Tickets — Compared" },
        { trigger: "/findings/UNAUTHORIZED-CHANGE.txt", value: "F1ND1NG}", label: "Finding — Unauthorized Change Confirmed" },
      ],
      files: {
        "/CHANGE-LOG.txt": [
          "NYSE TRADING PLATFORM — Q1 PRODUCTION CHANGE LOG",
          "==================================================",
          "CHG-1001  2026-01-08  jsmith    Patch kernel 5.15 → 5.17       APPROVED",
          "CHG-1002  2026-01-22  rjones    Update firewall ruleset v2.1    APPROVED",
          "CHG-1003  2026-02-05  jsmith    Hotfix order-matching engine    NO TICKET",
          "CHG-1004  2026-02-19  alee      TLS cert renewal prod servers   APPROVED",
          "CHG-1005  2026-03-03  rjones    DB index rebuild — trading DB   APPROVED",
          "",
          "5 changes recorded. Cross-reference APPROVED-TICKETS.txt.",
        ].join("\n"),
        "/APPROVED-TICKETS.txt": [
          "APPROVED CHANGE TICKETS — Q1 2026",
          "==================================",
          "CHG-1001  APPROVED  2026-01-05  Approver: T.Williams  Dev: jsmith",
          "CHG-1002  APPROVED  2026-01-19  Approver: T.Williams  Dev: rjones",
          "CHG-1004  APPROVED  2026-02-16  Approver: M.Chen      Dev: alee",
          "CHG-1005  APPROVED  2026-02-28  Approver: T.Williams  Dev: rjones",
          "",
          "NOTE: CHG-1003 has NO corresponding approved ticket.",
        ].join("\n"),
        "/findings/UNAUTHORIZED-CHANGE.txt": [
          "ITGC FINDING — CHANGE MANAGEMENT",
          "=================================",
          "Finding: CHG-1003 applied to production on 2026-02-05 with NO approved ticket.",
          "Developer: jsmith (same developer and approver — segregation of duties violation)",
          "System affected: Order-matching engine (critical financial system)",
          "Risk: Unauthorized code in production; financial reports may be unreliable.",
          "Rating: HIGH — pervasive ITGC deficiency",
          "Required action: All Q1 financial reports require additional procedures.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "CHANGE-LOG.txt", isDir: false },
          { name: "APPROVED-TICKETS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "UNAUTHORIZED-CHANGE.txt", isDir: false }],
      },
    },
  },

  // ─── audit-04: Access Control ──────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "CIA Headquarters", location: "Langley, Virginia", era: "Present Day", emoji: "🔐" },
    id: "audit-04",
    order: 4,
    title: "Need to Know",
    subtitle: "Access Control Audit — Least Privilege and Recertification",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-04", name: "Access Auditor", emoji: "🗝️" },
    challengeType: "ctf",
    info: {
      tagline: "Access granted and never reviewed is access permanently granted — regardless of role changes.",
      year: 2013,
      overview: [
        "Access control auditing verifies that the principle of least privilege is enforced: every user has exactly the permissions needed to perform their job, and no more. Auditors test this by comparing actual access rights to job roles, reviewing access request documentation, and examining recertification evidence.",
        "The key ISACA control objectives for access control are: access provisioning follows an approved request process, access is reviewed and recertified at least annually, terminated employees are removed promptly (within 24 hours for privileged accounts), and privileged access (admin rights) is restricted and monitored.",
        "Access control findings are among the most common in any IT audit. Typical findings include: orphaned accounts (former employees), excessive privileges (users with admin rights they no longer need), shared accounts (no individual accountability), and missing recertification evidence.",
      ],
      technical: {
        title: "Access Review Testing Approach",
        body: [
          "Pull the complete user access list from each system in scope. For each account: verify there is an approved access request, verify the account maps to an active employee, verify the access level matches the user's current role, and verify annual recertification was completed. Flag any exceptions.",
          "Privileged accounts receive additional scrutiny. Each admin account should have a documented business justification, a named owner, MFA enforced, and activity logs reviewed quarterly. Service accounts should have restricted interactive logon, complex passwords rotated annually, and documented owners.",
        ],
        codeExample: {
          label: "Access review — identifying accounts missing recertification",
          code: `# Pull all accounts with access to classified system
SELECT username, role, last_recert_date, manager
FROM access_control
WHERE system = 'CLASSIFIED-DB'
ORDER BY last_recert_date ASC;

-- Results:
-- jsmith     ADMIN    2024-11-01   T.Williams  ← 18 months ago - OVERDUE
-- rjones     READ     2025-11-15   M.Chen      ← 6 months ago - OK
-- slee       ADMIN    NULL         NULL         ← NO RECERT EVER - FINDING
-- [term]     WRITE    2025-03-01   [TERM]       ← TERMINATED USER - CRITICAL`,
        },
      },
      incident: {
        title: "The Edward Snowden Access Control Failure (2013)",
        when: "2013",
        where: "NSA / Booz Allen Hamilton",
        impact: "1.7M classified documents exfiltrated; most significant intelligence leak in US history",
        body: [
          "Snowden was a contractor who accumulated access far beyond his job requirements. As a system administrator, he requested and received access to materials he had no need to access. Recertification processes failed to catch the accumulation of access rights over time.",
          "Post-incident reviews found that NSA's access control processes were not aligned with least-privilege principles. Contractors could request access with minimal oversight, and access reviews were not consistently enforced. The ISACA CISA curriculum now uses this case to illustrate why access recertification and privileged access management are non-negotiable controls.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Access Request", sub: "role-based justification", type: "attacker" },
          { label: "Provisioning", sub: "least privilege grant", type: "system" },
          { label: "Annual Recertification", sub: "manager confirms need", type: "victim" },
          { label: "Termination Process", sub: "same-day deprovisioning", type: "result" },
        ],
      },
      timeline: [
        { year: 2002, event: "SOX Section 404 — access controls become mandatory audit scope" },
        { year: 2013, event: "Snowden — contractor privilege accumulation exposes access control gaps", highlight: true },
        { year: 2016, event: "NIST SP 800-53 Rev 4 — privileged account management controls formalized" },
        { year: 2020, event: "Zero Trust architecture — assume breach, verify every access request" },
      ],
      keyTakeaways: [
        "Least privilege: every user has exactly what they need and nothing more",
        "Recertification must occur at least annually — missing evidence is a finding",
        "Terminated employees must be deprovisioned within 24 hours for privileged accounts",
        "Privilege accumulation occurs when access is never removed after role changes",
      ],
      references: [
        { title: "NIST SP 800-53 — Access Control Family", url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" },
        { title: "ISACA Access Control Audit Program", url: "https://www.isaca.org/resources/isaca-journal" },
      ],
    },
    ctf: {
      scenario: "You are auditing access controls on a classified intelligence system. Three findings have been flagged in the access review file. Identify the most critical violation and confirm the remediation required.",
      hint: "Read ACCESS-REVIEW.txt, then examine the specific finding files.",
      hints: [
        "Start: cat ACCESS-REVIEW.txt",
        "Read terminated user finding: cat findings/TERM-USER.txt",
        "Read privileged account finding: cat findings/PRIV-ACCOUNT.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/ACCESS-REVIEW.txt", value: "FLAG{4CC3SS_", label: "Access Review — Loaded" },
        { trigger: "/findings/TERM-USER.txt", value: "CTR1L_T3RM_US3R_", label: "Terminated User — Critical Finding" },
        { trigger: "/findings/PRIV-ACCOUNT.txt", value: "CR1T1C4L}", label: "Privileged Account — Confirmed" },
      ],
      files: {
        "/ACCESS-REVIEW.txt": [
          "ACCESS CONTROL REVIEW — CLASSIFIED SYSTEM",
          "==========================================",
          "Review period: 2026-Q1",
          "Reviewer: External Auditor",
          "",
          "Total accounts reviewed: 47",
          "Findings:",
          "  FINDING-01: Terminated employee account still active (CRITICAL)",
          "  FINDING-02: Shared admin account — no individual accountability (HIGH)",
          "  FINDING-03: 12 accounts missing annual recertification (MEDIUM)",
          "",
          "Detail in findings/ directory.",
        ].join("\n"),
        "/findings/TERM-USER.txt": [
          "FINDING-01: TERMINATED USER — ACTIVE ACCOUNT",
          "=============================================",
          "Username: m.harris",
          "Termination date: 2025-11-30",
          "Account status: ACTIVE as of 2026-05-15 (167 days post-termination)",
          "Access level: READ/WRITE to CLASSIFIED-DB",
          "Last logon: 2026-03-12 (103 days after termination)",
          "",
          "CRITICAL: Account used post-termination. Potential unauthorized access.",
          "Required action: Immediate disable + forensic review of all post-term activity.",
        ].join("\n"),
        "/findings/PRIV-ACCOUNT.txt": [
          "FINDING-02: SHARED ADMIN ACCOUNT",
          "=================================",
          "Account: svc_admin_shared",
          "Users with credentials: 4 analysts (no individual accountability)",
          "Last password change: 2024-06-01 (23 months ago)",
          "MFA enforced: NO",
          "",
          "HIGH: Shared accounts prevent forensic attribution.",
          "Required action: Replace with individual named admin accounts + MFA.",
        ].join("\n"),
      },
      dirs: {
        "/": [{ name: "ACCESS-REVIEW.txt", isDir: false }, { name: "findings", isDir: true }],
        "/findings": [
          { name: "TERM-USER.txt", isDir: false },
          { name: "PRIV-ACCOUNT.txt", isDir: false },
        ],
      },
    },
  },

  // ─── audit-05: Change Management ──────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "NASA Johnson Space Center", location: "Houston, Texas", era: "Present Day", emoji: "🚀" },
    id: "audit-05",
    order: 5,
    title: "No Unauthorized Changes",
    subtitle: "Change Management Controls — ITIL and CAB Process",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-05", name: "Change Manager", emoji: "🔄" },
    challengeType: "ctf",
    info: {
      tagline: "Every production change is a controlled experiment. Without the control, you are flying blind.",
      year: 1986,
      overview: [
        "Change management controls ensure that all modifications to production systems go through a documented, approved, and tested process before implementation. The ITIL framework defines three change types: Standard (pre-approved, low risk, routine), Normal (requires CAB review and approval), and Emergency (expedited approval for critical fixes, with post-hoc documentation).",
        "The Change Advisory Board (CAB) is the governance body that reviews and approves Normal changes. The CAB typically includes representation from IT, security, operations, and business stakeholders. Their role is to assess risk, ensure testing is complete, and confirm rollback plans exist before changes touch production.",
        "Auditors test change management by sampling production changes and verifying: approved change ticket exists, testing evidence is documented, segregation of duties between developer and approver, rollback plan documented, and post-implementation review completed. Emergency changes receive additional scrutiny — was the emergency justified, and was post-hoc approval obtained?",
      ],
      technical: {
        title: "Change Management Testing Checklist",
        body: [
          "For each sampled change: (1) Verify change ticket exists and was opened before the change was made. (2) Verify CAB approval is documented with approver name and date. (3) Verify developer and approver are different individuals (segregation of duties). (4) Verify test results are attached. (5) Verify rollback plan is documented. (6) Verify post-implementation review completed within 5 business days.",
          "Red flags in change management: changes applied outside the approved maintenance window, developer with production access (no segregation), emergency change rate above 10% (suggests process avoidance), changes with no testing documentation.",
        ],
        codeExample: {
          label: "Querying change tickets to find SoD violations",
          code: `SELECT
  change_id,
  developer,
  approver,
  change_date,
  CASE WHEN developer = approver THEN 'SOD VIOLATION' ELSE 'OK' END as sod_status
FROM change_tickets
WHERE change_date BETWEEN '2026-01-01' AND '2026-03-31'
  AND environment = 'PRODUCTION'
ORDER BY change_date;

-- Output:
-- CHG-1001  jsmith    t.williams  2026-01-08  OK
-- CHG-1003  jsmith    jsmith      2026-02-05  SOD VIOLATION  ← FINDING`,
        },
      },
      incident: {
        title: "The Knight Capital Flash Crash (2012)",
        when: "August 1, 2012",
        where: "NYSE, New York",
        impact: "$440M loss in 45 minutes; firm collapsed; acquired for $1.4B at distressed price",
        body: [
          "Knight Capital deployed new trading software to 8 of their 9 production servers. The 9th server still ran legacy code activated by a repurposed flag. Within 45 minutes, the legacy system executed 4 million erroneous trades. Change management controls failed: the deployment was not verified across all servers, and no automated rollback triggered.",
          "The post-incident review found that Knight lacked adequate change management controls for software deployments. No pre-deployment checklist verified all servers were updated. No monitoring detected the anomaly in time. A proper ITIL change process with deployment verification and automated alerts would have caught the partial deployment before trading opened.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Change Request", sub: "developer submits RFC", type: "attacker" },
          { label: "CAB Review", sub: "risk + approval", type: "system" },
          { label: "Test Environment", sub: "evidence required", type: "victim" },
          { label: "Production Deploy", sub: "within window + rollback", type: "result" },
        ],
      },
      timeline: [
        { year: 1986, event: "Challenger disaster — change management failures in O-ring decision" },
        { year: 2000, event: "ITIL v2 — change management process formalized for IT" },
        { year: 2012, event: "Knight Capital — $440M loss from failed software deployment", highlight: true },
        { year: 2019, event: "ITIL 4 — CAB replaced by 'change authority' for agile environments" },
      ],
      keyTakeaways: [
        "Three ITIL change types: Standard (pre-approved), Normal (CAB), Emergency (expedited + post-hoc)",
        "Segregation of duties: developer and approver must be different people",
        "Emergency change rate above 10% signals process circumvention",
        "Rollback plan is mandatory — if you cannot undo it, you cannot approve it",
      ],
      references: [
        { title: "ITIL 4 — Change Enablement Practice", url: "https://www.axelos.com/certifications/itil-service-management" },
        { title: "Knight Capital Post-Incident SEC Filing", url: "https://www.sec.gov/litigation/admin/2013/34-70694.pdf" },
      ],
    },
    ctf: {
      scenario: "NASA's mission control software change log has been pulled for audit. Identify the change that violated segregation of duties and was deployed outside the approved maintenance window.",
      hint: "Read the change log and maintenance window policy.",
      hints: [
        "Read: cat CHANGE-LOG.txt",
        "Check maintenance windows: cat MAINTENANCE-WINDOWS.txt",
        "Find the violation: cat findings/SoD-VIOLATION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/CHANGE-LOG.txt", value: "FLAG{CH4NG3_", label: "Change Log — Reviewed" },
        { trigger: "/MAINTENANCE-WINDOWS.txt", value: "M4N4G3M3NT_S0D_", label: "Maintenance Windows — Compared" },
        { trigger: "/findings/SoD-VIOLATION.txt", value: "W1ND0W}", label: "SoD Violation — Confirmed" },
      ],
      files: {
        "/CHANGE-LOG.txt": [
          "NASA MISSION CONTROL — CHANGE LOG Q1 2026",
          "==========================================",
          "CHG-2001  2026-01-10 02:00  jbryant   approved:t.morse   Telemetry patch    IN WINDOW",
          "CHG-2002  2026-01-24 03:00  akowalski approved:t.morse   Nav software v3.2  IN WINDOW",
          "CHG-2003  2026-02-11 14:37  jbryant   approved:jbryant   Hotfix comm module OUT OF WINDOW",
          "CHG-2004  2026-03-05 02:00  rchen     approved:t.morse   DB migration       IN WINDOW",
          "",
          "Maintenance window: Saturdays 01:00–05:00 EST.",
        ].join("\n"),
        "/MAINTENANCE-WINDOWS.txt": [
          "APPROVED MAINTENANCE WINDOWS — NASA MISSION CONTROL",
          "====================================================",
          "Standard window: Saturday 01:00–05:00 EST",
          "Emergency window: Requires VP Operations approval before deployment",
          "",
          "CHG-2003 deployed 2026-02-11 (Tuesday) at 14:37 — NOT a maintenance window.",
          "No emergency approval on file for CHG-2003.",
        ].join("\n"),
        "/findings/SoD-VIOLATION.txt": [
          "FINDING: CHG-2003 — DUAL SOD AND WINDOW VIOLATIONS",
          "===================================================",
          "1. Segregation of Duties: Developer (jbryant) = Approver (jbryant) — VIOLATION",
          "2. Maintenance Window: Deployed Tuesday 14:37 — outside approved window — VIOLATION",
          "3. No emergency CAB approval on file",
          "System affected: Communications module (safety-critical)",
          "Rating: CRITICAL — two control failures on safety-critical system",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "CHANGE-LOG.txt", isDir: false },
          { name: "MAINTENANCE-WINDOWS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "SoD-VIOLATION.txt", isDir: false }],
      },
    },
  },

  // ─── audit-06: BCP/DR ──────────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "FEMA National Response Center", location: "Washington, DC", era: "Present Day", emoji: "🛡️" },
    id: "audit-06",
    order: 6,
    title: "When Systems Fail",
    subtitle: "Business Continuity and Disaster Recovery Audit",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-06", name: "BCP Auditor", emoji: "🔁" },
    challengeType: "ctf",
    info: {
      tagline: "A recovery plan that has never been tested is a hope, not a control.",
      year: 2005,
      overview: [
        "Business Continuity Planning (BCP) and Disaster Recovery (DR) audits verify that an organization can continue critical operations and recover IT systems after a disruption. ISACA's CISA exam dedicates significant coverage to BCP/DR because untested recovery plans are one of the most common — and dangerous — audit findings.",
        "Key metrics in BCP/DR: the Recovery Time Objective (RTO) defines how long the business can tolerate a system being down. The Recovery Point Objective (RPO) defines how much data loss is acceptable. The Maximum Tolerable Downtime (MTD) is the absolute limit beyond which the business cannot survive. The BCP must ensure RTO and RPO are within the MTD.",
        "Auditors verify BCP/DR by reviewing documentation (plans, RTOs, RPOs), examining test evidence (tabletop exercises, full DR tests), and interviewing stakeholders. The most common findings: plans not updated after system changes, RTOs/RPOs not validated against business requirements, and DR tests never performed or with failing results that were not remediated.",
      ],
      technical: {
        title: "RTO, RPO, and MTD in Practice",
        body: [
          "Example: A payment processing system has an MTD of 4 hours (beyond 4 hours, regulatory fines begin and customers churn). The IT team sets RTO at 2 hours and RPO at 15 minutes. This means: the system must be restored within 2 hours of an outage, and no more than 15 minutes of transaction data can be lost. Backup frequency must be at least every 15 minutes.",
          "Auditors test these metrics during DR exercises. A DR test that takes 4 hours to complete has an actual RTO of 4 hours — which may exceed the 2-hour target. Evidence of failed DR tests that were not remediated is a significant audit finding.",
        ],
        codeExample: {
          label: "BCP gap analysis worksheet",
          code: `System              MTD    RTO Target  RPO Target  Last Test   Test Result
------------------  -----  ----------  ----------  ----------  -----------
Payment Processing  4h     2h          15min       2025-11-01  FAILED (3.5h)
Core Banking        8h     4h          1h          2025-06-15  PASSED
Customer Portal     24h    8h          4h          2024-12-01  NOT TESTED (18mo)
Trading Platform    1h     30min       5min        2026-03-01  PASSED

FINDINGS:
- Payment Processing: actual RTO 3.5h > 2h target — REMEDIATE
- Customer Portal: not tested in 18 months — CRITICAL FINDING`,
        },
      },
      incident: {
        title: "Hurricane Katrina — Data Center Failures (2005)",
        when: "August 29, 2005",
        where: "New Orleans, Louisiana",
        impact: "Multiple financial institutions lost data; weeks of downtime; regulatory sanctions",
        body: [
          "Hurricane Katrina exposed systematic BCP/DR failures across New Orleans financial institutions. Many had DR plans that assumed a regional disaster would not affect both primary and backup sites — but both sites were in the same flood zone. RTOs measured in hours were actually days when sites were physically inaccessible.",
          "Post-Katrina, federal banking regulators issued guidance requiring geographic separation of primary and backup data centers, annual DR tests that include full failover, and BCPs that account for multi-week outages. ISACA incorporated these requirements into the CISA curriculum as examples of what inadequate BCP/DR testing looks like.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Disaster Event", sub: "outage trigger", type: "attacker" },
          { label: "RTO / RPO", sub: "recovery targets", type: "system" },
          { label: "DR Test", sub: "validates actual recovery", type: "victim" },
          { label: "MTD Compliance", sub: "business survives", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "9/11 — firms with offsite backups and DR plans recovered; others did not" },
        { year: 2005, event: "Hurricane Katrina — geographic co-location of primary/backup exposed", highlight: true },
        { year: 2012, event: "Hurricane Sandy — NYSE and NASDAQ DR plans successfully activated" },
        { year: 2020, event: "COVID-19 — remote work BCP gaps exposed at scale" },
      ],
      keyTakeaways: [
        "RTO = maximum downtime; RPO = maximum data loss; MTD = absolute business limit",
        "RTO must be less than MTD — otherwise the plan fails the business",
        "Annual DR tests with documented results are required; failed tests must be remediated",
        "Backup sites must be geographically separated from primary sites",
      ],
      references: [
        { title: "NIST SP 800-34 — Contingency Planning Guide for IT Systems", url: "https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final" },
        { title: "ISACA BCP/DR Audit Program", url: "https://www.isaca.org/resources/isaca-journal" },
      ],
    },
    ctf: {
      scenario: "FEMA's internal systems are being audited for BCP/DR compliance. Read the DR test results and identify which system's actual RTO exceeds its target — creating a compliance gap.",
      hint: "Compare DR test results against approved RTO targets.",
      hints: [
        "Read: cat DR-TEST-RESULTS.txt",
        "Check targets: cat RTO-RPO-TARGETS.txt",
        "View the gap: cat findings/RTO-GAP.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/DR-TEST-RESULTS.txt", value: "FLAG{BCP_DR_", label: "DR Test Results — Loaded" },
        { trigger: "/RTO-RPO-TARGETS.txt", value: "RT0_T4RG3T_", label: "RTO/RPO Targets — Compared" },
        { trigger: "/findings/RTO-GAP.txt", value: "M1SS3D}", label: "RTO Gap — Finding Confirmed" },
      ],
      files: {
        "/DR-TEST-RESULTS.txt": [
          "FEMA DISASTER RECOVERY TEST — 2026-04-15",
          "=========================================",
          "Emergency Management System  Actual RTO: 1h 45min   Result: PASS",
          "Grant Management Portal      Actual RTO: 5h 20min   Result: FAIL",
          "Incident Reporting DB        Actual RTO: 3h 10min   Result: PASS",
          "Resource Tracking System     Actual RTO: 2h 05min   Result: PASS",
          "",
          "Cross-reference with RTO-RPO-TARGETS.txt to identify gaps.",
        ].join("\n"),
        "/RTO-RPO-TARGETS.txt": [
          "APPROVED RTO/RPO TARGETS — FEMA SYSTEMS",
          "=========================================",
          "Emergency Management System  RTO Target: 2h   RPO: 30min  MTD: 4h",
          "Grant Management Portal      RTO Target: 4h   RPO: 1h     MTD: 8h",
          "Incident Reporting DB        RTO Target: 4h   RPO: 2h     MTD: 8h",
          "Resource Tracking System     RTO Target: 4h   RPO: 2h     MTD: 8h",
          "",
          "Grant Management Portal target is 4h. Actual test result: 5h 20min.",
        ].join("\n"),
        "/findings/RTO-GAP.txt": [
          "FINDING: GRANT MANAGEMENT PORTAL — RTO TARGET MISSED",
          "======================================================",
          "Approved RTO target: 4 hours",
          "Actual RTO in DR test: 5 hours 20 minutes",
          "Gap: 1 hour 20 minutes above target",
          "MTD: 8 hours — business can still survive, but margin is reduced",
          "",
          "Finding: DR test FAILED. Remediation required before next audit.",
          "Required action: Investigate bottleneck; retest within 60 days.",
          "Rating: HIGH — DR plan does not meet approved targets",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "DR-TEST-RESULTS.txt", isDir: false },
          { name: "RTO-RPO-TARGETS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "RTO-GAP.txt", isDir: false }],
      },
    },
  },

  // ─── audit-07: Incident Response ──────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "CISA Headquarters", location: "Arlington, Virginia", era: "Present Day", emoji: "🚨" },
    id: "audit-07",
    order: 7,
    title: "Incident Response Readiness",
    subtitle: "Auditing the IR Program Against NIST SP 800-61",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-07", name: "IR Auditor", emoji: "🧯" },
    challengeType: "ctf",
    info: {
      tagline: "An incident response plan that lives in a SharePoint folder and was never exercised is not a control.",
      year: 2012,
      overview: [
        "Incident Response (IR) program audits assess whether an organization can effectively detect, contain, eradicate, and recover from security incidents. ISACA auditors use NIST SP 800-61 as the primary framework: the four phases are Preparation, Detection and Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.",
        "The Preparation phase is the most auditable: Does an IR plan exist and is it current? Are roles and responsibilities documented? Has the plan been exercised (tabletop or full simulation) within the past year? Are contact lists current? Is there a documented severity classification scheme?",
        "Detection and Analysis controls are tested by reviewing SIEM alerts, examining incident tickets, and validating that detection tools are properly tuned. Auditors look for: time to detect (how long did it take to notice the incident?), time to contain, and whether escalation followed the documented process.",
      ],
      technical: {
        title: "IR Program Audit Checklist",
        body: [
          "Preparation: IR plan reviewed and updated within 12 months, roles assigned, contact list current, tabletop exercise within 12 months, severity classification matrix defined, communication plan (legal/PR/regulators) documented.",
          "Detection: SIEM deployed and tuned, log retention meets policy (typically 90 days online, 1 year archived), alert thresholds reviewed quarterly, threat intelligence feeds integrated. Containment: playbooks for top 5 incident types (ransomware, data breach, insider threat, DDoS, phishing) documented and tested.",
        ],
        codeExample: {
          label: "IR metrics — measuring detection and response time",
          code: `# Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)
# From incident ticket system

SELECT
  incident_id,
  severity,
  DATEDIFF(hour, event_time, detection_time) as hours_to_detect,
  DATEDIFF(hour, detection_time, containment_time) as hours_to_contain
FROM incidents
WHERE year = 2026
ORDER BY severity DESC;

-- Results show:
-- SEV-1 incidents: avg 4.2h to detect, 1.8h to contain
-- Industry benchmark: SEV-1 detect < 1h, contain < 4h
-- Finding: Detection time exceeds benchmark — SIEM tuning required`,
        },
      },
      incident: {
        title: "The Equifax Breach Detection Failure (2017)",
        when: "May–July 2017",
        where: "Atlanta, Georgia",
        impact: "147M records compromised; $575M FTC settlement; CISO and CEO resigned",
        body: [
          "Equifax's Apache Struts vulnerability was exploited on May 13, 2017. The company did not detect the breach until July 29 — 78 days later. The SSL inspection tool that would have detected the malicious traffic had been expired for 19 months due to a certificate renewal failure. No one noticed.",
          "The IR program audit failure was threefold: the detection tool was broken (preparation failure), no compensating control detected the 78-day exfiltration (detection failure), and the incident response was slow once detection occurred (response failure). CISA now uses Equifax as the canonical example of IR program deficiencies in their training materials.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Preparation", sub: "plan + exercise + tools", type: "attacker" },
          { label: "Detection & Analysis", sub: "SIEM + alerts", type: "system" },
          { label: "Containment / Eradication", sub: "isolate + remove", type: "victim" },
          { label: "Post-Incident Review", sub: "lessons learned", type: "result" },
        ],
      },
      timeline: [
        { year: 2004, event: "NIST SP 800-61 first published — IR lifecycle framework" },
        { year: 2012, event: "NIST SP 800-61 Rev 2 — updated with advanced threat guidance" },
        { year: 2017, event: "Equifax — 78-day dwell time; broken detection tool", highlight: true },
        { year: 2023, event: "SEC cyber rules — public companies must disclose incidents within 4 business days" },
      ],
      keyTakeaways: [
        "Four IR phases: Preparation, Detection and Analysis, Containment/Eradication/Recovery, Post-Incident",
        "Tabletop exercise at minimum annually — full simulation preferred",
        "Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) are key metrics",
        "Broken detection tools with no compensating controls = critical IR program gap",
      ],
      references: [
        { title: "NIST SP 800-61 Rev 2 — Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
        { title: "CISA Incident Response Resources", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/information-sharing-and-awareness" },
      ],
    },
    ctf: {
      scenario: "You are auditing CISA's own IR program. The IR plan metadata and last exercise results are on the audit terminal. Identify the control gap that would receive an audit finding.",
      hint: "Check the IR plan currency and the exercise results.",
      hints: [
        "Read: cat IR-PLAN-METADATA.txt",
        "Check exercise: cat TABLETOP-RESULTS.txt",
        "View the finding: cat findings/IR-GAP.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/IR-PLAN-METADATA.txt", value: "FLAG{1R_PL4N_", label: "IR Plan — Metadata Loaded" },
        { trigger: "/TABLETOP-RESULTS.txt", value: "0UTDAT3D_T4BL3T0P_", label: "Tabletop — Results Reviewed" },
        { trigger: "/findings/IR-GAP.txt", value: "F41L}", label: "IR Gap — Finding Confirmed" },
      ],
      files: {
        "/IR-PLAN-METADATA.txt": [
          "INCIDENT RESPONSE PLAN — METADATA",
          "==================================",
          "Document: IR-PLAN-v3.2.docx",
          "Last updated: 2024-08-01 (21 months ago)",
          "Next scheduled review: 2025-08-01 (OVERDUE by 9 months)",
          "Plan owner: CISO",
          "Status: STALE — not reviewed after Colonial Pipeline TTX findings",
          "",
          "Note: Plan does not include ransomware playbook (added to scope 2025-01).",
        ].join("\n"),
        "/TABLETOP-RESULTS.txt": [
          "TABLETOP EXERCISE RESULTS — Last conducted: 2024-06-15",
          "========================================================",
          "Scenario: Ransomware attack on OT systems",
          "Participants: IR team, IT, Legal, Communications",
          "Duration: 4 hours",
          "",
          "Open action items from exercise (UNRESOLVED as of 2026-05-15):",
          "  1. Update IR plan with ransomware playbook — DUE 2024-09-01 — OVERDUE",
          "  2. Establish encrypted out-of-band comms channel — DUE 2024-10-01 — OVERDUE",
          "  3. Test backup restoration — DUE 2024-12-01 — OVERDUE",
          "",
          "No tabletop conducted in the past 12 months.",
        ].join("\n"),
        "/findings/IR-GAP.txt": [
          "IR PROGRAM AUDIT FINDINGS",
          "==========================",
          "FINDING-01: IR plan not updated in 21 months (requirement: annual)",
          "FINDING-02: No tabletop exercise in past 12 months (requirement: annual)",
          "FINDING-03: 3 open action items from last tabletop — all overdue",
          "FINDING-04: No ransomware playbook despite ransomware being primary threat",
          "",
          "Overall IR Program Rating: INEFFECTIVE",
          "Required: Update plan, conduct tabletop within 60 days, close all action items.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "IR-PLAN-METADATA.txt", isDir: false },
          { name: "TABLETOP-RESULTS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "IR-GAP.txt", isDir: false }],
      },
    },
  },

  // ─── audit-08: Vendor Risk ─────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "The Pentagon", location: "Arlington, Virginia", era: "Present Day", emoji: "🔗" },
    id: "audit-08",
    order: 8,
    title: "The Supply Chain Threat",
    subtitle: "Vendor and Third-Party Risk Management",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-08", name: "Vendor Risk Manager", emoji: "🤝" },
    challengeType: "ctf",
    info: {
      tagline: "Your security is only as strong as the weakest vendor with access to your systems.",
      year: 2020,
      overview: [
        "Vendor and third-party risk management (TPRM) audits verify that an organization has appropriate controls over the vendors, suppliers, and partners who access their systems or data. ISACA defines this as part of the APO10 (Managed Vendors) control objective in COBIT.",
        "The TPRM lifecycle has five stages: inventory (know all your vendors), classification (tier them by risk), assessment (evaluate their security controls), contractual requirements (SLAs, right to audit, breach notification), and ongoing monitoring (annual reassessment, continuous monitoring for critical vendors).",
        "Third-party risk is the primary attack vector for supply chain attacks. Auditors verify: Does a complete vendor inventory exist? Are vendors classified by risk tier? Do high-risk vendors complete annual security assessments? Do contracts include right-to-audit clauses and breach notification timelines? Are vendor access permissions reviewed when the vendor relationship ends?",
      ],
      technical: {
        title: "Vendor Tiering and Assessment Requirements",
        body: [
          "Tier 1 vendors (Critical): Access to sensitive data or critical systems, or single-source dependencies. Require: annual security assessment, SOC 2 Type II report or equivalent, contractual right to audit, continuous monitoring, quarterly access reviews.",
          "Tier 2 vendors (High): Process business data or have network connectivity. Require: annual questionnaire, contractual security requirements, breach notification within 72 hours. Tier 3 vendors (Low): No system access, commodity purchases. Require: basic vendor registration and standard contract terms.",
        ],
        codeExample: {
          label: "Vendor risk register — identifying overdue assessments",
          code: `SELECT
  vendor_name,
  tier,
  last_assessment_date,
  DATEDIFF(day, last_assessment_date, GETDATE()) as days_since_assessment,
  CASE
    WHEN tier = 1 AND DATEDIFF(day, last_assessment_date, GETDATE()) > 365
    THEN 'OVERDUE — Tier 1'
    WHEN tier = 2 AND DATEDIFF(day, last_assessment_date, GETDATE()) > 365
    THEN 'OVERDUE — Tier 2'
    ELSE 'CURRENT'
  END as status
FROM vendor_register
WHERE has_system_access = 1
ORDER BY tier, days_since_assessment DESC;`,
        },
      },
      incident: {
        title: "The SolarWinds Supply Chain Attack (2020)",
        when: "October 2019 – December 2020",
        where: "Austin, Texas (SolarWinds HQ)",
        impact: "18,000 organizations compromised; 9 US federal agencies breached; $40M+ in response costs",
        body: [
          "The SolarWinds attack was a textbook supply chain attack that exploited vendor trust relationships. Attackers compromised SolarWinds' build pipeline and inserted malicious code into the Orion software update. Organizations that had not classified SolarWinds as a critical vendor had no enhanced monitoring of the software's network activity.",
          "Post-incident analysis found that many affected organizations had not reviewed SolarWinds' access permissions despite Orion having broad network visibility. Vendor risk assessments, if conducted at all, relied on questionnaires rather than examining actual system access and network behavior. CISA's guidance following SolarWinds directly informed updated TPRM requirements.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Vendor Inventory", sub: "know every vendor", type: "attacker" },
          { label: "Risk Tiering", sub: "classify by impact", type: "system" },
          { label: "Security Assessment", sub: "SOC 2 / questionnaire", type: "victim" },
          { label: "Contract + Monitoring", sub: "right to audit + alerts", type: "result" },
        ],
      },
      timeline: [
        { year: 2013, event: "Target breach — HVAC vendor used as attack entry point" },
        { year: 2019, event: "SolarWinds build pipeline compromised (discovered December 2020)", highlight: true },
        { year: 2021, event: "Biden Executive Order 14028 — software supply chain security requirements" },
        { year: 2023, event: "SEC rules — vendor breach disclosure requirements for public companies" },
      ],
      keyTakeaways: [
        "Vendor inventory is the foundation — you cannot manage what you have not identified",
        "Tier 1 critical vendors require annual SOC 2 Type II reviews and right-to-audit clauses",
        "Vendor access must be deprovisioned when the relationship ends — not eventually",
        "Questionnaire-only assessments are insufficient for critical vendors with system access",
      ],
      references: [
        { title: "CISA Supply Chain Risk Management Resources", url: "https://www.cisa.gov/supply-chain-risk-management" },
        { title: "NIST SP 800-161 — Cybersecurity Supply Chain Risk Management", url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final" },
      ],
    },
    ctf: {
      scenario: "The Pentagon's vendor register has been pulled for audit. Identify the Tier 1 vendor with an overdue security assessment that has active privileged access to defense systems.",
      hint: "Check the vendor register and cross-reference assessment dates.",
      hints: [
        "Read: cat VENDOR-REGISTER.txt",
        "Check Tier 1 assessments: cat TIER1-ASSESSMENTS.txt",
        "View the finding: cat findings/OVERDUE-VENDOR.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/VENDOR-REGISTER.txt", value: "FLAG{V3ND0R_", label: "Vendor Register — Loaded" },
        { trigger: "/TIER1-ASSESSMENTS.txt", value: "T13R1_4SS3SSM3NT_", label: "Tier 1 Assessments — Reviewed" },
        { trigger: "/findings/OVERDUE-VENDOR.txt", value: "0V3RDUE}", label: "Overdue Vendor — Finding Confirmed" },
      ],
      files: {
        "/VENDOR-REGISTER.txt": [
          "PENTAGON VENDOR REGISTER (EXCERPT)",
          "====================================",
          "Vendor              Tier  Access Level         Last Assessment",
          "------------------  ----  -------------------  ---------------",
          "Lockheed Martin     1     Classified systems   2025-11-01",
          "Booz Allen Hamilton 1     Admin — all networks  2024-03-15",
          "SAIC                1     Read — logistics DB  2025-09-20",
          "Dell Technologies   2     Hardware only        2025-06-01",
          "Staples             3     No system access     N/A",
          "",
          "Tier 1 vendors require annual assessment. See TIER1-ASSESSMENTS.txt.",
        ].join("\n"),
        "/TIER1-ASSESSMENTS.txt": [
          "TIER 1 VENDOR ASSESSMENT STATUS",
          "================================",
          "Lockheed Martin:      Last: 2025-11-01  Days since: 196  Status: CURRENT",
          "Booz Allen Hamilton:  Last: 2024-03-15  Days since: 426  Status: OVERDUE",
          "SAIC:                 Last: 2025-09-20  Days since: 238  Status: CURRENT",
          "",
          "Booz Allen Hamilton: 426 days since last assessment.",
          "BAH has admin access to ALL classified networks.",
          "SOC 2 Type II expired. No current assessment on file.",
        ].join("\n"),
        "/findings/OVERDUE-VENDOR.txt": [
          "FINDING: BOOZ ALLEN HAMILTON — OVERDUE TIER 1 ASSESSMENT",
          "==========================================================",
          "Vendor: Booz Allen Hamilton",
          "Tier: 1 (Critical) — Admin access to all classified networks",
          "Last assessment: 2024-03-15 (426 days ago)",
          "Requirement: Annual (365 days max)",
          "SOC 2 Type II: EXPIRED",
          "",
          "CRITICAL: A vendor with admin access to all classified networks has no",
          "current security assessment on file.",
          "Required action: Suspend vendor access until assessment is completed.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "VENDOR-REGISTER.txt", isDir: false },
          { name: "TIER1-ASSESSMENTS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "OVERDUE-VENDOR.txt", isDir: false }],
      },
    },
  },

  // ─── audit-09: Data Privacy ────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "European Data Protection Board", location: "Brussels, Belgium", era: "Present Day", emoji: "📋" },
    id: "audit-09",
    order: 9,
    title: "The Right to Be Forgotten",
    subtitle: "Data Privacy Audit — GDPR and Data Lifecycle Controls",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-09", name: "Privacy Auditor", emoji: "🔏" },
    challengeType: "ctf",
    info: {
      tagline: "Collecting data you do not need is a liability, not an asset.",
      year: 2018,
      overview: [
        "Data privacy audits assess whether an organization collects, processes, retains, and deletes personal data in accordance with applicable privacy regulations — primarily GDPR in Europe, CCPA in California, and sector-specific regulations like HIPAA. ISACA's privacy framework maps directly to GDPR's six lawful bases for processing and eight data subject rights.",
        "The audit scope covers: data mapping (what personal data is held, where, and why), consent mechanisms (is collection lawful?), data subject rights fulfillment (deletion, access, portability requests), data retention and deletion schedules, breach notification procedures (GDPR requires notification within 72 hours of discovery), and Data Protection Impact Assessments (DPIAs) for high-risk processing.",
        "Common findings in privacy audits: personal data retained beyond the documented retention period, no documented legal basis for processing, data subject access requests not fulfilled within the required 30-day window, no DPIA for high-risk processing activities, and breach notification processes not meeting the 72-hour requirement.",
      ],
      technical: {
        title: "GDPR Key Requirements for Auditors",
        body: [
          "Article 5 principles — lawfulness, fairness, transparency; purpose limitation; data minimization; accuracy; storage limitation; integrity and confidentiality. Auditors verify each principle is implemented with documented controls.",
          "Article 17 (right to erasure / right to be forgotten): when a user requests deletion, the organization must delete their data from all systems (including backups that are routinely accessed) within 30 days. Auditors test by sampling deletion requests and verifying data was actually removed from all data stores.",
        ],
        codeExample: {
          label: "Data retention audit — finding records past retention date",
          code: `-- Find personal data records past retention schedule
SELECT
  table_name,
  COUNT(*) as record_count,
  MIN(created_date) as oldest_record,
  DATEDIFF(day, MIN(created_date), GETDATE()) as days_retained
FROM personal_data_inventory
WHERE data_category IN ('PII', 'sensitive', 'financial')
GROUP BY table_name
HAVING DATEDIFF(day, MIN(created_date), GETDATE()) > retention_days
ORDER BY days_retained DESC;

-- Output example:
-- customer_analytics  45,210 records  oldest: 2017-03-01  3,362 days retained
-- Retention schedule: 730 days (2 years)  → EXCEEDS BY 1,632 DAYS — FINDING`,
        },
      },
      incident: {
        title: "Meta GDPR Fine — Data Transfers to the US (2023)",
        when: "May 2023",
        where: "Ireland (Meta's EU headquarters)",
        impact: "€1.2B fine — largest GDPR fine ever issued",
        body: [
          "The Irish Data Protection Commission fined Meta €1.2 billion for transferring European users' personal data to US servers without adequate legal basis after the EU-US Privacy Shield was invalidated. Meta had continued transfers for years after the legal basis was struck down, relying on Standard Contractual Clauses that the regulator found insufficient.",
          "The audit trail was clear: Meta's data flows were documented, the legal basis had been invalidated, and Meta continued processing anyway. Privacy auditors look for exactly this gap — processing that continues after the legal basis changes. A GDPR audit would have flagged the inadequate transfer mechanism and recommended remediation before regulatory action.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Data Mapping", sub: "what, where, why", type: "attacker" },
          { label: "Lawful Basis", sub: "GDPR Article 6", type: "system" },
          { label: "Subject Rights", sub: "access, delete, port", type: "victim" },
          { label: "72h Breach Notice", sub: "to supervisory authority", type: "result" },
        ],
      },
      timeline: [
        { year: 2018, event: "GDPR effective — May 25, 2018", highlight: true },
        { year: 2019, event: "British Airways — £20M fine for breach affecting 400K customers" },
        { year: 2021, event: "WhatsApp — €225M fine for transparency violations" },
        { year: 2023, event: "Meta — €1.2B fine for unlawful data transfers to US" },
      ],
      keyTakeaways: [
        "Data minimization: only collect what you need for documented purposes",
        "Retention schedules must be enforced — data past its retention date is a liability",
        "Data subject requests (deletion, access) must be fulfilled within 30 days",
        "GDPR breach notification: 72 hours to supervisory authority, without undue delay to subjects",
      ],
      references: [
        { title: "GDPR Full Text — EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" },
        { title: "ISACA Privacy Audit Framework", url: "https://www.isaca.org/resources/privacy" },
      ],
    },
    ctf: {
      scenario: "You are auditing a company's GDPR compliance. The data inventory shows personal data retained far beyond policy. Identify the table with the worst violation and confirm the deletion requirement.",
      hint: "Read the data inventory and compare to retention schedules.",
      hints: [
        "Read: cat DATA-INVENTORY.txt",
        "Check schedules: cat RETENTION-SCHEDULE.txt",
        "View finding: cat findings/RETENTION-VIOLATION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/DATA-INVENTORY.txt", value: "FLAG{GDPR_", label: "Data Inventory — Loaded" },
        { trigger: "/RETENTION-SCHEDULE.txt", value: "D4T4_R3T3NT10N_", label: "Retention Schedule — Compared" },
        { trigger: "/findings/RETENTION-VIOLATION.txt", value: "V10L4T10N}", label: "Retention Violation — Confirmed" },
      ],
      files: {
        "/DATA-INVENTORY.txt": [
          "PERSONAL DATA INVENTORY",
          "=======================",
          "Table                   Records    Oldest Record    Days Retained",
          "----------------------  ---------  ---------------  -------------",
          "customer_profiles       2,340,000  2019-01-15       2676 days",
          "transaction_history     8,100,000  2018-06-01       2905 days",
          "marketing_analytics     450,000    2017-03-10       3353 days",
          "support_tickets         230,000    2020-11-01       1656 days",
          "",
          "Cross-reference with RETENTION-SCHEDULE.txt.",
        ].join("\n"),
        "/RETENTION-SCHEDULE.txt": [
          "GDPR DATA RETENTION SCHEDULE",
          "=============================",
          "customer_profiles       Retention: 1825 days (5 years)",
          "transaction_history     Retention: 2555 days (7 years — financial regulation)",
          "marketing_analytics     Retention: 730 days (2 years)",
          "support_tickets         Retention: 1825 days (5 years)",
          "",
          "marketing_analytics: retained 3353 days vs 730-day limit — EXCEEDS BY 2623 DAYS.",
        ].join("\n"),
        "/findings/RETENTION-VIOLATION.txt": [
          "GDPR FINDING: MARKETING_ANALYTICS RETENTION VIOLATION",
          "=======================================================",
          "Table: marketing_analytics",
          "Records: 450,000 EU data subjects",
          "Oldest record: 2017-03-10 (3353 days ago)",
          "Retention policy: 730 days",
          "Overage: 2623 days (7.2 years past retention date)",
          "",
          "GDPR Article 5(1)(e): storage limitation principle violated.",
          "Required action: Delete all records older than 730 days immediately.",
          "Notify DPO. Consider whether supervisory authority notification is required.",
          "Rating: CRITICAL — potential regulatory action",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "DATA-INVENTORY.txt", isDir: false },
          { name: "RETENTION-SCHEDULE.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "RETENTION-VIOLATION.txt", isDir: false }],
      },
    },
  },

  // ─── audit-10: Pen Test Scoping ────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "NIST Campus", location: "Gaithersburg, Maryland", era: "Present Day", emoji: "🔍" },
    id: "audit-10",
    order: 10,
    title: "Rules of Engagement",
    subtitle: "Penetration Test Scoping and Authorization",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-10", name: "Pentest Auditor", emoji: "🎯" },
    challengeType: "ctf",
    info: {
      tagline: "An unauthorized penetration test is a crime. Authorization is the only thing separating a pentester from an attacker.",
      year: 2003,
      overview: [
        "Penetration testing is a critical control in any mature security program, but it must be properly scoped, authorized, and documented to be effective — and legal. ISACA auditors review pentest programs to verify: clear scope definition, written authorization from system owners, rules of engagement (what is allowed and prohibited), and requirements for findings reporting and remediation tracking.",
        "The scope document defines exactly which systems are in scope (IP ranges, domains, applications), what types of testing are permitted (external, internal, social engineering, physical), the testing window (dates and times), and escalation procedures if a critical finding is discovered during the test. Out-of-scope systems must be clearly listed.",
        "Authorization must come from the system owner, not just IT management. Cloud workloads require cloud provider authorization (AWS, Azure, GCP each have penetration testing policies). Production systems require additional approvals and often require that a rollback plan exists before testing begins.",
      ],
      technical: {
        title: "Pentest Scoping Checklist",
        body: [
          "Scope document must include: (1) Explicit list of in-scope IP addresses/ranges/domains. (2) Explicit list of out-of-scope systems. (3) Test types permitted (network, web app, social engineering, physical). (4) Testing window with start/end dates and business hours restrictions. (5) Emergency contact list with escalation procedures. (6) Data handling requirements for discovered credentials.",
          "Authorization checklist: (1) Written authorization signed by system owner. (2) Cloud provider authorization confirmed. (3) Third-party systems excluded unless their owner provides separate authorization. (4) Legal review completed if testing crosses jurisdictions.",
        ],
        codeExample: {
          label: "Scope validation — confirming IP is in authorized range",
          code: `#!/usr/bin/env python3
# Before any scan, validate target is in scope

import ipaddress

AUTHORIZED_RANGES = [
    "192.168.1.0/24",
    "10.0.0.0/8",
    "172.16.50.0/24",
]

OUT_OF_SCOPE = [
    "192.168.1.100",  # payment processor — explicitly excluded
    "10.0.0.1",       # core router — excluded
]

def is_authorized(target_ip):
    for oor in OUT_OF_SCOPE:
        if target_ip == oor:
            return False, "EXPLICITLY OUT OF SCOPE — DO NOT TEST"
    for cidr in AUTHORIZED_RANGES:
        if ipaddress.ip_address(target_ip) in ipaddress.ip_network(cidr):
            return True, "IN SCOPE"
    return False, "NOT IN SCOPE"`,
        },
      },
      incident: {
        title: "The AT&T Pentest Authorization Dispute (2010)",
        when: "2010",
        where: "United States",
        impact: "Security researchers arrested; charges later dropped; highlighted importance of written authorization",
        body: [
          "In 2010, security researchers discovered a vulnerability in AT&T's iPad activation API that exposed 114,000 email addresses of early iPad adopters. They extracted a subset of data to demonstrate the vulnerability, then notified AT&T and Gawker. The FBI investigated the researchers for unauthorized access despite their defensive intent.",
          "The case highlighted a fundamental principle: without written authorization from the system owner, any access — even well-intentioned security research — can be prosecuted under the Computer Fraud and Abuse Act (CFAA). Proper pentest scoping and authorization is both a security control and a legal protection for the testers.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Scope Definition", sub: "what is in/out", type: "attacker" },
          { label: "Written Authorization", sub: "from system owner", type: "system" },
          { label: "Rules of Engagement", sub: "what is permitted", type: "victim" },
          { label: "Findings + Remediation", sub: "tracked to closure", type: "result" },
        ],
      },
      timeline: [
        { year: 1986, event: "CFAA enacted — unauthorized computer access becomes federal crime" },
        { year: 2003, event: "NIST SP 800-42 — guideline on network security testing published" },
        { year: 2010, event: "AT&T/iPad incident — authorization requirement in stark relief", highlight: true },
        { year: 2022, event: "CFAA reform — good-faith security research explicitly protected" },
      ],
      keyTakeaways: [
        "Written authorization from the system owner is legally required before any testing",
        "Cloud workloads require explicit cloud provider approval (each provider has a policy)",
        "Out-of-scope systems must be explicitly listed — ambiguity protects no one",
        "All discovered credentials must be handled per the data handling section of the scope doc",
      ],
      references: [
        { title: "NIST SP 800-115 — Technical Guide to Information Security Testing", url: "https://csrc.nist.gov/publications/detail/sp/800-115/final" },
        { title: "AWS Penetration Testing Policy", url: "https://aws.amazon.com/security/penetration-testing/" },
      ],
    },
    ctf: {
      scenario: "You are reviewing a penetration test engagement. The scope document and tester's activity log have been loaded. Determine whether the tester exceeded the authorized scope.",
      hint: "Compare the tester's activity log against the authorized scope document.",
      hints: [
        "Read: cat SCOPE-DOCUMENT.txt",
        "Check activity: cat TESTER-ACTIVITY-LOG.txt",
        "View finding: cat findings/SCOPE-VIOLATION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/SCOPE-DOCUMENT.txt", value: "FLAG{P3NT3ST_", label: "Scope Document — Loaded" },
        { trigger: "/TESTER-ACTIVITY-LOG.txt", value: "SC0P3_V10L4T10N_", label: "Activity Log — Compared" },
        { trigger: "/findings/SCOPE-VIOLATION.txt", value: "CFAA}", label: "Scope Violation — Confirmed" },
      ],
      files: {
        "/SCOPE-DOCUMENT.txt": [
          "PENETRATION TEST SCOPE DOCUMENT",
          "================================",
          "Client: Meridian Bank",
          "Tester: RedTeam Associates",
          "Period: 2026-05-01 through 2026-05-14",
          "",
          "IN SCOPE:",
          "  192.168.10.0/24  — DMZ web servers",
          "  192.168.20.0/24  — application servers",
          "",
          "EXPLICITLY OUT OF SCOPE:",
          "  192.168.30.0/24  — core banking systems (production)",
          "  192.168.40.0/24  — ATM network",
          "  Social engineering against customers",
          "",
          "Permitted: External network testing, web application testing.",
          "Prohibited: Exploitation of production banking systems.",
        ].join("\n"),
        "/TESTER-ACTIVITY-LOG.txt": [
          "TESTER ACTIVITY LOG — RedTeam Associates",
          "=========================================",
          "2026-05-02 09:15  nmap scan 192.168.10.0/24 — IN SCOPE",
          "2026-05-03 14:30  web app test 192.168.20.45 — IN SCOPE",
          "2026-05-05 11:00  nmap scan 192.168.30.0/24 — CORE BANKING",
          "2026-05-07 15:45  exploit attempt 192.168.30.12 — CORE BANKING",
          "2026-05-10 09:00  phishing email to customer@meridianbank.com — PROHIBITED",
          "",
          "2026-05-05 and 2026-05-07: Core banking (out of scope) accessed.",
          "2026-05-10: Customer social engineering prohibited by scope document.",
        ].join("\n"),
        "/findings/SCOPE-VIOLATION.txt": [
          "FINDING: PENETRATION TESTER EXCEEDED AUTHORIZED SCOPE",
          "=======================================================",
          "Violation 1: Scanned 192.168.30.0/24 (core banking) — explicitly out of scope",
          "Violation 2: Exploited 192.168.30.12 — production banking system",
          "Violation 3: Phished a customer — social engineering against customers prohibited",
          "",
          "Legal exposure: CFAA violations possible if client pursues action.",
          "Required action: Cease all testing immediately. Legal review required.",
          "Report all out-of-scope access to client within 24 hours.",
          "Rating: CRITICAL — unauthorized access to production financial systems",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "SCOPE-DOCUMENT.txt", isDir: false },
          { name: "TESTER-ACTIVITY-LOG.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "SCOPE-VIOLATION.txt", isDir: false }],
      },
    },
  },

  // ─── audit-11: Audit Evidence ──────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "SEC Headquarters", location: "Washington, DC", era: "Present Day", emoji: "⚖️" },
    id: "audit-11",
    order: 11,
    title: "The Evidence Chain",
    subtitle: "Audit Evidence Standards and Sampling Methodology",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-11", name: "Evidence Examiner", emoji: "🔬" },
    challengeType: "ctf",
    info: {
      tagline: "An assertion without evidence is an opinion. An audit finding without evidence is worthless.",
      year: 1972,
      overview: [
        "Audit evidence is the information auditors use to support their findings and conclusions. ISACA defines three attributes that make evidence sufficient: it must be sufficient (enough to support the conclusion), reliable (from a credible source, obtained through a sound method), and relevant (it actually addresses the control being tested).",
        "Audit sampling determines how many items to test when testing every item is impractical. Statistical sampling uses probability theory to project results to the full population with a known confidence level. Judgmental (non-statistical) sampling relies on auditor expertise. For CISA purposes, the key sampling concepts are: population definition, sample selection method, sample size determination, and projection of results.",
        "Evidence quality hierarchy (highest to lowest): physical evidence (observed directly), documentary evidence (records, logs, reports), testimonial evidence (interviews), and analytical evidence (ratios, trends, comparisons). Auditors prefer higher-quality evidence and must document the source, collection method, and chain of custody for every piece of evidence.",
      ],
      technical: {
        title: "Statistical Sampling for IT Audit",
        body: [
          "Attribute sampling is used to test whether a control is operating effectively. The auditor defines: the population (all changes in Q1), the attribute being tested (each change has a valid approval), the acceptable deviation rate (5%), and the desired confidence level (95%). Statistical tables then determine the sample size.",
          "For a population of 1,000 items, a 95% confidence level with 5% acceptable deviation rate requires approximately 60 items. If the auditor finds 3 deviations in 60 items (5%), the deviation rate in the population likely exceeds the acceptable threshold — the control is not operating effectively.",
        ],
        codeExample: {
          label: "Calculating sample size for attribute sampling",
          code: `# Attribute sampling — using AICPA sampling tables
# Population: 1,200 change tickets in Q1
# Confidence level: 95%
# Tolerable deviation rate: 5%
# Expected deviation rate: 0% (assume controls working)

# From AICPA table: sample size = 60

population = 1200
sample_size = 60
deviations_found = 4  # found 4 tickets without approval

sample_deviation_rate = deviations_found / sample_size
# = 4/60 = 6.7%

if sample_deviation_rate > 0.05:  # exceeds 5% tolerable rate
    print(f"CONTROL FAILURE: {sample_deviation_rate:.1%} deviation rate")
    print("Conclude: Change management control NOT operating effectively")
    print("Action: Expand testing or issue finding")`,
        },
      },
      incident: {
        title: "Arthur Andersen and Enron — Evidence Destruction (2002)",
        when: "2002",
        where: "Houston, Texas",
        impact: "Arthur Andersen convicted of obstruction; 85,000 employees lost jobs; firm dissolved",
        body: [
          "Arthur Andersen, Enron's auditor, shredded thousands of documents and deleted emails after learning of the SEC investigation into Enron. The destruction of audit evidence led to Arthur Andersen's criminal conviction for obstruction of justice — the first conviction of a major accounting firm in US history.",
          "The case established that audit evidence must be preserved, not just collected. Modern audit standards require evidence retention for a minimum of 7 years. Digital evidence must be preserved in a tamper-evident format, with hash values computed at collection to detect later modification.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Evidence Collection", sub: "sufficient + reliable", type: "attacker" },
          { label: "Sampling", sub: "statistical or judgmental", type: "system" },
          { label: "Documentation", sub: "chain of custody", type: "victim" },
          { label: "Workpaper", sub: "supports conclusion", type: "result" },
        ],
      },
      timeline: [
        { year: 1972, event: "AICPA sampling standards first published for financial audit" },
        { year: 2002, event: "Arthur Andersen — evidence destruction conviction; firm dissolved", highlight: true },
        { year: 2004, event: "PCAOB AS 1215 — audit documentation standards for IT controls" },
        { year: 2023, event: "ISACA CISA updated — digital evidence handling and AI tool documentation" },
      ],
      keyTakeaways: [
        "Evidence must be sufficient, reliable, and relevant to the control tested",
        "Statistical sampling projects results to the full population with known confidence",
        "Deviation rate exceeding the tolerable rate means the control is not operating effectively",
        "Audit evidence must be retained for 7 years and preserved in tamper-evident format",
      ],
      references: [
        { title: "AICPA AU-C Section 530 — Audit Sampling", url: "https://us.aicpa.org/content/dam/aicpa/research/standards/auditattest/downloadabledocuments/au-c-00530.pdf" },
        { title: "ISACA Audit Standards", url: "https://www.isaca.org/resources/isaca-journal/issues/2017/volume-3/it-audit-evidence" },
      ],
    },
    ctf: {
      scenario: "The SEC audit team has sampled change tickets from a broker-dealer. The sample results are loaded. Determine whether the deviation rate exceeds the tolerable threshold and what conclusion the auditor must reach.",
      hint: "Read the sample results and calculate the deviation rate.",
      hints: [
        "Read: cat SAMPLE-RESULTS.txt",
        "Check thresholds: cat SAMPLING-PARAMETERS.txt",
        "View conclusion: cat findings/CONTROL-CONCLUSION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/SAMPLE-RESULTS.txt", value: "FLAG{4UD1T_", label: "Sample Results — Loaded" },
        { trigger: "/SAMPLING-PARAMETERS.txt", value: "S4MPL1NG_D3V14T10N_", label: "Parameters — Reviewed" },
        { trigger: "/findings/CONTROL-CONCLUSION.txt", value: "EXCE3DS}", label: "Conclusion — Control Failure Confirmed" },
      ],
      files: {
        "/SAMPLE-RESULTS.txt": [
          "ATTRIBUTE SAMPLING RESULTS — Q1 CHANGE TICKETS",
          "================================================",
          "Population: 1,450 change tickets",
          "Sample size: 60",
          "Attribute tested: Each ticket has documented CAB approval",
          "",
          "Items tested: 60",
          "Deviations found: 5 tickets with no CAB approval",
          "  CHG-0045: No approval signature",
          "  CHG-0182: Approver = Developer (SoD violation)",
          "  CHG-0290: Approval post-dated (approved after change deployed)",
          "  CHG-0451: Emergency — no post-hoc approval",
          "  CHG-0512: Approval from unauthorized approver",
          "",
          "Sample deviation rate: 5/60 = 8.3%",
        ].join("\n"),
        "/SAMPLING-PARAMETERS.txt": [
          "SAMPLING PARAMETERS",
          "====================",
          "Confidence level: 95%",
          "Tolerable deviation rate: 5%",
          "Expected deviation rate: 0%",
          "Sample size (from AICPA table): 60",
          "",
          "Decision rule: If sample deviation rate > 5%, conclude control NOT effective.",
          "Current sample deviation rate: 8.3% — EXCEEDS TOLERABLE RATE.",
        ].join("\n"),
        "/findings/CONTROL-CONCLUSION.txt": [
          "AUDITOR CONCLUSION — CHANGE MANAGEMENT CONTROL",
          "================================================",
          "Sample deviation rate: 8.3% (5 deviations in 60 items)",
          "Tolerable deviation rate: 5%",
          "Conclusion: CONTROL NOT OPERATING EFFECTIVELY",
          "",
          "The sample deviation rate of 8.3% exceeds the 5% tolerable rate.",
          "Auditor must: expand testing OR issue a control deficiency finding.",
          "Given nature of deviations (SoD, post-dating, unauthorized approvers),",
          "recommend issuing SIGNIFICANT DEFICIENCY or MATERIAL WEAKNESS.",
          "Rating: HIGH — SOX 404 implications for financial reporting reliability.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "SAMPLE-RESULTS.txt", isDir: false },
          { name: "SAMPLING-PARAMETERS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "CONTROL-CONCLUSION.txt", isDir: false }],
      },
    },
  },

  // ─── audit-12: Audit Reporting ─────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    wonder: { name: "ISACA Chicago Chapter", location: "Chicago, Illinois", era: "Present Day", emoji: "🎯" },
    id: "audit-12",
    order: 12,
    title: "The Final Report",
    subtitle: "Audit Reporting, Findings, and Remediation Tracking",
    category: "cybersecurity",
    xp: 150,
    badge: { id: "audit-badge-12", name: "CISA Graduate", emoji: "🏆" },
    challengeType: "ctf",
    info: {
      tagline: "The audit report is the product. Everything before it is just the work.",
      year: 1978,
      overview: [
        "The audit report is the formal deliverable that communicates findings to management, the audit committee, and the board. ISACA standards require that audit reports include: the scope and objectives, the period covered, the methodology used, findings with supporting evidence, risk ratings, management responses, and remediation timelines.",
        "Each finding must be structured with: the condition (what was found), the criteria (what the standard requires), the cause (why the deviation exists), and the effect (what risk the deviation creates). This structure — Condition, Criteria, Cause, Effect — is the CISA standard for a complete finding.",
        "Remediation tracking is the control that ensures findings are actually fixed. After the report is issued, the audit team follows up at 30, 60, and 90 days to verify remediation. Findings that are not remediated by the agreed date are escalated to the audit committee. Repeat findings (the same finding in multiple audit cycles) are flagged as a management control environment concern.",
      ],
      technical: {
        title: "Writing an Effective Audit Finding",
        body: [
          "Condition: 'During our review of Q1 2026, 5 of 60 production change tickets (8.3%) lacked documented CAB approval prior to deployment.' Be specific: name the system, the period, the sample, and the deviation rate.",
          "Criteria: 'Per the organization's Change Management Policy v2.1 and COBIT BAI06, all normal changes must have documented CAB approval prior to production deployment.' Cite the specific policy or standard. Cause: 'The change management tool does not enforce a mandatory approval workflow.' Effect: 'Unauthorized changes may be deployed to production systems, creating risk of system instability, unauthorized code execution, and unreliable financial reporting under SOX Section 404.'",
        ],
        codeExample: {
          label: "Remediation tracking dashboard (SQL)",
          code: `-- Track open findings and remediation status
SELECT
  finding_id,
  finding_title,
  risk_rating,
  agreed_remediation_date,
  actual_completion_date,
  CASE
    WHEN actual_completion_date IS NOT NULL THEN 'CLOSED'
    WHEN agreed_remediation_date < GETDATE() THEN 'OVERDUE'
    ELSE 'OPEN'
  END as status,
  CASE
    WHEN finding_id IN (SELECT finding_id FROM prior_audit_findings)
    THEN 'REPEAT FINDING'
    ELSE 'NEW'
  END as finding_type
FROM audit_findings
WHERE audit_year = 2026
ORDER BY risk_rating DESC, status;`,
        },
      },
      incident: {
        title: "The Wells Fargo Repeat Audit Findings (2016–2023)",
        when: "2016–2023",
        where: "San Francisco, California",
        impact: "$3.7B in penalties; asset cap imposed by Fed; consent orders still active",
        body: [
          "Wells Fargo's regulators issued repeated findings about inadequate risk management, sales practices, and consumer protections over seven years. Each audit cycle identified the same deficiencies. The OCC and CFPB found that management acknowledged findings, agreed to remediation plans, and then failed to implement them.",
          "The pattern of repeat findings is an audit red flag indicating a fundamental breakdown in the control environment. ISACA standards require auditors to escalate repeat findings directly to the audit committee, bypassing management, because repeat findings suggest management is either unable or unwilling to remediate. The Wells Fargo case is now a standard example in CISA curriculum of why remediation tracking matters.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Finding Structure", sub: "Condition-Criteria-Cause-Effect", type: "attacker" },
          { label: "Management Response", sub: "agree + remediation date", type: "system" },
          { label: "Report Issuance", sub: "to audit committee", type: "victim" },
          { label: "Remediation Tracking", sub: "30/60/90 day follow-up", type: "result" },
        ],
      },
      timeline: [
        { year: 1978, event: "ISACA founded — IT audit standards first developed" },
        { year: 2002, event: "SOX Section 301 — audit committee independence requirements" },
        { year: 2016, event: "Wells Fargo — repeat findings ignored by management", highlight: true },
        { year: 2023, event: "Wells Fargo — Fed asset cap still in place; $3.7B in penalties total" },
      ],
      keyTakeaways: [
        "Every finding needs: Condition, Criteria, Cause, and Effect — all four elements",
        "Remediation tracking at 30/60/90 days is an audit control, not optional",
        "Repeat findings escalate directly to the audit committee — management accountability has failed",
        "The audit report is a legal document — evidence for every finding must be in the workpapers",
      ],
      references: [
        { title: "ISACA IS Audit Standards", url: "https://www.isaca.org/resources/isaca-journal/issues/2016/volume-6/is-auditing-guideline-g16-use-of-caat" },
        { title: "IIA International Standards for the Professional Practice of Internal Auditing", url: "https://www.theiia.org/en/standards/" },
      ],
    },
    ctf: {
      scenario: "You are finalizing the audit report for Meridian Bank. Three open findings are loaded. One is a repeat finding from the prior year. Identify it and confirm what escalation action is required.",
      hint: "Read the draft findings and compare against prior year findings.",
      hints: [
        "Read: cat DRAFT-FINDINGS.txt",
        "Check prior year: cat PRIOR-YEAR-FINDINGS.txt",
        "View escalation: cat findings/REPEAT-FINDING-ESCALATION.txt",
        "Run 'assemble' then submit",
      ],
      fragments: [
        { trigger: "/DRAFT-FINDINGS.txt", value: "FLAG{4UD1T_", label: "Draft Findings — Loaded" },
        { trigger: "/PRIOR-YEAR-FINDINGS.txt", value: "R3P34T_F1ND1NG_", label: "Prior Year — Compared" },
        { trigger: "/findings/REPEAT-FINDING-ESCALATION.txt", value: "3SC4L4T3}", label: "Escalation — Confirmed" },
      ],
      files: {
        "/DRAFT-FINDINGS.txt": [
          "DRAFT AUDIT FINDINGS — MERIDIAN BANK 2026",
          "==========================================",
          "F-2026-01  HIGH   Terminated user accounts not deprovisioned within SLA",
          "F-2026-02  MEDIUM Data retention policy not enforced for marketing data",
          "F-2026-03  HIGH   Change tickets missing CAB approval (8.3% deviation rate)",
          "",
          "Compare against PRIOR-YEAR-FINDINGS.txt to identify repeat findings.",
        ].join("\n"),
        "/PRIOR-YEAR-FINDINGS.txt": [
          "PRIOR YEAR AUDIT FINDINGS — MERIDIAN BANK 2025",
          "================================================",
          "F-2025-01  HIGH   Terminated user accounts not deprovisioned (agreed: 90 days)",
          "F-2025-02  HIGH   Unencrypted PII in marketing database (CLOSED 2025-09-01)",
          "F-2025-03  MEDIUM Backup restoration untested (CLOSED 2025-11-15)",
          "",
          "F-2025-01 was not remediated. Management agreed to 90-day remediation.",
          "F-2026-01 is the same finding — terminated users still active.",
        ].join("\n"),
        "/findings/REPEAT-FINDING-ESCALATION.txt": [
          "REPEAT FINDING ESCALATION — F-2026-01",
          "=======================================",
          "Finding: Terminated user accounts not deprovisioned within SLA",
          "First identified: 2025 audit (F-2025-01)",
          "Management agreed remediation: 90 days (2025-06-01)",
          "Status as of 2026 audit: NOT REMEDIATED",
          "",
          "ISACA standard: Repeat findings are escalated directly to the Audit Committee.",
          "Management has failed to remediate a HIGH finding for 12+ months.",
          "Required action: Audit Committee notification. Management response inadequate.",
          "Escalation: Letter to Audit Committee Chair within 5 business days.",
        ].join("\n"),
      },
      dirs: {
        "/": [
          { name: "DRAFT-FINDINGS.txt", isDir: false },
          { name: "PRIOR-YEAR-FINDINGS.txt", isDir: false },
          { name: "findings", isDir: true },
        ],
        "/findings": [{ name: "REPEAT-FINDING-ESCALATION.txt", isDir: false }],
      },
    },
  },
];
