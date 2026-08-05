/**
 * /how-to-start-a-dooh-network — sections: Assemble the DOOH technology stack
 * through Choose direct sales, programmatic or a hybrid. Copy is rendered
 * verbatim from the approved editorial source; do not reword without
 * editorial sign-off.
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
  DiagramNode,
  DiagramArrow,
  DiagramFlow,
  DiagramBranchRow,
} from '@/components/blog/ArticleDiagram';

const STACK_COMPONENTS: { name: string; role: string }[] = [
  {
    name: 'CMS',
    role: 'Manages screens, media, playlists, schedules, device health and venue content.',
  },
  {
    name: 'Campaign management',
    role: 'Stores advertisers, campaigns, creatives, budgets, dates, approvals and delivery requirements.',
  },
  {
    name: 'Ad server or decision engine',
    role: 'Determines which eligible advert should play, balancing targeting, pacing, priority and availability.',
  },
  {
    name: 'Inventory system',
    role: 'Represents the advertising opportunities available across screens, venues, dayparts and packages.',
  },
  {
    name: 'Proof of play',
    role: 'Records what actually played, where, when and for how long.',
  },
  {
    name: 'Audience measurement',
    role: 'Estimates reach, impressions, frequency or other audience outcomes using a defined methodology.',
  },
  {
    name: 'Programmatic integration',
    role: 'Connects eligible inventory to automated demand through standardised buying and selling systems.',
  },
  {
    name: 'Billing and reconciliation',
    role: 'Converts booked and delivered campaigns into invoices, credits, make-goods and financial records.',
  },
  {
    name: 'Device runtime',
    role: 'Downloads content, stores it locally, plays it according to policy, reports health and recovers from failures.',
  },
];

export function DoohSectionsTechnology() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading id="assemble-the-dooh-technology-stack">
          4. Assemble the DOOH technology stack
        </SectionHeading>
        <P>
          The content management system is essential, but it is not the entire DOOH platform. A
          scalable network separates the customer-facing commercial systems from the device and
          playback infrastructure beneath them.
        </P>
        <ArticleDiagram
          wide
          alt="DOOH technology stack diagram: advertisers and agencies flow into sales, proposals and campaign management, then into an ad server and decision engine supported by inventory, targeting and pacing, then into the digital signage CMS and policy layer, then the player runtime with local storage and playback, then the screens and venues, and finally proof of play, reporting and measurement."
          caption="A DOOH network combines commercial systems with reliable screen infrastructure."
        >
          <DiagramFlow
            steps={[
              'Advertisers and agencies',
              'Sales, proposals and campaign management',
              'Ad server and decision engine',
            ]}
          />
          <DiagramArrow />
          <DiagramBranchRow items={['Inventory', 'Targeting', 'Pacing']} />
          <DiagramArrow />
          <DiagramNode>Digital signage CMS and policy layer</DiagramNode>
          <DiagramArrow />
          <DiagramNode>Player runtime, local storage and playback</DiagramNode>
          <DiagramArrow />
          <DiagramNode>Screens and venues</DiagramNode>
          <DiagramArrow />
          <DiagramNode emphasis>Proof of play, reporting and measurement</DiagramNode>
        </ArticleDiagram>
        <dl className="flex flex-col gap-3">
          {STACK_COMPONENTS.map((c) => (
            <div key={c.name} className="flex flex-col gap-0.5">
              <dt className="font-semibold text-foreground">{c.name}</dt>
              <dd className="leading-relaxed text-muted-foreground">{c.role}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="what-the-dooh-cms-must-provide">
          5. What the DOOH CMS must provide
        </SectionHeading>
        <P>
          A conventional signage CMS can provide much of the screen-management foundation, but
          a DOOH network needs stronger campaign, approval and evidence workflows.
        </P>
        <UL>
          <li>Screen, venue, location and group management.</li>
          <li>Media upload, validation, versioning and creative approval.</li>
          <li>Playlist and policy management.</li>
          <li>Campaign start, end, daypart and targeting rules.</li>
          <li>Local caching and offline playback.</li>
          <li>Fallback content for unsold inventory or outages.</li>
          <li>Venue content mixed with paid advertising.</li>
          <li>Role-based permissions for operators, venues and advertisers.</li>
          <li>Playback logs and device telemetry.</li>
          <li>Remote diagnostics, screenshots and commands where supported.</li>
          <li>Clear handling of expired, rejected or withdrawn creatives.</li>
        </UL>
        <ArticleCallout kind="important">
          <strong className="text-foreground">CMS versus ad server.</strong> The CMS manages
          what the screens can play. The ad-serving layer decides which campaign should use
          each advertising opportunity. Small networks may combine these functions initially,
          but the responsibilities should remain conceptually separate.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="design-campaign-and-ad-serving-logic">
          6. Design campaign and ad-serving logic
        </SectionHeading>
        <P>
          Campaign logic turns a booking into a set of eligible playback opportunities. The
          system needs deterministic rules so operators can explain why an advert did or did
          not play.
        </P>
        <UL>
          <li>Campaign start and end dates.</li>
          <li>Venue, location, screen or audience targeting.</li>
          <li>Dayparting and days of week.</li>
          <li>Creative duration and format.</li>
          <li>Frequency or maximum repetition.</li>
          <li>Share of voice.</li>
          <li>Priority and sponsorship rules.</li>
          <li>Pacing across the campaign period.</li>
          <li>Category exclusions and venue restrictions.</li>
          <li>Make-good logic after underdelivery.</li>
          <li>Fallback behaviour when no paid campaign is eligible.</li>
        </UL>
        <SubHeading id="pacing">Pacing</SubHeading>
        <P>
          Pacing controls how delivery is distributed. A campaign booked for a month should not
          consume its entire allocation in the first few days unless that is intentional. The
          system may pace evenly, front-load, prioritise specific hours or adapt to remaining
          inventory.
        </P>
        <SubHeading id="priority-and-conflicts">Priority and conflicts</SubHeading>
        <P>
          The platform needs an explicit method for resolving conflicts between sponsorships,
          direct-sold campaigns, house content and programmatic demand. Hidden or inconsistent
          priority rules create disputes and support load.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="manage-inventory-not-only-screens">
          7. Manage inventory, not only screens
        </SectionHeading>
        <P>
          In DOOH, inventory is the opportunity to display advertising. One screen can create
          many different inventory products depending on time, audience, loop structure and
          commercial rules.
        </P>
        <UL>
          <li>Screen and venue.</li>
          <li>Available operating hours.</li>
          <li>Loop duration and advert slot length.</li>
          <li>Dayparts.</li>
          <li>Estimated audience.</li>
          <li>Permitted advertiser categories.</li>
          <li>Direct-sold commitments.</li>
          <li>Sponsorship restrictions.</li>
          <li>Programmatic eligibility.</li>
          <li>Fallback or venue-content allocation.</li>
        </UL>
        <P>
          Inventory forecasting helps prevent overbooking. The system should estimate whether a
          proposed campaign can meet its delivery target after existing commitments, exclusions
          and expected screen availability are considered.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="build-credible-proof-of-play">
          8. Build credible proof of play
        </SectionHeading>
        <P>
          Proof of play is the operational evidence that a specific creative was displayed. It
          is not the same as proof that the file downloaded, proof that the campaign was
          scheduled or proof that a person saw the advert.
        </P>
        <ArticleDiagram
          alt="Proof-of-play lifecycle diagram: campaign booked, creative approved, creative downloaded, playback opportunity selected, creative starts, playback completes or fails, event recorded locally, event uploaded and reconciled, advertiser report."
          caption="A proof-of-play workflow should record actual playback, not only scheduling intent."
        >
          <DiagramFlow
            steps={[
              'Campaign booked',
              'Creative approved',
              'Creative downloaded',
              'Playback opportunity selected',
              'Creative starts',
              'Playback completes or fails',
              'Event recorded locally',
              'Event uploaded and reconciled',
              'Advertiser report',
            ]}
          />
        </ArticleDiagram>
        <SubHeading id="useful-proof-of-play-fields">Useful proof-of-play fields</SubHeading>
        <UL>
          <li>Campaign identifier.</li>
          <li>Creative identifier and version.</li>
          <li>Screen and venue.</li>
          <li>Scheduled opportunity.</li>
          <li>Actual playback start time.</li>
          <li>Actual or expected duration.</li>
          <li>Completion or failure status.</li>
          <li>Device, runtime and relevant software version.</li>
          <li>Whether the device was online or offline.</li>
          <li>Event creation and server-upload timestamps.</li>
          <li>Error information when playback failed.</li>
        </UL>
        <ArticleCallout kind="important">
          <strong className="text-foreground">Important distinction.</strong> Proof of schedule
          shows intent. Proof of download shows availability. Proof of play shows a playback
          event. Audience measurement estimates exposure. A professional report should not blur
          these concepts.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="define-audience-measurement">
          9. Define audience measurement before selling impressions
        </SectionHeading>
        <P>
          Measurement practices vary by market, format and available data. Industry bodies have
          continued to publish frameworks because DOOH measurement remains fragmented and
          buyers need greater consistency and transparency.
        </P>
        <UL>
          <li>Traffic or footfall counts.</li>
          <li>Dwell time.</li>
          <li>Visibility and viewing opportunity.</li>
          <li>Impression models.</li>
          <li>Audience composition.</li>
          <li>Mobile movement data.</li>
          <li>Sensors or computer vision used within applicable privacy rules.</li>
          <li>QR scans or direct response.</li>
          <li>Website or search lift.</li>
          <li>Store visits.</li>
          <li>Sales attribution.</li>
        </UL>
        <ArticleCallout kind="important">
          <strong className="text-foreground">Measurement rule.</strong> Do not sell impression
          precision that the methodology cannot support. Document the data source, assumptions,
          update frequency, geographic coverage and limitations. Separate measured values from
          modelled estimates.
        </ArticleCallout>
        <SubHeading id="privacy">Privacy</SubHeading>
        <P>
          Audience measurement should be designed with privacy, legal review and data
          minimisation in mind. A DOOH network does not need to identify individual people to
          be useful. Aggregated audience estimates, venue traffic and contextual data may be
          sufficient for many business models.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="choose-direct-sales-programmatic-or-a-hybrid">
          10. Choose direct sales, programmatic or a hybrid
        </SectionHeading>
        <ArticleDataTable
          caption="Comparison of direct sales and programmatic DOOH"
          head={['Area', 'Direct sales', 'Programmatic DOOH']}
          minWidth={680}
          rows={[
            [
              'Buyer relationship',
              'Operator manages advertiser or agency directly',
              'Demand arrives through automated buying platforms',
            ],
            [
              'Pricing',
              'Negotiated packages, sponsorships or CPM',
              'Auction or deal-based pricing',
            ],
            [
              'Control',
              'High control over advertisers and packages',
              'Rules and integrations determine eligibility',
            ],
            [
              'Operations',
              'More proposals, approvals and account service',
              'More technical integration and reconciliation',
            ],
            [
              'Demand',
              'Depends on sales capability',
              'Can widen access but does not guarantee fill',
            ],
            ['Fees', 'Sales and agency costs', 'SSP, marketplace, data and platform fees'],
            [
              'Best early use',
              'Local or vertical network proving demand',
              'Mature inventory with quality data and operational controls',
            ],
          ]}
        />
        <P>
          <ExtLink href="https://iabtechlab.com/dooh-integrated-into-openrtb/">
            IAB Tech Lab has incorporated DOOH into OpenRTB
          </ExtLink>
          , providing a standardised basis for programmatic transactions. That does not remove
          the need for inventory quality, creative approval, venue rules, pacing and accurate
          reporting.
        </P>
      </section>
    </>
  );
}
