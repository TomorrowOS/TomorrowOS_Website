/**
 * /modern-digital-signage-architecture — sections 01–07 (architecture model).
 * Copy is rendered verbatim from the approved editorial source; do not
 * reword without editorial sign-off.
 */
import { SectionHeading, P } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramNode,
  DiagramArrow,
  DiagramBranchRow,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';

/** Numbered layer definition used for the five-layer model. */
function LayerDefinition({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex break-inside-avoid gap-4 border-b border-border/60 pb-4 last:border-b-0">
      <span aria-hidden="true" className="font-mono text-sm font-medium tabular-nums text-muted-foreground/70">
        {number}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

export function ArchSectionsModel() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="01" id="what-modern-digital-signage-architecture-looks-like">
          What modern digital signage architecture looks like
        </SectionHeading>
        <P>
          Modern architecture separates the product customers use from the infrastructure that
          coordinates and operates screens.
        </P>
        <P>
          The customer application should own the workflow: organisations, users, media
          libraries, playlists, approvals, schedules, reporting, branding and commercial logic.
          It should not need to know how a BrightSign player starts, where a Samsung display
          stores a file or which command a particular operating system supports.
        </P>
        <P>
          Beneath the product sits a control plane. It records devices, policies, assignments,
          commands and telemetry. Alongside it sits a content plane that stores, versions and
          distributes assets. On every device, an edge runtime maintains identity, local state,
          scheduling, playback and recovery. A platform adapter translates that common runtime
          behaviour into the APIs available on the target screen environment.
        </P>
        <ArticleDiagram
          alt="Vertical flow from users and applications through the product and workflow layer, the server SDK and API, the device, content and policy services, synchronisation and delivery, the on-device runtime with playback, storage and telemetry, the platform adapter, and finally the physical screen."
          caption="High-level modern signage architecture"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramNode>Users and applications</DiagramNode>
            <DiagramArrow />
            <DiagramNode emphasis>Product and workflow layer</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Server SDK / API</DiagramNode>
            <DiagramArrow />
            <DiagramBranchRow items={['Devices', 'Content', 'Policies']} />
            <DiagramArrow />
            <DiagramNode>Synchronisation and delivery</DiagramNode>
            <DiagramArrow />
            <DiagramNode emphasis>On-device runtime</DiagramNode>
            <DiagramArrow />
            <DiagramBranchRow items={['Playback', 'Storage', 'Telemetry']} />
            <DiagramArrow />
            <DiagramNode>Platform adapter</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Physical screen</DiagramNode>
          </div>
        </ArticleDiagram>
        <ArticleCallout kind="important">
          The server defines intent. The player executes that intent locally and continues
          operating when the server cannot be reached.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="02" id="the-five-architectural-layers">
          The five architectural layers
        </SectionHeading>
        <P>
          A useful mental model divides the system into five layers. Each layer has a distinct
          responsibility and a clear boundary.
        </P>
        <div className="flex flex-col gap-4">
          <LayerDefinition number="1" title="Product layer">
            The customer-facing application and workflows that make the product useful to a
            particular market.
          </LayerDefinition>
          <LayerDefinition number="2" title="Control plane">
            The server-side system that coordinates identity, devices, policies, commands,
            permissions and operational state.
          </LayerDefinition>
          <LayerDefinition number="3" title="Content plane">
            The services responsible for asset metadata, storage, versioning, manifests,
            delivery and integrity.
          </LayerDefinition>
          <LayerDefinition number="4" title="Edge runtime">
            The on-device software that synchronises, stores state, applies schedules, plays
            content, executes commands and recovers locally.
          </LayerDefinition>
          <LayerDefinition number="5" title="Platform adapter">
            The platform-specific implementation that maps common runtime capabilities to
            Samsung Tizen, BrightSign or another operating environment.
          </LayerDefinition>
        </div>
        <ArticleCallout kind="practical">
          A new platform should require a new adapter, not a rewrite of the customer
          application.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="03" id="the-product-layer">
          The product layer
        </SectionHeading>
        <P>
          The product layer is what customers see and what differentiates one signage business
          from another.
        </P>
        <P>
          A menu-board platform, corporate communications product, retail media platform and
          wayfinding system may all use similar device infrastructure while presenting entirely
          different workflows.
        </P>
        <P>The product layer commonly owns:</P>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-border">
          <li>organisations, workspaces and user roles;</li>
          <li>locations, screen groups and business structure;</li>
          <li>media library and approvals;</li>
          <li>playlist, layout or campaign workflows;</li>
          <li>scheduling and targeting interfaces;</li>
          <li>reporting and customer-facing analytics;</li>
          <li>branding, commercial features and vertical-specific logic.</li>
        </ul>
        <P>
          This layer should express user intent in platform-neutral terms. For example, it may
          assign a policy to a group of screens. It should not contain separate dashboard logic
          for every operating system.
        </P>
        <ArticleCallout kind="practical">
          The product layer owns the customer experience. The platform adapter owns
          hardware-specific behaviour.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="04" id="the-control-plane">
          The control plane
        </SectionHeading>
        <P>
          The control plane is the server-side coordination layer. It tells the fleet what
          should happen and records what the fleet reports back.
        </P>
        <P>
          It usually includes device records, pairing, policy assignments, command queues,
          authentication, authorisation, audit history and telemetry ingestion.
        </P>
        <P>The control plane should be able to answer:</P>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-border">
          <li>Which organisation owns this device?</li>
          <li>What policy is currently assigned?</li>
          <li>What version of that policy has the player acknowledged?</li>
          <li>What commands are queued, delivered or completed?</li>
          <li>When did the player last connect?</li>
          <li>What runtime and firmware version is it reporting?</li>
          <li>Does the device require operator attention?</li>
        </ul>
        <P>
          The control plane coordinates playback but does not render the media itself. It
          maintains the desired and reported state that allows the system to reconcile
          differences.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="05" id="desired-state-and-reported-state">
          Desired state and reported state
        </SectionHeading>
        <P>A useful control plane separates desired state from reported state.</P>
        <P>
          Desired state represents what the server wants: the assigned policy, expected runtime
          version, required content and queued commands.
        </P>
        <P>
          Reported state represents what the device says is true: the policy currently active,
          files present locally, runtime version, errors, storage and recent playback activity.
        </P>
        <P>The difference between those states drives synchronisation.</P>
        <ArticleDiagram
          alt="Three panels compare the server's desired state of policy v42, runtime 1.3.0 and assets A, B and C with the player's reported state of policy v41, runtime 1.3.0 and assets A and B, producing a calculated difference: download asset C and activate policy v42."
          caption="Desired-versus-reported state"
          wide
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <DiagramPanel title="Desired state" items={['Policy: v42', 'Runtime: 1.3.0', 'Assets: A, B, C']} />
            <DiagramPanel title="Reported state" items={['Policy: v41', 'Runtime: 1.3.0', 'Assets: A, B']} />
            <DiagramPanel title="Difference" items={['Download C', 'Activate policy v42']} />
          </div>
        </ArticleDiagram>
        <P>
          This model is easier to reason about than treating every dashboard action as an
          immediate instruction that must succeed while the device is online.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="06" id="the-content-plane">
          The content plane
        </SectionHeading>
        <P>The content plane manages the assets that devices need in order to play.</P>
        <P>
          It is often separated conceptually from the control plane because media files are
          large, bandwidth-heavy and operationally different from device metadata.
        </P>
        <P>Common responsibilities include:</P>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-border">
          <li>upload and validation;</li>
          <li>metadata extraction;</li>
          <li>optional transcoding or optimisation;</li>
          <li>object storage;</li>
          <li>asset versions;</li>
          <li>checksums;</li>
          <li>content manifests;</li>
          <li>CDN or distribution URLs;</li>
          <li>download authorisation;</li>
          <li>retention and deletion.</li>
        </ul>
        <P>
          A file extension is not enough to describe a media asset. The content plane should
          retain container, codec, resolution, frame rate, bitrate, duration, orientation,
          audio information, file size and checksum where available.
        </P>
        <ArticleCallout kind="engineering">
          Hardware capability, runtime support and completed media validation are three
          different claims. Keep them separate.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="07" id="manifests-and-versioned-delivery">
          Manifests and versioned delivery
        </SectionHeading>
        <P>
          The server should normally send a compact versioned description of the required state
          rather than repeatedly pushing complete playlists and asset lists.
        </P>
        <P>
          A manifest can describe the assigned policy, required assets, content versions,
          checksums, schedule information and fallback behaviour.
        </P>
        <P>
          The player compares that manifest with local state and downloads only what is missing
          or outdated.
        </P>
        <ArticleDiagram
          alt="Tree structure of a policy manifest version 42 containing a weekday-default schedule, the lunch-menu-v7 playlist, three assets — hero-video.mp4 and breakfast.jpg with sha256 checksums and prices.json at version 18 — and a fallback rule of last-known-good."
          caption="Conceptual versioned manifest"
        >
          <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-foreground md:text-sm">
{`Policy manifest v42
├── schedule: weekday-default
├── playlist: lunch-menu-v7
├── assets
│   ├── hero-video.mp4  sha256:...
│   ├── breakfast.jpg   sha256:...
│   └── prices.json     version: 18
└── fallback: last-known-good`}
          </pre>
        </ArticleDiagram>
        <P>
          Versioning makes rollback, audit and partial updates easier. It also gives the player
          a deterministic target state.
        </P>
      </section>
    </>
  );
}
