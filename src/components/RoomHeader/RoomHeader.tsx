import React from 'react';
import { ChatRoomKind } from '~/types/chat';
import { GameStatus } from '~/types/game';
import { cn } from '~/utils/classname';
import RoomHeaderPlaying from './RoomHeaderPlaying';
import RoomHeaderWaiting from './RoomHeaderWaiting';

type Props = {
  className?: React.ComponentProps<'header'>['className'];
};

const RoomHeader: React.FC<Props> = ({ className }) => {
  const gameStatus = GameStatus.Waiting;

  return (
    <div className={cn('', className)}>
      {gameStatus === GameStatus.Waiting ? (
        <RoomHeaderWaiting title="title placeholder" />
      ) : (
        <RoomHeaderPlaying
          nthRound={1}
          isMorning={false}
          chatRoomKind={ChatRoomKind.All}
        />
      )}
    </div>
  );
};

export default RoomHeader;
