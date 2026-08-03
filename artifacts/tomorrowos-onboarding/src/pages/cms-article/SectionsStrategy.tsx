import {
  SectionHeading,
  SubHeading,
  P,
  UL,
  IntLink,
  ExtLink,
  ArticleDataTable,
} from '@/components/blog/articlePrimitives';
import { ArticleCallout } from '@/components/blog/ArticleCallout';
import {
  ArticleDiagram,
  DiagramNode,
  DiagramArrow,
  DiagramPanel,
} from '@/components/blog/ArticleDiagram';
import { ArticleChecklist } from '@/components/blog/ArticleChecklist';
import { siteConfig } from '@/config/site';

/**
 * Article sections: Supporting multiple platforms → Pre-launch checklist.
 * Copy is the supplied editorial source of truth — do not reword.
 *
 * Platform status labels below are sourced from src/lib/platformCompatibility.ts
 * (Samsung Tizen: Supported; BrightSign: Platform Validation; LG webOS,
 * Android, Windows: Planned). Do not invent statuses.
 */

const PLATFORM_ADAPTERS: { name: string; status: string }[] = [
  { name: 'Samsung Tizen', status: 'Supported' },
  { name: 'BrightSign', status: 'Platform Validation' },
  { name: 'LG webOS', status: 'Planned' },
  { name: 'Windows', status: 'Planned' },
  { name: 'Android', status: 'Planned' },
];

