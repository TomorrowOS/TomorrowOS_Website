import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { PlaceholderText } from './PlaceholderText';
import { siteNavigation, isConfiguredUrl } from '@/config/navigation';
import { Menu, X, ExternalLink } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { cn } from '@/lib/utils';

const logoSrc = `${import.meta.env.BASE_URL}assets/brand/tomorrowos-logo.svg`;

/**
 * Root-level pillar articles that belong to the Blog editorial section.
 * Keep in sync with the URL model documented in src/lib/blogArticles.ts.
 */
const BLOG_PILLAR_PATHS = [
  '/build-a-digital-signage-cms',
  '/digital-signage-sdk',
  '/digital-signage-api',
  '/open-source-digital-signage',
  '/self-hosted-digital-signage',
  '/headless-digital-signage',
  '/samsung-tizen-digital-signage-player',
  '/brightsign-digital-signage-player',
];

function isActive(location: string, href: string) {
  if (href === '/start') {
    return location.startsWith('/start') || location.startsWith('/connect') || location.startsWith('/guides');
  }
  if (href === '/journal') {
    return (
      location === '/journal' ||
      location.startsWith('/journal/') ||
      BLOG_PILLAR_PATHS.includes(location)
    );
  }
  return location === href;
}

export function WebsiteHeader() {
  const { state } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const githubAction = siteNavigation.actions.find((a) => a.label === 'GitHub')!;
  const startAction = siteNavigation.actions.find((a) => a.label === 'Start building')!;
  const hasGithub = isConfiguredUrl(githubAction.href);

  // Focus trap & scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const focusableElements = drawerRef.current?.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      if (firstElement) {
        firstElement.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          return;
        }
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        menuButtonRef.current?.focus();
      };
    }
    return undefined;
  }, [mobileMenuOpen]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // The GitHub button always renders. While the official URL is unconfigured it
  // routes to the internal /github placeholder page (no dead '#' links); once
  // siteConfig.links.github is set it becomes an external new-tab link.
  const githubButton = (className: string) =>
    hasGithub ? (
      <a href={githubAction.href} target="_blank" rel="noopener noreferrer" className={className}>
        <GithubIcon className="w-4 h-4 mr-2" />
        GitHub
      </a>
    ) : (
      <Link href="/github" className={className}>
        <GithubIcon className="w-4 h-4 mr-2" />
        {state.prototypeReviewMode ? <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="GitHub" /> : 'GitHub'}
      </Link>
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-16 md:h-24 w-full max-w-[1440px] items-center justify-between px-4 md:px-16">
        {/* Left group: logo + primary navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="TomorrowOS home" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logoSrc} alt="TomorrowOS" className="h-6 w-auto md:h-auto md:w-[220px]" />
          </Link>
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {siteNavigation.primary.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-foreground transition-opacity hover:opacity-70 inline-flex items-center"
                >
                  {item.label}
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-60" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(location, item.href) ? 'page' : undefined}
                  className={cn(
                    'text-[15px] font-medium text-foreground transition-opacity hover:opacity-70',
                    isActive(location, item.href) && 'underline underline-offset-8 decoration-foreground/60'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Right group: actions */}
        <div className="hidden md:flex items-center gap-3.5">
          {githubButton(
            'inline-flex h-[42px] items-center justify-center rounded-md border border-foreground bg-white px-6 text-[15px] font-medium text-foreground transition-opacity hover:opacity-70'
          )}
          <Link
            href={startAction.href}
            aria-current={isActive(location, startAction.href) ? 'page' : undefined}
            className="inline-flex h-[42px] items-center justify-center rounded-md bg-foreground px-6 text-[15px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            {startAction.label}
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          ref={menuButtonRef}
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link href="/" aria-label="TomorrowOS home" className="flex items-center hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
              <img src={logoSrc} alt="TomorrowOS" className="h-6 w-auto" />
            </Link>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-4 flex-1 overflow-y-auto" aria-label="Mobile">
            {siteNavigation.primary.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium py-2 border-b border-border/50 text-foreground flex items-center"
                >
                  {item.label}
                  <ExternalLink className="w-4 h-4 ml-1.5 opacity-60" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(location, item.href) ? 'page' : undefined}
                  className={cn(
                    'text-lg font-medium py-2 border-b border-border/50',
                    isActive(location, item.href) ? 'text-foreground underline underline-offset-8' : 'text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            {githubButton('text-lg font-medium text-foreground py-2 border-b border-border/50 flex items-center')}
            <Link
              href={startAction.href}
              className="mt-8 flex justify-center text-base font-medium px-4 py-3 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              {startAction.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
