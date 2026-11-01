/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        parchment: '#F4ECE1',
        peach: '#FAD2C0',
        charcoal: '#2C2A29',
        olive: '#6B7F5E',
        gold: '#C5A059',
        'gold-light': '#DFC488',
        'gold-dark': '#9B7938',
        'ink-muted': '#5C5752',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['"Caveat"', '"Reenie Beanie"', 'cursive'],
        note: ['"Reenie Beanie"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        polaroid:
          '0 10px 25px -5px rgba(44, 42, 41, 0.14), 0 4px 10px -2px rgba(44, 42, 41, 0.08), inset 0 0 0 1px rgba(44, 42, 41, 0.06)',
        'polaroid-hover':
          '0 22px 42px -8px rgba(44, 42, 41, 0.22), 0 8px 18px -4px rgba(44, 42, 41, 0.12), inset 0 0 0 1px rgba(197, 160, 89, 0.22)',
        paper:
          '0 4px 16px rgba(44, 42, 41, 0.08), 0 1px 3px rgba(44, 42, 41, 0.06)',
        postcard:
          '0 12px 32px -6px rgba(44, 42, 41, 0.13), 0 2px 6px rgba(44, 42, 41, 0.07)',
        stamp: '2px 3px 8px rgba(44, 42, 41, 0.16)',
      },
      keyframes: {
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 9s linear infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};

