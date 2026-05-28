"use client";

import AttackDiagram from "./AttackDiagram";
import GaugeBar from "./GaugeBar";
import BackLink from "./BackLink";
import type { StageConfig } from "@/data/types";
import type { StageTranslation } from "@/data/translations/types";
import { stageDownloads } from "@/data/stage-downloads";
import { useLocale } from "@/contexts/LocaleContext";

const categoryColors: Record<string, string> = {
  cybersecurity: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  ai: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  owasp: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  arts: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  driving: "text-lime-400 bg-lime-400/10 border-lime-400/30",
  health: "text-pink-400 bg-pink-400/10 border-pink-400/30",
  sports: "text-blue-400 bg-blue-400/10 border-blue-400/30",
};

const categoryLabel: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  ai: "AI Security",
  owasp: "OWASP",
  arts: "Arts & Craft",
  driving: "Driving",
  health: "Health",
  sports: "Sports",
};

function SectionHeader({ color, icon, label }: { color: string; icon: string; label: string }) {
  return (
    <div className={`flex items-center gap-2 mb-4`}>
      <span className="text-base">{icon}</span>
      <h2 className={`font-bold text-xs uppercase tracking-widest ${color}`}>{label}</h2>
      <div className={`flex-1 h-px opacity-20 bg-current ${color}`} />
    </div>
  );
}

