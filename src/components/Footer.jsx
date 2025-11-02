import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4 md:space-y-6">
            <p className="text-gray-700 font-medium text-lg md:text-xl">Services</p>
            <ul className="space-y-2 text-gray-600 text-base md:text-lg">
              <li>Corporate Litigation</li>
              <li>Commercial Legal Services</li>
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-gray-700 font-medium text-lg md:text-xl">Attorneys</p>
            <ul className="space-y-2 text-gray-600 text-base md:text-lg">
              <li>John Doe</li>
              <li>Jane Smith</li>
              <li>Michael Johnson</li>
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-gray-700 font-medium text-lg md:text-xl">Quick Links</p>
            <ul className="space-y-2 text-gray-600 text-base md:text-lg">
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 lg:mt-16 flex items-center justify-between text-gray-600 text-sm md:text-base">
          <span>© 2023 Scorpion Design. All rights reserved.</span>
          <a href="http://www.scorpiondesign.com/" className="hover:text-primary transition-colors duration-200">Scorpion Design</a>
        </div>
      </div>
    </footer>
  );
}