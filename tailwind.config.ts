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
        // Creolitos Skin tones
        //Main skin colors from the logo
        creoSkin: {
          100: "#3E230E", // Main text
          200: "#62462F", // subheading text
          300: "#B57E59", // Highlights
          400: "#E1D1BA", // lightest (for contrast with darks)
        },

        // Creolitos Contrast
        // bright colors for child-friendly elements
        // purples for section dividers, subtle gradients.
        // neutral for backgrounds
        creoCont: {
          mint: "#A6E3B5",
          yellow: "#F9DC8A",
          purple: "#BFA2DB",
          pink: "#EA6AD2",
          neutral1: "#F9F9F9", // off-white
        },
      },
      textColor: {
        DEFAULT: "#3E230E", // Set creoSkin-100 as the default text color
      },
      backgroundColor: {
        DEFAULT: "#F9F9F9", // Set creoCont-neutral1 as the default background color
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",   // 16px (mobile)
        sm: "1.5rem",      // 24px
        lg: "2rem",        // 32px
      },
      screens: {
        xl: "1280px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};

export default config;
