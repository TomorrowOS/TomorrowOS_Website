import React from 'react';
import { useGuideSeo, GuideBreadcrumbs } from '@/components/GuideSeo';
import { useLocation } from 'wouter';
import { usePrototype } from '@/components/PrototypeProvider';
import { getResumeSetupPath } from '@/lib/onboardingPaths';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CopyActionBlock } from '@/components/CopyActionBlock';

export default function GuideCloudinary() {
  useGuideSeo('/guides/cloudinary');
  const [, setLocation] = useLocation();
  const { state } = usePrototype();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-32 animate-in fade-in">
      <GuideBreadcrumbs path="/guides/cloudinary" />
      <Button variant="tertiary" onClick={() => setLocation(getResumeSetupPath(state))} className="mb-4">
        ← Back to setup
      </Button>

      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
          Connect Cloudinary to TomorrowOS
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Cloudinary stores and delivers the images and videos used by your TomorrowOS CMS.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 mt-0">I'm new to Cloudinary</h3>
              <p className="text-sm text-gray-600 mb-4">Create a free account and connect your first product environment.</p>
              <Button variant="secondary" className="w-full">Create a Cloudinary account</Button>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 mt-0">I already have a Cloudinary account</h3>
              <p className="text-sm text-gray-600 mb-4">Sign in and select the product environment you want to connect.</p>
              <Button variant="secondary" className="w-full">Sign in to Cloudinary</Button>
            </CardContent>
          </Card>
        </div>

        <h2>Flow A — I'm new to Cloudinary</h2>
        
        <h3>1. Create your Cloudinary account</h3>
        <p>Open Cloudinary and create an account. You can sign up using the available account options shown by Cloudinary.<br/>
        <Button variant="outline" size="sm" className="mt-2 mb-2">Open Cloudinary</Button></p>
        <p><em>Note: Keep this guide open — Cloudinary will open in a new browser tab.</em></p>

        <h3>2. Complete the Cloudinary account setup</h3>
        <p>Follow the Cloudinary onboarding prompts until you reach the Console. When setup is complete, you should see your current Product Environment and its Cloud name.</p>
        <p><em>(A Cloudinary product environment contains its own assets, API credentials and settings. Free Cloudinary accounts support one product environment.)</em></p>

        <hr className="my-12 border-gray-200" />

        <h2>Flow B — I already have a Cloudinary account</h2>
        
        <h3>1. Sign in to Cloudinary</h3>
        <p>Sign in to your existing Cloudinary account.<br/>
        <Button variant="outline" size="sm" className="mt-2 mb-2">Open Cloudinary</Button></p>

        <h3>2. Select your product environment</h3>
        <p>Open the product environment you want TomorrowOS to use.</p>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 my-4">
          <p className="m-0 text-sm text-blue-900"><strong>IMPORTANT:</strong> Your Cloud name, API key and API secret must all come from the same product environment. When your account contains multiple environments, confirm the correct environment is selected before copying the credentials.</p>
        </div>

        <hr className="my-12 border-gray-200" />

        <h2>Shared flow — Find your Cloudinary credentials</h2>

        <h3>1. Open API Keys</h3>
        <p>From the Cloudinary Console:</p>
        <ol>
          <li>Open the dashboard or Home page.</li>
          <li>Select <strong>Go to API Keys</strong>.</li>
        </ol>
        <p>When that button is not visible: Select Settings in the navigation, then open API Keys.</p>

        <h3>2. Locate the three required values</h3>
        <p>TomorrowOS requires three separate Cloudinary values. Exact mapping:</p>
        
        <table className="w-full text-left text-sm mt-4 mb-4">
          <thead>
            <tr className="border-b">
              <th className="pb-2">In Cloudinary</th>
              <th className="pb-2">In your environment</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Cloud name</td>
              <td className="py-2 font-mono text-xs">CLOUDINARY_CLOUD_NAME</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">API key</td>
              <td className="py-2 font-mono text-xs">CLOUDINARY_API_KEY</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">API secret</td>
              <td className="py-2 font-mono text-xs">CLOUDINARY_API_SECRET</td>
            </tr>
          </tbody>
        </table>

        <p><em>Do not copy the key name: the Cloudinary page may show a display name or label for the API key. TomorrowOS needs the actual Cloud name, API key value, and API secret value.</em></p>

        <h2>Add the values to your project</h2>

        <h3>3. Add your Cloud name</h3>
        <p>In Cloudinary, copy the value labelled "Cloud name". Return to your project environment and add:</p>
        <CopyActionBlock
          type="variable"
          value="CLOUDINARY_CLOUD_NAME"
          copiedMessage="Copied — add to your environment"
          destinationHint="Add this variable in your project's environment settings. Its value is your Cloudinary Cloud name (example: ukx17pqh)."
          sourceKey="cloudinary.cloudNameVar"
          className="not-prose my-4"
        />

        <h3>4. Add your API key</h3>
        <p>In Cloudinary, copy the value labelled "API key". Return to your project environment and add:</p>
        <CopyActionBlock
          type="variable"
          value="CLOUDINARY_API_KEY"
          copiedMessage="Copied — add to your environment"
          destinationHint="Add this variable in your project's environment settings. Its value is your Cloudinary API key."
          sourceKey="cloudinary.apiKeyVar"
          className="not-prose my-4"
        />

        <h3>5. Add your API secret</h3>
        <p>In Cloudinary, reveal or copy the value labelled "API secret". Return to your project environment and add:</p>
        <CopyActionBlock
          type="variable"
          value="CLOUDINARY_API_SECRET"
          copiedMessage="Copied — add to your environment"
          destinationHint="Add this variable in your project's environment settings. Its value is your Cloudinary API secret — store the value itself only in secure environment variables."
          sourceKey="cloudinary.apiSecretVar"
          className="not-prose my-4"
        />

        <div className="bg-warning/10 p-4 rounded-md border border-warning/20 my-4">
          <p className="m-0 text-sm text-amber-900"><strong>Security warning:</strong> never paste your API secret into: AI builder prompts (Replit Agent, v0), application source code, GitHub, screenshots, support emails or messages, or public documentation. Store it only through secure environment variables.</p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="mt-0">Next steps</h2>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button onClick={() => setLocation('/guides/content#upload-media')}>Continue to media upload</Button>
            <Button variant="outline" onClick={() => setLocation(getResumeSetupPath(state))}>Return to setup</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
