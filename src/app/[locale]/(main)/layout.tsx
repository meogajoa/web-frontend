'use client';

import { useLocale } from 'next-intl';
import React from 'react';
import { useAccount } from '~/hooks/account';
import { redirect } from '~/i18n/routing';
import StompProvider from '~/providers/StompProvider';
import { AccountStatus } from '~/types/account';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { accountStatus } = useAccount();
  const locale = useLocale();

  if (accountStatus === AccountStatus.SignedOut) {
    redirect({ locale, href: '/account/sign-in' });
  }

  return <StompProvider>{children}</StompProvider>;
};

export default MainLayout;
