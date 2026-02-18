"use client";

import { useEffect, useState } from "react";
import { ArrowDown, FileText } from "lucide-react";

const stats = [
  { value: "100%", label: "FX Retention" },
  { value: "Feb 12", label: "Effective Date" },
  { value: "$0", label: "Minimum Deposit" },
  { value: "∞", label: "Holding Period" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating currency symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && (
          <>
            {[
              { symbol: "$", top: "15%", left: "8%", right: undefined, bottom: undefined, size: "text-6xl", opacity: 0.15, delay: "0s" },
              { symbol: "₿", top: "25%", left: undefined, right: "10%", bottom: undefined, size: "text-5xl", opacity: 0.1, delay: "1s" },
              { symbol: "€", top: undefined, bottom: "30%", left: "12%", right: undefined, size: "text-4xl", opacity: 0.12, delay: "2s" },
              { symbol: "£", top: "60%", left: undefined, right: "8%", bottom: undefined, size: "text-5xl", opacity: 0.1, delay: "0.5s" },
              { symbol: "¥", top: undefined, bottom: "20%", left: undefined, right: "20%", size: "text-3xl", opacity: 0.08, delay: "1.5s" },
            ].map((item, i) => (
              <div
                key={i}
                className={`absolute ${item.size} font-bold text-white select-none`}
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
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-et-gold animate-pulse"></span>
          <span className="text-white text-sm font-medium">
            FXD/04/2026 — Effective February 12, 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
          Stop Losing Money{" "}
          <span className="relative inline-block">
            <span className="text-et-gold">in the Shadows</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              fill="none"
            >
              <path
                d="M0 3 Q75 0 150 3 Q225 6 300 3"
                stroke="#FCDD09"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Ethiopia&apos;s{" "}
          <strong className="text-et-gold">FXD/04/2026 directive</strong>{" "}
          changed everything on{" "}
          <strong className="underline decoration-et-gold">
            February 12, 2026
          </strong>
          . Get <strong>100% FX retention</strong>, international cards, and
          full legal protection — starting today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#calculators"
            className="group pulse-cta bg-et-gold text-et-dark px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-yellow-400 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Calculate My FX Freedom
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="https://www.nbe.gov.et"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/15 backdrop-blur-sm border border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/25 transition-all duration-200 flex items-center justify-center gap-2"
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
              className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-5"
            >
              <div className="text-3xl sm:text-4xl font-black text-et-gold counter-display">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/60" size={28} />
      </div>

      {/* Flag stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flag-stripe"></div>
    </section>
  );
}
