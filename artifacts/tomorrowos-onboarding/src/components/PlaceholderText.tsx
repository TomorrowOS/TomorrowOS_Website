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

export function PlaceholderText({ value, fallback, className, block }: PlaceholderTextProps) {
  const { state } = usePrototype();

  if (state.prototypeReviewMode) {
    if (block) {
      return (
        <div className={cn("relative bg-amber-50 border border-amber-200 rounded-md p-4 group", className)}>
          <div className="absolute top-0 right-0 bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-md rounded-tr-md uppercase tracking-wider flex items-center gap-1">
            <TerminalSquare className="w-3 h-3" />
            Engineering Placeholder
          </div>
          <div className="font-mono text-sm text-amber-900 mt-2 whitespace-pre-wrap">
            {value}
          </div>
        </div>
      );
    }
    return (
      <span className={cn("inline-flex items-center text-amber-900 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded text-xs font-mono group relative", className)}>
        {value}
      </span>
    );
  }

  // Customer-facing mode
  if (block) {
    return (
      <div className={cn("bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-500 italic", className)}>
        {fallback}
      </div>
    );
  }

  return <span className={cn("text-gray-500 italic", className)}>{fallback}</span>;
}
