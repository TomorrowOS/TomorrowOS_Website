export const PLACEHOLDERS = {
  CLI_COMMAND: '{{OFFICIAL_TOMORROWOS_CLI_COMMAND}}',
  NODE_VERSION: '{{SUPPORTED_NODE_VERSION}}',
  SUPABASE_METHOD: '{{APPROVED_SUPABASE_CONNECTION_METHOD}}',
  HOST_1: '{{SUPPORTED_HOST_1}}',
  HOST_2: '{{SUPPORTED_HOST_2}}',
  HOST_3: '{{SUPPORTED_HOST_3}}',
  LOCAL_ENV_FILENAME: '{{CONFIRMED_LOCAL_ENV_FILENAME}}',
  SUPABASE_CHECK_COMMAND: '{{OFFICIAL_SUPABASE_CHECK_COMMAND}}',
  CLOUDINARY_CHECK_COMMAND: '{{OFFICIAL_CLOUDINARY_CHECK_COMMAND}}',
  INSTALL_DEPENDENCIES_COMMAND: '{{INSTALL_DEPENDENCIES_COMMAND}}',
  DATABASE_INIT_COMMAND: '{{DATABASE_INITIALISATION_COMMAND}}',
  SAMPLE_CONTENT_COMMAND: '{{OPTIONAL_SAMPLE_CONTENT_COMMAND}}',
  DEVELOPMENT_COMMAND: '{{OFFICIAL_DEVELOPMENT_COMMAND}}',
  DEPLOYMENT_COMMAND: '{{APPROVED_DEPLOYMENT_COMMAND_OR_WORKFLOW}}',
  PORT: '{{PORT}}'
};

export const GUIDED_STEPS = [
  { id: 1, title: 'Before you begin' },
  { id: 2, title: 'Open Replit' },
  { id: 3, title: 'Create the project' },
  { id: 4, title: 'Follow the prompts' },
  { id: 5, title: 'Connect services' },
  { id: 6, title: 'Add branding' },
  { id: 7, title: 'Generate and preview' },
  { id: 8, title: 'Readiness check' },
  { id: 9, title: 'Publish CMS' },
  { id: 10, title: 'Production check' }
];

export const TERMINAL_STEPS = [
  { id: 1, title: 'Before you begin' },
  { id: 2, title: 'Create project' },
  { id: 3, title: 'Follow CLI questions' },
  { id: 4, title: 'Project created' },
  { id: 5, title: 'Environment variables' },
  { id: 6, title: 'Connect services' },
  { id: 7, title: 'Add branding' },
  { id: 8, title: 'Initialise project' },
  { id: 9, title: 'Run locally' },
  { id: 10, title: 'Choose host' },
  { id: 11, title: 'Production variables' },
  { id: 12, title: 'Deploy' },
  { id: 13, title: 'Production check' }
];

export const SHARED_STEPS = [
  { id: 1, title: 'Download players' },
  { id: 2, title: 'Install TomorrowOS' },
  { id: 3, title: 'Pair device' },
  { id: 4, title: 'Create, schedule and deploy' }
];
