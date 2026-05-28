"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const MermaidDiagram = lazy(() => import("./MermaidDiagram"));

type DocGroup = "general" | "architecture" | "business";

interface DocEntry {
  id: string;
  label: string;
  file: string;
  icon: string;
  color: string;
  group: DocGroup;
  description?: string;
  version?: string;
  updated?: string;
}

const DOCS: DocEntry[] = [
  // General
  { id: "readme", label: "Overview", file: "README.md", icon: "📖", color: "text-white", group: "general" },
  { id: "release-notes", label: "Release Notes", file: "RELEASE_NOTES.md", icon: "📋", color: "text-amber-400", group: "general" },
  { id: "security", label: "Security Briefing", file: "SECURITY_BRIEFING.md", icon: "🔐", color: "text-red-400", group: "general" },
  { id: "ops", label: "Operations", file: "OPS.md", icon: "🖥️", color: "text-green-400", group: "general" },
  { id: "curriculum", label: "Curriculum", file: "CURRICULUM.md", icon: "🎓", color: "text-emerald-400", group: "general" },
  { id: "todo", label: "To-Do & Roadmap", file: "TODO.md", icon: "✅", color: "text-lime-400", group: "general" },
  // Architecture suite
  {
    id: "data-diagram", label: "Data Diagram", file: "DATA_DIAGRAM.md", icon: "🗄️", color: "text-cyan-400", group: "architecture",
    description: "Redis data schema, entity relationships, data flow, and sequence diagrams for all system interactions",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "tech-bom", label: "Tech Bill of Materials", file: "TECH_BOM.md", icon: "📦", color: "text-cyan-300", group: "architecture",
    description: "Complete component registry — every npm package, external service, source file, and API route with version, role, and dependency linkages",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "biz-requirements", label: "Business Requirements", file: "BIZ_REQUIREMENTS.md", icon: "📋", color: "text-blue-400", group: "architecture",
    description: "Business goals, stakeholders, functional and non-functional requirements, revenue model, and constraints",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "technical-design", label: "Technical Design", file: "TECHNICAL_DESIGN.md", icon: "🏗️", color: "text-sky-400", group: "architecture",
    description: "System architecture, key design decisions, auth flow, tier enforcement, leaderboard and trophy design, CI/CD and CSP design",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "user-acceptance", label: "User Acceptance Criteria", file: "USER_ACCEPTANCE_CRITERIA.md", icon: "✔️", color: "text-emerald-400", group: "architecture",
    description: "Detailed Given/When/Then acceptance criteria for every major feature: auth, stages, paywall, leaderboard, trophies, ARIA, admin, security",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "tech-specifications", label: "Technical Specifications", file: "TECH_SPECIFICATIONS.md", icon: "📐", color: "text-indigo-400", group: "architecture",
    description: "TypeScript type definitions, full API specifications with request/response schemas, environment variables, and curriculum data specs",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "testing-strategy", label: "Testing Strategy", file: "TESTING_STRATEGY.md", icon: "🧪", color: "text-purple-400", group: "architecture",
    description: "Unit, integration, E2E (Playwright), UAT, regression, security, and performance testing approaches with tooling and targets",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "cicd-pipeline", label: "CI/CD Pipeline", file: "CICD_PIPELINE.md", icon: "⚙️", color: "text-gray-300", group: "architecture",
    description: "Branch strategy, GitHub Actions workflow, Vercel config, manual deploy procedure, security audit gates, docs sync, and rollback",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "api-reference", label: "API Reference", file: "API_REFERENCE.md", icon: "🔌", color: "text-teal-400", group: "architecture",
    description: "Full specification for all 25 API routes: auth, method, rate limits, request body, response schemas, and error codes",
    version: "v1.0.0", updated: "2026-05-26",
  },
  {
    id: "adr", label: "Architecture Decisions", file: "ADR.md", icon: "📝", color: "text-orange-400", group: "architecture",
    description: "10 Architecture Decision Records documenting key technology choices, rationale, rejected alternatives, and constraints",
    version: "v1.0.0", updated: "2026-05-26",
  },
  // Architecture — existing technical docs surfaced in Architecture section
  {
    id: "architecture", label: "Architecture Overview", file: "ARCHITECTURE.md", icon: "🗺️", color: "text-cyan-300", group: "architecture",
    description: "High-level architecture overview and navigation map",
    version: "v1.7.5", updated: "2026-05-20",
  },
  {
    id: "technical-architecture", label: "Technical Architecture", file: "TECHNICAL_ARCHITECTURE.md", icon: "⚡", color: "text-cyan-400", group: "architecture",
    description: "Detailed technical architecture deep-dive",
    version: "v1.7.5", updated: "2026-05-20",
  },
  {
    id: "build", label: "Build & Deploy", file: "BUILD.md", icon: "🚀", color: "text-gray-400", group: "architecture",
    description: "Build process, deployment steps, and infrastructure setup",
    version: "v1.8.2", updated: "2026-05-22",
  },
  // Business
  { id: "launch-legal", label: "Launch & Legal", file: "LAUNCH_LEGAL.md", icon: "⚖️", color: "text-yellow-400", group: "business" },
  { id: "copyright", label: "Copyright Filing", file: "COPYRIGHT_FILING.md", icon: "©", color: "text-violet-400", group: "business" },
  { id: "partners", label: "Partners", file: "PARTNERS.md", icon: "🤝", color: "text-blue-400", group: "business" },
  { id: "proposal-pro", label: "Business Proposal", file: "BUSINESS_PROPOSAL_PRO.md", icon: "💼", color: "text-purple-400", group: "business" },
  { id: "proposal-casual", label: "Pitch Deck", file: "BUSINESS_PROPOSAL_CASUAL.md", icon: "🚀", color: "text-green-400", group: "business" },
  { id: "pitch-targets", label: "Pitch Targets", file: "PITCH_TARGETS.md", icon: "🎯", color: "text-orange-400", group: "business" },
  { id: "vc-analysis", label: "VC Readiness", file: "VC_READINESS_ANALYSIS.md", icon: "📊", color: "text-emerald-400", group: "business" },
  { id: "financials", label: "Financials & P&L", file: "FINANCIALS.md", icon: "💰", color: "text-yellow-400", group: "business" },
  { id: "cae", label: "CAE: Continuous Monitoring", file: "PITCH_CAE_CONTINUOUS_MONITORING.md", icon: "📡", color: "text-rose-400", group: "business" },
];

