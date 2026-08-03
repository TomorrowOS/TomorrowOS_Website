import { ArrowDown } from 'lucide-react';

/**
 * Accessible HTML/CSS diagram primitives for articles. No diagram library.
 * Each diagram is a <figure> with a visible caption; the flow itself carries
 * an aria-label ("alt description") and the visual nodes are plain text, so
 * the content is readable with or without CSS.
 */

export function ArticleDiagram({
  alt,
  caption,
  children,
  wide = false,
}: {
  /** Accessible description of the diagram. */
  alt: string;
  caption: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={`flex flex-col gap-3 ${wide ? '' : 'max-w-[720px]'}`}>
      <div
        role="img"
        aria-label={alt}
        className="flex flex-col gap-0 rounded-[12px] border border-border bg-muted/20 p-4 md:p-6"
      >
        {children}
      </div>
      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** A single node box in a vertical flow. */
export function DiagramNode({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 text-center text-sm ${
        emphasis
          ? 'border-foreground/30 bg-background font-semibold text-foreground'
          : 'border-border bg-background text-foreground'
      }`}
    >
      {children}
    </div>
  );
}

/** Downward connector between nodes. */
export function DiagramArrow({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1.5 text-muted-foreground">
      <ArrowDown className="h-4 w-4" aria-hidden="true" />
      {label ? <span className="text-xs">{label}</span> : null}
    </div>
  );
}

/** Vertical sequence of nodes joined by arrows. */
export function DiagramFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col">
          {i > 0 && <DiagramArrow />}
          <DiagramNode>{s}</DiagramNode>
        </div>
      ))}
    </div>
  );
}

/** A labelled row of sibling nodes (stacks on small screens). */
export function DiagramBranchRow({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="flex">
          <div className="w-full rounded-md border border-border bg-background px-3 py-2 text-center text-sm text-foreground">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Titled panel used for module/tree structures (backend modules, stacks). */
export function DiagramPanel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border border-border bg-background">
      <p className="border-b border-border bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground">
        {title}
      </p>
      <ul className="flex flex-col">
        {items.map((it) => (
          <li
            key={it}
            className="border-b border-border/50 px-3 py-1.5 text-sm text-muted-foreground last:border-b-0"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
