"use client";

import { useState } from "react";

const ROWS = [
  {
    situation: "Subscriptions requiring your identity (AWS, Stripe, Figma Teams)",
    paypal: "Blocked — account not yours",
    fxd: "All services",
  },
  {
    situation: "Services that don\u2019t accept PayPal (many SaaS)",
    paypal: "No path to pay",
    fxd: "Visa/Mastercard accepted everywhere",
  },
  {
    situation: "Day-to-day purchases in Addis",
    paypal: "Cash out through hawala only",
    fxd: "International card works locally",
  },
  {
    situation: "When you travel abroad",
    paypal: "Can\u2019t use someone else\u2019s card",
    fxd: "Your card, your name",
  },
  {
    situation: "If the account freezes",
    paypal: "Your income disappears overnight",
    fxd: "Your account, your control",
  },
  {
    situation: "Bank statements for visa / enterprise clients",
    paypal: "None in your name",
    fxd: "Full verifiable history",
  },
];

export default function BorrowedCalc() {
  const [income, setIncome] = useState(1500);
  const annual = income * 12;

  return (
    <div>
      <p className="calc-note">
        Every Ethiopian freelancer using a friend&apos;s PayPal is operating on
        borrowed infrastructure. Here&apos;s what that constraint costs you.
      </p>
      <div className="sl-block">
        <div className="sl-head">
          <span className="sl-name">Monthly USD Earnings</span>
          <span className="sl-val">${income.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={100}
          max={10000}
          step={50}
          value={income}
          onChange={(e) => setIncome(+e.target.value)}
        />
        <div className="sl-ends">
          <span>$100</span>
          <span>$10,000</span>
        </div>
      </div>

      <div className="constraint-table">
        <div className="ct-header">
          <span className="ct-h-sit">Situation</span>
          <span className="ct-h-col">Friend&apos;s PayPal</span>
          <span className="ct-h-col">Your FX Account</span>
        </div>
        {ROWS.map((r) => (
          <div className="ct-row" key={r.situation}>
            <span className="ct-sit">{r.situation}</span>
            <span className="ct-paypal">
              <span className="ct-icon ct-icon-x">✗</span> {r.paypal}
            </span>
            <span className="ct-fxd">
              <span className="ct-icon ct-icon-ok">✓</span> {r.fxd}
            </span>
          </div>
        ))}
      </div>

      <p className="ct-bottom">
        In 12 months, you will have earned{" "}
        <strong>${annual.toLocaleString()}</strong> in your friend&apos;s name.{" "}
        <span className="ct-highlight">Not yours.</span>
      </p>
    </div>
  );
}
