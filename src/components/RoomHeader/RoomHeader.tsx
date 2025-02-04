import React from 'react';
import { ChatRoom } from '~/types/chat';
import { cn } from '~/utils/classname';
import RoomHeaderPlaying from './RoomHeaderPlaying';
import RoomHeaderWaiting from './RoomHeaderWaiting';

type Props = {
  className?: string;
  isStarted: boolean;
};

const RoomHeader = React.memo<Props>(({ className, isStarted }) => {
  return (
    <div className={cn('', className)}>
      {!isStarted ? (
        <RoomHeaderWaiting />
      ) : (
        <RoomHeaderPlaying
          nthRound={1}
          isMorning={false}
          chatRoomKind={ChatRoom.All}
        />
      )}
    </div>
  );
});
RoomHeader.displayName = 'RoomHeader';

export default RoomHeader;
