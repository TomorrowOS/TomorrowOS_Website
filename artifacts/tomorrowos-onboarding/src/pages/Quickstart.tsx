import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Terminal, Monitor, Code, Settings, PenTool, Database, AppWindow } from 'lucide-react';
import { vercelConfig } from '@/lib/vercelConfig';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';

import imgTablet from '@/assets/quickstart/asset_tablet.png';
import imgOwned from '@/assets/quickstart/asset_owned.png';
import imgPortable from '@/assets/quickstart/asset_portable.png';
import imgYours from '@/assets/quickstart/asset_yours.png';

export default function Quickstart() {
  const { state } = usePrototype();
  useSeo({
    title: 'Quickstart',
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
      <section className="py-20 md:py-32 px-4 md:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
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
      <section className="py-12 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        <div className="bg-muted/30 border border-border rounded-2xl p-6 md:p-12 relative overflow-hidden flex flex-col items-center">
          {/* subtle dotted-grid background effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
            
            {/* Left Column: Use Cases */}
            <div className="flex flex-col gap-4 w-full md:w-80">
              <div className="bg-background border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center shrink-0">
                   <AppWindow className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Build a CMS</h4>
                  <p className="text-xs text-muted-foreground">Create your own content management system</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center shrink-0">
                   <Code className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Connect an app</h4>
                  <p className="text-xs text-muted-foreground">Integrate screens into your existing application</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center shrink-0">
                   <PenTool className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Create a new experience</h4>
                  <p className="text-xs text-muted-foreground">Build an entirely new digital signage experience</p>
                </div>
              </div>
            </div>

            {/* Center: TomorrowOS */}
            <div className="flex flex-col items-center shrink-0 relative">
              {/* Connectors for desktop */}
              <div className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 w-12 border-t-2 border-dashed border-muted-foreground/30" />
              <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-12 border-t-2 border-dashed border-muted-foreground/30" />
              
              {/* Connectors for mobile */}
              <div className="md:hidden h-8 border-l-2 border-dashed border-muted-foreground/30 my-2" />

              <div className="bg-foreground text-background rounded-2xl p-8 shadow-lg text-center w-64">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 border-2 border-background/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-background rounded-full" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2">TomorrowOS</h3>
                <p className="text-sm text-background/80">Shared runtime, APIs and device layer</p>
              </div>

              {/* Connectors for mobile */}
              <div className="md:hidden h-8 border-l-2 border-dashed border-muted-foreground/30 my-2" />
            </div>

            {/* Right Column: Platforms */}
            <div className="flex flex-col gap-3 w-full md:w-64">
              <div className="bg-background border border-border rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-semibold h-14">Samsung Tizen</div>
              <div className="bg-background border border-border rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-semibold h-14">LG webOS</div>
              <div className="bg-background border border-border rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-semibold h-14">BrightSign</div>
              <div className="flex gap-3 h-14">
                <div className="bg-background border border-border rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-semibold flex-1">Android</div>
                <div className="bg-background border border-border rounded-xl p-4 shadow-sm flex items-center justify-center text-sm font-semibold flex-1">Windows</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center relative z-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              One shared foundation beneath every screen experience.
            </p>
          </div>
        </div>
      </section>

      {/* START YOUR WAY SECTION */}
      <section id="start-new" className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start your way.</h2>
            <p className="text-lg text-muted-foreground">
              Whether you build with AI-assisted tools or write against the SDK directly, you start from the same foundation.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {showDocs && (
              <a href={hasDocs ? siteConfig.links.docs : '#'} onClick={(e) => !hasDocs && e.preventDefault()} target={hasDocs ? "_blank" : undefined} rel={hasDocs ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6">
                {hasDocs ? 'View the docs' : <PlaceholderText value="PLACEHOLDER_DOCS_URL" fallback="View the docs" />}
              </a>
            )}
            {showGithub && (
              <a href={hasGithub ? siteConfig.links.github : '#'} onClick={(e) => !hasGithub && e.preventDefault()} target={hasGithub ? "_blank" : undefined} rel={hasGithub ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground hover:opacity-70 h-10 px-4">
                {hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" />} <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Diagram */}
          <div className="bg-muted/30 border border-border rounded-2xl p-8 flex flex-col items-center">
             <div className="flex flex-col gap-3 w-full max-w-sm mb-6">
               <div className="bg-background border border-border rounded-lg p-4 text-center shadow-sm">
                 <h4 className="font-bold text-sm">AI-assisted</h4>
                 <p className="text-xs text-muted-foreground">Replit, Lovable, Bubble, Cursor</p>
               </div>
               <div className="bg-background border border-border rounded-lg p-4 text-center shadow-sm">
                 <h4 className="font-bold text-sm">SDK</h4>
                 <p className="text-xs text-muted-foreground">Runtime, APIs, CLI</p>
               </div>
               <div className="bg-background border border-border rounded-lg p-4 text-center shadow-sm">
                 <h4 className="font-bold text-sm">Existing product</h4>
                 <p className="text-xs text-muted-foreground">CMS, SaaS, dashboards, enterprise apps</p>
               </div>
             </div>
             
             <div className="h-6 border-l-2 border-dashed border-muted-foreground/30 mb-6" />
             
             <div className="bg-foreground text-background rounded-xl p-5 text-center shadow-md w-full max-w-sm">
               <h4 className="font-bold text-base">TomorrowOS</h4>
               <p className="text-xs text-background/80">Shared foundation</p>
             </div>

             <div className="h-6 border-l-2 border-dashed border-muted-foreground/30 my-6" />
             
             <img 
               src={imgTablet} 
               alt="Tablet showing TomorrowOS Welcome screen" 
               width={760}
               height={400}
               loading="lazy" 
               className="w-full max-w-sm h-auto shadow-lg rounded-xl"
             />
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
              
              <div className="bg-muted/30 border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="font-bold text-lg text-foreground/80">Render</div>
                <div className="font-bold text-lg text-foreground/80 flex items-center gap-2">
                   <div className="w-5 h-5 bg-foreground/80 rounded flex items-center justify-center"><div className="w-2 h-2 bg-background rounded-full"/></div>
                   Fly.io
                </div>
                <div className="font-bold text-lg text-foreground/80">Northflank</div>
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
            <img 
              src={imgOwned}
              alt="3D illustration of a dashboard showing ownership of the product"
              width={824}
              height={566}
              loading="lazy"
              className="w-full h-auto mb-6 border border-border rounded-2xl"
            />
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">OWNED</div>
            <h3 className="text-xl font-bold mb-3">Own your product</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Your frontend, workflows, users, data and commercial model remain yours.
            </p>
            <Link href="/quickstart" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70">
              Learn <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="flex flex-col">
            <img 
              src={imgPortable}
              alt="3D illustration of a cloud platform showing infrastructure portability"
              width={824}
              height={566}
              loading="lazy"
              className="w-full h-auto mb-6 border border-border rounded-2xl"
            />
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">PORTABLE</div>
            <h3 className="text-xl font-bold mb-3">Choose your infrastructure</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Self-host locally, deploy privately or run it in the cloud environment you choose.
            </p>
            <Link href="/quickstart" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70">
              Learn <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="flex flex-col">
            <img 
              src={imgYours}
              alt="3D illustration of screens and media players showing multi-platform support"
              width={824}
              height={566}
              loading="lazy"
              className="w-full h-auto mb-6 border border-border rounded-2xl"
            />
            <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">YOURS</div>
            <h3 className="text-xl font-bold mb-3">Support multiple platforms</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
              Build against one shared layer across supported screen hardware.
            </p>
            <Link href="/quickstart" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70">
              Learn <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* PATTERNS SECTION */}
      <section id="patterns" className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full bg-muted/30 border-y border-border scroll-mt-24">
        <div className="mb-12">
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">USE CASES</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start from a working pattern.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Start with a proven structure, then shape it around your product.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PatternCard 
            title="Digital menu boards"
            desc="Pricing, promos and scheduling across one or more screens."
          />
          <PatternCard 
            title="Directory boards"
            desc="Structured data, layouts and navigation for buildings or campuses."
          />
          <PatternCard 
            title="Retail media networks"
            desc="Campaigns, inventory, playback and proof-of-play foundations."
          />
          <PatternCard 
            title="Internal communications"
            desc="News, dashboards and operational content across managed screens."
          />
          <PatternCard 
            title="Custom signage products"
            desc="Your frontend and workflows on top of the shared TomorrowOS layer."
          />
        </div>

        {state.prototypeReviewMode || (siteConfig.links.knowledgeBase && !siteConfig.links.knowledgeBase.includes('{{')) ? (
          <a 
            href={siteConfig.links.knowledgeBase && !siteConfig.links.knowledgeBase.includes('{{') ? siteConfig.links.knowledgeBase : '#'} 
            onClick={(e) => siteConfig.links.knowledgeBase.includes('{{') && e.preventDefault()}
            target={!siteConfig.links.knowledgeBase.includes('{{') ? "_blank" : undefined} 
            rel={!siteConfig.links.knowledgeBase.includes('{{') ? "noopener noreferrer" : undefined} 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            {siteConfig.links.knowledgeBase.includes('{{') ? <PlaceholderText value="PLACEHOLDER_KNOWLEDGE_BASE_URL" fallback="Knowledge Base" /> : 'Knowledge Base'} <ChevronRight className="w-4 h-4 ml-2" />
          </a>
        ) : null}
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
              {hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" />}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function PatternCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm hover:border-foreground/20 transition-colors">
      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4 text-foreground">
        <div className="w-4 h-4 bg-foreground rounded-sm" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
