import {
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { type RoomsQuery } from '~/types/game';
import { server } from '~/utils/axios';
import { A_MINUTE, A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

export const useInfinteRooms = () => {
  const queryRooms = React.useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      const response = server
        .get<RoomsQuery>(`/room/pages/${pageParam}`)
        .then((response) => response.data);

      await sleep(A_SECOND);
      return response;
    },
    [],
  );

  const { data, ...rest } = useInfiniteQuery<
    RoomsQuery,
    AxiosError,
    InfiniteData<RoomsQuery, number[]>,
    string[],
    number
  >({
    queryKey: ['rooms'],
    queryFn: queryRooms,
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

export const useJoinRoom = (id: string) => {
  const signIn = React.useCallback(async (_id: string) => {
    const response = server.post('/room/join', { id: _id });
    await sleep(A_SECOND);
    return response;
  }, []);

  const mutation = useMutation({
    mutationFn: signIn,
  });

  React.useEffect(() => {
    mutation.mutate(id);
  }, [id]);

  return mutation;
};
