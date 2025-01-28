import {
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';
import { ChatMessage, chatMessage } from '~/types/chat';
import { Maybe } from '~/types/misc';
import {
  createRoomResponse,
  joinRoomResponse,
  JoinRoomResponse,
  paginatedRoomsResponse,
  type CreateRoomForm,
  type CreateRoomResponse,
  type JoinRoomRequest,
  type PaginatedRoomsResponse,
} from '~/types/room';
import { server } from '~/utils/axios';
import { A_MINUTE, A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

export const useInfiniteRooms = () => {
  const _queryRoomsAsync = React.useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      const data = server
        .get<PaginatedRoomsResponse>(`/room/pages/${pageParam}`)
        .then((response) => paginatedRoomsResponse.parse(response.data));

      await sleep(A_SECOND);
      return data;
    },
    [],
  );

  const { data, ...rest } = useInfiniteQuery<
    PaginatedRoomsResponse,
    AxiosError<PaginatedRoomsResponse, void>,
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

export const useJoinRoomMutation = ({
  variables: { id },
  onError,
}: {
  variables: JoinRoomRequest;
  onError?: (error: AxiosError<JoinRoomResponse, JoinRoomRequest>) => void;
}) => {
  const _joinRoomAsync = React.useCallback(
    async ({ id: _id }: JoinRoomRequest) => {
      const data = server
        .post<JoinRoomResponse>('/room/join', { id: _id })
        .then((response) => joinRoomResponse.parse(response.data));
      await sleep(A_SECOND);
      return data;
    },
    [],
  );

  const mutation = useMutation<
    JoinRoomResponse,
    AxiosError<JoinRoomResponse, JoinRoomRequest>,
    JoinRoomRequest,
    void
  >({
    mutationFn: _joinRoomAsync,
    onError,
  });

  React.useEffect(() => {
    mutation.mutate({ id });
  }, [id]);

  const { data: previousMessages } = z
    .array(chatMessage)
    .safeParse(mutation.data);

  return {
    ...mutation,
    previousMessages: previousMessages as Maybe<ChatMessage[]>,
    joinRoom: mutation.mutate,
    joinRoomAsync: mutation.mutateAsync,
  };
};

export const useCreateRoomMutation = ({
  onSuccess,
}: {
  onSuccess: (data: CreateRoomResponse, variables: CreateRoomForm) => void;
}) => {
  const _createRoomAsync = React.useCallback(async (data: CreateRoomForm) => {
    return await server
      .post<CreateRoomResponse>('/room/create', data)
      .then((response) => createRoomResponse.parse(response.data));
  }, []);

  const mutation = useMutation<
    CreateRoomResponse,
    AxiosError<CreateRoomResponse, CreateRoomForm>,
    CreateRoomForm,
    void
  >({
    mutationFn: _createRoomAsync,
    onSuccess,
  });

  return {
    ...mutation,
    createRoom: mutation.mutate,
    createRoomAsync: mutation.mutateAsync,
  };
};
