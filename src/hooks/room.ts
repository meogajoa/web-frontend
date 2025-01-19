import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import type { ChatMessage } from '~/types/chat';
import type {
  CreateRoomForm,
  CreateRoomResponse,
  PaginatedRoomsResponse,
} from '~/types/room';
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
    const data = server
      .post<ChatMessage[]>('/room/join', { id: _id })
      .then((response) => {
        return response.data.map((message) => ({
          ...message,
          sendTime: new Date(message.sendTime),
        }));
      });
    await sleep(A_SECOND);
    return data;
  }, []);

  const mutation = useMutation<
    ChatMessage[],
    AxiosError<ChatMessage[], ChatMessage[]>,
    string,
    void
  >({
    mutationFn: _joinRoomAsync,
  });

  React.useEffect(() => {
    mutation.mutate(id);
  }, [id]);

  return {
    ...mutation,
    previousMessages: mutation.data,
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
