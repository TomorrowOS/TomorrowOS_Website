#!/usr/bin/env node
/**
 * Validates the third-party trademark notice system:
 * - Central config exists with required keys
 * - Terms of Service contains the section with the correct anchor id
 * - Footer links to /terms#third-party-trademarks
 * - The full notice is not duplicated outside the central config
 * - No href="#" anywhere in src
 * - Canonical for /terms carries no fragment; sitemap has no fragment URLs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : ` — ${detail}`}`);
  if (!ok) failures++;
};

const legal = readFileSync(join(root, 'src/content/legal.ts'), 'utf8');
check('central config exists', legal.includes('export const thirdPartyTrademarkContent'));
for (const key of ['fullNotice', 'platformNote', 'developerToolsNote', 'legalReviewRequired']) {
  check(`central config has ${key}`, legal.includes(key));
}
check('terms section uses anchor id', legal.includes("anchorId: 'third-party-trademarks'"));
check(
  'terms section wired to central content',
  legal.includes('heading: thirdPartyTrademarkContent.heading') &&
    legal.includes('id: thirdPartyTrademarkContent.anchorId'),
);

const footer = readFileSync(join(root, 'src/components/WebsiteFooter.tsx'), 'utf8');
check('footer links to /terms#third-party-trademarks', footer.includes('"/terms#third-party-trademarks"'));
check('footer does not repeat full notice', !footer.includes('property of their respective owners'));

// Walk src for duplicated notice text and href="#"
const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|mjs)$/.test(entry)) files.push(p);
  }
  return files;
};
const srcFiles = walk(join(root, 'src'));
const noticeSnippet = 'property of their respective owners';
const dupes = srcFiles.filter(
  (f) => !f.endsWith('content/legal.ts') && readFileSync(f, 'utf8').includes(noticeSnippet),
);
check('full notice not duplicated outside legal.ts', dupes.length === 0, dupes.join(', '));
const hashHrefs = srcFiles.filter((f) => /href=["']#["']/.test(readFileSync(f, 'utf8')));
check('no href="#" in src', hashHrefs.length === 0, hashHrefs.join(', '));

// Canonical + sitemap (source-level)
const seoConfig = readFileSync(join(root, 'src/lib/seoConfig.ts'), 'utf8');
check('canonical for /terms has no fragment', !/canonicalPath:\s*'\/terms#/.test(seoConfig));

const distSitemap = join(root, 'dist/sitemap.xml');
if (existsSync(distSitemap)) {
  const sitemap = readFileSync(distSitemap, 'utf8');
  check('sitemap has no fragment URLs', !sitemap.includes('#'));
} else {
  console.log('SKIP  sitemap check (dist/sitemap.xml not built)');
}

console.log(failures === 0 ? '\nAll trademark checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
