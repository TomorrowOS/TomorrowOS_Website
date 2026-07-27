import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePrototype, ProjectType, NewProjectMethod, ExistingProjectMethod } from '@/components/PrototypeProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JourneyNavigator } from '@/components/JourneyNavigator';
import { GuidedJourney } from '@/components/GuidedJourney';
import { TerminalJourney } from '@/components/TerminalJourney';
import { SharedJourney } from '@/components/SharedJourney';
import { ServerSdkJourney } from '@/components/ServerSdkJourney';
import { ApiJourney } from '@/components/ApiJourney';
import { Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { onboardingPaths } from '@/lib/onboardingPaths';

export default function Start() {
  const { state, updateState } = usePrototype();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  // Sync route with state if needed, or state with route
  useEffect(() => {
    if (location === onboardingPaths.newProject.guided) {
      if (state.newProjectMethod !== 'guided') updateState({ projectType: 'new', newProjectMethod: 'guided', setupMethod: 'guided' });
    } else if (location === onboardingPaths.newProject.terminal) {
      if (state.newProjectMethod !== 'terminal') updateState({ projectType: 'new', newProjectMethod: 'terminal', setupMethod: 'terminal' });
    } else if (location === onboardingPaths.existingProject.serverSdk) {
      if (state.existingProjectMethod !== 'server-sdk') updateState({ projectType: 'existing', existingProjectMethod: 'server-sdk' });
    } else if (location === onboardingPaths.existingProject.api) {
      if (state.existingProjectMethod !== 'api') updateState({ projectType: 'existing', existingProjectMethod: 'api' });
    }
  }, [location, state.newProjectMethod, state.existingProjectMethod, updateState]);

  const handleSwitchClick = (route: string) => {
    setPendingRoute(route);
    setShowSwitchConfirm(true);
  };

  const confirmSwitch = () => {
    if (pendingRoute) {
      setLocation(pendingRoute);
    }
    setShowSwitchConfirm(false);
    setPendingRoute(null);
  };

  // If no detailed route is active, show the selector
  if (
    location !== onboardingPaths.newProject.guided &&
    location !== onboardingPaths.newProject.terminal &&
    location !== onboardingPaths.existingProject.serverSdk &&
    location !== onboardingPaths.existingProject.api
  ) {
    return (
      <div className="flex flex-col mx-auto max-w-4xl px-4 py-12 animate-in fade-in duration-500">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">What are you building?</h1>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Choose whether you are creating a new signage product or adding TomorrowOS to an existing application.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card 
            className={`cursor-pointer transition-all ${state.projectType === 'new' ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400'}`}
            onClick={() => updateState({ projectType: 'new' })}
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Start a new project</h3>
                {state.projectType === 'new' && <CheckCircle2 className="w-6 h-6 text-black" />}
              </div>
              <p className="text-gray-600">Create a new signage product from a TomorrowOS starter.</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${state.projectType === 'existing' ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400'}`}
            onClick={() => updateState({ projectType: 'existing' })}
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Connect an existing project</h3>
                {state.projectType === 'existing' && <CheckCircle2 className="w-6 h-6 text-black" />}
              </div>
              <p className="text-gray-600">Add TomorrowOS signage capabilities to an application you already operate.</p>
            </CardContent>
          </Card>
        </div>

        {state.projectType === 'new' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-px bg-border w-full mb-12" />
            <h2 className="text-2xl font-bold text-center mb-8">How do you want to get started?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="cursor-pointer hover:border-gray-400 transition-all flex flex-col"
                onClick={() => setLocation(onboardingPaths.newProject.guided)}
              >
                <CardContent className="p-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">GUIDED SETUP</h3>
                  <p className="text-gray-600 mb-6">Use AI-assisted and guided tools to create your CMS.</p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Agent</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Secrets</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Preview</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Publishing</li>
                  </ul>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Get started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-gray-400 transition-all flex flex-col"
                onClick={() => setLocation(onboardingPaths.newProject.terminal)}
              >
                <CardContent className="p-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">TERMINAL</h3>
                  <p className="text-gray-600 mb-6">Use the TomorrowOS CLI in your local development environment.</p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> TomorrowOS CLI</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Local development</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Bring your own infrastructure</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Deploy to your chosen supported host</li>
                  </ul>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Get started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {state.projectType === 'existing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-px bg-border w-full mb-12" />
            <h2 className="text-2xl font-bold text-center mb-8">How do you want to connect?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="cursor-pointer hover:border-gray-400 transition-all flex flex-col"
                onClick={() => setLocation(onboardingPaths.existingProject.serverSdk)}
              >
                <CardContent className="p-8 flex-1">
                  <div className="inline-block bg-gray-100 text-xs font-semibold px-2 py-1 rounded mb-4">Recommended for Node.js backends</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SERVER SDK</h3>
                  <p className="text-gray-600 mb-6">Integrate TomorrowOS directly into your backend application.</p>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Get started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-gray-400 transition-all flex flex-col"
                onClick={() => setLocation(onboardingPaths.existingProject.api)}
              >
                <CardContent className="p-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">API INTEGRATION</h3>
                  <p className="text-gray-600 mb-6">Connect your application using the TomorrowOS HTTP API.</p>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Get started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detailed Journey Shell
  const isNewProject = location === onboardingPaths.newProject.guided || location === onboardingPaths.newProject.terminal;
  const isExistingProject = location === onboardingPaths.existingProject.serverSdk || location === onboardingPaths.existingProject.api;
  const isGuided = location === onboardingPaths.newProject.guided;
  const isServerSdk = location === onboardingPaths.existingProject.serverSdk;
  
  const showSidebar = isNewProject || state.sharedStep > 0;

  let breadcrumbLabel = "";
  let switchTarget = "";
  let switchLabel = "";

  if (isNewProject) {
    breadcrumbLabel = `Start a new project › ${isGuided ? 'Guided setup' : 'Terminal'}`;
    switchTarget = isGuided ? onboardingPaths.newProject.terminal : onboardingPaths.newProject.guided;
    switchLabel = `Switch to ${isGuided ? 'Terminal' : 'Guided Setup'}`;
  } else if (isExistingProject) {
    breadcrumbLabel = `Connect an existing project › ${isServerSdk ? 'Server SDK' : 'API Integration'}`;
    switchTarget = isServerSdk ? onboardingPaths.existingProject.api : onboardingPaths.existingProject.serverSdk;
    switchLabel = `Switch integration method`;
  } else {
    breadcrumbLabel = "Setup";
  }

  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 relative px-4 md:px-0">
      
      {/* COMPACT BREADCRUMB */}
      <div className="flex items-center justify-between py-4 mb-6 md:mb-8 border-b border-border">
         <div className="text-sm font-medium text-gray-500 flex items-center">
            {breadcrumbLabel}
         </div>
         <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 hidden md:flex" 
            onClick={() => handleSwitchClick(switchTarget)}
         >
            {switchLabel}
         </Button>
         {isNewProject && (
           <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </Button>
         )}
      </div>

      {showSwitchConfirm && (
        <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-md flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in">
          <p className="text-sm text-amber-900">
            <strong>Switching paths:</strong> Changing this selection will switch onboarding paths. Your current guide progress for this path will remain saved.
          </p>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setShowSwitchConfirm(false)}>Cancel</Button>
            <Button variant="default" size="sm" onClick={confirmSwitch}>Confirm switch</Button>
          </div>
        </div>
      )}

      {showSidebar ? (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative items-start">
           {/* SIDEBAR */}
           <aside className={`md:block w-full md:w-[240px] shrink-0 md:sticky md:top-24 z-40 bg-background md:bg-transparent ${mobileMenuOpen ? 'block absolute top-0 left-0 right-0 p-4 border rounded-xl shadow-lg mt-14' : 'hidden'}`}>
              <div className="md:hidden flex justify-between items-center mb-4">
                <h3 className="font-bold">Steps</h3>
                {switchTarget && (
                  <Button variant="outline" size="sm" onClick={() => handleSwitchClick(switchTarget)}>
                    {switchLabel}
                  </Button>
                )}
              </div>
              <JourneyNavigator />
           </aside>
           
           {/* CONTENT */}
           <div className="flex-1 w-full max-w-[760px] min-w-0 pb-32">
              <JourneyRouter location={location} />
           </div>
        </div>
      ) : (
        <div className="pb-32">
           <JourneyRouter location={location} />
        </div>
      )}
      
    </div>
  );
}

function JourneyRouter({ location }: { location: string }) {
  const { state } = usePrototype();
  
  if (location === onboardingPaths.existingProject.serverSdk) {
    return <ServerSdkJourney />;
  }
  if (location === onboardingPaths.existingProject.api) {
    return <ApiJourney />;
  }

  if (state.sharedStep > 0) {
    return <SharedJourney />;
  }
  
  if (location === onboardingPaths.newProject.guided) {
    return <GuidedJourney />;
  }
  
  return <TerminalJourney />;
}
