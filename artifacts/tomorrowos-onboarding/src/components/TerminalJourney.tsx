import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CopyableText } from './CopyableText';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { ServiceConnectionCard } from './ServiceConnectionCard';
import { PLACEHOLDERS } from '@/lib/constants';
import { useLocation } from 'wouter';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TerminalJourney() {
  const { state } = usePrototype();

  switch (state.terminalStep) {
    case 1: return <TerminalStep1 />;
    case 2: return <TerminalStep2 />;
    case 3: return <TerminalStep3 />;
    case 4: return <TerminalStep4 />;
    case 5: return <TerminalStep5 />;
    case 6: return <TerminalStep6 />;
    case 7: return <TerminalStep7 />;
    case 8: return <TerminalStep8 />;
    case 9: return <TerminalStep9 />;
    case 10: return <TerminalStep10 />;
    case 11: return <TerminalStep11 />;
    case 12: return <TerminalStep12 />;
    case 13: return <TerminalStep13 />;
    default: return <TerminalStep1 />;
  }
}

// ------------------------------------------
// TERMINAL STEP 1 — BEFORE YOU BEGIN
// ------------------------------------------
function TerminalStep1() {
  const { state, goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prepare your development environment</h2>
        <p className="text-gray-600">
          This path is for developers comfortable with Node.js, environment variables, Git and application deployment.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 border border-border">
        <h4 className="font-medium text-gray-900 mb-3">Requirements:</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Node.js {PLACEHOLDERS.NODE_VERSION}</li>
            <li>Approved package manager</li>
            <li>Git</li>
            <li>Terminal</li>
          </ul>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Code editor</li>
            <li>Supabase</li>
            <li>Cloudinary</li>
            <li>Supported Node.js deployment host</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-900">Verify your environment:</p>
        <CopyableText text="node --version" />
        <CopyableText text="npm --version" />
        <CopyableText text="git --version" />
      </div>

      {state.prototypeReviewMode ? (
        <div className="bg-success/5 border border-success/20 p-4 rounded-md flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <p className="text-sm text-gray-700 m-0 leading-relaxed">
            <span className="font-semibold text-gray-900 block mb-1">Simulated prerequisites confirmed</span>
            All required local tools are available.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600">
          Run the commands above in your own terminal and confirm each tool responds with a version number. This guide does not inspect your environment.
        </div>
      )}

      <Button onClick={goToNextStep} className="mt-4">I confirmed my environment</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 2 — CREATE PROJECT
// ------------------------------------------
function TerminalStep2() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your TomorrowOS project</h2>
        <p className="text-gray-600">Open your terminal, navigate to the folder where you keep development projects, paste the command and press Enter.</p>
      </div>

      <CopyableText text={PLACEHOLDERS.CLI_COMMAND} className="text-lg p-4" />

      <div className="grid md:grid-cols-2 gap-4">
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — EMPTY TERMINAL]" description="" />
        <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — COMMAND ENTERED]" description="" />
      </div>
      <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — TOMORROWOS CLI STARTED]" description="" className="h-40" />

      <Button onClick={goToNextStep} className="mt-4">CLI started</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 3 — FOLLOW CLI QUESTIONS
