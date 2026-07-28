import React from 'react';
import { useGuideSeo, GuideBreadcrumbs } from '@/components/GuideSeo';

export default function GuideNeon() {
  useGuideSeo('/guides/neon');
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-in fade-in">
      <GuideBreadcrumbs path="/guides/neon" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Neon guide being prepared</h1>
      <p className="text-gray-600">The detailed guide for connecting a Neon Postgres database is currently being finalised.</p>
    </div>
  );
}
