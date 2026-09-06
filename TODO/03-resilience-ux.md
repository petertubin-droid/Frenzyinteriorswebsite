# Phase 3 — Resilience & UX

## 3.1 ☐ Add error boundaries
Missing all three:
- `app/error.tsx` (route-level)
- `app/global-error.tsx` (root-level)
- `app/not-found.tsx` (404 page)

Any render error currently produces a raw white screen. The 404 case also
matters for SEO and for ad-network review.

## 3.2 ☐ Enable image optimization
`next.config.js` sets `images.unoptimized: true` — on a portfolio/gallery
site, the heaviest content type. Configure a proper image pipeline
(Netlify Image CDN or next/image with a compatible loader) and remove the
flag. Measure LCP on the gallery before/after.

## 3.3 ☐ Add client-side form validation
`zod` and `@hookform/resolvers` are installed but **never used**. The contact
form has no client-side validation; the API route only checks required
fields. Wire up zod + react-hook-form: required fields, email format,
phone format, sensible max lengths.

## 3.4 ☐ Loading skeletons — partial credit
`loading.tsx` files exist on several routes (good). Audit every route for
coverage; add missing ones so no navigation shows a blank flash.
