import React, { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, ChevronRight, Copy, TerminalSquare, Database, HardDrive, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { terminalConfig } from '@/lib/terminalConfig';
import { PlaceholderCommand } from './CopyableText';
import { CopyActionBlock } from './CopyActionBlock';
import { PlaceholderText } from './PlaceholderText';
import { NeedHelpDrawer } from './NeedHelpDrawer';
import { isValidHttpsUrl } from '@/lib/utils';
import { useLocation } from 'wouter';
import { DeveloperToolsStrip } from './DeveloperToolsStrip';

export function TerminalJourney() {
  const { state } = usePrototype();
  
  return (
    <div className="flex flex-col min-h-[500px] relative">
      {state.terminalStep === 1 && <TerminalStep1 />}
      {state.terminalStep === 2 && <TerminalStep2 />}
      {state.terminalStep === 3 && <TerminalStep3 />}
      {state.terminalStep === 4 && <TerminalStep4 />}
      {state.terminalStep === 5 && <TerminalStep5 />}
      {state.terminalStep === 6 && <TerminalStep6 />}
      {state.terminalStep === 7 && <TerminalStep7 />}
      {state.terminalStep === 8 && <TerminalStep8 />}
      {state.terminalStep === 9 && <TerminalStep9 />}
      {state.terminalStep === 10 && <TerminalStep10 />}
      {state.terminalStep === 11 && <TerminalStep11 />}
      
      <NeedHelpDrawer context="terminal" />
    </div>
  );
}

// Helper for generic step skeleton to accelerate build
function GenericActionStep({ title, description, children, actionLabel, onComplete }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-gray-600 mb-6">{description}</p>}
      </div>
      
      {children}

      <div className="pt-6 border-t border-border mt-8 flex justify-end">
        <Button onClick={onComplete} className="gap-2">
          {actionLabel} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// 1. BEFORE YOU BEGIN
// ------------------------------------------
function TerminalStep1() {
  const { goToNextStep } = usePrototype();
  const [checked, setChecked] = useState(false);

  return (
    <GenericActionStep 
      title="Prepare your development environment" 
      description="This path is for developers building locally and deploying through their own engineering workflow."
      actionLabel="I confirmed my environment"
      onComplete={goToNextStep}
    >
      <DeveloperToolsStrip />

      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="font-semibold text-gray-900">Requirements:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Node.js <PlaceholderText value={terminalConfig.placeholders.SUPPORTED_NODE_VERSION} fallback="20 or newer" /></li>
            <li><PlaceholderText value={terminalConfig.placeholders.APPROVED_PACKAGE_MANAGERS} fallback="An approved package manager" /></li>
            <li>Git</li>
            <li>Terminal</li>
            <li>Code editor</li>
            <li>Database or data service supported by the starter</li>
            <li>Media storage or CDN supported by the starter</li>
            <li>A suitable Node.js deployment environment</li>
          </ul>

          <div className="space-y-4 border-t border-border pt-6">
            <p className="text-sm font-medium">Run these commands in your own terminal and confirm each tool returns a version number.</p>
            <CopyActionBlock type="command" label="CHECK NODE.JS VERSION" value="node --version" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNodeVersion" />
            <CopyActionBlock type="command" label="CHECK NPM VERSION" value="npm --version" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNpmVersion" />
            <CopyActionBlock type="command" label="CHECK GIT VERSION" value="git --version" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkGitVersion" />
          </div>

          <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mt-6">
            <strong>Clarification:</strong> This guide does not inspect your computer or verify the result.
          </div>
        </CardContent>
      </Card>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 2. CREATE THE PROJECT
// ------------------------------------------
function TerminalStep2() {
  const { state, goToNextStep } = usePrototype();

  return (
    <GenericActionStep 
      title="Create your TomorrowOS project" 
      actionLabel="The CLI has started"
      onComplete={goToNextStep}
    >
      <div className="mb-6">
            <CopyActionBlock type="command" label="Scaffold a new TomorrowOS CMS project" value="npx @tomorrowos/sdk init my_cms" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNodeVersion" />
      </div>

      {/* <div className="flex gap-3 mb-8">
        <Button variant="outline">Open CLI documentation</Button>
      </div> */}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Open your terminal.</li>
            <li>Navigate to your development-project directory.</li>
            <li>Paste the command.</li>
            <li>Press Enter.</li>
            <li>Install dependencies.</li>
          </ol>
        </div>
        <div className="space-y-4">
          <CopyActionBlock type="command" label="Navigate to directory" value="cd my_cms" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNodeVersion" />
          <CopyActionBlock type="command" label="Install dependencies" value="npm install" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNodeVersion" />
        </div>
      </div>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 3. FOLLOW CLI QUESTIONS
// ------------------------------------------
function TerminalStep3() {
  const { goToNextStep, state } = usePrototype();

  return (
    <GenericActionStep 
      title="Brand your app and CMS" 
      description="Edit the brand.json file to brand your app and CMS based on your UI design."
      actionLabel="I completed the CLI questions"
      onComplete={goToNextStep}
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-700">
            <li><strong>Name:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_QUESTION_PROJECT_NAME} fallback="Enter your project name" /></li>
            <li><strong>Tagline:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_QUESTION_TEMPLATE} fallback="Enter the tagline" /></li>
            <li><strong>primaryColor:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_DATABASE_OPTIONS} fallback="Enter priamry colour" /></li>
            <li><strong>secondaryColor:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_MEDIA_OPTIONS} fallback="Enter secondary colour" /></li>
            <li><strong>backgroundColor:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_EXAMPLE_CONTENT_OPTIONS} fallback="Enter background colour" /></li>
            <li><strong>textColor:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_PACKAGE_MANAGER_OPTIONS} fallback="Exter text colour" /></li>
            <li><strong>logoPath:</strong> <PlaceholderText value={terminalConfig.placeholders.CLI_PACKAGE_MANAGER_OPTIONS} fallback="Enter your Logo URL" /></li>
          </ol>
        </CardContent>
      </Card>

      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mb-8">
        <strong>Note:</strong> Your app will be branded after it is connected to your CMS.
      </div>

    </GenericActionStep>
  );
}

