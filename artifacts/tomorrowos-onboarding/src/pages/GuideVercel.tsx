import React from 'react';
import { VercelJourney } from '@/components/VercelJourney';
import { NeedHelpDrawer } from '@/components/NeedHelpDrawer';

export default function GuideVercel() {
  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 relative px-4 md:px-0 py-12">
      <h1 className="text-3xl font-bold mb-8">Vercel Setup Guide</h1>
      <div className="[&_.sticky.bottom-0]:hidden">
        <VercelJourney allExpanded />
      </div>
      <NeedHelpDrawer context="vercel" />
    </div>
  );
}
