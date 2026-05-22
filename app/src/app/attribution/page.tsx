import Link from "next/link";

const ATTRIBUTIONS = [
  {
    name: "MITRE ATT&CK®",
    owner: "The MITRE Corporation",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://attack.mitre.org/",
    description:
      "The MITRE ATT&CK® epoch uses the ATT&CK® knowledge base as a framework for its tactic and technique curriculum. MITRE ATT&CK® is a registered trademark of The MITRE Corporation.",
    modules: ["MITRE ATT&CK epoch", "First Journey — stages referencing ATT&CK techniques"],
  },
  {
    name: "MITRE ATLAS™",
    owner: "The MITRE Corporation",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://atlas.mitre.org/",
    description:
      "The MITRE ATLAS™ epoch is based on the ATLAS knowledge base for adversarial machine learning threats. MITRE ATLAS™ is a trademark of The MITRE Corporation.",
    modules: ["MITRE ATLAS epoch"],
  },
  {
    name: "OWASP LLM Top 10",
    owner: "OWASP Foundation, Inc.",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    description:
      "The OWASP LLM epoch is adapted from the OWASP Top 10 for Large Language Model Applications. OWASP® is a registered trademark of the OWASP Foundation, Inc.",
    modules: ["OWASP LLM Top 10 epoch", "Tech Audit modules referencing OWASP guidance"],
  },
  {
    name: "CVE® / National Vulnerability Database",
    owner: "The MITRE Corporation / NIST",
    license: "Public — NVD Data Use Policy",
    licenseUrl: "https://nvd.nist.gov/general/nvd-data-use-policy",
    sourceUrl: "https://nvd.nist.gov/",
    description:
      "Cisco CVE missions reference publicly disclosed CVE identifiers and vulnerability descriptions from the National Vulnerability Database (NVD). CVE® is a registered trademark of The MITRE Corporation. NVD data is provided by NIST.",
    modules: ["Cisco CVE epoch"],
  },
  {
    name: "NIST / FIPS Standards",
    owner: "National Institute of Standards and Technology (U.S. Government)",
    license: "Public Domain",
    licenseUrl: "https://www.nist.gov/open",
    sourceUrl: "https://csrc.nist.gov/",
    description:
      "Quantum Era modules reference NIST post-quantum cryptography standards (FIPS 203, 204, 205) and NIST Special Publications (SP 800-137, 800-207, 800-30, 800-34, 800-53, 800-161). Tech Audit modules reference NIST SP 800-series control frameworks. NIST publications are works of the U.S. Government and are in the public domain.",
    modules: ["Quantum Era epochs (Quantum 1, 2, 3)", "Tech Audit epochs (1, 2, 4)"],
  },
  {
    name: "ISACA® / COBIT® 2019",
    owner: "ISACA",
    license: "Educational fair use — no verbatim reproduction",
    licenseUrl: "https://www.isaca.org/resources/cobit",
    sourceUrl: "https://www.isaca.org/",
    description:
      "Tech Audit modules reference ISACA® frameworks including COBIT® 2019 control objectives and the CISA® and CRISC® certification domains. ISACA®, COBIT®, CISA®, and CRISC® are registered trademarks of ISACA. No proprietary ISACA content is reproduced verbatim; references are descriptive and educational.",
    modules: ["Tech Audit 1"],
  },
  {
    name: "OWASP API Security Top 10 (2023)",
    owner: "OWASP Foundation, Inc.",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://owasp.org/API-Security/",
    description:
      "Tech Audit 2 stages map directly to OWASP API Security Top 10 2023 categories including BOLA (API1), Broken Authentication (API2), and others. OWASP® is a registered trademark of the OWASP Foundation, Inc. Content is adapted for educational use under CC BY-SA 4.0. The ShareAlike clause applies to any redistribution of adapted OWASP content.",
    modules: ["Tech Audit 2"],
  },
  {
    name: "CIS Benchmarks™",
    owner: "Center for Internet Security, Inc.",
    license: "Educational fair use",
    licenseUrl: "https://www.cisecurity.org/cis-benchmarks/cis-benchmarks-faq/",
    sourceUrl: "https://www.cisecurity.org/",
    description:
      "Tech Audit modules reference CIS Benchmarks™ for Docker, Kubernetes, and AWS (CIS AWS Foundations Benchmark™). CIS Benchmarks™ are trademarks of the Center for Internet Security, Inc. References are descriptive and educational; no benchmark content is reproduced verbatim.",
    modules: ["Tech Audit 1", "Tech Audit 2", "Tech Audit 4"],
  },
  {
    name: "ITIL®",
    owner: "PeopleCert International Ltd.",
    license: "Educational fair use — trademark reference only",
    licenseUrl: "https://www.peoplecert.org/",
    sourceUrl: "https://www.axelos.com/certifications/itil-service-management/",
    description:
      "Tech Audit 1 references ITIL® v2 and v4 service management framework concepts. ITIL® is a registered trademark of PeopleCert International Ltd. References are descriptive and educational; no ITIL® content is reproduced verbatim.",
    modules: ["Tech Audit 1"],
  },
  {
    name: "PCI DSS®",
    owner: "PCI Security Standards Council, LLC",
    license: "Educational fair use — trademark reference only",
    licenseUrl: "https://www.pcisecuritystandards.org/",
    sourceUrl: "https://www.pcisecuritystandards.org/document_library/",
    description:
      "Tech Audit 1 references PCI DSS® (Payment Card Industry Data Security Standard) requirements. PCI DSS® is a registered trademark of PCI Security Standards Council, LLC. References are descriptive and educational; no PCI DSS® specification text is reproduced verbatim.",
    modules: ["Tech Audit 1"],
  },
  {
    name: "Claude™ / Model Context Protocol (MCP)",
    owner: "Anthropic PBC",
    license: "Anthropic public documentation",
    licenseUrl: "https://www.anthropic.com/legal/usage-policy",
    sourceUrl: "https://docs.anthropic.com/",
    description:
      "Tech Audit 3 stages are built around Claude™ tool-use workflows and Model Context Protocol (MCP) server integration patterns. Claude™ is a trademark of Anthropic PBC. MCP is an open protocol published by Anthropic. References are based on Anthropic's publicly available documentation. No proprietary Anthropic content is reproduced verbatim.",
    modules: ["Tech Audit 3"],
  },
  {
    name: "HashiCorp Vault®",
    owner: "HashiCorp, Inc.",
    license: "Educational fair use — trademark reference only",
    licenseUrl: "https://www.hashicorp.com/products/vault",
    sourceUrl: "https://www.vaultproject.io/",
    description:
      "Tech Audit 3 references HashiCorp Vault® as a secrets management solution in the context of cloud security workflows. HashiCorp Vault® is a registered trademark of HashiCorp, Inc. References are descriptive and educational; no HashiCorp documentation is reproduced verbatim.",
    modules: ["Tech Audit 3"],
  },
  {
    name: "STIX™ / TAXII™ (OASIS Open Standards)",
    owner: "OASIS Open",
    license: "OASIS open standard",
    licenseUrl: "https://www.oasis-open.org/policies-guidelines/ipr/",
    sourceUrl: "https://oasis-open.github.io/cti-documentation/",
    description:
      "Tech Audit 4 references STIX™ 2.1 (Structured Threat Intelligence eXpression) and TAXII™ 2.1 (Trusted Automated eXchange of Intelligence Information) as threat intelligence sharing standards. STIX™ and TAXII™ are trademarks of OASIS Open. These are open standards freely available for implementation.",
    modules: ["Tech Audit 4"],
  },
];

