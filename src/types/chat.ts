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
export const baseChatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: usernameSchema.or(
    userNumberSchema.transform((number) => number.toString()),
  ),
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});

export enum ChatMessageType {
  Chat = 'CHAT',
  System = 'SYSTEM',
}

export type ChatMessage = z.infer<typeof baseChatMessageSchema> & {
  type: ChatMessageType;
};

export const chatLogsSchema = z.object({
  type: z.literal('CHAT_LOGS'),
  id: z.string(),
  chatLogs: z.array(baseChatMessageSchema),
});

export const personalChatMessageSchema = baseChatMessageSchema.extend({
  receiver: usernameSchema,
});
export type PersonalChatMessage = z.infer<typeof personalChatMessageSchema>;

export const personalChatLogsSchema = z.object({
  type: z.literal('PERSONAL_CHAT_LOGS'),
  id: z.string(),
  receiver: usernameSchema,
  personalChatLogs: z.array(personalChatMessageSchema),
});
