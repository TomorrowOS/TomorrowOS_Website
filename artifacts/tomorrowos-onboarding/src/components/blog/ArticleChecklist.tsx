import { Check } from 'lucide-react';

/**
 * Reusable article checklist: one or more titled groups of check items.
 * Purely presentational (static content), semantic lists, icon is decorative.
 */
export interface ChecklistGroup {
  title: string;
  items: string[];
}

export function ArticleChecklist({
  ariaLabel,
  groups,
  columns = 2,
}: {
  ariaLabel: string;
  groups: ChecklistGroup[];
  columns?: 1 | 2;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`grid grid-cols-1 gap-4 ${columns === 2 ? 'md:grid-cols-2' : ''}`}
    >
      {groups.map((g) => (
        <section
          key={g.title}
          className="flex flex-col gap-3 rounded-[12px] border border-border bg-card p-4 md:p-5"
        >
          <h4 className="text-sm font-semibold text-foreground">{g.title}</h4>
          <ul className="flex flex-col gap-2">
            {g.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
