'use client';

import React, { PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { createRoomStore, defaultInitState, RoomStore } from '~/stores/room';
import { ChatMessage, ChatRoom } from '~/types/chat';
import { Nullable } from '~/types/misc';
import { assert } from '~/utils/assert';

export type RoomStoreApi = ReturnType<typeof createRoomStore>;

export const RoomStoreContext =
  React.createContext<Nullable<RoomStoreApi>>(null);

type Props = {
  id: string;
  title: string;
  hostNickname: string;
  chatLogs: ChatMessage[];
  isPlaying: boolean;
};

export const RoomProvider: React.FC<PropsWithChildren<Props>> = ({
  id,
  title,
  hostNickname,
  chatLogs,
  isPlaying,
  children,
}) => {
  const storeRef = React.useRef<RoomStoreApi>();
  if (!storeRef.current) {
    const initialState = { ...defaultInitState };

    initialState.id = id;
    initialState.title = title;
    initialState.hostNickname = hostNickname;
    initialState.messagesByRoom[ChatRoom.Lobby] = chatLogs;
    initialState.isPlaying = isPlaying;

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
  assert(roomStoreContext, 'useRoomStore must be used within <RoomProvider />');

  return useStore(roomStoreContext, selector);
};

export const useRoom = () => {
  return useRoomStore((store) => store);
};
