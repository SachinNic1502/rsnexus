import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSNexus Team | Experienced Software Engineers & Leadership",
  description:
    "Meet the RSNexus team of experienced software engineers and technology professionals building modern digital solutions for global clients.",
  alternates: {
    canonical: "https://rsnexus.in/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
