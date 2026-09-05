# RSNexus — Admin Panel / CMS Specification

**Audience:** the team building the RSNexus admin panel
**Source of truth:** the public site at `d:\RSNexus\rsnexus` (Next.js 16 App Router, React 19, Tailwind, shadcn/ui)
**Version:** 1.0 — generated from branch `features/improvesite`

---

## 0. Read this first

### 0.1 Current state of the admin side

**There is no admin application in this repository.** The audit covered `app/`, `components/`, `data/`, `lib/`, `hooks/`:

| Looked for | Result |
|---|---|
| `app/admin/**` route group | Does not exist |
| Auth (NextAuth / Clerk / custom session) | None |
| Database / ORM (Prisma, Drizzle, Mongoose) | None — no dependency, no schema |
| Admin API routes | Only `app/api/contact/route.ts` (sends an email, stores nothing) |
| CMS integration (Sanity / Strapi / Payload) | None |
| Content storage | Static JSON in `data/` + hardcoded arrays inside `.tsx` files |

So this document is a **build-from-zero spec**: every editable string, image, link and list on every public page, where it lives now, and what the admin UI must expose.

### 0.2 The two content tiers

| Tier | Where it lives now | Admin work required |
|---|---|---|
| **Tier A — JSON-backed** | `data/projects.json`, `data/blog.json`, `data/team.json`, `data/faq.json`, `data/testimonial.json` | Already structured. Build CRUD screens; keep the same field names so the site keeps working unchanged. |
| **Tier B — hardcoded in components** | Hero copy, services, pricing plans, process steps, values, trust signals, contact details, nav, footer | Must first be **extracted** into JSON/DB (see §9). Until then the admin UI has nothing to write to. |

### 0.3 Publishing model — decide before building screens

The site imports JSON at **build time** (`import data from "@/data/x.json"`). Editing content therefore requires one of:

1. **Git-commit model** — admin writes JSON back to the repo and triggers a deploy. Simple, versioned, slow (~1–2 min per publish).
2. **DB + ISR model (recommended)** — content in a database, pages fetch with `revalidate`, admin calls `POST /api/revalidate` after save. Near-instant, needs a DB.

§8 gives the API contract for option 2.

### 0.4 Field-type vocabulary used in this doc

`text` (single line) · `textarea` · `richtext` · `url` · `email` · `phone` · `image` (Cloudinary URL) · `select` · `boolean` · `number` · `date` · `tags` (string list) · `repeater` (ordered list of objects) · `icon` (name from a fixed lucide-react registry) · `slug`

---

## 1. Site map — every route

| # | Route | File | Rendering | Content source | Admin screen |
|---|---|---|---|---|---|
| 1 | `/` | `app/page.tsx` | Static | 8 components: mostly hardcoded + `projects.json`, `team.json` | Home page builder |
| 2 | `/services` | `app/services/page.tsx` | Static | Hardcoded `services[]` (6) | Services |
| 3 | `/pricing` | `app/pricing/page.tsx` | Client | Hardcoded plans / add-ons / packages | Pricing |
| 4 | `/about` | `app/about/page.tsx` | Client | Hardcoded + `team.json` | About |
| 5 | `/team` | `app/team/page.tsx` | Client | `team.json` | Team |
| 6 | `/portfolio` | `app/portfolio/page.tsx` | Client | `projects.json` | Portfolio |
| 7 | `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | Client | `projects.json` | Portfolio → item |
| 8 | `/blog` | `app/blog/page.tsx` | Static | `blog.json` | Blog |
| 9 | `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Client | `blog.json` | Blog → post |
| 10 | `/faq` | `app/faq/page.tsx` | Client | `faq.json` — items **5 onward** | FAQ |
| 11 | `/contact` | `app/contact/page.tsx` | Client | Hardcoded + `faq.json` items **1–4** | Contact + Leads |
| 12 | `/api/contact` | `app/api/contact/route.ts` | POST | — | Leads / email settings |
| 13 | `/sitemap.xml` | `app/sitemap.ts` | Generated | static routes + projects + blog | Auto — no UI needed |
| 14 | `/robots.txt` | `app/robots.ts` | Generated | static | Optional UI |

**Not in the main nav:** `/blog` and `/faq` are reachable only from the footer. The nav has 7 items (§2.3).

Every route except `/` has a sibling `layout.tsx` holding its SEO metadata and JSON-LD. **Each admin page-editor screen must include an "SEO" tab** writing to that layout (§7).

---

## 2. Global content (every page)

### 2.1 Site settings — `app/layout.tsx`

Admin screen: **Settings → Site**

| Field | Type | Current value | Notes |
|---|---|---|---|
| `metadataBase` | url | `https://rsnexus.in` | Base for all relative URLs |
| `title.default` | text (≤60) | `RSNexus - Leading Software Development Company in India` | Used when a page sets no title |
| `title.template` | text | `%s \| RSNexus` | `%s` placeholder is required — validate |
| `description` | textarea (≤160) | see file | |
| `keywords` | tags | **~200 keywords** | Grouped in-file: brand, service, industry, country, city, hiring, long-tail. Admin needs a bulk tag editor with group labels |
| `authors[].name` / `.url` | repeater | `RSNexus Team` / site URL | |
| `creator`, `publisher` | text | `RSNexus` | |
| `robots.index` / `.follow` | boolean | true / true | googleBot: `max-video-preview: -1`, `max-image-preview: large`, `max-snippet: -1` |
| `alternates.canonical` | url | `https://rsnexus.in` | Per-page override exists |
| `openGraph.title` | text | `RSNexus - Software Development Experts in India` | |
| `openGraph.description` | textarea | see file | |
| `openGraph.url` / `.siteName` | url / text | site URL / `RSNexus` | |
| `openGraph.images[0]` | image | Cloudinary `baby_logo_e55lkq.png` | 512×512, alt `RSNexus Logo` |
| `openGraph.locale` / `.type` | select | `en_IN` / `website` | |
| `twitter.card` | select | `summary_large_image` | |
| `twitter.title` / `.description` / `.images[]` / `.creator` | text / textarea / image / text | see file / `@RSNexus` | |
| `verification.google` | text | `googleca875dd608b6a676` | Also emitted as a raw `<meta>` tag — write both |
| `icons.icon` / `.apple` / `.shortcut` | image | same Cloudinary logo | |
| `<meta theme-color>` | color | `#ffffff` | |
| `<meta color-scheme>` | text | `dark light` | |
| Default theme | select | `dark` | `ThemeProvider defaultTheme="dark"` |

