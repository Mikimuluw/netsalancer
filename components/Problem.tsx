"use client";

import { Lock, Globe, FileX } from "lucide-react";

const problems = [
  {
    icon: Lock,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    title: "Account Freeze Risk",
    bullets: [
      "One PayPal freeze = lose your entire balance",
      "Constant fear of detection and account closure",
      "No recourse — informal = no protection",
      "Years of work wiped out overnight",
    ],
    impact: "Thousands of freelancers have lost $10,000+ this way",
  },
  {
    icon: Globe,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    title: "No International Access",
    bullets: [
      "Black market = birr cash only, no digital spending",
      "Can't pay for AWS, Adobe, GitHub, or tools",
      "No Udemy, Coursera, or professional development",
      "Can't shop on Amazon or book international flights",
    ],
    impact: "Every tool you can't use makes you less competitive",
  },
  {
    icon: FileX,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
    title: "No Future, No Scale",
    bullets: [
      "No visa applications — banks reject you without statements",
      "No enterprise clients — they require formal invoicing",
      "No business loans or mortgages",
      "No path from freelancer to agency",
    ],
    impact: "You're trapped as a solo freelancer forever",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-paper-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-coffee-200/50 text-coffee-800 rounded px-4 py-2 text-sm font-semibold mb-4 border-l-4 border-coffee-600">
            <span className="w-2 h-2 rounded-full bg-coffee-600"></span>
            The Reality for Ethiopian Freelancers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-teff-900 mb-4">
            The Hidden Cost of{" "}
            <span className="text-digital-500">Informal Channels</span>
          </h2>
          <p className="text-lg text-teff-700 max-w-2xl mx-auto">
            Every month you use informal channels, you&apos;re not just losing
            money — you&apos;re losing opportunities, security, and your future.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="calculator-card"
              >
                <div
                  className={`w-12 h-12 ${problem.bg} ${problem.color} rounded flex items-center justify-center mb-4`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-teff-900 mb-4">
                  {problem.title}
                </h3>
                <ul className="space-y-2 mb-4">
                  {problem.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-teff-700 text-sm">
                      <span className="text-coffee-600 mt-0.5 flex-shrink-0 font-bold">–</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className={`${problem.bg} ${problem.color} rounded p-3 text-xs font-semibold`}>
                  Impact: {problem.impact}
                </div>
              </div>
            );
          })}
        </div>

        {/* The twist */}
        <div className="bg-gradient-to-r from-digital-700 via-digital-500 to-digital-300 text-paper-50 p-8 text-center"
          style={{
            clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
          }}>
          <div className="text-4xl mb-4">►</div>
          <h3 className="text-2xl font-bold mb-3">
            FXD/04/2026 Solves ALL of These
          </h3>
          <p className="text-paper-100 text-lg max-w-2xl mx-auto mb-6">
            The National Bank of Ethiopia&apos;s new directive gives you legal
            100% FX retention, international Visa/Mastercard access, and full
            documentation — for free.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "100% FX Retention",
              "International Cards",
              "Legal Protection",
              "Full Documentation",
              "No Minimum Deposit",
              "Unlimited Holding",
            ].map((feature) => (
              <span
                key={feature}
                className="bg-white/20 border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
