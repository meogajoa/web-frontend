import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import { Language, routing } from '~/i18n/routing';

export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

export type Locale = { locale: string };

export type LocaleLayoutProps = React.PropsWithChildren<{
  params: Promise<Locale>;
}>;

const LocaleLayout: React.AFC<LocaleLayoutProps> = async ({
  params,
  children,
}) => {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Language)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
