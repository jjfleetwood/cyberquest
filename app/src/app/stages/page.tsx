"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stagesMeta as allStages, epochs } from "@/data/stages-meta";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession, clearSession } from "@/lib/auth";
import OnboardingModal from "@/components/OnboardingModal";
import { epochAccent } from "@/app/stages/epoch-theme";
import { useSkin } from "@/contexts/SkinContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useGroup } from "@/contexts/GroupContext";
import metaEs from "@/data/translations/meta-es.json";
import metaFr from "@/data/translations/meta-fr.json";
import metaDe from "@/data/translations/meta-de.json";

type EpochMeta = { n: string; s: string; d: string };
type MetaFile = { stages: Record<string, unknown>; epochs: Record<string, EpochMeta> };
const STAGE_META_MAPS: Record<string, MetaFile> = {
  es: metaEs as MetaFile,
  fr: metaFr as MetaFile,
  de: metaDe as MetaFile,
};

// ── Track groupings ────────────────────────────────────────────────────────────
const epochGroups = [
  {
    id: "coreSecurity",
    labelKey: "stages.tracks.coreSecurity",
    descKey: "stages.tracks.coreSecurityDesc",
    epochIds: ["first-journey", "ancient"],
  },
  {
    id: "techAudit",
    labelKey: "stages.tracks.techAudit",
    descKey: "stages.tracks.techAuditDesc",
    epochIds: ["tech-audit-1", "tech-audit-2", "tech-audit-3", "tech-audit-4"],
  },
  {
    id: "threatFrameworks",
    labelKey: "stages.tracks.threatFrameworks",
    descKey: "stages.tracks.threatFrameworksDesc",
    epochIds: ["mitre", "mitre-atlas"],
  },
  {
    id: "aiSecurity",
    labelKey: "stages.tracks.aiSecurity",
    descKey: "stages.tracks.aiSecurityDesc",
    epochIds: ["owasp-llm"],
  },
  {
    id: "quantumEra",
    labelKey: "stages.tracks.quantumEra",
    descKey: "stages.tracks.quantumEraDesc",
    epochIds: ["quantum-1", "quantum-2", "quantum-3"],
  },
  {
    id: "enterprise",
    labelKey: "stages.tracks.enterprise",
    descKey: "stages.tracks.enterpriseDesc",
    epochIds: ["cisco-core", "cisco-enterprise", "cisco-secops", "cisco-advanced", "umbrella"],
  },
];

// ── Extended curriculum (hidden from guests, accessible to pro users) ──────────
const extendedGroups = [
  {
    id: "crafts",
    labelKey: "stages.tracks.crafts",
    descKey: "stages.tracks.craftsDesc",
    epochIds: ["tapestry", "nails", "hair-color", "hair-styling"],
  },
  {
    id: "driving",
    labelKey: "stages.tracks.driving",
    descKey: "stages.tracks.drivingDesc",
    epochIds: ["driving-1", "driving-2", "driving-3"],
  },
  {
    id: "sports",
    labelKey: "stages.tracks.sports",
    descKey: "stages.tracks.sportsDesc",
    epochIds: ["baseball-1", "baseball-2", "baseball-3", "baseball-4", "baseball-5", "baseball-6", "baseball-7"],
  },
  {
    id: "travel",
    labelKey: "stages.tracks.travel",
    descKey: "stages.tracks.travelDesc",
    epochIds: ["paris-july", "milan-july", "french-basics", "italian-basics"],
  },
];

// ── Epochs allowed per user group ─────────────────────────────────────────────
const GROUP_EPOCHS: Record<string, Set<string>> = {
  "elementary": new Set(["first-journey", "ancient"]),
  "junior-hs":  new Set(["first-journey", "ancient", "tech-audit-1"]),
  "high-school": new Set(["first-journey", "ancient", "tech-audit-1", "tech-audit-2", "mitre"]),
  "university": new Set([
    "first-journey", "ancient",
    "tech-audit-1", "tech-audit-2", "tech-audit-3", "tech-audit-4",
    "mitre", "mitre-atlas", "owasp-llm", "quantum-1",
  ]),
  "career": new Set([
    "first-journey", "ancient",
    "tech-audit-1", "tech-audit-2", "tech-audit-3", "tech-audit-4",
    "mitre", "mitre-atlas", "owasp-llm",
    "quantum-1", "quantum-2", "quantum-3",
    "cisco-core", "cisco-enterprise", "cisco-secops", "cisco-advanced", "umbrella",
  ]),
  "curious": new Set([
    "first-journey",
    "tapestry", "nails", "hair-color", "hair-styling",
    "driving-1", "driving-2", "driving-3",
    "baseball-1", "baseball-2", "baseball-3", "baseball-4", "baseball-5", "baseball-6", "baseball-7",
    "paris-july", "milan-july", "french-basics", "italian-basics",
  ]),
};

