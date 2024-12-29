'use client';

import React from 'react';
import { HashLoader } from 'react-spinners';
import { useAccount } from '~/hooks/account';
import { useRouter } from '~/i18n/routing';
import { AccountStatus } from '~/types/account';
import { Optional } from '~/types/misc';
import { A_SECOND } from '~/utils/constants';

const RootPage: React.FC = () => {
  const [dots, setDots] = React.useState('');
  const router = useRouter();
  const { accountStatus } = useAccount();
  const [redirectTimeout, setRedirectTimeout] =
    React.useState<Optional<NodeJS.Timeout>>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots.length >= 3 ? '' : dots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    clearTimeout(redirectTimeout);

    setRedirectTimeout(
      setTimeout(() => {
        if (accountStatus === AccountStatus.SignedOut) {
          router.push('/account/sign-in');
        } else {
          router.push('/lobby');
        }
      }, 3 * A_SECOND),
    );
  }, [accountStatus]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4 font-semibold">
      <HashLoader />
      <div className="relative">
        <span>Loading</span>
        <span className="absolute">{dots}</span>
      </div>
    </div>
  );
};

export default RootPage;
