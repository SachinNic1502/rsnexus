import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans | RSNexus Software Development",
  description:
    "Explore transparent pricing plans for RSNexus software development services, including startup websites, advanced web apps, and enterprise solutions.",
  alternates: {
    canonical: "https://rsnexus.in/pricing",
  },
  openGraph: {
    title: "Pricing & Plans | RSNexus Software Development",
    description:
      "Explore transparent pricing plans for RSNexus software development services, including startup websites, advanced web apps, and enterprise solutions.",
    url: "https://rsnexus.in/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Plans | RSNexus Software Development",
    description:
      "Explore transparent pricing plans for RSNexus software development services, including startup websites, advanced web apps, and enterprise solutions.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://rsnexus.in/pricing" },
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
