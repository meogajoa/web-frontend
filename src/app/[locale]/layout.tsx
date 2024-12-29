import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import { routing } from '~/i18n/routing';
import IntlProvider from '~/providers/IntlProvider';

export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

export type Locale = { locale: string };

export type LocaleLayoutProps = Readonly<
  React.PropsWithChildren<{
    params: Promise<Locale>;
  }>
>;

const LocaleLayout: React.AFC<LocaleLayoutProps> = async ({
  params,
  children,
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IntlProvider locale={locale}>{children}</IntlProvider>;
};

export default LocaleLayout;
