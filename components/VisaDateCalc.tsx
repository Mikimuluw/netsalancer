"use client";

import { useState, useMemo } from "react";

const COUNTRIES = ["USA", "Canada", "UK", "Germany"] as const;

const MONTHS_REQUIRED: Record<string, number> = {
  USA: 7,
  Canada: 7,
  UK: 4,
  Germany: 4,
};

const BANK_MONTHS: Record<string, number> = {
  USA: 6,
  Canada: 6,
  UK: 3,
  Germany: 3,
};

type TimelineItem = {
  label: string;
  timing: string;
  isFuture: boolean;
};

function addMonths(date: Date, m: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + m);
  return d;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function fmtMonthYear(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getTimeline(country: string, today: Date): TimelineItem[] {
  const bankMo = BANK_MONTHS[country];
  const bankDate = addMonths(today, bankMo);

  const items: TimelineItem[] = [
    {
      label: "Bank statements ready",
      timing: fmtMonthYear(bankDate),
      isFuture: true,
    },
    {
      label: "Proof of business (freelance documentation)",
      timing: "Available immediately \u2014 start documenting now",
      isFuture: false,
    },
    {
      label: "Verifiable income proof",
      timing: fmtMonthYear(bankDate),
      isFuture: true,
    },
  ];

  if (country === "USA" || country === "Canada") {
    items.push({
      label: "Property / asset ownership (optional \u2014 reduces overstay risk)",
      timing: "If applicable",
      isFuture: false,
    });
  }

  return items;
}

export default function VisaDateCalc() {
  const [country, setCountry] = useState<string>("USA");

  const today = useMemo(() => new Date(), []);
  const visaDate = useMemo(
    () => addMonths(today, MONTHS_REQUIRED[country]),
    [today, country]
  );
  const timeline = useMemo(
    () => getTimeline(country, today),
    [today, country]
  );

  return (
    <div>
      <p className="calc-note">
        If you open your FX retention account today, here&apos;s when
        you&apos;ll have enough bank statement history to apply for each
        country&apos;s visa.
      </p>

      <div className="country-row">
        {COUNTRIES.map((c) => (
          <button
            key={c}
            className={`c-btn ${country === c ? "on" : ""}`}
            onClick={() => setCountry(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="visa-date-display">
        <span className="vd-label">
          EARLIEST {country} VISA APPLICATION DATE
        </span>
        <span className="vd-date">{fmtDate(visaDate)}</span>
        <span className="vd-sub">
          Based on {BANK_MONTHS[country]}-month bank statement requirement +
          processing time
        </span>
      </div>

      <div className="vd-timeline">
        {timeline.map((item) => (
          <div className="vd-item" key={item.label}>
            <p className="vd-item-label">{item.label}</p>
            <p className={`vd-item-timing ${item.isFuture ? "vd-future" : ""}`}>
              {item.timing}
            </p>
          </div>
        ))}
      </div>

      <p className="vd-delay">
        Every month you delay opening an FX account is a month added to this
        date.
      </p>
    </div>
  );
}
