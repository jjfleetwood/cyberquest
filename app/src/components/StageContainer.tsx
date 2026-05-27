"use client";

import { useState } from "react";
import StageInfo from "./StageInfo";
import CtfChallenge from "./CtfChallenge";
import QuizChallenge from "./QuizChallenge";
import type { StageConfig, CtfQuizEntry } from "@/data/types";
import type { StageTranslation } from "@/data/translations/types";
import { useLocale } from "@/contexts/LocaleContext";

type TranslatedQuestion = { q: string; options: [string, string] };

export default function StageContainer({ stage, isPro = false, translation = null, ctfQuiz, ctfQuizTranslation }: {
  stage: StageConfig | null;
  isPro?: boolean;
  translation?: StageTranslation | null;
  ctfQuiz?: CtfQuizEntry;
  ctfQuizTranslation?: TranslatedQuestion[];
}) {
  const { t } = useLocale();
  const [phase, setPhase] = useState<"info" | "challenge">("info");

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <p className="text-gray-500">{t("stage.notFound")}</p>
      </div>
    );
  }

  const backHref = `/stages/epoch/${stage.epochId}`;

  if (phase === "info") {
    return <StageInfo stage={stage} onStart={() => setPhase("challenge")} translation={translation} />;
  }

  if (stage.challengeType === "ctf" && stage.ctf) {
    return <CtfChallenge stage={stage} backHref={backHref} isPro={isPro} ctfQuiz={ctfQuiz} ctfQuizTranslation={ctfQuizTranslation} />;
  }

  return <QuizChallenge stage={stage} backHref={backHref} />;
}
