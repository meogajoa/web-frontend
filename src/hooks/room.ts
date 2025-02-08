import {
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';
import { useStore } from 'zustand';
import { RoomStoreContext } from '~/providers/RoomProvider';
import { RoomStore } from '~/stores/room';
import { username } from '~/types/account';
import {
  createRoomResponse,
  joinRoomResponse,
  JoinRoomResponse,
  paginatedRoomsResponse,
  roomSystemNotice,
  RoomSystemNoticeType,
  type CreateRoomForm,
  type CreateRoomResponse,
  type JoinRoomRequest,
  type PaginatedRoomsResponse,
} from '~/types/room';
import { assert } from '~/utils/assert';
import { server } from '~/utils/axios';
import { A_MINUTE, A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

export const useRoomStore = <T>(selector: (store: RoomStore) => T): T => {
  const roomStoreContext = React.useContext(RoomStoreContext);
  assert(roomStoreContext, 'useRoomStore must be used within roomProvider');

  return useStore(roomStoreContext, selector);
};

export const useRoom = () => {
  return useRoomStore((store) => store);
};

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

export const useJoinRoom = ({
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

  return {
    ...mutation,
    joinRoom: mutation.mutate,
    joinRoomAsync: mutation.mutateAsync,
  };
};

export const useCreateRoom = ({
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

export const useRoomUsersNotice = ({
  variables: { id },
}: {
  variables: { id: string };
}) => {
  const [users, setUsers] = React.useState<string[]>([]);

  useSubscription(`/topic/room/${id}/notice/users`, ({ body }) => {
    const data = JSON.parse(body);
    const users = z.array(username).parse(data);
    setUsers(users);
  });

  return { users };
};

export const useRoomSystemNotice = ({
  variables: { id },
  onGameStart,
}: {
  variables: { id: string };
  onGameStart?: () => void;
}) => {
  useSubscription(`/topic/room/${id}/notice/system`, ({ body }) => {
    const json = JSON.parse(body);
    const notice = roomSystemNotice.parse(json);

    switch (notice.type) {
      case RoomSystemNoticeType.GameStart:
        onGameStart?.();
        break;
    }
  });
};
