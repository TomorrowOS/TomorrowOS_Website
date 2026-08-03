import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
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
 * TomorrowOS Blog index (/blog).
 *
 * All article content derives from src/lib/blogArticles.ts. If no article is
 * published the page renders a purposeful empty state — no fake cards, no
 * "coming soon". Indexable since 2026-08-03, when the first pillar article
 * (/build-a-digital-signage-cms) shipped (see seoConfig.ts).
 */

const PrimaryA =
  'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const SecondaryA =
  'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <article className="flex flex-col gap-3 rounded-[12px] border border-border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex h-6 items-center rounded-full border border-border bg-muted px-2.5 font-medium text-foreground">
          {article.category}
        </span>
        <span>{article.publishedAt}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-foreground">
        <Link
          href={article.href}
          className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {article.title}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground">{article.description}</p>
      <Link
        href={article.href}
        className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label={`Read article: ${article.title}`}
      >
        Read article
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

function EmptyState() {
  const links: { label: string; href: string; external?: boolean }[] = [
    { label: 'Start Building', href: '/start' },
    { label: 'Documentation', href: siteConfig.links.docs, external: true },
    { label: 'GitHub', href: siteConfig.links.github, external: true },
    { label: 'Platform guides', href: '/guides/platforms' },
    { label: 'Platform Compatibility', href: '/compatibility' },
    { label: 'Media Compatibility', href: '/compatibility/media' },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-border bg-muted/30 p-6 md:p-8">
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
 * Compact index row — deliberately lighter than the featured card so the same
 * article can appear in both places with distinct purposes (featured =
 * discovery card with description and CTA; index = complete scannable list).
 */
function ArticleIndexRow({ article }: { article: BlogArticle }) {
  return (
    <li className="flex flex-col gap-1.5 border-b border-border/60 py-4 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{article.category}</span>
        <span aria-hidden="true">·</span>
        <span>{article.publishedAt}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        <Link
          href={article.href}
          className="underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {article.title}
        </Link>
      </h3>
    </li>
  );
}

export default function Blog() {
  usePageSeo('/blog');
  const categories = getActiveCategories();

  return (
    <div className="w-full">
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          ],
        }}
      />

      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[1050px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1050px] flex-col gap-14 px-4 py-10 md:px-8 md:py-14">
        {/* Hero */}
        <header className="flex max-w-[820px] flex-col gap-5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            TomorrowOS Blog
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Engineering guides, platform insights and practical resources for building digital
            signage software.
          </p>
          <p className="text-muted-foreground">
            The Blog covers open-source digital signage infrastructure, CMS development, screen
            platforms like Samsung Tizen and BrightSign, and real-world engineering lessons from
            building and validating player software.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#articles" className={PrimaryA}>
              Explore articles
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={SecondaryA}
            >
              View documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </header>

        {/* Featured article — rendered only when one exists. */}
        {FEATURED_ARTICLE && (
          <section aria-labelledby="featured" className="flex flex-col gap-4">
            <h2 id="featured" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Featured
            </h2>
            <ArticleCard article={FEATURED_ARTICLE} />
          </section>
        )}

        {/* Article index */}
        <section aria-labelledby="articles-heading" className="flex flex-col gap-5">
          <h2
            id="articles"
            className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            <span id="articles-heading">Articles</span>
          </h2>

          {/* Categories — only those represented by published articles. */}
          {categories.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Article categories">
              {categories.map((c) => (
                <li key={c}>
                  <span className="inline-flex h-7 items-center rounded-full border border-border bg-muted px-3 text-xs font-medium text-foreground">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {BLOG_ARTICLES.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="flex flex-col">
              {BLOG_ARTICLES.map((a) => (
                <ArticleIndexRow key={a.slug} article={a} />
              ))}
            </ul>
          )}
        </section>

        {/* Closing CTA */}
        <section aria-labelledby="closing" className="flex flex-col gap-4">
          <h2 id="closing" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Build with TomorrowOS
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/start" className={PrimaryA}>
              Start building
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={SecondaryA}
            >
              Read the documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={SecondaryA}
            >
              Explore GitHub
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
