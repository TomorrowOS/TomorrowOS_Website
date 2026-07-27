import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { StepHeader } from './StepHeader';
import { useLocation } from 'wouter';
import { ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { contentGuideConfig } from '@/lib/contentGuideConfig';

export function ContentJourney({ onViewAllSteps }: { onViewAllSteps?: () => void }) {
  const { state } = usePrototype();

  const mobileHeader = (
    <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b">
      <span className="text-sm font-medium text-gray-500">Step {state.contentGuideStep} of 12</span>
      <Button variant="outline" size="sm" onClick={onViewAllSteps} aria-label="View all steps">View all steps</Button>
    </div>
  );

  return (
    <>
      {mobileHeader}
      {renderStep(state.contentGuideStep)}
    </>
  );
}

function renderStep(step: number) {
  switch (step) {
    case 1: return <ContentStep1 />;
    case 2: return <ContentStep2 />;
    case 3: return <ContentStep3 />;
    case 4: return <ContentStep4 />;
    case 5: return <ContentStep5 />;
    case 6: return <ContentStep6 />;
    case 7: return <ContentStep7 />;
    case 8: return <ContentStep8 />;
    case 9: return <ContentStep9 />;
    case 10: return <ContentStep10 />;
    case 11: return <ContentStep11 />;
    case 12: return <ContentStep12 />;
    default: return <ContentStep1 />;
  }
}

function ContentGuideFooter({ label = "I completed this step" }: { label?: string }) {
  const { state, updateState } = usePrototype();
  
  const handleComplete = () => {
    const nextStep = state.contentGuideStep + 1;
    const completed = new Set(state.contentCompletedSteps);
    completed.add(state.contentGuideStep);
    
    updateState({
      contentCompletedSteps: Array.from(completed),
      contentGuideStep: nextStep <= 12 ? nextStep : state.contentGuideStep,
      maxContentGuideStep: Math.max(state.maxContentGuideStep || 1, nextStep <= 12 ? nextStep : 12)
    });
  };

  const handleBack = () => {
    if (state.contentGuideStep > 1) {
      updateState({ contentGuideStep: state.contentGuideStep - 1 });
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
      {state.contentGuideStep > 1 ? (
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
    <div className="border rounded-lg bg-white overflow-hidden mt-6" aria-expanded={open}>
      <button 
        className="w-full flex items-center justify-between p-4 text-left font-medium text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
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

function TechnicalDetails({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button 
        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
        View technical details
      </button>
      {open && (
        <div className="mt-2 p-3 bg-gray-100 text-gray-700 font-mono text-xs rounded">
          {children}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------
// STEP 1
// ------------------------------------------
function ContentStep1() {
  const { state } = usePrototype();
  
  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open the public CMS URL copied when you published your project.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Open Playlists" />

      <p className="text-sm text-gray-600 mb-6">From your CMS dashboard, find the Playlists section.</p>

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Select the orange + button beside Playlists.</li>
      </ol>

      <p className="text-sm text-gray-600 mb-8"><strong>Expected result:</strong> The playlist editor opens inside your CMS.</p>

      <div className="mb-8">
         <Button onClick={handleOpenCms}>Open my CMS</Button>
      </div>

      <ScreenshotPlaceholder 
        id="CONTENT-01" 
        description="TomorrowOS sample CMS. Highlight: Orange + button beside Playlists" 
        caption="Select the + button beside Playlists to create a new playlist."
        className="mb-8 h-64"
      />

      <p className="text-xs text-gray-500 italic mb-4">
        Completing this step only updates your onboarding progress. TomorrowOS.org does not inspect or control your CMS.
      </p>

      <ContentGuideFooter label="I opened the playlist editor" />
    </div>
  );
}

// ------------------------------------------
// STEP 2
// ------------------------------------------
function ContentStep2() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Name your playlist" />

      <p className="text-sm text-gray-600 mb-6">Choose a clear name that explains where or how the playlist will be used.</p>

      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-1">Example:</p>
        <code className="px-2 py-1 bg-gray-100 rounded border font-mono text-sm text-gray-800">Reception — Welcome Content</code>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Good playlist names may include:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Location</li>
            <li>Screen purpose</li>
            <li>Campaign</li>
            <li>Time period</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-2">Avoid generic names such as:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Playlist 1</li>
          </ul>
        </div>
      </div>

      <ScreenshotPlaceholder 
        id="CONTENT-02" 
        description="TomorrowOS sample CMS playlist editor. Highlight: Playlist name field" 
        caption="Give the playlist a clear and recognisable name."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="I named my playlist" />
    </div>
  );
}

// ------------------------------------------
// STEP 3
// ------------------------------------------
function ContentStep3() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Upload your media" />

      <p className="text-sm text-gray-600 mb-6">In the Assets section, select the orange + button and choose the images or videos you want to upload.</p>

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Select the + button beside Assets.</li>
        <li>Choose a file from your computer.</li>
        <li>Wait for the upload to finish.</li>
        <li>Confirm the asset appears in the Assets area.</li>
      </ol>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-sm text-orange-800 mb-8">
        <strong>Warning:</strong> Do not close the page while an upload is still in progress.
      </div>

      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Upload limits depend on the asset type and the user's Cloudinary plan.</h4>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Images</p>
            <p className="text-sm text-gray-700">{contentGuideConfig.cloudinaryImageLimitCopy}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Videos</p>
            <p className="text-sm text-gray-700">{contentGuideConfig.cloudinaryVideoLimitCopy}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="CONTENT-03A" description="TomorrowOS sample CMS. Highlight: Orange + button beside Assets" caption="Select the + button beside Assets to upload media." className="h-48" />
        <ScreenshotPlaceholder id="CONTENT-03B" description="Browser file selector. Highlight: Image or video selection" caption="Choose the media file you want to upload." className="h-48" />
      </div>
      <ScreenshotPlaceholder id="CONTENT-03C" description="TomorrowOS sample CMS Assets area. Highlight: Uploaded asset" caption="Wait until the asset appears before continuing." className="mb-6 h-48" />

      <TroubleshootingAccordion title="My asset will not upload">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Cloudinary is configured</li>
          <li>File is within the current plan limit</li>
          <li>Media format is supported</li>
          <li>Internet connection is stable</li>
          <li>The filename does not contain unusual unsupported characters.</li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setLocation('/guides/cloudinary')}>Open Cloudinary guide</Button>
          <Button variant="outline" size="sm" onClick={() => setLocation('/compatibility/media')}>Check media compatibility</Button>
          <Button variant="outline" size="sm">Try again in my CMS</Button>
        </div>
        <TechnicalDetails>
          Error details would appear here, e.g., Cloudinary API 400 Bad Request if file exceeds limits.
        </TechnicalDetails>
      </TroubleshootingAccordion>

      <ContentGuideFooter label="I uploaded my media" />
    </div>
  );
}

// ------------------------------------------
// STEP 4
// ------------------------------------------
function ContentStep4() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Add media to the playlist" />

      <p className="text-sm text-gray-600 mb-6">Select the assets you want to include and add them to the playlist.</p>

      <div className="mb-8 p-4 bg-gray-50 border rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Recommended first playlist:</h4>
        <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700">
          <li>One image</li>
          <li>One short video</li>
          <li>No more than two or three items</li>
        </ul>
        <p className="text-sm text-gray-500 mt-4 italic">Starting with a small playlist makes it easier to identify playback or compatibility issues.</p>
      </div>

      <ScreenshotPlaceholder 
        id="CONTENT-04" 
        description="TomorrowOS sample CMS. Highlight: Assets being added to the playlist" 
        caption="Add the selected media to your playlist."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="I added media to my playlist" />
    </div>
  );
}

// ------------------------------------------
// STEP 5
// ------------------------------------------
function ContentStep5() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Arrange the playback order" />

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-8">
        <li>Drag and drop the playlist items into the required order.</li>
        <li>Place the first item at the top.</li>
        <li>Review the duration of each item.</li>
      </ol>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Video duration</p>
          <p className="text-sm text-gray-700">Videos play for their natural duration unless the CMS displays another playback-duration option.</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-2">Image duration</p>
          <p className="text-sm text-gray-700">Set how long each image remains visible.</p>
        </div>
      </div>

      <div className="bg-gray-50 border p-4 rounded-lg text-sm text-gray-700 mb-8">
        <strong>Recommended first test:</strong> 10 seconds per image. Use short videos and a simple sequence for the first test.
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <ScreenshotPlaceholder id="CONTENT-05A" description="TomorrowOS sample CMS playlist editor. Highlight: Drag-and-drop ordering" caption="Drag playlist items into the required playback order." className="h-48" />
        <ScreenshotPlaceholder id="CONTENT-05B" description="TomorrowOS sample CMS. Highlight: Image-duration control" caption="Set how long each image should remain on screen." className="h-48" />
      </div>

      <ContentGuideFooter label="I arranged my playlist" />
    </div>
  );
}

