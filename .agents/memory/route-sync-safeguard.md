---
name: Route-sync safeguard
description: validate-seo.mjs enforces route sync across six files; adding a route has a fixed recipe.
---
The rule: every new route in the onboarding site must be added in sync to App.tsx, seoConfig.ts, the vite.config.ts prerender table, and the smoke.mjs routes list; non-prerendered routes also need explicit entries in BOTH public/_redirects and vercel.json. `node scripts/validate-seo.mjs` fails loudly on any drift (including indexable-flag mismatch between seoConfig and the prerender table, and placeholder metadata on indexable routes).

**Why:** the five-file sync was the highest-risk failure mode identified in the Learn audit; the safeguard turns silent SEO drift into a build-time failure.

**How to apply:** run validate-seo after any route change; deliberate exclusions live as documented lists (smokeExcludedRoutes in smoke.mjs, SPA_ONLY_ROUTES/REDIRECT_ALIASES in validate-seo.mjs) — extend those lists, never bypass the check.

Gotcha: `pnpm run build` without `VITE_SITE_ENV=production` regenerates (deletes) public/sitemap.xml for prototype env. Re-run the build or `node scripts/generate-sitemap.mjs --env=production` before committing, or the committed sitemap disappears.
