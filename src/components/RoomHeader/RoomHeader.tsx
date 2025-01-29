import React from 'react';
import { ChatRoomKind } from '~/types/chat';
import { cn } from '~/utils/classname';
import RoomHeaderPlaying from './RoomHeaderPlaying';
import RoomHeaderWaiting from './RoomHeaderWaiting';

type Props = {
  className?: React.ComponentProps<'header'>['className'];
  title: string;
  isStarted: boolean;
  ownerUsername: string;
};

const RoomHeader = React.memo<Props>(
  ({ className, title, isStarted, ownerUsername }) => {
    return (
      <div className={cn('', className)}>
        {!isStarted ? (
          <RoomHeaderWaiting title={title} ownerUsername={ownerUsername} />
        ) : (
          <RoomHeaderPlaying
            nthRound={1}
            isMorning={false}
            chatRoomKind={ChatRoomKind.All}
          />
        )}
      </div>
    );
  },
);
RoomHeader.displayName = 'RoomHeader';

export default RoomHeader;
