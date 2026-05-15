"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { awardStage } from "@/lib/progress";
import AttackDiagram from "./AttackDiagram";
import type { CtfConfig, StageConfig } from "@/data/types";

type LineType = "cmd" | "out" | "err" | "ok" | "warn" | "sys";
type Line = { type: LineType; text: string };

function resolvePath(cwd: string, target: string): string {
  if (target.startsWith("/")) return target;
  return (cwd === "/" ? "" : cwd) + "/" + target;
}

function parentDir(path: string): string {
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return parts.length === 0 ? "/" : "/" + parts.join("/");
}

function TerminalLine({ line }: { line: Line }) {
  const colorClass: Record<LineType, string> = {
    cmd:  "text-gray-200",
    out:  "text-green-300/80",
    err:  "text-red-400",
    ok:   "text-green-400 font-semibold",
    warn: "text-yellow-400",
    sys:  "text-cyan-500/60",
  };

  const hasDir = line.text.includes("\x00dir\x00");

  if (line.type === "cmd") {
    return (
      <div className={`leading-relaxed whitespace-pre-wrap break-all ${colorClass.cmd}`}>
        <span className="text-cyan-400 select-none">❯ </span>
        {line.text.replace(/^[^$]*\$ /, "")}
      </div>
    );
  }

  if (hasDir) {
    const segments = line.text.split(/(\x00dir\x00\S+)/);
    return (
      <div className={`leading-relaxed whitespace-pre-wrap break-all ${colorClass.out}`}>
        {segments.map((seg, i) =>
          seg.startsWith("\x00dir\x00") ? (
            <span key={i} className="text-cyan-400 font-semibold">
              {seg.replace("\x00dir\x00", "")}
            </span>
          ) : (
            <span key={i} className="text-green-300/80">{seg}</span>
          )
        )}
      </div>
    );
  }

  return (
    <div className={`leading-relaxed whitespace-pre-wrap break-all ${colorClass[line.type]}`}>
      {line.text || " "}
    </div>
  );
}

