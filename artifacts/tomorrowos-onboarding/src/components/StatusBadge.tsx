import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'not_started' | 'connecting' | 'connected' | 'error' | 'pending' | 'success';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case 'connected':
    case 'success':
      return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success", className)}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {status === 'connected' ? 'Connected' : 'Success'}
        </span>
      );
    case 'error':
      return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive", className)}>
          <XCircle className="h-3.5 w-3.5" />
          Failed
        </span>
      );
    case 'connecting':
      return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning", className)}>
          <Clock className="h-3.5 w-3.5 animate-pulse" />
          Connecting...
        </span>
      );
    case 'pending':
    case 'not_started':
    default:
      return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600", className)}>
          <Clock className="h-3.5 w-3.5" />
          Pending
        </span>
      );
  }
}
