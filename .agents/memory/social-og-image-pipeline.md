---
name: Social OG image pipeline
description: How the TomorrowOS social share card is produced and the rules for changing it
---
The default social card is a versioned raster (`public/og/tomorrowos-social-v1.png`, 1200×630 PNG). Its design source is `public/og-source/social-v1.html` — a fixed 1200×630 HTML page using the exact brand/platform assets and local Roboto.

**Why:** Preview systems (Slack/LinkedIn/X) cache fetched images by URL and expect conventional PNG cards; a broken auto-screenshot previously shipped with cropped text.

**How to apply:** To change the visual, edit the og-source HTML, screenshot it at exactly 1200×630, convert to PNG with sharp, and save under a NEW versioned filename (v2, v3…) — never overwrite the same URL, never use query-string cache busting. Update `index.html`, `use-seo.ts`, the prerender `ogImageUrl` in `vite.config.ts`, and run `pnpm run validate:social`. Page-specific overrides via `useSeo({ socialImage })` must be 1200×630 PNG or the hook intentionally drops the type/width/height tags. Building requires `PORT` and `BASE_PATH` env vars set.
