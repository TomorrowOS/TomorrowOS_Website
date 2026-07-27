import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useSeo } from '@/hooks/use-seo';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type ConsentSettings = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: string;
};

const CONSENT_KEY = 'tomorrowos_cookie_consent';

export default function CookieSettings() {
  useSeo({ title: 'Cookie Settings' });

  const [settings, setSettings] = useState<ConsentSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
    version: '1.0'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        // Coerce legacy marketing consent to false — no marketing cookies are used.
        setSettings({ ...JSON.parse(stored), marketing: false });
      } catch (e) {
        // Fallback to default
      }
    }
  }, []);

  const handleSave = () => {
    const newSettings = {
      ...settings,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptOptional = () => {
    const newSettings = {
      ...settings,
      analytics: true,
      marketing: false,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectOptional = () => {
    const newSettings = {
      ...settings,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem(CONSENT_KEY);
    setSettings({
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
      version: '1.0'
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">Cookie Settings</h1>
      
      <p className="text-muted-foreground mb-10 text-lg">
        Manage your cookie preferences. We use cookies to ensure the basic functionality of the website and to enhance your online experience.
      </p>

      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-10 text-sm text-muted-foreground">
        No optional analytics or marketing tools are currently active on this prototype.
      </div>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 border-b border-border">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Strictly Necessary Cookies</h3>
            <p className="text-sm text-muted-foreground">
              These cookies are essential for the website to function properly. They cannot be disabled. 
              They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium text-muted-foreground">Always active</span>
            <Switch checked={true} disabled />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 border-b border-border">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Analytics Cookies</h3>
            <p className="text-sm text-muted-foreground">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
              They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
            <span className="text-sm font-medium text-foreground">{settings.analytics ? 'On' : 'Off'}</span>
            <Switch 
              checked={settings.analytics} 
              onCheckedChange={(checked) => setSettings(s => ({ ...s, analytics: checked }))} 
            />
          </div>
        </div>

      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        TomorrowOS does not currently use marketing or behavioural-advertising cookies.
        See our <Link href="/cookie-policy" className="underline hover:text-foreground">Cookie Policy</Link> for details.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center gap-4">
        <Button onClick={handleSave} className="w-full sm:w-auto min-w-[120px]">
          {saved ? 'Saved!' : 'Save Preferences'}
        </Button>
        <Button variant="secondary" onClick={handleAcceptOptional} className="w-full sm:w-auto">
          Accept Optional
        </Button>
        <Button variant="secondary" onClick={handleRejectOptional} className="w-full sm:w-auto">
          Reject Optional
        </Button>
        <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
