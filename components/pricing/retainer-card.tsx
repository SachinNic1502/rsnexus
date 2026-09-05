import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingFeatureList } from "@/components/pricing/pricing-feature-list"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

interface RetainerCardProps {
  plan: PricingCardView
  onSelect: (plan: PricingCardView) => void
}

/** One card in the "Monthly Retainer Packages" grid. */
export function RetainerCard({ plan, onSelect }: RetainerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-4">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-2">{plan.periodLabel}</span>
        </div>
        <p className="text-muted-foreground mt-2">{plan.description}</p>
      </CardHeader>

      <CardContent>
        <PricingFeatureList features={plan.features} className="mb-6" />

        <Button className="w-full bg-transparent" variant="outline" onClick={() => onSelect(plan)}>
          {plan.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
