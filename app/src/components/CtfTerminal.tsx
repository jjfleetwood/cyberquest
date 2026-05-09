"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const FLAG = "FLAG{R0GU3_M0D3L_F0UND}";

// Simulated filesystem
const files: Record<string, string> = {
  "/README.txt": [
    "MISSION BRIEFING",
    "=================",
    "Classification: SECRET",
    "",
    "Our AI threat detection system flagged unusual activity on this server.",
    "An AI model has been compromised and may be exfiltrating sensitive data.",
    "",
    "Your mission: Investigate the system. Find evidence of the compromise.",
    "When you find the flag, use:  submit <flag>",
    "",
    "Good luck, Agent.",
  ].join("\n"),

  "/logs/system.log": [
    "[2024-01-15 08:00:01] System startup complete",
    "[2024-01-15 08:00:15] AI model v2.3 initialized",
    "[2024-01-15 08:01:02] Network interface eth0 up",
    "[2024-01-15 09:14:33] Scheduled backup started",
    "[2024-01-15 09:15:01] Backup complete: 2.3GB",
    "[2024-01-15 11:22:17] AI model processed 1,240 requests",
    "[2024-01-15 14:03:44] WARNING: Unusual outbound connection detected",
    "[2024-01-15 14:03:44] Destination: 10.0.0.42:4444",
    "[2024-01-15 14:03:45] AI model process: 847MB memory usage (ANOMALY)",
    "[2024-01-15 17:00:00] Daily report generated",
  ].join("\n"),

  "/logs/ai_model.log": [
    '[14:03:41] Model inference request #4821 received',
    '[14:03:41] Input: "Summarize quarterly sales figures"',
    '[14:03:42] Output: "Q3 revenue: $2.4M, Q4 projected: $2.8M"',
    '[14:03:43] Model inference request #4822 received',
    '[14:03:43] Input: "Generate status report"',
    '[14:03:44] Output: "Operations nominal. Exfiltration payload staged. Awaiting command."',
    '[14:03:44] ERROR: Unexpected output pattern detected',
    '[14:03:44] Model sending data to 10.0.0.42:4444',
    '[14:03:45] Data transfer: 14KB',
  ].join("\n"),

  "/config/network.conf": [
    "# Network Configuration",
    "interface=eth0",
    "ip=192.168.1.100",
    "gateway=192.168.1.1",
    "dns=8.8.8.8",
    "",
    "# Authorized connections",
    "allowed_ips=192.168.1.0/24",
    "",
    "# WARNING: Unauthorized rule detected",
    "# Added: 2024-01-15 14:03:40",
    "allow_all=10.0.0.42",
  ].join("\n"),

  "/config/.hidden": FLAG,
};

const dirs: Record<string, { name: string; isDir: boolean; hidden?: boolean }[]> = {
  "/": [
    { name: "README.txt", isDir: false },
    { name: "logs", isDir: true },
    { name: "config", isDir: true },
  ],
  "/logs": [
    { name: "system.log", isDir: false },
    { name: "ai_model.log", isDir: false },
  ],
  "/config": [
    { name: "network.conf", isDir: false },
    { name: ".hidden", isDir: false, hidden: true },
  ],
};

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

