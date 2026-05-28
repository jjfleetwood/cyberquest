"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, setSession } from "@/lib/auth";
import { stages } from "@/data/stages";
import { CONTENT_FLAGS, type ContentFlag } from "@/data/content-flags";
import { USER_GROUPS, GROUP_ICONS, GROUP_LABELS, type UserGroup } from "@/lib/groups";

type UserRow = {
  username: string;
  email: string;
  createdAt: number | null;
  tier: string;
  isAdmin: boolean;
  coins: number;
  stageIds: string[];
  stages: number;
  badges: number;
  streak: number;
  lastActive: number | null;
  skin: string;
  userGroups: string[];
};

type NdaRow = {
  name: string;
  email: string;
  acceptedAt?: string;
  ip?: string;
  sentAt?: string;
  signedAt?: string;
  envelopeId?: string;
  status?: string;
};

type FlagCapture = { username: string; stageId: string; flagValue: string; ts: number };

type SortKey = "coins" | "stages" | "streak" | "lastActive" | "createdAt";
type SortDir = "desc" | "asc";

function timeAgo(ts: number | null): string {
  if (!ts) return "—";
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
      <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
      <div className="text-xs text-gray-600 uppercase tracking-wider">{label}</div>
      {sub && <div className="text-xs text-gray-700 mt-1">{sub}</div>}
    </div>
  );
}

function SortBtn({
  col, label, sortKey, sortDir, onToggle,
}: {
  col: SortKey; label: string; sortKey: SortKey; sortDir: SortDir;
  onToggle: (col: SortKey) => void;
}) {
  const active = sortKey === col;
  return (
    <button
      onClick={() => onToggle(col)}
      className={`flex items-center gap-1 hover:text-white transition-colors ${active ? "text-cyan-400" : ""}`}
    >
      {label}
      <span className="text-gray-700">{active ? (sortDir === "desc" ? "↓" : "↑") : "↕"}</span>
    </button>
  );
}

function NdaStatusBadge() {
  return <span className="text-xs px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">Signed ✓</span>;
}

