# TomorrowOS — Production Launch Checklist

Canonical production domain: **https://tomorrowos.org**

## Rollback
- Pre-hardening git commit: `pre-go-live-hardening` (a39ac2d). Restore with
  `git revert`/checkout, or use a Replit checkpoint from before this pass.

## Environment switch
1. Build with `VITE_SITE_ENV=production` (plus `PORT` and `BASE_PATH=/`).
   - prototype/preview builds inject a global `noindex, follow` meta tag;
     production builds carry no global robots tag — per-route directives come
     from `src/lib/seoConfig.ts` at runtime.
   - The build script automatically runs `generate-sitemap.mjs` before Vite,
     so `public/sitemap.xml` (and its copy in `dist/`) is produced on every
     production build without a separate manual step.
2. Update `public/robots.txt` per the template inside that file
   (allow crawling + `Sitemap: https://tomorrowos.org/sitemap.xml`).
   (The sitemap is now generated automatically on production builds — step 2
   of the old template is no longer a separate manual action.)
4. When legal review completes, flip `/privacy`, `/terms`, `/cookie-policy`
   to `indexable: true` in `src/lib/seoConfig.ts` and remove the Draft banner
   (`draft={false}` on `LegalDocPage`).
5. Verify Review Mode is unavailable to normal users in production.

## Known launch blockers (honest status)
- **Pre-rendering implemented** via `prerenderPlugin` in `vite.config.ts`.
  After `vite build`, every route defined in that plugin's `routes` table
  gets a `<route>/index.html` written into `dist/public` with the correct
  `<title>`, `<meta name="description">`, `<link rel="canonical">`, og:url,
  og:image, twitter:image, per-route robots directive (production only), and
  JSON-LD structured data baked into `<head>`. Social bots and AI crawlers
  that fetch raw HTML without executing JavaScript will now see per-route
  metadata. Validation: after a production build, run
  `grep -m1 "<title>" dist/public/about/index.html` — must return
  `<title>About | TomorrowOS</title>`, not the homepage title. Also verify
  `dist/public/guides/supabase/index.html` contains `BreadcrumbList` JSON-LD.
- **Server-side 404 status.** Deployment configs for Netlify (`public/_redirects`)
  and Vercel (`vercel.json`) are in place. Both list every known SPA route
  explicitly (returning 200) and use a catch-all that serves the SPA shell
  with HTTP 404 for any unrecognised path. When deploying to a different host
  (Nginx, Caddy, etc.), mirror the same pattern: serve `index.html` for known
  routes and return HTTP 404 for the catch-all. The configs must be kept in
  sync with the `<Switch>` routes in `src/App.tsx` whenever new routes are
  added.
- **Lighthouse / Core Web Vitals.** Cannot be measured inside this workspace.
  Run Lighthouse against the production URL after launch; do not assume
  LCP ≤ 2.5 s / INP < 200 ms / CLS < 0.1 without measurement.
- **Company address placeholder** in `siteConfig.legal.address` must be
  resolved before legal pages go final.

## Required production redirects (configure at DNS/host level)
- `http://tomorrowos.org` → `https://tomorrowos.org`
- `http://www.tomorrowos.org` → `https://tomorrowos.org`
- `https://www.tomorrowos.org` → `https://tomorrowos.org`

## Google Search Console
- [ ] Verify property for https://tomorrowos.org
- [ ] Submit sitemap.xml
- [ ] URL-inspect: homepage, /about, one platform guide
- [ ] Confirm canonical selection matches `seoConfig.ts`
- [ ] Confirm mobile usability
- [ ] Review indexing exclusions (noindex routes should appear as "Excluded by noindex")
- [ ] Monitor Core Web Vitals and crawl errors
- (Search Console has NOT been configured yet.)

## Validation commands
- `pnpm run typecheck`
- `pnpm run build` (with env vars above)
- `pnpm run smoke -- http://127.0.0.1:80 --env=production` (against prod build)
- `pnpm run validate:seo`

## Deployment type
Current architecture is a static SPA build (`dist/public`) — suitable for
Static deployment with SPA fallback. Do not switch deployment types without
documenting the reason.
