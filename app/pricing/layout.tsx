import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans | RSNexus Software Development",
  description:
    "Explore transparent pricing plans for RSNexus software development services, including startup websites, advanced web apps, and enterprise solutions.",
  alternates: {
    canonical: "https://rsnexus.in/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
