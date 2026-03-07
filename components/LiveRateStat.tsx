"use client";

import { useRate } from "./RateProvider";

export default function LiveRateStat() {
  const { rate, loading } = useRate();
  const display = loading ? "— ETB" : `${rate.toFixed(2)} ETB`;

  return (
    <div className="stat">
      <span className="stat-val">{display}</span>
      <span className="stat-label">Per USD</span>
      <span className="stat-am">ዛሬ ዋጋ</span>
    </div>
  );
}
