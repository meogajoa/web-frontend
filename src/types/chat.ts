import { z } from 'zod';
import { username } from '~/types/account';
import { userNumber, UserNumber } from '~/types/game';

/**
 * Chat Room Kind
 */
export enum ChatRoom {
  User01 = UserNumber.One,
  User02 = UserNumber.Two,
  User03 = UserNumber.Three,
  User04 = UserNumber.Four,
  User05 = UserNumber.Five,
  User06 = UserNumber.Six,
  User07 = UserNumber.Seven,
  User08 = UserNumber.Eight,
  Lobby = 'lobby',
  Personal = 'personal',
  General = 'general',
  Black = 'black',
  White = 'white',
  Eliminated = 'eliminated',
}

/**
 * Chat Message
 */
export const chatMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: username.or(userNumber.transform((number) => number.toString())),
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});

export const personalChatLog = chatMessage.extend({
  receiver: username,
});

export type ChatMessage = z.infer<typeof chatMessage>;
