/**
 * Pricing contract types.
 *
 * The `PricingPlan*` types mirror the backend response documented in
 * `docs/PRICING_API_INTEGRATION.md` (GET /api/v1/pricing). The `Pricing*View`
 * types are what the UI renders — kept separate so a backend field rename never
 * reaches a component.
 */

export type BillingPeriod = "one_time" | "monthly" | "quarterly" | "yearly"

export type PricingStatus = "draft" | "published" | "archived"

export interface PricingPlanFeature {
  label: string
  /** `false` renders the row greyed out — excluded features are never filtered away. */
  included: boolean
}

/** One element of `data` on GET /api/v1/pricing. */
export interface PricingPlan {
  id: string
  name: string
  slug: string
  /** Key is absent (not null) when empty. */
  description?: string
  /** Minor units — 4999 means 49.99. Divide only in the formatter. */
  priceAmount: number
  /** Uppercase ISO-4217, per plan. Never assume a single currency. */
  currency: string
  billingPeriod: BillingPeriod
  /** Strike-through / upper-bound price. Guaranteed greater than `priceAmount`, or null. */
  compareAtAmount: number | null
  features: PricingPlanFeature[]
  ctaLabel?: string
  ctaUrl?: string
  isPopular: boolean
  status: PricingStatus
  displayOrder: number
  createdAt: string
  updatedAt: string
  /**
   * NOT part of the documented contract yet. The pricing page has four distinct
   * sections and the API exposes no grouping field, so this is read when the
   * backend starts sending it and derived heuristically until then.
   * See docs/PRICING_API_INTEGRATION.md §"Missing backend fields".
   */
  category?: string
}

/** The four sections the pricing page renders. */
export type PricingSectionKey = "basic" | "project" | "retainer" | "addon"

/** A single pricing card, fully formatted and safe to render. */
export interface PricingCardView {
  id: string
  name: string
  slug: string
  /** Formatted description, or `-` when the API sends none. */
  description: string
  /** Formatted price, or `-` when the API sends none. */
  price: string
  /** Long period label, e.g. `per project` / `per month`. */
  periodLabel: string
  /** Short period suffix used on compact cards, e.g. `/month`. Empty for one-off prices. */
  periodSuffix: string
  /** Formatted upper-bound / strike-through price, or null when the API sends none. */
  compareAtPrice: string | null
  features: PricingPlanFeature[]
  ctaLabel: string
  ctaUrl?: string
  isPopular: boolean
  section: PricingSectionKey
}

/** The whole pricing page, grouped into its existing sections. */
export interface PricingContent {
  basic: PricingCardView | null
  projects: PricingCardView[]
  retainers: PricingCardView[]
  addOns: PricingCardView[]
}
