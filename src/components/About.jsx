import React from 'react';
import { siteCopy } from '../content/siteData';

const About = () => {
  const { heading, paragraphs } = siteCopy.about;
  const { services } = siteCopy;

  const overviewParagraph = paragraphs[0] ?? '';

  const billingSentenceMatch = overviewParagraph.match(
    /Grey Street Legal utilizes a unique and flexible billing model[^.]+\./i
  );

  const billingModelText = billingSentenceMatch
    ? billingSentenceMatch[0]
    : 'Grey Street Legal utilizes a unique and flexible billing model that provides the advantages of a large traditional law firm with those of a dedicated in-house legal staff, without the costs and inefficiencies associated with conventional legal service arrangements.';

  const cleanedOverview = billingSentenceMatch
    ? overviewParagraph.replace(billingSentenceMatch[0], '').trim()
    : overviewParagraph;

  const primaryParagraphs = [
    ...(cleanedOverview ? [cleanedOverview] : []),
    ...paragraphs.slice(1),
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-[1.3fr_0.7fr] md:px-10">
        <div className="space-y-6">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
              {heading}
            </h2>
          )}
          {primaryParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Flexible Engagement
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-900">
            Tailored Client Programs
          </h3>
          <p className="mt-4 text-base text-slate-600">
            {billingModelText}
          </p>
          {services.length > 0 && (
            <ul className="mt-6 space-y-3 text-base text-slate-700">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
};

export default About;
