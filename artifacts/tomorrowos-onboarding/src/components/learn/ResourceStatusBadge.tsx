import { RESOURCE_STATUS_LABELS, type ResourceStatus } from '@/lib/learnResources';
import { cn } from '@/lib/utils';

/**
 * Maturity badge for Learn resource cards.
 *
 * Meaning is carried by the text label — colour is supplementary and stays
 * within existing muted/border tokens (no traffic-light styling). Live
 * statuses (`production-ready`, `available`) render nothing by default: on
 * this page their absence is unambiguous, and hiding them keeps attention on
 * the states that need it.
 */
const STATUS_TONE: Record<ResourceStatus, string> = {
  'production-ready': 'bg-muted text-muted-foreground border-border',
  available: 'bg-muted text-muted-foreground border-border',
  'in-development': 'bg-amber-50 text-amber-800 border-amber-200',
  'platform-validation': 'bg-blue-50 text-blue-800 border-blue-200',
  'community-contribution': 'bg-muted text-muted-foreground border-border',
  planned: 'bg-muted text-muted-foreground border-border',
};

const HIDDEN_BY_DEFAULT: ResourceStatus[] = ['production-ready', 'available'];

export function ResourceStatusBadge({
  status,
  showLive = false,
}: {
  status: ResourceStatus;
  /** Force live statuses (Production Ready / Available) to render. */
  showLive?: boolean;
}) {
  if (!showLive && HIDDEN_BY_DEFAULT.includes(status)) return null;
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-xs font-medium',
        STATUS_TONE[status],
      )}
    >
      {RESOURCE_STATUS_LABELS[status]}
    </span>
  );
}
