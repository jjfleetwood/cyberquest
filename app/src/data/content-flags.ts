export type ContentRisk = "needs-attribution" | "fair-use" | "trademark-reference" | "verified-safe";

export type ContentFlag = {
  epochId: string;
  risk: ContentRisk;
  source: string;
  license?: string;
  attributionUrl?: string;
  attributionText: string;
  adminNote: string;
  reviewedAt: string;
};

export const CONTENT_FLAGS: ContentFlag[] = [
  {
    epochId: "mitre",
    risk: "needs-attribution",
    source: "MITRE ATT&CK®",
    license: "CC BY 4.0",
    attributionUrl: "https://attack.mitre.org/",
    attributionText:
      "This module references MITRE ATT&CK® content. MITRE ATT&CK® is a registered trademark of The MITRE Corporation. Content is based on ATT&CK® knowledge base, licensed under CC BY 4.0.",
    adminNote:
      "mitre.ts stages reference specific ATT&CK techniques (T-codes). Attribution banner required on epoch page.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "mitre-atlas",
    risk: "needs-attribution",
    source: "MITRE ATLAS™",
    license: "CC BY 4.0",
    attributionUrl: "https://atlas.mitre.org/",
    attributionText:
      "This module references MITRE ATLAS™ content. MITRE ATLAS™ is developed by The MITRE Corporation. Content is based on the ATLAS knowledge base, licensed under CC BY 4.0.",
    adminNote:
      "mitre-atlas.ts references ATLAS tactics/techniques. Attribution banner required on epoch page.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "owasp-llm",
    risk: "needs-attribution",
    source: "OWASP LLM AI Security & Governance Checklist",
    license: "CC BY-SA 4.0",
    attributionUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    attributionText:
      "This module is based on the OWASP Top 10 for Large Language Model Applications. OWASP® is a registered trademark of the OWASP Foundation. Content adapted under CC BY-SA 4.0.",
    adminNote:
      "owasp-llm.ts stage content maps directly to OWASP LLM01–LLM10 categories. Attribution and SA clause must be respected.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "medieval",
    risk: "fair-use",
    source: "Cisco CVE Database / NVD",
    license: "Public CVE data (NVD)",
    attributionUrl: "https://nvd.nist.gov/",
    attributionText:
      "CVE identifiers and vulnerability descriptions reference the National Vulnerability Database (NVD) and publicly disclosed Cisco advisories. CVE® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "cisco-2.ts references real CVE IDs (e.g. CVE-2023-20198). Educational use of public CVE data is fair use. NVD citation recommended.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "first-journey",
    risk: "fair-use",
    source: "MITRE ATT&CK® (indirect reference)",
    license: "CC BY 4.0",
    attributionUrl: "https://attack.mitre.org/",
    attributionText:
      "Some stages in this module reference ATT&CK® techniques for educational context. MITRE ATT&CK® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "first-journey-3.ts has several stages referencing ATT&CK T-codes. Lower risk than the dedicated MITRE epoch, but attribution is best practice.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "tech-audit-2",
    risk: "fair-use",
    source: "OWASP (indirect reference)",
    license: "CC BY-SA 4.0",
    attributionUrl: "https://owasp.org/",
    attributionText:
      "Some stages reference OWASP guidance for educational purposes. OWASP® is a registered trademark of the OWASP Foundation.",
    adminNote:
      "tech-audit-2.ts and tech-audit-3.ts contain OWASP references in scenario text. Risk is low but worth a footer note.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "quantum-1",
    risk: "verified-safe",
    source: "NIST / FIPS Standards",
    attributionText:
      "References to NIST standards (FIPS 203/204/205, SP 800-series) are citations of public domain U.S. government publications.",
    adminNote:
      "NIST publications are public domain. No license restrictions. Safe to reference without attribution.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "quantum-2",
    risk: "verified-safe",
    source: "NIST / FIPS Standards",
    attributionText:
      "References to NIST standards (FIPS 203/204/205, SP 800-series) are citations of public domain U.S. government publications.",
    adminNote: "Public domain government works. No restrictions.",
    reviewedAt: "2026-05-20",
  },
  {
    epochId: "quantum-3",
    risk: "verified-safe",
    source: "NIST / NSA public advisories",
    attributionText:
      "References to NSA/NIST quantum-transition advisories are citations of public domain U.S. government documents.",
    adminNote: "Public domain. Safe.",
    reviewedAt: "2026-05-20",
  },
];

const EPOCH_FLAGS = new Map(CONTENT_FLAGS.map((f) => [f.epochId, f]));

export function getContentFlag(epochId: string): ContentFlag | undefined {
  return EPOCH_FLAGS.get(epochId);
}

export function flagsNeedingAttribution(): ContentFlag[] {
  return CONTENT_FLAGS.filter((f) => f.risk === "needs-attribution");
}

export function flagsByRisk(risk: ContentRisk): ContentFlag[] {
  return CONTENT_FLAGS.filter((f) => f.risk === risk);
}
