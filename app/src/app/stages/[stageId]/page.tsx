import { getStage } from "@/data/stages";
import StageContainer from "@/components/StageContainer";
import type { StageConfig, CtfQuizEntry } from "@/data/types";
import type { StageTranslation } from "@/data/translations/types";
import ctfQuizData from "@/data/ctf-quiz-data.json";
import ctfQuizEs from "@/data/translations/ctf-quiz-es.json";
import ctfQuizFr from "@/data/translations/ctf-quiz-fr.json";
import ctfQuizDe from "@/data/translations/ctf-quiz-de.json";
import ctfQuizHi from "@/data/translations/ctf-quiz-hi.json";
import ctfQuizPt from "@/data/translations/ctf-quiz-pt.json";
import ctfQuizPl from "@/data/translations/ctf-quiz-pl.json";
import { getStageOverride, applyStageOverride, canAccessEpoch } from "@/lib/cms";
import { canAccessStage, getUserTier } from "@/lib/access";
import { getSessionFromCookies } from "@/lib/server-session";
import ProPaywall from "@/components/ProPaywall";
import Link from "next/link";
import { cookies } from "next/headers";
import esTranslations from "@/data/translations/es.json";
import frTranslations from "@/data/translations/fr.json";
import deTranslations from "@/data/translations/de.json";
import hiTranslations from "@/data/translations/hi.json";
import ptTranslations from "@/data/translations/pt.json";
import metaEs from "@/data/translations/meta-es.json";
import metaFr from "@/data/translations/meta-fr.json";
import metaDe from "@/data/translations/meta-de.json";
import metaHi from "@/data/translations/meta-hi.json";
import metaPt from "@/data/translations/meta-pt.json";
import metaPl from "@/data/translations/meta-pl.json";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import frMessages from "@/messages/fr.json";
import deMessages from "@/messages/de.json";
import hiMessages from "@/messages/hi.json";
import ptMessages from "@/messages/pt.json";
import plMessages from "@/messages/pl.json";
import plTranslations from "@/data/translations/pl.json";

const TRANSLATION_MAPS: Record<string, Record<string, StageTranslation>> = {
  es: esTranslations as Record<string, StageTranslation>,
  fr: frTranslations as Record<string, StageTranslation>,
  de: deTranslations as Record<string, StageTranslation>,
  hi: hiTranslations as Record<string, StageTranslation>,
  pt: ptTranslations as Record<string, StageTranslation>,
  pl: plTranslations as Record<string, StageTranslation>,
};

type QuizTranslationEntry = { questions: { q: string; options: [string, string] }[] };
const CTF_QUIZ_TRANSLATION_MAPS: Record<string, Record<string, QuizTranslationEntry>> = {
  es: ctfQuizEs as unknown as Record<string, QuizTranslationEntry>,
  fr: ctfQuizFr as unknown as Record<string, QuizTranslationEntry>,
  de: ctfQuizDe as unknown as Record<string, QuizTranslationEntry>,
  hi: ctfQuizHi as unknown as Record<string, QuizTranslationEntry>,
  pt: ctfQuizPt as unknown as Record<string, QuizTranslationEntry>,
  pl: ctfQuizPl as unknown as Record<string, QuizTranslationEntry>,
};

type MetaMap = { stages: Record<string, { t: string; w: string }>; epochs: Record<string, unknown> };
const META_MAPS: Record<string, MetaMap> = {
  es: metaEs as MetaMap,
  fr: metaFr as MetaMap,
  de: metaDe as MetaMap,
  hi: metaHi as MetaMap,
  pt: metaPt as MetaMap,
  pl: metaPl as MetaMap,
};

