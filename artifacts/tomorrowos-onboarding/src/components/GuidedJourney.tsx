import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CopyableText } from './CopyableText';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { ServiceConnectionCard } from './ServiceConnectionCard';
import { PLACEHOLDERS } from '@/lib/constants';
import { useLocation } from 'wouter';
import { StatusBadge } from './StatusBadge';
import { CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GuidedJourney() {
  const { state } = usePrototype();

  switch (state.guidedStep) {
    case 1: return <GuidedStep1 />;
    case 2: return <GuidedStep2 />;
    case 3: return <GuidedStep3 />;
    case 4: return <GuidedStep4 />;
    case 5: return <GuidedStep5 />;
    case 6: return <GuidedStep6 />;
    case 7: return <GuidedStep7 />;
    case 8: return <GuidedStep8 />;
    case 9: return <GuidedStep9 />;
    case 10: return <GuidedStep10 />;
    default: return <GuidedStep1 />;
  }
}

// ------------------------------------------
// GUIDED STEP 1 — BEFORE YOU BEGIN
// ------------------------------------------
function GuidedStep1() {
  const { goToNextStep } = usePrototype();
  const [, setLocation] = useLocation();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Before you begin</h2>
        <p className="text-gray-600">
          You will use Replit, Supabase and Cloudinary during setup. Keep this TomorrowOS guide open and open each service in a separate browser tab.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <h4 className="font-semibold text-gray-900">TomorrowOS</h4>
            <p className="text-sm text-gray-500 mt-1">Provides the device, playback and signage foundation.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h4 className="font-semibold text-[#F26207]">Replit</h4>
            <p className="text-sm text-gray-500 mt-1">Builds, previews and hosts your CMS.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h4 className="font-semibold text-[#3ECF8E]">Supabase</h4>
            <p className="text-sm text-gray-500 mt-1">Provides your CMS database.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h4 className="font-semibold text-[#3448C5]">Cloudinary</h4>
            <p className="text-sm text-gray-500 mt-1">Stores and delivers images and videos.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 border border-border">
        <h4 className="font-medium text-gray-900 mb-3">Requirements:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li>Replit account</li>
          <li>Supabase account</li>
          <li>Cloudinary account</li>
          <li>Approximately 15–20 minutes</li>
          <li>Email access for account verification</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={goToNextStep}>Open Replit</Button>
        <Button variant="secondary" onClick={() => setLocation('/guides/supabase')}>Open Supabase guide</Button>
        <Button variant="secondary" onClick={() => setLocation('/guides/cloudinary')}>Open Cloudinary guide</Button>
      </div>

      <Card className="mt-8">
        <button 
          className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
          onClick={() => setHelpOpen(!helpOpen)}
        >
          Why are three services needed?
          {helpOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {helpOpen && (
          <div className="px-4 pb-4 text-sm text-gray-600 border-t border-border pt-4">
            TomorrowOS provides the signage foundation. Replit builds and hosts the CMS. Supabase stores CMS data. Cloudinary stores media.
          </div>
        )}
      </Card>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 2 — OPEN REPLIT
// ------------------------------------------
function GuidedStep2() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in or create your Replit account</h2>
        <p className="text-gray-600">
          Replit will create, preview and publish your TomorrowOS CMS.
        </p>
      </div>

      <ScreenshotPlaceholder 
        id="[IMAGE PLACEHOLDER — REPLIT SIGN-IN SCREEN]" 
        description="Show the Replit authentication page"
      />

      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600">
        <span className="font-medium text-gray-900">Note:</span> Keep this TomorrowOS page open. Replit will open in a new tab.
      </div>

      <div className="flex items-center gap-4">
        <Button>Open Replit</Button>
        <Button variant="tertiary" onClick={goToNextStep}>Already signed in? Continue</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 3 — CREATE THE PROJECT
// ------------------------------------------
function GuidedStep3() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a new Replit project</h2>
        <p className="text-gray-600">Paste this into the main Replit Agent message box.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
        <p className="text-sm text-amber-900 m-0 font-medium">Do not paste it into:</p>
        <ul className="text-sm text-amber-800 list-disc pl-5 mt-1 space-y-0.5">
          <li>Shell</li>
          <li>Console</li>
          <li>Search</li>
          <li>A code file</li>
        </ul>
      </div>

      <CopyableText text="Follow @tomorrowos/sdk REPLIT_SETUP.md and set up my TomorrowOS CMS." className="mb-6" />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — REPLIT CREATE PROJECT]" description="Creating project view" className="p-4" />
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — REPLIT AGENT MESSAGE BOX]" description="Message box highlighting" className="p-4" />
      </div>
      
      <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — TOMORROWOS PROMPT SUBMITTED]" description="Prompt successfully entered" className="p-4 mb-6" />

      <p className="text-sm text-gray-500">Tip: Choose Node.js if Replit asks you to select a project type.</p>

      <div className="flex items-center gap-4 mt-6">
        <Button variant="secondary">Open Replit</Button>
        <Button onClick={goToNextStep}>I have sent the prompt</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 4 — FOLLOW THE QUESTIONS
