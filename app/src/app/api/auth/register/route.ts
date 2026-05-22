import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { hashPassword, generateSalt } from "@/lib/crypto-utils";
import { signSessionToken, sessionCookieOptions } from "@/lib/server-session";
import { createHmac } from "crypto";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:register:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as {
    username?: string; email?: string; password?: string;
  } | null;

  const username = body?.username?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";

  if (username.length < 3) return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (!email.includes("@") || !email.includes(".")) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const lower = username.toLowerCase();
  const existing = await redis.exists(`user:${lower}`);
  if (existing) {
    return NextResponse.json({ error: "Username is already taken.", taken: true }, { status: 409 });
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  await redis.hset(`user:${lower}`, {
    passwordHash,
    salt,
    email: escapeHtml(email),
    createdAt: Date.now(),
  });

  // Reverse lookup for forgot-password
  await redis.set(`email:${email}`, lower);

  const sessionToken = signSessionToken(lower);
  const res = NextResponse.json({ ok: true, username: lower, email });
  res.cookies.set("session_token", sessionToken, sessionCookieOptions());

  // Fire-and-forget welcome email
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const safeUsername = escapeHtml(lower);
    const safeEmail = escapeHtml(email);
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Kryptós CronOS <noreply@kryptoscronos.com>",
        to: [safeEmail],
        subject: "Welcome to Kryptós CronOS — your first stage is ready",
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04080f;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04080f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0d1117;border:1px solid rgba(34,211,238,0.2);border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(99,102,241,0.08));padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
              🛡️ Kryptós <span style="color:#22d3ee;">CronOS</span>
            </div>
            <div style="font-size:11px;color:rgba(34,211,238,0.5);letter-spacing:3px;text-transform:uppercase;margin-top:4px;">
              Agent Activated
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 8px;font-size:13px;color:rgba(34,211,238,0.6);letter-spacing:2px;text-transform:uppercase;">
              Welcome aboard
            </p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:900;color:#ffffff;line-height:1.2;">
              ${safeUsername}
            </h1>
            <p style="margin:0 0 24px;font-size:14px;color:rgba(156,163,175,0.9);line-height:1.7;">
              Your account is live. You now have access to 346 hands-on CTF stages covering
              real-world exploits — from SQL injection and Log4Shell to nation-state DNS ops,
              ArcaneDoor, and post-quantum cryptography.
            </p>

            <!-- Terminal preview block -->
            <div style="background:#080d1a;border:1px solid rgba(34,211,238,0.15);border-radius:8px;padding:16px 20px;margin:0 0 28px;">
              <div style="font-size:11px;color:rgba(34,211,238,0.4);margin-bottom:10px;">
                ● ● ●&nbsp;&nbsp;&nbsp;kryptos-cronos — bash
              </div>
              <div style="font-size:12px;line-height:1.8;">
                <span style="color:rgba(34,211,238,0.7);">❯ </span><span style="color:rgba(229,231,235,0.9);">ls stages/</span><br>
                <span style="color:rgba(134,239,172,0.8);">stage-01  stage-02  stage-03  ...</span><br>
                <span style="color:rgba(34,211,238,0.7);">❯ </span><span style="color:rgba(229,231,235,0.9);">cat stage-01/briefing.txt</span><br>
                <span style="color:rgba(250,204,21,0.8);">[BRIEFING] CIA Triad — Confidentiality, Integrity, Availability</span><br>
                <span style="color:rgba(34,211,238,0.7);">❯ </span><span style="color:rgba(229,231,235,0.9);">submit FLAG{_______}</span><br>
                <span style="color:rgba(74,222,128,1);">✓ Flag accepted. +100 🪙 · Badge unlocked.</span>
              </div>
            </div>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:8px;padding:1px;">
                  <a href="https://kryptoscronos.com/stages"
                     style="display:block;padding:13px 28px;background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:7px;font-size:14px;font-weight:900;color:#000000;text-decoration:none;letter-spacing:0.3px;">
                    Start Your First Stage →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Quick stats -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;">
              <tr>
                <td align="center" style="padding:16px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:22px;font-weight:900;color:#22d3ee;">346</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Stages</div>
                </td>
                <td align="center" style="padding:16px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:22px;font-weight:900;color:#a78bfa;">10</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Tracks</div>
                </td>
                <td align="center" style="padding:16px 8px;">
                  <div style="font-size:22px;font-weight:900;color:#4ade80;">25+</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Real CVEs</div>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;color:rgba(75,85,99,1);line-height:1.6;">
              Stuck on a challenge? Type <span style="color:#22d3ee;">hint</span> in the terminal to get
              a Socratic nudge from ARIA — our Claude-powered AI assistant.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="margin:0;font-size:11px;color:rgba(55,65,81,1);line-height:1.6;">
              © 2026 Kryptós CronOS (κρυπτός χρόνος) · Built for defenders ·
              <a href="https://kryptoscronos.com/privacy" style="color:rgba(75,85,99,1);">Privacy</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    }).catch(() => {}); // fire-and-forget, never block registration
  }

  // Grant admin cookie inline if eligible
  const adminUsername = process.env.ADMIN_USERNAME;
  const secret = process.env.ADMIN_SECRET;
  if (adminUsername && secret && lower === adminUsername.toLowerCase()) {
    const sig = createHmac("sha256", secret).update(lower).digest("hex");
    res.cookies.set("admin_token", `${lower}:${sig}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}
