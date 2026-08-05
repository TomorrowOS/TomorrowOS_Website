/**
 * /how-to-start-a-dooh-network — sections: What is a DOOH network? through
 * Build the commercial model. Copy is rendered verbatim from the approved
 * editorial source; do not reword without editorial sign-off.
 */
import { SectionHeading, SubHeading, P, UL, ArticleDataTable } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';

export function DoohSectionsFoundation() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading id="what-is-a-dooh-network">What is a DOOH network?</SectionHeading>
        <P>
          Digital out-of-home, usually shortened to DOOH, is advertising delivered through
          digital screens in shared physical environments outside a person’s home. The screen
          may be a large roadside display, a portrait panel in a shopping centre, a television
          inside a gym, a digital menu board, a display at a petrol station or a network of
          screens inside retail stores.
        </P>
        <P>
          A DOOH network is the combination of those screens, the locations that host them, the
          software used to manage them and the commercial system used to sell advertising
          inventory. The operator may own the hardware, share revenue with venues, license
          software to media owners or combine several models.
        </P>
        <P>
          The defining characteristic is not simply that the content is digital. The network is
          operated as advertising media. Campaigns have buyers, start and end dates, targeting
          rules, delivery requirements and reporting obligations.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="dooh-digital-signage-and-retail-media">
          DOOH, digital signage and retail media
        </SectionHeading>
        <ArticleDataTable
          caption="Comparison of digital signage, DOOH, retail media and place-based media"
          head={['Category', 'Primary purpose', 'Typical buyer', 'Core systems']}
          minWidth={720}
          rows={[
            [
              'Digital signage',
              'Communicate information or promote the operator’s own products',
              'Venue, brand or internal team',
              'CMS, devices, schedules, playback',
            ],
            [
              'DOOH',
              'Sell access to audiences in public or commercial places',
              'Advertiser, agency or programmatic buyer',
              'CMS, campaign system, inventory, proof of play, measurement',
            ],
            [
              'Retail media',
              'Monetise retailer-owned audiences and placements close to purchase',
              'Brands sold through the retailer',
              'DOOH stack plus retailer data, sales and attribution',
            ],
            [
              'Place-based media',
              'Reach an audience defined by a specific environment',
              'Advertisers relevant to the venue context',
              'DOOH stack tailored to gyms, clinics, lifts, campuses or similar venues',
            ],
          ]}
        />
        <ArticleCallout kind="important">
          <strong className="text-foreground">Key distinction.</strong> A signage CMS answers
          what a screen should play. A DOOH platform must also answer what inventory is
          available, who bought it, how the campaign should pace and what evidence proves
          delivery.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="choose-the-network-model">1. Choose the network model</SectionHeading>
        <P>
          Before selecting software or screens, define which business you are actually
          building. Different models require different contracts, economics and technology.
        </P>
        <SubHeading>Owned-and-operated network</SubHeading>
        <P>
          You own or control the screens and sell the advertising directly. This gives the
          greatest control over hardware, pricing and operations, but also carries the full
          capital and support burden.
        </P>
        <SubHeading>Venue partnership network</SubHeading>
        <P>
          You place screens in third-party venues in return for advertising rights, a fixed
          fee, a service exchange or revenue share. The agreement must define who pays for
          hardware, electricity, connectivity, maintenance and content.
        </P>
        <SubHeading>Software platform</SubHeading>
        <P>
          You provide the CMS, player, campaign tools or reporting system to existing media
          owners. The customer controls the audience and commercial inventory while you sell
          technology.
        </P>
        <SubHeading>Retail media network</SubHeading>
        <P>
          A retailer monetises screens and other placements across its own stores. The value
          proposition can combine first-party data, proximity to purchase and sales
          attribution.
        </P>
        <SubHeading>Marketplace or programmatic network</SubHeading>
        <P>
          You connect inventory to automated buying platforms. This can widen demand, but it
          adds technical standards, quality controls, fees and reporting reconciliation.
        </P>
        <ArticleCallout kind="practical">
          Do not design for every model in version one. A ten-screen venue partnership pilot
          and a programmatic marketplace are different businesses. Choose one primary model and
          make its operations repeatable first.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="select-locations-and-define-the-audience">
          2. Select locations and define the audience
        </SectionHeading>
        <P>
          A screen is not valuable because it exists. Its media value comes from the audience,
          the environment, the likelihood of attention and the operator’s ability to
          demonstrate delivery.
        </P>
        <P>
          A technically perfect network in weak locations will struggle commercially. A strong
          audience proposition can make even a modest network attractive to advertisers.
        </P>
        <UL>
          <li>Foot traffic or vehicle traffic relevant to the format.</li>
          <li>Dwell time and the likelihood that people can see the screen.</li>
          <li>Viewing distance, angle, brightness and physical obstruction.</li>
          <li>Audience context, such as fitness, healthcare, transport, retail or hospitality.</li>
          <li>Operating hours and the number of genuinely viewable advertising opportunities.</li>
          <li>Category relevance for likely advertisers.</li>
          <li>Exclusivity and competing screens inside the venue.</li>
          <li>
            Whether venue rules restrict alcohol, gambling, political, healthcare or competitor
            advertising.
          </li>
          <li>
            Whether the audience can be measured credibly without creating unnecessary privacy
            risk.
          </li>
        </UL>
        <SubHeading id="venue-agreements">Venue agreements</SubHeading>
        <P>
          The venue agreement should be treated as a core media asset, not an informal
          installation permission. It should define the site rights, term, renewal, screen
          placement, access, revenue share, content rights, maintenance responsibilities,
          relocation, connectivity, approval rules and what happens when equipment fails or the
          relationship ends.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading id="build-the-commercial-model">3. Build the commercial model</SectionHeading>
        <P>
          The commercial model must account for both the cost of installing a network and the
          ongoing cost of operating it. Revenue can look attractive before support, venue
          payments, programmatic fees and sales costs are included.
        </P>
        <SubHeading id="typical-cost-categories">Typical cost categories</SubHeading>
        <UL>
          <li>Displays, media players, mounts and installation.</li>
          <li>Connectivity, power and local storage.</li>
          <li>CMS, ad-serving and reporting software.</li>
          <li>Content operations and creative review.</li>
          <li>Field maintenance and replacement hardware.</li>
          <li>Venue fees or revenue share.</li>
          <li>Sales commissions and agency fees.</li>
          <li>Programmatic supply-side, marketplace and data fees.</li>
          <li>Audience measurement and attribution.</li>
          <li>Insurance, legal and compliance costs.</li>
        </UL>
        <SubHeading id="common-revenue-models">Common revenue models</SubHeading>
        <ArticleDataTable
          caption="Common DOOH revenue models and their operational implications"
          head={['Model', 'How it works', 'Operational implication']}
          minWidth={640}
          rows={[
            [
              'Fixed placement',
              'Advertiser buys a defined screen package for a period',
              'Simple to sell and report, but less flexible',
            ],
            [
              'Share of voice',
              'Advertiser buys a percentage of available loop time',
              'Requires accurate loop and inventory calculations',
            ],
            [
              'Campaign package',
              'Screens, dates, creative and reporting bundled together',
              'Useful for direct sales and local advertisers',
            ],
            [
              'CPM or impression-based',
              'Buyer pays against estimated or delivered impressions',
              'Requires defensible audience methodology',
            ],
            [
              'Programmatic CPM',
              'Automated buyer competes for eligible inventory',
              'Adds integrations, fees, controls and reconciliation',
            ],
            [
              'Sponsorship',
              'Brand owns a location, category or recurring content segment',
              'High value but may restrict other sales',
            ],
            [
              'Venue-funded content',
              'Venue pays for the communication service while advertising offsets cost',
              'Creates hybrid signage and media economics',
            ],
          ]}
        />
        <ArticleCallout kind="important">
          <strong className="text-foreground">Do not assume passive income.</strong> Screens
          create inventory, not demand. A network still needs sales, campaign operations,
          advertiser service, reporting and maintenance. Programmatic access does not guarantee
          fill or profitable pricing.
        </ArticleCallout>
      </section>
    </>
  );
}