### 2.2 Business profile / structured data — `app/layout.tsx`

Admin screen: **Settings → Business profile**. Feeds JSON-LD `WebSite`, `Organization`, `BreadcrumbList`.

| Field | Type | Current value |
|---|---|---|
| Organization name | text | RSNexus |
| URL | url | https://rsnexus.in |
| Logo | image | Cloudinary `baby_logo_e55lkq.png` |
| `sameAs[]` | repeater(url) | linkedin.com/company/rsnexus · twitter.com/RSNexus · facebook.com/RSNexus |
| contactPoint.telephone | phone | +91-9309931886 |
| contactPoint.contactType | text | customer support |
| contactPoint.email | email | sachinrathodnic1@gmail.com |
| contactPoint.areaServed | text | IN |
| contactPoint.availableLanguage[] | tags | English, Hindi, Marathi |
| address.addressLocality | text | Mumbai |
| address.addressRegion | text | Maharashtra |
| address.postalCode | text | 400001 |
| address.addressCountry | text | IN |

> **Data conflict — resolve in the admin model.** The site shows four different phone numbers and two different emails across surfaces (§10.1). The admin should store **one canonical contact record** that every surface reads from.

### 2.3 Navigation — `components/navigation.tsx`

Admin screen: **Settings → Navigation**

- **Logo image** (url, rendered 32×32): Cloudinary `Logo_z7appo.png`
- **Brand text:** `RSNexus`
- **Menu** — ordered repeater of `{ name, href }` (drag to reorder): Home `/` · Services `/services` · Pricing `/pricing` · About `/about` · Team `/team` · Portfolio `/portfolio` · Contact `/contact`
- **CTA button:** label `Get Started`, target `/contact`

Active-link highlighting is by exact `pathname` match — admin hrefs must be exact paths, no trailing slash.

### 2.4 Footer — `components/footer.tsx`

Admin screen: **Settings → Footer**

| Block | Fields |
|---|---|
| Brand | logo url, name `RSNexus`, description paragraph |
| Contact lines | email `sr.nexus.it@gmail.com`; location line `At present, we work entirely remotely without a physical office.` A phone line and a Mumbai address line exist but are **commented out** — expose both as toggles |
| Column *Services* | 6 links → `/services#website`, `#fullstack`, `#mobile`, `#design`, `#cloud`, `#ai` (⚠️ these anchors do **not** exist on the services page — §10.2) |
| Column *Company* | About Us `/about` · Our Team `/team` · Blog `/blog` (Careers commented out) |
| Column *Support* | Contact `/contact` · FAQ `/faq` (Privacy Policy, Terms of Service commented out) |
| Social | Instagram `instagram.com/rs.nexus` · Facebook `facebook.com/profile.php?id=61580499203785` (GitHub commented out). Row = `{ name, href, icon }` |
| Copyright | `© 2025 RSNexus India. All rights reserved.` — make it a template with an auto-year token |

### 2.5 Floating WhatsApp button — `components/whatsapp-float-button.tsx`

Rendered **only on the home page**. Fields: phone `919309931886` (digits only, no `+`), aria-label, brand colour `#25D366`, enabled toggle, "show on pages" multi-select.

---

## 3. Page: Home — `/`

`app/page.tsx` renders 8 sections in a fixed order. `GlobeShowcase` is imported but **commented out**.

**Page-level SEO** (overrides the root layout):
`title` = `Software Development Company in India | RSNexus`, `description` = see file, `canonical` = `https://rsnexus.in`.

**Admin UI recommendation:** a section list with per-section enable/disable + drag ordering, each section opening its own field form. Sections are fixed *types* (not free-form blocks) — the layouts are bespoke.

### 3.1 Hero — `components/hero-section.tsx`

| Field | Type | Current value |
|---|---|---|
| `badge` | text | Elite Software Development Team (rendered twice: mobile above globe, desktop inline) |
| `headingLine1` | text | Transform Ideas |
| `headingLine2` | text | Into Digital Excellence |
| `subheading` | textarea | We're a growing software development team turning ideas into powerful digital products… |
| `primaryCta.label` | text | Start Your Project |
| `primaryCta.action` | select | scroll-to `#contact` ⚠️ **broken — no `#contact` element exists on `/`** (§10.3) |
| `trustBadges[]` | repeater(text), 6 | Founder-led Development · Modern React & Next.js · Transparent Communication · Free Consultation · Scalable Solutions · Clean & Maintainable Code |
| `highlights[]` | repeater `{ icon, label }`, 3 | Code → Full-Stack Development · Zap → Lightning Fast Delivery · Globe → Direct Communication |
| Globe visual | — | `GlobeDemo` → `components/ui/globe.tsx` reads `data/globe.json` (1.5 MB country polygons). **Not editable** — do not surface in admin |

### 3.2 About section — `components/about-section.tsx`

| Field | Type | Current value |
|---|---|---|
| `badge` | text | About RSNexus |
| `heading` | text | Driven by Innovation, Powered by Passion |
| `intro` | textarea | At RSNexus, we're a passionate team of developers… |
| `stats[]` | repeater `{ icon, label, description }`, 4 | Users → Ready to Serve · Award → 10+ Products Designed & Built · Clock → 3+ Years Development Experience · Target → On a Journey to Build Better |
| `stats[].value` | text | **Commented out** in code — keep the field, add a "show value" toggle |
| `mission.heading` | text | Our Mission |
| `mission.paragraphs[]` | repeater(textarea), 2 | see file |
| `pillars[]` | repeater `{ title, description }`, 3 | Innovation First · Quality Assurance · Client Partnership |

