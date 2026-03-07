"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type RateData = {
  rate: number;           // bank (formal) rate
  blackMarketRate: number;
  effectiveRate: number;  // black market minus agent fee
  loading: boolean;
};

const RateContext = createContext<RateData>({
  rate: 155,
  blackMarketRate: 175,
  effectiveRate: 157,
  loading: true,
});

export function useRate() {
  return useContext(RateContext);
}

export default function RateProvider({ children }: { children: ReactNode }) {
  const [rate, setRate] = useState(155);
  const [blackMarketRate, setBlackMarketRate] = useState(175);
  const [effectiveRate, setEffectiveRate] = useState(157);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data) => {
        if (data?.bankRate) setRate(Math.round(data.bankRate * 100) / 100);
        if (data?.blackMarketRate) setBlackMarketRate(Math.round(data.blackMarketRate * 100) / 100);
        if (data?.effectiveRate) setEffectiveRate(Math.round(data.effectiveRate * 100) / 100);
      })
      .catch(() => {
        // fallback: try direct exchange rate API
        fetch("https://api.exchangerate-api.com/v4/latest/USD")
          .then((r) => r.json())
          .then((data) => {
            if (data?.rates?.ETB) {
              const bankRate = Math.round(data.rates.ETB * 100) / 100;
              setRate(bankRate);
              // Estimate black market as ~12% premium
              setBlackMarketRate(Math.round(bankRate * 1.12 * 100) / 100);
              setEffectiveRate(Math.round(bankRate * 1.12 * 0.9 * 100) / 100);
            }
          })
          .catch(() => {
            // stay at defaults
          });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RateContext value={{ rate, blackMarketRate, effectiveRate, loading }}>
      {children}
    </RateContext>
  );
}
