import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { usePageSeo } from '@/hooks/use-page-seo';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seoConfig';
import { siteConfig } from '@/config/site';
import { CopyActionBlock } from '@/components/CopyActionBlock';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Learn article: BrightSign digital signage player support (evidence-led).
 *
 * Every compatibility claim on this page is backed by one of:
 * - the public TomorrowOS_BrightSign repository (code or README),
 * - the public TomorrowOS documentation (docs/os/brightsign, docs/testing/certification).
 * Provisional internal claims that could not be verified publicly (e.g. named
 * test models) are deliberately excluded pending sign-off. Page remains
 * noindex until the claims pass human technical review.
 */

const BRIGHTSIGN_REPO = 'https://github.com/TomorrowOS/TomorrowOS_BrightSign';
const BRIGHTSIGN_DOCS = 'https://docs.tomorrowos.org/docs/os/brightsign';
const CERTIFICATION_DOCS = 'https://docs.tomorrowos.org/docs/testing/certification';
const LAST_REVIEWED = '3 August 2026';

function ExtLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
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

function IntLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
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

/** Accessible responsive table: scrolls horizontally inside its own container at narrow widths. */
function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="w-full overflow-x-auto rounded-[12px] border border-border" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[560px] border-collapse text-sm">
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

const FAQ_ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Which BrightSign series does TomorrowOS support?',
    a: 'TomorrowOS targets BrightSign Series 3 through Series 6. Supported means the runtime is designed for that player generation — it does not mean every model and firmware build in the series has been physically tested.',
  },
  {
    q: 'Is every BrightSign model certified?',
    a: 'No. Validation is model- and firmware-specific. A combination is only treated as certified after it has completed the documented validation workflow on that exact player and OS build.',
  },
  {
    q: 'What firmware does Series 3 require?',
    a: 'Field testing found that Series 3 players need BrightSign OS 9.1.140 or newer in the 9.1 line for reliable video playback. Upgrade the firmware before relying on video playlists.',
  },
  {
    q: 'Does TomorrowOS support 4K video on Series 3?',
    a: 'No. 4K H.264 is a Series 3 hardware limitation — it remains unreliable even after upgrading to 9.1.140+. Use validated 1080p H.264 media on Series 3.',
  },
  {
    q: 'Which BrightSign players have been physically tested?',
    a: 'Public test evidence currently exists at series level: Series 3 video and firmware behaviour was established in field testing, and a Series 5 rendering issue was found and fixed in the player code. Exact tested model numbers and OS builds have not yet been published, so treat individual models as requiring validation.',
  },
  {
    q: 'Does the player continue working offline?',
    a: 'The player caches downloaded media on the SD card and keeps resume state, and the documented validation workflow includes offline replay after disconnect. Confirm offline behaviour on your exact model and firmware as part of validation.',
  },
  {
    q: 'How is the TomorrowOS player installed?',
    a: 'You copy the player bundle to the root of an SD card, set the CMS endpoint and orientation in a config file, insert the card and power-cycle the player. It then shows a six-character pairing code to enter in your CMS. The step-by-step guide lives in the documentation.',
  },
  {
    q: 'Where can I report a model or firmware issue?',
    a: 'Open an issue on the TomorrowOS BrightSign repository on GitHub with the exact model, BrightSign OS build and symptom.',
  },
];

