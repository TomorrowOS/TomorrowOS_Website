import { siteConfig } from '@/config/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  variant?: 'outline' | 'primary';
}

/** Single source of truth for the global website navigation. */
export const siteNavigation: { primary: NavItem[]; actions: NavItem[] } = {
  primary: [
    { label: 'About', href: '/about' },
    { label: 'Get Started', href: '/quickstart' },
  ],
  actions: [
    { label: 'GitHub', href: siteConfig.links.github, external: true, variant: 'outline' },
    { label: 'Start building', href: '/start', external: false, variant: 'primary' },
  ],
};

export function isConfiguredUrl(url: string | undefined): url is string {
  return !!url && !url.includes('{{');
}
