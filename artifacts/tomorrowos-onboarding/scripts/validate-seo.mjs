#!/usr/bin/env node
/**
 * Static SEO/content validation against the single metadata source
 * (src/lib/seoConfig.ts) and the page source tree.
 *
 * Checks:
 *  - every route has non-empty title, description, canonicalPath
 *  - canonicalPath is root-relative, matches the route key, no query state
 *  - no two routes share identical title or description
 *  - no unresolved {{PLACEHOLDER}} tokens in route metadata
 *  - utility routes that must stay noindex are not marked indexable
 *  - sitemap.xml (when present) contains exactly the indexable canonicals
 *    on https://tomorrowos.org — and never noindex/preview URLs
 *  - no href="#" or empty href in page/component sources
 *  - no canonical/OG code pointing at replit preview domains
 *
 * Usage: node scripts/validate-seo.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL ${msg}`); };
const ok = (msg) => console.log(`ok   ${msg}`);

/* ---- parse seoConfig.ts ---- */
const src = readFileSync(join(root, 'src/lib/seoConfig.ts'), 'utf8');
const routeRe = /'(\/[^']*)':\s*\{\s*title:\s*'((?:[^'\\]|\\.)*)',\s*description:\s*\n?\s*'((?:[^'\\]|\\.)*)',\s*canonicalPath:\s*'([^']+)',\s*indexable:\s*(true|false)/g;
const routes = [];
let m;
while ((m = routeRe.exec(src)) !== null) {
  routes.push({ key: m[1], title: m[2], description: m[3], canonicalPath: m[4], indexable: m[5] === 'true' });
}
if (routes.length < 10) fail(`only parsed ${routes.length} routes from seoConfig.ts — parser or config problem`);
else ok(`parsed ${routes.length} routes from seoConfig.ts`);

const NEVER_INDEX = ['/start', '/cookie-settings', '/start/guided', '/start/guided/replit', '/start/guided/vercel', '/start/terminal'];

const titles = new Map();
const descs = new Map();
for (const r of routes) {
  if (!r.title.trim()) fail(`${r.key}: empty title`);
  if (!r.description.trim()) fail(`${r.key}: empty description`);
  if (!r.canonicalPath.startsWith('/')) fail(`${r.key}: canonical not root-relative`);
  if (r.canonicalPath !== r.key) fail(`${r.key}: canonical (${r.canonicalPath}) does not self-reference`);
  if (r.canonicalPath.includes('?')) fail(`${r.key}: canonical contains query state`);
  if (/\{\{.*\}\}/.test(r.title + r.description)) fail(`${r.key}: unresolved placeholder in metadata`);
  if (titles.has(r.title)) fail(`duplicate title "${r.title}" on ${titles.get(r.title)} and ${r.key}`);
  if (descs.has(r.description)) fail(`duplicate description on ${descs.get(r.description)} and ${r.key}`);
  titles.set(r.title, r.key);
  descs.set(r.description, r.key);
  if (NEVER_INDEX.includes(r.key) && r.indexable) fail(`${r.key} must never be indexable`);
}
ok('metadata uniqueness, canonicals and noindex policy checked');

/* ---- router coverage: every static App.tsx route needs an explicit policy ---- */
const appSrc = readFileSync(join(root, 'src/App.tsx'), 'utf8');
const appRoutes = [...appSrc.matchAll(/<Route path="(\/[^"]*)"/g)].map((x) => x[1]);
// Routes rendered by PlaceholderPage are hard-noindex in the component itself.
const placeholderRoutes = [...appSrc.matchAll(/<Route path="(\/[^"]*)" component=\{\(\) => <PlaceholderPage/g)].map((x) => x[1]);
const configured = new Set(routes.map((r) => r.key));
for (const p of appRoutes) {
  if (p.includes(':')) continue; // dynamic params handled by page components
  if (p === '/quickstart') continue; // redirect alias to /
  if (p === '/blog') continue; // redirect alias to /journal (moved 2026-08-05)
  if (placeholderRoutes.includes(p)) continue; // component-level noindex
  if (!configured.has(p)) fail(`App.tsx route ${p} has no entry in seoConfig.ts (indexing policy undefined)`);
}
ok(`router coverage checked (${appRoutes.length} routes, ${placeholderRoutes.length} placeholder noindex)`);

/* ---- sitemap consistency ---- */
const sitemapPath = join(root, 'public/sitemap.xml');
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
  const expected = new Set(routes.filter((r) => r.indexable).map((r) => `https://tomorrowos.org${r.key === '/' ? '/' : r.key}`));
  for (const loc of locs) {
    if (!loc.startsWith('https://tomorrowos.org')) fail(`sitemap URL on wrong host: ${loc}`);
    if (!expected.has(loc)) fail(`sitemap contains non-indexable or unknown URL: ${loc}`);
  }
  for (const e of expected) if (!locs.includes(e)) fail(`sitemap missing indexable URL: ${e}`);
  ok(`sitemap.xml checked (${locs.length} URLs)`);
} else {
  ok('no sitemap.xml present (correct for prototype/preview)');
}

/* ---- source scans ---- */
function walk(dir, files = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx|ts)$/.test(f)) files.push(p);
  }
  return files;
}
const files = walk(join(root, 'src'));
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const rel = f.slice(root.length + 1);
  // href="#" is allowed only when guarded by a preventDefault placeholder pattern
  const badHref = [...text.matchAll(/href="#"/g)];
  if (badHref.length > 0 && !text.includes('preventDefault')) {
    fail(`${rel}: href="#" without preventDefault guard (${badHref.length}x)`);
  }
  if (text.includes('href=""')) fail(`${rel}: empty href`);
  if (/window\.location\.origin.*canonical|canonical.*window\.location\.origin/.test(text)) {
    fail(`${rel}: canonical derived from window.location.origin (preview-domain risk)`);
  }
  // Replit domains are only a problem in links/canonicals — instructional
  // example text (e.g. "https://my-app.replit.app" shown as sample output in
  // the Replit build pathway) is intentional product content.
  if (/(href|canonical|og:url)[^\n]*replit\.(dev|app)/.test(text)) {
    fail(`${rel}: replit domain used in a link/canonical`);
  }
}
ok(`scanned ${files.length} source files for link/domain issues`);

