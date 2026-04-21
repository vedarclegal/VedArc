# VedArc Legal — Website

A static, SEO-friendly marketing site for VedArc Legal — a legal upskilling platform for in-house counsel, practising advocates, and law schools.

Built in **React + Vite + TypeScript + Tailwind + TanStack Query + Motion**.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check, build, and emit sitemap.xml
npm run preview
```

## Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Build / bundle | Vite + React 19 + TypeScript                      |
| Styling        | Tailwind CSS v3 with custom design tokens         |
| Routing        | react-router-dom v7                               |
| Data           | @tanstack/react-query (loads JSON content)        |
| Motion         | motion (Framer Motion successor)                  |
| Smooth scroll  | lenis                                             |
| Heads / SEO    | react-helmet-async + JSON-LD (Organization, Course) |
| Fonts          | Fraunces (display), EB Garamond (serif body), Geist Mono (labels) — self-hosted via @fontsource |
| Icons          | lucide-react                                      |

## Aesthetic — "Veda-Modern Editorial"

- **Palette** Ivory, Ink, Indigo, Brass, Oxblood
- **Type** Fraunces / EB Garamond / Geist Mono
- **Motion** cinematic, editorial, never bouncy
- **Theme** Light by default; "Night Reading" dark mode opt-in (warm parchment on ink)

See [`PRD.md`](../PRD.md) and the plan in `.cursor/plans/` for the full design intent.

## File structure

```
src/
  main.tsx              · Providers (router, query, helmet)
  App.tsx               · Routes + global chrome (Nav / Footer / Cursor / Seal / scroll progress)
  styles/
    tokens.css          · CSS custom properties (light + dark)
    globals.css         · Tailwind + base resets, paper grain, selection, type features
  lib/
    motion.ts           · Easings + variants
    seo.ts              · JSON-LD builders
    cn.ts               · clsx re-export
  hooks/
    useContent.ts       · TanStack Query hooks for programs / testimonials
    useLenis.ts         · Smooth scroll (skips on touch + reduced-motion)
    useReducedMotion.ts · prefers-reduced-motion listener
    useTheme.ts         · light / dark with localStorage + meta theme-color
  components/
    layout/Nav.tsx      · Sticky nav, mobile drawer, theme toggle
    layout/Footer.tsx   · Sitemap + colophon
    primitives/
      Cursor.tsx        · Custom cursor (default / link / cta / text / image / drag)
      Seal.tsx          · Custom Vedic seal SVG (animated draw)
      SealOverture.tsx  · First-load seal overture (sessionStorage gated)
      SplitHeading.tsx  · Word-by-word mask reveal
      Reveal.tsx        · Generic in-view reveal
      MagneticButton.tsx· Pointer-magnetic CTAs
      Marquee.tsx       · Hover-pause marquee
      BrassRule.tsx     · Self-drawing brass rule
      Eyebrow.tsx       · Roman-numeral eyebrow
      ScrollProgress.tsx· 1px brass rail on right edge
      PageTransition.tsx· (optional) page-turn route transition
  content/
    site.json           · Brand, nav, footer, pillars, audiences
    programs.json       · 7 program entries
    testimonials.json   · Quotes
  pages/
    Home.tsx
    About.tsx
    Programs.tsx        · Tabbed (All / Individual / Corporate / Academic)
    ProgramDetail.tsx   · Dynamic route /programs/:slug
    Partnerships.tsx
    Contact.tsx         · Editorial form, posts to VITE_CONTACT_ENDPOINT
    NotFound.tsx
    legal/Legal.tsx     · Single template for /legal/:slug
scripts/
  build-sitemap.mjs     · Emits dist/sitemap.xml from routes + programs.json
public/
  seal.svg              · Favicon
  robots.txt
```

## Environment

Create `.env.local`:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id
```

If unset, the Contact form simulates a submit and shows the success state.

## Deferred (not in this build)

- Admin panels (1.0 / 2.0)
- AI chatbot + ticketing
- CRM / Calendly integration
- AI brochure generator
- Real CMS (content stays in JSON, structure is CMS-shaped)
- Auth, payments, blog
