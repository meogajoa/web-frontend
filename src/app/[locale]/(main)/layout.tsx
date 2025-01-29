'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { useAuthenticateMutation } from '~/hooks/account';
import { useDotsString } from '~/hooks/loading';
import { useRouter } from '~/i18n/routing';
import { useAccount } from '~/providers/AccountProvider';
import StompProvider from '~/providers/StompProvider';
import { AuthenticateResponse } from '~/types/account';
import { A_SECOND } from '~/utils/constants';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isSuccess } = useAuthenticateMutation({
    sleepSeconds: 1,
    onSuccess: handleAuthenticateSuccess,
    onError: handleAuthenticateError,
  });

  const [isConnected, setIsConnected] = React.useState(false);
  const t = useTranslations('rootRoute');
  const dots = useDotsString({ maxLength: 3 });
  const router = useRouter();
  const { setMe, clearMe } = useAccount();

  const handleConnect = React.useCallback(_handleConnect, []);
  const handleConnectError = React.useCallback(_handleConnectError, []);

  const isAuthenticated = isSuccess;

  return (
    <>
      {(!isAuthenticated || !isConnected) && (
        <div className="flex h-screen flex-col items-center justify-center gap-y-4 font-semibold">
          <HashLoader />
          <div className="relative">
            <span>
              {!isAuthenticated ? t('authenticating') : t('connectingToServer')}
            </span>
            <span className="absolute">{dots}</span>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <StompProvider onConnect={handleConnect} onError={handleConnectError}>
          {isConnected && children}
        </StompProvider>
      )}
    </>
  );

  function handleAuthenticateSuccess(data: AuthenticateResponse) {
    setMe({ nickname: data.nickname });
  }

  function handleAuthenticateError() {
    clearMe();
    localStorage.removeItem('sessionId');
    toast.error(t('authError'));
    router.replace('/account/sign-in');
  }

  function _handleConnect() {
    setTimeout(() => setIsConnected(true), A_SECOND);
  }

  function _handleConnectError() {
    setIsConnected(false);
    toast.error(t('connectError'));
    router.replace('/account/sign-in');
  }
};

export default MainLayout;
