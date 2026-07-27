import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { terminalConfig } from '@/lib/terminalConfig';
import { PlaceholderText } from './PlaceholderText';
import { usePrototype } from './PrototypeProvider';

export function ApiJourney() {
  const { updateState } = usePrototype();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect via HTTP API</h2>
        <p className="text-gray-600">
          Use the TomorrowOS HTTP API when direct SDK integration is not appropriate for your backend or technology stack.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Base URL</CardTitle>
          <CardDescription>All API requests should be made to this base URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderText block value={terminalConfig.placeholders.API_BASE_URL} fallback="Base URL available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>How to authenticate your requests securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderText block value={terminalConfig.placeholders.API_AUTHENTICATION_METHOD} fallback="Authentication guide available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>First API Request</CardTitle>
          <CardDescription>Example of making your first authenticated API call.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderText block value={terminalConfig.placeholders.FIRST_API_REQUEST} fallback="Request example available soon." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event or Webhook Setup</CardTitle>
          <CardDescription>Configure how your application receives updates from TomorrowOS.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlaceholderText block value={terminalConfig.placeholders.EVENT_OR_WEBHOOK_SETUP} fallback="Webhook documentation available soon." />
        </CardContent>
      </Card>

      <div className="pt-6 border-t border-border mt-8 flex justify-end">
        <Button onClick={() => updateState({ sharedStep: 1, maxSharedStep: 1 })} className="gap-2">
          I have a live CMS endpoint <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
