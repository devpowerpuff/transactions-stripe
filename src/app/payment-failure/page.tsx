"use client";

import React from "react";

export default function PaymentFailure() {
  return (
    <main className="payment-failure-container">
      <div className="content">
        <h1 className="title">Payment Failed</h1>
        <h2 className="subtitle">
          Unfortunately, your payment could not be processed at this time.
        </h2>
        <p>Please try again later or contact support if the issue persists.</p>
      </div>
    </main>
  );
}
