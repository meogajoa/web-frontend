import React from 'react';
import { useRoom } from '~/hooks/room';
import { cn } from '~/utils/classname';
import RoomHeaderPlaying from './RoomHeaderPlaying';
import RoomHeaderWaiting from './RoomHeaderWaiting';
type Props = {
  className?: string;
};

const RoomHeader = React.memo<Props>(({ className }) => {
  const { isPlaying } = useRoom();

  return (
    <div className={cn('', className)}>
      {!isPlaying ? <RoomHeaderWaiting /> : <RoomHeaderPlaying />}
    </div>
  );
});
RoomHeader.displayName = 'RoomHeader';

export default RoomHeader;
