/**
 * /modern-digital-signage-architecture — sections 16–26 (deployment,
 * resilience and build strategy). Copy is rendered verbatim from the
 * approved editorial source; do not reword without editorial sign-off.
 */
import { SectionHeading, P, UL, ArticleDataTable } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import { ArticleChecklist } from '@/components/blog/ArticleChecklist';
import {
  ArticleDiagram,
  DiagramArrow,
  DiagramNode,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';

/** Titled mistake record used in "Common architecture mistakes". */
function Mistake({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex break-inside-avoid flex-col gap-1 border-b border-border/60 pb-3 last:border-b-0">
      <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function ArchSectionsStrategy() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="16" id="platform-adapters">
          Platform adapters
        </SectionHeading>
        <P>
          The platform adapter isolates operating-system and hardware differences from the
          common runtime.
        </P>
        <P>
          Different screen environments may use different packaging, storage, media APIs,
          browser engines, startup mechanisms, commands, firmware and debugging tools.
        </P>
        <P>A common capability interface might include:</P>
        <ArticleDiagram
          alt="A list of common runtime methods a platform adapter implements: identifyDevice, storeAsset, activatePolicy, playContent, reportHealth, executeCommand and restartRuntime."
          caption="Conceptual platform capability interface"
        >
          <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-foreground md:text-sm">
{`identifyDevice()
storeAsset()
activatePolicy()
playContent()
reportHealth()
executeCommand()
restartRuntime()`}
          </pre>
        </ArticleDiagram>
        <P>
          Each adapter implements the capabilities genuinely available on that platform. The
          common API should not pretend every device supports the same commands.
        </P>
        <ArticleCallout kind="practical">
          Standardise behaviour where possible, but represent capability differences honestly.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="17" id="multi-tenant-architecture">
          Multi-tenant architecture
        </SectionHeading>
        <P>Most commercial signage products serve multiple organisations from shared infrastructure.</P>
        <P>
          Multi-tenancy affects users, data, devices, content, commands and telemetry. Every
          request and background process needs a clear tenant boundary.
        </P>
        <P>
          A common model is organisation ownership with users, locations, devices, media and
          policies scoped beneath it.
        </P>
        <P>
          Tenant isolation should be enforced in the server layer and data model, not only
          hidden by the interface.
        </P>
        <UL>
          <li>authorise every user action against organisation membership;</li>
          <li>bind devices to one owning tenant;</li>
          <li>scope commands and telemetry to the correct organisation;</li>
          <li>separate storage paths or access policies;</li>
          <li>record audit history for sensitive actions;</li>
          <li>avoid globally unique identifiers becoming implicit authorisation.</li>
        </UL>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="18" id="cloud-self-hosted-and-hybrid-deployment">
          Cloud, self-hosted and hybrid deployment
        </SectionHeading>
        <P>The same logical architecture can be deployed in different ways.</P>
        <ArticleDataTable
          caption="Cloud, self-hosted and hybrid deployment models"
          head={['Model', 'Control plane', 'Content', 'Best suited for']}
          minWidth={720}
          rows={[
            [
              'Hosted',
              'Managed by provider',
              'Managed object storage/CDN',
              'Fastest deployment and lowest infrastructure ownership',
            ],
            [
              'Self-hosted',
              'Operated by customer',
              'Customer-selected storage',
              'Data control, private environments and custom operations',
            ],
            [
              'Hybrid',
              'Shared responsibility',
              'Customer or provider storage',
              'Teams needing selected ownership without managing every layer',
            ],
          ]}
        />
        <P>
          Deployment ownership changes operational responsibility, not the fundamental need for
          identity, delivery, local state, recovery and observability.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="19" id="headless-digital-signage-architecture">
          Headless digital signage architecture
        </SectionHeading>
        <P>
          A headless signage architecture separates the customer-facing product from reusable
          device and playback services.
        </P>
        <P>
          The developer builds the interface and workflows while interacting with device,
          content, policy and command capabilities through APIs or an SDK.
        </P>
        <P>
          This approach is useful when the signage experience is part of a broader product
          rather than a standalone CMS.
        </P>
        <P>
          Headless does not mean there is no stateful player. It means the presentation and
          workflow layer are decoupled from the underlying signage infrastructure.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="20" id="monolith-versus-services">
          Monolith versus services
        </SectionHeading>
        <P>A modern architecture does not require microservices on the first day.</P>
        <P>
          A modular monolith with clear boundaries is often the best starting point. It keeps
          deployment and debugging simple while preserving the option to separate components
          later.
        </P>
        <P>Services are most useful when a boundary has a clear scaling, reliability or ownership reason.</P>
        <UL>
          <li>separate media processing when CPU or workflow requirements differ;</li>
          <li>separate telemetry ingestion when event volume becomes substantial;</li>
          <li>separate asynchronous job processing when retries and throughput require it;</li>
          <li>separate identity or billing when organisational ownership demands it.</li>
        </UL>
        <ArticleCallout kind="engineering">
          Architectural boundaries matter before deployment boundaries. Avoid distributing
          complexity without a measurable benefit.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="21" id="failure-and-recovery-architecture">
          Failure and recovery architecture
        </SectionHeading>
        <P>
          Failures are normal in remote-device systems. The architecture should describe how
          each layer responds rather than assuming faults will be rare.
        </P>
        <P>Important failure cases include:</P>
        <UL>
          <li>network unavailable;</li>
          <li>control plane unavailable;</li>
          <li>power interruption;</li>
          <li>incomplete or corrupted download;</li>
          <li>invalid policy;</li>
          <li>full local storage;</li>
          <li>expired credentials;</li>
          <li>runtime crash;</li>
          <li>failed update;</li>
          <li>firmware-specific playback behaviour.</li>
        </UL>
        <P>
          The player should recover locally wherever possible. The server should retain enough
          history and reported state to help operators understand what happened.
        </P>
        <ArticleCallout kind="important" label="Reliability principle">
          Recovery should restore a known-good operating state without requiring a site visit.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="22" id="security-boundaries">
          Security boundaries
        </SectionHeading>
        <P>
          A signage platform controls physical screens and remote commands, so its trust
          boundaries should be explicit.
        </P>
        <P>
          User identities, device identities and platform credentials are different concerns
          and should not share the same secrets.
        </P>
        <P>Important protections include:</P>
        <UL>
          <li>encrypted transport;</li>
          <li>short-lived user sessions;</li>
          <li>durable but revocable device credentials;</li>
          <li>tenant-scoped authorisation;</li>
          <li>pairing expiry and single use;</li>
          <li>protected server secrets;</li>
          <li>command permissions;</li>
          <li>audit records;</li>
          <li>verified or signed software updates where supported;</li>
          <li>safe local credential storage.</li>
        </UL>
        <P>
          Never embed private server credentials in a public frontend or distributed runtime
          package.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="23" id="observability-and-operational-states">
          Observability and operational states
        </SectionHeading>
        <P>Operators need operational states that answer support questions, for example:</P>
        <UL>
          <li>connected and current;</li>
          <li>connected and downloading;</li>
          <li>offline and playing cached content;</li>
          <li>offline with stale policy;</li>
          <li>runtime update required;</li>
          <li>storage attention required;</li>
          <li>playback error;</li>
          <li>last seen at a specific time.</li>
        </UL>
        <P>
          Operational states should be derived from desired state, reported state and recent
          events rather than from a single heartbeat flag.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="24" id="common-architecture-mistakes">
          Common architecture mistakes
        </SectionHeading>
        <div className="flex flex-col gap-3">
          <Mistake title="Treating the player as a webpage">
            A live URL is not a durable offline runtime.
          </Mistake>
          <Mistake title="Putting platform logic in the product layer">
            Every new operating system then multiplies frontend and server complexity.
          </Mistake>
          <Mistake title="Activating incomplete content">
            Delivery and activation must remain separate.
          </Mistake>
          <Mistake title="Assuming permanent connectivity">
            The player needs policy and schedule state locally.
          </Mistake>
          <Mistake title="Using one credential type for users and devices">
            Human and device identities have different lifecycle and security requirements.
          </Mistake>
          <Mistake title="Recording only online or offline">
            Operators need to know whether content is current and playback is healthy.
          </Mistake>
          <Mistake title="Ignoring firmware">
            The same hardware can behave differently across operating-system builds.
          </Mistake>
          <Mistake title="Starting with microservices">
            Distributed deployment does not replace clear boundaries.
          </Mistake>
          <Mistake title="Designing for one platform only">
            Abstract common capabilities before platform behaviour leaks everywhere.
          </Mistake>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="25" id="where-tomorrowos-fits">
          Where TomorrowOS fits
        </SectionHeading>
        <P>
          TomorrowOS is an open-source infrastructure layer for teams building digital signage
          products.
        </P>
        <P>
          It is designed to sit beneath the product and workflow layer, providing reusable
          server-to-screen capabilities while the developer retains ownership of the customer
          experience.
        </P>
        <P>
          A product built on TomorrowOS can still own its users, brand, workflows, commercial
          model, vertical features and customer data.
        </P>
        <ArticleDiagram
          alt="Three stacked panels: the custom product at the top owning users and organisations, workflows and vertical features, brand and customer experience, commercial model and product data; TomorrowOS infrastructure beneath providing the server SDK and APIs, device identity and communication, content and policy delivery, commands and events, the offline runtime and platform adapters; supported screen environments at the bottom."
          caption="TomorrowOS boundary"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramPanel
              title="Your product"
              items={[
                'Users and organisations',
                'Workflows and vertical features',
                'Brand and customer experience',
                'Commercial model',
                'Product data',
              ]}
            />
            <DiagramArrow />
            <DiagramPanel
              title="TomorrowOS infrastructure"
              items={[
                'Server SDK and APIs',
                'Device identity and communication',
                'Content and policy delivery',
                'Commands and events',
                'Offline runtime',
                'Platform adapters',
              ]}
            />
            <DiagramArrow />
            <DiagramNode>Supported screen environments</DiagramNode>
          </div>
        </ArticleDiagram>
        <P>
          TomorrowOS does not remove the need to design the product. It reduces the amount of
          common signage infrastructure each team must rebuild independently.
        </P>
        <ArticleCallout kind="engineering" label="Current product truth">
          Platform support, package versions and implementation details change over time.
          Review the current TomorrowOS documentation and GitHub repositories before planning
          production deployment.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="26" id="architecture-checklist">
          Architecture checklist
        </SectionHeading>
        <ArticleChecklist
          ariaLabel="Architecture checklist"
          groups={[
            {
              title: 'Product boundary',
              items: [
                'Customer workflows are platform-neutral.',
                'Product-specific data is separated from device-runtime state.',
                'Hardware differences do not leak into every interface.',
              ],
            },
            {
              title: 'Control plane',
              items: [
                'Desired and reported state are distinct.',
                'Pairing and device lifecycle are defined.',
                'Commands have delivery and completion states.',
                'Tenant boundaries are enforced.',
              ],
            },
            {
              title: 'Content plane',
              items: [
                'Assets have versions and metadata.',
                'Manifests describe required state.',
                'Downloads are verified before activation.',
                'Rollback and retention are defined.',
              ],
            },
            {
              title: 'Edge runtime',
              items: [
                'Identity and policy survive restart.',
                'Playback continues offline.',
                'Events buffer while disconnected.',
                'Recovery returns to a known-good state.',
              ],
            },
            {
              title: 'Platform and operations',
              items: [
                'Capabilities are represented honestly.',
                'Exact model and firmware are recorded.',
                'Operational states answer support questions.',
                'Security boundaries and update paths are documented.',
              ],
            },
          ]}
        />
      </section>
    </>
  );
}
