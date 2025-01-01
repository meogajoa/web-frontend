import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      brand: ['var(--font-brand)', 'sans-serif'],
    },
    fontSize: {
      sm: ['0.75rem', { fontWeight: 400, lineHeight: '0.895rem' }],
      base: ['1.125rem', { fontWeight: 400, lineHeight: '1.343rem' }],
      lg: ['1.25rem', { fontWeight: 400, lineHeight: '1.492rem' }],
      'lg-semibold': ['1.25rem', { fontWeight: 600, lineHeight: '1.492rem' }],
    },
    colors: {
      gray: {
        1: '#E3E3E4',
        2: '#B8B8B8',
        3: '#88888A',
        4: '#6B6C6F',
        5: '#47484A',
        6: '#1C1C1D',
      },
      red: {
        DEFAULT: '#F24822',
      },
      sub: {
        DEFAULT: '#5F657B',
      },
    },
    extend: {
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
