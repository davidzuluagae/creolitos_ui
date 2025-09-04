import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        // Creolitos skin colors
        creolitos: {
          100: '#DAB58D',
          200: '#DDBB7C',
          300: '#C5A877',
          400: '#D69562',
          500: '#CA7F56',
          600: '#703E0E',
          700: '#73572A',
          800: '#5A3A13',
          900: '#453822',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};

export default config;
