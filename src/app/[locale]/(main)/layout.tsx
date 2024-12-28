import { setRequestLocale } from 'next-intl/server';
import { LocaleLayoutProps } from '~/app/[locale]/layout';

type MainLayoutProps = LocaleLayoutProps;

const MainLayout: React.AFC<MainLayoutProps> = async ({ params, children }) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <div>{children}</div>;
};

export default MainLayout;
