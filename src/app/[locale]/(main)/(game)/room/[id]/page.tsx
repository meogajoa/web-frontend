'use client';

import React from 'react';
import { GameChatBar } from '~/components/ChatBar';
import GameHeader from '~/components/GameHeader';
import GameMessages from '~/components/GameMessages';
import { useJoinRoomMutation } from '~/hooks/room';
import '~/styles/room.css';
import { ChatRoomKind } from '~/types/chat';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const { id: _roomId } = React.use(params);
  const roomId = _roomId.trim();
  const { isSuccess, isPending, isError } = useJoinRoomMutation(roomId);

  console.log({ isSuccess, isPending, isError });

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>Failed to join the room</div>}
      {isSuccess && (
        <div className="flex h-full flex-col">
          <GameHeader
            className="shrink-0 bg-gray-3 px-4"
            isMorning={false}
            nthRound={1}
            whichChatRoom={ChatRoomKind.All}
          />
          <GameMessages className="flex-1 bg-gray-3 p-4" roomId={roomId} />
          <GameChatBar className="bottom-0-dynamic fixed w-full" />
        </div>
      )}
    </>
  );
};

export default RoomPage;
