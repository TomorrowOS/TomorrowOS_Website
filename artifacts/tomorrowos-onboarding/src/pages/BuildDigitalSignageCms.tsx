import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { siteConfig } from '@/config/site';
import { CMS_ARTICLE, CMS_ARTICLE_FAQ, BLOG_AUTHOR } from '@/lib/cmsArticleMeta';
import { BLOG_ARTICLES } from '@/lib/blogArticles';
import { ArticleAuthorBox } from '@/components/blog/ArticleAuthorBox';
import { EditorialArticleLayout } from '@/components/blog/EditorialArticleLayout';
import { EditorialClosingCta } from '@/components/blog/EditorialClosingCta';
import { SectionHeading, P, Lead, UL, IntLink, ExtLink } from '@/components/blog/articlePrimitives';
import { type ArticleTocGroup } from '@/components/blog/ArticleTableOfContents';
import { ArticleFAQ } from '@/components/blog/ArticleFAQ';
import { SectionsFoundation } from './cms-article/SectionsFoundation';
import { SectionsRuntime } from './cms-article/SectionsRuntime';
import { SectionsStrategy } from './cms-article/SectionsStrategy';

/**
 * Cornerstone article: /build-a-digital-signage-cms
 *
 * Reference implementation for the remaining pillar pages. The editorial copy
 * comes from the supplied article source — do not reword it. Structured data
 * (TechArticle, BreadcrumbList, FAQPage) is emitted here at runtime and baked
 * into the prerendered HTML by vite.config.ts from the same shared module
 * (src/lib/cmsArticleMeta.ts), so the two can never drift apart.
 *
 * Future pillar links (/digital-signage-sdk, /digital-signage-api,
 * /open-source-digital-signage, /self-hosted-digital-signage,
 * /headless-digital-signage, /samsung-tizen-digital-signage-player,
 * /brightsign-digital-signage-player) are intentionally NOT linked — those
 * routes do not exist yet. Where the copy touches those subjects it links to
 * the closest live destination instead. Add the links when each pillar ships.
 */

/**
 * Hand-curated chapter groups for the "grouped" contents mode. Deliberately
 * NOT a list of every H2 — only the approved major sections. All section
 * anchor IDs remain on their headings, so direct links to unlisted sections
 * keep working.
 */
const TOC_GROUPS: ArticleTocGroup[] = [
  {
    number: '01',
    title: 'Foundations',
    items: [
      { label: 'What is a digital signage CMS?', href: '#what-is-a-digital-signage-cms' },
      { label: 'The complete system at a glance', href: '#the-complete-system-at-a-glance' },
      { label: 'Designing the frontend', href: '#designing-the-frontend' },
      { label: 'Designing the backend', href: '#designing-the-backend' },
    ],
  },
  {
    number: '02',
    title: 'Devices and content',
    items: [
      { label: 'Device pairing', href: '#device-pairing' },
      { label: 'Content delivery', href: '#content-delivery' },
      { label: 'Scheduling', href: '#scheduling' },
      { label: 'Media validation', href: '#media-validation' },
    ],
  },
  {
    number: '03',
    title: 'Runtime and reliability',
    items: [
      { label: 'The player runtime', href: '#the-player-runtime' },
      { label: 'Offline playback', href: '#offline-playback' },
      { label: 'Recovery', href: '#recovery' },
      { label: 'Telemetry', href: '#telemetry' },
      { label: 'Remote commands', href: '#remote-commands' },
    ],
  },
  {
    number: '04',
    title: 'Platforms and security',
    items: [
      { label: 'Supporting multiple platforms', href: '#supporting-multiple-platforms' },
      { label: 'Security', href: '#security' },
      { label: 'Common mistakes', href: '#common-mistakes' },
    ],
  },
  {
    number: '05',
    title: 'Build strategy',
    items: [
      { label: 'Build, buy or use infrastructure?', href: '#build-buy-or-use-infrastructure' },
      { label: 'Where TomorrowOS fits', href: '#where-tomorrowos-fits' },
      { label: 'Building with AI-assisted tools', href: '#building-with-ai-assisted-development-tools' },
      { label: 'A practical build sequence', href: '#a-practical-build-sequence' },
      { label: 'Pre-launch checklist', href: '#pre-launch-checklist' },
    ],
  },
];

