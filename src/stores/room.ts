import { type ChatMessage, ChatRoom } from '@/types/chat';
import { PlayerNumber } from '@/types/game';
import { isValidPlayerNumber } from '@/utils/game';
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
  addMessages: (chatRoom: ChatRoom, messages: ChatMessage[]) => void;
  setMessages: (chatRoom: ChatRoom, messages: ChatMessage[]) => void;
  broadcastMessage: (chatRooms: ChatRoom[], message: ChatMessage) => void;
  clearMessages: (chatRoom: ChatRoom) => void;
  clearInGameMessages: () => void;
  clearRoomStore: () => void;
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
  return createStore<RoomStore>()((set, get) => ({
    ...initState,
    setId(id) {
      set({ id });
    },
    setTitle(title) {
      set({ title });
    },
    setHostNickname(hostNickname) {
      set({ hostNickname });
    },
    setIsPlaying(isPlaying) {
      set({ isPlaying });
    },
    setCurrentChatRoom(chatRoom) {
      set({ currentChatRoom: chatRoom });
    },
    addMessage(chatRoom, message) {
      set((state) => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoom]: [...state.messagesByRoom[chatRoom], message].sort(
            (a, b) => a.sendTime.getTime() - b.sendTime.getTime(),
          ),
        },
      }));
    },
    addMessages(chatRoom, messages) {
      set((state) => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoom]: [
            ...state.messagesByRoom[chatRoom],
            ...messages.sort(
              (a, b) => a.sendTime.getTime() - b.sendTime.getTime(),
            ),
          ],
        },
      }));
    },
    setMessages(chatRoom, messages) {
      set((state) => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoom]: messages,
        },
      }));
    },
    broadcastMessage(chatRooms, message) {
      const { addMessage } = get();

      chatRooms.forEach((chatRoom) => {
        if (chatRoom === ChatRoom.Personal) {
          Object.values(PlayerNumber)
            .map(Number)
            .filter(isValidPlayerNumber)
            .forEach((playerNumber) => {
              addMessage(playerNumber, message);
            });
        } else {
          addMessage(chatRoom, message);
        }
      });
    },
    clearMessages(chatRoom) {
      set((state) => ({
        messagesByRoom: { ...state.messagesByRoom, [chatRoom]: [] },
      }));
    },
    clearInGameMessages() {
      set((state) => ({
        messagesByRoom: {
          ...defaultInitState.messagesByRoom,
          ...state.messagesByRoom.lobby,
        },
      }));
    },
    clearRoomStore() {
      set(defaultInitState);
    },
  }));
};
