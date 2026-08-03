import { Link, useLocation } from 'wouter';
import { usePageSeo } from '@/hooks/use-page-seo';
import { getRouteSeo } from '@/lib/seoConfig';

/**
 * Phase A technical shell for the future TomorrowOS Learn section.
 *
 * One component serves all registered /learn routes: it looks up the route's
 * central SEO entry (src/lib/seoConfig.ts) for its heading and metadata, so
 * there is a single canonical source of truth and no per-route shell files to
 * keep in sync.
 *
 * These shells are deliberately restrained:
 * - not linked from any navigation
 * - always noindex (indexable: false in seoConfig)
 * - never included in the sitemap
 * - no promotional claims, no "Coming Soon"
 *
 * Each shell will later be replaced in place by the real Learn homepage or
 * article layout without changing the canonical route.
 */
export default function LearnRouteShell() {
  const [location] = useLocation();
  const entry = getRouteSeo(location);
  usePageSeo(location);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[720px] flex-col items-start justify-center px-6 py-24">
      <p className="mb-3 text-sm text-muted-foreground">TomorrowOS Learn</p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight">
        {entry?.title ?? 'Developer Resource Centre'}
      </h1>
      <p className="mb-8 text-muted-foreground">
        This resource is currently being prepared.
      </p>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <Link href="/" className="font-medium underline underline-offset-4 hover:no-underline">
          Return to the homepage
        </Link>
        <a
          href="https://docs.tomorrowos.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 hover:no-underline"
        >
          View the documentation<span className="sr-only"> (opens in a new window)</span>
        </a>
      </div>
    </div>
  );
}
