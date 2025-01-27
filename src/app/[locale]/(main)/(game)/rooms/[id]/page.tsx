'use client';

import React from 'react';
import GameHeader from '~/components/GameHeader';
import GameMessages from '~/components/GameMessages';
import { useJoinRoomMutation } from '~/hooks/room';
import { ChatRoomKind } from '~/types/chat';

import { GameChatBar } from '~/components/ChatBar';
import '~/styles/room.css';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const { id: roomId } = React.use(params);
  const { isSuccess, isPending, previousMessages } = useJoinRoomMutation({
    id: roomId,
  });

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isSuccess && (
        <div className="flex h-full flex-col">
          <GameHeader
            className="shrink-0"
            isMorning={false}
            nthRound={1}
            whichChatRoom={ChatRoomKind.All}
          />
          <GameMessages
            className="flex-1 overflow-y-auto"
            roomId={roomId}
            previousMessages={previousMessages}
          />
          <GameChatBar
            className="bottom-0-dynamic fixed w-full"
            renderPlaceholder
          />
        </div>
      )}
    </>
  );
};

export default RoomPage;
