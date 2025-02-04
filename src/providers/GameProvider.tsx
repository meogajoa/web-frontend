'use client';

import React, { PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { createGameStore, GameStore } from '~/stores/game';
import { Nullable } from '~/types/misc';
import { assert } from '~/utils/assert';

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext =
  React.createContext<Nullable<GameStoreApi>>(null);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storeRef = React.useRef<GameStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createGameStore();
  }

  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  );
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = React.useContext(GameStoreContext);
  assert(gameStoreContext, 'useGameStore must be used within GameProvider');

  return useStore(gameStoreContext, selector);
};
