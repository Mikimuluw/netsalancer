"use client";

import { useState } from "react";
import { Smartphone, CreditCard, Zap, Shield, CheckCircle, Loader2 } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Digital Account Opening",
    description:
      "Open FX accounts from your phone in 10 minutes with eKYC using Fayda national ID.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: CreditCard,
    title: "Instant International Cards",
    description:
      "Get your Visa/Mastercard in 72 hours. Load USD directly from your retention account.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "Smart Payment Routing",
    description:
      "Receive payments from clients worldwide with automatic best-rate conversion when needed.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Full Legal Compliance",
    description:
      "100% legal and NBE-compliant. Proper invoicing, documentation, and tax reporting built in.",
    color: "text-et-green",
    bg: "bg-et-green/10",
  },
];

let waitlistCount = 247;

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState(true);
  const [tips, setTips] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [count, setCount] = useState(waitlistCount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    setCount((c) => c + 1);
    setJoined(true);
    setIsLoading(false);
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Coming Q2 2026
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-et-dark mb-4">
            We&apos;re Building the Platform to{" "}
            <span className="text-et-green">Make This Automatic</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Digital FX account opening, instant international cards, and
            seamless payment processing — all in one app.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature list */}
          <div className="space-y-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div
                    className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-et-dark mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Waitlist form */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
            {/* Counter */}
            <div className="text-center mb-8">
              <div className="text-5xl font-black text-et-green counter-display mb-1">
                {count.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">
                freelancers already on the waitlist
              </div>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: Math.min(8, count) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-et-green/20 border-2 border-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' fill='%23009639'/%3E%3Cellipse cx='12' cy='20' rx='8' ry='5' fill='%23009639'/%3E%3C/svg%3E")`,
                      backgroundSize: "cover",
                      marginLeft: i > 0 ? "-8px" : "0",
                    }}
                  ></div>
                ))}
                <span className="text-xs text-gray-500 ml-2 self-center">
                  +{(count - 8).toLocaleString()} more
                </span>
              </div>
            </div>

            {joined ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-et-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-et-green" />
                </div>
                <h3 className="text-xl font-bold text-et-dark mb-2">
                  You&apos;re on the list!
                </h3>
                <p className="text-gray-600 text-sm">
                  We&apos;ll notify you the moment Netsalancer launches. You&apos;re #
                  {count} in line.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-et-green focus:border-transparent placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notify}
                      onChange={(e) => setNotify(e.target.checked)}
                      className="w-4 h-4 rounded text-et-green"
                    />
                    <span className="text-sm text-gray-700">
                      Notify me when Netsalancer launches
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tips}
                      onChange={(e) => setTips(e.target.checked)}
                      className="w-4 h-4 rounded text-et-green"
                    />
                    <span className="text-sm text-gray-700">
                      Send me FX Freedom tips and updates
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-et-dark text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join the Waitlist — Free"
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
