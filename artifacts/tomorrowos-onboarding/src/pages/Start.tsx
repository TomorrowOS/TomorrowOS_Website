import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from '@/components/PrototypeProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JourneyNavigator } from '@/components/JourneyNavigator';
import { GuidedJourney } from '@/components/GuidedJourney';
import { TerminalJourney } from '@/components/TerminalJourney';
import { SharedJourney } from '@/components/SharedJourney';
import { Menu, X } from 'lucide-react';

export default function Start() {
  const { state, updateState } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGuided = state.setupMethod === 'guided';

  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 relative">
      
      {/* COMPACT BREADCRUMB */}
      <div className="flex items-center justify-between py-4 mb-6 md:mb-8 border-b border-border">
         <div className="text-sm font-medium text-gray-500 flex items-center">
            Start a new project 
            <span className="mx-2">›</span> 
            <span className="text-gray-900">{isGuided ? 'Guided setup' : 'Terminal'}</span>
         </div>
         <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 hidden md:flex" 
            onClick={() => updateState({ setupMethod: isGuided ? 'terminal' : 'guided' })}
         >
            Switch to {isGuided ? 'Terminal' : 'Guided setup'}
         </Button>
         <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
         >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative items-start">
         
         {/* SIDEBAR */}
         <aside className={`md:block w-full md:w-[240px] shrink-0 md:sticky md:top-24 z-40 bg-background md:bg-transparent ${mobileMenuOpen ? 'block absolute top-0 left-0 right-0 p-4 border rounded-xl shadow-lg mt-14' : 'hidden'}`}>
            <div className="md:hidden flex justify-between items-center mb-4">
              <h3 className="font-bold">Steps</h3>
              <Button variant="outline" size="sm" onClick={() => updateState({ setupMethod: isGuided ? 'terminal' : 'guided' })}>
                Switch to {isGuided ? 'Terminal' : 'Guided'}
              </Button>
            </div>
            <JourneyNavigator />
         </aside>
         
         {/* CONTENT */}
         <div className="flex-1 w-full max-w-[760px] min-w-0 pb-32">
            <JourneyRouter />
         </div>
      </div>
      
    </div>
  );
}

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
