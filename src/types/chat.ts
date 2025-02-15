import { usernameSchema } from '@/types/account';
import { UserNumber, userNumberSchema } from '@/types/game';
import { z } from 'zod';

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
  User09 = UserNumber.Nine,
  Lobby = 'lobby',
  Personal = 'personal',
  General = 'general',
  Black = 'black',
  White = 'white',
  Red = 'red',
  Eliminated = 'eliminated',
}

/**
 * Chat Message
 */
export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: usernameSchema.or(
    userNumberSchema.transform((number) => number.toString()),
  ),
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});

export const personalChatLogSchema = chatMessageSchema.extend({
  receiver: usernameSchema,
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
