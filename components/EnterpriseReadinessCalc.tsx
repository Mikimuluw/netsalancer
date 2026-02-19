"use client";

import { useState } from "react";
import { calculateEnterpriseReadiness, type RiskLevel } from "@/lib/calculators";
import { CheckCircle } from "lucide-react";

const riskConfig: Record<
  RiskLevel,
  { label: string; colorClass: string; bgClass: string; emoji: string }
> = {
  LOW: {
    label: "LOW RISK",
    colorClass: "text-green-600",
    bgClass: "bg-green-50 border-green-300",
    emoji: "🟢",
  },
  MEDIUM: {
    label: "MEDIUM RISK",
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50 border-yellow-300",
    emoji: "🟡",
  },
  HIGH: {
    label: "HIGH RISK",
    colorClass: "text-orange-600",
    bgClass: "bg-orange-50 border-orange-300",
    emoji: "🟠",
  },
  CRITICAL: {
    label: "CRITICAL RISK",
    colorClass: "text-red-600",
    bgClass: "bg-red-50 border-red-300",
    emoji: "🔴",
  },
};

export default function EnterpriseReadinessCalc() {
  const [monthlyUSD, setMonthlyUSD] = useState(2000);
  const [years, setYears] = useState(2);
  const [largestPayment, setLargestPayment] = useState(1000);
  const [clientCount, setClientCount] = useState(3);

  const result = calculateEnterpriseReadiness(
    monthlyUSD,
    years,
    largestPayment,
    clientCount
  );

  const config = riskConfig[result.riskLevel];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">
          🏆
        </div>
        <div>
          <h3 className="font-bold text-et-dark text-lg">
            Enterprise Readiness Score
          </h3>
          <p className="text-gray-500 text-sm">
            Are you too big for informal channels?
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-5 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Monthly USD Earnings
            </label>
            <span className="font-black text-et-green counter-display">
              ${monthlyUSD.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={20000}
            step={100}
            value={monthlyUSD}
            onChange={(e) => setMonthlyUSD(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #009639 0%, #009639 ${((monthlyUSD - 100) / 19900) * 100}%, #e5e7eb ${((monthlyUSD - 100) / 19900) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Years Freelancing
            </label>
            <span className="font-black text-et-green">{years} year{years !== 1 ? "s" : ""}</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #009639 0%, #009639 ${(years / 15) * 100}%, #e5e7eb ${(years / 15) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Largest Single Payment
            </label>
            <span className="font-black text-et-green counter-display">
              ${largestPayment.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={50000}
            step={500}
            value={largestPayment}
            onChange={(e) => setLargestPayment(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #009639 0%, #009639 ${((largestPayment - 100) / 49900) * 100}%, #e5e7eb ${((largestPayment - 100) / 49900) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Active Clients
            </label>
            <span className="font-black text-et-green">{clientCount}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={clientCount}
            onChange={(e) => setClientCount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #009639 0%, #009639 ${((clientCount - 1) / 19) * 100}%, #e5e7eb ${((clientCount - 1) / 19) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
      </div>

      {/* Risk Score */}
      <div className={`border-2 rounded-xl p-5 mb-5 ${config.bgClass}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-bold ${config.colorClass}`}>
            {config.emoji} Risk Level: {config.label}
          </span>
          <span className={`text-2xl font-black counter-display ${config.colorClass}`}>
            {result.score}/100
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-white/60 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${result.score}%`,
              background:
                result.riskLevel === "LOW"
                  ? "#16a34a"
                  : result.riskLevel === "MEDIUM"
                    ? "#ca8a04"
                    : result.riskLevel === "HIGH"
                      ? "#ea580c"
                      : "#dc2626",
            }}
          ></div>
        </div>

        <p className={`text-sm font-medium ${config.colorClass}`}>
          {result.message}
        </p>
      </div>

      {/* Opportunities */}
      <div className="bg-et-green/5 border border-et-green/20 rounded-xl p-4">
        <div className="text-sm font-bold text-et-green mb-3">
          Enterprise Opportunities with FXD/04/2026
        </div>
        <div className="grid grid-cols-1 gap-2">
          {result.opportunities.map((opp) => (
            <div key={opp} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle size={14} className="text-et-green flex-shrink-0" />
              {opp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
