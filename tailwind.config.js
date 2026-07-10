/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: '#0b0b0c',
          light: '#17181a',
          soft: '#232427',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#d4af37',
          dark: '#a3811b',
        },
        cream: '#f7f6f3',
        graylight: '#e7e5e1',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #a3811b 100%)',
      },
    },
  },
  plugins: [],
};
