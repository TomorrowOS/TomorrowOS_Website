#!/usr/bin/env node
/**
 * Route smoke test: fetches every configured route from the running dev
 * server and checks for HTTP 200 plus a non-empty HTML document.
 * Also validates sitemap.xml and robots.txt are served.
 *
 * Usage: node scripts/smoke.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:80
 */
const base = process.argv[2] || 'http://127.0.0.1:80';

const routes = [
  '/', '/about', '/start', '/start/guided', '/start/guided/replit',
  '/start/guided/vercel', '/start/terminal', '/connect/server-sdk',
  '/connect/api', '/guides/supabase', '/guides/cloudinary', '/guides/vercel',
  '/guides/neon', '/guides/vercel-blob', '/guides/content',
  '/guides/platforms', '/guides/platforms/samsung-tizen',
  '/compatibility', '/compatibility/media', '/privacy', '/terms',
  '/cookie-policy', '/cookie-settings', '/quickstart',
];

const staticFiles = ['/robots.txt', '/sitemap.xml', '/favicon.svg'];

let failures = 0;
for (const path of [...routes, ...staticFiles]) {
  try {
    const res = await fetch(`${base}${path}`, { redirect: 'follow' });
    const body = await res.text();
    const ok = res.status === 200 && body.length > 0;
    if (!ok) {
      failures++;
      console.error(`FAIL ${path} → ${res.status} (${body.length} bytes)`);
    } else {
      console.log(`ok   ${path} → ${res.status}`);
    }
  } catch (e) {
    failures++;
    console.error(`FAIL ${path} → ${e.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} route(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${routes.length + staticFiles.length} checks passed`);
