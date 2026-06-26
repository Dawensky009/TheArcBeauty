# The Arc Beauty Services

A bespoke, light editorial e-commerce & salon-booking website for **The Arc Beauty Services** — a skincare & facial studio in Boca Raton, FL. Rebuilt from scratch as a luxury, "fancy" experience: cream & nude-silk palette, soft-gold accents, deep-obsidian type, vivid full-colour photography and a captivating hero slideshow.

## Highlights

- **Cinematic hero slideshow** — vivid, full-colour beauty imagery, crossfade + Ken-Burns, autoplay, arrows & dots.
- **E-commerce** — product grid with hover-to-zoom and glassmorphism "Key Ingredients" panels, cart drawer, checkout (Square-ready).
- **Salon services & booking** — services showcase, treatment pages with an inline booking flow (Square Appointments-ready, graceful concierge fallback).
- **Bespoke Google Reviews** — elegant 5★ social proof (no generic widget).
- **Bilingual** — English / Spanish (`/en`, `/es`) with locale routing.
- **Fully responsive** — phone, tablet & desktop; swipe carousels and adaptive layouts on mobile.
- **Design-engineering polish** — custom easing curves, scroll reveals, `prefers-reduced-motion` support, AA contrast.

## Stack

- **Next.js 16** (App Router, RSC) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Motion** (animation) · **Lenis** (smooth scroll) · **Vaul** (drawer) · **Sonner** (toasts) · **Lucide** (icons)
- **Square** (payments + Appointments booking, ready to wire) · imagery placeholders via Unsplash CDN

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build
npm start        # serve the production build
```

## Configuration

Copy `.env.example` to `.env.local` and fill in as services are connected:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, redirects) |
| `NEXT_PUBLIC_HERO_VIDEO` | Optional MP4 for a video hero |
| `NEXT_PUBLIC_SQUARE_BOOKING_URL` | Square Appointments booking site (embedded) |
| `SQUARE_ACCESS_TOKEN` / `SQUARE_LOCATION_ID` / `SQUARE_ENVIRONMENT` | Payments & checkout (Square Online Checkout) |
| `GOOGLE_PLACES_API_KEY` | Live Google rating / reviews |

The app runs fully without any keys — booking, checkout and reviews show graceful, on-brand fallbacks.

## Project structure

```
app/[locale]/        Localised routes (home, treatments, shop, gift-cards, book, maison, legal)
app/api/             checkout, reviews route handlers
components/           ui · layout · sections · commerce · visual
lib/                 data (catalog), images, i18n dictionaries, utils, motion
proxy.ts             locale redirect (Next 16 proxy)
```

## Notes

Photography is sourced from Unsplash as premium placeholders — swap the URLs in `lib/images.ts` for the client's own HD assets. Catalog content lives in `lib/data.ts` and mirrors the intended CMS schema (Sanity-ready).

---

© The Arc Beauty Services. Built with Next.js.