### 3.3 Founder section — `components/founder-section.tsx`

Reads `data/team.json`, filtered to `role === "Founder" || role === "Co-Founder"` → currently 2 cards.

| Field | Type | Current value |
|---|---|---|
| `badge` | text | Meet the Team |
| `heading` | text | Founder-Led, Not Outsourced |
| `subheading` | textarea | People hire people. Here's who you'll actually be working with… |
| Card data | from `team.json` | image, name, role, bio, linkedin, github |
| Experience badge | **derived, hardcoded** | `Co-Founder → "2+"`, everyone else → `"3+"` Years of Development Experience. ⚠️ Should become a `yearsExperience` field on the team record (§10.4) |

Selection rule (`role` ∈ {Founder, Co-Founder}) should become an explicit **"Show on homepage"** boolean on each team member instead of a magic role filter.

### 3.4 Featured projects — `components/featured-projects.tsx`

| Field | Type | Current value |
|---|---|---|
| `badge` | text | Featured Work |
| `heading` | text | Products We've Built |
| `subheading` | textarea | A mix of live products, internal tools, and technical showcases… |
| `limit` | number | 4 |
| Selection rule | **derived** | Projects with `label === "Featured Project"` sorted first, then `.slice(0, 4)`. Replace with an explicit `featured` boolean + `featuredOrder` number |
| Card renders | — | `images[0]`, `label` badge, `title`, `description`, first **5** technologies, View Live / GitHub buttons |
| `cta.label` / `.href` | text / url | View Full Portfolio → `/portfolio` |

### 3.5 Process timeline — `components/process-timeline.tsx`

| Field | Type | Current value |
|---|---|---|
| `badge` | text | How We Work |
| `heading` | text | Our Development Process |
| `subheading` | textarea | A transparent, repeatable process… |
| `steps[]` | repeater `{ icon, title, description }`, 7 | Search → Discovery · ClipboardList → Requirement Analysis · Palette → UI/UX · Code2 → Development · TestTube → Testing · Rocket → Deployment · LifeBuoy → Support |

⚠️ The grid is `lg:grid-cols-7` — **7 steps is a layout constraint**. Warn in the admin UI if the count ≠ 7, or make the grid dynamic first.

### 3.6 Services overview — `components/services-overview.tsx`

| Field | Type | Current value |
|---|---|---|
| `badge` | text | Our Services Worldwide |
| `heading` | text | Comprehensive Software Solutions |
| `subheading` | textarea | From web development to AI integration… |
| `services[]` | repeater `{ icon, title, description, features[3] }`, 6 | Website Development · Full Stack Development · Mobile App Development · UI/UX Design · Cloud Solutions · AI & Machine Learning |
| `cta.label` / `.href` | text / url | View All Services → `/services` |

⚠️ **Duplicate content.** These 6 services are a *second, independently hardcoded copy* of the services on `/services` (§4) — the titles match but the descriptions and feature lists differ. The admin must edit **one** Services collection and render both views from it, with a "short description" and a "long description" field (§9.2).

### 3.7 CTA band — `components/cta-section.tsx`

| Field | Type | Current value |
|---|---|---|
| `heading` | text | Ready to Transform Your Business? |
| `body` | textarea | Let's discuss your project and explore how RSNexus can help… |
| `primaryCta` | `{ label, href, icon }` | Get Free Consultation → `/contact` |
| `secondaryCta` | `{ label, href }` | View Our Work → `/portfolio` |
| `footnote` | text | ✓ Free consultation • ✓ Custom quotes available • ✓ Flexible payment terms • ✓ Market-focused solutions |

The identical footnote string also appears at the bottom of `/pricing` — make it one reusable snippet.

### 3.8 WhatsApp float button

See §2.5.

---

## 4. Page: Services — `/services`

`app/services/page.tsx` + `app/services/layout.tsx`

**Header:** `badge` = Our Services · `h1` = Comprehensive Software Solutions · `subheading` = From concept to deployment…

**`services[]` — repeater, 6 items.** Each item (`components/service-card.tsx`):

| Field | Type | Rules |
|---|---|---|
| `icon` | icon | lucide name: Code, Layers, Smartphone, Palette, Cloud, Brain |
| `title` | text | required, unique |
| `description` | textarea | ~2–3 sentences; current copy follows a "For &lt;who&gt;… Ideal for &lt;who&gt;" pattern |
| `features[]` | repeater(text) | 5 each today; renders with a green check |
| `technologies[]` | tags | 4–5 each; renders as badges |

Current data: **Website Development** (React, Next.js, TypeScript, Tailwind CSS) · **Full Stack Development** (Node.js, Python, PostgreSQL, MongoDB, Redis) · **Mobile App Development** (React Native, Flutter, Swift, Kotlin) · **UI/UX Design** (Figma, Adobe XD, Sketch, Principle) · **Cloud Solutions** (AWS, Google Cloud, Azure, Docker, Kubernetes) · **AI & Machine Learning** (TensorFlow, PyTorch, OpenAI, Hugging Face).

**Bottom CTA card:** `heading` = Ready to Start Your Project? · `body` · two buttons `Get Free Consultation` and `View Portfolio`.
⚠️ Both buttons are plain `<button>` elements with **no `onClick` and no link** — they do nothing (§10.5). The admin model must include `href` for each.

**SEO / JSON-LD** (`layout.tsx`): title, description, canonical, OG, Twitter, plus a `Service` schema **per service name** — that list is a *third* hardcoded copy of the six service names. Generate it from the Services collection.

**Missing:** the footer links to `/services#website` etc., but no section on this page has an `id`. Add `anchorId` as a field on each service (§10.2).

---

## 5. Page: Pricing — `/pricing`

`app/pricing/page.tsx` — the largest content page (490 lines), fully hardcoded.

### 5.1 Promo modal (auto-opens 2s after load)

