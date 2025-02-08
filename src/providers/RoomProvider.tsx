'use client';

import React, { PropsWithChildren } from 'react';
import { createRoomStore, defaultInitState } from '~/stores/room';
import { ChatMessage, ChatRoom } from '~/types/chat';
import { Nullable } from '~/types/misc';

export type RoomStoreApi = ReturnType<typeof createRoomStore>;

export const RoomStoreContext =
  React.createContext<Nullable<RoomStoreApi>>(null);

type Props = {
  id: string;
  title: string;
  hostNickname: string;
  chatLogs: ChatMessage[];
};

export const RoomProvider: React.FC<PropsWithChildren<Props>> = ({
  id,
  title,
  hostNickname,
  chatLogs,
  children,
}) => {
  const storeRef = React.useRef<RoomStoreApi>();
  if (!storeRef.current) {
    const initialState = { ...defaultInitState };

    initialState.id = id;
    initialState.title = title;
    initialState.hostNickname = hostNickname;
    initialState.messagesByRoom[ChatRoom.All] = chatLogs;

    storeRef.current = createRoomStore(initialState);
  }

  return (
    <RoomStoreContext.Provider value={storeRef.current}>
      {children}
    </RoomStoreContext.Provider>
  );
};
