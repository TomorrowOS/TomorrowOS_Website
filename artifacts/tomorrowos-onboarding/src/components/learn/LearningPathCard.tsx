import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { LearningPath } from '@/lib/learnResources';

/**
 * A learning-path card containing multiple links.
 *
 * Because it holds several destinations, the card is deliberately NOT one
 * anchor: it has a heading, an ordered list of step links and a single final
 * CTA link, in natural keyboard order. No progress tracking, no state.
 */
function StepLink({ label, href, external }: { label: string; href: string; external: boolean }) {
  const cls =
    'inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm';
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label}
      <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
      <span className="sr-only"> (opens in a new window)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export function LearningPathCard({ path }: { path: LearningPath }) {
  return (
    <Card className="flex h-full flex-col gap-4 p-6">
      <div>
        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">{path.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{path.audience}</p>
      </div>
      <ol className="flex list-decimal flex-col gap-2 pl-5 marker:text-muted-foreground/70">
        {path.steps.map((step) => (
          <li key={step.href + step.label}>
            <StepLink {...step} />
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted-foreground">{path.outcome}</p>
      {path.cta.external ? (
        <a
          href={path.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex min-h-[44px] items-center gap-1 pt-2 text-sm font-medium text-foreground hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {path.cta.label}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          <span className="sr-only"> (opens in a new window)</span>
        </a>
      ) : (
        <Link
          href={path.cta.href}
          className="mt-auto inline-flex min-h-[44px] items-center gap-1 pt-2 text-sm font-medium text-foreground hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {path.cta.label}
          <ArrowRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </Link>
      )}
    </Card>
  );
}
