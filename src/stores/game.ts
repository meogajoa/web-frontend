import { createStore } from 'zustand/vanilla';
import {
  GameTime,
  Player,
  PlayerNumber,
  PlayerNumberKey,
  Team,
} from '~/types/game';

export type GameState = {
  player: Player;
  otherPlayers: Record<PlayerNumberKey, Player>;
  time: GameTime;
  nthDay: number;
};

export type GameActions = {
  setPlayer: (player: Player) => void;
  setPlayerByNumber: (playerNumber: PlayerNumber, player: Player) => void;
  setTime: (time: GameTime) => void;
  setNthDay: (nthDay: number) => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  player: {
    team: Team.Invalid,
    number: 0,
    eliminated: true,
  },
  otherPlayers: Object.values(PlayerNumber)
    .filter((key) => typeof PlayerNumber[key as PlayerNumber] === 'number')
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          team: Team.Invalid,
          number: 0,
          eliminated: true,
        } as Player,
      }),
      {} as Record<PlayerNumberKey, Player>,
    ),
  time: GameTime.Invalid,
  nthDay: 0,
};

export const createGameStore = (initState: GameState = defaultInitState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    setPlayer: (player) => set({ player }),
    setPlayerByNumber: (playerNumber, player) =>
      set((state) => ({
        otherPlayers: {
          ...state.otherPlayers,
          [playerNumber]: player,
        },
      })),
    setTime: (time) => set({ time }),
    setNthDay: (nthDay) => set({ nthDay }),
  }));
};
