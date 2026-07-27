import React from 'react';
import { usePrototype } from './PrototypeProvider';
import { GUIDED_STEPS, TERMINAL_STEPS, SHARED_STEPS } from '@/lib/constants';

export function StepHeader({ title, description }: { title: string, description: string }) {
  const { state } = usePrototype();
  
  const isGuided = state.setupMethod === 'guided';
  const isShared = state.sharedStep > 0;
  
  const activeStep = isShared ? state.sharedStep : (isGuided ? state.guidedStep : state.terminalStep);
  const totalSteps = isShared ? SHARED_STEPS.length : (isGuided ? GUIDED_STEPS.length : TERMINAL_STEPS.length);
  const percent = Math.round((activeStep / totalSteps) * 100);
  
  const eyebrow = isShared ? 'DEPLOYMENT' : (isGuided ? 'GUIDED SETUP' : 'TERMINAL SETUP');

  return (
    <div className="mb-8">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-start mb-4">
        <div>
          <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
            {eyebrow}
          </div>
          <div className="text-sm font-medium text-gray-400 mb-3">
            Step {activeStep} of {totalSteps}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col items-end shrink-0 ml-8">
          <div className="w-12 h-12 rounded-full border-[3px] border-gray-100 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-900 transition-all duration-500 ease-out" strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - percent} pathLength="100" />
            </svg>
            <span className="text-[10px] font-bold text-gray-900">{percent}%</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Header (compact) */}
      <div className="md:hidden">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
          Step {activeStep} of {totalSteps} — {title}
        </h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
