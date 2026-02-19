"use client";

import { useEffect, useState } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { BigNumber } from "./GeezComponents";

const stats = [
  { value: "100%", label: "FX Retention", amharic: "የውጪ ገንዘብ ሙሉ ቁ" },
  { value: "Feb 12", label: "Effective Date", amharic: "ናሳ ቀን" },
  { value: "$0", label: "Minimum Deposit", amharic: "ዝቅተኛ ማቀፊያ" },
  { value: "∞", label: "Holding Period", amharic: "ማቀፊያ ጊዜ" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-teff-900 via-teff-800 to-coffee-800">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='1'%3E%3Cline x1='0' y1='50' x2='50' y2='0'/%3E%3Cline x1='50' y1='100' x2='100' y2='50'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating currency symbols - updated colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && (
          <>
            {[
              { symbol: "$", top: "15%", left: "8%", right: undefined, bottom: undefined, size: "text-6xl", opacity: 0.08, delay: "0s" },
              { symbol: "₿", top: "25%", left: undefined, right: "10%", bottom: undefined, size: "text-5xl", opacity: 0.06, delay: "1s" },
              { symbol: "€", top: undefined, bottom: "30%", left: "12%", right: undefined, size: "text-4xl", opacity: 0.07, delay: "2s" },
              { symbol: "₸", top: "60%", left: undefined, right: "8%", bottom: undefined, size: "text-5xl", opacity: 0.06, delay: "0.5s" },
              { symbol: "¥", top: undefined, bottom: "20%", left: undefined, right: "20%", size: "text-3xl", opacity: 0.05, delay: "1.5s" },
            ].map((item, i) => (
              <div
                key={i}
                className={`absolute ${item.size} font-bold text-gold-500 select-none`}
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  opacity: item.opacity,
                  animation: `float ${3 + i}s ease-in-out infinite`,
                  animationDelay: item.delay,
                }}
              >
                {item.symbol}
              </div>
            ))}
          </>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-digital-500/20 backdrop-blur-sm border border-digital-500/40 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
          <span className="text-paper-50 text-sm font-medium">
            FXD/04/2026 — Effective February 12, 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-paper-50 leading-tight mb-6">
          Stop Losing Money{" "}
          <span className="relative inline-block">
            <span className="text-gold-500">in the Shadows</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              fill="none"
            >
              <path
                d="M0 3 Q75 0 150 3 Q225 6 300 3"
                stroke="#D4AF37"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Amharic headline */}
        <p className="amharic-header text-gold-500 mb-4">ከጥላ ገበያ ነፃ ይውጡ</p>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-paper-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          Ethiopia&apos;s{" "}
          <strong className="text-gold-500">FXD/04/2026 directive</strong>{" "}
          changed everything on{" "}
          <strong className="text-digital-300">
            February 12, 2026
          </strong>
          . Get <strong>100% FX retention</strong>, international cards, and
          full legal protection — starting today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#calculators"
            className="btn-primary-lg pulse-cta flex items-center justify-center gap-2"
          >
            Calculate My FX Freedom
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="https://www.nbe.gov.et"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            Read the Full Directive
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-teff-700/20 backdrop-blur-sm border border-gold-500/30 px-4 py-5 relative"
              style={{
                clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)"
              }}
            >
              <div className="text-3xl sm:text-4xl font-black text-gold-500 counter-display">
                {stat.value}
              </div>
              <div className="text-paper-200 text-xs font-semibold mt-1 uppercase tracking-wider">{stat.label}</div>
              {stat.amharic && <div className="amharic-accent text-xs mt-0.5">{stat.amharic}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-gold-500/60" size={28} />
      </div>

      {/* Accent stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

      {/* Flag stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flag-stripe"></div>
    </section>
  );
}
