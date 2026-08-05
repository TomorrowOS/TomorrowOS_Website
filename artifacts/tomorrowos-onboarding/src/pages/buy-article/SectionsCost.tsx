/**
 * /build-vs-buy-digital-signage-cms — sections 05–09 (the cost of building).
 * Copy is rendered verbatim from the approved editorial source; do not
 * reword without editorial sign-off. Founder-voice passages are deliberate.
 */
import { SectionHeading, P, UL, SubHeading } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import { ArticleDiagram, DiagramArrow, DiagramPanel } from '@/components/blog/ArticleDiagram';

export function BuySectionsCost() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="05" id="the-real-scope-of-building">
          The real scope of building
        </SectionHeading>
        <P>
          A production CMS is not one application. It is a collection of systems that have to
          remain consistent across the cloud and the edge.
        </P>
        <ArticleDiagram
          alt="Three stacked panels: the customer application with authentication, organisations and users, media library, playlists and schedules, device management and reporting; server infrastructure with APIs, database, storage, policies, commands, telemetry and jobs and queues; and the on-device runtime with pairing, synchronisation, local database, download manager, playback, offline operation, recovery and platform adapter."
          caption="The real scope of a digital signage platform"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramPanel
              title="Customer application"
              items={[
                'Authentication',
                'Organisations and users',
                'Media library',
                'Playlists and schedules',
                'Device management',
                'Reporting',
              ]}
            />
            <DiagramArrow />
            <DiagramPanel
              title="Server infrastructure"
              items={['APIs', 'Database', 'Storage', 'Policies', 'Commands', 'Telemetry', 'Jobs and queues']}
            />
            <DiagramArrow />
            <DiagramPanel
              title="On-device runtime"
              items={[
                'Pairing',
                'Synchronisation',
                'Local database',
                'Download manager',
                'Playback',
                'Offline operation',
                'Recovery',
                'Platform adapter',
              ]}
            />
          </div>
        </ArticleDiagram>
        <P>
          A team that chooses to build becomes responsible for all of these layers unless it
          deliberately uses shared infrastructure or third-party services.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="06" id="the-real-cost-of-building">
          The real cost of building
        </SectionHeading>
        <P>
          The cost of building is not limited to developer salaries during the first release.
          The larger cost is the ongoing obligation to operate, improve and support the
          platform.
        </P>
        <SubHeading>Product and interface</SubHeading>
        <UL>
          <li>customer research and workflow design;</li>
          <li>dashboard, media and scheduling interfaces;</li>
          <li>roles, approvals and audit history;</li>
          <li>onboarding and documentation;</li>
          <li>reporting and support workflows.</li>
        </UL>
        <SubHeading>Backend and infrastructure</SubHeading>
        <UL>
          <li>authentication and multi-tenancy;</li>
          <li>API design and versioning;</li>
          <li>database design and migrations;</li>
          <li>object storage and content delivery;</li>
          <li>background processing and retry behaviour;</li>
          <li>monitoring, backups and incident response.</li>
        </UL>
        <SubHeading>Player runtime</SubHeading>
        <UL>
          <li>device identity and pairing;</li>
          <li>local storage and state;</li>
          <li>download integrity;</li>
          <li>playback engine;</li>
          <li>offline scheduling;</li>
          <li>commands and telemetry;</li>
          <li>watchdog and recovery;</li>
          <li>automatic updates.</li>
        </UL>
        <SubHeading>Platform support</SubHeading>
        <UL>
          <li>installation and packaging for each operating system;</li>
          <li>firmware and model validation;</li>
          <li>media and browser differences;</li>
          <li>platform-specific commands;</li>
          <li>release testing and rollback.</li>
        </UL>
        <SubHeading>Operating the product</SubHeading>
        <UL>
          <li>technical support;</li>
          <li>customer success;</li>
          <li>security reviews;</li>
          <li>release management;</li>
          <li>documentation;</li>
          <li>QA devices and test media;</li>
          <li>supporting old versions;</li>
          <li>vendor and hardware changes.</li>
        </UL>
        <ArticleCallout kind="important">
          The first version is rarely the expensive part. The cost appears when customers
          expect the platform to keep working, new devices must be supported and every release
          has to be safe for screens already in the field.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="07" id="the-hidden-costs-teams-underestimate">
          The hidden costs teams underestimate
        </SectionHeading>
        <SubHeading>Support becomes part of the product</SubHeading>
        <P>
          A customer does not separate the CMS from the display, player, network or media
          file. If the screen is wrong, the software provider will usually be involved in
          finding the cause.
        </P>
        <SubHeading>Hardware and firmware variation</SubHeading>
        <P>
          The same content can behave differently across models, firmware and playback
          contexts. A team needs physical test devices, documented combinations and a
          controlled validation process.
        </P>
        <SubHeading>Documentation and onboarding</SubHeading>
        <P>
          Software that only the original developers can install and troubleshoot is difficult
          to commercialise. Guides, examples, release notes and support tooling take real
          time.
        </P>
        <SubHeading>Security and compliance</SubHeading>
        <P>
          The platform manages users, customer data, remote devices and commands. Security
          work continues after launch through dependency updates, credential handling,
          auditability and incident response.
        </P>
        <SubHeading>Commercial and organisational cost</SubHeading>
        <P>
          Building can also delay sales, deployment or product validation while engineering
          focuses on infrastructure that customers may never see.
        </P>
        <ArticleCallout kind="practical">
          Include opportunity cost in the build estimate. The correct comparison is not only
          software cost versus vendor licence. It is also what the team could have shipped,
          sold or learned instead.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="08" id="when-building-makes-sense">
          When building makes sense
        </SectionHeading>
        <P>
          Building becomes more defensible when signage is part of the business&rsquo;s core
          product rather than a supporting tool.
        </P>
        <SubHeading>The workflow is the product</SubHeading>
        <P>
          A restaurant technology company may need signage tightly connected to menus,
          pricing, product availability, approvals and point-of-sale data. A generic CMS may
          create friction that the product cannot accept.
        </P>
        <SubHeading>The business needs to own the customer experience</SubHeading>
        <P>
          A vertical SaaS product may need one account, one workflow and one commercial
          relationship across several services. Sending customers into a separate vendor
          platform can weaken the experience.
        </P>
        <SubHeading>The platform creates valuable intellectual property</SubHeading>
        <P>
          If device orchestration, campaign delivery, automation or industry-specific
          operations are central to the company&rsquo;s advantage, ownership can create
          long-term value.
        </P>
        <SubHeading>The deployment is large or strategically long-lived</SubHeading>
        <P>
          At sufficient scale, recurring licence fees and vendor constraints may justify
          investment in ownership. Scale alone is not enough; the organisation still needs a
          durable engineering and support capability.
        </P>
        <SubHeading>The business needs hardware or hosting independence</SubHeading>
        <P>
          Some products require control over deployment, data location, platform support or
          commercial terms that a finished CMS cannot provide.
        </P>
        <SubHeading>The software will be sold to others</SubHeading>
        <P>
          A company creating a DOOH platform, retail media product, OEM system or signage SaaS
          may need to own the product layer and commercial model.
        </P>
        <ArticleCallout kind="practical">
          Build when ownership improves the product or business model. Do not build only to
          avoid a software subscription.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="09" id="when-buying-makes-sense">
          When buying makes sense
        </SectionHeading>
        <P>
          Buying is usually the better choice when the required outcome is communication
          rather than software ownership.
        </P>
        <UL>
          <li>internal corporate communications;</li>
          <li>a small retail or hospitality deployment;</li>
          <li>schools, churches and community organisations;</li>
          <li>waiting rooms and reception areas;</li>
          <li>simple promotional screens;</li>
          <li>a time-sensitive rollout;</li>
          <li>a team without dedicated software operations;</li>
          <li>a deployment where standard playlists and schedules are sufficient.</li>
        </UL>
        <P>
          A commercial CMS may also remain the right choice for a large deployment when the
          workflow is conventional and the vendor can meet the operating requirements.
        </P>
        <ArticleCallout kind="practical">
          Do not use screen count as the only decision. Five highly specialised screens may
          justify custom software. Thousands of conventional screens may still be better
          served by a mature platform.
        </ArticleCallout>
      </section>
    </>
  );
}
