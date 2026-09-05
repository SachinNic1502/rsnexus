"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { fetchPricingPlans } from "@/lib/pricing/pricing.client"
import { toPricingContent } from "@/lib/pricing/pricing.mapper"
import type { PricingContent, PricingPlan } from "@/lib/pricing/pricing.types"

interface UsePricingResult {
  /** Plans grouped into the sections the pricing page renders. */
  content: PricingContent
  isLoading: boolean
  /** Human-readable message, or null while the request is healthy. */
  error: string | null
  refetch: () => void
}

const EMPTY_CONTENT: PricingContent = { basic: null, projects: [], retainers: [], addOns: [] }

/** Loads the published pricing plans and groups them for the pricing page. */
export function usePricing(): UsePricingResult {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    setIsLoading(true)
    setError(null)

    fetchPricingPlans(controller.signal)
      .then((result) => {
        setPlans(result)
        setIsLoading(false)
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setPlans([])
        setError(cause instanceof Error ? cause.message : "Unable to load pricing right now.")
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  const content = useMemo(() => (plans.length ? toPricingContent(plans) : EMPTY_CONTENT), [plans])

  return { content, isLoading, error, refetch }
}
