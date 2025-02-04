import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
import RoomUserList from '~/components/RoomUserList';
import { useRoom, useRoomSystemNotice } from '~/hooks/room';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const Room: React.FC<Props> = ({ className }) => {
  const { id, isPlaying, setIsPlaying } = useRoom();

  useRoomSystemNotice({
    variables: { id },
    onGameStart: handleGameStart,
  });

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <RoomHeader className="shrink-0" />
      {!isPlaying && <RoomUserList />}
      <RoomMessages className="flex-1" />
      <RoomChatBar
        className="bottom-0-dynamic fixed w-full"
        renderPlaceholder
      />
    </div>
  );

  function handleGameStart() {
    setIsPlaying(true);
  }
};

export default Room;
