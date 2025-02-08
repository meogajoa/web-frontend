import React from 'react';
import { ChatMessage } from '~/components/ChatMessage';
import { useChatMessages } from '~/hooks/chat';
import { useAccount } from '~/providers/AccountProvider';
import { ChatMessage as ChatMessageType, ChatRoom } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const RoomMessages = React.memo<Props>(({ className }) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const bottomRef = React.useRef<HTMLLIElement>(null);

  const messages = useChatMessages({
    chatRoom: ChatRoom.All,
    onNewMessage: scrollToBottom,
  });

  const { account } = useAccount();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ul
      className={cn(
        'bg-gray-6 space-y-3 overflow-y-auto p-4 font-bold',
        className,
      )}
      ref={containerRef}
    >
      {messages.map(({ id, content, sender }) => (
        <ChatMessage
          key={id}
          position={sender === account.nickname ? 'right' : 'left'}
          username={sender}
          message={content}
        />
      ))}

      <li ref={bottomRef} aria-hidden />
    </ul>
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

    if (!isScrolledToBottom && message.sender !== account.nickname) {
      return;
    }

    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  }
});
RoomMessages.displayName = 'RoomMessages';

export default RoomMessages;
