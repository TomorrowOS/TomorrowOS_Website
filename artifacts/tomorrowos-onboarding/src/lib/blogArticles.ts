/**
 * Blog articles — single source of truth for TomorrowOS editorial content.
 *
 * URL model (do not change without updating the routing architecture):
 * - Pillar articles live at ROOT-LEVEL URLs (e.g. /build-a-digital-signage-cms,
 *   /digital-signage-sdk, /digital-signage-api, /open-source-digital-signage,
 *   /self-hosted-digital-signage, /headless-digital-signage,
 *   /samsung-tizen-digital-signage-player, /brightsign-digital-signage-player).
 *   They are represented here with `href` set to the root-level path while
 *   `slug` stays the bare identifier — the Blog index links to `href`, so a
 *   root-level pillar simply carries an href that is not under /blog.
 * - Supporting editorial content nests under /blog/<slug> with
 *   `href: '/blog/<slug>'`.
 *
 * Rules:
 * - Add an article here ONLY when the page genuinely exists and is complete.
 *   No shells, no placeholders, no "coming soon" records.
 * - Every article added here also needs the standard route recipe
 *   (App.tsx, seoConfig.ts, vite.config.ts prerender table, smoke routes).
 * - `featured` may be set on at most one published article at a time.
 * - The Blog index page derives everything (cards, featured panel,
 *   categories) from this list and renders a purposeful empty state while
 *   the list is empty.
 */

export type BlogCategory =
  | 'Building Digital Signage'
  | 'Open Source'
  | 'Architecture'
  | 'Platforms'
  | 'Engineering'
  | 'AI Development'
  | 'DOOH and Retail Media';

/** Editorial layout system (see docs/editorial-template.md). */
export type EditorialLayoutMode = 'document' | 'document-with-rail';
export type EditorialTocMode = 'none' | 'compact' | 'grouped' | 'rail';

export interface BlogArticle {
  /** Bare identifier, e.g. 'build-a-digital-signage-cms'. */
  slug: string;
  /** Full path the card links to — root-level for pillars, /blog/<slug> for posts. */
  href: string;
  title: string;
  description: string;
  category: BlogCategory;
  /** ISO date, e.g. '2026-08-03'. */
  publishedAt: string;
  updatedAt?: string;
  /** ISO date of the last technical review — only when a real review happened. */
  reviewedAt?: string;
  readingTimeMinutes: number;
  author: string;
  reviewer?: string;
  /** e.g. 'Cornerstone Guide'. Shown in the document metadata panel when set. */
  documentType?: string;
  /** Only set when status maintenance is genuinely established. */
  documentStatus?: string;
  featured?: boolean;
  indexable: boolean;
  layoutMode?: EditorialLayoutMode;
  tocMode?: EditorialTocMode;
}

/** Published articles only. */
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'build-a-digital-signage-cms',
    href: '/build-a-digital-signage-cms',
    title: 'How to Build a Digital Signage CMS',
    description:
      'Learn how to build a reliable digital signage CMS, including architecture, device pairing, content delivery, offline playback, telemetry and multi-platform runtimes.',
    category: 'Building Digital Signage',
    publishedAt: '2026-08-03',
    reviewedAt: '2026-08-05',
    readingTimeMinutes: 21,
    author: 'Dylan Holtzhausen',
    documentType: 'Cornerstone Guide',
    featured: true,
    indexable: true,
    layoutMode: 'document-with-rail',
    tocMode: 'rail',
  },
  {
    slug: 'how-to-start-a-dooh-network',
    href: '/how-to-start-a-dooh-network',
    title: 'How to Start a DOOH Network',
    description:
      'Learn how to start a digital out-of-home network, including locations, screens, CMS software, ad serving, proof of play, measurement, sales and operations.',
    category: 'DOOH and Retail Media',
    publishedAt: '2026-08-05',
    reviewedAt: '2026-08-05',
    readingTimeMinutes: 19,
    author: 'Dylan Holtzhausen',
    documentType: 'Cornerstone Guide',
    indexable: true,
    layoutMode: 'document-with-rail',
    tocMode: 'rail',
  },
];

export const FEATURED_ARTICLE: BlogArticle | undefined = BLOG_ARTICLES.find(
  (a) => a.featured,
);

/** Categories represented by at least one published article. */
export function getActiveCategories(): BlogCategory[] {
  return [...new Set(BLOG_ARTICLES.map((a) => a.category))];
}
