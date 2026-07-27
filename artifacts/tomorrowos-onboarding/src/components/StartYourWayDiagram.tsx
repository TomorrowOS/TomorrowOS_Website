import { Star, Code, Package, Layers } from 'lucide-react';

/**
 * Responsive, real-HTML rebuild of the "Start your way" architecture diagram
 * (previously a flat PNG). Three entry-point cards feed into the shared
 * TomorrowOS foundation, which drives a signage screen. All copy is real,
 * selectable HTML text.
 */

const entryPoints = [
  { icon: Star, title: 'AI-assisted', subtitle: 'Replit, Vercel, v0, Cursor' },
  { icon: Code, title: 'SDK', subtitle: 'Runtime, APIs, CLI' },
  { icon: Package, title: 'Existing product', subtitle: 'CMS, SaaS, dashboards, enterprise apps' },
];

const dottedBg: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

function EntryCard({ icon: Icon, title, subtitle }: { icon: typeof Star; title: string; subtitle: string }) {
  return (
    <div className="h-full flex flex-col items-center text-center bg-white rounded-2xl border border-border/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] px-3 py-6 md:px-4 md:py-7">
      <Icon className="w-6 h-6 mb-3 shrink-0" strokeWidth={2} aria-hidden="true" />
      <div className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">{title}</div>
      <div className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-snug max-w-[170px] mx-auto">{subtitle}</div>
    </div>
  );
}

function ScreenMock() {
  return (
    // TV: thick black bezel around a fixed 16:9 panel.
    <div className="w-full max-w-[560px] bg-black rounded-2xl p-2 md:p-2.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.4)]">
      <div className="relative w-full aspect-video bg-white rounded-lg overflow-hidden text-left flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] text-foreground shrink-0">
          <span className="font-semibold">
            Lobby 01 <span className="text-green-600 font-normal ml-1">&bull; Online</span>
          </span>
          <span className="text-muted-foreground">9:41 AM &nbsp; 22&deg;</span>
        </div>
        {/* Body fills the remaining 16:9 area */}
        <div className="flex gap-2 md:gap-2.5 px-2 md:px-2.5 flex-1 min-h-0">
          <div className="relative flex-[1.8] rounded-md overflow-hidden bg-[#f4f5f7]">
            {/* Soft waves, like the reference render */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 200" preserveAspectRatio="none" aria-hidden="true">
              <rect width="360" height="200" fill="#f2f3f5" />
              <path d="M0 120 C 80 60, 150 190, 240 120 S 340 60, 360 90 V200 H0 Z" fill="#e2e6ea" />
              <path d="M0 160 C 90 110, 180 210, 270 150 S 350 120, 360 140 V200 H0 Z" fill="#cfd6dd" />
            </svg>
            <div className="relative p-3 md:p-5">
              <div className="text-base md:text-2xl font-bold text-foreground">Welcome</div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Every moment connected.</div>
            </div>
          </div>
          <div className="flex-1 py-0.5 pr-1 overflow-hidden">
            <div className="text-[9px] md:text-[10px] font-bold text-foreground border-b border-border pb-1 mb-1 md:mb-1.5">Announcements</div>
            {[
              ['All hands', '10:00 AM'],
              ['Product update', '1:00 PM'],
              ['Happy hour', '5:00 PM'],
            ].map(([t, time]) => (
              <div key={t} className="border-b border-border/60 last:border-0 py-0.5 md:py-1">
                <div className="text-[9px] md:text-[10px] font-semibold text-foreground">{t}</div>
                <div className="text-[8px] md:text-[9px] text-muted-foreground">{time}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 text-[8px] md:text-[9px] text-muted-foreground shrink-0">
          <img src={`${import.meta.env.BASE_URL}assets/brand/tomorrowos-logo.svg`} alt="TomorrowOS" className="h-2.5 md:h-3 w-auto" />
          <span>TomorrowOS is open source &nbsp;&bull;&nbsp; tomorrowos.org</span>
        </div>
      </div>
    </div>
  );
}

export default function StartYourWayDiagram() {
  return (
    <div className="relative w-full rounded-3xl px-3 py-8 md:px-6 md:py-10" style={dottedBg}>
      {/* Entry point cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-4 md:gap-5 relative z-10">
        {entryPoints.map((e) => (
          <EntryCard key={e.title} {...e} />
        ))}
      </div>

      {/* Connectors: three branches merging into one (desktop/tablet) */}
      <div className="hidden sm:block h-12 md:h-16" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none" fill="none">
          <path d="M50 0 V18 Q50 30 62 30 H150 M250 0 V18 Q250 30 238 30 H150 M150 0 V60" stroke="#d4d4d8" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      {/* Mobile connector */}
      <div className="sm:hidden mx-auto h-8 w-px bg-[#d4d4d8]" aria-hidden="true" />

      {/* TomorrowOS card */}
      <div className="flex justify-center relative z-10">
        <div className="flex flex-col items-center text-center bg-white rounded-2xl border border-border/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] px-10 py-6 md:px-14 md:py-7">
          <Layers className="w-6 h-6 mb-3" strokeWidth={2} aria-hidden="true" />
          <div className="text-sm md:text-base font-bold text-foreground">TomorrowOS</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Shared foundation</div>
        </div>
      </div>

      {/* Connector down to the screen */}
      <div className="mx-auto h-8 md:h-12 w-px bg-[#d4d4d8]" aria-hidden="true" />

      {/* Signage screen */}
      <div className="flex justify-center relative z-10">
        <ScreenMock />
      </div>
    </div>
  );
}
