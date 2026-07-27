import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

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
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Download players</h2>
        <p className="text-gray-600">From the bottom-left navigation of your CMS, select Download Players.</p>
      </div>

      <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — DOWNLOAD PLAYERS LOCATION IN CMS]" description="CMS Sidebar Highlight" className="mb-8" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {["Samsung", "BrightSign", "Android", "LG", "Windows"].map((platform) => (
          <Card key={platform}>
            <CardContent className="p-5">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-3 flex items-center justify-center font-bold text-xs text-gray-400">ICO</div>
              <h3 className="font-semibold text-gray-900">{platform}</h3>
              <p className="text-xs text-gray-500 mb-4 mt-1">Min version: {"{{VERSION}}"}</p>
              <Button variant="secondary" size="sm" className="w-full">View guide</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={goToNextStep}>I have downloaded a player</Button>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 2 — INSTALL TOMORROWOS
// ------------------------------------------
function SharedStep2() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Install TomorrowOS</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Installation checklist:</h3>
          <ul className="space-y-4">
            {[
              "Confirm supported OS",
              "Download player",
              "Install application",
              "Grant required permissions",
              "Launch TomorrowOS",
              "Wait for pairing code"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0"></div>
                {label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-4 mt-6">
        <Button variant="secondary">View installation guide</Button>
        <Button onClick={goToNextStep}>Player installed</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 3 — PAIR DEVICE
// ------------------------------------------
function SharedStep3() {
  const { state, updateState, goToNextStep } = usePrototype();
  const [code, setCode] = useState('');

  const isPaired = state.pairingStatus === 'success';

  const handlePair = () => {
    updateState({ pairingStatus: 'success' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pair your device</h2>
      </div>

      <div className="bg-gray-900 text-white p-12 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden mb-8">
        <div className="text-5xl md:text-7xl font-mono tracking-widest font-light">7G3K-2M9P</div>
        <div className="absolute bottom-4 right-4 text-gray-500 text-xs">Simulated Screen</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Open your CMS.</li>
            <li>Select Pair a device.</li>
            <li>Enter the pairing code.</li>
            <li>Select Connect.</li>
            <li>Wait for the device to appear online.</li>
          </ol>
        </div>

        <Card>
          <CardContent className="p-6">
            {!isPaired ? (
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">Enter pairing code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="XXXX-XXXX" 
                    className="flex-1 border border-input rounded-md px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                  />
                  <Button onClick={handlePair} disabled={code.length < 4}>Connect</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-3 py-4 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-success" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Screen connected</h3>
                  <p className="text-sm text-gray-500">Your first device is now online.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="pt-6 mt-6 border-t border-border flex justify-end">
        <Button onClick={goToNextStep} disabled={!isPaired}>Continue</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// SHARED STEP 4 — CREATE, SCHEDULE AND DEPLOY
// ------------------------------------------
function SharedStep4() {
  const { resetState } = usePrototype();
  const [, setLocation] = useLocation();

  const handleFinish = () => {
    resetState();
    setLocation('/start');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete your first deployment</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 relative">
        <div className="absolute inset-0 border-t-2 border-l-2 border-dashed border-gray-200 hidden md:block m-10 -z-10 rounded-tl-3xl"></div>
        
        <Card>
          <CardContent className="p-6 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Create content</h3>
              <p className="text-sm text-gray-500">Upload or create your media.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Create a playlist</h3>
              <p className="text-sm text-gray-500">Arrange content in playback order.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Create a schedule</h3>
              <p className="text-sm text-gray-500">Choose when the content should play.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Deploy</h3>
              <p className="text-sm text-gray-500">Assign the playlist to your screen.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center p-12 bg-success/5 border border-success/20 rounded-xl animate-in zoom-in duration-700 delay-300 fill-mode-both">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">You're live</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">Your TomorrowOS CMS is fully configured, your screen is connected, and your content is deploying.</p>
        <Button size="lg" onClick={handleFinish}>Finish Prototype Review</Button>
      </div>
    </div>
  );
}
