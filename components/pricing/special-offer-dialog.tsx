import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PricingFeatureList } from "@/components/pricing/pricing-feature-list"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

interface SpecialOfferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The basic package this offer promotes. The dialog stays closed without one. */
  plan: PricingCardView
  onAccept: (plan: PricingCardView) => void
}

/**
 * Startup offer modal. It promotes the basic package, so it reads the same plan
 * the basic card renders rather than repeating its price and features.
 */
export function SpecialOfferDialog({ open, onOpenChange, plan, onAccept }: SpecialOfferDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Special Startup Offer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-4 mb-4">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold">
                {plan.price}
                {plan.compareAtPrice ? ` - ${plan.compareAtPrice}` : ""}
              </div>
              <p className="text-sm opacity-90">Perfect for startups &amp; small businesses</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-center">What&apos;s Included:</h4>
            <PricingFeatureList features={plan.features} compact />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => onAccept(plan)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              {plan.ctaLabel}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              View All Plans
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            * Price varies based on specific requirements. Contact us for exact quote.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
