"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stagesMeta as allStages, epochs } from "@/data/stages-meta";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession } from "@/lib/auth";
import { epochAccent, cardBorder, cardEmojiBg } from "@/app/stages/epoch-theme";
import { getContentFlag } from "@/data/content-flags";
import { useLocale } from "@/contexts/LocaleContext";
import { useGroup } from "@/contexts/GroupContext";
import metaEs from "@/data/translations/meta-es.json";
import metaFr from "@/data/translations/meta-fr.json";
import metaDe from "@/data/translations/meta-de.json";

type StageMeta = { t: string; w: string };
type EpochMeta = { n: string; s: string; d: string };
type MetaFile = { stages: Record<string, StageMeta>; epochs: Record<string, EpochMeta> };
const META_MAPS: Record<string, MetaFile> = {
  es: metaEs as MetaFile,
  fr: metaFr as MetaFile,
  de: metaDe as MetaFile,
};

// Fallback group chain: if no stages exist for the user's group, try these
const GROUP_FALLBACK: Record<string, string> = {
  "university": "high-school",
  "career": "high-school",
  "junior-hs": "elementary",
};

function filterStagesByGroup(stages: typeof allStages, userGroup: string) {
  const groupStages = stages.filter((s) => s.group === userGroup);
  if (groupStages.length > 0) return groupStages;
  const fallback = GROUP_FALLBACK[userGroup];
  if (fallback) {
    const fallbackStages = stages.filter((s) => s.group === fallback);
    if (fallbackStages.length > 0) return fallbackStages;
  }
  return stages.filter((s) => !s.group);
}

export default function EpochPage() {
  const { epochId } = useParams<{ epochId: string }>();
  const { t, locale } = useLocale();
  const { group } = useGroup();
  const metaMap = locale !== "en" ? (META_MAPS[locale] ?? null) : null;
  const [completedStages, setCompletedStages] = useState<string[]>([]);
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
        fetchProgress().then((p) => {
          if (p) setCompletedStages(p.completedStages);
        });
      })
      .catch(() => setAccessAllowed(true));
  }, [epochId]);

  const epoch = epochs.find((e) => e.id === epochId);
  const allEpochStages = allStages.filter((s) => s.epochId === epochId).sort((a, b) => a.order - b.order);
  const epochStages = filterStagesByGroup(allEpochStages, group);
  const accent = epochAccent[epochId] ?? epochAccent.ancient;
  const contentFlag = getContentFlag(epochId);
  const doneCount = epochStages.filter((s) => completedStages.includes(s.id)).length;
  const nextStageId = epochStages.find((s) => !completedStages.includes(s.id))?.id ?? null;

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
            const completed = completedStages.includes(stage.id);
            const isNext = stage.id === nextStageId;
            const borderClass = completed
              ? "border-green-500/50 hover:border-green-400/80"
              : isNext
              ? `${cardBorder[epochId] ?? "border-white/20"} ring-2 ring-offset-2 ring-offset-slate-950 ring-current`
              : cardBorder[epochId] ?? "border-white/20 hover:border-white/40";

            return (
              <Link
                key={stage.id}
                href={`/stages/${stage.id}`}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 ${borderClass}`}
              >
                {/* Emoji panel */}
                <div
                  className={`relative flex items-center justify-center py-7 bg-gradient-to-b ${
                    completed ? "from-green-950 to-slate-950" : (cardEmojiBg[epochId] ?? "from-slate-900 to-slate-950")
                  }`}
                >
                  <span className={`text-5xl leading-none drop-shadow-lg transition-transform duration-200 group-hover:scale-110 ${completed ? "opacity-30" : ""}`}>
                    {stage.wonder.emoji}
                  </span>

                  {completed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400/60 flex items-center justify-center">
                        <span className="text-green-400 text-2xl font-black leading-none">✓</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md leading-none ${
                      completed ? "bg-green-500/20 text-green-400" : "bg-black/50 text-gray-300"
                    }`}>
                      {stage.order}
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
                <div className={`px-2.5 py-2.5 ${completed ? "bg-green-950/40" : "bg-black/20"}`}>
                  <p className="text-xs text-gray-600 truncate leading-tight mb-0.5">{metaMap?.stages[stage.id]?.w ?? stage.wonder.name}</p>
                  <p className={`text-xs font-semibold truncate leading-tight ${completed ? "text-green-300/70" : "text-gray-200"}`}>
                    {metaMap?.stages[stage.id]?.t ?? stage.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {completed ? (
                      <span className="text-xs text-green-500 font-semibold">{t("stages.completed")}</span>
                    ) : (
                      <>
                        <span className="text-xs text-amber-600 font-mono">+{stage.xp} 🪙</span>
                      </>
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
