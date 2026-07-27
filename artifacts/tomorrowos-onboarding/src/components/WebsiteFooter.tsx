import React from 'react';
import { Link } from 'wouter';
import { siteConfig } from '@/config/site';
import { usePrototype } from './PrototypeProvider';

export function WebsiteFooter() {
  const { state } = usePrototype();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-[1200px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background shrink-0 font-normal text-sm">
              <span className="sr-only">Logo mark</span>
            </div>
            <span className="font-bold">Tomorrow</span><span className="font-light">OS</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Open-source digital signage foundation.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          TomorrowOS {currentYear}.
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link href="/quickstart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Quickstart
          </Link>
          {!siteConfig.links.docs.includes('{{') && (
            <a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
          )}
          {!siteConfig.links.github.includes('{{') && (
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          )}
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookie-settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cookies Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
