import { z } from 'zod';
import { username } from '~/types/account';

/**
 * Chat Room Kind
 */
export enum ChatRoom {
  Lobby = 'Lobby',
  User01 = 'User01',
  User02 = 'User02',
  User03 = 'User03',
  User04 = 'User04',
  User05 = 'User05',
  User06 = 'User06',
  User07 = 'User07',
  User08 = 'User08',
  Personal = 'Personal',
  General = 'General',
  Black = 'Black',
  White = 'White',
  Eliminated = 'Eliminated',
}

/**
 * x-chat-room header value
 */
export enum XChatRoom {
  Personal = 'PERSONAL',
  General = 'GENERAL',
  Black = 'BLACK',
  White = 'WHITE',
  Eliminated = 'ELIMINATED',
}
export const xChatRoom = z.nativeEnum(XChatRoom);

/**
 * Chat Message
 */
export const chatMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: username,
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});
export type ChatMessage = z.infer<typeof chatMessage>;
