import { z } from 'zod';

/**
 * Team
 */
export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
  Red = 'RED',
}
export const teamColor = z.nativeEnum(Team);

/**
 * User (in-game player info)
 */
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
}
export const userNumber = z.nativeEnum(UserNumber);

export type User = {
  team: Team;
  number: UserNumber;
  eliminated: boolean;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

/**
 * Game Time
 */
export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Day = 'DAY',
}