| Field | Type | Current value |
|---|---|---|
| `enabled` | boolean | true |
| `delayMs` | number | 2000 |
| `title` | text | Special Startup Offer |
| `packageName` | text | Basic Website Package |
| `priceDisplay` | text | ₹6,000 - ₹10,000 |
| `tagline` | text | Perfect for startups & small businesses |
| `featuresHeading` | text | What's Included: |
| `features[]` | repeater(text), 7 | 5-6 Page Responsive Website · Mobile-First Design · Contact Form Integration · Basic SEO Setup · SSL Certificate · 1 Month Support · 2 Revision Rounds |
| `primaryCta.label` | text | Get This Offer - ₹6,000 |
| `primaryCta.target` | url | `/contact?plan=basic-website&budget=6k-10k` |
| `secondaryCta.label` | text | View All Plans (closes modal) |
| `footnote` | text | * Price varies based on specific requirements… |

⚠️ The 7 features are duplicated verbatim in the modal **and** in the Basic Website card below. One source, rendered twice.

### 5.2 Header

`badge` = Pricing Plans · `h1` = Choose Your Perfect Plan · `subheading` = Transparent pricing for every business size worldwide…

### 5.3 Basic Website Package (highlighted card)

`sectionBadge` = Most Popular for Startups · `sectionHeading` = Basic Website Package · `sectionBody` · card `{ icon: Zap, title: Basic Website, priceMin: ₹6,000, priceMax: ₹10,000, subtitle: 5-6 page responsive website for startups, features[7], cta: "Get Started - ₹6,000" }`.

### 5.4 Project plans — `pricingPlans[]`, 3 items

`sectionHeading` = Advanced Project Solutions

| Field | Type | Starter | Professional | Enterprise |
|---|---|---|---|---|
| `icon` | icon | Zap | Star | Crown |
| `name` | text | Starter | Professional | Enterprise |
| `price` | text | ₹49,999 | ₹1,25,999 | ₹3,99,999 |
| `period` | text | per project | per project | per project |
| `description` | textarea | small businesses & startups | growing businesses | large organizations |
| `features[]` | repeater(text) | 8 items | 12 items | 14 items |
| `popular` | boolean | false | **true** | false |
| `cta` | text | Get Started | Most Popular | Contact Sales |

`popular: true` adds the "Most Popular" ribbon and scales the card — the admin should enforce **at most one** popular plan.
Clicking a plan → toast, then `router.push("/contact?plan=<name lowercased>")`.

### 5.5 Monthly retainers — `monthlyPackages[]`, 2 items

`sectionHeading` = Monthly Retainer Packages · `sectionBody` = For businesses worldwide that need ongoing development support…

| Field | Development Retainer | Full-Service Package |
|---|---|---|
| `price` / `period` | ₹79,999 / per month | ₹1,49,999 / per month |
| `description` | Ongoing development support… | Complete digital solution… |
| `features[]` | 6 items | 7 items |
| CTA (fixed) | Start Retainer | Start Retainer |

### 5.6 Add-on services — `addOnServices[]`, 6 items

`sectionHeading` = Add-On Services · `sectionBody`. Each: `{ name, price, description }` — Mobile App Development ₹49,999 · AI Integration ₹49,999 · Advanced Analytics ₹29,999 · E-commerce Setup ₹39,999 · Maintenance Package ₹9,999/month · Performance Optimization ₹19,999. The whole card is clickable → `/contact?plan=<name>`.

### 5.7 Bottom CTA

`heading` = Ready to Get Started? · `body` · buttons `Schedule Free Consultation` → `/contact?type=consultation` and `Contact Sales Team` → `/contact?type=sales` · `footnote` (same string as §3.7).

### 5.8 Pricing model notes for the admin

- Prices are **display strings** (`"₹49,999"`, `"₹9,999/month"`), not numbers. Recommended: store `amount:number` + `currency` + `period` and format on render; keep a `priceOverride:text` escape hatch for ranges like `₹6,000 - ₹10,000`.
- Every plan/add-on name becomes a query param on `/contact` and must line up with the contact form's **Service** dropdown values (§8.2, §10.6).

---

## 6. Remaining pages

### 6.1 About — `/about`

| Section | Fields |
|---|---|
| Hero | `badge` About RSNexus · `h1` Driven by Innovation, Powered by Passion · `subheading` · `metaItems[]` 3 × `{ icon, text }`: MapPin → Delivering Solutions Worldwide, Users → Passionate Developers, Globe → Founder-Led Development |
| Stats | `stats[]` 4 × `{ icon, number, label, description }` — UserCheck/Founder-Led/Direct Involvement · Code2/Modern Stack/Current Technology · MessageSquare/Transparent/Open Communication · GitBranch/Clean Code/Engineering Discipline. Note `number` holds **text**, not a numeral |
| Our Journey | `heading` Our Journey · `paragraphs[]` 3 · `image` Cloudinary `ourjourney_i9mjsu.png` + `imageAlt` |
| Why Choose Us | shared component — §6.2 |
| Trust Signals | shared component — §6.3 |
| Core Values | `heading` Our Core Values · `body` · `values[]` 4 × `{ icon, title, description }`: Excellence, Collaboration, Innovation, Reliability |
| Leadership | `heading` Meet Our Leadership · `body` · cards from **all** of `team.json` (name, role, bio, image, email, phone) |
| CTA band | `heading` Ready to Build With Us? · `body` · button `Get in Touch` → `/contact` |

SEO layout also emits a `Person` schema for the member whose `role === "Founder"`.

### 6.2 Why Choose Us — `components/why-choose-us.tsx` (About only)

`badge` Why Choose Us · `heading` Honest Strengths, Not Sales Talk · `body` · `reasons[]` 8 × `{ icon, title, description }`: Founder Directly Involved · Fast Communication · No Unnecessary Management Layers · Performance-Focused Engineering · Modern Architecture · Scalable Code · Transparent Workflow · Quality Over Quantity.

### 6.3 Trust Signals — `components/trust-signals.tsx` (About only)

