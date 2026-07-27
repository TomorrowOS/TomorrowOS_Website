import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { HelpCircle, X } from 'lucide-react';
import { SAMSUNG_STEPS, CONTENT_STEPS, TERMINAL_STEPS } from '@/lib/constants';

export function NeedHelpDrawer({ context = 'samsung' }: { context?: 'samsung' | 'content' | 'terminal' }) {
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

  const isContent = context === 'content';
  const isTerminal = context === 'terminal';
  
  const steps = isTerminal ? TERMINAL_STEPS : (isContent ? CONTENT_STEPS : SAMSUNG_STEPS);
  const currentStepNum = isTerminal ? state.terminalStep : (isContent ? state.contentGuideStep : state.samsungGuideStep);
  const maxStepNum = isTerminal ? state.maxTerminalStep : (isContent ? state.maxContentGuideStep : state.maxSamsungGuideStep);
  
  const step = steps.find(s => s.id === currentStepNum);
  const title = step ? step.title : (isTerminal ? "Terminal Setup" : (isContent ? "Content Guide" : "Samsung Setup"));

  const getVisibleContent = () => {
    if (isTerminal) {
      if (currentStepNum === 2) return "The TomorrowOS CLI starting in your terminal.";
      if (currentStepNum === 6) return "Your code editor showing the newly created environment file.";
      if (currentStepNum === 8) return "The local CMS running at http://localhost:3000.";
      if (currentStepNum === 12) return "Your deployment host's log output.";
      return "Refer to the step instructions for the expected terminal or browser interface.";
    } else if (isContent) {
      if (currentStepNum === 3) return "The browser file selector or the asset appearing in the CMS Assets area after a successful upload.";
      if (currentStepNum === 11) return "The physical screen showing the newly assigned playlist content.";
      return "Refer to the step screenshot for the expected interface.";
    } else {
      if (currentStepNum === 4) return "The installation progress bar or the TomorrowOS launch screen.";
      if (currentStepNum === 7) return "A pairing code shown by the TomorrowOS Runtime on the display.";
      return "Refer to the step screenshot for the expected interface.";
    }
  };

  const getBlockersContent = () => {
    if (isTerminal) {
      if (currentStepNum === 2) return (
        <>
          <li>Node.js unavailable</li>
          <li>Command not recognised</li>
          <li>Package registry unavailable</li>
          <li>Directory permission issue</li>
        </>
      );
      if (currentStepNum === 6) return (
        <>
          <li>Wrong environment filename</li>
          <li>Variable name misspelled</li>
          <li>Secret committed to Git</li>
          <li>Browser and server variables confused</li>
        </>
      );
      if (currentStepNum === 8) return (
        <>
          <li>Port already in use</li>
          <li>Missing environment variable</li>
          <li>Database unavailable</li>
          <li>Build error</li>
          <li>Unsupported Node.js version</li>
        </>
      );
      if (currentStepNum === 12) return (
        <>
          <li>Host lacks required runtime</li>
          <li>Production variables missing</li>
          <li>Build command incorrect</li>
          <li>Start command incorrect</li>
          <li>HTTPS URL not available</li>
        </>
      );
      return <li>No specific blockers recorded for this step.</li>;
    } else if (isContent) {
      if (currentStepNum === 3) return (
        <>
          <li>Media format is unsupported.</li>
          <li>File size exceeds Cloudinary plan limits.</li>
          <li>Cloudinary secrets are missing in the CMS.</li>
        </>
      );
      if (currentStepNum === 6) return (
        <>
          <li>Multiple scheduled playlists overlapping.</li>
          <li>CMS timezone configuration differs from the screen timezone.</li>
        </>
      );
      if (currentStepNum === 11) return (
        <>
          <li>The physical screen is currently offline.</li>
          <li>The screen is still downloading large media files.</li>
        </>
      );
      return <li>No specific blockers recorded for this step.</li>;
    } else {
      if (currentStepNum === 2) return (
        <>
          <li>MagicINFO is currently active.</li>
          <li>The remote is not responding.</li>
        </>
      );
      if (currentStepNum === 4) return (
        <>
          <li>URL entered incorrectly.</li>
          <li>Display has no internet connection.</li>
        </>
      );
      if (currentStepNum === 6) return (
        <>
          <li>CMS URL does not start with https://.</li>
          <li>CMS is not currently published or available.</li>
        </>
      );
      return <li>No specific blockers recorded for this step.</li>;
    }
  };

  const getScreenshotId = () => {
    if (isTerminal) {
      return `TERMINAL-${String(currentStepNum).padStart(2, '0')}`;
    }
    if (isContent) {
      return `CONTENT-${String(currentStepNum).padStart(2, '0')}`;
    }
    return `SAMSUNG-${String(currentStepNum).padStart(2, '0')}`;
  };

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
            {getVisibleContent()}
          </p>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Common blockers</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {getBlockersContent()}
          </ul>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Screenshot reference</p>
          <p className="text-sm text-gray-700">
            ID: {getScreenshotId()}
          </p>
        </section>

      </div>
      
      <div className="p-4 border-t border-border flex justify-between bg-gray-50">
        <Button 
          variant="outline" 
          disabled={currentStepNum <= 1}
          onClick={() => {
            if (isTerminal) updateState({ terminalStep: currentStepNum - 1 });
            else if (isContent) updateState({ contentGuideStep: currentStepNum - 1 });
            else updateState({ samsungGuideStep: currentStepNum - 1 });
          }}
        >
          Previous step
        </Button>
        <Button 
          variant="outline" 
          disabled={currentStepNum >= steps.length || (!state.prototypeReviewMode && currentStepNum + 1 > (maxStepNum || 1))}
          onClick={() => {
            if (isTerminal) updateState({ terminalStep: currentStepNum + 1 });
            else if (isContent) updateState({ contentGuideStep: currentStepNum + 1 });
            else updateState({ samsungGuideStep: currentStepNum + 1 });
          }}
        >
          Next step
        </Button>
      </div>
    </div>
  );
}