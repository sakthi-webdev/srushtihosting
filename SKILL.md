# SKILL.md — Srushti Hosting Marketing Website

**Domain:** srushtihosting.com
**Type:** Single-page marketing site + legal pages
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Motion + Embla Carousel (deferred) + Lucide Icons
**Core shop/billing:** Upmind (external — this site never handles checkout, auth, or cart state)
**Stage:** Initial launch — Hosting, Domains, Google Workspace (CTA-only) live. SSL & Add-ons, Why Us, Testimonials, FAQ built but flagged off.

---

## 1. Project Philosophy

This is a **showcase site, not a shop**. Every commercial action (checkout, domain purchase, plan selection, login) hands off to Upmind. The job of this site is narrow and specific: make a visitor trust Srushti Hosting enough to click through to Upmind. That means:

- No cart, no auth, no dynamic pricing logic client-side — all of that is Upmind's job
- Every CTA is an outbound link, not a form-driven internal flow
- Performance and clarity matter more than feature breadth — a hosting company's own site being slow undermines the entire pitch
- Content ships in stages behind feature flags, not behind incomplete/half-built sections

---

## 2. Tech Stack & Rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | File-based routing for legal pages, `generateMetadata`, built-in `sitemap.ts`/`robots.ts`, RSC for zero-JS static sections |
| Language | TypeScript | Type-safe config objects for plans/sections (see §9) |
| Styling | Tailwind CSS | Fast iteration, easy to enforce the restrained token system below |
| Motion | Motion (Framer Motion) | Scroll reveals, hero blob drift — used sparingly, lazy-loaded below the fold |
| Carousel | Embla | **Not installed yet.** Only add when Testimonials is unflagged — don't ship unused JS |
| Icons | **Lucide React** | Tree-shakable (only imports icons you use), consistent 1.5px stroke style, no license cost, matches a clean/minimal aesthetic better than filled icon sets |
| Fonts | Onest (via `next/font/google` or self-hosted) | Single typeface, all weights, zero external font request if self-hosted |
| Email | Resend (server-side API route only) | Zero client bundle cost |
| Domain checker | Upmind DAC widget (see §7) | Official embed, don't rebuild |

---

## 3. Sitemap & Routes

```
/                     → Single-page marketing site (all sections below)
/terms/               → Terms of Service
/privacy/             → Privacy Policy
/refund-policy/       → Refund / Cancellation Policy
/sitemap.xml          → generated via app/sitemap.ts
/robots.txt           → generated via app/robots.ts
```

No blog, no docs, no knowledge base at this stage — those are Phase 2 additions once Hosting/Domains/Workspace content is proven out.

---

## 4. Page Architecture — Live vs Hidden

Build **all** sections now, but gate visibility through a single config file so nothing needs re-architecting later — you just flip a boolean.

```ts
// config/sections.ts
export const sectionFlags = {
  hero: true,
  servicesOverview: true,
  hosting: true,
  domains: true,
  googleWorkspace: true,      // CTA-style only — see §5.5
  sslAddons: false,           // built, hidden — no packages yet
  whyUs: false,               // built, hidden — needs real stats/copy
  testimonials: false,        // built, hidden — needs real client quotes
  faq: false,                 // built, hidden — needs real Q&A content
  contact: true,
} as const;
```

Each section component reads its own flag and returns `null` if off — keep this check at the top of the section component itself, not scattered in the page file, so `page.tsx` stays a clean list of `<Section />` calls regardless of what's currently visible.

**Why build hidden sections now instead of later:** you already know their content shape (Why Us = stat cards, Testimonials = Embla carousel, FAQ = accordion). Building the shell now with placeholder copy means switching them on later is a content edit, not a dev sprint.

---

## 5. Section-by-Section Spec

