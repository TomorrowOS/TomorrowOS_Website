import React from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';

interface StepFooterProps {
  canContinue?: boolean;
  blockedMessage?: string;
  continueLabel?: string;
  onContinue?: () => void;
  showBack?: boolean;
}

export function StepFooter({ 
  canContinue = true, 
  blockedMessage, 
  continueLabel = "Continue", 
  onContinue,
  showBack = true
}: StepFooterProps) {
  const { state, goToNextStep, goToPrevStep } = usePrototype();

  const isShared = state.sharedStep > 0;
  const isGuided = state.setupMethod === 'guided';
  const activeStep = isShared ? state.sharedStep : (isGuided ? state.guidedStep : state.terminalStep);

  const handleNext = () => {
    if (onContinue) onContinue();
    else goToNextStep();
  };

  const isFirstStep = !isShared && activeStep === 1;

  return (
    <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky bottom-0 bg-background/95 backdrop-blur py-4 z-10">
      {blockedMessage && !canContinue && (
        <div className="text-sm font-medium text-amber-600 sm:absolute sm:-top-8 sm:left-0">
          {blockedMessage}
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        {showBack ? (
          <Button 
            variant="outline" 
            onClick={goToPrevStep} 
            disabled={isFirstStep}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        ) : <div />}
        <Button 
          onClick={handleNext} 
          disabled={!canContinue}
          className="w-full sm:w-auto mt-0 ml-3 bg-black text-white hover:bg-gray-800"
        >
          {continueLabel}
        </Button>
      </div>
    </div>
  );
}