export default function AttributionPage() {
  return (
    <div className="min-h-screen px-4 py-16" style={{ background: "linear-gradient(160deg,#040c1e 0%,#071428 60%,#040c1e 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-600 hover:text-gray-400 text-sm mb-8 inline-block transition-colors">
          ← Home
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">Attributions & Licenses</h1>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          Kryptós CronOS incorporates references to publicly licensed third-party frameworks and standards.
          All original platform code, curriculum design, stage scenarios, and content not listed below are
          proprietary to Kryptós CronOS and protected by copyright.
        </p>

        <div className="space-y-6">
          {ATTRIBUTIONS.map((attr) => (
            <div
              key={attr.name}
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="px-6 py-4 border-b border-white/5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-white font-bold text-base">{attr.name}</h2>
                    <p className="text-xs text-gray-600 mt-0.5">{attr.owner}</p>
                  </div>
                  <a
                    href={attr.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/8 text-amber-400 hover:bg-amber-500/15 transition-colors flex-shrink-0"
                  >
                    {attr.license} ↗
                  </a>
                </div>
              </div>
              <div className="px-6 py-4 space-y-3">
                <p className="text-sm text-gray-400 leading-relaxed">{attr.description}</p>
                <div className="flex items-start gap-3 flex-wrap">
                  <div>
                    <div className="text-xs text-gray-700 uppercase tracking-wider mb-1">Used in</div>
                    <div className="flex flex-wrap gap-1.5">
                      {attr.modules.map((m) => (
                        <span key={m} className="text-xs px-2 py-0.5 rounded bg-white/4 border border-white/8 text-gray-500">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={attr.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-cyan-500 hover:text-cyan-400 transition-colors self-end"
                  >
                    Source ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/8 text-xs text-gray-700 leading-relaxed space-y-2">
          <p>
            All original content — including application source code, stage scenarios, CTF challenges, quiz questions,
            UI design, and educational narratives — is © 2026 Kryptós CronOS. All rights reserved.
          </p>
          <p>
            Third-party trademarks and registered marks are the property of their respective owners.
            Reference to any third-party framework or standard does not imply endorsement.
          </p>
        </div>
      </div>
    </div>
  );
}
