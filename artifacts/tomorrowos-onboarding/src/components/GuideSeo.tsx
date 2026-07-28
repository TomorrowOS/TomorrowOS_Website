import { usePageSeo } from '@/hooks/use-page-seo';
import { getRouteSeo, absoluteUrl } from '@/lib/seoConfig';
import { JsonLd } from '@/components/JsonLd';

/**
 * Applies the centrally configured SEO metadata (title, description,
 * canonical URL, robots) for a guide route.
 * Call this hook at the top of each guide page component.
 */
export function useGuideSeo(path: string) {
  usePageSeo(path);
}

/**
 * Renders a BreadcrumbList JSON-LD schema for a guide page as a real React
 * element, making it visible in the rendered DOM without waiting for a
 * useEffect. The static prerender plugin also injects this schema at build
 * time so AI crawlers and social bots see it in the raw HTML response.
 *
 * Render this component inside the JSX returned by each guide page, ideally
 * as the first child so it is positioned early in the document body.
 */
export function GuideBreadcrumbs({ path }: { path: string }) {
  const entry = getRouteSeo(path);
  const crumbs: { name: string; item: string }[] = [
    { name: 'Home', item: absoluteUrl('/') },
    // Insert an intermediate "Platform guides" crumb for platform sub-pages.
    ...(path.startsWith('/guides/platforms/')
      ? [{ name: 'Platform guides', item: absoluteUrl('/guides/platforms') }]
      : []),
    { name: entry?.title ?? 'Guide', item: absoluteUrl(path) },
  ];
  return (
    <JsonLd
      id="breadcrumbs"
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      }}
    />
  );
}
