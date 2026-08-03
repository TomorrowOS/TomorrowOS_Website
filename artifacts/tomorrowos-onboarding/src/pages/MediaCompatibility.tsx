import { useMemo, useState } from 'react';
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
  BASELINE_WARNING,
  BRIGHTSIGN_REPO_URL,
  CONTRIBUTION_GUIDELINES,
  DISCUSSIONS_URL,
  DOCS_URL,
  EXCLUDED_CATEGORIES_NOTE,
  getMediaSummary,
  LOOP_BEHAVIOURS,
  LOOPING_CONTEXT_NOTE,
  MEDIA_CATEGORIES,
  MEDIA_CHECKLIST,
  MEDIA_LAST_REVIEWED,
  MEDIA_LIMITATIONS,
  MEDIA_METHODOLOGY,
  MEDIA_STATUS_DEFINITIONS,
  MEDIA_STATUS_LABELS,
  MEDIA_TESTS,
  NOT_RECORDED,
  OFFLINE_DIMENSIONS,
  PLATFORM_BASELINES,
  TEST_RESULT_LABELS,
  TIZEN_REPO_URL,
  type MediaValidationStatus,
} from '@/lib/mediaCompatibility';

/**
 * Media Compatibility Centre (/compatibility/media).
 *
 * All content derives from src/lib/mediaCompatibility.ts — the single typed,
 * evidence-audited data source. Do not hardcode media results in this file.
 */

const STATUS_TONE: Record<MediaValidationStatus, string> = {
  'production-recommended': 'bg-muted text-foreground border-border',
  validated: 'bg-muted text-foreground border-border',
  'tested-with-limitations': 'bg-amber-50 text-amber-800 border-amber-200',
  'runtime-supported': 'bg-blue-50 text-blue-800 border-blue-200',
  'requires-validation': 'bg-amber-50 text-amber-800 border-amber-200',
  unsupported: 'bg-muted text-muted-foreground border-border',
  'not-tested': 'bg-muted text-muted-foreground border-border',
};

