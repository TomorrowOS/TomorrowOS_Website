/**
 * Route of the user's in-progress onboarding journey, derived from persisted
 * prototype state. Used by "Back to setup" links on guide pages so returning
 * lands on the saved step instead of the initial pathway selector.
 */
export function getResumeSetupPath(state: {
  projectType: string | null;
  newProjectMethod: string | null;
  existingProjectMethod: string | null;
  guidedTool: string | null;
}): string {
  if (state.projectType === 'existing') {
    if (state.existingProjectMethod === 'server-sdk') return onboardingPaths.existingProject.serverSdk;
    if (state.existingProjectMethod === 'api') return onboardingPaths.existingProject.api;
    return onboardingPaths.start;
  }
  if (state.projectType === 'new') {
    if (state.newProjectMethod === 'terminal') return onboardingPaths.newProject.terminal;
    if (state.newProjectMethod === 'guided') {
      return state.guidedTool === 'vercel' ? onboardingPaths.newProject.vercel : onboardingPaths.newProject.replit;
    }
  }
  return onboardingPaths.start;
}

export const onboardingPaths = {
  start: '/start',
  newProject: {
    guidedChoose: '/start/guided',
    replit: '/start/guided/replit',
    vercel: '/start/guided/vercel',
    terminal: '/start/terminal'
  },
  existingProject: {
    serverSdk: '/connect/server-sdk',
    api: '/connect/api'
  }
};
