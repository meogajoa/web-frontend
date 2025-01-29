import React from 'react';
import { ChatRoomKind } from '~/types/chat';
import { cn } from '~/utils/classname';
import RoomHeaderPlaying from './RoomHeaderPlaying';
import RoomHeaderWaiting from './RoomHeaderWaiting';

type Props = {
  className?: React.ComponentProps<'header'>['className'];
  title: string;
  isStarted: boolean;
};

const RoomHeader = React.memo<Props>(({ className, title, isStarted }) => {
  return (
    <div className={cn('', className)}>
      {!isStarted ? (
        <RoomHeaderWaiting title={title} />
      ) : (
        <RoomHeaderPlaying
          nthRound={1}
          isMorning={false}
          chatRoomKind={ChatRoomKind.All}
        />
      )}
    </div>
  );
});
RoomHeader.displayName = 'RoomHeader';

export default RoomHeader;
