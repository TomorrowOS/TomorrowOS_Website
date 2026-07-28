import { Link } from 'wouter';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';

/**
 * Dedicated 404 page. Always noindex and never included in the sitemap.
 *
 * Known limitation: this is a client-rendered SPA route, so the server still
 * responds with HTTP 200 for unknown paths. A genuine 404 status requires
 * server-side routing support at the deployment layer (documented in
 * LAUNCH_CHECKLIST.md). The page itself is noindex, follow.
 */
export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  });

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you are looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 w-full sm:w-auto"
          >
            Go to homepage
          </Link>
          <Link
            href="/start"
            className="inline-flex h-11 items-center justify-center rounded-md border-2 border-foreground px-6 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background w-full sm:w-auto"
          >
            Start building
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li><Link href="/about" className="hover:text-foreground underline underline-offset-4">About</Link></li>
          <li><a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-4">GitHub</a></li>
          <li><a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-4">Docs</a></li>
        </ul>
      </div>
    </div>
  );
}
