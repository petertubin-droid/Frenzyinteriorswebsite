# Phase 1 — Security (CRITICAL — do these before any production deploy)

## 1.1 ☐ Upgrade Next.js 13.5.1 → patched release (CRITICAL)
`npm audit` reports **20 vulnerabilities: 1 critical, 14 high**, including:
- **GHSA-fr5h-rqp8-mj6g** — Server-Side Request Forgery in Server Actions (critical)
- **GHSA-gp8f-8m3g-qvj9** — Next.js Cache Poisoning

Next 13.5.1 is end-of-life. Upgrade to the latest patched Next 14/15, then
re-run `npm audit` until production vulnerabilities = 0.
Reference standard: Frelux ships **zero** production vulnerabilities.

## 1.2 ☐ Add security headers
`netlify.toml` has no `[[headers]]` block at all. Add the full suite:
- `Strict-Transport-Security` (HSTS, preload-ready)
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`

Reference standard: Frelux serves all of these live (verified by header probe).

## 1.3 ☐ Add server-side admin route protection
There is **no `middleware.ts`**. The admin panel is guarded only by the
client-side `AdminAuthGuard` component — anyone can fetch the admin page
shells and JS bundle; protection rests entirely on RLS.
Add middleware that redirects unauthenticated/non-admin users away from
`/admin/*` before any HTML is served.

## 1.4 ☐ Protect POST /api/consultations against abuse
Public endpoint inserts into `consultations` with:
- no rate limiting
- no captcha / honeypot
- no spam filtering

Bots can stuff the leads table for free. Add at minimum: rate limit per IP,
honeypot field, and basic input sanitization.

## 1.5 ☐ Add error monitoring (Sentry or equivalent)
No monitoring of any kind — production breakage is invisible.
Reference standard: Frelux runs Sentry plus a module that redacts
keys/secrets from error logs before shipping them.

## 1.6 ☐ Pin the Node version
No `engines` field in package.json, no `.nvmrc`. Builds depend on whatever
Node version the host serves. Pin both.
