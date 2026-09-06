# 🚧 TODO — Production Readiness Worklist

This repo is **not yet production-ready**. This folder is the complete, prioritized
worklist, benchmarked against the FRELUX production standard
(freluxtools.netlify.app — CI-gated, tested, monitored, hardened).

**How to use this:** work top to bottom. Phase 1 items are security-critical.
Do not deploy to production until every Phase 1 item is checked off.

Audit date: 2026-09-06 · Items: 21 + live-site checklist (pending URL)

| Phase | File | Focus | Status |
|-------|------|-------|--------|
| 1 — CRITICAL | [01-security-critical.md](./01-security-critical.md) | Vulnerable Next.js, headers, API abuse, admin guard | ☐ Not started |
| 2 — CI/CD & Quality | [02-cicd-quality.md](./02-cicd-quality.md) | CI, tests, lint, license, README fix | ☐ Not started |
| 3 — Resilience & UX | [03-resilience-ux.md](./03-resilience-ux.md) | Error boundaries, image optimization, form validation | ☐ Not started |
| 4 — SEO & Deployment | [04-seo-deployment.md](./04-seo-deployment.md) | Hardcoded domain, deploy config conflicts, PWA, breadcrumbs | ☐ Not started |
| 5 — Live-site audit | [05-live-site-audit.md](./05-live-site-audit.md) | Filled in after live URL review (breadcrumbs, 404, parity with Frelux) | ⏳ Awaiting live URL |
| 6 — Database | [06-database.md](./06-database.md) | Migration verification in CI, ledger discipline | ☐ Not started |

Run `npm run todo` to print this index from the terminal.
