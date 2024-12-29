import React from 'react';
import { AccountStatus } from '~/types/account';

export const useSessionId = () => {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'sessionId') {
          onStoreChange();
        }
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    () => localStorage.getItem('sessionId'),
    () => '',
  );
};

export const useAccount = () => {
  const sessionId = useSessionId();
  const accountStatus: AccountStatus =
    sessionId === null ? AccountStatus.SignedOut : AccountStatus.SignedIn;

  return {
    sessionId,
    accountStatus,
  };
};
