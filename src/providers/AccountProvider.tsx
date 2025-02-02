'use client';

import React, { type PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { AccountStore, createAccountStore } from '~/stores/account';
import type { Nullable } from '~/types/misc';

export type AccountStoreApi = ReturnType<typeof createAccountStore>;

export const AccountStoreContext =
  React.createContext<Nullable<AccountStoreApi>>(null);

export const AccountStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const storeRef = React.useRef<AccountStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAccountStore();
  }

  return (
    <AccountStoreContext.Provider value={storeRef.current}>
      {children}
    </AccountStoreContext.Provider>
  );
};

export const useAccountStore = <T,>(
  selector: (store: AccountStore) => T,
): T => {
  const accountStoreContext = React.useContext(AccountStoreContext);

  if (!accountStoreContext) {
    throw new Error(`useAccountStore must be used within AccountStoreProvider`);
  }

  return useStore(accountStoreContext, selector);
};

export const useAccount = () => {
  return useAccountStore((store) => store);
};
