import React, { useEffect } from 'react';
import { Link } from 'wouter';
import GithubIcon from '@/components/GithubIcon';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import StartYourWayDiagram from '@/components/StartYourWayDiagram';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { thirdPartyTrademarkContent } from '@/content/legal';
import { ChevronRight } from 'lucide-react';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';

/**
 * Homepage pathway link: plain text-link appearance at rest with a larger,
 * visually transparent click target. Subtle hover/pressed backgrounds and a
 * keyboard-only focus ring; chevron nudges 2px on hover (disabled for
 * reduced-motion users).
 */
function PathwayLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-black/[0.035] active:bg-black/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      <span>{label}</span>
      <ChevronRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </Link>
  );
}

function PathwaySeparator() {
  return (
    <span aria-hidden="true" className="select-none text-[13px] text-muted-foreground/70">
      or
    </span>
  );
}

export default function Home() {
  const { state } = usePrototype();
  useSeo({
    title: 'Open-Source Digital Signage Foundation',
    description: 'Build your own CMS, add screen management to an existing application or create an entirely new digital signage product.',
    canonicalPath: '/',
  });

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // Allow layout (lazy sections/images with reserved space) to settle first.
    const t = window.setTimeout(scrollToHash, 50);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  const hasGithub = siteConfig.links.github && !siteConfig.links.github.includes('{{');
  const showGithub = state.prototypeReviewMode || hasGithub;

  const hasDocs = siteConfig.links.docs && !siteConfig.links.docs.includes('{{');

  return (
    <div className="flex flex-col animate-in fade-in duration-500 pb-10 md:pb-24">
      <JsonLd
        id="organization"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TomorrowOS',
          url: absoluteUrl('/'),
          logo: absoluteUrl('/assets/brand/tomorrowos-logo.svg'),
          sameAs: [siteConfig.links.github],
        }}
      />
      <JsonLd
        id="software-application"
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'TomorrowOS',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web, Samsung Tizen, LG webOS, Android, BrightSign, Windows',
          description: 'Open-source digital signage foundation. Build your own CMS on shared device, playback and platform infrastructure.',
          url: absoluteUrl('/'),
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      {/* HERO SECTION */}
      <section className="pt-16 pb-6 md:pt-32 md:pb-16 px-4 md:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 max-w-4xl">
          Build and own your digital signage software.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl leading-relaxed">
          Build your own CMS, add screen management to an existing application or create an entirely new digital signage product.
        </p>
        <p className="text-lg text-muted-foreground mb-10">
          Open source, self-hosted and free to build on your own infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/start" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8 w-full sm:w-auto">
            Get started
          </Link>
          {showGithub && (
            <a
              href={hasGithub ? siteConfig.links.github : '#'}
              onClick={(e) => !hasGithub && e.preventDefault()}
              target={hasGithub ? '_blank' : undefined}
              rel={hasGithub ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background h-11 px-8 w-full sm:w-auto"
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              {hasGithub ? 'View on GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View on GitHub" />}
            </a>
          )}
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM SECTION */}
      <ArchitectureSection />

      {/* START YOUR WAY SECTION */}
      <section id="start-new" className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full scroll-mt-24">
        <div className="flex flex-col items-center text-center mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start your way.</h2>
            <p className="text-lg text-muted-foreground">
              Whether you build with AI-assisted tools or write against the SDK directly, you start from the same foundation.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 shrink-0">
            {/* View the docs: routes to an internal placeholder until the docs URL is configured. */}
            {hasDocs ? (
              <a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium border border-foreground/80 bg-background hover:bg-accent hover:text-accent-foreground h-12 px-7">
                View the docs
              </a>
            ) : (
              <Link href="/docs" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium border border-foreground/80 bg-background hover:bg-accent hover:text-accent-foreground h-12 px-7">
                {state.prototypeReviewMode ? <PlaceholderText value="PLACEHOLDER_DOCS_URL" fallback="View the docs" /> : 'View the docs'}
              </Link>
            )}
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap text-base font-medium text-foreground hover:opacity-70 h-12">
              <GithubIcon className="w-5 h-5 mr-2" />View GitHub <ChevronRight className="w-5 h-5 ml-1.5" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Diagram */}
          <div className="flex items-start justify-center">
             <StartYourWayDiagram />
          </div>

          {/* Right Content Rows */}
          <div className="flex flex-col">
            <div id="connect-existing" className="py-6 border-b border-border scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Connect your product</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Add digital signage to any existing CMS, SaaS platform, dashboard or enterprise application.
              </p>
              <div id="api" className="mt-1.5 -mx-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 scroll-mt-24">
                <PathwayLink href="/connect/server-sdk" label="Server SDK" />
                <PathwaySeparator />
                <PathwayLink href="/connect/api" label="API Integration" />
              </div>
            </div>
            
            <div id="guided" className="py-6 border-b border-border scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Start simple</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use a Node.js capable development platform such as Replit to build a digital signage CMS, connect a screen and publish content in minutes.
              </p>
              <div id="terminal" className="mt-1.5 -mx-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 scroll-mt-24">
                <PathwayLink href="/start/guided" label="Guided Setup" />
                <PathwaySeparator />
                <PathwayLink href="/start/terminal" label="Terminal" />
              </div>
            </div>
            
            <div id="server-sdk" className="py-6 border-b border-border scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Develop with the SDK</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use the Server SDK, APIs, runtime and CLI to build the full product.
              </p>
              <div className="mt-1.5 -mx-2">
                <PathwayLink href="/connect/server-sdk" label="Explore the Server SDK" />
              </div>
            </div>
            
            <div id="platforms" className="py-6 scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Deploy on cloud platforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Run your TomorrowOS server on infrastructure that supports persistent processes and WebSocket connections.
              </p>
              
              <div className="bg-muted/30 border border-border rounded-xl px-6 py-7 flex items-center justify-between gap-4">
                <img src={`${import.meta.env.BASE_URL}assets/platforms/railway-logo.svg`} alt="Railway" className="h-8 w-auto shrink-0 opacity-80 mix-blend-multiply" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/render-logo.svg`} alt="Render" className="h-7 w-auto max-w-[26%] object-contain opacity-80 mix-blend-multiply" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/flyio-logo.svg`} alt="Fly.io" className="h-8 w-auto max-w-[24%] object-contain opacity-80 mix-blend-multiply" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/northflank-logo.svg`} alt="Northflank" className="h-7 w-auto max-w-[28%] object-contain opacity-80 mix-blend-multiply" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground/80">
                {thirdPartyTrademarkContent.platformNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT TO BE OWNED SECTION */}
      <section id="ownership" className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Built to be owned</h2>
          <p className="text-lg text-muted-foreground">
            Own your product, choose your infrastructure and build without platform lock-in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="bg-[#f2f2f2] rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-6 aspect-[4/3]">
              <img 
                src={`${import.meta.env.BASE_URL}assets/illustrations/owned.webp`}
                alt="3D illustration of a dashboard showing ownership of the product"
                width={835}
                height={576}
                loading="lazy"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">OWNED</div>
            <h3 className="text-xl font-bold mb-3">Own your product</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Your frontend, workflows, users, data and commercial model remain yours.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="bg-[#f2f2f2] rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-6 aspect-[4/3]">
              <img 
                src={`${import.meta.env.BASE_URL}assets/illustrations/portable.webp`}
                alt="3D illustration of a cloud platform showing infrastructure portability"
                width={835}
                height={576}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">PORTABLE</div>
            <h3 className="text-xl font-bold mb-3">Choose your infrastructure</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Self-host locally, deploy privately or run it in the cloud environment you choose.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="bg-[#f2f2f2] rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-6 aspect-[4/3]">
              <img 
                src={`${import.meta.env.BASE_URL}assets/illustrations/support.webp`}
                alt="3D illustration of screens and media players showing multi-platform support"
                width={1600}
                height={1157}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">YOURS</div>
            <h3 className="text-xl font-bold mb-3">Support multiple platforms</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Build against one shared layer across supported screen hardware.
            </p>
          </div>
        </div>
      </section>

      {/* PATTERNS SECTION */}
      <section id="patterns" className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full bg-muted/30 border-y border-border scroll-mt-24">
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start from a working pattern.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Start with a proven structure, then shape it around your product.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel with next-card peek. sm+: grid. */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-2 scrollbar-none sm:grid sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 sm:pb-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-5 mb-10 md:mb-12">
          <PatternCard 
            title="Digital menu boards"
            desc="Pricing, promos and scheduling across one or more screens."
            icon="restaurant.svg"
          />
          <PatternCard 
            title="Directory boards"
            desc="Structured data, layouts and navigation for buildings or campuses."
            icon="grid_view.svg"
          />
          <PatternCard 
            title="Retail media networks"
            desc="Campaigns, inventory, playback and proof-of-play foundations."
            icon="volume_down.svg"
          />
          <PatternCard 
            title="Internal communications"
            desc="News, dashboards and operational content across managed screens."
            icon="chat.svg"
          />
          <PatternCard 
            title="Custom signage products"
            desc="Your frontend and workflows on top of the shared TomorrowOS layer."
            icon="deployed_code.svg"
          />
        </div>

        <div className="flex justify-center">
          <a
            href={siteConfig.links.knowledgeBase}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Knowledge Base <ChevronRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="pt-16 pb-8 md:py-24 px-4 md:px-8 text-center max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Build the signage product only you can build.
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          TomorrowOS provides the shared screen layer underneath. You keep control of everything that makes your product different.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/start" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8 w-full sm:w-auto">
            Get started
          </Link>
          {showGithub && (
            <a href={hasGithub ? siteConfig.links.github : '#'} onClick={(e) => !hasGithub && e.preventDefault()} target={hasGithub ? "_blank" : undefined} rel={hasGithub ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full sm:w-auto">
              <GithubIcon className="w-4 h-4 mr-2" />{hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" />}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function PatternCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="bg-background border border-border rounded-xl p-5 shadow-sm hover:border-foreground/20 transition-colors shrink-0 w-[70vw] max-w-[260px] snap-start sm:shrink sm:w-auto sm:max-w-none sm:snap-align-none">
      <img src={`${import.meta.env.BASE_URL}assets/icons/black/${icon}`} alt="" className="w-6 h-6 opacity-90 mb-5" />
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
