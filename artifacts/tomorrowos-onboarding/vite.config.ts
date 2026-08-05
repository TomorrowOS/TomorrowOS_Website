import path from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// Shared article metadata + FAQ source of truth for the cornerstone article.
// Imported by BOTH this prerender plugin and the article page so the
// structured data can never drift from the visible content.
import { CMS_ARTICLE, CMS_ARTICLE_FAQ, BLOG_AUTHOR } from './src/lib/cmsArticleMeta';
import { DOOH_ARTICLE, DOOH_ARTICLE_FAQ } from './src/lib/doohArticleMeta';

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
    /** Optional OG title override (used when og:title must omit the " | TomorrowOS" suffix). */
    ogTitle?: string;
    /** Optional OG description override (when it should differ from the meta description). */
    ogDescription?: string;
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
      rawTitle: 'Platform Compatibility',
      description:
        'See supported platforms, tested devices, validated firmware, runtime status and known limitations for TomorrowOS digital signage players.',
      canonicalPath: '/compatibility',
      indexable: false,
    },
    '/compatibility/media': {
      rawTitle: 'Media Compatibility',
      description:
        'See tested media formats, codecs, resolutions, playback results and known platform limitations for TomorrowOS digital signage players.',
      canonicalPath: '/compatibility/media',
      indexable: true,
    },
    '/blog': {
      rawTitle: 'Digital Signage Engineering Blog',
      description:
        'Read practical guides about building digital signage software, open-source infrastructure, screen platforms, playback and reliable device operations.',
      canonicalPath: '/blog',
      // Flipped to indexable on 2026-08-03 — first pillar article shipped.
      indexable: true,
    },
    // Cornerstone article (root-level pillar page). Metadata sourced from
    // src/lib/cmsArticleMeta.ts so it cannot drift from the page. The key is
    // a literal (not CMS_ARTICLE.path) so validate-seo's route-sync parser
    // can see it; a startup assertion below guards against divergence.
    '/build-a-digital-signage-cms': {
      rawTitle: CMS_ARTICLE.headline,
      description: CMS_ARTICLE.description,
      canonicalPath: CMS_ARTICLE.path,
      indexable: true,
      ogTitle: CMS_ARTICLE.ogTitle,
      ogDescription: CMS_ARTICLE.ogDescription,
    },
    // Cornerstone article #2 — same literal-key rule as above; metadata
    // sourced from src/lib/doohArticleMeta.ts.
    '/how-to-start-a-dooh-network': {
      rawTitle: DOOH_ARTICLE.headline,
      description: DOOH_ARTICLE.description,
      canonicalPath: DOOH_ARTICLE.path,
      indexable: true,
      ogTitle: DOOH_ARTICLE.ogTitle,
      ogDescription: DOOH_ARTICLE.ogDescription,
    },
    // Learn section — feature-gated behind VITE_ENABLE_LEARN. Entries are
    // preserved metadata drafts; the prerender loop skips them when the flag
    // is off, so no /learn HTML is emitted in a disabled build.
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
      rawTitle: 'BrightSign Digital Signage Player Support',
      description:
        'See supported BrightSign series, tested models, firmware requirements, media limitations and the TomorrowOS player installation and pairing flow.',
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

  // Guard: the literal cornerstone key above must match the shared module.
  if (!routes[CMS_ARTICLE.path]) {
    throw new Error(
      `[prerender] cornerstone route key mismatch: routes table has no entry for CMS_ARTICLE.path "${CMS_ARTICLE.path}" — keep the literal key in sync with src/lib/cmsArticleMeta.ts`,
    );
  }
  if (!routes[DOOH_ARTICLE.path]) {
    throw new Error(
      `[prerender] cornerstone route key mismatch: routes table has no entry for DOOH_ARTICLE.path "${DOOH_ARTICLE.path}" — keep the literal key in sync with src/lib/doohArticleMeta.ts`,
    );
  }

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

    // Cornerstone articles: TechArticle + BreadcrumbList (Home → Blog → title)
    // + FAQPage, all sourced from the shared per-article meta modules so the
    // structured data always matches the visible page content.
    const cornerstone =
      routePath === CMS_ARTICLE.path
        ? { meta: CMS_ARTICLE, faq: CMS_ARTICLE_FAQ }
        : routePath === DOOH_ARTICLE.path
          ? { meta: DOOH_ARTICLE, faq: DOOH_ARTICLE_FAQ }
          : null;
    if (cornerstone) {
      const { meta, faq } = cornerstone;
      const canonicalUrl = `${SITE_URL}${route.canonicalPath}`;
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: meta.headline,
        description: meta.description,
        url: canonicalUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        author: {
          '@type': 'Person',
          name: BLOG_AUTHOR.name,
          jobTitle: BLOG_AUTHOR.role,
          sameAs: [BLOG_AUTHOR.linkedin, BLOG_AUTHOR.github],
        },
        publisher: { '@type': 'Organization', name: 'TomorrowOS', url: `${SITE_URL}/` },
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: meta.headline, item: canonicalUrl },
        ],
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      });
      return schemas
        .map(
          (s, i) =>
            `    <script type="application/ld+json" id="prerender-jsonld-${i}">${JSON.stringify(s)}</script>`,
        )
        .join('\n');
    }

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
      routePath === '/blog' ||
      routePath === '/learn' ||
      routePath === '/learn/brightsign-digital-signage-player' ||
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
      // Insert the Learn crumb for Learn article sub-pages.
      if (routePath.startsWith('/learn/')) {
        crumbs.push({ name: 'Learn', item: `${SITE_URL}/learn` });
      }
      // Insert the Compatibility crumb for compatibility sub-pages.
      if (routePath.startsWith('/compatibility/')) {
        crumbs.push({ name: 'Compatibility', item: `${SITE_URL}/compatibility` });
      }
      crumbs.push({
        // Keep structured data consistent with the visible breadcrumbs.
        name:
          routePath === '/blog'
            ? 'Blog'
            : routePath === '/learn'
            ? 'Learn'
            : routePath === '/learn/brightsign-digital-signage-player'
              ? 'BrightSign'
              : routePath === '/compatibility'
                ? 'Compatibility'
                : routePath === '/compatibility/media'
                  ? 'Media'
                  : route.rawTitle,
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

      // Feature gate: when VITE_ENABLE_LEARN is not 'true', /learn routes are
      // not registered in the app router, so no static HTML may be emitted
      // for them — a disabled Learn page must resolve to the SPA NotFound
      // experience, not a prerendered shell.
      const learnEnabled = process.env.VITE_ENABLE_LEARN === 'true';
      const activeRoutes = Object.entries(routes).filter(
        ([p]) => learnEnabled || !(p === '/learn' || p.startsWith('/learn/')),
      );
      if (!learnEnabled) {
        console.log(
          '   [prerender] VITE_ENABLE_LEARN is off — /learn routes excluded from prerendering.',
        );
      }

      for (const [routePath, route] of activeRoutes) {
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
        const ogTitle = route.ogTitle ?? fullTitle;
        const ogDescription = route.ogDescription ?? route.description;
        html = html.replace(
          /<meta property="og:title" content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${escAttr(ogTitle)}" />`,
        );
        html = html.replace(
          /<meta property="og:description" content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${escAttr(ogDescription)}" />`,
        );
        html = html.replace(
          /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
          `<meta name="twitter:title" content="${escAttr(ogTitle)}" />`,
        );
        html = html.replace(
          /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
          `<meta name="twitter:description" content="${escAttr(ogDescription)}" />`,
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
