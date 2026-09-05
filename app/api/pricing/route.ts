import { NextResponse } from "next/server"

import { ApiError, type ApiEnvelope } from "@/lib/api-client"
import { fetchPublishedPricingPlans } from "@/lib/pricing/pricing.service"
import type { PricingPlan } from "@/lib/pricing/pricing.types"

/**
 * Public pricing feed for the marketing site.
 *
 * The backend pricing routes require an admin bearer token, which must never
 * reach the browser, so this handler holds the credential server-side and
 * returns only published plans. It mirrors the backend envelope so the client
 * keeps working unchanged once the backend ships its own public route.
 */
export async function GET(): Promise<NextResponse<ApiEnvelope<PricingPlan[]>>> {
  try {
    const { data, meta } = await fetchPublishedPricingPlans()

    return NextResponse.json(
      { success: true, message: "Pricing plan list fetched successfully.", data, meta, errors: null },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
    )
  } catch (error) {
    const apiError =
      error instanceof ApiError ? error : new ApiError("Unable to load pricing plans.", { code: "INTERNAL_ERROR" })

    console.error("[pricing] fetch failed:", apiError.code, apiError.requestId ?? "", apiError.message)

    return NextResponse.json(
      {
        success: false,
        message: apiError.message,
        data: null,
        meta: { code: apiError.code, requestId: apiError.requestId },
        errors: null,
      },
      { status: apiError.status >= 400 && apiError.status < 600 ? apiError.status : 502 },
    )
  }
}
