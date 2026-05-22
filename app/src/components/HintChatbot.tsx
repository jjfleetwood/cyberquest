"use client";

import { useState, useRef, useEffect } from "react";
import type { StageConfig } from "@/data/types";

type Message = { role: "user" | "aria"; text: string };

const FREE_COOLDOWN_S = 30;
const MAX_FREE_MESSAGES = 10;

type Props = {
  stage: StageConfig;
  isPro?: boolean;
  onClose: () => void;
};

export default function HintChatbot({ stage, isPro = false, onClose }: Props) {
  const ctf = stage.ctf;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "aria",
      text: `ARIA online. Mission "${stage.title}" loaded.${stage.info?.tagline ? ` Core concept: "${stage.info.tagline}"` : ""} What are you stuck on? I'll guide — not give it away.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, []);

  function startCooldown() {
    setCooldownLeft(FREE_COOLDOWN_S);
    cooldownRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || cooldownLeft > 0) return;

    setInput("");
    setLoading(true);
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          stageTitle: stage.title,
          scenario: ctf?.scenario ?? "",
          hint: ctf?.hint ?? "",
          chatbotContext: ctf?.chatbotContext ?? "",
          keyTakeaways: stage.info?.keyTakeaways ?? [],
          tagline: stage.info?.tagline ?? "",
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.error ?? "I'm having trouble connecting right now.";
      setMessages((prev) => [...prev, { role: "aria", text: reply }]);
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      if (!isPro) startCooldown();
    } catch {
      setMessages((prev) => [...prev, { role: "aria", text: "Connection lost. Check your network and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  const hitLimit = !isPro && messageCount >= MAX_FREE_MESSAGES;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-sm bg-gray-950 border-l border-white/10 flex flex-col overflow-hidden"
        style={{ maxHeight: "100dvh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-semibold text-sm">ARIA</span>
            <span className="text-gray-600 text-xs">AI Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-mono">{isPro ? "∞" : `${messageCount}/${MAX_FREE_MESSAGES}`}</span>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-lg leading-none">✕</button>
          </div>
        </div>

        {/* Pro upgrade banner */}
        {(cooldownLeft > 0 || hitLimit) && (
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border-b border-purple-500/20 flex-shrink-0">
            <span className="text-purple-400 text-xs">⚡</span>
            <span className="text-purple-300 text-xs flex-1">
              {hitLimit ? "Message limit reached for this session." : `Pro removes the ${FREE_COOLDOWN_S}s wait between messages.`}
            </span>
            <span className="text-purple-400 text-xs font-semibold whitespace-nowrap">Go Pro →</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "aria" && (
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs">A</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-100"
                    : "bg-white/5 border border-white/10 text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xs">A</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="flex gap-1 items-center h-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
          {hitLimit ? (
            <p className="text-center text-xs text-gray-600 py-2">
              Session limit reached. Refresh to start a new session.
            </p>
          ) : cooldownLeft > 0 ? (
            <div className="flex items-center justify-between bg-white/3 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-gray-600 text-xs">Next message in</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{cooldownLeft}s</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask ARIA for a hint…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-700 outline-none focus:border-cyan-500/50 transition-colors"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 text-black"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                ↵
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
