import React, { useState } from 'react';
import { useGuideSeo } from '@/components/GuideSeo';
import { useLocation, useRoute } from 'wouter';
import { usePrototype } from '@/components/PrototypeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Menu, X, Check, ChevronRight, HelpCircle, MonitorPlay, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SAMSUNG_STEPS } from '@/lib/constants';
import { SamsungTizenJourney } from '@/components/SamsungTizenJourney';
import { MagicInfoGuide } from '@/components/MagicInfoGuide';
import { NeedHelpDrawer } from '@/components/NeedHelpDrawer';

export default function SamsungTizenGuide() {
  useGuideSeo('/guides/platforms/samsung-tizen');
  const { state, updateState } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [matchMagicInfo] = useRoute('/guides/platforms/samsung-tizen/magicinfo');

  const [introVisible, setIntroVisible] = useState(state.samsungGuideStep === 1 && state.samsungCompletedSteps.length === 0);

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
            Back to Guided Setup <span className="mx-2">›</span> Download players
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

      {matchMagicInfo ? (
        <MagicInfoGuide />
      ) : introVisible ? (
        <SamsungIntro onStart={handleStartSetup} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative items-start">
           
           {/* SIDEBAR */}
           <aside className={`md:block w-full md:w-[240px] shrink-0 md:sticky md:top-24 z-40 bg-background md:bg-transparent ${mobileMenuOpen ? 'block absolute top-0 left-0 right-0 p-4 border rounded-xl shadow-lg mt-14' : 'hidden'}`}>
              <div className="md:hidden flex justify-between items-center mb-4">
                <h3 className="font-bold">Steps</h3>
              </div>
              <SamsungNavigator />
           </aside>
           
           {/* CONTENT */}
           <div className="flex-1 w-full max-w-[760px] min-w-0 pb-32">
              <SamsungTizenJourney onViewAllSteps={() => setMobileMenuOpen(true)} />
           </div>
        </div>
      )}
      
      <NeedHelpDrawer />
    </div>
  );
}

function SamsungIntro({ onStart }: { onStart: () => void }) {
  const [, setLocation] = useLocation();
  const [expandCMS, setExpandCMS] = useState(false);
  const { state } = usePrototype();
  
  return (
    <div className="max-w-[760px] mx-auto pb-32">
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">SAMSUNG PLATFORM GUIDE</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Install TomorrowOS on Samsung Tizen</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Install the TomorrowOS Runtime on a supported Samsung commercial signage display running Tizen 6.5 or Tizen 7.0.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Supported platform</p>
            <p className="text-sm font-medium text-gray-900">Samsung commercial signage</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Supported operating systems</p>
            <p className="text-sm font-medium text-gray-900">Tizen 6.5 and Tizen 7.0</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Estimated time</p>
            <p className="text-sm font-medium text-gray-900">Approximately 10 minutes</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-8">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
          <p className="text-sm text-orange-800 font-medium">This guide does not apply to Samsung consumer televisions.</p>
        </div>

        <div className="flex gap-4">
          <Button size="lg" onClick={onStart}>Start setup</Button>
          <Button variant="outline" size="lg" onClick={() => setLocation('/compatibility')}>Check Samsung compatibility</Button>
        </div>
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Before you begin</h2>
        
        <ul className="space-y-4 mb-8">
          {[
            "Supported Samsung commercial signage display",
            "Samsung remote",
            "Active internet connection",
            "Public HTTPS URL for your published CMS",
            "Access to your CMS from a computer or mobile device",
            "Approximately 10 minutes"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0">
                 <Check className="w-3.5 h-3.5 text-gray-400" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <div className="border rounded-lg bg-white overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50"
            onClick={() => setExpandCMS(!expandCMS)}
          >
            Where do I find my CMS URL?
            <ChevronRight className={cn("w-5 h-5 text-gray-400 transition-transform", expandCMS && "rotate-90")} />
          </button>
          {expandCMS && (
            <div className="p-4 pt-0 border-t text-sm text-gray-600 space-y-4">
              <p>Use the public HTTPS URL created when you published your CMS.</p>
              
              <div>
                <p className="font-semibold text-gray-900 mb-1">Correct example:</p>
                <code className="px-2 py-1 bg-gray-100 rounded border font-mono text-sm text-green-700">https://my-signage-cms.com</code>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-1">Do not use:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>An internal editor URL</li>
                  <li>A temporary preview URL</li>
                  <li>A Supabase URL</li>
                  <li>A Cloudinary URL</li>
                  <li>A CMS settings or admin subpage</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function SamsungNavigator() {
  const { state, updateState } = usePrototype();
  
  const handleStepClick = (stepId: number) => {
    if (state.prototypeReviewMode || stepId <= state.maxSamsungGuideStep) {
      updateState({ samsungGuideStep: stepId });
    }
  };

  return (
    <nav aria-label="Samsung Guide Steps">
      <ul className="space-y-1">
        {SAMSUNG_STEPS.map((step) => {
          const isCompleted = state.samsungCompletedSteps.includes(step.id);
          const isActive = state.samsungGuideStep === step.id;
          const isAvailable = state.prototypeReviewMode || step.id <= state.maxSamsungGuideStep;
          const isLocked = !isAvailable;

          return (
            <li key={step.id}>
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
          );
        })}
      </ul>
    </nav>
  );
}