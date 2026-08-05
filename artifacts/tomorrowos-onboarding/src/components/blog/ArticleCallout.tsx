/**
 * Restrained document-note callout (journal template).
 *
 * Visual language: thin left rule, short body, optional pale blue-grey
 * background, minimal radius, no icons, no bright alert colours.
 *
 * Editorial decision 2026-08-05: callouts carry NO uppercase label header
 * ("Important", "Direct answer", etc.) — the body copy stands on its own;
 * `kind` only controls the visual weight (rule contrast + background wash).
 */
export type CalloutKind = 'engineering' | 'important' | 'practical';

export function ArticleCallout({
  kind,
  children,
}: {
  kind: CalloutKind;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={`flex break-inside-avoid flex-col gap-1.5 border-l-2 py-1 pl-4 md:pl-5 ${
        kind === 'important' ? 'border-foreground/70' : 'border-foreground/30'
      } ${kind === 'important' ? 'bg-[#eef2f6] py-3 pr-4 print:bg-white' : ''}`}
    >
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}
