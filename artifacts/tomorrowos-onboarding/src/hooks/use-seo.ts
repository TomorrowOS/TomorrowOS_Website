import { useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seoConfig';

interface SeoProps {
  title?: string;
  /** When true, `title` is used verbatim instead of being suffixed with "| TomorrowOS". */
  fullTitle?: boolean;
  description?: string;
  /** Path (e.g. "/about") used to build the canonical URL and og:url. */
  canonicalPath?: string;
  /** Absolute or root-relative URL for the social share image. */
  socialImage?: string;
  noindex?: boolean;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function metaByName(name: string) {
  const el = document.createElement('meta');
  el.setAttribute('name', name);
  return el;
}

function metaByProperty(property: string) {
  const el = document.createElement('meta');
  el.setAttribute('property', property);
  return el;
}

export function useSeo({ title, fullTitle = false, description, canonicalPath, socialImage, noindex = siteConfig.isPrototype }: SeoProps) {
  useEffect(() => {
    const baseTitle = 'TomorrowOS';
    const resolvedTitle = title ? (fullTitle ? title : `${title} | ${baseTitle}`) : baseTitle;
    document.title = resolvedTitle;
    upsertMeta('meta[property="og:title"]', () => metaByProperty('og:title'), resolvedTitle);

    if (description) {
      upsertMeta('meta[name="description"]', () => metaByName('description'), description);
      upsertMeta('meta[property="og:description"]', () => metaByProperty('og:description'), description);
    }

    if (canonicalPath) {
      const url = absoluteUrl(canonicalPath);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
      upsertMeta('meta[property="og:url"]', () => metaByProperty('og:url'), url);
    }

    const img = socialImage
      ? socialImage.startsWith('http')
        ? socialImage
        : absoluteUrl(socialImage)
      : absoluteUrl('/og-image.png');
    upsertMeta('meta[property="og:image"]', () => metaByProperty('og:image'), img);
    upsertMeta('meta[name="twitter:card"]', () => metaByName('twitter:card'), 'summary_large_image');
    upsertMeta('meta[property="og:site_name"]', () => metaByProperty('og:site_name'), 'TomorrowOS');
    upsertMeta('meta[property="og:locale"]', () => metaByProperty('og:locale'), 'en_AU');
    // upsertMeta('meta[name="twitter:site"]', () => metaByName('twitter:site'), '@TomorrowOS');

    // Robots policy is always explicit and derived from environment config:
    // - prototype/preview: everything noindex, follow
    // - production: index, follow only for routes not flagged noindex
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const allowed = siteConfig.allowIndexing && !noindex;
    metaRobots.setAttribute('content', allowed ? 'index, follow' : 'noindex, follow');
  }, [title, fullTitle, description, canonicalPath, socialImage, noindex]);
}
