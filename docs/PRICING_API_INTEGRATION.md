# Pricing API Integration — Frontend Notes & Backend Gap List

**API documentation:** <https://claude.ai/code/artifact/1edb76ab-c680-40c3-a18b-9b6af264fda2>
**Page:** `/pricing` · **Status:** integrated, live on API data
**Related:** `docs/PRICING_PAGE_DATA.md` (full static-content inventory) · `docs/ADMIN_CMS_SPEC.md`

---

## 1. What changed

Every price, plan name, description, feature bullet and CTA on `/pricing` now comes from the
backend pricing module. All static `pricingPlans[]`, `monthlyPackages[]` and `addOnServices[]`
arrays were deleted from `app/pricing/page.tsx`. No fallback price list exists anywhere in the
codebase — if the API fails the page shows an error state, it never shows an invented price.

The visual design, spacing, colours, typography, icons, animations, section order and responsive
behaviour are unchanged.

---

## 2. Architecture

```
Browser ──GET {NEXT_PUBLIC_API_BASE_URL}/pricing?status=published──► RSNexus backend
                                        │
                                        ▼
                                lib/pricing/pricing.client.ts
                                        ▼
                                lib/pricing/pricing.mapper.ts   (normalise + group)
                                        ▼
                                hooks/use-pricing.ts
                                        ▼
                                components/pricing/*            (existing UI)
```

| File | Responsibility |
|---|---|
| `lib/api-client.ts` | Shared typed fetch wrapper: env base URL, envelope unwrapping, `ApiError` |
| `lib/pricing/pricing.types.ts` | API contract types + UI view-model types (kept separate) |
| `lib/pricing/pricing.client.ts` | The call the page makes: backend `/pricing`, base URL from the env var |
| `lib/pricing/pricing.format.ts` | `Intl` money formatting from minor units, period labels, `-` placeholder |
| `lib/pricing/pricing.mapper.ts` | Raw payload → typed plans → section grouping → card view models |
| `hooks/use-pricing.ts` | Loading / error / retry state for the page |
| `components/pricing/*.tsx` | The four card types, feature list, skeletons, error state, offer modal |

`lib/pricing/pricing.service.ts` and `app/api/pricing/route.ts` are the authenticated server-side
path (proxy + admin token). They are **not used by the page** now that the list route is public;
they are kept as the ready-made fallback if the route is ever put back behind auth. Delete both if
that is not wanted.

---

## 3. Environment variables

```env
# Base URL of the backend API, including the version segment. Never hardcoded.
NEXT_PUBLIC_API_BASE_URL=https://api.rsnexus.com/api/v1

# Only needed by the unused server-side path (app/api/pricing/route.ts).
# The pricing list route is public, so the page does not use this.
PRICING_API_ACCESS_TOKEN=
```

Both are documented in `.env.example`. `NEXT_PUBLIC_API_BASE_URL` is the single source of the API
host; there is no hardcoded URL anywhere in `lib/`, `hooks/`, `components/pricing/` or `app/pricing/`.

---

## 4. Request the site makes

```
GET {NEXT_PUBLIC_API_BASE_URL}/pricing
    ?status=published        ← fixed in code; drafts and archived plans never render
    &sortBy=displayOrder
    &sortOrder=asc
    &limit=100
    &page=1
Accept: application/json
```

No credentials — the route is public. `displayOrder` ties are broken by `name` so card order is
deterministic between loads.

---

## 5. Field mapping — API → existing UI

| UI element | API field | Notes |
|---|---|---|
| Card heading | `name` | |
| Card description / tagline | `description` | Optional — renders `-` when absent |
| Price | `priceAmount` + `currency` | Minor units, divided once inside `Intl.NumberFormat`. `en-IN` locale for `INR`, `en-US` otherwise |
| Basic card price range upper bound (`- ₹10,000`) | `compareAtAmount` | **Semantic mismatch** — see §6.2. Hidden entirely when `null` |
| Period text (`per project` / `per month`) | `billingPeriod` | `one_time → per project`, `monthly → per month`, `quarterly → per quarter`, `yearly → per year` |
| Add-on price suffix (`/month`) | `billingPeriod` | Empty for `one_time` |
| Feature bullets | `features[].label` | `included: false` renders struck through, never filtered out |
| "Most Popular" badge | `isPopular` | |
| Button label | `ctaLabel` | Optional — renders `-` when absent |
| Button destination | `ctaUrl` | Falls back to `/contact?plan={slug}` |
| React key | `id` | |
| Card order | `displayOrder` | Ascending, `name` as tie-break |
| **Which section a card appears in** | **none — derived** | See §6.1 |

---

## 6. Gap list — what the backend still needs to send

Anything the UI shows but the API does not provide currently renders the placeholder `-`
(`EMPTY_VALUE` in `lib/pricing/pricing.format.ts`), so gaps are visible on the page rather than
hidden behind invented values.

### 6.1 `category` — **blocking, highest priority**

The pricing page has four distinct sections; the API returns one flat list with **no grouping
field**. Until it does, `resolveSection()` in `lib/pricing/pricing.mapper.ts` guesses.

| Requested field | Type | Values |
|---|---|---|
| `category` | enum (string) | `basic` · `project` · `retainer` · `addon` |

Current temporary derivation, in order:

1. `category` / `section` / `planType` on the payload, if present (already read — ship the field and the heuristic stops running).
2. `slug`/`name` contains `basic` → **Basic Website Package**
3. `slug`/`name` contains `addon` / `add-on` → **Add-On Services**
4. `slug`/`name` contains `retainer` / `full-service`, or `billingPeriod` is recurring → **Monthly Retainer Packages**
5. Everything else → **Advanced Project Solutions**

