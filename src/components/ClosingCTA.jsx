import React from 'react';
import { siteCopy } from '../content/siteData';

const ClosingCTA = () => {
  const { paragraphs, ctas } = siteCopy.closing;

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden bg-secondary text-slate-900">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-xl leading-relaxed">
              {paragraph}
            </p>
          ))}
          {ctas.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {ctas.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900/40"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
