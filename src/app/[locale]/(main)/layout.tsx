'use client';

import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import React from 'react';
import { useSessionId } from '~/hooks/account';
import { buildLocalizedPath } from '~/utils/misc';

type MainLayoutProps = Readonly<React.PropsWithChildren>;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const sessionId = useSessionId();
  const locale = useLocale();

  if (sessionId === null) {
    redirect(buildLocalizedPath(locale, '/account/sign-in'));
  }

  return <div>{children}</div>;
};

export default MainLayout;