/* ================================================================== */
/* ---- route-sync safeguard ----------------------------------------- */
/* Compares route definitions across the six sources that must stay in
 * sync whenever a route is added, renamed or removed:
 *   1. src/App.tsx                  (application router)
 *   2. src/lib/seoConfig.ts         (metadata + indexing policy)
 *   3. vite.config.ts               (prerender route table)
 *   4. scripts/smoke.mjs            (route + indexable coverage)
 *   5. public/_redirects            (Netlify mirror-host routing)
 *   6. vercel.json                  (Vercel mirror-host routing)
 *
 * Mirror-host convention (documented in _redirects/vercel.json): routes in
 * the prerender table are served from their static files by the host
 * filesystem, so they need NO explicit mirror entry. Routes NOT prerendered
 * must be explicitly listed in BOTH mirror files.
 */

// Deliberate exclusions, each documented at its source:
const REDIRECT_ALIASES = ['/quickstart', '/blog']; // client redirects (/quickstart → /, /blog → /journal) — exempt from SEO/prerender checks, NOT from mirror-host checks
const SPA_ONLY_ROUTES = ['/github', '/community', '/license']; // PlaceholderPage, component-level noindex

// -- source 1: App.tsx static routes (already parsed above as appRoutes) --
const appStatic = appRoutes.filter((p) => !p.includes(':'));

