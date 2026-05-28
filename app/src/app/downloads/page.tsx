"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { stageDownloads } from "@/data/stage-downloads";

const ALL_DOWNLOADS = Object.entries(stageDownloads).flatMap(([stageId, files]) =>
  files.map((f) => ({ ...f, stageId }))
);

const STAGE_GROUP_LABELS: Record<string, string> = {
  "audit-a": "Tech Audit: Agentic (Claude Tool Use + MCP)",
  "audit-cm": "Continuous Monitoring 2.0 (SIEM · UEBA · NDR · CSPM)",
};

function getGroup(stageId: string): string {
  if (stageId.startsWith("audit-a")) return "audit-a";
  if (stageId.startsWith("audit-cm")) return "audit-cm";
  return "other";
}

const grouped: Record<string, typeof ALL_DOWNLOADS> = {};
for (const dl of ALL_DOWNLOADS) {
  const g = getGroup(dl.stageId);
  if (!grouped[g]) grouped[g] = [];
  grouped[g].push(dl);
}

export default function DownloadsPage() {
  const [access, setAccess] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    fetch("/api/downloads/check")
      .then((r) => (r.ok ? r.json() : { allowed: false }))
      .then((d: { allowed: boolean }) => setAccess(d.allowed ? "allowed" : "denied"))
      .catch(() => setAccess("denied"));
  }, []);

  if (access === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}>
        <div className="text-gray-600 text-sm">Checking access…</div>
      </div>
    );
  }

  if (access === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}>
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-5">🔒</div>
          <h2 className="text-2xl font-black text-white mb-3">Downloads Restricted</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Python template downloads require explicit access. Contact the administrator to request access.
          </p>
          <Link href="/stages" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
            ← Back to Stage Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-8 inline-block transition-colors">
          ← Back to Stage Map
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-3">Python MCP Templates</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            24 runnable MCP server templates — one per agentic audit stage. Download, customize, and deploy against real systems.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Each file is self-contained:{" "}
            <span className="font-mono text-gray-500">pip install anthropic && python &lt;file&gt;.py</span>
          </p>
        </div>

        {Object.entries(STAGE_GROUP_LABELS).map(([groupKey, groupLabel]) => {
          const items = grouped[groupKey] ?? [];
          return (
            <div key={groupKey} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest whitespace-nowrap">
                  {groupLabel}
                </span>
                <div className="flex-1 h-px bg-emerald-500/20" />
              </div>

              <div className="rounded-xl border border-emerald-500/15 overflow-hidden">
                <div className="divide-y divide-white/5">
                  {items.map((dl, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-emerald-300 font-mono text-sm font-semibold">{dl.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{dl.description}</p>
                      </div>
                      <a
                        href={dl.url}
                        download
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                      >
                        ↓ Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-8 p-5 rounded-xl bg-white/3 border border-white/8">
          <h2 className="text-white font-bold mb-2">About these templates</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            These MCP server templates are generated as part of the Kryptós CronOS Tech Audit curriculum. Each file
            demonstrates real agentic audit patterns using the Anthropic Claude API and the Model Context Protocol (MCP).
            They are designed to be customized for real-world security audit use cases — adapt the tool definitions
            and system prompts to your environment.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/8 text-cyan-400 font-mono">Anthropic SDK</span>
            <span className="text-xs px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-400 font-mono">MCP Protocol</span>
            <span className="text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-400 font-mono">Python 3.9+</span>
            <span className="text-xs px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/8 text-amber-400 font-mono">Free to use</span>
          </div>
        </div>
      </div>
    </div>
  );
}
