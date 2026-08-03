import path from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// Replit always injects PORT/BASE_PATH via artifact.toml.
// Local defaults keep `pnpm run dev:web` working in VS Code without env setup.
const rawPort = process.env.PORT ?? '5173';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';

/**
 * Generates per-route static HTML files after the Vite build completes.
 *
 * Every route defined in the routes table below gets its own
 * `<route>/index.html` written into `dist/public`. Each file has the
 * correct `<title>`, `<meta name="description">`, `<link rel="canonical">`,
 * og:url, og:image, twitter:image, per-route robots directive (production
 * only), and JSON-LD structured-data scripts baked into `<head>`.
 *
 * This makes per-route metadata visible to social bots (Twitter/X, LinkedIn,
 * Slack, Facebook) and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that
 * fetch raw HTML without executing JavaScript.
 *
 * Route data mirrors src/lib/seoConfig.ts — keep the two in sync.
 */
function prerenderPlugin() {
  const SITE_URL = 'https://tomorrowos.org';

  interface PreRoute {
    /** Page name without the " | TomorrowOS" suffix; used in breadcrumbs. */
    rawTitle: string;
    description: string;
    canonicalPath: string;
    indexable: boolean;
  }

  // Mirror of src/lib/seoConfig.ts — keep in sync.
  const routes: Record<string, PreRoute> = {
    '/': {
      rawTitle: 'Open-source digital signage foundation',
      description:
        'TomorrowOS is an open-source foundation for digital signage. Build your own CMS on shared device, playback and platform infrastructure.',
      canonicalPath: '/',
      indexable: true,
    },
    '/about': {
      rawTitle: 'About',
      description:
        'Learn why TomorrowOS is building an open foundation for digital signage, helping teams avoid rebuilding device, playback and platform infrastructure.',
      canonicalPath: '/about',
      indexable: true,
    },
    '/start': {
      rawTitle: 'Start building',
      description:
        'Choose how to build with TomorrowOS: start a new signage product or connect an existing application via the Server SDK or HTTP API.',
      canonicalPath: '/start',
      indexable: false,
    },
    '/start/guided': {
      rawTitle: 'Guided setup',
      description: 'Set up your TomorrowOS CMS with an AI-assisted, guided workflow.',
      canonicalPath: '/start/guided',
      indexable: false,
    },
    '/start/guided/replit': {
      rawTitle: 'Guided setup with Replit',
      description: 'Build and host your TomorrowOS CMS with Replit Agent, step by step.',
      canonicalPath: '/start/guided/replit',
      indexable: false,
    },
    '/start/guided/vercel': {
      rawTitle: 'Guided setup with v0 and Vercel',
      description: 'Create your TomorrowOS CMS with v0 and deploy it to Vercel, step by step.',
      canonicalPath: '/start/guided/vercel',
      indexable: false,
    },
    '/start/terminal': {
      rawTitle: 'Terminal setup',
      description: 'Set up TomorrowOS from your local development environment using the CLI.',
      canonicalPath: '/start/terminal',
      indexable: false,
    },
    '/connect/server-sdk': {
      rawTitle: 'Integrate the Server SDK',
      description:
        'Add TomorrowOS to an existing Node.js or TypeScript backend with the @tomorrowos/sdk package.',
      canonicalPath: '/connect/server-sdk',
      indexable: true,
    },
    '/connect/api': {
      rawTitle: 'Integrate the HTTP API',
      description: 'Connect any backend to TomorrowOS using a language-neutral HTTP API.',
      canonicalPath: '/connect/api',
      indexable: true,
    },
    '/guides/supabase': {
      rawTitle: 'Connect Supabase',
      description: 'Set up the Supabase database used by your TomorrowOS CMS.',
      canonicalPath: '/guides/supabase',
      indexable: true,
    },
    '/guides/cloudinary': {
      rawTitle: 'Connect Cloudinary',
      description: 'Set up Cloudinary media storage for images and videos in your TomorrowOS CMS.',
      canonicalPath: '/guides/cloudinary',
      indexable: true,
    },
    '/guides/vercel': {
      rawTitle: 'Deploy on Vercel',
      description: 'Configure and deploy your TomorrowOS CMS on Vercel.',
      canonicalPath: '/guides/vercel',
      indexable: true,
    },
    '/guides/neon': {
      rawTitle: 'Connect Neon',
      description: 'Set up a Neon Postgres database for your TomorrowOS CMS.',
      canonicalPath: '/guides/neon',
      indexable: true,
    },
    '/guides/vercel-blob': {
      rawTitle: 'Connect Vercel Blob',
      description: 'Set up Vercel Blob media storage for your TomorrowOS CMS.',
      canonicalPath: '/guides/vercel-blob',
      indexable: true,
    },
    '/guides/content': {
      rawTitle: 'Content guide',
      description: 'Add and schedule content on your TomorrowOS-powered screens.',
      canonicalPath: '/guides/content',
      indexable: true,
    },
    '/guides/platforms': {
      rawTitle: 'Platform guides',
      description: 'Install TomorrowOS players on supported screen platforms.',
      canonicalPath: '/guides/platforms',
      indexable: true,
    },
    '/guides/platforms/samsung-tizen': {
      rawTitle: 'Samsung Tizen guide',
      description: 'Install the TomorrowOS player on Samsung Tizen displays.',
      canonicalPath: '/guides/platforms/samsung-tizen',
      indexable: true,
    },
    '/guides/platforms/samsung-tizen/magicinfo': {
      rawTitle: 'Samsung Tizen MagicINFO troubleshooting',
      description:
        'Troubleshoot MagicINFO conflicts when installing the TomorrowOS player on Samsung Tizen displays.',
      canonicalPath: '/guides/platforms/samsung-tizen/magicinfo',
      indexable: false,
    },
    '/compatibility': {
      rawTitle: 'Compatibility',
      description: 'Check device and platform compatibility for TomorrowOS.',
      canonicalPath: '/compatibility',
      indexable: false,
    },
    '/compatibility/media': {
      rawTitle: 'Media compatibility',
      description: 'Supported media formats for TomorrowOS playback.',
      canonicalPath: '/compatibility/media',
      indexable: true,
    },
    // Learn section (Phase A shells) — noindex until real content ships.
    '/learn': {
      rawTitle: 'Developer Resource Centre',
      description:
        'The TomorrowOS learning centre: developer resources for building digital signage software on an open-source foundation.',
      canonicalPath: '/learn',
      indexable: false,
    },
    '/learn/build-a-digital-signage-cms': {
      rawTitle: 'Build a Digital Signage CMS',
      description:
        'Part of the TomorrowOS learning centre: how a digital signage CMS fits together and where TomorrowOS provides the foundation.',
      canonicalPath: '/learn/build-a-digital-signage-cms',
      indexable: false,
    },
    '/learn/digital-signage-sdk': {
      rawTitle: 'Digital Signage SDK',
      description:
        'Part of the TomorrowOS learning centre: the role of a server SDK when connecting an existing product to digital signage infrastructure.',
      canonicalPath: '/learn/digital-signage-sdk',
      indexable: false,
    },
    '/learn/digital-signage-api': {
      rawTitle: 'Digital Signage API',
      description:
        'Part of the TomorrowOS learning centre: how an HTTP API connects any backend to digital signage devices and playback.',
      canonicalPath: '/learn/digital-signage-api',
      indexable: false,
    },
    '/learn/open-source-digital-signage': {
      rawTitle: 'Open-Source Digital Signage',
      description:
        'Part of the TomorrowOS learning centre: what open-source means for digital signage architecture and ownership.',
      canonicalPath: '/learn/open-source-digital-signage',
      indexable: false,
    },
    '/learn/self-hosted-digital-signage': {
      rawTitle: 'Self-Hosted Digital Signage',
      description:
        'Part of the TomorrowOS learning centre: considerations for running digital signage infrastructure on your own hosting.',
      canonicalPath: '/learn/self-hosted-digital-signage',
      indexable: false,
    },
    '/learn/headless-digital-signage': {
      rawTitle: 'Headless Digital Signage',
      description:
        'Part of the TomorrowOS learning centre: separating signage infrastructure from the interface layer with a headless approach.',
      canonicalPath: '/learn/headless-digital-signage',
      indexable: false,
    },
    '/learn/samsung-tizen-digital-signage-player': {
      rawTitle: 'Samsung Tizen Signage Player',
      description:
        'Part of the TomorrowOS learning centre: the Samsung Tizen platform for digital signage playback.',
      canonicalPath: '/learn/samsung-tizen-digital-signage-player',
      indexable: false,
    },
    '/learn/brightsign-digital-signage-player': {
      rawTitle: 'BrightSign Signage Player',
      description:
        'Part of the TomorrowOS learning centre: the BrightSign platform for digital signage playback.',
      canonicalPath: '/learn/brightsign-digital-signage-player',
      indexable: false,
    },
    '/privacy': {
      rawTitle: 'Privacy Policy',
      description: 'How TomorrowOS collects, uses and protects your information.',
      canonicalPath: '/privacy',
      indexable: false,
    },
    '/terms': {
      rawTitle: 'Terms of Service',
      description: 'The terms that govern your use of TomorrowOS.',
      canonicalPath: '/terms',
      indexable: false,
    },
    '/cookie-policy': {
      rawTitle: 'Cookie Policy',
      description: 'How TomorrowOS uses cookies and similar technologies.',
      canonicalPath: '/cookie-policy',
      indexable: false,
    },
    '/cookie-settings': {
      rawTitle: 'Cookie Settings',
      description: 'Manage your cookie preferences for the TomorrowOS website.',
      canonicalPath: '/cookie-settings',
      indexable: false,
    },
  };

  /** Escape a string for safe use in an HTML attribute value (double-quoted). */
  function escAttr(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  /** Format the full <title> for a route. */
  function formatTitle(routePath: string, rawTitle: string): string {
    // Homepage uses the canonical em-dash brand positioning title.
    return routePath === '/'
      ? `TomorrowOS \u2014 ${rawTitle}`
      : `${rawTitle} | TomorrowOS`;
  }

  /**
   * Build JSON-LD script tags for a route:
   * - /           : Organization + SoftwareApplication schemas
   * - /about, /guides/*, /connect/*, /compatibility/* : BreadcrumbList
   */
  function buildJsonLd(routePath: string, route: PreRoute): string {
    const schemas: unknown[] = [];

    if (routePath === '/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TomorrowOS',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/brand/tomorrowos-logo.svg`,
        sameAs: ['https://github.com/TomorrowOS/TomorrowOS'],
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TomorrowOS',
        applicationCategory: 'DeveloperApplication',
        operatingSystem:
          'Web, Samsung Tizen, LG webOS, Android, BrightSign, Windows',
        description:
          'Open-source digital signage foundation. Build your own CMS on shared device, playback and platform infrastructure.',
        url: `${SITE_URL}/`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      });
    }

    const hasBreadcrumb =
      routePath === '/about' ||
      routePath.startsWith('/guides/') ||
      routePath.startsWith('/connect/') ||
      routePath.startsWith('/compatibility');

    if (hasBreadcrumb) {
      const crumbs: { name: string; item: string }[] = [
        { name: 'Home', item: `${SITE_URL}/` },
      ];
      // Insert an intermediate crumb for platform guide sub-pages.
      if (routePath.startsWith('/guides/platforms/')) {
        crumbs.push({
          name: 'Platform guides',
          item: `${SITE_URL}/guides/platforms`,
        });
      }
      crumbs.push({
        name: route.rawTitle,
        item: `${SITE_URL}${route.canonicalPath}`,
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      });
    }

    if (schemas.length === 0) return '';
    return schemas
      .map(
        (s, i) =>
          `    <script type="application/ld+json" id="prerender-jsonld-${i}">${JSON.stringify(s)}</script>`,
      )
      .join('\n');
  }

  return {
    name: 'prerender-routes',
    apply: 'build' as const,
    closeBundle: async () => {
      const env = process.env.VITE_SITE_ENV ?? 'prototype';
      const isProduction = env === 'production';
      const outDir = path.resolve(import.meta.dirname, 'dist/public');
      const templatePath = path.join(outDir, 'index.html');

      if (!existsSync(templatePath)) {
        console.warn(
          '\x1b[33m⚠\x1b[0m  [prerender] dist/public/index.html not found — skipping.',
        );
        return;
      }

      const template = readFileSync(templatePath, 'utf-8');
      let routeCount = 0;

      for (const [routePath, route] of Object.entries(routes)) {
        const fullTitle = formatTitle(routePath, route.rawTitle);
        const canonicalUrl = `${SITE_URL}${route.canonicalPath}`;
        const ogImageUrl = `${SITE_URL}/og/tomorrowos-social-v1.png`;
        const robots =
          isProduction && route.indexable ? 'index, follow' : 'noindex, follow';

        let html = template;

        // Replace existing head meta values with route-specific ones.
        html = html.replace(
          /<title>[^<]*<\/title>/,
          `<title>${escAttr(fullTitle)}</title>`,
        );
        html = html.replace(
          /<meta name="description" content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${escAttr(route.description)}" />`,
        );
        html = html.replace(
          /<meta property="og:title" content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${escAttr(fullTitle)}" />`,
        );
        html = html.replace(
          /<meta property="og:description" content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${escAttr(route.description)}" />`,
        );
        html = html.replace(
          /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
          `<meta name="twitter:title" content="${escAttr(fullTitle)}" />`,
        );
        html = html.replace(
          /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
          `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
        );

        // Replace canonical, og:url, og:image in-place — these tags are
        // present in the template with homepage-hardcoded values and must be
        // overwritten with the route-specific URL/image, not appended.
        html = html.replace(
          /<link rel="canonical" href="[^"]*"\s*\/?>/,
          `<link rel="canonical" href="${canonicalUrl}" />`,
        );
        html = html.replace(
          /<meta property="og:url" content="[^"]*"\s*\/?>/,
          `<meta property="og:url" content="${canonicalUrl}" />`,
        );
        html = html.replace(
          /<meta property="og:image" content="[^"]*"\s*\/?>/,
          `<meta property="og:image" content="${ogImageUrl}" />`,
        );

        // Inject before </head>: twitter:image (not in template), per-route
        // robots (production only), and JSON-LD structured data.
        const injections: string[] = [];
        if (/<meta name="twitter:image"/.test(html)) {
          // Already in the template (defensive) — replace in-place.
          html = html.replace(
            /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:image" content="${ogImageUrl}" />`,
          );
        } else {
          injections.push(`    <meta name="twitter:image" content="${ogImageUrl}" />`);
        }
        if (isProduction) {
          injections.push(`    <meta name="robots" content="${robots}" />`);
        }
        const jsonLd = buildJsonLd(routePath, route);
        if (jsonLd) injections.push(jsonLd);

        if (injections.length > 0) {
          html = html.replace(
            '</head>',
            `${injections.join('\n')}\n  </head>`,
          );
        }

        // Write to the route-specific output directory.
        const routeDir =
          routePath === '/'
            ? outDir
            : path.join(outDir, ...routePath.split('/').filter(Boolean));
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
        routeCount++;
      }

      // Sanity-check: assert no duplicate canonical / og:url on representative
      // routes so a template change that re-introduces the bug is caught early.
      const assertRoutes = ['/about', '/guides/supabase', '/start'];
      for (const ar of assertRoutes) {
        const arFile = path.join(
          outDir,
          ...ar.split('/').filter(Boolean),
          'index.html',
        );
        if (!existsSync(arFile)) continue;
        const arHtml = readFileSync(arFile, 'utf-8');
        const nCanonical = (arHtml.match(/<link rel="canonical"/g) ?? []).length;
        const nOgUrl = (arHtml.match(/<meta property="og:url"/g) ?? []).length;
        if (nCanonical !== 1 || nOgUrl !== 1) {
          throw new Error(
            `[prerender] Duplicate metadata detected in ${ar}: ` +
              `canonical×${nCanonical}, og:url×${nOgUrl}. ` +
              'Ensure the template does not already contain these tags before injection.',
          );
        }
      }

      console.log(
        `\x1b[32m✓\x1b[0m  [prerender] Generated ${routeCount} pre-rendered route HTML files.`,
      );
    },
  };
}

/**
 * Injects the robots meta tag into the built HTML based on VITE_SITE_ENV.
 * prototype/preview => noindex, follow (never indexed, links crawlable).
 * production        => no global robots tag; per-route directives are set
 *                      from src/lib/seoConfig.ts at runtime.
 */
function robotsDirectivePlugin() {
  const env = process.env.VITE_SITE_ENV ?? 'prototype';
  return {
    name: 'robots-directive',
    transformIndexHtml(html: string) {
      const tag =
        env === 'production'
          ? ''
          : '<meta name="robots" content="noindex, follow" />';
      return html.replace('<!--robots-directive-->', tag);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    prerenderPlugin(),
    robotsDirectivePlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
