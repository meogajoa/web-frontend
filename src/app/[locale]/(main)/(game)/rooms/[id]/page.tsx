'use client';

import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
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
      {isSuccess && (
        <div className="flex h-full flex-col">
          <RoomHeader className="shrink-0" />
          <RoomMessages
            className="flex-1"
            roomId={roomId}
            previousMessages={previousMessages}
          />
          <RoomChatBar
            className="bottom-0-dynamic fixed w-full"
            renderPlaceholder
          />
        </div>
      )}
    </>
  );
};

export default RoomPage;
