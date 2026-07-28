import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

import { siteConfig } from '@/config/site';

/**
 * Internal social-preview inspector for Prototype Review Mode.
 * The preview cards are visual approximations of Slack / LinkedIn / X only —
 * they do not exactly reproduce third-party interfaces.
 */
function SocialPreviewSection() {
  const [open, setOpen] = useState(false);
  const [meta, setMeta] = useState<Record<string, string>>({});
  const [img, setImg] = useState<{ status?: number; mime?: string; size?: number; w?: number; h?: number }>({});

  useEffect(() => {
    if (!open) return;
    const read = (sel: string) =>
      (document.querySelector(sel) as HTMLMetaElement | null)?.getAttribute('content') ?? '';
    const m = {
      title: read('meta[property="og:title"]'),
      description: read('meta[property="og:description"]'),
      image: read('meta[property="og:image"]'),
      alt: read('meta[property="og:image:alt"]'),
      card: read('meta[name="twitter:card"]'),
    };
    setMeta(m);
    if (m.image) {
      // Fetch the local copy for status/MIME/size, and load it for dimensions.
      const localPath = m.image.replace(/^https?:\/\/[^/]+/, '');
      fetch(localPath, { method: 'GET' })
        .then(async (r) => {
          const blob = await r.blob();
          setImg((p) => ({ ...p, status: r.status, mime: blob.type, size: blob.size }));
        })
        .catch(() => setImg((p) => ({ ...p, status: 0 })));
      const el = new Image();
      el.onload = () => setImg((p) => ({ ...p, w: el.naturalWidth, h: el.naturalHeight }));
      el.src = localPath;
    }
  }, [open]);

  const isAbsolute = meta.image?.startsWith('https://');
  const localImage = meta.image ? meta.image.replace(/^https?:\/\/[^/]+/, '') : '';

  return (
    <div className="border-t border-amber-200 pt-2">
      <button onClick={() => setOpen(!open)} className="text-xs font-semibold text-amber-950 hover:underline">
        Social Preview {open ? '▾' : '▸'}
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-[11px]">
            <span><b>Image URL:</b> {meta.image || '—'}</span>
            <span><b>Dimensions:</b> {img.w ? `${img.w} × ${img.h}` : '…'}</span>
            <span><b>MIME:</b> {img.mime || '…'}</span>
            <span><b>File size:</b> {img.size ? `${(img.size / 1024).toFixed(1)} KB` : '…'}</span>
            <span><b>OG title:</b> {meta.title || '—'}</span>
            <span><b>OG description:</b> {meta.description ? `${meta.description.slice(0, 60)}…` : '—'}</span>
            <span><b>OG image alt:</b> {meta.alt || '—'}</span>
            <span><b>Twitter card:</b> {meta.card || '—'}</span>
            <span><b>Absolute URL:</b> {isAbsolute ? 'yes' : 'NO'}</span>
            <span><b>HTTP 200:</b> {img.status === undefined ? '…' : img.status === 200 ? 'yes' : `NO (${img.status})`}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-zinc-600">
            {/* Slack-like */}
            <div className="w-64 bg-white border border-zinc-200 rounded p-2 border-l-4 border-l-zinc-300">
              <div className="font-bold text-[#1264a3]">{meta.title}</div>
              <div className="line-clamp-2">{meta.description}</div>
              {localImage && <img src={localImage} alt={meta.alt} className="mt-1 rounded border border-zinc-100" />}
              <div className="mt-1 text-zinc-400">Slack (approximation)</div>
            </div>
            {/* LinkedIn-like */}
            <div className="w-64 bg-white border border-zinc-200 rounded overflow-hidden">
              {localImage && <img src={localImage} alt={meta.alt} />}
              <div className="p-2">
                <div className="font-semibold text-zinc-900">{meta.title}</div>
                <div className="text-zinc-500">tomorrowos.org</div>
                <div className="text-zinc-400">LinkedIn (approximation)</div>
              </div>
            </div>
            {/* X large card-like */}
            <div className="w-64 bg-white border border-zinc-200 rounded-xl overflow-hidden">
              {localImage && <img src={localImage} alt={meta.alt} />}
              <div className="p-2">
                <div className="text-zinc-500">tomorrowos.org</div>
                <div className="font-semibold text-zinc-900 line-clamp-1">{meta.title}</div>
                <div className="text-zinc-400">X large image card (approximation)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WebsiteReviewBar() {
  const { state, updateState, resetState } = usePrototype();
  const [, setLocation] = useLocation();

  if (!state.prototypeReviewMode) return null;

  const handleReset = () => {
    resetState();
    setLocation('/start');
  };

  const hasCommunity = siteConfig.links.community && !siteConfig.links.community.includes('{{');
  const hasGovernance = siteConfig.links.governance && !siteConfig.links.governance.includes('{{');
  const hasLicense = siteConfig.links.license && !siteConfig.links.license.includes('{{');

  return (
    <div className="bg-amber-100 border-b border-amber-200 text-amber-900 px-4 py-2 text-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype simulation — These states are for internal review and are not connected to v0, Vercel, a database, media storage, your CMS or a physical device.</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
          >
            Reset prototype
          </button>
          <button 
            onClick={() => updateState({ prototypeReviewMode: false })}
            className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
          >
            Disable Review Mode
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-amber-950">Routes:</span>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookie-settings" className="hover:underline">Cookie Settings</Link>
          <Link href="/start" className="hover:underline">Onboarding</Link>
        </div>

        <div className="flex gap-2 items-center text-[10px]">
          <span className="font-semibold text-amber-950">Missing Setup:</span>
          {!hasCommunity && <span className="text-red-600 font-bold">Unresolved Community</span>}
          {!hasGovernance && <span className="text-red-600 font-bold">Unresolved Governance</span>}
          {!hasLicense && <span className="text-red-600 font-bold">Unresolved License</span>}
        </div>
      </div>

      <SocialPreviewSection />
    </div>
  );
}
