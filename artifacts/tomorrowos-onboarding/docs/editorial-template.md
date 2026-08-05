# TomorrowOS Journal — editorial article template

Internal documentation for publishing articles on tomorrowos.org. The template
expresses one identity: a technical journal — precise, typeset, engineered.
Not a SaaS blog, not a card grid, not a magazine.

## How to publish a new article

1. **Create a shared meta module** in `src/lib/` (pattern:
   `cmsArticleMeta.ts` / `doohArticleMeta.ts`). It must be dependency-free
   because `vite.config.ts` imports it at build time for prerendered JSON-LD.
   Export the article record (path, headline, description, dates, reading
   time) and the FAQ list from this single module — the page and the
   prerenderer must never drift apart.
2. **Create the page** in `src/pages/`, splitting long bodies into section
   chunks (e.g. `src/pages/<slug>-article/Sections*.tsx`).
3. **Register the route** in all six places enforced by `validate-seo`:
   `App.tsx` (lazy route), `seoConfig.ts`, `vite.config.ts` (literal
   prerender key), `scripts/smoke.mjs` (`routes` + `indexableRoutes`),
   `src/lib/blogArticles.ts`, and the sitemap (regenerated at build).
4. **Add the archive record** to `blogArticles.ts` — the single source of
   truth for the Journal index and the metadata panel. Set `layoutMode`,
   `tocMode`, `documentType`, `reviewedAt` (only if a real review happened).
   Do NOT set `documentStatus` unless status maintenance genuinely exists.

## Layout system

`<EditorialArticleLayout>` (`src/components/blog/EditorialArticleLayout.tsx`)
renders the canonical header order — breadcrumbs → CATEGORY → H1 → subtitle →
(optional byline) → `<EditorialDocumentMeta>` — and owns the page grid.

- `layoutMode="document"` — single centred column; short articles.
- `layoutMode="document-with-rail"` — adds a right-hand navigation rail at
  `xl`; below that, a collapsed native `<details>` contents ("In this
  guide") renders in-flow. Both cornerstone articles use this mode.

No CTAs above the article. No hero images.

## Components

- **`EditorialDocumentMeta`** — the signature document-control table; the
  ONLY place colour appears (charcoal label cells, pale blue-grey values,
  steel accent strip). Rows: Document owner / Published / Last reviewed /
  Reading time, then Category / Document type. Never invent Status or
  Version values.
- **`EditorialReferences` + `RefMark`** — numbered source list with optional
  inline `[n]` markers and back-links. Use for any article citing external
  sources. Listing a source does not imply endorsement.
- **`ArticleCallout`** — document-note style: thin left rule, small
  uppercase label, no icons. Approved labels: Key distinction, Engineering
  note, Important, Practical guidance, Current product truth, Measurement
  rule.
- **`SectionHeading`** — accepts optional decorative `number` ("01"),
  hidden from screen readers. Keep anchor `id`s stable forever.
- **`ArticleDataTable`** — square-cornered editorial table, thin rules,
  pale header; horizontal scroll container on narrow screens.
- **`ArticleDiagram` family** — monospace, black/grey only, square corners.
- **`EditorialClosingCta`** — the standard quiet document-ending panel.

## Blog index

`/blog` is the "TomorrowOS Journal" archive: masthead + editorial statement,
featured record, text-led archive records (uppercase category line, title,
description, date + reading time) with thin rules and a subtle blue-grey
hover. Categories appear as a plain text line, only when populated. Nav label
and URL remain **Blog** / `/blog`.

## Print

Article pages set `data-editorial-article`; scoped rules in `src/index.css`
hide site chrome, keep the metadata table/body/tables/diagrams/references,
avoid page-splitting tables, and print the canonical URL under the title
(a print-only element rendered by the layout).

## Hard rules

- Never reword published editorial copy during template work.
- Never change canonical URLs, indexability, or structured data as part of
  visual changes.
- Colour stays inside `EditorialDocumentMeta` (and the pale blue-grey wash
  on callouts/table headers); everything else is monochrome.
- No new dependencies or fonts. Roboto + JetBrains Mono only.
- Run the full validation sequence before committing:
  `tsc` → `validate-seo` → `validate-social` → production build →
  `generate-sitemap --env=production` → `smoke` against the built dist.
