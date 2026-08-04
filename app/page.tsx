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

export const metadata: Metadata = {
  title: "Software Development Company in India | RSNexus",
  description:
    "RSNexus builds custom web, mobile, AI, and cloud software solutions for businesses in India and worldwide, with a focus on performance and scalability.",
  alternates: {
    canonical: "https://rsnexus.in",
  },
};

export default function HomePage() {
  return (
    <div className="space-y-0">

      <HeroSection />
      <AboutSection />
      {/* <GlobeShowcase /> */}
      <FounderSection />
      <FeaturedProjects />
      <ProcessTimeline />
      <ServicesOverview />
      <CTASection />
      <WhatsappFloatButton />
    </div>
  )
}
