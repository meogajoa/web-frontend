'use client';

import React from 'react';
import { GameChatBar } from '~/components/ChatBar';
import GameHeader from '~/components/GameHeader';
import GameMessages from '~/components/GameMessages';
import { useJoinRoom } from '~/hooks/room';
import '~/styles/room.css';
import { ChatRoomKind } from '~/types/game';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const { id } = React.use(params);
  const { isSuccess, isPending, isError } = useJoinRoom(id);

  console.log({ isSuccess, isPending, isError });

  return (
    <div className="flex h-full flex-col">
      <GameHeader
        className="shrink-0 bg-gray-3 px-4"
        isMorning={false}
        nthRound={1}
        whichChatRoom={ChatRoomKind.All}
      />
      <GameMessages className="flex-1 bg-gray-3 p-4" />
      <GameChatBar className="bottom-0-dynamic fixed w-full" />
    </div>
  );
};

export default RoomPage;
