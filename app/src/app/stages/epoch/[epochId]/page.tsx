"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stagesMeta as allStages, epochs } from "@/data/stages-meta";
import { fetchProgress, fetchQuizProgress } from "@/lib/progress";
import GaugeBar from "@/components/GaugeBar";
import { getSession, setSession } from "@/lib/auth";
import { epochAccent, cardBorder, cardEmojiBg } from "@/app/stages/epoch-theme";
import { getContentFlag } from "@/data/content-flags";
import { useLocale } from "@/contexts/LocaleContext";
import { useGroup } from "@/contexts/GroupContext";
import metaEs from "@/data/translations/meta-es.json";
import metaFr from "@/data/translations/meta-fr.json";
import metaDe from "@/data/translations/meta-de.json";
import metaHi from "@/data/translations/meta-hi.json";
import metaPt from "@/data/translations/meta-pt.json";
import metaPl from "@/data/translations/meta-pl.json";

type StageMeta = { t: string; w: string };
type EpochMeta = { n: string; s: string; d: string };
type MetaFile = { stages: Record<string, StageMeta>; epochs: Record<string, EpochMeta> };
const META_MAPS: Record<string, MetaFile> = {
  es: metaEs as MetaFile,
  fr: metaFr as MetaFile,
  de: metaDe as MetaFile,
  hi: metaHi as MetaFile,
  pt: metaPt as MetaFile,
  pl: metaPl as MetaFile,
};

// Fallback group chain: if no stages exist for the user's group, try these
const GROUP_FALLBACK: Record<string, string> = {
  "university": "high-school",
  "career": "high-school",
  "junior-hs": "elementary",
};

function filterStagesByGroup(stages: typeof allStages, userGroups: string[]) {
  // Career and curious always see each other's content — mirrors GROUP_EPOCHS on the stages map
  const effective = new Set(userGroups);
  if (effective.has("career")) effective.add("curious");
  if (effective.has("curious")) effective.add("career");
  const effectiveGroups = [...effective];
  const matched = stages.filter((s) => s.group && effectiveGroups.includes(s.group));
  if (matched.length > 0) return matched;
  const fallbackGroups = userGroups.flatMap((g) => GROUP_FALLBACK[g] ? [GROUP_FALLBACK[g]] : []);
  if (fallbackGroups.length > 0) {
    const fallbackMatched = stages.filter((s) => s.group && fallbackGroups.includes(s.group));
    if (fallbackMatched.length > 0) return fallbackMatched;
  }
  return stages.filter((s) => !s.group);
}

