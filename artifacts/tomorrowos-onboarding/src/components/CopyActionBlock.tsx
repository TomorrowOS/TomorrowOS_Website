import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrototype } from './PrototypeProvider';

export type CopyActionType = 'prompt' | 'command' | 'code' | 'url' | 'variable' | 'value';

const DEFAULT_BUTTON_LABELS: Record<CopyActionType, string> = {
  prompt: 'Copy prompt',
  command: 'Copy command',
  code: 'Copy code',
  url: 'Copy URL',
  variable: 'Copy variable name',
  value: 'Copy value',
};

const DEFAULT_LABELS: Record<CopyActionType, string> = {
  prompt: 'PROMPT',
  command: 'COMMAND FOR YOUR TERMINAL',
  code: 'CODE',
  url: 'URL',
  variable: 'ENVIRONMENT VARIABLE',
  value: 'VALUE',
};

// Dark presentation for primary prompts/commands/code; light for secondary values.
const DEFAULT_DARK: Record<CopyActionType, boolean> = {
  prompt: true,
  command: true,
  code: true,
  url: false,
  variable: false,
  value: false,
};

export interface CopyActionBlockProps {
  type: CopyActionType;
  /** Small contextual label shown above the content, e.g. "PROMPT FOR v0". */
  label?: string;
  value: string;
  copyButtonLabel?: string;
  /** Temporary button text after a successful copy, e.g. "Copied — paste this into v0". */
  copiedMessage?: string;
  /** Concise instruction rendered beneath the block, e.g. "Paste this into the main v0 prompt field, then submit it." */
  destinationHint?: string;
  /** Mask the displayed value; the real value is still copied. */
  sensitive?: boolean;
  multiline?: boolean;
  /** Force dark or light presentation; defaults by type. */
  variant?: 'dark' | 'light';
  /** Identifier surfaced in Prototype Review Mode diagnostics. */
  sourceKey?: string;
  className?: string;
}

export function CopyActionBlock({
  type,
  label,
  value,
  copyButtonLabel,
  copiedMessage,
  destinationHint,
  sensitive = false,
  multiline = false,
  variant,
  sourceKey,
  className,
}: CopyActionBlockProps) {
  const { state } = usePrototype();
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isDark = variant ? variant === 'dark' : DEFAULT_DARK[type];
  const buttonLabel = copyButtonLabel || DEFAULT_BUTTON_LABELS[type];
  const contextLabel = label || DEFAULT_LABELS[type];
  const successMessage = copiedMessage || 'Copied';

  const handleCopy = async () => {
    clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
      timerRef.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('failed');
      timerRef.current = setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const displayValue = sensitive ? '•'.repeat(Math.min(Math.max(value.length, 8), 24)) : value;

  return (
    <div className={cn('min-w-0', className)}>
      <div
        className={cn(
          'rounded-lg overflow-hidden',
          isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900 border border-gray-200'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-3 px-4 sm:px-5 pt-3',
            isDark ? '' : 'pt-2.5'
          )}
        >
          <span
            className={cn(
              'text-[11px] font-semibold uppercase tracking-wider truncate',
              isDark ? 'text-gray-400' : 'text-gray-500'
            )}
          >
            {contextLabel}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'shrink-0 inline-flex items-center gap-1.5 rounded-md px-3 min-h-[36px] text-xs font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isDark
                ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 focus-visible:ring-gray-400 focus-visible:ring-offset-gray-950'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus-visible:ring-gray-500 focus-visible:ring-offset-gray-50'
            )}
          >
            {status === 'copied' ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>
              {status === 'copied' ? successMessage : status === 'failed' ? 'Could not copy' : buttonLabel}
            </span>
          </button>
        </div>
        <div
          className={cn(
            'px-4 sm:px-5 pb-4 pt-2 font-mono text-sm leading-relaxed',
            multiline ? 'whitespace-pre-wrap break-words' : 'whitespace-nowrap overflow-x-auto'
          )}
        >
          {displayValue}
        </div>
      </div>
      <span aria-live="polite" className="sr-only">
        {status === 'copied' ? successMessage : status === 'failed' ? 'Could not copy — select the text manually.' : ''}
      </span>
      {status === 'failed' && (
        <p className={cn('mt-2 text-xs font-medium', 'text-red-700')}>
          Could not copy — select the text manually.
        </p>
      )}
      {destinationHint && <p className="mt-2 text-xs text-gray-500">{destinationHint}</p>}
      {state.prototypeReviewMode && (
        <div className="mt-2 rounded border border-dashed border-purple-300 bg-purple-50 p-2 text-[10px] leading-relaxed text-purple-900">
          <p className="font-bold uppercase tracking-wider mb-0.5">CopyActionBlock diagnostics</p>
          <p><strong>Type:</strong> {type} · <strong>Presentation:</strong> {isDark ? 'dark' : 'light'} · <strong>Sensitive:</strong> {sensitive ? 'yes (value masked, not shown here)' : 'no'}</p>
          {sourceKey && <p><strong>Source key:</strong> {sourceKey}</p>}
          <p><strong>Button label:</strong> {buttonLabel} · <strong>Copied message:</strong> {successMessage}</p>
          <p><strong>Destination hint:</strong> {destinationHint || '—'}</p>
        </div>
      )}
    </div>
  );
}
