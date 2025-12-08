import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Services in India | RSNexus",
  description:
    "End-to-end website, full stack, mobile app, UI/UX design, cloud and AI/ML services from RSNexus, serving clients across India and worldwide.",
  alternates: {
    canonical: "https://rsnexus.in/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
