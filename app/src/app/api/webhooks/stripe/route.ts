import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !sig || !secret) {
    return NextResponse.json({ error: "Missing configuration." }, { status: 400 });
  }
  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const username = session.metadata?.username;
    if (username) {
      const lower = username.toLowerCase();
      await redis.hset(`user:${lower}`, {
        tier: "pro",
        stripeCustomerId: session.customer ?? "",
        stripeSubscriptionId: session.subscription ?? "",
        voucherExpiry: "", // clear any prior voucher expiry so Stripe Pro isn't auto-downgraded
      });

      // Pro welcome email — fire-and-forget
      const apiKey = process.env.RESEND_API_KEY;
      const email = session.customer_email ?? (await redis.hget(`user:${lower}`, "email") as string | null);
      if (apiKey && email) {
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Kryptós CronOS <noreply@kryptoscronos.com>",
            to: [email],
            subject: "You're now Pro — all 438 stages unlocked",
            html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04080f;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04080f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0d1117;border:1px solid rgba(34,211,238,0.2);border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(99,102,241,0.08));padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:22px;font-weight:900;color:#ffffff;">🛡️ Kryptós <span style="color:#22d3ee;">CronOS</span></div>
            <div style="font-size:11px;color:rgba(34,211,238,0.5);letter-spacing:3px;text-transform:uppercase;margin-top:4px;">Pro Activated</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 8px;font-size:13px;color:rgba(34,211,238,0.6);letter-spacing:2px;text-transform:uppercase;">Payment confirmed</p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:900;color:#ffffff;line-height:1.2;">You're Pro. Every stage is yours.</h1>
            <p style="margin:0 0 24px;font-size:14px;color:rgba(156,163,175,0.9);line-height:1.7;">
              All 438 stages across 36 epochs are now unlocked. Unlimited ARIA AI hints.
              No paywalls. No waiting. Pick up exactly where you left off.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:8px;padding:1px;">
                  <a href="https://kryptoscronos.com/stages"
                     style="display:block;padding:13px 28px;background:linear-gradient(90deg,#22d3ee,#818cf8,#6366f1);border-radius:7px;font-size:14px;font-weight:900;color:#000000;text-decoration:none;">
                    Continue Learning →
                  </a>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;">
              <tr>
                <td align="center" style="padding:16px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:22px;font-weight:900;color:#22d3ee;">438</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Stages</div>
                </td>
                <td align="center" style="padding:16px 8px;border-right:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:22px;font-weight:900;color:#a78bfa;">36</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Epochs</div>
                </td>
                <td align="center" style="padding:16px 8px;">
                  <div style="font-size:22px;font-weight:900;color:#4ade80;">∞</div>
                  <div style="font-size:10px;color:rgba(75,85,99,1);text-transform:uppercase;letter-spacing:1px;margin-top:2px;">ARIA Hints</div>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:12px;color:rgba(75,85,99,1);line-height:1.6;">
              Manage your subscription at any time via your Stripe billing portal. Questions? Reply to this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="margin:0;font-size:11px;color:rgba(55,65,81,1);line-height:1.6;">
              © 2026 Kryptós CronOS · Bolotin Enterprises, Inc. ·
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
        }).catch(() => {});
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const username = sub.metadata?.username;
    if (username) {
      await redis.hset(`user:${username.toLowerCase()}`, { tier: "free" });
    }
  }

  return NextResponse.json({ received: true });
}