// ------------------------------------------
// STEP 6
// ------------------------------------------
function ContentStep6() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Configure the schedule" />

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Option A: Play continuously</h3>
            <p className="text-sm text-gray-600 mb-3">{contentGuideConfig.emptyScheduleMeansAlwaysAvailable}</p>
            {state.prototypeReviewMode && (
              <div className="mt-4 p-2 bg-purple-50 text-purple-800 text-xs border border-purple-200 rounded">
                <strong>Review Note:</strong> Confirm that an empty schedule means always available before production release.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Option B: Use a schedule</h3>
            <ol className="list-decimal pl-4 space-y-1 text-sm text-gray-700">
              <li>Select the required days.</li>
              <li>Choose the start time.</li>
              <li>Choose the end time.</li>
              <li>Confirm the venue or CMS timezone.</li>
            </ol>
            <p className="text-xs text-gray-500 italic mt-3">{contentGuideConfig.scheduleTimezoneCopy}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-sm text-orange-800 mb-8">
        <p className="mb-2">For the first onboarding test, use one continuously available playlist rather than overlapping scheduled playlists.</p>
        <strong>Warning:</strong> Avoid overlapping playlist schedules until you understand how the CMS resolves schedule conflicts.
      </div>

      <ScreenshotPlaceholder 
        id="CONTENT-06" 
        description="TomorrowOS sample CMS. Highlight: Day, start-time and end-time controls" 
        caption="Add a schedule only when the playlist should run during specific periods."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="I configured the playlist timing" />
    </div>
  );
}