// ------------------------------------------
function TerminalStep3() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Follow CLI questions</h2>
        <p className="text-gray-600">The CLI asks each question individually.</p>
      </div>

      <div className="space-y-4">
        {["1. Project name", "2. Supabase", "3. Cloudinary", "4. Example content"].map((q, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <span className="font-medium text-gray-900">{q}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <ScreenshotPlaceholder id="[IMAGE PLACEHOLDER — TERMINAL QUESTIONS]" description="Show CLI prompts" className="h-40" />

      <Button onClick={goToNextStep} className="mt-4">Questions completed</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 4 — PROJECT CREATED
// ------------------------------------------
function TerminalStep4() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project created</h2>
      </div>

      <ul className="space-y-3 pl-2">
        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-success" /> Project created</li>
        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-success" /> Dependencies prepared</li>
        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-success" /> Environment template created</li>
        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-success" /> Branding configuration created</li>
      </ul>

      <CopyableText text="cd [PROJECT-NAME]" />

      <Button onClick={goToNextStep} className="mt-4">Continue</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 5 — ENVIRONMENT VARIABLES
// ------------------------------------------
function TerminalStep5() {
  const { goToNextStep } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure local environment variables</h2>
        <p className="text-gray-600">Open <code className="bg-gray-100 px-1 rounded">{PLACEHOLDERS.LOCAL_ENV_FILENAME}</code> (likely .env.local)</p>
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
{`SUPABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=`}
      </div>

      <div className="flex gap-4">
        <Button variant="tertiary" onClick={() => setLocation('/guides/supabase')}>Open Supabase guide →</Button>
        <Button variant="tertiary" onClick={() => setLocation('/guides/cloudinary')}>Open Cloudinary guide →</Button>
      </div>

      <div className="bg-warning/10 border border-warning/20 p-4 rounded-md mt-6">
        <h4 className="font-semibold text-amber-900 mb-2 text-sm">Security note:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
          <li>Never commit the environment file</li>
          <li>Never paste secrets into source code</li>
          <li>Never paste secrets into GitHub</li>
          <li>Never include secrets in screenshots</li>
        </ul>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-md border border-border">
        <CheckCircle2 className="w-4 h-4 text-success" />
        Environment file excluded from Git
      </div>

      <Button onClick={goToNextStep} className="mt-4">Variables saved</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 6 — CONNECT SERVICES
// ------------------------------------------
function TerminalStep6() {
  const { state, goToNextStep } = usePrototype();
  const isReady = state.supabaseStatus === 'confirmed' && state.cloudinaryStatus === 'confirmed';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Test connections</h2>
        <p className="text-gray-600">Save in the approved local environment file and run tests.</p>
      </div>

      <div className="space-y-3 mb-6">
        <CopyableText text={PLACEHOLDERS.SUPABASE_CHECK_COMMAND} />
        <CopyableText text={PLACEHOLDERS.CLOUDINARY_CHECK_COMMAND} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ServiceConnectionCard service="supabase" />
        <ServiceConnectionCard service="cloudinary" />
      </div>

      <div className="pt-6 border-t border-border flex items-center justify-end">
        <Button onClick={goToNextStep} disabled={!isReady}>Continue</Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 7 — ADD BRANDING
// ------------------------------------------
function TerminalStep7() {
  const { goToNextStep } = usePrototype();
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your branding</h2>
        <p className="text-gray-600">CLI branding questions or generated branding form.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-border text-sm text-gray-600 mb-6">
        Do not force manual edit of brand.json unless selecting an Advanced manual option.
      </div>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2 mt-0">You will need your Cloudinary logo URL</h3>
          <div className="mb-4">
            <CopyableText text="https://res.cloudinary.com/your-cloud-name/image/upload/..." className="bg-white" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => setLocation('/guides/cloudinary')}>Show me where to copy the URL</Button>
        </CardContent>
      </Card>

      <Button onClick={goToNextStep} className="mt-4">Branding added</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 8 — INITIALISE PROJECT
// ------------------------------------------
function TerminalStep8() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Initialise project</h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium mb-2">1. Install dependencies</p>
          <CopyableText text={PLACEHOLDERS.INSTALL_DEPENDENCIES_COMMAND} />
          <p className="text-xs text-gray-500 mt-2">Installs required packages locally.</p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">2. Initialise database</p>
          <CopyableText text={PLACEHOLDERS.DATABASE_INIT_COMMAND} />
          <p className="text-xs text-gray-500 mt-2">Sets up tables in Supabase.</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">3. Sample content (optional)</p>
          <CopyableText text={PLACEHOLDERS.SAMPLE_CONTENT_COMMAND} />
          <p className="text-xs text-gray-500 mt-2">Adds placeholder data to your CMS.</p>
        </div>
      </div>

      <Button onClick={goToNextStep} className="mt-6">Project initialised</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 9 — RUN LOCALLY
// ------------------------------------------
function TerminalStep9() {
  const { state, goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Run locally</h2>
      </div>

      <CopyableText text={PLACEHOLDERS.DEVELOPMENT_COMMAND} className="mb-4" />
      
      <div className="bg-gray-50 p-4 rounded-md border border-border font-mono text-sm text-gray-800 mb-6">
        http://localhost:{PLACEHOLDERS.PORT}
      </div>

      <Button variant="secondary" className="mb-6">Open local CMS</Button>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {state.prototypeReviewMode ? 'Simulated local health checks:' : 'Confirm these yourself in your local CMS:'}
          </h3>
          <ul className="space-y-3">
            {[
              "CMS server running",
              "Supabase reports connected",
              "Database initialised",
              "Cloudinary reports connected",
              "Media upload succeeds",
              "Branding loaded",
              "Example content available"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                {state.prototypeReviewMode
                  ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  : <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />}
                {label}
              </li>
            ))}
          </ul>
          {!state.prototypeReviewMode && (
            <p className="text-xs text-gray-500 mt-4">This checklist does not inspect your local project. Confirm each item in your terminal and browser.</p>
          )}
        </CardContent>
      </Card>

      <Button onClick={goToNextStep} className="mt-4">I confirmed my local CMS is running</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 10 — CHOOSE HOST
// ------------------------------------------
function TerminalStep10() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose where to deploy</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: PLACEHOLDERS.HOST_1, desc: "Recommended" },
          { name: PLACEHOLDERS.HOST_2, desc: "" },
          { name: PLACEHOLDERS.HOST_3, desc: "" },
          { name: "Self-hosted", desc: "Advanced" },
        ].map((host, i) => (
          <Card key={i} className={i === 0 ? "border-primary ring-1 ring-primary" : ""}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{host.name}</h3>
                {host.desc && <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{host.desc}</span>}
              </div>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Persistent Node.js runtime</li>
                <li>• Environment-variable support</li>
                <li>• TomorrowOS supported</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={goToNextStep} className="mt-4">Host selected</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 11 — PRODUCTION VARIABLES
// ------------------------------------------
function TerminalStep11() {
  const { goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add production environment variables</h2>
        <p className="text-gray-600">Local environment variables are not automatically available to the deployed application.</p>
        <p className="text-gray-900 font-medium mt-2">Add them securely through the selected host.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-md border border-border space-y-4">
        {["SUPABASE_URL", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].map((v, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-mono text-sm w-64 shrink-0 text-gray-700">{v}</span>
            <div className="flex-1 h-10 bg-white border border-gray-300 rounded-md flex items-center px-3 text-gray-400 font-mono text-xs">
              ••••••••••••••••••••••••
            </div>
          </div>
        ))}
      </div>

      <Button onClick={goToNextStep} className="mt-4">Variables added to host</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 12 — DEPLOY
// ------------------------------------------
function TerminalStep12() {
  const { state, goToNextStep } = usePrototype();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Deploy</h2>
      </div>

      <CopyableText text={PLACEHOLDERS.DEPLOYMENT_COMMAND} />

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {state.prototypeReviewMode ? 'Simulated deployment:' : 'What your host should report:'}
          </h3>
          <ul className="space-y-3">
            {["Building project", "Starting TomorrowOS server", "Applying environment variables", "Checking application health"].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                {state.prototypeReviewMode
                  ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  : <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />}
                {label}
              </li>
            ))}
          </ul>
          {!state.prototypeReviewMode && (
            <p className="text-xs text-gray-500 mt-4">This guide does not monitor your deployment. Confirm each item in your host's output.</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <p className="text-sm font-medium text-gray-900 mb-2">Example public CMS URL (your host will print your real one):</p>
        <CopyableText text="https://my-signage-app.production-host.com" />
      </div>

      <Button onClick={goToNextStep} className="mt-6">I deployed my CMS</Button>
    </div>
  );
}

// ------------------------------------------
// TERMINAL STEP 13 — PRODUCTION CHECK
// ------------------------------------------
function TerminalStep13() {
  const { state, updateState, goToNextStep } = usePrototype();
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const isReady = state.publishedStatus === 'confirmed';

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm your live CMS</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Production checklist:</h3>
            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
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
                     <CheckCircle2 className={cn("w-4 h-4 text-black", checkedItems.has(i) ? "opacity-100" : "opacity-0")} />
                  </div>
                  <span className="text-sm text-gray-700 select-none">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mb-6">
             <strong>Note:</strong> Check these items inside your live CMS. TomorrowOS does not verify them for you.
          </div>
          
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => setLocation('/guides/content')}>View content guide</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col gap-4">
        {state.publishedStatus === 'needs_help' && (
           <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
             <div className="font-medium text-amber-900 mb-1">Something is not working?</div>
             <p className="text-amber-800">Ensure your Replit production Secrets match your local environment variables.</p>
           </div>
        )}
        
        {state.publishedStatus === 'confirmed' && (
           <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10 flex items-start gap-2">
             <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
             <div>
               <span className="font-medium text-gray-900 block mb-1">Confirmed</span>
               You confirmed the live CMS is fully operational.
             </div>
           </div>
        )}

        {state.publishedStatus === 'confirmed' ? (
           <Button variant="outline" onClick={() => updateState({ publishedStatus: 'not_started' })}>Undo confirmation</Button>
        ) : (
           <div className="flex gap-2">
             <Button className="flex-1" onClick={() => updateState({ publishedStatus: 'confirmed' })}>Everything is working</Button>
             <Button variant="secondary" onClick={() => updateState({ publishedStatus: 'needs_help' })}>Something is not working</Button>
           </div>
        )}
      </div>

      <div className="pt-6 border-t border-border flex items-center justify-end">
        <Button onClick={goToNextStep} disabled={!isReady}>Continue to device pairing</Button>
      </div>
    </div>
  );
}
