import { useEffect } from 'react';

/**
 * Injects a JSON-LD structured-data script for the lifetime of the page.
 * Each instance is keyed by `id` so navigating between pages replaces
 * rather than accumulates scripts.
 */
export function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, data]);
  return null;
}
