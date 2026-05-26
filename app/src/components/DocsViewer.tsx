"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const DOCS = [
  { id: "readme", label: "Overview", file: "README.md", icon: "📖", color: "text-white" },
  { id: "release-notes", label: "Release Notes", file: "RELEASE_NOTES.md", icon: "📋", color: "text-amber-400" },
  { id: "launch-legal", label: "Launch & Legal", file: "LAUNCH_LEGAL.md", icon: "⚖️", color: "text-yellow-400" },
  { id: "security", label: "Security Briefing", file: "SECURITY_BRIEFING.md", icon: "🔐", color: "text-red-400" },
  { id: "architecture", label: "Technical Architecture", file: "TECHNICAL_ARCHITECTURE.md", icon: "🏗️", color: "text-cyan-400" },
  { id: "architecture-md", label: "Architecture", file: "ARCHITECTURE.md", icon: "🗺️", color: "text-cyan-300" },
  { id: "build", label: "Build & Deploy", file: "BUILD.md", icon: "⚙️", color: "text-gray-400" },
  { id: "ops", label: "Operations", file: "OPS.md", icon: "🖥️", color: "text-green-400" },
  { id: "curriculum", label: "Curriculum", file: "CURRICULUM.md", icon: "🎓", color: "text-emerald-400" },
  { id: "partners", label: "Partners", file: "PARTNERS.md", icon: "🤝", color: "text-blue-400" },
  { id: "proposal-pro", label: "Business Proposal", file: "BUSINESS_PROPOSAL_PRO.md", icon: "💼", color: "text-purple-400" },
  { id: "proposal-casual", label: "Pitch Deck", file: "BUSINESS_PROPOSAL_CASUAL.md", icon: "🚀", color: "text-green-400" },
  { id: "pitch-targets", label: "Pitch Targets", file: "PITCH_TARGETS.md", icon: "🎯", color: "text-orange-400" },
  { id: "todo", label: "To-Do & Roadmap", file: "TODO.md", icon: "✅", color: "text-lime-400" },
  { id: "copyright", label: "Copyright Filing", file: "COPYRIGHT_FILING.md", icon: "©", color: "text-violet-400" },
  { id: "vc-analysis", label: "VC Readiness Analysis", file: "VC_READINESS_ANALYSIS.md", icon: "📊", color: "text-emerald-400" },
];


export default function DocsViewer() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeDoc, setActiveDoc] = useState(DOCS[0].id);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  function makeComponents(switchTab: (id: string) => void): Components {
    return {
      h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-2xl font-bold text-white mb-6 mt-2 leading-tight">{children}</h1>,
      h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-lg font-semibold text-cyan-400 mt-10 mb-3 border-b border-white/10 pb-2">{children}</h2>,
      h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-sm font-semibold text-gray-200 mt-6 mb-2 uppercase tracking-wide">{children}</h3>,
      h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">{children}</h4>,
      p: ({ children }: { children?: React.ReactNode }) => <p className="text-gray-400 mb-4 leading-relaxed text-sm">{children}</p>,
      pre: ({ children }: { children?: React.ReactNode }) => (
        <pre className="bg-black/70 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 leading-relaxed">{children}</pre>
      ),
      code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const isBlock = className?.startsWith("language-") || String(children).includes("\n");
        return isBlock ? (
          <code className="text-green-300 text-xs font-mono">{children}</code>
        ) : (
          <code className="bg-white/10 text-green-300 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
        );
      },
      ul: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const isTaskList = className?.includes("contains-task-list");
        return <ul className={`${isTaskList ? "list-none pl-1" : "list-disc pl-5"} mb-4 space-y-1`}>{children}</ul>;
      },
      ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
      li: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const isTaskItem = className?.includes("task-list-item");
        return (
          <li className={`text-gray-400 leading-relaxed text-sm ${isTaskItem ? "flex items-start gap-2 [&>input]:mt-0.5 [&>input]:accent-cyan-400 [&>input]:shrink-0" : ""}`}>
            {children}
          </li>
        );
      },
      strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-white font-semibold">{children}</strong>,
      em: ({ children }: { children?: React.ReactNode }) => <em className="text-gray-300 italic">{children}</em>,
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
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
      table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto mb-6 rounded-lg border border-white/8">
          <table className="w-full text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }: { children?: React.ReactNode }) => <thead className="border-b border-white/10 bg-white/3">{children}</thead>,
      tbody: ({ children }: { children?: React.ReactNode }) => <tbody>{children}</tbody>,
      tr: ({ children }: { children?: React.ReactNode }) => <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">{children}</tr>,
      th: ({ children }: { children?: React.ReactNode }) => (
        <th className="text-left px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">{children}</th>
      ),
      td: ({ children }: { children?: React.ReactNode }) => <td className="px-4 py-2 text-gray-400 text-sm">{children}</td>,
      hr: () => <hr className="border-white/10 my-8" />,
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="border-l-2 border-cyan-500/30 pl-4 italic text-gray-500 mb-4 text-sm">{children}</blockquote>
      ),
    };
  }

  useEffect(() => {
    // Auth check: attempt to fetch first doc; redirect to /stages on 401
    fetch(`/api/docs/${DOCS[0].file}`).then((r) => {
      if (r.status === 401) { router.replace("/stages"); return; }
      setAuthorized(true);
      r.text().then((text) => {
        setContent((prev) => ({ ...prev, [DOCS[0].id]: text }));
      });
      // Fetch remaining docs in background
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

  const currentDoc = DOCS.find((d) => d.id === activeDoc)!;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white">Documentation</h1>
            <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono">
              ADMIN
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Internal project documents — security audit, architecture, business proposals.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
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

        {/* Document card */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3 flex-wrap">
            <span className="text-xl">{currentDoc.icon}</span>
            <span className={`font-semibold text-sm ${currentDoc.color}`}>{currentDoc.label}</span>
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
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={makeComponents(setActiveDoc)}>
                  {content[activeDoc] ?? ""}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
