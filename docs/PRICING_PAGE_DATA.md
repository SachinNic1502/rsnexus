# Pricing Page — Complete Static Data Extract & Admin Data-Entry Spec

**Page:** `/pricing`
**Source files:** `app/pricing/page.tsx` (490 lines, `"use client"`) · `app/pricing/layout.tsx` (45 lines — SEO + JSON-LD)
**Status today:** 100% hardcoded. No JSON file, no DB, no API. Every value below is a string literal inside the `.tsx`.
**Purpose:** give the admin/CMS team the complete inventory of every editable value on the pricing page, in fill-in-ready tables, plus field types, validation rules, the target data model and the API contract needed to make each value editable.

Related: `docs/ADMIN_CMS_SPEC.md` §5 (summary version), §8 (data model), §10.6 (known enum bug).

---

## 0. Content inventory at a glance

| # | Block | Type | Items | Source lines | Admin sub-screen |
|---|---|---|---|---|---|
| 1 | SEO metadata + JSON-LD | object | 1 | `layout.tsx:4-45` | Pricing → SEO |
| 2 | Promo modal (auto-opens) | object + 7 features | 1 | `page.tsx:176-252` | Pricing → Promo modal |
| 3 | Page header | object | 1 | `page.tsx:266-278` | Pricing → Header |
| 4 | Basic Website Package (hero card) | object + 7 features | 1 | `page.tsx:281-350` | Pricing → Basic package |
| 5 | Project plans `pricingPlans[]` | repeater | 3 | `page.tsx:11-78` | Pricing → Plans |
| 6 | Monthly retainers `monthlyPackages[]` | repeater | 2 | `page.tsx:114-143` | Pricing → Retainers |
| 7 | Add-on services `addOnServices[]` | repeater | 6 | `page.tsx:81-111` | Pricing → Add-ons |
| 8 | Bottom CTA band | object | 1 | `page.tsx:467-484` | Pricing → CTA |
| 9 | Behaviour / routing rules | config | — | `page.tsx:145-175` | Pricing → Settings |

**Totals:** 13 priced items · 44 feature bullets (7 of them duplicated) · 8 CTA buttons · 6 headings · 5 body paragraphs.

---

## 1. SEO metadata — `app/pricing/layout.tsx`

Admin screen: **Pricing → SEO tab**

| # | Field | Type | Limit | Current value |
|---|---|---|---|---|
| 1.1 | `title` | text | 60 | `Pricing & Plans \| RSNexus Software Development` |
| 1.2 | `description` | textarea | 160 | `Explore transparent pricing plans for RSNexus software development services, including startup websites, advanced web apps, and enterprise solutions.` |
| 1.3 | `alternates.canonical` | url | — | `https://rsnexus.in/pricing` |
| 1.4 | `openGraph.title` | text | 60 | same as 1.1 |
| 1.5 | `openGraph.description` | textarea | 160 | same as 1.2 |
| 1.6 | `openGraph.url` | url | — | `https://rsnexus.in/pricing` |
| 1.7 | `openGraph.type` | select | — | `website` |
| 1.8 | `twitter.card` | select | — | `summary_large_image` |
| 1.9 | `twitter.title` | text | 60 | same as 1.1 |
| 1.10 | `twitter.description` | textarea | 160 | same as 1.2 |
| 1.11 | JSON-LD breadcrumb 1 | text + url | — | `Home` → `https://rsnexus.in` |
| 1.12 | JSON-LD breadcrumb 2 | text + url | — | `Pricing` → `https://rsnexus.in/pricing` |

> **Gap:** the page emits **only a breadcrumb** — no `Product` / `Offer` / `PriceSpecification` JSON-LD. Generating `Offer` schema from the plan rows is the highest-value SEO improvement on this page (§12.3).
> **Gap:** no per-route OG image; it falls back to the global logo. Add an `ogImage` field (1200×630).

---

## 2. Promo modal — auto-opens 2 seconds after page load

Source: `page.tsx:145-152` (timer), `page.tsx:176-252` (markup). Admin screen: **Pricing → Promo modal**

### 2.1 Modal settings

