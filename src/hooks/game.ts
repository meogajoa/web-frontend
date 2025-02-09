import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { compact } from 'lodash-es';
import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import {
  baseGameSystemNotice,
  GameDayOrNightSystemNotice,
  gameDayOrNightSystemNotice,
  GameEndSystemNotice,
  gameEndSystemNotice,
  GameSystemNoticeType,
  GameUsersNotice,
  gameUsersNotice,
  userGameInfo,
  UserGameInfo,
  type GameStartRequest,
} from '~/types/game';
import { server } from '~/utils/axios';

export const useStartGame = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: AxiosError<void>) => void;
}) => {
  const _startGameAsync = React.useCallback(
    async ({ id }: GameStartRequest) => {
      await server.post<void>(`/game/${id}/start`);
    },
    [],
  );

  const mutation = useMutation<
    void,
    AxiosError<void, GameStartRequest>,
    GameStartRequest,
    void
  >({
    mutationFn: _startGameAsync,
    onSuccess,
    onError,
  });

  return {
    ...mutation,
    startGame: mutation.mutate,
    startGameAsync: mutation.mutateAsync,
  };
};

export const useUserGameInfo = ({
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

export const useGameSystemNotice = ({
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

export const useGameUsersNotice = ({
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
