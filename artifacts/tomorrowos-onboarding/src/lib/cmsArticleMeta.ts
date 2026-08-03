/**
 * Shared metadata + FAQ source of truth for the cornerstone article
 * /build-a-digital-signage-cms.
 *
 * Imported by BOTH the article page (visible FAQ + runtime JSON-LD) and
 * vite.config.ts (prerendered Article/FAQ JSON-LD), so the structured data
 * can never drift from the visible content.
 *
 * IMPORTANT: keep this module dependency-free (no '@/' aliases, no React) —
 * vite.config.ts bundles it at config-evaluation time.
 */

export const CMS_ARTICLE = {
  path: '/build-a-digital-signage-cms',
  headline: 'How to Build a Digital Signage CMS',
  /** Meta description (seoConfig + prerender). */
  description:
    'Learn how to build a reliable digital signage CMS, including architecture, device pairing, content delivery, offline playback, telemetry and multi-platform runtimes.',
  /** Open Graph overrides (differ from the site-wide defaults). */
  ogTitle: 'How to Build a Digital Signage CMS',
  ogDescription:
    'A practical architecture guide covering everything required to build reliable digital signage software.',
  datePublished: '2026-08-03',
  dateModified: '2026-08-03',
  readingTimeMinutes: 21,
  author: 'TomorrowOS',
} as const;

/**
 * Visible FAQ content — rendered verbatim on the page AND serialised into
 * FAQPage JSON-LD. The two must match exactly (Google requirement).
 */
export const CMS_ARTICLE_FAQ: { question: string; answer: string }[] = [
  {
    question: 'How long does it take to build a digital signage CMS?',
    answer:
      'A basic prototype can be created quickly, particularly with modern frameworks and AI-assisted tools. A dependable commercial platform takes longer because the difficult work involves device communication, offline playback, recovery, telemetry, security and platform validation rather than the visible dashboard alone.',
  },
  {
    question: 'Can I build a signage CMS with React or Next.js?',
    answer:
      'Yes. Modern web frameworks are suitable for the customer-facing application. They do not by themselves solve the device runtime, offline storage, pairing, content synchronisation or platform-specific playback layers.',
  },
  {
    question: 'Do I need to build my own player?',
    answer:
      'A CMS needs some form of on-device software or runtime. Teams can build that runtime themselves, use a finished platform or use infrastructure such as TomorrowOS that provides reusable runtime and platform capabilities.',
  },
  {
    question: 'Can digital signage work without internet?',
    answer:
      'It should. Professional players normally download content and policy information locally so playback can continue when the server is unreachable. Offline capability must be designed into the runtime and scheduling model.',
  },
  {
    question: 'How do screens connect to the CMS?',
    answer:
      'A player normally registers with the server and completes a pairing process. After pairing, it receives a persistent identity and credentials used for synchronisation, commands and telemetry.',
  },
  {
    question: 'Is every media file supported on every screen?',
    answer:
      'No. Compatibility varies by container, codec, resolution, bitrate, hardware, firmware and playback context. Media should be tested on the exact deployment combination.',
  },
  {
    question: 'What is the difference between a CMS and a player?',
    answer:
      'The CMS is the management application and server-side control system. The player or runtime runs on the device, stores content, applies schedules, plays media, communicates with the server and recovers from failures.',
  },
  {
    question: 'What is a headless digital signage CMS?',
    answer:
      'A headless system separates the customer-facing application from the underlying signage services. Developers build their own interface and workflows while using APIs and runtimes for devices, content and playback.',
  },
  {
    question: 'Can I self-host a digital signage CMS?',
    answer:
      'Yes, depending on the infrastructure chosen. Self-hosting gives greater deployment and data control but also makes your team responsible for security, updates, monitoring, storage and reliability.',
  },
  {
    question: 'Can AI build a complete CMS?',
    answer:
      'AI tools can accelerate implementation, but they need accurate architecture, platform constraints and tests. Without those guardrails, an AI-generated application may look complete while missing critical offline, security or recovery behaviour.',
  },
];