| # | Field | Type | Current value | Notes |
|---|---|---|---|---|
| 2.1.1 | `enabled` | boolean | `true` — always on, no flag exists | Add a real toggle |
| 2.1.2 | `delayMs` | number | `2000` | ms after page load |
| 2.1.3 | `showOncePerSession` | boolean | **not implemented** — fires on every visit | Recommended new field |
| 2.1.4 | `icon` | icon | `Zap` (yellow-500) | lucide-react name |
| 2.1.5 | `title` | text | `Special Startup Offer` | |
| 2.1.6 | `packageName` | text | `Basic Website Package` | |
| 2.1.7 | `priceDisplay` | text | `₹6,000 - ₹10,000` | A range — must stay a string |
| 2.1.8 | `tagline` | text | `Perfect for startups & small businesses` | |
| 2.1.9 | `featuresHeading` | text | `What's Included:` | |
| 2.1.10 | `primaryCta.label` | text | `Get This Offer - ₹6,000` | Price is baked into the label |
| 2.1.11 | `primaryCta.target` | url | `/contact?plan=basic-website&budget=6k-10k` | Fires after a 1.5 s toast delay |
| 2.1.12 | `primaryCta.toastTitle` | text | `Basic Website Selected!` | |
| 2.1.13 | `primaryCta.toastBody` | text | `Redirecting to contact form for your 5-6 page website...` | |
| 2.1.14 | `secondaryCta.label` | text | `View All Plans` | Closes the modal only — no navigation |
| 2.1.15 | `footnote` | text | `* Price varies based on specific requirements. Contact us for exact quote.` | |
| 2.1.16 | Header gradient | select | `green-500 → blue-500` | Theme token, optional in admin |

### 2.2 Modal feature list — `features[]`, 7 items

| # | Feature |
|---|---|
| 1 | 5-6 Page Responsive Website |
| 2 | Mobile-First Design |
| 3 | Contact Form Integration |
| 4 | Basic SEO Setup |
| 5 | SSL Certificate |
| 6 | 1 Month Support |
| 7 | 2 Revision Rounds |

> ⚠️ **Duplication:** these exact 7 strings are hardcoded twice — `page.tsx:210-241` (modal) and `page.tsx:313-339` (Basic Website card, §4.2). In the CMS store them **once** on the Basic Website package and have the modal reference them. Editing in two places is a guaranteed drift bug.

---

## 3. Page header

Source: `page.tsx:266-278`. Admin screen: **Pricing → Header**

| # | Field | Type | Current value |
|---|---|---|---|
| 3.1 | `badge` | text | `Pricing Plans` |
| 3.2 | `h1` | text | `Choose Your Perfect Plan` |
| 3.3 | `subheading` | textarea | `Transparent pricing for every business size worldwide. No hidden fees, no surprises. Get exactly what you need to succeed in the global market.` |

---

## 4. Basic Website Package — highlighted card

Source: `page.tsx:281-350`. Admin screen: **Pricing → Basic package**

### 4.1 Section + card fields

| # | Field | Type | Current value |
|---|---|---|---|
| 4.1.1 | `sectionBadge` | text | `Most Popular for Startups` |
| 4.1.2 | `sectionHeading` | text | `Basic Website Package` |
| 4.1.3 | `sectionBody` | textarea | `Perfect for startups and small businesses who need a professional online presence quickly and affordably.` |
| 4.1.4 | `card.icon` | icon | `Zap` |
| 4.1.5 | `card.title` | text | `Basic Website` |
| 4.1.6 | `card.priceMin` | text / number | `₹6,000` |
| 4.1.7 | `card.priceMax` | text / number | `₹10,000` |
| 4.1.8 | `card.subtitle` | text | `5-6 page responsive website for startups` |
| 4.1.9 | `card.cta.label` | text | `Get Started - ₹6,000` |
| 4.1.10 | `card.cta.target` | url | `/contact?plan=basic-website&budget=6k-10k` |
| 4.1.11 | `card.accentColor` | select | green (`border-2 border-green-500`, price in `green-600`) |

### 4.2 Card feature list — 7 items

| # | Feature |
|---|---|
| 1 | 5-6 Page Responsive Website |
| 2 | Mobile-First Design |
| 3 | Contact Form Integration |
| 4 | Basic SEO Setup |
| 5 | SSL Certificate |
| 6 | 1 Month Support |
| 7 | 2 Revision Rounds |

Identical to §2.2 — one source record in the CMS.

---

## 5. Project plans — `pricingPlans[]` (3 items)

Source: `page.tsx:11-78`. Section heading `Advanced Project Solutions` (`page.tsx:351`). Admin screen: **Pricing → Plans**

### 5.1 Plan attributes

