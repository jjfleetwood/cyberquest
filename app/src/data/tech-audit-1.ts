import type { StageConfig, EpochConfig } from "./types";

export const techAudit1Epoch: EpochConfig = {
  id: "tech-audit-1",
  name: "Tech Audit: Foundations",
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
        "COBIT 2019 is ISACA's flagship framework for IT governance and management, and it sits at the foundation of virtually every IT audit methodology used in regulated industries today. The framework makes a precise and legally significant distinction between governance — which sets direction, evaluates options, and monitors outcomes — and management, which plans, builds, runs, and monitors activities in alignment with the direction governance has set. This distinction is not academic; regulators and courts have used it to assign personal liability to board members who abdicated governance responsibilities and relied entirely on management self-reporting.",
        "Every IT audit begins by establishing this boundary clearly. The board and executive leadership govern: they approve the organization's risk appetite, set strategic direction, authorize significant IT investments, and ensure accountability for results. IT leadership manages: they implement controls, operate systems, allocate resources within board-approved parameters, and report performance upward. Auditors occupy a third, independent position — they verify that both layers are functioning as designed, and they report their findings to the audit committee rather than to management, preserving independence.",
        "The COBIT 2019 framework organizes 40 governance and management objectives across five domains. The Evaluate, Direct and Monitor (EDM) domain covers board-level governance — risk appetite, IT investment decisions, and performance monitoring. The Align, Plan and Organise (APO) domain covers strategic alignment, enterprise architecture, risk management, and human resources planning. Build, Acquire and Implement (BAI) covers project delivery, change management, and requirements definition. Deliver, Service and Support (DSS) covers IT operations, incident management, and service continuity. Monitor, Evaluate and Assess (MEA) covers internal controls assessment, regulatory compliance monitoring, and reporting to the board.",
        "COBIT 2019 introduced a significant evolution from its predecessor: the design factors. These twelve factors — including enterprise strategy, risk profile, compliance requirements, sourcing model, and IT implementation methods — allow organizations to tailor the framework to their specific context rather than applying it uniformly. A heavily regulated bank operating its own data center has a different COBIT profile than a software startup using cloud-native infrastructure. Auditors must understand which design factors apply before assessing capability levels, because the target capability level for each objective depends on the organization's context.",
        "The governance cascade is COBIT's mechanism for ensuring that board-level intent flows down through every layer of the organization. The board sets principles and policies. Management translates policies into procedures. Technology teams implement procedures as configurations and controls. Auditors trace this cascade in reverse — starting with a control and working upward to verify it maps to a documented procedure, which maps to a policy, which maps to a board-approved principle. When the cascade breaks — when a control exists but cannot be traced to policy authority, or when a policy exists but was never implemented as a control — the auditor has found a governance gap.",
        "Understanding COBIT's relationship to other frameworks is essential for the working auditor. COBIT is a governance framework, not a technical standard. It does not prescribe specific technical implementations. Instead, it maps to NIST Cybersecurity Framework, ISO 27001, ITIL, and TOGAF, allowing organizations to use COBIT as the governance layer while using those frameworks for technical guidance. Auditors frequently see organizations that have strong NIST or ISO implementations but weak COBIT governance — the technical controls exist but are not connected to board-level accountability.",
        "The most common COBIT findings in practice relate to the EDM domain. EDM01 (Governance Framework) gaps occur when no formal IT governance charter exists — the board has not documented its oversight responsibilities, risk appetite, or accountability structure. EDM03 (Risk Optimisation) gaps occur when no formal risk appetite statement has been approved, meaning risk decisions are made ad hoc by IT management without board authority. EDM05 (Stakeholder Engagement) gaps occur when IT performance reporting to the board is absent or consists of technical metrics that board members cannot meaningfully evaluate. These three EDM gaps together constitute a pervasive governance failure — one that undermines every other control in the organization.",
      ],
      technical: {
        title: "COBIT 2019 Domain Structure",
        body: [
          "The five COBIT domains map directly to the IT lifecycle and provide the auditor's organizing structure for any IT audit engagement. EDM covers board-level governance: risk appetite documentation, IT investment authorization, benefits realization tracking, resource optimization, and stakeholder transparency. A mature EDM domain means the board has a documented IT governance charter, meets regularly to review IT performance against approved metrics, and has a named governance body (often the IT steering committee) that exercises oversight between board meetings.",
          "APO covers strategic alignment and enterprise-level planning — 14 objectives ranging from IT management framework design through enterprise architecture, innovation management, portfolio management, budget management, quality management, risk management, security management, and data management. APO12 (Risk Management) and APO13 (Security Management) receive the most audit attention in regulated industries. APO12 requires a formal risk management process with a maintained risk register, defined risk appetite, and quarterly risk reviews. APO13 requires an Information Security Management System (ISMS) aligned with ISO 27001 or equivalent.",
          "BAI covers project delivery and change management — 11 objectives covering requirements management, solution design, build and acquisition, testing, organizational change management, change enablement, configuration management, knowledge management, asset management, and project management. BAI06 (Change Enablement) is the ITGC change management control; BAI10 (Configuration Management) covers the CMDB and configuration baseline controls that support change management effectiveness.",
          "Auditors use COBIT capability levels (0–5) to rate each objective against its target. Level 0 (Incomplete) means the process is not implemented or fails to achieve its purpose. Level 1 (Performed) means the process is implemented and achieves its basic purpose, but not in a controlled manner. Level 2 (Managed) means the process is planned, monitored, and adjusted. Level 3 (Established) means the process uses a defined process tailored from a standard. Level 4 (Predictable) means the process operates within defined limits with statistical control. Level 5 (Optimizing) means continuous improvement culture — the process is continuously improved to meet current and projected business goals. Level 3 is the minimum for regulated industries. Level 4 or 5 is expected only for the most critical controls in the highest-risk environments.",
          "The audit methodology for COBIT assessments follows a consistent pattern. First, auditors conduct stakeholder interviews with board members, the CIO, CISO, and process owners to understand how governance is structured and exercised in practice — not just how it is documented. Second, auditors review governance artifacts: IT governance charters, risk appetite statements, board meeting minutes with IT agenda items, IT steering committee minutes, and IT performance reports to the board. Third, auditors observe governance processes in operation — attending IT steering committee meetings, reviewing how IT investment decisions are made and documented, and examining how exceptions and escalations are handled. Fourth, auditors assess each objective against the capability scale and document the evidence that supports each rating.",
          "Common evidence auditors collect for COBIT assessments includes: signed IT governance charter or policy (EDM01), board-approved risk appetite statement with quantified thresholds (EDM03), IT steering committee charter and meeting minutes showing regular cadence (EDM01/EDM04), IT performance dashboards presented to the board with board acknowledgment (EDM05), IT investment approval documentation showing board or authorized committee sign-off (EDM02), and annual COBIT capability assessment results showing year-over-year improvement (MEA02). The absence of any of these documents at a regulated institution is a reportable finding.",
          "The capability gap analysis is the deliverable that translates COBIT assessments into action. For each objective, the auditor documents the current capability level, the target level given the organization's design factors, the gap, and the priority for remediation. Gaps on EDM objectives are always high priority because they represent governance-layer failures. Gaps on APO and DSS objectives are prioritized based on the criticality of the affected process and the organization's risk profile. The gap analysis becomes the basis for management's remediation roadmap and is tracked by the audit team through subsequent audit cycles.",
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
          "Enron's collapse in 2001 remains the canonical example of governance-layer failure in the IT audit curriculum. The board exercised no meaningful oversight of the complex special-purpose entities (SPEs) that management used to conceal billions in debt. IT systems generated financial reports that management selectively shared with auditors and the board, presenting a picture of profitability that did not match economic reality. The governance layer — which should have demanded independent verification of management's representations — simply accepted what management reported. Board members later testified they did not understand the SPE structures. Under COBIT's EDM framework, that incomprehension is itself a governance failure: EDM01 requires the board to establish a governance framework capable of evaluating what management presents.",
          "The IT dimensions of the Enron failure were significant. The company's energy trading systems processed transactions at volumes that made manual verification impossible. Mark-to-market accounting, applied to illiquid long-term contracts, required complex models that only a handful of people understood. The board approved this accounting approach without establishing any independent validation mechanism — a direct failure of EDM03 (Risk Optimisation). When Arthur Andersen audited Enron's financial statements, they relied on management-prepared reconciliations rather than independently extracting data from source systems — a failure of audit independence that COBIT's MEA domain now addresses explicitly.",
          "The aftermath produced the Sarbanes-Oxley Act (2002), which formalized IT controls requirements for public companies and directly inspired the COBIT framework's emphasis on board-level oversight. SOX Section 404 requires management to assess and report on internal controls over financial reporting, and requires external auditors to attest to that assessment. COBIT's EDM domain is a direct descendant of these requirements. Section 302 requires CEO and CFO personal certification of financial statement accuracy — a governance accountability mechanism that COBIT's EDM05 (Stakeholder Engagement) addresses at the framework level.",
          "For practicing auditors, the Enron lessons manifest in specific testing procedures. When assessing EDM01, auditors review board minutes to verify that IT-related agenda items appear with sufficient frequency and depth. When board minutes show IT was discussed only in passing, or not at all, that is a finding. When assessing EDM03, auditors verify that the risk appetite statement is not just a document but is actively used — that IT investment proposals include risk assessments referenced against the appetite statement, and that exceptions to appetite are formally escalated and documented. The ghost of Enron haunts every boardroom governance assessment: the auditor's job is to verify that the board is genuinely governing, not just receiving management briefings.",
          "Remediation of EDM-layer gaps requires executive sponsorship and sustained effort. Organizations that have operated with weak IT governance for years cannot remediate by drafting a charter. The charter must be followed: the IT steering committee must actually meet, actually review actual data, actually challenge management assumptions, and actually document its decisions. Auditors verify this through evidence — meeting minutes, attendance records, approved documents bearing the committee's imprimatur. When evidence is thin or manufactured after the fact, the auditor's professional skepticism is triggered and the finding remains open.",
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
        "Governance (EDM) sets direction; Management (APO/BAI/DSS/MEA) executes — confusing these layers is a reportable finding",
        "COBIT rates capability 0–5; Level 3 (Established) is the regulated industry minimum baseline",
        "Auditors assess both governance and management layers independently — management self-reporting is never sufficient evidence",
        "SOX Section 404 compliance drove COBIT adoption; board members bear personal liability for governance failures under SOX Section 302",
        "The governance cascade: board principles → management policies → operational procedures → technical controls — auditors trace it in both directions",
        "Design factors determine target capability levels — a bank's COBIT profile differs from a startup's; one-size-fits-all assessments are a methodology gap",
        "EDM01 gap (no governance charter) is always a high-priority finding — without a charter, no other governance control has formal authority",
        "EDM03 gap (no risk appetite statement) means IT risk decisions are being made without board authority — a pervasive control deficiency",
        "Board meeting minutes must show substantive IT engagement — rubber-stamp minutes are evidence of governance failure, not governance health",
        "COBIT maps to NIST CSF, ISO 27001, and ITIL — organizations often have strong technical frameworks but weak governance layers connecting them to the board",
      ],
      references: [
        { title: "COBIT 2019 Framework — ISACA", url: "https://www.isaca.org/resources/cobit" },
        { title: "SOX Section 404 — SEC Guidance", url: "https://www.sec.gov/rules/interp/2007/33-8810.pdf" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-01-q1", type: "Core Idea", challenge: "Two distinct roles.", text: "What is the difference between governance and management in IT?", options: ["Governance sets direction and oversees; management executes within that direction","They are the same thing","Management oversees governance","Governance writes code"], correctIndex: 0, explanation: "Confusing the two is where audit failures begin — governance directs, management executes." },
        { id: "audit-01-q2", type: "COBIT", challenge: "Know the domain.", text: "In COBIT 2019, the EDM domain (Evaluate, Direct, Monitor) represents which layer?", options: ["The governance layer — board-level oversight of IT direction and outcomes","The coding layer","The networking layer","The billing layer"], correctIndex: 0, explanation: "EDM is COBIT's governance layer; APO/BAI/DSS/MEA are the management domains." },
        { id: "audit-01-q3", type: "COBIT", challenge: "Count the domains.", text: "How many governance and management domains does COBIT 2019 define?", options: ["Five — EDM for governance, plus APO, BAI, DSS, MEA for management","Three","Ten","One"], correctIndex: 0, explanation: "COBIT 2019 has five domains: one governance (EDM) and four management." },
        { id: "audit-01-q4", type: "Regulation", challenge: "Post-Enron law.", text: "Which 2002 law formalized IT controls requirements for public companies after Enron?", options: ["The Sarbanes-Oxley Act (Section 404)","GDPR","HIPAA","The Patriot Act"], correctIndex: 0, explanation: "SOX §404 established IT controls requirements for public companies." },
        { id: "audit-01-q5", type: "Real Incident", challenge: "Enron, 2001.", text: "What did the Enron collapse illustrate about IT governance?", options: ["Governance failures and lack of independent oversight enable catastrophic fraud","Servers must be faster","Encryption was missing","It was a network outage"], correctIndex: 0, explanation: "Enron's governance breakdown triggered SOX and modern IT controls requirements." },
        { id: "audit-01-q6", type: "Auditing", challenge: "Trust but verify.", text: "Is management's self-reporting to the board sufficient evidence that governance objectives are met?", options: ["No — auditors must independently verify both governance and management layers","Yes — self-reporting is enough","Only for small companies","Only if signed"], correctIndex: 0, explanation: "Independent verification is required; self-attestation isn't evidence." },
        { id: "audit-01-q7", type: "Maturity", challenge: "The regulated baseline.", text: "What COBIT capability level is the typical minimum for regulated industries?", options: ["Level 3 (Established)","Level 1 (Initial)","Level 2 (Managed)","Level 0 (Incomplete)"], correctIndex: 0, explanation: "Level 3 (Established) is the usual regulated-industry minimum, not level 2." },
        { id: "audit-01-q8", type: "Concept", challenge: "Where failures start.", text: "Why does confusing governance with management cause audit problems?", options: ["Oversight and execution blur, so no one independently checks direction is followed","It speeds up audits","It has no effect","It only matters for startups"], correctIndex: 0, explanation: "Separation of direction and execution is what makes oversight meaningful." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. COBIT 2019 separates governance (EDM — board level) from management (APO/BAI/DSS/MEA — IT execution)",
          "  2. Capability level 1 on EDM01 means no formal governance charter exists — a pervasive audit risk",
          "  3. Auditors independently verify both layers; management self-reporting is never sufficient evidence",
          "─────────────────────────────────────────────────────────────────────",
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. EDM01 gap = no IT governance charter — the board cannot direct or monitor IT without one",
          "  2. SOX Section 404 treats missing governance documentation as evidence of material weakness",
          "  3. Escalation to the audit committee (not just management) is required when governance itself fails",
          "─────────────────────────────────────────────────────────────────────",
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
        "CRISC (Certified in Risk and Information Systems Control) is ISACA's risk-focused certification and methodology framework. It defines a rigorous, four-domain approach to managing IT risk: IT Risk Identification, IT Risk Assessment, Risk Response and Mitigation, and Risk and Control Monitoring and Reporting. Unlike compliance-oriented frameworks that ask 'did we implement the required control?', CRISC asks the prior question: 'what are the risks that controls are designed to address, and are our controls actually reducing those risks to acceptable levels?'",
        "Risk identification is the first and most frequently under-resourced domain. Organizations often maintain risk registers that were populated during an initial risk workshop years ago and have not been meaningfully updated since. CRISC requires continuous risk identification — new systems, new vendors, new regulatory requirements, new threat intelligence, and changes to the business model all create new risks that must be captured. Auditors test risk identification by comparing the risk register against recent change management logs, new vendor onboardings, threat intelligence reports, and industry incident databases to identify risks that should be in the register but are not.",
        "Risk assessment follows a standard methodology: identify threats and vulnerabilities, assess inherent risk (before controls), evaluate existing controls and their effectiveness, calculate residual risk (after controls), and compare residual risk to the organization's board-approved risk appetite. Inherent risk represents what the organization would face if no controls existed. Residual risk represents what remains after controls are applied. The gap between inherent and residual risk is the control effectiveness — and that gap must be large enough to bring residual risk within appetite.",
        "CRISC defines four risk response options, and auditors verify that the selected response is appropriate for each risk. Accept means the board has formally acknowledged the risk and is willing to absorb potential losses — acceptance without formal documentation is not a valid response. Mitigate means adding or strengthening controls to reduce likelihood or impact to within appetite. Transfer means shifting financial exposure through insurance, contractual indemnification, or outsourcing — transfer does not eliminate the risk, it reallocates the financial consequences. Avoid means discontinuing the activity that creates the risk — the most complete response but often commercially impractical.",
        "The risk register is the master document that auditors examine most closely. A mature risk register contains: a unique risk ID, a narrative description of the threat and vulnerability, the affected asset or process, the risk owner (a named individual, not a department), the inherent risk score (likelihood × impact on a defined scale), the controls in place with references to control documentation, the control effectiveness rating, the residual risk score, the risk response type and treatment plan, the board-approved appetite threshold for comparison, and the date of last review. Registers that lack any of these fields are incomplete — and incompleteness is itself a finding because it means the organization cannot demonstrate it is managing the risk.",
        "Risk appetite must be formally approved by the board and expressed in quantitative terms. 'We have a low risk appetite for cybersecurity' is not a usable appetite statement — it provides no threshold against which residual risk scores can be compared. A usable appetite statement specifies the maximum acceptable residual risk score on the organization's rating matrix, often broken out by risk category. For example: 'No individual risk shall have a residual score exceeding 12 on our 5×5 matrix without a board-approved exception and documented treatment plan. Risks scoring 16 or above require immediate escalation to the Audit Committee regardless of existing controls.'",
        "The most critical CRISC audit finding — and one of the most consequential in practice — is residual risk above appetite with no treatment plan. This means the organization knows it is operating above its own risk threshold, has documented that fact, and is doing nothing about it. Regulators treat this as evidence of management negligence. In financial services, FDIC and OCC examiners will issue Matters Requiring Attention (MRAs) for exactly this condition. In public companies, external auditors may conclude it constitutes a significant deficiency or material weakness under SOX Section 404, triggering disclosure requirements and management certification exposure.",
      ],
      technical: {
        title: "Risk Calculation: Inherent vs Residual",
        body: [
          "Inherent risk is calculated as Likelihood × Impact before any controls exist. The scale is typically 1–5 for each dimension, producing a matrix from 1 (very low) to 25 (critical). A critical database exposed to the internet with no authentication has maximum inherent risk: Likelihood 5 (near-certain exploitation given internet exposure) × Impact 5 (critical data loss and regulatory consequences) = inherent score 25. The same database behind a firewall, with MFA, encryption at rest and in transit, and continuous monitoring has reduced residual risk: controls reduce effective likelihood to 2 and effective impact to 3, producing a residual score of 6.",
          "Control effectiveness is not binary — controls are not simply 'present' or 'absent.' CRISC rates control effectiveness on a scale from negligible to strong. A control that exists in policy but is not consistently enforced has low effectiveness. A control that is enforced but not monitored has medium effectiveness. A control that is enforced, monitored, and regularly tested has high effectiveness. Auditors must evaluate actual effectiveness, not just existence. The most common error in risk assessments — and the one that led to the Capital One breach — is overestimating control effectiveness, resulting in an artificially low residual risk score that obscures real exposure.",
          "Risk scoring must be calibrated across risk categories to ensure comparability. Organizations that use different scales for different risk types (e.g., a 3×3 matrix for operational risk and a 5×5 matrix for cybersecurity risk) cannot meaningfully compare or aggregate risks. CRISC recommends a single enterprise risk matrix applied consistently. Auditors test calibration by reviewing sample risks from different categories and verifying that similar real-world consequences produce similar scores — if a $10M financial risk scores 15 but a $10M cybersecurity risk scores 8, the matrix is miscalibrated.",
          "The risk register review is one of the most time-intensive parts of a CRISC-aligned audit. Auditors sample 20–30% of registered risks and test each for completeness, accuracy, and currency. Completeness means all required fields are populated. Accuracy means the likelihood and impact assessments are defensible given current threat intelligence and control state. Currency means the risk was reviewed within the required review cycle (typically annually for low risks, quarterly for high risks, and continuously for critical risks). Risks that have not been reviewed since a significant business change (new acquisition, new cloud deployment, new regulatory requirement) fail the currency test regardless of their review date.",
          "Treatment plan testing is the final step in CRISC audit work. For each risk above appetite, auditors verify: a treatment plan exists and is documented; the plan specifies concrete actions, owners, and completion dates; progress is being tracked; and there is evidence that the treatment is actually reducing residual risk over time. A treatment plan that says 'implement additional controls by Q4' without specifying which controls, who is responsible, and what the projected residual risk will be after implementation is not an adequate treatment plan. Auditors also verify that completed treatments have been tested — a control added to address a risk must be operating effectively before the residual risk score can be revised downward.",
          "Risk monitoring and reporting complete the CRISC lifecycle. Risk reporting to the board must occur at least quarterly for a regulated institution, and must present risk in terms the board can evaluate — not raw risk scores, but narrative explanations of what the scores mean in business terms, whether the trend is improving or deteriorating, and what management is doing about risks above appetite. Auditors review board risk reports from the past year and assess whether they are accurate (scores match the risk register), complete (no significant risks omitted), and actionable (the board is receiving information that enables governance decisions, not just information that creates the appearance of oversight).",
          "One advanced CRISC concept that appears frequently in complex audits is fourth-party risk — the risk that a vendor's vendor creates for your organization. If your critical payment processor uses a cloud provider that experiences an outage, you have a fourth-party risk that your own risk assessment may not have captured. CRISC-aligned vendor risk management requires organizations to understand not just their direct vendors but the concentration of critical dependencies in their vendor ecosystem. Auditors test this by reviewing the top ten vendors by criticality and asking whether the organization has visibility into those vendors' key dependencies.",
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
          "Capital One's 2019 breach is the definitive case study in risk assessment failure for cloud environments. The attack exploited a Server-Side Request Forgery (SSRF) vulnerability in a misconfigured Web Application Firewall (WAF) to access the EC2 Instance Metadata Service (IMDS), retrieve AWS credentials from the metadata endpoint, and use those credentials to download data from S3 buckets containing 106 million customer records. The technical vulnerability was not zero-day — SSRF attacks against cloud metadata services were a well-known attack class. The risk should have been in the register.",
          "The CRISC failure was at the risk identification stage. Cloud misconfiguration — specifically the exposure of cloud metadata services to application-layer attacks — was a documented risk category in AWS security guidance, OWASP publications, and industry threat intelligence at the time of the breach. Capital One's risk assessment processes, however, had not captured this risk at appropriate severity. The WAF misconfiguration created an inherent risk of 25 (near-certain exploitation × critical impact). The risk register recorded it at a much lower level because the risk identification process did not adequately account for the SSRF attack surface specific to cloud environments.",
          "Control effectiveness was also misassessed. Capital One believed its WAF provided meaningful protection — it rated control effectiveness as high, producing an artificially low residual risk score. In reality, the WAF was both the attack vector and the failed control. This circular logic — using the same control to create the vulnerability and to claim protection from it — is a risk assessment design flaw that CRISC's control effectiveness testing is designed to prevent. Independent testing of the WAF's SSRF protection before the breach would have revealed the gap.",
          "The regulatory aftermath was severe. The OCC fined Capital One $80M and identified multiple risk management failures in the consent order. The FTC settlement added $190M. The CISO resigned within months of the breach becoming public. Post-breach analysis revealed that the risk monitoring function had detected anomalous S3 activity during the data exfiltration — the SIEM generated alerts — but those alerts were not investigated promptly. This is the monitoring-and-reporting failure: even when risk materialized into an incident, the organization's risk monitoring process failed to recognize and respond to it in time to prevent full data exfiltration.",
          "For auditors, the Capital One case generates a specific set of testing questions for any organization operating in the cloud. Does the risk register explicitly address cloud-specific attack surfaces (SSRF, IMDS exposure, over-permissioned IAM roles, public S3 buckets)? Has the organization conducted cloud security posture management (CSPM) assessments to validate that cloud configurations match intended architecture? Are WAF rules tested for effectiveness against the OWASP Top 10, including SSRF? Are cloud metadata service access controls restricted at the instance level? Are S3 bucket access controls inventoried and reviewed quarterly? The absence of these controls from either the risk register or the control library is a finding.",
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
        "Inherent risk = likelihood × impact before controls; residual risk = after controls; the gap is control effectiveness",
        "Risk responses: Accept (board-documented), Mitigate (add controls), Transfer (insurance/contract), Avoid (stop the activity)",
        "Risk register must be current — risks not reviewed after significant business changes fail the currency test",
        "Residual risk above appetite requires a documented, board-approved treatment plan with concrete actions and owners",
        "Control effectiveness must be independently assessed — not assumed from the control's existence in policy",
        "Risk appetite must be quantitative — qualitative statements like 'low tolerance' are not auditable thresholds",
        "Risk monitoring must detect when controls fail; Capital One's SIEM fired but nobody investigated",
        "Fourth-party risk (vendor's vendor dependencies) must be captured for critical vendor relationships",
        "Cloud environments require cloud-specific risk categories in the register — generic IT risk taxonomies miss SSRF, IMDS, IAM over-permission",
        "Risk reporting to the board must be in business terms, not raw scores — the board must be able to make governance decisions from the report",
      ],
      references: [
        { title: "CRISC Exam Guide — ISACA", url: "https://www.isaca.org/credentialing/crisc" },
        { title: "NIST SP 800-30 — Guide for Conducting Risk Assessments", url: "https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-02-q1", type: "Core Idea", challenge: "Why controls exist.", text: "What is the relationship between risk and controls?", options: ["Every control exists to mitigate a risk; without the risk, it's just overhead","Controls are random","Risks have no controls","Controls create risk"], correctIndex: 0, explanation: "Controls are justified by the risks they reduce." },
        { id: "audit-02-q2", type: "CRISC", challenge: "What's left over.", text: "What is 'residual risk'?", options: ["The risk remaining after existing controls reduce the inherent risk","Risk before any controls","Risk that can't be measured","A type of audit report"], correctIndex: 0, explanation: "Residual = what remains after controls are applied to inherent risk." },
        { id: "audit-02-q3", type: "CRISC", challenge: "Raw exposure.", text: "How is inherent risk calculated?", options: ["Likelihood × Impact, before any controls are applied","After controls only","By counting employees","Likelihood minus Impact"], correctIndex: 0, explanation: "Inherent risk is raw exposure (L × I) with no controls factored in." },
        { id: "audit-02-q4", type: "Risk Response", challenge: "Spot the fake.", text: "Which is NOT one of the valid risk response options?", options: ["Ignore — defer the decision until the next audit","Avoid","Mitigate","Transfer"], correctIndex: 0, explanation: "The four responses are avoid, mitigate, transfer, accept — 'ignore' isn't one." },
        { id: "audit-02-q5", type: "Risk Appetite", challenge: "When you can't just accept.", text: "Is 'Accept' valid when residual risk exceeds the board-approved risk appetite?", options: ["No — risks above appetite require a board-approved treatment plan","Yes — accept anything","Only on weekends","Only for IT risks"], correctIndex: 0, explanation: "Above-appetite risk can't be unilaterally accepted; it needs board treatment." },
        { id: "audit-02-q6", type: "Real Incident", challenge: "Capital One, 2019.", text: "What did the Capital One breach reveal about risk registers?", options: ["A stale/mis-scored register leaves critical risk treated as acceptable","Cloud is always safe","Encryption is pointless","Risk registers are unnecessary"], correctIndex: 0, explanation: "Misconfiguration risk was under-scored, leaving real exposure unmitigated." },
        { id: "audit-02-q7", type: "Concept", challenge: "Keep it current.", text: "Why must a risk register be kept current?", options: ["Outdated scores hide real exposure and misdirect controls","It looks tidy","Regulators ignore it","It speeds up the network"], correctIndex: 0, explanation: "A stale register creates blind spots where risk is actually critical." },
        { id: "audit-02-q8", type: "Definition", challenge: "Order of operations.", text: "Controls are applied to inherent risk to produce…", options: ["Residual risk","More inherent risk","Risk appetite","A finding"], correctIndex: 0, explanation: "Inherent risk minus the effect of controls = residual risk." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Residual risk = inherent risk minus control effectiveness; network segmentation here is rated LOW — so residual stays near 18",
          "  2. Any residual above the board's appetite (12) mandates a documented treatment plan — 'Accept' is not an option here",
          "  3. CRISC risk response: Mitigate (add controls), Transfer (insurance), Avoid (stop activity), or Accept (board approved only)",
          "─────────────────────────────────────────────────────────────────────",
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
        "IT General Controls (ITGCs) are the foundational controls that support the reliability of all application-level controls. They are not tied to any specific application — they apply to the entire IT environment. The relationship between ITGCs and application controls is analogous to a building's foundation and its floors: a structurally sound floor resting on a cracked foundation is still unsafe. If ITGCs fail, every application control built on top of them is suspect, and auditors cannot rely on application output without performing significantly more work to compensate.",
        "The four ITGC domains are: Change Management (changes to production systems follow an approved, documented process), Logical Access (only authorized users can access systems and data at appropriate privilege levels), Computer Operations (systems run reliably, backups are performed and tested, and scheduled jobs complete successfully), and Program Development (new systems are developed, tested, and approved before production release according to a defined SDLC process). These four pillars appear in every SOX 404 IT audit, every PCAOB inspection, and virtually every financial services regulatory examination.",
        "External auditors testing SOX Section 404 compliance spend the majority of their IT audit time on ITGCs, because ITGC effectiveness determines how much reliance they can place on application controls. A clean ITGC environment allows auditors to rely on system-generated reports and automated application controls with minimal additional testing. An ITGC failure — particularly in change management or logical access — requires auditors to expand their testing substantially, because they can no longer assume that what the system produces reflects what the system should produce.",
        "ITGC findings are classified based on their pervasiveness and severity. A 'pervasive' ITGC deficiency is one that could affect multiple systems, processes, or periods — such as a change management breakdown that affects all financial reporting systems. Pervasive deficiencies are more serious than isolated deficiencies because they cast doubt on a broader scope of system output. A single unauthorized change to the payroll system is serious; a change management process that routinely bypasses approvals is pervasive. The distinction matters because pervasive deficiencies typically constitute significant deficiencies or material weaknesses under SOX, requiring disclosure.",
        "SOX Section 404 requires management to assess and attest to the effectiveness of internal controls over financial reporting (ICFR), including the ITGCs that support financial systems. The PCAOB's Auditing Standard AS 2201 requires external auditors to evaluate and attest to management's assessment. This creates a two-layer accountability structure: management must maintain effective ITGCs and certify their effectiveness, and external auditors must independently verify that certification. The CEO and CFO sign the Section 302 certification personally — meaning ITGC failures create personal legal exposure for senior executives.",
        "The scoping process for ITGC audits requires auditors to identify which IT systems are 'in scope' — meaning they process, store, or transmit data that flows into financial statements. This includes general ledger systems, subsidiary ledgers, payroll systems, revenue recognition systems, and consolidation tools. It also includes the infrastructure supporting those systems: the operating system, database, network, and identity management platform. For cloud environments, the scope extends to the cloud platform configuration and any shared responsibility controls that the organization must implement even though the infrastructure is cloud-hosted.",
        "Common ITGC findings that appear repeatedly across industries include: terminated employees with active system accounts (logical access), developers with production access (segregation of duties in change management), production changes with no approved change tickets (change management), backups not tested for restorability (computer operations), shared privileged accounts with no individual accountability (logical access), and new systems deployed to production without security testing evidence (program development). Each of these findings represents a control breakdown that could allow unauthorized system changes or unauthorized access to financial data — exactly the risks that SOX Section 404 was designed to address.",
      ],
      technical: {
        title: "Testing ITGCs: What Auditors Look For",
        body: [
          "Change Management testing begins by pulling the complete population of production changes for the audit period — typically a quarter or a full year. The auditor requests the change management system extract, which should include every change ticket with its status, dates, developer, approver, affected system, and testing evidence. The auditor then selects a statistical sample (or tests the full population for critical systems) and for each change verifies: the change ticket was opened before the change was made (not backdated), the CAB approval is documented with approver name and date, the developer and approver are different individuals (segregation of duties), test results are attached and show the change was tested in a non-production environment, a rollback plan is documented, and a post-implementation review was completed within the required timeframe.",
          "Emergency change testing requires additional scrutiny. Emergency changes are intended for critical fixes that cannot wait for the standard CAB cycle. Auditors verify that emergency changes have post-hoc approval documentation within 24–48 hours, that the emergency was genuinely urgent (not a convenience bypass), and that the emergency change rate is within acceptable limits. An emergency change rate above 10% of all changes strongly suggests the emergency process is being used to bypass standard approval requirements — a finding that requires expansion of testing to determine whether the bypass was systematic.",
          "Logical Access testing begins with pulling all user accounts with access to in-scope systems. For each account, auditors verify: an approved access request exists and matches the current access level, the account maps to an active employee (not a terminated employee or contractor), the access level is consistent with the user's current job role and follows least privilege, and annual recertification was completed with manager sign-off. Privileged accounts receive additional testing: each admin account should have a documented business justification, a named owner, MFA enforced, activity logs reviewed quarterly, and a formal privileged access management (PAM) solution if the organization has multiple admin accounts.",
          "Computer Operations testing covers three main areas: backup and recovery, job scheduling, and capacity management. For backups, auditors verify: backup jobs run on schedule (examining job logs for the test period), backup media is stored offsite or in geographically separated cloud regions, backup restoration has been tested within the past year with documented results, and backup retention periods comply with policy and regulatory requirements. Unrestored backups — backups that have been made but never tested for recoverability — are one of the most dangerous ITGC conditions because they create a false sense of security. Organizations discover backup failures only when they need the backup.",
          "Program Development testing (SDLC controls) focuses on whether new systems and significant system changes go through a defined development lifecycle that includes requirements definition, design review, security testing, user acceptance testing (UAT), and formal production approval. Auditors review documentation for a sample of significant development projects deployed during the audit period and verify that each phase was completed and documented. Common gaps include: security testing performed but findings not remediated before production release, UAT sign-off from the development team rather than business users, and production deployment without change management integration — treating the development project as exempt from change management controls.",
          "The ITGC testing workpaper documents every control tested, the evidence examined, the sample items and results, deviations found, and the auditor's conclusion. For each ITGC domain, the workpaper must support a binary conclusion: the control is operating effectively, or it is not. 'Substantially effective' is not an ITGC conclusion — a control either has the required evidence of operation or it does not. When evidence is missing, degraded, or contradicted by other evidence, the control fails. This binary nature of ITGC conclusions is why ITGC findings have such significant downstream consequences for financial statement audits.",
          "Remediation of ITGC findings requires process changes, not just one-time fixes. If five terminated employees had active accounts, the root cause is a broken deprovisioning process — deleting those five accounts does not fix the process. Auditors require management to demonstrate that the underlying process has been corrected: the HR-to-IT notification workflow has been repaired, automated deprovisioning has been implemented or the manual process has been redesigned with mandatory controls, and a look-back review has been performed to identify any other terminated employees who may have had access. Without process remediation, the same finding will appear in the next audit cycle — and repeat findings carry escalating consequences.",
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
          "MF Global, a major futures broker, collapsed in October 2011 after its systems processed unauthorized transfers of customer segregated funds to cover proprietary trading losses on European sovereign debt. The firm's IT general controls — specifically change management and logical access — failed to prevent or detect the unauthorized system modifications that enabled the transfers. The collapse was the eighth-largest US bankruptcy at the time and left customers unable to access their accounts for months.",
          "The ITGC failures at MF Global were systemic and mutually reinforcing. Developers had production access — violating the fundamental change management segregation of duties requirement — which meant that code changes could be deployed to production without independent review or approval. Change tickets were routinely bypassed for 'urgent' fixes, with emergency processes used so frequently that auditors later concluded they were the de facto standard process rather than the exception. The change management control, in effect, did not exist as a meaningful check on production modifications.",
          "Logical access failures compounded the change management breakdown. Access reviews had not been conducted in over a year, meaning the auditor's basic question — 'does every person with access to this system need that access?' — could not be answered from available evidence. Service accounts used by automated systems had excessive privileges and no documented owners, making it impossible to determine after the fact whether system-generated transactions were authorized. The combination of unrestricted developer access and unreviewed logical access created an environment in which fraud and unauthorized action were both possible and difficult to detect.",
          "The post-collapse investigation by the bankruptcy trustee found that the transfers of customer funds were executed through the firm's treasury management systems using access credentials and system functionality that should have been restricted. Under a functioning ITGC environment — with proper logical access controls limiting who could initiate large fund transfers, proper change management preventing unauthorized system modifications, and proper computer operations controls logging and monitoring all significant financial transactions — the transfers would have either been prevented or detected within hours rather than after the firm's collapse.",
          "For IT auditors, MF Global illustrates the compounding effect of ITGC failures. Each individual failure — developer production access, bypassed change tickets, overdue access reviews — is significant on its own. Together, they create an environment that is essentially uncontrolled. The lesson embedded in ISACA's CISA curriculum: ITGC failures are not additive, they are multiplicative. An organization with three ITGC deficiencies does not have three times the normal risk; it has an environment in which no application control can be trusted, because any of the three ITGC failures could have corrupted the application controls' operation. Auditors must test all four ITGC domains — a clean change management program does not compensate for failed logical access.",
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
        "The four ITGC pillars: Change Management, Logical Access, Computer Operations, Program Development — all four must be effective",
        "ITGC failures are pervasive — they invalidate reliance on ALL application controls built on the failed foundation",
        "SOX 404 audits spend the majority of IT audit time on ITGCs for financial systems; ITGC failures require expanded audit procedures",
        "Terminated employees with active accounts is among the most common ITGC finding — and the most dangerous in privileged-access environments",
        "Segregation of duties: the developer who writes code and the approver who authorizes production deployment must be different people",
        "Emergency change rate above 10% is a red flag — investigate whether emergency process is being used to bypass standard controls",
        "Unrestored backups are a false control — backups must be tested for recoverability annually with documented results",
        "ITGC remediation requires process change, not just one-time fixes — root cause analysis is mandatory",
        "PCAOB AS 2201 requires external auditors to independently verify management's ICFR assessment — management's self-certification is not sufficient",
        "Shared privileged accounts prevent forensic attribution — every admin action must be traceable to a named individual",
      ],
      references: [
        { title: "PCAOB AS 2201 — Auditing Internal Control", url: "https://pcaobus.org/Standards/Auditing/Pages/AS2201.aspx" },
        { title: "ISACA ITGC Audit Program", url: "https://www.isaca.org/resources/isaca-journal/issues/2016/volume-4/it-general-controls" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-03-q1", type: "Core Idea", challenge: "Foundations first.", text: "How do IT General Controls (ITGCs) differ from application controls?", options: ["ITGCs apply across the whole IT environment and underpin all application controls","ITGCs are app-specific","They are identical","ITGCs only cover printers"], correctIndex: 0, explanation: "Application controls mean nothing if the ITGCs beneath them are broken." },
        { id: "audit-03-q2", type: "Pervasiveness", challenge: "One crack, many doubts.", text: "Why is a single ITGC failure (e.g., emergency changes bypassing approval) so serious?", options: ["It's pervasive — it casts doubt on every report the affected system produced","It only affects one record","It's a minor cosmetic issue","It speeds up audits"], correctIndex: 0, explanation: "ITGC failures invalidate reliance on all application controls in that system." },
        { id: "audit-03-q3", type: "ITGC Pillars", challenge: "Who gets in.", text: "Which ITGC pillar ensures only authorized users can access systems and data?", options: ["Logical Access — least privilege and individual accountability","Physical HVAC","Network speed","Marketing"], correctIndex: 0, explanation: "Logical Access enforces who can reach systems, with accountability." },
        { id: "audit-03-q4", type: "SoD", challenge: "Marking your own homework.", text: "Which is a Segregation of Duties (SoD) violation in change management?", options: ["The developer who wrote the code also approved their own change ticket","Two different people review a change","A CAB approves a change","An auditor reads logs"], correctIndex: 0, explanation: "Self-approval with no independent review is a classic SoD violation." },
        { id: "audit-03-q5", type: "Real Incident", challenge: "MF Global, 2011.", text: "What did the MF Global collapse demonstrate about ITGCs?", options: ["Multiple simultaneous ITGC failures together created the permissive environment for fraud","A single access failure alone caused it","It had no control issues","It was purely market risk"], correctIndex: 0, explanation: "It was several concurrent ITGC failures, not one isolated gap." },
        { id: "audit-03-q6", type: "Reliance", challenge: "Why ITGCs matter to financials.", text: "Why do auditors care so much about ITGCs in a financial audit?", options: ["If ITGCs fail, they can't rely on the system's financial data","They don't care about ITGCs","ITGCs set prices","ITGCs are optional"], correctIndex: 0, explanation: "Reliable financial reporting depends on sound general controls." },
        { id: "audit-03-q7", type: "Definition", challenge: "Name the layer.", text: "Logical access, change management, and operations are examples of…", options: ["IT General Controls","Application controls","Marketing controls","Physical locks only"], correctIndex: 0, explanation: "These environment-wide controls are ITGCs." },
        { id: "audit-03-q8", type: "Concept", challenge: "Build order.", text: "Why test ITGCs before relying on application controls?", options: ["Application controls are only trustworthy if the general controls beneath them hold","App controls come first","ITGCs don't affect apps","It's faster to skip them"], correctIndex: 0, explanation: "Weak ITGCs undermine every application control above them." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. ITGC failures are 'pervasive' — they invalidate reliance on ALL application controls in the affected system",
          "  2. Segregation of Duties (SoD) requires the developer who writes code and the approver who authorizes it to be different people",
          "  3. An unauthorized change to a financial system triggers SOX 404 additional procedures — the auditor cannot simply rely on system output",
          "─────────────────────────────────────────────────────────────────────",
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
        "Access control auditing verifies that the principle of least privilege is enforced throughout an organization's IT environment: every user — employee, contractor, or service account — has exactly the permissions needed to perform their documented job function, and no more. This principle sounds simple but is extraordinarily difficult to maintain in practice. Systems accumulate users. Users change roles. Contractors complete engagements. Business units reorganize. Through all of these changes, access granted for a former purpose persists unless an active process removes it. That accumulation — permission creep — is what access control audits are designed to find and remediate.",
        "The key ISACA control objectives for access control are derived from COBIT's APO13 (Security Management) and DSS05 (Managed Security Services) domains, and they align with NIST SP 800-53's Access Control (AC) family. Access provisioning must follow an approved request process with documented business justification. Access must be reviewed and recertified at least annually, with managers confirming that each team member's access remains appropriate. Terminated employees must be deprovisioned within 24 hours for standard accounts and immediately (or within 4 hours) for privileged accounts. Privileged access must be restricted to the minimum required, documented with business justification, protected with multi-factor authentication, and subject to enhanced monitoring.",
        "Access control findings are among the most common in any IT audit, and they range from administrative (missing recertification evidence) to critical (terminated employees with active privileged accounts). The frequency of these findings reflects a systemic challenge: access management requires coordination between HR, IT, and business management, and breakdowns in that coordination produce access control gaps. When the HR-to-IT notification workflow is manual, or when IT depends on managers to submit access removal requests, gaps are inevitable. Auditors test not just the current state of access but the process that produced it — because a clean access list produced by a broken process will fail again.",
        "Privileged Access Management (PAM) is the most security-critical subset of access control. Privileged accounts — domain administrators, database administrators, root accounts, service accounts with elevated permissions, and cloud IAM roles with broad permissions — provide access to systems and data at a level that bypasses most application-level controls. A privileged user can modify financial records, delete audit logs, extract encryption keys, and disable security monitoring. PAM controls include: just-in-time (JIT) access provisioning (privileges are granted on demand and expire automatically), privileged access workstations (PAWs) that are dedicated machines used exclusively for admin tasks, session recording for all privileged sessions, and regular review of privileged access rights against job requirements.",
        "Role-Based Access Control (RBAC) is the dominant model for managing standard user access. In RBAC, access rights are attached to roles rather than individuals. A user is assigned a role (e.g., 'Accounts Payable Clerk'), and the role's access rights — which systems, which data, at what permission level — are pre-defined and consistently applied. RBAC simplifies provisioning (assign the role, access is configured automatically), deprovisioning (remove the role, all associated access is removed), and recertification (managers certify the role assignment, not individual permission settings). Auditors test RBAC implementations by verifying that role definitions have been reviewed and approved, that role assignments match job descriptions, and that users do not have multiple conflicting roles that violate segregation of duties.",
        "Segregation of duties (SoD) conflicts in access control occur when a single user has access rights that span two incompatible functions — for example, having both the ability to create vendor records in accounts payable and the ability to approve payments to those vendors. SoD conflicts create fraud opportunity: a user with both permissions could create a fictitious vendor and approve fraudulent payments without a second party's involvement. Access control audits specifically test for SoD conflicts by reviewing user access against a conflict matrix that identifies incompatible permission combinations. Common conflicts in financial systems include: create/approve vendor, initiate/approve wire transfer, post/approve journal entries, and order/receive goods.",
        "Service accounts present a distinct set of access control challenges. Service accounts are system identities used by applications, scheduled jobs, and automated processes rather than by human users. They often require elevated permissions to perform their functions and are typically shared across multiple instances of the application. Because no human reviews their activity daily, and because their credentials are embedded in configuration files, service accounts are a frequent target for attackers and a frequent source of audit findings. Auditors test service accounts by inventorying all service accounts in each in-scope system, verifying that each has a documented owner, that credentials are rotated on a defined schedule, that interactive logon is disabled where not required, and that permissions are limited to the specific functions the service account performs.",
      ],
      technical: {
        title: "Access Review Testing Approach",
        body: [
          "The access review testing methodology begins with pulling the complete user access list from each in-scope system. For enterprise systems, this typically means extracting from Active Directory (for Windows environments), LDAP, or the application's own user management module. The extract must include: username, account status (active/disabled), role or permission level, last logon date, last password change date, account creation date, and manager. This data becomes the auditor's working population for all access testing.",
          "For each account in the population, auditors perform four verification steps. First, verify there is an approved access request on file — typically an IT service desk ticket, an email approval from a manager, or a workflow approval from the identity governance system. The request should document who requested the access, what access was requested, the business justification, and who approved it. Requests that cannot be located are access provisioning control failures. Second, verify the account maps to an active employee — compare the user list against the current HR employee roster and any contractor engagement register. Accounts for individuals not on either list are orphaned accounts.",
          "Third, verify the access level matches the user's current role. This requires obtaining the current organizational chart or HR job title for each user and comparing their access rights against the access matrix for their role. Users who have changed roles since their last access review may have accumulated rights from prior roles that are no longer appropriate — this is permission creep. Fourth, verify annual recertification was completed. Pull the recertification records for the most recent cycle and verify that a manager confirmed each user's access within the required timeframe. Missing recertification evidence for any user is a control gap, even if the underlying access is appropriate.",
          "Privileged account testing follows a more intensive procedure. For each account with administrative or elevated access, auditors verify: a documented business justification naming the specific functions requiring privileged access; a named owner who is responsible for the account and who reviewed it in the most recent access review cycle; MFA enforcement — privileged accounts without MFA are a critical finding in virtually every regulatory environment; session logging — all privileged sessions should be logged, and those logs should be reviewed regularly; and activity review — evidence that someone has actually reviewed the logs for anomalous privileged activity within the past quarter.",
          "The access review workpaper documents the population size, sample selected (or full population if tested), each item tested, the evidence examined, any deviations found, and the auditor's conclusion. Deviations are classified by severity: critical (terminated employee with active privileged access, shared admin account without MFA), high (missing recertification evidence for privileged account, SoD conflict in financial system), and medium (missing recertification for standard user, access level slightly above role requirements). Each deviation requires a management response and a remediation timeline that the audit team tracks to closure.",
          "Automated tools have transformed access review testing. Identity Governance and Administration (IGA) platforms such as SailPoint, Saviynt, and Oracle Identity Governance can automatically pull access data from connected systems, compare it against HR data, flag SoD conflicts, and run recertification campaigns that route approval requests to managers. When an organization has an IGA platform, auditors test the platform's configuration — are all in-scope systems connected? Are the SoD conflict rules complete and current? Are recertification campaigns completed within the required timeframe? — rather than manually pulling and comparing lists. IGA platforms do not eliminate the need for access control testing; they change the nature of the testing from data extraction to configuration review.",
          "The most important output of access control testing is not the list of individual findings but the pattern they reveal. Five terminated employees with active accounts in five different systems suggests a systemic deprovisioning process failure. Fifteen users with SoD conflicts in the financial system suggests the role design was never reviewed for conflicts. Twenty users with missing recertification evidence suggests the recertification campaign was not properly administered. Pattern findings require systemic remediation — process redesign, automation, or organizational change — not just item-by-item account cleanup. Auditors who report only individual findings without diagnosing the pattern are providing incomplete assurance.",
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
          "Edward Snowden was a Booz Allen Hamilton contractor working as a system administrator for the NSA when he exfiltrated approximately 1.7 million classified documents between 2012 and 2013. The access control failure that enabled the breach was not a technical vulnerability — it was a systematic failure of the access management processes that should have prevented a system administrator from accumulating access to materials far beyond the scope of his job function. Snowden requested and received access to materials across multiple NSA programs, and the access review processes failed to identify or challenge the accumulation.",
          "The principle of least privilege requires that each access grant be justified by current job requirements. Snowden's position as a system administrator required administrative access to infrastructure — operating systems, networks, storage. It did not require substantive access to the intelligence products stored on that infrastructure. The NSA's access control model failed to enforce this distinction, allowing administrative access to infrastructure to confer access to content. Post-incident reviews found that NSA contractors in similar roles had broad, poorly defined access entitlements that were never challenged through recertification.",
          "The access review failure was compounding. Recertification processes — if they occurred at all for contractor accounts — did not meaningfully challenge whether the accumulation of access rights made sense for the role. The review process asked whether the user still needed access to the systems they had access to, rather than whether the total scope of their access was appropriate for their job function. This distinction is critical: a user can 'need access' to dozens of systems in the sense that they have legitimate reasons to access each one individually, while the combination of all those accesses creates a capability that no individual should have.",
          "The Snowden case directly influenced two significant changes to access control standards and audit methodology. First, it accelerated adoption of User and Entity Behavior Analytics (UEBA) — systems that baseline normal access patterns for each user and alert when behavior deviates. A system administrator who suddenly begins accessing thousands of intelligence reports is exhibiting anomalous behavior that UEBA would flag. Second, it prompted a reexamination of the insider threat model in access control audits. Prior to 2013, access control audits focused primarily on external threat prevention. Post-Snowden, auditors explicitly test for insider threat controls: access segmentation, activity monitoring, data loss prevention, and behavioral analytics.",
          "For practicing auditors, the Snowden case generates specific testing requirements for any environment handling sensitive data. Does the access model distinguish between administrative access (to infrastructure) and content access (to data stored on that infrastructure)? Are access entitlements reviewed for cumulative scope, not just individual system justifications? Are contractor accounts subject to the same access review frequency as employee accounts — or more frequent, given that contractor engagements are typically bounded in scope and duration? Is UEBA or equivalent behavioral monitoring deployed on systems containing the most sensitive data? The answers to these questions determine whether the organization's access control posture has absorbed the lessons of 2013.",
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
        "Least privilege: every user has exactly what they need for their current role — no more, no historical accumulation",
        "Recertification must occur at least annually — missing evidence is a finding regardless of whether underlying access is appropriate",
        "Privileged accounts must be deprovisioned immediately on termination — 24 hours is the outer limit, not the target",
        "Permission creep occurs when access granted for a prior role is never removed — cumulative access must be reviewed, not just individual grants",
        "Segregation of duties conflicts must be identified through a conflict matrix — financial systems especially require create/approve separation",
        "Service accounts require documented owners, restricted interactive logon, scheduled credential rotation, and minimal privilege scope",
        "Shared privileged accounts are a critical finding — every privileged action must be attributable to a named individual",
        "IGA platforms automate access review campaigns but must be configured correctly — auditors test the platform configuration, not just the output",
        "Behavioral analytics (UEBA) is the detective control that compensates for access control gaps — test that it is deployed and tuned",
        "Contractor access requires the same — or more frequent — review cadence as employee access, given bounded engagement scope",
      ],
      references: [
        { title: "NIST SP 800-53 — Access Control Family", url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" },
        { title: "ISACA Access Control Audit Program", url: "https://www.isaca.org/resources/isaca-journal" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-04-q1", type: "Core Idea", challenge: "Just enough access.", text: "What does the principle of least privilege mean?", options: ["Each user has exactly the permissions needed for their job, and nothing more","Everyone is an admin","No one has access","Access never changes"], correctIndex: 0, explanation: "Least privilege minimizes what any account can do or expose." },
        { id: "audit-04-q2", type: "Recertification", challenge: "Review the access.", text: "How often must user access be reviewed/recertified under ISACA standards?", options: ["At least annually for all in-scope accounts","Never","Only when hacked","Every five years"], correctIndex: 0, explanation: "Annual recertification is mandatory — it's not optional for non-privileged accounts." },
        { id: "audit-04-q3", type: "Deprovisioning", challenge: "The clock on termination.", text: "How quickly must privileged accounts be deprovisioned when an employee is terminated?", options: ["Within 24 hours","Within 90 days","At the next annual review","Never"], correctIndex: 0, explanation: "Privileged access must be removed within 24 hours of termination." },
        { id: "audit-04-q4", type: "Real Incident", challenge: "Snowden, 2013.", text: "Which access-control failure does the Snowden case illustrate?", options: ["Privilege accumulation — access never removed after role changes — plus weak recertification","A zero-day exploit","A phishing email","A DDoS attack"], correctIndex: 0, explanation: "Accumulated, un-reviewed access enabled mass data access." },
        { id: "audit-04-q5", type: "Shared Accounts", challenge: "Who did it?", text: "Is a shared admin account used by four people acceptable if the password is complex and rotated?", options: ["No — shared accounts provide no individual accountability or forensic attribution","Yes — complexity is enough","Only for IT staff","Only on weekends"], correctIndex: 0, explanation: "Shared accounts destroy accountability regardless of password strength." },
        { id: "audit-04-q6", type: "Concept", challenge: "Access creep.", text: "Why is 'access granted and never reviewed' dangerous?", options: ["It becomes permanent access regardless of role changes","It expires automatically","It improves security","It saves money"], correctIndex: 0, explanation: "Without review, stale access accumulates into excess privilege." },
        { id: "audit-04-q7", type: "Accountability", challenge: "Individual identity.", text: "Why does each user need their own account?", options: ["So actions can be attributed to an individual for forensics and accountability","To use more licenses","To slow logins","It's not required"], correctIndex: 0, explanation: "Individual accounts enable attribution; shared ones don't." },
        { id: "audit-04-q8", type: "Definition", challenge: "Name the practice.", text: "Periodically confirming each user still needs their access is called…", options: ["Access recertification (review)","Encryption","Patching","Tokenization"], correctIndex: 0, explanation: "Recertification re-validates access against current job needs." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Privileged accounts must be deprovisioned within 24 hours of termination — 167 days is a critical ITGC failure",
          "  2. Post-termination logon activity is a potential unauthorized access event requiring forensic investigation, not just account deletion",
          "  3. The Snowden case showed that privilege accumulation over time — never removed — is the root cause; recertification is the preventive control",
          "─────────────────────────────────────────────────────────────────────",
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
        "Change management controls ensure that all modifications to production systems go through a documented, approved, and tested process before implementation. This is not bureaucracy for its own sake — it is the control that prevents accidental outages, unauthorized code deployment, and the introduction of security vulnerabilities into production environments. The ITIL framework, now in its fourth version, defines three change types with different approval requirements calibrated to their risk level: Standard (pre-approved low-risk routine changes), Normal (requiring Change Advisory Board review and approval), and Emergency (expedited approval for critical fixes, with mandatory post-hoc documentation).",
        "The Change Advisory Board (CAB) is the governance body that reviews and approves Normal changes before they reach production. The CAB's composition reflects the cross-functional nature of IT risk: it typically includes IT management, security, operations, application owners, and business stakeholders. Its role is to assess the risk of the proposed change, confirm that testing is complete and results are documented, verify that a rollback plan exists and is executable, confirm that the maintenance window is appropriate, and formally authorize the change. The CAB is not a rubber stamp — effective CABs challenge assumptions, require rework when testing is incomplete, and reject changes that pose unacceptable risk.",
        "Auditors test change management by sampling production changes and verifying five elements for each sampled change: the approved change ticket exists and was opened before the change was made (not backdated), the CAB approval is documented with approver name and date, the developer who made the change and the approver are different individuals (segregation of duties), test results are attached showing the change was tested in a non-production environment, and a rollback plan is documented and was feasible at the time of deployment. Emergency changes receive additional scrutiny: was the emergency designation justified (genuine urgency, not convenience), and was post-hoc approval obtained within the required timeframe?",
        "The emergency change process is a necessary safety valve but one that is frequently abused. Legitimate emergencies — a zero-day vulnerability being actively exploited, a production system failure blocking business operations — justify expedited approval processes. But when the emergency change rate exceeds 10–15% of all changes, auditors investigate whether the normal change process is being circumvented under the guise of urgency. Common patterns include: developers who routinely use emergency processes to avoid CAB review timelines, managers who approve emergency designations without verifying the urgency, and environments where 'emergency' has been normalized as an alternative process rather than an exception.",
        "Maintenance windows are the approved time periods during which production changes may be deployed. Maintenance windows are typically scheduled during low-traffic periods — overnight, on weekends — when the impact of a failed change is minimized and IT staff are available to monitor the deployment. Changes deployed outside the maintenance window without emergency authorization are a finding regardless of their technical content, because they represent a failure to follow the approved change process. Auditors verify maintenance window compliance by comparing change deployment timestamps against the approved window schedule and flagging any out-of-window deployments that lack emergency authorization documentation.",
        "Modern DevOps and CI/CD practices have created tension with traditional change management models. Continuous deployment environments can deploy dozens of changes per day — a rate incompatible with human-review CAB processes. ITIL 4 addresses this by introducing the concept of the 'change authority,' which can be automated systems rather than human reviewers for low-risk, well-tested changes. Auditors evaluating CI/CD environments test whether the pipeline itself constitutes a sufficient change control: Does the pipeline enforce automated testing before deployment? Does it require passing security scans? Does it maintain an immutable audit log of every deployment? Is there a mechanism to halt deployments when tests fail? A well-configured CI/CD pipeline can be a more reliable change control than a manual CAB process — but only if it is properly configured and its configuration is itself audited.",
        "Post-implementation review (PIR) is the change management control that closes the loop. After a change is deployed, the PIR documents whether the change achieved its intended purpose, whether any unexpected side effects occurred, what was learned from the deployment, and whether any follow-up actions are needed. PIR evidence is also an ITGC control — auditors verify that PIRs were completed within the required timeframe (typically 5 business days) and that any issues identified in PIRs were tracked to resolution. Organizations that skip PIRs are losing the institutional learning that prevents recurring problems. Organizations whose PIRs consistently show unexpected side effects from changes have a deeper problem: their testing environments do not accurately represent production, meaning pre-deployment testing is not catching what the PIR is finding after deployment.",
      ],
      technical: {
        title: "Change Management Testing Checklist",
        body: [
          "For each sampled change, the auditor works through a structured verification checklist. Step one: verify the change ticket exists and was opened before the change was made. This requires comparing the ticket creation timestamp against the production deployment log. Backdated tickets — where the ticket was created after the change was deployed — are a finding because they suggest the control is being documented after the fact rather than executed as a genuine control. Step two: verify CAB approval is documented. Pull the CAB meeting minutes or the approval workflow record and confirm the change was reviewed, that named approvers signed off, and that the approval predates the deployment.",
          "Step three: verify segregation of duties. The individual who developed and tested the change must not be the same individual who approved it for production deployment, and must not be the same individual who deployed it. This three-way separation (developer, approver, deployer) is the ideal state. At minimum, developer and approver must be separate. When the same person appears in both roles, the control has failed — there is no independent check on the change's content or appropriateness. Step four: verify test evidence. Testing documentation should include: the test environment where testing was performed, the test cases executed, the results of each test case, who performed the testing, and sign-off from the business or application owner confirming user acceptance.",
          "Step five: verify rollback plan. The rollback plan must be documented in the change ticket before approval, must be technically executable within the maintenance window, and must have been reviewed by someone capable of evaluating its feasibility. A rollback plan that says 'restore from backup' is insufficient unless it also specifies which backup, where it is stored, how long restoration will take, and what data loss is acceptable. For database changes, the rollback plan typically includes specific SQL scripts that reverse the change. For application deployments, it typically specifies the prior version that will be redeployed and the steps to execute the rollback. Step six: verify post-implementation review. PIR documentation should exist within 5 business days of deployment and should address whether the change succeeded, what (if anything) went wrong, and what follow-up is needed.",
          "Red flags in change management audits signal systematic problems. A high emergency change rate (above 10%) suggests the normal process is being avoided. Changes applied outside the maintenance window without emergency designation indicate process discipline has broken down. Multiple changes where the developer and approver are the same person indicate that segregation of duties is not enforced by the change management tool — the tool should prevent the same person from both submitting and approving a change ticket. Changes with test evidence attached as empty documents, or with test evidence clearly copied from prior changes without modification, indicate that testing is being faked rather than performed.",
          "Sampling strategy for change management testing depends on the population size. For a population of fewer than 50 changes, auditors often test the full population. For populations of 50–250, a sample of 25–40 is typical at 95% confidence. For populations above 250, attribute sampling tables determine the appropriate sample size based on the tolerable deviation rate. Regardless of sample size, auditors should deliberately include in their sample: the highest-risk changes (core financial systems, security infrastructure), any changes that were flagged by management as exceptions, and any emergency changes — because emergency changes represent the highest-risk category and should be tested at a higher rate than normal changes.",
          "Change management testing for cloud environments requires additional procedures. Infrastructure-as-Code (IaC) changes — modifications to Terraform, CloudFormation, or Ansible templates that define cloud infrastructure — must be subject to change management controls just like traditional system changes. Auditors test whether IaC changes go through a peer review process (the code review in a pull request can function as the CAB approval if properly documented), whether changes are applied through the pipeline rather than manually in the console (manual console changes bypass all pipeline controls), and whether the pipeline enforces a separation between the person who writes the IaC and the person who merges it to the deployment branch.",
          "The change freeze concept is important in regulated environments. During periods of high business risk — quarter-end financial close, major system migrations, regulatory examinations — organizations implement change freezes that prohibit non-emergency production changes. Auditors verify that change freezes were properly declared, that the freeze dates align with the calendar events that motivated them, and that no normal changes were deployed during the freeze period. Violations of change freezes are significant findings because they introduce system instability risk precisely when system reliability is most critical.",
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
          "Knight Capital Group's August 1, 2012 incident is the most dramatic example of change management failure in financial services history. Knight deployed new trading software — the Power Peg market-making algorithm — to production. The deployment process involved manually copying the software to eight of their nine production trading servers. The ninth server was missed. That server continued running legacy SMARS (Smart Market Access Routing System) code, activated by a flag that the new Power Peg software had repurposed for a different function. When NYSE opened at 9:30 AM, all nine servers began processing orders. Eight servers ran Power Peg correctly. The ninth server ran SMARS, executing a 1997-era 'buy high, sell low' order routing strategy at modern algorithmic speed.",
          "Within 45 minutes, Knight Capital had executed approximately 4 million trades in 154 stocks, accumulating a $7 billion long position in stocks it was buying at market price and immediately selling at lower prices — the opposite of profitable market-making. The position lost $440 million in less than an hour. The change management failures were multiple and compounding. First, the deployment lacked a verification step confirming that the new software had been successfully installed on all nine servers — basic deployment validation that any mature change management process would require. Second, no monitoring alert was configured to detect if one server was exhibiting fundamentally different trading behavior from the other eight. Third, there was no kill switch that could halt all trading immediately when the anomaly was detected.",
          "The post-incident SEC investigation found that Knight Capital had known about the SMARS legacy code and the repurposed flag — the risk was documented internally. What failed was the change management process that should have ensured the deployment was complete before trading opened, and the monitoring infrastructure that should have detected within seconds that something was catastrophically wrong. Knight also lacked an adequate rollback plan: when the problem was identified, there was no rapid mechanism to revert to the prior software version across all servers simultaneously. By the time manual intervention halted the trading, the losses were realized.",
          "The Knight Capital case is now required reading in ITIL and CISA curricula because it illustrates that change management controls are not bureaucratic overhead — they are financial survival controls. A pre-deployment verification checklist requiring confirmation from all nine servers would have cost ten minutes of someone's time. Not having that checklist cost $440 million in 45 minutes and the firm's independent existence. Knight was acquired by GETCO within months at a distressed valuation. The SEC fined Knight $12 million for inadequate risk management controls. The case established precedent for regulatory scrutiny of algorithmic trading change management practices.",
          "For auditors, Knight Capital generates a specific testing requirement for any organization with automated or algorithmic systems: does the deployment verification process confirm that the new code is running correctly on all instances before the system begins processing live transactions? This verification must be automated — manual checks at the scale and speed of algorithmic systems are insufficient. Auditors also test whether the organization has implemented circuit breakers — automated controls that halt processing when behavior deviates from expected parameters. The absence of circuit breakers in a high-volume automated system is a change management and computer operations finding, because it means that a failed deployment cannot be detected and halted automatically.",
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
        "Three ITIL change types: Standard (pre-approved), Normal (CAB review), Emergency (expedited + mandatory post-hoc documentation)",
        "Segregation of duties: developer, approver, and deployer should be three different people — developer and approver is the minimum separation",
        "Emergency change rate above 10% is a red flag — investigate whether the emergency designation is being used to bypass CAB review",
        "Rollback plan is mandatory before CAB approval — if you cannot describe how to undo the change, the change is not approved",
        "Maintenance window violations are findings regardless of change content — process discipline matters independently of technical outcome",
        "Pre-deployment verification must confirm all instances received the new code — Knight Capital lost $440M because one of nine servers was missed",
        "Post-implementation review closes the loop — PIR evidence within 5 business days is an ITGC requirement",
        "CI/CD pipelines can function as automated change controls if properly configured — auditors test pipeline configuration, not just pipeline output",
        "Change freezes during high-risk periods must be enforced — violations during quarter-end or regulatory examinations are significant findings",
        "IaC changes (Terraform, CloudFormation) must be subject to change management controls — console changes bypass all pipeline controls",
      ],
      references: [
        { title: "ITIL 4 — Change Enablement Practice", url: "https://www.axelos.com/certifications/itil-service-management" },
        { title: "Knight Capital Post-Incident SEC Filing", url: "https://www.sec.gov/litigation/admin/2013/34-70694.pdf" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-05-q1", type: "Core Idea", challenge: "Controlled experiments.", text: "Why is change management a control?", options: ["Every production change is a controlled experiment — without control you're flying blind","Changes never fail","It slows developers for no reason","It only matters for hardware"], correctIndex: 0, explanation: "Controlled change reduces the risk that a deployment breaks production." },
        { id: "audit-05-q2", type: "ITIL", challenge: "Who reviews it.", text: "Which ITIL change type requires Change Advisory Board (CAB) review before production?", options: ["Normal changes","Standard (pre-approved) changes","Trivial changes","No changes need review"], correctIndex: 0, explanation: "Normal changes go through CAB to assess risk and confirm testing." },
        { id: "audit-05-q3", type: "Red Flag", challenge: "Too many 'emergencies'.", text: "Why is an emergency-change rate above ~10% a red flag?", options: ["It signals teams are bypassing normal controls by labeling changes 'emergency'","Emergencies are always fine","It means the system is healthy","It speeds approvals legitimately"], correctIndex: 0, explanation: "High emergency rates indicate process circumvention, not real emergencies." },
        { id: "audit-05-q4", type: "Real Incident", challenge: "Knight Capital, 2012.", text: "What change-management failure caused Knight Capital's $440M loss?", options: ["A deployment not verified across all servers, with no automated rollback","A stolen password","A DDoS attack","A phishing email"], correctIndex: 0, explanation: "A partial deployment caused erroneous trades with no rollback to stop them." },
        { id: "audit-05-q5", type: "Rollback", challenge: "Undo or don't ship.", text: "When is a rollback plan required?", options: ["For all production changes — if you can't undo it, you can't approve it","Only for critical systems","Never","Only after a failure"], correctIndex: 0, explanation: "A rollback plan is mandatory for every production change." },
        { id: "audit-05-q6", type: "Counting Violations", challenge: "Two distinct failures.", text: "A change deployed out-of-window by the same person who developed it represents how many control violations?", options: ["Two — a Segregation of Duties failure AND an out-of-window deployment","One","Zero","Four"], correctIndex: 0, explanation: "SoD failure and out-of-window deployment are two separate violations." },
        { id: "audit-05-q7", type: "Maintenance Window", challenge: "When changes happen.", text: "Deploying outside the approved maintenance window is…", options: ["A control violation — changes must occur in the approved window","Encouraged for speed","Irrelevant","Only an issue if it fails"], correctIndex: 0, explanation: "Out-of-window deployment bypasses the agreed change control." },
        { id: "audit-05-q8", type: "Concept", challenge: "Why control change.", text: "What does change management primarily protect against?", options: ["Untested or unauthorized changes breaking production","Slow typing","High electricity bills","Marketing errors"], correctIndex: 0, explanation: "It ensures changes are tested, approved, and reversible." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Two simultaneous ITIL violations (SoD + maintenance window) on a safety-critical system compound risk exponentially",
          "  2. The Change Advisory Board (CAB) exists precisely to prevent this — no CAB approval = no production deployment",
          "  3. Emergency change rate above 10% signals process circumvention; 'emergencies' become a loophole for bypassing controls",
          "─────────────────────────────────────────────────────────────────────",
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
        "Business Continuity Planning (BCP) and Disaster Recovery (DR) audits verify that an organization can continue critical operations and recover IT systems after a disruption — whether that disruption is a natural disaster, a ransomware attack, a data center fire, or a critical vendor failure. ISACA's CISA examination dedicates substantial coverage to BCP/DR because these plans are systematically neglected in practice: they are created during compliance exercises, stored in shared drives, and never exercised. An untested recovery plan is not a control — it is documentation of intent, and intent has never restored a database.",
        "The foundational metrics of BCP/DR define what recovery means in business terms. The Recovery Time Objective (RTO) specifies the maximum time a system can be unavailable before the business consequence becomes unacceptable — financial loss, regulatory sanction, customer churn, or reputational damage crosses a defined threshold. The Recovery Point Objective (RPO) specifies the maximum amount of data loss that is acceptable — measured in time, it defines how far back the restored system can reach. The Maximum Tolerable Downtime (MTD) is the absolute outer limit: the point at which the disruption causes irreversible business harm. The BCP's fundamental requirement is that the RTO must be less than the MTD — otherwise, the plan literally cannot save the business.",
        "Business Impact Analysis (BIA) is the analytical foundation of BCP/DR planning and the first thing auditors review. The BIA identifies each critical business process, the IT systems that support it, the financial and operational impact of that system being unavailable, and the resulting RTO and RPO requirements. A BIA that was conducted three years ago and has not been updated since a major system migration, cloud adoption, or business acquisition is stale — and stale BIAs produce BCP/DR plans that do not reflect the current operating environment. Auditors test BIA currency by comparing the systems listed in the BIA against the current production system inventory and identifying systems that are in production but not in the BIA.",
        "Recovery strategies must be designed to achieve the approved RTO and RPO. Common strategies include: hot standby (a fully operational duplicate environment that can assume production workloads immediately), warm standby (a partially configured environment that requires some preparation before assuming production), cold standby (hardware and connectivity available but software not installed or configured), and cloud failover (cloud-based infrastructure provisioned on demand during a disaster). Each strategy has different RTO/RPO characteristics and different costs. Hot standby achieves near-zero RTO and RPO but is expensive. Cold standby is inexpensive but may have RTOs measured in days. Auditors verify that the recovery strategy selected for each system can actually achieve the approved RTO/RPO — not that it could theoretically achieve them, but that it has demonstrated it in testing.",
        "Tabletop exercises and full DR tests serve different purposes and are both required. A tabletop exercise is a discussion-based simulation in which stakeholders walk through a disaster scenario and discuss how they would respond. It tests the plan's logical structure, identifies gaps in roles and communication, and exercises decision-making without system disruption. A full DR test requires actually failing over to the recovery environment, running systems from the backup site, and verifying that RTOs and RPOs are achieved in practice. Organizations that conduct only tabletops are testing the document, not the technology. Organizations that conduct only technical DR tests without tabletops are testing the technology but not the human coordination required to use it under real crisis conditions.",
        "Ransomware has fundamentally changed BCP/DR requirements for most organizations. The traditional DR scenario — a natural disaster destroys the primary data center — assumed that backup systems were intact. Ransomware attacks encrypt not just production systems but backup systems, cloud-connected repositories, and anything accessible from the compromised network. BCP/DR audits now specifically test: Are backups stored in an air-gapped or immutable format that ransomware cannot encrypt? Are at least three copies of critical data maintained (3-2-1 rule: three copies, two media types, one offsite)? Has the organization tested restoration from an isolated backup — meaning a backup that was disconnected from the network before the ransomware attack and therefore unaffected? Has the organization conducted a tabletop exercise specifically for a ransomware scenario that includes backup compromise?",
        "Geographic separation of primary and backup sites is a non-negotiable requirement that Katrina exposed at scale. Two data centers in the same metropolitan area can be affected by the same flood, power grid failure, or regional network outage. Federal banking regulators require primary and backup sites to be outside the same flood zone and at sufficient distance to be unaffected by regional disasters. The specific distance requirement varies by regulator — FDIC and OCC guidance generally requires sites separated by at least 100 miles — but the principle is universal: the scenario that destroys the primary site must not also destroy the backup. Auditors verify geographic separation by reviewing data center location documentation and assessing whether the sites share any critical dependencies (power grid segment, ISP backbone, seismic fault).",
      ],
      technical: {
        title: "RTO, RPO, and MTD in Practice",
        body: [
          "Working through a BCP/DR gap analysis requires translating abstract metrics into concrete operational requirements. Consider a payment processing system with an MTD of 4 hours — the business analysis shows that beyond 4 hours of downtime, regulatory fines under the payment network agreement begin accruing, and customer-facing checkout failures reach a volume that triggers contractual SLA penalties. The IT team, working from the BIA, sets RTO at 2 hours (leaving a 2-hour safety margin within the MTD) and RPO at 15 minutes (acceptable transaction data loss given that the payment processor's journal can reconstruct most transactions).",
          "These targets have direct technical implications. An RPO of 15 minutes means backups or replication must run at least every 15 minutes — not hourly, not daily. Transaction logs must be shipped to the recovery environment continuously or in near-real-time. Any backup schedule longer than the RPO creates a gap that, in the event of a disaster, will result in data loss exceeding the approved RPO. Auditors verify backup frequency by examining backup job schedules, job completion logs for the audit period, and data replication monitoring dashboards that show the replication lag at any given point in time.",
          "DR test planning must be rigorous to produce meaningful evidence. A DR test that declares success because the recovery environment started up without defining what 'success' means is not a useful test. Before the test, auditors expect to see: a defined test objective (e.g., 'achieve RTO of 2 hours from the moment of declared disaster'), specific success criteria (all critical application functions operational, data consistent to within 15 minutes of the simulated failure time), defined test scenarios (full site failure, not just individual component failure), and participation requirements (not just IT, but business stakeholders who will verify that restored systems are functionally adequate). After the test, the results must be documented against the pre-defined criteria, not just a narrative account of what happened.",
          "When DR test results show actual RTOs exceeding targets, the finding must be remediated before the next audit cycle — not explained away. Common excuses for missed RTO targets include: 'the test environment doesn't perfectly mirror production' (which means the test environment needs to be fixed), 'we ran into an unexpected configuration issue' (which means the configuration issue needs to be resolved), and 'we didn't have enough staff available for the test' (which means the DR plan assumes staffing levels that may not be available during an actual disaster). Each of these explanations identifies a gap that must be addressed in the DR plan and retested. The auditor's job is to ensure that the gap analysis produces a remediation plan with owners, timelines, and a retest commitment.",
          "Cloud environments have changed the DR landscape significantly, but not necessarily in the direction of lower risk. Cloud providers offer native DR capabilities — cross-region replication, automated failover, infrastructure-as-code that enables rapid environment rebuilding — that were prohibitively expensive in on-premises environments. But cloud DR introduces new failure modes: cloud provider outages can affect multiple regions simultaneously (as AWS us-east-1 outages have demonstrated), misconfigured cross-region replication can result in replication gaps that are not discovered until a failover is attempted, and cloud-native applications may have dependencies on region-specific services that are not available in the failover region. Auditors test cloud DR by reviewing the architecture for these failure modes and verifying that DR tests specifically test the failover, not just the replication.",
          "The BCP testing calendar is itself an audit artifact. Auditors review the BCP/DR testing schedule for the past three years and assess whether tests were conducted on schedule, whether test scenarios have varied (testing the same scenario repeatedly does not build comprehensive resilience), whether lessons learned from each test were documented and addressed, and whether the BCP was updated after each test to incorporate new information. A BCP that has not changed in three years despite multiple annual tests is suspicious — either the tests are revealing nothing (suggesting they are not sufficiently challenging), or the lessons learned are not being incorporated (suggesting the update process is broken).",
          "Crisis communication planning is an often-overlooked component of BCP/DR that auditors specifically test. When a disaster occurs, the organization must communicate with: employees (who may be unable to reach the office), customers (who are experiencing service disruptions), regulators (who have notification requirements that vary by incident type and jurisdiction), the media (when the incident is newsworthy), and vendors (whose assistance may be needed for recovery). Auditors verify that contact lists are current (not a three-year-old list with former employees' phone numbers), that communication templates have been pre-drafted for the most likely scenarios, that the communication escalation tree has been tested through the tabletop exercise, and that the communication plan accounts for scenarios where primary communication channels (email, internal phone systems) may themselves be unavailable.",
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
          "Hurricane Katrina made landfall on August 29, 2005, and within 24 hours had exposed systematic BCP/DR planning failures across New Orleans' financial sector. The failures were not failures of individual organizations to have DR plans — most had plans. The failures were in the assumptions underlying those plans. The dominant assumption was that a regional disaster would affect the primary site and leave the backup site intact. Katrina invalidated this assumption: both primary and backup data centers for multiple institutions were in the same flood plain. When the levees failed and flooding became citywide, both sites were inaccessible simultaneously.",
          "The geographic co-location problem was compounded by the physical access problem. Even institutions whose backup sites survived the storm intact could not access them because roads were flooded, staff were evacuated, and the power grid was down across the region. RTOs measured in hours became days and then weeks when the recovery process assumed that IT staff could physically reach the backup facility. Institutions with backup sites outside the affected region but no documented procedure for remote recovery — no runbooks for recovering systems without local staff presence — discovered that their recovery plans assumed physical presence that a regional disaster specifically precludes.",
          "The data loss at affected institutions varied based on backup practices. Institutions that maintained near-real-time replication to geographically separated sites recovered data with minimal loss. Institutions relying on tape backups stored at an offsite facility within the flood zone found their tapes inaccessible or damaged. Several community banks lost significant customer financial records — including loan documentation, transaction history, and account balances — because their backup media were stored in the same building as their primary systems or in a facility that experienced the same flooding.",
          "Federal banking regulators responded to Katrina with mandatory guidance that is now reflected in FDIC and OCC examination procedures. The guidance requires: primary and backup data center sites must be geographically separated and outside the same flood zone, seismic zone, or other regional hazard area; annual DR tests must include full failover to the backup site, not just component-level testing; BCPs must address extended outages of weeks rather than days, including staffing plans for operating from backup locations; and communication plans must include procedures for reaching staff who have been evacuated from the primary geographic area. Auditors now test compliance with this guidance explicitly, not as a best practice but as a regulatory requirement for covered institutions.",
          "The Katrina lessons have been reinforced by subsequent events: September 11 established the need for data center geographic separation in urban environments; Hurricane Sandy in 2012 tested — and mostly validated — the improvements made post-Katrina; COVID-19 in 2020 exposed BCP gaps in organizations that had never planned for scenarios requiring all staff to work remotely for extended periods. Each event adds a new dimension to BCP/DR requirements. Auditors who are testing against pre-Katrina assumptions are testing against an obsolete standard. The current standard requires that BCP/DR planning address not just technology recovery but human recovery — the ability to operate critical functions with staff working from dispersed locations for extended periods.",
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
        "RTO = maximum downtime; RPO = maximum data loss; MTD = absolute business survival limit — RTO must always be less than MTD",
        "Untested recovery plans are not controls — DR tests must actually fail over to backup systems and measure real RTOs against targets",
        "BIA currency is foundational — a stale BIA produces a BCP that does not reflect the current environment",
        "Geographic separation requires sites outside the same flood zone, seismic zone, and regional power grid segment",
        "Ransomware requires immutable or air-gapped backups — network-connected backups are encrypted by the same attack that encrypts production",
        "Annual DR tests must vary scenarios — testing the same scenario repeatedly does not build comprehensive resilience",
        "Tabletop exercises test human coordination and decision-making; full failover tests test the technology — both are required",
        "RPO drives backup frequency — a 15-minute RPO requires replication or backups running at least every 15 minutes",
        "DR test missed RTO is a finding that requires remediation and retest — explanations are not evidence",
        "Crisis communication planning must include procedures for scenarios where email and internal phone systems are unavailable",
      ],
      references: [
        { title: "NIST SP 800-34 — Contingency Planning Guide for IT Systems", url: "https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final" },
        { title: "ISACA BCP/DR Audit Program", url: "https://www.isaca.org/resources/isaca-journal" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-06-q1", type: "Core Idea", challenge: "Tested, not hoped.", text: "Why is an untested recovery plan not a real control?", options: ["A plan never tested is a hope — only tested recovery with documented results counts","Tests are optional","Plans never fail","Testing weakens the plan"], correctIndex: 0, explanation: "ISACA requires test evidence with results for a DR plan to be a control." },
        { id: "audit-06-q2", type: "RPO", challenge: "How much data loss.", text: "What does RPO (Recovery Point Objective) define?", options: ["The maximum data loss the business can accept — driving backup frequency","How fast the system restarts","The number of backups","The cost of recovery"], correctIndex: 0, explanation: "RPO sets the acceptable data-loss window, which drives backup cadence." },
        { id: "audit-06-q3", type: "RTO vs MTD", challenge: "Leave a buffer.", text: "Is an RTO of 2 hours acceptable when the Maximum Tolerable Downtime (MTD) is also 2 hours?", options: ["No — RTO must be less than MTD to leave margin for complications","Yes — equal is fine","Only if RPO is zero","Only for small systems"], correctIndex: 0, explanation: "RTO must be below MTD; equal leaves no buffer." },
        { id: "audit-06-q4", type: "Real Incident", challenge: "Katrina, 2005.", text: "What DR design flaw did Hurricane Katrina expose at New Orleans institutions?", options: ["Primary and backup data centers were in the same flood zone — both lost at once","Backups were encrypted too strongly","RTO was too short","They had too many sites"], correctIndex: 0, explanation: "Co-located primary and backup sites failed together." },
        { id: "audit-06-q5", type: "Finding", challenge: "Missed the target.", text: "A DR test shows actual RTO of 5h20m against a 4-hour target. The auditor's finding?", options: ["A HIGH finding — the plan doesn't meet its approved RTO; remediation required","No finding — close enough","A LOW finding only","Praise the team"], correctIndex: 0, explanation: "Missing the approved RTO is a high finding even if MTD isn't breached." },
        { id: "audit-06-q6", type: "Definition", challenge: "Time to restore.", text: "RTO (Recovery Time Objective) measures…", options: ["The target time to restore a system after disruption","Acceptable data loss","Backup storage size","The audit duration"], correctIndex: 0, explanation: "RTO is the restoration-time target; RPO is the data-loss target." },
        { id: "audit-06-q7", type: "Geographic Separation", challenge: "Don't co-locate.", text: "Why must primary and backup data centers be geographically separated?", options: ["So a single regional disaster can't take out both at once","To save money","To slow recovery","It's not required"], correctIndex: 0, explanation: "Separation prevents one event from destroying both sites — the Katrina lesson." },
        { id: "audit-06-q8", type: "Concept", challenge: "Evidence of recovery.", text: "What turns a DR plan into a control an auditor can rely on?", options: ["A successful test with documented results","A nicely formatted document","Management's verbal assurance","A large budget"], correctIndex: 0, explanation: "Documented successful tests are the evidence that makes it a control." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. RTO is the maximum tolerable downtime; RPO is the maximum tolerable data loss — both must be validated by actual tests, not documentation",
          "  2. A DR plan that has never been tested (or fails when tested) is not a control — it is a false assurance",
          "  3. The MTD (Maximum Tolerable Downtime) is the absolute business survival limit; RTO must always be less than MTD",
          "─────────────────────────────────────────────────────────────────────",
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
        "Incident Response (IR) program audits assess whether an organization can effectively detect, contain, eradicate, and recover from security incidents — and whether it can do so consistently, at scale, under the time pressure and operational confusion that real incidents create. ISACA auditors use NIST SP 800-61 (Computer Security Incident Handling Guide) as the primary framework, which defines four phases: Preparation, Detection and Analysis, Containment/Eradication/Recovery, and Post-Incident Activity. The audit evaluates all four phases because a program that excels at detection but cannot contain, or that contains effectively but learns nothing from incidents, is not a mature IR program.",
        "The Preparation phase is the most auditable and the most commonly deficient. Preparation controls include: an IR plan that is current (reviewed and updated within 12 months), documented roles and responsibilities with named individuals rather than job titles, contact lists that include not just internal staff but external parties (legal counsel, law enforcement liaison, forensic vendor, cyber insurance carrier, and public relations), a severity classification matrix that defines what constitutes a P1 versus a P4 incident, communication protocols that specify who is notified at each severity level, and tabletop exercises that have been conducted within the past 12 months with documented results and open action items tracked to closure.",
        "Detection and Analysis controls are tested through a combination of documentation review and technical examination. Auditors review the SIEM configuration to assess whether log sources cover the critical systems in scope, whether alert rules are calibrated to detect the organization's highest-priority threat scenarios, and whether false positive rates are managed (a SIEM generating thousands of alerts per day trains analysts to ignore alerts, which is worse than no SIEM). Auditors also review a sample of historical incidents and examine how they were detected: Was detection from the SIEM? From a vendor notification? From a user report? External notification (law enforcement, third party) suggests that internal detection capabilities are insufficient.",
        "The SEC's 2023 cybersecurity disclosure rules have made IR program maturity a public company governance issue. Under the rules, public companies must disclose material cybersecurity incidents within four business days of determining they are material. They must also disclose their cybersecurity risk management program, including how they assess, identify, and manage cybersecurity risks. This means the IR program is no longer just an internal security matter — it is a financial reporting disclosure requirement. Auditors testing IR programs at public companies now explicitly assess whether the materiality determination process is documented, whether the escalation path from the security team to legal and finance for materiality assessment is clear, and whether the four-day disclosure timeline is operationally achievable.",
        "Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) are the key quantitative metrics for IR program assessment. MTTD measures how long from the initial attacker activity to the organization's detection. MTTR measures how long from detection to containment. Industry benchmarks for these metrics vary by sector and threat type, but the IBM Cost of a Data Breach Report consistently shows that breaches detected and contained within 30 days cost significantly less than those with longer dwell times. For financial services, regulatory expectations typically require MTTD for high-severity incidents to be measured in hours, not days. An organization with a 78-day MTTD — like Equifax — has a fundamental IR program failure regardless of what its documentation says.",
        "Playbooks are the operational heart of an IR program. A playbook is a documented, step-by-step procedure for responding to a specific incident type. Mature IR programs maintain playbooks for at least the five most likely and highest-impact incident types: ransomware, data breach/exfiltration, insider threat, phishing with credential compromise, and DDoS. Each playbook specifies: detection indicators (what does this incident look like in the logs?), triage steps (how do we confirm this is the suspected incident type?), containment steps (what do we isolate and how?), eradication steps (how do we remove the threat?), recovery steps (how do we restore to normal operations?), communication steps (who is notified at each stage?), and evidence preservation steps (what do we collect and how do we preserve chain of custody?). Auditors test playbook adequacy by reviewing each playbook against these criteria and by testing whether IR team members can actually execute the playbook under tabletop conditions.",
        "Log retention is the evidentiary foundation of incident response. When an incident is detected, the IR team needs to answer: When did the attacker first enter the environment? What systems did they touch? What data did they access or exfiltrate? Answering these questions requires logs that go back far enough in time to cover the attacker's full dwell period. Industry guidance and regulatory requirements typically specify: 90 days of online log retention (immediately searchable), and 12 months of archived log retention. Equifax's detection failure was partly a log retention problem — the expired SSL inspection certificate meant that traffic was not logged in a form that would have detected the exfiltration. Even with adequate retention, logs that are not regularly reviewed or that have gaps due to misconfigured log shipping are not reliable forensic evidence. Auditors test log completeness by verifying that all in-scope systems are shipping logs to the SIEM and that there are no gaps in log delivery.",
      ],
      technical: {
        title: "IR Program Audit Checklist",
        body: [
          "Preparation phase testing covers the IR plan, roles, exercises, and tooling. For the IR plan: verify the plan has been reviewed within the past 12 months (check the document version history and the last approval date), verify the plan has been updated to reflect significant environmental changes (new cloud environments, new business acquisitions, new regulatory requirements), and verify the plan includes a ransomware-specific playbook if ransomware is in the organization's top threat scenarios. For roles: verify each role is assigned to a named individual, not just a job title, and that each named individual has confirmed their understanding of their responsibilities. For exercises: verify a tabletop exercise has been conducted within the past 12 months with a scenario relevant to the organization's current threat landscape, and that open action items from the exercise have been tracked and closed.",
          "Detection controls testing requires direct access to the SIEM environment or detailed documentation from the security operations team. Auditors assess: log source coverage (what percentage of in-scope systems are shipping logs to the SIEM?), alert rule coverage (does the SIEM have rules to detect the top priority threat scenarios?), alert response time (how quickly are SIEM alerts investigated? — pull a sample of P1 and P2 alerts and measure time from alert generation to analyst action), and false positive rate (an alert-to-incident ratio above 100:1 suggests alert tuning is inadequate and analysts may be experiencing alert fatigue). Log retention is tested by checking the SIEM retention configuration and verifying it matches the policy requirement.",
          "Containment capabilities testing examines the organization's ability to isolate a compromised system rapidly. For endpoint isolation, auditors verify that the EDR (Endpoint Detection and Response) platform can isolate a specific endpoint from the network with a single action and within a defined time target (typically under 5 minutes for a P1 incident). For network containment, auditors verify that network segmentation controls can be activated to block lateral movement and that firewall rule changes can be executed on an emergency basis. Cloud containment testing verifies that security groups and NACLs can be modified to isolate compromised cloud instances and that the process for doing so is documented in the cloud-specific IR playbook.",
          "Post-incident review (PIR) testing is the final phase of IR audit work. PIRs — also called lessons learned reviews — are conducted after each significant incident and periodically (at least annually) for lower-severity incidents. Auditors verify: PIRs were conducted for all P1 and P2 incidents in the past year, PIR documentation includes root cause analysis (not just a timeline of events), action items from PIRs have owners and due dates, and action items were actually completed — not just documented. Organizations that produce PIR reports but never implement the recommendations are running a documentation exercise, not a continuous improvement program. Auditors test PIR effectiveness by comparing recurring incident types across multiple PIRs: if the same root causes appear in multiple incidents, the PIR process is not driving remediation.",
          "IR metrics reporting to the board is an area of growing regulatory focus. The SEC's 2023 rules require public companies to disclose their cybersecurity risk management practices, which implicitly includes how the IR program is measured and whether performance is reported to the board. Auditors test whether the CISO or equivalent presents IR metrics to the board or board committee at least quarterly, whether those metrics include MTTD and MTTR trends, whether the metrics show incident volume by type and severity, and whether the board receives information about near-misses (incidents that were narrowly prevented) as well as realized incidents. Near-miss reporting is a leading indicator of IR program effectiveness that is frequently absent from board-level reporting.",
          "Cyber insurance and IR program alignment is an emerging area of audit focus. Cyber insurance policies typically have notification requirements — the insurer must be notified within a specified timeframe (often 72 hours or less) of discovering a covered incident. IR plans that do not include the cyber insurance carrier in the notification tree may delay notification and create coverage disputes. Auditors verify that the IR plan includes the cyber insurance carrier's incident hotline number, that the definition of a 'covered incident' under the policy is understood by the IR team, and that the notification timeline requirement is incorporated into the IR plan's escalation procedures. A covered incident that is not reported to the insurer within the required window can result in denial of coverage — a potentially catastrophic financial consequence for an event that is already highly costly.",
          "Regulatory notification requirements create hard deadlines that IR programs must be designed to meet. GDPR requires notification to the supervisory authority within 72 hours of becoming aware of a personal data breach. The SEC's 2023 rules require public companies to file an 8-K within four business days of determining a cybersecurity incident is material. State breach notification laws vary by jurisdiction but many require notification to affected individuals within 30–60 days of discovery. HIPAA requires notification to HHS within 60 days of discovery for breaches affecting 500 or more individuals. Auditors verify that IR plans include notification decision trees for all applicable jurisdictions and regulations, that the legal team is incorporated into the IR escalation path early enough to assess notification obligations, and that the organization has documented examples of applying the notification decision tree in prior incidents.",
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
          "The Equifax breach began on May 13, 2017, when attackers exploited a known Apache Struts vulnerability (CVE-2017-5638) in an Equifax consumer dispute portal. The vulnerability had been publicly disclosed and patched two months earlier, in March 2017. Equifax had not applied the patch. The attackers maintained access for 78 days — from May 13 to July 29, 2017 — during which they exfiltrated approximately 147 million Americans' personal information, including Social Security numbers, birth dates, addresses, and in some cases driver's license and credit card numbers. Equifax did not detect the breach until July 29, nearly three months after it began.",
          "The detection failure had a specific, auditable cause: an SSL inspection certificate in Equifax's traffic monitoring infrastructure had expired 19 months before the breach, in January 2016. SSL inspection tools decrypt, inspect, and re-encrypt HTTPS traffic to detect malicious activity within encrypted connections. With the certificate expired, the tool was no longer performing this inspection — encrypted traffic was passing through uninspected. The exfiltration traffic was HTTPS-encrypted. The monitoring tool that should have detected it was broken. No one had noticed that the certificate was expired, that the inspection had stopped, or that the monitoring tool was generating no alerts on the traffic it was now ignoring.",
          "The IR program failure was threefold. First, the preparation failure: the monitoring tool's expired certificate represented a detection control failure that should have been caught by a control monitoring process — certificate expiration monitoring, periodic monitoring effectiveness reviews, or a compensating control audit. None of these existed in functioning form. Second, the detection failure: the 78-day dwell time reflects not just the SSL inspection gap but the absence of compensating detective controls that would have identified the data exfiltration through other means — data volume anomalies, destination IP analysis, user and entity behavior analytics. Third, the response failure: once the breach was detected, Equifax's initial public disclosure was confused and technically inaccurate, suggesting that the IR plan's crisis communication component had not been adequately prepared or exercised.",
          "The regulatory and financial consequences were severe and multi-jurisdictional. The FTC/CFPB/states settlement reached $575 million, with up to $425 million going to consumer restitution. The UK's Information Commissioner's Office fined Equifax £500,000 — the maximum under pre-GDPR rules. Canada's PIPEDA investigation found multiple violations. The CISO retired within days of the breach disclosure. The CEO resigned at the beginning of the subsequent congressional hearing. The breach ultimately cost Equifax over $1.7 billion in direct costs, legal fees, and technology remediation.",
          "For IR program auditors, the Equifax case generates a specific testing requirement: are all detection controls actively monitored for their own health? A security tool that fails silently — that stops performing its function without generating an alert about its own failure — is worse than no tool, because it creates a false sense of security. Auditors now specifically test whether monitoring tools (SIEM, IDS/IPS, DLP, SSL inspection, EDR) have health monitoring that alerts when they stop ingesting data, when they stop generating alerts, or when critical certificates expire. This meta-monitoring — monitoring the monitors — is a direct lesson from Equifax and is now included in CISA curriculum as a specific IR program maturity indicator.",
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
        "Four IR phases: Preparation, Detection and Analysis, Containment/Eradication/Recovery, Post-Incident — all must be documented and exercised",
        "Tabletop exercise required annually at minimum — full simulation preferred; both test different aspects of IR readiness",
        "MTTD and MTTR are the key IR metrics — Equifax's 78-day MTTD is the benchmark for what failure looks like",
        "Detection tools must be health-monitored — a tool that fails silently is worse than no tool",
        "Playbooks are required for at least the top 5 threat scenarios; ransomware and data breach are universal requirements",
        "SEC 2023 rules require 4-day disclosure of material incidents — materiality determination process must be pre-defined",
        "GDPR requires 72-hour supervisory authority notification — notification decision tree must be in the IR plan",
        "Log retention: 90 days online + 12 months archived — gaps in log coverage are forensic evidence gaps",
        "Post-incident reviews must drive remediation — recurring root causes across PIRs signal a broken improvement process",
        "Cyber insurance carrier notification requirements must be in the IR escalation tree — missed notification can void coverage",
      ],
      references: [
        { title: "NIST SP 800-61 Rev 2 — Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
        { title: "CISA Incident Response Resources", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/information-sharing-and-awareness" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-07-q1", type: "Core Idea", challenge: "Exercised, not filed.", text: "Why is an IR plan that was never exercised not a real control?", options: ["An untested plan sitting in a folder won't work under pressure — exercises make it a control","Plans never need testing","It's a control if it's long","Filing it is enough"], correctIndex: 0, explanation: "An incident response plan must be exercised to count as effective." },
        { id: "audit-07-q2", type: "NIST 800-61", challenge: "Most auditable phase.", text: "Which NIST SP 800-61 IR phase is most auditable?", options: ["Preparation — plans, role assignments, tabletop records, contact lists are verifiable","Eradication","Recovery","There are no phases"], correctIndex: 0, explanation: "Preparation produces the most documentary evidence to verify." },
        { id: "audit-07-q3", type: "Real Incident", challenge: "Equifax, 2017.", text: "Why did Equifax fail to detect the breach for 76 days?", options: ["Its SSL inspection tool's certificate had been expired for 19 months","Attackers used an undetectable zero-day","There was no internet","Staff were on holiday"], correctIndex: 0, explanation: "An expired cert blinded monitoring — a control failure, not a novel exploit." },
        { id: "audit-07-q4", type: "Plan Currency", challenge: "Stale and overdue.", text: "An IR plan last updated 21 months ago with 3 overdue tabletop action items rates as…", options: ["INEFFECTIVE — currency and follow-through both failed","EFFECTIVE","Not auditable","LOW risk only"], correctIndex: 0, explanation: "Annual update and action-item follow-through are both requirements." },
        { id: "audit-07-q5", type: "Metric", challenge: "Detect speed.", text: "What does Mean Time to Detect (MTTD) measure?", options: ["Time from when the incident occurred to when it was detected","Time to write the report","Time to recover","Time between audits"], correctIndex: 0, explanation: "MTTD is the incident-occurrence-to-detection interval." },
        { id: "audit-07-q6", type: "Playbooks", challenge: "Cover the threats.", text: "Is it acceptable to have no ransomware playbook if the org has never had a ransomware incident?", options: ["No — playbooks must cover the primary threat landscape regardless of past incidents","Yes — only after an incident","Only for large firms","Playbooks aren't needed"], correctIndex: 0, explanation: "Absence of a relevant playbook is itself a finding." },
        { id: "audit-07-q7", type: "Concept", challenge: "Monitoring upkeep.", text: "The Equifax detection failure shows that security tools…", options: ["Must be maintained (e.g., cert renewals) or they silently stop working","Never need maintenance","Are always reliable","Should be disabled"], correctIndex: 0, explanation: "An unmaintained tool is a decorative checkbox, not a control." },
        { id: "audit-07-q8", type: "Framework", challenge: "The standard.", text: "NIST SP 800-61 is the standard framework for…", options: ["Computer security incident handling","Password complexity","Network cabling","Tax filing"], correctIndex: 0, explanation: "800-61 defines the incident-handling lifecycle and phases." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. NIST SP 800-61 four phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, Post-Incident — all must be documented and tested",
          "  2. An IR plan not reviewed after major incidents (like the Colonial Pipeline TTX findings here) fails the currency requirement",
          "  3. Open tabletop action items signal the organization cannot execute its own IR plan — the Equifax 78-day dwell time started with exactly this gap",
          "─────────────────────────────────────────────────────────────────────",
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
        "Vendor and third-party risk management (TPRM) audits verify that an organization maintains appropriate oversight of every vendor, supplier, and partner that accesses its systems, processes its data, or operates components of its IT infrastructure. ISACA defines this as part of the APO10 (Managed Vendors) control objective in COBIT 2019, and it is one of the fastest-growing areas of regulatory scrutiny globally. The fundamental premise of TPRM is simple but operationally complex: your security posture is a product of your controls and your vendors' controls. A breach of your vendor is a breach of you — your data leaves through their door.",
        "The TPRM lifecycle has five stages that auditors evaluate sequentially. The first stage is inventory: the organization must know every vendor it engages, including shadow IT vendors (SaaS tools purchased with credit cards outside the IT procurement process) and subcontractors engaged by primary vendors. Organizations consistently underestimate their vendor count — a mature enterprise typically has hundreds of vendor relationships, and the shadow IT count alone can exceed the managed vendor count. Inventory completeness is tested by comparing the vendor register against accounts payable records, IT asset inventories, network traffic logs, and user-reported SaaS applications.",
        "The second stage is classification — tiering vendors by the risk they represent. Risk tiering is based on: the sensitivity of data the vendor accesses or processes, the criticality of the systems or processes the vendor supports, the organization's dependency on the vendor (can the vendor be replaced quickly if it fails?), the vendor's regulatory status (is the vendor itself regulated and therefore subject to independent oversight?), and the vendor's history of security incidents. Tier 1 (Critical) vendors represent existential risk — a breach or failure would severely disrupt operations or result in major data loss. Tier 2 (High) vendors process business data or have network connectivity. Tier 3 (Low/Minimal) vendors have no system access and represent commodity relationships.",
        "The third stage is assessment — evaluating the security controls of each vendor against the risk represented by the relationship. Tier 1 vendors require the most rigorous assessment: typically a combination of questionnaire (a standardized set such as the SIG — Standardized Information Gathering questionnaire), review of the vendor's SOC 2 Type II report (which provides independent auditor attestation of the vendor's controls over a period of time), penetration test results, vulnerability scan results, and — for the highest-risk vendors — on-site assessment by the organization's own security team or a qualified third party. Questionnaire-only assessments are insufficient for Tier 1 vendors because they rely entirely on vendor self-reporting.",
        "The fourth stage is contractual requirements — ensuring that vendor contracts include the security obligations and audit rights necessary to manage the risk of the relationship. Key contractual provisions auditors verify include: security requirements (specific controls the vendor must maintain), data protection requirements (encryption, access controls, data handling), breach notification timeline (GDPR requires 72 hours from discovery; many organizations require notification within 24 hours), right to audit (the organization's contractual right to conduct security assessments of the vendor), data return and destruction (at relationship termination, all data must be returned or certified destroyed), and subcontractor restrictions (vendor must obtain approval before engaging subcontractors who will handle the organization's data).",
        "The fifth stage is ongoing monitoring — maintaining visibility into vendor security posture between formal annual assessments. For Tier 1 vendors, monitoring typically includes: continuous monitoring through security ratings services (BitSight, SecurityScorecard, RiskRecon), tracking of security-relevant news (vendor breaches, regulatory actions, leadership changes), quarterly access reviews verifying that vendor personnel with system access have current authorization, and review of vendor-provided security metrics (incident rates, patch compliance, vulnerability remediation times). For Tier 2 vendors, monitoring is less intensive but still includes annual reassessment and tracking of significant security events. For Tier 3 vendors, monitoring may be limited to contract renewal review.",
        "Fourth-party risk — the risk created by your vendor's vendors — is the most challenging dimension of TPRM and the dimension most frequently exposed by supply chain attacks. SolarWinds succeeded in part because affected organizations had not mapped the fact that their Orion instance had broad network visibility, and had not assessed what would happen if Orion itself were compromised. Managing fourth-party risk requires understanding not just your vendor's security controls but your vendor's key dependencies: what cloud providers do they use? What software libraries do they depend on? What subcontractors handle your data? Organizations that have not answered these questions for their Tier 1 vendors have a TPRM gap that attackers have demonstrated they will exploit.",
      ],
      technical: {
        title: "Vendor Tiering and Assessment Requirements",
        body: [
          "Tier 1 vendor assessment requirements reflect the highest level of due diligence. Annual SOC 2 Type II reports (not Type I — Type I attests only to the design of controls, not their operating effectiveness over time) must be reviewed within 60 days of receipt, and any exceptions noted in the report must be followed up with the vendor for remediation status. The SOC 2 report scope must be verified to include the services being rendered — a SOC 2 report for a vendor's data center does not cover the vendor's SaaS application if they are separately scoped. Penetration test results from the past 12 months must be reviewed, and critical or high-severity findings must have remediation evidence. The vendor's vulnerability management program must demonstrate patch compliance within 30 days for critical CVEs on internet-facing systems.",
          "Tier 1 contractual requirements go beyond standard commercial terms. The contract must explicitly include the right to audit — meaning the organization can conduct or commission a security assessment of the vendor at any time with reasonable notice. The right to audit clause should specify: who may conduct the assessment (the organization's staff, or a named third party), what systems and facilities are in scope, how much advance notice is required, and how findings will be remediated. Contracts without right-to-audit clauses are a TPRM finding — they eliminate the organization's ability to independently verify the vendor's security representations. This is particularly critical when the vendor handles sensitive personal data or supports critical systems.",
          "Vendor access management is a TPRM control that directly interfaces with the organization's own access control program. Vendor personnel with system access must be subject to the same access control requirements as the organization's own employees: documented access requests with business justification, least privilege, named individuals rather than shared accounts, MFA, and regular access reviews. When a vendor engagement ends, vendor access must be deprovisioned immediately — vendor accounts should be tied to active contract status, and the offboarding process must include both HR deprovisioning (removing vendor personnel from the vendor register) and IT deprovisioning (disabling their access accounts). Access that persists after a vendor engagement ends is both an access control finding and a TPRM finding.",
          "Vendor concentration risk is an aggregate risk that TPRM programs must assess beyond individual vendor relationships. If an organization uses three different SaaS vendors that all run on AWS us-east-1, an AWS regional outage creates a single point of failure that affects all three vendors simultaneously — even if each vendor individually has adequate redundancy for normal failure scenarios. Auditors test concentration risk by mapping the top ten critical vendors against their underlying infrastructure providers and identifying concentration points. Organizations with significant AWS, Azure, or Azure concentration in their critical vendor population should have this concentration reflected in their BCP/DR planning.",
          "Vendor termination procedures are a TPRM control that organizations systematically neglect. When a vendor relationship ends — whether through contract expiration, vendor financial failure, or the organization's decision to insource or switch vendors — multiple security actions must occur: vendor access accounts must be deprovisioned within 24 hours for privileged access and within 5 business days for standard access; all organization data held by the vendor must be returned in a usable format or certified destroyed; vendor-provided equipment must be returned and wiped; and vendor personnel must be removed from any distribution lists, emergency contact rosters, or security notification programs. Auditors test termination procedures by reviewing a sample of vendor relationships that ended during the audit period and verifying that each step was completed with documentation.",
          "The vendor risk assessment questionnaire — often the SIG (Standardized Information Gathering) or a proprietary equivalent — must be evaluated critically, not accepted at face value. Vendor questionnaire responses are self-reported; they represent what the vendor says about their controls, not necessarily what their controls actually are. Auditors train organizations to look for inconsistencies in questionnaire responses: a vendor claiming comprehensive patch management but also reporting significant numbers of unpatched critical vulnerabilities in their security ratings score is providing inconsistent information. Organizations should use security ratings platforms to cross-reference questionnaire responses against externally observable security indicators (open ports, certificate issues, breach history, dark web exposure).",
          "TPRM program governance requires executive sponsorship and cross-functional collaboration. The TPRM program must have a named owner (typically the CISO or Chief Risk Officer), an executive-level steering committee that reviews the vendor risk profile quarterly, and a defined escalation path for vendor risk items that exceed the organization's risk appetite. Procurement must be required to route all vendor onboardings through the TPRM process before contracts are signed — shadow IT and unauthorized vendor onboardings represent the most common TPRM program failure, because the risk is introduced before any assessment can occur. Auditors test TPRM governance by reviewing the TPRM policy, the vendor onboarding workflow, and the escalation records for the past year to verify the program is functioning as a genuine risk management control rather than a documentation exercise.",
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
          "The SolarWinds attack, disclosed in December 2020, was the most consequential supply chain attack in history at the time of its discovery. Between October 2019 and June 2020, attackers believed to be associated with the Russian SVR intelligence service compromised SolarWinds' software build pipeline and inserted malicious code — later named SUNBURST — into the Orion IT monitoring software. The malicious code was digitally signed with SolarWinds' legitimate code-signing certificate and distributed to approximately 18,000 organizations that installed the Orion update. Among those organizations were nine US federal agencies, including the Treasury Department, State Department, and parts of the Department of Homeland Security.",
          "The TPRM failure was systemic across affected organizations. SolarWinds Orion is IT monitoring software — it requires broad network visibility to do its job. Orion agents are installed on servers, network devices, and workstations throughout the monitored environment. In effect, a compromised Orion instance has visibility into the entire IT environment of its customers. Organizations that had not classified SolarWinds as a Tier 1 critical vendor had no enhanced monitoring of Orion's network activity. They were running a highly privileged software package from a third-party vendor without the scrutiny that the access level warranted. The risk was not in the sensitivity of data SolarWinds itself handled — it was in the access Orion had to the customer's own environment.",
          "Post-incident analysis by CISA, Microsoft, and FireEye revealed that the SUNBURST malware was sophisticated enough to evade many detection methods. It lay dormant for two weeks after installation before activating, performed careful reconnaissance to avoid security research sandboxes and networks, used legitimate Orion API calls to blend its traffic with normal Orion behavior, and communicated through legitimate cloud services to blend with normal cloud traffic. Detecting SUNBURST required behavioral analysis — looking for anomalies in Orion's network behavior — not signature-based detection. Organizations with UEBA that basellined Orion's normal traffic patterns would have had a better chance of detecting the anomaly. Most did not.",
          "The regulatory response to SolarWinds accelerated software supply chain security requirements significantly. President Biden's Executive Order 14028 (May 2021) required federal agencies to adopt Software Bill of Materials (SBOM) requirements, enhance software supply chain security in federal procurement, and deploy zero-trust architecture. NIST SP 800-161 Rev 1, updated in 2022, provides comprehensive guidance on cybersecurity supply chain risk management. CISA established the Information and Communications Technology Supply Chain Risk Management Task Force to develop cross-sector guidance. For auditors, these requirements translate into new testing areas: does the organization maintain SBOMs for critical software? Does procurement require software vendors to provide SBOMs? Does the TPRM program assess vendor software development practices, not just vendor operational security?",
          "For practicing auditors, SolarWinds generates a specific and consequential testing question: for each Tier 1 vendor, has the organization assessed not just the vendor's security but the access level that the vendor's software or personnel have to the organization's environment? A vendor's SOC 2 Type II report attests to the security of the vendor's own environment — it does not attest to whether the vendor's software is performing only its intended function within the customer's environment. Organizations must supplement traditional TPRM assessments with monitoring of vendor software behavior: network traffic analysis showing what Orion (or equivalent) is actually talking to, endpoint monitoring showing what processes vendor software is spawning, and integrity monitoring confirming that vendor software binaries match their expected cryptographic signatures. The lesson of SolarWinds is that the most dangerous attack surface is the trusted relationship — and trust must be continuously verified, not granted once and assumed.",
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
        "Vendor inventory completeness is the foundation — shadow IT vendors not in the register cannot be managed",
        "Tier 1 critical vendors require SOC 2 Type II (not Type I), right-to-audit clauses, and continuous monitoring",
        "Questionnaire-only assessments are insufficient for Tier 1 vendors — independent attestation is required",
        "Vendor access must be deprovisioned immediately at relationship end — vendor accounts tied to active contracts",
        "Fourth-party risk requires mapping your vendors' key infrastructure dependencies — SolarWinds succeeded by exploiting trusted software",
        "Concentration risk: multiple Tier 1 vendors on the same cloud region create a single point of failure",
        "Software supply chain risk requires SBOM assessment and behavioral monitoring of vendor software in your environment",
        "Right-to-audit clauses must specify scope, notice requirements, and remediation obligations — vague clauses are unenforceable",
        "Breach notification requirements (72 hours for GDPR, 24 hours internal best practice) must be in vendor contracts",
        "Shadow IT creates unmanaged vendor relationships — procurement must route all vendor onboardings through TPRM before contract signing",
      ],
      references: [
        { title: "CISA Supply Chain Risk Management Resources", url: "https://www.cisa.gov/supply-chain-risk-management" },
        { title: "NIST SP 800-161 — Cybersecurity Supply Chain Risk Management", url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-08-q1", type: "Core Idea", challenge: "Weakest vendor.", text: "What is the core supply-chain risk principle?", options: ["Your security is only as strong as the weakest vendor with access to your systems","Vendors are always safe","Only internal staff are risks","Vendors need no review"], correctIndex: 0, explanation: "Third-party access extends your attack surface." },
        { id: "audit-08-q2", type: "Vendor Tiering", challenge: "Tier 1 vs Tier 2.", text: "What distinguishes a Tier 1 (Critical) vendor?", options: ["Access to sensitive data/critical systems, often single-source, needing the highest assessment frequency","It's the cheapest vendor","It has no system access","It's a new vendor"], correctIndex: 0, explanation: "Tier 1 vendors carry the most risk and need the most scrutiny." },
        { id: "audit-08-q3", type: "Assessment Depth", challenge: "Beyond a questionnaire.", text: "Is a questionnaire-only assessment enough for a Tier 1 vendor with admin access?", options: ["No — Tier 1 needs SOC 2 Type II (or equivalent) plus contractual right-to-audit","Yes — a questionnaire suffices","Only a phone call is needed","No assessment is needed"], correctIndex: 0, explanation: "Critical vendors require evidence-based assurance, not self-reported forms." },
        { id: "audit-08-q4", type: "Real Incident", challenge: "SolarWinds, 2020.", text: "Why did the SolarWinds supply-chain attack succeed at so many orgs?", options: ["They failed to classify SolarWinds as a critical vendor needing enhanced monitoring","SolarWinds had no customers","It was an insider","It used a zero-day in browsers"], correctIndex: 0, explanation: "Trusted vendor software wasn't monitored as the critical dependency it was." },
        { id: "audit-08-q5", type: "Lapsed Assessment", challenge: "Past due.", text: "What's required when a Tier 1 vendor's annual assessment lapses beyond 365 days?", options: ["Suspend the vendor's access until a current assessment is completed","Wait until next quarter","Nothing","Give them a discount"], correctIndex: 0, explanation: "Continued access with a lapsed assessment is an unmitigated risk." },
        { id: "audit-08-q6", type: "Offboarding", challenge: "When the deal ends.", text: "When must a vendor's access be deprovisioned?", options: ["When the relationship ends — not at the next scheduled review","At the next quarterly review","Never","Only if they ask"], correctIndex: 0, explanation: "Access must be removed at relationship end, immediately." },
        { id: "audit-08-q7", type: "Monitoring", challenge: "Watch the software.", text: "A lesson from SolarWinds for critical vendors is to…", options: ["Monitor the vendor's software network activity, not just trust its updates","Auto-install all updates blindly","Avoid all vendors","Disable logging"], correctIndex: 0, explanation: "Enhanced monitoring of trusted software can catch supply-chain compromise." },
        { id: "audit-08-q8", type: "Concept", challenge: "Trust boundary.", text: "Why are vendors with system access in audit scope?", options: ["Their access and security posture directly affect your risk","They pay you","They're outside your control entirely","Auditors like paperwork"], correctIndex: 0, explanation: "Vendor risk is your risk when they can touch your systems." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Tier 1 (Critical) vendors require annual SOC 2 Type II reports AND contractual right-to-audit — questionnaires alone are insufficient",
          "  2. Vendor access must be suspended when the assessment lapses — continued access without current assessment is an unmitigated risk",
          "  3. Fourth-party risk: you must also assess your vendor's vendors; SolarWinds (2020) succeeded because affected orgs didn't classify it as critical",
          "─────────────────────────────────────────────────────────────────────",
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
        "Data privacy audits assess whether an organization collects, processes, retains, and deletes personal data in accordance with applicable privacy regulations — primarily GDPR in Europe, CCPA in California, and sector-specific regulations including HIPAA (healthcare), GLBA (financial services), and COPPA (children's data). ISACA's privacy framework maps directly to GDPR's six lawful bases for processing and eight data subject rights, providing auditors with a structured methodology for evaluating privacy controls that is applicable across jurisdictional frameworks. Privacy audits are no longer niche compliance exercises — they are mainstream IT audit activities with significant financial stakes, given GDPR's maximum fine of €20 million or 4% of global annual turnover, whichever is higher.",
        "The audit scope for a comprehensive privacy audit covers seven domains. Data mapping — what personal data is held, where it is stored, how it flows between systems, who has access, and what is the documented legal basis for processing — is the foundation. Without accurate data mapping, no other privacy control can be effectively designed or tested. Consent mechanisms — how the organization obtains, records, and manages consent where consent is the lawful basis — must be testable and auditable. Data subject rights fulfillment — the operational processes for responding to deletion, access, portability, rectification, and objection requests within the required timeframes — must function reliably at scale. Data retention and deletion schedules must be documented, implemented in systems, and enforced automatically or through regular manual review.",
        "Common findings in privacy audits reflect the gap between policy intent and operational reality. Personal data retained beyond the documented retention period is the most prevalent finding — organizations document retention schedules but do not implement automated deletion or conduct regular deletion reviews. Processing activities without a documented lawful basis under GDPR Article 6 occur when new processing activities (analytics, marketing automation, new data sharing arrangements) are implemented without a privacy impact assessment or legal basis analysis. Data subject access requests (DSARs) not fulfilled within the required 30-day window occur when DSAR processes are manual, undocumented, or rely on individuals who are not trained or equipped to handle them. DPIA (Data Protection Impact Assessment) gaps occur when high-risk processing activities (large-scale profiling, systematic monitoring, processing of sensitive categories) are implemented without the required DPIA.",
        "The Data Protection Officer (DPO) is a GDPR requirement for organizations that conduct large-scale processing of special categories of data, conduct large-scale systematic monitoring of individuals, or are public authorities. Auditors verify that the DPO role exists if required, that the DPO has adequate independence (not reporting to someone whose processing activities they must oversee), that the DPO has sufficient resources and expertise, and that the DPO is involved in all matters relating to personal data protection. When the DPO role is combined with conflicting responsibilities — for example, when the CISO is also designated as DPO — auditors assess whether the dual role creates conflicts of interest that undermine the DPO's independence.",
        "Data mapping is the technical foundation of privacy compliance and the first thing auditors request. A data map — also called a Record of Processing Activities (RoPA) under GDPR Article 30 — must document: the name and contact details of the controller and DPO, the purposes of processing, the categories of data subjects, the categories of personal data, the recipients (including international transfers), retention periods, and a general description of security measures. The RoPA must be current — data flows change when new systems are deployed, new business processes are implemented, or new vendors are engaged. Auditors test RoPA currency by comparing it against recent system deployments, new vendor onboardings, and data flow diagrams maintained by IT architecture, identifying data flows that exist in the environment but are not in the RoPA.",
        "International data transfers require specific legal mechanisms under GDPR. Transfers of personal data outside the European Economic Area (EEA) to countries without an adequacy decision require one of: Standard Contractual Clauses (SCCs, updated in 2021), Binding Corporate Rules (BCRs), or an approved certification scheme. The invalidation of Privacy Shield in 2020 (Schrems II) and subsequent court challenges have created a complex legal landscape for US-EU data transfers. Auditors verify that organizations have identified all EEA-to-US data flows, have implemented valid transfer mechanisms, and have conducted Transfer Impact Assessments (TIAs) where required — assessing whether the destination country's laws provide adequate protection equivalent to GDPR.",
        "Privacy by Design is the principle that privacy controls should be built into systems from the beginning rather than added as compliance afterthoughts. Auditors test Privacy by Design implementation by reviewing the SDLC process: Is privacy review a mandatory checkpoint before production deployment of systems that process personal data? Are privacy-enhancing technologies (data minimization, pseudonymization, encryption) considered during system design? Is the default setting for data collection opt-in rather than opt-out (data minimization at the collection layer)? Are retention periods configured in the system at deployment rather than applied manually after data accumulates? Organizations that consistently discover privacy violations in existing systems rather than preventing them through design have a Privacy by Design gap that manifests as recurring audit findings.",
      ],
      technical: {
        title: "GDPR Key Requirements for Auditors",
        body: [
          "Article 5's seven principles are the auditor's testing framework for data processing activities. Lawfulness, fairness, and transparency requires that data subjects know their data is being collected and how it will be used — auditors test this through review of privacy notices, consent mechanisms, and data collection practices. Purpose limitation requires that data collected for one purpose is not subsequently used for incompatible purposes — auditors test by examining how data flows between systems and whether new uses have been assessed for compatibility with the original collection purpose. Data minimization requires that only data necessary for the stated purpose is collected — auditors test by comparing data fields collected against the documented purpose and flagging fields that cannot be justified.",
          "Storage limitation under Article 5(1)(e) is the principle that generates the most common GDPR audit findings. Organizations must not keep personal data for longer than is necessary for the purpose for which it was collected. This requires: a documented retention schedule specifying the retention period for each data category and the legal basis for that period; automated deletion or archival mechanisms that enforce the schedule; regular review of data stores to identify data approaching or exceeding retention limits; and procedures for handling data that must be retained beyond the standard period for legal hold or regulatory compliance reasons. Auditors test storage limitation by running SQL queries against personal data tables to identify records older than the documented retention period.",
          "Article 17 (right to erasure, commonly called the right to be forgotten) is one of the most operationally complex GDPR requirements. When a data subject requests deletion of their data, the organization must: delete the data from all primary systems, delete from backup systems that are routinely accessed (note: data in archived backups that are not routinely accessed may be exempt, but the organization must document this), delete from any downstream systems the data was shared with, and confirm deletion to the data subject within 30 days. The operational challenge is that personal data is rarely in a single system — customer records typically appear in CRM, marketing automation, analytics platforms, data warehouses, billing systems, support ticketing systems, and potentially dozens of other places. Auditors test right-to-erasure compliance by tracing sample deletion requests through each of these systems and verifying deletion evidence.",
          "Data Protection Impact Assessments (DPIAs) are mandatory under GDPR Article 35 for processing activities that are 'likely to result in a high risk to the rights and freedoms of natural persons.' The EDPB (European Data Protection Board) guidance identifies specific processing types that always require a DPIA: systematic and extensive evaluation of personal aspects using automated processing, large-scale processing of special categories of data, and systematic monitoring of publicly accessible areas. Auditors test DPIA compliance by reviewing the organization's list of processing activities against DPIA triggers, identifying activities that meet the threshold, and verifying that a DPIA was conducted before each such activity began. DPIAs conducted after processing has begun are findings — the assessment must occur before the risk materializes.",
          "Consent management is a complex area of GDPR audit work. For processing activities where consent is the lawful basis, the consent must be: freely given (no bundling with service acceptance or power imbalance), specific (separate consent for each distinct purpose), informed (clear explanation of what data, for what purpose, by whom), and unambiguous (affirmative action, not pre-ticked boxes). Consent must be as easy to withdraw as to give. Auditors test consent mechanisms by reviewing consent collection interfaces, examining the consent database to verify consent records include all required elements, testing the withdrawal mechanism, and verifying that data processing actually stops when consent is withdrawn. The most common consent finding is consent that is bundled with terms of service acceptance — a practice explicitly prohibited by GDPR.",
          "Breach notification compliance testing examines whether the organization can meet GDPR's 72-hour notification requirement to the supervisory authority. The clock starts running from when the organization 'becomes aware' of a breach — a legally significant moment that must be clearly defined in the IR plan. Auditors review the breach notification process by examining: how the organization defines 'becoming aware' of a breach, the escalation path from initial detection to DPO notification to supervisory authority notification, template notifications pre-prepared for common breach scenarios, and examples of breach notifications from the past year (if any occurred). The 72-hour window includes weekends and holidays — organizations that route all security incidents through a 9-to-5 team have a structural gap in their GDPR breach notification capability.",
          "Cross-border data transfer compliance has become one of the most technically and legally complex areas of GDPR audit work following the Schrems II decision. Auditors must understand the full picture of where personal data flows: Are analytics tools (Google Analytics, Adobe Analytics) sending EEA data to US servers? Are cloud infrastructure providers processing EEA personal data in US regions? Are enterprise software vendors (Salesforce, Workday, ServiceNow) processing EEA data in their US infrastructure? For each data flow, auditors verify: the transfer mechanism in use (SCCs are the most common post-Schrems II), whether a Transfer Impact Assessment has been conducted, and whether supplementary measures (encryption where the US company cannot access the data, pseudonymization before transfer) are in place where required by the TIA.",
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
          "The Irish Data Protection Commission's (DPC) May 2023 decision against Meta Platforms Ireland imposed a €1.2 billion fine — the largest in GDPR history — for transferring European users' personal data to US servers without an adequate legal basis. The legal basis failure stemmed from a sequence of legal developments: the original EU-US Privacy Shield framework was invalidated by the Court of Justice of the European Union in July 2020 (Schrems II). After Schrems II, Meta relied on Standard Contractual Clauses (SCCs) for its EU-to-US Facebook data transfers. The DPC concluded that the SCCs were insufficient given the surveillance laws applicable to data processed in the United States, and that Meta had failed to implement effective supplementary measures to address the shortfall.",
          "The audit trail in the Meta case was exceptionally clear — a rare situation in data protection enforcement where the facts were largely undisputed and the question was purely legal. Meta knew it was transferring EEA personal data to US servers. Meta knew Privacy Shield had been invalidated. Meta continued the transfers. Meta's legal analysis concluded that SCCs were sufficient; the DPC concluded they were not. From an audit perspective, the lesson is not that Meta failed to document its legal basis — it did document it. The lesson is that documented legal bases must be valid, and the validity of the basis must be assessed against current law, not historical assumptions. Privacy auditors must evaluate not just whether a legal basis is documented but whether it is currently sound.",
          "The Meta fine highlighted the practical challenge of GDPR compliance for global technology companies whose business models depend on processing personal data at scale. Meta processes billions of users' personal data across thousands of systems. Mapping all EEA-origin personal data flows to identify international transfers, assessing the adequacy of each transfer mechanism against current legal standards, and implementing supplementary measures where standard mechanisms are insufficient is an enormous operational undertaking. Organizations that have not invested in this mapping and assessment are exposed to the same enforcement risk that Meta faced — and the enforcement environment is becoming progressively more aggressive.",
          "For auditors, the Meta case generates three specific testing questions. First: has the organization conducted a comprehensive mapping of all EEA personal data transfers, including indirect transfers through SaaS tools and cloud infrastructure? This mapping must be at the data flow level, not just the vendor contract level — knowing that Salesforce processes EEA data is not sufficient; the organization must know which data is processed, in which Salesforce region, and under what transfer mechanism. Second: have Transfer Impact Assessments been conducted for all EEA-to-US transfers, and have the assessments been updated following legal developments (Schrems II, the new EU-US Data Privacy Framework adopted in 2023)? Third: where supplementary measures are required by TIAs, are those measures actually implemented and effective — or are they documented in policy but not in practice?",
          "The EU-US Data Privacy Framework (DPF), adopted in July 2023, provides a new adequacy mechanism for EU-to-US transfers for US companies that self-certify to the DPF. However, the DPF has already been challenged in European courts, and its long-term legal stability is uncertain. Auditors assessing EEA-to-US transfers must evaluate whether the organization's reliance on the DPF is appropriate given the legal risk, and whether contingency plans exist for a scenario where the DPF is invalidated (as Privacy Shield was). Organizations with robust data residency controls — ensuring that EEA personal data can be processed within the EEA if required — are better positioned for DPF uncertainty than organizations that have architected all data processing to flow through US infrastructure.",
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
        "Data minimization: only collect what you need for documented purposes — excess data is a liability, not an asset",
        "Retention schedules must be enforced in systems, not just documented in policy — manual deletion reviews consistently fail",
        "Data subject requests (deletion, access, portability) must be fulfilled within 30 days — DSAR process must be tested at scale",
        "GDPR breach notification: 72 hours to supervisory authority from becoming aware — weekends and holidays count",
        "DPIA is mandatory before high-risk processing begins — post-hoc DPIAs are findings, not remediation",
        "International transfers require valid mechanisms (SCCs + TIA) — documenting a legal basis that is legally invalid is still a violation",
        "DPO independence requires that the DPO not report to the person whose processing they oversee — dual roles create conflicts",
        "RoPA (Article 30 Record of Processing Activities) must be current — undocumented data flows are unmapped risks",
        "Consent must be freely given, specific, informed, and unambiguous — bundled consent with service terms violates GDPR",
        "Privacy by Design requires privacy controls at system inception, not as retrofit compliance — test SDLC privacy checkpoints",
      ],
      references: [
        { title: "GDPR Full Text — EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" },
        { title: "ISACA Privacy Audit Framework", url: "https://www.isaca.org/resources/privacy" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-09-q1", type: "Core Idea", challenge: "Data you don't need.", text: "Why is collecting data you don't need a liability?", options: ["Unneeded data is risk to store and protect, not an asset","More data is always better","Data has no risk","Regulators reward hoarding"], correctIndex: 0, explanation: "Excess data expands breach impact and compliance burden." },
        { id: "audit-09-q2", type: "GDPR", challenge: "Storage limitation.", text: "What does GDPR Article 5(1)(e) (storage limitation) require?", options: ["Delete personal data once it's no longer needed, per the retention schedule","Keep all data forever","Encrypt data only","Sell old data"], correctIndex: 0, explanation: "Data must not be kept longer than necessary for its purpose." },
        { id: "audit-09-q3", type: "GDPR", challenge: "The 72-hour clock.", text: "Under GDPR, how quickly must a breach be reported to the supervisory authority?", options: ["Within 72 hours of discovery","Within 30 days","Within 1 year","Never"], correctIndex: 0, explanation: "GDPR requires authority notification within 72 hours of discovery." },
        { id: "audit-09-q4", type: "Violation", challenge: "Over-retained data.", text: "A table kept 450,000 records for 3,353 days against a 730-day policy violates what — and the action?", options: ["Article 5(1)(e) storage limitation — delete records older than 730 days and notify the DPO","Nothing — retention is optional","Article 17 only, no action","Encryption rules only"], correctIndex: 0, explanation: "Over-retention breaches storage limitation; purge and notify the DPO." },
        { id: "audit-09-q5", type: "Real Incident", challenge: "Meta, 2023.", text: "Meta's €1.2B GDPR fine in 2023 was for…", options: ["Transferring EU personal data to US servers after the legal basis was invalidated","A data breach of passwords","Selling data to spammers","Not encrypting disks"], correctIndex: 0, explanation: "Invalid EU-US data transfers drove the record fine." },
        { id: "audit-09-q6", type: "Right to Erasure", challenge: "Delete everywhere.", text: "Under GDPR Article 17 (right to erasure), a deletion request must be fulfilled…", options: ["Within 30 days, removing data from all systems including accessible backups","Whenever convenient","Only from the main database","Within 1 year"], correctIndex: 0, explanation: "Erasure covers all stores the data can be accessed from, including backups." },
        { id: "audit-09-q7", type: "Principle", challenge: "Minimize.", text: "Data minimization means…", options: ["Collect and keep only the data actually needed for a stated purpose","Collect as much as possible","Never collect data","Keep data indefinitely"], correctIndex: 0, explanation: "Less data held means less to leak and less to govern." },
        { id: "audit-09-q8", type: "Concept", challenge: "Retention schedules.", text: "Why do organizations need documented retention schedules?", options: ["To prove data is deleted when no longer needed, satisfying storage limitation","To slow down deletes","For decoration","They're not needed"], correctIndex: 0, explanation: "Schedules operationalize and evidence the storage-limitation principle." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. GDPR Article 5(1)(e) — storage limitation: personal data must not be kept longer than necessary for the stated purpose",
          "  2. Data past its retention date is a liability, not an asset — 450,000 records 7.2 years overdue exposes the org to supervisory authority fines",
          "  3. Data Protection Impact Assessments (DPIAs) are required before high-risk processing; the DPO must be notified of all retention violations",
          "─────────────────────────────────────────────────────────────────────",
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
        "Penetration testing is a critical control in any mature security program — a controlled adversarial simulation that validates whether defenses work in practice, not just in documentation. But it must be properly scoped, authorized, and documented to be both effective and legal. ISACA auditors review pentest programs to verify that testing is delivering genuine security assurance rather than compliance theater, and that the authorization structure protects both the organization and the testing team. The line between a security professional and a criminal is entirely defined by the scope of written authorization — the same technical actions taken without authorization constitute federal crimes under the Computer Fraud and Abuse Act (CFAA) and equivalent laws in other jurisdictions.",
        "The scope document is the legal foundation of every penetration test engagement. It defines exactly which systems are in scope (specific IP ranges, domains, applications, or environments), what types of testing are permitted (external network, internal network, web application, social engineering, physical, wireless), the testing window (precise start and end dates and times, including any blackout periods during business-critical operations), and escalation procedures if a critical finding is discovered during testing. Out-of-scope systems must be explicitly listed — ambiguity in scope documents does not protect the tester, because prosecutors and courts will apply the most conservative interpretation of authorization when charging CFAA violations.",
        "Authorization must flow from the correct authority. The system owner — the business or legal entity responsible for the system being tested — must provide written authorization. IT management approval alone is insufficient when business units own the systems being tested. Cloud workloads require authorization from the cloud provider in addition to the system owner, because testing cloud infrastructure without provider approval may violate the provider's terms of service and trigger the provider's own security response. AWS, Azure, GCP, and other major cloud providers each have penetration testing policies specifying what testing is allowed without prior notification and what requires advance approval.",
        "The rules of engagement (ROE) document operationalizes the scope document. Where the scope document defines what can be tested, the ROE defines how testing will be conducted. The ROE specifies: testing methodologies and tools that are authorized, exploitation techniques that are permitted versus prohibited (e.g., denial of service attacks may be explicitly prohibited on production systems), data handling requirements for credentials or sensitive data discovered during testing, evidence collection and retention procedures, and the communication protocol between the testing team and the client for urgent findings. The ROE should also specify what actions the tester must take if they discover evidence of an active intrusion by a real attacker — a scenario that occurs more often than clients expect.",
        "Penetration test findings must be reported, tracked, and remediated according to a defined process. The test report is a security-sensitive document — it contains a detailed roadmap for attacking the organization's systems, including specific vulnerabilities, exploitation techniques that worked, and paths through the environment that led to critical findings. Report distribution must be restricted to authorized recipients (typically the CISO and a small group of IT leadership), transmitted securely (encrypted email or secure portal, not standard email), and stored securely (access-controlled document repository). Reports should not be stored in general-purpose shared drives where all employees can access them.",
        "Remediation tracking after a penetration test is as important as the test itself. A penetration test that produces a list of findings without a remediation tracking process provides a temporary snapshot of security weaknesses — one that grows stale as the environment changes and new vulnerabilities emerge. Best practice requires: a remediation kickoff meeting within five business days of report delivery, a remediation plan with owners and due dates for each finding classified by severity (critical within 30 days, high within 60 days, medium within 90 days), and a retest to verify that remediations are effective. Retests must be conducted against the specific vulnerabilities remediated, not just a general retest of the same scope — because the retest is evidence of effective remediation, not just another snapshot.",
        "Red team engagements differ from penetration tests in scope, duration, and objectives. A penetration test typically has a defined scope (these systems), a defined methodology (find and report vulnerabilities), and a defined duration (two to four weeks). A red team engagement simulates an advanced persistent threat — it has a defined objective (access the most sensitive data, simulate ransomware deployment, achieve a specific business impact) and uses any tactics, techniques, and procedures available to achieve that objective, including social engineering, physical intrusion, and supply chain attacks. Red team engagements typically run for months rather than weeks and require additional authorization considerations because their scope encompasses human targets (social engineering), physical facilities, and supply chain relationships. Auditors reviewing red team programs verify that the additional authorization requirements are met and that the engagement agreement explicitly authorizes each category of testing.",
      ],
      technical: {
        title: "Pentest Scoping Checklist",
        body: [
          "The scope document must contain specific technical content to be an adequate authorization. The in-scope systems section must list specific IP addresses or CIDR ranges (not vague descriptions like 'the web environment'), specific hostnames or domain names, specific application URLs if web application testing is included, and specific cloud account IDs or resource groups if cloud infrastructure is in scope. The out-of-scope systems section is equally important — it must explicitly list any systems within the broad target environment that are excluded, with the reason for exclusion. Common exclusions include: production financial transaction systems (to prevent business disruption), third-party systems hosted by vendors who have not provided separate authorization, and systems in shared hosting environments where testing could affect other tenants.",
          "The testing window must be specific. 'May 1 through May 14' is not sufficient — the scope document should specify exact UTC times (to prevent timezone confusion), whether testing can occur 24/7 or only during defined hours, any blackout dates (quarter-end close, major product releases, board meetings), and the maximum duration of any single sustained testing activity (e.g., no automated scanning running for more than 4 hours continuously). These specifics matter because testing activity generates security alerts that the client's security team will investigate. Clear timing information prevents wasted incident investigation work and ensures that legitimate pentest activity is not confused with a real attack.",
          "The authorization document must be signed by an individual with legal authority to authorize the testing. For a company's own systems, this is typically the CIO, CISO, or an executive authorized by contract to represent the company for security matters. For systems operated by a third party on behalf of the client, the third party must also provide authorization — either through a separate authorization letter or through a clause in the scope document signed by both parties. For government systems, authorization requirements are additional and specific — federal government systems require specific authorization under the Federal Information Security Modernization Act (FISMA) and may require involvement of agency legal counsel.",
          "Cloud-specific authorization requirements vary by provider and must be researched before testing begins. AWS allows most penetration testing without prior approval for testing against your own AWS resources, but prohibits testing that violates the AWS Acceptable Use Policy (including DDoS testing, testing from Amazon EC2 against non-Amazon targets). Azure's penetration testing policy requires notification via the Microsoft Penetration Testing Rules of Engagement form for any testing. GCP's policy is similar to AWS — testing against your own GCP resources generally does not require advance approval, but testing must comply with Google's Terms of Service. All three providers prohibit testing that would affect other customers' resources. Violating cloud provider testing policies can result in account suspension.",
          "Emergency contact and escalation procedures in the scope document serve a critical function: they allow the tester to immediately notify the client when a critical finding is discovered that creates imminent business risk. If a tester discovers an active breach, a critical data exposure that is visible from the internet, or a vulnerability so severe that immediate exploitation is likely, they must be able to reach a human being with authority to take action — not just send an email to a generic security inbox. The emergency contact list should include: primary and secondary contacts (with personal mobile numbers, not just office phones), the escalation path if neither primary nor secondary responds within 15 minutes, and the decision authority for whether testing should be paused pending remediation of a critical finding.",
          "Data handling requirements during testing address a specific risk that scope documents frequently overlook: what happens to sensitive data discovered during testing? Pentesters routinely discover passwords, API keys, PII, health records, financial data, and other sensitive information in the course of their work — in configuration files, in code repositories, in database dumps. The scope document must specify: what the tester must do when they discover sensitive data (typically: screenshot to document the vulnerability, do not exfiltrate or retain the data beyond what is needed to demonstrate the finding, report immediately to the client contact), what data may be retained in the test report (typically: the path to the data and the type of data discovered, but not actual data content), and how test artifacts (screenshots, tool outputs, network captures) must be handled and destroyed at engagement close.",
          "Post-engagement scope confirmation is a best practice that prevents disputes about whether specific testing activities were within scope. Within 24 hours of completing testing, the testing team should provide a brief written summary of what systems were tested, what testing methodologies were used, and any activities that were at the boundary of the scope document's authorization — describing how the team interpreted ambiguous scope language. This creates a contemporaneous record that can be referenced if questions arise about whether specific activities were authorized. Organizations that skip this step and then dispute findings as 'out of scope' after the report is delivered are attempting to retroactively modify the scope document — a practice that erodes the trust relationship between client and testing team and undermines the value of the engagement.",
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
          "In June 2010, two members of the hacker group Goatse Security discovered that AT&T's iPad activation API exposed users' ICC-ID numbers (SIM card identifiers) and that by iterating through ICC-IDs, they could retrieve the email addresses of iPad owners who had subscribed to AT&T's 3G service. They wrote a script that submitted approximately 114,000 ICC-ID numbers and retrieved the corresponding email addresses — a population that included prominent politicians, military officials, and corporate executives. They reported the vulnerability to Gawker, which published the story. AT&T was notified and patched the vulnerability. The FBI then investigated the researchers.",
          "The legal question was whether the researchers had 'exceeded authorized access' under the CFAA — the same statute used to prosecute traditional hackers — despite the fact that AT&T's API was publicly accessible without authentication and the researchers had not bypassed any access control. The government argued that extracting data through an automated script in quantities far beyond any normal user's activity constituted unauthorized access. The researchers argued that they were accessing publicly available information through its documented interface. A federal grand jury indicted both researchers in 2011.",
          "The charges were ultimately plea-bargained down and the sentences were suspended, but the case's impact on the security research community was chilling. It established that security researchers who discover and demonstrate vulnerabilities without explicit written authorization from the system owner face genuine criminal jeopardy — even when acting in good faith with the intent of improving security. The case directly informed subsequent CFAA reform efforts, including the 2022 Department of Justice policy statement that good-faith security research will not be prosecuted, and the broader bug bounty movement's emphasis on clear, written safe harbor provisions.",
          "For IT audit purposes, the AT&T case illustrates why the legal authorization structure for penetration testing is not a formality. Written authorization from the system owner is the legal mechanism that transforms a security professional's actions from criminal conduct into authorized testing. The authorization must come from the correct party — not just from IT management if business units own the systems, not from just the primary client if cloud providers or third parties also own tested systems. Scope documents must be specific and comprehensive. Rules of engagement must be explicit about what techniques are authorized. And the authorization must exist before any testing begins — retroactive authorization is not a defense to criminal charges.",
          "The development of vulnerability disclosure frameworks and bug bounty programs has created a more structured legal environment for security research than existed in 2010. Organizations like HackerOne and Bugcrowd provide program frameworks that include clear written authorization, scope definitions, safe harbor provisions, and reporting mechanisms. When auditors evaluate an organization's penetration testing program, they should also evaluate whether the organization has a vulnerability disclosure policy (VDP) that provides a legal safe harbor for external researchers who discover vulnerabilities — because good-faith researchers are a source of valuable security intelligence, and organizations without VDPs may be discouraging legitimate researchers while not deterring attackers.",
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
        "Written authorization from the system owner is the legal boundary between security professional and criminal — verbal authorization is not authorization",
        "Cloud workloads require explicit cloud provider approval — each major provider has a separate penetration testing policy",
        "Out-of-scope systems must be explicitly listed — scope ambiguity will be resolved against the tester in any legal dispute",
        "All discovered credentials and sensitive data must be handled per the data handling section — do not retain real data beyond the finding demonstration",
        "Emergency contact list with personal mobile numbers is required — critical findings need immediate human response, not generic inbox routing",
        "Red team engagements require additional authorization categories: social engineering targets, physical facility access, supply chain relationships",
        "Report distribution must be restricted and encrypted — pentest reports are attack roadmaps that must be access-controlled",
        "Remediation tracking requires a retest — retesting the remediation is evidence of effectiveness, not just another vulnerability scan",
        "Post-engagement scope confirmation creates a contemporaneous record of what was tested and how ambiguous scope was interpreted",
        "Vulnerability Disclosure Policies (VDPs) with safe harbor provisions encourage legitimate researchers — evaluate whether the organization has one",
      ],
      references: [
        { title: "NIST SP 800-115 — Technical Guide to Information Security Testing", url: "https://csrc.nist.gov/publications/detail/sp/800-115/final" },
        { title: "AWS Penetration Testing Policy", url: "https://aws.amazon.com/security/penetration-testing/" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-10-q1", type: "Core Idea", challenge: "Crime vs job.", text: "What single thing separates a penetration tester from a criminal hacker?", options: ["Written authorization from the system owner for the systems and tests performed","A better laptop","A certification alone","A friendly attitude"], correctIndex: 0, explanation: "Authorization is the legal protection that makes testing lawful." },
        { id: "audit-10-q2", type: "Cloud", challenge: "The provider's rules.", text: "If a cloud workload is within the authorized IP range, is more approval needed before testing?", options: ["Yes — cloud providers (AWS/Azure/GCP) each have their own pentest approval policies","No — IP range is enough","Only for on-prem","Never"], correctIndex: 0, explanation: "Cloud workloads require explicit provider authorization too." },
        { id: "audit-10-q3", type: "Out of Scope", challenge: "You hit the wrong net.", text: "A tester scans an explicitly out-of-scope core banking subnet. What must happen?", options: ["Document it, disclose to the client within 24 hours, and cease testing immediately","Keep going quietly","Delete the logs","Ignore it"], correctIndex: 0, explanation: "Out-of-scope access must be stopped, documented, and disclosed." },
        { id: "audit-10-q4", type: "Real Incident", challenge: "AT&T / iPad, 2010.", text: "What did the 2010 AT&T iPad incident illustrate?", options: ["Without written authorization, access — even with defensive intent — can be prosecuted","Encryption is unnecessary","Cloud testing is always legal","Pentests need no scope"], correctIndex: 0, explanation: "Good intentions don't substitute for authorization." },
        { id: "audit-10-q5", type: "Scope Document", challenge: "List the no-go zones.", text: "Does listing only authorized IPs (without listing out-of-scope systems) adequately protect the tester?", options: ["No — out-of-scope systems must be explicitly listed; ambiguity protects no one","Yes — listing in-scope is enough","Only for cloud","Scope docs are optional"], correctIndex: 0, explanation: "Explicit out-of-scope listings remove dangerous ambiguity." },
        { id: "audit-10-q6", type: "Authorization", challenge: "Who signs.", text: "Whose signature makes a pentest authorization valid?", options: ["The system owner authorizing the specific systems and test types","Any employee","The tester themselves","No one — it's implied"], correctIndex: 0, explanation: "The owner must authorize the defined scope and test types." },
        { id: "audit-10-q7", type: "Concept", challenge: "Rules of engagement.", text: "Why are clear rules of engagement essential before testing?", options: ["They define what's permitted, protecting both client and tester legally","They slow the test","They're just paperwork","They help attackers"], correctIndex: 0, explanation: "Defined scope and ROE keep the engagement lawful and bounded." },
        { id: "audit-10-q8", type: "Definition", challenge: "The key document.", text: "The document that authorizes and bounds a penetration test is the…", options: ["Scope / rules-of-engagement (authorization) document","Invoice","Marketing brief","Org chart"], correctIndex: 0, explanation: "Scope/authorization defines and legally protects the engagement." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Written authorization from the system owner is the legal boundary between a penetration tester and a criminal — ambiguity protects no one",
          "  2. Out-of-scope access must be self-reported to the client within 24 hours regardless of who discovers the violation first",
          "  3. Cloud workloads require separate cloud provider authorization (AWS, Azure, GCP each have their own pentest approval policy)",
          "─────────────────────────────────────────────────────────────────────",
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
        "Audit evidence is the information auditors collect and evaluate to support their conclusions about whether controls are operating effectively. ISACA defines three attributes that make evidence sufficient for audit purposes: it must be sufficient (there is enough of it to support the conclusion — the sample size is adequate, the time period is covered, the population is well-defined), it must be reliable (the evidence comes from a credible source obtained through a sound method — it has not been manipulated, the source is authoritative, and the collection method did not introduce distortion), and it must be relevant (it actually speaks to the control being tested — evidence that a backup ran successfully does not test whether the backup is restorable). Evidence that fails any of these three tests cannot support a valid audit conclusion.",
        "Audit sampling is the methodology auditors use to test a representative subset of a population when testing every item is impractical. For a change management control with 1,200 tickets in the audit period, testing all 1,200 tickets would be exhaustive but often unnecessary. Sampling allows auditors to select a statistically representative subset, apply detailed testing to that subset, and project the results to the full population with a quantified confidence level. Statistical sampling uses probability theory to ensure that every item in the population has a known, non-zero chance of selection and to project results with measurable precision. Judgmental (non-statistical) sampling relies on auditor expertise and experience to select items, but cannot produce statistically valid projections — judgmental sample results can only be described for the sample, not projected to the full population.",
        "Attribute sampling is the most common form of statistical sampling in IT audit work. It tests whether a binary attribute (the control operated, or it did not) is present in each item in the sample. The auditor defines: the population (all change tickets in Q1 2026), the attribute being tested (each ticket has documented CAB approval prior to deployment), the tolerable deviation rate (the maximum percentage of items that can fail the test and still allow the auditor to conclude the control is operating effectively — typically 5–10%), the desired confidence level (95% is standard for significant controls), and the expected deviation rate (the auditor's prior estimate of how often the control fails — if unknown, assume 0%). Statistical tables then determine the minimum sample size.",
        "The chain of custody for audit evidence is the documented record of who collected a piece of evidence, when, from what source, using what method, and how it has been stored and handled since collection. Chain of custody documentation is essential because audit workpapers may need to support legal proceedings, regulatory examinations, or litigation — and in any of these contexts, the authenticity and integrity of the evidence will be challenged. Digital evidence requires additional chain of custody controls: hash values (MD5, SHA-256) computed at collection to verify that the evidence has not been modified, timestamps from authoritative sources (not the auditor's local clock), and secure storage in a system that records access.",
        "Computer-Assisted Audit Techniques (CAATs) are the tools and methods auditors use to automate evidence collection and analysis. CAATs include: data extraction and analysis tools (ACL/Galvanize, IDEA, SQL queries), log analysis platforms (Splunk, Elastic), configuration comparison tools (that compare actual system configurations against approved baselines), and automated reconciliation tools. CAATs are particularly valuable in large-population testing — they allow auditors to test entire populations rather than samples, to perform analyses that would be infeasible manually (such as comparing every payroll disbursement against current employee records), and to produce evidence that is reproducible (the same CAAT applied to the same data will produce the same result, which is not always true of manual testing).",
        "Workpaper documentation standards define the minimum content required for each piece of audit evidence to be considered adequately documented. ISACA standards require workpapers to contain: the objective of the test, the population and sample definition, the testing method, the evidence examined (with references to the source documents), the results of testing (including any deviations found), and the auditor's conclusion. Workpapers must be clear enough that another auditor with no prior knowledge of the engagement could read them and understand exactly what was tested, how, and what was found — this is the test of adequate documentation. Workpapers that require the author to explain them orally are not adequately documented.",
        "Evidence quality hierarchy guides auditors in evaluating how much weight to place on different types of evidence. Physical evidence — the auditor personally observes the control in operation, such as watching a CAB meeting, observing a backup restoration, or personally extracting data from a system — is the highest quality because it cannot be fabricated after the fact. Documentary evidence — logs, reports, screenshots, signed documents, system extracts — is the second tier, reliable when obtained directly from the source system rather than from management. Testimonial evidence — representations made by management or staff during interviews — is the lowest quality, because it relies on the truthfulness and accuracy of the person making the representation. Auditors must be skeptical of management representations that are not supported by documentary or physical evidence, particularly for high-risk controls.",
      ],
      technical: {
        title: "Statistical Sampling for IT Audit",
        body: [
          "Attribute sampling mechanics begin with population definition. The population must be clearly bounded — it has a beginning (the start of the audit period), an end (the end of the audit period), and a clear membership criterion (all production change tickets, all user accounts with privileged access, all vendor invoices above $10,000). Once the population is defined, the auditor obtains the complete population from the source system — not from management-prepared summaries, which may exclude items management does not want the auditor to see. The completeness of the population extract is tested by comparing counts against independent sources: if the change management system shows 1,200 tickets in Q1 but the deployment log shows 1,247 deployments in Q1, the discrepancy requires investigation.",
          "Sample size determination uses statistical tables or software. For attribute sampling at 95% confidence with 5% tolerable deviation rate and 0% expected deviation rate, the required sample size is 60. As expected deviation rate increases (if the auditor believes the control sometimes fails), the required sample size increases significantly. At 2% expected deviation rate with the same confidence and tolerable rate, the required sample size rises to approximately 150. This mathematical relationship between expected and tolerable deviation rates is why auditors should not assume zero expected deviation when prior experience or preliminary testing suggests the control has operated imperfectly in the past — the sample size must reflect realistic expectations.",
          "Random sample selection is required for statistical sampling validity. The selection method must give every item in the population a known, non-zero probability of selection — this is what makes the sample statistically representative and the projection statistically valid. Methods include: random number generation (using a random number generator to select item numbers from the numbered population), systematic random sampling (selecting every nth item starting from a random start point), and stratified sampling (dividing the population into subgroups by risk level and sampling each stratum separately at rates proportional to risk). Judgmental selection — choosing items because they look interesting or risky — invalidates the statistical projection, because the sample is no longer representative of the population.",
          "Deviation analysis is the most critical part of attribute sampling work. Each deviation — each sample item where the control did not operate as expected — must be analyzed to understand its nature. Some deviations are isolated failures (a single ticket missed approval due to a system error). Other deviations are indicative of systematic problems (multiple tickets approved by the same person who also developed the change — a segregation of duties violation that affects not just these tickets but the entire control's design). The nature of the deviation affects the auditor's conclusion: isolated failures may still allow the conclusion that the control is operating effectively despite imperfections; systematic failures indicate that the control's design or operation is fundamentally compromised.",
          "Projection methodology translates sample results to population conclusions. If a sample of 60 items contains 4 deviations (6.7% deviation rate), and the tolerable deviation rate is 5%, the auditor concludes that the population deviation rate likely exceeds the tolerable threshold — because the sample is the best available estimate of the population, and the sample rate exceeds tolerance. The auditor must then decide: expand testing to the full population to get a more precise estimate of the actual deviation rate, or conclude the control is not operating effectively and issue a finding without expanding. Expanding to the full population is appropriate when the sample results are borderline and the cost of expanded testing is justified by the risk. When the deviation rate significantly exceeds the tolerable rate (e.g., 6.7% versus 5%), expansion is less likely to produce a clean conclusion and the finding is typically issued directly.",
          "CAATs for evidence collection have specific audit methodology requirements. When using SQL queries to extract data, the auditor must document: the exact query used, the database and table it was run against, the date and time of execution, the user account used for access, and the result set (row count and a sample of results or a hash of the full result). The query must be designed to capture all relevant records, not just a subset — a query with an implicit filter that excludes some relevant records will produce incomplete evidence. When using log analysis tools, the auditor must document the search parameters, the time range, the log sources searched, and the complete results (not just the results that confirm the finding). Evidence that is selectively presented — showing only the results that support a particular conclusion while suppressing contradictory evidence — violates auditor independence standards.",
          "Workpaper review and quality control are the final steps before evidence is considered complete. Senior auditors review each workpaper to verify that it meets documentation standards, that the evidence supports the conclusion stated, that all deviations are documented and explained, and that the conclusion is consistent with the evidence. Quality control review identifies workpapers where the conclusion is not supported by the evidence (e.g., a workpaper that documents 3 deviations in 60 items but concludes 'control operating effectively' without explanation of how a 5% deviation rate at a 5% tolerable threshold leads to a clean conclusion), where evidence is missing (referenced exhibits not attached), or where the testing methodology has a flaw that invalidates the results. Deficiencies found in quality control review require additional testing rather than explanation — the workpaper standard is that the evidence in the file, not the auditor's oral explanation, must support the conclusion.",
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
          "Arthur Andersen's conviction for obstruction of justice in 2002 was the first criminal conviction of a major accounting firm in US history and resulted in the firm's dissolution — the effective death of a 90-year-old institution and the elimination of 85,000 jobs. The obstruction consisted of the systematic shredding of Enron audit documents and deletion of electronic files after Arthur Andersen's general counsel sent a memo reminding staff of the firm's document retention policy — a memo that federal prosecutors successfully argued functioned as an instruction to destroy evidence in anticipation of litigation. The episode fundamentally changed how audit firms manage evidence, how evidence retention policies are designed, and how regulators think about audit documentation.",
          "The scale of the document destruction was significant. Andersen employees in multiple offices shredded tons of paper documents and deleted thousands of electronic files over the period from mid-October through early November 2001, when the SEC issued a formal subpoena. The destruction was coordinated enough to suggest that senior Andersen partners understood the scope of Enron's problems and the likelihood of regulatory investigation. The audit workpapers that remained were incomplete — insufficient to reconstruct the basis for Andersen's audit opinions, insufficient to determine what the auditors had known, and insufficient to assess whether the audit had met professional standards.",
          "The legal and regulatory aftermath permanently changed audit evidence standards. PCAOB Auditing Standard AS 1215 (Audit Documentation) requires external auditors to retain audit documentation for seven years and specifies that documentation must be complete enough for an experienced auditor with no prior connection to the engagement to understand the work performed, the evidence obtained, the conclusions reached, and the significant professional judgments made. The 'experienced auditor' standard is the key quality test: if the workpaper requires explanation, it is not adequately documented. Digital evidence must be preserved in formats that prevent modification, with audit trails showing who accessed what and when.",
          "The Andersen case also established the legal exposure for audit evidence destruction. Obstruction of justice — destroying evidence in anticipation of or during a legal proceeding — is a federal felony. The memo from Andersen's general counsel, which referenced the firm's document retention policy, was interpreted by the jury as a signal to destroy evidence rather than a routine reminder. Organizations that shred documents during a regulatory investigation, that perform 'routine' data purges immediately after learning of an investigation, or that delete emails and electronic records when litigation becomes foreseeable face the same obstruction exposure. Auditors must understand this legal context — not just for their own workpapers, but when advising clients on evidence preservation in the context of IT incidents.",
          "For practicing IT auditors, the Andersen case generates specific workpaper requirements. Hash values must be computed for all digital evidence at collection — the hash provides a cryptographic fingerprint that proves the evidence has not been modified since collection. Evidence must be stored in a system that records every access — who viewed the workpapers, when, and what changes (if any) were made. Workpapers must be retained for the required period (7 years under PCAOB standards) in a format that remains readable throughout the retention period — evidence stored in proprietary formats that may become inaccessible as software changes must be converted to durable formats. Legal hold procedures must be activated when litigation or regulatory investigation is reasonably anticipated — evidence that would normally be subject to routine deletion must be preserved when a legal hold applies.",
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
        "Evidence must be sufficient (enough), reliable (credible source), and relevant (addresses the control tested) — failure on any attribute invalidates it",
        "Statistical sampling projects results to the full population with known confidence — judgmental sampling cannot produce statistical projections",
        "Deviation rate exceeding the tolerable rate means the control is NOT operating effectively — expand testing or issue a finding",
        "Audit evidence must be retained for 7 years (PCAOB standard) in tamper-evident format with hash verification",
        "Chain of custody documentation must be maintained from collection through retention — who collected it, when, from what source, using what method",
        "CAATs allow full-population testing — document the exact query, time of execution, and complete results, not just the results that support findings",
        "Physical evidence (observed directly) outranks documentary evidence, which outranks testimonial evidence — management representations must be corroborated",
        "Workpaper quality standard: an experienced auditor with no prior engagement knowledge must be able to understand what was done and why",
        "Legal holds suspend routine deletion for evidence relevant to anticipated litigation or regulatory investigation — obstruction of justice is a felony",
        "Hash values computed at evidence collection prove integrity — evidence without hash verification cannot definitively prove it was not modified",
      ],
      references: [
        { title: "AICPA AU-C Section 530 — Audit Sampling", url: "https://us.aicpa.org/content/dam/aicpa/research/standards/auditattest/downloadabledocuments/au-c-00530.pdf" },
        { title: "ISACA Audit Standards", url: "https://www.isaca.org/resources/isaca-journal/issues/2017/volume-3/it-audit-evidence" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-11-q1", type: "Core Idea", challenge: "Back it up.", text: "Why does an audit finding require evidence?", options: ["An assertion without evidence is just an opinion — evidence makes a finding valid","Findings need no support","Opinions are enough","Evidence slows audits"], correctIndex: 0, explanation: "Evidence is what makes an audit conclusion defensible." },
        { id: "audit-11-q2", type: "Evidence Quality", challenge: "Three attributes.", text: "What three attributes make audit evidence adequate?", options: ["Sufficient, reliable, and relevant","Cheap, fast, and pretty","Long, encrypted, and signed","Verbal, recent, and short"], correctIndex: 0, explanation: "Evidence must be enough, credible, and actually address the control tested." },
        { id: "audit-11-q3", type: "Sampling", challenge: "Over the threshold.", text: "In attribute sampling, if the sample deviation rate exceeds the tolerable rate, the auditor must…", options: ["Conclude the control is not operating effectively (or expand testing)","Pass the control anyway","Ignore the deviations","Reduce the sample"], correctIndex: 0, explanation: "Exceeding the tolerable rate means the control fails the test." },
        { id: "audit-11-q4", type: "Calculation", challenge: "Do the math.", text: "5 of 60 change tickets lack CAB approval; tolerable rate is 5%. The conclusion?", options: ["8.3% deviation exceeds 5% — the change-management control is not operating effectively","8.3% is fine","It's exactly at tolerance","The sample is invalid"], correctIndex: 0, explanation: "5/60 = 8.3% > 5%, so the control fails." },
        { id: "audit-11-q5", type: "Evidence Hierarchy", challenge: "Rank the evidence.", text: "Which is true about audit evidence quality?", options: ["Documentary evidence ranks higher than testimonial; directly observed physical evidence is highest","Interviews outrank documents","All evidence is equal","Hearsay is best"], correctIndex: 0, explanation: "Physical > documentary > testimonial in reliability." },
        { id: "audit-11-q6", type: "Real Incident", challenge: "Arthur Andersen.", text: "What principle did the Arthur Andersen case establish about evidence?", options: ["Evidence must be preserved (≈7 years); destroying it is obstruction of justice","Evidence can be shredded after review","Only digital evidence counts","Evidence is optional"], correctIndex: 0, explanation: "Collection isn't enough — evidence must be retained, not destroyed." },
        { id: "audit-11-q7", type: "Definition", challenge: "Tolerable rate.", text: "The 'tolerable deviation rate' is…", options: ["The maximum error rate at which the auditor can still rely on the control","The number of samples","The audit fee","The number of findings"], correctIndex: 0, explanation: "It's the threshold beyond which the control is deemed ineffective." },
        { id: "audit-11-q8", type: "Concept", challenge: "From opinion to fact.", text: "What elevates an audit finding from opinion to fact?", options: ["Sufficient, reliable, relevant evidence supporting it","A confident tone","Management agreement","A long report"], correctIndex: 0, explanation: "Quality evidence is what substantiates a finding." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Attribute sampling projects a sample deviation rate to the full population — 8.3% vs 5% tolerable rate means the control is NOT operating effectively",
          "  2. Evidence quality matters: post-dated approvals and approvals from unauthorized personnel are deviations even if signatures exist",
          "  3. When the tolerable deviation rate is exceeded, the auditor must either expand testing to the full population or issue a control deficiency finding — not both",
          "─────────────────────────────────────────────────────────────────────",
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
        "The audit report is the formal deliverable that transforms weeks of testing, evidence collection, and analysis into actionable information for the organization's leadership, audit committee, and board. ISACA standards (specifically IS Audit Standards 1401-1405) require that audit reports include the scope and objectives of the audit, the period covered, the methodology used, findings with supporting evidence and risk ratings, management responses to each finding, and agreed remediation timelines. The report is not simply a list of problems — it is a communication document designed to enable governance decisions, and its quality is measured by whether it produces effective remediation action.",
        "Each finding in the audit report must be structured using the Condition-Criteria-Cause-Effect framework — the CISA standard for a complete, actionable finding. Condition is what the auditor found: specific, measurable, objective. Criteria is what the standard, policy, or regulation requires: the benchmark against which the condition is measured. Cause is why the condition exists: the root cause, not the symptom. Effect is the business risk created by the gap between condition and criteria: the consequence if the finding is not remediated. A finding that omits any of these four elements is incomplete — management cannot remediate effectively without understanding the cause, and the board cannot assess the risk without understanding the effect.",
        "Risk rating methodology must be consistent and defensible. Findings are typically rated Critical, High, Medium, or Low based on: the likelihood that the weakness will be exploited or will produce a business harm, the magnitude of the potential impact (financial, regulatory, reputational, operational), the breadth of systems or processes affected (a finding that affects a single low-risk system is rated differently from a finding that affects all financial reporting systems), and whether compensating controls exist that partially offset the risk. Critical findings typically require immediate escalation to the audit committee — they cannot wait for the standard 30-day management response cycle. High findings require remediation within 30–60 days. Medium findings require remediation within 90 days. Low findings may be accepted as a risk management decision with documentation.",
        "Management responses to audit findings are a formal part of the report and must be substantively engaging with the findings, not defensive. A management response that says 'we disagree with this finding' without addressing the factual basis of the condition is not an adequate response. A response that says 'we will remediate by [date]' without identifying what specific action will be taken is not actionable. Best practice responses include: acknowledgment of the finding's accuracy (or a factually specific dispute), identification of the root cause (confirming that management understands why the gap exists), the specific remediation actions to be taken with owners and dates, and any compensating controls currently in place that partially mitigate the risk while remediation is underway. Auditors review management responses before the report is finalized and may request revision when responses are inadequate.",
        "Report distribution controls are a security requirement. The audit report contains detailed information about the organization's control weaknesses — information that would be valuable to attackers if it were disclosed. Report distribution must be restricted to individuals with a legitimate need for the information: the audit committee, the board (for significant deficiency or material weakness reports), the CISO, the CIO, and process owners for the areas covered. Reports should not be distributed via standard email — they should be transmitted through encrypted email or a secure document portal, stored in an access-controlled repository, and tracked. When external parties (regulators, external auditors) request access to internal audit reports, the request should be evaluated by legal counsel and addressed with appropriate confidentiality protections.",
        "Remediation tracking is the control that closes the loop between finding identification and finding resolution. Many organizations have strong audit processes but weak remediation tracking — they produce good reports and then fail to ensure that findings are actually fixed. Best practice remediation tracking includes: a centralized tracking system that records every open finding with its risk rating, agreed remediation date, owner, and current status; automated escalation when findings approach their due date without evidence of completion; a 30/60/90 day follow-up process where the audit team verifies progress and requests evidence of remediation; and a formal closure process that requires both management's attestation that remediation is complete and audit team verification of the evidence before the finding is marked closed.",
        "The audit committee relationship is the governance structure that gives the internal audit function its independence and authority. The audit committee — a committee of independent board members — is the internal audit function's primary client, not management. The Chief Audit Executive (CAE) reports to the audit committee, not to the CEO or CFO. This reporting structure ensures that management cannot suppress or delay audit reports about their own control weaknesses. When management disputes audit findings, the dispute is resolved through the audit committee — the auditor presents the evidence, management presents their position, and the audit committee adjudicates. When findings remain unresolved for extended periods, or when management repeatedly fails to remediate agreed findings, the audit committee has the authority to escalate consequences, including requiring independent review, engaging external auditors, or taking disciplinary action.",
      ],
      technical: {
        title: "Writing an Effective Audit Finding",
        body: [
          "Condition writing requires specificity and objectivity. 'During our review of Q1 2026 production change tickets, we tested a sample of 60 tickets from a population of 1,450 and found that 5 tickets (8.3% of the sample) lacked documented CAB approval prior to production deployment.' This is a well-formed condition: it identifies the period (Q1 2026), the population (1,450 tickets), the sample (60 tickets), the attribute tested (documented CAB approval), and the deviation rate (8.3%). Compare this to a poorly formed condition: 'Change management controls were inadequate.' The second version is an opinion, not a condition — it cannot be disputed or confirmed without additional information.",
          "Criteria writing must cite the specific standard or policy. 'Per the organization's Change Management Policy v2.1 (Section 4.3), all Normal changes must have documented Change Advisory Board approval prior to production deployment. COBIT 2019 objective BAI06 (Managed IT Changes) and ITIL 4 Change Enablement practice both require formal approval by a designated change authority before any Normal change is deployed to production.' This criteria statement gives management no wiggle room about whether a standard was violated — it cites the internal policy by version number, and it references two external frameworks that support the same requirement. When internal policy and external frameworks align, the audit finding is harder to challenge.",
          "Cause analysis is the most important part of the finding for driving effective remediation. 'Root cause: The change management tool (ServiceNow) does not enforce a mandatory approval workflow for Normal changes. The approval field is optional in the current configuration, allowing change tickets to be submitted and deployed without any approval being obtained. Additionally, developers currently have production deployment access, which eliminates the procedural barrier that would otherwise require a separate deployer to obtain approval before deploying.' This cause analysis identifies two distinct root causes — a system configuration gap and an access control gap — both of which must be remediated for the control to operate effectively.",
          "Effect articulation connects the technical finding to business risk in terms the board can evaluate. 'Effect: Unauthorized or untested changes may be deployed to the production trading system, creating risk of: (1) system instability from untested changes causing trading outages, with financial impact estimated at $X per hour of downtime based on average trading volume; (2) unauthorized code in production that could manipulate trading system outputs or exfiltrate sensitive data; (3) SOX Section 404 material weakness, as the change management ITGC supports the auditor's reliance on the trading system's financial outputs — a material weakness finding would require disclosure in the company's annual report and additional procedures by the external auditor.' This effect statement quantifies one impact, identifies a fraud risk, and specifies the regulatory consequence.",
          "Rating calibration across findings within the same report must be consistent. If finding A (terminated user with active account in a non-critical system) and finding B (unauthorized change to a financial reporting system) are both rated 'High,' the ratings are miscalibrated — finding B poses significantly greater risk and should be rated 'Critical.' Auditors must review all findings together before finalizing ratings to ensure relative calibration. Common calibration errors include: over-rating medium-risk findings as high to create urgency, under-rating critical findings to avoid conflict with management, and rating all findings at the same level to simplify management's prioritization burden. Each of these errors disserves the organization by misrepresenting the relative risk profile.",
          "The executive summary is the section of the audit report that most senior executives and board members will read. It must be written for an audience that may not have technical background and that will spend 5–10 minutes on the report. The executive summary should include: the audit scope and period in plain language, the overall audit opinion (effective, partially effective, or ineffective), the number and distribution of findings by risk rating, the highest-priority findings described in business terms (not technical jargon), and the key themes across findings (e.g., 'three of five findings relate to access control gaps in the identity management platform — the root cause of all three is the absence of an automated provisioning/deprovisioning workflow'). An executive summary that requires technical knowledge to understand has failed its purpose.",
          "Audit report quality review is a professional standard requirement. Before the report is issued, it must be reviewed by a senior auditor or audit manager who was not directly involved in testing — providing an independent check on the accuracy, completeness, and tone of the report. The reviewer checks: that every finding has all four Condition-Criteria-Cause-Effect elements; that ratings are consistent and defensible; that management responses are adequate; that the executive summary accurately represents the report content; and that the report language is professional, objective, and free of inflammatory or defensive phrasing. Reports that characterize management as dishonest, negligent, or incompetent — even when evidence supports those characterizations — create unnecessary conflict and may be legally challenged. Audit language should be factual and precise, not pejorative.",
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
          "Wells Fargo's regulatory ordeal beginning in 2016 is the most extensively documented case of repeat audit findings in US banking history. The initial 2016 revelations about unauthorized account opening — 3.5 million accounts created without customer authorization, driven by an internal sales pressure culture — were followed by successive waves of regulatory findings covering auto insurance, mortgage modification, foreign exchange manipulation, and consumer protection violations. The Office of the Comptroller of the Currency (OCC), Consumer Financial Protection Bureau (CFPB), Federal Reserve, and multiple state regulators all issued findings. The Federal Reserve's unprecedented 2018 asset cap — limiting Wells Fargo to the asset size it had as of December 31, 2017, until it demonstrated adequate risk management controls — remains in effect as of 2026.",
          "The pattern of repeat findings at Wells Fargo followed a consistent cycle: regulators or internal audit identified a significant control weakness, management agreed to a remediation plan with specific commitments and timelines, progress reports to regulators showed partial implementation, and the next examination found the same weakness still present. This cycle repeated across multiple business lines and multiple years. The OCC's consent orders document specific instances where management's remediation attestations were inaccurate — where management certified that controls were effective when the subsequent examination found them still deficient. These inaccurate certifications exposed senior executives to personal liability and led to clawbacks of executive compensation.",
          "The organizational diagnosis of Wells Fargo's repeat finding problem revealed structural factors that prevented genuine remediation. The risk management function was not sufficiently independent — it reported to business unit executives rather than to the board, creating pressure to accommodate business priorities over control requirements. The internal audit function had identified many of the same weaknesses years before regulators did but had not escalated effectively to the audit committee. The board's audit committee had not received complete information about the scope and persistence of control deficiencies. The result was a control environment where problems were identified, documented, agreed to be fixed, and then not fixed — a governance failure at every layer of the organization.",
          "Remediation tracking failures were central to the Wells Fargo story. When remediation commitments are tracked only by the business unit responsible for remediation — without independent verification by internal audit or an independent risk function — there is no check on whether reported progress reflects actual control improvement. Wells Fargo's remediation tracking relied heavily on management attestations that specific actions had been taken, without systematic independent testing to verify that those actions had actually produced effective controls. A remediation attestation that the 'process has been revised' is not evidence that the revised process is operating effectively — it requires testing to verify.",
          "For internal audit functions, Wells Fargo established a series of important precedents and lessons. Repeat findings must be escalated to the audit committee, not just reported to management — because repeat findings demonstrate that management's accountability for remediation has failed. The audit committee must have sufficient information about finding persistence, management response quality, and remediation testing results to fulfill its oversight role. Internal audit must test the effectiveness of remediation, not just its occurrence — the difference between 'management completed the agreed actions' and 'the control is now operating effectively' is the difference between process compliance and actual risk reduction. And audit reports must be honest about remediation failures, even when management resists the characterization — a report that characterizes a finding as 'in progress' when the agreed remediation date has passed is not an accurate report.",
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
        "Every finding requires all four elements: Condition (what was found), Criteria (the standard), Cause (root cause), Effect (business risk)",
        "Risk ratings must be calibrated across the report — an unauthorized change to a financial system must be rated higher than a missing recertification for a non-critical system",
        "Remediation tracking at 30/60/90 days is an audit control — verify evidence of remediation, not just management attestation that it occurred",
        "Repeat findings must be escalated directly to the audit committee — repeated failure demonstrates that management accountability has broken down",
        "The audit committee is the internal audit function's primary client — the CAE reports to the audit committee, not to the CEO",
        "Management responses must address condition, root cause, and specific remediation actions — 'we disagree' without factual basis is not an adequate response",
        "Report distribution is a security control — pentest findings and ITGC weakness details are sensitive information requiring access control",
        "Remediation testing verifies control effectiveness, not just action completion — testing whether the revised process works is different from confirming actions were taken",
        "The executive summary must be readable by non-technical board members — findings in technical jargon fail the governance communication purpose",
        "Audit report quality review by an uninvolved senior auditor is a professional standard — the reviewer checks accuracy, completeness, tone, and rating calibration",
      ],
      references: [
        { title: "ISACA IS Audit Standards", url: "https://www.isaca.org/resources/isaca-journal/issues/2016/volume-6/is-auditing-guideline-g16-use-of-caat" },
        { title: "IIA International Standards for the Professional Practice of Internal Auditing", url: "https://www.theiia.org/en/standards/" },
      ],
    },
    quiz: {
      questions: [
        { id: "audit-12-q1", type: "Core Idea", challenge: "The deliverable.", text: "Why is the audit report described as 'the product'?", options: ["It communicates the findings and risk — everything before it is just the work","It's optional","It's only for the auditor","Reports don't matter"], correctIndex: 0, explanation: "The report is what conveys value and drives remediation." },
        { id: "audit-12-q2", type: "Finding Structure", challenge: "Four elements.", text: "What four elements make a complete CISA audit finding?", options: ["Condition, Criteria, Cause, and Effect","Who, What, When, Where","Start, Middle, End, Summary","Risk, Cost, Time, Scope"], correctIndex: 0, explanation: "Condition/Criteria/Cause/Effect: what was found, the standard, why, and the risk." },
        { id: "audit-12-q3", type: "Repeat Findings", challenge: "Seen this before.", text: "How should a repeat finding (unchanged from a prior audit) be handled?", options: ["Escalate directly to the audit committee — management accountability has failed","Give management another remediation period","Drop it","Mark it low risk"], correctIndex: 0, explanation: "Repeat findings go straight to the audit committee." },
        { id: "audit-12-q4", type: "Remediation Tracking", challenge: "30/60/90.", text: "Tracking remediation at 30, 60, and 90 days after the report is best described as…", options: ["An audit control itself — untracked remediation is indistinguishable from none","A formality","Optional follow-up","The client's private matter"], correctIndex: 0, explanation: "Without tracking, remediation can't be verified to have happened." },
        { id: "audit-12-q5", type: "Real Incident", challenge: "Wells Fargo, 2016–2023.", text: "What audit risk does the Wells Fargo case illustrate?", options: ["Management agrees to remediation plans but fails to implement them — producing repeat findings","Auditors fabricated findings","There were no findings","It was a single one-time error"], correctIndex: 0, explanation: "Acknowledged-but-unimplemented findings signal a broken control environment." },
        { id: "audit-12-q6", type: "Definition", challenge: "Spot the repeat.", text: "When is a current finding a 'repeat finding'?", options: ["Same condition and control as a prior-year finding, not remediated in 12+ months","Any new finding","A finding about a different system","A low-risk finding"], correctIndex: 0, explanation: "Same unremediated condition across cycles makes it a repeat." },
        { id: "audit-12-q7", type: "Escalation", challenge: "Why straight to the committee.", text: "Why are repeat findings escalated to the audit committee rather than re-issued to management?", options: ["Management has demonstrably failed to act, so higher oversight is required","Management is always right","The committee writes the code","It's faster to ignore"], correctIndex: 0, explanation: "Repeat failure is an accountability problem for governance to address." },
        { id: "audit-12-q8", type: "Concept", challenge: "Close the loop.", text: "What completes the audit lifecycle after the report is issued?", options: ["Tracked remediation of the findings to verified closure","Filing the report away","Starting an unrelated audit","Deleting the evidence"], correctIndex: 0, explanation: "Verified remediation closes the loop; untracked remediation isn't a control." },
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
          "",
          "─────────────────────────────────────────────────────────────────────",
          "WHAT YOU'RE LEARNING:",
          "  1. Repeat findings bypass management escalation — they go directly to the Audit Committee because management accountability has demonstrably failed",
          "  2. ISACA finding structure: Condition (what was found), Criteria (the standard), Cause (why it exists), Effect (the business risk) — all four elements required",
          "  3. Remediation tracking at 30/60/90 days is an audit control itself; untracked remediation is indistinguishable from no remediation",
          "─────────────────────────────────────────────────────────────────────",
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
