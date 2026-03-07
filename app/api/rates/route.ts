import { NextResponse } from "next/server";

type RatesPayload = {
  bankRate: number;
  blackMarketRate: number;
  effectiveRate: number;
  updatedAt: string;
};

// In-memory cache (survives across requests within the same server instance)
let cached: { data: RatesPayload; ts: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function fetchBankRate(): Promise<number> {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("exchangerate-api failed");
  const data = await res.json();
  return Math.round((data?.rates?.ETB ?? 155) * 100) / 100;
}

async function fetchBlackMarketRate(): Promise<number> {
  // Try scraping from ethioblackmarket.com
  try {
    const res = await fetch("https://ethioblackmarket.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (res.ok) {
      const html = await res.text();
      // Look for USD rate patterns like "1 USD = 130 ETB" or "USD 130" etc.
      const patterns = [
        /USD[^0-9]*(\d{2,3}(?:\.\d{1,2})?)\s*(?:ETB|Birr)/i,
        /(?:dollar|usd)[^0-9]*(\d{2,3}(?:\.\d{1,2})?)/i,
        /(\d{2,3}(?:\.\d{1,2})?)\s*(?:ETB|Birr)\s*(?:per|\/)\s*(?:USD|dollar)/i,
      ];
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
          const rate = parseFloat(match[1]);
          if (rate > 100 && rate < 500) return rate;
        }
      }
    }
  } catch {
    // continue to next source
  }

  // Try egcurrency.com
  try {
    const res = await fetch(
      "https://egcurrency.com/en/currency/USD-to-ETB/blackMarket",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
        },
      }
    );
    if (res.ok) {
      const html = await res.text();
      const patterns = [
        /(\d{2,3}(?:\.\d{1,2})?)\s*(?:ETB|Birr)/i,
        /black\s*market[^0-9]*(\d{2,3}(?:\.\d{1,2})?)/i,
      ];
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
          const rate = parseFloat(match[1]);
          if (rate > 100 && rate < 500) return rate;
        }
      }
    }
  } catch {
    // continue to next source
  }

  // Try ethiopianblackmarket.com
  try {
    const res = await fetch("https://ethiopianblackmarket.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (res.ok) {
      const html = await res.text();
      const patterns = [
        /USD[^0-9]*(\d{2,3}(?:\.\d{1,2})?)\s*(?:ETB|Birr)/i,
        /(\d{2,3}(?:\.\d{1,2})?)\s*(?:ETB|Birr)/i,
      ];
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
          const rate = parseFloat(match[1]);
          if (rate > 100 && rate < 500) return rate;
        }
      }
    }
  } catch {
    // fallback
  }

  // Fallback: estimate black market as bank rate * 1.12 (typical 12% premium)
  return 0; // 0 signals fallback needed
}

export async function GET() {
  // Return cached data if fresh
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800" },
    });
  }

  try {
    const [bankRate, scrapedBlackRate] = await Promise.all([
      fetchBankRate(),
      fetchBlackMarketRate(),
    ]);

    // If scraping failed, estimate black market as ~12% premium over bank rate
    const blackMarketRate =
      scrapedBlackRate > 0
        ? scrapedBlackRate
        : Math.round(bankRate * 1.12 * 100) / 100;

    // Effective rate = black market rate minus 10% agent fee
    const effectiveRate = Math.round(blackMarketRate * 0.9 * 100) / 100;

    const data: RatesPayload = {
      bankRate,
      blackMarketRate,
      effectiveRate,
      updatedAt: new Date().toISOString(),
    };

    cached = { data, ts: Date.now() };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800" },
    });
  } catch {
    // If everything fails, return fallback
    const fallback: RatesPayload = {
      bankRate: 155,
      blackMarketRate: 175,
      effectiveRate: 157,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(fallback);
  }
}
