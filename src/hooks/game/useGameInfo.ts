import useSubscription from '@/hooks/stomp/useSubscription';
import { usernameSchema } from '@/types/account';
import { baseChatMessageSchema } from '@/types/chat';
import { teamColorSchema, userNumberSchema } from '@/types/game';
import { compact } from 'lodash-es';
import { z } from 'zod';

/**
 * Game info type
 */
enum GameInfoType {
  UserInfo = 'USER_INFO',
  Eliminated = 'ELIMINATED_USER',
}
const gameInfoTypeSchema = z.nativeEnum(GameInfoType);

/**
 * Base game info schema
 */
const baseGameInfoSchema = baseChatMessageSchema.extend({
  type: gameInfoTypeSchema,
});

/**
 * USER_INFO
 */
const userGameInfoSchema = baseGameInfoSchema.extend({
  player: z.object({
    number: userNumberSchema,
    nickname: usernameSchema,
    teamColor: teamColorSchema,
    money: z.number(),
    spy: z.boolean(),
    eliminated: z.boolean(),
  }),
});
export type UserGameInfo = z.infer<typeof userGameInfoSchema>;

/**
 * ELIMINATED_USER
 */
const eliminatedGameInfoSchema = baseChatMessageSchema.extend({
  nickname: usernameSchema,
});
export type EliminatedGameInfo = z.infer<typeof eliminatedGameInfoSchema>;

const useUserGameInfo = ({
  variables: { username },
  enabled,
  onUserInfo,
  onEliminated,
}: {
  variables: { username: string };
  enabled: boolean;
  onUserInfo?: (gameInfo: UserGameInfo) => void;
  onEliminated?: (gameInfo: EliminatedGameInfo) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/user/${username}/gameInfo`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      console.debug(`/topic/user/${username}/gameInfo: `, jsonBody);

      const type = gameInfoTypeSchema.parse(jsonBody.type);

      switch (type) {
        case GameInfoType.UserInfo: {
          const gameInfo = userGameInfoSchema.parse(jsonBody);
          onUserInfo?.(gameInfo);
          break;
        }
        case GameInfoType.Eliminated: {
          const gameInfo = eliminatedGameInfoSchema.parse(jsonBody);
          onEliminated?.(gameInfo);
          break;
        }
      }
    },
  );
};

export default useUserGameInfo;
