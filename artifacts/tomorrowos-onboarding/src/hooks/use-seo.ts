import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface SeoProps {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export function useSeo({ title, description, noindex = siteConfig.isPrototype }: SeoProps) {
  useEffect(() => {
    const baseTitle = 'TomorrowOS';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex,nofollow');
    } else if (metaRobots) {
      metaRobots.remove();
    }
  }, [title, description, noindex]);
}
