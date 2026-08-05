/**
 * Cornerstone article: /modern-digital-signage-architecture
 *
 * Root-level pillar page (NOT under /journal). Copy is rendered verbatim
 * from the approved editorial source; do not reword without editorial
 * sign-off.
 *
 * Reuses the shared TomorrowOS Journal editorial template — no new article
 * design system, dependencies or fonts.
 *
 * Metadata + FAQ live in the shared module src/lib/archArticleMeta.ts
 * (also imported by vite.config.ts for prerendered JSON-LD), so structured
 * data cannot drift from the visible page content.
 *
 * Editorial note: this article is authored by the organisation (TomorrowOS),
 * per the approved source package — no personal byline.
 */
import { ARCH_ARTICLE, ARCH_ARTICLE_FAQ } from '@/lib/archArticleMeta';
import { CMS_ARTICLE } from '@/lib/cmsArticleMeta';
import { DOOH_ARTICLE } from '@/lib/doohArticleMeta';
import { BLOG_ARTICLES } from '@/lib/blogArticles';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seoConfig';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading, P, Lead, UL, IntLink, ExtLink } from '@/components/blog/articlePrimitives';
import { type ArticleTocGroup } from '@/components/blog/ArticleTableOfContents';
import { ArticleFAQ } from '@/components/blog/ArticleFAQ';
import { EditorialArticleLayout } from '@/components/blog/EditorialArticleLayout';
import { EditorialClosingCta } from '@/components/blog/EditorialClosingCta';
import { ArchSectionsModel } from '@/pages/arch-article/SectionsModel';
import { ArchSectionsEdge } from '@/pages/arch-article/SectionsEdge';
import { ArchSectionsStrategy } from '@/pages/arch-article/SectionsStrategy';

/**
 * Hand-curated chapter groups for the rail contents mode (approved major
 * sections only — deliberately not every heading). All section anchor IDs
 * remain on their headings, so direct links to unlisted sections keep working.
 */
