import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { CopyActionBlock } from './CopyActionBlock';
import { StepHeader } from './StepHeader';
import { useLocation } from 'wouter';
import { ChevronRight, ChevronDown, CheckCircle2, Copy } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { PlaceholderText } from './PlaceholderText';

export function SamsungTizenJourney({ onViewAllSteps }: { onViewAllSteps?: () => void }) {
  const { state } = usePrototype();

  const mobileHeader = (
    <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b">
      <span className="text-sm font-medium text-gray-500">Step {state.samsungGuideStep} of 10</span>
      <Button variant="outline" size="sm" onClick={onViewAllSteps} aria-label="View all steps">View all steps</Button>
    </div>
  );

  return (
    <>
      {mobileHeader}
      {renderStep(state.samsungGuideStep)}
    </>
  );
}

function renderStep(step: number) {
  switch (step) {
    case 1: return <SamsungStep1 />;
    case 2: return <SamsungStep2 />;
    case 3: return <SamsungStep3 />;
    case 4: return <SamsungStep4 />;
    case 5: return <SamsungStep5 />;
    case 6: return <SamsungStep6 />;
    case 7: return <SamsungStep7 />;
    case 8: return <SamsungStep8 />;
    case 9: return <SamsungStep9 />;
    case 10: return <SamsungStep10 />;
    default: return <SamsungStep1 />;
  }
}

function SamsungGuideFooter({ label = "I completed this step" }: { label?: string }) {
  const { state, updateState } = usePrototype();
  
  const handleComplete = () => {
    const nextStep = state.samsungGuideStep + 1;
    const completed = new Set(state.samsungCompletedSteps);
    completed.add(state.samsungGuideStep);
    
    updateState({
      samsungCompletedSteps: Array.from(completed),
      samsungGuideStep: nextStep <= 10 ? nextStep : state.samsungGuideStep,
      maxSamsungGuideStep: Math.max(state.maxSamsungGuideStep || 1, nextStep <= 10 ? nextStep : 10)
    });
  };

  const handleBack = () => {
    if (state.samsungGuideStep > 1) {
      updateState({ samsungGuideStep: state.samsungGuideStep - 1 });
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
      {state.samsungGuideStep > 1 ? (
        <Button variant="ghost" onClick={handleBack}>Back</Button>
      ) : (
        <div />
      )}
      <Button onClick={handleComplete}>{label}</Button>
    </div>
  );
}

function TroubleshootingAccordion({ title, children }: { title: string, children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg bg-white overflow-hidden mt-6">
      <button 
        className="w-full flex items-center justify-between p-4 text-left font-medium text-sm hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="p-4 pt-0 border-t text-sm text-gray-600 bg-gray-50/50">
          {children}
        </div>
      )}
    </div>
  );
}

