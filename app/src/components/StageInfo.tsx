"use client";

import Link from "next/link";
import AttackDiagram from "./AttackDiagram";
import GaugeBar from "./GaugeBar";
import BackLink from "./BackLink";
import RichText from "./RichText";
import type { StageConfig } from "@/data/types";
import type { StageTranslation } from "@/data/translations/types";
import { stageDownloads } from "@/data/stage-downloads";
import { getDomainsForStage } from "@/data/cyberops-domains";
import { getCertDomainsForStage } from "@/data/cert-domains";
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

type SectionTheme = {
  flow: string; flowIcon: string;
  technical: string; technicalIcon: string;
  incident: string; incidentIcon: string;
  incidentBadge: string;
  incidentBorder: string; incidentHeaderBg: string; incidentDot: string;
  incidentBadgeCss: string; incidentImpactBg: string; incidentTitleColor: string; incidentImpactLabel: string;
};

const SECTION_THEMES: Record<string, SectionTheme> = {
  cybersecurity: {
    flow: "stage.flow.cybersecurity", flowIcon: "⚔️",
    technical: "stage.technical.cybersecurity", technicalIcon: "🔬",
    incident: "stage.incident.cybersecurity", incidentIcon: "🚨",
    incidentBadge: "CONFIRMED",
    incidentBorder: "border-red-500/25", incidentHeaderBg: "bg-red-500/10 border-b border-red-500/20",
    incidentDot: "bg-red-500", incidentBadgeCss: "text-red-600 bg-red-500/10 border border-red-500/20",
    incidentImpactBg: "border-b border-white/5 bg-red-500/5", incidentTitleColor: "text-red-300",
    incidentImpactLabel: "stage.incident.impactLabel.cybersecurity",
  },
  ai: {
    flow: "stage.flow.ai", flowIcon: "⚔️",
    technical: "stage.technical.ai", technicalIcon: "🔬",
    incident: "stage.incident.ai", incidentIcon: "🚨",
    incidentBadge: "CONFIRMED",
    incidentBorder: "border-red-500/25", incidentHeaderBg: "bg-red-500/10 border-b border-red-500/20",
    incidentDot: "bg-red-500", incidentBadgeCss: "text-red-600 bg-red-500/10 border border-red-500/20",
    incidentImpactBg: "border-b border-white/5 bg-red-500/5", incidentTitleColor: "text-red-300",
    incidentImpactLabel: "stage.incident.impactLabel.cybersecurity",
  },
  owasp: {
    flow: "stage.flow.owasp", flowIcon: "⚔️",
    technical: "stage.technical.owasp", technicalIcon: "🔬",
    incident: "stage.incident.owasp", incidentIcon: "🚨",
    incidentBadge: "CONFIRMED",
    incidentBorder: "border-red-500/25", incidentHeaderBg: "bg-red-500/10 border-b border-red-500/20",
    incidentDot: "bg-red-500", incidentBadgeCss: "text-red-600 bg-red-500/10 border border-red-500/20",
    incidentImpactBg: "border-b border-white/5 bg-red-500/5", incidentTitleColor: "text-red-300",
    incidentImpactLabel: "stage.incident.impactLabel.cybersecurity",
  },
  sports: {
    flow: "stage.flow.sports", flowIcon: "⚾",
    technical: "stage.technical.sports", technicalIcon: "📐",
    incident: "stage.incident.sports", incidentIcon: "🏆",
    incidentBadge: "HISTORIC",
    incidentBorder: "border-amber-500/25", incidentHeaderBg: "bg-amber-500/10 border-b border-amber-500/20",
    incidentDot: "bg-amber-400", incidentBadgeCss: "text-amber-600 bg-amber-500/10 border border-amber-500/20",
    incidentImpactBg: "border-b border-white/5 bg-amber-500/5", incidentTitleColor: "text-amber-300",
    incidentImpactLabel: "stage.incident.impactLabel.sports",
  },
  arts: {
    flow: "stage.flow.arts", flowIcon: "✂️",
    technical: "stage.technical.arts", technicalIcon: "🎨",
    incident: "stage.incident.arts", incidentIcon: "📖",
    incidentBadge: "SPOTLIGHT",
    incidentBorder: "border-violet-500/25", incidentHeaderBg: "bg-violet-500/10 border-b border-violet-500/20",
    incidentDot: "bg-violet-400", incidentBadgeCss: "text-violet-600 bg-violet-500/10 border border-violet-500/20",
    incidentImpactBg: "border-b border-white/5 bg-violet-500/5", incidentTitleColor: "text-violet-300",
    incidentImpactLabel: "stage.incident.impactLabel.arts",
  },
  driving: {
    flow: "stage.flow.driving", flowIcon: "🛣️",
    technical: "stage.technical.driving", technicalIcon: "📋",
    incident: "stage.incident.driving", incidentIcon: "🚗",
    incidentBadge: "SCENARIO",
    incidentBorder: "border-blue-500/25", incidentHeaderBg: "bg-blue-500/10 border-b border-blue-500/20",
    incidentDot: "bg-blue-400", incidentBadgeCss: "text-blue-600 bg-blue-500/10 border border-blue-500/20",
    incidentImpactBg: "border-b border-white/5 bg-blue-500/5", incidentTitleColor: "text-blue-300",
    incidentImpactLabel: "stage.incident.impactLabel.driving",
  },
  health: {
    flow: "stage.flow.health", flowIcon: "🩺",
    technical: "stage.technical.health", technicalIcon: "🧬",
    incident: "stage.incident.health", incidentIcon: "📋",
    incidentBadge: "CASE STUDY",
    incidentBorder: "border-teal-500/25", incidentHeaderBg: "bg-teal-500/10 border-b border-teal-500/20",
    incidentDot: "bg-teal-400", incidentBadgeCss: "text-teal-600 bg-teal-500/10 border border-teal-500/20",
    incidentImpactBg: "border-b border-white/5 bg-teal-500/5", incidentTitleColor: "text-teal-300",
    incidentImpactLabel: "stage.incident.impactLabel.health",
  },
};

