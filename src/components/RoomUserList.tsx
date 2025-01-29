import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';
import { username } from '~/types/account';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  ownerUsername: string;
};

const RoomUserList: React.FC<Props> = ({ className, ownerUsername }) => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = React.useState<string[]>([]);

  useSubscription(`/topic/room/${id}/notice/users`, ({ body }) => {
    const data = JSON.parse(body);
    const users = z.array(username).parse(data);
    setUsers(users);
  });

  return (
    <ul className={cn('grid grid-cols-4 gap-x-2 gap-y-1 p-4', className)}>
      {users.map((username) => (
        <li
          className="relative flex h-6 items-center justify-center rounded-md bg-gray-5 text-[0.625rem] text-gray-1"
          key={username}
        >
          <span>{username}</span>

          {ownerUsername === username && (
            <BookmarkIcon className="absolute -top-1 left-2 size-3 fill-red stroke-red" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default RoomUserList;
