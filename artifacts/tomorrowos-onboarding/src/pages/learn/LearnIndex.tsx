import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { siteConfig } from '@/config/site';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ResourceSection } from '@/components/learn/ResourceSection';
import { LearningPathCard } from '@/components/learn/LearningPathCard';
import { learningPaths, resourcesByCategory } from '@/lib/learnResources';

/**
 * TomorrowOS Learn — Developer Resource Centre homepage (Phase B).
 *
 * All content derives from src/lib/learnResources.ts (single source of
 * truth). The page stays noindex (seoConfig `indexable: false`), out of the
 * sitemap, and is exposed only via a single footer link. No runtime state,
 * no data fetching, no localStorage.
 */
export default function LearnIndex() {
  usePageSeo('/learn');

  return (
    <div className="w-full">
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Learn', item: absoluteUrl('/learn') },
          ],
        }}
      />

      {/* Breadcrumbs */}
      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Learn</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section id="hero" aria-labelledby="learn-hero-heading" className="w-full px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <h1 id="learn-hero-heading" className="mb-4 max-w-[760px] text-4xl font-bold tracking-tight text-foreground md:text-[3.25rem] md:leading-[1.1]">
            Developer Resource Centre
          </h1>
          <p className="mb-4 text-lg font-medium text-foreground md:text-xl">
            Everything you need to build digital signage software.
          </p>
          <p className="mb-8 max-w-[680px] leading-relaxed text-muted-foreground">
            This resource centre helps developers understand how to build a new
            CMS, connect an existing product, work with supported platforms and
            learn the architecture underneath reliable signage software.
            Implementation details live in the TomorrowOS documentation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#start-here"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start exploring
            </a>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section id="learning-paths" aria-labelledby="learning-paths-heading" className="scroll-mt-24 w-full border-y border-border/50 bg-[#fcfcfc] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="learning-paths-heading" className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Choose your path
          </h2>
          <p className="mb-8 max-w-[640px] text-muted-foreground">
            Pick the path that matches what you are trying to build.
          </p>
          <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <li key={path.id} className="h-full">
                <LearningPathCard path={path} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ResourceSection
        id="start-here"
        heading="Start here"
        intro="Three foundational concepts for building with TomorrowOS. The full Learn guides are in development — each card links to the most useful material available today."
        resources={resourcesByCategory('start-here')}
        emphasis
      />

      <ResourceSection
        id="architecture"
        heading="Architecture"
        intro="The underlying systems required for reliable digital signage software."
        resources={resourcesByCategory('architecture')}
      />

      <ResourceSection
        id="platforms"
        heading="Platforms"
        intro="The screen platforms TomorrowOS currently supports, validates or plans to support."
        resources={resourcesByCategory('platforms')}
      />

      <ResourceSection
        id="ai-development"
        heading="AI development"
        intro="Use modern AI development tools alongside TomorrowOS."
        resources={resourcesByCategory('ai-development')}
      />

      <ResourceSection
        id="engineering"
        heading="Engineering"
        intro="Engineering topics involved in operating signage reliably."
        resources={resourcesByCategory('engineering')}
      />

      <ResourceSection
        id="evidence"
        heading="Evidence"
        intro="Transparent compatibility, testing and validation information."
        resources={resourcesByCategory('evidence')}
      />

      {/* Closing CTA */}
      <section id="ready-to-build" aria-labelledby="ready-to-build-heading" className="w-full border-t border-border/50 bg-[#fcfcfc] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6">
          <h2 id="ready-to-build-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Ready to build?
          </h2>
          <p className="max-w-[560px] text-muted-foreground">
            Move from learning into implementation with the guided setup, the
            documentation and the source code.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/start"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start building
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Read the documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Explore GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
