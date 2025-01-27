export enum AccountStatus {
  SignedOut,
  SignedIn,
  SessionExpired,
}

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

export type AuthenticateResponse = {
  nickname: string;
  email: string;
};
