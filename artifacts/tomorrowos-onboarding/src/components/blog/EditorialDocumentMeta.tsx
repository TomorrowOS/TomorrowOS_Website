/**
 * <EditorialDocumentMeta /> — the TomorrowOS editorial signature.
 *
 * A compact document-control table, in the manner of a formal engineering
 * specification or tender document, rendered directly beneath the article
 * subtitle. Desktop: label row (charcoal, white uppercase labels) above a
 * value row (pale blue-grey cells). Mobile: a two-column label/value grid
 * sharing the same borders so it still reads as one document table.
 *
 * Colour is deliberately scoped to this component only — the body of the
 * article stays monochrome. Editorial accents:
 *   - value cells: pale blue-grey (#DCE5EC family)
 *   - accent strip: muted steel (#526473)
 * No gradients, no shadows, square corners.
 *
 * Accessibility: a semantic <table> on desktop with <th scope="row"|"col">;
 * the mobile grid is a <dl> with visually associated pairs. Both variants
 * carry the same data; only one is in the accessibility tree at a time
 * (the other is display:none via responsive classes).
 *
 * Print: near-black becomes black, pale cells print white/light grey via
 * print utilities; `break-inside-avoid` keeps the panel on one page.
 */

export interface EditorialMetaItem {
  label: string;
  value: string;
}

const LABEL_CELL =
  'border border-foreground/20 bg-foreground px-3 py-1.5 text-left align-middle text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-background print:bg-black print:text-white';
const VALUE_CELL =
  'border border-border bg-[#e4ebf1] px-3 py-2 text-left align-middle text-sm font-medium text-foreground print:bg-white';
const VALUE_CELL_ALT =
  'border border-border bg-[#eef2f6] px-3 py-2 text-left align-middle text-sm font-medium text-foreground print:bg-white';

/** Split items into rows of up to four columns for the desktop table. */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function EditorialDocumentMeta({ items }: { items: EditorialMetaItem[] }) {
  if (items.length === 0) return null;
  const rows = chunk(items, 4);

  return (
    <div className="flex break-inside-avoid" data-testid="editorial-document-meta">
      {/* Narrow vertical editorial accent strip (decorative). */}
      <div aria-hidden="true" className="w-1 shrink-0 bg-[#526473] print:bg-black" />

      {/* Desktop / tablet: document-control table. Each label/value row pair
          is its own fixed-layout table so every band divides its width evenly
          regardless of how many fields the other band has. */}
      <div className="hidden w-full flex-col sm:flex">
        {rows.map((row, ri) => (
          <table key={ri} className="w-full table-fixed border-collapse">
            <caption className="sr-only">{ri === 0 ? 'Document information' : 'Document classification'}</caption>
            <tbody>
              <tr>
                {row.map((item) => (
                  <th key={item.label} scope="col" className={LABEL_CELL}>
                    {item.label}
                  </th>
                ))}
              </tr>
              <tr>
                {row.map((item, ci) => (
                  <td key={item.label} className={ci % 2 === 0 ? VALUE_CELL : VALUE_CELL_ALT}>
                    {item.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      {/* Mobile: two-column document grid sharing the same border language. */}
      <dl className="grid w-full grid-cols-[auto_1fr] sm:hidden">
        {items.map((item) => (
          <div key={item.label} className="col-span-2 grid grid-cols-subgrid">
            <dt className="border border-foreground/20 bg-foreground px-3 py-2 text-[0.65rem] font-semibold uppercase leading-5 tracking-[0.08em] text-background print:bg-black print:text-white">
              {item.label}
            </dt>
            <dd className="border border-border bg-[#e4ebf1] px-3 py-2 text-sm font-medium text-foreground print:bg-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
