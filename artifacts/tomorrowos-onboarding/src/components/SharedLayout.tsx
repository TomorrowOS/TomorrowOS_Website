import React from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';

export function SharedLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { resetState } = usePrototype();

  const handleReset = () => {
    resetState();
    setLocation('/start');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
          <div 
            className="flex items-center gap-2 font-bold text-lg cursor-pointer"
            onClick={() => setLocation('/start')}
          >
            TomorrowOS
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm font-medium text-destructive px-3 py-1 bg-destructive/10 rounded-full">
              Prototype Review Mode
            </div>
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
