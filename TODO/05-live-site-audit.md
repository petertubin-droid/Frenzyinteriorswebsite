# Phase 5 — Live-Site Audit (⏳ awaiting live URL)

Live URL has not been reviewed yet. When it arrives, check every item below
against the deployed site and record findings here. These are the
"qualities Frelux has that Frenzy lacks" checks that only show up live.

## HTTP & delivery
- ☐ Security headers present in live responses (HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy) — **known missing from config, verify after 1.2**
- ☐ Compression (gzip/brotli) enabled
- ☐ 301/308 redirect behavior (www vs apex vs subdomain, trailing slash)
- ☐ 404 handling — what does a bad URL actually return?

## Rendering & UX parity with Frelux
- ☐ Breadcrumbs on content pages (known missing — see 4.4, verify wireframe)
- ☐ Custom 404 page (known missing — 3.1)
- ☐ Error screens on failed data fetches (white screen risk — 3.1)
- ☐ Loading states on every route (partial — 3.4)
- ☐ Mobile responsiveness of admin panel
- ☐ Dark mode support (Frelux has full theming; this app hardcodes light bg)
- ☐ Empty states (e.g., blog with zero posts, gallery empty)

## SEO live checks
- ☐ `/sitemap.xml` reachable and correct (known wrong domain — 4.1/4.3)
- ☐ `/robots.txt` reachable and correct
- ☐ Meta titles/descriptions on every page (missing pages, duplicates, length)
- ☐ Open Graph + Twitter cards on all public pages
- ☐ Canonical URLs correct for the deploy domain
- ☐ Structured data (Organization, LocalBusiness, BreadcrumbList, Product)
- ☐ Google Search Console verified / indexed

## Forms & integrations
- ☐ Contact form: validation errors shown inline (known missing — 3.3)
- ☐ Consultation submission works end-to-end (writes to Supabase, shows confirmation)
- ☐ Spam resistance on the form (known missing — 1.4)
- ☐ Newsletter signup functional if present in UI

## Performance
- ☐ Lighthouse: Performance / Accessibility / SEO / Best Practices scores
- ☐ LCP and image payload on gallery/portfolio (known heavy — 3.2)
- ☐ Font loading strategy (FOIT/FOUT)

## Findings
(To be filled in after live URL review.)
