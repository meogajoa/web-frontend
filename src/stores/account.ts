import { createStore } from 'zustand/vanilla';
import type { Account } from '~/types/account';

export type AccountState = {
  account: Account;
};

export type AccountActions = {
  setAccount: (newMe: Account) => void;
  clearAccount: () => void;
};

export type AccountStore = AccountState & AccountActions;

export const defaultInitState: AccountState = {
  account: {
    nickname: '',
  },
};

export const createAccountStore = (
  initState: AccountState = defaultInitState,
) => {
  return createStore<AccountStore>()((set) => ({
    account: initState.account,
    setAccount: (newMe) => set({ account: newMe }),
    clearAccount: () => set({ account: defaultInitState.account }),
  }));
};
