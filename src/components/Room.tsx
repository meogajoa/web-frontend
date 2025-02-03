import { useParams } from 'next/navigation';
import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
import RoomUserList from '~/components/RoomUserList';
import { useSystemNoticeSubscription } from '~/hooks/room';
import { ChatMessage } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  title: string;
  ownerUsername: string;
  previousMessages: ChatMessage[];
};

const Room: React.FC<Props> = ({
  className,
  title,
  ownerUsername,
  previousMessages,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isStarted, setIsStarted] = React.useState(false);

  useSystemNoticeSubscription({
    variables: { id },
    onGameStart: handleGameStart,
  });

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <RoomHeader
        className="shrink-0"
        title={title}
        isStarted={isStarted}
        ownerUsername={ownerUsername}
      />
      {!isStarted && <RoomUserList ownerUsername={ownerUsername} />}
      <RoomMessages className="flex-1" previousMessages={previousMessages} />
      <RoomChatBar
        className="bottom-0-dynamic fixed w-full"
        renderPlaceholder
      />
    </div>
  );

  function handleGameStart() {
    setIsStarted(true);
  }
};

export default Room;
