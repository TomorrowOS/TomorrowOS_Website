import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function GuideSupabase() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-32 animate-in fade-in">
      <Button variant="tertiary" onClick={() => setLocation('/start')} className="mb-4">
        ← Back to setup
      </Button>

      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
          Connect Supabase to TomorrowOS
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Supabase provides the database used by your TomorrowOS CMS.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 mt-0">I'm new to Supabase</h3>
              <p className="text-sm text-gray-600 mb-4">Create an account, organisation and project.</p>
              <Button variant="secondary" className="w-full">Start new account setup</Button>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 mt-0">I already have a Supabase account</h3>
              <p className="text-sm text-gray-600 mb-4">Sign in and open an existing project—or create a new one.</p>
              <Button variant="secondary" className="w-full">Use my existing account</Button>
            </CardContent>
          </Card>
        </div>

        <h2>Flow A — I'm new to Supabase</h2>
        
        <h3>1. Create your Supabase account</h3>
        <p>
          Open Supabase and create an account.<br/>
          <Button variant="outline" size="sm" className="mt-2 mb-2">Open Supabase</Button><br/>
          <em>Note: Keep this guide open — Supabase will open in a new browser tab. Keep this TomorrowOS guide open so you can return to it during setup.</em>
        </p>

        <h3>2. Create your organisation</h3>
        <p>Every Supabase project belongs to an organisation.</p>
        <ul>
          <li><strong>Organisation name:</strong> Your business or project name</li>
          <li><strong>Type:</strong> Select the option that best describes you</li>
          <li><strong>Plan:</strong> Select the appropriate plan for your project</li>
        </ul>
        <p>Then select: <strong>Create organisation</strong></p>

        <h3>3. Create your project</h3>
        <p>Select <strong>New project</strong> and complete the required fields.</p>
        <ul>
          <li><strong>Project name:</strong> Choose a recognisable name. Example: Acme TomorrowOS CMS</li>
          <li><strong>Database password:</strong> Create a strong database password and save it securely. You will need this password later. It is different from your Supabase account password.</li>
          <li><strong>Region:</strong> Choose the region approved or closest to you or customers geographically for your TomorrowOS deployment.</li>
          <li><strong>Security settings:</strong> Leave the default security settings unchanged unless TomorrowOS specifically instructs otherwise.</li>
          <li><strong>GitHub connection:</strong> Connecting GitHub is optional and is not required for this setup.</li>
        </ul>
        <p>Select: <strong>Create new project</strong></p>

        <h3>4. Wait for your project to become ready</h3>
        <p>Supabase may take a few moments to create the database. Do not continue until the project dashboard has opened successfully.</p>

        <hr className="my-12 border-gray-200" />

        <h2>Flow B — I already have a Supabase account</h2>
        
        <h3>1. Sign in to Supabase</h3>
        <p>Sign in using your existing account.<br/>
        <Button variant="outline" size="sm" className="mt-2 mb-2">Open Supabase</Button></p>

        <h3>2. Open or create a project</h3>
        <ul>
          <li><strong>I already have a project:</strong> Open the project you want to connect to TomorrowOS.</li>
          <li><strong>I do not have a project yet:</strong> Select <strong>New project</strong> and follow the project-creation instructions above.</li>
        </ul>
        <p><em>Note: TomorrowOS should use a dedicated or approved project. Do not connect an unrelated production database unless you understand the impact.</em></p>

        <hr className="my-12 border-gray-200" />

        <h2>Shared flow — Connect Supabase to TomorrowOS</h2>

        <h3>1. Open the connection settings</h3>
        <p>From your Supabase project dashboard, select the green <strong>Connect</strong> button at the top of the page.</p>

        <h3>2. Select the approved connection method</h3>
        <p>In the connection window:</p>
        <ul>
          <li>Select Direct</li>
          <li>Under Connection Method, select <strong>Direct connection (recommended)</strong></li>
          <li>Under Type, select <strong>URI</strong></li>
        </ul>

        <h3>3. Copy the database connection string</h3>
        <p>Scroll to Connection string and select the copy icon.<br/>
        A connection string looks similar to:<br/>
        <code>postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnopqrst.supabase.co:5432/postgres</code><br/>
        Your value will contain a different project address.</p>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 my-4">
          <p className="m-0 text-sm text-blue-900"><strong>IMPORTANT TERMINOLOGY:</strong> This is your <strong>Postgres database connection string</strong>. It is NOT the Supabase Project URL found in the API settings. Always use one consistent term: <strong>Supabase Postgres connection string</strong>. Never say only "Supabase URL" or "Project URL".</p>
        </div>

        <h3>4. Replace the password placeholder</h3>
        <p>The copied connection string may contain <code>[YOUR-PASSWORD]</code>. Replace the entire placeholder — including the square brackets — with the database password created when the project was set up.</p>
        <p>
          Before: <code>postgresql://postgres:[YOUR-PASSWORD]@...</code><br/>
          After: <code>postgresql://postgres:ExamplePassword123@...</code><br/>
          <em>(ExamplePassword123 is only an example. Use your real database password.)</em>
        </p>

        <h3>5. Forgot your database password?</h3>
        <p>From Supabase, open Database → Settings, then reset the database password. After resetting it, update the connection string in your environment before testing again. Or simply click "Reset database password" above the connection string to reset it.</p>

        <h2>Connect it to your project</h2>

        <h3>6. Add the connection string</h3>
        <p>Add your Supabase connection to your project: when TomorrowOS or your setup tool asks for your Supabase connection, use the complete Postgres connection string prepared above.</p>
        
        <p><strong>Required Environment Variable:</strong></p>
        <ul>
          <li>Key: <code>SUPABASE_URL</code></li>
          <li>Value: Your complete Supabase Postgres connection string</li>
        </ul>

        <p><strong>Where to add it:</strong></p>
        <ul className="list-disc pl-5">
           <li className="mb-2"><strong>In Replit:</strong> Open All Tools → Secrets. Create a Secret named <code>SUPABASE_URL</code> and paste the string as its value.</li>
           <li className="mb-2"><strong>In Vercel:</strong> Open Project Settings → Environment Variables. Add <code>SUPABASE_URL</code> and map it to your environments.</li>
           <li className="mb-2"><strong>Local/Terminal:</strong> Add <code>SUPABASE_URL=...</code> to your <code>.env</code> file.</li>
        </ul>

        <p>Providers encrypt values stored through Secrets and expose them to the application as environment variables. Database credentials should not be hard-coded into code.</p>

        <div className="bg-warning/10 p-4 rounded-md border border-warning/20 my-4">
          <p className="m-0 text-sm text-amber-900"><strong>Security warning:</strong> never paste the connection string into: a public chat prompt (e.g. Replit Agent, v0), your application code, GitHub, a screenshot, or a support message.</p>
        </div>
      </div>
    </div>
  );
}
