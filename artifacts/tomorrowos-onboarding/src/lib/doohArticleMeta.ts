/**
 * Shared metadata + FAQ source of truth for the cornerstone article
 * /how-to-start-a-dooh-network.
 *
 * Imported by BOTH the article page (visible FAQ + runtime JSON-LD) and
 * vite.config.ts (prerendered Article/FAQ JSON-LD), so the structured data
 * can never drift from the visible content.
 *
 * IMPORTANT: keep this module dependency-free (no '@/' aliases, no React) —
 * vite.config.ts bundles it at config-evaluation time.
 */

export const DOOH_ARTICLE = {
  path: '/how-to-start-a-dooh-network',
  headline: 'How to Start a DOOH Network',
  /** Meta description (seoConfig + prerender). */
  description:
    'Learn how to start a digital out-of-home network, including locations, screens, CMS software, ad serving, proof of play, measurement, sales and operations.',
  /** Open Graph overrides (differ from the site-wide defaults). */
  ogTitle: 'How to Start a DOOH Network',
  ogDescription:
    'A practical guide to the technology, commercial model and operations required to build a digital out-of-home advertising network.',
  datePublished: '2026-08-05',
  /** Last technical review date — shown in the hero and emitted as schema dateModified. */
  dateModified: '2026-08-05',
  readingTimeMinutes: 19,
} as const;

/**
 * Visible FAQ content — rendered verbatim on the page AND serialised into
 * FAQPage JSON-LD. The two must match exactly (Google requirement).
 */
export const DOOH_ARTICLE_FAQ: { question: string; answer: string }[] = [
  {
    question: 'What is a DOOH CMS?',
    answer:
      'A DOOH CMS manages screens, media, playlists, schedules and device operations for an advertising network. A complete DOOH platform usually adds campaign management, inventory, proof of play, measurement and billing around the CMS.',
  },
  {
    question: 'What is the difference between DOOH and digital signage?',
    answer:
      'Digital signage can be used for any screen-based communication. DOOH is operated as advertising media, with campaigns, buyers, inventory, delivery requirements and reporting.',
  },
  {
    question: 'How much does it cost to start a DOOH network?',
    answer:
      'The cost depends on the number and type of screens, installation, connectivity, software, venue agreements, maintenance, measurement and sales model. A small standardised pilot is usually safer than committing to a large network before demand is proven.',
  },
  {
    question: 'Can I start with consumer televisions?',
    answer:
      'Consumer displays can work in some controlled indoor pilots, but commercial displays generally provide more predictable duty cycles, remote management, orientation support and warranty conditions. Assess total operating cost rather than purchase price alone.',
  },
  {
    question: 'Do I need programmatic advertising?',
    answer:
      'No. Many networks begin with direct sales. Programmatic can expand demand and automate transactions, but it adds fees, technical integrations, creative controls and reporting complexity.',
  },
  {
    question: 'What is proof of play?',
    answer:
      'Proof of play is a record that a specific creative played on a specific screen at a recorded time. It should be distinguished from scheduling, downloading and audience measurement.',
  },
  {
    question: 'How do DOOH networks make money?',
    answer:
      'Networks may sell fixed placements, campaign packages, sponsorships, share of voice, impression-based inventory or programmatic inventory. Some also charge venues or brands for content and software services.',
  },
  {
    question: 'Can a normal signage CMS manage advertising?',
    answer:
      'A standard CMS can manage media, screens and schedules. Advertising networks usually need additional campaign, inventory, pacing, proof-of-play, measurement and billing capabilities.',
  },
  {
    question: 'How many screens should I start with?',
    answer:
      'Start with enough screens to test the venue model and attract a real advertiser, but few enough that support and failure recovery remain manageable. The right number depends on location quality and audience concentration, not a universal threshold.',
  },
  {
    question: 'Can TomorrowOS power a DOOH platform?',
    answer:
      'TomorrowOS can provide reusable digital-signage infrastructure beneath a custom DOOH product. The operator still needs to build or integrate commercial systems such as advertiser management, inventory, measurement, billing and programmatic demand.',
  },
  {
    question: 'How are DOOH impressions measured?',
    answer:
      'Methods can include traffic counts, footfall, dwell time, visibility modelling, mobile movement data, sensors and market measurement currencies. The chosen methodology should be transparent about data sources and assumptions.',
  },
  {
    question: 'What should I validate before scaling?',
    answer:
      'Validate venue rights, audience value, campaign demand, playback reliability, offline recovery, proof of play, reporting, support effort and unit economics before adding large numbers of screens.',
  },
];

/** Primary source notes — rendered in the visible "Primary sources" section. */
export const DOOH_ARTICLE_SOURCES: { label: string; href: string; note: string }[] = [
  {
    label: 'OAAA: Out of Home Advertising Revenue Reaches Record $9.46 Billion',
    href: 'https://oaaa.org/news/out-of-home-advertising-revenue-reaches-record-9-46-billion/',
    note: 'Supports the 2025 U.S. OOH revenue context.',
  },
  {
    label: 'OAAA: Q1 2026 revenue and DOOH growth',
    href: 'https://oaaa.org/news/ooh-hits-new-first-quarter-high-as-revenue-reaches-2-12-billion-driven-by-digital-growth-and-ai-brands/',
    note: 'Current context on DOOH growth and share of OOH revenue.',
  },
  {
    label: 'IAB: Digital Out-of-Home Measurement Guide',
    href: 'https://www.iab.com/guidelines/dooh-measurement-guide/',
    note: 'Supports the discussion of fragmented measurement practices and the need for consistent frameworks.',
  },
  {
    label: 'IAB Tech Lab: DOOH integrated into OpenRTB',
    href: 'https://iabtechlab.com/dooh-integrated-into-openrtb/',
    note: 'Supports the statement that DOOH inventory is represented in OpenRTB for programmatic trading.',
  },
  {
    label: 'World Out of Home Organization: Global OOH Audience Measurement Guidelines 2.0',
    href: 'https://worldooh.org/audience-measurement-guidelines-2026',
    note: 'Supports transparent, rigorous audience-measurement principles.',
  },
  {
    label: 'IAB: DOOH and In-Store Retail Media Playbook',
    href: 'https://www.iab.com/wp-content/uploads/2024/05/IAB_DOOH_InStoreRetailMediaPlaybook_2024.pdf',
    note: 'Supports the relationship between in-store retail media, proof of play and sales measurement.',
  },
];
