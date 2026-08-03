import {
  SectionHeading,
  SubHeading,
  P,
  UL,
  ExtLink,
} from '@/components/blog/articlePrimitives';
import { siteConfig } from '@/config/site';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramNode,
  DiagramArrow,
  DiagramBranchRow,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';
import { ArticleChecklist } from '@/components/blog/ArticleChecklist';

/**
 * Article sections: What is a CMS → The systems every CMS eventually needs.
 * Copy is the supplied editorial source of truth — do not reword.
 */
export function SectionsFoundation() {
  return (
    <>
      {/* -------------------------------------------------- What is a CMS */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="what-is-a-digital-signage-cms">
          What is a digital signage CMS?
        </SectionHeading>
        <P>A digital signage CMS is the software used to manage content and connected screens.</P>
        <P>At a basic level, it allows an operator to:</P>
        <UL>
          <li>upload images, videos or web content;</li>
          <li>organise those assets into playlists;</li>
          <li>assign content to screens;</li>
          <li>schedule when content should play;</li>
          <li>monitor connected devices;</li>
          <li>publish changes remotely.</li>
        </UL>
        <P>A commercial platform normally needs several additional capabilities:</P>
        <UL>
          <li>organisations and user permissions;</li>
          <li>device registration and pairing;</li>
          <li>media metadata and versioning;</li>
          <li>reliable content downloads;</li>
          <li>local device storage;</li>
          <li>offline playback;</li>
          <li>scheduling and priority rules;</li>
          <li>remote commands;</li>
          <li>health telemetry;</li>
          <li>player logs and diagnostics;</li>
          <li>automatic recovery;</li>
          <li>runtime updates;</li>
          <li>support for different screen operating systems.</li>
        </UL>
        <P>
          The visible dashboard is only one layer. Behind it sits the infrastructure that
          communicates with every device and keeps playback functioning.
        </P>
      </section>

      {/* ------------------------------------------ Not a website CMS */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="not-a-website-cms">
          A signage CMS is not a website CMS
        </SectionHeading>
        <P>A website CMS publishes content to browsers that normally have:</P>
        <UL>
          <li>a live internet connection;</li>
          <li>a user present;</li>
          <li>an established browser environment;</li>
          <li>the ability to refresh after an error;</li>
          <li>a relatively short session lifecycle.</li>
        </UL>
        <P>A signage player may run unattended for months or years.</P>
        <P>It might be:</P>
        <UL>
          <li>mounted behind a menu board;</li>
          <li>installed inside a shopping centre;</li>
          <li>operating in a warehouse;</li>
          <li>connected through an unreliable mobile network;</li>
          <li>rebooted after a power interruption;</li>
          <li>expected to play content while completely offline.</li>
        </UL>
        <P>This changes the architecture.</P>
        <P>
          A webpage can often fail visibly and wait for the user to retry. A digital signage
          player must detect problems, recover automatically and continue using locally stored
          content whenever the server is unavailable.
        </P>
        <P>
          The player is therefore not just a browser showing a webpage. It is an edge runtime
          with its own identity, state, storage and recovery behaviour.
        </P>
      </section>

      {/* ------------------------------------------ System at a glance */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="the-complete-system-at-a-glance">
          The complete system at a glance
        </SectionHeading>
        <P>A modern digital signage platform typically contains four main layers.</P>

        <SubHeading>1. Product layer</SubHeading>
        <P>This is the customer-facing application:</P>
        <UL>
          <li>dashboard;</li>
          <li>organisations;</li>
          <li>users;</li>
          <li>media library;</li>
          <li>playlists;</li>
          <li>schedules;</li>
          <li>reports;</li>
          <li>settings;</li>
          <li>branding;</li>
          <li>commercial workflows.</li>
        </UL>

        <SubHeading>2. Server layer</SubHeading>
        <P>This coordinates the system:</P>
        <UL>
          <li>authentication;</li>
          <li>device records;</li>
          <li>content metadata;</li>
          <li>APIs;</li>
          <li>schedules;</li>
          <li>policies;</li>
          <li>commands;</li>
          <li>event handling;</li>
          <li>telemetry;</li>
          <li>queues;</li>
          <li>storage references.</li>
        </UL>

        <SubHeading>3. Runtime layer</SubHeading>
        <P>This runs on the screen or media player:</P>
        <UL>
          <li>pairing;</li>
          <li>server connection;</li>
          <li>content download;</li>
          <li>local storage;</li>
          <li>playback;</li>
          <li>scheduling;</li>
          <li>command execution;</li>
          <li>telemetry;</li>
          <li>offline operation;</li>
          <li>recovery.</li>
        </UL>

        <SubHeading>4. Platform adapter</SubHeading>
        <P>This handles differences between operating systems and hardware:</P>
        <UL>
          <li>application installation;</li>
          <li>storage APIs;</li>
          <li>media playback;</li>
          <li>browser engines;</li>
          <li>device identifiers;</li>
          <li>remote commands;</li>
          <li>firmware behaviour;</li>
          <li>operating-system limitations.</li>
        </UL>

        <P>A useful high-level architecture is:</P>
        <ArticleDiagram
          alt="Diagram showing users managing a CMS connected through server services to an on-device runtime and supported screen platforms."
          caption="The complete architecture: from operators, through the server layer and synchronisation, to the on-device runtime and its platform adapters."
          wide
        >
          <DiagramNode emphasis>Users and administrators</DiagramNode>
          <DiagramArrow />
          <DiagramNode emphasis>Customer application and CMS</DiagramNode>
          <DiagramArrow />
          <DiagramNode emphasis>Server SDK or API</DiagramNode>
          <DiagramArrow />
          <DiagramBranchRow items={['Devices', 'Content', 'Policies']} />
          <DiagramArrow />
          <DiagramNode>Communication and synchronisation</DiagramNode>
          <DiagramArrow />
          <DiagramNode emphasis>On-device runtime</DiagramNode>
          <DiagramArrow />
          <DiagramBranchRow
            items={['Samsung Tizen', 'BrightSign', 'LG webOS', 'Other platforms']}
          />
        </ArticleDiagram>
        <P>
          The product layer should not need to understand every platform-specific detail. The
          runtime and adapters should absorb those differences wherever practical.
        </P>
      </section>

      {/* --------------------------------- Systems every CMS eventually needs */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="the-systems-every-cms-eventually-needs">
          The systems every CMS eventually needs
        </SectionHeading>
        <P>A first version may begin with three features:</P>
        <UL>
          <li>upload;</li>
          <li>playlist;</li>
          <li>publish.</li>
        </UL>
        <P>Production deployments usually force the platform to add many more systems.</P>

        <SubHeading>Identity and tenancy</SubHeading>
        <P>The platform needs to know:</P>
        <UL>
          <li>which organisation owns the screen;</li>
          <li>which users belong to that organisation;</li>
          <li>what each user can change;</li>
          <li>which content belongs to which customer;</li>
          <li>who published an update;</li>
          <li>who can issue remote commands.</li>
        </UL>
        <P>Most commercial systems are multi-tenant. A common hierarchy is:</P>
        <div className="max-w-[480px]">
          <DiagramPanel
            title="Organisation"
            items={[
              'Users',
              'Locations',
              'Screen groups',
              'Devices',
              'Media',
              'Playlists',
              'Policies',
            ]}
          />
        </div>
        <P>
          Designing tenancy early is easier than trying to separate customer data after the
          product has grown.
        </P>

        <SubHeading>Content</SubHeading>
        <P>The platform must manage:</P>
        <UL>
          <li>file uploads;</li>
          <li>metadata;</li>
          <li>validation;</li>
          <li>storage;</li>
          <li>versions;</li>
          <li>replacement;</li>
          <li>deletion;</li>
          <li>distribution;</li>
          <li>local caching.</li>
        </UL>

        <SubHeading>Devices</SubHeading>
        <P>It must also manage:</P>
        <UL>
          <li>registration;</li>
          <li>pairing;</li>
          <li>ownership;</li>
          <li>groups;</li>
          <li>status;</li>
          <li>software version;</li>
          <li>firmware information;</li>
          <li>commands;</li>
          <li>replacement;</li>
          <li>decommissioning.</li>
        </UL>

        <SubHeading>Playback</SubHeading>
        <P>The player needs to determine:</P>
        <UL>
          <li>what to play;</li>
          <li>in which order;</li>
          <li>at what time;</li>
          <li>under which policy;</li>
          <li>what happens when content is missing;</li>
          <li>what happens when the network disappears;</li>
          <li>what fallback should be shown;</li>
          <li>how playback recovers after an error.</li>
        </UL>

        <SubHeading>Monitoring</SubHeading>
        <P>Operators need visibility into:</P>
        <UL>
          <li>connection status;</li>
          <li>last heartbeat;</li>
          <li>current runtime version;</li>
          <li>storage availability;</li>
          <li>active content;</li>
          <li>download progress;</li>
          <li>errors;</li>
          <li>reboot history;</li>
          <li>offline status.</li>
        </UL>
        <P>
          The operational quality of these systems often matters more than the number of
          features shown in the dashboard.
        </P>

        {/* CMS component checklist (required structured element). */}
        <ArticleChecklist
          ariaLabel="CMS component checklist"
          groups={[
            {
              title: 'Identity',
              items: ['Organisations and tenancy', 'Users and roles', 'Permissions and audit'],
            },
            {
              title: 'Content',
              items: ['Uploads and validation', 'Metadata and versions', 'Distribution and caching'],
            },
            {
              title: 'Devices',
              items: ['Registration and pairing', 'Ownership and groups', 'Lifecycle and replacement'],
            },
            {
              title: 'Scheduling',
              items: ['Dates, times and recurrence', 'Priority and overrides', 'Time zones'],
            },
            {
              title: 'Playback',
              items: ['Deterministic selection', 'Fallback behaviour', 'Error recovery'],
            },
            {
              title: 'Monitoring',
              items: ['Heartbeats and status', 'Download progress', 'Errors and reboots'],
            },
            {
              title: 'Platform integration',
              items: ['Installation and startup', 'Storage and playback APIs', 'Firmware differences'],
            },
          ]}
        />

        <ArticleCallout kind="engineering">
          Reliability is an architectural requirement, not a feature added at the end.
        </ArticleCallout>
      </section>

      {/* ------------------------------------------ Frontend */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="designing-the-frontend">Designing the frontend</SectionHeading>
        <P>The frontend is the control surface for the customer.</P>
        <P>Typical areas include:</P>
        <UL>
          <li>login and account management;</li>
          <li>organisation administration;</li>
          <li>screen overview;</li>
          <li>media library;</li>
          <li>playlist builder;</li>
          <li>scheduling calendar;</li>
          <li>user permissions;</li>
          <li>device diagnostics;</li>
          <li>reporting;</li>
          <li>platform settings.</li>
        </UL>
        <P>The frontend should hide infrastructure complexity without hiding important outcomes.</P>
        <P>
          For example, a customer usually does not need to see the internal synchronisation
          algorithm. They do need to know:
        </P>
        <UL>
          <li>which screens received the update;</li>
          <li>which screens are still downloading;</li>
          <li>which screens are offline;</li>
          <li>whether older content remains available;</li>
          <li>whether the update failed.</li>
        </UL>
        <P>
          A strong signage interface translates low-level device activity into clear operational
          states.
        </P>
        <P>Instead of displaying only:</P>
        <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground">
          Online
        </blockquote>
        <P>consider showing:</P>
        <UL>
          <li>Connected;</li>
          <li>Content current;</li>
          <li>Downloading update;</li>
          <li>Offline, playing cached content;</li>
          <li>Attention required;</li>
          <li>Last seen 18 minutes ago.</li>
        </UL>
        <P>These states are more useful to an operator.</P>
      </section>

      {/* ------------------------------------------ Backend */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="designing-the-backend">Designing the backend</SectionHeading>
        <P>The backend coordinates every application and player interaction.</P>
        <P>
          A sensible starting architecture may use one application with clearly separated
          modules:
        </P>
        <div className="max-w-[480px]">
          <DiagramPanel
            title="API layer"
            items={[
              'Authentication',
              'Organisations',
              'Users',
              'Devices',
              'Media',
              'Playlists',
              'Schedules',
              'Commands',
              'Events',
              'Telemetry',
            ]}
          />
        </div>
        <P>These modules do not need to become separate services immediately.</P>
        <P>
          Prematurely splitting a small product into many networked services can increase
          complexity. Clear boundaries inside a modular application are often enough initially.
        </P>
        <P>The important part is separating responsibilities so they can evolve independently.</P>
        <P>For example:</P>
        <UL>
          <li>device communication should not depend on dashboard layout;</li>
          <li>media processing should not be embedded inside playlist logic;</li>
          <li>telemetry storage should not block device commands;</li>
          <li>platform-specific runtime behaviour should not leak into every API endpoint.</li>
        </UL>
      </section>

      {/* ------------------------------------------ API design */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="api-design">API design</SectionHeading>
        <P>The API connects the customer application, server services and device runtime.</P>
        <P>Common API areas include:</P>
        <UL>
          <li>authentication;</li>
          <li>organisations;</li>
          <li>media;</li>
          <li>playlists;</li>
          <li>schedules;</li>
          <li>devices;</li>
          <li>pairing;</li>
          <li>commands;</li>
          <li>events;</li>
          <li>telemetry.</li>
        </UL>
        <P>Example conceptual endpoints might include:</P>
        <pre className="overflow-x-auto rounded-[12px] border border-border bg-muted/30 p-4 text-sm text-foreground">
          <code>{`POST /media
GET  /devices
POST /devices/pair
POST /playlists
POST /publish
POST /devices/{id}/commands
GET  /devices/{id}/telemetry`}</code>
        </pre>
        <P>The exact route names matter less than consistency.</P>
        <P>Good API design should provide:</P>
        <UL>
          <li>stable request and response formats;</li>
          <li>predictable errors;</li>
          <li>idempotent operations where appropriate;</li>
          <li>versioning;</li>
          <li>authentication;</li>
          <li>authorisation;</li>
          <li>auditability;</li>
          <li>clear retry behaviour.</li>
        </UL>
        <P>
          Device-facing APIs deserve special care because players may retry requests after
          network interruptions. An operation that creates duplicate commands or conflicting
          registrations when retried will eventually cause field issues.
        </P>
      </section>

      {/* ------------------------------------------ Database design */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="database-design">Database design</SectionHeading>
        <P>A signage database stores more than file references.</P>
        <P>Common entities include:</P>
        <UL>
          <li>organisations;</li>
          <li>users;</li>
          <li>roles;</li>
          <li>locations;</li>
          <li>device groups;</li>
          <li>devices;</li>
          <li>pairing sessions;</li>
          <li>media assets;</li>
          <li>media versions;</li>
          <li>playlists;</li>
          <li>playlist items;</li>
          <li>schedules;</li>
          <li>policies;</li>
          <li>commands;</li>
          <li>device events;</li>
          <li>telemetry;</li>
          <li>audit records.</li>
        </UL>
        <P>A simplified relationship might look like:</P>
        <div className="grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
          <DiagramPanel title="Location" items={['Device group', 'Device']} />
          <DiagramPanel title="Media library" items={['Media versions']} />
          <DiagramPanel title="Playlist" items={['Schedule', 'Assigned devices']} />
        </div>
        <p className="text-sm text-muted-foreground">
          Each branch belongs to the organisation, which owns locations, the media library and
          playlists.
        </p>
        <P>Do not model only the current user interface.</P>
        <P>Model the long-lived operational relationships.</P>
        <P>
          A device may outlive several playlists. A playlist may be assigned to several groups.
          A media asset may have multiple versions. A command may be queued while a device is
          offline.
        </P>
        <P>Those relationships affect the data model.</P>
      </section>

      {/* ------------------------------------------ Media storage */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="media-storage-and-processing">
          Media storage and processing
        </SectionHeading>
        <P>
          Media files should normally be stored outside the main application server in object
          storage or an equivalent storage layer.
        </P>
        <P>A typical pipeline is:</P>
        <div className="max-w-[420px]">
          <ArticleDiagram
            alt="Pipeline showing an uploaded file being validated, processed and versioned before distribution."
            caption="The media pipeline: from upload to distributable, versioned assets."
          >
            <DiagramNode>Upload</DiagramNode>
            <DiagramArrow />
            <DiagramNode>File validation</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Metadata extraction</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Optional processing</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Object storage</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Version record</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Distribution</DiagramNode>
          </ArticleDiagram>
        </div>
        <P>Useful metadata includes:</P>
        <UL>
          <li>filename;</li>
          <li>container;</li>
          <li>codec;</li>
          <li>width;</li>
          <li>height;</li>
          <li>frame rate;</li>
          <li>bitrate;</li>
          <li>duration;</li>
          <li>audio information;</li>
          <li>file size;</li>
          <li>checksum;</li>
          <li>upload time;</li>
          <li>asset version.</li>
        </UL>
        <P>This information helps with:</P>
        <UL>
          <li>compatibility checks;</li>
          <li>device targeting;</li>
          <li>troubleshooting;</li>
          <li>bandwidth planning;</li>
          <li>duplicate detection;</li>
          <li>validation;</li>
          <li>reporting.</li>
        </UL>
        <P>
          Do not rely only on the file extension. Two MP4 files can have very different codec
          profiles, resolutions and playback requirements.
        </P>
      </section>

      {/* ------------------------------------------ Media validation */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="media-validation">Media validation</SectionHeading>
        <P>
          The platform should decide what happens when an unsupported or unverified media
          profile is uploaded.
        </P>
        <P>Possible strategies include:</P>
        <UL>
          <li>reject the upload;</li>
          <li>accept it with a warning;</li>
          <li>transcode it;</li>
          <li>restrict it to compatible devices;</li>
          <li>require a validation test.</li>
        </UL>
        <P>
          A professional system should not imply that every file with an accepted extension is
          safe across every player.
        </P>
        <P>Media compatibility depends on:</P>
        <UL>
          <li>container;</li>
          <li>codec;</li>
          <li>codec profile;</li>
          <li>resolution;</li>
          <li>frame rate;</li>
          <li>bitrate;</li>
          <li>audio;</li>
          <li>playback context;</li>
          <li>hardware;</li>
          <li>firmware;</li>
          <li>runtime version.</li>
        </UL>
        <P>The CMS should preserve enough metadata to make those decisions visible.</P>
        <P>
          The TomorrowOS <ExtLink href={siteConfig.links.docs}>documentation</ExtLink> covers
          how this evidence-led approach works in practice.
        </P>
      </section>
    </>
  );
}
