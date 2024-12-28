import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LocaleLayoutProps } from '~/app/[locale]/layout';

type ExamplePageProps = LocaleLayoutProps;

const ExamplePage: React.AFC<ExamplePageProps> = async ({ params }) => {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return <h1 className="text-gray-500">{t('title')}</h1>;
};

export default ExamplePage;
