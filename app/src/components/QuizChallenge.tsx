"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: "q1",
    text: "Which CIA Triad principle ensures that data is only accessible to authorized users?",
    options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
    correctIndex: 0,
    explanation:
      "Confidentiality ensures that sensitive information is only accessible to those with proper authorization.",
  },
  {
    id: "q2",
    text: "A hospital's patient record system must be accessible 24/7. Which principle does this represent?",
    options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
    correctIndex: 2,
    explanation:
      "Availability ensures that systems and data are accessible when needed by authorized users.",
  },
  {
    id: "q3",
    text: "A hacker modifies a bank transaction record without authorization. Which CIA principle was violated?",
    options: ["Confidentiality", "Integrity", "Availability", "Confidentiality and Availability"],
    correctIndex: 1,
    explanation:
      "Integrity ensures data is accurate and has not been tampered with by unauthorized parties.",
  },
];

export default function QuizChallenge() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const xpEarned = score * 10;

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
            You answered {score} of {questions.length} questions correctly.
          </p>

          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-cyan-400 mb-1">+{xpEarned} XP</div>
            <div className="text-gray-500 text-sm">earned this session</div>
            {score === questions.length && (
              <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1">
                <span className="text-yellow-400 text-sm font-medium">🥇 First Defender Badge Unlocked!</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setAnswered(false);
                setScore(0);
                setDone(false);
              }}
              className="px-6 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-lg font-semibold transition-colors"
            >
              Retry Stage
            </button>
            <Link
              href="/stages"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              Back to Stage Map →
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
        <div className="mb-8">
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors">
            ← Stage Map
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">Cybersecurity Foundations</h1>
              <p className="text-gray-500 text-sm">Activity 1 — The CIA Triad</p>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-mono text-sm">
                {current + 1} / {questions.length}
              </div>
              <div className="text-gray-600 text-xs">{score * 10} XP</div>
            </div>
          </div>
          <div className="mt-4 bg-white/5 rounded-full h-1.5">
            <div
              className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(current / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6">
          <p className="text-white text-lg font-medium mb-6 leading-relaxed">{q.text}</p>
          <div className="flex flex-col gap-3">
            {q.options.map((option, idx) => {
              let style =
                "border-white/10 bg-white/3 text-gray-300 hover:border-cyan-500/50 cursor-pointer";
              if (answered) {
                if (idx === q.correctIndex) {
                  style = "border-green-500 bg-green-500/10 text-green-400 cursor-default";
                } else if (idx === selected) {
                  style = "border-red-500 bg-red-500/10 text-red-400 cursor-default";
                } else {
                  style = "border-white/5 bg-white/2 text-gray-600 cursor-default";
                }
              } else if (idx === selected) {
                style = "border-cyan-500 bg-cyan-500/10 text-cyan-400 cursor-pointer";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`text-left px-5 py-4 border rounded-lg transition-colors ${style}`}
                >
                  <span className="font-mono text-xs mr-3 opacity-50">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <div
            className={`border rounded-lg p-4 mb-6 text-sm ${
              selected === q.correctIndex
                ? "border-green-500/30 bg-green-500/5 text-green-300"
                : "border-red-500/30 bg-red-500/5 text-red-300"
            }`}
          >
            <span className="font-semibold mr-2">
              {selected === q.correctIndex ? "✓ Correct!" : "✗ Incorrect."}
            </span>
            {q.explanation}
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
          >
            {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
