import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | RSNexus Software Development",
  description:
    "Practical, honest writing from RSNexus on web development, AI for businesses, startup MVPs, and modern software engineering.",
  alternates: {
    canonical: "https://rsnexus.in/blog",
  },
  openGraph: {
    title: "Blog | RSNexus Software Development",
    description:
      "Practical, honest writing from RSNexus on web development, AI for businesses, startup MVPs, and modern software engineering.",
    url: "https://rsnexus.in/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | RSNexus Software Development",
    description:
      "Practical, honest writing from RSNexus on web development, AI for businesses, startup MVPs, and modern software engineering.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://rsnexus.in/blog" },
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
