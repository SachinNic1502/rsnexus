import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface PricingCardSkeletonProps {
  className?: string
  /** Number of feature rows to outline while loading. */
  featureCount?: number
}

/** Loading placeholder shaped like a pricing card, so the layout does not jump. */
export function PricingCardSkeleton({ className, featureCount = 5 }: PricingCardSkeletonProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-3 pb-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-full max-w-[16rem]" />
        </div>
        <div className="space-y-3 mb-6">
          {Array.from({ length: featureCount }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

/** Compact loading placeholder for the add-on grid. */
export function PricingAddOnSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3 gap-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}

interface PricingStateCardProps {
  message: string
  onRetry?: () => void
  className?: string
}

/** Error / empty state for a pricing section. Never renders fallback prices. */
export function PricingStateCard({ message, onRetry, className }: PricingStateCardProps) {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground">{message}</p>
        {onRetry && (
          <Button variant="outline" className="mt-4 bg-transparent" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