/** Formats an ISO date as e.g. "3 August 2026" for visible metadata. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export default function BuildDigitalSignageCms() {
  usePageSeo(CMS_ARTICLE.path);
  const canonical = absoluteUrl(CMS_ARTICLE.path);
  const record = BLOG_ARTICLES.find((a) => a.href === CMS_ARTICLE.path);

  return (
    <>
      <JsonLd
        id="article"
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: CMS_ARTICLE.headline,
          description: CMS_ARTICLE.description,
          url: canonical,
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          datePublished: CMS_ARTICLE.datePublished,
          dateModified: CMS_ARTICLE.dateModified,
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
            { '@type': 'ListItem', position: 3, name: CMS_ARTICLE.headline, item: canonical },
          ],
        }}
      />
      <JsonLd
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: CMS_ARTICLE_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />

      <EditorialArticleLayout
        layoutMode={record?.layoutMode ?? 'document-with-rail'}
        category="Building Digital Signage"
        title="How to Build a Digital Signage CMS"
        subtitle="A practical architecture guide covering everything required to build reliable digital signage software — from the dashboard down to device pairing, content delivery, offline playback and multi-platform runtimes."
        byline={
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">By {CMS_ARTICLE.author}</span>
            {' · '}
            {CMS_ARTICLE.authorRole}
          </p>
        }
        metaItems={[
          { label: 'Document owner', value: 'TomorrowOS' },
          { label: 'Published', value: formatDate(CMS_ARTICLE.datePublished) },
          { label: 'Last reviewed', value: formatDate(CMS_ARTICLE.dateModified) },
          { label: 'Reading time', value: `${CMS_ARTICLE.readingTimeMinutes} minutes` },
        ]}
        canonicalUrl={canonical}
        tocGroups={TOC_GROUPS}
      >
        {/* 3. Direct introductory answer */}
        <section className="flex flex-col gap-4" aria-label="Introduction">
          <Lead>Building a digital signage content management system looks deceptively simple.</Lead>
          <P>Upload an image. Create a playlist. Connect a screen. Press publish.</P>
          <P>That may be enough for a prototype. It is not enough for a dependable product.</P>
          <P>
            A production digital signage CMS is a distributed software system responsible for
            coordinating users, media, schedules, devices, networks, playback and recovery
            across remote hardware. Screens may be installed thousands of kilometres away,
            operate without staff nearby, lose internet access unexpectedly and run on several
            different operating systems.
          </P>
          <P>
            A useful CMS therefore has to do much more than manage content. It must keep screens
            operating when infrastructure fails.
          </P>
          <P>
            This guide explains the major systems required to build one, how those systems fit
            together, which decisions become difficult at scale and where open-source
            infrastructure such as TomorrowOS can reduce the amount of platform-specific work
            your team needs to own.
          </P>
        </section>

        {/* 6. Full article sections */}
        <SectionsFoundation />
        <SectionsRuntime />
        <SectionsStrategy />

        {/* Next steps (closing editorial section from the supplied copy). */}
        <section className="flex flex-col gap-4">
          <SectionHeading id="next-steps">Next steps</SectionHeading>
          <P>
            A successful digital signage CMS is not defined by how quickly a playlist editor can
            be built.
          </P>
          <P>It is defined by whether remote screens:</P>
          <UL>
            <li>receive the right content;</li>
            <li>keep playing when networks fail;</li>
            <li>recover after interruptions;</li>
            <li>report useful health information;</li>
            <li>behave predictably across supported platforms.</li>
          </UL>
          <P>The most valuable engineering work usually sits beneath the interface.</P>
          <P>
            TomorrowOS provides an open-source infrastructure layer for teams that want to build
            and own their product without independently recreating every common server-to-screen
            capability.
          </P>
          <P>Continue with:</P>
          <UL>
            <li>
              <IntLink href="/start">Start Building</IntLink> — begin a new TomorrowOS project.
            </li>
            <li>
              <ExtLink href={siteConfig.links.docs}>Documentation</ExtLink> — review
              implementation and API guidance.
            </li>
            <li>
              <ExtLink href={siteConfig.links.github}>GitHub</ExtLink> — explore the source and
              contribute.
            </li>
            <li>
              <IntLink href="/guides/platforms/samsung-tizen">Samsung Tizen guide</IntLink> —
              install the TomorrowOS player on Samsung Tizen displays.
            </li>
          </UL>
        </section>

        {/* 7. FAQ */}
        <section className="flex flex-col gap-6" aria-labelledby="faq">
          <SectionHeading id="faq">Frequently asked questions</SectionHeading>
          <ArticleFAQ items={CMS_ARTICLE_FAQ} />
        </section>

        {/* 8. Related resources */}
        <section aria-labelledby="related" className="flex flex-col gap-4">
          <SectionHeading id="related">Related resources</SectionHeading>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                label: 'Samsung Tizen guide',
                href: '/guides/platforms/samsung-tizen',
                desc: 'Install the TomorrowOS player on Samsung Tizen displays.',
              },
              {
                label: 'Documentation',
                href: siteConfig.links.docs,
                desc: 'Implementation and API guidance.',
                external: true,
              },
              {
                label: 'GitHub',
                href: siteConfig.links.github,
                desc: 'Source code, issues and discussions.',
                external: true,
              },
              {
                label: 'Start Building',
                href: '/start',
                desc: 'Begin a new TomorrowOS project or connect an existing one.',
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
