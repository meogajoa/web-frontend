import { username } from '@/types/account';
import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

const useRoomUsersNotice = ({
  variables: { id },
}: {
  variables: { id: string };
}) => {
  const [users, setUsers] = React.useState<string[]>([]);

  useSubscription(`/topic/room/${id}/notice/users`, ({ body }) => {
    const jsonBody = JSON.parse(body);
    const users = z.array(username).parse(jsonBody);
    setUsers(users);

    console.debug(`/topic/room/${id}/notice/users: `, users);
  });

  return { users };
};

export default useRoomUsersNotice;
