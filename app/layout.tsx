import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netsalancer - Ethiopian Freelancer FX Freedom | FXD/04/2026",
  description:
    "Stop losing 25% of your freelance earnings. FXD/04/2026 gives Ethiopian freelancers 100% FX retention, international cards, and legal protection. Calculate your savings now.",
  keywords:
    "Ethiopian freelancers, FXD/04/2026, foreign exchange, Payoneer Ethiopia, international card Ethiopia, freelance Ethiopia, NBE directive, FX retention account",
  authors: [{ name: "Netsalancer", url: "https://netsalancer.et" }],
  openGraph: {
    title: "Netsalancer - Ethiopian Freelancer FX Freedom",
    description:
      "FXD/04/2026 gives Ethiopian freelancers 100% FX retention, international cards, and legal protection. Calculate your savings now.",
    url: "https://netsalancer.et",
    siteName: "Netsalancer",
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netsalancer - Ethiopian Freelancer FX Freedom",
    description:
      "FXD/04/2026 gives Ethiopian freelancers 100% FX retention, international cards, and legal protection.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Ethiopic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Netsalancer",
              description:
                "Platform helping Ethiopian freelancers access FXD/04/2026 foreign exchange benefits",
              url: "https://netsalancer.et",
              email: "mikimuluw@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased bg-paper-50 text-teff-900 font-body">{children}</body>
    </html>
  );
}