export default function StageInfo({
  stage,
  onStart,
  translation = null,
}: {
  stage: StageConfig;
  onStart: () => void;
  translation?: StageTranslation | null;
}) {
  const { t } = useLocale();
  const { info } = stage;
  const downloads = info.downloads ?? stageDownloads[stage.id] ?? [];

  const tagline = translation?.tagline ?? info.tagline;
  const overview = translation?.overview ?? info.overview;
  const technicalTitle = translation?.technical?.title ?? info.technical.title;
  const technicalBody = translation?.technical?.body ?? info.technical.body;
  const incidentTitle = translation?.incident?.title ?? info.incident.title;
  const incidentImpact = translation?.incident?.impact ?? info.incident.impact;
  const incidentBody = translation?.incident?.body ?? info.incident.body;
  const keyTakeaways = translation?.keyTakeaways ?? info.keyTakeaways;
  const timelineEvents = translation?.timeline ?? null;

  const cvssColor =
    stage.cvssScore !== undefined
      ? stage.cvssScore >= 9 ? "text-red-400"
      : stage.cvssScore >= 7 ? "text-orange-400"
      : "text-yellow-400"
      : "";

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        <BackLink />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="mb-10">
          {/* Wonder + location context */}
          <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-white/3 border border-white/8">
            <span className="text-4xl leading-none flex-shrink-0">{stage.wonder.emoji}</span>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">{stage.wonder.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">
                📍 {stage.wonder.location} &nbsp;·&nbsp; 🕰 {stage.wonder.era}
              </p>
            </div>
          </div>

          {/* Pill badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {stage.category in categoryColors && (
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[stage.category]}`}>
                {categoryLabel[stage.category] ?? stage.category}
              </span>
            )}
            {stage.owaspRef && (
              <span className="text-xs px-2.5 py-1 rounded-full border text-orange-400 bg-orange-400/10 border-orange-400/30 font-mono">
                {stage.owaspRef}
              </span>
            )}
            {stage.cveId && (
              <span className="text-xs px-2.5 py-1 rounded-full border text-red-400 bg-red-400/10 border-red-400/30 font-mono font-semibold">
                {stage.cveId}
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full border text-gray-500 bg-white/3 border-white/10">
              Stage {stage.order}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">{stage.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{tagline}</p>

          {/* CVSS severity bar */}
          {stage.cvssScore !== undefined && (
            <div className="mt-5 flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
              <div className="text-center flex-shrink-0">
                <p className={`text-3xl font-black font-mono ${cvssColor}`}>{stage.cvssScore.toFixed(1)}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider mt-0.5">CVSS</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${cvssColor}`}>
                    {stage.cvssScore >= 9 ? "Critical" : stage.cvssScore >= 7 ? "High" : stage.cvssScore >= 4 ? "Medium" : "Low"}
                  </span>
                  <span className="text-gray-600 text-xs">0 ————————————————— 10</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      stage.cvssScore >= 9 ? "bg-red-500" :
                      stage.cvssScore >= 7 ? "bg-orange-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${(stage.cvssScore / 10) * 100}%` }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">
                  {stage.cvssScore >= 9
                    ? "Immediate exploitation possible — patch is the only mitigation."
                    : stage.cvssScore >= 7
                    ? "Active exploitation in the wild. High priority for patching."
                    : "Exploitation requires conditions. Mitigate with configuration."}
                </p>
              </div>
            </div>
          )}

          {/* Ease + Value gauges for audit-cm stages */}
          {stage.easeScore !== undefined && stage.valueScore !== undefined && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/3 border border-white/10 rounded-xl">
              <GaugeBar value={stage.easeScore} label="Ease of Implementation" />
              <GaugeBar value={stage.valueScore} label="Analytics & Audit Value" />
              {stage.rank !== undefined && (
                <div className="sm:col-span-2 pt-1 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Combined score: {stage.easeScore + stage.valueScore}/20</span>
                  <span className="text-xs font-bold text-purple-400">Rank #{stage.rank} of 12</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Overview ──────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-cyan-400" icon="📡" label={t("stage.overview")} />
          <div className="space-y-4">
            {overview.map((para, i) => (
              i === 0 ? (
                <p key={i} className="text-white text-base leading-relaxed font-medium border-l-2 border-cyan-500/50 pl-4">
                  {para}
                </p>
              ) : (
                <p key={i} className="text-gray-400 leading-relaxed text-sm">{para}</p>
              )
            ))}
          </div>
          {stage.image && (
            <div className="mt-5 rounded-xl overflow-hidden border border-white/10">
              <img src={stage.image} alt={stage.title} className="w-full object-cover max-h-72" loading="lazy" />
            </div>
          )}
        </section>

        {/* ── Attack Flow ───────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-rose-400" icon="⚔️" label={t("stage.attackFlow")} />
          <div className="bg-white/2 border border-white/8 rounded-xl p-6">
            <AttackDiagram nodes={info.diagram.nodes} />
          </div>
        </section>

        {/* ── Technical Deep-Dive ───────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-emerald-400" icon="🔬" label={t("stage.technical")} />
          <div className="rounded-xl border border-emerald-500/15 overflow-hidden">
            <div className="px-5 py-4 bg-emerald-500/5 border-b border-emerald-500/15">
              <h3 className="text-white font-bold text-base">{technicalTitle}</h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              {technicalBody.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
            {info.technical.codeExample && (
              <div className="px-5 pb-5">
                <p className="text-emerald-600 text-xs font-mono mb-2 uppercase tracking-wider">
                  ▸ {info.technical.codeExample.label}
                </p>
                <pre className="bg-black/70 border border-emerald-500/20 rounded-lg p-4 text-green-300 text-xs overflow-x-auto font-mono leading-relaxed">
                  {info.technical.codeExample.code}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* ── Real-World Incident ───────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-red-400" icon="🚨" label={t("stage.incident")} />
          <div className="rounded-xl border border-red-500/25 overflow-hidden">
            {/* Header bar */}
            <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <h3 className="text-red-300 font-bold text-sm">{incidentTitle}</h3>
              </div>
              <span className="text-xs font-mono text-red-600 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 whitespace-nowrap flex-shrink-0">
                CONFIRMED
              </span>
            </div>

            {/* Meta strip */}
            <div className="px-5 py-3 bg-black/30 border-b border-white/5 flex flex-wrap gap-x-5 gap-y-1">
              <span className="text-xs text-gray-500">📅 <span className="text-gray-400">{info.incident.when}</span></span>
              <span className="text-xs text-gray-500">📍 <span className="text-gray-400">{info.incident.where}</span></span>
            </div>

            {/* Impact callout */}
            <div className="px-5 py-4 border-b border-white/5 bg-red-500/5">
              <p className="text-xs text-red-600 uppercase tracking-widest mb-1 font-semibold">Impact</p>
              <p className="text-red-200 font-semibold text-sm leading-snug">{incidentImpact}</p>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-3">
              {incidentBody.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-amber-400" icon="🕰" label={t("stage.timeline")} />
          <div className="relative pl-5">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/40 via-white/10 to-transparent" />
            <div className="space-y-5">
              {info.timeline.map((entry, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 border-2 ${
                    entry.highlight
                      ? "bg-amber-500 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      : "bg-gray-800 border-gray-600"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs font-mono font-bold px-2 py-0.5 rounded mr-2 ${
                      entry.highlight
                        ? "text-amber-300 bg-amber-500/15 border border-amber-500/30"
                        : "text-gray-600 bg-white/3 border border-white/8"
                    }`}>
                      {entry.year}
                    </span>
                    <span className={`text-sm leading-relaxed ${entry.highlight ? "text-white font-medium" : "text-gray-400"}`}>
                      {timelineEvents?.[i] ?? entry.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Takeaways ─────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-violet-400" icon="🎯" label={t("stage.keyTakeaways")} />
          <div className="space-y-3">
            {keyTakeaways.map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-3 rounded-xl bg-violet-500/5 border border-violet-500/15 hover:border-violet-500/30 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-black"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>
                  {i + 1}
                </span>
                <p className="text-gray-200 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── References ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-sky-400" icon="📚" label={t("stage.references")} />
          <ul className="space-y-2">
            {info.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/2 border border-white/8 hover:bg-white/5 hover:border-sky-500/30 transition-colors group"
                >
                  <span className="text-gray-600 font-mono text-xs w-5 flex-shrink-0 text-center">{i + 1}</span>
                  <span className="text-sky-400 group-hover:text-sky-300 text-sm transition-colors truncate">{ref.title}</span>
                  <span className="text-gray-600 text-xs ml-auto flex-shrink-0">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Code Templates ────────────────────────────────────────────────── */}
        {downloads.length > 0 && (
          <section className="mb-10">
            <SectionHeader color="text-indigo-400" icon="⬇️" label={t("stage.codeTemplates")} />
            <div className="rounded-xl border border-indigo-500/20 overflow-hidden">
              <div className="px-4 py-3 bg-indigo-500/5 border-b border-indigo-500/15">
                <p className="text-gray-500 text-xs">
                  Runnable MCP server templates — download, customize, deploy against real systems.
                </p>
              </div>
              <ul className="divide-y divide-white/5">
                {downloads.map((dl, i) => (
                  <li key={i}>
                    <a
                      href={dl.url}
                      download
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500/5 transition-colors"
                    >
                      <span className="text-indigo-400 text-sm flex-shrink-0">↓</span>
                      <div className="min-w-0">
                        <p className="text-indigo-300 text-sm font-mono">{dl.name}</p>
                        <p className="text-gray-500 text-xs">{dl.description}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden border border-cyan-500/30"
          style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(99,102,241,0.08) 100%)" }}>
          <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-lg">{t("stage.readyForChallenge")}</p>
              <p className="text-gray-400 text-sm mt-0.5">
                {stage.challengeType === "ctf" ? t("stage.ctfExploit") : t("stage.quizTest")}
              </p>
            </div>
            <button
              onClick={onStart}
              className="px-8 py-3 font-black rounded-xl transition-all text-black flex-shrink-0 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
            >
              {stage.challengeType === "ctf" ? t("stage.startCtf") : t("stage.startQuiz")} →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
