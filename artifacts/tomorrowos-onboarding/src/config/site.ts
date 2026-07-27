/**
 * Environment is controlled via VITE_SITE_ENV at build time:
 *   "prototype" (default) | "preview" | "production"
 * Only "production" allows indexing. Do not hard-code robots directives
 * elsewhere — derive them from this config.
 */
const environment = (import.meta.env.VITE_SITE_ENV ?? 'prototype') as
  | 'prototype'
  | 'preview'
  | 'production';

export const siteConfig = {
  name: 'TomorrowOS',
  siteUrl: 'https://tomorrowos.org',
  environment,
  isPrototype: environment !== 'production', // Used to guard indexing (noindex)
  isProduction: environment === 'production',
  allowIndexing: environment === 'production',
  links: {
    github: 'https://github.com/TomorrowOS/TomorrowOS',
    docs: 'https://docs.tomorrowos.org',
    knowledgeBase: 'https://docs.tomorrowos.org',
    community: 'https://github.com/TomorrowOS/TomorrowOS/discussions',
    governance: 'https://github.com/TomorrowOS/TomorrowOS/blob/main/GOVERNANCE.md',
    license: 'https://github.com/TomorrowOS/TomorrowOS?tab=Apache-2.0-1-ov-file',
  },
  legal: {
    companyName: 'TomorrowOS Pty Ltd',
    contactEmail: 'privacy@tomorrowos.org',
    generalEmail: 'hello@tomorrowos.org',
    securityEmail: 'nightwatch@tomorrowos.org',
    address: '{{PLACEHOLDER_COMPANY_ADDRESS}}',
    jurisdiction: 'Western Australia, Australia',
  }
};
