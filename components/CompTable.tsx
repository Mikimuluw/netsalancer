"use client";

import { useRate } from "./RateProvider";

export default function CompTable() {
  const { rate, blackMarketRate, effectiveRate, loading } = useRate();

  const bankDisplay = loading ? "..." : `${rate} ETB/USD`;
  const blackDisplay = loading ? "..." : `${blackMarketRate} ETB/USD`;
  const agentFee = loading ? "..." : `−10% (−${(blackMarketRate * 0.1).toFixed(1)} ETB)`;
  const effectiveDisplay = loading ? "..." : `~${effectiveRate} ETB/USD`;

  const ROWS = [
    { label: "Exchange Rate", informal: blackDisplay, fxd: bankDisplay },
    { label: "Agent / Processing Fee", informal: agentFee, fxd: "0%", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "★ Effective Rate", informal: effectiveDisplay, fxd: bankDisplay, fxdClass: "v-hi", highlight: true },
    { label: "International Visa/Mastercard", informal: "No", fxd: "Yes", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Proof of Income / Bank Statements", informal: "No", fxd: "Yes", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Volume Limit", informal: "~$2,000/month", fxd: "Unlimited", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Legal Status", informal: "No", fxd: "Yes", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Enterprise / Fortune 500 Clients", informal: "No", fxd: "Yes", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Visa Applications", informal: "No", fxd: "Yes", infClass: "v-neg", fxdClass: "v-pos" },
    { label: "Scaling Potential", informal: "Capped", fxd: "Unlimited", infClass: "v-neg", fxdClass: "v-pos" },
  ];

  return (
    <section id="compare">
      <div className="w">
        <span className="eyebrow">Art. 03 — The Full Picture</span>
        <h2 className="sec-h">You think informal gives<br />you a better rate.</h2>
        <span className="sec-am">ኢ-መደበኛ ሰርጦች የተሻለ ምንዛሪ ይሰጣሉ ብለው ያስባሉ</span>
        <p className="sec-body">After the agent&apos;s 10% cut, the effective rates are nearly identical. But one route comes with everything else.</p>
      </div>
      <div className="ww">
        <div className="table-scroll">
        <table className="comp-table">
          <thead>
            <tr>
              <th className="th-row"></th>
              <th className="th-inf">INFORMAL / HAWALA<br /><span style={{ fontSize: "9px", opacity: 0.45 }}>the current way</span></th>
              <th className="th-fxd">FXD/04/2026<span className="th-fxd-sub">official bank route</span></th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className={r.highlight ? "row-hl" : ""}>
                <td className="td-row">{r.label}</td>
                <td className={`td-inf ${r.infClass || ""}`}>{r.informal}</td>
                <td className={`td-fxd ${r.fxdClass || ""}`}>{r.fxd}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="bottom-line">
          <p>For the <strong>same effective rate</strong>, you get international cards, legal protection, bank statements, visa eligibility, and a real path to growth.</p>
          <p className="bl-math">~{effectiveRate} ETB/USD <span className="eq">=</span> {rate} ETB/USD <span style={{ fontSize: "11px", color: "var(--text-ghost)" }}> (same money. infinite more benefits.)</span></p>
          <div className="share-row">
            <span className="share-label">Share →</span>
            <a href="https://wa.me/?text=Ethiopian%20freelancers%3A%20the%20informal%20rate%20isn%E2%80%99t%20better%20after%20agent%20fees.%20See%20the%20real%20math%20%E2%86%92%20netsalance.info" target="_blank" rel="noopener noreferrer" className="share-btn primary">WhatsApp</a>
            <a href="https://t.me/share/url?url=https%3A%2F%2Fnetsalance.info&text=Ethiopian%20freelancers%3A%20the%20informal%20rate%20isn%E2%80%99t%20better%20after%20agent%20fees.%20See%20the%20real%20math." target="_blank" rel="noopener noreferrer" className="share-btn">Telegram</a>
            <a href="https://twitter.com/intent/tweet?text=Ethiopian%20freelancers%3A%20the%20informal%20rate%20isn%E2%80%99t%20better%20after%20agent%20fees.%20See%20the%20real%20math%20%E2%86%92%20netsalance.info" target="_blank" rel="noopener noreferrer" className="share-btn">X / Twitter</a>
          </div>
          <a href="#waitlist" className="micro-cta">Join 247 freelancers on the waitlist →</a>
        </div>
      </div>
    </section>
  );
}
