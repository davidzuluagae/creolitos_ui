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
        // Creolitos Primary
        // warm, inviting, and vibrant
        // for buttons, highlights, and links.
        creoPri: {
          100: "#D69562",
          200: "#CA7F56",
        },

        // Creolitos Secondary
        // Supporting Colors 
        // 100 and 200 light backgrounds: for sections, cards, hover, accents, subtle fills
        // 300: for borders, emphasis, transitions
        creoSec: {
          100: "#DAB58D",
          200: "#DDBB7C",
          300: "#C5A877",
        },

        // Creolitos Limited use
        // heavy earth tones. Use sparingly
        // for text headers, footer backgrounds, or small accent icons
        // 300 and 400 for contrast text or small UI details
        creoLim: {
          100: "#703E0E",
          200: "#73572A", // subheading text
          300: "#5A3A13",
          400: "#453822", // main text
        },

        // Creolitos Contrast
        // cool colors for playful and modern feel
        // bright colors for child-friendly elements
        // neutral for backgrounds
        creoCont: {
          cool1: "#3BA7C0", 
          cool2: "#2589FE",
          bright1: "#A6E3B5",
          bright2: "#FFD95E",
          neutral1: "#F9F9F9", // off-white
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
