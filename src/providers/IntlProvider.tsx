import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import { Locale } from '~/app/[locale]/layout';
import { Language, routing } from '~/i18n/routing';

type Props = Readonly<React.PropsWithChildren<Locale>>;

const IntlProvider: React.FC<Props> = async ({ locale, children }) => {
  if (!routing.locales.includes(locale as Language)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
