import { type ChatMessage, ChatRoom } from '@/types/chat';
import { createStore } from 'zustand/vanilla';

export type RoomState = {
  id: string;
  title: string;
  hostNickname: string;
  isPlaying: boolean;
  currentChatRoom: ChatRoom;
  messagesByRoom: Record<ChatRoom, ChatMessage[]>;
};

export type RoomActions = {
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setHostNickname: (nickname: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentChatRoom: (chatRoom: ChatRoom) => void;
  addMessage: (chatRoom: ChatRoom, message: ChatMessage) => void;
  setMessages: (chatRoom: ChatRoom, messages: ChatMessage[]) => void;
  clearMessages: (chatRoom: ChatRoom) => void;
  clearInGameMessages: () => void;
};

export type RoomStore = RoomState & RoomActions;

export const defaultInitState: RoomState = {
  id: '',
  title: '',
  hostNickname: '',
  isPlaying: false,
  currentChatRoom: ChatRoom.Lobby,
  messagesByRoom: Object.values(ChatRoom).reduce(
    (acc, key) => ({
      ...acc,
      [key]: [],
    }),
    {} as Record<ChatRoom, ChatMessage[]>,
  ),
};

export const createRoomStore = (initState: RoomState = defaultInitState) => {
  return createStore<RoomStore>()((set) => ({
    ...initState,
    setId: (id) => set({ id }),
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
    setMessages: (chatRoom, messages) =>
      set((state) => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoom]: messages,
        },
      })),
    clearMessages: (chatRoom) =>
      set((state) => ({
        messagesByRoom: { ...state.messagesByRoom, [chatRoom]: [] },
      })),
    clearInGameMessages: () =>
      set((state) => ({
        messagesByRoom: {
          ...defaultInitState.messagesByRoom,
          ...state.messagesByRoom.lobby,
        },
      })),
  }));
};
