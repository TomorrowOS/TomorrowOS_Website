import React, { useState, useEffect } from 'react';
import { useGuideSeo } from '@/components/GuideSeo';
import { useLocation } from 'wouter';
import { usePrototype } from '@/components/PrototypeProvider';
import { Button } from '@/components/ui/button';
import { Menu, X, Check, ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { CONTENT_STEPS } from '@/lib/constants';
import { ContentJourney } from '@/components/ContentJourney';
import { NeedHelpDrawer } from '@/components/NeedHelpDrawer';

export default function ContentGuide() {
  useGuideSeo('/guides/content');
  const { state, updateState } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [introVisible, setIntroVisible] = useState(state.contentGuideStep === 1 && state.contentCompletedSteps.length === 0);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  // Handle deep-link hash routing (initial load + hash-only transitions).
  // Deep links are legitimate entry points from onboarding, so they resolve
  // the stepper to the target step and unlock progress up to it.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      if (hash === '#troubleshooting') {
        setIntroVisible(false);
        updateState({ contentGuideStep: 12, maxContentGuideStep: 12 });
        requestAnimationFrame(() => {
          const el = document.getElementById('troubleshooting');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            el.classList.add('ring-2', 'ring-gray-900', 'ring-offset-4', 'rounded-md');
            setTimeout(() => el.classList.remove('ring-2', 'ring-gray-900', 'ring-offset-4', 'rounded-md'), 2000);
          }
        });
        return;
      }
      const step = CONTENT_STEPS.find(s => s.hash && s.hash === hash);
      if (step) {
        setIntroVisible(false);
        updateState({
          contentGuideStep: step.id,
          maxContentGuideStep: Math.max(stateRef.current.maxContentGuideStep || 1, step.id),
        });
        requestAnimationFrame(() => window.scrollTo({ top: 0 }));
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartSetup = () => {
    setIntroVisible(false);
  };

  const handleBackToGuided = () => {
    setLocation('/start');
  };

  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 relative px-4 md:px-0">
      
      {/* COMPACT BREADCRUMB */}
      <div className="flex items-center justify-between py-4 mb-6 md:mb-8 border-b border-border">
         <div className="text-sm font-medium text-gray-500 flex items-center cursor-pointer hover:text-gray-900 transition-colors" onClick={handleBackToGuided}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guided Setup <span className="mx-2">›</span> Create and deploy
         </div>
         <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
         >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </Button>
      </div>

      {introVisible ? (
        <ContentIntro onStart={handleStartSetup} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative items-start">
           
           {/* SIDEBAR */}
           <aside className={`md:block w-full md:w-[240px] shrink-0 md:sticky md:top-24 z-40 bg-background md:bg-transparent ${mobileMenuOpen ? 'block absolute top-0 left-0 right-0 p-4 border rounded-xl shadow-lg mt-14' : 'hidden'}`}>
              <div className="md:hidden flex justify-between items-center mb-4">
                <h3 className="font-bold">Steps</h3>
              </div>
              <ContentNavigator />
           </aside>
           
           {/* CONTENT */}
           <div className="flex-1 w-full max-w-[760px] min-w-0 pb-32">
              <ContentJourney onViewAllSteps={() => setMobileMenuOpen(true)} />
           </div>
        </div>
      )}
      
      <NeedHelpDrawer context="content" />
    </div>
  );
}

function ContentIntro({ onStart }: { onStart: () => void }) {
  const [, setLocation] = useLocation();
  const { state } = usePrototype();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open the public CMS URL copied when you published your project.");
    }
  };
  
  return (
    <div className="max-w-[760px] mx-auto pb-32">
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">CONTENT AND PUBLISHING GUIDE</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Create and publish your first playlist</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Upload media, arrange it into a playlist and assign it to a connected screen using the TomorrowOS sample CMS.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">CMS</p>
            <p className="text-sm font-medium text-gray-900">TomorrowOS sample CMS</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Estimated time</p>
            <p className="text-sm font-medium text-gray-900">Approximately 2–5 minutes</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Recommended first test</p>
            <p className="text-sm font-medium text-gray-900">One image, one short video and one connected screen</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-8">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
          <p className="text-sm text-orange-800 font-medium">This guide demonstrates the interface included with the TomorrowOS sample CMS. A custom CMS built with TomorrowOS may organise media, playlists and publishing differently.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={onStart}>Start guide</Button>
          <Button variant="outline" size="lg" onClick={handleOpenCms}>Open my CMS</Button>
        </div>
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Before you begin</h2>
        
        <ul className="space-y-4 mb-8">
          {[
            "Published TomorrowOS sample CMS",
            "Supabase and Cloudinary configured",
            "At least one paired screen",
            "Screen shown as online or connected by the CMS",
            "One image or video file",
            "Approximately 2–5 minutes"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0">
                 <Check className="w-3.5 h-3.5 text-gray-400" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <div className="bg-gray-50 border p-4 rounded-lg text-sm text-gray-600 mb-8">
          <strong>Note:</strong> Keep your CMS and physical display visible during the final publishing step.
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleOpenCms}>Open my CMS</Button>
          <Button variant="outline" onClick={() => setLocation('/guides/cloudinary')}>View Cloudinary guide</Button>
          <Button variant="outline" onClick={() => setLocation('/compatibility/media')}>Check media compatibility</Button>
          <Button variant="outline" onClick={() => setLocation('/guides/platforms')}>View device setup guides</Button>
        </div>

      </div>
    </div>
  );
}

function ContentNavigator() {
  const { state, updateState } = usePrototype();
  
  const handleStepClick = (stepId: number) => {
    if (state.prototypeReviewMode || stepId <= state.maxContentGuideStep) {
      updateState({ contentGuideStep: stepId });
    }
  };

  return (
    <nav aria-label="Content Guide Steps">
      <ul className="space-y-1">
        {CONTENT_STEPS.map((step) => {
          const isCompleted = state.contentCompletedSteps.includes(step.id);
          const isActive = state.contentGuideStep === step.id;
          const isAvailable = state.prototypeReviewMode || step.id <= state.maxContentGuideStep;
          const isLocked = !isAvailable;

          // Add dividers for parts
          const isPart1First = step.id === 1;
          const isPart2First = step.id === 8;

          return (
            <React.Fragment key={step.id}>
              {isPart1First && <li className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mt-2 px-3">Part 1 — Create your playlist</li>}
              {isPart2First && <li className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mt-6 px-3">Part 2 — Publish to a screen</li>}
              <li>
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={isLocked}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200",
                    isActive ? "bg-gray-100/80" : "hover:bg-gray-50/50",
                    isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted && !isActive ? (
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </div>
                    ) : (
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold",
                        isLocked ? "border-gray-200 text-gray-400" : "border-gray-300 text-gray-500"
                      )}>
                        {step.id}
                      </div>
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium leading-tight",
                    isActive ? "text-gray-900" : isLocked ? "text-gray-400" : "text-gray-600"
                  )}>
                    {step.title}
                  </span>
                </button>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}