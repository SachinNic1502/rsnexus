import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingFeatureList } from "@/components/pricing/pricing-feature-list"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

interface BasicPackageCardProps {
  plan: PricingCardView
  onSelect: (plan: PricingCardView) => void
}

/** Highlighted entry-level package shown above the main plan grid. */
export function BasicPackageCard({ plan, onSelect }: BasicPackageCardProps) {
  return (
    <Card className="border-2 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
          <Zap className="h-6 w-6 text-green-500" />
        </div>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-green-600">{plan.price}</span>
          {plan.compareAtPrice && <span className="text-muted-foreground ml-2">- {plan.compareAtPrice}</span>}
        </div>
        <p className="text-muted-foreground mt-2">{plan.description}</p>
      </CardHeader>

      <CardContent>
        <PricingFeatureList features={plan.features} className="mb-6" />

        <Button
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          onClick={() => onSelect(plan)}
        >
          {plan.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