// ------------------------------------------
// 4. REVIEW THE GENERATED PROJECT
// ------------------------------------------
function TerminalStep4() {
  const { goToNextStep } = usePrototype();

  return (
    <GenericActionStep 
      title="Review the generated project" 
      actionLabel="I opened the generated project"
      onComplete={goToNextStep}
    >
      {/* <PlaceholderCommand value="cd {{PROJECT_NAME}}" fallback="Command available soon." /> */}
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">You should now see:</h3>
          <ul className="space-y-3">
            {[
              "Project directory created",
              "TomorrowOS dependencies added",
              "Environment template created",
              "Starter configuration created",
              "Example content included when selected",
              "README or setup instructions generated"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600 mt-6">
        Open the generated README before changing project files. It contains the configuration required by the selected starter.
      </div>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 5. CONFIGURE ENVIRONMENT VARIABLES
// ------------------------------------------
function TerminalStep5() {
  const { goToNextStep, state } = usePrototype();

  const [, setLocation] = useLocation();

  return (
    <GenericActionStep 
      title="Configure local environment variables" 
      description="Configure your database and media storage in the .env file."
      actionLabel="I selected my infrastructure"
      onComplete={goToNextStep}
    >
      <div className="space-y-6">
        {/* Database */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded">
                <Database className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold">Application data</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 ml-14">Connect the database or data service used by your CMS.</p>
            <div className="ml-14">
            <PlaceholderText 
              block
              value={terminalConfig.placeholders.SUPPORTED_DATABASE_OPTIONS}
              fallback={
                "TOMORROWOS_STORE=supabase\nSUPABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres\nDATABASE_SSL=true"
              }
            />
            </div>
            <div className="ml-14 mt-3">
               <a href="/guides/supabase" onClick={(e) => { e.preventDefault(); setLocation('/guides/supabase'); }} className="text-sm font-medium text-black hover:underline">Need a database? View Supabase guide</a>
            </div>
          </CardContent>
        </Card>

        {/* Media Storage */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded">
                <HardDrive className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold">Media storage and delivery</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 ml-14">Connect your object storage, asset service or CDN.</p>
            <div className="ml-14">
              <PlaceholderText block value={terminalConfig.placeholders.SUPPORTED_MEDIA_STORAGE_OPTIONS} fallback=
              {"CLOUDINARY_CLOUD_NAME=\nCLOUDINARY_API_KEY=\nCLOUDINARY_API_SECRET=\nCLOUDINARY_FOLDER="} />
            </div>
            <div className="ml-14 mt-3">
               <a href="/guides/cloudinary" onClick={(e) => { e.preventDefault(); setLocation('/guides/cloudinary'); }} className="text-sm font-medium text-black hover:underline">Need media storage? View Cloudinary guide</a>
            </div>
          </CardContent>
        </Card>

        {/* Hosting */}
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded">
                <Server className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold">Application hosting</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 ml-14">Choose an environment capable of running the TomorrowOS backend requirements.</p>
            <div className="ml-14">
              <PlaceholderText block value={terminalConfig.placeholders.SUPPORTED_HOSTING_REQUIREMENTS} fallback="Available soon — pending engineering confirmation" />
            </div>
          </CardContent>
        </Card> */}
      </div>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 6. CONFIGURE ENVIRONMENT VARIABLES
// ------------------------------------------
// function TerminalStep6() {
//   const { goToNextStep, state } = usePrototype();

//   return (
//     <GenericActionStep 
//       title="Configure local environment variables" 
//       actionLabel="I configured my local environment"
//       onComplete={goToNextStep}
//     >
//       <div className="mb-6">
//         <PlaceholderText block value={terminalConfig.placeholders.CONFIRMED_LOCAL_ENV_FILENAME} fallback=".env.local" className="font-mono bg-white" />
//       </div>

//       <div className="space-y-8">
//         <div>
//           <h3 className="font-bold text-lg mb-3 border-b pb-2">Core TomorrowOS</h3>
//           <PlaceholderText block value={terminalConfig.placeholders.REQUIRED_CORE_ENVIRONMENT_VARIABLES} fallback="Variables available soon — pending engineering confirmation." className="bg-white" />
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-3 border-b pb-2">Database</h3>
//           <PlaceholderText block value={terminalConfig.placeholders.SELECTED_DATABASE_ENVIRONMENT_VARIABLES} fallback="Variables available soon — pending engineering confirmation." className="bg-white" />
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-3 border-b pb-2">Media storage</h3>
//           <PlaceholderText block value={terminalConfig.placeholders.SELECTED_MEDIA_ENVIRONMENT_VARIABLES} fallback="Variables available soon — pending engineering confirmation." className="bg-white" />
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-3 border-b pb-2">Optional</h3>
//           <PlaceholderText block value={terminalConfig.placeholders.OPTIONAL_ENVIRONMENT_VARIABLES} fallback="Variables available soon — pending engineering confirmation." className="bg-white" />
//         </div>
//       </div>

//       <Card className="mt-8 border-red-200">
//         <CardContent className="p-6">
//           <h3 className="font-bold text-red-900 mb-2">Keep secrets out of source control</h3>
//           <ul className="list-disc pl-5 space-y-1 text-sm text-red-800">
//             <li>Do not commit your environment file.</li>
//             <li>Do not hard-code secrets.</li>
//             <li>Do not paste secrets into screenshots.</li>
//             <li>Do not expose server credentials to browser code.</li>
//           </ul>
//           <div className="mt-4 flex items-center gap-2 text-sm font-medium">
//              <input type="checkbox" id="git-check" className="rounded border-gray-300" />
//              <label htmlFor="git-check">Environment file excluded from Git</label>
//           </div>
//         </CardContent>
//       </Card>
//     </GenericActionStep>
//   );
// }

// ------------------------------------------
// 6. INITIALISE THE PROJECT
// ------------------------------------------
// function TerminalStep6() {
//   const { goToNextStep, state } = usePrototype();

//   return (
//     <GenericActionStep 
//       title="Initialise your project" 
//       actionLabel="I initialised the project"
//       onComplete={goToNextStep}
//     >
//       <div className="space-y-6">
//         <div>
//           <h3 className="font-semibold text-gray-900 mb-2">Install dependencies</h3>
//           <PlaceholderCommand value={terminalConfig.placeholders.INSTALL_DEPENDENCIES_COMMAND} fallback="Command available soon." />
//         </div>
        
//         <div>
//           <h3 className="font-semibold text-gray-900 mb-2">Database initialisation</h3>
//           <PlaceholderCommand value={terminalConfig.placeholders.DATABASE_INITIALISATION_COMMAND} fallback="Command available soon." />
//           <p className="text-xs text-gray-500 mt-2">Only run this command when the selected starter requires a migration or schema setup step.</p>
//         </div>

//         <div>
//           <h3 className="font-semibold text-gray-900 mb-2">Optional sample content</h3>
//           <PlaceholderCommand value={terminalConfig.placeholders.OPTIONAL_SAMPLE_CONTENT_COMMAND} fallback="Command available soon." />
//         </div>
//       </div>
//     </GenericActionStep>
//   );
// }

// ------------------------------------------
// 6. RUN LOCALLY
// ------------------------------------------
function TerminalStep6() {
  const { goToNextStep, state, updateState } = usePrototype();
  const [localUrl, setLocalUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUrl(e.target.value);
    if (e.target.value && !e.target.value.startsWith('http://') && !e.target.value.startsWith('https://')) {
      setUrlError('URL must start with http:// or https://');
    } else {
      try {
        if (e.target.value) new URL(e.target.value);
        setUrlError('');
      } catch (err) {
        setUrlError('Invalid URL format');
      }
    }
  };

  const handleOpenLocal = () => {
    if (localUrl && !urlError) {
      window.open(localUrl, '_blank');
    } else if (state.prototypeReviewMode) {
      window.open('http://localhost:3000', '_blank');
    }
  };

  const hasValidUrl = !!(localUrl && !urlError);

  return (
    <GenericActionStep 
      title="Run your CMS locally" 
      actionLabel="My local CMS opened"
      onComplete={goToNextStep}
    >
      <div className="flex justify-between items-center mb-2">
         <span className="font-semibold text-gray-900">Start the development server</span>
      </div>
          <CopyActionBlock type="command" label="Start the project" value="npm start" copiedMessage="Copied — run in your terminal" sourceKey="terminal.checkNodeVersion" />
      
      <div className="bg-gray-50 p-4 border rounded font-mono text-sm text-center my-6 flex flex-col items-center justify-center gap-4">
        <div>http://localhost:<PlaceholderText value={terminalConfig.placeholders.DEFAULT_PORT} fallback="3000" /></div>
        <div className="w-full max-w-sm">
          <input 
            type="url" 
            placeholder="e.g. http://localhost:3000" 
            value={localUrl}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border rounded-md text-center text-sm font-sans mb-1"
          />
          {urlError && <p className="text-red-500 text-xs mt-1 text-left">{urlError}</p>}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleOpenLocal}
          disabled={!hasValidUrl && !state.prototypeReviewMode}
        >
          Open local CMS
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center mb-6">
        Keep the terminal process running while using the local CMS.
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" className="text-gray-500" onClick={() => updateState({ terminalReadinessStatus: 'needs_help' })}>I have an error</Button>
      </div>
      
      {state.terminalReadinessStatus === 'needs_help' && (
        <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md mt-4">
          <div className="font-medium text-amber-900 mb-1">Need help?</div>
          <p className="text-amber-800">Use the Need Help button to view common local server blockers.</p>
        </div>
      )}
    </GenericActionStep>
  );
}

// ------------------------------------------
// 7. CONFIRM LOCAL SETUP
// ------------------------------------------
function TerminalStep7() {
  const { goToNextStep } = usePrototype();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const next = new Set(checkedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedItems(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm your local CMS</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="grid gap-y-4">
              {[
                "Development server is running",
                "CMS opens in the browser",
                "Required application data is available",
                "Media upload or retrieval works",
                "Branding or starter configuration loads",
                "No blocking error appears"
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
          <p className="text-xs text-gray-500">This guide does not inspect your local application. Confirm each result in your terminal and browser.</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline">Open local CMS</Button>
        <Button variant="outline">View troubleshooting</Button>
      </div>

      <div className="pt-6 border-t border-border mt-8 flex justify-end">
        <Button onClick={goToNextStep} className="gap-2">
          Local checks confirmed <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------
// 8. CHOOSE A DEPLOYMENT HOST
// ------------------------------------------
function TerminalStep8() {
  const { goToNextStep, state } = usePrototype();

  return (
    <GenericActionStep 
      title="Choose where to deploy" 
      description="Deploy to a hosting environment that satisfies the TomorrowOS backend and runtime requirements."
      actionLabel="I selected a deployment host"
      onComplete={goToNextStep}
    >
      <Card className="mb-6 bg-gray-50">
        <CardContent className="p-6">
           <h3 className="font-semibold text-gray-900 mb-4">Requirements:</h3>
           <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
             <li><PlaceholderText value={terminalConfig.placeholders.NODE_RUNTIME_REQUIREMENT} fallback="Node.js 20 or newer" /></li>
             <li><PlaceholderText value={terminalConfig.placeholders.PERSISTENT_PROCESS_REQUIREMENT} fallback="Persistent process" /></li>
             <li><PlaceholderText value={terminalConfig.placeholders.WEBSOCKET_REQUIREMENT} fallback="WebSocket support" /></li>
             <li><PlaceholderText value={terminalConfig.placeholders.ENVIRONMENT_VARIABLE_REQUIREMENT} fallback="Environment variable management" /></li>
             <li><PlaceholderText value={terminalConfig.placeholders.STORAGE_OR_STATE_REQUIREMENT} fallback="Storage or state support" /></li>
             <li><PlaceholderText value={terminalConfig.placeholders.HTTPS_REQUIREMENT} fallback="HTTPS termination" /></li>
           </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {/* Placeholder Provider Cards until engineering confirms */}
        <Card className="border-green-200">
           <CardContent className="p-4 flex items-center justify-between">
             <div>
               <h4 className="font-bold text-gray-900">Provider Example</h4>
               <p className="text-sm text-gray-500">Tested • Node Runtime • Supported variables</p>
             </div>
             <Button variant="outline" size="sm">View guide</Button>
           </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">Using another host?</p>
        <Button variant="ghost">View deployment requirements</Button>
      </div>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 9. ADD PRODUCTION VARIABLES
// ------------------------------------------
function TerminalStep9() {
  const { goToNextStep } = usePrototype();

  return (
    <GenericActionStep 
      title="Add production environment variables" 
      description="Your local environment file is not automatically available to your deployed application."
      actionLabel="I added the production variables"
      onComplete={goToNextStep}
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Open the environment-variable or secrets area for your host.</li>
            <li>Add each required production variable.</li>
            <li>Confirm the names match exactly.</li>
            <li>Save the configuration.</li>
            <li>Redeploy when required.</li>
          </ol>
        </div>
        <div>
           <h3 className="font-semibold text-gray-900 mb-4">Required groups:</h3>
           <ul className="space-y-2 text-sm text-gray-700">
             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Core TomorrowOS variables</li>
             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Database variables</li>
             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Media-storage variables</li>
             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" /> Deployment-specific variables</li>
           </ul>
        </div>
      </div>

      <div className="bg-gray-50 border border-border p-4 rounded-md text-sm text-gray-600">
        <strong>Clarification:</strong> This guide does not read or verify your production secrets.
      </div>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 10. DEPLOY
// ------------------------------------------
function TerminalStep10() {
  const { state, updateState, goToNextStep } = usePrototype();
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
    <GenericActionStep 
      title="Deploy your CMS" 
      actionLabel="I deployed my CMS"
      onComplete={goToNextStep}
    >
      {/* <div className="mb-8">
        <PlaceholderCommand value={terminalConfig.placeholders.APPROVED_DEPLOYMENT_COMMAND} fallback="Deployment command available soon." />
      </div> */}

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your host should now:</h3>
          <ul className="space-y-3">
            {[
              "Install dependencies",
              "Build application",
              "Start backend",
              "Apply production variables",
              "Expose HTTPS URL"
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <label className="font-medium text-gray-900 block mb-2">Save your CMS link in this browser</label>
          <p className="text-sm text-gray-500 mb-4">
            This optional URL is stored locally for onboarding convenience. TomorrowOS does not sign into, control or verify your CMS.
          </p>
          <input 
            type="url" 
            placeholder="https://..." 
            value={url}
            onChange={handleUrlChange}
            className="w-full max-w-md px-3 py-2 border rounded-md"
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        </CardContent>
      </Card>
    </GenericActionStep>
  );
}

// ------------------------------------------
// 11. CONFIRM THE LIVE CMS
// ------------------------------------------
function TerminalStep11() {
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm your live CMS</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="grid gap-y-4">
              {[
                "Public HTTPS URL opens",
                "CMS interface loads",
                "Backend starts successfully",
                "Database or application data is available",
                "Media storage works",
                "Test media can be uploaded or retrieved",
                "No blocking production error is visible"
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
          <p className="text-xs text-gray-500">This status is based on your confirmation.</p>
        </CardContent>
      </Card>

      <div className="flex gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={handleOpenCms}
          disabled={!hasCmsUrl && !state.prototypeReviewMode}
          title={!hasCmsUrl && !state.prototypeReviewMode ? 'Save a CMS URL in the previous step' : ''}
        >
          Open my CMS
        </Button>
        <Button variant="outline" onClick={() => updateState({ terminalPublishedStatus: 'confirmed' })}>Everything is working</Button>
        <Button variant="outline" onClick={() => updateState({ terminalPublishedStatus: 'needs_help' })}>Something is not working</Button>
      </div>

      {state.terminalPublishedStatus === 'needs_help' && (
        <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md">
          <div className="font-medium text-amber-900 mb-1">Need help?</div>
          <p className="text-amber-800">Use the Need Help button to view common deployment blockers.</p>
        </div>
      )}

      {state.terminalPublishedStatus === 'confirmed' && (
        <div className="pt-6 border-t border-border mt-8 flex justify-end">
          <Button onClick={goToNextStep} className="gap-2">
            Production checks confirmed <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
