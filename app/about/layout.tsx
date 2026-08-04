import type React from "react";
import type { Metadata } from "next";
import team from "@/data/team.json";

export const metadata: Metadata = {
  title: "About RSNexus | Software Development Company in India",
  description:
    "Learn about RSNexus, a software development company in India focused on building scalable, high-quality digital products for clients worldwide.",
  alternates: {
    canonical: "https://rsnexus.in/about",
  },
  openGraph: {
    title: "About RSNexus | Software Development Company in India",
    description:
      "Learn about RSNexus, a software development company in India focused on building scalable, high-quality digital products for clients worldwide.",
    url: "https://rsnexus.in/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RSNexus | Software Development Company in India",
    description:
      "Learn about RSNexus, a software development company in India focused on building scalable, high-quality digital products for clients worldwide.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const founder = team.find((member) => member.role === "Founder");

  const structuredData = [
    ...(founder
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: founder.name,
            jobTitle: founder.role,
            worksFor: {
              "@type": "Organization",
              name: "RSNexus",
              url: "https://rsnexus.in",
            },
            sameAs: [founder.linkedin].filter(Boolean),
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://rsnexus.in/about" },
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
