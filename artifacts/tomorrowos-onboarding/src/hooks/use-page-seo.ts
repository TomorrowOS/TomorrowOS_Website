import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { getRouteSeo } from '@/lib/seoConfig';

/**
 * Applies the centrally configured SEO metadata for a route path.
 * Falls back to a safe default (noindex) when a path is not configured.
 */
export function usePageSeo(path: string) {
  const entry = getRouteSeo(path);
  useSeo({
    title: entry?.title,
    description: entry?.description,
    ogTitle: entry?.ogTitle,
    ogDescription: entry?.ogDescription,
    canonicalPath: entry?.canonicalPath ?? path,
    // While the site is a prototype, everything stays noindex via useSeo's
    // default. Once live, non-indexable routes keep an explicit noindex.
    noindex: siteConfig.isPrototype || !(entry?.indexable ?? false),
  });
}
