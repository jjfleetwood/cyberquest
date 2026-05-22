"use client";

import { useState } from "react";
import StageInfo from "./StageInfo";
import CtfChallenge from "./CtfChallenge";
import QuizChallenge from "./QuizChallenge";
import type { StageConfig } from "@/data/types";

export default function StageContainer({ stage, isPro = false }: { stage: StageConfig | null; isPro?: boolean }) {
  const [phase, setPhase] = useState<"info" | "challenge">("info");

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <p className="text-gray-500">Stage not found</p>
      </div>
    );
  }

  const backHref = `/stages/epoch/${stage.epochId}`;

  if (phase === "info") {
    return <StageInfo stage={stage} onStart={() => setPhase("challenge")} />;
  }

  if (stage.challengeType === "ctf" && stage.ctf) {
    return <CtfChallenge stage={stage} backHref={backHref} isPro={isPro} />;
  }

  return <QuizChallenge stage={stage} backHref={backHref} />;
}
