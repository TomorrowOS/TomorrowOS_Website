/**
 * Cornerstone article: /build-vs-buy-digital-signage-cms
 *
 * Root-level pillar page (NOT under /journal). Copy is rendered verbatim
 * from the approved editorial source; do not reword without editorial
 * sign-off. Founder-voice recommendations (Dylan Holtzhausen) are
 * deliberate and must not be converted into universal factual statements.
 *
 * Reuses the shared TomorrowOS Journal editorial template — no new article
 * design system, dependencies or fonts.
 *
 * Metadata + FAQ live in the shared module src/lib/buyArticleMeta.ts
 * (also imported by vite.config.ts for prerendered JSON-LD), so structured
 * data cannot drift from the visible page content.
 */
import { BUY_ARTICLE, BUY_ARTICLE_FAQ } from '@/lib/buyArticleMeta';
import { CMS_ARTICLE, BLOG_AUTHOR } from '@/lib/cmsArticleMeta';
import { DOOH_ARTICLE } from '@/lib/doohArticleMeta';
import { ARCH_ARTICLE } from '@/lib/archArticleMeta';
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
import { BuySectionsDecision } from '@/pages/buy-article/SectionsDecision';
import { BuySectionsCost } from '@/pages/buy-article/SectionsCost';
import { BuySectionsFramework } from '@/pages/buy-article/SectionsFramework';

/**
 * Hand-curated chapter groups for the rail contents mode (approved major
 * sections only — deliberately not every heading). All section anchor IDs
 * remain on their headings, so direct links to unlisted sections keep working.
 */
