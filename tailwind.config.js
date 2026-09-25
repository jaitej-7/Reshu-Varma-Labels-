/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F1E6CD',
          300: '#E6D3A7',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A8843F',
          700: '#84662E',
          800: '#61491E',
          900: '#3D2D11',
        },
        rose: {
          50: '#FDFBF9',
          100: '#FBF5F1',
          200: '#F5E7DF',
          300: '#ECD2C4',
          400: '#DEB5A0',
          500: '#CA947B',
          600: '#B0755C',
          700: '#8C5741',
          800: '#673D2C',
          900: '#43261B',
        },
        ivory: {
          50: '#FCFBF9',
          100: '#FAF8F4',
          200: '#F5F0E8',
          300: '#EDE4D6',
          400: '#E2D4BF',
          500: '#D1BEA2',
          600: '#B8A081',
          700: '#947E64',
          800: '#6E5C47',
          900: '#473B2D',
        },
        charcoal: {
          50: '#F8F8F9',
          100: '#EFEFF1',
          200: '#DDDEE3',
          300: '#BDBFC9',
          400: '#9296A5',
          500: '#696E82',
          600: '#4E5365',
          700: '#3A3E4E',
          800: '#252834',
          900: '#161820',
          950: '#0E0F14',
        },
      },
      fontFamily: {
        // PRIMARY BRAND FONTS
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],       // Headers, titles, hero text
        sans: ['Manrope', 'system-ui', 'sans-serif'],             // Body, UI, prices, forms
        // Accent fallbacks
        cormorant: ['Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'Cinzel', 'serif'],
        italiana: ['Italiana', 'serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'wider-luxury': '0.18em',
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(197, 160, 89, 0.15)',
        'luxury-lg': '0 20px 40px -15px rgba(197, 160, 89, 0.25)',
        'luxury-glow': '0 0 25px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
}