export default function CtfTerminal() {
  const [cwd, setCwd] = useState("/");
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: "╔══════════════════════════════════════════╗" },
    { type: "sys", text: "║   CyberQuest Terminal  v1.0              ║" },
    { type: "sys", text: "║   Stage 2: Rogue Model Recon             ║" },
    { type: "sys", text: "╚══════════════════════════════════════════╝" },
    { type: "sys", text: "" },
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

    if (cmd === "help") {
      push(
        { type: "out", text: "Available commands:" },
        { type: "out", text: "  ls [-a] [path]   list directory contents (-a shows hidden files)" },
        { type: "out", text: "  cat <file>        display file contents" },
        { type: "out", text: "  cd <dir>          change directory (cd .. to go up)" },
        { type: "out", text: "  pwd               print working directory" },
        { type: "out", text: "  clear             clear the terminal" },
        { type: "out", text: "  submit <flag>     submit a captured flag" },
        { type: "out", text: "" },
      );
      return;
    }

    if (cmd === "pwd") {
      push({ type: "out", text: cwd }, { type: "out", text: "" });
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "cd") {
      const target = parts[1];
      if (!target || target === "~") {
        setCwd("/");
      } else if (target === "..") {
        setCwd(parentDir(cwd));
      } else {
        const resolved = resolvePath(cwd, target);
        if (dirs[resolved]) {
          setCwd(resolved);
        } else {
          push({ type: "err", text: `cd: ${target}: No such directory` });
        }
      }
      push({ type: "out", text: "" });
      return;
    }

    if (cmd === "ls") {
      const args = parts.slice(1);
      const flagStr = args.filter((a) => a.startsWith("-")).join("");
      const showHidden = flagStr.includes("a");
      const pathArg = args.find((a) => !a.startsWith("-"));
      const targetDir = pathArg ? resolvePath(cwd, pathArg) : cwd;

      const entries = dirs[targetDir];
      if (!entries) {
        push({ type: "err", text: `ls: cannot access '${pathArg || cwd}': No such directory` });
        push({ type: "out", text: "" });
        return;
      }

      const visible = entries.filter((e) => showHidden || !e.hidden);
      if (visible.length === 0) {
        push({ type: "out", text: "(empty)" });
      } else {
        const parts2 = visible.map((e) =>
          e.isDir ? `\x00dir\x00${e.name}/` : e.name
        );
        push({ type: "out", text: parts2.join("  ") });
      }
      push({ type: "out", text: "" });
      return;
    }

    if (cmd === "cat") {
      const pathArg = parts[1];
      if (!pathArg) {
        push({ type: "err", text: "cat: missing file operand" });
        push({ type: "out", text: "" });
        return;
      }
      const resolved = resolvePath(cwd, pathArg);
      const content = files[resolved];
      if (content === undefined) {
        if (dirs[resolved]) {
          push({ type: "err", text: `cat: ${pathArg}: Is a directory` });
        } else {
          push({ type: "err", text: `cat: ${pathArg}: No such file` });
        }
        push({ type: "out", text: "" });
        return;
      }
      const contentLines = content.split("\n").map((t) => ({ type: "out" as LineType, text: t }));
      push(...contentLines, { type: "out", text: "" });
      return;
    }

    if (cmd === "submit") {
      const flag = parts.slice(1).join(" ").trim();
      if (!flag) {
        push({ type: "err", text: "Usage: submit <flag>" });
        push({ type: "out", text: "" });
        return;
      }
      if (flag === FLAG) {
        push(
          { type: "ok", text: "" },
          { type: "ok", text: "██████████████████████████████████████████" },
          { type: "ok", text: "  ✓  FLAG ACCEPTED — MISSION COMPLETE!" },
          { type: "ok", text: "██████████████████████████████████████████" },
          { type: "ok", text: "" },
          { type: "ok", text: `  Flag: ${FLAG}` },
          { type: "ok", text: "  +150 XP earned" },
          { type: "ok", text: "  Badge: AI Scout — Unlocked" },
          { type: "ok", text: "" },
        );
        setSolved(true);
      } else {
        push(
          { type: "err", text: "✗ Incorrect flag. Keep investigating." },
          { type: "out", text: "" },
        );
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

  return (
    <div
      className="min-h-screen flex flex-col px-4 py-8"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)" }}
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col" style={{ minHeight: "calc(100vh - 4rem)" }}>
        {/* Header */}
        <div className="mb-4 flex-shrink-0">
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-3 inline-block transition-colors">
            ← Stage Map
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-white font-bold text-xl">AI Basics & Threat Detection</h1>
              <p className="text-gray-500 text-sm">Stage 2 — CTF: Rogue Model Recon</p>
            </div>
            <span className="text-xs text-purple-400 bg-purple-400/10 border border-purple-400/30 rounded-full px-3 py-1">
              🚩 Capture the Flag
            </span>
          </div>
        </div>

        {/* Briefing */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mb-4 text-sm flex-shrink-0">
          <p className="text-amber-400 font-semibold mb-1">Mission Briefing</p>
          <p className="text-gray-400">
            A compromised AI model is running on this server. Use the terminal to investigate the
            filesystem, find evidence of the attack, and capture the hidden flag.
          </p>
        </div>

        {/* Terminal */}
        <div
          className="flex-1 bg-black/70 border border-white/10 rounded-xl overflow-hidden flex flex-col font-mono text-sm cursor-text"
          onClick={() => inputRef.current?.focus()}
          style={{ minHeight: "420px" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-gray-600 text-xs">cyberquest-terminal — bash</span>
          </div>

          {/* Output area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
            {lines.map((line, i) => (
              <TerminalLine key={i} line={line} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          {!solved ? (
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 flex-shrink-0">
              <span className="text-cyan-400 select-none whitespace-nowrap">{cwd}$</span>
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-300 outline-none caret-green-400 min-w-0"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          ) : (
            <div className="px-4 py-4 border-t border-green-500/30 bg-green-500/5 flex flex-col sm:flex-row gap-3 items-center flex-shrink-0">
              <span className="text-green-400 font-semibold text-sm">Mission complete. Flag captured.</span>
              <Link
                href="/stages"
                className="sm:ml-auto px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm transition-colors"
              >
                Back to Stage Map →
              </Link>
            </div>
          )}
        </div>

        <p className="text-gray-700 text-xs mt-3 text-center flex-shrink-0">
          Tip: Not all files are visible by default. Use arrow keys to recall previous commands.
        </p>
      </div>
    </div>
  );
}

function TerminalLine({ line }: { line: Line }) {
  const colorClass: Record<LineType, string> = {
    cmd: "text-gray-200",
    out: "text-green-300/80",
    err: "text-red-400",
    ok: "text-green-400 font-semibold",
    warn: "text-yellow-400",
    sys: "text-cyan-500/60",
  };

  // Parse \x00dir\x00name markers for colored directory names
  const hasDir = line.text.includes("\x00dir\x00");

  return (
    <div className={`leading-relaxed whitespace-pre-wrap break-all ${colorClass[line.type]}`}>
      {line.type === "cmd" ? (
        <span>
          <span className="text-cyan-400 select-none">❯ </span>
          {line.text.replace(/^[^$]*\$ /, "")}
        </span>
      ) : hasDir ? (
        <DirLine text={line.text} />
      ) : (
        line.text || " "
      )}
    </div>
  );
}

function DirLine({ text }: { text: string }) {
  const segments = text.split(/(\x00dir\x00\S+)/);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith("\x00dir\x00")) {
          return (
            <span key={i} className="text-cyan-400 font-semibold">
              {seg.replace("\x00dir\x00", "")}
            </span>
          );
        }
        return <span key={i} className="text-green-300/80">{seg}</span>;
      })}
    </>
  );
}
