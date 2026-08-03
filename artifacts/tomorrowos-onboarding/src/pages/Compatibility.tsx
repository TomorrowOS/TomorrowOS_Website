import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { isRouteEnabled } from '@/lib/featureFlags';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  COMPATIBILITY_LAST_REVIEWED,
  COMPATIBILITY_STATUS_DEFINITIONS,
  COMPATIBILITY_STATUS_LABELS,
  getCompatibilitySummary,
  PLATFORMS,
  VALIDATED_COMBINATIONS,
  type CompatibilityStatus,
  type PlatformCompatibility,
} from '@/lib/platformCompatibility';

/**
 * Platform Compatibility Centre (/compatibility).
 *
 * All content derives from src/lib/platformCompatibility.ts — the single
 * typed, evidence-audited data source. Do not hardcode compatibility values
 * in this file.
 */

const STATUS_TONE: Record<CompatibilityStatus, string> = {
  'production-ready': 'bg-muted text-foreground border-border',
  validated: 'bg-muted text-foreground border-border',
  supported: 'bg-muted text-muted-foreground border-border',
  'platform-validation': 'bg-blue-50 text-blue-800 border-blue-200',
  'requires-validation': 'bg-amber-50 text-amber-800 border-amber-200',
  planned: 'bg-muted text-muted-foreground border-border',
  unsupported: 'bg-muted text-muted-foreground border-border',
};

