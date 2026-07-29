import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { useLocation } from 'wouter';
import { StepHeader } from './StepHeader';
import { StepFooter } from './StepFooter';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { OnboardingScreenshotCard } from './OnboardingScreenshotCard';
import { CopyActionBlock } from './CopyActionBlock';
import { Check, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, isValidHttpsUrl } from '@/lib/utils';
import { vercelConfig, mediaProviderConfig, vercelBlobConfig } from '@/lib/vercelConfig';
import { MediaProviderOption } from './MediaProviderOption';

export function VercelJourney({ allExpanded = false }: { allExpanded?: boolean }) {
  const { state } = usePrototype();

  // Hash-based scrolling for guides
  React.useEffect(() => {
    if (!allExpanded) return;
    
    const applyHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            el.classList.add('ring-2', 'ring-gray-900', 'ring-offset-4', 'rounded-md');
            setTimeout(() => el.classList.remove('ring-2', 'ring-gray-900', 'ring-offset-4', 'rounded-md'), 2000);
          }
        }, 100);
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [allExpanded]);

  if (allExpanded) {
    return (
      <div className="space-y-16 py-8 guide-view">
        <div id="before-you-begin"><VercelStep1 isGuide /></div>
        <div id="open-v0"><VercelStep2 isGuide /></div>
        <div id="create-project"><VercelStep3 isGuide /></div>
        <div id="database"><VercelStep4 isGuide /></div>
        <div id="storage"><VercelStep5 isGuide /></div>
        <div id="branding"><VercelStep6 isGuide /></div>
        <div id="review"><VercelStep7 isGuide /></div>
        <div id="environment-variables"><VercelStep8 isGuide /></div>
        <div id="preview"><VercelStep9 isGuide /></div>
        <div id="pre-publish"><VercelStep10 isGuide /></div>
        <div id="publish"><VercelStep11 isGuide /></div>
        <div id="production-check"><VercelStep12 isGuide /></div>
        
        <div id="troubleshooting" className="pt-8 border-t border-border mt-16">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Troubleshooting</h2>
          <p className="text-gray-600 mb-6">If you encounter issues during your Vercel setup, use the <strong>Need help?</strong> button in the bottom corner of the screen to view step-specific blockers and solutions.</p>
        </div>
      </div>
    );
  }

  switch (state.vercelStep) {
    case 1: return <VercelStep1 />;
    case 2: return <VercelStep2 />;
    case 3: return <VercelStep3 />;
    case 4: return <VercelStep4 />;
    case 5: return <VercelStep5 />;
    case 6: return <VercelStep6 />;
    case 7: return <VercelStep7 />;
    case 8: return <VercelStep8 />;
    case 9: return <VercelStep9 />;
    case 10: return <VercelStep10 />;
    case 11: return <VercelStep11 />;
    case 12: return <VercelStep12 />;
    default: return <VercelStep1 />;
  }
}