export default function EpochPage() {
  const { epochId } = useParams<{ epochId: string }>();
  const { t, locale } = useLocale();
  const { groups } = useGroup();
  const metaMap = locale !== "en" ? (META_MAPS[locale] ?? null) : null;
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [quizCompletedStages, setQuizCompletedStages] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setUsername(getSession());
    Promise.all([
      fetch("/api/auth/me").then((r) => (r.ok ? r.json() : null)),
      fetch(`/api/cms/access?epochId=${epochId}`).then((r) => (r.ok ? r.json() : { allowed: true })),
    ])
      .then(([meData, accessData]: [{ username: string } | null, { allowed: boolean }]) => {
        setAccessAllowed((accessData as { allowed: boolean }).allowed ?? true);
        if (!meData) return;
        setUsername(meData.username);
        setSession(meData.username);
        Promise.all([fetchProgress(), fetchQuizProgress()]).then(([p, qp]) => {
          if (p) setCompletedStages(p.completedStages);
          setQuizCompletedStages(qp);
        });
      })
      .catch(() => setAccessAllowed(true));
  }, [epochId]);

  const epoch = epochs.find((e) => e.id === epochId);
  const allEpochStages = allStages.filter((s) => s.epochId === epochId).sort((a, b) => {
    const ra = (a as { rank?: number }).rank;
    const rb = (b as { rank?: number }).rank;
    if (ra !== undefined && rb !== undefined) return ra - rb;
    return a.order - b.order;
  });
  const epochStages = filterStagesByGroup(allEpochStages, groups);
  const accent = epochAccent[epochId] ?? epochAccent.ancient;
  const contentFlag = getContentFlag(epochId);
  const isAuditEpoch = epochId.startsWith("tech-audit-");
  // For audit epochs, a stage is "done for progression" if CTF OR quiz complete
  const doneForProgression = (id: string) =>
    completedStages.includes(id) || (isAuditEpoch && quizCompletedStages.includes(id));
  const doneCount = epochStages.filter((s) => doneForProgression(s.id)).length;
  const nextStageId = epochStages.find((s) => !doneForProgression(s.id))?.id ?? null;

  const gridCols =
    epochId === "first-journey"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  if (!epoch) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <div className="text-center">
          <p className="text-gray-500 mb-4">{t("epoch.notFound")}</p>
          <Link href="/stages" className="text-cyan-400 hover:text-cyan-300 text-sm">{t("epoch.backToStages")}</Link>
        </div>
      </div>
    );
  }

  if (accessAllowed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
      >
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-white mb-2">{epoch.name}</h2>
          <p className="text-gray-500 text-sm mb-6">
            {t("epoch.accessRestricted")}
          </p>
          <Link href="/stages" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
            {t("epoch.backToStageMap")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 transition-colors">
            {t("epoch.stageMapBreadcrumb")}
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400">{epoch.name}</span>
        </div>

        {/* Epoch hero */}
        <div className={`rounded-2xl border px-8 py-8 mb-8 ${accent.active}`}>
          <div className="flex items-start gap-5">
            <span className="text-6xl leading-none select-none">{epoch.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-3xl font-black text-white">{metaMap?.epochs[epochId]?.n ?? epoch.name}</h1>
                <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                  {epochStages.length} {t("epoch.stageCount")}
                </span>
                {doneCount > 0 && (
                  <span className="text-xs font-mono text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full">
                    {doneCount}/{epochStages.length} {t("epoch.doneLabel")}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-3">{metaMap?.epochs[epochId]?.s ?? epoch.subtitle}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{metaMap?.epochs[epochId]?.d ?? epoch.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          {doneCount > 0 && (
            <div className="mt-6">
              <div className="w-full bg-white/5 rounded-full h-1.5">
                <div
                  className={`${accent.bar} h-1.5 rounded-full transition-all duration-700`}
                  style={{ width: `${(doneCount / epochStages.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CyberOps readiness banner — shown on Cisco and Umbrella epochs */}
        {(epochId.startsWith("cisco-") || epochId === "umbrella") && (
          <Link href="/cyberops"
            className="flex items-center gap-3 bg-blue-500/6 border border-blue-500/25 rounded-xl px-4 py-3 mb-3 hover:border-blue-400/50 hover:bg-blue-500/10 transition-colors group">
            <span className="text-xl flex-shrink-0">🎓</span>
            <div className="flex-1 min-w-0">
              <p className="text-blue-300 font-semibold text-sm">CyberOps Associate Exam Readiness</p>
              <p className="text-gray-500 text-xs">These stages map to the Cisco CBROPS 200-201 exam. Track your readiness →</p>
            </div>
            <span className="text-blue-600 group-hover:text-blue-400 text-sm flex-shrink-0 transition-colors">→</span>
          </Link>
        )}

        {/* Certificate paths banner — shown on all security epochs */}
        {(
          epochId === "first-journey" ||
          epochId === "ancient" ||
          epochId.startsWith("cisco-") ||
          epochId.startsWith("tech-audit-") ||
          epochId === "mitre" ||
          epochId === "mitre-atlas" ||
          epochId === "owasp-llm" ||
          epochId.startsWith("quantum-")
        ) && (
          <Link href="/certs"
            className="flex items-center gap-3 bg-indigo-500/6 border border-indigo-500/25 rounded-xl px-4 py-3 mb-6 hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-colors group">
            <span className="text-xl flex-shrink-0">📜</span>
            <div className="flex-1 min-w-0">
              <p className="text-indigo-300 font-semibold text-sm">Certificate Paths</p>
              <p className="text-gray-500 text-xs">These stages map to Network+, Security+, ISC² CC, and CySA+ exam domains →</p>
            </div>
            <span className="text-indigo-600 group-hover:text-indigo-400 text-sm flex-shrink-0 transition-colors">→</span>
          </Link>
        )}

        {/* Attribution banner */}
        {contentFlag && contentFlag.risk !== "verified-safe" && (
          <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-xs text-amber-200/60">
            <span className="text-amber-400 text-base leading-none flex-shrink-0 mt-0.5">©</span>
            <p className="leading-relaxed">
              {contentFlag.attributionText}
              {contentFlag.attributionUrl && (
                <>
                  {" "}
                  <a
                    href={contentFlag.attributionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400/80 underline underline-offset-2 hover:text-amber-300 transition-colors"
                  >
                    {t("epoch.learnMore")}
                  </a>
                </>
              )}
              {contentFlag.license && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500/70 font-mono">
                  {contentFlag.license}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Auth note */}
        {!username && (
          <div className="flex items-center gap-2 bg-white/3 border border-white/10 rounded-xl px-4 py-2.5 mb-6 text-sm text-gray-500">
            <span>{t("epoch.guestPre")}</span>
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">{t("nav.signIn")}</Link>
            <span>{t("epoch.guestPost")}</span>
          </div>
        )}

        {/* Stage grid */}
        <div className={`grid gap-3 ${gridCols}`}>
          {epochStages.map((stage) => {
            const ctfDone = completedStages.includes(stage.id);
            const quizDone = quizCompletedStages.includes(stage.id);
            const bothDone = ctfDone && quizDone;
            const anyDone = ctfDone || (isAuditEpoch && quizDone);
            const isNext = stage.id === nextStageId;

            // Border / shading by completion state
            const borderClass = bothDone
              ? "border-emerald-400/70 hover:border-emerald-400"
              : ctfDone
              ? "border-green-500/50 hover:border-green-400/80"
              : quizDone && isAuditEpoch
              ? "border-amber-500/50 hover:border-amber-400/80"
              : isNext
              ? `${cardBorder[epochId] ?? "border-white/20"} ring-2 ring-offset-2 ring-offset-slate-950 ring-current`
              : cardBorder[epochId] ?? "border-white/20 hover:border-white/40";

            const emojiBg = bothDone
              ? "from-emerald-950 to-slate-950"
              : ctfDone
              ? "from-green-950 to-slate-950"
              : quizDone && isAuditEpoch
              ? "from-amber-950 to-slate-950"
              : (cardEmojiBg[epochId] ?? "from-slate-900 to-slate-950");

            const infoBg = bothDone
              ? "bg-emerald-950/40"
              : ctfDone
              ? "bg-green-950/40"
              : quizDone && isAuditEpoch
              ? "bg-amber-950/30"
              : "bg-black/20";

            // Completion overlay icon + color
            const overlayContent = bothDone
              ? { bg: "bg-emerald-500/20", border: "border-emerald-400/60", text: "text-emerald-300 text-xl", symbol: "★" }
              : ctfDone
              ? { bg: "bg-green-500/20", border: "border-green-400/60", text: "text-green-400 text-2xl font-black", symbol: "✓" }
              : quizDone && isAuditEpoch
              ? { bg: "bg-amber-500/20", border: "border-amber-400/60", text: "text-amber-300 text-lg", symbol: "📝" }
              : null;

            const completedLabelColor = bothDone
              ? "text-emerald-400"
              : ctfDone
              ? "text-green-500"
              : "text-amber-500";

            const completedLabel = bothDone
              ? "★ " + t("stages.completed")
              : ctfDone
              ? "✓ " + t("stages.completed")
              : isAuditEpoch && quizDone
              ? "📝 Quiz done"
              : null;

            return (
              <Link
                key={stage.id}
                href={`/stages/${stage.id}`}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 ${borderClass}`}
              >
                {/* Emoji panel */}
                <div className={`relative flex items-center justify-center py-7 bg-gradient-to-b ${emojiBg}`}>
                  <span className={`text-5xl leading-none drop-shadow-lg transition-transform duration-200 group-hover:scale-110 ${anyDone ? "opacity-30" : ""}`}>
                    {stage.wonder.emoji}
                  </span>

                  {overlayContent && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={`w-12 h-12 rounded-full ${overlayContent.bg} border-2 ${overlayContent.border} flex items-center justify-center`}>
                        <span className={`${overlayContent.text} leading-none`}>{overlayContent.symbol}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md leading-none ${
                      anyDone ? (bothDone ? "bg-emerald-500/20 text-emerald-400" : ctfDone ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400") : "bg-black/50 text-gray-300"
                    }`}>
                      {stage.order}
                      {(stage as { rank?: number }).rank !== undefined ? ` · #${(stage as { rank?: number }).rank}` : ""}
                    </span>
                  </div>

                  {(stage.challengeType === "ctf" || stage.cveId) && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs bg-black/60 text-gray-400 px-1 py-0.5 rounded font-mono leading-none">
                        {stage.cveId ? "CVE" : "CTF"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className={`px-2.5 py-2.5 ${infoBg}`}>
                  <p className="text-xs text-gray-600 truncate leading-tight mb-0.5">{metaMap?.stages[stage.id]?.w ?? stage.wonder.name}</p>
                  <p className={`text-xs font-semibold truncate leading-tight ${anyDone ? (bothDone ? "text-emerald-300/70" : ctfDone ? "text-green-300/70" : "text-amber-300/70") : "text-gray-200"}`}>
                    {metaMap?.stages[stage.id]?.t ?? stage.title}
                  </p>

                  {/* Compact gauges for audit-cm stages */}
                  {(stage as { easeScore?: number }).easeScore !== undefined && (
                    <div className="mt-2 space-y-1">
                      <GaugeBar value={(stage as { easeScore?: number }).easeScore ?? 5} label="Ease" compact />
                      <GaugeBar value={(stage as { valueScore?: number }).valueScore ?? 5} label="Value" compact />
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 mt-1.5">
                    {completedLabel ? (
                      <span className={`text-xs font-semibold ${completedLabelColor}`}>{completedLabel}</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-mono">+{stage.xp} 🪙</span>
                    )}
                    <span className="text-xs ml-auto">{stage.badge.emoji}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
