import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import type { CreateRoomForm, CreateRoomResponse } from '~/types/form';
import { type PaginatedRoomsResponse } from '~/types/game';
import { server } from '~/utils/axios';
import { A_MINUTE, A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

export const useInfiniteRooms = () => {
  const _queryRoomsAsync = React.useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      const response = server
        .get<PaginatedRoomsResponse>(`/room/pages/${pageParam}`)
        .then((response) => response.data);

      await sleep(A_SECOND);
      return response;
    },
    [],
  );

  const { data, ...rest } = useInfiniteQuery<
    PaginatedRoomsResponse,
    AxiosError<PaginatedRoomsResponse, PaginatedRoomsResponse>,
    InfiniteData<PaginatedRoomsResponse, number[]>,
    string[],
    number
  >({
    queryKey: ['rooms'],
    queryFn: _queryRoomsAsync,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.last ? lastPageParam + 1 : null,
    staleTime: 2 * A_MINUTE,
    gcTime: A_MINUTE,
    refetchInterval: 4 * A_MINUTE,
  });

  const rooms = data?.pages.flatMap((page) => page?.rooms);
  return { ...rest, rooms };
};

export const useJoinRoomMutation = (id: string) => {
  const _joinRoomAsync = React.useCallback(async (_id: string) => {
    const response = server.post<void>('/room/join', { id: _id });
    await sleep(A_SECOND);
    return response;
  }, []);

  const mutation = useMutation({
    mutationFn: _joinRoomAsync,
  });

  React.useEffect(() => {
    mutation.mutate(id);
  }, [id]);

  return {
    ...mutation,
    joinRoom: mutation,
    joinRoomAsync: mutation.mutateAsync,
  };
};

export const useCreateRoomMutation = ({
  onSuccess,
}: Pick<
  UseMutationOptions<
    CreateRoomResponse,
    AxiosError<CreateRoomResponse, CreateRoomResponse>,
    CreateRoomForm,
    void
  >,
  'onSuccess'
>) => {
  const _createRoomAsync = React.useCallback(async (data: CreateRoomForm) => {
    return await server
      .post<CreateRoomResponse>('/room/create', data)
      .then((response) => response.data);
  }, []);

  const mutation = useMutation({
    mutationFn: _createRoomAsync,
    onSuccess: onSuccess,
  });

  return {
    ...mutation,
    createRoom: mutation.mutate,
    createRoomAsync: mutation.mutateAsync,
  };
};
