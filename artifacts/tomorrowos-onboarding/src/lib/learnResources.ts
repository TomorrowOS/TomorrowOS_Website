import { siteConfig } from '@/config/site';

/**
 * Single structured source of truth for the TomorrowOS Learn resource centre.
 *
 * Every section and learning path on /learn derives from this map — resource
 * titles, descriptions, destinations, maturity statuses and CTA labels are
 * defined here only, never inline in components. When a Learn article ships
 * (Phase C+), switch the resource's `href` to the article route here and the
 * page updates without component edits.
 *
 * Truthfulness rules (see .agents/memory/onboarding-honesty-model.md):
 * - every visible resource links to a genuinely useful, existing destination
 * - statuses are conservative: nothing is claimed as production-ready or
 *   available unless the current site/repository supports that claim
 * - resources with no useful destination are omitted, never rendered dead
 * - "Coming Soon" is never used
 */

export type ResourceStatus =
  | 'production-ready'
  | 'available'
  | 'in-development'
  | 'platform-validation'
  | 'community-contribution'
  | 'planned';

export const RESOURCE_STATUS_LABELS: Record<ResourceStatus, string> = {
  'production-ready': 'Production Ready',
  available: 'Available',
  'in-development': 'In Development',
  'platform-validation': 'Platform Validation',
  'community-contribution': 'Community Contribution',
  planned: 'Planned',
};

export type ResourceCategory =
  | 'start-here'
  | 'architecture'
  | 'platforms'
  | 'ai-development'
  | 'engineering'
  | 'evidence';

export interface LearnResource {
  /** Stable identifier, also used as the React key. */
  id: string;
  title: string;
  description: string;
  /** Destination URL — internal route path or absolute external URL. */
  href: string;
  external: boolean;
  status: ResourceStatus;
  category: ResourceCategory;
  ctaLabel: string;
}

export interface LearningPathStep {
  label: string;
  href: string;
  external: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  audience: string;
  steps: LearningPathStep[];
  outcome: string;
  cta: { label: string; href: string; external: boolean };
}

const DOCS = siteConfig.links.docs;
const DISCUSSIONS = siteConfig.links.community;

