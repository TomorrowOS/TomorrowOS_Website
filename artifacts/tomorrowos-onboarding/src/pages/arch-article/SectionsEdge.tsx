/**
 * /modern-digital-signage-architecture — sections 08–15 (edge, delivery and
 * device operations). Copy is rendered verbatim from the approved editorial
 * source; do not reword without editorial sign-off.
 */
import { SectionHeading, P, UL, ArticleDataTable } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramFlow,
  DiagramNode,
  DiagramArrow,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';

export function ArchSectionsEdge() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="08" id="the-edge-runtime">
          The edge runtime
        </SectionHeading>
        <P>
          The edge runtime is the on-device software responsible for converting server intent
          into dependable playback.
        </P>
        <P>
          This is the layer most likely to be underestimated by teams approaching signage as a
          normal web application.
        </P>
        <P>A production runtime commonly includes:</P>
        <UL>
          <li>persistent device identity;</li>
          <li>server connection and authentication;</li>
          <li>synchronisation engine;</li>
          <li>manifest processing;</li>
          <li>download manager;</li>
          <li>local database;</li>
          <li>asset storage;</li>
          <li>scheduler or policy evaluator;</li>
          <li>playback engine;</li>
          <li>command handler;</li>
          <li>telemetry and event buffering;</li>
          <li>watchdog and recovery supervisor.</li>
        </UL>
        <P>
          The runtime must continue functioning independently when the network or control plane
          is unavailable. If it requires a live API request to decide what to display next, it
          is not genuinely offline-capable.
        </P>
        <ArticleCallout kind="important">
          The edge runtime is an operational system, not simply a browser pointed at a URL.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="09" id="server-versus-player-responsibility">
          What should live on the server and what should live on the player?
        </SectionHeading>
        <P>
          The right boundary keeps central control without making playback dependent on
          continuous connectivity.
        </P>
        <ArticleDataTable
          caption="Server versus player responsibilities"
          head={['Responsibility', 'Server / control plane', 'Player / edge']}
          minWidth={640}
          rows={[
            ['User authentication', 'Owns users, roles and sessions', 'No user session required for normal playback'],
            ['Device identity', 'Issues and revokes identity', 'Stores identity and credentials locally'],
            ['Policy', 'Defines desired policy', 'Stores and applies the active policy'],
            ['Scheduling', 'Defines rules and assignments', 'Evaluates or applies locally'],
            ['Media', 'Stores origin and metadata', 'Caches verified assets'],
            ['Playback', 'Does not render screen output', 'Owns rendering and transitions'],
            ['Commands', 'Queues, authorises and tracks', 'Executes and acknowledges'],
            ['Telemetry', 'Receives and analyses', 'Produces and buffers'],
            ['Offline operation', 'Prepares complete state', 'Continues independently'],
            ['Recovery', 'Coordinates fleet actions', 'Performs immediate local recovery'],
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="10" id="local-state">
          Local state
        </SectionHeading>
        <P>
          The player needs durable local state so it can restart and continue operating without
          rebuilding everything from the server.
        </P>
        <P>
          Typical local state includes device credentials, current manifest, active policy,
          asset inventory, download states, schedule information, command results and the last
          known server status.
        </P>
        <P>
          Local writes should be deliberate. Useful protections include atomic updates,
          validation, backups of critical state and a last-known-good configuration.
        </P>
        <P>
          If a device loses all identity and policy information after an unexpected restart, it
          may become unmanageable precisely when the network is unavailable.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="11" id="content-delivery-and-activation">
          Content delivery and activation
        </SectionHeading>
        <P>
          Publishing a new policy should not immediately switch the screen to files that may
          still be incomplete.
        </P>
        <P>A safer content lifecycle separates delivery from activation.</P>
        <ArticleDiagram
          alt="Eight-step vertical flow: policy updated, player receives manifest, local state compared, missing assets downloaded, file size and checksum verified, assets moved into active storage, policy becomes eligible, playback switches safely."
          caption="Safe content-delivery lifecycle"
        >
          <DiagramFlow
            steps={[
              'Policy updated',
              'Player receives manifest',
              'Local state compared',
              'Missing assets downloaded',
              'File size / checksum verified',
              'Assets moved into active storage',
              'Policy becomes eligible',
              'Playback switches safely',
            ]}
          />
        </ArticleDiagram>
        <P>
          The player should preserve the currently working policy until the replacement is
          ready, unless an explicit rule says otherwise.
        </P>
        <ArticleCallout kind="important">
          Downloaded and verified are separate states. A partial or unverified file must never
          become active content.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="12" id="offline-playback-and-reconnection">
          Offline playback and reconnection
        </SectionHeading>
        <P>
          Offline playback is not a single feature. It is the result of several architectural
          choices working together.
        </P>
        <P>
          The player needs the assets, policy, schedule and local time context required to
          continue making playback decisions.
        </P>
        <P>
          A complete offline lifecycle includes disconnection detection, continued local
          playback, retry behaviour, reconnection and state reconciliation.
        </P>
        <ArticleDiagram
          alt="Nine-step vertical flow: connected, policy and assets synchronised, network unavailable, local schedule and playback continue, events buffered locally, connection retries, network restored, desired and reported state reconciled, only changed content downloads."
          caption="Connected-to-offline-to-reconnected lifecycle"
        >
          <DiagramFlow
            steps={[
              'Connected',
              'Policy and assets synchronised',
              'Network unavailable',
              'Local schedule and playback continue',
              'Events buffered locally',
              'Connection retries',
              'Network restored',
              'Desired and reported state reconciled',
              'Only changed content downloads',
            ]}
          />
        </ArticleDiagram>
        <P>
          Reconnection should not force a complete reset. The player should reconcile versions
          and transfer only what changed.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="13" id="device-pairing-and-trust">
          Device pairing and trust
        </SectionHeading>
        <P>Pairing establishes ownership between a physical device and an organisation.</P>
        <P>
          The user-facing code should be temporary and single-use. Permanent device credentials
          should be issued only after the organisation confirms ownership.
        </P>
        <P>A typical sequence is:</P>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/70">
          <li>Player requests a short-lived pairing session.</li>
          <li>Server returns a temporary code.</li>
          <li>Code appears on the screen.</li>
          <li>Operator enters the code in the product.</li>
          <li>Control plane confirms the organisation and permissions.</li>
          <li>Permanent device identity and credentials are issued.</li>
          <li>Device begins normal synchronisation.</li>
        </ol>
        <P>
          The architecture must also support credential revocation, device replacement,
          reprovisioning and decommissioning.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="14" id="commands-and-telemetry">
          Commands and telemetry
        </SectionHeading>
        <P>Modern signage requires a two-way operational channel.</P>
        <P>
          The server sends commands; the player sends acknowledgements, events and health data.
        </P>
        <P>
          Commands should have explicit states because devices may be offline or may complete
          the action after the original request has timed out.
        </P>
        <ArticleDiagram
          alt="The server sends commands such as restart runtime, sync now and collect diagnostics down to the player; the player responds upward with delivered, acknowledged, completed or failed states plus telemetry and events, which return to the server."
          caption="Two-way operational channel"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramPanel
              title="Server"
              items={['command: restart runtime', 'command: sync now', 'command: collect diagnostics']}
            />
            <DiagramArrow />
            <DiagramPanel
              title="Player"
              items={['delivered', 'acknowledged', 'completed / failed', 'telemetry and events']}
            />
            <DiagramArrow />
            <DiagramNode>Server</DiagramNode>
          </div>
        </ArticleDiagram>
        <P>
          Useful telemetry includes connection state, runtime version, firmware, storage,
          active policy, download status, recent error, uptime and last reboot.
        </P>
        <ArticleCallout kind="practical">
          Telemetry should answer support questions. More data is not useful unless it changes
          an operator&rsquo;s decision.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="15" id="command-delivery-semantics">
          Command delivery semantics
        </SectionHeading>
        <P>A command queue should define expiry, retry and duplicate-execution behaviour.</P>
        <P>
          Some commands are naturally idempotent. Requesting a state synchronisation twice
          should normally be safe. Others, such as reboot or cache deletion, require stronger
          controls.
        </P>
        <P>
          The command record should distinguish created, queued, delivered, acknowledged,
          completed and failed states.
        </P>
        <ArticleDiagram
          alt="Linear command lifecycle from created to queued to delivered to acknowledged to completed, with a branch from acknowledged to failed."
          caption="Command lifecycle"
        >
          <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-foreground md:text-sm">
{`created → queued → delivered → acknowledged → completed
                                      └────────────→ failed`}
          </pre>
        </ArticleDiagram>
      </section>
    </>
  );
}