const DEFAULT_THEME: SectionTheme = {
  flow: "stage.flow.default", flowIcon: "🔄",
  technical: "stage.technical.default", technicalIcon: "🔍",
  incident: "stage.incident.default", incidentIcon: "📖",
  incidentBadge: "SPOTLIGHT",
  incidentBorder: "border-indigo-500/25", incidentHeaderBg: "bg-indigo-500/10 border-b border-indigo-500/20",
  incidentDot: "bg-indigo-400", incidentBadgeCss: "text-indigo-600 bg-indigo-500/10 border border-indigo-500/20",
  incidentImpactBg: "border-b border-white/5 bg-indigo-500/5", incidentTitleColor: "text-indigo-300",
  incidentImpactLabel: "stage.incident.impactLabel.arts",
};

function SectionHeader({ color, icon, label }: { color: string; icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-base">{icon}</span>
      <h2 className={`font-bold text-xs uppercase tracking-widest ${color}`}>{label}</h2>
      <div className={`flex-1 h-px opacity-20 bg-current ${color}`} />
    </div>
  );
}

// Highlights the first sentence of a paragraph in bold light-blue as a
// scannable topic sentence. The rest renders in normal gray with RichText.
function RichParagraph({ text, lead = "blue", context = "security", boldLead = true }: { text: string; lead?: "blue" | "pink"; context?: "security" | "general"; boldLead?: boolean }) {
  if (!boldLead) {
    return <RichText text={text} context={context} />;
  }
  const firstDot = text.search(/[.!?]\s/);
  const split = firstDot !== -1 ? firstDot + 1 : -1;
  const leadText = split !== -1 ? text.slice(0, split) : text;
  const restText = split !== -1 ? text.slice(split) : "";
  const leadClass = lead === "pink"
    ? "text-pink-300/80 font-medium"
    : "text-sky-300/80 font-medium";
  return (
    <span>
      <span className={leadClass}><RichText text={leadText} context={context} /></span>
      {restText && <RichText text={restText} context={context} />}
    </span>
  );
}

