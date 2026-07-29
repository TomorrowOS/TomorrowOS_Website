import { siteConfig } from '@/config/site';

export type ServerSdkStatus = 'preview' | 'package-available' | 'beta' | 'stable';

/**
 * Central configuration for the Server SDK onboarding page (/connect/server-sdk).
 *
 * Only verified facts belong here. Method-level examples, credential models and
 * runtime requirements must remain empty until engineering confirms them against
 * the current package release. Stable mode is configuration-driven: it activates
 * only when every field in `stableContract` is provided.
 */
export const serverSdkConfig = {
  status: 'package-available' as ServerSdkStatus,

  statusLabels: {
    'preview': 'Preview',
    'package-available': 'Package available',
    'beta': 'Beta',
    'stable': 'Stable',
  } as Record<ServerSdkStatus, string>,

  statusCallout:
    'The Server SDK package and architecture are available. Detailed method-level examples are being verified against the current release.',

  // Verified facts from the TomorrowOS repository material.
  packageName: '@tomorrowos/sdk',
  installCommand: 'npm install @tomorrowos/sdk',

  links: {
    npm: 'https://www.npmjs.com/package/@tomorrowos/sdk',
    github: siteConfig.links.github,
    docs: siteConfig.links.docs,
    community: siteConfig.links.community,
  },

  readiness: [
    { item: 'npm package', status: 'Available' },
    { item: 'Installation command', status: 'Available' },
    { item: 'Project architecture', status: 'Available' },
    { item: 'Device and runtime foundation', status: 'Available' },
    { item: 'Initialisation reference', status: 'Being verified' },
    { item: 'Device-pairing examples', status: 'Being verified' },
    { item: 'Content and policy examples', status: 'Being verified' },
    { item: 'Commands and events examples', status: 'Being verified' },
    { item: 'Stable method reference', status: 'In progress' },
  ] as { item: string; status: 'Available' | 'Being verified' | 'In progress' }[],

  /**
   * Engineering must supply every field below before stable mode can be enabled.
   * Empty string = not yet verified. When any field is missing, the page falls
   * back to package-available mode and the gaps are listed only in Prototype
   * Review Mode.
   */
  stableContract: {
    importStatement: '',
    initialisationMethod: '',
    configurationOptions: '',
    credentialGenerationProcess: '',
    devicePairingExample: '',
    contentExample: '',
    policyExample: '',
    commandExample: '',
    eventSubscriptionExample: '',
    errorHandlingGuidance: '',
    requiredRuntimeVersions: 'Node.js 20 or newer',
  },

  /**
   * The shared device journey (player download, install, pairing, deployment)
   * stays locked until engineering configures a verified integration milestone.
   */
  verifiedIntegrationMilestone: false,

  // Internal engineering requirements surfaced only in Prototype Review Mode.
  outstandingEngineeringRequirements: [
    'Actual package export name',
    'Initialisation method',
    'Configuration schema',
    'Authentication model',
    'Environment-variable names',
    'Device registration method',
    'Pairing method',
    'Content method',
    'Policy method',
    'Command method',
    'Event-subscription method',
    'Error and retry behaviour',
    'Storage-adapter interface',
    'Stable API guarantees',
  ],
};

export function isStableContractComplete(): boolean {
  return Object.values(serverSdkConfig.stableContract).every((v) => v.trim().length > 0);
}

/** Effective status: never claims stable unless the full contract is verified. */
export function getEffectiveServerSdkStatus(): ServerSdkStatus {
  if (serverSdkConfig.status === 'stable' && !isStableContractComplete()) {
    return 'package-available';
  }
  return serverSdkConfig.status;
}
