import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown, Check, ExternalLink, Info, Lock, Monitor, Package, FileText, Github, MessageSquare, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CopyableText } from './CopyableText';
import GithubIcon from './GithubIcon';
import { usePrototype } from './PrototypeProvider';
import { serverSdkConfig, getEffectiveServerSdkStatus } from '@/lib/serverSdkConfig';
import { onboardingPaths } from '@/lib/onboardingPaths';

function ExternalAction({ href, children, icon, variant = 'outline' }: { href: string; children: React.ReactNode; icon?: React.ReactNode; variant?: 'outline' | 'default' }) {
  return (
    <Button asChild variant={variant} className="gap-2">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {children} <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </Button>
  );
}

function FlowNode({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex-1 min-w-0 border border-border rounded-lg bg-white p-4 text-center">
      <p className="font-semibold text-sm text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

export function ServerSdkJourney() {
  const { state } = usePrototype();
  const status = getEffectiveServerSdkStatus();
  const statusLabel = serverSdkConfig.statusLabels[status];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h2 className="text-2xl font-bold text-gray-900">Integrate the Server SDK</h2>
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-[#2563EB]/10 text-[#1D4ED8] border border-[#2563EB]/30">{statusLabel}</span>
        </div>
        <p className="text-gray-600 mb-4">
          Add TomorrowOS to an existing Node.js or TypeScript backend application.
        </p>
        <div className="flex flex-wrap gap-2">
          <ExternalAction
            href={serverSdkConfig.links.docs}
            icon={
              <img
                src={`${import.meta.env.BASE_URL}assets/brand/tomorrowos-mark.svg`}
                alt=""
                className="w-4 h-4 object-contain"
              />
            }
          >
            View SDK documentation
          </ExternalAction>
          <ExternalAction
            href={serverSdkConfig.links.npm}
            icon={
              <img
                src={`${import.meta.env.BASE_URL}assets/platforms/npm-logo.svg`}
                alt=""
                className="w-6 h-4 object-contain"
              />
            }
          >
            View npm package
          </ExternalAction>
          <ExternalAction
            href={serverSdkConfig.links.github}
            icon={<GithubIcon className="w-4 h-4" />}
          >
            View on GitHub
          </ExternalAction>
        </div>
      </section>

      {/* Status callout */}
      <div className="flex gap-3 bg-gray-50 border border-border rounded-lg p-4 text-sm text-gray-700">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" />
        <p>{serverSdkConfig.statusCallout}</p>
      </div>

      {/* Path comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Is the Server SDK right for your project?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Choose the Server SDK when:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Your backend uses Node.js or TypeScript.',
                  'You want TomorrowOS integrated directly into your application.',
                  'You require backend access to devices, content, policies, commands and events.',
                  'You control the backend deployment environment.',
                ].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Choose the HTTP API when:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Your backend uses another language.',
                  'You need a language-neutral integration.',
                  'You prefer standard HTTP requests.',
                ].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />{t}</li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <Link href={onboardingPaths.existingProject.api}>Switch to HTTP API</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verified installation */}
      <Card>
        <CardHeader>
          <CardTitle>Install the package</CardTitle>
          <CardDescription>Add the TomorrowOS Server SDK to your project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CopyableText text={serverSdkConfig.installCommand} />
          <a
            href={serverSdkConfig.links.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
          >
            View npm package <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </CardContent>
      </Card>

      {/* Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>How the Server SDK fits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <FlowNode title="Your product" subtitle="CMS · SaaS · Application" />
            <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 hidden md:block" />
            <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 self-center md:hidden" />
            <FlowNode title="TomorrowOS Server SDK" subtitle="Devices · Content · Policies · Commands · Events" />
            <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 hidden md:block" />
            <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 self-center md:hidden" />
            <FlowNode title="TomorrowOS Runtime" subtitle="Playback · Storage · Offline operation" />
            <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 hidden md:block" />
            <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 self-center md:hidden" />
            <FlowNode title="Supported screens" subtitle="Signage displays" />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Your application owns the user experience, workflows, business logic and data. TomorrowOS provides the shared screen and playback infrastructure underneath.
          </p>
        </CardContent>
      </Card>

      {/* Capability areas */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What the Server SDK provides</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Device management', copy: 'Onboard and manage supported screens.' },
            { title: 'Content and policies', copy: 'Manage content, playlists, schedules and playback rules.' },
            { title: 'Commands', copy: 'Send supported device and runtime commands.' },
            { title: 'Events', copy: 'Receive device, playback and system updates.' },
          ].map((c) => (
            <Card key={c.title}>
              <CardContent className="p-5">
                <h4 className="font-semibold text-gray-900 mb-1">{c.title}</h4>
                <p className="text-sm text-gray-600">{c.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Backend security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gray-700" />
            <CardTitle>Use the SDK from your backend</CardTitle>
          </div>
          <CardDescription>The Server SDK is intended for secure backend environments.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Do not expose privileged credentials in frontend code.',
              'Do not bundle the Server SDK into browser applications.',
              'Store secrets through protected environment variables.',
              'Do not commit credentials to Git.',
            ].map((t) => (
              <li key={t} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />{t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>Server SDK readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Server SDK readiness by area</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {serverSdkConfig.readiness.map((row, i) => (
                  <tr key={row.item} className={cn(i !== 0 && 'border-t border-border')}>
                    <td className="px-4 py-2.5 text-gray-700">{row.item}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={cn(
                        'inline-block text-xs font-medium px-2 py-0.5 rounded border',
                        row.status === 'Available'
                          ? 'bg-gray-100 text-gray-900 border-border'
                          : 'bg-white text-gray-500 border-border'
                      )}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            We will publish method-level examples only after they have been verified against the current package release.
          </p>
        </CardContent>
      </Card>

      {/* Developer resources */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue with the current SDK</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <Package className="w-5 h-5 text-gray-700 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Review the package</h4>
              <p className="text-sm text-gray-600 mb-4">Inspect the current package metadata, README and release history.</p>
              <div className="mt-auto">
                <a href={serverSdkConfig.links.npm} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:opacity-70 underline underline-offset-2">
                  View npm package <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <Github className="w-5 h-5 text-gray-700 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Review the source</h4>
              <p className="text-sm text-gray-600 mb-4">Follow implementation progress, issues and changes.</p>
              <div className="mt-auto flex flex-col gap-1.5">
                <a href={serverSdkConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:opacity-70 underline underline-offset-2">
                  View GitHub <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href={serverSdkConfig.links.community} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:opacity-70 underline underline-offset-2">
                  Join the discussion <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <FileText className="w-5 h-5 text-gray-700 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Read the documentation</h4>
              <p className="text-sm text-gray-600 mb-4">Use the latest verified setup and integration guidance.</p>
              <div className="mt-auto">
                <a href={serverSdkConfig.links.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:opacity-70 underline underline-offset-2">
                  Open SDK docs <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shared device journey lock */}
      <div className="border-t border-border pt-6">
        {serverSdkConfig.verifiedIntegrationMilestone ? null : (
          <div className="flex gap-3 bg-gray-50 border border-border rounded-lg p-4 text-sm text-gray-600">
            <Lock className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
            <p>
              Device setup — player download, installation, pairing and content deployment — unlocks after a verified integration milestone is available for the Server SDK. Method-level examples are being verified against the current release.
            </p>
          </div>
        )}
      </div>

      {/* Prototype Review Mode: outstanding engineering requirements */}
      {state.prototypeReviewMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="w-4 h-4 text-amber-700" />
            <h4 className="font-semibold text-amber-900 text-sm uppercase tracking-wide">Prototype review — missing SDK contract details</h4>
          </div>
          <p className="text-sm text-amber-800 mb-3">
            Stable mode remains disabled until engineering verifies the following against the current package release:
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-amber-900">
            {serverSdkConfig.outstandingEngineeringRequirements.map((r) => (
              <li key={r} className="flex gap-2"><MessageSquare className="w-3.5 h-3.5 mt-1 shrink-0 text-amber-500" />{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
