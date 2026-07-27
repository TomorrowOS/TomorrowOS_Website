import React from 'react';
import { Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrototype } from './PrototypeProvider';

export function MissingAssetPlaceholder({ 
  name, 
  description, 
  className,
  fallback = 'pattern'
}: { 
  name: string; 
  description: string; 
  className?: string;
  fallback?: 'hide' | 'pattern' | 'none';
}) {
  const { state } = usePrototype();

  if (!state.prototypeReviewMode) {
    if (fallback === 'hide') return null;
    if (fallback === 'pattern') {
      return (
        <div className={cn("bg-muted/10 flex items-center justify-center overflow-hidden relative", className)}>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]" />
        </div>
      );
    }
    return (
      <div className={cn("bg-muted/50 flex items-center justify-center", className)} />
    );
  }

  return (
    <div className={cn(
      "w-full border-2 border-dashed border-destructive/50 bg-destructive/5 flex flex-col items-center justify-center text-center p-4",
      className
    )}>
      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
        <Image className="h-5 w-5 text-destructive" />
      </div>
      <p className="text-sm font-bold text-destructive mb-1 font-mono uppercase tracking-tight">{name}</p>
      <p className="text-xs text-destructive/80 max-w-xs">{description}</p>
    </div>
  );
}
