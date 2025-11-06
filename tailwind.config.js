/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2a44',
        secondary: '#c17f4c',
        accent: '#4f6d7a',
      },
      spacing: {
        'spacing-1': '4px',
        'spacing-2': '8px',
        'spacing-3': '12px',
        'spacing-4': '16px',
        'spacing-5': '20px',
        'spacing-6': '24px',
        'spacing-7': '32px',
        'spacing-8': '40px',
        'spacing-9': '48px',
        'spacing-10': '64px',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.25)',
      },
    },
  },
  plugins: [],
};
