export type VercelSupportStatus = 'validation-required' | 'beta' | 'supported' | 'unavailable';
export type VercelDatabaseProvider = 'supabase' | 'neon' | 'none';
export type VercelStorageProvider = 'cloudinary' | 'vercel-blob' | 'none';
export type VercelBlobAuthMode = 'oidc' | 'token' | 'hybrid' | 'unresolved';

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
