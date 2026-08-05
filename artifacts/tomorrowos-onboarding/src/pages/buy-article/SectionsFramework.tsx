/**
 * /build-vs-buy-digital-signage-cms — sections 10–17 (alternative paths,
 * decision framework and where TomorrowOS fits). Copy is rendered verbatim
 * from the approved editorial source; do not reword without editorial
 * sign-off. Founder-voice passages are deliberate.
 */
import { SectionHeading, P, UL, SubHeading, ArticleDataTable } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramArrow,
  DiagramNode,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';

/** Titled mistake record used in "Common decision mistakes". */
function Mistake({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex break-inside-avoid flex-col gap-1 border-b border-border/60 pb-3 last:border-b-0">
      <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function BuySectionsFramework() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="10" id="the-hybrid-options">
          The hybrid options
        </SectionHeading>
        <P>The decision is not limited to buying everything or building everything.</P>
        <SubHeading>Custom application on a commercial CMS</SubHeading>
        <P>
          The team builds its product or workflow and uses a vendor API for screens, content
          and playback. This can reduce infrastructure work while retaining some product
          differentiation.
        </P>
        <SubHeading>Commercial CMS with a custom integration layer</SubHeading>
        <P>
          A middleware service connects business systems to an existing platform. This can be
          effective when the CMS already handles the hardware well but does not match the
          internal workflow.
        </P>
        <SubHeading>Custom dashboard with shared runtime infrastructure</SubHeading>
        <P>
          The team owns the complete customer experience while reusing device communication,
          content delivery, offline runtime and platform adapters.
        </P>
        <SubHeading>Phased migration</SubHeading>
        <P>
          A business may launch on a finished CMS, validate the product and later replace
          selected layers once the value of ownership is proven.
        </P>
        <ArticleDiagram
          alt="A spectrum from buy everything at the top — a commercial CMS and player — through hybrid options in the middle — your product with vendor APIs, your workflow with shared infrastructure, or a commercial launch with phased replacement — down to build everything: your product, server, runtime and adapters."
          caption="The build-buy spectrum"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramNode emphasis>Buy everything</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Commercial CMS and player</DiagramNode>
            <DiagramArrow />
            <DiagramPanel
              title="Hybrid"
              items={[
                'Your product + vendor APIs',
                'Your workflow + shared infrastructure',
                'Commercial launch + phased replacement',
              ]}
            />
            <DiagramArrow />
            <DiagramNode emphasis>Build everything</DiagramNode>
            <DiagramArrow />
            <DiagramNode>Your product, server, runtime and adapters</DiagramNode>
          </div>
        </ArticleDiagram>
        <ArticleCallout kind="important">
          A phased approach is often underrated. Launching on an existing platform can prove
          demand before the organisation takes on the cost of owning infrastructure.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="11" id="how-ai-has-changed-the-equation">
          How AI has changed the equation
        </SectionHeading>
        <P>
          AI-assisted development tools have reduced the cost and time required to create
          software interfaces, APIs, database schemas, tests and integrations.
        </P>
        <P>
          Tools such as Replit, Cursor, Claude Code, OpenAI Codex and GitHub Copilot can help
          a capable team move faster.
        </P>
        <P>They do not remove the underlying operating responsibility.</P>
        <P>AI can accelerate:</P>
        <UL>
          <li>dashboard scaffolding;</li>
          <li>forms and workflow implementation;</li>
          <li>API clients;</li>
          <li>database migrations;</li>
          <li>test generation;</li>
          <li>documentation;</li>
          <li>code review and refactoring.</li>
        </UL>
        <P>AI does not automatically solve:</P>
        <UL>
          <li>reliable offline playback;</li>
          <li>firmware-specific behaviour;</li>
          <li>hardware validation;</li>
          <li>security architecture;</li>
          <li>safe update and rollback;</li>
          <li>field support;</li>
          <li>long-term product ownership.</li>
        </UL>
        <ArticleCallout kind="engineering">
          Building software has become easier. Operating dependable software across remote
          devices has not become proportionally easy.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="12" id="build-buy-and-hybrid-comparison">
          Build, buy and hybrid comparison
        </SectionHeading>
        <ArticleDataTable
          caption="Build, buy and hybrid comparison"
          head={['Area', 'Buy', 'Hybrid', 'Full build']}
          minWidth={720}
          rows={[
            ['Time to initial launch', 'Usually fastest', 'Moderate', 'Usually longest'],
            ['Product control', 'Vendor-defined', 'High in selected layers', 'Complete'],
            ['Player/runtime ownership', 'Vendor', 'Shared or infrastructure provider', 'Your team'],
            ['Platform maintenance', 'Vendor', 'Shared', 'Your team'],
            ['Custom workflow', 'Limited to extensibility', 'High', 'Unlimited'],
            ['Operational burden', 'Lowest', 'Focused', 'Highest'],
            ['Vendor dependence', 'Highest', 'Reduced', 'Lowest'],
            ['Engineering investment', 'Lowest', 'Moderate', 'Highest'],
            [
              'Best suited for',
              'Standard signage needs',
              'Differentiated product with reusable infrastructure',
              'Infrastructure as core advantage',
            ],
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="13" id="a-practical-decision-matrix">
          A practical decision matrix
        </SectionHeading>
        <ArticleDataTable
          caption="Practical decision matrix"
          head={['Situation', 'Likely path', 'Why']}
          minWidth={720}
          rows={[
            [
              'Internal office communications',
              'Buy',
              'The software supports communication rather than a differentiated product.',
            ],
            [
              'A small group of promotional screens',
              'Buy',
              'Standard media, playlist and scheduling features are usually sufficient.',
            ],
            [
              'A multi-location retailer using conventional content',
              'Usually buy',
              'A mature CMS reduces operating risk unless a unique workflow is essential.',
            ],
            [
              'A restaurant SaaS product with dynamic menus',
              'Hybrid or build',
              'Signage may need to be embedded into product data and customer workflows.',
            ],
            [
              'A retail media or DOOH platform',
              'Hybrid or build',
              'Campaign, inventory and proof-of-play workflows are part of the product.',
            ],
            [
              'An OEM or white-label signage platform',
              'Hybrid or build',
              'The company needs ownership of brand, workflows and commercial model.',
            ],
            [
              'A highly regulated or private deployment',
              'Depends',
              'Hosting, data control and security requirements may justify ownership.',
            ],
            [
              'A team without long-term engineering support',
              'Buy',
              'The ability to launch is not the same as the ability to operate.',
            ],
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="14" id="twenty-questions-to-ask-before-deciding">
          Twenty questions to ask before deciding
        </SectionHeading>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/70">
          <li>Is digital signage part of the product, or only a tool used by the business?</li>
          <li>What exact workflow cannot be supported by an existing platform?</li>
          <li>Would ownership create a customer, commercial or operational advantage?</li>
          <li>How quickly must the first deployment launch?</li>
          <li>Which screen operating systems and hardware must be supported?</li>
          <li>Does the team understand offline playback and edge-state management?</li>
          <li>Who will own player releases and firmware validation?</li>
          <li>Who responds when a screen fails outside business hours?</li>
          <li>How will interrupted downloads, corrupted content and storage exhaustion be handled?</li>
          <li>How will device pairing, credentials and revocation work?</li>
          <li>What telemetry is required to support customers remotely?</li>
          <li>How will updates be rolled back?</li>
          <li>How will old player versions be supported?</li>
          <li>What security and compliance obligations apply?</li>
          <li>How much of the team will be dedicated to infrastructure rather than customer features?</li>
          <li>What is the three-year operating commitment, not only the first-year build?</li>
          <li>Can a commercial API or white-label platform solve the unique portion?</li>
          <li>Could a phased or hybrid approach prove the product first?</li>
          <li>What happens if the original developers leave?</li>
          <li>Would customers pay more, stay longer or adopt faster because the platform is owned?</li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="15" id="common-decision-mistakes">
          Common decision mistakes
        </SectionHeading>
        <div className="flex flex-col gap-3">
          <Mistake title="Building because the team can">
            Technical possibility is not a business case.
          </Mistake>
          <Mistake title="Comparing licence fees only with initial development">
            A fair comparison includes support, infrastructure, security, QA, documentation,
            updates and opportunity cost.
          </Mistake>
          <Mistake title="Underestimating the player runtime">
            The dashboard is visible. The edge runtime is where reliability is created.
          </Mistake>
          <Mistake title="Assuming AI removes maintenance">
            AI can help create code. It does not accept operational accountability.
          </Mistake>
          <Mistake title="Choosing a vendor only on feature count">
            Reliability, support quality, supported hardware and release discipline may matter
            more than another dashboard feature.
          </Mistake>
          <Mistake title="Building for hypothetical scale">
            Do not commit to years of infrastructure ownership before validating customers,
            workflows and commercial demand.
          </Mistake>
          <Mistake title="Ignoring exit costs">
            Buying can create vendor dependence. Building can create internal dependence on a
            small team. Both require a realistic exit and migration path.
          </Mistake>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="16" id="where-tomorrowos-fits">
          Where TomorrowOS fits
        </SectionHeading>
        <P>
          TomorrowOS exists for the space between buying an entire finished CMS and building
          every layer independently.
        </P>
        <P>A developer can own the product layer:</P>
        <UL>
          <li>customer experience;</li>
          <li>users and organisations;</li>
          <li>vertical workflows;</li>
          <li>business data;</li>
          <li>branding;</li>
          <li>commercial model;</li>
          <li>industry-specific features.</li>
        </UL>
        <P>
          TomorrowOS is intended to provide reusable server-to-screen infrastructure beneath
          that product:
        </P>
        <UL>
          <li>SDK and APIs;</li>
          <li>device identity and communication;</li>
          <li>content and policy delivery;</li>
          <li>commands and events;</li>
          <li>offline runtime behaviour;</li>
          <li>platform adapters.</li>
        </UL>
        <ArticleDiagram
          alt="Three stacked panels: your product at the top owning brand and customer experience, users and workflows, product data, vertical features and commercial model; TomorrowOS beneath providing the server SDK and APIs, device communication, content and policy delivery, commands and events, offline runtime and platform adapters; screen environments at the bottom."
          caption="The shared-infrastructure model"
          wide
        >
          <div className="flex flex-col gap-0">
            <DiagramPanel
              title="Your product"
              items={[
                'Brand and customer experience',
                'Users and workflows',
                'Product data',
                'Vertical features',
                'Commercial model',
              ]}
            />
            <DiagramArrow />
            <DiagramPanel
              title="TomorrowOS"
              items={[
                'Server SDK and APIs',
                'Device communication',
                'Content and policy delivery',
                'Commands and events',
                'Offline runtime',
                'Platform adapters',
              ]}
            />
            <DiagramArrow />
            <DiagramNode>Screen environments</DiagramNode>
          </div>
        </ArticleDiagram>
        <P>
          TomorrowOS is not the correct answer for every organisation. A business that simply
          needs screens working quickly may still be better served by a finished commercial
          CMS.
        </P>
        <ArticleCallout kind="important">
          Most businesses should buy. Teams should build when signage itself becomes part of
          the product, the competitive advantage or the long-term strategy. TomorrowOS is
          designed for that second group.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="17" id="recommended-decision-process">
          Recommended decision process
        </SectionHeading>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/70">
          <li>Define the business outcome before evaluating software.</li>
          <li>Document the unique workflows and non-negotiable requirements.</li>
          <li>Evaluate mature commercial platforms honestly.</li>
          <li>Estimate the complete three-year ownership burden of building.</li>
          <li>Identify which layers genuinely need to be owned.</li>
          <li>Test a hybrid approach where it can reduce risk.</li>
          <li>Run a limited pilot before committing to a full platform strategy.</li>
          <li>Assign long-term ownership for engineering, support, security and releases.</li>
          <li>Review the decision after real customer and deployment evidence exists.</li>
        </ol>
      </section>
    </>
  );
}
