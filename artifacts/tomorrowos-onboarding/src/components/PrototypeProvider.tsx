import React, { createContext, useContext, useEffect, useState } from 'react';

export type SetupMethod = 'guided' | 'terminal';
export type ProjectType = 'new' | 'existing' | null;
export type NewProjectMethod = 'guided' | 'terminal' | null;
export type ExistingProjectMethod = 'server-sdk' | 'api' | null;
export type UserConfirmedStatus = 'not_started' | 'in_progress' | 'confirmed' | 'needs_help';

export interface PrototypeState {
  prototypeReviewMode: boolean;
  projectType: ProjectType;
  newProjectMethod: NewProjectMethod;
  existingProjectMethod: ExistingProjectMethod;
  setupMethod: SetupMethod; // Legacy field, kept for mapping
  guidedStep: number;
  maxGuidedStep: number;
  terminalStep: number;
  maxTerminalStep: number;
  sharedStep: number;
  maxSharedStep: number;
  samsungGuideStep: number;
  maxSamsungGuideStep: number;
  samsungCompletedSteps: number[];
  contentGuideStep: number;
  maxContentGuideStep: number;
  contentCompletedSteps: number[];
  supabaseStatus: UserConfirmedStatus;
  cloudinaryStatus: UserConfirmedStatus;
  previewGenerationStatus: UserConfirmedStatus;
  readinessStatus: UserConfirmedStatus;
  publishedStatus: UserConfirmedStatus;
  pairingStatus: UserConfirmedStatus;
  cmsUrl?: string;
}

const initialState: PrototypeState = {
  prototypeReviewMode: false,
  projectType: null,
  newProjectMethod: null,
  existingProjectMethod: null,
  setupMethod: 'guided',
  guidedStep: 1,
  maxGuidedStep: 1,
  terminalStep: 1,
  maxTerminalStep: 1,
  sharedStep: 0,
  maxSharedStep: 0,
  samsungGuideStep: 1,
  maxSamsungGuideStep: 1,
  samsungCompletedSteps: [],
  contentGuideStep: 1,
  maxContentGuideStep: 1,
  contentCompletedSteps: [],
  supabaseStatus: 'not_started',
  cloudinaryStatus: 'not_started',
  previewGenerationStatus: 'not_started',
  readinessStatus: 'not_started',
  publishedStatus: 'not_started',
  pairingStatus: 'not_started',
  cmsUrl: '',
};

interface PrototypeContextType {
  state: PrototypeState;
  updateState: (updates: Partial<PrototypeState>) => void;
  resetState: () => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setStep: (step: number, isShared?: boolean) => void;
}

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PrototypeState>(() => {
    try {
      const stored = localStorage.getItem('tomorrowos_prototype');
      if (stored) {
        const parsed = { ...initialState, ...JSON.parse(stored) } as PrototypeState;
        
        // Migrate legacy setupMethod to new fields if new fields are null
        if (parsed.projectType === null) {
           parsed.projectType = 'new';
           if (parsed.setupMethod === 'terminal') {
             parsed.newProjectMethod = 'terminal';
           } else {
             parsed.newProjectMethod = 'guided';
           }
        }
        
        // Migrate legacy stored state that predates max-step tracking:
        // derive max progress from the current step fields so previously
        // reached steps stay unlocked.
        parsed.maxGuidedStep = Math.max(parsed.maxGuidedStep || 1, parsed.guidedStep || 1);
        parsed.maxTerminalStep = Math.max(parsed.maxTerminalStep || 1, parsed.terminalStep || 1);
        parsed.maxSharedStep = Math.max(parsed.maxSharedStep || 0, parsed.sharedStep || 0);
        parsed.maxSamsungGuideStep = Math.max(parsed.maxSamsungGuideStep || 1, parsed.samsungGuideStep || 1);
        parsed.samsungCompletedSteps = parsed.samsungCompletedSteps || [];
        parsed.maxContentGuideStep = Math.max(parsed.maxContentGuideStep || 1, parsed.contentGuideStep || 1);
        parsed.contentCompletedSteps = parsed.contentCompletedSteps || [];
        return parsed;
      }
    } catch (e) {}
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('tomorrowos_prototype', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<PrototypeState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
    localStorage.removeItem('tomorrowos_prototype');
  };

  const goToNextStep = () => {
    setState(prev => {
      // Determine which phase we're in based on current step numbers and completion
      // If we are in the guided track and haven't finished it
      if (prev.setupMethod === 'guided' && prev.guidedStep <= 10) {
        if (prev.guidedStep === 10) {
          // move to shared
          return { ...prev, guidedStep: 11, maxGuidedStep: Math.max(prev.maxGuidedStep || 1, 11), sharedStep: 1, maxSharedStep: Math.max(prev.maxSharedStep || 0, 1) };
        }
        const nextGuided = prev.guidedStep + 1;
        return { ...prev, guidedStep: nextGuided, maxGuidedStep: Math.max(prev.maxGuidedStep || 1, nextGuided) };
      }
      if (prev.setupMethod === 'terminal' && prev.terminalStep <= 13) {
        if (prev.terminalStep === 13) {
          // move to shared
          return { ...prev, terminalStep: 14, maxTerminalStep: Math.max(prev.maxTerminalStep || 1, 14), sharedStep: 1, maxSharedStep: Math.max(prev.maxSharedStep || 0, 1) };
        }
        const nextTerminal = prev.terminalStep + 1;
        return { ...prev, terminalStep: nextTerminal, maxTerminalStep: Math.max(prev.maxTerminalStep || 1, nextTerminal) };
      }
      // Shared step
      if (prev.sharedStep < 4) {
        const nextShared = prev.sharedStep + 1;
        return { ...prev, sharedStep: nextShared, maxSharedStep: Math.max(prev.maxSharedStep || 0, nextShared) };
      }
      return prev;
    });
  };

  const goToPrevStep = () => {
    setState(prev => {
      if (prev.sharedStep > 1) {
        return { ...prev, sharedStep: prev.sharedStep - 1 };
      } else if (prev.sharedStep === 1 && prev.guidedStep === 11 && prev.setupMethod === 'guided') {
        return { ...prev, guidedStep: 10, sharedStep: 0 };
      } else if (prev.sharedStep === 1 && prev.terminalStep === 14 && prev.setupMethod === 'terminal') {
        return { ...prev, terminalStep: 13, sharedStep: 0 };
      }
      
      if (prev.setupMethod === 'guided' && prev.guidedStep > 1) {
        return { ...prev, guidedStep: prev.guidedStep - 1 };
      }
      if (prev.setupMethod === 'terminal' && prev.terminalStep > 1) {
        return { ...prev, terminalStep: prev.terminalStep - 1 };
      }
      return prev;
    });
  };

  const setStep = (step: number, isShared: boolean = false) => {
    setState(prev => {
      if (isShared) {
         return { ...prev, sharedStep: step };
      }
      if (prev.setupMethod === 'guided') {
        return { ...prev, guidedStep: step, sharedStep: 0 };
      } else {
        return { ...prev, terminalStep: step, sharedStep: 0 };
      }
    });
  }

  return (
    <PrototypeContext.Provider value={{ state, updateState, resetState, goToNextStep, goToPrevStep, setStep }}>
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error('usePrototype must be used within PrototypeProvider');
  return context;
}