| # | Field | Type | Req | Starter | Professional | Enterprise |
|---|---|---|---|---|---|---|
| 5.1.1 | `order` | number | ✅ | 1 | 2 | 3 |
| 5.1.2 | `icon` | icon | ✅ | `Zap` | `Star` | `Crown` |
| 5.1.3 | `name` | text | ✅ | Starter | Professional | Enterprise |
| 5.1.4 | `price` | text | ✅ | ₹49,999 | ₹1,25,999 | ₹3,99,999 |
| 5.1.5 | `period` | text | ✅ | per project | per project | per project |
| 5.1.6 | `description` | textarea | ✅ | Perfect for small businesses and startups looking to establish their digital presence worldwide. | Comprehensive solution for growing businesses needing advanced functionality worldwide. | Full-scale solution for large organizations requiring complex systems globally. |
| 5.1.7 | `features[]` | repeater(text) | ✅ | 8 items (§5.2) | 12 items (§5.3) | 14 items (§5.4) |
| 5.1.8 | `popular` | boolean | ✅ | false | **true** | false |
| 5.1.9 | `cta` | text | ✅ | Get Started | Most Popular | Contact Sales |
| 5.1.10 | `ctaTarget` | url | auto | `/contact?plan=starter` | `/contact?plan=professional` | `/contact?plan=enterprise` |

**Behaviour to preserve**

- `popular: true` renders the "Most Popular" ribbon (`page.tsx:359-363`) and scales the card (`scale-105`). **Validation: at most one plan may be popular.**
- Every plan CTA runs `handlePlanSelect(plan.name)` → toast `Plan Selected!` / `You've selected the {name} plan. Redirecting to contact form...` → after 1500 ms `router.push("/contact?plan=" + name.toLowerCase())`.
- `cta` on Professional is the marketing string "Most Popular", not an action verb — kept as-is, but it is free text.

### 5.2 Starter — features (8)

| # | Feature |
|---|---|
| 1 | Responsive Website (up to 5 pages) |
| 2 | Basic SEO Optimization |
| 3 | Contact Form Integration |
| 4 | Mobile-First Design |
| 5 | 3 Months Support |
| 6 | Basic Analytics Setup |
| 7 | SSL Certificate |
| 8 | 2 Revision Rounds |

### 5.3 Professional — features (12)

| # | Feature |
|---|---|
| 1 | Custom Web Application |
| 2 | Advanced SEO & Performance |
| 3 | User Authentication System |
| 4 | Database Integration |
| 5 | API Development |
| 6 | 6 Months Support |
| 7 | Advanced Analytics |
| 8 | Payment Gateway Integration (Stripe/PayPal) |
| 9 | Admin Dashboard |
| 10 | 5 Revision Rounds |
| 11 | Content Management System |
| 12 | Email Marketing Integration |

### 5.4 Enterprise — features (14)

| # | Feature |
|---|---|
| 1 | Full Stack Application |
| 2 | Microservices Architecture |
| 3 | Cloud Infrastructure Setup (AWS/Azure) |
| 4 | Advanced Security Features |
| 5 | Third-party Integrations |
| 6 | 12 Months Support |
| 7 | Performance Monitoring |
| 8 | Load Balancing |
| 9 | Automated Testing |
| 10 | DevOps Pipeline |
| 11 | Unlimited Revisions |
| 12 | 24/7 Priority Support |
| 13 | Training & Documentation |
| 14 | Scalability Planning |

---

## 6. Monthly retainer packages — `monthlyPackages[]` (2 items)

Source: `page.tsx:114-143`. Admin screen: **Pricing → Retainers**

### 6.1 Section copy

| # | Field | Type | Current value |
|---|---|---|---|
| 6.1.1 | `sectionHeading` | text | `Monthly Retainer Packages` |
| 6.1.2 | `sectionBody` | textarea | `For businesses worldwide that need ongoing development support and want to build long-term partnerships.` |

### 6.2 Package attributes

| # | Field | Type | Req | Development Retainer | Full-Service Package |
|---|---|---|---|---|---|
| 6.2.1 | `order` | number | ✅ | 1 | 2 |
| 6.2.2 | `name` | text | ✅ | Development Retainer | Full-Service Package |
| 6.2.3 | `price` | text | ✅ | ₹79,999 | ₹1,49,999 |
| 6.2.4 | `period` | text | ✅ | per month | per month |
| 6.2.5 | `description` | textarea | ✅ | Ongoing development support for your growing global business. | Complete digital solution with dedicated team support worldwide. |
| 6.2.6 | `features[]` | repeater(text) | ✅ | 6 items (§6.3) | 7 items (§6.4) |
| 6.2.7 | `cta` | text | — | **hardcoded** `Start Retainer` | **hardcoded** `Start Retainer` |
| 6.2.8 | `icon` | icon | — | **none** — retainer cards render no icon | Add for parity with plans |
| 6.2.9 | `popular` | boolean | — | **not supported** on retainers | Consider adding |

