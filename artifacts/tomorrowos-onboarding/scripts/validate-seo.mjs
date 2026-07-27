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

if (failures > 0) {
  console.error(`\n${failures} validation failure(s)`);
  process.exit(1);
}
console.log('\nAll SEO validations passed');