`heading` Real Credibility, Not Claims · `body` · `signals[]` 12 plain strings rendered as ✓ badges: Founder-Led · Open Source Friendly · Modern Engineering · Secure Development Practices · Responsive Design · Performance Optimized · SEO Ready · Accessibility Focused · Clean Architecture · Git Version Control · Code Review Process · Testing Workflow.

### 6.4 Team — `/team`

`h1` Meet Our Teams · `intro` paragraph · grid of **all** `team.json` members: image (96×96 circle), name, role, bio, LinkedIn link, email, phone. No filtering, no ordering field — **add `order`** so the admin can sequence members.

### 6.5 Portfolio list — `/portfolio`

| Element | Behaviour |
|---|---|
| Header | `badge` Our Portfolio · `h1` Projects That Deliver Results · `subheading` |
| Category filter | **Derived** from `[...new Set(projects.map(p => p.category))]` + "All". No separate categories collection — the admin should offer a managed category list with autocomplete to stop near-duplicates |
| Tabs | `Collaborations (n)` = projects whose `label` ∈ {Featured Project, Internal Project, Client Project}; `Made to Explore (n)` = everything else (today: Concept Project). **The label string drives the tab** — expose it as a controlled `select`, never free text (§10.7) |
| Tab copy | Client tab: badge Client Work, h2 Built for Real Businesses, body. Concept tab: badge Concept Builds, h2 Ideas We Engineered In-House, body. Empty states: "No client projects in this category." / "No concept projects in this category." |
| Card | image (click → lightbox), category badge, label badge (concept only), title, description, all technologies, all features (2-col), results, View Live / GitHub buttons |
| CTA | `heading` Ready to Start Your Project? · `body` · Start Your Project → `/contact?type=project` · Request Quote → `/contact?type=quote` |

### 6.6 Portfolio detail — `/portfolio/[slug]`

Lookup is `slugify(project.title) === slug` — **the URL comes from the title, not the `slug` field** (§10.8). Renders: image carousel (arrows appear when `images.length > 1`, click → lightbox), category + label badges, title, `View Live` button, description, and tabs **Technologies / Features / Results** plus **Case Study** (rendered only when `caseStudy` exists: overview, challenge, solution, architecture, outcome). GitHub button below when `githubUrl` is set.

### 6.7 Blog list — `/blog`

`badge` Blog · `h1` Notes on Building Software · `subheading` Practical, honest writing on web development, AI, and building startups — no fluff, no hype. · 3-column card grid of every post in `blog.json` (no pagination, no filtering, no featured image).

### 6.8 Blog post — `/blog/[slug]`

Back button → `/blog` · category badge · `h1` title · author · published date (formatted `Month D, YYYY`) · read time · body = `content[]` rendered one `<p>` per array item (**plain text only — no markdown, no HTML, no images**) · bottom CTA `Discuss Your Project` → `/contact`.

⚠️ The read-time label is **not** `post.readTime` after hydration: `components/read-time-counter.tsx` stores a per-slug timestamp in `localStorage` and displays *elapsed time since the reader first opened the post* ("Just now", "3 min read", "2 hr read"). `readTime` is only the pre-hydration fallback. Flag this in the admin field help so editors don't chase a value that gets replaced (§10.9).

### 6.9 FAQ — `/faq`

`badge` FAQ · `h1` Frequently Asked Questions · `subheading` · **`faqData.slice(4)`** — the first four entries are deliberately skipped because they appear on `/contact`. CTA: `Still have questions?` · body · `Contact Us` → `/contact`.

**This positional split is the single most fragile rule in the codebase.** Reordering FAQs in the admin silently changes which page each question appears on, and both pages' `FAQPage` JSON-LD follows the same slice. Replace with an explicit `placement` field: `contact` | `faq` | `both` (§10.10).

### 6.10 Contact — `/contact`

**Header:** `badge` Contact RSNexus · `h1` Let's Build Something Amazing Together · `subheading`.

**Form fields** (state keys must not change — the API reads them):

| Field | Type | Required | Placeholder / options |
|---|---|---|---|
| `name` | text | ✅ | Rajesh Kumar |
| `email` | email | ✅ | rajesh@example.com |
| `phone` | text | — | +91 98765 43210 |
| `company` | text | — | Your Company Pvt Ltd |
| `service` | select | — | website, fullstack, mobile, design, cloud, ai, consultation, starter, professional, enterprise |
| `budget` | select | — | under-50k, 50k-1l, 1l-2l, 2l-5l, over-5l |
| `message` | textarea (5 rows) | ✅ | Share details about your project… |

Submit label `Send Message` / `Sending Message...`; success + error toasts are editable strings.

**URL prefill:** `?plan=<x>` sets `service` and writes a message; `?type=consultation` and `?type=sales` each write their own message. All three templates should be admin-editable.

**Quick actions:** WhatsApp Us → `wa.me/917992322713` · Connect on LinkedIn → `linkedin.com/in/sachin-rathod-b20b83175/` · response-time line "Expected response time: within 24 hours (usually faster on WhatsApp)." A hidden block (`className="… hidden"`) holds **Live Chat** (toast only) and **Schedule Call** → `calendly.com/RSNexus` — expose as toggles.

**Contact info cards** — repeater `{ icon, title, details[] }`, 4:
MapPin / Office Locations / "We currently operate remotely, serving clients worldwide." · Phone / Phone Numbers / Whatsapp / +91 9852731566, +91 9309931886 · Mail / Email Addresses / sr.nexus.it@gmail.com · Clock / Business Hours / Mon–Fri 10AM–8PM IST, Sat 10AM–6PM IST, Sunday Closed.

A commented-out **Interactive Map** card exists — expose as a toggle if it is ever wanted.

**FAQ teaser:** `heading` Frequently Asked Questions · `body` · `faqData.slice(0, 4)` · link `View Full FAQ →` → `/faq`.

### 6.11 Contact API — `app/api/contact/route.ts`

