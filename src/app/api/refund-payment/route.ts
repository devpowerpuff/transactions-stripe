import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { updatePolicyStatus } from "./action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { policyId, amount, reason, note, charge } = await req.json();
    const refund = await stripe.refunds.create({
      amount: parseFloat(amount) * 100,
      reason: reason !== "select" ? reason : undefined,
      payment_intent: charge,
      metadata: { note },
    });

    await updatePolicyStatus(policyId, "refunded");

    return NextResponse.json({ success: true, refund }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
