import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Portfolio | RSNexus Projects",
  description:
    "Browse the RSNexus software development portfolio, including web apps, ERP systems, retail platforms, education sites, and more.",
  alternates: {
    canonical: "https://rsnexus.in/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
