import React, { Fragment } from 'react';
import { useSeo } from '@/hooks/use-seo';
import { aboutContent } from '@/content/about';
import { usePrototype } from '@/components/PrototypeProvider';
import { siteConfig } from '@/config/site';
import { Link } from 'wouter';
import GithubIcon from '@/components/GithubIcon';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { PlaceholderText } from '@/components/PlaceholderText';

export default function About() {
  const { state } = usePrototype();
  useSeo({
    title: 'About TomorrowOS | Open Source Digital Signage Foundation',
    fullTitle: true,
    description: 'Learn why TomorrowOS is building an open foundation for digital signage, helping teams avoid rebuilding device, playback and platform infrastructure.',
    canonicalPath: '/about',
    socialImage: `${import.meta.env.BASE_URL}assets/illustrations/open-source.png`
  });

  return (
    <div className="flex flex-col animate-in fade-in duration-500 font-sans">
      {state.prototypeReviewMode && (
        <div className="bg-amber-100 text-amber-900 px-4 py-2 text-center text-xs font-bold w-full">
          MOBILE FIGMA EXPORT REQUIRED FOR FINAL PIXEL MATCHING
        </div>
      )}
      <AboutHero />
      <SharedFoundationSection />
      <OwnershipSection />
      <ProductBoundarySection />
      <MaintainerSection />
      <CommunitySection />
      <LicenceSection />
      <SustainabilitySection />
      <AboutFinalCta />
    </div>
  );
}

function Icon({ name, className }: { name: string, className?: string }) {
  return (
    <img src={`${import.meta.env.BASE_URL}assets/icons/black/${name}`} alt="" className={cn("opacity-80", className)} />
  );
}

