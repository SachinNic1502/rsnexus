import {
  EMPTY_VALUE,
  formatPrice,
  getPeriodLabel,
  getPeriodSuffix,
  orEmptyValue,
} from "./pricing.format"
import type {
  BillingPeriod,
  PricingCardView,
  PricingContent,
  PricingPlan,
  PricingPlanFeature,
  PricingSectionKey,
  PricingStatus,
} from "./pricing.types"

const BILLING_PERIODS: BillingPeriod[] = ["one_time", "monthly", "quarterly", "yearly"]
const PRICING_STATUSES: PricingStatus[] = ["draft", "published", "archived"]
const SECTION_KEYS: PricingSectionKey[] = ["basic", "project", "retainer", "addon"]

const RECURRING_PERIODS: BillingPeriod[] = ["monthly", "quarterly", "yearly"]

/** Default when nothing on the plan says which button label to show. */
const DEFAULT_CTA_LABEL = EMPTY_VALUE

type RawRecord = Record<string, unknown>

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readString(source: RawRecord, key: string): string | undefined {
  const value = source[key]
  return typeof value === "string" && value.trim() !== "" ? value : undefined
}

function readNumber(source: RawRecord, key: string): number | undefined {
  const value = source[key]
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value)
  return undefined
}

function readBoolean(source: RawRecord, key: string): boolean {
  return source[key] === true
}

function readFeatures(source: RawRecord): PricingPlanFeature[] {
  const value = source.features
  if (!Array.isArray(value)) return []

  return value.reduce<PricingPlanFeature[]>((features, entry) => {
    // Tolerate both the documented object form and a plain string list.
    if (typeof entry === "string" && entry.trim() !== "") {
      features.push({ label: entry, included: true })
    } else if (isRecord(entry)) {
      const label = readString(entry, "label") ?? readString(entry, "name") ?? readString(entry, "title")
      if (label) features.push({ label, included: entry.included !== false })
    }
    return features
  }, [])
}

function readEnum<TValue extends string>(
  source: RawRecord,
  key: string,
  allowed: TValue[],
  fallback: TValue,
): TValue {
  const value = source[key]
  return typeof value === "string" && (allowed as string[]).includes(value) ? (value as TValue) : fallback
}

/**
 * Normalises one raw list element into a {@link PricingPlan}.
 * Returns null when the payload carries no usable identity, so a single bad row
 * never breaks the whole page.
 */
export function toPricingPlan(raw: unknown): PricingPlan | null {
  if (!isRecord(raw)) return null

  const id = readString(raw, "id") ?? readString(raw, "_id")
  const name = readString(raw, "name")
  if (!id || !name) return null

  return {
    id,
    name,
    slug: readString(raw, "slug") ?? id,
    description: readString(raw, "description"),
    priceAmount: readNumber(raw, "priceAmount") ?? Number.NaN,
    currency: (readString(raw, "currency") ?? "").toUpperCase(),
    billingPeriod: readEnum(raw, "billingPeriod", BILLING_PERIODS, "one_time"),
    compareAtAmount: readNumber(raw, "compareAtAmount") ?? null,
    features: readFeatures(raw),
    ctaLabel: readString(raw, "ctaLabel"),
    ctaUrl: readString(raw, "ctaUrl"),
    isPopular: readBoolean(raw, "isPopular"),
    status: readEnum(raw, "status", PRICING_STATUSES, "published"),
    displayOrder: readNumber(raw, "displayOrder") ?? 0,
    createdAt: readString(raw, "createdAt") ?? "",
    updatedAt: readString(raw, "updatedAt") ?? "",
    category: readString(raw, "category") ?? readString(raw, "section") ?? readString(raw, "planType"),
  }
}

export function toPricingPlans(raw: unknown): PricingPlan[] {
  if (!Array.isArray(raw)) return []
  return raw.map(toPricingPlan).filter((plan): plan is PricingPlan => plan !== null)
}

/**
 * Decides which of the four page sections a plan belongs to.
 *
 * The backend has no grouping field yet, so an explicit `category` is used when
 * present and a documented heuristic is applied otherwise. Replace the
 * heuristic with the explicit branch alone once the backend ships `category`.
 */
export function resolveSection(plan: PricingPlan): PricingSectionKey {
  const explicit = plan.category?.trim().toLowerCase().replace(/[\s_-]+/g, "")

  if (explicit) {
    const matched = SECTION_KEYS.find((key) => explicit === key || explicit.startsWith(key))
    if (matched) return matched
    if (explicit.includes("retainer")) return "retainer"
    if (explicit.includes("addon")) return "addon"
    if (explicit.includes("basic")) return "basic"
    if (explicit.includes("project") || explicit.includes("plan")) return "project"
  }

  const haystack = `${plan.slug} ${plan.name}`.toLowerCase()

  if (haystack.includes("basic")) return "basic"
  if (haystack.includes("add-on") || haystack.includes("addon")) return "addon"
  if (haystack.includes("retainer") || haystack.includes("full-service")) return "retainer"
  if (RECURRING_PERIODS.includes(plan.billingPeriod)) return "retainer"

  return "project"
}

/** Deterministic card order: `displayOrder` first, name as the tie-break. */
function byDisplayOrder(a: PricingPlan, b: PricingPlan): number {
  return a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)
}

export function toPricingCardView(plan: PricingPlan): PricingCardView {
  return {
    id: plan.id,
    name: orEmptyValue(plan.name),
    slug: plan.slug,
    description: orEmptyValue(plan.description),
    price: formatPrice(plan.priceAmount, plan.currency) ?? EMPTY_VALUE,
    periodLabel: getPeriodLabel(plan.billingPeriod),
    periodSuffix: getPeriodSuffix(plan.billingPeriod),
    compareAtPrice: formatPrice(plan.compareAtAmount, plan.currency),
    features: plan.features,
    ctaLabel: plan.ctaLabel?.trim() || DEFAULT_CTA_LABEL,
    ctaUrl: plan.ctaUrl,
    isPopular: plan.isPopular,
    section: resolveSection(plan),
  }
}

/** Groups a flat plan list into the sections the pricing page already renders. */
export function toPricingContent(plans: PricingPlan[]): PricingContent {
  const cards = [...plans].sort(byDisplayOrder).map(toPricingCardView)
  const inSection = (section: PricingSectionKey) => cards.filter((card) => card.section === section)

  return {
    // The basic block is a single hero card; extra basic plans are ignored by design.
    basic: inSection("basic")[0] ?? null,
    projects: inSection("project"),
    retainers: inSection("retainer"),
    addOns: inSection("addon"),
  }
}
