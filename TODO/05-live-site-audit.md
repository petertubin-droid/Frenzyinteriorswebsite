# Phase 5 — Live-Site Audit (bolt.host deployment)

**Live URL:** https://frenzy-interiors-bus-y8wf.bolt.host
**Audited:** 2026-09-06 (first pass, header/content/SEO probes)

---

## 🔴 CRITICAL live findings

### 5.C1 ☐ Canonical tags point to a domain that does not resolve
Every page's `<link rel="canonical">` points to `https://frenzyinteriors.com` —
**a domain that does not resolve at all** (DNS dead). The live site is on
bolt.host. This tells search engines the bolt.host content is a duplicate of
a non-existent origin. Worst case: refusal to index / deindexing.
**Fix:** centralize base URL (TODO 4.1) and emit correct canonicals before
anything else. Same root cause as 5.C2/5.C3.

### 5.C2 ☐ Sitemap is a map to nowhere
`/sitemap.xml` is live (200) and force-static, but every URL inside it is
`https://frenzyinteriors.com/...` — the dead domain. Search engines receive
a sitemap of unreachable URLs. Entries also lack `<lastmod>`.

### 5.C3 ☐ robots.txt Sitemap directive points at the dead domain
`Sitemap: https://frenzyinteriors.com/sitemap.xml` — dead link for crawlers.
(The `Disallow: /admin/` rules are correct — keep those.)

### 5.C4 ☐ Admin shell ships to anonymous visitors
`GET /admin/` returns 200 with the `AdminAuthGuard` + `AdminSidebar` code in
the HTML to anyone, unauthenticated. Confirms 1.3 live: the guard is
client-side only. Needs middleware before HTML is served.

---

## HTTP & delivery — measured live

- ☑ HSTS present (`max-age=31536000; includeSubDomains; preload`) — host-provided
- ☑ `X-Content-Type-Options: nosniff` — host-provided
- ☐ **No CSP, no X-Frame-Options, no Referrer-Policy on any page** — the
  host only supplies two headers; the netlify.toml additions in 1.2 still
  needed (or bolt-host equivalent)
- ☐ `x-powered-by: Bolt.new` leaks the stack — remove/override
- ☑ Compression works (63 KB → 10 KB transfer on homepage)
- ☑ Trailing-slash 308 redirects are consistent (from `trailingSlash: true`)
- ☑ Non-existent path returns **404** (correct status) but it is the
  **default Next.js 404** ("This page could not be found") — no custom
  not-found page (see 3.1)

## SEO live checks

- ☑ Title + meta description present and sensible on homepage
- ☐ **Zero structured data** — no JSON-LD at all (no Organization /
  LocalBusiness / BreadcrumbList). Frelux ships structured data.
- ☐ **Thin social cards** — only 1 `og:` tag and 1 `twitter:` tag on the
  homepage; no `og:url`, likely no `og:image`. Shared links will render bare.
- ☐ Breadcrumbs — confirmed absent live (see 4.4)
- ☑ Blog SSRs properly (post titles server-rendered, ISR working)

## Rendering & UX parity with Frelux

- ☐ **Gallery renders zero images server-side.** The gallery is a server
  component fetching from Supabase, but the live HTML contains no `<img>`
  at all — either the gallery tables are empty on the live project or the
  fetch fails silently in its try/catch. Needs a data check on the live
  Supabase project (ties into 6.2 parity).
- ☐ **Homepage hero is an unoptimized CSS background-image** hotlinked from
  Pexels at `w=1920` — no srcset, no next/image, third-party hotlink
  dependency (ties into 3.2; also a licensing question for a commercial site).
- ☐ Contact form is nearly empty in SSR HTML (1 form element) — the form
  renders client-side; slower first paint on the conversion page.
- ☐ No dark mode — hardcoded light background (Frelux has full theming).

## Forms & integrations

- ☑ `POST /api/consultations/` correctly rejects empty payloads (400 with
  field errors) — server-side required-field validation works
- ☐ Rate limiting / captcha — config audit says absent (1.4); not
  stress-tested live to avoid polluting the leads table

## Performance

- ☑ Homepage HTML is light (63 KB raw / 10 KB compressed)
- ☐ Lighthouse pass pending (run after 3.2 image fixes)
- ☐ Gallery/portfolio image payload unknown until gallery data issue (above)
  is resolved

---

## Notes for the fix order
5.C1–5.C3 are the same root cause (hardcoded domain) and the same fix as
TODO 4.1 — do that first, and the canonical/sitemap/robots trio resolves
together. 5.C4 is the same fix as 1.3 (middleware). Everything else folds
into the existing phase items.
