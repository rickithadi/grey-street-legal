import React from 'react';
import { siteCopy } from '../content/siteData';

const Hero = () => {
  const { title, subtitle, intro, ctas, image, gallery, attorneys, tagline } = siteCopy.hero;

  const supportingImages = gallery
    .filter((item) => item.src !== image?.src)
    .slice(0, 2);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-primary/70 via-primary/40 to-secondary/60" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 px-6 py-24 md:px-10 md:py-28">
        <div className="space-y-8">
          {title && (
            <div className="space-y-4">
              {tagline && (
                <p className="text-sm md:text-base font-medium text-white/70">
                  {tagline}
                </p>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                {title}
              </h1>
            </div>
          )}

          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">{subtitle}</p>
          )}

          {intro && (
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}

          {attorneys.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {attorneys.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm uppercase tracking-wide"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {ctas.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {ctas.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/80"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 lg:gap-6">
          {image && (
            <figure className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-3 backdrop-blur-lg">
              <img
                src={image.src}
                alt={image.alt || title}
                className="h-64 w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-white/70">
                {image.alt || `${title} imagery`}
              </figcaption>
            </figure>
          )}
          <div className="grid grid-cols-2 gap-4">
            {supportingImages.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-2 backdrop-blur-lg"
              >
                <img
                  src={item.src}
                  alt={item.alt || title}
                  className="h-32 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
