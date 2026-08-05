/**
 * /build-vs-buy-digital-signage-cms — sections 01–04 (the decision).
 * Copy is rendered verbatim from the approved editorial source; do not
 * reword without editorial sign-off. Founder-voice passages are deliberate.
 */
import { SectionHeading, P, UL, SubHeading } from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';

export function BuySectionsDecision() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SectionHeading number="01" id="the-decision-in-one-sentence">
          The decision in one sentence
        </SectionHeading>
        <P>
          If digital signage is a tool inside your business, buying is usually the sensible
          choice. If digital signage is the product, the customer experience or an important
          source of competitive advantage, building may be worth the investment.
        </P>
        <P>That is not an absolute rule. It is a useful starting point.</P>
        <ArticleCallout kind="important">
          If I were advising a business today, I would tell most teams to buy an existing CMS
          first. I would only recommend building once the business can explain exactly what it
          needs to own, why a commercial product cannot provide it and how it will support the
          software for years.
        </ArticleCallout>
        <P>The decision depends on five practical factors:</P>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/70">
          <li>How central signage is to your product or strategy.</li>
          <li>How different your required workflow is from existing platforms.</li>
          <li>How quickly you need to launch.</li>
          <li>Whether you have the engineering and operational capability to maintain the system.</li>
          <li>Whether long-term ownership creates enough value to justify the cost and risk.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="02" id="what-buying-actually-means">
          What buying actually means
        </SectionHeading>
        <P>
          Buying does not always mean selecting a rigid off-the-shelf product and accepting
          every limitation. Commercial signage platforms range from simple small-business
          tools to enterprise systems with APIs, white-label options, custom workflows and
          professional services.
        </P>
        <P>A purchased platform may include:</P>
        <UL>
          <li>cloud dashboard and user management;</li>
          <li>media library, playlists and scheduling;</li>
          <li>screen and location management;</li>
          <li>player applications for supported hardware;</li>
          <li>offline playback and caching;</li>
          <li>device status and monitoring;</li>
          <li>remote commands and diagnostics;</li>
          <li>software updates;</li>
          <li>support documentation and customer service;</li>
          <li>integrations with storage, design, data or advertising systems.</li>
        </UL>
        <P>
          The important point is that buying transfers much of the infrastructure and
          operational responsibility to the vendor. Your team still has to select, configure
          and operate the platform, but it does not own every layer of the software.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="03" id="why-most-organisations-should-buy">
          Why most organisations should buy
        </SectionHeading>
        <P>For straightforward digital signage, an established CMS is often the better business decision.</P>
        <SubHeading>Faster implementation</SubHeading>
        <P>
          A mature platform can often move a team from evaluation to pilot without first
          building authentication, media handling, scheduling, player software and monitoring.
          The business can focus on deployment, content and adoption.
        </P>
        <SubHeading>Lower initial engineering risk</SubHeading>
        <P>
          The vendor has already dealt with many of the issues that do not appear in a
          prototype: interrupted downloads, offline restarts, browser differences, storage
          limits, firmware changes and remote support.
        </P>
        <SubHeading>More predictable operations</SubHeading>
        <P>
          Commercial products generally provide a documented deployment model, supported
          hardware list, release process and support path. That makes budgeting and
          responsibility clearer.
        </P>
        <SubHeading>Existing integrations</SubHeading>
        <P>
          A platform may already connect to design tools, data sources, point-of-sale systems,
          content feeds or programmatic advertising services. Rebuilding those integrations
          can be a separate product effort.
        </P>
        <SubHeading>Support and accountability</SubHeading>
        <P>
          When a screen fails, the business has a vendor, support process and escalation
          route. Building internally means the organisation becomes the vendor.
        </P>
        <ArticleCallout kind="practical">
          Buying is not a sign that a team lacks ambition. It is often the disciplined choice
          when signage is supporting the business rather than defining the product.
        </ArticleCallout>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading number="04" id="what-commercial-cms-vendors-have-already-solved">
          What commercial CMS vendors have already solved
        </SectionHeading>
        <P>
          One of the easiest mistakes is comparing a new custom interface with the visible
          interface of a commercial CMS. The real comparison is between the complete operating
          systems beneath them.
        </P>
        <P>Established platforms may have spent years solving:</P>
        <UL>
          <li>player installation and automatic startup;</li>
          <li>secure device registration and pairing;</li>
          <li>media downloading and verification;</li>
          <li>local storage and cache management;</li>
          <li>offline playback;</li>
          <li>playlist and schedule evaluation;</li>
          <li>content versioning and rollback;</li>
          <li>network retry behaviour;</li>
          <li>device heartbeats and status;</li>
          <li>remote commands and screenshots;</li>
          <li>application and player updates;</li>
          <li>logs and support diagnostics;</li>
          <li>firmware-specific issues;</li>
          <li>bandwidth and storage constraints;</li>
          <li>multi-tenant permissions and audit history.</li>
        </UL>
        <P>
          Not every vendor solves every area equally well. But the category has already
          absorbed a large amount of engineering and operational learning.
        </P>
        <ArticleCallout kind="important">
          A custom dashboard is not a custom signage platform. The player runtime, content
          pipeline, support tooling and release process are where much of the long-term work
          lives.
        </ArticleCallout>
      </section>
    </>
  );
}
