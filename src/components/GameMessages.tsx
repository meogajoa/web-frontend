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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const messages = useChatMessages({
    url: `/topic/room/${roomId}/chat`,
    previousMessages,
    onNewMessage: scrollToBottom,
  });

  const { me } = useAccount();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      className={cn('space-y-3 overflow-y-auto bg-gray-3 p-4', className)}
      ref={containerRef}
    >
      {messages.map(({ id, content, sender }) => (
        <ChatMessage
          key={id}
          position={'left'}
          username={sender}
          message={content}
        />
      ))}

      <div ref={bottomRef} aria-hidden />
    </div>
  );

  // scroll to bottom when new message is sent
  // when user has scrolled up to see previous messages, don't scroll to bottom
  function scrollToBottom(message: ChatMessageType) {
    if (!containerRef.current) {
      return;
    }

    const EPSILON = 100;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledToBottom =
      scrollTop + clientHeight >= scrollHeight - EPSILON;

    if (!isScrolledToBottom && message.sender !== me.nickname) {
      return;
    }

    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  }
};

export default GameMessages;
