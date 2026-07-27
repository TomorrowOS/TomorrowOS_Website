import React, { useState } from 'react';
import { Copy, Check, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { usePrototype } from './PrototypeProvider';

interface CopyableTextProps {
  text: string;
  className?: string;
  multiline?: boolean;
}

export function CopyableText({ text, className, multiline }: CopyableTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group flex items-start bg-gray-50 border border-border rounded-md p-3", className)}>
      <div className={cn("flex-1 font-mono text-sm text-gray-800 overflow-x-auto", multiline ? "whitespace-pre-wrap" : "whitespace-nowrap")}>
        {text}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-3 h-8 w-8 text-gray-400 hover:text-gray-900 shrink-0" 
        onClick={handleCopy}
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </Button>
      <span aria-live="polite" className="sr-only">{copied ? 'Copied to clipboard' : ''}</span>
    </div>
  );
}

interface PlaceholderCommandProps {
  value: string;
  fallback?: string;
  className?: string;
  multiline?: boolean;
}

export function PlaceholderCommand({ value, fallback = "Command available soon", className, multiline }: PlaceholderCommandProps) {
  const { state } = usePrototype();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (state.prototypeReviewMode) {
    return (
      <div className={cn("relative bg-amber-50 border border-amber-200 rounded-md p-3 group flex items-start", className)}>
        <div className="absolute top-0 right-0 bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-md rounded-tr-md uppercase tracking-wider flex items-center gap-1">
          <TerminalSquare className="w-3 h-3" />
          Placeholder
        </div>
        <div className={cn("flex-1 font-mono text-sm text-amber-900 overflow-x-auto mt-2", multiline ? "whitespace-pre-wrap" : "whitespace-nowrap")}>
          {value}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-3 h-8 w-8 text-amber-600 hover:text-amber-900 shrink-0 mt-1" 
          onClick={handleCopy}
          aria-label="Copy placeholder"
        >
          {copied ? <Check className="h-4 w-4 text-amber-700" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  // Customer-facing mode: no copy button, graceful text
  return (
    <div className={cn("bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-500 italic flex items-start", className)}>
      <div className={cn("flex-1 overflow-x-auto", multiline ? "whitespace-pre-wrap" : "whitespace-nowrap")}>
        {fallback}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        disabled
        className="ml-3 h-8 w-8 opacity-30 shrink-0" 
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