> The retainer CTA label is not per-item today (`page.tsx:433`). Expose it as a field so the two cards can differ.
> CTA behaviour is the same `handlePlanSelect(pkg.name)` → `/contact?plan=development retainer` — note the **space** in the value (§10.1).

### 6.3 Development Retainer — features (6)

| # | Feature |
|---|---|
| 1 | 40 hours of development time |
| 2 | Priority support |
| 3 | Monthly strategy calls |
| 4 | Performance monitoring |
| 5 | Security updates |
| 6 | Feature enhancements |

### 6.4 Full-Service Package — features (7)

| # | Feature |
|---|---|
| 1 | 80 hours of development time |
| 2 | Dedicated project manager |
| 3 | Weekly progress reports |
| 4 | Advanced analytics |
| 5 | 24/7 monitoring |
| 6 | Unlimited minor updates |
| 7 | Marketing automation |

---

## 7. Add-on services — `addOnServices[]` (6 items)

Source: `page.tsx:81-111`. Admin screen: **Pricing → Add-ons**

### 7.1 Section copy

| # | Field | Type | Current value |
|---|---|---|---|
| 7.1.1 | `sectionHeading` | text | `Add-On Services` |
| 7.1.2 | `sectionBody` | textarea | `Enhance your project with additional features and services tailored to diverse market needs.` |

### 7.2 Add-on rows

| # | `name` (text, req) | `price` (text, req) | `description` (textarea, req) | Click target |
|---|---|---|---|---|
| 1 | Mobile App Development | ₹49,999 | iOS and Android app development for global users | `/contact?plan=mobile app development` |
| 2 | AI Integration | ₹49,999 | Custom AI features and chatbots for multiple languages | `/contact?plan=ai integration` |
| 3 | Advanced Analytics | ₹29,999 | Custom dashboards and reporting | `/contact?plan=advanced analytics` |
| 4 | E-commerce Setup | ₹39,999 | Full online store with global payment gateways | `/contact?plan=e-commerce setup` |
| 5 | Maintenance Package | ₹9,999/month | Ongoing updates and support | `/contact?plan=maintenance package` |
| 6 | Performance Optimization | ₹19,999 | Speed and SEO improvements | `/contact?plan=performance optimization` |

Notes for the admin form:

- No `icon`, no `order`, no `popular` field exists — grid order equals array order. Add `order: number`.
- **The whole card is clickable** (`page.tsx:452-456`), not a button — there is no visible CTA label to edit.
- `Maintenance Package` is the only recurring add-on, and its recurrence is encoded inside the price string (`₹9,999/month`). Model it as `amount: 9999` + `period: "per month"` instead.

---

## 8. Bottom CTA band

Source: `page.tsx:467-484`. Admin screen: **Pricing → CTA**

| # | Field | Type | Current value |
|---|---|---|---|
| 8.1 | `heading` | text | `Ready to Get Started?` |
| 8.2 | `body` | textarea | `Choosing the right plan can be tricky — let's connect to understand your project and deliver the perfect solution.` |
| 8.3 | `primaryCta.label` | text | `Schedule Free Consultation` |
| 8.4 | `primaryCta.target` | url | `/contact?type=consultation` |
| 8.5 | `secondaryCta.label` | text | `Contact Sales Team` |
| 8.6 | `secondaryCta.target` | url | `/contact?type=sales` |
| 8.7 | `footnote` | text | `✓ Free consultation • ✓ Custom quotes available • ✓ Flexible payment terms • ✓ Market-focused solutions` |

> The footnote is duplicated in `components/cta-section.tsx` (home page) — store once as a shared snippet.
> The body copy uses a typographic apostrophe and an em dash; keep that encoding intact in the CMS.

---

## 9. Complete price sheet (single view for sales/finance)

