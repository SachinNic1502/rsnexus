import { apiRequest } from "@/lib/api-client"
import { toPricingPlans } from "./pricing.mapper"
import type { PricingPlan } from "./pricing.types"

/**
 * Browser-side access to pricing data.
 *
 * Calls the backend pricing list route directly, using the base URL from
 * NEXT_PUBLIC_API_BASE_URL. `status` is fixed to `published` so drafts and
 * archived plans never reach the public page.
 */
const PRICING_ENDPOINT = "/pricing"

/** The API caps `limit` at 100, which comfortably covers a full pricing page. */
const PRICING_PAGE_SIZE = 100

export async function fetchPricingPlans(signal?: AbortSignal): Promise<PricingPlan[]> {
  const result = await apiRequest<unknown>(PRICING_ENDPOINT, {
    query: {
      status: "published",
      sortBy: "displayOrder",
      sortOrder: "asc",
      limit: PRICING_PAGE_SIZE,
      page: 1,
    },
    signal,
  })

  return toPricingPlans(result.data)
}
