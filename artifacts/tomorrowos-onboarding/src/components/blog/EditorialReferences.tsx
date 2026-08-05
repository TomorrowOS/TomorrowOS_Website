/**
 * <EditorialReferences /> — numbered reference list for articles, plus the
 * inline <RefMark /> citation marker.
 *
 * Follows the journal convention: inline markers such as [1] link down to the
 * numbered source entry; each entry links back to the first citation point.
 * External links keep the site-wide new-window treatment. Listing a source
 * does not imply endorsement.
 */
import { ExternalLink } from 'lucide-react';

export interface EditorialReference {
  /** Stable id used for anchors, e.g. 'oaaa-2025-revenue'. */
  id: string;
  title: string;
  publisher?: string;
  href: string;
  note?: string;
  accessedAt?: string;
  /**
   * Set true only when an inline <RefMark refId={id}> exists in the body;
   * enables the "cited above" back-link. Defaults to false so entries never
   * render dead jumps.
   */
  citedInline?: boolean;
}

/** Inline citation marker: renders “[n]” linking to the reference entry. */
export function RefMark({ refId, n }: { refId: string; n: number }) {
  return (
    <sup className="ml-0.5">
      <a
        id={`cite-${refId}`}
        href={`#ref-${refId}`}
        aria-label={`Reference ${n}`}
        className="rounded-sm font-medium text-foreground no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        [{n}]
      </a>
    </sup>
  );
}

export function EditorialReferences({ references }: { references: EditorialReference[] }) {
  if (references.length === 0) return null;
  return (
    <ol className="flex flex-col gap-3 border-t border-border pt-5">
      {references.map((r, i) => (
        <li
          key={r.id}
          id={`ref-${r.id}`}
          className="grid scroll-mt-24 grid-cols-[2rem_1fr] gap-x-1 text-sm leading-relaxed"
        >
          <span className="tabular-nums text-muted-foreground" aria-hidden="true">
            [{i + 1}]
          </span>
          <span className="text-muted-foreground">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {r.title}
              <ExternalLink className="h-3.5 w-3.5 opacity-60 print:hidden" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            {r.publisher ? <> — {r.publisher}.</> : null}
            {r.note ? <> {r.note}</> : null}
            {r.accessedAt ? <> Accessed {r.accessedAt}.</> : null}
            {r.citedInline && (
              <>
                {' '}
                <a
                  href={`#cite-${r.id}`}
                  className="whitespace-nowrap text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm print:hidden"
                  aria-label={`Back to citation ${i + 1}`}
                >
                  ↩ cited above
                </a>
              </>
            )}
            <span className="hidden print:inline"> — {r.href}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
