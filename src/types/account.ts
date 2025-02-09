import { z } from 'zod';

/**
 * Username
 */
export const username = z.string();
export type Username = z.infer<typeof username>;

/**
 * Sign In Form
 * for REST API: /auth/signin
 */
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

/**
 * Sign Up Form
 * for REST API: /auth/signup
 */
export type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
};

/**
 * Authenticate Response
 * for REST API: /auth/test
 */
export const authenticateResponse = z.object({
  nickname: z.string(),
});
export type AuthenticateResponse = z.infer<typeof authenticateResponse>;

/**
 * Account
 */
export type Account = {
  nickname: string;
};
