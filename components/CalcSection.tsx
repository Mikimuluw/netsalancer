"use client";

import { useState } from "react";
import BorrowedCalc from "./BorrowedCalc";
import FailureCalc from "./FailureCalc";
import VisaDateCalc from "./VisaDateCalc";

const TABS = [
  { id: "sp", label: "01 Borrowed" },
  { id: "er", label: "02 Failure" },
  { id: "vs", label: "03 Visa Date" },
];

export default function CalcSection() {
  const [active, setActive] = useState("sp");

  return (
    <section id="calc">
      <div className="w">
        <span className="eyebrow">Art. 02 — Calculators</span>
        <h2 className="sec-h">Your numbers.<br />Your decision.</h2>
        <span className="sec-am">የእርስዎ ቁጥሮች</span>
        <p className="sec-body">Formal rate: 155 ETB/USD, 0% fees. After a hawala agent&apos;s 10% cut, informal nets ~157 ETB/USD. That 2-birr gap is what you&apos;re trading for everything below.</p>

        <div className="calc-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              className={`tab ${active === t.id ? "on" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className={`calc-panel ${active === "sp" ? "on" : ""}`}
          id="panel-sp"
          role="tabpanel"
          aria-labelledby="tab-sp"
        >
          <BorrowedCalc />
        </div>
        <div
          className={`calc-panel ${active === "er" ? "on" : ""}`}
          id="panel-er"
          role="tabpanel"
          aria-labelledby="tab-er"
        >
          <FailureCalc />
        </div>
        <div
          className={`calc-panel ${active === "vs" ? "on" : ""}`}
          id="panel-vs"
          role="tabpanel"
          aria-labelledby="tab-vs"
        >
          <VisaDateCalc />
        </div>
      </div>
    </section>
  );
}