export const learnResources: LearnResource[] = [
  // ---- Start Here --------------------------------------------------------
  // The three foundational Learn articles are in development (Phase C).
  // Until they ship, each card links to the best existing destination.
  {
    id: 'build-a-cms',
    title: 'Build a Digital Signage CMS',
    description:
      'What it takes to build your own signage CMS on a shared open-source foundation. The full Learn guide is in development — the guided setup covers the practical route today.',
    href: '/start',
    external: false,
    status: 'in-development',
    category: 'start-here',
    ctaLabel: 'Start building',
  },
  {
    id: 'signage-sdk',
    title: 'Digital Signage SDK',
    description:
      'How a server SDK connects an existing Node.js or TypeScript backend to signage devices and playback. The full Learn guide is in development.',
    href: '/connect/server-sdk',
    external: false,
    status: 'in-development',
    category: 'start-here',
    ctaLabel: 'View integration guide',
  },
  {
    id: 'signage-api',
    title: 'Digital Signage API',
    description:
      'How a language-neutral HTTP API lets any backend manage screens, content and playback. The full Learn guide is in development.',
    href: '/connect/api',
    external: false,
    status: 'in-development',
    category: 'start-here',
    ctaLabel: 'View integration guide',
  },

  // ---- Architecture ------------------------------------------------------
  {
    id: 'self-hosted',
    title: 'Self-Hosted Digital Signage',
    description:
      'Running signage infrastructure on hosting you control. The Learn guide is in development; the documentation covers current setup options.',
    href: DOCS,
    external: true,
    status: 'in-development',
    category: 'architecture',
    ctaLabel: 'View current documentation',
  },
  {
    id: 'headless',
    title: 'Headless Digital Signage',
    description:
      'Separating signage infrastructure from your interface layer. The Learn guide is in development; the SDK and API pages show the integration surface today.',
    href: '/connect/api',
    external: false,
    status: 'in-development',
    category: 'architecture',
    ctaLabel: 'View integration guide',
  },
  {
    id: 'device-pairing',
    title: 'Device Pairing',
    description:
      'How screens are securely paired to your CMS and kept connected. Implementation details live in the documentation.',
    href: DOCS,
    external: true,
    status: 'in-development',
    category: 'architecture',
    ctaLabel: 'View current documentation',
  },
  {
    id: 'offline-playback',
    title: 'Offline Playback',
    description:
      'How players keep content running through network loss. Documentation for this area is being developed in the open.',
    href: DISCUSSIONS,
    external: true,
    status: 'in-development',
    category: 'architecture',
    ctaLabel: 'Follow progress',
  },
  {
    id: 'commands-events',
    title: 'Commands and Events',
    description:
      'How the platform delivers commands to devices and reports playback events back. Documentation for this area is being developed in the open.',
    href: DISCUSSIONS,
    external: true,
    status: 'in-development',
    category: 'architecture',
    ctaLabel: 'Follow progress',
  },

  // ---- Platforms ---------------------------------------------------------
  {
    id: 'platform-tizen',
    title: 'Samsung Tizen',
    description:
      'Install and run the TomorrowOS player on Samsung Tizen commercial displays, including MagicINFO troubleshooting.',
    href: '/guides/platforms/samsung-tizen',
    external: false,
    status: 'available',
    category: 'platforms',
    ctaLabel: 'Read the guide',
  },
  {
    id: 'platform-brightsign',
    title: 'BrightSign',
    description:
      'BrightSign media player support is undergoing device and firmware validation. Confirm your model before deployment.',
    href: '/compatibility',
    external: false,
    status: 'platform-validation',
    category: 'platforms',
    ctaLabel: 'See validation status',
  },
  {
    id: 'platform-webos',
    title: 'LG webOS',
    description:
      'LG webOS signage display support is planned. Development is coordinated in the open on GitHub.',
    href: DISCUSSIONS,
    external: true,
    status: 'planned',
    category: 'platforms',
    ctaLabel: 'Follow development',
  },
  {
    id: 'platform-android',
    title: 'Android',
    description:
      'Android media player support is planned. Development is coordinated in the open on GitHub.',
    href: DISCUSSIONS,
    external: true,
    status: 'planned',
    category: 'platforms',
    ctaLabel: 'Follow development',
  },
  {
    id: 'platform-windows',
    title: 'Windows',
    description:
      'Windows player support is planned. Development is coordinated in the open on GitHub.',
    href: DISCUSSIONS,
    external: true,
    status: 'planned',
    category: 'platforms',
    ctaLabel: 'Follow development',
  },

  // ---- AI Development ----------------------------------------------------
  // Only tools with a real, existing destination are listed. Other tools
  // (Claude Code, Cursor, ChatGPT, Codex, Copilot, Gemini CLI) are omitted
  // until the project publishes destinations for them.
  {
    id: 'ai-guided-setup',
    title: 'AI-Guided Setup',
    description:
      'Choose an AI-assisted workflow to stand up your CMS, configure services and pair a screen.',
    href: '/start/guided',
    external: false,
    status: 'available',
    category: 'ai-development',
    ctaLabel: 'Explore',
  },
  {
    id: 'ai-replit',
    title: 'Build with Replit',
    description:
      'Build and host your TomorrowOS CMS with Replit Agent using the existing step-by-step guided workflow.',
    href: '/start/guided/replit',
    external: false,
    status: 'available',
    category: 'ai-development',
    ctaLabel: 'Explore',
  },

  // ---- Engineering -------------------------------------------------------
  // Topics without a distinct existing destination (content synchronisation,
  // telemetry, commands, player recovery, testing, release engineering) are
  // omitted rather than rendered as near-identical GitHub links.
  {
    id: 'eng-scheduling',
    title: 'Content and Scheduling',
    description:
      'Add content to your screens and control when it plays, using the existing content guide.',
    href: '/guides/content',
    external: false,
    status: 'available',
    category: 'engineering',
    ctaLabel: 'Read the guide',
  },
  {
    id: 'eng-media-storage',
    title: 'Media Storage',
    description:
      'Set up media storage for images and video behind your CMS, starting with the Cloudinary guide.',
    href: '/guides/cloudinary',
    external: false,
    status: 'available',
    category: 'engineering',
    ctaLabel: 'Read the guide',
  },
  {
    id: 'eng-database',
    title: 'Databases',
    description:
      'Set up the database behind your CMS, starting with the Supabase guide.',
    href: '/guides/supabase',
    external: false,
    status: 'available',
    category: 'engineering',
    ctaLabel: 'Read the guide',
  },

  // ---- Evidence ----------------------------------------------------------
  // Firmware validation, offline testing, case studies and engineering
  // reviews are omitted: no public destinations exist yet.
  {
    id: 'evidence-platform-compat',
    title: 'Platform Compatibility',
    description:
      'Device and platform compatibility for TomorrowOS. The full matrix is being prepared — confirm models and firmware before installation.',
    href: '/compatibility',
    external: false,
    status: 'in-development',
    category: 'evidence',
    ctaLabel: 'See validation status',
  },
  {
    id: 'evidence-media-compat',
    title: 'Media Compatibility',
    description:
      'Supported media formats for TomorrowOS playback. The full matrix is being prepared.',
    href: '/compatibility/media',
    external: false,
    status: 'in-development',
    category: 'evidence',
    ctaLabel: 'See validation status',
  },
];