| # | Item | Category | Price (display) | Amount (INR) | Period | Highlighted |
|---|---|---|---|---|---|---|
| 1 | Basic Website | Entry package | ₹6,000 – ₹10,000 | 6000–10000 | per project | Badged "Most Popular for Startups" |
| 2 | Starter | Project plan | ₹49,999 | 49999 | per project | — |
| 3 | Professional | Project plan | ₹1,25,999 | 125999 | per project | ✅ Most Popular |
| 4 | Enterprise | Project plan | ₹3,99,999 | 399999 | per project | — |
| 5 | Development Retainer | Retainer | ₹79,999 | 79999 | per month | — |
| 6 | Full-Service Package | Retainer | ₹1,49,999 | 149999 | per month | — |
| 7 | Mobile App Development | Add-on | ₹49,999 | 49999 | one-time | — |
| 8 | AI Integration | Add-on | ₹49,999 | 49999 | one-time | — |
| 9 | Advanced Analytics | Add-on | ₹29,999 | 29999 | one-time | — |
| 10 | E-commerce Setup | Add-on | ₹39,999 | 39999 | one-time | — |
| 11 | Maintenance Package | Add-on | ₹9,999/month | 9999 | per month | — |
| 12 | Performance Optimization | Add-on | ₹19,999 | 19999 | one-time | — |

Currency: **INR only**, despite the "worldwide / global market" copy used throughout the page (§10.4).

---

## 10. Issues the admin build must resolve

| # | Issue | Where | Impact | Fix |
|---|---|---|---|---|
| 10.1 | `?plan=` values don't match the contact form's Service dropdown | `page.tsx:161`, `app/contact/page.tsx:231-240` | Pricing pushes `basic-website`, `mobile app development`, `development retainer`, …; the select only accepts `website, fullstack, mobile, design, cloud, ai, consultation, starter, professional, enterprise`. Unmatched values land in the form as an unselectable value | Give every priced item a `contactServiceValue` bound to the shared enum |
| 10.2 | Prices are display strings, not numbers | all blocks | No sorting, no currency switch, no comparison table, no `Offer` schema | Store `amount:number` + `currency` + `period`; keep `priceOverrideText` for ranges |
| 10.3 | Basic Website features duplicated | `page.tsx:210-241` and `313-339` | Editing one leaves the other stale | One record, rendered twice |
| 10.4 | INR-only prices with global copy | all blocks | Overseas visitors see only ₹ | Add `currency` + optional multi-currency table |
| 10.5 | Promo modal has no dismissal memory | `page.tsx:145-152` | Reopens on every page view, including for returning visitors | Add `showOncePerSession` / cookie |
| 10.6 | Promo modal has no schedule | §2.1 | Seasonal offers require a code deploy | Add `startsAt` / `endsAt` |
| 10.7 | Price baked into CTA labels | `Get This Offer - ₹6,000`, `Get Started - ₹6,000` | A price change means editing 3 strings | Template the label: `Get Started - {priceMin}` |
| 10.8 | Retainer CTA label hardcoded | `page.tsx:433` | Not editable per card | Add a `cta` field |
| 10.9 | Add-on cards have no `order` | `page.tsx:81-111` | Reordering needs a code change | Add `order:number` |
| 10.10 | No `Product` / `Offer` JSON-LD | `layout.tsx` | Missing rich results on a pricing page | Auto-generate from plan rows |
| 10.11 | No per-block enable/disable | whole page | Sections can't be hidden temporarily | Add `enabled:boolean` per block |
| 10.12 | No draft/publish state | whole page | Price edits go live instantly | Draft + preview + publish |

---

## 11. Target data model — `pricing` collection

One document, `id: "pricing"`. Field types use the vocabulary in `docs/ADMIN_CMS_SPEC.md` §0.4.

