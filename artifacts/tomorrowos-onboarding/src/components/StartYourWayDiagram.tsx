import { Star, Code, Package, Layers } from 'lucide-react';

/**
 * Responsive, real-HTML rebuild of the "Start your way" architecture diagram
 * (previously a flat PNG). Three entry-point cards feed into the shared
 * TomorrowOS foundation, which drives a signage screen. All copy is real,
 * selectable HTML text.
 */

const entryPoints = [
  { icon: Star, title: 'AI-assisted', subtitle: 'Replit, Lovable, Bubble, Cursor' },
  { icon: Code, title: 'SDK', subtitle: 'Runtime, APIs, CLI' },
  { icon: Package, title: 'Existing product', subtitle: 'CMS, SaaS, dashboards, enterprise apps' },
];

const dottedBg: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

function EntryCard({ icon: Icon, title, subtitle }: { icon: typeof Star; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-2xl border border-border/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] px-4 py-6 md:px-5 md:py-7">
      <Icon className="w-6 h-6 mb-3" strokeWidth={2} aria-hidden="true" />
      <div className="text-sm md:text-base font-bold text-foreground">{title}</div>
      <div className="text-xs md:text-sm text-muted-foreground mt-1 leading-snug">{subtitle}</div>
    </div>
  );
}

function ScreenMock() {
  return (
    <div className="w-full max-w-[560px] bg-black rounded-xl p-1.5 md:p-2 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.35)]">
      <div className="bg-white rounded-lg overflow-hidden text-left">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[9px] md:text-[10px] text-foreground">
          <span className="font-semibold">
            Lobby 01 <span className="text-green-600 font-normal ml-1">&bull; Online</span>
          </span>
          <span className="text-muted-foreground">9:41 AM &nbsp; 22&deg;</span>
        </div>
        {/* Body */}
        <div className="flex gap-2 px-2 pb-1">
          <div className="flex-[1.6] rounded-md bg-gradient-to-br from-[#f4f5f7] via-[#e9ecf0] to-[#d8dde3] p-3 md:p-5 min-h-[110px] md:min-h-[150px]">
            <div className="text-base md:text-2xl font-bold text-foreground">Welcome</div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Every moment connected.</div>
          </div>
          <div className="flex-1 py-1 pr-1">
            <div className="text-[9px] md:text-[10px] font-bold text-foreground border-b border-border pb-1 mb-1.5">Announcements</div>
            {[
              ['All hands', '10:00 AM'],
              ['Product update', '1:00 PM'],
              ['Happy hour', '5:00 PM'],
            ].map(([t, time]) => (
              <div key={t} className="border-b border-border/60 last:border-0 py-1">
                <div className="text-[9px] md:text-[10px] font-semibold text-foreground">{t}</div>
                <div className="text-[8px] md:text-[9px] text-muted-foreground">{time}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[8px] md:text-[9px] text-muted-foreground">
          <span className="font-semibold text-foreground">tomorrowos</span>
          <span>TomorrowOS is open source &nbsp;&bull;&nbsp; tomorrowos.org</span>
        </div>
      </div>
    </div>
  );
}

export default function StartYourWayDiagram() {
  return (
    <div className="relative w-full rounded-3xl px-3 py-8 md:px-6 md:py-10" style={dottedBg} role="img" aria-label="Diagram: AI-assisted tools, the SDK and existing products all build on the shared TomorrowOS foundation, which powers signage screens.">
      {/* Entry point cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 relative z-10">
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
