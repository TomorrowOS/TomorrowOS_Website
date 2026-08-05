/**
 * Restrained document-note callout (journal template).
 *
 * Visual language: thin left rule, small uppercase label, short body,
 * optional pale blue-grey background, minimal radius, no icons, no bright
 * alert colours. Status is conveyed by the label text, never colour alone.
 *
 * Supported named labels (spec): Key distinction, Engineering note,
 * Important, Practical guidance, Current product truth, Measurement rule.
 * The legacy `kind` prop maps to a default label; pass `label` to use one of
 * the other approved names without changing call sites' semantics.
 */
export type CalloutKind = 'engineering' | 'important' | 'practical';

const DEFAULT_LABEL: Record<CalloutKind, string> = {
  engineering: 'Engineering note',
  important: 'Important',
  practical: 'Practical guidance',
};

export function ArticleCallout({
  kind,
  label,
  children,
}: {
  kind: CalloutKind;
  /** Optional approved label override, e.g. "Key distinction". */
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={`flex break-inside-avoid flex-col gap-1.5 border-l-2 py-1 pl-4 md:pl-5 ${
        kind === 'important' ? 'border-foreground/70' : 'border-foreground/30'
      } ${kind === 'important' ? 'bg-[#eef2f6] py-3 pr-4 print:bg-white' : ''}`}
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-foreground">
        {label ?? DEFAULT_LABEL[kind]}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}
