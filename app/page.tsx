import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesOverview } from "@/components/services-overview"
import { GlobeShowcase } from "@/components/globe-showcase"
import { CTASection } from "@/components/cta-section"
// import { SparklesCore } from "@/components/ui/sparkles"; // Unused: never rendered in this page's JSX
// import { Testimonial } from "@/components/testomonial" // Removed: relied on fabricated client testimonials, replaced by FeaturedProjects
import { FeaturedProjects } from "@/components/featured-projects"
import { FounderSection } from "@/components/founder-section"
import { ProcessTimeline } from "@/components/process-timeline"
import { WhatsappFloatButton } from "@/components/whatsapp-float-button"
import { getFeaturedProjects, getFounders } from "@/lib/data-fetchers"

export const metadata: Metadata = {
  title: "Software Development Company in India | RSNexus",
  description:
    "RSNexus builds custom web, mobile, AI, and cloud software solutions for businesses in India and worldwide, with a focus on performance and scalability.",
  alternates: {
    canonical: "https://rsnexus.in",
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

export default async function HomePage() {
  const [featuredProjects, founders] = await Promise.all([
    getFeaturedProjects(4),
    getFounders(),
  ]);

  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      {/* <GlobeShowcase /> */}
      <FounderSection initialFounders={founders} />
      <FeaturedProjects initialProjects={featuredProjects} />
      <ProcessTimeline />
      <ServicesOverview />
      <CTASection />
      <WhatsappFloatButton />
    </div>
  )
}
