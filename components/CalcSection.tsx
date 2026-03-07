"use client";

import { useState, useEffect } from "react";
import BorrowedCalc from "./BorrowedCalc";
import FailureCalc from "./FailureCalc";
import VisaDateCalc from "./VisaDateCalc";

const TABS = [
  { id: "sp", num: "01", name: "Borrowed", teaser: "What the PayPal workaround costs" },
  { id: "er", num: "02", name: "Failure", teaser: "Which risks apply at your volume" },
  { id: "vs", num: "03", name: "Visa Date", teaser: "Your exact application date" },
];

export default function CalcSection() {
  const [active, setActive] = useState("sp");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("netsalancer-tab-hint")) {
      setPulse(true);
      const t = setTimeout(() => {
        setPulse(false);
        localStorage.setItem("netsalancer-tab-hint", "1");
      }, 4500); // 3 pulses × 1.5s
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section id="calc">
      <div className="w">
        <span className="eyebrow">Art. 02 — Calculators</span>
        <h2 className="sec-h">Your numbers.<br />Your decision.</h2>
        <span className="sec-am">የእርስዎ ቁጥሮች</span>
        <p className="sec-body">Formal rate: 155 ETB/USD, 0% fees. After a hawala agent&apos;s 10% cut, informal nets ~157 ETB/USD. That 2-birr gap is what you&apos;re trading for everything below.</p>

        <div className="calc-tabs" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              className={`tab ${active === t.id ? "on" : ""} ${i === 1 && pulse ? "tab-pulse" : ""} ${i === TABS.length - 1 ? "tab-last" : ""}`}
              onClick={() => { setActive(t.id); setPulse(false); }}
            >
              <span className="tab-num">{t.num}</span>
              <span className="tab-name">{t.name}</span>
              <span className="tab-teaser">{t.teaser}</span>
              {active === t.id && <span className="tab-arrow" />}
            </button>
          ))}
        </div>

        <div className="calc-wrap">
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
      </div>
    </section>
  );
}
