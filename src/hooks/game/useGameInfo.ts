import { username } from '@/types/account';
import { teamColor } from '@/types/game';
import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

const userGameInfo = z.object({
  number: z.number(),
  nickname: username,
  teamColor: teamColor,
  money: z.number(),
  spy: z.boolean(),
  eliminated: z.boolean(),
});
export type UserGameInfo = z.infer<typeof userGameInfo>;

const useUserGameInfo = ({
  variables: { username },
  enabled,
  onMessage,
}: {
  variables: { username: string };
  enabled: boolean;
  onMessage: (gameInfo: UserGameInfo) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/user/${username}/gameInfo`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      const gameInfo = userGameInfo.parse(jsonBody);
      onMessage(gameInfo);

      console.debug(`/topic/user/${username}/gameInfo: `, gameInfo);
    },
  );
};

export default useUserGameInfo;
