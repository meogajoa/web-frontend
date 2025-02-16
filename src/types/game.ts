import { z } from 'zod';

export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
  Red = 'RED',
}
export const teamColorSchema = z.nativeEnum(Team);

export enum UserNumber {
  Invalid,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
}
export const userNumberSchema = z.nativeEnum(UserNumber);

export enum UserStatus {
  Invalid,
  Alive,
  Eliminated,
}

export type User = {
  team: Team;
  number: UserNumber;
  status: UserStatus;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Day = 'DAY',
}

export enum MiniGame {
  ButtonClick = 'BUTTON_CLICK',
  NightVote = 'VOTE_GAME',
}
