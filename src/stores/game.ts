import { createStore } from 'zustand/vanilla';
import { GameTime, Team, User, UserNumber } from '~/types/game';

export type GameState = {
  user: User;
  otherUsers: Record<UserNumber, User>;
  time: GameTime;
  nthDay: number;
};

export type GameActions = {
  setUser: (user: User) => void;
  setUserByNumber: (userNumber: UserNumber, user: User) => void;
  setTime: (time: GameTime) => void;
  setNthDay: (nthDay: number) => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  user: {
    team: Team.Invalid,
    number: 0,
    eliminated: true,
  },
  otherUsers: Object.values(UserNumber)
    .filter((key) => typeof UserNumber[key as UserNumber] === 'number')
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          team: Team.Invalid,
          number: 0,
          eliminated: true,
        } as User,
      }),
      {} as Record<UserNumber, User>,
    ),
  time: GameTime.Invalid,
  nthDay: 0,
};

export const createGameStore = (initState: GameState = defaultInitState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    setUser: (user) => set({ user }),
    setUserByNumber: (userNumber, user) =>
      set((state) => ({
        otherUsers: {
          ...state.otherUsers,
          [userNumber]: user,
        },
      })),
    setTime: (time) => set({ time }),
    setNthDay: (nthDay) => set({ nthDay }),
  }));
};
