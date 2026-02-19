"use client";

import React, { useState } from "react";
import { toGeezNumerals, GEEZ_LABELS } from "@/lib/geez-numerals";

interface BigNumberProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  showToggle?: boolean;
  locale?: "en" | "am";
}

export function BigNumber({
  value,
  prefix,
  suffix,
  showToggle = false,
  locale = "en",
}: BigNumberProps) {
  const [useGeez, setUseGeez] = useState(false);

  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;
  const geezValue = toGeezNumerals(formattedValue.replace(/,/g, ""));

  const displayValue = useGeez ? geezValue : formattedValue;

  return (
    <div className="flex flex-col items-start">
      {showToggle && (
        <button
          onClick={() => setUseGeez(!useGeez)}
          className="numeral-toggle mb-4"
        >
          <span className={!useGeez ? "active" : ""}>123</span>
          <span className={useGeez ? "active" : ""}>፩፪፫</span>
        </button>
      )}
      <div className="big-number">
        {prefix && <span className="text-sm mr-2">{prefix}</span>}
        <span className={useGeez ? "geez-numeral" : ""}>{displayValue}</span>
        {suffix && <span className="text-sm ml-2">{suffix}</span>}
      </div>
    </div>
  );
}

interface NumeralToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labels?: { latin: string; geez: string };
}

export function NumeralToggle({
  value,
  onChange,
  labels = { latin: "1,234", geez: "፩፪፫፬" },
}: NumeralToggleProps) {
  return (
    <div className="numeral-toggle">
      <span
        className={!value ? "active" : ""}
        onClick={() => onChange(false)}
      >
        {labels.latin}
      </span>
      <span className={value ? "active" : ""} onClick={() => onChange(true)}>
        {labels.geez}
      </span>
    </div>
  );
}

interface BilingualHeaderProps {
  english: string;
  amharic: string;
  level?: "h1" | "h2" | "h3" | "h4";
}

export function BilingualHeader({
  english,
  amharic,
  level = "h2",
}: BilingualHeaderProps) {
  const Tag = level as any;

  return (
    <div className="mb-6">
      <Tag className="font-bold text-teff-900">{english}</Tag>
      <p className="amharic-accent">{amharic}</p>
    </div>
  );
}

interface AmharicLabelProps {
  english: string;
  amharic?: string;
  translationKey?: keyof typeof GEEZ_LABELS;
  showBoth?: boolean;
}

export function AmharicLabel({
  english,
  amharic,
  translationKey,
  showBoth = true,
}: AmharicLabelProps) {
  const displayAmharic = amharic || (translationKey && GEEZ_LABELS[translationKey]);

  return (
    <div>
      <p className="text-sm font-medium text-teff-700">{english}</p>
      {showBoth && displayAmharic && (
        <p className="text-xs text-teff-600 amharic-accent">{displayAmharic}</p>
      )}
    </div>
  );
}

/**
 * Ethiopian Calendar Date Display
 * Shows both Gregorian and Ethiopian dates
 */
export function EthiopianDate() {
  const [ethiopianDate] = React.useState<string>(() => {
    // Ethiopian calendar calculation
    // Ethiopian year = Gregorian year - 8 or - 7 (depending on date)
    const now = new Date();
    const gregorianYear = now.getFullYear();
    const month = now.getMonth(); // 0-11
    const date = now.getDate();

    let ethiopianYear = gregorianYear - 8;
    if (month < 8) {
      ethiopianYear = gregorianYear - 9; // Before September uses -9
    }

    // Ethiopian months (1-13, with 13 being a short month)
    const ethMonths = [
      "ጃንዋሪ",
      "ፌብርዋሪ",
      "ማርች",
      "ኤፕሪል",
      "ሜይ",
      "ጁን",
      "ጁላይ",
      "ኦገስት",
      "ሴፕቴምበር",
      "ኦክቶበር",
      "ኖቬምበር",
      "ዲሴምበር",
      "ጳጉሜ",
    ];

    let ethiopianMonth = month - 7;
    if (ethiopianMonth < 1) ethiopianMonth += 13;

    // Simple date calculation - would need more precision for production
    const ethMonth = ethMonths[ethiopianMonth - 1];

    return `${ethMonth} ${date}, ${ethiopianYear}`;
  });

  const gregorianDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-xs text-teff-600 space-y-1">
      <p>{gregorianDate}</p>
      <p className="amharic-accent">{ethiopianDate}</p>
    </div>
  );
}
