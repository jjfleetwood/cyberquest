import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type AuditEntry = { admin: string; action: string; target?: string; ts: number };

const ACTION_LABELS: Record<string, string> = {
  "upgrade-pro":         "⭐ Upgraded to Pro",
  "set-tier":            "Changed user tier",
  "set-skin":            "Changed avatar skin",
  "set-group":           "Changed user group",
  "award-stage":         "Manually awarded stage",
  "grant-admin":         "Granted admin rights",
  "revoke-admin":        "Revoked admin rights",
  "create-vouchers":     "Generated voucher codes",
  "revoke-voucher":      "Revoked voucher code",
  "downloads-set-mode":  "Changed downloads access mode",
  "downloads-grant":     "Granted downloads access",
  "downloads-revoke":    "Revoked downloads access",
  "cms-stage-save":      "Saved CMS stage override",
  "cms-stage-delete":    "Deleted CMS stage override",
};

// Source labels for upgrade-pro events
const UPGRADE_SOURCE_LABELS: Record<string, string> = {
  stripe:  "Stripe subscription",
  voucher: "Voucher code",
  survey:  "Survey reward",
};

const SENSITIVE = new Set([
  "grant-admin", "revoke-admin", "set-tier",
  "create-vouchers", "revoke-voucher",
]);

function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    timeZone: "UTC", hour: "2-digit", minute: "2-digit", hour12: true,
  }) + " UTC";
}

function fmtTarget(target: string | undefined): string {
  if (!target) return "";
  // Truncate long targets gracefully
  return target.length > 60 ? target.slice(0, 57) + "…" : target;
}

