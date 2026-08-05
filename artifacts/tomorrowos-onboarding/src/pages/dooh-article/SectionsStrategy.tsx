/**
 * /how-to-start-a-dooh-network — sections: Select hardware and connectivity
 * through DOOH network launch checklist. Copy is rendered verbatim from the
 * approved editorial source; do not reword without editorial sign-off.
 */
import {
  SectionHeading,
  SubHeading,
  P,
  UL,
  ExtLink,
  ArticleDataTable,
} from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramArrow,
  DiagramNode,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';
import { ArticleChecklist } from '@/components/blog/ArticleChecklist';
import { siteConfig } from '@/config/site';

const ROADMAP_PHASES: { title: string; body: string }[] = [
  {
    title: 'Phase 1: Validate the venue and audience model',
    body: 'Secure a small group of locations. Confirm screen visibility, audience context, venue rights and advertiser relevance before investing in a large fleet.',
  },
  {
    title: 'Phase 2: Deploy a technical pilot',
    body: 'Install a limited number of screens using standard hardware and connectivity. Test content delivery, offline playback, reboot recovery, support access and proof-of-play capture.',
  },
  {
    title: 'Phase 3: Define the media product',
    body: 'Create inventory packages, creative standards, pricing, reporting and advertiser rules. Make the product understandable before adding complex buying options.',
  },
  {
    title: 'Phase 4: Run real paid campaigns',
    body: 'Use actual advertisers to test approvals, scheduling, delivery, reporting, billing and venue support. Record the operational work required.',
  },
  {
    title: 'Phase 5: Standardise',
    body: 'Document installation, configuration, creative review, monitoring, incident response and replacement workflows.',
  },
  {
    title: 'Phase 6: Add automation selectively',
    body: 'Introduce self-service, programmatic demand, advanced measurement or dynamic creative only when the underlying data and operations are reliable.',
  },
  {
    title: 'Phase 7: Scale carefully',
    body: 'Add screens and venues at a rate that sales, support, measurement and cash flow can sustain.',
  },
];

