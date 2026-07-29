import React from 'react';
import { useLocation } from 'wouter';
import { Button } from './ui/button';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { usePrototype } from './PrototypeProvider';
import Leave_MagicINFO from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Platform Setup/Samsung_setup/Leave_MagicINFO.png'
import Select_system from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Platform Setup/Samsung_setup/Select_system.png'
import Custom_app from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Platform Setup/Samsung_setup/Custom_app.png'


export function MagicInfoGuide() {
  const [, setLocation] = useLocation();
  const { state, updateState } = usePrototype();

  const handleReturnToStep3 = () => {
    updateState({
      samsungGuideStep: 3,
      maxSamsungGuideStep: Math.max(state.maxSamsungGuideStep || 1, 3),
    });
    setLocation('/guides/platforms/samsung-tizen');
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px] max-w-[760px] mx-auto pb-32">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Switch from MagicINFO to Custom App</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Use these steps when Custom App does not appear after pressing Home.
        </p>

        <div className="space-y-12">
          {/* STEP 1 */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Step 1</h2>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Leave MagicINFO</h3>
            <p className="text-sm text-gray-700 mb-6">Use the Source button and temporarily switch to an available input, such as HDMI.</p>
            <p className="text-sm text-gray-600 mb-6 italic">This allows you to open the Samsung system menu outside MagicINFO.</p>
            <ScreenshotPlaceholder image={Leave_MagicINFO} />
          </section>

          {/* STEP 2 */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Step 2</h2>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Open the Samsung menu</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
              <li>Press Menu on the remote.</li>
              <li>Select System.</li>
            </ol>
            <ScreenshotPlaceholder image={Select_system} />
          </section>

          {/* STEP 3 */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Step 3</h2>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Play via</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
              <li>Select Play via.</li>
              <li>Select Custom App.</li>
            </ol>
            <ScreenshotPlaceholder image={Custom_app} />
          </section>

          {/* STEP 4 */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Step 4</h2>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Restart the display</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
              <li>Turn the display off and on again.</li>
              <li>Press Home.</li>
              <li>Confirm Custom App is now available.</li>
              <li>Return to Step 3 of the Samsung setup guide.</li>
            </ol>
            
            <div className="bg-gray-50 border p-4 rounded-lg text-sm text-gray-600 mb-8">
              <strong>Note:</strong> After selecting Custom App, restart the display so the change takes effect.
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Button size="lg" onClick={handleReturnToStep3}>Return to Open Custom App</Button>
        </div>
      </div>
    </div>
  );
}