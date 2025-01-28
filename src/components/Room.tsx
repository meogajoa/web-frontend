import { useParams } from 'next/navigation';
import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
import { ChatMessage } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  previousMessages: ChatMessage[];
};

const Room: React.FC<Props> = ({ className, previousMessages }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <RoomHeader className="shrink-0" />
      <RoomMessages
        className="flex-1"
        roomId={id}
        previousMessages={previousMessages}
      />
      <RoomChatBar
        className="bottom-0-dynamic fixed w-full"
        renderPlaceholder
      />
    </div>
  );
};

export default Room;
