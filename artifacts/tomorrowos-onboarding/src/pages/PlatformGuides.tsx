import React from 'react';

export default function PlatformGuides() {
  return (
    <div className="flex flex-col mx-auto max-w-[1050px] animate-in fade-in duration-500 py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Platform Guides</h1>
      <p className="text-gray-600 mb-4">
        Select a platform from the deployment steps to view its installation guide.
      </p>
    </div>
  );
}