'use client';

import { useLocale } from 'next-intl';

import React from 'react';
import { useAccount } from '~/hooks/account';
import { redirect } from '~/i18n/routing';
import { AccountStatus } from '~/types/account';

type MainLayoutProps = Readonly<React.PropsWithChildren>;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { accountStatus } = useAccount();
  const locale = useLocale();

  if (accountStatus === AccountStatus.SignedOut) {
    redirect({ locale, href: '/account/sign-in' });
  }

  return <div>{children}</div>;
};

export default MainLayout;
