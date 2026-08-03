import { siteConfig } from "@/config/site";
/**
 * Central SEO configuration for every route.
 *
 * `indexable` records launch intent: while `siteConfig.isPrototype` is true the
 * whole site emits noindex regardless; once the prototype flag is lifted, only
 * routes marked `indexable: true` will be indexed (the rest keep an explicit
 * noindex). Setup-state URLs, preview-only routes and placeholder pages are
 * never indexable.
 */
export interface RouteSeo {
  title: string;
  description: string;
  /** Canonical path for the route (also used for og:url). */
  canonicalPath: string;
  /** Whether this route should be indexed once the site goes live. */
  indexable: boolean;
  /** Optional og:title override (used when og:title must omit the " | TomorrowOS" suffix). */
  ogTitle?: string;
  /** Optional og:description override (when it should differ from the meta description). */
  ogDescription?: string;
}

export const seoRoutes: Record<string, RouteSeo> = {
  '/': {
    title: 'Open-source digital signage foundation',
    description:
      'TomorrowOS is an open-source foundation for digital signage. Build your own CMS on shared device, playback and platform infrastructure.',
    canonicalPath: '/',
    indexable: true,
  },
  '/about': {
    title: 'About',
    description:
      'Learn why TomorrowOS is building an open foundation for digital signage, helping teams avoid rebuilding device, playback and platform infrastructure.',
    canonicalPath: '/about',
    indexable: true,
  },
  '/start': {
    title: 'Start building',
    description:
      'Choose how to build with TomorrowOS: start a new signage product or connect an existing application via the Server SDK or HTTP API.',
    canonicalPath: '/start',
    indexable: false, // interactive onboarding app stays noindex in production
  },
  '/start/guided': {
    title: 'Guided setup',
    description: 'Set up your TomorrowOS CMS with an AI-assisted, guided workflow.',
    canonicalPath: '/start/guided',
    indexable: false, // setup-state URL
  },
  '/start/guided/replit': {
    title: 'Guided setup with Replit',
    description: 'Build and host your TomorrowOS CMS with Replit Agent, step by step.',
    canonicalPath: '/start/guided/replit',
    indexable: false, // setup-state URL
  },
  '/start/guided/vercel': {
    title: 'Guided setup with v0 and Vercel',
    description: 'Create your TomorrowOS CMS with v0 and deploy it to Vercel, step by step.',
    canonicalPath: '/start/guided/vercel',
    indexable: false, // setup-state URL
  },
  '/start/terminal': {
    title: 'Terminal setup',
    description: 'Set up TomorrowOS from your local development environment using the CLI.',
    canonicalPath: '/start/terminal',
    indexable: false, // setup-state URL
  },
  '/connect/server-sdk': {
    title: 'Integrate the Server SDK',
    description:
      'Add TomorrowOS to an existing Node.js or TypeScript backend with the @tomorrowos/sdk package.',
    canonicalPath: '/connect/server-sdk',
    indexable: true,
  },
  '/connect/api': {
    title: 'Integrate the HTTP API',
    description: 'Connect any backend to TomorrowOS using a language-neutral HTTP API.',
    canonicalPath: '/connect/api',
    indexable: true,
  },
  '/guides/supabase': {
    title: 'Connect Supabase',
    description: 'Set up the Supabase database used by your TomorrowOS CMS.',
    canonicalPath: '/guides/supabase',
    indexable: true,
  },
  '/guides/cloudinary': {
    title: 'Connect Cloudinary',
    description: 'Set up Cloudinary media storage for images and videos in your TomorrowOS CMS.',
    canonicalPath: '/guides/cloudinary',
    indexable: true,
  },
  '/guides/vercel': {
    title: 'Deploy on Vercel',
    description: 'Configure and deploy your TomorrowOS CMS on Vercel.',
    canonicalPath: '/guides/vercel',
    indexable: true,
  },
  '/guides/neon': {
    title: 'Connect Neon',
    description: 'Set up a Neon Postgres database for your TomorrowOS CMS.',
    canonicalPath: '/guides/neon',
    indexable: true,
  },
  '/guides/vercel-blob': {
    title: 'Connect Vercel Blob',
    description: 'Set up Vercel Blob media storage for your TomorrowOS CMS.',
    canonicalPath: '/guides/vercel-blob',
    indexable: true,
  },
  '/guides/content': {
    title: 'Content guide',
    description: 'Add and schedule content on your TomorrowOS-powered screens.',
    canonicalPath: '/guides/content',
    indexable: true,
  },
  '/guides/platforms': {
    title: 'Platform guides',
    description: 'Install TomorrowOS players on supported screen platforms.',
    canonicalPath: '/guides/platforms',
    indexable: true,
  },
  '/guides/platforms/samsung-tizen': {
    title: 'Samsung Tizen guide',
    description: 'Install the TomorrowOS player on Samsung Tizen displays.',
    canonicalPath: '/guides/platforms/samsung-tizen',
    indexable: true,
  },
  '/guides/platforms/samsung-tizen/magicinfo': {
    title: 'Samsung Tizen MagicINFO troubleshooting',
    description: 'Troubleshoot MagicINFO conflicts when installing the TomorrowOS player on Samsung Tizen displays.',
    canonicalPath: '/guides/platforms/samsung-tizen/magicinfo',
    indexable: false, // troubleshooting subpath of the main Tizen guide
  },
  '/compatibility': {
    title: 'Platform Compatibility',
    description:
      'See supported platforms, tested devices, validated firmware, runtime status and known limitations for TomorrowOS digital signage players.',
    canonicalPath: '/compatibility',
    indexable: false, // compatibility claims pending human technical sign-off
  },
  '/compatibility/media': {
    title: 'Media Compatibility',
    description:
      'See tested media formats, codecs, resolutions, playback results and known platform limitations for TomorrowOS digital signage players.',
    canonicalPath: '/compatibility/media',
    indexable: true,
  },
  '/blog': {
    title: 'Digital Signage Engineering Blog',
    description:
      'Read practical guides about building digital signage software, open-source infrastructure, screen platforms, playback and reliable device operations.',
    canonicalPath: '/blog',
    indexable: true, // flipped 2026-08-03 — first pillar article shipped
  },
  // ---- Cornerstone articles (root-level pillar pages) ---------------------
  '/build-a-digital-signage-cms': {
    title: 'How to Build a Digital Signage CMS',
    description:
      'Learn how to build a reliable digital signage CMS, including architecture, device pairing, content delivery, offline playback, telemetry and multi-platform runtimes.',
    canonicalPath: '/build-a-digital-signage-cms',
    indexable: true,
    ogTitle: 'How to Build a Digital Signage CMS',
    ogDescription:
      'A practical architecture guide covering everything required to build reliable digital signage software.',
  },
  // ---- Learn section (Phase A) ------------------------------------------
  // Feature-gated behind VITE_ENABLE_LEARN (default off in production).
  // Entries stay here as preserved metadata drafts; they are all
  // indexable: false, so they can never reach the sitemap in either state.
  // Draft metadata for the future Developer Resource Centre. All routes stay
  // indexable: false (and therefore out of the sitemap) until each page's
  // real content passes its quality gate.
  '/learn': {
    title: 'Developer Resource Centre',
    description:
      'The TomorrowOS learning centre: developer resources for building digital signage software on an open-source foundation.',
    canonicalPath: '/learn',
    indexable: false, // Phase A shell — flip only when real content ships
  },
  '/learn/build-a-digital-signage-cms': {
    title: 'Build a Digital Signage CMS',
    description:
      'Part of the TomorrowOS learning centre: how a digital signage CMS fits together and where TomorrowOS provides the foundation.',
    canonicalPath: '/learn/build-a-digital-signage-cms',
    indexable: false, // Phase A shell
  },
  '/learn/digital-signage-sdk': {
    title: 'Digital Signage SDK',
    description:
      'Part of the TomorrowOS learning centre: the role of a server SDK when connecting an existing product to digital signage infrastructure.',
    canonicalPath: '/learn/digital-signage-sdk',
    indexable: false, // Phase A shell
  },
  '/learn/digital-signage-api': {
    title: 'Digital Signage API',
    description:
      'Part of the TomorrowOS learning centre: how an HTTP API connects any backend to digital signage devices and playback.',
    canonicalPath: '/learn/digital-signage-api',
    indexable: false, // Phase A shell
  },
  '/learn/open-source-digital-signage': {
    title: 'Open-Source Digital Signage',
    description:
      'Part of the TomorrowOS learning centre: what open-source means for digital signage architecture and ownership.',
    canonicalPath: '/learn/open-source-digital-signage',
    indexable: false, // Phase A shell
  },
  '/learn/self-hosted-digital-signage': {
    title: 'Self-Hosted Digital Signage',
    description:
      'Part of the TomorrowOS learning centre: considerations for running digital signage infrastructure on your own hosting.',
    canonicalPath: '/learn/self-hosted-digital-signage',
    indexable: false, // Phase A shell
  },
  '/learn/headless-digital-signage': {
    title: 'Headless Digital Signage',
    description:
      'Part of the TomorrowOS learning centre: separating signage infrastructure from the interface layer with a headless approach.',
    canonicalPath: '/learn/headless-digital-signage',
    indexable: false, // Phase A shell
  },
  '/learn/samsung-tizen-digital-signage-player': {
    title: 'Samsung Tizen Signage Player',
    description:
      'Part of the TomorrowOS learning centre: the Samsung Tizen platform for digital signage playback.',
    canonicalPath: '/learn/samsung-tizen-digital-signage-player',
    indexable: false, // Phase A shell
  },
  '/learn/brightsign-digital-signage-player': {
    title: 'BrightSign Digital Signage Player Support',
    description:
      'See supported BrightSign series, tested models, firmware requirements, media limitations and the TomorrowOS player installation and pairing flow.',
    canonicalPath: '/learn/brightsign-digital-signage-player',
    indexable: false, // Claims pending human technical review before indexation
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How TomorrowOS collects, uses and protects your information.',
    canonicalPath: '/privacy',
    indexable: false, // draft until legally reviewed — flip to true at launch
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'The terms that govern your use of TomorrowOS.',
    canonicalPath: '/terms',
    indexable: false, // draft until legally reviewed — flip to true at launch
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    description: 'How TomorrowOS uses cookies and similar technologies.',
    canonicalPath: '/cookie-policy',
    indexable: false, // draft until legally reviewed — flip to true at launch
  },
  '/cookie-settings': {
    title: 'Cookie Settings',
    description: 'Manage your cookie preferences for the TomorrowOS website.',
    canonicalPath: '/cookie-settings',
    indexable: false, // preference UI, not useful in search
  },
};

export function getRouteSeo(path: string): RouteSeo | undefined {
  return seoRoutes[path];
}

/**
 * Builds an absolute URL from a router path against the canonical production
 * hostname (siteConfig.siteUrl). Canonicals, og:url and structured-data URLs
 * must always point at the production domain — never a preview domain.
 */
export function absoluteUrl(path: string): string {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.siteUrl}${suffix === '/' ? '/' : suffix}`;
}
