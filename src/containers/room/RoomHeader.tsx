import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import { useRoom } from '@/providers/RoomProvider';
import { cn } from '@/utils/classname';
import React from 'react';

type Props = {
  className?: string;
};

const RoomHeader = React.memo<Props>(({ className }) => {
  const { isPlaying } = useRoom();

  return (
    <div className={cn('', className)}>
      {!isPlaying ? <RoomHeaderLobby /> : <RoomHeaderGame />}
    </div>
  );
});
RoomHeader.displayName = 'RoomHeader';

export default RoomHeader;
