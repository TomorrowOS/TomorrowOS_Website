/**
 * Adaptive article-navigation component ("In this guide").
 *
 * The page author supplies the major sections or chapter groups INTENTIONALLY
 * — never derive items automatically from every H2. A long guide's contents
 * should read like a considered editorial index, not a generated dump.
 *
 * Modes and recommended thresholds:
 * - "none"    — no contents navigation. Use for fewer than 4 major sections.
 * - "compact" — a single short list of 4–8 major links.
 * - "grouped" — long cornerstone guides (more than 8 major sections) with
 *               explicit, hand-curated chapter groups. Only the groups carry
 *               numbers; nested links are unnumbered.
 * - "sticky"  — side-rail variant for long technical articles; only when the
 *               article layout provides a side rail AND it is specifically
 *               selected. Renders the compact list inside a sticky container;
 *               the page layout must place it in its own column.
 *
 * Accessibility: renders as <nav aria-label="In this guide"> with semantic
 * lists, decorative chapter numbers, native <details>/<summary> on mobile
 * (collapsed by default, no sticky overlay), visible focus states, and no
 * scroll hijacking — anchor targets provide their own scroll-margin-top.
 */

export type ArticleTocMode = 'none' | 'compact' | 'grouped' | 'sticky';

export interface ArticleTocItem {
  label: string;
  href: string;
}

export interface ArticleTocGroup {
  /** Decorative chapter number, e.g. "01". */
  number?: string;
  title: string;
  items: ArticleTocItem[];
}

const linkClass =
  'text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm';

function TocLinkList({ items }: { items: ArticleTocItem[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className={linkClass}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function TocGroup({ group }: { group: ArticleTocGroup }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="flex items-baseline gap-2.5 text-sm font-semibold text-foreground">
        {group.number && (
          <span className="text-xs font-medium tabular-nums text-muted-foreground/60" aria-hidden="true">
            {group.number}
          </span>
        )}
        {group.title}
      </h3>
      <div className="pl-[1.7rem]">
        <TocLinkList items={group.items} />
      </div>
    </section>
  );
}

/**
 * Grouped body. Desktop uses two columns of WHOLE chapter groups (each column
 * is its own vertical reading flow — a group is never split, and numbers never
 * alternate left-to-right across rows). CSS `columns` with break-inside-avoid
 * fills the first column completely before starting the second.
 */
function GroupedBody({ groups }: { groups: ArticleTocGroup[] }) {
  return (
    <div className="md:columns-2 md:gap-10">
      {groups.map((g) => (
        <div key={g.title} className="break-inside-avoid pb-6 last:pb-0">
          <TocGroup group={g} />
        </div>
      ))}
    </div>
  );
}

export function ArticleTableOfContents({
  mode,
  items,
  groups,
}: {
  mode: ArticleTocMode;
  /** For "compact" and "sticky" modes: 4–8 major links. */
  items?: ArticleTocItem[];
  /** For "grouped" mode: explicit chapter groups. */
  groups?: ArticleTocGroup[];
}) {
  if (mode === 'none') return null;

  if (mode === 'compact' || mode === 'sticky') {
    const links = items ?? [];
    if (links.length === 0) return null;
    const list = (
      <div className="flex flex-col gap-3 rounded-[12px] border border-border bg-muted/30 p-5">
        <p className="text-sm font-semibold text-foreground">In this guide</p>
        <TocLinkList items={links} />
      </div>
    );
    return (
      <nav
        aria-label="In this guide"
        className={mode === 'sticky' ? 'md:sticky md:top-24 md:self-start' : undefined}
      >
        {list}
      </nav>
    );
  }

  // mode === 'grouped'
  const chapterGroups = groups ?? [];
  if (chapterGroups.length === 0) return null;
  return (
    <nav aria-label="In this guide">
      {/* Mobile: native disclosure, collapsed by default, no sticky overlay. */}
      <details className="rounded-[12px] border border-border bg-muted/30 md:hidden">
        <summary className="cursor-pointer select-none rounded-[12px] px-4 py-3 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          In this guide
        </summary>
        <div className="flex flex-col gap-6 border-t border-border px-4 py-4">
          {chapterGroups.map((g) => (
            <TocGroup key={g.title} group={g} />
          ))}
        </div>
      </details>
      {/* Tablet/desktop: one restrained container, whole groups per column. */}
      <div className="hidden flex-col gap-4 rounded-[12px] border border-border bg-muted/30 p-6 md:flex">
        <p className="text-sm font-semibold text-foreground">In this guide</p>
        <GroupedBody groups={chapterGroups} />
      </div>
    </nav>
  );
}
