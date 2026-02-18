"use client";

import { Check, X } from "lucide-react";

const comparisonData = [
  {
    aspect: "Exchange Rate",
    blackMarket: "175 ETB/USD",
    formal: "155 ETB/USD",
    blackMarketBad: false,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Agent / Processing Fee",
    blackMarket: "-10% (-17.5 ETB)",
    formal: "0%",
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Effective Rate",
    blackMarket: "~157 ETB/USD",
    formal: "155 ETB/USD",
    blackMarketBad: false,
    formalBad: false,
    highlight: true,
  },
  {
    aspect: "International Visa/Mastercard",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Proof of Income / Bank Statements",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Volume Limit",
    blackMarket: "~$2,000/month",
    formal: "Unlimited ✅",
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Legal Status",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Account Freeze Risk",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Enterprise / Fortune 500 Clients",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Visa Applications",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Business Loans & Credit",
    blackMarket: null,
    formal: true,
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
  {
    aspect: "Scaling Potential",
    blackMarket: "Capped ❌",
    formal: "Unlimited ✅",
    blackMarketBad: true,
    formalBad: false,
    highlight: false,
  },
];

function CellValue({
  value,
  isBad,
}: {
  value: string | boolean | null;
  isBad: boolean;
}) {
  if (value === null || value === false) {
    return (
      <div className="flex items-center justify-center gap-1">
        <X size={16} className="text-red-500" />
        <span className="text-red-600 text-sm font-medium">No</span>
      </div>
    );
  }
  if (value === true) {
    return (
      <div className="flex items-center justify-center gap-1">
        <Check size={16} className="text-green-500" />
        <span className="text-green-600 text-sm font-medium">Yes</span>
      </div>
    );
  }
  return (
    <span
      className={`text-sm font-medium ${isBad ? "text-red-600" : "text-gray-700"}`}
    >
      {value as string}
    </span>
  );
}

export default function CostComparison() {
  return (
    <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-et-gold/20 text-yellow-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ⚡ The Real Numbers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-et-dark mb-4">
            Black Market vs{" "}
            <span className="text-et-green">FXD/04/2026</span>
            <br />
            The Full Picture
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You might think informal channels give you a better rate. Let&apos;s
            do the actual math.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-et-dark">
            <div className="py-4 px-4 sm:px-6 text-white/70 text-sm font-semibold">
              Aspect
            </div>
            <div className="py-4 px-4 sm:px-6 text-center border-l border-white/10">
              <div className="flex items-center justify-center gap-2">
                <span className="text-red-400 text-lg">⚠️</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  Black Market
                </span>
              </div>
              <div className="text-red-400/70 text-xs mt-0.5">Informal / Hawala</div>
            </div>
            <div className="py-4 px-4 sm:px-6 text-center border-l border-white/10 bg-et-green/20">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-400 text-lg">✅</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  FXD/04/2026
                </span>
              </div>
              <div className="text-green-400/70 text-xs mt-0.5">Official Bank Route</div>
            </div>
          </div>

          {/* Table rows */}
          {comparisonData.map((row, i) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-3 border-t border-gray-100 ${
                row.highlight
                  ? "bg-yellow-50"
                  : i % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/50"
              }`}
            >
              <div className="py-3 px-4 sm:px-6 text-sm font-medium text-gray-700 flex items-center">
                {row.highlight && (
                  <span className="mr-2 text-yellow-500">★</span>
                )}
                {row.aspect}
              </div>
              <div className="py-3 px-4 sm:px-6 text-center border-l border-gray-100 flex items-center justify-center">
                <CellValue
                  value={row.blackMarket}
                  isBad={row.blackMarketBad}
                />
              </div>
              <div className="py-3 px-4 sm:px-6 text-center border-l border-gray-100 bg-green-50/30 flex items-center justify-center">
                <CellValue value={row.formal} isBad={row.formalBad} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-8 bg-et-green text-white rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-2xl font-bold mb-3">The Bottom Line</h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-4">
            For the{" "}
            <strong className="text-et-gold">SAME effective rate</strong>, you
            get international card access, legal protection, bank statements,
            visa eligibility, and a path to real business growth.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-6 py-3 rounded-xl">
            <span className="text-et-gold font-bold text-xl">
              ~157 ETB/USD
            </span>
            <span className="text-white/70">=</span>
            <span className="text-et-gold font-bold text-xl">
              155 ETB/USD
            </span>
            <span className="text-white/70 text-sm ml-2">
              (same money, infinite more benefits)
            </span>
          </div>
        </div>

        {/* Share */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-3">
            Share this with other Ethiopian freelancers:
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent("I just discovered FXD/04/2026 - Ethiopian freelancers can now keep 100% of USD earnings AND get international cards! Check this out: https://netsalancer.et")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              📱 Share on WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent("https://netsalancer.et")}&text=${encodeURIComponent("FXD/04/2026 - Ethiopian freelancers can now keep 100% of USD earnings AND get international cards!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              ✈️ Share on Telegram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Ethiopian freelancers now have 100% FX retention under FXD/04/2026! No more informal channels. Get international cards legally. 🇪🇹 https://netsalancer.et")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              𝕏 Share on X
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