function StatusChip({ status }: { status: MediaValidationStatus }) {
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-xs font-medium ${STATUS_TONE[status]}`}
    >
      {MEDIA_STATUS_LABELS[status]}
    </span>
  );
}

function ExtA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      <span className="sr-only"> (opens in a new window)</span>
    </a>
  );
}

function InA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {children}
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

const PrimaryA = 'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const SecondaryA = 'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const ALL = 'all';

/**
 * Tested media library: full semantic table (desktop) + stacked cards
 * (mobile) generated from the same data source, with simple client-side
 * filter controls. The complete dataset always ships in the page; filters
 * are a progressive enhancement and appear only once recorded tests exist.
 */
function TestedMediaLibrary() {
  const [platform, setPlatform] = useState(ALL);
  const [mediaType, setMediaType] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const hasData = MEDIA_TESTS.length > 0;

  const platforms = useMemo(() => [...new Set(MEDIA_TESTS.map((t) => t.platform))], []);
  const filtered = MEDIA_TESTS.filter(
    (t) =>
      (platform === ALL || t.platform === platform) &&
      (mediaType === ALL || t.mediaType === mediaType) &&
      (status === ALL || t.status === status),
  );
  const filtersActive = platform !== ALL || mediaType !== ALL || status !== ALL;

  const selectCls =
    'h-9 rounded-md border border-input bg-background px-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <section aria-labelledby="tested-media-heading" className="flex flex-col gap-4">
      <h2
        id="tested-media"
        className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
      >
        <span id="tested-media-heading">Tested media library</span>
      </h2>
      <p className="max-w-[760px] text-muted-foreground">
        The central evidence table. Every row represents an actual recorded media test tied to the
        exact file profile, device, firmware and TomorrowOS runtime. Unknown values are labelled
        explicitly — never hidden.
      </p>

      {hasData && (
        <div className="flex flex-wrap items-end gap-3" role="group" aria-label="Filter recorded media tests">
          <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
            Platform
            <select className={selectCls} value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value={ALL}>All platforms</option>
              {platforms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
            Media type
            <select className={selectCls} value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
              <option value={ALL}>All media types</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="html">HTML</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
            Status
            <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={ALL}>All statuses</option>
              {(Object.keys(MEDIA_STATUS_LABELS) as MediaValidationStatus[]).map((s) => (
                <option key={s} value={s}>{MEDIA_STATUS_LABELS[s]}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setPlatform(ALL);
              setMediaType(ALL);
              setStatus(ALL);
            }}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Clear filters
          </button>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {filtered.length} of {MEDIA_TESTS.length} recorded tests shown
            {filtersActive ? ' (filters active)' : ''}
          </p>
        </div>
      )}

      {!hasData ? (
        <div className="flex flex-col gap-2 rounded-[12px] border border-border bg-muted/30 p-6">
          <p className="font-medium text-foreground">No public media test has been recorded yet.</p>
          <p className="text-sm text-muted-foreground">
            Both public players are Runtime Supported for images, video and HTML widgets, but no
            exact file, device, firmware and runtime combination has a published test result.
            Recorded tests will appear here — with loop, offline and reboot-recovery results — as
            the media validation programme completes. Until then, treat every exact media profile
            as Requires Validation.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p role="status" className="rounded-[12px] border border-border bg-muted/30 p-6 text-muted-foreground">
          No recorded tests match the selected filters. Clear the filters to see all recorded tests.
        </p>
      ) : (
        <>
          {/* Desktop / tablet: semantic table */}
          <div className="hidden md:block">
            <ScrollTable
              caption="Recorded media tests with exact device, firmware and runtime context"
              head={[
                'Test ID',
                'Media type',
                'Container',
                'Codec',
                'Profile / level',
                'Resolution',
                'Frame rate',
                'Bitrate',
                'Audio',
                'Orientation',
                'Device',
                'Firmware / OS',
                'Runtime',
                'Loop',
                'Offline',
                'Reboot recovery',
                'Status',
                'Last tested',
                'Notes',
              ]}
              rows={filtered.map((t) => [
                <span className="font-medium text-foreground">{t.id}</span>,
                t.mediaType,
                t.container ?? NOT_RECORDED,
                t.codec ?? NOT_RECORDED,
                t.profileLevel ?? NOT_RECORDED,
                t.resolution ?? NOT_RECORDED,
                t.frameRate ?? NOT_RECORDED,
                t.bitrate ?? NOT_RECORDED,
                t.audio ?? NOT_RECORDED,
                t.orientation ?? NOT_RECORDED,
                `${t.platform} · ${t.deviceModel}`,
                t.firmware,
                t.runtimeVersion,
                TEST_RESULT_LABELS[t.looping],
                TEST_RESULT_LABELS[t.offline],
                TEST_RESULT_LABELS[t.rebootRecovery],
                <StatusChip status={t.status} />,
                t.lastTested,
                t.notes,
              ])}
              minWidth={1700}
            />
          </div>
          {/* Mobile: stacked cards from the same data source */}
          <ul className="flex flex-col gap-3 md:hidden">
            {filtered.map((t) => (
              <li key={t.id} className="rounded-[12px] border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">{t.title}</span>
                  <StatusChip status={t.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.platform} · {t.deviceModel} · {t.firmware} · runtime {t.runtimeVersion}
                </p>
                <details className="mt-2 text-sm text-muted-foreground">
                  <summary className="cursor-pointer font-medium text-foreground">Full result</summary>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {(
                      [
                        ['Container', t.container ?? NOT_RECORDED],
                        ['Codec', t.codec ?? NOT_RECORDED],
                        ['Resolution', t.resolution ?? NOT_RECORDED],
                        ['Frame rate', t.frameRate ?? NOT_RECORDED],
                        ['Bitrate', t.bitrate ?? NOT_RECORDED],
                        ['Audio', t.audio ?? NOT_RECORDED],
                        ['Orientation', t.orientation ?? NOT_RECORDED],
                        ['Loop', TEST_RESULT_LABELS[t.looping]],
                        ['Offline', TEST_RESULT_LABELS[t.offline]],
                        ['Reboot recovery', TEST_RESULT_LABELS[t.rebootRecovery]],
                        ['Last tested', t.lastTested],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="font-medium text-foreground">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {t.notes && <p className="mt-2">{t.notes}</p>}
                </details>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default function MediaCompatibility() {
  usePageSeo('/compatibility/media');
  const summary = getMediaSummary();

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
            { '@type': 'ListItem', position: 3, name: 'Media', item: absoluteUrl('/compatibility/media') },
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
                <BreadcrumbLink asChild>
                  <Link href="/compatibility">Compatibility</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Media</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1050px] flex-col gap-14 px-4 py-10 md:px-8 md:py-14">
        {/* Hero */}
        <header className="flex max-w-[820px] flex-col gap-5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            Media compatibility
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            See which media formats and playback profiles have been tested across
            TomorrowOS-supported screen platforms.
          </p>
          <p className="text-muted-foreground">
            A media result is tied to an exact file profile, hardware model, firmware version and
            TomorrowOS runtime — not merely a file extension. The same file can behave differently
            on two devices, or on the same device across firmware builds. Hardware, platform and
            firmware coverage lives on the{' '}
            <InA href="/compatibility">platform compatibility</InA> page; this page records what
            media was tested on those combinations and what happened.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#tested-media" className={PrimaryA}>
              View tested media
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <Link href="/compatibility" className={SecondaryA}>
              Platform compatibility
            </Link>
          </div>
        </header>

        {/* Coverage summary */}
        <section aria-labelledby="summary" className="flex flex-col gap-4">
          <h2 id="summary" className="sr-only">
            Media coverage summary
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Recorded public media tests', String(summary.recordedTests)],
              ['Named test devices', String(summary.namedTestDevices)],
              ['Platform families covered', String(summary.platformFamiliesCovered)],
              ['Open validation gaps', String(summary.openValidationGaps)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[12px] border border-border bg-card p-4">
                <div className="text-2xl font-bold tracking-tight text-foreground">{v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Every result is tied to the device, firmware, runtime and exact media profile shown
            below. Last reviewed {summary.lastReviewed}.
          </p>
        </section>

        {/* Recommended baseline */}
        <section aria-labelledby="baseline" className="flex flex-col gap-4">
          <SectionHeading id="baseline">Recommended baseline</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            No universal media profile has completed public validation yet, so the baselines below
            are platform-specific and documentation-backed rather than validated test results.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PLATFORM_BASELINES.map((b) => (
              <div key={b.platform} className="flex flex-col gap-3 rounded-[12px] border border-border bg-card p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{b.platform}</h3>
                  <StatusChip status={b.status} />
                </div>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm font-medium text-foreground">
                  {b.profile.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{b.basis}</p>
              </div>
            ))}
          </div>
          <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            {BASELINE_WARNING}
          </p>
        </section>

        {/* Status legend */}
        <section aria-labelledby="statuses" className="flex flex-col gap-4">
          <SectionHeading id="statuses">How to read the statuses</SectionHeading>
          <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {(Object.keys(MEDIA_STATUS_LABELS) as MediaValidationStatus[]).map((s) => (
              <div key={s} className="rounded-[12px] border border-border bg-card p-4">
                <dt>
                  <StatusChip status={s} />
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">{MEDIA_STATUS_DEFINITIONS[s]}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted-foreground">
            A manufacturer stating that hardware can decode a format is hardware capability, not
            TomorrowOS validation. Only completed physical or automated tests move a profile to
            Validated or Production Recommended.
          </p>
        </section>

        {/* Category overview */}
        <section aria-labelledby="categories" className="flex flex-col gap-5">
          <SectionHeading id="categories">Media categories</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MEDIA_CATEGORIES.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 rounded-[12px] border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{c.name}</h3>
                  <StatusChip status={c.maturity} />
                </div>
                <dl className="flex flex-col gap-2 text-sm">
                  <div>
                    <dt className="font-medium text-foreground">Recognised formats</dt>
                    <dd className="text-muted-foreground">{c.recognisedFormats.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Safest known profile</dt>
                    <dd className="text-muted-foreground">{c.safestKnownProfile}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Principal limitation</dt>
                    <dd className="text-muted-foreground">{c.principalLimitation}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Recorded test profiles</dt>
                    <dd className="text-muted-foreground">
                      {MEDIA_TESTS.filter((t) => t.mediaType === c.id).length}
                    </dd>
                  </div>
                </dl>
                <a
                  href={`#category-${c.id}`}
                  className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  View details
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{EXCLUDED_CATEGORIES_NOTE}</p>
        </section>

        {/* Tested media library */}
        <TestedMediaLibrary />

        {/* Category details */}
        <section aria-labelledby="category-details" className="flex flex-col gap-10">
          <SectionHeading id="category-details">Category details</SectionHeading>
          {MEDIA_CATEGORIES.map((c) => (
            <section key={c.id} aria-labelledby={`category-${c.id}`} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  id={`category-${c.id}`}
                  className="scroll-mt-24 text-xl font-bold tracking-tight text-foreground md:text-2xl"
                >
                  {c.name}
                </h3>
                <StatusChip status={c.maturity} />
              </div>
              <p className="max-w-[760px] text-muted-foreground">{c.summary}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-[12px] border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Recognised formats
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {c.recognisedFormats.join(' · ')}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.formatCaveat}</p>
                </div>
                <div className="rounded-[12px] border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Principal limitation
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{c.principalLimitation}</p>
                </div>
              </div>
              {c.id === 'video' && (
                <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Video capability varies by exact device, firmware, container, codec profile,
                  bitrate and playback context.
                </p>
              )}
              {c.id === 'html' && (
                <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  A video playing correctly as native media does not guarantee identical behaviour
                  when embedded inside HTML or a third-party widget.
                </p>
              )}
            </section>
          ))}
        </section>

        {/* Orientation */}
        <section aria-labelledby="orientation" className="flex flex-col gap-4">
          <SectionHeading id="orientation">Orientation and canvas</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            Both public players are configured for landscape or portrait operation. On Samsung
            Tizen, orientation (landscape, portrait-right or portrait-left) is chosen during
            on-device setup, and the player coordinates the browser layer with the hardware video
            plane so rotated video renders correctly. On BrightSign, orientation is part of the
            player configuration.
          </p>
          <ul className="flex max-w-[760px] list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
            <li>
              Author content at the panel’s effective resolution for the deployed orientation
              (for example 1080 × 1920 for portrait on a 1080p panel) to avoid scaling surprises.
            </li>
            <li>
              Media is displayed at the configured orientation; square and custom aspect ratios
              have no recorded public test result and should be treated as Requires Validation.
            </li>
            <li>
              Scaling, cropping and letterboxing behaviour for mismatched aspect ratios has no
              published per-device test evidence — validate with your exact content shape.
            </li>
          </ul>
        </section>

        {/* Looping and transitions */}
        <section aria-labelledby="looping" className="flex flex-col gap-4">
          <SectionHeading id="looping">Looping and transitions</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            TomorrowOS treats black gaps — a brief black, blank or frozen frame between items — as
            a player-owned failure mode. Both public players keep the current picture on screen
            until the next item is ready, then hand off.
          </p>
          <ScrollTable
            caption="Transition and loop handling by scenario on Samsung Tizen and BrightSign"
            head={['Scenario', 'Samsung Tizen', 'BrightSign']}
            rows={LOOP_BEHAVIOURS.map((l) => [
              <span className="font-medium text-foreground">{l.scenario}</span>,
              l.tizen,
              l.brightsign,
            ])}
            minWidth={820}
          />
          <p className="text-sm text-muted-foreground">{LOOPING_CONTEXT_NOTE}</p>
        </section>

        {/* Offline and recovery */}
        <section aria-labelledby="offline" className="flex flex-col gap-4">
          <SectionHeading id="offline">Offline playback and recovery</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            Media validation covers more than visible playback: download integrity, local
            persistence, offline playback, reboot while offline, reconnection and content
            reconciliation all form part of the workflow. The table shows the designed behaviour
            and the current public evidence for each dimension.
          </p>
          <ScrollTable
            caption="Offline and recovery dimensions with designed behaviour and public evidence"
            head={['Dimension', 'Designed behaviour', 'Public evidence']}
            rows={OFFLINE_DIMENSIONS.map((d) => [
              <span className="font-medium text-foreground">{d.dimension}</span>,
              d.designedBehaviour,
              d.publicEvidence,
            ])}
            minWidth={820}
          />
          <p className="text-sm text-muted-foreground">
            Where a dimension has not been tested for a given profile, the recorded result reads:
            Not yet validated for this profile.
          </p>
        </section>

        {/* Known limitations */}
        <section aria-labelledby="limitations" className="flex flex-col gap-4">
          <SectionHeading id="limitations">Known media limitations</SectionHeading>
          <ScrollTable
            caption="Known media limitations grouped by area"
            head={['Area', 'Platform', 'Affected scope', 'Firmware', 'Media profile', 'Symptom or restriction', 'Workaround', 'Status', 'Last reviewed']}
            rows={MEDIA_LIMITATIONS.map((l) => [
              <span className="font-medium text-foreground">{l.group}</span>,
              l.platform,
              l.scope,
              l.firmware,
              l.mediaProfile,
              l.symptom,
              l.workaround,
              l.status,
              MEDIA_LAST_REVIEWED,
            ])}
            minWidth={1250}
          />
        </section>

        {/* Methodology */}
        <section aria-labelledby="methodology" className="flex flex-col gap-4">
          <SectionHeading id="methodology">How TomorrowOS validates media</SectionHeading>
          <ol className="grid max-w-[760px] list-decimal grid-cols-1 gap-1.5 pl-5 text-muted-foreground">
            {MEDIA_METHODOLOGY.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            A file is not considered validated solely because it starts playing.
          </p>
        </section>

        {/* Contribute */}
        <section aria-labelledby="contribute" className="flex flex-col gap-4">
          <SectionHeading id="contribute">Help expand the media test library</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            Developers and partners can contribute media profiles and test results through the
            public <ExtA href={DISCUSSIONS_URL}>GitHub Discussions</ExtA>. Include the details
            below so a result can be recorded against the exact combination it was tested on.
          </p>
          <ul className="flex max-w-[760px] list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
            {CONTRIBUTION_GUIDELINES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Do not post proprietary client media publicly — share reproducible sample files instead.
          </p>
        </section>

        {/* Pre-deployment checklist */}
        <section aria-labelledby="checklist" className="flex flex-col gap-4 rounded-[12px] border border-border bg-[#fcfcfc] p-6 md:p-8">
          <SectionHeading id="checklist">Before deploying new media</SectionHeading>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {MEDIA_CHECKLIST.map((item, i) => (
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
        </section>

        {/* Related resources */}
        <section aria-labelledby="resources" className="flex flex-col gap-3">
          <SectionHeading id="resources">Related resources</SectionHeading>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><InA href="/compatibility">Platform compatibility</InA></li>
            <li><InA href="/guides/platforms/samsung-tizen">Samsung Tizen installation guide</InA></li>
            {isRouteEnabled('/learn/brightsign-digital-signage-player') && (
              <li><InA href="/learn/brightsign-digital-signage-player">BrightSign support article</InA></li>
            )}
            <li><InA href="/guides/platforms">Platform guides</InA></li>
            <li><ExtA href={DOCS_URL}>Documentation</ExtA></li>
            <li><ExtA href={TIZEN_REPO_URL}>Tizen player repository</ExtA></li>
            <li><ExtA href={BRIGHTSIGN_REPO_URL}>BrightSign player repository</ExtA></li>
            <li><InA href="/start">Start building</InA></li>
          </ul>
        </section>

        {/* Closing CTA */}
        <section aria-labelledby="closing" className="flex flex-col gap-4">
          <SectionHeading id="closing">Validate your media before deployment</SectionHeading>
          <p className="max-w-[760px] text-muted-foreground">
            Test your exact media files on your actual device and firmware before production
            rollout — a profile that plays on one panel can behave differently on another.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/compatibility" className={PrimaryA}>
              View platform compatibility
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className={SecondaryA}>
              Read the documentation
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className={SecondaryA}>
              Contribute a test result
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
