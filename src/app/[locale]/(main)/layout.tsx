'use client';

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { HashLoader } from 'react-spinners';
import { useAuthenticateMutation } from '~/hooks/account';
import { useDotsString } from '~/hooks/loading';
import { redirect } from '~/i18n/routing';
import StompProvider from '~/providers/StompProvider';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const locale = useLocale();
  const { isError, isPending, isSuccess, isIdle } = useAuthenticateMutation({
    sleepSeconds: 1,
  });
  const t = useTranslations('rootRoute');
  const dots = useDotsString(3);

  if (isError) {
    redirect({ locale, href: '/account/sign-in' });
  }

  return (
    <>
      {(isPending || isIdle) && (
        <div className="flex h-screen flex-col items-center justify-center gap-y-4 font-semibold">
          <HashLoader />
          <div className="relative">
            <span>{t('loading')}</span>
            <span className="absolute">{dots}</span>
          </div>
        </div>
      )}

      {isSuccess && <StompProvider>{children}</StompProvider>}
    </>
  );
};

export default MainLayout;
