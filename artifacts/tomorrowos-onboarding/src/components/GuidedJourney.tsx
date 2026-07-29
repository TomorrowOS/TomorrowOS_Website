import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CopyableText } from './CopyableText';
import { CopyActionBlock } from './CopyActionBlock';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { ServiceConnectionCard } from './ServiceConnectionCard';
import { useLocation } from 'wouter';
import { CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Check } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { StepHeader } from './StepHeader';
import { StepFooter } from './StepFooter';
import Replit_log_in from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_log_in.png'
import Create_project_view from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Create_project_view.png'
import Replit_Q1 from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_Q1.png'
import Replit_Q2 from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_Q2.png'
import Replit_Q3 from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_Q3.png'
import Replit_publish from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_publish.png'
import Replit_secrets from '../../../../attached_assets/Start_building/Start_a_new_project/Guided_setup/Replit/Replit_secrets.png'


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
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-full">
      <StepHeader 
        title="Before you begin" 
        description="Prepare the accounts and services needed to build your TomorrowOS CMS."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/brand/tomorrowos-logo.svg`} alt="TomorrowOS" className="mb-2 object-contain object-left" style={{ height: '20px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Signage foundation</p>
            <p className="text-sm text-gray-600">Device communication, playback and pairing.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/platforms/replit-wordmark.svg`} alt="Replit" className="mb-2 object-contain object-left" style={{ height: '20px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Build and hosting</p>
            <p className="text-sm text-gray-600">Creates, previews and publishes your CMS.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/platforms/supabase-wordmark.svg`} alt="Supabase" className="mb-2 object-contain object-left" style={{ height: '20px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Database</p>
            <p className="text-sm text-gray-600">Stores CMS content and application data.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/platforms/cloudinary-wordmark.svg`} alt="Cloudinary" className="mb-2 object-contain object-left" style={{ height: '20px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Media storage</p>
            <p className="text-sm text-gray-600">Stores and delivers images and videos.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 border border-border mb-6">
        <h4 className="font-medium text-gray-900 mb-3">What you need</h4>
        <ul className="space-y-2 text-sm text-gray-600 mb-4">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Replit account</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Supabase account</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Cloudinary account</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Approximately 15–20 minutes</li>
        </ul>
        <p className="text-sm text-gray-500 italic">You can create each account during this setup.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button variant="outline" onClick={() => setLocation('/guides/supabase')}>View Supabase guide</Button>
        <Button variant="outline" onClick={() => setLocation('/guides/cloudinary')}>View Cloudinary guide</Button>
      </div>

      <div className="bg-white border border-border rounded-md mb-8">
        <button 
          className="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-gray-900 hover:bg-gray-50 transition-colors"
          onClick={() => setHelpOpen(!helpOpen)}
        >
          Why are these services needed?
          <span className="text-xs text-gray-500 font-normal flex items-center gap-1">
            Learn more {helpOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </span>
        </button>
        {helpOpen && (
          <div className="px-4 pb-4 text-sm text-gray-600 border-t border-border pt-4 bg-gray-50/50">
            TomorrowOS powers the signage layer. Replit hosts the CMS, Supabase stores its data and Cloudinary stores its media.
          </div>
        )}
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="Continue to Replit" showBack={false} />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 2 — OPEN REPLIT
// ------------------------------------------
function GuidedStep2() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Open Replit" 
        description="Sign in or create your Replit account to build and host your TomorrowOS CMS."
      />

      <div className="mb-6">
        <Button onClick={() => window.open('https://replit.com', '_blank')} className="mb-6">Open Replit in new tab</Button>
        <ScreenshotPlaceholder 
          
          image={Replit_log_in}
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600 mb-8">
        <span className="font-medium text-gray-900">Note:</span> Keep this TomorrowOS page open while you complete steps in Replit.
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="I'm signed into Replit" />
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
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Create project" 
        description="Paste this exact prompt into the main Replit Agent message box to begin setup."
      />

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <p className="text-sm text-amber-900 m-0 font-medium">Do not paste it into:</p>
        <ul className="text-sm text-amber-800 list-disc pl-5 mt-1 space-y-0.5">
          <li>Shell</li>
          <li>Console</li>
          <li>Search</li>
          <li>A code file</li>
        </ul>
      </div>

      <CopyActionBlock
        type="prompt"
        label="PROMPT FOR REPLIT AGENT"
        value="Follow @tomorrowos/sdk REPLIT_SETUP.md and set up my TomorrowOS CMS."
        copiedMessage="Copied — paste into Replit Agent"
        destinationHint="Paste this into Replit Agent, then follow the questions one at a time."
        sourceKey="replit.setupPrompt"
        className="mb-6"
      />

      
        <ScreenshotPlaceholder image={Create_project_view} className="mb-6"/>
        
      

      <p className="text-sm text-gray-500 mb-8">Tip: Choose Node.js if Replit asks you to select a project type.</p>

      <div className="mt-auto">
        <StepFooter continueLabel="I have sent the prompt" />
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
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Follow prompts" 
        description="Replit will ask the setup questions one at a time. Complete each question before the next one appears."
      />

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
        <p className="text-sm text-blue-900 font-medium m-0">Important: The live Replit questions and this guide must use the same wording and order.</p>
      </div>

      <div className="space-y-4 mb-8">
    

        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
            <div className="w-px h-full bg-gray-200 mt-2"></div>
          </div>
          <Card className="flex-1 mb-4">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Database</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> Which database should your TomorrowOS CMS use?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Recommended answer:</strong> Supabase Postgres</p>
              <ScreenshotPlaceholder image={Replit_Q1} />
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
              <h3 className="font-semibold text-lg mb-2">Media storage</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> How should playlist media (images/videos) be stored?</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Recommended answer:</strong> Cloudinary</p>
              <ScreenshotPlaceholder image={Replit_Q2}/>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="w-8 shrink-0 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">3</div>
          </div>
          <Card className="flex-1">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">Branding</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Question:</strong> Brand your TomorrowOS experience</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Recommended answer:</strong> Fill in the form based on your desiend UI design</p>
              <ScreenshotPlaceholder image={Replit_Q3} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="I have answered all questions" />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 5 — CONNECT SERVICES
// ------------------------------------------
function GuidedStep5() {
  const { state, goToNextStep } = usePrototype();

  const isReady = state.supabaseStatus === 'confirmed' && state.cloudinaryStatus === 'confirmed';

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Connect services" 
        description="Your CMS needs a database and media storage before it can be previewed or published."
      />

      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600 mb-6">
        TomorrowOS does not access or store your database or media-storage credentials. Keep your keys secure inside Replit Secrets.
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ServiceConnectionCard service="supabase" />
        <ServiceConnectionCard service="cloudinary" />
      </div>

      <div className="mt-auto">
        <StepFooter 
          canContinue={isReady} 
          blockedMessage={!isReady ? "Confirm Supabase and Cloudinary before continuing." : undefined}
          continueLabel="Continue"
        />
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
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Add branding" 
        description="Replit will prompt you for your product's identity."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          "1. Product or venue name",
          "2. Tagline",
          "3. Primary colour",
          "4. Secondary or accent colour",
          "5. Timezone",
          "6. Logo URL"
        ]
        .map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-md border border-border p-4 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-sm font-medium text-gray-900">{item}</span>
            {/* <div className="w-16 h-16 bg-gray-200 border border-dashed border-gray-300 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">IMG</span>
            </div> */}
          </div>
        )
        )
        }
      </div>

      <Card className="bg-blue-50 border-blue-100 mb-6">
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
            <CopyActionBlock
              type="url"
              label="EXAMPLE MEDIA URL"
              value="https://res.cloudinary.com/your-cloud-name/image/upload/..."
              sourceKey="replit.cloudinaryExampleUrl"
            />
          </div>
          <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/cloudinary')}>Show me where to copy the URL</Button>
        </CardContent>
      </Card>

      <div className="bg-gray-50 p-4 rounded-md border border-border mb-6">
        <h4 className="font-medium text-gray-900 text-sm mb-1">No logo yet?</h4>
        <p className="text-sm text-gray-600">The logo URL is optional. Select Skip for now. You can add one later from your CMS.</p>
      </div>

      <div className="mb-8">
        <Button variant="outline" onClick={() => window.open('https://replit.com', '_blank')}>Open Replit</Button>
      </div>

      <div className="mt-auto">
        <StepFooter continueLabel="I completed the branding questions" />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 7 — GENERATE AND PREVIEW
// ------------------------------------------
function GuidedStep7() {
  const { state, updateState, goToNextStep } = usePrototype();

  const isReady = state.replitPreviewGenerationStatus === 'confirmed';

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Generate and preview" 
        description="Replit is now building your application. Follow the progress inside the Replit Agent tab."
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What Replit should do next:</h3>
          <ul className="space-y-4">
            {[
              "Project files created",
              "TomorrowOS installed",
              "CMS Preview running",
              "Supabase reported as connected",
              "Cloudinary reported as connected",
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0"></div>
                <span className="text-sm text-gray-700">{label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mb-8">
        <strong>Note:</strong> This checklist does not inspect your Replit project. Confirm each item inside Replit.
      </div>

      <div className="mb-8">
         <Button variant="outline" onClick={() => window.open('https://replit.com', '_blank')} className="w-full sm:w-auto">
           Open Replit
         </Button>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {state.replitPreviewGenerationStatus === 'needs_help' && (
           <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
             <div className="font-medium text-amber-900 mb-1">Preview has an error?</div>
             <p className="text-amber-800">Check the Replit console. Usually, this means Supabase credentials are missing or incorrect.</p>
           </div>
        )}
        
        {state.replitPreviewGenerationStatus === 'confirmed' && (
           <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10 flex items-start gap-2">
             <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
             <div>
               <span className="font-medium text-gray-900 block mb-1">Confirmed</span>
               You confirmed the preview is working.
             </div>
           </div>
        )}

        {state.replitPreviewGenerationStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ replitPreviewGenerationStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button className="flex-1" onClick={() => updateState({ replitPreviewGenerationStatus: 'confirmed' })}>My preview is working</Button>
             <Button variant="secondary" onClick={() => updateState({ replitPreviewGenerationStatus: 'needs_help' })}>My preview has an error</Button>
           </div>
        )}
        
        <StepFooter 
          canContinue={isReady}
          blockedMessage={!isReady ? "Confirm your preview is working before continuing." : undefined} 
          continueLabel="Continue" 
        />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 8 — READINESS CHECK
// ------------------------------------------
function GuidedStep8() {
  const { state, updateState, goToNextStep } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const isReady = state.replitReadinessStatus === 'confirmed';

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Pre-publish checklist" 
        description="Check your CMS before publishing. This is a critical blocking step. Everything must be connected."
      />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
            {[
              "Preview opens",
              "CMS loads",
              "Supabase reports connected",
              "Cloudinary reports connected",
              "Test media upload succeeds",
              "No blocking errors appear"
            ].map((label, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded group-hover:border-gray-400">
                   <input type="checkbox" className="peer absolute opacity-0" checked={checkedItems.has(i)} onChange={() => toggleCheck(i)} />
                   <Check className={cn("w-3.5 h-3.5 text-black", checkedItems.has(i) ? "opacity-100" : "opacity-0")} />
                </div>
                <span className="text-sm text-gray-700 select-none">{label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex flex-col gap-4">
        {state.replitReadinessStatus === 'confirmed' && (
           <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10 flex items-start gap-2">
             <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
             <div>
               <span className="font-medium text-gray-900 block mb-1">Confirmed</span>
               You confirmed all checks.
             </div>
           </div>
        )}

        {state.replitReadinessStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ replitReadinessStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <Button onClick={() => updateState({ replitReadinessStatus: 'confirmed' })}>All checks confirmed</Button>
        )}

        <StepFooter 
          canContinue={isReady}
          blockedMessage={!isReady ? "Confirm all checks before continuing." : undefined}
          continueLabel="Continue to publishing" 
        />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 9 — PUBLISH CMS
// ------------------------------------------
function GuidedStep9() {
  const { state, updateState, goToNextStep } = usePrototype();
  const [url, setUrl] = useState(state.cmsUrl || '');
  const [urlError, setUrlError] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (e.target.value && !isValidHttpsUrl(e.target.value)) {
      setUrlError('URL must start with https://');
    } else {
      setUrlError('');
      updateState({ cmsUrl: e.target.value });
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Publish CMS" 
        description="Deploy your application to production using Replit Publishing."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
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
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="outline" onClick={() => window.open('https://replit.com', '_blank')}>Open Replit Publishing</Button>
            <Button variant="outline">View publishing instructions</Button>
          </div>
        </div>
        <div className="space-y-4">
          <ScreenshotPlaceholder image={Replit_publish} />
          <ScreenshotPlaceholder image={Replit_secrets} />
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="font-medium text-gray-900 block mb-2">Save your CMS link in this browser</label>
          <p className="text-sm text-gray-500 mb-4">
            Optional. This link is stored locally for onboarding convenience. TomorrowOS does not sign into, control or verify your CMS.
          </p>
          <input 
            type="url" 
            placeholder="https://my-signage-app.replit.app" 
            className={cn(
              "w-full max-w-md border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
              urlError ? "border-destructive focus:ring-destructive" : "border-input"
            )}
            value={url}
            onChange={handleUrlChange}
          />
          {urlError && <p className="text-xs text-destructive mt-2">{urlError}</p>}
        </CardContent>
      </Card>

      <div className="mt-auto">
        <StepFooter continueLabel="I published my CMS" />
      </div>
    </div>
  );
}

// ------------------------------------------
// GUIDED STEP 10 — PRODUCTION CHECK
// ------------------------------------------
function GuidedStep10() {
  const { state, updateState, goToNextStep } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const isReady = state.replitPublishedStatus === 'confirmed';

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else {
      alert("Please go back and save your valid CMS URL, or open it directly from Replit.");
    }
  };

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader 
        title="Confirm your live CMS" 
        description="Verify your published application is working correctly in production."
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Production checklist:</h3>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                "Public CMS opens",
                "CMS interface loads",
                "Supabase reports connected",
                "Cloudinary reports connected",
                "Test media upload succeeds"
              ].map((label, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded group-hover:border-gray-400">
                     <input type="checkbox" className="peer absolute opacity-0" checked={checkedItems.has(i)} onChange={() => toggleCheck(i)} />
                     <Check className={cn("w-3.5 h-3.5 text-black", checkedItems.has(i) ? "opacity-100" : "opacity-0")} />
                  </div>
                  <span className="text-sm text-gray-700 select-none">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600">
             <strong>Note:</strong> Check these items inside your live CMS. TomorrowOS does not verify them for you.
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
         <Button variant="outline" onClick={handleOpenCms}>Open your CMS</Button>
      </div>

      <div className="bg-gray-50 border border-border p-4 rounded-md mb-8">
        <p className="text-sm text-gray-700 mb-3">
          Once your CMS is live and your screen is paired, use the content guide to upload media and publish your first playlist.
        </p>
        <Button variant="outline" size="sm" onClick={() => { window.location.href = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/guides/content`; }}>
          View content guide
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {state.replitPublishedStatus === 'needs_help' && (
           <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
             <div className="font-medium text-amber-900 mb-1">Something is not working?</div>
             <p className="text-amber-800">Ensure your Replit production Secrets match your local environment variables.</p>
           </div>
        )}
        
        {state.replitPublishedStatus === 'confirmed' && (
           <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10 flex items-start gap-2">
             <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
             <div>
               <span className="font-medium text-gray-900 block mb-1">Confirmed</span>
               You confirmed the live CMS is fully operational.
             </div>
           </div>
        )}

        {state.replitPublishedStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ replitPublishedStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button className="flex-1" onClick={() => updateState({ replitPublishedStatus: 'confirmed' })}>Everything is working</Button>
             <Button variant="secondary" onClick={() => updateState({ replitPublishedStatus: 'needs_help' })}>Something is not working</Button>
           </div>
        )}

        <StepFooter 
          canContinue={isReady}
          blockedMessage={!isReady ? "Confirm your live CMS is working before continuing." : undefined}
          continueLabel="Continue to device pairing" 
        />
      </div>
    </div>
  );
}