function StatusChip({ status }: { status: CompatibilityStatus }) {
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-xs font-medium ${STATUS_TONE[status]}`}
    >
      {COMPATIBILITY_STATUS_LABELS[status]}
    </span>
  );
}

function ExtA({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        'inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm'
      }
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      <span className="sr-only"> (opens in a new window)</span>
    </a>
  );
}

function CtaLink({
  link,
  primary,
}: {
  link: { label: string; href: string; external: boolean };
  primary?: boolean;
}) {
  const cls = primary
    ? 'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    : 'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
        <span className="sr-only"> (opens in a new window)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
      <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  );
}

/** Accessible responsive table with a horizontal scroll affordance. */
function ScrollTable({
  caption,
  head,
  rows,
  minWidth = 900,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
  minWidth?: number;
}) {
  return (
    <div
      className="w-full overflow-x-auto rounded-[12px] border border-border"
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2.5 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 align-top last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2.5 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlatformDetailSection({ platform }: { platform: PlatformCompatibility }) {
  const isPlanned = platform.status === 'planned';
  return (
    <section aria-labelledby={`platform-${platform.id}`} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3
          id={`platform-${platform.id}`}
          className="scroll-mt-24 text-xl font-bold tracking-tight text-foreground md:text-2xl"
        >
          {platform.name}
        </h3>
        <StatusChip status={platform.status} />
      </div>
      <p className="max-w-[760px] text-muted-foreground">{platform.statement}</p>

      {isPlanned ? (
        /* Compact development-status panel — no empty compatibility table. */
        <div className="flex flex-col gap-3 rounded-[12px] border border-border bg-muted/30 p-5">
          <div className="text-sm font-semibold text-foreground">Development status</div>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
            <li>No public player build, supported-version list or validation data yet.</li>
            <li>Compatibility rows will be published here once test evidence exists.</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <CtaLink link={platform.primaryCta} />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Supported scope
              </div>
              <ul className="mt-1.5 flex flex-col gap-1 text-sm font-medium text-foreground">
                {platform.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Key limitation
              </div>
              <p className="mt-1.5 text-sm font-medium text-foreground">{platform.keyLimitation}</p>
            </div>
          </div>

          <ScrollTable
            caption={`${platform.name} compatibility matrix`}
            head={[
              platform.id === 'brightsign' ? 'Series' : 'OS version',
              'Exact model',
              platform.id === 'brightsign' ? 'BrightSign OS' : 'Firmware',
              'Runtime',
              'Pairing',
              'Playback',
              'Offline',
              'Recovery',
              'Status',
              'Notes',
            ]}
            rows={platform.devices.map((d) => [
              <span className="font-medium text-foreground">{d.group}</span>,
              d.model,
              d.firmware,
              d.runtime,
              d.pairing,
              d.playback,
              d.offline,
              d.recovery,
              <StatusChip status={d.status} />,
              d.notes,
            ])}
            minWidth={1150}
          />
          <p className="text-sm text-muted-foreground">
            Series-level support, exact-model validation and exact-firmware validation are distinct:
            a supported row above becomes Validated only when the exact model and OS build complete
            the published validation workflow.
          </p>

          {platform.validationNotes.length > 0 && (
            <div className="rounded-[12px] border border-border bg-muted/30 p-5">
              <div className="text-sm font-semibold text-foreground">Validation notes</div>
              <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
                {platform.validationNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-foreground">Resources</div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {platform.links.filter((l) => l.external || isRouteEnabled(l.href)).map((l) => (
                <li key={l.href + l.label}>
                  {l.external ? (
                    <ExtA href={l.href}>{l.label}</ExtA>
                  ) : (
                    <Link
                      href={l.href}
                      className="font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

const CHECKLIST = [
  'Confirm the exact model',
  'Confirm the firmware or OS build',
  'Confirm the runtime version',
  'Confirm network access to your CMS',
  'Test pairing',
  'Test representative media',
  'Test offline operation',
  'Test reboot recovery',
  'Record the results',
  'Keep a rollback path',
];

const METHODOLOGY = [
  'Record the exact hardware model.',
  'Record the firmware or OS build.',
  'Install the exact TomorrowOS runtime version.',
  'Confirm the server connection.',
  'Confirm device pairing.',
  'Publish representative content.',
  'Validate playback.',
  'Disconnect the network.',
  'Validate offline playback.',
  'Restore the network.',
  'Validate reconnection and synchronisation.',
  'Restart the device.',
  'Validate automatic recovery.',
  'Test representative media profiles.',
  'Record results, limitations and evidence.',
];

export default function Compatibility() {
  usePageSeo('/compatibility');
  const summary = getCompatibilitySummary();
  const limitationPlatforms = PLATFORMS.filter((p) => p.limitations.length > 0);

  return (
    <div className="w-full">
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Compatibility', item: absoluteUrl('/compatibility') },
          ],
        }}
      />

      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[1050px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Compatibility</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1050px] flex-col gap-14 px-4 py-10 md:px-8 md:py-14">
        {/* Hero */}
        <header className="flex max-w-[820px] flex-col gap-5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            Platform compatibility
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            See which screen operating systems, hardware models and firmware combinations are
            supported, tested or still being validated with TomorrowOS.
          </p>
          <p className="text-muted-foreground">
            Compatibility is validated by the exact platform, device, OS build, runtime version and
            representative media — not by platform name alone. A platform can be supported while an
            individual model or firmware build still requires its own validation run.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#platforms"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View tested platforms
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/compatibility/media"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Media compatibility
            </Link>
          </div>
        </header>

        {/* Summary strip */}
        <section aria-labelledby="summary" className="flex flex-col gap-4">
          <h2 id="summary" className="sr-only">
            Compatibility summary
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Supported platform families', String(summary.supportedFamilies)],
              ['Named public test devices', String(summary.namedTestDevices)],
              ['Platforms in validation', String(summary.inValidation)],
              ['Planned platforms', String(summary.planned)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[12px] border border-border bg-card p-4">
                <div className="text-2xl font-bold tracking-tight text-foreground">{v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Support status is based on the exact hardware, firmware, runtime and test profile
            listed below. Last reviewed {summary.lastReviewed}.
          </p>
        </section>

        {/* Status legend */}
        <section aria-labelledby="statuses" className="flex flex-col gap-4">
          <SectionHeading id="statuses">How to read the statuses</SectionHeading>
          <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {(Object.keys(COMPATIBILITY_STATUS_LABELS) as CompatibilityStatus[]).map((s) => (
              <div key={s} className="rounded-[12px] border border-border bg-card p-4">
                <dt>
                  <StatusChip status={s} />
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">
                  {COMPATIBILITY_STATUS_DEFINITIONS[s]}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Platform overview cards */}
        <section aria-labelledby="platforms-heading" className="flex flex-col gap-5">
          <h2
            id="platforms"
            className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            <span id="platforms-heading">Platforms</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PLATFORMS.map((p) => (
              <div key={p.id} className="flex flex-col gap-4 rounded-[12px] border border-border bg-card p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{p.name}</h3>
                  <StatusChip status={p.status} />
                </div>
                <p className="text-sm text-muted-foreground">{p.summary}</p>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-32 shrink-0 font-medium text-foreground">Scope</dt>
                    <dd className="text-muted-foreground">
                      {p.scope.length > 0 ? p.scope.join(' · ') : 'Not yet published'}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-32 shrink-0 font-medium text-foreground">Tested models</dt>
                    <dd className="text-muted-foreground">
                      {p.testedModels.length > 0
                        ? p.testedModels.join(', ')
                        : p.status === 'planned'
                          ? 'Not applicable yet'
                          : 'No public test model recorded'}
                    </dd>
                  </div>
                  {p.runtimeVersion && (
                    <div className="flex gap-2">
                      <dt className="w-32 shrink-0 font-medium text-foreground">Runtime</dt>
                      <dd className="text-muted-foreground">{p.runtimeVersion}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="w-32 shrink-0 font-medium text-foreground">Key limitation</dt>
                    <dd className="text-muted-foreground">{p.keyLimitation}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-32 shrink-0 font-medium text-foreground">Last reviewed</dt>
                    <dd className="text-muted-foreground">{COMPATIBILITY_LAST_REVIEWED}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                  {p.status !== 'planned' && (
                    <a
                      href={`#platform-${p.id}`}
                      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      View compatibility
                    </a>
                  )}
                  {(p.primaryCta.external || isRouteEnabled(p.primaryCta.href)) && (
                    <CtaLink link={p.primaryCta} primary={p.status === 'planned'} />
                  )}
                  {p.secondaryCta && <CtaLink link={p.secondaryCta} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform detail sections */}
        <section aria-labelledby="details" className="flex flex-col gap-12">
          <SectionHeading id="details">Platform details</SectionHeading>
          {PLATFORMS.map((p) => (
            <PlatformDetailSection key={p.id} platform={p} />
          ))}
        </section>

        {/* Consolidated device validation matrix */}
        <section aria-labelledby="matrix" className="flex flex-col gap-4">
          <SectionHeading id="matrix">Device validation matrix</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            Exact device combinations with completed, publicly recorded validation evidence. Only
            combinations with recorded evidence are listed. Supported platforms without completed
            validation remain in their platform sections above.
          </p>
          <ScrollTable
            caption="Validated device combinations across platforms"
            head={[
              'Platform',
              'OS / series',
              'Exact device',
              'Firmware / OS build',
              'Runtime',
              'Validation date',
              'Pairing',
              'Playback',
              'Offline',
              'Recovery',
              'Media profile',
              'Status',
            ]}
            rows={
              VALIDATED_COMBINATIONS.length > 0
                ? VALIDATED_COMBINATIONS.map((c) => [
                    c.platform,
                    c.group,
                    c.model,
                    c.firmware,
                    c.runtime,
                    c.validationDate,
                    c.pairing,
                    c.playback,
                    c.offline,
                    c.recovery,
                    c.mediaProfile,
                    <StatusChip status={c.status} />,
                  ])
                : [
                    [
                      <span className="text-muted-foreground" key="empty">
                        No public exact-combination validation result has been recorded yet. Results
                        will be published here as the validation programme completes.
                      </span>,
                      ...Array.from({ length: 11 }, () => ''),
                    ],
                  ]
            }
            minWidth={1200}
          />
        </section>

        {/* Known limitations */}
        <section aria-labelledby="limitations" className="flex flex-col gap-6">
          <SectionHeading id="limitations">Known limitations</SectionHeading>
          {limitationPlatforms.map((p) => (
            <div key={p.id} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
              <ScrollTable
                caption={`Known limitations for ${p.name}`}
                head={['Category', 'Affected scope', 'Firmware', 'Symptom or constraint', 'Workaround', 'Status', 'Last reviewed']}
                rows={p.limitations.map((l) => [
                  <span className="font-medium text-foreground">{l.category}</span>,
                  l.scope,
                  l.firmware,
                  l.symptom,
                  l.workaround,
                  l.status,
                  COMPATIBILITY_LAST_REVIEWED,
                ])}
                minWidth={1000}
              />
            </div>
          ))}
        </section>

        {/* Validation methodology */}
        <section aria-labelledby="methodology" className="flex flex-col gap-4">
          <SectionHeading id="methodology">How TomorrowOS validates a platform</SectionHeading>
          <ol className="grid max-w-[760px] list-decimal grid-cols-1 gap-1.5 pl-5 text-muted-foreground">
            {METHODOLOGY.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            A platform is not considered fully validated solely because the application starts
            successfully.
          </p>
          <p className="text-muted-foreground">
            Media profiles are covered separately in{' '}
            <Link
              href="/compatibility/media"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              media compatibility
            </Link>
            .
          </p>
        </section>

        {/* Pre-deployment checklist */}
        <section aria-labelledby="checklist" className="flex flex-col gap-4 rounded-[12px] border border-border bg-[#fcfcfc] p-6 md:p-8">
          <SectionHeading id="checklist">Before deploying TomorrowOS on a new device</SectionHeading>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {CHECKLIST.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[11px] font-semibold text-foreground"
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <CtaLink link={{ label: 'Start building', href: '/start', external: false }} primary />
            <CtaLink link={{ label: 'Media compatibility', href: '/compatibility/media', external: false }} />
          </div>
        </section>
      </div>
    </div>
  );
}
