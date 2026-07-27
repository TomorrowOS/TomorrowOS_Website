import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { HelpCircle, X } from 'lucide-react';
import { SAMSUNG_STEPS } from '@/lib/constants';

export function NeedHelpDrawer() {
  const [open, setOpen] = useState(false);
  const { state, updateState } = usePrototype();

  if (!open) {
    return (
      <Button 
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full pl-3"
      >
        <HelpCircle className="w-5 h-5 mr-2" />
        Need help?
      </Button>
    );
  }

  const step = SAMSUNG_STEPS.find(s => s.id === state.samsungGuideStep);
  const title = step ? step.title : "Samsung Setup";

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 border-l border-border flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-bold text-lg flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-gray-400" />
          Need help?
        </h2>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">You are at</p>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">What should be visible</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
            {state.samsungGuideStep === 4 ? "The installation progress bar or the TomorrowOS launch screen." :
             state.samsungGuideStep === 7 ? "A pairing code shown by the TomorrowOS Runtime on the display." :
             "Refer to the step screenshot for the expected interface."}
          </p>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Common blockers</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {state.samsungGuideStep === 2 ? (
              <>
                <li>MagicINFO is currently active.</li>
                <li>The remote is not responding.</li>
              </>
            ) : state.samsungGuideStep === 4 ? (
              <>
                <li>URL entered incorrectly.</li>
                <li>Display has no internet connection.</li>
              </>
            ) : state.samsungGuideStep === 6 ? (
              <>
                <li>CMS URL does not start with https://.</li>
                <li>CMS is not currently published or available.</li>
              </>
            ) : (
              <li>No specific blockers recorded for this step.</li>
            )}
          </ul>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Screenshot reference</p>
          <p className="text-sm text-gray-700">
            ID: SAMSUNG-{String(state.samsungGuideStep).padStart(2, '0')}
          </p>
        </section>

      </div>
      
      <div className="p-4 border-t border-border flex justify-between bg-gray-50">
        <Button 
          variant="outline" 
          disabled={state.samsungGuideStep <= 1}
          onClick={() => updateState({ samsungGuideStep: state.samsungGuideStep - 1 })}
        >
          Previous step
        </Button>
        <Button 
          variant="outline" 
          disabled={state.samsungGuideStep >= 10 || (!state.prototypeReviewMode && state.samsungGuideStep + 1 > (state.maxSamsungGuideStep || 1))}
          onClick={() => updateState({ samsungGuideStep: state.samsungGuideStep + 1 })}
        >
          Next step
        </Button>
      </div>
    </div>
  );
}