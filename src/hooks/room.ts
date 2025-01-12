import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
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

  return useInfiniteQuery<
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
};

export const useJoinRoom = () => {};
