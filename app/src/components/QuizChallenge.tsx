"use client";

import { useState } from "react";
import Link from "next/link";
import BackLink from "./BackLink";
import type { QuizQuestion, StageConfig } from "@/data/types";

type SafeQuestion = Omit<QuizQuestion, "correctIndex" | "explanation">;

type AnswerState = {
  correct: boolean;
  explanation: string;
} | null;

export default function QuizChallenge({ stage }: { stage: StageConfig }) {
  const questions: SafeQuestion[] = stage.quiz?.questions ?? [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState<AnswerState>(null);
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  async function handleSelect(idx: number) {
    if (answer || checking || !q) return;
    setSelected(idx);
    setChecking(true);
    try {
      const isFinalQuestion = current + 1 >= questions.length;
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId: stage.id, questionId: q.id, selectedIndex: idx, isFinalQuestion }),
      });
      const data = await res.json();
      setAnswer({ correct: data.correct, explanation: data.explanation });
      if (data.correct) {
        setScore((s) => s + 1);
      }
    } catch {
      setAnswer({ correct: false, explanation: "Could not verify answer — please try again." });
    } finally {
      setChecking(false);
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswer(null);
    }
  }

  if (!q && !done) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <p className="text-gray-500">No questions found for this stage.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
      >
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl mb-6">{score === questions.length ? "🏆" : score >= 2 ? "🎖️" : "📚"}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Stage Complete!</h2>
          <p className="text-gray-400 mb-8">
            You answered {score} of {questions.length} challenges correctly.
          </p>

          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-cyan-400 mb-1">+{stage.xp} XP</div>
            <div className="text-gray-500 text-sm">added to your total</div>
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1">
              <span className="text-yellow-400 text-sm font-medium">{stage.badge.emoji} {stage.badge.name} Unlocked!</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setAnswer(null);
                setScore(0);
                setDone(false);
              }}
              className="px-6 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-lg font-semibold transition-colors"
            >
              Retry Stage
            </button>
            <Link
              href="/leaderboard"
              className="px-6 py-3 border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 font-semibold rounded-lg transition-colors"
            >
              Leaderboard 🏆
            </Link>
            <Link
              href="/stages"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              Stage Map →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-6">
          <BackLink className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">{stage.title}</h1>
              <p className="text-gray-500 text-sm">{stage.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-mono text-sm">{current + 1} / {questions.length}</div>
              <div className="text-gray-600 text-xs">{score * Math.floor(stage.xp / questions.length)} XP</div>
            </div>
          </div>
          <div className="mt-4 bg-white/5 rounded-full h-1.5">
            <div
              className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(current / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge type badge */}
        <div className="mb-3">
          <span className="text-xs px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold">
            {q.type}
          </span>
        </div>

        {/* Scenario block */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-4 mb-4 font-mono text-xs text-green-300/80 leading-relaxed whitespace-pre overflow-x-auto">
          {q.challenge}
        </div>

        {/* Question */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
          <p className="text-white text-base font-medium mb-5 leading-relaxed">{q.text}</p>
          <div className="flex flex-col gap-3">
            {q.options.map((option, idx) => {
              let style = "border-white/10 bg-white/3 text-gray-300 hover:border-cyan-500/50 cursor-pointer";
              if (answer) {
                if (answer.correct && idx === selected) {
                  style = "border-green-500 bg-green-500/10 text-green-400 cursor-default";
                } else if (!answer.correct && idx === selected) {
                  style = "border-red-500 bg-red-500/10 text-red-400 cursor-default";
                } else {
                  style = "border-white/5 bg-white/2 text-gray-600 cursor-default";
                }
              } else if (checking && idx === selected) {
                style = "border-cyan-500/50 bg-cyan-500/5 text-cyan-400/60 cursor-default";
              } else if (idx === selected) {
                style = "border-cyan-500 bg-cyan-500/10 text-cyan-400 cursor-pointer";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={!!answer || checking}
                  className={`text-left px-5 py-4 border rounded-lg transition-colors ${style}`}
                >
                  <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {answer && (
          <div
            className={`border rounded-lg p-4 mb-4 text-sm leading-relaxed ${
              answer.correct
                ? "border-green-500/30 bg-green-500/5 text-green-300"
                : "border-red-500/30 bg-red-500/5 text-red-300"
            }`}
          >
            <span className="font-semibold mr-2">
              {answer.correct ? "✓ Correct!" : "✗ Incorrect."}
            </span>
            {answer.explanation}
          </div>
        )}

        {answer && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
          >
            {current + 1 >= questions.length ? "See Results →" : "Next Challenge →"}
          </button>
        )}
      </div>
    </div>
  );
}
