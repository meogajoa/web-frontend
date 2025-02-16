import useSubscription from '@/hooks/stomp/useSubscription';
import { GameTime } from '@/types/game';
import { compact } from 'lodash-es';
import { z } from 'zod';

enum GameSystemNoticeType {
  GameDayOrNight = 'GAME_DAY_OR_NIGHT',
  GameEnd = 'GAME_END',
  ButtonGameStatus = 'BUTTON_GAME_STATUS',
  MiniGameWillEndNotice = 'MINI_GAME_WILL_END_NOTICE',
}
const gameSystemNoticeTypeSchema = z.nativeEnum(GameSystemNoticeType);

const baseGameSystemNoticeSchema = z.object({
  type: gameSystemNoticeTypeSchema,
  id: z.string(),
  sender: z.literal('SYSTEM'),
  sendTime: z.optional(
    z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  ),
});

const gameDayOrNightSystemNoticeSchema = baseGameSystemNoticeSchema.extend({
  type: z.literal(GameSystemNoticeType.GameDayOrNight),
  day: z.number(),
  dayOrNight: z.nativeEnum(GameTime),
});
export type GameDayOrNightSystemNotice = z.infer<
  typeof gameDayOrNightSystemNoticeSchema
>;

const gameEndSystemNoticeSchema = baseGameSystemNoticeSchema.extend({
  type: z.literal(GameSystemNoticeType.GameEnd),
  content: z.string(),
});
export type GameEndSystemNotice = z.infer<typeof gameEndSystemNoticeSchema>;

const useGameSystemNotice = ({
  variables,
  enabled,
  onGameDayOrNight,
  onGameEnd,
}: {
  variables: { id: string };
  enabled: boolean;
  onGameDayOrNight: (gameDayOrNightNotice: GameDayOrNightSystemNotice) => void;
  onGameEnd: (gameEndNotice: GameEndSystemNotice) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/game/${variables.id}/notice/system`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      console.debug(`/topic/game/${variables.id}/notice/system: `, jsonBody);

      const baseNotice = baseGameSystemNoticeSchema.parse(jsonBody);

      switch (baseNotice.type) {
        case GameSystemNoticeType.GameDayOrNight:
          const gameDayOrNightNotice =
            gameDayOrNightSystemNoticeSchema.parse(jsonBody);
          onGameDayOrNight(gameDayOrNightNotice);

          break;
        case GameSystemNoticeType.GameEnd:
          const gameEndNotice = gameEndSystemNoticeSchema.parse(jsonBody);
          onGameEnd(gameEndNotice);

          break;
      }
    },
  );
};

export default useGameSystemNotice;