export default function StagesPage() {
  const router = useRouter();
  useSkin();
  const { t, locale } = useLocale();
  const { group } = useGroup();
  const epochMetaMap = locale !== "en" ? (STAGE_META_MAPS[locale]?.epochs ?? null) : null;
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(getSession());
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string } | null) => {
        if (!data) return;
        setUsername(data.username);
        setSession(data.username);
        fetchProgress().then((p) => {
          if (!p) return;
          setCompletedStages(p.completedStages);
          setTotalCoins(p.coins);
          setStreak(p.streak ?? 0);
        });
      })
      .catch(() => {});
  }, []);

  function handleLogout() {
    clearSession();
    router.refresh();
    setUsername(null);
  }

  async function handleDeleteAccount() {
    if (!window.confirm(t("stages.deleteAccountConfirm"))) return;
    await fetch("/api/delete-account", { method: "DELETE" });
    clearSession();
    router.push("/");
  }

  const maxXp = allStages.reduce((sum, s) => sum + s.xp, 0);

  // Pre-compute which tracks + epochs are visible for the current group
  const allowed = GROUP_EPOCHS[group] ?? GROUP_EPOCHS["high-school"];
  const extendedIds = new Set(extendedGroups.map((g) => g.id));
  const visibleTracks = [...epochGroups, ...extendedGroups]
    .map((track) => ({
      ...track,
      isExtended: extendedIds.has(track.id),
      visibleEpochIds: track.epochIds.filter((id) => allowed.has(id)),
    }))
    .filter((track) => track.visibleEpochIds.length > 0);
  const firstExtendedIdx = visibleTracks.findIndex((t) => t.isExtended);

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <OnboardingModal />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              {t("stages.backToHome")}
            </Link>
            <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              🏆 {t("nav.leaderboard")}
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{t("stages.title")}</h1>
          <p className="text-gray-400">{t("stages.subtitle")}</p>

          {/* XP bar + streak */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${maxXp > 0 ? (totalCoins / maxXp) * 100 : 0}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono text-sm">{totalCoins} / {maxXp} 🪙</span>
            {streak > 0 && (
              <span
                className="flex items-center gap-1 text-sm font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  color: streak >= 7 ? "#fb923c" : "#facc15",
                  borderColor: streak >= 7 ? "rgba(251,146,60,0.4)" : "rgba(250,204,21,0.3)",
                  background: streak >= 7 ? "rgba(251,146,60,0.08)" : "rgba(250,204,21,0.06)",
                }}
              >
                🔥 {streak}d
              </span>
            )}
          </div>
        </div>

        {/* Auth banner */}
        {username ? (
          <div className="flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-5 py-3 mb-8">
            <span className="text-sm text-gray-300">
              👤 {t("stages.welcomeUser")} <span className="text-cyan-400 font-semibold">{username}</span>
            </span>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">
                {t("stages.logOut")}
              </button>
              <button onClick={handleDeleteAccount} className="text-xs text-gray-700 hover:text-red-500 transition-colors">
                {t("stages.deleteAccount")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/3 border border-white/10 rounded-xl px-5 py-3 mb-8">
            <span className="text-sm text-gray-400">
              👤 {t("stages.guestPromptPre")} —{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">{t("nav.signIn")}</Link>{" "}
              {t("stages.guestPromptPost")}
            </span>
          </div>
        )}

        {/* ── Epoch track groups ─────────────────────────────────────────────── */}
        <div className="space-y-6">
          {visibleTracks.map((trackGroup, idx) => {
            const trackEpochs = trackGroup.visibleEpochIds
              .map((id) => epochs.find((e) => e.id === id))
              .filter(Boolean) as typeof epochs;

            return (
              <div key={trackGroup.id}>
                {/* Divider before first extended group */}
                {trackGroup.isExtended && idx === firstExtendedIdx && (
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest px-2">
                      {t("stages.proExtended")}
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                )}

                {/* Track label */}
                <div className="flex items-center gap-3 mb-3 pl-1">
                  <span className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">
                    {t(trackGroup.labelKey)}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="hidden sm:block text-[10px] text-gray-700 whitespace-nowrap">{t(trackGroup.descKey)}</span>
                </div>

                {/* Epoch cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4">
                  {trackEpochs.map((epoch) => {
                    const ea = epochAccent[epoch.id] ?? epochAccent.ancient;
                    const stageCount = allStages.filter((s) => s.epochId === epoch.id).length;
                    const doneCount = allStages.filter(
                      (s) => s.epochId === epoch.id && completedStages.includes(s.id)
                    ).length;
                    const pct = stageCount > 0 ? (doneCount / stageCount) * 100 : 0;
                    const done = doneCount === stageCount && stageCount > 0;

                    return (
                      <Link
                        key={epoch.id}
                        href={`/stages/epoch/${epoch.id}`}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${
                          done
                            ? "border-green-500/40 bg-green-500/5 hover:border-green-400/60"
                            : "border-white/10 bg-white/2 hover:border-white/25 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-2xl leading-none flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                          {epoch.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-200 truncate">{epochMetaMap?.[epoch.id]?.n ?? epoch.name}</span>
                            {doneCount > 0 && doneCount < stageCount && (
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${ea.tab} flex-shrink-0`}>
                                {doneCount}/{stageCount}
                              </span>
                            )}
                            {done && (
                              <span className="text-[10px] font-mono text-green-400 flex-shrink-0">{t("stages.epochDone")}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{epochMetaMap?.[epoch.id]?.s ?? epoch.subtitle}</p>
                          {doneCount > 0 && (
                            <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                              <div
                                className={`${ea.bar} h-1 rounded-full transition-all duration-500`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-400 transition-colors text-sm flex-shrink-0">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
