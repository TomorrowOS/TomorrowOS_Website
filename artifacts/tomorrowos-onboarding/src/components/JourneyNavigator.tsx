import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { GUIDED_STEPS, TERMINAL_STEPS, SHARED_STEPS } from '@/lib/constants';
import { Check, ChevronLeft, ChevronRight, Lock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function JourneyNavigator() {
  const { state, setStep, goToNextStep, goToPrevStep } = usePrototype();
  const [mobileListOpen, setMobileListOpen] = useState(false);

  const isGuided = state.setupMethod === 'guided';
  const steps = isGuided ? GUIDED_STEPS : TERMINAL_STEPS;
  
  const activeStep = state.sharedStep > 0 ? state.sharedStep : (isGuided ? state.guidedStep : state.terminalStep);
  const maxStep = isGuided ? (state.maxGuidedStep || 1) : (state.maxTerminalStep || 1);
  const maxSharedStep = state.maxSharedStep || 0;
  const isShared = state.sharedStep > 0;

  // Helpers to determine step states
  const getStepState = (stepId: number, isSharedPhase: boolean) => {
    if (isSharedPhase) {
      if (activeStep === stepId && isShared) {
         if (stepId === 3 && state.pairingStatus === 'needs_help') return 'needs-attention';
         return 'current';
      }
      if (maxSharedStep > stepId) return 'completed';
      if (maxSharedStep >= stepId) return 'available'; // maxSharedStep == stepId but not current (e.g. we went back to guided)
      return 'locked';
    } else {
      if (!isShared && activeStep === stepId) {
         if (isGuided) {
           if (stepId === 7 && state.previewGenerationStatus === 'needs_help') return 'needs-attention';
           if (stepId === 8 && state.readinessStatus === 'needs_help') return 'needs-attention';
           if (stepId === 10 && state.publishedStatus === 'needs_help') return 'needs-attention';
         }
         return 'current';
      }
      if (maxStep > stepId) return 'completed';
      if (maxStep >= stepId) return 'available'; 
      return 'locked';
    }
  };

  const renderStep = (step: { id: number, title: string }, isSharedPhase: boolean, onNavigate?: () => void) => {
    const stepState = getStepState(step.id, isSharedPhase);
    
    let IconContent = <span className="text-xs font-medium">{step.id}</span>;
    if (stepState === 'completed') IconContent = <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />;
    else if (stepState === 'locked') IconContent = <Lock className="w-3.5 h-3.5 text-gray-400" />;
    else if (stepState === 'needs-attention') IconContent = <AlertTriangle className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />;

    const isClickable = stepState !== 'locked';

    return (
      <button 
        key={step.id}
        onClick={() => {
          if (isClickable) {
            setStep(step.id, isSharedPhase);
            onNavigate?.();
          }
        }}
        aria-disabled={!isClickable}
        aria-current={stepState === 'current' ? 'step' : undefined}
        title={stepState === 'locked' ? 'Complete previous steps first' : ''}
        className={cn(
          "w-full text-left text-sm py-2 px-3 min-h-[44px] rounded-md transition-all flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", 
          stepState === 'current' ? "bg-gray-100 font-medium text-gray-900 border-l-4 border-l-gray-900 pl-2 rounded-l-none" : 
          stepState === 'completed' ? "text-gray-900 hover:bg-gray-50 cursor-pointer font-medium" : 
          stepState === 'available' ? "text-gray-700 hover:bg-gray-50 cursor-pointer font-medium" :
          stepState === 'needs-attention' ? "bg-amber-50 font-medium text-amber-900 border-l-4 border-l-amber-500 pl-2 rounded-l-none" :
          "text-gray-400 cursor-not-allowed"
        )}
      >
        <span className={cn(
          "w-6 h-6 flex items-center justify-center shrink-0 rounded-full border bg-white shadow-sm",
          stepState === 'current' ? "border-gray-300 text-gray-900" :
          stepState === 'needs-attention' ? "border-amber-300" :
          stepState === 'completed' ? "border-success/30 bg-success/5" :
          "border-gray-200"
        )}>
          {IconContent}
        </span>
        <span className="flex-1 truncate">{step.title}</span>
        {stepState === 'locked' && (
          <span className="sr-only">Locked. Complete previous steps first.</span>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-1">
        {state.projectType === 'new' && (
          <>
            <h4 className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider">
              {isGuided ? 'GUIDED SETUP' : 'TERMINAL SETUP'}
            </h4>
            {steps.map(step => renderStep(step, false))}
          </>
        )}

        <h4 className={cn("text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider", state.projectType === 'new' ? "mt-8" : "")}>
          DEPLOYMENT
        </h4>
        {SHARED_STEPS.map(step => renderStep(step, true))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-border">
           <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Step {activeStep} of {isShared ? SHARED_STEPS.length : (state.projectType === 'new' ? steps.length : SHARED_STEPS.length)}
              </span>
              <span className="text-sm font-medium text-gray-900">
                 {isShared ? SHARED_STEPS.find(s => s.id === activeStep)?.title : steps.find(s => s.id === activeStep)?.title}
              </span>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={goToPrevStep} disabled={!isShared && activeStep === 1} aria-label="Previous step">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextStep} disabled={getStepState(activeStep + 1, isShared) === 'locked'} aria-label="Next step">
                <ChevronRight className="w-4 h-4" />
              </Button>
           </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setMobileListOpen(open => !open)}
          aria-expanded={mobileListOpen}
        >
          {mobileListOpen ? 'Hide all steps' : 'View all steps'}
        </Button>
        {mobileListOpen && (
          <div className="flex flex-col gap-1 border border-border rounded-lg p-2 bg-white">
            {state.projectType === 'new' && (
              <>
                <h4 className="text-xs font-bold text-gray-500 mb-1 px-2 uppercase tracking-wider">
                  {isGuided ? 'GUIDED SETUP' : 'TERMINAL SETUP'}
                </h4>
                {steps.map(step => renderStep(step, false, () => setMobileListOpen(false)))}
              </>
            )}
            <h4 className={cn("text-xs font-bold text-gray-500 mb-1 px-2 uppercase tracking-wider", state.projectType === 'new' ? "mt-4" : "")}>
              DEPLOYMENT
            </h4>
            {SHARED_STEPS.map(step => renderStep(step, true, () => setMobileListOpen(false)))}
          </div>
        )}
      </div>
    </div>
  );
}
