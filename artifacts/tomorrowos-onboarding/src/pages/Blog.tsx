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
 * /journal — the TomorrowOS Journal homepage (moved from /blog on 2026-08-05
 * with 301 redirects on both hosts plus a client-side redirect in App.tsx).
 *
 * Presented as a human-led technical publication rather than a marketing
 * blog: journal masthead, one visually prominent lead article (no "Featured"
 * label — prominence is communicated by layout only), then a text-led
 * "Latest Articles" list separated by thin rules.
 *
 * Public terminology policy (editorial decision 2026-08-05): internal
 * classifications — Featured, Archive, Cornerstone Guide, document type,
 * issue numbers, status — must never appear in the public interface. They
 * may remain in the data model (blogArticles.ts) for internal use.
 *
 * All article content derives from src/lib/blogArticles.ts. Article count
 * and the "Updated <month year>" line are derived from that data — never
 * hardcoded. If no article is published the page renders a purposeful empty
 * state — no fake cards, no "coming soon".
 */

/** Formats an ISO date as e.g. "3 August 2026". */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Formats an ISO date as e.g. "August 2026" (masthead metadata line). */
function formatMonthYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/**
 * Public author display. The data model may hold a combined internal string
 * ("Dylan Holtzhausen / TomorrowOS"); publicly we show the human author only,
 * per the Journal editorial guidelines. The publisher remains TomorrowOS in
 * structured data.
 */
function displayAuthor(author: string): string {
  return author.split('/')[0]!.trim();
}

/**
 * Newest published/reviewed date across all published articles, or undefined
 * when no reliable date exists (in which case the "Updated" line is omitted).
 */
function newestArticleDate(): string | undefined {
  const dates = BLOG_ARTICLES.flatMap((a) =>
    [a.publishedAt, a.reviewedAt].filter((d): d is string => Boolean(d)),
  );
  if (dates.length === 0) return undefined;
  return dates.sort().at(-1);
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

/** Author · date · reading time metadata line shared by both record styles. */
function RecordMeta({ article }: { article: BlogArticle }) {
  return (
    <p className="pt-0.5 text-xs text-muted-foreground">
      <span className="font-medium text-foreground/80">By {displayAuthor(article.author)}</span>
      <br className="sm:hidden" />
      <span className="hidden sm:inline">{' · '}</span>
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      {' · '}
      {article.readingTimeMinutes} min read
    </p>
  );
}

/**
 * Lead article — the visually prominent top record. Communicates importance
 * through scale and a pale neutral background only: no "Featured" label, no
 * document-type badge, no card chrome.
 */
function LeadRecord({ article }: { article: BlogArticle }) {
  return (
    <article className="group relative flex flex-col gap-3 border-y border-border bg-[#f7f9fb] px-5 py-7 md:px-7 md:py-9 print:bg-white">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {article.category}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-[2rem] md:leading-[1.15]">
        <Link
          href={article.href}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
        >
          {article.title}
        </Link>
      </h2>
      <p className="max-w-[75ch] leading-relaxed text-muted-foreground">{article.description}</p>
      <RecordMeta article={article} />
      <p className="pt-1 text-sm font-medium text-foreground" aria-hidden="true">
        Read article <span className="transition-transform group-hover:translate-x-0.5 inline-block">→</span>
      </p>
    </article>
  );
}

/**
 * Standard list record — text-led row: uppercase category, title,
 * one-sentence description, author/date/reading time. Thin rules between
 * records; a subtle blue-grey wash on hover. Tighter than the lead record.
 */
function ListRecord({ article }: { article: BlogArticle }) {
  return (
    <article className="group relative -mx-3 flex flex-col gap-1.5 border-b border-border px-3 py-5 transition-colors first:border-t hover:bg-[#eef2f6]/60">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {article.category}
      </p>
      <h3 className="text-lg font-bold tracking-tight text-foreground">
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
      <RecordMeta article={article} />
      <span
        aria-hidden="true"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-0.5 md:block"
      >
        →
      </span>
    </article>
  );
}

export default function Blog() {
  usePageSeo('/journal');
  const categories = getActiveCategories();
  const latest = BLOG_ARTICLES.filter((a) => a !== FEATURED_ARTICLE);
  const articleCount = BLOG_ARTICLES.length;
  const newestDate = newestArticleDate();

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
            Practical engineering guides, architecture notes and implementation insights for
            teams building modern digital signage software.
          </p>
          {articleCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {articleCount} {articleCount === 1 ? 'article' : 'articles'}
              {newestDate ? ` · Updated ${formatMonthYear(newestDate)}` : ''}
            </p>
          )}
        </header>

        {/* Lead article — prominence through layout only; no "Featured" label. */}
        {FEATURED_ARTICLE && (
          <section aria-label="Lead article">
            <LeadRecord article={FEATURED_ARTICLE} />
          </section>
        )}

        {/* Latest Articles */}
        <section aria-labelledby="articles-heading" className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="articles-heading"
              className="scroll-mt-24 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground"
            >
              Latest Articles
            </h2>
            {articleCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {articleCount} {articleCount === 1 ? 'article' : 'articles'}
              </p>
            )}
          </div>

          {/* Categories — quiet text list, only those represented by published articles. */}
          {categories.length > 0 && (
            <p className="text-xs text-muted-foreground" aria-label="Article categories">
              {categories.join(' · ')}
            </p>
          )}

          {BLOG_ARTICLES.length === 0 ? (
            <EmptyState />
          ) : latest.length === 0 ? (
            <p className="border-t border-border pt-4 text-sm text-muted-foreground">
              All published articles are shown above.
            </p>
          ) : (
            <div className="flex flex-col">
              {latest.map((a) => (
                <ListRecord key={a.slug} article={a} />
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
