import React from 'react';
import { Image, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrototype } from './PrototypeProvider';
import { Button } from './ui/button';

interface ScreenshotPlaceholderProps {
  id: string;
  description: string;
  caption?: string;
  className?: string;
}

export function ScreenshotPlaceholder({ id, description, caption, className }: ScreenshotPlaceholderProps) {
  const { state } = usePrototype();

  return (
    <div className={cn(
      "w-full rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden",
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Image className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1 font-mono">{id}</p>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
      {caption && <p className="text-xs mt-3 max-w-[80%] italic opacity-80 text-gray-500">{caption}</p>}
      
      {state.prototypeReviewMode && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
          <Button variant="secondary" size="sm" className="mb-2">
            <Upload className="w-4 h-4 mr-2" />
            Replace image
          </Button>
          <div className="text-[10px] text-white/90 space-y-0.5 text-left bg-black/50 p-3 rounded">
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Model:</strong> Samsung QM43B</p>
            <p><strong>Tizen:</strong> 7.0</p>
            <p><strong>Firmware:</strong> T-KSU2EAKUC</p>
            <p><strong>Date captured:</strong> {new Date().toISOString().split('T')[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
}