function buildHtml(
  entries: AuditEntry[],
  byAdmin: Map<string, AuditEntry[]>,
  dateStr: string,
  periodEnd: Date,
): string {
  const totalActions = entries.length;
  const sensitiveActions = entries.filter(e => SENSITIVE.has(e.action));
  const upgradeEvents = entries.filter(e => e.action === "upgrade-pro");
  const uniqueAdmins = byAdmin.size;

  const summaryColor = sensitiveActions.length > 0 ? "#f97316" : "#22d3ee";

  // Sort admins by action count desc
  const adminsSorted = [...byAdmin.entries()].sort((a, b) => b[1].length - a[1].length);

  const adminSections = adminsSorted.map(([admin, acts]) => {
    const rows = acts
      .sort((a, b) => b.ts - a.ts)
      .map(e => {
        const isSensitive = SENSITIVE.has(e.action);
        const label = ACTION_LABELS[e.action] ?? e.action;
        const target = fmtTarget(e.target);
        const color = isSensitive ? "#f97316" : "#d1d5db";
        const badge = isSensitive
          ? `<span style="background:#7c2d12;color:#f97316;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;letter-spacing:1px;">SENSITIVE</span>`
          : "";
        return `
          <tr>
            <td style="padding:6px 8px;color:rgba(156,163,175,0.7);font-size:11px;white-space:nowrap;vertical-align:top;">${fmtTime(e.ts)}</td>
            <td style="padding:6px 8px;color:${color};font-size:13px;vertical-align:top;">${label}${badge}</td>
            <td style="padding:6px 8px;color:rgba(156,163,175,0.6);font-size:12px;font-family:'Courier New',monospace;vertical-align:top;">${target}</td>
          </tr>`;
      }).join("");

    return `
      <div style="margin-bottom:20px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
        <div style="background:rgba(255,255,255,0.04);padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#22d3ee;font-weight:700;font-size:14px;">@${admin}</span>
          <span style="color:rgba(156,163,175,0.6);font-size:12px;margin-left:10px;">${acts.length} action${acts.length !== 1 ? "s" : ""}</span>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${rows}
        </table>
      </div>`;
  }).join("");

  const noActivityBlock = totalActions === 0
    ? `<p style="color:rgba(156,163,175,0.6);font-size:14px;text-align:center;padding:24px 0;">No admin activity in the last 24 hours.</p>`
    : adminSections;

  const sensitiveBlock = sensitiveActions.length > 0
    ? `<div style="margin-bottom:20px;background:rgba(124,45,18,0.2);border:1px solid rgba(249,115,22,0.3);border-radius:8px;padding:14px 16px;">
        <div style="color:#f97316;font-weight:700;font-size:13px;margin-bottom:8px;">⚠️ Sensitive actions requiring review (${sensitiveActions.length})</div>
        ${sensitiveActions.map(e => `
          <div style="font-size:12px;color:#fca5a5;margin-bottom:4px;font-family:'Courier New',monospace;">
            ${fmtTime(e.ts)} &nbsp;·&nbsp; @${e.admin} &nbsp;·&nbsp; ${ACTION_LABELS[e.action] ?? e.action}${e.target ? ` &nbsp;·&nbsp; ${fmtTarget(e.target)}` : ""}
          </div>`).join("")}
      </div>`
    : "";

  const upgradeBlock = upgradeEvents.length > 0
    ? `<div style="margin-bottom:20px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;padding:14px 16px;">
        <div style="color:#34d399;font-weight:700;font-size:13px;margin-bottom:8px;">⭐ Pro upgrades today (${upgradeEvents.length})</div>
        ${upgradeEvents.sort((a, b) => b.ts - a.ts).map(e => {
          const [user, ...rest] = (e.target ?? "").split(":");
          const sourceKey = e.admin; // "stripe" | "voucher" | "survey"
          const sourceLabel = UPGRADE_SOURCE_LABELS[sourceKey] ?? sourceKey;
          const detail = rest.join(":"); // e.g. "subscription" or "KRYPTOS-XXXX-XXXX:30d"
          return `<div style="font-size:12px;color:#6ee7b7;margin-bottom:4px;font-family:'Courier New',monospace;">
            ${fmtTime(e.ts)} &nbsp;·&nbsp; ${user} &nbsp;·&nbsp; <span style="color:#34d399;">${sourceLabel}</span>${detail ? ` &nbsp;·&nbsp; ${detail}` : ""}
          </div>`;
        }).join("")}
      </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04080f;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04080f;padding:32px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#0d1117;border:1px solid rgba(34,211,238,0.15);border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,rgba(34,211,238,0.07),rgba(99,102,241,0.07));padding:24px 28px 18px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:18px;font-weight:900;color:#ffffff;">🛡️ Kryptós <span style="color:#22d3ee;">CronOS</span></div>
            <div style="font-size:11px;color:rgba(34,211,238,0.5);letter-spacing:3px;text-transform:uppercase;margin-top:3px;">Admin Activity Digest</div>
            <div style="font-size:12px;color:rgba(156,163,175,0.6);margin-top:6px;">${dateStr} · 24-hour period ending ${periodEnd.toISOString().slice(0, 16).replace("T", " ")} UTC</div>
          </td>
        </tr>

        <!-- Summary stats -->
        <tr>
          <td style="padding:16px 28px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;margin-bottom:20px;">
              <tr>
                <td align="center" style="padding:14px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:24px;font-weight:900;color:${summaryColor};">${totalActions}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Total Actions</div>
                </td>
                <td align="center" style="padding:14px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:24px;font-weight:900;color:#a78bfa;">${uniqueAdmins}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Active Admins</div>
                </td>
                <td align="center" style="padding:14px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:24px;font-weight:900;color:#34d399;">${upgradeEvents.length}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Pro Upgrades</div>
                </td>
                <td align="center" style="padding:14px 8px;">
                  <div style="font-size:24px;font-weight:900;color:${sensitiveActions.length > 0 ? "#f97316" : "#4ade80"};">${sensitiveActions.length}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Sensitive</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Pro upgrades (if any) -->
        ${upgradeEvents.length > 0 ? `<tr><td style="padding:0 28px;">${upgradeBlock}</td></tr>` : ""}

        <!-- Sensitive alert (if any) -->
        ${sensitiveActions.length > 0 ? `<tr><td style="padding:0 28px;">${sensitiveBlock}</td></tr>` : ""}

        <!-- Per-admin sections -->
        <tr>
          <td style="padding:0 28px 24px;">
            ${noActivityBlock}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:14px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:11px;color:rgba(75,85,99,0.8);">
              Sent by Kryptós CronOS audit system · kryptoscronos.com/admin#audit ·
              Full log available in admin dashboard
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  // Vercel Cron passes Authorization: Bearer {CRON_SECRET}
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;

  // Read newest-first list; stop early once entries are outside window
  const raw = await redis.lrange("audit:log", 0, 999) as string[];
  const entries: AuditEntry[] = raw
    .map(e => { try { return JSON.parse(e) as AuditEntry; } catch { return null; } })
    .filter((e): e is AuditEntry => e !== null && e.ts >= cutoff);

  const byAdmin = new Map<string, AuditEntry[]>();
  for (const entry of entries) {
    if (!byAdmin.has(entry.admin)) byAdmin.set(entry.admin, []);
    byAdmin.get(entry.admin)!.push(entry);
  }

  const periodEnd = new Date(now);
  const dateStr = periodEnd.toLocaleDateString("en-US", {
    timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const html = buildHtml(entries, byAdmin, dateStr, periodEnd);
  const sensitiveCount = entries.filter(e => SENSITIVE.has(e.action)).length;
  const upgradeCount = entries.filter(e => e.action === "upgrade-pro").length;
  const subject = entries.length === 0
    ? `Admin Digest — ${dateStr} — No activity`
    : [
        `Admin Digest — ${dateStr}`,
        upgradeCount > 0 ? `${upgradeCount} Pro upgrade${upgradeCount !== 1 ? "s" : ""} ⭐` : null,
        sensitiveCount > 0 ? `${sensitiveCount} sensitive ⚠️` : null,
        `${entries.length} total`,
      ].filter(Boolean).join(" · ");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Kryptós CronOS <noreply@kryptoscronos.com>",
      to: ["hello@kryptoscronos.com"],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "unknown");
    return NextResponse.json({ error: "Resend failed", detail: err }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    period: dateStr,
    totalActions: entries.length,
    sensitiveActions: sensitiveCount,
    activeAdmins: byAdmin.size,
  });
}
