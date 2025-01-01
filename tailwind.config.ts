import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svgs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      brand: ['var(--font-brand)', 'sans-serif'],
    },
    fontSize: {
      sm: ['0.75rem', { lineHeight: '0.875rem' }], // 12px
      base: ['0.875rem', { lineHeight: '1rem' }], // 14px
      lg: ['1rem', { lineHeight: '1.188rem' }], // 16px
      xl: ['1.125rem', { lineHeight: '1.313rem' }], // 18px
      '2xl': ['1.25rem', { lineHeight: '1.438rem' }], // 20px
    },
    extend: {
      colors: {
        gray: {
          1: '#1C1C1D',
          2: '#47484A',
          3: '#6B6C6F',
          4: '#88888A',
          5: '#B8B8B8',
          6: '#E3E3E4',
        },
        red: {
          DEFAULT: '#F24822',
        },
        sub: {
          DEFAULT: '#5F657B',
        },
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.h-screen': {
          height: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        },
        '.w-screen': {
          width: ['100vw /* fallback for Opera, IE and etc. */', '100dvw'],
        },
      });
    }),
  ],
} satisfies Config;