// ------------------------------------------
// STEP 7
// ------------------------------------------
function ContentStep7() {
  const { state } = usePrototype();
  
  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open your CMS to try saving the playlist again.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Save the playlist" />

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Before saving, review:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Playlist name</li>
          <li>Media order</li>
          <li>Image durations</li>
          <li>Schedule</li>
        </ul>
      </div>

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Select Save Playlist.</li>
      </ol>

      <p className="text-sm text-gray-600 mb-8"><strong>Expected result:</strong> The saved playlist appears in the Playlists section.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="CONTENT-07A" description="TomorrowOS sample CMS. Highlight: Save Playlist button" caption="Save the playlist after reviewing its media and schedule." className="h-48" />
        <ScreenshotPlaceholder id="CONTENT-07B" description="TomorrowOS sample CMS. Highlight: Saved playlist in the Playlists section" caption="The playlist should now appear in the Playlists list." className="h-48" />
      </div>

      <p className="text-xs text-gray-500 italic mb-4">
        This only updates your TomorrowOS onboarding progress. The guide does not inspect the CMS or verify the playlist.
      </p>

      <TroubleshootingAccordion title="My playlist will not save">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Playlist name has been entered</li>
          <li>At least one asset has been added</li>
          <li>Image durations are valid</li>
          <li>Schedule fields are complete</li>
          <li>No upload is still in progress</li>
        </ul>
        <Button variant="outline" size="sm" onClick={handleOpenCms}>Open my CMS</Button>
      </TroubleshootingAccordion>

      <ContentGuideFooter label="I created and saved my playlist" />
    </div>
  );
}

// ------------------------------------------
// STEP 8
// ------------------------------------------
function ContentStep8() {
  const { state } = usePrototype();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open your CMS.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Select a screen" />

      <p className="text-sm text-gray-600 mb-6">Choose the screen that should receive the playlist.</p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Before continuing, confirm that the screen:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Appears in the device list</li>
          <li>Is paired with this CMS</li>
          <li>Is shown as online or connected by the CMS</li>
          <li>Matches the physical screen you intend to update</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-800 mb-8">
        <strong>Screen offline?</strong>
        <p className="mt-1">{contentGuideConfig.offlinePublishingCopy}</p>
        {state.prototypeReviewMode && (
          <div className="mt-3 p-2 bg-purple-50 text-purple-800 text-xs border border-purple-200 rounded">
            <strong>Review Note:</strong> Confirm the exact offline publishing behaviour before production release.
          </div>
        )}
      </div>

      <div className="mb-8">
         <Button onClick={handleOpenCms}>Open my CMS</Button>
      </div>

      <ScreenshotPlaceholder 
        id="CONTENT-08" 
        description="TomorrowOS sample CMS. Highlight: Selected device card" 
        caption="Select the screen that should receive the playlist."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="I selected the correct screen" />
    </div>
  );
}