```jsonc
{
  "seo": {
    "title": "text(60)", "description": "textarea(160)", "canonical": "url",
    "ogTitle": "text", "ogDescription": "textarea", "ogImage": "image", "ogType": "select",
    "twitterCard": "select", "twitterTitle": "text", "twitterDescription": "textarea"
  },
  "promoModal": {
    "enabled": "boolean", "delayMs": "number", "showOncePerSession": "boolean",
    "startsAt": "date", "endsAt": "date",
    "icon": "icon", "title": "text", "packageRef": "ref(basicPackage)",
    "primaryCta": { "label": "text", "target": "url", "toastTitle": "text", "toastBody": "text" },
    "secondaryCta": { "label": "text" },
    "footnote": "text"
  },
  "header": { "badge": "text", "h1": "text", "subheading": "textarea" },
  "basicPackage": {
    "enabled": "boolean", "sectionBadge": "text", "sectionHeading": "text", "sectionBody": "textarea",
    "icon": "icon", "title": "text",
    "priceMin": "number", "priceMax": "number", "currency": "select", "period": "text",
    "priceOverrideText": "text", "subtitle": "text",
    "features": ["text"],
    "cta": { "labelTemplate": "text", "target": "url" },
    "contactServiceValue": "select(enum)"
  },
  "plans": [{
    "id": "slug", "order": "number", "enabled": "boolean", "icon": "icon", "name": "text",
    "amount": "number", "currency": "select", "period": "text", "priceOverrideText": "text",
    "description": "textarea", "features": ["text"], "popular": "boolean",
    "cta": "text", "contactServiceValue": "select(enum)"
  }],
  "retainers": [{
    "id": "slug", "order": "number", "enabled": "boolean", "icon": "icon", "name": "text",
    "amount": "number", "currency": "select", "period": "text",
    "description": "textarea", "features": ["text"], "cta": "text",
    "contactServiceValue": "select(enum)"
  }],
  "addOns": [{
    "id": "slug", "order": "number", "enabled": "boolean", "name": "text",
    "amount": "number", "currency": "select", "period": "text", "priceOverrideText": "text",
    "description": "textarea", "contactServiceValue": "select(enum)"
  }],
  "sections": {
    "plans":     { "heading": "text", "body": "textarea" },
    "retainers": { "heading": "text", "body": "textarea" },
    "addOns":    { "heading": "text", "body": "textarea" }
  },
  "bottomCta": {
    "heading": "text", "body": "textarea",
    "primaryCta": { "label": "text", "target": "url" },
    "secondaryCta": { "label": "text", "target": "url" },
    "footnote": "text"
  }
}
```

### 11.1 Validation rules the admin form must enforce

| # | Rule |
|---|---|
| 1 | Exactly **one** plan may have `popular: true` |
| 2 | `amount` > 0; `priceMax` ≥ `priceMin` |
| 3 | Every plan and retainer needs ≥ 1 feature (add-ons exempt) |
| 4 | `name` unique within its list; `id`/slug unique and immutable once published |
| 5 | `contactServiceValue` must exist in the contact-form Service enum (`ADMIN_CMS_SPEC.md` §8.2) |
| 6 | `icon` must resolve in the lucide-react registry (`ADMIN_CMS_SPEC.md` §8.4) |
| 7 | `seo.title` ≤ 60 and `seo.description` ≤ 160 chars, with live counters |
| 8 | Every `target` is a relative path starting `/` or an absolute `https://` URL |
| 9 | `delayMs` between 0 and 15000 |
| 10 | `endsAt` > `startsAt` when both are set |
| 11 | Unsaved-changes guard, plus preview before publish |

### 11.2 API contract

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/admin/pricing` | Load the full document into the editor |
| `PUT` | `/api/admin/pricing` | Save the full document (validated server-side) |
| `POST` | `/api/admin/pricing/items` | Create a plan / retainer / add-on |
| `PATCH` | `/api/admin/pricing/items/:id` | Update a single item |
| `DELETE` | `/api/admin/pricing/items/:id` | Soft-delete (retain for audit) |
| `POST` | `/api/revalidate` | `{ "path": "/pricing" }` after publish |

---

## 12. Migration path (hardcoded → editable)

| Step | Action |
|---|---|
| 12.1 | Move every array and inline string out of `app/pricing/page.tsx` into `data/pricing.json` using the §11 shape. **No visual change** — verify a pixel-identical render first. |
| 12.2 | Point the page at the JSON, collapse the two duplicated feature lists into one reference, and template the price-bearing CTA labels. |
| 12.3 | Add `Product` / `Offer` JSON-LD to `app/pricing/layout.tsx`, generated from the plan rows. |
| 12.4 | Swap the JSON import for a DB fetch with `revalidate`, and build the Pricing admin screen against §11. |
| 12.5 | Align `contactServiceValue` across pricing and the contact form select, closing §10.1. |

---

## 13. Blank data-entry template

Copy one block per item when the admin enters new pricing.

**Plan / retainer**

| Field | Value |
|---|---|
| Order | |
| Enabled | ☐ |
| Icon (lucide name) | |
| Name | |
| Amount (number) | |
| Currency | INR |
| Period | per project / per month |
| Price override text (ranges only) | |
| Description (1–2 sentences) | |
| Features (one per line) | |
| Popular (max one across plans) | ☐ |
| CTA label | |
| Contact service value | |

**Add-on**

| Field | Value |
|---|---|
| Order | |
| Enabled | ☐ |
| Name | |
| Amount / Period | |
| Description (≤ 90 chars) | |
| Contact service value | |
