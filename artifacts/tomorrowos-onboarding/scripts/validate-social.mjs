#!/usr/bin/env node
/**
 * Social-metadata validation.
 *
 * Checks:
 *  - default social image exists at public/og/tomorrowos-social-v1.png
 *  - it is a real PNG with exact 1200 × 630 dimensions
 *  - index.html template carries the full OG/Twitter image tag set with
 *    absolute https://tomorrowos.org URLs
 *  - use-seo.ts and vite.config.ts (prerender) reference the same image
 *  - no code still references the old /og-image.png
 *  - no preview-domain URL leaks in social metadata
 *
 * Usage: node scripts/validate-social.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL ${msg}`); };
const ok = (msg) => console.log(`ok   ${msg}`);

const IMG_PATH = 'public/og/tomorrowos-social-v1.png';
const IMG_URL = 'https://tomorrowos.org/og/tomorrowos-social-v1.png';
const ALT = 'TomorrowOS — open-source digital signage foundation';

/* ---- image file ---- */
const imgFile = join(root, IMG_PATH);
if (!existsSync(imgFile)) {
  fail(`${IMG_PATH} missing`);
} else {
  const buf = readFileSync(imgFile);
  const isPng = buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47;
  isPng ? ok('social image is a PNG') : fail('social image is not a PNG');
  if (isPng) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    width === 1200 && height === 630
      ? ok(`social image is 1200 × 630`)
      : fail(`social image is ${width} × ${height}, expected 1200 × 630`);
  }
  buf.length < 600 * 1024
    ? ok(`social image size ${(buf.length / 1024).toFixed(1)} KB`)
    : fail(`social image is ${(buf.length / 1024).toFixed(1)} KB — too large`);
}

/* ---- index.html template tags ---- */
const html = readFileSync(join(root, 'index.html'), 'utf8');
const tag = (re, label) => (re.test(html) ? ok(label) : fail(`index.html missing ${label}`));
tag(new RegExp(`property="og:image" content="${IMG_URL}"`), 'og:image absolute URL');
tag(new RegExp(`property="og:image:secure_url" content="${IMG_URL}"`), 'og:image:secure_url');
tag(/property="og:image:type" content="image\/png"/, 'og:image:type image/png');
tag(/property="og:image:width" content="1200"/, 'og:image:width 1200');
tag(/property="og:image:height" content="630"/, 'og:image:height 630');
tag(new RegExp(`property="og:image:alt" content="${ALT}"`), 'og:image:alt');
tag(/name="twitter:card" content="summary_large_image"/, 'twitter:card summary_large_image');
tag(new RegExp(`name="twitter:image" content="${IMG_URL}"`), 'twitter:image');
tag(new RegExp(`name="twitter:image:alt" content="${ALT}"`), 'twitter:image:alt');

const imgHost = new URL(IMG_URL).hostname;
imgHost === 'tomorrowos.org' ? ok('image hostname is tomorrowos.org') : fail(`image hostname ${imgHost}`);

/* ---- central config + prerender reference the same image ---- */
const useSeo = readFileSync(join(root, 'src/hooks/use-seo.ts'), 'utf8');
useSeo.includes("absoluteUrl('/og/tomorrowos-social-v1.png')")
  ? ok('use-seo.ts default image is /og/tomorrowos-social-v1.png')
  : fail('use-seo.ts default image is not /og/tomorrowos-social-v1.png');

const vite = readFileSync(join(root, 'vite.config.ts'), 'utf8');
vite.includes('/og/tomorrowos-social-v1.png')
  ? ok('prerender plugin uses /og/tomorrowos-social-v1.png')
  : fail('prerender plugin does not use the new social image');

/* ---- no stale /og-image.png references, no preview-domain leaks ---- */
for (const f of ['index.html', 'src/hooks/use-seo.ts', 'vite.config.ts']) {
  const s = readFileSync(join(root, f), 'utf8');
  s.includes('/og-image.png')
    ? fail(`${f} still references old /og-image.png`)
    : ok(`${f} has no old og-image.png reference`);
  /replit\.(dev|app)/.test(s.match(/og:image[^\n]*/g)?.join('\n') ?? '')
    ? fail(`${f} social metadata leaks a preview domain`)
    : ok(`${f} social metadata has no preview-domain leak`);
}

console.log(failures ? `\n${failures} failure(s)` : '\nAll social-metadata checks passed');
process.exit(failures ? 1 : 0);
