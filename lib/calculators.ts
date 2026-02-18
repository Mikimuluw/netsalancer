export interface Service {
  name: string;
  cost: number;
  enabled: boolean;
  icon: string;
}

export interface SpendingPowerResult {
  services: Service[];
  totalValue: number;
}

export function calculateSpendingPower(monthlyUSD: number): SpendingPowerResult {
  const services: Service[] = [
    {
      name: "AWS / DigitalOcean",
      cost: 50,
      enabled: monthlyUSD >= 500,
      icon: "☁️",
    },
    {
      name: "Adobe Creative Suite",
      cost: 60,
      enabled: monthlyUSD >= 200,
      icon: "🎨",
    },
    {
      name: "Figma Professional",
      cost: 15,
      enabled: monthlyUSD >= 100,
      icon: "✏️",
    },
    {
      name: "ChatGPT Plus",
      cost: 20,
      enabled: monthlyUSD >= 100,
      icon: "🤖",
    },
    {
      name: "GitHub Copilot",
      cost: 10,
      enabled: monthlyUSD >= 100,
      icon: "💻",
    },
    {
      name: "Spotify Premium",
      cost: 10,
      enabled: monthlyUSD >= 50,
      icon: "🎵",
    },
    {
      name: "Netflix",
      cost: 15,
      enabled: monthlyUSD >= 50,
      icon: "🎬",
    },
    {
      name: "Online Courses (Udemy/Coursera)",
      cost: 50,
      enabled: monthlyUSD >= 300,
      icon: "📚",
    },
    {
      name: "Amazon / AliExpress Shopping",
      cost: 0,
      enabled: monthlyUSD >= 200,
      icon: "🛍️",
    },
    {
      name: "International Flight Bookings",
      cost: 0,
      enabled: monthlyUSD >= 500,
      icon: "✈️",
    },
  ];

  const totalValue = services
    .filter((s) => s.enabled && s.cost > 0)
    .reduce((sum, s) => sum + s.cost, 0);

  return { services, totalValue };
}

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface EnterpriseResult {
  score: number;
  riskLevel: RiskLevel;
  message: string;
  opportunities: string[];
}

export function calculateEnterpriseReadiness(
  monthlyUSD: number,
  yearsExperience: number,
  largestPayment: number,
  clientCount: number
): EnterpriseResult {
  let score = 0;
  let riskLevel: RiskLevel;
  let message = "";

  if (monthlyUSD < 500) {
    riskLevel = "LOW";
    score = 15;
    message =
      "You're starting out. Informal channels may work now, but you're limiting your growth potential.";
  } else if (monthlyUSD < 2000) {
    riskLevel = "LOW";
    score = 25;
    message =
      "You can survive on informal channels, but you're limiting your growth. FXD/04/2026 unlocks real opportunities.";
  } else if (monthlyUSD < 5000) {
    riskLevel = "MEDIUM";
    score = 55;
    message =
      "You're approaching the danger zone. Hawala agents can't reliably move this volume, and account freeze risk is rising.";
  } else if (monthlyUSD < 10000) {
    riskLevel = "HIGH";
    score = 75;
    message =
      "HIGH RISK: At this earnings level, informal channels are becoming dangerous. One freeze could cost you thousands.";
  } else {
    riskLevel = "CRITICAL";
    score = 95;
    message =
      "CRITICAL: You NEED formal channels NOW. You're at extreme risk of account freeze or legal issues at this volume.";
  }

  if (yearsExperience >= 3) score = Math.min(score + 8, 100);
  if (clientCount >= 5) score = Math.min(score + 8, 100);
  if (largestPayment >= 5000) score = Math.min(score + 8, 100);

  const opportunities = [
    "Fortune 500 contract eligibility",
    "Government & NGO project bids",
    "Proper invoicing and contracts",
    "VAT registration possible",
    "Business loans and credit lines",
    "Scale to team / agency model",
  ];

  return { score: Math.min(score, 100), riskLevel, message, opportunities };
}

export interface VisaRequirement {
  name: string;
  met: boolean;
  required: boolean;
  description: string;
}

export interface VisaResult {
  requirements: VisaRequirement[];
  currentProbability: number;
  futureProbability: number;
  visaReadyDate: string;
  monthsToReady: number;
}

export function calculateVisaReadiness(
  targetCountry: string,
  hasStatements: boolean,
  hasTaxReturns: boolean,
  monthsInFormal: number
): VisaResult {
  const requirements: VisaRequirement[] = [
    {
      name: "Bank statements (6+ months)",
      met: hasStatements || monthsInFormal >= 6,
      required: true,
      description:
        "Proof of regular income flowing through legitimate banking channels",
    },
    {
      name: "Proof of employment / business",
      met: monthsInFormal >= 3,
      required: true,
      description: "Official documentation of your freelance business status",
    },
    {
      name: "Tax returns (1-2 years)",
      met: hasTaxReturns || monthsInFormal >= 24,
      required: targetCountry === "USA" || targetCountry === "Canada",
      description: "Tax compliance records from your home country",
    },
    {
      name: "Verifiable income proof",
      met: hasStatements && monthsInFormal >= 6,
      required: true,
      description: "Demonstrable and traceable income source",
    },
    {
      name: "Property / asset ownership",
      met: false,
      required: false,
      description: "Shows ties to your home country (reduces overstay risk)",
    },
  ];

  const metRequired = requirements
    .filter((r) => r.required)
    .filter((r) => r.met).length;
  const totalRequired = requirements.filter((r) => r.required).length;

  const currentProbability = Math.max(
    5,
    Math.floor((metRequired / totalRequired) * 55)
  );

  // After 6 months in formal channels, probability increases dramatically
  const futureProbability = 65;

  // Calculate months until visa ready (need 6 months of bank statements)
  const monthsToReady = Math.max(0, 6 - monthsInFormal);
  const readyDate = new Date();
  readyDate.setMonth(readyDate.getMonth() + monthsToReady + 1);
  const visaReadyDate = readyDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    requirements,
    currentProbability,
    futureProbability,
    visaReadyDate,
    monthsToReady,
  };
}