function VercelStep1({ isGuide = false }: { isGuide?: boolean }) {
  const { goToNextStep } = usePrototype();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-full">
      <StepHeader isGuide={isGuide} 
        title="Before you begin" 
        description="You will use v0 to create your CMS and Vercel to host it."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/brand/tomorrowos-logo.svg`} alt="TomorrowOS" className="mb-2 object-contain object-left" style={{ height: '20px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Signage foundation</p>
            <p className="text-sm text-gray-600">Provides device communication, playback, pairing and platform support.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/platforms/v0-logo.png`} alt="v0" className="mb-2 object-contain object-left" style={{ height: '18px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">AI-assisted build</p>
            <p className="text-sm text-gray-600">Generates and updates the CMS project.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <img src={`${import.meta.env.BASE_URL}assets/platforms/vercel-wordmark.png`} alt="Vercel" className="mb-2 object-contain object-left" style={{ height: '18px', width: 'auto' }} />
            <p className="text-sm text-gray-500 font-medium mb-1">Hosting and deployment</p>
            <p className="text-sm text-gray-600">Runs previews, stores project configuration and publishes the CMS.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h4 className="font-semibold text-gray-900">Database and media services</h4>
            <p className="text-sm text-gray-500 font-medium mb-1">Application infrastructure</p>
            <p className="text-sm text-gray-600">Stores CMS data and uploaded media.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 border border-border mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
        <ul className="space-y-2 text-sm text-gray-600 mb-4">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> v0 or Vercel account</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Database provider</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Media-storage provider</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Approximately 15–25 minutes</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gray-400" /> Email access for account verification</li>
          {vercelConfig.vercelSupportStatus === 'validation-required' && (
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Approved TomorrowOS Vercel test access while support remains under validation</li>
          )}
        </ul>
        <p className="text-sm text-gray-500 italic mt-4">The first build may take several minutes while v0 generates the project and installs its dependencies.</p>
      </div>

      <PlansAndUsageExpandable />

      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant="outline" onClick={() => window.open('https://v0.app', '_blank')}>Open v0</Button>
        <Button variant="outline">View Vercel requirements</Button>
      </div>

      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="Continue" showBack={false} /> }
      </div>
    </div>
  );
}

function PlansAndUsageExpandable() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-border rounded-md mb-8">
      <button 
        className="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-gray-900 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        Plans and usage
        <span className="text-xs text-gray-500 font-normal flex items-center gap-1">
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 border-t border-border pt-4 bg-gray-50/50 space-y-3">
          <p>v0 uses plan-based message and generation credits. If the account reaches its current allowance, v0 may ask the user to wait, add usage or change plan before continuing.</p>
          <p>Vercel hosting has its own plans and usage limits. Choose a plan suitable for the intended personal or commercial use of the CMS.</p>
        </div>
      )}
    </div>
  );
}

function VercelStep2({ isGuide = false }: { isGuide?: boolean }) {
  const { goToNextStep } = usePrototype();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Sign in to v0" 
        description="Open v0 and sign in using your Vercel account."
      />
      <div className="mb-6">
        <Button onClick={() => window.open('https://v0.app', '_blank')} className="mb-6">Open v0</Button>
        <div className="grid md:grid-cols-2 gap-6">
          <OnboardingScreenshotCard
            id="VERCEL-01A"
            imagePath="onboarding/vercel/VERCEL-01A.png"
            alt="Vercel sign-in screen showing the available account login options."
            heading="Sign in to your Vercel account"
            copy="After selecting “Open v0”, sign in using your existing Vercel account. You can continue with Google, GitHub, Apple or email. If you do not already have a Vercel account, create one before continuing."
          />
          <OnboardingScreenshotCard
            id="VERCEL-01B"
            imagePath="onboarding/vercel/VERCEL-01B.png"
            alt="v0 workspace showing the main prompt field used to begin a new build."
            heading="Open the main v0 prompt area"
            copy="Once signed in, you will arrive in your v0 workspace. Locate the main prompt field at the top of the page. This is where you will paste the TomorrowOS build prompt in the next step."
          />
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600 mb-8">
        Keep this TomorrowOS guide open. You will return here while configuring the project.
      </div>
      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I am signed in to v0" /> }
      </div>
    </div>
  );
}

