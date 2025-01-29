'use client';

import React from 'react';
import Room from '~/components/Room';
import { useJoinRoomMutation } from '~/hooks/room';
import '~/styles/room.css';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const { id: roomId } = React.use(params);
  const { isSuccess, isPending, previousMessages, title, ownerUsername } =
    useJoinRoomMutation({
      variables: { id: roomId },
    });

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isSuccess && previousMessages && title && ownerUsername && (
        <Room
          title={title}
          ownerUsername={ownerUsername}
          previousMessages={previousMessages}
        />
      )}
    </>
  );
};

export default RoomPage;
