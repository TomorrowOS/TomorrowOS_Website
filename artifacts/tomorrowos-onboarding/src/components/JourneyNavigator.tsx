import React from 'react';
import { usePrototype } from './PrototypeProvider';
import { GUIDED_STEPS, TERMINAL_STEPS, SHARED_STEPS } from '@/lib/constants';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function JourneyNavigator() {
  const { state, setStep, goToNextStep, goToPrevStep } = usePrototype();

  const steps = state.setupMethod === 'guided' ? GUIDED_STEPS : TERMINAL_STEPS;
  const activeStep = state.sharedStep > 0 ? state.sharedStep : (state.setupMethod === 'guided' ? state.guidedStep : state.terminalStep);
  const isShared = state.sharedStep > 0;

  // Track max step loosely based on our simple state model
  // For the prototype, we let users click any step up to their current one.
  // We'll allow clicking any step to navigate freely for testing purposes, but highlight the "active" one.

  return (
    <div className="flex flex-col gap-4">
      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-1">
        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
          {state.setupMethod === 'guided' ? 'Guided Setup' : 'Terminal Setup'}
        </h4>
        {steps.map(step => {
           const isComplete = isShared || (state.setupMethod === 'guided' ? state.guidedStep > step.id : state.terminalStep > step.id);
           const isCurrent = !isShared && activeStep === step.id;
           return (
             <button 
               key={step.id}
               onClick={() => setStep(step.id)}
               className={cn("text-left text-sm py-2 px-3 rounded-md transition-colors flex items-center gap-3", 
                 isCurrent ? "bg-gray-100 font-medium text-gray-900" : 
                 isComplete ? "text-gray-600 hover:bg-gray-50" : "text-gray-400 hover:bg-gray-50"
               )}
             >
               <span className="w-5 h-5 flex items-center justify-center shrink-0 border rounded-full bg-white shadow-sm">
                 {isComplete ? <Check className="w-3 h-3 text-success" /> : <span className="text-[10px]">{step.id}</span>}
               </span>
               {step.title}
             </button>
           )
        })}

        <h4 className="text-xs font-bold text-gray-500 mt-8 mb-3 uppercase tracking-wider">Deployment</h4>
        {SHARED_STEPS.map(step => {
           const isComplete = isShared && state.sharedStep > step.id;
           const isCurrent = isShared && state.sharedStep === step.id;
           
           return (
             <button 
               key={step.id}
               onClick={() => {
                 // only allow jumping to shared steps if we're in shared phase
                 if (isShared) {
                   // Hacky way to set shared step directly
                 }
               }}
               disabled={!isShared}
               className={cn("text-left text-sm py-2 px-3 rounded-md transition-colors flex items-center gap-3", 
                 isCurrent ? "bg-gray-100 font-medium text-gray-900" : 
                 isComplete ? "text-gray-600 hover:bg-gray-50" : "text-gray-400"
               )}
             >
               <span className="w-5 h-5 flex items-center justify-center shrink-0 border rounded-full bg-white shadow-sm">
                 {isComplete ? <Check className="w-3 h-3 text-success" /> : <span className="text-[10px]">{step.id}</span>}
               </span>
               {step.title}
             </button>
           )
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-border">
         <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Step {activeStep} of {isShared ? SHARED_STEPS.length : steps.length}
            </span>
            <span className="text-sm font-medium text-gray-900">
               {isShared ? SHARED_STEPS.find(s => s.id === activeStep)?.title : steps.find(s => s.id === activeStep)?.title}
            </span>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevStep} disabled={!isShared && activeStep === 1}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextStep}>
              <ChevronRight className="w-4 h-4" />
            </Button>
         </div>
      </div>
    </div>
  );
}
