import { apiRequest, type ApiResult } from "@/lib/api-client"
import { toPricingPlans } from "./pricing.mapper"
import type { BillingPeriod, PricingPlan } from "./pricing.types"

/**
 * Server-side access to the backend pricing module.
 *
 * Both documented read routes are guarded by `withAuth()` + `content:read`, so
 * this must never run in the browser: it carries an admin service credential.
 * The public page reaches it through the `/api/pricing` route handler.
 */

/** Backend pricing list route, relative to NEXT_PUBLIC_API_BASE_URL. */
const PRICING_ENDPOINT = "/pricing"

/** Prices change on an editorial cadence — revalidate rather than refetch per request. */
const PRICING_REVALIDATE_SECONDS = 300

/** The API caps `limit` at 100, which comfortably covers a full pricing page. */
const PRICING_PAGE_SIZE = 100

export interface FetchPricingPlansOptions {
  billingPeriod?: BillingPeriod
  signal?: AbortSignal
}

function getAccessToken(): string | undefined {
  return process.env.PRICING_API_ACCESS_TOKEN?.trim() || undefined
}

/**
 * Fetches every published plan, ordered the way the admin arranged the cards.
 * `status` is pinned here so no caller can surface drafts or archived plans.
 */
export async function fetchPublishedPricingPlans(
  options: FetchPricingPlansOptions = {},
): Promise<ApiResult<PricingPlan[]>> {
  const accessToken = getAccessToken()

  const result = await apiRequest<unknown>(PRICING_ENDPOINT, {
    query: {
      status: "published",
      billingPeriod: options.billingPeriod,
      sortBy: "displayOrder",
      sortOrder: "asc",
      limit: PRICING_PAGE_SIZE,
      page: 1,
    },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    signal: options.signal,
    next: { revalidate: PRICING_REVALIDATE_SECONDS, tags: ["pricing"] },
  })

  return { data: toPricingPlans(result.data), meta: result.meta }
}
