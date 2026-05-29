import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "@/lib/server-session";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Billing not configured." }, { status: 503 });
  }
  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

  const PRICE_IDS: Record<string, string | undefined> = {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
  };

  const username = getServerSession(req);
  if (!username) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as { plan?: string } | null;
  const plan = body?.plan === "yearly" ? "yearly" : "monthly";
  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Price not configured." }, { status: 503 });
  }

  const email = await redis.hget(`user:${username}`, "email") as string | null;
  const rawOrigin = req.headers.get("origin") ?? "";
  const ALLOWED_ORIGINS = ["https://kryptoscronos.com", "http://localhost:3000"];
  const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : "https://kryptoscronos.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email ?? undefined,
      metadata: { username },
      success_url: `${origin}/stages?upgraded=1`,
      cancel_url: `${origin}/stages`,
      subscription_data: { metadata: { username } },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    console.error("[stripe/checkout]", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
