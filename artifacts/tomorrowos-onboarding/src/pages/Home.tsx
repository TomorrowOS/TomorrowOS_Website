import React from 'react';
import { Link } from 'wouter';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Blocks, Package } from 'lucide-react';
import { vercelConfig } from '@/lib/vercelConfig';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';
import { ArchitectureSection } from '@/components/ArchitectureSection';

export default function Home() {
  const { state } = usePrototype();
  useSeo({
    title: 'Open-Source Digital Signage Foundation',
    description: 'TomorrowOS provides the shared device, playback and platform foundation for teams building digital signage products.'
  });

  const hasGithub = siteConfig.links.github && !siteConfig.links.github.includes('{{');
  const showGithub = state.prototypeReviewMode || hasGithub;

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* HERO */}
      <section className="py-24 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">
          OPEN-SOURCE DIGITAL SIGNAGE FOUNDATION
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Build and own your digital signage software.
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          TomorrowOS provides the shared device, playback and platform foundation for teams building digital signage products.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quickstart" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-11 px-8 w-full sm:w-auto">
            Explore Quickstart
          </Link>
          {showGithub && (
            <a 
              href={hasGithub ? siteConfig.links.github : '#'} 
              target={hasGithub ? "_blank" : undefined} 
              rel={hasGithub ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full sm:w-auto"
              onClick={(e) => !hasGithub && e.preventDefault()}
            >
              {hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" />}
            </a>
          )}
        </div>
      </section>

      {/* PATHS */}
      <section className="py-20 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Choose how to use TomorrowOS</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div className="bg-background rounded-xl p-8 border border-border shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center mb-6">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Start a new project</h3>
              <p className="text-muted-foreground mb-8 flex-1">
                Create a new signage product using Guided Setup or the TomorrowOS CLI.
              </p>
              <Link href="/quickstart" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                Start with Quickstart <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="bg-background rounded-xl p-8 border border-border shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center mb-6">
                <Blocks className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect an existing product</h3>
              <p className="text-muted-foreground mb-8 flex-1">
                Add TomorrowOS to an application using the Server SDK or HTTP API.
              </p>
              <Link href="/quickstart#connect-existing" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                Explore integration paths <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* CARD 3 */}
            <div className="bg-background rounded-xl p-8 border border-border shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Explore the project</h3>
              <p className="text-muted-foreground mb-8 flex-1">
                Review the documentation, source code and supported platforms.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/quickstart" className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                  View documentation <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                {showGithub && (
                  <a href={hasGithub ? siteConfig.links.github : '#'} target={hasGithub ? "_blank" : undefined} rel={hasGithub ? "noopener noreferrer" : undefined} className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-70 transition-opacity" onClick={(e) => !hasGithub && e.preventDefault()}>
                    {hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" />} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM */}
      <ArchitectureSection />

      {/* PLATFORM STRIP */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-[1200px] text-center">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">Supported platforms</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <PlatformBadge name="Samsung Tizen" status="Available" active />
            <PlatformBadge name="BrightSign" status="Coming soon" />
            <PlatformBadge name="LG webOS" status="Coming soon" />
            <PlatformBadge name="Android" status="Coming soon" />
            <PlatformBadge name="Windows" status="Coming soon" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 md:px-8 bg-foreground text-background text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Start building with TomorrowOS.</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quickstart" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-background/90 h-11 px-8 w-full sm:w-auto">
            Open Quickstart
          </Link>
          {showGithub && (
            <a 
              href={hasGithub ? siteConfig.links.github : '#'} 
              target={hasGithub ? "_blank" : undefined} 
              rel={hasGithub ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-background bg-transparent hover:bg-background/10 h-11 px-8 w-full sm:w-auto"
              onClick={(e) => !hasGithub && e.preventDefault()}
            >
              {hasGithub ? 'View GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="View GitHub" className="text-white bg-transparent border-white/50" />}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function PlatformBadge({ name, status, active = false }: { name: string, status: string, active?: boolean }) {
  return (
    <div className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${active ? 'bg-background border-border text-foreground' : 'bg-muted/50 border-transparent text-muted-foreground'}`}>
      <span>{name}</span>
      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${active ? 'bg-muted text-foreground' : 'bg-muted-foreground/10 text-muted-foreground'}`}>{status}</span>
    </div>
  );
}
