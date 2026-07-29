export type VercelSupportStatus = 'validation-required' | 'beta' | 'supported' | 'unavailable';
export type VercelDatabaseProvider = 'supabase' | 'neon' | 'none';
export type VercelStorageProvider = 'cloudinary' | 'vercel-blob' | 'none';
export type VercelBlobAuthMode = 'oidc' | 'token' | 'hybrid' | 'unresolved';

export type MediaProviderId = 'cloudinary' | 'vercel-blob';

export interface MediaProviderEntry {
  id: MediaProviderId;
  /** Implementation + onboarding guide exist. */
  available: boolean;
  /** Generated-project path has been tested end to end. */
  tested: boolean;
  name: string;
  badge: string | null;
  description: string;
  bestFor: string;
  guideUrl: string;
  guideReady: boolean;
  logoPath: string;
  logoAlt: string;
  selectLabel: string;
  continueLabel: string;
  configureLater: { heading: string; items: string[]; note: string } | null;
  missingValidation: string[];
}

/**
 * Central media-provider flags. A provider is customer-facing only when
 * `available && tested`. Otherwise it is hidden in normal mode and its
 * validation gaps are surfaced only in Prototype Review Mode.
 */
export const mediaProviderConfig: Record<'cloudinary' | 'vercelBlob', MediaProviderEntry> = {
  cloudinary: {
    id: 'cloudinary',
    available: true,
    tested: true,
    name: 'Cloudinary',
    badge: 'Recommended',
    description: 'Managed image and video storage with optimisation and delivery.',
    bestFor: 'Best for teams that want built-in image and video handling.',
    guideUrl: '/guides/cloudinary',
    guideReady: true,
    logoPath: 'assets/platforms/cloudinary-logo.svg',
    logoAlt: 'Cloudinary logo',
    selectLabel: 'Select Cloudinary',
    continueLabel: 'Continue with Cloudinary',
    configureLater: {
      heading: 'What you will configure later',
      items: ['Cloud name', 'API key', 'API secret'],
      note: 'Add these securely through Vercel Project Settings → Environment Variables. Do not enter them into this TomorrowOS guide.',
    },
    missingValidation: [],
  },
  vercelBlob: {
    id: 'vercel-blob',
    available: false,
    tested: false,
    name: 'Vercel Blob',
    badge: 'Vercel native',
    description: 'Object storage connected directly to your Vercel project.',
    bestFor: 'Best for teams wanting a simpler Vercel-hosted storage workflow.',
    guideUrl: '/guides/vercel-blob',
    guideReady: false,
    logoPath: 'assets/platforms/vercel-logo.svg',
    logoAlt: 'Vercel logo',
    selectLabel: 'Select Vercel Blob',
    continueLabel: 'Continue with Vercel Blob',
    configureLater: null,
    missingValidation: [
      'No @vercel/blob (or approved Blob) implementation located in the generated starter',
      'Blob authentication mode unresolved (vercelConfig.vercelBlobAuthenticationMode)',
      'BLOB_READ_WRITE_TOKEN handling not confirmed',
      'Upload path, media URL handling and delete behaviour untested',
      'Onboarding guide at /guides/vercel-blob is a placeholder',
    ],
  },
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
