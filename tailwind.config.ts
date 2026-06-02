import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.creoSkin.100'),
            '--tw-prose-body': theme('colors.creoSkin.100'),
            '--tw-prose-headings': theme('colors.creoSkin.100'),
            '--tw-prose-bold': theme('colors.creoSkin.100'),
            '--tw-prose-counters': theme('colors.creoSkin.200'),
            '--tw-prose-bullets': theme('colors.creoSkin.200'),
            '--tw-prose-hr': theme('colors.creoSkin.200'),
            '--tw-prose-quotes': theme('colors.creoSkin.100'),
            '--tw-prose-quote-borders': theme('colors.creoSkin.200'),
            '--tw-prose-captions': theme('colors.creoSkin.200'),
            '--tw-prose-th-borders': theme('colors.creoSkin.200'),
            '--tw-prose-td-borders': theme('colors.creoSkin.200'),
          },
        },
      }),
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dynapuff: ['DynaPuff', 'sans-serif'],
      },
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
          blue: {
            DEFAULT: "#D4EDF4",
            soft: "#F1FAFC",
          },
          mint: {
            DEFAULT: "#A6E3B5",
            soft: "#EEF9F1",
          },
          yellow: {
            DEFAULT: "#F9DC8A",
            soft: "#FEF8E7",
          },
          purple: {
            DEFAULT: "#BFA2DB",
            soft: "#F3EDF9",
          },
          pink: {
            DEFAULT: "#EA6AD2",
            soft: "#FDEAF8",
          },
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
