import { ResourceCard } from '@/components/learn/ResourceCard';
import type { LearnResource } from '@/lib/learnResources';
import { cn } from '@/lib/utils';

/**
 * A titled section of Learn resource cards.
 *
 * Renders nothing when there are no resources, so a section can never appear
 * as an empty heading. Cards render as a semantic list in a 1/2/3-column
 * responsive grid inside the site's standard 1200px container.
 */
export function ResourceSection({
  id,
  heading,
  intro,
  resources,
  emphasis = false,
}: {
  id: string;
  heading: string;
  intro?: string;
  resources: LearnResource[];
  emphasis?: boolean;
}) {
  if (resources.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24 w-full px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 id={headingId} className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {heading}
        </h2>
        {intro && <p className="mb-8 max-w-[640px] text-muted-foreground">{intro}</p>}
        <ul className={cn('grid list-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3', !intro && 'mt-8')}>
          {resources.map((r) => (
            <li key={r.id} className="h-full">
              <ResourceCard resource={r} emphasis={emphasis} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
