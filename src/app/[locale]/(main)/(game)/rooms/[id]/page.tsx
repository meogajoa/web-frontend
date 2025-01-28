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
  const { isSuccess, isPending, previousMessages } = useJoinRoomMutation({
    variables: { id: roomId },
  });

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isSuccess && previousMessages && (
        <Room previousMessages={previousMessages} />
      )}
    </>
  );
};

export default RoomPage;