export function DoohSectionsStrategy() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading id="select-hardware-and-connectivity">
          11. Select hardware and connectivity for the environment
        </SectionHeading>
        <UL>
          <li>Commercial display versus consumer television.</li>
          <li>System-on-chip display versus external media player.</li>
          <li>Brightness and ambient light.</li>
          <li>Portrait or landscape orientation.</li>
          <li>Thermal conditions and ventilation.</li>
          <li>Operating hours and duty cycle.</li>
          <li>Local storage.</li>
          <li>Power recovery and automatic startup.</li>
          <li>Network type and expected reliability.</li>
          <li>Remote access and diagnostics.</li>
          <li>Physical security and tamper risk.</li>
          <li>Mounting, cable access and serviceability.</li>
        </UL>
        <P>
          The cheapest screen is not always the lowest-cost deployment. Field visits,
          unreliable startup behaviour and inconsistent media playback can quickly exceed the
          initial hardware saving.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="establish-creative-and-content-operations">
          12. Establish creative and content operations
        </SectionHeading>
        <UL>
          <li>Accepted dimensions and aspect ratios.</li>
          <li>Maximum duration.</li>
          <li>Container, codec and bitrate guidance.</li>
          <li>Audio policy.</li>
          <li>Safe zones and text size.</li>
          <li>Animation and transition rules.</li>
          <li>Prohibited advertiser categories.</li>
          <li>Venue-specific restrictions.</li>
          <li>Approval ownership and turnaround time.</li>
          <li>Creative expiry and withdrawal.</li>
          <li>Emergency removal process.</li>
          <li>Fallback content when inventory is unsold.</li>
        </UL>
        <ArticleCallout kind="practical">
          <strong className="text-foreground">Playback context matters.</strong> A video that
          works as native media may behave differently when embedded inside HTML or a
          third-party widget. Validate the actual creative in the actual playback context on
          the target device and firmware.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="design-operations-before-scaling">
          13. Design operations before scaling
        </SectionHeading>
        <UL>
          <li>Device health and last connection.</li>
          <li>Playback and download status.</li>
          <li>Screenshot or visual verification where supported.</li>
          <li>Internet outage handling.</li>
          <li>Display and player failure.</li>
          <li>Remote restart and diagnostics.</li>
          <li>Venue contact and site access.</li>
          <li>Spare hardware and replacement process.</li>
          <li>Incident severity and response targets.</li>
          <li>Firmware and runtime update policy.</li>
          <li>Campaign underdelivery and make-goods.</li>
          <li>Advertiser and venue escalation paths.</li>
        </UL>
        <P>
          Operational cost usually grows with the number of locations, hardware variation and
          exceptions. Standardising devices, installation, network configuration and support
          workflows is often more valuable than adding another dashboard feature.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="legal-privacy-and-contractual-requirements">
          14. Address legal, privacy and contractual requirements
        </SectionHeading>
        <P>
          Requirements vary substantially by country, state, venue and screen format. Obtain
          legal and regulatory advice for the jurisdictions in which the network operates.
        </P>
        <UL>
          <li>Rights to install and monetise media at the location.</li>
          <li>Advertiser and agency terms.</li>
          <li>Creative approvals and prohibited content.</li>
          <li>Privacy and data-processing obligations.</li>
          <li>Sensors, cameras and mobile-data use.</li>
          <li>Planning or roadside-display restrictions.</li>
          <li>Music, footage, image and font rights.</li>
          <li>Political, alcohol, gambling, healthcare and regulated advertising.</li>
          <li>Venue revenue share and audit rights.</li>
          <li>Service levels, liability and equipment ownership.</li>
          <li>Removal rights at contract end.</li>
        </UL>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="build-buy-or-assemble-the-platform">
          15. Build, buy or assemble the platform
        </SectionHeading>
        <ArticleDataTable
          caption="Platform paths: finished DOOH platform, signage CMS plus ad tools, custom platform, custom product on shared infrastructure"
          head={['Path', 'What you receive', 'Advantages', 'Trade-offs']}
          minWidth={760}
          rows={[
            [
              'Finished DOOH platform',
              'CMS, campaign tools, inventory, reporting and integrations',
              'Fastest route to market',
              'Less product control and vendor dependence',
            ],
            [
              'Signage CMS plus ad tools',
              'Screen operations combined with separate commercial systems',
              'Flexible and available from established products',
              'Integration and reconciliation complexity',
            ],
            [
              'Custom platform',
              'Complete ownership across product and device stack',
              'Maximum differentiation and control',
              'Highest engineering and maintenance burden',
            ],
            [
              'Custom product on shared infrastructure',
              'Your commercial application on reusable device/runtime infrastructure',
              'Own the customer experience without rebuilding every player layer',
              'Still requires campaign, inventory, sales and measurement systems',
            ],
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="where-tomorrowos-fits">16. Where TomorrowOS fits</SectionHeading>
        <P>
          TomorrowOS is an open-source infrastructure layer for teams building digital signage
          and DOOH software. It is not presented as a complete advertising sales,
          audience-measurement or programmatic platform.
        </P>
        <P>
          A network operator can build its own commercial application while using TomorrowOS
          for shared server-to-screen capabilities.
        </P>
        <ArticleDiagram
          wide
          alt="TomorrowOS boundary diagram: your DOOH product — advertisers and agencies, campaigns and orders, inventory and pricing, measurement and reporting, billing and commercial workflows, brand and customer experience — sits above the TomorrowOS infrastructure layer, which provides the server SDK and APIs, device communication, content delivery, playback policies, local runtime and offline behaviour, commands and events, and platform adapters, which in turn serve the supported screen environments."
          caption="TomorrowOS focuses on reusable screen infrastructure while the operator owns the DOOH product and commercial model."
        >
          <DiagramPanel
            title="Your DOOH product"
            items={[
              'Advertisers and agencies',
              'Campaigns and orders',
              'Inventory and pricing',
              'Measurement and reporting',
              'Billing and commercial workflows',
              'Brand and customer experience',
            ]}
          />
          <DiagramArrow />
          <DiagramPanel
            title="TomorrowOS infrastructure"
            items={[
              'Server SDK and APIs',
              'Device communication',
              'Content delivery',
              'Playback policies',
              'Local runtime and offline behaviour',
              'Commands and events',
              'Platform adapters',
            ]}
          />
          <DiagramArrow />
          <DiagramNode emphasis>Supported screen environments</DiagramNode>
        </ArticleDiagram>
        <SubHeading id="what-the-operator-still-needs">
          What the operator still needs to build or integrate
        </SubHeading>
        <UL>
          <li>Advertiser and agency management.</li>
          <li>Sales pipeline, proposals and orders.</li>
          <li>Campaign and creative approval workflows.</li>
          <li>Inventory modelling and forecasting.</li>
          <li>Pricing and commercial rules.</li>
          <li>Ad-serving and pacing logic.</li>
          <li>Programmatic integrations where required.</li>
          <li>Audience measurement and attribution.</li>
          <li>Billing, credits and reconciliation.</li>
          <li>Venue contracts and operational processes.</li>
        </UL>
        <ArticleCallout kind="important">
          <strong className="text-foreground">Current product truth.</strong> Platform support,
          package versions and implementation details change over time. Review the current
          TomorrowOS <ExtLink href={siteConfig.links.docs}>documentation</ExtLink> and{' '}
          <ExtLink href={siteConfig.links.github}>GitHub repositories</ExtLink> before planning
          a production deployment.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="a-practical-launch-roadmap">17. A practical launch roadmap</SectionHeading>
        <ol className="flex flex-col gap-4">
          {ROADMAP_PHASES.map((phase) => (
            <li key={phase.title} className="flex flex-col gap-1">
              <SubHeading>{phase.title}</SubHeading>
              <P>{phase.body}</P>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="dooh-network-launch-checklist">
          18. DOOH network launch checklist
        </SectionHeading>
        <ArticleChecklist
          ariaLabel="DOOH network launch checklist"
          groups={[
            {
              title: 'Business',
              items: [
                'Network model selected.',
                'Audience and venue proposition validated.',
                'Venue rights documented.',
                'Pricing and revenue-share model defined.',
                'Sales ownership established.',
              ],
            },
            {
              title: 'Technology',
              items: [
                'CMS selected or designed.',
                'Player runtime and offline behaviour validated.',
                'Campaign and inventory logic defined.',
                'Proof-of-play workflow tested.',
                'Monitoring and remote support available.',
              ],
            },
            {
              title: 'Advertising',
              items: [
                'Creative standards published.',
                'Approval workflow defined.',
                'Campaign pacing and priority rules tested.',
                'Underdelivery and make-good policy documented.',
                'Advertiser reporting agreed.',
              ],
            },
            {
              title: 'Measurement',
              items: [
                'Audience methodology documented.',
                'Measured and modelled data distinguished.',
                'Privacy review completed.',
                'Attribution claims limited to available evidence.',
              ],
            },
            {
              title: 'Operations',
              items: [
                'Installation standard documented.',
                'Venue contacts recorded.',
                'Spare and replacement process ready.',
                'Incident escalation defined.',
                'Firmware and runtime update process controlled.',
              ],
            },
            {
              title: 'Commercial controls',
              items: [
                'Billing process defined.',
                'Venue payments reconciled.',
                'Programmatic fees understood where applicable.',
                'Contracts and prohibited categories reviewed.',
                'Rollback and exit plans documented.',
              ],
            },
          ]}
        />
      </section>
    </>
  );
}