export function resourcesByCategory(category: ResourceCategory): LearnResource[] {
  return learnResources.filter((r) => r.category === category);
}

export const learningPaths: LearningPath[] = [
  {
    id: 'path-new-cms',
    title: 'Build a New CMS',
    audience: 'Founders and teams building a signage product from scratch.',
    steps: [
      { label: 'Start building', href: '/start', external: false },
      { label: 'Integrate the Server SDK', href: '/connect/server-sdk', external: false },
      { label: 'Integrate the HTTP API', href: '/connect/api', external: false },
      { label: 'Read the documentation', href: DOCS, external: true },
    ],
    outcome: 'Understand the platform layers and the route from idea to product.',
    cta: { label: 'Start building', href: '/start', external: false },
  },
  {
    id: 'path-connect-existing',
    title: 'Connect an Existing Product',
    audience: 'SaaS and software teams adding digital signage to an existing application.',
    steps: [
      { label: 'Integrate the Server SDK', href: '/connect/server-sdk', external: false },
      { label: 'Integrate the HTTP API', href: '/connect/api', external: false },
      { label: 'Device pairing documentation', href: DOCS, external: true },
    ],
    outcome: 'Understand the integration surface between an existing product and TomorrowOS.',
    cta: { label: 'Explore integration', href: '/connect/server-sdk', external: false },
  },
  {
    id: 'path-build-with-ai',
    title: 'Build with AI',
    audience: 'Developers using Replit, Claude Code, Cursor, ChatGPT or similar tools.',
    steps: [
      { label: 'Start building overview', href: '/start', external: false },
      { label: 'Choose an AI-guided setup', href: '/start/guided', external: false },
      { label: 'Build with Replit Agent', href: '/start/guided/replit', external: false },
      { label: 'Pair a supported screen', href: '/guides/platforms/samsung-tizen', external: false },
    ],
    outcome: 'Begin an AI-assisted signage build using the existing TomorrowOS workflow.',
    cta: { label: 'View AI-assisted setup', href: '/start/guided', external: false },
  },
  {
    id: 'path-custom-player',
    title: 'Build a Custom Player',
    audience: 'Developers focused on Samsung Tizen, BrightSign and device runtimes.',
    steps: [
      { label: 'Platform compatibility', href: '/compatibility', external: false },
      { label: 'Samsung Tizen guide', href: '/guides/platforms/samsung-tizen', external: false },
      { label: 'Media compatibility', href: '/compatibility/media', external: false },
      { label: 'Player documentation', href: DOCS, external: true },
    ],
    outcome: 'Understand the player layer and supported device pathways.',
    cta: { label: 'Explore platforms', href: '/guides/platforms/samsung-tizen', external: false },
  },
  {
    id: 'path-architecture',
    title: 'Learn the Architecture',
    audience: 'Developers and technical decision-makers evaluating digital signage infrastructure.',
    steps: [
      { label: 'Why an open foundation', href: '/about', external: false },
      { label: 'Technical documentation', href: DOCS, external: true },
      { label: 'Source code on GitHub', href: siteConfig.links.github, external: true },
    ],
    outcome: 'Understand how a modern digital signage stack works.',
    cta: { label: 'Explore architecture', href: DOCS, external: true },
  },
];
