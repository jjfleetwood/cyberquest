"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, setSession } from "@/lib/auth";
import { stages, epochs } from "@/data/stages";
import { CONTENT_FLAGS, type ContentFlag } from "@/data/content-flags";

type UserRow = {
  username: string;
  email: string;
  createdAt: number | null;
  tier: string;
  coins: number;
  stageIds: string[];
  stages: number;
  badges: number;
  streak: number;
  lastActive: number | null;
};

type NdaRow = {
  name: string;
  email: string;
  acceptedAt?: string;
  ip?: string;
  sentAt?: string;
  signedAt?: string;
  envelopeId?: string;
  method?: "clickwrap" | "docusign";
  status?: string;
};

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

function NdaStatusBadge({ row }: { row: NdaRow }) {
  if (row.method === "docusign") {
    if (row.status === "signed" || row.status === "completed") {
      return <span className="text-xs px-2 py-0.5 rounded-full border border-green-500/40 bg-green-500/10 text-green-400">DocuSign ✓</span>;
    }
    if (row.status === "declined") {
      return <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400">Declined</span>;
    }
    if (row.status === "voided") {
      return <span className="text-xs px-2 py-0.5 rounded-full border border-gray-500/40 bg-gray-500/10 text-gray-500">Voided</span>;
    }
    return <span className="text-xs px-2 py-0.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400">Sent</span>;
  }
  return <span className="text-xs px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">Clickwrap ✓</span>;
}

function NdaSignatories() {
  const [rows, setRows] = useState<NdaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendName, setSendName] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  function loadRows() {
    fetch("/api/nda")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setRows(data as NdaRow[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadRows(); }, []);

  async function handleSendNda(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    setSendSuccess(false);
    try {
      const res = await fetch("/api/admin/send-nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sendName, email: sendEmail }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setSendError(data.error ?? "Failed to send NDA.");
      } else {
        setSendSuccess(true);
        setSendName("");
        setSendEmail("");
        loadRows();
      }
    } catch {
      setSendError("Network error — could not send NDA.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">NDA Signatories</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Clickwrap via <span className="font-mono text-gray-500">/demo</span> · DocuSign via the form below
          </p>
        </div>
        <span className="text-xs text-gray-600">{loading ? "…" : rows.length} total</span>
      </div>

      {/* Send DocuSign NDA form */}
      <form onSubmit={handleSendNda} className="px-6 py-4 border-b border-white/5 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-0" style={{ minWidth: "140px" }}>
          <label className="block text-xs text-gray-600 mb-1">Name</label>
          <input
            value={sendName}
            onChange={(e) => { setSendName(e.target.value); setSendSuccess(false); setSendError(null); }}
            placeholder="Jane Smith"
            required
            className="w-full text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <div className="flex-1 min-w-0" style={{ minWidth: "180px" }}>
          <label className="block text-xs text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={sendEmail}
            onChange={(e) => { setSendEmail(e.target.value); setSendSuccess(false); setSendError(null); }}
            placeholder="jane@example.com"
            required
            className="w-full text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="flex-shrink-0 text-xs px-4 py-1.5 rounded-lg border border-blue-500/40 hover:border-blue-400 text-blue-400 hover:bg-blue-500/5 transition-colors disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send DocuSign NDA"}
        </button>
        {sendSuccess && <span className="text-xs text-green-400 self-center">NDA sent via DocuSign ✓</span>}
        {sendError && <span className="text-xs text-red-400 self-center">{sendError}</span>}
      </form>

      {loading ? (
        <div className="px-6 py-8 text-center text-gray-600 text-sm">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-700 text-sm">
          No signatories yet. Send a DocuSign NDA above or share{" "}
          <span className="font-mono text-gray-600">/demo</span> for clickwrap.
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
                <NdaStatusBadge row={row} />
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

// ── Content Audit Panel ───────────────────────────────────────────────────────

const RISK_META: Record<ContentFlag["risk"], { label: string; color: string; bg: string; border: string }> = {
  "needs-attribution": { label: "Needs Attribution", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  "fair-use":          { label: "Fair Use",          color: "text-blue-400",  bg: "bg-blue-500/10",  border: "border-blue-500/30" },
  "trademark-reference":{ label: "Trademark Ref",   color: "text-orange-400",bg: "bg-orange-500/10",border: "border-orange-500/30" },
  "verified-safe":     { label: "Verified Safe",     color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
};

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

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [togglingTier, setTogglingTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function toggleTier(username: string, currentTier: string) {
    const newTier = currentTier === "pro" ? "free" : "pro";
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
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("coins");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [currentUser, setCurrentUser] = useState<string | null>(getSession());
  const now = useMemo(() => Date.now(), []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string } | null) => {
        if (data) { setCurrentUser(data.username); setSession(data.username); }
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
              <div className="grid grid-cols-[2rem_1fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem] gap-3 px-6 py-3 border-b border-white/5 text-xs text-gray-600 font-semibold uppercase tracking-wider">
                <div>#</div>
                <div>User</div>
                <div><SortBtn col="coins" label="Coins" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center"><SortBtn col="stages" label="Stages" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center">Badges</div>
                <div className="text-center"><SortBtn col="streak" label="Streak" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-right"><SortBtn col="lastActive" label="Active" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-right"><SortBtn col="createdAt" label="Joined" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} /></div>
                <div className="text-center">Pro</div>
              </div>

              {filtered.map((user, i) => (
                <div
                  key={user.username}
                  className="grid grid-cols-[2rem_1fr_2fr_5rem_4rem_4rem_5rem_6rem_4rem] gap-3 px-6 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/2 transition-colors"
                >
                  <div className="text-xs text-gray-600 font-mono">{i + 1}</div>

                  <div className="min-w-0">
                    <div className="font-semibold truncate text-sm text-white">{user.username}</div>
                    <div className="text-xs text-gray-700 truncate">{user.email}</div>
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
                      title={user.tier === "pro" ? "Revoke Pro" : "Grant Pro"}
                      className={`w-8 h-5 rounded-full transition-colors relative ${
                        user.tier === "pro" ? "bg-cyan-500" : "bg-white/10"
                      } disabled:opacity-50`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          user.tier === "pro" ? "translate-x-3.5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
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

        {/* CMS */}
        <CmsPanel />

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