function VercelStep3({ isGuide = false }: { isGuide?: boolean }) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Create your TomorrowOS CMS" 
        description="Paste this into the main v0 prompt area."
      />
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <p className="text-sm text-amber-900 m-0 font-medium mb-1">Do not paste it into:</p>
        <ul className="text-sm text-amber-800 list-disc pl-5 mt-1 space-y-0.5 mb-3">
          <li>A public code file</li>
          <li>Environment-variable values</li>
          <li>Vercel project settings</li>
          <li>A database console</li>
        </ul>
        <p className="text-sm text-amber-900 font-medium">Do not paste database passwords, API secrets or storage tokens into the v0 conversation. Add sensitive values using Vercel Environment Variables or approved Marketplace integrations.</p>
      </div>
      <CopyActionBlock
        type="prompt"
        label="PROMPT FOR v0"
        value="Follow @tomorrowos/sdk VERCEL_SETUP.md and set up my TomorrowOS CMS."
        copiedMessage="Copied — paste this into v0"
        destinationHint="Paste this into the main v0 prompt field, then submit it."
        sourceKey="vercel.step3.setupPrompt"
        className="mb-6"
      />
      <div className="mb-6">
        <OnboardingScreenshotCard
          id="VERCEL-02"
          imagePath="onboarding/vercel/VERCEL-02.png"
          alt="v0 workspace showing the main Ask v0 to build prompt field where the TomorrowOS setup prompt should be pasted."
          heading="Paste the setup prompt into v0"
          copy="Copy the TomorrowOS setup prompt shown above, return to your v0 workspace and paste it into the main “Ask v0 to build…” prompt field. Submit the prompt and allow v0 to begin preparing your CMS."
          note="Keep this TomorrowOS guide open in another browser tab. You will return here after v0 begins asking the setup questions."
        />
      </div>
      <div className="flex gap-3 mb-8">
        <Button variant="outline" onClick={() => window.open('https://v0.app', '_blank')}>Open v0</Button>
      </div>
      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I submitted the setup prompt" /> }
      </div>
    </div>
  );
}

function VercelStep4({ isGuide = false }: { isGuide?: boolean }) {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Choose your database" 
        description="v0 will ask the setup questions one at a time. The first question asks which database TomorrowOS should use."
      />
      <p className="text-sm text-gray-600 mb-6 -mt-2">v0 will ask the setup questions one at a time. Complete each question before continuing.</p>
      <div className="mb-6">
        <OnboardingScreenshotCard
          id="VERCEL-03A"
          imagePath="onboarding/vercel/VERCEL-03A.png"
          alt="v0 asking which database TomorrowOS should use on Vercel, with Supabase Postgres recommended."
          heading="Answer the database question in v0"
          copy={[
            'In the v0 question panel, select the database you want TomorrowOS to use. Choose “Supabase Postgres (recommended)” for the standard guided setup, or select another supported option only when you intentionally plan to configure it.',
            'Then select “Submit” in v0 before returning to this guide.',
          ]}
          note="Do not enter database passwords, connection strings or API secrets into the v0 conversation. Sensitive values will be added later using Vercel Environment Variables or an approved integration."
        />
      </div>
      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600 mb-8 flex flex-wrap items-center gap-3">
        <span>Provider setup guides:</span>
        <Button variant="outline" size="sm" onClick={() => setLocation('/guides/supabase')}>View Supabase guide</Button>
        <Button variant="outline" size="sm" onClick={() => setLocation('/guides/neon')}>View Neon setup guide</Button>
      </div>
      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I selected my database" /> }
        <p className="text-xs text-gray-500 text-center mt-3">This confirmation updates guide progress only. TomorrowOS.org does not inspect the Vercel project or database.</p>
      </div>
    </div>
  );
}

