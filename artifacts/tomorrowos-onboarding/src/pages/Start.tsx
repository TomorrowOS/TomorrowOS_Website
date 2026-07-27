import React from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from '@/components/PrototypeProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JourneyNavigator } from '@/components/JourneyNavigator';

export default function Start() {
  const { state, updateState } = usePrototype();

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* SECTION A — PROJECT TYPE */}
      <section className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Start a new project</h1>
          <p className="text-gray-600 mt-2 text-lg">Choose how you want to use TomorrowOS.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-all ${state.projectType === 'new' ? 'border-primary bg-gray-50 ring-1 ring-primary' : 'hover:border-gray-300'}`}
            onClick={() => updateState({ projectType: 'new' })}
          >
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Start a new project</h3>
              <p className="text-sm text-gray-500">Create a new signage product from a starter.</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${state.projectType === 'existing' ? 'border-primary bg-gray-50 ring-1 ring-primary' : 'hover:border-gray-300'}`}
            onClick={() => updateState({ projectType: 'existing' })}
          >
            <CardContent className="p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                Coming next
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Connect an existing project</h3>
              <p className="text-sm text-gray-500">Add signage to an application you already operate.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION B — SETUP METHOD */}
      <section className="space-y-4 pb-8 border-b border-border">
        <h2 className="text-xl font-bold text-gray-900">How do you want to get started?</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-all ${state.setupMethod === 'guided' ? 'border-primary bg-gray-50 ring-1 ring-primary' : 'hover:border-gray-300'}`}
            onClick={() => updateState({ setupMethod: 'guided' })}
          >
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Guided setup</h3>
              <p className="text-sm text-gray-500 mb-4">Use Replit Agent and guided tools.</p>
              <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc marker:text-gray-300">
                <li>Replit Agent</li>
                <li>Replit Secrets</li>
                <li>Replit Preview</li>
                <li>Replit Publishing</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${state.setupMethod === 'terminal' ? 'border-primary bg-gray-50 ring-1 ring-primary' : 'hover:border-gray-300'}`}
            onClick={() => updateState({ setupMethod: 'terminal' })}
          >
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Terminal</h3>
              <p className="text-sm text-gray-500 mb-4">Use the TomorrowOS CLI in your local terminal.</p>
              <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc marker:text-gray-300">
                <li>TomorrowOS CLI</li>
                <li>Local environment</li>
                <li>Environment file</li>
                <li>Supported deployment host</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* JOURNEY AREA */}
      <div className="flex flex-col md:flex-row gap-8 relative items-start">
        <aside className="w-full md:w-64 sticky top-24 shrink-0">
          <JourneyNavigator />
        </aside>
        
        <div className="flex-1 min-w-0 pb-32">
           <JourneyRouter />
        </div>
      </div>
      
    </div>
  );
}

// Temporary inline routing for the journey content until we build the components
import { GuidedJourney } from '@/components/GuidedJourney';
import { TerminalJourney } from '@/components/TerminalJourney';
import { SharedJourney } from '@/components/SharedJourney';

function JourneyRouter() {
  const { state } = usePrototype();
  
  if (state.sharedStep > 0) {
    return <SharedJourney />;
  }
  
  if (state.setupMethod === 'guided') {
    return <GuidedJourney />;
  }
  
  return <TerminalJourney />;
}
