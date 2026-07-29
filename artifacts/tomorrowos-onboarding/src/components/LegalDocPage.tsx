import React, { useEffect } from 'react';
import { usePageSeo } from '@/hooks/use-page-seo';
import type { LegalDoc, LegalBlock } from '@/content/legal';

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
    case 'sub':
      return <h3 className="text-base font-semibold text-foreground mt-6 mb-2">{block.text}</h3>;
    case 'list':
      return (
        <ul className="list-disc pl-6 mb-4 space-y-1">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-semibold text-foreground border-b border-border py-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="text-muted-foreground border-b border-border/60 py-2 pr-4 align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LegalDocPage({ doc, path }: { doc: LegalDoc; path: string }) {
  usePageSeo(path);

  // SPA navigation (e.g. footer link to /terms#third-party-trademarks) does not
  // trigger native anchor scrolling because content mounts after navigation.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    // Instant jump: predictable, and inherently respects reduced-motion.
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [path]);

  return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <h1 className="text-4xl font-bold mb-3 tracking-tight">{doc.title}</h1>
      <p className="text-sm text-muted-foreground mb-12">
        Effective date: {doc.effectiveDate} · Last updated: {doc.lastUpdated}
      </p>

      {doc.sections.map((section, i) => (
        <section key={i} id={section.id} className="mb-10 scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">{section.heading}</h2>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
