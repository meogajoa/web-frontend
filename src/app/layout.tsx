import type { Metadata } from 'next';
import localFont from 'next/font/local';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';
import '~/styles/globals.css';

const brand = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-brand',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={brand.variable}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
