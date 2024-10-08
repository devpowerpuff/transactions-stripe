"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [amount, setAmount] = useState<number | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [underwritingDetailsId, setUnderwritingDetailsId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const premiumAmount = queryParams.get("premium");

    const underwritingDetailsId = queryParams.get("underwritingDetailsId");
    const quoteId = queryParams.get("quoteId");

    if (premiumAmount) {
      setAmount(parseInt(premiumAmount, 10));
    }
    if (underwritingDetailsId) {
      setUnderwritingDetailsId(underwritingDetailsId);
    }
    if (quoteId) {
      setQuoteId(quoteId);
    }
  }, []);

  if (amount === null || underwritingDetailsId === null || quoteId === null) {
    return <Loading />;
  }

  return (
    <main className="home-container">
      <div className="home-content">
        <h1 className="home-title">Premium</h1>
        <h2 className="home-subtitle">
          <span className="home-amount"> ${amount} </span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage
          amount={amount}
          underwritingDetailsId={underwritingDetailsId}
          quoteId={quoteId}
        />
      </Elements>
    </main>
  );
}
