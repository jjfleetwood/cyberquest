import { NextRequest, NextResponse } from "next/server";
import { getExamBank, gradeQuestion, type ExamMode } from "@/lib/exam-banks";
import type { CertId } from "@/data/cert-domains";

const VALID_CERTS: CertId[] = [
  "comptia-secplus", "isc2-cc", "comptia-netplus", "comptia-cysa",
  "isaca-cisa", "isaca-cism", "isaca-crisc", "comptia-aiplus",
];

// Exam shape per mode: how many questions, time limit, and pass threshold.
const EXAM_CONFIG = {
  dmv: { count: 36, durationSec: 30 * 60, passPct: 83 },
  cert: { count: 30, durationSec: 30 * 60, passPct: 75 },
} as const;

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseMode(body: Record<string, unknown>): ExamMode | null {
  if (body.mode === "dmv") return { kind: "dmv" };
  if (body.mode === "cert" && typeof body.certId === "string" && VALID_CERTS.includes(body.certId as CertId)) {
    return { kind: "cert", certId: body.certId as CertId };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // ── Grade a finished attempt ──────────────────────────────────────────────
  if (body.action === "grade") {
    if (!Array.isArray(body.answers)) {
      return NextResponse.json({ error: "answers required" }, { status: 400 });
    }
    let correct = 0;
    const results = body.answers.map((a: { stageId?: unknown; questionId?: unknown; selectedText?: unknown }) => {
      const stageId = typeof a.stageId === "string" ? a.stageId : "";
      const questionId = typeof a.questionId === "string" ? a.questionId : "";
      const selectedText = typeof a.selectedText === "string" ? a.selectedText : null;
      const key = gradeQuestion(stageId, questionId);
      const isCorrect = !!key && selectedText != null && selectedText === key.correctText;
      if (isCorrect) correct++;
      return {
        stageId, questionId,
        correct: isCorrect,
        correctText: key?.correctText ?? "",
        explanation: key?.explanation ?? "",
      };
    });
    const total = results.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return NextResponse.json({ total, correct, pct, results });
  }

  // ── Start a new attempt ───────────────────────────────────────────────────
  const mode = parseMode(body as Record<string, unknown>);
  if (!mode) {
    return NextResponse.json({ error: "invalid mode" }, { status: 400 });
  }

  const bank = getExamBank(mode);
  if (bank.length === 0) {
    return NextResponse.json({ error: "no questions available for this exam yet", questions: [] }, { status: 200 });
  }

  const cfg = mode.kind === "dmv" ? EXAM_CONFIG.dmv : EXAM_CONFIG.cert;
  const count = Math.min(cfg.count, bank.length);
  const picked = shuffle(bank).slice(0, count);

  // Strip correctIndex/explanation; shuffle option order so position carries no signal.
  const questions = picked.map((src, i) => ({
    key: i,
    stageId: src.stageId,
    questionId: src.question.id,
    type: src.question.type,
    challenge: src.question.challenge,
    text: src.question.text,
    options: shuffle(src.question.options),
  }));

  return NextResponse.json({
    config: { total: questions.length, durationSec: cfg.durationSec, passPct: cfg.passPct, poolSize: bank.length },
    questions,
  });
}
