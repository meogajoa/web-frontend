import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import {
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
    enabled ? `/topic/user/${username}/gameInfo` : [],
    ({ body }) => {
      const json = JSON.parse(body);
      const gameInfo = userGameInfo.parse(json);
      onMessage(gameInfo);
    },
  );
};
