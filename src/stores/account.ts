import { createStore } from 'zustand/vanilla';
import type { Me } from '~/types/account';

export type AccountState = {
  me: Me;
};

export type AccountActions = {
  setMe: (newMe: Me) => void;
  clearMe: () => void;
};

export type AccountStore = AccountState & AccountActions;

export const defaultInitState: AccountState = {
  me: {
    nickname: '',
  },
};

export const createAccountStore = (
  initState: AccountState = defaultInitState,
) => {
  return createStore<AccountStore>()((set) => ({
    me: initState.me,
    setMe: (newMe) => set({ me: newMe }),
    clearMe: () => set({ me: defaultInitState.me }),
  }));
};
