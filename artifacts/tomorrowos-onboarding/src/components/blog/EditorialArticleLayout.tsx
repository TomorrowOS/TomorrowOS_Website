/**
 * Shared editorial article shell — the ONE layout system for all TomorrowOS
 * Journal articles (see docs/editorial-template.md).
 *
 * Layout modes:
 * - "document"           — single centred document column (short articles).
 * - "document-with-rail" — document column plus a right-hand navigation rail
 *                          on large screens. Below xl the rail disappears and
 *                          the grouped mobile disclosure is rendered in-flow.
 *
 * The shell renders the canonical header order: breadcrumbs → CATEGORY → H1 →
 * subtitle → document metadata panel → opening answer (children begin there).
 * No CTAs above the article, no hero image.
 *
 * Print: hides breadcrumbs and the rail (site header/footer are hidden by the
 * global print rules in index.css) and shows the canonical URL beneath the
 * title.
 */
import { Link } from 'wouter';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { EditorialDocumentMeta, type EditorialMetaItem } from './EditorialDocumentMeta';
import {
  ArticleTableOfContents,
  type ArticleTocGroup,
} from './ArticleTableOfContents';

export type EditorialLayoutMode = 'document' | 'document-with-rail';

export function EditorialArticleLayout({
  layoutMode,
  category,
  title,
  subtitle,
  byline,
  metaItems,
  canonicalUrl,
  tocGroups,
  children,
}: {
  layoutMode: EditorialLayoutMode;
  category: string;
  title: string;
  subtitle: string;
  /** Optional small byline line rendered between subtitle and metadata panel. */
  byline?: React.ReactNode;
  metaItems: EditorialMetaItem[];
  canonicalUrl: string;
  /** Grouped navigation used by the rail (xl) and mobile disclosure. */
  tocGroups?: ArticleTocGroup[];
  children: React.ReactNode;
}) {
  const withRail = layoutMode === 'document-with-rail' && (tocGroups?.length ?? 0) > 0;

  return (
    <div className="w-full" data-editorial-article>
      {/* Breadcrumbs */}
      <div className="w-full px-4 pt-8 md:px-8 print:hidden">
        <div className={`mx-auto ${withRail ? 'max-w-[1140px]' : 'max-w-[820px]'}`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div
        className={`mx-auto w-full px-4 py-10 md:px-8 md:py-14 ${
          withRail
            ? 'max-w-[1140px] xl:grid xl:grid-cols-[minmax(0,1fr)_272px] xl:items-start xl:gap-14'
            : 'max-w-[820px]'
        }`}
      >
        <article className="mx-auto flex w-full max-w-[780px] flex-col gap-12 md:gap-14 xl:mx-0">
          {/* Document header — technical-report cover order. */}
          <header className="flex flex-col gap-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {category}
            </p>
            <h1 className="max-w-[18ch] text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
            <p className="hidden text-sm text-muted-foreground print:block">{canonicalUrl}</p>
            {byline}
            <EditorialDocumentMeta items={metaItems} />
          </header>

          {/* Mobile/tablet contents — native disclosure, collapsed. Hidden at
              xl when the rail takes over; always hidden in print. */}
          {withRail && (
            <div className="xl:hidden print:hidden">
              <ArticleTableOfContents mode="grouped" groups={tocGroups!} />
            </div>
          )}

          {children}
        </article>

        {/* Navigation rail — xl and up only; sticky; stops before footer
            because it is part of this grid, not fixed. */}
        {withRail && (
          <aside className="hidden xl:block print:hidden" aria-label="Article navigation rail">
            <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col gap-6 overflow-y-auto pb-6">
              <ArticleTableOfContents mode="rail" groups={tocGroups!} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
