# Phase 2 — CI/CD & Code Quality

## 2.1 ☐ Add GitHub Actions CI
No `.github/workflows/` exists. Every quality gate is manual.
Add a workflow that runs on every push + PR:
`npm ci` → `tsc --noEmit` → `next lint` → `next build`.
Reference standard: Frelux runs this gauntlet on every push, plus
560 vitest files and a Playwright suite, with a green-check requirement.

## 2.2 ☐ Add a test framework and unit tests
Zero tests exist — no unit, no integration. Pick vitest or jest and cover:
- the consultation API route (validation, insert, error paths)
- admin auth guard logic
- any data-mapping helpers in `lib/`

## 2.3 ☐ Add Playwright e2e tests
None exist. Minimum viable suite: home loads, contact form submits,
blog/portfolio pages render, admin redirects unauthenticated users.

## 2.4 ☐ Stop skipping lint in builds
`next.config.js` sets `eslint.ignoreDuringBuilds: true` — linting never runs.
Remove the flag once lint passes (and fix the errors it surfaces).

## 2.5 ☐ Add a LICENSE file
No LICENSE = legally "all rights reserved", nobody can reuse the code.
Copy the license choice used by the Frelux repo for consistency.

## 2.6 ☐ Fix the README
README claims **"Next.js 14"** — `package.json` pins **13.5.1**.
Correct it after the 1.1 upgrade (or as part of it).

## 2.7 ☐ Establish commit discipline
Repo history is a single commit ("Initial commit"). Going forward: one
logical change per commit, pushed individually, CI-verified.
