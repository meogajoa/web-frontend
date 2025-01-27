import { z } from 'zod';
import { username } from '~/types/account';

export enum ChatRoomKind {
  All = 'all',
  White = 'white',
  Black = 'black',
  User01 = 'user01',
  User02 = 'user02',
  User03 = 'user03',
  User04 = 'user04',
  User05 = 'user05',
  User06 = 'user06',
  User07 = 'user07',
  User08 = 'user08',
}

export const chatMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: username,
  sendTime: z.date(),
});
export type ChatMessage = z.infer<typeof chatMessage>;
