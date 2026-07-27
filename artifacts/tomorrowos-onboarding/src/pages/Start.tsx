import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePrototype, ProjectType, NewProjectMethod, ExistingProjectMethod } from '@/components/PrototypeProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JourneyNavigator } from '@/components/JourneyNavigator';
import { GuidedJourney } from '@/components/GuidedJourney';
import { VercelJourney } from '@/components/VercelJourney';
import { TerminalJourney } from '@/components/TerminalJourney';
import { SharedJourney } from '@/components/SharedJourney';
import { ServerSdkJourney } from '@/components/ServerSdkJourney';
import { ApiJourney } from '@/components/ApiJourney';
import { Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { onboardingPaths } from '@/lib/onboardingPaths';
import { cn } from '@/lib/utils';
import { OnboardingContextBar } from '@/components/OnboardingContextBar';

export default function Start() {
  const { state, updateState } = usePrototype();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  const cardKeyHandler = (action: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Clear selected pathway if project type changes
  useEffect(() => {
    setSelectedPathway(null);
  }, [state.projectType]);

  useEffect(() => {
    if (location === onboardingPaths.newProject.replit) {
      if (state.newProjectMethod !== 'guided' || state.guidedTool !== 'replit') {
        updateState({ projectType: 'new', newProjectMethod: 'guided', setupMethod: 'guided', guidedTool: 'replit' });
      }
    } else if (location === onboardingPaths.newProject.vercel) {
      if (state.newProjectMethod !== 'guided' || state.guidedTool !== 'vercel') {
        updateState({ projectType: 'new', newProjectMethod: 'guided', setupMethod: 'guided', guidedTool: 'vercel' });
      }
    } else if (location === onboardingPaths.newProject.terminal) {
      if (state.newProjectMethod !== 'terminal') updateState({ projectType: 'new', newProjectMethod: 'terminal', setupMethod: 'terminal' });
    } else if (location === onboardingPaths.existingProject.serverSdk) {
      if (state.existingProjectMethod !== 'server-sdk') updateState({ projectType: 'existing', existingProjectMethod: 'server-sdk' });
    } else if (location === onboardingPaths.existingProject.api) {
      if (state.existingProjectMethod !== 'api') updateState({ projectType: 'existing', existingProjectMethod: 'api' });
    }
  }, [location, state.newProjectMethod, state.existingProjectMethod, state.guidedTool, updateState]);

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
    location !== onboardingPaths.newProject.replit &&
    location !== onboardingPaths.newProject.vercel &&
    location !== onboardingPaths.newProject.guidedChoose &&
    location !== onboardingPaths.newProject.terminal &&
    location !== onboardingPaths.existingProject.serverSdk &&
    location !== onboardingPaths.existingProject.api
  ) {
    return (
      <>
        <OnboardingContextBar />
        <div className="flex flex-col mx-auto max-w-[960px] px-4 py-12 animate-in fade-in duration-500">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">What are you building?</h1>
          <p className="text-gray-500 text-center max-w-2xl mx-auto">
            Choose whether you are creating a new signage product or adding TomorrowOS to an existing application.
          </p>
          <p className="text-sm text-gray-400 text-center mb-12 mt-2">
            Choose a path below. You can return and change your selection before beginning setup.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card 
              className={cn("cursor-pointer transition-all", state.projectType === 'new' ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
              onClick={() => updateState({ projectType: 'new' })}
              onKeyDown={cardKeyHandler(() => updateState({ projectType: 'new' }))}
              role="button"
              tabIndex={0}
              aria-pressed={state.projectType === 'new'}
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
              className={cn("cursor-pointer transition-all", state.projectType === 'existing' ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
              onClick={() => updateState({ projectType: 'existing' })}
              onKeyDown={cardKeyHandler(() => updateState({ projectType: 'existing' }))}
              role="button"
              tabIndex={0}
              aria-pressed={state.projectType === 'existing'}
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
                className={cn("cursor-pointer transition-all flex flex-col", selectedPathway === onboardingPaths.newProject.guidedChoose ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
                onClick={() => setSelectedPathway(onboardingPaths.newProject.guidedChoose)}
                onKeyDown={cardKeyHandler(() => setSelectedPathway(onboardingPaths.newProject.guidedChoose))}
                role="button"
                tabIndex={0}
                aria-pressed={selectedPathway === onboardingPaths.newProject.guidedChoose}
              >
                <CardContent className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">GUIDED SETUP</h3>
                    {selectedPathway === onboardingPaths.newProject.guidedChoose && <CheckCircle2 className="w-6 h-6 text-black" />}
                  </div>
                  <p className="text-gray-600 mb-6">Use AI-assisted and guided tools to create your CMS.</p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> AI builders</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Environment configuration</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Application previews</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Managed publishing</li>
                  </ul>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={cn("cursor-pointer transition-all flex flex-col", selectedPathway === onboardingPaths.newProject.terminal ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
                onClick={() => setSelectedPathway(onboardingPaths.newProject.terminal)}
                onKeyDown={cardKeyHandler(() => setSelectedPathway(onboardingPaths.newProject.terminal))}
                role="button"
                tabIndex={0}
                aria-pressed={selectedPathway === onboardingPaths.newProject.terminal}
              >
                <CardContent className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">TERMINAL</h3>
                    {selectedPathway === onboardingPaths.newProject.terminal && <CheckCircle2 className="w-6 h-6 text-black" />}
                  </div>
                  <p className="text-gray-600 mb-6">Use the TomorrowOS CLI in your local development environment.</p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> TomorrowOS CLI</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Local development</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Bring your own infrastructure</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Deploy to your chosen supported host</li>
                  </ul>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
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
                className={cn("cursor-pointer transition-all flex flex-col", selectedPathway === onboardingPaths.existingProject.serverSdk ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
                onClick={() => setSelectedPathway(onboardingPaths.existingProject.serverSdk)}
                onKeyDown={cardKeyHandler(() => setSelectedPathway(onboardingPaths.existingProject.serverSdk))}
                role="button"
                tabIndex={0}
                aria-pressed={selectedPathway === onboardingPaths.existingProject.serverSdk}
              >
                <CardContent className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="inline-block bg-gray-200 text-xs font-semibold px-2 py-1 rounded mb-4">Recommended for Node.js backends</div>
                      <h3 className="text-xl font-bold text-gray-900">SERVER SDK</h3>
                    </div>
                    {selectedPathway === onboardingPaths.existingProject.serverSdk && <CheckCircle2 className="w-6 h-6 text-black mt-2" />}
                  </div>
                  <p className="text-gray-600 mb-6">Integrate TomorrowOS directly into your backend application.</p>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={cn("cursor-pointer transition-all flex flex-col", selectedPathway === onboardingPaths.existingProject.api ? 'border-black ring-1 ring-black bg-gray-50' : 'hover:border-gray-400 bg-white border-border')}
                onClick={() => setSelectedPathway(onboardingPaths.existingProject.api)}
                onKeyDown={cardKeyHandler(() => setSelectedPathway(onboardingPaths.existingProject.api))}
                role="button"
                tabIndex={0}
                aria-pressed={selectedPathway === onboardingPaths.existingProject.api}
              >
                <CardContent className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">API INTEGRATION</h3>
                    {selectedPathway === onboardingPaths.existingProject.api && <CheckCircle2 className="w-6 h-6 text-black" />}
                  </div>
                  <p className="text-gray-600 mb-6">Connect your application using the TomorrowOS HTTP API.</p>
                  <div className="mt-auto flex items-center text-sm font-medium hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedPathway && (
          <div className="mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-2">
            <Button 
              size="lg" 
              className="w-full md:w-auto min-w-[300px] text-lg font-medium bg-black text-white hover:bg-black/90"
              onClick={() => setLocation(selectedPathway)}
            >
              Continue with {
                selectedPathway === onboardingPaths.newProject.guidedChoose ? 'Guided Setup' : 
                selectedPathway === onboardingPaths.newProject.terminal ? 'Terminal' : 
                selectedPathway === onboardingPaths.existingProject.serverSdk ? 'Server SDK' : 'API Integration'
              }
            </Button>
          </div>
        )}
      </div>
      </>
    );
  }

  if (location === onboardingPaths.newProject.guidedChoose) {
    return (
      <>
        <OnboardingContextBar />
        <GuidedToolSelector onSelect={(path) => setLocation(path)} />
      </>
    );
  }

  // Detailed Journey Shell
  const isNewProject = location === onboardingPaths.newProject.replit || location === onboardingPaths.newProject.vercel || location === onboardingPaths.newProject.terminal;
  const showSidebar = isNewProject || state.sharedStep > 0;

  return (
    <>
    <OnboardingContextBar />
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 relative px-4 md:px-0 py-8">
      
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
           {isNewProject && !mobileMenuOpen && (
             <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden w-full flex items-center justify-between mt-2"
                onClick={() => setMobileMenuOpen(true)}
             >
                <span>View Steps</span>
                <Menu className="w-4 h-4" />
             </Button>
           )}
           {/* SIDEBAR */}
           <aside className={`md:block w-full md:w-[240px] shrink-0 md:sticky md:top-24 z-40 bg-background md:bg-transparent ${mobileMenuOpen ? 'block absolute top-0 left-0 right-0 p-4 border rounded-xl shadow-lg mt-14' : 'hidden'}`}>
              <div className="md:hidden flex justify-between items-center mb-4">
                <h3 className="font-bold">Steps</h3>
                {isNewProject && (
                  <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-8 w-8"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                     <X className="w-5 h-5" />
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
    </>
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
  
  if (location === onboardingPaths.newProject.replit) {
    return <GuidedJourney />;
  }
  if (location === onboardingPaths.newProject.vercel) {
    return <VercelJourney />;
  }
  
  return <TerminalJourney />;
}

import { vercelConfig } from '@/lib/vercelConfig';

function GuidedToolSelector({ onSelect }: { onSelect: (path: string) => void }) {
  const { state } = usePrototype();

  const vercelStatusConfig = vercelConfig.guidedTools.vercel.statusConfig[vercelConfig.vercelSupportStatus];
  const vercelDisabled = vercelStatusConfig.disabled;

  return (
    <div className="flex flex-col mx-auto max-w-4xl px-4 py-12 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose your preferred tool</h1>
      <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
        Select the AI-assisted environment where you want to build and host your TomorrowOS CMS.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className="cursor-pointer hover:border-gray-400 transition-all flex flex-col focus-visible:ring-2 focus-visible:ring-primary outline-none"
          onClick={() => onSelect(onboardingPaths.newProject.replit)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(onboardingPaths.newProject.replit)}
        >
          <CardContent className="p-8 flex-1">
            <div className={cn("inline-block text-xs font-semibold px-2 py-1 rounded mb-4 self-start", vercelConfig.guidedTools.replit.status === 'recommended' ? 'bg-gray-100 text-gray-900' : 'bg-transparent text-gray-500 border border-border')}>
              {vercelConfig.guidedTools.replit.status === 'recommended' ? 'Recommended' : vercelConfig.guidedTools.replit.status}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{vercelConfig.guidedTools.replit.label}</h3>
            <p className="text-gray-600 mb-6">{vercelConfig.guidedTools.replit.description}</p>
            <ul className="space-y-2 text-sm text-gray-700 mb-8">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Agent</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Secrets</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Preview</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Replit Publishing</li>
            </ul>
            <div className="mt-auto">
              <Button className="w-full pointer-events-none" tabIndex={-1}>Start with Replit</Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "transition-all flex flex-col relative overflow-hidden",
            vercelDisabled ? "opacity-60 pointer-events-none" : "cursor-pointer hover:border-gray-400 focus-visible:ring-2 focus-visible:ring-primary outline-none"
          )}
          onClick={() => !vercelDisabled && onSelect(onboardingPaths.newProject.vercel)}
          tabIndex={vercelDisabled ? -1 : 0}
          onKeyDown={(e) => !vercelDisabled && e.key === 'Enter' && onSelect(onboardingPaths.newProject.vercel)}
        >
          <CardContent className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="inline-block bg-blue-50 text-blue-800 border border-blue-100 text-xs font-semibold px-2 py-1 rounded">Build with v0</div>
              {vercelStatusConfig.badge && (
                <div className={cn("inline-block text-xs font-medium px-2 py-1 rounded border", vercelStatusConfig.badgeClass)}>
                  {vercelStatusConfig.badge}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{vercelConfig.guidedTools.vercel.label}</h3>
            <p className="text-gray-600 mb-6">{vercelConfig.guidedTools.vercel.description}</p>
            <ul className="space-y-2 text-sm text-gray-700 mb-8">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> v0 AI builder</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Vercel Marketplace</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Vercel Environment Variables</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Vercel Deployments</li>
            </ul>
            
            <div className="mt-auto">
              <Button className="w-full pointer-events-none" disabled={vercelDisabled} tabIndex={-1}>Start with Vercel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Vercel status note */}
      <div className="mt-8 flex justify-center">
         {vercelStatusConfig.calloutTitle && !state.prototypeReviewMode && (
           <div className={cn("max-w-2xl border rounded-md p-4 flex gap-3 text-sm", vercelStatusConfig.badgeClass)}>
             <div className="font-semibold shrink-0">{vercelStatusConfig.calloutTitle}</div>
             <div>
               {vercelStatusConfig.calloutCopy}
             </div>
           </div>
         )}
         {vercelConfig.vercelSupportStatus === 'validation-required' && state.prototypeReviewMode && (
           <div className="max-w-2xl bg-amber-50 border border-amber-200 rounded-md p-4 text-sm w-full">
             <div className="font-semibold text-amber-900 mb-2">Internal Review: Engineering Validation Required</div>
             <div className="text-amber-800 mb-3">
               Vercel runtime and WebSocket behaviour must be confirmed through an end-to-end TomorrowOS device test.
             </div>
             <ul className="list-disc pl-5 text-amber-800 space-y-1">
               <li>CMS deployment succeeds</li>
               <li>Device connection remains stable</li>
               <li>WebSocket or realtime communication works</li>
               <li>Connections recover after function recycling</li>
               <li>Reconnect works after display restart</li>
               <li>Offline and online recovery works</li>
               <li>Published production environment variables remain available</li>
               <li>Media upload works</li>
               <li>Device commands and events work</li>
               <li>Runtime behaviour is acceptable under Vercel execution limits</li>
             </ul>
           </div>
         )}
      </div>

    </div>
  );
}
