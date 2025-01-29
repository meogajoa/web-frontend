import { useParams } from 'next/navigation';
import React from 'react';
import { ChatMessage } from '~/components/ChatMessage';
import { useChatMessagesSubscription } from '~/hooks/chat';
import { useAccount } from '~/providers/AccountProvider';
import { ChatMessage as ChatMessageType } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  previousMessages?: ChatMessageType[];
};

const RoomMessages: React.FC<Props> = ({ className, previousMessages }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();
  const messages = useChatMessagesSubscription({
    url: `/topic/room/${id}/chat`,
    previousMessages,
    onNewMessage: scrollToBottom,
  });

  const { me } = useAccount();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      className={cn('space-y-3 overflow-y-auto bg-gray-3 p-4', className)}
      ref={containerRef}
    >
      {messages.map(({ id, content, sender }) => (
        <ChatMessage
          key={id}
          position={sender === me.nickname ? 'right' : 'left'}
          username={sender}
          message={content}
        />
      ))}

      <div ref={bottomRef} aria-hidden />
    </section>
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

export default RoomMessages;
