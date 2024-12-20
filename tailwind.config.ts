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
