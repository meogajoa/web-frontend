import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RoomsQuery, type Room } from '~/types/game';
import { server } from '~/utils/axios';
import { A_MINUTE, A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

const queryRooms = async ({ pageParam }: QueryFunctionContext) => {
  const response = server
    .get<RoomsQuery>(`/room/pages/${pageParam}`)
    .then((response) => response.data);

  await sleep(A_SECOND);
  return response;
};

export const useInfinteRooms = () => {
  return useInfiniteQuery<
    RoomsQuery,
    AxiosError,
    InfiniteData<Room[], number[]>,
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
