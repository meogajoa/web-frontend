import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import RootProvider from '~/providers/RootProvider';
import '~/styles/globals.css';

const brand = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-brand',
  weight: '100 900',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Meogajoa',
  description: 'Meogajoa - Who is the best liar?',
};

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={brand.variable}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};
export default RootLayout;
