import { Info, AlertTriangle, Wrench } from 'lucide-react';

/**
 * Restrained article callout. Three kinds only (spec):
 * - engineering: "Engineering note"
 * - important:   "Important"
 * - practical:   "Practical guidance"
 * Uses existing design tokens; status is conveyed by label text, not colour alone.
 */
export type CalloutKind = 'engineering' | 'important' | 'practical';

const KIND: Record<CalloutKind, { label: string; Icon: typeof Info }> = {
  engineering: { label: 'Engineering note', Icon: Wrench },
  important: { label: 'Important', Icon: AlertTriangle },
  practical: { label: 'Practical guidance', Icon: Info },
};

export function ArticleCallout({
  kind,
  children,
}: {
  kind: CalloutKind;
  children: React.ReactNode;
}) {
  const { label, Icon } = KIND[kind];
  return (
    <aside
      className={`flex flex-col gap-1.5 rounded-[12px] border p-4 md:p-5 ${
        kind === 'important' ? 'border-foreground/25 bg-muted/50' : 'border-border bg-muted/30'
      }`}
    >
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}
