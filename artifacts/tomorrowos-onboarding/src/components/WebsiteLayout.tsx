import React, { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { WebsiteHeader } from './WebsiteHeader';
import { WebsiteFooter } from './WebsiteFooter';
import { CookieBanner } from './CookieBanner';
import { WebsiteReviewBar } from './WebsiteReviewBar';

export function WebsiteLayout({ children }: { children: React.ReactNode }) {
  // Hash scrolling support for the website layout
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          // A bit of delay to ensure rendering is complete
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background font-sans text-foreground">
      <WebsiteReviewBar />
      <WebsiteHeader />
      <main className="flex-1 w-full">
        {children}
      </main>
      <WebsiteFooter />
      <CookieBanner />
    </div>
  );
}