const TOC_GROUPS: ArticleTocGroup[] = [
  {
    number: '01',
    title: 'Architecture model',
    items: [
      { label: 'What modern digital signage architecture looks like', href: '#what-modern-digital-signage-architecture-looks-like' },
      { label: 'The five architectural layers', href: '#the-five-architectural-layers' },
      { label: 'The product layer', href: '#the-product-layer' },
      { label: 'The control plane', href: '#the-control-plane' },
      { label: 'The content plane', href: '#the-content-plane' },
    ],
  },
  {
    number: '02',
    title: 'Edge and delivery',
    items: [
      { label: 'The edge runtime', href: '#the-edge-runtime' },
      { label: 'Server versus player responsibility', href: '#server-versus-player-responsibility' },
      { label: 'Local state', href: '#local-state' },
      { label: 'Content delivery and activation', href: '#content-delivery-and-activation' },
      { label: 'Offline playback and reconnection', href: '#offline-playback-and-reconnection' },
    ],
  },
  {
    number: '03',
    title: 'Device operations',
    items: [
      { label: 'Device pairing and trust', href: '#device-pairing-and-trust' },
      { label: 'Commands and telemetry', href: '#commands-and-telemetry' },
      { label: 'Command delivery semantics', href: '#command-delivery-semantics' },
      { label: 'Platform adapters', href: '#platform-adapters' },
    ],
  },
  {
    number: '04',
    title: 'Deployment and resilience',
    items: [
      { label: 'Multi-tenant architecture', href: '#multi-tenant-architecture' },
      { label: 'Cloud, self-hosted and hybrid deployment', href: '#cloud-self-hosted-and-hybrid-deployment' },
      { label: 'Headless digital signage', href: '#headless-digital-signage-architecture' },
      { label: 'Monolith versus services', href: '#monolith-versus-services' },
      { label: 'Failure and recovery', href: '#failure-and-recovery-architecture' },
      { label: 'Security boundaries', href: '#security-boundaries' },
    ],
  },
  {
    number: '05',
    title: 'Build strategy',
    items: [
      { label: 'Observability and operational states', href: '#observability-and-operational-states' },
      { label: 'Common architecture mistakes', href: '#common-architecture-mistakes' },
      { label: 'Where TomorrowOS fits', href: '#where-tomorrowos-fits' },
      { label: 'Architecture checklist', href: '#architecture-checklist' },
      { label: 'Frequently asked questions', href: '#faq' },
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

export default function ModernDigitalSignageArchitecture() {
  usePageSeo(ARCH_ARTICLE.path);
  const record = BLOG_ARTICLES.find((a) => a.href === ARCH_ARTICLE.path);

  return (
    <>
      <JsonLd
        id="article"
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: ARCH_ARTICLE.headline,
          description: ARCH_ARTICLE.description,
          url: absoluteUrl(ARCH_ARTICLE.path),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(ARCH_ARTICLE.path) },
          datePublished: ARCH_ARTICLE.datePublished,
          dateModified: ARCH_ARTICLE.dateModified,
          author: { '@type': 'Organization', name: ARCH_ARTICLE.authorName, url: absoluteUrl('/') },
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
            { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('/journal') },
            {
              '@type': 'ListItem',
              position: 3,
              name: ARCH_ARTICLE.headline,
              item: absoluteUrl(ARCH_ARTICLE.path),
            },
          ],
        }}
      />
      <JsonLd
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ARCH_ARTICLE_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <EditorialArticleLayout
        layoutMode={record?.layoutMode ?? 'document-with-rail'}
        category="Architecture"
        title={ARCH_ARTICLE.headline}
        subtitle="A practical guide to the product, server, content, runtime and platform layers behind reliable digital signage software."
        metaItems={[
          { label: 'Document owner', value: 'TomorrowOS' },
          { label: 'Published', value: formatDate(ARCH_ARTICLE.datePublished) },
          { label: 'Last reviewed', value: formatDate(ARCH_ARTICLE.dateModified) },
          { label: 'Reading time', value: `${ARCH_ARTICLE.readingTimeMinutes} minutes` },
        ]}
        canonicalUrl={absoluteUrl(ARCH_ARTICLE.path)}
        tocGroups={TOC_GROUPS}
      >
        {/* Direct answer + introductory copy */}
        <section className="flex flex-col gap-4" aria-label="Introduction">
          <div className="flex flex-col gap-1.5 border-l-2 border-foreground/70 bg-[#eef2f6] py-3 pl-4 pr-4 md:pl-5 print:bg-white">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Modern digital signage architecture separates the customer-facing product from
              the control plane, content delivery services, on-device runtime and
              platform-specific adapters. The server defines intent; the player stores state,
              applies policy, plays content and recovers locally when connectivity fails.
            </p>
          </div>
          <Lead>
            Digital signage software is often described as a content management system. That
            description is useful, but incomplete.
          </Lead>
          <P>
            A dependable signage product is a distributed system. It coordinates users, media,
            schedules, commands and device state across remote screens that may be running
            different operating systems, different firmware and different playback engines.
          </P>
          <P>
            The most important architectural decision is not which frontend framework to use.
            It is deciding where each responsibility belongs.
          </P>
          <P>
            If the server owns too much, screens become dependent on a permanent connection. If
            the player owns too much, central management becomes inconsistent. If
            platform-specific behaviour leaks into the product layer, every new operating
            system multiplies the complexity of the entire application.
          </P>
          <P>
            This guide presents a practical architecture for modern digital signage: five clear
            layers, explicit server and edge responsibilities, reliable content delivery,
            offline operation, telemetry, security and a platform-adapter model that can grow
            over time.
          </P>
        </section>

        {/* Full article sections */}
        <ArchSectionsModel />
        <ArchSectionsEdge />
        <ArchSectionsStrategy />

        {/* FAQ */}
        <section className="flex flex-col gap-6" aria-labelledby="faq">
          <SectionHeading number="27" id="faq">Frequently asked questions</SectionHeading>
          <ArticleFAQ items={ARCH_ARTICLE_FAQ} />
        </section>

        {/* Next steps */}
        <section className="flex flex-col gap-4" aria-labelledby="next-steps">
          <SectionHeading number="28" id="next-steps">Next steps</SectionHeading>
          <P>
            Modern digital signage architecture works best when each layer has one clear
            responsibility.
          </P>
          <P>
            The product should own the customer experience. The control plane should coordinate
            desired and reported state. The content plane should version and deliver assets.
            The runtime should keep playback operating locally. Platform adapters should
            contain operating-system differences.
          </P>
          <P>
            TomorrowOS provides an open-source foundation for teams that want to build and own
            the product layer without independently recreating every common server-to-screen
            capability.
          </P>
          <UL>
            <li>
              <IntLink href="/start">Start Building</IntLink> — begin a new TomorrowOS project.
            </li>
            <li>
              <ExtLink href={siteConfig.links.docs}>Documentation</ExtLink> — review current
              SDK, API and implementation guidance.
            </li>
            <li>
              <ExtLink href={siteConfig.links.github}>GitHub</ExtLink> — explore source code,
              releases and discussions.
            </li>
            <li>
              <IntLink href={CMS_ARTICLE.path}>How to Build a Digital Signage CMS</IntLink> —
              review the complete product and runtime build guide.
            </li>
            <li>
              <IntLink href={DOOH_ARTICLE.path}>How to Start a DOOH Network</IntLink> —
              understand the commercial and operating systems around an advertising network.
            </li>
          </UL>
        </section>

        <EditorialClosingCta />
      </EditorialArticleLayout>
    </>
  );
}
