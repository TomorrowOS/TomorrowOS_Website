/**
 * Renders a JSON-LD structured-data script as a React element.
 *
 * Rendering as a real React element (rather than injecting via useEffect)
 * means the script tag appears in the DOM immediately on mount and is
 * included in any server-side or build-time rendering pass.
 *
 * Each instance is keyed by `id`. On client-side navigation between pages
 * React reconciles the element in-place, replacing rather than accumulating
 * schemas.
 */
export function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  return (
    <script
      id={`jsonld-${id}`}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
