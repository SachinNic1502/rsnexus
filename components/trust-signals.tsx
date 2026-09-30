import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"

export function TrustSignals() {
  return (
    <section className="py-10 md:py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Real Credibility, Not Claims</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Instead of unverifiable numbers, here's what's actually true about how we build.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {siteConfig.trustSignals.map((signal) => (
            <Badge
              key={signal}
              variant="secondary"
              className="text-xs md:text-sm font-normal px-3 py-1.5"
            >
              ✓ {signal}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
