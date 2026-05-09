"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { awardStage } from "@/lib/progress";

type Question = {
  id: string;
  type: string;
  challenge: string;      // scenario shown in a terminal/code block
  text: string;           // the actual question
  options: string[];
  correctIndex: number;
  explanation: string;
};

const questions: Question[] = [
  {
    id: "q1",
    type: "🔐 Cipher Challenge",
    challenge: [
      "INTERCEPTED TRANSMISSION — CLASSIFIED",
      "─────────────────────────────────────",
      "",
      "  Khoor Djhqw. Wklv phvvdjh lv",
      "  fodvvlilhg. Rqob dxwkrulchg",
      "  shuvrqqho pd| ghfubsw wklv.",
      "",
      "Cipher type: Caesar  |  Key: ???",
      "Hint: Each letter shifted +3 positions",
      "",
      "Decoded: Hello Agent. This message is",
      "         classified. Only authorized",
      "         personnel may decrypt this.",
    ].join("\n"),
    text: "An enemy intercepted this transmission but couldn't read it. A spy used a Caesar cipher (shift +3) to protect the contents. Which CIA Triad principle does encryption like this directly implement?",
    options: [
      "Confidentiality — only authorized parties can read the data",
      "Integrity — the data has not been altered in transit",
      "Availability — the data is accessible when needed",
      "Non-repudiation — the sender cannot deny sending it",
    ],
    correctIndex: 0,
    explanation:
      "Encryption is the classic implementation of Confidentiality. The Caesar cipher (and modern equivalents like AES-256) ensures that even if an attacker intercepts the data, they cannot read it without the key. The message was 'available' and 'intact' — but unreadable to unauthorized eyes.",
  },
  {
    id: "q2",
    type: "🔍 Hash Tampering Analysis",
    challenge: [
      "FILE TRANSFER VERIFICATION REPORT",
      "──────────────────────────────────",
      "",
      "  File: patient_records_2024.db",
      "  Size: 14.2 MB",
      "",
      "  ORIGINAL checksum (sender):",
      "  sha256: a3f5c2d8e1b4f7a9c6d3e8f2b1a4c7d0",
      "         e9f6a3b8c5d2e7f4a1b6c3d8e5f2a9b4",
      "",
      "  RECEIVED checksum (our server):",
      "  sha256: a3f5c2d8e1b4f7a9c6d3e8f2b1a4c7d0",
      "         e9f6a3b8c5d2e700000000000000DEAD",
      "",
      "  ⚠ MISMATCH DETECTED",
    ].join("\n"),
    text: "A hospital transmitted patient records. The SHA-256 checksums don't match — the last 8 bytes differ. The file was silently modified in transit by a man-in-the-middle attacker. Which CIA principle was violated, and what is the attacker's technique called?",
    options: [
      "Integrity — a man-in-the-middle (MITM) attack tampered with the data",
      "Confidentiality — an attacker read the file contents during transfer",
      "Availability — the attacker blocked the file from being delivered",
      "Authentication — the sender's identity was not verified",
    ],
    correctIndex: 0,
    explanation:
      "Integrity ensures data is accurate and unaltered. Cryptographic hashes (SHA-256, MD5) are the primary integrity control — any modification, even a single bit, produces a completely different hash. This attack is a MITM (man-in-the-middle), and the technique is called 'tampering'. In this scenario, an attacker modified patient records mid-transfer — a potentially life-threatening integrity failure.",
  },
  {
    id: "q3",
    type: "📡 Network Log Analysis",
    challenge: [
      "LIVE NETWORK MONITOR — CRITICAL ALERT",
      "──────────────────────────────────────",
      "",
      " [09:14:01] SYN packets/sec:      412",
      " [09:14:02] SYN packets/sec:    8,204",
      " [09:14:03] SYN packets/sec:   94,817",
      " [09:14:04] SYN packets/sec:  210,443",
      " [09:14:05] Connection table:   100% full",
      " [09:14:05] New connections:    REFUSED",
      " [09:14:06] Service status:     UNREACHABLE",
      "",
      " Source IPs: 182 unique addresses (spoofed)",
      " Target: hospital-icu-monitor.internal:443",
      " !! LIFE-CRITICAL SYSTEM OFFLINE !!",
    ].join("\n"),
    text: "A hospital's ICU patient monitoring system was taken offline by a SYN flood. Attackers sent millions of half-open TCP connections, exhausting the server's connection table. No patient data was stolen or altered. Which CIA principle was violated, and what category of attack is this?",
    options: [
      "Availability — a volumetric DDoS (SYN flood) attack",
      "Confidentiality — attackers exfiltrated ICU patient data",
      "Integrity — attackers modified the ICU monitoring readings",
      "Availability — a ransomware encryption attack",
    ],
    correctIndex: 0,
    explanation:
      "Availability ensures systems are accessible when needed. A SYN flood exploits the TCP three-way handshake — the attacker sends SYN packets but never completes the ACK, leaving thousands of half-open connections until the server's table fills up and it stops accepting legitimate connections. This is a Distributed Denial-of-Service (DDoS) attack. Against life-critical hospital systems, an availability attack can be as dangerous as any data breach.",
  },
];

export default function QuizChallenge() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      awardStage("stage-01", 100, "badge-defender");
    }
  }, [done]);

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
            <div className="text-4xl font-bold text-cyan-400 mb-1">+100 XP</div>
            <div className="text-gray-500 text-sm">added to your total</div>
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1">
              <span className="text-yellow-400 text-sm font-medium">🏅 First Defender Badge Unlocked!</span>
            </div>
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
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors">
            ← Stage Map
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">Cybersecurity Foundations</h1>
              <p className="text-gray-500 text-sm">CIA Triad Challenges</p>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-mono text-sm">{current + 1} / {questions.length}</div>
              <div className="text-gray-600 text-xs">{score * 33} XP</div>
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
                  <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={`border rounded-lg p-4 mb-4 text-sm leading-relaxed ${
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
            {current + 1 >= questions.length ? "See Results →" : "Next Challenge →"}
          </button>
        )}
      </div>
    </div>
  );
}
