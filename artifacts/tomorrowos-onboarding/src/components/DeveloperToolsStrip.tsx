import { useState } from 'react';
import { usePrototype } from './PrototypeProvider';
import { terminalDeveloperTools, DeveloperTool } from '@/config/developer-tools';
import { thirdPartyTrademarkContent } from '@/content/legal';

/**
 * Restrained, informational strip of coding tools shown on Terminal Step 1.
 * Not selectable, no stored state, no effect on the onboarding flow.
 * Examples only — no formal integration or partnership implied.
 */
export function DeveloperToolsStrip() {
  const { state } = usePrototype();
  const reviewMode = state.prototypeReviewMode;

  return (
    <section
      aria-labelledby="developer-tools-heading"
      className={
        'rounded-lg border border-border bg-white p-5' +
        (reviewMode ? ' outline outline-1 outline-dashed outline-blue-400' : '')
      }
    >
      {reviewMode && (
        <p className="mb-3 text-[11px] font-mono uppercase tracking-wide text-blue-600">
          DeveloperToolsStrip · informational, non-interactive
        </p>
      )}
      <h2 id="developer-tools-heading" className="text-base font-semibold text-gray-900">
        Use your preferred developer tools
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Run the TomorrowOS CLI directly or use it alongside the coding agent or editor
        already in your local workflow.
      </p>

      <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-5">
        {terminalDeveloperTools.map((tool) => (
          <ToolItem key={tool.id} tool={tool} reviewMode={reviewMode} />
        ))}
      </ul>

      <p className="mt-5 text-xs text-gray-500">{thirdPartyTrademarkContent.developerToolsNote}</p>
    </section>
  );
}

function ToolItem({ tool, reviewMode }: { tool: DeveloperTool; reviewMode: boolean }) {
  const [failed, setFailed] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const src = `${import.meta.env.BASE_URL}${tool.logoPath}`;

  return (
    <li className="flex flex-col items-start gap-1.5">
      {failed ? (
        reviewMode ? (
          <span className="text-[11px] font-mono text-red-600 break-all">
            MISSING APPROVED LOGO · {tool.logoPath}
          </span>
        ) : (
          <span className="text-sm font-medium text-gray-700 leading-6">{tool.label}</span>
        )
      ) : (
        <img
          src={src}
          alt={tool.label}
          className={`${tool.heightClass} w-auto max-w-[150px] object-contain`}
          loading="lazy"
          onError={() => setFailed(true)}
          onLoad={(e) => {
            const el = e.currentTarget;
            setDims({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
          }}
        />
      )}
      {reviewMode && !failed && (
        <span className="text-[10px] font-mono text-blue-600 break-all">
          {tool.logoPath}
          {dims ? ` · ${dims.w}×${dims.h}px · image` : ' · image'}
        </span>
      )}
    </li>
  );
}
