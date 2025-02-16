import type { Account } from '@/types/account';
import { createStore } from 'zustand/vanilla';

type AccountState = {
  account: Account;
};

type AccountActions = {
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
    setAccount(newMe) {
      set({ account: newMe });
    },
    clearAccount() {
      set({ account: defaultInitState.account });
    },
  }));
};
