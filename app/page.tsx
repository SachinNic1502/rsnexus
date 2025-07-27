import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesOverview } from "@/components/services-overview"
import { GlobeShowcase } from "@/components/globe-showcase"
import { CTASection } from "@/components/cta-section"
import { SparklesCore } from "@/components/ui/sparkles";
import { Testimonial } from "@/components/testomonial"
export default function HomePage() {
  return (
    <div className="space-y-0">

      <HeroSection />
      <AboutSection />
      {/* <GlobeShowcase /> */}
      <Testimonial />
      <ServicesOverview />
      <CTASection />
    </div>
  )
}