export default function BrightSignPlayerArticle() {
  usePageSeo('/learn/brightsign-digital-signage-player');

  return (
    <div className="w-full">
      <JsonLd
        id="breadcrumbs"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Learn', item: absoluteUrl('/learn') },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'BrightSign',
              item: absoluteUrl('/learn/brightsign-digital-signage-player'),
            },
          ],
        }}
      />

      <div className="w-full px-4 pt-8 md:px-8">
        <div className="mx-auto max-w-[880px]">
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
                  <Link href="/learn">Learn</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>BrightSign</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <article className="mx-auto flex max-w-[880px] flex-col gap-12 px-4 py-10 md:px-8 md:py-14">
        {/* 2. Hero */}
        <header className="flex flex-col gap-5">
          <span className="inline-flex h-6 w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 text-xs font-medium text-blue-800">
            Platform Validation
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.1]">
            BrightSign digital signage player support
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            TomorrowOS provides an open-source player for BrightSign{' '}
            <strong className="font-semibold text-foreground">Series 3–6</strong>. Supported
            series and physically tested hardware are not the same thing: support is validated
            per exact model, BrightSign OS build and media profile. Two constraints matter most
            today — Series 3 needs{' '}
            <strong className="font-semibold text-foreground">BrightSign OS 9.1.140 or newer</strong>{' '}
            for reliable video playback, and{' '}
            <strong className="font-semibold text-foreground">4K H.264 is not supported on Series 3</strong>{' '}
            (a hardware limit; use 1080p H.264 there).
          </p>
          <p className="text-sm text-muted-foreground">
            Published by TomorrowOS · Last reviewed {LAST_REVIEWED}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={BRIGHTSIGN_DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View installation guide
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <a
              href={BRIGHTSIGN_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore the BrightSign repository
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </header>

        {/* 3. Compatibility summary */}
        <section aria-labelledby="summary" className="flex flex-col gap-4">
          <SectionHeading id="summary">Compatibility summary</SectionHeading>
          <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ['Supported scope', 'BrightSign Series 3–6'],
              ['Series 3 minimum firmware', 'BrightSign OS 9.1.140+ for video playback'],
              ['Known media limit', 'No 4K H.264 on Series 3 (hardware)'],
              ['Validation', 'Model- and firmware-specific'],
            ].map(([k, v]) => (
              <li key={k} className="rounded-[12px] border border-border bg-card p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</div>
                <div className="mt-1 text-sm font-medium text-foreground">{v}</div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Exact tested model numbers and OS builds have not yet been published in the public
            validation data, so this page states support at series level and marks individual
            combinations as requiring validation.
          </p>
        </section>

        {/* 4. Labels */}
        <section aria-labelledby="labels" className="flex flex-col gap-4">
          <SectionHeading id="labels">Understand the compatibility labels</SectionHeading>
          <p className="text-muted-foreground">
            Series-level support does not certify every model, firmware build or media
            combination. This page uses the following terms precisely:
          </p>
          <dl className="flex flex-col gap-3">
            {[
              ['Supported', 'A player generation the TomorrowOS runtime is designed to support.'],
              ['Tested', 'An exact model that has been run through physical TomorrowOS testing.'],
              ['Firmware validated', 'An exact BrightSign OS build that has completed the validation workflow.'],
              ['Media certified', 'A media profile that has passed defined playback and recovery testing on a specific model and firmware.'],
              ['Requires validation', 'Within supported scope, but no completed public test result exists for the combination.'],
              ['Unsupported', 'Known not to work — for example a hardware limitation.'],
            ].map(([term, def]) => (
              <div key={term} className="rounded-[12px] border border-border bg-card p-4">
                <dt className="text-sm font-semibold text-foreground">{term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{def}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 5. Hardware and firmware matrix */}
        <section aria-labelledby="matrix" className="flex flex-col gap-4">
          <SectionHeading id="matrix">Hardware and firmware matrix</SectionHeading>
          <p className="text-muted-foreground">
            Only findings that can be verified from the public repository and documentation are
            shown. Where no exact physical test is publicly recorded, the row says so.
          </p>
          <DataTable
            caption="BrightSign hardware and firmware compatibility by series"
            head={['Series', 'Exact tested model', 'Firmware / OS build', 'Runtime result', 'Playback result', 'Status', 'Notes']}
            rows={[
              [
                'Series 3',
                'No public test model recorded',
                '9.1.140+ required for video',
                'Field-tested at series level',
                'Video reliable on 9.1.140+; 1080p H.264 recommended',
                'Requires validation (per model)',
                '4K H.264 unsupported — hardware limit',
              ],
              [
                'Series 4',
                'No public test model recorded',
                'No public tested build',
                'In supported scope',
                'Not publicly tested',
                'Requires validation',
                'Series-level support claim only',
              ],
              [
                'Series 5',
                'No public test model recorded',
                'No public tested build',
                'Physical testing evidenced by a Series 5 rendering fix in the player code',
                'Not publicly certified',
                'Requires validation (per model)',
                'Inflated-viewport layout issue found and corrected in the runtime',
              ],
              [
                'Series 6',
                'No public test model recorded',
                'No public tested build',
                'In supported scope',
                'Not publicly tested',
                'Requires validation',
                'Series-level support claim only',
              ],
            ]}
          />
        </section>

        {/* 6. Runtime responsibilities */}
        <section aria-labelledby="runtime" className="flex flex-col gap-4">
          <SectionHeading id="runtime">What the TomorrowOS BrightSign player handles</SectionHeading>
          <h3 className="text-lg font-semibold text-foreground">Confirmed in code and documentation</h3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li>CMS connection over WebSocket, with a connection watchdog and automatic retry every 5 seconds until connected.</li>
            <li>Device pairing with a six-character code shown on screen, plus resume and safe re-pair after reconnection.</li>
            <li>Content download over HTTP/HTTPS with media cached on the SD card (under <code className="rounded bg-muted px-1 py-0.5 text-xs">downloads/tomorrowos/</code>).</li>
            <li>Policy-driven playlist playback: images and HTML layers, plus hardware video via dual video-player slots with black-gap avoidance between items.</li>
            <li>Widget packages (.zip) downloaded, extracted locally and rendered in an iframe.</li>
            <li>Remote commands: device info, capability query, reboot, set content policy, clear content, and screen capture.</li>
            <li>Recovery behaviour: resume state saved before reboot, reconnect handling, and device log/error reporting back to the CMS.</li>
            <li>Portrait playback via CSS rotation with matching hardware-video transforms.</li>
          </ul>
          <h3 className="text-lg font-semibold text-foreground">Partial or conditional</h3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li>Display on/off scheduling — implemented as a display-mute style schedule and only available where the player exposes the required API.</li>
            <li>Offline playback — caching and resume logic exist in the player, and offline replay is part of the documented validation workflow; confirm it on your exact model and firmware.</li>
          </ul>
          <h3 className="text-lg font-semibold text-foreground">Not publicly verified</h3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li>Synchronised multi-player playback.</li>
            <li>GPIO, serial and BrightSign peripheral integrations.</li>
            <li>4K media profiles on Series 4–6.</li>
          </ul>
        </section>

        {/* 7. Installation overview */}
        <section aria-labelledby="install" className="flex flex-col gap-4">
          <SectionHeading id="install">Installation overview</SectionHeading>
          <p className="text-muted-foreground">
            The high-level flow below is verified against the repository and documentation. The
            detailed, current implementation steps live in the{' '}
            <ExtLink href={BRIGHTSIGN_DOCS}>BrightSign installation documentation</ExtLink>.
          </p>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground">
            <li>Obtain the TomorrowOS BrightSign player bundle — from your CMS control panel where offered, or built from the open-source repository.</li>
            <li>Set the CMS endpoint and orientation in <code className="rounded bg-muted px-1 py-0.5 text-xs">config.js</code> (there is no on-device setup screen in the current BrightSign build).</li>
            <li>Copy the bundle contents to the <strong className="font-medium text-foreground">root</strong> of an SD card — including <code className="rounded bg-muted px-1 py-0.5 text-xs">autorun.brs</code> — with no competing autorun files from previous provisioning.</li>
            <li>Insert the card and fully power-cycle the player.</li>
            <li>Wait for first boot: a black screen for roughly 10 seconds before the player appears is normal.</li>
            <li>Record the six-character pairing code shown on screen.</li>
            <li>Enter the code in your TomorrowOS CMS to pair the player. Re-pairing and reconnection restore the device without reinstalling.</li>
            <li>Publish a small image and video playlist, then verify content sync and offline storage.</li>
          </ol>
          <CopyActionBlock
            type="code"
            label="config.js — CMS endpoint and orientation"
            value={`window.TOMORROWOS_CONFIG = {\n  cmsEndpoint: "http://192.168.1.105:3000/",\n  orientation: "landscape" // landscape | portrait-right | portrait-left\n};`}
            multiline
            destinationHint="Set cmsEndpoint to a URL the player can reach on your network — never localhost."
            sourceKey="learn-brightsign-configjs"
          />
          <p className="text-sm text-muted-foreground">
            Common first-boot failures: the player files placed in a subfolder instead of the
            card root, leftover provisioning artifacts on the card, a CMS endpoint set to{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">localhost</code>, or Node.js
            support not enabled — which surfaces as an error bar instead of the player.
          </p>
        </section>

        {/* 8. Media support */}
        <section aria-labelledby="media" className="flex flex-col gap-4">
          <SectionHeading id="media">Media support and limitations</SectionHeading>
          <p className="text-muted-foreground">
            The only publicly confirmed media limitation today is Series 3 4K H.264. Generic
            BrightSign hardware specifications are deliberately not used as proof of TomorrowOS
            certification — unverified cells below say “Requires validation”.
          </p>
          <DataTable
            caption="Media profile support by BrightSign series"
            head={['Media profile', 'Series 3', 'Series 4', 'Series 5', 'Series 6', 'Notes / evidence']}
            rows={[
              ['1080p H.264 video', 'Supported on OS 9.1.140+', 'Requires validation', 'Requires validation', 'Requires validation', 'Series 3 result from field testing; recommended Series 3 profile'],
              ['4K H.264 video', 'Unsupported (hardware)', 'Not yet tested', 'Not yet tested', 'Not yet tested', 'Series 3 limit persists even on 9.1.140+'],
              ['Images', 'Requires validation', 'Requires validation', 'Requires validation', 'Requires validation', 'Rendered via HTML layers in the runtime'],
              ['HTML / widget content', 'Requires validation', 'Requires validation', 'Requires validation', 'Requires validation', 'Widget .zip download and local extraction confirmed in code'],
              ['Portrait playback', 'Requires validation', 'Requires validation', 'Requires validation', 'Requires validation', 'CSS rotation + hardware-video transforms implemented in the runtime'],
              ['Offline playback', 'Requires validation', 'Requires validation', 'Requires validation', 'Requires validation', 'SD-card cache and resume logic confirmed in code; part of the validation workflow'],
            ]}
          />
        </section>

        {/* 9. Series 3 guidance */}
        <section aria-labelledby="series3" className="flex flex-col gap-4">
          <SectionHeading id="series3">Series 3 guidance</SectionHeading>
          <p className="text-muted-foreground">Series 3 has the strongest verified constraints:</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li>
              <strong className="font-medium text-foreground">Minimum firmware:</strong>{' '}
              upgrade to BrightSign OS 9.1.140 (or newer in the 9.1 line) before relying on video
              playlists — reliable video playback below that build is not expected.
            </li>
            <li>
              <strong className="font-medium text-foreground">4K H.264:</strong> a hardware
              limitation, not a firmware or playlist issue. It remains unreliable after the
              firmware upgrade.
            </li>
            <li>
              <strong className="font-medium text-foreground">Recommended profile:</strong>{' '}
              validated 1080p H.264 media is the recommended Series 3 pathway.
            </li>
            <li>
              <strong className="font-medium text-foreground">Before publishing video:</strong>{' '}
              check the model and firmware reported by the device, and certify the exact playlist
              on that combination.
            </li>
          </ul>
          <p className="text-muted-foreground">
            Avoid Series 3 for deployments that need 4K output. These findings were established
            at series level in field testing; individual Series 3 models still require their own
            validation run.
          </p>
        </section>

        {/* 10. Known issues */}
        <section aria-labelledby="issues" className="flex flex-col gap-4">
          <SectionHeading id="issues">Known issues and operational notes</SectionHeading>
          <DataTable
            caption="Verified known issues for the TomorrowOS BrightSign player"
            head={['Issue', 'Affected hardware', 'Symptom', 'Workaround', 'Status', 'Last reviewed']}
            rows={[
              [
                'Series 3 video needs firmware 9.1.140+',
                'Series 3',
                'Unreliable video playback on older BrightSign OS builds',
                'Upgrade to 9.1.140 or newer in the 9.1 line',
                'Confirmed (field testing)',
                LAST_REVIEWED,
              ],
              [
                'Series 3 4K H.264 unsupported',
                'Series 3',
                '4K H.264 playback unreliable regardless of firmware',
                'Use 1080p H.264 media',
                'Confirmed hardware limit',
                LAST_REVIEWED,
              ],
              [
                'Series 5 inflated browser viewport',
                'Series 5',
                'Player UI positioned off-screen / blank areas',
                'Fixed in the current player runtime (layout correction applied automatically)',
                'Fixed in player code',
                LAST_REVIEWED,
              ],
              [
                'HDMI/CEC black screen with some TVs',
                'Any series on consumer TVs',
                'TV alternates between black and its home/input screen',
                'Disable HDMI-CEC (e.g. Anynet+) on the TV input; verify on a monitor first',
                'Documented workaround',
                LAST_REVIEWED,
              ],
              [
                'Boot loop from leftover provisioning files',
                'Any series',
                'Player loops or never shows the TomorrowOS UI',
                'Keep only one autorun file; remove old provisioning artifacts; factory-reset previously provisioned players',
                'Documented workaround',
                LAST_REVIEWED,
              ],
              [
                'CMS endpoint set to localhost',
                'Any series',
                'Pairing and WebSocket connection fail',
                'Use a LAN IP, tunnel or public HTTPS URL the player can reach',
                'Documented configuration rule',
                LAST_REVIEWED,
              ],
              [
                'Node.js support not enabled',
                'Any series',
                'Error bar on boot instead of the player UI',
                'Use the shipped autorun file, which enables Node.js and BrightSign JS objects',
                'Documented requirement',
                LAST_REVIEWED,
              ],
            ]}
          />
        </section>

        {/* 11. Not yet certified */}
        <section aria-labelledby="gaps" className="flex flex-col gap-4">
          <SectionHeading id="gaps">What is not yet certified</SectionHeading>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li>Exact tested model numbers and BrightSign OS builds — physical testing exists at series level, but named public results are not yet published.</li>
            <li>Any Series 4 physical test device.</li>
            <li>4K media profiles on Series 4–6.</li>
            <li>Codecs beyond H.264 in the public test evidence.</li>
            <li>Synchronised multi-player playback.</li>
            <li>GPIO, serial and BrightSign peripheral integrations.</li>
          </ul>
          <p className="rounded-[12px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Support is validated by exact player, OS build and media profile. Combinations not
            listed above should be tested before production deployment.
          </p>
        </section>

        {/* 12. Validation methodology */}
        <section aria-labelledby="methodology" className="flex flex-col gap-4">
          <SectionHeading id="methodology">Validation methodology</SectionHeading>
          <p className="text-muted-foreground">
            Compatibility is established per exact player, OS build and media profile:
          </p>
          <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-muted-foreground">
            <li>Record the model and BrightSign OS build.</li>
            <li>Install the exact runtime version.</li>
            <li>Confirm the server connection.</li>
            <li>Pair the player.</li>
            <li>Sync content.</li>
            <li>Test playback.</li>
            <li>Disconnect the network.</li>
            <li>Confirm offline playback.</li>
            <li>Restore the network and confirm recovery.</li>
            <li>Restart the player and confirm automatic recovery.</li>
            <li>Test representative media profiles.</li>
            <li>Record evidence and limitations.</li>
          </ol>
          <p className="text-muted-foreground">
            The full workflow is documented in the{' '}
            <ExtLink href={CERTIFICATION_DOCS}>certification testing guide</ExtLink>. Current
            status pages: <IntLink href="/compatibility">platform compatibility</IntLink> and{' '}
            <IntLink href="/compatibility/media">media compatibility</IntLink>.
          </p>
        </section>

        {/* 13. FAQ */}
        <section aria-labelledby="faq" className="flex flex-col gap-4">
          <SectionHeading id="faq">Frequently asked questions</SectionHeading>
          <dl className="flex flex-col gap-5">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-foreground">{q}</dt>
                <dd className="mt-1.5 text-muted-foreground">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 14. Related resources */}
        <section aria-labelledby="related" className="flex flex-col gap-4">
          <SectionHeading id="related">Related resources</SectionHeading>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            <li><IntLink href="/learn">Developer Resource Centre</IntLink></li>
            <li><IntLink href="/compatibility">Platform compatibility</IntLink></li>
            <li><IntLink href="/compatibility/media">Media compatibility</IntLink></li>
            <li><ExtLink href={BRIGHTSIGN_DOCS}>BrightSign installation documentation</ExtLink></li>
            <li><ExtLink href={BRIGHTSIGN_REPO}>TomorrowOS BrightSign repository on GitHub</ExtLink></li>
            <li><IntLink href="/start">Start building</IntLink></li>
            <li><ExtLink href={siteConfig.links.docs}>TomorrowOS documentation</ExtLink></li>
          </ul>
        </section>

        {/* 15. Closing CTA */}
        <section aria-labelledby="closing" className="flex flex-col gap-5 rounded-[12px] border border-border bg-[#fcfcfc] p-6 md:p-8">
          <h2 id="closing" className="text-2xl font-bold tracking-tight text-foreground">
            Build for BrightSign with verified constraints
          </h2>
          <p className="max-w-[560px] text-muted-foreground">
            Validate your exact player, firmware and media profile before production deployment —
            support is proven per combination, not assumed per series.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={BRIGHTSIGN_DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View the installation guide
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
            <Link
              href="/compatibility"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore compatibility
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={BRIGHTSIGN_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              View source on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}
