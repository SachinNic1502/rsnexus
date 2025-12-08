import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact RSNexus | Request a Quote or Consultation",
  description:
    "Contact RSNexus to discuss your web, mobile, AI, or cloud project. Request a quote or schedule a free consultation with our team.",
  alternates: {
    canonical: "https://rsnexus.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
