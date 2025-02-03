import { createStore } from 'zustand/vanilla';
import { ChatMessage, ChatRoom, ChatRoomKey } from '~/types/chat';

export type RoomState = {
  title: string;
  hostNickname: string;
  isPlaying: boolean;
  currentChatRoom: ChatRoom;
  messagesByRoom: Record<ChatRoomKey, ChatMessage[]>;
};

export type RoomActions = {
  setTitle: (title: string) => void;
  setHostNickname: (nickname: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentChatRoom: (chatRoom: ChatRoom) => void;
  addMessage: (chatRoom: ChatRoomKey, message: ChatMessage) => void;
  clearMessages: (chatRoom: ChatRoomKey) => void;
};

export type RoomStore = RoomState & RoomActions;

export const defaultInitState: RoomState = {
  title: '',
  hostNickname: '',
  isPlaying: false,
  currentChatRoom: ChatRoom.All,
  messagesByRoom: Object.values(ChatRoom)
    .filter((key) => Number.isNaN(Number(key)))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: [],
      }),
      {} as Record<ChatRoomKey, ChatMessage[]>,
    ),
};

export const createRoomStore = (initState: RoomState = defaultInitState) => {
  return createStore<RoomStore>()((set) => ({
    ...initState,
    setTitle: (title) => set({ title }),
    setHostNickname: (hostNickname) => set({ hostNickname }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentChatRoom: (currentChatRoom) => set({ currentChatRoom }),
    addMessage: (chatRoom, message) =>
      set((state) => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoom]: [...state.messagesByRoom[chatRoom], message],
        },
      })),
    clearMessages: (chatRoom) =>
      set((state) => ({
        messagesByRoom: { ...state.messagesByRoom, [chatRoom]: [] },
      })),
  }));
};
