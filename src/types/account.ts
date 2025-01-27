import { z } from 'zod';

export type Username = string;

export type SignInForm = {
  email: string;
  password: string;
};

export type SignInResponse = {
  sessionId: string;
  email: string;
  password: string;
};

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
