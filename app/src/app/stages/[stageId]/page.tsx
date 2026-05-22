import { getStage } from "@/data/stages";
import StageContainer from "@/components/StageContainer";
import type { StageConfig } from "@/data/types";
import { getStageOverride, applyStageOverride, canAccessEpoch } from "@/lib/cms";
import { canAccessStage, getUserTier } from "@/lib/access";
import { getSessionFromCookies } from "@/lib/server-session";
import ProPaywall from "@/components/ProPaywall";
import Link from "next/link";

export default async function StagePage({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;
  const stageBase = getStage(stageId) ?? null;
  const username = await getSessionFromCookies();

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
            <h2 className="text-2xl font-black text-white mb-2">Access Restricted</h2>
            <p className="text-gray-500 text-sm mb-6">
              This module is not available on your account. Contact an administrator to request access.
            </p>
            <Link href="/stages" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
              ← Back to Stage Map
            </Link>
          </div>
        </div>
      );
    }

    // Pro tier gating
    const tierAllowed = await canAccessStage(stageId, username);
    if (!tierAllowed) {
      return <ProPaywall stageTitle={stageBase.title} epochId={stageBase.epochId} />;
    }
  }

  const isPro = username ? (await getUserTier(username)) === "pro" : false;

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

  return <StageContainer stage={safeStage} isPro={isPro} />;
}
