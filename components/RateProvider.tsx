"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type RateData = {
  rate: number;
  loading: boolean;
};

const RateContext = createContext<RateData>({ rate: 155, loading: true });

export function useRate() {
  return useContext(RateContext);
}

export default function RateProvider({ children }: { children: ReactNode }) {
  const [rate, setRate] = useState(155);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.ETB) {
          setRate(Math.round(data.rates.ETB * 100) / 100);
        }
      })
      .catch(() => {
        // fallback stays at 155
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RateContext value={{ rate, loading }}>
      {children}
    </RateContext>
  );
}
