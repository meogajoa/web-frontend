'use client';

import LoadingIndicator from '@/components/LoadingIndicator';
import useAuthenticate, {
  type AuthenticateResponse,
} from '@/hooks/account/useAuthenticate';
import { useRouter } from '@/i18n/routing';
import { useAccount } from '@/providers/AccountProvider';
import StompProvider from '@/providers/StompProvider';
import { A_SECOND } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import React from 'react';
import toast from 'react-hot-toast';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isSuccess } = useAuthenticate({
    sleepSeconds: 1,
    onSuccess: handleAuthenticateSuccess,
    onError: handleAuthenticateError,
  });

  const [isConnected, setIsConnected] = React.useState(false);
  const t = useTranslations('rootRoute');
  const router = useRouter();
  const { setAccount, clearAccount } = useAccount();

  const handleConnect = React.useCallback(_handleConnect, []);
  const handleConnectError = React.useCallback(_handleConnectError, []);

  const isAuthenticated = isSuccess;

  return (
    <>
      {(!isAuthenticated || !isConnected) && (
        <LoadingIndicator
          className="min-h-dvh"
          label={
            !isAuthenticated ? t('authenticating') : t('connectingToServer')
          }
        />
      )}

      {isAuthenticated && (
        <StompProvider onConnect={handleConnect} onError={handleConnectError}>
          {isConnected && children}
        </StompProvider>
      )}
    </>
  );

  function handleAuthenticateSuccess(data: AuthenticateResponse) {
    setAccount({ nickname: data.nickname });
  }

  function handleAuthenticateError() {
    clearAccount();
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
