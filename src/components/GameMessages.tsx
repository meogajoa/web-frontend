import React from 'react';
import { ChatMessage } from '~/components/ChatMessage';
import { useChatMessages } from '~/hooks/chat';
import { ChatMessage as ChatMessageType } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  roomId: string;
  previousMessages?: ChatMessageType[];
};

const GameMessages: React.FC<Props> = ({
  className,
  roomId,
  previousMessages,
}) => {
  const messages = useChatMessages({
    url: `/topic/room/${roomId}`,
    previousMessages,
  });

  return (
    <div className={cn('space-y-3 overflow-y-auto', className)}>
      {messages.map(({ id, content, sender }) => (
        <ChatMessage
          key={id}
          position={'left'}
          username={sender}
          message={content}
        />
      ))}
    </div>
  );
};

export default GameMessages;
