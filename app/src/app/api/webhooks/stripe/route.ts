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
      await redis.hset(`user:${username.toLowerCase()}`, {
        tier: "pro",
        stripeCustomerId: session.customer ?? "",
        stripeSubscriptionId: session.subscription ?? "",
      });
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
