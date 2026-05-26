"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const DEFAULT_POS = { x: 16, y: 16 };
const STORAGE_KEY = "feedback-widget-pos";

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POS);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(DEFAULT_POS);
  const dragOrigin = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setLoggedIn(!!d?.username))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (typeof p.x === "number" && typeof p.y === "number") {
          posRef.current = p;
          setPosition(p);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [message]);

  const move = useCallback((x: number, y: number) => {
    const widget = widgetRef.current;
    const w = widget ? widget.offsetWidth : 256;
    const h = widget ? widget.offsetHeight : 120;
    const cx = Math.max(0, Math.min(window.innerWidth - w, x));
    const cy = Math.max(0, Math.min(window.innerHeight - h, y));
    const p = { x: cx, y: cy };
    posRef.current = p;
    setPosition(p);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    dragOrigin.current = {
      mx: e.clientX,
      my: e.clientY,
      px: posRef.current.x,
      py: posRef.current.y,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragOrigin.current) return;
    const { mx, my, px, py } = dragOrigin.current;
    move(px + e.clientX - mx, py + e.clientY - my);
  }, [move]);

  const handlePointerUp = useCallback(() => {
    if (!dragOrigin.current) return;
    dragOrigin.current = null;
    setIsDragging(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posRef.current));
    } catch {}
  }, []);

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
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend();
  }

  if (!loggedIn) return null;

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 w-64 flex flex-col gap-1.5 bg-slate-900/95 border border-slate-700/60 rounded-xl shadow-xl backdrop-blur-sm p-3"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className={`flex items-center justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest select-none">
          Comments? New content?
        </p>
        <button
          onClick={() => setMinimized((v) => !v)}
          className="text-slate-500 hover:text-slate-300 transition text-xs leading-none px-1"
          aria-label={minimized ? "Expand feedback" : "Minimize feedback"}
        >
          {minimized ? "▲" : "▼"}
        </button>
      </div>

      {!minimized && (
        <>
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
        </>
      )}
    </div>
  );
}
