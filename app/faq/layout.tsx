import type React from "react";
import type { Metadata } from "next";
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
  title: "FAQ | RSNexus Software Development",
  description:
    "Answers to common questions about RSNexus's development timelines, pricing, NDAs, technology stack, and maintenance support.",
  alternates: {
    canonical: "https://rsnexus.in/faq",
  },
  openGraph: {
    title: "FAQ | RSNexus Software Development",
    description:
      "Answers to common questions about RSNexus's development timelines, pricing, NDAs, technology stack, and maintenance support.",
    url: "https://rsnexus.in/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | RSNexus Software Development",
    description:
      "Answers to common questions about RSNexus's development timelines, pricing, NDAs, technology stack, and maintenance support.",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  // Matches the questions actually rendered on this page (see app/faq/page.tsx) —
  // the first 4 FAQs appear as a teaser on /contact with their own FAQPage schema instead.
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.slice(4).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
        { "@type": "ListItem", position: 2, name: "FAQ", item: "https://rsnexus.in/faq" },
      ],
    },
  ];

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
