import { z } from 'zod';
import { username } from '~/types/account';

export type GameStartRequest = {
  id: string; // Room id
};

export enum TeamColor {
  Black = 'BLACK',
  White = 'WHITE',
}
export const teamColor = z.nativeEnum(TeamColor);

export const userGameInfo = z.object({
  number: z.number(),
  nickname: username,
  teamColor: teamColor,
  money: z.number(),
  isSpy: z.boolean(),
});
export type UserGameInfo = z.infer<typeof userGameInfo>;
