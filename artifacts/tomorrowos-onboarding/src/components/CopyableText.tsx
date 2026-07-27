import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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
    </div>
  );
}
