import React from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

import { siteConfig } from '@/config/site';

export function WebsiteReviewBar() {
  const { state, updateState, resetState } = usePrototype();
  const [, setLocation] = useLocation();

  if (!state.prototypeReviewMode) return null;

  const handleReset = () => {
    resetState();
    setLocation('/start');
  };

  const hasCommunity = siteConfig.links.community && !siteConfig.links.community.includes('{{');
  const hasGovernance = siteConfig.links.governance && !siteConfig.links.governance.includes('{{');
  const hasLicense = siteConfig.links.license && !siteConfig.links.license.includes('{{');

  return (
    <div className="bg-amber-100 border-b border-amber-200 text-amber-900 px-4 py-2 text-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype simulation — These states are for internal review and are not connected to v0, Vercel, a database, media storage, your CMS or a physical device.</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
          >
            Reset prototype
          </button>
          <button 
            onClick={() => updateState({ prototypeReviewMode: false })}
            className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
          >
            Disable Review Mode
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-amber-950">Routes:</span>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookie-settings" className="hover:underline">Cookie Settings</Link>
          <Link href="/start" className="hover:underline">Onboarding</Link>
        </div>

        <div className="flex gap-2 items-center text-[10px]">
          <span className="font-semibold text-amber-950">Missing Setup:</span>
          {!hasCommunity && <span className="text-red-600 font-bold">Unresolved Community</span>}
          {!hasGovernance && <span className="text-red-600 font-bold">Unresolved Governance</span>}
          {!hasLicense && <span className="text-red-600 font-bold">Unresolved License</span>}
        </div>
      </div>
    </div>
  );
}
