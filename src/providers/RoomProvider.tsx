'use client';

import React, { PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { createRoomStore, defaultInitState, RoomStore } from '~/stores/room';
import { ChatMessage } from '~/types/chat';
import { Nullable } from '~/types/misc';
import { assert } from '~/utils/assert';

export type RoomStoreApi = ReturnType<typeof createRoomStore>;

export const RoomStoreContext =
  React.createContext<Nullable<RoomStoreApi>>(null);

type Props = {
  title: string;
  hostNickname: string;
  chatLogs: ChatMessage[];
};

export const RoomProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  hostNickname,
  chatLogs,
}) => {
  const storeRef = React.useRef<RoomStoreApi>();
  if (!storeRef.current) {
    const initialState = { ...defaultInitState };

    initialState.title = title;
    initialState.hostNickname = hostNickname;
    initialState.messagesByRoom.All = chatLogs;

    storeRef.current = createRoomStore(initialState);
  }

  return (
    <RoomStoreContext.Provider value={storeRef.current}>
      {children}
    </RoomStoreContext.Provider>
  );
};

export const useRoomStore = <T,>(selector: (store: RoomStore) => T): T => {
  const roomStoreContext = React.useContext(RoomStoreContext);
  assert(roomStoreContext, 'useRoomStore must be used within roomProvider');

  return useStore(roomStoreContext, selector);
};

export const useRoom = () => {
  return useRoomStore((store) => store);
};
