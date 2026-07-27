import React from 'react';
import { Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScreenshotPlaceholderProps {
  id: string;
  description: string;
  className?: string;
}

export function ScreenshotPlaceholder({ id, description, className }: ScreenshotPlaceholderProps) {
  return (
    <div className={cn(
      "w-full rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 flex flex-col items-center justify-center text-center",
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Image className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1">{id}</p>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
    </div>
  );
}
