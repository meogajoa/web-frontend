'use client';

import { debounce } from 'lodash-es';
import React from 'react';
import { HashLoader } from 'react-spinners';
import { useAccount } from '~/hooks/account';
import { useDotsString } from '~/hooks/loading';
import { useRouter } from '~/i18n/routing';
import { AccountStatus } from '~/types/account';
import { A_SECOND } from '~/utils/constants';

const RootPage: React.FC = () => {
  const router = useRouter();
  const { accountStatus } = useAccount();
  const dots = useDotsString(3);
  const redirect = React.useMemo(
    () =>
      debounce((accStatus: AccountStatus) => {
        if (accStatus === AccountStatus.SignedIn) {
          router.replace('/home');
        } else {
          router.replace('/account/sign-in');
        }
      }, 3 * A_SECOND),
    [],
  );

  React.useEffect(() => {
    redirect(accountStatus);
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
