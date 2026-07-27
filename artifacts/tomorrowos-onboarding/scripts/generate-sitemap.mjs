#!/usr/bin/env node
/**
 * Environment-aware sitemap generator.
 *
 * Reads the central route metadata in src/lib/seoConfig.ts (single source of
 * truth) and writes public/sitemap.xml containing ONLY canonical, indexable
 * routes on the production hostname.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs --env=production
 *
 * In prototype/preview the site publishes no sitemap (everything is noindex),
 * so running without --env=production refuses and removes any stale sitemap.
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://tomorrowos.org';
const envArg = process.argv.find((a) => a.startsWith('--env='))?.slice(6) ?? 'prototype';
const out = join(root, 'public/sitemap.xml');

const src = readFileSync(join(root, 'src/lib/seoConfig.ts'), 'utf8');
const entries = [];
const entryRe = /canonicalPath:\s*'([^']+)',\s*indexable:\s*(true|false)/g;
let m;
while ((m = entryRe.exec(src)) !== null) {
  entries.push({ path: m[1], indexable: m[2] === 'true' });
}
if (entries.length === 0) {
  console.error('Could not parse any routes from seoConfig.ts');
  process.exit(1);
}

if (envArg !== 'production') {
  if (existsSync(out)) {
    unlinkSync(out);
    console.log('Removed public/sitemap.xml (non-production environment publishes no sitemap).');
  } else {
    console.log('No sitemap published in non-production environments. Nothing to do.');
  }
  process.exit(0);
}

const indexable = entries.filter((e) => e.indexable);
const urls = indexable
  .map((e) => `  <url><loc>${SITE_URL}${e.path === '/' ? '/' : e.path}</loc></url>`)
  .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(out, xml);
console.log(`Wrote ${indexable.length} indexable URLs to public/sitemap.xml`);
console.log('Excluded (noindex):', entries.filter((e) => !e.indexable).map((e) => e.path).join(', '));
