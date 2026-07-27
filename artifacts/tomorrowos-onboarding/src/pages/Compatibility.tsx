import React from 'react';
import { usePageSeo } from '@/hooks/use-page-seo';

export default function Compatibility() {
  usePageSeo('/compatibility');
  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Compatibility Matrix</h1>
      <p className="text-gray-600 mb-4">
        The full TomorrowOS compatibility matrix is being prepared. Confirm your model and firmware with the TomorrowOS team before installation.
      </p>
    </div>
  );
}