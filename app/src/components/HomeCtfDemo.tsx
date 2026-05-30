"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Line = { text: string; color: string };

const C = {
  sys: "rgba(34,211,238,0.6)",
  out: "rgba(134,239,172,0.8)",
  cmd: "rgba(229,231,235,0.95)",
  warn: "rgba(250,204,21,0.9)",
  ok: "rgba(74,222,128,1)",
  err: "rgba(248,113,113,0.95)",
  dim: "rgba(107,114,128,1)",
  hint: "rgba(129,140,248,0.95)",
};

const FLAG = "FLAG{C4PTUR3_TH3_FL4G}";

const BOOT: Line[] = [
  { text: "Kryptós CronOS — live demo shell", color: C.sys },
  { text: "You've breached a staging server. Capture the flag.", color: C.out },
  { text: "Type 'help' or 'hint' — or tap a suggestion below.", color: C.dim },
  { text: "", color: C.out },
];

export default function HomeCtfDemo() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [captured, setCaptured] = useState(false);
  const [didLs, setDidLs] = useState(false);
  const [didCat, setDidCat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  function push(...newLines: Line[]) {
    setLines((prev) => [...prev, ...newLines]);
  }

  function hintText(): Line {
    if (!didLs) return { text: "💡 Hint: see what's on the server — type 'ls'.", color: C.hint };
    if (!didCat) return { text: "💡 Hint: open the locked file — 'cat vault.lock'.", color: C.hint };
    if (!captured) return { text: `💡 Hint: capture it — 'submit ${FLAG}'.`, color: C.hint };
    return { text: "💡 You've already captured the flag. 🎉", color: C.hint };
  }

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ text: `agent@kryptos:~$ ${cmd}`, color: C.cmd });
    const lc = cmd.toLowerCase();

    if (lc === "help") {
      push(
        { text: "commands:", color: C.out },
        { text: "  ls             list files", color: C.dim },
        { text: "  cat <file>     read a file", color: C.dim },
        { text: "  submit <flag>  capture the flag", color: C.dim },
        { text: "  hint           get a nudge", color: C.dim },
        { text: "  clear          clear the screen", color: C.dim },
      );
    } else if (lc === "hint") {
      push(hintText());
    } else if (lc === "ls") {
      setDidLs(true);
      push({ text: "readme.txt   vault.lock", color: C.out });
    } else if (lc === "cat readme.txt") {
      push(
        { text: "The flag is sealed inside vault.lock.", color: C.out },
        { text: "Read it:  cat vault.lock", color: C.dim },
      );
    } else if (lc === "cat vault.lock") {
      setDidCat(true);
      push(
        { text: "decrypting vault.lock ...", color: C.warn },
        { text: FLAG, color: C.ok },
        { text: `capture it:  submit ${FLAG}`, color: C.dim },
      );
    } else if (lc.startsWith("cat ")) {
      push({ text: `cat: ${cmd.slice(4)}: No such file`, color: C.err });
    } else if (lc.startsWith("submit")) {
      const arg = cmd.slice(6).trim();
      if (arg.toUpperCase() === FLAG) {
        push(
          { text: "", color: C.out },
          { text: "🏁  FLAG CAPTURED — nice work, agent.", color: C.ok },
          { text: "That's one step of a real CTF. There are 458 more.", color: C.out },
        );
        setCaptured(true);
      } else {
        push(
          { text: "✗ Wrong flag.", color: C.err },
          hintText(),
        );
      }
    } else if (lc === "clear") {
      setLines(BOOT);
      return;
    } else {
      push(
        { text: `command not found: ${cmd}`, color: C.err },
        { text: "try 'help' or 'hint'", color: C.dim },
      );
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    }
  }

  function runChip(cmd: string) {
    run(cmd);
    setInput("");
    inputRef.current?.focus();
  }

  // Contextual suggestion chips — guide a visitor step by step.
  const nextCmd = !didLs ? "ls" : !didCat ? "cat vault.lock" : `submit ${FLAG}`;
  const chips = ["help", nextCmd, "hint"];

  return (
    <div className="terminal-wrap" style={{ transformOrigin: "center center" }}>
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: "rgba(34,211,238,0.2)",
          background: "#0d1117",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,211,238,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-auto text-xs font-mono" style={{ color: "rgba(75,85,99,1)" }}>kryptos-cronos — try me</span>
        </div>
        {/* Body — click anywhere to focus */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="p-4 font-mono text-xs leading-relaxed space-y-0.5 cursor-text"
          style={{ height: 300, overflowY: "auto" }}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ color: l.color, whiteSpace: "pre-wrap" }}>{l.text || " "}</div>
          ))}
          {captured ? (
            <div className="mt-3">
              <Link
                href="/login"
                className="inline-block px-5 py-2 rounded-lg text-xs font-black text-black transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                Continue your training — start free →
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span style={{ color: "rgba(34,211,238,0.9)" }}>agent@kryptos:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                spellCheck={false}
                aria-label="terminal input"
                className="flex-1 bg-transparent outline-none border-none"
                style={{ color: "rgba(229,231,235,0.95)" }}
                placeholder="type 'help' or tap a hint below"
              />
            </div>
          )}
        </div>
        {/* Suggestion chips — tap to run */}
        {!captured && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(75,85,99,1)" }}>try:</span>
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => runChip(c)}
                className="text-xs font-mono px-2.5 py-1 rounded-md border transition-colors"
                style={{ borderColor: "rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.08)", color: "rgba(103,232,249,0.95)" }}
              >
                {c.length > 22 ? c.slice(0, 20) + "…" : c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