// ------------------------------------------
// STEP 9
// ------------------------------------------
function ContentStep9() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Open Publish" />

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>From the selected device, select the orange Publish button.</li>
      </ol>

      <p className="text-sm text-gray-600 mb-8"><strong>Expected result:</strong> A playlist-selection panel opens.</p>

      <ScreenshotPlaceholder 
        id="CONTENT-09" 
        description="TomorrowOS sample CMS device card. Highlight: Orange Publish button" 
        caption="Select Publish on the chosen device."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="I opened the publishing panel" />
    </div>
  );
}

// ------------------------------------------
// STEP 10
// ------------------------------------------
function ContentStep10() {
  const { state } = usePrototype();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open your CMS.");
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Choose the playlist" />

      <p className="text-sm text-gray-600 mb-4">Select the playlist you created.</p>
      
      <div className="bg-gray-50 border p-3 rounded mb-6 text-sm text-gray-700">
        <strong>For the first deployment:</strong> Choose one playlist only.
      </div>

      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
        <li>Select Publish Selected.</li>
      </ol>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-sm text-orange-800 mb-8">
        <strong>Important:</strong> Publishing assigns the selected playlist to the screen through your CMS. The TomorrowOS onboarding guide does not publish the playlist itself.
      </div>

      <div className="mb-8">
         <Button onClick={handleOpenCms}>Open my CMS</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="CONTENT-10A" description="TomorrowOS sample CMS. Highlight: Playlist selection" caption="Select the playlist you want to assign to the screen." className="h-48" />
        <ScreenshotPlaceholder id="CONTENT-10B" description="TomorrowOS sample CMS. Highlight: Publish Selected button" caption="Select Publish Selected inside your CMS." className="h-48" />
      </div>

      <TroubleshootingAccordion title="The playlist does not appear in publish">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Playlist was saved</li>
          <li>Correct CMS environment is open</li>
          <li>Playlist list has refreshed</li>
          <li>Playlist has not been archived or removed</li>
        </ul>
      </TroubleshootingAccordion>

      <ContentGuideFooter label="I published the playlist in my CMS" />
    </div>
  );
}

// ------------------------------------------
// STEP 11
// ------------------------------------------
function ContentStep11() {
  const { state } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Wait for the screen to update" />

      <p className="text-sm text-gray-600 mb-6">Keep the CMS and physical display visible while the content update is delivered.</p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Timing may depend on:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Network connection</li>
          <li>Media size</li>
          <li>Whether media is already cached</li>
          <li>Whether the player is currently online</li>
        </ul>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-sm text-orange-800 mb-8">
        Do not refresh or republish repeatedly while the first update is still processing.
      </div>

      <p className="text-sm text-gray-600 mb-8"><strong>Expected result:</strong> The selected playlist begins playing on the physical screen.</p>

      <ScreenshotPlaceholder 
        id="CONTENT-11" 
        description="Physical signage display. Highlight: First playlist content appearing" 
        caption="Wait for the selected playlist to begin playing."
        className="mb-8 h-64"
      />

      <ContentGuideFooter label="Content has started appearing on my screen" />
    </div>
  );
}

