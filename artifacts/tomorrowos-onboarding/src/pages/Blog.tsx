import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { siteConfig } from '@/config/site';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  BLOG_ARTICLES,
  FEATURED_ARTICLE,
  getActiveCategories,
  type BlogArticle,
} from '@/lib/blogArticles';

/**
 * /journal — the TomorrowOS Journal index (moved from /blog on 2026-08-05
 * with 301 redirects on both hosts plus a client-side redirect in App.tsx).
 *
 * Presented as an editorial archive of technical writing rather than a
 * marketing blog: journal masthead, short editorial statement, one featured
 * record, then a text-led archive of records separated by thin rules.
 *
 * All article content derives from src/lib/blogArticles.ts. If no article is
 * published the page renders a purposeful empty state — no fake cards, no
 * "coming soon". Indexable since 2026-08-03 (see seoConfig.ts).
 */

/** Formats an ISO date as e.g. "3 August 2026". */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

function EmptyState() {
  const links: { label: string; href: string; external?: boolean }[] = [
    { label: 'Start Building', href: '/start' },
    { label: 'Documentation', href: siteConfig.links.docs, external: true },
    { label: 'GitHub', href: siteConfig.links.github, external: true },
    { label: 'Platform guides', href: '/guides/platforms' },
    { label: 'Samsung Tizen guide', href: '/guides/platforms/samsung-tizen' },
  ];
  return (
    <div className="flex flex-col gap-4 border-y border-border py-6 md:py-8">
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        Practical resources for digital signage builders
      </h3>
      <p className="max-w-[760px] text-muted-foreground">
        TomorrowOS publishes engineering guides and open-source resources here as they are
        completed and technically reviewed. In the meantime, the resources below cover setup,
        platform installation and compatibility in depth.
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {l.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                <span className="sr-only"> (opens in a new window)</span>
              </a>
            ) : (
              <Link
                href={l.href}
                className="font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Archive record — the standard journal index entry. Text-led: uppercase
 * category line, title, one-sentence description, date and reading time.
 * Thin rules between records; a subtle blue-grey wash on hover.
 */
function ArchiveRecord({ article, featured }: { article: BlogArticle; featured?: boolean }) {
  return (
    <article className="group relative -mx-3 flex flex-col gap-1.5 border-b border-border px-3 py-5 transition-colors first:border-t hover:bg-[#eef2f6]/60">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {article.category}
        {featured ? ' · Featured' : ''}
        {article.documentType ? ` · ${article.documentType}` : ''}
      </p>
      <h3
        className={`font-bold tracking-tight text-foreground ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}
      >
        <Link
          href={article.href}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
        >
          {article.title}
        </Link>
      </h3>
      <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
        {article.description}
      </p>
      <p className="pt-0.5 text-xs text-muted-foreground">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        {' · '}
        {article.readingTimeMinutes} min read
      </p>
    </article>
  );
}

export default function Blog() {
  usePageSeo('/journal');
  const categories = getActiveCategories();
  const archive = BLOG_ARTICLES.filter((a) => !a.featured);

  return (
    <div className="w-full">
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('/journal') },
          ],
        }}
      />

      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Journal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mx-auto flex max-w-[820px] flex-col gap-12 px-4 py-10 md:px-8 md:py-14">
        {/* Journal masthead */}
        <header className="flex flex-col gap-4 border-b-2 border-foreground pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            TomorrowOS Journal
          </h1>
          <p className="max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
            Technical writing on digital signage engineering — CMS architecture, screen
            platforms, DOOH networks and the operational reality of running software on remote
            displays. Every entry is written and technically reviewed by the people building
            TomorrowOS.
          </p>
        </header>

        {/* Featured record — rendered only when one exists. */}
        {FEATURED_ARTICLE && (
          <section aria-labelledby="featured" className="flex flex-col gap-3">
            <h2
              id="featured"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground"
            >
              Featured
            </h2>
            <ArchiveRecord article={FEATURED_ARTICLE} featured />
          </section>
        )}

        {/* Archive */}
        <section aria-labelledby="articles-heading" className="flex flex-col gap-3">
          <h2
            id="articles"
            className="scroll-mt-24 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground"
          >
            <span id="articles-heading">Archive</span>
          </h2>

          {/* Categories — plain text, only those represented by published articles. */}
          {categories.length > 0 && (
            <p className="text-xs text-muted-foreground" aria-label="Article categories">
              {categories.join(' · ')}
            </p>
          )}

          {BLOG_ARTICLES.length === 0 ? (
            <EmptyState />
          ) : archive.length === 0 ? (
            <p className="border-t border-border pt-4 text-sm text-muted-foreground">
              All published entries are shown above.
            </p>
          ) : (
            <div className="flex flex-col">
              {archive.map((a) => (
                <ArchiveRecord key={a.slug} article={a} />
              ))}
            </div>
          )}
        </section>

        {/* Quiet closing links */}
        <section aria-labelledby="closing" className="flex flex-col gap-3 border-t border-border pt-8">
          <h2
            id="closing"
            className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground"
          >
            Build with TomorrowOS
          </h2>
          <p className="max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            Use open-source server-to-screen infrastructure while retaining ownership of your
            product, workflow and commercial model.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/start"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Start building
            </Link>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Documentation
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
