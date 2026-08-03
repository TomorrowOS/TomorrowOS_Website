import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ResourceStatusBadge } from '@/components/learn/ResourceStatusBadge';
import type { LearnResource } from '@/lib/learnResources';
import { cn } from '@/lib/utils';

/**
 * A single-destination Learn resource card.
 *
 * The whole card is one semantic link (no nested interactive elements, no JS
 * navigation handlers). Internal destinations use wouter's Link; external
 * destinations follow the site's external-link convention (icon +
 * screen-reader note + noopener).
 */
export function ResourceCard({
  resource,
  emphasis = false,
}: {
  resource: LearnResource;
  emphasis?: boolean;
}) {
  const inner = (
    <Card
      className={cn(
        'flex h-full min-h-[44px] flex-col gap-3 p-6 transition-colors hover:border-foreground/30',
        emphasis && 'md:p-7',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className={cn('font-semibold leading-snug tracking-tight text-foreground', emphasis ? 'text-lg' : 'text-base')}>
          {resource.title}
        </h3>
        <ResourceStatusBadge status={resource.status} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-foreground">
        {resource.ctaLabel}
        {resource.external ? (
          <>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            <span className="sr-only"> (opens in a new window)</span>
          </>
        ) : (
          <ArrowRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        )}
      </span>
    </Card>
  );

  const linkClass =
    'block h-full rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return resource.external ? (
    <a href={resource.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {inner}
    </a>
  ) : (
    <Link href={resource.href} className={linkClass}>
      {inner}
    </Link>
  );
}
