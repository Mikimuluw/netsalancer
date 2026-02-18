"use client";

import { useState } from "react";
import { calculateSpendingPower } from "@/lib/calculators";

export default function SpendingPowerCalc() {
  const [monthlyUSD, setMonthlyUSD] = useState(500);
  const result = calculateSpendingPower(monthlyUSD);

  const enabledServices = result.services.filter((s) => s.enabled);
  const disabledServices = result.services.filter((s) => !s.enabled);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-et-green/10 text-et-green rounded-xl flex items-center justify-center text-xl">
          💳
        </div>
        <div>
          <h3 className="font-bold text-et-dark text-lg">
            International Spending Power
          </h3>
          <p className="text-gray-500 text-sm">What your USD can actually buy</p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-gray-700">
            Monthly USD Earnings
          </label>
          <span className="text-2xl font-black text-et-green counter-display">
            ${monthlyUSD.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={monthlyUSD}
          onChange={(e) => setMonthlyUSD(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #009639 0%, #009639 ${((monthlyUSD - 100) / 9900) * 100}%, #e5e7eb ${((monthlyUSD - 100) / 9900) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$100</span>
          <span>$10,000</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {result.services.map((service) => (
          <div
            key={service.name}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
              service.enabled
                ? "bg-green-50 border border-green-200"
                : "bg-gray-50 border border-gray-100 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{service.icon}</span>
              <div>
                <span
                  className={`text-sm font-medium ${
                    service.enabled ? "text-et-dark" : "text-gray-400"
                  }`}
                >
                  {service.name}
                </span>
                {service.cost > 0 && (
                  <span className="text-xs text-gray-400 ml-2">
                    ${service.cost}/mo
                  </span>
                )}
              </div>
            </div>
            <span
              className={`text-lg font-bold ${
                service.enabled ? "text-green-500" : "text-gray-300"
              }`}
            >
              {service.enabled ? "✓" : "✗"}
            </span>
          </div>
        ))}
      </div>

      {/* Total value */}
      {result.totalValue > 0 && (
        <div className="bg-et-green rounded-xl p-4 text-white text-center mb-4">
          <div className="text-sm opacity-80 mb-1">
            Total International Access Value
          </div>
          <div className="text-3xl font-black counter-display">
            ${result.totalValue}/month
          </div>
        </div>
      )}

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <div className="text-xs font-semibold text-red-600 mb-2">
            ❌ Black Market
          </div>
          <div className="text-xs text-gray-600">
            Birr cash only
            <br />
            <strong>None available</strong>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <div className="text-xs font-semibold text-et-green mb-2">
            ✅ FXD/04/2026
          </div>
          <div className="text-xs text-gray-600">
            International Visa/MC
            <br />
            <strong>
              {enabledServices.length} of {result.services.length} unlocked
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
