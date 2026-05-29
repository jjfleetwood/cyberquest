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
    epochId: "ancient",
    risk: "fair-use",
    source: "NIST / General cybersecurity principles / Factual historical incidents",
    license: "Public domain (NIST); Factual public record",
    attributionUrl: "https://csrc.nist.gov/",
    attributionText:
      "This module references the CIA Triad (Confidentiality, Integrity, Availability), a foundational information security model documented in NIST publications (public domain U.S. government works). Historical incident references (Target 2013, etc.) are factual public record.",
    adminNote:
      "stages.ts 'ancient' epoch stages cover the CIA Triad, SQL injection, phishing, zero-day concepts, and classic attack patterns. All concepts are industry-standard education. NIST citations are public domain. Historical incidents cited factually. No verbatim reproduction of proprietary content.",
    reviewedAt: "2026-05-22",
  },
  // ── Tech Audit epochs ─────────────────────────────────────────────────────
  {
    epochId: "tech-audit-1",
    risk: "fair-use",
    source: "ISACA / COBIT 2019 / NIST / PCI DSS / ITIL / CIS",
    license: "Commercial frameworks — educational fair use",
    attributionUrl: "https://www.isaca.org/",
    attributionText:
      "This module references ISACA® frameworks including COBIT® 2019, CISA®, and CRISC®, which are registered trademarks of ISACA. Additional references include NIST SP 800-series publications (public domain), PCI DSS® (PCI Security Standards Council), SOX Section 404 (U.S. federal law), HIPAA (U.S. federal law), GDPR (EU regulation), ITIL® (PeopleCert), and CIS Benchmarks™ (Center for Internet Security). All content is used for educational purposes.",
    adminNote:
      "tech-audit-1.ts references COBIT 2019 control objectives, CISA/CRISC certifications, NIST SP 800-30/34/53, PCAOB AS 2201, GDPR, CCPA, HIPAA, PCI DSS, ITIL v2/v4, and CIS Docker/Kubernetes benchmarks. Educational use of commercial standards. No verbatim reproduction of proprietary frameworks.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "tech-audit-2",
    risk: "needs-attribution",
    source: "OWASP API Security Top 10 2023 / NIST / CIS / CISA",
    license: "CC BY-SA 4.0 (OWASP); Public domain (NIST/CISA)",
    attributionUrl: "https://owasp.org/API-Security/",
    attributionText:
      "This module references the OWASP API Security Top 10 2023. OWASP® is a registered trademark of the OWASP Foundation. Content adapted for educational use under CC BY-SA 4.0. Additional references include NIST SP 800-53/800-161 (public domain U.S. government publications), CIS AWS Foundations Benchmark™ (Center for Internet Security), and CISA Supply Chain Risk Management guidelines (public domain).",
    adminNote:
      "tech-audit-2.ts stages directly map to OWASP API Top 10 categories (BOLA, Broken Authentication, etc.) and cite OWASP A07:2021/A02:2021. Attribution banner required. ShareAlike clause applies to any redistribution of OWASP content.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "tech-audit-3",
    risk: "needs-attribution",
    source: "Anthropic Claude API / Model Context Protocol / NIST / CIS / OWASP",
    license: "Anthropic public documentation; CC BY-SA 4.0 (OWASP); Public domain (NIST/CIS)",
    attributionUrl: "https://docs.anthropic.com/",
    attributionText:
      "This module references Claude™ and the Model Context Protocol (MCP), developed by Anthropic. Claude™ is a trademark of Anthropic PBC. MCP is an open protocol published by Anthropic. Additional references include OWASP Secrets Management Cheat Sheet (CC BY-SA 4.0), NIST SP 800-137A (public domain), CIS AWS Foundations Benchmark v1.4™ (Center for Internet Security), and HashiCorp Vault® (HashiCorp, Inc.).",
    adminNote:
      "tech-audit-3.ts stages are built around Claude tool-use workflows and MCP server templates. Anthropic is a commercial company — explicit attribution for Claude/MCP is appropriate. HashiCorp Vault is referenced descriptively (not reproduced). No proprietary API documentation is copied verbatim.",
    reviewedAt: "2026-05-21",
  },
  {
    epochId: "tech-audit-4",
    risk: "fair-use",
    source: "NIST / FIPS / CIS / OASIS STIX-TAXII / CISA",
    license: "Public domain (NIST/FIPS/CISA); Open standard (OASIS)",
    attributionUrl: "https://csrc.nist.gov/publications/detail/sp/800-137/final",
    attributionText:
      "This module references NIST SP 800-137/137A (Information Security Continuous Monitoring), NIST SP 800-207 (Zero Trust Architecture), and FIPS 199 (public domain U.S. government publications). Additional references include CIS Benchmarks™ for Docker, Kubernetes, and AWS (Center for Internet Security), STIX™ 2.1 and TAXII™ 2.1 (OASIS open standards), and CISA Automated Indicator Sharing (public domain).",
    adminNote:
      "tech-audit-4.ts references ISCM framework concepts from NIST 800-137, Zero Trust from NIST 800-207, FIPS 199 impact levels, CIS benchmarks, STIX/TAXII threat intel standards, CISA AIS, FS-ISAC/H-ISAC/E-ISAC sector sharing orgs, and Five Eyes Volt Typhoon disclosure. All public domain or openly licensed. No verbatim reproduction.",
    reviewedAt: "2026-05-21",
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
  {
    epochId: "quantum-4",
    risk: "verified-safe",
    source: "NIST / CISA / NSA public advisories and standards",
    attributionText:
      "References to NIST FIPS 203/204/205, CISA Post-Quantum Cybersecurity Roadmap, NSA CNSA 2.0, OMB M-23-02, and SEC cybersecurity disclosure rules are citations of public domain U.S. government publications and open regulatory guidance.",
    adminNote:
      "All source material is public domain U.S. government publications (NIST, CISA, NSA, SEC, OMB) or openly published standards (IETF RFCs, CycloneDX CBOM). No proprietary content. SWIFT reference is to publicly available SWIFT PQC working group disclosures. Safe.",
    reviewedAt: "2026-05-29",
  },
  {
    epochId: "emerging-tech",
    risk: "fair-use",
    source: "MITRE ATLAS™ / OWASP Top 10 for LLMs / NIST AI RMF / EU AI Act / Academic research",
    license: "CC BY 4.0 (MITRE ATLAS); CC BY-SA 4.0 (OWASP LLM Top 10)",
    attributionUrl: "https://atlas.mitre.org/",
    attributionText:
      "This module references MITRE ATLAS™ (The MITRE Corporation, CC BY 4.0) and the OWASP Top 10 for Large Language Model Applications (OWASP Foundation, CC BY-SA 4.0) as educational references. MITRE ATLAS™ is a trademark of The MITRE Corporation. OWASP® is a registered trademark of the OWASP Foundation. Additional references include NIST AI RMF 1.0 (public domain), EU AI Act (public EU regulation), C2PA (open standard), and published academic research cited by title and author.",
    adminNote:
      "emerging-tech.ts cites MITRE ATLAS (CC BY 4.0) in stages emerging-01 and emerging-08, and OWASP LLM Top 10 (CC BY-SA 4.0) in emerging-08. Content cites these frameworks as external authorities without reproducing structured technique listings (those are covered by the dedicated mitre-atlas and owasp-llm epochs). Risk is fair-use, not verified-safe. MITRE ATLAS is NOT public domain — it is CC BY 4.0, same license as MITRE ATT&CK. All other sources (NIST AI RMF, EU AI Act, academic papers, news incidents) are public domain or factual citation. Company logos (Keras, Hugging Face, Google, OpenAI, NVIDIA, Anthropic, WEF) are nominative trademark fair use consistent with umbrella and Cisco epoch practice.",
    reviewedAt: "2026-05-29",
  },
  {
    epochId: "umbrella",
    risk: "fair-use",
    source: "Cisco Umbrella® / Cisco Talos® / OpenDNS / NVD CVE data",
    license: "Commercial product — educational reference",
    attributionUrl: "https://umbrella.cisco.com/",
    attributionText:
      "This module references Cisco Umbrella® and Cisco Talos® threat intelligence, which are products and services of Cisco Systems, Inc. Cisco®, Cisco Umbrella®, and Cisco Talos® are registered trademarks of Cisco Systems, Inc. Content is used for educational purposes only and is not affiliated with or endorsed by Cisco.",
    adminNote:
      "umbrella.ts stages teach DNS-layer security concepts using Cisco Umbrella as the reference platform. Cisco and Talos are referenced descriptively as real-world tools, not reproduced verbatim. CVE references are public NVD data. No proprietary Cisco documentation copied. Educational fair use.",
    reviewedAt: "2026-05-22",
  },
  // ── Arts epochs ───────────────────────────────────────────────────────────
  {
    epochId: "tapestry",
    risk: "verified-safe",
    source: "General fiber arts / historical weaving knowledge",
    attributionText:
      "Tapestry and weaving content is based on publicly available fiber arts knowledge, historical textile techniques, and original quiz questions.",
    adminNote:
      "tapestry.ts covers weaving techniques, loom mechanics, and fiber arts history. All content is original or based on public-domain historical information. No proprietary patterns, trademarks, or copyrighted material reproduced.",
    reviewedAt: "2026-05-22",
  },
  {
    epochId: "nails",
    risk: "verified-safe",
    source: "General nail care / cosmetology education",
    attributionText:
      "Nail care and nail art content is based on publicly available cosmetology knowledge and original educational questions.",
    adminNote:
      "nails.ts covers nail anatomy, nail art techniques, product chemistry (acid-free primers, gel polish), and professional nail care. All content is original. No proprietary brand content reproduced.",
    reviewedAt: "2026-05-22",
  },
  {
    epochId: "hair-color",
    risk: "verified-safe",
    source: "General cosmetology / color theory",
    attributionText:
      "Hair color content is based on publicly available cosmetology education, color wheel theory, and hair chemistry knowledge.",
    adminNote:
      "hair-color.ts covers color theory, oxidative chemistry, toning, and color correction. All concepts are standard cosmetology curriculum knowledge. No proprietary salon brand content reproduced.",
    reviewedAt: "2026-05-22",
  },
  {
    epochId: "hair-styling",
    risk: "fair-use",
    source: "General cosmetology / Andre Walker hair typing system",
    attributionText:
      "Hair styling content references hair typing systems based on publicly available cosmetology knowledge. The 1–4 hair type classification popularized by Andre Walker is referenced as an educational industry standard.",
    adminNote:
      "hair-styling.ts references the Andre Walker hair type system (1A–4C) as an industry-standard classification shorthand. This system is widely documented in public cosmetology literature. Referenced descriptively, not reproduced from any proprietary publication. No IP risk.",
    reviewedAt: "2026-05-22",
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

  // ── Cisco Advanced ────────────────────────────────────────────────────────
  {
    epochId: "cisco-advanced",
    risk: "fair-use",
    source: "Cisco CVE Database / NVD / Cisco Talos / CISA KEV",
    license: "Public CVE data (NVD)",
    attributionUrl: "https://nvd.nist.gov/",
    attributionText:
      "CVE identifiers and vulnerability descriptions reference the National Vulnerability Database (NVD) and publicly disclosed Cisco advisories. CVE® is a registered trademark of The MITRE Corporation.",
    adminNote:
      "cisco-advanced stages (m39–m50) reference real Cisco CVEs including advanced persistent threat campaign data from Talos and CISA KEV. Educational fair use of public vulnerability data.",
    reviewedAt: "2026-05-28",
  },

  // ── Travel epochs ─────────────────────────────────────────────────────────
  {
    epochId: "paris-july",
    risk: "verified-safe",
    source: "Public tourism data / historical facts / CC-licensed images (Wikimedia Commons)",
    attributionText:
      "Paris city guide content is based on publicly available tourism information, historical records, and factual geographic data. Images sourced from Wikimedia Commons under Creative Commons licenses.",
    adminNote:
      "paris.ts stages cover transport, landmarks, history, and culture using factual public information. All museum/attraction data is publicly available. No proprietary tourism content reproduced. Wikimedia Commons images used under CC licenses.",
    reviewedAt: "2026-05-28",
  },
  {
    epochId: "milan-july",
    risk: "verified-safe",
    source: "Public tourism data / historical facts / CC-licensed images (Wikimedia Commons)",
    attributionText:
      "Milan city guide content is based on publicly available tourism information, historical records, and factual geographic data. Images sourced from Wikimedia Commons under Creative Commons licenses.",
    adminNote:
      "milan.ts stages cover transport, landmarks, history, and culture using factual public information. All museum/attraction data is publicly available. No proprietary tourism content reproduced.",
    reviewedAt: "2026-05-28",
  },
  {
    epochId: "french-basics",
    risk: "verified-safe",
    source: "General French language education / public cultural knowledge",
    attributionText:
      "French language content is based on general public-domain linguistic knowledge, standard conversational French phrases, and factual French cultural information.",
    adminNote:
      "french-basics.ts covers standard conversational French, cultural practices, and public-domain language facts. No proprietary language course content reproduced. Original educational questions.",
    reviewedAt: "2026-05-28",
  },
  {
    epochId: "italian-basics",
    risk: "verified-safe",
    source: "General Italian language education / public cultural knowledge",
    attributionText:
      "Italian language content is based on general public-domain linguistic knowledge, standard conversational Italian phrases, and factual Italian cultural information.",
    adminNote:
      "italian-basics.ts covers standard conversational Italian, cultural practices, and public-domain language facts. The 1986 methanol wine scandal is factual public record. No proprietary content reproduced.",
    reviewedAt: "2026-05-28",
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
