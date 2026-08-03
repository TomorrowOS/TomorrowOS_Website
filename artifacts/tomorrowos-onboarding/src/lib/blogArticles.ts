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
  | 'AI Development';

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
  readingTimeMinutes: number;
  author: string;
  featured?: boolean;
  indexable: boolean;
}

/** Published articles only. Empty until the first pillar article ships. */
export const BLOG_ARTICLES: BlogArticle[] = [];

export const FEATURED_ARTICLE: BlogArticle | undefined = BLOG_ARTICLES.find(
  (a) => a.featured,
);

/** Categories represented by at least one published article. */
export function getActiveCategories(): BlogCategory[] {
  return [...new Set(BLOG_ARTICLES.map((a) => a.category))];
}
