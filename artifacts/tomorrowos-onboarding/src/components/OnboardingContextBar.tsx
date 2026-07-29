import React from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { onboardingPaths } from '@/lib/onboardingPaths';

export function OnboardingContextBar() {
  const [location] = useLocation();

  let pathwayName = '';
  if (location === onboardingPaths.newProject.replit || location === onboardingPaths.newProject.vercel || location === onboardingPaths.newProject.guidedChoose) pathwayName = 'Guided setup';
  else if (location === onboardingPaths.newProject.terminal) pathwayName = 'Terminal';
  else if (location === onboardingPaths.existingProject.serverSdk) pathwayName = 'Server SDK';
  else if (location === onboardingPaths.existingProject.api) pathwayName = 'API Integration';

  return (
    <div className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-[1050px] px-4 md:px-0 min-h-12 py-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0">
          <nav aria-label="Breadcrumb" className="flex text-sm text-muted-foreground items-center space-x-2 min-w-0">
            {pathwayName ? (
              <>
                <Link href="/start" className="hover:text-foreground transition-colors">Start building</Link>
                <ChevronRight className="w-4 h-4" />
                <span aria-current="page" className="font-medium text-foreground">{pathwayName}</span>
              </>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">Start building</span>
            )}
          </nav>
          
          {pathwayName && (
            <Link href="/start" className="text-xs text-muted-foreground hover:text-foreground border border-border px-2 py-0.5 rounded transition-colors ml-2 whitespace-nowrap">
              Change pathway
            </Link>
          )}
        </div>
        
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Exit setup
        </Link>
      </div>
    </div>
  );
}