import React from 'react';
import { usePrototype } from './PrototypeProvider';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export function WebsiteReviewBar() {
  const { state, updateState } = usePrototype();

  if (!state.prototypeReviewMode) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-200 text-amber-900 px-4 py-2 text-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype Review Mode is ACTIVE</span>
        </div>
        <button 
          onClick={() => updateState({ prototypeReviewMode: false })}
          className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
        >
          Disable
        </button>
      </div>
      
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-amber-950">Routes:</span>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/quickstart" className="hover:underline">Quickstart</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookie-settings" className="hover:underline">Cookie Settings</Link>
          <Link href="/start" className="hover:underline">Onboarding</Link>
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-amber-950">Checks:</span>
          <span>Legal placeholders visible</span>
          <span>Missing links visible</span>
          <span>Consent state visible</span>
        </div>
      </div>
    </div>
  );
}
