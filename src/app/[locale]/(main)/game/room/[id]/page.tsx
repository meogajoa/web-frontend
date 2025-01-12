'use client';

import React from 'react';
import { GameChatBar } from '~/components/ChatBar';
import GameHeader from '~/components/GameHeader';
import GameMessages from '~/components/GameMessages';
import '~/styles/room.css';
import { ChatRoomKind } from '~/types/game';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const { id } = React.use(params);
  console.log(id);

  return (
    <>
      <GameHeader
        className="px-4"
        isMorning={false}
        nthRound={1}
        whichChatRoom={ChatRoomKind.All}
      />
      <GameMessages className="bg-gray-3 p-4" />
      <GameChatBar className="bottom-0-dynamic fixed w-full" />
    </>
  );
};

export default RoomPage;
