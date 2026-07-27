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
    indexable: true,
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
  '/compatibility': {
    title: 'Compatibility',
    description: 'Check device and platform compatibility for TomorrowOS.',
    canonicalPath: '/compatibility',
    indexable: false, // placeholder content pending compatibility matrix
  },
  '/compatibility/media': {
    title: 'Media compatibility',
    description: 'Supported media formats for TomorrowOS playback.',
    canonicalPath: '/compatibility/media',
    indexable: true,
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How TomorrowOS collects, uses and protects your information.',
    canonicalPath: '/privacy',
    indexable: true,
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'The terms that govern your use of TomorrowOS.',
    canonicalPath: '/terms',
    indexable: true,
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    description: 'How TomorrowOS uses cookies and similar technologies.',
    canonicalPath: '/cookie-policy',
    indexable: true,
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
 * Builds an absolute URL from a router path, honouring the deployment base
 * path (BASE_URL). Use this for canonical URLs, og:url and structured data
 * so subpath deployments emit correct URLs.
 */
export function absoluteUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${window.location.origin}${base}${suffix === '/' && base ? '/' : suffix}`;
}