function HintDrawer({ hints, onClose }: { hints: string[]; onClose: () => void }) {
  const [revealed, setRevealed] = useState(1);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-sm bg-gray-950 border-l border-white/10 flex flex-col overflow-hidden"
        style={{ maxHeight: "100dvh" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <span className="text-amber-400 font-semibold text-sm">💡 Hints</span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm">
          <p className="text-gray-600 text-xs">
            Each hint reveals a bit more. Use them only when you're genuinely stuck.
          </p>
          {hints.slice(0, revealed).map((hint, i) => (
            <div key={i} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
              <p className="text-xs text-amber-600 mb-1.5 font-semibold uppercase tracking-wider">
                Hint {i + 1} of {hints.length}
              </p>
              <p className="text-gray-300 leading-relaxed font-mono text-xs">{hint}</p>
            </div>
          ))}
          {revealed < hints.length ? (
            <button
              onClick={() => setRevealed((r) => r + 1)}
              className="w-full py-2.5 text-sm text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/5 transition-colors"
            >
              Reveal hint {revealed + 1} →
            </button>
          ) : (
            <p className="text-center text-xs text-gray-700 py-2">All hints revealed.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ReferenceDrawer({ stage, onClose }: { stage: StageConfig; onClose: () => void }) {
  const { info } = stage;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-sm bg-gray-950 border-l border-white/10 flex flex-col overflow-hidden"
        style={{ maxHeight: "100dvh" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <span className="text-white font-semibold text-sm">{stage.title}</span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 text-sm">
          {/* Tagline */}
          <p className="text-cyan-400 italic">{info.tagline}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1">
            {stage.owaspRef && (
              <span className="text-xs px-2 py-0.5 rounded-full border text-orange-400 bg-orange-400/10 border-orange-400/30">
                {stage.owaspRef}
              </span>
            )}
            {stage.cveId && (
              <span className="text-xs px-2 py-0.5 rounded-full border text-red-400 bg-red-400/10 border-red-400/30">
                {stage.cveId}
              </span>
            )}
            {stage.cvssScore !== undefined && (
              <span className="text-xs px-2 py-0.5 rounded-full border text-red-400 bg-red-400/10 border-red-400/30 font-mono">
                CVSS {stage.cvssScore.toFixed(1)}
              </span>
            )}
          </div>

          {/* Overview */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Overview</p>
            <div className="space-y-2">
              {info.overview.slice(0, 2).map((p, i) => (
                <p key={i} className="text-gray-400 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>

          {/* Attack Flow */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Attack Flow</p>
            <div className="bg-black/30 rounded-lg p-3">
              <AttackDiagram nodes={info.diagram.nodes} />
            </div>
          </div>

          {/* Technical */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Technical</p>
            <p className="text-gray-400 leading-relaxed">{info.technical.body[0]}</p>
            {info.technical.codeExample && (
              <pre className="mt-2 bg-black/60 border border-white/10 rounded p-3 text-green-300 text-xs overflow-x-auto font-mono leading-relaxed">
                {info.technical.codeExample.code}
              </pre>
            )}
          </div>

          {/* Incident */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Incident</p>
            <p className="text-red-400 font-medium mb-1">{info.incident.title}</p>
            <p className="text-gray-500 text-xs mb-2">{info.incident.when} · {info.incident.where}</p>
            <p className="text-gray-400 leading-relaxed">{info.incident.body[0]}</p>
          </div>

          {/* Key Takeaways */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Key Takeaways</p>
            <ul className="space-y-1">
              {info.keyTakeaways.map((item, i) => (
                <li key={i} className="flex gap-2 text-gray-400">
                  <span className="text-cyan-600 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">References</p>
            <ul className="space-y-1">
              {info.references.map((ref, i) => (
                <li key={i}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-xs underline"
                  >
                    [{i + 1}] {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CtfChallenge({ stage }: { stage: StageConfig }) {
  const ctf = stage.ctf!;
  const hints = ctf.hints ?? [ctf.hint];
  const [cwd, setCwd] = useState("/");
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [collectedFragments, setCollectedFragments] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: "╔══════════════════════════════════════════╗" },
    { type: "sys", text: `║   Kryptós CronOS Terminal  v1.0          ║` },
    { type: "sys", text: `║   Stage ${String(stage.order).padEnd(2)}: ${stage.subtitle.slice(0, 28).padEnd(28)}║` },
    { type: "sys", text: "╚══════════════════════════════════════════╝" },
    { type: "sys", text: "" },
    { type: "out", text: ctf.scenario },
    { type: "out", text: "" },
    { type: "out", text: `Hint: ${ctf.hint}` },
    { type: "out", text: "" },
    ...(ctf.fragments?.length ? [
      { type: "out" as LineType, text: `Objective: Collect ${ctf.fragments.length} intelligence fragments to assemble the flag.` },
      { type: "out" as LineType, text: "Run 'assemble' at any time to check your progress." },
      { type: "out" as LineType, text: "" },
    ] : []),
    { type: "out", text: "Type 'help' for available commands." },
    { type: "out", text: "" },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function push(...newLines: Line[]) {
    setLines((prev) => [...prev, ...newLines]);
  }

  function checkFragment(key: string) {
    if (!ctf.fragments?.length) return;
    const frag = ctf.fragments.find((f) => f.trigger === key);
    if (!frag || collectedFragments.has(key)) return;
    const nextCount = collectedFragments.size + 1;
    const total = ctf.fragments.length;
    setCollectedFragments((prev) => new Set([...prev, key]));
    push(
      { type: "warn", text: `🔑 Fragment ${nextCount}/${total} recovered — [ ${frag.value} ]` },
      { type: "warn", text: `   ${frag.label}` },
      { type: "out", text: "" },
    );
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) {
      push({ type: "cmd", text: `${cwd}$` });
      return;
    }

    setCmdHistory((h) => [trimmed, ...h]);
    setHistoryIdx(-1);
    push({ type: "cmd", text: `${cwd}$ ${trimmed}` });

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Built-in: help
    if (cmd === "help") {
      const extraCmds = ctf.extraCommands ? Object.keys(ctf.extraCommands) : [];
      const hasFragments = Boolean(ctf.fragments?.length);
      push(
        { type: "out", text: "Available commands:" },
        { type: "out", text: "  ls [-a] [path]   list directory contents (-a shows hidden files)" },
        { type: "out", text: "  cat <file>        display file contents" },
        { type: "out", text: "  cd <dir>          change directory" },
        { type: "out", text: "  pwd               print working directory" },
        { type: "out", text: "  clear             clear the terminal" },
        { type: "out", text: "  submit <flag>     submit a captured flag" },
        ...(hasFragments ? [{ type: "out" as LineType, text: "  assemble          show collected fragments and assembled flag" }] : []),
        ...extraCmds.map((c) => ({ type: "out" as LineType, text: `  ${c.padEnd(17)}(stage-specific)` })),
        { type: "out", text: "" },
      );
      return;
    }

    // Built-in: assemble
    if (cmd === "assemble") {
      if (!ctf.fragments?.length) {
        push({ type: "err", text: "assemble: no fragments defined for this stage" }, { type: "out", text: "" });
        return;
      }
      const total = ctf.fragments.length;
      push({ type: "out", text: "Fragment Status:" });
      for (const f of ctf.fragments) {
        const found = collectedFragments.has(f.trigger);
        push({ type: "out", text: `  ${found ? "✓" : "✗"} ${f.label}: ${found ? f.value : "[ not yet recovered ]"}` });
      }
      push({ type: "out", text: "" });
      if (collectedFragments.size === total) {
        push(
          { type: "ok", text: "All fragments recovered. Assembled flag:" },
          { type: "ok", text: `  ${ctf.flag}` },
          { type: "out", text: "" },
          { type: "out", text: `Use: submit ${ctf.flag}` },
          { type: "out", text: "" },
        );
      } else {
        push(
          { type: "warn", text: `${collectedFragments.size}/${total} fragments recovered. Keep investigating.` },
          { type: "out", text: "" },
        );
      }
      return;
    }

    // Built-in: pwd
    if (cmd === "pwd") {
      push({ type: "out", text: cwd }, { type: "out", text: "" });
      return;
    }

    // Built-in: clear
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    // Built-in: cd
    if (cmd === "cd") {
      const target = args[0];
      if (!target || target === "~") {
        setCwd("/");
      } else if (target === "..") {
        setCwd(parentDir(cwd));
      } else {
        const resolved = resolvePath(cwd, target);
        if (ctf.dirs[resolved]) {
          setCwd(resolved);
        } else {
          push({ type: "err", text: `cd: ${target}: No such directory` });
        }
      }
      push({ type: "out", text: "" });
      return;
    }

    // Built-in: ls
    if (cmd === "ls") {
      const flagStr = args.filter((a) => a.startsWith("-")).join("");
      const showHidden = flagStr.includes("a");
      const pathArg = args.find((a) => !a.startsWith("-"));
      const targetDir = pathArg ? resolvePath(cwd, pathArg) : cwd;
      const entries = ctf.dirs[targetDir];

      if (!entries) {
        push({ type: "err", text: `ls: cannot access '${pathArg || cwd}': No such directory` });
        push({ type: "out", text: "" });
        return;
      }

      const visible = entries.filter((e) => showHidden || !e.hidden);
      if (visible.length === 0) {
        push({ type: "out", text: "(empty)" });
      } else {
        const display = visible.map((e) =>
          e.isDir ? `\x00dir\x00${e.name}/` : e.name
        );
        push({ type: "out", text: display.join("  ") });
      }
      push({ type: "out", text: "" });
      return;
    }

    // Built-in: cat
    if (cmd === "cat") {
      const pathArg = args[0];
      if (!pathArg) {
        push({ type: "err", text: "cat: missing file operand" }, { type: "out", text: "" });
        return;
      }
      const resolved = resolvePath(cwd, pathArg);
      const content = ctf.files[resolved];
      if (content === undefined) {
        if (ctf.dirs[resolved]) {
          push({ type: "err", text: `cat: ${pathArg}: Is a directory` });
        } else {
          push({ type: "err", text: `cat: ${pathArg}: No such file` });
        }
        push({ type: "out", text: "" });
        return;
      }
      const contentLines = content.split("\n").map((t) => ({ type: "out" as LineType, text: t }));
      push(...contentLines, { type: "out", text: "" });
      checkFragment(resolved);
      return;
    }

    // Built-in: submit
    if (cmd === "submit") {
      const flag = args.join(" ").trim();
      if (!flag) {
        push({ type: "err", text: "Usage: submit <flag>" }, { type: "out", text: "" });
        return;
      }
      if (flag === ctf.flag) {
        push(
          { type: "ok", text: "" },
          { type: "ok", text: "██████████████████████████████████████████" },
          { type: "ok", text: "  ✓  FLAG ACCEPTED — MISSION COMPLETE!" },
          { type: "ok", text: "██████████████████████████████████████████" },
          { type: "ok", text: "" },
          { type: "ok", text: `  Flag: ${ctf.flag}` },
          { type: "ok", text: `  +${stage.xp} XP earned` },
          { type: "ok", text: `  Badge: ${stage.badge.emoji} ${stage.badge.name} — Unlocked` },
          { type: "ok", text: "" },
        );
        awardStage(stage.id, stage.xp, stage.badge.id);
        setSolved(true);
      } else {
        push(
          { type: "err", text: "✗ Incorrect flag. Keep investigating." },
          { type: "out", text: "" },
        );
      }
      return;
    }

    // Extra stage-specific commands
    if (ctf.extraCommands && cmd in ctf.extraCommands) {
      const result = ctf.extraCommands[cmd](args);
      push(...result.lines.map((t) => ({ type: "out" as LineType, text: t })));
      checkFragment(trimmed);
      if (result.solved) {
        awardStage(stage.id, stage.xp, stage.badge.id);
        setSolved(true);
      }
      return;
    }

    push(
      { type: "err", text: `${cmd}: command not found. Type 'help' for commands.` },
      { type: "out", text: "" },
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  }

  // Shorten cwd for display in the prompt on narrow screens
  const promptCwd = cwd === "/" ? "/" : cwd.split("/").pop() + "";

  function handleSend() {
    runCommand(input);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <>
      {hintsOpen && <HintDrawer hints={hints} onClose={() => setHintsOpen(false)} />}
      {drawerOpen && <ReferenceDrawer stage={stage} onClose={() => setDrawerOpen(false)} />}

      <div
        className="flex flex-col px-3 sm:px-4 py-3 sm:py-6"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)", minHeight: "100dvh" }}
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          {/* Header */}
          <div className="mb-3 flex-shrink-0">
            <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-2 inline-block transition-colors">
              ← Stage Map
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <h1 className="text-white font-bold text-base sm:text-xl truncate">{stage.title}</h1>
                <p className="text-gray-500 text-xs sm:text-sm">Stage {stage.order} · {stage.subtitle}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap items-center">
                {ctf.fragments?.length ? (
                  <span className="text-xs px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg font-mono">
                    🔑 {collectedFragments.size}/{ctf.fragments.length}
                  </span>
                ) : null}
                <button
                  onClick={() => setBriefingOpen((o) => !o)}
                  className="text-xs px-2.5 py-1.5 border border-amber-500/40 hover:border-amber-400 text-amber-400 rounded-lg transition-colors"
                >
                  📋 {briefingOpen ? "Hide" : "Brief"}
                </button>
                <button
                  onClick={() => setHintsOpen(true)}
                  className="text-xs px-2.5 py-1.5 border border-amber-500/40 hover:border-amber-400 text-amber-400 rounded-lg transition-colors"
                >
                  💡 Hints
                </button>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="text-xs px-2.5 py-1.5 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 rounded-lg transition-colors"
                >
                  📖 Ref
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible briefing */}
          {briefingOpen && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-3 text-sm flex-shrink-0">
              <p className="text-amber-400 font-semibold mb-1 text-xs uppercase tracking-wider">Mission Briefing</p>
              <p className="text-gray-400 text-sm leading-relaxed">{ctf.scenario}</p>
            </div>
          )}

          {/* Terminal */}
          <div
            className="flex-1 bg-black/70 border border-white/10 rounded-xl overflow-hidden flex flex-col font-mono text-xs sm:text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
            style={{ minHeight: "0" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-1 text-gray-600 text-xs truncate">kryptos-cronos — bash</span>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {lines.map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!solved ? (
              <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/10 flex-shrink-0">
                <span className="text-cyan-400 select-none whitespace-nowrap text-xs sm:text-sm">
                  <span className="hidden sm:inline">{cwd}</span>
                  <span className="sm:hidden">~/{promptCwd === "/" ? "" : promptCwd}</span>
                  $
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-green-300 outline-none caret-green-400 min-w-0 text-xs sm:text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  inputMode="text"
                  enterKeyHint="send"
                />
                <button
                  onClick={handleSend}
                  className="sm:hidden flex-shrink-0 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-xs font-semibold transition-colors"
                >
                  ↵
                </button>
              </div>
            ) : (
              <div className="px-3 py-3 border-t border-green-500/30 bg-green-500/5 flex flex-col sm:flex-row gap-3 items-center flex-shrink-0">
                <span className="text-green-400 font-semibold text-sm">
                  Mission complete. +{stage.xp} XP earned.
                </span>
                <div className="sm:ml-auto flex gap-2 w-full sm:w-auto">
                  <Link
                    href="/leaderboard"
                    className="flex-1 sm:flex-none text-center px-4 py-2 border border-purple-500/50 hover:border-purple-400 text-purple-400 font-semibold rounded-lg text-sm transition-colors"
                  >
                    🏆 Ranks
                  </Link>
                  <Link
                    href="/stages"
                    className="flex-1 sm:flex-none text-center px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm transition-colors"
                  >
                    Stage Map →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p className="text-gray-700 text-xs mt-2 text-center flex-shrink-0">
            Type <span className="text-gray-600">help</span> for commands · tap 📋 for briefing · 💡 for hints
          </p>
        </div>
      </div>
    </>
  );
}
