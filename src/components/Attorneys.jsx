import React from 'react';
import { siteCopy } from '../content/siteData';

const Attorneys = () => {
  const attorneys = siteCopy.footer.attorneys;
  const subtitle = siteCopy.hero.subtitle;
  const subtitleParts = subtitle ? subtitle.split('|').map((part) => part.trim()) : [];

  if (attorneys.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Attorneys</p>
          {subtitleParts.length > 0 && (
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              {subtitleParts.map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h2>
          )}
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {attorneys.map((name) => (
            <article
              key={name}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-lg shadow-black/20"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">{name}</h3>
                <p className="text-white/70 text-sm uppercase tracking-wide">
                  Grey Street Legal
                </p>
              </div>
              <div className="mt-10 h-1 w-16 rounded-full bg-secondary" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attorneys;