const GROUP_LABELS: Record<DocGroup, string> = {
  general: "General",
  architecture: "Architecture",
  business: "Business",
};

const ARCH_INDEX_ID = "arch-index";

const ARCHITECTURE_DOCS = DOCS.filter((d) => d.group === "architecture");

export default function DocsViewer() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeDoc, setActiveDoc] = useState(DOCS[0].id);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<DocGroup | "arch-index">("general");

  function makeComponents(switchTab: (id: string) => void): Components {
    return {
      h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-6 mt-2 leading-tight">{children}</h1>,
      h2: ({ children }) => <h2 className="text-lg font-semibold text-cyan-400 mt-10 mb-3 border-b border-white/10 pb-2">{children}</h2>,
      h3: ({ children }) => <h3 className="text-sm font-semibold text-gray-200 mt-6 mb-2 uppercase tracking-wide">{children}</h3>,
      h4: ({ children }) => <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">{children}</h4>,
      p: ({ children }) => <p className="text-gray-400 mb-4 leading-relaxed text-sm">{children}</p>,
      pre: ({ children }) => (
        <pre className="bg-black/70 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 leading-relaxed">{children}</pre>
      ),
      code: ({ children, className }) => {
        if (className === "language-mermaid") {
          return (
            <Suspense fallback={<div className="h-32 bg-white/3 rounded-lg animate-pulse mb-4" />}>
              <MermaidDiagram code={String(children)} />
            </Suspense>
          );
        }
        const isBlock = className?.startsWith("language-") || String(children).includes("\n");
        return isBlock ? (
          <code className="text-green-300 text-xs font-mono">{children}</code>
        ) : (
          <code className="bg-white/10 text-green-300 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
        );
      },
      ul: ({ children, className }) => {
        const isTaskList = className?.includes("contains-task-list");
        return <ul className={`${isTaskList ? "list-none pl-1" : "list-disc pl-5"} mb-4 space-y-1`}>{children}</ul>;
      },
      ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
      li: ({ children, className }) => {
        const isTaskItem = className?.includes("task-list-item");
        return (
          <li className={`text-gray-400 leading-relaxed text-sm ${isTaskItem ? "flex items-start gap-2 [&>input]:mt-0.5 [&>input]:accent-cyan-400 [&>input]:shrink-0" : ""}`}>
            {children}
          </li>
        );
      },
      strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
      em: ({ children }) => <em className="text-gray-300 italic">{children}</em>,
      a: ({ href, children }) => {
        const docMatch = href ? DOCS.find((d) => d.file === href || href.endsWith(d.file)) : null;
        if (docMatch) {
          return (
            <button
              onClick={() => switchTab(docMatch.id)}
              className="text-cyan-400 hover:text-cyan-300 underline transition-colors cursor-pointer"
            >
              {children}
            </button>
          );
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">
            {children}
          </a>
        );
      },
      table: ({ children }) => (
        <div className="overflow-x-auto mb-6 rounded-lg border border-white/8">
          <table className="w-full text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }) => <thead className="border-b border-white/10 bg-white/3">{children}</thead>,
      tbody: ({ children }) => <tbody>{children}</tbody>,
      tr: ({ children }) => <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">{children}</tr>,
      th: ({ children }) => (
        <th className="text-left px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">{children}</th>
      ),
      td: ({ children }) => <td className="px-4 py-2 text-gray-400 text-sm">{children}</td>,
      hr: () => <hr className="border-white/10 my-8" />,
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-cyan-500/30 pl-4 italic text-gray-500 mb-4 text-sm">{children}</blockquote>
      ),
    };
  }

  useEffect(() => {
    fetch(`/api/docs/${DOCS[0].file}`).then((r) => {
      if (r.status === 401) { router.replace("/stages"); return; }
      setAuthorized(true);
      r.text().then((text) => {
        setContent((prev) => ({ ...prev, [DOCS[0].id]: text }));
      });
      Promise.all(
        DOCS.slice(1).map((doc) =>
          fetch(`/api/docs/${doc.file}`)
            .then((r2) => r2.text())
            .then((text) => [doc.id, text] as [string, string])
        )
      ).then((entries) => {
        setContent((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
        setLoading(false);
      });
    }).catch(() => router.replace("/stages"));
  }, [router]);

  if (!authorized) return null;

  const currentDoc = activeDoc === ARCH_INDEX_ID ? null : DOCS.find((d) => d.id === activeDoc);
  const groups: DocGroup[] = ["general", "architecture", "business"];

  function handleDocSelect(id: string) {
    setActiveDoc(id);
    const doc = DOCS.find((d) => d.id === id);
    if (doc) setActiveGroup(doc.group);
  }

  function handleArchIndex() {
    setActiveDoc(ARCH_INDEX_ID);
    setActiveGroup("arch-index" as DocGroup);
  }

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white">Documentation</h1>
            <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono">
              ADMIN
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Internal project documents — architecture suite, security, business proposals.
          </p>
        </div>

        {/* Group selector */}
        <div className="flex gap-2 mb-4">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => {
                setActiveGroup(g);
                const first = DOCS.find((d) => d.group === g);
                if (first) setActiveDoc(first.id);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeGroup === g || (activeGroup === ("arch-index" as DocGroup) && g === "architecture")
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300"
                  : "border border-white/10 text-gray-600 hover:text-gray-400 hover:border-white/20"
              }`}
            >
              {GROUP_LABELS[g]}
            </button>
          ))}
        </div>

        {/* Tab bar for active group */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Architecture Index tab */}
          {(activeGroup === "architecture" || activeGroup === ("arch-index" as DocGroup)) && (
            <button
              onClick={handleArchIndex}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDoc === ARCH_INDEX_ID
                  ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
                  : "border border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/20"
              }`}
            >
              📐 Architecture Index
            </button>
          )}
          {DOCS.filter((d) => d.group === activeGroup || (activeGroup === ("arch-index" as DocGroup) && d.group === "architecture")).map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleDocSelect(doc.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDoc === doc.id
                  ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
                  : "border border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/20"
              }`}
            >
              {doc.icon} {doc.label}
            </button>
          ))}
        </div>

        {/* Architecture Index view */}
        {activeDoc === ARCH_INDEX_ID && (
          <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
              <span className="text-xl">📐</span>
              <span className="font-semibold text-sm text-cyan-300">Architecture Index</span>
              <span className="text-xs text-gray-700 font-mono ml-auto">
                {ARCHITECTURE_DOCS.length} documents
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/3">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">Document</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">Description</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold w-20">Version</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold w-28">Last Updated</th>
                    <th className="px-4 py-3 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {ARCHITECTURE_DOCS.map((doc) => (
                    <tr key={doc.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDocSelect(doc.id)}
                          className="flex items-center gap-2 text-left group"
                        >
                          <span className="text-base">{doc.icon}</span>
                          <div>
                            <div className={`font-medium text-sm group-hover:underline ${doc.color}`}>{doc.label}</div>
                            <div className="text-xs text-gray-700 font-mono mt-0.5">{doc.file}</div>
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs leading-relaxed max-w-xs">{doc.description ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-cyan-700 bg-cyan-500/5 border border-cyan-500/10 px-1.5 py-0.5 rounded">
                          {doc.version ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs font-mono">{doc.updated ?? "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`/api/docs/${doc.file}`}
                          download={doc.file}
                          className="text-xs text-gray-700 hover:text-gray-400 transition-colors border border-white/8 hover:border-white/20 px-2 py-1 rounded"
                          title="Download"
                        >
                          ↓
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Document card */}
        {activeDoc !== ARCH_INDEX_ID && currentDoc && (
          <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3 flex-wrap">
              <span className="text-xl">{currentDoc.icon}</span>
              <span className={`font-semibold text-sm ${currentDoc.color}`}>{currentDoc.label}</span>
              {currentDoc.version && (
                <span className="text-xs font-mono text-cyan-700 bg-cyan-500/5 border border-cyan-500/10 px-1.5 py-0.5 rounded">
                  {currentDoc.version}
                </span>
              )}
              <span className="text-xs text-gray-700 font-mono ml-auto">{currentDoc.file}</span>
              <a
                href={`/api/docs/${currentDoc.file}`}
                download={currentDoc.file}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors border border-white/8 hover:border-white/20 px-2 py-1 rounded"
              >
                ↓ Download
              </a>
            </div>
            <div className="px-6 py-6">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
              ) : (
                <div className="min-w-0">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={makeComponents(handleDocSelect)}>
                    {content[activeDoc] ?? ""}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