const SERVER_MSG: Record<string, Record<string, string>> = {
  en: enMessages as Record<string, string>,
  es: esMessages as Record<string, string>,
  fr: frMessages as Record<string, string>,
  de: deMessages as Record<string, string>,
  hi: hiMessages as Record<string, string>,
  pt: ptMessages as Record<string, string>,
  pl: plMessages as Record<string, string>,
};
function serverT(locale: string, key: string): string {
  return SERVER_MSG[locale]?.[key] ?? SERVER_MSG.en[key] ?? key;
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;
  const stageBase = getStage(stageId) ?? null;
  const username = await getSessionFromCookies();

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";
  const translation: StageTranslation | null =
    locale !== "en" ? (TRANSLATION_MAPS[locale]?.[stageId] ?? null) : null;

  if (stageBase) {
    // Epoch-level admin access control
    const epochAllowed = await canAccessEpoch(stageBase.epochId, username);
    if (!epochAllowed) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
        >
          <div className="text-center max-w-sm">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-black text-white mb-2">{serverT(locale, "stage.accessRestricted")}</h2>
            <p className="text-gray-500 text-sm mb-6">
              {serverT(locale, "stage.accessRestrictedDesc")}
            </p>
            <Link href="/stages" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
              {serverT(locale, "epoch.backToStageMap")}
            </Link>
          </div>
        </div>
      );
    }

    // Tier / sequential gating
    const tierAllowed = await canAccessStage(stageId, username);
    if (!tierAllowed) {
      const tier = username ? await getUserTier(username) : null;
      if (tier === "pro") {
        // Sequential lock — show "complete prior stages" message
        return (
          <div className="min-h-screen flex items-center justify-center px-4"
            style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
          >
            <div className="text-center max-w-sm">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-black text-white mb-2">{serverT(locale, "stage.completePrevious")}</h2>
              <p className="text-gray-500 text-sm mb-6">
                {serverT(locale, "stage.completePreviousDesc")}
              </p>
              <Link href={`/stages/epoch/${stageBase.epochId}`} className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                {serverT(locale, "stage.backToEpoch")}
              </Link>
            </div>
          </div>
        );
      }
      return <ProPaywall stageTitle={stageBase.title} epochId={stageBase.epochId} />;
    }
  }

  const tier = username ? await getUserTier(username) : null;
  const isPro = tier === "pro" || tier === "all-star";

  let stage: StageConfig | null = stageBase;

  if (stage) {
    const override = await getStageOverride(stageId);
    stage = applyStageOverride(stage, override);
  }

  // Strip secrets and non-serializable values before passing to client
  let safeStage: StageConfig | null = stage;
  if (safeStage?.ctf) {
    safeStage = {
      ...safeStage,
      ctf: { ...safeStage.ctf, flag: undefined, extraCommands: undefined },
    };
  }
  if (safeStage?.quiz) {
    safeStage = {
      ...safeStage,
      quiz: {
        questions: safeStage.quiz.questions.map(({ correctIndex: _ci, explanation: _ex, ...q }) => q),
      },
    };
  }

  // Apply translated stage title and wonder name from meta file
  if (safeStage && locale !== "en") {
    const metaEntry = META_MAPS[locale]?.stages?.[stageId];
    if (metaEntry) {
      safeStage = {
        ...safeStage,
        title: metaEntry.t || safeStage.title,
        wonder: { ...safeStage.wonder, name: metaEntry.w || safeStage.wonder.name },
      };
    }
  }

  // Load CTF quiz data for this stage
  const ctfQuiz: CtfQuizEntry | undefined =
    safeStage?.challengeType === "ctf"
      ? (ctfQuizData as unknown as Record<string, CtfQuizEntry>)[stageId]
      : undefined;

  const ctfQuizTranslation =
    locale !== "en" && ctfQuiz
      ? CTF_QUIZ_TRANSLATION_MAPS[locale]?.[stageId]?.questions
      : undefined;

  return <StageContainer stage={safeStage} isPro={isPro} translation={translation} ctfQuiz={ctfQuiz} ctfQuizTranslation={ctfQuizTranslation} />;
}
