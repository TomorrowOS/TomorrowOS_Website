import React, { createContext, useContext, useEffect, useState } from 'react';

export type SetupMethod = 'guided' | 'terminal';
export type GuidedTool = 'replit' | 'vercel' | null;
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
  guidedTool: GuidedTool;
  guidedStep: number;
  maxGuidedStep: number;
  vercelStep: number;
  maxVercelStep: number;
  vercelCompletedSteps: number[];
  /** Schema version of the Vercel onboarding flow; 2 = 12-step flow without the standalone "Follow the questions" step. */
  vercelFlowVersion: number;
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
  
  replitPreviewGenerationStatus: UserConfirmedStatus;
  replitReadinessStatus: UserConfirmedStatus;
  replitPublishedStatus: UserConfirmedStatus;
  
  vercelPreviewGenerationStatus: UserConfirmedStatus;
  vercelReadinessStatus: UserConfirmedStatus;
  vercelPublishedStatus: UserConfirmedStatus;
  
  terminalReadinessStatus: UserConfirmedStatus;
  terminalPublishedStatus: UserConfirmedStatus;

  pairingStatus: UserConfirmedStatus;
  cmsUrl?: string;
  /** Media-storage provider identifier chosen in Vercel step 5. Records the selection only — no connection is inspected. */
  vercelMediaProvider?: 'cloudinary' | 'vercel-blob' | null;
}

const initialState: PrototypeState = {
  prototypeReviewMode: false,
  projectType: null,
  newProjectMethod: null,
  existingProjectMethod: null,
  setupMethod: 'guided',
  guidedTool: 'replit',
  guidedStep: 1,
  maxGuidedStep: 1,
  vercelStep: 1,
  maxVercelStep: 1,
  vercelCompletedSteps: [],
  vercelFlowVersion: 2,
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
  
  replitPreviewGenerationStatus: 'not_started',
  replitReadinessStatus: 'not_started',
  replitPublishedStatus: 'not_started',
  
  vercelPreviewGenerationStatus: 'not_started',
  vercelReadinessStatus: 'not_started',
  vercelPublishedStatus: 'not_started',
  
  terminalReadinessStatus: 'not_started',
  terminalPublishedStatus: 'not_started',

  pairingStatus: 'not_started',
  vercelMediaProvider: null,
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
        const rawStored = JSON.parse(stored);
        const parsed = { ...initialState, ...rawStored } as PrototypeState;
        
        // Migrate legacy statuses to namespaced statuses based on the setup method chosen
        if (rawStored.previewGenerationStatus) {
          if (parsed.setupMethod === 'guided' && parsed.guidedTool === 'vercel') {
            parsed.vercelPreviewGenerationStatus = rawStored.previewGenerationStatus;
          } else {
            parsed.replitPreviewGenerationStatus = rawStored.previewGenerationStatus;
          }
        }
        if (rawStored.readinessStatus) {
          if (parsed.setupMethod === 'terminal') {
            parsed.terminalReadinessStatus = rawStored.readinessStatus;
          } else if (parsed.setupMethod === 'guided' && parsed.guidedTool === 'vercel') {
            parsed.vercelReadinessStatus = rawStored.readinessStatus;
          } else {
            parsed.replitReadinessStatus = rawStored.readinessStatus;
          }
        }
        if (rawStored.publishedStatus) {
          if (parsed.setupMethod === 'terminal') {
            parsed.terminalPublishedStatus = rawStored.publishedStatus;
          } else if (parsed.setupMethod === 'guided' && parsed.guidedTool === 'vercel') {
            parsed.vercelPublishedStatus = rawStored.publishedStatus;
          } else {
            parsed.replitPublishedStatus = rawStored.publishedStatus;
          }
        }

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
        parsed.guidedTool = parsed.guidedTool || 'replit';
        parsed.maxGuidedStep = Math.max(parsed.maxGuidedStep || 1, parsed.guidedStep || 1);
        parsed.maxVercelStep = Math.max(parsed.maxVercelStep || 1, parsed.vercelStep || 1);
        parsed.vercelCompletedSteps = parsed.vercelCompletedSteps || [];

        // Migrate stored Vercel progress from the legacy 13-step flow (v1) to
        // the 12-step flow (v2): the standalone "Follow the questions" step 4
        // was removed, so steps 5-14 shift down by one. Old step 4 maps to the
        // new step 4 ("Choose a database").
        if (!rawStored.vercelFlowVersion || rawStored.vercelFlowVersion < 2) {
          const shift = (s: number) => (s >= 5 ? s - 1 : s);
          parsed.vercelStep = shift(parsed.vercelStep || 1);
          parsed.maxVercelStep = shift(parsed.maxVercelStep || 1);
          parsed.vercelCompletedSteps = Array.from(new Set(parsed.vercelCompletedSteps.map(shift)));
        }
        parsed.vercelFlowVersion = 2;
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
      if (prev.setupMethod === 'guided') {
        if (prev.guidedTool === 'vercel') {
          if (prev.vercelStep <= 12) {
            if (prev.vercelStep === 12) {
              return { ...prev, vercelStep: 13, maxVercelStep: Math.max(prev.maxVercelStep || 1, 13), sharedStep: 1, maxSharedStep: Math.max(prev.maxSharedStep || 0, 1) };
            }
            const nextVercel = prev.vercelStep + 1;
            return { ...prev, vercelStep: nextVercel, maxVercelStep: Math.max(prev.maxVercelStep || 1, nextVercel) };
          }
        } else {
          if (prev.guidedStep <= 10) {
            if (prev.guidedStep === 10) {
              // move to shared
              return { ...prev, guidedStep: 11, maxGuidedStep: Math.max(prev.maxGuidedStep || 1, 11), sharedStep: 1, maxSharedStep: Math.max(prev.maxSharedStep || 0, 1) };
            }
            const nextGuided = prev.guidedStep + 1;
            return { ...prev, guidedStep: nextGuided, maxGuidedStep: Math.max(prev.maxGuidedStep || 1, nextGuided) };
          }
        }
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
      } else if (prev.sharedStep === 1) {
        if (prev.setupMethod === 'guided') {
          if (prev.guidedTool === 'vercel' && prev.vercelStep === 13) {
            return { ...prev, vercelStep: 12, sharedStep: 0 };
          } else if (prev.guidedTool === 'replit' && prev.guidedStep === 11) {
            return { ...prev, guidedStep: 10, sharedStep: 0 };
          }
        } else if (prev.setupMethod === 'terminal' && prev.terminalStep === 14) {
          return { ...prev, terminalStep: 13, sharedStep: 0 };
        }
      }
      
      if (prev.setupMethod === 'guided') {
        if (prev.guidedTool === 'vercel' && prev.vercelStep > 1) {
          return { ...prev, vercelStep: prev.vercelStep - 1 };
        } else if (prev.guidedTool === 'replit' && prev.guidedStep > 1) {
          return { ...prev, guidedStep: prev.guidedStep - 1 };
        }
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
        if (prev.guidedTool === 'vercel') {
          return { ...prev, vercelStep: step, sharedStep: 0 };
        }
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
