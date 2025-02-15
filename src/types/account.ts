import { z } from 'zod';

export const username = z.string();
export type Username = z.infer<typeof username>;

export type Account = {
  nickname: Username;
};
