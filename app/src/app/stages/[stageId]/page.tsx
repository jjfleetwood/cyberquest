import QuizChallenge from "@/components/QuizChallenge";
import CtfTerminal from "@/components/CtfTerminal";

export default async function StagePage({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;

  if (stageId === "stage-02") {
    return <CtfTerminal />;
  }

  return <QuizChallenge />;
}
