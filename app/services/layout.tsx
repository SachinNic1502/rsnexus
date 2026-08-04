import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Services in India | RSNexus",
  description:
    "End-to-end website, full stack, mobile app, UI/UX design, cloud and AI/ML services from RSNexus, serving clients across India and worldwide.",
  alternates: {
    canonical: "https://rsnexus.in/services",
  },
  openGraph: {
    title: "Software Development Services in India | RSNexus",
    description:
      "End-to-end website, full stack, mobile app, UI/UX design, cloud and AI/ML services from RSNexus, serving clients across India and worldwide.",
    url: "https://rsnexus.in/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Services in India | RSNexus",
    description:
      "End-to-end website, full stack, mobile app, UI/UX design, cloud and AI/ML services from RSNexus, serving clients across India and worldwide.",
  },
};

const serviceNames = [
  "Website Development",
  "Full Stack Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "AI & Machine Learning",
];

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [
    ...serviceNames.map((name) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: name,
      provider: {
        "@type": "Organization",
        name: "RSNexus",
        url: "https://rsnexus.in",
      },
      areaServed: "Worldwide",
    })),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://rsnexus.in/services" },
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
