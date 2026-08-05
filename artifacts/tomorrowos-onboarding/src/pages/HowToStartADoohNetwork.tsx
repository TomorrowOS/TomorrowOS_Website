/**
 * Cornerstone article: /how-to-start-a-dooh-network
 *
 * Root-level pillar page (NOT under /blog). Copy is rendered verbatim from
 * the approved editorial source; do not reword without editorial sign-off.
 *
 * Reuses the cornerstone article component kit created for
 * /build-a-digital-signage-cms — no second article design system.
 *
 * Metadata + FAQ live in the shared module src/lib/doohArticleMeta.ts
 * (also imported by vite.config.ts for prerendered JSON-LD), so structured
 * data cannot drift from the visible page content.
 */
import { DOOH_ARTICLE, DOOH_ARTICLE_FAQ, DOOH_ARTICLE_SOURCES } from '@/lib/doohArticleMeta';
import { CMS_ARTICLE, BLOG_AUTHOR } from '@/lib/cmsArticleMeta';
import { BLOG_ARTICLES } from '@/lib/blogArticles';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seoConfig';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading, P, Lead, UL, IntLink, ExtLink } from '@/components/blog/articlePrimitives';
import { type ArticleTocGroup } from '@/components/blog/ArticleTableOfContents';
import { ArticleFAQ } from '@/components/blog/ArticleFAQ';
import { ArticleAuthorBox } from '@/components/blog/ArticleAuthorBox';
import { EditorialArticleLayout } from '@/components/blog/EditorialArticleLayout';
import { EditorialClosingCta } from '@/components/blog/EditorialClosingCta';
import { EditorialReferences } from '@/components/blog/EditorialReferences';
import { DoohSectionsFoundation } from '@/pages/dooh-article/SectionsFoundation';
import { DoohSectionsTechnology } from '@/pages/dooh-article/SectionsTechnology';
import { DoohSectionsStrategy } from '@/pages/dooh-article/SectionsStrategy';

/**
 * Hand-curated chapter groups for the "grouped" contents mode (approved
 * major sections only — deliberately not every H2). All section anchor IDs
 * remain on their headings, so direct links to unlisted sections keep working.
 */