`POST /api/contact` → nodemailer over Gmail. Env: `EMAIL_USER`, `EMAIL_PASS`. From `"<name>" <EMAIL_USER>`, To `EMAIL_USER`, `replyTo` = submitter email, subject `📩 New Contact Form Submission - <name> (<email>)`, HTML table of all 7 fields. Returns `200 {message}` or `500 {message}`.

**Gaps the admin panel should close:**

1. **Submissions are never stored** — only emailed and `console.log`ged. There is no Leads screen possible until a `contact_submissions` table exists. Add a DB insert here first.
2. No server-side validation (a request with no `name`/`email` still sends a mail).
3. No spam protection (no rate limit, no honeypot, no captcha).
4. Raw values are interpolated into the HTML email — **escape them** before adding an admin viewer.
5. Recipient, subject and template are hardcoded — make them Settings fields.

---

## 7. Per-page SEO fields (every page editor needs this tab)

Every route's `layout.tsx` carries the same shape. Admin fields: `title`, `description`, `canonical`, `og.title`, `og.description`, `og.url`, `og.type`, `og.images[]`, `twitter.card`, `twitter.title`, `twitter.description`, `twitter.images[]`.

| Route | og.type | Extra JSON-LD |
|---|---|---|
| `/` (root layout) | website | WebSite, Organization, BreadcrumbList |
| `/about` | website | Person (the Founder), BreadcrumbList |
| `/services` | website | Service × 6, BreadcrumbList |
| `/pricing` | website | BreadcrumbList |
| `/team` | website | BreadcrumbList |
| `/portfolio` | website | BreadcrumbList |
| `/portfolio/[slug]` | website | BreadcrumbList (3 levels). Title `<title> \| RSNexus Portfolio`, description = project description, OG image = `images[0]` at 1200×630 |
| `/blog` | website | BreadcrumbList |
| `/blog/[slug]` | **article** | BlogPosting (headline, description, datePublished, author, publisher) + BreadcrumbList |
| `/faq` | website | FAQPage (`faqData.slice(4)`), BreadcrumbList |
| `/contact` | website | FAQPage (`faqData.slice(0,4)`), BreadcrumbList |

Dynamic pages fall back to "Project not found" / "Article not found" metadata for unknown slugs — those strings are editable too.

**Sitemap** (`app/sitemap.ts`, auto): 9 static routes at priority 1.0 (home) / 0.8, weekly; `/portfolio/<slugify(title)>` at 0.7 monthly; `/blog/<slug>` at 0.6 monthly with `lastModified` = `publishedDate`. Publishing a project or post is enough — no sitemap UI needed. Base URL `https://rsnexus.in` (note: `robots.ts` and `sitemap.ts` both use the apex domain, an older commented block used `www.` — keep them identical).

---

## 8. Data model + admin API contract

### 8.1 Collections

**`projects`** — from `data/projects.json` (`{ "projects": [...] }`, 7 items)

| Field | Type | Req | Notes |
|---|---|---|---|
| `title` | text | ✅ | **Drives the URL** — changing it changes the public URL |
| `slug` | slug | ✅ | Present in JSON but **currently unused by routing**; auto-fill from title, keep in sync |
| `category` | text | ✅ | Populates the filter chips. Use a managed list |
| `label` | select | ✅ | Featured Project · Internal Project · Client Project · Concept Project. First three → "Collaborations" tab |
| `description` | textarea | ✅ | Also the meta description and OG description |
| `images[]` | repeater(image) | ✅ | 3–7 today. **`images[0]` is the card thumbnail and OG image** — target 1200×630 |
| `technologies[]` | repeater `{ name, description? }` | ✅ | `description` shows as a tooltip on the portfolio card |
| `features[]` | repeater(text) | ✅ | up to 13 today |
| `results[]` | repeater(text) | ✅ | rendered with ✓ |
| `liveUrl` | url | — | empty string hides the button |
| `githubUrl` | url | — | empty string hides the button |
| `tags[]` | tags | — | **stored but never rendered** — keep or drop deliberately |
| `caseStudy` | object | — | `{ overview, challenge, solution, architecture, outcome }`, all textarea; presence adds the Case Study tab |
| `services[]` | repeater(text) | — | present on 5 projects, **never rendered** |
| `contact` | object | — | `{ email, phone, address, vat? }`, present on 5 projects, **never rendered** |

Current items: MyLapKart · MyLapKart ERP · CESTT Limited · College Website · Job Course Portal · Astro Guide · Viatrip Holidays.

**`blog`** — `data/blog.json`, flat array, 5 posts

| Field | Type | Req | Notes |
|---|---|---|---|
| `slug` | slug | ✅ | **The routing key** (unlike projects). Unique |
| `title` | text | ✅ | |
| `excerpt` | textarea | ✅ | Card copy + meta/OG description |
| `category` | text | ✅ | Web Development, Business, AI & Automation, Startups |
| `readTime` | text | ✅ | e.g. `6 min read` — fallback only (§6.8) |
| `publishedDate` | date | ✅ | `YYYY-MM-DD`; drives sitemap `lastModified` and `datePublished` |
| `author` | text | ✅ | Should become a reference to `team` |
| `content[]` | repeater(textarea) | ✅ | One paragraph per entry, **plain text only**. If editors need headings/lists/images, the renderer must change first |

Missing and worth adding: `coverImage`, `published` boolean, `tags`, `updatedDate`.

**`team`** — `data/team.json`, flat array, 4 members

| Field | Type | Req | Notes |
|---|---|---|---|
| `name` | text | ✅ | Initials fall back into the avatar |
| `role` | text | ✅ | ⚠️ **Behavioural:** `Founder`/`Co-Founder` control the homepage Founder section; `Founder` also drives the About `Person` schema. Make it a `select` |
| `image` | image | ✅ | Square, ≥256×256 (rendered 80–96 px circle) |
| `bio` | textarea | ✅ | |
| `linkedin` | url | ✅ | |
| `github` | url | — | Empty on all 4 — button hides when empty |
| `email` | email | ✅ | **Public on /team and /about** |
| `phone` | phone | ✅ | **Public on /team and /about** |

