import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Portfolio | RSNexus Projects",
  description:
    "Browse the RSNexus software development portfolio, including web apps, ERP systems, retail platforms, education sites, and more.",
  alternates: {
    canonical: "https://rsnexus.in/portfolio",
  },
  openGraph: {
    title: "Software Development Portfolio | RSNexus Projects",
    description:
      "Browse the RSNexus software development portfolio, including web apps, ERP systems, retail platforms, education sites, and more.",
    url: "https://rsnexus.in/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Portfolio | RSNexus Projects",
    description:
      "Browse the RSNexus software development portfolio, including web apps, ERP systems, retail platforms, education sites, and more.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://rsnexus.in/portfolio" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
