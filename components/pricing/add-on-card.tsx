import { Card, CardContent } from "@/components/ui/card"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

interface AddOnCardProps {
  plan: PricingCardView
  onSelect: (plan: PricingCardView) => void
}

/** One card in the "Add-On Services" grid. */
export function AddOnCard({ plan, onSelect }: AddOnCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(plan)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold">{plan.name}</h3>
          <span className="font-bold text-primary">
            {plan.price}
            {plan.periodSuffix}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardContent>
    </Card>
  )
}
