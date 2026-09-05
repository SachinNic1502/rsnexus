import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingFeatureList } from "@/components/pricing/pricing-feature-list"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

interface ProjectPlanCardProps {
  plan: PricingCardView
  icon: LucideIcon
  onSelect: (plan: PricingCardView) => void
}

/** One card in the "Advanced Project Solutions" grid. */
export function ProjectPlanCard({ plan, icon: Icon, onSelect }: ProjectPlanCardProps) {
  return (
    <Card
      className={`relative ${plan.isPopular ? "border-primary shadow-lg scale-105" : ""} hover:shadow-xl transition-all duration-300`}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-2">{plan.periodLabel}</span>
        </div>
        <p className="text-muted-foreground mt-2">{plan.description}</p>
      </CardHeader>

      <CardContent>
        <PricingFeatureList features={plan.features} className="mb-6" />

        <Button
          className={`w-full ${plan.isPopular ? "bg-primary hover:bg-primary/90" : ""}`}
          variant={plan.isPopular ? "default" : "outline"}
          onClick={() => onSelect(plan)}
        >
          {plan.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