Add: `order` (number), `showOnHome` (boolean), `yearsExperience` (number).
Current: Sachin Rathod (Founder) · Kushagra Ranjan (Co-Founder) · Anubhav Trivedi (CTO) · Anand Tiwari (COO).

**`faq`** — `data/faq.json`, 8 items, `{ question, answer }`. Add `order` (number) and `placement` (`contact` | `faq` | `both`) to replace the slice rule (§6.9).

**`testimonials`** — `data/testimonial.json`, 7 items `{ projectSlug, quote, name, designation, src }`. **Currently unused**: `components/testomonial.tsx` and its homepage import are commented out, with a note that the content was fabricated. Decision needed — either build a Testimonials screen and re-enable the section with real quotes, or delete the file and component. Do not ship the current placeholder quotes.

**`services`** and **`pricing`** — do not exist as data yet; schemas are defined in §4 and §5. Create them during migration.

### 8.2 Enum values that must stay in sync

| Enum | Values | Used by |
|---|---|---|
| Project label | Featured Project · Internal Project · Client Project · Concept Project | Portfolio tabs, homepage featured sort, card badges |
| Contact `service` | website · fullstack · mobile · design · cloud · ai · consultation · starter · professional · enterprise | Contact form select, `?plan=` prefill from pricing |
| Contact `budget` | under-50k · 50k-1l · 1l-2l · 2l-5l · over-5l | Contact form select, `?budget=` prefill |
| Contact `type` | consultation · sales · project · quote | Links from pricing and portfolio |
| Icon names | lucide-react component names | Every icon field — see §8.4 |

### 8.3 Suggested admin API

```
GET    /api/admin/:collection                 list (page, limit, q, sort)
POST   /api/admin/:collection                 create
GET    /api/admin/:collection/:id             read
PATCH  /api/admin/:collection/:id             update
DELETE /api/admin/:collection/:id             delete
POST   /api/admin/:collection/reorder         { ids: string[] }
GET    /api/admin/settings/:group             site | business | navigation | footer | contact | email
PUT    /api/admin/settings/:group             upsert
POST   /api/admin/media/upload                → Cloudinary, returns { url, width, height }
GET    /api/admin/leads                       contact submissions (needs the DB write in §6.11)
POST   /api/revalidate                        { paths: string[] } → revalidatePath
```

`:collection` ∈ `projects | blog | team | faq | testimonials | services | pricing | home-sections`.
All admin routes must be authenticated and rejected for non-admin roles. Suggested roles: **Admin** (everything incl. settings and users), **Editor** (content, no settings), **Viewer** (read + leads).

### 8.4 The icon problem — read before coding

Icons are currently **imported React components** (`import { Code } from "lucide-react"`) stored directly in the arrays. JSON cannot hold a component, so migration requires a registry:

```ts
// lib/icon-registry.ts
import { Code, Layers, Smartphone, Palette, Cloud, Brain, /* … */ } from "lucide-react"
export const ICONS = { Code, Layers, Smartphone, Palette, Cloud, Brain, /* … */ } as const
export type IconName = keyof typeof ICONS
```

Store `icon: "Code"` as a string; render `const Icon = ICONS[name] ?? FallbackIcon`. The admin icon picker must offer **only** registry keys — an unknown name would otherwise crash the page. Icons in use today: Code, Layers, Smartphone, Palette, Cloud, Brain, Users, Award, Clock, Target, Zap, Globe, Star, Crown, Check, CheckCircle, Search, ClipboardList, Code2, TestTube, Rocket, LifeBuoy, UserCheck, MessageSquare, GitBranch, Gauge, Boxes, Workflow, Gem, Lightbulb, MapPin, Phone, Mail, Calendar, MessageCircle, Linkedin, Github, ExternalLink, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Menu, X, User, Instagram, Facebook.

### 8.5 Images

All images are remote **Cloudinary** URLs on two accounts (`dl2xsc49w`, `dn7a3a8ej`) plus one local `/placeholder.svg` fallback. `next.config.mjs` must allow any host used — verify before letting editors paste arbitrary URLs. Recommended admin behaviour: upload through the panel to a single Cloudinary account, store the returned URL. Guidance to show editors: project thumbnails/OG 1200×630, team photos square ≥256×256, logo square PNG with transparency.

---

## 9. Migration plan (Tier B → editable)

Do this in order; each step is independently shippable and leaves the site rendering identically.

**Step 1 — Icon registry.** Add `lib/icon-registry.ts` (§8.4) and switch every hardcoded array to string icon names. No visual change.

**Step 2 — Extract to JSON.** Create `data/services.json`, `data/pricing.json`, `data/home.json`, `data/site.json` (nav, footer, contact info, business profile) and replace the in-component arrays with imports. Now every field in this document has a file behind it.

**Step 3 — Deduplicate.** Merge the three copies of the service list (home overview / services page / services JSON-LD) into one collection with `shortDescription` + `longDescription` + `homeFeatures[3]` + `features[5]` + `technologies[]` + `anchorId`. Same for the Basic Website feature list (modal + card) and the shared CTA footnote.

**Step 4 — Add the missing control fields.** `team.order`, `team.showOnHome`, `team.yearsExperience`; `faq.order`, `faq.placement`; `project.featured`, `project.featuredOrder`; `blog.published`, `blog.coverImage`.

**Step 5 — Persist leads.** Add the DB write + validation + spam protection to `app/api/contact/route.ts` so a Leads screen becomes possible.

**Step 6 — Database + API.** Move the JSON into the DB behind §8.3, switch pages to fetch with `revalidate`, and wire `POST /api/revalidate` into every admin save.

**Step 7 — Admin UI.** Build the screens in §11 against that API.

---

## 10. Issues found in the current site (fix while building)

