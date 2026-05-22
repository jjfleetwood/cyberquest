import { redis } from "@/lib/redis";
import { stages, epochs } from "@/data/stages";
import { checkStageMilestones, checkXpMilestones, checkStreakMilestones } from "@/data/milestone-badges";
import type { UserProgress } from "@/lib/progress";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function sendStageCompletionEmail(opts: {
  username: string;
  email: string;
  stageName: string;
  stageSubtitle: string;
  epochName: string;
  coinsEarned: number;
  totalCoins: number;
  totalStages: number;
  streak: number;
  badgeName?: string;
  badgeEmoji?: string;
  nextStageId?: string;
  nextStageName?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const appUrl = process.env.APP_URL ?? "https://app-jjfleetwood.vercel.app";
  if (!apiKey) return;

  const {
    username, email, stageName, stageSubtitle, epochName,
    coinsEarned, totalCoins, totalStages, streak,
    badgeName, badgeEmoji, nextStageId, nextStageName,
  } = opts;

  const safe = (s: string) => escapeHtml(s);
  const nextStageUrl = nextStageId ? `${appUrl}/stages/${nextStageId}` : `${appUrl}/stages`;
  const nextLabel = nextStageName ? safe(nextStageName) : "Continue Training";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Kryptós CronOS <noreply@kryptoscronos.com>",
      to: [email],
      subject: `🏁 ${safe(username)} captured the flag — ${safe(stageName)}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04080f;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04080f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0d1117;border:1px solid rgba(34,211,238,0.2);border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(99,102,241,0.08));padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
              🛡️ Kryptós <span style="color:#22d3ee;">CronOS</span>
            </div>
            <div style="font-size:11px;color:rgba(74,222,128,0.7);letter-spacing:3px;text-transform:uppercase;margin-top:4px;">
              ✓ Flag Captured
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">

            <!-- Stage badge -->
            <div style="background:#080d1a;border:1px solid rgba(74,222,128,0.25);border-radius:10px;padding:20px 24px;margin-bottom:28px;">
              <div style="font-size:11px;color:rgba(74,222,128,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">${safe(epochName)}</div>
              <div style="font-size:20px;font-weight:900;color:#ffffff;margin-bottom:4px;">${safe(stageName)}</div>
              <div style="font-size:12px;color:rgba(107,114,128,1);">${safe(stageSubtitle)}</div>
              <div style="margin-top:16px;font-size:24px;font-weight:900;color:#22d3ee;">+${coinsEarned} 🪙</div>
            </div>

            <!-- Stats row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;">
              <tr>
                <td align="center" style="padding:14px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:20px;font-weight:900;color:#22d3ee;">${totalCoins}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Total 🪙</div>
                </td>
                <td align="center" style="padding:14px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:20px;font-weight:900;color:#a78bfa;">${totalStages}</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Stages</div>
                </td>
                <td align="center" style="padding:14px 8px;">
                  <div style="font-size:20px;font-weight:900;color:${streak >= 7 ? "#fb923c" : "#facc15"};">${streak}🔥</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Day Streak</div>
                </td>
              </tr>
            </table>

            ${badgeName ? `
            <!-- Badge unlocked -->
            <div style="background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.2);border-radius:8px;padding:14px 20px;margin-bottom:28px;">
              <div style="font-size:11px;color:rgba(250,204,21,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Badge Unlocked</div>
              <div style="font-size:16px;font-weight:900;color:#facc15;">${badgeEmoji ?? "🏅"} ${safe(badgeName)}</div>
            </div>
            ` : ""}

            <!-- Next stage CTA -->
            <p style="margin:0 0 16px;font-size:13px;color:rgba(156,163,175,0.9);line-height:1.7;">
              ${nextStageName ? `Your next challenge is ready: <strong style="color:#ffffff;">${safe(nextStageName)}</strong>` : "The stage map is waiting — keep the streak alive."}
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 12px;">
              <tr>
                <td style="background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:8px;padding:1px;">
                  <a href="${nextStageUrl}"
                     style="display:block;padding:12px 24px;background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:7px;font-size:13px;font-weight:900;color:#000000;text-decoration:none;">
                    ${nextLabel} →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:14px 32px 20px;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="margin:0;font-size:11px;color:rgba(55,65,81,1);">
              © 2026 Kryptós CronOS ·
              <a href="${appUrl}/leaderboard" style="color:rgba(75,85,99,1);">Leaderboard</a> ·
              <a href="${appUrl}/stages" style="color:rgba(75,85,99,1);">Stage Map</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }),
  }).catch(() => {});
}

function stageXp(stageId: string): number {
  return stages.find((s) => s.id === stageId)?.xp ?? 0;
}

function getDayKey(): string {
  return `lb:d:${new Date().toISOString().slice(0, 10)}`;
}

function getWeekKey(): string {
  const d = new Date();
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), diff));
  return `lb:w:${monday.toISOString().slice(0, 10)}`;
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Awards a stage in Redis for a verified user. XP is computed server-side.
 * Idempotent — calling twice for the same stage has no effect on XP.
 * timePenaltyXp is accumulated only once per new stage completion.
 */
export async function awardStageInRedis(
  username: string,
  stageId: string,
  badgeId?: string,
  timePenaltyXp = 0
): Promise<UserProgress> {
  const key = `progress:${username.toLowerCase()}`;
  const streakKey = `streak:${username.toLowerCase()}`;

  const [data, streakData] = await Promise.all([
    redis.hgetall(key),
    redis.hgetall(streakKey),
  ]);

  function parseArr(val: unknown): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val as string[];
    const s = String(val);
    try { const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch { return s.split(",").filter(Boolean); }
  }

  const completedStages: string[] = parseArr(data?.stages);
  const badges: string[] = parseArr(data?.badges);

  const isNew = !completedStages.includes(stageId);

  if (isNew) {
    completedStages.push(stageId);
  }
  if (badgeId && !badges.includes(badgeId)) {
    badges.push(badgeId);
  }

  const baseCoins = completedStages.reduce((sum, id) => sum + stageXp(id), 0);
  const storedPenalty = Number(data?.penalty ?? 0);
  const newPenalty = isNew ? storedPenalty + timePenaltyXp : storedPenalty;
  const coins = Math.max(0, baseCoins - newPenalty);
  // coinsSpent is never modified by stage awards — only the shop route touches it
  const coinsSpent = Number(data?.coinsSpent ?? 0);

  // ── Streak tracking ──
  const today = todayUTC();
  const yesterday = yesterdayUTC();
  const lastDate = streakData?.lastDate ? String(streakData.lastDate) : null;
  let current = Number(streakData?.current ?? 0);
  let longest = Number(streakData?.longest ?? 0);

  if (lastDate === today) {
    // Already counted today — no change
  } else if (lastDate === yesterday) {
    current += 1;
  } else {
    current = 1;
  }
  if (current > longest) longest = current;

  // ── Milestone badges ──
  const stageMilestones = checkStageMilestones(completedStages.length);
  const xpMilestones = checkXpMilestones(coins);
  const streakMilestones = checkStreakMilestones(current);

  for (const id of [...stageMilestones, ...xpMilestones, ...streakMilestones]) {
    if (!badges.includes(id)) badges.push(id);
  }

  await Promise.all([
    redis.hset(key, {
      coins,
      stages: JSON.stringify(completedStages),
      badges: JSON.stringify(badges),
      lastActive: Date.now(),
      penalty: newPenalty,
    }),
    redis.hset(streakKey, {
      current,
      longest,
      lastDate: today,
    }),
  ]);

  // All-time leaderboard (ranked by total coins earned, not spendable balance)
  await redis.zadd("leaderboard", { score: coins, member: username.toLowerCase() });

  // Daily and weekly leaderboards — only update on new stage completion
  if (isNew) {
    const deltaCoins = stageXp(stageId) - timePenaltyXp;
    if (deltaCoins > 0) {
      const dayKey = getDayKey();
      const weekKey = getWeekKey();
      await redis.zincrby(dayKey, deltaCoins, username.toLowerCase());
      await redis.expire(dayKey, 172800); // 48h TTL
      await redis.zincrby(weekKey, deltaCoins, username.toLowerCase());
      await redis.expire(weekKey, 1209600); // 14 day TTL
    }
  }

  // Fire-and-forget stage completion email (only for new completions)
  if (isNew) {
    const stageObj = stages.find((s) => s.id === stageId);
    if (stageObj) {
      redis.hget(`user:${username.toLowerCase()}`, "email").then((emailVal) => {
        if (!emailVal) return;
        const epoch = epochs.find((e) => e.id === stageObj.epochId);
        const epochStages = stages
          .filter((s) => s.epochId === stageObj.epochId)
          .sort((a, b) => a.order - b.order);
        const nextStage = epochStages.find((s) => s.order > stageObj.order);
        const isNewBadge = badgeId && !parseArr(data?.badges).includes(badgeId);
        sendStageCompletionEmail({
          username: username.toLowerCase(),
          email: String(emailVal),
          stageName: stageObj.title,
          stageSubtitle: stageObj.subtitle,
          epochName: epoch?.name ?? stageObj.epochId,
          coinsEarned: stageObj.xp - timePenaltyXp,
          totalCoins: coins,
          totalStages: completedStages.length,
          streak: current,
          badgeName: isNewBadge ? stageObj.badge.name : undefined,
          badgeEmoji: isNewBadge ? stageObj.badge.emoji : undefined,
          nextStageId: nextStage?.id,
          nextStageName: nextStage?.title,
        }).catch(() => {});
      }).catch(() => {});
    }
  }

  return { coins, coinsSpent, completedStages, badges, streak: current };
}
