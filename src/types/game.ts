import { z } from 'zod';
import { username } from '~/types/account';

export type GameStartRequest = {
  id: string;
};

export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
}
export const teamColor = z.nativeEnum(Team);

export type Player = {
  team: Team;
  number: number;
  eliminated: boolean;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

export enum PlayerNumber {
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

export type PlayerNumberKey = keyof typeof PlayerNumber;

export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Morning = 'MORNING',
}

export const userGameInfo = z.object({
  number: z.number(),
  nickname: username,
  teamColor: teamColor,
  money: z.number(),
  spy: z.boolean(),
  eliminated: z.boolean(),
});
export type UserGameInfo = z.infer<typeof userGameInfo>;