// Renders one body block. Lines that begin with "- ", "• " or "* " become a real
// <ul>; an intro line followed by bullets renders the intro as prose then the list;
// plain prose falls back to a single <p> so the lead-sentence styling still spans
// the whole paragraph. Lets stage content use bullets instead of paragraph dumps.
function RichBlock({
  text,
  className = "",
  itemClassName = "text-gray-300 text-sm leading-relaxed",
  markerClass = "marker:text-cyan-400/70",
  lead = "blue",
  context = "security",
  boldLead = true,
}: {
  text: string;
  className?: string;
  itemClassName?: string;
  markerClass?: string;
  lead?: "blue" | "pink";
  context?: "security" | "general";
  boldLead?: boolean;
}) {
  const isBullet = (l: string) => /^\s*[-•*]\s+/.test(l);
  const stripBullet = (l: string) => l.replace(/^\s*[-•*]\s+/, "");
  const rawLines = text.split("\n");

  // Group consecutive non-empty lines into ordered prose / list segments.
  const segments: Array<{ type: "p" | "ul"; lines: string[] }> = [];
  for (const line of rawLines) {
    if (line.trim().length === 0) continue;
    const type = isBullet(line) ? "ul" : "p";
    const last = segments[segments.length - 1];
    if (last && last.type === type) last.lines.push(line);
    else segments.push({ type, lines: [line] });
  }

  const hasList = segments.some((s) => s.type === "ul");

  // No bullets — preserve the original single-paragraph behaviour.
  if (!hasList) {
    return (
      <p className={className}>
        <RichParagraph text={text} lead={lead} context={context} boldLead={boldLead} />
      </p>
    );
  }

  const renderSegment = (
    seg: { type: "p" | "ul"; lines: string[] },
    key: number,
    isFirstProse: boolean,
  ) => {
    if (seg.type === "ul") {
      return (
        <ul key={key} className={`list-disc pl-5 space-y-1.5 ${markerClass}`}>
          {seg.lines.map((l, i) => (
            <li key={i} className={itemClassName}>
              <RichText text={stripBullet(l)} context={context} />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={key} className={className}>
        <RichParagraph text={seg.lines.join(" ")} lead={lead} context={context} boldLead={boldLead && isFirstProse} />
      </p>
    );
  };

  // Single list with no intro prose — return it directly so parent spacing stays clean.
  if (segments.length === 1) {
    return renderSegment(segments[0], 0, true);
  }

  let proseSeen = false;
  return (
    <div className="space-y-2">
      {segments.map((seg, i) => {
        const isFirstProse = seg.type === "p" && !proseSeen;
        if (seg.type === "p") proseSeen = true;
        return renderSegment(seg, i, isFirstProse);
      })}
    </div>
  );
}

export default function StageInfo({
  stage,
  onStart,
  isDual = false,
  translation = null,
  backHref,
}: {
  stage: StageConfig;
  onStart: (mode?: "quiz" | "ctf") => void;
  isDual?: boolean;
  translation?: StageTranslation | null;
  backHref?: string;
}) {
  const { t } = useLocale();
  const { info } = stage;
  const downloads = info.downloads ?? stageDownloads[stage.id] ?? [];
  const theme: SectionTheme = SECTION_THEMES[stage.category] ?? DEFAULT_THEME;
  const richContext: "security" | "general" = ["cybersecurity", "ai", "owasp"].includes(stage.category) ? "security" : "general";

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
        <BackLink href={backHref} />

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

          {/* CyberOps domain badges */}
          {(() => {
            const domains = getDomainsForStage(stage.id);
            if (!domains.length) return null;
            return (
              <div className="flex flex-wrap gap-2 mt-2 mb-1">
                {domains.map(d => (
                  <Link key={d.id} href="/cyberops"
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 hover:border-blue-400 hover:bg-blue-500/15 transition-colors">
                    <span>🎓</span>
                    <span className="font-medium">CyberOps: {d.name}</span>
                  </Link>
                ))}
              </div>
            );
          })()}

          {/* Cert path badges — deduplicated by certId */}
          {(() => {
            const certMap: Record<string, { label: string; cls: string }> = {
              "comptia-secplus": { label: "Security+", cls: "border-indigo-500/25 bg-indigo-500/8 text-indigo-400 hover:border-indigo-400/50" },
              "isc2-cc":         { label: "ISC² CC",   cls: "border-teal-500/25 bg-teal-500/8 text-teal-400 hover:border-teal-400/50" },
              "comptia-netplus": { label: "Network+",  cls: "border-blue-500/25 bg-blue-500/8 text-blue-400 hover:border-blue-400/50" },
              "comptia-cysa":    { label: "CySA+",     cls: "border-orange-500/25 bg-orange-500/8 text-orange-400 hover:border-orange-400/50" },
            };
            const certDomains = getCertDomainsForStage(stage.id);
            const seen = new Set<string>();
            const badges = certDomains.filter(d => {
              if (seen.has(d.certId)) return false;
              seen.add(d.certId);
              return true;
            });
            if (!badges.length) return null;
            return (
              <div className="flex flex-wrap gap-1.5 mt-1.5 mb-1">
                {badges.map(d => {
                  const cfg = certMap[d.certId];
                  if (!cfg) return null;
                  return (
                    <Link key={d.certId} href="/certs"
                      className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border transition-colors ${cfg.cls}`}>
                      <span>📜</span>
                      <span className="font-medium">{cfg.label}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })()}

          {/* Title — links to real-world incident/context section below */}
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
            <a href="#real-world" className="hover:text-cyan-300 transition-colors cursor-pointer">{stage.title}</a>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed"><RichText text={tagline} context={richContext} /></p>

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
              <RichBlock
                key={i}
                text={para}
                className={
                  i === 0
                    ? "text-gray-300 text-base leading-relaxed border-l-2 border-cyan-500/50 pl-4"
                    : "text-gray-400 leading-relaxed text-sm"
                }
                itemClassName={
                  i === 0
                    ? "text-gray-300 text-base leading-relaxed"
                    : "text-gray-400 text-sm leading-relaxed"
                }
                markerClass="marker:text-cyan-400/70"
                lead="blue"
                context={richContext}
                boldLead={false}
              />
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
          <SectionHeader color="text-rose-400" icon={theme.flowIcon} label={t(theme.flow)} />
          <div className="bg-white/2 border border-white/8 rounded-xl p-6">
            <AttackDiagram nodes={info.diagram.nodes} category={stage.category} />
          </div>
        </section>

        {/* ── Technical Deep-Dive ───────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeader color="text-emerald-400" icon={theme.technicalIcon} label={t(theme.technical)} />
          <div className="rounded-xl border border-emerald-500/15 overflow-hidden">
            <div className="px-5 py-4 bg-emerald-500/5 border-b border-emerald-500/15">
              <h3 className="text-white font-bold text-base"><RichText text={technicalTitle} context={richContext} /></h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              {technicalBody.map((para, i) => (
                <RichBlock
                  key={i}
                  text={para}
                  className="text-gray-300 leading-relaxed text-sm"
                  itemClassName="text-gray-300 text-sm leading-relaxed"
                  markerClass="marker:text-emerald-400/70"
                  lead="blue"
                  context={richContext}
                />
              ))}
            </div>
            {info.technical.codeExample && (
              <div className="px-5 pb-5">
                <p className="text-emerald-600 text-xs font-mono mb-2 uppercase tracking-wider">
                  ▸ {info.technical.codeExample.label}
                </p>
                <pre className="bg-black/70 border border-emerald-500/20 rounded-lg p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre">
                  {info.technical.codeExample.code.split("\n").map((line, i) => {
                    const trimmed = line.trimStart();
                    const isComment =
                      trimmed.startsWith("#") ||
                      trimmed.startsWith("//") ||
                      trimmed.startsWith("/*") ||
                      trimmed.startsWith("*") ||
                      trimmed.startsWith("--");
                    return (
                      <span key={i} style={{ color: isComment ? "rgba(134,239,172,0.38)" : "#86efac" }}>
                        {line}
                        {"\n"}
                      </span>
                    );
                  })}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* ── Incident / Cultural Context / Historical Moment ──────────────── */}
        <section id="real-world" className="mb-10">
          <SectionHeader color="text-red-400" icon={theme.incidentIcon} label={t(theme.incident)} />
          <div className={`rounded-xl border ${theme.incidentBorder} overflow-hidden`}>
            {/* Header bar */}
            <div className={`px-5 py-3 ${theme.incidentHeaderBg} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${theme.incidentDot} animate-pulse flex-shrink-0`} />
                <h3 className={`${theme.incidentTitleColor} font-bold text-sm`}><RichText text={incidentTitle} context={richContext} /></h3>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${theme.incidentBadgeCss}`}>
                {theme.incidentBadge}
              </span>
            </div>

            {/* Meta strip */}
            <div className="px-5 py-3 bg-black/30 border-b border-white/5 flex flex-wrap gap-x-5 gap-y-1">
              <span className="text-xs text-gray-500">📅 <span className="text-gray-400">{info.incident.when}</span></span>
              <span className="text-xs text-gray-500">📍 <span className="text-gray-400">{info.incident.where}</span></span>
            </div>

            {/* Impact / significance callout */}
            <div className={`px-5 py-4 ${theme.incidentImpactBg}`}>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-semibold">{t(theme.incidentImpactLabel)}</p>
              <p className={`${theme.incidentTitleColor} font-semibold text-sm leading-snug`}><RichText text={incidentImpact} context={richContext} /></p>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-3">
              {incidentBody.map((para, i) => (
                <RichBlock
                  key={i}
                  text={para}
                  className="text-gray-300 leading-relaxed text-sm"
                  itemClassName="text-gray-300 text-sm leading-relaxed"
                  markerClass="marker:text-red-400/70"
                  lead="pink"
                  context={richContext}
                />
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
                      <RichText text={timelineEvents?.[i] ?? entry.event} />
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
                <p className="text-gray-200 text-sm leading-relaxed"><RichText text={item} /></p>
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
                  <span className="text-sky-400 group-hover:text-sky-300 text-sm transition-colors truncate"><RichText text={ref.title} /></span>
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
                        <p className="text-gray-500 text-xs"><RichText text={dl.description} /></p>
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
          {isDual ? (
            <div className="px-6 py-5">
              <p className="text-white font-bold text-lg">{t("stage.readyForChallenge")}</p>
              <p className="text-gray-400 text-sm mt-0.5 mb-4">Choose how you want to clear this stage.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onStart("ctf")}
                  className="text-left rounded-xl border-2 border-green-500/40 hover:border-green-400 bg-green-500/5 hover:bg-green-500/10 p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="text-3xl mb-2">🚩</div>
                  <h3 className="text-white font-bold mb-0.5">Run the CTF</h3>
                  <p className="text-gray-400 text-xs mb-3">Work the terminal and capture the flag.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-green-400 border border-green-500/30 bg-green-500/10 rounded-full px-2.5 py-1">
                    ✓ Full clear · +{stage.xp} 🪙
                  </span>
                </button>
                <button
                  onClick={() => onStart("quiz")}
                  className="text-left rounded-xl border-2 border-amber-500/40 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="text-white font-bold mb-0.5">Take the Quiz</h3>
                  <p className="text-gray-400 text-xs mb-3">5 quick questions to test what you know.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 border border-amber-500/30 bg-amber-500/10 rounded-full px-2.5 py-1">
                    ◗ Half clear
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">{t("stage.readyForChallenge")}</p>
                <p className="text-gray-400 text-sm mt-0.5">
                  {stage.challengeType === "ctf" ? t("stage.ctfExploit") : t("stage.quizTest")}
                </p>
              </div>
              <button
                onClick={() => onStart()}
                className="px-8 py-3 font-black rounded-xl transition-all text-black flex-shrink-0 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                {stage.challengeType === "ctf" ? t("stage.startCtf") : t("stage.startQuiz")} →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
