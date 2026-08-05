import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { siteConfig } from '@/config/site';
import { CMS_ARTICLE, CMS_ARTICLE_FAQ, BLOG_AUTHOR } from '@/lib/cmsArticleMeta';
import { ArticleAuthorBox } from '@/components/blog/ArticleAuthorBox';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SectionHeading, P, Lead, UL, IntLink, ExtLink } from '@/components/blog/articlePrimitives';
import {
  ArticleTableOfContents,
  type ArticleTocGroup,
} from '@/components/blog/ArticleTableOfContents';
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

const PrimaryA =
  'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const SecondaryA =
  'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

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

  return (
    <div className="w-full">
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

      {/* 1. Breadcrumbs */}
      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[880px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>How to Build a Digital Signage CMS</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <article className="mx-auto flex max-w-[880px] flex-col gap-12 px-4 py-10 md:px-8 md:py-14">
        {/* 2. Article hero */}
        <header className="flex flex-col gap-5">
          <span className="inline-flex h-6 w-fit items-center rounded-full border border-border bg-muted px-2.5 text-xs font-medium text-foreground">
            Building Digital Signage
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            How to Build a Digital Signage CMS
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A practical architecture guide covering everything required to build reliable
            digital signage software — from the dashboard down to device pairing, content
            delivery, offline playback and multi-platform runtimes.
          </p>
          {/* 4. Article metadata */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">By {CMS_ARTICLE.author}</span>
              {' · '}
              {CMS_ARTICLE.authorRole}
            </p>
            <p>
              {CMS_ARTICLE.readingTimeMinutes} min read{' · '}
              <time dateTime={CMS_ARTICLE.datePublished}>
                {formatDate(CMS_ARTICLE.datePublished)}
              </time>
            </p>
            <p>
              Last technically reviewed{' '}
              <time dateTime={CMS_ARTICLE.dateModified}>
                {formatDate(CMS_ARTICLE.dateModified)}
              </time>
            </p>
          </div>
        </header>

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

        {/* 5. Table of contents — grouped editorial navigation. */}
        <ArticleTableOfContents mode="grouped" groups={TOC_GROUPS} />

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

        {/* 9. Closing CTA */}
        <section aria-labelledby="closing-cta" className="flex flex-col gap-4">
          <SectionHeading id="closing-cta">
            Start building your digital signage product
          </SectionHeading>
          <P>
            TomorrowOS provides reusable open-source infrastructure — device communication,
            content delivery, offline playback and platform adapters — while you own the
            product, the workflow and the customer experience.
          </P>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/start" className={PrimaryA}>
              Start building
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={SecondaryA}
            >
              Read the documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <ExtLink href={siteConfig.links.github}>Explore GitHub</ExtLink>
          </div>
        </section>
      </article>
    </div>
  );
}
