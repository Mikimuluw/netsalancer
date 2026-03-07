"use client";

import { useState } from "react";
import { useRate } from "./RateProvider";

const SHORT_DESCS: Record<string, string> = {
  split: "Payments split across people and dates. No paper trail.",
  freeze: "Platform freeze = entire balance locked, no appeals path.",
  identity: "Earnings don\u2019t exist in your name for visa, clients, or loans.",
  fees: "Agent fees buy you nothing: no legal protection, no history.",
};

type Status = {
  active: boolean;
  line: string;
  amount?: string;
  suffix?: string;
};

type Scenario = {
  id: string;
  title: string;
  getStatus: (e: number, y: number, l: number, r: number) => Status;
};

const SCENARIOS: Scenario[] = [
  {
    id: "split",
    title: "AGENT VOLUME LIMIT",
    getStatus: (e) => {
      if (e < 800)
        return { active: false, line: "Below the typical split threshold. Low exposure." };
      if (e < 2000)
        return { active: true, line: "At the threshold where agents start splitting. Risk is rising." };
      return { active: true, line: "Above the threshold. Payments are almost certainly being split." };
    },
  },
  {
    id: "freeze",
    title: "PAYPAL / PLATFORM FLAG",
    getStatus: (_e, _y, l) => {
      if (l < 500)
        return { active: false, line: "Single payments under $500 are below typical flag thresholds." };
      if (l < 1500)
        return { active: true, line: "Single payments at this level attract algorithmic scrutiny." };
      return { active: true, line: "Payments this size are in the high-flag zone for Ethiopian-origin accounts." };
    },
  },
  {
    id: "identity",
    title: "INCOME IN SOMEONE ELSE\u2019S NAME",
    getStatus: (e, y, _l, r) => {
      const total = e * y * 12;
      const etb = Math.round(total * r).toLocaleString();
      return {
        active: true,
        amount: `$${total.toLocaleString()}`,
        suffix: `(${etb} ETB) earned in your friend\u2019s name.`,
        line: "",
      };
    },
  },
  {
    id: "fees",
    title: "THE INFORMAL TAX",
    getStatus: (e, y, _l, r) => {
      const totalFees = Math.round(e * y * 12 * 0.1);
      const etb = Math.round(totalFees * r).toLocaleString();
      return {
        active: true,
        amount: `$${totalFees.toLocaleString()}`,
        suffix: `(${etb} ETB) paid in agent fees.`,
        line: "",
      };
    },
  },
];

export default function FailureCalc() {
  const [earnings, setEarnings] = useState(2000);
  const [years, setYears] = useState(2);
  const [largest, setLargest] = useState(1000);
  const { rate } = useRate();

  return (
    <div>
      <p className="calc-note">
        The risk isn&apos;t a score. It&apos;s specific failure modes that
        activate at your volume. Here&apos;s exactly how informal channels
        break.
      </p>
      <div className="sl-block">
        <div className="sl-head">
          <span className="sl-name">Monthly USD Earnings</span>
          <span className="sl-val">${earnings.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={100}
          max={30000}
          step={100}
          value={earnings}
          onChange={(e) => setEarnings(+e.target.value)}
        />
        <div className="sl-ends">
          <span>$100</span>
          <span>$30,000</span>
        </div>
      </div>
      <div className="sl-block">
        <div className="sl-head">
          <span className="sl-name">Years Freelancing Informally</span>
          <span className="sl-val">{years} yr</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={years}
          onChange={(e) => setYears(+e.target.value)}
        />
        <div className="sl-ends">
          <span>Just started</span>
          <span>10 years</span>
        </div>
      </div>
      <div className="sl-block">
        <div className="sl-head">
          <span className="sl-name">Largest Single Payment</span>
          <span className="sl-val">${largest.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={0}
          max={20000}
          step={500}
          value={largest}
          onChange={(e) => setLargest(+e.target.value)}
        />
        <div className="sl-ends">
          <span>$0</span>
          <span>$20,000</span>
        </div>
      </div>

      <div className="result-divider"><span>&mdash; RESULT &mdash;</span></div>

      <div className="result-panel">
        <span className="result-badge">LIVE RESULT</span>
        <div className="failure-cards">
          {SCENARIOS.map((s) => {
            const status = s.getStatus(earnings, years, largest, rate);
            return (
              <div
                key={s.id}
                className={`f-card ${status.active ? "f-card-on" : "f-card-off"}`}
              >
                <div className="f-head">
                  <span className="f-title">{s.title}</span>
                  <span className={`f-badge ${status.active ? "f-badge-on" : "f-badge-off"}`}>
                    {status.active ? "ACTIVE" : "LOW RISK"}
                  </span>
                </div>
                <p className={`f-verdict ${status.active ? "f-verdict-on" : ""}`}>
                  {status.amount ? (
                    <>
                      <span className="f-amount">{status.amount}</span>{" "}
                      {status.suffix}
                    </>
                  ) : (
                    status.line
                  )}
                </p>
                <p className="f-explain">{SHORT_DESCS[s.id]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
