import type { BillingPeriod } from "./pricing.types"

/** Rendered wherever the API has no value for a field the UI shows. */
export const EMPTY_VALUE = "-"

const LOCALE_BY_CURRENCY: Record<string, string> = {
  INR: "en-IN",
}

const PERIOD_LABEL: Record<BillingPeriod, string> = {
  one_time: "per project",
  monthly: "per month",
  quarterly: "per quarter",
  yearly: "per year",
}

const PERIOD_SUFFIX: Record<BillingPeriod, string> = {
  one_time: "",
  monthly: "/month",
  quarterly: "/quarter",
  yearly: "/year",
}

/** Returns the value when it is usable, otherwise the `-` placeholder. */
export function orEmptyValue(value: string | null | undefined): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : EMPTY_VALUE
}

/**
 * Formats a minor-unit amount. The API never returns a float, so this single
 * division at the render boundary is the only place money is converted.
 */
export function formatPrice(minorUnits: number | null | undefined, currency: string | null | undefined): string | null {
  if (typeof minorUnits !== "number" || !Number.isFinite(minorUnits)) return null

  const currencyCode = (currency ?? "").toUpperCase()
  if (!/^[A-Z]{3}$/.test(currencyCode)) return null

  try {
    return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currencyCode] ?? "en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(minorUnits / 100)
  } catch {
    return null
  }
}

export function getPeriodLabel(billingPeriod: BillingPeriod): string {
  return PERIOD_LABEL[billingPeriod]
}

export function getPeriodSuffix(billingPeriod: BillingPeriod): string {
  return PERIOD_SUFFIX[billingPeriod]
}
