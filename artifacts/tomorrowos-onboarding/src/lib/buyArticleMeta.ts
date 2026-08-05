/**
 * Shared metadata + FAQ source of truth for the cornerstone article
 * /build-vs-buy-digital-signage-cms.
 *
 * Imported by BOTH the article page (visible FAQ + runtime JSON-LD) and
 * vite.config.ts (prerendered Article/FAQ JSON-LD), so the structured data
 * can never drift from the visible content.
 *
 * IMPORTANT: keep this module dependency-free (no '@/' aliases, no React) —
 * vite.config.ts bundles it at config-evaluation time.
 */

export const BUY_ARTICLE = {
  path: '/build-vs-buy-digital-signage-cms',
  headline: 'Build vs Buy a Digital Signage CMS',
  /** Meta description (seoConfig + prerender). */
  description:
    'Should you build your own digital signage CMS or buy an existing platform? Learn the real costs, engineering trade-offs and when each approach makes sense.',
  /** Open Graph overrides (differ from the site-wide defaults). */
  ogTitle: 'Build vs Buy a Digital Signage CMS',
  ogDescription:
    'A practical decision guide to buying an existing platform, building custom software or using shared digital signage infrastructure.',
  datePublished: '2026-08-05',
  /** Last technical review date — shown in the metadata panel and emitted as schema dateModified. */
  dateModified: '2026-08-05',
  readingTimeMinutes: 16,
} as const;

/**
 * Visible FAQ content — rendered verbatim on the page AND serialised into
 * FAQPage JSON-LD. The two must match exactly (Google requirement).
 */
export const BUY_ARTICLE_FAQ: { question: string; answer: string }[] = [
  {
    question: 'Is it cheaper to build a digital signage CMS?',
    answer:
      'It can appear cheaper during prototyping, particularly with AI-assisted tools. A complete comparison must include player development, infrastructure, testing, support, updates, security and ongoing maintenance.',
  },
  {
    question: 'How long does it take to build a CMS?',
    answer:
      'A basic dashboard can be created quickly. A dependable commercial platform takes longer because device runtime, offline operation, recovery, monitoring and validation must also be implemented.',
  },
  {
    question: 'When should a business buy an existing CMS?',
    answer:
      'Buying usually makes sense when signage supports a standard communication need, time to market matters and the business does not need to own the software experience.',
  },
  {
    question: 'When should a business build?',
    answer:
      'Building is more defensible when signage is a core product capability, a differentiator, a long-term platform strategy or an important source of intellectual property.',
  },
  {
    question: 'What is a hybrid signage platform?',
    answer:
      'A hybrid approach combines custom product layers with commercial APIs, existing CMS capabilities or shared infrastructure rather than building every layer.',
  },
  {
    question: 'Can AI build a digital signage CMS?',
    answer:
      'AI can accelerate implementation, but the team still needs to define architecture, security, offline behaviour, platform constraints, testing and operations.',
  },
  {
    question: 'Do I need to build my own player?',
    answer:
      'A complete custom platform needs an on-device runtime, but it can be built internally, provided by a commercial CMS or supplied through shared infrastructure.',
  },
  {
    question: 'What is the hardest part of building?',
    answer:
      'The difficult work is usually reliable device operation: content delivery, local state, offline playback, recovery, monitoring, updates and support across real hardware.',
  },
  {
    question: 'Does a large screen count mean I should build?',
    answer:
      'Not automatically. Scale can strengthen the ownership case, but workflow uniqueness, capability and long-term strategy matter more than screen count alone.',
  },
  {
    question: 'Can I start on a commercial CMS and migrate later?',
    answer:
      'Yes. A phased approach can validate customers and workflows before the organisation assumes full infrastructure ownership.',
  },
  {
    question: 'What should I compare between vendors?',
    answer:
      'Compare supported hardware, offline behaviour, monitoring, release process, API quality, security, support, total cost and contractual flexibility, not only feature lists.',
  },
  {
    question: 'What should I include in a build budget?',
    answer:
      'Include product engineering, backend infrastructure, runtime development, platform testing, DevOps, security, documentation, support and long-term maintenance.',
  },
  {
    question: 'What does TomorrowOS replace?',
    answer:
      'TomorrowOS is intended to provide reusable server-to-screen infrastructure. It does not replace the custom product, customer workflow or every commercial feature.',
  },
  {
    question: 'Is open source the same as free to operate?',
    answer:
      'No. Open-source software can reduce licensing restrictions and provide control, but hosting, engineering, testing, security and support still require resources.',
  },
  {
    question: 'What is the safest first step?',
    answer:
      'Define the unique business requirement and run a limited pilot. Avoid committing to a full build until the value of ownership is clear.',
  },
];
