import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import React from 'react';
import { useUsersNoticeSubscription } from '~/hooks/room';
import { useRoom } from '~/providers/RoomProvider';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const RoomUserList = React.memo<Props>(({ className }) => {
  const { id } = useParams<{ id: string }>();
  const { users } = useUsersNoticeSubscription({ variables: { id } });
  const { hostNickname } = useRoom();

  return (
    <ul
      className={cn(
        'bg-gray-6 grid grid-cols-4 gap-x-2 gap-y-1 p-4',
        className,
      )}
    >
      {users.map((username) => (
        <li
          className="bg-gray-5 text-gray-1 relative flex h-6 items-center justify-center rounded-md text-[0.625rem]"
          key={username}
        >
          <span>{username}</span>

          {hostNickname === username && (
            <BookmarkIcon className="fill-red stroke-red absolute -top-1 left-2 size-3" />
          )}
        </li>
      ))}
    </ul>
  );
});
RoomUserList.displayName = 'RoomUserList';

export default RoomUserList;
