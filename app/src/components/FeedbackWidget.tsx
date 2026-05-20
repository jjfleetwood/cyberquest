"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [message]);

  async function handleSend() {
    if (!message.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, page: pathname }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSend();
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50 w-64 flex flex-col gap-1.5 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-xl backdrop-blur-sm p-3">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest select-none">
        What do you want to see?
      </p>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ideas, requests, feedback…"
        rows={3}
        className="w-full resize-none rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-200 placeholder-slate-500 text-xs px-2.5 py-2 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-600 transition min-h-[60px] max-h-40"
      />
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] text-slate-600 select-none">⌘↵ to send</span>
        <button
          onClick={handleSend}
          disabled={!message.trim() || status === "sending" || status === "sent"}
          className={`text-[11px] font-medium px-3 py-1 rounded-lg transition-all ${
            status === "sent"
              ? "bg-emerald-700/60 text-emerald-300 cursor-default"
              : status === "error"
              ? "bg-red-700/60 text-red-300 cursor-default"
              : status === "sending"
              ? "bg-slate-700 text-slate-400 cursor-wait"
              : message.trim()
              ? "bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer"
              : "bg-slate-800 text-slate-600 cursor-default"
          }`}
        >
          {status === "sent" ? "Sent ✓" : status === "error" ? "Failed" : status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
