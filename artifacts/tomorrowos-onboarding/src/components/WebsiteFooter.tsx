import React from 'react';
import { Link } from 'wouter';
import { siteConfig } from '@/config/site';
import { ExternalLink } from 'lucide-react';

export function WebsiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background px-4 md:px-8">
      {/* Primary row: brand + key links */}
      <div className="container mx-auto max-w-[1200px] py-10 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={`${import.meta.env.BASE_URL}assets/brand/tomorrowos-logo.svg`} alt="TomorrowOS" className="h-6 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            The infrastructure platform for building digital signage software.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-row flex-wrap gap-x-8 gap-y-3">
          <Link href="/start" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
            Start building
          </Link>
          <Link href="/blog" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
            Blog
          </Link>
          {!siteConfig.links.docs.includes('{{') && (
            <a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity inline-flex items-center">
              Documentation
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-60" aria-hidden="true" />
            </a>
          )}
          {!siteConfig.links.github.includes('{{') && (
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity inline-flex items-center">
              GitHub
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-60" aria-hidden="true" />
            </a>
          )}
        </nav>
      </div>

      {/* Secondary row: copyright + legal, visually quieter */}
      <div className="container mx-auto max-w-[1200px] border-t border-border/60 py-5 flex flex-col-reverse md:flex-row justify-between items-center gap-3">
        <div className="text-xs text-muted-foreground/80">
          &copy; {currentYear} TomorrowOS
        </div>
        <nav aria-label="Legal" className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/privacy" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">
            Terms
          </Link>
          <a
            href={`${siteConfig.links.docs.replace(/\/$/, '')}/SECURITY`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors inline-flex items-center"
          >
            Security
            {/* <ExternalLink className="w-3 h-3 ml-1 opacity-60" aria-hidden="true" /> */}
          </a>
          {/* <a
            href={`mailto:${siteConfig.legal.securityEmail}`}
            className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors"
          >
            {siteConfig.legal.securityEmail}
          </a> */}
          <Link href="/cookie-policy" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">
            Cookies
          </Link>
          <Link href="/cookie-settings" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">
            Cookie Settings
          </Link>
          <Link href="/terms#third-party-trademarks" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">
            Third-party trademarks
          </Link>
        </nav>
      </div>
    </footer>
  );
}
