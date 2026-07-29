export type VercelSupportStatus = 'validation-required' | 'beta' | 'supported' | 'unavailable';
export type VercelDatabaseProvider = 'supabase' | 'neon' | 'none';
export type VercelStorageProvider = 'cloudinary' | 'vercel-blob' | 'none';
export type VercelBlobAuthMode = 'oidc' | 'token' | 'hybrid' | 'unresolved';

export type MediaProviderId = 'cloudinary' | 'vercel-blob';

export interface MediaProviderEntry {
  id: MediaProviderId;
  /** Onboarding explanation for this provider exists on the step itself. */
  available: boolean;
  /** The maintained VERCEL_SETUP.md / generated-CMS starter contains an approved implementation for this provider. */
  implementationReady: boolean;
  /** The generated-project path has been tested end to end (see the §15 test checklist in the task spec). */
  tested: boolean;
  /** Whether the customer must create an account with a separate provider. */
  requiresExternalAccount: boolean;
  name: string;
  badge: string | null;
  description: string;
  bestFor: string;
  /** Internal TomorrowOS guide route, when one exists. Not required for public availability. */
  guideUrl: string | null;
  /** Official external documentation link, for providers explained without an internal guide. */
  externalDocsUrl: string | null;
  logoPath: string;
  logoAlt: string;
  selectLabel: string;
  continueLabel: string;
  /** Detail block revealed only after this provider is selected. */
  details: {
    heading: string;
    ordered: boolean;
    items: string[];
    note: string | null;
  };
  /** Compact security note rendered beneath the provider area for the selected provider only. */
  securityNote: string;
  missingValidation: string[];
}

/**
 * Central media-provider flags. A provider is customer-facing only when
 * `available && implementationReady && tested`. An internal TomorrowOS guide
 * route is deliberately NOT a public-availability requirement. Providers that
 * fail the gate are hidden in normal mode; Prototype Review Mode previews them
 * and lists their validation gaps.
 */
export const mediaProviderConfig: Record<'cloudinary' | 'vercelBlob', MediaProviderEntry> = {
  cloudinary: {
    id: 'cloudinary',
    available: true,
    implementationReady: true,
    tested: true,
    requiresExternalAccount: true,
    name: 'Cloudinary',
    badge: 'Advanced media',
    description: 'Dedicated image and video storage with optimisation and delivery tools.',
    bestFor: 'Best for teams that need advanced image and video handling.',
    guideUrl: '/guides/cloudinary',
    externalDocsUrl: null,
    logoPath: 'assets/platforms/cloudinary-logo.svg',
    logoAlt: 'Cloudinary logo',
    selectLabel: 'Select Cloudinary',
    continueLabel: 'Continue with Cloudinary',
    details: {
      heading: 'What you will configure later',
      ordered: false,
      items: ['Cloud name', 'API key', 'API secret'],
      note: null,
    },
    securityNote:
      'Add Cloudinary credentials securely through Vercel Environment Variables. Do not paste API secrets into TomorrowOS.org or the v0 conversation.',
    missingValidation: [],
  },
  vercelBlob: {
    id: 'vercel-blob',
    available: true,
    // Flip to true only once the maintained VERCEL_SETUP.md / generated-CMS
    // starter contains the approved @vercel/blob implementation (client
    // uploads for large media, credentials server-side) — see missingValidation.
    implementationReady: false,
    tested: false,
    requiresExternalAccount: false,
    name: 'Vercel Blob',
    badge: 'Simplest setup',
    description: 'Vercel-native file storage for your CMS. No separate account is required.',
    bestFor: 'Best for the fastest setup when your CMS is already deployed on Vercel.',
    guideUrl: null,
    externalDocsUrl: 'https://vercel.com/docs/vercel-blob',
    logoPath: 'assets/platforms/vercel-logo.svg',
    logoAlt: 'Vercel logo',
    selectLabel: 'Select Vercel Blob',
    continueLabel: 'Continue with Vercel Blob',
    details: {
      heading: 'What happens next',
      ordered: true,
      items: [
        'v0 adds Vercel Blob support to your CMS.',
        'You create or connect a Blob store in your Vercel project.',
        'Vercel adds the required Blob environment variable to the selected environments.',
        'You redeploy and confirm a media upload.',
      ],
      note: 'No separate storage-provider account is required. Vercel Blob uses your existing Vercel project and its plan and usage limits.',
    },
    securityNote:
      'Vercel adds the Blob environment variable to your project when the store is connected. Do not paste Blob tokens into TomorrowOS.org or the v0 conversation.',
    missingValidation: [
      'Maintained VERCEL_SETUP.md (in @tomorrowos/sdk) is outside this workspace — Blob generation instructions not yet confirmed added',
      'Approved @vercel/blob implementation in the generated CMS starter not yet confirmed (client-upload flow for large media, server-side token issuance)',
      'End-to-end §15 test not yet run: Blob store connect, env var, image upload, large-video client upload, URL persistence, player retrieval, delete/replace, no secrets in frontend',
    ],
  },
};

