import React from 'react';

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

/* ------------------------------------------------------------------ */
/* Content config (kept separate from layout)                          */
/* ------------------------------------------------------------------ */

interface InputItem {
  title: string;
  copy: string;
  icon: string; // black icon asset filename
}

interface PlatformItem {
  name: string;
  logos: { src: string; alt: string; className: string }[];
  extraLabel?: string;
}

const inputs: InputItem[] = [
  { title: 'Build a CMS', copy: 'Create your own content management system', icon: 'code.svg' },
  { title: 'Connect an app', copy: 'Integrate screens into your existing application', icon: 'deployed_code.svg' },
  { title: 'Create a new experience', copy: 'Build an entirely new digital signage experience', icon: 'animated_images.svg' },
];

const platforms: PlatformItem[] = [
  {
    name: 'Samsung Tizen',
    logos: [
      { src: 'platforms/samsung-logo.svg', alt: 'Samsung', className: 'h-4' },
      { src: 'platforms/tizen-logo.svg', alt: 'Tizen', className: 'h-5' },
    ],
  },
  {
    name: 'LG webOS',
    logos: [{ src: 'platforms/lg-webos-logo.svg', alt: 'LG webOS', className: 'h-7' }],
  },
  {
    name: 'BrightSign',
    logos: [{ src: 'platforms/brightsign-logo.svg', alt: 'BrightSign', className: 'h-6' }],
  },
  {
    name: 'Android',
    logos: [{ src: 'platforms/android-logo.svg', alt: 'Android', className: 'h-6' }],
  },
  {
    name: 'Windows',
    logos: [{ src: 'platforms/windows-logo.png', alt: 'Windows', className: 'h-6' }],
  },
];

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

function ArchitectureInputCard({ item }: { item: InputItem }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground">
        <img src={asset(`icons/black/${item.icon}`)} alt="" className="h-5 w-5 invert" />
      </div>
      <div>
        <div className="text-sm font-bold text-foreground">{item.title}</div>
        <div className="mt-1 text-xs leading-snug text-muted-foreground">{item.copy}</div>
      </div>
    </div>
  );
}

function ArchitectureCenterCard() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-white px-8 py-8 shadow-sm">
      <img src={asset('brand/tomorrowos-logo.svg')} alt="TomorrowOS" className="h-7 w-auto" />
      <p className="mt-3 max-w-[180px] text-center text-sm leading-snug text-muted-foreground">
        Shared runtime, APIs and device layer
      </p>
    </div>
  );
}

function ArchitecturePlatformCard({ item }: { item: PlatformItem }) {
  return (
    <div className="flex h-[72px] items-center justify-center gap-3 rounded-xl border border-border bg-white px-6" aria-label={item.name}>
      {item.logos.map((logo) => (
        <img key={logo.src} src={asset(logo.src)} alt={logo.alt} className={`${logo.className} w-auto object-contain`} />
      ))}
      {item.extraLabel && <span className="text-sm text-muted-foreground">{item.extraLabel}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Connectors — inline SVG stretched to column height; strokes stay    */
/* 1px via vector-effect="non-scaling-stroke" so lines remain crisp    */
/* and adapt to any card-stack height without absolute positioning.    */
/* ------------------------------------------------------------------ */

function LeftConnectors() {
  // Three branches (card centres at 1/6, 3/6, 5/6) merge into a rail, then out to the centre card.
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      {['16.67', '50', '83.33'].map((y) => (
        <path key={y} d={`M0 ${y} H45`} className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
      ))}
      <path d="M45 16.67 V83.33" className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M45 50 H100" className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function RightConnectors() {
  // One line in from the centre card, rail, five branches out (card centres at 10/30/50/70/90).
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <path d="M0 50 H55" className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M55 10 V90" className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
      {['10', '30', '50', '70', '90'].map((y) => (
        <path key={y} d={`M55 ${y} H100`} className="stroke-border" fill="none" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

function VerticalConnector() {
  return <div className="mx-auto h-8 w-px bg-border" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ArchitectureSection() {
  return (
    <section
      aria-label="TomorrowOS architecture"
      className="border-b border-border bg-background px-4 py-20 md:px-8 md:py-24"
    >
      <div
        className="mx-auto max-w-[1280px] rounded-2xl px-2 py-10 md:px-4 md:py-12 lg:px-10 lg:py-14"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(0 0% 82%) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {/* Desktop / tablet: 3-column diagram */}
        <div className="hidden md:grid grid-cols-[minmax(0,3fr)_minmax(32px,1fr)_minmax(0,2.6fr)_minmax(32px,1fr)_minmax(0,2.4fr)] items-stretch">
          <div className="flex flex-col justify-between gap-10 py-6">
            {inputs.map((item) => (
              <ArchitectureInputCard key={item.title} item={item} />
            ))}
          </div>
          <LeftConnectors />
          <div className="flex items-center">
            <ArchitectureCenterCard />
          </div>
          <RightConnectors />
          <div className="flex flex-col justify-between gap-5">
            {platforms.map((item) => (
              <ArchitecturePlatformCard key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked flow with simple downward connectors */}
        <div className="md:hidden">
          <div className="flex flex-col gap-4">
            {inputs.map((item) => (
              <ArchitectureInputCard key={item.title} item={item} />
            ))}
          </div>
          <VerticalConnector />
          <ArchitectureCenterCard />
          <VerticalConnector />
          <div className="flex flex-col gap-4">
            {platforms.map((item) => (
              <ArchitecturePlatformCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
