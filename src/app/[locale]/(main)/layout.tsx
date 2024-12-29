'use client';

import { useLocale } from 'next-intl';

import React from 'react';
import { useSessionId } from '~/hooks/account';
import { redirect } from '~/i18n/routing';

type MainLayoutProps = Readonly<React.PropsWithChildren>;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const sessionId = useSessionId();
  const locale = useLocale();

  if (sessionId === null) {
    redirect({ locale, href: '/account/sign-in' });
  }

  return <div>{children}</div>;
};

export default MainLayout;