// ------------------------------------------
// STEP 12 & OPTIONAL SECTIONS
// ------------------------------------------
function ContentStep12() {
  const { state } = usePrototype();
  const [, setLocation] = useLocation();

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Open your CMS.");
    }
  };

  const isCompleted = state.contentCompletedSteps.includes(12);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader stepNumber={state.contentGuideStep} totalSteps={12} eyebrow="CONTENT AND PUBLISHING GUIDE" title="Confirm playback" />

      <p className="text-sm text-gray-600 mb-6">Check the physical display—not only the CMS.</p>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Manual checklist:</h4>
          <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> Correct playlist is playing</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> Assets appear in the correct order</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> Images use the expected duration</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> Videos play to completion</li>
            </ul>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> Display orientation is correct</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> No black screens appear</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> No media errors appear</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-400" /> At least one full playlist cycle completes</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <ScreenshotPlaceholder 
        id="CONTENT-12" 
        description="Physical signage display. Highlight: Completed content playback" 
        caption="Confirm the full playlist plays correctly on the physical display."
        className="mb-8 h-64"
      />

      <p className="text-xs text-gray-500 italic mb-6">
        This result is based on your confirmation. TomorrowOS.org does not currently inspect the physical display through this guide.
      </p>

      <TroubleshootingAccordion title="The screen is offline">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Display has power</li>
          <li>TomorrowOS Runtime is running</li>
          <li>Network is connected</li>
          <li>Screen remains paired to this CMS</li>
        </ul>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Open device troubleshooting</Button>
          <Button variant="outline" size="sm" onClick={() => setLocation('/guides/platforms')}>View platform guides</Button>
        </div>
      </TroubleshootingAccordion>

      <TroubleshootingAccordion title="The playlist was published but does not play">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Physical screen is online</li>
          <li>Playlist is assigned to the correct screen</li>
          <li>Schedule is currently active</li>
          <li>Changes were saved</li>
          <li>Media format is supported</li>
          <li>Screen has had time to download the content</li>
        </ul>
      </TroubleshootingAccordion>

      <TroubleshootingAccordion title="The screen is black">
        <p className="font-semibold text-gray-900 mb-2">Check:</p>
        <ul className="list-disc pl-4 space-y-2 mb-4">
          <li>Playlist contains valid media</li>
          <li>Assets uploaded successfully</li>
          <li>Media format is compatible</li>
          <li>Schedule is active</li>
          <li>Display orientation is correct</li>
          <li>Target screen supports the media encoding</li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setLocation('/compatibility/media')}>Check media compatibility</Button>
          <Button variant="outline" size="sm">Open device troubleshooting</Button>
          <Button variant="outline" size="sm" onClick={() => setLocation('/guides/cloudinary')}>Open Cloudinary guide</Button>
        </div>
        <TechnicalDetails>
          Error traces would be logged via Runtime telemetry or shown on the physical screen (e.g. Codec not supported).
        </TechnicalDetails>
      </TroubleshootingAccordion>

      {isCompleted ? (
        <div className="mt-12 space-y-12">
          <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your first content is live</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">You confirmed that media was uploaded, saved into a playlist and published to your screen.</p>
            
            <div className="flex flex-wrap justify-center gap-3">
               <Button onClick={handleOpenCms}>Open my CMS</Button>
               <Button variant="outline" onClick={() => setLocation('/start')}>Return to Guided Setup</Button>
               <Button variant="outline">Add another playlist</Button>
               <Button variant="ghost" onClick={() => {
                 document.getElementById('troubleshooting')?.scrollIntoView({ behavior: 'smooth' });
                 window.location.hash = 'troubleshooting';
               }}>View troubleshooting</Button>
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Understanding playlist status</h3>
            <p className="text-sm text-gray-600 mb-6">Once published, the CMS displays playlists assigned to the selected screen.</p>
            
            <div className="mb-6 p-4 bg-gray-50 border rounded text-sm text-gray-700">
              {contentGuideConfig.playlistStatusIndicatorCopy}
            </div>

            {state.prototypeReviewMode && (
              <div className="mb-6 p-3 bg-purple-50 text-purple-800 text-xs border border-purple-200 rounded">
                <strong>Review Note:</strong> Confirm whether the indicator represents: Assigned, Scheduled, Requested, Downloaded, or Confirmed as playing.
              </div>
            )}

            <ScreenshotPlaceholder id="CONTENT-STATUS-01" description="TomorrowOS sample CMS. Highlight: Green playlist indicator" caption="The green indicator shows the playlist currently marked as active by the CMS." className="h-48 mb-12" />
          </div>

          <div className="border-t border-border pt-12" id="troubleshooting">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Change or remove a playlist</h3>
            
            <div className="space-y-8">
              <section>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Replace the current playlist</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Select the screen.</li>
                  <li>Open Publish.</li>
                  <li>Select the replacement playlist.</li>
                  <li>Select Publish Selected.</li>
                  <li>Confirm the new content appears.</li>
                </ol>
              </section>

              <section>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Remove a playlist</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-4">
                  <li>Select Remove beside the playlist assignment.</li>
                </ol>
                
                <p className="text-sm text-gray-600 mb-4">{contentGuideConfig.playlistRemovalBehaviour}</p>

                {state.prototypeReviewMode && (
                  <div className="mb-4 p-3 bg-purple-50 text-purple-800 text-xs border border-purple-200 rounded">
                    <strong>Review Note:</strong> Confirm removal and fallback behaviour before production release.
                  </div>
                )}

                <p className="text-xs text-gray-500 italic mb-6">Removing an assignment should not be described as deleting the playlist unless the CMS actually deletes it.</p>

                <ScreenshotPlaceholder id="CONTENT-REMOVE-01" description="TomorrowOS sample CMS. Highlight: Remove action" caption="Remove the playlist assignment from the selected device." className="h-48" />
              </section>
            </div>
          </div>
        </div>
      ) : (
        <ContentGuideFooter label="My playlist is playing correctly" />
      )}
    </div>
  );
}