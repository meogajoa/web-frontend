import { GameTime } from '@/types/game';
import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

enum GameSystemNoticeType {
  GameDayOrNight = 'GAME_DAY_OR_NIGHT',
  GameEnd = 'GAME_END',
  ButtonGameStatus = 'BUTTON_GAME_STATUS',
  MiniGameWillEndNotice = 'MINI_GAME_WILL_END_NOTICE',
}
const gameSystemNoticeType = z.nativeEnum(GameSystemNoticeType);

const baseGameSystemNotice = z.object({
  type: gameSystemNoticeType,
  id: z.string(),
  sender: z.literal('SYSTEM'),
  sendTime: z.optional(
    z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  ),
});

const gameDayOrNightSystemNotice = baseGameSystemNotice.extend({
  type: z.literal(GameSystemNoticeType.GameDayOrNight),
  day: z.number(),
  dayOrNight: z.nativeEnum(GameTime),
});
export type GameDayOrNightSystemNotice = z.infer<
  typeof gameDayOrNightSystemNotice
>;

const gameEndSystemNotice = baseGameSystemNotice.extend({
  type: z.literal(GameSystemNoticeType.GameEnd),
  content: z.string(),
});
export type GameEndSystemNotice = z.infer<typeof gameEndSystemNotice>;

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
      const baseNotice = baseGameSystemNotice.parse(jsonBody);

      switch (baseNotice.type) {
        case GameSystemNoticeType.GameDayOrNight:
          const gameDayOrNightNotice =
            gameDayOrNightSystemNotice.parse(jsonBody);
          onGameDayOrNight(gameDayOrNightNotice);

          console.debug(
            `/topic/game/${variables.id}/notice/system: `,
            gameDayOrNightNotice,
          );
          break;
        case GameSystemNoticeType.GameEnd:
          const gameEndNotice = gameEndSystemNotice.parse(jsonBody);
          onGameEnd(gameEndNotice);

          console.debug(
            `/topic/game/${variables.id}/notice/system: `,
            gameEndNotice,
          );
          break;
      }
    },
  );
};

export default useGameSystemNotice;
