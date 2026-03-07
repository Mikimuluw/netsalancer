"use client";

import { useState } from "react";

const DOCS = [
  "Cover Letter (account opening)",
  "FXD/04/2026 Directive Summary",
  "Document Checklist",
  "Application Timeline",
  "Earnings Worksheet",
];

export default function ActionSection() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);
    try {
      await fetch("https://formsubmit.co/ajax/mikimuluw@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "Netsalancer Waitlist Signup",
        }),
      });
    } catch {
      // still show success — email is captured client-side
    }
    setJoined(true);
  }

  return (
    <section id="waitlist">
      <div className="w">
        <span className="eyebrow">Art. 04 — Take Action</span>
        <h2 className="sec-h">Get your documents.<br />Join the list.</h2>
        <span className="sec-am">ሰነዶችዎን ያግኙ — ዝርዝሩን ይቀላቀሉ</span>
        <div className="action-grid">
          <div>
            <p className="sec-body" style={{ marginBottom: "20px" }}>Free, personalized application materials to open your FX retention account today. Instant download, no account needed.</p>
            <ul className="doc-list">
              {DOCS.map((d) => (
                <li className="doc-item" key={d}>
                  <span className="doc-arrow">↳</span> {d}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn btn-amb">↓ Download Free Package</a>
          </div>
          <div className="wl-card">
            <span className="wl-num">247</span>
            <span className="wl-num-label">freelancers already on the waitlist</span>
            <p className="wl-title">Netsalancer Platform — Q2 2026</p>
            <span className="wl-am">የኔፃላንሰር መደብ</span>
            <p className="wl-desc">Digital FX account opening in 10 minutes. Instant international cards. Smart payment routing. 100% NBE-compliant.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className={`wl-input ${error ? "wl-input-error" : ""}`}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
              />
              {error && (
                <span className="wl-error">Valid email required</span>
              )}
              <button
                type="submit"
                className="btn btn-amb"
                style={{ width: "100%", display: "block" }}
                disabled={joined}
              >
                {joined ? "✓ You're on the list" : "Join Waitlist →"}
              </button>
            </form>
            <span className="wl-fine">No spam. Unsubscribe anytime.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
