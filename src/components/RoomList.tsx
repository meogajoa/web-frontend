import { useTranslations } from 'next-intl';
import React from 'react';
import Room from '~/components/Room/Room';
import { useInfinteRooms } from '~/hooks/room';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'nav'>['className'];
};

const RoomList: React.FC<Props> = ({ className }) => {
  const messages = useTranslations('homeRoute');
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfinteRooms();

  const rooms = data?.pages.flatMap((rooms) => rooms);
  const isInitialLoading = isFetching && !isFetchingNextPage;
  const isLoadingMore = isFetchingNextPage;

  return (
    <nav className={cn('space-y-2.5 px-4 py-2.5', className)}>
      <li className="list-none">
        {isSuccess &&
          rooms?.map((room) => (
            <Room
              className="w-full"
              key={room.roomId}
              title={room.roomName}
              description={messages('exampleRoom.description')}
              isPrivate={false}
              total={room.roomMaxUser}
              current={room.roomCurrentUser}
            />
          ))}

        {isInitialLoading && <h2 className="text-center">loading rooms...</h2>}

        {isLoadingMore && (
          <h2 className="text-center">loading more rooms...</h2>
        )}
      </li>

      <button className="rounded-xl bg-gray-4 p-4" onClick={handleFetchMore}>
        Test: try fetching more
      </button>
    </nav>
  );

  function handleFetchMore() {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }
};

export default RoomList;