// ------------------------------------------
function GuidedStep4() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Follow the prompts</h2>
        <p className="text-gray-600">
          Replit will ask the setup questions one at a time. Complete each question before the next one appears.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
        <p className="text-sm text-blue-900 font-medium m-0">Important: The live Replit questions and this guide must use the same wording and order.</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
            <div className="w-px h-full bg-gray-200 mt-2"></div>
          </div>
          <Card className="flex-1 mb-4">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Project name</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> What is your project name?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Example:</strong> my-signage-app</p>
              <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — LIVE REPLIT PROJECT-NAME QUESTION]" description="" className="p-4 py-6" />
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">2</div>
            <div className="w-px h-full bg-gray-200 mt-2"></div>
          </div>
          <Card className="flex-1 mb-4">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Database</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> Which database would you like to use?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Expected answer:</strong> Supabase</p>
              <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — LIVE REPLIT DATABASE QUESTION]" description="" className="p-4 py-6" />
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">3</div>
            <div className="w-px h-full bg-gray-200 mt-2"></div>
          </div>
          <Card className="flex-1 mb-4">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Media storage</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> Which media storage would you like to use?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Expected answer:</strong> Cloudinary</p>
              <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — LIVE REPLIT STORAGE QUESTION]" description="" className="p-4 py-6" />
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">4</div>
          </div>
          <Card className="flex-1">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Example content</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> Would you like to initialise the project with example content?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Recommended answer:</strong> Yes</p>
              <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — LIVE REPLIT EXAMPLE-CONTENT QUESTION]" description="" className="p-4 py-6" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Button onClick={goToNextStep} className="mt-4">I have completed the Replit questions</Button>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 5 — CONNECT SERVICES
