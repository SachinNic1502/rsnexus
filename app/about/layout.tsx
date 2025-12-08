import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RSNexus | Software Development Company in India",
  description:
    "Learn about RSNexus, a software development company in India focused on building scalable, high-quality digital products for clients worldwide.",
  alternates: {
    canonical: "https://rsnexus.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
