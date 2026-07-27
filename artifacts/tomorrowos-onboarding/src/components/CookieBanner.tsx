import React, { useState, useEffect } from 'react';
import { usePrototype } from './PrototypeProvider';
import { Link } from 'wouter';
import { Button } from './ui/button';

type ConsentSettings = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: string;
};

const CONSENT_KEY = 'tomorrowos_cookie_consent';

export function CookieBanner() {
  const { state } = usePrototype();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state.prototypeReviewMode) {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } else {
      // By default hidden in customer mode unless we actually need it
      setIsVisible(false);
    }
  }, [state.prototypeReviewMode]);

  const handleAcceptAll = () => {
    const settings: ConsentSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(settings));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const settings: ConsentSettings = {
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(settings));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 animate-in slide-in-from-bottom-8 duration-500 pointer-events-none">
      <div className="mx-auto max-w-4xl bg-background border border-border rounded-lg shadow-xl p-6 pointer-events-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">We use cookies</h3>
            <p className="text-sm text-muted-foreground">
              TomorrowOS uses necessary cookies to make our site work. We'd also like to set optional analytics cookies to help us improve it. 
              We won't set optional cookies unless you enable them. Using this tool will set a cookie on your device to remember your preferences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link href="/cookie-settings" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto">
              Cookie Settings
            </Link>
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleRejectAll}>
              Reject Optional
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
