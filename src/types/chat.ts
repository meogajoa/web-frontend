import { z } from 'zod';
import { username } from '~/types/account';

export enum ChatRoom {
  All,
  White,
  Black,
  User01,
  User02,
  User03,
  User04,
  User05,
  User06,
  User07,
  User08,
  Eliminated,
}

export type ChatRoomKey = keyof typeof ChatRoom;

export const chatMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: username,
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});
export type ChatMessage = z.infer<typeof chatMessage>;
