import "server-only";
import { stages } from "@/data/stages";
import { getStagesForCert, type CertId } from "@/data/cert-domains";
import type { QuizQuestion } from "@/data/types";

// Server-only aggregation of quiz questions into practice-exam pools. Pulls from
// the full stages data (which still carries correctIndex) so exams can be built
// and graded server-side without ever exposing the answer key to the client.

export type ExamSource = { stageId: string; question: QuizQuestion };

export type ExamMode =
  | { kind: "dmv" }
  | { kind: "cert"; certId: CertId };

const DRIVING_EPOCHS = ["driving-1", "driving-2", "driving-3"];

function collectQuestions(stageIds: Set<string>): ExamSource[] {
  const out: ExamSource[] = [];
  for (const s of stages) {
    if (!stageIds.has(s.id)) continue;
    for (const q of s.quiz?.questions ?? []) {
      if (q.correctIndex != null) out.push({ stageId: s.id, question: q });
    }
  }
  return out;
}

export function getExamBank(mode: ExamMode): ExamSource[] {
  if (mode.kind === "dmv") {
    const ids = new Set(stages.filter((s) => DRIVING_EPOCHS.includes(s.epochId)).map((s) => s.id));
    return collectQuestions(ids);
  }
  return collectQuestions(new Set(getStagesForCert(mode.certId)));
}

// Look up a single question's correct option text + explanation for grading.
export function gradeQuestion(stageId: string, questionId: string): { correctText: string; explanation: string } | null {
  const s = stages.find((st) => st.id === stageId);
  const q = s?.quiz?.questions.find((qq) => qq.id === questionId);
  if (!q || q.correctIndex == null) return null;
  return { correctText: q.options[q.correctIndex], explanation: q.explanation ?? "" };
}