/**
 * Approved Blob architecture for the guided signage starter. Public access so
 * TomorrowOS players retrieve assigned assets directly (no protected Vercel
 * Function in the playback path); hybrid uploads — small files may use server
 * routes, large media (signage video) must use the approved Blob client-upload
 * flow with a backend-issued upload token. Blob credentials stay server-side.
 */
export const vercelBlobConfig = {
  accessMode: 'public' as 'public' | 'private',
  uploadMode: 'hybrid' as 'client' | 'server' | 'hybrid',
};

export const vercelConfig = {
  vercelSupportStatus: 'supported' as VercelSupportStatus,
  recommendedVercelDatabase: 'none' as VercelDatabaseProvider,
  recommendedVercelStorage: 'none' as VercelStorageProvider,
  vercelBlobAuthenticationMode: 'unresolved' as VercelBlobAuthMode,
  vercelDatabaseMappings: {
    supabase: {
      providerVariables: [],
      tomorrowOsVariable: "{{CONFIRMED_TOMORROWOS_DATABASE_VARIABLE}}"
    },
    neon: {
      providerVariables: [],
      tomorrowOsVariable: "{{CONFIRMED_TOMORROWOS_DATABASE_VARIABLE}}"
    }
  },
  questionSequence: {
    projectName: "{{VERCEL_QUESTION_PROJECT_NAME}}",
    database: "{{VERCEL_QUESTION_DATABASE}}",
    storage: "{{VERCEL_QUESTION_STORAGE}}",
    exampleContent: "{{VERCEL_QUESTION_EXAMPLE_CONTENT}}",
    branding: "{{VERCEL_QUESTION_BRANDING}}",
    deployment: "{{VERCEL_QUESTION_DEPLOYMENT}}"
  },
  guidedTools: {
    replit: {
      status: 'recommended',
      label: 'Replit',
      description: 'Build and host your TomorrowOS CMS with Replit Agent.'
    },
    vercel: {
      status: 'validation-required' as VercelSupportStatus,
      label: 'Vercel',
      description: 'Create your TomorrowOS CMS with v0 and deploy it to Vercel.',
      statusConfig: {
        'validation-required': {
          badge: 'Validation required',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          calloutTitle: 'Validation required',
          calloutCopy: 'TomorrowOS is validating persistent device connectivity on Vercel. Complete this setup only in an approved test environment until the platform is marked supported.',
          disabled: false
        },
        'beta': {
          badge: 'Beta',
          badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
          calloutTitle: 'Beta',
          calloutCopy: 'Vercel deployments are currently in Beta. Please report any issues you encounter.',
          disabled: false
        },
        'supported': {
          badge: null,
          badgeClass: '',
          calloutTitle: null,
          calloutCopy: null,
          disabled: false
        },
        'unavailable': {
          badge: 'Currently unavailable',
          badgeClass: 'bg-gray-100 text-gray-500 border-gray-200',
          calloutTitle: null,
          calloutCopy: null,
          disabled: true
        }
      }
    }
  }
};
