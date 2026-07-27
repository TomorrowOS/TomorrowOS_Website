import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { CheckCircle2 } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { useLocation } from 'wouter';
import { StepHeader } from './StepHeader';
import { StepFooter } from './StepFooter';

export function SharedJourney() {
  const { state } = usePrototype();

  switch (state.sharedStep) {
    case 1: return <SharedStep1 />;
    case 2: return <SharedStep2 />;
    case 3: return <SharedStep3 />;
    case 4: return <SharedStep4 />;
    default: return <SharedStep1 />;
  }
}

// ------------------------------------------
// SHARED STEP 1 — DOWNLOAD PLAYER
// ------------------------------------------
function SharedStep1() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open the public CMS URL copied after publishing your project.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Choose your screen platform" 
        description="Open Download Players inside your published CMS, then select the platform you want to install."
      />

      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mb-8">
        Player downloads and installation actions take place inside your CMS or on the physical display. This guide provides the instructions but does not install the player for you.
      </div>

      <div className="mb-8">
         <Button variant="outline" onClick={handleOpenCms}>Open your CMS</Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {/* SAMSUNG CARD */}
        <Card>
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-xs text-gray-400">SAM</div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Available</span>
            </div>
            <h3 className="font-semibold text-gray-900">Samsung</h3>
            <p className="text-xs font-medium text-gray-500 mt-1 mb-2">Tizen 6.5 and Tizen 7.0</p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">Install the TomorrowOS Runtime on a supported Samsung commercial signage display.</p>
            <Button variant="secondary" size="sm" className="w-full mb-3" onClick={() => setLocation('/guides/platforms/samsung-tizen')}>View Samsung setup guide</Button>
            <p className="text-xs text-gray-400 text-center">Installed directly on the display using the TomorrowOS installation URL.</p>
          </CardContent>
        </Card>

        {/* BRIGHTSIGN CARD */}
        <Card>
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-xs text-gray-400">BSN</div>
            </div>
            <h3 className="font-semibold text-gray-900">BrightSign</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow mt-3">TomorrowOS player support and installation instructions are being prepared.</p>
            <div className="text-center text-sm font-medium text-gray-500 py-1.5 bg-gray-50 rounded border border-gray-200 mt-auto">Guide being prepared</div>
          </CardContent>
        </Card>

        {/* ANDROID CARD */}
        <Card className="opacity-60 bg-gray-50">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center font-bold text-xs text-gray-400">AND</div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Coming soon</span>
            </div>
            <h3 className="font-semibold text-gray-900">Android</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow mt-3">TomorrowOS player support and installation instructions are being prepared.</p>
          </CardContent>
        </Card>

        {/* LG CARD */}
        <Card className="opacity-60 bg-gray-50">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center font-bold text-xs text-gray-400">LG</div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Coming soon</span>
            </div>
            <h3 className="font-semibold text-gray-900">LG</h3>
            <p className="text-xs font-medium text-gray-500 mt-1 mb-2">webOS</p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">TomorrowOS player support and installation instructions are being prepared.</p>
          </CardContent>
        </Card>

        {/* WINDOWS CARD */}
        <Card className="opacity-60 bg-gray-50">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center font-bold text-xs text-gray-400">WIN</div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Coming soon</span>
            </div>
            <h3 className="font-semibold text-gray-900">Windows</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow mt-3">TomorrowOS player support and installation instructions are being prepared.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="Continue" />
      </div>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 2 — INSTALL TOMORROWOS
// ------------------------------------------
function SharedStep2() {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Install TomorrowOS" 
        description="Follow the platform-specific instructions to install TomorrowOS on your device."
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Installation checklist:</h3>
          <ul className="space-y-4">
            {[
              "Confirm supported OS",
              "Download player",
              "Install application",
              "Grant required permissions",
              "Launch TomorrowOS",
              "Wait for pairing code to appear"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0"></div>
                {label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mb-8">
        <Button variant="outline">View installation guide</Button>
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="The player is installed and showing a pairing code" />
      </div>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 3 — PAIR DEVICE
// ------------------------------------------
function SharedStep3() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Please open your published CMS.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Pair your device in your CMS" 
        description="The pairing code appears on the screen running the TomorrowOS player. This guide does not connect the device directly. Enter the code inside your published CMS."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — PLAYER SHOWING CODE]" description="Your pairing code appears on the connected screen." className="h-40" />
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — CMS PAIR DEVICE PAGE]" description="Enter the pairing code inside your CMS." className="h-40" />
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 max-w-md">
          <li>Launch the TomorrowOS player.</li>
          <li>Write down the pairing code shown on screen.</li>
          <li>Open your CMS.</li>
          <li>Select Pair a device.</li>
          <li>Enter the code in the CMS.</li>
          <li>Select Connect.</li>
          <li>Confirm the device appears Online.</li>
        </ol>
      </div>
      
      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mb-8">
        <strong>Note:</strong> Marking this step complete only updates your onboarding progress. TomorrowOS does not currently verify the device connection from this guide.
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
         <Button variant="outline" onClick={handleOpenCms}>Open your CMS</Button>
         <Button variant="outline">Show me where to enter the code</Button>
         <Button variant="outline">View pairing troubleshooting</Button>
         <Button variant="outline" onClick={() => setLocation('/guides/content')}>Open content guide</Button>
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="I've paired my device" />
      </div>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 4 — CREATE, SCHEDULE AND DEPLOY
// ------------------------------------------
function SharedStep4() {
  const { resetState, state } = usePrototype();
  const [, setLocation] = useLocation();

  const handleFinish = () => {
    resetState();
    setLocation('/start');
  };

  const handleOpenGuide = () => {
    setLocation('/guides/content');
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Create and deploy" 
        description="These actions occur inside your CMS. Complete your first deployment to get your content on screen."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {/* CARD 1 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Create content</h3>
            <p className="text-sm text-gray-500 mb-4">Upload an image or video into the Assets area of your CMS.</p>
            <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/content#upload-media')}>View media upload guide</Button>
          </CardContent>
        </Card>

        {/* CARD 2 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Create a playlist</h3>
            <p className="text-sm text-gray-500 mb-4">Arrange your uploaded media in playback order.</p>
            <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/content#create-playlist')}>Create your first playlist</Button>
          </CardContent>
        </Card>

        {/* CARD 3 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Add a schedule</h3>
            <p className="text-sm text-gray-500 mb-4">Choose when the playlist should be available to play.</p>
            <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/content#schedule')}>View scheduling guide</Button>
          </CardContent>
        </Card>

        {/* CARD 4 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Publish to your screen</h3>
            <p className="text-sm text-gray-500 mb-4">Assign the saved playlist to your paired device and confirm playback.</p>
            <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/content#publish-to-screen')}>View publishing guide</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
         <Button onClick={handleOpenGuide}>Open complete content guide</Button>
      </div>

      <div className="text-center p-12 bg-gray-50 border border-border rounded-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Finish your onboarding</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">Once you have deployed your first content inside your CMS and can see it on your screen, confirm below. This only updates your onboarding progress — TomorrowOS does not verify your deployment.</p>
        <Button size="lg" onClick={handleFinish} className="bg-black text-white hover:bg-gray-800">My first content is live</Button>
      </div>
      
      <div className="mt-auto hidden" />
    </div>
  );
}
