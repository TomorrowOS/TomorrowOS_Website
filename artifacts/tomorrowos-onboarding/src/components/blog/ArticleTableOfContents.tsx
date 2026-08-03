/**
 * Static, accessible table of contents.
 * Desktop: compact in-flow panel. Mobile: native <details>/<summary>.
 * No scroll hijacking, no active-section tracking (spec: omit if it adds
 * complexity). Anchor targets set their own scroll-margin-top.
 */
export interface TocEntry {
  id: string;
  label: string;
}

function TocLinks({ entries }: { entries: TocEntry[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
      {entries.map((e, i) => (
        <li key={e.id} className="flex items-baseline gap-2 text-sm">
          <span className="w-5 shrink-0 tabular-nums text-muted-foreground/70" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <a
            href={`#${e.id}`}
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {e.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function ArticleTableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-label="On this page">
      {/* Mobile: collapsible native disclosure. */}
      <details className="rounded-[12px] border border-border bg-muted/30 md:hidden">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[12px]">
          On this page
        </summary>
        <div className="border-t border-border px-4 py-3">
          <TocLinks entries={entries} />
        </div>
      </details>
      {/* Desktop: in-flow contents panel. */}
      <div className="hidden flex-col gap-3 rounded-[12px] border border-border bg-muted/30 p-5 md:flex">
        <p className="text-sm font-semibold text-foreground">On this page</p>
        <TocLinks entries={entries} />
      </div>
    </nav>
  );
}
