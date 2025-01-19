'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Room from '~/components/Room/Room';
import { useInfinteRooms } from '~/hooks/room';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'nav'>['className'];
};

const RoomList: React.FC<Props> = ({ className }) => {
  const t = useTranslations('homeRoute');
  const {
    rooms,
    isSuccess,
    isFetchingNextPage: isLoadingMore,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfinteRooms();

  const isInitialLoading = isFetching && !isLoadingMore;

  return (
    <nav className={cn('space-y-2.5 px-4 py-2.5', className)}>
      <li className="list-none">
        {isSuccess &&
          rooms?.map(({ id, name, maxUser, currentUser }) => (
            <Room
              className="w-full"
              key={id}
              id={id}
              title={name}
              description={t('exampleRoom.description')}
              total={maxUser}
              current={currentUser}
              isPrivate={false}
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