const TOC_GROUPS: ArticleTocGroup[] = [
  {
    number: '01',
    title: 'Foundation',
    items: [
      { label: 'What is a DOOH network?', href: '#what-is-a-dooh-network' },
      { label: 'DOOH, digital signage and retail media', href: '#dooh-digital-signage-and-retail-media' },
      { label: 'Choose the network model', href: '#choose-the-network-model' },
      { label: 'Select locations and define the audience', href: '#select-locations-and-define-the-audience' },
    ],
  },
  {
    number: '02',
    title: 'Commercial model',
    items: [
      { label: 'Build the commercial model', href: '#build-the-commercial-model' },
      { label: 'Manage inventory', href: '#manage-inventory-not-only-screens' },
      { label: 'Choose direct sales, programmatic or a hybrid', href: '#choose-direct-sales-programmatic-or-a-hybrid' },
    ],
  },
  {
    number: '03',
    title: 'Technology',
    items: [
      { label: 'Assemble the DOOH technology stack', href: '#assemble-the-dooh-technology-stack' },
      { label: 'What the DOOH CMS must provide', href: '#what-the-dooh-cms-must-provide' },
      { label: 'Design campaign and ad-serving logic', href: '#design-campaign-and-ad-serving-logic' },
      { label: 'Build credible proof of play', href: '#build-credible-proof-of-play' },
    ],
  },
  {
    number: '04',
    title: 'Measurement and operations',
    items: [
      { label: 'Define audience measurement', href: '#define-audience-measurement' },
      { label: 'Select hardware and connectivity', href: '#select-hardware-and-connectivity' },
      { label: 'Establish creative operations', href: '#establish-creative-and-content-operations' },
      { label: 'Design operations before scaling', href: '#design-operations-before-scaling' },
      { label: 'Legal, privacy and contractual requirements', href: '#legal-privacy-and-contractual-requirements' },
    ],
  },
  {
    number: '05',
    title: 'Build strategy',
    items: [
      { label: 'Build, buy or assemble the platform', href: '#build-buy-or-assemble-the-platform' },
      { label: 'Where TomorrowOS fits', href: '#where-tomorrowos-fits' },
      { label: 'A practical launch roadmap', href: '#a-practical-launch-roadmap' },
      { label: 'DOOH network launch checklist', href: '#dooh-network-launch-checklist' },
    ],
  },
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export default function HowToStartADoohNetwork() {
  usePageSeo(DOOH_ARTICLE.path);
  const record = BLOG_ARTICLES.find((a) => a.href === DOOH_ARTICLE.path);

  return (
    <>
      <JsonLd
        id="article"
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: DOOH_ARTICLE.headline,
          description: DOOH_ARTICLE.description,
          url: absoluteUrl(DOOH_ARTICLE.path),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(DOOH_ARTICLE.path) },
          datePublished: DOOH_ARTICLE.datePublished,
          dateModified: DOOH_ARTICLE.dateModified,
          author: {
            '@type': 'Person',
            name: BLOG_AUTHOR.name,
            jobTitle: BLOG_AUTHOR.role,
            sameAs: [BLOG_AUTHOR.linkedin, BLOG_AUTHOR.github],
          },
          publisher: { '@type': 'Organization', name: 'TomorrowOS', url: absoluteUrl('/') },
        }}
      />
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
            {
              '@type': 'ListItem',
              position: 3,
              name: DOOH_ARTICLE.headline,
              item: absoluteUrl(DOOH_ARTICLE.path),
            },
          ],
        }}
      />
      <JsonLd
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: DOOH_ARTICLE_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <EditorialArticleLayout
        layoutMode={record?.layoutMode ?? 'document-with-rail'}
        category="DOOH and Retail Media"
        title={DOOH_ARTICLE.headline}
        subtitle="A practical guide to the business model, technology stack and operating systems required to build a digital out-of-home advertising network."
        byline={
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">By {BLOG_AUTHOR.name}</span>
            {' · '}
            {BLOG_AUTHOR.role}
          </p>
        }
        metaItems={[
          { label: 'Document owner', value: 'TomorrowOS' },
          { label: 'Published', value: formatDate(DOOH_ARTICLE.datePublished) },
          { label: 'Last reviewed', value: formatDate(DOOH_ARTICLE.dateModified) },
          { label: 'Reading time', value: `${DOOH_ARTICLE.readingTimeMinutes} minutes` },
        ]}
        canonicalUrl={absoluteUrl(DOOH_ARTICLE.path)}
        tocGroups={TOC_GROUPS}
      >
        {/* 3. Direct introductory answer */}
        <section className="flex flex-col gap-4" aria-label="Introduction">
          <Lead>
            Starting a digital out-of-home network can look straightforward from the outside:
            secure a location, install a screen, sell advertising and schedule campaigns. The
            difficult part is not making one screen display an advert. It is building a
            repeatable media business that can prove where campaigns ran, keep devices
            operating, manage inventory, support venues and scale without losing control of
            delivery.
          </Lead>
          <P>
            A DOOH network combines media, software, hardware, sales and field operations. The
            content management system is important, but it is only one layer. A dependable
            network also needs campaign management, inventory logic, ad-serving rules, proof of
            play, audience measurement, venue agreements, creative standards, billing and a
            reliable player runtime.
          </P>
          <P>
            This guide explains the full system, from selecting locations and designing the
            commercial model to choosing a CMS, recording proof of play and deciding whether
            programmatic buying belongs in the first version of the business.
          </P>
          <P>
            The opportunity is meaningful. In the United States,{' '}
            <ExtLink href="https://oaaa.org/news/out-of-home-advertising-revenue-reaches-record-9-46-billion/">
              total out-of-home advertising revenue reached a record $9.46 billion in 2025
            </ExtLink>
            , while digital out-of-home continued to be a major growth driver. Industry bodies
            are also investing heavily in measurement and programmatic standards, reflecting
            the need for clearer, more interoperable DOOH infrastructure.
          </P>
          <div className="flex flex-col gap-1.5 border-l-2 border-foreground/70 bg-[#eef2f6] py-3 pl-4 pr-4 md:pl-5 print:bg-white">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-foreground">
              Direct answer
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              To start a DOOH network, first validate the audience and venue model, then deploy
              a small technically reliable pilot. Use a CMS for content and device operations,
              add campaign and inventory logic for advertising, record proof of play, establish
              a defensible measurement method and scale only after sales, support and reporting
              are repeatable.
            </p>
          </div>
        </section>

        {/* 5. Full article sections */}
        <DoohSectionsFoundation />
        <DoohSectionsTechnology />
        <DoohSectionsStrategy />

        {/* 6. FAQ */}
        <section className="flex flex-col gap-6" aria-labelledby="faq">
          <SectionHeading id="faq">Frequently asked questions</SectionHeading>
          <ArticleFAQ items={DOOH_ARTICLE_FAQ} />
        </section>

        {/* Next steps (closing editorial section from the supplied copy). */}
        <section className="flex flex-col gap-4" aria-labelledby="next-steps">
          <SectionHeading id="next-steps">Next steps</SectionHeading>
          <P>
            A successful DOOH network is not defined by the number of screens installed. It is
            defined by the value of the audience, the reliability of delivery, the quality of
            reporting and the ability to operate each location sustainably.
          </P>
          <P>
            Start by proving one repeatable venue and audience model. Build the minimum
            technology required to deliver and evidence real campaigns. Standardise the
            operating workflow, then expand the commercial and programmatic layers only when
            the foundation is reliable.
          </P>
          <P>
            TomorrowOS provides open-source server-to-screen infrastructure for teams that want
            to build and own their DOOH product without independently recreating every device,
            playback and platform capability.
          </P>
          <UL>
            <li>
              <IntLink href="/start">Start Building</IntLink> — begin a new TomorrowOS project.
            </li>
            <li>
              <ExtLink href={siteConfig.links.docs}>Documentation</ExtLink> — review
              implementation and API guidance.
            </li>
            <li>
              <ExtLink href={siteConfig.links.github}>GitHub</ExtLink> — explore the source
              code, releases and discussions.
            </li>
            <li>
              <IntLink href={CMS_ARTICLE.path}>How to Build a Digital Signage CMS</IntLink> —
              understand the underlying CMS and runtime architecture.
            </li>
          </UL>
        </section>

        {/* 7. References — numbered editorial reference list. */}
        <section className="flex flex-col gap-4" aria-labelledby="primary-sources">
          <SectionHeading id="primary-sources">Primary sources</SectionHeading>
          <EditorialReferences
            references={DOOH_ARTICLE_SOURCES.map((s, i) => ({
              id: `src-${i + 1}`,
              title: s.label,
              href: s.href,
              note: s.note,
            }))}
          />
        </section>

        {/* 8. Related resources */}
        <section className="flex flex-col gap-4" aria-labelledby="related">
          <SectionHeading id="related">Related resources</SectionHeading>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                label: 'How to Build a Digital Signage CMS',
                href: CMS_ARTICLE.path,
                desc: 'The underlying CMS and runtime architecture beneath a DOOH platform.',
                external: false,
              },
              {
                label: 'Start Building',
                href: '/start',
                desc: 'Begin a new TomorrowOS project with guided setup.',
                external: false,
              },
              {
                label: 'Documentation',
                href: siteConfig.links.docs,
                desc: 'Implementation and API guidance for TomorrowOS infrastructure.',
                external: true,
              },
              {
                label: 'GitHub',
                href: siteConfig.links.github,
                desc: 'Source code, releases and discussions.',
                external: true,
              },
            ].map((r) => (
              <li
                key={r.label}
                className="flex flex-col gap-1 rounded-[12px] border border-border bg-card p-4"
              >
                {r.external ? <ExtLink href={r.href}>{r.label}</ExtLink> : <IntLink href={r.href}>{r.label}</IntLink>}
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Author box */}
        <ArticleAuthorBox />

        {/* 9. Closing CTA — quiet document-ending panel. */}
        <EditorialClosingCta />
      </EditorialArticleLayout>
    </>
  );
}
