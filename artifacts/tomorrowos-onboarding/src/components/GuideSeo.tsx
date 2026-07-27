import { useEffect } from 'react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { getRouteSeo, absoluteUrl } from '@/lib/seoConfig';

/**
 * SEO for public guide pages: route metadata plus a BreadcrumbList
 * (Home → [Platform guides →] current guide) injected as JSON-LD.
 */
export function useGuideSeo(path: string) {
  usePageSeo(path);
  useEffect(() => {
    const entry = getRouteSeo(path);
    const crumbs = [
      { name: 'Home', item: absoluteUrl('/') },
      ...(path.startsWith('/guides/platforms/')
        ? [{ name: 'Platform guides', item: absoluteUrl('/guides/platforms') }]
        : []),
      { name: entry?.title ?? 'Guide', item: absoluteUrl(path) },
    ];
    const scriptId = 'jsonld-breadcrumbs';
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    });
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [path]);
}
