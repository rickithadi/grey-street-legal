Here's the React component code for the "Hero" section:

import React from 'react';

const Hero = () => {
  const content = {
    heading: '',
    subheading: 'Janeen Olsen Dougherty',
    cta: [],
    backgroundImage: '',
    fullText: 'Janeen Olsen Dougherty',
  };

  return (
    <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {content.fullText}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              {content.subheading}
            </p>
            <div className="space-x-4">
              {content.cta.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="px-8 py-4 bg-primary text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={content.backgroundImage}
              alt="Hero Background"
              className="rounded-xl overflow-hidden shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;