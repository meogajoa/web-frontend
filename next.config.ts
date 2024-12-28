import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { CONFIGS } from '~/utils/config';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  rewrites,
  env: {
    API_URL: CONFIGS.API_URL,
  },
};

async function rewrites() {
  const SERVER_URL = CONFIGS.API_URL;

  return [
    {
      source: '/api/:path*',
      destination: `${SERVER_URL}/:path*`,
    },
  ];
}

export default withNextIntl(nextConfig);