// ------------------------------------------
function GuidedStep5() {
  const { state, goToNextStep } = usePrototype();

  const isReady = state.supabaseStatus === 'connected' && state.cloudinaryStatus === 'connected';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Supabase and Cloudinary</h2>
        <p className="text-gray-600">
          Your CMS needs a database and media storage before it can be previewed or published.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ServiceConnectionCard service="supabase" />
        <ServiceConnectionCard service="cloudinary" />
      </div>

      <div className="pt-6 border-t border-border flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {!isReady ? 'Connect both services to continue.' : 'Both services connected successfully.'}
        </p>
        <Button onClick={goToNextStep} disabled={!isReady}>Continue</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 6 — ADD BRANDING
// ------------------------------------------
function GuidedStep6() {
  const { goToNextStep } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your branding</h2>
        <p className="text-gray-600">Replit will prompt you for your product's identity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "1. Product or venue name",
          "2. Tagline",
          "3. Primary colour",
          "4. Secondary or accent colour",
          "5. Timezone",
          "6. Logo URL"
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-md border border-border p-4 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-sm font-medium text-gray-900">{item}</span>
            <div className="w-16 h-16 bg-gray-200 border border-dashed border-gray-300 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">IMG</span>
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2 mt-0">You will need your Cloudinary logo URL</h3>
          <p className="text-sm text-blue-800 mb-4">If you uploaded a logo:</p>
          <ol className="list-decimal pl-5 text-sm text-blue-800 space-y-1 mb-4">
            <li>Open the asset in Cloudinary.</li>
            <li>Select Copy URL.</li>
            <li>Return to Replit.</li>
            <li>Paste the complete URL.</li>
          </ol>
          <div className="mb-4">
            <CopyableText text="https://res.cloudinary.com/your-cloud-name/image/upload/..." className="bg-white" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/cloudinary')}>Show me where to copy the URL</Button>
        </CardContent>
      </Card>

      <div className="bg-gray-50 p-4 rounded-md border border-border">
        <h4 className="font-medium text-gray-900 text-sm mb-1">No logo yet?</h4>
        <p className="text-sm text-gray-600">Select Skip for now. You can add one later from your CMS.</p>
      </div>

      <Button onClick={goToNextStep} className="mt-4">Branding added</Button>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 7 — GENERATE AND PREVIEW
// ------------------------------------------
function GuidedStep7() {
  const { state, updateState, goToNextStep } = usePrototype();

  const handleSimulate = (status: 'success' | 'error') => {
    updateState({ previewGenerationStatus: status });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate and preview your CMS</h2>
        <p className="text-gray-600">Replit is now building your application.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <ul className="space-y-4">
            {[
              { label: "Project files created", done: true },
              { label: "TomorrowOS installed", done: true },
              { label: "Supabase connected", done: state.previewGenerationStatus === 'success' },
              { label: "Cloudinary connected", done: state.previewGenerationStatus === 'success' },
              { label: "Branding applied", done: state.previewGenerationStatus === 'success' },
              { label: "Example content created", done: state.previewGenerationStatus === 'success' },
              { label: "CMS Preview running", done: state.previewGenerationStatus === 'success' }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                ) : state.previewGenerationStatus === 'error' && i === 2 ? (
                  <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-destructive"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0"></div>
                )}
                <span className={cn("text-sm", item.done ? "text-gray-900" : state.previewGenerationStatus === 'error' && i === 2 ? "text-destructive font-medium" : "text-gray-500")}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {state.previewGenerationStatus === 'error' && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-destructive mb-2">Supabase connection failed during preview</h3>
            <p className="text-sm text-gray-700 mb-4">The preview server could not reach the database. Your password might be incorrect or the secret is missing.</p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">Open Replit Secrets</Button>
              <Button variant="outline" size="sm" onClick={() => handleSimulate('success')}>Retry preview</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleSimulate('error')}>Simulate Error</Button>
          <Button variant="outline" size="sm" className="text-success border-success/30" onClick={() => handleSimulate('success')}>Simulate Success</Button>
        </div>
        <Button onClick={goToNextStep} disabled={state.previewGenerationStatus !== 'success'}>Continue</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 8 — READINESS CHECK
// ------------------------------------------
function GuidedStep8() {
  const { state, updateState, goToNextStep } = usePrototype();

  const isReady = state.readinessStatus === 'success';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your CMS before publishing</h2>
        <p className="text-gray-600">This is a critical blocking step. Everything must be connected.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-3 pb-4 border-b border-border">
            {isReady ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : state.readinessStatus === 'error' ? (
              <AlertCircle className="w-8 h-8 text-destructive" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-gray-200" />
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {isReady ? 'Everything is connected' : state.readinessStatus === 'error' ? 'Your CMS is not ready to publish' : 'Checking readiness...'}
              </h3>
              <p className="text-sm text-gray-500">
                {isReady ? 'Your CMS is ready to publish.' : 'Waiting for required checks.'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
            {[
              "CMS server running",
              "Supabase connected",
              "Cloudinary connected",
              "Database initialised",
              "Media upload tested",
              "Required Secrets present",
              "Preview opened successfully"
            ].map((label, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                {isReady ? (
                  <span className="text-success text-xs font-medium">Passed</span>
                ) : state.readinessStatus === 'error' && i === 2 ? (
                  <span className="text-destructive text-xs font-medium">Failed</span>
                ) : (
                  <span className="text-gray-400 text-xs">Pending</span>
                )}
              </div>
            ))}
          </div>

          {state.readinessStatus === 'error' && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">Fix Cloudinary</Button>
              <Button variant="outline" size="sm" onClick={() => updateState({ readinessStatus: 'success' })}>Retry check</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => updateState({ readinessStatus: 'error' })}>Simulate Error</Button>
          <Button variant="outline" size="sm" className="text-success border-success/30" onClick={() => updateState({ readinessStatus: 'success' })}>Simulate Success</Button>
        </div>
        <Button onClick={goToNextStep} disabled={!isReady}>Continue to publishing</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 9 — PUBLISH CMS
// ------------------------------------------
function GuidedStep9() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Publish your TomorrowOS CMS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Open Replit Publishing.</li>
            <li>Confirm the required production Secrets are present.</li>
            <li>Give the deployment a name or custom domain.</li>
            <li>Select Publish.</li>
            <li>Wait for publishing to finish.</li>
            <li>Open the public CMS URL.</li>
          </ol>
        </div>
        <div className="space-y-4">
          <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — REPLIT PUBLISHING PANEL]" description="" className="p-4" />
          <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — PRODUCTION SECRETS]" description="" className="p-4" />
        </div>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — SUCCESSFUL CMS URL]" description="" className="p-4 mb-4" />
          <p className="text-sm text-gray-600 mb-3">Copy and save this URL. You will use it to access your CMS and continue setup.</p>
          <CopyableText text="https://my-signage-app.replit.app" className="max-w-md mx-auto" />
        </CardContent>
      </Card>

      <Button onClick={goToNextStep} className="mt-4">I have published my CMS</Button>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 10 — PRODUCTION CHECK
// ------------------------------------------
function GuidedStep10() {
  const { state, updateState, goToNextStep } = usePrototype();
  const isReady = state.publishedStatus === 'success';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm your published CMS</h2>
        <p className="text-gray-600">We need to run simulated checks against the published application.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-3 pb-4 border-b border-border">
            {isReady ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : state.publishedStatus === 'error' ? (
              <AlertCircle className="w-8 h-8 text-destructive" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-gray-200" />
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {isReady ? 'Your CMS is live and connected' : state.publishedStatus === 'error' ? 'Your CMS was published, but setup is incomplete' : 'Running production checks...'}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
            {[
              "Published CMS responding",
              "Supabase connected",
              "Cloudinary connected",
              "Media upload successful",
              "CMS login available"
            ].map((label, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                {isReady ? (
                  <span className="text-success text-xs font-medium">Passed</span>
                ) : state.publishedStatus === 'error' && i === 1 ? (
                  <span className="text-destructive text-xs font-medium">Failed</span>
                ) : (
                  <span className="text-gray-400 text-xs">Pending</span>
                )}
              </div>
            ))}
          </div>

          {state.publishedStatus === 'error' && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">Open Publishing Secrets</Button>
              <Button variant="secondary" size="sm">Fix Supabase</Button>
              <Button variant="outline" size="sm" onClick={() => updateState({ publishedStatus: 'success' })}>Retry production check</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => updateState({ publishedStatus: 'error' })}>Simulate Error</Button>
          <Button variant="outline" size="sm" className="text-success border-success/30" onClick={() => updateState({ publishedStatus: 'success' })}>Simulate Success</Button>
        </div>
        <Button onClick={goToNextStep} disabled={!isReady}>Continue to device pairing</Button>
      </div>
    </div>
  );
}
