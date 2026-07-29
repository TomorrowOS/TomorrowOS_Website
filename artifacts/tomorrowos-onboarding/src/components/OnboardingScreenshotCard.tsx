import { useState } from 'react';

/**
 * Onboarding instruction card: approved screenshot asset at the top, then a
 * zone label, heading and instructional copy beneath (never overlaid on the
 * image). If the asset fails to load, the card keeps its structure and shows
 * a neutral fallback area instead of a broken-image icon.
 */
export function OnboardingScreenshotCard({
  id,
  imagePath,
  alt,
  heading,
  copy,
}: {
  id: string;
  imagePath: string;
  alt: string;
  heading: string;
  copy: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}${imagePath}`;

  return (
    <div className="flex flex-col">
      {failed ? (
        <div
          className="w-full aspect-video rounded-md border border-gray-200 bg-gray-50"
          role="img"
          aria-label={alt}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto aspect-video object-contain rounded-md border border-gray-200"
          loading="lazy"
          onError={() => {
            setFailed(true);
            if (import.meta.env.DEV) {
              console.warn(`Onboarding asset failed to load: ${imagePath}`);
            }
          }}
        />
      )}
      <p className="mt-3 text-xs font-mono text-gray-500">{id}</p>
      <h3 className="mt-1 text-sm font-semibold text-gray-900">{heading}</h3>
      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{copy}</p>
    </div>
  );
}
