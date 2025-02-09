import { z } from 'zod';
import { username } from '~/types/account';

/**
 * Team
 */
export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
}
export const teamColor = z.nativeEnum(Team);

/**
 * User (in-game data)
 */
export type User = {
  team: Team;
  number: number;
  eliminated: boolean;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

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

/**
 * Game Time
 */
export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Day = 'DAY',
}

/**
 * Game Start Request
 * for REST API: /game/${id}/start
 */
export type GameStartRequest = {
  id: string;
};

/**
 * User Game Info
 * for STOMP topic: /topic/user/${username}/gameInfo
 */
export const userGameInfo = z.object({
  number: z.number(),
  nickname: username,
  teamColor: teamColor,
  money: z.number(),
  spy: z.boolean(),
  eliminated: z.boolean(),
});
export type UserGameInfo = z.infer<typeof userGameInfo>;

/**
 * Game System Notice
 * for STOMP topic: /topic/game/${id}/notice/system
 */
export enum GameSystemNoticeType {
  GameDayOrNight = 'GAME_DAY_OR_NIGHT',
  GameEnd = 'GAME_END',
}
export const gameSystemNoticeType = z.nativeEnum(GameSystemNoticeType);

export const baseGameSystemNotice = z.object({
  type: gameSystemNoticeType,
  id: z.string(),
  sender: z.literal('SYSTEM'),
  sendTime: z.optional(
    z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  ),
});
export type BaseGameSystemNotice = z.infer<typeof baseGameSystemNotice>;

export const gameDayOrNightSystemNotice = baseGameSystemNotice.extend({
  type: z.literal(GameSystemNoticeType.GameDayOrNight),
  day: z.number(),
  dayOrNight: z.nativeEnum(GameTime),
});
export type GameDayOrNightSystemNotice = z.infer<
  typeof gameDayOrNightSystemNotice
>;

export const gameEndSystemNotice = baseGameSystemNotice.extend({
  type: z.literal(GameSystemNoticeType.GameEnd),
  content: z.string(),
});
export type GameEndSystemNotice = z.infer<typeof gameEndSystemNotice>;

/**
 * Game Users Notice
 * for STOMP topic: /topic/game/${id}/notice/users
 */
export const gameUsersNotice = z.object({
  type: z.literal('GAME_USER_LIST'),
  id: z.string(),
  blackTeam: z.array(z.number()),
  whiteTeam: z.array(z.number()),
  eliminated: z.array(z.number()),
});
export type GameUsersNotice = z.infer<typeof gameUsersNotice>;