function NdaSignatories() {
  const [rows, setRows] = useState<NdaRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/nda")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setRows(data as NdaRow[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">NDA Signatories</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Clickwrap via <span className="font-mono text-gray-500">/demo</span>
          </p>
        </div>
        <span className="text-xs text-gray-600">{loading ? "…" : rows.length} total</span>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-center text-gray-600 text-sm">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-700 text-sm">
          No signatories yet. Share <span className="font-mono text-gray-600">/demo</span> to collect NDAs.
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {rows.map((row, i) => {
            const ts = row.signedAt ?? row.acceptedAt ?? row.sentAt;
            return (
              <div key={i} className="px-6 py-3 flex items-center gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white font-medium">{row.name}</div>
                  <div className="text-xs text-gray-600">{row.email}</div>
                </div>
                {row.ip && <div className="text-xs text-gray-700 font-mono hidden sm:block">{row.ip}</div>}
                <NdaStatusBadge />
                <div className="text-xs text-gray-600">
                  {ts ? new Date(Number(ts)).toLocaleString() : "—"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Flag Capture Log ──────────────────────────────────────────────────────────

function FlagCaptureLog() {
  const [entries, setEntries] = useState<FlagCapture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/flag-log")
      .then((r) => (r.ok ? r.json() : { entries: [] }))
      .then((data: { entries: FlagCapture[] }) => setEntries(data.entries ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter
    ? entries.filter((e) => e.username.includes(filter) || e.stageId.includes(filter))
    : entries;

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold">Flag Capture Log</h2>
          <p className="text-xs text-gray-600 mt-0.5">Correct flag submissions — newest first, last 500</p>
        </div>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by username or stage ID…"
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 w-56"
        />
      </div>

      {loading ? (
        <div className="px-6 py-8 text-center text-gray-600 text-sm">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-700 text-sm">No flag captures recorded yet.</div>
      ) : (
        <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
          {filtered.map((e, i) => {
            const stage = stages.find((s) => s.id === e.stageId);
            return (
              <div key={i} className="px-6 py-3 grid grid-cols-[7rem_1fr_1fr_1fr] gap-3 items-center text-xs">
                <div className="text-gray-700 font-mono tabular-nums">
                  {new Date(e.ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-gray-300 font-semibold truncate">{e.username}</div>
                <div className="text-gray-500 truncate">{stage?.title ?? e.stageId}</div>
                <div className="font-mono text-green-400 truncate">{e.flagValue}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── CMS Panel ─────────────────────────────────────────────────────────────────

type AccessConfig = {
  restricted: string[];
  allowlists: Record<string, string[]>;
  epochs: { id: string; name: string; emoji: string }[];
};

type StageOverrideData = {
  stageId: string;
  override: Record<string, string>;
  defaults: Record<string, string>;
};

function CmsPanel() {
  const [tab, setTab] = useState<"access" | "content">("access");

  // ── Access control state ──
  const [accessConfig, setAccessConfig] = useState<AccessConfig | null>(null);
  const [accessLoading, setAccessLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<{ username: string }[]>([]);
  const [toggling, setToggling] = useState<string | null>(null); // "epochId:username"

  function loadAccess() {
    setAccessLoading(true);
    Promise.all([
      fetch("/api/admin/cms/access").then((r) => r.ok ? r.json() : null),
      fetch("/api/admin/users").then((r) => r.ok ? r.json() : []),
    ])
      .then(([access, users]) => {
        if (access) setAccessConfig(access as AccessConfig);
        setAllUsers((users as { username: string }[]).map((u) => ({ username: u.username })));
      })
      .catch(() => {})
      .finally(() => setAccessLoading(false));
  }

  useEffect(() => { loadAccess(); }, []);

  async function doAccessAction(body: object, toggleKey?: string) {
    setActionMsg(null);
    if (toggleKey) setToggling(toggleKey);
    const r = await fetch("/api/admin/cms/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) { loadAccess(); setActionMsg("Saved."); setTimeout(() => setActionMsg(null), 2000); }
    else { const d = await r.json() as { error?: string }; setActionMsg(d.error ?? "Error"); }
    if (toggleKey) setToggling(null);
  }

  // ── Content editor state ──
  const [selectedStageId, setSelectedStageId] = useState("");
  const [stageSearch, setStageSearch] = useState("");
  const [stageData, setStageData] = useState<StageOverrideData | null>(null);
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [contentLoading, setContentLoading] = useState(false);
  const [contentMsg, setContentMsg] = useState<string | null>(null);

  const filteredStages = useMemo(() => {
    const q = stageSearch.toLowerCase();
    return q ? stages.filter((s) => s.title.toLowerCase().includes(q) || s.id.includes(q)).slice(0, 20) : [];
  }, [stageSearch]);

  async function loadStageContent(stageId: string) {
    setContentLoading(true);
    setStageData(null);
    setContentMsg(null);
    const r = await fetch(`/api/admin/cms/stage/${stageId}`);
    if (r.ok) {
      const d = await r.json() as StageOverrideData;
      setStageData(d);
      setEditFields({ ...d.defaults, ...d.override });
    }
    setContentLoading(false);
  }

  async function saveContent() {
    if (!selectedStageId) return;
    setContentMsg(null);
    const r = await fetch(`/api/admin/cms/stage/${selectedStageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFields),
    });
    if (r.ok) {
      setContentMsg("Saved ✓");
      loadStageContent(selectedStageId);
    } else setContentMsg("Save failed");
    setTimeout(() => setContentMsg(null), 3000);
  }

  async function revertContent() {
    if (!selectedStageId || !window.confirm("Revert this stage to TypeScript defaults?")) return;
    await fetch(`/api/admin/cms/stage/${selectedStageId}`, { method: "DELETE" });
    loadStageContent(selectedStageId);
    setContentMsg("Reverted to defaults.");
    setTimeout(() => setContentMsg(null), 3000);
  }

  const EDIT_FIELDS = [
    { key: "title",             label: "Title",           rows: 1 },
    { key: "subtitle",          label: "Subtitle",        rows: 1 },
    { key: "info_tagline",      label: "Tagline",         rows: 1 },
    { key: "info_overview",     label: "Overview (one paragraph per line)",  rows: 5 },
    { key: "info_keyTakeaways", label: "Key Takeaways (one point per line)", rows: 5 },
  ] as const;

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8">
        <h2 className="text-white font-bold">Content Management</h2>
        <p className="text-xs text-gray-600 mt-0.5">Access control and live content editing — no redeploy required</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8">
        {[
          { id: "access" as const, label: "🔐 Access Control" },
          { id: "content" as const, label: "✏️ Content Editor" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="px-5 py-3 text-xs font-semibold transition-colors"
            style={{
              color: tab === id ? "#22d3ee" : "#4b5563",
              borderBottom: tab === id ? "2px solid #22d3ee" : "2px solid transparent",
              background: tab === id ? "rgba(34,211,238,0.04)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Access Control Tab ── */}
      {tab === "access" && (
        <div className="p-4">
          {accessLoading ? (
            <div className="text-center py-8 text-gray-600 text-sm">Loading…</div>
          ) : !accessConfig ? (
            <div className="text-center py-8 text-red-500 text-sm">Failed to load access config</div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 px-1 mb-3">
                Restricted epochs require explicit allowlist. By default all epochs are open to all users.
              </p>
              {actionMsg && (
                <div className="text-xs text-green-400 px-1">{actionMsg}</div>
              )}
              {accessConfig.epochs.map((ep) => {
                const isRestricted = accessConfig.restricted.includes(ep.id);
                const allowlist = accessConfig.allowlists[ep.id] ?? [];
                return (
                  <div
                    key={ep.id}
                    className="rounded-xl border border-white/8 overflow-hidden"
                    style={{ background: isRestricted ? "rgba(251,146,60,0.03)" : "rgba(255,255,255,0.01)" }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3">
                      <span className="text-base leading-none">{ep.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-300 font-medium">{ep.name}</span>
                        <span className="ml-2 text-xs text-gray-700 font-mono">{ep.id}</span>
                      </div>
                      <button
                        onClick={() => doAccessAction({ action: isRestricted ? "unrestrict" : "restrict", epochId: ep.id })}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                          isRestricted
                            ? "border-orange-500/40 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20"
                            : "border-white/15 text-gray-500 hover:border-white/30 hover:text-gray-300"
                        }`}
                      >
                        {isRestricted ? "🔒 Restricted" : "🔓 Open"}
                      </button>
                    </div>

                    {isRestricted && (
                      <div className="px-4 pb-3 border-t border-white/5 pt-2">
                        {allUsers.length === 0 ? (
                          <p className="text-xs text-gray-700 italic">No registered users yet.</p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {allUsers.map((u) => {
                              const hasAccess = allowlist.includes(u.username);
                              const key = `${ep.id}:${u.username}`;
                              const busy = toggling === key;
                              return (
                                <button
                                  key={u.username}
                                  disabled={busy}
                                  onClick={() =>
                                    doAccessAction(
                                      { action: hasAccess ? "revoke" : "grant", epochId: ep.id, username: u.username },
                                      key,
                                    )
                                  }
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all text-left ${
                                    hasAccess
                                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                                      : "border-white/10 bg-white/2 text-gray-600 hover:border-white/25 hover:text-gray-300"
                                  } disabled:opacity-40`}
                                >
                                  <span className="flex-shrink-0">{hasAccess ? "✓" : "+"}</span>
                                  <span className="truncate font-mono">{u.username}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {allowlist.length > 0 && (
                          <p className="text-[10px] text-gray-700 mt-2">
                            {allowlist.length} user{allowlist.length !== 1 ? "s" : ""} with access · click a user to toggle
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Content Editor Tab ── */}
      {tab === "content" && (
        <div className="p-4">
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-3">Search for a stage to edit its display text. Changes take effect immediately — no redeploy needed.</p>
            <div className="relative">
              <input
                value={stageSearch}
                onChange={(e) => { setStageSearch(e.target.value); setSelectedStageId(""); setStageData(null); }}
                placeholder="Search stages by title or ID…"
                className="w-full text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50"
              />
              {filteredStages.length > 0 && !selectedStageId && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-white/10 bg-slate-950/95 backdrop-blur-sm z-20 max-h-64 overflow-y-auto shadow-2xl">
                  {filteredStages.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStageId(s.id);
                        setStageSearch(s.title);
                        loadStageContent(s.id);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-white/5 transition-colors flex items-center gap-3"
                    >
                      <span className="text-base leading-none">{s.wonder.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm text-gray-300 truncate">{s.title}</div>
                        <div className="text-xs text-gray-700 font-mono">{s.id}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {contentLoading && (
            <div className="text-center py-8 text-gray-600 text-sm">Loading stage…</div>
          )}

          {stageData && !contentLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-gray-500 font-mono">{stageData.stageId}</div>
                {Object.keys(stageData.override).length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    {Object.keys(stageData.override).length} field{Object.keys(stageData.override).length !== 1 ? "s" : ""} overridden
                  </span>
                )}
              </div>

              {EDIT_FIELDS.map(({ key, label, rows }) => {
                const hasOverride = key in (stageData.override ?? {});
                const defaultVal = stageData.defaults[key] ?? "";
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-1">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">{label}</label>
                      {hasOverride && <span className="text-[10px] text-amber-400 font-mono">overridden</span>}
                    </div>
                    {rows === 1 ? (
                      <input
                        value={editFields[key] ?? ""}
                        onChange={(e) => setEditFields((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 focus:outline-none focus:border-cyan-500/50 font-mono"
                        placeholder={defaultVal}
                      />
                    ) : (
                      <textarea
                        value={editFields[key] ?? ""}
                        onChange={(e) => setEditFields((p) => ({ ...p, [key]: e.target.value }))}
                        rows={rows}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 focus:outline-none focus:border-cyan-500/50 font-mono resize-y"
                        placeholder={defaultVal}
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={saveContent}
                  className="text-sm px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 transition-colors font-semibold"
                >
                  Save Changes
                </button>
                {Object.keys(stageData.override).length > 0 && (
                  <button
                    onClick={revertContent}
                    className="text-xs px-3 py-2 rounded-lg border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  >
                    Revert to defaults
                  </button>
                )}
                {contentMsg && <span className="text-xs text-green-400">{contentMsg}</span>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Vouchers Panel ────────────────────────────────────────────────────────────

type VoucherRow = {
  code: string;
  durationDays: number;
  usesLimit: number;
  usesLeft: number;
  createdAt: number;
  uses: { username: string; redeemedAt: number }[];
};

function VouchersPanel() {
  const [vouchers, setVouchers] = useState<VoucherRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(1);
  const [usesLimit, setUsesLimit] = useState(1);
  const [durationDays, setDurationDays] = useState(30);
  const [copied, setCopied] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function loadVouchers() {
    setLoading(true);
    fetch("/api/admin/vouchers")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: VoucherRow[]) => setVouchers(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadVouchers(); }, []);

  async function generate() {
    setGenerating(true);
    const r = await fetch("/api/admin/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count, usesLimit, durationDays }),
    });
    if (r.ok) {
      setMsg(`Generated ${count} code${count !== 1 ? "s" : ""}.`);
      setTimeout(() => setMsg(null), 3000);
      loadVouchers();
    }
    setGenerating(false);
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    const active = vouchers.filter((v) => v.usesLeft > 0).map((v) => v.code).join("\n");
    navigator.clipboard.writeText(active).catch(() => {});
    setMsg("Copied all active codes.");
    setTimeout(() => setMsg(null), 2000);
  }

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-white font-bold">Voucher Codes</h2>
          <p className="text-xs text-gray-600 mt-0.5">Generate and distribute free Pro access codes</p>
        </div>
        {msg && <span className="text-green-400 text-xs">{msg}</span>}
      </div>

      {/* Generator */}
      <div className="px-6 py-5 border-b border-white/8">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Generate codes</p>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Quantity</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500/50"
            >
              {[1, 5, 10, 25, 50].map((n) => <option key={n} value={n}>{n} code{n !== 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Uses per code</label>
            <select
              value={usesLimit}
              onChange={(e) => setUsesLimit(Number(e.target.value))}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500/50"
            >
              {[1, 5, 10, 25, 100].map((n) => <option key={n} value={n}>{n} use{n !== 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Duration</label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500/50"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
          <button
            onClick={generate}
            disabled={generating}
            className="px-5 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/25 transition-colors disabled:opacity-50"
          >
            {generating ? "Generating…" : "⚡ Generate"}
          </button>
          {vouchers.filter((v) => v.usesLeft > 0).length > 0 && (
            <button
              onClick={copyAll}
              className="px-4 py-2 rounded-lg border border-white/10 text-gray-500 text-sm hover:text-gray-300 hover:border-white/25 transition-colors"
            >
              Copy all active
            </button>
          )}
        </div>
      </div>

      {/* Code list */}
      <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-600 text-sm">Loading…</div>
        ) : vouchers.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-700 text-sm">No codes yet — generate one above.</div>
        ) : (
          vouchers.map((v) => {
            const exhausted = v.usesLeft === 0;
            const redeemedBy = v.uses.map((u) => u.username).join(", ");
            return (
              <div key={v.code} className={`px-6 py-3 flex items-center gap-4 ${exhausted ? "opacity-40" : ""}`}>
                <button
                  onClick={() => copyCode(v.code)}
                  className="font-mono text-sm font-bold text-cyan-300 hover:text-cyan-200 transition-colors tracking-wider flex-shrink-0"
                  title="Click to copy"
                >
                  {copied === v.code ? "Copied ✓" : v.code}
                </button>
                <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-mono flex-shrink-0 ${
                    exhausted
                      ? "border-gray-700 text-gray-600 bg-white/3"
                      : "border-emerald-500/40 text-emerald-400 bg-emerald-500/8"
                  }`}>
                    {exhausted ? "Exhausted" : `${v.usesLeft}/${v.usesLimit} uses left`}
                  </span>
                  <span className="text-xs text-gray-600 flex-shrink-0">{v.durationDays}d Pro</span>
                  {redeemedBy && (
                    <span className="text-xs text-gray-700 truncate">→ {redeemedBy}</span>
                  )}
                </div>
                <span className="text-xs text-gray-700 flex-shrink-0">
                  {new Date(v.createdAt).toLocaleDateString()}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Downloads Access Panel ───────────────────────────────────────────────────

type DownloadsMode = "off" | "allowlist" | "all";

function DownloadsAccessPanel({ users }: { users: { username: string }[] }) {
  const [mode, setMode] = useState<DownloadsMode>("off");
  const [allowlist, setAllowlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/downloads-access")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { mode: DownloadsMode; allowlist: string[] } | null) => {
        if (d) { setMode(d.mode); setAllowlist(d.allowlist); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function setGlobalMode(m: DownloadsMode) {
    setSaving(true);
    const r = await fetch("/api/admin/downloads-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set-mode", mode: m }),
    });
    if (r.ok) { setMode(m); setMsg("Saved."); setTimeout(() => setMsg(null), 2000); }
    setSaving(false);
  }

  async function toggleUser(username: string) {
    const has = allowlist.includes(username);
    setToggling(username);
    const r = await fetch("/api/admin/downloads-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: has ? "revoke" : "grant", username }),
    });
    if (r.ok) {
      setAllowlist((prev) => has ? prev.filter((u) => u !== username) : [...prev, username]);
    }
    setToggling(null);
  }

  const MODES: { value: DownloadsMode; label: string; desc: string; color: string }[] = [
    { value: "off",       label: "Off",           desc: "No one can access downloads",                         color: "border-red-500/50 bg-red-500/8 text-red-400" },
    { value: "allowlist", label: "Allowlist",      desc: "Only users you enable below can access",             color: "border-amber-500/50 bg-amber-500/8 text-amber-400" },
    { value: "all",       label: "All users",      desc: "Every logged-in user can access downloads",          color: "border-emerald-500/50 bg-emerald-500/8 text-emerald-400" },
  ];

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-white font-bold">Downloads Access</h2>
          <p className="text-xs text-gray-600 mt-0.5">Control who can access the Python MCP template downloads page</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <a href="/downloads" target="_blank" rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 transition-colors font-mono">
            /downloads ↗
          </a>
          {msg && <span className="text-green-400">{msg}</span>}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mode radio buttons */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Access mode</p>
          {loading ? (
            <div className="text-gray-700 text-sm">Loading…</div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setGlobalMode(m.value)}
                  disabled={saving}
                  className={`flex-1 px-4 py-3 rounded-xl border text-left transition-all disabled:opacity-50 ${
                    mode === m.value
                      ? m.color
                      : "border-white/10 bg-white/3 text-gray-500 hover:border-white/25 hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                      mode === m.value ? "border-current bg-current/60" : "border-gray-600 bg-transparent"
                    }`} />
                    <span className="text-sm font-bold">{m.label}</span>
                  </div>
                  <p className="text-xs opacity-70 ml-5">{m.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Per-user allowlist — only shown in allowlist mode */}
        {mode === "allowlist" && !loading && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
              User allowlist <span className="text-gray-700 normal-case font-normal">— {allowlist.length} user{allowlist.length !== 1 ? "s" : ""} with access</span>
            </p>
            {users.length === 0 ? (
              <p className="text-xs text-gray-700 italic">No registered users yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                {users.map((u) => {
                  const hasAccess = allowlist.includes(u.username);
                  const busy = toggling === u.username;
                  return (
                    <button
                      key={u.username}
                      onClick={() => toggleUser(u.username)}
                      disabled={busy}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all text-left disabled:opacity-40 ${
                        hasAccess
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                          : "border-white/10 bg-white/2 text-gray-600 hover:border-white/25 hover:text-gray-300"
                      }`}
                    >
                      <span className="flex-shrink-0">{hasAccess ? "✓" : "+"}</span>
                      <span className="truncate font-mono">{u.username}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Content Audit Panel ───────────────────────────────────────────────────────

const RISK_META: Record<ContentFlag["risk"], { label: string; color: string; bg: string; border: string }> = {
  "needs-attribution": { label: "Needs Attribution", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  "fair-use":          { label: "Fair Use",          color: "text-blue-400",  bg: "bg-blue-500/10",  border: "border-blue-500/30" },
  "trademark-reference":{ label: "Trademark Ref",   color: "text-orange-400",bg: "bg-orange-500/10",border: "border-orange-500/30" },
  "verified-safe":     { label: "Verified Safe",     color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
};

function PipelineTestPanel() {
  const [stageId, setStageId] = useState("quantum-01");
  const [awardUsername, setAwardUsername] = useState("jjb");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [journeyResult, setJourneyResult] = useState<string | null>(null);
  const [journeyLoading, setJourneyLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/award-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId, username: awardUsername, grantTrophy: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(`❌ ${data.error ?? "Failed"}`);
      } else {
        const p = data.progress;
        const t = data.trophy;
        setResult(
          `✅ Awarded "${data.stageTitle}" to ${data.username}\n` +
          `   Coins: ${p.coins} (+${data.coinsAwarded})\n` +
          `   Stages: ${p.completedStages.length}\n` +
          `   Streak: ${p.streak}\n` +
          `   Badges: ${p.badges.length}\n` +
          (t ? `   Trophy: ${t.emoji} ${t.name} (${t.tier})` : "   Trophy: none available")
        );
      }
    } catch {
      setResult("❌ Network error");
    } finally {
      setLoading(false);
    }
  }

  async function checkJourney() {
    setJourneyLoading(true);
    setJourneyResult(null);
    try {
      const [meRes, progressRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/progress"),
      ]);

      const meStatus = meRes.status;
      const progressStatus = progressRes.status;

      const meData = meRes.ok ? await meRes.json() as { username?: string; isAdmin?: boolean; email?: string } : null;
      const progressData = progressRes.ok ? await progressRes.json() as { coins?: number; completedStages?: string[]; streak?: number; badges?: string[] } : null;

      let out = `── /api/auth/me  (HTTP ${meStatus}) ──\n`;
      if (meData) {
        out += `   username: ${meData.username ?? "null"}\n`;
        out += `   isAdmin:  ${meData.isAdmin ?? false}\n`;
        out += `   email:    ${meData.email ?? "(none)"}\n`;
      } else {
        out += `   ❌ Returned ${meStatus} — admin_token not recognized as identity\n`;
      }

      out += `\n── /api/progress  (HTTP ${progressStatus}) ──\n`;
      if (progressData) {
        out += `   coins:    ${progressData.coins ?? 0}\n`;
        out += `   stages:   ${progressData.completedStages?.length ?? 0} completed\n`;
        out += `   streak:   ${progressData.streak ?? 0}\n`;
        out += `   badges:   ${progressData.badges?.length ?? 0}\n`;
        if ((progressData.completedStages?.length ?? 0) > 0) {
          out += `   last 3:   ${progressData.completedStages!.slice(-3).join(", ")}\n`;
        }
      } else {
        out += `   ❌ Returned ${progressStatus} — progress not accessible without session_token\n`;
      }

      out += `\n── Journey page diagnosis ──\n`;
      if (!meData) {
        out += `   ❌ Journey will show guest view (auth/me failed)\n`;
      } else if (!progressData) {
        out += `   ⚠️  Identity OK but progress fetch failed\n`;
      } else {
        out += `   ✅ Journey map should load with ${progressData.completedStages?.length ?? 0} completed stages\n`;
      }

      setJourneyResult(out);
    } catch (e) {
      setJourneyResult(`❌ Network error: ${e}`);
    } finally {
      setJourneyLoading(false);
    }
  }

  return (
    <div className="bg-white/2 border border-cyan-500/20 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/8">
        <h2 className="text-white font-bold">Pipeline Test — Manual Stage Award</h2>
        <p className="text-xs text-gray-600 mt-0.5">Award a stage completion + random trophy. Tests the full downstream pipeline: XP, streak, badges, leaderboard, email.</p>
      </div>
      <div className="px-6 py-5 space-y-4">
        {/* Award section */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-32">
            <label className="text-xs text-gray-500 block mb-1">Stage ID</label>
            <input
              value={stageId}
              onChange={(e) => setStageId(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500/50"
              placeholder="quantum-01"
            />
          </div>
          <div className="flex-1 min-w-32">
            <label className="text-xs text-gray-500 block mb-1">Username</label>
            <input
              value={awardUsername}
              onChange={(e) => setAwardUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500/50"
              placeholder="jjb"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={run}
              disabled={loading}
              className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm rounded-lg hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
            >
              {loading ? "Running…" : "▶ Trigger"}
            </button>
          </div>
        </div>
        {result && (
          <pre className="bg-black/50 border border-white/8 rounded-lg p-3 text-xs text-green-300 font-mono whitespace-pre-wrap">
            {result}
          </pre>
        )}

        {/* Journey diagnostic section */}
        <div className="border-t border-white/8 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-white font-semibold">Journey Map Diagnostics</div>
              <div className="text-xs text-gray-600 mt-0.5">Checks /api/auth/me and /api/progress as this browser session — exactly what the Journey page calls.</div>
            </div>
            <button
              onClick={checkJourney}
              disabled={journeyLoading}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              {journeyLoading ? "Checking…" : "🗺 Check Journey"}
            </button>
          </div>
          {journeyResult && (
            <pre className="bg-black/50 border border-white/8 rounded-lg p-3 text-xs text-purple-200 font-mono whitespace-pre-wrap">
              {journeyResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentAudit() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const needsAction = CONTENT_FLAGS.filter((f) => f.risk === "needs-attribution");
  const fairUse     = CONTENT_FLAGS.filter((f) => f.risk === "fair-use");
  const safe        = CONTENT_FLAGS.filter((f) => f.risk === "verified-safe");

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-white font-bold">Content IP Audit</h2>
            <p className="text-xs text-gray-600 mt-0.5">Third-party content, licenses, and attribution requirements</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full border ${RISK_META["needs-attribution"].bg} ${RISK_META["needs-attribution"].border} ${RISK_META["needs-attribution"].color}`}>
              {needsAction.length} need attribution
            </span>
            <span className={`px-2 py-0.5 rounded-full border ${RISK_META["fair-use"].bg} ${RISK_META["fair-use"].border} ${RISK_META["fair-use"].color}`}>
              {fairUse.length} fair use
            </span>
            <span className={`px-2 py-0.5 rounded-full border ${RISK_META["verified-safe"].bg} ${RISK_META["verified-safe"].border} ${RISK_META["verified-safe"].color}`}>
              {safe.length} safe
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {CONTENT_FLAGS.map((flag) => {
          const meta = RISK_META[flag.risk];
          const open = expanded === flag.epochId;
          return (
            <div key={flag.epochId}>
              <button
                onClick={() => setExpanded(open ? null : flag.epochId)}
                className="w-full px-6 py-3.5 flex items-center gap-4 text-left hover:bg-white/2 transition-colors"
              >
                <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded border font-mono ${meta.bg} ${meta.border} ${meta.color}`}>
                  {meta.label}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-300 font-medium">{flag.source}</span>
                  <span className="ml-2 text-xs text-gray-700 font-mono">/{flag.epochId}</span>
                </div>
                {flag.license && (
                  <span className="text-xs text-gray-600 font-mono hidden sm:block">{flag.license}</span>
                )}
                <span className="text-gray-700 text-xs flex-shrink-0">{open ? "▲" : "▼"}</span>
              </button>

              {open && (
                <div className="px-6 pb-4 space-y-3 border-t border-white/5 pt-3">
                  <div>
                    <div className="text-xs text-gray-600 mb-1 uppercase tracking-wider">Attribution text</div>
                    <p className="text-xs text-gray-400 bg-white/3 rounded-lg px-3 py-2.5 leading-relaxed border border-white/5">
                      {flag.attributionText}
                    </p>
                  </div>
                  <div className="flex items-start gap-6 flex-wrap">
                    <div>
                      <div className="text-xs text-gray-600 mb-1 uppercase tracking-wider">Admin note</div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-lg">{flag.adminNote}</p>
                    </div>
                    <div className="flex gap-4">
                      {flag.attributionUrl && (
                        <a
                          href={flag.attributionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors"
                        >
                          Source ↗
                        </a>
                      )}
                      <span className="text-xs text-gray-700">Reviewed {flag.reviewedAt}</span>
                      <Link
                        href={`/stages/epoch/${flag.epochId}`}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View epoch →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Investor Metrics Panel ────────────────────────────────────────────────────

const EPOCH_NAMES: Record<string, string> = {
  "first-journey": "Our First Journey", "ancient": "Foundations",
  "cisco-core": "Cisco: Core CVEs", "cisco-enterprise": "Cisco: Enterprise",
  "cisco-secops": "Cisco: SecOps", "cisco-advanced": "Cisco: Adv Defense",
  "tech-audit-1": "Audit: Foundations", "tech-audit-2": "Audit: Technical",
  "tech-audit-3": "Audit: Agentic", "tech-audit-4": "Cont. Monitoring",
  "mitre": "MITRE ATT&CK", "mitre-atlas": "MITRE ATLAS",
  "owasp-llm": "OWASP LLM Top 10", "quantum-1": "Quantum: Threats",
  "quantum-2": "Quantum: PQC", "quantum-3": "Quantum: QKD",
  "umbrella": "Cisco Umbrella", "tapestry": "Tapestry",
  "nails": "Nail Arts", "hair-color": "Hair Coloring", "hair-styling": "Hair Styling",
  "driving-1": "Road to License", "driving-2": "First Miles", "driving-3": "Rules of Road",
  "baseball-1": "Play Ball!", "baseball-2": "Art of Hitting",
  "baseball-3": "Adv Mechanics", "baseball-4": "Elite Mastery",
  "baseball-5": "Art of Pitching", "baseball-6": "Pitch Arsenal",
  "baseball-7": "Pitching Strategy", "paris-july": "Paris in July",
  "milan-july": "Milan in July", "french-basics": "French Basics",
  "italian-basics": "Italian Basics",
};

function epochLabel(id: string) {
  return EPOCH_NAMES[id] ?? id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function MetricsPanel({ users, loading }: { users: UserRow[]; loading: boolean }) {
  const metrics = useMemo(() => {
    if (!users.length) return null;
    const now = Date.now();

    // Build epoch → stage IDs map + pre-build user stage sets
    const epochStageMap: Record<string, string[]> = {};
    for (const s of stages) {
      if (!epochStageMap[s.epochId]) epochStageMap[s.epochId] = [];
      epochStageMap[s.epochId].push(s.id);
    }
    const userStageSets = users.map(u => new Set(u.stageIds ?? []));

    const wau     = users.filter(u => u.lastActive && now - u.lastActive < 7  * 86400000).length;
    const mau     = users.filter(u => u.lastActive && now - u.lastActive < 30 * 86400000).length;
    const returnRate7d = Math.round((wau / users.length) * 100);
    const avgStages = (users.reduce((s, u) => s + u.stages, 0) / users.length).toFixed(1);

    const activated  = users.filter(u => u.stages >= 1).length;
    const fivePlus   = users.filter(u => u.stages >= 5).length;
    const tenPlus    = users.filter(u => u.stages >= 10).length;
    const thirtyPlus = users.filter(u => u.stages >= 30).length;

    const newToday    = users.filter(u => u.createdAt && now - u.createdAt < 86400000).length;
    const newThisWeek = users.filter(u => u.createdAt && now - u.createdAt < 7 * 86400000).length;

    const epochRates = Object.entries(epochStageMap).map(([epochId, stageIds]) => {
      const completedCount = userStageSets.filter(set => stageIds.every(id => set.has(id))).length;
      return { epochId, stageCount: stageIds.length, completedCount, rate: Math.round((completedCount / users.length) * 100) };
    }).sort((a, b) => b.completedCount - a.completedCount || b.rate - a.rate);

    const tiers = { "all-star": 0, pro: 0, free: 0 };
    for (const u of users) {
      if (u.tier === "all-star") tiers["all-star"]++;
      else if (u.tier === "pro") tiers.pro++;
      else tiers.free++;
    }

    return { wau, mau, returnRate7d, avgStages, activated, fivePlus, tenPlus, thirtyPlus, newToday, newThisWeek, epochRates, tiers };
  }, [users]);

  const pct = (n: number) => users.length ? Math.round((n / users.length) * 100) : 0;

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Investor Metrics</h2>
          <p className="text-xs text-gray-600 mt-0.5">Live — computed from Redis user data</p>
        </div>
        {!loading && metrics && (
          <span className="text-[10px] text-gray-700 font-mono">{users.length} users · updated now</span>
        )}
      </div>

      {loading || !metrics ? (
        <div className="px-6 py-10 text-center text-gray-600 text-sm">Loading metrics…</div>
      ) : (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/8">
            {[
              { label: "Weekly Active (WAU)", value: metrics.wau, sub: `${metrics.mau} monthly`, color: "text-cyan-400" },
              {
                label: "7-Day Return Rate", value: `${metrics.returnRate7d}%`,
                sub: `${metrics.wau} of ${users.length} users`,
                color: metrics.returnRate7d >= 30 ? "text-green-400" : metrics.returnRate7d >= 15 ? "text-yellow-400" : "text-red-400",
              },
              { label: "Avg Stages / User", value: metrics.avgStages, sub: `of ${stages.length} total`, color: "text-purple-400" },
              { label: "Activated (1+ stage)", value: metrics.activated, sub: `${pct(metrics.activated)}% of registered`, color: "text-emerald-400" },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="px-6 py-5 text-center border-r border-b border-white/5 last:border-r-0">
                <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">{label}</div>
                <div className="text-xs text-gray-700 mt-1">{sub}</div>
              </div>
            ))}
          </div>

          {/* Funnel + Epoch rates */}
          <div className="grid md:grid-cols-2 divide-x divide-white/5">
            {/* Funnel */}
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">User Funnel</div>
              <div className="space-y-3">
                {[
                  { label: "Registered",          n: users.length,        color: "bg-white/20" },
                  { label: "Started (1+ stage)",  n: metrics.activated,   color: "bg-cyan-500" },
                  { label: "Engaged (5+ stages)", n: metrics.fivePlus,    color: "bg-purple-500" },
                  { label: "Retained (10+)",      n: metrics.tenPlus,     color: "bg-indigo-500" },
                  { label: "Power users (30+)",   n: metrics.thirtyPlus,  color: "bg-violet-500" },
                ].map(({ label, n, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-xs font-mono text-gray-400">
                        {n} <span className="text-gray-700">({pct(n)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${Math.max(pct(n), n > 0 ? 1 : 0)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Growth · Tiers</div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {[
                    { label: "New today",    value: metrics.newToday,    color: "text-white" },
                    { label: "New this week",value: metrics.newThisWeek, color: "text-white" },
                    { label: "MAU",          value: metrics.mau,         color: "text-cyan-400" },
                    { label: "WAU",          value: metrics.wau,         color: "text-cyan-400" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white/3 border border-white/5 rounded-lg px-3 py-2 text-center">
                      <div className={`text-xl font-black ${color}`}>{value}</div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "All-Star", value: metrics.tiers["all-star"], color: "text-yellow-300" },
                    { label: "Pro",      value: metrics.tiers.pro,         color: "text-cyan-400" },
                    { label: "Free",     value: metrics.tiers.free,        color: "text-gray-500" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white/3 border border-white/5 rounded-lg px-3 py-2 text-center">
                      <div className={`text-xl font-black ${color}`}>{value}</div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Epoch completion rates */}
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">Epoch Completion Rates</div>
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {metrics.epochRates.map(({ epochId, stageCount, completedCount, rate }) => (
                  <div key={epochId}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400 truncate mr-2">{epochLabel(epochId)}</span>
                      <span className="text-xs font-mono text-gray-500 flex-shrink-0">
                        {completedCount} <span className="text-gray-700">({rate}%) · {stageCount}s</span>
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-1 rounded-full transition-all"
                        style={{
                          width: `${Math.max(rate, completedCount > 0 ? 1 : 0)}%`,
                          background: rate >= 20 ? "#22d3ee" : rate >= 5 ? "#a78bfa" : "#6366f1",
                        }}
                      />
                    </div>
                  </div>
                ))}
                {metrics.epochRates.every(e => e.completedCount === 0) && (
                  <p className="text-xs text-gray-700 italic">No epoch completions recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [togglingTier, setTogglingTier] = useState<string | null>(null);
  const [togglingAdmin, setTogglingAdmin] = useState<string | null>(null);
  const [settingGroup, setSettingGroup] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function toggleTier(username: string, currentTier: string) {
    // Cycle: free → pro → all-star → free
    const newTier = currentTier === "free" ? "pro" : currentTier === "pro" ? "all-star" : "free";
    setTogglingTier(username);
    try {
      const res = await fetch("/api/admin/set-tier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, tier: newTier }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.username === username ? { ...u, tier: newTier } : u));
      }
    } finally {
      setTogglingTier(null);
    }
  }

  async function toggleGroupBit(username: string, group: UserGroup, currentGroups: string[]) {
    const newGroups = currentGroups.includes(group)
      ? currentGroups.filter((g) => g !== group)
      : [...currentGroups, group];
    if (newGroups.length === 0) return;
    setSettingGroup(username);
    try {
      const res = await fetch("/api/admin/set-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, groups: newGroups }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.username === username ? { ...u, userGroups: newGroups } : u));
      }
    } finally {
      setSettingGroup(null);
    }
  }

  async function toggleAdmin(username: string, currentIsAdmin: boolean) {
    setTogglingAdmin(username);
    try {
      const res = await fetch("/api/admin/grant-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, grant: !currentIsAdmin }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.username === username ? { ...u, isAdmin: !currentIsAdmin } : u));
      }
    } finally {
      setTogglingAdmin(null);
    }
  }

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("coins");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [currentUser, setCurrentUser] = useState<string | null>(getSession());
  const now = useMemo(() => Date.now(), []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string; isSuperAdmin?: boolean } | null) => {
        if (data) { setCurrentUser(data.username); setSession(data.username); setIsSuperAdmin(data.isSuperAdmin ?? false); }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => {
        if (r.status === 401) { router.replace("/stages"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setUsers(data as UserRow[]); })
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  }, [router]);

  const totalCoins = users.reduce((s, u) => s + u.coins, 0);
  const totalStages = stages.length;
  const avgCoins = users.length ? Math.round(totalCoins / users.length) : 0;
  const avgCompletion = users.length
    ? Math.round((users.reduce((s, u) => s + u.stages, 0) / users.length / totalStages) * 100)
    : 0;
  const activeToday = users.filter(
    (u) => u.lastActive !== null && now - u.lastActive < 86_400_000
  ).length;
  const newThisWeek = users.filter(
    (u) => u.createdAt !== null && now - u.createdAt < 7 * 86_400_000
  ).length;
  const maxCoins = Math.max(...users.map((u) => u.coins), 1);

  // Stage completion funnel
  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const u of users) {
      for (const id of (u.stageIds ?? [])) {
        counts[id] = (counts[id] ?? 0) + 1;
      }
    }
    return counts;
  }, [users]);

  const topStages = useMemo(() => {
    return stages
      .map((s) => ({ ...s, completions: stageCounts[s.id] ?? 0 }))
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 10);
  }, [stageCounts]);

  const bottomStages = useMemo(() => {
    return stages
      .map((s) => ({ ...s, completions: stageCounts[s.id] ?? 0 }))
      .sort((a, b) => a.completions - b.completions)
      .slice(0, 5);
  }, [stageCounts]);

  // Sorted + filtered users
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = q
      ? users.filter((u) => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      : [...users];
    list.sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      return sortDir === "desc" ? Number(bv) - Number(av) : Number(av) - Number(bv);
    });
    return list;
  }, [users, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/stages" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              ← Back to Stage Map
            </Link>
            <button
              type="button"
              onClick={() => window.open("https://remotedesktop.google.com/access", "_blank", "noopener,noreferrer")}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-300 border border-gray-700 hover:border-cyan-500/60 bg-transparent hover:bg-cyan-500/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
            >
              ⛵ Remote Desktop
            </button>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono">
                  ADMIN
                </span>
              </div>
              <p className="text-gray-600 text-sm">Logged in as <span className="text-cyan-400">{currentUser}</span></p>
            </div>
            <Link
              href="/admin/docs"
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 rounded-lg text-sm transition-colors"
            >
              📄 View Docs
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard label="Total Users" value={loading ? "…" : users.length} color="text-cyan-400" />
          <StatCard label="Active Today" value={loading ? "…" : activeToday} color="text-green-400" />
          <StatCard label="New This Week" value={loading ? "…" : newThisWeek} color="text-emerald-400" />
          <StatCard label="Total Stages" value={totalStages} color="text-orange-400" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Coins Earned" value={loading ? "…" : totalCoins.toLocaleString()} color="text-purple-400" />
          <StatCard label="Avg Coins / User" value={loading ? "…" : avgCoins.toLocaleString()} color="text-violet-400" />
          <StatCard
            label="Avg Completion"
            value={loading ? "…" : `${avgCompletion}%`}
            sub={loading ? undefined : `${Math.round(avgCompletion / 100 * totalStages)} of ${totalStages} stages avg`}
            color="text-sky-400"
          />
        </div>

        {/* Investor Metrics */}
        <MetricsPanel users={users} loading={loading} />

        {/* User table */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-white font-bold">Registered Users</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600">{loading ? "…" : `${filtered.length} / ${users.length}`}</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user or email…"
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 w-48"
              />
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-gray-600 text-sm">Loading users…</div>
          ) : error ? (
            <div className="px-6 py-12 text-center text-red-500 text-sm">{error}</div>
          ) : users.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-600">No server-registered users yet.</div>
          ) : (
            <div>
              <div className={`grid ${isSuperAdmin ? "grid-cols-[2rem_3fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem_9rem_4rem]" : "grid-cols-[2rem_3fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem_9rem]"} gap-3 px-6 py-3 border-b border-white/5 text-xs text-gray-600 font-semibold uppercase tracking-wider`}>
                <div>#</div>
                <div>User</div>
                <div><SortBtn col="coins" label="Coins" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center"><SortBtn col="stages" label="Stages" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center">Badges</div>
                <div className="text-center"><SortBtn col="streak" label="Streak" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-right"><SortBtn col="lastActive" label="Active" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-right"><SortBtn col="createdAt" label="Joined" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center">Pro</div>
                <div className="text-center">Group</div>
                {isSuperAdmin && <div className="text-center">Admin</div>}
              </div>

              {filtered.map((user, i) => (
                <div
                  key={user.username}
                  className={`grid ${isSuperAdmin ? "grid-cols-[2rem_3fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem_9rem_4rem]" : "grid-cols-[2rem_3fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem_9rem]"} gap-3 px-6 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/2 transition-colors`}
                >
                  <div className="text-xs text-gray-600 font-mono">{i + 1}</div>

                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-white break-all">{user.username}</div>
                    <div className="text-xs text-gray-700 break-all">{user.email}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(user.coins / maxCoins) * 100}%`,
                          background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-400 flex-shrink-0 w-14 text-right">
                      {user.coins} 🪙
                    </span>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    {user.stages} / {totalStages}
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    {user.badges > 0 ? "🏅".repeat(Math.min(user.badges, 3)) : "—"}
                  </div>

                  <div className="text-center text-sm">
                    {user.streak > 0 ? (
                      <span className={user.streak >= 7 ? "text-orange-400" : "text-amber-600"}>
                        🔥 {user.streak}d
                      </span>
                    ) : (
                      <span className="text-gray-700">—</span>
                    )}
                  </div>

                  <div className="text-right text-xs text-gray-600">{timeAgo(user.lastActive)}</div>

                  <div className="text-right text-xs text-gray-700">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleTier(user.username, user.tier)}
                      disabled={togglingTier === user.username}
                      title={`Tier: ${user.tier} — click to cycle`}
                      className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors disabled:opacity-50 ${
                        user.tier === "all-star"
                          ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
                          : user.tier === "pro"
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                          : "bg-white/5 border-white/10 text-gray-600"
                      }`}
                    >
                      {user.tier === "all-star" ? "⭐ all-star" : user.tier === "pro" ? "pro" : "free"}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {USER_GROUPS.map((g) => {
                      const active = (user.userGroups ?? ["career", "curious"]).includes(g);
                      return (
                        <button
                          key={g}
                          onClick={() => toggleGroupBit(user.username, g as UserGroup, user.userGroups ?? ["career", "curious"])}
                          disabled={settingGroup === user.username}
                          title={GROUP_LABELS[g as UserGroup]}
                          className={`w-5 h-5 rounded-full text-xs transition-all disabled:opacity-50 border flex items-center justify-center leading-none ${
                            active
                              ? "border-cyan-500/50 bg-cyan-500/20"
                              : "border-white/10 bg-white/3 opacity-30 hover:opacity-60"
                          }`}
                        >
                          {GROUP_ICONS[g as UserGroup]}
                        </button>
                      );
                    })}
                  </div>

                  {isSuperAdmin && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleAdmin(user.username, user.isAdmin)}
                        disabled={togglingAdmin === user.username || user.username === currentUser}
                        title={user.username === currentUser ? "Cannot revoke your own access" : user.isAdmin ? "Revoke Admin" : "Grant Admin"}
                        className={`w-8 h-5 rounded-full transition-colors relative ${
                          user.isAdmin ? "bg-red-500" : "bg-white/10"
                        } disabled:opacity-30`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            user.isAdmin ? "translate-x-3.5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stage analytics */}
        {!loading && users.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Top completed */}
            <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8">
                <h2 className="text-white font-bold">Top Completed Stages</h2>
                <p className="text-xs text-gray-600 mt-0.5">Most popular among your users</p>
              </div>
              <div className="divide-y divide-white/5">
                {topStages.map((s, i) => (
                  <div key={s.id} className="px-6 py-3 flex items-center gap-3">
                    <span className="text-xs text-gray-700 font-mono w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-300 truncate">{s.title}</div>
                      <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          style={{ width: `${users.length ? (s.completions / users.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 flex-shrink-0">
                      {s.completions} <span className="text-gray-700">/ {users.length}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Least completed */}
            <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8">
                <h2 className="text-white font-bold">Lowest Completion Stages</h2>
                <p className="text-xs text-gray-600 mt-0.5">Potential drop-off points</p>
              </div>
              <div className="divide-y divide-white/5">
                {bottomStages.map((s, i) => (
                  <div key={s.id} className="px-6 py-3 flex items-center gap-3">
                    <span className="text-xs text-gray-700 font-mono w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-300 truncate">{s.title}</div>
                      <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                          style={{ width: `${users.length ? (s.completions / users.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-red-400 flex-shrink-0">
                      {s.completions} <span className="text-gray-700">/ {users.length}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NDA Signatories */}
        <NdaSignatories />

        {/* Flag Capture Log */}
        <FlagCaptureLog />

        {/* CMS */}
        <CmsPanel />

        {/* Pipeline Test / Manual Award */}
        <PipelineTestPanel />

        {/* Vouchers */}
        <VouchersPanel />

        {/* Downloads Access */}
        <DownloadsAccessPanel users={users.map((u) => ({ username: u.username }))} />

        {/* Content IP Audit */}
        <ContentAudit />

        {/* Stage catalog */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-white font-bold">Stage Catalog</h2>
            <span className="text-xs text-gray-600">{totalStages} stages</span>
          </div>
          <div className="divide-y divide-white/5">
            {stages.map((stage) => {
              const completions = stageCounts[stage.id] ?? 0;
              const pct = users.length ? Math.round((completions / users.length) * 100) : 0;
              return (
                <div key={stage.id} className="px-6 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-gray-700 w-5 flex-shrink-0">{stage.order}</span>
                    <span className="text-sm text-gray-300 font-medium truncate">{stage.title}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {stage.cveId && (
                      <span className="text-xs text-red-400/70 hidden sm:block">{stage.cveId}</span>
                    )}
                    <span className="text-xs text-gray-600 font-mono w-10 text-right">{pct}%</span>
                    <span className="text-xs text-cyan-600">+{stage.xp} 🪙</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                      stage.challengeType === "ctf"
                        ? "border-purple-500/30 text-purple-400 bg-purple-500/5"
                        : "border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
                    }`}>
                      {stage.challengeType.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
