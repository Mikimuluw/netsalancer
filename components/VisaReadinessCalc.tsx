"use client";

import { useState } from "react";
import { calculateVisaReadiness } from "@/lib/calculators";
import { CheckCircle, XCircle } from "lucide-react";

const countries = ["USA", "Canada", "UK", "Germany", "Other EU"];
const timelines = [
  "Next 6 months",
  "6-12 months",
  "1-2 years",
  "Just exploring",
];

export default function VisaReadinessCalc() {
  const [targetCountry, setTargetCountry] = useState("USA");
  const [hasStatements, setHasStatements] = useState(false);
  const [hasTaxReturns, setHasTaxReturns] = useState(false);
  const [monthsInFormal, setMonthsInFormal] = useState(0);

  const result = calculateVisaReadiness(
    targetCountry,
    hasStatements,
    hasTaxReturns,
    monthsInFormal
  );

  const probColor =
    result.currentProbability < 30
      ? "text-red-500"
      : result.currentProbability < 60
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
          ✈️
        </div>
        <div>
          <h3 className="font-bold text-et-dark text-lg">
            Visa Application Readiness
          </h3>
          <p className="text-gray-500 text-sm">
            Want a US/Canada/EU visa? You need proof.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-5 mb-8">
        {/* Target country */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Target Country
          </label>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setTargetCountry(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  targetCountry === c
                    ? "bg-et-green text-white border-et-green"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-et-green"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Current status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Current Documentation Status
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasStatements}
                onChange={(e) => setHasStatements(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-et-green"
              />
              <span className="text-sm text-gray-700">
                I have bank statements (formal account)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasTaxReturns}
                onChange={(e) => setHasTaxReturns(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-et-green"
              />
              <span className="text-sm text-gray-700">
                I have tax returns on file
              </span>
            </label>
          </div>
        </div>

        {/* Months in formal system */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Months with Formal FX Account
            </label>
            <span className="font-black text-et-green">{monthsInFormal} months</span>
          </div>
          <input
            type="range"
            min={0}
            max={36}
            step={1}
            value={monthsInFormal}
            onChange={(e) => setMonthsInFormal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #009639 0%, #009639 ${(monthsInFormal / 36) * 100}%, #e5e7eb ${(monthsInFormal / 36) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Not started</span>
            <span>3 years</span>
          </div>
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="mb-6">
        <div className="text-sm font-bold text-gray-700 mb-3">
          {targetCountry} Visa Requirements:
        </div>
        <div className="space-y-2">
          {result.requirements.map((req) => (
            <div
              key={req.name}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                req.met
                  ? "bg-green-50 border border-green-200"
                  : req.required
                    ? "bg-red-50 border border-red-200"
                    : "bg-gray-50 border border-gray-200"
              }`}
            >
              {req.met ? (
                <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle
                  size={16}
                  className={`flex-shrink-0 mt-0.5 ${req.required ? "text-red-500" : "text-gray-400"}`}
                />
              )}
              <div>
                <div
                  className={`text-sm font-medium ${req.met ? "text-green-700" : req.required ? "text-red-700" : "text-gray-500"}`}
                >
                  {req.name}
                  {!req.required && (
                    <span className="text-xs ml-2 opacity-60">(optional)</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {req.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Probability comparison */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-xs font-semibold text-red-600 mb-1">
            Current Approval Rate
          </div>
          <div className={`text-3xl font-black counter-display ${probColor}`}>
            {result.currentProbability}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Without formal docs</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-xs font-semibold text-et-green mb-1">
            After 6 Months Formal
          </div>
          <div className="text-3xl font-black text-et-green counter-display">
            {result.futureProbability}%
          </div>
          <div className="text-xs text-gray-500 mt-1">With FXD/04/2026 docs</div>
        </div>
      </div>

      {/* Timeline */}
      {result.monthsToReady > 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm font-bold text-blue-700 mb-1">
            📅 Visa-Ready Timeline
          </div>
          <p className="text-sm text-blue-600">
            If you start FXD/04/2026 account today, you&apos;ll have full
            documentation by{" "}
            <strong>{result.visaReadyDate}</strong> —{" "}
            {result.monthsToReady} month{result.monthsToReady !== 1 ? "s" : ""} away.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-sm font-bold text-green-700 mb-1">
            🎉 You&apos;re Visa-Ready!
          </div>
          <p className="text-sm text-green-600">
            With {monthsInFormal} months of formal banking, you have strong
            documentation for your visa application.
          </p>
        </div>
      )}
    </div>
  );
}
