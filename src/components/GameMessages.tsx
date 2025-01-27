import React from 'react';
import { ChatMessage } from '~/components/ChatMessage';
import { useChatMessages } from '~/hooks/chat';
import { useAccount } from '~/providers/AccountProvider';
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
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const messages = useChatMessages({
    url: `/topic/room/${roomId}/chat`,
    previousMessages,
    onNewMessage: scrollToBottom,
  });

  const { me } = useAccount();

  return (
    <div className={cn('space-y-3 overflow-y-auto bg-gray-3 p-4', className)}>
      {messages.map(({ id, content, sender }) => (
        <ChatMessage
          key={id}
          position={'left'}
          username={sender}
          message={content}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );

  function scrollToBottom(message: ChatMessageType) {
    if (me.nickname !== message.sender) {
      return;
    }

    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  }
};

export default GameMessages;
