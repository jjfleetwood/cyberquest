"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type ExamQuestion = {
  key: number;
  stageId: string;
  questionId: string;
  type: string;
  challenge: string;
  text: string;
  options: string[];
};

type ExamConfig = { total: number; durationSec: number; passPct: number; poolSize: number };

type GradeResult = {
  total: number;
  correct: number;
  pct: number;
  results: { stageId: string; questionId: string; correct: boolean; correctText: string; explanation: string }[];
};

type Status = "loading" | "active" | "grading" | "done" | "empty" | "error";

export default function ExamRunner({
  mode,
  certId,
  title,
  subtitle,
  backHref,
  accentHex = "#22d3ee",
  accentText = "text-cyan-400",
  accentBtn = "bg-cyan-500 hover:bg-cyan-400",
  accentBorder = "border-cyan-500/40",
}: {
  mode: "dmv" | "cert";
  certId?: string;
  title: string;
  subtitle: string;
  backHref: string;
  accentHex?: string;
  accentText?: string;
  accentBtn?: string;
  accentBorder?: string;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [config, setConfig] = useState<ExamConfig | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState<GradeResult | null>(null);
  const submittedRef = useRef(false);

  const start = useCallback(async () => {
    setStatus("loading");
    submittedRef.current = false;
    setAnswers({});
    setCurrent(0);
    setResult(null);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", mode, certId }),
      });
      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        setStatus("empty");
        return;
      }
      setQuestions(data.questions);
      setConfig(data.config);
      setTimeLeft(data.config.durationSec);
      setStatus("active");
    } catch {
      setStatus("error");
    }
  }, [mode, certId]);

  useEffect(() => { start(); }, [start]);

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setStatus("grading");
    const payload = questions.map((q) => ({
      stageId: q.stageId,
      questionId: q.questionId,
      selectedText: answers[q.key] ?? null,
    }));
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "grade", answers: payload }),
      });
      setResult(await res.json());
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, [questions, answers]);

  // Countdown — auto-submits at zero.
  useEffect(() => {
    if (status !== "active") return;
    if (timeLeft <= 0) { submit(); return; }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, timeLeft, submit]);

  const bg = { background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" };

  if (status === "loading" || status === "grading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={bg}>
        <p className="text-gray-500 animate-pulse">{status === "grading" ? "Scoring your exam…" : "Building your exam…"}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={bg}>
        <p className="text-gray-400">Something went wrong building the exam.</p>
        <button onClick={start} className={`px-5 py-2.5 ${accentBtn} text-black font-bold rounded-lg`}>Try again</button>
        <Link href={backHref} className="text-gray-500 hover:text-gray-300 text-sm">← Back</Link>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={bg}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🗂️</div>
          <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-6">No practice questions are available for this exam yet — they&apos;re being added as the question banks grow.</p>
          <Link href={backHref} className={`${accentText} hover:opacity-80 text-sm transition-opacity`}>← Back</Link>
        </div>
      </div>
    );
  }

  // ── Results ─────────────────────────────────────────────────────────────────
  if (status === "done" && result) {
    const passed = result.pct >= (config?.passPct ?? 75);
    return (
      <div className="min-h-screen px-4 py-12" style={bg}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{passed ? "🎉" : "📚"}</div>
            <h1 className="text-3xl font-black text-white mb-1">{passed ? "You passed!" : "Keep practicing"}</h1>
            <p className="text-gray-500 text-sm">{title} · practice attempt</p>
            <div className="mt-6 inline-flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-5">
              <div>
                <div className="text-4xl font-black" style={{ color: passed ? "#4ade80" : accentHex }}>{result.pct}%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Score</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-4xl font-black text-white">{result.correct}/{result.total}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Correct</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-gray-300 mt-1">{config?.passPct ?? 75}%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">To pass</div>
              </div>
            </div>
          </div>

          {/* Per-question review */}
          <div className="space-y-3 mb-8">
            {questions.map((q, i) => {
              const r = result.results[i];
              const your = answers[q.key];
              return (
                <div key={q.key} className={`rounded-xl border p-4 ${r?.correct ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-sm font-bold ${r?.correct ? "text-green-400" : "text-red-400"}`}>{r?.correct ? "✓" : "✗"}</span>
                    <p className="text-white text-sm font-medium flex-1">{i + 1}. {q.text}</p>
                  </div>
                  {!r?.correct && (
                    <p className="text-xs text-gray-400 mb-1 pl-5">
                      Your answer: <span className="text-red-300">{your ?? "— (skipped)"}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-400 pl-5">
                    Correct: <span className="text-green-300">{r?.correctText}</span>
                  </p>
                  {r?.explanation && <p className="text-xs text-gray-500 mt-2 pl-5 leading-relaxed">{r.explanation}</p>}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={start} className={`px-6 py-3 ${accentBtn} text-black font-bold rounded-lg transition-colors`}>
              Take Another (new questions) →
            </button>
            <Link href={backHref} className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 rounded-lg font-semibold transition-colors text-center">
              Done
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active exam ───────────────────────────────────────────────────────────
  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const lowTime = timeLeft <= 60;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10" style={bg}>
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white font-black text-lg">{title}</h1>
            <p className="text-gray-500 text-xs">{subtitle}</p>
          </div>
          <div className={`font-mono text-lg font-bold ${lowTime ? "text-red-400 animate-pulse" : accentText}`}>
            ⏱ {mins}:{String(secs).padStart(2, "0")}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-white/5 rounded-full h-1.5">
            <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%`, background: accentHex }} />
          </div>
          <span className="text-xs font-mono text-gray-500">{current + 1}/{questions.length}</span>
        </div>

        {/* Question */}
        <div className="mb-3">
          <span className={`text-xs px-3 py-1 rounded-full border ${accentBorder} ${accentText} font-semibold`}>{q.type}</span>
        </div>
        {q.challenge && q.challenge.trim().length > 0 && (
          <div className="bg-black/70 border border-white/10 rounded-xl p-4 mb-4 font-mono text-xs text-green-300/80 leading-relaxed whitespace-pre overflow-x-auto">
            {q.challenge}
          </div>
        )}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-5">
          <p className="text-white text-base font-medium mb-5 leading-relaxed">{q.text}</p>
          <div className="flex flex-col gap-3">
            {q.options.map((option, idx) => {
              const selected = answers[q.key] === option;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers((a) => ({ ...a, [q.key]: option }))}
                  className={`text-left px-5 py-4 border rounded-lg transition-colors ${
                    selected ? `${accentBorder} bg-white/10 text-white` : "border-white/10 bg-white/3 text-gray-300 hover:border-white/30"
                  }`}
                >
                  <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-5 py-2.5 border border-gray-700 text-gray-400 rounded-lg disabled:opacity-30 hover:border-gray-500 transition-colors"
          >
            ← Prev
          </button>
          <span className="text-xs text-gray-500">{answeredCount} of {questions.length} answered</span>
          {current + 1 < questions.length ? (
            <button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))} className={`px-5 py-2.5 ${accentBtn} text-black font-bold rounded-lg transition-colors`}>
              Next →
            </button>
          ) : (
            <button onClick={submit} className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors">
              Submit Exam ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