// -- source 3: prerender table in vite.config.ts --
const viteSrc = readFileSync(join(root, 'vite.config.ts'), 'utf8');
const prerenderRoutes = [...viteSrc.matchAll(/'(\/[^']*)':\s*\{\s*rawTitle:/g)].map((x) => x[1]);
if (prerenderRoutes.length < 10) fail(`route-sync: only parsed ${prerenderRoutes.length} prerender routes from vite.config.ts — parser or config problem`);
const prerenderSet = new Set(prerenderRoutes);

// -- source 4: smoke.mjs route list + indexable set --
const smokeSrc = readFileSync(join(root, 'scripts/smoke.mjs'), 'utf8');
const smokeRoutesBlock = smokeSrc.match(/const routes = \[([\s\S]*?)\];/)?.[1] ?? '';
const smokeIndexBlock = smokeSrc.match(/const indexableRoutes = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? '';
const smokeRoutes = new Set([...smokeRoutesBlock.matchAll(/'(\/[^']*)'/g)].map((x) => x[1]));
const smokeIndexable = new Set([...smokeIndexBlock.matchAll(/'(\/[^']*)'/g)].map((x) => x[1]));
if (smokeRoutes.size < 10) fail('route-sync: could not parse the routes list in scripts/smoke.mjs');
// Smoke exclusions live in one place — scripts/smoke.mjs (smokeExcludedRoutes).
// Parse them from there so the two files cannot drift apart silently, and
// require every exclusion to be a documented SPA-only route.
const smokeExcludedBlock = smokeSrc.match(/const smokeExcludedRoutes = \[([\s\S]*?)\]/)?.[1] ?? '';
const SMOKE_EXCLUDED = [...smokeExcludedBlock.matchAll(/'(\/[^']*)'/g)].map((x) => x[1]);
if (SMOKE_EXCLUDED.length === 0) fail('route-sync: could not parse smokeExcludedRoutes in scripts/smoke.mjs');
for (const p of SMOKE_EXCLUDED) {
  if (!SPA_ONLY_ROUTES.includes(p)) fail(`route-sync: ${p} is excluded from smoke coverage in scripts/smoke.mjs but is not a documented SPA-only route — remove the exclusion or document the route`);
}

// -- sources 5 & 6: mirror-host explicit entries --
const redirectsSrc = readFileSync(join(root, 'public/_redirects'), 'utf8');
const redirectsRoutes = new Set(
  redirectsSrc.split('\n')
    .filter((l) => !l.trim().startsWith('#'))
    .map((l) => l.trim().match(/^(\/\S*)\s+\S+\s+\d+/)?.[1])
    .filter((p) => p && p !== '/*'),
);
const vercelJson = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const vercelRoutes = new Set(
  (vercelJson.routes ?? [])
    .map((r) => r.src)
    .filter((s) => typeof s === 'string' && /^\/[\w/-]*$/.test(s)),
);

const seoByKey = new Map(routes.map((r) => [r.key, r]));

for (const p of appStatic) {
  // Redirect aliases (REDIRECT_ALIASES) have no seoConfig entry (checked in
  // router coverage above) and no prerendered file, but still require
  // explicit mirror-host entries — so they are NOT skipped here.
  const isSpaOnly = SPA_ONLY_ROUTES.includes(p);

  // (a) App route missing SEO configuration (placeholder routes are
  //     component-level noindex — covered by the earlier router check).
  //     Already checked above; here we continue with the entry if present.
  const seo = seoByKey.get(p);

  // (b)/(c) prerender coverage: every configured static route should be
  //     prerendered (matches the existing architecture); SPA-only routes
  //     are the documented exception.
  if (!isSpaOnly && seo && !prerenderSet.has(p)) {
    fail(`route-sync: ${p} is in seoConfig.ts but missing from the vite.config.ts prerender table — add it so its static HTML (title/canonical/robots) is generated`);
  }

  // (d) smoke coverage.
  if (!SMOKE_EXCLUDED.includes(p) && !smokeRoutes.has(p)) {
    fail(`route-sync: ${p} is registered in App.tsx but missing from the routes list in scripts/smoke.mjs — add it to smoke coverage`);
  }

  // (e) mirror-host coverage: prerendered routes are served from the
  //     filesystem; everything else needs explicit entries in BOTH files.
  if (!prerenderSet.has(p)) {
    if (!redirectsRoutes.has(p)) fail(`route-sync: ${p} is not prerendered and missing from public/_redirects — add an explicit "${p} /index.html 200" entry`);
    if (!vercelRoutes.has(p)) fail(`route-sync: ${p} is not prerendered and missing from vercel.json routes — add an explicit {"src": "${p}", "dest": "/index.html"} entry`);
  }
}

// (c) Prerender route missing application route.
for (const p of prerenderRoutes) {
  if (!appStatic.includes(p)) {
    fail(`route-sync: ${p} is in the vite.config.ts prerender table but not registered in src/App.tsx — register the route or remove it from the prerender table`);
  }
}

// seoConfig route not registered in the app (dead metadata).
for (const r of routes) {
  if (!appStatic.includes(r.key)) {
    fail(`route-sync: ${r.key} is in seoConfig.ts but has no route in src/App.tsx — register the route or remove the stale entry`);
  }
}

// (f) indexable routes must be in the smoke indexable set — and only they.
for (const r of routes) {
  if (r.indexable && !smokeIndexable.has(r.key)) {
    fail(`route-sync: ${r.key} is indexable:true in seoConfig.ts but missing from indexableRoutes in scripts/smoke.mjs — add it so production smoke asserts "index, follow"`);
  }
}
for (const p of smokeIndexable) {
  const seo = seoByKey.get(p);
  if (!seo) fail(`route-sync: ${p} is in smoke indexableRoutes but has no seoConfig.ts entry — remove it or configure the route`);
  else if (!seo.indexable) fail(`route-sync: ${p} is in smoke indexableRoutes but marked indexable:false in seoConfig.ts — resolve the conflicting indexing policy`);
}

// (g) placeholder metadata must never be indexable.
const PLACEHOLDER_PATTERNS = /\b(TBD|Draft|Placeholder|Coming Soon|Content pending|currently being prepared|being prepared)\b/i;
for (const r of routes) {
  if (r.indexable && PLACEHOLDER_PATTERNS.test(`${r.title} ${r.description}`)) {
    fail(`route-sync: ${r.key} is indexable:true but its metadata looks like placeholder content — finish the metadata or set indexable:false`);
  }
}

// prerender table metadata must mirror seoConfig (title/indexable drift).
const preEntryRe = /'(\/[^']*)':\s*\{\s*rawTitle:\s*'((?:[^'\\]|\\.)*)',\s*description:\s*\n?\s*'((?:[^'\\]|\\.)*)',\s*canonicalPath:\s*'([^']+)',\s*indexable:\s*(true|false)/g;
let pm;
while ((pm = preEntryRe.exec(viteSrc)) !== null) {
  const [, key, , , , indexable] = pm;
  const seo = seoByKey.get(key);
  if (seo && seo.indexable !== (indexable === 'true')) {
    fail(`route-sync: ${key} indexable flag differs between seoConfig.ts (${seo.indexable}) and the vite.config.ts prerender table (${indexable}) — keep the two in sync`);
  }
}

ok(`route-sync safeguard checked ${appStatic.length} app routes across App.tsx, seoConfig.ts, vite.config.ts, smoke.mjs, _redirects and vercel.json`);

/* ================================================================== */
/* ---- feature-gated routes (VITE_ENABLE_LEARN) ---------------------- */
/* The /learn section is feature-gated: routes stay declared in App.tsx,
 * seoConfig.ts, the prerender table and smoke.mjs (so the sync checks
 * above keep passing), but every consumer must gate on the flag. These
 * checks make the gating explicit rather than silently excluded. */
const FEATURE_GATED_PREFIX = '/learn';
const gated = routes.filter(
  (r) => r.key === FEATURE_GATED_PREFIX || r.key.startsWith(`${FEATURE_GATED_PREFIX}/`),
);
if (gated.length === 0) fail('feature-gate: no /learn entries found in seoConfig.ts — gating checks have nothing to verify');

// (a) A gated route must never be indexable (in either flag state).
for (const r of gated) {
  if (r.indexable) fail(`feature-gate: ${r.key} is feature-gated but marked indexable:true — gated routes must stay noindex`);
}

// (b) A gated route must never appear in the committed sitemap.
const sitemapPath2 = join(root, 'public/sitemap.xml');
if (existsSync(sitemapPath2)) {
  const sm = readFileSync(sitemapPath2, 'utf8');
  if (sm.includes(`${FEATURE_GATED_PREFIX}`)) fail('feature-gate: production sitemap contains a /learn URL');
}

// (c) Every consumer must gate on the flag rather than list routes
//     unconditionally.
if (!appSrc.includes('LEARN_ENABLED')) fail('feature-gate: src/App.tsx does not gate /learn routes on LEARN_ENABLED');
if (!viteSrc.includes('VITE_ENABLE_LEARN')) fail('feature-gate: vite.config.ts prerender plugin does not gate /learn routes on VITE_ENABLE_LEARN');
if (!smokeSrc.includes('VITE_ENABLE_LEARN')) fail('feature-gate: scripts/smoke.mjs does not gate /learn coverage on VITE_ENABLE_LEARN');

// (d) No public navigation or page may link into /learn unless the link is
//     rendered behind the flag. Files under src/pages/learn and
//     src/components/learn are the gated section itself; learnResources.ts is
//     its data. Everything else must either not mention /learn hrefs or
//     visibly gate them (isRouteEnabled / LEARN_ENABLED) — data files are
//     allowed only when listed here with their gating render site.
const LEARN_LINK_ALLOWED = new Map([
  ['src/lib/platformCompatibility.ts', 'links filtered through isRouteEnabled in src/pages/Compatibility.tsx'],
  ['src/lib/featureFlags.ts', 'flag definition itself'],
  ['src/lib/seoConfig.ts', 'preserved metadata drafts, all noindex'],
  ['src/App.tsx', 'routes gated by LEARN_ENABLED'],
]);
for (const f of files) {
  const rel = f.slice(root.length + 1);
  if (rel.startsWith('src/pages/learn/') || rel.startsWith('src/components/learn/')) continue;
  if (rel === 'src/lib/learnResources.ts') continue;
  const text = readFileSync(f, 'utf8');
  const linksLearn = /(href="\/learn|href: '\/learn|href={["']\/learn|to="\/learn)/.test(text);
  if (!linksLearn) continue;
  if (LEARN_LINK_ALLOWED.has(rel)) continue;
  if (text.includes('isRouteEnabled') || text.includes('LEARN_ENABLED')) continue;
  fail(`feature-gate: ${rel} links to a /learn route without gating on the feature flag (wrap with isRouteEnabled or remove the link)`);
}

// (e) When the flag is off, a built dist must contain no prerendered /learn
//     HTML (run after a build to verify the emitted output).
const distLearn = join(root, 'dist/public/learn');
if (process.env.VITE_ENABLE_LEARN !== 'true' && existsSync(join(root, 'dist/public')) && existsSync(distLearn)) {
  fail('feature-gate: VITE_ENABLE_LEARN is off but dist/public/learn exists — stale or wrongly gated prerender output');
}
ok(`feature-gate safeguard checked ${gated.length} gated /learn routes (flag: VITE_ENABLE_LEARN=${process.env.VITE_ENABLE_LEARN ?? 'unset'})`);

if (failures > 0) {
  console.error(`\n${failures} validation failure(s)`);
  process.exit(1);
}
console.log('\nAll SEO validations passed');