function SmartLink({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) {
  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

function AboutHero() {
  const { state } = usePrototype();
  const c = aboutContent.hero;
  
  const hasCommunity = siteConfig.links.community && !siteConfig.links.community.includes('{{');
  const communityHref = hasCommunity ? siteConfig.links.community : '/community';
  
  const hasGithub = siteConfig.links.github && !siteConfig.links.github.includes('{{');
  
  return (
    <section id="hero" className="scroll-mt-24 bg-white py-20 md:py-32 px-4 md:px-8 w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8">
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-[3.5rem] md:leading-[1.1] font-bold tracking-tight mb-6 whitespace-pre-line text-foreground">
            {c.heading}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
            {c.copy}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SmartLink href={communityHref} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8">
              {c.primaryAction}
            </SmartLink>
            {state.prototypeReviewMode || hasGithub ? (
               <a 
                 href={hasGithub ? siteConfig.links.github : '#'} 
                 target={hasGithub ? "_blank" : undefined}
                 rel={hasGithub ? "noopener noreferrer" : undefined}
                 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                 onClick={(e) => !hasGithub && e.preventDefault()}
               >
                 <GithubIcon className="w-4 h-4 mr-2" />{hasGithub ? c.secondaryAction : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback={c.secondaryAction} />}
               </a>
            ) : null}
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <img 
            src={`${import.meta.env.BASE_URL}assets/illustrations/open-source.png`}
            alt="Open source foundation illustration"
            className="w-full max-w-[500px] md:max-w-none h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function SharedFoundationSection() {
  const c = aboutContent.shipSoftware;
  return (
    <section id="ship" className="scroll-mt-24 bg-[#fcfcfc] py-20 md:py-32 px-4 md:px-8 w-full border-y border-border/50">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start">
        <div className="flex-1 max-w-xl lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight mb-6 whitespace-pre-line text-foreground">
            {c.heading}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            {c.body}
          </p>
          <p className="text-lg md:text-xl font-medium text-foreground">
            {c.supportingLine}
          </p>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center lg:justify-end w-full max-w-4xl gap-3 md:gap-0">
          {c.cards.map((card, i) => {
            const isCenter = i === 1;
            return (
              <Fragment key={i}>
                <div
                  className={
                    'bg-white border border-border rounded-2xl flex flex-col items-center justify-center text-center w-full max-w-[320px] md:max-w-none md:flex-1 shrink-0 ' +
                    (isCenter
                      ? 'px-6 py-10 md:py-14 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] md:-my-4 relative z-10'
                      : 'px-6 py-8 md:py-10 shadow-sm')
                  }
                >
                  <Icon name={card.icon} className="w-7 h-7 mb-6" />
                  <h3 className="font-bold text-base md:text-lg mb-2 leading-snug max-w-[190px]">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{card.copy}</p>
                </div>
                {i < c.cards.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 w-8 md:w-10 h-6 md:h-auto">
                    <ChevronRight className="w-5 h-5 text-foreground/60 hidden md:block" strokeWidth={2.5} />
                    <ChevronRight className="w-5 h-5 text-foreground/60 rotate-90 md:hidden" strokeWidth={2.5} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OwnershipSection() {
  const c = aboutContent.keepOwnership;
  return (
    <section id="ownership" className="scroll-mt-24 bg-white py-20 md:py-32 px-4 md:px-8 w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-12">
        <div className="flex-1 md:max-w-md">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground md:pr-12">
            {c.heading}
          </h2>
        </div>
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.cards.map((card, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6">
                <Icon name={card.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 leading-tight">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductBoundarySection() {
  const { state } = usePrototype();
  const c = aboutContent.productBoundary;
  
  return (
    <section id="boundary" className="scroll-mt-24 bg-[#fcfcfc] py-20 md:py-32 px-4 md:px-8 w-full border-y border-border/50">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-12">
        <div className="flex-1 md:max-w-md">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground">
            {c.heading}
          </h2>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row border-b border-border/50 pb-12 mb-10 gap-12 sm:gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-6 text-foreground">TomorrowOS provides</h3>
              <ul className="space-y-4">
                {c.tomorrowOsProvides.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="tick.svg" className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:block w-[1px] bg-border/50" />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-6 text-foreground">You build and own</h3>
              <ul className="space-y-4">
                {c.youBuild.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="tick.svg" className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">{c.bottomStatement}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{c.bottomCopy}</p>
            {state.prototypeReviewMode && (
              <p className="mt-2 text-xs font-bold text-amber-900 bg-amber-100 p-2 inline-block">
                REVIEW NOTE: Suggest changing to "TomorrowOS connects signage hardware to the shared system layer underneath."
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MaintainerSection() {
  const c = aboutContent.builtBy;
  return (
    <section id="maintainers" className="scroll-mt-24 bg-white py-20 md:py-32 px-4 md:px-8 w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-24">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-12">
          <div className="flex-1 md:max-w-md">
            <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground">
              {c.heading}
            </h2>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-12 relative">
            {c.principles.map((p, i) => (
              <div key={i} className="flex flex-col relative">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.copy}</p>
                {i < 2 && <div className="hidden sm:block absolute -bottom-6 left-0 right-0 h-[1px] bg-border/40" />}
              </div>
            ))}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40 -translate-x-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {c.team.map((t, i) => (
            <TeamMember key={i} name={t.name} role={t.role} imagePath={t.imagePath} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMember({ name, role, imagePath }: { name: string, role: string, imagePath?: string }) {
  const { state } = usePrototype();
  const hasImage = !!imagePath;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-32 md:w-40 h-32 md:h-40 rounded-full bg-muted flex items-center justify-center mb-6 relative overflow-hidden shrink-0 border border-border/50">
        {hasImage ? (
          <img
            src={`${import.meta.env.BASE_URL}${imagePath}`}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-4xl md:text-5xl font-medium text-muted-foreground/30">{name.charAt(0)}</span>
        )}
      </div>
      {state.prototypeReviewMode && !hasImage && (
        <div className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded absolute -mt-[88px] md:-mt-[104px] z-10 pointer-events-none">
          MISSING TEAM IMAGE
        </div>
      )}
      <h4 className="text-lg font-bold mb-1">{name}</h4>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{role}</p>
    </div>
  );
}

function CommunitySection() {
  const { state } = usePrototype();
  const c = aboutContent.community;
  
  const hasCommunity = siteConfig.links.community && !siteConfig.links.community.includes('{{');
  const communityHref = hasCommunity ? siteConfig.links.community : '/community';

  const hasGithub = siteConfig.links.github && !siteConfig.links.github.includes('{{');
  
  const hasGovernance = siteConfig.links.governance && !siteConfig.links.governance.includes('{{');
  const governanceHref = hasGovernance ? siteConfig.links.governance : '/governance';

  return (
    <section id="community" className="scroll-mt-24 bg-[#fcfcfc] py-20 md:py-32 px-4 md:px-8 w-full border-y border-border/50">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-12">
        <div className="flex-1 md:max-w-md">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground">
            {c.heading}
          </h2>
        </div>
        <div className="flex-1 flex flex-col md:pr-12">
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            <p>{c.copy1}</p>
            <p>{c.copy2}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {state.prototypeReviewMode || hasGithub ? (
               <a 
                 href={hasGithub ? siteConfig.links.github : '#'} 
                 target={hasGithub ? "_blank" : undefined}
                 rel={hasGithub ? "noopener noreferrer" : undefined}
                 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8"
                 onClick={(e) => !hasGithub && e.preventDefault()}
               >
                 <GithubIcon className="w-4 h-4 mr-2" />{hasGithub ? c.primaryAction : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback={c.primaryAction} />}
               </a>
            ) : null}
            <SmartLink href={governanceHref} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              {c.secondaryAction}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function LicenceSection() {
  const { state } = usePrototype();
  const c = aboutContent.license;
  
  const hasLicense = siteConfig.links.license && !siteConfig.links.license.includes('{{');
  const licenseExtHref = hasLicense ? siteConfig.links.license : '#';
  const licenseIntHref = '/license';
  
  return (
    <section id="licence" className="scroll-mt-24 bg-white py-20 md:py-32 px-4 md:px-8 w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-12">
        <div className="flex-1 md:max-w-md flex flex-col">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground mb-6">
            {c.heading}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-sm">
            {c.supportingCopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-auto items-start">
            <Link href={licenseIntHref} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8">
              {c.primaryAction}
            </Link>
            {state.prototypeReviewMode || hasLicense ? (
               <a 
                 href={licenseExtHref} 
                 target={hasLicense ? "_blank" : undefined}
                 rel={hasLicense ? "noopener noreferrer" : undefined}
                 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                 onClick={(e) => !hasLicense && e.preventDefault()}
               >
                 {hasLicense ? c.secondaryAction : <PlaceholderText value="PLACEHOLDER_LICENSE_URL" fallback={c.secondaryAction} />}
               </a>
            ) : null}
          </div>
        </div>
        
        <div className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-12 relative">
          {c.points.map((p, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
                <Icon name={p.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.copy}</p>
            </div>
          ))}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}

function SustainabilitySection() {
  const c = aboutContent.sustainability;
  return (
    <section id="sustainability" className="scroll-mt-24 bg-[#fcfcfc] py-20 md:py-32 px-4 md:px-8 w-full border-y border-border/50">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-12">
        <div className="flex-1 md:max-w-md">
          <h2 className="text-3xl md:text-4xl md:leading-[1.15] font-bold tracking-tight whitespace-pre-line text-foreground">
            {c.heading}
          </h2>
        </div>
        <div className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-12 relative">
          {c.points.map((p, i) => (
            <div key={i} className="flex flex-col relative">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
                <Icon name={p.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.copy}</p>
              {i < 2 && <div className="hidden sm:block absolute -bottom-6 left-0 right-0 h-[1px] bg-border/40" />}
            </div>
          ))}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}

function AboutFinalCta() {
  const c = aboutContent.finalCta;
  
  const hasCommunity = siteConfig.links.community && !siteConfig.links.community.includes('{{');
  const communityHref = hasCommunity ? siteConfig.links.community : '/community';

  return (
    <section id="cta" className="scroll-mt-24 bg-white py-24 md:py-40 px-4 md:px-8 w-full text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-[3.5rem] md:leading-[1.1] font-bold tracking-tight whitespace-pre-line text-foreground mb-6">
          {c.heading}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
          {c.supportingCopy}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/start" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-11 px-8">
            {c.primaryAction}
          </Link>
          <SmartLink href={communityHref} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
            {c.secondaryAction}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}