import { GameTime, Team, type User, UserNumber } from '@/types/game';
import { isValidUserNumber } from '@/utils/game';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  user: User;
  otherUsers: Record<UserNumber, User>;
  time: GameTime;
  nthDay: number;
  whiteTeamUsers: UserNumber[];
  blackTeamUsers: UserNumber[];
  redTeamUsers: UserNumber[];
  eliminatedUsers: UserNumber[];
};

export type GameActions = {
  setUser: (user: User) => void;
  setUserByNumber: (userNumber: UserNumber, user: User) => void;
  setTime: (time: GameTime) => void;
  setNthDay: (nthDay: number) => void;
  setWhiteTeamUsers: (whiteTeamUsers: UserNumber[]) => void;
  setBlackTeamUsers: (blackTeamUsers: UserNumber[]) => void;
  setRedTeamUsers: (redTeamUsers: UserNumber[]) => void;
  setEliminatedUsers: (eliminatedUsers: UserNumber[]) => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  user: {
    team: Team.Invalid,
    number: 0,
    eliminated: true,
  },
  otherUsers: Object.values(UserNumber)
    .filter((key) => isValidUserNumber(Number(key)))
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
  whiteTeamUsers: [],
  blackTeamUsers: [],
  redTeamUsers: [],
  eliminatedUsers: [],
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
    setWhiteTeamUsers: (whiteTeamUsers) => set({ whiteTeamUsers }),
    setBlackTeamUsers: (blackTeamUsers) => set({ blackTeamUsers }),
    setRedTeamUsers: (redTeamUsers) => set({ redTeamUsers }),
    setEliminatedUsers: (eliminatedUsers) => set({ eliminatedUsers }),
  }));
};
