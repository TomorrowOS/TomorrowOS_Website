import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { siteConfig } from '@/config/site';
import { usePrototype } from './PrototypeProvider';
import { PlaceholderText } from './PlaceholderText';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WebsiteHeader() {
  const { state } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const hasGithub = siteConfig.links.github && !siteConfig.links.github.includes('{{');
  const showGithub = state.prototypeReviewMode || hasGithub;

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background shrink-0 font-normal text-sm">
            <span className="sr-only">Logo mark</span>
          </div>
          <span className="font-bold">Tomorrow</span><span className="font-light">OS</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/quickstart" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/quickstart" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Quickstart
          </Link>
          
          <div className="flex items-center gap-4 ml-4">
            {siteConfig.links.docs && (
               <a href={siteConfig.links.docs.includes('{{') ? '#' : siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", siteConfig.links.docs.includes('{{') && "opacity-50 pointer-events-none")}>
                 {siteConfig.links.docs.includes('{{') ? <PlaceholderText value="PLACEHOLDER_DOCS_URL" fallback="Documentation" /> : 'Documentation'}
               </a>
            )}
            {showGithub && (
              <a 
                href={hasGithub ? siteConfig.links.github : '#'}
                target={hasGithub ? "_blank" : undefined}
                rel={hasGithub ? "noopener noreferrer" : undefined}
                className={cn("text-sm font-medium border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors", !hasGithub && "opacity-50")}
                onClick={(e) => !hasGithub && e.preventDefault()}
              >
                {hasGithub ? 'GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="GitHub" />}
              </a>
            )}
            <Link href="/start" className={cn("text-sm font-medium px-4 py-2 rounded-md transition-colors", location.startsWith('/start') || location.startsWith('/connect') || location.startsWith('/guides') ? "bg-black text-white hover:bg-black/90" : "bg-foreground text-background hover:bg-foreground/90")}>
              Start building
            </Link>
          </div>
        </nav>

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
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background shrink-0 font-normal text-sm"></div>
              <span className="font-bold">Tomorrow</span><span className="font-light">OS</span>
            </Link>
            <button 
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-4 flex-1 overflow-y-auto">
            <Link href="/quickstart" className="text-lg font-medium text-foreground py-2 border-b border-border/50">
              Explore
            </Link>
            <Link href="/quickstart" className="text-lg font-medium text-foreground py-2 border-b border-border/50">
              Quickstart
            </Link>
            {siteConfig.links.docs && (
              <a 
                href={siteConfig.links.docs.includes('{{') ? '#' : siteConfig.links.docs} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn("text-lg font-medium text-foreground py-2 border-b border-border/50 flex items-center", siteConfig.links.docs.includes('{{') && "opacity-50 pointer-events-none")}
              >
                {siteConfig.links.docs.includes('{{') ? <PlaceholderText value="PLACEHOLDER_DOCS_URL" fallback="Documentation" /> : 'Documentation'}
              </a>
            )}
            {showGithub && (
              <a 
                href={hasGithub ? siteConfig.links.github : '#'}
                target={hasGithub ? "_blank" : undefined}
                rel={hasGithub ? "noopener noreferrer" : undefined}
                className="text-lg font-medium text-foreground py-2 border-b border-border/50 flex items-center"
                onClick={(e) => !hasGithub && e.preventDefault()}
              >
                {hasGithub ? 'GitHub' : <PlaceholderText value="PLACEHOLDER_GITHUB_URL" fallback="GitHub" />}
              </a>
            )}
            <Link href="/start" className={cn("mt-8 flex justify-center text-base font-medium px-4 py-3 rounded-md transition-colors", location.startsWith('/start') || location.startsWith('/connect') || location.startsWith('/guides') ? "bg-black text-white hover:bg-black/90" : "bg-foreground text-background hover:bg-foreground/90")}>
              Start building
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