### 5.1 Hero
- H1 headline (short, benefit-first) + one-line subhead
- **Upmind domain checker widget** front and center, inside a frosted glass card (see §7 for embed, §8 for styling)
- 3–4 TLD price chips below the widget (`.com`, `.in`, `.co.in`)
- Secondary CTA: "Client Login" → external link to Upmind client area, `target="_blank" rel="noopener noreferrer"`
- Background: subtle blurred red-tinted gradient blob(s) at low opacity (8–12%), slow ambient drift via Motion — this is what makes the glass card below actually read as glass (see §8.3)

### 5.2 Services Overview
- 3 cards only at launch: **Hosting / Domains / Google Workspace** (SSL & Add-ons card omitted while `sslAddons: false` — don't show a 4th card that leads nowhere)
- Each card: Lucide icon, title, one-line description, anchor-scroll link to its section

### 5.3 Hosting
- Three plan cards: **Starter / Business / Professional**
- Business tier marked "Recommended" — use a red badge, not a full red card fill (see §8.2 on accent restraint)
- Feature list per card (storage, bandwidth, sites/domains allowed, backups — pull exact specs from your hosting.com resale terms)
- CTA per card → Upmind checkout, deep-linked to that specific plan if Upmind's URL structure supports plan IDs as query params

### 5.4 Domains
- TLD pricing reference table (short — 4–6 popular extensions, not exhaustive)
- No second search box here — the hero widget is the only domain search on the page, this section is pricing reference only
- Optional line: "Free WHOIS privacy" / "Easy transfer" if true of your Upmind/GoDaddy setup

### 5.5 Google Workspace — CTA-only mode
Since packages aren't finalized yet, this section is intentionally lighter than Hosting:
- Short intro: what Google Workspace includes (Gmail on your domain, Drive, Meet — 3 feature bullets max)
- **Single CTA card**, not a 3-tier pricing grid: "Get Google Workspace for Your Business" → button → either `mailto:` your contact or scroll-to-Contact section (not Upmind, since there's no live Workspace SKU yet)
- When packages are ready: swap this card for the same 3-tier layout used in Hosting, and point CTA to Upmind. Structure the component now so that swap is a data change, not a rebuild (see §9 config shape)

### 5.6 Contact
- Form: name, email, message → `POST /api/contact` → Resend → your Gmail
- Direct WhatsApp/phone/email links alongside the form
- Client-side validation only (no JS framework needed — native HTML5 required/type attributes are enough here)

### 5.7 Footer
- Anchor nav repeat (Hosting, Domains, Google Workspace, Contact)
- Legal links: Terms, Privacy, Refund Policy
- Contact info, social links (only if active), copyright line

---

## 6. Hidden Sections — Build Now, Flag Off

Build these as complete components now so flipping `sectionFlags` later is the only step needed.

**Why Us** — stat/differentiator cards (uptime %, support response time, years active, migration help). Don't populate with placeholder numbers that could accidentally ship — use clearly-fake placeholders like `XX%` in dev so nobody forgets to swap them before flipping the flag.

**Testimonials** — Embla carousel of client quote cards. Install Embla only when this flag flips to `true`; leave it out of `package.json` until then.

**FAQ** — accordion (plain state-driven expand/collapse, Motion for the height animation). Also gates `FAQPage` JSON-LD schema — only emit that structured data once real FAQ content exists (see §10.2).

**SSL & Add-ons** — card grid matching the Hosting section's visual style. Add back into Services Overview as a 4th card only when unflagged.

---

## 7. Upmind Domain Checker Widget

Official embed:

```html
<script src="https://widgets.upmind.app/dac/upm-dac.min.js"></script>
<upm-dac
  order-config-url="{orderConfigUrl}"
  currency-code="{currency}"
></upm-dac>
```

**Next.js integration notes:**
- Load the script via `next/script` with `strategy="lazyOnload"` — the widget isn't needed for First Contentful Paint or the LCP element (your headline is), so don't let it block initial render
- Wrap `<upm-dac>` in a client component (`'use client'`) since it's a custom element the React tree doesn't control internally
- `order-config-url` and `currency-code` are environment-specific — pull from `.env` (`NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL`, `NEXT_PUBLIC_UPMIND_CURRENCY`) rather than hardcoding, so staging/production can point at different Upmind configs
- Style the *wrapper* (the glass card container), not the widget internals — you likely have limited/no CSS control inside the custom element itself. Confirm with Upmind's docs whether it exposes CSS custom properties for theming; if not, the glass card frame is doing all the visual integration work
- Test layout shift carefully: custom elements that hydrate late can cause CLS if the wrapper doesn't reserve space. Give the container a `min-height` matching the widget's expected rendered size before it loads

---

## 8. Design System / Style Guide

### 8.1 Color Tokens

Logo colors sampled directly from the mark: red is pure `#FF0000`, gold is `#D8A94B`. **Gold is excluded from this build per direction — red is the only brand accent, used minimally.**

```css
--color-white:        #FFFFFF;   /* primary background */
--color-surface:      #FAFAFA;   /* alternate section background */
--color-ink:          #0F0F0F;   /* primary text — soft black, not pure #000 */
--color-ink-muted:    #52525B;   /* secondary text */
--color-border:       #E5E5E5;   /* card borders, dividers */
--color-border-subtle:#F0F0F0;

--color-red:          #FF0000;   /* exact logo red — use only for logo + tiny high-emphasis accents */
--color-red-600:      #E31E1E;   /* UI accent — buttons, active states, badges (slightly tempered so it doesn't vibrate at UI sizes) */
--color-red-50:       #FFF1F0;   /* tint — badge backgrounds, hover backgrounds */
```

**Usage discipline (this is the part that makes it look premium, not loud):**
- Red covers roughly **5–8% of any given viewport** — primary CTA buttons, the "Recommended" badge, active nav underline, form focus ring. Never a full-bleed section background, never a large card fill.
- Everything else is white / soft-black / gray. The gold removal means red is now your *only* accent — resist the urge to compensate by using more of it. Restraint is what reads as corporate/premium (compare: hosting.com, Hostinger use their accent color on <10% of the hero).
- Pure `#FF0000` is reserved for exact logo reproduction only (nav logo, favicon). Every UI use of "red" should be `--color-red-600` or a tint of it — pure red at button/badge scale reads as an alert/error color, not a brand color.

### 8.2 Typography — Onest Only

Single typeface, weight does all the differentiation work:

| Role | Weight | Size (desktop) | Notes |
|---|---|---|---|
| H1 (hero) | 700–800 | 56–64px | Tightest tracking, `line-height: 1.05` |
| H2 (section) | 600–700 | 36–40px | |
| H3 (card titles) | 600 | 20–22px | |
| Body | 400 | 16–17px | `line-height: 1.6` for readability |
| Small / labels | 500 | 13–14px | Slightly increased letter-spacing for eyebrow-style labels |
| Buttons | 600 | 15–16px | |

Load via `next/font/google` (Onest is on Google Fonts) with `display: 'swap'` and only the weights actually used (400/500/600/700/800) — don't pull the full variable font if you're not using every weight, it costs bytes for nothing.

### 8.3 Glassmorphism & Blur — Restrained, Light-Mode Correct

Light-mode glass only reads as "glass" when there's something soft and colored blurred behind it. Flat white background + frosted card = invisible effect. So:

- **Hero background:** 2–3 blurred blob shapes in `--color-red-600` at 8–12% opacity, large blur radius (`blur(80px)+`), positioned behind the domain search card. Motion: slow independent drift (`x`/`y`, 15–25s loop, ease-in-out) — ambient, not attention-grabbing
- **Domain search card:** `bg-white/70 backdrop-blur-md border border-white/60`, soft shadow (`shadow-xl shadow-black/5`), subtle red glow on the border only on focus-within (not permanently)
- **Plan/pricing cards:** mostly solid white with a light border, *not* glass — glass on every card everywhere is what makes an interface look unfinished rather than premium. Reserve the glass treatment for the hero widget card specifically, since that's the signature moment of the page
- **Recommended plan badge:** small red-600 pill, not a glass effect — badges should read instantly, not be soft

### 8.4 Spacing & Shape

- Border radius: `12px` cards, `8px` buttons/inputs, `999px` (full) for badges/pills — consistent scale, don't mix arbitrary radii
- Section vertical padding: generous — `96–128px` desktop, `64px` mobile — white space is doing a lot of the "premium" work here, don't compress it
- Max content width: `1200px` container, cards in a `12-column` grid where relevant

### 8.5 Icons — Lucide React

```
npm install lucide-react
```
- 1.5–2px stroke weight, consistent size scale (`20px` inline, `24px` card headers, `32px` feature icons)
- Icon color: `--color-ink-muted` by default, `--color-red-600` only for active/selected states — icons shouldn't compete with the red CTA buttons for attention
- Don't mix icon libraries — Lucide only, for visual consistency

### 8.6 Images

You mentioned images will be swapped later — structure now so that swap is trivial:
- Use `next/image` everywhere from the start (even with placeholders) so you get automatic optimization, lazy loading, and no CLS once real images land
- Keep image slots minimal by design — this palette/style leans on gradient blobs, icons, and typography rather than photography, which is both more "SaaS/hosting" in feel and better for performance (fewer/no hero images to optimize)
- If you do add photography later (team photo, office, data center imagery for trust), keep it black & white or heavily desaturated so it doesn't fight the red accent discipline in §8.1

---

## 9. Component & Folder Architecture

```
app/
  layout.tsx                 → root layout, font loading, global metadata
  page.tsx                   → homepage, imports sections in order, gated by sectionFlags
  sitemap.ts
  robots.ts
  terms/page.tsx
  privacy/page.tsx
  refund-policy/page.tsx
  api/
    contact/route.ts         → Resend handler

components/
  sections/
    Hero.tsx
    ServicesOverview.tsx
    Hosting.tsx
    Domains.tsx
    GoogleWorkspace.tsx      → CTA-only variant now; accepts a `mode: 'cta' | 'plans'` prop for the future swap
    SSLAddons.tsx             (flagged off)
    WhyUs.tsx                 (flagged off)
    Testimonials.tsx          (flagged off)
    FAQ.tsx                   (flagged off)
    Contact.tsx
  ui/
    GlassCard.tsx
    Button.tsx
    Badge.tsx
    DomainWidget.tsx          → wraps the Upmind <upm-dac> embed
  layout/
    Nav.tsx
    Footer.tsx

config/
  sections.ts                → sectionFlags (§4)
  plans.ts                   → typed plan data (Starter/Business/Professional + future Workspace tiers)
  site.ts                    → site-wide constants (name, URLs, social links, Upmind base URLs)

lib/
  resend.ts                  → Resend client init
```

`config/plans.ts` shape — keep pricing data structured so it's one source of truth referenced by both the section component and any future JSON-LD `Offer` schema:

```ts
export type Plan = {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  recommended?: boolean;
  upmindCheckoutUrl: string;
};
```

---

## 10. SEO Strategy

### 10.1 Metadata
- `generateMetadata()` per route (`/`, `/terms`, `/privacy`, `/refund-policy`) — unique title, description, canonical URL, OG image for each
- Homepage title pattern: `Srushti Hosting — Web Hosting, Domains & Google Workspace` (adjust to your actual positioning line)
- OG image: a simple branded card (logo + tagline on white/red), generated once, reused across routes unless you want per-route variants later

### 10.2 Structured Data (JSON-LD)
- **`Organization`** schema on homepage — name, logo URL, contact point, `sameAs` array for any active social profiles
- **`Service`** schema for each of Hosting / Domains / Google Workspace — helps search engines understand the three offerings distinctly
- **`Offer`** schema nested under Hosting's `Service`, sourced from `config/plans.ts` so pricing in schema never drifts from what's on-page
- **`FAQPage`** schema — only emit once the FAQ section is unflagged with real content; don't ship placeholder Q&A in structured data, it's a common cause of Search Console warnings

### 10.3 Technical SEO
- One `<h1>` per page (hero headline), sequential `<h2>` per section, no skipped levels
- Semantic landmarks: `<nav>`, `<main>`, `<footer>` — not all `<div>`
- `sitemap.ts` / `robots.ts` via Next.js App Router built-ins — auto-includes all static routes
- Anchor links use real `href="#hosting"` etc. (not JS-only `onClick` scroll with no href) — keeps them crawlable and works without JS as a fallback
- `alt` text on every image/icon that conveys information (decorative blobs/gradients: `alt=""` or `aria-hidden`)
- Canonical tags on every route to avoid duplicate-content flags between `www` and non-`www` if both resolve

---

## 11. Performance Strategy

- **Fonts:** `next/font/google` for Onest — self-hosted at build time, zero external request, no layout shift, only load weights actually used
- **Images:** `next/image` throughout, even for placeholders, so real images later inherit automatic sizing/lazy-loading/format negotiation (AVIF/WebP) for free
- **Motion:** import section-level animation components via `dynamic()` for anything below the fold, so Motion's JS doesn't block hero paint. Hero's own subtle blob drift can load eagerly since it's above the fold anyway
- **Upmind widget:** `next/script` with `strategy="lazyOnload"` (§7) — don't let a third-party custom element hold up LCP
- **Embla:** not installed until Testimonials is unflagged — avoid shipping unused JS in the initial bundle
- **Tailwind:** JIT/purge is automatic in modern Tailwind, but audit unused custom CSS occasionally
- **Target:** 90+ mobile Lighthouse performance score. This is non-negotiable in spirit — a slow site from a company selling hosting speed is a credibility problem, not just a metrics problem

---

## 12. Accessibility Baseline

- Visible keyboard focus rings on every interactive element (respect, don't `outline: none` without a replacement)
- Respect `prefers-reduced-motion` — disable/simplify the hero blob drift and section reveal animations for users who request it
- Color contrast: verify `--color-red-600` on white passes AA for button text (test at actual button size/weight, not just raw contrast ratio in isolation)
- Form inputs: proper `<label>` association, not placeholder-as-label
- All external links (Upmind, WhatsApp) get `rel="noopener noreferrer"` and ideally a visually-hidden "opens in new tab" cue

---

## 13. Content & Copy Guidelines

- Write from the visitor's side: "Get hosting that just works," not "We provide hosting infrastructure solutions"
- CTA buttons name the actual next action: "View Hosting Plans," "Check Domain," "Get Google Workspace" — not generic "Learn More" everywhere
- No invented stats — if Why Us/Testimonials are flagged off partly *because* you don't have real numbers/quotes yet, don't backfill with placeholder-that-looks-real content anywhere else on the live sections either
- Google Workspace CTA-mode copy should be honest about the current offer shape: framing like "Talk to us about Google Workspace for your team" is more accurate than implying self-serve pricing that doesn't exist yet

---

## 14. Launch Checklist

- [ ] `sectionFlags` set correctly (Hosting/Domains/Workspace/Contact `true`; SSL/WhyUs/Testimonials/FAQ `false`)
- [ ] Upmind `order-config-url` + `currency-code` set via env vars, tested against live Upmind account
- [ ] All Upmind checkout links per plan tested end-to-end
- [ ] Resend domain verified (not using shared test sender) so contact form mail doesn't land in spam
- [ ] Legal pages (Terms/Privacy/Refund) have real content, not lorem ipsum
- [ ] Lighthouse mobile score checked pre-launch, not after
- [ ] `sitemap.xml`/`robots.txt` resolve correctly in production
- [ ] OG image renders correctly when the URL is shared (test in a real chat app, not just a validator)
- [ ] Favicon set (derive from the lotus mark alone — wordmark won't read at favicon size)
