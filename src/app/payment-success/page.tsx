"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return (
    <main className="payment-success-container">
      <div className="content">
        <h1 className="title">Thank you!</h1>
        <h2 className="subtitle">You successfully sent</h2>
        <div className="amount">${amount}</div>
      </div>
    </main>
  );
}
