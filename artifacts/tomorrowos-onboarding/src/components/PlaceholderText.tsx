import React from 'react';
import { usePrototype } from './PrototypeProvider';
import { cn } from '@/lib/utils';
import { TerminalSquare } from 'lucide-react';

interface PlaceholderTextProps {
  value: string;
  fallback: string;
  className?: string;
  block?: boolean;
}

export function PlaceholderText({
  value,
  fallback,
  className,
  block = false,
}: PlaceholderTextProps) {
  const { state } = usePrototype();

  if (state.prototypeReviewMode) {
    if (block) {
      return (
        <div
          className={cn(
            'relative w-full min-w-0 overflow-hidden rounded-md border border-amber-200 bg-amber-50 p-4',
            className
          )}
        >
          <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-md rounded-tr-md bg-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
            <TerminalSquare className="h-3 w-3 shrink-0" />
            <span className="whitespace-nowrap">Engineering Placeholder</span>
          </div>

          <div className="mt-3 min-w-0 whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-amber-900">
            {value}
          </div>
        </div>
      );
    }

    return (
      <span
        className={cn(
          'inline whitespace-normal break-words rounded border border-amber-200 bg-amber-100 px-1 py-0.5 font-mono text-xs leading-relaxed text-amber-900',
          className
        )}
      >
        {value}
      </span>
    );
  }

  // Customer-facing mode
  if (block) {
    return (
      <div
        className={cn(
          'w-full min-w-0 whitespace-pre-wrap break-words rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-500 italic',
          className
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <span
      className={cn(
        'inline whitespace-normal break-words text-gray-500 italic',
        className
      )}
    >
      {fallback}
    </span>
  );
}