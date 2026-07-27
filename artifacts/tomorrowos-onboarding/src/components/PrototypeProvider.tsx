import React, { createContext, useContext, useEffect, useState } from 'react';

export type SetupMethod = 'guided' | 'terminal';
export type ConnectionStatus = 'not_started' | 'connecting' | 'connected' | 'error';
export type ActionStatus = 'pending' | 'success' | 'error';

export interface PrototypeState {
  projectType: 'new' | 'existing';
  setupMethod: SetupMethod;
  guidedStep: number;
  terminalStep: number;
  sharedStep: number;
  supabaseStatus: ConnectionStatus;
  cloudinaryStatus: ConnectionStatus;
  previewGenerationStatus: ActionStatus;
  readinessStatus: ActionStatus;
  publishedStatus: ActionStatus;
  pairingStatus: ActionStatus;
}

const initialState: PrototypeState = {
  projectType: 'new',
  setupMethod: 'guided',
  guidedStep: 1,
  terminalStep: 1,
  sharedStep: 0,
  supabaseStatus: 'not_started',
  cloudinaryStatus: 'not_started',
  previewGenerationStatus: 'pending',
  readinessStatus: 'pending',
  publishedStatus: 'pending',
  pairingStatus: 'pending',
};

interface PrototypeContextType {
  state: PrototypeState;
  updateState: (updates: Partial<PrototypeState>) => void;
  resetState: () => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setStep: (step: number) => void;
}

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PrototypeState>(() => {
    try {
      const stored = localStorage.getItem('tomorrowos_prototype');
      if (stored) return { ...initialState, ...JSON.parse(stored) };
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
          return { ...prev, guidedStep: 11, sharedStep: 1 };
        }
        return { ...prev, guidedStep: prev.guidedStep + 1 };
      }
      if (prev.setupMethod === 'terminal' && prev.terminalStep <= 13) {
        if (prev.terminalStep === 13) {
          // move to shared
          return { ...prev, terminalStep: 14, sharedStep: 1 };
        }
        return { ...prev, terminalStep: prev.terminalStep + 1 };
      }
      // Shared step
      if (prev.sharedStep < 4) {
        return { ...prev, sharedStep: prev.sharedStep + 1 };
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

  const setStep = (step: number) => {
    setState(prev => {
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
