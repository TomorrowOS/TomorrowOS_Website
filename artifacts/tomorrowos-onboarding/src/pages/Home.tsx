import React, { useEffect } from 'react';
import { Link } from 'wouter';
import GithubIcon from '@/components/GithubIcon';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import StartYourWayDiagram from '@/components/StartYourWayDiagram';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { ChevronRight } from 'lucide-react';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';

export default function Home() {
  const { state } = usePrototype();
  useSeo({
    title: 'Open-Source Digital Signage Foundation',
    description: 'Build your own CMS, add screen management to an existing application or create an entirely new digital signage product.'
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
  const showDocs = state.prototypeReviewMode || hasDocs;

  return (
    <div className="flex flex-col animate-in fade-in duration-500 pb-24">
      {/* HERO SECTION */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-16 px-4 md:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
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
          <Link href="/start" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8 w-full sm:w-auto">
            Get started
          </Link>
          <a href="#start-new" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full sm:w-auto">
            Explore TomorrowOS
          </a>
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
              <div id="api" className="flex flex-wrap gap-4 mt-3 scroll-mt-24">
                <Link href="/connect/server-sdk" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                  Server SDK <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/connect/api" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                  API Integration <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div id="guided" className="py-6 border-b border-border scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Start simple</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use a Node.js capable development platform such as Replit to build a digital signage CMS, connect a screen and publish content in minutes.
              </p>
              <div id="terminal" className="flex flex-wrap gap-4 mt-3 scroll-mt-24">
                <Link href="/start/guided" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                  Guided Setup <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/start/terminal" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                  Terminal <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div id="server-sdk" className="py-6 border-b border-border scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Develop with the SDK</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use the Server SDK, APIs, runtime and CLI to build the full product.
              </p>
              <div className="mt-3">
                <Link href="/connect/server-sdk" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                  Explore the Server SDK <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div id="platforms" className="py-6 scroll-mt-24">
              <h3 className="text-xl font-bold mb-2">Deploy on cloud platforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Run your TomorrowOS server on infrastructure that supports persistent processes and WebSocket connections.
              </p>
              
              <div className="bg-muted/30 border border-border rounded-xl px-6 py-7 flex items-center justify-between gap-4">
                <img src={`${import.meta.env.BASE_URL}assets/platforms/railway-logo.svg`} alt="Railway" className="h-8 w-auto shrink-0 opacity-80 mix-blend-multiply dark:mix-blend-normal dark:invert" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/render-logo.svg`} alt="Render" className="h-7 w-auto max-w-[26%] object-contain opacity-80 mix-blend-multiply dark:mix-blend-normal dark:invert" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/flyio-logo.svg`} alt="Fly.io" className="h-8 w-auto max-w-[24%] object-contain opacity-80 mix-blend-multiply dark:mix-blend-normal dark:invert" />
                <img src={`${import.meta.env.BASE_URL}assets/platforms/northflank-logo.svg`} alt="Northflank" className="h-7 w-auto max-w-[28%] object-contain opacity-80 mix-blend-multiply dark:mix-blend-normal dark:invert" />
              </div>
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
            <div className="bg-[#f2f2f2] rounded-2xl mb-6 overflow-hidden flex items-center justify-center pt-8 pb-0 px-6 aspect-[4/3]">
              <img 
                src={`${import.meta.env.BASE_URL}assets/illustrations/owned.png`}
                alt="3D illustration of a dashboard showing ownership of the product"
                loading="lazy"
                className="w-full h-auto object-cover object-top"
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
                src={`${import.meta.env.BASE_URL}assets/illustrations/portable.png`}
                alt="3D illustration of a cloud platform showing infrastructure portability"
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
                src={`${import.meta.env.BASE_URL}assets/illustrations/support.png`}
                alt="3D illustration of screens and media players showing multi-platform support"
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
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">USE CASES</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start from a working pattern.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Start with a proven structure, then shape it around your product.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-12">
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
      <section className="py-24 px-4 md:px-8 text-center max-w-3xl mx-auto flex flex-col items-center">
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
    <div className="bg-background border border-border rounded-xl p-5 shadow-sm hover:border-foreground/20 transition-colors">
      <img src={`${import.meta.env.BASE_URL}assets/icons/black/${icon}`} alt="" className="w-6 h-6 opacity-90 mb-5" />
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
