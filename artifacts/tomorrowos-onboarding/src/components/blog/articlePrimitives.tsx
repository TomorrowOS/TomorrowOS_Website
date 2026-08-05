import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';

/**
 * Shared low-level primitives for cornerstone/blog articles.
 * Follows the site-wide link, focus and external-link conventions.
 */

export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      <span className="sr-only"> (opens in a new window)</span>
    </a>
  );
}

export function IntLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  id,
  number,
  children,
}: {
  id: string;
  /** Optional decorative document-section number, e.g. "01". Hidden from screen readers. */
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 border-t border-border pt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
    >
      {number && (
        <span
          aria-hidden="true"
          className="mb-1.5 block font-mono text-sm font-medium tabular-nums text-muted-foreground/70"
        >
          {number}
        </span>
      )}
      {children}
    </h2>
  );
}

export function SubHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 text-lg font-bold tracking-tight text-foreground md:text-xl">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-muted-foreground">{children}</p>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-border">
      {children}
    </ul>
  );
}

/** Accessible responsive data table with caption and column scope. */
export function ArticleDataTable({
  caption,
  head,
  rows,
  minWidth = 560,
}: {
  caption: string;
  head: string[];
  rows: (string | React.ReactNode)[][];
  minWidth?: number;
}) {
  return (
    <div
      className="w-full overflow-x-auto border-y border-border print:overflow-visible"
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-[#eef2f6] text-left print:bg-white">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2.5 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 align-top last:border-b-0">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th
                    key={j}
                    scope="row"
                    className="px-3 py-2.5 text-left font-medium text-foreground"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-3 py-2.5 text-muted-foreground">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
