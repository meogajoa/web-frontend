import {
  GameTime,
  PlayerNumber,
  PlayerStatus,
  Team,
  type Player,
} from '@/types/game';
import { isValidPlayerNumber } from '@/utils/game';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  player: Player;
  otherPlayers: Record<PlayerNumber, Player>;
  time: GameTime;
  nthDay: number;
  whitePlayerNumbers: PlayerNumber[];
  blackPlayerNumbers: PlayerNumber[];
  redPlayerNumbers: PlayerNumber[];
  eliminatedPlayerNumbers: PlayerNumber[];
};

export type GameActions = {
  setPlayer: (player: Player) => void;
  setPlayerByPlayerNumber: (playerNumber: PlayerNumber, player: Player) => void;
  setTime: (time: GameTime) => void;
  setNthDay: (nthDay: number) => void;
  setWhitePlayerNumbers: (whitePlayerNumbers: PlayerNumber[]) => void;
  setBlackPlayerNumbers: (blackPlayerNumbers: PlayerNumber[]) => void;
  setRedPlayerNumbers: (redPlayerNumbers: PlayerNumber[]) => void;
  setEliminatedPlayerNumbers: (eliminatedPlayerNumbers: PlayerNumber[]) => void;
  clearGameStore: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  player: {
    team: Team.Invalid,
    number: PlayerNumber.Invalid,
    status: PlayerStatus.Invalid,
  },
  otherPlayers: Object.values(PlayerNumber)
    .map(Number)
    .filter(isValidPlayerNumber)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          team: Team.Invalid,
          number: PlayerNumber.Invalid,
          status: PlayerStatus.Invalid,
        } as Player,
      }),
      {} as Record<PlayerNumber, Player>,
    ),
  time: GameTime.Invalid,
  nthDay: 0,
  whitePlayerNumbers: [],
  blackPlayerNumbers: [],
  redPlayerNumbers: [],
  eliminatedPlayerNumbers: [],
};

export const createGameStore = (initState: GameState = defaultInitState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    setPlayer(player) {
      set({ player });
    },
    setPlayerByPlayerNumber(playerNumber, player) {
      set((state) => ({
        otherPlayers: {
          ...state.otherPlayers,
          [playerNumber]: player,
        },
      }));
    },
    setTime(time) {
      set({ time });
    },
    setNthDay(nthDay) {
      set({ nthDay });
    },
    setWhitePlayerNumbers(whitePlayerNumbers) {
      set({ whitePlayerNumbers });
    },
    setBlackPlayerNumbers(blackPlayerNumbers) {
      set({ blackPlayerNumbers });
    },
    setRedPlayerNumbers(redPlayerNumbers) {
      set({ redPlayerNumbers });
    },
    setEliminatedPlayerNumbers(eliminatedPlayerNumbers) {
      set({ eliminatedPlayerNumbers });
    },
    clearGameStore() {
      set(defaultInitState);
    },
  }));
};
