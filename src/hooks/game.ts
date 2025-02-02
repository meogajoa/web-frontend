import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { type GameStartRequest } from '~/types/game';
import { server } from '~/utils/axios';

export const useStartGameMutation = ({
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
