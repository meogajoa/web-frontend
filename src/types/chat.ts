import { z } from 'zod';
import { username } from '~/types/account';

/**
 * Chat Room Kind
 */
export enum ChatRoom {
  Lobby = 'lobby',
  User01 = 1,
  User02 = 2,
  User03 = 3,
  User04 = 4,
  User05 = 5,
  User06 = 6,
  User07 = 7,
  User08 = 8,
  Personal = 'personal',
  General = 'general',
  Black = 'black',
  White = 'white',
  Eliminated = 'eliminated',
}

/**
 * x-chat-room header value
 */
export enum XChatRoom {
  Personal = 'PERSONAL',
  General = 'PUBLIC', // FIXME: expected to receive this as 'GENERAL'
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
