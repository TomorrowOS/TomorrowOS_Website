import React from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

export function SharedLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { state, updateState, resetState } = usePrototype();

  const handleReset = () => {
    resetState();
    setLocation('/start');
  };

  const toggleReviewMode = () => {
    updateState({ prototypeReviewMode: !state.prototypeReviewMode });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {state.prototypeReviewMode && (
        <div className="bg-amber-100 border-b border-amber-200 text-amber-900 px-4 py-2 text-sm flex items-center justify-center gap-2 text-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span><strong>Prototype simulation</strong> — These states are for internal review and are not connected to v0, Vercel, a database, media storage, your CMS or a physical device.</span>
        </div>
      )}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
          <div 
            className="flex items-center gap-2 font-bold text-lg cursor-pointer"
            onClick={() => setLocation('/start')}
          >
            TomorrowOS
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleReviewMode}
              className={`hidden md:flex items-center text-xs font-medium px-3 py-1 rounded-full transition-colors ${state.prototypeReviewMode ? 'text-destructive bg-destructive/10 hover:bg-destructive/20' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
            >
              {state.prototypeReviewMode ? 'Review Mode: ON' : 'Review Mode: OFF'}
            </button>
            <Button variant="secondary" size="sm" onClick={handleReset}>
              Reset prototype
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
