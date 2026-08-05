/**
 * Shared metadata + FAQ source of truth for the cornerstone article
 * /modern-digital-signage-architecture.
 *
 * Imported by BOTH the article page (visible FAQ + runtime JSON-LD) and
 * vite.config.ts (prerendered Article/FAQ JSON-LD), so the structured data
 * can never drift from the visible content.
 *
 * IMPORTANT: keep this module dependency-free (no '@/' aliases, no React) —
 * vite.config.ts bundles it at config-evaluation time.
 */

export const ARCH_ARTICLE = {
  path: '/modern-digital-signage-architecture',
  headline: 'Modern Digital Signage Architecture Explained',
  /** Meta description (seoConfig + prerender). */
  description:
    'Understand how modern digital signage systems connect the CMS, APIs, content delivery, player runtime, offline storage, telemetry and screen platforms.',
  /** Open Graph overrides (differ from the site-wide defaults). */
  ogTitle: 'Modern Digital Signage Architecture Explained',
  ogDescription:
    'A practical guide to the product, server, content, runtime and platform layers behind reliable digital signage software.',
  datePublished: '2026-08-05',
  /** Last technical review date — shown in the metadata panel and emitted as schema dateModified. */
  dateModified: '2026-08-05',
  readingTimeMinutes: 16,
  /** Editorial decision: this article is authored by the organisation, not a person. */
  authorName: 'TomorrowOS',
} as const;

/**
 * Visible FAQ content — rendered verbatim on the page AND serialised into
 * FAQPage JSON-LD. The two must match exactly (Google requirement).
 */
export const ARCH_ARTICLE_FAQ: { question: string; answer: string }[] = [
  {
    question: 'What is digital signage architecture?',
    answer:
      'Digital signage architecture is the structure connecting the customer application, server services, content delivery, on-device runtime and platform-specific screen environment.',
  },
  {
    question: 'What is the difference between a CMS and a runtime?',
    answer:
      'The CMS is the management application and server-side control system. The runtime operates on the device, stores content and state, applies policies, plays media and recovers locally.',
  },
  {
    question: 'What is a control plane?',
    answer:
      'The control plane coordinates identity, devices, assignments, commands and telemetry. It defines desired state and receives reported state from players.',
  },
  {
    question: 'What should run on the player?',
    answer:
      'The player should own durable identity, local state, asset storage, schedule or policy application, playback, command execution, telemetry buffering and immediate recovery.',
  },
  {
    question: 'Can digital signage work offline?',
    answer:
      'Yes, when the runtime stores the required assets, policy and schedule locally. Offline support must be designed into delivery, activation and state management.',
  },
  {
    question: 'What is headless digital signage?',
    answer:
      'A headless signage platform exposes device and playback infrastructure through APIs or an SDK while the developer builds the customer-facing product and workflows.',
  },
  {
    question: 'Should a signage platform use microservices?',
    answer:
      'Not necessarily. A modular monolith is often the best starting point. Separate services when scaling, reliability or team ownership provides a clear reason.',
  },
  {
    question: 'How do screens receive content?',
    answer:
      'The server provides versioned desired state, often through a manifest. The player compares it with local state, downloads missing assets, verifies them and activates the new policy safely.',
  },
  {
    question: 'How does a player recover after network failure?',
    answer:
      'It continues using locally stored policy and assets, buffers events, retries the connection and reconciles state after connectivity returns.',
  },
  {
    question: 'Where does TomorrowOS fit?',
    answer:
      'TomorrowOS sits beneath a custom signage product, providing reusable server-to-screen infrastructure, runtime behaviour and platform adapters while the developer owns the product experience.',
  },
];
