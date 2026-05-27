"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { CtfQuizEntry, CtfQuizQuestion } from "@/data/types";

type TranslatedQuestion = { q: string; options: [string, string] };

type Props = {
  quiz: CtfQuizEntry;
  translatedQuestions?: TranslatedQuestion[];
  onDone: () => void;
};

export default function CtfQuizPanel({ quiz, translatedQuestions, onDone }: Props) {
  const { t } = useLocale();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(0 | 1 | null)[]>(new Array(quiz.questions.length).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  function tr(key: string, vars: Record<string, string | number>): string {
    let s = t(key);
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  }

  const questions: (CtfQuizQuestion & { displayQ: string; displayOptions: [string, string] })[] =
    quiz.questions.map((q, i) => ({
      ...q,
      displayQ: translatedQuestions?.[i]?.q ?? q.q,
      displayOptions: [
        translatedQuestions?.[i]?.options[0] ?? q.options[0],
        translatedQuestions?.[i]?.options[1] ?? q.options[1],
      ],
    }));

  const total = questions.length;
  const question = questions[current];
  const selectedAnswer = answers[current];
  const score = answers.filter((a, i) => a === quiz.questions[i].correct).length;
  const isLast = current === total - 1;

  function handleAnswer(choice: 0 | 1) {
    if (selectedAnswer !== null) return;
    const next = [...answers];
    next[current] = choice;
    setAnswers(next);
    setRevealed(true);
  }

  function handleNext() {
    setRevealed(false);
    if (isLast) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (done) {
    const pct = score / total;
    const msg =
      pct === 1
        ? t("quiz.ctf.scorePerfect")
        : pct >= 0.6
        ? t("quiz.ctf.scoreGood")
        : t("quiz.ctf.scoreOk");

    return (
      <div className="border border-white/10 rounded-xl bg-white/2 px-6 py-8 text-center space-y-4">
        <div className="text-4xl">{pct === 1 ? "🏆" : pct >= 0.6 ? "⭐" : "📖"}</div>
        <h3 className="text-white font-bold text-lg">{t("quiz.ctf.heading")}</h3>
        <p className="text-gray-300 text-sm">{tr("quiz.ctf.score", { score, total })}</p>
        <p className="text-gray-500 text-xs">{msg}</p>

        {/* Per-question summary */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <div
                key={i}
                className={`rounded-lg py-2 text-xs font-mono font-bold ${
                  correct ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {correct ? "✓" : "✗"} Q{i + 1}
              </div>
            );
          })}
        </div>

        <button
          onClick={onDone}
          className="mt-4 px-8 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm transition-colors"
        >
          {t("quiz.ctf.continue")}
        </button>
      </div>
    );
  }

  const isCorrect = revealed && selectedAnswer === question.correct;

  return (
    <div className="border border-white/10 rounded-xl bg-white/2 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/3">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            {t("quiz.ctf.heading")}
          </span>
          <p className="text-[10px] text-gray-600 mt-0.5">{t("quiz.ctf.subheading")}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Progress dots */}
          {questions.map((_, i) => {
            const ans = answers[i];
            const isDone = ans !== null;
            const isRight = isDone && ans === quiz.questions[i].correct;
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current
                    ? "bg-cyan-400"
                    : isDone
                    ? isRight
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-white/15"
                }`}
              />
            );
          })}
        </div>
        <button
          onClick={onDone}
          className="text-[10px] text-gray-700 hover:text-gray-500 transition-colors"
        >
          {t("quiz.ctf.skip")}
        </button>
      </div>

      {/* Question */}
      <div className="px-5 py-5">
        <p className="text-[10px] text-gray-600 mb-2 font-mono uppercase tracking-widest">
          {tr("quiz.ctf.question", { n: current + 1, total })}
        </p>
        <p className="text-gray-100 text-sm font-medium leading-relaxed mb-5">{question.displayQ}</p>

        {/* Two answer buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([0, 1] as const).map((optIdx) => {
            const chosen = selectedAnswer === optIdx;
            const isRight = optIdx === question.correct;
            let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm leading-snug transition-all duration-150 ";
            if (!revealed) {
              cls += "border-white/15 bg-white/3 text-gray-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:text-white cursor-pointer";
            } else if (isRight) {
              cls += "border-green-500/50 bg-green-500/10 text-green-300 cursor-default";
            } else if (chosen) {
              cls += "border-red-500/40 bg-red-500/8 text-red-300 cursor-default";
            } else {
              cls += "border-white/8 bg-white/1 text-gray-600 cursor-default";
            }
            return (
              <button key={optIdx} className={cls} onClick={() => handleAnswer(optIdx)} disabled={revealed}>
                <span className="text-[10px] font-mono text-gray-600 mr-2">{optIdx === 0 ? "A" : "B"}</span>
                {question.displayOptions[optIdx]}
                {revealed && isRight && <span className="ml-2 text-green-400">✓</span>}
                {revealed && chosen && !isRight && <span className="ml-2 text-red-400">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Result + Next */}
        {revealed && (
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-sm font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? t("quiz.ctf.correct") : t("quiz.ctf.incorrect")}
            </span>
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-xs transition-colors"
            >
              {isLast ? t("quiz.ctf.finish") : t("quiz.ctf.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