export function SectionsStrategy() {
  return (
    <>
      {/* -------------------------------- Supporting multiple platforms */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="supporting-multiple-platforms">
          Supporting multiple platforms
        </SectionHeading>
        <P>
          Multi-platform digital signage is difficult because each environment behaves
          differently.
        </P>
        <P>Differences can include:</P>
        <UL>
          <li>packaging;</li>
          <li>installation;</li>
          <li>startup behaviour;</li>
          <li>storage APIs;</li>
          <li>media decoders;</li>
          <li>browser engines;</li>
          <li>security restrictions;</li>
          <li>remote commands;</li>
          <li>firmware updates;</li>
          <li>debugging tools;</li>
          <li>application lifecycle.</li>
        </UL>
        <P>Samsung Tizen and BrightSign are not two cosmetic variations of the same browser.</P>
        <P>
          A useful abstraction should standardise common behaviour while preserving
          platform-specific constraints.
        </P>
        <P>For example:</P>
        <ArticleDiagram
          alt="Diagram showing a common runtime interface implemented by adapters for Samsung Tizen, BrightSign, LG webOS, Windows and Android."
          caption="The platform adapter model: one common runtime interface, one adapter per screen environment. Status labels reflect current TomorrowOS platform data — architectural examples are not claims of availability."
          wide
        >
          <DiagramPanel
            title="Common runtime interface"
            items={[
              'identifyDevice()',
              'storeFile()',
              'playContent()',
              'reportHealth()',
              'executeCommand()',
              'restartRuntime()',
            ]}
          />
          <DiagramArrow label="implemented by platform adapters" />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_ADAPTERS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-center"
              >
                <span className="text-sm font-medium text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.status}</span>
              </div>
            ))}
          </div>
        </ArticleDiagram>
        <p className="text-sm text-muted-foreground">
          Status labels come from the live{' '}
          <IntLink href="/compatibility">Platform Compatibility</IntLink> data: “Supported” and
          “Platform Validation” describe current TomorrowOS runtimes; “Planned” platforms are
          architectural targets, not currently available adapters.
        </p>
        <P>Not every platform will support every command.</P>
        <P>
          The API should represent capabilities honestly rather than pretending all devices are
          identical.
        </P>
        <ArticleCallout kind="practical">
          Series-level platform support does not certify every model, firmware and media
          profile.
        </ArticleCallout>
      </section>

      {/* ------------------------------------------ Security */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="security">Security</SectionHeading>
        <P>
          A signage platform controls remote devices and public-facing screens. Security needs
          to be designed into the system.
        </P>
        <P>Important areas include:</P>
        <UL>
          <li>encrypted transport;</li>
          <li>device authentication;</li>
          <li>user authentication;</li>
          <li>role-based permissions;</li>
          <li>pairing expiry;</li>
          <li>credential rotation;</li>
          <li>audit history;</li>
          <li>signed or verified updates;</li>
          <li>protected secrets;</li>
          <li>tenant isolation;</li>
          <li>command authorisation.</li>
        </UL>
        <P>
          Do not place private server credentials in frontend code or publicly distributed
          player configuration.
        </P>
        <P>A device should receive only the credentials and permissions it needs.</P>
        <P>
          Remote commands deserve particular protection because they may affect physical
          hardware.
        </P>
      </section>

      {/* ------------------------------------------ Common mistakes */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="common-mistakes">Common mistakes</SectionHeading>

        <SubHeading>Treating the player like a webpage</SubHeading>
        <P>A webpage can assume connectivity. A signage player cannot.</P>

        <SubHeading>Activating content before downloads finish</SubHeading>
        <P>This creates missing files, blank playback and inconsistent screens.</P>

        <SubHeading>Treating all MP4 files as equivalent</SubHeading>
        <P>Container, codec, bitrate and profile matter.</P>

        <SubHeading>Ignoring firmware</SubHeading>
        <P>The same player model may behave differently after an operating-system update.</P>

        <SubHeading>Building no rollback path</SubHeading>
        <P>A failed policy or runtime release needs a safe recovery route.</P>

        <SubHeading>Using weak pairing</SubHeading>
        <P>
          Permanent credentials should never be exposed through predictable or reusable
          activation codes.
        </P>

        <SubHeading>Recording only “online” or “offline”</SubHeading>
        <P>Operational states need more detail.</P>

        <SubHeading>Assuming every platform behaves the same</SubHeading>
        <P>Platform abstraction should not erase genuine hardware limitations.</P>

        <SubHeading>Creating many services too early</SubHeading>
        <P>Use clear boundaries first. Split deployments only when scale or ownership requires it.</P>

        <SubHeading>Treating reliability as a future enhancement</SubHeading>
        <P>
          Offline operation, recovery and verification are architectural decisions, not polish
          added at the end.
        </P>
      </section>

      {/* --------------------------- Build, buy or use infrastructure */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="build-buy-or-use-infrastructure">
          Build everything yourself, buy a CMS or use infrastructure?
        </SectionHeading>
        <P>There are three broad pathways.</P>

        <SubHeading>Build everything internally</SubHeading>
        <P>This provides maximum control.</P>
        <P>Your team owns:</P>
        <UL>
          <li>product;</li>
          <li>server;</li>
          <li>APIs;</li>
          <li>device communication;</li>
          <li>runtime;</li>
          <li>platform adapters;</li>
          <li>offline operation;</li>
          <li>testing;</li>
          <li>maintenance.</li>
        </UL>
        <P>This can make sense when:</P>
        <UL>
          <li>device infrastructure is itself the core differentiator;</li>
          <li>the organisation has a substantial engineering team;</li>
          <li>platform ownership justifies the cost;</li>
          <li>long-term hardware support is funded.</li>
        </UL>
        <P>
          The main cost is not the initial prototype. It is maintaining runtime behaviour across
          devices, firmware and years of field use.
        </P>

        <SubHeading>Adopt a finished CMS</SubHeading>
        <P>A finished digital signage platform is often the best choice when:</P>
        <UL>
          <li>the required workflows already exist;</li>
          <li>speed matters more than custom ownership;</li>
          <li>the customer wants software rather than infrastructure;</li>
          <li>bespoke product development is unnecessary.</li>
        </UL>
        <P>This avoids most engineering work but limits control over:</P>
        <UL>
          <li>product design;</li>
          <li>workflows;</li>
          <li>deployment model;</li>
          <li>licensing;</li>
          <li>commercial model;</li>
          <li>runtime behaviour.</li>
        </UL>

        <SubHeading>Use shared infrastructure</SubHeading>
        <P>The third option is to build the product while reusing common signage infrastructure.</P>
        <P>Your team owns:</P>
        <UL>
          <li>customer experience;</li>
          <li>vertical workflows;</li>
          <li>branding;</li>
          <li>business rules;</li>
          <li>commercial model;</li>
          <li>frontend;</li>
          <li>product data.</li>
        </UL>
        <P>The infrastructure layer handles reusable capabilities such as:</P>
        <UL>
          <li>pairing;</li>
          <li>content delivery;</li>
          <li>runtime communication;</li>
          <li>local playback;</li>
          <li>offline behaviour;</li>
          <li>commands;</li>
          <li>telemetry;</li>
          <li>platform adapters.</li>
        </UL>
        <P>This is the role TomorrowOS is designed to fill.</P>

        {/* Build-options comparison (required structured element). */}
        <ArticleDataTable
          caption="Comparison of the three pathways: building everything, adopting a finished CMS, and using shared infrastructure"
          head={['', 'Build everything', 'Finished CMS', 'Shared infrastructure']}
          minWidth={680}
          rows={[
            ['Product control', 'Complete', 'Limited to vendor options', 'Complete for your product layer'],
            ['Runtime ownership', 'Your team builds and maintains it', 'Vendor-owned', 'Provided by the infrastructure layer'],
            ['Time to market', 'Longest', 'Fastest', 'Between the two'],
            ['Platform maintenance', 'Your team, indefinitely', 'Vendor responsibility', 'Shared with the infrastructure project'],
            ['Custom workflows', 'Unlimited', 'Constrained by the product', 'Unlimited in your application'],
            ['Deployment control', 'Complete', 'Vendor-defined', 'Depends on hosting choice'],
            ['Ongoing engineering burden', 'Highest', 'Lowest', 'Focused on your product'],
            ['Best suited for', 'Teams where device infrastructure is the differentiator', 'Teams that need working software now', 'Teams building their own signage product'],
          ]}
        />
      </section>

      {/* ------------------------------------------ Where TomorrowOS fits */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="where-tomorrowos-fits">Where TomorrowOS fits</SectionHeading>
        <P>TomorrowOS is an open-source foundation for building digital signage software.</P>
        <P>
          It is not intended to dictate the customer experience or replace every product
          decision.
        </P>
        <P>A product built with TomorrowOS can still have its own:</P>
        <UL>
          <li>interface;</li>
          <li>users;</li>
          <li>workflows;</li>
          <li>data;</li>
          <li>vertical features;</li>
          <li>branding;</li>
          <li>commercial model.</li>
        </UL>
        <P>TomorrowOS focuses on shared infrastructure beneath that product.</P>
        <P>Conceptually:</P>
        <div className="flex max-w-[520px] flex-col">
          <DiagramPanel
            title="Your product"
            items={['Users', 'Workflows', 'Brand', 'Customer data', 'Commercial experience']}
          />
          <DiagramArrow />
          <DiagramPanel
            title="TomorrowOS infrastructure"
            items={[
              'Server SDK and APIs',
              'Device communication',
              'Content delivery',
              'Policies',
              'Commands and events',
              'Offline runtime',
              'Platform adapters',
            ]}
          />
          <DiagramArrow />
          <DiagramNode>Supported screen environments</DiagramNode>
        </div>
        <P>
          This separation allows a developer to concentrate on the part customers see while
          avoiding the need to independently rebuild every common device capability.
        </P>
        <P>
          The server side is available as the{' '}
          <IntLink href="/connect/server-sdk">@tomorrowos/sdk package</IntLink> for Node.js and
          TypeScript backends, with the source published under the Apache 2.0 licence on{' '}
          <ExtLink href={siteConfig.links.github}>GitHub</ExtLink> and implementation guidance
          in the <ExtLink href={siteConfig.links.docs}>documentation</ExtLink>.
        </P>
        <P>
          Current platform and version claims should always be checked against the live
          TomorrowOS compatibility pages and documentation before deployment.
        </P>
        <ArticleCallout kind="important">
          Platform and version support changes over time. Check the current{' '}
          <IntLink href="/compatibility">compatibility pages</IntLink> and{' '}
          <ExtLink href={siteConfig.links.docs}>documentation</ExtLink> before planning a
          deployment.
        </ArticleCallout>
      </section>

      {/* --------------------------------- AI-assisted development */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="building-with-ai-assisted-development-tools">
          Building with AI-assisted development tools
        </SectionHeading>
        <P>
          Tools such as Replit, Cursor, Claude Code, OpenAI Codex, GitHub Copilot and Gemini CLI
          can accelerate product development.
        </P>
        <P>They are particularly useful for:</P>
        <UL>
          <li>scaffolding dashboards;</li>
          <li>creating database schemas;</li>
          <li>building forms;</li>
          <li>implementing API clients;</li>
          <li>generating tests;</li>
          <li>reviewing code;</li>
          <li>documenting integrations;</li>
          <li>creating deployment scripts.</li>
        </UL>
        <P>They do not remove the need to understand the architecture.</P>
        <P>An AI-generated CMS can still fail because it:</P>
        <UL>
          <li>stores secrets in the frontend;</li>
          <li>assumes permanent connectivity;</li>
          <li>activates incomplete downloads;</li>
          <li>ignores tenant isolation;</li>
          <li>lacks rollback;</li>
          <li>misunderstands device lifecycle;</li>
          <li>treats platform behaviour as generic web behaviour.</li>
        </UL>
        <P>The safest approach is to give the AI tool:</P>
        <UL>
          <li>a defined architecture;</li>
          <li>explicit security rules;</li>
          <li>current SDK documentation;</li>
          <li>clear environment boundaries;</li>
          <li>acceptance tests;</li>
          <li>supported-platform constraints;</li>
          <li>a definition of done.</li>
        </UL>
        <P>
          TomorrowOS can provide the reusable infrastructure and documented build path, while AI
          tools help developers assemble the application around it — the{' '}
          <IntLink href="/start">Start Building</IntLink> flow includes an AI-assisted guided
          setup.
        </P>
        <ArticleCallout kind="engineering">
          AI can accelerate implementation, but it cannot compensate for an undefined runtime
          architecture.
        </ArticleCallout>
      </section>

      {/* ------------------------------------------ Build sequence */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="a-practical-build-sequence">
          A practical build sequence
        </SectionHeading>
        <P>A sensible sequence for developing a new CMS is:</P>
        <ol className="flex flex-col gap-4" aria-label="Seven development phases">
          {[
            {
              title: 'Phase 1: Define the product',
              lead: 'Decide:',
              items: [
                'target customer;',
                'use case;',
                'supported platforms;',
                'deployment model;',
                'ownership model;',
                'required workflows.',
              ],
            },
            {
              title: 'Phase 2: Build the application foundation',
              lead: 'Implement:',
              items: [
                'authentication;',
                'organisations;',
                'users;',
                'roles;',
                'database;',
                'storage;',
                'media records.',
              ],
            },
            {
              title: 'Phase 3: Add device management',
              lead: 'Implement:',
              items: [
                'pairing;',
                'device records;',
                'groups;',
                'status;',
                'credentials;',
                'lifecycle actions.',
              ],
            },
            {
              title: 'Phase 4: Add content and policies',
              lead: 'Implement:',
              items: [
                'media library;',
                'playlists;',
                'schedules;',
                'assignments;',
                'versioning;',
                'publication workflow.',
              ],
            },
            {
              title: 'Phase 5: Connect the runtime',
              lead: 'Implement:',
              items: [
                'server communication;',
                'manifests;',
                'downloads;',
                'local storage;',
                'playback;',
                'offline state;',
                'recovery.',
              ],
            },
            {
              title: 'Phase 6: Add operations',
              lead: 'Implement:',
              items: [
                'telemetry;',
                'commands;',
                'logs;',
                'alerts;',
                'diagnostics;',
                'update control.',
              ],
            },
            {
              title: 'Phase 7: Validate exact deployments',
              lead: 'Test:',
              items: [
                'device model;',
                'firmware;',
                'runtime version;',
                'media profile;',
                'offline playback;',
                'reboot recovery;',
                'network reconnection;',
                'storage behaviour.',
              ],
            },
          ].map((phase, i) => (
            <li
              key={phase.title}
              className="flex flex-col gap-2 rounded-[12px] border border-border bg-card p-4 md:flex-row md:gap-5 md:p-5"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold text-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground">{phase.lead}</p>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground marker:text-border">
                  {phase.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <P>Do not define production readiness based only on the dashboard working.</P>
      </section>

      {/* ------------------------------------------ Pre-launch checklist */}
      <section className="flex flex-col gap-4">
        <SectionHeading id="pre-launch-checklist">Pre-launch checklist</SectionHeading>
        <P>Before launching a CMS, confirm:</P>
        <ArticleChecklist
          ariaLabel="Pre-launch checklist"
          groups={[
            {
              title: 'Product',
              items: [
                'The intended user and workflow are clear.',
                'Roles and organisation boundaries are defined.',
                'The product explains device states clearly.',
              ],
            },
            {
              title: 'Content',
              items: [
                'Files are validated.',
                'Media metadata is recorded.',
                'Versioning and rollback exist.',
                'Downloads are verified before activation.',
              ],
            },
            {
              title: 'Devices',
              items: [
                'Pairing is secure.',
                'Identity persists after reboot.',
                'Credentials can be revoked.',
                'Replacement and decommissioning are supported.',
              ],
            },
            {
              title: 'Runtime',
              items: [
                'Content plays offline.',
                'Interrupted downloads recover.',
                'Invalid files do not become active.',
                'A known-good fallback exists.',
                'Reboots recover automatically.',
              ],
            },
            {
              title: 'Operations',
              items: [
                'Telemetry answers real support questions.',
                'Commands have delivery and completion states.',
                'Logs can be collected.',
                'Runtime and firmware versions are visible.',
              ],
            },
            {
              title: 'Platforms',
              items: [
                'Exact models are recorded.',
                'Exact firmware is recorded.',
                'Media is tested on deployment hardware.',
                'Platform limitations are documented.',
              ],
            },
            {
              title: 'Security',
              items: [
                'Secrets are not exposed.',
                'Tenant data is isolated.',
                'Commands require authorisation.',
                'Credentials can rotate.',
                'Updates can be verified.',
              ],
            },
          ]}
        />
      </section>
    </>
  );
}
