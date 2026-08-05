import type React from "react";
import type { Metadata } from "next";
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
  title: "Contact RSNexus | Request a Quote or Consultation",
  description:
    "Contact RSNexus to discuss your web, mobile, AI, or cloud project. Request a quote or schedule a free consultation with our team.",
  alternates: {
    canonical: "https://rsnexus.in/contact",
  },
  openGraph: {
    title: "Contact RSNexus | Request a Quote or Consultation",
    description:
      "Contact RSNexus to discuss your web, mobile, AI, or cloud project. Request a quote or schedule a free consultation with our team.",
    url: "https://rsnexus.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RSNexus | Request a Quote or Consultation",
    description:
      "Contact RSNexus to discuss your web, mobile, AI, or cloud project. Request a quote or schedule a free consultation with our team.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  // Only the first 4 FAQs are shown on this page (see app/contact/page.tsx) —
  // the full list lives on /faq with its own FAQPage schema.
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.slice(0, 4).map((faq) => ({
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
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://rsnexus.in/contact" },
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
