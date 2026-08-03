/**
 * Build-time feature flags.
 *
 * VITE_ENABLE_LEARN — gates the entire /learn Developer Resource Centre.
 *   - unset or any value other than 'true' (production default): all /learn
 *     routes resolve to the NotFound experience, Learn is absent from
 *     navigation, prerendering, the sitemap and smoke coverage, and public
 *     pages suppress links into /learn.
 *   - 'true' (local development, previews, future relaunch): the existing
 *     Learn implementation behaves exactly as before.
 *
 * The flag is read at build time (import.meta.env), so switching states
 * requires a rebuild. vite.config.ts and the validation scripts read the
 * same variable from process.env to keep prerendering, sitemap, smoke and
 * route-sync behaviour consistent with the application bundle.
 */
export const LEARN_ENABLED = import.meta.env.VITE_ENABLE_LEARN === 'true';

/** True when an internal link target is currently reachable by the public. */
export function isRouteEnabled(href: string): boolean {
  if (href === '/learn' || href.startsWith('/learn/')) return LEARN_ENABLED;
  return true;
}
