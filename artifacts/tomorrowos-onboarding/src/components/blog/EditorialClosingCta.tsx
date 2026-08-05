/**
 * Quiet document-ending panel — the standard editorial closing CTA.
 * One primary action, two quiet secondary text links. No gradient, no
 * oversized banner. Hidden in print.
 */
import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function EditorialClosingCta() {
  return (
    <section
      aria-labelledby="closing-cta"
      className="flex flex-col gap-4 border-t border-border pt-8 print:hidden"
    >
      <p
        id="closing-cta"
        className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground"
      >
        Build with TomorrowOS
      </p>
      <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
        Use open-source server-to-screen infrastructure while retaining ownership of your
        product, workflow and commercial model.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/start"
          className="inline-flex h-10 items-center justify-center whitespace-nowrap bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start building
        </Link>
        <a
          href={siteConfig.links.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Documentation
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          <span className="sr-only"> (opens in a new window)</span>
        </a>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          GitHub
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          <span className="sr-only"> (opens in a new window)</span>
        </a>
      </div>
    </section>
  );
}
