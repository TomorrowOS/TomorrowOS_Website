import {
  SectionHeading,
  SubHeading,
  P,
  UL,
} from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramNode,
  DiagramArrow,
  DiagramFlow,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';

/**
 * Article sections: Device pairing → Remote commands.
 * Copy is the supplied editorial source of truth — do not reword.
 */
export function SectionsRuntime() {
  return (
    <>
      {/* ------------------------------------------ Device pairing */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="device-pairing">Device pairing</SectionHeading>
        <P>Pairing establishes trust between a physical device and an organisation.</P>
        <P>A common flow is:</P>
        <div className="max-w-[460px]">
          <ArticleDiagram
            alt="Sequence showing how a digital signage player is securely paired with an organisation."
            caption="The pairing sequence: a short-lived code links the physical player to the correct organisation before permanent credentials are issued."
          >
            <DiagramFlow
              steps={[
                'Player starts',
                'Requests temporary pairing session',
                'Server returns short-lived code',
                'Code appears on screen',
                'Operator enters code in CMS',
                'Server confirms organisation ownership',
                'Permanent device identity is issued',
                'Device becomes managed',
              ]}
            />
          </ArticleDiagram>
        </div>
        <P>Pairing performs several jobs:</P>
        <UL>
          <li>prevents unauthorised devices from joining;</li>
          <li>assigns ownership;</li>
          <li>creates a long-term identity;</li>
          <li>provides credentials;</li>
          <li>connects the physical screen to the correct tenant.</li>
        </UL>
        <P>A pairing code should be:</P>
        <UL>
          <li>temporary;</li>
          <li>difficult to guess at scale;</li>
          <li>single-use;</li>
          <li>invalid after expiry;</li>
          <li>bound to a specific session.</li>
        </UL>
        <P>
          The permanent credentials should not be exposed in the user-facing pairing code.
        </P>
      </section>

      {/* ------------------------------------------ Device identity */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="device-identity-and-lifecycle">
          Device identity and lifecycle
        </SectionHeading>
        <P>Once paired, a device needs a durable identity.</P>
        <P>That identity should normally survive:</P>
        <UL>
          <li>normal reboots;</li>
          <li>network interruptions;</li>
          <li>content updates;</li>
          <li>runtime restarts.</li>
        </UL>
        <P>The system must also support deliberate lifecycle actions:</P>
        <UL>
          <li>unpair;</li>
          <li>replace hardware;</li>
          <li>transfer location;</li>
          <li>reset credentials;</li>
          <li>decommission;</li>
          <li>reprovision.</li>
        </UL>
        <P>Treating a device as a permanent operational asset makes fleet management easier.</P>
        <P>
          Avoid generating a new record after every reinstall unless the user explicitly intends
          to register a replacement device.
        </P>
      </section>

      {/* ------------------------------------------ Content delivery */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="content-delivery">Content delivery</SectionHeading>
        <P>
          Publishing should not mean immediately switching playback to a file that may still be
          downloading.
        </P>
        <P>A safer sequence is:</P>
        <div className="max-w-[460px]">
          <ArticleDiagram
            alt="Flow showing content being verified locally before a new playlist becomes active."
            caption="The content delivery lifecycle: downloads are completed and verified before the new policy activates."
          >
            <DiagramFlow
              steps={[
                'Policy updated',
                'Player receives new manifest',
                'Player compares required assets',
                'Missing assets enter download queue',
                'Files download to temporary storage',
                'Integrity is checked',
                'Assets move into active storage',
                'New policy becomes eligible',
                'Playback switches safely',
              ]}
            />
          </ArticleDiagram>
        </div>
        <P>This prevents:</P>
        <UL>
          <li>partially downloaded files;</li>
          <li>missing playlist items;</li>
          <li>broken transitions;</li>
          <li>blank screens after publication.</li>
        </UL>
        <P>
          The player should activate a new playlist only when the required content is ready or
          an explicit fallback policy allows partial availability.
        </P>
        <ArticleCallout kind="important">
          A file should become active only after its download and integrity checks have
          completed.
        </ArticleCallout>
      </section>

      {/* ------------------------------------------ Content manifests */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="content-manifests">Content manifests</SectionHeading>
        <P>
          Rather than sending every playlist definition and file repeatedly, the server can
          provide a versioned manifest.
        </P>
        <P>A manifest may describe:</P>
        <UL>
          <li>assigned policy;</li>
          <li>playlist version;</li>
          <li>required assets;</li>
          <li>asset versions;</li>
          <li>checksums;</li>
          <li>schedules;</li>
          <li>fallback behaviour;</li>
          <li>expiry or refresh rules.</li>
        </UL>
        <P>The player compares the manifest with local state and downloads only what changed.</P>
        <P>This reduces bandwidth and makes synchronisation easier to reason about.</P>
      </section>

      {/* ------------------------------------------ Scheduling */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="scheduling">Scheduling</SectionHeading>
        <P>Scheduling becomes complex quickly.</P>
        <P>A useful engine may need to support:</P>
        <UL>
          <li>start and end dates;</li>
          <li>times of day;</li>
          <li>days of week;</li>
          <li>recurring schedules;</li>
          <li>screen groups;</li>
          <li>locations;</li>
          <li>priority;</li>
          <li>overrides;</li>
          <li>emergency messaging;</li>
          <li>fallback playlists;</li>
          <li>time zones;</li>
          <li>daylight-saving changes.</li>
        </UL>
        <P>A schedule should produce a deterministic result.</P>
        <P>Given the same:</P>
        <UL>
          <li>current time;</li>
          <li>device;</li>
          <li>assignments;</li>
          <li>policies;</li>
        </UL>
        <P>the system should consistently determine the same active content.</P>
        <P>Ambiguous priority rules create support problems.</P>
        <P>
          A simple explicit model is often better than a highly flexible system nobody can
          predict.
        </P>
      </section>

      {/* ------------------------------------------ Player runtime */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="the-player-runtime">The player runtime</SectionHeading>
        <P>
          The on-device runtime is one of the most important parts of the entire platform.
        </P>
        <P>It is responsible for turning server intent into reliable local playback.</P>
        <P>Typical runtime components include:</P>
        <div className="max-w-[480px]">
          <DiagramPanel
            title="Runtime"
            items={[
              'Device identity',
              'Server connection',
              'Synchronisation engine',
              'Download manager',
              'Local database',
              'File storage',
              'Scheduler',
              'Playback engine',
              'Command handler',
              'Telemetry',
              'Recovery supervisor',
            ]}
          />
        </div>
        <P>The runtime must continue operating independently when the server is unavailable.</P>
        <P>This is where a prototype becomes infrastructure.</P>
      </section>

      {/* ------------------------------------------ Local state */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="local-state">Local state</SectionHeading>
        <P>The player needs to remember:</P>
        <UL>
          <li>device identity;</li>
          <li>credentials;</li>
          <li>current policy;</li>
          <li>downloaded assets;</li>
          <li>asset versions;</li>
          <li>active playlist;</li>
          <li>schedule state;</li>
          <li>pending downloads;</li>
          <li>last server connection;</li>
          <li>command results;</li>
          <li>runtime configuration.</li>
        </UL>
        <P>That state should be stored deliberately.</P>
        <P>
          If all local state disappears after a restart, the player may become unusable during a
          network outage.
        </P>
        <P>The system should also handle corrupt state safely, ideally with:</P>
        <UL>
          <li>validation;</li>
          <li>backups;</li>
          <li>atomic writes;</li>
          <li>recovery defaults;</li>
          <li>a known-good configuration.</li>
        </UL>
      </section>

      {/* ------------------------------------------ Offline playback */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="offline-playback">Offline playback</SectionHeading>
        <P>
          Professional digital signage should not stop when the internet connection fails.
        </P>
        <P>A reliable offline lifecycle looks like:</P>
        <div className="max-w-[460px]">
          <ArticleDiagram
            alt="Flow showing a signage player continuing playback offline and synchronising after reconnecting."
            caption="The offline lifecycle: cached playback continues through the outage, then only changed content downloads after reconnection."
          >
            <DiagramFlow
              steps={[
                'Connected',
                'Content synchronised',
                'Network unavailable',
                'Player detects disconnection',
                'Existing local policy remains active',
                'Cached content continues playing',
                'Player retries connection',
                'Network restored',
                'Player reconciles state',
                'Only changed content downloads',
              ]}
            />
          </ArticleDiagram>
        </div>
        <P>Offline playback requires more than caching files.</P>
        <P>The device also needs:</P>
        <UL>
          <li>its current schedule;</li>
          <li>playlist structure;</li>
          <li>policy rules;</li>
          <li>timestamps;</li>
          <li>local clock handling;</li>
          <li>fallback behaviour;</li>
          <li>sufficient storage.</li>
        </UL>
        <P>
          If the player knows only which URL to request next, it is not truly offline-capable.
        </P>
      </section>

      {/* ------------------------------------------ Download integrity */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="download-integrity">Download integrity</SectionHeading>
        <P>An interrupted download must not become active content.</P>
        <P>Useful safeguards include:</P>
        <UL>
          <li>temporary filenames;</li>
          <li>file-size checks;</li>
          <li>checksums;</li>
          <li>atomic move into active storage;</li>
          <li>retry limits;</li>
          <li>download resumption where supported;</li>
          <li>failure reporting.</li>
        </UL>
        <P>A player should know the difference between:</P>
        {/* Content states (required structured element). */}
        <ol className="flex max-w-[420px] flex-col gap-1.5" aria-label="Content states">
          {['not downloaded', 'downloading', 'downloaded', 'verified', 'active', 'failed'].map(
            (s, i) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground"
              >
                <span
                  className="w-5 shrink-0 tabular-nums text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {s}
              </li>
            ),
          )}
        </ol>
        <P>Without those states, operational diagnostics become difficult.</P>
      </section>

      {/* ------------------------------------------ Recovery */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="recovery">Recovery</SectionHeading>
        <P>Failures are inevitable.</P>
        <P>The system should plan for:</P>
        <UL>
          <li>power loss;</li>
          <li>network interruption;</li>
          <li>storage exhaustion;</li>
          <li>corrupted downloads;</li>
          <li>application crashes;</li>
          <li>firmware differences;</li>
          <li>expired credentials;</li>
          <li>invalid policies;</li>
          <li>failed updates.</li>
        </UL>
        <P>Recovery behaviour may include:</P>
        <UL>
          <li>restarting the playback process;</li>
          <li>reconnecting to the server;</li>
          <li>falling back to a previous policy;</li>
          <li>removing an invalid asset;</li>
          <li>reporting diagnostic information;</li>
          <li>restarting the device where supported.</li>
        </UL>
        <P>
          The goal is not to pretend failures never occur. The goal is to recover without
          requiring someone to visit the screen.
        </P>
      </section>

      {/* ------------------------------------------ Telemetry */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="telemetry">Telemetry</SectionHeading>
        <P>Telemetry allows the CMS to understand what is happening across the fleet.</P>
        <P>Useful fields include:</P>
        <UL>
          <li>connection state;</li>
          <li>last heartbeat;</li>
          <li>runtime version;</li>
          <li>firmware or OS version;</li>
          <li>available storage;</li>
          <li>active policy;</li>
          <li>active media;</li>
          <li>download state;</li>
          <li>recent error;</li>
          <li>uptime;</li>
          <li>last reboot;</li>
          <li>network information.</li>
        </UL>
        <P>Telemetry should answer operational questions, not merely generate data.</P>
        <P>A useful screen-health view should help an operator determine:</P>
        <UL>
          <li>Is the player connected?</li>
          <li>Is it playing the expected content?</li>
          <li>Is it running the expected software?</li>
          <li>Is storage becoming full?</li>
          <li>Does anyone need to act?</li>
        </UL>
      </section>

      {/* ------------------------------------------ Remote commands */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="remote-commands">Remote commands</SectionHeading>
        <P>Common device commands include:</P>
        <UL>
          <li>restart runtime;</li>
          <li>reboot device;</li>
          <li>refresh content;</li>
          <li>request synchronisation;</li>
          <li>clear selected cache;</li>
          <li>capture screenshot;</li>
          <li>collect logs;</li>
          <li>request diagnostics;</li>
          <li>update configuration.</li>
        </UL>
        <P>Commands should have clear states:</P>
        {/* Command lifecycle (required structured element). */}
        <div className="max-w-[360px]">
          <ArticleDiagram
            alt="Command lifecycle from creation through queueing and delivery to completion or failure."
            caption="The command lifecycle: every state is recorded so operators can see exactly where a command stopped."
          >
            <DiagramNode>Created</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Queued</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Delivered</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Acknowledged</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Completed or failed</DiagramNode>
          </ArticleDiagram>
        </div>
        <P>Devices may be offline when a command is issued.</P>
        <P>The server must decide:</P>
        <UL>
          <li>whether the command waits;</li>
          <li>how long it remains valid;</li>
          <li>whether it can be retried;</li>
          <li>whether duplicate execution is safe.</li>
        </UL>
        <P>
          A reboot command, for example, should not execute repeatedly because acknowledgements
          were lost.
        </P>
      </section>
    </>
  );
}
