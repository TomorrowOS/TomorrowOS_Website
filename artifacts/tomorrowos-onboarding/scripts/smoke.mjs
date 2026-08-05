#!/usr/bin/env node
/**
 * Route smoke test: fetches every configured route from the running server
 * and checks HTTP status, response shape, robots policy, and static assets.
 *
 * SPA limitation (documented, not hidden): the server returns the same HTML
 * shell (HTTP 200) for every path, including unknown ones. Server-side
 * soft-404 detection and per-route raw-HTML metadata checks therefore cannot
 * pass until pre-rendering is implemented (see LAUNCH_CHECKLIST.md). What CAN
 * be verified from raw HTML — the global robots directive, absence of
 * unresolved placeholders and template artefacts — is verified here.
 *
 * Usage: node scripts/smoke.mjs [baseUrl] [--env=prototype|production]
 */
const base = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://127.0.0.1:80';
const envArg = process.argv.find((a) => a.startsWith('--env='))?.slice(6) ?? 'prototype';

// Learn is feature-gated behind VITE_ENABLE_LEARN (see src/lib/featureFlags.ts).
// When disabled (production default) the /learn routes resolve to the SPA
// NotFound experience and are excluded from prerendering, so smoke coverage
// checks them only when the flag is explicitly enabled.
const LEARN_ENABLED = process.env.VITE_ENABLE_LEARN === 'true';

const routes = [
  '/', '/about', '/blog', '/start', '/start/guided', '/start/guided/replit',
  '/start/guided/vercel', '/start/terminal', '/connect/server-sdk',
  '/connect/api', '/guides/supabase', '/guides/cloudinary', '/guides/vercel',
  '/guides/neon', '/guides/vercel-blob', '/guides/content',
  '/guides/platforms', '/guides/platforms/samsung-tizen',
  '/guides/platforms/samsung-tizen/magicinfo',
  '/compatibility', '/compatibility/media', '/privacy', '/terms',
  '/cookie-policy', '/cookie-settings', '/quickstart',
  '/build-a-digital-signage-cms',
  '/how-to-start-a-dooh-network',
  // Learn section — feature-gated (skipped below unless VITE_ENABLE_LEARN=true);
  // must always be noindex in either state.
  '/learn',
  '/learn/build-a-digital-signage-cms',
  '/learn/digital-signage-sdk',
  '/learn/digital-signage-api',
  '/learn/open-source-digital-signage',
  '/learn/self-hosted-digital-signage',
  '/learn/headless-digital-signage',
  '/learn/samsung-tizen-digital-signage-player',
  '/learn/brightsign-digital-signage-player',
];

// Deliberate smoke-coverage exclusions: SPA-only placeholder routes with
// component-level noindex and no prerendered HTML (production builds serve
// the raw shell for them, which carries no robots meta). Documented here so
// the route-sync safeguard in validate-seo.mjs can account for them.
export const smokeExcludedRoutes = ['/github', '/community', '/license'];

// Routes expected to be indexable in production (must mirror the
// `indexable: true` entries in src/lib/seoConfig.ts). All other routes must
// carry an explicit "noindex, follow" baked in by the prerender plugin.
const indexableRoutes = new Set([
  '/', '/about', '/connect/server-sdk', '/connect/api',
  '/guides/supabase', '/guides/cloudinary', '/guides/vercel', '/guides/neon',
  '/guides/vercel-blob', '/guides/content', '/guides/platforms',
  '/guides/platforms/samsung-tizen', '/compatibility/media',
  '/blog', '/build-a-digital-signage-cms', '/how-to-start-a-dooh-network',
]);

const staticFiles = ['/robots.txt', '/favicon.svg', '/og/tomorrowos-social-v1.png'];
if (envArg === 'production') staticFiles.push('/sitemap.xml');

let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL ${msg}`); };

const activeRoutes = routes.filter((r) => LEARN_ENABLED || !r.startsWith('/learn'));

for (const path of [...activeRoutes, ...staticFiles]) {
  try {
    const res = await fetch(`${base}${path}`, { redirect: 'follow' });
    const isAsset = staticFiles.includes(path);
    const body = isAsset && !path.endsWith('.txt') && !path.endsWith('.xml') ? '' : await res.text();
    if (res.status !== 200) { fail(`${path} → ${res.status}`); continue; }
    if (!isAsset) {
      if (body.length === 0) { fail(`${path} → empty body`); continue; }
      if (/\{\{[A-Z_]+\}\}/.test(body)) fail(`${path} → unresolved {{PLACEHOLDER}} in HTML`);
      if (body.includes('[object Object]')) fail(`${path} → [object Object] in HTML`);
      if (body.includes('>undefined<')) fail(`${path} → literal undefined in HTML`);
      // Robots directive from the built shell. Production builds bake a
      // per-route directive into each pre-rendered page: indexable routes
      // get "index, follow", everything else an explicit "noindex, follow".
      const robots = body.match(/<meta name="robots" content="([^"]+)"/)?.[1];
      if (envArg === 'production') {
        if (path === '/quickstart') {
          // Redirect alias: no prerendered page — hosts serve the homepage
          // shell (canonical "/") and the client redirects to "/".
        } else if (indexableRoutes.has(path)) {
          if (!robots || robots.includes('noindex')) fail(`${path} → indexable route carries noindex in production ("${robots ?? 'missing'}")`);
        } else {
          if (!robots || !robots.includes('noindex')) fail(`${path} → non-indexable route missing explicit noindex in production ("${robots ?? 'missing'}")`);
        }
      } else {
        if (!robots || !robots.includes('noindex')) fail(`${path} → prototype/preview build missing global noindex`);
        if (robots && robots.includes('index, follow') && !robots.includes('noindex')) fail(`${path} → prototype build allows indexing`);
      }
    }
    console.log(`ok   ${path} → ${res.status}`);
  } catch (e) {
    fail(`${path} → ${e.message}`);
  }
}

/* Unknown route: SPA serves the shell with 200 — verify it does, and record
   the documented limitation instead of pretending it is a hard 404. */
try {
  const res = await fetch(`${base}/this-page-does-not-exist`);
  if (res.status === 200) {
    console.log('ok   /this-page-does-not-exist → 200 (SPA shell; client renders noindex 404 page — server-side 404 status is a documented launch limitation)');
  } else if (res.status === 404) {
    console.log('ok   /this-page-does-not-exist → 404');
  } else {
    fail(`/this-page-does-not-exist → unexpected ${res.status}`);
  }
} catch (e) {
  fail(`/this-page-does-not-exist → ${e.message}`);
}

/* robots.txt consistency with environment */
try {
  const robotsTxt = await (await fetch(`${base}/robots.txt`)).text();
  // Post-launch, public/robots.txt is the production template (crawling
  // allowed + Sitemap line) in every environment; non-production builds
  // still emit a global noindex meta, which robots can only read because
  // crawling is not blocked. Only a crawl-blocking robots.txt is a failure.
  if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) {
    fail('robots.txt blocks all crawling — robots cannot read page-level noindex directives');
  }
  console.log('ok   robots.txt policy consistent with environment');
} catch (e) {
  fail(`robots.txt policy check → ${e.message}`);
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nAll smoke checks passed');
process.exit(0);