function VercelStep5({ isGuide = false }: { isGuide?: boolean }) {
  const [, setLocation] = useLocation();
  const { state, updateState, goToNextStep } = usePrototype();

  const allProviders = [mediaProviderConfig.vercelBlob, mediaProviderConfig.cloudinary];
  const customerFacing = allProviders.filter((p) => p.available && p.implementationReady && p.tested);
  // Prototype Review Mode previews providers whose validation is incomplete.
  const visibleProviders = state.prototypeReviewMode
    ? allProviders.filter((p) => p.available)
    : customerFacing;
  const hiddenProviders = allProviders.filter((p) => !customerFacing.includes(p));
  const singleProvider = visibleProviders.length === 1 ? visibleProviders[0] : null;

  const selectedId = singleProvider ? singleProvider.id : state.vercelMediaProvider || null;
  const selectedProvider = visibleProviders.find((p) => p.id === selectedId) || null;
  const detailsId = 'media-provider-details';
  const optionRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const providerAction = (p: typeof allProviders[number]) =>
    p.guideUrl ? (
      <Button variant="secondary" size="sm" onClick={() => setLocation(p.guideUrl!)}>View {p.name} guide</Button>
    ) : p.externalDocsUrl ? (
      <Button variant="secondary" size="sm" asChild>
        <a href={p.externalDocsUrl} target="_blank" rel="noopener noreferrer">View {p.name} documentation</a>
      </Button>
    ) : null;

  const providerDetails = (p: typeof allProviders[number]) => (
    <div id={detailsId} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 animate-in fade-in duration-300">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{p.details.heading}</h4>
      {p.details.ordered ? (
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1 mb-3">
          {p.details.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      ) : (
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
          {p.details.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      {p.details.note && <p className="text-xs text-gray-500 mb-3">{p.details.note}</p>}
      {providerAction(p)}
    </div>
  );

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      {singleProvider ? (
        <StepHeader isGuide={isGuide}
          title="Set up media storage"
          description={`TomorrowOS will use ${singleProvider.name} to store and deliver uploaded images and videos.`}
        />
      ) : (
        <StepHeader isGuide={isGuide}
          title="Choose media storage"
          description="Select where your CMS will store and deliver uploaded images and videos."
        />
      )}

      {singleProvider ? (
        <Card className="mb-6">
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-4">
              <img
                src={`${import.meta.env.BASE_URL}${singleProvider.logoPath}`}
                alt={singleProvider.logoAlt}
                className="h-8 w-auto max-w-[160px] object-contain"
              />
              {singleProvider.badge && (
                <span className="shrink-0 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">{singleProvider.badge}</span>
              )}
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{singleProvider.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{singleProvider.description}</p>
            <p className="text-sm text-gray-500 mb-6">{singleProvider.bestFor}</p>
            {providerDetails(singleProvider)}
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Choose the option that best suits how you want to manage media. You can use Vercel Blob without creating a separate provider account, or choose Cloudinary for more advanced media handling.
          </p>
          <div
            role="radiogroup"
            aria-label="Media storage providers"
            className="grid md:grid-cols-2 gap-6 mb-6 md:items-stretch"
            onKeyDown={(e) => {
              const count = visibleProviders.length;
              if (count === 0) return;
              const current = Math.max(0, visibleProviders.findIndex((p) => p.id === selectedId));
              let next: number | null = null;
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % count;
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + count) % count;
              else if (e.key === 'Home') next = 0;
              else if (e.key === 'End') next = count - 1;
              if (next === null) return;
              e.preventDefault();
              const provider = visibleProviders[next];
              updateState({ vercelMediaProvider: provider.id });
              optionRefs.current[provider.id]?.focus();
            }}
          >
            {visibleProviders.map((provider, index) => (
              <MediaProviderOption
                key={provider.id}
                provider={provider}
                selected={selectedId === provider.id}
                onSelect={() => updateState({ vercelMediaProvider: provider.id })}
                detailsId={detailsId}
                reviewPreview={!customerFacing.includes(provider)}
                tabIndex={selectedId ? (selectedId === provider.id ? 0 : -1) : index === 0 ? 0 : -1}
                optionRef={(el) => { optionRefs.current[provider.id] = el; }}
              />
            ))}
          </div>
          {selectedProvider && providerDetails(selectedProvider)}
        </>
      )}

      {selectedProvider && (
        <div className="bg-amber-50 border border-amber-100 text-amber-900 rounded-lg p-3 text-xs mb-8" role="note">
          {selectedProvider.securityNote}
        </div>
      )}

      {state.prototypeReviewMode && (
        <div className="rounded border border-dashed border-purple-300 bg-purple-50 p-3 text-[11px] leading-relaxed text-purple-900 mb-6">
          <p className="font-bold uppercase tracking-wider mb-1">Media storage diagnostics</p>
          <p><strong>Mode:</strong> {singleProvider ? 'single-provider' : 'multi-provider'} · <strong>Stored provider:</strong> {state.vercelMediaProvider || 'none'} · <strong>Blob access mode:</strong> {vercelBlobConfig.accessMode} · <strong>Blob upload mode:</strong> {vercelBlobConfig.uploadMode}</p>
          {allProviders.map((p) => (
            <p key={p.id}><strong>{p.name}:</strong> available {String(p.available)} · implementationReady {String(p.implementationReady)} · tested {String(p.tested)} · external account {String(p.requiresExternalAccount)} · guide {p.guideUrl ?? 'none (external docs)'} · logo {p.logoPath}</p>
          ))}
          {hiddenProviders.map((p) => (
            <div key={p.id} className="mt-1">
              <p className="font-bold">{p.name.toUpperCase()} HIDDEN — IMPLEMENTATION OR VALIDATION INCOMPLETE</p>
              <ul className="list-disc pl-4">
                {p.missingValidation.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto">
        {!isGuide && (
          <StepFooter
            canContinue={!!selectedProvider}
            blockedMessage={selectedProvider ? undefined : 'Select a media provider to continue'}
            continueLabel={selectedProvider ? selectedProvider.continueLabel : 'Select a media provider to continue'}
            onContinue={() => {
              if (!selectedProvider) return;
              updateState({ vercelMediaProvider: selectedProvider.id });
              goToNextStep();
            }}
          />
        )}
      </div>
    </div>
  );
}

function VercelStep6({ isGuide = false }: { isGuide?: boolean }) {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Add your branding" 
        description="Provide identity details for your TomorrowOS CMS."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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

      <div className="flex flex-col gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-md border border-border flex justify-between items-center">
          <div className="text-sm text-gray-800">Need help getting a Cloudinary logo URL?</div>
          <Button variant="outline" size="sm" onClick={() => setLocation('/guides/cloudinary')}>View instructions</Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border border-border">
          <h4 className="font-medium text-gray-900 text-sm mb-1">No logo yet?</h4>
          <p className="text-sm text-gray-600">Skip this question for now. A logo should not block the CMS build.</p>
        </div>
      </div>

      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I completed the branding questions" /> }
      </div>
    </div>
  );
}

function VercelStep7({ isGuide = false }: { isGuide?: boolean }) {
  const { state, updateState } = usePrototype();
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Review what v0 created" 
        description="v0 should generate the CMS project and a working preview."
      />
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">You should now see:</h3>
          <ul className="space-y-4">
            {[
              "CMS project created",
              "TomorrowOS SDK installed",
              "Database integration added",
              "Media-storage integration added",
              "Branding configuration created",
              "Example content created when selected",
              "Preview available"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0"></div>
                <span className="text-sm text-gray-700">{label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-8 text-sm text-blue-900">
        The first build may take several minutes. Keep the v0 page open while it generates files and resolves dependencies.
      </div>
      
      <p className="text-xs text-gray-500 text-center mb-6">This guide does not inspect the v0 project.</p>

      <div className="flex gap-3 mb-8">
         <Button variant="outline" onClick={() => window.open('https://v0.app', '_blank')}>Open v0</Button>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {state.vercelPreviewGenerationStatus === 'needs_help' && !isGuide && (
           <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
             <div className="font-medium text-amber-900 mb-1">Build has an error?</div>
             <p className="text-amber-800">Check the v0 preview console. Usually, this means environment variables are missing or incorrect.</p>
           </div>
        )}
        
        {isGuide ? (
           <div className="text-sm bg-gray-50 border border-border p-3 rounded-md text-center text-gray-500">
             <span className="font-medium text-gray-700 block mb-1">Available in Guided Setup</span>
             Progress confirmation actions are disabled in the guide view.
           </div>
        ) : state.vercelPreviewGenerationStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ vercelPreviewGenerationStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button className="flex-1" onClick={() => updateState({ vercelPreviewGenerationStatus: 'confirmed' })}>My preview is ready</Button>
             <Button variant="secondary" onClick={() => updateState({ vercelPreviewGenerationStatus: 'needs_help' })}>My build has an error</Button>
           </div>
        )}

        {!isGuide && <StepFooter 
          canContinue={state.vercelPreviewGenerationStatus === 'confirmed'} 
          blockedMessage={state.vercelPreviewGenerationStatus !== 'confirmed' ? "Confirm your preview before continuing." : undefined}
          continueLabel="Continue" 
        />}
      </div>
    </div>
  );
}

function EnvironmentVariableMapping({ provider }: { provider: 'supabase' | 'neon' }) {
  const { state } = usePrototype();
  const mapping = vercelConfig.vercelDatabaseMappings[provider];
  
  if (mapping.tomorrowOsVariable.includes('{{') && !state.prototypeReviewMode) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 border border-border rounded-md overflow-hidden">
      <div className="px-4 py-2 bg-gray-100 border-b border-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Database Variable Mapping
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 text-sm font-mono text-gray-800">
           <span>Provider variable</span>
           <span className="text-gray-400">→</span>
           <span className="font-semibold text-black">{mapping.tomorrowOsVariable}</span>
        </div>
      </div>
    </div>
  );
}

function VercelStep8({ isGuide = false }: { isGuide?: boolean }) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Configure your Vercel project" 
        description=""
      />
      
      <div className="space-y-8 mb-8">
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Project connection</h3>
          <p className="text-sm text-gray-600 mb-4">Confirm that the v0 project is connected to a Vercel project.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <ScreenshotPlaceholder id="VERCEL-04A" description="v0 project deployment connection" />
            <ScreenshotPlaceholder id="VERCEL-04B" description="Vercel project dashboard" />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Environment variables</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-6">
            <li>Open the Vercel project.</li>
            <li>Select Settings.</li>
            <li>Open Environment Variables.</li>
            <li>Add or confirm all required variables.</li>
            <li>Apply each variable to the correct environment.</li>
            <li>Save the configuration.</li>
          </ol>
          <div className="flex gap-2 mb-6">
             <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium border border-gray-200">Development</span>
             <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium border border-gray-200">Preview</span>
             <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium border border-gray-200">Production</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-md text-sm text-blue-900 mb-6">
             A variable available in Preview may still be missing from Production.
          </div>
          <EnvironmentVariableMapping provider="supabase" />
          <p className="text-xs text-gray-500 mt-2">Changes to Vercel Environment Variables require a new deployment before they affect the live CMS.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Keep credentials private</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Do not paste secrets into public prompts.</li>
            <li>Do not expose server credentials in browser code.</li>
            <li>Do not put secret values in screenshots.</li>
            <li>Do not commit <code className="bg-gray-100 px-1 rounded">.env</code> files.</li>
            <li>Use sensitive Vercel Environment Variables where appropriate.</li>
          </ul>
        </section>
      </div>

      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I configured the Vercel project" /> }
      </div>
    </div>
  );
}

function VercelStep9({ isGuide = false }: { isGuide?: boolean }) {
  const { state, updateState } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Open your preview deployment" 
        description="Vercel creates Preview Deployments while the application is being developed."
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
            {[
              "Preview URL opens",
              "CMS interface loads",
              "Database-backed content loads",
              "Media storage works",
              "Example content is visible when selected",
              "No blocking error appears"
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

      <p className="text-xs text-gray-500 text-center mb-6">This guide does not inspect the deployment.</p>

      <div className="flex gap-3 mb-8">
        <Button variant="outline" onClick={() => window.open('https://vercel.com', '_blank')}>Open preview</Button>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {state.vercelReadinessStatus === 'needs_help' && !isGuide && (
           <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
             <div className="font-medium text-amber-900 mb-1">Preview has an error?</div>
             <p className="text-amber-800">Check the Vercel logs or v0 console. Confirm environment variables.</p>
           </div>
        )}
        
        {isGuide ? (
           <div className="text-sm bg-gray-50 border border-border p-3 rounded-md text-center text-gray-500">
             <span className="font-medium text-gray-700 block mb-1">Available in Guided Setup</span>
             Progress confirmation actions are disabled in the guide view.
           </div>
        ) : state.vercelReadinessStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ vercelReadinessStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button className="flex-1" onClick={() => updateState({ vercelReadinessStatus: 'confirmed' })}>My preview works</Button>
             <Button variant="secondary" onClick={() => updateState({ vercelReadinessStatus: 'needs_help' })}>My preview has an error</Button>
           </div>
        )}

        {!isGuide && <StepFooter 
          canContinue={state.vercelReadinessStatus === 'confirmed'} 
          blockedMessage={state.vercelReadinessStatus !== 'confirmed' ? "Confirm your preview works before continuing." : undefined}
          continueLabel="Continue" 
        />}
      </div>
    </div>
  );
}

function VercelStep10({ isGuide = false }: { isGuide?: boolean }) {
  const { state, updateState } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const items = [
    "v0 build completed",
    "Preview opens",
    "Database is configured",
    "Database-backed action works",
    "Media storage is configured",
    "Test media upload works",
    "Branding loads",
    "Required Production Environment Variables are present",
    "No blocking errors appear"
  ];
  const allChecked = checkedItems.size === items.length;

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Check your CMS before publishing" 
        description="This is a manual checklist."
      />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
            {items.map((label, i) => (
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
        {isGuide ? (
           <div className="text-sm bg-gray-50 border border-border p-3 rounded-md text-center text-gray-500">
             <span className="font-medium text-gray-700 block mb-1">Available in Guided Setup</span>
             Progress confirmation actions are disabled in the guide view.
           </div>
        ) : allChecked ? (
           <Button variant="outline" onClick={() => setCheckedItems(new Set())}>Undo confirmation</Button>
        ) : (
           <Button disabled>All checks confirmed</Button>
        )}

        {!isGuide && <StepFooter 
          canContinue={allChecked} 
          blockedMessage={!allChecked ? "Confirm all checks before continuing." : undefined}
          continueLabel="Continue" 
        />}
      </div>
    </div>
  );
}

function VercelStep11({ isGuide = false }: { isGuide?: boolean }) {
  const { state, updateState } = usePrototype();
  const [url, setUrl] = useState(state.cmsUrl || '');
  const [urlError, setUrlError] = useState('');
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (e.target.value && !e.target.value.startsWith('https://')) {
      setUrlError('URL must start with https://');
    } else {
      try {
        if (e.target.value) new URL(e.target.value);
        setUrlError('');
        updateState({ cmsUrl: e.target.value });
      } catch (err) {
        setUrlError('Invalid URL format');
      }
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Publish your CMS to Vercel" 
        description="Complete publishing through v0 or the connected Vercel project."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
            <li>Confirm the current version is ready.</li>
            <li>Open the deployment action in v0 or Vercel.</li>
            <li>Deploy to Production.</li>
            <li>Wait for the production deployment to complete.</li>
            <li>Open the production URL.</li>
            <li>Copy the public HTTPS CMS URL.</li>
          </ol>
          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" onClick={() => window.open('https://v0.app', '_blank')}>Open v0</Button>
            <Button variant="outline" onClick={() => window.open('https://vercel.com', '_blank')}>Open Vercel dashboard</Button>
            <Button variant="secondary">View publishing screenshot</Button>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <label className="font-medium text-gray-900 block mb-2">Save your CMS link in this browser</label>
          <p className="text-sm text-gray-500 mb-4">
            This URL is stored locally for onboarding convenience. TomorrowOS.org does not sign into, control or verify your CMS.
          </p>
          {isGuide ? (
             <div className="text-sm bg-gray-50 border border-border p-3 rounded-md text-gray-500">
               <span className="font-medium text-gray-700">Available in Guided Setup</span> — return to your setup to save your URL locally.
             </div>
          ) : (
            <>
              <input 
                type="url" 
                placeholder="https://my-signage-app.vercel.app" 
                className={cn(
                  "w-full max-w-md border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                  urlError ? "border-destructive focus:ring-destructive" : "border-input"
                )}
                value={url}
                onChange={handleUrlChange}
              />
              {urlError && <p className="text-xs text-destructive mt-2">{urlError}</p>}
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-auto">
        {!isGuide && <StepFooter continueLabel="I published my CMS" /> }
      </div>
    </div>
  );
}

function VercelStep12({ isGuide = false }: { isGuide?: boolean }) {
  const { state, updateState, goToNextStep } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  const handleOpenCms = () => {
    if (state.cmsUrl && isValidHttpsUrl(state.cmsUrl)) {
      window.open(state.cmsUrl, '_blank');
    } else if (state.prototypeReviewMode) {
      window.open('https://example.com', '_blank');
    }
  };

  const hasCmsUrl = !!(state.cmsUrl && isValidHttpsUrl(state.cmsUrl));

  const items = [
    "Production HTTPS URL opens",
    "CMS interface loads",
    "Database-backed content works",
    "Media upload works",
    "Uploaded media can be retrieved",
    "CMS login or access flow works where included",
    "No blocking production errors appear"
  ];
  if (vercelConfig.vercelSupportStatus === 'validation-required') {
    items.push("I completed an approved TomorrowOS device-connectivity test.");
  }
  
  const allChecked = checkedItems.size === items.length;
  const isValidationRequired = vercelConfig.vercelSupportStatus === 'validation-required';
  const requiresCheckboxes = isValidationRequired;
  
  const isChecklistMet = !requiresCheckboxes || allChecked;
  const isReadyToContinue = state.vercelPublishedStatus === 'confirmed' && isChecklistMet;

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px]">
      <StepHeader isGuide={isGuide} 
        title="Confirm your live CMS" 
        description=""
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-y-4">
            {items.map((label, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded group-hover:border-gray-400">
                   <input type="checkbox" className="peer absolute opacity-0" checked={checkedItems.has(i)} onChange={() => toggleCheck(i)} />
                   <CheckCircle2 className={cn("w-4 h-4 text-black", checkedItems.has(i) ? "opacity-100" : "opacity-0")} />
                </div>
                <span className="text-sm text-gray-700 select-none">{label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6">This status is based on your confirmation.</p>
        </CardContent>
      </Card>

      <div className="flex gap-3 mb-8">
        <Button 
          variant="outline" 
          onClick={handleOpenCms}
          disabled={!hasCmsUrl && !state.prototypeReviewMode}
          title={!hasCmsUrl && !state.prototypeReviewMode ? 'Save a CMS URL in the previous step' : ''}
        >
          Open my CMS
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {state.vercelPublishedStatus === 'needs_help' && !isGuide && (
          <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
            <div className="font-medium text-amber-900 mb-1">Need help?</div>
            <p className="text-amber-800">Use the Need Help button to view common deployment blockers.</p>
          </div>
        )}

        {isGuide ? (
           <div className="text-sm bg-gray-50 border border-border p-3 rounded-md text-center text-gray-500">
             <span className="font-medium text-gray-700 block mb-1">Available in Guided Setup</span>
             Progress confirmation actions are disabled in the guide view.
           </div>
        ) : state.vercelPublishedStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ vercelPublishedStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button 
               className="flex-1" 
               disabled={!isChecklistMet}
               onClick={() => updateState({ vercelPublishedStatus: 'confirmed' })}
               title={!isChecklistMet ? "Check all items above to confirm everything is working" : ""}
             >
               Everything is working
             </Button>
             <Button variant="secondary" onClick={() => updateState({ vercelPublishedStatus: 'needs_help' })}>Something is not working</Button>
           </div>
        )}

        {!isGuide && <StepFooter 
          canContinue={isReadyToContinue} 
          blockedMessage={!isReadyToContinue ? "Confirm everything is working (and check all requirements) to continue." : undefined}
          continueLabel="Production checks confirmed" 
        />}
      </div>
    </div>
  );
}
