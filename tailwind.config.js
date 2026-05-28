/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        obsidian: '#090d1d',
        ink: '#0f1428',
        gold: {
          100: '#fff6d8',
          200: '#f5dd9b',
          300: '#e4bf68',
          400: '#cfa24b',
          500: '#a9771f',
          600: '#7d5613',
        },
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(228,191,104,0.24), 0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        glow: '0 0 30px rgba(228,191,104,0.18)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fff6d8 0%, #e4bf68 35%, #a9771f 100%)',
        'luxury-grid': 'radial-gradient(circle at 20% 20%, rgba(228,191,104,0.08), transparent 28%), radial-gradient(circle at 80% 0%, rgba(228,191,104,0.05), transparent 24%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
