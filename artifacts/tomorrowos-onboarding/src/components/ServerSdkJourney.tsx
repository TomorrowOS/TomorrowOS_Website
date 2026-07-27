import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { terminalConfig } from '@/lib/terminalConfig';
import { PlaceholderCommand } from './CopyableText';
import { PlaceholderText } from './PlaceholderText';
import { usePrototype } from './PrototypeProvider';

export function ServerSdkJourney() {
  const { updateState } = usePrototype();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Integrate the Server SDK</h2>
        <p className="text-gray-600">
          Add TomorrowOS to an existing backend application using our Node.js Server SDK.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Install SDK</CardTitle>
          <CardDescription>Add the TomorrowOS Server SDK to your project.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_INSTALL_COMMAND} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Initialise client</CardTitle>
          <CardDescription>Configure the SDK with your API credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand multiline value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_INIT_CODE} fallback="Code snippet available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backend-only security guidance</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-2">
          <p>The Server SDK is designed for secure backend environments.</p>
          <ul className="list-disc pl-5">
            <li>Never expose your Server SDK secret key to client applications.</li>
            <li>Do not bundle the Server SDK into frontend code (e.g., React, Vue).</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device pairing</CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand multiline value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_PAIRING_CODE} fallback="Code snippet available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand multiline value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_CONTENT_DELIVERY_CODE} fallback="Code snippet available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy control</CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand multiline value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_POLICY_CONTROL_CODE} fallback="Code snippet available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commands and events</CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceholderCommand multiline value={terminalConfig.placeholders.OFFICIAL_SERVER_SDK_COMMANDS_EVENTS_CODE} fallback="Code snippet available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Architecture flow</CardTitle>
        </CardHeader>
        <CardContent>
          <PlaceholderText block value={terminalConfig.placeholders.ARCHITECTURE_FLOW_DIAGRAM_PLACEHOLDER} fallback="Architecture diagram available soon." />
        </CardContent>
      </Card>

      <div className="pt-6 border-t border-border mt-8 flex justify-end">
        <Button onClick={() => updateState({ sharedStep: 1, maxSharedStep: 1 })} className="gap-2">
          My integration is ready <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
