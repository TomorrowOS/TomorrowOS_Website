import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MediaProviderEntry } from '@/lib/vercelConfig';
import { usePrototype } from './PrototypeProvider';

interface MediaProviderOptionProps {
  provider: MediaProviderEntry;
  selected: boolean;
  onSelect: () => void;
}

function ProviderLogo({ provider }: { provider: MediaProviderEntry }) {
  const { state } = usePrototype();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="h-8 flex items-center">
        <span className="text-base font-bold text-gray-900">{provider.name}</span>
        {state.prototypeReviewMode && (
          <span className="ml-2 text-[10px] text-purple-700">expected: {provider.logoPath}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}${provider.logoPath}`}
      alt={provider.logoAlt}
      className="h-8 w-auto max-w-[160px] object-contain"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Equal-structure selectable provider card. Entire card is a toggle button
 * with aria-pressed; selection is announced via visible "Selected" text.
 */
export function MediaProviderOption({ provider, selected, onSelect }: MediaProviderOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex flex-col h-full w-full text-left p-6 rounded-lg bg-white cursor-pointer',
        'transition-[background-color,border-color,color,box-shadow] duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        selected
          ? 'border-2 border-gray-900 bg-gray-50'
          : 'border border-gray-200 hover-fine:bg-gray-50 hover-fine:border-gray-400'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4 min-h-[32px]">
        <ProviderLogo provider={provider} />
        {selected ? (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-gray-900 bg-white border border-gray-900 rounded-full px-2.5 py-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Selected
          </span>
        ) : provider.badge ? (
          <span className="shrink-0 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">
            {provider.badge}
          </span>
        ) : null}
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-1">{provider.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
      <p className="text-sm text-gray-500 mb-6">{provider.bestFor}</p>
      <span
        className={cn(
          'mt-auto inline-flex items-center justify-center w-full rounded-md text-sm font-medium h-10 px-5 border',
          selected
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-black border-black/20'
        )}
        aria-hidden="true"
      >
        {selected ? 'Selected' : provider.selectLabel}
      </span>
    </button>
  );
}