1. **Contact details disagree across surfaces.** Phones: `+91-9309931886` (Organization schema), `+91 9852731566` and `+91 9309931886` (contact cards), `919309931886` (floating WhatsApp), `917992322713` (contact page WhatsApp button). Emails: `sr.nexus.it@gmail.com` (footer, contact) vs `sachinrathodnic1@gmail.com` (Organization schema). One canonical record in Settings.
2. **Dead footer anchors.** `/services#website`, `#fullstack`, `#mobile`, `#design`, `#cloud`, `#ai` — no matching `id` on the services page. Add an `anchorId` per service and render it.
3. **Dead hero CTA.** "Start Your Project" scrolls to `#contact`, which does not exist on `/` — the button silently does nothing. Point it at `/contact`.
4. **Hardcoded experience badge.** The founder card derives "2+"/"3+ Years" from the role string. Move to a `yearsExperience` field.
5. **Services page CTA buttons are inert.** Both bottom buttons have no handler and no href.
6. **`?plan=` values don't all match the Service dropdown.** Pricing pushes `basic-website`, `mobile app development`, `ai integration`, `development retainer`, etc.; the select only accepts 10 fixed values, so unmatched plans land in the form as an unselectable value. Align the enums (§8.2).
7. **Tab routing depends on a free-text label.** A typo in `label` silently moves a project between "Collaborations" and "Made to Explore". Make it a select.
8. **Project URLs come from the title, not the `slug` field.** `slugify(title)` is used by the list page, the detail page, the metadata and the sitemap, while `projects.json` also carries an unused `slug`. Renaming a project breaks its live URL and any inbound link. Either switch routing to `slug`, or make the admin warn on title change and emit a redirect.
9. **Blog `readTime` is overwritten client-side** by an elapsed-time counter from `localStorage` (§6.8). Either document the field as a fallback or reconsider the component.
10. **FAQ split is positional** (`slice(0,4)` on contact, `slice(4)` on FAQ, mirrored in both JSON-LD blocks). Reordering silently reassigns questions between pages. Replace with `placement`.
11. **Unused content shipped in the bundle.** `data/testimonial.json` + `components/testomonial.tsx` (fabricated quotes, disabled) and `components/globe-showcase.tsx` (commented out of the home page). `data/globe.json` is 1.5 MB and is imported by the hero globe — keep, but never expose in admin.
12. **Contact API has no validation, no storage, no rate limiting, and interpolates raw input into HTML email.**

---

## 11. Admin screens to build

| # | Screen | Contents |
|---|---|---|
| 1 | Dashboard | Counts (projects, posts, team, FAQs), recent leads, last publish time, "Publish / Revalidate" button |
| 2 | Settings → Site | §2.1 — metadata, keywords editor, OG/Twitter, icons, theme |
| 3 | Settings → Business profile | §2.2 — one canonical contact record + `sameAs` links |
| 4 | Settings → Navigation | §2.3 — logo, ordered menu, CTA |
| 5 | Settings → Footer | §2.4 — 4 columns, socials, copyright, toggles for the commented-out rows |
| 6 | Settings → Email | §6.11 — recipient, subject template, HTML template, env status |
| 7 | Home page | §3 — 8 sections, each enable/disable + drag order, per-section forms |
| 8 | Services | §4 — repeater of 6, with short/long description, features, technologies, anchor id, icon picker |
| 9 | Pricing | §5 — promo modal, basic package, 3 plans, 2 retainers, 6 add-ons, CTA |
| 10 | About | §6.1–6.3 — hero, stats, journey, why-choose-us, trust signals, values, CTA |
| 11 | Team | §8.1 — CRUD, drag order, avatar upload, `showOnHome` |
| 12 | Portfolio | List with category/label filters; item editor with image gallery (drag order, first = cover), technologies, features, results, case study, URLs |
| 13 | Blog | List with status; post editor with paragraph repeater, author picker, date, SEO preview |
| 14 | FAQ | Drag-ordered list with a `placement` selector and a live preview of what each page will show |
| 15 | Testimonials | Only if §8.1 says re-enable — otherwise delete the collection |
| 16 | Contact page | Header copy, contact cards, quick-action links/toggles, form labels/placeholders, dropdown options, prefill message templates, toasts |
| 17 | Leads | Contact submissions table (needs the DB write first): name, email, phone, company, service, budget, message, received-at, status, CSV export |
| 18 | Media library | Cloudinary browse + upload, dimension guidance |
| 19 | SEO | Per-route tab (§7) plus a sitemap/robots preview |
| 20 | Users & roles | Admin / Editor / Viewer, invitations, audit log |

### Cross-cutting UI requirements

- **Live character counters** on `title` (60) and `description` (160) with an SERP preview.
- **Slug warning** on project title change (§10.8) and blog slug change, offering a redirect entry.
- **Preview before publish** — draft state + a preview URL per page.
- **Validation** for required fields, unique slugs, exactly one `popular` pricing plan, exactly 7 process steps, ≥1 project image, valid icon names, valid URLs.
- **Unsaved-changes guard** on every editor.
- **Audit trail** — who changed what, and a rollback for at least the last 10 revisions.

---

## 12. Quick reference — content counts today

| Collection | Count | File |
|---|---|---|
| Projects | 7 | `data/projects.json` |
| Blog posts | 5 | `data/blog.json` |
| Team members | 4 | `data/team.json` |
| FAQs | 8 (4 on `/contact`, 4 on `/faq`) | `data/faq.json` |
| Testimonials | 7 (unused) | `data/testimonial.json` |
| Services | 6 (× 3 hardcoded copies) | `services-overview.tsx`, `services/page.tsx`, `services/layout.tsx` |
| Pricing plans | 3 + 1 basic + 2 retainers + 6 add-ons | `pricing/page.tsx` |
| Process steps | 7 | `process-timeline.tsx` |
| Why-choose-us reasons | 8 | `why-choose-us.tsx` |
| Trust signals | 12 | `trust-signals.tsx` |
| Core values | 4 | `about/page.tsx` |
| Nav items | 7 | `navigation.tsx` |
| Footer links | 11 + 2 socials | `footer.tsx` |
| SEO keywords | ~200 | `app/layout.tsx` |