function SamsungStep1() {
  const { state } = usePrototype();
  const [selected, setSelected] = useState<'new' | 'existing' | null>(null);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" title="Choose your starting point" />

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card 
          className={cn("cursor-pointer transition-all", selected === 'new' ? "ring-2 ring-black" : "hover:border-gray-400")}
          onClick={() => setSelected('new')}
        >
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-2">New or factory-reset display</h3>
            <p className="text-sm text-gray-600 mb-4">Complete Samsung's first-time display setup before installing TomorrowOS.</p>
            
            {selected === 'new' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-700">
                  <li>Select the language.</li>
                  <li>Connect the display to the internet.</li>
                  <li>Select the physical screen orientation.</li>
                  <li>Confirm the local date and time.</li>
                  <li>Complete the remaining Samsung setup prompts.</li>
                  <li>Continue to Set Play via to Custom App.</li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>

        <Card 
          className={cn("cursor-pointer transition-all", selected === 'existing' ? "ring-2 ring-black" : "hover:border-gray-400")}
          onClick={() => setSelected('existing')}
        >
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Display already configured</h3>
            <p className="text-sm text-gray-600">Continue directly to setting Play via to Custom App.</p>
          </CardContent>
        </Card>
      </div>

      <ScreenshotPlaceholder 
        id="SAMSUNG-01" 
        description="Samsung display first-time setup. Highlight: Language, network and orientation setup" 
        caption="Complete Samsung's initial display setup before installing TomorrowOS."
        className="mb-6 h-64"
      />

      <p className="text-xs text-gray-500 italic mb-4">
        Completing this step in the guide does not verify the Samsung display or CMS. Confirm the result on the display before continuing.
      </p>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep2() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Set Play via to Custom App" 
        description="TomorrowOS must be selected as the application the display launches."
      />

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Using the Samsung remote:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>Open Menu.</li>
          <li>Select System.</li>
          <li>Select Play via.</li>
          <li>Select Custom App.</li>
        </ol>
      </div>

      <ScreenshotPlaceholder 
        id="SAMSUNG-02" 
        description="Samsung system menu. Highlight: System → Play via → Custom App" 
        caption="Set Play via to Custom App."
        className="mb-8 h-64"
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-sm text-gray-900 mb-1">Custom App is already selected</h4>
            <p className="text-xs text-gray-600">Continue to the next step.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-sm text-gray-900 mb-1">Custom App is not available</h4>
            <p className="text-xs text-gray-600 mb-3">The display may currently be configured to launch MagicINFO.</p>
            <Button variant="outline" size="sm" onClick={() => setLocation('/guides/platforms/samsung-tizen/magicinfo')}>View MagicINFO switching steps</Button>
          </CardContent>
        </Card>
      </div>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep3() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" title="Open Custom App" />

      <div className="mb-6">
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-4">
          <li>Press Home on the Samsung remote.</li>
          <li>Select Custom App.</li>
        </ol>
        <div className="bg-gray-50 border p-3 text-sm text-gray-600 rounded">
          <strong>Note:</strong> Depending on the model and firmware, this option may appear inside App Management.
        </div>
      </div>

      <ScreenshotPlaceholder 
        id="SAMSUNG-03" 
        description="Samsung Home menu. Highlight: Custom App or App Management" 
        caption="Open Custom App from the Samsung Home menu."
        className="mb-6 h-64"
      />

      <TroubleshootingAccordion title="I cannot see Custom App">
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Confirm Play via is set to Custom App.</li>
          <li>Restart the display after changing the setting.</li>
          <li>Confirm the panel is a supported commercial signage model.</li>
        </ul>
        <Button variant="outline" size="sm" onClick={() => setLocation('/guides/platforms/samsung-tizen/magicinfo')}>View MagicINFO switching steps</Button>
      </TroubleshootingAccordion>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep4() {
  const { state } = usePrototype();
  const url = "https://tmr.sh/tizen";

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Install the TomorrowOS Runtime" 
        description="Inside Custom App or App Management, select Install Custom App."
      />
      <p className="text-sm text-gray-500 mb-6">Some supported firmware may label this option Install Web App.</p>

      <CopyActionBlock
        type="url"
        label="INSTALLATION URL"
        value={url}
        copiedMessage="Copied — enter on your Samsung display"
        destinationHint="Enter this URL exactly in the Samsung Install Custom App field."
        sourceKey="samsung.step4.installUrl"
        className="mb-8"
      />

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Select Install Custom App or Install Web App.</li>
        <li>Enter <code>https://tmr.sh/tizen</code> exactly.</li>
        <li>Confirm the installation.</li>
        <li>Wait for the Runtime to finish downloading.</li>
      </ol>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-sm text-orange-800 mb-8">
        <strong>Important:</strong>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Enter the full address.</li>
          <li>Do not add spaces.</li>
          <li>Do not turn off or restart the display during installation.</li>
        </ul>
      </div>

      <p className="text-sm text-gray-600 mb-8"><strong>Expected result:</strong> The display downloads the TomorrowOS Runtime and launches it when installation is complete.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="SAMSUNG-04A" description="Samsung Custom App. Highlight: Install Custom App or Install Web App" caption="Select the installation option shown by your firmware." className="h-48" />
        <ScreenshotPlaceholder id="SAMSUNG-04B" description="Samsung installation URL field. Highlight: The full https://tmr.sh/tizen URL" caption="Enter the TomorrowOS installation URL exactly." className="h-48" />
      </div>
      <ScreenshotPlaceholder id="SAMSUNG-04C" description="Samsung display. Highlight: Installation progress or TomorrowOS launch" caption="Wait for installation to complete before continuing." className="mb-6 h-48" />

      <TroubleshootingAccordion title="The installation URL does not load">
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Confirm the display is connected to the internet.</li>
          <li>Re-enter <code>https://tmr.sh/tizen</code> exactly.</li>
          <li>Confirm the display date and time are correct.</li>
          <li>Restart the display and try again.</li>
        </ul>
        <CopyActionBlock
          type="url"
          label="INSTALLATION URL"
          value={url}
          copyButtonLabel="Copy installation URL"
          copiedMessage="Copied — enter on your Samsung display"
          sourceKey="samsung.step4.troubleshootingInstallUrl"
        />
      </TroubleshootingAccordion>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep5() {
  const { state } = usePrototype();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Select the screen orientation" 
        description="When the TomorrowOS Runtime opens, select the option matching the physical installation of the display."
      />

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500">Landscape</div>
        <div className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500">Portrait clockwise</div>
        <div className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500">Portrait counter-clockwise</div>
      </div>

      <ScreenshotPlaceholder 
        id="SAMSUNG-05" 
        description="TomorrowOS Runtime. Highlight: Orientation selection" 
        caption="Choose the orientation matching the physical display installation."
        className="mb-6 h-64"
      />

      <p className="text-sm text-gray-600 mb-6">This setting can be changed later through the approved TomorrowOS Runtime setup process.</p>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep6() {
  const { state } = usePrototype();
  const [expandCMS, setExpandCMS] = useState(false);

  const hasSavedUrl = state.cmsUrl && isValidHttpsUrl(state.cmsUrl);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Connect the Runtime to your CMS" 
        description="The TomorrowOS Runtime will ask for the public address of your CMS."
      />

      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-1">Example:</p>
        <code className="px-2 py-1 bg-gray-100 rounded border font-mono text-sm text-green-700">https://my-signage-cms.replit.app</code>
      </div>

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-8">
        <li>Find the public HTTPS CMS URL copied when you published your CMS.</li>
        <li>Enter the complete URL on the Samsung display.</li>
        <li>Confirm and continue.</li>
      </ol>

      {hasSavedUrl && (
        <CopyActionBlock
          type="url"
          label="SAVED CMS URL"
          value={state.cmsUrl || ''}
          copyButtonLabel="Copy saved CMS URL"
          copiedMessage="Copied — enter on your Samsung display"
          destinationHint="Enter this URL manually in the TomorrowOS Runtime CMS field."
          sourceKey="samsung.step6.savedCmsUrl"
          className="mb-8"
        />
      )}

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800 mb-8">
        This guide does not send the CMS URL to your Samsung display. Enter it manually using the Samsung remote.
      </div>

      <ScreenshotPlaceholder 
        id="SAMSUNG-06" 
        description="TomorrowOS Runtime. Highlight: CMS URL field" 
        caption="Enter the public HTTPS address of your CMS."
        className="mb-6 h-64"
      />

      <div className="border rounded-lg bg-white overflow-hidden mt-6 mb-6">
        <button 
          className="w-full flex items-center justify-between p-4 text-left font-medium text-sm hover:bg-gray-50"
          onClick={() => setExpandCMS(!expandCMS)}
        >
          Where do I find my CMS URL?
          {expandCMS ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        </button>
        {expandCMS && (
          <div className="p-4 pt-0 border-t text-sm text-gray-600 bg-gray-50/50">
            <p className="mb-2">Use the public HTTPS URL created when you published your CMS.</p>
            <ul className="list-disc pl-4 space-y-1 mb-4">
              <li>Published Replit CMS URL</li>
              <li>Connected custom domain</li>
              <li>Public URL from another supported host</li>
            </ul>
            <p className="font-semibold text-gray-900 mb-1">Do not use:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Replit editor URL</li>
              <li>Replit Preview URL</li>
              <li>Supabase URL</li>
              <li>Cloudinary URL</li>
              <li>CMS settings page</li>
              <li>Localhost address</li>
            </ul>
          </div>
        )}
      </div>

      <TroubleshootingAccordion title="The CMS URL is rejected">
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Use the public published CMS address.</li>
          <li>Confirm it begins with <code>https://</code>.</li>
          <li>Do not use the Replit editor or Preview address.</li>
          <li>Open the CMS URL on another device to confirm it loads.</li>
          <li>Do not use a Supabase or Cloudinary address.</li>
        </ul>
        <Button variant="outline" size="sm" onClick={() => setExpandCMS(true)}>Where do I find my CMS URL?</Button>
      </TroubleshootingAccordion>

      <SamsungGuideFooter />
    </div>
  );
}

function SamsungStep7() {
  const { state } = usePrototype();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Wait for the pairing code" 
        description="After the CMS URL is accepted, a pairing code will appear on the Samsung display."
      />

      <p className="text-sm text-gray-600 mb-8">Leave this screen open while you complete the next step.</p>

      <ScreenshotPlaceholder 
        id="SAMSUNG-07" 
        description="TomorrowOS Runtime on Samsung display. Highlight: Pairing code. Must clearly say: Example only." 
        caption="Your pairing code appears on the physical display."
        className="mb-8 h-64"
      />

      <TroubleshootingAccordion title="No pairing code appears">
        <ul className="list-disc pl-4 space-y-2">
          <li>Confirm the CMS URL is correct.</li>
          <li>Confirm the published CMS is currently available.</li>
          <li>Restart the TomorrowOS Runtime.</li>
          <li>Check the display for an error message.</li>
          <li className="mt-4"><PlaceholderText value="{{CONFIRM_APPROVED_RUNTIME_RESET_PROCESS}}" fallback="Restart your display to clear the previous configuration." className="text-xs font-mono" /></li>
        </ul>
      </TroubleshootingAccordion>

      <SamsungGuideFooter label="I can see a pairing code on the display" />
    </div>
  );
}

function SamsungStep8() {
  const { state } = usePrototype();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Please open the public HTTPS URL created when you published your CMS.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Pair the screen in your CMS" 
        description="This action takes place inside your published CMS, not on the TomorrowOS guide."
      />

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-8">
        <li>Open your published CMS.</li>
        <li>Select Pair a device.</li>
        <li>Enter the pairing code shown on the Samsung display.</li>
        <li>Select Connect.</li>
        <li>Wait for the screen to appear in the device list.</li>
      </ol>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
         <Button onClick={handleOpenCms}>Open my CMS</Button>
         <Button variant="outline">Show me where to enter the code</Button>
         <Button variant="outline">View pairing troubleshooting</Button>
      </div>

      <p className="text-sm text-gray-600 mb-6"><strong>Expected result:</strong> The screen appears in your CMS as connected or online, and the Runtime leaves the pairing screen.</p>

      <ScreenshotPlaceholder 
        id="SAMSUNG-08" 
        description="Generated TomorrowOS CMS. Highlight: Pair a device field and Connect action." 
        caption="Enter the pairing code inside your CMS—not on this guide."
        className="mb-8 h-64"
      />

      <p className="text-xs text-gray-500 italic mb-6">
        TomorrowOS.org does not enter or verify the pairing code. Pairing is completed inside your owned and operated CMS.
      </p>

      <TroubleshootingAccordion title="The CMS does not accept the code">
        <ul className="list-disc pl-4 space-y-2">
          <li>Enter the code exactly as shown.</li>
          <li>Confirm you are using the same CMS URL entered on the display.</li>
          <li>Confirm the pairing code has not expired.</li>
          <li>Return to the player and check whether a new code is displayed.</li>
        </ul>
      </TroubleshootingAccordion>

      <SamsungGuideFooter label="I confirmed the screen appears in my CMS" />
    </div>
  );
}

function SamsungStep9() {
  const { state } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" title="Confirm the installation" />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
            {[
              "The display appears online in the CMS.",
              "The pairing screen has closed.",
              "The expected starter, splash or assigned content appears.",
              "No blocking installation or connection error is visible."
            ].map((label, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded group-hover:border-gray-400">
                   <input type="checkbox" className="peer absolute opacity-0" checked={checkedItems.has(i)} onChange={() => toggleCheck(i)} />
                   <CheckCircle2 className={cn("w-4 h-4 text-black", checkedItems.has(i) ? "opacity-100" : "opacity-0")} />
                </div>
                <span className="text-sm text-gray-700 select-none">{label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Complete a restart test</h3>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Restart the Samsung display using the remote or approved physical restart method.</li>
        <li>Wait for the display to start.</li>
        <li>Confirm the TomorrowOS Runtime launches again.</li>
        <li>Confirm the screen reconnects to the CMS.</li>
        <li>Confirm the expected content or splash screen resumes.</li>
      </ol>

      <div className="bg-gray-50 border p-4 rounded-lg text-sm text-gray-600 mb-8">
        <strong>Alternative:</strong> Use the Reboot action on the device card inside your CMS. 
        <br/><span className="text-xs">(Only use this if your generated CMS genuinely contains a working reboot command)</span>
      </div>

      <p className="text-sm font-medium text-gray-900 mb-6">A successful restart test is required before considering installation complete.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="SAMSUNG-09A" description="Generated CMS. Highlight: Samsung device shown online" caption="Confirm the display appears online in your CMS." className="h-48" />
        <ScreenshotPlaceholder id="SAMSUNG-09B" description="Samsung display. Highlight: TomorrowOS Runtime after restart" caption="Confirm the Runtime launches again after restarting the display." className="h-48" />
      </div>

      <p className="text-xs text-gray-500 italic mb-6">
        This confirmation updates your onboarding progress only. TomorrowOS.org does not independently verify the restart.
      </p>

      <SamsungGuideFooter label="I confirmed the screen restarts and reconnects" />
    </div>
  );
}

function SamsungStep10() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Please open the public HTTPS URL created when you published your CMS.");
    }
  };

  const isCompleted = state.samsungCompletedSteps.includes(10);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.samsungGuideStep} totalSteps={10} eyebrow="SAMSUNG PLATFORM GUIDE" 
        title="Create and deploy content" 
        description="Complete these actions inside your CMS."
      />

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-8">
        <li>Create a playlist.</li>
        <li>Upload or create content.</li>
        <li>Adjust the schedule.</li>
        <li>Save the changes.</li>
        <li>Assign the playlist to the Samsung display.</li>
        <li>Confirm the content appears on the screen.</li>
      </ol>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
         <Button onClick={handleOpenCms}>Open my CMS</Button>
         <Button variant="outline" onClick={() => setLocation('/guides/content#publish-to-screen')}>View content deployment guide</Button>
      </div>

      <TroubleshootingAccordion title="The screen pairs but shows no content">
        <p className="mb-4">Pairing and content assignment are separate steps.</p>
        <p className="font-semibold text-gray-900 mb-2">Checks:</p>
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Confirm the screen appears online in the CMS.</li>
          <li>Confirm a playlist or content item is assigned.</li>
          <li>Confirm the schedule is active now.</li>
          <li>Confirm the content format is supported by the display.</li>
          <li>Confirm the CMS changes were saved.</li>
        </ul>
        <Button variant="outline" size="sm" onClick={() => setLocation('/guides/content#publish-to-screen')}>View content deployment guide</Button>
      </TroubleshootingAccordion>

      {isCompleted ? (
        <div className="mt-12 p-8 bg-green-50 border border-green-200 rounded-xl text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Samsung setup complete</h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">You confirmed that the TomorrowOS Runtime is installed, paired and playing content on your Samsung display.</p>
          <p className="text-xs text-gray-500 italic mb-8 max-w-md mx-auto">This status is based on your confirmation and is not independently verified by TomorrowOS.org.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3">
             <Button onClick={() => setLocation('/start')}>Return to Guided Setup</Button>
             <Button variant="outline">Add another screen</Button>
             <Button variant="ghost">View Samsung troubleshooting</Button>
          </div>
        </div>
      ) : (
        <SamsungGuideFooter label="My first content is playing" />
      )}
    </div>
  );
}
