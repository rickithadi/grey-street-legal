import React from 'react';
import { siteCopy } from '../content/siteData';

export default function Footer() {
  const { hero, footer } = siteCopy;
  const {
    attorneys,
    services,
    navLinks,
    designCredit,
    legalNotice,
    address,
    copyright,
  } = footer;

  const navigationItems = navLinks.filter((item) => !/client services/i.test(item.label));
  const clientServicesLink = navLinks.find((item) => /client services/i.test(item.label));

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            {hero.title && (
              <p className="text-2xl font-semibold">{hero.title}</p>
            )}
            {address && <p className="max-w-xs text-sm text-white/70">{address}</p>}
            {copyright && <p className="text-xs uppercase tracking-wider text-white/50">{copyright}</p>}
          </div>

          {attorneys.length > 0 && (
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Attorneys</p>
              <ul className="mt-4 space-y-3 text-white/80">
                {attorneys.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Client Services</p>
            <ul className="mt-4 space-y-3 text-white/80">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {clientServicesLink && (
                <li>
                  <a
                    href={clientServicesLink.url}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-secondary hover:text-white"
                  >
                    {clientServicesLink.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Navigation</p>
            <nav className="mt-4 flex flex-col space-y-3 text-white/80">
              {navigationItems.map((link) => (
                <a key={link.label} href={link.url} className="hover:text-white">
                  {link.label}
                </a>
              ))}
              {designCredit && designCredit.url && (
                <a href={designCredit.url} className="hover:text-white">
                  {designCredit.label}
                </a>
              )}
              {legalNotice && legalNotice.url && (
                <a href={legalNotice.url} className="hover:text-white">
                  {legalNotice.label}
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
