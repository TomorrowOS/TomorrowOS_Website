import React from 'react';
import { useSeo } from '@/hooks/use-seo';

export default function PlaceholderPage({ title }: { title: string }) {
  useSeo({ title: `${title} (Being prepared)`, description: 'This page is being prepared.' });
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">This content is currently being prepared.</p>
    </div>
  );
}