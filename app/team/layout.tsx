import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSNexus Team | Experienced Software Engineers & Leadership",
  description:
    "Meet the RSNexus team of experienced software engineers and technology professionals building modern digital solutions for global clients.",
  alternates: {
    canonical: "https://rsnexus.in/team",
  },
  openGraph: {
    title: "RSNexus Team | Experienced Software Engineers & Leadership",
    description:
      "Meet the RSNexus team of experienced software engineers and technology professionals building modern digital solutions for global clients.",
    url: "https://rsnexus.in/team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RSNexus Team | Experienced Software Engineers & Leadership",
    description:
      "Meet the RSNexus team of experienced software engineers and technology professionals building modern digital solutions for global clients.",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
      { "@type": "ListItem", position: 2, name: "Team", item: "https://rsnexus.in/team" },
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
