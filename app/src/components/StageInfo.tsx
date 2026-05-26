"use client";

import AttackDiagram from "./AttackDiagram";
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
};

const categoryLabel: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  ai: "AI",
  owasp: "OWASP",
  arts: "Arts & Craft",
};

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

  // Overlay translated content onto the English source
  const tagline = translation?.tagline ?? info.tagline;
  const overview = translation?.overview ?? info.overview;
  const technicalTitle = translation?.technical?.title ?? info.technical.title;
  const technicalBody = translation?.technical?.body ?? info.technical.body;
  const incidentTitle = translation?.incident?.title ?? info.incident.title;
  const incidentImpact = translation?.incident?.impact ?? info.incident.impact;
  const incidentBody = translation?.incident?.body ?? info.incident.body;
  const keyTakeaways = translation?.keyTakeaways ?? info.keyTakeaways;
  const timelineEvents = translation?.timeline ?? null;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back nav */}
        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[stage.category]}`}>
              {categoryLabel[stage.category]}
            </span>
            {stage.owaspRef && (
              <span className="text-xs px-2 py-0.5 rounded-full border text-orange-400 bg-orange-400/10 border-orange-400/30">
                {stage.owaspRef}
              </span>
            )}
            {stage.cveId && (
              <span className="text-xs px-2 py-0.5 rounded-full border text-red-400 bg-red-400/10 border-red-400/30">
                {stage.cveId}
              </span>
            )}
            {stage.cvssScore !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                stage.cvssScore >= 9 ? "text-red-400 bg-red-400/10 border-red-400/30" :
                stage.cvssScore >= 7 ? "text-orange-400 bg-orange-400/10 border-orange-400/30" :
                "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
              }`}>
                CVSS {stage.cvssScore.toFixed(1)}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 rounded-full border text-cyan-600 bg-cyan-500/5 border-cyan-500/20">
              {t("stage.stageNumber")} {stage.order}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">{stage.title}</h1>
          <p className="text-gray-400 text-lg">{tagline}</p>
        </div>

        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.overview")}</h2>
          <div className="space-y-3">
            {overview.map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
            ))}
          </div>
        </section>

        {/* Attack Diagram */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.attackFlow")}</h2>
          <div className="bg-white/3 border border-white/10 rounded-xl p-6">
            <AttackDiagram nodes={info.diagram.nodes} />
          </div>
        </section>

        {/* Technical Deep-Dive */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.technical")}</h2>
          <div className="bg-white/3 border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-3">{technicalTitle}</h3>
            <div className="space-y-3 mb-4">
              {technicalBody.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
            {info.technical.codeExample && (
              <div>
                <p className="text-gray-500 text-xs mb-2">{info.technical.codeExample.label}</p>
                <pre className="bg-black/60 border border-white/10 rounded-lg p-4 text-green-300 text-xs overflow-x-auto font-mono leading-relaxed">
                  {info.technical.codeExample.code}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* Real-World Incident */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.incident")}</h2>
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold text-lg mb-1">{incidentTitle}</h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
              <span>📅 {info.incident.when}</span>
              <span>📍 {info.incident.where}</span>
              <span>💥 {incidentImpact}</span>
            </div>
            <div className="space-y-3">
              {incidentBody.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.timeline")}</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-4">
              {info.timeline.map((entry, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 border-2 ${
                    entry.highlight
                      ? "bg-red-500 border-red-400"
                      : "bg-gray-700 border-gray-600"
                  }`} />
                  <div>
                    <span className={`text-xs font-mono mr-2 ${entry.highlight ? "text-red-400" : "text-gray-500"}`}>
                      {entry.year}
                    </span>
                    <span className={`text-sm ${entry.highlight ? "text-white font-medium" : "text-gray-400"}`}>
                      {timelineEvents?.[i] ?? entry.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-8">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.keyTakeaways")}</h2>
          <div className="space-y-2">
            {keyTakeaways.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mb-10">
          <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.references")}</h2>
          <ul className="space-y-1">
            {info.references.map((ref, i) => (
              <li key={i} className="flex gap-2 items-baseline text-sm">
                <span className="text-gray-600 font-mono text-xs">[{i + 1}]</span>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Code Templates */}
        {downloads.length > 0 && (
          <section className="mb-8">
            <h2 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">{t("stage.codeTemplates")}</h2>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-3">
                Runnable MCP server templates for this audit scenario — download, customize, and deploy against real systems.
              </p>
              <ul className="space-y-2">
                {downloads.map((dl, i) => (
                  <li key={i}>
                    <a
                      href={dl.url}
                      download
                      className="flex items-center gap-3 px-3 py-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/15 hover:border-indigo-400 transition-colors"
                    >
                      <span className="text-indigo-400 text-base flex-shrink-0">↓</span>
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

        {/* CTA */}
        <div className="bg-white/3 border border-cyan-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">{t("stage.readyForChallenge")}</p>
            <p className="text-gray-500 text-sm">
              {stage.challengeType === "ctf" ? t("stage.ctfExploit") : t("stage.quizTest")}
            </p>
          </div>
          <button
            onClick={onStart}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors flex-shrink-0"
          >
            {stage.challengeType === "ctf" ? t("stage.startCtf") : t("stage.startQuiz")}
          </button>
        </div>
      </div>
    </div>
  );
}
