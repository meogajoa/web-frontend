import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

const gameUsersNotice = z.object({
  type: z.literal('GAME_USER_LIST'),
  id: z.string(),
  blackTeam: z.array(z.number()),
  whiteTeam: z.array(z.number()),
  redTeam: z.array(z.number()),
  eliminated: z.array(z.number()),
});
export type GameUsersNotice = z.infer<typeof gameUsersNotice>;

const useGameUsersNotice = ({
  variables,
  enabled,
  onMessage,
}: {
  variables: { id: string };
  enabled: boolean;
  onMessage: (gameUsersNotice: GameUsersNotice) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/game/${variables.id}/notice/users`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      const notice = gameUsersNotice.parse(jsonBody);
      onMessage(notice);

      console.debug(`/topic/game/${variables.id}/notice/users: `, notice);
    },
  );
};

export default useGameUsersNotice;
