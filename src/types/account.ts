import { z } from 'zod';

export const username = z.string();
export type Username = z.infer<typeof username>;

export type SignInForm = {
  email: string;
  password: string;
};

export const signInResponse = z.object({
  sessionId: z.string(),
  user: z.object({
    email: z.string(),
    nickname: z.string(),
  }),
});
export type SignInResponse = z.infer<typeof signInResponse>;

export type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
};

export const authenticateResponse = z.object({
  nickname: z.string(),
});
export type AuthenticateResponse = z.infer<typeof authenticateResponse>;

export type Me = {
  nickname: string;
};
