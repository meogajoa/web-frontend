'use client';

import { useTranslations } from 'next-intl';
import HashLoader from 'react-spinners/HashLoader';
import { useAuthenticateMutation } from '~/hooks/account';
import { useDotsString } from '~/hooks/loading';
import { useRouter } from '~/i18n/routing';
import StompProvider from '~/providers/StompProvider';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isPending, isSuccess, isIdle } = useAuthenticateMutation({
    sleepSeconds: 1,
    onSuccess: handleAuthenticateSuccess,
    onError: handleAuthenticateError,
  });

  const t = useTranslations('rootRoute');
  const dots = useDotsString({ maxLength: 3 });
  const router = useRouter();

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

  function handleAuthenticateSuccess() {
    console.log('Authenticated');
  }

  function handleAuthenticateError() {
    router.replace('/account/sign-in');
  }
};

export default MainLayout;
