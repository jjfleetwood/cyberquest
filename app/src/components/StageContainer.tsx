"use client";

import { useState } from "react";
import StageInfo from "./StageInfo";
import CtfChallenge from "./CtfChallenge";
import QuizChallenge from "./QuizChallenge";
import type { StageConfig, CtfQuizEntry, AuditQuizEntry } from "@/data/types";
import type { StageTranslation } from "@/data/translations/types";
import { useLocale } from "@/contexts/LocaleContext";

type TranslatedQuestion = { q: string; options: [string, string] };

export default function StageContainer({ stage, isPro = false, translation = null, ctfQuiz, ctfQuizTranslation, auditQuiz }: {
  stage: StageConfig | null;
  isPro?: boolean;
  translation?: StageTranslation | null;
  ctfQuiz?: CtfQuizEntry;
  ctfQuizTranslation?: TranslatedQuestion[];
  auditQuiz?: AuditQuizEntry;
}) {
  const { t } = useLocale();
  const [phase, setPhase] = useState<"info" | "challenge">("info");
  const [mode, setMode] = useState<"quiz" | "ctf" | null>(null);

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <p className="text-gray-500">{t("stage.notFound")}</p>
      </div>
    );
  }

  const backHref = `/stages/epoch/${stage.epochId}`;

  // A dual-mode stage offers both a CTF and a full quiz on the same topic.
  const hasQuiz = (stage.quiz?.questions?.length ?? 0) > 0;
  const isDual = stage.challengeType === "ctf" && !!stage.ctf && hasQuiz;

  if (phase === "info") {
    // For a dual-mode stage the learner picks the quiz (half) or CTF (full) right in
    // the "ready for the challenge" box; that choice arrives here as `chosen`.
    return (
      <StageInfo
        stage={stage}
        isDual={isDual}
        onStart={(chosen) => {
          if (chosen) setMode(chosen);
          setPhase("challenge");
        }}
        translation={translation}
        backHref={backHref}
      />
    );
  }

  if (stage.challengeType === "ctf" && stage.ctf && mode !== "quiz") {
    return <CtfChallenge stage={stage} backHref={backHref} isPro={isPro} ctfQuiz={ctfQuiz} ctfQuizTranslation={ctfQuizTranslation} auditQuiz={auditQuiz} />;
  }

  return <QuizChallenge stage={stage} backHref={backHref} />;
}
