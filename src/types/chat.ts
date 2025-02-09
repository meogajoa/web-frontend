import { z } from 'zod';
import { username } from '~/types/account';

export enum ChatRoom {
  Lobby,
  User01,
  User02,
  User03,
  User04,
  User05,
  User06,
  User07,
  User08,
  Personal,
  General,
  Black,
  White,
  Eliminated,
}

export enum XChatRoom {
  Personal = 'PERSONAL',
  General = 'GENERAL',
  Black = 'BLACK',
  White = 'WHITE',
  Eliminated = 'ELIMINATED',
}
export const xChatRoom = z.nativeEnum(XChatRoom);

export const chatMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: username,
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});
export type ChatMessage = z.infer<typeof chatMessage>;
