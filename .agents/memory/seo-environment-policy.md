---
name: SEO environment policy
description: How indexing/robots/sitemap behaviour is controlled on the TomorrowOS onboarding site
---
Rule: all indexing behaviour derives from `VITE_SITE_ENV` (prototype default | preview | production) via siteConfig — never hard-code robots directives in index.html or pages.

**Why:** the site must stay noindex on preview domains but flip cleanly at launch; earlier setup mixed a hard-coded index.html noindex with per-page logic and window.origin canonicals (preview-domain canonical risk).

**How to apply:**
- Global robots meta is injected at build by a vite plugin (non-production → `noindex, follow`; production → none).
- Per-route policy lives only in `src/lib/seoConfig.ts` (`indexable` flags); `useSeo` always writes an explicit robots meta.
- Canonicals/og:url always use `https://tomorrowos.org` via `absoluteUrl()`.
- No sitemap in prototype/preview; production sitemap via `scripts/generate-sitemap.mjs --env=production`.
- `pnpm run validate:seo` diffs App.tsx routes against seoConfig — every new route needs an entry (or component-level noindex like PlaceholderPage).
- Known launch blockers are tracked honestly in `LAUNCH_CHECKLIST.md` (no pre-rendering, SPA 404 returns 200, Lighthouse pending).
