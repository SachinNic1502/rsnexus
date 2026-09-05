import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PricingPlanFeature } from "@/lib/pricing/pricing.types"

interface PricingFeatureListProps {
  features: PricingPlanFeature[]
  className?: string
  /** Modal rows sit slightly tighter than card rows. */
  compact?: boolean
}

/**
 * Renders a plan's feature bullets. Features flagged `included: false` stay in
 * the list — the API contract requires them to be shown as unavailable, not
 * filtered away.
 */
export function PricingFeatureList({ features, className, compact = false }: PricingFeatureListProps) {
  if (features.length === 0) return null

  return (
    <ul className={cn(compact ? "space-y-2" : "space-y-3", className)}>
      {features.map((feature, featureIndex) => (
        <li key={`${feature.label}-${featureIndex}`} className={cn("flex items-center", compact ? "gap-2" : "gap-3")}>
          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span className={cn("text-sm", !feature.included && "line-through text-muted-foreground")}>
            {feature.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
