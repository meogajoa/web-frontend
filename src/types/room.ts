import { z } from 'zod';
import { username } from '~/types/account';
import { chatMessage } from '~/types/chat';

export type CreateRoomForm = {
  name: string;
  password: string;
};

export const createRoomResponse = z.object({
  id: z.string(),
});
export type CreateRoomResponse = z.infer<typeof createRoomResponse>;

export const room = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  maxUser: z.number(),
  currentUser: z.number(),
  playing: z.boolean(),
});
export type Room = z.infer<typeof room>;

export const paginatedRoomsResponse = z.object({
  rooms: z.array(room),
  last: z.boolean(),
});
export type PaginatedRoomsResponse = z.infer<typeof paginatedRoomsResponse>;

export type JoinRoomRequest = {
  id: string;
};

export const joinRoomResponse = z.object({
  chatLogs: z.array(chatMessage),
  name: z.string(),
  owner: username,
  playing: z.boolean(),
});
export type JoinRoomResponse = z.infer<typeof joinRoomResponse>;

export enum RoomSystemNoticeType {
  GameStart = 'GAME_START',
}
export const roomSystemNoticeType = z.nativeEnum(RoomSystemNoticeType);
export const roomSystemNotice = z.object({
  type: roomSystemNoticeType,
  content: z.string(),
});
