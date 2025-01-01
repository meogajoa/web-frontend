/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  tailwindFunctions: ['cn', 'twMerge', 'twJoin', 'clsx', 'cx', 'cva'],
  tailwindAttributes: [
    'enter',
    'enterFrom',
    'enterTo',
    'leave',
    'leaveFrom',
    'leaveTo',
  ],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tabWidth: 2,
  singleQuote: true,
};

export default config;