Consequence today: a one-off add-on such as "Mobile App Development" is indistinguishable from a
project plan and lands in the wrong section unless `category` is sent.

### 6.2 `priceMaxAmount` — Basic Website Package price range

The basic card shows a range (`₹6,000 - ₹10,000`). The API has no upper-bound field, so
`compareAtAmount` is being borrowed for it — but that field means *strike-through / was-price*, so
the two uses will collide the moment a plan needs a genuine discount price.

| Requested field | Type | Notes |
|---|---|---|
| `priceMaxAmount` | integer \| null | Minor units, same currency as `priceAmount`, must be `> priceAmount` |

### 6.3 Fields in the contract that are currently empty in the data

These exist in the API contract but are absent on most rows, so the UI shows `-`:

| Field | Renders as `-` in |
|---|---|
| `description` | every card's sub-line |
| `ctaLabel` | every card's button, and the promo modal's primary button |
| `ctaUrl` | falls back to `/contact?plan={slug}` rather than `-` |

### 6.4 `icon` — not in the API

Card icons (`Zap`, `Star`, `Crown`) are still assigned by card position in
`app/pricing/page.tsx` (`PROJECT_PLAN_ICONS`), because an icon cannot render as `-`.

| Requested field | Type | Notes |
|---|---|---|
| `icon` | string \| null | lucide-react icon name, e.g. `Zap`. Front end keeps a safe default for unknown names |

### 6.5 Page copy — a different module, not the pricing API

Still hardcoded, and out of scope for the pricing plan endpoint: the page header (badge, `h1`,
sub-heading), each section's heading and blurb, the bottom CTA band, and the promo modal's fixed
copy (title, tagline, footnote, 2 s delay). These need a page-content endpoint — the full field
inventory is already written up in `docs/PRICING_PAGE_DATA.md` §1–§3, §8, §9.

The promo modal's **price and feature list** are no longer duplicated: it now reads the same basic
package the card renders, which closes the drift bug flagged in `PRICING_PAGE_DATA.md` §2.2.

### 6.6 `CORS_ALLOWED_ORIGINS` — **blocking, backend config only**

`GET /api/v1/pricing` is now public (no token required), so the browser calls it directly. But the
backend returns CORS headers **only for allow-listed origins**, and this site's origins are not on
the list. Verified against the live tunnel:

| Origin | `Access-Control-Allow-Origin` returned |
|---|---|
| `http://localhost:3000` | ✅ allowed |
| `http://localhost:3001` | ❌ blocked — **this site's dev port** |
| `https://rsnexus.in` | ❌ blocked |
| `https://www.rsnexus.in` | ❌ blocked |

The site's dev server runs on **3001** because the admin app already holds 3000, so the fetch is
blocked in the browser even though `curl` gets a 200. Fix, in the backend `.env` — no code change:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://rsnexus.in,https://www.rsnexus.in
```

The backend also sends `Cross-Origin-Resource-Policy: same-site` globally; if the request still
fails after the origins are added, that header has to allow cross-site reads for this route too.

---

## 7. Backend checklist (copy into the API repo)

- [ ] Add `category` to the pricing model, DTO, create/update schemas and the admin form — **blocks correct section grouping**
- [ ] Add `priceMaxAmount` (nullable, minor units) for range-priced packages
- [ ] Add `icon` (nullable lucide icon name)
- [ ] Backfill `description`, `ctaLabel`, `ctaUrl` on every published plan
- [ ] Add `http://localhost:3001`, `https://rsnexus.in`, `https://www.rsnexus.in` to `CORS_ALLOWED_ORIGINS` — **blocks the browser call today**
- [ ] Publish the remaining plans: 3 project solutions, 2 retainers, 6 add-ons (only the basic package is published, so three sections show their empty state)
- [ ] Separate endpoint for pricing page copy (header, section blurbs, CTA band, promo modal)

---

## 8. Page states

| State | What renders |
|---|---|
| Loading | Skeleton cards in the exact grid layout (1 basic, 3 project, 2 retainer, 6 add-on) |
| Error | The API's own message inside a dashed card, plus a **Try Again** button, per section. Headings and the CTA band stay |
| Empty section | "No plans are published for this section yet." No section is ever removed |
| Missing field | `-` |
| `priceAmount` null / bad currency | `-` |
| No features | Feature list omitted, card still renders |
| Malformed row | Dropped by the mapper; the rest of the page renders |

---

## 9. How to verify

1. `NEXT_PUBLIC_API_BASE_URL` set and reachable; the site's origin allow-listed on the backend (§6.6).
2. Open `/pricing` → the Network tab shows `GET {NEXT_PUBLIC_API_BASE_URL}/pricing?status=published&…`.
3. Change a plan's price in the admin panel and reload → the card shows the new price.
4. `grep -rn "₹" app/pricing components/pricing lib/pricing` returns nothing — no hardcoded prices remain.

### Verified against the live API on 2026-09-05

`GET /api/v1/pricing?status=published&limit=100` returns **1 published plan**, which maps to:

| Section | Result |
|---|---|
| Basic Website Package | `Basic Website For Startup` · **₹6,000 - ₹10,000** · 7 features · CTA `Get Start` → `https://www.rsnexus.in/contact?plan=basic-website&budget=6k-10k` |
| Advanced Project Solutions | empty state — nothing published |
| Monthly Retainer Packages | empty state — nothing published |
| Add-On Services | empty state — nothing published |
