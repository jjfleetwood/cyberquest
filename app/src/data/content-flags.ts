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
    epochId: "cisco-core",
    risk: "fair-use",
    source: "Cisco CVE Database / NVD",
    license: "Public CVE data (NVD)",
    attributionUrl: "https://nvd.nist.gov/",
    attributionText:
      "CVE identifiers and vulnerability descriptions reference the National Vulnerability Database (NVD) and publicly disclosed Cisco advisories. CVE® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "cisco-core stages (m01-m12) reference real Cisco CVEs. Educational use of public CVE data is fair use. NVD citation recommended.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "cisco-enterprise",
    risk: "fair-use",
    source: "Cisco CVE Database / NVD / Cisco Talos",
    license: "Public CVE data (NVD)",
    attributionUrl: "https://nvd.nist.gov/",
    attributionText:
      "CVE identifiers and vulnerability descriptions reference the National Vulnerability Database (NVD) and publicly disclosed Cisco advisories. CVE® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "cisco-enterprise stages (m13-m25) reference real Cisco CVEs including ArcaneDoor and Velvet Ant campaign data. Educational fair use.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "cisco-secops",
    risk: "fair-use",
    source: "Cisco CVE Database / NVD / Cisco Talos / CISA",
    license: "Public CVE data (NVD)",
    attributionUrl: "https://nvd.nist.gov/",
    attributionText:
      "CVE identifiers and vulnerability descriptions reference the National Vulnerability Database (NVD) and publicly disclosed Cisco advisories. CVE® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "cisco-secops stages (m26-m38) reference Cisco security platform CVEs, CyberOps Associate curriculum topics, and public Talos/CISA threat reports. Educational fair use.",
    reviewedAt: "2026-05-21",
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
  // ── Driving epochs ────────────────────────────────────────────────────────
  {
    epochId: "driving-1",
    risk: "verified-safe",
    source: "California DMV — public traffic law",
    attributionText:
      "Quiz content is based on California Vehicle Code and public DMV driver handbook topics. All questions are original.",
    adminNote:
      "CA DMV handbook is a public government document. Quiz questions are original — not copied from any DMV test. No IP risk.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "driving-2",
    risk: "verified-safe",
    source: "California DMV — public traffic law",
    attributionText:
      "Quiz content is based on California Vehicle Code and public DMV driver handbook topics. All questions are original.",
    adminNote: "Same as driving-1. Original questions derived from public law topics.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "driving-3",
    risk: "verified-safe",
    source: "California DMV — public traffic law",
    attributionText:
      "Quiz content is based on California Vehicle Code and public DMV driver handbook topics. All questions are original.",
    adminNote: "Same as driving-1. Original questions derived from public law topics.",
    reviewedAt: "2026-05-21",
  },

  // ── Baseball epochs ───────────────────────────────────────────────────────
  {
    epochId: "baseball-1",
    risk: "fair-use",
    source: "MLB / Little League Baseball",
    attributionText:
      "Baseball rules, terminology, and historical references are factual information used for educational purposes.",
    adminNote:
      "Player names, team names, and statistics are factual data — not copyrightable. 'Little League®' is a registered trademark but is referenced only as a descriptive term. No logos or official marks used. Educational fair use.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-2",
    risk: "fair-use",
    source: "MLB / Los Angeles Dodgers historical record",
    attributionText:
      "Hitting mechanics and Dodgers history references are based on publicly available statistical records and factual historical information.",
    adminNote:
      "Dodgers® is a registered trademark of MLB. References are educational/factual (historical records, stats). No marks reproduced. Fair use for education.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-3",
    risk: "fair-use",
    source: "MLB / Statcast / Baseball Savant",
    attributionText:
      "Advanced hitting mechanics content references publicly available Statcast data and biomechanics research for educational purposes.",
    adminNote:
      "Statcast is MLB/Baseball Savant data, publicly accessible. Referenced factually. No data reproduced verbatim.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-4",
    risk: "fair-use",
    source: "MLB historical record / Statcast",
    attributionText:
      "Elite hitting content references publicly available MLB statistical records and historical performance data for educational purposes.",
    adminNote: "Same as baseball-3. Factual stats and records. Educational use.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-5",
    risk: "fair-use",
    source: "MLB / Los Angeles Dodgers historical record",
    attributionText:
      "Pitching mechanics content references publicly available technique descriptions and historical records for educational purposes.",
    adminNote:
      "Clayton Kershaw is referenced by name as a factual pitching example. Player names are not IP. Educational use.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-6",
    risk: "fair-use",
    source: "MLB / Rapsodo / Trackman",
    attributionText:
      "Pitch arsenal content references publicly available spin rate data and pitch classification information for educational purposes.",
    adminNote:
      "Rapsodo® and Trackman® are trademarks referenced descriptively as measurement tools. No marks reproduced. Fair use.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "baseball-7",
    risk: "fair-use",
    source: "MLB historical record",
    attributionText:
      "Pitching strategy content references publicly available historical records and factual career statistics for educational purposes.",
    adminNote:
      "Koufax, Drysdale, Hershiser, Kershaw referenced factually. Historical stats are public record. No IP risk.",
    reviewedAt: "2026-05-21",
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
