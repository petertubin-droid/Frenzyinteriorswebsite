# Phase 4 — SEO & Deployment

## 4.1 ☐ Remove hardcoded production domain — BLOCKER for the Frelux join
`https://frenzyinteriors.com` is hardcoded in **5 files**, including the
`app/sitemap.xml/route.ts` (force-static). The site actually lives on a
Netlify subdomain, and the planned mount point is
`freluxtools.netlify.app/frenzyinteriors`.

Fix: centralize the base URL in `NEXT_PUBLIC_SITE_URL` env var, read it in
the sitemap route and everywhere else, default per environment.

## 4.2 ☐ Resolve conflicting deploy configs
Both `netlify.toml` AND `vercel.json` exist, and `next.config.js` sets
`output: 'standalone'` (a Docker pattern) while Netlify uses
`@netlify/plugin-nextjs`. Pick one host, delete the other config, and
align the output mode. (Planned: Netlify, basePath `/frenzyinteriors`.)

## 4.3 ☐ Make the sitemap dynamic
Currently `force-static` with the hardcoded domain (see 4.1). After
centralizing the URL, regenerate it per environment so the join under
freluxtools.netlify.app doesn't produce a sitemap pointing at the wrong
domain.

## 4.4 ☐ Add breadcrumbs
No breadcrumb navigation anywhere. Frelux has breadcrumbs on content
pages with structured data. Add them (at minimum: home → services/products/
portfolio → detail) with `BreadcrumbList` JSON-LD for SEO.

## 4.5 ☐ Add PWA support
`app/manifest.ts` exists but there is **no service worker** — no offline
support, no install prompt. Frelux ships a working `sw.js`.
Add a service worker with basic offline caching of the shell.

## 4.6 ☐ robots.txt review
`app/robots.txt` exists — verify it references the correct sitemap URL
after 4.1/4.3 and blocks `/admin` and `/api`.