const TOC_GROUPS: ArticleTocGroup[] = [
  {
    number: '01',
    title: 'The decision',
    items: [
      { label: 'The decision in one sentence', href: '#the-decision-in-one-sentence' },
      { label: 'What buying actually means', href: '#what-buying-actually-means' },
      { label: 'Why most organisations should buy', href: '#why-most-organisations-should-buy' },
      { label: 'What commercial vendors have solved', href: '#what-commercial-cms-vendors-have-already-solved' },
    ],
  },
  {
    number: '02',
    title: 'The cost of building',
    items: [
      { label: 'The real scope of building', href: '#the-real-scope-of-building' },
      { label: 'The real cost', href: '#the-real-cost-of-building' },
      { label: 'Hidden costs', href: '#the-hidden-costs-teams-underestimate' },
      { label: 'When building makes sense', href: '#when-building-makes-sense' },
      { label: 'When buying makes sense', href: '#when-buying-makes-sense' },
    ],
  },
  {
    number: '03',
    title: 'Alternative paths',
    items: [
      { label: 'Hybrid options', href: '#the-hybrid-options' },
      { label: 'How AI changed the equation', href: '#how-ai-has-changed-the-equation' },
      { label: 'Build, buy and hybrid comparison', href: '#build-buy-and-hybrid-comparison' },
    ],
  },
  {
    number: '04',
    title: 'Decision framework',
    items: [
      { label: 'Practical decision matrix', href: '#a-practical-decision-matrix' },
      { label: 'Twenty questions', href: '#twenty-questions-to-ask-before-deciding' },
      { label: 'Common decision mistakes', href: '#common-decision-mistakes' },
      { label: 'Recommended decision process', href: '#recommended-decision-process' },
    ],
  },
  {
    number: '05',
    title: 'TomorrowOS and next steps',
    items: [
      { label: 'Where TomorrowOS fits', href: '#where-tomorrowos-fits' },
      { label: 'Frequently asked questions', href: '#faq' },
      { label: 'Next steps', href: '#next-steps' },
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

export default function BuildVsBuyDigitalSignageCms() {
  usePageSeo(BUY_ARTICLE.path);
  const record = BLOG_ARTICLES.find((a) => a.href === BUY_ARTICLE.path);

  return (
    <>
      <JsonLd
        id="article"
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: BUY_ARTICLE.headline,
          description: BUY_ARTICLE.description,
          url: absoluteUrl(BUY_ARTICLE.path),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(BUY_ARTICLE.path) },
          datePublished: BUY_ARTICLE.datePublished,
          dateModified: BUY_ARTICLE.dateModified,
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
            { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('/journal') },
            {
              '@type': 'ListItem',
              position: 3,
              name: BUY_ARTICLE.headline,
              item: absoluteUrl(BUY_ARTICLE.path),
            },
          ],
        }}
      />
      <JsonLd
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: BUY_ARTICLE_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <EditorialArticleLayout
        layoutMode={record?.layoutMode ?? 'document-with-rail'}
        category="Strategy"
        title={BUY_ARTICLE.headline}
        subtitle="A practical guide to deciding whether to adopt an existing platform, build your own software or use shared infrastructure."
        byline={
          <>
            <span className="font-medium text-foreground">By {BLOG_AUTHOR.name}</span>
            {' · '}
            {BLOG_AUTHOR.role}
          </>
        }
        metaItems={[
          { label: 'Document owner', value: 'TomorrowOS' },
          { label: 'Published', value: formatDate(BUY_ARTICLE.datePublished) },
          { label: 'Last reviewed', value: formatDate(BUY_ARTICLE.dateModified) },
          { label: 'Reading time', value: `${BUY_ARTICLE.readingTimeMinutes} minutes` },
        ]}
        canonicalUrl={absoluteUrl(BUY_ARTICLE.path)}
        tocGroups={TOC_GROUPS}
      >
        {/* Direct answer + introductory copy */}
        <section className="flex flex-col gap-4" aria-label="Introduction">
          <div className="flex flex-col gap-1.5 border-l-2 border-foreground/70 bg-[#eef2f6] py-3 pl-4 pr-4 md:pl-5 print:bg-white">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-foreground">
              Direct answer
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Most organisations should buy an established digital signage CMS. Building
              becomes rational when signage is part of the product, a meaningful competitive
              advantage or a long-term platform strategy. A hybrid approach can make sense
              when a team wants to own the customer experience without rebuilding every
              server-to-screen capability.
            </p>
          </div>
          <Lead>
            Building a digital signage CMS can be an exciting idea. It can also become an
            expensive distraction.
          </Lead>
          <P>
            From the outside, the software can look straightforward: upload media, create
            playlists, schedule content and connect screens. That impression changes once the
            platform has to work reliably across remote hardware, unstable networks, different
            firmware, customer support requirements and years of product maintenance.
          </P>
          <P>
            I have spent much of my career around digital signage, menu boards, connected
            screens and the software that sits behind them. My strongest advice is simple: do
            not build because your team can. Build because owning the platform materially
            improves the business you are trying to create.
          </P>
          <P>
            For many organisations, buying an existing CMS is faster, cheaper and far less
            risky. Mature vendors have already invested in player software, offline playback,
            media handling, fleet management, updates, support tooling and the edge cases that
            only appear after devices have been operating in the field.
          </P>
          <P>
            Other organisations genuinely need to build. Their workflow may be unique. Their
            signage experience may be part of a broader SaaS product. They may be creating a
            DOOH network, retail media platform, restaurant technology product or OEM solution
            where the customer experience and device layer are central to the company&rsquo;s
            value.
          </P>
          <P>
            This guide is designed to help you decide which situation you are in. It explains
            the real cost of building, what commercial platforms already solve, how AI changes
            the development equation, where hybrid approaches fit and the questions I would
            ask before committing serious time and capital.
          </P>
        </section>

        {/* Full article sections */}
        <BuySectionsDecision />
        <BuySectionsCost />
        <BuySectionsFramework />

        {/* FAQ */}
        <section className="flex flex-col gap-6" aria-labelledby="faq">
          <SectionHeading number="18" id="faq">Frequently asked questions</SectionHeading>
          <ArticleFAQ items={BUY_ARTICLE_FAQ} />
        </section>

        {/* Next steps */}
        <section className="flex flex-col gap-4" aria-labelledby="next-steps">
          <SectionHeading number="19" id="next-steps">Next steps</SectionHeading>
          <P>
            The right decision is not the most technically ambitious option. It is the option
            that gives the business the outcome it needs with a level of cost and risk it can
            support.
          </P>
          <P>
            Buy when the requirement is conventional and the value comes from using signage.
            Build when the value comes from owning and differentiating the signage product.
            Use a hybrid approach when the product experience matters but rebuilding every
            infrastructure layer does not.
          </P>
          <UL>
            <li>
              <IntLink href={CMS_ARTICLE.path}>How to Build a Digital Signage CMS</IntLink> —
              understand the full product and runtime scope.
            </li>
            <li>
              <IntLink href={ARCH_ARTICLE.path}>Modern Digital Signage Architecture Explained</IntLink> —
              review where each system responsibility belongs.
            </li>
            <li>
              <IntLink href={DOOH_ARTICLE.path}>How to Start a DOOH Network</IntLink> —
              understand the commercial and operating layers around advertising screens.
            </li>
            <li>
              <IntLink href="/start">Start Building</IntLink> — begin a TomorrowOS project.
            </li>
            <li>
              <ExtLink href={siteConfig.links.docs}>Documentation</ExtLink> — review current
              implementation guidance.
            </li>
            <li>
              <ExtLink href={siteConfig.links.github}>GitHub</ExtLink> — explore source code,
              releases and discussions.
            </li>
          </UL>
        </section>

        <ArticleAuthorBox />
        <EditorialClosingCta />
      </EditorialArticleLayout>
    </>
  );
}
